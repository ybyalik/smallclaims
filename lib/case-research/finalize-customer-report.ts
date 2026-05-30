// Customer report finalize — synchronous core.
//
// Currently invoked from one place only: the admin "Regenerate customer
// report" route. Auto-trigger from the cron and the Inngest function were
// removed so Case Plan generation only happens when an admin (or, later, a
// paid pricing tier purchase) explicitly requests it.

import { marked } from "marked";
import { mergeResearchPacks, type MergeSummary } from "./merge";
import { writeCustomerReport, appendDisclaimerFooter } from "./customer-report";
import { notifyCustomerProductReady } from "../notifications/notify-product-ready";
import type { EvidencePack, IntakeSnapshot } from "./agents";

interface LedgerEntry extends Record<string, unknown> {
  step: string;
  cents: number;
  model?: string;
  meta?: Record<string, unknown>;
}

export interface FinalizeResult {
  status: "draft" | "published" | "skipped_published" | "skipped_no_packs";
  jobId: string;
  caseId: string;
}

// Release a 'generating' lock back to 'pending' so a later call can retry.
// No-op if the row isn't ours anymore (e.g. it got published meanwhile, or
// the lock was never acquired because the enum value isn't migrated yet).
async function releaseGeneratingLock(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  admin: any,
  jobId: string,
): Promise<void> {
  try {
    await admin
      .from("case_research_reports")
      .update({ customer_report_status: "pending" })
      .eq("job_id", jobId)
      .eq("customer_report_status", "generating");
  } catch (e) {
    console.warn("[finalize] failed to release generating lock", e);
  }
}

export async function finalizeCustomerReport(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  admin: any,
  caseId: string,
  jobId: string,
  // autoPublish: skip the admin review/publish step and make the report
  // immediately customer-visible. Used by the on-purchase pipeline; the admin
  // regenerate path leaves it false so a human can still review a draft.
  opts: { autoPublish?: boolean } = {},
): Promise<FinalizeResult> {
  // Skip if a published report already exists.
  const { data: existing } = await admin
    .from("case_research_reports")
    .select("customer_report_status")
    .eq("job_id", jobId)
    .maybeSingle();
  const currentStatus = existing?.customer_report_status as string | undefined;
  if (currentStatus === "published") {
    return { status: "skipped_published", jobId, caseId };
  }

  // Concurrency lock. The file page can briefly fire two overlapping
  // ensure -> finalize calls (the purchase webhook and the buyer's first page
  // load) around the same time; without a lock both would run the expensive
  // merge + writer and burn duplicate LLM tokens. Atomically claim the row by
  // flipping 'pending' -> 'generating'; only the claimer proceeds. Customers
  // never see this status (readiness is keyed off the published HTML).
  //
  // Resilient by design: if the 'generating' enum value hasn't been migrated
  // yet, or the claim errors for any reason, we log and fall through UNLOCKED
  // so generation still works. That makes this safe to deploy before or after
  // the migration.
  let locked = false;
  try {
    const { data: claimed, error: claimErr } = await admin
      .from("case_research_reports")
      .update({ customer_report_status: "generating" })
      .eq("job_id", jobId)
      .eq("customer_report_status", "pending")
      .select("job_id");
    if (claimErr) throw claimErr;
    if (!claimed || claimed.length === 0) {
      // The row isn't 'pending': another run already claimed it (generating),
      // it's published, or an unpublished draft already exists. Don't dup work.
      return { status: "skipped_published", jobId, caseId };
    }
    locked = true;
  } catch (e) {
    console.warn("[finalize] generating-lock unavailable, proceeding unlocked", e);
  }

  try {
    return await finalizeCustomerReportLocked(admin, caseId, jobId, opts);
  } catch (err) {
    if (locked) await releaseGeneratingLock(admin, jobId);
    throw err;
  }
}

async function finalizeCustomerReportLocked(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  admin: any,
  caseId: string,
  jobId: string,
  opts: { autoPublish?: boolean } = {},
): Promise<FinalizeResult> {
  const ctx = await loadContext(admin, caseId, jobId);
  if (!ctx) {
    await releaseGeneratingLock(admin, jobId);
    return { status: "skipped_no_packs", jobId, caseId };
  }

  // Stage 1: merge
  const mergeRes = await mergeResearchPacks({
    intake: ctx.intake,
    shallowPack: ctx.shallowPack,
    deepPack: ctx.deepPack,
    stateFindings: ctx.stateFindings,
  });
  const mergedPack = mergeRes.data.merged as EvidencePack;
  const summary = mergeRes.data.summary as MergeSummary;

  // Stage 2: write
  const writeRes = await writeCustomerReport(
    ctx.intake,
    mergedPack,
    ctx.stateFindings,
    summary,
    {
      incidentDate: ctx.incidentDate,
      defendantEmail: ctx.defendantEmail,
      defendantPhone: ctx.defendantPhone,
    },
  );

  // Stage 3: persist as draft.
  // The guide is now the entire report (checklist_md is empty in the new
  // single-document design); concatenate only if checklist_md is non-empty
  // to stay forward compatible if the writer ever returns one again.
  const guideWithFooter = appendDisclaimerFooter(writeRes.data.guide_md);
  const fullMd = writeRes.data.checklist_md
    ? `${writeRes.data.checklist_md}\n\n${guideWithFooter}`
    : guideWithFooter;
  const html = marked.parse(fullMd, { async: false }) as string;

  // Re-check status right before write (someone may have published in the meantime).
  const { data: nowExisting } = await admin
    .from("case_research_reports")
    .select("customer_report_status")
    .eq("job_id", jobId)
    .maybeSingle();
  if ((nowExisting?.customer_report_status as string | undefined) === "published") {
    return { status: "skipped_published", jobId, caseId };
  }

  const publishFields = opts.autoPublish
    ? {
        customer_report_status: "published",
        customer_report_published_html: html,
        customer_report_published_at: new Date().toISOString(),
      }
    : { customer_report_status: "draft" };
  await admin
    .from("case_research_reports")
    .update({
      merged_pack: mergedPack,
      merge_summary: summary,
      overall_confidence: summary.overall_confidence,
      critical_conflict_detected: summary.critical_conflict_detected,
      customer_report_checklist_md: writeRes.data.checklist_md,
      customer_report_guide_md: guideWithFooter,
      customer_report_html: html,
      ...publishFields,
    })
    .eq("job_id", jobId);

  // Append cost ledger entries on the job
  const { data: jobRow } = await admin
    .from("case_research_jobs")
    .select("model_versions, cost_cents")
    .eq("id", jobId)
    .maybeSingle();
  const mv = (jobRow?.model_versions ?? {}) as Record<string, unknown>;
  const ledger = (mv.ledger ?? []) as Array<Record<string, unknown>>;
  // Cost intentionally not tracked for merge / writer; only o3-deep-research
  // calls flow through the ledger as cost. We still record that these steps
  // ran so the admin can see the pipeline progress.
  const newEntries: LedgerEntry[] = [
    {
      step: "merge",
      cents: 0,
      model: mergeRes.model,
      meta: {
        critical_conflict: summary.critical_conflict_detected,
        conflicts: summary.conflicts.length,
        overall_confidence: summary.overall_confidence,
      },
    },
    {
      step: "customer-report-writer",
      cents: 0,
      model: writeRes.model,
    },
  ];
  const totalAdd = 0;
  ledger.push(...newEntries);
  await admin
    .from("case_research_jobs")
    .update({
      model_versions: { ...mv, ledger },
      cost_cents: (jobRow?.cost_cents ?? 0) + totalAdd,
      updated_at: new Date().toISOString(),
    })
    .eq("id", jobId);

  // Auto-published reports are customer-visible the moment this returns, with
  // no human in the loop — email the buyer so they know it's ready. The
  // skipped_published guards above mean we only get here on a real first
  // publish, so this fires once. Never throws.
  if (opts.autoPublish) {
    await notifyCustomerProductReady({
      caseId,
      product: "Filing Kit",
      viewPath: `/case/${caseId}/file`,
    });
  }

  return { status: opts.autoPublish ? "published" : "draft", jobId, caseId };
}

interface FinalizationContext {
  intake: IntakeSnapshot;
  shallowPack: EvidencePack;
  deepPack: EvidencePack | null;
  stateFindings: string;
  incidentDate: string | null;
  defendantEmail: string | null;
  defendantPhone: string | null;
}

async function loadContext(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  admin: any,
  caseId: string,
  jobId: string,
): Promise<FinalizationContext | null> {
  const { data: caseRow } = await admin
    .from("cases")
    .select(
      "id, state, county, plaintiff_county, defendant_county, incident_county, dispute_type, amount_cents, defendant_name, defendant_address, defendant_email, defendant_phone, facts_narrative, intake_answers",
    )
    .eq("id", caseId)
    .single();
  if (!caseRow) return null;

  const { data: report } = await admin
    .from("case_research_reports")
    .select(
      "evidence_pack, deep_research_pack, state_findings_md",
    )
    .eq("job_id", jobId)
    .maybeSingle();
  if (!report?.evidence_pack) return null;

  const addr = (caseRow.defendant_address ?? null) as Record<string, unknown> | null;
  const intakeAnswers = (caseRow.intake_answers ?? {}) as Record<string, unknown>;
  const incidentDate = (intakeAnswers.incident_date as string | undefined) ?? null;

  const intake: IntakeSnapshot = {
    caseId: caseRow.id,
    state: caseRow.state,
    county:
      caseRow.defendant_county ||
      caseRow.incident_county ||
      caseRow.plaintiff_county ||
      caseRow.county ||
      null,
    city: (addr?.city as string | undefined) ?? null,
    plaintiffCounty: caseRow.plaintiff_county ?? null,
    defendantCounty: caseRow.defendant_county ?? null,
    incidentCounty: caseRow.incident_county ?? null,
    disputeType: caseRow.dispute_type,
    disputeTypeOther:
      typeof intakeAnswers.dispute_type_other === "string" &&
      intakeAnswers.dispute_type_other.trim().length > 0
        ? intakeAnswers.dispute_type_other.trim()
        : null,
    amountCents: caseRow.amount_cents,
    defendantName: caseRow.defendant_name,
    defendantAddress: addr,
    factsNarrative: caseRow.facts_narrative,
  };

  return {
    intake,
    shallowPack: report.evidence_pack as EvidencePack,
    deepPack: (report.deep_research_pack as EvidencePack | null) ?? null,
    stateFindings: (report.state_findings_md as string | null) ?? "",
    incidentDate,
    defendantEmail: caseRow.defendant_email ?? null,
    defendantPhone: caseRow.defendant_phone ?? null,
  };
}

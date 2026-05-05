// Customer report finalize — synchronous core.
//
// Pulled out of the Inngest function so it can be invoked directly from:
//   - the OpenAI webhook handler (via unstable_after, after both deep calls succeed)
//   - the admin "Regenerate customer report" route
//   - the Inngest customerReportFinalize function (now just a thin wrapper)
//
// Why this exists: INNGEST_EVENT_KEY is empty in this project's prod env, so
// `inngest.send()` silently no-ops. The Inngest path can't be relied on for
// the post-deep finalize step. Direct invocation is the new primary path.

import { marked } from "marked";
import { mergeResearchPacks, type MergeSummary } from "./merge";
import { writeCustomerReport, appendDisclaimerFooter } from "./customer-report";
import type { EvidencePack, IntakeSnapshot } from "./agents";

interface LedgerEntry extends Record<string, unknown> {
  step: string;
  cents: number;
  model?: string;
  meta?: Record<string, unknown>;
}

export interface FinalizeResult {
  status: "draft" | "skipped_published" | "skipped_no_packs";
  jobId: string;
  caseId: string;
}

export async function finalizeCustomerReport(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  admin: any,
  caseId: string,
  jobId: string,
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

  const ctx = await loadContext(admin, caseId, jobId);
  if (!ctx) {
    return { status: "skipped_no_packs", jobId, caseId };
  }

  // Stage 1: merge
  const mergeRes = await mergeResearchPacks({
    intake: ctx.intake,
    shallowPack: ctx.shallowPack,
    deepPack: ctx.deepPack,
    findingsA: ctx.findingsA,
    findingsB: ctx.findingsB,
  });
  const mergedPack = mergeRes.data.merged as EvidencePack;
  const summary = mergeRes.data.summary as MergeSummary;

  // Stage 2: write
  const writeRes = await writeCustomerReport(
    ctx.intake,
    mergedPack,
    ctx.findingsA,
    ctx.findingsB,
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
      customer_report_status: "draft",
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

  return { status: "draft", jobId, caseId };
}

interface FinalizationContext {
  intake: IntakeSnapshot;
  shallowPack: EvidencePack;
  deepPack: EvidencePack | null;
  findingsA: string;
  findingsB: string;
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
      "evidence_pack, deep_research_pack, deep_research_findings_a, deep_research_findings_b",
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
    amountCents: caseRow.amount_cents,
    defendantName: caseRow.defendant_name,
    defendantAddress: addr,
    factsNarrative: caseRow.facts_narrative,
  };

  return {
    intake,
    shallowPack: report.evidence_pack as EvidencePack,
    deepPack: (report.deep_research_pack as EvidencePack | null) ?? null,
    findingsA: (report.deep_research_findings_a as string | null) ?? "",
    findingsB: (report.deep_research_findings_b as string | null) ?? "",
    incidentDate,
    defendantEmail: caseRow.defendant_email ?? null,
    defendantPhone: caseRow.defendant_phone ?? null,
  };
}

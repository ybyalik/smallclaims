// Shared finalizer for deep research responses, two-call architecture.
//
// Each case has TWO deep research response IDs (call A: pre-filing/filing;
// call B: hearing/collection). The webhook and the safety-net cron call this
// function with one response_id at a time. The function:
//   1. Routes that response_id to either the _a or _b column on the report.
//   2. Persists findings + extracted structured pack into the matching column.
//   3. Marks this call as succeeded or failed in progress.deep.call_{a,b}.
//   4. Only fires `case/research.ready` once BOTH calls are succeeded.
//   5. If either call fails, marks the whole deep failed (no partial output).
//
// Idempotent per call: safe to call repeatedly with the same response_id; the
// first successful call persists everything for that half, subsequent calls
// no-op because the call's status will already be terminal.

import { createServiceRoleClient } from "../supabase/service-role";
import { inngest } from "../inngest/client";
import { isOfficialDomain } from "./source-policy";
import {
  getDeepResearchStatus,
  parseDeepResearchOutput,
  extractStructuredPackFromCombinedFindings,
  type DeepCallId,
} from "./deep-research";
import type { Classification, IntakeSnapshot } from "./agents";
import crypto from "node:crypto";

interface CompleteResult {
  outcome:
    | "completed"
    | "still_in_progress"
    | "failed_remote"
    | "noop_already_finalized"
    | "noop_other_call_failed"
    | "no_matching_job";
  jobId?: string;
  caseId?: string;
  which?: DeepCallId;
  details?: string;
}

export async function completeDeepResearchByResponseId(
  responseId: string,
): Promise<CompleteResult> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;

  // Find the report row whose call A or call B matches this response_id.
  // Read both columns so we can route the event to the right side.
  const { data: candidates } = await admin
    .from("case_research_reports")
    .select(
      "job_id, case_id, deep_research_response_id_a, deep_research_response_id_b",
    )
    .or(
      `deep_research_response_id_a.eq.${responseId},deep_research_response_id_b.eq.${responseId}`,
    );
  if (!candidates || candidates.length === 0) {
    return { outcome: "no_matching_job", details: `no report row for ${responseId}` };
  }

  // Pick the candidate whose job is currently polling. There may be historical
  // rows from re-runs.
  const jobIds = candidates.map((c: { job_id: string }) => c.job_id);
  const { data: jobs } = await admin
    .from("case_research_jobs")
    .select("id, case_id, progress")
    .in("id", jobIds);
  const polling = (jobs ?? []).find(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (j: any) => j.progress?.deep?.status === "polling",
  );
  if (!polling) {
    return { outcome: "noop_already_finalized", details: `${responseId} has no polling job` };
  }

  const job = polling as { id: string; case_id: string; progress: Record<string, unknown> };
  const reportRow = candidates.find(
    (c: { job_id: string }) => c.job_id === job.id,
  ) as { deep_research_response_id_a: string | null; deep_research_response_id_b: string | null };

  // Identify which call (a/b) this response_id belongs to for this job.
  const which: DeepCallId | null =
    reportRow.deep_research_response_id_a === responseId
      ? "a"
      : reportRow.deep_research_response_id_b === responseId
        ? "b"
        : null;
  if (!which) {
    return { outcome: "no_matching_job", details: `${responseId} not on either call slot` };
  }

  const deepProgress = (job.progress?.deep ?? {}) as Record<string, unknown>;
  const callKey = which === "a" ? "call_a" : "call_b";
  const otherCallKey = which === "a" ? "call_b" : "call_a";
  const thisCall = (deepProgress[callKey] ?? {}) as Record<string, unknown>;
  const otherCall = (deepProgress[otherCallKey] ?? {}) as Record<string, unknown>;

  // If this call is already terminal, no-op.
  if (thisCall.status === "succeeded" || thisCall.status === "failed") {
    return { outcome: "noop_already_finalized", jobId: job.id, which };
  }

  // Ask OpenAI for the actual status.
  const { status, envelope } = await getDeepResearchStatus(responseId);
  const TERMINAL = new Set(["completed", "failed", "cancelled", "incomplete"]);
  if (!TERMINAL.has(status)) {
    return { outcome: "still_in_progress", jobId: job.id, which, details: status };
  }

  if (status !== "completed") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const env = envelope as any;
    const incompleteReason = env?.incomplete_details?.reason ?? "";
    // Both-must-succeed contract: mark this call failed AND mark overall
    // deep failed. The other call's outcome is moot.
    await patchDeepCall(admin, job.id, callKey, {
      status: "failed",
      remote_status: status,
      incomplete_reason: incompleteReason || undefined,
    });
    await patchDeepTopLevel(admin, job.id, {
      status: "failed",
      phase: "remote_failed",
      failed_call: which,
    });
    return {
      outcome: "failed_remote",
      jobId: job.id,
      which,
      details: status === "incomplete" ? `incomplete: ${incompleteReason}` : status,
    };
  }

  // status === "completed" for this call — parse, extract, persist.
  const model =
    (deepProgress.model as string | undefined) ?? "o3-deep-research";
  const parsed = parseDeepResearchOutput(envelope, responseId, model);

  // Persist citations as case_research_sources rows w/ provenance "deep_research"
  const sourceIds = await persistDeepCitations(admin, parsed.citations);
  if (sourceIds.length > 0) {
    const linkRows = sourceIds.map((id) => ({
      job_id: job.id,
      source_id: id,
      cite_role: "primary",
    }));
    await admin
      .from("case_research_job_sources")
      .upsert(linkRows, { onConflict: "job_id,source_id" });
  }

  // Persist the raw findings markdown for this half. The admin can read it
  // immediately; the structured combined extraction below only runs once
  // BOTH calls have completed.
  const findingsCol =
    which === "a" ? "deep_research_findings_a" : "deep_research_findings_b";
  await admin
    .from("case_research_reports")
    .update({ [findingsCol]: parsed.reportMarkdown })
    .eq("job_id", job.id);

  // Mark this call succeeded.
  await patchDeepCall(admin, job.id, callKey, {
    status: "succeeded",
    phase: "done",
    citations: parsed.citations.length,
    findings_chars: parsed.reportMarkdown.length,
  });

  // Append cost ledger for this deep call (just the o3-deep-research cost;
  // the combined extraction is gpt-5-mini and isn't tracked).
  await appendCallCostLedger(admin, job.id, which, {
    deepCents: parsed.costCents,
    deepModel: parsed.model,
    citations: parsed.citations.length,
    findingsChars: parsed.reportMarkdown.length,
  });

  // Re-read job progress to evaluate gating after this update.
  const { data: refreshed } = await admin
    .from("case_research_jobs")
    .select("progress")
    .eq("id", job.id)
    .maybeSingle();
  const refreshedDeep = (refreshed?.progress?.deep ?? {}) as Record<string, unknown>;
  const a = (refreshedDeep.call_a ?? {}) as Record<string, unknown>;
  const b = (refreshedDeep.call_b ?? {}) as Record<string, unknown>;

  // If the OTHER call has already failed, the deep branch is overall-failed
  // and we don't run the combined extraction.
  if (otherCall.status === "failed" || a.status === "failed" || b.status === "failed") {
    return {
      outcome: "noop_other_call_failed",
      jobId: job.id,
      which,
      details: `other call (${otherCallKey}) failed; deep branch is failed`,
    };
  }

  // Note: combined extraction (and the merge + writer) used to run inline
  // here when both calls reached succeeded. That made the webhook take 2-3
  // minutes and trip Vercel's runtime timeout. Now the webhook just marks
  // the call succeeded and returns. The cron picks up jobs in three states:
  //   - both calls succeeded but no deep_research_pack → run combined extraction
  //   - deep_research_pack present but customer report still pending → run finalize
  //   - deep still polling → check OpenAI status (existing behavior)
  // See `runCombinedExtractionIfReady` and `app/api/cron/poll-deep-research`.
  return { outcome: "completed", jobId: job.id, caseId: job.case_id, which };
}

// Idempotent: run combined extraction for a job if both deep calls have
// succeeded but no deep_research_pack has been persisted yet. Called by the
// cron. Returns { ran: true } if it actually did work.
export async function runCombinedExtractionIfReady(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  admin: any,
  jobId: string,
): Promise<{ ran: boolean; error?: string }> {
  const { data: job } = await admin
    .from("case_research_jobs")
    .select("id, case_id, progress")
    .eq("id", jobId)
    .maybeSingle();
  if (!job) return { ran: false };
  const deep = (job.progress?.deep ?? {}) as Record<string, unknown>;
  const a = (deep.call_a ?? {}) as Record<string, unknown>;
  const b = (deep.call_b ?? {}) as Record<string, unknown>;
  if (a.status !== "succeeded" || b.status !== "succeeded") return { ran: false };

  const { data: row } = await admin
    .from("case_research_reports")
    .select("deep_research_pack, deep_research_findings_a, deep_research_findings_b")
    .eq("job_id", job.id)
    .maybeSingle();
  if (row?.deep_research_pack) return { ran: false }; // already extracted

  const findingsA = (row?.deep_research_findings_a as string | null) ?? "";
  const findingsB = (row?.deep_research_findings_b as string | null) ?? "";
  if (!findingsA && !findingsB) return { ran: false };

  try {
    const intake = await loadIntakeForExtraction(admin, job.case_id);
    const classification = await loadClassificationForExtraction(admin, job.id, intake);
    const extracted = await extractStructuredPackFromCombinedFindings(
      findingsA,
      findingsB,
      intake,
      classification,
    );
    await admin
      .from("case_research_reports")
      .update({ deep_research_pack: extracted.data })
      .eq("job_id", job.id);
    await patchDeepTopLevel(admin, job.id, {
      status: "succeeded",
      phase: "done",
      structured_extracted: true,
    });
    return { ran: true };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("[runCombinedExtractionIfReady]", msg);
    await patchDeepTopLevel(admin, job.id, {
      status: "succeeded",
      phase: "done",
      structured_extracted: false,
      extraction_error: msg,
    });
    return { ran: false, error: msg };
  }
}

// Loaders for the structured-extraction second pass --------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function loadIntakeForExtraction(admin: any, caseId: string): Promise<IntakeSnapshot> {
  const { data, error } = await admin
    .from("cases")
    .select(
      "id, state, county, plaintiff_county, defendant_county, incident_county, dispute_type, amount_cents, defendant_name, defendant_address, facts_narrative",
    )
    .eq("id", caseId)
    .single();
  if (error || !data) throw new Error(`Case ${caseId} not found`);
  const addr = (data.defendant_address ?? null) as Record<string, unknown> | null;
  const bestCounty =
    data.defendant_county ||
    data.incident_county ||
    data.plaintiff_county ||
    data.county ||
    null;
  return {
    caseId: data.id,
    state: data.state,
    county: bestCounty,
    city: (addr?.city as string | undefined) ?? null,
    plaintiffCounty: data.plaintiff_county ?? null,
    defendantCounty: data.defendant_county ?? null,
    incidentCounty: data.incident_county ?? null,
    disputeType: data.dispute_type,
    amountCents: data.amount_cents,
    defendantName: data.defendant_name,
    defendantAddress: addr,
    factsNarrative: data.facts_narrative,
  };
}

async function loadClassificationForExtraction(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  admin: any,
  jobId: string,
  intake: IntakeSnapshot,
): Promise<Classification> {
  const { data: report } = await admin
    .from("case_research_reports")
    .select("evidence_pack")
    .eq("job_id", jobId)
    .maybeSingle();
  const c = (report?.evidence_pack as { classification?: Classification } | null)?.classification;
  if (c && c.claim_category) return c;
  return {
    claim_category: intake.disputeType,
    proper_court_type: "",
    proper_court_type_notes: "",
    amount_within_limit: false,
    amount_limit_dollars: null,
    venue_rule: "",
    statute_of_limitations: { deadline: null, citation: "", notes: "" },
    pre_filing_requirements: [],
    eligibility_concerns: [],
    jury_trial_available: null,
    attorneys_allowed: null,
    counterclaim_implications: "",
    notes: "Classification not available; using minimal stub for extraction.",
  };
}

// Patch progress.deep.call_{a,b} (per-call substructure).
async function patchDeepCall(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  admin: any,
  jobId: string,
  callKey: "call_a" | "call_b",
  patch: Record<string, unknown>,
): Promise<void> {
  const { data: row } = await admin
    .from("case_research_jobs")
    .select("progress")
    .eq("id", jobId)
    .maybeSingle();
  const current = (row?.progress ?? {}) as Record<string, Record<string, unknown>>;
  const deep = (current.deep ?? {}) as Record<string, unknown>;
  const existingCall = (deep[callKey] ?? {}) as Record<string, unknown>;
  deep[callKey] = { ...existingCall, ...patch, at: new Date().toISOString() };
  current.deep = deep;
  await admin
    .from("case_research_jobs")
    .update({ progress: current, updated_at: new Date().toISOString() })
    .eq("id", jobId);
}

// Patch progress.deep top-level fields.
async function patchDeepTopLevel(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  admin: any,
  jobId: string,
  patch: Record<string, unknown>,
): Promise<void> {
  const { data: row } = await admin
    .from("case_research_jobs")
    .select("progress")
    .eq("id", jobId)
    .maybeSingle();
  const current = (row?.progress ?? {}) as Record<string, Record<string, unknown>>;
  current.deep = { ...(current.deep ?? {}), ...patch, at: new Date().toISOString() };
  await admin
    .from("case_research_jobs")
    .update({ progress: current, updated_at: new Date().toISOString() })
    .eq("id", jobId);
}

async function appendCallCostLedger(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  admin: any,
  jobId: string,
  which: DeepCallId,
  m: {
    deepCents: number;
    deepModel: string;
    citations: number;
    findingsChars: number;
  },
): Promise<void> {
  const { data: jobRow } = await admin
    .from("case_research_jobs")
    .select("model_versions, cost_cents")
    .eq("id", jobId)
    .maybeSingle();
  const mv = (jobRow?.model_versions ?? {}) as Record<string, unknown>;
  const ledger = (mv.ledger ?? []) as Array<Record<string, unknown>>;
  const deepStep = `deep.research.async.${which}`;
  if (ledger.some((e) => e.step === deepStep)) return;
  ledger.push({
    step: deepStep,
    cents: m.deepCents,
    model: m.deepModel,
    meta: { citations: m.citations, findings_chars: m.findingsChars },
  });
  if (m.deepCents > 0) {
    await admin
      .from("case_research_jobs")
      .update({
        model_versions: { ...mv, ledger, deep_research_used: true },
        cost_cents: (jobRow?.cost_cents ?? 0) + m.deepCents,
        updated_at: new Date().toISOString(),
      })
      .eq("id", jobId);
  } else {
    await admin
      .from("case_research_jobs")
      .update({
        model_versions: { ...mv, ledger, deep_research_used: true },
        updated_at: new Date().toISOString(),
      })
      .eq("id", jobId);
  }
}

async function persistDeepCitations(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  admin: any,
  citations: Array<{ url: string; title: string; domain: string }>,
): Promise<string[]> {
  if (citations.length === 0) return [];
  const rows = citations.map((c) => ({
    url: c.url,
    url_hash: sha256(c.url),
    domain: c.domain || hostOf(c.url),
    is_official: isOfficialDomain(c.url),
    provenance: "deep_research",
    title: c.title || null,
    mime_type: "text/html",
    byte_size: 0,
    content_text: null,
    content_markdown: null,
    last_seen_at: new Date().toISOString(),
  }));
  const { error: upsertErr } = await admin
    .from("case_research_sources")
    .upsert(rows, { onConflict: "url_hash" });
  if (upsertErr) return [];
  const hashes = rows.map((r) => r.url_hash);
  const { data } = await admin
    .from("case_research_sources")
    .select("id")
    .in("url_hash", hashes);
  return ((data ?? []) as { id: string }[]).map((r) => r.id);
}

function sha256(s: string): string {
  return crypto.createHash("sha256").update(s).digest("hex");
}

function hostOf(rawUrl: string): string {
  try {
    return new URL(rawUrl).hostname.toLowerCase();
  } catch {
    return "unknown";
  }
}

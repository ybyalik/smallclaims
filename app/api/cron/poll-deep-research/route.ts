// GET /api/cron/poll-deep-research
//
// Single cron that drives every async stage of the case-research pipeline:
//
//   1. For any job whose deep top-level status is "polling", check OpenAI
//      for the status of each non-terminal deep response_id and persist
//      what comes back.
//   2. For any job where both deep calls have succeeded but no
//      deep_research_pack has been persisted yet, run the combined
//      structured extraction (gpt-5-mini reads concatenated A+B findings).
//   3. For any job where deep_research_pack is present but the customer
//      report status is still "pending", run the merge agent + writer and
//      persist the customer report draft.
//
// Schedule: every 15 minutes via vercel.json.
//
// Authentication: open to any caller. The work is idempotent and doesn't
// expose data — re-running the cron just hits OpenAI for known polling
// response IDs and finalizes jobs that need it. Vercel's cron auth header
// has been unreliable across versions, so we don't gate on it.

import { NextResponse, type NextRequest } from "next/server";
import { createServiceRoleClient } from "../../../../lib/supabase/service-role";
import {
  completeDeepResearchByResponseId,
  runCombinedExtractionIfReady,
} from "../../../../lib/case-research/complete-deep-research";
import { finalizeCustomerReport } from "../../../../lib/case-research/finalize-customer-report";

export const runtime = "nodejs";
export const maxDuration = 300;
// Don't try to statically prerender this route at build time — it queries
// Supabase + OpenAI on every call and would blow Next's 60s static-gen
// timeout, failing the deploy.
export const dynamic = "force-dynamic";

const PER_RUN_LIMIT = 50;

export async function GET(_req: NextRequest) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;

  // ------------------------------------------------------------------
  // Phase 1: poll OpenAI for any deep call that's still in progress
  // ------------------------------------------------------------------
  const { data: pollingJobs } = await admin
    .from("case_research_jobs")
    .select("id, progress")
    .eq("progress->deep->>status", "polling")
    .limit(PER_RUN_LIMIT);

  const pollResults: Array<{ responseId: string; outcome: string; error?: string }> = [];
  if (pollingJobs && pollingJobs.length > 0) {
    const ids = pollingJobs.map((j: { id: string }) => j.id);
    const { data: reports } = await admin
      .from("case_research_reports")
      .select("job_id, deep_research_response_id_a, deep_research_response_id_b")
      .in("job_id", ids);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const progressById = new Map<string, any>();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    for (const j of pollingJobs as any[]) progressById.set(j.id, j.progress ?? {});

    const responseIds: string[] = [];
    for (const r of (reports ?? []) as Array<{
      job_id: string;
      deep_research_response_id_a: string | null;
      deep_research_response_id_b: string | null;
    }>) {
      const deep = (progressById.get(r.job_id)?.deep ?? {}) as Record<string, unknown>;
      const callA = (deep.call_a ?? {}) as Record<string, unknown>;
      const callB = (deep.call_b ?? {}) as Record<string, unknown>;
      if (
        r.deep_research_response_id_a &&
        callA.status !== "succeeded" &&
        callA.status !== "failed"
      ) {
        responseIds.push(r.deep_research_response_id_a);
      }
      if (
        r.deep_research_response_id_b &&
        callB.status !== "succeeded" &&
        callB.status !== "failed"
      ) {
        responseIds.push(r.deep_research_response_id_b);
      }
    }

    for (const responseId of responseIds) {
      try {
        const r = await completeDeepResearchByResponseId(responseId);
        pollResults.push({ responseId, outcome: r.outcome });
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        console.error(`[cron] poll ${responseId}:`, msg);
        pollResults.push({ responseId, outcome: "error", error: msg });
      }
    }
  }

  // ------------------------------------------------------------------
  // Phase 2: run combined extraction for jobs where both deep calls
  //          succeeded but deep_research_pack hasn't been persisted yet.
  // ------------------------------------------------------------------
  const extractResults: Array<{ jobId: string; ran: boolean; error?: string }> = [];
  // Find jobs where deep top-level is succeeded AND no pack yet. We do a
  // join in JS by listing recent succeeded-deep jobs and filtering.
  const { data: succeededDeepJobs } = await admin
    .from("case_research_jobs")
    .select("id")
    .eq("progress->deep->>status", "succeeded")
    .order("started_at", { ascending: false })
    .limit(PER_RUN_LIMIT);
  if (succeededDeepJobs && succeededDeepJobs.length > 0) {
    const jobIds = succeededDeepJobs.map((j: { id: string }) => j.id);
    const { data: reports } = await admin
      .from("case_research_reports")
      .select("job_id, deep_research_pack")
      .in("job_id", jobIds);
    const needsExtraction = (reports ?? [])
      .filter((r: { deep_research_pack: unknown }) => !r.deep_research_pack)
      .map((r: { job_id: string }) => r.job_id);
    for (const jobId of needsExtraction) {
      try {
        const r = await runCombinedExtractionIfReady(admin, jobId);
        extractResults.push({ jobId, ran: r.ran, error: r.error });
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        console.error(`[cron] extract ${jobId}:`, msg);
        extractResults.push({ jobId, ran: false, error: msg });
      }
    }
  }

  // ------------------------------------------------------------------
  // Phase 3: run merge + writer for jobs where deep_research_pack is
  //          present but customer_report_status is still pending.
  // ------------------------------------------------------------------
  const finalizeResults: Array<{ jobId: string; status: string; error?: string }> = [];
  const { data: pendingReports } = await admin
    .from("case_research_reports")
    .select("job_id, case_id, deep_research_pack, customer_report_status")
    .eq("customer_report_status", "pending")
    .not("deep_research_pack", "is", null)
    .limit(PER_RUN_LIMIT);
  for (const r of (pendingReports ?? []) as Array<{
    job_id: string;
    case_id: string;
  }>) {
    try {
      const out = await finalizeCustomerReport(admin, r.case_id, r.job_id);
      finalizeResults.push({ jobId: r.job_id, status: out.status });
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error(`[cron] finalize ${r.job_id}:`, msg);
      finalizeResults.push({ jobId: r.job_id, status: "error", error: msg });
    }
  }

  return NextResponse.json({
    ok: true,
    poll: { count: pollResults.length, results: pollResults },
    extract: { count: extractResults.length, results: extractResults },
    finalize: { count: finalizeResults.length, results: finalizeResults },
  });
}

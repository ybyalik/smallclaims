// GET /api/cron/sweep-stuck-jobs
//
// Safety net so no paying customer is ever silently stranded on a permanent
// "preparing your..." screen. Catches background work that started but never
// finished (e.g. the serverless function was frozen mid-run, or an Inngest
// job was never picked up) and either re-runs it or alerts the team.
//
//   Filing Kit  (case_research_jobs): a job stuck queued/running past the
//     stale window is canceled and re-enqueued. Research runs on Inngest,
//     which is durable, so re-enqueuing actually regenerates with no human
//     in the loop. The team is alerted either way.
//
//   Collection Plan (collection_plans): a row stuck in any in-progress status
//     past the stale window is marked failed and the team is alerted so they
//     can one-click regenerate from the admin case page (that path awaits the
//     pipeline, so it completes durably). The customer keeps seeing a neutral
//     "preparing" state, never an error.
//
// Triggered by Vercel Cron (vercel.json). Protected by CRON_SECRET.

import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "../../../../lib/supabase/service-role";
import { enqueueCaseResearch } from "../../../../lib/demand-letter/mark-paid";
import { notifyAdminOfResearchFailure } from "../../../../lib/case-research/notify-admin-failure";
import { ensureFilingReportForCase } from "../../../../lib/case-research/ensure-filing-report";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

// Filing Kit research (incl. deep research) is long-running and polled every
// few minutes, so we give it a wide window before declaring it dead.
const FILING_STALE_MS = 30 * 60 * 1000; // 30 minutes
// Collection plan stages are ordinary LLM calls that bump updated_at between
// each step, so a shorter window is safe.
const COLLECTION_STALE_MS = 15 * 60 * 1000; // 15 minutes

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization") || "";
  const expected = process.env.CRON_SECRET;
  if (!expected) {
    return NextResponse.json({ error: "CRON_SECRET not set" }, { status: 500 });
  }
  if (authHeader !== `Bearer ${expected}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = createServiceRoleClient() as any;
  const now = Date.now();

  const filing: { jobId: string; caseId: string; action: string }[] = [];
  const collection: { planId: string; caseId: string; status: string }[] = [];
  const stuckReports: { jobId: string; caseId: string; action: string }[] = [];

  // ---- Filing Kit: stuck research jobs ----------------------------------
  try {
    const cutoff = new Date(now - FILING_STALE_MS).toISOString();
    const { data: stuckJobs } = await db
      .from("case_research_jobs")
      .select("id, case_id, status, updated_at")
      .in("status", ["queued", "running"])
      .lt("updated_at", cutoff)
      .limit(50);

    for (const job of (stuckJobs ?? []) as Array<{
      id: string;
      case_id: string;
      status: string;
      updated_at: string;
    }>) {
      let action = "re-enqueued";
      // Cancel the dead row so it stops counting as in-progress, then start a
      // fresh version. Re-enqueue runs on Inngest (durable).
      await db
        .from("case_research_jobs")
        .update({ status: "canceled", updated_at: new Date().toISOString() })
        .eq("id", job.id);
      try {
        await enqueueCaseResearch(job.case_id, {
          force: true,
          source: "sweep_stuck_jobs",
        });
      } catch (e) {
        action = "re-enqueue_failed";
        console.error("[sweep] re-enqueue failed", job.case_id, e);
      }
      await notifyAdminOfResearchFailure({
        product: "Filing Kit research",
        caseId: job.case_id,
        jobId: job.id,
        stage: `sweep:stuck_${job.status}`,
        error: new Error(
          `Filing Kit job was stuck in "${job.status}" with no progress since ${job.updated_at}. Action: ${action}.`,
        ),
      });
      filing.push({ jobId: job.id, caseId: job.case_id, action });
    }
  } catch (e) {
    console.error("[sweep] filing-kit sweep failed", e);
  }

  // ---- Collection Plan: stuck in-progress rows --------------------------
  try {
    const cutoff = new Date(now - COLLECTION_STALE_MS).toISOString();
    const { data: stuckPlans } = await db
      .from("collection_plans")
      .select("id, case_id, status, updated_at")
      .not("status", "in", "(ready,failed)")
      .lt("updated_at", cutoff)
      .limit(50);

    for (const plan of (stuckPlans ?? []) as Array<{
      id: string;
      case_id: string;
      status: string;
      updated_at: string;
    }>) {
      await db
        .from("collection_plans")
        .update({
          status: "failed",
          error_message: `swept: stuck in "${plan.status}" with no progress since ${plan.updated_at} (previous run interrupted)`,
          updated_at: new Date().toISOString(),
        })
        .eq("id", plan.id);
      await notifyAdminOfResearchFailure({
        product: "Collection Plan",
        caseId: plan.case_id,
        jobId: plan.id,
        stage: `sweep:stuck_${plan.status}`,
        error: new Error(
          `Collection Plan was stuck in "${plan.status}" with no progress since ${plan.updated_at}. Marked failed — regenerate from the admin case page.`,
        ),
      });
      collection.push({ planId: plan.id, caseId: plan.case_id, status: plan.status });
    }
  } catch (e) {
    console.error("[sweep] collection-plan sweep failed", e);
  }

  // ---- Filing Kit: customer reports stuck in "generating" ---------------
  // The finalize step claims the report row (pending -> generating) and only
  // releases it on a thrown error. If the serverless function is frozen mid-run
  // (multi-minute merge + writer LLM calls), the lock is never released and the
  // customer is stranded on a permanent "Building your Filing Kit" screen with
  // no email and no alert. Detect those, reset the lock, and re-run.
  try {
    const { data: generatingReports } = await db
      .from("case_research_reports")
      .select("job_id, case_id, customer_report_status")
      .eq("customer_report_status", "generating")
      .limit(50);

    let healed = 0;
    for (const rep of (generatingReports ?? []) as Array<{
      job_id: string;
      case_id: string;
    }>) {
      // The report row has no updated_at; use the underlying job's updated_at
      // as the staleness signal. A live finalize belongs to a job that just
      // succeeded, so a job untouched past the stale window means the run died.
      const { data: job } = await db
        .from("case_research_jobs")
        .select("updated_at")
        .eq("id", rep.job_id)
        .maybeSingle();
      const jobUpdated = job?.updated_at ? new Date(job.updated_at).getTime() : 0;
      if (now - jobUpdated < FILING_STALE_MS) continue; // plausibly still running

      // Release the lock so finalize can re-claim it.
      await db
        .from("case_research_reports")
        .update({ customer_report_status: "pending" })
        .eq("job_id", rep.job_id)
        .eq("customer_report_status", "generating");

      let action = "reset_to_pending";
      // Heal a bounded number inline (each finalize is a couple of minutes; the
      // rest recover on the next sweep or the customer's next page load).
      if (healed < 3) {
        try {
          await ensureFilingReportForCase(rep.case_id);
          action = "regenerated";
          healed++;
        } catch (e) {
          console.error("[sweep] stuck-report regenerate failed", rep.case_id, e);
        }
      }
      await notifyAdminOfResearchFailure({
        product: "Filing Kit report",
        caseId: rep.case_id,
        jobId: rep.job_id,
        stage: "sweep:stuck_generating",
        error: new Error(
          `Filing Kit customer report was stuck in "generating" (finalize interrupted). Action: ${action}.`,
        ),
      });
      stuckReports.push({ jobId: rep.job_id, caseId: rep.case_id, action });
    }
  } catch (e) {
    console.error("[sweep] stuck-report sweep failed", e);
  }

  return NextResponse.json({
    filing_swept: filing.length,
    collection_swept: collection.length,
    reports_swept: stuckReports.length,
    filing,
    collection,
    stuckReports,
  });
}

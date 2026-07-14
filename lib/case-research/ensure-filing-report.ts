// Idempotent entry point that guarantees a paid Filing Kit case ends up with a
// published, customer-visible research report. Called on purchase (webhook) and
// as a safety net on the customer's file page. Mirrors ensureCollectionPlanForCase.
//
// Handles every prior state of a case:
//   - no research job yet      -> start the pipeline (auto-publishes at the end)
//   - job queued/running       -> in progress, do nothing
//   - job failed               -> re-run fresh
//   - job succeeded + published -> done
//   - job succeeded + draft     -> publish the existing draft (no LLM, instant)
//   - job succeeded, no report  -> generate the report + publish (inline)

import { createServiceRoleClient } from "../supabase/service-role";
import { enqueueCaseResearch } from "../demand-letter/mark-paid";
import { finalizeCustomerReport } from "./finalize-customer-report";
import { notifyCustomerProductReady } from "../notifications/notify-product-ready";
import { notifyAdminOfResearchFailure } from "./notify-admin-failure";

// After a failed research run, wait this long before auto-retrying on a page
// load, so a persistent failure (bad API key, provider outage) doesn't launch
// a fresh (billed) deep-research pipeline on every single page refresh.
const RETRY_COOLDOWN_MS = 5 * 60 * 1000; // 5 minutes
// Stop auto-retrying after this many failed versions in the lookback window;
// alert the team instead of burning the pipeline indefinitely.
const MAX_FAILED_VERSIONS = 3;
const MAX_FAILED_LOOKBACK_MS = 24 * 60 * 60 * 1000; // 24 hours

export async function ensureFilingReportForCase(caseId: string): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;

  const { data: jobs } = await admin
    .from("case_research_jobs")
    .select("id, status, version, updated_at, finished_at")
    .eq("case_id", caseId)
    .order("version", { ascending: false })
    .limit(1);
  const job = (jobs ?? [])[0] as
    | { id: string; status: string; version: number; updated_at: string | null; finished_at: string | null }
    | undefined;

  if (!job) {
    await enqueueCaseResearch(caseId, { force: false, source: "ensure_filing_report" });
    return;
  }
  if (job.status === "queued" || job.status === "running") return;
  if (job.status === "failed") {
    // Cooldown: don't relaunch a fresh (paid) pipeline within a few minutes of
    // the last failure.
    const lastFailedAt = new Date(job.finished_at ?? job.updated_at ?? 0).getTime();
    if (Date.now() - lastFailedAt < RETRY_COOLDOWN_MS) return;

    // Cap: if research has failed repeatedly in the last day, stop auto-retrying
    // and alert the team so a human can look, instead of billing forever.
    const lookbackFrom = new Date(Date.now() - MAX_FAILED_LOOKBACK_MS).toISOString();
    const { count: recentFailures } = await admin
      .from("case_research_jobs")
      .select("id", { count: "exact", head: true })
      .eq("case_id", caseId)
      .eq("status", "failed")
      .gte("updated_at", lookbackFrom);
    if ((recentFailures ?? 0) >= MAX_FAILED_VERSIONS) {
      await notifyAdminOfResearchFailure({
        product: "Filing Kit research",
        caseId,
        jobId: job.id,
        stage: "ensure_filing_report:max_retries",
        error: new Error(
          `Filing Kit research failed ${recentFailures} times in 24h; auto-retry stopped. Investigate and regenerate manually.`,
        ),
      });
      return;
    }

    await enqueueCaseResearch(caseId, { force: true, source: "ensure_filing_report_retry" });
    return;
  }

  // Succeeded — make sure a published report exists.
  const { data: rep } = await admin
    .from("case_research_reports")
    .select("customer_report_status, customer_report_html, customer_report_published_html")
    .eq("job_id", job.id)
    .maybeSingle();

  const publishedHtml = (rep?.customer_report_published_html as string | undefined) ?? "";
  if (publishedHtml.length > 10) return; // already live

  const draftHtml = (rep?.customer_report_html as string | undefined) ?? "";
  if (draftHtml.length > 10) {
    // Report already written; just publish it. (publishedHtml was empty above,
    // so this is a first publish — safe to email the customer once.)
    await admin
      .from("case_research_reports")
      .update({
        customer_report_status: "published",
        customer_report_published_html: draftHtml,
        customer_report_published_at: new Date().toISOString(),
      })
      .eq("job_id", job.id);
    await notifyCustomerProductReady({
      caseId,
      product: "Filing Kit",
      viewPath: `/case/${caseId}/file`,
    });
    return;
  }

  // Research finished but the report was never written — generate + publish.
  await finalizeCustomerReport(admin, caseId, job.id, { autoPublish: true });
}

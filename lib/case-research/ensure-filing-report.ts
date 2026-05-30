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

export async function ensureFilingReportForCase(caseId: string): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;

  const { data: jobs } = await admin
    .from("case_research_jobs")
    .select("id, status")
    .eq("case_id", caseId)
    .order("version", { ascending: false })
    .limit(1);
  const job = (jobs ?? [])[0] as { id: string; status: string } | undefined;

  if (!job) {
    await enqueueCaseResearch(caseId, { force: false, source: "ensure_filing_report" });
    return;
  }
  if (job.status === "queued" || job.status === "running") return;
  if (job.status === "failed") {
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

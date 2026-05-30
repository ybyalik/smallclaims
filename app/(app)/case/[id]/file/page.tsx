import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { createClient } from "../../../../../lib/supabase/server";
import { createServiceRoleClient } from "../../../../../lib/supabase/service-role";
import type { Case } from "../../../../../lib/supabase/types";
import { hasPaidForProduct } from "../../../../../lib/payments/access";
import { ensureFilingReportForCase } from "../../../../../lib/case-research/ensure-filing-report";
import { STATES } from "../../../../../lib/states";
import ProductDocumentView from "../../../../../components/cases/ProductDocumentView";
import FilingKitStatus from "./FilingKitStatus";
import PageHead from "../../../../../components/layout/PageHead";

export const metadata: Metadata = {
  title: "Your Filing Kit",
};

export const dynamic = "force-dynamic";

export default async function FilingGuidePage({ params }: { params: { id: string } }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createClient() as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: caseRow } = await supabase
    .from("cases")
    .select("*")
    .eq("id", params.id)
    .eq("owner_user_id", user.id)
    .single();
  if (!caseRow) notFound();
  const c = caseRow as Case;

  const paid = await hasPaidForProduct(c.id, "filing_guide");
  if (!paid) {
    redirect(`/case/${c.id}/buy/filing-guide`);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;

  // Latest research job for this case and its auto-published report.
  const { data: jobs } = await admin
    .from("case_research_jobs")
    .select("id")
    .eq("case_id", c.id)
    .order("version", { ascending: false })
    .limit(1);
  const jobId = (jobs ?? [])[0]?.id as string | undefined;

  let publishedHtml = "";
  if (jobId) {
    const { data: report } = await admin
      .from("case_research_reports")
      .select("customer_report_published_html")
      .eq("job_id", jobId)
      .maybeSingle();
    publishedHtml = (report?.customer_report_published_html as string | undefined) ?? "";
  }

  const stateMeta = STATES.find((s) => s.abbr === c.state) ?? null;
  const stateName = stateMeta?.name ?? c.state ?? "your state";
  const isReady = publishedHtml.length > 10;

  // Safety net: paid but no published report yet (older purchase, missed
  // webhook, or a finished-but-unpublished report). Idempotent; fire and
  // forget — the poller picks up the published report and refreshes.
  if (!isReady) {
    ensureFilingReportForCase(c.id).catch((err) => {
      console.error("[file page] ensureFilingReportForCase failed", err);
    });
  }

  return (
    <div>
      <PageHead
        back={{ href: `/case/${c.id}`, label: "Back to Case" }}
        title="Your Filing Kit"
        sub="Researched for your specific case: where to file, the forms you need, fees, service of process, and hearing-day prep."
      />

      {isReady ? (
        <ProductDocumentView
          pdfUrl={`/api/cases/${c.id}/file/report-pdf`}
          title="Filing Kit"
          downloadName="Filing-Kit.pdf"
        />
      ) : (
        <FilingKitStatus caseId={c.id} stateName={stateName} />
      )}
    </div>
  );
}

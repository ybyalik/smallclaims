// GET /api/admin/case-research/[caseId]/customer-report/pdf
//
// Returns the customer report rendered as a PDF download. Defaults to the
// published copy; falls back to the working draft if nothing is published yet.
// Append ?source=draft to force the draft.

import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "../../../../../../../lib/supabase/server";
import { createServiceRoleClient } from "../../../../../../../lib/supabase/service-role";
import { renderHtmlToPdf } from "../../../../../../../lib/pdf/render";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function GET(req: NextRequest, ctx: { params: { caseId: string } }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "auth_required" }, { status: 401 });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;
  const { data: profile } = await admin
    .from("profiles")
    .select("is_admin")
    .eq("user_id", user.id)
    .maybeSingle();
  if (!profile?.is_admin) {
    return NextResponse.json({ error: "not_admin" }, { status: 403 });
  }

  const sourceParam = req.nextUrl.searchParams.get("source");

  const { data: jobs } = await admin
    .from("case_research_jobs")
    .select("id")
    .eq("case_id", ctx.params.caseId)
    .order("version", { ascending: false })
    .limit(1);
  const jobId = (jobs ?? [])[0]?.id;
  if (!jobId) {
    return NextResponse.json({ error: "no_jobs" }, { status: 404 });
  }

  const { data: row } = await admin
    .from("case_research_reports")
    .select("customer_report_html, customer_report_published_html")
    .eq("job_id", jobId)
    .maybeSingle();
  const draftHtml = (row?.customer_report_html as string | undefined) ?? "";
  const publishedHtml = (row?.customer_report_published_html as string | undefined) ?? "";

  const html =
    sourceParam === "draft"
      ? draftHtml
      : publishedHtml || draftHtml;
  if (!html || html.length < 10) {
    return NextResponse.json(
      { error: "no_content", message: "Nothing to export yet." },
      { status: 404 },
    );
  }

  // Pull defendant name + state for the file name + page title
  const { data: caseRow } = await admin
    .from("cases")
    .select("defendant_name, state")
    .eq("id", ctx.params.caseId)
    .maybeSingle();
  const titleSuffix =
    caseRow?.defendant_name || caseRow?.state
      ? ` - ${caseRow?.defendant_name ?? ""}${caseRow?.state ? ` (${caseRow.state})` : ""}`
      : "";
  const title = `Filing guide${titleSuffix}`.trim();
  const fileBase = title.replace(/[^a-z0-9 \-_()]+/gi, "").replace(/\s+/g, "_");

  try {
    const pdf = await renderHtmlToPdf(html, { title });
    return new NextResponse(pdf as unknown as BodyInit, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${fileBase}.pdf"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("[customer-report pdf]", msg);
    return NextResponse.json({ error: "pdf_failed", message: msg }, { status: 500 });
  }
}

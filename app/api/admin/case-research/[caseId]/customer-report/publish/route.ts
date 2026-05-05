// POST /api/admin/case-research/[caseId]/customer-report/publish
//
// Freeze the current customer_report_html as customer_report_published_html
// and flip the status to "published". Customers can only see the published
// (frozen) version; admin edits to the working copy don't affect what's live
// until they publish again.

import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "../../../../../../../lib/supabase/server";
import { createServiceRoleClient } from "../../../../../../../lib/supabase/service-role";

export async function POST(_req: NextRequest, ctx: { params: { caseId: string } }) {
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
    .select("customer_report_html")
    .eq("job_id", jobId)
    .maybeSingle();
  const html = (row?.customer_report_html as string | undefined) ?? "";
  if (html.length < 10) {
    return NextResponse.json(
      { error: "no_draft", message: "There is no draft to publish for this case." },
      { status: 400 },
    );
  }

  await admin
    .from("case_research_reports")
    .update({
      customer_report_published_html: html,
      customer_report_status: "published",
      customer_report_published_at: new Date().toISOString(),
      customer_report_published_by: user.id,
    })
    .eq("job_id", jobId);

  return NextResponse.json({ ok: true, jobId });
}

// POST /api/admin/case-research/[caseId]/customer-report/save
//
// Persist the admin's tiptap edits to the customer_report_html column. Does
// NOT change the published_html — publishing is a separate explicit action.

import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "../../../../../../../lib/supabase/server";
import { createServiceRoleClient } from "../../../../../../../lib/supabase/service-role";

export async function POST(req: NextRequest, ctx: { params: { caseId: string } }) {
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

  let body: { html?: string };
  try {
    body = (await req.json()) as { html?: string };
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }
  if (typeof body.html !== "string" || body.html.length < 10) {
    return NextResponse.json({ error: "html required" }, { status: 400 });
  }

  // Find the latest job for this case
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

  await admin
    .from("case_research_reports")
    .update({ customer_report_html: body.html })
    .eq("job_id", jobId);

  return NextResponse.json({ ok: true, jobId });
}

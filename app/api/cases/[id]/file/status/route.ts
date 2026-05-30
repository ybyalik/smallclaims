// GET /api/cases/[id]/file/status
//
// Lightweight poll endpoint for the Filing Kit "being prepared" screen.
// Returns only { ready } so the client never sees raw pipeline status.
// Ready === a published customer report exists for the latest research job.

import { NextResponse } from "next/server";
import { createClient } from "../../../../../../lib/supabase/server";
import { createServiceRoleClient } from "../../../../../../lib/supabase/service-role";

export const runtime = "nodejs";

export async function GET(_req: Request, ctx: { params: { id: string } }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ ready: false }, { status: 401 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;
  const { data: caseRow } = await admin
    .from("cases")
    .select("owner_user_id")
    .eq("id", ctx.params.id)
    .maybeSingle();
  if (!caseRow || caseRow.owner_user_id !== user.id) {
    return NextResponse.json({ ready: false }, { status: 403 });
  }

  const { data: jobs } = await admin
    .from("case_research_jobs")
    .select("id")
    .eq("case_id", ctx.params.id)
    .order("version", { ascending: false })
    .limit(1);
  const jobId = (jobs ?? [])[0]?.id;
  if (!jobId) {
    return NextResponse.json({ ready: false });
  }

  const { data: report } = await admin
    .from("case_research_reports")
    .select("customer_report_published_html")
    .eq("job_id", jobId)
    .maybeSingle();
  const html = (report?.customer_report_published_html as string | undefined) ?? "";
  return NextResponse.json({ ready: html.length > 10 });
}

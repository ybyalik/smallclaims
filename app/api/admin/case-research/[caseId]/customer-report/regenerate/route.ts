// POST /api/admin/case-research/[caseId]/customer-report/regenerate
//
// Manually re-fire the customer report finalize pipeline for the latest job.
// Useful if the report was already drafted but the admin wants a fresh pass
// after deep research updated, or after fixing prompts.
//
// This will overwrite the working draft (customer_report_html) but never the
// published copy.

import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "../../../../../../../lib/supabase/server";
import { createServiceRoleClient } from "../../../../../../../lib/supabase/service-role";
import { finalizeCustomerReport } from "../../../../../../../lib/case-research/finalize-customer-report";

export const runtime = "nodejs";
export const maxDuration = 300;

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

  // Reset status to pending so the finalize function will overwrite the
  // working draft (it never overwrites "published" — see finalize logic).
  await admin
    .from("case_research_reports")
    .update({ customer_report_status: "pending" })
    .eq("job_id", jobId);

  // Run synchronously. INNGEST_EVENT_KEY is empty in this project's prod env
  // so the Inngest path silently no-ops. Direct invocation is reliable and the
  // route's maxDuration: 300 covers the 30-90s merge + writer work.
  try {
    const result = await finalizeCustomerReport(admin, ctx.params.caseId, jobId);
    return NextResponse.json({ ok: true, ...result });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("[regenerate]", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

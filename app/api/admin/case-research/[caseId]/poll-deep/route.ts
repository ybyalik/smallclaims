// POST /api/admin/case-research/[caseId]/poll-deep
//
// Manual nudge for the admin to ask OpenAI "is the deep research done yet?"
// Same logic as the safety-net cron, scoped to one case. Useful when the
// admin doesn't want to wait for the next 15-min cron tick.

import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "../../../../../../lib/supabase/server";
import { createServiceRoleClient } from "../../../../../../lib/supabase/service-role";
import { completeDeepResearchByResponseId } from "../../../../../../lib/case-research/complete-deep-research";

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

  // Find the latest job for this case + its deep response_id
  const { data: jobs } = await admin
    .from("case_research_jobs")
    .select("id")
    .eq("case_id", ctx.params.caseId)
    .order("version", { ascending: false })
    .limit(1);
  const jobId = (jobs ?? [])[0]?.id;
  if (!jobId) {
    return NextResponse.json({ error: "no jobs for this case" }, { status: 404 });
  }

  const { data: report } = await admin
    .from("case_research_reports")
    .select("deep_research_response_id_a, deep_research_response_id_b")
    .eq("job_id", jobId)
    .maybeSingle();
  const idA = report?.deep_research_response_id_a as string | undefined;
  const idB = report?.deep_research_response_id_b as string | undefined;
  if (!idA && !idB) {
    return NextResponse.json({ error: "no deep research submitted for this job" }, { status: 400 });
  }

  // Poll both calls (whichever exist). Each call to
  // completeDeepResearchByResponseId is idempotent and per-call; if the call
  // is already terminal it no-ops.
  const results: Array<{ responseId: string; outcome?: string; error?: string }> = [];
  for (const responseId of [idA, idB]) {
    if (!responseId) continue;
    try {
      const result = await completeDeepResearchByResponseId(responseId);
      results.push({ responseId, outcome: result.outcome });
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error("[poll-deep]", msg);
      results.push({ responseId, error: msg });
    }
  }
  return NextResponse.json({ ok: true, jobId, results });
}

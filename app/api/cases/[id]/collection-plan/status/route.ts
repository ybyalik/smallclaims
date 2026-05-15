import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "../../../../../../lib/supabase/server";
import { createServiceRoleClient } from "../../../../../../lib/supabase/service-role";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/cases/[id]/collection-plan/status
// Poll endpoint used by the client status component. Returns latest row's
// status + a derived view_state ("ready" | "running" | "cooldown" |
// "max_attempts") + cooldown_seconds_remaining. NEVER returns the raw
// error_message to the customer; that lives in the DB for admin only.

// Keep in sync with lib/collection-plan/generate.ts constants.
const RETRY_COOLDOWN_MS = 5 * 60 * 1000;
const MAX_FAILED_VERSIONS = 3;
const MAX_FAILED_LOOKBACK_MS = 24 * 60 * 60 * 1000;

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "auth_required" }, { status: 401 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;
  const { data: caseRow } = await admin
    .from("cases")
    .select("id, owner_user_id")
    .eq("id", params.id)
    .maybeSingle();
  if (!caseRow || caseRow.owner_user_id !== user.id) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  const { data: plan } = await admin
    .from("collection_plans")
    .select("status, updated_at, body_md")
    .eq("case_id", params.id)
    .order("version", { ascending: false })
    .limit(1)
    .maybeSingle();

  const lookbackIso = new Date(Date.now() - MAX_FAILED_LOOKBACK_MS).toISOString();
  const { count: failedCount } = await admin
    .from("collection_plans")
    .select("id", { count: "exact", head: true })
    .eq("case_id", params.id)
    .eq("status", "failed")
    .gte("updated_at", lookbackIso);

  const status = (plan?.status as string | undefined) ?? "pending";
  const failedCountSafe = typeof failedCount === "number" ? failedCount : 0;
  const lastUpdatedMs = plan?.updated_at
    ? new Date(plan.updated_at).getTime()
    : 0;

  let viewState: "ready" | "running" | "cooldown" | "max_attempts" = "running";
  let cooldownSecondsRemaining = 0;
  if (status === "ready" && plan?.body_md) {
    viewState = "ready";
  } else if (status === "failed") {
    if (failedCountSafe >= MAX_FAILED_VERSIONS) {
      viewState = "max_attempts";
    } else {
      const sinceFailureMs = Date.now() - lastUpdatedMs;
      if (sinceFailureMs < RETRY_COOLDOWN_MS) {
        viewState = "cooldown";
        cooldownSecondsRemaining = Math.ceil(
          (RETRY_COOLDOWN_MS - sinceFailureMs) / 1000,
        );
      }
    }
  }

  return NextResponse.json({
    status,
    view_state: viewState,
    cooldown_seconds_remaining: cooldownSecondsRemaining,
    updated_at: plan?.updated_at ?? null,
  });
}

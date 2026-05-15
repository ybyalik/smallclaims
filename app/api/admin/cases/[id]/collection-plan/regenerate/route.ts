// POST /api/admin/cases/[id]/collection-plan/regenerate
//
// Admin-only. Forces a fresh collection plan generation for a case,
// bypassing the cooldown and max-attempts guards. Inserts a new version
// (max(version) + 1) so older versions stay in the table for audit.

import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "../../../../../../../lib/supabase/server";
import { createServiceRoleClient } from "../../../../../../../lib/supabase/service-role";
import { ensureCollectionPlanForCase } from "../../../../../../../lib/collection-plan/generate";

export const runtime = "nodejs";
// Full pipeline can take up to ~4 minutes (county research + sequencing +
// report). Vercel Pro maxDuration is 800s.
export const maxDuration = 600;

async function requireAdmin() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "auth_required" as const };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;
  const { data: profile } = await admin
    .from("profiles")
    .select("is_admin")
    .eq("user_id", user.id)
    .maybeSingle();
  if (!profile?.is_admin) return { error: "not_admin" as const };
  return { user, admin };
}

export async function POST(_req: NextRequest, ctx: { params: { id: string } }) {
  const guard = await requireAdmin();
  if ("error" in guard) {
    return NextResponse.json({ error: guard.error }, { status: 403 });
  }

  try {
    const result = await ensureCollectionPlanForCase(ctx.params.id, {
      forceNew: true,
    });
    if (result.status === "created") {
      return NextResponse.json({ ok: true, planId: result.planId });
    }
    return NextResponse.json(
      { error: `Could not generate plan: ${result.reason ?? result.status}` },
      { status: 500 },
    );
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("[admin/collection-plan/regenerate] generate failed", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

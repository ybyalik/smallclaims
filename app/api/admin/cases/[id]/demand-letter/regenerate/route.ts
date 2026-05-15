// POST /api/admin/cases/[id]/demand-letter/regenerate
//
// Admin-only. Deletes the existing demand_letters row(s) for the case and
// re-runs the generator with the latest code + latest active prompt
// versions. Useful after a code update or a prompt edit.

import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "../../../../../../../lib/supabase/server";
import { createServiceRoleClient } from "../../../../../../../lib/supabase/service-role";
import { ensureDemandLetterForCase } from "../../../../../../../lib/demand-letter/ensure-letter";

export const runtime = "nodejs";
// Letter generation is one LLM call (~10-30s). 60s is plenty of headroom.
export const maxDuration = 60;

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

  // Additive flow: ensure-letter inserts a new version (max(version) + 1).
  // Older versions stay in the table so an LLM failure never destroys the
  // previously-good letter. The loader always picks the latest version.
  try {
    const result = await ensureDemandLetterForCase(ctx.params.id, {
      forceNew: true,
    });
    if (result.status !== "created") {
      return NextResponse.json(
        { error: `Could not generate letter: ${result.reason ?? result.status}` },
        { status: 500 },
      );
    }
    return NextResponse.json({ ok: true, letterId: result.letterId });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("[admin/demand-letter/regenerate] generate failed", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

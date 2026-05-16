// POST /api/admin/cases/[id]/demand-letter/mail
//
// Admin-only. Triggers the PostGrid certified-mail flow for the given case
// (renders PDF → submits to PostGrid → stamps mail_vendor_letter_id +
// tracking + mail_status on the demand_letters row). Idempotent — if the
// letter already has a PostGrid id, this is a no-op.
//
// Same orchestrator the Inngest worker uses post-payment, just exposed as a
// manual trigger so we can verify the PostGrid env-var wiring without
// running a real Stripe payment first.

import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "../../../../../../../lib/supabase/server";
import { createServiceRoleClient } from "../../../../../../../lib/supabase/service-role";
import { mailDemandLetter } from "../../../../../../../lib/mail/send-demand-letter";

export const runtime = "nodejs";
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
  return { user };
}

export async function POST(_req: NextRequest, ctx: { params: { id: string } }) {
  const guard = await requireAdmin();
  if ("error" in guard) {
    return NextResponse.json({ error: guard.error }, { status: 403 });
  }
  try {
    const result = await mailDemandLetter(ctx.params.id);
    return NextResponse.json(result);
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    console.error("[admin/demand-letter/mail] failed", message);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

// POST /api/admin/cases/[id]/demand-letter/save
//
// Admin-only. Persists hand-edited body_md back to the latest demand_letters
// row. Doesn't run the generator. Mail dispatch (if/when wired) reads
// body_md so this is what actually changes the mailed letter.

import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "../../../../../../../lib/supabase/server";
import { createServiceRoleClient } from "../../../../../../../lib/supabase/service-role";

export const runtime = "nodejs";

const MAX_BODY = 50_000;

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

export async function POST(req: NextRequest, ctx: { params: { id: string } }) {
  const guard = await requireAdmin();
  if ("error" in guard) {
    return NextResponse.json({ error: guard.error }, { status: 403 });
  }
  const { admin } = guard;

  let body: { body_md?: unknown };
  try {
    body = (await req.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const bodyMd = typeof body.body_md === "string" ? body.body_md : "";
  if (!bodyMd.trim()) {
    return NextResponse.json({ error: "body_md required" }, { status: 400 });
  }
  if (bodyMd.length > MAX_BODY) {
    return NextResponse.json({ error: "body_md too long" }, { status: 400 });
  }

  // Update the latest letter row for this case. If no row exists, this is
  // a no-op (admin should regenerate first).
  const { data: latest } = await admin
    .from("demand_letters")
    .select("id, mail_vendor_letter_id, mail_status")
    .eq("case_id", ctx.params.id)
    .order("version", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (!latest?.id) {
    return NextResponse.json(
      { error: "No demand letter exists yet. Click Regenerate first." },
      { status: 404 },
    );
  }

  // Never overwrite the text of a letter that has already been physically
  // mailed — that would destroy the record of what the defendant actually
  // received (this is a legal document). To revise a mailed letter, regenerate
  // a new version instead. Mirrors the ready-for-review route's guard.
  if (latest.mail_vendor_letter_id) {
    return NextResponse.json(
      {
        error:
          "This letter has already been mailed and can't be edited. Regenerate a new version to make changes.",
      },
      { status: 409 },
    );
  }

  const { error: updErr } = await admin
    .from("demand_letters")
    .update({
      body_md: bodyMd,
      updated_at: new Date().toISOString(),
    })
    .eq("id", latest.id);
  if (updErr) {
    console.error("[admin/demand-letter/save] update failed", updErr);
    return NextResponse.json({ error: updErr.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, letterId: latest.id });
}

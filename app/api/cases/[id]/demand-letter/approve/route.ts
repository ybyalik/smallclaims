// POST /api/cases/[id]/demand-letter/approve
//
// Owner-only. Customer approves the latest demand letter for mailing.
// Idempotent: if the letter is already approved or already has a PostGrid
// id, returns ok=true without re-firing.

import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "../../../../../../lib/supabase/server";
import { createServiceRoleClient } from "../../../../../../lib/supabase/service-role";
import { inngest } from "../../../../../../lib/inngest/client";
import { resolveActionRequired } from "../../../../../../lib/notifications";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(_req: NextRequest, ctx: { params: { id: string } }) {
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
    .eq("id", ctx.params.id)
    .maybeSingle();
  if (!caseRow || caseRow.owner_user_id !== user.id) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  const { data: letter } = await admin
    .from("demand_letters")
    .select("id, version, approval_status, mail_vendor_letter_id")
    .eq("case_id", ctx.params.id)
    .order("version", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (!letter) {
    return NextResponse.json({ error: "no_letter" }, { status: 404 });
  }

  // Already mailed → nothing to do.
  if (letter.mail_vendor_letter_id) {
    return NextResponse.json({ ok: true, already_mailed: true });
  }

  // Stamp approval and clear any prior change-request state in one update.
  const now = new Date().toISOString();
  await admin
    .from("demand_letters")
    .update({
      approval_status: "approved",
      approved_at: now,
      changes_requested_at: null,
      changes_text: null,
    })
    .eq("id", letter.id);

  // Fire the mail event. The id includes this approval's timestamp so that a
  // re-approval after a hand-edit (which does not bump the letter version)
  // still sends — keying on version alone made the second approval collide
  // with the first and get silently deduped, so the edited letter never mailed.
  // mailDemandLetter still rechecks approval_status and the mail_vendor_letter_id
  // guard above prevents re-mailing an already-sent letter.
  await inngest.send({
    name: "case/letter.send",
    id: `letter-send:${ctx.params.id}:v${letter.version}:${now}`,
    data: { caseId: ctx.params.id },
  });

  // Clear the "ready for review" bell — the customer just acted on it.
  await resolveActionRequired(user.id, ctx.params.id, "letter_ready_for_review");

  return NextResponse.json({ ok: true, approved_at: now });
}

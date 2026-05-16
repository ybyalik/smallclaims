// POST /api/admin/cases/[id]/demand-letter/ready-for-review
//
// Admin-only. After addressing a customer's change request (regenerate /
// hand-edit / both), the admin flips the letter back to approval_status
// 'pending' so the customer sees it as ready for a fresh review. Triggers
// an email + an in-app notification so the customer knows to look.

import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "../../../../../../../lib/supabase/server";
import { createServiceRoleClient } from "../../../../../../../lib/supabase/service-role";
import { sendEmail } from "../../../../../../../lib/resend";
import { createNotification } from "../../../../../../../lib/notifications";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(_req: NextRequest, ctx: { params: { id: string } }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "auth_required" }, { status: 401 });

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

  const { data: caseRow } = await admin
    .from("cases")
    .select("id, owner_user_id, plaintiff_name, defendant_name")
    .eq("id", ctx.params.id)
    .maybeSingle();
  if (!caseRow) {
    return NextResponse.json({ error: "case_not_found" }, { status: 404 });
  }

  const { data: letter } = await admin
    .from("demand_letters")
    .select("id, version, mail_vendor_letter_id")
    .eq("case_id", ctx.params.id)
    .order("version", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (!letter) {
    return NextResponse.json({ error: "no_letter" }, { status: 404 });
  }
  if (letter.mail_vendor_letter_id) {
    return NextResponse.json(
      { error: "already_mailed", message: "Letter is already in the mail." },
      { status: 409 },
    );
  }

  await admin
    .from("demand_letters")
    .update({
      approval_status: "pending",
      changes_requested_at: null,
      changes_text: null,
      approved_at: null,
    })
    .eq("id", letter.id);

  // Notify customer (email + in-app).
  // Pull the owner's email from auth.users via the service-role admin API.
  const { data: ownerUser } = await admin.auth.admin.getUserById(caseRow.owner_user_id);
  const ownerEmail = ownerUser?.user?.email ?? null;
  const caseName = `${caseRow.plaintiff_name ?? "Plaintiff"} v. ${caseRow.defendant_name ?? "Defendant"}`;
  const link = `https://civilcase.com/case/${ctx.params.id}/letter`;

  if (ownerEmail) {
    await sendEmail({
      to: ownerEmail,
      subject: `Your revised demand letter is ready for review`,
      text: [
        `Hi,`,
        ``,
        `Good news, the revised version of your demand letter for ${caseName} is ready.`,
        ``,
        `Take a look and approve it when you're happy with it. Until you approve, the letter stays here in your dashboard, nothing is mailed.`,
        ``,
        `Review your letter: ${link}`,
        ``,
        `Thanks,`,
        `CivilCase`,
      ].join("\n"),
    });
  }

  await createNotification({
    userId: caseRow.owner_user_id,
    caseId: ctx.params.id,
    type: "letter_ready_for_review",
    title: "Revised letter ready for review",
    body: `${caseName}: we made the changes you asked for. Review and approve when you're happy with it.`,
    link: `/case/${ctx.params.id}/letter`,
  });

  return NextResponse.json({ ok: true });
}

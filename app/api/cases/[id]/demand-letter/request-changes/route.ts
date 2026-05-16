// POST /api/cases/[id]/demand-letter/request-changes
// body: { feedback: string }
//
// Owner-only. Customer asks for edits before the letter goes out. We stamp
// the request on the demand_letters row, email the admin team (best-effort),
// and write an in-app notification so the customer sees a confirmation in
// the bell. The letter stays unmailed until an admin marks it ready again.

import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "../../../../../../lib/supabase/server";
import { createServiceRoleClient } from "../../../../../../lib/supabase/service-role";
import { sendEmail } from "../../../../../../lib/resend";
import { createNotification } from "../../../../../../lib/notifications";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_FEEDBACK_CHARS = 4000;

export async function POST(req: NextRequest, ctx: { params: { id: string } }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "auth_required" }, { status: 401 });
  }

  let body: { feedback?: unknown };
  try {
    body = (await req.json()) as { feedback?: unknown };
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }
  const feedback =
    typeof body.feedback === "string" ? body.feedback.trim() : "";
  if (!feedback || feedback.length < 5) {
    return NextResponse.json(
      { error: "feedback_required", message: "Tell us what you'd like changed." },
      { status: 400 },
    );
  }
  const truncated = feedback.slice(0, MAX_FEEDBACK_CHARS);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;

  const { data: caseRow } = await admin
    .from("cases")
    .select("id, owner_user_id, plaintiff_name, defendant_name")
    .eq("id", ctx.params.id)
    .maybeSingle();
  if (!caseRow || caseRow.owner_user_id !== user.id) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
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
      { error: "already_mailed", message: "This letter is already in the mail and can't be edited." },
      { status: 409 },
    );
  }

  const now = new Date().toISOString();
  await admin
    .from("demand_letters")
    .update({
      approval_status: "changes_requested",
      changes_requested_at: now,
      changes_text: truncated,
      approved_at: null,
    })
    .eq("id", letter.id);

  // Notify admin via email so the team picks it up promptly.
  const adminEmail = process.env.ADMIN_NOTIFICATIONS_EMAIL;
  if (adminEmail) {
    const caseName = `${caseRow.plaintiff_name ?? "Plaintiff"} v. ${caseRow.defendant_name ?? "Defendant"}`;
    await sendEmail({
      to: adminEmail,
      subject: `[CivilCase] Letter changes requested — ${caseName}`,
      text: [
        `A customer asked for changes to their demand letter before it goes out.`,
        ``,
        `Case: ${caseName}`,
        `Customer: ${user.email ?? "(unknown email)"}`,
        `Admin link: https://civilcase.com/admin/cases/${ctx.params.id}`,
        ``,
        `Their feedback:`,
        truncated,
      ].join("\n"),
      replyTo: user.email ?? undefined,
    });
  }

  // In-app confirmation for the customer (shows in the bell + /dashboard/notifications).
  await createNotification({
    userId: user.id,
    caseId: ctx.params.id,
    type: "changes_acknowledged",
    title: "We got your change request",
    body:
      "Our team is making the edits you asked for. You'll get another notification when the revised letter is ready for review.",
    link: `/case/${ctx.params.id}/letter`,
  });

  return NextResponse.json({ ok: true, requested_at: now });
}

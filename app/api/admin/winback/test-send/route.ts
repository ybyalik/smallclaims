// POST /api/admin/winback/test-send
// body: { subject, body_html }
//
// Admin-only. Sends the CURRENT editor content (saved or not) to the logged-in
// admin's own email with sample merge data, so copy can be previewed in a real
// inbox before enabling the step.

import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "../../../../../lib/supabase/server";
import { createServiceRoleClient } from "../../../../../lib/supabase/service-role";
import { sendEmail } from "../../../../../lib/resend";
import { renderWinback, type WinbackMergeData } from "../../../../../lib/winback/templates";
import { unsubscribeUrl } from "../../../../../lib/winback/unsubscribe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) return NextResponse.json({ error: "auth_required" }, { status: 401 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;
  const { data: profile } = await admin
    .from("profiles")
    .select("is_admin")
    .eq("user_id", user.id)
    .maybeSingle();
  if (!profile?.is_admin) return NextResponse.json({ error: "not_admin" }, { status: 403 });

  let body: { subject?: unknown; body_html?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }
  const subject = typeof body.subject === "string" ? body.subject : "";
  const bodyHtml = typeof body.body_html === "string" ? body.body_html : "";
  if (!subject || !bodyHtml) {
    return NextResponse.json({ error: "subject_and_body_required" }, { status: 400 });
  }

  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://civilcase.com";
  const sample: WinbackMergeData = {
    first_name: "Jordan",
    defendant_name: "Oakwood Properties LLC",
    amount: "$1,200.00",
    state_name: "California",
    resume_url: `${base}/case/sample`,
    unsubscribe_url: unsubscribeUrl(user.email),
  };

  const result = await sendEmail({
    to: user.email,
    subject: `[TEST] ${renderWinback(subject, sample, { escape: false })}`,
    text: renderWinback(bodyHtml, sample, { escape: false }).replace(/<[^>]+>/g, ""),
    html: renderWinback(bodyHtml, sample, { escape: true }),
  });
  if (!result.ok) {
    return NextResponse.json(
      { error: "send_failed", message: result.error ?? "send failed" },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true, to: user.email });
}

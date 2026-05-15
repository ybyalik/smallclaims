// POST /api/support
//
// Authenticated support contact form. Sends the message to the support
// inbox (SUPPORT_EMAIL env, falls back to ybyalik@gmail.com) via Resend,
// with the user's email set as Reply-To so we can reply from any client.
//
// Body: { subject: string, message: string }

import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "../../../lib/supabase/server";
import { createServiceRoleClient } from "../../../lib/supabase/service-role";
import { sendEmail } from "../../../lib/resend";

export const runtime = "nodejs";
export const maxDuration = 30;

const MAX_SUBJECT = 200;
const MAX_MESSAGE = 10_000;
const SUPPORT_INBOX = process.env.SUPPORT_EMAIL || "contact@civilcase.com";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || !user.email) {
    return NextResponse.json({ error: "auth_required" }, { status: 401 });
  }

  let body: { subject?: unknown; message?: unknown };
  try {
    body = (await req.json()) as { subject?: unknown; message?: unknown };
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const subject = typeof body.subject === "string" ? body.subject.trim().slice(0, MAX_SUBJECT) : "";
  const message = typeof body.message === "string" ? body.message.trim().slice(0, MAX_MESSAGE) : "";
  if (!message) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }

  // Look up the user's display name for nicer email rendering.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;
  const { data: profile } = await admin
    .from("profiles")
    .select("full_name")
    .eq("user_id", user.id)
    .maybeSingle();
  const fromName = (profile?.full_name as string | null) || user.email;

  const finalSubject = `[CivilCase Support] ${subject || "New message"} — ${fromName}`;

  const textBody = [
    `From: ${fromName} <${user.email}>`,
    `User ID: ${user.id}`,
    `Subject: ${subject || "(none)"}`,
    "",
    "Message:",
    message,
  ].join("\n");

  const htmlBody = `
    <div style="font-family: system-ui, sans-serif; max-width: 640px; margin: 0 auto;">
      <h2 style="margin: 0 0 12px;">Support request</h2>
      <table style="border-collapse: collapse; font-size: 14px; margin-bottom: 18px;">
        <tr><td style="padding: 4px 12px 4px 0; color: #6b6b6b;">From</td><td>${escapeHtml(fromName)} &lt;${escapeHtml(user.email)}&gt;</td></tr>
        <tr><td style="padding: 4px 12px 4px 0; color: #6b6b6b;">User ID</td><td><code>${escapeHtml(user.id)}</code></td></tr>
        <tr><td style="padding: 4px 12px 4px 0; color: #6b6b6b;">Subject</td><td>${escapeHtml(subject || "(none)")}</td></tr>
      </table>
      <div style="white-space: pre-wrap; font-size: 14px; line-height: 1.5; border-left: 3px solid #d9402e; padding-left: 14px;">${escapeHtml(message)}</div>
    </div>
  `;

  await sendEmail({
    to: SUPPORT_INBOX,
    subject: finalSubject,
    text: textBody,
    html: htmlBody,
    replyTo: user.email,
  });

  return NextResponse.json({ ok: true });
}

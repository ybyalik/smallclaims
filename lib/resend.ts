// Resend email helpers.

import { Resend } from "resend";

let _resend: Resend | null = null;

function getResend(): Resend {
  if (_resend) return _resend;
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY not set");
  _resend = new Resend(key);
  return _resend;
}

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "CivilCase <onboarding@resend.dev>";
// `onboarding@resend.dev` works without a verified domain; once civilcase.com
// is verified in Resend, set RESEND_FROM_EMAIL to e.g. "CivilCase <noreply@civilcase.com>".

export interface SendEmailOpts {
  to: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
}

export async function sendEmail(opts: SendEmailOpts): Promise<void> {
  try {
    const resend = getResend();
    await resend.emails.send({
      from: FROM_EMAIL,
      to: opts.to,
      subject: opts.subject,
      text: opts.text,
      html: opts.html,
      replyTo: opts.replyTo,
    });
  } catch (err) {
    // Email failures shouldn't block business flows, but should be logged.
    console.error("[resend] send failed:", err);
  }
}

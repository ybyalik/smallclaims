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
  // Extra SMTP headers, e.g. List-Unsubscribe for the winback sequence.
  headers?: Record<string, string>;
}

export interface SendEmailResult {
  ok: boolean;
  error?: string;
}

// Sends an email and reports whether it actually went out. IMPORTANT: the
// Resend SDK does NOT throw on API errors (bad key, unverified from-domain,
// rate limit) — it resolves with `{ error }`. We must inspect that, otherwise
// a failed send looks like a success. Still never throws, so callers that
// don't care can ignore the result; callers that must not lose the message
// (contact/support forms) should check `.ok`.
export async function sendEmail(opts: SendEmailOpts): Promise<SendEmailResult> {
  try {
    const resend = getResend();
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: opts.to,
      subject: opts.subject,
      text: opts.text,
      html: opts.html,
      replyTo: opts.replyTo,
      headers: opts.headers,
    });
    if (error) {
      console.error("[resend] send returned error:", error);
      return { ok: false, error: error.message ?? String(error) };
    }
    return { ok: true };
  } catch (err) {
    // Network-level or config failure. Log; report failure to the caller.
    console.error("[resend] send failed:", err);
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

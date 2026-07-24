// Signed unsubscribe tokens for winback emails.
//
// The link in every winback email is /api/email/unsubscribe?token=<t>, where
// the token is base64url("<email>.<hmac>"). The HMAC stops anyone from
// unsubscribing arbitrary addresses by guessing URLs. Secret: dedicated
// WINBACK_UNSUB_SECRET if set, else CRON_SECRET (already in prod env).

import crypto from "node:crypto";

function secret(): string {
  const s = process.env.WINBACK_UNSUB_SECRET || process.env.CRON_SECRET;
  if (!s) throw new Error("No WINBACK_UNSUB_SECRET / CRON_SECRET set");
  return s;
}

function sign(email: string): string {
  return crypto.createHmac("sha256", secret()).update(email.toLowerCase()).digest("hex").slice(0, 32);
}

export function unsubscribeToken(email: string): string {
  const e = email.toLowerCase();
  return Buffer.from(`${e}.${sign(e)}`).toString("base64url");
}

// Returns the email if the token is valid, null otherwise.
export function verifyUnsubscribeToken(token: string): string | null {
  try {
    const raw = Buffer.from(token, "base64url").toString("utf8");
    const dot = raw.lastIndexOf(".");
    if (dot <= 0) return null;
    const email = raw.slice(0, dot);
    const mac = raw.slice(dot + 1);
    const expected = sign(email);
    if (mac.length !== expected.length) return null;
    if (!crypto.timingSafeEqual(Buffer.from(mac), Buffer.from(expected))) return null;
    return email;
  } catch {
    return null;
  }
}

export function unsubscribeUrl(email: string): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://civilcase.com";
  return `${base}/api/email/unsubscribe?token=${unsubscribeToken(email)}`;
}

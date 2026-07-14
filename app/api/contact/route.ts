// POST /api/contact
//
// Public (unauthenticated) contact form for the marketing site. Emails the
// message to the support/admin inbox via Resend, with the sender's address as
// Reply-To so the team can reply from any client.
//
// Recipients resolve to SUPPORT_EMAIL, then ADMIN_NOTIFICATIONS_EMAIL (which
// is set in production), then a hardcoded fallback — so a misconfigured env
// never silently drops a customer message.
//
// Body: { name, email, state, category, message, website }
// `website` is a honeypot: real users never see it, bots fill it. If it's
// non-empty we accept the request (return ok) but send nothing.

import { NextResponse, type NextRequest } from "next/server";
import { sendEmail } from "../../../lib/resend";

export const runtime = "nodejs";
export const maxDuration = 30;

const MAX_NAME = 200;
const MAX_EMAIL = 320;
const MAX_SHORT = 120;
const MAX_MESSAGE = 10_000;

function str(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function recipients(): string[] {
  const raw =
    process.env.SUPPORT_EMAIL ||
    process.env.ADMIN_NOTIFICATIONS_EMAIL ||
    "contact@civilcase.com";
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

// Best-effort per-instance rate limit. This is a first line of defense against
// a script hammering the public endpoint (which would flood the inbox and burn
// the Resend quota). It's per serverless instance and resets on cold start, so
// it is NOT a substitute for a durable, shared-store limiter — but it meaningfully
// slows a single attacker hitting a warm instance and costs nothing.
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 5;
const rateHits = new Map<string, number[]>();
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (rateHits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  rateHits.set(ip, recent);
  if (rateHits.size > 5000) {
    for (const [k, v] of rateHits) {
      if (v.every((t) => now - t > RATE_WINDOW_MS)) rateHits.delete(k);
    }
  }
  return recent.length > RATE_MAX;
}

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for") || "";
  return fwd.split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown";
}

export async function POST(req: NextRequest) {
  if (isRateLimited(clientIp(req))) {
    return NextResponse.json(
      { error: "You're sending messages too quickly. Please wait a minute and try again." },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: silently accept and drop bot submissions.
  if (str(body.website, 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = str(body.name, MAX_NAME);
  const email = str(body.email, MAX_EMAIL);
  const state = str(body.state, MAX_SHORT);
  const category = str(body.category, MAX_SHORT);
  const message = str(body.message, MAX_MESSAGE);

  if (!message) {
    return NextResponse.json(
      { error: "Please include a short message." },
      { status: 400 },
    );
  }
  // Basic email sanity check (presence + shape). We don't hard-require it, but
  // if provided it must look like an address so Reply-To is usable.
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "That email address doesn't look right." },
      { status: 400 },
    );
  }

  const fromLabel = name || email || "Website visitor";
  const subject = `[CivilCase Contact] ${category || "General"}${state ? ` · ${state}` : ""} — ${fromLabel}`;

  const textBody = [
    `From:     ${name || "(no name)"} <${email || "no email provided"}>`,
    `State:    ${state || "(none)"}`,
    `Category: ${category || "(none)"}`,
    "",
    "Message:",
    message,
  ].join("\n");

  const htmlBody = `
    <div style="font-family: system-ui, sans-serif; max-width: 640px; margin: 0 auto;">
      <h2 style="margin: 0 0 12px;">New contact-form message</h2>
      <table style="border-collapse: collapse; font-size: 14px; margin-bottom: 18px;">
        <tr><td style="padding: 4px 12px 4px 0; color: #6b6b6b;">Name</td><td>${escapeHtml(name || "(none)")}</td></tr>
        <tr><td style="padding: 4px 12px 4px 0; color: #6b6b6b;">Email</td><td>${escapeHtml(email || "(none)")}</td></tr>
        <tr><td style="padding: 4px 12px 4px 0; color: #6b6b6b;">State</td><td>${escapeHtml(state || "(none)")}</td></tr>
        <tr><td style="padding: 4px 12px 4px 0; color: #6b6b6b;">Category</td><td>${escapeHtml(category || "(none)")}</td></tr>
      </table>
      <div style="white-space: pre-wrap; font-size: 14px; line-height: 1.5; border-left: 3px solid #b8331f; padding-left: 14px;">${escapeHtml(message)}</div>
    </div>
  `;

  // Send to each recipient and check the actual outcome. If NOTHING got
  // through, tell the visitor honestly and point them at a direct address so
  // their message isn't silently lost (sendEmail does not throw on API errors).
  const sendResults = await Promise.all(
    recipients().map((to) =>
      sendEmail({
        to,
        subject,
        text: textBody,
        html: htmlBody,
        // Only set Reply-To when we have a valid address to reply to.
        replyTo: email || undefined,
      }),
    ),
  );
  if (!sendResults.some((r) => r.ok)) {
    console.error("[contact] all sends failed", {
      errors: sendResults.map((r) => r.error),
    });
    return NextResponse.json(
      { error: "We couldn't send your message right now. Please email us directly at contact@civilcase.com." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

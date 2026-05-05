// POST /api/webhooks/openai
//
// Handles OpenAI webhook events for the Responses API. Subscribed to:
//   - response.completed
//   - response.failed
//   - response.cancelled
//   - response.incomplete
//
// Verification follows the Standard Webhooks spec:
//   webhook-id        : unique event id (also used for dedup)
//   webhook-timestamp : unix seconds
//   webhook-signature : "v1,base64sig" — HMAC-SHA256 over `${id}.${ts}.${body}`
//                       using the secret from the OpenAI dashboard
//
// Configure in OpenAI dashboard:
//   URL    : https://civilcase.com/api/webhooks/openai
//   Events : response.completed, response.failed, response.cancelled
//   Then copy the signing secret into Vercel env as OPENAI_WEBHOOK_SECRET.

import { NextResponse, type NextRequest } from "next/server";
import crypto from "node:crypto";
import { completeDeepResearchByResponseId } from "../../../../lib/case-research/complete-deep-research";

export const runtime = "nodejs";
// Webhook is now lightweight: it just marks the call succeeded and persists
// the findings. Combined extraction, merge, and writer all run from the
// poll-deep-research cron instead. Keeping a generous budget for safety.
export const maxDuration = 60;

const TIMESTAMP_TOLERANCE_S = 5 * 60; // reject events older than 5 minutes

export async function POST(req: NextRequest) {
  const secret = process.env.OPENAI_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[openai-webhook] OPENAI_WEBHOOK_SECRET not set");
    return NextResponse.json({ error: "not configured" }, { status: 500 });
  }

  const id = req.headers.get("webhook-id");
  const ts = req.headers.get("webhook-timestamp");
  const sig = req.headers.get("webhook-signature");
  if (!id || !ts || !sig) {
    return NextResponse.json({ error: "missing signature headers" }, { status: 400 });
  }

  // Reject obviously stale or future-dated events
  const tsNum = Number.parseInt(ts, 10);
  if (!Number.isFinite(tsNum)) {
    return NextResponse.json({ error: "bad timestamp" }, { status: 400 });
  }
  const nowS = Math.floor(Date.now() / 1000);
  if (Math.abs(nowS - tsNum) > TIMESTAMP_TOLERANCE_S) {
    return NextResponse.json({ error: "timestamp out of tolerance" }, { status: 400 });
  }

  const rawBody = await req.text();
  if (!verifySignature(secret, id, ts, rawBody, sig)) {
    return NextResponse.json({ error: "invalid signature" }, { status: 401 });
  }

  let event: {
    id: string;
    type: string;
    created_at?: number;
    data?: { id?: string };
  };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const responseId = event.data?.id;
  if (!responseId) {
    return NextResponse.json({ ok: true, ignored: "no data.id" });
  }

  // We care about terminal states for Responses API events. Anything else
  // (response.in_progress, etc.) we acknowledge and ignore.
  const terminal = new Set([
    "response.completed",
    "response.failed",
    "response.cancelled",
    "response.incomplete",
  ]);
  if (!terminal.has(event.type)) {
    return NextResponse.json({ ok: true, ignored: event.type });
  }

  try {
    const result = await completeDeepResearchByResponseId(responseId);
    return NextResponse.json({ ok: true, event: event.type, ...result });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("[openai-webhook] completion failed:", msg);
    // Return 500 so OpenAI retries delivery
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

function verifySignature(
  secret: string,
  id: string,
  ts: string,
  body: string,
  sigHeader: string,
): boolean {
  // Standard Webhooks: secret is "whsec_<base64>"; strip prefix if present
  const rawSecret = secret.startsWith("whsec_") ? secret.slice("whsec_".length) : secret;
  let secretBytes: Buffer;
  try {
    secretBytes = Buffer.from(rawSecret, "base64");
  } catch {
    secretBytes = Buffer.from(rawSecret, "utf8");
  }

  const signedPayload = `${id}.${ts}.${body}`;
  const expected = crypto
    .createHmac("sha256", secretBytes)
    .update(signedPayload)
    .digest("base64");

  // sigHeader is space-separated "v1,base64 v1,base64 ..." — accept any
  // matching version 1 signature.
  for (const entry of sigHeader.split(/\s+/)) {
    const [version, value] = entry.split(",");
    if (version !== "v1" || !value) continue;
    try {
      const a = Buffer.from(value, "base64");
      const b = Buffer.from(expected, "base64");
      if (a.length === b.length && crypto.timingSafeEqual(a, b)) return true;
    } catch {
      // Skip malformed entries
    }
  }
  return false;
}

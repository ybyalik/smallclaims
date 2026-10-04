// PostGrid certified-mail integration.
// Docs: https://docs.postgrid.com/
//
// Env vars required:
//   POSTGRID_API_KEY            — test_sk_... or live_sk_...
//   POSTGRID_WEBHOOK_SECRET     — for webhook signature verification
//   POSTGRID_SENDER_NAME        — return address name (e.g. "CivilCase")
//   POSTGRID_SENDER_COMPANY     — return address company name (optional)
//   POSTGRID_SENDER_LINE1
//   POSTGRID_SENDER_LINE2       — optional
//   POSTGRID_SENDER_CITY
//   POSTGRID_SENDER_STATE       — 2-letter
//   POSTGRID_SENDER_ZIP
//
// Behavior when the API key is absent: createCertifiedLetter() returns null
// and logs a warning. This lets the rest of the app keep running in dev /
// before PostGrid is configured. The mail_status column on demand_letters
// stays "draft" so the UI shows the letter as not-yet-sent.

import crypto from "node:crypto";

const BASE_URL = "https://api.postgrid.com/print-mail/v1";

export interface PostGridAddress {
  firstName?: string | null;
  lastName?: string | null;
  companyName?: string | null;
  addressLine1: string;
  addressLine2?: string | null;
  city: string;
  provinceOrState: string; // 2-letter
  postalOrZip: string;
  country: string; // ISO-2; default "US"
}

export interface CreateLetterInput {
  to: PostGridAddress;
  // Optional sender override. When omitted, the env-var sender (CivilCase)
  // is used. Set this when the plaintiff opted out of CivilCase letterhead
  // so the envelope/carrier sheet matches the body of the letter.
  from?: PostGridAddress;
  pdfBuffer: Buffer;
  description: string;
  metadata?: Record<string, string>;
  // Always certified return-receipt for our use case. Surfaced as a knob
  // so test scripts can override.
  extraService?: "certified" | "certified_return_receipt";
  // Stable key so a retried dispatch (timeout / crash between the API call
  // and saving the result) does not create a SECOND physical letter. PostGrid
  // returns the original letter for a repeated Idempotency-Key.
  idempotencyKey?: string;
}

export interface PostGridLetter {
  id: string;
  status: string;
  trackingNumber: string | null;
  sendDate: string | null;
  metadata: Record<string, string>;
  imbStatus?: string | null;
}

interface PostGridErrorBody {
  message?: string;
  type?: string;
}

function senderAddress(): PostGridAddress | null {
  const line1 = process.env.POSTGRID_SENDER_LINE1;
  const city = process.env.POSTGRID_SENDER_CITY;
  const state = process.env.POSTGRID_SENDER_STATE;
  const zip = process.env.POSTGRID_SENDER_ZIP;
  if (!line1 || !city || !state || !zip) return null;
  // We're sending as a business, so only set companyName. PostGrid prints
  // firstName + companyName on separate lines if both are set, which would
  // duplicate "CivilCase" on the carrier sheet.
  const company =
    process.env.POSTGRID_SENDER_COMPANY ||
    process.env.POSTGRID_SENDER_NAME ||
    "CivilCase";
  return {
    companyName: company,
    addressLine1: line1,
    addressLine2: process.env.POSTGRID_SENDER_LINE2 || null,
    city,
    provinceOrState: state,
    postalOrZip: zip,
    country: "US",
  };
}

function isConfigured(): boolean {
  return Boolean(process.env.POSTGRID_API_KEY) && senderAddress() !== null;
}

/**
 * Create a certified-with-return-receipt letter through PostGrid. Returns
 * the letter object on success, null when PostGrid isn't configured (so
 * the caller can keep working in dev). Throws on real API errors so the
 * background job can retry.
 */
export async function createCertifiedLetter(
  input: CreateLetterInput,
): Promise<PostGridLetter | null> {
  const apiKey = process.env.POSTGRID_API_KEY;
  // Caller may supply a sender (e.g. plaintiff opted out of CivilCase
  // letterhead, so the envelope should match the body). Fall back to the
  // CivilCase env-var sender otherwise.
  const from = input.from ?? senderAddress();
  if (!apiKey || !from) {
    console.warn(
      "[postgrid] not configured — skipping mail dispatch. Set POSTGRID_API_KEY and POSTGRID_SENDER_* envs.",
    );
    return null;
  }

  // PostGrid accepts the PDF either as a URL or as a multipart upload. We
  // use multipart so we don't need to host the PDF anywhere first.
  const form = new FormData();
  appendAddress(form, "to", input.to);
  appendAddress(form, "from", from);
  form.append(
    "pdf",
    new Blob([new Uint8Array(input.pdfBuffer)], { type: "application/pdf" }),
    "letter.pdf",
  );
  form.append("color", "false");
  form.append("doubleSided", "true");
  // Use a separate carrier sheet for the recipient address so PostGrid's
  // auto-printed address block doesn't overlap our cover letter / letterhead.
  // top_first_page reserves the top ~3in of page 1 for the address window;
  // our CivilCase cover letter occupies exactly that area, which produces
  // "Content found overlapping address region" rejections from PostGrid.
  form.append("addressPlacement", "insert_blank_page");
  form.append("mailingClass", "first_class");
  form.append("extraService", input.extraService ?? "certified_return_receipt");
  form.append("description", input.description.slice(0, 256));
  if (input.metadata) {
    for (const [k, v] of Object.entries(input.metadata)) {
      form.append(`metadata[${k}]`, v);
    }
  }

  const headers: Record<string, string> = { "x-api-key": apiKey };
  if (input.idempotencyKey) {
    headers["Idempotency-Key"] = input.idempotencyKey;
  }

  const resp = await fetch(`${BASE_URL}/letters`, {
    method: "POST",
    headers,
    body: form,
  });

  if (!resp.ok) {
    const text = await resp.text().catch(() => "");
    let parsed: PostGridErrorBody | null = null;
    try {
      parsed = JSON.parse(text) as PostGridErrorBody;
    } catch {
      // ignore — body wasn't JSON
    }
    throw new Error(
      `PostGrid letter create failed (${resp.status}): ${parsed?.message ?? text.slice(0, 300)}`,
    );
  }

  const body = (await resp.json()) as {
    id: string;
    status: string;
    trackingNumber?: string | null;
    sendDate?: string | null;
    metadata?: Record<string, string>;
    imbStatus?: string | null;
  };

  return {
    id: body.id,
    status: body.status,
    trackingNumber: body.trackingNumber ?? null,
    sendDate: body.sendDate ?? null,
    metadata: body.metadata ?? {},
    imbStatus: body.imbStatus ?? null,
  };
}

function appendAddress(form: FormData, prefix: string, addr: PostGridAddress): void {
  const fields: Record<string, string | null | undefined> = {
    [`${prefix}[firstName]`]: addr.firstName,
    [`${prefix}[lastName]`]: addr.lastName,
    [`${prefix}[companyName]`]: addr.companyName,
    [`${prefix}[addressLine1]`]: addr.addressLine1,
    [`${prefix}[addressLine2]`]: addr.addressLine2,
    [`${prefix}[city]`]: addr.city,
    [`${prefix}[provinceOrState]`]: addr.provinceOrState,
    [`${prefix}[postalOrZip]`]: addr.postalOrZip,
    [`${prefix}[country]`]: addr.country || "US",
  };
  for (const [k, v] of Object.entries(fields)) {
    if (v) form.append(k, v);
  }
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  try {
    return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
  } catch {
    return false;
  }
}

/**
 * Verify a PostGrid webhook delivery. PostGrid sends either:
 *  - a JSON body with a `PostGrid-Signature: t=<unix>,v1=<hex>` header, where
 *    v1 is HMAC-SHA256(secret, `${t}.${rawBody}`) in hex; or
 *  - a JWT as the whole body (HS256, signed with the webhook secret), whose
 *    claims carry `type` and `data`.
 * Returns the event object when the delivery is genuine, otherwise null.
 */
export function verifyWebhookDelivery(rawBody: string, signatureHeader: string | null): Record<string, unknown> | null {
  const secret = process.env.POSTGRID_WEBHOOK_SECRET;
  if (!secret) return null;
  const body = rawBody.trim();

  // JWT body: three base64url parts.
  if (/^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(body)) {
    const [h, p, sig] = body.split(".");
    const expected = crypto.createHmac("sha256", secret).update(`${h}.${p}`).digest("base64url");
    if (!safeEqual(expected, sig)) return null;
    try {
      const header = JSON.parse(Buffer.from(h, "base64url").toString("utf8")) as { alg?: string };
      if (header.alg && header.alg !== "HS256") return null;
      return JSON.parse(Buffer.from(p, "base64url").toString("utf8")) as Record<string, unknown>;
    } catch {
      return null;
    }
  }

  // JSON body with a signed header.
  if (!signatureHeader) return null;
  const parts = Object.fromEntries(
    signatureHeader.split(",").map((kv) => {
      const i = kv.indexOf("=");
      return [kv.slice(0, i).trim(), kv.slice(i + 1).trim()];
    }),
  ) as Record<string, string>;
  const t = parts.t;
  const v1 = parts.v1;
  if (!t || !v1) return null;
  const computed = crypto.createHmac("sha256", secret).update(`${t}.${rawBody}`).digest("hex");
  if (!safeEqual(computed, v1.toLowerCase())) return null;
  try {
    return JSON.parse(rawBody) as Record<string, unknown>;
  } catch {
    return null;
  }
}

/** Kept for older callers: true when the delivery verifies. */
export function verifyWebhookSignature(rawBody: string, signature: string): boolean {
  return verifyWebhookDelivery(rawBody, signature || null) !== null;
}

export const postgrid = { isConfigured, createCertifiedLetter, verifyWebhookSignature, verifyWebhookDelivery };

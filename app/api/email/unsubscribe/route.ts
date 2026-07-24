// GET  /api/email/unsubscribe?token=...   — one-click unsubscribe page
// POST /api/email/unsubscribe?token=...   — RFC 8058 List-Unsubscribe=One-Click
//
// The token is HMAC-signed (lib/winback/unsubscribe), so only someone holding
// an email we actually sent can opt that address out. Idempotent: opting out
// twice is fine. Customer-facing: never show raw errors.

import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "../../../../lib/supabase/service-role";
import { verifyUnsubscribeToken } from "../../../../lib/winback/unsubscribe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function page(title: string, body: string): NextResponse {
  return new NextResponse(
    `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title} · CivilCase</title></head>
<body style="font-family: system-ui, -apple-system, sans-serif; background: #fafaf7; color: #0e0e0e; display: flex; min-height: 100vh; align-items: center; justify-content: center; margin: 0;">
<div style="max-width: 440px; padding: 40px; text-align: center;">
<p style="font-weight: 700; letter-spacing: 0.16em; font-size: 13px; color: #b8331f;">CIVILCASE</p>
<h1 style="font-size: 24px; margin: 12px 0;">${title}</h1>
<p style="line-height: 1.6; color: #444;">${body}</p>
</div></body></html>`,
    { headers: { "Content-Type": "text/html; charset=utf-8" } },
  );
}

async function optOut(token: string | null): Promise<NextResponse> {
  const email = token ? verifyUnsubscribeToken(token) : null;
  if (!email) {
    return page(
      "Link not recognized",
      "This unsubscribe link isn't valid. If you keep getting emails you don't want, reply to any of them and we'll remove you by hand.",
    );
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const db = createServiceRoleClient() as any;
    const { error } = await db
      .from("email_optouts")
      .upsert({ email, source: "winback_link" }, { onConflict: "email", ignoreDuplicates: true });
    if (error) throw new Error(error.message);
  } catch (e) {
    console.error("[unsubscribe] optout failed:", e);
    return page(
      "Something went wrong",
      "We couldn't process this just now. Please try the link again in a minute, or reply to the email and we'll remove you by hand.",
    );
  }
  return page(
    "You're unsubscribed",
    "We won't send you any more reminder emails about your case. If you come back and finish it, we'll still send the emails needed to deliver what you order (receipts, letter status).",
  );
}

export async function GET(req: NextRequest) {
  return optOut(req.nextUrl.searchParams.get("token"));
}

// Mail clients' one-click unsubscribe button POSTs to the same URL.
export async function POST(req: NextRequest) {
  return optOut(req.nextUrl.searchParams.get("token"));
}

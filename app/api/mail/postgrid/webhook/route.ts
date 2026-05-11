import { NextResponse, type NextRequest } from "next/server";
import { createServiceRoleClient } from "../../../../../lib/supabase/service-role";
import { verifyWebhookSignature } from "../../../../../lib/mail/postgrid";
import type { MailStatus } from "../../../../../lib/supabase/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// PostGrid → CivilCase delivery-status webhook.
//
// Configure in the PostGrid dashboard:
//   URL:    https://<your-domain>/api/mail/postgrid/webhook
//   Events: letter.created, letter.in_transit, letter.delivered,
//           letter.returned_to_sender, letter.cancelled
//
// Signature header: Postgrid-Webhook-Signature (HMAC-SHA256 hex of raw
// body using POSTGRID_WEBHOOK_SECRET).

interface PostGridWebhookEvent {
  type: string;
  data: {
    object: {
      id: string;
      status?: string;
      trackingNumber?: string | null;
      sendDate?: string | null;
      metadata?: Record<string, string>;
    };
  };
  createdAt: string;
}

// PostGrid letter status → our internal MailStatus.
function mapStatus(pgStatus: string | undefined, eventType: string): MailStatus {
  if (eventType === "letter.delivered" || pgStatus === "delivered") return "delivered";
  if (eventType === "letter.returned_to_sender" || pgStatus === "returned_to_sender")
    return "returned";
  if (eventType === "letter.cancelled" || pgStatus === "cancelled") return "failed";
  if (eventType === "letter.in_transit" || pgStatus === "in_transit") return "in_transit";
  return "queued";
}

// Cases roll forward to demand_delivered or demand_returned based on the
// letter status. We never roll BACKWARD: once a case is past demand_sent
// we leave the status alone except for terminal states.
const FORWARD_FROM = new Set([
  "demand_drafted",
  "demand_paid",
  "demand_sent",
  "demand_delivered",
]);

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("postgrid-webhook-signature") || "";

  if (!verifyWebhookSignature(rawBody, signature)) {
    return NextResponse.json({ error: "invalid_signature" }, { status: 401 });
  }

  let event: PostGridWebhookEvent;
  try {
    event = JSON.parse(rawBody) as PostGridWebhookEvent;
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const letterId = event.data?.object?.id;
  if (!letterId) {
    return NextResponse.json({ error: "missing_letter_id" }, { status: 400 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;

  const { data: letter } = await admin
    .from("demand_letters")
    .select("id, case_id, mail_status")
    .eq("mail_vendor_letter_id", letterId)
    .maybeSingle();

  if (!letter) {
    // PostGrid sometimes back-fires events from test letters or letters
    // we created from another environment. Don't 500; just acknowledge.
    return NextResponse.json({ ok: true, ignored: "letter_not_found" });
  }

  const nextStatus = mapStatus(event.data?.object?.status, event.type);
  const updates: Record<string, string | null> = { mail_status: nextStatus };
  if (event.data?.object?.trackingNumber) {
    updates.tracking_number = event.data.object.trackingNumber;
  }
  if (nextStatus === "delivered") {
    updates.delivered_at = new Date().toISOString();
  } else if (nextStatus === "returned") {
    updates.returned_at = new Date().toISOString();
  }

  await admin.from("demand_letters").update(updates).eq("id", letter.id);

  // Roll case status forward when delivered or returned.
  if (nextStatus === "delivered" || nextStatus === "returned") {
    const { data: caseRow } = await admin
      .from("cases")
      .select("status")
      .eq("id", letter.case_id)
      .single();
    if (caseRow && FORWARD_FROM.has(caseRow.status)) {
      const target = nextStatus === "delivered" ? "demand_delivered" : "demand_returned";
      await admin.from("cases").update({ status: target }).eq("id", letter.case_id);
    }
  }

  return NextResponse.json({ ok: true });
}

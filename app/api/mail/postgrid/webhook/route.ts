import { NextResponse, type NextRequest } from "next/server";
import { createServiceRoleClient } from "../../../../../lib/supabase/service-role";
import { verifyWebhookSignature } from "../../../../../lib/mail/postgrid";
import { createNotification } from "../../../../../lib/notifications";
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

// Progression rank so out-of-order webhooks can't move a letter backwards
// (e.g. a late letter.created after delivery must not reset "delivered" to
// "queued"). Terminal states share the top rank.
const STATUS_RANK: Record<string, number> = {
  queued: 0,
  in_transit: 1,
  delivered: 2,
  returned: 2,
  failed: 2,
};

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  // Try both header names PostGrid has used historically. Log every header
  // starting with "postgrid" so we can see exactly what came in when
  // signature verification fails.
  const signature =
    req.headers.get("postgrid-webhook-signature") ||
    req.headers.get("postgrid-signature") ||
    "";

  if (!verifyWebhookSignature(rawBody, signature)) {
    const postgridHeaders: Record<string, string> = {};
    req.headers.forEach((value, key) => {
      if (key.toLowerCase().startsWith("postgrid")) {
        postgridHeaders[key] = value;
      }
    });
    console.warn(
      "[postgrid webhook] invalid signature. postgrid-* headers:",
      JSON.stringify(postgridHeaders),
      "body preview:",
      rawBody.slice(0, 200),
    );
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
  const previousStatus = (letter.mail_status as string | null) ?? null;

  // Ignore out-of-order / backward events: never regress a letter's status
  // (which would also re-fire delivery notifications and overwrite delivered_at).
  const prevRank = previousStatus ? (STATUS_RANK[previousStatus] ?? 0) : -1;
  const nextRank = STATUS_RANK[nextStatus] ?? 0;
  if (nextRank < prevRank) {
    return NextResponse.json({ ok: true, ignored: "out_of_order" });
  }

  const updates: Record<string, string | null> = { mail_status: nextStatus };
  if (event.data?.object?.trackingNumber) {
    updates.tracking_number = event.data.object.trackingNumber;
  }
  // Only stamp the timestamp when actually entering the state (not on a
  // duplicate event), so delivered_at/returned_at reflect the first delivery.
  if (nextStatus === "delivered" && previousStatus !== "delivered") {
    updates.delivered_at = new Date().toISOString();
  } else if (nextStatus === "returned" && previousStatus !== "returned") {
    updates.returned_at = new Date().toISOString();
  }

  await admin.from("demand_letters").update(updates).eq("id", letter.id);

  // Customer-facing notifications when the status transitions to something
  // meaningful. We dedupe by previous status so a redelivery of the same
  // event doesn't fire duplicate notifications.
  if (nextStatus !== previousStatus) {
    const { data: caseRow } = await admin
      .from("cases")
      .select("id, owner_user_id, plaintiff_name, defendant_name")
      .eq("id", letter.case_id)
      .maybeSingle();
    if (caseRow?.owner_user_id) {
      const caseName = `${caseRow.plaintiff_name ?? "Plaintiff"} v. ${caseRow.defendant_name ?? "Defendant"}`;
      const link = `/case/${caseRow.id}`;
      if (nextStatus === "in_transit") {
        await createNotification({
          userId: caseRow.owner_user_id,
          caseId: caseRow.id,
          type: "letter_in_transit",
          title: "Your letter is on its way",
          body: `${caseName}: USPS picked up the letter. Delivery usually takes 3 to 7 business days.`,
          link,
        });
      } else if (nextStatus === "delivered") {
        await createNotification({
          userId: caseRow.owner_user_id,
          caseId: caseRow.id,
          type: "letter_delivered",
          title: "Your letter was delivered",
          body: `${caseName}: USPS confirmed delivery. The defendant's response window now starts.`,
          link,
        });
      } else if (nextStatus === "returned") {
        await createNotification({
          userId: caseRow.owner_user_id,
          caseId: caseRow.id,
          type: "letter_returned",
          title: "Letter returned to sender",
          body: `${caseName}: USPS returned the letter as undeliverable. The defendant's address may need verification.`,
          link,
        });
      }
    }
  }

  return NextResponse.json({ ok: true });
}

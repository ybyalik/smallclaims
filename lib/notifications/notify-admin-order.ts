// Alert the team the moment a customer completes an order (payment received),
// so a new sale never sits unnoticed. Sends to ADMIN_NOTIFICATIONS_EMAIL
// (comma-separated allowed), the same inbox as the research-failure alerts.
//
// Best-effort by design: this is called from the Stripe webhook, which must
// stay able to return 200. It NEVER throws — a notification failure must not
// turn a recorded payment into a webhook 500 (which would make Stripe retry
// and re-send everything).

import { sendEmail } from "../resend";
import { PRODUCTS } from "../stripe";
import { createServiceRoleClient } from "../supabase/service-role";

interface NotifyOrderInput {
  caseId: string;
  productKey?: string | null;
  amountCents?: number | null;
  currency?: string | null;
  // Comma-separated add-on product keys from the Stripe metadata, if any.
  addons?: string | null;
}

// Friendly product name from the catalog, falling back to the raw key so an
// unknown/legacy key still produces a readable-enough line rather than blank.
function productName(key?: string | null): string {
  if (!key) return "Order";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p = (PRODUCTS as Record<string, any>)[key];
  return p?.name ?? key;
}

function formatUsd(cents?: number | null, currency?: string | null): string {
  const c = typeof cents === "number" ? cents : 0;
  try {
    return (c / 100).toLocaleString("en-US", {
      style: "currency",
      currency: (currency || "USD").toUpperCase(),
    });
  } catch {
    return `$${(c / 100).toFixed(2)}`;
  }
}

export async function notifyAdminOfOrder(input: NotifyOrderInput): Promise<void> {
  try {
    const recipients = (process.env.ADMIN_NOTIFICATIONS_EMAIL ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (recipients.length === 0) {
      console.warn(
        "[notify-admin-order] ADMIN_NOTIFICATIONS_EMAIL not set; skipping email.",
        { caseId: input.caseId, productKey: input.productKey },
      );
      return;
    }

    const base = process.env.NEXT_PUBLIC_SITE_URL || "https://civilcase.com";

    // Best-effort customer lookup so the email says who bought and against whom.
    // A failure here must not stop the notification — send with what we have.
    let customerLine = "";
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const admin = createServiceRoleClient() as any;
      const { data: caseRow } = await admin
        .from("cases")
        .select("plaintiff_name, plaintiff_email, defendant_name, state")
        .eq("id", input.caseId)
        .maybeSingle();
      if (caseRow) {
        customerLine =
          `Customer: ${caseRow.plaintiff_name ?? "?"} <${caseRow.plaintiff_email ?? "?"}>\n` +
          `Against:  ${caseRow.defendant_name ?? "?"}` +
          `${caseRow.state ? ` (${caseRow.state})` : ""}\n`;
      }
    } catch (e) {
      console.warn("[notify-admin-order] case lookup failed", e);
    }

    const name = productName(input.productKey);
    const amount = formatUsd(input.amountCents, input.currency);
    const addonKeys = (input.addons ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const addonLine =
      addonKeys.length > 0
        ? `Add-ons:  ${addonKeys.map((k) => productName(k)).join(", ")}\n`
        : "";

    const subject = `[CivilCase] New order: ${name} — ${amount}`;
    const text = `You received a new order.

Product:  ${name}
Amount:   ${amount}
${addonLine}${customerLine}Case:     ${input.caseId}

Open in admin:
${base}/admin/cases/${input.caseId}
`;

    for (const to of recipients) {
      await sendEmail({ to, subject, text });
    }
  } catch (err) {
    console.warn("[notify-admin-order] failed to send order alert:", err);
  }
}

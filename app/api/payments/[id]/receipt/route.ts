// GET /api/payments/[id]/receipt
//
// Returns a downloadable PDF receipt for a paid payment row. The receipt
// is built from the payments table + the parent case caption, with line
// items resolved from the stored tier / addons (for demand-letter purchases)
// or just the single product (for prep / filing-guide).

import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "../../../../../lib/supabase/server";
import { createServiceRoleClient } from "../../../../../lib/supabase/service-role";
import { PRODUCTS } from "../../../../../lib/stripe";
import { renderReceiptPdf, type ReceiptLineItem } from "../../../../../lib/pdf/receipt";

export const runtime = "nodejs";

const PRODUCT_LABEL: Record<string, string> = {
  tier_send_letter: "Demand Letter (Send the Letter)",
  tier_full_pressure: "Demand Letter (Full Pressure)",
  court_prep: "Court Prep Pack",
  filing_guide: "Filing Guide",
  collection_plan: "Post-Judgment Collection Plan",
  demand_letter_download: "Demand Letter Download",
  addon_expedite: "Expedite 24 Hours",
  addon_overnight: "Overnight Shipping",
  addon_skip_trace: "Skip-Trace",
  addon_voice_of_justice: "Voice of Justice",
  addon_case_brief: "Case Brief (Attorney Memo)",
};

function labelFor(key: string): string {
  return PRODUCT_LABEL[key] || key;
}

function formatReceiptDate(iso: string | null): string {
  const d = iso ? new Date(iso) : new Date();
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function GET(_req: NextRequest, ctx: { params: { id: string } }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "auth_required" }, { status: 401 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;
  const { data: payment } = await admin
    .from("payments")
    .select(
      "id, case_id, user_id, amount_cents, product_key, paid_at, created_at, line_items, stripe_payment_intent_id",
    )
    .eq("id", ctx.params.id)
    .maybeSingle();

  if (!payment) {
    return NextResponse.json({ error: "Receipt not found" }, { status: 404 });
  }
  if (payment.user_id !== user.id) {
    return NextResponse.json({ error: "Not your receipt" }, { status: 403 });
  }
  if (!payment.paid_at) {
    return NextResponse.json(
      { error: "Payment not yet completed" },
      { status: 400 },
    );
  }

  // Case caption for the receipt
  const { data: caseRow } = await admin
    .from("cases")
    .select("id, plaintiff_name, defendant_name")
    .eq("id", payment.case_id)
    .maybeSingle();
  const plaintiff = caseRow?.plaintiff_name?.trim() || "You";
  const defendant = caseRow?.defendant_name?.trim() || "the defendant";
  const caption = `${plaintiff} vs. ${defendant}`;

  // Customer info
  const { data: profile } = await admin
    .from("profiles")
    .select("full_name")
    .eq("user_id", user.id)
    .maybeSingle();

  // Build line items. Tier purchases stored tier + addons in line_items;
  // resolve each key to a friendly label + price from the PRODUCTS catalog.
  const lineItems: ReceiptLineItem[] = [];
  const li = (payment.line_items ?? {}) as Record<string, unknown>;
  const tierKey = typeof li.tier === "string" ? li.tier : null;
  const addonKeys = Array.isArray(li.addons) ? (li.addons as string[]) : [];

  if (tierKey && PRODUCTS[tierKey as keyof typeof PRODUCTS]) {
    const tp = PRODUCTS[tierKey as keyof typeof PRODUCTS];
    lineItems.push({ name: labelFor(tierKey), amountCents: tp.amount_cents });
    for (const ak of addonKeys) {
      const ap = PRODUCTS[ak as keyof typeof PRODUCTS];
      if (ap) lineItems.push({ name: labelFor(ak), amountCents: ap.amount_cents });
    }
  } else if (payment.product_key && PRODUCTS[payment.product_key as keyof typeof PRODUCTS]) {
    const p = PRODUCTS[payment.product_key as keyof typeof PRODUCTS];
    lineItems.push({ name: labelFor(payment.product_key), amountCents: p.amount_cents });
  } else {
    // Fallback: one line at the full amount paid.
    lineItems.push({
      name: labelFor(payment.product_key) || "CivilCase service",
      amountCents: payment.amount_cents,
    });
  }

  // Short, user-friendly receipt number (last 8 chars of payment uuid).
  const receiptNumber = `CC-${payment.id.replace(/-/g, "").slice(-8).toUpperCase()}`;

  const pdfBytes = await renderReceiptPdf({
    receiptNumber,
    date: formatReceiptDate(payment.paid_at),
    customerName: profile?.full_name ?? null,
    customerEmail: user.email ?? "",
    caseCaption: caption,
    caseId: payment.case_id,
    lineItems,
    totalCents: payment.amount_cents,
    paymentIntentId: payment.stripe_payment_intent_id ?? "n/a",
  });

  // pdf-lib returns a Uint8Array; cast it to BodyInit-compatible.
  const filename = `civilcase-receipt-${receiptNumber}.pdf`;
  return new NextResponse(pdfBytes as unknown as BodyInit, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "private, max-age=0, no-cache",
    },
  });
}

// POST /api/checkout/session
//
// Creates a Stripe Checkout Session for a paid product (currently only
// demand_letter_download at $39). Returns { url } so the client redirects
// to Stripe's hosted checkout. Stripe webhook handles success.
//
// Admin users (profiles.is_admin = true) bypass payment entirely — they get
// a stub success URL that flips the case status without going through Stripe.

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../lib/supabase/server";
import { createServiceRoleClient } from "../../../../lib/supabase/service-role";
import { getStripe, PRODUCTS, type ProductKey } from "../../../../lib/stripe";
import { logEvent } from "../../../../lib/audit/log";
import { markCasePaid } from "../../../../lib/demand-letter/mark-paid";

export async function POST(req: NextRequest) {
  let body: { caseId?: string; product_key?: ProductKey };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!body.caseId || !body.product_key) {
    return NextResponse.json({ error: "Missing caseId or product_key" }, { status: 400 });
  }
  const product = PRODUCTS[body.product_key];
  if (!product) {
    return NextResponse.json({ error: "Unknown product" }, { status: 400 });
  }

  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "auth_required" }, { status: 401 });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;

  // Confirm the case belongs to this user
  const { data: caseRow } = await admin
    .from("cases")
    .select("id, owner_user_id, defendant_name")
    .eq("id", body.caseId)
    .single();
  if (!caseRow || caseRow.owner_user_id !== user.id) {
    return NextResponse.json({ error: "case_not_found" }, { status: 404 });
  }

  const ctx = {
    case_id: caseRow.id,
    actor_user_id: user.id,
    ip: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null,
    user_agent: req.headers.get("user-agent"),
    request_id: req.headers.get("x-vercel-id") || null,
  };

  // Admin bypass: skip Stripe, mark payment as succeeded directly.
  const { data: profile } = await admin
    .from("profiles")
    .select("is_admin")
    .eq("user_id", user.id)
    .single();
  if (profile?.is_admin) {
    const { error: payErr } = await admin.from("payments").insert({
      case_id: caseRow.id,
      user_id: user.id,
      amount_cents: 0,
      currency: "USD",
      status: "succeeded",
      product_key: body.product_key,
      line_items: { admin_bypass: true, original_amount_cents: product.amount_cents },
      paid_at: new Date().toISOString(),
    });
    if (payErr) {
      return NextResponse.json({ error: "Could not record admin bypass" }, { status: 500 });
    }
    await markCasePaid(caseRow.id, { source: "admin_bypass" });
    await logEvent("payment.admin_bypass", ctx, {
      entity_type: "payment",
      payload: { product_key: body.product_key },
    });
    // Return URL the client redirects to, just like Stripe would
    return NextResponse.json({
      url: `/dashboard/demand-letters/${caseRow.id}/letter?paid=admin`,
    });
  }

  // Regular Stripe flow
  const origin = new URL(req.url).origin;
  const stripe = getStripe();

  // Reuse customer if profile already has one
  let stripeCustomerId: string | null = null;
  const { data: profileFull } = await admin
    .from("profiles")
    .select("stripe_customer_id, full_name")
    .eq("user_id", user.id)
    .single();
  stripeCustomerId = profileFull?.stripe_customer_id || null;
  if (!stripeCustomerId) {
    const customer = await stripe.customers.create({
      email: user.email || undefined,
      name: profileFull?.full_name || user.user_metadata?.full_name || undefined,
      metadata: { supabase_user_id: user.id },
    });
    stripeCustomerId = customer.id;
    await admin.from("profiles").update({ stripe_customer_id: stripeCustomerId }).eq("user_id", user.id);
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer: stripeCustomerId,
    line_items: [
      {
        price_data: {
          currency: product.currency,
          product_data: {
            name: product.name,
            description: product.description,
          },
          unit_amount: product.amount_cents,
        },
        quantity: 1,
      },
    ],
    success_url: `${origin}/dashboard/demand-letters/${caseRow.id}/letter?paid=1`,
    cancel_url: `${origin}/dashboard/demand-letters/${caseRow.id}/letter?canceled=1`,
    metadata: {
      case_id: caseRow.id,
      user_id: user.id,
      product_key: body.product_key,
    },
    payment_intent_data: {
      metadata: {
        case_id: caseRow.id,
        user_id: user.id,
        product_key: body.product_key,
      },
    },
  });

  // Insert pending payment row so we can reconcile if webhook is delayed
  await admin.from("payments").insert({
    case_id: caseRow.id,
    user_id: user.id,
    stripe_checkout_session_id: session.id,
    stripe_customer_id: stripeCustomerId,
    amount_cents: product.amount_cents,
    currency: product.currency.toUpperCase(),
    status: "pending",
    product_key: body.product_key,
    line_items: { name: product.name, amount_cents: product.amount_cents },
  });

  await logEvent("checkout.session_created", ctx, {
    entity_type: "payment",
    payload: { stripe_session_id: session.id, product_key: body.product_key },
  });

  return NextResponse.json({ url: session.url });
}

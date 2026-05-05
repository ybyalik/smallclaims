import { NextResponse, type NextRequest } from "next/server";
import { loadOwnedCase } from "../../../../../lib/demand-letter/access";
import { createClient } from "../../../../../lib/supabase/server";
import { createServiceRoleClient } from "../../../../../lib/supabase/service-role";
import { getStripe, PRODUCTS, type ProductKey } from "../../../../../lib/stripe";

/**
 * POST /api/demand-letters/[id]/payment-intent
 *
 * Creates a Stripe PaymentIntent in AUTHORIZATION-ONLY mode (capture_method
 * = "manual"). Returns the client_secret for inline Stripe Elements
 * confirmation. The card is held but not captured until paralegal review
 * approves the case.
 *
 * Body: { tier: ProductKey, addons: ProductKey[] }
 * Returns: { clientSecret, totalCents, items, paymentIntentId }
 */
export async function POST(req: NextRequest, ctx: { params: { id: string } }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "auth_required" }, { status: 401 });
  }

  const caseRow = await loadOwnedCase(ctx.params.id);
  if (!caseRow) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  let body: { tier?: ProductKey; addons?: ProductKey[] };
  try {
    body = (await req.json()) as { tier?: ProductKey; addons?: ProductKey[] };
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!body.tier || !PRODUCTS[body.tier]) {
    return NextResponse.json({ error: "Invalid tier" }, { status: 400 });
  }
  const tierProduct = PRODUCTS[body.tier];

  const addonKeys = (body.addons ?? []).filter((k) => PRODUCTS[k]);
  const addons = addonKeys.map((k) => ({ key: k, ...PRODUCTS[k] }));

  const totalCents =
    tierProduct.amount_cents + addons.reduce((s, a) => s + a.amount_cents, 0);

  // Reuse Stripe customer
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;
  const { data: profile } = await admin
    .from("profiles")
    .select("stripe_customer_id, full_name")
    .eq("user_id", user.id)
    .single();
  const stripe = getStripe();

  let stripeCustomerId: string | null = profile?.stripe_customer_id || null;
  if (!stripeCustomerId) {
    const customer = await stripe.customers.create({
      email: user.email || undefined,
      name: profile?.full_name || undefined,
      metadata: { supabase_user_id: user.id },
    });
    stripeCustomerId = customer.id;
    await admin
      .from("profiles")
      .update({ stripe_customer_id: stripeCustomerId })
      .eq("user_id", user.id);
  }

  const intent = await stripe.paymentIntents.create({
    amount: totalCents,
    currency: "usd",
    customer: stripeCustomerId,
    capture_method: "manual",
    automatic_payment_methods: { enabled: true, allow_redirects: "never" },
    description: `${tierProduct.name} for case ${caseRow.id}`,
    metadata: {
      case_id: caseRow.id,
      user_id: user.id,
      tier: body.tier,
      addons: addonKeys.join(","),
    },
  });

  // Pending payment row for reconciliation
  await admin.from("payments").insert({
    case_id: caseRow.id,
    user_id: user.id,
    stripe_payment_intent_id: intent.id,
    stripe_customer_id: stripeCustomerId,
    amount_cents: totalCents,
    currency: "USD",
    status: "pending",
    product_key: body.tier,
    line_items: { tier: body.tier, addons: addonKeys, capture_method: "manual" },
  });

  return NextResponse.json({
    clientSecret: intent.client_secret,
    paymentIntentId: intent.id,
    totalCents,
    items: [
      { name: tierProduct.name, amountCents: tierProduct.amount_cents },
      ...addons.map((a) => ({ name: a.name, amountCents: a.amount_cents })),
    ],
  });
}

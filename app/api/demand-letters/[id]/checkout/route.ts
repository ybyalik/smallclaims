import { NextResponse, type NextRequest } from "next/server";
import { loadOwnedCase } from "../../../../../lib/demand-letter/access";
import { createClient } from "../../../../../lib/supabase/server";
import { createServiceRoleClient } from "../../../../../lib/supabase/service-role";
import { getStripe, PRODUCTS, type ProductKey } from "../../../../../lib/stripe";

/**
 * POST /api/demand-letters/[id]/checkout
 *
 * Creates a Stripe Checkout Session in AUTHORIZATION-ONLY mode (capture_method
 * = "manual"). The card is authorized when the user submits but not captured
 * until paralegal review approves the case. This is what the spec calls
 * "Authorization-only — not a charge."
 *
 * Body: { tier: ProductKey, addons: ProductKey[] }
 * Returns: { url } for client redirect.
 *
 * Auth: requires an authenticated user. The wizard's sign-up wall converts
 * anonymous flows to authenticated ones before this endpoint is called.
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

  // Build line items for Stripe
  const lineItems = [
    {
      price_data: {
        currency: tierProduct.currency,
        product_data: {
          name: tierProduct.name,
          description: tierProduct.description,
        },
        unit_amount: tierProduct.amount_cents,
      },
      quantity: 1,
    },
    ...addons.map((a) => ({
      price_data: {
        currency: a.currency,
        product_data: { name: a.name, description: a.description },
        unit_amount: a.amount_cents,
      },
      quantity: 1,
    })),
  ];

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

  const origin = new URL(req.url).origin;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer: stripeCustomerId,
    line_items: lineItems,
    success_url: `${origin}/dashboard/demand-letters/${caseRow.id}?submitted=1`,
    cancel_url: `${origin}/demand-letter/wizard/${caseRow.id}/review?canceled=1`,
    metadata: {
      case_id: caseRow.id,
      user_id: user.id,
      tier: body.tier,
      addons: addonKeys.join(","),
    },
    // Authorization-only: hold the card without capturing until paralegal review
    payment_intent_data: {
      capture_method: "manual",
      metadata: {
        case_id: caseRow.id,
        user_id: user.id,
        tier: body.tier,
        addons: addonKeys.join(","),
      },
    },
  });

  // Pending payment row for reconciliation
  await admin.from("payments").insert({
    case_id: caseRow.id,
    user_id: user.id,
    stripe_checkout_session_id: session.id,
    stripe_customer_id: stripeCustomerId,
    amount_cents: totalCents,
    currency: "USD",
    status: "pending",
    product_key: body.tier,
    line_items: {
      tier: body.tier,
      addons: addonKeys,
      capture_method: "manual",
    },
  });

  return NextResponse.json({ url: session.url });
}

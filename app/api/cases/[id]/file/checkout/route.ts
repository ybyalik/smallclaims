import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "../../../../../../lib/supabase/server";
import { createServiceRoleClient } from "../../../../../../lib/supabase/service-role";
import { getStripe, PRODUCTS } from "../../../../../../lib/stripe";

export const runtime = "nodejs";

// POST /api/cases/[id]/file/checkout
//
// Creates a Stripe Checkout Session for the Filing Guide ($79). On success,
// the user is redirected back to /case/[id]/file where the guide unlocks
// once the Stripe webhook flips the payment to succeeded.

export async function POST(req: NextRequest, ctx: { params: { id: string } }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "auth_required" }, { status: 401 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;
  const { data: caseRow } = await admin
    .from("cases")
    .select("id, owner_user_id, state, defendant_name")
    .eq("id", ctx.params.id)
    .maybeSingle();
  if (!caseRow || caseRow.owner_user_id !== user.id) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  const product = PRODUCTS.filing_guide;

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
    line_items: [
      {
        price_data: {
          currency: product.currency,
          product_data: { name: product.name, description: product.description },
          unit_amount: product.amount_cents,
        },
        quantity: 1,
      },
    ],
    success_url: `${origin}/case/${caseRow.id}/file?paid=1`,
    cancel_url: `${origin}/case/${caseRow.id}/file?canceled=1`,
    metadata: {
      case_id: caseRow.id,
      user_id: user.id,
      product_key: "filing_guide",
    },
    payment_intent_data: {
      metadata: {
        case_id: caseRow.id,
        user_id: user.id,
        product_key: "filing_guide",
      },
    },
  });

  await admin.from("payments").insert({
    case_id: caseRow.id,
    user_id: user.id,
    stripe_checkout_session_id: session.id,
    stripe_customer_id: stripeCustomerId,
    amount_cents: product.amount_cents,
    currency: "USD",
    status: "pending",
    product_key: "filing_guide",
    line_items: { product_key: "filing_guide" },
  });

  return NextResponse.json({ url: session.url });
}

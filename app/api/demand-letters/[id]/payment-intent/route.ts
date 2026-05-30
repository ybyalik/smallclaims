import { NextResponse, type NextRequest } from "next/server";
import { loadOwnedCase } from "../../../../../lib/demand-letter/access";
import { createClient } from "../../../../../lib/supabase/server";
import { createServiceRoleClient } from "../../../../../lib/supabase/service-role";
import {
  PRODUCTS,
  findOrCreatePaymentIntent,
  resolveStripeCustomerId,
  type ProductKey,
} from "../../../../../lib/stripe";

/**
 * POST /api/demand-letters/[id]/payment-intent
 *
 * Inline Stripe Elements PaymentIntent for the demand letter (tier + addons).
 * Immediate capture: the card is charged on confirmation, and the paralegal
 * team reviews after payment for letter dispatch.
 *
 * Reuses an existing pending PaymentIntent if one already exists for this
 * case+user+product (just updates the amount). One PI per checkout session,
 * no canceled dashboard noise.
 *
 * Body: { tier: ProductKey, addons: ProductKey[] }
 * Returns: { clientSecret, paymentIntentId, totalCents }
 */
export async function POST(req: NextRequest, ctx: { params: { id: string } }) {
  try {
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const admin = createServiceRoleClient() as any;
    const { data: profile } = await admin
      .from("profiles")
      .select("stripe_customer_id, full_name")
      .eq("user_id", user.id)
      .single();

    const stripeCustomerId = await resolveStripeCustomerId({
      userId: user.id,
      userEmail: user.email,
      storedCustomerId: profile?.stripe_customer_id,
      fullName: profile?.full_name,
      admin,
    });

    const { intent } = await findOrCreatePaymentIntent({
      caseId: caseRow.id,
      userId: user.id,
      productKey: body.tier,
      amountCents: totalCents,
      captureMethod: "automatic",
      description: `${tierProduct.name} for case ${caseRow.id}`,
      metadata: {
        case_id: caseRow.id,
        user_id: user.id,
        tier: body.tier,
        addons: addonKeys.join(","),
      },
      customerId: stripeCustomerId,
      lineItems: {
        tier: body.tier,
        addons: addonKeys,
        capture_method: "automatic",
      },
      admin,
    });

    return NextResponse.json({
      clientSecret: intent.client_secret,
      paymentIntentId: intent.id,
      totalCents,
    });
  } catch (err) {
    console.error("[payment-intent] route failed", err);
    return NextResponse.json({ error: "We couldn't start checkout. Please try again in a moment." }, { status: 500 });
  }
}

import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "../../../../../../lib/supabase/server";
import { createServiceRoleClient } from "../../../../../../lib/supabase/service-role";
import {
  PRODUCTS,
  findOrCreatePaymentIntent,
  resolveStripeCustomerId,
} from "../../../../../../lib/stripe";

export const runtime = "nodejs";

// POST /api/cases/[id]/file/payment-intent
//
// Inline Stripe Elements PaymentIntent for the Filing Guide ($79). Immediate
// capture. Reuses existing pending intents for the same case+user+product
// instead of recreating on revisit.

export async function POST(req: NextRequest, ctx: { params: { id: string } }) {
  try {
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
      .select("id, owner_user_id")
      .eq("id", ctx.params.id)
      .maybeSingle();
    if (!caseRow || caseRow.owner_user_id !== user.id) {
      return NextResponse.json({ error: "not_found" }, { status: 404 });
    }

    const product = PRODUCTS.filing_guide;
    const totalCents = product.amount_cents;

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
      productKey: "filing_guide",
      amountCents: totalCents,
      captureMethod: "automatic",
      description: `${product.name} for case ${caseRow.id}`,
      metadata: {
        case_id: caseRow.id,
        user_id: user.id,
        product_key: "filing_guide",
      },
      customerId: stripeCustomerId,
      lineItems: { product_key: "filing_guide", capture_method: "automatic" },
      admin,
    });

    return NextResponse.json({
      clientSecret: intent.client_secret,
      paymentIntentId: intent.id,
      totalCents,
    });
  } catch (err) {
    console.error("[file/payment-intent] route failed", err);
    return NextResponse.json({ error: "We couldn't start checkout. Please try again in a moment." }, { status: 500 });
  }
}

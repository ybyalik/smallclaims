import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "../../../../../../lib/supabase/server";
import { createServiceRoleClient } from "../../../../../../lib/supabase/service-role";
import {
  PRODUCTS,
  findOrCreatePaymentIntent,
  resolveStripeCustomerId,
} from "../../../../../../lib/stripe";

export const runtime = "nodejs";

// POST /api/cases/[id]/collection-plan/payment-intent
//
// Inline Stripe Elements PaymentIntent for the Post-Judgment Collection Plan
// ($49). Immediate capture. Reads the user's intake from
// cases.intake_answers.collection_knows_* (saved by the checkout questions)
// and stashes a normalized collection_plan_intake on the case so the
// generation pipeline can consume it without another round trip.

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
      .select("id, owner_user_id, intake_answers, amount_cents")
      .eq("id", ctx.params.id)
      .maybeSingle();
    if (!caseRow || caseRow.owner_user_id !== user.id) {
      return NextResponse.json({ error: "not_found" }, { status: 404 });
    }

    const intakeAnswers = (caseRow.intake_answers ?? {}) as Record<string, unknown>;
    const knowsEmployer = intakeAnswers.collection_knows_employer === "yes";
    const knowsRealProperty = intakeAnswers.collection_knows_real_property === "yes";
    const knowsBank = intakeAnswers.collection_knows_bank === "yes";
    const userNotes =
      typeof intakeAnswers.collection_plan_notes === "string"
        ? (intakeAnswers.collection_plan_notes as string).trim().slice(0, 600) || null
        : null;

    // Use case.amount_cents as the judgment amount placeholder. Users can
    // later edit this on the report itself if the actual judgment differs.
    const judgmentCents = caseRow.amount_cents;
    if (!judgmentCents || judgmentCents <= 0) {
      return NextResponse.json(
        { error: "invalid_judgment_amount" },
        { status: 400 },
      );
    }

    const collectionIntake = {
      judgment_amount_cents: judgmentCents,
      knows_employer: knowsEmployer,
      knows_real_property: knowsRealProperty,
      knows_bank: knowsBank,
      notes: userNotes,
    };

    await admin
      .from("cases")
      .update({
        intake_answers: {
          ...intakeAnswers,
          collection_plan_intake: collectionIntake,
        },
        updated_at: new Date().toISOString(),
      })
      .eq("id", caseRow.id);

    const product = PRODUCTS.collection_plan;
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
      productKey: "collection_plan",
      amountCents: totalCents,
      captureMethod: "automatic",
      description: `${product.name} for case ${caseRow.id}`,
      metadata: {
        case_id: caseRow.id,
        user_id: user.id,
        product_key: "collection_plan",
      },
      customerId: stripeCustomerId,
      lineItems: { product_key: "collection_plan", capture_method: "automatic" },
      admin,
    });

    return NextResponse.json({
      clientSecret: intent.client_secret,
      paymentIntentId: intent.id,
      totalCents,
    });
  } catch (err) {
    console.error("[collection-plan/payment-intent] route failed", err);
    return NextResponse.json({ error: "We couldn't start checkout. Please try again in a moment." }, { status: 500 });
  }
}

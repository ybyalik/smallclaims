// POST /api/webhooks/stripe
// Handles Stripe webhook events. Signature is verified using
// STRIPE_WEBHOOK_SECRET from the Stripe dashboard.

import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "../../../../lib/stripe";
import { createServiceRoleClient } from "../../../../lib/supabase/service-role";
import { logEvent } from "../../../../lib/audit/log";
import { sendEmail } from "../../../../lib/resend";
import { markCasePaid } from "../../../../lib/demand-letter/mark-paid";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!sig || !secret) {
    return NextResponse.json({ error: "missing signature or secret" }, { status: 400 });
  }
  const stripe = getStripe();
  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, secret);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "invalid signature";
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const caseId = session.metadata?.case_id;
      const userId = session.metadata?.user_id;
      const productKey = session.metadata?.product_key;
      if (!caseId || !userId) break;

      // Update the pending payment row to succeeded
      await admin
        .from("payments")
        .update({
          status: "succeeded",
          paid_at: new Date().toISOString(),
          stripe_payment_intent_id:
            typeof session.payment_intent === "string" ? session.payment_intent : null,
        })
        .eq("stripe_checkout_session_id", session.id);

      // Advance case status + enqueue research pipeline
      await markCasePaid(caseId, { source: "stripe_webhook" });

      // Audit
      await logEvent("payment.succeeded", { case_id: caseId, actor_user_id: userId }, {
        entity_type: "payment",
        payload: {
          stripe_session_id: session.id,
          product_key: productKey,
          amount_total: session.amount_total,
          currency: session.currency,
        },
      });

      // Confirmation email
      const { data: caseRow } = await admin
        .from("cases")
        .select("plaintiff_email, plaintiff_name, defendant_name, amount_cents")
        .eq("id", caseId)
        .single();
      if (caseRow?.plaintiff_email) {
        const dollars = ((caseRow.amount_cents ?? 0) / 100).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        });
        await sendEmail({
          to: caseRow.plaintiff_email,
          subject: "Your CivilCase demand letter is ready",
          text: `Hi ${caseRow.plaintiff_name?.split(" ")[0] || "there"},

Thanks for your purchase. Your demand letter against ${caseRow.defendant_name} (${dollars}) is ready to download from your dashboard.

Open your case: ${process.env.NEXT_PUBLIC_SITE_URL || "https://civilcase.com"}/dashboard/demand-letters/${caseId}/letter

You can edit the letter, download the PDF, and send it yourself by mail or email.

If you have questions, reply to this email.

— CivilCase`,
        });
      }
      break;
    }

    case "checkout.session.expired":
    case "checkout.session.async_payment_failed": {
      const session = event.data.object as Stripe.Checkout.Session;
      await admin
        .from("payments")
        .update({ status: "failed" })
        .eq("stripe_checkout_session_id", session.id);
      break;
    }

    case "payment_intent.amount_capturable_updated":
    case "payment_intent.succeeded": {
      // Inline Stripe Elements path: PaymentIntent with manual capture.
      // amount_capturable_updated fires when the card is authorized (auth held);
      // succeeded fires after we capture (paralegal review). markCasePaid is
      // idempotent so receiving both is safe.
      const intent = event.data.object as Stripe.PaymentIntent;
      const caseId = intent.metadata?.case_id;
      if (!caseId) break;

      await admin
        .from("payments")
        .update({
          status: event.type === "payment_intent.succeeded" ? "succeeded" : "pending",
          paid_at: event.type === "payment_intent.succeeded" ? new Date().toISOString() : null,
        })
        .eq("stripe_payment_intent_id", intent.id);

      await markCasePaid(caseId, { source: "stripe_webhook" });

      await logEvent(
        event.type === "payment_intent.succeeded"
          ? "payment.captured"
          : "payment.authorized",
        { case_id: caseId, actor_user_id: intent.metadata?.user_id ?? null },
        {
          entity_type: "payment",
          payload: {
            stripe_payment_intent_id: intent.id,
            amount: intent.amount,
            currency: intent.currency,
          },
        },
      );
      break;
    }

    case "charge.refunded": {
      const charge = event.data.object as Stripe.Charge;
      if (typeof charge.payment_intent === "string") {
        await admin
          .from("payments")
          .update({ status: "refunded", refunded_at: new Date().toISOString() })
          .eq("stripe_payment_intent_id", charge.payment_intent);
      }
      break;
    }

    default:
      // Ignore unsubscribed events
      break;
  }

  return NextResponse.json({ received: true });
}

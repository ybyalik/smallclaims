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
import { ensureCollectionPlanForCase } from "../../../../lib/collection-plan/generate";
import { ensureFilingReportForCase } from "../../../../lib/case-research/ensure-filing-report";

export const runtime = "nodejs";

// A failed database write inside a webhook must NOT be swallowed. If we return
// HTTP 200 to Stripe after a failed save, Stripe considers the event handled
// and never retries it, so the payment is silently lost. Throwing here bubbles
// up to the handler's catch, which returns 500 so Stripe re-delivers the event.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function assertDbWrite(error: any, context: string) {
  if (error) {
    throw new Error(`[stripe webhook] ${context} failed: ${error.message ?? error}`);
  }
}

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

  try {
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const caseId = session.metadata?.case_id;
      const userId = session.metadata?.user_id;
      const productKey = session.metadata?.product_key;
      if (!caseId || !userId) break;

      // Update the pending payment row to succeeded. We .select() the affected
      // rows so we can tell the difference between "saved" and "matched nothing"
      // (which happens if the checkout-time insert failed): the latter would
      // otherwise record the payment nowhere.
      const paymentIntentId =
        typeof session.payment_intent === "string" ? session.payment_intent : null;
      const { data: updatedRows, error: updateErr } = await admin
        .from("payments")
        .update({
          status: "succeeded",
          paid_at: new Date().toISOString(),
          stripe_payment_intent_id: paymentIntentId,
        })
        .eq("stripe_checkout_session_id", session.id)
        .select("id");
      assertDbWrite(updateErr, "checkout.session.completed payment update");

      if (!updatedRows || updatedRows.length === 0) {
        // No pending row existed (checkout-time insert must have failed).
        // Record the payment now from the session metadata so the customer's
        // purchase is not lost. Fail loud if this insert also errors.
        console.error(
          "[stripe webhook] checkout.session.completed matched no payment row; inserting fallback",
          { session_id: session.id, case_id: caseId, product_key: productKey },
        );
        const { error: insertErr } = await admin.from("payments").insert({
          case_id: caseId,
          user_id: userId,
          stripe_checkout_session_id: session.id,
          stripe_payment_intent_id: paymentIntentId,
          amount_cents: session.amount_total ?? 0,
          currency: (session.currency ?? "usd").toUpperCase(),
          status: "succeeded",
          paid_at: new Date().toISOString(),
          product_key: productKey ?? null,
        });
        assertDbWrite(insertErr, "checkout.session.completed fallback insert");
      }

      // Audit (every product)
      await logEvent("payment.succeeded", { case_id: caseId, actor_user_id: userId }, {
        entity_type: "payment",
        payload: {
          stripe_session_id: session.id,
          product_key: productKey,
          amount_total: session.amount_total,
          currency: session.currency,
        },
      });

      // Branch by product. Demand-letter products advance case status and
      // fire the certified-mail event. Filing Guide and Collection Plan are
      // pure access unlocks (no status change, no mail dispatch).
      if (productKey === "collection_plan") {
        const { data: caseRow } = await admin
          .from("cases")
          .select("plaintiff_email, plaintiff_name")
          .eq("id", caseId)
          .single();
        ensureCollectionPlanForCase(caseId).catch((err) => {
          console.error("[webhook] ensureCollectionPlanForCase failed", err);
        });
        if (caseRow?.plaintiff_email) {
          await sendEmail({
            to: caseRow.plaintiff_email,
            subject: "We're building your Post-Judgment Collection Plan",
            text: `Hi ${caseRow.plaintiff_name?.split(" ")[0] || "there"},

Thanks for your purchase. We're pulling your county's specific forms and fees, and we'll build your personalized collection plan over the next few minutes. We'll email you again when it's ready, and you can also watch progress on your case page.

Open your case: ${process.env.NEXT_PUBLIC_SITE_URL || "https://civilcase.com"}/case/${caseId}

— CivilCase`,
          });
        }
      } else if (productKey === "filing_guide") {
        const { data: caseRow } = await admin
          .from("cases")
          .select("plaintiff_email, plaintiff_name, state")
          .eq("id", caseId)
          .single();
        if (caseRow?.plaintiff_email) {
          await sendEmail({
            to: caseRow.plaintiff_email,
            subject: "We're preparing your CivilCase Filing Kit",
            text: `Hi ${caseRow.plaintiff_name?.split(" ")[0] || "there"},

Thanks for your purchase. We're now building your Filing Kit for ${caseRow.state ?? "your state"}, the court where you file, the forms you need, fees, service of process, and what to bring on hearing day, researched for your specific case.

This takes a few minutes. We'll email you as soon as it's ready, and you can check progress here anytime:

${process.env.NEXT_PUBLIC_SITE_URL || "https://civilcase.com"}/case/${caseId}/file

If you have questions, reply to this email.

— CivilCase`,
          });
        }
      } else {
        // Demand-letter products: advance status + enqueue mail dispatch.
        await markCasePaid(caseId, { source: "stripe_webhook" });

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
            subject: "Your CivilCase demand letter is on its way",
            text: `Hi ${caseRow.plaintiff_name?.split(" ")[0] || "there"},

Thanks for your purchase. Your demand letter against ${caseRow.defendant_name} (${dollars}) is being mailed via certified mail with return receipt to the address you provided. Tracking and delivery status will appear in your dashboard within a few business days.

Open your case: ${process.env.NEXT_PUBLIC_SITE_URL || "https://civilcase.com"}/case/${caseId}

You can also download a copy of the letter as a PDF for your records from the case page.

If you have questions, reply to this email.

— CivilCase`,
          });
        }
      }
      break;
    }

    case "checkout.session.expired":
    case "checkout.session.async_payment_failed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const { error: failErr } = await admin
        .from("payments")
        .update({ status: "failed" })
        .eq("stripe_checkout_session_id", session.id);
      assertDbWrite(failErr, "checkout.session failed update");
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
      const productKey = intent.metadata?.product_key;
      if (!caseId) break;

      // paid_at is stamped on BOTH events so the access helper can use a
      // single "is this row claimed?" check. status stays as "pending" until
      // capture (after paralegal review), then flips to "succeeded".
      const { data: piUpdatedRows, error: piUpdateErr } = await admin
        .from("payments")
        .update({
          status: event.type === "payment_intent.succeeded" ? "succeeded" : "pending",
          paid_at: new Date().toISOString(),
        })
        .eq("stripe_payment_intent_id", intent.id)
        .select("id");
      assertDbWrite(piUpdateErr, "payment_intent payment update");

      if (!piUpdatedRows || piUpdatedRows.length === 0) {
        // No pending row for this intent (the create-time insert must have
        // failed). Record it now from the intent metadata so the purchase is
        // not lost.
        console.error(
          "[stripe webhook] payment_intent matched no payment row; inserting fallback",
          { intent_id: intent.id, case_id: caseId, product_key: productKey },
        );
        const { error: piInsertErr } = await admin.from("payments").insert({
          case_id: caseId,
          user_id: intent.metadata?.user_id ?? null,
          stripe_payment_intent_id: intent.id,
          amount_cents: intent.amount ?? 0,
          currency: (intent.currency ?? "usd").toUpperCase(),
          status: event.type === "payment_intent.succeeded" ? "succeeded" : "pending",
          paid_at: new Date().toISOString(),
          product_key: productKey ?? null,
        });
        assertDbWrite(piInsertErr, "payment_intent fallback insert");
      }

      // Filing Guide and Collection Plan are pure-access unlocks (no mail
      // dispatch). Everything else (demand-letter products) gets the
      // standard advance-and-mail treatment.
      const standaloneUnlocks = new Set(["filing_guide", "collection_plan"]);
      if (!productKey || !standaloneUnlocks.has(productKey)) {
        await markCasePaid(caseId, { source: "stripe_webhook" });
      }

      // Collection Plan: trigger the background generation pipeline on first
      // capture. The orchestrator is idempotent so a retried webhook won't
      // double-fire. Only on succeeded (not the authorize-only event).
      if (
        productKey === "collection_plan" &&
        event.type === "payment_intent.succeeded"
      ) {
        ensureCollectionPlanForCase(caseId).catch((err) => {
          console.error("[webhook] ensureCollectionPlanForCase failed", err);
        });
      }

      // Filing Kit: ensure the per-case research report exists and is published
      // (starts research if needed, publishes a finished report, re-runs a
      // failed one). Idempotent, so a retried webhook won't double-fire.
      if (
        productKey === "filing_guide" &&
        event.type === "payment_intent.succeeded"
      ) {
        ensureFilingReportForCase(caseId).catch((err) => {
          console.error("[webhook] ensureFilingReportForCase failed", err);
        });
      }

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
      // Stripe fires charge.refunded for PARTIAL refunds too. Only revoke the
      // customer's access when the charge is fully refunded, otherwise a small
      // partial refund (e.g. refunding one add-on) would strip access to
      // everything they paid for. `charge.refunded` is true only when the full
      // amount is back; we also compare amounts as a belt-and-braces check.
      const fullyRefunded =
        charge.refunded === true ||
        (typeof charge.amount === "number" &&
          typeof charge.amount_refunded === "number" &&
          charge.amount_refunded >= charge.amount);
      if (typeof charge.payment_intent === "string" && fullyRefunded) {
        const { error: refundErr } = await admin
          .from("payments")
          .update({ status: "refunded", refunded_at: new Date().toISOString() })
          .eq("stripe_payment_intent_id", charge.payment_intent);
        assertDbWrite(refundErr, "charge.refunded update");
      }
      break;
    }

    default:
      // Ignore unsubscribed events
      break;
  }
  } catch (err) {
    // A DB write (or other critical step) failed. Return 500 so Stripe retries
    // the event later instead of dropping the payment on the floor.
    console.error("[stripe webhook] handler error, asking Stripe to retry", err);
    return NextResponse.json({ error: "handler_error" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

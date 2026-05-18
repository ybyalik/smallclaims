// Reconciliation logic for payments. The Stripe webhook is the primary
// source of truth for status updates, but we can't always rely on it:
// - Preview deploys have no webhook endpoint, so events go nowhere.
// - Webhooks can be delayed, dropped, or fail signature verification.
//
// To make the system self-healing, the success page and any page that
// reads payment state can call `reconcilePendingPayment` to ask Stripe
// directly about a pending PaymentIntent and update the local row if
// the intent has already succeeded server-side.

import type Stripe from "stripe";
import { getStripe } from "../stripe";
import { createServiceRoleClient } from "../supabase/service-role";
import { markCasePaid } from "../demand-letter/mark-paid";
import { ensureCollectionPlanForCase } from "../collection-plan/generate";

const STANDALONE_UNLOCKS = new Set(["filing_guide", "collection_plan"]);

interface ReconcileResult {
  status: "succeeded" | "pending" | "failed" | "not_found";
  paymentIntentId: string | null;
  paymentRowId: string | null;
  amountCents: number | null;
}

export async function reconcilePendingPayment(
  caseId: string,
  productKey?: string,
): Promise<ReconcileResult> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;

  let query = admin
    .from("payments")
    .select("id, stripe_payment_intent_id, status, paid_at, product_key, amount_cents, user_id")
    .eq("case_id", caseId)
    .order("created_at", { ascending: false })
    .limit(1);
  if (productKey) query = query.eq("product_key", productKey);

  const { data: row } = await query.maybeSingle();
  if (!row) {
    return { status: "not_found", paymentIntentId: null, paymentRowId: null, amountCents: null };
  }

  // Already finalized locally — trust the local row.
  if (row.status === "succeeded" && row.paid_at) {
    return {
      status: "succeeded",
      paymentIntentId: row.stripe_payment_intent_id,
      paymentRowId: row.id,
      amountCents: row.amount_cents,
    };
  }

  if (!row.stripe_payment_intent_id) {
    return {
      status: row.status as "pending" | "failed",
      paymentIntentId: null,
      paymentRowId: row.id,
      amountCents: row.amount_cents,
    };
  }

  const stripe = getStripe();
  let intent: Stripe.PaymentIntent;
  try {
    intent = await stripe.paymentIntents.retrieve(row.stripe_payment_intent_id);
  } catch (err) {
    console.error("[reconcile] Stripe retrieve failed", err);
    return {
      status: row.status as "pending" | "failed",
      paymentIntentId: row.stripe_payment_intent_id,
      paymentRowId: row.id,
      amountCents: row.amount_cents,
    };
  }

  if (intent.status === "succeeded" || intent.status === "requires_capture") {
    await admin
      .from("payments")
      .update({
        status: intent.status === "succeeded" ? "succeeded" : "pending",
        paid_at: new Date().toISOString(),
      })
      .eq("id", row.id);

    // Demand-letter products advance case status + queue the mail.
    // Filing-guide and collection-plan are access unlocks (no mail).
    if (row.product_key && !STANDALONE_UNLOCKS.has(row.product_key)) {
      try {
        await markCasePaid(caseId, { source: "inline_confirm" });
      } catch (err) {
        console.error("[reconcile] markCasePaid failed", err);
      }
    }

    // Collection plan: when this is the first time the payment lands as
    // succeeded, kick off the generation pipeline. ensureCollectionPlanForCase
    // is idempotent so a duplicate webhook + reconcile won't double-generate.
    if (
      row.product_key === "collection_plan" &&
      intent.status === "succeeded"
    ) {
      ensureCollectionPlanForCase(caseId).catch((err) => {
        console.error("[reconcile] ensureCollectionPlanForCase failed", err);
      });
    }

    return {
      status: intent.status === "succeeded" ? "succeeded" : "pending",
      paymentIntentId: intent.id,
      paymentRowId: row.id,
      amountCents: intent.amount,
    };
  }

  if (intent.status === "canceled" || intent.status === "requires_payment_method") {
    return {
      status: "pending",
      paymentIntentId: intent.id,
      paymentRowId: row.id,
      amountCents: row.amount_cents,
    };
  }

  return {
    status: "pending",
    paymentIntentId: intent.id,
    paymentRowId: row.id,
    amountCents: row.amount_cents,
  };
}

/**
 * Cheap batched version of reconcilePendingPayment for the common page-load
 * case: "we don't actually know if anything needs reconciling, just make sure
 * we self-heal if a webhook was dropped."
 *
 * Strategy: ONE query for all latest payments on this case. Only call Stripe
 * for rows where status !== 'succeeded' AND there's a stripe_payment_intent_id.
 *
 * On a case where every product is already paid (the common case), this is
 * one DB query and zero Stripe calls. The old per-product reconcile made N
 * separate DB queries even when nothing was pending — which was costing
 * 200-400ms per case page load.
 */
export async function reconcileAllPendingForCase(caseId: string): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;
  const { data: rows } = await admin
    .from("payments")
    .select(
      "id, stripe_payment_intent_id, status, paid_at, product_key, amount_cents, user_id, case_id, created_at",
    )
    .eq("case_id", caseId)
    .order("created_at", { ascending: false });
  if (!rows || rows.length === 0) return;

  // Keep only the latest row per product_key so we don't waste Stripe calls
  // on older superseded payment intents for the same product.
  const seenProducts = new Set<string>();
  const latestPerProduct: Array<{
    id: string;
    stripe_payment_intent_id: string | null;
    status: string;
    product_key: string | null;
  }> = [];
  for (const r of rows) {
    const key = r.product_key ?? "_no_product";
    if (seenProducts.has(key)) continue;
    seenProducts.add(key);
    latestPerProduct.push(r);
  }

  // Only Stripe-check rows that are NOT already succeeded and have an intent id.
  const needsStripeCheck = latestPerProduct.filter(
    (r) => r.status !== "succeeded" && !!r.stripe_payment_intent_id,
  );
  if (needsStripeCheck.length === 0) return;

  // Defer to the single-row reconciler in parallel. Each call now does its
  // own DB lookup again (because reconcilePendingPayment is the canonical
  // self-heal path), but for the rare case where N > 0 the duplicate query
  // is acceptable. The big savings is the common case where N == 0.
  await Promise.all(
    needsStripeCheck.map((r) =>
      r.product_key
        ? reconcilePendingPayment(caseId, r.product_key)
        : Promise.resolve(null),
    ),
  );
}

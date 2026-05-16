// Shared server component for the post-checkout success page. The three
// per-product success routes (demand-letter, filing-guide, collection-plan)
// all delegate here — they were near-identical copies before.

import { notFound, redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";
import { loadOwnedCase } from "../../lib/demand-letter/access";
import { reconcilePendingPayment } from "../../lib/payments/reconcile";
import { ensureDemandLetterForCase } from "../../lib/demand-letter/ensure-letter";
import type { ProductKey } from "../../lib/stripe";
import OrderConfirmation from "./OrderConfirmation";
import type { ProductKind } from "./config";
import "../../app/wizard.css";
import "./checkout.css";

interface Props {
  caseId: string;
  productKind: ProductKind;
  // Specific Stripe product key to reconcile against. `undefined` lets the
  // reconciler infer from any pending payment on the case (demand-letter
  // flow, which has two possible tiers).
  productKey?: ProductKey;
  // The path the success page lives at. Used as the `next=` redirect when
  // the requester is signed out.
  successPath: string;
}

export default async function PurchaseSuccessPage({
  caseId,
  productKind,
  productKey,
  successPath,
}: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createClient() as any;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect(`/login?next=${encodeURIComponent(successPath)}`);
  }

  const c = await loadOwnedCase(caseId);
  if (!c) notFound();

  const result = await reconcilePendingPayment(c.id, productKey);

  // For demand-letter purchases, kick off letter generation in parallel with
  // the user reading the order confirmation. By the time they click through
  // to /case/[id]/letter the letter row should already be in the database,
  // so they don't sit on a blank iframe waiting 10-15s for the LLM.
  // Fire-and-forget: we don't want the success page to block on it.
  if (productKind === "demand-letter") {
    ensureDemandLetterForCase(c.id).catch((e) => {
      console.warn("[purchase-success] eager letter generation failed", e);
    });
  }

  return (
    <div className="app-checkout-shell">
      <OrderConfirmation
        productKind={productKind}
        caseId={c.id}
        amountCents={result.amountCents}
        paymentId={result.status === "succeeded" ? result.paymentRowId : null}
      />
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "../../../../../../lib/supabase/server";
import { loadOwnedCase } from "../../../../../../lib/demand-letter/access";
import { hasPaidForProduct } from "../../../../../../lib/payments/access";
import CheckoutShell from "../../../../../../components/checkout/CheckoutShell";
import "../../../../../wizard.css";
import "../../../../../../components/checkout/checkout.css";

export const metadata: Metadata = {
  title: "Buy Post-Judgment Collection Plan",
};

export const dynamic = "force-dynamic";

interface Props {
  params: { id: string };
}

export default async function BuyCollectionPlanPage({ params }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createClient() as any;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect(`/login?next=/case/${params.id}/buy/collection-plan`);
  }

  const c = await loadOwnedCase(params.id);
  if (!c) notFound();

  if (c.status === "draft") {
    redirect(`/case/${c.id}/build`);
  }

  const paid = await hasPaidForProduct(c.id, "collection_plan");
  if (paid) {
    redirect(`/case/${c.id}/collection`);
  }

  // Forward any previously saved checkout answers so the user doesn't lose
  // selections across reloads. Only string-valued keys are surfaced; the
  // rest of intake_answers is ignored by the checkout shell.
  const answers = (c.intake_answers as Record<string, unknown> | null) ?? {};
  const initialAnswers: Record<string, string> = {};
  for (const [k, v] of Object.entries(answers)) {
    if (typeof v === "string") initialAnswers[k] = v;
  }

  return (
    <div className="app-checkout-shell">
      <Link href={`/case/${c.id}`} className="app-back">
        Back to your case
      </Link>
      <CheckoutShell
        caseId={c.id}
        productKind="collection-plan"
        recipientName={c.defendant_name ?? ""}
        initialAnswers={initialAnswers}
      />
    </div>
  );
}

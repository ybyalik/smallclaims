import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "../../../../../../lib/supabase/server";
import { loadOwnedCase } from "../../../../../../lib/demand-letter/access";
import { paidProductsForCase } from "../../../../../../lib/payments/access";
import CheckoutShell from "../../../../../../components/checkout/CheckoutShell";
import "../../../../../wizard.css";
import "../../../../../../components/checkout/checkout.css";

export const metadata: Metadata = {
  title: "Buy Demand Letter",
};

export const dynamic = "force-dynamic";

interface Props {
  params: { id: string };
}

export default async function BuyDemandLetterPage({ params }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createClient() as any;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect(`/login?next=/case/${params.id}/buy/demand-letter`);
  }

  const c = await loadOwnedCase(params.id);
  if (!c) notFound();

  if (c.status === "draft") {
    redirect(`/case/${c.id}/build`);
  }

  const paid = await paidProductsForCase(c.id, [
    "tier_send_letter",
    "tier_full_pressure",
  ]);
  if (paid.has("tier_send_letter") || paid.has("tier_full_pressure")) {
    redirect(`/dashboard/cases/${c.id}/letter`);
  }

  const answers = (c.intake_answers as Record<string, unknown> | null) ?? {};
  const skipTraceNeeded = !!answers.defendant_skip_trace_needed;

  // Pull existing question answers from intake_answers so the buy page
  // remembers them across reloads. Only string-valued keys are forwarded;
  // the rest of intake_answers is irrelevant here.
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
        productKind="demand-letter"
        recipientName={c.defendant_name ?? ""}
        skipTraceNeeded={skipTraceNeeded}
        preselectedAddons={(answers.preselected_addons as string[]) || []}
        initialAnswers={initialAnswers}
      />
    </div>
  );
}

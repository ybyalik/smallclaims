import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "../../../../../../lib/supabase/server";
import type { Case } from "../../../../../../lib/supabase/types";
import { hasPaidForProduct } from "../../../../../../lib/payments/access";
import CheckoutShell from "../../../../../../components/checkout/CheckoutShell";
import "../../../../../wizard.css";
import "../../../../../../components/checkout/checkout.css";

export const metadata: Metadata = {
  title: "Buy Filing Guide",
};

export const dynamic = "force-dynamic";

interface Props {
  params: { id: string };
}

export default async function BuyFilingGuidePage({ params }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createClient() as any;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect(`/login?next=/case/${params.id}/buy/filing-guide`);
  }

  const { data: caseRow } = await supabase
    .from("cases")
    .select("*")
    .eq("id", params.id)
    .eq("owner_user_id", user.id)
    .single();
  if (!caseRow) notFound();
  const c = caseRow as Case;

  if (c.status === "draft") {
    redirect(`/case/${c.id}/build`);
  }

  const paid = await hasPaidForProduct(c.id, "filing_guide");
  if (paid) {
    redirect(`/case/${c.id}/file`);
  }

  return (
    <div className="app-checkout-shell">
      <Link href={`/case/${c.id}`} className="app-back">
        Back to your case
      </Link>
      <CheckoutShell
        caseId={c.id}
        productKind="filing-guide"
        recipientName={c.defendant_name ?? ""}
      />
    </div>
  );
}

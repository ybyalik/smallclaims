import type { Metadata } from "next";
import PurchaseSuccessPage from "../../../../../../../components/checkout/PurchaseSuccessPage";

export const metadata: Metadata = {
  title: "Order Complete",
};

export const dynamic = "force-dynamic";

export default async function FilingGuideSuccessPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <PurchaseSuccessPage
      caseId={params.id}
      productKind="filing-guide"
      productKey="filing_guide"
      successPath={`/case/${params.id}/buy/filing-guide/success`}
    />
  );
}

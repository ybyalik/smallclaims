import type { Metadata } from "next";
import PurchaseSuccessPage from "../../../../../../../components/checkout/PurchaseSuccessPage";

export const metadata: Metadata = {
  title: "Order Complete",
};

export const dynamic = "force-dynamic";

export default async function CollectionPlanSuccessPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <PurchaseSuccessPage
      caseId={params.id}
      productKind="collection-plan"
      productKey="collection_plan"
      successPath={`/case/${params.id}/buy/collection-plan/success`}
    />
  );
}

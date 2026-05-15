import { notFound } from "next/navigation";
import { loadOwnedCase } from "../../../../../../lib/demand-letter/access";
import { disputeTypeOtherFrom } from "../../../../../../lib/cases/dispute-type-label";
import CategoryStep from "./CategoryStep";

export const dynamic = "force-dynamic";

interface Props {
  params: { id: string };
}

export default async function CategoryPage({ params }: Props) {
  const c = await loadOwnedCase(params.id);
  if (!c) notFound();
  const customText = disputeTypeOtherFrom(c.intake_answers) ?? "";
  return (
    <CategoryStep
      caseId={c.id}
      initialSlug={c.dispute_type}
      initialCustomText={customText}
    />
  );
}

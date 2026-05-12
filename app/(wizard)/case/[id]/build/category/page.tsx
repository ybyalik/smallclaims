import { notFound } from "next/navigation";
import { loadOwnedCase } from "../../../../../../lib/demand-letter/access";
import CategoryStep from "./CategoryStep";

export const dynamic = "force-dynamic";

interface Props {
  params: { id: string };
}

export default async function CategoryPage({ params }: Props) {
  const c = await loadOwnedCase(params.id);
  if (!c) notFound();
  return <CategoryStep caseId={c.id} initialSlug={c.dispute_type} />;
}

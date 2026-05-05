import { notFound } from "next/navigation";
import { loadOwnedCase } from "../../../../../../lib/demand-letter/access";
import AmountStep from "./AmountStep";

export const dynamic = "force-dynamic";

interface Props {
  params: { id: string };
}

export default async function AmountPage({ params }: Props) {
  const c = await loadOwnedCase(params.id);
  if (!c) notFound();
  return <AmountStep caseId={c.id} initialCents={c.amount_cents} />;
}

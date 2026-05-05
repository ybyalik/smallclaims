import { notFound } from "next/navigation";
import { loadOwnedCase } from "../../../../../../lib/demand-letter/access";
import EligibilityStep from "./EligibilityStep";

export const dynamic = "force-dynamic";

interface Props {
  params: { id: string };
}

export default async function EligibilityPage({ params }: Props) {
  const c = await loadOwnedCase(params.id);
  if (!c) notFound();
  return <EligibilityStep caseId={c.id} />;
}

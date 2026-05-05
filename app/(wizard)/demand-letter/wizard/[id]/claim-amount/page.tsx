import { notFound } from "next/navigation";
import { loadOwnedCase } from "../../../../../../lib/demand-letter/access";
import { getStateContext } from "../../../../../../lib/demand-letter/state-context";
import ClaimAmountStep from "./ClaimAmountStep";

export const dynamic = "force-dynamic";

interface Props {
  params: { id: string };
}

export default async function ClaimAmountPage({ params }: Props) {
  const c = await loadOwnedCase(params.id);
  if (!c) notFound();
  const ctx = getStateContext(c.state || "");
  return (
    <ClaimAmountStep
      caseId={c.id}
      initialAmountCents={c.amount_cents}
      initialDisputeType={c.dispute_type}
      initialAnswers={(c.intake_answers as Record<string, unknown> | null) ?? {}}
      stateInterestRate={ctx?.prejudgment_interest_rate ?? 0}
    />
  );
}

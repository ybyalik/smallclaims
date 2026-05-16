import { notFound } from "next/navigation";
import { loadOwnedCase } from "../../../../../../lib/demand-letter/access";
import { getStateContext } from "../../../../../../lib/demand-letter/state-context";
import EligibilityStep from "./EligibilityStep";

export const dynamic = "force-dynamic";

interface Props {
  params: { id: string };
}

export default async function EligibilityPage({ params }: Props) {
  const c = await loadOwnedCase(params.id);
  if (!c) notFound();
  const initialState = c.state || "";
  const ctx = initialState ? getStateContext(initialState) : null;
  return (
    <EligibilityStep
      caseId={c.id}
      initialAmountCents={c.amount_cents ?? 0}
      initialStateAbbr={initialState}
      initialAnswers={(c.intake_answers as Record<string, unknown> | null) ?? {}}
      stateCapDollars={ctx?.small_claims_max_dollars ?? null}
      stateName={ctx?.name ?? null}
    />
  );
}

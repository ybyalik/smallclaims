import { notFound } from "next/navigation";
import { loadOwnedCase } from "../../../../../../lib/demand-letter/access";
import { getStateContext } from "../../../../../../lib/demand-letter/state-context";
import RecoveryStep from "./RecoveryStep";

export const dynamic = "force-dynamic";

interface Props {
  params: { id: string };
}

export default async function RecoveryPage({ params }: Props) {
  const c = await loadOwnedCase(params.id);
  if (!c) notFound();
  const ctx = getStateContext(c.state || "");
  return (
    <RecoveryStep
      caseId={c.id}
      claimDollars={Math.round(c.amount_cents / 100)}
      stateName={ctx?.name ?? "your state"}
      stateAbbr={c.state ?? ""}
      interestRate={ctx?.prejudgment_interest_rate ?? 0}
      smallClaimsMax={ctx?.small_claims_max_dollars ?? 0}
    />
  );
}

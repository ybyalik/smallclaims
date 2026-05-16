import { notFound } from "next/navigation";
import { loadOwnedCase } from "../../../../../../lib/demand-letter/access";
import { getStateContext } from "../../../../../../lib/demand-letter/state-context";
import { canonicalClaimTypesForDispute } from "../../../../../../lib/cases/dispute-to-claim-type";
import { loadCaseRelevantStateRows } from "../../../../../../lib/state-research/case-relevant";
import ClaimAmountStep from "./ClaimAmountStep";

export const dynamic = "force-dynamic";

interface Props {
  params: { id: string };
}

export default async function ClaimAmountPage({ params }: Props) {
  const c = await loadOwnedCase(params.id);
  if (!c) notFound();
  const ctx = getStateContext(c.state || "");

  // Use the wizard dispute type to roughly classify the case before our
  // LLM classifier has run (mid-intake). Then filter the per-state
  // research pack to multipliers + interest rows that match.
  const caseClaimTypes = canonicalClaimTypesForDispute(c.dispute_type);
  const stateRelevant = c.state
    ? await loadCaseRelevantStateRows(c.state, caseClaimTypes)
    : { multipliers: [], interest: null };

  // Prefer the claim-type-matched prejudgment-interest rate from the
  // structured pack when we have it. Fall back to the flat hardcoded rate
  // (still useful for states the pack hasn't been refreshed for yet).
  const interestRate =
    stateRelevant.interest?.rate_pct ?? ctx?.prejudgment_interest_rate ?? 0;
  const interestCitation = stateRelevant.interest?.citation ?? null;

  return (
    <ClaimAmountStep
      caseId={c.id}
      initialAmountCents={c.amount_cents}
      initialDisputeType={c.dispute_type}
      initialAnswers={(c.intake_answers as Record<string, unknown> | null) ?? {}}
      stateInterestRate={interestRate}
      stateInterestCitation={interestCitation}
      stateName={ctx?.name ?? null}
      stateCapDollars={ctx?.small_claims_max_dollars ?? null}
      stateMultipliers={stateRelevant.multipliers}
    />
  );
}

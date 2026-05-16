// Wizard dispute_type → canonical claim_type label(s).
//
// canonicalClaimTypesForDispute returns the union of plausible canonical
// claim types for a wizard category. Used during intake (before the
// classifier LLM call has run) so we can filter state-research data
// (statutory multipliers, prejudgment interest, SOL) to rows that are at
// least roughly relevant to the user's case.
//
// canonicalPrimaryClaimType returns the single most-likely match, used by
// the case-research stage when the classifier didn't run. It's a strict
// subset of canonicalClaimTypesForDispute (the first element).

export function canonicalClaimTypesForDispute(
  disputeType: string | null | undefined,
): string[] {
  if (!disputeType) return [];
  switch (disputeType.toLowerCase()) {
    case "landlord":
      return ["security_deposit", "lease_breach"];
    case "contractor":
      return ["written_contract", "oral_contract"];
    case "employer":
      return ["wages", "final_paycheck", "consumer_protection"];
    case "auto":
      return ["property_damage", "negligence"];
    case "neighbor":
      return ["property_damage", "negligence"];
    case "personal_loan":
      return ["promissory_note", "written_contract", "oral_contract"];
    case "roommate":
      return ["oral_contract", "security_deposit", "lease_breach"];
    case "online_seller":
      return ["breach_of_warranty", "consumer_protection", "fraud"];
    case "refund":
      return ["consumer_protection", "breach_of_warranty"];
    case "property_damage":
      return ["property_damage", "negligence", "conversion"];
    case "medical_billing":
      return ["consumer_protection"];
    case "insurance":
      return ["written_contract", "consumer_protection"];
    case "pet_injury":
      return ["negligence", "property_damage"];
    default:
      return [];
  }
}

export function canonicalPrimaryClaimType(
  disputeType: string | null | undefined,
): string | null {
  const all = canonicalClaimTypesForDispute(disputeType);
  return all[0] ?? null;
}

// Single source of truth for human-readable dispute-type labels.
//
// dispute_type is an enum; the picker also offers "other" which lets the
// user describe their dispute in their own words. The free text lives at
// cases.intake_answers.dispute_type_other. Every consumer that surfaces
// dispute_type to a human (display lists, LLM prompts, dashboard headers)
// should go through one of the helpers below so "other" never leaks as a
// generic placeholder again.

// Canonical short labels for the dropdown / list display.
const SHORT_LABELS: Record<string, string> = {
  landlord: "Landlord/Tenant",
  auto: "Auto/Vehicle",
  personal_loan: "Personal Loan/Debt",
  contractor: "Contractor/Home Improvement",
  refund: "Consumer Refund",
  online_seller: "Online Purchase",
  employer: "Employer/Employee",
  property_damage: "Property Damage",
  medical_billing: "Medical/Dental Billing",
  insurance: "Insurance Issues",
  pet_injury: "Pet Injuries",
  neighbor: "Neighbor Dispute",
  roommate: "Roommate Dispute",
  // Legacy enum values, still in DB:
  unpaid_debt: "Unpaid Debt",
  security_deposit: "Security Deposit",
  services_not_rendered: "Services Not Rendered",
  goods_not_delivered: "Goods Not Delivered",
};

// Prose-style phrases for use inside generated copy (letters, prompts,
// emails). These plug into sentences like "regarding {phrase}".
const PHRASES: Record<string, string> = {
  landlord: "a landlord/tenant dispute",
  auto: "a vehicle-related dispute",
  personal_loan: "an unpaid personal loan",
  contractor: "a contractor / home-improvement dispute",
  refund: "a refund dispute over a defective product or undelivered service",
  online_seller: "a dispute with an online seller",
  employer: "an unpaid-wages or employment dispute",
  property_damage: "damage to or loss of personal property",
  medical_billing: "a medical or dental billing dispute",
  insurance: "a denied or underpaid insurance claim",
  pet_injury: "a pet-injury claim",
  neighbor: "a neighbor dispute",
  roommate: "a roommate dispute",
  // Legacy enum values:
  unpaid_debt: "an unpaid debt",
  security_deposit: "an unreturned security deposit",
  services_not_rendered: "services that were paid for but not properly delivered",
  goods_not_delivered: "goods that were paid for but not delivered as agreed",
};

const GENERIC_PHRASE = "an unresolved civil dispute";

/**
 * Read the free-text override for "other" out of a case row.
 * Returns trimmed string if present and non-empty, otherwise null.
 */
export function disputeTypeOtherFrom(
  intakeAnswers: Record<string, unknown> | null | undefined,
): string | null {
  if (!intakeAnswers) return null;
  const raw = intakeAnswers.dispute_type_other;
  if (typeof raw !== "string") return null;
  const trimmed = raw.trim();
  return trimmed.length > 0 ? trimmed : null;
}

/**
 * Short display label for lists, headers, status pills.
 * For "other" with custom text → "Custom: <text>" (truncated if long).
 * For "other" without text → "Other".
 * For unknown slugs → the slug with underscores replaced by spaces.
 */
export function formatDisputeTypeShort(
  disputeType: string,
  customText: string | null = null,
): string {
  if (disputeType === "other") {
    if (customText) {
      const truncated = customText.length > 50
        ? customText.slice(0, 47).trimEnd() + "..."
        : customText;
      return `Custom: ${truncated}`;
    }
    return "Other";
  }
  return SHORT_LABELS[disputeType] ?? disputeType.replace(/_/g, " ");
}

/**
 * Prose-style phrase for embedding inside generated content (demand letter,
 * research prompts, emails). For "other" with custom text the phrase quotes
 * the user's words so the LLM has something concrete to anchor on.
 */
export function formatDisputeTypePhrase(
  disputeType: string,
  customText: string | null = null,
): string {
  if (disputeType === "other") {
    if (customText) {
      return `a dispute the plaintiff describes as: ${customText}`;
    }
    return GENERIC_PHRASE;
  }
  return PHRASES[disputeType] ?? GENERIC_PHRASE;
}

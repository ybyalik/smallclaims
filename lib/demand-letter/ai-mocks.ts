// Deterministic AI stand-ins for the wizard. The shape mirrors what a real
// LLM endpoint would return so the swap to a hosted model later is a one-line
// change in each consumer.

import type { DisputeType } from "../supabase/types";

export interface NarrativeChecklist {
  payment_amount_and_when: boolean;
  agreement_terms: boolean;
  what_went_wrong: boolean;
  resolution_attempted: boolean;
}

/**
 * Heuristic checklist: does the user's narrative cover each of the four
 * "strengthen your claim" buckets? Real LLM would do this with an embedded
 * classifier; here we use keyword presence so the UI feels alive.
 */
export function checklistFromNarrative(text: string): NarrativeChecklist {
  const t = text.toLowerCase();
  return {
    payment_amount_and_when:
      /\$\d|paid\b|payment\b|deposit\b|invoice\b|wired\b/.test(t) &&
      /(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|\d{1,2}\/\d{1,2}|\b\d{4}|month|week|day|ago)/.test(
        t
      ),
    agreement_terms:
      /(agreed|agreement|contract|verbally|email|text|signed|wrote|said|promised|verbal)/.test(t),
    what_went_wrong:
      /(never|did not|didn't|stopped|broke|failed|missing|wrong|incorrect|not as|did[\s-]?n.?t)/.test(t),
    resolution_attempted:
      /(asked|emailed|texted|called|reached out|requested|demanded|complained|refund|return)/.test(t),
  };
}

/**
 * One-sentence form-friendly summary. Mock version pulls the first sentence
 * and trims if needed; a real LLM would rewrite for the demand-letter tone.
 */
export function summaryFromNarrative(text: string): string {
  if (!text.trim()) return "";
  const firstSentence = text.split(/(?<=[.!?])\s+/)[0] ?? text;
  const trimmed = firstSentence.trim().replace(/\s+/g, " ").slice(0, 220);
  return trimmed.endsWith(".") ? trimmed : trimmed + ".";
}

export interface ClaimHeadSuggestion {
  key: string;
  title: string;
  blurb: string;
}

const HEADS_BY_TYPE: Partial<Record<DisputeType, ClaimHeadSuggestion[]>> = {
  unpaid_debt: [
    { key: "interest", title: "Late payment interest", blurb: "Statutory or contractual interest on the overdue amount." },
    { key: "collection_costs", title: "Collection costs", blurb: "What you spent trying to recover the money before suing." },
  ],
  breach_of_contract: [
    { key: "expectation", title: "Loss of expected benefit", blurb: "What the contract would have given you if performed." },
    { key: "consequential", title: "Consequential damages", blurb: "Foreseeable downstream losses from the breach." },
    { key: "remedial", title: "Remedial work", blurb: "Cost to fix or complete what they didn't." },
  ],
  property_damage: [
    { key: "diminution", title: "Diminished value", blurb: "Drop in resale or fair market value of the damaged item." },
    { key: "loss_of_use", title: "Loss of use", blurb: "Compensation while the item couldn't be used." },
  ],
  defective_product_or_service: [
    { key: "refund", title: "Full refund", blurb: "Return of what you paid." },
    { key: "remedial", title: "Remedial work", blurb: "Cost to fix what they did badly." },
    { key: "lost_income", title: "Lost income", blurb: "Wages or business income missed because of the defect." },
  ],
  unpaid_rent_or_deposit: [
    { key: "statutory_multiplier", title: "Statutory multiplier", blurb: "2x or 3x the deposit in many states for bad-faith withholding." },
    { key: "interest", title: "Statutory interest", blurb: "Pre-judgment interest at the state's legal rate." },
  ],
  poor_construction: [
    { key: "remedial", title: "Remedial work", blurb: "Cost to repair or redo what was done poorly." },
    { key: "professional_fees", title: "Professional fees", blurb: "Inspectors, engineers, or other experts you hired." },
    { key: "loss_of_use", title: "Loss of use", blurb: "What you spent because the property couldn't be used." },
  ],
  auto_accident_or_repair: [
    { key: "diminution", title: "Diminished value", blurb: "Drop in vehicle resale value after the incident." },
    { key: "loss_of_use", title: "Loss of use", blurb: "Rental car or rideshare costs while yours was being repaired." },
  ],
  personal_injury: [
    { key: "medical", title: "Medical bills", blurb: "Out-of-pocket medical care, prescriptions, therapy." },
    { key: "lost_income", title: "Lost income", blurb: "Wages or business income missed during recovery." },
  ],
};

export function suggestClaimHeads(disputeType: DisputeType): ClaimHeadSuggestion[] {
  return HEADS_BY_TYPE[disputeType] ?? [];
}

/**
 * Common claim-amount pattern by dispute type. Surface a one-line hint so
 * users have an anchor when their gut amount is off.
 */
const AMOUNT_HINTS: Partial<Record<DisputeType, { common: number; pattern: string }>> = {
  unpaid_rent_or_deposit: { common: 2_500, pattern: "deposits in the $1,500 to $4,000 range" },
  unpaid_debt: { common: 3_000, pattern: "personal loan or invoice disputes" },
  breach_of_contract: { common: 5_000, pattern: "small-business contract disputes" },
  defective_product_or_service: { common: 1_500, pattern: "consumer goods and home services" },
  property_damage: { common: 2_500, pattern: "auto and personal property cases" },
  poor_construction: { common: 8_000, pattern: "remodel and contractor cases" },
};

export function amountHintFor(disputeType: DisputeType): { common: number; pattern: string } | null {
  return AMOUNT_HINTS[disputeType] ?? null;
}

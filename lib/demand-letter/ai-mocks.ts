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
  // Canonical 11 + other
  landlord: [
    { key: "statutory_multiplier", title: "Statutory multiplier", blurb: "Many states impose 2x or 3x the deposit for bad-faith withholding." },
    { key: "interest", title: "Statutory interest", blurb: "Pre-judgment interest at the state's legal rate." },
    { key: "remedial", title: "Repair-and-deduct costs", blurb: "What you spent on repairs the landlord refused to handle." },
  ],
  auto: [
    { key: "diminution", title: "Diminished value", blurb: "Drop in vehicle resale value after the incident." },
    { key: "loss_of_use", title: "Loss of use", blurb: "Rental car or rideshare costs while yours was being repaired." },
    { key: "tow_storage", title: "Tow & storage fees", blurb: "Out-of-pocket tow, impound, or storage charges you paid." },
  ],
  personal_loan: [
    { key: "interest", title: "Late payment interest", blurb: "Statutory or contractual interest on the overdue amount." },
    { key: "collection_costs", title: "Collection costs", blurb: "What you spent trying to recover the money before suing." },
  ],
  contractor: [
    { key: "remedial", title: "Cost to complete or redo", blurb: "What it costs to finish or fix what they didn't do correctly." },
    { key: "professional_fees", title: "Professional fees", blurb: "Inspectors, engineers, or other experts you hired to assess the work." },
    { key: "loss_of_use", title: "Loss of use", blurb: "What you spent because the property couldn't be used (alt. housing, etc.)." },
  ],
  refund: [
    { key: "refund", title: "Full refund", blurb: "Return of what you paid." },
    { key: "remedial", title: "Remedial work", blurb: "Cost to fix what they did badly." },
    { key: "lost_income", title: "Lost income", blurb: "Wages or business income missed because of the defect." },
  ],
  online_seller: [
    { key: "refund", title: "Full refund", blurb: "Return of the purchase price." },
    { key: "shipping_costs", title: "Shipping & return costs", blurb: "What you paid to ship or attempt to return." },
    { key: "replacement_premium", title: "Replacement premium", blurb: "Extra you paid to source a replacement when the seller bailed." },
  ],
  employer: [
    { key: "statutory_multiplier", title: "Statutory wage penalties", blurb: "Many states impose 2x or 3x for unpaid wages or willful nonpayment." },
    { key: "waiting_time", title: "Waiting-time penalties", blurb: "Per-day penalty in some states (e.g., CA Labor Code 203) for late final pay." },
    { key: "interest", title: "Pre-judgment interest", blurb: "On the unpaid wages from the date they were due." },
  ],
  property_damage: [
    { key: "replacement", title: "Replacement value", blurb: "Cost to replace the damaged or lost item with an equivalent one." },
    { key: "diminution", title: "Diminished value", blurb: "Drop in resale value when full replacement isn't available." },
    { key: "loss_of_use", title: "Loss of use", blurb: "Compensation while the item couldn't be used." },
  ],
  medical_billing: [
    { key: "amount_overcharged", title: "Amount overcharged", blurb: "Difference between what was billed and what you actually owed under your coverage." },
    { key: "credit_damage", title: "Credit damage", blurb: "Documented impact from collections on a wrongly-billed amount." },
    { key: "interest", title: "Pre-judgment interest", blurb: "On the overpaid or wrongly-billed amount." },
  ],
  insurance: [
    { key: "claim_amount", title: "Underpaid claim amount", blurb: "The shortfall between what you submitted and what the insurer paid." },
    { key: "bad_faith", title: "Bad-faith damages", blurb: "Some states allow extra damages when an insurer denies in bad faith." },
    { key: "interest", title: "Pre-judgment interest", blurb: "Statutory interest on the unpaid claim from when it was due." },
  ],
  pet_injury: [
    { key: "vet_costs", title: "Veterinary costs", blurb: "Emergency care, surgery, medication, follow-up appointments." },
    { key: "lost_income", title: "Lost income", blurb: "Wages missed if you took time off to care for the injured pet." },
    { key: "replacement", title: "Replacement value", blurb: "If the pet died: market or breed-specific replacement value." },
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
  landlord: { common: 2_500, pattern: "deposits and landlord disputes in the $1,500 to $4,000 range" },
  auto: { common: 3_500, pattern: "auto repair, accident damage, and dealership disputes" },
  personal_loan: { common: 3_000, pattern: "personal loan or IOU disputes" },
  contractor: { common: 8_000, pattern: "remodel and contractor disputes" },
  refund: { common: 1_500, pattern: "consumer goods and service refund cases" },
  online_seller: { common: 800, pattern: "Marketplace, eBay, and online purchase scams" },
  employer: { common: 4_000, pattern: "unpaid wages and final-paycheck cases" },
  property_damage: { common: 2_500, pattern: "moving, storage, and personal property cases" },
  medical_billing: { common: 1_800, pattern: "surprise bills and balance-billing disputes" },
  insurance: { common: 5_000, pattern: "denied or underpaid renters/auto/homeowners claims" },
  pet_injury: { common: 1_500, pattern: "vet bills from dog bite and kennel injury cases" },
};

export function amountHintFor(disputeType: DisputeType): { common: number; pattern: string } | null {
  return AMOUNT_HINTS[disputeType] ?? null;
}

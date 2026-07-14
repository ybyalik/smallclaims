// Classifies a case's facts into the canonical legal claim types used by the
// state research master tables (SOL, prejudgment interest, statutory
// multipliers, etc.). The wizard's dispute_type alone is a hint, not the
// answer; the actual claim depends on what happened. This helper feeds the
// LLM the facts narrative + amount + state and gets back primary +
// secondary canonical types.
//
// Cached on cases.intake_answers.case_classification so the call only fires
// once per case. Re-runs if the inputs change (the PATCH endpoint clears the
// cache when facts_narrative / dispute_type / dispute_type_other change).

import { createServiceRoleClient } from "../supabase/service-role";
import { structuredJson, MODEL, OpenAINotConfigured } from "../case-research/openai";

// The 18 canonical legal claim types used everywhere downstream. Sourced
// from lib/state-research/extract.ts; keep in sync.
export const CANONICAL_CLAIM_TYPES = [
  "written_contract",
  "oral_contract",
  "open_account",
  "promissory_note",
  "property_damage",
  "personal_injury",
  "fraud",
  "wages",
  "final_paycheck",
  "security_deposit",
  "conversion",
  "defamation",
  "negligence",
  "breach_of_warranty",
  "bad_check",
  "consumer_protection",
  "trespass_to_chattels",
  "quasi_contract",
] as const;

export type CanonicalClaimType = (typeof CANONICAL_CLAIM_TYPES)[number];

export interface CaseClassification {
  primary_claim_type: CanonicalClaimType;
  // Zero or more additional claim types when the case spans multiple legal
  // theories (e.g. landlord withheld deposit AND damaged property =
  // security_deposit + property_damage).
  secondary_claim_types: CanonicalClaimType[];
  // One-sentence rationale from the LLM. Surfaced in admin for debugging
  // and reviewed-by-human spot checks.
  reasoning: string;
  // Audit fields.
  classified_at: string; // ISO timestamp
  model: string;
}

interface ClassifyInputs {
  state: string;
  amount_cents: number;
  dispute_type: string;
  dispute_type_other?: string | null;
  facts_narrative: string;
}

const CLASSIFY_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    primary_claim_type: { type: "string", enum: [...CANONICAL_CLAIM_TYPES] },
    secondary_claim_types: {
      type: "array",
      items: { type: "string", enum: [...CANONICAL_CLAIM_TYPES] },
    },
    reasoning: { type: "string" },
  },
  required: ["primary_claim_type", "secondary_claim_types", "reasoning"],
};

const SYSTEM_PROMPT = `You are a legal analyst. The user is preparing a small-claims case. Pick the canonical legal claim type that best fits what actually happened (not just the wizard category they picked).

Pick from these 18 canonical types only:
- written_contract       — a signed agreement was breached
- oral_contract          — an unwritten agreement was breached
- open_account           — unpaid invoices on a running account (often medical, utility, services)
- promissory_note        — a documented loan / IOU went unpaid
- property_damage        — physical damage to tangible property (vehicles, equipment, belongings)
- personal_injury        — bodily harm
- fraud                  — knowing misrepresentation that caused loss
- wages                  — unpaid wages, overtime, tips, commissions
- final_paycheck         — last paycheck unpaid after separation (some states track this separately)
- security_deposit       — landlord wrongfully kept all or part of a rental security deposit
- conversion             — someone wrongfully kept or used the plaintiff's personal property
- defamation             — false statement that harmed reputation
- negligence             — careless act that caused harm
- breach_of_warranty     — goods or services failed to meet express or implied warranty (defective products, lemon vehicles, items not as described)
- bad_check              — a check was returned for insufficient funds
- consumer_protection    — deceptive trade practice covered by a state consumer-protection statute
- trespass_to_chattels   — interference with personal property short of conversion
- quasi_contract         — unjust enrichment / restitution where there's no actual contract

How to pick:
1. The facts narrative is the strongest signal. Read it carefully.
2. The wizard category is a hint but not authoritative. "Landlord/Tenant" might be security_deposit, written_contract (lease), breach_of_warranty (habitability), conversion (locked out + took belongings), or even property_damage. Pick from the facts.
3. If multiple claim types fit, set primary to the strongest one and put the others in secondary_claim_types. Many real cases span two or three theories.
4. If the facts truly don't fit any of the 18 above, pick the closest analogue (most often quasi_contract for "you owe me but there's no contract" cases).
5. Be precise. Don't pick written_contract just because the user said "we had a deal" — that's oral_contract unless there's an actual signed writing.
6. Keep secondary_claim_types short. Two or three at most.
7. Reasoning: one sentence, plain English, naming the key facts you keyed off.`;

function buildUserPrompt(inputs: ClassifyInputs): string {
  const lines: string[] = [];
  lines.push(`State: ${inputs.state}`);
  lines.push(`Amount in dispute: $${(inputs.amount_cents / 100).toLocaleString("en-US")}`);
  lines.push(`Wizard category (hint): ${inputs.dispute_type}`);
  if (inputs.dispute_type === "other" && inputs.dispute_type_other) {
    lines.push(`User's own description of the category: ${inputs.dispute_type_other}`);
  }
  lines.push("");
  lines.push("Facts narrative (user's own words):");
  lines.push(inputs.facts_narrative);
  return lines.join("\n");
}

/**
 * Direct LLM call. Use this when you already have the inputs in memory and
 * don't want the DB caching layer (e.g. background research workers that
 * already have the case loaded). Most callers should use getCaseClaimType
 * instead.
 */
export async function classifyClaimTypeFromInputs(
  inputs: ClassifyInputs,
): Promise<CaseClassification> {
  const model = MODEL.FAST;
  const res = await structuredJson<{
    primary_claim_type: CanonicalClaimType;
    secondary_claim_types: CanonicalClaimType[];
    reasoning: string;
  }>({
    model,
    systemPrompt: SYSTEM_PROMPT,
    input: buildUserPrompt(inputs),
    jsonSchema: CLASSIFY_SCHEMA,
    maxOutputTokens: 600,
  });
  return {
    primary_claim_type: res.data.primary_claim_type,
    secondary_claim_types: res.data.secondary_claim_types ?? [],
    reasoning: res.data.reasoning,
    classified_at: new Date().toISOString(),
    model,
  };
}

/**
 * Get the classification for a case. Reads from intake_answers cache; if
 * absent, runs the LLM call and caches the result on the case row. Idempotent
 * and safe to call from any number of consumers in parallel — multiple
 * concurrent first-fetches will all do the LLM call, but they'll all converge
 * on the same answer (with the last writer winning).
 *
 * Returns null when the case can't be classified yet (missing facts narrative
 * or amount). Callers should fall back to their previous behavior in that case.
 */
export async function getCaseClaimType(
  caseId: string,
): Promise<CaseClassification | null> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;
  const { data: caseRow, error } = await admin
    .from("cases")
    .select(
      "id, state, amount_cents, dispute_type, facts_narrative, intake_answers",
    )
    .eq("id", caseId)
    .maybeSingle();
  if (error || !caseRow) return null;

  const answers = (caseRow.intake_answers ?? {}) as Record<string, unknown>;
  const cached = answers.case_classification as
    | CaseClassification
    | null
    | undefined;
  if (cached && cached.primary_claim_type) {
    return cached;
  }

  // Not enough to classify: skip and let the caller fall back.
  if (!caseRow.facts_narrative || !caseRow.amount_cents) return null;

  const disputeTypeOther =
    typeof answers.dispute_type_other === "string"
      ? answers.dispute_type_other.trim() || null
      : null;

  let result: CaseClassification;
  try {
    result = await classifyClaimTypeFromInputs({
      state: caseRow.state,
      amount_cents: caseRow.amount_cents,
      dispute_type: caseRow.dispute_type,
      dispute_type_other: disputeTypeOther,
      facts_narrative: caseRow.facts_narrative,
    });
  } catch (err) {
    if (err instanceof OpenAINotConfigured) {
      console.warn(`[classify-claim-type] OPENAI_API_KEY missing; skipping classify for case ${caseId}`);
      return null;
    }
    console.error(`[classify-claim-type] LLM call failed for case ${caseId}`, err);
    return null;
  }

  // Re-read intake_answers RIGHT BEFORE writing. The `answers` we read above is
  // now seconds stale (the LLM call is slow) and other writers touch this same
  // JSON blob in that window (wizard autosave, the response route, close/reopen).
  // Merging into the freshly-read copy shrinks the clobber window from seconds
  // to milliseconds so we don't silently revert the customer's other edits.
  const { data: freshRow } = await admin
    .from("cases")
    .select("intake_answers")
    .eq("id", caseId)
    .maybeSingle();
  const freshAnswers = (freshRow?.intake_answers ?? answers) as Record<string, unknown>;
  const merged = {
    ...freshAnswers,
    case_classification: result,
  };
  const { error: updateErr } = await admin
    .from("cases")
    .update({ intake_answers: merged, updated_at: new Date().toISOString() })
    .eq("id", caseId);
  if (updateErr) {
    console.error(`[classify-claim-type] cache write failed for case ${caseId}`, updateErr);
    // Still return the result so the current request gets the answer.
  }

  return result;
}

/**
 * Returns true if any field that drives the classification has changed
 * between the existing case row and a pending update patch. Used by the
 * PATCH endpoint to invalidate the cache when facts / category move.
 */
export function classificationInputsChanged(
  existing: { dispute_type: string; facts_narrative: string | null; intake_answers: Record<string, unknown> | null },
  patch: { dispute_type?: string; facts_narrative?: string; intake_answers?: Record<string, unknown> },
): boolean {
  if (patch.dispute_type !== undefined && patch.dispute_type !== existing.dispute_type) {
    return true;
  }
  if (
    patch.facts_narrative !== undefined &&
    patch.facts_narrative !== (existing.facts_narrative ?? "")
  ) {
    return true;
  }
  if (patch.intake_answers && typeof patch.intake_answers === "object") {
    const existingAnswers = (existing.intake_answers ?? {}) as Record<string, unknown>;
    const newOther = patch.intake_answers.dispute_type_other;
    const oldOther = existingAnswers.dispute_type_other;
    if (newOther !== undefined && newOther !== oldOther) {
      return true;
    }
  }
  return false;
}

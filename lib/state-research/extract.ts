// State-level structured extraction.
//
// Runs once per state after all four call markdowns have been generated.
// Produces an EvidencePack JSON keyed to the STATE — no case context. Per-
// case fields (classification.claim_category, classification.amount_within_limit)
// are intentionally left empty so the per-case pipeline can apply them with
// the actual intake.
//
// The output column lives on state_research and is shared by:
//   - The case-research deep.extract step (reads instead of re-running LLM).
//   - The public-site StateGuide adapter (state guides + widgets).

import { MODEL, structuredJson, OpenAINotConfigured } from "../case-research/openai";
import { EVIDENCE_PACK_FULL_SCHEMA, type EvidencePack } from "../case-research/agents";
import type { StateCallId } from "./prompts";

// gpt-5-mini has a 400k context window. Largest observed state dossier is
// ~280k chars, so we leave generous headroom for the prompt scaffolding +
// reasoning tokens and never truncate the dossier in practice.
const STATE_FINDINGS_BUDGET = 350_000;

export interface StateLevelExtractionResult {
  data: EvidencePack;
  costCents: number;
  model: string;
}

// Concatenate the four call markdowns into one dossier in the order the
// state-research prompts produce them (court structure -> deadlines ->
// defendant ID/forms/fees/filing/service -> hearing through collection).
export function combineStateMarkdowns(
  stateName: string,
  parts: Partial<Record<StateCallId, string | null>>,
): string {
  const sep = "\n\n---\n\n";
  const get = (id: StateCallId) => (parts[id] ?? "").trim();
  return [
    `# State research — ${stateName}`,
    "",
    get(1) || "(call 1 markdown missing)",
    sep,
    get(2) || "(call 2 markdown missing)",
    sep,
    get(3) || "(call 3 markdown missing)",
    sep,
    get(4) || "(call 4 markdown missing)",
  ].join("\n");
}

export async function extractStateLevelPack(
  stateName: string,
  stateFindings: string,
): Promise<StateLevelExtractionResult> {
  const dossier = (stateFindings || "(no state research available)").slice(
    0,
    STATE_FINDINGS_BUDGET,
  );

  const prompt = `You are reading a procedural-research dossier for one US state's small-claims court system and extracting structured fields into an EvidencePack JSON keyed to the STATE. The dossier has four concatenated sections covering: (1) court structure / venue / scope, (2) deadlines and pre-filing, (3) defendant identification / forms / fees / filing / service, (4) hearing through collection.

There is NO specific plaintiff, defendant, county, or claim amount. Cover the state as a whole.

DO NOT invent facts. Use only what the dossier states. If a field isn't addressed, leave it as a sensible empty default (empty string, empty array, null) and add a one-line note in "unknowns".

CLASSIFICATION BLOCK — state-level only
- classification.claim_category: leave as the empty string. The per-case pipeline fills this from intake.
- classification.proper_court_type: actual division name as the state names it (e.g. "Special Civil Part – Small Claims Section" in NJ, "Justice of the Peace Court" in TX).
- classification.proper_court_type_notes: brief explanation of which division handles money small claims in this state and at what dollar bracket.
- classification.amount_within_limit: false. The per-case pipeline computes this from intake amount vs claim_limit_dollars.
- classification.amount_limit_dollars: the HIGHEST tier the state offers (e.g., NY = $10,000 because NYC's small claims cap is $10k, even though town/village courts cap at $3k). This is the "browse" headline the admin sees — the per-case pipeline picks the right tier from claim_cap_tiers based on county.
- classification.venue_rule: plain-English venue principle for this state.
- classification.statute_of_limitations.deadline: leave empty. Per-claim deadlines belong in the dossier-level fields; the classification slot is per-case.
- classification.statute_of_limitations.citation: empty.
- classification.statute_of_limitations.notes: state-wide tolling, discovery rule, partial-payment restart rules that apply across claim types.
- classification.pre_filing_requirements: empty list. The per-case pipeline fills this from claim type + state notice rules.
- classification.eligibility_concerns: state-level eligibility issues (e.g., unlicensed contractor barred, debt-buyer restrictions). Not case-specific.
- classification.jury_trial_available: whether a jury is available in this state's small-claims division.
- classification.attorneys_allowed: whether attorneys are allowed.
- classification.counterclaim_implications: what happens if a counterclaim exceeds the state's cap.
- classification.notes: anything ambiguous worth flagging at state level.

STATE DOSSIER (four sections concatenated)
${dossier}

EXTRACTION FIELDS

Court / venue
- court_name: official state-level small-claims division name
- filing_location: "(set per case)" — leave as that exact string
- claim_limit_dollars: the HIGHEST tier of cap the state offers (so admins browsing the structured pack see the headline maximum). If NY has $3k / $5k / $10k tiers, this field is 10000. Per-case lookup uses claim_cap_tiers.

Scope and gating
- excluded_claim_types, arbitration_clause_considerations, frequency_caps, claim_splitting_prohibited

Pre-filing
- demand_letter { required, recommended, minimum_days_before_filing, certified_mail_required, return_receipt_required, required_content_elements[], notes }
- government_tort_claim_notice { required_for_government_defendants, deadline_days, form_code, recipient_address, statute }

Forms and filing
- forms_required: every official form the dossier mentions. RULES:
  (a) Each entry is ONE form. If the dossier mentions a compound code like "CIV-GP-121/122/123" or "SC-100/SC-104", split it into separate entries — one per distinct form code. They can share name and purpose if the dossier groups them.
  (b) For URL, prefer the form-specific PDF link. If the dossier only gave a forms-index page that covers this form, use that as a fallback rather than leaving blank. Only leave URL blank if the dossier never mentioned any link covering this form.
  (c) Fields: code, name, url, purpose, fillable_online, completion_methods of [online_form, fillable_pdf, print_and_handwrite, guided_filing].
- filing_fee_cents: representative starting bracket (lowest tier the dossier states)
- filing_fee_notes: bracketing rules and county surcharges
- filing_methods (any of in_person, mail, drop_box, efile, fax)
- efile_portal { name, url, account_required, accepted_file_types[] }
- fee_schedule sub-fields (service_fee_cents, motion_fee_cents, jury_demand_fee_cents, check_payee): VALUE-CAPTURE RULE. If the dossier mentions a value with variance (a range like "$32-$50", county-by-county differences, or two conflicting numbers across sources), pick the most-cited or lowest-tier representative number for the structured field AND describe the variance in the filing_fee_notes string. Do NOT leave the structured field null while ALSO dumping the ambiguity into the unknowns array. Capture both the value AND the variance. The unknowns array is for things the dossier genuinely doesn't address, not for fields with ambiguous but present values.
- fee_schedule { service_fee_cents, motion_fee_cents, jury_demand_fee_cents, accepted_payment_methods[], check_payee, fee_waiver { available, eligibility_criteria, form_code, form_url } }

Service
- service_requirements (free-form notes)
- service_methods: one entry per allowed method (sheriff / certified_mail / personal_service / alternate_service / publication / private_process_server). Each: { method, allowed, cost_cents, deadline_days_before_hearing, proof_of_service_form_code, notes }

Hearing
- hearing_process
- hearing_logistics.copies_required, exhibit_format, recording_rules, hearsay_rules, default_proveup_required, plaintiff_no_show_consequence, typical_days_filing_to_hearing, continuance_rules, witness_subpoena_process, phone_video_appearance_allowed
- counterclaim_transfer_threshold

Recoverable amounts
- recoverable_amounts { costs_recoverable[], prejudgment_interest_rate_pct, post_judgment_interest_rate_pct, attorney_fees { available, conditions, statute } }

Court-annexed mediation
- court_mediation { available, when, free, process }

Accommodations
- accommodations { interpreter_request_process, interpreter_lead_time_days, available_languages[], interpreter_request_form_code, ada_request_process, ada_coordinator_name, ada_coordinator_contact, ada_request_form_code }

Appeal
- appeal_details { window_days, who_can_appeal, type ("de_novo" | "appellate" | "none"), motion_to_vacate_default_window_days }

Post-judgment
- post_judgment_steps
- collection_details { judgment_renewal_years, abstract_of_judgment_process, wage_garnishment_cap_pct, bank_levy_process, debtors_exam_process, exemptions[] (label list), exemption_details[] (structured: { category, dollar_amount_cents, statute, notes } per category, INCLUDING dollar caps where state law sets one), federal_vs_state_exemption_rule, satisfaction_required, bankruptcy_stay_effects, domestication_of_out_of_state_judgment }

Tier arrays (capture the FULL breakdown, not a single representative value)

The single-value fields above (claim_limit_dollars, filing_fee_cents, statute_of_limitations, prejudgment_interest_rate_pct) get filled with the most common / lowest-tier default. These tier arrays capture the full state breakdown so the per-case pipeline can pick the right row based on the user's county and claim type.

COMPLETENESS RULE (mandatory for every tier array below)
- Do NOT collapse, summarize, or skip rows to be concise. If the dossier covers N rows for a tier, your array MUST contain N entries.
- Include every distinct row the dossier mentions, even ones that look niche or repetitive. Per-case selection will sort them out.
- If the dossier is silent on a particular tier or row, do not invent it. But if it IS in the dossier, it MUST appear in the array.
- No output-token ceiling — there is no reason to short-emit. Long arrays are expected for states with rich procedural variation.

- statute_of_limitations_by_claim_type: structured array, one entry per row of the dossier's master SOL table from Call 2. Use these canonical claim_type labels (use the closest match): "written_contract" | "oral_contract" | "open_account" | "promissory_note" | "property_damage" | "personal_injury" | "fraud" | "wages" | "final_paycheck" | "security_deposit" | "conversion" | "defamation" | "negligence" | "breach_of_warranty" | "bad_check" | "consumer_protection" | "trespass_to_chattels" | "quasi_contract". Each entry: { claim_type, years (integer or null), citation (specific statute like "NY CPLR §213(2)"), when_clock_starts (one-line plain English: "from breach", "from discovery", etc.) }. The state's master SOL table from Call 2 typically has 15-18 distinct rows; your array should have a comparable count. If the table shows 18 claim types, emit 18 entries. Do not collapse "written_contract" and "oral_contract" into one row even if they share a deadline.

- filing_fee_tiers: structured array of the filing fee schedule. If the state has just one fee for all claim sizes, emit a single row with applies_to="statewide", amount_band="any". If the state varies by amount or court level (NY has both: NYC = $15 for ≤$1,000 and $20 for >$1,000; non-NYC city/district = $10; town/village = different), emit one row per combination. Each entry: { applies_to (court level or region label), amount_band (e.g., "any", "<= $1,000", "> $1,000"), fee_cents (integer in cents or null) }. Include every (region, band) combination the dossier mentions. Do not skip a tier because it looks redundant.

- claim_cap_tiers: structured array of the dollar cap by court level. Most states have a single statewide cap and should emit one row with court_level="statewide", applies_when="any". States with multi-court systems (NY: NYC = $10,000 NYC Small Claims; city/district outside NYC = $5,000; town/village = $3,000) emit one row per court level. Each entry: { court_level (e.g., "statewide", "NYC", "city/district", "town/village"), cap_cents (integer in cents or null), applies_when (one-line plain English: "case filed in NYC small claims part", "case filed in town court", etc.) }. If the dossier mentions N distinct court-level caps, your array must have N entries.

- prejudgment_interest_by_claim_type: structured array of pre-judgment interest rates. Most states use a single statewide rate for money judgments — if so, emit one row with claim_type="money_judgment", and the rate, type ("simple" or "compound"), citation, and notes. If the state varies the rate by claim type (e.g., contracts vs torts vs property damage), emit one row per claim type using the same canonical labels as the SOL array. Each entry: { claim_type, rate_pct (number or null), type, citation, notes }. Always emit at least one row; never leave this array empty if the dossier discusses any pre-judgment interest at all.

Practical
- defendant_collectability_signals (state-level, not case-specific)
- evidence_required_for_this_claim_type: empty list (per-case)
- state_specific_quirks: every state-specific quirk the dossier flags (15 items max from the bounded sweep)
- statutory_multipliers: structured (e.g., { statute: "NJSA 46:8-21.1", multiplier: 2, conditions: "wrongful retention of security deposit", claim_types: ["security_deposit"] })
- tax_implications { recovery_taxability, form_1099_c_consideration }

- sources: every URL the dossier cites with url, title, domain, cited_for
- unknowns: any field neither this dossier nor general state law clearly answers

Return only the JSON. The dossier is ground truth.`;

  try {
    const res = await structuredJson<EvidencePack>({
      model: MODEL.FAST,
      input: prompt,
      jsonSchema: EVIDENCE_PACK_FULL_SCHEMA,
      temperature: 0,
      // No max_output_tokens cap — let the model use its full default budget
      // so it never truncates the tier arrays (SOL has up to 18 rows, etc).
    });
    return { data: res.data, costCents: res.costCents, model: res.model };
  } catch (e) {
    if (e instanceof OpenAINotConfigured) throw e;
    throw e;
  }
}

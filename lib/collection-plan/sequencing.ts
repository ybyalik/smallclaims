// Personalized post-judgment plan generator.
//
// Takes everything we know about the case (state law, county forms / fees,
// user's intake checkboxes, defendant info from earlier wizard steps) and
// asks the LLM to produce a ranked sequence of collection methods with
// realistic cost / time / recovery estimates.
//
// The LLM has the structured CountyPack so it knows exact fees, not
// guesses. It also has the state pack so it knows the wage garnishment
// cap, the exemption schedule, judgment renewal years, etc. That lets it
// reason honestly about whether a method is worth pursuing.

import { structuredJson, MODEL } from "../case-research/openai";
import type { CountyPack, CollectionSequence, CollectionPlanIntake } from "./types";

// Subset of the state EvidencePack we feed to the sequencer. Loose typing
// because the pack shape evolves.
export interface StateContextLite {
  state: string;
  // Top-level rolled-up numbers, easy for the LLM to read.
  post_judgment_interest_rate_pct: number | null;
  wage_garnishment_cap_pct: number | null;
  judgment_renewal_years: number | null;
  // Prose / labels — passed through so the LLM can quote them.
  exemption_summary: string;
  satisfaction_required: boolean | null;
  bankruptcy_stay_effects: string;
  // Newly threaded fields from the state research pack.
  federal_vs_state_exemption_rule: string;
  domestication_of_out_of_state_judgment: string;
  defendant_collectability_signals: string[];
  state_specific_quirks: string[];
  // Post-judgment relevant statutory multipliers (rare but possible —
  // e.g. bad-faith collection penalties). Empty list when none apply.
  statutory_multipliers: Array<{
    statute: string;
    multiplier: number | null;
    conditions: string;
  }>;
  tax_implications: {
    recovery_taxability: string;
    form_1099_c_consideration: string;
  };
}

export interface DefendantContext {
  // From earlier wizard steps (score quiz + intake). Best-effort.
  kind: "business" | "individual_stable" | "individual_unknown" | "government" | null;
  name: string | null;
  // Entity type from the wizard's defendant step (single biggest collection
  // strategy variable — LLC means personal assets are off-limits without
  // veil-piercing; sole prop means they're fair game).
  entity_type: string | null;
  // For licensed-business defendants, e.g. "contractor", "real_estate_agent".
  // Drives the professional-license-suspension threat applicability.
  business_subtype: string | null;
  // If the user has these, the demand-letter step can be specific.
  email: string | null;
  phone: string | null;
  website: string | null;
  // Free-text user notes about the defendant from intake.
  notes: string | null;
}

interface SequenceInputs {
  intake: CollectionPlanIntake;
  state_context: StateContextLite;
  county_pack: CountyPack;
  defendant: DefendantContext;
}

const SEQUENCE_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    bottom_line: { type: "string" },
    warnings: { type: "array", items: { type: "string" } },
    recommended_sequence: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          step: { type: "number" },
          method: {
            type: "string",
            enum: [
              "debtor_exam",
              "wage_garnishment",
              "bank_levy",
              "abstract_of_judgment",
              "writ_of_execution",
              "demand_letter_settle",
              "stop_consult_attorney",
            ],
          },
          why: { type: "string" },
          upfront_cost_cents: { type: ["number", "null"] },
          time_to_outcome_weeks: { type: ["number", "null"] },
          expected_recovery: { type: "string" },
          recovery_probability: { type: ["number", "null"] },
          conditional_on: { type: ["string", "null"] },
          action_items: { type: "array", items: { type: "string" } },
        },
        required: [
          "step",
          "method",
          "why",
          "upfront_cost_cents",
          "time_to_outcome_weeks",
          "expected_recovery",
          "recovery_probability",
          "conditional_on",
          "action_items",
        ],
      },
    },
  },
  required: ["bottom_line", "warnings", "recommended_sequence"],
};

const SYSTEM_PROMPT = `You are a legal strategist building a post-judgment collection plan for a self-represented small-claims plaintiff. The plaintiff has (or expects to have) a money judgment and now needs to actually collect.

Your job is to rank the available methods in the order this specific plaintiff should try them, with realistic cost and time estimates, and flag obvious dead ends.

How to sequence:
- If the plaintiff knows the defendant's employer, lead with wage garnishment. It produces the most predictable monthly recovery. If county_pack.wage_garnishment.continuing_or_single_shot says "continuing", the order keeps deducting until paid; mention that.
- If the plaintiff knows the defendant owns real property, an abstract of judgment + lien is cheap insurance: it costs little to record, secures the debt if they sell or refinance, and survives the judgment renewal. Reference county_pack.abstract_of_judgment.lien_duration_years if set.
- If the plaintiff knows the defendant's bank, a bank levy is a one-shot strike. Only counts what's in the account at the moment of service unless county_pack.bank_levy.lookback_days is set (then mention the lookback). Often produces zero on a second attempt because the defendant moves money.
- If the plaintiff knows none of those, START with a debtor's examination. The point is to force the defendant to disclose assets under oath. Cite county_pack.debtor_exam.consequence_if_defendant_does_not_appear so the plaintiff knows the no-show risk to the defendant.
- For very small judgments (under $500), warn that fees and time may eat the recovery. Suggest sending a settlement demand citing post-judgment interest before spending sheriff fees. If county_pack.fee_waiver.available is true, mention the fee-waiver option which reduces upfront cost.
- If the state has a very high homestead exemption (e.g. Texas, Florida) and the only known asset is the home, lower expected recovery for an abstract of judgment lien accordingly.
- If the defendant is a government agency, stop. Output one step of method="stop_consult_attorney" explaining why government judgments need different procedures.
- DEFENDANT ENTITY TYPE matters more than almost anything else. If the defendant is an LLC or corporation, personal wages and personal bank accounts of any officer are OFF LIMITS without piercing the corporate veil (which requires its own lawsuit). The plan must target entity assets only (business bank accounts, business equipment, accounts receivable, business real property). State this clearly in the "why" of each step. If the defendant is a sole proprietor, the personal/business distinction collapses and personal assets ARE reachable. If the entity type is unknown but the case suggests it's a business, recommend an Information Subpoena question that asks for entity type explicitly.
- If county_pack.professional_license_suspension.available is true AND the defendant is in one of applicable_professions (e.g. contractor, real estate agent), add a step recommending the plaintiff threaten or pursue license suspension. This is one of the most effective leverage points when it applies. If state_context.defendant_collectability_signals or the defendant.business_subtype confirms a licensed profession, name the licensing agency explicitly.
- If county_pack.till_tap_or_keeper_levy.available is true AND the defendant is a business that handles cash (restaurant, retail, salon), add a step for till tap as a high-impact one-shot strike.

Defendant-pushback awareness:
- Whenever you recommend wage garnishment or bank levy, briefly note that the defendant has the right to file a claim of exemption (form code from county_pack.defendant_claim_of_exemption.form_code, deadline county_pack.defendant_claim_of_exemption.deadline_days_to_object). The plaintiff should expect this and not be alarmed by it.

Cost estimates:
- Use the EXACT fees from the CountyPack. Do not round or approximate.
- upfront_cost_cents is the total out-of-pocket cost to take that step (filing fee + sheriff service fee where applicable).
- recovery_probability is your honest estimate, 0–1.
- time_to_outcome_weeks: typical wall-clock from filing to result. Wage garnishment is usually 4–8 weeks from filing to first paycheck deposit; bank levy is 1–3 weeks; debtor's exam is 3–6 weeks to the appearance hearing; abstract of judgment lien is 1–2 weeks to record.

Action items per step:
- 2–4 short bullet items the plaintiff actually does. Cite the form code where the CountyPack has one.
- If the CountyPack form_code is null, say "ask the county clerk for the local writ of execution form" rather than inventing a form code.

Warnings (cross-cutting):
- Mention judgment renewal if the judgment is more than half-expired
- Mention if the defendant could file bankruptcy and what that means
- Mention if the state's exemptions effectively shield most assets
- Mention if the dollar amount is below practical recovery cost

bottom_line: one sentence the plaintiff reads first. Plain English, no jargon.`;

function buildUserPrompt(inputs: SequenceInputs): string {
  const lines: string[] = [];
  lines.push("# Plaintiff intake");
  lines.push(
    `- Judgment amount: $${(inputs.intake.judgment_amount_cents / 100).toLocaleString("en-US")}`,
  );
  lines.push(`- Knows defendant's employer: ${inputs.intake.knows_employer}`);
  lines.push(`- Knows defendant owns real property: ${inputs.intake.knows_real_property}`);
  lines.push(`- Knows defendant's bank: ${inputs.intake.knows_bank}`);
  if (inputs.intake.notes) {
    lines.push(`- Plaintiff notes: ${inputs.intake.notes}`);
  }
  lines.push("");
  lines.push("# Defendant context");
  lines.push(`- Name: ${inputs.defendant.name ?? "(unknown)"}`);
  lines.push(`- Kind (from earlier intake): ${inputs.defendant.kind ?? "(unknown)"}`);
  if (inputs.defendant.entity_type) {
    lines.push(`- Entity type: ${inputs.defendant.entity_type}`);
  }
  if (inputs.defendant.business_subtype) {
    lines.push(`- Business sub-type: ${inputs.defendant.business_subtype}`);
  }
  if (inputs.defendant.email) {
    lines.push(`- Email on file: ${inputs.defendant.email}`);
  }
  if (inputs.defendant.phone) {
    lines.push(`- Phone on file: ${inputs.defendant.phone}`);
  }
  if (inputs.defendant.website) {
    lines.push(`- Website: ${inputs.defendant.website}`);
  }
  if (inputs.defendant.notes) {
    lines.push(`- Notes from case file: ${inputs.defendant.notes}`);
  }
  lines.push("");
  lines.push("# State law context");
  lines.push(`- State: ${inputs.state_context.state}`);
  if (inputs.state_context.post_judgment_interest_rate_pct != null) {
    lines.push(
      `- Post-judgment interest rate: ${inputs.state_context.post_judgment_interest_rate_pct}% per year`,
    );
  }
  if (inputs.state_context.wage_garnishment_cap_pct != null) {
    lines.push(
      `- Wage garnishment cap: ${inputs.state_context.wage_garnishment_cap_pct}% of disposable earnings`,
    );
  }
  if (inputs.state_context.judgment_renewal_years != null) {
    lines.push(
      `- Judgment lasts ${inputs.state_context.judgment_renewal_years} years before renewal needed`,
    );
  }
  if (inputs.state_context.satisfaction_required != null) {
    lines.push(
      `- Satisfaction of judgment required after payment: ${inputs.state_context.satisfaction_required}`,
    );
  }
  if (inputs.state_context.bankruptcy_stay_effects) {
    lines.push(`- Bankruptcy stay effects: ${inputs.state_context.bankruptcy_stay_effects}`);
  }
  if (inputs.state_context.exemption_summary) {
    lines.push(`- Exemption summary: ${inputs.state_context.exemption_summary}`);
  }
  if (inputs.state_context.federal_vs_state_exemption_rule) {
    lines.push(
      `- Federal vs state exemption election: ${inputs.state_context.federal_vs_state_exemption_rule}`,
    );
  }
  if (inputs.state_context.domestication_of_out_of_state_judgment) {
    lines.push(
      `- Out-of-state judgment domestication: ${inputs.state_context.domestication_of_out_of_state_judgment}`,
    );
  }
  if (inputs.state_context.defendant_collectability_signals?.length) {
    lines.push("- Collectability signals (state-level wisdom):");
    for (const sig of inputs.state_context.defendant_collectability_signals) {
      lines.push(`  - ${sig}`);
    }
  }
  if (inputs.state_context.state_specific_quirks?.length) {
    lines.push("- State-specific quirks and gotchas:");
    for (const q of inputs.state_context.state_specific_quirks) {
      lines.push(`  - ${q}`);
    }
  }
  if (inputs.state_context.statutory_multipliers?.length) {
    lines.push("- Statutory multipliers (post-judgment relevant):");
    for (const m of inputs.state_context.statutory_multipliers) {
      lines.push(
        `  - ${m.statute}: ${m.multiplier != null ? `${m.multiplier}x` : "see statute"}, ${m.conditions}`,
      );
    }
  }
  if (
    inputs.state_context.tax_implications.recovery_taxability ||
    inputs.state_context.tax_implications.form_1099_c_consideration
  ) {
    lines.push("- Tax implications:");
    if (inputs.state_context.tax_implications.recovery_taxability) {
      lines.push(
        `  - Recovery taxability: ${inputs.state_context.tax_implications.recovery_taxability}`,
      );
    }
    if (inputs.state_context.tax_implications.form_1099_c_consideration) {
      lines.push(
        `  - 1099-C if uncollectible debt forgiven: ${inputs.state_context.tax_implications.form_1099_c_consideration}`,
      );
    }
  }
  lines.push("");
  lines.push("# County paperwork (exact forms and fees for this county)");
  lines.push("```json");
  lines.push(JSON.stringify(inputs.county_pack, null, 2));
  lines.push("```");
  lines.push("");
  lines.push("Produce a CollectionSequence JSON per the schema.");
  return lines.join("\n");
}

export async function buildCollectionSequence(
  inputs: SequenceInputs,
): Promise<{ sequence: CollectionSequence; costCents: number; model: string }> {
  const res = await structuredJson<CollectionSequence>({
    model: MODEL.REASONING,
    systemPrompt: SYSTEM_PROMPT,
    input: buildUserPrompt(inputs),
    jsonSchema: SEQUENCE_SCHEMA,
    // No maxOutputTokens cap. gpt-5 is a reasoning model that spends tokens
    // on internal thinking before output; a tight cap was producing empty
    // responses. Default model limit (~64k) is plenty.
  });
  return {
    sequence: res.data,
    costCents: res.costCents,
    model: res.model,
  };
}

// Types for the Post-Judgment Collection Plan product.
//
// Three structured artifacts produced during generation:
//   1. CountyPack         — county-specific forms / fees fetched at purchase
//   2. CollectionSequence — LLM-ranked plan tailored to this user
//   3. CollectionPlan     — final report (county pack + sequence + prose)

/** What the user tells us at the buy step. */
export interface CollectionPlanIntake {
  // Re-confirmed at purchase. May differ from case.amount_cents if the
  // judgment came in different.
  judgment_amount_cents: number;
  // Three checkboxes that drive the sequencing logic.
  knows_employer: boolean;
  knows_real_property: boolean;
  knows_bank: boolean;
  // Free-text any extra context the user wants to share about the defendant.
  notes: string | null;
}

/** County-specific post-judgment paperwork pulled from the sheriff's office,
 *  the county clerk, and the county recorder. Filled by county-research.ts. */
export interface CountyPack {
  county: string;
  state: string;
  // Core enforcement methods. Each method's notes field can be long-form
  // prose with procedural detail captured from the source pages.
  writ_of_execution: {
    form_code: string | null;
    form_url: string | null;
    filing_fee_cents: number | null;
    who_files: string;
    notes: string;
  };
  wage_garnishment: {
    form_code: string | null;
    form_url: string | null;
    filing_fee_cents: number | null;
    sheriff_service_fee_cents: number | null;
    continuing_or_single_shot: string;
    notes: string;
  };
  bank_levy: {
    form_code: string | null;
    form_url: string | null;
    filing_fee_cents: number | null;
    sheriff_service_fee_cents: number | null;
    lookback_days: number | null;
    notes: string;
  };
  debtor_exam: {
    form_code: string | null;
    form_url: string | null;
    filing_fee_cents: number | null;
    service_method: string;
    consequence_if_defendant_does_not_appear: string;
    notes: string;
  };
  abstract_of_judgment: {
    recording_fee_cents: number | null;
    recorder_office: string;
    recorder_url: string | null;
    lien_duration_years: number | null;
    notes: string;
  };
  // Officer who serves writs / conducts levies. Most states use "Sheriff";
  // a few (e.g. Arizona, parts of Texas) use "Constable" instead.
  sheriff: {
    name: string;
    phone: string | null;
    address: string | null;
    hours: string | null;
    levying_officer_role: string;
  };
  // Income-based fee reduction the plaintiff can request to skip filing fees.
  fee_waiver: {
    available: boolean | null;
    form_code: string | null;
    form_url: string | null;
    eligibility_notes: string;
  };
  // The defendant's mechanism to challenge a levy or garnishment.
  defendant_claim_of_exemption: {
    form_code: string | null;
    form_url: string | null;
    deadline_days_to_object: number | null;
    notes: string;
  };
  // The form the plaintiff files when the defendant pays in full.
  satisfaction_of_judgment: {
    form_code: string | null;
    form_url: string | null;
    deadline_days_after_payment: number | null;
    penalty_for_late_filing: string;
    notes: string;
  };
  // CA-style aggressive levies for business defendants. Available in some
  // states only; capture even if rarely applicable.
  till_tap_or_keeper_levy: {
    available: boolean | null;
    applicable_to: string;
    fee_cents: number | null;
    notes: string;
  };
  // CA can suspend a contractor's, real estate agent's, etc., professional
  // license to force payment. Powerful when the defendant is licensed.
  professional_license_suspension: {
    available: boolean | null;
    applicable_professions: string[];
    agency: string;
    notes: string;
  };
  // The staffed office that walks self-represented plaintiffs through
  // forms. Often the single most useful contact for a confused user.
  self_help_center: {
    name: string;
    phone: string | null;
    url: string | null;
    address: string | null;
    hours: string | null;
    languages_available: string[];
    notes: string;
  };
  // Source URLs the extraction was grounded in, so a human can spot-check.
  sources: string[];
}

export type CollectionMethod =
  | "debtor_exam"
  | "wage_garnishment"
  | "bank_levy"
  | "abstract_of_judgment"
  | "writ_of_execution"
  | "demand_letter_settle"
  | "stop_consult_attorney";

/** One step in the recommended sequence. */
export interface PlanStep {
  step: number;
  method: CollectionMethod;
  why: string;
  upfront_cost_cents: number | null;
  time_to_outcome_weeks: number | null;
  // Either an estimated dollar recovery OR a probabilistic narrative.
  expected_recovery: string;
  recovery_probability: number | null; // 0–1
  conditional_on: string | null;
  // What forms / actions the user needs to take for this step.
  action_items: string[];
}

export interface CollectionSequence {
  recommended_sequence: PlanStep[];
  // Cross-cutting warnings the LLM surfaces (e.g. "Your state has a very
  // high homestead exemption — real-property lien may be worthless.").
  warnings: string[];
  // One-line summary used as the report's lede.
  bottom_line: string;
}

/** Final stored artifact. The collection_plans row holds this plus the
 *  rendered prose. */
export interface CollectionPlanArtifact {
  intake: CollectionPlanIntake;
  county_pack: CountyPack | null;
  sequence: CollectionSequence | null;
  body_md: string | null;
  status:
    | "pending"
    | "county_researching"
    | "sequencing"
    | "generating_report"
    | "ready"
    | "failed";
  error_message: string | null;
}

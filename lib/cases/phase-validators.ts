// Single source of truth for "what's required in each wizard phase."
//
// The wizard has three consumers that need to agree on this:
//   1. Each step component's validate() — gates the "Continue" button
//   2. WizardShell.isPhaseComplete() — gates the stepper unlock + check mark
//   3. validateCaseForFinish() — gates the final sign-and-submit action
//
// Each phase exports two functions:
//   validateXPhase(input)     — for step components, takes client form state
//   validateXFromCase(c)      — for the wizard shell + finish gate, takes a
//                               server Case row and builds the input internally
//
// Both return a PhaseErrors map (Record<string, string>). An empty object
// means the phase is complete. The error keys match what the step component's
// form uses so the per-field error display works without a translation layer.

import type { Case, PostalAddress } from "../supabase/types";

export type PhaseErrors = Record<string, string>;

export function isComplete(errors: PhaseErrors): boolean {
  return Object.keys(errors).length === 0;
}

// ────────────────────────────────────────────────────────────────────────────
// Prescreen phase (category + amount + state + eligibility, pre-Phase-1)
// ────────────────────────────────────────────────────────────────────────────

interface PrescreenInput {
  dispute_type: string | null | undefined;
  dispute_type_other: string | null | undefined;
  amount_cents: number | null | undefined;
  state: string | null | undefined;
  eligibility_passed: boolean;
}

export function validatePrescreenPhase(input: PrescreenInput): PhaseErrors {
  const errs: PhaseErrors = {};
  if (!input.dispute_type) {
    errs.dispute_type = "Pick a dispute category.";
  } else if (input.dispute_type === "other") {
    const t = (input.dispute_type_other ?? "").trim();
    if (t.length < 8) {
      errs.dispute_type = "Describe your dispute in a sentence or two.";
    }
  }
  if (!input.amount_cents || input.amount_cents <= 0) {
    errs.amount_cents = "Enter the amount in dispute.";
  }
  if (!input.state) errs.state = "Pick the state the dispute is in.";
  if (!input.eligibility_passed) {
    errs.eligibility = "Complete the eligibility check.";
  }
  return errs;
}

export function validatePrescreenFromCase(c: Case): PhaseErrors {
  const a = (c.intake_answers ?? {}) as Record<string, unknown>;
  return validatePrescreenPhase({
    dispute_type: c.dispute_type,
    dispute_type_other: (a.dispute_type_other as string) ?? null,
    amount_cents: c.amount_cents,
    state: c.state,
    eligibility_passed: !!a.eligibility_passed,
  });
}

// ────────────────────────────────────────────────────────────────────────────
// Eligibility phase (Phase 1 of the new flow). Absorbs the three yes/no
// checks plus the principal amount + state, so we can run the small-claims
// cap check before the user invests time in the rest of the wizard.
// ────────────────────────────────────────────────────────────────────────────

interface EligibilityInput {
  amount_cents: number | null | undefined;
  state: string | null | undefined;
  eligibility_passed: boolean;
}

export function validateEligibilityPhase(input: EligibilityInput): PhaseErrors {
  const errs: PhaseErrors = {};
  if (!input.amount_cents || input.amount_cents <= 0) {
    errs.amount = "Enter the amount you're claiming.";
  }
  if (!input.state) {
    errs.state = "Pick the state where the other party is located.";
  }
  if (!input.eligibility_passed) {
    errs.eligibility = "Confirm all three eligibility checks.";
  }
  return errs;
}

export function validateEligibilityFromCase(c: Case): PhaseErrors {
  const a = (c.intake_answers ?? {}) as Record<string, unknown>;
  return validateEligibilityPhase({
    amount_cents: c.amount_cents,
    state: c.state || ((a.recipient_state as string | undefined) ?? null),
    eligibility_passed: !!a.eligibility_passed,
  });
}

// ────────────────────────────────────────────────────────────────────────────
// Category phase (Phase 2). Just the dispute-type pick plus the free-text
// description when "other" is chosen.
// ────────────────────────────────────────────────────────────────────────────

interface CategoryInput {
  dispute_type: string | null | undefined;
  dispute_type_other: string | null | undefined;
}

export function validateCategoryPhase(input: CategoryInput): PhaseErrors {
  const errs: PhaseErrors = {};
  if (!input.dispute_type) {
    errs.dispute_type = "Pick the category that fits your dispute best.";
  } else if (input.dispute_type === "other") {
    const t = (input.dispute_type_other ?? "").trim();
    if (t.length < 8) {
      errs.dispute_type = "Describe your dispute in a sentence or two.";
    }
  }
  return errs;
}

export function validateCategoryFromCase(c: Case): PhaseErrors {
  const a = (c.intake_answers ?? {}) as Record<string, unknown>;
  return validateCategoryPhase({
    dispute_type: c.dispute_type,
    dispute_type_other: (a.dispute_type_other as string) ?? null,
  });
}

// ────────────────────────────────────────────────────────────────────────────
// Defendant phase
// ────────────────────────────────────────────────────────────────────────────

type DefendantEntity = "individual" | "business";

interface DefendantInput {
  entity: DefendantEntity;
  first?: string;
  last?: string;
  bizName?: string;
  bizCity?: string;
  skipTrace: boolean;
  line1?: string;
  city?: string;
  stateAbbr?: string;
  zip?: string;
  county?: string;
}

export function validateDefendantPhase(input: DefendantInput): PhaseErrors {
  const errs: PhaseErrors = {};
  if (input.entity === "individual") {
    if (!input.first?.trim()) errs.first = "First name is required.";
    if (!input.last?.trim()) errs.last = "Last name is required.";
  } else {
    if (!input.bizName?.trim()) errs.bizName = "Business name is required.";
  }
  if (!input.skipTrace) {
    if (!input.line1?.trim()) {
      errs.line1 = "Street address is required (or use skip-trace).";
    }
    if (!input.city?.trim()) errs.city = "City is required.";
    if (!input.stateAbbr) errs.stateAbbr = "State is required.";
    if (!input.zip || !/^\d{5}(-\d{4})?$/.test(input.zip.trim())) {
      errs.zip = "Valid ZIP is required.";
    }
    if (!input.county?.trim()) {
      errs.county =
        "County is required (auto-fills from the address, or type it manually).";
    }
  }
  return errs;
}

export function validateDefendantFromCase(c: Case): PhaseErrors {
  const a = (c.intake_answers ?? {}) as Record<string, unknown>;
  const entity =
    (a.defendant_entity_type as DefendantEntity | undefined) === "business"
      ? "business"
      : "individual";
  const addr = c.defendant_address as PostalAddress | null | undefined;
  const name = (c.defendant_name ?? "").trim();
  // Reverse-engineer first/last from the stored full name. Lossy for last
  // names with spaces but good enough for completeness checking.
  const parts = name.split(/\s+/).filter(Boolean);
  const first = entity === "individual" ? parts[0] : undefined;
  const last = entity === "individual" ? parts.slice(1).join(" ") || undefined : undefined;
  const bizName = entity === "business" ? name || undefined : undefined;
  return validateDefendantPhase({
    entity,
    first,
    last,
    bizName,
    bizCity: (a.defendant_business_city as string) ?? undefined,
    skipTrace: !!a.defendant_skip_trace_needed,
    line1: addr?.line1 ?? undefined,
    city: addr?.city ?? undefined,
    stateAbbr: addr?.state ?? undefined,
    zip: addr?.zip ?? undefined,
    county:
      ((c as { defendant_county?: string | null }).defendant_county ?? undefined) ||
      undefined,
  });
}

// ────────────────────────────────────────────────────────────────────────────
// Plaintiff phase
// ────────────────────────────────────────────────────────────────────────────

type PlaintiffEntity = "individual" | "business";

interface PlaintiffInput {
  entity: PlaintiffEntity;
  firstName?: string;
  lastName?: string;
  bizName?: string;
  email?: string;
  phone?: string;
  line1?: string;
  city?: string;
  stateAbbr?: string;
  zip?: string;
  county?: string;
}

export function validatePlaintiffPhase(input: PlaintiffInput): PhaseErrors {
  const errs: PhaseErrors = {};
  if (input.entity === "individual") {
    if (!input.firstName?.trim()) errs.firstName = "First name is required.";
    if (!input.lastName?.trim()) errs.lastName = "Last name is required.";
  } else {
    if (!input.bizName?.trim()) errs.bizName = "Business name is required.";
  }
  if (!input.email?.trim() || !/.+@.+\..+/.test(input.email.trim())) {
    errs.email = "A valid email is required.";
  }
  if (!input.phone?.trim()) errs.phone = "Phone is required.";
  if (!input.line1?.trim()) errs.line1 = "Street address is required.";
  if (!input.city?.trim()) errs.city = "City is required.";
  if (!input.stateAbbr) errs.stateAbbr = "State is required.";
  if (!input.zip || !/^\d{5}(-\d{4})?$/.test(input.zip.trim())) {
    errs.zip = "Valid ZIP is required.";
  }
  if (!input.county?.trim()) {
    errs.county =
      "County is required (auto-fills from the address, or type it manually).";
  }
  return errs;
}

export function validatePlaintiffFromCase(c: Case): PhaseErrors {
  const a = (c.intake_answers ?? {}) as Record<string, unknown>;
  const entity =
    (a.plaintiff_entity_type as PlaintiffEntity | undefined) === "business"
      ? "business"
      : "individual";
  const addr = c.plaintiff_address as PostalAddress | null | undefined;
  const name = (c.plaintiff_name ?? "").trim();
  const parts = name.split(/\s+/).filter(Boolean);
  const firstName = entity === "individual" ? parts[0] : undefined;
  const lastName =
    entity === "individual" ? parts.slice(1).join(" ") || undefined : undefined;
  const bizName = entity === "business" ? name || undefined : undefined;
  return validatePlaintiffPhase({
    entity,
    firstName,
    lastName,
    bizName,
    email: c.plaintiff_email ?? undefined,
    phone: c.plaintiff_phone ?? undefined,
    line1: addr?.line1 ?? undefined,
    city: addr?.city ?? undefined,
    stateAbbr: addr?.state ?? undefined,
    zip: addr?.zip ?? undefined,
    county:
      ((c as { plaintiff_county?: string | null }).plaintiff_county ?? undefined) ||
      undefined,
  });
}

// ────────────────────────────────────────────────────────────────────────────
// Narrative phase
// ────────────────────────────────────────────────────────────────────────────

interface NarrativeInput {
  narrative?: string;
  disputeType?: string;
  incidentDate?: string;
  incidentLocation?: string;
  incidentCounty?: string;
}

// Narrative requires 30+ chars (matches the final sign gate, not the older
// 10-char floor — the wizard should never let a user proceed if the case
// can't ultimately be finished).
const NARRATIVE_MIN_CHARS = 30;

export function validateNarrativePhase(input: NarrativeInput): PhaseErrors {
  const errs: PhaseErrors = {};
  if (!input.narrative || input.narrative.trim().length < NARRATIVE_MIN_CHARS) {
    errs.narrative = `Describe what happened (at least ${NARRATIVE_MIN_CHARS} characters).`;
  }
  if (!input.disputeType) errs.disputeType = "Select a claim type.";
  if (!input.incidentDate) errs.incidentDate = "Enter the date of the incident.";
  if (!input.incidentLocation?.trim()) {
    errs.incidentLocation = "Enter the city and state of the incident.";
  }
  if (!input.incidentCounty?.trim()) {
    errs.incidentCounty =
      "Incident county is required (auto-fills from the city/state, or type it manually).";
  }
  return errs;
}

export function validateNarrativeFromCase(c: Case): PhaseErrors {
  const a = (c.intake_answers ?? {}) as Record<string, unknown>;
  return validateNarrativePhase({
    narrative: c.facts_narrative ?? undefined,
    disputeType: c.dispute_type ?? undefined,
    incidentDate: (a.incident_date as string) ?? undefined,
    incidentLocation: (a.incident_location as string) ?? undefined,
    incidentCounty:
      ((c as { incident_county?: string | null }).incident_county ?? undefined) ||
      undefined,
  });
}

// ────────────────────────────────────────────────────────────────────────────
// Claim-amount phase
// ────────────────────────────────────────────────────────────────────────────

type CapChoice = "waive" | "civil_court" | null;

interface ClaimAmountInput {
  // amount in dollars (not cents). Step component holds dollars in state.
  amount: number;
  calculation?: string;
  overCap: boolean;
  capChoice: CapChoice;
  stateName?: string | null;
}

export function validateClaimAmountPhase(input: ClaimAmountInput): PhaseErrors {
  const errs: PhaseErrors = {};
  if (input.amount < 50) {
    errs.amount = "Enter the amount you're demanding (minimum $50).";
  }
  if (!input.calculation?.trim()) {
    errs.calculation = "Briefly explain how you calculated the amount.";
  }
  if (input.overCap && input.capChoice === null) {
    errs.capChoice = `Your demand exceeds ${
      input.stateName ?? "your state"
    }'s small-claims cap. Pick how to proceed below.`;
  }
  return errs;
}

export function validateClaimAmountFromCase(c: Case): PhaseErrors {
  const a = (c.intake_answers ?? {}) as Record<string, unknown>;
  // We don't know overCap server-side without state cap data; treat as
  // false (the more permissive case). The capChoice still gets validated
  // at the step level when the user is actively choosing.
  return validateClaimAmountPhase({
    amount: (c.amount_cents ?? 0) / 100,
    calculation: (a.amount_calculation as string) ?? undefined,
    overCap: false,
    capChoice: null,
    stateName: null,
  });
}

// ────────────────────────────────────────────────────────────────────────────
// Evidence phase
// ────────────────────────────────────────────────────────────────────────────

interface EvidenceInput {
  files: Array<{ filename?: string }>;
  skipped: boolean | undefined; // explicit user choice
}

export function validateEvidencePhase(input: EvidenceInput): PhaseErrors {
  const errs: PhaseErrors = {};
  const hasFiles = input.files.length > 0;
  const explicitlySkipped = input.skipped !== undefined;
  if (!hasFiles && !explicitlySkipped) {
    errs.evidence =
      "Add at least one piece of evidence, or check the 'continue without evidence' option.";
  }
  return errs;
}

export function validateEvidenceFromCase(c: Case): PhaseErrors {
  const a = (c.intake_answers ?? {}) as Record<string, unknown>;
  const files = Array.isArray(a.evidence_files)
    ? (a.evidence_files as Array<{ filename?: string }>)
    : [];
  const skipped =
    a.evidence_skipped === undefined ? undefined : !!a.evidence_skipped;
  return validateEvidencePhase({ files, skipped });
}

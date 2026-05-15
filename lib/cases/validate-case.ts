// Final validation gate for "finish and sign". A user can navigate through
// the wizard freely (autosaves write whatever they typed), but they cannot
// commit the case to active status unless every required field is present.
//
// Used in two places that must agree:
//   1. ReviewStep client component — shows the missing-fields list before
//      the user tries to submit.
//   2. /api/cases/[id]/finish-intake — refuses to write status=active
//      if anything is missing (defense in depth, so a bypassed client check
//      can't leave a half-filled case in a "complete" state).
//
// This file composes the shared phase validators in phase-validators.ts.
// One source of truth across the entire wizard.

import type { Case } from "../supabase/types";
import {
  validatePrescreenFromCase,
  validateDefendantFromCase,
  validatePlaintiffFromCase,
  validateNarrativeFromCase,
  validateClaimAmountFromCase,
  validateEvidenceFromCase,
  type PhaseErrors,
} from "./phase-validators";

export interface CaseValidationIssue {
  field: string;
  message: string;
  step: string; // wizard step slug the user should go to
}

// Phase key → which wizard step to navigate to for the user. Used when
// turning a PhaseErrors map into CaseValidationIssue rows.
const PHASE_TO_STEP: Record<string, string> = {
  prescreen: "category",
  defendant: "defendant",
  plaintiff: "plaintiff",
  narrative: "narrative",
  "claim-amount": "claim-amount",
  evidence: "evidence",
};

// Within the prescreen phase, error keys map to specific substeps so the
// user is dropped exactly where the missing field lives.
const PRESCREEN_FIELD_TO_STEP: Record<string, string> = {
  dispute_type: "category",
  amount_cents: "amount",
  state: "state",
  eligibility: "eligibility",
};

function appendIssues(
  issues: CaseValidationIssue[],
  errors: PhaseErrors,
  phaseKey: string,
): void {
  const defaultStep = PHASE_TO_STEP[phaseKey] ?? phaseKey;
  for (const [field, message] of Object.entries(errors)) {
    const step =
      phaseKey === "prescreen"
        ? PRESCREEN_FIELD_TO_STEP[field] ?? defaultStep
        : defaultStep;
    issues.push({ field, message, step });
  }
}

export function validateCaseForFinish(c: Case): CaseValidationIssue[] {
  const issues: CaseValidationIssue[] = [];
  appendIssues(issues, validatePrescreenFromCase(c), "prescreen");
  appendIssues(issues, validateDefendantFromCase(c), "defendant");
  appendIssues(issues, validatePlaintiffFromCase(c), "plaintiff");
  appendIssues(issues, validateNarrativeFromCase(c), "narrative");
  appendIssues(issues, validateClaimAmountFromCase(c), "claim-amount");
  appendIssues(issues, validateEvidenceFromCase(c), "evidence");
  return issues;
}

// Builds the CollectionPlanIntake from the customer's live intake answers.
//
// IMPORTANT: the plan must reflect the answers the customer actually gave to
// the three collection questions (do you know their employer / real estate /
// bank). Those live under `collection_knows_*` in cases.intake_answers and are
// saved as the customer answers them. Deriving the intake here at GENERATION
// time (not at page-load / payment-intent time) guarantees the plan is built
// from the final answers, not a stale snapshot captured before the customer
// answered anything.

import type { CollectionPlanIntake } from "./types";

export function buildCollectionPlanIntake(
  intakeAnswers: Record<string, unknown> | null | undefined,
  judgmentCents: number,
): CollectionPlanIntake {
  const a = (intakeAnswers ?? {}) as Record<string, unknown>;
  const notes =
    typeof a.collection_plan_notes === "string"
      ? a.collection_plan_notes.trim().slice(0, 600) || null
      : null;
  return {
    judgment_amount_cents: judgmentCents,
    knows_employer: a.collection_knows_employer === "yes",
    knows_real_property: a.collection_knows_real_property === "yes",
    knows_bank: a.collection_knows_bank === "yes",
    notes,
  };
}

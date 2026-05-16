import { redirect, notFound } from "next/navigation";
import { loadOwnedCase } from "../../../../../lib/demand-letter/access";

export const dynamic = "force-dynamic";

interface Props {
  params: { id: string };
}

/**
 * Wizard root: routes to the right step based on what the case has filled in.
 *
 * For a `draft` case (still being built), we walk every required field in
 * order and drop the user on the first one that's missing — handy because
 * they're trying to make progress.
 *
 * For an `intake_complete` case (already finalized via "Finish & Sign"),
 * we land on the review step. That's the recap-of-everything view the user
 * actually wants when they click "Edit case details", and the stepper at
 * the top lets them jump to any specific step they want to change.
 */
export default async function WizardRoot({ params }: Props) {
  const c = await loadOwnedCase(params.id);
  if (!c) notFound();

  // Finalized cases land on review (full recap + free navigation via stepper).
  if (c.status === "intake_complete") {
    redirect(`/case/${c.id}/build/review`);
  }

  const answers = (c.intake_answers ?? {}) as Record<string, unknown>;

  // Draft cases: walk the new phase order, landing on the first phase
  // whose required fields aren't filled yet.

  // Phase 1: Eligibility — principal amount, state, three yes/no gates.
  if (
    !c.amount_cents ||
    c.amount_cents <= 0 ||
    !c.state ||
    !answers.eligibility_passed
  ) {
    redirect(`/case/${c.id}/build/eligibility`);
  }

  // Phase 2: Category — dispute type (plus free-text for "other").
  if (
    !c.dispute_type ||
    (c.dispute_type === "other" &&
      typeof answers.dispute_type_other !== "string")
  ) {
    redirect(`/case/${c.id}/build/category`);
  }

  // Phase 3+: main intake.
  if (!c.defendant_name) redirect(`/case/${c.id}/build/defendant`);
  if (!c.plaintiff_name) redirect(`/case/${c.id}/build/plaintiff`);
  if (!c.facts_narrative || !answers.incident_date) {
    redirect(`/case/${c.id}/build/narrative`);
  }
  if (!answers.amount_calculation) {
    redirect(`/case/${c.id}/build/claim-amount`);
  }
  if (answers.evidence_skipped === undefined && !((answers.evidence_files as unknown[])?.length)) {
    redirect(`/case/${c.id}/build/evidence`);
  }
  redirect(`/case/${c.id}/build/review`);
}

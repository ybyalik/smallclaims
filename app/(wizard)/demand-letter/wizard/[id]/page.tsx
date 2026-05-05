import { redirect, notFound } from "next/navigation";
import { loadOwnedCase } from "../../../../../lib/demand-letter/access";

export const dynamic = "force-dynamic";

interface Props {
  params: { id: string };
}

/**
 * Wizard root: routes to the right step based on what the case has filled in.
 * Phase 0 prescreen always runs first (5 steps), then Phase 1-5 (full wizard).
 */
export default async function WizardRoot({ params }: Props) {
  const c = await loadOwnedCase(params.id);
  if (!c) notFound();

  const answers = (c.intake_answers ?? {}) as Record<string, unknown>;

  // Pre-screen state: walk the funnel until we hit an unfilled step
  if (!c.dispute_type || c.dispute_type === "other") {
    redirect(`/demand-letter/wizard/${c.id}/category`);
  }
  if (!c.amount_cents || c.amount_cents <= 0) {
    redirect(`/demand-letter/wizard/${c.id}/amount`);
  }
  if (!answers.recipient_state) {
    redirect(`/demand-letter/wizard/${c.id}/state`);
  }
  if (!answers.eligibility_passed) {
    redirect(`/demand-letter/wizard/${c.id}/eligibility`);
  }
  if (!answers.recovery_seen) {
    redirect(`/demand-letter/wizard/${c.id}/recovery`);
  }

  // Pre-screen complete: fall into the main wizard
  if (!c.defendant_name) redirect(`/demand-letter/wizard/${c.id}/defendant`);
  if (!c.plaintiff_name) redirect(`/demand-letter/wizard/${c.id}/plaintiff`);
  if (!c.facts_narrative || !answers.incident_date) {
    redirect(`/demand-letter/wizard/${c.id}/narrative`);
  }
  // Claim-amount step: requires the user to have set the demand amount
  // and (optionally) added line-items / calculation rationale.
  if (!answers.amount_calculation) {
    redirect(`/demand-letter/wizard/${c.id}/claim-amount`);
  }
  if (answers.evidence_skipped === undefined && !((answers.evidence_files as unknown[])?.length)) {
    redirect(`/demand-letter/wizard/${c.id}/evidence`);
  }
  redirect(`/demand-letter/wizard/${c.id}/review`);
}

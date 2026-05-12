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
    redirect(`/case/${c.id}/build/category`);
  }
  if (!c.amount_cents || c.amount_cents <= 0) {
    redirect(`/case/${c.id}/build/amount`);
  }
  if (!answers.recipient_state) {
    redirect(`/case/${c.id}/build/state`);
  }
  if (!answers.eligibility_passed) {
    redirect(`/case/${c.id}/build/eligibility`);
  }
  if (!answers.recovery_seen) {
    redirect(`/case/${c.id}/build/recovery`);
  }

  // Pre-screen complete: fall into the main wizard
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

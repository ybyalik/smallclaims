import { notFound } from "next/navigation";
import { loadOwnedCase } from "../../../../../../lib/demand-letter/access";
import NarrativeStep from "./NarrativeStep";

export const dynamic = "force-dynamic";

interface Props {
  params: { id: string };
}

export default async function NarrativePage({ params }: Props) {
  const c = await loadOwnedCase(params.id);
  if (!c) notFound();
  return (
    <NarrativeStep
      caseId={c.id}
      initialNarrative={c.facts_narrative ?? ""}
      initialDisputeType={c.dispute_type}
      initialAnswers={(c.intake_answers as Record<string, unknown> | null) ?? {}}
    />
  );
}

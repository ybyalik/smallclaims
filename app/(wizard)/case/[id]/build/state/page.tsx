import { notFound } from "next/navigation";
import { loadOwnedCase } from "../../../../../../lib/demand-letter/access";
import { listStates } from "../../../../../../lib/demand-letter/state-context";
import StateStep from "./StateStep";

export const dynamic = "force-dynamic";

interface Props {
  params: { id: string };
}

export default async function StatePage({ params }: Props) {
  const c = await loadOwnedCase(params.id);
  if (!c) notFound();
  const states = listStates();
  const initial =
    (c.intake_answers as Record<string, unknown> | null)?.recipient_state as string | undefined;
  return <StateStep caseId={c.id} initialAbbr={initial ?? ""} states={states} />;
}

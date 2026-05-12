import { notFound } from "next/navigation";
import { loadOwnedCase } from "../../../../../../lib/demand-letter/access";
import DefendantStep from "./DefendantStep";

export const dynamic = "force-dynamic";

interface Props {
  params: { id: string };
}

export default async function DefendantPage({ params }: Props) {
  const c = await loadOwnedCase(params.id);
  if (!c) notFound();
  return (
    <DefendantStep
      caseId={c.id}
      initialName={c.defendant_name ?? ""}
      initialEmail={c.defendant_email ?? ""}
      initialPhone={c.defendant_phone ?? ""}
      initialAddress={c.defendant_address ?? null}
      initialCounty={(c as { defendant_county?: string | null }).defendant_county ?? ""}
      initialAnswers={(c.intake_answers as Record<string, unknown> | null) ?? {}}
    />
  );
}

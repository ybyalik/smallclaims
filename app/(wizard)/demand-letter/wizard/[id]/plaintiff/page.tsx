import { notFound } from "next/navigation";
import { loadOwnedCase } from "../../../../../../lib/demand-letter/access";
import PlaintiffStep from "./PlaintiffStep";

export const dynamic = "force-dynamic";

interface Props {
  params: { id: string };
}

export default async function PlaintiffPage({ params }: Props) {
  const c = await loadOwnedCase(params.id);
  if (!c) notFound();
  return (
    <PlaintiffStep
      caseId={c.id}
      initialName={c.plaintiff_name ?? ""}
      initialEmail={c.plaintiff_email ?? ""}
      initialPhone={c.plaintiff_phone ?? ""}
      initialAddress={c.plaintiff_address ?? null}
      initialCounty={(c as { plaintiff_county?: string | null }).plaintiff_county ?? ""}
      initialAnswers={(c.intake_answers as Record<string, unknown> | null) ?? {}}
    />
  );
}

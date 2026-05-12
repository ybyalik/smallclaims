import { notFound } from "next/navigation";
import { loadOwnedCase } from "../../../../../../lib/demand-letter/access";
import { getCategory } from "../../../../../../lib/demand-letter/categories";
import EvidenceStep from "./EvidenceStep";

export const dynamic = "force-dynamic";

interface Props {
  params: { id: string };
}

export default async function EvidencePage({ params }: Props) {
  const c = await loadOwnedCase(params.id);
  if (!c) notFound();
  const category = getCategory(c.dispute_type);
  const answers = (c.intake_answers as Record<string, unknown> | null) ?? {};
  const evidence = (answers.evidence_files as EvidenceFileMeta[]) || [];
  return (
    <EvidenceStep
      caseId={c.id}
      categoryLabel={category?.label ?? "general"}
      initialFiles={evidence}
    />
  );
}

export interface EvidenceFileMeta {
  filename: string;
  size: number;
  mime: string;
  kind: string;
  description?: string;
  uploadedAt: string;
}

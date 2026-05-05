import { notFound } from "next/navigation";
import { loadOwnedCase } from "../../../../../../lib/demand-letter/access";
import { createClient } from "../../../../../../lib/supabase/server";
import { generateLetter } from "../../../../../../lib/demand-letter/generator";
import ReviewStep from "./ReviewStep";

export const dynamic = "force-dynamic";

interface Props {
  params: { id: string };
}

export default async function ReviewPage({ params }: Props) {
  const c = await loadOwnedCase(params.id);
  if (!c) notFound();

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const letter = generateLetter(c);
  const answers = (c.intake_answers as Record<string, unknown> | null) ?? {};
  const skipTraceNeeded = !!answers.defendant_skip_trace_needed;

  return (
    <ReviewStep
      caseId={c.id}
      isAuthenticated={!!user}
      defendantName={c.defendant_name ?? ""}
      defendantAddressDisplay={
        skipTraceNeeded
          ? "Skip-trace required"
          : formatAddressLine(c.defendant_address)
      }
      letterBody={letter.body}
      totalDemandCents={letter.totalDemandCents}
      skipTraceNeeded={skipTraceNeeded}
      preselectedAddons={(answers.preselected_addons as string[]) || []}
    />
  );
}

function formatAddressLine(addr: { line1?: string; city?: string; state?: string; zip?: string } | null): string {
  if (!addr) return "Address not yet provided";
  return [addr.line1, [addr.city, addr.state, addr.zip].filter(Boolean).join(", ")]
    .filter(Boolean)
    .join(" · ");
}

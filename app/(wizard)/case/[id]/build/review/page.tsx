import { notFound } from "next/navigation";
import { loadOwnedCase } from "../../../../../../lib/demand-letter/access";
import { createClient } from "../../../../../../lib/supabase/server";
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

  return (
    <ReviewStep
      caseId={c.id}
      isAuthenticated={!!user}
      state={c.state}
      county={c.county}
      disputeType={c.dispute_type}
      amountCents={c.amount_cents}
      plaintiff={{
        name: c.plaintiff_name,
        address: c.plaintiff_address,
        email: c.plaintiff_email,
        phone: c.plaintiff_phone,
      }}
      defendant={{
        name: c.defendant_name,
        address: c.defendant_address,
        email: c.defendant_email,
        phone: c.defendant_phone,
      }}
      factsNarrative={c.facts_narrative}
      intakeAnswers={(c.intake_answers as Record<string, unknown> | null) ?? {}}
      existingSignatureTypedName={c.signature_typed_name}
      existingSignatureImage={c.signature_image}
    />
  );
}

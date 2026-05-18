import { notFound } from "next/navigation";
import { loadOwnedCase } from "../../../../../../lib/demand-letter/access";
import { createClient } from "../../../../../../lib/supabase/server";
import ReviewStep from "./ReviewStep";

export const dynamic = "force-dynamic";

interface Props {
  params: { id: string };
}

export default async function ReviewPage({ params }: Props) {
  // Fan out the case load and the auth check. loadOwnedCase is React.cache()'d,
  // so if the wizard layout already loaded the case this is free anyway.
  const supabase = createClient();
  const [c, userRes] = await Promise.all([
    loadOwnedCase(params.id),
    supabase.auth.getUser(),
  ]);
  if (!c) notFound();
  const user = userRes.data.user;

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

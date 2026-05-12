import { notFound } from "next/navigation";
import { loadOwnedCase } from "../../../../../../lib/demand-letter/access";
import { createClient } from "../../../../../../lib/supabase/server";
import type { PostalAddress } from "../../../../../../lib/supabase/types";
import PlaintiffStep, { type SavedDefaults } from "./PlaintiffStep";

export const dynamic = "force-dynamic";

interface Props {
  params: { id: string };
}

async function loadSavedDefaults(): Promise<SavedDefaults | null> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createClient() as any;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  const { data } = await supabase
    .from("profiles")
    .select(
      "full_name, default_entity_type, default_business_name, default_address, default_county",
    )
    .eq("user_id", user.id)
    .maybeSingle();
  if (!data) return null;
  const addr = (data.default_address ?? null) as PostalAddress | null;
  const hasAnything =
    data.default_entity_type ||
    data.default_business_name ||
    addr ||
    data.default_county;
  if (!hasAnything) return null;
  return {
    fullName: data.full_name ?? "",
    entityType: data.default_entity_type ?? null,
    businessName: data.default_business_name ?? "",
    address: addr,
    county: data.default_county ?? "",
  };
}

export default async function PlaintiffPage({ params }: Props) {
  const c = await loadOwnedCase(params.id);
  if (!c) notFound();
  const savedDefaults = await loadSavedDefaults();
  return (
    <PlaintiffStep
      caseId={c.id}
      initialName={c.plaintiff_name ?? ""}
      initialEmail={c.plaintiff_email ?? ""}
      initialPhone={c.plaintiff_phone ?? ""}
      initialAddress={c.plaintiff_address ?? null}
      initialCounty={(c as { plaintiff_county?: string | null }).plaintiff_county ?? ""}
      initialAnswers={(c.intake_answers as Record<string, unknown> | null) ?? {}}
      savedDefaults={savedDefaults}
    />
  );
}

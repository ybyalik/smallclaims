// Reads the generated markdown guide for a state, if one exists.
// The page template at app/(site)/small-claims/[state]/page.tsx prefers
// this over the legacy hand-curated/JSON path when a row is present.

import { createServiceRoleClient } from "../supabase/service-role";

export interface StateGuideV2 {
  stateSlug: string;
  bodyMd: string;
  model: string;
  generatedAt: string;
}

export async function loadStateGuideV2(slug: string): Promise<StateGuideV2 | null> {
  const db = createServiceRoleClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (db as any)
    .from("state_guide_v2")
    .select("state_slug, body_md, model, generated_at")
    .eq("state_slug", slug)
    .maybeSingle();
  if (error || !data || !data.body_md) return null;
  return {
    stateSlug: data.state_slug,
    bodyMd: data.body_md,
    model: data.model,
    generatedAt: data.generated_at,
  };
}

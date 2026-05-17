// Loader for the v2 state page. Reads structured_pack from state_research
// and the matching plain-language bodies from state_page_content.
//
// Returns null if either:
//   - no pack exists for the slug
//   - no page-content rows exist (page still uses the legacy template
//     until content has been generated for the slug)
//
// This is the single integration point — the page template never touches
// Supabase directly.

import { createServiceRoleClient } from "../supabase/service-role";

export interface StateContent {
  stateName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pack: Record<string, any>;
  /** sectionKey -> plain-language markdown body */
  content: Record<string, string>;
  /** Latest generated_at across all sections, or null if empty */
  generatedAt: string | null;
}

export async function loadStatePageContent(
  slug: string,
): Promise<StateContent | null> {
  const db = createServiceRoleClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: packRow, error: packErr } = await (db as any)
    .from("state_research")
    .select("state_name, structured_pack")
    .eq("slug", slug)
    .maybeSingle();
  if (packErr || !packRow || !packRow.structured_pack) return null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: rows, error: rowsErr } = await (db as any)
    .from("state_page_content")
    .select("section_key, body_md, generated_at")
    .eq("state_slug", slug);
  if (rowsErr || !rows || rows.length === 0) return null;

  const content: Record<string, string> = {};
  let latest: string | null = null;
  for (const r of rows as Array<{
    section_key: string;
    body_md: string;
    generated_at: string;
  }>) {
    content[r.section_key] = r.body_md;
    if (!latest || r.generated_at > latest) latest = r.generated_at;
  }

  return {
    stateName: packRow.state_name,
    pack: packRow.structured_pack,
    content,
    generatedAt: latest,
  };
}

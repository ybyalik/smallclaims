// State data loader. Reads from state_research.structured_pack in Supabase
// and converts to the legacy StateGuide shape that the rest of the site
// (sitemap, /small-claims index, /case-score quiz, filing kit, category
// + issue templates) still expects.
//
// History: originally backed by hand-curated /data/*.ts files plus auto-
// extracted /reports/*-evidence.json files. Both data sources were
// replaced today by the structured_pack pipeline. This module is now the
// single bridge between the new data and the old consumer shape.

import { cache } from "react";
import { createServiceRoleClient } from "./supabase/service-role";
import { getStateBySlug } from "./states";
import { packToStateGuide } from "./state-data/pack-to-guide";
import type { StateGuide } from "./types/state-guide";

// In-request dedup. The case-score quiz calls loadStateGuide for all 51
// states in one render; without this, we'd hit Supabase 51 times for the
// same data. The cache key is the function, not the args, so we wrap a
// helper that takes the slug.
const loadOne = cache(async (slug: string): Promise<StateGuide | null> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = createServiceRoleClient() as any;
  const { data, error } = await db
    .from("state_research")
    .select("state_name, slug, structured_pack")
    .eq("slug", slug)
    .maybeSingle();
  if (error || !data || !data.structured_pack) return null;
  const meta = getStateBySlug(slug);
  return packToStateGuide({
    pack: data.structured_pack,
    state: data.state_name || meta?.name || slug,
    slug,
    abbr: meta?.abbr || "",
    lastUpdated: new Date().toISOString().slice(0, 10),
  });
});

const loadAllSlugs = cache(async (): Promise<string[]> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = createServiceRoleClient() as any;
  // Only fetch the slug column and let the DB drop rows with no pack. Selecting
  // structured_pack here pulled the entire packs for every state (~2.6MB), which
  // exceeds Next's 2MB fetch-cache limit and crashed the render on /small-claims,
  // /case-score, /landlord, and the category pages.
  const { data } = await db
    .from("state_research")
    .select("slug")
    .not("structured_pack", "is", null);
  if (!Array.isArray(data)) return [];
  return data.map((r: { slug: string }) => r.slug);
});

export async function loadStateGuide(slug: string): Promise<StateGuide | null> {
  return loadOne(slug);
}

// async now (was sync). Every caller already runs inside a server component
// or async function, so adding `await` is the only change needed.
export async function availableStateSlugs(): Promise<string[]> {
  return loadAllSlugs();
}

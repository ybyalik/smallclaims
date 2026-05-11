// Entry point for SOS entity lookup. Picks the best available provider
// based on env: Cobalt if its key is set, OpenCorporates otherwise.
// Both return the same EntitySearchResult shape.

import { searchOpenCorporates } from "./opencorporates";
import { searchCobalt } from "./cobalt";
import type { EntitySearchInput, EntitySearchResult } from "./types";

export type { EntityMatch, EntitySearchInput, EntitySearchResult } from "./types";

export async function searchEntities(
  input: EntitySearchInput,
): Promise<EntitySearchResult> {
  const trimmed = input.name.trim();
  if (trimmed.length < 2) {
    return { matches: [], is_authoritative: false, provider: "opencorporates" };
  }

  if (process.env.COBALT_API_KEY) {
    const result = await searchCobalt({ ...input, name: trimmed });
    // If Cobalt errored / returned nothing, fall through to OpenCorporates
    // so a transient Cobalt outage doesn't take the feature down.
    if (result.matches.length > 0) return result;
  }
  return searchOpenCorporates({ ...input, name: trimmed });
}

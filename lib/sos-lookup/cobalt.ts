// Cobalt Intelligence provider — paid, real-time SOS scraping across all
// 50 states. Activated by setting COBALT_API_KEY in env. Falls through to
// the OpenCorporates default when the key is absent.
//
// Docs: https://docs.cobaltintelligence.com/

import type { EntityMatch, EntitySearchInput, EntitySearchResult } from "./types";

const BASE_URL = "https://apigateway.cobaltintelligence.com/v1";

// Cobalt's response shape (subset we use). Their API returns one or more
// records depending on how unique the search was.
interface CobaltSearchResponse {
  results?: Array<{
    entityId: string;
    title: string;
    entityType?: string;
    state: string; // 2-letter
    status?: string;
    filingDate?: string; // ISO
    physicalAddress?: string;
    registeredAgent?: string;
    registeredAgentAddress?: string;
  }>;
}

export async function searchCobalt(
  input: EntitySearchInput,
): Promise<EntitySearchResult> {
  const apiKey = process.env.COBALT_API_KEY;
  if (!apiKey) {
    return { matches: [], is_authoritative: false, provider: "cobalt" };
  }

  const params = new URLSearchParams({
    searchQuery: input.name,
    state: input.state || "ALL",
  });

  let resp: Response;
  try {
    resp = await fetch(`${BASE_URL}/search?${params.toString()}`, {
      headers: { "x-api-key": apiKey, Accept: "application/json" },
      signal: AbortSignal.timeout(15_000),
    });
  } catch (e) {
    console.error("[sos-lookup/cobalt] network error:", e);
    return { matches: [], is_authoritative: false, provider: "cobalt" };
  }

  if (!resp.ok) {
    console.error(`[sos-lookup/cobalt] HTTP ${resp.status}`);
    return { matches: [], is_authoritative: false, provider: "cobalt" };
  }

  const body = (await resp.json()) as CobaltSearchResponse;
  const limit = Math.max(1, Math.min(input.limit ?? 5, 20));
  const matches: EntityMatch[] = (body.results ?? []).slice(0, limit).map((r) => ({
    provider_id: r.entityId,
    provider: "cobalt",
    legal_name: r.title,
    entity_type: r.entityType ?? null,
    state_of_registration: r.state || null,
    status: r.status ?? null,
    formed_date: r.filingDate ? r.filingDate.slice(0, 10) : null,
    registered_agent:
      r.registeredAgent || r.registeredAgentAddress
        ? { name: r.registeredAgent ?? null, address: r.registeredAgentAddress ?? null }
        : null,
  }));

  return { matches, is_authoritative: true, provider: "cobalt" };
}

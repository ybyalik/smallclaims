// Cobalt Intelligence provider — paid, real-time SOS scraping across all
// 50 states. Activated by setting COBALT_API_KEY in env. Falls through to
// the OpenCorporates default when the key is absent.
//
// Docs: https://docs.cobaltintelligence.com/

import type { EntityMatch, EntitySearchInput, EntitySearchResult } from "./types";

const BASE_URL = "https://apigateway.cobaltintelligence.com/v1";

// Cobalt's response shape (subset we use). `results` is the best/exact match
// with full data; `possibleAlternatives` are lower-confidence candidates the
// user might also pick from.
interface CobaltMatchFull {
  sosId?: string;
  title?: string;
  entityType?: string | null;
  stateOfSosRegistration?: string;
  stateOfFormation?: string;
  status?: string;
  normalizedStatus?: string;
  filingDate?: string;
  agentName?: string;
  agentStreetAddress?: string;
  agentCity?: string;
  agentZip?: string;
}
interface CobaltMatchAlt {
  sosId?: string;
  businessName?: string;
  entityType?: string | null;
  status?: string;
  filingDate?: string;
  agentName?: string;
  confidenceLevel?: number;
}
interface CobaltSearchResponse {
  results?: CobaltMatchFull[];
  possibleAlternatives?: CobaltMatchAlt[];
}

function joinAgentAddress(m: CobaltMatchFull): string | null {
  const parts = [m.agentStreetAddress, m.agentCity, m.agentZip]
    .map((p) => (p ?? "").trim())
    .filter(Boolean);
  return parts.length > 0 ? parts.join(", ") : null;
}

function parseFiling(date: string | undefined): string | null {
  if (!date) return null;
  // Cobalt uses MM-DD-YYYY or MM/DD/YYYY for filingDate. Normalize to ISO.
  const m = /^(\d{1,2})[\-\/](\d{1,2})[\-\/](\d{4})$/.exec(date.trim());
  if (m) {
    const [, mm, dd, yyyy] = m;
    return `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
  }
  return date.slice(0, 10);
}

export async function searchCobalt(
  input: EntitySearchInput,
): Promise<EntitySearchResult> {
  const apiKey = process.env.COBALT_API_KEY;
  if (!apiKey) {
    return { matches: [], is_authoritative: false, provider: "cobalt" };
  }

  // Cobalt's /search rejects state=ALL and requires a 2-letter abbreviation
  // (or camelCased state name). If the caller didn't pass a state, we can't
  // hit Cobalt — bail out so the router falls through to OpenCorporates.
  if (!input.state) {
    return { matches: [], is_authoritative: false, provider: "cobalt" };
  }
  const params = new URLSearchParams({
    searchQuery: input.name,
    state: input.state,
  });

  let resp: Response;
  try {
    // Cobalt does live SOS scraping; uncached queries can take 30-45s the
    // first time we look up an entity in a state. Give it room before
    // declaring a timeout.
    resp = await fetch(`${BASE_URL}/search?${params.toString()}`, {
      headers: { "x-api-key": apiKey, Accept: "application/json" },
      signal: AbortSignal.timeout(55_000),
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

  // Top match(es) get the full record. Alternatives have less data but still
  // help disambiguate (same-name entities, suspended vs. active variants).
  const full: EntityMatch[] = (body.results ?? []).map((r) => ({
    provider_id: r.sosId ?? "",
    provider: "cobalt",
    legal_name: r.title ?? "",
    entity_type: r.entityType ?? null,
    state_of_registration:
      r.stateOfSosRegistration || r.stateOfFormation || input.state || null,
    status: r.normalizedStatus || r.status || null,
    formed_date: parseFiling(r.filingDate),
    registered_agent:
      r.agentName || r.agentStreetAddress
        ? { name: r.agentName ?? null, address: joinAgentAddress(r) }
        : null,
  }));
  const alts: EntityMatch[] = (body.possibleAlternatives ?? []).map((r) => ({
    provider_id: r.sosId ?? "",
    provider: "cobalt",
    legal_name: r.businessName ?? "",
    entity_type: r.entityType ?? null,
    state_of_registration: input.state ?? null,
    status: r.status ?? null,
    formed_date: parseFiling(r.filingDate),
    registered_agent: r.agentName ? { name: r.agentName, address: null } : null,
  }));

  const matches = [...full, ...alts]
    .filter((m) => m.legal_name)
    .slice(0, limit);

  return { matches, is_authoritative: true, provider: "cobalt" };
}

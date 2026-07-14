// OpenCorporates provider — free anonymous tier (rate-limited but works
// without an API key). Good enough for development and low-volume v1.
//
// Docs: https://api.opencorporates.com/documentation/API-Reference
//
// Anonymous quota: ~50 requests/day per IP, then 429. With an API key
// (paid plans start ~$50/mo) the quota lifts. To upgrade later, set the
// OPENCORPORATES_API_KEY env var and the wrapper will include it.

import type { EntityMatch, EntitySearchInput, EntitySearchResult } from "./types";

const BASE_URL = "https://api.opencorporates.com/v0.4";

interface OcCompany {
  company: {
    name: string;
    company_number: string;
    jurisdiction_code: string; // "us_ca", "us_de", etc.
    company_type: string | null;
    current_status: string | null;
    incorporation_date: string | null;
    registered_address_in_full: string | null;
    agent_name: string | null;
    agent_address: string | null;
    opencorporates_url: string;
  };
}

interface OcSearchResponse {
  results: {
    companies: OcCompany[];
  };
}

function jurisdictionToState(jurisdiction_code: string): string | null {
  // US jurisdictions are encoded as "us_<state>" (e.g., "us_ca" for California).
  if (!jurisdiction_code.startsWith("us_")) return null;
  const abbr = jurisdiction_code.slice(3).toUpperCase();
  return abbr.length === 2 ? abbr : null;
}

export async function searchOpenCorporates(
  input: EntitySearchInput,
): Promise<EntitySearchResult> {
  const apiKey = process.env.OPENCORPORATES_API_KEY;
  const limit = Math.max(1, Math.min(input.limit ?? 5, 20));
  const params = new URLSearchParams({
    q: input.name,
    per_page: String(limit),
    country_code: "us",
    order: "score",
  });
  if (input.state) {
    params.set("jurisdiction_code", `us_${input.state.toLowerCase()}`);
  }
  if (apiKey) params.set("api_token", apiKey);

  const url = `${BASE_URL}/companies/search?${params.toString()}`;
  let resp: Response;
  try {
    resp = await fetch(url, {
      headers: { Accept: "application/json" },
      // Hard timeout: OpenCorporates can be slow during EU business hours.
      signal: AbortSignal.timeout(8_000),
    });
  } catch (e) {
    console.error("[sos-lookup/opencorporates] network error:", e);
    return { matches: [], is_authoritative: false, provider: "opencorporates" };
  }

  if (!resp.ok) {
    if (resp.status === 429) {
      console.warn("[sos-lookup/opencorporates] rate-limited (429)");
    } else {
      console.error(`[sos-lookup/opencorporates] HTTP ${resp.status}`);
    }
    return { matches: [], is_authoritative: false, provider: "opencorporates" };
  }

  let body: OcSearchResponse;
  try {
    // Guard against a 200 response that isn't actually JSON (error page / WAF
    // challenge) so a parse failure degrades to empty instead of a raw 500.
    body = (await resp.json()) as OcSearchResponse;
  } catch (e) {
    console.error("[sos-lookup/opencorporates] non-JSON response:", e);
    return { matches: [], is_authoritative: false, provider: "opencorporates" };
  }
  const matches: EntityMatch[] = (body.results?.companies ?? []).map(({ company: c }) => ({
    provider_id: `${c.jurisdiction_code}:${c.company_number}`,
    provider: "opencorporates",
    legal_name: c.name,
    entity_type: c.company_type,
    state_of_registration: jurisdictionToState(c.jurisdiction_code),
    status: c.current_status,
    formed_date: c.incorporation_date,
    registered_agent:
      c.agent_name || c.agent_address
        ? { name: c.agent_name, address: c.agent_address }
        : null,
  }));

  return { matches, is_authoritative: true, provider: "opencorporates" };
}

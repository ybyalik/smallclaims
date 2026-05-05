// US county lookup from a postal address.
//
// Primary: Census Bureau Geocoder (free, no API key, ~95% coverage on
// addresses with a street component).
//   https://geocoding.geo.census.gov/geocoder/geographies/onelineaddress
//
// Fallback: OpenStreetMap Nominatim. Used when Census returns no match, which
// is common when the user only gives "city, state" (Census needs a street to
// match reliably). Nominatim has good coverage for US cities/towns and
// returns the county in addressdetails.
//
// Edge cases:
//   - Some rural/PO-box addresses geocode to 0 matches in both → return null
//   - ZIP-only inputs work via Census but are imprecise
//   - Census occasionally returns 200 with empty data; treated as no match

export interface CountyLookupResult {
  county: string; // e.g. "Middlesex County"
  countyFips: string; // 5-digit FIPS (Census) or "" (Nominatim)
  state: string; // 2-letter, e.g. "NJ"
  matchedAddress: string; // canonical normalized address the source matched
  source: "census" | "nominatim";
}

export interface CountyLookupInput {
  line1?: string | null;
  line2?: string | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
  // Or a single combined string (used when only "old bridge NJ" is available)
  oneline?: string | null;
}

const CENSUS_URL = "https://geocoding.geo.census.gov/geocoder/geographies/onelineaddress";
const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";
const FETCH_TIMEOUT_MS = 8000;

export async function lookupCounty(input: CountyLookupInput): Promise<CountyLookupResult | null> {
  const oneline = buildOneline(input);
  if (!oneline) return null;

  // Try Census first — it's authoritative when the user gives a street + zip.
  const fromCensus = await lookupViaCensus(oneline, input);
  if (fromCensus) return fromCensus;

  // Fall back to Nominatim for city+state inputs (no street). Census needs a
  // street to match reliably; Nominatim has good city/town coverage.
  const fromOsm = await lookupViaNominatim(oneline, input);
  if (fromOsm) return fromOsm;

  return null;
}

async function lookupViaCensus(
  oneline: string,
  input: CountyLookupInput,
): Promise<CountyLookupResult | null> {
  const url = new URL(CENSUS_URL);
  url.searchParams.set("address", oneline);
  url.searchParams.set("benchmark", "Public_AR_Current");
  url.searchParams.set("vintage", "Current_Current");
  url.searchParams.set("layers", "Counties");
  url.searchParams.set("format", "json");

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, { signal: ctrl.signal });
    if (!res.ok) return null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body = (await res.json()) as any;
    const matches = body?.result?.addressMatches;
    if (!Array.isArray(matches) || matches.length === 0) return null;
    const m = matches[0];
    const counties = m?.geographies?.Counties;
    if (!Array.isArray(counties) || counties.length === 0) return null;
    const c = counties[0];
    const countyName = (c?.NAME as string | undefined) || (c?.BASENAME as string | undefined);
    const fips =
      (c?.GEOID as string | undefined) ||
      `${c?.STATE ?? ""}${c?.COUNTY ?? ""}` ||
      "";
    const state =
      (m?.addressComponents?.state as string | undefined) ||
      (input.state as string | undefined) ||
      "";
    if (!countyName || !state) return null;
    return {
      county: normalizeCountyName(countyName),
      countyFips: fips,
      state: state.toUpperCase(),
      matchedAddress: (m?.matchedAddress as string | undefined) || oneline,
      source: "census",
    };
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function lookupViaNominatim(
  oneline: string,
  input: CountyLookupInput,
): Promise<CountyLookupResult | null> {
  const url = new URL(NOMINATIM_URL);
  url.searchParams.set("q", oneline);
  url.searchParams.set("format", "json");
  url.searchParams.set("addressdetails", "1");
  url.searchParams.set("countrycodes", "us");
  url.searchParams.set("limit", "1");

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      // Nominatim's TOS asks for a recognizable User-Agent.
      headers: {
        "User-Agent": "civilcase-county-lookup/1.0 (https://civilcase.com)",
        Accept: "application/json",
      },
    });
    if (!res.ok) return null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body = (await res.json()) as any[];
    if (!Array.isArray(body) || body.length === 0) return null;
    const hit = body[0];
    const addr = hit?.address ?? {};
    // OSM uses different keys depending on locale: county, state_district,
    // borough, parish. Try the common ones in priority order.
    const countyRaw =
      (addr.county as string | undefined) ||
      (addr.borough as string | undefined) ||
      (addr.state_district as string | undefined) ||
      (addr.parish as string | undefined);
    if (!countyRaw) return null;
    const stateRaw =
      (addr["ISO3166-2-lvl4"] as string | undefined) ||
      (addr.state as string | undefined) ||
      input.state ||
      "";
    const state = abbrFromOsmState(stateRaw, addr.state as string | undefined);
    if (!state) return null;
    return {
      county: normalizeCountyName(countyRaw),
      countyFips: "",
      state,
      matchedAddress: (hit?.display_name as string | undefined) || oneline,
      source: "nominatim",
    };
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

// "US-NJ" → "NJ"; "New Jersey" → "NJ"
function abbrFromOsmState(maybeIso: string | undefined, maybeFullName: string | undefined): string {
  if (maybeIso && /^US-[A-Z]{2}$/.test(maybeIso)) return maybeIso.slice(3);
  if (maybeIso && /^[A-Z]{2}$/.test(maybeIso)) return maybeIso;
  if (maybeFullName && /^[A-Z]{2}$/.test(maybeFullName)) return maybeFullName;
  // Fall back to a small lookup for full state names
  const s = (maybeFullName || "").toLowerCase().trim();
  const map: Record<string, string> = {
    alabama: "AL", alaska: "AK", arizona: "AZ", arkansas: "AR", california: "CA",
    colorado: "CO", connecticut: "CT", delaware: "DE", florida: "FL", georgia: "GA",
    hawaii: "HI", idaho: "ID", illinois: "IL", indiana: "IN", iowa: "IA",
    kansas: "KS", kentucky: "KY", louisiana: "LA", maine: "ME", maryland: "MD",
    massachusetts: "MA", michigan: "MI", minnesota: "MN", mississippi: "MS", missouri: "MO",
    montana: "MT", nebraska: "NE", nevada: "NV", "new hampshire": "NH", "new jersey": "NJ",
    "new mexico": "NM", "new york": "NY", "north carolina": "NC", "north dakota": "ND", ohio: "OH",
    oklahoma: "OK", oregon: "OR", pennsylvania: "PA", "rhode island": "RI", "south carolina": "SC",
    "south dakota": "SD", tennessee: "TN", texas: "TX", utah: "UT", vermont: "VT",
    virginia: "VA", washington: "WA", "west virginia": "WV", wisconsin: "WI", wyoming: "WY",
    "district of columbia": "DC",
  };
  return map[s] || "";
}

function buildOneline(input: CountyLookupInput): string | null {
  if (input.oneline && input.oneline.trim()) return input.oneline.trim();
  const parts = [
    input.line1?.trim(),
    input.city?.trim(),
    input.state?.trim(),
    input.zip?.trim(),
  ].filter(Boolean);
  if (parts.length === 0) return null;
  // Census needs at least street + (city or zip) + state for a clean match.
  // For tiny inputs (just "old bridge NJ") it still works but less reliably.
  return parts.join(", ");
}

// Census returns either "Middlesex" (BASENAME) or "Middlesex County" (NAME).
// Normalize so downstream code always sees "X County" / "X Parish" / "X Borough".
function normalizeCountyName(raw: string): string {
  const s = raw.trim();
  if (!s) return s;
  if (/\b(County|Parish|Borough|Census Area|Municipality)\b/i.test(s)) return s;
  return `${s} County`;
}

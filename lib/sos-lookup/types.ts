// Provider-agnostic shape for a Secretary-of-State entity lookup result.
// Whatever the underlying provider returns (Cobalt, OpenCorporates, mock,
// etc.) gets normalized into this so the UI doesn't care which source
// we're using today.

export interface EntityRegisteredAgent {
  name: string | null;
  address: string | null; // single-line, normalized; null if missing
}

export interface EntityMatch {
  // Provider-specific opaque ID. Use this if we need to call back for
  // detail. Format depends on the provider.
  provider_id: string;
  // Which provider the row came from (for debugging / future migrations).
  provider: "opencorporates" | "cobalt" | "mock";
  // The canonical legal name as registered with the state.
  legal_name: string;
  // Entity type — LLC, Corp, etc. Free-form because providers normalize
  // differently; downstream code should treat this as a label.
  entity_type: string | null;
  // State of registration as a 2-letter US abbr. Null if non-US or
  // unparseable.
  state_of_registration: string | null;
  // Active / Inactive / Dissolved / Suspended / etc. — free-form label
  // from the provider. Surface to the user so they don't sue a dead LLC.
  status: string | null;
  // Date the entity was formed/registered. ISO YYYY-MM-DD if known.
  formed_date: string | null;
  registered_agent: EntityRegisteredAgent | null;
}

export interface EntitySearchInput {
  name: string;
  // Optional 2-letter state hint to bias the search. Providers use this
  // differently — some will only search that state, others will rank.
  state?: string;
  // How many matches to return. Defaults to 5.
  limit?: number;
}

export interface EntitySearchResult {
  matches: EntityMatch[];
  // True if the lookup was satisfied from a free / mock provider so the
  // caller knows the result quality. Surface this in dev to avoid being
  // misled by mock data.
  is_authoritative: boolean;
  provider: EntityMatch["provider"];
}

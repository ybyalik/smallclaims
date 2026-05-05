// Source allow-list for case research.
//
// We only cite domains that are demonstrably an official court / clerk /
// government source. Two enforcement points:
//   1. At search time: pass these to Tavily as include_domains.
//   2. At cite time: re-check before a source is allowed in the report.
//
// Update by adding entries to STATE_DOMAINS or to GENERIC_PATTERNS. Entries
// that need a regex (e.g. *clerk*.gov) live in GENERIC_PATTERNS.

export interface DomainAllow {
  domain: string;
  reason: string;
}

const GENERIC_DOMAINS: DomainAllow[] = [
  { domain: "uscourts.gov", reason: "Federal courts" },
  { domain: "supremecourt.gov", reason: "US Supreme Court" },
];

// Per-state seed. Add states as we expand coverage.
const STATE_DOMAINS: Record<string, DomainAllow[]> = {
  CA: [
    { domain: "courts.ca.gov", reason: "Judicial Council of California self-help portal" },
    { domain: "selfhelp.courts.ca.gov", reason: "California self-help (forms)" },
    { domain: "oag.ca.gov", reason: "California AG" },
    { domain: "leginfo.legislature.ca.gov", reason: "California legal code" },
    { domain: "saccourt.ca.gov", reason: "Sacramento County Superior Court" },
    { domain: "lacourt.org", reason: "LA Superior Court" },
    { domain: "sf.courts.ca.gov", reason: "San Francisco Superior Court" },
    { domain: "sb-court.org", reason: "San Bernardino Superior Court" },
    { domain: "occourts.org", reason: "Orange County Superior Court" },
    { domain: "scscourt.org", reason: "Santa Clara County Superior Court" },
    { domain: "alameda.courts.ca.gov", reason: "Alameda County Superior Court" },
    { domain: "sandiego.courts.ca.gov", reason: "San Diego Superior Court" },
  ],
};

const GENERIC_PATTERNS: RegExp[] = [
  /\.gov$/,
  /\.us$/,
  /\.courts\.[a-z]{2}\.gov$/,
  /^courts\.[a-z]{2}\.gov$/,
  /(^|\.)clerk[a-z-]*\.[a-z]+(\.[a-z]+)*$/,
  /(^|\.)efile[a-z-]*\.[a-z]+(\.[a-z]+)*$/,
];

export function listAllowedDomains(stateAbbr: string | null): string[] {
  const upper = stateAbbr ? stateAbbr.toUpperCase() : "";
  const stateList = STATE_DOMAINS[upper] ?? [];
  return [...GENERIC_DOMAINS, ...stateList].map((d) => d.domain);
}

export function isOfficialDomain(rawUrl: string): boolean {
  const host = hostFromUrl(rawUrl);
  if (!host) return false;
  // Static seeds across all states
  const all = Object.values(STATE_DOMAINS).flat();
  for (const e of [...GENERIC_DOMAINS, ...all]) {
    if (host === e.domain || host.endsWith(`.${e.domain}`)) return true;
  }
  for (const re of GENERIC_PATTERNS) {
    if (re.test(host)) return true;
  }
  return false;
}

export function hostFromUrl(rawUrl: string): string | null {
  try {
    return new URL(rawUrl).hostname.toLowerCase();
  } catch {
    return null;
  }
}

// Per-state context for the demand-letter wizard:
//   - prejudgment_interest_rate (annual, percent) used to compute statutory
//     interest in the recovery calculator and in the letter math
//   - small_claims_max (dollars) shown to the recipient in the letter as
//     the implicit "or else" anchor
// Sources: state statutes; figures verified through 2025. Confirm before
// citing in any contract or filing.

import { STATES } from "../states";

export interface StateContext {
  slug: string;
  name: string;
  abbr: string;
  prejudgment_interest_rate: number; // percent per year
  small_claims_max_dollars: number;
}

// keyed by 2-letter state code
const CONTEXT: Record<string, { rate: number; max: number }> = {
  AL: { rate: 6, max: 6_000 },
  AK: { rate: 10.5, max: 10_000 },
  AZ: { rate: 4.25, max: 3_500 },
  AR: { rate: 6, max: 5_000 },
  CA: { rate: 10, max: 12_500 },
  CO: { rate: 8, max: 7_500 },
  CT: { rate: 10, max: 5_000 },
  DC: { rate: 6, max: 10_000 },
  DE: { rate: 5, max: 25_000 },
  FL: { rate: 7.85, max: 8_000 },
  GA: { rate: 7, max: 15_000 },
  HI: { rate: 10, max: 5_000 },
  ID: { rate: 8.625, max: 5_000 },
  IL: { rate: 9, max: 10_000 },
  IN: { rate: 8, max: 8_000 },
  IA: { rate: 5, max: 6_500 },
  KS: { rate: 10, max: 4_000 },
  KY: { rate: 6, max: 2_500 },
  LA: { rate: 8.5, max: 5_000 },
  ME: { rate: 6, max: 6_000 },
  MD: { rate: 6, max: 5_000 },
  MA: { rate: 12, max: 7_000 },
  MI: { rate: 7.05, max: 7_000 },
  MN: { rate: 4, max: 15_000 },
  MS: { rate: 8, max: 3_500 },
  MO: { rate: 5.5, max: 5_000 },
  MT: { rate: 10, max: 7_000 },
  NE: { rate: 4.156, max: 3_900 },
  NV: { rate: 8.25, max: 10_000 },
  NH: { rate: 6.5, max: 10_000 },
  NJ: { rate: 5.5, max: 5_000 },
  NM: { rate: 8.75, max: 10_000 },
  NY: { rate: 9, max: 10_000 },
  NC: { rate: 8, max: 10_000 },
  ND: { rate: 5.5, max: 15_000 },
  OH: { rate: 8, max: 6_000 },
  OK: { rate: 10.83, max: 10_000 },
  OR: { rate: 9, max: 10_000 },
  PA: { rate: 6, max: 12_000 },
  RI: { rate: 12, max: 2_500 },
  SC: { rate: 8.25, max: 7_500 },
  SD: { rate: 10, max: 12_000 },
  TN: { rate: 8.25, max: 25_000 },
  TX: { rate: 8.5, max: 20_000 },
  UT: { rate: 4, max: 15_000 },
  VT: { rate: 12, max: 5_000 },
  VA: { rate: 6, max: 5_000 },
  WA: { rate: 12, max: 10_000 },
  WV: { rate: 7, max: 10_000 },
  WI: { rate: 5, max: 10_000 },
  WY: { rate: 7, max: 6_000 },
};

export function getStateContext(abbrOrSlug: string): StateContext | null {
  const abbr = abbrOrSlug.length === 2
    ? abbrOrSlug.toUpperCase()
    : STATES.find((s) => s.slug === abbrOrSlug)?.abbr;
  if (!abbr) return null;
  const meta = STATES.find((s) => s.abbr === abbr);
  const ctx = CONTEXT[abbr];
  if (!meta || !ctx) return null;
  return {
    slug: meta.slug,
    name: meta.name,
    abbr: meta.abbr,
    prejudgment_interest_rate: ctx.rate,
    small_claims_max_dollars: ctx.max,
  };
}

export function listStates(): { slug: string; name: string; abbr: string }[] {
  return STATES.map((s) => ({ slug: s.slug, name: s.name, abbr: s.abbr }));
}

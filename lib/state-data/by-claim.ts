// Per-claim-type 50-state rows for the issue subpages.
// Given a claim_type (e.g. "security_deposit", "wages", "written_contract"),
// returns one row per state with: deadline to sue, statutory penalty, and
// the statute citation. Data comes from state_research.structured_pack.
//
// Used by IssueTemplate to auto-render the state-by-state table whenever
// the issue declares a `claimType`. Replaces the older deposit-only
// lookup in lib/deposit-state-table.ts.

import { cache } from "react";
import { createServiceRoleClient } from "../supabase/service-role";
import { STATES } from "../states";

interface RawStateRow {
  slug: string;
  state_name: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  structured_pack: any;
}

// Build-time snapshot, written by scripts/snapshot-state-research.ts
// as a `prebuild` step. We require() it lazily so missing-file at dev
// time doesn't crash the import chain — we just fall back to a live
// Supabase fetch.
let snapshotCache: RawStateRow[] | null = null;
function loadSnapshot(): RawStateRow[] | null {
  if (snapshotCache) return snapshotCache;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const data = require("./snapshot.json");
    if (Array.isArray(data)) {
      snapshotCache = data as RawStateRow[];
      return snapshotCache;
    }
  } catch {
    // snapshot.json doesn't exist (first dev run, or build script skipped)
  }
  return null;
}

// Single fetch shared across every pre-render. Prefers the build-time
// snapshot; falls back to a live Supabase call so dev / first build
// without a snapshot still works.
const fetchAllStateResearch = cache(async (): Promise<RawStateRow[]> => {
  const snap = loadSnapshot();
  if (snap) return snap;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = createServiceRoleClient() as any;
  const { data } = await db
    .from("state_research")
    .select("slug, state_name, structured_pack");
  return Array.isArray(data) ? (data as RawStateRow[]) : [];
});

export interface ClaimStateRow {
  state: string;            // "California"
  slug: string;             // "california"
  abbr: string;             // "CA"
  deadline: string;         // "4 years to sue"
  penalty: string;          // "3x your damages (consumer fraud)"
  statute: string;          // "Cal. Civ. Code § 1950.5"
  hasMultiplier: boolean;   // for sorting / highlighting most-generous states
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function findSol(pack: any, claimType: string): { years?: number; citation?: string } | null {
  const sols = Array.isArray(pack?.statute_of_limitations_by_claim_type)
    ? pack.statute_of_limitations_by_claim_type
    : [];
  return sols.find((s: { claim_type?: string }) => s.claim_type === claimType) ?? null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function findMultiplier(pack: any, claimType: string): {
  multiplier?: number | string;
  conditions?: string;
  statute?: string;
} | null {
  const arr = Array.isArray(pack?.statutory_multipliers) ? pack.statutory_multipliers : [];
  // Exact match first; fall back to partial match on related claims.
  let hit = arr.find((m: { claim_types?: string[] }) =>
    (m.claim_types ?? []).includes(claimType),
  );
  if (hit) return hit;
  // Some structured_packs use "wage" instead of "wages", etc. Normalize.
  const altKeys: Record<string, string[]> = {
    wages: ["wage", "unpaid_wages"],
    written_contract: ["contract"],
    oral_contract: ["contract"],
    security_deposit: ["security-deposit"],
    consumer_protection: ["consumer-protection", "dtpa", "udap"],
  };
  const alts = altKeys[claimType] ?? [];
  hit = arr.find((m: { claim_types?: string[] }) =>
    (m.claim_types ?? []).some((c) => alts.includes(c)),
  );
  return hit ?? null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildRow(slug: string, stateName: string, abbr: string, pack: any, claimType: string): ClaimStateRow {
  const sol = findSol(pack, claimType);
  const mult = findMultiplier(pack, claimType);

  const deadline = sol?.years && sol.years > 0
    ? `${sol.years} year${sol.years === 1 ? "" : "s"} to sue`
    : "Check statute";

  let penalty = "No statutory multiplier";
  let hasMultiplier = false;
  if (mult) {
    hasMultiplier = true;
    const mLabel =
      typeof mult.multiplier === "number"
        ? `${mult.multiplier}x your damages`
        : typeof mult.multiplier === "string"
          ? mult.multiplier
          : "Statutory penalty";
    penalty = mult.conditions
      ? `${mLabel} (${mult.conditions.slice(0, 70)}${mult.conditions.length > 70 ? "…" : ""})`
      : mLabel;
  }

  const statute = mult?.statute || sol?.citation || "";

  return {
    state: stateName,
    slug,
    abbr,
    deadline,
    penalty,
    statute,
    hasMultiplier,
  };
}

/**
 * Returns one row per state for the given claim_type. React-cached so the
 * Supabase fetch runs once per render even when called from multiple issue
 * pages (e.g. during static generation across categories).
 */
export const getClaimStateTable = cache(
  async (claimType: string): Promise<ClaimStateRow[]> => {
    const data = await fetchAllStateResearch();
    const meta = new Map(STATES.map((s) => [s.slug, s] as const));
    const rows: ClaimStateRow[] = [];
    for (const r of data) {
      if (!r.structured_pack) continue;
      const m = meta.get(r.slug);
      rows.push(
        buildRow(
          r.slug,
          r.state_name || m?.name || r.slug,
          m?.abbr || "",
          r.structured_pack,
          claimType,
        ),
      );
    }
    rows.sort((a, b) => a.state.localeCompare(b.state));
    return rows;
  },
);

/**
 * Convenience: just the small-claims cap per state, used by the over-the-cap
 * warning on issue pages. One Supabase fetch shared across renders.
 */
export const getAllStateCaps = cache(
  async (): Promise<Map<string, { state: string; cap: number }>> => {
    const data = await fetchAllStateResearch();
    const out = new Map<string, { state: string; cap: number }>();
    for (const r of data) {
      const cap = r.structured_pack?.claim_limit_dollars;
      if (typeof cap === "number" && cap > 0) {
        out.set(r.slug, { state: r.state_name || r.slug, cap });
      }
    }
    return out;
  },
);

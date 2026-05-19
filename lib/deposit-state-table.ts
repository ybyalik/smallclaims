// Per-state security-deposit table for the
// /small-claims/sue-landlord-security-deposit page.
//
// One row per state: deadline to return the deposit, statutory penalty
// for wrongful withholding, and the statute citation. All three are
// pulled from state_research.structured_pack — the same source that
// drives the state guide pages and the rest of the site.
//
// This replaces the old approach (read 4 hand-curated TS files + 47
// evidence JSON files on disk + fall back to a hard-coded map for the
// rest). Now everything comes from one Supabase table with cited
// statutes for every state.

import { cache } from "react";
import { createServiceRoleClient } from "./supabase/service-role";
import { STATES } from "./states";

export interface DepositRow {
  state: string;
  slug: string;
  deadline: string;
  penalty: string;
  statute: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function findSecurityDepositSol(pack: any): { years?: number; citation?: string } | null {
  const sols = Array.isArray(pack?.statute_of_limitations_by_claim_type)
    ? pack.statute_of_limitations_by_claim_type
    : [];
  return sols.find((s: { claim_type?: string }) => s.claim_type === "security_deposit") ?? null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function findSecurityDepositMultiplier(pack: any): {
  multiplier?: number | string;
  conditions?: string;
  statute?: string;
} | null {
  const arr = Array.isArray(pack?.statutory_multipliers) ? pack.statutory_multipliers : [];
  return (
    arr.find((m: { claim_types?: string[] }) =>
      (m.claim_types ?? []).includes("security_deposit"),
    ) ?? null
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowFromPack(slug: string, stateName: string, pack: any): DepositRow {
  const sol = findSecurityDepositSol(pack);
  const mult = findSecurityDepositMultiplier(pack);

  let deadline = "varies";
  if (sol?.years && sol.years > 0) {
    deadline = `${sol.years} year${sol.years === 1 ? "" : "s"} to sue`;
  }

  let penalty = "Wrongful withholding penalty varies";
  if (mult) {
    const m =
      typeof mult.multiplier === "number"
        ? `${mult.multiplier}x the wrongfully withheld amount`
        : typeof mult.multiplier === "string"
          ? mult.multiplier
          : "Statutory penalty";
    penalty = mult.conditions
      ? `${m} (${mult.conditions.slice(0, 80)}${mult.conditions.length > 80 ? "…" : ""})`
      : m;
  }

  const statute = mult?.statute || sol?.citation || "";

  return { state: stateName, slug, deadline, penalty, statute };
}

// React.cache dedupes the Supabase fetch within one render. The deposit
// table appears on the security-deposit issue page, which is itself
// statically generated, so this runs at build time per state page.
export const getDepositStateTable = cache(async (): Promise<DepositRow[]> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = createServiceRoleClient() as any;
  const { data } = await db
    .from("state_research")
    .select("slug, state_name, structured_pack");
  if (!Array.isArray(data)) return [];

  const stateBySlug = new Map(STATES.map((s) => [s.slug, s.name] as const));
  const rows: DepositRow[] = [];
  for (const r of data) {
    if (!r.structured_pack) continue;
    const stateName = r.state_name || stateBySlug.get(r.slug) || r.slug;
    rows.push(rowFromPack(r.slug, stateName, r.structured_pack));
  }
  rows.sort((a, b) => a.state.localeCompare(b.state));
  return rows;
});

// Filter the per-state pre-baked structured_pack down to the rows that
// matter for one specific case (claim-amount step in the wizard).
//
// Pulls:
//   - statutory_multipliers whose claim_types overlap the user's case
//   - prejudgment_interest_by_claim_type row matching the user's case
//
// Used by the claim-amount step so the multiplier/interest UI shows the
// actual state statute + value instead of a generic "many states do X" blurb.

import { createServiceRoleClient } from "../supabase/service-role";
import { getStateBySlug, STATES } from "../states";

export interface CaseRelevantMultiplier {
  statute: string;
  multiplier: number | null;
  conditions: string;
  // The canonical claim types this multiplier applies to. Empty array means
  // the row didn't carry a filter — we keep it as a conservative fallback.
  claim_types: string[];
}

export interface CaseRelevantInterest {
  claim_type: string;
  rate_pct: number | null;
  type: string | null;
  citation: string | null;
  notes: string | null;
}

export interface CaseRelevantRows {
  multipliers: CaseRelevantMultiplier[];
  interest: CaseRelevantInterest | null;
}

export const EMPTY_CASE_RELEVANT: CaseRelevantRows = {
  multipliers: [],
  interest: null,
};

// Internal: try abbr or slug, return the state row + slug for the DB query.
function resolveStateSlug(abbrOrSlug: string): string | null {
  const upper = abbrOrSlug.toUpperCase();
  const byAbbr = STATES.find((s) => s.abbr === upper);
  if (byAbbr) return byAbbr.slug;
  const bySlug = getStateBySlug(abbrOrSlug.toLowerCase());
  return bySlug ? bySlug.slug : null;
}

export async function loadCaseRelevantStateRows(
  stateAbbrOrSlug: string,
  caseClaimTypes: string[],
): Promise<CaseRelevantRows> {
  const slug = resolveStateSlug(stateAbbrOrSlug);
  if (!slug) return EMPTY_CASE_RELEVANT;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;
  const { data } = await admin
    .from("state_research")
    .select("structured_pack")
    .eq("slug", slug)
    .maybeSingle();
  const pack = (data?.structured_pack ?? null) as Record<string, unknown> | null;
  if (!pack) return EMPTY_CASE_RELEVANT;

  // ---- Statutory multipliers ----
  const allMultipliers = Array.isArray(pack.statutory_multipliers)
    ? (pack.statutory_multipliers as Array<Record<string, unknown>>)
    : [];
  const lowerCaseClaimTypes = new Set(caseClaimTypes.map((c) => c.toLowerCase()));

  const multipliers: CaseRelevantMultiplier[] = allMultipliers
    .map((m) => {
      const rawClaimTypes = Array.isArray(m.claim_types)
        ? (m.claim_types as unknown[])
            .filter((x): x is string => typeof x === "string")
            .map((s) => s.toLowerCase())
        : [];
      return {
        statute: typeof m.statute === "string" ? m.statute : "",
        multiplier:
          typeof m.multiplier === "number" ? m.multiplier : null,
        conditions: typeof m.conditions === "string" ? m.conditions : "",
        claim_types: rawClaimTypes,
      };
    })
    .filter((row) => {
      // Keep if any claim type overlaps. Empty filter = conservative include
      // (some legacy rows didn't tag claim_types and we'd rather show too
      // many than too few).
      if (row.claim_types.length === 0) return true;
      return row.claim_types.some((c) => lowerCaseClaimTypes.has(c));
    });

  // ---- Prejudgment interest ----
  const allInterest = Array.isArray(pack.prejudgment_interest_by_claim_type)
    ? (pack.prejudgment_interest_by_claim_type as Array<Record<string, unknown>>)
    : [];
  const interestRows: CaseRelevantInterest[] = allInterest.map((r) => ({
    claim_type: typeof r.claim_type === "string" ? r.claim_type.toLowerCase() : "",
    rate_pct: typeof r.rate_pct === "number" ? r.rate_pct : null,
    type: typeof r.type === "string" ? r.type : null,
    citation: typeof r.citation === "string" ? r.citation : null,
    notes: typeof r.notes === "string" ? r.notes : null,
  }));
  const interest =
    interestRows.find((r) => lowerCaseClaimTypes.has(r.claim_type)) ??
    interestRows.find((r) => r.claim_type === "money_judgment") ??
    interestRows[0] ??
    null;

  return { multipliers, interest };
}

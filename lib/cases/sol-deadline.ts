// Compute a rough statute-of-limitations expiry date for a case, for use
// in dashboard list indicators. Reads from the per-state pre-baked
// structured_pack so no extra LLM calls are needed.
//
// This is APPROXIMATE. Real SOL math has tolling rules, discovery-rule
// adjustments, partial-payment restarts, and government-defendant
// carve-outs we don't model here. The output is a heads-up indicator,
// not legal advice — the UI should label it as approximate.

import { createServiceRoleClient } from "../supabase/service-role";
import { STATES } from "../states";
import { canonicalPrimaryClaimType } from "./dispute-to-claim-type";
import type { Case } from "../supabase/types";

export type SolUrgency = "expired" | "critical" | "warning" | "normal";

export interface SolDeadline {
  expiryDate: string; // ISO YYYY-MM-DD
  daysRemaining: number; // negative when past
  urgency: SolUrgency;
  matchedClaimType: string;
  solYears: number;
  citation: string | null;
  whenClockStarts: string | null;
  source: "classified" | "dispute_type_fallback";
}

interface SolRow {
  claim_type?: string;
  years?: number | null;
  citation?: string;
  when_clock_starts?: string;
}

function stateSlugFromAbbr(abbr: string | null | undefined): string | null {
  if (!abbr) return null;
  const upper = abbr.toUpperCase();
  return STATES.find((s) => s.abbr === upper)?.slug ?? null;
}

// Pure compute: takes the case row + the matching state's structured pack.
// No DB calls. Used by the batch loader after it's grouped cases by state.
export function computeSolDeadlineFromPack(
  c: Pick<Case, "intake_answers" | "dispute_type">,
  pack: Record<string, unknown> | null,
): SolDeadline | null {
  if (!pack) return null;
  const answers = (c.intake_answers as Record<string, unknown> | null) ?? {};

  const incidentDateStr =
    typeof answers.incident_date === "string" ? answers.incident_date : null;
  if (!incidentDateStr) return null;
  const incidentDate = new Date(incidentDateStr);
  if (Number.isNaN(incidentDate.getTime())) return null;

  // Prefer the classified label (cached on intake_answers after first
  // demand-letter generation). Fall back to the dispute-type map for
  // draft cases that haven't been classified yet.
  const cls = answers.case_classification as Record<string, unknown> | undefined;
  const classifiedPrimary =
    cls && typeof cls.primary_claim_type === "string"
      ? cls.primary_claim_type
      : null;
  const fallback = canonicalPrimaryClaimType(c.dispute_type ?? null);
  const claimType = classifiedPrimary ?? fallback;
  if (!claimType) return null;
  const claimTypeLower = claimType.toLowerCase();
  const source: "classified" | "dispute_type_fallback" = classifiedPrimary
    ? "classified"
    : "dispute_type_fallback";

  const rows: SolRow[] = Array.isArray(pack.statute_of_limitations_by_claim_type)
    ? (pack.statute_of_limitations_by_claim_type as SolRow[])
    : [];
  const match = rows.find(
    (r) => (r.claim_type ?? "").toLowerCase() === claimTypeLower,
  );
  if (!match || match.years == null) return null;

  const expiry = new Date(incidentDate);
  expiry.setFullYear(expiry.getFullYear() + match.years);

  const msPerDay = 24 * 60 * 60 * 1000;
  const daysRemaining = Math.floor(
    (expiry.getTime() - Date.now()) / msPerDay,
  );
  const urgency: SolUrgency =
    daysRemaining < 0
      ? "expired"
      : daysRemaining < 30
        ? "critical"
        : daysRemaining < 90
          ? "warning"
          : "normal";

  return {
    expiryDate: expiry.toISOString().slice(0, 10),
    daysRemaining,
    urgency,
    matchedClaimType: claimType,
    solYears: match.years,
    citation: match.citation ?? null,
    whenClockStarts: match.when_clock_starts ?? null,
    source,
  };
}

// Batch loader for dashboard / cases-list pages. Groups input cases by
// state, fetches each state's structured_pack ONCE, then computes each
// case's deadline. Returns a Map keyed by case id.
export async function loadSolDeadlinesForCases(
  cases: Array<Pick<Case, "id" | "state" | "intake_answers" | "dispute_type">>,
): Promise<Map<string, SolDeadline>> {
  if (cases.length === 0) return new Map();

  // Resolve unique state slugs (skip cases with no state).
  const slugs = new Set<string>();
  for (const c of cases) {
    const slug = stateSlugFromAbbr(c.state);
    if (slug) slugs.add(slug);
  }
  if (slugs.size === 0) return new Map();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;
  const { data } = await admin
    .from("state_research")
    .select("slug, structured_pack")
    .in("slug", Array.from(slugs));
  const packBySlug = new Map<string, Record<string, unknown> | null>();
  for (const row of (data ?? []) as Array<{
    slug: string;
    structured_pack: Record<string, unknown> | null;
  }>) {
    packBySlug.set(row.slug, row.structured_pack ?? null);
  }

  const out = new Map<string, SolDeadline>();
  for (const c of cases) {
    const slug = stateSlugFromAbbr(c.state);
    const pack = slug ? packBySlug.get(slug) ?? null : null;
    const deadline = computeSolDeadlineFromPack(c, pack);
    if (deadline) out.set(c.id, deadline);
  }
  return out;
}

// Friendly human-readable description of "how long until / since".
// Examples: "in 2 years", "in 3 months", "in 14 days", "today", "8 days
// ago", "3 months ago", "expired".
export function formatDeadlineDistance(d: SolDeadline): string {
  const days = d.daysRemaining;
  if (days < 0) {
    const past = Math.abs(days);
    if (past < 60) return `${past} day${past === 1 ? "" : "s"} ago`;
    if (past < 365) {
      const months = Math.round(past / 30);
      return `${months} month${months === 1 ? "" : "s"} ago`;
    }
    const years = Math.round(past / 365);
    return `${years} year${years === 1 ? "" : "s"} ago`;
  }
  if (days === 0) return "today";
  if (days < 60) return `${days} day${days === 1 ? "" : "s"} left`;
  if (days < 365) {
    const months = Math.round(days / 30);
    return `${months} month${months === 1 ? "" : "s"} left`;
  }
  const years = Math.round(days / 365);
  return `${years} year${years === 1 ? "" : "s"} left`;
}

export function formatExpiryDate(d: SolDeadline): string {
  return new Date(`${d.expiryDate}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}


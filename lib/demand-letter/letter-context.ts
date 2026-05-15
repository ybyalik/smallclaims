// Build a structured context block for the demand-letter LLM prompt.
//
// PRIMARY DATA SOURCE: state_research.structured_pack (EvidencePack JSON).
// Every state has this once deep research has run + been extracted. It has
// machine-readable fields the letter can consume directly:
//   - statute_of_limitations_by_claim_type
//   - statutory_multipliers (with claim_types array for direct matching)
//   - prejudgment_interest_by_claim_type
//   - recoverable_amounts.attorney_fees / costs_recoverable
//   - demand_letter.minimum_days_before_filing   (structured cure period,
//     no regex needed)
//   - government_tort_claim_notice.deadline_days (structured govt deadline)
//   - claim_cap_tiers / filing_fee_tiers
//
// FALLBACK: legacy StateGuide TS files in /data/ (hand-curated for DE, MN,
// TX, WY). Richer prose but only 4 states.
//
// FINAL FALLBACK: minimal per-state map (just interest rate + small-claims
// cap) for anything missing.

import { createServiceRoleClient } from "../supabase/service-role";
import { availableStateSlugs, loadStateGuide } from "../state-data";
import { STATES } from "../states";
import { getStateContext } from "./state-context";
import type {
  StateGuide,
  StatuteOfLimitationsEntry,
  StatutoryMultiplier,
} from "../types/state-guide";

export interface LetterStateContext {
  contextBlock: string;
  curePeriodDays: number;
  // True when we built the block from the rich structured_pack or the
  // legacy StateGuide; false when we only had the minimal per-state map.
  stateEnhanced: boolean;
  // Where the context came from. Useful for debugging and for the audit
  // record on the generated letter.
  source: "structured_pack" | "state_guide" | "minimal";
}

// Keyword tags used as a secondary matcher against `claim` / `claim_type`
// fields when the structured_pack's `claim_types` array isn't populated or
// doesn't match the user's dispute_type cleanly.
const DISPUTE_KEYWORDS: Record<string, string[]> = {
  // Current taxonomy (11 categories)
  landlord: ["security deposit", "deposit", "lease", "rent", "landlord", "tenant"],
  auto: ["vehicle", "auto", "property damage"],
  personal_loan: ["loan", "promissory", "written contract", "oral contract"],
  contractor: ["written contract", "oral contract", "services", "construction"],
  refund: ["sale of goods", "consumer", "written contract", "ucc"],
  online_seller: ["sale of goods", "consumer", "written contract", "ucc"],
  employer: ["wage", "wages", "employment", "minimum wage", "overtime"],
  property_damage: ["property damage"],
  medical_billing: ["medical", "open account", "consumer"],
  insurance: ["insurance", "bad faith", "written contract"],
  pet_injury: ["personal injury", "property damage"],
  // Legacy
  unpaid_debt: ["open account", "promissory", "written contract", "credit card"],
  security_deposit: ["security deposit", "deposit"],
  services_not_rendered: ["written contract", "oral contract", "services"],
  goods_not_delivered: ["sale of goods", "written contract", "ucc"],
  neighbor: ["property damage", "trespass"],
  roommate: ["oral contract", "rent"],
};

// Canonical claim_type strings used in EvidencePack. Maps a dispute_type to
// the claim_type strings that should match an SOL row or a statutory
// multiplier's claim_types array. The keys are intentionally broader than
// the EvidencePack strings (which use snake_case) — we substring-match.
const DISPUTE_CLAIM_TYPES: Record<string, string[]> = {
  landlord: ["security_deposit", "lease", "rent", "landlord", "tenant", "habitability"],
  auto: ["vehicle", "auto", "property_damage", "personal_injury"],
  personal_loan: ["written_contract", "oral_contract", "promissory_note", "loan", "open_account"],
  contractor: ["written_contract", "oral_contract", "services", "construction"],
  refund: ["sale_of_goods", "consumer", "ucc", "refund"],
  online_seller: ["sale_of_goods", "consumer", "ucc", "fraud"],
  employer: ["wage", "employment", "minimum_wage", "overtime", "waiting_time"],
  property_damage: ["property_damage"],
  medical_billing: ["medical", "open_account", "consumer"],
  insurance: ["insurance", "bad_faith", "written_contract"],
  pet_injury: ["personal_injury", "property_damage"],
  unpaid_debt: ["open_account", "promissory_note", "written_contract"],
  security_deposit: ["security_deposit", "deposit"],
  services_not_rendered: ["written_contract", "oral_contract", "services"],
  goods_not_delivered: ["sale_of_goods", "ucc", "written_contract"],
  neighbor: ["property_damage", "trespass", "nuisance"],
  roommate: ["oral_contract", "rent"],
};

// EvidencePack subset of fields we read. Defined loosely so we can tolerate
// older rows whose schema lags the latest extraction.
interface EvidencePackLite {
  statute_of_limitations_by_claim_type?: Array<{
    claim_type: string;
    years: number | null;
    citation: string;
    when_clock_starts?: string;
  }>;
  statutory_multipliers?: Array<{
    statute: string;
    multiplier: number | null;
    conditions: string;
    claim_types: string[];
  }>;
  prejudgment_interest_by_claim_type?: Array<{
    claim_type: string;
    rate_pct: number | null;
    type?: string;
    citation?: string;
    notes?: string;
  }>;
  recoverable_amounts?: {
    costs_recoverable?: string[];
    prejudgment_interest_rate_pct?: number | null;
    post_judgment_interest_rate_pct?: number | null;
    attorney_fees?: {
      available: boolean | null;
      conditions?: string;
      statute?: string;
    };
  };
  demand_letter?: {
    required?: boolean | null;
    recommended?: boolean | null;
    minimum_days_before_filing?: number | null;
    certified_mail_required?: boolean | null;
    return_receipt_required?: boolean | null;
    required_content_elements?: string[];
    notes?: string;
  };
  government_tort_claim_notice?: {
    required_for_government_defendants?: boolean | null;
    deadline_days?: number | null;
    statute?: string;
  };
  claim_limit_dollars?: number | null;
  claim_cap_tiers?: Array<{
    court_level: string;
    cap_cents: number | null;
    applies_when: string;
  }>;
  filing_fee_cents?: number | null;
  filing_fee_tiers?: Array<{
    applies_to: string;
    amount_band: string;
    fee_cents: number | null;
  }>;
  collection_details?: {
    wage_garnishment_cap_pct?: number | null;
  };
  court_name?: string;
}

function stateNameFromCode(code: string): string {
  const match = STATES.find((s) => s.abbr.toUpperCase() === code.toUpperCase());
  return match?.name || code;
}

function stateSlug(code: string): string {
  return stateNameFromCode(code).toLowerCase().replace(/\s+/g, "-");
}

function fmtCents(cents: number | null | undefined): string {
  if (cents == null) return "—";
  return `$${(cents / 100).toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

function fmtDollars(dollars: number | null | undefined): string {
  if (dollars == null) return "—";
  return `$${dollars.toLocaleString("en-US")}`;
}

// Match a claim string against keyword tags (case-insensitive, substring).
function matchesKeywords(claim: string, keywords: string[]): boolean {
  if (!claim || !keywords.length) return false;
  const lower = claim.toLowerCase();
  return keywords.some((kw) => lower.includes(kw.toLowerCase()));
}

// Match a structured_pack claim_types array against the dispute's
// claim_types (intersection of substrings).
function arrayIntersectsSubstring(haystack: string[], needles: string[]): boolean {
  if (!haystack?.length || !needles.length) return false;
  return haystack.some((h) =>
    needles.some(
      (n) =>
        h.toLowerCase().includes(n.toLowerCase()) ||
        n.toLowerCase().includes(h.toLowerCase()),
    ),
  );
}

async function loadStructuredPack(slug: string): Promise<EvidencePackLite | null> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const admin = createServiceRoleClient() as any;
    const { data } = await admin
      .from("state_research")
      .select("structured_pack")
      .eq("slug", slug)
      .maybeSingle();
    return (data?.structured_pack ?? null) as EvidencePackLite | null;
  } catch {
    return null;
  }
}

/**
 * Build the structured state law context block for the demand-letter prompt.
 *
 * @param stateCode 2-letter state abbreviation (e.g. "MN")
 * @param disputeType wizard category slug (used for keyword fallback only)
 * @param defaultCurePeriodDays fallback if nothing more specific applies
 * @param resolvedClaimTypes primary + secondary canonical legal claim types
 *   from the classifier. When supplied, drives every SOL / interest /
 *   multiplier row pick. When omitted, falls back to the static
 *   DISPUTE_CLAIM_TYPES map keyed by disputeType (legacy path).
 */
export async function buildLetterStateContext(
  stateCode: string,
  disputeType: string,
  defaultCurePeriodDays: number,
  resolvedClaimTypes?: { primary: string; secondaries: string[] },
): Promise<LetterStateContext> {
  const stateName = stateNameFromCode(stateCode);
  const simpleCtx = getStateContext(stateCode);
  const keywords = DISPUTE_KEYWORDS[disputeType] ?? [];
  // Prefer the resolved canonical claim types when present (these come from
  // the LLM classifier and reflect what actually happened). Fall back to the
  // wizard-slug-based static map only when classification is missing.
  const claimTypes = resolvedClaimTypes
    ? [resolvedClaimTypes.primary, ...resolvedClaimTypes.secondaries]
    : (DISPUTE_CLAIM_TYPES[disputeType] ?? []);

  const slug = stateSlug(stateCode);
  const [pack, guide] = await Promise.all([
    loadStructuredPack(slug),
    availableStateSlugs().includes(slug)
      ? loadStateGuide(slug).catch(() => null as StateGuide | null)
      : Promise.resolve(null as StateGuide | null),
  ]);

  // Build the context block. We prefer structured_pack fields when present,
  // fall back to legacy StateGuide, then to the simple per-state map.
  if (pack) {
    return buildFromPack(stateName, pack, guide, disputeType, claimTypes, keywords, defaultCurePeriodDays, simpleCtx);
  }
  if (guide) {
    return buildFromGuide(stateName, guide, disputeType, keywords, defaultCurePeriodDays, simpleCtx);
  }
  return buildMinimal(stateName, simpleCtx, defaultCurePeriodDays);
}

// ─────────────────────────────────────────────────────────────────────
// Builders
// ─────────────────────────────────────────────────────────────────────

function buildFromPack(
  stateName: string,
  pack: EvidencePackLite,
  guide: StateGuide | null,
  disputeType: string,
  claimTypes: string[],
  keywords: string[],
  defaultCurePeriodDays: number,
  simpleCtx: ReturnType<typeof getStateContext>,
): LetterStateContext {
  const sections: string[] = [`State-specific context for ${stateName}:`];

  // ── Applicable SOL ──
  const solRows = pack.statute_of_limitations_by_claim_type ?? [];
  const solMatches = solRows.filter((r) =>
    claimTypes.some((ct) =>
      r.claim_type?.toLowerCase().includes(ct.toLowerCase()),
    ) || matchesKeywords(r.claim_type ?? "", keywords),
  );
  const solToShow = solMatches.length > 0 ? solMatches : solRows.slice(0, 3);
  if (solToShow.length > 0) {
    const heading =
      solMatches.length > 0
        ? "APPLICABLE STATUTE OF LIMITATIONS (matched to this dispute type)"
        : "STATUTE OF LIMITATIONS (general reference; pick the row that fits the facts)";
    const lines = solToShow
      .map((e) => {
        const yrs = e.years != null ? `${e.years} years` : "see citation";
        const from = e.when_clock_starts ? ` from ${e.when_clock_starts}` : "";
        const cite = e.citation ? ` (${e.citation})` : "";
        return `- ${e.claim_type}: ${yrs}${from}${cite}`;
      })
      .join("\n");
    sections.push(`${heading}:\n${lines}`);
  }

  // ── Statutory multipliers ──
  const multipliers = pack.statutory_multipliers ?? [];
  const multMatches = multipliers.filter(
    (m) =>
      arrayIntersectsSubstring(m.claim_types ?? [], claimTypes) ||
      matchesKeywords(m.conditions ?? "", keywords),
  );
  if (multMatches.length > 0) {
    const lines = multMatches
      .map((m) => {
        const mult = m.multiplier != null ? `${m.multiplier}x` : "see statute";
        const cond = m.conditions ? ` — ${m.conditions}` : "";
        return `- ${m.statute}: ${mult}${cond}`;
      })
      .join("\n");
    sections.push(
      `STATUTORY DAMAGE MULTIPLIERS THAT MAY APPLY HERE:\n${lines}\n\nIMPORTANT: If a multiplier above clearly applies to the facts in this case, the letter must reference it explicitly and demand the multiplied amount (or warn the defendant the multiplier will be sought in court). Never invent multipliers not listed here.`,
    );
  }

  // ── Prejudgment interest ──
  const interestRows = pack.prejudgment_interest_by_claim_type ?? [];
  const interestMatch =
    interestRows.find((r) =>
      claimTypes.some((ct) =>
        r.claim_type?.toLowerCase().includes(ct.toLowerCase()),
      ),
    ) ?? interestRows[0];
  const fallbackRate =
    pack.recoverable_amounts?.prejudgment_interest_rate_pct ??
    simpleCtx?.prejudgment_interest_rate ??
    null;
  if (interestMatch?.rate_pct != null) {
    const parts = [
      `${interestMatch.rate_pct}% per year`,
      interestMatch.type ? `(${interestMatch.type})` : "",
      interestMatch.citation ? `Citation: ${interestMatch.citation}.` : "",
      interestMatch.notes || "",
    ]
      .filter(Boolean)
      .join(" ");
    sections.push(
      `PREJUDGMENT INTEREST: ${parts} If applicable to this claim, the letter may demand interest accruing from the date the obligation became due.`,
    );
  } else if (fallbackRate != null) {
    sections.push(
      `PREJUDGMENT INTEREST: ${fallbackRate}% per year in ${stateName}.`,
    );
  }

  // ── Recoverable costs + attorney fees ──
  const costLines: string[] = [];
  if (pack.recoverable_amounts?.costs_recoverable?.length) {
    costLines.push(
      `Costs recoverable from the defendant if the plaintiff prevails: ${pack.recoverable_amounts.costs_recoverable.join(", ")}.`,
    );
  }
  if (pack.recoverable_amounts?.attorney_fees?.available) {
    const af = pack.recoverable_amounts.attorney_fees;
    const conds = af.conditions ? ` Conditions: ${af.conditions}` : "";
    const cite = af.statute ? ` Citation: ${af.statute}.` : "";
    costLines.push(`Attorney fees recoverable.${conds}${cite}`);
  }
  if (costLines.length > 0) {
    sections.push(
      `RECOVERABLE COSTS AND FEES:\n${costLines.map((l) => `- ${l}`).join("\n")}`,
    );
  }

  // ── Demand-letter pre-suit requirements ──
  const dl = pack.demand_letter;
  const preLines: string[] = [];
  if (dl?.required) {
    preLines.push("A pre-suit demand letter is REQUIRED in this state for some claim types.");
  } else if (dl?.recommended) {
    preLines.push("A pre-suit demand letter is strongly recommended.");
  }
  if (dl?.certified_mail_required) {
    preLines.push(
      `Certified mail is required${dl.return_receipt_required ? " with return receipt requested" : ""}.`,
    );
  }
  if (dl?.required_content_elements?.length) {
    preLines.push(
      `Required content elements: ${dl.required_content_elements.join("; ")}.`,
    );
  }
  if (dl?.notes) {
    preLines.push(dl.notes);
  }
  // Government tort notice — separate, structured
  const gov = pack.government_tort_claim_notice;
  if (gov?.required_for_government_defendants && gov.deadline_days != null) {
    preLines.push(
      `If the defendant is a government entity, a separate tort claim notice with a ${gov.deadline_days}-day deadline applies${gov.statute ? ` (${gov.statute})` : ""}. The cure period must respect that deadline.`,
    );
  }
  if (preLines.length > 0) {
    sections.push(
      `DEMAND-LETTER REQUIREMENTS:\n${preLines.map((l) => `- ${l}`).join("\n")}`,
    );
  }

  // ── Jurisdictional context / filing pressure (Priority 3) ──
  const cap =
    pack.claim_limit_dollars ??
    (pack.claim_cap_tiers?.[0]?.cap_cents != null
      ? Math.round(pack.claim_cap_tiers[0].cap_cents / 100)
      : null) ??
    guide?.limits?.individual ??
    simpleCtx?.small_claims_max_dollars ??
    null;
  if (cap != null) {
    const courtName = pack.court_name || guide?.whereToFile?.courtName || "small claims";
    sections.push(
      `SMALL-CLAIMS JURISDICTION: The cap in ${courtName} is ${fmtDollars(cap)}. The current claim is within (or close to) this limit and can be filed if not resolved.`,
    );
  }
  const filingFeeCents =
    pack.filing_fee_tiers?.[0]?.fee_cents ?? pack.filing_fee_cents ?? null;
  if (filingFeeCents != null) {
    sections.push(
      `FILING COST PRESSURE: Filing fee starts at ${fmtCents(filingFeeCents)}; the plaintiff will seek this as a recoverable cost if a suit is filed.`,
    );
  }
  if (pack.collection_details?.wage_garnishment_cap_pct != null) {
    sections.push(
      `POST-JUDGMENT LEVERAGE: ${stateName} permits wage garnishment up to ${pack.collection_details.wage_garnishment_cap_pct}% of disposable earnings after a judgment.`,
    );
  }

  // ── LLM guidance ──
  sections.push(
    "GUIDANCE FOR THE LLM:\n" +
      "- Quote the specific SOL statute from above (not a generic one) when describing the deadline.\n" +
      "- If a statutory multiplier applies to the facts, demand the multiplied amount and cite the statute verbatim.\n" +
      "- Mention prejudgment interest accruing if the claim type supports it.\n" +
      "- Note that filing/service costs will be sought as recoverable costs.\n" +
      "- Use the cure period the system supplied; do not invent your own deadline.",
  );

  // ── Cure period — structured first, then heuristic, then default ──
  let curePeriodDays = defaultCurePeriodDays;
  // Government tort beats everything if applicable and shorter than default.
  // (We never auto-detect "is defendant a government entity" yet; we leave
  // this as future work — for now structured min_days_before_filing wins.)
  if (
    typeof dl?.minimum_days_before_filing === "number" &&
    dl.minimum_days_before_filing > curePeriodDays &&
    dl.minimum_days_before_filing <= 180
  ) {
    curePeriodDays = dl.minimum_days_before_filing;
  }

  return {
    contextBlock: sections.join("\n\n"),
    curePeriodDays,
    stateEnhanced: true,
    source: "structured_pack",
  };
}

function buildFromGuide(
  stateName: string,
  guide: StateGuide,
  disputeType: string,
  keywords: string[],
  defaultCurePeriodDays: number,
  simpleCtx: ReturnType<typeof getStateContext>,
): LetterStateContext {
  const sections: string[] = [`State-specific context for ${stateName}:`];

  // SOL
  const matchedSol = matchByKeywordsT<StatuteOfLimitationsEntry>(
    guide.statuteOfLimitations.entries,
    keywords,
  );
  const solRows = matchedSol.length > 0 ? matchedSol : guide.statuteOfLimitations.entries.slice(0, 3);
  if (solRows.length > 0) {
    const heading =
      matchedSol.length > 0
        ? "APPLICABLE STATUTE OF LIMITATIONS (matched to this dispute type)"
        : "STATUTE OF LIMITATIONS (general reference; pick the row that fits the facts)";
    sections.push(`${heading}:\n${formatSolEntries(solRows)}`);
  }

  // Multipliers
  const matchedMult = matchByKeywordsT<StatutoryMultiplier>(
    guide.damages.statutoryMultipliers,
    keywords,
  );
  if (matchedMult.length > 0) {
    sections.push(
      `STATUTORY DAMAGE MULTIPLIERS THAT MAY APPLY HERE:\n${formatMultipliers(matchedMult)}\n\nIMPORTANT: If a multiplier above clearly applies to the facts, the letter must reference it explicitly and demand the multiplied amount. Never invent multipliers not listed here.`,
    );
  }

  // Interest
  const interest = guide.damages.interestRate;
  if (interest && typeof interest.rate === "number" && interest.rate > 0) {
    const parts = [
      `${interest.rate}% per year, ${interest.type}.`,
      interest.statute ? `Citation: ${interest.statute}.` : "",
      interest.notes || "",
    ]
      .filter(Boolean)
      .join(" ");
    sections.push(`PREJUDGMENT INTEREST: ${parts}`);
  } else if (simpleCtx) {
    sections.push(
      `PREJUDGMENT INTEREST: ${simpleCtx.prejudgment_interest_rate}% per year, simple.`,
    );
  }

  // Recoverable costs
  const costLines: string[] = [];
  if (guide.damages.feesRecoverable) {
    costLines.push("Filing fees, service fees, and other costs are recoverable from the defendant.");
  }
  if (guide.damages.attorneyFees?.available) {
    costLines.push(`Attorney fees may be recoverable. ${guide.damages.attorneyFees.explanation || ""}`.trim());
  }
  if (costLines.length > 0) {
    sections.push(`RECOVERABLE COSTS AND FEES:\n${costLines.map((l) => `- ${l}`).join("\n")}`);
  }

  // Pre-filing
  const pre = guide.preFiling;
  const preLines: string[] = [];
  if (pre.demandLetterRequired) preLines.push("Pre-suit demand letter REQUIRED for some claim types.");
  else if (pre.demandLetterRecommended) preLines.push("Pre-suit demand letter strongly recommended.");
  if (pre.demandLetterNotes) preLines.push(pre.demandLetterNotes);
  if (pre.governmentClaimRequired) {
    preLines.push(
      pre.governmentClaimNotes ||
        "If the defendant is a government entity, a separate tort claim notice with a shorter deadline applies.",
    );
  }
  if (preLines.length > 0) {
    sections.push(`DEMAND-LETTER REQUIREMENTS:\n${preLines.map((l) => `- ${l}`).join("\n")}`);
  }

  const cap = guide.limits?.individual;
  if (cap) {
    sections.push(
      `SMALL-CLAIMS JURISDICTION: The cap in ${guide.whereToFile?.courtName || stateName} is ${fmtDollars(cap)}.`,
    );
  }
  if (guide.fees?.tiers?.length) {
    sections.push(
      `FILING COST PRESSURE: Filing fee starts at $${guide.fees.tiers[0].amount}. The plaintiff will seek this as a recoverable cost.`,
    );
  }

  sections.push(
    "GUIDANCE FOR THE LLM:\n" +
      "- Quote the specific SOL statute from above; do not invent.\n" +
      "- If a statutory multiplier applies, demand the multiplied amount and cite the statute.\n" +
      "- Mention prejudgment interest accruing if applicable.\n" +
      "- Note recoverable costs.\n" +
      "- Use the cure period the system supplied.",
  );

  // Cure period via the legacy regex (last-resort, never shortens)
  let curePeriodDays = defaultCurePeriodDays;
  if (pre.demandLetterNotes) {
    const m = pre.demandLetterNotes.toLowerCase().match(/(\d{1,3})[-\s]*day/);
    if (m) {
      const n = parseInt(m[1], 10);
      if (!Number.isNaN(n) && n > curePeriodDays && n <= 180) curePeriodDays = n;
    }
  }

  return {
    contextBlock: sections.join("\n\n"),
    curePeriodDays,
    stateEnhanced: true,
    source: "state_guide",
  };
}

function buildMinimal(
  stateName: string,
  simpleCtx: ReturnType<typeof getStateContext>,
  defaultCurePeriodDays: number,
): LetterStateContext {
  const lines: string[] = [`State-specific context for ${stateName}:`];
  if (simpleCtx) {
    lines.push(
      `Prejudgment interest: ${simpleCtx.prejudgment_interest_rate}% per year, simple.`,
    );
    lines.push(
      `Small-claims jurisdictional cap: ${fmtDollars(simpleCtx.small_claims_max_dollars)}.`,
    );
  }
  lines.push(
    "Court filing fees, certified-mail costs, and service-of-process fees are typically recoverable from the defendant if the plaintiff prevails.",
  );
  return {
    contextBlock: lines.join("\n\n"),
    curePeriodDays: defaultCurePeriodDays,
    stateEnhanced: false,
    source: "minimal",
  };
}

// ─────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────

function matchByKeywordsT<T extends { claim: string }>(
  entries: T[],
  keywords: string[],
): T[] {
  if (!keywords.length || !entries.length) return [];
  return entries.filter((e) => matchesKeywords(e.claim || "", keywords));
}

function formatSolEntries(entries: StatuteOfLimitationsEntry[]): string {
  return entries
    .map((e) => {
      const parts = [
        `- ${e.claim}: ${e.years} years`,
        e.clockStart ? `from ${e.clockStart}` : null,
        e.statute ? `(${e.statute})` : null,
      ].filter(Boolean);
      const main = parts.join(" ");
      return e.notes ? `${main}\n    Note: ${e.notes}` : main;
    })
    .join("\n");
}

function formatMultipliers(items: StatutoryMultiplier[]): string {
  return items
    .map((m) => `- ${m.claim}: ${m.multiplier} (${m.statute})`)
    .join("\n");
}

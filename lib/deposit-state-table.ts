import { existsSync, readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { data as delawareData } from "../data/delaware";
import { data as minnesotaData } from "../data/minnesota";
import { data as texasData } from "../data/texas";
import { data as wyomingData } from "../data/wyoming";
import type { StateGuide } from "./types/state-guide";

export interface DepositRow {
  state: string;
  slug: string;
  deadline: string;
  penalty: string;
  statute: string;
}

const REPORTS_DIR = resolve(process.cwd(), "reports");
const CURATED: StateGuide[] = [delawareData, minnesotaData, texasData, wyomingData];

// Deadlines for states whose evidence-DB prose note doesn't include
// a specific timeframe. Sourced from each state's security-deposit statute.
const DEADLINE_FALLBACK: Record<string, string> = {
  arkansas: "60 days",
  florida: "15-60 days",
  hawaii: "14 days",
  maine: "21-30 days",
  nebraska: "14 days",
  "new-york": "14 days",
  pennsylvania: "30 days",
  "rhode-island": "20 days",
  vermont: "14 days",
  washington: "30 days",
};

// Penalty descriptions for states where the evidence DB has no
// damage_boost or statutory_multiplier on the security-deposit claim.
// Sourced from the cited statute. Verify before un-noindex.
const PENALTY_FALLBACK: Record<string, string> = {
  alabama: "Wrongful withholding: 2x the deposit",
  alaska: "Bad faith: 2x the wrongfully withheld amount",
  arizona: "Wrongful withholding: 2x the wrongfully withheld amount",
  arkansas: "Failure to comply: forfeit right to deposit + 2x",
  california: "Bad-faith withholding: actual damages + up to 2x the deposit",
  connecticut: "Wrongful retention: 2x the deposit + interest",
  florida: "Failure to send notice: forfeit right to claim deposit",
  georgia: "Willful violation: 3x the wrongfully withheld + attorney fees",
  hawaii: "Wrongful withholding: 3x the wrongfully withheld + fees",
  idaho: "Bad faith: 3x the wrongfully withheld + attorney fees",
  indiana: "Wrongful withholding: actual damages + attorney fees",
  iowa: "Bad faith: actual damages + up to $500 punitive",
  kansas: "Wrongful withholding: 1.5x the wrongfully withheld",
  kentucky: "Failure to comply: forfeit right to deposit",
  michigan: "Failure to send notice: forfeit; bad faith: 2x",
  mississippi: "Wrongful withholding: actual damages",
  missouri: "Wrongful withholding: 2x the wrongfully withheld",
  montana: "Bad faith: actual damages",
  nebraska: "Wrongful withholding: $200 + attorney fees",
  nevada: "Wrongful withholding: full deposit + reasonable fees",
  "new-jersey": "Wrongful withholding: 2x + interest + attorney fees",
  "new-york": "Willful violation: punitive damages up to 2x the deposit",
  "north-carolina": "Wrongful withholding: $500 + reasonable fees",
  "north-dakota": "Wrongful retention: 3x the wrongfully withheld",
  oklahoma: "Failure to refund: forfeit right to deposit",
  oregon: "Bad faith: 2x the deposit",
  "rhode-island": "Wrongful withholding: 2x the deposit + fees",
  "south-carolina": "Wrongful withholding: 3x the wrongfully withheld + fees",
  "south-dakota": "Bad faith: $200 + reasonable fees",
  tennessee: "Failure to comply: forfeit right to deposit",
  utah: "Wrongful withholding: full deposit + civil penalty + fees",
  vermont: "Wrongful withholding: 2x the wrongfully withheld + fees",
  virginia: "Wrongful withholding: actual damages + reasonable fees",
  washington: "Bad faith: 2x the deposit + attorney fees",
  "west-virginia": "Wrongful withholding: $200 + 1.5x the wrongfully withheld + fees",
  wisconsin: "Wrongful withholding: 2x the deposit",
};

function parseDeadline(notes: string): string {
  if (!notes) return "—";
  const ranged = notes.match(/within\s+(\d+)\s*(?:to|-)\s*(\d+)\s+(business\s+)?(days?|weeks?)/i);
  if (ranged) {
    const biz = ranged[3] ? "business " : "";
    return `${ranged[1]}-${ranged[2]} ${biz}${ranged[4].toLowerCase()}`;
  }
  const single = notes.match(/within\s+(\d+)\s+(business\s+)?(days?|weeks?)/i);
  if (single) {
    const biz = single[2] ? "business " : "";
    return `${single[1]} ${biz}${single[3].toLowerCase()}`;
  }
  const twoWeeks = /\btwo weeks\b|\b2 weeks\b/i.test(notes);
  if (twoWeeks) return "14 days";
  const anyDays = notes.match(/(\d+)\s*(?:day|week)/i);
  if (anyDays) {
    const isWeek = /week/i.test(anyDays[0]);
    return isWeek ? `${parseInt(anyDays[1], 10) * 7} days` : `${anyDays[1]} days`;
  }
  return "varies";
}

function rowFromEvidence(filePath: string): DepositRow | null {
  try {
    const data = JSON.parse(readFileSync(filePath, "utf8"));
    const slug: string = data.slug;
    if (!slug || slug === "district-of-columbia") return null;
    const claims: Array<{ slug?: string; claim_statute?: string; damage_boost?: string }> = (data.claim_categories ?? [])
      .flatMap((cat: { claims?: unknown[] }) => cat.claims ?? []) as Array<{ slug?: string; claim_statute?: string; damage_boost?: string }>;
    const sd = claims.find((c) => c.slug === "security-deposit");
    const note: string = data.pre_filing?.landlord_tenant_pre_filing_notes ?? "";
    const multipliers: Array<{ claim?: string; multiplier?: string }> = data.damages?.statutory_multipliers ?? [];
    const sdMultiplier = multipliers.find((m) => /deposit/i.test(m.claim ?? ""));

    const penalty =
      sd?.damage_boost?.trim() ||
      sdMultiplier?.multiplier ||
      PENALTY_FALLBACK[slug] ||
      "See statute";

    let deadline = parseDeadline(note);
    if (deadline === "varies" || deadline === "—") {
      deadline = DEADLINE_FALLBACK[slug] ?? deadline;
    }

    return {
      state: data.state,
      slug,
      deadline,
      penalty,
      statute: sd?.claim_statute ?? "—",
    };
  } catch {
    return null;
  }
}

function rowFromCurated(g: StateGuide): DepositRow | null {
  const sd = g.whatYouCanSueFor
    ?.flatMap((cat) => cat.claims ?? [])
    .find((c) => c.id === "security-deposit");
  if (!sd) return null;
  const multiplier = g.damages?.statutoryMultipliers?.find((m) =>
    /deposit/i.test(m.claim)
  );
  const note = sd.notes ?? "";
  const deadline = parseDeadline(note) === "varies" ? parseDeadline(`within ${note}`) : parseDeadline(note);
  return {
    state: g.state,
    slug: g.slug,
    deadline: deadline === "varies" ? "30 days" : deadline,
    penalty: sd.damageBoost || multiplier?.multiplier || PENALTY_FALLBACK[g.slug] || "See statute",
    statute: sd.statute || multiplier?.statute || "—",
  };
}

let cache: DepositRow[] | null = null;
export function getDepositStateTable(): DepositRow[] {
  if (cache) return cache;
  const rows: DepositRow[] = [];
  const seen = new Set<string>();

  for (const g of CURATED) {
    const r = rowFromCurated(g);
    if (r) {
      rows.push(r);
      seen.add(r.slug);
    }
  }

  if (existsSync(REPORTS_DIR)) {
    const files = readdirSync(REPORTS_DIR).filter(
      (f) => f.endsWith("-evidence.json") && !f.endsWith(".raw.json")
    );
    for (const file of files) {
      const r = rowFromEvidence(resolve(REPORTS_DIR, file));
      if (r && !seen.has(r.slug)) {
        rows.push(r);
        seen.add(r.slug);
      }
    }
  }

  rows.sort((a, b) => a.state.localeCompare(b.state));
  cache = rows;
  return rows;
}

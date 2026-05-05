// Index of all contractor issues. The [issue]/page.tsx route uses this list
// to generate static params and pick the right issue data for rendering.

import type { ContractorIssue } from "./types";
import { depositAndDisappearing } from "./deposit-and-disappearing";
import { unfinishedWork } from "./unfinished-work";
import { poorWorkmanship } from "./poor-workmanship";
import { damagedHouse } from "./damaged-house";
import { handymanBadWork } from "./handyman-bad-work";
import { plumberDamage } from "./plumber-damage";
import { rooferLeakingRoof } from "./roofer-leaking-roof";
import { painterDamage } from "./painter-damage";
import { landscaperBadWork } from "./landscaper-bad-work";
import { movingCompanyDamage } from "./moving-company-damage";
import { movingCompanyLostItems } from "./moving-company-lost-items";

export const CONTRACTOR_ISSUES: readonly ContractorIssue[] = [
  depositAndDisappearing,
  unfinishedWork,
  poorWorkmanship,
  damagedHouse,
  handymanBadWork,
  plumberDamage,
  rooferLeakingRoof,
  painterDamage,
  landscaperBadWork,
  movingCompanyDamage,
  movingCompanyLostItems,
] as const;

export const CONTRACTOR_ISSUES_BY_SLUG: Record<string, ContractorIssue> = Object.fromEntries(
  CONTRACTOR_ISSUES.map((i) => [i.slug, i])
);

export function getContractorIssue(slug: string): ContractorIssue | null {
  return CONTRACTOR_ISSUES_BY_SLUG[slug] ?? null;
}

export type { ContractorIssue } from "./types";

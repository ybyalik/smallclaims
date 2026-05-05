// Index of all contractor issues. The [issue]/page.tsx route uses this list
// to generate static params and pick the right issue data for rendering.

import type { ContractorIssue } from "./types";
import { depositAndDisappearing } from "./deposit-and-disappearing";

export const CONTRACTOR_ISSUES: readonly ContractorIssue[] = [
  depositAndDisappearing,
] as const;

export const CONTRACTOR_ISSUES_BY_SLUG: Record<string, ContractorIssue> = Object.fromEntries(
  CONTRACTOR_ISSUES.map((i) => [i.slug, i])
);

export function getContractorIssue(slug: string): ContractorIssue | null {
  return CONTRACTOR_ISSUES_BY_SLUG[slug] ?? null;
}

export type { ContractorIssue } from "./types";

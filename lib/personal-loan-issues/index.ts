import type { PersonalLoanIssue } from "./types";

export const PERSONAL_LOAN_ISSUES: readonly PersonalLoanIssue[] = [] as const;

export const PERSONAL_LOAN_ISSUES_BY_SLUG: Record<string, PersonalLoanIssue> = Object.fromEntries(
  PERSONAL_LOAN_ISSUES.map((i) => [i.slug, i])
);

export function getPersonalLoanIssue(slug: string): PersonalLoanIssue | null {
  return PERSONAL_LOAN_ISSUES_BY_SLUG[slug] ?? null;
}

export type { PersonalLoanIssue } from "./types";

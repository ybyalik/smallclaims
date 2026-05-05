// Index of all employer issues. The [issue]/page.tsx route uses this list
// to generate static params and pick the right issue data for rendering.

import type { EmployerIssue } from "./types";
import { wrongfulTermination } from "./wrongful-termination";

export const EMPLOYER_ISSUES: readonly EmployerIssue[] = [
  wrongfulTermination,
] as const;

export const EMPLOYER_ISSUES_BY_SLUG: Record<string, EmployerIssue> = Object.fromEntries(
  EMPLOYER_ISSUES.map((i) => [i.slug, i])
);

export function getEmployerIssue(slug: string): EmployerIssue | null {
  return EMPLOYER_ISSUES_BY_SLUG[slug] ?? null;
}

export type { EmployerIssue } from "./types";

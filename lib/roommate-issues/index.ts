import type { RoommateIssue } from "./types";

export const ROOMMATE_ISSUES: readonly RoommateIssue[] = [] as const;

export const ROOMMATE_ISSUES_BY_SLUG: Record<string, RoommateIssue> = Object.fromEntries(
  ROOMMATE_ISSUES.map((i) => [i.slug, i])
);

export function getRoommateIssue(slug: string): RoommateIssue | null {
  return ROOMMATE_ISSUES_BY_SLUG[slug] ?? null;
}

export type { RoommateIssue } from "./types";

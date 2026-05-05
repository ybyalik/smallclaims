// Index of all auto issues. The [issue]/page.tsx route uses this list
// to generate static params and pick the right issue data for rendering.

import type { AutoIssue } from "./types";
import { lemonCar } from "./lemon-car";

export const AUTO_ISSUES: readonly AutoIssue[] = [
  lemonCar,
] as const;

export const AUTO_ISSUES_BY_SLUG: Record<string, AutoIssue> = Object.fromEntries(
  AUTO_ISSUES.map((i) => [i.slug, i])
);

export function getAutoIssue(slug: string): AutoIssue | null {
  return AUTO_ISSUES_BY_SLUG[slug] ?? null;
}

export type { AutoIssue } from "./types";

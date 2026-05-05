// Index of all employer issues. The [issue]/page.tsx route uses this list
// to generate static params and pick the right issue data for rendering.

import type { EmployerIssue } from "./types";
import { wrongfulTermination } from "./wrongful-termination";
import { firedWithoutWarning } from "./fired-without-warning";
import { emotionalDistress } from "./emotional-distress";
import { hostileWorkEnvironment } from "./hostile-work-environment";
import { retaliation } from "./retaliation";
import { unpaidWages } from "./unpaid-wages";
import { noW2 } from "./no-w2";
import { unsafeWorkingConditions } from "./unsafe-working-conditions";
import { lastPaycheck } from "./last-paycheck";
import { stolenTips } from "./stolen-tips";

export const EMPLOYER_ISSUES: readonly EmployerIssue[] = [
  wrongfulTermination,
  firedWithoutWarning,
  emotionalDistress,
  hostileWorkEnvironment,
  retaliation,
  unpaidWages,
  noW2,
  unsafeWorkingConditions,
  lastPaycheck,
  stolenTips,
] as const;

export const EMPLOYER_ISSUES_BY_SLUG: Record<string, EmployerIssue> = Object.fromEntries(
  EMPLOYER_ISSUES.map((i) => [i.slug, i])
);

export function getEmployerIssue(slug: string): EmployerIssue | null {
  return EMPLOYER_ISSUES_BY_SLUG[slug] ?? null;
}

export type { EmployerIssue } from "./types";

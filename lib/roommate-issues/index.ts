import type { RoommateIssue } from "./types";
import { unpaidRent } from "./unpaid-rent";
import { unpaidBills } from "./unpaid-bills";
import { movingOutNoNotice } from "./moving-out-no-notice";
import { propertyDamageOrTheft } from "./property-damage-or-theft";
import { securityDeposit } from "./security-deposit";
import { noLease } from "./no-lease";
import { emotionalDistress } from "./emotional-distress";

export const ROOMMATE_ISSUES: readonly RoommateIssue[] = [
  unpaidRent,
  unpaidBills,
  movingOutNoNotice,
  propertyDamageOrTheft,
  securityDeposit,
  noLease,
  emotionalDistress,
] as const;

export const ROOMMATE_ISSUES_BY_SLUG: Record<string, RoommateIssue> = Object.fromEntries(
  ROOMMATE_ISSUES.map((i) => [i.slug, i])
);

export function getRoommateIssue(slug: string): RoommateIssue | null {
  return ROOMMATE_ISSUES_BY_SLUG[slug] ?? null;
}

export type { RoommateIssue } from "./types";

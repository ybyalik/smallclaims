// Index of all landlord issues. The [issue]/page.tsx route uses this list
// to generate static params and pick the right issue data for rendering.

import type { LandlordIssue } from "./types";
import { securityDeposit } from "./security-deposit";
import { mold } from "./mold";
import { wrongfulEviction } from "./wrongful-eviction";
import { illegalLockout } from "./illegal-lockout";
import { pestInfestation } from "./pest-infestation";
import { harassment } from "./harassment";
import { emotionalDistress } from "./emotional-distress";
import { apartmentComplex } from "./apartment-complex";
import { unsafeConditions } from "./unsafe-conditions";
import { afterMovingOut } from "./after-moving-out";
import { breakLease } from "./break-lease";

export const ISSUES: readonly LandlordIssue[] = [
  securityDeposit,
  mold,
  wrongfulEviction,
  illegalLockout,
  pestInfestation,
  harassment,
  emotionalDistress,
  apartmentComplex,
  unsafeConditions,
  afterMovingOut,
  breakLease,
] as const;

export const ISSUES_BY_SLUG: Record<string, LandlordIssue> = Object.fromEntries(
  ISSUES.map((i) => [i.slug, i])
);

export function getIssue(slug: string): LandlordIssue | null {
  return ISSUES_BY_SLUG[slug] ?? null;
}

export type { LandlordIssue } from "./types";

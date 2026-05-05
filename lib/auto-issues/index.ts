// Index of all auto issues. The [issue]/page.tsx route uses this list
// to generate static params and pick the right issue data for rendering.

import type { AutoIssue } from "./types";
import { parkedCarHit } from "./parked-car-hit";
import { dealershipFraud } from "./dealership-fraud";
import { dealershipUndisclosedDamage } from "./dealership-undisclosed-damage";
import { towingDamage } from "./towing-damage";
import { mechanicBadWork } from "./mechanic-bad-work";
import { mechanicOvercharging } from "./mechanic-overcharging";
import { mechanicTookTooLong } from "./mechanic-took-too-long";
import { valetDamage } from "./valet-damage";
import { lemonCar } from "./lemon-car";

export const AUTO_ISSUES: readonly AutoIssue[] = [
  parkedCarHit,
  dealershipFraud,
  dealershipUndisclosedDamage,
  towingDamage,
  mechanicBadWork,
  mechanicOvercharging,
  mechanicTookTooLong,
  valetDamage,
  lemonCar,
] as const;

export const AUTO_ISSUES_BY_SLUG: Record<string, AutoIssue> = Object.fromEntries(
  AUTO_ISSUES.map((i) => [i.slug, i])
);

export function getAutoIssue(slug: string): AutoIssue | null {
  return AUTO_ISSUES_BY_SLUG[slug] ?? null;
}

export type { AutoIssue } from "./types";

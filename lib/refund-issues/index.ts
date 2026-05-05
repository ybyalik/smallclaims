import type { RefundIssue } from "./types";
import { refundGeneral } from "./refund-general";
import { gymMembership } from "./gym-membership";
import { dryCleaner } from "./dry-cleaner";
import { salonOrHairdresser } from "./salon-or-hairdresser";
import { defectiveProduct } from "./defective-product";
import { servicesNotRendered } from "./services-not-rendered";

export const REFUND_ISSUES: readonly RefundIssue[] = [
  refundGeneral,
  gymMembership,
  dryCleaner,
  salonOrHairdresser,
  defectiveProduct,
  servicesNotRendered,
] as const;

export const REFUND_ISSUES_BY_SLUG: Record<string, RefundIssue> = Object.fromEntries(
  REFUND_ISSUES.map((i) => [i.slug, i])
);

export function getRefundIssue(slug: string): RefundIssue | null {
  return REFUND_ISSUES_BY_SLUG[slug] ?? null;
}

export type { RefundIssue } from "./types";

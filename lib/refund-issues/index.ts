import type { RefundIssue } from "./types";

export const REFUND_ISSUES: readonly RefundIssue[] = [] as const;

export const REFUND_ISSUES_BY_SLUG: Record<string, RefundIssue> = Object.fromEntries(
  REFUND_ISSUES.map((i) => [i.slug, i])
);

export function getRefundIssue(slug: string): RefundIssue | null {
  return REFUND_ISSUES_BY_SLUG[slug] ?? null;
}

export type { RefundIssue } from "./types";

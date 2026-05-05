import type { OnlineSellerIssue } from "./types";

export const ONLINE_SELLER_ISSUES: readonly OnlineSellerIssue[] = [] as const;

export const ONLINE_SELLER_ISSUES_BY_SLUG: Record<string, OnlineSellerIssue> = Object.fromEntries(
  ONLINE_SELLER_ISSUES.map((i) => [i.slug, i])
);

export function getOnlineSellerIssue(slug: string): OnlineSellerIssue | null {
  return ONLINE_SELLER_ISSUES_BY_SLUG[slug] ?? null;
}

export type { OnlineSellerIssue } from "./types";

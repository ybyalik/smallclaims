import type { OnlineSellerIssue } from "./types";
import { onlineSellerGeneral } from "./online-seller-general";
import { amazonSeller } from "./amazon-seller";
import { ebaySeller } from "./ebay-seller";
import { etsySeller } from "./etsy-seller";
import { facebookMarketplace } from "./facebook-marketplace";
import { venmoCashappScam } from "./venmo-cashapp-scam";
import { doordashUber } from "./doordash-uber";
import { fedexPackage } from "./fedex-package";

export const ONLINE_SELLER_ISSUES: readonly OnlineSellerIssue[] = [
  onlineSellerGeneral,
  amazonSeller,
  ebaySeller,
  etsySeller,
  facebookMarketplace,
  venmoCashappScam,
  doordashUber,
  fedexPackage,
] as const;

export const ONLINE_SELLER_ISSUES_BY_SLUG: Record<string, OnlineSellerIssue> = Object.fromEntries(
  ONLINE_SELLER_ISSUES.map((i) => [i.slug, i])
);

export function getOnlineSellerIssue(slug: string): OnlineSellerIssue | null {
  return ONLINE_SELLER_ISSUES_BY_SLUG[slug] ?? null;
}

export type { OnlineSellerIssue } from "./types";

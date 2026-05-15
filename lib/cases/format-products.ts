// Helper that turns a paidProductsForCase Set into a list of product
// chips for display on the case lists. One chip per logical product:
// the two demand-letter tiers (tier_send_letter, tier_full_pressure)
// collapse into a single "Demand Letter" chip so the user doesn't see
// the internal tier name. Order is canonical (letter → filing → plan)
// so the chips render in the natural funnel order.

import type { ProductKey } from "../stripe";

export interface ProductBadge {
  key: "demand_letter" | "filing_kit" | "collection_plan";
  label: string;
  // Lucide-react icon name as a string. The view component picks the
  // actual icon component from a small lookup so this file stays free of
  // React imports (so it can be used in server components and APIs).
  icon: "Mail" | "FileText" | "Wallet";
}

const ALL: ProductBadge[] = [
  { key: "demand_letter", label: "Demand Letter", icon: "Mail" },
  { key: "filing_kit", label: "Filing Kit", icon: "FileText" },
  { key: "collection_plan", label: "Collection Plan", icon: "Wallet" },
];

export function productBadgesForCase(
  paidSet: ReadonlySet<ProductKey>,
): ProductBadge[] {
  const has = {
    letter: paidSet.has("tier_send_letter") || paidSet.has("tier_full_pressure"),
    filing: paidSet.has("filing_guide"),
    plan: paidSet.has("collection_plan"),
  };
  return ALL.filter((b) => {
    if (b.key === "demand_letter") return has.letter;
    if (b.key === "filing_kit") return has.filing;
    return has.plan;
  });
}

// Renders the per-case product chips on the dashboard case lists. Server
// component (no hooks); accepts a list of ProductBadge from
// lib/cases/format-products.ts.

import { Mail, FileText, Wallet, type LucideIcon } from "lucide-react";
import type { ProductBadge } from "../../lib/cases/format-products";

const ICONS: Record<ProductBadge["icon"], LucideIcon> = {
  Mail,
  FileText,
  Wallet,
};

interface Props {
  badges: ProductBadge[];
  emptyHint?: string;
}

export default function ProductChipList({ badges, emptyHint }: Props) {
  if (badges.length === 0) {
    return emptyHint ? (
      <span className="app-case-products-empty">{emptyHint}</span>
    ) : null;
  }
  return (
    <ul className="app-case-products">
      {badges.map((b) => {
        const Icon = ICONS[b.icon];
        return (
          <li key={b.key} className="app-case-product-chip">
            <Icon size={13} strokeWidth={2} aria-hidden="true" />
            <span>{b.label}</span>
          </li>
        );
      })}
    </ul>
  );
}

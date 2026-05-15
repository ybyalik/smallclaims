// Customer-facing status pill. One component replaces the hand-rolled
// `app-case-status` and `product-timeline-pill` spans scattered across
// dashboard / cases list / case page / product timeline.
//
// Admin pills (`admin-pill`) intentionally use a separate styling system
// and live in dense tables — they're not consolidated here yet.

import type { ReactNode } from "react";

export type StatusTone = "neutral" | "active" | "done";

interface Props {
  tone: StatusTone;
  children: ReactNode;
  // "app" → the fixed-width 104px pill used in case lists + page headers.
  // "product" → the inline pill used inside the product timeline cards.
  variant?: "app" | "product";
  className?: string;
}

export default function StatusBadge({ tone, children, variant = "app", className }: Props) {
  const base = variant === "product" ? "product-timeline-pill" : "app-case-status";
  const toneClass = variant === "product"
    ? (tone === "done" ? "product-timeline-pill-done" : "")
    : `app-case-status-${tone}`;
  return (
    <span className={[base, toneClass, className].filter(Boolean).join(" ")}>
      {children}
    </span>
  );
}

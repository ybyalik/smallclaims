// Status pill for the case list. Intentionally minimal: just the case
// lifecycle (draft / ready / settled / closed). Product progress is
// surfaced separately via the Products column on the case list (see
// lib/cases/format-products.ts).
//
// We deliberately do NOT mix product state into the status pill anymore.
// Mixing them led to "Ready" for a case with a collection plan purchased
// (because the status logic only knew about the demand letter) and other
// confusing cross-products. Now: status answers "where is this case in
// its lifecycle?" and products answer "what has the customer bought?".

import type { Case } from "../supabase/types";

export type StatusTone = "neutral" | "active" | "done";

export interface DerivedStatus {
  label: string;
  tone: StatusTone;
}

type CaseShape = Pick<Case, "status">;

export function deriveStatusLabel({ c }: { c: CaseShape }): DerivedStatus {
  if (c.status === "settled") return { label: "Settled", tone: "done" };
  if (c.status === "closed") return { label: "Closed", tone: "done" };
  if (c.status === "draft") return { label: "Draft", tone: "neutral" };
  // Everything else (active + legacy granular statuses) → Ready.
  return { label: "Ready", tone: "active" };
}

import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "../../../../lib/supabase/server";
import type { Case, Payment } from "../../../../lib/supabase/types";
import { deriveStatusLabel } from "../../../../lib/cases/derive-status-label";
import {
  disputeTypeOtherFrom,
  formatDisputeTypeShort,
} from "../../../../lib/cases/dispute-type-label";
import { productBadgesForCase } from "../../../../lib/cases/format-products";
import ProductChipList from "../../../../components/cases/ProductChipList";
import PageHead from "../../../../components/layout/PageHead";
import StatusBadge from "../../../../components/ui/StatusBadge";
import EmptyState from "../../../../components/ui/EmptyState";
import type { ProductKey } from "../../../../lib/stripe";
import { listCasesWithPendingAction } from "../../../../lib/notifications";
import { Bell } from "lucide-react";

export const metadata: Metadata = {
  title: "Dashboard",
};

export const dynamic = "force-dynamic";

function formatDollars(amount_cents: number): string {
  return (amount_cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function formatRelative(s: string): string {
  const date = new Date(s);
  const diffMs = Date.now() - date.getTime();
  const mins = Math.round(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function formatCreated(s: string): string {
  const d = new Date(s);
  const sameYear = d.getFullYear() === new Date().getFullYear();
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    ...(sameYear ? {} : { year: "numeric" }),
  });
}

export default async function DashboardHome() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createClient() as any;
  const { data: { user } } = await supabase.auth.getUser();

  // Layout already enforces auth, but TS requires a guard.
  if (!user) return null;

  const { data: cases } = await supabase
    .from("cases")
    .select("*")
    .eq("owner_user_id", user.id)
    .order("updated_at", { ascending: false });

  const list = (cases || []) as Case[];
  const caseIds = list.map((c) => c.id);

  // Pull paid products so we can render the per-case product chips. The
  // status pill itself no longer depends on this; it's purely lifecycle.
  const { data: paymentsData } = caseIds.length
    ? await supabase
        .from("payments")
        .select("case_id, product_key")
        .in("case_id", caseIds)
        .eq("status", "succeeded")
    : { data: [] };

  const payments = (paymentsData || []) as Pick<Payment, "case_id" | "product_key">[];

  // Cases with unresolved action-required notifications get a bell icon
  // next to the case name in the list.
  const pendingActionCases = await listCasesWithPendingAction(user.id);

  const paidByCase = new Map<string, Set<ProductKey>>();
  for (const p of payments) {
    if (!p.product_key) continue;
    let set = paidByCase.get(p.case_id);
    if (!set) {
      set = new Set();
      paidByCase.set(p.case_id, set);
    }
    set.add(p.product_key as ProductKey);
  }

  return (
    <div>
      <PageHead
        title="Your cases"
        sub="Every dispute you're working on with CivilCase lives here."
        actions={
          <Link href="/dashboard/cases/new" className="btn btn-dark">
            Start a new case
          </Link>
        }
      />

      {list.length === 0 ? (
        <EmptyState
          title="No cases yet"
          body="Start a case to begin building your file. You can purchase a demand letter or other services once you've added your details."
          cta={
            <Link href="/dashboard/cases/new" className="btn btn-dark">
              Start a new case
            </Link>
          }
        />
      ) : (
        <>
        <div className="app-case-list-head" aria-hidden="true">
          <span className="app-case-col-label app-case-col-label-left">Status</span>
          <span className="app-case-col-label app-case-col-label-start">Case Name</span>
          <span className="app-case-col-label app-case-col-label-start">Products</span>
          <span className="app-case-col-label">Created</span>
          <span className="app-case-col-label app-case-col-label-center">Amount</span>
          <span />
        </div>
        <ul className="app-case-list">
          {list.map((c) => {
            const paidSet = paidByCase.get(c.id) ?? new Set<ProductKey>();
            const status = deriveStatusLabel({ c });
            const badges = productBadgesForCase(paidSet);
            // Drafts route directly into the wizard; everything else opens the case detail.
            const isV2Draft = c.status === "draft" && c.intake_version === 2;
            const href = isV2Draft ? `/case/${c.id}/build` : `/case/${c.id}`;
            const plaintiffName = c.plaintiff_name?.trim();
            const defendantName = c.defendant_name?.trim();
            const caption = defendantName
              ? `${plaintiffName || "You"} vs. ${defendantName}`
              : "Untitled draft";
            const needsAction = pendingActionCases.has(c.id);
            return (
              <Link key={c.id} href={href} className="app-case-card">
                <StatusBadge tone={status.tone}>{status.label}</StatusBadge>
                <div>
                  <div className="app-case-defendant">
                    {caption}
                    {needsAction ? (
                      <span
                        className="app-case-action-bell"
                        title="Action needed"
                        aria-label="Action needed"
                      >
                        <Bell size={14} strokeWidth={2.5} />
                      </span>
                    ) : null}
                  </div>
                  <div className="app-case-meta">
                    {formatDisputeTypeShort(
                      c.dispute_type,
                      disputeTypeOtherFrom(c.intake_answers),
                    )}{" "}
                    · {c.state} · updated {formatRelative(c.updated_at)}
                  </div>
                </div>
                <div className="app-case-products-cell">
                  <ProductChipList badges={badges} emptyHint="None yet" />
                </div>
                <div className="app-case-created">
                  <span className="app-case-created-date">{formatCreated(c.created_at)}</span>
                </div>
                <div className="app-case-amount">{formatDollars(c.amount_cents)}</div>
                <span className="app-case-chevron">→</span>
              </Link>
            );
          })}
        </ul>
        </>
      )}
    </div>
  );
}

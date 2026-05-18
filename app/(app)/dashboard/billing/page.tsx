import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "../../../../lib/supabase/server";
import { createServiceRoleClient } from "../../../../lib/supabase/service-role";
import { reconcilePendingPayment } from "../../../../lib/payments/reconcile";
import type { Payment } from "../../../../lib/supabase/types";
import PageHead from "../../../../components/layout/PageHead";
import StatusBadge from "../../../../components/ui/StatusBadge";
import EmptyState from "../../../../components/ui/EmptyState";

export const metadata: Metadata = {
  title: "Billing",
};

export const dynamic = "force-dynamic";

function formatDollars(cents: number): string {
  return (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function formatDate(s: string): string {
  return new Date(s).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Tone-mapped status labels. "Authorized" is our display label for rows
// that have paid_at set but status is still pending (card held, awaiting
// paralegal capture). "Paid" means actually captured.
const STATUS_LABEL: Record<string, { label: string; tone: "neutral" | "active" | "done" }> = {
  pending: { label: "Pending", tone: "neutral" },
  authorized: { label: "Authorized", tone: "active" },
  succeeded: { label: "Paid", tone: "done" },
  failed: { label: "Failed", tone: "neutral" },
  refunded: { label: "Refunded", tone: "neutral" },
};

// User-friendly labels for each product key. The raw keys (e.g.
// "tier_full_pressure") are not customer-facing.
const PRODUCT_LABEL: Record<string, string> = {
  tier_send_letter: "Demand Letter (Send the Letter)",
  tier_full_pressure: "Demand Letter (Full Pressure)",
  court_prep: "Court Prep Pack",
  filing_guide: "Filing Guide",
  collection_plan: "Post-Judgment Collection Plan",
  demand_letter_download: "Demand Letter Download",
  addon_expedite: "Expedite 24 Hours",
  addon_overnight: "Overnight Shipping",
  addon_skip_trace: "Skip-Trace",
  addon_voice_of_justice: "Voice of Justice",
  addon_case_brief: "Case Brief (Attorney Memo)",
};

export default async function BillingPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createClient() as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  // Self-heal: ask Stripe about any of this user's pending PaymentIntents so
  // the billing list isn't missing orders that were paid but never webhooked.
  // Bounded to the last 7 days: older pending rows are abandoned checkouts
  // (user closed the tab pre-payment) and won't transition to succeeded —
  // reconciling them just burns Stripe API quota and adds page latency.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const { data: pendingRows } = await admin
    .from("payments")
    .select("case_id, product_key")
    .eq("user_id", user.id)
    .eq("status", "pending")
    .is("paid_at", null)
    .gte("created_at", sevenDaysAgo);
  // Run reconciles in parallel. Was a sequential for-await before, which
  // serialized N Stripe roundtrips and routinely cost 5-8s on accounts
  // with many old pending payments.
  if (pendingRows?.length) {
    await Promise.all(
      (pendingRows as Array<{ case_id: string; product_key: string }>).map(
        (row) => reconcilePendingPayment(row.case_id, row.product_key),
      ),
    );
  }

  const { data: paymentsRaw } = await supabase
    .from("payments")
    .select("id, case_id, amount_cents, currency, status, product_key, paid_at, created_at, line_items")
    .eq("user_id", user.id)
    .not("paid_at", "is", null)
    .order("created_at", { ascending: false });

  const payments = (paymentsRaw || []) as Array<
    Pick<
      Payment,
      "id" | "case_id" | "amount_cents" | "currency" | "status" | "product_key" | "paid_at" | "created_at" | "line_items"
    >
  >;

  // Resolve case captions for every payment so the "Case" column links by
  // name instead of the generic "Open case" placeholder.
  const caseIds = Array.from(
    new Set(payments.map((p) => p.case_id).filter((id): id is string => !!id)),
  );
  const caseTitles = new Map<string, string>();
  if (caseIds.length > 0) {
    const { data: caseRows } = await supabase
      .from("cases")
      .select("id, defendant_name, plaintiff_name")
      .in("id", caseIds);
    for (const row of (caseRows ?? []) as Array<{
      id: string;
      defendant_name: string | null;
      plaintiff_name: string | null;
    }>) {
      const defendant = row.defendant_name?.trim() || "";
      const plaintiff = row.plaintiff_name?.trim() || "";
      if (defendant) {
        caseTitles.set(row.id, `${plaintiff || "You"} vs. ${defendant}`);
      } else if (plaintiff) {
        caseTitles.set(row.id, plaintiff);
      } else {
        caseTitles.set(row.id, "Untitled case");
      }
    }
  }

  return (
    <div>
      <PageHead title="Billing" sub="All your CivilCase payments and receipts." />

      {payments.length === 0 ? (
        <EmptyState
          title="No payments yet"
          body="Your receipts will appear here once you purchase a letter."
        />
      ) : (
        <div className="app-billing-table">
          <div className="app-billing-row app-billing-row-header">
            <div>Date</div>
            <div>Item</div>
            <div>Case</div>
            <div className="app-billing-amount">Amount</div>
            <div className="app-billing-status-col">Status</div>
            <div className="app-billing-receipt-col">Receipt</div>
          </div>
          {payments.map((p) => {
            const adminBypass =
              p.line_items && (p.line_items as Record<string, unknown>).admin_bypass === true;
            // Authorized = paid_at is set but status is still pending (card
            // held, awaiting paralegal capture). Reuse the "authorized" key
            // in STATUS_LABEL for that case.
            const effectiveKey =
              p.status === "pending" && p.paid_at ? "authorized" : p.status;
            const status = STATUS_LABEL[effectiveKey] || { label: p.status, tone: "neutral" as const };
            return (
              <div key={p.id} className="app-billing-row">
                <div className="app-billing-date">
                  {formatDate(p.paid_at || p.created_at)}
                </div>
                <div>
                  {PRODUCT_LABEL[p.product_key] || p.product_key}
                  {adminBypass && <span className="app-billing-tag">admin</span>}
                </div>
                <div>
                  <Link href={`/dashboard/cases/${p.case_id}`} className="app-link">
                    {caseTitles.get(p.case_id) ?? "Open case"}
                  </Link>
                </div>
                <div className="app-billing-amount">
                  {p.amount_cents === 0 ? "Free" : formatDollars(p.amount_cents)}
                </div>
                <div className="app-billing-status-col">
                  <StatusBadge tone={status.tone}>{status.label}</StatusBadge>
                </div>
                <div className="app-billing-receipt-col">
                  {p.paid_at ? (
                    <a
                      href={`/api/payments/${p.id}/receipt`}
                      className="app-billing-receipt-link"
                      title="Download PDF receipt"
                    >
                      Receipt ↓
                    </a>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

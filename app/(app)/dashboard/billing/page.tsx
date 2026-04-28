import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "../../../../lib/supabase/server";
import type { Payment } from "../../../../lib/supabase/types";

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

const STATUS_LABEL: Record<string, { label: string; tone: "neutral" | "active" | "done" }> = {
  pending: { label: "Pending", tone: "neutral" },
  succeeded: { label: "Paid", tone: "done" },
  failed: { label: "Failed", tone: "neutral" },
  refunded: { label: "Refunded", tone: "neutral" },
};

const PRODUCT_LABEL: Record<string, string> = {
  demand_letter_download: "Demand letter download",
};

export default async function BillingPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createClient() as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: paymentsRaw } = await supabase
    .from("payments")
    .select("id, case_id, amount_cents, currency, status, product_key, paid_at, created_at, line_items")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const payments = (paymentsRaw || []) as Array<
    Pick<
      Payment,
      "id" | "case_id" | "amount_cents" | "currency" | "status" | "product_key" | "paid_at" | "created_at" | "line_items"
    >
  >;

  return (
    <div>
      <div className="app-page-head">
        <div>
          <h1>Billing</h1>
          <p className="app-page-sub">All your CivilCase payments and receipts.</p>
        </div>
      </div>

      {payments.length === 0 ? (
        <div className="app-empty">
          <h2>No payments yet</h2>
          <p>Your receipts will appear here once you purchase a letter.</p>
        </div>
      ) : (
        <div className="app-billing-table">
          <div className="app-billing-row app-billing-row-header">
            <div>Date</div>
            <div>Item</div>
            <div>Case</div>
            <div className="app-billing-amount">Amount</div>
            <div>Status</div>
          </div>
          {payments.map((p) => {
            const adminBypass =
              p.line_items && (p.line_items as Record<string, unknown>).admin_bypass === true;
            const status = STATUS_LABEL[p.status] || { label: p.status, tone: "neutral" as const };
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
                    Open case →
                  </Link>
                </div>
                <div className="app-billing-amount">
                  {p.amount_cents === 0 ? "Free" : formatDollars(p.amount_cents)}
                </div>
                <div>
                  <span className={`app-case-status app-case-status-${status.tone}`}>
                    {status.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

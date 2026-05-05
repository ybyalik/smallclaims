import Link from "next/link";
import { notFound } from "next/navigation";
import { loadAdminUser } from "../../../../lib/admin/users";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "User · Admin",
};

function fmt$(cents: number | null | undefined): string {
  return ((cents ?? 0) / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

function fmtDate(s: string | null): string {
  if (!s) return "—";
  return new Date(s).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default async function AdminUserDetailPage({ params }: { params: { id: string } }) {
  const u = await loadAdminUser(params.id);
  if (!u) notFound();

  return (
    <div className="admin-page">
      <Link href="/admin/users" className="admin-back">
        ← All users
      </Link>
      <header className="admin-page-head">
        <div>
          <h1>{u.fullName || u.email}</h1>
          <p>
            {u.email} · joined {fmtDate(u.createdAt)} · last seen {fmtDate(u.lastSignInAt)}
            {u.isAdmin ? <span className="admin-pill admin-pill-warn" style={{ marginLeft: 10 }}>admin</span> : null}
          </p>
        </div>
      </header>

      <div className="admin-cards" style={{ marginBottom: 28 }}>
        <div className="admin-card">
          <span className="admin-card-eyebrow">Cases</span>
          <span className="admin-card-num">{u.cases.length}</span>
          <span className="admin-card-sub">All statuses</span>
        </div>
        <div className="admin-card">
          <span className="admin-card-eyebrow">Payments</span>
          <span className="admin-card-num">
            {u.payments.filter((p) => p.status === "succeeded").length}
          </span>
          <span className="admin-card-sub">Succeeded</span>
        </div>
        <div className="admin-card">
          <span className="admin-card-eyebrow">Revenue</span>
          <span className="admin-card-num">
            {fmt$(
              u.payments
                .filter((p) => p.status === "succeeded")
                .reduce((s, p) => s + (p.amount_cents ?? 0), 0)
            )}
          </span>
          <span className="admin-card-sub">Lifetime</span>
        </div>
        {u.stripeCustomerId ? (
          <div className="admin-card">
            <span className="admin-card-eyebrow">Stripe</span>
            <span style={{ fontFamily: "ui-monospace, monospace", fontSize: 13, marginTop: 4 }}>
              {u.stripeCustomerId}
            </span>
            <a
              href={`https://dashboard.stripe.com/customers/${u.stripeCustomerId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="admin-link"
              style={{ fontSize: 13, marginTop: 4 }}
            >
              Open in Stripe →
            </a>
          </div>
        ) : null}
      </div>

      <h2 className="admin-section-h">Cases</h2>
      {u.cases.length === 0 ? (
        <p style={{ color: "var(--muted)" }}>This user has no cases yet.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Defendant</th>
              <th>Type</th>
              <th>State</th>
              <th style={{ textAlign: "right" }}>Amount</th>
              <th>Updated</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {u.cases.map((c) => (
              <tr key={c.id}>
                <td><span className={`admin-pill admin-pill-${statusTone(c.status)}`}>{c.status}</span></td>
                <td>{c.defendant_name || <span style={{ color: "var(--muted)" }}>(unset)</span>}</td>
                <td style={{ color: "var(--ink-2)" }}>{c.dispute_type.replace(/_/g, " ")}</td>
                <td style={{ color: "var(--muted)" }}>{c.state}</td>
                <td style={{ textAlign: "right", fontFamily: "Newsreader, Georgia, serif", fontWeight: 600 }}>
                  {fmt$(c.amount_cents)}
                </td>
                <td style={{ color: "var(--muted)" }}>{fmtDate(c.updated_at)}</td>
                <td>
                  <Link href={`/admin/cases/${c.id}`} className="admin-link" style={{ fontSize: 13 }}>
                    View →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h2 className="admin-section-h" style={{ marginTop: 32 }}>Payments</h2>
      {u.payments.length === 0 ? (
        <p style={{ color: "var(--muted)" }}>No payments yet.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Product</th>
              <th>Case</th>
              <th style={{ textAlign: "right" }}>Amount</th>
              <th>Date</th>
              <th>Stripe</th>
            </tr>
          </thead>
          <tbody>
            {u.payments.map((p) => (
              <tr key={p.id}>
                <td><span className={`admin-pill admin-pill-${paymentTone(p.status)}`}>{p.status}</span></td>
                <td>{p.product_key}</td>
                <td>
                  <Link href={`/admin/cases/${p.case_id}`} className="admin-link">
                    {p.case_id.slice(0, 8)}…
                  </Link>
                </td>
                <td style={{ textAlign: "right", fontFamily: "Newsreader, Georgia, serif", fontWeight: 600 }}>
                  {fmt$(p.amount_cents)}
                </td>
                <td style={{ color: "var(--muted)" }}>{fmtDate(p.paid_at || p.created_at)}</td>
                <td>
                  {p.stripe_payment_intent_id ? (
                    <a
                      href={`https://dashboard.stripe.com/payments/${p.stripe_payment_intent_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="admin-link"
                      style={{ fontSize: 12 }}
                    >
                      {p.stripe_payment_intent_id.slice(0, 14)}…
                    </a>
                  ) : (
                    <span style={{ color: "var(--muted)", fontSize: 12 }}>—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function statusTone(status: string): string {
  if (status === "draft") return "neutral";
  if (status.includes("paid") || status.includes("sent") || status.includes("delivered")) return "active";
  if (status === "settled" || status === "closed" || status === "judgment_entered") return "good";
  return "neutral";
}

function paymentTone(status: string): string {
  if (status === "succeeded") return "good";
  if (status === "failed" || status === "refunded") return "warn";
  return "neutral";
}

import Link from "next/link";
import { listAdminCases } from "../../../lib/admin/users";
import { listCaseResearchStatuses } from "../../../lib/admin/case-research";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Cases · Admin",
};

function fmt$(cents: number): string {
  return (cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

function fmtDate(s: string): string {
  return new Date(s).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function statusTone(status: string): string {
  if (status === "draft") return "neutral";
  if (status.includes("paid") || status.includes("sent") || status.includes("delivered")) return "active";
  if (status === "settled" || status === "closed" || status === "judgment_entered") return "good";
  return "neutral";
}

export default async function AdminCasesPage() {
  const cases = await listAdminCases();
  const paid = cases.filter((c) => c.paidCents > 0);
  const researchStatus = await listCaseResearchStatuses(cases.map((c) => c.id));

  return (
    <div className="admin-page">
      <header className="admin-page-head">
        <div>
          <h1>Cases</h1>
          <p>
            {cases.length} total · {paid.length} paid
          </p>
        </div>
      </header>

      <div className="admin-cards" style={{ marginBottom: 24 }}>
        <div className="admin-card">
          <span className="admin-card-eyebrow">Total cases</span>
          <span className="admin-card-num">{cases.length}</span>
          <span className="admin-card-sub">All statuses</span>
        </div>
        <div className="admin-card">
          <span className="admin-card-eyebrow">Drafts</span>
          <span className="admin-card-num">
            {cases.filter((c) => c.status === "draft").length}
          </span>
          <span className="admin-card-sub">In wizard</span>
        </div>
        <div className="admin-card">
          <span className="admin-card-eyebrow">Paid cases</span>
          <span className="admin-card-num">{paid.length}</span>
          <span className="admin-card-sub">Customer count</span>
        </div>
        <div className="admin-card">
          <span className="admin-card-eyebrow">Revenue</span>
          <span className="admin-card-num">
            {fmt$(cases.reduce((s, c) => s + c.paidCents, 0))}
          </span>
          <span className="admin-card-sub">From cases</span>
        </div>
      </div>

      {cases.length === 0 ? (
        <p style={{ color: "var(--muted)" }}>No cases yet.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Owner</th>
              <th>Defendant</th>
              <th>Type</th>
              <th>State</th>
              <th style={{ textAlign: "right" }}>Demand</th>
              <th>Product</th>
              <th style={{ textAlign: "right" }}>Paid</th>
              <th>Updated</th>
              <th>Research</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cases.map((c) => (
              <tr key={c.id}>
                <td><span className={`admin-pill admin-pill-${statusTone(c.status)}`}>{c.status}</span></td>
                <td>
                  {c.ownerEmail ? (
                    <Link href={`/admin/users/${c.ownerUserId}`} className="admin-link">
                      {c.ownerEmail}
                    </Link>
                  ) : (
                    <span style={{ color: "var(--muted)", fontSize: 13 }}>anonymous</span>
                  )}
                </td>
                <td>
                  {c.defendantName || <span style={{ color: "var(--muted)" }}>—</span>}
                </td>
                <td style={{ color: "var(--ink-2)" }}>{c.disputeType.replace(/_/g, " ")}</td>
                <td style={{ color: "var(--muted)" }}>{c.state}</td>
                <td style={{ textAlign: "right", fontFamily: "Newsreader, Georgia, serif", fontWeight: 600 }}>
                  {fmt$(c.amountCents)}
                </td>
                <td style={{ fontSize: 13, color: c.productKey ? "var(--ink)" : "var(--muted)" }}>
                  {c.productKey || "—"}
                </td>
                <td style={{ textAlign: "right" }}>
                  {c.paidCents > 0 ? (
                    <strong style={{ color: "#3d7a4a" }}>{fmt$(c.paidCents)}</strong>
                  ) : (
                    <span style={{ color: "var(--muted)" }}>—</span>
                  )}
                </td>
                <td style={{ color: "var(--muted)", fontSize: 13 }}>{fmtDate(c.updatedAt)}</td>
                <td>
                  {(() => {
                    const s = researchStatus.get(c.id);
                    if (!s) return <span style={{ color: "var(--muted)", fontSize: 13 }}>—</span>;
                    const tone =
                      s === "succeeded"
                        ? "good"
                        : s === "failed" || s === "canceled"
                          ? "warn"
                          : s === "running"
                            ? "active"
                            : "neutral";
                    return <span className={`admin-pill admin-pill-${tone}`}>{s}</span>;
                  })()}
                </td>
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
    </div>
  );
}

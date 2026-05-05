import Link from "next/link";
import { listAdminUsers } from "../../../lib/admin/users";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Users · Admin",
};

function fmtRel(s: string | null): string {
  if (!s) return "—";
  const date = new Date(s);
  const days = Math.floor((Date.now() - date.getTime()) / 86_400_000);
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function fmt$(cents: number): string {
  return (cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export default async function AdminUsersPage() {
  const users = await listAdminUsers();
  const customers = users.filter((u) => u.paidCount > 0);

  return (
    <div className="admin-page">
      <header className="admin-page-head">
        <div>
          <h1>Users</h1>
          <p>
            {users.length} registered · {customers.length} customer
            {customers.length !== 1 ? "s" : ""}
          </p>
        </div>
      </header>

      <div className="admin-cards" style={{ marginBottom: 24 }}>
        <div className="admin-card">
          <span className="admin-card-eyebrow">Total users</span>
          <span className="admin-card-num">{users.length}</span>
          <span className="admin-card-sub">All registered accounts</span>
        </div>
        <div className="admin-card">
          <span className="admin-card-eyebrow">Customers</span>
          <span className="admin-card-num">{customers.length}</span>
          <span className="admin-card-sub">Have at least 1 paid case</span>
        </div>
        <div className="admin-card">
          <span className="admin-card-eyebrow">Total revenue</span>
          <span className="admin-card-num">
            {fmt$(users.reduce((s, u) => s + u.totalPaidCents, 0))}
          </span>
          <span className="admin-card-sub">Sum of succeeded payments</span>
        </div>
        <div className="admin-card">
          <span className="admin-card-eyebrow">Cases drafted</span>
          <span className="admin-card-num">
            {users.reduce((s, u) => s + u.caseCount, 0)}
          </span>
          <span className="admin-card-sub">All statuses</span>
        </div>
      </div>

      {users.length === 0 ? (
        <p style={{ color: "var(--muted)" }}>No users yet.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Joined</th>
              <th>Last seen</th>
              <th style={{ textAlign: "right" }}>Cases</th>
              <th style={{ textAlign: "right" }}>Paid</th>
              <th style={{ textAlign: "right" }}>Revenue</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>
                  <Link href={`/admin/users/${u.id}`} className="admin-link">
                    {u.fullName || <span style={{ color: "var(--muted)" }}>—</span>}
                  </Link>
                  {u.isAdmin ? (
                    <span className="admin-pill admin-pill-warn" style={{ marginLeft: 8 }}>
                      admin
                    </span>
                  ) : null}
                </td>
                <td style={{ color: "var(--ink-2)" }}>{u.email}</td>
                <td style={{ color: "var(--muted)" }}>{fmtRel(u.createdAt)}</td>
                <td style={{ color: "var(--muted)" }}>{fmtRel(u.lastSignInAt)}</td>
                <td style={{ textAlign: "right" }}>{u.caseCount}</td>
                <td style={{ textAlign: "right" }}>
                  {u.paidCount > 0 ? (
                    <span className="admin-pill admin-pill-good">{u.paidCount}</span>
                  ) : (
                    <span style={{ color: "var(--muted)" }}>0</span>
                  )}
                </td>
                <td style={{ textAlign: "right", fontFamily: "Newsreader, Georgia, serif", fontWeight: 600 }}>
                  {u.totalPaidCents > 0 ? fmt$(u.totalPaidCents) : "—"}
                </td>
                <td>
                  <Link href={`/admin/users/${u.id}`} className="admin-link" style={{ fontSize: 13 }}>
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

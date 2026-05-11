import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "../../../lib/supabase/server";
import type { Case, DemandLetter, Payment, Profile } from "../../../lib/supabase/types";

export const metadata: Metadata = {
  title: "Dashboard",
};

export const dynamic = "force-dynamic";

const ACTIVE_CASE_STATUSES = new Set([
  "draft",
  "demand_drafted",
  "demand_paid",
  "demand_sent",
  "demand_delivered",
  "demand_responded",
  "filing_prepared",
  "filed",
  "service_arranged",
  "served",
  "hearing_scheduled",
  "collection",
]);

const CASE_STATUS_LABEL: Record<string, string> = {
  draft: "Draft",
  demand_drafted: "Letter ready",
  demand_paid: "Letter paid",
  demand_sent: "Letter mailed",
  demand_delivered: "Delivered",
  demand_returned: "Returned",
  demand_responded: "Responded",
  filing_prepared: "Forms prepared",
  filed: "Filed",
  service_arranged: "Service arranged",
  served: "Served",
  hearing_scheduled: "Hearing scheduled",
  judgment_entered: "Judgment entered",
  collection: "Collecting",
  settled: "Settled",
  closed: "Closed",
};

const LETTER_STATUS_LABEL: Record<string, string> = {
  draft: "Draft",
  queued: "Queued",
  in_transit: "In transit",
  delivered: "Delivered",
  returned: "Returned",
  failed: "Failed",
};

function formatDollars(cents: number): string {
  return (cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

function formatRelative(s: string): string {
  const date = new Date(s);
  const diffMs = Date.now() - date.getTime();
  const mins = Math.round(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function caseTitle(c: Case): string {
  const plaintiff = c.plaintiff_name?.trim();
  const defendant = c.defendant_name?.trim();
  if (defendant) return `${plaintiff || "You"} vs. ${defendant}`;
  return "Untitled draft";
}

export default async function DashboardHome() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createClient() as any;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const [casesRes, profileRes] = await Promise.all([
    supabase
      .from("cases")
      .select("*")
      .eq("owner_user_id", user.id)
      .order("updated_at", { ascending: false }),
    supabase
      .from("profiles")
      .select("full_name")
      .eq("user_id", user.id)
      .maybeSingle(),
  ]);

  const cases = (casesRes.data || []) as Case[];
  const profile = (profileRes.data || null) as Pick<Profile, "full_name"> | null;

  const caseIds = cases.map((c) => c.id);

  const [lettersRes, paymentsRes] = await Promise.all([
    caseIds.length
      ? supabase
          .from("demand_letters")
          .select("*")
          .in("case_id", caseIds)
          .order("updated_at", { ascending: false })
      : Promise.resolve({ data: [] }),
    caseIds.length
      ? supabase
          .from("payments")
          .select("*")
          .in("case_id", caseIds)
          .order("created_at", { ascending: false })
      : Promise.resolve({ data: [] }),
  ]);

  const letters = (lettersRes.data || []) as DemandLetter[];
  const payments = (paymentsRes.data || []) as Payment[];

  const activeCases = cases.filter((c) => ACTIVE_CASE_STATUSES.has(c.status));
  const lettersInFlight = letters.filter((l) =>
    ["queued", "in_transit", "delivered"].includes(l.mail_status),
  );
  const totalAtStake = activeCases.reduce((sum, c) => sum + (c.amount_cents || 0), 0);
  const totalPaid = payments
    .filter((p) => p.status === "succeeded")
    .reduce((sum, p) => sum + (p.amount_cents || 0), 0);

  const firstName =
    profile?.full_name?.trim().split(/\s+/)[0] ||
    (user.email ? user.email.split("@")[0] : null);

  const recentCases = cases.slice(0, 5);
  const recentLetters = letters.slice(0, 3);

  if (cases.length === 0) {
    return (
      <div>
        <div className="app-page-head">
          <div>
            <h1>{firstName ? `Welcome, ${firstName}` : "Welcome"}</h1>
            <p className="app-page-sub">Your case files, letters, and activity will appear here.</p>
          </div>
          <div>
            <Link href="/dashboard/cases/new" className="btn btn-dark">
              Start a new case
            </Link>
          </div>
        </div>

        <div className="app-empty">
          <h2>No cases yet</h2>
          <p>
            Start a case to begin building your file. You can purchase a demand letter or other
            services once you&apos;ve added your details.
          </p>
          <Link href="/dashboard/cases/new" className="btn btn-dark">
            Start a new case
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="app-page-head">
        <div>
          <h1>{firstName ? `Welcome back, ${firstName}` : "Welcome back"}</h1>
          <p className="app-page-sub">
            {activeCases.length === 1
              ? "1 active case"
              : `${activeCases.length} active cases`}
            {lettersInFlight.length > 0
              ? ` · ${lettersInFlight.length} ${lettersInFlight.length === 1 ? "letter" : "letters"} in flight`
              : ""}
          </p>
        </div>
        <div>
          <Link href="/dashboard/cases/new" className="btn btn-dark">
            Start a new case
          </Link>
        </div>
      </div>

      <div className="app-stat-grid">
        <div className="app-stat">
          <div className="app-stat-label">Active cases</div>
          <div className="app-stat-value">{activeCases.length}</div>
          <div className="app-stat-sub">
            {cases.length - activeCases.length > 0
              ? `${cases.length - activeCases.length} closed`
              : " "}
          </div>
        </div>
        <div className="app-stat">
          <div className="app-stat-label">Total at stake</div>
          <div className="app-stat-value">{formatDollars(totalAtStake)}</div>
          <div className="app-stat-sub">across active cases</div>
        </div>
        <div className="app-stat">
          <div className="app-stat-label">Letters mailed</div>
          <div className="app-stat-value">
            {letters.filter((l) => l.mail_status !== "draft").length}
          </div>
          <div className="app-stat-sub">
            {lettersInFlight.length > 0 ? `${lettersInFlight.length} in transit` : " "}
          </div>
        </div>
        <div className="app-stat">
          <div className="app-stat-label">You&apos;ve paid</div>
          <div className="app-stat-value">{formatDollars(totalPaid)}</div>
          <div className="app-stat-sub">
            <Link href="/dashboard/billing" className="app-link">
              View billing
            </Link>
          </div>
        </div>
      </div>

      <div className="app-dash-grid">
        <section className="app-dash-section">
          <div className="app-dash-section-head">
            <h2>Recent cases</h2>
            {cases.length > 5 ? (
              <Link href="/dashboard/cases" className="app-link">
                View all
              </Link>
            ) : null}
          </div>
          <ul className="app-case-list">
            {recentCases.map((c) => {
              const isV2Draft = c.status === "draft" && c.intake_version === 2;
              const href = isV2Draft ? `/case/${c.id}/build` : `/case/${c.id}`;
              const statusLabel = CASE_STATUS_LABEL[c.status] || c.status;
              const tone = ["settled", "closed", "judgment_entered"].includes(c.status)
                ? "done"
                : c.status === "draft"
                ? "neutral"
                : "active";
              return (
                <Link key={c.id} href={href} className="app-case-card">
                  <span className={`app-case-status app-case-status-${tone}`}>{statusLabel}</span>
                  <div>
                    <div className="app-case-defendant">{caseTitle(c)}</div>
                    <div className="app-case-meta">
                      {c.dispute_type.replace(/_/g, " ")} · {c.state} · updated{" "}
                      {formatRelative(c.updated_at)}
                      {isV2Draft ? " · click to continue" : ""}
                    </div>
                  </div>
                  <div className="app-case-amount">{formatDollars(c.amount_cents)}</div>
                  <span className="app-case-chevron">→</span>
                </Link>
              );
            })}
          </ul>
        </section>

        <aside className="app-dash-aside">
          <div className="app-dash-card">
            <h3>Demand letters</h3>
            {recentLetters.length === 0 ? (
              <p className="app-dash-empty">No letters yet. Generate one from a case file.</p>
            ) : (
              <ul className="app-mini-list">
                {recentLetters.map((l) => {
                  const c = cases.find((x) => x.id === l.case_id);
                  return (
                    <li key={l.id}>
                      <Link href={`/case/${l.case_id}`} className="app-mini-row">
                        <span className="app-mini-title">
                          {c ? caseTitle(c) : "Letter"}
                        </span>
                        <span className="app-mini-meta">
                          {LETTER_STATUS_LABEL[l.mail_status] || l.mail_status}
                          {" · "}
                          {formatRelative(l.updated_at)}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className="app-dash-card">
            <h3>Quick actions</h3>
            <div className="app-quick-actions">
              <Link href="/dashboard/cases/new" className="btn btn-dark btn-block">
                Start a new case
              </Link>
              <Link href="/dashboard/cases" className="btn btn-outline btn-block">
                View all cases
              </Link>
              <Link href="/dashboard/settings" className="btn btn-outline btn-block">
                Account settings
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

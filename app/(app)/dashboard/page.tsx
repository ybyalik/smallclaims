import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "../../../lib/supabase/server";
import type { Case } from "../../../lib/supabase/types";

export const metadata: Metadata = {
  title: "Dashboard",
};

export const dynamic = "force-dynamic";

const STATUS_LABELS: Record<string, { label: string; tone: "neutral" | "active" | "done" }> = {
  draft: { label: "Draft", tone: "neutral" },
  demand_drafted: { label: "Letter ready", tone: "active" },
  demand_paid: { label: "Letter paid", tone: "active" },
  demand_sent: { label: "Letter mailed", tone: "active" },
  demand_delivered: { label: "Delivered", tone: "active" },
  demand_returned: { label: "Returned", tone: "neutral" },
  demand_responded: { label: "Defendant responded", tone: "active" },
  filing_prepared: { label: "Forms prepared", tone: "active" },
  filed: { label: "Filed", tone: "active" },
  service_arranged: { label: "Service arranged", tone: "active" },
  served: { label: "Served", tone: "active" },
  hearing_scheduled: { label: "Hearing scheduled", tone: "active" },
  judgment_entered: { label: "Judgment entered", tone: "done" },
  collection: { label: "Collecting", tone: "active" },
  settled: { label: "Settled", tone: "done" },
  closed: { label: "Closed", tone: "done" },
};

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

  return (
    <div>
      <div className="app-page-head">
        <div>
          <h1>Your cases</h1>
          <p className="app-page-sub">
            Every dispute you&apos;re working on with CivilCase lives here.
          </p>
        </div>
        <div>
          <Link href="/dashboard/cases/new" className="btn btn-dark">
            Start a new case
          </Link>
        </div>
      </div>

      {list.length === 0 ? (
        <div className="app-empty">
          <h2>No cases yet</h2>
          <p>Start by drafting a demand letter. It&apos;s the first step in most disputes.</p>
          <Link href="/dashboard/cases/new" className="btn btn-dark">
            Start a new case
          </Link>
        </div>
      ) : (
        <ul className="app-case-list">
          {list.map((c) => {
            const status = STATUS_LABELS[c.status] || { label: c.status, tone: "neutral" as const };
            return (
              <Link key={c.id} href={`/dashboard/cases/${c.id}`} className="app-case-card">
                <span className={`app-case-status app-case-status-${status.tone}`}>
                  {status.label}
                </span>
                <div>
                  <div className="app-case-defendant">vs. {c.defendant_name}</div>
                  <div className="app-case-meta">
                    {c.dispute_type.replace(/_/g, " ")} · {c.state} · updated {formatRelative(c.updated_at)}
                  </div>
                </div>
                <div className="app-case-amount">{formatDollars(c.amount_cents)}</div>
                <span className="app-case-chevron">→</span>
              </Link>
            );
          })}
        </ul>
      )}
    </div>
  );
}

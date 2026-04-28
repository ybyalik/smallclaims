import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "../../../lib/supabase/server";
import type { Case } from "../../../lib/supabase/types";

export const metadata: Metadata = {
  title: "My cases",
};

export const dynamic = "force-dynamic";

const STATUS_LABELS: Record<string, { label: string; tone: "neutral" | "active" | "done" }> = {
  draft: { label: "Draft", tone: "neutral" },
  demand_drafted: { label: "Letter ready to review", tone: "active" },
  demand_paid: { label: "Letter paid, ready to send", tone: "active" },
  demand_sent: { label: "Letter mailed", tone: "active" },
  demand_delivered: { label: "Letter delivered", tone: "active" },
  demand_returned: { label: "Letter returned (re-check address)", tone: "neutral" },
  demand_responded: { label: "Defendant responded", tone: "active" },
  filing_prepared: { label: "Court forms prepared", tone: "active" },
  filed: { label: "Filed in court", tone: "active" },
  service_arranged: { label: "Service arranged", tone: "active" },
  served: { label: "Defendant served", tone: "active" },
  hearing_scheduled: { label: "Hearing scheduled", tone: "active" },
  judgment_entered: { label: "Judgment entered", tone: "done" },
  collection: { label: "Collecting", tone: "active" },
  settled: { label: "Settled", tone: "done" },
  closed: { label: "Closed", tone: "done" },
};

function formatDollars(amount_cents: number): string {
  return (amount_cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function formatDate(s: string): string {
  return new Date(s).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default async function CasesPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createClient() as any;
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/demand-letter");
  }

  const { data: cases, error } = await supabase
    .from("cases")
    .select("*")
    .eq("owner_user_id", user.id)
    .order("updated_at", { ascending: false });

  if (error) {
    return (
      <main className="dl-page">
        <section className="wrap-narrow">
          <h1>My cases</h1>
          <p className="dl-error">Could not load your cases. Try refreshing.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="dl-page">
      <section className="dl-hero">
        <div className="wrap-narrow">
          <div className="eyebrow">Your dashboard</div>
          <h1>My cases</h1>
          <p className="lede">
            Every case you start with CivilCase lives here. Edit your letter, track delivery,
            and pick up where you left off.
          </p>
        </div>
      </section>

      <section className="wrap-narrow">
        {!cases || cases.length === 0 ? (
          <div className="dl-empty">
            <h2>No cases yet</h2>
            <p>Start by drafting a demand letter — it&apos;s free to preview.</p>
            <Link href="/demand-letter" className="btn btn-dark">
              Send a Demand Letter
            </Link>
          </div>
        ) : (
          <ul className="dl-case-list">
            {(cases as Case[]).map((c) => {
              const status = STATUS_LABELS[c.status] || { label: c.status, tone: "neutral" as const };
              return (
                <li key={c.id} className="dl-case-card">
                  <div className="dl-case-main">
                    <div className="dl-case-title">
                      <span className="dl-case-defendant">vs. {c.defendant_name}</span>
                      <span className="dl-case-amount">{formatDollars(c.amount_cents)}</span>
                    </div>
                    <div className="dl-case-meta">
                      {c.dispute_type.replace(/_/g, " ")} · {c.state} · updated {formatDate(c.updated_at)}
                    </div>
                  </div>
                  <div className={`dl-case-status dl-case-status-${status.tone}`}>
                    {status.label}
                  </div>
                  <Link href={`/demand-letter/${c.id}/preview`} className="dl-case-link">
                    Open →
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </main>
  );
}

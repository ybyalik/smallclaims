import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "../../../../../lib/supabase/server";

export const metadata: Metadata = {
  title: "Case",
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
  filed: { label: "Filed", tone: "active" },
  served: { label: "Served", tone: "active" },
  judgment_entered: { label: "Judgment entered", tone: "done" },
  settled: { label: "Settled", tone: "done" },
  closed: { label: "Closed", tone: "done" },
};

function formatDollars(amount_cents: number): string {
  return (amount_cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export default async function CaseDetailPage({ params }: { params: { id: string } }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createClient() as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: caseRow } = await supabase
    .from("cases")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!caseRow) notFound();

  // Drafts are mid-wizard. Send the user back to the wizard so they can pick
  // up where they left off, instead of showing an empty detail view.
  // intake_version 2 = the new 5-phase wizard (post-Phase-1 rebuild).
  // intake_version 1 = the old single-page intake form (legacy).
  if (caseRow.status === "draft") {
    if (caseRow.intake_version === 2) {
      redirect(`/demand-letter/wizard/${caseRow.id}`);
    }
    // Legacy v1 drafts: keep the old detail behavior so we don't break them.
  }

  const { data: letter } = await supabase
    .from("demand_letters")
    .select("*")
    .eq("case_id", params.id)
    .order("version", { ascending: false })
    .limit(1)
    .single();

  const status = STATUS_LABELS[caseRow.status] || { label: caseRow.status, tone: "neutral" as const };

  return (
    <div>
      <div className="app-page-head">
        <div>
          <Link href="/dashboard" className="app-back">
            ← All cases
          </Link>
          <h1>vs. {caseRow.defendant_name}</h1>
          <p className="app-page-sub">
            {caseRow.dispute_type.replace(/_/g, " ")} · {caseRow.state} · {formatDollars(caseRow.amount_cents)}
          </p>
        </div>
        <div>
          <span className={`app-case-status app-case-status-${status.tone}`}>{status.label}</span>
        </div>
      </div>

      <div className="app-detail-grid">
        <section className="app-detail-main">
          <h2>Demand letter</h2>
          {letter ? (
            <>
              <p className="app-page-sub">
                Version {letter.version} · drafted by AI · {letter.body_md.length.toLocaleString()} characters
              </p>
              <div className="app-letter-preview">{letter.body_md.slice(0, 600)}...</div>
              <div className="app-detail-actions">
                <Link href={`/dashboard/demand-letters/${caseRow.id}/letter`} className="btn btn-dark">
                  Open letter editor
                </Link>
              </div>
            </>
          ) : (
            <p className="app-page-sub">No letter drafted yet.</p>
          )}
        </section>

        <aside className="app-detail-side">
          <div className="app-detail-card">
            <h3>Defendant</h3>
            <p>{caseRow.defendant_name}</p>
            {caseRow.defendant_address && (
              <p className="app-page-sub">
                {caseRow.defendant_address.line1}
                {caseRow.defendant_address.line2 ? <><br />{caseRow.defendant_address.line2}</> : null}
                <br />
                {caseRow.defendant_address.city}, {caseRow.defendant_address.state} {caseRow.defendant_address.zip}
              </p>
            )}
          </div>
          <div className="app-detail-card">
            <h3>Amount</h3>
            <p className="app-amount-big">{formatDollars(caseRow.amount_cents)}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

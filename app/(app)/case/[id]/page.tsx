import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "../../../../lib/supabase/server";
import type { Case, DemandLetter } from "../../../../lib/supabase/types";
import ResponseTracker, { type ResponseState } from "./ResponseTracker";
import { paidProductsForCase } from "../../../../lib/payments/access";
import { PRODUCTS } from "../../../../lib/stripe";

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

export default async function CaseSummaryPage({ params }: { params: { id: string } }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createClient() as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: caseRow } = await supabase
    .from("cases")
    .select("*")
    .eq("id", params.id)
    .eq("owner_user_id", user.id)
    .single();

  if (!caseRow) notFound();
  const c = caseRow as Case;

  // Drafts: send the user back to the builder so they can pick up where
  // they left off.
  if (c.status === "draft" && c.intake_version === 2) {
    redirect(`/case/${c.id}/build`);
  }

  // Letter + paid-products in parallel — both depend only on the case id,
  // and neither blocks the other. Was 3 sequential round-trips before.
  const [letterRes, paidSet] = await Promise.all([
    supabase
      .from("demand_letters")
      .select("*")
      .eq("case_id", params.id)
      .order("version", { ascending: false })
      .limit(1)
      .maybeSingle(),
    paidProductsForCase(c.id, ["filing_guide", "court_prep"]),
  ]);
  const ltr = (letterRes?.data ?? null) as DemandLetter | null;

  const status = STATUS_LABELS[c.status] || { label: c.status, tone: "neutral" as const };
  const caption =
    c.defendant_name?.trim()
      ? `${c.plaintiff_name?.trim() || "You"} vs. ${c.defendant_name}`
      : "Untitled case";

  // The tracker shows once a demand letter exists. If PostGrid is wired up
  // later, we'll switch this trigger to ltr.mail_status !== 'draft' so it
  // only appears once the letter is actually in transit/delivered.
  const showResponseTracker = !!ltr;
  const answers = (c.intake_answers as Record<string, unknown> | null) ?? {};
  const responseRecord = answers.demand_response as
    | { state: ResponseState; recorded_at: string }
    | null
    | undefined;
  const responseState: ResponseState = responseRecord?.state ?? "pending";
  const noResponseRecorded = responseState === "no_response";

  const filingPaid = paidSet.has("filing_guide");
  const prepPaid = paidSet.has("court_prep");
  const filingPriceLabel = (PRODUCTS.filing_guide.amount_cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
  const prepPriceLabel = (PRODUCTS.court_prep.amount_cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  return (
    <div>
      <div className="app-page-head">
        <div>
          <Link href="/dashboard/cases" className="app-back">
            ← All cases
          </Link>
          <h1>{caption}</h1>
          <p className="app-page-sub">
            {c.dispute_type.replace(/_/g, " ")} · {c.state} · {formatDollars(c.amount_cents)}
          </p>
        </div>
        <div>
          <span className={`app-case-status app-case-status-${status.tone}`}>{status.label}</span>
        </div>
      </div>

      {showResponseTracker ? (
        <ResponseTracker
          caseId={c.id}
          initialState={responseState}
          initialRecordedAt={responseRecord?.recorded_at ?? null}
          letterSentAt={ltr?.sent_at ?? ltr?.created_at ?? null}
        />
      ) : null}

      <div className="app-detail-grid">
        <section className="app-detail-main">
          <h2>Services</h2>
          <p className="app-page-sub">
            What you can do with this case. More services coming soon.
          </p>

          <ul className="app-service-list">
            <li className="app-service-card">
              <div className="app-service-meta">
                <h3>Send a demand letter</h3>
                <p>
                  Your AI-drafted letter, sent via certified mail under the CivilCase brand.
                  About half of disputes settle right here.
                </p>
                <span className="app-service-price">From $29</span>
              </div>
              <Link
                href={ltr ? `/dashboard/cases/${c.id}/letter` : `/case/${c.id}/build/review`}
                className="btn btn-green"
              >
                {ltr ? "Open letter" : "Get started →"}
              </Link>
            </li>

            <li className="app-service-card">
              <div className="app-service-meta">
                <h3>Court Prep Pack</h3>
                <p>
                  Personalized hearing prep. Your opening statement, the questions the judge
                  is likely to ask, your key-facts cheat sheet, and the pitfalls to avoid.
                </p>
                <span className="app-service-price">
                  {prepPaid ? "Unlocked" : `From ${prepPriceLabel}`}
                </span>
              </div>
              <Link href={`/case/${c.id}/prep`} className="btn btn-green">
                {prepPaid ? "Open prep pack" : "Get started →"}
              </Link>
            </li>

            <li className={`app-service-card${noResponseRecorded && !filingPaid ? " app-service-spotlight" : ""}`}>
              <div className="app-service-meta">
                <h3>File in court{noResponseRecorded && !filingPaid ? " — your recommended next step" : ""}</h3>
                <p>
                  A complete, state- and county-specific filing guide. Court venue, fee schedule,
                  forms, service of process, and what to bring on hearing day.
                  {noResponseRecorded && !filingPaid
                    ? " You marked the letter as ignored — this is the move."
                    : ""}
                </p>
                <span className="app-service-price">
                  {filingPaid ? "Unlocked" : `From ${filingPriceLabel}`}
                </span>
              </div>
              <Link href={`/case/${c.id}/file`} className="btn btn-green">
                {filingPaid ? "Open guide" : "Get started →"}
              </Link>
            </li>

          </ul>
        </section>

        <aside className="app-detail-side">
          <div className="app-detail-card">
            <h3>Case file</h3>
            <p className="app-page-sub" style={{ marginBottom: 12 }}>
              The information you&apos;ve added so far.
            </p>
            <Link href={`/case/${c.id}/build`} className="btn btn-cream btn-sm">
              Edit case details
            </Link>
          </div>
          <div className="app-detail-card">
            <h3>Defendant</h3>
            <p>{c.defendant_name || "—"}</p>
            {c.defendant_address && (
              <p className="app-page-sub">
                {c.defendant_address.line1}
                {c.defendant_address.line2 ? <><br />{c.defendant_address.line2}</> : null}
                <br />
                {c.defendant_address.city}, {c.defendant_address.state} {c.defendant_address.zip}
              </p>
            )}
          </div>
          <div className="app-detail-card">
            <h3>Amount</h3>
            <p className="app-amount-big">{formatDollars(c.amount_cents)}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

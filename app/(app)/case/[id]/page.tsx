// Unified case page. Shows the 3-step product timeline as the main content
// plus a sidebar (Case file, Defendant, Amount) and a response tracker once
// a demand letter exists. Same page works whether the user has bought 0, 1,
// 2, or 3 products.

import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { notFound, redirect } from "next/navigation";
import { createClient } from "../../../../lib/supabase/server";
import type { Case, DemandLetter } from "../../../../lib/supabase/types";
import ResponseTracker, { type ResponseState } from "./ResponseTracker";
import { paidProductsForCase } from "../../../../lib/payments/access";
import { reconcileAllPendingForCase } from "../../../../lib/payments/reconcile";
import { deriveStatusLabel } from "../../../../lib/cases/derive-status-label";
import CaseLifecycleActions from "./CaseLifecycleActions";
import LetterApprovalPanel from "./letter/LetterApprovalPanel";
import PageHead from "../../../../components/layout/PageHead";
import StatusBadge from "../../../../components/ui/StatusBadge";
import {
  disputeTypeOtherFrom,
  formatDisputeTypeShort,
} from "../../../../lib/cases/dispute-type-label";

export const metadata: Metadata = {
  title: "Case",
};

export const dynamic = "force-dynamic";

function formatDollars(amount_cents: number): string {
  return (amount_cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });
}

interface StepProps {
  index: number;
  badge: string;
  title: string;
  tagline: string;
  details: string;
  priceLabel: string;
  ctaLabel: string;
  ctaHref: string;
  // Optional second CTA rendered next to the primary one. Used on the
  // demand-letter step to expose Download Letter alongside Open Letter.
  // `download` true means render an <a> with a download attribute instead
  // of a Next Link so the browser triggers a file download.
  secondaryCta?: { href: string; label: string; download?: boolean };
  status: "purchased" | "ready";
  isLast?: boolean;
  // Highlight this step as the recommended next move (amber accent + pill).
  // Used by the case page when the user has recorded "no response" so the
  // Filing Kit pops as the obvious thing to do next.
  recommended?: boolean;
  // Optional extra content rendered inside the step card, below the CTA.
  // Used for the response tracker on the demand-letter step once the
  // letter has been purchased.
  children?: React.ReactNode;
}

function Step({
  index,
  badge,
  title,
  tagline,
  details,
  priceLabel,
  ctaLabel,
  ctaHref,
  secondaryCta,
  status,
  isLast,
  recommended,
  children,
}: StepProps) {
  return (
    <li className="product-timeline-step">
      <div className="product-timeline-badge">
        <span
          className={`product-timeline-badge-num${
            status === "purchased" ? " product-timeline-badge-num-done" : ""
          }`}
        >
          {status === "purchased" ? (
            <Check size={24} strokeWidth={3} aria-label="Purchased" />
          ) : (
            <span>{index}</span>
          )}
        </span>
        <span className="product-timeline-badge-label">{badge}</span>
        {!isLast ? (
          <span className="product-timeline-arrow" aria-hidden="true">
            <span className="product-timeline-arrow-line" />
            <span className="product-timeline-arrow-head" />
          </span>
        ) : null}
      </div>
      <div
        className={`product-timeline-card${
          recommended ? " product-timeline-card-recommended" : ""
        }`}
      >
        {recommended ? (
          <span className="product-timeline-recommended-pill">
            Recommended next step
          </span>
        ) : null}
        <div className="product-timeline-card-head">
          <h3>{title}</h3>
          {status === "purchased" ? (
            <StatusBadge variant="product" tone="done">
              Purchased ✓
            </StatusBadge>
          ) : (
            <span className="product-timeline-price">{priceLabel}</span>
          )}
        </div>
        <p className="product-timeline-tagline">{tagline}</p>
        <p className="product-timeline-details">{details}</p>
        <div className="product-timeline-cta">
          <Link
            href={ctaHref}
            className={`btn ${status === "purchased" ? "btn-cream" : "btn-dark"}`}
          >
            {ctaLabel}
          </Link>
          {secondaryCta ? (
            secondaryCta.download ? (
              <a
                href={secondaryCta.href}
                className="btn btn-cream"
                download
              >
                {secondaryCta.label}
              </a>
            ) : (
              <Link href={secondaryCta.href} className="btn btn-cream">
                {secondaryCta.label}
              </Link>
            )
          ) : null}
        </div>
        {children}
      </div>
    </li>
  );
}

export default async function CasePage({ params }: { params: { id: string } }) {
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

  // Drafts: send the user back to the wizard to finish intake.
  if (c.status === "draft" && c.intake_version === 2) {
    redirect(`/case/${c.id}/build`);
  }

  // Self-heal payment state by asking Stripe directly. Webhooks aren't 100%
  // reliable (preview deploys can't receive them at all). reconcileAllPendingForCase
  // does ONE DB query upfront and only calls Stripe for rows that aren't
  // already succeeded — so the common case (everything paid + settled) costs
  // one quick DB read instead of 4 Stripe API roundtrips. Runs in parallel
  // with the letter + paid-set queries below.
  const [, letterRes, paidSet] = await Promise.all([
    reconcileAllPendingForCase(c.id),
    supabase
      .from("demand_letters")
      .select("*")
      .eq("case_id", params.id)
      .order("version", { ascending: false })
      .limit(1)
      .maybeSingle(),
    paidProductsForCase(c.id, [
      "tier_send_letter",
      "tier_full_pressure",
      "filing_guide",
      "collection_plan",
    ]),
  ]);
  const ltr = (letterRes?.data ?? null) as DemandLetter | null;

  const letterPaid =
    paidSet.has("tier_send_letter") || paidSet.has("tier_full_pressure");
  const filingPaid = paidSet.has("filing_guide");
  const collectionPlanPaid = paidSet.has("collection_plan");

  const status = deriveStatusLabel({ c });
  const caption =
    c.defendant_name?.trim()
      ? `${c.plaintiff_name?.trim() || "You"} vs. ${c.defendant_name}`
      : "Untitled case";

  // Response tracker is for "did the defendant reply to the letter you sent"
  // — only meaningful once PostGrid has actually dispatched the letter, so
  // gate on mail_vendor_letter_id rather than just on the letter row existing.
  const showResponseTracker = !!ltr?.mail_vendor_letter_id && letterPaid;
  // Inline approval prompt: render the same Approve / Request changes
  // controls from /case/[id]/letter inside the case timeline step when
  // the letter is awaiting customer review.
  const showApprovalPanel =
    letterPaid &&
    !!ltr &&
    !ltr.mail_vendor_letter_id &&
    ((ltr.approval_status as string | undefined) ?? "pending") !== "approved";
  const answers = (c.intake_answers as Record<string, unknown> | null) ?? {};
  const responseRecord = answers.demand_response as
    | { state: ResponseState; recorded_at: string }
    | null
    | undefined;
  const responseState: ResponseState = responseRecord?.state ?? "pending";
  const noResponseRecorded = responseState === "no_response";

  return (
    <div>
      <PageHead
        back={{ href: "/dashboard/cases", label: "All Cases" }}
        title={caption}
        sub={
          <>
            {formatDisputeTypeShort(
              c.dispute_type,
              disputeTypeOtherFrom(c.intake_answers),
            )}{" "}
            · {c.state} · {formatDollars(c.amount_cents)}
          </>
        }
        actions={<StatusBadge tone={status.tone}>{status.label}</StatusBadge>}
      />

      <div className="app-detail-grid">
        <section className="app-detail-main">
          <h2>Your Next Steps</h2>
          <p className="app-page-sub" style={{ marginBottom: 14 }}>
            Most disputes follow these three steps in order. Each one is independent: buy them in any order, all at once, or just the one you need.
          </p>

          <ol className="product-timeline-list">
            <Step
              index={1}
              badge="Pre-suit"
              title="Demand Letter"
              tagline="Most disputes resolve here without ever going to court."
              details="We draft a firm, professional demand letter tailored to your case, send it by certified mail under the CivilCase brand, and track delivery. Tiers from $29."
              priceLabel="From $29"
              ctaLabel={letterPaid ? "Open Letter" : "Choose & buy"}
              ctaHref={
                letterPaid
                  ? `/case/${c.id}/letter`
                  : `/case/${c.id}/buy/demand-letter`
              }
              secondaryCta={
                // Only show Download once the letter row actually exists in
                // the DB. Before that, the PDF endpoint would 404 because
                // the LLM hasn't finished generating yet.
                letterPaid && !!ltr
                  ? {
                      href: `/api/demand-letter/${c.id}/pdf`,
                      label: "Download Letter",
                      download: true,
                    }
                  : undefined
              }
              status={letterPaid ? "purchased" : "ready"}
            >
              {showApprovalPanel ? (
                <LetterApprovalPanel
                  caseId={c.id}
                  approvalStatus={
                    ((ltr?.approval_status as
                      | "pending"
                      | "approved"
                      | "changes_requested"
                      | undefined) ?? "pending")
                  }
                  changesText={(ltr?.changes_text as string | null) ?? null}
                  hasMailVendorId={!!ltr?.mail_vendor_letter_id}
                />
              ) : null}
              {showResponseTracker ? (
                <ResponseTracker
                  caseId={c.id}
                  initialState={responseState}
                  initialRecordedAt={responseRecord?.recorded_at ?? null}
                  letterSentAt={ltr?.sent_at ?? ltr?.created_at ?? null}
                />
              ) : null}
            </Step>

            <Step
              index={2}
              badge="Go to court"
              title="Small Claims Filing Kit"
              tagline="Everything you need to file your case the right way the first time."
              details={`State- and county-specific filing guide. Court venue, fee schedule, required forms, service of process, and exactly what to bring on filing day.${
                noResponseRecorded && !filingPaid
                  ? " You marked the letter as ignored or refused, this is the move."
                  : ""
              }`}
              priceLabel="$79"
              ctaLabel={filingPaid ? "Open filing kit" : "Buy Filing Kit"}
              ctaHref={filingPaid ? `/case/${c.id}/file` : `/case/${c.id}/buy/filing-guide`}
              status={filingPaid ? "purchased" : "ready"}
              recommended={noResponseRecorded && !filingPaid}
            />

            <Step
              index={3}
              badge="After judgment"
              title="Post-Judgment Collection Plan"
              tagline="Won the case? Now actually collect the money."
              details="A step-by-step plan tailored to your state, your county, and what you know about the defendant. Real form codes, real fees, sequenced for THIS case."
              priceLabel="$49"
              ctaLabel={collectionPlanPaid ? "Open plan" : "Buy Collection Plan"}
              ctaHref={
                collectionPlanPaid
                  ? `/case/${c.id}/collection`
                  : `/case/${c.id}/buy/collection-plan`
              }
              status={collectionPlanPaid ? "purchased" : "ready"}
              isLast
            />
          </ol>
        </section>

        <aside className="app-detail-side">
          <div className="app-detail-card">
            <h3>Case file</h3>
            <p className="app-page-sub" style={{ marginBottom: 12 }}>
              The information you&apos;ve added so far.
            </p>
            <div className="app-detail-card-actions">
              <Link href={`/case/${c.id}/build`} className="btn btn-cream btn-sm">
                Edit case details
              </Link>
              <CaseLifecycleActions caseId={c.id} status={c.status} />
            </div>
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

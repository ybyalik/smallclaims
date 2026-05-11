import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "../../../../../lib/supabase/server";
import type { Case } from "../../../../../lib/supabase/types";
import { hasPaidForProduct } from "../../../../../lib/payments/access";
import { loadStateGuide } from "../../../../../lib/state-data";
import { STATES } from "../../../../../lib/states";
import { PRODUCTS } from "../../../../../lib/stripe";
import FilingGuideCheckout from "./FilingGuideCheckout";
import FilingGuideContent from "./FilingGuideContent";

export const metadata: Metadata = {
  title: "File in court — Filing Guide",
};

export const dynamic = "force-dynamic";

export default async function FilingGuidePage({ params }: { params: { id: string } }) {
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

  const paid = await hasPaidForProduct(c.id, "filing_guide");
  const stateMeta = STATES.find((s) => s.abbr === c.state) ?? null;
  const guide = stateMeta ? await loadStateGuide(stateMeta.slug) : null;

  const product = PRODUCTS.filing_guide;
  const priceDollars = (product.amount_cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  return (
    <div>
      <div className="app-page-head">
        <div>
          <Link href={`/case/${c.id}`} className="app-back">
            ← Back to case
          </Link>
          <h1>File in court</h1>
          <p className="app-page-sub">
            Your demand letter ran its course. Time to take this to small-claims court.
          </p>
        </div>
      </div>

      {!paid ? (
        <FilingGuideUnpaidView
          caseId={c.id}
          stateName={stateMeta?.name ?? c.state}
          guideAvailable={!!guide}
          priceLabel={priceDollars}
        />
      ) : guide ? (
        <FilingGuideContent guide={guide} caseRow={c} />
      ) : (
        <FilingGuidePendingView stateName={stateMeta?.name ?? c.state} />
      )}
    </div>
  );
}

function FilingGuideUnpaidView({
  caseId,
  stateName,
  guideAvailable,
  priceLabel,
}: {
  caseId: string;
  stateName: string;
  guideAvailable: boolean;
  priceLabel: string;
}) {
  return (
    <div className="filing-unpaid">
      <div className="filing-hero">
        <h2>Your specific case, your specific court.</h2>
        <p>
          The hardest part of small-claims court isn&rsquo;t the fight — it&rsquo;s figuring out{" "}
          <em>where to file, what forms to bring, how to pay, and how to serve the defendant</em>.
          Get it wrong and the clerk hands your packet back. Get it right and you have a real
          court date in 30 to 60 days.
        </p>
      </div>

      <div className="filing-includes">
        <h3>What you&rsquo;ll get</h3>
        <ul>
          <li>
            <strong>Where to file in {stateName}.</strong> The exact court name, parent court,
            venue rules, and what happens if you pick the wrong county.
          </li>
          <li>
            <strong>Filing fees and waiver eligibility.</strong> What you pay based on your
            claim amount, and whether you qualify for a fee waiver.
          </li>
          <li>
            <strong>The forms you need.</strong> Form numbers, names, and direct links from
            your state&rsquo;s Judicial Council.
          </li>
          <li>
            <strong>Service of process.</strong> Who can serve, methods allowed, timing, the
            proof-of-service form, and what to do if you can&rsquo;t find the defendant.
          </li>
          <li>
            <strong>Hearing day.</strong> What to bring, who can speak, format, and how the
            decision typically gets delivered.
          </li>
          <li>
            <strong>County-specific notes.</strong> Where county procedure differs from the
            statewide default.
          </li>
        </ul>
      </div>

      <div className="filing-cta">
        <div className="filing-price">
          <span className="filing-price-amount">{priceLabel}</span>
          <span className="filing-price-meta">one-time, your case</span>
        </div>
        <FilingGuideCheckout caseId={caseId} disabled={!guideAvailable} />
        {!guideAvailable ? (
          <p className="filing-guide-pending-note">
            We&rsquo;re still finalizing the {stateName} guide. Reach out to support and we&rsquo;ll
            let you know when it&rsquo;s ready.
          </p>
        ) : null}
      </div>

      <p className="filing-disclaimer">
        We are not a law firm and do not provide legal advice. The Filing Guide is general
        information about the court and procedures in your state. You file the case yourself.
      </p>
    </div>
  );
}

function FilingGuidePendingView({ stateName }: { stateName: string }) {
  return (
    <div className="app-empty">
      <h2>Filing Guide for {stateName} is being prepared</h2>
      <p>
        We have your payment on file. The {stateName} Filing Guide will appear here once
        it&rsquo;s ready — we&rsquo;ll email you when it&rsquo;s live.
      </p>
    </div>
  );
}

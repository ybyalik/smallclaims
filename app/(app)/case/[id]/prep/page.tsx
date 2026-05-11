import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "../../../../../lib/supabase/server";
import type { Case } from "../../../../../lib/supabase/types";
import { hasPaidForProduct } from "../../../../../lib/payments/access";
import { PRODUCTS } from "../../../../../lib/stripe";
import type { CourtPrepPack } from "../../../../../lib/court-prep/types";
import CourtPrepCheckout from "./CourtPrepCheckout";
import CourtPrepView from "./CourtPrepView";

export const metadata: Metadata = {
  title: "Court Prep",
};

export const dynamic = "force-dynamic";

export default async function CourtPrepPage({ params }: { params: { id: string } }) {
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

  const paid = await hasPaidForProduct(c.id, "court_prep");
  const product = PRODUCTS.court_prep;
  const priceLabel = (product.amount_cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  const cachedPack = (c.court_prep_content as CourtPrepPack | null) ?? null;

  return (
    <div>
      <div className="app-page-head">
        <div>
          <Link href={`/case/${c.id}`} className="app-back">
            ← Back to case
          </Link>
          <h1>Court Prep Pack</h1>
          <p className="app-page-sub">
            Walk into your hearing knowing what the judge will ask and exactly how to answer.
          </p>
        </div>
      </div>

      {!paid ? (
        <CourtPrepUnpaidView caseId={c.id} priceLabel={priceLabel} />
      ) : (
        <CourtPrepView caseId={c.id} initialPack={cachedPack} />
      )}
    </div>
  );
}

function CourtPrepUnpaidView({
  caseId,
  priceLabel,
}: {
  caseId: string;
  priceLabel: string;
}) {
  return (
    <div className="filing-unpaid">
      <div className="filing-hero">
        <h2>The hearing is short. Your prep doesn&rsquo;t have to be.</h2>
        <p>
          Small-claims hearings are usually 10 to 15 minutes. Judges decide on impressions: did
          you tell a clean story, can you back it up, and are you the kind of person they&rsquo;d
          want to award money to? The Court Prep Pack gets you ready for all three — built from
          your specific case facts, not generic templates.
        </p>
      </div>

      <div className="filing-includes">
        <h3>What you&rsquo;ll get</h3>
        <ul>
          <li>
            <strong>Your opening statement.</strong> Written in your voice, 3 to 5 paragraphs you
            can read aloud or memorize. Covers what happened, what you&rsquo;re owed, and the
            evidence you have.
          </li>
          <li>
            <strong>The questions the judge will ask.</strong> 5 to 8 of the most likely
            questions for your case category, with talking-point outlines (not canned scripts) for
            each.
          </li>
          <li>
            <strong>Your key-facts cheat sheet.</strong> The dates, dollar amounts, and statutes
            you should know cold — printed on one page you can bring with you.
          </li>
          <li>
            <strong>Common pitfalls to avoid.</strong> What plaintiffs in your kind of case
            commonly say that costs them the win.
          </li>
          <li>
            <strong>The evidence to bring.</strong> Specific items based on your case facts — not
            a generic checklist.
          </li>
        </ul>
      </div>

      <div className="filing-cta">
        <div className="filing-price">
          <span className="filing-price-amount">{priceLabel}</span>
          <span className="filing-price-meta">one-time, your case</span>
        </div>
        <CourtPrepCheckout caseId={caseId} />
      </div>

      <p className="filing-disclaimer">
        We are not a law firm and do not provide legal advice. The prep pack is general guidance
        based on the facts you provided. You speak for yourself at the hearing.
      </p>
    </div>
  );
}

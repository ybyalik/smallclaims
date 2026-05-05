import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import { availableStateSlugs } from "../../../../lib/state-data";
import { STATES } from "../../../../lib/states";

export const metadata: Metadata = {
  title: "How to Sue Someone Who Owes You Money",
  description: "Plain-English guide to recovering personal loans. Friends, family, exes, IOUs, verbal agreements, cash loans, and informal debts. What you can recover and how to file in your state.",
  alternates: { canonical: "/small-claims/personal-loan" },
  openGraph: { title: "How to Sue Someone Who Owes You Money | CivilCase", description: "Lender-versus-borrower disputes you can take to small claims, what you can recover, and how to file.", url: "/small-claims/personal-loan", type: "article" },
};

const ISSUES = [
  { slug: "someone-owes-me-money", title: "Someone owes me money", blurb: "General loan recovery. Bank record + texts + state legal interest. Most informal loans are recoverable in small claims.", icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9"/><path d="M9 9h6M9 12h6M9 15h4"/></svg>, ready: true },
  { slug: "friend-not-paying-back", title: "Friend not paying back", blurb: "Venmo/Zelle records + text messages establish the loan. Most cases settle once a demand letter arrives.", icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>, ready: true },
  { slug: "family-member", title: "Family member owes money", blurb: "Family loans face a gift presumption. Bank memos + texts + written agreements overcome it. Family fallout is significant.", icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 21V11M5 21V11M19 21V11M3 11l9-7 9 7"/></svg>, ready: true },
  { slug: "ex-or-after-breakup", title: "Ex owes me money", blurb: "Post-breakup recovery. Bank memos and texts overcome the gift defense. Pure cohabitation cases fit small claims.", icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/><path d="M5 5l14 14"/></svg>, ready: true },
  { slug: "iou", title: "IOU not paid back", blurb: "Strongest type of loan evidence. Written promissory note. 4-to-6-year statute. Most defenses fail at the hearing.", icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M9 13h6M9 17h6"/></svg>, ready: true },
  { slug: "verbal-agreement", title: "Verbal agreement", blurb: "Oral contracts are enforceable in most states. Bank records + texts + witnesses combine to prove the agreement.", icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>, ready: true },
  { slug: "cash-loan", title: "Cash loan not repaid", blurb: "ATM record + witness + borrower's texts establish cash transfers. Harder cases but very winnable with documentation.", icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M8 15h2M14 15h2"/></svg>, ready: true },
  { slug: "unpaid-debt-no-contract", title: "Debt without a contract", blurb: "Unjust enrichment + promissory estoppel. Recovery without formal contract. Bank record + understanding of obligation = case.", icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>, ready: true },
];

const FEATURED_STATE_SLUGS = ["california", "texas", "florida", "new-york", "illinois", "pennsylvania", "ohio", "georgia", "michigan", "north-carolina", "minnesota", "delaware"];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", headline: "How to Sue Someone Who Owes You Money", description: "Practical guide to recovering personal loans in small claims for friends, family, exes, IOUs, verbal agreements, cash loans, and informal debts.", author: { "@type": "Organization", name: "CivilCase" }, publisher: { "@type": "Organization", name: "CivilCase" } },
    { "@type": "FAQPage", mainEntity: [
      { "@type": "Question", name: "Can I sue someone who owes me money in small claims court?", acceptedAnswer: { "@type": "Answer", text: "Yes, when the amount fits your state's cap (usually $5,000 to $20,000). Most informal loans are recoverable: friend loans via Venmo, family loans, oral agreements, IOUs, cash loans with witness, and even loans without a written contract under unjust enrichment theory." } },
      { "@type": "Question", name: "Do I need a written contract to sue?", acceptedAnswer: { "@type": "Answer", text: "No. Oral contracts are enforceable in most states. Bank records, texts, and witness testimony all establish the agreement. Even without an explicit contract, unjust enrichment and promissory estoppel provide alternative theories." } },
      { "@type": "Question", name: "How long do I have to sue?", acceptedAnswer: { "@type": "Answer", text: "Written contracts (IOUs): 4 to 6 years in most states (some up to 10). Oral contracts: 2 to 4 years. Unjust enrichment: 3 to 4 years. Statute usually starts on the agreed repayment date or first demand. Move fast." } },
    ] },
  ],
};

export default function PersonalLoanHubPage() {
  const ready = new Set(availableStateSlugs());
  const featured = FEATURED_STATE_SLUGS.map((slug) => { const meta = STATES.find((s) => s.slug === slug); return meta && ready.has(slug) ? meta : null; }).filter((s): s is NonNullable<typeof s> => s !== null);

  return (
    <main className="cat-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="wrap">
        <Breadcrumbs items={[{ href: "/small-claims", label: "Small Claims" }, { label: "Personal Loan Disputes" }]} />
        <header className="cat-hero-3col">
          <div className="cat-hero-copy">
            <span className="eyebrow">Category</span>
            <h1>How to <em>sue someone who owes you money</em>.</h1>
            <p className="cat-lede">Friend, family member, ex, or stranger. With or without a written agreement. Small claims is built for these cases. Most informal loans are recoverable: bank records, texts, witness testimony, and the borrower's own statements all establish the agreement. Most cases settle once a demand letter arrives.</p>
            <div className="hero-ctas"><Link href="/case-score" className="btn btn-dark">Check my case (free)</Link><Link href="/demand-letter" className="btn btn-cream">Send a demand letter</Link></div>
          </div>
          <div className="cat-hero-stat">
            <div><div className="cat-hero-stat-eyebrow">Typical lender recovery</div><div className="cat-hero-stat-big">$4,200</div><div className="cat-hero-stat-sub">illustrative · varies by amount and term</div></div>
            <div><div className="cat-hero-bars"><span style={{ height: "30%" }}></span><span style={{ height: "55%" }}></span><span style={{ height: "78%" }}></span><span style={{ height: "92%" }}></span></div><div className="cat-hero-bars-row"><b>Apr</b><b>May</b><b>Jun</b><b>Jul</b></div></div>
          </div>
          <div className="cat-hero-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1554224155-1696413565d3?w=800&h=1100&fit=crop" alt="Stack of bills and contract on desk" />
          </div>
        </header>

        <section className="cat-section">
          <div className="sec-head" style={{ textAlign: "left", marginBottom: 28 }}>
            <h2 style={{ margin: 0 }}>What kind of loan are you trying to <em>recover</em>?</h2>
            <p style={{ marginTop: 12, marginLeft: 0, maxWidth: "60ch" }}>Each guide covers what you can recover, what evidence to bring, and how to file in your state.</p>
          </div>
          <div className="cat-grid">
            {ISSUES.map((i) => { const inner = (<><div className="cat-card-icon">{i.icon}</div><h3>{i.title}</h3><p>{i.blurb}</p></>); return i.ready ? <Link key={i.slug} href={`/small-claims/sue-loan-${i.slug}`} className="cat-card">{inner}</Link> : <div key={i.slug} className="cat-card soon" aria-disabled="true">{inner}</div>; })}
            <Link href="/case-score" className="cat-card cat-card-quiz">
              <div className="cat-card-icon" style={{ background: "rgba(217,64,46,0.18)" }}><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg></div>
              <h3>Something else?</h3><p>Tell us about your situation in 90 seconds and get a strength read on your case.</p>
            </Link>
          </div>
        </section>

        <section className="cat-section">
          <div className="cat-stack-head"><span className="eyebrow">Damages</span><h2>What can you <em>recover</em>?</h2><p>The math judges use. A typical informal-loan case stacks the principal, pre-judgment interest, and filing fees.</p></div>
          <div className="cat-recovery">
            <div className="cat-recovery-rows">
              <div className="cat-recovery-row"><div className="cat-recovery-label"><span className="cat-recovery-tag">Original loan</span><p>The amount you transferred plus any costs you paid on the borrower's behalf.</p></div><div className="cat-recovery-amount">$3,500</div><div className="cat-recovery-bar"><span style={{ width: "65%" }}></span></div></div>
              <div className="cat-recovery-row"><div className="cat-recovery-label"><span className="cat-recovery-tag accent">Pre-judgment interest</span><p>State legal rate (7-10% per year typical) running from agreed repayment date.</p></div><div className="cat-recovery-amount accent">+$500</div><div className="cat-recovery-bar"><span style={{ width: "30%", background: "var(--accent)" }}></span></div></div>
              <div className="cat-recovery-row"><div className="cat-recovery-label"><span className="cat-recovery-tag">Filing fee</span><p>Filing fee, service-of-process cost, post-judgment interest until paid.</p></div><div className="cat-recovery-amount">+$200</div><div className="cat-recovery-bar"><span style={{ width: "5%" }}></span></div></div>
            </div>
            <div className="cat-recovery-total">
              <div className="cat-recovery-total-label"><span className="eyebrow" style={{ color: "rgba(254,249,241,0.65)" }}>What you walk away with</span><h3>Estimated recovery</h3><p>Sample math on a typical informal loan. Your numbers will differ.</p></div>
              <div className="cat-recovery-total-num"><em>$4,200</em><span>typical small-claims recovery</span></div>
            </div>
          </div>
        </section>

        <section className="cat-section">
          <div className="cat-split">
            <div className="cat-split-intro"><span className="eyebrow">By state</span><h2>State-specific <em>rules</em>.</h2><p>Statute of limitations varies (2 to 6 years for oral, 4 to 10 for written). Pre-judgment interest rates differ. Some states require notice before suit. Pick yours for the exact rules.</p><Link href="/small-claims" className="cat-text-link">See all 50 state guides →</Link></div>
            <div className="cat-state-grid">{featured.map((s) => (<Link key={s.slug} href={`/small-claims/${s.slug}`} className="cat-state-link"><span>{s.name}</span><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></Link>))}</div>
          </div>
        </section>

        <section className="cat-section">
          <div className="cat-cta-card">
            <div><span className="eyebrow" style={{ color: "rgba(254,249,241,0.65)" }}>Take the next step</span><h2 style={{ marginTop: 14 }}>Three ways to <em>move forward</em>.</h2><p>Most informal loan disputes settle once a real demand letter arrives. If yours does not, the state guide walks you through filing step by step.</p></div>
            <div className="cat-cta-row">
              <Link href="/demand-letter" className="cat-cta-tile"><div className="cat-cta-tile-icon"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg></div><div><strong>Send a demand letter</strong><span>Many disputes end here.</span></div></Link>
              <Link href="/case-score" className="cat-cta-tile"><div className="cat-cta-tile-icon"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 21V5M3 21h18M7 17V11M12 17V8M17 17V13"/></svg></div><div><strong>Check my case</strong><span>Free 7-question case-strength quiz.</span></div></Link>
              <Link href="/small-claims" className="cat-cta-tile"><div className="cat-cta-tile-icon"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 3v18M5 9l7-6 7 6M3 21h18"/></svg></div><div><strong>File your claim</strong><span>Step-by-step in your state.</span></div></Link>
            </div>
          </div>
        </section>

        <section className="cat-section">
          <div className="cat-split">
            <div className="cat-split-intro"><span className="eyebrow">FAQ</span><h2>Common <em>questions</em>.</h2><p>The questions lenders actually ask before filing. Don&rsquo;t see yours?{" "}<Link href="/contact" className="cat-text-link">Email support</Link>.</p></div>
            <div className="cat-faq">
              <details><summary>Can I sue someone who owes me money?</summary><div><p>Yes, when the amount fits your state&rsquo;s cap (usually $5,000 to $20,000). Most informal loans are recoverable: friend loans via Venmo, family loans, oral agreements, IOUs, cash loans, even loans without a written contract under unjust enrichment theory.</p></div></details>
              <details><summary>Do I need a written contract to sue?</summary><div><p>No. Oral contracts are enforceable in most states. Bank records, texts, and witness testimony all establish the agreement. Even without an explicit contract, unjust enrichment and promissory estoppel provide alternative theories.</p></div></details>
              <details><summary>How long do I have to sue?</summary><div><p>Written contracts (IOUs): 4 to 6 years in most states (some up to 10). Oral contracts: 2 to 4 years. Unjust enrichment: 3 to 4 years. Statute usually starts on the agreed repayment date or first demand.</p></div></details>
              <details><summary>What if the borrower says it was a gift?</summary><div><p>Bring the texts. The borrower&rsquo;s own words about &lsquo;pay back&rsquo; or &lsquo;loan&rsquo; in any text or platform-note (Venmo memo) overcome the gift defense decisively. Friends and family rarely send &lsquo;pay back&rsquo; messages for actual gifts.</p></div></details>
              <details><summary>Can I charge interest?</summary><div><p>Yes if agreed in advance. Without agreement, you can claim pre-judgment interest at the state legal rate (7 to 10 percent per year typical). Higher contractual interest may be limited by state usury laws.</p></div></details>
            </div>
          </div>
        </section>

        <p className="cat-disclaimer"><strong>This is general legal information, not legal advice.</strong> CivilCase is not a law firm. Statutes of limitations, the Statute of Frauds, and pre-judgment interest rates vary by state. Verify deadlines and citations against your state&rsquo;s official source before filing, or{" "}<Link href="/disclaimer" className="cat-text-link">read our disclaimer</Link>.</p>
      </div>
    </main>
  );
}

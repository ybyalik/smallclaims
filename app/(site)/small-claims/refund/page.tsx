import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import { availableStateSlugs } from "../../../../lib/state-data";
import { STATES } from "../../../../lib/states";

export const metadata: Metadata = {
  title: "How to Sue for a Refund in Small Claims Court",
  description: "Plain-English guide to suing for refunds. Defective products, gym memberships, dry cleaners, salons, and services not rendered. State UDAP statutes and demand-letter templates.",
  alternates: { canonical: "/small-claims/refund" },
  openGraph: { title: "How to Sue for a Refund | CivilCase", description: "Consumer refund disputes you can take to small claims, what you can recover, and how to file.", url: "/small-claims/refund", type: "article" },
};

const ISSUES = [
  { slug: "refund-general", title: "Refund (general)", blurb: "State UDAP + breach of contract. 2x or 3x multipliers in many states. Use chargebacks first; small claims as backup.", icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 12l9-9 9 9"/><path d="M9 21V12h6v9"/><path d="M3 12l9 9 9-9"/></svg>, ready: true },
  { slug: "gym-membership", title: "Gym membership", blurb: "Most states have specific health-club statutes (CA Civ. Code § 1812.82). Cooling-off periods + cancellation rights override 'no refund' clauses.", icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 5v14M5 12h14"/></svg>, ready: true },
  { slug: "dry-cleaner", title: "Dry cleaner damage", blurb: "Bailment law presumes negligence. Disclaimer signs are usually unenforceable. Replacement value of damaged items.", icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M16 4l-4 4-4-4M12 8v14M5 22h14"/></svg>, ready: true },
  { slug: "salon-or-hairdresser", title: "Salon / hairdresser damage", blurb: "Negligence + breach of professional service. Photos before/after + corrective treatment receipts establish the case.", icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="8" r="5"/><path d="M3 21v-2a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v2"/></svg>, ready: true },
  { slug: "defective-product", title: "Defective product", blurb: "Federal Magnuson-Moss + state implied warranty + state UDAP. Attorney fees shifted to losing manufacturer.", icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M9 12l2 2 4-4"/></svg>, ready: true },
  { slug: "services-not-rendered", title: "Services not rendered", blurb: "Breach of contract + state UDAP. Refund of payment + 2x multiplier. Documentation of agreement and lack of performance is the case.", icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9"/><path d="M9 9.5l1 1M15 9.5l-1 1M8 16s1.5-2 4-2 4 2 4 2"/></svg>, ready: true },
];

const FEATURED_STATE_SLUGS = ["california", "texas", "florida", "new-york", "illinois", "pennsylvania", "ohio", "georgia", "michigan", "north-carolina", "minnesota", "delaware"];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", headline: "How to Sue for a Refund in Small Claims Court", description: "Practical guide to refund disputes: defective products, gym memberships, dry cleaners, salons, and services not rendered.", author: { "@type": "Organization", name: "CivilCase" }, publisher: { "@type": "Organization", name: "CivilCase" } },
    { "@type": "FAQPage", mainEntity: [
      { "@type": "Question", name: "Can I sue for a refund in small claims court?", acceptedAnswer: { "@type": "Answer", text: "Yes. State consumer-protection laws (UDAP) cover most refund disputes with 2x or 3x multipliers in many states. Implied warranty of merchantability for products. Bailment law for damaged-clothes cases. Most disputes settle once a real demand letter arrives." } },
      { "@type": "Question", name: "Should I do a chargeback or sue?", acceptedAnswer: { "@type": "Answer", text: "Try chargeback first for credit card purchases (60-120 day window). Often the fastest recovery. Use small claims for cases the chargeback doesn't cover or denied claims." } },
      { "@type": "Question", name: "What about 'all sales final' policies?", acceptedAnswer: { "@type": "Answer", text: "'All sales final' clauses don't override state UDAP or implied warranty. Defective products and services not rendered have implied warranty rights regardless of policy." } },
    ] },
  ],
};

export default function RefundHubPage() {
  const ready = new Set(availableStateSlugs());
  const featured = FEATURED_STATE_SLUGS.map((slug) => { const meta = STATES.find((s) => s.slug === slug); return meta && ready.has(slug) ? meta : null; }).filter((s): s is NonNullable<typeof s> => s !== null);

  return (
    <main className="cat-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="wrap">
        <Breadcrumbs items={[{ href: "/small-claims", label: "Small Claims" }, { label: "Refund Disputes" }]} />
        <header className="cat-hero-3col">
          <div className="cat-hero-copy">
            <span className="eyebrow">Category</span>
            <h1>How to <em>get a refund</em> in small claims court.</h1>
            <p className="cat-lede">Defective products, gym memberships that won't cancel, dry cleaners that ruined your clothes, salons that damaged your hair, services never performed. State UDAP statutes apply with 2x or 3x multipliers. Most cases settle once a demand letter cites the specific statute. Use chargebacks first when possible.</p>
            <div className="hero-ctas"><Link href="/case-score" className="btn btn-dark">Check my case (free)</Link><Link href="/demand-letter" className="btn btn-cream">Send a demand letter</Link></div>
          </div>
          <div className="cat-hero-stat">
            <div><div className="cat-hero-stat-eyebrow">Typical refund recovery</div><div className="cat-hero-stat-big">$1,500</div><div className="cat-hero-stat-sub">illustrative · varies by case type</div></div>
            <div><div className="cat-hero-bars"><span style={{ height: "30%" }}></span><span style={{ height: "55%" }}></span><span style={{ height: "78%" }}></span><span style={{ height: "92%" }}></span></div><div className="cat-hero-bars-row"><b>Apr</b><b>May</b><b>Jun</b><b>Jul</b></div></div>
          </div>
          <div className="cat-hero-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1554224155-1696413565d3?w=800&h=1100&fit=crop" alt="Receipts and refund forms" />
          </div>
        </header>

        <section className="cat-section">
          <div className="sec-head" style={{ textAlign: "left", marginBottom: 28 }}>
            <h2 style={{ margin: 0 }}>What kind of refund are you trying to recover?</h2>
            <p style={{ marginTop: 12, marginLeft: 0, maxWidth: "60ch" }}>Each guide covers what you can recover and how to file.</p>
          </div>
          <div className="cat-grid">
            {ISSUES.map((i) => { const inner = (<><div className="cat-card-icon">{i.icon}</div><h3>{i.title}</h3><p>{i.blurb}</p></>); return i.ready ? <Link key={i.slug} href={`/small-claims/sue-refund-${i.slug}`} className="cat-card">{inner}</Link> : <div key={i.slug} className="cat-card soon" aria-disabled="true">{inner}</div>; })}
            <Link href="/case-score" className="cat-card cat-card-quiz">
              <div className="cat-card-icon" style={{ background: "rgba(217,64,46,0.18)" }}><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg></div>
              <h3>Something else?</h3><p>Tell us about your situation in 90 seconds and get a strength read on your case.</p>
            </Link>
          </div>
        </section>

        <section className="cat-section">
          <div className="cat-split">
            <div className="cat-split-intro"><span className="eyebrow">By state</span><h2>State-specific <em>rules</em>.</h2><p>UDAP multipliers (2x or 3x), pre-judgment interest, and consumer-protection statutes vary by state. Pick yours.</p><Link href="/small-claims" className="cat-text-link">See all 50 state guides →</Link></div>
            <div className="cat-state-grid">{featured.map((s) => (<Link key={s.slug} href={`/small-claims/${s.slug}`} className="cat-state-link"><span>{s.name}</span><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></Link>))}</div>
          </div>
        </section>

        <section className="cat-section">
          <div className="cat-cta-card">
            <div><span className="eyebrow" style={{ color: "rgba(254,249,241,0.65)" }}>Take the next step</span><h2 style={{ marginTop: 14 }}>Three ways to <em>move forward</em>.</h2><p>Try chargeback first for credit card purchases. Then demand letter. Small claims as final step.</p></div>
            <div className="cat-cta-row">
              <Link href="/demand-letter" className="cat-cta-tile"><div className="cat-cta-tile-icon"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg></div><div><strong>Send a demand letter</strong><span>Many disputes end here.</span></div></Link>
              <Link href="/case-score" className="cat-cta-tile"><div className="cat-cta-tile-icon"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 21V5M3 21h18M7 17V11M12 17V8M17 17V13"/></svg></div><div><strong>Check my case</strong><span>Free 7-question case-strength quiz.</span></div></Link>
              <Link href="/small-claims" className="cat-cta-tile"><div className="cat-cta-tile-icon"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 3v18M5 9l7-6 7 6M3 21h18"/></svg></div><div><strong>File your claim</strong><span>Step-by-step in your state.</span></div></Link>
            </div>
          </div>
        </section>

        <section className="cat-section">
          <div className="cat-split">
            <div className="cat-split-intro"><span className="eyebrow">FAQ</span><h2>Common <em>questions</em>.</h2><p>The questions consumers actually ask before filing. Don&rsquo;t see yours?{" "}<Link href="/contact" className="cat-text-link">Email support</Link>.</p></div>
            <div className="cat-faq">
              <details><summary>Can I sue for a refund in small claims court?</summary><div><p>Yes. State consumer-protection laws (UDAP) cover most refund disputes with 2x or 3x multipliers in many states. Implied warranty of merchantability for products. Bailment law for damaged-clothes cases.</p></div></details>
              <details><summary>Should I do a chargeback or sue?</summary><div><p>Try chargeback first for credit card purchases (60-120 day window). Often the fastest recovery. Use small claims for cases the chargeback doesn&rsquo;t cover or denied claims.</p></div></details>
              <details><summary>What about &lsquo;all sales final&rsquo; policies?</summary><div><p>&lsquo;All sales final&rsquo; clauses don&rsquo;t override state UDAP or implied warranty. Defective products and services not rendered have implied warranty rights regardless of policy.</p></div></details>
              <details><summary>What is UDAP?</summary><div><p>Unfair and Deceptive Acts and Practices: state consumer-protection laws prohibiting deceptive business practices. Most states have UDAP statutes with 2x or 3x damage multipliers and attorney fee-shifting.</p></div></details>
              <details><summary>How long do I have to sue?</summary><div><p>State UDAP claims usually run 2 to 4 years. Breach of contract: 4 to 6 years. Specific statutes (gym membership, etc.) may have specific deadlines.</p></div></details>
            </div>
          </div>
        </section>

        <p className="cat-disclaimer"><strong>This is general legal information, not legal advice.</strong> CivilCase is not a law firm. Consumer-protection statutes and refund rights vary widely by state. Verify deadlines and citations against your state&rsquo;s official source before filing, or{" "}<Link href="/disclaimer" className="cat-text-link">read our disclaimer</Link>.</p>
      </div>
    </main>
  );
}

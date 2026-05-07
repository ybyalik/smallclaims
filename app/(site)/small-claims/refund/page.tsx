import type { Metadata } from "next";
import HeroCta from "../../../../components/HeroCta";
import HeroStatePins from "../../../../components/HeroStatePins";
import CtaStepCard from "../../../../components/CtaStepCard";
import Link from "next/link";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import { availableStateSlugs } from "../../../../lib/state-data";
import { STATES } from "../../../../lib/states";

const ISSUE_PHOTOS = ["1554224154-26032ffc0d07", "1554224155-1696413565d3", "1556761175-5973dc0f32e7", "1556909114-f6e7ad7d3136", "1450101499163-c8848c66ca85"];

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
        <header className="cat-hero-2col">
          <div className="cat-hero-copy">
            <span className="eyebrow">Category</span>
            <h1>How to <em>get a refund</em> in small claims court.</h1>
            <p className="cat-lede">Defective products, gym memberships that won't cancel, dry cleaners that ruined your clothes, salons that damaged your hair, services never performed. State UDAP statutes apply with 2x or 3x multipliers. Most cases settle once a demand letter cites the specific statute. Use chargebacks first when possible.</p>
            <div className="hero-ctas"><HeroCta href="/case-score" variant="dark" icon="case-score">Check my case (free)</HeroCta><HeroCta href="/demand-letter" variant="cream" icon="demand-letter">Send a demand letter</HeroCta></div>
          </div>
          <HeroStatePins />
        </header>

        <section className="cat-section">
          <div className="sec-head" style={{ textAlign: "left", marginBottom: 28 }}>
            <h2 style={{ margin: 0 }}>What kind of refund are you trying to recover?</h2>
            <p style={{ marginTop: 12, marginLeft: 0, maxWidth: "60ch" }}>Each guide covers what you can recover and how to file.</p>
          </div>
          <div className="photo-grid">
            {ISSUES.map((i, idx) => { const inner = (<><img src={`https://images.unsplash.com/photo-${ISSUE_PHOTOS[idx % ISSUE_PHOTOS.length]}?w=600&h=600&fit=crop`} alt="" className="photo-card-img" /><span className="photo-card-icon" aria-hidden="true">{i.icon}</span><div className="photo-card-overlay"><h3>{i.title}</h3><p>{i.blurb}</p></div><span className="photo-card-arrow" aria-hidden="true"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span></>); return i.ready ? <Link key={i.slug} href={`/small-claims/sue-refund-${i.slug}`} className="photo-card">{inner}</Link> : <div key={i.slug} className="photo-card soon" aria-disabled="true">{inner}</div>; })}
            <Link href="/case-score" className="photo-card"><img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=600&fit=crop" alt="" className="photo-card-img" /><span className="photo-card-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg></span><div className="photo-card-overlay"><h3>Something else?</h3><p>Tell us about your situation in 90 seconds and get a strength read on your case.</p></div><span className="photo-card-arrow" aria-hidden="true"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span></Link>
          </div>
        </section>

        <section className="cat-section">
          <div className="cat-split">
            <div className="cat-split-intro"><span className="eyebrow">By state</span><h2>State-specific <em>rules</em>.</h2><p>UDAP multipliers (2x or 3x), pre-judgment interest, and consumer-protection statutes vary by state. Pick yours.</p><Link href="/small-claims" className="cat-text-link">See all 50 state guides →</Link></div>
            <div className="cat-state-grid">{featured.map((s) => (<Link key={s.slug} href={`/small-claims/${s.slug}`} className="cat-state-link"><span>{s.name}</span><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></Link>))}</div>
          </div>
        </section>

{/* CTAs */}
        <section className="cat-section">
          <div style={{ background: "#0d0d0d", color: "#fff", padding: "32px 0", borderRadius: 20, position: "relative", overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.85fr 1fr", gap: 0, alignItems: "center" }}>
              {/* LEFT — title + 3 step cards */}
              <div style={{ padding: "12px 44px 20px" }}>
                <span className="eyebrow" style={{ color: "rgba(254,249,241,0.65)" }}>Take the next step</span>
                <h2 style={{ fontFamily: "Newsreader, Georgia, serif", fontSize: "clamp(28px, 2.8vw, 38px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1, margin: "14px 0 28px", color: "#fef9f1" }}>
                  Three ways to <em style={{ fontStyle: "italic", color: "#f5b29f", fontWeight: 700 }}>move forward</em>.
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, alignItems: "stretch", position: "relative" }}>
                  <CtaStepCard href="/demand-letter" bg="#4ad96a" tone="dark" stepNum="01" stepPos="top-left" title="Send a demand letter" titlePos="bottom-left" />
                  <CtaStepCard href="/case-score" bg="#fff" tone="dark" stepNum="02" stepPos="bottom-right" title="Check my case" titlePos="top-left" gradient />
                  <CtaStepCard href="/small-claims" bg="#7344ee" tone="light" stepNum="03" stepPos="top-right" title="File your claim" titlePos="bottom-right" />
                </div>
              </div>
              {/* RIGHT — testimonial */}
              <div style={{ borderLeft: "1px solid #1f1f1f", padding: "20px 44px", position: "relative", alignSelf: "stretch", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ fontFamily: "Geist, system-ui, sans-serif", fontWeight: 900, fontSize: 70, lineHeight: 0.5, color: "#2a2a2a", marginBottom: 14, letterSpacing: "-0.06em" }} aria-hidden="true">
                  &rdquo;&rdquo;
                </div>
                <div style={{ width: 48, height: 1, background: "#3a3a3a", marginBottom: 14 }} />
                <p style={{ fontFamily: "Newsreader, Georgia, serif", fontSize: 18, fontStyle: "italic", lineHeight: 1.35, letterSpacing: "-0.005em", color: "#fef9f1", margin: "0 0 16px" }}>
                  Gym refused to cancel and kept charging. Judge ordered $1,800 back plus the filing fee.
                </p>
                <div>
                  <div style={{ fontFamily: "Geist, system-ui, sans-serif", fontWeight: 700, fontSize: 14, color: "#fff", marginBottom: 2 }}>Sara C.</div>
                  <div style={{ fontSize: 12.5, color: "#9aa0a6" }}>Member · Pennsylvania</div>
                </div>
              </div>
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

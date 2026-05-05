import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import { availableStateSlugs } from "../../../../lib/state-data";
import { STATES } from "../../../../lib/states";

export const metadata: Metadata = {
  title: "How to Sue an Online Seller in Small Claims Court",
  description: "Plain-English guide to suing online sellers. Amazon, eBay, Etsy, Facebook Marketplace, Venmo/Cash App scams, gig services, and FedEx. What you can recover and how to file.",
  alternates: { canonical: "/small-claims/online-seller" },
  openGraph: { title: "How to Sue an Online Seller | CivilCase", description: "Buyer disputes you can take to small claims, what you can recover, and how to file.", url: "/small-claims/online-seller", type: "article" },
};

const ISSUES = [
  { slug: "online-seller-general", title: "Online seller (general)", blurb: "Platform protection programs first. Then state UDAP. Most disputes settle through Amazon A-to-z, eBay MBG, Etsy cases.", icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9"/><path d="M2 12h20M12 2c2.5 3 4 6.5 4 10s-1.5 7-4 10c-2.5-3-4-6.5-4-10s1.5-7 4-10z"/></svg>, ready: true },
  { slug: "amazon-seller", title: "Amazon seller", blurb: "A-to-z Guarantee covers up to $2,500 per claim. Resolves in 30 days. Small claims as backup.", icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/></svg>, ready: true },
  { slug: "ebay-seller", title: "eBay seller", blurb: "Money Back Guarantee covers items not received and items not as described. Small claims as backup.", icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9"/><path d="M9 12l2 2 4-4"/></svg>, ready: true },
  { slug: "etsy-seller", title: "Etsy seller", blurb: "Etsy case system handles disputes. Buyer-favorable platform. Custom orders allow some variation but not material misrepresentation.", icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9"/><path d="M14 8c-2 0-4 1-4 4h2"/><path d="M9 12h6M9 16h6"/></svg>, ready: true },
  { slug: "facebook-marketplace", title: "Facebook Marketplace seller", blurb: "No platform protection. Direct UDAP claim required. Police report for theft. Small claims for monetary recovery.", icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>, ready: true },
  { slug: "venmo-cashapp-scam", title: "Venmo / Cash App scam", blurb: "P2P apps don't protect against authorized scams. Reg E covers unauthorized only. Small claims under UDAP.", icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M8 6V4M16 6V4M2 10h20"/></svg>, ready: true },
  { slug: "doordash-uber", title: "DoorDash / Uber / Uber Eats", blurb: "Forced arbitration clauses block most lawsuits. Small claims is usually carved out. Within state cap, you can sue.", icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>, ready: true },
  { slug: "fedex-package", title: "FedEx package", blurb: "Carmack Amendment governs. Default $100/package liability. Declared value extends coverage. Small claims for denied claims.", icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M8 15h2M14 15h2"/></svg>, ready: true },
];

const FEATURED_STATE_SLUGS = ["california", "texas", "florida", "new-york", "illinois", "pennsylvania", "ohio", "georgia", "michigan", "north-carolina", "minnesota", "delaware"];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", headline: "How to Sue an Online Seller in Small Claims Court", description: "Practical guide to recovering from Amazon, eBay, Etsy, Facebook Marketplace, P2P scams, gig services, and FedEx.", author: { "@type": "Organization", name: "CivilCase" }, publisher: { "@type": "Organization", name: "CivilCase" } },
    { "@type": "FAQPage", mainEntity: [
      { "@type": "Question", name: "Can I sue an online seller in small claims court?", acceptedAnswer: { "@type": "Answer", text: "Yes. Most platforms have buyer protection programs (Amazon A-to-z, eBay MBG, Etsy cases). Try those first. If platform fails, state UDAP statutes apply with 2x or 3x multipliers in many states. Small claims is right when damages are within your state's cap." } },
      { "@type": "Question", name: "What's the difference between Amazon and Facebook Marketplace?", acceptedAnswer: { "@type": "Answer", text: "Amazon, eBay, and Etsy have buyer protection programs that resolve disputes. Facebook Marketplace has no platform protection. Use credit card chargebacks and small claims for Facebook." } },
      { "@type": "Question", name: "Can I sue Venmo or Cash App scams?", acceptedAnswer: { "@type": "Answer", text: "Yes, but P2P apps don't protect against authorized scams. Reg E covers hacked accounts only. Small claims under state UDAP for authorized scams. Police report for clear theft." } },
    ] },
  ],
};

export default function OnlineSellerHubPage() {
  const ready = new Set(availableStateSlugs());
  const featured = FEATURED_STATE_SLUGS.map((slug) => { const meta = STATES.find((s) => s.slug === slug); return meta && ready.has(slug) ? meta : null; }).filter((s): s is NonNullable<typeof s> => s !== null);

  return (
    <main className="cat-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="wrap">
        <Breadcrumbs items={[{ href: "/small-claims", label: "Small Claims" }, { label: "Online Seller Disputes" }]} />
        <header className="cat-hero-3col">
          <div className="cat-hero-copy">
            <span className="eyebrow">Category</span>
            <h1>How to <em>sue an online seller</em> in small claims court.</h1>
            <p className="cat-lede">Amazon, eBay, Etsy, Facebook Marketplace, Venmo/Cash App scams, gig services, FedEx. Each has a different recovery path. Most platform disputes resolve through buyer protection programs. P2P scams and Marketplace fraud often need small claims under state UDAP.</p>
            <div className="hero-ctas"><Link href="/case-score" className="btn btn-dark">Check my case (free)</Link><Link href="/demand-letter" className="btn btn-cream">Send a demand letter</Link></div>
          </div>
          <div className="cat-hero-stat">
            <div><div className="cat-hero-stat-eyebrow">Typical buyer recovery</div><div className="cat-hero-stat-big">$1,800</div><div className="cat-hero-stat-sub">illustrative · varies by platform</div></div>
            <div><div className="cat-hero-bars"><span style={{ height: "30%" }}></span><span style={{ height: "55%" }}></span><span style={{ height: "78%" }}></span><span style={{ height: "92%" }}></span></div><div className="cat-hero-bars-row"><b>Apr</b><b>May</b><b>Jun</b><b>Jul</b></div></div>
          </div>
          <div className="cat-hero-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=1100&fit=crop" alt="Online shopping packages" />
          </div>
        </header>

        <section className="cat-section">
          <div className="sec-head" style={{ textAlign: "left", marginBottom: 28 }}>
            <h2 style={{ margin: 0 }}>What kind of online seller dispute are you having?</h2>
            <p style={{ marginTop: 12, marginLeft: 0, maxWidth: "60ch" }}>Each platform has different recovery paths. Pick yours for state-specific advice.</p>
          </div>
          <div className="cat-grid">
            {ISSUES.map((i) => { const inner = (<><div className="cat-card-icon">{i.icon}</div><h3>{i.title}</h3><p>{i.blurb}</p></>); return i.ready ? <Link key={i.slug} href={`/small-claims/sue-seller-${i.slug}`} className="cat-card">{inner}</Link> : <div key={i.slug} className="cat-card soon" aria-disabled="true">{inner}</div>; })}
            <Link href="/case-score" className="cat-card cat-card-quiz">
              <div className="cat-card-icon" style={{ background: "rgba(217,64,46,0.18)" }}><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg></div>
              <h3>Something else?</h3><p>Tell us about your situation in 90 seconds and get a strength read on your case.</p>
            </Link>
          </div>
        </section>

        <section className="cat-section">
          <div className="cat-split">
            <div className="cat-split-intro"><span className="eyebrow">By state</span><h2>State-specific <em>rules</em>.</h2><p>UDAP multipliers (2x or 3x in many states), pre-judgment interest, and consumer-protection statutes vary by state. Pick yours for the exact rules.</p><Link href="/small-claims" className="cat-text-link">See all 50 state guides →</Link></div>
            <div className="cat-state-grid">{featured.map((s) => (<Link key={s.slug} href={`/small-claims/${s.slug}`} className="cat-state-link"><span>{s.name}</span><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></Link>))}</div>
          </div>
        </section>

        <section className="cat-section">
          <div className="cat-cta-card">
            <div><span className="eyebrow" style={{ color: "rgba(254,249,241,0.65)" }}>Take the next step</span><h2 style={{ marginTop: 14 }}>Three ways to <em>move forward</em>.</h2><p>Try platform protection first. If it fails, demand letter. Small claims as final step.</p></div>
            <div className="cat-cta-row">
              <Link href="/demand-letter" className="cat-cta-tile"><div className="cat-cta-tile-icon"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg></div><div><strong>Send a demand letter</strong><span>Many disputes end here.</span></div></Link>
              <Link href="/case-score" className="cat-cta-tile"><div className="cat-cta-tile-icon"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 21V5M3 21h18M7 17V11M12 17V8M17 17V13"/></svg></div><div><strong>Check my case</strong><span>Free 7-question case-strength quiz.</span></div></Link>
              <Link href="/small-claims" className="cat-cta-tile"><div className="cat-cta-tile-icon"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 3v18M5 9l7-6 7 6M3 21h18"/></svg></div><div><strong>File your claim</strong><span>Step-by-step in your state.</span></div></Link>
            </div>
          </div>
        </section>

        <section className="cat-section">
          <div className="cat-split">
            <div className="cat-split-intro"><span className="eyebrow">FAQ</span><h2>Common <em>questions</em>.</h2><p>The questions buyers actually ask. Don&rsquo;t see yours?{" "}<Link href="/contact" className="cat-text-link">Email support</Link>.</p></div>
            <div className="cat-faq">
              <details><summary>Can I sue an online seller in small claims court?</summary><div><p>Yes. Most platforms have buyer protection programs (Amazon A-to-z, eBay MBG, Etsy cases). Try those first. If platform fails, state UDAP statutes apply with 2x or 3x multipliers in many states.</p></div></details>
              <details><summary>What about Facebook Marketplace?</summary><div><p>Facebook has no platform protection. Use credit card chargebacks and small claims under state UDAP. Police report for clear theft.</p></div></details>
              <details><summary>What about Venmo and Cash App scams?</summary><div><p>P2P apps don&rsquo;t protect against authorized scams. Reg E covers unauthorized (hacked accounts). Small claims under state UDAP for authorized scams. Police for theft.</p></div></details>
              <details><summary>Can I sue DoorDash or Uber?</summary><div><p>Yes for small-claims cases. Most have arbitration clauses but small-claims is usually carved out. Read the TOS.</p></div></details>
              <details><summary>How do I sue FedEx?</summary><div><p>Carmack Amendment governs interstate shipments. Default $100 cap; declared value extends. File FedEx claim first; small claims for backup.</p></div></details>
            </div>
          </div>
        </section>

        <p className="cat-disclaimer"><strong>This is general legal information, not legal advice.</strong> CivilCase is not a law firm. Platform protection programs and state UDAP statutes vary widely. Verify deadlines and citations against your state&rsquo;s official source before filing, or{" "}<Link href="/disclaimer" className="cat-text-link">read our disclaimer</Link>.</p>
      </div>
    </main>
  );
}

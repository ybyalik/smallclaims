import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import { availableStateSlugs } from "../../../../lib/state-data";
import { STATES } from "../../../../lib/states";

export const metadata: Metadata = {
  title: "How to Sue Your Roommate in Small Claims Court",
  description: "Plain-English guide to suing a roommate. Unpaid rent, bills, moving out without notice, property damage, security deposits, and no-lease cases. What you can recover and how to file.",
  alternates: { canonical: "/small-claims/roommate" },
  openGraph: { title: "How to Sue Your Roommate in Small Claims Court | CivilCase", description: "Roommate disputes you can take to small claims, what you can recover, and how to file.", url: "/small-claims/roommate", type: "article" },
};

const ISSUES = [
  { slug: "unpaid-rent", title: "Unpaid rent", blurb: "Joint-and-several lease liability + contribution rights. Bank record + texts + lease establish the case.", icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 21h18M5 21V8l7-5 7 5v13"/><path d="M12 7v14"/></svg>, ready: true },
  { slug: "unpaid-bills", title: "Unpaid bills + utilities", blurb: "Shared utilities, internet, household supplies. Course of dealing + bills + Venmo records make the case clean.", icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M8 15h2M14 15h2"/></svg>, ready: true },
  { slug: "moving-out-no-notice", title: "Moved out no notice", blurb: "Their share of rent until you find a replacement. Mitigation documentation (Craigslist posts) is critical.", icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M16 4l-4 4-4-4"/></svg>, ready: true },
  { slug: "property-damage-or-theft", title: "Damage or theft", blurb: "Negligence + conversion. Photos + receipts + witness testimony establish the case.", icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M9 14l-3 3 3 3M15 4l3-3 3 3"/><circle cx="12" cy="12" r="4"/></svg>, ready: true },
  { slug: "security-deposit", title: "Security deposit", blurb: "Roommate kept your share. Bank record from move-in + landlord refund record establish the case.", icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M21 12H7M14 5l-7 7 7 7"/></svg>, ready: true },
  { slug: "no-lease", title: "No written lease", blurb: "Implied contracts + course of dealing both apply. Months of consistent Venmo establish the agreement.", icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M9 13l3-3 3 3"/></svg>, ready: true },
  { slug: "emotional-distress", title: "Emotional distress", blurb: "IIED + paired-claim structure. Therapy bills + provider notes + lost work establish damages.", icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9"/><path d="M9 9.5l1 1M15 9.5l-1 1M8 16s1.5-2 4-2 4 2 4 2"/></svg>, ready: true },
];

const FEATURED_STATE_SLUGS = ["california", "texas", "florida", "new-york", "illinois", "pennsylvania", "ohio", "georgia", "michigan", "north-carolina", "minnesota", "delaware"];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", headline: "How to Sue Your Roommate in Small Claims Court", description: "Practical guide to roommate disputes: unpaid rent, bills, moving out without notice, property damage, security deposits, no-lease cases, and emotional distress.", author: { "@type": "Organization", name: "CivilCase" }, publisher: { "@type": "Organization", name: "CivilCase" } },
    { "@type": "FAQPage", mainEntity: [
      { "@type": "Question", name: "Can I sue my roommate in small claims court?", acceptedAnswer: { "@type": "Answer", text: "Yes. Unpaid rent, unpaid utilities, moving out without notice, property damage, security-deposit disputes, and emotional distress all support small-claims cases. Most cases settle once a demand letter arrives. Documentation is the spine: lease, bank records, texts, witness testimony." } },
      { "@type": "Question", name: "What if there's no written lease or roommate agreement?", acceptedAnswer: { "@type": "Answer", text: "Implied contracts and course of dealing both apply. Months of consistent Venmo payments establish the agreement. Texts about money and witness testimony also work. The proof is harder than written-lease cases but the recovery is the same." } },
      { "@type": "Question", name: "How long do I have to sue?", acceptedAnswer: { "@type": "Answer", text: "Written lease + roommate agreement: 4 to 6 years. Oral agreement: 2 to 4 years. Property damage: 2 to 4 years. Each unpaid month is its own claim with its own clock." } },
    ] },
  ],
};

export default function RoommateHubPage() {
  const ready = new Set(availableStateSlugs());
  const featured = FEATURED_STATE_SLUGS.map((slug) => { const meta = STATES.find((s) => s.slug === slug); return meta && ready.has(slug) ? meta : null; }).filter((s): s is NonNullable<typeof s> => s !== null);

  return (
    <main className="cat-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="wrap">
        <Breadcrumbs items={[{ href: "/small-claims", label: "Small Claims" }, { label: "Roommate Disputes" }]} />
        <header className="cat-hero-3col">
          <div className="cat-hero-copy">
            <span className="eyebrow">Category</span>
            <h1>How to <em>sue your roommate</em> in small claims court.</h1>
            <p className="cat-lede">Unpaid rent, unpaid bills, moving out without notice, property damage, security-deposit disputes, and emotional distress. Roommate cases are textbook small-claims cases. Most settle once a demand letter arrives. Bank records, texts, and lease provisions establish the case.</p>
            <div className="hero-ctas"><Link href="/case-score" className="btn btn-dark">Check my case (free)</Link><Link href="/demand-letter" className="btn btn-cream">Send a demand letter</Link></div>
          </div>
          <div className="cat-hero-stat">
            <div><div className="cat-hero-stat-eyebrow">Typical roommate recovery</div><div className="cat-hero-stat-big">$3,200</div><div className="cat-hero-stat-sub">illustrative · varies by state and dispute type</div></div>
            <div><div className="cat-hero-bars"><span style={{ height: "30%" }}></span><span style={{ height: "55%" }}></span><span style={{ height: "78%" }}></span><span style={{ height: "92%" }}></span></div><div className="cat-hero-bars-row"><b>Apr</b><b>May</b><b>Jun</b><b>Jul</b></div></div>
          </div>
          <div className="cat-hero-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=1100&fit=crop" alt="Apartment with shared common area" />
          </div>
        </header>

        <section className="cat-section">
          <div className="sec-head" style={{ textAlign: "left", marginBottom: 28 }}>
            <h2 style={{ margin: 0 }}>What can you sue your roommate <em>for</em>?</h2>
            <p style={{ marginTop: 12, marginLeft: 0, maxWidth: "60ch" }}>Pick the one that fits your situation. Each guide covers what you can recover, what evidence to bring, and how to file in your state.</p>
          </div>
          <div className="cat-grid">
            {ISSUES.map((i) => { const inner = (<><div className="cat-card-icon">{i.icon}</div><h3>{i.title}</h3><p>{i.blurb}</p></>); return i.ready ? <Link key={i.slug} href={`/small-claims/sue-roommate-${i.slug}`} className="cat-card">{inner}</Link> : <div key={i.slug} className="cat-card soon" aria-disabled="true">{inner}</div>; })}
            <Link href="/case-score" className="cat-card cat-card-quiz">
              <div className="cat-card-icon" style={{ background: "rgba(217,64,46,0.18)" }}><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg></div>
              <h3>Something else?</h3><p>Tell us about your situation in 90 seconds and get a strength read on your case.</p>
            </Link>
          </div>
        </section>

        <section className="cat-section">
          <div className="cat-split">
            <div className="cat-split-intro"><span className="eyebrow">By state</span><h2>State-specific <em>rules</em>.</h2><p>Joint-and-several liability rules, security-deposit rules, and contribution doctrines vary by state. Pick yours for the exact rules.</p><Link href="/small-claims" className="cat-text-link">See all 50 state guides →</Link></div>
            <div className="cat-state-grid">{featured.map((s) => (<Link key={s.slug} href={`/small-claims/${s.slug}`} className="cat-state-link"><span>{s.name}</span><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></Link>))}</div>
          </div>
        </section>

        <section className="cat-section">
          <div className="cat-cta-card">
            <div><span className="eyebrow" style={{ color: "rgba(254,249,241,0.65)" }}>Take the next step</span><h2 style={{ marginTop: 14 }}>Three ways to <em>move forward</em>.</h2><p>Most roommate disputes settle once a demand letter arrives. If yours does not, the state guide walks you through filing.</p></div>
            <div className="cat-cta-row">
              <Link href="/demand-letter" className="cat-cta-tile"><div className="cat-cta-tile-icon"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg></div><div><strong>Send a demand letter</strong><span>Many disputes end here.</span></div></Link>
              <Link href="/case-score" className="cat-cta-tile"><div className="cat-cta-tile-icon"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 21V5M3 21h18M7 17V11M12 17V8M17 17V13"/></svg></div><div><strong>Check my case</strong><span>Free 7-question case-strength quiz.</span></div></Link>
              <Link href="/small-claims" className="cat-cta-tile"><div className="cat-cta-tile-icon"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 3v18M5 9l7-6 7 6M3 21h18"/></svg></div><div><strong>File your claim</strong><span>Step-by-step in your state.</span></div></Link>
            </div>
          </div>
        </section>

        <section className="cat-section">
          <div className="cat-split">
            <div className="cat-split-intro"><span className="eyebrow">FAQ</span><h2>Common <em>questions</em>.</h2><p>The questions roommates actually ask before filing. Don&rsquo;t see yours?{" "}<Link href="/contact" className="cat-text-link">Email support</Link>.</p></div>
            <div className="cat-faq">
              <details><summary>Can I sue my roommate in small claims court?</summary><div><p>Yes. Unpaid rent, unpaid utilities, moving out without notice, property damage, security-deposit disputes, and emotional distress all support small-claims cases. Most cases settle once a demand letter arrives. Documentation is the spine.</p></div></details>
              <details><summary>What if there&rsquo;s no written lease or roommate agreement?</summary><div><p>Implied contracts and course of dealing both apply. Months of consistent Venmo payments establish the agreement. Texts about money and witness testimony also work. The proof is harder than written-lease cases but the recovery is the same.</p></div></details>
              <details><summary>How long do I have to sue?</summary><div><p>Written lease + roommate agreement: 4 to 6 years. Oral agreement: 2 to 4 years. Property damage: 2 to 4 years. Each unpaid month is its own claim with its own clock.</p></div></details>
              <details><summary>Will the landlord get involved?</summary><div><p>Usually not. The landlord cares that the rent gets paid, not who pays it. Your contribution case against the roommate is between you and them. The landlord is not involved.</p></div></details>
              <details><summary>Can I combine multiple roommate claims?</summary><div><p>Yes. One small-claims case can include unpaid rent + unpaid bills + property damage + deposit. Combine to avoid multiple court appearances.</p></div></details>
            </div>
          </div>
        </section>

        <p className="cat-disclaimer"><strong>This is general legal information, not legal advice.</strong> CivilCase is not a law firm. Joint-and-several liability rules and security-deposit rules vary widely. Verify deadlines and citations against your state&rsquo;s official source before filing, or{" "}<Link href="/disclaimer" className="cat-text-link">read our disclaimer</Link>.</p>
      </div>
    </main>
  );
}

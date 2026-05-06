import type { Metadata } from "next";
import HeroCta from "../../../../components/HeroCta";
import HeroCaseFolder from "../../../../components/HeroCaseFolder";
import CtaStepCard from "../../../../components/CtaStepCard";
import Link from "next/link";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import { availableStateSlugs } from "../../../../lib/state-data";
import { STATES } from "../../../../lib/states";

const ISSUE_PHOTOS = ["1560448204-e02f11c3d0e2", "1502672260266-1c1ef2d93688", "1560518883-ce09059eeffa", "1493809842364-78817add7ffb", "1484154218962-a197022b5858"];

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
        <header className="cat-hero-2col">
          <div className="cat-hero-copy">
            <span className="eyebrow">Category</span>
            <h1>How to <em>sue your roommate</em> in small claims court.</h1>
            <p className="cat-lede">Unpaid rent, unpaid bills, moving out without notice, property damage, security-deposit disputes, and emotional distress. Roommate cases are textbook small-claims cases. Most settle once a demand letter arrives. Bank records, texts, and lease provisions establish the case.</p>
            <div className="hero-ctas"><HeroCta href="/case-score" variant="dark" icon="case-score">Check my case (free)</HeroCta><HeroCta href="/demand-letter" variant="cream" icon="demand-letter">Send a demand letter</HeroCta></div>
          </div>
          <HeroCaseFolder
            caseNumber="26-CV-03318"
            plaintiff="Roommate, J."
            defendant="Roommate, S."
            causeLabel="Cause of action"
            causeValue="Joint-lease breach"
            demand="$3,200"
            filed="Mar 05, 2026"
            hearing="Apr 22"
          />
        </header>

        <section className="cat-section">
          <div className="sec-head" style={{ textAlign: "left", marginBottom: 28 }}>
            <h2 style={{ margin: 0 }}>What can you sue your roommate <em>for</em>?</h2>
            <p style={{ marginTop: 12, marginLeft: 0, maxWidth: "60ch" }}>Pick the one that fits your situation. Each guide covers what you can recover, what evidence to bring, and how to file in your state.</p>
          </div>
          <div className="photo-grid">
            {ISSUES.map((i, idx) => { const inner = (<><img src={`https://images.unsplash.com/photo-${ISSUE_PHOTOS[idx % ISSUE_PHOTOS.length]}?w=600&h=600&fit=crop`} alt="" className="photo-card-img" /><span className="photo-card-icon" aria-hidden="true">{i.icon}</span><div className="photo-card-overlay"><h3>{i.title}</h3><p>{i.blurb}</p></div><span className="photo-card-arrow" aria-hidden="true"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span></>); return i.ready ? <Link key={i.slug} href={`/small-claims/sue-roommate-${i.slug}`} className="photo-card">{inner}</Link> : <div key={i.slug} className="photo-card soon" aria-disabled="true">{inner}</div>; })}
            <Link href="/case-score" className="photo-card"><img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=600&fit=crop" alt="" className="photo-card-img" /><span className="photo-card-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg></span><div className="photo-card-overlay"><h3>Something else?</h3><p>Tell us about your situation in 90 seconds and get a strength read on your case.</p></div><span className="photo-card-arrow" aria-hidden="true"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span></Link>
          </div>
        </section>

        <section className="cat-section">
          <div className="cat-split">
            <div className="cat-split-intro"><span className="eyebrow">By state</span><h2>State-specific <em>rules</em>.</h2><p>Joint-and-several liability rules, security-deposit rules, and contribution doctrines vary by state. Pick yours for the exact rules.</p><Link href="/small-claims" className="cat-text-link">See all 50 state guides →</Link></div>
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
                  Roommate left a $3,200 hole when she moved out early. Recovered it all in 60 days.
                </p>
                <div>
                  <div style={{ fontFamily: "Geist, system-ui, sans-serif", fontWeight: 700, fontSize: 14, color: "#fff", marginBottom: 2 }}>Jordan A.</div>
                  <div style={{ fontSize: 12.5, color: "#9aa0a6" }}>Tenant · Washington</div>
                </div>
              </div>
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

import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import { availableStateSlugs } from "../../../../lib/state-data";
import { STATES } from "../../../../lib/states";

export const metadata: Metadata = {
  title: "How to Sue Your Neighbor in Small Claims Court",
  description:
    "Plain-English guide to suing your neighbor. Property damage, fallen trees, noise, harassment, water runoff, fences, and 4 more disputes. What you can recover and how to file in your state.",
  alternates: { canonical: "/small-claims/neighbor" },
  openGraph: {
    title: "How to Sue Your Neighbor in Small Claims Court | CivilCase",
    description: "Neighbor disputes you can take to small claims, what you can recover, and how to file.",
    url: "/small-claims/neighbor",
    type: "article",
  },
};

const ISSUES = [
  { slug: "property-damage", title: "Property damage", blurb: "Negligence + trespass. Their homeowners insurance covers most cases. Small claims for when insurance fails.", icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 21h18M5 21V8l7-5 7 5v13"/><path d="M9 14l3 3 3-3"/></svg>, ready: true },
  { slug: "dead-tree-fell", title: "Dead tree fell on house", blurb: "Known-dangerous-condition rule. If they knew the tree was dead, they're liable. Arborist's report is decisive.", icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 2L8 6l4 4 4-4z"/><path d="M12 10v12"/></svg>, ready: true },
  { slug: "tree-encroachment", title: "Tree damage and encroachment", blurb: "Branches and roots damaging your property. Self-help trimming up to property line; recovery for actual damage.", icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 2v6M9 4l3-2 3 2M5 14h14M7 14v8M17 14v8"/></svg>, ready: true },
  { slug: "noise", title: "Noise nuisance", blurb: "Late-night music, parties, dog barking. Decibel logs + city ordinances + police calls + soundproofing recovery.", icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M11 5L6 9H2v6h4l5 4z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>, ready: true },
  { slug: "harassment", title: "Harassment", blurb: "Threats, stalking, repeated trespass. Civil restraining order plus damages. Documented pattern is the case.", icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>, ready: true },
  { slug: "water-runoff", title: "Water runoff flooding", blurb: "State drainage rules. Engineer's report on water source. Drainage repair + mold remediation recovery.", icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 2v8M9 5l3-3 3 3M5 22h14M5 18h14"/></svg>, ready: true },
  { slug: "fence-dispute", title: "Fence dispute", blurb: "State partition fence statutes (CA § 841). Equal cost-sharing for routine maintenance. Damage from negligence is full recovery.", icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 22V8l4-4 4 4v14M11 22V8l4-4 4 4v14"/><path d="M3 14h18M3 18h18"/></svg>, ready: true },
  { slug: "blocking-driveway", title: "Blocking driveway", blurb: "Trespass + interference with easement. Tow first; sue second. Lost wages and towing costs are recoverable.", icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="1" y="3" width="22" height="14" rx="2"/><path d="M5 21h14M12 17v4"/></svg>, ready: true },
  { slug: "construction-damage", title: "Construction damage", blurb: "Contractor's GL insurance is the primary recovery. Both contractor and neighbor liable. Strict liability for ultrahazardous activity.", icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 2L2 7l10 5 10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg>, ready: true },
  { slug: "smoke-and-odors", title: "Smoke and odors", blurb: "Cigar smoke, marijuana, BBQ, chemical odors. Private nuisance + city ordinances. Mitigation costs and medical bills.", icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 8c0-1 1-2 2-2h14c1 0 2 1 2 2M3 14c0-1 1-2 2-2h14c1 0 2 1 2 2M3 20c0-1 1-2 2-2h14c1 0 2 1 2 2"/></svg>, ready: true },
];

const FEATURED_STATE_SLUGS = ["california", "texas", "florida", "new-york", "illinois", "pennsylvania", "ohio", "georgia", "michigan", "north-carolina", "minnesota", "delaware"];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", headline: "How to Sue Your Neighbor in Small Claims Court", description: "Practical guide to suing a neighbor for property damage, noise, harassment, water runoff, fence disputes, and other neighbor-versus-neighbor disputes.", author: { "@type": "Organization", name: "CivilCase" }, publisher: { "@type": "Organization", name: "CivilCase" } },
    { "@type": "FAQPage", mainEntity: [
      { "@type": "Question", name: "Can you sue your neighbor in small claims court?", acceptedAnswer: { "@type": "Answer", text: "Yes, when the dispute involves money damages within your state's cap (usually $5,000 to $20,000). Common cases: property damage from negligence, fallen trees, noise nuisance, harassment, water runoff, fence cost-sharing, and blocking driveways. Most cases settle once a demand letter and homeowners insurance claim are filed." } },
      { "@type": "Question", name: "Should I file with the homeowners insurance carrier first?", acceptedAnswer: { "@type": "Answer", text: "Yes, almost always. Every standard homeowners policy covers liability for damage the homeowner causes to others' property. File a third-party claim with the carrier using policy info from your HOA or real-estate records. Most carriers settle within 30 to 60 days. Small claims is the backup when insurance fails." } },
      { "@type": "Question", name: "Can I get a restraining order against my neighbor?", acceptedAnswer: { "@type": "Answer", text: "Yes. Civil harassment restraining orders (CHROs) are available in every state. Most states grant temporary orders within days; full hearings within 21 days. Often free or low-cost. Use alongside the small-claims action: restraining order for ongoing protection, small-claims for damages." } },
    ] },
  ],
};

export default function NeighborHubPage() {
  const ready = new Set(availableStateSlugs());
  const featured = FEATURED_STATE_SLUGS.map((slug) => { const meta = STATES.find((s) => s.slug === slug); return meta && ready.has(slug) ? meta : null; }).filter((s): s is NonNullable<typeof s> => s !== null);

  return (
    <main className="cat-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="wrap">
        <Breadcrumbs items={[{ href: "/small-claims", label: "Small Claims" }, { label: "Neighbor Disputes" }]} />
        <header className="cat-hero-3col">
          <div className="cat-hero-copy">
            <span className="eyebrow">Category</span>
            <h1>How to <em>sue your neighbor</em> in small claims court.</h1>
            <p className="cat-lede">If your neighbor damaged your property, made constant noise, harassed you, regraded their land to flood your yard, blocked your driveway, or damaged a shared fence, small claims is often the right court. Most cases also pay through the neighbor's homeowners insurance, which is faster than court. Document the pattern, send a demand letter, and file the small-claims case if needed.</p>
            <div className="hero-ctas">
              <Link href="/case-score" className="btn btn-dark">Check my case (free)</Link>
              <Link href="/demand-letter" className="btn btn-cream">Send a demand letter</Link>
            </div>
          </div>
          <div className="cat-hero-stat">
            <div>
              <div className="cat-hero-stat-eyebrow">Typical neighbor recovery</div>
              <div className="cat-hero-stat-big">$4,800</div>
              <div className="cat-hero-stat-sub">illustrative · varies by state and dispute type</div>
            </div>
            <div>
              <div className="cat-hero-bars"><span style={{ height: "30%" }}></span><span style={{ height: "55%" }}></span><span style={{ height: "78%" }}></span><span style={{ height: "92%" }}></span></div>
              <div className="cat-hero-bars-row"><b>Apr</b><b>May</b><b>Jun</b><b>Jul</b></div>
            </div>
          </div>
          <div className="cat-hero-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=1100&fit=crop" alt="House with fence and trees" />
          </div>
        </header>

        <section className="cat-section">
          <div className="sec-head" style={{ textAlign: "left", marginBottom: 28 }}>
            <h2 style={{ margin: 0 }}>What can you sue your neighbor <em>for</em>?</h2>
            <p style={{ marginTop: 12, marginLeft: 0, maxWidth: "60ch" }}>Pick the one that fits your situation. Each guide covers what you can recover, what evidence to bring, and how to file in your state.</p>
          </div>
          <div className="cat-grid">
            {ISSUES.map((i) => {
              const inner = (<><div className="cat-card-icon">{i.icon}</div><h3>{i.title}</h3><p>{i.blurb}</p></>);
              return i.ready ? <Link key={i.slug} href={`/small-claims/sue-neighbor-${i.slug}`} className="cat-card">{inner}</Link> : <div key={i.slug} className="cat-card soon" aria-disabled="true">{inner}</div>;
            })}
            <Link href="/case-score" className="cat-card cat-card-quiz">
              <div className="cat-card-icon" style={{ background: "rgba(217,64,46,0.18)" }}>
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
              </div>
              <h3>Something else?</h3>
              <p>Tell us about your situation in 90 seconds and get a strength read on your case.</p>
            </Link>
          </div>
        </section>

        <section className="cat-section">
          <div className="cat-stack-head">
            <span className="eyebrow">Damages</span>
            <h2>What can you <em>recover</em>?</h2>
            <p>The math judges use. A typical neighbor case stacks repair cost, medical or mitigation costs, and (in some cases) emotional distress.</p>
          </div>
          <div className="cat-recovery">
            <div className="cat-recovery-rows">
              <div className="cat-recovery-row"><div className="cat-recovery-label"><span className="cat-recovery-tag">Direct damages</span><p>Repair cost, replaced belongings, mitigation (soundproofing, drainage).</p></div><div className="cat-recovery-amount">$3,200</div><div className="cat-recovery-bar"><span style={{ width: "55%" }}></span></div></div>
              <div className="cat-recovery-row"><div className="cat-recovery-label"><span className="cat-recovery-tag accent">Consequential damages</span><p>Lost wages, alternative housing, medical from health impacts.</p></div><div className="cat-recovery-amount accent">+$1,400</div><div className="cat-recovery-bar"><span style={{ width: "30%", background: "var(--accent)" }}></span></div></div>
              <div className="cat-recovery-row"><div className="cat-recovery-label"><span className="cat-recovery-tag">Filing fee + interest</span><p>Filing fee, service-of-process cost, pre-judgment interest at the state legal rate.</p></div><div className="cat-recovery-amount">+$200</div><div className="cat-recovery-bar"><span style={{ width: "5%" }}></span></div></div>
            </div>
            <div className="cat-recovery-total">
              <div className="cat-recovery-total-label"><span className="eyebrow" style={{ color: "rgba(254,249,241,0.65)" }}>What you walk away with</span><h3>Estimated recovery</h3><p>Sample math on a fence damage case. Your numbers will differ.</p></div>
              <div className="cat-recovery-total-num"><em>$4,800</em><span>typical small-claims recovery</span></div>
            </div>
          </div>
        </section>

        <section className="cat-section">
          <div className="cat-split">
            <div className="cat-split-intro">
              <span className="eyebrow">By state</span>
              <h2>State-specific <em>rules</em>.</h2>
              <p>Tree law, drainage rules, partition fence statutes, and noise ordinances vary widely. California has the strongest spite-fence statute. Massachusetts has strict tree-encroachment rules. Pick yours for the exact statutes.</p>
              <Link href="/small-claims" className="cat-text-link">See all 50 state guides →</Link>
            </div>
            <div className="cat-state-grid">
              {featured.map((s) => (<Link key={s.slug} href={`/small-claims/${s.slug}`} className="cat-state-link"><span>{s.name}</span><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></Link>))}
            </div>
          </div>
        </section>

        <section className="cat-section">
          <div className="cat-cta-card">
            <div><span className="eyebrow" style={{ color: "rgba(254,249,241,0.65)" }}>Take the next step</span><h2 style={{ marginTop: 14 }}>Three ways to <em>move forward</em>.</h2><p>Most neighbor disputes settle once a real demand letter arrives, especially when paired with a homeowners insurance claim or HOA complaint.</p></div>
            <div className="cat-cta-row">
              <Link href="/demand-letter" className="cat-cta-tile"><div className="cat-cta-tile-icon"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg></div><div><strong>Send a demand letter</strong><span>Many disputes end here.</span></div></Link>
              <Link href="/case-score" className="cat-cta-tile"><div className="cat-cta-tile-icon"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 21V5M3 21h18M7 17V11M12 17V8M17 17V13"/></svg></div><div><strong>Check my case</strong><span>Free 7-question case-strength quiz.</span></div></Link>
              <Link href="/small-claims" className="cat-cta-tile"><div className="cat-cta-tile-icon"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 3v18M5 9l7-6 7 6M3 21h18"/></svg></div><div><strong>File your claim</strong><span>Step-by-step in your state.</span></div></Link>
            </div>
          </div>
        </section>

        <section className="cat-section">
          <div className="cat-split">
            <div className="cat-split-intro">
              <span className="eyebrow">FAQ</span>
              <h2>Common <em>questions</em>.</h2>
              <p>The questions homeowners actually ask before filing. Don&rsquo;t see yours?{" "}<Link href="/contact" className="cat-text-link">Email support</Link>.</p>
            </div>
            <div className="cat-faq">
              <details><summary>Can you sue your neighbor in small claims court?</summary><div><p>Yes, when the dispute involves money damages within your state&rsquo;s cap (usually $5,000 to $20,000). Common cases: property damage from negligence, fallen trees, noise nuisance, harassment, water runoff, fence cost-sharing, and blocking driveways. Most cases also pay through the neighbor&rsquo;s homeowners insurance, which is faster than court.</p></div></details>
              <details><summary>Should I file with the homeowners insurance carrier first?</summary><div><p>Yes, almost always. Every standard homeowners policy covers liability for damage the homeowner causes to others&rsquo; property. File a third-party claim with the carrier using policy info from your HOA or real-estate records. Most carriers settle within 30 to 60 days.</p></div></details>
              <details><summary>Can I get a restraining order against my neighbor?</summary><div><p>Yes. Civil harassment restraining orders (CHROs) are available in every state. Most states grant temporary orders within days; full hearings within 21 days. Often free or low-cost. Use alongside the small-claims action: restraining order for ongoing protection, small-claims for damages.</p></div></details>
              <details><summary>What if my neighbor doesn&rsquo;t have insurance?</summary><div><p>Recovery is limited to the neighbor&rsquo;s personal assets. Most homeowners do have insurance because mortgages require it. If they don&rsquo;t, file directly in small claims and pursue judgment liens against their property. Liens against neighbors with mortgages often lead to fast settlement.</p></div></details>
              <details><summary>How long do I have to sue?</summary><div><p>Property damage and negligence claims usually run 2 to 4 years. Nuisance claims (noise, smoke, harassment) often have shorter windows (1 to 3 years). Continuing-tort cases (ongoing flooding, ongoing harassment) reset the clock with each new instance.</p></div></details>
            </div>
          </div>
        </section>

        <p className="cat-disclaimer"><strong>This is general legal information, not legal advice.</strong> CivilCase is not a law firm. Tree law, drainage rules, partition fence statutes, and noise ordinances vary widely by state. Verify deadlines and statute citations against your state&rsquo;s official source before filing, or{" "}<Link href="/disclaimer" className="cat-text-link">read our disclaimer</Link>.</p>
      </div>
    </main>
  );
}

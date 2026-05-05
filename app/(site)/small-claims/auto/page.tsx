import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import { availableStateSlugs } from "../../../../lib/state-data";
import { STATES } from "../../../../lib/states";

export const metadata: Metadata = {
  title: "How to Sue Over a Car in Small Claims Court",
  description:
    "Plain-English guide to suing over a car. Lemon vehicles, dealership fraud, mechanic overcharges, towing damage, valet damage, and parked-car hits. What you can recover and how to file in your state.",
  alternates: { canonical: "/small-claims/auto" },
  openGraph: {
    title: "How to Sue Over a Car in Small Claims Court | CivilCase",
    description:
      "Driver-versus-everyone disputes you can take to small claims, what you can recover, and how to file in your state.",
    url: "/small-claims/auto",
    type: "article",
  },
};

const ISSUES = [
  {
    slug: "parked-car-hit",
    title: "Someone hit my parked car",
    blurb:
      "Their auto insurance is the primary recovery. Small claims fits when the driver is uninsured, the claim was rejected, or it was a hit-and-run with a suspect identified.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="11" width="18" height="6" rx="1" />
        <path d="M5 17v3M19 17v3M7 11l1-4h8l1 4" />
      </svg>
    ),
    ready: false,
  },
  {
    slug: "dealership-fraud",
    title: "Dealership fraud",
    blurb:
      "Mileage rollback, lying about accidents, undisclosed liens, payment scams. State consumer-protection laws often add 2x or 3x damages plus attorney fees.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      </svg>
    ),
    ready: false,
  },
  {
    slug: "dealership-undisclosed-damage",
    title: "Dealership not disclosing damage",
    blurb:
      "Frame damage, flood history, prior accident, salvage title undisclosed. State Carfax-style disclosure laws plus federal odometer law (49 USC § 32710) apply.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M2 12h20M2 12c0-5 4-9 10-9s10 4 10 9M2 12c0 5 4 9 10 9s10-4 10-9" />
      </svg>
    ),
    ready: false,
  },
  {
    slug: "towing-damage",
    title: "Towing company damaged my car",
    blurb:
      "Tow truck scratched, dented, or broke parts of your car. The towing company is a bailee and held to a higher standard than ordinary negligence.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M5 17h11l3-7h-3M5 17H3v-4l5-3h8M5 17v3M16 17v3" />
        <circle cx="7" cy="20" r="2" />
        <circle cx="17" cy="20" r="2" />
      </svg>
    ),
    ready: false,
  },
  {
    slug: "mechanic-bad-work",
    title: "Mechanic bad work",
    blurb:
      "Repair didn't fix the problem, caused new damage, or used the wrong parts. State auto repair statutes (CA Bureau of Auto Repair, NY DMV) require written estimates.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    ready: false,
  },
  {
    slug: "mechanic-overcharging",
    title: "Mechanic overcharging",
    blurb:
      "Bill exceeds the written estimate. Most states require shop authorization for charges over a small percentage above estimate (10% in California).",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 2v20M5 7h11a3 3 0 0 1 0 6H8a3 3 0 0 0 0 6h11" />
      </svg>
    ),
    ready: false,
  },
  {
    slug: "mechanic-took-too-long",
    title: "Mechanic took too long",
    blurb:
      "Repair held the car for weeks or months without progress. Recover rental car costs, lost wages, and (if outrageous) the diminished value of the vehicle.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
    ready: false,
  },
  {
    slug: "valet-damage",
    title: "Valet damaged my car",
    blurb:
      "The valet operates as a bailee. Bailment law presumes negligence when the car comes back damaged. The valet has to prove they were not at fault.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <path d="M16 4l-4 4-4-4" />
      </svg>
    ),
    ready: false,
  },
  {
    slug: "lemon-car",
    title: "Sold me a lemon",
    blurb:
      "Recurring defect the manufacturer cannot fix. Federal Magnuson-Moss + state lemon laws + BBB Auto Line arbitration. Refund or replacement.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 2a10 10 0 1 0 10 10c0-2-1-4-1-4M12 2c-2 0-4 1-4 1M12 2v4" />
      </svg>
    ),
    ready: true,
  },
];

const FEATURED_STATE_SLUGS = [
  "california",
  "texas",
  "florida",
  "new-york",
  "illinois",
  "pennsylvania",
  "ohio",
  "georgia",
  "michigan",
  "north-carolina",
  "minnesota",
  "delaware",
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "How to Sue Over a Car in Small Claims Court",
      description:
        "Practical guide to suing over a car in small claims for lemon vehicles, dealership fraud, mechanic overcharges, towing damage, valet damage, and other auto disputes.",
      author: { "@type": "Organization", name: "CivilCase" },
      publisher: { "@type": "Organization", name: "CivilCase" },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Can you sue over a car in small claims court?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Yes, when the dispute fits your state's cap (usually $5,000 to $20,000). Common cases that fit: parked-car hits when the driver is uninsured, mechanic overcharges, towing damage, valet damage, and partial-refund lemon cases. Bigger cases (full lemon-law refund on a $40,000 vehicle) usually need a lemon-law attorney instead.",
          },
        },
        {
          "@type": "Question",
          name: "Should I sue the dealer or the manufacturer for a lemon?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Almost always the manufacturer. State lemon laws and the federal Magnuson-Moss Warranty Act create the warranty obligations on the manufacturer, not the dealer. Dealers can be added as defendants for fraud or misrepresentation, but the lemon-law claim itself is against the manufacturer's regional consumer affairs office.",
          },
        },
        {
          "@type": "Question",
          name: "What state agencies handle auto disputes?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Mechanic complaints: state Bureau of Automotive Repair (CA), DMV (NY), or equivalent agency. Dealership complaints: state DMV or attorney general's consumer protection office. Tow company complaints: state DOT or PUC. Lemon cases: BBB Auto Line arbitration first, then court.",
          },
        },
      ],
    },
  ],
};

export default function AutoHubPage() {
  const ready = new Set(availableStateSlugs());
  const featured = FEATURED_STATE_SLUGS.map((slug) => {
    const meta = STATES.find((s) => s.slug === slug);
    return meta && ready.has(slug) ? meta : null;
  }).filter((s): s is NonNullable<typeof s> => s !== null);

  return (
    <main className="cat-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="wrap">
        <Breadcrumbs items={[{ href: "/small-claims", label: "Small Claims" }, { label: "Auto Disputes" }]} />

        {/* HERO */}
        <header className="cat-hero-3col">
          <div className="cat-hero-copy">
            <span className="eyebrow">Category</span>
            <h1>
              How to <em>sue over a car</em> in small claims court.
            </h1>
            <p className="cat-lede">
              If a dealership lied to you, a mechanic overcharged, a towing company damaged your
              car, or someone hit you in a parking lot and walked away, small claims is often the
              right court. Each scenario has its own pre-suit pressure point: state DMV
              complaints, the federal odometer law, BBB Auto Line arbitration for lemons, and
              auto repair board complaints for mechanic disputes.
            </p>
            <div className="hero-ctas">
              <Link href="/case-score" className="btn btn-dark">
                Check my case (free)
              </Link>
              <Link href="/demand-letter" className="btn btn-cream">
                Send a demand letter
              </Link>
            </div>
          </div>

          <div className="cat-hero-stat">
            <div>
              <div className="cat-hero-stat-eyebrow">Typical driver recovery</div>
              <div className="cat-hero-stat-big">$3,800</div>
              <div className="cat-hero-stat-sub">illustrative · varies by case type and state</div>
            </div>
            <div>
              <div className="cat-hero-bars">
                <span style={{ height: "30%" }}></span>
                <span style={{ height: "55%" }}></span>
                <span style={{ height: "78%" }}></span>
                <span style={{ height: "92%" }}></span>
              </div>
              <div className="cat-hero-bars-row">
                <b>Apr</b>
                <b>May</b>
                <b>Jun</b>
                <b>Jul</b>
              </div>
            </div>
          </div>

          <div className="cat-hero-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=1100&fit=crop"
              alt="Car keys on a dealership desk"
            />
          </div>
        </header>

        {/* ISSUE CARDS */}
        <section className="cat-section">
          <div className="sec-head" style={{ textAlign: "left", marginBottom: 28 }}>
            <h2 style={{ margin: 0 }}>
              What can you sue over a car <em>for</em>?
            </h2>
            <p style={{ marginTop: 12, marginLeft: 0, maxWidth: "60ch" }}>
              Pick the one that fits your situation. Each guide covers what you can recover, what
              evidence to bring, and how to file in your state.
            </p>
          </div>
          <div className="cat-grid">
            {ISSUES.map((i) => {
              const inner = (
                <>
                  <div className="cat-card-icon">{i.icon}</div>
                  <h3>{i.title}</h3>
                  <p>{i.blurb}</p>
                </>
              );
              return i.ready ? (
                <Link key={i.slug} href={`/small-claims/sue-auto-${i.slug}`} className="cat-card">
                  {inner}
                </Link>
              ) : (
                <div key={i.slug} className="cat-card soon" aria-disabled="true">
                  {inner}
                </div>
              );
            })}
            <Link href="/case-score" className="cat-card cat-card-quiz">
              <div className="cat-card-icon" style={{ background: "rgba(217,64,46,0.18)" }}>
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
              </div>
              <h3>Something else?</h3>
              <p>Tell us about your situation in 90 seconds and get a strength read on your case.</p>
            </Link>
          </div>
        </section>

        {/* HOW SMALL CLAIMS HANDLES AUTO DISPUTES */}
        <section className="cat-section">
          <div className="sec-head" style={{ textAlign: "left", marginBottom: 24 }}>
            <h2 className="cat-h2" style={{ margin: 0 }}>
              How small claims handles <em>auto disputes</em>.
            </h2>
            <p style={{ margin: "10px 0 0", maxWidth: "60ch", color: "var(--ink-2)" }}>
              Small claims is built for everyday money disputes. Most state caps fall between
              $5,000 and $20,000. Hearings take 10 to 15 minutes. Auto cases have unusually
              strong out-of-court options because of regulatory bodies and statutory protections.
            </p>
          </div>

          <div className="cat-ps">
            <div className="cat-ps-grid">
              <div className="cat-ps-col">
                <h3>Belongs in small claims</h3>
                <div className="cat-ps-item">
                  <div className="cat-ps-num">01</div>
                  <div className="cat-ps-text"><strong>Mechanic overcharges and bad work.</strong> State auto repair laws cap charges over estimate without consent.</div>
                </div>
                <div className="cat-ps-item">
                  <div className="cat-ps-num">02</div>
                  <div className="cat-ps-text"><strong>Towing damage.</strong> Tow companies are bailees; presumption of negligence applies.</div>
                </div>
                <div className="cat-ps-item">
                  <div className="cat-ps-num">03</div>
                  <div className="cat-ps-text"><strong>Valet damage.</strong> Bailment law gives drivers a strong presumption of negligence claim.</div>
                </div>
                <div className="cat-ps-item">
                  <div className="cat-ps-num">04</div>
                  <div className="cat-ps-text"><strong>Parked-car hit (uninsured driver).</strong> When insurance does not cover or claim is rejected.</div>
                </div>
                <div className="cat-ps-item">
                  <div className="cat-ps-num">05</div>
                  <div className="cat-ps-text"><strong>Dealership fraud and undisclosed damage.</strong> Many state UDAP statutes add 2x or 3x damages plus fees.</div>
                </div>
              </div>

              <div className="cat-ps-orb" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <rect x="3" y="11" width="18" height="6" rx="1" />
                  <path d="M5 17v3M19 17v3" />
                </svg>
              </div>

              <div className="cat-ps-col dark">
                <h3>Doesn&rsquo;t belong here</h3>
                <div className="cat-ps-item">
                  <div className="cat-ps-num">×</div>
                  <div className="cat-ps-text"><strong>Full-vehicle lemon refund.</strong> Cases over the cap need a lemon-law attorney (contingency, no upfront cost).</div>
                </div>
                <div className="cat-ps-item">
                  <div className="cat-ps-num">×</div>
                  <div className="cat-ps-text"><strong>Personal injury from accidents.</strong> Goes to civil court with a personal-injury attorney.</div>
                </div>
                <div className="cat-ps-item">
                  <div className="cat-ps-num">×</div>
                  <div className="cat-ps-text"><strong>Insurance bad-faith disputes.</strong> Specialized insurance-law claims, not small claims.</div>
                </div>
                <div className="cat-ps-item">
                  <div className="cat-ps-num">×</div>
                  <div className="cat-ps-text"><strong>Title and DMV disputes.</strong> Administrative law in front of the state DMV, not small claims.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DAMAGES */}
        <section className="cat-section">
          <div className="cat-stack-head">
            <span className="eyebrow">Damages</span>
            <h2>
              What can you <em>recover</em>?
            </h2>
            <p>
              The math judges use. A typical auto case stacks the direct cost (repair or refund),
              consequential damages (rental, lost wages), and any statutory multiplier under state
              consumer-protection laws.
            </p>
          </div>

          <div className="cat-recovery">
            <div className="cat-recovery-rows">
              <div className="cat-recovery-row">
                <div className="cat-recovery-label">
                  <span className="cat-recovery-tag">Direct damages</span>
                  <p>Repair cost, refund of fraudulent purchase, refund of overcharge, replacement value.</p>
                </div>
                <div className="cat-recovery-amount">$2,400</div>
                <div className="cat-recovery-bar"><span style={{ width: "30%" }}></span></div>
              </div>
              <div className="cat-recovery-row">
                <div className="cat-recovery-label">
                  <span className="cat-recovery-tag accent">Consequential damages</span>
                  <p>Rental car, lost wages, towing, alternative transportation.</p>
                </div>
                <div className="cat-recovery-amount accent">+$900</div>
                <div className="cat-recovery-bar"><span style={{ width: "62%", background: "var(--accent)" }}></span></div>
              </div>
              <div className="cat-recovery-row">
                <div className="cat-recovery-label">
                  <span className="cat-recovery-tag">Statutory multiplier</span>
                  <p>State consumer-protection laws often add 2x or 3x damages for fraud and willful violations.</p>
                </div>
                <div className="cat-recovery-amount">+$300</div>
                <div className="cat-recovery-bar"><span style={{ width: "8%" }}></span></div>
              </div>
              <div className="cat-recovery-row">
                <div className="cat-recovery-label">
                  <span className="cat-recovery-tag">Filing fee + interest</span>
                  <p>Filing fee, service-of-process cost, pre-judgment interest at the state legal rate.</p>
                </div>
                <div className="cat-recovery-amount">+$200</div>
                <div className="cat-recovery-bar"><span style={{ width: "4%" }}></span></div>
              </div>
            </div>

            <div className="cat-recovery-total">
              <div className="cat-recovery-total-label">
                <span className="eyebrow" style={{ color: "rgba(254,249,241,0.65)" }}>What you walk away with</span>
                <h3>Estimated recovery</h3>
                <p>Sample math on a $2,400 mechanic-overcharge case. Your numbers will differ.</p>
              </div>
              <div className="cat-recovery-total-num">
                <em>$3,800</em>
                <span>typical small-claims recovery</span>
              </div>
            </div>
          </div>
        </section>

        {/* STATE-SPECIFIC RULES */}
        <section className="cat-section">
          <div className="cat-split">
            <div className="cat-split-intro">
              <span className="eyebrow">By state</span>
              <h2>
                State-specific <em>rules</em>.
              </h2>
              <p>
                Auto repair laws, dealer disclosure rules, lemon-law thresholds, and consumer
                protection multipliers vary state by state. California has the strongest mechanic
                consumer-protection rules. Massachusetts has used-car lemon law. Pick yours for
                the exact statutes and agency contact info.
              </p>
              <Link href="/small-claims" className="cat-text-link">
                See all 50 state guides →
              </Link>
            </div>
            <div className="cat-state-grid">
              {featured.map((s) => (
                <Link key={s.slug} href={`/small-claims/${s.slug}`} className="cat-state-link">
                  <span>{s.name}</span>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTAs */}
        <section className="cat-section">
          <div className="cat-cta-card">
            <div>
              <span className="eyebrow" style={{ color: "rgba(254,249,241,0.65)" }}>Take the next step</span>
              <h2 style={{ marginTop: 14 }}>
                Three ways to <em>move forward</em>.
              </h2>
              <p>
                Most auto disputes settle once a real demand letter arrives, especially when paired
                with a complaint to the right state agency. If yours does not, the state guide
                walks you through filing step by step.
              </p>
            </div>
            <div className="cat-cta-row">
              <Link href="/demand-letter" className="cat-cta-tile">
                <div className="cat-cta-tile-icon">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 7l9 6 9-6" />
                  </svg>
                </div>
                <div>
                  <strong>Send a demand letter</strong>
                  <span>Many disputes end here.</span>
                </div>
              </Link>
              <Link href="/case-score" className="cat-cta-tile">
                <div className="cat-cta-tile-icon">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M3 21V5M3 21h18M7 17V11M12 17V8M17 17V13" />
                  </svg>
                </div>
                <div>
                  <strong>Check my case</strong>
                  <span>Free 7-question case-strength quiz.</span>
                </div>
              </Link>
              <Link href="/small-claims" className="cat-cta-tile">
                <div className="cat-cta-tile-icon">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 3v18M5 9l7-6 7 6M3 21h18" />
                  </svg>
                </div>
                <div>
                  <strong>File your claim</strong>
                  <span>Step-by-step in your state.</span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="cat-section">
          <div className="cat-split">
            <div className="cat-split-intro">
              <span className="eyebrow">FAQ</span>
              <h2>
                Common <em>questions</em>.
              </h2>
              <p>
                The questions drivers actually ask before filing. Don&rsquo;t see yours?{" "}
                <Link href="/contact" className="cat-text-link">
                  Email support
                </Link>
                .
              </p>
            </div>
            <div className="cat-faq">
              <details>
                <summary>Can you sue over a car in small claims court?</summary>
                <div>
                  <p>
                    Yes, when the dispute fits your state&rsquo;s cap (usually $5,000 to $20,000).
                    Common cases: parked-car hits when the driver is uninsured, mechanic
                    overcharges, towing damage, valet damage, and partial-refund lemon cases.
                    Bigger cases (full lemon-law refund on a $40,000 vehicle) usually need a
                    lemon-law attorney instead.
                  </p>
                </div>
              </details>
              <details>
                <summary>Should I sue the dealer or the manufacturer for a lemon?</summary>
                <div>
                  <p>
                    Almost always the manufacturer. State lemon laws and the federal Magnuson-Moss
                    Warranty Act create the warranty obligations on the manufacturer, not the
                    dealer. Dealers can be added as defendants for fraud or misrepresentation, but
                    the lemon-law claim itself is against the manufacturer&rsquo;s regional consumer
                    affairs office.
                  </p>
                </div>
              </details>
              <details>
                <summary>What state agencies handle auto disputes?</summary>
                <div>
                  <p>
                    Mechanic complaints: state Bureau of Automotive Repair (CA), DMV (NY), or
                    equivalent agency. Dealership complaints: state DMV or attorney general&rsquo;s
                    consumer protection office. Tow company complaints: state DOT or PUC. Lemon
                    cases: BBB Auto Line arbitration first, then court.
                  </p>
                </div>
              </details>
              <details>
                <summary>What if the other driver was uninsured?</summary>
                <div>
                  <p>
                    Two paths: (1) your own uninsured-motorist coverage if you carry it; (2) sue
                    the driver directly in small claims for repair cost. Collection from an
                    uninsured driver can be hard, but the judgment stays on their record for 10+
                    years and accrues interest.
                  </p>
                </div>
              </details>
              <details>
                <summary>Will my insurance go up if I sue?</summary>
                <div>
                  <p>
                    Suing the other party rarely affects your insurance. What can affect your
                    insurance is filing a claim against your own policy (uninsured motorist
                    coverage, collision). Small-claims actions against another driver are usually
                    insurance-neutral on your side.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* DISCLAIMER */}
        <p className="cat-disclaimer">
          <strong>This is general legal information, not legal advice.</strong> CivilCase is not a law
          firm. Auto law varies by state, by case type, and by the specific consumer-protection
          statutes in play. Verify deadlines, statute citations, and agency contacts against your
          state&rsquo;s official source before filing, or{" "}
          <Link href="/disclaimer" className="cat-text-link">read our disclaimer</Link>.
        </p>
      </div>
    </main>
  );
}

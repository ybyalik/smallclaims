import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import { availableStateSlugs } from "../../../../lib/state-data";
import { STATES } from "../../../../lib/states";

export const metadata: Metadata = {
  title: "Landlord Disputes in Small Claims Court — by issue and state",
  description:
    "How to sue your landlord in small claims court. Security deposits, illegal lockouts, mold and habitability, wrongful eviction, repairs, and pest infestations — what you can recover and how to file.",
  alternates: { canonical: "/small-claims/landlord" },
  openGraph: {
    title: "Landlord Disputes in Small Claims Court | CivilCase",
    description:
      "Landlord-tenant disputes you can take to small claims, what you can recover, and how to file in your state.",
    url: "/small-claims/landlord",
    type: "article",
  },
};

const ISSUES = [
  {
    slug: "security-deposit",
    title: "Security deposit not returned",
    blurb: "Most common landlord small-claim. Many states allow 2x or 3x the deposit if it was withheld in bad faith.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="6" width="18" height="13" rx="2" />
        <path d="M3 10h18M8 15h2M14 15h2" />
      </svg>
    ),
    ready: true,
  },
  {
    slug: "mold",
    title: "Mold or habitability",
    blurb: "Recover medical costs, ruined property, and reduced rent value when your landlord ignores serious habitability issues.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 21l9-18 9 18z" />
        <path d="M9 17a3 3 0 0 1 6 0" />
      </svg>
    ),
    ready: false,
  },
  {
    slug: "wrongful-eviction",
    title: "Wrongful eviction",
    blurb: "Sue for moving costs, lost personal property, hotel stays, and statutory penalties when an eviction wasn't lawful.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-7h6v7" />
      </svg>
    ),
    ready: false,
  },
  {
    slug: "illegal-lockout",
    title: "Illegal lockout",
    blurb: "Self-help evictions are illegal in nearly every state and many trigger treble damages plus attorney fees.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="5" y="11" width="14" height="10" rx="2" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      </svg>
    ),
    ready: false,
  },
  {
    slug: "repairs-not-made",
    title: "Repairs not made",
    blurb: "Repair-and-deduct, rent escrow, and direct damages claims for serious unaddressed maintenance.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M14 7l-1-1a3 3 0 0 0-4 0l-5 5a3 3 0 0 0 0 4l1 1M9 17l1 1a3 3 0 0 0 4 0l5-5a3 3 0 0 0 0-4l-1-1" />
      </svg>
    ),
    ready: false,
  },
  {
    slug: "pest-infestation",
    title: "Pest infestation",
    blurb: "Roaches, bed bugs, rats. Recover treatment costs, ruined belongings, and rent reduction for the affected period.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <ellipse cx="12" cy="13" rx="5" ry="7" />
        <path d="M12 6V3M9 5L7 3M15 5l2-2M5 13H2M19 13h3M7 19l-2 2M17 19l2 2" />
      </svg>
    ),
    ready: false,
  },
  {
    slug: "lead-poisoning",
    title: "Lead poisoning",
    blurb: "Federal and state lead-disclosure laws give renters strong claims when a landlord ignored required disclosures.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
    ready: false,
  },
];

// Top states to surface in the "State-specific rules" section. Pulled from our
// available state-data; we want recognizable + populous markets first.
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
      headline: "Landlord Disputes in Small Claims Court",
      description:
        "Practical guide to suing a landlord in small claims for security deposits, illegal lockouts, mold, repairs, and other tenant disputes.",
      author: { "@type": "Organization", name: "CivilCase" },
      publisher: { "@type": "Organization", name: "CivilCase" },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Can I sue my landlord in small claims court?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Yes — small claims is the standard venue for tenant-vs-landlord money disputes under your state's jurisdictional cap (typically $5,000 to $20,000). Eviction itself goes to housing court, but money you're owed (security deposit, repair costs, hotel stays during a lockout, lost property) belongs in small claims.",
          },
        },
        {
          "@type": "Question",
          name: "How long do I have to sue my landlord?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Most landlord-tenant claims have a 2 to 6 year statute of limitations depending on the state and whether it's a written or oral lease. Check your state guide or the case-score quiz for the exact deadline that applies to your situation.",
          },
        },
        {
          "@type": "Question",
          name: "What can I recover from my landlord in small claims?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "At minimum: your actual out-of-pocket loss (deposit, repair receipts, hotel costs, ruined property). Many states add statutory penalties — often 2x or 3x the wrongfully withheld amount — plus reasonable attorney fees, even though you don't need an attorney to use them.",
          },
        },
      ],
    },
  ],
};

export default function LandlordHubPage() {
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
        <Breadcrumbs items={[{ href: "/small-claims", label: "Small Claims" }, { label: "Landlord disputes" }]} />

        {/* HERO */}
        <header className="cat-hero">
          <span className="eyebrow">Category</span>
          <h1>
            Landlord Disputes in <em>Small Claims Court</em>
          </h1>
          <p className="cat-lede">
            If you&rsquo;re owed money by a landlord — withheld deposit, repair costs you covered,
            a hotel bill from a lockout — small claims is the right venue. You don&rsquo;t need an
            attorney, the filing fee is usually under $100, and many states stack statutory
            penalties on top of what you&rsquo;re directly owed.
          </p>
          <div className="hero-ctas">
            <Link href="/case-score" className="btn btn-dark">
              Check my case (free)
            </Link>
            <Link href="/demand-letter" className="btn btn-cream">
              Send a demand letter
            </Link>
          </div>
        </header>

        {/* ISSUE CARDS */}
        <section className="cat-section">
          <div className="sec-head" style={{ textAlign: "left", marginBottom: 28 }}>
            <h2 style={{ margin: 0 }}>
              Common landlord <em>issues</em>.
            </h2>
            <p style={{ marginTop: 12, marginLeft: 0, maxWidth: "60ch" }}>
              Pick the one that fits your situation. Each guide covers what you can recover,
              what evidence to bring, and how to file in your state.
            </p>
          </div>
          <div className="cat-grid">
            {ISSUES.map((i) => (
              <Link key={i.slug} href={`/small-claims/landlord/${i.slug}`} className={`cat-card ${i.ready ? "" : "soon"}`}>
                <div className="cat-card-icon">{i.icon}</div>
                <h3>{i.title}</h3>
                <p>{i.blurb}</p>
                <span className="cat-card-cta">
                  {i.ready ? "Read the guide" : "Coming soon"}
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </Link>
            ))}
            <Link href="/case-score" className="cat-card cat-card-quiz">
              <div className="cat-card-icon" style={{ background: "rgba(217,64,46,0.18)" }}>
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
              </div>
              <h3>Something else?</h3>
              <p>Tell us about your situation in 90 seconds and get a strength read on your case.</p>
              <span className="cat-card-cta">
                Take the case-score quiz
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </Link>
          </div>
        </section>

        {/* HOW SMALL CLAIMS HANDLES LANDLORD DISPUTES */}
        <section className="cat-section">
          <div className="sec-head" style={{ textAlign: "left", marginBottom: 24 }}>
            <h2 className="cat-h2" style={{ margin: 0 }}>
              How small claims handles <em>landlord disputes</em>.
            </h2>
            <p style={{ margin: "10px 0 0", maxWidth: "60ch", color: "var(--ink-2)" }}>
              Small claims is built for everyday money disputes — exactly the kind tenants run
              into. Most state caps fall between $5,000 and $20,000, the hearing takes 10–15
              minutes, and you don&rsquo;t need a lawyer to use it.
            </p>
          </div>

          <div className="cat-ps">
            <div className="cat-ps-grid">
              <div className="cat-ps-col">
                <h3>Belongs in small claims</h3>
                <div className="cat-ps-item">
                  <div className="cat-ps-num">01</div>
                  <div className="cat-ps-text"><strong>Withheld security deposit.</strong> Plus 2x or 3x in penalty in many states.</div>
                </div>
                <div className="cat-ps-item">
                  <div className="cat-ps-num">02</div>
                  <div className="cat-ps-text"><strong>Repairs you paid for</strong> that the lease said the landlord owed.</div>
                </div>
                <div className="cat-ps-item">
                  <div className="cat-ps-num">03</div>
                  <div className="cat-ps-text"><strong>Hotel stays</strong> during an illegal lockout or uninhabitable period.</div>
                </div>
                <div className="cat-ps-item">
                  <div className="cat-ps-num">04</div>
                  <div className="cat-ps-text"><strong>Ruined personal property</strong> from a habitability failure (mold, leaks, pests).</div>
                </div>
                <div className="cat-ps-item">
                  <div className="cat-ps-num">05</div>
                  <div className="cat-ps-text"><strong>Lead-paint disclosure</strong> violations under federal and state law.</div>
                </div>
              </div>

              <div className="cat-ps-orb" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M12 2v3M5 8l-2-1M19 8l2-1M3 11h18l-1 8H4z" />
                  <path d="M9 19v-5h6v5" />
                </svg>
              </div>

              <div className="cat-ps-col dark">
                <h3>Doesn&rsquo;t belong here</h3>
                <div className="cat-ps-item">
                  <div className="cat-ps-num">×</div>
                  <div className="cat-ps-text"><strong>Getting back into the unit.</strong> That&rsquo;s an emergency injunction in housing court.</div>
                </div>
                <div className="cat-ps-item">
                  <div className="cat-ps-num">×</div>
                  <div className="cat-ps-text"><strong>Rent-control calculations.</strong> Administrative law, not small claims.</div>
                </div>
                <div className="cat-ps-item">
                  <div className="cat-ps-num">×</div>
                  <div className="cat-ps-text"><strong>Fair-housing discrimination.</strong> State or federal civil-rights venue.</div>
                </div>
                <div className="cat-ps-item">
                  <div className="cat-ps-num">×</div>
                  <div className="cat-ps-text"><strong>Eviction defense.</strong> Goes to housing or unlawful-detainer court, not small claims.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DAMAGES */}
        <section className="cat-section">
          <div className="cat-split">
            <div className="cat-split-intro">
              <span className="eyebrow">Damages</span>
              <h2>
                What you can <em>recover</em>.
              </h2>
              <p>
                Four buckets of money stack on top of each other in landlord-tenant cases.
                Bring receipts and a clear math to the hearing — judges decide what they can
                verify.
              </p>
            </div>
            <div className="cat-damages-grid" style={{ marginTop: 0 }}>
              <div className="cat-damage">
                <div className="cat-damage-tag">Direct damages</div>
                <p>
                  Your actual out-of-pocket loss: the deposit you&rsquo;re owed, repair receipts,
                  replacement cost for ruined furniture, hotel and moving costs from a lockout.
                  Receipts, photos, and texts win this column.
                </p>
              </div>
              <div className="cat-damage">
                <div className="cat-damage-tag">Statutory penalties</div>
                <p>
                  When the landlord acted in bad faith, many states stack <strong>2x or 3x</strong>{" "}
                  the wrongfully withheld amount on top — treble damages for illegal lockouts,
                  per-day penalties for repair-and-deduct failures.
                </p>
              </div>
              <div className="cat-damage">
                <div className="cat-damage-tag">Attorney&rsquo;s fees</div>
                <p>
                  Most landlord-tenant statutes shift attorney&rsquo;s fees to the loser. Even
                  if you don&rsquo;t hire one, the threat pressures landlords into early
                  settlement.
                </p>
              </div>
              <div className="cat-damage">
                <div className="cat-damage-tag">Interest</div>
                <p>
                  Pre- and post-judgment interest runs at 4–10% per year depending on the
                  state. Compounds quietly until paid.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* EVIDENCE CHECKLIST — polaroid receipts */}
        <section className="cat-section">
          <div className="cat-split">
            <div className="cat-split-intro">
              <span className="eyebrow">Build the file</span>
              <h2>
                Evidence to <em>gather</em>.
              </h2>
              <p>
                Landlord cases are won on documentation. Whatever you don&rsquo;t have on paper,
                the judge has to take on your word — and a landlord with a property manager
                usually has more paper than you do. Pull this together first.
              </p>
            </div>
            <div className="cat-receipts">
              <div className="cat-receipt">
                <span className="cat-receipt-tag">Contract</span>
                <div className="cat-receipt-name">lease_signed.pdf</div>
                <p className="cat-receipt-desc">Every page. The signed copy, not a draft.</p>
              </div>
              <div className="cat-receipt">
                <span className="cat-receipt-tag">Photos</span>
                <div className="cat-receipt-name">move-in_walkthrough.jpg</div>
                <p className="cat-receipt-desc">Walkthrough photos and the condition checklist. Date-stamps matter.</p>
              </div>
              <div className="cat-receipt">
                <span className="cat-receipt-tag">Bank</span>
                <div className="cat-receipt-name">deposit_payment.png</div>
                <p className="cat-receipt-desc">Bank records, money-order stubs, payment-app screenshots.</p>
              </div>
              <div className="cat-receipt">
                <span className="cat-receipt-tag">Comms</span>
                <div className="cat-receipt-name">texts_with_landlord.pdf</div>
                <p className="cat-receipt-desc">Most cases turn on what was said and when. Print with timestamps.</p>
              </div>
              <div className="cat-receipt">
                <span className="cat-receipt-tag">Receipts</span>
                <div className="cat-receipt-name">hotel_repairs.pdf</div>
                <p className="cat-receipt-desc">Hotel, movers, exterminator, mold remediation, replacement furniture.</p>
              </div>
              <div className="cat-receipt">
                <span className="cat-receipt-tag">Notice</span>
                <div className="cat-receipt-name">forwarding_address.pdf</div>
                <p className="cat-receipt-desc">Certified-mail receipt that resets the deposit-return clock.</p>
              </div>
              <div className="cat-receipt">
                <span className="cat-receipt-tag">Witness</span>
                <div className="cat-receipt-name">roommate_contact.txt</div>
                <p className="cat-receipt-desc">Roommate, neighbor, or repair tech who saw the condition.</p>
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
                Landlord-tenant rules vary state by state — deposit return deadlines, statutory
                penalties, repair-and-deduct procedures. Pick your state for the exact statute,
                deadline, and form numbers.
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
                Most landlord disputes resolve once a real demand letter shows up. If yours
                doesn&rsquo;t, the state guide walks you through filing.
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
                  <span>About half of disputes end here.</span>
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

        {/* FAQ — 2-col wrap */}
        <section className="cat-section">
          <div className="cat-split">
            <div className="cat-split-intro">
              <span className="eyebrow">FAQ</span>
              <h2>
                Common <em>questions</em>.
              </h2>
              <p>
                The questions tenants actually ask before filing. Don&rsquo;t see yours?{" "}
                <Link href="/contact" className="cat-text-link">
                  Email support
                </Link>
                .
              </p>
            </div>
          <div className="cat-faq">
            <details>
              <summary>Can I sue my landlord in small claims court?</summary>
              <div>
                <p>
                  Yes — small claims is the standard venue for tenant-vs-landlord money
                  disputes under your state&rsquo;s jurisdictional cap (typically $5,000 to
                  $20,000). Eviction itself goes to housing court, but money you&rsquo;re owed
                  (deposit, repair costs, hotel stays during a lockout, lost property) belongs
                  in small claims.
                </p>
              </div>
            </details>
            <details>
              <summary>How long do I have to sue my landlord?</summary>
              <div>
                <p>
                  Most landlord-tenant claims have a 2 to 6 year statute of limitations
                  depending on the state and whether it&rsquo;s a written or oral lease.
                  Security-deposit claims often run on the contract clock (longer); repair and
                  habitability claims sometimes run on a tort clock (shorter). Check your state
                  guide for exact numbers.
                </p>
              </div>
            </details>
            <details>
              <summary>Do I need a lawyer?</summary>
              <div>
                <p>
                  No. In most states attorneys are explicitly permitted but not required, and
                  in a few states (California, for example) lawyers aren&rsquo;t even allowed at
                  the initial small-claims hearing. The whole format is built for self-represented
                  litigants.
                </p>
              </div>
            </details>
            <details>
              <summary>What if my landlord ignores my demand letter?</summary>
              <div>
                <p>
                  That&rsquo;s the signal to file in small claims. The demand letter creates the
                  paper trail you&rsquo;ll point to at the hearing — most judges expect to see
                  one. Read your state&rsquo;s small-claims guide for the specific filing fee,
                  forms, and service rules.
                </p>
              </div>
            </details>
            <details>
              <summary>Can I sue my landlord while I still live there?</summary>
              <div>
                <p>
                  Legally yes; practically be careful. Most states have anti-retaliation laws
                  that protect you if the landlord tries to evict or raise rent in response to a
                  lawsuit, but those laws are easier to invoke than to enforce. If you&rsquo;re
                  still in the unit and have leverage to wait, many tenants file once they
                  move out.
                </p>
              </div>
            </details>
          </div>
          </div>
        </section>

        {/* DISCLAIMER */}
        <p className="cat-disclaimer">
          <strong>This is general legal information, not legal advice.</strong> CivilCase is not a law firm.
          Landlord-tenant law varies by state, county, and lease type. Verify deadlines and
          statute citations against your state&rsquo;s official source before filing, or{" "}
          <Link href="/disclaimer" className="cat-text-link">read our disclaimer</Link>.
        </p>
      </div>
    </main>
  );
}

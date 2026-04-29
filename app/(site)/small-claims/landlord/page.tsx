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

        {/* HERO — 3-col like homepage */}
        <header className="cat-hero-3col">
          <div className="cat-hero-copy">
            <span className="eyebrow">Category</span>
            <h1>
              Landlord Disputes in <em>Small Claims Court</em>
            </h1>
            <p className="cat-lede">
              If you&rsquo;re owed money by a landlord — withheld deposit, repair costs, a hotel
              bill from a lockout — small claims is the right venue. You don&rsquo;t need an
              attorney, the filing fee is usually under $100, and many states stack statutory
              penalties on top.
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

          {/* Stat card — homepage hero-card style */}
          <div className="cat-hero-stat">
            <div>
              <div className="cat-hero-stat-eyebrow">Average tenant recovery</div>
              <div className="cat-hero-stat-big">
                $1,840
              </div>
              <div className="cat-hero-stat-sub">across landlord-tenant small claims · last 30 days</div>
            </div>
            <div>
              <div className="cat-hero-bars">
                <span style={{ height: "30%" }}></span>
                <span style={{ height: "55%" }}></span>
                <span style={{ height: "70%" }}></span>
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

          {/* Photo */}
          <div className="cat-hero-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=1100&fit=crop"
              alt="Apartment keys on a lease document"
            />
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

        {/* DAMAGES — recovery math dashboard */}
        <section className="cat-section">
          <div className="cat-stack-head">
            <span className="eyebrow">Damages</span>
            <h2>
              What you can <em>recover</em>.
            </h2>
            <p>
              The math judges use. A typical security-deposit case stacks four layers on top of
              the deposit you&rsquo;re directly owed.
            </p>
          </div>

          <div className="cat-recovery">
            <div className="cat-recovery-rows">
              <div className="cat-recovery-row">
                <div className="cat-recovery-label">
                  <span className="cat-recovery-tag">Direct damages</span>
                  <p>The deposit, repair receipts, hotel and moving costs, replacement-cost photos.</p>
                </div>
                <div className="cat-recovery-amount">$1,500</div>
                <div className="cat-recovery-bar"><span style={{ width: "30%" }}></span></div>
              </div>
              <div className="cat-recovery-row">
                <div className="cat-recovery-label">
                  <span className="cat-recovery-tag accent">Statutory penalty</span>
                  <p>Bad-faith withholding triggers 2x or 3x the wrongfully kept amount in most states.</p>
                </div>
                <div className="cat-recovery-amount accent">+$3,000</div>
                <div className="cat-recovery-bar"><span style={{ width: "62%", background: "var(--accent)" }}></span></div>
              </div>
              <div className="cat-recovery-row">
                <div className="cat-recovery-label">
                  <span className="cat-recovery-tag">Attorney&rsquo;s fees</span>
                  <p>Statute shifts the landlord&rsquo;s fees to the loser. Pressures early settlement.</p>
                </div>
                <div className="cat-recovery-amount">+$300</div>
                <div className="cat-recovery-bar"><span style={{ width: "8%" }}></span></div>
              </div>
              <div className="cat-recovery-row">
                <div className="cat-recovery-label">
                  <span className="cat-recovery-tag">Interest</span>
                  <p>4–10% per year, pre- and post-judgment, depending on state.</p>
                </div>
                <div className="cat-recovery-amount">+$150</div>
                <div className="cat-recovery-bar"><span style={{ width: "4%" }}></span></div>
              </div>
            </div>

            <div className="cat-recovery-total">
              <div className="cat-recovery-total-label">
                <span className="eyebrow" style={{ color: "rgba(254,249,241,0.65)" }}>What you walk away with</span>
                <h3>Estimated recovery</h3>
                <p>Sample math on a $1,500 deposit a landlord withheld in bad faith. Your numbers will differ.</p>
              </div>
              <div className="cat-recovery-total-num">
                <em>$4,950</em>
                <span>3.3× the deposit</span>
              </div>
            </div>
          </div>
        </section>

        {/* EVIDENCE — photo-driven document pile */}
        <section className="cat-section">
          <div className="cat-stack-head">
            <span className="eyebrow">Build the file</span>
            <h2>
              Evidence to <em>gather</em>.
            </h2>
            <p>
              Landlord cases are won on documentation. Whatever you don&rsquo;t have on paper,
              the judge takes on your word — and a landlord with a property manager has more
              paper than you do.
            </p>
          </div>

          <div className="cat-evidence-pile">
            <div className="cat-evidence-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1554224155-1696413565d3?w=900&h=900&fit=crop" alt="Lease and pen on a desk" />
              <div className="cat-evidence-cap">Lease + walkthrough</div>
            </div>
            <div className="cat-evidence-photo r2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=900&h=900&fit=crop" alt="Receipts and calculator" />
              <div className="cat-evidence-cap">Receipts &amp; payments</div>
            </div>
            <div className="cat-evidence-photo r3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&h=900&fit=crop" alt="Phone showing text messages" />
              <div className="cat-evidence-cap">Texts &amp; emails</div>
            </div>
            <div className="cat-evidence-photo r4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&h=900&fit=crop" alt="Camera with photos of unit condition" />
              <div className="cat-evidence-cap">Photos &amp; video</div>
            </div>
          </div>

          <div className="cat-evidence-grid">
              <div className="cat-evidence-card">
                <div className="cat-evidence-icon">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                    <path d="M14 3v6h6" />
                  </svg>
                </div>
                <h4 className="cat-evidence-title">Your lease</h4>
                <p className="cat-evidence-desc">Every page of the signed copy, not a draft. If it lives in your email, print it.</p>
              </div>
              <div className="cat-evidence-card">
                <div className="cat-evidence-icon">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="6" width="18" height="14" rx="2" />
                    <circle cx="12" cy="13" r="3.5" />
                  </svg>
                </div>
                <h4 className="cat-evidence-title">Move-in &amp; move-out photos</h4>
                <p className="cat-evidence-desc">Walkthrough photos plus the condition checklist. Date-stamps matter — judges care when the evidence was created.</p>
              </div>
              <div className="cat-evidence-card">
                <div className="cat-evidence-icon">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M3 10h18M5 6h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zM7 15h2M13 15h4" />
                  </svg>
                </div>
                <h4 className="cat-evidence-title">Proof of every payment</h4>
                <p className="cat-evidence-desc">Bank records, money-order stubs, canceled checks, payment-app screenshots. Show dollar amount and date.</p>
              </div>
              <div className="cat-evidence-card">
                <div className="cat-evidence-icon">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <h4 className="cat-evidence-title">All communications</h4>
                <p className="cat-evidence-desc">Texts, emails, certified-mail receipts, voicemails. Most landlord-tenant cases turn on what was said and when.</p>
              </div>
              <div className="cat-evidence-card">
                <div className="cat-evidence-icon">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M9 14l-3 3 3 3M15 4l3-3 3 3M9 4l-3-3-3 3M15 14l3 3 3-3M5 9l-3 3 3 3M19 9l3 3-3 3" />
                    <circle cx="12" cy="12" r="4" />
                  </svg>
                </div>
                <h4 className="cat-evidence-title">Receipts for what you spent</h4>
                <p className="cat-evidence-desc">Hotel, movers, replacement furniture, exterminator, mold remediation. Originals or PDFs.</p>
              </div>
              <div className="cat-evidence-card">
                <div className="cat-evidence-icon">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <h4 className="cat-evidence-title">Your forwarding address notice</h4>
                <p className="cat-evidence-desc">For deposit cases especially — written notice of where to send it is what starts the state clock.</p>
              </div>
              <div className="cat-evidence-card">
                <div className="cat-evidence-icon">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                  </svg>
                </div>
                <h4 className="cat-evidence-title">Witness contact info</h4>
                <p className="cat-evidence-desc">Roommate, neighbor, or repair tech who saw the unit&rsquo;s condition can be the difference at the hearing.</p>
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

import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import { availableStateSlugs } from "../../../../lib/state-data";
import { STATES } from "../../../../lib/states";

export const metadata: Metadata = {
  title: "How to Sue a Contractor in Small Claims Court",
  description:
    "Plain-English guide to suing a contractor. Vanishing contractors, unfinished work, poor workmanship, damage to your house, and 7 more disputes. What you can recover and how to file in your state.",
  alternates: { canonical: "/small-claims/contractor" },
  openGraph: {
    title: "How to Sue a Contractor in Small Claims Court | CivilCase",
    description:
      "Homeowner-versus-contractor disputes you can take to small claims, what you can recover, and how to file in your state.",
    url: "/small-claims/contractor",
    type: "article",
  },
};

const ISSUES = [
  {
    slug: "deposit-and-disappearing",
    title: "Took deposit and disappeared",
    blurb:
      "Three pressure points: contractor-board complaint, bond claim, small claims. If the contractor was unlicensed, most states let you recover every dollar paid.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="6" width="18" height="13" rx="2" />
        <path d="M3 10h18M8 15h2M14 15h2" />
      </svg>
    ),
    ready: true,
  },
  {
    slug: "unfinished-work",
    title: "Unfinished work",
    blurb:
      "Contractor started but never finished. Recover the cost difference to hire a replacement, plus the unearned portion of any deposit.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-7h6v7" />
        <path d="M14 14h.01" />
      </svg>
    ),
    ready: false,
  },
  {
    slug: "poor-workmanship",
    title: "Poor workmanship",
    blurb:
      "Work was done but it was defective. Implied warranty of workmanlike construction in most states. Recover the cost to redo or repair.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M14 9l-5 5M9 9l5 5" />
        <rect x="3" y="3" width="18" height="18" rx="2" />
      </svg>
    ),
    ready: false,
  },
  {
    slug: "damaged-house",
    title: "Damaged your house",
    blurb:
      "Contractor caused collateral damage to your home (broken pipes, water damage, electrical fires). Recover repair costs plus replaced belongings.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 21h18M5 21V10l7-5 7 5v11" />
        <path d="M9 14l3 3 3-3" />
      </svg>
    ),
    ready: false,
  },
  {
    slug: "handyman-bad-work",
    title: "Handyman bad work",
    blurb:
      "Handymen often work without licenses. Bad work plus unlicensed status often means you can recover every dollar paid in many states.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M14 6l-3-3-9 9 3 3M14 6l8 8-9 9-8-8" />
      </svg>
    ),
    ready: false,
  },
  {
    slug: "plumber-damage",
    title: "Plumber damage",
    blurb:
      "Water damage from a plumbing job gone wrong. Plumbers carry liability insurance and bonds. Recover repairs plus damage to belongings.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 2v6M9 8h6M12 8v8M8 16h8M12 16v4" />
      </svg>
    ),
    ready: false,
  },
  {
    slug: "roofer-leaking-roof",
    title: "Roofer leaking roof",
    blurb:
      "New roof that still leaks. Workmanship warranty plus manufacturer warranty plus possible cost-to-redo. The roofing trade is heavily licensed.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 12L12 3l9 9M5 21V12h14v9" />
        <path d="M12 14v.01" />
      </svg>
    ),
    ready: false,
  },
  {
    slug: "painter-damage",
    title: "Painter damage",
    blurb:
      "Damaged floors, furniture, or fixtures during a paint job. Painters often skip drop cloths. Recover cleaning, refinishing, or replacement costs.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M19 11h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H7M3 13h12v8H3z" />
      </svg>
    ),
    ready: false,
  },
  {
    slug: "landscaper-bad-work",
    title: "Landscaper bad work",
    blurb:
      "Dead plants, killed lawn, broken irrigation, damaged hardscape. Recover replacement plant cost plus repair of any damage caused.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 2L8 6l4 4 4-4z" />
        <path d="M12 10v12M5 18l7-4 7 4" />
      </svg>
    ),
    ready: false,
  },
  {
    slug: "moving-company-damage",
    title: "Moving company damage",
    blurb:
      "Damaged furniture, walls, or floors. Interstate moves governed by federal Carmack Amendment; intrastate by state law. Different rules apply.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="1" y="3" width="15" height="13" rx="2" />
        <path d="M16 8h4l3 3v5h-7" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    ready: false,
  },
  {
    slug: "moving-company-lost-items",
    title: "Moving company lost items",
    blurb:
      "Items that never arrived. Movers must declare valuation method. Default 'released-value' liability is 60 cents per pound, but full-value protection unlocks higher recovery.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
      </svg>
    ),
    ready: false,
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
      headline: "How to Sue a Contractor in Small Claims Court",
      description:
        "Practical guide to suing a contractor in small claims for vanishing deposits, unfinished work, poor workmanship, damage to your house, and other home-improvement disputes.",
      author: { "@type": "Organization", name: "CivilCase" },
      publisher: { "@type": "Organization", name: "CivilCase" },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Can you sue a contractor in small claims court?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Yes, when the dispute is mostly about money you are owed (refunded deposit, cost-to-finish difference, repair of damage caused) and the amount is within your state's cap (usually $5,000 to $20,000). Bigger jobs (full kitchen or bathroom remodels, roof replacements) often exceed the cap and need higher courts.",
          },
        },
        {
          "@type": "Question",
          name: "What is a contractor licensing board complaint?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Each state has a board (CSLB in California, DBPR in Florida, etc.) that licenses contractors and investigates complaints. The board can pull licenses, freeze bonds, order restitution, and assess fines. Filing is free and often more effective than a lawsuit because contractors do not want to lose their license. Use this as your first step before small claims.",
          },
        },
        {
          "@type": "Question",
          name: "What if the contractor was unlicensed?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "In most states this works in your favor. An unlicensed contractor cannot enforce the contract or sue you for the unpaid balance. In California (Bus & Prof Code § 7031) and several other states, you can recover every dollar you paid, regardless of any work performed. Even in states without that exact rule, unlicensed contractors face stiff penalties that pressure quick settlement.",
          },
        },
      ],
    },
  ],
};

export default function ContractorHubPage() {
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
        <Breadcrumbs items={[{ href: "/small-claims", label: "Small Claims" }, { label: "Contractor Disputes" }]} />

        {/* HERO */}
        <header className="cat-hero-3col">
          <div className="cat-hero-copy">
            <span className="eyebrow">Category</span>
            <h1>
              How to <em>sue a contractor</em> in small claims court.
            </h1>
            <p className="cat-lede">
              If a contractor took your deposit and disappeared, left the job unfinished, did
              defective work, or damaged your house, small claims is often the right court.
              Before you file, three pressure points usually settle the case faster: a state
              contractor licensing board complaint, a claim against the contractor&rsquo;s bond,
              and a demand letter that cites both.
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
              <div className="cat-hero-stat-eyebrow">Typical homeowner recovery</div>
              <div className="cat-hero-stat-big">$4,200</div>
              <div className="cat-hero-stat-sub">illustrative · varies by state, licensing status, and project size</div>
            </div>
            <div>
              <div className="cat-hero-bars">
                <span style={{ height: "32%" }}></span>
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
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=1100&fit=crop"
              alt="Construction tools on a worksite"
            />
          </div>
        </header>

        {/* ISSUE CARDS */}
        <section className="cat-section">
          <div className="sec-head" style={{ textAlign: "left", marginBottom: 28 }}>
            <h2 style={{ margin: 0 }}>
              What can you sue a contractor <em>for</em>?
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
                  <span className="cat-card-cta">
                    {i.ready ? "Read the guide" : "Coming soon"}
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </>
              );
              return i.ready ? (
                <Link key={i.slug} href={`/small-claims/sue-contractor-${i.slug}`} className="cat-card">
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
              <span className="cat-card-cta">
                Take the case-score quiz
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </Link>
          </div>
        </section>

        {/* HOW SMALL CLAIMS HANDLES CONTRACTOR DISPUTES */}
        <section className="cat-section">
          <div className="sec-head" style={{ textAlign: "left", marginBottom: 24 }}>
            <h2 className="cat-h2" style={{ margin: 0 }}>
              How small claims handles <em>contractor disputes</em>.
            </h2>
            <p style={{ margin: "10px 0 0", maxWidth: "60ch", color: "var(--ink-2)" }}>
              Small claims is built for everyday money disputes. Most state caps fall between
              $5,000 and $20,000. Hearings take 10 to 15 minutes. You do not need a lawyer.
              Contractor cases have unusually strong out-of-court options that often settle the
              dispute before you file.
            </p>
          </div>

          <div className="cat-ps">
            <div className="cat-ps-grid">
              <div className="cat-ps-col">
                <h3>Belongs in small claims</h3>
                <div className="cat-ps-item">
                  <div className="cat-ps-num">01</div>
                  <div className="cat-ps-text"><strong>Refunded deposit.</strong> Money paid up front for work that never started or was abandoned.</div>
                </div>
                <div className="cat-ps-item">
                  <div className="cat-ps-num">02</div>
                  <div className="cat-ps-text"><strong>Cost difference to finish.</strong> Quotes from replacement contractors minus what you would have paid the original.</div>
                </div>
                <div className="cat-ps-item">
                  <div className="cat-ps-num">03</div>
                  <div className="cat-ps-text"><strong>Cost to redo defective work.</strong> Implied warranty of workmanlike construction lets you recover the cost to make it right.</div>
                </div>
                <div className="cat-ps-item">
                  <div className="cat-ps-num">04</div>
                  <div className="cat-ps-text"><strong>Damage to your home.</strong> Broken pipes, water damage, electrical issues caused by the work itself.</div>
                </div>
                <div className="cat-ps-item">
                  <div className="cat-ps-num">05</div>
                  <div className="cat-ps-text"><strong>Unlicensed-contractor recovery.</strong> Many states let you claw back every dollar paid to an unlicensed contractor.</div>
                </div>
              </div>

              <div className="cat-ps-orb" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M14 6l-3-3-9 9 3 3M14 6l8 8-9 9-8-8" />
                </svg>
              </div>

              <div className="cat-ps-col dark">
                <h3>Doesn&rsquo;t belong here</h3>
                <div className="cat-ps-item">
                  <div className="cat-ps-num">×</div>
                  <div className="cat-ps-text"><strong>Damages over the cap.</strong> Full-bath or kitchen-remodel disputes often exceed $20,000 and need a higher court.</div>
                </div>
                <div className="cat-ps-item">
                  <div className="cat-ps-num">×</div>
                  <div className="cat-ps-text"><strong>Mechanic&rsquo;s lien removal.</strong> Goes to property court, not small claims.</div>
                </div>
                <div className="cat-ps-item">
                  <div className="cat-ps-num">×</div>
                  <div className="cat-ps-text"><strong>Personal injury from work.</strong> Goes to civil court, not small claims, with a personal-injury attorney.</div>
                </div>
                <div className="cat-ps-item">
                  <div className="cat-ps-num">×</div>
                  <div className="cat-ps-text"><strong>Permitting and code-enforcement disputes.</strong> Administrative law, not small claims.</div>
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
              The math judges use. A typical contractor case stacks the deposit, the cost-to-finish
              difference, and any collateral damage caused by the work itself.
            </p>
          </div>

          <div className="cat-recovery">
            <div className="cat-recovery-rows">
              <div className="cat-recovery-row">
                <div className="cat-recovery-label">
                  <span className="cat-recovery-tag">Direct damages</span>
                  <p>Refunded deposit, cost difference for a replacement contractor, cost to redo defective work.</p>
                </div>
                <div className="cat-recovery-amount">$3,200</div>
                <div className="cat-recovery-bar"><span style={{ width: "30%" }}></span></div>
              </div>
              <div className="cat-recovery-row">
                <div className="cat-recovery-label">
                  <span className="cat-recovery-tag accent">Collateral damage</span>
                  <p>Damage caused by the work itself: water damage from plumbing, fire from electrical, structural cracks.</p>
                </div>
                <div className="cat-recovery-amount accent">+$800</div>
                <div className="cat-recovery-bar"><span style={{ width: "62%", background: "var(--accent)" }}></span></div>
              </div>
              <div className="cat-recovery-row">
                <div className="cat-recovery-label">
                  <span className="cat-recovery-tag">Statutory penalties</span>
                  <p>Excessive-deposit penalties, unlicensed-contractor recovery, state consumer-protection multipliers.</p>
                </div>
                <div className="cat-recovery-amount">+$200</div>
                <div className="cat-recovery-bar"><span style={{ width: "8%" }}></span></div>
              </div>
              <div className="cat-recovery-row">
                <div className="cat-recovery-label">
                  <span className="cat-recovery-tag">Filing fee + interest</span>
                  <p>Filing fee, service of process, pre-judgment interest at the state legal rate (4 to 10 percent per year).</p>
                </div>
                <div className="cat-recovery-amount">+$0</div>
                <div className="cat-recovery-bar"><span style={{ width: "4%" }}></span></div>
              </div>
            </div>

            <div className="cat-recovery-total">
              <div className="cat-recovery-total-label">
                <span className="eyebrow" style={{ color: "rgba(254,249,241,0.65)" }}>What you walk away with</span>
                <h3>Estimated recovery</h3>
                <p>Sample math on a $5,000 deposit case with $800 in collateral damage. Your numbers will differ.</p>
              </div>
              <div className="cat-recovery-total-num">
                <em>$4,200</em>
                <span>typical small-claims recovery</span>
              </div>
            </div>
          </div>
        </section>

        {/* EVIDENCE */}
        <section className="cat-section">
          <div className="cat-stack-head">
            <span className="eyebrow">Build the file</span>
            <h2>
              What evidence do you need to <em>sue a contractor</em>?
            </h2>
            <p>
              Contractor cases are won on the contract, the deposit receipt, photos of the work,
              and quotes from replacement contractors. The clearer the math, the faster the case.
            </p>
          </div>

          <div className="cat-evidence-pile">
            <div className="cat-evidence-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&h=900&fit=crop" alt="Contractor tools and clipboard" />
              <div className="cat-evidence-cap">Contract + change orders</div>
            </div>
            <div className="cat-evidence-photo r2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1554224155-1696413565d3?w=900&h=900&fit=crop" alt="Receipts on a desk" />
              <div className="cat-evidence-cap">Deposit receipt</div>
            </div>
            <div className="cat-evidence-photo r3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&h=900&fit=crop" alt="Phone showing texts with contractor" />
              <div className="cat-evidence-cap">Texts with contractor</div>
            </div>
            <div className="cat-evidence-photo r4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&h=900&fit=crop" alt="Camera showing photos of incomplete work" />
              <div className="cat-evidence-cap">Photos of work</div>
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
              <h4 className="cat-evidence-title">The signed contract</h4>
              <p className="cat-evidence-desc">Every page, plus any change orders. Most states require home-improvement contracts in writing for jobs over a dollar threshold.</p>
            </div>
            <div className="cat-evidence-card">
              <div className="cat-evidence-icon">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="6" width="18" height="13" rx="2" />
                  <path d="M3 10h18M8 15h2M14 15h2" />
                </svg>
              </div>
              <h4 className="cat-evidence-title">Proof of every payment</h4>
              <p className="cat-evidence-desc">Bank records, money-order stubs, canceled checks, payment-app screenshots. Show dollar amount and date.</p>
            </div>
            <div className="cat-evidence-card">
              <div className="cat-evidence-icon">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="6" width="18" height="14" rx="2" />
                  <circle cx="12" cy="13" r="3.5" />
                </svg>
              </div>
              <h4 className="cat-evidence-title">Before-and-after photos</h4>
              <p className="cat-evidence-desc">Date-stamped photos of the area before work started and at every visit. Defective work is best shown side by side.</p>
            </div>
            <div className="cat-evidence-card">
              <div className="cat-evidence-icon">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h4 className="cat-evidence-title">All communications</h4>
              <p className="cat-evidence-desc">Texts, emails, voicemails. Most contractor cases turn on what was promised and when.</p>
            </div>
            <div className="cat-evidence-card">
              <div className="cat-evidence-icon">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M9 14l-3 3 3 3M15 4l3-3 3 3" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
              </div>
              <h4 className="cat-evidence-title">Replacement quotes</h4>
              <p className="cat-evidence-desc">Two or three written quotes from replacement contractors to finish or fix the work. Judges use the average to set damages.</p>
            </div>
            <div className="cat-evidence-card">
              <div className="cat-evidence-icon">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <h4 className="cat-evidence-title">Contractor license record</h4>
              <p className="cat-evidence-desc">Print the license record from the state board website. Shows the bond, the surety, past complaints, and current status. Critical for unlicensed-contractor cases.</p>
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
                Contractor licensing rules, deposit caps, and bond requirements vary state by state.
                California has the strongest unlicensed-contractor recovery statute. Florida and
                Texas have specific licensing for many trades. Pick yours for the exact rules and
                board contact information.
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
                Most contractor disputes settle once a real demand letter arrives, especially when
                paired with a contractor-board complaint. If yours does not, the state guide walks
                you through filing step by step.
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
                The questions homeowners actually ask before filing. Don&rsquo;t see yours?{" "}
                <Link href="/contact" className="cat-text-link">
                  Email support
                </Link>
                .
              </p>
            </div>
            <div className="cat-faq">
              <details>
                <summary>Can you sue a contractor in small claims court?</summary>
                <div>
                  <p>
                    Yes, when the dispute is mostly about money you are owed (refunded deposit,
                    cost-to-finish difference, repair of damage caused) and the amount is within
                    your state&rsquo;s cap (usually $5,000 to $20,000). Bigger jobs (full kitchen
                    or bathroom remodels, roof replacements) often exceed the cap and need higher
                    courts.
                  </p>
                </div>
              </details>
              <details>
                <summary>What is a contractor licensing board complaint?</summary>
                <div>
                  <p>
                    Each state has a board (CSLB in California, DBPR in Florida, etc.) that
                    licenses contractors and investigates complaints. The board can pull licenses,
                    freeze bonds, order restitution, and assess fines. Filing is free and often
                    more effective than a lawsuit. Use this as your first step before small claims.
                  </p>
                </div>
              </details>
              <details>
                <summary>What if the contractor was unlicensed?</summary>
                <div>
                  <p>
                    Most states make this work in your favor. An unlicensed contractor cannot
                    enforce the contract or sue you for the unpaid balance. In California (Bus &amp;
                    Prof Code § 7031) and several other states, you can recover every dollar
                    you paid, regardless of any work performed.
                  </p>
                </div>
              </details>
              <details>
                <summary>How much can a contractor legally take as a deposit?</summary>
                <div>
                  <p>
                    California caps home-improvement deposits at $1,000 or 10 percent, whichever is
                    less. New York caps at 50 percent. Connecticut at one-third. Many states have
                    no cap but courts treat anything above 30 to 50 percent as suspicious. Your
                    contractor-licensing law sets the limit.
                  </p>
                </div>
              </details>
              <details>
                <summary>What is a contractor surety bond and how do I claim against it?</summary>
                <div>
                  <p>
                    A surety bond is insurance the state requires licensed contractors to carry to
                    cover claims by customers. California requires $25,000; other states vary. To
                    claim, contact the bonding company (named on the contractor&rsquo;s license),
                    provide the contract, the deposit receipt, and proof of breach. The bond pays
                    out before the contractor&rsquo;s other creditors.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* DISCLAIMER */}
        <p className="cat-disclaimer">
          <strong>This is general legal information, not legal advice.</strong> CivilCase is not a law
          firm. Contractor law varies by state, county, and project type. Verify deadlines,
          licensing rules, and statute citations against your state&rsquo;s official source before
          filing, or{" "}
          <Link href="/disclaimer" className="cat-text-link">read our disclaimer</Link>.
        </p>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { availableStateSlugs } from "../../../lib/state-data";
import Breadcrumbs from "../../../components/Breadcrumbs";
import UsMap from "../../../components/widgets/UsMap";
import StateSearch from "../../../components/widgets/StateSearch";

export const metadata: Metadata = {
  title: "How to Sue in Small Claims Court",
  description:
    "Plain-English guide to small claims court. Sue a landlord, employer, contractor, neighbor, or roommate. Recover unpaid loans, damages, and refunds. Filing fees, caps, and state-specific guides for all 50 states.",
  alternates: { canonical: "/small-claims" },
  openGraph: {
    title: "How to Sue in Small Claims Court | CivilCase",
    description:
      "Plain-English guide to small claims. Categories, top topics, state guides, and how the process works.",
    url: "/small-claims",
    type: "article",
  },
};

const CATEGORIES = [
  {
    slug: "landlord",
    title: "Sue a landlord",
    blurb: "Security deposit, mold, lockout, harassment, wrongful eviction, and 6 more disputes.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 21h18M5 21V8l7-5 7 5v13" />
        <path d="M9 21v-7h6v7" />
      </svg>
    ),
  },
  {
    slug: "employer",
    title: "Sue an employer",
    blurb: "Wrongful termination, unpaid wages, last paycheck, retaliation, stolen tips, and more.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="6" width="18" height="14" rx="2" />
        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </svg>
    ),
  },
  {
    slug: "contractor",
    title: "Sue a contractor",
    blurb: "Took deposit and vanished, unfinished work, poor workmanship, damaged your house.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    slug: "auto",
    title: "Sue over a car",
    blurb: "Parked-car hit, dealership fraud, lemon, mechanic, valet damage, towing damage.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="11" width="18" height="6" rx="1" />
        <path d="M5 17v3M19 17v3M7 11l1-4h8l1 4" />
      </svg>
    ),
  },
  {
    slug: "neighbor",
    title: "Sue a neighbor",
    blurb: "Property damage, fallen trees, noise, harassment, water runoff, fence disputes.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 22V8l4-4 4 4v14M11 22V8l4-4 4 4v14" />
        <path d="M3 14h18" />
      </svg>
    ),
  },
  {
    slug: "personal-loan",
    title: "Recover money owed",
    blurb: "Friend, family, ex, IOU, verbal agreement, cash loan. Most informal loans are recoverable.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="9" />
        <path d="M9 9h6M9 12h6M9 15h4" />
      </svg>
    ),
  },
  {
    slug: "roommate",
    title: "Sue a roommate",
    blurb: "Unpaid rent, unpaid bills, moving out without notice, property damage, security deposit.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    slug: "online-seller",
    title: "Sue an online seller",
    blurb: "Amazon, eBay, Etsy, Facebook Marketplace, Venmo scams, gig services, FedEx.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      </svg>
    ),
  },
  {
    slug: "refund",
    title: "Get a refund",
    blurb: "Defective product, gym membership, dry cleaner, salon damage, services not rendered.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 12l9-9 9 9" />
        <path d="M9 21V12h6v9" />
      </svg>
    ),
  },
];

const TOP_TOPICS = [
  { href: "/small-claims/sue-landlord-security-deposit", title: "Sue a landlord for a security deposit", blurb: "2x or 3x penalties in most states" },
  { href: "/small-claims/sue-employer-wrongful-termination", title: "Sue an employer for wrongful termination", blurb: "When small claims fits vs. needing an attorney" },
  { href: "/small-claims/sue-employer-unpaid-wages", title: "Sue an employer for unpaid wages", blurb: "FLSA + state wage acts (often 2x damages)" },
  { href: "/small-claims/sue-auto-parked-car-hit", title: "Sue someone for hitting your parked car", blurb: "When insurance won't pay" },
  { href: "/small-claims/sue-contractor-deposit-and-disappearing", title: "Sue a contractor who took the deposit and vanished", blurb: "License board + bond + court" },
  { href: "/small-claims/sue-loan-someone-owes-me-money", title: "Sue someone who owes you money", blurb: "Most informal loans are recoverable" },
  { href: "/small-claims/sue-loan-friend-not-paying-back", title: "Sue a friend who won't pay you back", blurb: "Venmo records + texts = case" },
  { href: "/small-claims/sue-roommate-unpaid-rent", title: "Sue a roommate for unpaid rent", blurb: "Joint-and-several lease + contribution" },
  { href: "/small-claims/sue-neighbor-property-damage", title: "Sue a neighbor for property damage", blurb: "Their homeowners insurance covers most" },
  { href: "/small-claims/sue-neighbor-noise", title: "Sue a neighbor for noise", blurb: "Private nuisance + city ordinances" },
  { href: "/small-claims/sue-seller-amazon-seller", title: "Sue an Amazon seller", blurb: "A-to-z Guarantee first, court for backup" },
  { href: "/small-claims/sue-refund-defective-product", title: "Sue for a defective product", blurb: "Magnuson-Moss + state UDAP" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "How to Sue in Small Claims Court",
      description:
        "Comprehensive guide to small claims court. Categories, top topics, state guides, and how the process works.",
      author: { "@type": "Organization", name: "CivilCase" },
      publisher: { "@type": "Organization", name: "CivilCase" },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is small claims court?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "A simplified court for everyday money disputes. Most state caps fall between $5,000 and $20,000. Hearings take 10 to 15 minutes. You don't need a lawyer (and in some states, like California, lawyers aren't even allowed at the initial hearing).",
          },
        },
        {
          "@type": "Question",
          name: "How much does it cost to file a small claims case?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Filing fees usually run $30 to $100, depending on the state and the amount of your claim. Service-of-process costs run $30 to $80 (sheriff or private process server). The losing party often pays your filing fee back. Many states waive fees for low-income filers.",
          },
        },
        {
          "@type": "Question",
          name: "Do I need a lawyer for small claims?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "No. Small claims is built for self-represented filers. In some states (California, for example) lawyers aren't even allowed at the initial hearing. The format is simple: explain what happened, show your evidence, the judge decides.",
          },
        },
        {
          "@type": "Question",
          name: "How long does small claims take?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "30 to 90 days from filing to hearing in most states. Hearings themselves run 10 to 15 minutes. Judges often rule from the bench or send a written ruling within a few days. Collection on a judgment is separate and can take longer.",
          },
        },
        {
          "@type": "Question",
          name: "What can I sue for in small claims court?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Money damages within your state's cap (usually $5,000 to $20,000). Common categories: landlord disputes, employer disputes, contractor work, auto-related damage, neighbor disputes, personal loans, roommate disputes, online seller disputes, and refund disputes. Personal injury and discrimination cases usually need higher courts.",
          },
        },
        {
          "@type": "Question",
          name: "How do I serve the defendant?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Sheriff, certified mail through the clerk, or a private process server. You cannot serve it yourself. File proof of service before the hearing. For businesses, serve the registered agent (look it up on your state secretary of state website).",
          },
        },
      ],
    },
  ],
};

export default function SmallClaimsHubPage() {
  const ready = availableStateSlugs();

  return (
    <main className="cat-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="wrap">
        <Breadcrumbs items={[{ label: "Small Claims" }]} />

        {/* HERO */}
        <header className="cat-hero-3col">
          <div className="cat-hero-copy">
            <span className="eyebrow">Small Claims Guides</span>
            <h1>
              How to <em>sue someone</em> in small claims court.
            </h1>
            <p className="cat-lede">
              The simplified court for everyday money disputes. Most caps fall between $5,000 and
              $20,000, hearings take 10 to 15 minutes, and you don&rsquo;t need a lawyer. Pick a
              category below to start, browse popular topics, or jump straight to your state for
              filing fees and forms.
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
              <div className="cat-hero-stat-eyebrow">State caps range</div>
              <div className="cat-hero-stat-big">$5K – $20K</div>
              <div className="cat-hero-stat-sub">filing fees usually $30 to $100 · hearings 10 to 15 minutes</div>
            </div>
            <div>
              <div className="cat-hero-bars">
                <span style={{ height: "30%" }}></span>
                <span style={{ height: "55%" }}></span>
                <span style={{ height: "75%" }}></span>
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
              src="https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=800&h=1100&fit=crop"
              alt="Courthouse steps with stack of paperwork"
            />
          </div>
        </header>

        {/* CATEGORIES */}
        <section className="cat-section">
          <div className="sec-head" style={{ textAlign: "left", marginBottom: 28 }}>
            <h2 style={{ margin: 0, whiteSpace: "nowrap" }}>
              <em>Pick</em> a category.
            </h2>
            <p style={{ marginTop: 12, marginLeft: 0, maxWidth: "60ch" }}>
              Each guide covers the legal theory, what evidence to bring, what you can recover,
              and how to file in your state.
            </p>
          </div>
          <div className="cat-grid">
            {CATEGORIES.map((c) => (
              <Link key={c.slug} href={`/small-claims/${c.slug}`} className="cat-card">
                <div className="cat-card-icon">{c.icon}</div>
                <h3>{c.title}</h3>
                <p>{c.blurb}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* NOT SURE? CTA */}
        <section className="cat-section">
          <div
            className="cat-cta-card"
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}
          >
            <div style={{ flex: "1 1 360px" }}>
              <span className="eyebrow" style={{ color: "rgba(254,249,241,0.65)" }}>
                Not sure which fits?
              </span>
              <h2 style={{ marginTop: 8, marginBottom: 8 }}>
                Take the <em>case-strength quiz</em>.
              </h2>
              <p style={{ margin: 0 }}>
                Tell us about your situation in 90 seconds and get a strength read on your case
                plus the right category to pursue.
              </p>
            </div>
            <Link href="/case-score" className="cv2-cta-primary" style={{ flex: "0 0 auto" }}>
              Start the quiz →
            </Link>
          </div>
        </section>

        {/* TOP TOPICS */}
        <section className="cat-section">
          <div className="sec-head" style={{ textAlign: "left", marginBottom: 28 }}>
            <h2 style={{ margin: 0 }}>
              Popular <em>topics</em>.
            </h2>
            <p style={{ marginTop: 12, marginLeft: 0, maxWidth: "60ch" }}>
              The most-searched specific scenarios across all categories.
            </p>
          </div>
          <div className="cat-grid">
            {TOP_TOPICS.map((t) => (
              <Link key={t.href} href={t.href} className="cat-card">
                <h3 style={{ marginTop: 0 }}>{t.title}</h3>
                <p>{t.blurb}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* HOW SMALL CLAIMS WORKS */}
        <section className="cat-section">
          <div className="sec-head" style={{ textAlign: "left", marginBottom: 24 }}>
            <h2 className="cat-h2" style={{ margin: 0 }}>
              How small claims <em>actually works</em>.
            </h2>
            <p style={{ margin: "10px 0 0", maxWidth: "60ch", color: "var(--ink-2)" }}>
              The whole process is built for self-represented filers. No lawyers required (and not
              even allowed in some states). Most cases resolve in 30 to 90 days from filing.
            </p>
          </div>

          <div className="cat-ps">
            <div className="cat-ps-grid">
              <div className="cat-ps-col">
                <h3>The basics</h3>
                <div className="cat-ps-item">
                  <div className="cat-ps-num">01</div>
                  <div className="cat-ps-text"><strong>State caps.</strong> Usually $5,000 to $20,000. Texas $20K, California $12.5K (individual), New York $10K. Above the cap, you need higher court.</div>
                </div>
                <div className="cat-ps-item">
                  <div className="cat-ps-num">02</div>
                  <div className="cat-ps-text"><strong>Filing fees.</strong> $30 to $100 typical. Some states scale by claim amount. Many states waive for low-income filers.</div>
                </div>
                <div className="cat-ps-item">
                  <div className="cat-ps-num">03</div>
                  <div className="cat-ps-text"><strong>Service of process.</strong> Sheriff, certified mail through the clerk, or private process server. You cannot serve it yourself.</div>
                </div>
                <div className="cat-ps-item">
                  <div className="cat-ps-num">04</div>
                  <div className="cat-ps-text"><strong>Hearing.</strong> 10 to 15 minutes. Lead with the dollar amount, the legal theory, and your paper trail. Judge often rules from the bench.</div>
                </div>
                <div className="cat-ps-item">
                  <div className="cat-ps-num">05</div>
                  <div className="cat-ps-text"><strong>Collection.</strong> 30 days to pay voluntarily; then judgment lien, bank levy, wage garnishment, writ of execution.</div>
                </div>
              </div>

              <div className="cat-ps-orb" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M3 21h18M5 21V10l7-5 7 5v11" />
                  <path d="M9 21v-7h6v7" />
                </svg>
              </div>

              <div className="cat-ps-col dark">
                <h3>What to bring</h3>
                <div className="cat-ps-item">
                  <div className="cat-ps-num">→</div>
                  <div className="cat-ps-text"><strong>Contracts and receipts</strong> showing what was agreed and what was paid.</div>
                </div>
                <div className="cat-ps-item">
                  <div className="cat-ps-num">→</div>
                  <div className="cat-ps-text"><strong>Photos with timestamps</strong> showing damage, conditions, or pre-incident state.</div>
                </div>
                <div className="cat-ps-item">
                  <div className="cat-ps-num">→</div>
                  <div className="cat-ps-text"><strong>All communications</strong> (texts, emails, certified-mail receipts).</div>
                </div>
                <div className="cat-ps-item">
                  <div className="cat-ps-num">→</div>
                  <div className="cat-ps-text"><strong>Witness contact info</strong> for anyone who saw what happened.</div>
                </div>
                <div className="cat-ps-item">
                  <div className="cat-ps-num">→</div>
                  <div className="cat-ps-text"><strong>Demand letter</strong> showing you tried to resolve before filing. Most judges expect to see one.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATE GUIDES */}
        <section className="cat-section">
          <div className="cat-stack-head">
            <span className="eyebrow">State-specific guides</span>
            <h2>
              File in <em>your state</em>.
            </h2>
            <p>
              Filing fees, caps, forms, and service rules vary by state. Pick yours for the exact
              statute citations, court forms, and step-by-step filing process.
            </p>
          </div>

          <StateSearch readySlugs={ready} />

          <UsMap readySlugs={ready} />
        </section>

        {/* CTA CARD */}
        <section className="cat-section">
          <div className="cat-cta-card">
            <div>
              <span className="eyebrow" style={{ color: "rgba(254,249,241,0.65)" }}>Take the next step</span>
              <h2 style={{ marginTop: 14 }}>
                Three ways to <em>move forward</em>.
              </h2>
              <p>
                Most disputes settle once a real demand letter arrives. If yours does not, the
                state guide walks you through filing step by step.
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
              <Link href="#state-guides" className="cat-cta-tile">
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
                The questions everyone asks before filing. Don&rsquo;t see yours?{" "}
                <Link href="/contact" className="cat-text-link">
                  Email support
                </Link>
                .
              </p>
            </div>
            <div className="cat-faq">
              <details>
                <summary>What is small claims court?</summary>
                <div>
                  <p>
                    A simplified court for everyday money disputes. Most state caps fall between
                    $5,000 and $20,000. Hearings take 10 to 15 minutes. You don&rsquo;t need a
                    lawyer (and in some states, like California, lawyers aren&rsquo;t even allowed
                    at the initial hearing).
                  </p>
                </div>
              </details>
              <details>
                <summary>How much does it cost to file?</summary>
                <div>
                  <p>
                    Filing fees usually run $30 to $100, depending on the state and the claim
                    amount. Service-of-process costs run $30 to $80. The losing party often pays
                    your filing fee back. Many states waive fees for low-income filers.
                  </p>
                </div>
              </details>
              <details>
                <summary>Do I need a lawyer?</summary>
                <div>
                  <p>
                    No. Small claims is built for self-represented filers. In some states
                    (California, for example) lawyers aren&rsquo;t even allowed at the initial
                    hearing. The format is simple: explain what happened, show your evidence,
                    judge decides.
                  </p>
                </div>
              </details>
              <details>
                <summary>How long does the process take?</summary>
                <div>
                  <p>
                    30 to 90 days from filing to hearing in most states. Hearings themselves run
                    10 to 15 minutes. Judges often rule from the bench or send a written ruling
                    within a few days. Collection on a judgment is separate and can take longer.
                  </p>
                </div>
              </details>
              <details>
                <summary>What can I sue for?</summary>
                <div>
                  <p>
                    Money damages within your state&rsquo;s cap (usually $5,000 to $20,000).
                    Landlord disputes, employer disputes, contractor work, auto-related damage,
                    neighbor disputes, personal loans, roommate disputes, online seller disputes,
                    and refund disputes are all common. Personal injury and discrimination cases
                    usually need higher courts.
                  </p>
                </div>
              </details>
              <details>
                <summary>How do I serve the defendant?</summary>
                <div>
                  <p>
                    Sheriff, certified mail through the clerk, or a private process server. You
                    cannot serve it yourself. File proof of service before the hearing. For
                    businesses, serve the registered agent (look it up on your state secretary of
                    state website).
                  </p>
                </div>
              </details>
              <details>
                <summary>What if the defendant doesn&rsquo;t show up?</summary>
                <div>
                  <p>
                    You usually win by default judgment. The court issues judgment in your favor
                    based on your unopposed evidence. Default judgments enforce the same way as
                    contested judgments: lien, levy, garnishment.
                  </p>
                </div>
              </details>
              <details>
                <summary>Will this affect the defendant&rsquo;s credit?</summary>
                <div>
                  <p>
                    Yes if it goes to judgment. Civil judgments appear on credit reports for 7
                    years. The threat of a judgment hitting credit is one reason demand letters
                    work: most defendants settle before judgment to avoid the credit hit.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* DISCLAIMER */}
        <p className="cat-disclaimer">
          <strong>This is general legal information, not legal advice.</strong> CivilCase is not a law
          firm. State laws vary widely on caps, fees, deadlines, and procedure. Verify everything
          against your state&rsquo;s official source before filing, or{" "}
          <Link href="/disclaimer" className="cat-text-link">read our disclaimer</Link>.
        </p>
      </div>
    </main>
  );
}

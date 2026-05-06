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
    photo: "1560518883-ce09059eeffa",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4 4-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
  {
    slug: "employer",
    title: "Sue an employer",
    blurb: "Wrongful termination, unpaid wages, last paycheck, retaliation, stolen tips, and more.",
    photo: "1521791136064-7986c2920216",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </svg>
    ),
  },
  {
    slug: "contractor",
    title: "Sue a contractor",
    blurb: "Took deposit and vanished, unfinished work, poor workmanship, damaged your house.",
    photo: "1503387762-592deb58ef4e",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M14 4l6 6-3 3-6-6 3-3z" />
        <path d="M11 7l-7 7v6h6l7-7" />
      </svg>
    ),
  },
  {
    slug: "auto",
    title: "Sue over a car",
    blurb: "Parked-car hit, dealership fraud, lemon, mechanic, valet damage, towing damage.",
    photo: "1503376780353-7e6692767b70",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 16h18l-2-7H5z" />
        <circle cx="7.5" cy="16.5" r="1.5" />
        <circle cx="16.5" cy="16.5" r="1.5" />
      </svg>
    ),
  },
  {
    slug: "neighbor",
    title: "Sue a neighbor",
    blurb: "Property damage, fallen trees, noise, harassment, water runoff, fence disputes.",
    photo: "1568605114967-8130f3a36994",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 21h18M5 21V10l7-5 7 5v11" />
        <path d="M9 21v-7h6v7" />
      </svg>
    ),
  },
  {
    slug: "personal-loan",
    title: "Recover money owed",
    blurb: "Friend, family, ex, IOU, verbal agreement, cash loan. Most informal loans are recoverable.",
    photo: "1554224155-1696413565d3",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
        <path d="M14 3v6h6M8 13h8M8 17h6" />
      </svg>
    ),
  },
  {
    slug: "roommate",
    title: "Sue a roommate",
    blurb: "Unpaid rent, unpaid bills, moving out without notice, property damage, security deposit.",
    photo: "1560448204-e02f11c3d0e2",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="9" cy="8" r="3" />
        <circle cx="16" cy="9" r="2.5" />
        <path d="M3 20c0-3 3-5 6-5s6 2 6 5M14 20c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4" />
      </svg>
    ),
  },
  {
    slug: "online-seller",
    title: "Sue an online seller",
    blurb: "Amazon, eBay, Etsy, Facebook Marketplace, Venmo scams, gig services, FedEx.",
    photo: "1607082348824-0a96f2a4b9da",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
      </svg>
    ),
  },
  {
    slug: "refund",
    title: "Get a refund",
    blurb: "Defective product, gym membership, dry cleaner, salon damage, services not rendered.",
    photo: "1554224154-26032ffc0d07",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 7l4-4 4 4M7 3v10a4 4 0 0 0 4 4h10" />
        <path d="M21 17l-4 4-4-4" />
      </svg>
    ),
  },
];

const TOP_TOPICS = [
  {
    href: "/small-claims/sue-landlord-security-deposit",
    title: "Sue a landlord for a security deposit",
    blurb: "2x or 3x penalties in most states",
    avg: "$4,500",
    timeline: "30-60 days",
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l8 3v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    href: "/small-claims/sue-employer-wrongful-termination",
    title: "Sue an employer for wrongful termination",
    blurb: "When small claims fits vs. needing an attorney",
    avg: "$7,200",
    timeline: "60-90 days",
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <path d="M3 12h18" />
      </svg>
    ),
  },
  {
    href: "/small-claims/sue-employer-unpaid-wages",
    title: "Sue an employer for unpaid wages",
    blurb: "FLSA + state wage acts (often 2x damages)",
    avg: "$4,400",
    timeline: "45-90 days",
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="7" width="18" height="11" rx="1" strokeDasharray="2 2" />
        <circle cx="12" cy="12.5" r="2.5" />
        <path d="M12 11v3M11 12.5h2" />
      </svg>
    ),
  },
  {
    href: "/small-claims/sue-auto-parked-car-hit",
    title: "Sue someone for hitting your parked car",
    blurb: "When insurance won't pay",
    avg: "$4,200",
    timeline: "30-60 days",
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 16h18l-2-6H5z" />
        <circle cx="7.5" cy="17" r="1.5" />
        <circle cx="16.5" cy="17" r="1.5" />
      </svg>
    ),
  },
  {
    href: "/small-claims/sue-contractor-deposit-and-disappearing",
    title: "Sue a contractor who took the deposit and vanished",
    blurb: "License board + bond + court",
    avg: "$6,500",
    timeline: "60-120 days",
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2-2 2.5-2.5z" />
      </svg>
    ),
  },
  {
    href: "/small-claims/sue-loan-someone-owes-me-money",
    title: "Sue someone who owes you money",
    blurb: "Most informal loans are recoverable",
    avg: "$5,400",
    timeline: "60-90 days",
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 8h15a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8z" />
        <path d="M3 8V6a1 1 0 0 1 1-1h13" />
        <circle cx="17" cy="14" r="1.2" />
      </svg>
    ),
  },
  {
    href: "/small-claims/sue-loan-friend-not-paying-back",
    title: "Sue a friend who won't pay you back",
    blurb: "Venmo records + texts = case",
    avg: "$3,200",
    timeline: "60-90 days",
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 1 1 4 7.5L3 21l1.5-4A9 9 0 0 1 3 12z" />
      </svg>
    ),
  },
  {
    href: "/small-claims/sue-roommate-unpaid-rent",
    title: "Sue a roommate for unpaid rent",
    blurb: "Joint-and-several lease + contribution",
    avg: "$4,200",
    timeline: "60-90 days",
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M5 21V10l7-5 7 5v11" />
        <path d="M10 21v-6h4v6" />
        <circle cx="12" cy="11" r="0.6" fill="currentColor" />
      </svg>
    ),
  },
  {
    href: "/small-claims/sue-neighbor-property-damage",
    title: "Sue a neighbor for property damage",
    blurb: "Their homeowners insurance covers most",
    avg: "$4,400",
    timeline: "60-90 days",
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 21V11l3-3v13M11 21V11l3-3v13M18 21V11l3-3v13" />
        <path d="M2 15h20" />
      </svg>
    ),
  },
  {
    href: "/small-claims/sue-neighbor-noise",
    title: "Sue a neighbor for noise",
    blurb: "Private nuisance + city ordinances",
    avg: "$4,200",
    timeline: "60-120 days",
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 5L6 9H2v6h4l5 4z" />
        <path d="M19 5a10 10 0 0 1 0 14M15.5 8.5a5 5 0 0 1 0 7" />
      </svg>
    ),
  },
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
        <section className="cat-section" id="categories">
          <div className="pick-cat-head">
            <div className="sec-head" style={{ textAlign: "left", margin: 0 }}>
              <h2 style={{ margin: 0, whiteSpace: "nowrap" }}>
                <em>Pick</em> a category.
              </h2>
              <p style={{ margin: "10px 0 0", marginLeft: 0, maxWidth: "60ch", color: "var(--ink-2)" }}>
                Each guide covers the legal theory, what evidence to bring, what you can recover,
                and how to file in your state.
              </p>
            </div>
            <div className="pick-cat-note" aria-hidden="true">
              <span>Choose what fits your case</span>
              <svg viewBox="0 0 80 60" width="60" height="48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <path d="M5 8 C 30 5, 60 15, 70 40" />
                <path d="M62 32 L72 42 L62 50" />
              </svg>
            </div>
          </div>
          <div className="photo-grid">
            {CATEGORIES.map((c) => (
              <Link key={c.slug} href={`/small-claims/${c.slug}`} className="photo-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://images.unsplash.com/photo-${c.photo}?w=600&h=600&fit=crop`}
                  alt=""
                  className="photo-card-img"
                />
                <span className="photo-card-icon" aria-hidden="true">{c.icon}</span>
                <div className="photo-card-overlay">
                  <h3>{c.title}</h3>
                  <p>{c.blurb}</p>
                </div>
                <span className="photo-card-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
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
          <div className="topics-head">
            <div className="sec-head" style={{ textAlign: "left", margin: 0 }}>
              <span className="topics-eyebrow">
                Popular topics
                <svg viewBox="0 0 40 8" width="40" height="8" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                  <path d="M1 4 Q 6 1, 12 4 T 24 4 T 36 4" />
                </svg>
              </span>
              <h2 style={{ margin: "10px 0 0", whiteSpace: "nowrap" }}>
                Popular <em>topics</em>.
              </h2>
              <p style={{ margin: "10px 0 0", marginLeft: 0, maxWidth: "60ch", color: "var(--ink-2)" }}>
                The most-searched specific scenarios across all categories.
              </p>
            </div>
            <div className="topics-note" aria-hidden="true">
              <span>Real people.<br />Real problems.</span>
              <svg viewBox="0 0 40 60" width="32" height="48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                <path d="M20 5 C 25 20, 18 35, 22 52" />
                <path d="M16 46 L22 54 L28 46" />
              </svg>
            </div>
          </div>

          <div className="topics-grid">
            {TOP_TOPICS.map((t, i) => (
              <Link key={t.href} href={t.href} className="topic-card">
                <div className="topic-card-rail">
                  <span className="topic-card-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="topic-card-icon">{t.icon}</span>
                </div>
                <div className="topic-card-body">
                  <div className="topic-card-text">
                    <h3>{t.title}</h3>
                    <p>{t.blurb}</p>
                  </div>
                  <div className="topic-card-meta">
                    <span className="topic-meta-label">Avg recovery</span>
                    <span className="topic-meta-val">{t.avg}</span>
                    <span className="topic-meta-sep" aria-hidden="true" />
                    <span className="topic-meta-label">Timeline</span>
                    <span className="topic-meta-val muted">{t.timeline}</span>
                  </div>
                </div>
                <span className="topic-card-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>

          <div className="topics-cta">
            <div className="topics-cta-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18h6M10 21h4M12 2a7 7 0 0 1 4 12.7c-.7.5-1 1.3-1 2.1V18H9v-1.2c0-.8-.3-1.6-1-2.1A7 7 0 0 1 12 2z" />
              </svg>
            </div>
            <div className="topics-cta-copy">
              <strong>Don&rsquo;t see your situation?</strong>
              <span>Browse all guides or search by keyword.</span>
            </div>
            <Link href="/small-claims#categories" className="topics-cta-btn">
              Browse all guides
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </section>

        {/* HOW SMALL CLAIMS WORKS */}
        <section className="cat-section">
          <div className="sec-head" style={{ textAlign: "left", marginBottom: 24 }}>
            <h2 style={{ margin: 0 }}>
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

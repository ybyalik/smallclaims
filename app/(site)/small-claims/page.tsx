import type { Metadata } from "next";
import Link from "next/link";
import { Building2, Briefcase, Hammer, Car, Trees, HandCoins, Users, ShoppingBag, Receipt, Banknote, UserX, Wallet, AlertOctagon, UserMinus, DoorOpen, Home, Volume2, Landmark, FileText, Mail, Scale, Clock, Lightbulb, BarChart3, Map } from "lucide-react";
import { availableStateSlugs } from "../../../lib/state-data";
import { STATES } from "../../../lib/states";
import Breadcrumbs from "../../../components/Breadcrumbs";
import HeroCta from "../../../components/HeroCta";
import HeroStatePins from "../../../components/HeroStatePins";
import UsMap from "../../../components/widgets/UsMap";
import StateSearch from "../../../components/widgets/StateSearch";
import CtaStepCard from "../../../components/CtaStepCard";

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
  { slug: "landlord", title: "Sue a landlord", blurb: "Security deposit, mold, lockout, harassment, wrongful eviction, and 6 more disputes.", photo: "1560518883-ce09059eeffa", icon: <Building2 size={20} strokeWidth={1.8} /> },
  { slug: "employer", title: "Sue an employer", blurb: "Wrongful termination, unpaid wages, last paycheck, retaliation, stolen tips, and more.", photo: "1521791136064-7986c2920216", icon: <Briefcase size={20} strokeWidth={1.8} /> },
  { slug: "contractor", title: "Sue a contractor", blurb: "Took deposit and vanished, unfinished work, poor workmanship, damaged your house.", photo: "1503387762-592deb58ef4e", icon: <Hammer size={20} strokeWidth={1.8} /> },
  { slug: "auto", title: "Sue over a car", blurb: "Parked-car hit, dealership fraud, lemon, mechanic, valet damage, towing damage.", photo: "1503376780353-7e6692767b70", icon: <Car size={20} strokeWidth={1.8} /> },
  { slug: "neighbor", title: "Sue a neighbor", blurb: "Property damage, fallen trees, noise, harassment, water runoff, fence disputes.", photo: "1568605114967-8130f3a36994", icon: <Trees size={20} strokeWidth={1.8} /> },
  { slug: "personal-loan", title: "Recover money owed", blurb: "Friend, family, ex, IOU, verbal agreement, cash loan. Most informal loans are recoverable.", photo: "1554224155-1696413565d3", icon: <HandCoins size={20} strokeWidth={1.8} /> },
  { slug: "roommate", title: "Sue a roommate", blurb: "Unpaid rent, unpaid bills, moving out without notice, property damage, security deposit.", photo: "1560448204-e02f11c3d0e2", icon: <Users size={20} strokeWidth={1.8} /> },
  { slug: "online-seller", title: "Sue an online seller", blurb: "Amazon, eBay, Etsy, Facebook Marketplace, Venmo scams, gig services, FedEx.", photo: "1607082348824-0a96f2a4b9da", icon: <ShoppingBag size={20} strokeWidth={1.8} /> },
  { slug: "refund", title: "Get a refund", blurb: "Defective product, gym membership, dry cleaner, salon damage, services not rendered.", photo: "1554224154-26032ffc0d07", icon: <Receipt size={20} strokeWidth={1.8} /> },
];

const TOP_TOPICS = [
  { href: "/small-claims/sue-landlord-security-deposit", title: "Sue a landlord for a security deposit", blurb: "2x or 3x penalties in most states", avg: "$4,500", timeline: "30-60 days", icon: <Banknote size={32} strokeWidth={1.6} /> },
  { href: "/small-claims/sue-employer-wrongful-termination", title: "Sue an employer for wrongful termination", blurb: "When small claims fits vs. needing an attorney", avg: "$7,200", timeline: "60-90 days", icon: <UserX size={32} strokeWidth={1.6} /> },
  { href: "/small-claims/sue-employer-unpaid-wages", title: "Sue an employer for unpaid wages", blurb: "FLSA + state wage acts (often 2x damages)", avg: "$4,400", timeline: "45-90 days", icon: <Wallet size={32} strokeWidth={1.6} /> },
  { href: "/small-claims/sue-auto-parked-car-hit", title: "Sue someone for hitting your parked car", blurb: "When insurance won't pay", avg: "$4,200", timeline: "30-60 days", icon: <Car size={32} strokeWidth={1.6} /> },
  { href: "/small-claims/sue-contractor-deposit-and-disappearing", title: "Sue a contractor who took the deposit and vanished", blurb: "License board + bond + court", avg: "$6,500", timeline: "60-120 days", icon: <AlertOctagon size={32} strokeWidth={1.6} /> },
  { href: "/small-claims/sue-loan-someone-owes-me-money", title: "Sue someone who owes you money", blurb: "Most informal loans are recoverable", avg: "$5,400", timeline: "60-90 days", icon: <HandCoins size={32} strokeWidth={1.6} /> },
  { href: "/small-claims/sue-loan-friend-not-paying-back", title: "Sue a friend who won't pay you back", blurb: "Venmo records + texts = case", avg: "$3,200", timeline: "60-90 days", icon: <UserMinus size={32} strokeWidth={1.6} /> },
  { href: "/small-claims/sue-roommate-unpaid-rent", title: "Sue a roommate for unpaid rent", blurb: "Joint-and-several lease + contribution", avg: "$4,200", timeline: "60-90 days", icon: <DoorOpen size={32} strokeWidth={1.6} /> },
  { href: "/small-claims/sue-neighbor-property-damage", title: "Sue a neighbor for property damage", blurb: "Their homeowners insurance covers most", avg: "$4,400", timeline: "60-90 days", icon: <Home size={32} strokeWidth={1.6} /> },
  { href: "/small-claims/sue-neighbor-noise", title: "Sue a neighbor for noise", blurb: "Private nuisance + city ordinances", avg: "$4,200", timeline: "60-120 days", icon: <Volume2 size={32} strokeWidth={1.6} /> },
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

export default async function SmallClaimsHubPage() {
  const ready = await availableStateSlugs();

  return (
    <main className="cat-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="wrap">
        <Breadcrumbs items={[{ label: "Small Claims" }]} />

        {/* HERO */}
        <header className="cat-hero-2col">
          <div className="cat-hero-copy">
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
              <HeroCta href="/demand-letter" variant="green" icon="demand-letter">Generate a Demand Letter</HeroCta>
              <HeroCta href="/case-score" variant="cream" icon="case-score">Check My Case Strength</HeroCta>
            </div>
          </div>
          <HeroStatePins />
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
              <p style={{ margin: 0, whiteSpace: "nowrap" }}>
                Tell us about your situation in 90 seconds and get a strength read on your case.
              </p>
            </div>
            <Link href="/case-score" className="cv2-cta-primary" style={{ flex: "0 0 auto" }}>
              Check Case Score →
            </Link>
          </div>
        </section>

        {/* TOP TOPICS */}
        <section className="cat-section">
          <div className="topics-head">
            <div className="sec-head" style={{ textAlign: "left", margin: 0 }}>
              <span className="eyebrow">Popular topics</span>
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
                <div className="topic-card-arrow-cell">
                  <span className="topic-card-arrow" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </div>
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
                <h3>The process, step by step</h3>
                <ol className="cat-ps-list">
                  <li className="cat-ps-item">
                    <span className="cat-ps-num">01</span>
                    <span className="cat-ps-icon" aria-hidden="true"><Landmark size={22} strokeWidth={1.6} /></span>
                    <div className="cat-ps-text"><strong>State caps.</strong> Usually $5,000 to $20,000. Texas $20K, California $12.5K (individual), New York $10K. Above the cap, you need higher court.</div>
                  </li>
                  <li className="cat-ps-item">
                    <span className="cat-ps-num">02</span>
                    <span className="cat-ps-icon" aria-hidden="true"><FileText size={22} strokeWidth={1.6} /></span>
                    <div className="cat-ps-text"><strong>Filing fees.</strong> $30 to $100 typical. Some states scale by claim amount. Many states waive for low-income filers.</div>
                  </li>
                  <li className="cat-ps-item">
                    <span className="cat-ps-num">03</span>
                    <span className="cat-ps-icon" aria-hidden="true"><Mail size={22} strokeWidth={1.6} /></span>
                    <div className="cat-ps-text"><strong>Service of process.</strong> Sheriff, certified mail through the clerk, or private process server. You cannot serve it yourself.</div>
                  </li>
                  <li className="cat-ps-item">
                    <span className="cat-ps-num">04</span>
                    <span className="cat-ps-icon" aria-hidden="true"><Scale size={22} strokeWidth={1.6} /></span>
                    <div className="cat-ps-text"><strong>Hearing.</strong> 10 to 15 minutes. Lead with the dollar amount, the legal theory, and your paper trail. Judge often rules from the bench.</div>
                  </li>
                  <li className="cat-ps-item">
                    <span className="cat-ps-num">05</span>
                    <span className="cat-ps-icon" aria-hidden="true"><Wallet size={22} strokeWidth={1.6} /></span>
                    <div className="cat-ps-text"><strong>Collection.</strong> 30 days to pay voluntarily; then judgment lien, bank levy, wage garnishment, writ of execution.</div>
                  </li>
                </ol>
              </div>

              <div className="cat-ps-orb" aria-hidden="true">
                <img src="/cc-white-border.webp" alt="" />
              </div>

              <div className="cat-ps-col dark">
                <h3>What to bring</h3>
                <ul className="cat-ps-list">
                  <li className="cat-ps-item">
                    <span className="cat-ps-arrow" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                    <div className="cat-ps-text"><strong>Contracts and receipts</strong> showing what was agreed and what was paid.</div>
                  </li>
                  <li className="cat-ps-item">
                    <span className="cat-ps-arrow" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                    <div className="cat-ps-text"><strong>Photos with timestamps</strong> showing damage, conditions, or pre-incident state.</div>
                  </li>
                  <li className="cat-ps-item">
                    <span className="cat-ps-arrow" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                    <div className="cat-ps-text"><strong>All communications</strong> (texts, emails, certified-mail receipts).</div>
                  </li>
                  <li className="cat-ps-item">
                    <span className="cat-ps-arrow" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                    <div className="cat-ps-text"><strong>Witness contact info</strong> for anyone who saw what happened.</div>
                  </li>
                  <li className="cat-ps-item">
                    <span className="cat-ps-arrow" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                    <div className="cat-ps-text"><strong>Demand letter</strong> showing you tried to resolve before filing. Most judges expect to see one.</div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="cat-ps-stats">
              <div className="cat-ps-stat">
                <span className="cat-ps-stat-icon" aria-hidden="true"><Clock size={20} strokeWidth={1.8} /></span>
                <span>Most cases resolve in <strong>30 to 90 days</strong>.</span>
              </div>
              <span className="cat-ps-stat-divider" aria-hidden="true" />
              <div className="cat-ps-stat">
                <span className="cat-ps-stat-icon" aria-hidden="true"><Lightbulb size={20} strokeWidth={1.8} /></span>
                <span>You don&rsquo;t need a lawyer. <strong>You need a plan</strong>.</span>
              </div>
            </div>
          </div>
        </section>

        {/* STATE GUIDES — map on the left, search + popular states on the right */}
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

          <div className="state-guides-grid">
            <div className="state-guides-map">
              <UsMap readySlugs={ready} />
            </div>
            <aside className="state-guides-side">
              <div className="state-guides-panel">
                <div className="state-guides-panel-section">
                  <span className="eyebrow state-guides-panel-label">Search states</span>
                  <StateSearch readySlugs={ready} />
                </div>
                <div className="state-guides-panel-divider" />
                <div className="state-guides-panel-section">
                  <span className="eyebrow state-guides-panel-label">Most popular</span>
                  <ul className="state-guides-popular-list">
                    {[
                      { slug: "california", name: "California", abbr: "CA" },
                      { slug: "texas", name: "Texas", abbr: "TX" },
                      { slug: "new-york", name: "New York", abbr: "NY" },
                      { slug: "florida", name: "Florida", abbr: "FL" },
                      { slug: "pennsylvania", name: "Pennsylvania", abbr: "PA" },
                      { slug: "georgia", name: "Georgia", abbr: "GA" },
                    ].map((s) => (
                      <li key={s.slug}>
                        <Link href={`/small-claims/${s.slug}`}>
                          <span className="state-guides-popular-abbr">{s.abbr}</span>
                          <span className="state-guides-popular-name">{s.name}</span>
                          <span className="state-guides-popular-arrow" aria-hidden>→</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>

          {/* Full A-Z list of every state. Collapsed by default; Googlebot
              still crawls content inside <details>, so the internal-link
              hub still works for SEO. */}
          <details id="all-states" className="all-states-block">
            <summary className="all-states-summary">
              <span>See all 51 states</span>
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </summary>
            <ul className="all-states-grid">
              {STATES.map((s) => (
                <li key={s.slug}>
                  <Link href={`/small-claims/${s.slug}`}>
                    <span className="all-states-abbr">{s.abbr}</span>
                    <span className="all-states-name">{s.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        </section>

        {/* CLOSING CTA + TESTIMONIAL — matches the dark "Three ways to move
            forward" pattern used on category pages (e.g. /small-claims/auto). */}
        <section className="cat-section">
          <div
            style={{
              backgroundColor: "var(--ink)",
              backgroundImage: [
                "radial-gradient(ellipse at 30% 20%, rgba(255, 255, 255, 0.07), transparent 55%)",
                "radial-gradient(ellipse at 80% 80%, rgba(0, 0, 0, 0.18), transparent 60%)",
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' seed='4'/><feColorMatrix values='0 0 0 0 0.95  0 0 0 0 0.93  0 0 0 0 0.85  0 0 0 0.18 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
              ].join(", "),
              boxShadow: "inset 0 0 80px rgba(0, 0, 0, 0.22)",
              color: "#fff",
              padding: "32px 0",
              borderRadius: 20,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1.85fr 1fr", gap: 0, alignItems: "center" }}>
              <div style={{ padding: "12px 44px 20px" }}>
                <span className="eyebrow" style={{ color: "rgba(254,249,241,0.65)" }}>Take the next step</span>
                <h2 style={{ fontFamily: "Newsreader, Georgia, serif", fontSize: "clamp(28px, 2.8vw, 38px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1, margin: "14px 0 28px", color: "#fef9f1" }}>
                  Three ways to <em style={{ fontStyle: "italic", color: "#f5b29f", fontWeight: 700 }}>move forward</em>.
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, alignItems: "stretch", position: "relative" }}>
                  <CtaStepCard href="/demand-letter" bg="#4ad96a" tone="dark" stepNum="01" stepPos="top-left" title="Send a Demand Letter" titlePos="bottom-left" />
                  <CtaStepCard href="/case-score" bg="#fff" tone="dark" stepNum="02" stepPos="bottom-right" title="Check My Case" titlePos="top-left" gradient />
                  <CtaStepCard href="#state-guides" bg="#7344ee" tone="light" stepNum="03" stepPos="top-right" title="File Your Claim" titlePos="bottom-right" />
                </div>
              </div>
              <div style={{ borderLeft: "1px solid #1f1f1f", padding: "20px 44px", position: "relative", alignSelf: "stretch", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ fontFamily: "Geist, system-ui, sans-serif", fontWeight: 900, fontSize: 70, lineHeight: 0.5, color: "#2a2a2a", marginBottom: 14, letterSpacing: "-0.06em" }} aria-hidden="true">
                  &rdquo;&rdquo;
                </div>
                <div style={{ width: 48, height: 1, background: "#3a3a3a", marginBottom: 14 }} />
                <p style={{ fontFamily: "Newsreader, Georgia, serif", fontSize: 18, fontStyle: "italic", lineHeight: 1.35, letterSpacing: "-0.005em", color: "#fef9f1", margin: "0 0 16px" }}>
                  Most disputes settle once a real demand letter arrives. If yours doesn&rsquo;t, the state guide walks you through filing step by step.
                </p>
                <div>
                  <div style={{ fontFamily: "Geist, system-ui, sans-serif", fontWeight: 700, fontSize: 14, color: "#fff", marginBottom: 2 }}>CivilCase</div>
                  <div style={{ fontSize: 12.5, color: "#9aa0a6" }}>For people taking action without a lawyer</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="cat-section">
          <div className="cat-split">
            <div className="cat-split-intro">
              <span className="eyebrow">FAQ</span>
              <h2>
                Frequently Asked <em>Questions</em>.
              </h2>
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

      </div>
    </main>
  );
}

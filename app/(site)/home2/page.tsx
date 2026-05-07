import type React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import HeroCta from "../../../components/HeroCta";
import HeroStatePins from "../../../components/HeroStatePins";
import CtaStepCard from "../../../components/CtaStepCard";
import ProcessFlow from "../ProcessFlow";

export const metadata: Metadata = {
  title: "Home v2 (preview)",
  robots: { index: false, follow: false, nocache: true },
};

const HOME_CATEGORIES = [
  { slug: "landlord", title: "Sue a landlord", blurb: "Security deposit, mold, lockout, harassment.", photo: "1560518883-ce09059eeffa" },
  { slug: "employer", title: "Sue an employer", blurb: "Wrongful termination, unpaid wages, last paycheck.", photo: "1521791136064-7986c2920216" },
  { slug: "contractor", title: "Sue a contractor", blurb: "Took the deposit and vanished, unfinished work.", photo: "1503387762-592deb58ef4e" },
  { slug: "auto", title: "Sue over a car", blurb: "Parked-car hit, dealership fraud, lemon, mechanic.", photo: "1503376780353-7e6692767b70" },
  { slug: "neighbor", title: "Sue a neighbor", blurb: "Property damage, fallen trees, noise, harassment.", photo: "1568605114967-8130f3a36994" },
  { slug: "personal-loan", title: "Recover money owed", blurb: "Friend, family, ex, IOU. Most informal loans recoverable.", photo: "1554224155-1696413565d3" },
  { slug: "roommate", title: "Sue a roommate", blurb: "Unpaid rent, unpaid bills, moving out without notice.", photo: "1560448204-e02f11c3d0e2" },
  { slug: "online-seller", title: "Sue an online seller", blurb: "Amazon, eBay, Etsy, Marketplace, Venmo scams.", photo: "1607082348824-0a96f2a4b9da" },
  { slug: "refund", title: "Get a refund", blurb: "Defective product, gym membership, services not rendered.", photo: "1554224154-26032ffc0d07" },
];

// The "We help with the most common small claims disputes" section data.
// Each entry maps to a WebP file in /public/icons/.
const DISPUTE_ITEMS: Array<{ webp: string; title: string; blurb: string }> = [
  {
    webp: "unpaid-invoices-icon",
    title: "Unpaid Invoices",
    blurb: "Get paid for work or services completed.",
  },
  {
    webp: "security-deposit-icon",
    title: "Security Deposits",
    blurb: "Recover your deposit from landlords.",
  },
  {
    webp: "landlord-issues-icon",
    title: "Landlord Issues",
    blurb: "Unpaid rent, damages, or lease violations.",
  },
  {
    webp: "broken-promises-icon",
    title: "Broken Promises",
    blurb: "Contracts, agreements, or refunds owed.",
  },
  {
    webp: "products-icon",
    title: "Product or Service",
    blurb: "Defective products or poor work.",
  },
  {
    webp: "other-icon",
    title: "And More",
    blurb: "Any legitimate debt or money owed.",
  },
];


function HeroAnim() {
  // Animated case-strength dashboard. CSS-only animations (no JS), driven by
  // keyframes in globals.css under .hero-anim*. The gauge fills via stroke-
  // dashoffset, the timeline dots light up sequentially, the bar chart bars
  // grow with stagger, and the live badge pulses.
  const gaugeCirc = 2 * Math.PI * 64; // r=64
  const filled = 0.78 * gaugeCirc; // 78%
  return (
    <div className="hero-anim" aria-hidden>
      <div className="hero-anim-card hero-anim-main">
        <div className="hero-anim-row">
          <span className="hero-anim-id">Case · CC-2841</span>
          <span className="hero-anim-live">
            <span className="hero-anim-live-dot" />
            Live
          </span>
        </div>
        <div className="hero-anim-gauge">
          <svg viewBox="0 0 160 160" width="160" height="160">
            <circle
              cx="80"
              cy="80"
              r="64"
              fill="none"
              stroke="rgba(217,64,46,0.12)"
              strokeWidth="14"
            />
            <circle
              className="hero-anim-gauge-fill"
              cx="80"
              cy="80"
              r="64"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="14"
              strokeLinecap="round"
              strokeDasharray={gaugeCirc}
              strokeDashoffset={gaugeCirc}
              transform="rotate(-90 80 80)"
              style={{ "--gauge-fill": `${gaugeCirc - filled}` } as React.CSSProperties}
            />
          </svg>
          <div className="hero-anim-gauge-val">
            <em>78</em>
            <sup>/100</sup>
          </div>
        </div>
        <div className="hero-anim-strength">
          <span>Case strength</span>
          <span className="hero-anim-rec">Action recommended</span>
        </div>
      </div>

      <div className="hero-anim-card hero-anim-timeline">
        <div className="hero-anim-tl-head">
          <span>Your case plan</span>
          <span className="hero-anim-tl-meta">Step 2 of 4</span>
        </div>
        <ol className="hero-anim-steps">
          {["Case review", "Demand letter", "File claim", "Win & collect"].map((label, i) => (
            <li key={i} className="hero-anim-step" style={{ animationDelay: `${i * 0.45}s` }}>
              <span className="hero-anim-step-dot">{i < 2 ? "✓" : i + 1}</span>
              <span>{label}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="hero-anim-card hero-anim-recovery">
        <div className="hero-anim-rec-hd">Recovered</div>
        <div className="hero-anim-rec-num">$2,450</div>
        <div className="hero-anim-bars">
          {[28, 38, 52, 64, 88].map((h, i) => (
            <span
              key={i}
              className={i === 4 ? "hot" : undefined}
              style={{ "--h": `${h}%`, animationDelay: `${0.6 + i * 0.12}s` } as React.CSSProperties}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
      <circle cx="12" cy="12" r="10" fill="var(--accent)" />
      <path
        d="M7 12.5l3 3 7-7"
        stroke="#fff"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function CheckIconLight() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
      <circle cx="12" cy="12" r="10" fill="none" stroke="rgba(254,249,241,0.5)" strokeWidth="1.4" />
      <path
        d="M7.5 12.5l3 3 6-7"
        stroke="#fef9f1"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function DpaIcon({
  name,
}: {
  name: "grid" | "folder" | "doc" | "msg" | "cal" | "card" | "help" | "gear" | "bell";
}) {
  const props = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "grid":
      return (
        <svg {...props}>
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      );
    case "folder":
      return (
        <svg {...props}>
          <path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
        </svg>
      );
    case "doc":
      return (
        <svg {...props}>
          <path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9l-6-6z" />
          <path d="M14 3v6h6" />
        </svg>
      );
    case "msg":
      return (
        <svg {...props}>
          <path d="M21 12a8 8 0 01-11.6 7.1L4 21l1.9-5.4A8 8 0 1121 12z" />
        </svg>
      );
    case "cal":
      return (
        <svg {...props}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 9h18M8 3v4M16 3v4" />
        </svg>
      );
    case "card":
      return (
        <svg {...props}>
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <path d="M3 11h18" />
        </svg>
      );
    case "help":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M9.5 9a2.5 2.5 0 015 0c0 1.5-2.5 2-2.5 4M12 17h.01" />
        </svg>
      );
    case "gear":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19 12a7 7 0 00-.1-1.2l2-1.5-2-3.4-2.4.9a7 7 0 00-2-1.2L14 3h-4l-.5 2.6a7 7 0 00-2 1.2L5 6l-2 3.4 2 1.4A7 7 0 005 12c0 .4 0 .8.1 1.2L3 14.6l2 3.4 2.4-.9a7 7 0 002 1.2L10 21h4l.5-2.6a7 7 0 002-1.2l2.5.9 2-3.4-2-1.5c.1-.4.1-.8.1-1.2z" />
        </svg>
      );
    case "bell":
      return (
        <svg {...props}>
          <path d="M6 8a6 6 0 0112 0c0 7 3 9 3 9H3s3-2 3-9z" />
          <path d="M10.3 21a1.94 1.94 0 003.4 0" />
        </svg>
      );
  }
}

function TrustIcon({ name }: { name: "courthouse" | "person" | "states" | "shield" | "people" }) {
  const props = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "courthouse":
      // Classical building with columns
      return (
        <svg {...props}>
          <path d="M3 9.5l9-5 9 5" />
          <path d="M4 9.5v9" />
          <path d="M20 9.5v9" />
          <path d="M8 11v6" />
          <path d="M12 11v6" />
          <path d="M16 11v6" />
          <path d="M3 19h18" />
        </svg>
      );
    case "person":
      // Single person silhouette
      return (
        <svg {...props}>
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" />
        </svg>
      );
    case "states":
      // Speech bubble representing 50 states / nationwide chat coverage
      return (
        <svg {...props}>
          <path d="M21 12a8.5 8.5 0 01-12.4 7.6L4 21l1.5-4.6A8.5 8.5 0 1121 12z" />
        </svg>
      );
    case "shield":
      // Security shield with check
      return (
        <svg {...props}>
          <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "people":
      // Group of people
      return (
        <svg {...props}>
          <circle cx="9" cy="8" r="3.2" />
          <path d="M2.5 20c0-3.2 2.9-5.6 6.5-5.6s6.5 2.4 6.5 5.6" />
          <circle cx="17" cy="9" r="2.6" />
          <path d="M22 19c0-2.4-2-4.4-4.5-4.6" />
        </svg>
      );
  }
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "CivilCase",
      url: "https://civilcase.com",
      description:
        "Resolve small claims and civil disputes, from demand to resolution.",
    },
    {
      "@type": "WebSite",
      url: "https://civilcase.com",
      name: "CivilCase",
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO */}
      <section className="hero hero-v2">
        <div className="wrap-wide hero-inner">
          <div className="hero-v2-grid">
            <div className="hero-v2-copy">
              <h1>
                Get your money back <em>without a lawyer.</em>
              </h1>
              <p>
                Everything you need to demand, file, and collect what you&rsquo;re owed,
                all in one simple platform.
              </p>
              <ul className="hero-v2-checks">
                <li>
                  <CheckIcon /> Step-by-step guidance
                </li>
                <li>
                  <CheckIcon /> Court-ready documents
                </li>
                <li>
                  <CheckIcon /> Used in all 50 states
                </li>
              </ul>
              <div className="hero-ctas">
                <HeroCta href="/demand-letter" variant="dark" icon="demand-letter">Start your case now</HeroCta>
                <HeroCta href="/case-score" variant="cream" icon="case-score">Check my case strength</HeroCta>
              </div>
              <div className="hero-v2-social">
                <div className="hero-v2-avatars" aria-hidden>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face" alt="" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=80&h=80&fit=crop&crop=face" alt="" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face" alt="" />
                </div>
                <div className="hero-v2-stars">
                  <span className="stars" aria-label="4.9 out of 5 stars">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <svg key={i} viewBox="0 0 24 24" width="16" height="16" fill="#F4A028" aria-hidden>
                        <path d="M12 2l2.39 7.36H22l-6.18 4.49L18.21 22 12 17.27 5.79 22l2.39-8.15L2 9.36h7.61z" />
                      </svg>
                    ))}
                  </span>
                  <span className="rating-text">
                    <strong>4.9/5</strong> from 2,300+ users
                  </span>
                </div>
              </div>
            </div>

            <HeroStatePins />
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <div className="trust-strip">
        <div className="wrap-wide">
          <ul>
            <li>
              <TrustIcon name="courthouse" />
              <span>Built for Small Claims Courts</span>
            </li>
            <li>
              <TrustIcon name="person" />
              <span>No Lawyer Required</span>
            </li>
            <li>
              <TrustIcon name="states" />
              <span>All 50 States</span>
            </li>
            <li>
              <TrustIcon name="shield" />
              <span>Secure &amp; Confidential</span>
            </li>
            <li>
              <TrustIcon name="people" />
              <span>
                <strong>12,400+</strong> cases filed
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* STATS */}
      <section>
        <div className="wrap-wide">
          <div className="stats-grid">
            <div>
              <span className="eyebrow">By the numbers</span>
              <h2 style={{ marginTop: 14 }}>
                Recovery at <em>operational scale.</em>
              </h2>
              <p>
                These numbers reflect how everyday people use CivilCase to track claims,
                prevent filing mistakes, and recover their money, without manual work.
              </p>
              <a className="btn btn-dark" href="#">
                Talk to a case strategist
              </a>
            </div>

            <div className="chart-card">
              <div className="axis">
                <div className="grid">
                  <b>$2.4M</b>
                  <b></b>
                  <b>$845K</b>
                </div>
                <i style={{ height: "30%" }}></i>
                <i style={{ height: "42%" }}></i>
                <i style={{ height: "55%" }}></i>
                <i style={{ height: "48%" }}></i>
                <i style={{ height: "68%" }}></i>
                <i style={{ height: "74%" }} className="tall"></i>
                <i style={{ height: "82%" }} className="tall"></i>
                <i style={{ height: "95%" }} className="tall"></i>
              </div>
              <div className="num">$18M+</div>
              <div className="lab">Recovered for users to date</div>
            </div>

            <div className="globe-card">
              <div className="top">
                <div className="num">
                  12,400<em>+</em>
                </div>
                <div className="lab">Active cases supported</div>
              </div>
              <svg className="globe-svg" viewBox="0 0 200 200">
                <defs>
                  <radialGradient id="gl" cx="35%" cy="35%">
                    <stop offset="0" stopColor="#F4A28C" />
                    <stop offset="1" stopColor="#D9402E" />
                  </radialGradient>
                </defs>
                <circle cx="100" cy="100" r="90" fill="url(#gl)" />
                <ellipse cx="100" cy="100" rx="90" ry="36" stroke="#FEF9F1" strokeOpacity=".4" fill="none" />
                <ellipse cx="100" cy="100" rx="60" ry="90" stroke="#FEF9F1" strokeOpacity=".4" fill="none" />
                <ellipse cx="100" cy="100" rx="30" ry="90" stroke="#FEF9F1" strokeOpacity=".3" fill="none" />
                <circle cx="60" cy="65" r="8" fill="#1A1714" />
                <circle cx="135" cy="80" r="8" fill="#1A1714" />
                <circle cx="115" cy="135" r="8" fill="#1A1714" />
                <circle cx="80" cy="125" r="6" fill="#1A1714" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES — photo-card grid (matches /small-claims) */}
      <section className="cat-section">
        <div className="wrap">
          <div className="sec-head" style={{ textAlign: "left", marginBottom: 28 }}>
            <h2 style={{ margin: 0 }}>
              Pick a <em>category</em>.
            </h2>
            <p style={{ marginTop: 12, marginLeft: 0, maxWidth: "60ch" }}>
              Each guide covers what you can recover, what evidence to bring, and how to file
              in your state.
            </p>
          </div>
          <div className="photo-grid">
            {HOME_CATEGORIES.map((c) => (
              <Link key={c.slug} href={`/small-claims/${c.slug}`} className="photo-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://images.unsplash.com/photo-${c.photo}?w=600&h=600&fit=crop`}
                  alt=""
                  className="photo-card-img"
                />
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
        </div>
      </section>

      {/* PROBLEM / SOLUTION */}
      <section>
        <div className="wrap">
          <div className="sec-head">
            <h2>
              Most small disputes are <em>visibility</em> problems.
            </h2>
          </div>
          <div className="ps-grid">
            <div className="ps-col-card ps-col-light">
              <div className="ps-col-head">
                <span className="ps-col-head-badge ps-col-head-badge-red" aria-hidden>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3l10 18H2L12 3z" />
                    <path d="M12 10v5M12 18h.01" />
                  </svg>
                </span>
                <h3>Common pain points</h3>
              </div>
              <div className="ps-list">
                <div className="ps-item">
                  <div className="ps-tile ps-tile-red" aria-hidden>
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M9.5 9a2.5 2.5 0 015 0c0 1.5-2.5 2-2.5 4M12 17h.01" />
                    </svg>
                  </div>
                  <div className="ps-body">
                    <div className="t">Don&rsquo;t know if you have a case</div>
                    <div className="d">No clear way to assess strength before spending money.</div>
                  </div>
                </div>
                <div className="ps-item">
                  <div className="ps-tile ps-tile-red" aria-hidden>
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 10l9-5 9 5" />
                      <path d="M5 10v9M19 10v9M9 12v6M12 12v6M15 12v6" />
                      <path d="M3 19h18" />
                    </svg>
                  </div>
                  <div className="ps-body">
                    <div className="t">Court rules are different everywhere</div>
                    <div className="d">Forms, fees, and deadlines vary by county and state.</div>
                  </div>
                </div>
                <div className="ps-item">
                  <div className="ps-tile ps-tile-red" aria-hidden>
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9l-6-6z" />
                      <path d="M14 3v6h6M8 13h8M8 17h6" />
                    </svg>
                  </div>
                  <div className="ps-body">
                    <div className="t">Even winning doesn&rsquo;t mean getting paid</div>
                    <div className="d">A judgment is a piece of paper. Collection is a separate fight.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="ps-orb">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/civilcase-shield.webp" alt="CivilCase" width={200} height={228} />
            </div>

            <div className="ps-col-card ps-col-dark">
              <div className="ps-col-head">
                <span className="ps-col-head-badge ps-col-head-badge-green" aria-hidden>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M8 12.5l2.5 2.5L16 9" />
                  </svg>
                </span>
                <h3>How we solve it</h3>
              </div>
              <div className="ps-list">
                <div className="ps-item">
                  <div className="ps-circle ps-circle-green" aria-hidden>
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v5l3 2" />
                    </svg>
                  </div>
                  <div className="ps-body">
                    <div className="t">Case score in minutes</div>
                    <div className="d">Tell us what happened, get an honest read on whether to pursue.</div>
                  </div>
                </div>
                <div className="ps-item">
                  <div className="ps-circle ps-circle-green" aria-hidden>
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9l-6-6z" />
                      <path d="M14 3v6h6M8 13h8M8 17h6" />
                    </svg>
                  </div>
                  <div className="ps-body">
                    <div className="t">Court-specific guidance</div>
                    <div className="d">Localized for your county. Forms, fees, filing rules built in.</div>
                  </div>
                </div>
                <div className="ps-item">
                  <div className="ps-circle ps-circle-green" aria-hidden>
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 17l6-6 4 4 8-8" />
                      <path d="M14 7h7v7" />
                    </svg>
                  </div>
                  <div className="ps-body">
                    <div className="t">Collection that closes</div>
                    <div className="d">Garnishment, levy, settlement, we walk you through every option.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WINNING / GETTING PAID */}
      <section className="winning" style={{ background: "#fefcf3" }}>
        <div className="wrap-wide">
          <div className="winning-head">
            <h2>
              It&rsquo;s not just about winning.<br />
              <em>It&rsquo;s about getting paid.</em>
            </h2>
            <div className="winning-sub">
              <span className="winning-sub-arrow" aria-hidden>→</span>
              Most people get stuck here. We get you through.
              <span className="winning-sub-arrow" aria-hidden>←</span>
            </div>
          </div>

          <div className="winning-cards">
            {[
              {
                icon: "step1-isthereacase",
                title: ["Not sure if", "you have a case"],
                blurb: "You need answers before you act.",
              },
              {
                icon: "step2-howtofile",
                title: ["Don't know how", "to file"],
                blurb: "Confusing rules and different courts.",
              },
              {
                icon: "step3-overwhelming",
                title: ["Process feels", "overwhelming"],
                blurb: "Too many steps, too much stress.",
              },
              {
                icon: "step4-collecting",
                title: ["Win but still", "don't get paid"],
                blurb: "Collecting is a whole different battle.",
              },
            ].map((c, i) => (
              <div key={i} className="winning-card">
                <span className="winning-x" aria-hidden>×</span>
                <div className="winning-icon-wrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/icons/${c.icon}.webp`} alt="" />
                </div>
                <h3>
                  {c.title[0]}<br />
                  {c.title[1]}
                </h3>
                <p>{c.blurb}</p>
              </div>
            ))}
          </div>

          <svg className="winning-arrows" viewBox="0 0 1200 60" aria-hidden>
            {[150, 450, 750, 1050].map((x, i) => (
              <g key={i}>
                <path
                  d={`M${x},0 Q${x},30 ${x},50`}
                  stroke="rgba(217,64,46,0.45)"
                  strokeWidth="1.4"
                  strokeDasharray="4 5"
                  fill="none"
                />
                <path
                  d={`M${x - 5},45 L${x},52 L${x + 5},45`}
                  stroke="rgba(217,64,46,0.55)"
                  strokeWidth="1.4"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            ))}
          </svg>

          <div className="winning-solution">
            <div className="winning-solution-inner" style={{ background: "var(--ink)", boxShadow: "0 22px 50px -28px rgba(31,27,22,0.5)" }}>
              <div className="winning-solution-shield">
                <svg viewBox="0 0 32 32" width="22" height="22" aria-hidden>
                  <path
                    d="M16 3l11 4v8c0 6.5-4.7 10.7-11 12-6.3-1.3-11-5.5-11-12V7l11-4z"
                    fill="rgba(255,255,255,0.18)"
                    stroke="#fff"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11 15.5l3.4 3.4 6.6-6.6"
                    stroke="#fff"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </div>
              <h3 className="winning-solution-title">
                CivilCase makes the hard parts <em>easy.</em>
              </h3>
              <ul className="winning-solution-items">
                {["Clear guidance", "Correct filing", "Step-by-step plan", "Help collecting"].map((item) => (
                  <li key={item}>
                    <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden>
                      <circle cx="10" cy="10" r="9" fill="rgba(255,255,255,0.95)" />
                      <path
                        d="M5.5 10.5l3 3 6-7"
                        stroke="#3D7A4A"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="winning-cta">
            <a className="btn btn-dark btn-lg" href="#how">
              See How It Works <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow" style={{ color: "#3D7A4A" }}>
              {"{ 02 } PROCESS"}
            </span>
            <h2 style={{ marginTop: 14 }}>
              From &ldquo;I&rsquo;m owed&rdquo; to <em>paid in full</em>.
            </h2>
          </div>

          <div className="pw-labels">
            <span>
              <span style={{ color: "#3D7A4A" }}>●</span> Set the foundation
            </span>
            <span>Resolve without court ●</span>
          </div>
          <div className="pw-line">
            <span className="dot" style={{ left: 0 }}></span>
            <span className="dot travel"></span>
            <span className="dot" style={{ left: "100%", transform: "translateX(-100%)" }}></span>
          </div>

          <ProcessFlow />
        </div>
      </section>

      {/* DASHBOARD PREVIEW */}
      <section className="dash-preview">
        <div className="wrap-wide">
          <div className="dash-preview-grid">
            <div className="dash-preview-copy">
              <span className="dash-preview-eyebrow">Your case, all in one place</span>
              <h2>
                Track everything.<br />
                Win with <em>confidence.</em>
              </h2>
              <ul className="dash-preview-checks">
                <li>
                  <CheckIconLight /> Track your case progress
                </li>
                <li>
                  <CheckIconLight /> Get court updates
                </li>
                <li>
                  <CheckIconLight /> Store all documents in one place
                </li>
                <li>
                  <CheckIconLight /> Never miss a deadline
                </li>
              </ul>
              <a className="btn btn-outline-light btn-lg" href="/dashboard">
                See your dashboard
              </a>
            </div>

            <div className="dash-preview-app">
              <aside className="dpa-side">
                <div className="dpa-brand">
                  <span className="dpa-mark">C</span>
                  <span>CivilCase</span>
                </div>
                <nav>
                  <a className="active">
                    <DpaIcon name="grid" /> Dashboard
                  </a>
                  <a>
                    <DpaIcon name="folder" /> My Cases
                  </a>
                  <a>
                    <DpaIcon name="doc" /> Documents
                  </a>
                  <a>
                    <DpaIcon name="msg" /> Messages
                  </a>
                  <a>
                    <DpaIcon name="cal" /> Court Dates
                  </a>
                  <a>
                    <DpaIcon name="card" /> Payments
                  </a>
                </nav>
                <div className="dpa-side-foot">
                  <a>
                    <DpaIcon name="help" /> Help Center
                  </a>
                  <a>
                    <DpaIcon name="gear" /> Settings
                  </a>
                </div>
              </aside>

              <div className="dpa-main">
                <div className="dpa-topbar">
                  <div>
                    <span className="dpa-title">Your case</span>
                    <span className="dpa-pill">Active</span>
                  </div>
                  <div className="dpa-toprt">
                    <span className="dpa-bell">
                      <DpaIcon name="bell" />
                      <span className="dpa-dot" />
                    </span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="dpa-avatar"
                      src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=80&h=80&fit=crop&crop=face"
                      alt=""
                    />
                  </div>
                </div>

                <div className="dpa-card">
                  <div className="dpa-card-row dpa-case-head">
                    <div>
                      <h3>Smith v. Johnson</h3>
                      <div className="dpa-meta">Case # SC-2024-01578</div>
                      <div className="dpa-meta">County: Los Angeles, CA</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div className="dpa-meta">Amount claimed</div>
                      <div className="dpa-amount">$2,450.00</div>
                      <button className="dpa-btn-cream" type="button">
                        View case details
                      </button>
                    </div>
                  </div>
                </div>

                <div className="dpa-card">
                  <h3 style={{ marginTop: 0, marginBottom: 18 }}>Case progress</h3>
                  <ol className="dpa-steps">
                    {[
                      { t: "Case Created", s: "Apr 10", done: true },
                      { t: "Documents Ready", s: "Apr 15", done: true },
                      { t: "Filed with Court", s: "Apr 18", done: true },
                      { t: "Court Date", s: "May 20", done: false },
                      { t: "Judgment", s: "—", done: false },
                      { t: "Paid", s: "—", done: false },
                    ].map((step, i) => (
                      <li
                        key={i}
                        className={`dpa-step${step.done ? " done" : ""}`}
                      >
                        <div className="dpa-step-dot">
                          {step.done ? "✓" : ""}
                        </div>
                        <div className="dpa-step-label">
                          <strong>{step.t}</strong>
                          <span>{step.s}</span>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="dpa-row-2">
                  <div className="dpa-card">
                    <h3 style={{ marginTop: 0 }}>Next step</h3>
                    <p style={{ margin: "6px 0 4px", fontWeight: 500 }}>
                      Your court date is scheduled
                    </p>
                    <div className="dpa-meta">May 20, 2024 at 9:00 AM</div>
                    <button className="dpa-btn-outline" type="button" style={{ marginTop: 14 }}>
                      View details
                    </button>
                  </div>
                  <div className="dpa-card">
                    <h3 style={{ marginTop: 0 }}>Documents</h3>
                    <ul className="dpa-docs">
                      <li>Complaint.pdf</li>
                      <li>Summons.pdf</li>
                      <li>Evidence.pdf</li>
                    </ul>
                    <span className="dpa-link">View all</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CEO MESSAGE */}
      <section className="ceo-message">
        <div className="wrap">
          <div className="ceo-grid">
            <div className="ceo-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/yury.png"
                alt="Yury Byalik"
              />
              <div className="ceo-photo-frame" aria-hidden />
            </div>
            <div className="ceo-copy">
              <span className="ceo-eyebrow">A note from our founder</span>
              <h2>
                Built by a lawyer, so you <em>don&rsquo;t need one.</em>
              </h2>
              <p>
                I spent fifteen years inside courthouses watching working people lose
                claims they should have won, simply because they couldn&rsquo;t afford a
                lawyer to walk them through the process. Filing a small claim isn&rsquo;t
                hard once you know how. The system just doesn&rsquo;t make it easy.
              </p>
              <p>
                We built CivilCase to flip that. Every form, every deadline, every
                step that a paralegal would charge you $200 an hour to handle, drafted
                for your specific case in your specific county. You bring the facts.
                We bring the procedure.
              </p>
              <div className="ceo-sig">
                <div className="ceo-sig-name">— Yury Byalik, Esq.</div>
                <div className="ceo-sig-title">Founder &amp; CEO, CivilCase</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials">
        <div className="wrap-wide">
          <div className="sec-head">
            <span className="eyebrow">Verdicts from our users</span>
            <h2>
              Cases closed.<br /><em>Money recovered.</em>
            </h2>
            <p>
              Real plaintiffs, real outcomes. Names and counties below are anonymized
              where requested but verified by court filings.
            </p>
          </div>
          <div className="testimonial-grid">
            {[
              {
                tag: "Security Deposit",
                stamp: "WON",
                amount: "$2,800",
                quote:
                  "My landlord ignored me for six weeks until CivilCase put a demand letter on his desk. He wired the deposit back the next morning.",
                name: "Maya R.",
                meta: "Brooklyn, NY · Filed 2/14, settled 2/26",
              },
              {
                tag: "Contractor",
                stamp: "RECOVERED",
                amount: "$4,200",
                quote:
                  "Two lawyers had already taken $1,800 of my money for nothing. CivilCase finished it in eleven days for the price of a stamp.",
                name: "Daniel P.",
                meta: "Austin, TX · Filed 1/22, settled 2/02",
              },
              {
                tag: "Wage Dispute",
                stamp: "JUDGMENT",
                amount: "$6,750",
                quote:
                  "My ex-employer thought ignoring me would be cheaper than paying me my final check. The court disagreed. So did the bank levy.",
                name: "Marcus W.",
                meta: "Phoenix, AZ · Filed 1/04, settled 1/29",
              },
            ].map((t) => (
              <article key={t.name} className="testimonial-card">
                <div className="testimonial-stamp">
                  <span>{t.stamp}</span>
                </div>
                <div className="testimonial-tag">{t.tag}</div>
                <div className="testimonial-amount">
                  {t.amount} <span>recovered</span>
                </div>
                <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
                <div className="testimonial-attribution">
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-meta">{t.meta}</div>
                </div>
              </article>
            ))}
          </div>
          <div className="testimonials-foot">
            $18.4M recovered to date · Verified by court filings · Updated weekly
          </div>
        </div>
      </section>

      {/* CTA BAND — variant 07 'Three ways' style */}
      <section className="cat-section">
        <div className="wrap">
          <div style={{ background: "#0d0d0d", color: "#fff", padding: "32px 0", borderRadius: 20, position: "relative", overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.85fr 1fr", gap: 0, alignItems: "center" }}>
              <div style={{ padding: "12px 44px 20px" }}>
                <span className="eyebrow" style={{ color: "rgba(254,249,241,0.65)" }}>Ready when you are</span>
                <h2 style={{ fontFamily: "Newsreader, Georgia, serif", fontSize: "clamp(28px, 2.8vw, 38px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1, margin: "14px 0 28px", color: "#fef9f1" }}>
                  Three ways to <em style={{ fontStyle: "italic", color: "#f5b29f", fontWeight: 700 }}>move forward</em>.
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, alignItems: "stretch", position: "relative" }}>
                  <CtaStepCard href="/demand-letter" bg="#4ad96a" tone="dark" stepNum="01" stepPos="top-left" title="Send a demand letter" titlePos="bottom-left" />
                  <CtaStepCard href="/case-score" bg="#fff" tone="dark" stepNum="02" stepPos="bottom-right" title="Check my case" titlePos="top-left" gradient />
                  <CtaStepCard href="/small-claims" bg="#7344ee" tone="light" stepNum="03" stepPos="top-right" title="File your claim" titlePos="bottom-right" />
                </div>
              </div>
              <div style={{ borderLeft: "1px solid #1f1f1f", padding: "20px 44px", position: "relative", alignSelf: "stretch", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ fontFamily: "Geist, system-ui, sans-serif", fontWeight: 900, fontSize: 70, lineHeight: 0.5, color: "#2a2a2a", marginBottom: 14, letterSpacing: "-0.06em" }} aria-hidden="true">
                  &rdquo;&rdquo;
                </div>
                <div style={{ width: 48, height: 1, background: "#3a3a3a", marginBottom: 14 }} />
                <p style={{ fontFamily: "Newsreader, Georgia, serif", fontSize: 18, fontStyle: "italic", lineHeight: 1.35, letterSpacing: "-0.005em", color: "#fef9f1", margin: "0 0 16px" }}>
                  Won my $4,500 deposit back in 47 days. The demand letter alone got my landlord to settle.
                </p>
                <div>
                  <div style={{ fontFamily: "Geist, system-ui, sans-serif", fontWeight: 700, fontSize: 14, color: "#fff", marginBottom: 2 }}>Maria R.</div>
                  <div style={{ fontSize: 12.5, color: "#9aa0a6" }}>Tenant · California</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}

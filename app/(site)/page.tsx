import type React from "react";
import HeroCta from "../../components/HeroCta";
import HeroCaseStrength from "../../components/HeroCaseStrength";

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

            <HeroCaseStrength />
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

      {/* ────── ALTERNATIVES PREVIEW (delete after picking) ────── */}
      <section style={{ background: "#fbf6ec", padding: "56px 0 24px", borderTop: "1px dashed rgba(31,27,22,0.15)" }}>
        <div className="wrap-wide" style={{ marginBottom: 24 }}>
          <span className="eyebrow" style={{ color: "var(--accent)" }}>Preview · pick one</span>
          <h2 style={{ fontFamily: "Newsreader", fontSize: 30, margin: "8px 0 0" }}>About-us / what-we-do alternatives</h2>
        </div>
      </section>

      {/* VERSION A — Punchy / unfair-system framing + dark stats panel */}
      <section style={{ padding: "64px 0", background: "#fff" }}>
        <div className="wrap">
          <span style={{ display: "inline-block", padding: "4px 10px", background: "rgba(217,64,46,0.10)", color: "var(--accent)", fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", borderRadius: 6, marginBottom: 14 }}>Version A · the math is broken</span>
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 56, alignItems: "center" }}>
            <div>
              <span className="eyebrow" style={{ color: "var(--accent)" }}>Why we exist</span>
              <h2 style={{ fontFamily: "Newsreader", fontSize: "clamp(32px, 3.4vw, 46px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.05, margin: "10px 0 16px" }}>
                <em style={{ fontStyle: "italic", color: "var(--accent)" }}>77%</em> of Americans with a real legal issue never hire a lawyer.
              </h2>
              <p style={{ fontSize: 16.5, color: "var(--ink-2)", lineHeight: 1.6, marginBottom: 14, maxWidth: "55ch" }}>
                Not because they&rsquo;re wrong. Because at <strong style={{ color: "var(--ink)" }}>$200&ndash;500 an hour</strong>, hiring counsel for a $4,000 dispute makes the math impossible. So they walk away.
              </p>
              <p style={{ fontSize: 16.5, color: "var(--ink-2)", lineHeight: 1.6, marginBottom: 28, maxWidth: "55ch" }}>
                Landlords keep deposits. Contractors vanish with checks. Employers shave paychecks. Sellers ship junk and refuse refunds. The cost of fighting back is higher than the loss &mdash; until now.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {[
                  { num: "01", t: "Score your case in 90 seconds", d: "We read your facts against state statute and tell you what you can recover. Free." },
                  { num: "02", t: "Draft a court-ready demand letter", d: "Cites the exact statute, formatted for certified mail. About half of disputes settle right here." },
                  { num: "03", t: "Walk you through filing", d: "County-specific forms, fees, deadlines, service rules. The same prep a $200/hr paralegal does." },
                ].map((p, i) => (
                  <div key={p.num} style={{ display: "grid", gridTemplateColumns: "44px 1fr", gap: 18, padding: "16px 0", borderTop: i === 0 ? "none" : "1px solid var(--hairline)", alignItems: "start" }}>
                    <span style={{ fontFamily: "Geist", fontWeight: 700, fontSize: 13, letterSpacing: "0.12em", color: "var(--accent)" }}>{p.num}</span>
                    <div>
                      <div style={{ fontFamily: "Newsreader", fontWeight: 700, fontSize: 17, color: "var(--ink)", marginBottom: 4 }}>{p.t}</div>
                      <div style={{ fontSize: 14.5, color: "var(--ink-2)", lineHeight: 1.5 }}>{p.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: "var(--ink)", color: "#fef9f1", borderRadius: 18, padding: 32, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(245,178,159,0.22), transparent 65%)" }} aria-hidden />
              <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 22 }}>
                <div>
                  <div style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700, color: "rgba(254,249,241,0.6)", marginBottom: 6 }}>The justice gap</div>
                  <div style={{ fontFamily: "Newsreader", fontWeight: 700, fontSize: 64, lineHeight: 1, color: "#f5b29f", letterSpacing: "-0.04em" }}>77%</div>
                  <div style={{ fontSize: 13, color: "rgba(254,249,241,0.72)", marginTop: 8, lineHeight: 1.45 }}>of Americans with a legal issue never hire a lawyer &mdash; mostly because of cost.</div>
                </div>
                <div style={{ height: 1, background: "rgba(254,249,241,0.15)" }} />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
                  <div>
                    <div style={{ fontFamily: "Newsreader", fontWeight: 700, fontSize: 30, color: "#fef9f1", letterSpacing: "-0.02em" }}>$1,500&ndash;$5,000</div>
                    <div style={{ fontSize: 12, color: "rgba(254,249,241,0.65)", marginTop: 4 }}>What a small-claims lawyer costs</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: "Newsreader", fontWeight: 700, fontSize: 30, color: "#fef9f1", letterSpacing: "-0.02em" }}>67<span style={{ fontSize: 22, color: "rgba(254,249,241,0.6)" }}>%</span></div>
                    <div style={{ fontSize: 12, color: "rgba(254,249,241,0.65)", marginTop: 4 }}>cite cost as the #1 barrier</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: "Newsreader", fontWeight: 700, fontSize: 30, color: "#fef9f1", letterSpacing: "-0.02em" }}>99<span style={{ fontSize: 22, color: "rgba(254,249,241,0.6)" }}>%</span></div>
                    <div style={{ fontSize: 12, color: "rgba(254,249,241,0.65)", marginTop: 4 }}>of small-claims filers go solo</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: "Newsreader", fontWeight: 700, fontSize: 30, color: "#fef9f1", letterSpacing: "-0.02em" }}>64<span style={{ fontSize: 22, color: "rgba(254,249,241,0.6)" }}>%</span></div>
                    <div style={{ fontSize: 12, color: "rgba(254,249,241,0.65)", marginTop: 4 }}>win rate when properly prepared</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VERSION B — Founder-led editorial + cream demand letter mockup */}
      <section style={{ padding: "64px 0", background: "#fefcf3" }}>
        <div className="wrap">
          <span style={{ display: "inline-block", padding: "4px 10px", background: "rgba(217,64,46,0.10)", color: "var(--accent)", fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", borderRadius: 6, marginBottom: 14 }}>Version B · editorial</span>
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 56, alignItems: "center" }}>
            <div>
              <span className="eyebrow" style={{ color: "var(--accent)" }}>Why we built this</span>
              <h2 style={{ fontFamily: "Newsreader", fontSize: "clamp(32px, 3.4vw, 46px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.05, margin: "10px 0 16px" }}>
                Built by a lawyer, so you <em style={{ fontStyle: "italic", color: "var(--accent)" }}>don&rsquo;t need one</em>.
              </h2>
              <p style={{ fontSize: 17, color: "var(--ink-2)", lineHeight: 1.6, marginBottom: 14 }}>
                Small claims is the only US court built for self-represented filers. Hearings take ten minutes. Filing fees are under $100. You don&rsquo;t need a lawyer &mdash; and in some states, you can&rsquo;t even bring one.
              </p>
              <p style={{ fontSize: 17, color: "var(--ink-2)", lineHeight: 1.6, marginBottom: 14 }}>
                Yet <strong style={{ color: "var(--ink)" }}>77% of Americans with a real legal issue never hire one anyway</strong>. They eat the loss. The math is straightforward: a small-claims attorney costs $1,500&ndash;$5,000 for a case worth $4,000. Two-thirds of people who skip a lawyer say cost was the deciding factor.
              </p>
              <p style={{ fontSize: 17, color: "var(--ink)", lineHeight: 1.6, marginBottom: 24, fontWeight: 600 }}>
                CivilCase is the same prep, without the bill. Score the case, draft the demand letter, walk you through the filing in your county. We close the gap between &ldquo;I&rsquo;m owed&rdquo; and &ldquo;I got paid.&rdquo;
              </p>
              <div style={{ display: "flex", gap: 24, flexWrap: "wrap", paddingTop: 18, borderTop: "1px solid var(--hairline)" }}>
                <div>
                  <div style={{ fontFamily: "Newsreader", fontWeight: 700, fontSize: 28, color: "var(--ink)", letterSpacing: "-0.02em" }}>77%</div>
                  <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2, letterSpacing: "0.06em" }}>Skip a lawyer entirely</div>
                </div>
                <div>
                  <div style={{ fontFamily: "Newsreader", fontWeight: 700, fontSize: 28, color: "var(--ink)", letterSpacing: "-0.02em" }}>67%</div>
                  <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2, letterSpacing: "0.06em" }}>Cite cost as the #1 reason</div>
                </div>
                <div>
                  <div style={{ fontFamily: "Newsreader", fontWeight: 700, fontSize: 28, color: "var(--ink)", letterSpacing: "-0.02em" }}>64%</div>
                  <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2, letterSpacing: "0.06em" }}>Win when properly prepped</div>
                </div>
              </div>
            </div>
            {/* Cream certified-mail letter */}
            <div style={{ position: "relative", background: "#fff", border: "1px solid var(--hairline)", borderRadius: 6, padding: "40px 36px 28px", boxShadow: "0 24px 50px -28px rgba(31,27,22,0.32)", transform: "rotate(-0.6deg)" }}>
              <div style={{ position: "absolute", top: 18, right: 22, transform: "rotate(8deg)", border: "2px solid rgba(217,64,46,0.5)", borderRadius: 4, padding: "6px 10px", textAlign: "center" }}>
                <div style={{ fontSize: 9, letterSpacing: "0.18em", fontWeight: 700, color: "var(--accent)", textTransform: "uppercase" }}>Certified</div>
                <div style={{ fontSize: 9, color: "var(--muted)", fontFamily: "ui-monospace, monospace", marginTop: 2 }}>2026</div>
              </div>
              <div style={{ fontFamily: "Geist", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 14 }}>Sample demand letter</div>
              <div style={{ fontFamily: "Newsreader", fontSize: 13, lineHeight: 1.6, color: "var(--ink)", display: "flex", flexDirection: "column", gap: 10 }}>
                <div>April 21, 2026</div>
                <div><strong>Oakwood Properties LLC</strong></div>
                <div style={{ paddingBottom: 10, borderBottom: "1px solid var(--hairline)" }}><strong>Re:</strong> Demand for return of security deposit</div>
                <p style={{ margin: 0 }}>Pursuant to <strong>Cal. Civ. Code § 1950.5,</strong> you were required to return my $1,500 deposit within 21 days of move-out. That period has elapsed.</p>
                <p style={{ margin: 0 }}>I demand <strong>$4,500</strong> within fourteen (14) days, or I will file in Small Claims Court.</p>
                <div style={{ fontFamily: "Caveat", fontStyle: "italic", fontSize: 24, color: "var(--accent)", marginTop: 8 }}>Jordan A. Tenant</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VERSION C — Mission + glass stat trio */}
      <section style={{ padding: "64px 0", background: "#fff" }}>
        <div className="wrap">
          <span style={{ display: "inline-block", padding: "4px 10px", background: "rgba(217,64,46,0.10)", color: "var(--accent)", fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", borderRadius: 6, marginBottom: 14 }}>Version C · mission</span>
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 56, alignItems: "center" }}>
            <div>
              <span className="eyebrow" style={{ color: "var(--accent)" }}>Our mission</span>
              <h2 style={{ fontFamily: "Newsreader", fontSize: "clamp(32px, 3.4vw, 46px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.05, margin: "10px 0 16px" }}>
                Close the <em style={{ fontStyle: "italic", color: "var(--accent)" }}>preparation gap</em>.
              </h2>
              <p style={{ fontSize: 16.5, color: "var(--ink-2)", lineHeight: 1.6, marginBottom: 14, maxWidth: "56ch" }}>
                When self-represented filers come to small claims <strong style={{ color: "var(--ink)" }}>prepared</strong>, they win <strong style={{ color: "var(--accent)" }}>64% of the time</strong>. When they don&rsquo;t, that drops to <strong style={{ color: "var(--ink)" }}>31%</strong>. The difference isn&rsquo;t the law &mdash; it&rsquo;s the prep.
              </p>
              <p style={{ fontSize: 16.5, color: "var(--ink-2)", lineHeight: 1.6, marginBottom: 14, maxWidth: "56ch" }}>
                Small claims was designed to be navigable without a lawyer. Yet 99% of small-claims filers go solo and most show up under-prepared because the prep itself is the expensive part &mdash; the same statute research, demand-letter drafting, and county-by-county procedure that a paralegal would charge $1,500 to handle.
              </p>
              <p style={{ fontSize: 16.5, color: "var(--ink)", lineHeight: 1.6, fontWeight: 600, maxWidth: "52ch" }}>
                CivilCase is that prep, productized. So a $4,000 claim doesn&rsquo;t cost $5,000 to pursue.
              </p>
            </div>
            <div style={{ position: "relative", padding: 20 }}>
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 30% 20%, rgba(217,64,46,0.45), transparent 50%), radial-gradient(circle at 80% 80%, rgba(245,178,159,0.4), transparent 50%), linear-gradient(135deg, #fed8c1, #f3e8d6)", borderRadius: 18 }} aria-hidden />
              <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { eyebrow: "Win rate · prepared", value: "64%", sub: "vs. 31% when facing a lawyer unprepared", accent: true },
                  { eyebrow: "Cite cost as the barrier", value: "67%", sub: "of people who skipped legal help" },
                  { eyebrow: "Self-represented", value: "99%", sub: "of small-claims plaintiffs and defendants" },
                ].map((s, i) => (
                  <div key={s.eyebrow} style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(20px) saturate(140%)", border: "1px solid rgba(255,255,255,0.8)", borderRadius: 14, padding: "16px 20px", marginLeft: i === 1 ? 24 : 0, marginRight: i === 2 ? 24 : 0 }}>
                    <div style={{ fontFamily: "Geist", fontSize: 10.5, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700, color: "var(--accent)" }}>{s.eyebrow}</div>
                    <div style={{ fontFamily: "Newsreader", fontWeight: 700, fontSize: 36, color: s.accent ? "var(--accent)" : "var(--ink)", letterSpacing: "-0.02em", marginTop: 2 }}>{s.value}</div>
                    <div style={{ fontSize: 12, color: "var(--ink-2)", marginTop: 2 }}>{s.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM / SOLUTION */}
      <section className="ps-section">
        <div className="ps-paper-bg" aria-hidden />
        <div className="wrap">
          <div className="ps-stage">
            <div className="ps-handwritten-note ps-handwritten-note-1" aria-hidden>
              <span>2, B</span>
              <span>26 do</span>
              <span>nu de</span>
              <span>26 do</span>
              <span>uc do</span>
            </div>
            <div className="ps-handwritten-right" aria-hidden>
              <div className="ps-hw-line">
                Small claims.
                <br />
                Big results.
                <span className="ps-hw-underline" />
              </div>
              <div className="ps-hw-line ps-hw-line-sub">
                We help you
                <br />
                make it
                <br />
                visible.
              </div>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="ps-seal" src="/seal2.webp" alt="" aria-hidden />

          <div className="ps-grid">
            <div className="ps-col-card ps-col-light">
              <span className="ps-paperclip" aria-hidden>
                <svg viewBox="0 0 32 80" width="22" height="55" fill="none" stroke="#9ba1a8" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8c4 0 8 3 8 8v44c0 5-4 9-9 9s-9-4-9-9V14" />
                  <path d="M16 22c2 0 5 1 5 5v28c0 3-2 5-5 5s-5-2-5-5V18" />
                </svg>
              </span>
              <div className="ps-col-head">
                <h3 className="ps-col-eyebrow ps-col-eyebrow-red">Common pain points</h3>
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
              <img src="/civilcase-red-seal.webp" alt="CivilCase" width={200} height={228} />
            </div>

            <div className="ps-col-card ps-col-dark">
              <span className="ps-thumbtack" aria-hidden />
              <div className="ps-col-head">
                <h3 className="ps-col-eyebrow ps-col-eyebrow-light">How we solve it</h3>
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
        </div>
      </section>

      {/* WINNING / GETTING PAID */}
      <section className="winning" style={{ background: "#fff" }}>
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
            <div className="winning-solution-inner" style={{ background: "#263e2d", boxShadow: "0 22px 50px -28px rgba(38,62,45,0.5)" }}>
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

      {/* CTA BAND (above footer) */}
      <section className="home-cta-band-section">
        <div className="wrap">
          <div className="home-cta-band">
            <div className="home-cta-band-copy">
              <span className="home-cta-band-eyebrow">Ready when you are</span>
              <h2>
                Recover what&rsquo;s <em>actually owed.</em>
              </h2>
              <p>
                Start with a demand letter or check your case strength first. No
                lawyer, no subscription, no surprises.
              </p>
            </div>
            <div className="home-cta-band-actions">
              <a className="btn btn-accent btn-lg" href="/demand-letter">
                Start your case
              </a>
              <a className="home-cta-band-secondary" href="/case-score">
                Check case strength →
              </a>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}

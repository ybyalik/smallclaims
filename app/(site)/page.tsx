import type React from "react";
import Image from "next/image";
import HeroCta from "../../components/HeroCta";
import HeroCaseStrength from "../../components/HeroCaseStrength";
import { Landmark, User, Map, ShieldCheck, Users } from "lucide-react";
import CtaStepCard from "../../components/CtaStepCard";

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
  const props = { size: 22, strokeWidth: 1.6, "aria-hidden": true } as const;
  switch (name) {
    case "courthouse":
      return <Landmark {...props} />;
    case "person":
      return <User {...props} />;
    case "states":
      return <Map {...props} />;
    case "shield":
      return <ShieldCheck {...props} />;
    case "people":
      return <Users {...props} />;
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
                  <CheckIcon /> Used in all 50 states
                </li>
                <li>
                  <CheckIcon /> Court-ready documents
                </li>
              </ul>
              <div className="hero-ctas">
                <HeroCta href="/demand-letter" variant="green" icon="demand-letter">Start Your Case Now</HeroCta>
                <HeroCta href="/case-score" variant="cream" icon="case-score">Check My Case Strength</HeroCta>
              </div>
              <div className="hero-v2-social">
                <div className="hero-v2-avatars" aria-hidden>
                  <Image
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face"
                    alt=""
                    width={30}
                    height={30}
                    sizes="30px"
                  />
                  <Image
                    src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=80&h=80&fit=crop&crop=face"
                    alt=""
                    width={30}
                    height={30}
                    sizes="30px"
                  />
                  <Image
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face"
                    alt=""
                    width={30}
                    height={30}
                    sizes="30px"
                  />
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

      {/* VERSION A — Punchy / unfair-system framing + dark stats panel */}
      <section style={{ padding: "64px 0", background: "#fff" }}>
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 56, alignItems: "center" }}>
            <div>
              <span className="eyebrow" style={{ color: "var(--accent)" }}>Why we exist</span>
              <h2 style={{ fontFamily: "var(--font-newsreader)", fontSize: "clamp(32px, 3.4vw, 46px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.05, margin: "10px 0 16px" }}>
                <em style={{ fontStyle: "italic", color: "var(--accent)" }}>77%</em> of Americans with a real legal issue never hire a lawyer.
              </h2>
              <p style={{ fontSize: 16.5, color: "var(--ink-2)", lineHeight: 1.6, marginBottom: 14, maxWidth: "55ch" }}>
                Not because they&rsquo;re wrong. Because at <strong style={{ color: "var(--ink)" }}>$200&ndash;500 an hour</strong>, hiring counsel for a $4,000 dispute makes the math impossible. So they walk away.
              </p>
              <p style={{ fontSize: 16.5, color: "var(--ink-2)", lineHeight: 1.6, margin: 0, maxWidth: "55ch" }}>
                Landlords keep deposits. Contractors vanish with checks. Employers shave paychecks. Sellers ship junk and refuse refunds. The cost of fighting back is higher than the loss &mdash; until now.
              </p>
            </div>
            <JusticeGapCombo />
          </div>
        </div>
      </section>

      {/* PROBLEM / SOLUTION */}
      <section className="ps-section">
        <div className="ps-paper-bg" aria-hidden />
        <div className="wrap">
          <div style={{ marginBottom: 56, position: "relative", zIndex: 2 }}>
            <span className="eyebrow">Problem &amp; solution</span>
            <h2 style={{ fontFamily: "Newsreader, Georgia, serif", fontWeight: 700, fontSize: "clamp(34px, 4.5vw, 54px)", lineHeight: 1.04, letterSpacing: "-0.02em", color: "var(--ink)", margin: "10px 0 0" }}>
              Where filers get stuck, and <em style={{ fontStyle: "italic", color: "var(--accent)", fontWeight: 700 }}>how we fix it.</em>
            </h2>
          </div>
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
            <Image
              className="ps-seal"
              src="/seal2.webp"
              alt=""
              width={130}
              height={130}
              aria-hidden
            />

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
              <Image
                src="/cc-white-border.webp"
                alt="CivilCase"
                width={200}
                height={228}
              />
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
            <span className="eyebrow">Our services</span>
            <h2 style={{ marginTop: 10 }}>
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
                  <Image
                    src={`/icons/${c.icon}.webp`}
                    alt=""
                    width={110}
                    height={105}
                    sizes="110px"
                  />
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
            <div className="winning-solution-inner" style={{ backgroundColor: "#263e2d", backgroundImage: "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.07), transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(0,0,0,0.18), transparent 60%), url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' seed='4'/><feColorMatrix values='0 0 0 0 0.95  0 0 0 0 0.93  0 0 0 0 0.85  0 0 0 0.18 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")", boxShadow: "0 22px 50px -28px rgba(38,62,45,0.5), inset 0 0 80px rgba(0,0,0,0.22)" }}>
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
                    <Image
                      className="dpa-avatar"
                      src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=80&h=80&fit=crop&crop=face"
                      alt=""
                      width={32}
                      height={32}
                      sizes="32px"
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
              <Image
                src="/yury.webp"
                alt="Yury Byalik"
                width={320}
                height={320}
                sizes="(max-width: 720px) 240px, 320px"
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

    </>
  );
}

function JusticeGapCombo() {
  const BARS = [
    { label: "Skip lawyer", pct: 77, color: "var(--accent)", h: 130 },
    { label: "Cite cost", pct: 67, color: "#1f1b16", h: 113 },
    { label: "Win when prepped", pct: 64, color: "#5a7a45", h: 108 },
  ];
  return (
    <div style={{ position: "relative", display: "flex", justifyContent: "flex-start", alignItems: "flex-end", paddingTop: 16, paddingBottom: 28, minHeight: 480 }}>
      {/* Recovery-layers-style card with justice gap data — left, tilted left */}
      <div style={{ flexShrink: 0, transform: "rotate(-3deg)", transformOrigin: "bottom right", zIndex: 2, marginRight: -32 }}>
        <div style={{ width: 300, background: "#fff", border: "1px solid var(--hairline)", borderRadius: 18, padding: "22px 24px", boxShadow: "0 22px 44px -22px rgba(31,27,22,0.25)" }}>
          <div style={{ fontFamily: "var(--font-geist)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700, color: "var(--accent)", marginBottom: 4 }}>The justice gap</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 14, height: 180, margin: "20px 0 18px" }}>
            {BARS.map((b) => (
              <div key={b.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flex: 1, justifyContent: "flex-end" }}>
                <div style={{ fontFamily: "var(--font-newsreader)", fontWeight: 700, fontSize: 15, color: b.color }}>{b.pct}%</div>
                <div style={{ width: "100%", background: b.color, height: b.h, borderRadius: "8px 8px 0 0" }} />
                <div style={{ fontSize: 10, color: "var(--muted)", letterSpacing: "0.04em", textAlign: "center", lineHeight: 1.2 }}>{b.label}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { label: "Skip a lawyer entirely", value: "77%", color: "var(--accent)" },
              { label: "Cite cost as #1 reason", value: "67%", color: "#1f1b16" },
              { label: "Win when prepared", value: "64%", color: "#5a7a45" },
            ].map((l) => (
              <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12.5 }}>
                <span style={{ width: 10, height: 10, borderRadius: 2, background: l.color }} />
                <span style={{ flex: 1, color: "var(--ink-2)" }}>{l.label}</span>
                <strong style={{ color: "var(--ink)", fontFamily: "var(--font-newsreader)" }}>{l.value}</strong>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, paddingTop: 12, borderTop: "2px dashed rgba(217,64,46,0.4)", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, color: "var(--accent)" }}>Lawyer cost</span>
            <span style={{ fontFamily: "var(--font-newsreader)", fontWeight: 700, fontSize: 16, color: "var(--accent)" }}>$1,500&ndash;$5,000</span>
          </div>
        </div>
      </div>

      {/* Certificate — right, tilted right */}
      <div style={{ flexShrink: 0, transform: "rotate(3deg)", transformOrigin: "bottom left", zIndex: 1, marginBottom: 18 }}>
        <div style={{ position: "relative", width: 290, background: "#fefcf3", border: "8px double var(--accent)", borderRadius: 4, padding: "24px 20px", textAlign: "center", fontFamily: "Newsreader, Georgia, serif", boxShadow: "0 22px 50px -28px rgba(31,27,22,0.32)" }}>
          <div style={{ position: "absolute", bottom: -22, right: -22, width: 80, height: 80 }}>
            <svg viewBox="0 0 100 100" width="80" height="80" style={{ display: "block" }}>
              <defs>
                <path id="circ-jg" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
              </defs>
              <text fill="var(--accent)" fontSize="9" fontFamily="var(--font-geist)" letterSpacing="3" fontWeight="700">
                <textPath href="#circ-jg">CERTIFIED · SMALL CLAIMS · CIVIL · 2026 ·</textPath>
              </text>
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", color: "var(--accent)" }}>
              <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M12 2l3 6 6 1-4.5 4 1 6-5.5-3-5.5 3 1-6L3 9l6-1z" />
              </svg>
            </div>
          </div>

          <div style={{ fontSize: 10, letterSpacing: "0.32em", color: "var(--accent)", fontWeight: 700, textTransform: "uppercase" }}>State of California</div>
          <div style={{ fontFamily: "var(--font-caveat)", fontStyle: "italic", fontSize: 24, color: "var(--ink)", marginTop: 6 }}>Certificate of</div>
          <div style={{ fontWeight: 800, fontSize: 30, color: "var(--ink)", letterSpacing: "-0.02em", lineHeight: 1, marginTop: 2 }}>Judgment</div>
          <div style={{ width: 64, height: 1, background: "var(--ink)", margin: "14px auto" }} />
          <div style={{ fontStyle: "italic", color: "var(--ink-2)", fontSize: 13 }}>Awarded in favor of</div>
          <div style={{ fontFamily: "var(--font-caveat)", fontSize: 22, color: "var(--ink)", marginTop: 4 }}>Tenant, J.</div>
          <div style={{ marginTop: 10 }}>
            <div style={{ fontSize: 10.5, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700, color: "var(--muted)" }}>Total awarded</div>
            <div style={{ fontWeight: 800, fontSize: 28, color: "var(--accent)", letterSpacing: "-0.02em", marginTop: 2 }}>$4,500</div>
          </div>
          <div style={{ marginTop: 10, fontSize: 9.5, color: "var(--muted)", letterSpacing: "0.16em", textTransform: "uppercase" }}>Case 26-CV-04217 · May 28, 2026</div>
        </div>
      </div>
    </div>
  );
}

import ProcessFlow from "./ProcessFlow";

const faqs = [
  {
    q: "Is CivilCase a law firm?",
    a: "No. CivilCase is not a law firm and we don't provide legal advice. We're a self-help platform that gives you tools, court-specific information, and step-by-step guidance for pursuing small civil claims. If your case truly needs representation, we'll tell you.",
    open: true,
  },
  {
    q: "Do I actually need a lawyer?",
    a: "For most small claims (typically $5,000–$10,000 or less, depending on your state), you do not need a lawyer — and in some states, lawyers aren't even allowed in small claims court. CivilCase is designed for exactly these cases.",
  },
  {
    q: "Does this work in my state?",
    a: "Yes. CivilCase supports small claims and consumer disputes in all 50 states and DC. Filing limits, court rules, and required forms vary — we handle the localization for you.",
  },
  {
    q: "What does it cost?",
    a: "A demand letter starts at $39. Filing assistance is $79 per case, including court-specific forms and certified mail. You only pay the actual court filing fee directly to the court. No subscriptions, no contingency fees.",
  },
  {
    q: "What if I lose?",
    a: "Most cases settle before a hearing — but if you go to court and lose, you're out the filing fee and your time. CivilCase's case score is designed to flag weak cases before you spend money, so you can decide whether to proceed.",
  },
  {
    q: "How do I actually collect after I win?",
    a: "Winning a judgment is only half the battle. CivilCase walks you through the post-judgment options available in your state: wage garnishment, bank levy, property liens, or negotiated settlement.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "CivilCase",
      url: "https://smallclaims.vercel.app",
      description:
        "An operating system for civil disputes. Built for real people, not law firms.",
    },
    {
      "@type": "WebSite",
      url: "https://smallclaims.vercel.app",
      name: "CivilCase",
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
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
      <section className="hero">
        <div className="wrap hero-inner">
          <div className="hero-grid">
            <div className="hero-copy">
              <h1>
                Get your money back, <em>without</em> a lawyer.
              </h1>
              <p>
                CivilCase surfaces what matters, drafts the demand, files the
                claim — and keeps you moving with intention.
              </p>
              <div className="hero-ctas">
                <a className="btn btn-dark" href="#">
                  Check Your Case
                </a>
                <a className="btn btn-cream" href="#">
                  Send a Demand Letter
                </a>
              </div>
              <div className="hero-logos">
                <div className="lab">Trusted in all 50 states</div>
                <div className="logo-row">
                  <span style={{ fontFamily: "Newsreader", letterSpacing: "0.06em" }}>
                    BAINCROFT<sup>•</sup>
                  </span>
                  <span style={{ fontWeight: 700 }}>⬢ Inertial</span>
                  <span style={{ fontWeight: 700, letterSpacing: "0.04em" }}>
                    BAILEY+KLEIN
                  </span>
                </div>
              </div>
            </div>

            <div className="hero-card">
              <div>
                <div className="hd">Recovery Summary</div>
                <div className="big">$2,450</div>
                <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>
                  avg. case · last 30 days
                </div>
              </div>
              <div>
                <div className="bars">
                  <span style={{ height: "30%" }}></span>
                  <span style={{ height: "55%" }}></span>
                  <span style={{ height: "70%" }}></span>
                  <span style={{ height: "90%" }}></span>
                </div>
                <div className="bars-row">
                  <b>Apr</b>
                  <b>May</b>
                  <b>Jun</b>
                  <b>Jul</b>
                </div>
              </div>
            </div>

            <div className="hero-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=900&h=1100&fit=crop"
                alt="Person reviewing case on laptop"
              />
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-section">
        <div className="marquee-bar">
          <div className="marquee-track">
            {[0, 1].map((dup) => (
              <span key={dup} style={{ display: "contents" }}>
                <span>&ldquo;There is simply no substitute for CivilCase.&rdquo;</span>
                <span>•</span>
                <span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face"
                    alt=""
                  />
                  &ldquo;Replaced 3 lawyers we couldn&rsquo;t afford.&rdquo;
                </span>
                <span>•</span>
                <span>
                  <em>100% Real</em> Reviews
                </span>
                <span>•</span>
                <span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face"
                    alt=""
                  />
                  &ldquo;Got my deposit back in 11 days.&rdquo;
                </span>
                <span>•</span>
                <span>
                  <em>97% Recommend</em>
                </span>
                <span>•</span>
                <span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=80&h=80&fit=crop&crop=face"
                    alt=""
                  />
                  &ldquo;Got back $4,200 the contractor owed us.&rdquo;
                </span>
                <span>•</span>
                <span>
                  <em>$18M+</em> recovered
                </span>
                <span>•</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* PROBLEM / SOLUTION */}
      <section>
        <div className="wrap">
          <div className="sec-head">
            <h2>
              Most small disputes are <em>visibility</em> problems.
            </h2>
          </div>
          <div className="ps-card">
            <div className="ps-grid">
              <div className="ps-col left">
                <h3>Common pain points</h3>
                <div className="ps-list">
                  <div className="ps-item">
                    <div className="ps-bullet">1</div>
                    <div>
                      <div className="t">Don&rsquo;t know if you have a case</div>
                      <div className="d">
                        No clear way to assess strength before spending money.
                      </div>
                    </div>
                  </div>
                  <div className="ps-item">
                    <div className="ps-bullet">2</div>
                    <div>
                      <div className="t">Court rules are different everywhere</div>
                      <div className="d">
                        Forms, fees, and deadlines vary by county and state.
                      </div>
                    </div>
                  </div>
                  <div className="ps-item">
                    <div className="ps-bullet">3</div>
                    <div>
                      <div className="t">Even winning doesn&rsquo;t mean getting paid</div>
                      <div className="d">
                        A judgment is a piece of paper. Collection is a separate fight.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="ps-orb">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="m12 3 3.5 6.5 7 1-5 5 1 7-6.5-3.5-6.5 3.5 1-7-5-5 7-1z" />
                </svg>
                CivilCase
              </div>

              <div className="ps-col right">
                <h3>How we solve it</h3>
                <div className="ps-list">
                  <div className="ps-item">
                    <div className="ps-bullet">
                      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <path d="M9 12l2 2 4-4" />
                        <circle cx="12" cy="12" r="9" />
                      </svg>
                    </div>
                    <div>
                      <div className="t">Case score in minutes</div>
                      <div className="d">
                        Tell us what happened — get an honest read on whether to pursue.
                      </div>
                    </div>
                  </div>
                  <div className="ps-item">
                    <div className="ps-bullet">
                      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <path d="M3 12h18M12 3v18" />
                      </svg>
                    </div>
                    <div>
                      <div className="t">Court-specific guidance</div>
                      <div className="d">
                        Localized for your county. Forms, fees, filing rules built in.
                      </div>
                    </div>
                  </div>
                  <div className="ps-item">
                    <div className="ps-bullet">
                      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <path d="M12 2v20M5 9l7-7 7 7" />
                      </svg>
                    </div>
                    <div>
                      <div className="t">Collection that closes</div>
                      <div className="d">
                        Garnishment, levy, settlement — we walk you through every option.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="ps-foot">
              <p>
                When tools are disconnected, you lose time, miss deadlines, and leave
                money on the table.
              </p>
              <a className="btn btn-dark" href="#">
                Talk to a case strategist ›
              </a>
            </div>
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

      {/* WHY */}
      <section
        id="why"
        style={{ background: "#F5EFE3", margin: "0 24px", borderRadius: 24 }}
      >
        <div className="wrap">
          <div className="dh-grid">
            <div className="dh-copy">
              <div className="eyebrow">Why CivilCase</div>
              <h2 style={{ marginTop: 14 }}>
                What you need, <em>before</em> you know you need it.
              </h2>
              <p>
                CivilCase evolves with your case — pulling deadlines forward, surfacing
                the next move, and keeping you a step ahead of the other side.
              </p>
              <div className="dh-feats">
                <div className="dh-feat">
                  <svg
                    className="ico"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    <path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z" />
                  </svg>
                  <h4>Smart Analytics</h4>
                  <p>
                    Learns your case patterns and pushes the right next step in real
                    time. No retraining, no friction.
                  </p>
                </div>
                <div className="dh-feat">
                  <svg
                    className="ico"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <h4>Court-Specific Insight</h4>
                  <p>
                    No more digging through statutes. CivilCase surfaces the rule you
                    need, the moment you need it.
                  </p>
                </div>
              </div>
            </div>

            <div className="dh-quote">
              <div className="q">
                &ldquo;We now rely on CivilCase for <em>all</em> our consumer disputes.&rdquo;
              </div>
              <div>
                <a className="btn btn-dark btn-sm" href="#">
                  Request a demo
                </a>
              </div>
            </div>

            <div>
              <div className="dh-photo" style={{ aspectRatio: 0.72 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=900&fit=crop"
                  alt="Couple reviewing dispute"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DASHBOARD */}
      <section>
        <div className="wrap">
          <div className="sec-head" style={{ marginBottom: 36 }}>
            <span className="eyebrow">Inside the product</span>
            <h2>
              Every case, on <em>one page.</em>
            </h2>
            <p>
              Track strength, status, and next steps without rifling through a single
              email thread.
            </p>
          </div>
          <div className="dash-shell">
            <div className="dash-card">
              <div className="row">
                <span>Case #CC-2841</span>
                <span className="pill-act">Action recommended</span>
              </div>
              <div>
                <div className="score">
                  <em>78</em>
                  <sup>/100</sup>
                </div>
                <div className="score-label">Case strength</div>
                <div className="dash-bar"></div>
                <div className="dash-meta">
                  <div>
                    <div className="lab">Claim</div>
                    <div className="val">Security deposit</div>
                  </div>
                  <div>
                    <div className="lab">Amount</div>
                    <div className="val">$2,450.00</div>
                  </div>
                  <div>
                    <div className="lab">Jurisdiction</div>
                    <div className="val">Travis County, TX</div>
                  </div>
                  <div>
                    <div className="lab">Filing fee</div>
                    <div className="val">$54.00</div>
                  </div>
                </div>
              </div>
              <div className="dash-cta">
                <span>Send demand letter</span>
                <span>→</span>
              </div>
            </div>
            <div className="dash-plan">
              <div className="dash-plan-head">
                <h3>Your case plan</h3>
                <div className="meta">Step 2 of 4 · ~14 days</div>
              </div>
              <div className="step done">
                <div className="ico">✓</div>
                <div className="body">
                  <div className="t">Case Review</div>
                  <div className="s">Strength, damages, and jurisdiction confirmed</div>
                </div>
                <div className="stat">Complete</div>
              </div>
              <div className="step active">
                <div className="ico">2</div>
                <div className="body">
                  <div className="t">Demand Letter</div>
                  <div className="s">Draft ready — review and send certified mail</div>
                </div>
                <div className="stat">In progress</div>
              </div>
              <div className="step">
                <div className="ico">3</div>
                <div className="body">
                  <div className="t">File Your Claim</div>
                  <div className="s">Travis County small claims, fee $54</div>
                </div>
                <div className="stat">Up next</div>
              </div>
              <div className="step locked">
                <div className="ico">4</div>
                <div className="body">
                  <div className="t">Win &amp; Collect</div>
                  <div className="s">Judgment enforcement, wage garnishment</div>
                </div>
                <div className="stat">Locked</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU CAN DO */}
      <section id="do">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">What you can do</span>
            <h2>
              Real disputes. <em>Real outcomes.</em>
            </h2>
            <p>
              An action engine, not a form library. Pick what you&rsquo;re dealing with —
              we&rsquo;ll handle the rest.
            </p>
          </div>

          <div className="bento">
            <div className="tile dark">
              <div>
                <span className="eyebrow" style={{ color: "#A8A095" }}>
                  Most common · 21 days
                </span>
                <h3 style={{ marginTop: 14 }}>Get your security deposit back</h3>
              </div>
              <div>
                <span className="reveal">+$1,840 avg recovered</span>
                <a className="tile-cta" style={{ marginTop: 14 }} href="#">
                  Start a deposit case ↗
                </a>
              </div>
            </div>

            <div className="tile photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="main"
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&h=900&fit=crop"
                alt="Receipt and calculator"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="alt"
                src="https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=900&h=900&fit=crop"
                alt="Documents and pen"
              />
            </div>

            <div className="tile">
              <div>
                <div className="num">
                  $7K<small>avg unpaid invoice recovered</small>
                </div>
              </div>
              <div>
                <h3>Recover unpaid invoices</h3>
                <a className="tile-cta" href="#">
                  Start invoice case ↗
                </a>
              </div>
            </div>

            <div className="tile">
              <div>
                <span className="eyebrow">Home repairs · Renos</span>
                <h3 style={{ marginTop: 14 }}>
                  Resolve <em>contractor</em> disputes
                </h3>
              </div>
              <a className="tile-cta" href="#">
                Start contractor case ↗
              </a>
            </div>

            <div className="tile">
              <div>
                <span className="eyebrow">Refunds · Returns</span>
                <h3 style={{ marginTop: 14 }}>Handle refund issues</h3>
              </div>
              <a className="tile-cta" href="#">
                Start refund case ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section>
        <div className="wrap">
          <div className="stats-grid">
            <div>
              <span className="eyebrow">By the numbers</span>
              <h2 style={{ marginTop: 14 }}>
                Recovery at <em>operational scale.</em>
              </h2>
              <p>
                These numbers reflect how everyday people use CivilCase to track claims,
                prevent filing mistakes, and recover their money — without manual work.
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

      {/* RECEIPTS */}
      <section style={{ paddingTop: 30 }}>
        <div className="wrap">
          <div className="receipts-head">
            <h2>
              The <em>receipts.</em>
            </h2>
            <p>
              Every case below is real. Names changed where requested. Amounts are net
              of fees, recovered through CivilCase between Jan and Mar.
            </p>
          </div>

          <div className="receipts-grid-row">
            <div className="receipt r-1" style={{ transform: "rotate(-1.6deg)" }}>
              <div className="top">
                <span className="case-id">CC-1042</span>
                <span className="tag">Deposit</span>
              </div>
              <div className="amount">
                $2,800<span className="lbl">Recovered in 12 days</span>
              </div>
              <div className="quote">
                &ldquo;Landlord ghosted me for six weeks. CivilCase had a demand letter on his
                desk in 48 hours.&rdquo;
              </div>
              <div className="who">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face"
                  alt=""
                />
                <div>
                  <div className="name">Maya Reyes</div>
                  <div className="meta">Brooklyn, NY</div>
                </div>
              </div>
              <div className="footer">
                <span>Filed 2/14</span>
                <strong>Settled 2/26</strong>
              </div>
            </div>

            <div
              className="receipt r-2 r-mark"
              style={{ transform: "rotate(0.8deg)" }}
            >
              <div className="top">
                <span className="case-id" style={{ color: "#A8A095" }}>
                  CC-0987
                </span>
                <span className="tag">Contractor</span>
              </div>
              <div className="amount">
                $4,200
                <span className="lbl" style={{ color: "#A8A095" }}>
                  Recovered in 11 days
                </span>
              </div>
              <div className="quote">
                &ldquo;I&rsquo;d already paid two lawyers $1,800 to get nowhere. CivilCase
                finished it for $54 and a stamp.&rdquo;
              </div>
              <div className="who">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=120&h=120&fit=crop&crop=face"
                  alt=""
                />
                <div>
                  <div className="name">Daniel Park</div>
                  <div className="meta" style={{ color: "#A8A095" }}>
                    Austin, TX
                  </div>
                </div>
              </div>
              <div className="footer" style={{ color: "#A8A095" }}>
                <span>Filed 1/22</span>
                <strong>Settled 2/02</strong>
              </div>
            </div>

            <div
              className="receipt r-3 r-photo"
              style={{ transform: "rotate(-0.6deg)", minHeight: 340 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=900&fit=crop"
                alt=""
              />
              <div className="overlay">
                <div className="a">$1,150</div>
                <div className="q">
                  Wedding photographer no-show. Refunded in full + filing fee.
                </div>
              </div>
            </div>
          </div>

          <div className="receipts-grid-row">
            <div
              className="receipt r-4 r-photo"
              style={{ transform: "rotate(1.2deg)", minHeight: 280 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=900&fit=crop"
                alt=""
              />
              <div className="overlay">
                <div className="a">$3,400</div>
                <div className="q">Auto repair overcharge. Settled before court date.</div>
              </div>
            </div>

            <div className="receipt r-5" style={{ transform: "rotate(-0.4deg)" }}>
              <div className="top">
                <span className="case-id">CC-1188</span>
                <span className="tag">Service refund</span>
              </div>
              <div className="amount">
                $890<span className="lbl">Recovered in 6 days</span>
              </div>
              <div className="quote">
                &ldquo;It felt fair. Not &lsquo;we&rsquo;ll see you in court&rsquo; — fair. Like
                the system actually heard me.&rdquo;
              </div>
              <div className="who">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop&crop=face"
                  alt=""
                />
                <div>
                  <div className="name">Lena Okafor</div>
                  <div className="meta">Chicago, IL</div>
                </div>
              </div>
              <div className="footer">
                <span>Filed 3/02</span>
                <strong>Settled 3/08</strong>
              </div>
            </div>

            <div className="receipt r-6" style={{ transform: "rotate(0.6deg)" }}>
              <div className="top">
                <span className="case-id">CC-1311</span>
                <span className="tag">Wage dispute</span>
              </div>
              <div className="amount">
                $6,750<span className="lbl">Final paycheck + penalty</span>
              </div>
              <div className="quote">
                &ldquo;My ex-employer thought ignoring me would be cheaper than paying me.
                Turns out: not.&rdquo;
              </div>
              <div className="who">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=120&h=120&fit=crop&crop=face"
                  alt=""
                />
                <div>
                  <div className="name">Marcus Webb</div>
                  <div className="meta">Phoenix, AZ</div>
                </div>
              </div>
              <div className="footer">
                <span>Filed 1/04</span>
                <strong>Settled 1/29</strong>
              </div>
            </div>
          </div>

          <div className="receipts-foot">
            <div>
              Cases shown are a small sample.{" "}
              <strong>$18.4M recovered to date.</strong>
            </div>
            <div>Verified by court filings · Updated weekly</div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq">
        <div className="wrap">
          <div className="faq-wrap">
            <div className="faq-side">
              <span className="eyebrow">FAQ</span>
              <h2>
                Common <em>questions.</em>
              </h2>
              <p>
                The answers most people are looking for before they pursue a small claim.
                Don&rsquo;t see yours?{" "}
                <a
                  href="#"
                  style={{ color: "var(--accent)", textDecoration: "underline" }}
                >
                  Ask us directly.
                </a>
              </p>
            </div>
            <div>
              {faqs.map((f) => (
                <details key={f.q} className="qa" open={f.open}>
                  <summary>{f.q}</summary>
                  <div className="a">{f.a}</div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ paddingBottom: 40 }}>
        <div className="wrap">
          <div className="final">
            <span className="eyebrow">Get clarity in minutes</span>
            <h2>
              Is your case <em>worth pursuing?</em>
            </h2>
            <p>
              Three minutes. Six questions. One honest answer. No signup required to see
              your case score.
            </p>
            <div className="ctas">
              <a className="btn btn-cream" href="#">
                Check Your Case →
              </a>
              <a
                className="btn"
                style={{
                  background: "transparent",
                  color: "#FEF9F1",
                  border: "1px solid rgba(255,255,255,.2)",
                }}
                href="#"
              >
                Talk to a human
              </a>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}

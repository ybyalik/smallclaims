import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About CivilCase",
  description:
    "CivilCase is a self-help legal-tech tool for the 87% of disputes that never see a lawyer. We help non-lawyers send demand letters, file in small claims court, and collect on judgments.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About CivilCase",
    description: "Self-help legal tools for the 87% of disputes that never see a lawyer.",
    url: "/about",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About CivilCase",
  url: "https://civilcase.com/about",
  description:
    "CivilCase is a self-help legal-tech tool. Not a law firm. We help non-lawyers handle small claims and civil disputes.",
  mainEntity: {
    "@type": "Organization",
    name: "CivilCase",
    url: "https://civilcase.com",
    description: "Resolve small claims and civil disputes, from demand to resolution.",
  },
};

const useCases = [
  {
    name: "Maya R.",
    role: "Renter, Brooklyn NY",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face",
    amount: "$2,800",
    desc: "Recovered a security deposit her landlord ghosted on for six weeks.",
  },
  {
    name: "Daniel P.",
    role: "Freelancer, Austin TX",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=120&h=120&fit=crop&crop=face",
    amount: "$4,200",
    desc: "Closed three months of unpaid invoices from a client who stopped responding.",
  },
  {
    name: "Lena O.",
    role: "Small biz, Chicago IL",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop&crop=face",
    amount: "$890",
    desc: "Got a refund from a vendor who delivered a broken service in 6 days.",
  },
  {
    name: "Marcus W.",
    role: "Worker, Phoenix AZ",
    avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=120&h=120&fit=crop&crop=face",
    amount: "$6,750",
    desc: "Recovered final wages plus penalty after his ex-employer ignored him.",
  },
  {
    name: "Sara K.",
    role: "Driver, Denver CO",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=face",
    amount: "$3,400",
    desc: "Won an auto-repair overcharge case before her court date even arrived.",
  },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO */}
      <section className="tp-hero about-hero">
        <div className="wrap-wide">
          <div className="about-hero-grid">
            <div>
              <span className="eyebrow">About CivilCase</span>
              <h1 style={{ marginTop: 18 }}>
                Tools for the disputes that never <em>see a lawyer</em>.
              </h1>
              <p className="tp-lede">
                Most civil disputes are too small to hire an attorney and too messy to walk
                away from. CivilCase exists for those cases. We help you write the demand
                letter, file in the right court, serve the right paperwork, and collect on
                the judgment. Without paying $300 an hour to learn what a JP Court is.
              </p>
              <div className="hero-ctas" style={{ marginTop: 28 }}>
                <Link className="btn btn-dark" href="/demand-letter">
                  Send a Demand Letter
                </Link>
                <Link className="btn btn-cream" href="/small-claims">
                  Browse State Guides
                </Link>
              </div>
            </div>
            <div className="about-stat-card">
              <div>
                <div className="label">Built for</div>
                <div className="big">
                  <em>87%</em>
                </div>
                <div className="sub" style={{ marginTop: 12 }}>
                  of disputes never reach a lawyer because the dollar amount can&rsquo;t
                  justify $300 / hour.
                </div>
              </div>
              <div className="sub" style={{ fontStyle: "italic" }}>
                CivilCase is built for that gap.
              </div>
            </div>
            <div className="about-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=700&h=900&fit=crop"
                alt="Person reviewing documents on laptop"
              />
            </div>
          </div>
        </div>
      </section>

      {/* RECEIPTS / WHO IT'S FOR */}
      <section className="about-receipts">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Who we built this for</span>
            <h2>
              Real people. <em>Real recoveries.</em>
            </h2>
            <p>
              Not corporate plaintiffs or big-firm cases. The everyday disputes that get
              dismissed as &ldquo;not worth it&rdquo; right up until they are.
            </p>
          </div>
          <div className="about-receipts-grid">
            {useCases.map((u) => (
              <div key={u.name} className="about-receipt">
                <div className="who">
                  <div className="avatar">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={u.avatar} alt="" />
                  </div>
                  <div>
                    <div className="name">{u.name}</div>
                    <div className="role">{u.role}</div>
                  </div>
                </div>
                <div className="amount">{u.amount}</div>
                <div className="desc">{u.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE ARE / AREN'T */}
      <section className="about-philosophy">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">What CivilCase is</span>
            <h2>
              Self-help <em>that actually helps</em>.
            </h2>
          </div>
          <div className="ps-card" style={{ background: "var(--card)" }}>
            <div className="ps-grid">
              <div>
                <h3>What we are</h3>
                <div className="point">
                  <div className="point-tick">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12">
                      <path d="M5 12l4 4 10-10" />
                    </svg>
                  </div>
                  <div className="point-text">
                    <strong>Self-help legal-technology software.</strong> A guided workflow
                    that turns 50 states&rsquo; small-claims rules into something a non-lawyer
                    can follow.
                  </div>
                </div>
                <div className="point">
                  <div className="point-tick">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12">
                      <path d="M5 12l4 4 10-10" />
                    </svg>
                  </div>
                  <div className="point-text">
                    <strong>Cited to primary sources.</strong> Every dollar amount, deadline,
                    and form number is backed by a state statute or court rule. When the law
                    changes, the guide changes.
                  </div>
                </div>
                <div className="point">
                  <div className="point-tick">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12">
                      <path d="M5 12l4 4 10-10" />
                    </svg>
                  </div>
                  <div className="point-text">
                    <strong>Honest about limits.</strong> If your case actually needs a
                    lawyer, we will tell you. No upsell, no false confidence.
                  </div>
                </div>
              </div>

              <div className="ps-orb" style={{ width: 120 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/civilcase-shield.webp"
                  alt="CivilCase"
                  width={140}
                  height={160}
                  style={{ animation: "floatY 6s ease-in-out infinite" }}
                />
              </div>

              <div>
                <h3>What we are not</h3>
                <div className="point">
                  <div className="point-tick x">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="11" height="11">
                      <path d="M6 6l12 12M18 6l-12 12" />
                    </svg>
                  </div>
                  <div className="point-text">
                    <strong>Not a law firm.</strong> Using CivilCase does not create an
                    attorney-client relationship. Nothing here is privileged.
                  </div>
                </div>
                <div className="point">
                  <div className="point-tick x">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="11" height="11">
                      <path d="M6 6l12 12M18 6l-12 12" />
                    </svg>
                  </div>
                  <div className="point-text">
                    <strong>Not legal advice for your specific facts.</strong> We publish
                    general legal information. A licensed attorney&rsquo;s judgment about
                    YOUR case is a different thing.
                  </div>
                </div>
                <div className="point">
                  <div className="point-tick x">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="11" height="11">
                      <path d="M6 6l12 12M18 6l-12 12" />
                    </svg>
                  </div>
                  <div className="point-text">
                    <strong>Not a guarantee of outcome.</strong> Whether your case wins
                    depends on your facts, your evidence, and your judge — none of which
                    we control.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BY THE NUMBERS */}
      <section className="about-numbers">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">By the numbers</span>
            <h2>
              How CivilCase actually <em>works.</em>
            </h2>
          </div>
          <div className="about-numbers-grid">
            <div className="about-number">
              <div className="num">
                <em>50</em>
              </div>
              <div className="lab">States covered</div>
              <div className="det">A guide for every U.S. state and DC.</div>
            </div>
            <div className="about-number">
              <div className="num">19</div>
              <div className="lab">Sections per guide</div>
              <div className="det">From filing to forms to collection.</div>
            </div>
            <div className="about-number">
              <div className="num">
                <em>2x</em>
              </div>
              <div className="lab">Reviews per year</div>
              <div className="det">Plus event-driven updates when laws change.</div>
            </div>
            <div className="about-number">
              <div className="num">$0</div>
              <div className="lab">Subscriptions</div>
              <div className="det">No recurring fees. Pay per case, never monthly.</div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="about-pricing">
        <div className="wrap">
          <div className="about-pricing-card">
            <div style={{ position: "relative" }}>
              <span
                className="eyebrow"
                style={{ color: "rgba(254,249,241,0.65)", marginBottom: 18, display: "inline-block" }}
              >
                How we make money
              </span>
              <h2>
                One price. <em>Per case.</em>
              </h2>
              <p>
                A professional, state-specific demand letter generated from your dispute
                facts and mailed-ready as a PDF. No subscription, no contingency fee, no
                hidden costs. State guides are free, forever.
              </p>
              <Link className="btn btn-cream" href="/demand-letter">
                Send a Demand Letter
              </Link>
            </div>
            <div style={{ textAlign: "right", position: "relative" }}>
              <div className="price">
                $<em>39</em>
              </div>
              <div className="price-sub">Demand letter, PDF, all 50 states</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="tp-cta">
        <div className="wrap-narrow">
          <div className="tp-cta-card">
            <h2>
              Ready to <em>get started</em>?
            </h2>
            <p>
              Three minutes of intake, a draft you can edit, and we hand you a PDF you can
              mail certified the same day.
            </p>
            <div className="hero-ctas">
              <Link className="btn btn-dark" href="/demand-letter" style={{ background: "#fef9f1", color: "var(--ink)" }}>
                Get Started
              </Link>
              <Link className="btn btn-cream" href="/small-claims">
                Browse State Guides
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

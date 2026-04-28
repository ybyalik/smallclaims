import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Editorial Policy",
  description:
    "How CivilCase researches, writes, and updates its state guides. Primary-source citations, cadenced updates, and the line between information and legal advice.",
  alternates: { canonical: "/editorial-policy" },
  openGraph: {
    title: "Editorial Policy — CivilCase",
    description:
      "How we research, write, and keep state-by-state small-claims content current.",
    url: "/editorial-policy",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Editorial Policy",
  url: "https://civilcase.com/editorial-policy",
  description:
    "Editorial standards for CivilCase: primary sources, citation, attribution, and the difference between legal information and legal advice.",
  publisher: { "@type": "Organization", name: "CivilCase", url: "https://civilcase.com" },
  inLanguage: "en-US",
};

export default function EditorialPolicyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO */}
      <section className="tp-hero ep-hero">
        <div className="wrap-wide">
          <div className="ep-hero-grid">
            <div>
              <span className="eyebrow">Editorial Policy</span>
              <h1 style={{ marginTop: 18 }}>
                Citations over <em>opinions</em>.
              </h1>
              <p className="tp-lede">
                Every dollar amount, deadline, and form number on this site is cited to a
                primary source. When the law changes, our guides change. Here&rsquo;s how
                that works.
              </p>
              <div className="ep-stat">
                <div className="ep-stat-card">
                  <div className="num">
                    <em>100%</em>
                  </div>
                  <div className="lab">Primary-source citation</div>
                </div>
                <div className="ep-stat-card">
                  <div className="num">2x</div>
                  <div className="lab">Reviews per year</div>
                </div>
                <div className="ep-stat-card">
                  <div className="num">≤7d</div>
                  <div className="lab">Correction turnaround</div>
                </div>
                <div className="ep-stat-card">
                  <div className="num">
                    <em>0</em>
                  </div>
                  <div className="lab">Law-firm marketing pages cited</div>
                </div>
              </div>
            </div>
            <div className="about-photo" style={{ aspectRatio: "4/5" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=700&h=900&fit=crop"
                alt="Library of legal books and statute volumes"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SOURCE PRIORITY PYRAMID */}
      <section className="ep-pyramid-wrap">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Sources we use, ranked</span>
            <h2>
              Primary sources <em>only.</em>
            </h2>
            <p>
              We cite the law where the law lives. Higher tiers are preferred where
              available; lower tiers only when an authoritative interpretation is needed.
            </p>
          </div>
          <div className="ep-pyramid">
            <div className="ep-tier">
              <span className="rank">01</span>
              <div>
                <h4>State statutes</h4>
                <p>The actual law as enacted by each state legislature. Cited inline (e.g., Cal. Code Civ. Proc. § 116.220).</p>
              </div>
              <span className="tag">Highest</span>
            </div>
            <div className="ep-tier">
              <span className="rank">02</span>
              <div>
                <h4>Court rules</h4>
                <p>Procedural rules adopted by the state judiciary (e.g., Texas Rules of Civil Procedure).</p>
              </div>
              <span className="tag">Procedural</span>
            </div>
            <div className="ep-tier">
              <span className="rank">03</span>
              <div>
                <h4>Judicial-branch publications</h4>
                <p>Official court self-help centers, judicial-council guides, and clerk-issued instructions.</p>
              </div>
              <span className="tag">Practical</span>
            </div>
            <div className="ep-tier">
              <span className="rank">04</span>
              <div>
                <h4>State-specific case law</h4>
                <p>Used only when a published opinion materially changes how a procedural rule is applied.</p>
              </div>
              <span className="tag">Interpretive</span>
            </div>
          </div>
        </div>
      </section>

      {/* HOW A GUIDE GETS WRITTEN */}
      <section className="ep-process">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">How a guide gets written</span>
            <h2>
              Four passes. <em>Two humans.</em>
            </h2>
            <p>
              Research is AI-assisted, verification is not. Every cited fact has been
              confirmed against a primary source by a human before publication.
            </p>
          </div>
          <div className="ep-process-flow">
            <div className="ep-step">
              <div className="num">1</div>
              <h4>Source discovery</h4>
              <p>An AI model with web-search access pulls every authoritative URL for the state — statutes, court rules, judicial-branch pages, county portals.</p>
            </div>
            <div className="ep-step">
              <div className="num">2</div>
              <h4>Evidence extraction</h4>
              <p>A second AI pass reads only those URLs and produces a structured JSON pack with statute citations, fee tiers, deadlines, and form numbers.</p>
            </div>
            <div className="ep-step">
              <div className="num">3</div>
              <h4>Editorial review</h4>
              <p>A human verifies each cited number against the source, removes any unsourced claim, and rewrites for plain English.</p>
            </div>
            <div className="ep-step">
              <div className="num">4</div>
              <h4>Cross-check</h4>
              <p>Numbers and forms are reconciled against the state judiciary website on the day of publication. The Last updated date matches the verification date.</p>
            </div>
          </div>
        </div>
      </section>

      {/* UPDATE CADENCE */}
      <section className="ep-cadence">
        <div className="wrap">
          <div className="ep-cadence-card">
            <div style={{ position: "relative" }}>
              <span
                className="eyebrow"
                style={{ color: "rgba(254,249,241,0.65)", marginBottom: 14, display: "inline-block" }}
              >
                Update cadence
              </span>
              <h2>
                Twice a year, <em>plus events.</em>
              </h2>
              <p>
                Every state guide gets a full re-check at least twice a year. We also
                update individual guides whenever something material changes. The Last
                updated date on every page reflects the most recent material change, not
                cosmetic edits.
              </p>
            </div>
            <div className="ep-trigger-list">
              <div className="ep-trigger">
                <strong>Cap change:</strong> the state raises or lowers its small-claims
                jurisdictional limit.
              </div>
              <div className="ep-trigger">
                <strong>Fee change:</strong> filing fees, service-of-process fees, or
                judgment-interest rates move.
              </div>
              <div className="ep-trigger">
                <strong>New forms:</strong> a state court issues new self-help forms or
                form numbers.
              </div>
              <div className="ep-trigger">
                <strong>Reader correction:</strong> someone reports an error and we verify
                it against a primary source.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INFORMATION VS ADVICE */}
      <section className="ep-vs">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Information vs advice</span>
            <h2>
              The line that <em>matters.</em>
            </h2>
            <p>
              CivilCase publishes general legal information. It does not publish legal
              advice for your situation. Same words, two very different things.
            </p>
          </div>
          <div className="ep-vs-grid">
            <div className="ep-vs-col">
              <h4>Legal information</h4>
              <div className="tag">What we publish</div>
              <ul>
                <li>Explains what the rules are.</li>
                <li>Cites the statute or court rule it&rsquo;s pulling from.</li>
                <li>Generic to anyone in that state with that claim type.</li>
                <li>Covers procedure, deadlines, forms, and fees.</li>
                <li>Free; no engagement letter; no privilege.</li>
              </ul>
            </div>
            <div className="ep-vs-divider">vs</div>
            <div className="ep-vs-col advice">
              <h4>Legal advice</h4>
              <div className="tag">What an attorney does</div>
              <ul>
                <li>Applies the rules to your facts.</li>
                <li>Recommends a course of action you should take.</li>
                <li>Specific to your case, your defendant, your evidence.</li>
                <li>Covers strategy, leverage, and tradeoffs.</li>
                <li>Engagement letter required; protected by privilege.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CORRECTIONS */}
      <section className="ep-fix">
        <div className="wrap">
          <div className="ep-fix-card">
            <div>
              <span className="eyebrow">Spotted an error?</span>
              <h3 style={{ marginTop: 12 }}>
                Tell us. <em>We&rsquo;ll fix it.</em>
              </h3>
              <p>
                Send a link to the primary source you&rsquo;re relying on to{" "}
                <a href="mailto:editorial@civilcase.com">editorial@civilcase.com</a>.
                Verified corrections ship within a week and are noted in the guide&rsquo;s
                update log.
              </p>
            </div>
            <a className="btn btn-dark" href="mailto:editorial@civilcase.com">
              Email Editorial
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="tp-cta">
        <div className="wrap-narrow">
          <div className="tp-cta-card">
            <h2>
              Read the guide, <em>send the letter.</em>
            </h2>
            <p>
              Browse a state guide for free. When you&rsquo;re ready, we draft the demand
              letter from the same facts you&rsquo;d already gathered.
            </p>
            <div className="hero-ctas">
              <Link className="btn btn-dark" href="/small-claims" style={{ background: "#fef9f1", color: "var(--ink)" }}>
                Browse Guides
              </Link>
              <Link className="btn btn-cream" href="/about">
                About CivilCase
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

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
  publisher: {
    "@type": "Organization",
    name: "CivilCase",
    url: "https://civilcase.com",
  },
  inLanguage: "en-US",
};

export default function EditorialPolicyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="trust-hero">
        <div className="wrap-narrow">
          <div className="eyebrow">Editorial Policy</div>
          <h1>
            Citations over <em>opinions</em>.
          </h1>
          <p className="trust-lede">
            Every dollar amount, deadline, and form number on this site is cited to a primary
            source. When the law changes, our guides change. Here&apos;s how that works.
          </p>
        </div>
      </section>

      <section className="trust-section">
        <div className="wrap-narrow trust-content">
          <h2>Sources we use, ranked</h2>
          <ol className="trust-ol">
            <li>
              <strong>State statutes.</strong> The actual law as enacted by each state
              legislature. Cited with the statute number (e.g., <em>Cal. Code Civ. Proc.
              § 116.220</em>) and a link to the official codification.
            </li>
            <li>
              <strong>Court rules.</strong> Procedural rules adopted by the state judiciary
              (e.g., the Texas Rules of Civil Procedure).
            </li>
            <li>
              <strong>Judicial-branch publications.</strong> Official court self-help
              centers, judicial-council guides, and clerk-issued instructions.
            </li>
            <li>
              <strong>State-specific case law</strong> when a published opinion materially
              changes how a procedural rule is applied.
            </li>
          </ol>
          <p>
            We avoid citing law-firm marketing pages, generic legal-content farms, and
            unsourced encyclopedia entries. When a primary source is silent or ambiguous, we
            say so on the page rather than guess.
          </p>

          <h2>How a state guide gets written</h2>
          <ol className="trust-ol">
            <li>
              <strong>Deep research pass.</strong> An AI model with web-search access pulls
              every relevant statute, court rule, and self-help page for the state and
              produces a structured draft with inline citations.
            </li>
            <li>
              <strong>Editorial pass.</strong> A human reviewer verifies each cited number
              against the source, removes any unsourced claims, and rewrites for plain
              English. Anything we can&apos;t verify against a primary source is cut.
            </li>
            <li>
              <strong>Cross-check pass.</strong> Numbers, deadlines, and form names are
              reconciled against the state&apos;s judicial-branch website on the date of
              publication.
            </li>
            <li>
              <strong>Publication.</strong> The guide goes live with a visible{" "}
              <em>Last updated</em> date that matches the structured-data{" "}
              <em>dateModified</em> field.
            </li>
          </ol>

          <h2>Update cadence</h2>
          <p>
            We re-check every state guide at least <strong>twice a year</strong>. We also
            update individual guides whenever:
          </p>
          <ul className="trust-list">
            <li>The state raises or lowers its small-claims jurisdictional cap.</li>
            <li>Filing fees, service-of-process fees, or judgment-interest rates change.</li>
            <li>A state court issues new self-help forms or numbers.</li>
            <li>A reader reports an error and we verify it against a primary source.</li>
          </ul>
          <p>
            Each guide&apos;s <em>Last updated</em> date reflects the most recent material
            change, not cosmetic edits.
          </p>

          <h2>The line between information and advice</h2>
          <p className="trust-callout">
            CivilCase publishes general legal <strong>information</strong>. It does not
            publish legal <strong>advice</strong> for your specific situation. The
            difference matters: information explains what the rules are; advice is a
            licensed attorney&apos;s judgment about what you should do given your facts.
            We&apos;re the first; we are not the second.
          </p>

          <h2>Corrections</h2>
          <p>
            If you find a mistake, write to us at{" "}
            <a href="mailto:editorial@civilcase.com" className="trust-link">
              editorial@civilcase.com
            </a>{" "}
            with a link to the primary source. Verified corrections ship within a week and
            are noted in the guide&apos;s update log.
          </p>

          <h2>AI in our editorial process</h2>
          <p>
            We use AI to accelerate research and drafting, never to replace verification.
            Every cited fact on this site has been confirmed against a primary source by a
            human before publication. AI-generated drafts that we couldn&apos;t verify
            against an authoritative source are discarded.
          </p>
        </div>
      </section>

      <section className="trust-cta">
        <div className="wrap-narrow trust-cta-card">
          <h2>
            Spotted an error? <em>Tell us.</em>
          </h2>
          <p>
            We&apos;d rather you find a mistake before a court does. Email{" "}
            <a href="mailto:editorial@civilcase.com" className="trust-link">
              editorial@civilcase.com
            </a>{" "}
            with the source and we&apos;ll verify and fix.
          </p>
          <div className="hero-ctas">
            <Link className="btn btn-dark" href="/small-claims">
              Browse Guides
            </Link>
            <Link className="btn btn-cream" href="/about">
              About CivilCase
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

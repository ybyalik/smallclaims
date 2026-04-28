import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About CivilCase",
  description:
    "CivilCase is a self-help legal-tech tool for the 87% of disputes that never see a lawyer. We help non-lawyers send demand letters, file in small claims court, and collect on judgments.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About CivilCase",
    description:
      "Self-help legal tools for the 87% of disputes that never see a lawyer.",
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
    description:
      "Resolve small claims and civil disputes, from demand to resolution.",
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO */}
      <section className="trust-hero">
        <div className="wrap-narrow">
          <div className="eyebrow">About CivilCase</div>
          <h1>
            Tools for the <em>87%</em> of disputes that never see a lawyer.
          </h1>
          <p className="trust-lede">
            Most civil disputes are too small to hire an attorney and too messy to walk away
            from. CivilCase exists for those cases. We help you write the demand letter, file
            in the right court, serve the right paperwork, and collect on the judgment.
            Without paying $300 an hour to learn what a JP Court is.
          </p>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="trust-section">
        <div className="wrap-narrow trust-content">
          <h2>What CivilCase is</h2>
          <p>
            CivilCase is self-help legal-technology software. We turn the rules of all 50
            states&apos; small claims courts into a guided workflow that anyone can follow.
            You answer questions about your dispute, our tool drafts the right document, and
            we walk you through filing, service, and collection.
          </p>
          <p>
            Our state guides are based on primary sources: state statutes, court rules, and
            judicial-branch publications. Every dollar amount, deadline, and form number on
            this site is cited. When the law changes, we update the guide.
          </p>

          <h2>What CivilCase is not</h2>
          <p className="trust-callout">
            <strong>CivilCase is not a law firm.</strong> We don&apos;t represent you. Using
            our tool does not create an attorney-client relationship and our content is not
            legal advice for your specific situation. If you need a lawyer&apos;s judgment on
            your case, hire a lawyer. We&apos;ll tell you when you should.
          </p>

          <h2>Who this is for</h2>
          <ul className="trust-list">
            <li>The renter trying to recover a wrongfully kept security deposit.</li>
            <li>The freelancer with three months of unpaid invoices.</li>
            <li>The car owner whose mechanic returned the vehicle worse than it arrived.</li>
            <li>The small business chasing a customer who walked on a $4,000 contract.</li>
            <li>The neighbor whose tree fell on the wrong fence.</li>
          </ul>
          <p>
            Our typical user has somewhere between $500 and $20,000 at stake, no patience
            for legal jargon, and no interest in spending more on a lawyer than they expect
            to recover. If that&apos;s you, you&apos;re in the right place.
          </p>

          <h2>How we make money</h2>
          <p>
            We charge <strong>$39 to generate a professional demand letter</strong> based on
            your dispute. State guides are free. There&apos;s no subscription, no
            contingency fee, no hidden costs. If we add filing or service-of-process
            assistance later, those will be priced on a per-case basis the same way.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="trust-cta">
        <div className="wrap-narrow trust-cta-card">
          <h2>
            Ready to send a <em>demand letter</em>?
          </h2>
          <p>
            Three minutes of intake, a draft you can edit, and we mail or hand you the PDF.
          </p>
          <div className="hero-ctas">
            <Link className="btn btn-dark" href="/demand-letter">
              Get Started
            </Link>
            <Link className="btn btn-cream" href="/small-claims">
              Browse State Guides
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

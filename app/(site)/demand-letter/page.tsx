import type { Metadata } from "next";
import Link from "next/link";
import StartButton from "./StartButton";

export const metadata: Metadata = {
  title: "Send a Demand Letter",
  description:
    "Generate a professional demand letter in minutes. CivilCase drafts it, you review, then download for $39.",
  alternates: { canonical: "/demand-letter" },
  openGraph: {
    title: "Send a Demand Letter — CivilCase",
    description:
      "A professional demand letter resolves about half of small-claims disputes without filing.",
    url: "/demand-letter",
    type: "website",
  },
};

const SITE_URL = "https://civilcase.com";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${SITE_URL}/demand-letter#service`,
      name: "CivilCase Demand Letter",
      serviceType: "Demand Letter Drafting",
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: { "@type": "Country", name: "United States" },
      url: `${SITE_URL}/demand-letter`,
      description:
        "AI-drafted demand letter for unpaid debts, security deposits, contractor disputes, and other small-claims matters. Customer reviews and edits before download. Optional certified-mail delivery.",
      audience: { "@type": "Audience", audienceType: "Self-represented plaintiffs" },
      offers: {
        "@type": "Offer",
        price: "39.00",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/demand-letter`,
        category: "Legal document drafting",
      },
    },
    {
      "@type": "Product",
      "@id": `${SITE_URL}/demand-letter#product`,
      name: "CivilCase Demand Letter",
      description:
        "Professional demand letter, drafted to your facts and ready to send. Resolves about half of small-claims disputes without filing.",
      brand: { "@id": `${SITE_URL}/#organization` },
      category: "Legal services",
      offers: {
        "@type": "Offer",
        price: "39.00",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/demand-letter`,
      },
    },
  ],
};

export default function DemandLetterTeaserPage() {
  return (
    <main className="dl-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="dl-hero">
        <div className="wrap-narrow">
          <div className="eyebrow">Pre-suit</div>
          <h1>Send a Demand Letter</h1>
          <p className="lede">
            A professional demand letter resolves about half of small claims disputes
            without ever filing in court. CivilCase drafts it, you review and edit, then
            download as a PDF.
          </p>
          <div className="hero-ctas" style={{ marginTop: 24 }}>
            <StartButton />
            <Link className="btn btn-cream" href="/login?next=/dashboard/cases/new">
              I have an account
            </Link>
          </div>
          <p style={{ marginTop: 14, fontSize: 13.5, color: "var(--muted)" }}>
            No account required to start. Sign up only at checkout.
          </p>
        </div>
      </section>

      <section className="wrap-narrow dl-pricing">
        <h2>How it works</h2>
        <ol className="dl-steps">
          <li>
            <strong>Tell us your story.</strong> 3 to 5 minutes. We ask about the dispute,
            the other party, and what happened.
          </li>
          <li>
            <strong>We draft a professional demand letter.</strong> You review and edit
            anything that doesn&apos;t sound right.
          </li>
          <li>
            <strong>Pay $29 to send (or $49 for full pressure).</strong> Sign up at
            checkout. Letter goes out via certified mail under our brand.
          </li>
        </ol>
        <p className="dl-disclaimer">
          CivilCase is not a law firm and does not provide legal advice. Use of this service
          does not create an attorney-client relationship. The letter is generated based on
          information you provide; you are responsible for its accuracy and for any decision
          to send it.
        </p>
      </section>
    </main>
  );
}

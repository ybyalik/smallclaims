import type { Metadata } from "next";
import Link from "next/link";

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

export default function DemandLetterTeaserPage() {
  return (
    <main className="dl-page">
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
            <Link className="btn btn-dark" href="/signup?next=/dashboard/cases/new">
              Get Started
            </Link>
            <Link className="btn btn-cream" href="/login?next=/dashboard/cases/new">
              I have an account
            </Link>
          </div>
        </div>
      </section>

      <section className="wrap-narrow dl-pricing">
        <h2>How it works</h2>
        <ol className="dl-steps">
          <li>
            <strong>Create a free account.</strong> 30 seconds with Google or email.
          </li>
          <li>
            <strong>Tell us your story.</strong> 3 to 5 minutes. We ask about the dispute,
            the other party, and what happened.
          </li>
          <li>
            <strong>We draft a professional demand letter.</strong> You review and edit
            anything that doesn&apos;t sound right.
          </li>
          <li>
            <strong>Pay $39 to download.</strong> Formatted PDF + plain-text version,
            ready to send by mail or email.
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

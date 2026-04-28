import type { Metadata } from "next";
import IntakeForm from "./IntakeForm";

export const metadata: Metadata = {
  title: "Send a Demand Letter — CivilCase",
  description:
    "Generate a professional demand letter in minutes. Free to draft. $39 to download. $79 to mail certified.",
};

export default function DemandLetterPage() {
  return (
    <main className="dl-page">
      <section className="dl-hero">
        <div className="wrap-narrow">
          <div className="eyebrow">Step 1 of 3 · Tell us about your dispute</div>
          <h1>Send a Demand Letter</h1>
          <p className="lede">
            A professional demand letter resolves about half of small claims disputes
            without ever filing in court. Tell us what happened and we&apos;ll draft it for you.
          </p>
        </div>
      </section>

      <section className="wrap-narrow dl-form-wrap">
        <IntakeForm />
      </section>

      <section className="wrap-narrow dl-pricing">
        <h2>How it works</h2>
        <ol className="dl-steps">
          <li>
            <strong>Tell us your story.</strong> 3-5 minutes. No account required to start.
          </li>
          <li>
            <strong>We draft a professional demand letter.</strong> Free to preview and edit.
          </li>
          <li>
            <strong>Download for $39, or have us mail it certified for $79.</strong> USPS
            Certified Mail with proof of delivery, formatted for use as court evidence if you
            end up filing.
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

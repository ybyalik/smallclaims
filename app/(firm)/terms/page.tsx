import type { Metadata } from "next";
import Link from "next/link";
import { LegalDocLayout, type LegalSection } from "../../../components/firm";

export const metadata: Metadata = {
  title: "Terms and Conditions · CivilCase",
  description: "The terms under which CivilCase is provided. By using the service you agree to these terms.",
  alternates: { canonical: "/terms" },
};

const SECTIONS: LegalSection[] = [
  {
    id: "acceptance",
    title: "Acceptance",
    body: (
      <p>
        By accessing or using CivilCase you agree to these terms. If you do not agree, do not use
        the service. If you are using the service on behalf of an organization, you represent that
        you have authority to bind that organization to these terms.
      </p>
    ),
  },
  {
    id: "what-we-are",
    title: "What CivilCase is, and is not",
    body: (
      <>
        <p>
          CivilCase is a self-help legal-information website and document automation tool that
          helps individuals and small businesses prepare procedural documents (demand letters,
          filing guides, post-judgment collection plans) for state small-claims and civil cases.
        </p>
        <p>
          CivilCase is <strong>not a law firm.</strong> We do not represent you, advocate for you
          in court, or provide legal advice. No attorney-client relationship is created by using
          this site, purchasing a product, or communicating with our staff. Nothing you submit
          through the site is protected by attorney-client privilege or the work-product doctrine.
        </p>
        <p>
          You acknowledge and agree that CivilCase does not:
        </p>
        <ul>
          <li>Apply the law to the particular facts of your case.</li>
          <li>Tell you which legal form or document is right for your situation.</li>
          <li>Review the legal sufficiency of any document you prepare using our tools.</li>
          <li>Draw legal conclusions, offer opinions, or make recommendations about your rights,
            remedies, defenses, options, or legal strategy.</li>
          <li>Predict the outcome of any matter, the amount you may recover, or the likelihood
            of success.</li>
          <li>Represent you, appear on your behalf in any court, or negotiate with any opposing
            party.</li>
        </ul>
        <p>
          If you need legal advice about your specific situation, consult a licensed attorney in
          your state.
        </p>
      </>
    ),
  },
  {
    id: "self-representation",
    title: "Self-representation acknowledgment",
    body: (
      <p>
        By using CivilCase you acknowledge that you are choosing to represent yourself (appearing
        <em> pro se</em> or <em>pro per</em>) in any matter for which you use the service. You are
        the sole party to the dispute and the only party with authority to make legal decisions
        about it. You read every document before signing, sending, or filing it, and you assume
        all responsibility for the consequences of doing so.
      </p>
    ),
  },
  {
    id: "eligibility",
    title: "Eligibility",
    body: (
      <p>
        To use CivilCase you must be at least eighteen years old, a resident of the United States,
        and legally capable of entering into a binding contract. CivilCase content addresses
        procedure in state small-claims and limited civil divisions only. It does not address
        federal court procedure or the laws of other countries.
      </p>
    ),
  },
  {
    id: "account",
    title: "Your account",
    body: (
      <p>
        When you create an account you are responsible for keeping your login credentials secure and
        for everything that happens under your account. Tell us promptly if you suspect unauthorized
        access. You must provide accurate, current information when you sign up and when you update
        your profile.
      </p>
    ),
  },
  {
    id: "payments",
    title: "Payments and refunds",
    body: (
      <>
        <p>
          Some products are paid. Prices are shown before checkout and you are charged at the time
          of purchase. Payments are processed by Stripe; we do not store full card numbers.
        </p>
        <p>
          <strong>Refund policy.</strong> Because our products are digital and generated on demand,
          refunds are limited. If a product was not delivered because of a technical issue on our
          end, we will refund the purchase or regenerate the product at your choice. We do not
          refund a successfully delivered product because you changed your mind, settled your
          dispute, or were unhappy with the legal outcome of your case. We do not control courts,
          defendants, or the law, so we cannot guarantee any particular result.
        </p>
        <p>
          Postal-mail delivery of demand letters is handled by a third-party mail vendor. Once a
          letter has been queued for delivery it cannot be recalled or refunded. Delivery timeframes
          are estimates and are subject to the postal service.
        </p>
      </>
    ),
  },
  {
    id: "use",
    title: "Acceptable use",
    body: (
      <>
        <p>You agree not to:</p>
        <ul>
          <li>Use the service for any unlawful purpose, including harassment, defamation, or fraud.</li>
          <li>Submit information that is false, misleading, or that you do not have the right to submit.</li>
          <li>Attempt to access another user&rsquo;s account, data, or generated documents.</li>
          <li>Reverse-engineer, scrape, or copy the site or its outputs at scale (manual personal use of your own documents excepted).</li>
          <li>Use the service to send a demand letter that you know to be baseless, abusive, or threatening.</li>
          <li>Resell, rebrand, or distribute CivilCase outputs as a service to third parties.</li>
          <li>Interfere with the operation of the site, its servers, or other users.</li>
        </ul>
      </>
    ),
  },
  {
    id: "your-content",
    title: "Your content",
    body: (
      <>
        <p>
          You retain ownership of everything you submit to CivilCase: the facts of your case,
          documents you upload, names, and other case inputs. By submitting content you grant us a
          worldwide, royalty-free license to use it only for the purposes of running the service for
          you (generating your demand letter, filing guide, etc., and storing it in your account).
        </p>
        <p>
          You are solely responsible for the accuracy of what you submit and for any documents you
          sign, mail, file, or rely on. Court filings carry consequences. Verify everything before
          acting.
        </p>
      </>
    ),
  },
  {
    id: "our-content",
    title: "Our content",
    body: (
      <p>
        The CivilCase brand, the site design, our state guides, our blog posts, our demand-letter
        templates, and our research content are owned by us or licensed to us. You may use the
        documents we generate for you for your own legal matter. You may not republish,
        redistribute, or copy site content for commercial use without written permission.
      </p>
    ),
  },
  {
    id: "ai",
    title: "AI-generated outputs",
    body: (
      <p>
        CivilCase uses AI models to draft procedural documents and research. AI can produce text
        that looks correct but is wrong, out of date, or inapplicable to your situation. You are
        responsible for reviewing every output before relying on it, sending it, signing it, or
        filing it. We disclaim any guarantee that AI-generated text is legally accurate, sufficient,
        or suitable for your specific case.
      </p>
    ),
  },
  {
    id: "warranties",
    title: "Disclaimers",
    body: (
      <>
        <p>
          The service is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. To
          the maximum extent permitted by law, CivilCase disclaims all warranties of any kind,
          whether express or implied, including warranties of merchantability, fitness for a
          particular purpose, accuracy, and non-infringement.
        </p>
        <p>
          We do not warrant that the site will be uninterrupted, error-free, or free of harmful
          components. We do not warrant that any information or document we provide is correct,
          complete, current, or sufficient for your case. Court rules, fees, deadlines, and forms
          change. Verify with the clerk before filing.
        </p>
      </>
    ),
  },
  {
    id: "liability",
    title: "Limitation of liability",
    body: (
      <>
        <p>
          To the maximum extent permitted by law, CivilCase, its officers, directors, employees,
          and agents will not be liable for any indirect, incidental, special, consequential,
          exemplary, or punitive damages, including lost profits, lost revenue, lost data, or
          business interruption, arising out of or in connection with your use of the service, even
          if we have been advised of the possibility of such damages.
        </p>
        <p>
          Our total cumulative liability to you for any claim arising from or relating to the
          service is limited to the greater of one hundred dollars ($100) or the amount you paid us
          in the twelve months preceding the event giving rise to the claim.
        </p>
        <p>
          Some jurisdictions do not allow the exclusion or limitation of incidental or consequential
          damages, so the above limitations may not apply to you in full.
        </p>
      </>
    ),
  },
  {
    id: "indemnification",
    title: "Indemnification",
    body: (
      <p>
        You agree to defend, indemnify, and hold harmless CivilCase and its officers, directors,
        employees, and agents from and against any claims, liabilities, damages, losses, and
        expenses, including reasonable attorneys&rsquo; fees, arising out of or in any way connected
        with your use of the service, your violation of these terms, your violation of any rights of
        another, or any document you create, send, sign, or file using outputs from the service.
      </p>
    ),
  },
  {
    id: "termination",
    title: "Termination",
    body: (
      <>
        <p>
          You can stop using the service at any time. You can request deletion of your account
          through our <Link href="/contact">contact page</Link>.
        </p>
        <p>
          We may suspend or terminate your access to the service if we believe you have violated
          these terms, abused the service, placed the service or other users at risk, or if we are
          required to do so by law. Outstanding paid orders will be honored or refunded at our
          discretion as part of the termination.
        </p>
      </>
    ),
  },
  {
    id: "law",
    title: "Governing law and disputes",
    body: (
      <>
        <p>
          These terms are governed by the laws of the State of Delaware without regard to
          conflict-of-laws principles. You agree that any dispute arising out of or relating to
          these terms or the service will be resolved in the state or federal courts located in
          Delaware, and you submit to the personal jurisdiction of those courts. Either party may
          seek injunctive relief in any court of competent jurisdiction for misuse of intellectual
          property or confidential information.
        </p>
        <p>
          Nothing in this section prevents you from bringing a small claims case against CivilCase
          in your home state&rsquo;s small-claims division if that division has jurisdiction over
          your claim under your state&rsquo;s law.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to these terms",
    body: (
      <p>
        We may update these terms from time to time. When we do, the &ldquo;last updated&rdquo; date
        at the top of this page changes. Material changes will be highlighted on the site or sent to
        your account email. If you continue to use the service after a change takes effect, you
        accept the updated terms. If you do not agree to the updated terms, stop using the service.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <p>
        Questions about these terms can be sent through our{" "}
        <Link href="/contact">contact page</Link>.
      </p>
    ),
  },
];

export default function Terms2() {
  return (
    <LegalDocLayout
      eyebrowText="TERMS AND CONDITIONS"
      title={<>The terms of <em>using CivilCase</em>.</>}
      lede="The contract between you and CivilCase. Plain language where possible. Lawyer language where required."
      lastUpdated="May 13, 2026"
      sections={SECTIONS}
      secondaryLabel="Privacy policy"
      secondaryHref="/privacy"
      cta={{
        title: <>Ready to <em>get started</em>?</>,
        body: "By using CivilCase you accept these terms. Most disputes are simple enough for a demand letter to resolve without filing anything.",
      }}
    />
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { LegalDocLayout, type LegalSection } from "../../../components/firm";

export const metadata: Metadata = {
  title: "Disclaimer · CivilCase",
  description:
    "CivilCase is not a law firm and does not provide legal advice. The information on this site is general legal information for non-lawyers and is not a substitute for an attorney.",
  alternates: { canonical: "/disclaimer" },
};

const SECTIONS: LegalSection[] = [
  {
    id: "not-firm",
    title: "We are not a law firm",
    body: (
      <p>
        CivilCase is a technology company that operates a self-help legal-information website and
        document automation tools. We are not a law firm and we do not employ lawyers to represent
        you. Using this site, creating an account, generating a document, or communicating with us
        does not create an attorney-client relationship, and nothing you share with us is protected
        by attorney-client privilege or the work-product doctrine.
      </p>
    ),
  },
  {
    id: "not-advice",
    title: "We do not provide legal advice",
    body: (
      <>
        <p>
          The state guides, articles, FAQs, document templates, and other content on CivilCase are
          general legal information published for educational purposes. They are not legal advice
          and are not a substitute for the judgment of a licensed attorney considering the specific
          facts of your situation.
        </p>
        <p>
          Specifically, CivilCase does not:
        </p>
        <ul>
          <li>Apply the law to the particular facts of your case.</li>
          <li>Tell you which legal form or document is right for your situation.</li>
          <li>Review the legal sufficiency of any document you prepare using our tools.</li>
          <li>Draw legal conclusions, offer opinions, or make recommendations about your rights,
            remedies, defenses, options, or legal strategy.</li>
          <li>Predict the outcome of any matter, the amount you may recover, or the likelihood of
            success.</li>
          <li>Represent you, appear on your behalf in any court, or negotiate with any opposing
            party.</li>
        </ul>
        <p>
          Consult a licensed attorney in your state, especially if any of the following apply:
        </p>
        <ul>
          <li>Damages above your state&rsquo;s small-claims jurisdictional limit.</li>
          <li>Personal injury, defamation, or other tort claims.</li>
          <li>Disputes involving real-property title, family law, or probate.</li>
          <li>Counterclaims that exceed the small-claims cap.</li>
          <li>Anything involving a federal claim, a government defendant, or arbitration clauses.</li>
          <li>Any case where you face criminal exposure or a regulatory complaint.</li>
        </ul>
      </>
    ),
  },
  {
    id: "self-rep",
    title: "You are representing yourself",
    body: (
      <p>
        When you use CivilCase you are choosing to represent yourself (sometimes called appearing
        <em> pro se</em> or <em>pro per</em>). You, not CivilCase, are the only party to your
        dispute and the only one responsible for the decisions made in it. We provide tools and
        information; you make the choices, sign the documents, and decide what to file.
      </p>
    ),
  },
  {
    id: "templates",
    title: "Document automation, not custom drafting",
    body: (
      <p>
        Our document tools assemble templates using the answers you provide. The templates were
        originally drafted by licensed attorneys, but they are not customized for your specific
        case and no attorney reviews your individual matter before, during, or after document
        generation. CivilCase is not your lawyer simply because we generated a document for you.
        Read every document carefully before signing, sending, or filing it.
      </p>
    ),
  },
  {
    id: "your-filings",
    title: "You are responsible for your own filings",
    body: (
      <p>
        Documents generated through CivilCase are produced from the information you provide. You are
        solely responsible for the accuracy and completeness of that information, the legal
        sufficiency of any document you sign, send, or file, and the consequences of filing it.
        Always read documents before signing or filing. Always verify deadlines, court addresses,
        and filing fees against the official court website before relying on them.
      </p>
    ),
  },
  {
    id: "out-of-date",
    title: "Information may be out of date",
    body: (
      <p>
        State laws, court rules, fees, and forms change frequently. We work to keep our guides
        current and we publish a Last updated date on every state page, but we cannot guarantee
        that every fact is current at the moment you read it. When timing matters, confirm with the
        official source.
      </p>
    ),
  },
  {
    id: "no-guarantee",
    title: "No guarantee of outcome",
    body: (
      <p>
        CivilCase does not promise or guarantee that you will win your case, recover money, or
        achieve any particular result. Outcomes depend on facts, evidence, the judge, the opposing
        party, applicable law, and your own preparation, none of which CivilCase controls.
        Outcomes reported by other CivilCase users do not predict your result.
      </p>
    ),
  },
  {
    id: "ai",
    title: "Use of AI",
    body: (
      <>
        <p>
          CivilCase uses AI to help draft documents and summarize state law. AI is not a lawyer
          and is not a substitute for one. AI can make mistakes, including citing statutes that
          don&rsquo;t apply to your case, omitting requirements that do, or producing language that
          a court will not accept. Read every document we generate before sending or filing it, and
          consult a licensed attorney if anything is unclear.
        </p>
      </>
    ),
  },
  {
    id: "consult",
    title: "Consult an attorney when in doubt",
    body: (
      <p>
        CivilCase is built for the everyday disputes that don&rsquo;t justify hiring a lawyer. If
        you&rsquo;re unsure whether your case fits that description, the safe answer is to consult
        an attorney. Most state bars run a lawyer referral service that will connect you with a
        licensed attorney for a short, low-cost consultation.
      </p>
    ),
  },
  {
    id: "jurisdiction",
    title: "Jurisdictional limitations",
    body: (
      <p>
        CivilCase is intended for use only by individuals and small businesses pursuing claims in
        U.S. small-claims, justice, or comparable trial-level courts in the fifty United States and
        the District of Columbia. We do not provide content for federal court litigation, tribal
        court matters, international disputes, or any matter outside the United States.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Limitation of liability",
    body: (
      <p>
        To the fullest extent permitted by law, CivilCase&rsquo;s liability arising from your use
        of this site is capped at the amount you paid us in the twelve months preceding the claim.
        CivilCase is not liable for indirect, incidental, or consequential damages, including lost
        recovery, lost time, or court costs you paid based on information you found here.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <p>
        Questions about this disclaimer or our terms of use can be sent through our{" "}
        <Link href="/contact">contact page</Link>. By using CivilCase you acknowledge that you have
        read and understood this disclaimer.
      </p>
    ),
  },
];

export default function Disclaimer2() {
  return (
    <LegalDocLayout
      eyebrowText="DISCLAIMER"
      title={<>Read this <em>before</em> you rely on anything we publish.</>}
      lede="CivilCase is a self-help legal-information website and document automation tool. We are not a law firm, we do not provide legal advice, and using this site does not create an attorney-client relationship. The information here is general legal information, not a substitute for the judgment of a licensed attorney considering the specific facts of your situation."
      badge={{
        label: "IMPORTANT",
        title: <>We are <em>not</em> a law firm.</>,
        body: "CivilCase is a technology company that operates a self-help legal-information website and document automation tools. Use of this site does not create an attorney-client relationship, and nothing you share with us is privileged.",
      }}
      sections={SECTIONS}
    />
  );
}

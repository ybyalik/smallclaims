import type { Metadata } from "next";
import Link from "next/link";
import { LegalDocLayout, type LegalSection } from "../../../components/firm";

export const metadata: Metadata = {
  title: "Privacy Policy · CivilCase",
  description: "How CivilCase collects, uses, shares, and protects personal information.",
  alternates: { canonical: "/privacy2" },
  robots: { index: false, follow: false },
};

const SECTIONS: LegalSection[] = [
  {
    id: "scope",
    title: "Scope",
    body: (
      <p>
        This policy covers civilcase.com and the related services we operate under the CivilCase
        brand. It does not cover third-party websites we link to, payment processors we use, or
        courts and government agencies you submit filings to. Those have their own privacy policies.
      </p>
    ),
  },
  {
    id: "collect",
    title: "Information we collect",
    body: (
      <>
        <p>We collect information in three buckets.</p>
        <p>
          <strong>Information you give us.</strong> What you type into the case-build wizard: your
          name, address, the defendant&rsquo;s name and address, the dispute amount, the facts of
          your case, evidence files you upload, and any other details required to draft a demand
          letter or filing guide. If you create an account, also your email and a hashed password.
        </p>
        <p>
          <strong>Payment information.</strong> When you pay for a product, Stripe collects your
          card number, billing address, and similar details on our behalf. We never see or store
          full card numbers. Stripe sends us a transaction reference, the last four digits, the
          brand of the card, and whether the payment succeeded.
        </p>
        <p>
          <strong>Information collected automatically.</strong> When you use the site we log
          standard request data: IP address, browser type, pages visited, timestamps, and similar
          diagnostic information. We also use cookies and analytics described below.
        </p>
      </>
    ),
  },
  {
    id: "use",
    title: "How we use information",
    body: (
      <>
        <p>We use what we collect for these purposes:</p>
        <ul>
          <li><strong>Run the service.</strong> Generate your demand letter, filing guide, and other case artifacts.</li>
          <li><strong>Process payments.</strong> Charge you when you buy a product and issue refunds when warranted.</li>
          <li><strong>Send transactional email.</strong> Receipts, account activity, mailing confirmations, hearing reminders, and similar service messages.</li>
          <li><strong>Improve the product.</strong> Understand which features get used, which states need better content, and where users get stuck.</li>
          <li><strong>Prevent abuse.</strong> Detect fraud, spam, and automated abuse of free tools like the case-score quiz.</li>
          <li><strong>Comply with the law.</strong> Respond to legal process, enforce our terms, and protect the safety of users and the public.</li>
        </ul>
      </>
    ),
  },
  {
    id: "sharing",
    title: "How we share information",
    body: (
      <>
        <p>
          We do not sell your personal information. We share it only with service providers that
          help us run CivilCase, and only as needed for them to perform their job.
        </p>
        <ul>
          <li><strong>Hosting and data storage.</strong> Vercel for hosting and Supabase for application data.</li>
          <li><strong>File storage.</strong> Amazon S3 for evidence attachments and generated PDFs.</li>
          <li><strong>Payments.</strong> Stripe for processing card payments.</li>
          <li><strong>Email.</strong> Resend for sending transactional email.</li>
          <li><strong>AI processing.</strong> OpenAI for generating drafts of demand letters, filing guides, and procedural research. Inputs we send are limited to what the model needs to do the job. We do not use customer content to train any model.</li>
          <li><strong>Mail delivery.</strong> Postal partners that physically deliver demand letters when you purchase that option.</li>
          <li><strong>Analytics.</strong> Aggregate, pseudonymous usage analytics provided by industry-standard tools.</li>
        </ul>
        <p>
          We may also disclose information if required by law, subpoena, or court order, or if we
          believe disclosure is necessary to protect the safety, rights, or property of CivilCase,
          our users, or the public.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies and analytics",
    body: (
      <>
        <p>
          We use cookies and similar technologies for two purposes: keeping you logged in to your
          account, and measuring how the site is used so we can improve it. You can disable cookies
          in your browser, but parts of the site will stop working if you do (account login,
          payment flows, the wizard).
        </p>
        <p>
          Analytics tools we use receive pseudonymous identifiers and aggregate usage data. We do
          not use cookies for cross-site behavioral advertising.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    title: "Data retention",
    body: (
      <>
        <p>
          We keep your case information as long as your account is active so you can return to your
          cases. If you delete your account, we delete your case content within thirty days, except
          where we are required to keep records for tax, payment dispute, or legal compliance
          reasons. Backup copies may persist for a short period after deletion before they roll out
          of our backup retention schedule.
        </p>
        <p>
          Anonymized usage data and aggregate analytics may be retained indefinitely. Those records
          do not identify you.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "Security",
    body: (
      <p>
        We use industry-standard security practices to protect your information: encryption in
        transit (HTTPS everywhere), encryption at rest for the database and file storage, hashed
        passwords, and access controls that limit which staff or automated systems can read your
        data. No system is perfectly secure. We cannot guarantee that data sent over the internet or
        stored in our systems will never be accessed without authorization.
      </p>
    ),
  },
  {
    id: "rights",
    title: "Your rights and choices",
    body: (
      <>
        <p>
          You can review and update most of your information directly in your dashboard settings.
          For anything you can&rsquo;t change there, or to delete your account entirely, contact us
          through our <Link href="/contact2">contact page</Link>.
        </p>
        <p>
          Depending on where you live, you may have additional rights under state law (California,
          Virginia, Colorado, Connecticut, Utah, and others) to access the personal information we
          hold about you, request a copy, request correction, or request deletion. To exercise any
          of those rights, contact us. We will verify your identity before acting on the request.
        </p>
        <p>
          We do not sell or share personal information for cross-context behavioral advertising.
          There is nothing to opt out of in that regard.
        </p>
      </>
    ),
  },
  {
    id: "children",
    title: "Children",
    body: (
      <p>
        CivilCase is not for anyone under eighteen. We do not knowingly collect personal information
        from children. If you believe a child has provided information to us, contact us and we will
        delete it.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        We update this policy when our practices or the law changes. The &ldquo;last updated&rdquo;
        date at the top reflects the most recent change. Material changes will be highlighted on the
        site or sent to your account email. Continued use after a change means you accept the
        updated policy.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <p>
        Questions, requests under state privacy law, or account-deletion requests can be sent
        through our <Link href="/contact2">contact page</Link>.
      </p>
    ),
  },
];

export default function Privacy2() {
  return (
    <LegalDocLayout
      eyebrowText="PRIVACY POLICY"
      title={<>How we handle <em>your information</em>.</>}
      lede="What we collect, how we use it, who we share it with, and how long we keep it. Written in plain language. No dark patterns."
      lastUpdated="May 13, 2026"
      sections={SECTIONS}
      cta={{
        title: <>Ready to <em>resolve your dispute</em>?</>,
        body: "Most cases are simple enough for a demand letter to resolve without filing anything. Try ours.",
      }}
    />
  );
}

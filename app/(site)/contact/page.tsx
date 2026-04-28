import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach CivilCase. Support, editorial corrections, partnerships, and press. We respond to support emails within one business day.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — CivilCase",
    description: "Get in touch with CivilCase.",
    url: "/contact",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact CivilCase",
  url: "https://civilcase.com/contact",
  mainEntity: {
    "@type": "Organization",
    name: "CivilCase",
    url: "https://civilcase.com",
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: "support@civilcase.com",
        contactType: "customer support",
        availableLanguage: ["English"],
      },
      {
        "@type": "ContactPoint",
        email: "editorial@civilcase.com",
        contactType: "editorial",
      },
      {
        "@type": "ContactPoint",
        email: "press@civilcase.com",
        contactType: "press",
      },
    ],
  },
};

const channels = [
  {
    title: "Help with your case",
    email: "support@civilcase.com",
    desc: "Account questions, billing, refunds, document issues. We respond within one business day.",
  },
  {
    title: "Corrections to a state guide",
    email: "editorial@civilcase.com",
    desc: "Spotted an outdated fee, deadline, or form number? Send us the source and we'll verify and fix.",
  },
  {
    title: "Partnerships",
    email: "partnerships@civilcase.com",
    desc: "Process servers, attorneys, courts, legal aid orgs, and integration partners.",
  },
  {
    title: "Press and media",
    email: "press@civilcase.com",
    desc: "Interview requests, data requests, and stories about small-claims access to justice.",
  },
];

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="trust-hero">
        <div className="wrap-narrow">
          <div className="eyebrow">Contact</div>
          <h1>
            Real humans, <em>real fast</em>.
          </h1>
          <p className="trust-lede">
            We answer every support email within one business day. Pick the channel that
            fits your question.
          </p>
        </div>
      </section>

      <section className="trust-section">
        <div className="wrap-narrow">
          <div className="contact-grid">
            {channels.map((c) => (
              <a
                key={c.email}
                href={`mailto:${c.email}`}
                className="contact-card"
              >
                <div className="contact-card-title">{c.title}</div>
                <div className="contact-card-email">{c.email}</div>
                <div className="contact-card-desc">{c.desc}</div>
                <span className="contact-card-arrow">→</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="trust-section">
        <div className="wrap-narrow trust-content">
          <h2>Mailing address</h2>
          <p className="trust-callout">
            <strong>CivilCase</strong>
            <br />
            Attn: Customer Support
            <br />
            <em>Mailing address coming with our public launch — for now, please email{" "}
            <a href="mailto:support@civilcase.com" className="trust-link">
              support@civilcase.com
            </a>
            </em>
          </p>

          <h2>What we don&apos;t do over email</h2>
          <ul className="trust-list">
            <li>
              <strong>We don&apos;t give legal advice.</strong> If you ask whether you should
              accept a settlement, sue a specific person, or take a particular legal step,
              the answer is &ldquo;consult a licensed attorney in your state.&rdquo;
            </li>
            <li>
              <strong>We don&apos;t review your case for free.</strong> Our guides are how we
              deliver scalable information. One-off case review isn&apos;t something we
              offer.
            </li>
            <li>
              <strong>We don&apos;t accept service of process.</strong> If you need to serve
              a defendant, hire a process server or your local sheriff. We are not an
              authorized agent for service.
            </li>
          </ul>

          <h2>Response times</h2>
          <p>
            Support questions about your account, billing, or a generated document are
            answered within one business day. Editorial corrections take up to a week
            because we verify against the primary source before publishing the fix.
            Partnership and press inquiries get a reply within three business days.
          </p>
        </div>
      </section>

      <section className="trust-cta">
        <div className="wrap-narrow trust-cta-card">
          <h2>
            Faster path: <em>start your case</em>.
          </h2>
          <p>
            If you&apos;re here to send a demand letter, you can begin in under three
            minutes. No support ticket required.
          </p>
          <div className="hero-ctas">
            <Link className="btn btn-dark" href="/demand-letter">
              Send a Demand Letter
            </Link>
            <Link className="btn btn-cream" href="/small-claims">
              Browse Guides
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

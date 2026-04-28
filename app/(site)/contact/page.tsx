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
      { "@type": "ContactPoint", email: "editorial@civilcase.com", contactType: "editorial" },
      { "@type": "ContactPoint", email: "press@civilcase.com", contactType: "press" },
    ],
  },
};

const channels = [
  {
    title: "Help with your case",
    email: "support@civilcase.com",
    desc: "Account questions, billing, refunds, document issues. We respond within one business day.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
  },
  {
    title: "Corrections to a state guide",
    email: "editorial@civilcase.com",
    desc: "Spotted an outdated fee, deadline, or form number? Send the source and we'll verify and fix.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
  },
  {
    title: "Partnerships",
    email: "partnerships@civilcase.com",
    desc: "Process servers, attorneys, courts, legal aid orgs, and integration partners.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Press and media",
    email: "press@civilcase.com",
    desc: "Interview requests, data requests, and stories about access to justice.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4M7 7h10M7 11h6" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO with stylized inbox */}
      <section className="tp-hero contact-hero">
        <div className="wrap-wide">
          <div className="contact-hero-grid">
            <div>
              <span className="eyebrow">Contact</span>
              <h1 style={{ marginTop: 18 }}>
                Real humans, <em>real fast</em>.
              </h1>
              <p className="tp-lede">
                We answer every support email within one business day. Pick the channel
                that fits your question — or scroll for the things we can&rsquo;t handle
                over email.
              </p>
              <div className="hero-ctas" style={{ marginTop: 28 }}>
                <a className="btn btn-dark" href="mailto:support@civilcase.com">
                  Email Support
                </a>
                <Link className="btn btn-cream" href="/small-claims">
                  Browse State Guides
                </Link>
              </div>
            </div>
            <div className="contact-inbox" aria-hidden="true">
              <div className="contact-inbox-bar">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="contact-inbox-list">
                <div className="contact-inbox-item">
                  <span className="dot"></span>
                  <div>
                    <div className="from">Support · CivilCase</div>
                    <div className="preview">Re: Refund — sorted in 4 hours.</div>
                  </div>
                  <span className="when">2m</span>
                </div>
                <div className="contact-inbox-item">
                  <span className="dot" style={{ background: "var(--muted)" }}></span>
                  <div>
                    <div className="from">Editorial · CivilCase</div>
                    <div className="preview">Verified your correction. Patched today.</div>
                  </div>
                  <span className="when">1h</span>
                </div>
                <div className="contact-inbox-item">
                  <span className="dot" style={{ background: "var(--muted)" }}></span>
                  <div>
                    <div className="from">Partnerships · CivilCase</div>
                    <div className="preview">Looped you with a process server in TX.</div>
                  </div>
                  <span className="when">3h</span>
                </div>
                <div className="contact-inbox-item">
                  <span className="dot" style={{ background: "var(--muted)" }}></span>
                  <div>
                    <div className="from">Press · CivilCase</div>
                    <div className="preview">Forwarded your interview ask.</div>
                  </div>
                  <span className="when">1d</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHANNELS */}
      <section className="contact-channels">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Reach the right desk</span>
            <h2>
              Four ways in. <em>One promise:</em> a real reply.
            </h2>
          </div>
          <div className="contact-channels-grid">
            {channels.map((c) => (
              <a key={c.email} className="cc-card" href={`mailto:${c.email}`}>
                <div className="icon">{c.icon}</div>
                <h3>{c.title}</h3>
                <span className="email">{c.email}</span>
                <p className="desc">{c.desc}</p>
                <span className="arrow">
                  Email this desk <span aria-hidden>→</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE DON'T DO OVER EMAIL */}
      <section className="contact-not">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">What we don&rsquo;t do</span>
            <h2>
              These three are <em>off the menu</em>.
            </h2>
            <p>
              We&rsquo;re happy to send a real reply — but these aren&rsquo;t things email
              support can do. Save yourself a round trip.
            </p>
          </div>
          <div className="contact-not-grid">
            <div className="contact-not-card">
              <div className="x">×</div>
              <h4>Give legal advice</h4>
              <p>
                If you&rsquo;re asking whether to accept a settlement or sue a specific
                person, the answer is &ldquo;consult a licensed attorney in your state.&rdquo;
                We give general information, not advice on your facts.
              </p>
            </div>
            <div className="contact-not-card">
              <div className="x">×</div>
              <h4>Review your case for free</h4>
              <p>
                Our state guides are how we deliver scalable information. One-off case
                review isn&rsquo;t something we offer. The guide for your state covers
                what we&rsquo;d tell you anyway.
              </p>
            </div>
            <div className="contact-not-card">
              <div className="x">×</div>
              <h4>Accept service of process</h4>
              <p>
                If you need to serve a defendant, hire a process server or your local
                sheriff. CivilCase is not an authorized agent for service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RESPONSE TIMES */}
      <section className="contact-response">
        <div className="wrap">
          <div className="contact-response-card">
            <div className="contact-response-grid">
              <div>
                <span className="eyebrow">Response times</span>
                <h2 style={{ marginTop: 14 }}>
                  We don&rsquo;t leave you on <em>read.</em>
                </h2>
                <p>
                  Most desks reply within one business day. Editorial corrections take
                  longer because we verify against the source. Press and partnerships get
                  triaged within three days.
                </p>
              </div>
              <div className="contact-timeline">
                <div className="contact-timeline-row">
                  <div className="when">
                    <em>1</em> day
                  </div>
                  <div className="what">
                    <strong>Support and billing.</strong> Account questions, refunds,
                    document issues.
                  </div>
                </div>
                <div className="contact-timeline-row">
                  <div className="when">
                    <em>≤7</em> days
                  </div>
                  <div className="what">
                    <strong>Editorial corrections.</strong> We verify against the primary
                    source before patching the guide.
                  </div>
                </div>
                <div className="contact-timeline-row">
                  <div className="when">
                    <em>3</em> days
                  </div>
                  <div className="what">
                    <strong>Partnerships and press.</strong> Triaged in batches by team
                    lead.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAILING ADDRESS */}
      <section className="contact-mail">
        <div className="wrap">
          <div className="contact-mail-card">
            <div>
              <span className="eyebrow">Mailing address</span>
              <h3 style={{ marginTop: 12 }}>The PO Box is in transit.</h3>
              <p>
                Our mailing address publishes with the public launch. For now, please send
                anything you&rsquo;d normally mail to{" "}
                <a href="mailto:support@civilcase.com">support@civilcase.com</a> and
                we&rsquo;ll route it.
              </p>
            </div>
            <div style={{ fontFamily: "Newsreader", fontStyle: "italic", fontSize: 22, color: "var(--muted)", textAlign: "right", lineHeight: 1.4 }}>
              CivilCase<br />
              Attn: Customer Support<br />
              <span style={{ fontSize: 14, color: "var(--muted)" }}>(coming with public launch)</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="tp-cta">
        <div className="wrap-narrow">
          <div className="tp-cta-card">
            <h2>
              Faster path: <em>start your case</em>.
            </h2>
            <p>
              If you&rsquo;re here to send a demand letter, you can begin in under three
              minutes. No support ticket required.
            </p>
            <div className="hero-ctas">
              <Link className="btn btn-dark" href="/demand-letter" style={{ background: "#fef9f1", color: "var(--ink)" }}>
                Send a Demand Letter
              </Link>
              <Link className="btn btn-cream" href="/small-claims">
                Browse State Guides
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

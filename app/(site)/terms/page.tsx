import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "The rules of using CivilCase: what we provide, what you agree to, payments, refunds, and the limits of our liability.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms and Conditions — CivilCase",
    description:
      "The rules of using CivilCase, in plain English.",
    url: "/terms",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Terms and Conditions",
  url: "https://civilcase.com/terms",
  description:
    "CivilCase terms of service. Not a law firm. Plain-English rules of using the platform.",
  publisher: { "@type": "Organization", name: "CivilCase", url: "https://civilcase.com" },
  inLanguage: "en-US",
};

const sections = [
  { id: "acceptance", title: "Acceptance" },
  { id: "what-we-are", title: "What CivilCase is, and is not" },
  { id: "eligibility", title: "Eligibility" },
  { id: "account", title: "Your account" },
  { id: "payments", title: "Payments and refunds" },
  { id: "use", title: "Acceptable use" },
  { id: "your-content", title: "Your content" },
  { id: "our-content", title: "Our content" },
  { id: "ai", title: "AI-generated outputs" },
  { id: "warranties", title: "Disclaimers" },
  { id: "liability", title: "Limitation of liability" },
  { id: "indemnification", title: "Indemnification" },
  { id: "termination", title: "Termination" },
  { id: "law", title: "Governing law and disputes" },
  { id: "changes", title: "Changes to these terms" },
  { id: "contact", title: "Contact" },
];

const LAST_UPDATED = "May 13, 2026";

export default function TermsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO */}
      <section className="tp-hero dc-hero">
        <div className="wrap-wide">
          <div className="dc-hero-grid">
            <div>
              <span className="eyebrow">Terms and conditions</span>
              <h1 style={{ marginTop: 18 }}>
                The rules of using CivilCase, in <em>plain English.</em>
              </h1>
              <p className="tp-lede">
                These terms govern your use of civilcase.com and the products we
                sell through it. Read them before signing up or paying for
                anything. By using CivilCase you agree to these terms and to our{" "}
                <Link href="/privacy">privacy policy</Link> and{" "}
                <Link href="/disclaimer">disclaimer</Link>.
              </p>
              <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 12 }}>
                Last updated: {LAST_UPDATED}
              </p>
            </div>
            <div className="dc-not-firm">
              <span className="dc-not-firm-badge">Important</span>
              <h3>
                Not a law firm.
              </h3>
              <p>
                CivilCase is a technology product. Using this site does not create
                an attorney-client relationship, and nothing you tell us is
                privileged. We do not provide legal advice. See our{" "}
                <Link href="/disclaimer" style={{ color: "var(--accent)" }}>
                  disclaimer
                </Link>{" "}
                for the full picture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TOC + NUMBERED CARDS */}
      <section className="dc-body">
        <div className="wrap">
          <div className="dc-body-grid">
            <aside className="dc-toc">
              <div className="dc-toc-label">On this page</div>
              <ol>
                {sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`}>{s.title}</a>
                  </li>
                ))}
              </ol>
            </aside>

            <div className="dc-cards">
              <article id="acceptance" className="dc-card">
                <div className="num">01</div>
                <div>
                  <h3>Acceptance</h3>
                  <p>
                    By accessing or using CivilCase you agree to these terms. If you
                    do not agree, do not use the service. If you are using the
                    service on behalf of an organization, you represent that you
                    have authority to bind that organization to these terms.
                  </p>
                </div>
              </article>

              <article id="what-we-are" className="dc-card">
                <div className="num">02</div>
                <div>
                  <h3>What CivilCase is, and is not</h3>
                  <p>
                    CivilCase is a self-help legal-technology platform that helps
                    individuals and small businesses prepare procedural documents
                    (demand letters, filing guides, post-judgment collection
                    plans) for state small-claims and civil cases.
                  </p>
                  <p>
                    CivilCase is <strong>not</strong> a law firm. We do not represent
                    you, advocate for you in court, or provide legal advice. No
                    attorney-client relationship is created by using this site,
                    purchasing a product, or communicating with our staff. Nothing
                    you submit through the site is protected by attorney-client
                    privilege.
                  </p>
                </div>
              </article>

              <article id="eligibility" className="dc-card">
                <div className="num">03</div>
                <div>
                  <h3>Eligibility</h3>
                  <p>
                    To use CivilCase you must be at least eighteen years old, a
                    resident of the United States, and legally capable of entering
                    into a binding contract. CivilCase content addresses procedure
                    in state small-claims and limited civil divisions only. It does
                    not address federal court procedure or the laws of other
                    countries.
                  </p>
                </div>
              </article>

              <article id="account" className="dc-card">
                <div className="num">04</div>
                <div>
                  <h3>Your account</h3>
                  <p>
                    When you create an account you are responsible for keeping your
                    login credentials secure and for everything that happens under
                    your account. Tell us promptly if you suspect unauthorized
                    access. You must provide accurate, current information when you
                    sign up and when you update your profile.
                  </p>
                </div>
              </article>

              <article id="payments" className="dc-card">
                <div className="num">05</div>
                <div>
                  <h3>Payments and refunds</h3>
                  <p>
                    Some products are paid. Prices are shown before checkout and you
                    are charged at the time of purchase. Payments are processed by
                    Stripe; we do not store full card numbers.
                  </p>
                  <p>
                    <strong>Refund policy.</strong> Because our products are
                    digital and generated on demand, refunds are limited. If a
                    product was not delivered because of a technical issue on our
                    end, we will refund the purchase or regenerate the product at
                    your choice. We do not refund a successfully delivered product
                    because you changed your mind, settled your dispute, or were
                    unhappy with the legal outcome of your case. We do not control
                    courts, defendants, or the law, so we cannot guarantee any
                    particular result.
                  </p>
                  <p>
                    Postal-mail delivery of demand letters is handled by a
                    third-party mail vendor. Once a letter has been queued for
                    delivery it cannot be recalled or refunded. Delivery
                    timeframes are estimates and are subject to the postal service.
                  </p>
                </div>
              </article>

              <article id="use" className="dc-card">
                <div className="num">06</div>
                <div>
                  <h3>Acceptable use</h3>
                  <p>You agree not to:</p>
                  <ul>
                    <li>
                      Use the service for any unlawful purpose, including harassment,
                      defamation, or fraud.
                    </li>
                    <li>
                      Submit information that is false, misleading, or that you do
                      not have the right to submit.
                    </li>
                    <li>
                      Attempt to access another user&rsquo;s account, data, or
                      generated documents.
                    </li>
                    <li>
                      Reverse-engineer, scrape, or copy the site or its outputs at
                      scale (manual personal use of your own documents excepted).
                    </li>
                    <li>
                      Use the service to send a demand letter that you know to be
                      baseless, abusive, or threatening.
                    </li>
                    <li>
                      Resell, rebrand, or distribute CivilCase outputs as a service
                      to third parties.
                    </li>
                    <li>
                      Interfere with the operation of the site, its servers, or
                      other users.
                    </li>
                  </ul>
                </div>
              </article>

              <article id="your-content" className="dc-card">
                <div className="num">07</div>
                <div>
                  <h3>Your content</h3>
                  <p>
                    You retain ownership of everything you submit to CivilCase: the
                    facts of your case, documents you upload, names, and other case
                    inputs. By submitting content you grant us a worldwide,
                    royalty-free license to use it only for the purposes of running
                    the service for you (generating your demand letter, filing
                    guide, etc., and storing it in your account).
                  </p>
                  <p>
                    You are solely responsible for the accuracy of what you submit
                    and for any documents you sign, mail, file, or rely on. Court
                    filings carry consequences. Verify everything before acting.
                  </p>
                </div>
              </article>

              <article id="our-content" className="dc-card">
                <div className="num">08</div>
                <div>
                  <h3>Our content</h3>
                  <p>
                    The CivilCase brand, the site design, our state guides, our
                    blog posts, our demand-letter templates, and our research
                    content are owned by us or licensed to us. You may use the
                    documents we generate for you for your own legal matter. You may
                    not republish, redistribute, or copy site content for commercial
                    use without written permission.
                  </p>
                </div>
              </article>

              <article id="ai" className="dc-card">
                <div className="num">09</div>
                <div>
                  <h3>AI-generated outputs</h3>
                  <p>
                    CivilCase uses AI models to draft procedural documents and
                    research. AI can produce text that looks correct but is wrong,
                    out of date, or inapplicable to your situation. You are
                    responsible for reviewing every output before relying on it,
                    sending it, signing it, or filing it. We disclaim any guarantee
                    that AI-generated text is legally accurate, sufficient, or
                    suitable for your specific case.
                  </p>
                </div>
              </article>

              <article id="warranties" className="dc-card">
                <div className="num">10</div>
                <div>
                  <h3>Disclaimers</h3>
                  <p>
                    The service is provided on an &ldquo;as is&rdquo; and &ldquo;as
                    available&rdquo; basis. To the maximum extent permitted by law,
                    CivilCase disclaims all warranties of any kind, whether express
                    or implied, including warranties of merchantability, fitness for
                    a particular purpose, accuracy, and non-infringement.
                  </p>
                  <p>
                    We do not warrant that the site will be uninterrupted,
                    error-free, or free of harmful components. We do not warrant
                    that any information or document we provide is correct,
                    complete, current, or sufficient for your case. Court rules,
                    fees, deadlines, and forms change. Verify with the clerk before
                    filing.
                  </p>
                </div>
              </article>

              <article id="liability" className="dc-card">
                <div className="num">11</div>
                <div>
                  <h3>Limitation of liability</h3>
                  <p>
                    To the maximum extent permitted by law, CivilCase, its officers,
                    directors, employees, and agents will not be liable for any
                    indirect, incidental, special, consequential, exemplary, or
                    punitive damages, including lost profits, lost revenue, lost
                    data, or business interruption, arising out of or in connection
                    with your use of the service, even if we have been advised of
                    the possibility of such damages.
                  </p>
                  <p>
                    Our total cumulative liability to you for any claim arising
                    from or relating to the service is limited to the greater of
                    one hundred dollars ($100) or the amount you paid us in the
                    twelve months preceding the event giving rise to the claim.
                  </p>
                  <p>
                    Some jurisdictions do not allow the exclusion or limitation of
                    incidental or consequential damages, so the above limitations
                    may not apply to you in full.
                  </p>
                </div>
              </article>

              <article id="indemnification" className="dc-card">
                <div className="num">12</div>
                <div>
                  <h3>Indemnification</h3>
                  <p>
                    You agree to defend, indemnify, and hold harmless CivilCase and
                    its officers, directors, employees, and agents from and against
                    any claims, liabilities, damages, losses, and expenses,
                    including reasonable attorneys&rsquo; fees, arising out of or in
                    any way connected with your use of the service, your violation
                    of these terms, your violation of any rights of another, or any
                    document you create, send, sign, or file using outputs from the
                    service.
                  </p>
                </div>
              </article>

              <article id="termination" className="dc-card">
                <div className="num">13</div>
                <div>
                  <h3>Termination</h3>
                  <p>
                    You can stop using the service at any time. You can request
                    deletion of your account through our{" "}
                    <Link href="/contact">contact page</Link>.
                  </p>
                  <p>
                    We may suspend or terminate your access to the service if we
                    believe you have violated these terms, abused the service,
                    placed the service or other users at risk, or if we are required
                    to do so by law. Outstanding paid orders will be honored or
                    refunded at our discretion as part of the termination.
                  </p>
                </div>
              </article>

              <article id="law" className="dc-card">
                <div className="num">14</div>
                <div>
                  <h3>Governing law and disputes</h3>
                  <p>
                    These terms are governed by the laws of the State of Delaware
                    without regard to conflict-of-laws principles. You agree that
                    any dispute arising out of or relating to these terms or the
                    service will be resolved in the state or federal courts located
                    in Delaware, and you submit to the personal jurisdiction of
                    those courts. Either party may seek injunctive relief in any
                    court of competent jurisdiction for misuse of intellectual
                    property or confidential information.
                  </p>
                  <p>
                    Nothing in this section prevents you from bringing a small
                    claims case against CivilCase in your home state&rsquo;s
                    small-claims division if that division has jurisdiction over
                    your claim under your state&rsquo;s law.
                  </p>
                </div>
              </article>

              <article id="changes" className="dc-card">
                <div className="num">15</div>
                <div>
                  <h3>Changes to these terms</h3>
                  <p>
                    We may update these terms from time to time. When we do, the
                    &ldquo;last updated&rdquo; date at the top of this page changes.
                    Material changes will be highlighted on the site or sent to
                    your account email. If you continue to use the service after a
                    change takes effect, you accept the updated terms. If you do
                    not agree to the updated terms, stop using the service.
                  </p>
                </div>
              </article>

              <article id="contact" className="dc-card">
                <div className="num">16</div>
                <div>
                  <h3>Contact</h3>
                  <p>
                    Questions about these terms can be sent through our{" "}
                    <Link href="/contact">contact page</Link>.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="tp-cta">
        <div className="wrap-narrow">
          <div className="tp-cta-card">
            <h2>
              Ready to <em>get started</em>?
            </h2>
            <p>
              By using CivilCase you accept these terms. Most disputes are simple
              enough for a demand letter to resolve without filing anything.
            </p>
            <div className="hero-ctas">
              <Link className="btn btn-dark" href="/demand-letter" style={{ background: "#fef9f1", color: "var(--ink)" }}>
                Send a Demand Letter
              </Link>
              <Link className="btn btn-cream" href="/privacy">
                Privacy policy
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

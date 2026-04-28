import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "CivilCase is not a law firm and does not provide legal advice. The information on this site is general legal information for non-lawyers and is not a substitute for an attorney.",
  alternates: { canonical: "/disclaimer" },
  openGraph: {
    title: "Disclaimer — CivilCase",
    description:
      "Important: CivilCase is not a law firm and does not provide legal advice.",
    url: "/disclaimer",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Disclaimer",
  url: "https://civilcase.com/disclaimer",
  description:
    "Legal disclaimer for CivilCase users. CivilCase is not a law firm and does not provide legal advice.",
  publisher: { "@type": "Organization", name: "CivilCase", url: "https://civilcase.com" },
  inLanguage: "en-US",
};

const sections = [
  { id: "not-firm", title: "Not a law firm" },
  { id: "not-advice", title: "Not legal advice" },
  { id: "your-filings", title: "You are responsible for your filings" },
  { id: "out-of-date", title: "Information may be out of date" },
  { id: "no-guarantee", title: "No guarantee of outcome" },
  { id: "liability", title: "Limitation of liability" },
  { id: "ai", title: "Use of AI" },
  { id: "consult", title: "Consult an attorney when in doubt" },
  { id: "jurisdiction", title: "Jurisdictional limitations" },
  { id: "contact", title: "Contact" },
];

export default function DisclaimerPage() {
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
              <span className="eyebrow">Disclaimer</span>
              <h1 style={{ marginTop: 18 }}>
                Read this <em>before</em> you rely on anything we publish.
              </h1>
              <p className="tp-lede">
                CivilCase is a self-help legal-technology tool. We are not a law firm and
                we do not provide legal advice. The information on this site is general
                legal information and is not a substitute for the judgment of a licensed
                attorney considering the specific facts of your situation.
              </p>
            </div>
            <div className="dc-not-firm">
              <span className="dc-not-firm-badge">Important</span>
              <h3>
                We are <em>not</em> a law firm.
              </h3>
              <p>
                Owned and operated by a technology company. Using this site, signing up,
                or generating a demand letter does not create an attorney-client
                relationship. Nothing you tell us is privileged.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TOC + 10 NUMBERED CARDS */}
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
              <article id="not-firm" className="dc-card">
                <div className="num">01</div>
                <div>
                  <h3>Not a law firm</h3>
                  <p>
                    CivilCase is owned and operated by a technology company, not a law
                    firm. Using this site, signing up for an account, generating a demand
                    letter, or corresponding with us does not create an attorney-client
                    relationship. Nothing you tell us is protected by attorney-client
                    privilege.
                  </p>
                </div>
              </article>

              <article id="not-advice" className="dc-card">
                <div className="num">02</div>
                <div>
                  <h3>Not legal advice</h3>
                  <p>
                    The state guides, demand letter templates, and other content on
                    CivilCase are general legal information presented for educational
                    purposes. They are not tailored to your facts and do not account for
                    the dozens of circumstances that can change how the law applies to you.
                    Consult a licensed attorney in your state if your case has any of the
                    following:
                  </p>
                  <ul>
                    <li>Damages above your state&rsquo;s small-claims jurisdictional limit.</li>
                    <li>Personal injury, defamation, or other tort claims.</li>
                    <li>Disputes involving real property title, family law, or probate.</li>
                    <li>Counterclaims that exceed the small-claims cap.</li>
                    <li>Anything involving a federal claim, a government defendant, or arbitration clauses.</li>
                    <li>Any case where you face criminal exposure or a regulatory complaint.</li>
                  </ul>
                </div>
              </article>

              <article id="your-filings" className="dc-card">
                <div className="num">03</div>
                <div>
                  <h3>You are responsible for your own filings</h3>
                  <p>
                    Documents generated by CivilCase are produced from the information you
                    provide. You are solely responsible for the accuracy and completeness
                    of that information and for the legal sufficiency of any document you
                    sign, send, or file with a court. Always read documents before signing
                    or filing. Always verify deadlines, court addresses, and filing fees
                    against the official court website before relying on them.
                  </p>
                </div>
              </article>

              <article id="out-of-date" className="dc-card">
                <div className="num">04</div>
                <div>
                  <h3>Information may be out of date</h3>
                  <p>
                    State laws, court rules, fees, and forms change frequently. We work
                    hard to keep our guides current and we publish a Last updated date on
                    every state page, but we cannot guarantee that every fact is current
                    at the moment you read it. When timing matters, confirm with the
                    official source.
                  </p>
                </div>
              </article>

              <article id="no-guarantee" className="dc-card">
                <div className="num">05</div>
                <div>
                  <h3>No guarantee of outcome</h3>
                  <p>
                    CivilCase does not guarantee that you will win your case, recover
                    money, or achieve any particular outcome. Whether your case succeeds
                    depends on the facts, the evidence, the judge, and your own
                    preparation, none of which we control. Past outcomes for other
                    CivilCase users do not predict your result.
                  </p>
                </div>
              </article>

              <article id="liability" className="dc-card">
                <div className="num">06</div>
                <div>
                  <h3>Limitation of liability</h3>
                  <p>
                    To the fullest extent permitted by law, CivilCase&rsquo;s liability
                    arising from your use of this site is capped at the amount you paid us
                    in the twelve months preceding the claim. CivilCase is not liable for
                    indirect, incidental, or consequential damages, including lost
                    recovery, lost time, or court costs you paid based on information you
                    found here.
                  </p>
                </div>
              </article>

              <article id="ai" className="dc-card">
                <div className="num">07</div>
                <div>
                  <h3>Use of AI</h3>
                  <p>
                    CivilCase uses AI to draft documents and research state laws. AI
                    output is reviewed by humans before publication, but you should still
                    read every document we generate before sending or filing it. AI can
                    make mistakes, including citing statutes that don&rsquo;t apply to
                    your case or omitting requirements that do. Read the document.
                  </p>
                </div>
              </article>

              <article id="consult" className="dc-card">
                <div className="num">08</div>
                <div>
                  <h3>Consult an attorney when in doubt</h3>
                  <p>
                    CivilCase is built for the everyday disputes that don&rsquo;t justify
                    hiring a lawyer. If you&rsquo;re unsure whether your case fits that
                    description, the answer is probably to consult an attorney. Most state
                    bars run a lawyer referral service that will connect you with a
                    licensed attorney for a short, low-cost consultation.
                  </p>
                </div>
              </article>

              <article id="jurisdiction" className="dc-card">
                <div className="num">09</div>
                <div>
                  <h3>Jurisdictional limitations</h3>
                  <p>
                    CivilCase is intended for use only by individuals and small businesses
                    pursuing claims in U.S. small-claims, justice, or comparable
                    trial-level courts in the fifty United States and the District of
                    Columbia. We do not provide content for federal court litigation,
                    tribal court matters, international disputes, or any matter outside
                    the United States.
                  </p>
                </div>
              </article>

              <article id="contact" className="dc-card">
                <div className="num">10</div>
                <div>
                  <h3>Contact</h3>
                  <p>
                    Questions about this disclaimer or our terms of use can be sent to{" "}
                    <a href="mailto:legal@civilcase.com">legal@civilcase.com</a>. By using
                    CivilCase you acknowledge that you have read and understood this
                    disclaimer.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* WHEN TO HIRE A LAWYER */}
      <section className="dc-when">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">When to hire a lawyer</span>
            <h2>
              Self-help has <em>limits.</em>
            </h2>
            <p>
              CivilCase fits the everyday disputes. These six situations are not
              everyday. Get a lawyer.
            </p>
          </div>
          <div className="dc-when-grid">
            <div className="dc-when-card">
              <div className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 2v20M2 12h20" />
                </svg>
              </div>
              <h4>Damages over the cap</h4>
              <p>If your loss exceeds your state&rsquo;s small-claims limit, you need a higher court — and probably counsel.</p>
            </div>
            <div className="dc-when-card">
              <div className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 8v4l3 2" /><circle cx="12" cy="12" r="9" />
                </svg>
              </div>
              <h4>Personal injury or tort</h4>
              <p>Injury cases turn on medical evidence and contingency arrangements. Most plaintiff-side lawyers take these for free up front.</p>
            </div>
            <div className="dc-when-card">
              <div className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 9h6v6H9z" />
                </svg>
              </div>
              <h4>Real property disputes</h4>
              <p>Title, boundary, and easement disputes belong in superior or chancery court, not small claims.</p>
            </div>
            <div className="dc-when-card">
              <div className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <h4>Family or probate</h4>
              <p>Divorce, custody, support, estates, and trusts have their own court systems and procedural rules.</p>
            </div>
            <div className="dc-when-card">
              <div className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="9" /><path d="M9 9l6 6M15 9l-6 6" />
                </svg>
              </div>
              <h4>Criminal exposure</h4>
              <p>If facts could trigger criminal liability or regulatory action, do not file anything without a defense attorney.</p>
            </div>
            <div className="dc-when-card">
              <div className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M3 12h18M12 3v18" /><circle cx="12" cy="12" r="9" />
                </svg>
              </div>
              <h4>Federal claims or government</h4>
              <p>Bankruptcy, patents, trademarks, employment-discrimination claims, or suits against the U.S. or state aren&rsquo;t small-claims matters.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="tp-cta">
        <div className="wrap-narrow">
          <div className="tp-cta-card">
            <h2>
              Still want to <em>get started</em>?
            </h2>
            <p>
              Most disputes are simple enough for a demand letter to resolve without
              filing anything. Try ours.
            </p>
            <div className="hero-ctas">
              <Link className="btn btn-dark" href="/demand-letter" style={{ background: "#fef9f1", color: "var(--ink)" }}>
                Send a Demand Letter
              </Link>
              <Link className="btn btn-cream" href="/about">
                About CivilCase
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

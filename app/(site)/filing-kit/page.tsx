import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle2,
  ShieldCheck,
  Mail,
  FileText,
  Award,
  MapPin,
  FileCheck,
  UserCheck,
  ArrowRight,
  BarChart3,
  Lock,
  Target,
  TrendingUp,
  Calendar,
  Gavel,
  Scale,
  Landmark,
  Folder,
  Headphones,
  Star,
  Briefcase,
  Banknote,
} from "lucide-react";
import StartCaseButton from "../../../components/StartCaseButton";
import FaqSection from "../../../components/FaqSection";

export const metadata: Metadata = {
  title: "Small Claims Filing Kit — $79",
  description:
    "State- and county-specific small-claims filing kit. The right forms, the exact filing fee, service-of-process options, and a hearing-day checklist. File in under an hour.",
  alternates: { canonical: "/filing-kit" },
  openGraph: {
    title: "Small Claims Filing Kit — CivilCase",
    description:
      "Everything you need to file your small-claims case the right way the first time.",
    url: "/filing-kit",
    type: "website",
  },
};

const SITE_URL = "https://civilcase.com";

const FAQS: { q: string; a: string }[] = [
  {
    q: "What's in the Filing Kit?",
    a: "A state-specific filing guide: where to file (court name + venue rules), every required form with code and link to the current PDF, the filing fee schedule and fee-waiver eligibility, pre-suit requirements (demand letter, government claim, mediation if applicable), all allowed service-of-process methods with cost and deadlines, hearing-day preparation, and the most common pitfalls that get cases dismissed.",
  },
  {
    q: "Will it work for my state?",
    a: "Yes. We cover all 50 states plus DC. Each guide is built from your state's small-claims rules — forms, fees, statute, service methods — with county-difference notes appended where your county varies from the state default.",
  },
  {
    q: "Do I have to use this with a CivilCase demand letter?",
    a: "No. The Filing Kit is sold standalone. Whether you sent your own letter, used another service, or are skipping the letter step entirely, the kit gives you everything you need to file.",
  },
  {
    q: "What about service of process?",
    a: "The kit walks you through the three legal ways to serve the defendant in your state (sheriff, certified mail through the clerk, or process server), with the cost of each and which one is most likely to work for your specific defendant.",
  },
  {
    q: "Can you file for me?",
    a: "No — most states require the plaintiff to file in person or via the court's e-filing portal directly. We give you everything you need to do it yourself in under an hour, including which window in the courthouse to look for.",
  },
  {
    q: "What if I lose?",
    a: "Most plaintiffs who prepare properly win small claims. If the court rules against you, the loss is around $30 to $100 in filing fees (which the kit told you about up front). Many states let you appeal within 30 days, and the kit covers what that looks like.",
  },
  {
    q: "What if I win?",
    a: "Add the Post-Judgment Collection Plan ($49) to actually collect on your judgment. Winning is half the battle — collecting is the other half.",
  },
  {
    q: "Is CivilCase a law firm?",
    a: "No. We're a document-preparation service, not a law firm, and we don't provide legal advice. The Filing Kit is informational — based on public court rules and statutes — to help you represent yourself.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${SITE_URL}/filing-kit#service`,
      name: "CivilCase Small Claims Filing Kit",
      serviceType: "Small Claims Filing Guide and Forms",
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: { "@type": "Country", name: "United States" },
      url: `${SITE_URL}/filing-kit`,
      description:
        "State- and county-specific small claims filing kit: forms, fees, service of process, courthouse details, and hearing-day checklist.",
      audience: { "@type": "Audience", audienceType: "Self-represented plaintiffs" },
      offers: [
        {
          "@type": "Offer",
          name: "Small Claims Filing Kit",
          price: "79.00",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: `${SITE_URL}/filing-kit`,
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/filing-kit#faq`,
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function FilingKitPage() {
  return (
    <main className="cat-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HERO */}
      <header className="dl-hero-v2">
        <div className="wrap dl-hero-v2-grid">
          <div className="dl-hero-v2-copy">
            <h1 className="dl-hero-v2-title">
              File your case the <em>right way.</em>
            </h1>
            <p className="dl-hero-v2-lede">
              Every small-claims court has its own forms, fees, and service rules.
              The Filing Kit packages all of it into one place for your exact
              county. File in under an hour. Show up to court prepared.
            </p>
            <ul className="dl-hero-v2-checks">
              <li>
                <Award size={18} strokeWidth={1.7} />
                Every form with code and link for your state
              </li>
              <li>
                <Banknote size={18} strokeWidth={1.7} />
                Filing fee schedule + fee-waiver eligibility
              </li>
              <li>
                <Scale size={18} strokeWidth={1.7} />
                All allowed service-of-process methods
              </li>
              <li>
                <FileCheck size={18} strokeWidth={1.7} />
                Venue rules, hearing prep, common pitfalls
              </li>
            </ul>
            <div className="dl-hero-v2-ctas">
              <StartCaseButton className="btn btn-green btn-lg dl-hero-v2-cta-primary">
                <FileText size={20} strokeWidth={1.9} />
                Get My Filing Kit
                <ArrowRight size={18} strokeWidth={2} />
              </StartCaseButton>
            </div>
            <ul className="dl-hero-v2-trust">
              <li>
                <MapPin size={22} strokeWidth={1.7} />
                <div>
                  <strong>All 50 states</strong>
                  <span>plus DC</span>
                </div>
              </li>
              <li>
                <Landmark size={22} strokeWidth={1.7} />
                <div>
                  <strong>County-specific</strong>
                  <span>not generic templates</span>
                </div>
              </li>
              <li>
                <FileCheck size={22} strokeWidth={1.7} />
                <div>
                  <strong>Current rules</strong>
                  <span>checked monthly</span>
                </div>
              </li>
            </ul>
          </div>
          <div className="dl-hero-v2-visual">
            <article className="dl-incl-letter">
              <header className="dl-incl-letter-head">
                <div>
                  <span className="dl-incl-letter-brand">CIVILCASE</span>
                  <span className="dl-incl-letter-sub">FILING KIT</span>
                </div>
                <span className="dl-incl-letter-date">Los Angeles County</span>
              </header>
              <div className="dl-incl-letter-rule" />
              <div className="dl-incl-letter-body">
                <p><strong>COURT:</strong><br />Stanley Mosk Courthouse, Dept. 77<br />111 N Hill St, Los Angeles, CA 90012</p>
                <p><strong>FORMS:</strong><br />SC-100 · SC-104 · SC-130</p>
                <p>Filing fee: <strong>$75</strong> (claims $1,500–$5,000).</p>
                <p>Statute of limitations: <strong>4 years</strong> from breach.</p>
                <p><strong>Hearing window: 30–70 days from filing.</strong></p>
              </div>
              <Image
                src="/icons/cc-seal-1.webp"
                alt=""
                width={120}
                height={120}
                className="dl-incl-seal-img"
                aria-hidden
              />
            </article>
          </div>
        </div>
      </header>

      {/* WHY THE FILING KIT WORKS */}
      <section className="dl-whyD-band">
        <div className="wrap dl-whyD-grid">
          <div className="dl-whyD-left">
            <span className="dl-incl-eyebrow">Why the Filing Kit Works</span>
            <h2 className="dl-incl-title">
              The right paperwork is <em>half the battle.</em>
            </h2>
            <p className="dl-incl-sub">
              Most self-represented plaintiffs lose on a technicality — wrong
              form, wrong fee, wrong service. The kit removes the guesswork.
            </p>
          </div>

          <div className="dl-whyD-mid">
            <article className="dl-incl-letter">
              <header className="dl-incl-letter-head">
                <div>
                  <span className="dl-incl-letter-brand">CIVILCASE</span>
                  <span className="dl-incl-letter-sub">FILING KIT</span>
                </div>
                <span className="dl-incl-letter-date">Los Angeles County</span>
              </header>
              <div className="dl-incl-letter-rule" />
              <div className="dl-incl-letter-body">
                <p><strong>TO:</strong><br />
                  Stanley Mosk Courthouse<br />
                  111 N Hill St<br />
                  Los Angeles, CA 90012
                </p>
                <p><strong>RE:</strong><br />Small Claims Filing (Jordan Reyes v. ABC Construction LLC)</p>
                <p>
                  Filing fee enclosed: $75.00 (claim amount $4,800).
                </p>
                <p><strong>Forms attached: SC-100 (Plaintiff&rsquo;s Claim), SC-104 (Proof of Service).</strong></p>
                <p>
                  Service of process will be completed by sheriff at least 15 days before the hearing.
                </p>
              </div>
            </article>
          </div>

          <div className="dl-whyD-right">
            <div className="dl-whyA-stack">
              <article className="dl-whyA-card dl-whyA-card-back">
                <span className="dl-whyA-card-icon"><Landmark size={22} strokeWidth={1.7} /></span>
                <h3>Personalized to Your Court</h3>
                <p>Not a generic template. The kit is built around the exact courthouse where you&rsquo;ll file.</p>
              </article>
              <article className="dl-whyA-card dl-whyA-card-mid">
                <span className="dl-whyA-card-icon"><Scale size={22} strokeWidth={1.7} /></span>
                <h3>Right Forms, Right Order</h3>
                <p>We know which form comes first and which the clerk will reject without. No second trip.</p>
              </article>
              <article className="dl-whyA-card dl-whyA-card-front">
                <span className="dl-whyA-card-icon"><Gavel size={22} strokeWidth={1.7} /></span>
                <h3>Hearing-Day Game Plan</h3>
                <p>The judge will ask the same questions every time. We tell you what they are and how to answer them.</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="dl-section-cream dl-how-band">
        <div className="wrap">
          <div className="dl-how-head">
            <span className="dl-how-eyebrow">How it works</span>
            <h2 className="dl-how-title">
              Four steps. <em>One filing.</em>
            </h2>
            <p className="dl-how-sub">
              From buying the kit to walking out of the clerk&rsquo;s office with a filed case — usually under 24 hours.
            </p>
          </div>

          <ol className="dl-how-steps">
            <li className="dl-how-step">
              <div className="dl-how-arch">
                <span className="dl-how-num">01</span>
                <Image src="/icons/whathappened.webp" alt="" width={260} height={200} className="dl-how-img" />
              </div>
              <h3>Tell Us About Your Case</h3>
              <p>Plaintiff, defendant, amount, state, county. We pull the live filing rules for that exact courthouse.</p>
            </li>

            <li className="dl-how-step">
              <div className="dl-how-arch">
                <span className="dl-how-num">02</span>
                <Image src="/icons/demandletter.webp" alt="" width={260} height={200} className="dl-how-img" />
              </div>
              <h3>We Build Your Kit</h3>
              <p>Within minutes you get a personalized PDF: the right forms, the current filing fee, and a hearing-day checklist.</p>
            </li>

            <li className="dl-how-step">
              <div className="dl-how-arch">
                <span className="dl-how-num">03</span>
                <Image src="/icons/certifiedmail.webp" alt="" width={260} height={200} className="dl-how-img" />
              </div>
              <h3>You File</h3>
              <p>Walk into the courthouse (or use the e-filing portal) with everything you need. Most filings take under an hour.</p>
            </li>

            <li className="dl-how-step">
              <div className="dl-how-arch">
                <span className="dl-how-num">04</span>
                <Image src="/icons/courthouse.webp" alt="" width={260} height={200} className="dl-how-img" />
              </div>
              <h3>Show Up Prepared</h3>
              <p>On hearing day, follow the checklist: what to bring, how to present, what the judge will ask, the order of events.</p>
            </li>
          </ol>
        </div>
      </section>

      {/* FINAL CTA — early instance, matches demand-letter */}
      <section className="dl-finalv2 dl-finalv2-dark">
        <div className="wrap">
          <div className="dl-finalv2-card">
            <div className="dl-finalv2-top">
              <Image src="/icons/cta-letter.webp" alt="" width={96} height={96} className="dl-finalv2-icon-img" aria-hidden />
              <div className="dl-finalv2-copy">
                <h2>
                  Ready to <em>file your case?</em>
                </h2>
                <p>No account. No subscription. Just results.</p>
              </div>
              <div className="dl-finalv2-cta">
                <StartCaseButton className="dl-finalv2-btn">
                  Start My Filing Kit
                  <ArrowRight size={18} strokeWidth={2.2} />
                </StartCaseButton>
                <span className="dl-finalv2-meta">
                  Takes about 5 minutes <span className="dl-finalv2-dot">&bull;</span> $79 one-time
                </span>
              </div>
            </div>
          </div>

          <div className="dl-promise-trust">
            <span className="dl-promise-trust-icon">
              <ShieldCheck size={28} strokeWidth={1.8} />
            </span>
            <strong>Trusted by thousands.</strong>
            <span className="dl-promise-trust-sep">Backed by results.</span>
            <span className="dl-promise-stars" aria-label="5 out of 5 stars">
              <Star size={18} fill="currentColor" strokeWidth={0} />
              <Star size={18} fill="currentColor" strokeWidth={0} />
              <Star size={18} fill="currentColor" strokeWidth={0} />
              <Star size={18} fill="currentColor" strokeWidth={0} />
              <Star size={18} fill="currentColor" strokeWidth={0} />
            </span>
            <span className="dl-promise-trust-rating">4.9/5 average rating</span>
          </div>
        </div>
      </section>

      {/* WHAT'S IN THE KIT — anatomy diagram with annotated kit mockup */}
      <section className="dl-what-band">
        <div className="wrap dl-what-grid">
          <div className="dl-what-head">
            <span className="dl-what-eyebrow">What&rsquo;s in the Kit</span>
            <h2 className="dl-what-title">
              Built specifically for <em>your courthouse</em>.
            </h2>
            <p className="dl-what-sub">
              Every kit follows the same structure: the right forms, the exact fee, the service rules, the deadline, the hearing-day plan.
            </p>
          </div>

          <div className="dl-anno-wrap">
            <article className="dl-anno-letter">
              <header className="dl-anno-head">
                <div>
                  <span className="dl-anno-brand">CIVILCASE</span>
                  <span className="dl-anno-sub">FILING KIT · LA COUNTY</span>
                </div>
                <span className="dl-anno-date">May 21, 2026</span>
              </header>
              <div className="dl-anno-rule" />

              <div className="dl-anno-meta">
                <div><span>COURT:</span><p>Stanley Mosk Courthouse, Dept. 77</p></div>
                <div><span>RE:</span><p>Jordan Reyes v. ABC Construction LLC</p></div>
              </div>

              <p className="dl-anno-p">
                File{" "}
                <strong className="dl-anno-mark" data-anno="law">Form SC-100 (Plaintiff&rsquo;s Claim)</strong>
                {" "}with the clerk. Filing fee for a $4,800 claim is{" "}
                <strong className="dl-anno-mark" data-anno="penalty">$75.00</strong>.
              </p>

              <p className="dl-anno-p">
                Statute of limitations expires{" "}
                <strong className="dl-anno-mark" data-anno="deadline">March 3, 2028</strong>:
              </p>

              <ul className="dl-anno-bullets">
                <li>Serve defendant via sheriff or certified mail at least 15 days before hearing;</li>
                <li>
                  <span className="dl-anno-mark" data-anno="next">
                    Bring all evidence + 2 copies to the hearing
                  </span>.
                </li>
              </ul>

              <p className="dl-anno-p">
                <strong>Hearing window: 30–70 days from filing.</strong>{" "}
                <span className="dl-anno-mark" data-anno="evidence">
                  Checklist included for hearing-day prep
                </span>.
              </p>

              <p className="dl-anno-sig">Jordan A. Reyes</p>
              <p className="dl-anno-name" data-anno="evidence">Jordan A. Reyes</p>

              <Image
                src="/icons/cc-seal-1.webp"
                alt=""
                width={120}
                height={120}
                className="dl-anno-seal-img"
                aria-hidden
              />
            </article>

            <aside className="dl-anno-side" aria-hidden>
              <div className="dl-anno-callout" data-pos="law">
                <strong>Every form, every link</strong>
                <span>Form codes with direct links to the current PDF.</span>
              </div>
              <div className="dl-anno-callout" data-pos="penalty">
                <strong>Filing fee + waiver</strong>
                <span>Fee schedule for your claim band, plus fee-waiver eligibility.</span>
              </div>
              <div className="dl-anno-callout" data-pos="deadline">
                <strong>Statute of limitations</strong>
                <span>The deadline by which you must file or lose the case forever.</span>
              </div>
              <div className="dl-anno-callout" data-pos="next">
                <strong>Service-of-process options</strong>
                <span>Every allowed method with cost, deadlines, and proof form.</span>
              </div>
              <div className="dl-anno-callout" data-pos="evidence">
                <strong>Hearing prep + pitfalls</strong>
                <span>What to bring, how to present, and what gets cases dismissed.</span>
              </div>
            </aside>
          </div>

          <div className="dl-what-foot dl-what-foot-left">
            <span className="dl-what-foot-icon dl-what-foot-icon-dark">
              <ShieldCheck size={20} strokeWidth={1.8} />
            </span>
            <div>
              <strong>Personalized. Sequenced. Court-Ready.</strong>
              <span>Built for your exact courthouse — not a generic national template.</span>
            </div>
          </div>

          <div className="dl-what-foot dl-what-foot-cream">
            <span className="dl-what-foot-icon dl-what-foot-icon-cream">
              <Landmark size={20} strokeWidth={1.8} />
            </span>
            <div>
              <strong>50 states. 3,000+ counties.</strong>
              <span>Every kit pulls the current local rules and fees, not stale national defaults.</span>
            </div>
          </div>
        </div>
      </section>

      {/* BENTO CASE STUDY */}
      <section className="dl-bento-band">
        <div className="wrap">
        <div className="dl-bento-shell">
        <div className="dl-bento-grid">
          <div className="dl-bento-left">
            <div className="dl-bento-card-top">
              <div>
                <h2 className="dl-bento-title">
                  Filing made <em>simple</em>
                </h2>
                <p className="dl-bento-body">
                  We ask plain-language questions about your case, pull the exact
                  rules for your county courthouse, and assemble a personalized
                  filing pack. You walk into the clerk&rsquo;s office prepared.
                </p>
              </div>
            </div>

            <div className="dl-bento-card-bot">
              <div className="dl-bento-cs-head">
                <div className="dl-bento-brand">
                  <Scale size={22} strokeWidth={2} />
                  <span>CIVILCASE</span>
                </div>
                <Link href="/small-claims" className="dl-bento-cs-cta">
                  See State Guides
                </Link>
              </div>
              <div className="dl-bento-stats">
                <div className="dl-bento-stat">
                  <strong>50</strong>
                  <span>States covered with case-specific rules</span>
                </div>
                <div className="dl-bento-stat">
                  <strong>3,000+</strong>
                  <span>Counties with local filing rules tracked</span>
                </div>
                <div className="dl-bento-stat">
                  <strong>$30–$200</strong>
                  <span>Typical filing fee range, scales by claim amount</span>
                </div>
              </div>
            </div>
          </div>

          <div className="dl-bento-right">
            <div className="dl-bento-dash">
              <aside className="dl-bento-dash-side" aria-hidden>
                <div className="dl-bento-dash-brand">
                  <span className="dl-bento-dash-brand-mark">C</span>
                  <span className="dl-bento-dash-brand-name">CivilCase</span>
                </div>
                <nav className="dl-bento-dash-nav">
                  <span><BarChart3 size={14} strokeWidth={1.8} /> Dashboard</span>
                  <span className="is-active"><Folder size={14} strokeWidth={1.8} /> Cases</span>
                  <span><Mail size={14} strokeWidth={1.8} /> Notifications</span>
                  <span><FileText size={14} strokeWidth={1.8} /> Billing</span>
                  <span><Headphones size={14} strokeWidth={1.8} /> Support</span>
                </nav>
              </aside>

              <div className="dl-bento-dash-main-area">
                <ol className="dl-bento-dash-phases">
                  <li className="is-done"><span>1</span><span>Case info</span></li>
                  <li className="is-done"><span>2</span><span>Court</span></li>
                  <li className="is-active"><span>3</span><span>Defendant</span></li>
                  <li><span>4</span><span>Service</span></li>
                  <li><span>5</span><span>Filing</span></li>
                  <li><span>6</span><span>Hearing</span></li>
                </ol>

                <div className="dl-bento-dash-body">
                  <div className="dl-bento-dash-main">
                    <div className="dl-bento-wiz-eyebrow">Phase 3 of 6 &middot; Defendant</div>
                    <h3 className="dl-bento-wiz-q">Who are you suing?</h3>
                    <p className="dl-bento-wiz-sub">
                      Their full legal name and last known address. We&rsquo;ll match it to the Secretary of State if a business.
                    </p>

                    <div className="dl-bento-wiz-pills" aria-hidden>
                      <span className="dl-bento-wiz-pill dl-bento-wiz-pill-on">
                        <UserCheck size={14} strokeWidth={1.9} />
                        Individual
                      </span>
                      <span className="dl-bento-wiz-pill">
                        <Briefcase size={14} strokeWidth={1.9} />
                        Business
                      </span>
                    </div>

                    <div className="dl-bento-wiz-fields">
                      <div className="dl-bento-wiz-row">
                        <div className="dl-bento-wiz-field">
                          <label>Defendant name <em>*</em></label>
                          <div className="dl-bento-wiz-input">ABC Construction LLC</div>
                        </div>
                      </div>
                      <div className="dl-bento-wiz-row">
                        <div className="dl-bento-wiz-field">
                          <label>Street address</label>
                          <div className="dl-bento-wiz-input">123 Business Way</div>
                        </div>
                        <div className="dl-bento-wiz-field">
                          <label>City / state</label>
                          <div className="dl-bento-wiz-input">Los Angeles, CA</div>
                        </div>
                      </div>
                    </div>

                    <div className="dl-bento-wiz-actions">
                      <span className="dl-bento-wiz-back">Back</span>
                      <span className="dl-bento-wiz-next">
                        Continue
                        <ArrowRight size={14} strokeWidth={2.4} />
                      </span>
                    </div>
                  </div>

                  <aside className="dl-bento-dash-rail" aria-hidden>
                    <div className="dl-bento-rail-card">
                      <div className="dl-bento-rail-coach">
                        <span className="dl-bento-rail-avatar">CC</span>
                        <div>
                          <strong>CivilCase</strong>
                          <span>Step 3 of 6</span>
                        </div>
                      </div>
                      <p>Use the defendant&rsquo;s legal name. We&rsquo;ll match it to the Secretary of State.</p>
                    </div>

                    <div className="dl-bento-rail-card">
                      <div className="dl-bento-rail-progress-head">
                        <span>Kit complete</span>
                        <strong>2/6</strong>
                      </div>
                      <div className="dl-bento-rail-progress-bar">
                        <span style={{ width: "33%" }} />
                      </div>
                      <span className="dl-bento-rail-band">Court selected</span>
                    </div>

                    <div className="dl-bento-rail-card">
                      <div className="dl-bento-rail-prev-head">
                        <span>Filing Kit</span>
                        <span className="dl-bento-rail-prev-fill">0/5</span>
                      </div>
                      <dl className="dl-bento-rail-prev-rows">
                        <div><dt>Court</dt><dd>Stanley Mosk</dd></div>
                        <div><dt>Forms</dt><dd>SC-100, SC-104</dd></div>
                        <div><dt>Fee</dt><dd>$75</dd></div>
                        <div><dt>SOL</dt><dd>—</dd></div>
                      </dl>
                    </div>
                  </aside>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="dl-section-cream dl-pricing-band dl-pricing-band-green">
        <div className="wrap">
          <div className="dl-price-head">
            <span className="dl-price-eyebrow">Pricing</span>
            <h2 className="dl-price-title">
              One price. <em>Everything you need.</em>
            </h2>
            <p className="dl-price-sub">
              No subscriptions. No upsells you have to dodge. One flat fee, complete kit.
            </p>
          </div>

          <div className="dl-price-grid dl-price-grid-single">
            <div className="dl-price-card dl-price-card-featured">
              <span className="dl-price-ribbon">Filing Kit</span>
              <div className="dl-price-card-head dl-price-card-head-dark">
                <span className="dl-price-icon dl-price-icon-red">
                  <Landmark size={26} strokeWidth={1.8} />
                </span>
                <div>
                  <h3>Small Claims Filing Kit</h3>
                  <p>
                    Personalized to your county.
                    <br />
                    Files in under an hour.
                  </p>
                </div>
              </div>

              <div className="dl-price-card-body">
                <div className="dl-price-amount-row">
                  <span className="dl-price-amount">$79</span>
                  <span className="dl-price-meta">one-time</span>
                </div>

                <div className="dl-price-stat dl-price-stat-red">
                  <Target size={22} strokeWidth={1.8} />
                  <div>
                    <strong>Built for your courthouse</strong>
                    <span>not a generic template.</span>
                  </div>
                </div>

                <div className="dl-price-includes">
                  <span className="dl-price-includes-label dl-price-includes-label-red">
                    Includes:
                  </span>
                  <ul>
                    <li><CheckCircle2 size={22} strokeWidth={2} /> Where to file: court name + venue rules</li>
                    <li><CheckCircle2 size={22} strokeWidth={2} /> Every required form with code &amp; PDF link</li>
                    <li><CheckCircle2 size={22} strokeWidth={2} /> Filing fee schedule + fee-waiver eligibility</li>
                    <li><CheckCircle2 size={22} strokeWidth={2} /> Pre-suit requirements (demand, gov claim, mediation)</li>
                    <li><CheckCircle2 size={22} strokeWidth={2} /> All allowed service-of-process methods</li>
                    <li><CheckCircle2 size={22} strokeWidth={2} /> Hearing prep + common pitfalls</li>
                  </ul>
                </div>

                <div className="dl-price-level">
                  <span className="dl-price-level-label">Preparation Level</span>
                  <span className="dl-price-dots dl-price-dots-red">
                    <span className="on" /><span className="on" /><span className="on" /><span className="on" /><span className="on" />
                  </span>
                </div>

                <StartCaseButton className="dl-price-cta dl-price-cta-dark">
                  Get My Filing Kit
                  <ArrowRight size={18} strokeWidth={2} />
                </StartCaseButton>

                <p className="dl-price-foot dl-price-foot-red">
                  Best for when the demand letter was ignored or you&rsquo;re ready to skip straight to court.
                </p>
              </div>
            </div>
          </div>

          <ul className="dl-tbar">
            <li>
              <span className="dl-tbar-icon"><ShieldCheck size={22} strokeWidth={1.7} /></span>
              <div>
                <strong>Used in every state</strong>
                <p>Self-represented plaintiffs in all 50 states plus DC.</p>
              </div>
            </li>
            <li>
              <span className="dl-tbar-icon"><Lock size={22} strokeWidth={1.7} /></span>
              <div>
                <strong>Secure &amp; Private</strong>
                <p>Your case info is always protected.</p>
              </div>
            </li>
            <li>
              <span className="dl-tbar-icon"><MapPin size={22} strokeWidth={1.7} /></span>
              <div>
                <strong>County-Specific</strong>
                <p>Rules and fees for your exact courthouse.</p>
              </div>
            </li>
            <li>
              <span className="dl-tbar-icon"><Award size={22} strokeWidth={1.7} /></span>
              <div>
                <strong>Up-to-Date</strong>
                <p>Court rules and fees are checked monthly.</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <FaqSection
        faqs={FAQS}
        sub="Everything you need to know about your state-specific filing kit and what happens after."
      />
    </main>
  );
}

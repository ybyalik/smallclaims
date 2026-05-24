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
  Search,
  Headphones,
  Star,
  Briefcase,
  Banknote,
  HandCoins,
  Clock,
} from "lucide-react";
import StartCaseButton from "../../../components/StartCaseButton";
import FaqSection from "../../../components/FaqSection";

export const metadata: Metadata = {
  title: "Post-Judgment Collection Plan — $49",
  description:
    "Won your small-claims case? Now actually collect. State-specific judgment-debtor exam, bank levy, wage garnishment, lien recording, and renewal calendar.",
  alternates: { canonical: "/collection-plan" },
  openGraph: {
    title: "Post-Judgment Collection Plan — CivilCase",
    description:
      "Step-by-step plan to enforce your small-claims judgment and turn it into money in your pocket.",
    url: "/collection-plan",
    type: "website",
  },
};

const SITE_URL = "https://civilcase.com";

const FAQS: { q: string; a: string }[] = [
  {
    q: "Why do I need this if I already won?",
    a: "Winning the case is half the battle. The court doesn't collect for you — it just hands you a piece of paper that says the defendant owes you money. Roughly 50% of small-claims winners never actually collect because they don't know the next steps. This plan walks you through them.",
  },
  {
    q: "What's in the Collection Plan?",
    a: "A personalized sequence of enforcement steps for your state — debtor exam, wage garnishment, bank levy, writ of execution, abstract of judgment — with the exact form codes, fees, and links to the PDFs. Plus your state's exemption catalog (what the defendant gets to keep), the defendant's claim-of-exemption playbook, satisfaction-of-judgment instructions, the judgment renewal deadline, and your county's self-help center contact.",
  },
  {
    q: "What if the defendant has no money?",
    a: "Judgments stay enforceable for years (typically 10 to 20, varies by state). The plan tells you your state's renewal interval so you can refile before yours expires. Recording the judgment as a lien against real estate is one of the included steps — once recorded, it follows the defendant and attaches to property they may buy or sell down the road.",
  },
  {
    q: "Do I need a lawyer to enforce a judgment?",
    a: "No. Every collection mechanism — judgment-debtor exam, levy, garnishment, lien — is available to self-represented plaintiffs. The forms exist for non-lawyers. The plan tells you which form, which fee, and what order to file them.",
  },
  {
    q: "How long does collection take?",
    a: "Varies wildly. Wage garnishment on an employed defendant can start paying within 60 days. A bank levy on a known account can produce funds within 30 days. A judgment lien against real estate may not produce money until the defendant sells the property, which could be years.",
  },
  {
    q: "What about interest?",
    a: "Most states accrue post-judgment interest at 6% to 10% per year on unpaid amounts. The plan covers your state's rate and how to claim accrued interest when you do collect.",
  },
  {
    q: "Can I use this if I won outside small claims?",
    a: "Yes for most US civil judgments. The mechanics of post-judgment collection are largely the same across small claims, district court, and superior court. The plan focuses on small-claims judgments but the steps apply to most civil money judgments under $25,000.",
  },
  {
    q: "Is CivilCase a law firm?",
    a: "No. We're a document-preparation service, not a law firm, and we don't provide legal advice. The Collection Plan is informational — based on public court rules and statutes — to help you enforce your judgment.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${SITE_URL}/collection-plan#service`,
      name: "CivilCase Post-Judgment Collection Plan",
      serviceType: "Small Claims Judgment Enforcement",
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: { "@type": "Country", name: "United States" },
      url: `${SITE_URL}/collection-plan`,
      description:
        "State-specific post-judgment collection plan: judgment-debtor exam, bank levy, wage garnishment, lien recording, and renewal playbook.",
      audience: {
        "@type": "Audience",
        audienceType: "Self-represented plaintiffs with civil money judgments",
      },
      offers: [
        {
          "@type": "Offer",
          name: "Post-Judgment Collection Plan",
          price: "49.00",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: `${SITE_URL}/collection-plan`,
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/collection-plan#faq`,
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function CollectionPlanPage() {
  return (
    <main className="cat-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HERO */}
      <header className="dl-hero-v2">
        <div className="wrap dl-hero-v2-grid">
          <div className="dl-hero-v2-copy">
            <h1 className="dl-hero-v2-title">
              Won your case? <em>Now actually collect.</em>
            </h1>
            <p className="dl-hero-v2-lede">
              The court doesn&rsquo;t enforce your judgment for you. Half of
              small-claims winners never collect because they don&rsquo;t know
              the next steps. The Collection Plan gives you the playbook.
            </p>
            <ul className="dl-hero-v2-checks">
              <li>
                <Gavel size={18} strokeWidth={1.7} />
                Sequenced step-by-step plan tailored to your case
              </li>
              <li>
                <Banknote size={18} strokeWidth={1.7} />
                Every enforcement form with code, fee, and link
              </li>
              <li>
                <Folder size={18} strokeWidth={1.7} />
                State exemption catalog: what&rsquo;s protected
              </li>
              <li>
                <Calendar size={18} strokeWidth={1.7} />
                Judgment renewal deadline + post-judgment interest rate
              </li>
            </ul>
            <div className="dl-hero-v2-ctas">
              <StartCaseButton className="btn btn-green btn-lg dl-hero-v2-cta-primary">
                <HandCoins size={20} strokeWidth={1.9} />
                Get My Collection Plan
                <ArrowRight size={18} strokeWidth={2} />
              </StartCaseButton>
            </div>
            <ul className="dl-hero-v2-trust">
              <li>
                <MapPin size={22} strokeWidth={1.7} />
                <div>
                  <strong>All 50 states</strong>
                  <span>state-specific steps</span>
                </div>
              </li>
              <li>
                <Scale size={22} strokeWidth={1.7} />
                <div>
                  <strong>Sequenced</strong>
                  <span>not a checklist dump</span>
                </div>
              </li>
              <li>
                <TrendingUp size={22} strokeWidth={1.7} />
                <div>
                  <strong>Interest tracked</strong>
                  <span>your state&rsquo;s rate</span>
                </div>
              </li>
            </ul>
          </div>
          <div className="dl-hero-v2-visual">
            <article className="dl-incl-letter">
              <header className="dl-incl-letter-head">
                <div>
                  <span className="dl-incl-letter-brand">CIVILCASE</span>
                  <span className="dl-incl-letter-sub">COLLECTION PLAN</span>
                </div>
                <span className="dl-incl-letter-date">California</span>
              </header>
              <div className="dl-incl-letter-rule" />
              <div className="dl-incl-letter-body">
                <p><strong>Step 1 — Judgment-debtor exam</strong><br />File SC-134. Subpoena defendant for asset disclosure under oath.</p>
                <p><strong>Step 2 — Bank levy</strong><br />File EJ-152. $40 fee. 30-day hold.</p>
                <p><strong>Step 3 — Wage garnishment</strong><br />File WG-001. Up to 25% of disposable pay.</p>
                <p><strong>Step 4 — Property lien</strong><br />File abstract of judgment with county recorder.</p>
                <p><strong>Renewal:</strong> Every 10 years. We remind you.</p>
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

      {/* WHY THE PLAN WORKS */}
      <section className="dl-whyD-band">
        <div className="wrap dl-whyD-grid">
          <div className="dl-whyD-left">
            <span className="dl-incl-eyebrow">Why You Need This</span>
            <h2 className="dl-incl-title">
              Winning is half the battle. <em>Collecting is the other half.</em>
            </h2>
            <p className="dl-incl-sub">
              About half of small-claims winners never collect a dollar — not because the defendant can&rsquo;t pay, but because the winner doesn&rsquo;t know how to enforce.
            </p>
          </div>

          <div className="dl-whyD-mid">
            <article className="dl-incl-letter">
              <header className="dl-incl-letter-head">
                <div>
                  <span className="dl-incl-letter-brand">CIVILCASE</span>
                  <span className="dl-incl-letter-sub">JUDGMENT NOTICE</span>
                </div>
                <span className="dl-incl-letter-date">California Superior Court</span>
              </header>
              <div className="dl-incl-letter-rule" />
              <div className="dl-incl-letter-body">
                <p><strong>TO:</strong><br />
                  ABC Construction LLC<br />
                  123 Business Way<br />
                  Los Angeles, CA 90001
                </p>
                <p><strong>RE:</strong><br />Judgment entered, Case No. 25-SC-04188</p>
                <p>
                  Total judgment: <strong>$4,800</strong> plus court costs ($75) and post-judgment interest at 10%/year.
                </p>
                <p><strong>Payment due within 30 days or enforcement begins.</strong></p>
                <p>
                  Enforcement mechanisms available: judgment-debtor exam, bank levy, wage garnishment, property lien.
                </p>
              </div>
            </article>
          </div>

          <div className="dl-whyD-right">
            <div className="dl-whyA-stack">
              <article className="dl-whyA-card dl-whyA-card-back">
                <span className="dl-whyA-card-icon"><Search size={22} strokeWidth={1.7} /></span>
                <h3>Find Their Assets</h3>
                <p>The judgment-debtor exam forces the defendant to disclose bank, employer, and property under oath.</p>
              </article>
              <article className="dl-whyA-card dl-whyA-card-mid">
                <span className="dl-whyA-card-icon"><Banknote size={22} strokeWidth={1.7} /></span>
                <h3>Take The Money</h3>
                <p>Levy the bank, garnish the wages. The sheriff handles it once you file the form.</p>
              </article>
              <article className="dl-whyA-card dl-whyA-card-front">
                <span className="dl-whyA-card-icon"><Clock size={22} strokeWidth={1.7} /></span>
                <h3>Wait Them Out</h3>
                <p>Broke today? Record a lien. It follows them and any property they ever buy.</p>
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
              Four steps. <em>One paid judgment.</em>
            </h2>
            <p className="dl-how-sub">
              Most plaintiffs collect within 30 to 120 days once they actually start using the right enforcement tools.
            </p>
          </div>

          <ol className="dl-how-steps">
            <li className="dl-how-step">
              <div className="dl-how-arch">
                <span className="dl-how-num">01</span>
                <Image src="/icons/whathappened.webp" alt="" width={260} height={200} className="dl-how-img" />
              </div>
              <h3>Tell Us About Your Judgment</h3>
              <p>State, defendant, amount, when the judgment was entered. We pull your state&rsquo;s enforcement playbook.</p>
            </li>

            <li className="dl-how-step">
              <div className="dl-how-arch">
                <span className="dl-how-num">02</span>
                <Image src="/icons/demandletter.webp" alt="" width={260} height={200} className="dl-how-img" />
              </div>
              <h3>We Build Your Plan</h3>
              <p>A personalized, sequenced enforcement plan. Which step first, which forms, which fees, which to skip given what you know.</p>
            </li>

            <li className="dl-how-step">
              <div className="dl-how-arch">
                <span className="dl-how-num">03</span>
                <Image src="/icons/certifiedmail.webp" alt="" width={260} height={200} className="dl-how-img" />
              </div>
              <h3>Work the Sequence</h3>
              <p>Judgment-debtor exam, levy, garnishment, lien — in the right order. Each step has the form, the fee, the timeline.</p>
            </li>

            <li className="dl-how-step">
              <div className="dl-how-arch">
                <span className="dl-how-num">04</span>
                <Image src="/icons/courthouse.webp" alt="" width={260} height={200} className="dl-how-img" />
              </div>
              <h3>Track and Renew</h3>
              <p>Some collections take months. The plan tracks your judgment expiration and tells you when to renew it.</p>
            </li>
          </ol>
        </div>
      </section>

      {/* FINAL CTA — first instance */}
      <section className="dl-finalv2 dl-finalv2-dark">
        <div className="wrap">
          <div className="dl-finalv2-card">
            <div className="dl-finalv2-top">
              <Image src="/icons/cta-letter.webp" alt="" width={96} height={96} className="dl-finalv2-icon-img" aria-hidden />
              <div className="dl-finalv2-copy">
                <h2>
                  Ready to <em>collect what you won?</em>
                </h2>
                <p>No account. No subscription. Just results.</p>
              </div>
              <div className="dl-finalv2-cta">
                <StartCaseButton className="dl-finalv2-btn">
                  Start My Collection Plan
                  <ArrowRight size={18} strokeWidth={2.2} />
                </StartCaseButton>
                <span className="dl-finalv2-meta">
                  Takes about 3 minutes <span className="dl-finalv2-dot">&bull;</span> $49 one-time
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

      {/* WHAT'S IN THE PLAN — anatomy with annotated plan */}
      <section className="dl-what-band">
        <div className="wrap dl-what-grid">
          <div className="dl-what-head">
            <span className="dl-what-eyebrow">What&rsquo;s in the Plan</span>
            <h2 className="dl-what-title">
              Built specifically for <em>your state</em>.
            </h2>
            <p className="dl-what-sub">
              Every plan follows the same structure: the right enforcement mechanism, the form numbers, the fees, the timeline, and your state&rsquo;s rules on each step.
            </p>
          </div>

          <div className="dl-anno-wrap">
            <article className="dl-anno-letter">
              <header className="dl-anno-head">
                <div>
                  <span className="dl-anno-brand">CIVILCASE</span>
                  <span className="dl-anno-sub">COLLECTION PLAN · CA</span>
                </div>
                <span className="dl-anno-date">May 21, 2026</span>
              </header>
              <div className="dl-anno-rule" />

              <div className="dl-anno-meta">
                <div><span>CASE:</span><p>Jordan Reyes v. ABC Construction LLC</p></div>
                <div><span>JUDGMENT:</span><p>$4,800 + costs + interest</p></div>
              </div>

              <p className="dl-anno-p">
                Start with{" "}
                <strong className="dl-anno-mark" data-anno="law">judgment-debtor exam (Form SC-134)</strong>
                {" "}to compel disclosure of assets under oath.
              </p>

              <p className="dl-anno-p">
                Renewal deadline:{" "}
                <strong className="dl-anno-mark" data-anno="deadline">May 21, 2036 (10 years)</strong>:
              </p>

              <ul className="dl-anno-bullets">
                <li>Bank levy via EJ-152 once asset disclosure reveals account;</li>
                <li>
                  <span className="dl-anno-mark" data-anno="penalty">
                    Wage garnishment up to 25% of disposable pay (WG-001)
                  </span>.
                </li>
              </ul>

              <p className="dl-anno-p">
                <strong>Post-judgment interest: 10%/year.</strong>{" "}
                <span className="dl-anno-mark" data-anno="next">
                  Record abstract of judgment as lien on all CA property
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
                <strong>Sequenced plan</strong>
                <span>Skips steps that don&rsquo;t apply, based on what you know about the defendant.</span>
              </div>
              <div className="dl-anno-callout" data-pos="penalty">
                <strong>Exemption catalog</strong>
                <span>What the defendant gets to keep no matter what, with dollar amounts and statutes.</span>
              </div>
              <div className="dl-anno-callout" data-pos="deadline">
                <strong>Renewal deadline</strong>
                <span>The year-mark when your judgment expires if not renewed.</span>
              </div>
              <div className="dl-anno-callout" data-pos="next">
                <strong>When they push back</strong>
                <span>Defendant&rsquo;s claim-of-exemption playbook and what triggers a hearing.</span>
              </div>
              <div className="dl-anno-callout" data-pos="evidence">
                <strong>When they pay</strong>
                <span>Satisfaction-of-judgment form with the deadline and late-filing penalty.</span>
              </div>
            </aside>
          </div>

          <div className="dl-what-foot dl-what-foot-left">
            <span className="dl-what-foot-icon dl-what-foot-icon-dark">
              <ShieldCheck size={20} strokeWidth={1.8} />
            </span>
            <div>
              <strong>Sequenced. Personalized. Enforceable.</strong>
              <span>Built for your state&rsquo;s exact enforcement mechanisms — not a generic checklist.</span>
            </div>
          </div>

          <div className="dl-what-foot dl-what-foot-cream">
            <span className="dl-what-foot-icon dl-what-foot-icon-cream">
              <HandCoins size={20} strokeWidth={1.8} />
            </span>
            <div>
              <strong>50 states. Every collection tool.</strong>
              <span>Levy, garnishment, lien, debtor exam — your state&rsquo;s version of each.</span>
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
                  Collection without <em>hiring a collector</em>
                </h2>
                <p className="dl-bento-body">
                  Most collection agencies take 25–40% of what they recover.
                  The Collection Plan gives you the same playbook for $49,
                  one time. You keep every dollar you collect.
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
                  <strong>50%</strong>
                  <span>of small-claims winners never collect a dollar.</span>
                </div>
                <div className="dl-bento-stat">
                  <strong>10–20 years</strong>
                  <span>Most judgments stay enforceable for a decade or more.</span>
                </div>
                <div className="dl-bento-stat">
                  <strong>25%</strong>
                  <span>Max federal wage-garnishment percentage of disposable pay.</span>
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
                  <li className="is-done"><span>1</span><span>Judgment</span></li>
                  <li className="is-done"><span>2</span><span>State rules</span></li>
                  <li className="is-active"><span>3</span><span>Debtor exam</span></li>
                  <li><span>4</span><span>Levy</span></li>
                  <li><span>5</span><span>Garnish</span></li>
                  <li><span>6</span><span>Lien</span></li>
                </ol>

                <div className="dl-bento-dash-body">
                  <div className="dl-bento-dash-main">
                    <div className="dl-bento-wiz-eyebrow">Phase 3 of 6 &middot; Debtor exam</div>
                    <h3 className="dl-bento-wiz-q">What do you know about the defendant?</h3>
                    <p className="dl-bento-wiz-sub">
                      We&rsquo;ll skip steps that don&rsquo;t apply. If you already know their employer, we go straight to garnishment.
                    </p>

                    <div className="dl-bento-wiz-pills" aria-hidden>
                      <span className="dl-bento-wiz-pill dl-bento-wiz-pill-on">
                        <UserCheck size={14} strokeWidth={1.9} />
                        Employed
                      </span>
                      <span className="dl-bento-wiz-pill">
                        <Briefcase size={14} strokeWidth={1.9} />
                        Self-employed
                      </span>
                    </div>

                    <div className="dl-bento-wiz-fields">
                      <div className="dl-bento-wiz-row">
                        <div className="dl-bento-wiz-field">
                          <label>Employer name</label>
                          <div className="dl-bento-wiz-input">Acme Co.</div>
                        </div>
                      </div>
                      <div className="dl-bento-wiz-row">
                        <div className="dl-bento-wiz-field">
                          <label>Known bank</label>
                          <div className="dl-bento-wiz-input">Chase</div>
                        </div>
                        <div className="dl-bento-wiz-field">
                          <label>Owns property?</label>
                          <div className="dl-bento-wiz-input">Yes — LA County</div>
                        </div>
                      </div>
                    </div>

                    <div className="dl-bento-wiz-actions">
                      <span className="dl-bento-wiz-back">Back</span>
                      <span className="dl-bento-wiz-next">
                        Build my plan
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
                      <p>Knowing the employer skips straight to garnishment — the fastest path to recurring payments.</p>
                    </div>

                    <div className="dl-bento-rail-card">
                      <div className="dl-bento-rail-progress-head">
                        <span>Plan complete</span>
                        <strong>2/6</strong>
                      </div>
                      <div className="dl-bento-rail-progress-bar">
                        <span style={{ width: "33%" }} />
                      </div>
                      <span className="dl-bento-rail-band">State rules pulled</span>
                    </div>

                    <div className="dl-bento-rail-card">
                      <div className="dl-bento-rail-prev-head">
                        <span>Collection Plan</span>
                        <span className="dl-bento-rail-prev-fill">0/4</span>
                      </div>
                      <dl className="dl-bento-rail-prev-rows">
                        <div><dt>Debtor exam</dt><dd>—</dd></div>
                        <div><dt>Bank levy</dt><dd>—</dd></div>
                        <div><dt>Garnishment</dt><dd>—</dd></div>
                        <div><dt>Lien</dt><dd>—</dd></div>
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
              One price. <em>Real money back.</em>
            </h2>
            <p className="dl-price-sub">
              $49 unlocks every enforcement mechanism your state offers, with the forms and the sequence to use them.
            </p>
          </div>

          <div className="dl-price-grid dl-price-grid-single">
            <div className="dl-price-card dl-price-card-featured">
              <span className="dl-price-ribbon">Collection Plan</span>
              <div className="dl-price-card-head dl-price-card-head-dark">
                <span className="dl-price-icon dl-price-icon-red">
                  <HandCoins size={26} strokeWidth={1.8} />
                </span>
                <div>
                  <h3>Post-Judgment Collection Plan</h3>
                  <p>
                    Personalized to your state.
                    <br />
                    Sequenced for fastest payment.
                  </p>
                </div>
              </div>

              <div className="dl-price-card-body">
                <div className="dl-price-amount-row">
                  <span className="dl-price-amount">$49</span>
                  <span className="dl-price-meta">one-time</span>
                </div>

                <div className="dl-price-stat dl-price-stat-red">
                  <Target size={22} strokeWidth={1.8} />
                  <div>
                    <strong>Half of winners never collect</strong>
                    <span>Don&rsquo;t be one of them.</span>
                  </div>
                </div>

                <div className="dl-price-includes">
                  <span className="dl-price-includes-label dl-price-includes-label-red">
                    Includes:
                  </span>
                  <ul>
                    <li><CheckCircle2 size={22} strokeWidth={2} /> Step-by-step plan, sequenced to your case</li>
                    <li><CheckCircle2 size={22} strokeWidth={2} /> Debtor exam, levy, garnishment, lien — forms + fees</li>
                    <li><CheckCircle2 size={22} strokeWidth={2} /> State exemption catalog (what&rsquo;s protected)</li>
                    <li><CheckCircle2 size={22} strokeWidth={2} /> Defendant claim-of-exemption playbook</li>
                    <li><CheckCircle2 size={22} strokeWidth={2} /> Satisfaction of judgment + renewal deadline</li>
                    <li><CheckCircle2 size={22} strokeWidth={2} /> Self-help center contact + special leverage options</li>
                  </ul>
                </div>

                <div className="dl-price-level">
                  <span className="dl-price-level-label">Enforcement Level</span>
                  <span className="dl-price-dots dl-price-dots-red">
                    <span className="on" /><span className="on" /><span className="on" /><span className="on" /><span className="on" />
                  </span>
                </div>

                <StartCaseButton className="dl-price-cta dl-price-cta-dark">
                  Get My Collection Plan
                  <ArrowRight size={18} strokeWidth={2} />
                </StartCaseButton>

                <p className="dl-price-foot dl-price-foot-red">
                  Best for plaintiffs who&rsquo;ve won a judgment and want to actually see the money.
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
                <strong>State-Specific</strong>
                <p>Your state&rsquo;s mechanisms, forms, and rates.</p>
              </div>
            </li>
            <li>
              <span className="dl-tbar-icon"><Award size={22} strokeWidth={1.7} /></span>
              <div>
                <strong>Up-to-Date</strong>
                <p>Statutes and forms are checked monthly.</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <FaqSection
        faqs={FAQS}
        sub="Everything you need to know about collecting on a judgment after you win."
      />
    </main>
  );
}

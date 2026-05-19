import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, ShieldCheck, Mail, Phone, FileText, RefreshCw, Award, MapPin, FileCheck, UserCheck, ArrowRight, MessageCircle, Pencil, Send, BarChart3, Lock, Timer, Target, TrendingUp, Calendar, Gavel, Scale, Landmark, Folder, Search, Headphones, Star, Check, Clock, Home, Hammer, Briefcase, Car, ShoppingCart, Banknote, Undo2, Users } from "lucide-react";
import HeroCta from "../../../components/HeroCta";
import LetterDisplay from "./LetterDisplay";
import StartCaseButton from "../../../components/StartCaseButton";

export const metadata: Metadata = {
  title: "Send a Professional Demand Letter — $29",
  description:
    "Get a professional demand letter drafted in minutes and mailed via certified mail under the CivilCase brand. Most small-claims disputes resolve before filing.",
  alternates: { canonical: "/demand-letter" },
  openGraph: {
    title: "Send a Demand Letter — CivilCase",
    description:
      "A professional demand letter is usually enough to resolve a money dispute without filing. We draft, you review, we mail it.",
    url: "/demand-letter",
    type: "website",
  },
};

const SITE_URL = "https://civilcase.com";

const FAQS: { q: string; a: string }[] = [
  {
    q: "What is a demand letter?",
    a: "A demand letter is a formal written notice that you're owed money and intend to pursue the matter in court if it isn't resolved. It puts the other side on notice, sets a deadline, and creates a paper trail that judges weight heavily if you do end up filing.",
  },
  {
    q: "Why does it work?",
    a: "A demand letter from a neutral third party signals you've moved past texts and complaints. Many defendants would rather settle than risk a court judgment that becomes a permanent record. Even when it doesn't lead to immediate payment, it strengthens your position if you do go to court.",
  },
  {
    q: "Will my name and address be on the letter?",
    a: "Your name and signature appear on the demand itself, because the demand is from you. The envelope and cover letter show CivilCase as the sender, so the defendant sees a neutral third party on the outside. If you'd rather use only your own name and address with no CivilCase branding, you can pick that option during checkout. Tenants worried about retaliation usually keep the CivilCase letterhead.",
  },
  {
    q: "Do you contact me before mailing?",
    a: "Yes. After we draft the letter, you review the full document and approve it before we ship anything. The letter only goes out after you say yes. If something's wrong, you edit it or we redo it.",
  },
  {
    q: "Can I cancel after I pay?",
    a: "Yes. You can cancel for a full refund any time before you approve the draft. Once you approve and we mail the letter, it's a custom product that's already been sent, so we can't refund. The cancellation window is the review step, which most customers reach within 24 to 48 hours.",
  },
  {
    q: "What if they respond and offer less than I asked for?",
    a: "Settle if the number works for you. Most disputes settle below the initial demand. Counter-offers are normal. You're under no obligation to accept anything, and accepting a partial settlement doesn't waive your right to sue later if they don't pay the agreed amount.",
  },
  {
    q: "What if they ignore the letter?",
    a: "Move to the Filing Guide ($79) for your state, which walks you through filing in small-claims court. From there, the Collection Plan ($49) covers actually collecting once you win.",
  },
  {
    q: "Do I need a lawyer to send one?",
    a: "No. You can send a demand letter yourself in every state. The letter doesn't ask for legal advice; it states facts, cites the statute that applies, and demands payment by a deadline.",
  },
  {
    q: "What if I don't have the other person's address?",
    a: "Add the Skip-Trace add-on ($80) at checkout and we locate a deliverable address using the same paid databases collection attorneys use.",
  },
  {
    q: "Is CivilCase a law firm?",
    a: "No. CivilCase is a document-preparation service, not a law firm, and we don't provide legal advice. We help non-lawyers prepare and send formal letters and court documents.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${SITE_URL}/demand-letter#service`,
      name: "CivilCase Demand Letter",
      serviceType: "Demand Letter Drafting and Delivery",
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: { "@type": "Country", name: "United States" },
      url: `${SITE_URL}/demand-letter`,
      description:
        "AI-drafted demand letter for unpaid debts, security deposits, contractor disputes, employer wage claims, and other money disputes. Sent via certified mail under the CivilCase brand.",
      audience: { "@type": "Audience", audienceType: "Self-represented plaintiffs" },
      offers: [
        {
          "@type": "Offer",
          name: "Send the Letter",
          price: "29.00",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: `${SITE_URL}/demand-letter`,
        },
        {
          "@type": "Offer",
          name: "Full Pressure",
          price: "49.00",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: `${SITE_URL}/demand-letter`,
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/demand-letter#faq`,
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

const STEPS = [
  {
    n: "01",
    title: "Tell us your story",
    body: "5 to 10 minutes. We ask who owes you, why, how much, and what proof you have. No legal vocabulary required. No payment yet.",
  },
  {
    n: "02",
    title: "We draft the letter",
    body: "Within 24 to 48 hours, you get a custom letter that cites the statute in your state, references your evidence, and demands payment by a deadline.",
  },
  {
    n: "03",
    title: "You review and approve",
    body: "Read the full draft. Change anything that doesn't sound right. The letter only ships after you approve it.",
  },
  {
    n: "04",
    title: "We mail it from CivilCase",
    body: "Certified mail with return receipt, sent under our brand on the envelope. A letter from a neutral third party reads differently than one from you alone.",
  },
];

const WHO: { href: string; title: string; sub: string }[] = [
  { href: "/small-claims/landlord", title: "Landlord disputes", sub: "Security deposits, mold, wrongful eviction, lockout." },
  { href: "/small-claims/contractor", title: "Contractor disputes", sub: "Unfinished work, poor workmanship, deposit taken." },
  { href: "/small-claims/employer", title: "Employer disputes", sub: "Unpaid wages, final paycheck, stolen tips." },
  { href: "/small-claims/auto", title: "Auto disputes", sub: "Mechanic mistakes, dealer fraud, parked-car damage." },
  { href: "/small-claims/online-seller", title: "Online sellers", sub: "Amazon, eBay, Etsy, Marketplace, Venmo scams." },
  { href: "/small-claims/personal-loan", title: "Money you lent", sub: "IOUs, friend or family loans, ex-partner debts." },
  { href: "/small-claims/refund", title: "Refund disputes", sub: "Defective products, gym memberships, undelivered services." },
  { href: "/small-claims/neighbor", title: "Neighbor disputes", sub: "Property damage, fences, trees, noise, water runoff." },
];

const FEATURES = [
  {
    title: "Statute citation",
    body: "The specific law in your state that makes this collectible (e.g., Cal. Civ. Code § 1950.5 for a California security deposit).",
  },
  {
    title: "Statutory penalty",
    body: "Many state laws add a 2x or 3x multiplier on top of what you're owed. We name the multiplier and the dollar amount.",
  },
  {
    title: "14-day deadline",
    body: "Firm response window, not a vague request. The deadline is written into the body of the letter.",
  },
  {
    title: "Court threat (optional)",
    body: "You decide whether the letter names small claims court as the next step. Either way, the deadline is real.",
  },
  {
    title: "Your evidence referenced",
    body: "Photos, contracts, texts, receipts — the letter cites what you have without attaching the files.",
  },
];

export default function DemandLetterPage() {
  return (
    <main className="cat-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HERO — full-bleed so the dashboard preview can extend to the
          right edge for impact, like in the design reference. */}
      <header className="dl-hero-v2">
        <div className="wrap dl-hero-v2-grid">
          <div className="dl-hero-v2-copy">
            <h1 className="dl-hero-v2-title">
              Stop asking. <em>Start escalating.</em>
            </h1>
            <p className="dl-hero-v2-lede">
              A professionally written demand letter puts formal pressure on the other side
              and gets results. Before court. Without a lawyer.
            </p>
            <ul className="dl-hero-v2-checks">
              <li>
                <Award size={18} strokeWidth={1.7} />
                Attorney-reviewed demand letter
              </li>
              <li>
                <Mail size={18} strokeWidth={1.7} />
                Certified mail with delivery tracking
              </li>
              <li>
                <FileCheck size={18} strokeWidth={1.7} />
                14-day response deadline included
              </li>
              <li>
                <ShieldCheck size={18} strokeWidth={1.7} />
                Court-ready and state-specific
              </li>
            </ul>
            <div className="dl-hero-v2-ctas">
              <StartCaseButton className="btn btn-green btn-lg dl-hero-v2-cta-primary">
                <FileText size={20} strokeWidth={1.9} />
                Send My Demand Letter
                <ArrowRight size={18} strokeWidth={2} />
              </StartCaseButton>
            </div>
            <ul className="dl-hero-v2-trust">
              <li>
                <MapPin size={22} strokeWidth={1.7} />
                <div>
                  <strong>Used nationwide</strong>
                  <span>in all 50 states</span>
                </div>
              </li>
              <li>
                <Mail size={22} strokeWidth={1.7} />
                <div>
                  <strong>Certified mail</strong>
                  <span>tracking included</span>
                </div>
              </li>
              <li>
                <FileCheck size={22} strokeWidth={1.7} />
                <div>
                  <strong>Court-ready</strong>
                  <span>formatting</span>
                </div>
              </li>
            </ul>
          </div>
          <div className="dl-hero-v2-visual">
            <LetterDisplay />
          </div>
        </div>
      </header>

      {/* WHAT'S INCLUDED — 3-column feature/letter/trust band. */}
      <section className="dl-incl-band">
        <div className="wrap dl-incl-grid">
          {/* Left: features */}
          <div className="dl-incl-left">
            <span className="dl-incl-eyebrow">Why Demand Letters Work</span>
            <h2 className="dl-incl-title">
              A simple letter can create <em>serious results.</em>
            </h2>
            <p className="dl-incl-sub">
              Most people resolve the issue once they realize you&rsquo;re prepared to take action.
            </p>
            <ul className="dl-incl-feats">
              <li>
                <span className="dl-incl-feat-icon"><ShieldCheck size={22} strokeWidth={1.6} /></span>
                <div>
                  <strong>Creates Legal Pressure</strong>
                  <span>A formal written demand shows you are serious and prepared to escalate if necessary.</span>
                </div>
              </li>
              <li>
                <span className="dl-incl-feat-icon"><FileCheck size={22} strokeWidth={1.6} /></span>
                <div>
                  <strong>Often Resolves Without Court</strong>
                  <span>Many recipients pay or respond once they understand the issue is documented and enforceable.</span>
                </div>
              </li>
              <li>
                <span className="dl-incl-feat-icon"><Folder size={22} strokeWidth={1.6} /></span>
                <div>
                  <strong>Builds Your Paper Trail</strong>
                  <span>Establishes a clear timeline and shows the court you attempted to resolve the issue fairly.</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Middle: letter mockup */}
          <div className="dl-incl-mid">
            <article className="dl-incl-letter">
              <header className="dl-incl-letter-head">
                <div>
                  <span className="dl-incl-letter-brand">CIVILCASE</span>
                  <span className="dl-incl-letter-sub">DEMAND LETTER</span>
                </div>
                <span className="dl-incl-letter-date">May 12, 2024</span>
              </header>
              <div className="dl-incl-letter-rule" />
              <div className="dl-incl-letter-body">
                <p><strong>TO:</strong><br />
                  ABC Construction LLC<br />
                  123 Business Way<br />
                  Los Angeles, CA 90001
                </p>
                <p><strong>RE:</strong><br />Formal Demand for Payment</p>
                <p>
                  This letter serves as formal notice that payment in the amount of $4,800 is
                  due for services provided under our agreement dated March 3, 2024.
                </p>
                <p><strong>Payment must be received within 14 days of delivery of this letter.</strong></p>
                <p>
                  If this matter is not resolved, I intend to pursue all available legal remedies,
                  including filing a claim in small claims court.
                </p>
              </div>
              <span className="dl-incl-seal" aria-hidden>
                <span className="dl-incl-seal-ring">
                  <span className="dl-incl-seal-top">OFFICIAL</span>
                  <span className="dl-incl-seal-bot">DEMAND LETTER</span>
                </span>
                <span className="dl-incl-seal-center">
                  <span>CIVILCASE</span>
                  <Scale size={18} strokeWidth={1.6} />
                </span>
              </span>
            </article>
          </div>

          {/* Right: trust badges */}
          <ul className="dl-incl-trust">
            <li>
              <span className="dl-incl-trust-icon dl-incl-trust-icon-green">
                <CheckCircle2 size={18} strokeWidth={2.2} />
              </span>
              <div>
                <strong>Generated for your case</strong>
                <span>Personalized with your details</span>
              </div>
            </li>
            <li>
              <span className="dl-incl-trust-icon">
                <Mail size={18} strokeWidth={1.8} />
              </span>
              <div>
                <strong>Mailed via certified mail</strong>
                <span>USPS tracking included</span>
              </div>
            </li>
            <li>
              <span className="dl-incl-trust-icon">
                <Calendar size={18} strokeWidth={1.8} />
              </span>
              <div>
                <strong>14-day response deadline</strong>
                <span>Clearly stated in the letter</span>
              </div>
            </li>
            <li>
              <span className="dl-incl-trust-icon">
                <ShieldCheck size={18} strokeWidth={1.8} />
              </span>
              <div>
                <strong>Court-ready document</strong>
                <span>Attorney-reviewed structure</span>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* ========== VERSION D — Original 3-col, but third column replaced
          with Version A's fanned card stack. ========== */}
      <section className="dl-whyD-band">
        <div className="wrap dl-whyD-grid">
          {/* Left: copy only */}
          <div className="dl-whyD-left">
            <p className="dl-ver-label">Version D — Original + Version A cards on right</p>
            <span className="dl-incl-eyebrow">Why Demand Letters Work</span>
            <h2 className="dl-incl-title">
              A simple letter can create <em>serious results.</em>
            </h2>
            <p className="dl-incl-sub">
              Most people resolve the issue once they realize you&rsquo;re prepared to take action.
            </p>
          </div>

          {/* Middle: letter mockup (same as original) */}
          <div className="dl-whyD-mid">
            <article className="dl-incl-letter">
              <header className="dl-incl-letter-head">
                <div>
                  <span className="dl-incl-letter-brand">CIVILCASE</span>
                  <span className="dl-incl-letter-sub">DEMAND LETTER</span>
                </div>
                <span className="dl-incl-letter-date">May 12, 2024</span>
              </header>
              <div className="dl-incl-letter-rule" />
              <div className="dl-incl-letter-body">
                <p><strong>TO:</strong><br />
                  ABC Construction LLC<br />
                  123 Business Way<br />
                  Los Angeles, CA 90001
                </p>
                <p><strong>RE:</strong><br />Formal Demand for Payment</p>
                <p>
                  This letter serves as formal notice that payment in the amount of $4,800 is
                  due for services provided under our agreement dated March 3, 2024.
                </p>
                <p><strong>Payment must be received within 14 days of delivery of this letter.</strong></p>
                <p>
                  If this matter is not resolved, I intend to pursue all available legal remedies,
                  including filing a claim in small claims court.
                </p>
              </div>
              <span className="dl-incl-seal" aria-hidden>
                <span className="dl-incl-seal-ring">
                  <span className="dl-incl-seal-top">OFFICIAL</span>
                  <span className="dl-incl-seal-bot">DEMAND LETTER</span>
                </span>
                <span className="dl-incl-seal-center">
                  <span>CIVILCASE</span>
                  <Scale size={18} strokeWidth={1.6} />
                </span>
              </span>
            </article>
          </div>

          {/* Right: Version A's fanned/overlapping card stack */}
          <div className="dl-whyD-right">
            <div className="dl-whyA-stack">
              <article className="dl-whyA-card dl-whyA-card-back">
                <span className="dl-whyA-card-icon"><ShieldCheck size={22} strokeWidth={1.7} /></span>
                <h3>Creates Legal Pressure</h3>
                <p>A formal written demand shows you are serious and prepared to escalate if necessary.</p>
              </article>
              <article className="dl-whyA-card dl-whyA-card-mid">
                <span className="dl-whyA-card-icon"><FileCheck size={22} strokeWidth={1.7} /></span>
                <h3>Often Resolves Without Court</h3>
                <p>Many recipients pay or respond once they understand the issue is documented and enforceable.</p>
              </article>
              <article className="dl-whyA-card dl-whyA-card-front">
                <span className="dl-whyA-card-icon"><Folder size={22} strokeWidth={1.7} /></span>
                <h3>Builds Your Paper Trail</h3>
                <p>Establishes a clear timeline and shows the court you attempted to resolve the issue fairly.</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — full-bleed cream band with arched step cards.
          Designed to match the "Simple steps. Serious results." reference. */}
      <section className="dl-section-cream dl-how-band">
        <div className="wrap">
          <div className="dl-how-head">
            <span className="dl-how-eyebrow">How it works</span>
            <h2 className="dl-how-title">
              Simple steps. <em>Serious results.</em>
            </h2>
            <p className="dl-how-sub">
              We make it easy to send a powerful demand letter and take control of your
              situation.
            </p>
          </div>

          <ol className="dl-how-steps">
            <li className="dl-how-step">
              <div className="dl-how-arch">
                <span className="dl-how-num">01</span>
                <Image
                  src="/icons/whathappened.webp"
                  alt=""
                  width={260}
                  height={200}
                  className="dl-how-img"
                />
              </div>
              <h3>Tell Us What Happened</h3>
              <p>Answer a few simple questions about your dispute. It only takes a few minutes.</p>
            </li>

            <li className="dl-how-step">
              <div className="dl-how-arch">
                <span className="dl-how-num">02</span>
                <Image
                  src="/icons/demandletter.webp"
                  alt=""
                  width={260}
                  height={200}
                  className="dl-how-img"
                />
              </div>
              <h3>We Generate Your Letter</h3>
              <p>We create a professional, state-specific demand letter customized to your case.</p>
            </li>

            <li className="dl-how-step">
              <div className="dl-how-arch">
                <span className="dl-how-num">03</span>
                <Image
                  src="/icons/certifiedmail.webp"
                  alt=""
                  width={260}
                  height={200}
                  className="dl-how-img"
                />
              </div>
              <h3>Send It &amp; Track Delivery</h3>
              <p>We mail it via certified mail and provide tracking so you know exactly when it&rsquo;s delivered.</p>
            </li>

            <li className="dl-how-step">
              <div className="dl-how-arch">
                <span className="dl-how-num">04</span>
                <Image
                  src="/icons/courthouse.webp"
                  alt=""
                  width={260}
                  height={200}
                  className="dl-how-img"
                />
              </div>
              <h3>Escalate If Necessary</h3>
              <p>If they ignore the letter, we guide you through your next steps, including filing in court.</p>
            </li>
          </ol>

        </div>
      </section>

      {/* BENTO CASE STUDY — stacked cards left + new-case wizard mockup right */}
      <section className="dl-bento-band">
        <div className="wrap dl-bento-grid">
          {/* LEFT column — stacked cards */}
          <div className="dl-bento-left">
            <div className="dl-bento-card-top">
              <div>
                <h2 className="dl-bento-title">
                  Making every dispute a confident one
                </h2>
                <p className="dl-bento-body">
                  Start a case in minutes. We ask plain-language questions, cite the right
                  statute, and prepare a court-ready demand letter. You stay in control of
                  the next move.
                </p>
              </div>
              <div className="dl-bento-feats">
                <div className="dl-bento-feat">
                  <span className="dl-bento-feat-icon">
                    <ShieldCheck size={14} strokeWidth={2.2} />
                  </span>
                  <span>State-specific guidance</span>
                </div>
                <div className="dl-bento-feat">
                  <span className="dl-bento-feat-icon">
                    <Clock size={14} strokeWidth={2.2} />
                  </span>
                  <span>Most cases ready in 24 hours</span>
                </div>
              </div>
            </div>

            <div className="dl-bento-card-bot">
              <div className="dl-bento-cs-head">
                <div className="dl-bento-brand">
                  <Scale size={22} strokeWidth={2} />
                  <span>CIVILCASE</span>
                </div>
                <Link href="/small-claims" className="dl-bento-cs-cta">
                  See state guides
                </Link>
              </div>
              <div className="dl-bento-stats">
                <div className="dl-bento-stat">
                  <strong>50</strong>
                  <span>States covered with case-specific rules</span>
                </div>
                <div className="dl-bento-stat">
                  <strong>14 days</strong>
                  <span>Response deadline written into every letter</span>
                </div>
                <div className="dl-bento-stat">
                  <strong>USPS</strong>
                  <span>Certified mail with delivery tracking</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — full dashboard mockup: top phase strip + form + side rail */}
          <div className="dl-bento-right">
            <div className="dl-bento-dash">
              {/* Top phase strip */}
              <ol className="dl-bento-dash-phases">
                <li className="is-done"><span>1</span><span>Eligibility</span></li>
                <li className="is-done"><span>2</span><span>Category</span></li>
                <li className="is-active"><span>3</span><span>Defendant</span></li>
                <li><span>4</span><span>Your info</span></li>
                <li><span>5</span><span>What happened</span></li>
                <li><span>6</span><span>Amount</span></li>
                <li><span>7</span><span>Evidence</span></li>
                <li className="is-locked"><span>8</span><span>Review</span></li>
              </ol>

              {/* Body: main form + rail */}
              <div className="dl-bento-dash-body">
                <div className="dl-bento-dash-main">
                  <div className="dl-bento-wiz-eyebrow">Phase 3 of 8 &middot; Defendant</div>
                  <h3 className="dl-bento-wiz-q">Who are you sending this to?</h3>
                  <p className="dl-bento-wiz-sub">
                    Pick whether the recipient is a person or a business. We&rsquo;ll set the
                    letter tone accordingly.
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
                        <label>First name <em>*</em></label>
                        <div className="dl-bento-wiz-input">Jordan</div>
                      </div>
                      <div className="dl-bento-wiz-field">
                        <label>Last name <em>*</em></label>
                        <div className="dl-bento-wiz-input">Hayes</div>
                      </div>
                    </div>
                    <div className="dl-bento-wiz-row">
                      <div className="dl-bento-wiz-field">
                        <label>Email</label>
                        <div className="dl-bento-wiz-input dl-bento-wiz-input-empty">
                          jordan@example.com
                        </div>
                      </div>
                      <div className="dl-bento-wiz-field">
                        <label>Phone</label>
                        <div className="dl-bento-wiz-input dl-bento-wiz-input-empty">
                          (415) 555-0142
                        </div>
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

                {/* Right rail */}
                <aside className="dl-bento-dash-rail" aria-hidden>
                  <div className="dl-bento-rail-card">
                    <div className="dl-bento-rail-coach">
                      <span className="dl-bento-rail-avatar">CC</span>
                      <div>
                        <strong>CivilCase</strong>
                        <span>Step 3 of 8</span>
                      </div>
                    </div>
                    <p>Use the legal name. We&rsquo;ll match it to the Secretary of State.</p>
                  </div>

                  <div className="dl-bento-rail-card">
                    <div className="dl-bento-rail-progress-head">
                      <span>Case complete</span>
                      <strong>2/8</strong>
                    </div>
                    <div className="dl-bento-rail-progress-bar">
                      <span style={{ width: "25%" }} />
                    </div>
                    <span className="dl-bento-rail-band">Foundation set</span>
                  </div>

                  <div className="dl-bento-rail-card">
                    <div className="dl-bento-rail-prev-head">
                      <span>Demand letter</span>
                      <span className="dl-bento-rail-prev-fill">0/4</span>
                    </div>
                    <dl className="dl-bento-rail-prev-rows">
                      <div><dt>To</dt><dd>—</dd></div>
                      <div><dt>From</dt><dd>—</dd></div>
                      <div><dt>Re</dt><dd>—</dd></div>
                      <div><dt>Amount</dt><dd>—</dd></div>
                    </dl>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT'S IN THE LETTER — two-column anatomy diagram with numbered
          feature cards on the left and an annotated letter mockup on the
          right. Annotation callouts only appear at desktop widths. */}
      <section className="dl-what-band">
        <div className="wrap dl-what-grid">
          {/* Header — col 1 only */}
          <div className="dl-what-head">
            <span className="dl-what-eyebrow">What&rsquo;s in the Letter</span>
            <h2 className="dl-what-title">
              Built specifically for <em>your dispute</em>.
            </h2>
            <p className="dl-what-sub">
              Every letter follows a structure courts respect: who, what, when, the law that
              applies, the demand, and the deadline.
            </p>
          </div>

          {/* Letter mockup — row 2 (centered, full-width) */}
          <div className="dl-anno-wrap">
              <article className="dl-anno-letter">
                <header className="dl-anno-head">
                  <div>
                    <span className="dl-anno-brand">CIVILCASE</span>
                    <span className="dl-anno-sub">DEMAND LETTER</span>
                  </div>
                  <span className="dl-anno-date">April 21, 2026</span>
                </header>
                <div className="dl-anno-rule" />

                <div className="dl-anno-meta">
                  <div><span>TO:</span><p>Oakwood Properties LLC</p></div>
                  <div><span>RE:</span><p>Demand for Return of Security Deposit</p></div>
                </div>

                <p className="dl-anno-p">
                  Pursuant to{" "}
                  <strong className="dl-anno-mark" data-anno="law">Cal. Civ. Code § 1950.5</strong>
                  , you were required to return my $1,500 security deposit within 21 days of
                  move-out. That period has elapsed.
                </p>

                <p className="dl-anno-p">
                  I demand within{" "}
                  <strong className="dl-anno-mark" data-anno="deadline">fourteen (14) days</strong>:
                </p>

                <ul className="dl-anno-bullets">
                  <li>Return of the $1,500 deposit in full;</li>
                  <li>
                    <span className="dl-anno-mark" data-anno="penalty">
                      Statutory damages of 2x for bad-faith retention ($3,000)
                    </span>.
                  </li>
                </ul>

                <p className="dl-anno-p">
                  <strong>Total demand: $4,500.00.</strong>{" "}
                  <span className="dl-anno-mark" data-anno="next">
                    If unresolved, I will file in Small Claims Court
                  </span>.
                </p>

                <p className="dl-anno-sig">Jordan A. Tenant</p>
                <p className="dl-anno-name" data-anno="evidence">Jordan A. Tenant</p>

                <span className="dl-anno-seal" aria-hidden>
                  <span className="dl-anno-seal-ring">
                    <span className="dl-anno-seal-top">OFFICIAL</span>
                    <span className="dl-anno-seal-bot">DEMAND LETTER</span>
                  </span>
                  <span className="dl-anno-seal-center">
                    <span>CIVILCASE</span>
                    <Scale size={18} strokeWidth={1.6} />
                  </span>
                </span>
              </article>

              {/* Annotation callouts — desktop only */}
              <aside className="dl-anno-side" aria-hidden>
                <div className="dl-anno-callout" data-pos="law">
                  <strong>Specific law</strong>
                  <span>We cite the exact statute that applies.</span>
                </div>
                <div className="dl-anno-callout" data-pos="penalty">
                  <strong>Penalty calculated</strong>
                  <span>We include any statutory multipliers you&rsquo;re owed.</span>
                </div>
                <div className="dl-anno-callout" data-pos="deadline">
                  <strong>Clear deadline</strong>
                  <span>A firm 14-day deadline is written in.</span>
                </div>
                <div className="dl-anno-callout" data-pos="next">
                  <strong>Court threat</strong>
                  <span>We name small claims court as the next step if they don&rsquo;t pay.</span>
                </div>
                <div className="dl-anno-callout" data-pos="evidence">
                  <strong>Evidence referenced</strong>
                  <span>We reference the proof you already have.</span>
                </div>
            </aside>
          </div>

          {/* Left footer — col 1 row 3 */}
          <div className="dl-what-foot dl-what-foot-left">
            <span className="dl-what-foot-icon dl-what-foot-icon-dark">
              <ShieldCheck size={20} strokeWidth={1.8} />
            </span>
            <div>
              <strong>Professional. Persuasive. Court-Ready.</strong>
              <span>Our letters are written to create pressure and build your paper trail.</span>
            </div>
          </div>

          {/* Right footer — col 2 row 3 */}
          <div className="dl-what-foot dl-what-foot-cream">
            <span className="dl-what-foot-icon dl-what-foot-icon-cream">
              <FileText size={20} strokeWidth={1.8} />
            </span>
            <div>
              <strong>100% customized to your case.</strong>
              <span>No templates. A letter that fits your facts and your state.</span>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING — two-tier comparison with featured "Full Pressure" card.
          Matches the "Choose How Hard You Want to Push" reference, minus the
          left-side escalation-path column (intentionally omitted). */}
      <section className="dl-section-cream dl-pricing-band">
        <div className="wrap">
          <div className="dl-price-head">
            <span className="dl-price-eyebrow">Choose Your Approach</span>
            <h2 className="dl-price-title">
              Choose How <em>Hard</em> You Want to Push.
            </h2>
            <p className="dl-price-sub">
              Start with a formal demand letter or apply maximum pressure with our full
              escalation sequence. You stay in control, we handle the pressure.
            </p>
          </div>

          <div className="dl-price-grid">
            {/* Tier 1 — Send the Letter */}
            <div className="dl-price-card">
              <div className="dl-price-card-head">
                <span className="dl-price-icon dl-price-icon-cream">
                  <Mail size={24} strokeWidth={1.8} />
                </span>
                <div>
                  <h3>Send the Letter</h3>
                  <p>
                    <strong>Good for most cases.</strong>
                    <br />
                    Perfect first step.
                  </p>
                </div>
              </div>

              <div className="dl-price-amount-row">
                <span className="dl-price-amount">$29</span>
                <span className="dl-price-meta">one-time</span>
              </div>

              <div className="dl-price-stat dl-price-stat-cream">
                <Target size={22} strokeWidth={1.8} />
                <div>
                  <strong>Most disputes settle</strong>
                  <span>at this stage.</span>
                </div>
              </div>

              <div className="dl-price-includes">
                <span className="dl-price-includes-label">Includes:</span>
                <ul>
                  <li><CheckCircle2 size={22} strokeWidth={2} /> Professional demand letter</li>
                  <li><CheckCircle2 size={22} strokeWidth={2} /> Certified mail with tracking</li>
                  <li><CheckCircle2 size={22} strokeWidth={2} /> 14-day response deadline</li>
                  <li><CheckCircle2 size={22} strokeWidth={2} /> You choose the send date</li>
                </ul>
              </div>

              <div className="dl-price-level">
                <span className="dl-price-level-label">Pressure Level</span>
                <span className="dl-price-dots dl-price-dots-gold">
                  <span className="on" /><span className="on" /><span className="on" /><span className="on" /><span />
                </span>
              </div>

              <StartCaseButton className="dl-price-cta dl-price-cta-cream">
                Send the Letter
                <ArrowRight size={18} strokeWidth={2} />
              </StartCaseButton>

              <p className="dl-price-foot">
                Best when communication is open and you want formal documentation.
              </p>
            </div>

            {/* Tier 2 — Full Pressure (featured) */}
            <div className="dl-price-card dl-price-card-featured">
              <span className="dl-price-ribbon">Most popular</span>
              <div className="dl-price-card-head dl-price-card-head-dark">
                <span className="dl-price-icon dl-price-icon-red">
                  <ShieldCheck size={26} strokeWidth={1.8} />
                </span>
                <div>
                  <h3>Full Pressure</h3>
                  <p>
                    Built for ignored messages
                    <br />
                    and stubborn debtors.
                  </p>
                </div>
              </div>

              <div className="dl-price-card-body">
                <div className="dl-price-amount-row">
                  <span className="dl-price-amount">$49</span>
                  <span className="dl-price-strike">$79</span>
                  <span className="dl-price-meta">one-time</span>
                </div>

                <div className="dl-price-stat dl-price-stat-red">
                  <TrendingUp size={22} strokeWidth={1.8} />
                  <div>
                    <strong>Higher response rate</strong>
                    <span>with full escalation.</span>
                  </div>
                </div>

                <div className="dl-price-includes">
                  <span className="dl-price-includes-label dl-price-includes-label-red">
                    Includes everything in Send the Letter, plus:
                  </span>
                  <ul>
                    <li><CheckCircle2 size={22} strokeWidth={2} /> Escalating follow-up sequence</li>
                    <li><CheckCircle2 size={22} strokeWidth={2} /> Voice of Justice phone calls</li>
                    <li><CheckCircle2 size={22} strokeWidth={2} /> Escalating email follow-ups</li>
                    <li><CheckCircle2 size={22} strokeWidth={2} /> Final Notice letter on day 10</li>
                    <li><CheckCircle2 size={22} strokeWidth={2} /> One-tap escalation to filing</li>
                  </ul>
                </div>

                <div className="dl-price-level">
                  <span className="dl-price-level-label">Pressure Level</span>
                  <span className="dl-price-dots dl-price-dots-red">
                    <span className="on" /><span className="on" /><span className="on" /><span className="on" /><span className="on" />
                  </span>
                </div>

                <StartCaseButton className="dl-price-cta dl-price-cta-dark">
                  Start Full Pressure
                  <ArrowRight size={18} strokeWidth={2} />
                </StartCaseButton>

                <p className="dl-price-foot dl-price-foot-red">
                  Best when they&rsquo;ve ignored you, ghosted you, or won&rsquo;t take you seriously.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom trust strip — matches the under-hero pill */}
          <ul className="dl-tbar">
            <li>
              <span className="dl-tbar-icon"><ShieldCheck size={22} strokeWidth={1.7} /></span>
              <div>
                <strong>Trusted by people across the country</strong>
                <p>Thousands have used our demand letters to get what they&rsquo;re owed.</p>
              </div>
            </li>
            <li>
              <span className="dl-tbar-icon"><Lock size={22} strokeWidth={1.7} /></span>
              <div>
                <strong>Secure &amp; Private</strong>
                <p>Your information is always protected.</p>
              </div>
            </li>
            <li>
              <span className="dl-tbar-icon"><MapPin size={22} strokeWidth={1.7} /></span>
              <div>
                <strong>Used Nationwide</strong>
                <p>State-specific letters that hold up in court.</p>
              </div>
            </li>
            <li>
              <span className="dl-tbar-icon"><Award size={22} strokeWidth={1.7} /></span>
              <div>
                <strong>Satisfaction Guarantee</strong>
                <p>We stand behind our service and your results.</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <div className="wrap">
        {/* FAQ */}
        <section className="cat-section">
          <div className="cat-split">
            <div className="cat-split-intro">
              <span className="eyebrow">FAQ</span>
              <h2>
                Common <em>questions.</em>
              </h2>
              <p>
                Don&rsquo;t see yours?{" "}
                <Link href="/contact" className="cat-text-link">
                  Email support
                </Link>
                .
              </p>
            </div>
            <div className="cat-faq">
              {FAQS.map((f, i) => (
                <details key={i}>
                  <summary>{f.q}</summary>
                  <div>
                    <p>{f.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA — same layout as before, dark theme to match the
            "Move forward" cv2-cta pattern from small-claims issue pages. */}
        <section className="dl-finalv2 dl-finalv2-dark">
          <div className="dl-finalv2-card">
            <div className="dl-finalv2-top">
              <span className="dl-finalv2-icon" aria-hidden>
                <FileText size={30} strokeWidth={1.8} />
              </span>
              <div className="dl-finalv2-copy">
                <h2>
                  Ready to <em>send your letter?</em>
                </h2>
                <p>No account. No subscription. Just results.</p>
              </div>
              <div className="dl-finalv2-cta">
                <StartCaseButton className="dl-finalv2-btn">
                  Start your letter
                  <ArrowRight size={18} strokeWidth={2.2} />
                </StartCaseButton>
                <span className="dl-finalv2-meta">
                  Takes about 2 minutes <span className="dl-finalv2-dot">&bull;</span> From $29
                </span>
              </div>
            </div>

            <div className="dl-finalv2-divider" />

            <ul className="dl-finalv2-trust">
              <li>
                <span className="dl-finalv2-trust-icon"><ShieldCheck size={20} strokeWidth={1.8} /></span>
                <div>
                  <strong>State-specific</strong>
                  <span>Built for your court.</span>
                </div>
              </li>
              <li>
                <span className="dl-finalv2-trust-icon"><Mail size={20} strokeWidth={1.8} /></span>
                <div>
                  <strong>Sent with proof</strong>
                  <span>Certified mail + tracking.</span>
                </div>
              </li>
              <li>
                <span className="dl-finalv2-trust-icon"><Lock size={20} strokeWidth={1.8} /></span>
                <div>
                  <strong>100% Private</strong>
                  <span>Secure and confidential.</span>
                </div>
              </li>
              <li>
                <span className="dl-finalv2-trust-icon"><Headphones size={20} strokeWidth={1.8} /></span>
                <div>
                  <strong>Real Support</strong>
                  <span>U.S.-based team.</span>
                </div>
              </li>
            </ul>
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
        </section>

      </div>
    </main>
  );
}

// Letter mockup — static, no animation. Matches the cream-paper / Newsreader
// language used everywhere else (state guides, issue pages, demand letter
// admin preview).
function LetterMockup({ compact }: { compact?: boolean } = {}) {
  return (
    <div className={`dl-letter${compact ? " dl-letter-compact" : ""}`}>
      <div className="dl-letter-head">
        <strong>CIVILCASE</strong>
        <span>April 21, 2026</span>
      </div>
      <div className="dl-letter-meta">
        <span><em>To</em> Oakwood Properties LLC</span>
        <span><em>Re</em> Demand for Return of Security Deposit</span>
      </div>
      <p>
        Pursuant to <strong>Cal. Civ. Code § 1950.5</strong>, you were required to return my
        $1,500 security deposit within 21 days of move-out. That period has elapsed.
      </p>
      <p>I demand within <strong>fourteen (14) days</strong>:</p>
      <ul>
        <li>Return of the $1,500 deposit in full;</li>
        <li>Statutory damages of <strong>2x</strong> for bad-faith retention ($3,000).</li>
      </ul>
      <p>
        <strong>Total demand: $4,500.00.</strong> If unresolved, I will file in Small Claims
        Court.
      </p>
      <p className="dl-letter-sig">Jordan A. Tenant</p>
    </div>
  );
}

import type { Metadata } from "next";
import HeroCta from "../../../../components/HeroCta";
import HeroStatePins from "../../../../components/HeroStatePins";
import CtaStepCard from "../../../../components/CtaStepCard";
import Link from "next/link";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import { availableStateSlugs } from "../../../../lib/state-data";
import { STATES } from "../../../../lib/states";

const ISSUE_PHOTOS = ["1521791136064-7986c2920216", "1554224155-1696413565d3", "1554224154-26032ffc0d07", "1517245386807-bb43f82c33c4", "1450101499163-c8848c66ca85"];

export const metadata: Metadata = {
  title: "How to Sue Your Employer in Small Claims Court",
  description:
    "Plain-English guide to suing an employer in small claims. Wrongful termination, unpaid wages, retaliation, last paycheck, stolen tips, and 5 more disputes. What you can recover and how to file in your state.",
  alternates: { canonical: "/small-claims/employer" },
  openGraph: {
    title: "How to Sue Your Employer in Small Claims Court | CivilCase",
    description:
      "Worker-versus-employer disputes you can take to small claims, what you can recover, and how to file in your state.",
    url: "/small-claims/employer",
    type: "article",
  },
};

const ISSUES = [
  {
    slug: "wrongful-termination",
    title: "Wrongful termination",
    blurb:
      "Fired for an illegal reason: discrimination, retaliation, public-policy violation, or breach of contract. Small claims fits when damages are within your state's cap.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 21h18M5 21V8l7-5 7 5v13" />
        <path d="M9 14h6M9 17h6" />
      </svg>
    ),
    ready: true,
  },
  {
    slug: "fired-without-warning",
    title: "Fired without warning",
    blurb:
      "Most states are at-will, so warning is not legally required. But if your handbook or contract promised progressive discipline, the broken promise is a contract claim.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      </svg>
    ),
    ready: true,
  },
  {
    slug: "emotional-distress",
    title: "Emotional distress",
    blurb:
      "Pair with another employment claim. Therapy bills, medical records, and lost work make documented emotional-distress damages succeed in small claims.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="9" />
        <path d="M9 9.5l1 1M15 9.5l-1 1M8 16s1.5-2 4-2 4 2 4 2" />
      </svg>
    ),
    ready: true,
  },
  {
    slug: "hostile-work-environment",
    title: "Hostile work environment (after quitting)",
    blurb:
      "Constructive discharge: you quit because the workplace was so hostile that any reasonable person would have. Discrimination-based hostility usually needs an EEOC charge.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M8 9h8M8 13h6" />
      </svg>
    ),
    ready: true,
  },
  {
    slug: "retaliation",
    title: "Retaliation",
    blurb:
      "Fired or demoted for protected activity: reporting harassment, filing a workers' comp claim, requesting FMLA leave, or whistleblowing. Timing is the case.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M2 12l5-5v3h7V7l5 5-5 5v-3H7v3z" />
      </svg>
    ),
    ready: true,
  },
  {
    slug: "unpaid-wages",
    title: "Unpaid wages",
    blurb:
      "Wages your employer owes you, including overtime. Many states add 2x or 3x liquidated damages. Filing fees usually shift to the employer if you win.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="6" width="18" height="13" rx="2" />
        <path d="M3 10h18M8 15h2M14 15h2" />
      </svg>
    ),
    ready: true,
  },
  {
    slug: "no-w2",
    title: "No W-2",
    blurb:
      "Your employer never sent your W-2. The IRS expects them by January 31. You can also report to the IRS, the state, and recover any out-of-pocket cost from the missing form.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
        <path d="M14 3v6h6M9 13h6M9 17h6" />
      </svg>
    ),
    ready: true,
  },
  {
    slug: "unsafe-working-conditions",
    title: "Unsafe working conditions",
    blurb:
      "Injuries from unsafe conditions usually go through workers' comp. But if the employer fired you for reporting OSHA issues, that is a retaliation claim that fits small claims.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 2L2 22h20L12 2z" />
        <path d="M12 9v6M12 18h.01" />
      </svg>
    ),
    ready: true,
  },
  {
    slug: "last-paycheck",
    title: "Last paycheck withheld",
    blurb:
      "Most states set a deadline for the final paycheck (next regular payday or sooner). Many add 'waiting time' penalties of one day's wages per day late, capped at 30 days.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="6" width="18" height="13" rx="2" />
        <path d="M3 10h18M16 14h2" />
      </svg>
    ),
    ready: true,
  },
  {
    slug: "stolen-tips",
    title: "Stolen tips",
    blurb:
      "Federal law prohibits employers from keeping any tips. Tip pooling with managers or owners is illegal. Recover tips plus liquidated damages plus attorney fees.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 2v3M5 8l-2-1M19 8l2-1M3 11h18l-1 8H4z" />
        <path d="M9 19v-5h6v5" />
      </svg>
    ),
    ready: true,
  },
];

const FEATURED_STATE_SLUGS = [
  "california",
  "texas",
  "florida",
  "new-york",
  "illinois",
  "pennsylvania",
  "ohio",
  "georgia",
  "michigan",
  "north-carolina",
  "minnesota",
  "delaware",
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "How to Sue Your Employer in Small Claims Court",
      description:
        "Practical guide to suing an employer in small claims for unpaid wages, last paycheck, wrongful termination, retaliation, stolen tips, and other workplace disputes.",
      author: { "@type": "Organization", name: "CivilCase" },
      publisher: { "@type": "Organization", name: "CivilCase" },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Can you sue your employer in small claims court?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Yes, when the dispute is mostly about money you are owed (wages, severance, accrued PTO, last paycheck, stolen tips, contract breach) and the amount is within your state's cap (usually $5,000 to $20,000). Discrimination claims usually need an EEOC charge first and damages often outgrow small claims.",
          },
        },
        {
          "@type": "Question",
          name: "How long do you have to sue an employer?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Depends on the legal theory. Wage claims usually run 2 to 4 years (3 years for federal FLSA, longer for willful violations). Breach of contract is typically 3 to 6 years. Federal discrimination claims need an EEOC charge within 180 days (300 in most states). Public-policy retaliation usually 2 to 3 years.",
          },
        },
        {
          "@type": "Question",
          name: "What can you recover from an employer in small claims?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "At minimum, your out-of-pocket loss: unpaid wages, last paycheck, severance, stolen tips, accrued PTO. Many wage statutes add 2x or 3x liquidated damages, plus 'waiting time' penalties for late final paychecks, plus reasonable attorney fees, even though you do not need a lawyer to use small claims.",
          },
        },
      ],
    },
  ],
};

export default function EmployerHubPage() {
  const ready = new Set(availableStateSlugs());
  const featured = FEATURED_STATE_SLUGS.map((slug) => {
    const meta = STATES.find((s) => s.slug === slug);
    return meta && ready.has(slug) ? meta : null;
  }).filter((s): s is NonNullable<typeof s> => s !== null);

  return (
    <main className="cat-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="wrap">
        <Breadcrumbs items={[{ href: "/small-claims", label: "Small Claims" }, { label: "Employer Disputes" }]} />

        {/* HERO */}
        <header className="cat-hero-2col">
          <div className="cat-hero-copy">            <h1>
              How to <em>sue your employer</em> in small claims court.
            </h1>
            <p className="cat-lede">
              If your employer owes you wages, a final paycheck, severance, or stolen tips, small
              claims is the right court. You do not need an attorney. Filing fees are usually
              under $100, and many wage laws add 2x or 3x liquidated damages on top of what you are
              directly owed.
            </p>
            <div className="hero-ctas">
              <HeroCta href="/case-score" variant="dark" icon="case-score">Check my case (free)</HeroCta>
              <HeroCta href="/demand-letter" variant="cream" icon="demand-letter">Send a demand letter</HeroCta>
            </div>
          </div>
          <HeroStatePins />
        </header>

        {/* ISSUE CARDS */}
        <section className="cat-section">
          <div className="sec-head" style={{ textAlign: "left", marginBottom: 28 }}>
            <h2 style={{ margin: 0 }}>
              What can you sue your employer <em>for</em>?
            </h2>
            <p style={{ marginTop: 12, marginLeft: 0, maxWidth: "60ch" }}>
              Pick the one that fits your situation. Each guide covers what you can recover, what
              evidence to bring, and how to file in your state.
            </p>
          </div>
          <div className="photo-grid">
            {ISSUES.map((i, idx) => {
              const inner = (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`https://images.unsplash.com/photo-${ISSUE_PHOTOS[idx % ISSUE_PHOTOS.length]}?w=600&h=600&fit=crop`} alt="" className="photo-card-img" />
                  <span className="photo-card-icon" aria-hidden="true">{i.icon}</span>
                  <div className="photo-card-overlay">
                    <h3>{i.title}</h3>
                    <p>{i.blurb}</p>
                  </div>
                  <span className="photo-card-arrow" aria-hidden="true"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span>
                </>
              );
              return i.ready ? (
                <Link key={i.slug} href={`/small-claims/sue-employer-${i.slug}`} className="photo-card">
                  {inner}
                </Link>
              ) : (
                <div key={i.slug} className="photo-card soon" aria-disabled="true">
                  {inner}
                </div>
              );
            })}
            <Link href="/case-score" className="photo-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=600&fit=crop" alt="" className="photo-card-img" />
              <span className="photo-card-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg></span>
              <div className="photo-card-overlay">
                <h3>Something else?</h3>
                <p>Tell us about your situation in 90 seconds and get a strength read on your case.</p>
              </div>
              <span className="photo-card-arrow" aria-hidden="true"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span>
            </Link>
          </div>
        </section>

        {/* HOW SMALL CLAIMS HANDLES EMPLOYER DISPUTES */}
        <section className="cat-section">
          <div className="sec-head" style={{ textAlign: "left", marginBottom: 24 }}>
            <h2 className="cat-h2" style={{ margin: 0 }}>
              How small claims handles <em>employer disputes</em>.
            </h2>
            <p style={{ margin: "10px 0 0", maxWidth: "60ch", color: "var(--ink-2)" }}>
              Small claims is built for everyday money disputes. Most state caps fall between
              $5,000 and $20,000. Hearings take 10 to 15 minutes. You do not need a lawyer to use
              it. Some claims (like federal discrimination) belong in higher courts instead.
            </p>
          </div>

          <div className="cat-ps">
            <div className="cat-ps-grid">
              <div className="cat-ps-col">
                <h3>Belongs in small claims</h3>
                <div className="cat-ps-item">
                  <div className="cat-ps-num">01</div>
                  <div className="cat-ps-text"><strong>Unpaid wages and overtime.</strong> Plus 2x liquidated damages under most state and federal wage laws.</div>
                </div>
                <div className="cat-ps-item">
                  <div className="cat-ps-num">02</div>
                  <div className="cat-ps-text"><strong>Withheld final paycheck.</strong> Many states add &lsquo;waiting time&rsquo; penalties of one day&rsquo;s wages per day late.</div>
                </div>
                <div className="cat-ps-item">
                  <div className="cat-ps-num">03</div>
                  <div className="cat-ps-text"><strong>Stolen tips.</strong> Federal law prohibits employers from keeping any tip. Recovery often includes 2x liquidated damages.</div>
                </div>
                <div className="cat-ps-item">
                  <div className="cat-ps-num">04</div>
                  <div className="cat-ps-text"><strong>Severance promised but not paid.</strong> If it was in writing or by past practice, it is a contract claim.</div>
                </div>
                <div className="cat-ps-item">
                  <div className="cat-ps-num">05</div>
                  <div className="cat-ps-text"><strong>Accrued PTO not paid out.</strong> Most states require payout at termination, regardless of why you left.</div>
                </div>
              </div>

              <div className="cat-ps-orb" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M12 2v3M5 8l-2-1M19 8l2-1M3 11h18l-1 8H4z" />
                  <path d="M9 19v-5h6v5" />
                </svg>
              </div>

              <div className="cat-ps-col dark">
                <h3>Doesn&rsquo;t belong here</h3>
                <div className="cat-ps-item">
                  <div className="cat-ps-num">×</div>
                  <div className="cat-ps-text"><strong>Federal discrimination claims.</strong> Title VII, ADEA, and ADA require an EEOC charge first.</div>
                </div>
                <div className="cat-ps-item">
                  <div className="cat-ps-num">×</div>
                  <div className="cat-ps-text"><strong>Workplace injuries.</strong> Workers&rsquo; comp is the exclusive remedy in most states.</div>
                </div>
                <div className="cat-ps-item">
                  <div className="cat-ps-num">×</div>
                  <div className="cat-ps-text"><strong>Damages over the cap.</strong> Lost wages above $20,000 belong in regular civil court with a contingency-fee lawyer.</div>
                </div>
                <div className="cat-ps-item">
                  <div className="cat-ps-num">×</div>
                  <div className="cat-ps-text"><strong>Reinstatement.</strong> Small claims awards money, not your job back. Reinstatement requires a labor agency or higher court.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DAMAGES */}
        <section className="cat-section">
          <div className="cat-stack-head">
            <span className="eyebrow">Damages</span>
            <h2>
              What can you <em>recover</em>?
            </h2>
            <p>
              The math judges use. A typical wage case stacks four layers on top of the wages you
              are directly owed.
            </p>
          </div>

          <div className="cat-recovery">
            <div className="cat-recovery-rows">
              <div className="cat-recovery-row">
                <span className="cat-recovery-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12v17l-3-2-3 2-3-2-3 2z" /><path d="M12 8v6M10 9.5c0-.8.7-1.5 1.5-1.5h1c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5h-1c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5h1c.8 0 1.5-.7 1.5-1.5" /></svg></span>
                <span className="cat-recovery-num" aria-hidden="true">01</span>
                <div className="cat-recovery-label">
                  <span className="cat-recovery-tag">Direct damages</span>
                  <p>Unpaid wages, last paycheck, accrued PTO, owed bonus, stolen tips. The dollar amount you can prove was owed.</p>
                </div>
                <div className="cat-recovery-meter">
                  <div className="cat-recovery-amount">$1,800</div>
                  <div className="cat-recovery-bar"><span style={{ width: "30%" }}></span></div>
                  <div className="cat-recovery-bar-label">Base amount</div>
                </div>
              </div>
              <div className="cat-recovery-row accent">
                <span className="cat-recovery-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v17M5 21h14" /><path d="M5 8h14" /><path d="M5 8l-2 5h4z M19 8l-2 5h4z" /><path d="M12 4l-7 4M12 4l7 4" /></svg></span>
                <span className="cat-recovery-num" aria-hidden="true">02</span>
                <div className="cat-recovery-label">
                  <span className="cat-recovery-tag accent">Liquidated damages</span>
                  <p>Most state and federal wage statutes double or triple the unpaid amount when the employer acted willfully.</p>
                </div>
                <div className="cat-recovery-meter">
                  <div className="cat-recovery-amount accent">+$1,800</div>
                  <div className="cat-recovery-bar"><span style={{ width: "62%", background: "var(--accent)" }}></span></div>
                  <div className="cat-recovery-bar-label">Multiplier</div>
                </div>
              </div>
              <div className="cat-recovery-row">
                <span className="cat-recovery-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><path d="M3 12h18" /></svg></span>
                <span className="cat-recovery-num" aria-hidden="true">03</span>
                <div className="cat-recovery-label">
                  <span className="cat-recovery-tag">Attorney&rsquo;s fees</span>
                  <p>Most wage statutes shift the loser&rsquo;s fees to the prevailing employee. That alone pressures early settlement.</p>
                </div>
                <div className="cat-recovery-meter">
                  <div className="cat-recovery-amount">+$300</div>
                  <div className="cat-recovery-bar"><span style={{ width: "8%" }}></span></div>
                  <div className="cat-recovery-bar-label">Typical recovery</div>
                </div>
              </div>
              <div className="cat-recovery-row">
                <span className="cat-recovery-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M19 5L5 19" /><circle cx="7.5" cy="7.5" r="2.5" /><circle cx="16.5" cy="16.5" r="2.5" /></svg></span>
                <span className="cat-recovery-num" aria-hidden="true">04</span>
                <div className="cat-recovery-label">
                  <span className="cat-recovery-tag">Interest</span>
                  <p>4 to 10 percent per year, pre- and post-judgment, depending on the state.</p>
                </div>
                <div className="cat-recovery-meter">
                  <div className="cat-recovery-amount">+$120</div>
                  <div className="cat-recovery-bar"><span style={{ width: "4%" }}></span></div>
                  <div className="cat-recovery-bar-label">Accruing</div>
                </div>
              </div>
            </div>

            <div className="cat-recovery-total">
              <div className="cat-recovery-total-copy">
                <span className="eyebrow" style={{ color: "rgba(254,249,241,0.65)" }}>What you walk away with</span>
                <h3>Estimated <em>recovery</em></h3>
                <p>Sample math on $1,800 in unpaid wages with a willful violation. Your numbers will differ.</p>
              </div>
              <div className="cat-recovery-total-note" aria-hidden="true">
                <span>2.2× the unpaid amount</span>
                <svg viewBox="0 0 60 40" width="50" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M5 8 C 20 5, 40 12, 50 30" /><path d="M42 24 L52 32 L46 36" /></svg>
              </div>
              <div className="cat-recovery-total-num">$4,020</div>
            </div>
          </div>
        </section>

        {/* EVIDENCE */}
        <section className="cat-section">
          <div className="evidence-shell">
            <div className="evidence-shell-head">
              <div className="cat-stack-head" style={{ marginBottom: 0 }}>
                <span className="eyebrow">Build the file</span>
                <h2>
              What evidence do you need to <em>sue your employer</em>?
            </h2>
                <p>
              Employment cases are won on documents. Whatever you do not have on paper, the judge
              takes on your word. An employer with an HR team and a payroll vendor has more paper
              than you do, so your job is to close that gap.
            </p>
              </div>
              <div className="evidence-tagline" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l8 3v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3z" />
                </svg>
                <span>More documentation =<br />stronger case</span>
              </div>
            </div>


          <div className="cat-evidence-grid">
            <div className="cat-evidence-card">
              <div className="cat-evidence-icon">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                  <path d="M14 3v6h6" />
                </svg>
              </div>
              <h4 className="cat-evidence-title">Offer letter and contract</h4>
              <p className="cat-evidence-desc">The signed offer, plus any amendments. Severance terms, bonus structure, and termination clauses live here.</p>
            </div>
            <div className="cat-evidence-card">
              <div className="cat-evidence-icon">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="6" width="18" height="13" rx="2" />
                  <path d="M3 10h18M8 15h2M14 15h2" />
                </svg>
              </div>
              <h4 className="cat-evidence-title">Every paystub and W-2</h4>
              <p className="cat-evidence-desc">Hourly rate, regular hours, overtime, and PTO accrual. The wage math starts here.</p>
            </div>
            <div className="cat-evidence-card">
              <div className="cat-evidence-icon">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h4 className="cat-evidence-title">All HR communications</h4>
              <p className="cat-evidence-desc">Termination email or letter, write-ups, performance reviews, and any text or message about why you were let go.</p>
            </div>
            <div className="cat-evidence-card">
              <div className="cat-evidence-icon">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
              </div>
              <h4 className="cat-evidence-title">Time records</h4>
              <p className="cat-evidence-desc">Punch records, schedule screenshots, or your own contemporaneous log. Critical for unpaid-overtime cases.</p>
            </div>
            <div className="cat-evidence-card">
              <div className="cat-evidence-icon">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M9 14l-3 3 3 3M15 4l3-3 3 3M9 4l-3-3-3 3" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
              </div>
              <h4 className="cat-evidence-title">Employee handbook</h4>
              <p className="cat-evidence-desc">Progressive discipline policies, severance schedules, and PTO payout rules. If the employer broke its own policy, that is a contract claim.</p>
            </div>
            <div className="cat-evidence-card">
              <div className="cat-evidence-icon">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                </svg>
              </div>
              <h4 className="cat-evidence-title">Witness contact info</h4>
              <p className="cat-evidence-desc">Coworkers who heard the comments, saw the conditions, or know what really happened. A short signed declaration helps.</p>
            </div>
          </div>
          </div>
        </section>

        {/* STATE-SPECIFIC RULES */}
        <section className="cat-section">
          <div className="cat-split">
            <div className="cat-split-intro">
              <span className="eyebrow">By state</span>
              <h2>
                State-specific <em>rules</em>.
              </h2>
              <p>
                Wage and termination rules vary state by state. Final-paycheck deadlines, waiting-time
                penalties, PTO payout, and tip rules are different in every state. Pick yours for the
                exact statute and form numbers.
              </p>
              <Link href="/small-claims" className="cat-text-link">
                See all 50 state guides →
              </Link>
            </div>
            <div className="cat-state-grid">
              {featured.map((s) => (
                <Link key={s.slug} href={`/small-claims/${s.slug}`} className="cat-state-link">
                  <span>{s.name}</span>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTAs */}
        <section className="cat-section">
          <div style={{ background: "#0d0d0d", color: "#fff", padding: "32px 0", borderRadius: 20, position: "relative", overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.85fr 1fr", gap: 0, alignItems: "center" }}>
              {/* LEFT — title + 3 step cards */}
              <div style={{ padding: "12px 44px 20px" }}>
                <span className="eyebrow" style={{ color: "rgba(254,249,241,0.65)" }}>Take the next step</span>
                <h2 style={{ fontFamily: "Newsreader, Georgia, serif", fontSize: "clamp(28px, 2.8vw, 38px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1, margin: "14px 0 28px", color: "#fef9f1" }}>
                  Three ways to <em style={{ fontStyle: "italic", color: "#f5b29f", fontWeight: 700 }}>move forward</em>.
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, alignItems: "stretch", position: "relative" }}>
                  <CtaStepCard href="/demand-letter" bg="#4ad96a" tone="dark" stepNum="01" stepPos="top-left" title="Send a demand letter" titlePos="bottom-left" />
                  <CtaStepCard href="/case-score" bg="#fff" tone="dark" stepNum="02" stepPos="bottom-right" title="Check my case" titlePos="top-left" gradient />
                  <CtaStepCard href="/small-claims" bg="#7344ee" tone="light" stepNum="03" stepPos="top-right" title="File your claim" titlePos="bottom-right" />
                </div>
              </div>
              {/* RIGHT — testimonial */}
              <div style={{ borderLeft: "1px solid #1f1f1f", padding: "20px 44px", position: "relative", alignSelf: "stretch", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ fontFamily: "Geist, system-ui, sans-serif", fontWeight: 900, fontSize: 70, lineHeight: 0.5, color: "#2a2a2a", marginBottom: 14, letterSpacing: "-0.06em" }} aria-hidden="true">
                  &rdquo;&rdquo;
                </div>
                <div style={{ width: 48, height: 1, background: "#3a3a3a", marginBottom: 14 }} />
                <p style={{ fontFamily: "Newsreader, Georgia, serif", fontSize: 18, fontStyle: "italic", lineHeight: 1.35, letterSpacing: "-0.005em", color: "#fef9f1", margin: "0 0 16px" }}>
                  Recovered $6,200 in unpaid wages and a doubled penalty. Filed it myself in two weeks.
                </p>
                <div>
                  <div style={{ fontFamily: "Geist, system-ui, sans-serif", fontWeight: 700, fontSize: 14, color: "#fff", marginBottom: 2 }}>Marcus T.</div>
                  <div style={{ fontSize: 12.5, color: "#9aa0a6" }}>Worker · Texas</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="cat-section">
          <div className="cat-split">
            <div className="cat-split-intro">
              <span className="eyebrow">FAQ</span>
              <h2>
                Common <em>questions</em>.
              </h2>
              <p>
                The questions workers actually ask before filing. Don&rsquo;t see yours?{" "}
                <Link href="/contact" className="cat-text-link">
                  Email support
                </Link>
                .
              </p>
            </div>
            <div className="cat-faq">
              <details>
                <summary>Can you sue your employer in small claims court?</summary>
                <div>
                  <p>
                    Yes, when the dispute is mostly about money you are owed (wages, severance,
                    accrued PTO, last paycheck, stolen tips, contract breach) and the amount is
                    within your state&rsquo;s cap (usually $5,000 to $20,000). Federal discrimination
                    claims usually need an EEOC charge first and damages often outgrow small claims.
                  </p>
                </div>
              </details>
              <details>
                <summary>How long do you have to sue an employer?</summary>
                <div>
                  <p>
                    Depends on the legal theory. Wage claims usually run 2 to 4 years (3 years for
                    federal FLSA, longer for willful violations). Breach of contract is typically
                    3 to 6 years. Federal discrimination claims need an EEOC charge within 180 days
                    (300 days in most states). Public-policy retaliation usually 2 to 3 years.
                  </p>
                </div>
              </details>
              <details>
                <summary>Do you need a lawyer to sue an employer?</summary>
                <div>
                  <p>
                    No, not for small claims. In most states attorneys are permitted but not
                    required. In a few states (California, for example) lawyers are not even
                    allowed at the initial small-claims hearing. The format is built for
                    self-represented litigants.
                  </p>
                </div>
              </details>
              <details>
                <summary>What if your employer ignores your demand letter?</summary>
                <div>
                  <p>
                    That is the signal to file in small claims. The demand letter creates the paper
                    trail you point to at the hearing, and most judges expect to see one. Read your
                    state&rsquo;s small-claims guide for the specific filing fee, forms, and service
                    rules.
                  </p>
                </div>
              </details>
              <details>
                <summary>Can you sue your employer while you still work there?</summary>
                <div>
                  <p>
                    Legally yes. Practically, be careful. Most states have anti-retaliation laws
                    that protect you if the employer tries to fire or demote you in response to a
                    lawsuit, but those laws are easier to invoke than to enforce. Many workers wait
                    until they have a new job lined up.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* DISCLAIMER */}
        <p className="cat-disclaimer">
          <strong>This is general legal information, not legal advice.</strong> CivilCase is not a law
          firm. Employment law varies by state, county, and contract. Verify deadlines and statute
          citations against your state&rsquo;s official source before filing, or{" "}
          <Link href="/disclaimer" className="cat-text-link">read our disclaimer</Link>.
        </p>
      </div>
    </main>
  );
}

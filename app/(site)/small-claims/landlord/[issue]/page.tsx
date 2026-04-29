import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "../../../../../components/Breadcrumbs";
import { availableStateSlugs } from "../../../../../lib/state-data";
import { STATES } from "../../../../../lib/states";

interface Issue {
  slug: string;
  title: string;
  short: string;
  ready: boolean;
}

const ISSUES: Issue[] = [
  { slug: "security-deposit", title: "Sue a Landlord for Security Deposit Return", short: "Security deposit not returned", ready: true },
  { slug: "mold", title: "Sue a Landlord for Mold or Habitability Failures", short: "Mold or habitability", ready: false },
  { slug: "wrongful-eviction", title: "Sue a Landlord for Wrongful Eviction", short: "Wrongful eviction", ready: false },
  { slug: "illegal-lockout", title: "Sue a Landlord for an Illegal Lockout", short: "Illegal lockout", ready: false },
  { slug: "repairs-not-made", title: "Sue a Landlord for Unmade Repairs", short: "Repairs not made", ready: false },
  { slug: "pest-infestation", title: "Sue a Landlord for Pest Infestation", short: "Pest infestation", ready: false },
  { slug: "lead-poisoning", title: "Sue a Landlord for Lead-Paint Violations", short: "Lead poisoning", ready: false },
];

export function generateStaticParams() {
  return ISSUES.map((i) => ({ issue: i.slug }));
}
export const dynamicParams = false;

interface Props {
  params: { issue: string };
}

export function generateMetadata({ params }: Props): Metadata {
  const issue = ISSUES.find((i) => i.slug === params.issue);
  if (!issue) return {};
  if (issue.slug === "security-deposit") {
    return {
      title: "Sue a Landlord for Security Deposit Return — small claims guide",
      description:
        "How to sue your landlord in small claims for an unreturned security deposit. State deposit-return deadlines, statutory penalties (often 2x or 3x the wrongfully withheld amount), and step-by-step filing.",
      alternates: { canonical: `/small-claims/landlord/${issue.slug}` },
      openGraph: {
        title: "Sue a Landlord for Security Deposit Return | CivilCase",
        description:
          "When and how to recover a wrongfully withheld security deposit through small claims court.",
        url: `/small-claims/landlord/${issue.slug}`,
        type: "article",
      },
    };
  }
  return {
    title: `${issue.title} — small claims guide`,
    description: `How to take a ${issue.short.toLowerCase()} dispute to small claims court. Coming soon — see related guides in the meantime.`,
    alternates: { canonical: `/small-claims/landlord/${issue.slug}` },
    robots: { index: false, follow: true }, // don't index stubs
  };
}

export default function LandlordIssuePage({ params }: Props) {
  const issue = ISSUES.find((i) => i.slug === params.issue);
  if (!issue) notFound();
  if (issue.slug === "security-deposit") return <SecurityDepositPage />;
  return <ComingSoon issue={issue} />;
}

/* ──────────────────────────────────────────────────────────────────────
   FULL PAGE — security deposit
   ────────────────────────────────────────────────────────────────────── */

const DEPOSIT_STATE_TABLE = [
  { state: "California", slug: "california", deadline: "21 days", penalty: "Bad-faith withholding: actual damages + up to 2x the deposit", statute: "Civ. Code § 1950.5" },
  { state: "New York", slug: "new-york", deadline: "14 days", penalty: "Willful violation: punitive damages up to 2x the deposit", statute: "Gen. Oblig. § 7-108" },
  { state: "Texas", slug: "texas", deadline: "30 days", penalty: "Bad-faith withholding: $100 + 3x the deposit + attorney fees", statute: "Prop. Code § 92.109" },
  { state: "Florida", slug: "florida", deadline: "15-60 days", penalty: "Failure to send notice: forfeit right to claim deposit", statute: "Fla. Stat. § 83.49" },
  { state: "Illinois", slug: "illinois", deadline: "30-45 days", penalty: "Willful violation: 2x the deposit + attorney fees", statute: "765 ILCS 710" },
  { state: "Pennsylvania", slug: "pennsylvania", deadline: "30 days", penalty: "Wrongful withholding: 2x the deposit", statute: "68 P.S. § 250.512" },
  { state: "Michigan", slug: "michigan", deadline: "30 days", penalty: "Failure to send notice: forfeit right to deposit; bad faith: 2x", statute: "MCL § 554.609" },
  { state: "Massachusetts", slug: "massachusetts", deadline: "30 days", penalty: "Bad faith: 3x deposit + interest + attorney fees", statute: "M.G.L. c. 186 § 15B" },
  { state: "Minnesota", slug: "minnesota", deadline: "21 days", penalty: "Bad faith: 2x wrongfully withheld + up to $500 punitive", statute: "Minn. Stat. § 504B.178" },
  { state: "Washington", slug: "washington", deadline: "30 days", penalty: "Bad faith: 2x the deposit + attorney fees", statute: "RCW 59.18.280" },
  { state: "Colorado", slug: "colorado", deadline: "30-60 days", penalty: "Willful retention: 3x the deposit + attorney fees", statute: "C.R.S. § 38-12-103" },
  { state: "Oregon", slug: "oregon", deadline: "31 days", penalty: "Bad faith: 2x the deposit", statute: "ORS 90.300" },
];

function SecurityDepositPage() {
  const ready = new Set(availableStateSlugs());

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "Sue a Landlord for Security Deposit Return",
        description:
          "How to sue your landlord for an unreturned security deposit in small claims court. State deposit-return deadlines, statutory penalties, and step-by-step filing.",
        author: { "@type": "Organization", name: "CivilCase" },
        publisher: { "@type": "Organization", name: "CivilCase" },
      },
      {
        "@type": "HowTo",
        name: "How to sue a landlord for security deposit return",
        step: [
          { "@type": "HowToStep", name: "Send a written demand with your forwarding address" },
          { "@type": "HowToStep", name: "Wait the statutory deadline (typically 14-30 days)" },
          { "@type": "HowToStep", name: "Send a final demand letter with statutory penalty calculation" },
          { "@type": "HowToStep", name: "File in small claims court if no response" },
          { "@type": "HowToStep", name: "Serve the landlord per your state's rules" },
          { "@type": "HowToStep", name: "Bring your evidence to the hearing" },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How long does my landlord have to return my deposit?",
            acceptedAnswer: { "@type": "Answer", text: "Deadlines range from 14 days (New York) to 60 days (parts of Florida). Most states fall in the 21-30 day range. The clock typically starts on the later of move-out or your written notice of forwarding address." },
          },
          {
            "@type": "Question",
            name: "Can I get more than just my deposit back?",
            acceptedAnswer: { "@type": "Answer", text: "Yes, in most states. Statutory penalties of 2x or 3x the wrongfully withheld amount are common when the landlord acted in bad faith. Many statutes also shift attorney fees to the loser." },
          },
          {
            "@type": "Question",
            name: "What counts as 'bad faith' withholding?",
            acceptedAnswer: { "@type": "Answer", text: "Failing to send any itemized list, inventing damages that pre-existed your tenancy, charging for normal wear and tear, or simply ignoring your demand are all common findings of bad faith. Document everything." },
          },
        ],
      },
    ],
  };

  return (
    <main className="cat-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="wrap">
        <Breadcrumbs
          items={[
            { href: "/small-claims", label: "Small Claims" },
            { href: "/small-claims/landlord", label: "Landlord disputes" },
            { label: "Security deposit" },
          ]}
        />

        <header className="cat-hero">
          <span className="eyebrow">Landlord disputes</span>
          <h1>
            Sue a Landlord for <em>Security Deposit Return</em>
          </h1>
          <p className="cat-lede">
            If your landlord didn&rsquo;t return your deposit on time, you&rsquo;re not just owed
            the deposit — most states stack a statutory penalty on top, often <strong>2x or 3x
            the wrongfully withheld amount</strong>, plus attorney fees. Small claims is the
            right venue and you don&rsquo;t need a lawyer to use it.
          </p>
          <div className="hero-ctas">
            <Link href="/case-score" className="btn btn-dark">
              Check my case (free)
            </Link>
            <Link href="/demand-letter" className="btn btn-cream">
              Send a demand letter
            </Link>
          </div>
        </header>

        {/* QUICK ELIGIBILITY — decision flow */}
        <section className="cat-section">
          <div className="cat-stack-head">
            <span className="eyebrow">Quick check</span>
            <h2>Are you eligible to <em>sue</em>?</h2>
            <p>Four conditions. Hit all four and you have a viable small-claims case.</p>
          </div>

          <div className="cat-flow">
            <div className="cat-flow-step">
              <div className="cat-flow-num">1</div>
              <div className="cat-flow-text">
                <strong>You moved out</strong>
                <span>and gave the landlord written notice of where to send the deposit.</span>
              </div>
            </div>
            <div className="cat-flow-arrow">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </div>
            <div className="cat-flow-step">
              <div className="cat-flow-num">2</div>
              <div className="cat-flow-text">
                <strong>Deadline passed</strong>
                <span>your state&rsquo;s deposit-return deadline (typically 14&ndash;30 days).</span>
              </div>
            </div>
            <div className="cat-flow-arrow">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </div>
            <div className="cat-flow-step">
              <div className="cat-flow-num">3</div>
              <div className="cat-flow-text">
                <strong>Landlord kept some or all</strong>
                <span>of the deposit, sent no itemized list, or ignored you entirely.</span>
              </div>
            </div>
            <div className="cat-flow-arrow">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </div>
            <div className="cat-flow-step ok">
              <div className="cat-flow-num">✓</div>
              <div className="cat-flow-text">
                <strong>You can file</strong>
                <span>under your state&rsquo;s small-claims cap (usually $5K&ndash;$20K).</span>
              </div>
            </div>
          </div>

          <p style={{ margin: "18px 0 0", fontSize: 15, color: "var(--muted)", textAlign: "center" }}>
            All four hit? Run it through the{" "}
            <Link href="/case-score" className="cat-text-link">case-score quiz</Link>{" "}
            for a 90-second strength read.
          </p>
        </section>

        {/* HOW LONG */}
        <section className="cat-section">
          <div className="cat-split">
            <div className="cat-split-intro">
              <span className="eyebrow">The clock</span>
              <h2>
                How long does your <em>landlord</em> have?
              </h2>
              <p>
                Every state has a hard deadline for returning the deposit (or sending an itemized
                list of deductions). Miss it, and the landlord typically forfeits the right to
                withhold any of it.
              </p>
            </div>
            <div className="cat-elig-list">
              <div className="cat-elig-row">
                <div className="cat-elig-step">A</div>
                <div>
                  <h4>Move-out date</h4>
                  <p>The day you handed back the keys and vacated the unit.</p>
                </div>
              </div>
              <div className="cat-elig-row">
                <div className="cat-elig-step">B</div>
                <div>
                  <h4>Forwarding-address notice</h4>
                  <p>Written notice (certified mail or email with read receipt) telling the landlord where to send the deposit.</p>
                </div>
              </div>
              <div className="cat-elig-row clock">
                <div className="cat-elig-step">▶</div>
                <div>
                  <h4>The clock starts on the later of the two</h4>
                  <p>That&rsquo;s why the forwarding-address notice matters — without it the deadline never starts.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATE TABLE */}
        <section className="cat-section">
          <h2 className="cat-h2">
            State <em>deadlines</em> and penalties.
          </h2>
          <p style={{ maxWidth: "60ch", color: "var(--ink-2)" }}>
            A working snapshot of the most common states. Always confirm against the cited
            statute or your state&rsquo;s judiciary site before filing.
          </p>
          <div className="cat-table-wrap">
            <table className="cat-table">
              <thead>
                <tr>
                  <th>State</th>
                  <th>Deadline</th>
                  <th>Bad-faith penalty</th>
                  <th>Statute</th>
                </tr>
              </thead>
              <tbody>
                {DEPOSIT_STATE_TABLE.map((row) => (
                  <tr key={row.state}>
                    <td>
                      {ready.has(row.slug) ? (
                        <Link href={`/small-claims/${row.slug}`} className="cat-text-link">
                          {row.state}
                        </Link>
                      ) : (
                        row.state
                      )}
                    </td>
                    <td>{row.deadline}</td>
                    <td>{row.penalty}</td>
                    <td><code>{row.statute}</code></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: 18, fontSize: 14, color: "var(--muted)" }}>
            <Link href="/small-claims" className="cat-text-link">
              See all 50 state guides →
            </Link>
          </p>
        </section>

        {/* WHAT YOU CAN RECOVER */}
        <section className="cat-section">
          <div className="cat-split">
            <div className="cat-split-intro">
              <span className="eyebrow">Damages</span>
              <h2>
                Three layers, <em>stacked</em>.
              </h2>
              <p>
                Bring receipts and clear math to the hearing &mdash; judges award what they can
                verify. The burden is on the landlord to justify deductions, not on you to
                disprove them.
              </p>
            </div>
            <div className="cat-damages-grid" style={{ marginTop: 0, gridTemplateColumns: "1fr" }}>
              <div className="cat-damage">
                <div className="cat-damage-tag">1 — The deposit</div>
                <p>
                  Whatever the landlord wrongfully withheld. If they kept $1,200 of a $1,500
                  deposit and sent no itemized list (or one full of normal wear and tear),
                  you&rsquo;re asking for the full $1,500.
                </p>
              </div>
              <div className="cat-damage">
                <div className="cat-damage-tag">2 — Statutory penalty</div>
                <p>
                  <strong>2x or 3x the wrongfully withheld amount</strong> in most states when
                  the landlord acted in bad faith. Texas adds $100 + 3x the deposit;
                  Massachusetts adds 3x plus interest plus attorney fees.
                </p>
              </div>
              <div className="cat-damage">
                <div className="cat-damage-tag">3 — Attorney&rsquo;s fees + interest</div>
                <p>
                  Most security-deposit statutes shift attorney fees to the loser, even if you
                  go pro se. The threat of fee-shifting is what pushes most landlords to settle
                  once a real demand letter shows up. Pre- and post-judgment interest also runs
                  at your state&rsquo;s legal rate.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* STEP BY STEP */}
        <section className="cat-section">
          <h2 className="cat-h2">
            Step-by-step: <em>how to sue</em>.
          </h2>
          <ol className="cat-steps">
            <li>
              <h3>Send a written demand for the deposit</h3>
              <p>
                Include your forwarding address, the lease end date, the amount owed, and a
                deadline (14 days is standard). Send certified mail with return receipt. This is
                the document that starts your state&rsquo;s clock.
              </p>
            </li>
            <li>
              <h3>Wait out the statutory deadline</h3>
              <p>
                Each state sets a hard deadline for the landlord to return your deposit (or
                send an itemized list of deductions). Don&rsquo;t file before it. Once it passes
                without compliance, you have proof of a statutory violation.
              </p>
            </li>
            <li>
              <h3>Send a final demand letter</h3>
              <p>
                Now your demand calculates the full statutory penalty &mdash; deposit + 2x or
                3x penalty + interest + filing fee + attorney fees. About half of disputes
                resolve here when the landlord sees a real number.{" "}
                <Link href="/demand-letter" className="cat-text-link">
                  Generate a demand letter
                </Link>{" "}
                if you don&rsquo;t want to write one yourself.
              </p>
            </li>
            <li>
              <h3>File in small claims</h3>
              <p>
                Find your state&rsquo;s small-claims division (often called Justice Court,
                Conciliation Court, District Court, or just Small Claims), get the right form
                (Statement of Claim, SC-100, etc.), and file. Filing fee is usually $30&ndash;$80.
                Your{" "}
                <Link href="/small-claims" className="cat-text-link">state guide</Link>{" "}
                walks through the exact form numbers and where to file.
              </p>
            </li>
            <li>
              <h3>Serve the landlord</h3>
              <p>
                Most states require formal service &mdash; sheriff, certified mail by clerk, or
                a private process server. You can&rsquo;t serve it yourself. The court usually
                wants proof of service filed at least 7&ndash;14 days before the hearing.
              </p>
            </li>
            <li>
              <h3>Show up to the hearing with your evidence</h3>
              <p>
                Bring the lease, the move-in/move-out documentation, your forwarding-address
                notice, the certified-mail receipts, photos of the unit&rsquo;s condition at
                move-out, and your demand-letter copies. The hearing is short &mdash; 10 to 15
                minutes is typical. Lead with the dollar number, the statute, and the
                paper trail.
              </p>
            </li>
            <li>
              <h3>Collect after you win</h3>
              <p>
                Most states give the landlord 30 days to pay. After that, judgment liens, wage
                garnishment, and bank levies are available. Most landlords pay rather than have
                a recorded judgment hit their property records or business filings.
              </p>
            </li>
          </ol>
        </section>

        {/* COMMON DEFENSES */}
        <section className="cat-section">
          <div className="cat-split">
            <div className="cat-split-intro">
              <span className="eyebrow">Be ready</span>
              <h2>
                Common landlord <em>defenses</em>.
              </h2>
              <p>
                Landlords usually try one of three. Each has a clean rebuttal if you have your
                paperwork in order.
              </p>
            </div>
            <div className="cat-defense-list">
              <div className="cat-defense">
                <div className="cat-defense-claim">&ldquo;The damages exceeded the deposit.&rdquo;</div>
                <p>
                  <strong>Counter:</strong> they have to prove it with itemized invoices,
                  photos, and reasonable estimates. Bring your move-in walkthrough photos and
                  checklist. If they skipped the move-in walkthrough, that itself is a fact the
                  judge cares about.
                </p>
              </div>
              <div className="cat-defense">
                <div className="cat-defense-claim">&ldquo;You never gave us a forwarding address.&rdquo;</div>
                <p>
                  <strong>Counter:</strong> certified-mail receipt with the return signature, or
                  a printed email with full headers and timestamp. Without proof, your case
                  isn&rsquo;t dead but the penalty calculation gets harder &mdash; the clock
                  may not have started.
                </p>
              </div>
              <div className="cat-defense">
                <div className="cat-defense-claim">&ldquo;Normal wear and tear&rdquo; charges.</div>
                <p>
                  <strong>Counter:</strong> carpet wear after years of use, paint scuffs, nail
                  holes, faded curtains &mdash; these are wear and tear, not damages. Cite your
                  state&rsquo;s definition (most statutes have one) and bring photos of the
                  move-out condition.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cat-section">
          <div className="cat-cta-card">
            <div>
              <span className="eyebrow" style={{ color: "rgba(254,249,241,0.65)" }}>Move forward</span>
              <h2 style={{ marginTop: 14 }}>
                Ready to <em>get your deposit back</em>?
              </h2>
              <p>
                Most landlords pay once a real demand letter shows up. If yours doesn&rsquo;t,
                small claims is the next step.
              </p>
            </div>
            <div className="cat-cta-row">
              <Link href="/demand-letter" className="cat-cta-tile">
                <div className="cat-cta-tile-icon">✉</div>
                <div>
                  <strong>Send a demand letter</strong>
                  <span>Itemized, statutory, professional.</span>
                </div>
              </Link>
              <Link href="/case-score" className="cat-cta-tile">
                <div className="cat-cta-tile-icon">📊</div>
                <div>
                  <strong>Check my case strength</strong>
                  <span>Free in 90 seconds.</span>
                </div>
              </Link>
              <Link href="/small-claims" className="cat-cta-tile">
                <div className="cat-cta-tile-icon">⚖</div>
                <div>
                  <strong>File in your state</strong>
                  <span>Forms, fees, deadlines.</span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="cat-section">
          <div className="cat-split">
            <div className="cat-split-intro">
              <span className="eyebrow">FAQ</span>
              <h2>
                Frequently <em>asked</em>.
              </h2>
              <p>
                The questions tenants actually ask before filing.{" "}
                <Link href="/contact" className="cat-text-link">
                  Email support
                </Link>{" "}
                if yours isn&rsquo;t here.
              </p>
            </div>
          <div className="cat-faq">
            <details>
              <summary>How long does my landlord have to return my deposit?</summary>
              <div>
                <p>
                  14 to 60 days, depending on the state. Most fall in the 21&ndash;30 day range.
                  The clock starts on the later of move-out or your written forwarding-address
                  notice. See the state table above.
                </p>
              </div>
            </details>
            <details>
              <summary>Can I get more than my deposit back?</summary>
              <div>
                <p>
                  Yes, in most states. Statutory penalties of 2x or 3x the wrongfully withheld
                  amount are common when the landlord acted in bad faith. Many statutes also
                  shift attorney fees to the loser, which means even pro se plaintiffs get
                  meaningful leverage from that provision.
                </p>
              </div>
            </details>
            <details>
              <summary>What counts as &ldquo;bad faith&rdquo; withholding?</summary>
              <div>
                <p>
                  Failing to send any itemized list of deductions, inventing damages that
                  pre-existed your tenancy, charging for normal wear and tear, or simply
                  ignoring your demand are all common findings of bad faith.
                </p>
              </div>
            </details>
            <details>
              <summary>Do I need a lawyer for this?</summary>
              <div>
                <p>
                  No. Small claims is built for self-represented litigants. In a few states
                  (California, for instance) lawyers aren&rsquo;t even allowed at the initial
                  hearing. The hearing typically takes 10&ndash;15 minutes.
                </p>
              </div>
            </details>
            <details>
              <summary>What if my deposit was bigger than the small-claims cap?</summary>
              <div>
                <p>
                  You have two options: waive the excess and stay in small claims, or file in
                  your state&rsquo;s regular civil court. For deposits, this is usually only an
                  issue when statutory penalties push the total above the cap &mdash; in which
                  case talking to a tenant-rights attorney is worth it.
                </p>
              </div>
            </details>
          </div>
          </div>
        </section>

        <p className="cat-disclaimer">
          <strong>This is general legal information, not legal advice.</strong> CivilCase is not a law firm.
          Security-deposit rules vary by state, and exceptions apply. Verify deadlines and
          statute citations against your state&rsquo;s official source before filing, or{" "}
          <Link href="/disclaimer" className="cat-text-link">read our disclaimer</Link>.
        </p>
      </div>
    </main>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   STUB — not yet published
   ────────────────────────────────────────────────────────────────────── */
function ComingSoon({ issue }: { issue: Issue }) {
  return (
    <main className="cat-page">
      <div className="wrap">
        <Breadcrumbs
          items={[
            { href: "/small-claims", label: "Small Claims" },
            { href: "/small-claims/landlord", label: "Landlord disputes" },
            { label: issue.short },
          ]}
        />
        <header className="cat-hero">
          <span className="eyebrow">Coming soon</span>
          <h1>
            {issue.title.split(" for ")[0]} for <em>{issue.title.split(" for ")[1]?.toLowerCase()}</em>
          </h1>
          <p className="cat-lede">
            We&rsquo;re writing this guide. In the meantime, the landlord-disputes hub covers
            the basics that apply to every tenant case &mdash; and your state guide has the
            specific filing rules you&rsquo;ll need.
          </p>
          <div className="hero-ctas">
            <Link href="/small-claims/landlord" className="btn btn-dark">
              Back to landlord hub
            </Link>
            <Link href="/case-score" className="btn btn-cream">
              Check my case
            </Link>
          </div>
        </header>
      </div>
    </main>
  );
}

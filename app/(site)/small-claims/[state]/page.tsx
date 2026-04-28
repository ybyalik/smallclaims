import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { STATES, getStateBySlug } from "../../../../lib/states";
import { availableStateSlugs, loadStateGuide } from "../../../../lib/state-data";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import StatuteChecker from "../../../../components/widgets/StatuteChecker";
import FeeCalculator from "../../../../components/widgets/FeeCalculator";
import ClaimExplorer from "../../../../components/widgets/ClaimExplorer";
import GroupedForms from "../../../../components/widgets/GroupedForms";

// Pre-generate every state. States without data render a "coming soon" placeholder.
export function generateStaticParams() {
  return STATES.map((s) => ({ state: s.slug }));
}

export const dynamicParams = false;

type Params = { params: { state: string } };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const state = getStateBySlug(params.state);
  if (!state) return {};
  const guide = await loadStateGuide(params.state);
  if (!guide) {
    return {
      title: `Small Claims in ${state.name}: Guide Coming Soon`,
      description: `Our plain-English small claims guide for ${state.name} is in research. We're publishing every state.`,
      alternates: { canonical: `/small-claims/${state.slug}` },
    };
  }
  return {
    title: `Small Claims in ${state.name}: Filing, Fees, Forms, Collecting (${new Date().getFullYear()})`,
    description: `How to file a small claims case in ${state.name}. Sue for up to $${guide.limits.individual.toLocaleString()}, with fees from $${guide.fees.tiers[0].amount}. Plain-English guide for individuals and small businesses.`,
    alternates: { canonical: `/small-claims/${state.slug}` },
    openGraph: {
      title: `Small Claims in ${state.name}: Plain-English Guide`,
      description: `Sue for up to $${guide.limits.individual.toLocaleString()} in ${state.name} small claims. Filing, forms, fees, deadlines, and how to actually collect.`,
      url: `/small-claims/${state.slug}`,
      type: "article",
    },
  };
}

const fmtMoney = (n: number) => "$" + n.toLocaleString("en-US");

function ComingSoon({ stateName }: { stateName: string }) {
  const ready = new Set(availableStateSlugs());
  const readyStates = STATES.filter((s) => ready.has(s.slug));
  return (
    <main className="wrap" style={{ paddingBottom: 96 }}>
      <Breadcrumbs items={[{ href: "/small-claims", label: "Small Claims" }, { label: stateName }]} />
      <section className="coming-soon">
        <span className="eyebrow">Coming soon</span>
        <h1>
          We&rsquo;re researching <em>{stateName}.</em>
        </h1>
        <p>
          Our small-claims guide for {stateName} is under research. We&rsquo;re working through every
          state with the same depth: filing limits, fees, forms, deadlines, service rules, and
          collection methods. We&rsquo;ll publish {stateName} as soon as it&rsquo;s ready.
        </p>
        {readyStates.length > 0 && (
          <div className="coming-soon-ready">
            <h3>Available now</h3>
            <ul>
              {readyStates.map((s) => (
                <li key={s.slug}>
                  <Link href={`/small-claims/${s.slug}`}>{s.name} →</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        <p className="coming-soon-back">
          <Link href="/small-claims">← Back to all states</Link>
        </p>
      </section>
    </main>
  );
}

export default async function StateGuide({ params }: Params) {
  const state = getStateBySlug(params.state);
  if (!state) notFound();
  const g = await loadStateGuide(params.state);
  if (!g) return <ComingSoon stateName={state.name} />;

  const totalClaims = g.whatYouCanSueFor.reduce((n, c) => n + c.claims.length, 0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: `Small Claims in ${g.state}: Filing, Fees, Forms, Collecting`,
        description: g.hero.tagline,
        datePublished: g.lastUpdated,
        dateModified: g.lastUpdated,
        author: { "@type": "Organization", name: "CivilCase" },
        publisher: { "@type": "Organization", name: "CivilCase" },
      },
      {
        "@type": "FAQPage",
        mainEntity: g.faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  };

  return (
    <main className="guide" data-state={g.slug}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="wrap">
        <Breadcrumbs items={[{ href: "/small-claims", label: "Small Claims" }, { label: g.state }]} />

        {/* HERO */}
        <section className="g-hero">
          <span className="eyebrow">Small Claims Guide</span>
          <h1>
            Small claims in <em>{g.state}.</em>
          </h1>
          <p className="g-hero-tagline">{g.hero.tagline}</p>
          <div className="g-hero-stats">
            <div>
              <span className="stat-num">{fmtMoney(g.hero.individualLimit)}</span>
              <span className="stat-lbl">Most you can sue for</span>
            </div>
            <div>
              <span className="stat-num">${g.hero.filingFeeLow}–${g.hero.filingFeeHigh}</span>
              <span className="stat-lbl">Filing fee</span>
            </div>
            <div>
              <span className="stat-num">
                {g.hero.typicalTimelineDays.min}–{g.hero.typicalTimelineDays.max} days
              </span>
              <span className="stat-lbl">Typical timeline</span>
            </div>
          </div>
          <div className="g-hero-cta">
            <a className="btn btn-dark" href="#what-to-sue-for">
              See what you can sue for
            </a>
            <a className="btn btn-cream" href="#fee-calculator">
              Calculate my filing fee
            </a>
          </div>
        </section>

        {/* AT A GLANCE */}
        <section className="g-glance">
          <ul>
            {g.ataGlance.map((f) => (
              <li key={f.label}>
                <span className="glance-lbl">{f.label}</span>
                <span className="glance-val">{f.value}</span>
                {f.detail && <span className="glance-detail">{f.detail}</span>}
              </li>
            ))}
          </ul>
        </section>

        {/* WHAT YOU CAN SUE FOR */}
        <section id="what-to-sue-for" className="g-section">
          <header className="g-section-head">
            <span className="eyebrow">What you can sue for</span>
            <h2>Find your situation.</h2>
            <p>
              {g.state} small claims handles money disputes up to {fmtMoney(g.limits.individual)} (or{" "}
              {fmtMoney(g.limits.business)} if you're a business). Browse {g.whatYouCanSueFor.length} categories
              and {totalClaims} specific claim types below.
            </p>
          </header>
          <ClaimExplorer categories={g.whatYouCanSueFor} />

          <details className="g-exclusions-toggle">
            <summary>
              <span className="eyebrow-inline">Wrong court for these</span>
              <span>{g.whatYouCannotSueFor.length} situations small claims can&rsquo;t handle</span>
            </summary>
            <ul className="g-exclusions">
              {g.whatYouCannotSueFor.map((ex) => (
                <li key={ex.category}>
                  <h4>{ex.category}</h4>
                  <p>{ex.explanation}</p>
                  {ex.whereToGoInstead && (
                    <p className="exclusion-redirect">
                      <strong>Try instead:</strong> {ex.whereToGoInstead}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </details>
        </section>

        {/* THE PROCESS */}
        <section id="process" className="g-section">
          <header className="g-section-head">
            <span className="eyebrow">The process</span>
            <h2>From owed to paid in <em>6 steps.</em></h2>
          </header>

          <div className="g-step">
            <div className="g-step-num">1</div>
            <div className="g-step-body">
              <h3>Send a demand letter</h3>
              <p>
                {g.preFiling.demandLetterRequired
                  ? "Required before filing."
                  : "Not required, but always do it."}{" "}
                {g.preFiling.demandLetterNotes}
              </p>
              {g.preFiling.governmentClaimRequired && g.preFiling.governmentClaimNotes && (
                <div className="g-callout">
                  <strong>Government defendant?</strong> {g.preFiling.governmentClaimNotes}
                </div>
              )}
            </div>
          </div>

          <div className="g-step">
            <div className="g-step-num">2</div>
            <div className="g-step-body">
              <h3>Check your deadline</h3>
              <p>
                Every claim has a statute of limitations. Miss it by a day and your case is dead.
              </p>
              <div id="statute-checker">
                <StatuteChecker entries={g.statuteOfLimitations.entries} stateName={g.state} />
              </div>
              <p className="step-footnote">{g.statuteOfLimitations.discoveryRuleNotes}</p>
            </div>
          </div>

          <div className="g-step">
            <div className="g-step-num">3</div>
            <div className="g-step-body">
              <h3>File your case</h3>
              <p>
                File at the {g.whereToFile.courtName}. Most cases go in the county where the defendant lives or
                where the dispute happened.
              </p>
              <div id="fee-calculator">
                <FeeCalculator fees={g.fees} limits={g.limits} stateName={g.state} />
              </div>
              {g.fees.feesRecoverableNotes && (
                <p className="step-footnote">{g.fees.feesRecoverableNotes}</p>
              )}
              <p className="step-footnote">
                <strong>E-filing in {g.state}:</strong> {g.whereToFile.eFilingNotes}
              </p>
            </div>
          </div>

          <div className="g-step">
            <div className="g-step-num">4</div>
            <div className="g-step-body">
              <h3>Serve the defendant</h3>
              <p>
                The defendant must be formally served at least{" "}
                <strong>{g.service.timing.inCountyDays} days</strong> before the hearing
                (in the same county) or <strong>{g.service.timing.outOfCountyDays} days</strong>{" "}
                (out of county). You cannot serve them yourself.
              </p>
              <h4>Allowed methods</h4>
              <ul className="g-methods">
                {g.service.methods.map((m) => (
                  <li key={m.name}>
                    <strong>{m.name}.</strong> {m.description}
                  </li>
                ))}
              </ul>
              <p className="step-footnote">
                File the proof of service ({g.service.proofForm.number}) at least{" "}
                {g.service.proofFilingDeadlineDays} days before the hearing.
              </p>
              <details className="g-extra">
                <summary>What if you can&rsquo;t find the defendant?</summary>
                <p>{g.service.cantFindDefendant}</p>
                <p>{g.service.avoidingService}</p>
              </details>
            </div>
          </div>

          <div className="g-step">
            <div className="g-step-num">5</div>
            <div className="g-step-body">
              <h3>Show up to the hearing</h3>
              <p>{g.hearing.format}</p>
              <p>
                <strong>Lawyers at trial:</strong>{" "}
                {g.hearing.attorneysAllowed ? "Allowed" : "Not allowed"}. {g.hearing.attorneysAllowedNotes}
              </p>
              <p>
                <strong>When you&rsquo;ll get the decision:</strong> {g.hearing.decisionTiming}
              </p>
              {g.hearing.mediationOnHearingDay.offered && (
                <div className="g-callout">
                  <strong>Free mediation on hearing day.</strong> {g.hearing.mediationOnHearingDay.notes}
                </div>
              )}
              <h4>What to bring</h4>
              <ul className="g-checklist">
                {g.hearing.whatToBring.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <details className="g-extra">
                <summary>If the defendant doesn&rsquo;t show up</summary>
                <p>{g.response.defaultProcess}</p>
                {g.response.proveUpRequired && (
                  <p>
                    <strong>You still have to prove your case.</strong> {g.response.proveUpNotes}
                  </p>
                )}
              </details>
              <details className="g-extra">
                <summary>If you&rsquo;re the defendant being sued</summary>
                <p>{g.response.responseNotes}</p>
                <p>
                  <strong>Counter-suing the plaintiff:</strong> {g.counterclaim.allowed ? "Allowed" : "Not allowed"}
                  {g.counterclaim.allowed && (
                    <>
                      {" "}using {g.counterclaim.form.number} ({g.counterclaim.form.name}). Serve the plaintiff
                      at least {g.counterclaim.serviceDeadlineSameCountyDays} days before trial (same county) or{" "}
                      {g.counterclaim.serviceDeadlineOutOfCountyDays} days (out of county).
                    </>
                  )}
                </p>
                {g.counterclaim.transferToHigherCourt.available && (
                  <p>
                    <strong>Counterclaim bigger than the cap?</strong>{" "}
                    {g.counterclaim.transferToHigherCourt.notes}{" "}
                    {g.counterclaim.transferToHigherCourt.statute && (
                      <span className="cite">{g.counterclaim.transferToHigherCourt.statute}</span>
                    )}
                  </p>
                )}
              </details>
            </div>
          </div>

          <div className="g-step">
            <div className="g-step-num">6</div>
            <div className="g-step-body">
              <h3>If you win, collect</h3>
              <p>
                <strong>This is where most people stop and lose.</strong> The court doesn&rsquo;t collect for you.
                The loser has {g.collection.paymentDeadline} to pay. Judgments accrue {g.collection.interestRate}%
                interest per year while unpaid.
              </p>
              <ul className="g-collection-methods">
                {g.collection.methods.map((m) => (
                  <li key={m.id}>
                    <h4>{m.name}</h4>
                    <p className="method-blurb">{m.blurb}</p>
                    <details>
                      <summary>How it works</summary>
                      <p>{m.description}</p>
                      {m.estimatedCost && (
                        <p>
                          <strong>Cost:</strong> {m.estimatedCost}
                        </p>
                      )}
                      {m.effectivenessNotes && (
                        <p>
                          <strong>Notes:</strong> {m.effectivenessNotes}
                        </p>
                      )}
                      {m.exemptions && m.exemptions.length > 0 && (
                        <>
                          <p>
                            <strong>What&rsquo;s protected:</strong>
                          </p>
                          <ul>
                            {m.exemptions.map((e) => (
                              <li key={e}>{e}</li>
                            ))}
                          </ul>
                        </>
                      )}
                    </details>
                  </li>
                ))}
              </ul>
              <details className="g-extra">
                <summary>Multiple creditors? Priority rules.</summary>
                <p>{g.collection.priorityNotes}</p>
              </details>
            </div>
          </div>
        </section>

        {/* APPEALS */}
        <section className="g-section">
          <header className="g-section-head">
            <span className="eyebrow">Appeals</span>
            <h2>Can you appeal if you lose?</h2>
          </header>
          <p>{g.appeals.whoCanAppeal}</p>
          <p>
            <strong>Deadline:</strong> {g.appeals.deadlineDays} days from the judgment notice.{" "}
            <strong>Filing fee:</strong> ${g.appeals.fee}. <strong>Form:</strong> {g.appeals.notice.form}.
          </p>
          <p>{g.appeals.typeNotes}</p>
          {g.appeals.automaticStayOnFiling && (
            <p>
              Filing the appeal automatically pauses any collection efforts until the appeal is resolved.
            </p>
          )}
          {g.appeals.defaultJudgmentNotAppealable && (
            <details className="g-extra">
              <summary>Default judgment? Different rules.</summary>
              <p>{g.appeals.defaultJudgmentNotes}</p>
              <p>
                Motion to vacate (Form {g.response.motionToVacateForm.number}): file within{" "}
                {g.response.motionToVacateDeadlineDays} days of the judgment notice. If you never received notice,
                you have up to {g.response.motionToVacateLackOfNoticeDays} days.
              </p>
              <p>
                If the motion is denied, you have {g.response.motionToVacateAppealDeadlineDays} days to appeal the
                denial. {g.response.motionToVacateAppealNotes}
              </p>
            </details>
          )}
          {g.appeals.frivolousPenalty?.available && (
            <details className="g-extra">
              <summary>Frivolous appeal? Up to ${g.appeals.frivolousPenalty.cap} in attorney fees.</summary>
              <p>{g.appeals.frivolousPenalty.notes}</p>
              {g.appeals.frivolousPenalty.statute && (
                <p className="cite">{g.appeals.frivolousPenalty.statute}</p>
              )}
            </details>
          )}
        </section>

        {/* FORMS HUB */}
        <section id="forms" className="g-section">
          <header className="g-section-head">
            <span className="eyebrow">Forms</span>
            <h2>Every form you might need.</h2>
            <p>All free at your state's courts website. Use the latest revision.</p>
          </header>
          <GroupedForms forms={g.forms} />
        </section>

        {/* COUNTY DIFFERENCES */}
        {g.countyDifferences.length > 0 && (
          <section className="g-section">
            <header className="g-section-head">
              <span className="eyebrow">County differences</span>
              <h2>Local rules that matter.</h2>
              <p>State law sets the rules. Each county handles small claims a little differently.</p>
            </header>
            <div className="g-counties">
              {g.countyDifferences.map((c) => (
                <details key={c.county} className="g-county">
                  <summary>{c.county}</summary>
                  <ul>
                    {c.differences.map((d, i) => (
                      <li key={i}>
                        <strong>{d.topic}:</strong> {d.detail}
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* PITFALLS */}
        <section className="g-section">
          <header className="g-section-head">
            <span className="eyebrow">Don&rsquo;t make these mistakes</span>
            <h2>Why cases get dismissed.</h2>
          </header>
          <ul className="g-pitfalls">
            {g.pitfalls.map((p) => (
              <li key={p.title}>
                <h4>{p.title}</h4>
                <p>
                  <strong>What goes wrong:</strong> {p.whatHappens}
                </p>
                <p>
                  <strong>How to avoid it:</strong> {p.howToAvoid}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* RECENT CHANGES */}
        <section className="g-section">
          <header className="g-section-head">
            <span className="eyebrow">Recent changes</span>
            <h2>What changed in the last 3 years.</h2>
          </header>
          <ol className="g-changes">
            {g.recentChanges.map((c, i) => (
              <li key={i}>
                <time dateTime={c.date}>
                  {new Date(c.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <h4>{c.title}</h4>
                <p>{c.description}</p>
                {c.bill && <span className="change-bill">{c.bill}</span>}
              </li>
            ))}
          </ol>
        </section>

        {/* FAQ */}
        <section id="faq" className="g-section">
          <header className="g-section-head">
            <span className="eyebrow">FAQ</span>
            <h2>Common questions.</h2>
          </header>
          <div className="g-faqs">
            {g.faqs.map((f) => (
              <details key={f.question} className="g-faq">
                <summary>{f.question}</summary>
                <div className="g-faq-a">{f.answer}</div>
              </details>
            ))}
          </div>
        </section>

        {/* SOURCES */}
        <section className="g-section">
          <details className="g-sources">
            <summary>
              <span className="eyebrow-inline">Sources</span>
              <span>{g.sources.length} citations and statutes</span>
            </summary>
            <ul>
              {g.sources.map((s, i) => (
                <li key={i}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                  {s.citation && <span className="source-cite">{s.citation}</span>}
                </li>
              ))}
            </ul>
          </details>
        </section>

        {/* DISCLAIMER */}
        <p className="g-disclaimer">
          <strong>This is not legal advice.</strong> CivilCase is not a law firm. Court rules, fees, and statutes
          change. Verify against the cited authority before filing. Last researched and updated:{" "}
          {new Date(g.lastUpdated).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          .
        </p>
      </div>
    </main>
  );
}

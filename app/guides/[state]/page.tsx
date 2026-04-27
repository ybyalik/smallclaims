import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { STATES, getStateBySlug } from "../../../lib/states";
import { availableStateSlugs, loadStateGuide } from "../../../lib/state-data";
import Breadcrumbs from "../../../components/Breadcrumbs";
import StatuteChecker from "../../../components/widgets/StatuteChecker";
import FeeCalculator from "../../../components/widgets/FeeCalculator";

export function generateStaticParams() {
  return availableStateSlugs().map((slug) => ({ state: slug }));
}

export const dynamicParams = false;

type Params = { params: { state: string } };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const state = getStateBySlug(params.state);
  const guide = await loadStateGuide(params.state);
  if (!state || !guide) return {};
  return {
    title: `Small Claims in ${state.name}: Filing, Fees, Forms, Collecting (${new Date().getFullYear()})`,
    description: `How to file a small claims case in ${state.name}. Sue for up to $${guide.limits.individual.toLocaleString()}, with fees from $${guide.fees.tiers[0].amount}. Plain-English guide for individuals and small businesses.`,
    alternates: { canonical: `/guides/${state.slug}` },
    openGraph: {
      title: `Small Claims in ${state.name}: Plain-English Guide`,
      description: `Sue for up to $${guide.limits.individual.toLocaleString()} in ${state.name} small claims. Filing, forms, fees, deadlines, and how to actually collect.`,
      url: `/guides/${state.slug}`,
      type: "article",
    },
  };
}

const fmtMoney = (n: number) => "$" + n.toLocaleString("en-US");

export default async function StateGuide({ params }: Params) {
  const state = getStateBySlug(params.state);
  if (!state) notFound();
  const g = await loadStateGuide(params.state);
  if (!g) notFound();

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
        <Breadcrumbs items={[{ href: "/guides", label: "Guides" }, { label: g.state }]} />

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
            <h2>Find your situation in this list.</h2>
            <p>
              {g.state} small claims handles money disputes up to {fmtMoney(g.limits.individual)} (or{" "}
              {fmtMoney(g.limits.business)} if you're a business). If you recognize your situation below, you can probably file.
            </p>
          </header>
          <div className="g-categories">
            {g.whatYouCanSueFor.map((cat) => (
              <details key={cat.id} className="g-category" id={`cat-${cat.id}`}>
                <summary>
                  <span className="cat-title">{cat.title}</span>
                  <span className="cat-count">
                    {cat.claims.length} {cat.claims.length === 1 ? "claim type" : "claim types"}
                  </span>
                </summary>
                <p className="cat-blurb">{cat.blurb}</p>
                <ul className="cat-claims">
                  {cat.claims.map((c) => (
                    <li key={c.id} className="claim">
                      <h4>{c.name}</h4>
                      <p className="claim-example">
                        <strong>Example:</strong> {c.example}
                      </p>
                      {c.notes && <p className="claim-notes">{c.notes}</p>}
                      {c.damageBoost && (
                        <p className="claim-boost">
                          <span className="boost-tag">Bonus damages</span>
                          {c.damageBoost}
                        </p>
                      )}
                      {c.statute && <p className="claim-statute">{c.statute}</p>}
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </section>

        {/* WHAT YOU CANNOT SUE FOR */}
        <section className="g-section">
          <header className="g-section-head">
            <span className="eyebrow">What small claims can't do</span>
            <h2>Wrong court for these.</h2>
          </header>
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
        </section>

        {/* THE PROCESS WITH WIDGETS */}
        <section id="process" className="g-section">
          <header className="g-section-head">
            <span className="eyebrow">The process</span>
            <h2>From owed to paid in <em>5 steps.</em></h2>
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
              {g.preFiling.governmentClaimRequired && (
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
                Every claim has a statute of limitations. Miss it by a day and your case is dead. Use the checker:
              </p>
              <div id="statute-checker">
                <StatuteChecker entries={g.statuteOfLimitations.entries} stateName={g.state} />
              </div>
              <p className="step-footnote">
                {g.statuteOfLimitations.discoveryRuleNotes}
              </p>
            </div>
          </div>

          <div className="g-step">
            <div className="g-step-num">3</div>
            <div className="g-step-body">
              <h3>File your case (and check the fee)</h3>
              <p>
                File at the {g.whereToFile.courtName}. Most cases go in the county where the defendant lives or
                where the dispute happened.
              </p>
              <div id="fee-calculator">
                <FeeCalculator fees={g.fees} limits={g.limits} stateName={g.state} />
              </div>
              <p className="step-footnote">
                E-filing in {g.state}: {g.whereToFile.eFilingNotes}
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
              <h4 style={{ marginTop: 18, marginBottom: 8 }}>Allowed methods</h4>
              <ul className="g-methods">
                {g.service.methods.map((m) => (
                  <li key={m.name}>
                    <strong>{m.name}.</strong> {m.description}
                  </li>
                ))}
              </ul>
              <p className="step-footnote">
                File the proof of service ({g.service.proofForm.number}) at least {g.response.motionToVacateDeadlineDays > 30 ? "5" : "5"} days before the hearing.
              </p>
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
              <h4 style={{ marginTop: 18, marginBottom: 8 }}>What to bring</h4>
              <ul className="g-checklist">
                {g.hearing.whatToBring.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="g-step">
            <div className="g-step-num">6</div>
            <div className="g-step-body">
              <h3>If you win, collect</h3>
              <p>
                <strong>This is where most people stop and lose.</strong> The court doesn't collect for you. The
                loser has {g.collection.paymentDeadline} to pay. If they don't, you have to use one of the
                enforcement tools below. Judgments accrue {g.collection.interestRate}% interest per year while unpaid.
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
                            <strong>What's protected from collection:</strong>
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
            Deadline: <strong>{g.appeals.deadlineDays} days</strong> from the judgment notice.{" "}
            Filing fee: <strong>${g.appeals.fee}</strong>. Form: <strong>{g.appeals.notice.form}</strong>.{" "}
            {g.appeals.automaticStayOnFiling && "Filing the appeal automatically pauses any collection efforts."}
          </p>
          <p>{g.appeals.typeNotes}</p>
        </section>

        {/* FORMS HUB */}
        <section id="forms" className="g-section">
          <header className="g-section-head">
            <span className="eyebrow">Forms</span>
            <h2>Every form you might need.</h2>
            <p>All forms are free at the California Courts website. Use the latest revision.</p>
          </header>
          <ul className="g-forms">
            {g.forms.map((f) => (
              <li key={f.number} className="g-form">
                <div className="form-num">{f.number}</div>
                <div className="form-body">
                  <h4>{f.name}</h4>
                  <p>{f.description}</p>
                  <span className="form-meta">
                    Filed by: {f.whoFiles}. {f.required ? "Required" : "Optional"}.
                  </span>
                </div>
                {f.url && (
                  <a className="form-link" href={f.url} target="_blank" rel="noopener noreferrer">
                    Open PDF →
                  </a>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* COUNTY DIFFERENCES */}
        {g.countyDifferences.length > 0 && (
          <section className="g-section">
            <header className="g-section-head">
              <span className="eyebrow">County differences</span>
              <h2>Local rules that matter.</h2>
              <p>State law sets the rules, but each county handles small claims a little differently.</p>
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
            <span className="eyebrow">Don't make these mistakes</span>
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
              <span className="eyebrow">Sources</span>
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

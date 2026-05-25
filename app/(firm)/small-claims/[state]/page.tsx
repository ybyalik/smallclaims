import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { STATES, getStateBySlug } from "../../../../lib/states";
import { availableStateSlugs, loadStateGuide } from "../../../../lib/state-data";
import { loadStateGuideV2 } from "../../../../lib/state-guide-v2/load";
import {
  C, H1, H2, eyebrow, body, PAD_X, RAD, HEAD_FONT, BODY_FONT, italicEmCSS,
  Arrow, FirmBtn, FirmStateGuidePage,
} from "../../../../components/firm";
import StatuteChecker from "../../../../components/widgets/StatuteChecker";
import FeeCalculator from "../../../../components/widgets/FeeCalculator";
import ClaimExplorer from "../../../../components/widgets/ClaimExplorer";

// Firm-styled state guide. Two paths:
//   1. v2 (markdown body) → FirmStateGuidePage (firm prose + firm sidebar)
//   2. v1 (structured data) → fully re-skinned inline render below

// Static generation: every state slug builds at deploy time.
// The (firm) layout no longer reads cookies() (auth moved to client),
// so this route is once again statically eligible. `revalidate` keeps
// the JSON snapshot data fresh without a redeploy if it changes.
export function generateStaticParams() {
  return STATES.map((s) => ({ state: s.slug }));
}
export const revalidate = 86400;

type Params = { params: { state: string } };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const state = getStateBySlug(params.state);
  if (!state) return {};
  const guide = await loadStateGuide(params.state);
  if (!guide) {
    return {
      title: `Small Claims in ${state.name}: Guide Coming Soon`,
      description: `Our plain-English small claims guide for ${state.name} is in research.`,
      alternates: { canonical: `/small-claims/${state.slug}` },
    };
  }
  return {
    title: `Small Claims in ${state.name}: Filing, Fees, Forms, Collecting`,
    description: `How to file a small claims case in ${state.name}. Sue for up to $${guide.limits.individual.toLocaleString()}, with fees from $${guide.fees.tiers[0].amount}.`,
    alternates: { canonical: `/small-claims/${state.slug}` },
  };
}

const fmtMoney = (n: number) => "$" + n.toLocaleString("en-US");

async function ComingSoon({ stateName }: { stateName: string }) {
  const ready = new Set(await availableStateSlugs());
  const readyStates = STATES.filter((s) => ready.has(s.slug));
  return (
    <main style={{ background: C.bg, color: C.fg, font: `16px/1.5 ${BODY_FONT}`, paddingBottom: 120 }}>
      <style dangerouslySetInnerHTML={{ __html: italicEmCSS }} />
      <div style={{ padding: `20px ${PAD_X}`, borderBottom: `1px solid ${C.line}`, font: `13px/1 ${BODY_FONT}`, color: C.muted }}>
        <Link href="/" style={{ color: C.muted, textDecoration: "none" }}>CivilCase</Link>
        <span style={{ margin: "0 10px", opacity: 0.5 }}>/</span>
        <Link href="/small-claims" style={{ color: C.muted, textDecoration: "none" }}>Small Claims</Link>
        <span style={{ margin: "0 10px", opacity: 0.5 }}>/</span>
        <span style={{ color: C.fg, fontWeight: 500 }}>{stateName}</span>
      </div>
      <section style={{ padding: `80px ${PAD_X}` }}>
        <div style={{ ...eyebrow, color: C.accent, marginBottom: 22 }}>COMING SOON</div>
        <h1 className="firm-h" style={{ ...H1, fontSize: 64 }}>
          We&rsquo;re researching <em>{stateName}</em>.
        </h1>
        <p style={{ font: `18px/1.55 ${BODY_FONT}`, color: C.muted, maxWidth: 640, marginTop: 22 }}>
          Our small-claims guide for {stateName} is under research. We&rsquo;ll publish it as soon as
          it&rsquo;s ready.
        </p>
        {readyStates.length > 0 && (
          <div style={{ marginTop: 40 }}>
            <div style={{ ...eyebrow, marginBottom: 22 }}>AVAILABLE NOW</div>
            <ul style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 8, listStyle: "none", padding: 0, margin: 0 }}>
              {readyStates.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/small-claims/${s.slug}`}
                    style={{ display: "flex", justifyContent: "space-between", padding: "12px 14px", border: `1px solid ${C.line}`, borderRadius: RAD.card, textDecoration: "none", color: C.fg, font: `500 14px/1 ${BODY_FONT}` }}
                  >
                    <span>{s.name}</span>
                    <Arrow color={C.muted} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div style={{ marginTop: 40 }}>
          <Link href="/small-claims" style={{ textDecoration: "none" }}>
            <FirmBtn kind="ghost">← Back to all states</FirmBtn>
          </Link>
        </div>
      </section>
    </main>
  );
}

// CSS for legacy-v1 prose surfaces (details/summary etc.) — minimal firm overrides.
const FIRM_V1_CSS = `
.firm-step { display: grid; grid-template-columns: 56px 1fr; gap: 32px; padding: 32px 0; border-top: 1px solid #e7dfd0; }
.firm-step:first-child { border-top: 1px solid #1f1a16; }
.firm-step-num {
  font: 600 32px/1 var(--font-newsreader), Georgia, serif;
  color: #b8331f;
  letter-spacing: -0.02em;
}
.firm-step-body h3 {
  font: 600 26px/1.25 var(--font-newsreader), Georgia, serif;
  color: #1f1a16;
  letter-spacing: -0.01em;
  margin: 0 0 12px;
}
.firm-step-body p { font: 16px/1.65 var(--font-geist), system-ui, sans-serif; color: #2a241e; margin: 12px 0; }
.firm-step-body p strong { color: #1a1612; font-weight: 600; }
.firm-step-body h4 { font: 600 15px/1.4 var(--font-geist), system-ui, sans-serif; color: #1a1612; margin: 22px 0 8px; }
.firm-step-body ul { margin: 12px 0 0 22px; padding: 0; display: grid; gap: 8px; }
.firm-step-body li { font: 15px/1.55 var(--font-geist), system-ui, sans-serif; color: #2a241e; }
.firm-callout {
  background: #f5f1e8;
  border-left: 3px solid #b8331f;
  padding: 14px 18px;
  margin: 16px 0;
  font: 15px/1.55 var(--font-geist), system-ui, sans-serif;
  color: #2a241e;
  border-radius: 0 6px 6px 0;
}
.firm-callout strong { color: #1a1612; font-weight: 600; }
.firm-step-body details {
  border-top: 1px solid #e7dfd0;
  padding: 14px 0 0;
  margin-top: 18px;
}
.firm-step-body details summary {
  cursor: pointer;
  list-style: none;
  font: 600 15px/1.4 var(--font-geist), system-ui, sans-serif;
  color: #b8331f;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.firm-step-body details summary::before { content: "+ "; }
.firm-step-body details[open] summary::before { content: "− "; }
.firm-step-body details > * { margin-top: 10px; }
.firm-section-block {
  padding: 80px max(80px, calc((100vw - 1600px) / 2));
}
.firm-section-block + .firm-section-block { border-top: 1px solid #e7dfd0; }
.firm-section-head h2 {
  font: 600 clamp(38px, 4vw, 56px)/1.1 var(--font-newsreader), Georgia, serif;
  color: #1f1a16;
  letter-spacing: -0.02em;
  margin: 0;
}
.firm-section-head h2 em { font-style: italic; color: #b8331f; }
.firm-section-head p {
  font: 16px/1.65 var(--font-geist), system-ui, sans-serif;
  color: #5b544c;
  margin: 18px 0 0;
  max-width: 680px;
}
.firm-faq { border-top: 1px solid #1f1a16; margin-top: 32px; }
.firm-faq details {
  border-bottom: 1px solid #e7dfd0;
  padding: 22px 0;
}
.firm-faq details summary {
  cursor: pointer;
  list-style: none;
  font: 600 20px/1.4 var(--font-newsreader), Georgia, serif;
  color: #1f1a16;
  letter-spacing: -0.005em;
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 24px;
}
.firm-faq details summary::after { content: "+"; color: #b8331f; font: 400 22px/1 var(--font-geist), system-ui, sans-serif; }
.firm-faq details[open] summary::after { content: "−"; }
.firm-faq details > div, .firm-faq details > p {
  font: 15px/1.65 var(--font-geist), system-ui, sans-serif;
  color: #5b544c;
  margin-top: 12px;
  max-width: 760px;
}
.firm-fact-list { list-style: none; padding: 0; margin: 18px 0; display: grid; gap: 10px; }
.firm-fact-list li {
  padding: 12px 16px;
  background: #f5f1e8;
  border-radius: 8px;
  font: 15px/1.55 var(--font-geist), system-ui, sans-serif;
  color: #2a241e;
}
.firm-fact-list li strong { color: #1a1612; font-weight: 600; }
`;

export default async function StateGuide2({ params }: Params) {
  const state = getStateBySlug(params.state);
  if (!state) notFound();

  // v2 path: render firm markdown layout
  const v2 = await loadStateGuideV2(params.state);
  if (v2) {
    return <FirmStateGuidePage state={{ slug: params.state, name: state.name }} guide={v2} />;
  }

  // v1 path: render firm-styled structured guide
  const g = await loadStateGuide(params.state);
  if (!g) return <ComingSoon stateName={state.name} />;

  const totalClaims = g.whatYouCanSueFor.reduce((n, c) => n + c.claims.length, 0);

  return (
    <main style={{ background: C.bg, color: C.fg, font: `16px/1.5 ${BODY_FONT}` }} data-state={g.slug}>
      <style dangerouslySetInnerHTML={{ __html: italicEmCSS + FIRM_V1_CSS }} />

      {/* Breadcrumb */}
      <div style={{ padding: `20px ${PAD_X}`, borderBottom: `1px solid ${C.line}`, font: `13px/1 ${BODY_FONT}`, color: C.muted }}>
        <Link href="/" style={{ color: C.muted, textDecoration: "none" }}>CivilCase</Link>
        <span style={{ margin: "0 10px", opacity: 0.5 }}>/</span>
        <Link href="/small-claims" style={{ color: C.muted, textDecoration: "none" }}>Small Claims</Link>
        <span style={{ margin: "0 10px", opacity: 0.5 }}>/</span>
        <span style={{ color: C.fg, fontWeight: 500 }}>{g.state}</span>
      </div>

      {/* HERO */}
      <section style={{ padding: `60px ${PAD_X} 40px` }}>
        <div style={{ ...eyebrow, color: C.accent, marginBottom: 22 }}>STATE GUIDE</div>
        <h1 className="firm-h" style={{ font: `600 clamp(48px, 5vw, 72px)/1.05 ${HEAD_FONT}`, color: C.fg, letterSpacing: "-0.025em", margin: 0 }}>
          Small claims in <em>{g.state}</em>.
        </h1>
        <p style={{ font: `18px/1.55 ${BODY_FONT}`, color: C.muted, maxWidth: 680, marginTop: 22 }}>{g.hero.tagline}</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, marginTop: 40, paddingTop: 30, borderTop: `1px solid ${C.line}` }}>
          {[
            [fmtMoney(g.hero.individualLimit), "Most you can sue for"],
            [`$${g.hero.filingFeeLow}-$${g.hero.filingFeeHigh}`, "Filing fee"],
            [`${g.hero.typicalTimelineDays.min}-${g.hero.typicalTimelineDays.max} days`, "Typical timeline"],
          ].map(([n, l], i) => (
            <div key={l} style={{ paddingLeft: i ? 32 : 0, borderLeft: i ? `1px solid ${C.line}` : "none" }}>
              <div style={{ font: `600 32px/1.1 ${HEAD_FONT}`, color: C.fg, letterSpacing: "-0.015em" }}>{n}</div>
              <div style={{ ...eyebrow, color: C.muted, marginTop: 10 }}>{l}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 14, marginTop: 36 }}>
          <a href="#what-to-sue-for" style={{ textDecoration: "none" }}><FirmBtn>See what you can sue for</FirmBtn></a>
          <a href="#fee-calculator" style={{ textDecoration: "none" }}><FirmBtn kind="ghost">Calculate my filing fee</FirmBtn></a>
        </div>
      </section>

      {/* AT A GLANCE */}
      <section style={{ padding: `40px ${PAD_X}` }}>
        <div style={{ background: C.cream, border: `1px solid ${C.line}`, borderRadius: RAD.panel, padding: 28 }}>
          <div style={{ ...eyebrow, marginBottom: 18 }}>AT A GLANCE</div>
          <ul style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24, listStyle: "none", padding: 0, margin: 0 }}>
            {g.ataGlance.map((f) => (
              <li key={f.label}>
                <div style={{ ...eyebrow, color: C.muted, marginBottom: 8 }}>{f.label}</div>
                <div style={{ font: `600 18px/1.3 ${HEAD_FONT}`, color: C.fg, letterSpacing: "-0.005em" }}>{f.value}</div>
                {f.detail && <div style={{ font: `13px/1.5 ${BODY_FONT}`, color: C.muted, marginTop: 4 }}>{f.detail}</div>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* WHAT YOU CAN SUE FOR */}
      <section id="what-to-sue-for" className="firm-section-block">
        <div className="firm-section-head" style={{ marginBottom: 32 }}>
          <div style={{ ...eyebrow, marginBottom: 18 }}>WHAT YOU CAN SUE FOR</div>
          <h2>Find your <em>situation</em>.</h2>
          <p>
            {g.state} small claims handles money disputes up to {fmtMoney(g.limits.individual)} (or{" "}
            {fmtMoney(g.limits.business)} if you&rsquo;re a business). Browse {g.whatYouCanSueFor.length}{" "}
            categories and {totalClaims} specific claim types below.
          </p>
        </div>
        <ClaimExplorer categories={g.whatYouCanSueFor} />

        <details style={{ marginTop: 28, borderTop: `1px solid ${C.line}`, paddingTop: 20 }}>
          <summary style={{ cursor: "pointer", listStyle: "none", font: `500 14px/1 ${BODY_FONT}`, color: C.accent, letterSpacing: "0.04em" }}>
            <span style={{ ...eyebrow, color: C.muted, marginRight: 10 }}>WRONG COURT FOR THESE</span>
            {g.whatYouCannotSueFor.length} situations small claims can&rsquo;t handle
          </summary>
          <ul style={{ marginTop: 20, padding: 0, listStyle: "none", display: "grid", gap: 18 }}>
            {g.whatYouCannotSueFor.map((ex) => (
              <li key={ex.category} style={{ background: C.paper, border: `1px solid ${C.line}`, padding: 22, borderRadius: RAD.card }}>
                <div style={{ font: `600 17px/1.3 ${HEAD_FONT}`, color: C.fg, letterSpacing: "-0.005em" }}>{ex.category}</div>
                <p style={{ font: `14px/1.55 ${BODY_FONT}`, color: C.muted, marginTop: 8 }}>{ex.explanation}</p>
                {ex.whereToGoInstead && (
                  <p style={{ font: `14px/1.5 ${BODY_FONT}`, color: C.fg, marginTop: 8 }}>
                    <strong>Try instead:</strong> {ex.whereToGoInstead}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </details>
      </section>

      {/* THE PROCESS — 6 STEPS */}
      <section id="process" className="firm-section-block" style={{ background: C.cream }}>
        <div className="firm-section-head" style={{ marginBottom: 32 }}>
          <div style={{ ...eyebrow, marginBottom: 18 }}>THE PROCESS</div>
          <h2>From owed to paid in <em>6 steps</em>.</h2>
        </div>

        <div className="firm-step">
          <div className="firm-step-num">01</div>
          <div className="firm-step-body">
            <h3>Send a demand letter</h3>
            <p>
              {g.preFiling.demandLetterRequired ? "Required before filing." : "Not required, but always do it."}{" "}
              {g.preFiling.demandLetterNotes}
            </p>
            {g.preFiling.governmentClaimRequired && g.preFiling.governmentClaimNotes && (
              <div className="firm-callout">
                <strong>Government defendant?</strong> {g.preFiling.governmentClaimNotes}
              </div>
            )}
          </div>
        </div>

        <div className="firm-step">
          <div className="firm-step-num">02</div>
          <div className="firm-step-body">
            <h3>Check your deadline</h3>
            <p>
              Every claim has a deadline by which you have to sue (the legal name is the &ldquo;statute of
              limitations&rdquo;). Miss it by a day and your case is dead.
            </p>
            <div id="statute-checker">
              <StatuteChecker entries={g.statuteOfLimitations.entries} stateName={g.state} />
            </div>
            <p>{g.statuteOfLimitations.discoveryRuleNotes}</p>
          </div>
        </div>

        <div className="firm-step">
          <div className="firm-step-num">03</div>
          <div className="firm-step-body">
            <h3>File your case</h3>
            <p>
              File at the {g.whereToFile.courtName}. Most cases go in the county where the defendant lives or
              where the dispute happened.
            </p>
            <div id="fee-calculator">
              <FeeCalculator fees={g.fees} limits={g.limits} stateName={g.state} />
            </div>
            {g.fees.feesRecoverableNotes && <p>{g.fees.feesRecoverableNotes}</p>}
            <p><strong>E-filing in {g.state}:</strong> {g.whereToFile.eFilingNotes}</p>
          </div>
        </div>

        <div className="firm-step">
          <div className="firm-step-num">04</div>
          <div className="firm-step-body">
            <h3>Serve the defendant</h3>
            <p>
              The defendant has to receive official notice of the lawsuit at least{" "}
              <strong>{g.service.timing.inCountyDays} days</strong> before the hearing (in the same county)
              or <strong>{g.service.timing.outOfCountyDays} days</strong> (out of county). You can&rsquo;t
              hand them the papers yourself.
            </p>
            <h4>Allowed methods</h4>
            <ul>
              {g.service.methods.map((m) => (
                <li key={m.name}><strong>{m.name}.</strong> {m.description}</li>
              ))}
            </ul>
            <p>
              File the proof of service ({g.service.proofForm.number}) at least{" "}
              {g.service.proofFilingDeadlineDays} days before the hearing.
            </p>
            <details>
              <summary>What if you can&rsquo;t find the defendant?</summary>
              <p>{g.service.cantFindDefendant}</p>
              <p>{g.service.avoidingService}</p>
            </details>
          </div>
        </div>

        <div className="firm-step">
          <div className="firm-step-num">05</div>
          <div className="firm-step-body">
            <h3>Show up to the hearing</h3>
            <p>{g.hearing.format}</p>
            <p><strong>Lawyers at trial:</strong> {g.hearing.attorneysAllowed ? "Allowed" : "Not allowed"}. {g.hearing.attorneysAllowedNotes}</p>
            <p><strong>When you&rsquo;ll get the decision:</strong> {g.hearing.decisionTiming}</p>
            {g.hearing.mediationOnHearingDay.offered && (
              <div className="firm-callout">
                <strong>Free mediation on hearing day.</strong> {g.hearing.mediationOnHearingDay.notes}
              </div>
            )}
            <h4>What to bring</h4>
            <ul>{g.hearing.whatToBring.map((item) => (<li key={item}>{item}</li>))}</ul>
            <details>
              <summary>If the defendant doesn&rsquo;t show up</summary>
              <p>{g.response.defaultProcess}</p>
              {g.response.proveUpRequired && (
                <p><strong>You still have to prove your case.</strong> {g.response.proveUpNotes}</p>
              )}
            </details>
          </div>
        </div>

        <div className="firm-step">
          <div className="firm-step-num">06</div>
          <div className="firm-step-body">
            <h3>If you win, collect</h3>
            <p>
              <strong>This is where most people stop and lose.</strong> The court doesn&rsquo;t collect for you.
              The loser has {g.collection.paymentDeadline} to pay. Judgments accrue {g.collection.interestRate}%
              interest per year while unpaid.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "16px 0 0", display: "grid", gap: 16 }}>
              {g.collection.methods.map((m) => (
                <li key={m.id} style={{ background: C.paper, border: `1px solid ${C.line}`, padding: 20, borderRadius: RAD.card }}>
                  <h4 style={{ margin: 0 }}>{m.name}</h4>
                  <p style={{ marginTop: 6 }}>{m.blurb}</p>
                  <details>
                    <summary>How it works</summary>
                    <p>{m.description}</p>
                    {m.estimatedCost && <p><strong>Cost:</strong> {m.estimatedCost}</p>}
                    {m.effectivenessNotes && <p><strong>Notes:</strong> {m.effectivenessNotes}</p>}
                  </details>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="firm-section-block">
        <div className="firm-section-head" style={{ marginBottom: 32 }}>
          <div style={{ ...eyebrow, marginBottom: 18 }}>FAQ</div>
          <h2>Common <em>questions</em>.</h2>
        </div>
        <div className="firm-faq">
          {g.faqs.map((f) => (
            <details key={f.question}>
              <summary>{f.question}</summary>
              <div>{f.answer}</div>
            </details>
          ))}
        </div>
      </section>

      {/* DISCLAIMER + CTA */}
      <section style={{ padding: `60px ${PAD_X} 120px` }}>
        <div style={{ background: C.dark, color: "#fff", padding: "60px 56px", borderRadius: RAD.panel, display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 40, alignItems: "center" }}>
          <div>
            <div style={{ ...eyebrow, color: "rgba(255,255,255,0.55)", marginBottom: 18 }}>NEXT STEP</div>
            <div className="firm-h firm-h-light" style={{ font: `600 36px/1.2 ${HEAD_FONT}`, color: "#fff", letterSpacing: "-0.02em" }}>
              Send your demand letter <em>for {g.state}</em>.
            </div>
            <p style={{ font: `15px/1.6 ${BODY_FONT}`, color: "rgba(255,255,255,0.7)", marginTop: 16, maxWidth: 460 }}>
              A formal demand often resolves the dispute before filing. We&rsquo;ll draft one tailored to
              {" "}{g.state} statute language in under 90 seconds.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 14 }}>
            <Link href="/demand-letter" style={{ textDecoration: "none" }}><FirmBtn kind="accent">Start My Demand Letter</FirmBtn></Link>
            <div style={{ font: `13px/1.4 ${BODY_FONT}`, color: "rgba(255,255,255,0.5)" }}>From $29 · USPS Certified · 24-hour turnaround</div>
          </div>
        </div>

        <p style={{ font: `13px/1.65 ${BODY_FONT}`, color: C.muted, marginTop: 40, maxWidth: 880 }}>
          <strong style={{ color: C.fg }}>This is not legal advice.</strong> CivilCase is not a law firm. Court
          rules, fees, and statutes change. Verify against the cited authority before filing. Last researched
          and updated:{" "}
          {new Date(g.lastUpdated).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}.
        </p>
      </section>
    </main>
  );
}

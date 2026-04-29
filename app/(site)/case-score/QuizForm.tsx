"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  type DefendantKind,
  type DisputeType,
  type Evidence,
  type PriorContact,
  type QuizAnswers,
  type ScoreResult,
  type StateFacts,
  scoreCase,
} from "./scoring";

interface State {
  name: string;
  abbr: string;
  slug: string;
}

interface Props {
  states: State[];
  stateFacts: Record<string, StateFacts>;
}

interface FormState {
  dispute_type: DisputeType | "";
  amount: string;
  state_slug: string;
  incident_date: string;
  prior_contact: PriorContact | "";
  evidence: Evidence | "";
  defendant: DefendantKind | "";
}

const INITIAL: FormState = {
  dispute_type: "",
  amount: "",
  state_slug: "",
  incident_date: "",
  prior_contact: "",
  evidence: "",
  defendant: "",
};

const DRAFT_KEY = "civilcase:case-score:draft:v1";

const DISPUTE_OPTIONS: { value: DisputeType; label: string; blurb: string }[] = [
  { value: "unpaid_debt", label: "Money I'm owed", blurb: "Unpaid loan, invoice, or debt." },
  { value: "security_deposit", label: "Security deposit", blurb: "Landlord didn't return it." },
  { value: "services_not_rendered", label: "Service not delivered", blurb: "Paid for service that wasn't done." },
  { value: "goods_not_delivered", label: "Goods not delivered", blurb: "Paid for product that didn't arrive." },
  { value: "property_damage", label: "Property damage", blurb: "Someone damaged my property." },
  { value: "unpaid_wages", label: "Unpaid wages", blurb: "Employer owes me money." },
  { value: "contractor", label: "Contractor dispute", blurb: "Home repair or build issue." },
  { value: "other", label: "Something else", blurb: "Doesn't fit the categories above." },
];

const PRIOR_OPTIONS: { value: PriorContact; label: string; blurb: string }[] = [
  { value: "formal", label: "Yes, in writing", blurb: "Demand letter or formal notice." },
  { value: "casual", label: "Yes, casually", blurb: "Texts, emails, or calls." },
  { value: "none", label: "Not yet", blurb: "Haven't reached out." },
];

const EVIDENCE_OPTIONS: { value: Evidence; label: string; blurb: string }[] = [
  { value: "strong", label: "Strong", blurb: "Signed contract, invoices, payment records." },
  { value: "some", label: "Some", blurb: "Texts, emails, or screenshots referencing the agreement." },
  { value: "limited", label: "Limited", blurb: "Mostly verbal — my word against theirs." },
];

const DEFENDANT_OPTIONS: { value: DefendantKind; label: string; blurb: string }[] = [
  { value: "business", label: "A business", blurb: "Registered company or LLC." },
  { value: "individual_stable", label: "An individual with steady income", blurb: "Knows where they work." },
  { value: "individual_unknown", label: "An individual, finances unclear", blurb: "Not sure if they have assets." },
  { value: "government", label: "A government agency", blurb: "City, county, state, or federal." },
];

export default function QuizForm({ states, stateFacts }: Props) {
  const totalSteps = 7;
  const [step, setStep] = useState(0); // 0..6 = questions, 7 = result
  const [form, setForm] = useState<FormState>(INITIAL);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ScoreResult | null>(null);
  const hydrated = useRef(false);

  // Restore draft on mount
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { form?: FormState; step?: number };
        if (parsed.form) setForm({ ...INITIAL, ...parsed.form });
        if (typeof parsed.step === "number" && parsed.step >= 0 && parsed.step <= totalSteps) {
          setStep(parsed.step);
        }
      }
    } catch {
      // ignore corrupt drafts
    } finally {
      hydrated.current = true;
    }
  }, []);

  // Auto-save draft
  useEffect(() => {
    if (!hydrated.current) return;
    try {
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify({ form, step }));
    } catch {
      // ignore quota errors
    }
  }, [form, step]);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setError(null);
  }

  function validateStep(): string | null {
    switch (step) {
      case 0:
        return form.dispute_type ? null : "Pick the type that fits best.";
      case 1: {
        const n = parseFloat(form.amount);
        if (!n || n <= 0) return "Enter the amount you're trying to recover.";
        if (n > 100000) return "Amounts over $100,000 are well outside small claims — talk to an attorney.";
        return null;
      }
      case 2:
        return form.state_slug ? null : "Pick the state where the dispute happened.";
      case 3:
        return form.incident_date ? null : "Tell us when this happened (an approximation is fine).";
      case 4:
        return form.prior_contact ? null : "Pick the closest description.";
      case 5:
        return form.evidence ? null : "Pick the closest description.";
      case 6:
        return form.defendant ? null : "Pick the closest description.";
      default:
        return null;
    }
  }

  function next() {
    const e = validateStep();
    if (e) {
      setError(e);
      return;
    }
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      // Compute and show result
      const answers: QuizAnswers = {
        dispute_type: form.dispute_type as DisputeType,
        amount_dollars: parseFloat(form.amount),
        state_slug: form.state_slug,
        incident_date: form.incident_date,
        prior_contact: form.prior_contact as PriorContact,
        evidence: form.evidence as Evidence,
        defendant: form.defendant as DefendantKind,
      };
      const facts = stateFacts[form.state_slug] ?? null;
      const r = scoreCase(answers, facts);
      setResult(r);
      setStep(totalSteps);
    }
  }

  function back() {
    if (step > 0) setStep(step - 1);
    setError(null);
  }

  function startOver() {
    setForm(INITIAL);
    setStep(0);
    setResult(null);
    try {
      window.localStorage.removeItem(DRAFT_KEY);
    } catch {
      // ignore
    }
  }

  if (step >= totalSteps && result) {
    return <Result result={result} state={stateFacts[form.state_slug]} stateSlug={form.state_slug} onRestart={startOver} />;
  }

  const progress = Math.round((step / totalSteps) * 100);

  return (
    <>
      <section className="cs-hero">
        <div className="wrap-narrow" style={{ textAlign: "center" }}>
          <span className="eyebrow">Free case-score</span>
          <h1 style={{ marginTop: 14 }}>
            Is your case <em>worth pursuing</em>?
          </h1>
          <p className="cs-lede">
            Seven questions. No signup, no email required. We&rsquo;ll give you a strength score,
            your statute-of-limitations deadline, and a clear recommended next step.
          </p>
        </div>
      </section>

      <section className="cs-section">
        <div className="wrap-narrow">
          <div className="cs-card">
            {/* Progress */}
            <div className="cs-progress">
              <div className="cs-progress-track">
                <div className="cs-progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <div className="cs-progress-meta">
                <span>
                  Question <strong>{step + 1}</strong> of {totalSteps}
                </span>
                <button type="button" className="cs-link" onClick={startOver} disabled={step === 0 && form.dispute_type === ""}>
                  Start over
                </button>
              </div>
            </div>

            {error && <div className="cs-error">{error}</div>}

            <div className="cs-step">
              {step === 0 && (
                <Q label="What kind of dispute is this?" sub="Pick the closest match.">
                  <div className="cs-cards">
                    {DISPUTE_OPTIONS.map((o) => (
                      <button
                        key={o.value}
                        type="button"
                        className={`cs-card-pick ${form.dispute_type === o.value ? "selected" : ""}`}
                        onClick={() => set("dispute_type", o.value)}
                      >
                        <span className="cs-card-pick-label">{o.label}</span>
                        <span className="cs-card-pick-blurb">{o.blurb}</span>
                      </button>
                    ))}
                  </div>
                </Q>
              )}

              {step === 1 && (
                <Q label="How much money are you trying to recover?" sub="Enter the dollar amount you believe you're owed.">
                  <div className="cs-amount">
                    <span>$</span>
                    <input
                      type="number"
                      inputMode="decimal"
                      step="1"
                      min="0"
                      placeholder="2,500"
                      value={form.amount}
                      onChange={(e) => set("amount", e.target.value)}
                      autoFocus
                    />
                  </div>
                </Q>
              )}

              {step === 2 && (
                <Q label="What state did this happen in?" sub="Small-claims rules and limits vary by state.">
                  <select
                    value={form.state_slug}
                    onChange={(e) => set("state_slug", e.target.value)}
                    className="cs-select"
                  >
                    <option value="">Pick a state…</option>
                    {states.map((s) => (
                      <option key={s.slug} value={s.slug}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </Q>
              )}

              {step === 3 && (
                <Q label="When did the dispute happen?" sub="Approximate is fine — used to check if your statute of limitations is still good.">
                  <input
                    type="date"
                    value={form.incident_date}
                    max={new Date().toISOString().split("T")[0]}
                    onChange={(e) => set("incident_date", e.target.value)}
                    className="cs-date"
                  />
                </Q>
              )}

              {step === 4 && (
                <Q label="Have you tried to resolve it with the other party?" sub="A demand letter is one of the strongest signals to a judge that you tried.">
                  <div className="cs-cards">
                    {PRIOR_OPTIONS.map((o) => (
                      <button
                        key={o.value}
                        type="button"
                        className={`cs-card-pick ${form.prior_contact === o.value ? "selected" : ""}`}
                        onClick={() => set("prior_contact", o.value)}
                      >
                        <span className="cs-card-pick-label">{o.label}</span>
                        <span className="cs-card-pick-blurb">{o.blurb}</span>
                      </button>
                    ))}
                  </div>
                </Q>
              )}

              {step === 5 && (
                <Q label="What evidence do you have?" sub="Documentation is the single biggest factor in whether you win at the hearing.">
                  <div className="cs-cards">
                    {EVIDENCE_OPTIONS.map((o) => (
                      <button
                        key={o.value}
                        type="button"
                        className={`cs-card-pick ${form.evidence === o.value ? "selected" : ""}`}
                        onClick={() => set("evidence", o.value)}
                      >
                        <span className="cs-card-pick-label">{o.label}</span>
                        <span className="cs-card-pick-blurb">{o.blurb}</span>
                      </button>
                    ))}
                  </div>
                </Q>
              )}

              {step === 6 && (
                <Q label="Who owes you the money?" sub="This affects whether you can actually collect after winning.">
                  <div className="cs-cards">
                    {DEFENDANT_OPTIONS.map((o) => (
                      <button
                        key={o.value}
                        type="button"
                        className={`cs-card-pick ${form.defendant === o.value ? "selected" : ""}`}
                        onClick={() => set("defendant", o.value)}
                      >
                        <span className="cs-card-pick-label">{o.label}</span>
                        <span className="cs-card-pick-blurb">{o.blurb}</span>
                      </button>
                    ))}
                  </div>
                </Q>
              )}
            </div>

            <div className="cs-actions">
              <button type="button" className="btn btn-cream" onClick={back} disabled={step === 0}>
                Back
              </button>
              <button type="button" className="btn btn-dark" onClick={next}>
                {step === totalSteps - 1 ? "Get my score" : "Continue"}
              </button>
            </div>
          </div>

          <p className="cs-disclaimer">
            CivilCase is not a law firm. The score is a directional signal, not legal advice. For
            cases over your state&rsquo;s small-claims cap, anything involving criminal exposure,
            or anything time-sensitive,{" "}
            <Link href="/disclaimer" className="cs-disc-link">
              consult a licensed attorney
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}

function Q({ label, sub, children }: { label: string; sub?: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="cs-q">{label}</h2>
      {sub && <p className="cs-q-sub">{sub}</p>}
      <div className="cs-q-body">{children}</div>
    </div>
  );
}

/* ─── Result page ──────────────────────────────────────────────────── */
function Result({
  result,
  state,
  stateSlug,
  onRestart,
}: {
  result: ScoreResult;
  state: StateFacts | undefined;
  stateSlug: string;
  onRestart: () => void;
}) {
  const verdictMeta: Record<ScoreResult["verdict"], { label: string; tone: "good" | "ok" | "warn" | "bad" }> = {
    strong: { label: "Strong case", tone: "good" },
    decent: { label: "Decent case", tone: "ok" },
    weak: { label: "Borderline", tone: "warn" },
    very_weak: { label: "Probably not worth it", tone: "bad" },
  };
  const v = verdictMeta[result.verdict];

  // Animated count-up for the score number
  const [shown, setShown] = useState(0);
  useEffect(() => {
    let start: number | null = null;
    const duration = 900;
    const target = result.score;
    let raf = 0;
    const tick = (ts: number) => {
      if (start === null) start = ts;
      const t = Math.min(1, (ts - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setShown(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [result.score]);

  const path = result.path;
  const pathCopy: Record<ScoreResult["path"], { headline: string; sub: string; primary: { href: string; label: string }; secondary: { href: string; label: string } }> = {
    demand_letter_strong: {
      headline: "Send a demand letter today.",
      sub: "Your case looks strong. About half of disputes settle once a professional demand letter shows up — no filing required.",
      primary: { href: "/demand-letter", label: "Send a demand letter ($39)" },
      secondary: { href: `/small-claims/${stateSlug}`, label: state ? `Read the ${state.name} guide` : "Read your state's guide" },
    },
    demand_then_file: {
      headline: "Try a demand letter first. Be ready to file.",
      sub: "Your case is workable. A demand letter is the cheap, low-risk first move; if there's no response, small claims is realistic.",
      primary: { href: "/demand-letter", label: "Send a demand letter ($39)" },
      secondary: { href: `/small-claims/${stateSlug}`, label: state ? `${state.name} small-claims guide` : "Read your state's guide" },
    },
    borderline_consider_costs: {
      headline: "It's borderline. Weigh the cost vs the recovery.",
      sub: "The case is workable but the score is not strong. Filing fees, your time, and the chance of collecting all matter at this level.",
      primary: { href: `/small-claims/${stateSlug}`, label: state ? `${state.name} small-claims guide` : "Read your state's guide" },
      secondary: { href: "/demand-letter", label: "Try a demand letter first" },
    },
    consult_attorney_high_value: {
      headline: "Talk to an attorney first.",
      sub: "Your claim exceeds your state's small-claims cap. The right court matters — and contingency or hourly counsel is often realistic at this dollar amount.",
      primary: { href: "/disclaimer", label: "Why we recommend an attorney" },
      secondary: { href: `/small-claims/${stateSlug}`, label: state ? `${state.name} guide for context` : "Read your state's guide" },
    },
    consult_attorney_complex: {
      headline: "This deserves a lawyer's read.",
      sub: "Government defendants involve sovereign immunity and tight pre-suit notice deadlines. Most state bars run a referral service for short, low-cost consults.",
      primary: { href: "/disclaimer", label: "Why we recommend an attorney" },
      secondary: { href: `/small-claims/${stateSlug}`, label: state ? `${state.name} guide for context` : "Read your state's guide" },
    },
    likely_time_barred: {
      headline: "You're likely past the deadline.",
      sub: "Your statute of limitations appears to have run. Some claim types have discovery rules or tolling exceptions that an attorney can spot — that's the conversation to have.",
      primary: { href: "/disclaimer", label: "When to consult an attorney" },
      secondary: { href: `/small-claims/${stateSlug}`, label: state ? `${state.name} statute-of-limitations details` : "Read your state's guide" },
    },
  };
  const copy = pathCopy[path];

  const positives = result.factors.filter((f) => f.impact === "positive");
  const negatives = result.factors.filter((f) => f.impact === "negative");
  const neutrals = result.factors.filter((f) => f.impact === "neutral");

  return (
    <>
      <section className="cs-result-hero">
        <div className="wrap-narrow" style={{ textAlign: "center" }}>
          <span className="eyebrow">Your case-score</span>
          <div className={`cs-score-ring tone-${v.tone}`}>
            <div className="cs-score-num">{shown}</div>
            <div className="cs-score-of">/ 100</div>
          </div>
          <div className={`cs-verdict tone-${v.tone}`}>{v.label}</div>
        </div>
      </section>

      <section className="cs-section">
        <div className="wrap-narrow">
          {/* Recommended path */}
          <div className={`cs-path-card tone-${v.tone}`}>
            <span className="cs-path-eyebrow">Recommended next step</span>
            <h2 className="cs-path-h">{copy.headline}</h2>
            <p className="cs-path-sub">{copy.sub}</p>
            <div className="cs-path-ctas">
              <Link href={copy.primary.href} className="btn btn-dark">
                {copy.primary.label}
              </Link>
              <Link href={copy.secondary.href} className="btn btn-cream">
                {copy.secondary.label}
              </Link>
            </div>
          </div>

          {/* SOL deadline callout */}
          {result.sol_summary && (
            <div className={`cs-sol-card ${result.sol_warning ? "warn" : ""}`}>
              <div className="cs-sol-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
              </div>
              <div>
                <div className="cs-sol-title">Statute of limitations</div>
                <p>{result.sol_summary}</p>
              </div>
            </div>
          )}

          {/* Cap warning if any */}
          {result.cap_warning && (
            <div className="cs-warn-card">
              <strong>Heads up: </strong>
              {result.cap_warning}
            </div>
          )}

          {/* Factor breakdown */}
          <div className="cs-factors">
            {positives.length > 0 && (
              <div className="cs-factor-col positive">
                <h3>What helped your score</h3>
                {positives.map((f, i) => (
                  <div key={i} className="cs-factor">
                    <div className="cs-factor-label">{f.label}</div>
                    <p>{f.detail}</p>
                  </div>
                ))}
              </div>
            )}
            {negatives.length > 0 && (
              <div className="cs-factor-col negative">
                <h3>What hurt your score</h3>
                {negatives.map((f, i) => (
                  <div key={i} className="cs-factor">
                    <div className="cs-factor-label">{f.label}</div>
                    <p>{f.detail}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {neutrals.length > 0 && (
            <div className="cs-factor-col neutral">
              <h3>Worth knowing</h3>
              {neutrals.map((f, i) => (
                <div key={i} className="cs-factor">
                  <div className="cs-factor-label">{f.label}</div>
                  <p>{f.detail}</p>
                </div>
              ))}
            </div>
          )}

          {/* Restart */}
          <div className="cs-restart">
            <button type="button" className="cs-link" onClick={onRestart}>
              ← Start a new case-score
            </button>
          </div>

          <p className="cs-disclaimer">
            This score is a directional signal based on the facts you provided, not legal advice.
            CivilCase is not a law firm.{" "}
            <Link href="/disclaimer" className="cs-disc-link">
              Read the full disclaimer
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}

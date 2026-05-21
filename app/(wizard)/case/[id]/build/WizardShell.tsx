"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Case } from "../../../../../lib/supabase/types";
import {
  isComplete as phaseIsComplete,
  validateCategoryFromCase,
  validateClaimAmountFromCase,
  validateDefendantFromCase,
  validateEligibilityFromCase,
  validateEvidenceFromCase,
  validateNarrativeFromCase,
  validatePlaintiffFromCase,
} from "../../../../../lib/cases/phase-validators";

interface Props {
  caseRow: Case;
  children: React.ReactNode;
}

const PHASES = [
  { key: "eligibility", label: "Eligibility" },
  { key: "category", label: "Category" },
  { key: "defendant", label: "Defendant" },
  { key: "plaintiff", label: "Your info" },
  { key: "narrative", label: "What happened" },
  { key: "claim-amount", label: "Amount" },
  { key: "evidence", label: "Evidence" },
  { key: "review", label: "Review" },
] as const;

// Each "section" in the nav is one phase. Completion is computed from case
// fields so the user sees real progress regardless of which order they
// fill them in. Delegates to the shared phase validators in
// lib/cases/phase-validators.ts so this stays in lockstep with the step
// component's Continue gate and the final finish-intake gate.
function isPhaseComplete(c: Case, phaseKey: string): boolean {
  switch (phaseKey) {
    case "eligibility":
      return phaseIsComplete(validateEligibilityFromCase(c));
    case "category":
      return phaseIsComplete(validateCategoryFromCase(c));
    case "defendant":
      return phaseIsComplete(validateDefendantFromCase(c));
    case "plaintiff":
      return phaseIsComplete(validatePlaintiffFromCase(c));
    case "narrative":
      return phaseIsComplete(validateNarrativeFromCase(c));
    case "claim-amount":
      return phaseIsComplete(validateClaimAmountFromCase(c));
    case "evidence":
      return phaseIsComplete(validateEvidenceFromCase(c));
    case "review":
      // Review is "complete" once the user signs off and the case moves
      // out of draft status (anything other than 'draft' is post-intake).
      return c.status !== "draft";
    default:
      return false;
  }
}

type StepKey = (typeof PHASES)[number]["key"];

export default function WizardShell({ caseRow, children }: Props) {
  const pathname = usePathname() || "";
  const currentSlug = (pathname.split("/").pop() || "") as StepKey;

  const phaseIdx = PHASES.findIndex((p) => p.key === currentSlug);
  const activePhase = phaseIdx >= 0 ? phaseIdx : -1;

  const confidence = computeConfidence(caseRow);
  const confidenceBand = bandLabel(confidence);

  const previewTo = caseRow.defendant_name || "—";
  const previewFrom = caseRow.plaintiff_name || "—";
  const previewRe = caseRow.facts_narrative ? truncate(caseRow.facts_narrative, 60) : "—";
  const previewAmount = caseRow.amount_cents
    ? formatDollars(caseRow.amount_cents)
    : "—";

  return (
    <div className="dlw-page">
      <header className="dlw-topbar-bar">
        <Link href="/" aria-label="CivilCase home" className="dlw-topbar-brand">
          <Image
            src="/civilcase-logo.webp"
            alt="CivilCase"
            width={180}
            height={59}
            className="dlw-topbar-logo"
            priority
          />
        </Link>
        <Link href="/dashboard" className="dlw-topbar-exit" aria-label="Exit wizard">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </Link>
      </header>
      <div className="dlw-progress-row">
        <ol className="dlw-phases">
            {PHASES.map((phase, i) => {
              const isComplete = isPhaseComplete(caseRow, phase.key);
              const isActive = i === activePhase;
              // A phase is reachable (clickable) if either it's the current
              // step, it's the first phase, or the previous phase is complete.
              // This prevents users from skipping ahead past unfinished
              // sections while still letting them go back to edit.
              const isReachable =
                isActive ||
                i === 0 ||
                isPhaseComplete(caseRow, PHASES[i - 1].key);
              const isLocked = !isReachable;
              const state = isActive
                ? "active"
                : isComplete
                  ? "done"
                  : isLocked
                    ? "locked"
                    : "future";
              const content = (
                <>
                  <span className="dlw-phase-num">
                    {isComplete && !isActive
                      ? "✓"
                      : isLocked
                        ? "🔒"
                        : i + 1}
                  </span>
                  <span className="dlw-phase-label">{phase.label}</span>
                </>
              );
              const classes = [
                "dlw-phase",
                `is-${state}`,
                isReachable && !isActive ? "is-clickable" : "",
                isLocked ? "is-locked" : "",
                i === 0 ? "is-first" : "",
                i === PHASES.length - 1 ? "is-last" : "",
              ]
                .filter(Boolean)
                .join(" ");
              return (
                <li key={phase.key} className={classes}>
                  {isReachable && !isActive ? (
                    <Link
                      href={`/case/${caseRow.id}/build/${phase.key}`}
                      aria-label={`Go to ${phase.label}`}
                    >
                      {content}
                    </Link>
                  ) : isLocked ? (
                    <span
                      aria-disabled="true"
                      title="Finish the earlier steps to unlock this one"
                    >
                      {content}
                    </span>
                  ) : (
                    <span aria-current="step">{content}</span>
                  )}
                </li>
              );
            })}
          </ol>

        <span className="dlw-save-status" aria-live="polite" id="dlw-save-status">
          Changes saved
        </span>
      </div>

      <div className="dlw-body">
        <main className="dlw-main">{children}</main>

        <aside className="dlw-rail" aria-label="Coach and progress">
          <div className="dlw-coach-card">
            <div className="dlw-coach-avatar">
              <Image
                src="/icon.png"
                alt=""
                width={40}
                height={40}
                aria-hidden
              />
            </div>
            <div className="dlw-coach-meta">
              <strong>CivilCase</strong>
              <span className="dlw-coach-step">
                {`Step ${Math.max(activePhase, 0) + 1} of ${PHASES.length}`}
              </span>
            </div>
            <p className="dlw-coach-line">{coachLine(currentSlug)}</p>
          </div>

          <div className="dlw-conf-card">
            <div className="dlw-conf-head">
              <span className="dlw-conf-tag">Case summary</span>
              <strong>
                {PHASES.filter((p) => isPhaseComplete(caseRow, p.key)).length}/{PHASES.length}
              </strong>
            </div>
            <div className="dlw-conf-bar">
              <span style={{ width: `${(PHASES.filter((p) => isPhaseComplete(caseRow, p.key)).length / PHASES.length) * 100}%` }} />
            </div>
            <p className="dlw-conf-band">{confidenceBand}</p>

            <dl className="dlw-preview-rows">
              <div>
                <dt>To</dt>
                <dd>{previewTo}</dd>
              </div>
              <div>
                <dt>From</dt>
                <dd>{previewFrom}</dd>
              </div>
              <div>
                <dt>Re</dt>
                <dd>{previewRe}</dd>
              </div>
              <div>
                <dt>Amount</dt>
                <dd>{previewAmount}</dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>

      <footer className="dlw-footer-flat">
        <p className="dlw-disclaimer">
          We are not a law firm and do not provide legal advice. We are a guided
          document-automation service. Use of this service is not a substitute for the
          advice of an attorney.
        </p>
      </footer>
    </div>
  );
}

function categoryPicked(c: Case, answers: Record<string, unknown>): boolean {
  if (!c.dispute_type) return false;
  if (c.dispute_type !== "other") return true;
  const text = answers.dispute_type_other;
  return typeof text === "string" && text.trim().length > 0;
}

function coachLine(slug: string): string {
  const map: Record<string, string> = {
    eligibility:
      "Quick gut check: how much, where, and is this the right tool for your situation?",
    category: "What kind of dispute is this? Pick the one that fits best.",
    defendant: "No more excuses from them. Let's get their info.",
    plaintiff: "Your voice matters. Let's make it official.",
    narrative: "Don't hold back. The more details, the stronger your case.",
    "claim-amount": "How much are you owed? Add any extra damage categories that fit.",
    evidence: "Your evidence is your power. Show them proof.",
    review: "Your letter is ready. You did the hard part. Now let them sweat.",
  };
  return map[slug] || "Let's get started.";
}

function computeConfidence(c: Case): number {
  let score = 0;
  const answers = (c.intake_answers ?? {}) as Record<string, unknown>;
  if (categoryPicked(c, answers)) score += 10;
  if (c.amount_cents > 0) score += 10;
  if (c.state) score += 10;
  if (c.defendant_name) score += 15;
  if (c.defendant_address) score += 10;
  if (c.plaintiff_name) score += 10;
  if (c.plaintiff_address) score += 10;
  if (c.facts_narrative && c.facts_narrative.length > 30) score += 15;
  if (c.intake_answers && Object.keys(c.intake_answers).length > 0) score += 10;
  return Math.min(score, 100);
}

function bandLabel(score: number): string {
  if (score <= 25) return "Just getting started";
  if (score <= 50) return "Building — keep going to strengthen your case";
  if (score <= 75) return "Good — keep going";
  return "Strong case profile";
}

function previewFillCount(c: Case): number {
  let n = 0;
  if (c.defendant_name) n++;
  if (c.plaintiff_name) n++;
  if (c.facts_narrative) n++;
  if (c.amount_cents > 0) n++;
  return n;
}

function formatDollars(cents: number): string {
  return (cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

function truncate(s: string, n: number): string {
  if (s.length <= n) return s;
  return s.slice(0, n - 1) + "…";
}

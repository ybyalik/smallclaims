"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAutosave } from "../useAutosave";

interface Props {
  caseId: string;
}

interface Question {
  key: "adult" | "private_party" | "within_sol";
  prompt: string;
  failMessage: string;
}

const QUESTIONS: Question[] = [
  {
    key: "adult",
    prompt: "Both you and the other party are 18 or older.",
    failMessage:
      "Demand letters between minors require a parent or guardian to act on the minor's behalf.",
  },
  {
    key: "private_party",
    prompt:
      "The other party is not a US federal, state, or local government agency.",
    failMessage:
      "Disputes against government agencies follow a different process (notice-of-claim filings) and a demand letter usually has no leverage.",
  },
  {
    key: "within_sol",
    prompt:
      "You're filing within the relevant statute of limitations for your situation.",
    failMessage:
      "Letters sent after the statute of limitations has passed have no legal leverage. The recipient can ignore them safely.",
  },
];

export default function EligibilityStep({ caseId }: Props) {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, boolean>>({
    adult: true,
    private_party: true,
    within_sol: true,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const allYes = QUESTIONS.every((q) => answers[q.key] === true);
  const failedQ = QUESTIONS.find((q) => answers[q.key] === false);

  // Autosave each yes/no answer.
  useAutosave(caseId, {
    intake_answers: { eligibility: answers, eligibility_passed: allYes },
  });

  async function continueToNext() {
    if (!allYes || saving) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/demand-letters/${caseId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          intake_answers: {
            eligibility: answers,
            eligibility_passed: true,
          },
        }),
      });
      if (!res.ok) throw new Error("Could not save");
      router.push(`/demand-letter/wizard/${caseId}/recovery`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save");
      setSaving(false);
    }
  }

  return (
    <div className="dlw-step">
      <div className="dlw-step-eyebrow">Step 4 of 5</div>
      <h1>Quick check</h1>
      <p className="dlw-sub">A few yes/no questions so we can confirm a demand letter is the right tool.</p>

      <div className="dlw-elig-list">
        {QUESTIONS.map((q) => (
          <div key={q.key} className="dlw-elig-row">
            <div className="dlw-elig-text">{q.prompt}</div>
            <div className="dlw-elig-toggle" role="group" aria-label={q.prompt}>
              <button
                type="button"
                className={answers[q.key] ? "is-on" : ""}
                onClick={() => setAnswers((s) => ({ ...s, [q.key]: true }))}
                aria-pressed={answers[q.key]}
              >
                Yes
              </button>
              <button
                type="button"
                className={!answers[q.key] ? "is-on" : ""}
                onClick={() => setAnswers((s) => ({ ...s, [q.key]: false }))}
                aria-pressed={!answers[q.key]}
              >
                No
              </button>
            </div>
          </div>
        ))}
      </div>

      {failedQ ? (
        <div className="dlw-elig-handoff">
          <h3>This might not be the right fit</h3>
          <p style={{ margin: "0 0 8px" }}>{failedQ.failMessage}</p>
          <p style={{ margin: 0, fontSize: 13.5 }}>
            Some next-step options:{" "}
            <a href="https://www.consumer.ftc.gov/" target="_blank" rel="noopener noreferrer">FTC consumer protection</a>{" "}
            ·{" "}
            <a href="https://www.lsc.gov/about-lsc/what-legal-aid/get-legal-help" target="_blank" rel="noopener noreferrer">find legal aid in your state</a>
          </p>
        </div>
      ) : null}

      <div className="dlw-actions">
        <Link href={`/demand-letter/wizard/${caseId}/state`} className="dlw-actions-back">
          ← Back
        </Link>
        <button className="dlw-cta" onClick={continueToNext} disabled={!allYes || saving}>
          {saving ? "Saving…" : "Continue ▶"}
        </button>
      </div>
      {error ? <p style={{ color: "var(--accent)", marginTop: 12 }}>{error}</p> : null}
    </div>
  );
}

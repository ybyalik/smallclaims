"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  useFormErrors,
  ErrorSummary,
} from "../../../../../../components/wizard/form-errors";
import Combobox, {
  type ComboboxOption,
} from "../../../../../../components/wizard/Combobox";
import { listStates } from "../../../../../../lib/demand-letter/state-context";
import { useAutosave } from "../useAutosave";

interface Props {
  caseId: string;
  initialAmountCents: number;
  initialStateAbbr: string;
  initialAnswers: Record<string, unknown>;
  stateCapDollars: number | null;
  stateName: string | null;
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

const STATE_OPTIONS: ComboboxOption[] = listStates().map((s) => ({
  value: s.abbr,
  label: s.name,
  sublabel: s.abbr,
  search: s.abbr,
}));

const AMOUNT_CHIPS = [500, 1_000, 2_500, 5_000, 10_000];

export default function EligibilityStep({
  caseId,
  initialAmountCents,
  initialStateAbbr,
  initialAnswers,
  stateCapDollars,
  stateName,
}: Props) {
  const router = useRouter();

  // Field state. Three yes/no checks, principal amount, and the state.
  // Default the yes/no checks to true so the user can fly through if
  // everything's fine. They have to actively un-toggle one to indicate a
  // problem.
  const initialElig =
    (initialAnswers.eligibility as Record<string, boolean> | undefined) ?? {};
  const [answers, setAnswers] = useState<Record<string, boolean>>({
    adult: initialElig.adult ?? true,
    private_party: initialElig.private_party ?? true,
    within_sol: initialElig.within_sol ?? true,
  });
  const [amount, setAmount] = useState<number>(
    Math.max(0, Math.round(initialAmountCents / 100)),
  );
  const [stateAbbr, setStateAbbr] = useState<string>(initialStateAbbr || "");
  const [saving, setSaving] = useState(false);
  const { errors, showErrors, clear, setErrors } = useFormErrors();

  const allYes = QUESTIONS.every((q) => answers[q.key] === true);
  const failedQ = QUESTIONS.find((q) => answers[q.key] === false);

  // Run the cap check as soon as we know amount + state. stateCapDollars
  // comes from the server based on initialStateAbbr; if the user changes
  // states mid-step, we won't have the new cap until they advance + return,
  // but the over-cap fork in /build/claim-amount still catches it.
  const overCap =
    stateCapDollars !== null && amount > stateCapDollars && amount > 0;
  const capExcessDollars =
    overCap && stateCapDollars !== null ? amount - stateCapDollars : 0;

  // Autosave on every change. Stamps c.amount_cents, c.state, and the
  // eligibility answers so the wizard router knows the phase is complete.
  useAutosave(caseId, {
    amount_cents: amount > 0 ? amount * 100 : null,
    state: stateAbbr || null,
    intake_answers: {
      recipient_state: stateAbbr || null,
      eligibility: answers,
      eligibility_passed: allYes,
    },
  });

  // Reset error visibility when fields change so the user isn't yelled at
  // about something they're actively fixing.
  useEffect(() => {
    clear();
  }, [amount, stateAbbr, JSON.stringify(answers)]);
  // eslint-disable-next-line react-hooks/exhaustive-deps

  function validate(): Record<string, string> {
    const errs: Record<string, string> = {};
    if (!amount || amount <= 0) {
      errs.amount = "Enter the amount you're claiming.";
    }
    if (!stateAbbr) {
      errs.stateAbbr = "Pick the state where the other party is located.";
    }
    if (!allYes) {
      errs.eligibility =
        "Answer Yes to all three checks, or step back and reconsider.";
    }
    return errs;
  }

  async function continueToNext() {
    if (saving) return;
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      showErrors(errs);
      return;
    }
    setSaving(true);
    clear();
    try {
      const res = await fetch(`/api/demand-letters/${caseId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount_cents: amount * 100,
          state: stateAbbr,
          intake_answers: {
            recipient_state: stateAbbr,
            eligibility: answers,
            eligibility_passed: true,
          },
        }),
      });
      if (!res.ok) throw new Error("Could not save");
      router.push(`/case/${caseId}/build/category`);
    } catch (e) {
      setErrors({ _save: e instanceof Error ? e.message : "Could not save" });
      setSaving(false);
    }
  }

  const niceStateLabel = useMemo(
    () => STATE_OPTIONS.find((o) => o.value === stateAbbr)?.label ?? "",
    [stateAbbr],
  );

  return (
    <div className="dlw-step">
      <div className="dlw-step-eyebrow">Phase 1 of 8 · Eligibility</div>
      <h1>A few quick checks before we build your case</h1>
      <p className="dlw-sub">
        Small claims has a few hard rules. Confirm the basics first so you
        don&rsquo;t spend time on a case that can&rsquo;t be filed.
      </p>

      {/* Principal amount */}
      <div style={{ marginTop: 24 }}>
        <h3
          style={{
            fontFamily: "Newsreader, Georgia, serif",
            fontSize: 18,
            margin: "0 0 6px",
          }}
        >
          About how much are you owed? <em className="dlw-required">*</em>
        </h3>
        <p className="dlw-hint" style={{ margin: "0 0 10px" }}>
          The principal amount. We&rsquo;ll let you add interest, fees, and
          statutory multipliers later.
        </p>
        <div className="dlw-amount-input">
          <span className="dlw-amount-prefix">$</span>
          <input
            type="text"
            inputMode="numeric"
            value={amount > 0 ? amount.toLocaleString("en-US") : ""}
            onChange={(e) => {
              const raw = e.target.value.replace(/[^0-9]/g, "");
              setAmount(raw ? parseInt(raw, 10) : 0);
            }}
            placeholder="0"
            className="dlw-input"
            aria-invalid={!!errors.amount}
          />
        </div>
        <div className="dlw-amount-chips" style={{ marginTop: 10 }}>
          {AMOUNT_CHIPS.map((v) => (
            <button
              key={v}
              type="button"
              className="dlw-amount-chip"
              onClick={() => setAmount(v)}
            >
              ${v.toLocaleString("en-US")}
            </button>
          ))}
        </div>
        {errors.amount ? (
          <span className="dlw-field-error-msg">{errors.amount}</span>
        ) : null}
      </div>

      {/* State */}
      <div style={{ marginTop: 28 }}>
        <h3
          style={{
            fontFamily: "Newsreader, Georgia, serif",
            fontSize: 18,
            margin: "0 0 6px",
          }}
        >
          What state is the other party in? <em className="dlw-required">*</em>
        </h3>
        <p className="dlw-hint" style={{ margin: "0 0 10px" }}>
          Where you&rsquo;d file if it goes to court. Drives the cap rules,
          the statute of limitations, and which statutes we cite in the
          letter.
        </p>
        <Combobox
          id="elig-state"
          value={stateAbbr}
          onChange={(v) => setStateAbbr(v.toUpperCase())}
          options={STATE_OPTIONS}
          ariaLabel="State"
          fullWidth
          placeholder="Select…"
        />
        {errors.stateAbbr ? (
          <span className="dlw-field-error-msg">{errors.stateAbbr}</span>
        ) : null}
      </div>

      {/* Over-cap banner — only fires when we have both amount + state and
          the principal is above the state's small-claims cap. */}
      {overCap ? (
        <div
          className="dlw-overcap-banner"
          style={{
            marginTop: 22,
            padding: "14px 16px",
            background: "#fff4e6",
            border: "1px solid #f0d99a",
            borderRadius: 8,
            fontSize: 13.5,
            lineHeight: 1.5,
          }}
        >
          <strong>Heads up:</strong> ${amount.toLocaleString("en-US")} is over{" "}
          {stateName ?? "this state"}&rsquo;s small-claims cap of $
          {stateCapDollars!.toLocaleString("en-US")}. You can still proceed,
          but in the Amount step we&rsquo;ll ask whether to waive the ${
            capExcessDollars.toLocaleString("en-US")
          } excess or file in civil court instead.
        </div>
      ) : null}

      {/* Three yes/no eligibility gates */}
      <div style={{ marginTop: 28 }}>
        <h3
          style={{
            fontFamily: "Newsreader, Georgia, serif",
            fontSize: 18,
            margin: "0 0 6px",
          }}
        >
          Confirm these three things <em className="dlw-required">*</em>
        </h3>
        <p className="dlw-hint" style={{ margin: "0 0 12px" }}>
          Toggle any to No if it doesn&rsquo;t apply. We&rsquo;ll flag the
          mismatch and tell you what to do about it.
        </p>
        <div className="dlw-elig-list">
          {QUESTIONS.map((q) => (
            <div key={q.key} className="dlw-elig-row">
              <div className="dlw-elig-text">{q.prompt}</div>
              <div
                className="dlw-elig-toggle"
                role="group"
                aria-label={q.prompt}
              >
                <button
                  type="button"
                  className={`dlw-elig-yes${
                    answers[q.key] === true ? " is-on" : ""
                  }`}
                  onClick={() =>
                    setAnswers((a) => ({ ...a, [q.key]: true }))
                  }
                >
                  Yes
                </button>
                <button
                  type="button"
                  className={`dlw-elig-no${
                    answers[q.key] === false ? " is-on" : ""
                  }`}
                  onClick={() =>
                    setAnswers((a) => ({ ...a, [q.key]: false }))
                  }
                >
                  No
                </button>
              </div>
            </div>
          ))}
        </div>
        {!allYes && failedQ ? (
          <div
            className="dlw-elig-fail"
            style={{
              marginTop: 14,
              padding: "12px 14px",
              background: "#faf3f1",
              border: "1px solid #e6c3bb",
              borderRadius: 8,
              fontSize: 13,
              color: "#5a574e",
              lineHeight: 1.5,
            }}
          >
            <strong>Heads up:</strong> {failedQ.failMessage}
          </div>
        ) : null}
      </div>

      <ErrorSummary
        errors={errors}
        order={["amount", "stateAbbr", "eligibility", "_save"]}
      />

      <div className="dlw-actions">
        <Link href={`/dashboard/cases`} className="dlw-actions-back">
          ← Cancel
        </Link>
        <button
          className="dlw-cta"
          onClick={continueToNext}
          disabled={saving}
        >
          {saving
            ? "Saving…"
            : `Continue${niceStateLabel ? ` (${niceStateLabel})` : ""} ▶`}
        </button>
      </div>
    </div>
  );
}

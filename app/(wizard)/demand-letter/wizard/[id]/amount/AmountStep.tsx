"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAutosave } from "../useAutosave";

interface Props {
  caseId: string;
  initialCents: number;
}

const COMMON_AMOUNTS = [500, 1_000, 2_500, 5_000, 10_000, 25_000];
const DEFAULT_DOLLARS = 1_000;
const MIN_DOLLARS = 50;

export default function AmountStep({ caseId, initialCents }: Props) {
  const router = useRouter();
  const initialDollars = initialCents > 0 ? Math.round(initialCents / 100) : 0;
  const [dollars, setDollars] = useState<number>(initialDollars);
  const [unsure, setUnsure] = useState<boolean>(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Autosave: persists amount + unsure flag as the user edits.
  const autoDollars = unsure ? DEFAULT_DOLLARS : dollars;
  useAutosave(
    caseId,
    autoDollars > 0
      ? {
          amount_cents: autoDollars * 100,
          intake_answers: { amount_unknown: unsure },
        }
      : {},
  );

  function onInput(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    setDollars(raw === "" ? 0 : parseInt(raw, 10));
    setUnsure(false);
  }

  function pickChip(amount: number) {
    setDollars(amount);
    setUnsure(false);
  }

  async function continueToNext() {
    if (saving) return;
    if (!unsure && dollars < MIN_DOLLARS) {
      setError(`Amount must be at least $${MIN_DOLLARS}.`);
      return;
    }
    setSaving(true);
    setError(null);
    const finalDollars = unsure ? DEFAULT_DOLLARS : dollars;
    try {
      const res = await fetch(`/api/demand-letters/${caseId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount_cents: finalDollars * 100,
          intake_answers: { amount_unknown: unsure },
        }),
      });
      if (!res.ok) throw new Error("Could not save");
      router.push(`/demand-letter/wizard/${caseId}/state`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save");
      setSaving(false);
    }
  }

  return (
    <div className="dlw-step">
      <div className="dlw-step-eyebrow">Step 2 of 5</div>
      <h1>About how much are you owed?</h1>
      <p className="dlw-sub">A rough number is fine. You can refine this later.</p>

      {/* Big number input with $ prefix */}
      <div className="dlw-amount-input-wrap">
        <span className="dlw-amount-input-prefix">$</span>
        <input
          type="text"
          inputMode="numeric"
          value={unsure ? "" : dollars > 0 ? dollars.toLocaleString("en-US") : ""}
          onChange={onInput}
          className="dlw-amount-input-big"
          placeholder={unsure ? "1,000" : "0"}
          aria-label="Amount in US dollars"
          autoFocus
        />
      </div>

      {/* Quick-pick chips */}
      <div className="dlw-amount-chips" style={{ marginTop: 16 }}>
        {COMMON_AMOUNTS.map((amount) => (
          <button
            key={amount}
            type="button"
            className={`dlw-amount-chip${dollars === amount && !unsure ? " is-on" : ""}`}
            onClick={() => pickChip(amount)}
          >
            ${amount.toLocaleString("en-US")}
          </button>
        ))}
      </div>

      <button
        type="button"
        className="dlw-amt-not-sure"
        onClick={() => setUnsure(!unsure)}
      >
        {unsure
          ? "✓ Not sure — using $1,000 placeholder. Click to enter exact."
          : "I'm not sure of the exact amount"}
      </button>

      <div className="dlw-actions">
        <Link
          href={`/demand-letter/wizard/${caseId}/category`}
          className="dlw-actions-back"
        >
          ← Back
        </Link>
        <button className="dlw-cta" onClick={continueToNext} disabled={saving}>
          {saving ? "Saving…" : "Continue ▶"}
        </button>
      </div>
      {error ? <p style={{ color: "var(--accent)", marginTop: 12 }}>{error}</p> : null}
    </div>
  );
}

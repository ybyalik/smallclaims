"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  caseId: string;
  claimDollars: number;
  stateName: string;
  stateAbbr: string;
  interestRate: number; // annual percent
  smallClaimsMax: number;
}

const SERVICE_FEE_TIER_A = 29;
const SERVICE_FEE_TIER_B = 49;

export default function RecoveryStep({
  caseId,
  claimDollars,
  stateName,
  interestRate,
  smallClaimsMax,
}: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Approximate statutory interest. We don't know the exact incident date yet,
  // so we estimate 3 months elapsed for the prescreen calculator. The real
  // letter math uses the incident date from Phase 3.
  const months = 3;
  const interest = Math.round((claimDollars * (interestRate / 100) * months) / 12);
  const totalDemand = claimDollars + interest;
  const takeHomeA = totalDemand - SERVICE_FEE_TIER_A;
  const takeHomeB = totalDemand - SERVICE_FEE_TIER_B;

  async function continueToNext() {
    if (saving) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/demand-letters/${caseId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          intake_answers: { recovery_seen: true },
        }),
      });
      if (!res.ok) throw new Error("Could not save");
      router.push(`/demand-letter/wizard/${caseId}/defendant`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save");
      setSaving(false);
    }
  }

  return (
    <div className="dlw-step">
      <div className="dlw-step-eyebrow">Step 5 of 5</div>
      <h1>Here&rsquo;s what your letter could put on the table.</h1>
      <p className="dlw-sub">
        Pre-judgment interest at {stateName}&rsquo;s statutory rate of {interestRate}% per year,
        estimated over 3 months. We&rsquo;ll refine the math when you tell us the exact
        incident date.
      </p>

      <div className="dlw-recov-card">
        <div className="dlw-recov-rows">
          <div className="dlw-recov-row">
            <span>Your claim amount</span>
            <span>${claimDollars.toLocaleString("en-US")}</span>
          </div>
          <div className="dlw-recov-row">
            <span>+ Pre-judgment interest ({interestRate}% × 3 mo)</span>
            <span>+ ${interest.toLocaleString("en-US")}</span>
          </div>
          <div className="dlw-recov-row subtotal">
            <span>What we&rsquo;ll demand on your behalf</span>
            <span>${totalDemand.toLocaleString("en-US")}</span>
          </div>
          <div className="dlw-recov-row fee">
            <span>− Our service fee (Send the Letter)</span>
            <span>− ${SERVICE_FEE_TIER_A}</span>
          </div>
        </div>

        <div className="dlw-recov-total">
          <span>What you keep if they pay</span>
          <strong>${takeHomeA.toLocaleString("en-US")}</strong>
        </div>

        <p style={{ marginTop: 14, fontSize: 13.5, color: "#6b6b6b" }}>
          With the <strong>Full Pressure</strong> tier ($49), your take-home would be{" "}
          <strong>${takeHomeB.toLocaleString("en-US")}</strong>. We&rsquo;ll show both options at
          checkout.
        </p>

        {smallClaimsMax > 0 ? (
          <p style={{ marginTop: 8, fontSize: 13, color: "#8b8779" }}>
            If they don&rsquo;t pay, your next step is small claims court in {stateName} (max
            claim ${smallClaimsMax.toLocaleString("en-US")}).
          </p>
        ) : null}
      </div>

      <div className="dlw-actions">
        <Link
          href={`/demand-letter/wizard/${caseId}/eligibility`}
          className="dlw-actions-back"
        >
          ← Back
        </Link>
        <button className="dlw-cta" onClick={continueToNext} disabled={saving}>
          {saving ? "Saving…" : "Start my letter — free to begin ▶"}
        </button>
      </div>
      {error ? <p style={{ color: "var(--accent)", marginTop: 12 }}>{error}</p> : null}
    </div>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import {
  amountHintFor,
  suggestClaimHeads,
} from "../../../../../../lib/demand-letter/ai-mocks";
import { CATEGORIES } from "../../../../../../lib/demand-letter/categories";
import type { DisputeType } from "../../../../../../lib/supabase/types";
import { useAutosave } from "../useAutosave";

interface Props {
  caseId: string;
  initialAmountCents: number;
  initialDisputeType: DisputeType;
  initialAnswers: Record<string, unknown>;
  stateInterestRate: number;
  stateName: string | null;
  stateCapDollars: number | null;
}

type CapChoice = "waive" | "civil_court" | null;

const AMOUNT_CHIPS = [500, 1_000, 2_500, 5_000, 10_000];

interface LineItem {
  key: string;
  title: string;
  amount: number;
}

export default function ClaimAmountStep({
  caseId,
  initialAmountCents,
  initialDisputeType,
  initialAnswers,
  stateInterestRate,
  stateName,
  stateCapDollars,
}: Props) {
  const router = useRouter();

  const [amount, setAmount] = useState<number>(
    Math.max(0, Math.round(initialAmountCents / 100))
  );
  const [calculation, setCalculation] = useState<string>(
    (initialAnswers.amount_calculation as string) || ""
  );
  const [lineItems, setLineItems] = useState<LineItem[]>(
    (initialAnswers.line_items as LineItem[]) || []
  );

  const initialCapChoice = (initialAnswers.cap_choice as CapChoice) || null;
  const [capChoice, setCapChoice] = useState<CapChoice>(initialCapChoice);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Total demanded = base amount + line items (claim heads).
  const totalDemand = useMemo(
    () => amount + lineItems.reduce((sum, li) => sum + li.amount, 0),
    [amount, lineItems],
  );

  const overCap =
    stateCapDollars !== null && totalDemand > stateCapDollars && totalDemand > 0;
  const capExcessDollars = overCap && stateCapDollars !== null
    ? totalDemand - stateCapDollars
    : 0;

  // If the user dropped below cap, clear any prior choice so the banner
  // doesn't misrepresent state.
  useEffect(() => {
    if (!overCap && capChoice !== null) setCapChoice(null);
  }, [overCap, capChoice]);

  const claimHeads = useMemo(
    () => suggestClaimHeads(initialDisputeType),
    [initialDisputeType]
  );
  const amountHint = useMemo(
    () => amountHintFor(initialDisputeType),
    [initialDisputeType]
  );
  const categoryLabel =
    CATEGORIES.find((c) => c.slug === initialDisputeType)?.label.toLowerCase() ?? "";

  // Statutory interest preview based on incident date saved on the previous step
  const incidentDateStr = (initialAnswers.incident_date as string) || "";
  const interestPreview = useMemo(() => {
    if (!incidentDateStr || !stateInterestRate || amount <= 0) return null;
    const inc = new Date(incidentDateStr);
    const now = new Date();
    const months = Math.max(
      0,
      (now.getFullYear() - inc.getFullYear()) * 12 + now.getMonth() - inc.getMonth()
    );
    const interest = +(((amount * (stateInterestRate / 100)) * months) / 12).toFixed(2);
    return { months, interest };
  }, [incidentDateStr, stateInterestRate, amount]);

  // Autosave: persist amount + calculation + line items + cap choice.
  useAutosave(
    caseId,
    amount > 0
      ? {
          amount_cents: amount * 100,
          intake_answers: {
            amount_calculation: calculation,
            line_items: lineItems,
            cap_choice: capChoice,
            cap_excess_cents: overCap ? capExcessDollars * 100 : 0,
          },
        }
      : {},
  );

  function toggleHead(head: { key: string; title: string }, accepted: boolean) {
    if (!accepted) {
      setLineItems((items) => items.filter((i) => i.key !== head.key));
      return;
    }
    setLineItems((items) =>
      items.find((i) => i.key === head.key)
        ? items
        : [...items, { key: head.key, title: head.title, amount: 0 }]
    );
  }

  function setHeadAmount(key: string, amt: number) {
    setLineItems((items) =>
      items.map((i) => (i.key === key ? { ...i, amount: amt } : i))
    );
  }

  function readyError(): string | null {
    if (amount < 50) return "Enter the amount you're demanding (minimum $50).";
    if (overCap && capChoice === null) {
      return `Your demand exceeds ${stateName ?? "your state"}'s small-claims cap. Pick how to proceed below.`;
    }
    return null;
  }

  async function continueToNext() {
    const err = readyError();
    if (err) {
      setError(err);
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/demand-letters/${caseId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount_cents: amount * 100,
          intake_answers: {
            amount_calculation: calculation,
            line_items: lineItems,
            cap_choice: capChoice,
            cap_excess_cents: overCap ? capExcessDollars * 100 : 0,
          },
        }),
      });
      if (!res.ok) throw new Error("Could not save");
      router.push(`/case/${caseId}/build/evidence`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save");
      setSaving(false);
    }
  }

  return (
    <div className="dlw-step">
      <div className="dlw-step-eyebrow">Phase 4 of 6</div>
      <h1>How much are you demanding?</h1>
      <p className="dlw-sub">
        The base amount you&rsquo;re owed, plus any extra damage categories that fit your
        situation. Statutory interest gets added automatically based on your state.
      </p>

      {/* Big input */}
      <div className="dlw-amount-input-wrap">
        <span className="dlw-amount-input-prefix">$</span>
        <input
          type="text"
          inputMode="numeric"
          value={amount > 0 ? amount.toLocaleString("en-US") : ""}
          onChange={(e) => {
            const raw = e.target.value.replace(/[^0-9]/g, "");
            setAmount(raw ? parseInt(raw, 10) : 0);
          }}
          className="dlw-amount-input-big"
          placeholder="0"
          autoFocus
        />
      </div>

      {/* Quick-pick chips */}
      <div className="dlw-amount-chips" style={{ marginTop: 16 }}>
        {AMOUNT_CHIPS.map((v) => (
          <button
            key={v}
            type="button"
            className={`dlw-amount-chip${amount === v ? " is-on" : ""}`}
            onClick={() => setAmount(v)}
          >
            ${v.toLocaleString("en-US")}
          </button>
        ))}
      </div>

      {amountHint ? (
        <div className="dlw-ai-card" style={{ marginTop: 14 }}>
          <div className="dlw-ai-card-title">Common amount</div>
          Similar disputes typically demand around{" "}
          <strong>${amountHint.common.toLocaleString("en-US")}</strong> for{" "}
          {amountHint.pattern}.
        </div>
      ) : null}

      {overCap && stateCapDollars !== null ? (
        <div className="dlw-cap-banner" role="alert">
          <div className="dlw-cap-banner-head">
            <AlertTriangle size={18} strokeWidth={2} aria-hidden />
            <strong>
              Your demand exceeds {stateName ?? "your state"}&rsquo;s small-claims cap of $
              {stateCapDollars.toLocaleString("en-US")}.
            </strong>
          </div>
          <p className="dlw-cap-banner-sub">
            You&rsquo;re asking for ${totalDemand.toLocaleString("en-US")}, which is $
            {capExcessDollars.toLocaleString("en-US")} over the cap. Pick how you want to proceed:
          </p>
          <div className="dlw-cap-options">
            <button
              type="button"
              className={`dlw-cap-option${capChoice === "waive" ? " is-on" : ""}`}
              onClick={() => setCapChoice("waive")}
            >
              <strong>Waive the excess and stay in small claims</strong>
              <span>
                You give up your right to recover the ${capExcessDollars.toLocaleString("en-US")} over
                the cap, but you keep the simple, attorney-optional process. Most people pick this.
              </span>
            </button>
            <button
              type="button"
              className={`dlw-cap-option${capChoice === "civil_court" ? " is-on" : ""}`}
              onClick={() => setCapChoice("civil_court")}
            >
              <strong>Pursue the full amount in civil court</strong>
              <span>
                You can recover everything, but the process is more formal and usually requires an
                attorney. We&rsquo;ll flag this case for civil court, not small claims.
              </span>
            </button>
          </div>
        </div>
      ) : null}

      {/* CALCULATION */}
      <div style={{ marginTop: 28 }}>
        <h3
          style={{
            fontFamily: "Newsreader, Georgia, serif",
            fontSize: 18,
            margin: "0 0 10px",
          }}
        >
          How did you calculate ${amount.toLocaleString("en-US")}?
        </h3>
        <p className="dlw-hint" style={{ margin: "0 0 8px" }}>
          One to three sentences. No need to argue or attach evidence.
        </p>
        <textarea
          value={calculation}
          onChange={(e) => setCalculation(e.target.value.slice(0, 400))}
          className="dlw-textarea"
          placeholder="e.g., I paid $1,500 for cabinets that were never installed. I want a full refund."
          rows={3}
        />
        {interestPreview && interestPreview.months > 0 ? (
          <div className="dlw-ai-card" style={{ marginTop: 8 }}>
            <div className="dlw-ai-card-title">Statutory interest</div>
            Successful claimants are often entitled to pre-judgment interest at{" "}
            <strong>{stateInterestRate}%</strong> per year. We&rsquo;ll add{" "}
            <strong>${interestPreview.interest.toLocaleString("en-US")}</strong> for{" "}
            {interestPreview.months} months elapsed.
          </div>
        ) : null}
      </div>

      {/* CLAIM HEADS */}
      {claimHeads.length > 0 ? (
        <div style={{ marginTop: 28 }}>
          <h3
            style={{
              fontFamily: "Newsreader, Georgia, serif",
              fontSize: 18,
              margin: "0 0 6px",
            }}
          >
            Want to claim more?
          </h3>
          <p className="dlw-hint" style={{ margin: "0 0 12px" }}>
            Optional damage categories that often apply to {categoryLabel} cases.
          </p>
          <div className="dlw-claim-heads">
            {claimHeads.map((head) => {
              const accepted = !!lineItems.find((i) => i.key === head.key);
              return (
                <div key={head.key}>
                  <div className="dlw-claim-head">
                    <div>
                      <h4>{head.title}</h4>
                      <p>{head.blurb}</p>
                    </div>
                    <button
                      type="button"
                      className={`dlw-claim-head-yes${accepted ? " is-on" : ""}`}
                      onClick={() => toggleHead(head, true)}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      className={`dlw-claim-head-no${!accepted ? " is-on" : ""}`}
                      onClick={() => toggleHead(head, false)}
                    >
                      No
                    </button>
                  </div>
                  {accepted ? (
                    <div className="dlw-line-item">
                      <span>{head.title} — amount</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={
                          lineItems
                            .find((i) => i.key === head.key)
                            ?.amount.toLocaleString("en-US") || ""
                        }
                        onChange={(e) => {
                          const raw = e.target.value.replace(/[^0-9]/g, "");
                          setHeadAmount(head.key, raw ? parseInt(raw, 10) : 0);
                        }}
                        className="dlw-input"
                        placeholder="$0"
                      />
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      ) : null}

      <div className="dlw-actions">
        <Link
          href={`/case/${caseId}/build/narrative`}
          className="dlw-actions-back"
        >
          ← Back
        </Link>
        <button className="dlw-cta" onClick={continueToNext} disabled={saving}>
          {saving ? "Saving…" : "Add your evidence ▶"}
        </button>
      </div>
      {error ? <p style={{ color: "var(--accent)", marginTop: 12 }}>{error}</p> : null}
    </div>
  );
}

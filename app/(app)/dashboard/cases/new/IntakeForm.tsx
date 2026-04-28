"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { STATES } from "../../../../../lib/states";
import { DISPUTE_OPTIONS } from "../../../../../lib/demand-letter/types";
import type { DisputeType } from "../../../../../lib/supabase/types";

type Step = "dispute" | "parties" | "facts";

interface FormState {
  // dispute
  dispute_type: DisputeType | "";
  state: string; // 2-letter
  amount: string; // dollars as string
  cure_period_days: number;
  // plaintiff
  plaintiff_name: string;
  plaintiff_email: string;
  plaintiff_phone: string;
  plaintiff_line1: string;
  plaintiff_line2: string;
  plaintiff_city: string;
  plaintiff_state: string;
  plaintiff_zip: string;
  // defendant
  defendant_name: string;
  defendant_email: string;
  defendant_phone: string;
  defendant_line1: string;
  defendant_line2: string;
  defendant_city: string;
  defendant_state: string;
  defendant_zip: string;
  // facts
  facts_narrative: string;
}

const INITIAL: FormState = {
  dispute_type: "",
  state: "",
  amount: "",
  cure_period_days: 14,
  plaintiff_name: "",
  plaintiff_email: "",
  plaintiff_phone: "",
  plaintiff_line1: "",
  plaintiff_line2: "",
  plaintiff_city: "",
  plaintiff_state: "",
  plaintiff_zip: "",
  defendant_name: "",
  defendant_email: "",
  defendant_phone: "",
  defendant_line1: "",
  defendant_line2: "",
  defendant_city: "",
  defendant_state: "",
  defendant_zip: "",
  facts_narrative: "",
};

export default function IntakeForm() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("dispute");
  const [form, setForm] = useState<FormState>(INITIAL);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function disputeOption() {
    return DISPUTE_OPTIONS.find((d) => d.value === form.dispute_type);
  }

  function validateDispute(): string | null {
    if (!form.dispute_type) return "Pick the type of dispute.";
    if (!form.state) return "Pick the state where the dispute happened.";
    const amount = parseFloat(form.amount);
    if (!amount || amount <= 0) return "Enter the amount you're owed.";
    if (amount > 50000) return "For amounts over $50,000, small claims usually isn't the right venue.";
    return null;
  }

  function validateParties(): string | null {
    if (!form.plaintiff_name.trim()) return "Your name is required.";
    if (!form.plaintiff_email.trim()) return "Your email is required so we can send you the letter.";
    if (!/.+@.+\..+/.test(form.plaintiff_email)) return "That email doesn't look right.";
    if (!form.plaintiff_line1 || !form.plaintiff_city || !form.plaintiff_state || !form.plaintiff_zip)
      return "Your full address is required (it appears on the letter).";
    if (!form.defendant_name.trim()) return "The other party's name is required.";
    if (!form.defendant_line1 || !form.defendant_city || !form.defendant_state || !form.defendant_zip)
      return "The other party's address is required so we can mail them the letter.";
    return null;
  }

  function validateFacts(): string | null {
    if (form.facts_narrative.trim().length < 60)
      return "Tell us at least a few sentences about what happened (60 characters minimum).";
    return null;
  }

  async function submit() {
    const err = validateFacts();
    if (err) return setError(err);
    setError(null);

    const amount_cents = Math.round(parseFloat(form.amount) * 100);

    const payload = {
      dispute_type: form.dispute_type,
      state: form.state,
      amount_cents,
      cure_period_days: form.cure_period_days,
      plaintiff_name: form.plaintiff_name,
      plaintiff_email: form.plaintiff_email,
      plaintiff_phone: form.plaintiff_phone || null,
      plaintiff_address: {
        line1: form.plaintiff_line1,
        line2: form.plaintiff_line2 || null,
        city: form.plaintiff_city,
        state: form.plaintiff_state,
        zip: form.plaintiff_zip,
      },
      defendant_name: form.defendant_name,
      defendant_email: form.defendant_email || null,
      defendant_phone: form.defendant_phone || null,
      defendant_address: {
        line1: form.defendant_line1,
        line2: form.defendant_line2 || null,
        city: form.defendant_city,
        state: form.defendant_state,
        zip: form.defendant_zip,
      },
      facts_narrative: form.facts_narrative,
    };

    startTransition(async () => {
      try {
        const res = await fetch("/api/demand-letter/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data?.error || "Something went wrong. Try again.");
          return;
        }
        router.push(`/dashboard/cases/${data.case_id}/letter`);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Network error. Try again.");
      }
    });
  }

  function next() {
    setError(null);
    if (step === "dispute") {
      const err = validateDispute();
      if (err) return setError(err);
      // pre-fill plaintiff state from dispute state
      if (!form.plaintiff_state) set("plaintiff_state", form.state);
      setStep("parties");
    } else if (step === "parties") {
      const err = validateParties();
      if (err) return setError(err);
      setStep("facts");
    } else {
      submit();
    }
  }

  function back() {
    setError(null);
    if (step === "parties") setStep("dispute");
    else if (step === "facts") setStep("parties");
  }

  return (
    <div className="dl-form">
      <div className="dl-progress">
        <div className={`dl-prog-step ${step === "dispute" ? "active" : "done"}`}>1. Dispute</div>
        <div className={`dl-prog-step ${step === "parties" ? "active" : step === "facts" ? "done" : ""}`}>
          2. Parties
        </div>
        <div className={`dl-prog-step ${step === "facts" ? "active" : ""}`}>3. What happened</div>
      </div>

      {error && <div className="dl-error">{error}</div>}

      {step === "dispute" && (
        <div className="dl-step">
          <h2>What kind of dispute is this?</h2>
          <div className="dl-dispute-grid">
            {DISPUTE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={`dl-dispute-card ${form.dispute_type === opt.value ? "selected" : ""}`}
                onClick={() => set("dispute_type", opt.value)}
              >
                <div className="dl-dispute-label">{opt.label}</div>
                <div className="dl-dispute-desc">{opt.shortDescription}</div>
              </button>
            ))}
          </div>

          <div className="dl-row">
            <label>
              <span className="dl-label">State where the dispute happened</span>
              <select
                value={form.state}
                onChange={(e) => set("state", e.target.value)}
                className="dl-input"
              >
                <option value="">Pick a state...</option>
                {STATES.map((s) => (
                  <option key={s.abbr} value={s.abbr}>
                    {s.name}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span className="dl-label">Amount owed (USD)</span>
              <input
                type="number"
                inputMode="decimal"
                step="0.01"
                min="0"
                placeholder="2500"
                value={form.amount}
                onChange={(e) => set("amount", e.target.value)}
                className="dl-input"
              />
            </label>

            <label>
              <span className="dl-label">Days to pay before you sue (cure period)</span>
              <select
                value={form.cure_period_days}
                onChange={(e) => set("cure_period_days", parseInt(e.target.value, 10))}
                className="dl-input"
              >
                <option value={7}>7 days</option>
                <option value={10}>10 days</option>
                <option value={14}>14 days (recommended)</option>
                <option value={30}>30 days</option>
              </select>
            </label>
          </div>
        </div>
      )}

      {step === "parties" && (
        <div className="dl-step">
          <h2>Who&apos;s involved?</h2>

          <h3 className="dl-subhead">You (the person being owed)</h3>
          <div className="dl-row">
            <label>
              <span className="dl-label">Full name</span>
              <input
                value={form.plaintiff_name}
                onChange={(e) => set("plaintiff_name", e.target.value)}
                className="dl-input"
                placeholder="Jane Doe"
              />
            </label>
            <label>
              <span className="dl-label">Email (where we send you the letter)</span>
              <input
                type="email"
                value={form.plaintiff_email}
                onChange={(e) => set("plaintiff_email", e.target.value)}
                className="dl-input"
                placeholder="you@example.com"
              />
            </label>
            <label>
              <span className="dl-label">Phone (optional)</span>
              <input
                value={form.plaintiff_phone}
                onChange={(e) => set("plaintiff_phone", e.target.value)}
                className="dl-input"
                placeholder="(555) 123-4567"
              />
            </label>
          </div>
          <div className="dl-row">
            <label>
              <span className="dl-label">Street address</span>
              <input
                value={form.plaintiff_line1}
                onChange={(e) => set("plaintiff_line1", e.target.value)}
                className="dl-input"
                placeholder="123 Main St"
              />
            </label>
            <label>
              <span className="dl-label">Apt/Suite (optional)</span>
              <input
                value={form.plaintiff_line2}
                onChange={(e) => set("plaintiff_line2", e.target.value)}
                className="dl-input"
              />
            </label>
          </div>
          <div className="dl-row">
            <label>
              <span className="dl-label">City</span>
              <input
                value={form.plaintiff_city}
                onChange={(e) => set("plaintiff_city", e.target.value)}
                className="dl-input"
              />
            </label>
            <label>
              <span className="dl-label">State</span>
              <select
                value={form.plaintiff_state}
                onChange={(e) => set("plaintiff_state", e.target.value)}
                className="dl-input"
              >
                <option value="">Pick a state...</option>
                {STATES.map((s) => (
                  <option key={s.abbr} value={s.abbr}>
                    {s.abbr}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span className="dl-label">ZIP</span>
              <input
                value={form.plaintiff_zip}
                onChange={(e) => set("plaintiff_zip", e.target.value)}
                className="dl-input"
                placeholder="90210"
              />
            </label>
          </div>

          <h3 className="dl-subhead">The other party (who owes you)</h3>
          <div className="dl-row">
            <label>
              <span className="dl-label">Full name or business name</span>
              <input
                value={form.defendant_name}
                onChange={(e) => set("defendant_name", e.target.value)}
                className="dl-input"
                placeholder="John Smith or Acme LLC"
              />
            </label>
            <label>
              <span className="dl-label">Email (optional)</span>
              <input
                type="email"
                value={form.defendant_email}
                onChange={(e) => set("defendant_email", e.target.value)}
                className="dl-input"
              />
            </label>
            <label>
              <span className="dl-label">Phone (optional)</span>
              <input
                value={form.defendant_phone}
                onChange={(e) => set("defendant_phone", e.target.value)}
                className="dl-input"
              />
            </label>
          </div>
          <div className="dl-row">
            <label>
              <span className="dl-label">Street address</span>
              <input
                value={form.defendant_line1}
                onChange={(e) => set("defendant_line1", e.target.value)}
                className="dl-input"
              />
            </label>
            <label>
              <span className="dl-label">Apt/Suite (optional)</span>
              <input
                value={form.defendant_line2}
                onChange={(e) => set("defendant_line2", e.target.value)}
                className="dl-input"
              />
            </label>
          </div>
          <div className="dl-row">
            <label>
              <span className="dl-label">City</span>
              <input
                value={form.defendant_city}
                onChange={(e) => set("defendant_city", e.target.value)}
                className="dl-input"
              />
            </label>
            <label>
              <span className="dl-label">State</span>
              <select
                value={form.defendant_state}
                onChange={(e) => set("defendant_state", e.target.value)}
                className="dl-input"
              >
                <option value="">Pick...</option>
                {STATES.map((s) => (
                  <option key={s.abbr} value={s.abbr}>
                    {s.abbr}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span className="dl-label">ZIP</span>
              <input
                value={form.defendant_zip}
                onChange={(e) => set("defendant_zip", e.target.value)}
                className="dl-input"
              />
            </label>
          </div>
        </div>
      )}

      {step === "facts" && (
        <div className="dl-step">
          <h2>What happened?</h2>
          <p className="dl-help">
            Write 4 to 8 sentences in plain English. Include dates, what was promised, what
            went wrong, and any payments already made. We&apos;ll turn this into a professional
            letter.
          </p>
          {disputeOption() && (
            <details className="dl-example">
              <summary>See an example</summary>
              <p>{disputeOption()!.examplePrompt}</p>
            </details>
          )}
          <textarea
            value={form.facts_narrative}
            onChange={(e) => set("facts_narrative", e.target.value)}
            className="dl-textarea"
            rows={10}
            placeholder="Tell us what happened, in your own words..."
          />
          <div className="dl-charcount">{form.facts_narrative.length} / 60 minimum</div>
        </div>
      )}

      <div className="dl-actions">
        {step !== "dispute" && (
          <button type="button" className="btn btn-cream" onClick={back} disabled={isPending}>
            Back
          </button>
        )}
        <button type="button" className="btn btn-dark" onClick={next} disabled={isPending}>
          {step === "facts"
            ? isPending
              ? "Drafting your letter..."
              : "Generate my letter"
            : "Continue"}
        </button>
      </div>
    </div>
  );
}

"use client";

import { useState, useMemo } from "react";
import type { StateGuide } from "../../lib/types/state-guide";

export default function FeeCalculator({
  fees,
  limits,
  stateName,
}: {
  fees: StateGuide["fees"];
  limits: StateGuide["limits"];
  stateName: string;
}) {
  const [amount, setAmount] = useState<string>("");
  const [partyType, setPartyType] = useState<"individual" | "business">("individual");

  const result = useMemo(() => {
    const num = Number(amount.replace(/[^\d.]/g, ""));
    if (!num || num <= 0) return null;
    const cap = partyType === "individual" ? limits.individual : limits.business;
    const overCap = num > cap;
    const tier = pickTier(num, fees.tiers);
    return { num, cap, overCap, tier };
  }, [amount, partyType, limits, fees.tiers]);

  return (
    <div className="widget fee-calculator">
      <div className="widget-head">
        <h3>How much will it cost to file?</h3>
        <p>Enter what you're owed. We'll calculate the {stateName} filing fee and tell you if you're under the cap.</p>
      </div>
      <div className="widget-body">
        <label className="widget-field">
          <span>You are filing as</span>
          <div className="seg" role="radiogroup" aria-label="Party type">
            <button
              type="button"
              role="radio"
              aria-checked={partyType === "individual"}
              data-active={partyType === "individual"}
              onClick={() => setPartyType("individual")}
            >
              An individual
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={partyType === "business"}
              data-active={partyType === "business"}
              onClick={() => setPartyType("business")}
            >
              A business
            </button>
          </div>
        </label>
        <label className="widget-field">
          <span>Claim amount</span>
          <div className="input-prefix">
            <span aria-hidden="true">$</span>
            <input
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="2,400"
              aria-label="Claim amount in dollars"
            />
          </div>
        </label>
      </div>
      {result && (
        <div className={`widget-result ${result.overCap ? "result-bad" : "result-good"}`}>
          {result.overCap ? (
            <>
              <strong>
                Your claim of ${formatMoney(result.num)} is above the ${formatMoney(result.cap)} {partyType} cap.
              </strong>
              <p>
                Two options: sue for ${formatMoney(result.cap)} and waive the rest (${formatMoney(result.num - result.cap)}), or file in regular civil court (limited civil) where the cap is higher and lawyers are allowed.
              </p>
            </>
          ) : (
            <>
              <strong>Filing fee: ${result.tier.amount}</strong>
              <p>
                Your ${formatMoney(result.num)} claim falls in the {result.tier.range} tier. Pay this when you file your SC-100. If you win, the loser owes you back the filing fee on top of the judgment.
              </p>
              <p className="result-note">
                Cannot afford it? File a Fee Waiver (Form FW-001) at the same time. The court can waive the filing fee plus your sheriff service fees if you receive needs-based benefits or fall under income guidelines.
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function pickTier(amount: number, tiers: StateGuide["fees"]["tiers"]) {
  // Simple algorithm: tiers are listed low-to-high. Pick the highest tier whose range contains the amount.
  // Since we structured tiers as $0-$1500, $1500.01-$5000, $5000.01-$12500, the lowest matching is correct.
  // We approximate by ordering descending and picking the first whose minimum is <= amount.
  const ranges = tiers.map((t) => ({ ...t, min: parseRangeMin(t.range) }));
  ranges.sort((a, b) => b.min - a.min);
  for (const r of ranges) {
    if (amount >= r.min) return r;
  }
  return tiers[0];
}

function parseRangeMin(range: string): number {
  // Extract first dollar amount from strings like "$0 to $1,500" or "$5,000.01 to $12,500"
  const match = range.match(/\$([\d,.]+)/);
  if (!match) return 0;
  return Number(match[1].replace(/,/g, ""));
}

function formatMoney(n: number): string {
  return n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

"use client";

import { useState, useMemo } from "react";
import type { StatuteOfLimitationsEntry } from "../../lib/types/state-guide";

export default function StatuteChecker({
  entries,
  stateName,
}: {
  entries: StatuteOfLimitationsEntry[];
  stateName: string;
}) {
  const [claimId, setClaimId] = useState(entries[0]?.id ?? "");
  const [incidentDate, setIncidentDate] = useState("");

  const result = useMemo(() => {
    if (!claimId || !incidentDate) return null;
    const entry = entries.find((e) => e.id === claimId);
    if (!entry) return null;
    const start = new Date(incidentDate);
    if (Number.isNaN(start.getTime())) return null;
    const deadline = new Date(start);
    deadline.setFullYear(deadline.getFullYear() + entry.years);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expired = deadline.getTime() < today.getTime();
    const daysLeft = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return { entry, deadline, expired, daysLeft };
  }, [claimId, incidentDate, entries]);

  const formatDate = (d: Date) =>
    d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="widget statute-checker">
      <div className="widget-head">
        <h3>Did you miss your deadline?</h3>
        <p>Pick the type of dispute and tell us when it happened. We'll tell you when the {stateName} deadline runs out.</p>
      </div>
      <div className="widget-body">
        <label className="widget-field">
          <span>Type of claim</span>
          <select
            value={claimId}
            onChange={(e) => setClaimId(e.target.value)}
            aria-label="Type of claim"
          >
            {entries.map((e) => (
              <option key={e.id} value={e.id}>
                {e.claim} ({e.years} {e.years === 1 ? "year" : "years"})
              </option>
            ))}
          </select>
        </label>
        <label className="widget-field">
          <span>Date the dispute happened</span>
          <input
            type="date"
            value={incidentDate}
            onChange={(e) => setIncidentDate(e.target.value)}
            aria-label="Date the dispute happened"
            max={new Date().toISOString().split("T")[0]}
          />
        </label>
      </div>
      {result && (
        <div className={`widget-result ${result.expired ? "result-bad" : "result-good"}`}>
          {result.expired ? (
            <>
              <strong>Your deadline expired on {formatDate(result.deadline)}.</strong>
              <p>That's {Math.abs(result.daysLeft)} days ago. Filing now will likely get your case dismissed if the defendant raises the deadline. Talk to a lawyer if you think a discovery rule or tolling exception might apply to your situation.</p>
            </>
          ) : (
            <>
              <strong>You have until {formatDate(result.deadline)}.</strong>
              <p>
                That's {result.daysLeft} days from today. Clock started: {result.entry.clockStart.toLowerCase()}.
                {result.entry.statute && (
                  <>
                    {" "}Authority: {result.entry.statute}.
                  </>
                )}
              </p>
              {result.daysLeft < 90 && (
                <p className="result-warning">
                  Less than 90 days left. Consider filing soon. Evidence and witness memories fade, and the deadline is unforgiving.
                </p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

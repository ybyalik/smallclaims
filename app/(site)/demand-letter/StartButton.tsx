"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * "Start my demand letter" button. Calls /api/demand-letters/start, which
 * creates an anonymous case (or attaches to the current user if signed in)
 * and returns a case_id. Routes to the wizard.
 */
export default function StartButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function start() {
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/demand-letters/start", { method: "POST" });
      const data = (await res.json()) as { case_id?: string; error?: string; claimed?: boolean };
      if (!res.ok || !data.case_id) {
        throw new Error(data.error || "Could not start. Please try again.");
      }
      // Authenticated users go to the dashboard wizard; anonymous to public wizard
      router.push(
        data.claimed
          ? `/dashboard/demand-letters/new?case=${data.case_id}`
          : `/demand-letter/wizard/${data.case_id}`
      );
    } catch (e) {
      const message = e instanceof Error ? e.message : "Could not start.";
      setError(message);
      setLoading(false);
    }
  }

  return (
    <>
      <button onClick={start} disabled={loading} className="btn btn-dark">
        {loading ? "Starting…" : "Start my demand letter"}
      </button>
      {error ? (
        <span style={{ color: "var(--accent)", fontSize: 13.5, marginLeft: 12 }}>
          {error}
        </span>
      ) : null}
    </>
  );
}

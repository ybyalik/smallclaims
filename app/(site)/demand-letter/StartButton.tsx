"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * "Start my demand letter" button. Calls /api/demand-letters/start (auth-
 * required). If the user isn't signed in, bounces to /signup and returns
 * here on completion.
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
      if (res.status === 401) {
        router.push(`/signup?next=${encodeURIComponent("/demand-letter")}`);
        return;
      }
      const data = (await res.json()) as { case_id?: string; error?: string };
      if (!res.ok || !data.case_id) {
        throw new Error(data.error || "Could not start. Please try again.");
      }
      router.push(`/case/${data.case_id}/build`);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Could not start.";
      setError(message);
      setLoading(false);
    }
  }

  return (
    <>
      <button onClick={start} disabled={loading} className="btn btn-green">
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

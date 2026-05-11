"use client";

import { useState } from "react";

export default function CourtPrepCheckout({ caseId }: { caseId: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function start() {
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/cases/${caseId}/prep/checkout`, { method: "POST" });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `HTTP ${res.status}`);
      }
      const data = (await res.json()) as { url: string };
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not start checkout");
      setLoading(false);
    }
  }

  return (
    <>
      <button type="button" className="btn btn-green" onClick={start} disabled={loading}>
        {loading ? "Redirecting…" : "Get my Court Prep Pack →"}
      </button>
      {error ? (
        <p style={{ color: "var(--accent)", marginTop: 10, fontSize: 13 }}>{error}</p>
      ) : null}
    </>
  );
}

"use client";

import { useState } from "react";

interface Props {
  caseId: string;
  disabled?: boolean;
}

export default function FilingGuideCheckout({ caseId, disabled }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function start() {
    if (loading || disabled) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/cases/${caseId}/file/checkout`, {
        method: "POST",
      });
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
      <button
        type="button"
        className="btn btn-green"
        onClick={start}
        disabled={loading || disabled}
      >
        {loading ? "Redirecting…" : "Get my Filing Guide →"}
      </button>
      {error ? (
        <p style={{ color: "var(--accent)", marginTop: 10, fontSize: 13 }}>{error}</p>
      ) : null}
    </>
  );
}

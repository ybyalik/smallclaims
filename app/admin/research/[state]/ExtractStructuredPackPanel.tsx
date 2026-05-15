"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  slug: string;
  allCallsDone: boolean;
  extractedAt: string | null;
  extractedModel: string | null;
  extractedCostCents: number | null;
  extractedSourceChars: number | null;
  callCharsTotal: number;
}

export default function ExtractStructuredPackPanel({
  slug,
  allCallsDone,
  extractedAt,
  extractedModel,
  extractedCostCents,
  extractedSourceChars,
  callCharsTotal,
}: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function extract() {
    if (busy || !allCallsDone) return;
    setBusy(true);
    setMsg(null);
    setErr(null);
    try {
      const res = await fetch(`/api/admin/state-research/${slug}/extract`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Extraction failed");
      setMsg(
        `Extracted from ${Number(data.chars ?? 0).toLocaleString()} chars · ${data.model} · $${((data.cost_cents ?? 0) / 100).toFixed(2)}`,
      );
      setTimeout(() => router.refresh(), 400);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Extraction failed");
    } finally {
      setBusy(false);
    }
  }

  const buttonLabel = busy
    ? "Extracting…"
    : extractedAt
      ? "Re-extract"
      : "Extract structured data";

  return (
    <section
      style={{
        marginTop: 24,
        padding: "14px 18px",
        border: "1px solid var(--rule)",
        borderRadius: 8,
        background: "var(--card)",
      }}
    >
      <h2 style={{ margin: 0, fontSize: 16 }}>Structured pack</h2>
      <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 6 }}>
        Pre-baked EvidencePack extracted from the four call markdowns. Used by
        per-case research reports and (later) the public state guide.
      </p>

      {extractedAt ? (
        <>
          <p style={{ fontSize: 13, marginTop: 8 }}>
            <strong>Extracted:</strong>{" "}
            {new Date(extractedAt).toLocaleString()}
            {extractedModel ? ` · ${extractedModel}` : null}
            {extractedCostCents != null
              ? ` · $${(extractedCostCents / 100).toFixed(2)}`
              : null}
          </p>
          <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>
            <strong>Source dossier read:</strong>{" "}
            {extractedSourceChars != null
              ? `${extractedSourceChars.toLocaleString()} chars`
              : "(not recorded — re-extract to capture)"}
            {" / "}
            {callCharsTotal.toLocaleString()} chars total across the 4 calls
            {extractedSourceChars != null
              ? extractedSourceChars >= callCharsTotal
                ? " — full dossier read ✓"
                : ` — ${(callCharsTotal - extractedSourceChars).toLocaleString()} chars were truncated`
              : null}
          </p>
        </>
      ) : (
        <p style={{ fontSize: 13, marginTop: 8, color: "var(--muted)" }}>
          Not yet extracted.
        </p>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10 }}>
        <button
          type="button"
          onClick={extract}
          disabled={busy || !allCallsDone}
          className="btn btn-dark btn-sm"
          title={
            allCallsDone
              ? "Run gpt-5-mini extraction over the combined markdown"
              : "All four calls must be done before extracting"
          }
        >
          {buttonLabel}
        </button>
        {!allCallsDone ? (
          <span style={{ fontSize: 12, color: "var(--muted)" }}>
            Finish all four calls first.
          </span>
        ) : null}
        {msg ? <span style={{ fontSize: 12, color: "var(--muted)" }}>{msg}</span> : null}
        {err ? <span style={{ fontSize: 12, color: "var(--accent)" }}>{err}</span> : null}
      </div>
    </section>
  );
}

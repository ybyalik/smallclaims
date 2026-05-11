"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Scope = "all" | 1 | 2 | 3 | 4;

interface Props {
  slug: string;
  scope: Scope;
  status?: string | null;
}

export default function StateResearchControls({ slug, scope, status }: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function call(action: "run" | "poll") {
    if (busy) return;
    setBusy(action);
    setMsg(null);
    setErr(null);
    try {
      const body = scope === "all" ? { call: "all" } : { call: scope };
      const res = await fetch(`/api/admin/state-research/${slug}/${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || `${action} failed`);
      }
      setMsg(action === "run" ? "Submitted" : "Polled");
      // Wait a tick so the user sees the toast, then refresh server data.
      setTimeout(() => router.refresh(), 400);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Request failed");
    } finally {
      setBusy(null);
    }
  }

  const runLabel =
    scope === "all"
      ? status === undefined
        ? "Run all 4 calls"
        : "Run all"
      : status === "done" || status === "failed"
        ? `Re-run call ${scope}`
        : status === "running"
          ? `Re-submit call ${scope}`
          : `Run call ${scope}`;

  const showPoll = scope === "all" ? true : status === "running";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <button
        type="button"
        onClick={() => call("run")}
        disabled={!!busy}
        className="btn btn-dark btn-sm"
      >
        {busy === "run" ? "Submitting…" : runLabel}
      </button>
      {showPoll ? (
        <button
          type="button"
          onClick={() => call("poll")}
          disabled={!!busy}
          className="btn btn-cream btn-sm"
        >
          {busy === "poll" ? "Polling…" : scope === "all" ? "Poll all" : "Poll"}
        </button>
      ) : null}
      {msg ? <span style={{ fontSize: 12, color: "var(--muted)" }}>{msg}</span> : null}
      {err ? <span style={{ fontSize: 12, color: "var(--accent)" }}>{err}</span> : null}
    </div>
  );
}

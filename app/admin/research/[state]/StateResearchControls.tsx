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
  const [via, setVia] = useState<"background" | "batch">("background");
  const [model, setModel] = useState<"o3-deep-research" | "o4-mini-deep-research">(
    "o3-deep-research",
  );
  const [showImport, setShowImport] = useState(false);
  const [importId, setImportId] = useState("");

  async function call(action: "run" | "poll") {
    if (busy) return;
    setBusy(action);
    setMsg(null);
    setErr(null);
    try {
      const callField = scope === "all" ? { call: "all" } : { call: scope };
      const body =
        action === "run" ? { ...callField, via, model } : callField;
      const res = await fetch(`/api/admin/state-research/${slug}/${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || `${action} failed`);
      }
      setMsg(
        action === "run"
          ? via === "batch"
            ? "Submitted to batch"
            : "Submitted"
          : "Polled",
      );
      // Wait a tick so the user sees the toast, then refresh server data.
      setTimeout(() => router.refresh(), 400);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Request failed");
    } finally {
      setBusy(null);
    }
  }

  async function importResponse() {
    if (busy || scope === "all" || !importId.trim()) return;
    setBusy("import");
    setMsg(null);
    setErr(null);
    try {
      const res = await fetch(`/api/admin/state-research/${slug}/import`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ call: scope, responseId: importId.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Import failed");
      setMsg(`Imported · ${data.chars?.toLocaleString()} chars · $${((data.cost_cents ?? 0) / 100).toFixed(2)}`);
      setImportId("");
      setShowImport(false);
      setTimeout(() => router.refresh(), 400);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Import failed");
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
    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
      <label
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontSize: 12,
          color: "var(--muted)",
          cursor: "pointer",
        }}
      >
        <input
          type="checkbox"
          checked={via === "batch"}
          onChange={(e) => setVia(e.target.checked ? "batch" : "background")}
          disabled={!!busy}
        />
        Batch (50% off, up to 24h)
      </label>
      <label
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontSize: 12,
          color: "var(--muted)",
        }}
      >
        Model
        <select
          value={model}
          onChange={(e) =>
            setModel(e.target.value as "o3-deep-research" | "o4-mini-deep-research")
          }
          disabled={!!busy}
          style={{ fontSize: 12, padding: "2px 6px" }}
        >
          <option value="o3-deep-research">o3-deep-research (full)</option>
          <option value="o4-mini-deep-research">o4-mini-deep-research (~5x cheaper)</option>
        </select>
      </label>
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
      {scope !== "all" ? (
        <button
          type="button"
          onClick={() => setShowImport((v) => !v)}
          disabled={!!busy}
          className="btn btn-cream btn-sm"
          title="Import an already-completed OpenAI response by ID"
        >
          {showImport ? "Cancel import" : "Import"}
        </button>
      ) : null}
      {msg ? <span style={{ fontSize: 12, color: "var(--muted)" }}>{msg}</span> : null}
      {err ? <span style={{ fontSize: 12, color: "var(--accent)" }}>{err}</span> : null}

      {showImport && scope !== "all" ? (
        <div
          style={{
            flexBasis: "100%",
            display: "flex",
            gap: 8,
            alignItems: "center",
            marginTop: 6,
          }}
        >
          <input
            type="text"
            value={importId}
            onChange={(e) => setImportId(e.target.value)}
            placeholder="resp_… or full OpenAI logs URL"
            className="dlw-input"
            style={{ flex: 1, fontFamily: "ui-monospace, monospace", fontSize: 12 }}
            disabled={!!busy}
          />
          <button
            type="button"
            onClick={importResponse}
            disabled={!!busy || !importId.trim()}
            className="btn btn-dark btn-sm"
          >
            {busy === "import" ? "Importing…" : `Save into call ${scope}`}
          </button>
        </div>
      ) : null}
    </div>
  );
}

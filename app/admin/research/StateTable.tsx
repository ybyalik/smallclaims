"use client";

// Client-side table of states with multi-select + bulk-run support.
// Server page renders the full list of states + their statuses and passes
// them in as props; this component layers checkboxes, a sticky bulk-action
// bar, and the POST to /bulk-run on top.

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

interface StateMeta {
  slug: string;
  name: string;
}

interface RowStatuses {
  call_1_status: string | null;
  call_2_status: string | null;
  call_3_status: string | null;
  call_4_status: string | null;
  updated_at?: string | null;
  structured_pack_extracted_at?: string | null;
}

// Hard cap matches the bulk-extract API. The number is small on purpose:
// each state extraction is a separate gpt-5-mini call against a ~300k-char
// dossier. Keeping batches small protects against runaway clicks and stays
// inside route timeouts.
const BULK_EXTRACT_CAP = 10;

interface Props {
  states: StateMeta[];
  rows: Record<string, RowStatuses>;
}

function pillFor(status: string | null) {
  const cls =
    status === "done"
      ? "admin-pill admin-pill-good"
      : status === "running"
        ? "admin-pill admin-pill-active"
        : status === "failed"
          ? "admin-pill admin-pill-warn"
          : "admin-pill admin-pill-neutral";
  return <span className={cls}>{status ?? "—"}</span>;
}

export default function StateTable({ states, rows }: Props) {
  const router = useRouter();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [via, setVia] = useState<"background" | "batch">("background");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const allSelected = useMemo(
    () => states.length > 0 && selected.size === states.length,
    [states.length, selected.size],
  );
  const someSelected = selected.size > 0 && !allSelected;

  function toggleOne(slug: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  }

  function toggleAll() {
    if (allSelected) setSelected(new Set());
    else setSelected(new Set(states.map((s) => s.slug)));
  }

  function selectIncomplete() {
    // Anything that isn't fully 'done' across all 4 calls.
    const next = new Set<string>();
    for (const s of states) {
      const r = rows[s.slug];
      const allDone =
        r?.call_1_status === "done" &&
        r?.call_2_status === "done" &&
        r?.call_3_status === "done" &&
        r?.call_4_status === "done";
      if (!allDone) next.add(s.slug);
    }
    setSelected(next);
  }

  function selectFailed() {
    const next = new Set<string>();
    for (const s of states) {
      const r = rows[s.slug];
      const anyFailed =
        r?.call_1_status === "failed" ||
        r?.call_2_status === "failed" ||
        r?.call_3_status === "failed" ||
        r?.call_4_status === "failed";
      if (anyFailed) next.add(s.slug);
    }
    setSelected(next);
  }

  // States that have all 4 calls done but NO structured_pack yet — these
  // are the candidates for bulk-extract.
  function selectUnextracted() {
    const next = new Set<string>();
    for (const s of states) {
      const r = rows[s.slug];
      const allDone =
        r?.call_1_status === "done" &&
        r?.call_2_status === "done" &&
        r?.call_3_status === "done" &&
        r?.call_4_status === "done";
      if (allDone && !r?.structured_pack_extracted_at) {
        next.add(s.slug);
        if (next.size >= BULK_EXTRACT_CAP) break;
      }
    }
    setSelected(next);
  }

  // Anything selected that isn't fully done across all 4 calls can't be
  // extracted. The button disables when the selection has any of those, so
  // the user knows to prune.
  const extractableSelected = useMemo(() => {
    let n = 0;
    let invalid = 0;
    for (const slug of selected) {
      const r = rows[slug];
      const allDone =
        r?.call_1_status === "done" &&
        r?.call_2_status === "done" &&
        r?.call_3_status === "done" &&
        r?.call_4_status === "done";
      if (allDone) n += 1;
      else invalid += 1;
    }
    return { n, invalid };
  }, [selected, rows]);

  async function runSelected() {
    if (busy || selected.size === 0) return;
    setBusy(true);
    setMsg(null);
    setErr(null);
    try {
      const res = await fetch("/api/admin/state-research/bulk-run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slugs: Array.from(selected), via }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Bulk run failed");
      setMsg(`Submitted ${data.succeeded ?? 0} of ${data.submitted ?? selected.size} states`);
      setSelected(new Set());
      setTimeout(() => router.refresh(), 400);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Bulk run failed");
    } finally {
      setBusy(false);
    }
  }

  async function extractSelected() {
    if (busy || extractableSelected.n === 0) return;
    // Use only the slugs that have all 4 calls done (skip the invalid ones
    // silently so the user can keep a mixed selection and just click).
    const eligible = Array.from(selected).filter((slug) => {
      const r = rows[slug];
      return (
        r?.call_1_status === "done" &&
        r?.call_2_status === "done" &&
        r?.call_3_status === "done" &&
        r?.call_4_status === "done"
      );
    });
    if (eligible.length === 0) return;
    if (eligible.length > BULK_EXTRACT_CAP) {
      setErr(
        `Too many states selected (${eligible.length}). Cap is ${BULK_EXTRACT_CAP} per batch.`,
      );
      return;
    }
    setBusy(true);
    setMsg(null);
    setErr(null);
    try {
      const res = await fetch("/api/admin/state-research/bulk-extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slugs: eligible }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Bulk extract failed");
      const failed = (data.perState ?? []).filter(
        (r: { ok: boolean }) => !r.ok,
      ).length;
      const cost = ((data.cost_cents ?? 0) / 100).toFixed(2);
      setMsg(
        `Extracted ${data.succeeded ?? 0} of ${data.submitted ?? eligible.length}` +
          (failed > 0 ? ` (${failed} failed)` : "") +
          ` · $${cost}`,
      );
      setSelected(new Set());
      setTimeout(() => router.refresh(), 400);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Bulk extract failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "10px 14px",
          marginBottom: 12,
          background: selected.size > 0 ? "var(--bg-soft)" : "transparent",
          border: selected.size > 0 ? "1px solid var(--rule)" : "1px solid transparent",
          borderRadius: 8,
          flexWrap: "wrap",
        }}
      >
        <strong style={{ fontSize: 13 }}>
          {selected.size > 0 ? `${selected.size} selected` : "Select states to run in bulk"}
        </strong>

        <button
          type="button"
          onClick={selectIncomplete}
          className="btn btn-cream btn-sm"
          style={{ fontSize: 12, padding: "4px 10px" }}
        >
          Select incomplete
        </button>
        <button
          type="button"
          onClick={selectFailed}
          className="btn btn-cream btn-sm"
          style={{ fontSize: 12, padding: "4px 10px" }}
        >
          Select with failures
        </button>
        <button
          type="button"
          onClick={selectUnextracted}
          className="btn btn-cream btn-sm"
          style={{ fontSize: 12, padding: "4px 10px" }}
          title={`Select up to ${BULK_EXTRACT_CAP} states that are fully researched but have no structured pack yet`}
        >
          Select unextracted
        </button>
        {selected.size > 0 ? (
          <button
            type="button"
            onClick={() => setSelected(new Set())}
            className="btn btn-cream btn-sm"
            style={{ fontSize: 12, padding: "4px 10px" }}
          >
            Clear
          </button>
        ) : null}

        <div style={{ flex: 1 }} />

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
            disabled={busy}
          />
          Batch (50% off, up to 24h)
        </label>
        <button
          type="button"
          onClick={runSelected}
          disabled={busy || selected.size === 0}
          className="btn btn-dark btn-sm"
        >
          {busy
            ? "Submitting…"
            : selected.size === 0
              ? "Run selected"
              : `Run ${selected.size} state${selected.size === 1 ? "" : "s"}`}
        </button>
        <button
          type="button"
          onClick={extractSelected}
          disabled={
            busy ||
            extractableSelected.n === 0 ||
            extractableSelected.n > BULK_EXTRACT_CAP
          }
          className="btn btn-cream btn-sm"
          title={
            extractableSelected.invalid > 0
              ? `${extractableSelected.invalid} of the selected states aren't fully researched yet and will be skipped`
              : `Run gpt-5-mini structured extraction on the selected states (max ${BULK_EXTRACT_CAP} per batch)`
          }
        >
          {busy
            ? "Extracting…"
            : extractableSelected.n === 0
              ? "Extract"
              : extractableSelected.n > BULK_EXTRACT_CAP
                ? `Too many (max ${BULK_EXTRACT_CAP})`
                : `Extract ${extractableSelected.n} state${extractableSelected.n === 1 ? "" : "s"}`}
        </button>

        {msg ? <span style={{ fontSize: 12, color: "var(--muted)" }}>{msg}</span> : null}
        {err ? <span style={{ fontSize: 12, color: "var(--accent)" }}>{err}</span> : null}
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th style={{ width: 28 }}>
              <input
                type="checkbox"
                checked={allSelected}
                ref={(el) => {
                  if (el) el.indeterminate = someSelected;
                }}
                onChange={toggleAll}
                aria-label="Select all states"
              />
            </th>
            <th>State</th>
            <th>Call 1 — Court</th>
            <th>Call 2 — Deadlines</th>
            <th>Call 3 — Filing</th>
            <th>Call 4 — Hearing+</th>
            <th>Extraction</th>
            <th>Last updated</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {states.map((s) => {
            const row = rows[s.slug];
            return (
              <tr key={s.slug}>
                <td>
                  <input
                    type="checkbox"
                    checked={selected.has(s.slug)}
                    onChange={() => toggleOne(s.slug)}
                    aria-label={`Select ${s.name}`}
                  />
                </td>
                <td>
                  <Link href={`/admin/research/${s.slug}`} className="admin-link">
                    {s.name}
                  </Link>
                </td>
                <td>{pillFor(row?.call_1_status ?? null)}</td>
                <td>{pillFor(row?.call_2_status ?? null)}</td>
                <td>{pillFor(row?.call_3_status ?? null)}</td>
                <td>{pillFor(row?.call_4_status ?? null)}</td>
                <td>
                  {row?.structured_pack_extracted_at ? (
                    <span
                      className="admin-pill admin-pill-good"
                      title={new Date(row.structured_pack_extracted_at).toLocaleString()}
                    >
                      extracted
                    </span>
                  ) : (
                    <span className="admin-pill admin-pill-neutral">—</span>
                  )}
                </td>
                <td>
                  {row?.updated_at ? (
                    <time style={{ fontSize: 12 }}>
                      {new Date(row.updated_at).toLocaleString()}
                    </time>
                  ) : (
                    <span style={{ fontSize: 12, color: "var(--muted)" }}>never run</span>
                  )}
                </td>
                <td className="admin-actions">
                  <Link href={`/admin/research/${s.slug}`}>Open</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

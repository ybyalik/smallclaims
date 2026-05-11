// State-level deep research index. One row per US state with status pills for
// each of the four calls. The actual research is submitted to OpenAI in
// background mode from the detail page; this page is the dashboard.

import Link from "next/link";
import { STATES } from "../../../lib/states";
import { createServiceRoleClient } from "../../../lib/supabase/service-role";
import { getStatePrompt, CALL_TITLES, type StateCallId } from "../../../lib/state-research/prompts";
import AutoRefresh from "./AutoRefresh";

export const dynamic = "force-dynamic";

interface StateRow {
  slug: string;
  state_name: string;
  call_1_status: string | null;
  call_2_status: string | null;
  call_3_status: string | null;
  call_4_status: string | null;
  call_1_completed_at: string | null;
  call_2_completed_at: string | null;
  call_3_completed_at: string | null;
  call_4_completed_at: string | null;
  call_1_cost_cents: number | null;
  call_2_cost_cents: number | null;
  call_3_cost_cents: number | null;
  call_4_cost_cents: number | null;
  updated_at: string;
}

async function loadRows(): Promise<Map<string, StateRow>> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const admin = createServiceRoleClient() as any;
    const { data } = await admin.from("state_research").select("*");
    const map = new Map<string, StateRow>();
    for (const r of (data ?? []) as StateRow[]) map.set(r.slug, r);
    return map;
  } catch {
    return new Map();
  }
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
  const label = status ?? "—";
  return <span className={cls}>{label}</span>;
}

export default async function StateResearchIndex() {
  const rows = await loadRows();

  let totalDone = 0;
  let totalRunning = 0;
  let totalFailed = 0;
  let totalCostCents = 0;
  for (const r of rows.values()) {
    const statuses = [r.call_1_status, r.call_2_status, r.call_3_status, r.call_4_status];
    for (const s of statuses) {
      if (s === "done") totalDone += 1;
      else if (s === "running") totalRunning += 1;
      else if (s === "failed") totalFailed += 1;
    }
    totalCostCents +=
      (r.call_1_cost_cents ?? 0) +
      (r.call_2_cost_cents ?? 0) +
      (r.call_3_cost_cents ?? 0) +
      (r.call_4_cost_cents ?? 0);
  }

  const anyRunning = Array.from(rows.values()).some(
    (r) =>
      r.call_1_status === "running" ||
      r.call_2_status === "running" ||
      r.call_3_status === "running" ||
      r.call_4_status === "running",
  );

  return (
    <div className="admin-page">
      <AutoRefresh enabled={anyRunning} />
      <header className="admin-page-head">
        <div>
          <h1>State research</h1>
          <p>
            Deep-research baseline for each US state. Four calls per state, each focused on a
            different topic cluster. Each call runs in OpenAI background mode (~10–30 min).
          </p>
        </div>
        <div style={{ fontSize: 13, color: "var(--muted)", textAlign: "right" }}>
          <div>{totalDone} calls done · {totalRunning} running · {totalFailed} failed</div>
          <div>Total spend: ${(totalCostCents / 100).toFixed(2)}</div>
        </div>
      </header>

      <table className="admin-table">
        <thead>
          <tr>
            <th>State</th>
            <th>Call 1 — Court</th>
            <th>Call 2 — Deadlines</th>
            <th>Call 3 — Filing</th>
            <th>Call 4 — Hearing+</th>
            <th>Last updated</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {STATES.map((s) => {
            const row = rows.get(s.slug);
            return (
              <tr key={s.slug}>
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

      <section style={{ marginTop: 48 }}>
        <header style={{ marginBottom: 12 }}>
          <h2 style={{ margin: 0 }}>Prompts in use</h2>
          <p style={{ fontSize: 13, color: "var(--muted)", margin: "4px 0 0" }}>
            Live snapshot of the four deep-research prompts pulled from{" "}
            <code>lib/state-research/prompts.ts</code> at request time. Whenever the prompts file
            changes and redeploys, this view updates. <code>[STATE NAME]</code> is the placeholder
            that gets replaced with the actual state name at submit time.
          </p>
        </header>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {([1, 2, 3, 4] as StateCallId[]).map((c) => {
            const prompt = getStatePrompt(c, "[STATE NAME]");
            return (
              <details
                key={c}
                style={{
                  border: "1px solid var(--rule)",
                  borderRadius: 8,
                  padding: "12px 16px",
                  background: "var(--card)",
                }}
              >
                <summary style={{ cursor: "pointer", fontWeight: 600 }}>
                  Call {c} — {CALL_TITLES[c]}
                  <span style={{ fontSize: 12, color: "var(--muted)", fontWeight: 400, marginLeft: 10 }}>
                    {prompt.length.toLocaleString()} chars · {prompt.split(/\s+/).filter(Boolean).length.toLocaleString()} words
                  </span>
                </summary>
                <pre
                  style={{
                    background: "var(--bg-soft)",
                    padding: 14,
                    borderRadius: 6,
                    maxHeight: 520,
                    overflow: "auto",
                    whiteSpace: "pre-wrap",
                    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                    fontSize: 12,
                    marginTop: 12,
                  }}
                >
                  {prompt}
                </pre>
              </details>
            );
          })}
        </div>
      </section>
    </div>
  );
}

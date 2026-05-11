// State research detail page. Shows the four-call status for one state, with
// markdown previews and run/re-run/poll controls.

import Link from "next/link";
import { notFound } from "next/navigation";
import { getStateBySlug, STATES } from "../../../../lib/states";
import { createServiceRoleClient } from "../../../../lib/supabase/service-role";
import { CALL_TITLES, type StateCallId } from "../../../../lib/state-research/prompts";
import StateResearchControls from "./StateResearchControls";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return STATES.map((s) => ({ state: s.slug }));
}

interface CallSnapshot {
  status: string | null;
  responseId: string | null;
  model: string | null;
  inputTokens: number | null;
  outputTokens: number | null;
  costCents: number | null;
  error: string | null;
  startedAt: string | null;
  completedAt: string | null;
  markdown: string | null;
}

interface StateRowFull {
  slug: string;
  state_name: string;
  [k: string]: unknown;
}

async function loadRow(slug: string): Promise<StateRowFull | null> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const admin = createServiceRoleClient() as any;
    const { data } = await admin
      .from("state_research")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();
    return (data ?? null) as StateRowFull | null;
  } catch {
    return null;
  }
}

function pickCall(row: StateRowFull | null, call: StateCallId): CallSnapshot {
  if (!row) {
    return {
      status: null,
      responseId: null,
      model: null,
      inputTokens: null,
      outputTokens: null,
      costCents: null,
      error: null,
      startedAt: null,
      completedAt: null,
      markdown: null,
    };
  }
  const p = `call_${call}`;
  return {
    status: (row[`${p}_status`] as string | null) ?? null,
    responseId: (row[`${p}_response_id`] as string | null) ?? null,
    model: (row[`${p}_model`] as string | null) ?? null,
    inputTokens: (row[`${p}_input_tokens`] as number | null) ?? null,
    outputTokens: (row[`${p}_output_tokens`] as number | null) ?? null,
    costCents: (row[`${p}_cost_cents`] as number | null) ?? null,
    error: (row[`${p}_error`] as string | null) ?? null,
    startedAt: (row[`${p}_started_at`] as string | null) ?? null,
    completedAt: (row[`${p}_completed_at`] as string | null) ?? null,
    markdown: (row[`${p}_markdown`] as string | null) ?? null,
  };
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
  return <span className={cls}>{status ?? "not started"}</span>;
}

function fmtElapsed(startedAt: string | null, completedAt: string | null): string {
  if (!startedAt) return "";
  const start = new Date(startedAt).getTime();
  const end = completedAt ? new Date(completedAt).getTime() : Date.now();
  const sec = Math.round((end - start) / 1000);
  if (sec < 60) return `${sec}s`;
  return `${Math.round(sec / 60)} min`;
}

export default async function StateResearchDetail({ params }: { params: { state: string } }) {
  const state = getStateBySlug(params.state);
  if (!state) notFound();
  const row = await loadRow(params.state);

  const calls: StateCallId[] = [1, 2, 3, 4];
  const snapshots = new Map<StateCallId, CallSnapshot>();
  for (const c of calls) snapshots.set(c, pickCall(row, c));

  const totalCostCents = calls.reduce((n, c) => n + (snapshots.get(c)!.costCents ?? 0), 0);
  const anyRunning = calls.some((c) => snapshots.get(c)!.status === "running");

  return (
    <div className="admin-page admin-research-view">
      <header className="admin-page-head">
        <div>
          <Link href="/admin/research" className="admin-back">← All states</Link>
          <h1>{state.name} research</h1>
          <p style={{ fontSize: 13, color: "var(--muted)" }}>
            Four parallel deep-research calls. Total spend so far: ${(totalCostCents / 100).toFixed(2)}.
            {anyRunning ? " One or more calls in progress — poll to check status." : null}
          </p>
        </div>
        <StateResearchControls slug={state.slug} scope="all" />
      </header>

      <div style={{ display: "flex", flexDirection: "column", gap: 24, marginTop: 12 }}>
        {calls.map((c) => {
          const snap = snapshots.get(c)!;
          return (
            <details
              key={c}
              open={snap.status === "done" || snap.status === "failed"}
              style={{
                border: "1px solid var(--rule)",
                borderRadius: 8,
                padding: "14px 18px",
                background: "var(--card)",
              }}
            >
              <summary
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                <span>
                  Call {c} — {CALL_TITLES[c]}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  {pillFor(snap.status)}
                  {snap.startedAt ? (
                    <span style={{ fontSize: 12, color: "var(--muted)" }}>
                      {fmtElapsed(snap.startedAt, snap.completedAt)}
                    </span>
                  ) : null}
                </span>
              </summary>

              <div style={{ marginTop: 16, fontSize: 13 }}>
                {snap.status === "running" ? (
                  <p style={{ color: "var(--muted)" }}>
                    Submitted to OpenAI at {snap.startedAt ? new Date(snap.startedAt).toLocaleString() : "—"}.
                    Response ID: <code>{snap.responseId ?? "—"}</code>. Cron polls every 5 min; or use Poll button.
                  </p>
                ) : null}

                {snap.status === "failed" ? (
                  <div className="admin-error">
                    <strong>Failed.</strong> {snap.error ?? "no message"}
                  </div>
                ) : null}

                {snap.status === "done" && snap.markdown ? (
                  <>
                    <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 10 }}>
                      {snap.model} · {(snap.inputTokens ?? 0).toLocaleString()} in /{" "}
                      {(snap.outputTokens ?? 0).toLocaleString()} out tokens ·{" "}
                      ${((snap.costCents ?? 0) / 100).toFixed(2)} ·{" "}
                      {snap.completedAt ? new Date(snap.completedAt).toLocaleString() : ""}
                    </div>
                    <pre
                      style={{
                        background: "var(--bg-soft)",
                        padding: 14,
                        borderRadius: 6,
                        maxHeight: 420,
                        overflow: "auto",
                        whiteSpace: "pre-wrap",
                        fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                        fontSize: 12,
                      }}
                    >
                      {snap.markdown}
                    </pre>
                  </>
                ) : null}

                <div style={{ marginTop: 12 }}>
                  <StateResearchControls slug={state.slug} scope={c} status={snap.status} />
                </div>
              </div>
            </details>
          );
        })}
      </div>
    </div>
  );
}

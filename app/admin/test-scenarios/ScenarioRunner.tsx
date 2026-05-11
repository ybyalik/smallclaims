"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Mode = "draft" | "paid";

interface SpawnedCase {
  caseId: string;
  scenarioSlug: string | null;
  scenarioLabel: string | null;
  mode: Mode;
  state: string;
  county: string | null;
  dispute_type: string;
  amount_dollars: number;
  defendant_name: string;
  created_at: string;
  status: string;
  researchJobStatus: string | null;
  deepStatus: string | null;
}

interface ListResponse {
  spawned: SpawnedCase[];
}

interface SpawnResponse {
  ok: boolean;
  caseId: string;
  mode: Mode;
  userUrl: string;
  adminUrl: string;
}

export default function ScenarioRunner() {
  const [mode, setMode] = useState<Mode>("paid");
  const [busyKey, setBusyKey] = useState<string | null>(null);
  const [spawned, setSpawned] = useState<SpawnedCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function refresh() {
    try {
      const res = await fetch("/api/admin/test-scenarios");
      const data = (await res.json()) as ListResponse;
      setSpawned(data.spawned ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function spawnRandom() {
    setBusyKey("random");
    setError(null);
    try {
      const res = await fetch(`/api/admin/test-scenarios?random=1&mode=${mode}`, {
        method: "POST",
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? `HTTP ${res.status}`);
      }
      const data = (await res.json()) as SpawnResponse;
      await refresh();
      // Open the spawned case in a new tab so the admin can immediately
      // walk through the flow they were testing.
      window.open(data.userUrl, "_blank");
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusyKey(null);
    }
  }

  async function deleteCase(caseId: string) {
    if (!confirm("Permanently delete this test case + all its research data? Cannot be undone.")) {
      return;
    }
    setBusyKey(`del:${caseId}`);
    setError(null);
    try {
      const res = await fetch(`/api/admin/test-scenarios?caseId=${encodeURIComponent(caseId)}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? `HTTP ${res.status}`);
      }
      await refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusyKey(null);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 36, maxWidth: 1100 }}>
      {/* Spawn controls */}
      <div>
        <h2 style={{ fontFamily: "Newsreader, Georgia, serif", fontSize: 22, margin: "0 0 12px" }}>
          Spawn a test case
        </h2>

        {/* Draft / Paid toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
          <span style={{ fontSize: 13, fontWeight: 600 }}>Mode:</span>
          <div
            style={{
              display: "inline-flex",
              border: "1px solid var(--hairline)",
              borderRadius: 999,
              padding: 3,
              background: "#fff",
            }}
          >
            <button
              type="button"
              onClick={() => setMode("draft")}
              style={{
                padding: "7px 16px",
                fontSize: 13,
                fontWeight: 600,
                border: 0,
                borderRadius: 999,
                cursor: "pointer",
                background: mode === "draft" ? "var(--ink, #111)" : "transparent",
                color: mode === "draft" ? "#fff" : "var(--ink-2, #1f1f1f)",
              }}
            >
              Draft (pre-purchase)
            </button>
            <button
              type="button"
              onClick={() => setMode("paid")}
              style={{
                padding: "7px 16px",
                fontSize: 13,
                fontWeight: 600,
                border: 0,
                borderRadius: 999,
                cursor: "pointer",
                background: mode === "paid" ? "var(--ink, #111)" : "transparent",
                color: mode === "paid" ? "#fff" : "var(--ink-2, #1f1f1f)",
              }}
            >
              Paid (post-purchase)
            </button>
          </div>
        </div>

        <div style={{ marginBottom: 6 }}>
          <button
            type="button"
            className="btn btn-dark"
            onClick={spawnRandom}
            disabled={busyKey === "random"}
            style={{ marginRight: 12 }}
          >
            {busyKey === "random" ? "Generating…" : "Spawn random scenario"}
          </button>
          <span style={{ color: "var(--muted)", fontSize: 13 }}>
            opens the spawned case in a new tab
          </span>
        </div>
        <p style={{ color: "var(--muted)", fontSize: 12.5, margin: "8px 0 0", lineHeight: 1.5, maxWidth: "62ch" }}>
          {mode === "draft"
            ? "Draft mode creates a status='draft' case with all wizard fields pre-filled and lands you in /case/[id]/build at the review step. Use it to test the pre-purchase flow + checkout."
            : "Paid mode creates a status='demand_paid' case and lands you in /case/[id] case file. Use it to test the post-purchase flow (demand letter, services menu, etc.)."}
        </p>
      </div>

      {error ? (
        <div
          style={{
            background: "rgba(217,64,46,0.08)",
            border: "1px solid rgba(217,64,46,0.3)",
            padding: "10px 14px",
            borderRadius: 8,
            color: "var(--accent)",
            fontSize: 13,
          }}
        >
          {error}
        </div>
      ) : null}

      {/* Spawned cases list */}
      <div>
        <h2 style={{ fontFamily: "Newsreader, Georgia, serif", fontSize: 22, margin: "0 0 12px" }}>
          Spawned test cases ({spawned.length})
        </h2>
        {loading ? (
          <p style={{ color: "var(--muted)" }}>Loading…</p>
        ) : spawned.length === 0 ? (
          <p style={{ color: "var(--muted)", fontSize: 14 }}>
            No test cases yet. Spawn one above to get started.
          </p>
        ) : (
          <div style={{ border: "1px solid var(--hairline)", borderRadius: 10, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
              <thead>
                <tr style={{ background: "var(--bg-2)", textAlign: "left" }}>
                  <th style={{ padding: "10px 12px", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)" }}>Case</th>
                  <th style={{ padding: "10px 12px", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)" }}>Mode</th>
                  <th style={{ padding: "10px 12px", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)" }}>Type / Amount</th>
                  <th style={{ padding: "10px 12px", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)" }}>Research</th>
                  <th style={{ padding: "10px 12px", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)" }}>Created</th>
                  <th style={{ padding: "10px 12px", textAlign: "right" }}></th>
                </tr>
              </thead>
              <tbody>
                {spawned.map((c) => {
                  const userUrl = c.mode === "draft" ? `/case/${c.caseId}/build` : `/case/${c.caseId}`;
                  return (
                    <tr key={c.caseId} style={{ borderTop: "1px solid var(--hairline)" }}>
                      <td style={{ padding: "12px" }}>
                        <Link href={userUrl} target="_blank" className="admin-link" style={{ fontWeight: 600 }}>
                          {c.scenarioLabel ?? c.scenarioSlug ?? c.caseId.slice(0, 8)}
                        </Link>
                        <div style={{ color: "var(--muted)", fontSize: 12, marginTop: 2 }}>
                          {c.state}
                          {c.county ? ` · ${c.county}` : ""}
                          {" · vs "}
                          {c.defendant_name}
                          {" · "}
                          <Link href={`/admin/cases/${c.caseId}`} className="admin-link">admin view</Link>
                        </div>
                      </td>
                      <td style={{ padding: "12px" }}>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "3px 9px",
                            borderRadius: 999,
                            fontSize: 11,
                            fontWeight: 600,
                            textTransform: "uppercase",
                            letterSpacing: "0.06em",
                            background: c.mode === "draft" ? "#f3f1ec" : "#e7f1ec",
                            color: c.mode === "draft" ? "#6a675e" : "#1f6e3a",
                          }}
                        >
                          {c.mode}
                        </span>
                      </td>
                      <td style={{ padding: "12px" }}>
                        <div style={{ textTransform: "capitalize" }}>
                          {c.dispute_type.replace(/_/g, " ")}
                        </div>
                        <div style={{ color: "var(--muted)", fontSize: 12 }}>
                          ${c.amount_dollars.toLocaleString("en-US")}
                        </div>
                      </td>
                      <td style={{ padding: "12px", fontSize: 12 }}>
                        {c.researchJobStatus ? (
                          <span style={{ color: "var(--ink-2)" }}>
                            {c.researchJobStatus}
                            {c.deepStatus ? ` · deep ${c.deepStatus}` : ""}
                          </span>
                        ) : (
                          <span style={{ color: "var(--muted)" }}>not started</span>
                        )}
                      </td>
                      <td style={{ padding: "12px", color: "var(--muted)", fontSize: 12 }}>
                        {new Date(c.created_at).toLocaleString()}
                      </td>
                      <td style={{ padding: "12px", textAlign: "right" }}>
                        <button
                          type="button"
                          className="btn btn-sm"
                          onClick={() => deleteCase(c.caseId)}
                          disabled={busyKey === `del:${c.caseId}`}
                          style={{
                            background: "transparent",
                            border: "1px solid var(--accent)",
                            color: "var(--accent)",
                          }}
                        >
                          {busyKey === `del:${c.caseId}` ? "Deleting…" : "Delete"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

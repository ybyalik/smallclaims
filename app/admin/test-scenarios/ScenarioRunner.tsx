"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface ScenarioMeta {
  slug: string;
  label: string;
  description: string;
  state: string;
  county: string | null;
  dispute_type: string;
  amount_dollars: number;
}

interface SpawnedCase {
  caseId: string;
  scenarioSlug: string | null;
  scenarioLabel: string | null;
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
  scenarios: ScenarioMeta[];
  spawned: SpawnedCase[];
}

export default function ScenarioRunner({ scenarios }: { scenarios: ScenarioMeta[] }) {
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

  async function spawnPreset(slug: string) {
    setBusyKey(`preset:${slug}`);
    setError(null);
    try {
      const res = await fetch(`/api/admin/test-scenarios?slug=${encodeURIComponent(slug)}`, {
        method: "POST",
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

  async function spawnRandom() {
    setBusyKey("random");
    setError(null);
    try {
      const res = await fetch(`/api/admin/test-scenarios?random=1`, { method: "POST" });
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
        <div style={{ marginBottom: 14 }}>
          <button
            type="button"
            className="btn btn-dark"
            onClick={spawnRandom}
            disabled={busyKey === "random"}
            style={{ marginRight: 12 }}
          >
            {busyKey === "random" ? "Generating…" : "Generate random scenario"}
          </button>
          <span style={{ color: "var(--muted)", fontSize: 13 }}>
            picks a random state, claim type, and parties
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 14 }}>
          {scenarios.map((s) => (
            <div
              key={s.slug}
              style={{
                border: "1px solid var(--hairline)",
                borderRadius: 12,
                padding: 16,
                background: "#fff",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: 14.5 }}>{s.label}</div>
                <div style={{ color: "var(--muted)", fontSize: 12.5, marginTop: 4, lineHeight: 1.5 }}>
                  {s.description}
                </div>
                <div style={{ marginTop: 8, fontSize: 11, color: "var(--muted)" }}>
                  {s.state}
                  {s.county ? ` · ${s.county} County` : ""}
                  {" · "}
                  {s.dispute_type.replace(/_/g, " ")}
                  {" · "}${s.amount_dollars.toLocaleString("en-US")}
                </div>
              </div>
              <button
                type="button"
                className="btn btn-cream btn-sm"
                onClick={() => spawnPreset(s.slug)}
                disabled={busyKey === `preset:${s.slug}`}
                style={{ alignSelf: "flex-start" }}
              >
                {busyKey === `preset:${s.slug}` ? "Spawning…" : "Spawn this"}
              </button>
            </div>
          ))}
        </div>
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
                  <th style={{ padding: "10px 12px", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)" }}>Type / Amount</th>
                  <th style={{ padding: "10px 12px", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)" }}>Research</th>
                  <th style={{ padding: "10px 12px", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)" }}>Created</th>
                  <th style={{ padding: "10px 12px", textAlign: "right" }}></th>
                </tr>
              </thead>
              <tbody>
                {spawned.map((c) => (
                  <tr key={c.caseId} style={{ borderTop: "1px solid var(--hairline)" }}>
                    <td style={{ padding: "12px" }}>
                      <Link href={`/admin/cases/${c.caseId}`} className="admin-link" style={{ fontWeight: 600 }}>
                        {c.scenarioLabel ?? c.scenarioSlug ?? c.caseId.slice(0, 8)}
                      </Link>
                      <div style={{ color: "var(--muted)", fontSize: 12, marginTop: 2 }}>
                        {c.state}
                        {c.county ? ` · ${c.county}` : ""}
                        {" · vs "}
                        {c.defendant_name}
                      </div>
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
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

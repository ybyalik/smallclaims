"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { marked } from "marked";
import TipTapEditor from "../../../../components/admin/TipTapEditor";
import type { AdminCollectionPlan } from "../../../../lib/admin/collection-plan";

interface Props {
  caseId: string;
  plans: AdminCollectionPlan[];
}

function fmtDate(s: string | null | undefined): string {
  if (!s) return "—";
  return new Date(s).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function statusTone(status: string): "neutral" | "active" | "good" | "warn" {
  switch (status) {
    case "ready":
      return "good";
    case "failed":
      return "warn";
    case "county_researching":
    case "sequencing":
    case "generating_report":
      return "active";
    default:
      return "neutral";
  }
}

function mdToHtml(md: string | null): string {
  if (!md) return "";
  return marked.parse(md, { async: false, breaks: true }) as string;
}

export default function CollectionPlanPanel({ caseId, plans }: Props) {
  const router = useRouter();
  const latest = plans[0] ?? null;
  const olderVersions = plans.slice(1);

  // Prefer the pre-stamped body_html; fall back to converting body_md.
  const serverHtml = useMemo(
    () => latest?.body_html ?? mdToHtml(latest?.body_md ?? null),
    [latest?.body_html, latest?.body_md],
  );

  const [editHtml, setEditHtml] = useState<string>(serverHtml);
  const [editing, setEditing] = useState<boolean>(false);
  const [saving, setSaving] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [showCountyJson, setShowCountyJson] = useState(false);
  const [showSequenceJson, setShowSequenceJson] = useState(false);
  const [showIntakeJson, setShowIntakeJson] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  async function regenerate() {
    if (regenerating) return;
    if (
      !confirm(
        "Regenerate the collection plan? This kicks off a fresh county research + sequencing + report run (takes 2-4 minutes). Previous versions stay in the table.",
      )
    ) {
      return;
    }
    setRegenerating(true);
    setError(null);
    setInfo(null);
    try {
      const res = await fetch(
        `/api/admin/cases/${caseId}/collection-plan/regenerate`,
        { method: "POST" },
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Regenerate failed");
      setInfo("Regenerated. Reloading…");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Regenerate failed");
    } finally {
      setRegenerating(false);
    }
  }

  async function saveEdits() {
    if (saving || editHtml.trim().length < 50) return;
    setSaving(true);
    setError(null);
    setInfo(null);
    try {
      const res = await fetch(
        `/api/admin/cases/${caseId}/collection-plan/save`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ body_html: editHtml }),
        },
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Save failed");
      setInfo("Saved.");
      setEditing(false);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="ev-section">
      <h4 className="ev-section-title">Collection plan</h4>

      {!latest ? (
        <>
          <p style={{ color: "var(--muted)", marginBottom: 12 }}>
            No collection plan has been generated for this case yet. Plans are
            kicked off when the user buys the product. Use Generate now to
            force-run the pipeline on this case.
          </p>
          <button
            type="button"
            className="btn btn-dark"
            onClick={regenerate}
            disabled={regenerating}
          >
            {regenerating ? "Generating…" : "Generate now"}
          </button>
        </>
      ) : (
        <>
          {/* Latest-version header with status, timestamps, and actions. */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 16,
              marginBottom: 14,
              flexWrap: "wrap",
            }}
          >
            <div style={{ flex: 1, minWidth: 240 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <span className={`admin-pill admin-pill-${statusTone(latest.status)}`}>
                  {latest.status}
                </span>
                <span style={{ color: "var(--muted)", fontSize: 13 }}>
                  v{latest.version} · created {fmtDate(latest.created_at)} ·
                  updated {fmtDate(latest.updated_at)}
                </span>
              </div>
              <div style={{ color: "var(--muted)", fontSize: 13 }}>
                Generated by: {latest.generated_by ?? "—"}
              </div>
              {latest.error_message ? (
                <div
                  style={{
                    marginTop: 8,
                    padding: "8px 12px",
                    background: "#fff4f0",
                    border: "1px solid #f5c8b8",
                    borderRadius: 6,
                    fontSize: 13,
                    color: "#923c1a",
                    fontFamily: "ui-monospace, monospace",
                  }}
                >
                  {latest.error_message}
                </div>
              ) : null}
            </div>
            <div style={{ display: "flex", gap: 8, flexShrink: 0, flexWrap: "wrap" }}>
              {serverHtml && !editing ? (
                <>
                  <a
                    href={`/api/cases/${caseId}/collection-plan/pdf`}
                    className="btn btn-cream btn-sm"
                  >
                    Download PDF
                  </a>
                  <button
                    type="button"
                    className="btn btn-cream btn-sm"
                    onClick={() => {
                      setEditHtml(serverHtml);
                      setEditing(true);
                    }}
                  >
                    Edit body
                  </button>
                </>
              ) : null}
              {editing ? (
                <>
                  <button
                    type="button"
                    className="btn btn-cream btn-sm"
                    onClick={() => setEditing(false)}
                    disabled={saving}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-dark btn-sm"
                    onClick={saveEdits}
                    disabled={saving || editHtml.trim().length < 50}
                  >
                    {saving ? "Saving…" : "Save"}
                  </button>
                </>
              ) : null}
              <button
                type="button"
                className="btn btn-dark btn-sm"
                onClick={regenerate}
                disabled={regenerating}
              >
                {regenerating ? "Regenerating…" : "Regenerate"}
              </button>
            </div>
          </div>

          {error ? <p style={{ color: "var(--accent)", marginBottom: 10 }}>{error}</p> : null}
          {info ? <p style={{ color: "#2e7a3b", marginBottom: 10 }}>{info}</p> : null}

          {/* Structured data: intake / county_pack / sequence (collapsible) */}
          <div className="admin-disclosure-group">
            <JsonDisclosure
              label="User intake at purchase"
              hint="The three checkboxes the customer answered at checkout (knows employer / real property / bank) plus any notes. This drives how the AI sequences the plan."
              open={showIntakeJson}
              onToggle={() => setShowIntakeJson((s) => !s)}
              data={latest.intake}
              emptyMessage="Empty"
            />
            <JsonDisclosure
              label="County pack JSON"
              hint="Structured data the county research step extracted from the sheriff, recorder, and clerk pages. Form codes, fees, contact info, procedural notes."
              open={showCountyJson}
              onToggle={() => setShowCountyJson((s) => !s)}
              data={latest.county_pack}
              emptyMessage="Empty — county research didn't complete"
            />
            <JsonDisclosure
              label="Sequenced plan JSON"
              hint="The ranked steps the AI produced (method, cost, time, expected recovery, action items) plus warnings and the bottom-line summary."
              open={showSequenceJson}
              onToggle={() => setShowSequenceJson((s) => !s)}
              data={latest.sequence}
              emptyMessage="Empty — sequencing didn't complete"
            />
          </div>

          {/* Report body: TipTap editor or rendered preview */}
          {editing ? (
            <TipTapEditor
              initialJson={null}
              initialHtml={editHtml}
              onChange={(d) => setEditHtml(d.html)}
            />
          ) : serverHtml ? (
            <div
              className="admin-research-content collection-plan-body"
              dangerouslySetInnerHTML={{ __html: serverHtml }}
            />
          ) : (
            <p style={{ color: "var(--muted)", fontStyle: "italic" }}>
              No body yet. The report writing step hasn&rsquo;t completed.
            </p>
          )}

          {/* Older versions */}
          {olderVersions.length > 0 ? (
            <details style={{ marginTop: 24 }}>
              <summary
                style={{
                  cursor: "pointer",
                  fontWeight: 600,
                  color: "var(--ink)",
                  marginBottom: 8,
                }}
              >
                Older versions ({olderVersions.length})
              </summary>
              <table className="admin-table" style={{ marginTop: 8 }}>
                <thead>
                  <tr>
                    <th>Version</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Updated</th>
                    <th>Error / Model</th>
                  </tr>
                </thead>
                <tbody>
                  {olderVersions.map((p) => (
                    <tr key={p.id}>
                      <td>v{p.version}</td>
                      <td>
                        <span className={`admin-pill admin-pill-${statusTone(p.status)}`}>
                          {p.status}
                        </span>
                      </td>
                      <td style={{ color: "var(--muted)" }}>{fmtDate(p.created_at)}</td>
                      <td style={{ color: "var(--muted)" }}>{fmtDate(p.updated_at)}</td>
                      <td
                        style={{
                          color: "var(--muted)",
                          fontSize: 12,
                          fontFamily: "ui-monospace, monospace",
                          maxWidth: 320,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                        title={p.error_message ?? p.generated_by ?? ""}
                      >
                        {p.error_message ?? p.generated_by ?? "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </details>
          ) : null}
        </>
      )}
    </div>
  );
}

interface JsonDisclosureProps {
  label: string;
  hint: string;
  open: boolean;
  onToggle: () => void;
  data: Record<string, unknown> | null;
  emptyMessage: string;
}

function JsonDisclosure({
  label,
  hint,
  open,
  onToggle,
  data,
  emptyMessage,
}: JsonDisclosureProps) {
  const isEmpty = !data;
  return (
    <div className="admin-disclosure">
      <button
        type="button"
        className="admin-disclosure-head"
        onClick={onToggle}
        aria-expanded={open}
      >
        <span className="admin-disclosure-caret" aria-hidden="true">
          {open ? "▾" : "▸"}
        </span>
        <span className="admin-disclosure-label">{label}</span>
        {isEmpty ? (
          <span className="admin-disclosure-empty">{emptyMessage}</span>
        ) : null}
      </button>
      {open ? (
        <div className="admin-disclosure-body">
          <p className="admin-disclosure-hint">{hint}</p>
          {data ? (
            <pre className="admin-json-block">{JSON.stringify(data, null, 2)}</pre>
          ) : (
            <p className="admin-disclosure-empty-body">{emptyMessage}</p>
          )}
        </div>
      ) : null}
    </div>
  );
}

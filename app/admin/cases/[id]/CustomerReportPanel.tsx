"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import TipTapEditor from "../../../../components/admin/TipTapEditor";
import EvidencePackView from "./EvidencePackView";
import type { CaseResearchDetail } from "../../../../lib/admin/case-research";

interface MergeSummaryShape {
  conflicts?: Array<{
    field: string;
    shallow_value: string;
    deep_value: string;
    resolution: string;
    rationale: string;
    is_critical: boolean;
  }>;
  section_confidence?: Array<{
    section: string;
    level: "low" | "medium" | "high";
    rationale: string;
  }>;
  overall_confidence?: "low" | "medium" | "high";
  critical_conflict_detected?: boolean;
  critical_conflict_notes?: string;
  provenance?: Record<string, string>;
}

interface Props {
  caseId: string;
  detail: CaseResearchDetail;
}

export default function CustomerReportPanel({ caseId, detail }: Props) {
  const router = useRouter();
  const status = detail.customerReportStatus;
  const summary = (detail.mergeSummary ?? {}) as MergeSummaryShape;
  const confidence = detail.overallConfidence;
  const initialHtml = detail.customerReportHtml ?? "";

  const [editing, setEditing] = useState(false);
  const [pendingHtml, setPendingHtml] = useState<string>(initialHtml);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lastSavedRef = useRef<string>(initialHtml);

  if (status === "pending" || !status) {
    return (
      <div className="ev-section">
        <h4 className="ev-section-title">Customer report</h4>
        <p style={{ color: "var(--muted)" }}>
          Pending. The customer report is generated automatically once both shallow research
          and deep research finish for this case. If deep research is still polling, the
          report will be drafted as soon as it completes.
        </p>
        <button
          type="button"
          className="btn btn-cream btn-sm"
          onClick={async () => {
            if (regenerating) return;
            setRegenerating(true);
            setError(null);
            try {
              const res = await fetch(
                `/api/admin/case-research/${caseId}/customer-report/regenerate`,
                { method: "POST" },
              );
              if (!res.ok) {
                const body = await res.json().catch(() => ({}));
                throw new Error(body.error || "Could not enqueue");
              }
              router.refresh();
            } catch (e) {
              setError(e instanceof Error ? e.message : String(e));
            } finally {
              setRegenerating(false);
            }
          }}
          disabled={regenerating}
          style={{ marginTop: 8 }}
        >
          {regenerating ? "Enqueueing…" : "Force generate now"}
        </button>
        {error ? (
          <p style={{ color: "var(--accent)", marginTop: 8, fontSize: 13 }}>{error}</p>
        ) : null}
      </div>
    );
  }

  async function saveDraft() {
    if (saving) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/admin/case-research/${caseId}/customer-report/save`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ html: pendingHtml }),
        },
      );
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Save failed");
      }
      lastSavedRef.current = pendingHtml;
      setEditing(false);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setSaving(false);
    }
  }

  async function publish() {
    if (publishing) return;
    if (
      !confirm(
        status === "published"
          ? "Re-publish? The new HTML will replace what the customer currently sees."
          : "Publish this report? Customers will be able to see this version.",
      )
    )
      return;
    setPublishing(true);
    setError(null);
    try {
      // Save first if there are unsaved edits
      if (pendingHtml !== lastSavedRef.current) {
        await fetch(
          `/api/admin/case-research/${caseId}/customer-report/save`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ html: pendingHtml }),
          },
        );
        lastSavedRef.current = pendingHtml;
      }
      const res = await fetch(
        `/api/admin/case-research/${caseId}/customer-report/publish`,
        { method: "POST" },
      );
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Publish failed");
      }
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setPublishing(false);
    }
  }

  async function regenerate() {
    if (regenerating) return;
    if (
      !confirm(
        "Regenerate from research? This overwrites the working draft. The published copy is unaffected.",
      )
    )
      return;
    setRegenerating(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/admin/case-research/${caseId}/customer-report/regenerate`,
        { method: "POST" },
      );
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Regenerate failed");
      }
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setRegenerating(false);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Header: status, confidence, actions */}
      <div className="ev-section">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <span
              className={`admin-pill admin-pill-${
                status === "published" ? "good" : status === "draft" ? "active" : "neutral"
              }`}
            >
              {status}
            </span>
            {confidence ? (
              <ConfidencePill
                level={confidence}
                breakdown={summary.section_confidence ?? []}
              />
            ) : null}
            {detail.criticalConflictDetected ? (
              <span
                className="admin-pill admin-pill-warn"
                title={summary.critical_conflict_notes ?? ""}
              >
                ⚠ critical conflict
              </span>
            ) : null}
            {detail.customerReportPublishedAt ? (
              <span style={{ fontSize: 12, color: "var(--muted)" }}>
                last published {new Date(detail.customerReportPublishedAt).toLocaleString()}
              </span>
            ) : null}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {!editing ? (
              <button
                type="button"
                className="btn btn-cream btn-sm"
                onClick={() => setEditing(true)}
              >
                Edit
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className="btn btn-cream btn-sm"
                  onClick={() => {
                    setPendingHtml(lastSavedRef.current);
                    setEditing(false);
                  }}
                  disabled={saving || publishing}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-cream btn-sm"
                  onClick={saveDraft}
                  disabled={saving || publishing || pendingHtml === lastSavedRef.current}
                >
                  {saving ? "Saving…" : "Save draft"}
                </button>
              </>
            )}
            <button
              type="button"
              className="btn btn-dark btn-sm"
              onClick={publish}
              disabled={publishing || saving || regenerating}
            >
              {publishing ? "Publishing…" : status === "published" ? "Re-publish" : "Publish"}
            </button>
            <button
              type="button"
              className="btn btn-cream btn-sm"
              onClick={regenerate}
              disabled={regenerating || saving || publishing}
              title="Re-run merge + writer from current research"
            >
              {regenerating ? "Regenerating…" : "Regenerate"}
            </button>
            <a
              href={`/api/admin/case-research/${caseId}/customer-report/pdf${
                status === "published" ? "" : "?source=draft"
              }`}
              className="btn btn-cream btn-sm"
              title={
                status === "published"
                  ? "Download the published version as PDF"
                  : "Download the draft as PDF"
              }
            >
              Download PDF
            </a>
          </div>
        </div>
        {error ? (
          <p style={{ color: "var(--accent)", marginTop: 10, fontSize: 13 }}>{error}</p>
        ) : null}
      </div>

      {/* Critical conflict banner */}
      {detail.criticalConflictDetected && summary.critical_conflict_notes ? (
        <div
          style={{
            background: "rgba(217, 64, 46, 0.08)",
            border: "1px solid rgba(217, 64, 46, 0.25)",
            color: "var(--accent-2)",
            borderRadius: 10,
            padding: "12px 16px",
            fontSize: 13,
            lineHeight: 1.5,
          }}
        >
          <strong style={{ display: "block", marginBottom: 4 }}>
            Critical conflict between shallow and deep research
          </strong>
          {summary.critical_conflict_notes}
        </div>
      ) : null}

      {/* Conflicts list (collapsible) */}
      {summary.conflicts && summary.conflicts.length > 0 ? (
        <details className="ev-section">
          <summary
            style={{
              cursor: "pointer",
              fontSize: 12,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--muted)",
              fontWeight: 600,
            }}
          >
            Merge conflicts ({summary.conflicts.length}) — click to review
          </summary>
          <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }}>
            {summary.conflicts.map((c, i) => (
              <div
                key={i}
                style={{
                  background: c.is_critical
                    ? "rgba(217, 64, 46, 0.05)"
                    : "var(--bg-2)",
                  border: "1px solid var(--hairline)",
                  borderRadius: 8,
                  padding: "8px 12px",
                  fontSize: 13,
                }}
              >
                <div style={{ fontWeight: 600 }}>
                  {c.field}{" "}
                  <span style={{ color: "var(--muted)", fontWeight: 400 }}>
                    — {c.resolution.replace(/_/g, " ")}
                    {c.is_critical ? " · critical" : ""}
                  </span>
                </div>
                <div style={{ color: "var(--muted)", marginTop: 4, fontSize: 12 }}>
                  shallow: <code>{c.shallow_value}</code>
                </div>
                <div style={{ color: "var(--muted)", marginTop: 2, fontSize: 12 }}>
                  deep: <code>{c.deep_value}</code>
                </div>
                <div style={{ marginTop: 4 }}>{c.rationale}</div>
              </div>
            ))}
          </div>
        </details>
      ) : null}

      {/* Merged research pack — the reconciled best-of-shallow+deep that the
          writer uses to produce the prose report. Closed by default. */}
      {detail.mergedPack ? (
        <details className="ev-section">
          <summary
            style={{
              cursor: "pointer",
              fontSize: 12,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--muted)",
              fontWeight: 600,
            }}
          >
            Merged research pack — click to view fields
          </summary>
          <div style={{ marginTop: 12 }}>
            <EvidencePackView
              pack={detail.mergedPack as Parameters<typeof EvidencePackView>[0]["pack"]}
              emptyLabel="(no merged pack yet — regenerate to produce one)"
            />
            <details style={{ marginTop: 10 }}>
              <summary
                style={{ cursor: "pointer", color: "var(--muted)", fontSize: 13 }}
              >
                Raw JSON
              </summary>
              <pre className="admin-pre" style={{ marginTop: 8 }}>
                {JSON.stringify(detail.mergedPack, null, 2)}
              </pre>
            </details>
          </div>
        </details>
      ) : null}

      {/* Editor or view */}
      {editing ? (
        <div className="ev-section">
          <TipTapEditor
            initialJson={null}
            initialHtml={pendingHtml}
            onChange={(d) => setPendingHtml(d.html)}
          />
        </div>
      ) : (
        <div className="ev-section">
          <div
            className="admin-research-content"
            style={{ padding: "20px 28px" }}
            dangerouslySetInnerHTML={{ __html: initialHtml }}
          />
        </div>
      )}
    </div>
  );
}

function ConfidencePill({
  level,
  breakdown,
}: {
  level: "low" | "medium" | "high";
  breakdown: Array<{ section: string; level: string; rationale: string }>;
}) {
  const tone = level === "high" ? "good" : level === "medium" ? "active" : "warn";
  const tip = breakdown.length
    ? breakdown
        .map((b) => `${b.section}: ${b.level} — ${b.rationale}`)
        .join("\n")
    : "No section breakdown available";
  return (
    <span
      className={`admin-pill admin-pill-${tone}`}
      title={tip}
      style={{ cursor: "help" }}
    >
      confidence: {level}
    </span>
  );
}

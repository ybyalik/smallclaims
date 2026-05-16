"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { marked } from "marked";
import TurndownService from "turndown";
import TipTapEditor from "../../../../components/admin/TipTapEditor";
import type { AdminDemandLetter } from "../../../../lib/admin/demand-letter";

interface CaseClassification {
  primary_claim_type: string | null;
  secondary_claim_types: string[];
  classified_at: string | null;
  model: string | null;
  reasoning: string | null;
}

interface Props {
  caseId: string;
  letter: AdminDemandLetter | null;
  // Classification result the demand-letter generator uses to match
  // statutes and multipliers. null = hasn't been classified yet (will run
  // automatically the first time someone generates the letter).
  caseClassification: CaseClassification | null;
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

export default function DemandLetterPanel({
  caseId,
  letter,
  caseClassification,
}: Props) {
  const router = useRouter();
  const serverBody = letter?.body_md ?? "";

  // `editBody` is the user's working copy when Edit mode is active.
  // When NOT editing, we always render the server's latest body so a
  // router.refresh() (e.g., after Regenerate) shows the new content
  // immediately without a hard reload.
  const [editBody, setEditBody] = useState<string>(serverBody);
  const [editing, setEditing] = useState<boolean>(false);
  const [saving, setSaving] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [mailing, setMailing] = useState(false);
  const [markingReady, setMarkingReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  // Bridge: TipTap reads/writes HTML, our database stores markdown. We
  // convert in both directions when entering and saving the editor so the
  // PDF pipeline (which reads body_md) is unaffected.
  const turndown = useMemo(() => {
    const td = new TurndownService({
      headingStyle: "atx",
      bulletListMarker: "-",
      codeBlockStyle: "fenced",
      emDelimiter: "*",
    });
    // Preserve our PDF page-break marker as a literal comment so it survives
    // edits and the PDF renderer still finds it.
    td.addRule("preservePageBreakComment", {
      filter: (node) =>
        node.nodeType === 8 &&
        (node.nodeValue ?? "").trim() === "PAGEBREAK",
      replacement: () => "\n\n<!-- PAGEBREAK -->\n\n",
    });
    return td;
  }, []);
  // The "initial" HTML the TipTap editor mounts with. Computed once per
  // edit session so retyping doesn't keep snapping content back.
  const [editorMountKey, setEditorMountKey] = useState(0);
  const initialHtmlForEditor = useMemo(() => {
    if (!editing) return "";
    return marked.parse(editBody, { async: false, breaks: true }) as string;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing, editorMountKey]);

  async function markReadyForReview() {
    if (markingReady) return;
    if (
      !confirm(
        "Mark this letter as ready for the customer to review again? Sends them an email + in-app notification. Use this after you've addressed their change request (regenerate / edit body / both).",
      )
    ) {
      return;
    }
    setMarkingReady(true);
    setError(null);
    setInfo(null);
    try {
      const res = await fetch(
        `/api/admin/cases/${caseId}/demand-letter/ready-for-review`,
        { method: "POST" },
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Mark-ready failed");
      setInfo("Customer notified. Letter is back in pending review.");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Mark-ready failed");
    } finally {
      setMarkingReady(false);
    }
  }

  const displayBody = editing ? editBody : serverBody;
  // `breaks: true` turns single newlines into <br> so multi-line blocks
  // (address, signature) render as the LLM intended without needing it
  // to add trailing-two-space markdown markers.
  const previewHtml = displayBody
    ? (marked.parse(displayBody, { async: false, breaks: true }) as string)
    : "";

  async function regenerate() {
    if (regenerating) return;
    if (
      !confirm(
        "Regenerate the demand letter? This deletes the current letter row and runs the LLM with the latest code + prompts. Takes about 10-30 seconds.",
      )
    ) {
      return;
    }
    setRegenerating(true);
    setError(null);
    setInfo(null);
    try {
      const res = await fetch(`/api/admin/cases/${caseId}/demand-letter/regenerate`, {
        method: "POST",
      });
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

  async function mailViaPostgrid() {
    if (mailing) return;
    if (
      !confirm(
        "Submit this case's letter to PostGrid for certified mail? Uses the current PostGrid API key in env (test key = sandbox, live key = real mail). Idempotent — if a letter id is already stored, this is a no-op.",
      )
    ) {
      return;
    }
    setMailing(true);
    setError(null);
    setInfo(null);
    try {
      const res = await fetch(`/api/admin/cases/${caseId}/demand-letter/mail`, {
        method: "POST",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
      if (data.ok) {
        setInfo(
          `Submitted to PostGrid. letter_id=${data.letterId ?? "(stored)"} tracking=${data.trackingNumber ?? "pending"}.`,
        );
        router.refresh();
      } else {
        setError(`PostGrid skipped: ${data.reason ?? "unknown"}`);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Mail failed");
    } finally {
      setMailing(false);
    }
  }

  async function saveEdits() {
    if (saving || !editBody.trim()) return;
    setSaving(true);
    setError(null);
    setInfo(null);
    try {
      const res = await fetch(`/api/admin/cases/${caseId}/demand-letter/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body_md: editBody }),
      });
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

  if (!letter) {
    return (
      <div className="ev-section">
        <h4 className="ev-section-title">Demand letter</h4>
        <p style={{ color: "var(--muted)" }}>
          No demand letter has been generated for this case yet. Letters are
          lazily generated when the user first opens <code>/case/[id]/letter</code>{" "}
          (which requires they&rsquo;ve paid for the demand-letter product),
          or you can generate one here.
        </p>
        <div style={{ marginTop: 10 }}>
          <button
            type="button"
            className="btn btn-dark"
            onClick={regenerate}
            disabled={regenerating}
          >
            {regenerating ? "Generating…" : "Generate now"}
          </button>
        </div>
        {error ? <p style={{ color: "var(--accent)", marginTop: 10 }}>{error}</p> : null}
      </div>
    );
  }

  return (
    <div className="ev-section">
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <h4 className="ev-section-title" style={{ margin: 0 }}>
          Demand letter
        </h4>
        <div style={{ fontSize: 12, color: "var(--muted)" }}>
          v{letter.version} · {letter.template_key || "—"} · generated by{" "}
          {letter.generated_by || "—"} · {fmtDate(letter.updated_at || letter.created_at)}
        </div>
      </div>

      {/* Claim classification — surfaces the label the generator uses to
          match state statutes/multipliers. If this is blank or wrong, the
          letter won't pick up the right multipliers. */}
      <div
        style={{
          marginTop: 10,
          padding: "10px 14px",
          background: "#faf9f6",
          border: "1px solid #ebe9e3",
          borderRadius: 8,
          fontSize: 13,
          lineHeight: 1.5,
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: "var(--muted)",
            marginBottom: 4,
          }}
        >
          Claim classification
        </div>
        {caseClassification?.primary_claim_type ? (
          <>
            <div>
              <strong>Primary:</strong>{" "}
              <code>{caseClassification.primary_claim_type}</code>
              {caseClassification.secondary_claim_types.length > 0 ? (
                <>
                  {" "}· <strong>Also:</strong>{" "}
                  <code>
                    {caseClassification.secondary_claim_types.join(", ")}
                  </code>
                </>
              ) : null}
            </div>
            {caseClassification.classified_at || caseClassification.model ? (
              <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>
                {caseClassification.classified_at
                  ? `Classified ${fmtDate(caseClassification.classified_at)}`
                  : ""}
                {caseClassification.classified_at && caseClassification.model
                  ? " · "
                  : ""}
                {caseClassification.model
                  ? `model: ${caseClassification.model}`
                  : ""}
              </div>
            ) : null}
            {caseClassification.reasoning ? (
              <details style={{ marginTop: 6 }}>
                <summary
                  style={{
                    cursor: "pointer",
                    color: "var(--muted)",
                    fontSize: 12,
                  }}
                >
                  Reasoning
                </summary>
                <div
                  style={{
                    marginTop: 4,
                    fontSize: 12.5,
                    color: "var(--ink-2)",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {caseClassification.reasoning}
                </div>
              </details>
            ) : null}
            <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>
              The demand-letter generator uses this label to match the
              right state statutes and multipliers.
            </div>
          </>
        ) : (
          <div style={{ color: "var(--muted)" }}>
            Not classified yet. The generator runs a one-shot claim-type
            classification the first time the letter is generated. Clicking
            Regenerate below will trigger it.
          </div>
        )}
      </div>

      {/* Approval state pill + (when applicable) the customer's change
          request verbatim. Sits up top so the admin sees it before the
          letter body and knows whether intervention is needed. */}
      {(() => {
        const status = letter.approval_status ?? "pending";
        const pill = {
          pending: { label: "Awaiting customer review", tone: "neutral" },
          approved: { label: "Approved by customer", tone: "good" },
          changes_requested: { label: "Customer requested changes", tone: "warn" },
        }[status] ?? { label: status, tone: "neutral" };
        const colors: Record<string, { bg: string; color: string; border: string }> = {
          neutral: { bg: "#f3f1ec", color: "#6a675e", border: "#e0ddd6" },
          good: { bg: "#e7f1ec", color: "#1f6e3a", border: "#c7e5d4" },
          warn: { bg: "#fff4e6", color: "#9a4b00", border: "#f0d99a" },
        };
        const c = colors[pill.tone] ?? colors.neutral;
        return (
          <div style={{ marginTop: 10 }}>
            <span
              style={{
                display: "inline-block",
                padding: "4px 10px",
                borderRadius: 999,
                fontSize: 11.5,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                background: c.bg,
                color: c.color,
                border: `1px solid ${c.border}`,
              }}
            >
              {pill.label}
            </span>
            {status === "changes_requested" && letter.changes_text ? (
              <div
                style={{
                  marginTop: 10,
                  padding: "10px 14px",
                  background: "#fffaf0",
                  border: "1px solid #f0d99a",
                  borderRadius: 8,
                  fontSize: 13.5,
                  lineHeight: 1.5,
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "#9a4b00",
                    marginBottom: 4,
                  }}
                >
                  Customer&rsquo;s change request
                  {letter.changes_requested_at
                    ? ` · ${fmtDate(letter.changes_requested_at)}`
                    : ""}
                </div>
                <div style={{ whiteSpace: "pre-wrap", color: "#4f4c46" }}>
                  {letter.changes_text}
                </div>
                <div style={{ marginTop: 10 }}>
                  <button
                    type="button"
                    className="btn btn-dark btn-sm"
                    onClick={markReadyForReview}
                    disabled={markingReady || regenerating}
                  >
                    {markingReady
                      ? "Notifying customer…"
                      : "Mark ready for customer review"}
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        );
      })()}

      <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
        {!editing ? (
          <>
            <a
              href={`/api/demand-letter/${caseId}/pdf`}
              className="btn btn-cream btn-sm"
              title="Download the current letter as PDF"
            >
              Download PDF
            </a>
            <button
              type="button"
              className="btn btn-cream btn-sm"
              onClick={() => {
                setEditBody(letter.body_md);
                setEditing(true);
                setEditorMountKey((k) => k + 1);
                setError(null);
                setInfo(null);
              }}
              disabled={regenerating || mailing}
            >
              Edit
            </button>
            <button
              type="button"
              className="btn btn-cream btn-sm"
              onClick={regenerate}
              disabled={regenerating || mailing}
            >
              {regenerating ? "Regenerating…" : "Regenerate"}
            </button>
            <button
              type="button"
              className="btn btn-cream btn-sm"
              onClick={mailViaPostgrid}
              disabled={regenerating || mailing}
              title="Render the PDF, send to PostGrid as certified mail, save the letter id + tracking on the row."
            >
              {mailing ? "Sending…" : "Mail via PostGrid"}
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className="btn btn-dark btn-sm"
              onClick={saveEdits}
              disabled={saving || !editBody.trim() || editBody === letter.body_md}
            >
              {saving ? "Saving…" : "Save edits"}
            </button>
            <button
              type="button"
              className="btn btn-cream btn-sm"
              onClick={() => {
                setEditBody(letter.body_md);
                setEditing(false);
                setError(null);
                setInfo(null);
              }}
              disabled={saving}
            >
              Cancel
            </button>
          </>
        )}
      </div>

      {error ? (
        <p style={{ color: "var(--accent)", marginTop: 10, fontSize: 13 }}>{error}</p>
      ) : null}
      {info ? (
        <p style={{ color: "#2f6a47", marginTop: 10, fontSize: 13 }}>{info}</p>
      ) : null}

      {editing ? (
        <div style={{ marginTop: 14 }}>
          <TipTapEditor
            key={editorMountKey}
            initialJson={null}
            initialHtml={initialHtmlForEditor}
            onChange={({ html }) => {
              // Round-trip HTML -> markdown so what we save matches what
              // the PDF renderer expects. Turndown handles most cases; we
              // also fix up a couple of TipTap-isms it doesn't.
              let md = turndown.turndown(html);
              // TipTap emits empty <p></p> as a single blank line; collapse
              // runs of blank lines to a single paragraph break.
              md = md.replace(/\n{3,}/g, "\n\n").trim();
              setEditBody(md);
            }}
          />
        </div>
      ) : (
        <div
          className="admin-letter-preview"
          style={{
            marginTop: 14,
            padding: "22px 26px",
            border: "1px solid #ebe9e3",
            borderRadius: 10,
            background: "#fff",
            fontFamily: '"Newsreader", Georgia, serif',
            fontSize: 14.5,
            lineHeight: 1.6,
            color: "var(--ink, #111)",
          }}
          dangerouslySetInnerHTML={{ __html: previewHtml }}
        />
      )}
    </div>
  );
}

"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { EvidenceFileMeta } from "./page";
import { useAutosave } from "../useAutosave";

interface Props {
  caseId: string;
  categoryLabel: string;
  initialFiles: EvidenceFileMeta[];
}

const ACCEPT = ".pdf,.png,.jpg,.jpeg,.heic,.mp4,.docx,.txt,.eml";
const MAX_BYTES = 25 * 1024 * 1024;

const KIND_GUESSES: Array<{ pattern: RegExp; kind: string }> = [
  { pattern: /receipt|invoice|bill/i, kind: "Receipt or invoice" },
  { pattern: /contract|agreement|lease/i, kind: "Contract or agreement" },
  { pattern: /text|sms|message|chat/i, kind: "Text or message" },
  { pattern: /email|gmail|outlook|\.eml/i, kind: "Email" },
  { pattern: /photo|image|img|\.png|\.jpg|\.jpeg|\.heic/i, kind: "Photo" },
  { pattern: /\.mp4|video/i, kind: "Video" },
];

function guessKind(filename: string): string {
  for (const g of KIND_GUESSES) if (g.pattern.test(filename)) return g.kind;
  return "Document";
}

export default function EvidenceStep({
  caseId,
  categoryLabel,
  initialFiles,
}: Props) {
  const router = useRouter();
  const [files, setFiles] = useState<EvidenceFileMeta[]>(initialFiles);
  const [dragging, setDragging] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Autosave: persists evidence file list (and per-file kind/description
   // edits) as the user adds, removes, or annotates files.
  useAutosave(caseId, {
    intake_answers: {
      evidence_files: files,
      evidence_skipped: files.length === 0,
    },
  });

  function ingest(list: FileList | File[]) {
    const next: EvidenceFileMeta[] = [];
    const errs: string[] = [];
    for (const f of Array.from(list)) {
      if (f.size > MAX_BYTES) {
        errs.push(`${f.name} is over the 25 MB limit.`);
        continue;
      }
      next.push({
        filename: f.name,
        size: f.size,
        mime: f.type || "application/octet-stream",
        kind: guessKind(f.name),
        uploadedAt: new Date().toISOString(),
      });
    }
    if (errs.length) setError(errs.join(" "));
    if (next.length) setFiles((cur) => [...cur, ...next]);
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer?.files) ingest(e.dataTransfer.files);
  }

  function removeAt(i: number) {
    setFiles((cur) => cur.filter((_, j) => j !== i));
  }
  function setKindAt(i: number, kind: string) {
    setFiles((cur) => cur.map((f, j) => (j === i ? { ...f, kind } : f)));
  }
  function setDescriptionAt(i: number, description: string) {
    setFiles((cur) => cur.map((f, j) => (j === i ? { ...f, description } : f)));
  }

  async function continueWith(skip: boolean) {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/demand-letters/${caseId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          intake_answers: {
            evidence_files: skip ? [] : files,
            evidence_skipped: skip || files.length === 0,
          },
        }),
      });
      if (!res.ok) throw new Error("Could not save");
      router.push(`/demand-letter/wizard/${caseId}/review`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save");
      setSaving(false);
    }
  }

  return (
    <div className="dlw-step">
      <div className="dlw-step-eyebrow">
        Phase 4 of 5 · <span style={{ color: "#6b6b6b" }}>(optional)</span>
      </div>
      <h1>Got any documents?</h1>
      <p className="dlw-sub">
        Invoices, contracts, messages, or receipts &mdash; anything that supports your
        claim. Your letter is perfectly valid without them.
      </p>

      {/* UPLOAD ZONE */}
      <div
        className={`dlw-upload${dragging ? " is-dragging" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
      >
        <div className="dlw-upload-arrow">⬆</div>
        <div style={{ fontSize: 16, fontWeight: 600 }}>Tap or drop files to upload</div>
        <div className="dlw-upload-sub">
          Photos, videos, receipts, contracts, messages — up to 25 MB per file
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT}
          multiple
          onChange={(e) => e.target.files && ingest(e.target.files)}
          style={{ display: "none" }}
        />
      </div>

      {/* FILE LIST */}
      {files.length > 0 ? (
        <div className="dlw-files">
          {files.map((f, i) => (
            <div key={i} className="dlw-file-card">
              <div className="dlw-file-card-head">
                <div className="dlw-file-card-name">
                  <strong>{f.filename}</strong>
                  <span className="dlw-file-meta">{(f.size / 1024).toFixed(0)} KB</span>
                </div>
                <button
                  type="button"
                  className="dlw-link-btn"
                  onClick={() => removeAt(i)}
                  aria-label={`Remove ${f.filename}`}
                >
                  Remove
                </button>
              </div>
              <div className="dlw-file-card-fields">
                <label className="dlw-file-field">
                  <span className="dlw-file-field-label">Type</span>
                  <input
                    value={f.kind}
                    onChange={(e) => setKindAt(i, e.target.value)}
                    className="dlw-input"
                    placeholder="Receipt, contract, photo…"
                  />
                </label>
                <label className="dlw-file-field dlw-file-field-wide">
                  <span className="dlw-file-field-label">
                    Description <span style={{ color: "#9a978f", fontWeight: 400 }}>(optional)</span>
                  </span>
                  <input
                    value={f.description || ""}
                    onChange={(e) => setDescriptionAt(i, e.target.value)}
                    className="dlw-input"
                    placeholder='e.g., "Mar 12 invoice for $1,200 — never paid"'
                  />
                </label>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {/* OPTIONAL SUGGESTION LIST */}
      <div className="dlw-suggest">
        <div style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700, color: "#8b8779" }}>
          We often see these in {categoryLabel.toLowerCase()} cases
        </div>
        <ul>
          <li>Purchase receipt or invoice</li>
          <li>Contract or signed agreement</li>
          <li>Communication records (texts, emails)</li>
          <li>Photos or video documentation</li>
        </ul>
        <p style={{ fontSize: 12, color: "#8b8779", margin: "8px 0 0" }}>
          These are suggestions, not requirements. You can always add documents later.
        </p>
      </div>

      <div className="dlw-actions">
        <Link
          href={`/demand-letter/wizard/${caseId}/claim-amount`}
          className="dlw-actions-back"
        >
          ← Back
        </Link>
        <button
          className="dlw-cta"
          onClick={() => continueWith(false)}
          disabled={saving}
        >
          {saving ? "Saving…" : files.length ? "Continue ▶" : "Continue without documents ▶"}
        </button>
      </div>

      {error ? <p style={{ color: "var(--accent)", marginTop: 12 }}>{error}</p> : null}

      <p style={{ fontSize: 12, color: "#8b8779", textAlign: "center", marginTop: 16 }}>
        Files listed here are tracked with your case but stored as metadata only in this
        build. Full file upload to Supabase Storage is a one-line swap when the bucket is
        configured.
      </p>
    </div>
  );
}

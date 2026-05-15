"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { EvidenceFileMeta } from "./page";
import {
  useFormErrors,
  ErrorSummary,
} from "../../../../../../components/wizard/form-errors";
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

// Per-file upload state held outside the persisted EvidenceFileMeta — we
// only persist what the server eventually saves. Object URL is used as the
// immediate local preview while the S3 upload is in-flight (and even after,
// for instant preview without round-tripping a signed GET URL).
interface LocalState {
  status: "uploading" | "done" | "failed";
  localObjectUrl?: string;
  error?: string;
}

export default function EvidenceStep({
  caseId,
  categoryLabel,
  initialFiles,
}: Props) {
  const router = useRouter();
  const [files, setFiles] = useState<EvidenceFileMeta[]>(initialFiles);
  // Keyed by file's filename+size+uploadedAt — stable enough for in-session
  // identification. Not persisted.
  const [localStates, setLocalStates] = useState<Record<string, LocalState>>({});
  const [dragging, setDragging] = useState(false);
  const [saving, setSaving] = useState(false);
  const { errors, setErrors, clear } = useFormErrors();
  const [confirmed, setConfirmed] = useState(false);

  function setError(msg: string | null) {
    if (msg === null) clear();
    else setErrors({ _error: msg });
  }
  const inputRef = useRef<HTMLInputElement>(null);

  function localKey(f: EvidenceFileMeta): string {
    return `${f.filename}::${f.size}::${f.uploadedAt}`;
  }

  const anyUploading = Object.values(localStates).some((s) => s.status === "uploading");
  function setLocal(key: string, patch: Partial<LocalState>) {
    setLocalStates((cur) => ({ ...cur, [key]: { ...(cur[key] ?? { status: "done" }), ...patch } }));
  }
  function clearLocal(key: string) {
    setLocalStates((cur) => {
      const next = { ...cur };
      const url = next[key]?.localObjectUrl;
      if (url) URL.revokeObjectURL(url);
      delete next[key];
      return next;
    });
  }

  async function uploadOne(file: File, meta: EvidenceFileMeta) {
    const key = localKey(meta);
    const objectUrl = URL.createObjectURL(file);
    setLocal(key, { status: "uploading", localObjectUrl: objectUrl });
    try {
      // 1. Ask the server for a presigned PUT URL.
      const presignRes = await fetch(`/api/cases/${caseId}/evidence/presign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: file.name, mime: file.type || "application/octet-stream", size: file.size }),
      });
      if (!presignRes.ok) {
        const body = await presignRes.json().catch(() => ({}));
        throw new Error(body.error || "Could not get upload URL");
      }
      const { url, key: s3Key, headers } = (await presignRes.json()) as {
        url: string;
        key: string;
        headers: Record<string, string>;
      };

      // 2. Upload bytes directly to S3.
      const putRes = await fetch(url, { method: "PUT", headers, body: file });
      if (!putRes.ok) throw new Error(`S3 upload failed (${putRes.status})`);

      // 3. Update the persisted metadata with the resulting key.
      setFiles((cur) =>
        cur.map((m) => (localKey(m) === key ? { ...m, s3Key } : m)),
      );
      setLocal(key, { status: "done" });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Upload failed";
      setLocal(key, { status: "failed", error: msg });
    }
  }

  // Autosave: persists evidence file list (and per-file kind/description
   // edits) as the user adds, removes, or annotates files.
  useAutosave(caseId, {
    intake_answers: {
      evidence_files: files,
      evidence_skipped: files.length === 0,
    },
  });

  function ingest(list: FileList | File[]) {
    const accepted: { file: File; meta: EvidenceFileMeta }[] = [];
    const errs: string[] = [];
    for (const f of Array.from(list)) {
      if (f.size > MAX_BYTES) {
        errs.push(`${f.name} is over the 25 MB limit.`);
        continue;
      }
      const meta: EvidenceFileMeta = {
        filename: f.name,
        size: f.size,
        mime: f.type || "application/octet-stream",
        kind: guessKind(f.name),
        uploadedAt: new Date().toISOString(),
      };
      accepted.push({ file: f, meta });
    }
    if (errs.length) setError(errs.join(" "));
    if (accepted.length) {
      setFiles((cur) => [...cur, ...accepted.map((a) => a.meta)]);
      // Kick off uploads in parallel; each is self-contained.
      for (const { file, meta } of accepted) {
        void uploadOne(file, meta);
      }
    }
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer?.files) ingest(e.dataTransfer.files);
  }

  async function removeAt(i: number) {
    const target = files[i];
    if (!target) return;
    clearLocal(localKey(target));
    setFiles((cur) => cur.filter((_, j) => j !== i));
    // Best-effort cleanup. Failure here is non-fatal — the metadata is gone
    // and the orphan S3 object can be reaped by a lifecycle rule later.
    if (target.s3Key) {
      try {
        await fetch(
          `/api/cases/${caseId}/evidence/object?key=${encodeURIComponent(target.s3Key)}`,
          { method: "DELETE" },
        );
      } catch {
        // ignore
      }
    }
  }

  async function viewFile(f: EvidenceFileMeta) {
    if (!f.s3Key) return;
    try {
      const res = await fetch(
        `/api/cases/${caseId}/evidence/url?key=${encodeURIComponent(f.s3Key)}`,
      );
      if (!res.ok) throw new Error("Could not get URL");
      const { url } = (await res.json()) as { url: string };
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not open file");
    }
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
      router.push(`/case/${caseId}/build/review`);
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

      {/* LANGUAGE NOTICE */}
      <div
        role="note"
        style={{
          display: "flex",
          gap: 12,
          alignItems: "flex-start",
          background: "#fff8e8",
          border: "1px solid #f0d99b",
          borderLeft: "3px solid #c89414",
          borderRadius: 10,
          padding: "12px 16px",
          margin: "0 0 18px",
          fontSize: 14,
          lineHeight: 1.5,
          color: "var(--ink-2, #3a342e)",
        }}
      >
        <span style={{ fontSize: 18, lineHeight: 1, marginTop: 2 }} aria-hidden>
          ⚠
        </span>
        <span>
          <strong>Documents must be in English.</strong> If the original is in another
          language, please upload an English translation alongside the original. Courts
          will not accept untranslated foreign-language documents.
        </span>
      </div>

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
          {files.map((f, i) => {
            const isImage = f.mime.startsWith("image/");
            const local = localStates[localKey(f)];
            const previewUrl = local?.localObjectUrl;
            const uploading = local?.status === "uploading";
            const failed = local?.status === "failed";
            const canView = !!f.s3Key;
            return (
              <div key={i} className="dlw-file-card">
                <div
                  style={{
                    display: "flex",
                    gap: 12,
                    alignItems: "flex-start",
                  }}
                >
                  {/* THUMBNAIL */}
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 8,
                      background: "#f6f4ee",
                      border: "1px solid var(--hairline, #e8e5de)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      flexShrink: 0,
                      position: "relative",
                    }}
                  >
                    {isImage && previewUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={previewUrl}
                        alt=""
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      <span style={{ fontSize: 22, color: "#8b8779" }} aria-hidden>
                        {isImage ? "🖼" : f.mime === "application/pdf" ? "📄" : "📎"}
                      </span>
                    )}
                    {uploading ? (
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "rgba(255,255,255,0.7)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 10,
                          fontWeight: 700,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "#5a574e",
                        }}
                      >
                        Uploading…
                      </div>
                    ) : null}
                  </div>

                  {/* MAIN CONTENT */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="dlw-file-card-head" style={{ marginBottom: 8 }}>
                      <div className="dlw-file-card-name" style={{ minWidth: 0 }}>
                        <strong
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            display: "block",
                          }}
                        >
                          {f.filename}
                        </strong>
                        <span className="dlw-file-meta">
                          {(f.size / 1024).toFixed(0)} KB
                          {failed ? (
                            <>
                              {" · "}
                              <span style={{ color: "var(--accent, #d9402e)" }}>
                                Upload failed: {local?.error}
                              </span>
                            </>
                          ) : null}
                        </span>
                      </div>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        {canView ? (
                          <button
                            type="button"
                            className="dlw-link-btn"
                            onClick={() => viewFile(f)}
                          >
                            View
                          </button>
                        ) : null}
                        <button
                          type="button"
                          className="dlw-link-btn"
                          onClick={() => removeAt(i)}
                          aria-label={`Remove ${f.filename}`}
                        >
                          Remove
                        </button>
                      </div>
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
                          Description{" "}
                          <span style={{ color: "#9a978f", fontWeight: 400 }}>
                            (optional)
                          </span>
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
                </div>
              </div>
            );
          })}
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

      {/* CONFIRMATION — only required if the user uploaded documents */}
      {files.length > 0 ? (
        <label
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
            padding: "14px 16px",
            background: "#fff",
            border: "1px solid var(--hairline, #e8e5de)",
            borderRadius: 10,
            margin: "20px 0 0",
            fontSize: 14,
            lineHeight: 1.5,
            cursor: "pointer",
          }}
        >
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            style={{ marginTop: 3, flexShrink: 0 }}
          />
          <span>
            I confirm that the documents above are related to this case, and that each
            document&rsquo;s description accurately reflects what it shows.
          </span>
        </label>
      ) : null}

      <div className="dlw-actions">
        <Link
          href={`/case/${caseId}/build/claim-amount`}
          className="dlw-actions-back"
        >
          ← Back
        </Link>
        <button
          className="dlw-cta"
          onClick={() => continueWith(false)}
          disabled={
            saving ||
            (files.length > 0 && !confirmed) ||
            anyUploading
          }
          title={
            anyUploading
              ? "Wait for uploads to finish"
              : files.length > 0 && !confirmed
                ? "Tick the confirmation above to continue"
                : undefined
          }
        >
          {saving
            ? "Saving…"
            : anyUploading
              ? "Uploading…"
              : files.length
                ? "Continue ▶"
                : "Continue without documents ▶"}
        </button>
      </div>

      <ErrorSummary errors={errors} order={["_error"]} />
    </div>
  );
}

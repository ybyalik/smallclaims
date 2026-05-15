"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PromptTextarea from "../../../components/admin/PromptTextarea";

// Inline copy of StateCallId so this client component does NOT import from
// lib/state-research/prompts. That module pulls in server-only code via a
// dynamic Supabase import, which Next's dev bundler can leak into the
// client bundle when client components reach into it (even type-only).
type StateCallId = 1 | 2 | 3 | 4;

interface Props {
  call: StateCallId;
  title: string;
  effective: string;
  defaultText: string;
  isOverride: boolean;
  overrideUpdatedAt: string | null;
}

export default function PromptEditor({
  call,
  title,
  effective,
  defaultText,
  isOverride,
  overrideUpdatedAt,
}: Props) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(effective);
  const [busy, setBusy] = useState<"save" | "reset" | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const charCount = text.length;
  const hasPlaceholder = text.includes("[STATE NAME]");
  const tooShort = charCount < 200;
  const tooLong = charCount > 50_000;
  const dirty = text !== effective;

  async function save() {
    if (busy || !dirty || !hasPlaceholder || tooShort || tooLong) return;
    setBusy("save");
    setMsg(null);
    setErr(null);
    try {
      const res = await fetch("/api/admin/state-research/prompts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ call, prompt_text: text }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Save failed");
      setMsg(`Saved (${data.chars?.toLocaleString()} chars)`);
      setEditing(false);
      setTimeout(() => router.refresh(), 400);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Save failed");
    } finally {
      setBusy(null);
    }
  }

  async function reset() {
    if (busy) return;
    if (!confirm("Reset this prompt to the code default? Your saved override will be deleted.")) {
      return;
    }
    setBusy("reset");
    setMsg(null);
    setErr(null);
    try {
      const res = await fetch("/api/admin/state-research/prompts", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ call }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Reset failed");
      setMsg("Reset to default");
      setText(defaultText);
      setEditing(false);
      setTimeout(() => router.refresh(), 400);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Reset failed");
    } finally {
      setBusy(null);
    }
  }

  return (
    <details className="admin-prompt-call">
      <summary>
        Call {call} — {title}
        <span className="admin-prompt-call-meta">
          {charCount.toLocaleString()} chars
        </span>
        {isOverride ? (
          <span
            className="admin-pill admin-pill-active admin-prompt-call-pill"
            title={overrideUpdatedAt ? `Saved ${new Date(overrideUpdatedAt).toLocaleString()}` : undefined}
          >
            edited
          </span>
        ) : (
          <span className="admin-pill admin-pill-neutral admin-prompt-call-pill">
            default
          </span>
        )}
      </summary>

      <div className="admin-prompt-actions">
        {!editing ? (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="btn btn-dark btn-sm"
          >
            Edit
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={save}
              disabled={busy !== null || !dirty || !hasPlaceholder || tooShort || tooLong}
              className="btn btn-dark btn-sm"
            >
              {busy === "save" ? "Saving…" : "Save"}
            </button>
            <button
              type="button"
              onClick={() => {
                setEditing(false);
                setText(effective);
                setErr(null);
                setMsg(null);
              }}
              disabled={busy !== null}
              className="btn btn-cream btn-sm"
            >
              Cancel
            </button>
          </>
        )}
        {isOverride ? (
          <button
            type="button"
            onClick={reset}
            disabled={busy !== null}
            className="btn btn-cream btn-sm"
            title="Delete saved override and restore the code default"
          >
            {busy === "reset" ? "Resetting…" : "Reset to default"}
          </button>
        ) : null}
      </div>

      {editing ? (
        <PromptTextarea
          value={text}
          onChange={setText}
          rows={20}
          minChars={200}
          maxChars={50_000}
          requiredPlaceholder="[STATE NAME]"
          status={
            msg ? <span className="admin-prompt-saved">{msg}</span> :
            err ? <span className="admin-prompt-field-warn">{err}</span> :
            null
          }
        />
      ) : (
        <pre className="admin-prompt-preview">{effective}</pre>
      )}

      <p className="admin-prompt-call-hint">
        The literal placeholder <code>[STATE NAME]</code> is replaced with the
        actual state name at submission time.
      </p>
    </details>
  );
}

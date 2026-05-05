"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  slug: string;
  stateName: string;
  initialMarkdown: string;
  isOverride: boolean;
}

export default function ResearchEditor({ slug, stateName, initialMarkdown, isOverride }: Props) {
  const router = useRouter();
  const [markdown, setMarkdown] = useState(initialMarkdown);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function save() {
    if (saving) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/research/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ markdown }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Save failed");
      }
      setSavedAt(new Date().toLocaleTimeString());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function revert() {
    if (!isOverride) return;
    if (!confirm("Revert to the bundled research and discard your edits?")) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/research/${slug}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Revert failed");
      router.push(`/admin/research/${slug}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Revert failed");
      setSaving(false);
    }
  }

  return (
    <div className="admin-page">
      <Link href={`/admin/research/${slug}`} className="admin-back">← Back to {stateName}</Link>
      <header className="admin-page-head">
        <div>
          <h1>Edit {stateName} research</h1>
          <p>
            Markdown. Saves to a Supabase override (the on-disk file is read-only at runtime).
            Public state guides and the admin view both pick up your edits immediately.
          </p>
        </div>
      </header>

      <textarea
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        className="admin-textarea-mono"
        rows={32}
        spellCheck={false}
      />

      <div className="admin-edit-toolbar">
        <div style={{ fontSize: 13, color: "var(--muted)" }}>
          {markdown.length.toLocaleString()} chars · {markdown.split(/\s+/).filter(Boolean).length.toLocaleString()} words
          {savedAt ? <> · saved at {savedAt}</> : null}
          {isOverride ? <> · currently using your override</> : null}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {isOverride ? (
            <button
              type="button"
              onClick={revert}
              disabled={saving}
              className="btn btn-cream btn-sm"
            >
              Revert to bundled
            </button>
          ) : null}
          <button
            type="button"
            onClick={save}
            disabled={saving || markdown === initialMarkdown}
            className="btn btn-dark btn-sm"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>

      {error ? <p style={{ color: "var(--accent)", marginTop: 12 }}>{error}</p> : null}
    </div>
  );
}

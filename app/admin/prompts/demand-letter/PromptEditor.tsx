"use client";

import { useState, useTransition } from "react";
import type { PlaceholderSpec } from "../../../../lib/prompts";
import PromptTextarea from "../../../../components/admin/PromptTextarea";

type Role = "system" | "user_template" | "cover_letter";

interface Props {
  promptKey: string;
  systemBody: string;
  systemSource: "db" | "fallback";
  systemVersion: number | null;
  systemFallback: string;
  userBody: string;
  userSource: "db" | "fallback";
  userVersion: number | null;
  userFallback: string;
  coverBody: string;
  coverSource: "db" | "fallback";
  coverVersion: number | null;
  coverFallback: string;
  placeholders: PlaceholderSpec[];
  coverPlaceholders: PlaceholderSpec[];
}

export default function PromptEditor({
  promptKey,
  systemBody,
  systemSource,
  systemVersion,
  systemFallback,
  userBody,
  userSource,
  userVersion,
  userFallback,
  coverBody,
  coverSource,
  coverVersion,
  coverFallback,
  placeholders,
  coverPlaceholders,
}: Props) {
  const [systemDraft, setSystemDraft] = useState(systemBody);
  const [userDraft, setUserDraft] = useState(userBody);
  const [coverDraft, setCoverDraft] = useState(coverBody);
  const [systemNotes, setSystemNotes] = useState("");
  const [userNotes, setUserNotes] = useState("");
  const [coverNotes, setCoverNotes] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [savedRole, setSavedRole] = useState<Role | null>(null);
  const [isPending, startTransition] = useTransition();

  function save(role: Role) {
    setError(null);
    setSavedRole(null);
    const body =
      role === "system"
        ? systemDraft
        : role === "user_template"
          ? userDraft
          : coverDraft;
    const notes =
      role === "system"
        ? systemNotes
        : role === "user_template"
          ? userNotes
          : coverNotes;
    startTransition(async () => {
      try {
        const res = await fetch("/api/admin/prompts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: promptKey, role, body, notes }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || "Save failed");
        setSavedRole(role);
        if (role === "system") setSystemNotes("");
        else if (role === "user_template") setUserNotes("");
        else setCoverNotes("");
      } catch (e) {
        setError(e instanceof Error ? e.message : "Save failed");
      }
    });
  }

  return (
    <div className="admin-prompt-editor">
      <section className="admin-prompt-panel">
        <header>
          <h2>System Prompt</h2>
          <p className="admin-page-sub">
            Static rules for the LLM. Style, structure, format, what to avoid.{" "}
            <strong>
              Source: {systemSource === "db" ? `database v${systemVersion}` : "in-code fallback"}
            </strong>
          </p>
        </header>
        <PromptTextarea
          value={systemDraft}
          onChange={setSystemDraft}
          rows={18}
        />
        <label className="admin-prompt-notes">
          <span>Change notes (optional)</span>
          <input
            type="text"
            value={systemNotes}
            onChange={(e) => setSystemNotes(e.target.value)}
            placeholder="What you changed and why"
          />
        </label>
        <div className="admin-prompt-actions">
          <button
            type="button"
            className="btn btn-dark"
            onClick={() => save("system")}
            disabled={isPending || systemDraft === systemBody}
          >
            {isPending && savedRole === "system" ? "Saving…" : "Save System Prompt"}
          </button>
          {systemSource === "db" && systemBody !== systemFallback ? (
            <button
              type="button"
              className="btn btn-cream"
              onClick={() => {
                if (
                  confirm(
                    "Your saved version is out of date with the latest code default. Replace editor contents with the latest default? Click Save afterward to commit it.",
                  )
                ) {
                  setSystemDraft(systemFallback);
                }
              }}
              disabled={isPending}
              title="Your saved DB version differs from the latest in-code default. Click to load the latest into the editor."
            >
              Load latest default
            </button>
          ) : null}
          {savedRole === "system" ? (
            <span className="admin-prompt-saved">Saved. Active on next generation.</span>
          ) : null}
        </div>
      </section>

      <section className="admin-prompt-panel">
        <header>
          <h2>User Prompt Template</h2>
          <p className="admin-page-sub">
            The structured case data sent to the LLM. Use placeholders like{" "}
            <code>{"{{plaintiff_name}}"}</code> to insert per-case data at
            generation time.{" "}
            <strong>
              Source: {userSource === "db" ? `database v${userVersion}` : "in-code fallback"}
            </strong>
          </p>
        </header>
        <PromptTextarea
          value={userDraft}
          onChange={setUserDraft}
          rows={20}
        />
        <label className="admin-prompt-notes">
          <span>Change notes (optional)</span>
          <input
            type="text"
            value={userNotes}
            onChange={(e) => setUserNotes(e.target.value)}
            placeholder="What you changed and why"
          />
        </label>
        <div className="admin-prompt-actions">
          <button
            type="button"
            className="btn btn-dark"
            onClick={() => save("user_template")}
            disabled={isPending || userDraft === userBody}
          >
            {isPending && savedRole === "user_template" ? "Saving…" : "Save User Template"}
          </button>
          {userSource === "db" && userBody !== userFallback ? (
            <button
              type="button"
              className="btn btn-cream"
              onClick={() => {
                if (
                  confirm(
                    "Your saved version is out of date with the latest code default. Replace editor contents with the latest default? Click Save afterward to commit it.",
                  )
                ) {
                  setUserDraft(userFallback);
                }
              }}
              disabled={isPending}
              title="Your saved DB version differs from the latest in-code default. Click to load the latest into the editor."
            >
              Load latest default
            </button>
          ) : null}
          {savedRole === "user_template" ? (
            <span className="admin-prompt-saved">Saved. Active on next generation.</span>
          ) : null}
        </div>
      </section>

      <section className="admin-prompt-panel">
        <header>
          <h2>Cover Letter Template</h2>
          <p className="admin-page-sub">
            The cover-page note that ships on top of the demand letter when
            the plaintiff opts into CivilCase letterhead at checkout. Pure
            template, no LLM call. Use{" "}
            <code>{"{{plaintiff_name}}"}</code>,{" "}
            <code>{"{{defendant_name}}"}</code>, etc. for per-case fields,
            and wrap the conditional small-claims line in{" "}
            <code>{"{{#if threat_consent_yes}}…{{/if}}"}</code> so it only
            renders when the plaintiff opted into the threat.{" "}
            <strong>
              Source: {coverSource === "db" ? `database v${coverVersion}` : "in-code fallback"}
            </strong>
          </p>
        </header>
        <PromptTextarea
          value={coverDraft}
          onChange={setCoverDraft}
          rows={18}
        />
        <label className="admin-prompt-notes">
          <span>Change notes (optional)</span>
          <input
            type="text"
            value={coverNotes}
            onChange={(e) => setCoverNotes(e.target.value)}
            placeholder="What you changed and why"
          />
        </label>
        <div className="admin-prompt-actions">
          <button
            type="button"
            className="btn btn-dark"
            onClick={() => save("cover_letter")}
            disabled={isPending || coverDraft === coverBody}
          >
            {isPending && savedRole === "cover_letter" ? "Saving…" : "Save Cover Letter"}
          </button>
          {coverSource === "db" && coverBody !== coverFallback ? (
            <button
              type="button"
              className="btn btn-cream"
              onClick={() => {
                if (
                  confirm(
                    "Your saved version is out of date with the latest code default. Replace editor contents with the latest default? Click Save afterward to commit it.",
                  )
                ) {
                  setCoverDraft(coverFallback);
                }
              }}
              disabled={isPending}
              title="Your saved DB version differs from the latest in-code default. Click to load the latest into the editor."
            >
              Load latest default
            </button>
          ) : null}
          {savedRole === "cover_letter" ? (
            <span className="admin-prompt-saved">Saved. Active on next generation.</span>
          ) : null}
        </div>
      </section>

      {error ? <p className="admin-prompt-error">{error}</p> : null}

      <section className="admin-prompt-panel">
        <header>
          <h2>Available Placeholders</h2>
          <p className="admin-page-sub">
            Use these inside the User Prompt Template. The generator
            substitutes them with actual case data at runtime. Unknown
            placeholders render as empty strings.
          </p>
        </header>
        <table className="admin-prompt-placeholders">
          <thead>
            <tr>
              <th>Placeholder</th>
              <th>What it resolves to</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            {placeholders.map((p) => (
              <tr key={p.key}>
                <td>
                  <code>{`{{${p.key}}}`}</code>
                </td>
                <td>{p.description}</td>
                <td>
                  <code>{p.exampleValue}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="admin-prompt-panel">
        <header>
          <h2>Cover Letter Placeholders</h2>
          <p className="admin-page-sub">
            Smaller surface area than the demand letter — the cover letter
            only needs the headline case facts plus the threat-consent flag.
          </p>
        </header>
        <table className="admin-prompt-placeholders">
          <thead>
            <tr>
              <th>Placeholder</th>
              <th>What it resolves to</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            {coverPlaceholders.map((p) => (
              <tr key={p.key}>
                <td>
                  <code>{`{{${p.key}}}`}</code>
                </td>
                <td>{p.description}</td>
                <td>
                  <code>{p.exampleValue}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

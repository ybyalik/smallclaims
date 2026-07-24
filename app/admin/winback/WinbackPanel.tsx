"use client";

// Admin editor for the winback sequence. One card per step: subject, delay,
// enabled toggle, and the shared TipTap WYSIWYG (visual + HTML modes) for the
// body. Save writes the step to winback_templates; Test sends the current
// editor content to the logged-in admin's inbox with sample data.

import { useState } from "react";
import { useRouter } from "next/navigation";
import TipTapEditor from "../../../components/admin/TipTapEditor";
import type { WinbackTemplate } from "../../../lib/winback/templates";
import type { WinbackSendRow } from "./page";

type Step = WinbackTemplate & { saved: boolean };

const MERGE_HELP =
  "Merge fields: {{first_name}} {{defendant_name}} {{amount}} {{state_name}} {{resume_url}} {{unsubscribe_url}} — the unsubscribe link is required.";

function StepCard({ initial }: { initial: Step }) {
  const router = useRouter();
  const [subject, setSubject] = useState(initial.subject);
  const [delayDays, setDelayDays] = useState(initial.delay_days);
  const [enabled, setEnabled] = useState(initial.enabled);
  const [bodyHtml, setBodyHtml] = useState(initial.body_html);
  const [busy, setBusy] = useState<"save" | "test" | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function save(nextEnabled?: boolean) {
    if (busy) return;
    setBusy("save");
    setMsg(null);
    setErr(null);
    try {
      const res = await fetch("/api/admin/winback/templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          step: initial.step,
          delay_days: delayDays,
          subject,
          body_html: bodyHtml,
          enabled: nextEnabled ?? enabled,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || data.error || "Save failed");
      if (nextEnabled !== undefined) setEnabled(nextEnabled);
      setMsg(nextEnabled === undefined ? "Saved." : nextEnabled ? "Saved & enabled." : "Saved & disabled.");
      router.refresh();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Save failed");
    } finally {
      setBusy(null);
    }
  }

  async function testSend() {
    if (busy) return;
    setBusy("test");
    setMsg(null);
    setErr(null);
    try {
      const res = await fetch("/api/admin/winback/test-send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, body_html: bodyHtml }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || data.error || "Test send failed");
      setMsg(`Test sent to ${data.to}.`);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Test send failed");
    } finally {
      setBusy(null);
    }
  }

  return (
    <section className="admin-card" style={{ marginBottom: 24, display: "block" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 12 }}>
        <strong style={{ fontSize: 15 }}>Email {initial.step}</strong>
        <span className={`admin-pill admin-pill-${enabled ? "active" : "neutral"}`}>
          {enabled ? "ON — sending" : initial.saved ? "off" : "off (never saved)"}
        </span>
        <label style={{ marginLeft: "auto", fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
          Send after
          <input
            type="number"
            min={1}
            max={365}
            value={delayDays}
            onChange={(e) => setDelayDays(Number(e.target.value))}
            style={{ width: 60 }}
          />
          days of inactivity
        </label>
      </div>

      <label style={{ display: "block", fontSize: 13, marginBottom: 10 }}>
        Subject
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          style={{ width: "100%", marginTop: 4 }}
        />
      </label>

      <TipTapEditor
        initialJson={null}
        initialHtml={initial.body_html}
        onChange={({ html }) => setBodyHtml(html)}
      />
      <p style={{ fontSize: 12, color: "var(--muted)", margin: "8px 0 12px" }}>{MERGE_HELP}</p>

      {err ? <p style={{ color: "#b8331f", fontSize: 13 }}>{err}</p> : null}
      {msg ? <p style={{ color: "#3d7a4a", fontSize: 13 }}>{msg}</p> : null}

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button type="button" className="btn btn-dark" disabled={busy !== null} onClick={() => save()}>
          {busy === "save" ? "Saving…" : "Save"}
        </button>
        <button type="button" className="btn" disabled={busy !== null} onClick={testSend}>
          {busy === "test" ? "Sending…" : "Send test to me"}
        </button>
        <button
          type="button"
          className="btn"
          disabled={busy !== null}
          onClick={() => save(!enabled)}
          style={{ marginLeft: "auto" }}
        >
          {enabled ? "Disable" : "Save & enable"}
        </button>
      </div>
    </section>
  );
}

export default function WinbackPanel({
  templates,
  sends,
  migrationMissing,
}: {
  templates: Step[];
  sends: WinbackSendRow[];
  migrationMissing: boolean;
}) {
  return (
    <div>
      {migrationMissing ? (
        <div
          className="admin-card"
          style={{ marginBottom: 24, display: "block", borderColor: "#b8331f" }}
        >
          <strong style={{ color: "#b8331f" }}>Database tables missing.</strong>{" "}
          Run the migration <code>lib/supabase/migrations/2026-07-24_winback.sql</code> in the
          Supabase SQL editor first. Until then you can preview the default emails below, but
          saving and sending won&rsquo;t work.
        </div>
      ) : null}

      <p style={{ color: "var(--muted)", fontSize: 14, maxWidth: 640, marginBottom: 24 }}>
        Who gets these: anyone whose case has an email, hasn&rsquo;t paid, and has gone quiet.
        Each email fires once per case after the configured days of inactivity, one step at a
        time. The sequence stops permanently on payment or unsubscribe. Nothing sends unless a
        step is saved and switched on.
      </p>

      {templates.map((t) => (
        <StepCard key={t.step} initial={t} />
      ))}

      <h2 style={{ fontSize: 17, margin: "32px 0 12px" }}>Recent sends</h2>
      {sends.length === 0 ? (
        <p style={{ color: "var(--muted)", fontSize: 14 }}>Nothing sent yet.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>When</th>
              <th>Step</th>
              <th>To</th>
              <th>Case</th>
            </tr>
          </thead>
          <tbody>
            {sends.map((s, i) => (
              <tr key={i}>
                <td style={{ whiteSpace: "nowrap" }}>
                  {new Date(s.sent_at).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </td>
                <td>Email {s.step}</td>
                <td>{s.email}</td>
                <td>
                  <a className="admin-link" href={`/admin/cases/${s.case_id}`}>
                    {s.defendant_name ? `vs ${s.defendant_name}` : s.case_id.slice(0, 8)} →
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

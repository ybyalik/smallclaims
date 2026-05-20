"use client";

import { useState, useTransition } from "react";

interface Props {
  email: string;
  fullName: string;
}

const SUBJECT_PRESETS = [
  "I have a question",
  "Something isn't working",
  "Refund request",
  "Feedback or feature request",
  "Other",
];

export default function SupportForm({ email, fullName }: Props) {
  const [subject, setSubject] = useState(SUBJECT_PRESETS[0]);
  const [message, setMessage] = useState("");
  const [sentAt, setSentAt] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function send() {
    setError(null);
    if (!message.trim()) {
      setError("Message can't be empty.");
      return;
    }
    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, message }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Failed to send");
      setSentAt(new Date());
      setMessage("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to send");
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        startTransition(send);
      }}
      className="app-settings-form"
    >
      <label>
        <span>From</span>
        <input
          type="text"
          value={fullName ? `${fullName} <${email}>` : email}
          disabled
          aria-disabled
        />
        <span className="app-settings-hint">
          We&rsquo;ll reply to this address. To change it, update your profile.
        </span>
      </label>

      <label>
        <span>What&rsquo;s this about?</span>
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        >
          {SUBJECT_PRESETS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span>Message</span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={8}
          placeholder="Tell us what's going on. Include case IDs or screenshots if helpful."
        />
      </label>

      {error ? <p className="dl-error-inline">{error}</p> : null}

      <div className="app-settings-actions">
        <button type="submit" className="btn btn-dark" disabled={isPending}>
          {isPending ? "Sending…" : "Send Message"}
        </button>
        {sentAt ? (
          <span className="dl-saved-at">
            Sent at {sentAt.toLocaleTimeString()}. We typically reply within 1 business day.
          </span>
        ) : null}
      </div>
    </form>
  );
}

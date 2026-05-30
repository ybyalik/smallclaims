"use client";

import { useState } from "react";

// Client contact form for the marketing /contact page. Posts to the public
// /api/contact route, which emails the support/admin inbox. Kept visually
// identical to the prior static markup; styles are inlined here so the
// component has no dependency on the server-only firm design module.

const C = {
  fg: "#0e0e0e",
  muted: "#1f1f1f",
  line: "#E2E0D8",
  accent: "#b8331f",
  dark: "#0e0e0e",
};
const BODY_FONT = "var(--font-geist), system-ui, sans-serif";

const INPUT_STYLE: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  background: "#fff",
  border: `1px solid ${C.line}`,
  borderRadius: 8,
  padding: "12px 14px",
  font: `15px/1.4 ${BODY_FONT}`,
  color: C.fg,
  outline: "none",
};

const LABEL_STYLE: React.CSSProperties = {
  font: `500 10px/1 ${BODY_FONT}`,
  letterSpacing: "0.22em",
  color: C.muted,
  textTransform: "uppercase",
  marginBottom: 8,
};

function ArrowIcon({ color = "#fff" }: { color?: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!message.trim()) {
      setError("Please add a short note about what's going on.");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, state, category, message, website }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setError(data.error || "We couldn't send your message. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("sent");
    } catch {
      setError("We couldn't send your message. Please try again.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div
        style={{
          marginTop: 40,
          padding: "28px 30px",
          background: "#fff",
          border: `1px solid ${C.line}`,
          borderRadius: 10,
        }}
      >
        <div style={{ font: `500 20px/1.3 var(--font-newsreader), Georgia, serif`, color: C.fg }}>
          Thanks — your message is on its way.
        </div>
        <p style={{ font: `14.5px/1.6 ${BODY_FONT}`, color: C.muted, margin: "10px 0 0" }}>
          A real person on our team will read it and reply{email ? ` to ${email}` : ""}, usually
          within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} style={{ marginTop: 40, display: "grid", gap: 28 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
        <div>
          <div style={LABEL_STYLE}>YOUR NAME</div>
          <input
            type="text"
            placeholder="Jordan Trevant"
            style={INPUT_STYLE}
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />
        </div>
        <div>
          <div style={LABEL_STYLE}>EMAIL</div>
          <input
            type="email"
            placeholder="you@example.com"
            style={INPUT_STYLE}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
        <div>
          <div style={LABEL_STYLE}>STATE</div>
          <input
            type="text"
            placeholder="California"
            style={INPUT_STYLE}
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>
        <div>
          <div style={LABEL_STYLE}>TYPE OF CASE</div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ ...INPUT_STYLE, color: category ? C.fg : C.muted, appearance: "none", cursor: "pointer" }}
          >
            <option value="" disabled>
              Select a category…
            </option>
            <option value="landlord">Landlord dispute</option>
            <option value="contractor">Contractor dispute</option>
            <option value="employer">Employer dispute</option>
            <option value="auto">Auto dispute</option>
            <option value="neighbor">Neighbor dispute</option>
            <option value="personal-loan">Personal loan</option>
            <option value="roommate">Roommate dispute</option>
            <option value="online-seller">Online seller</option>
            <option value="refund">Refund</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <div style={LABEL_STYLE}>BRIEFLY · WHAT&rsquo;S GOING ON?</div>
        <textarea
          rows={6}
          placeholder="A short summary. What's the dispute, what have you tried so far, and what would be most helpful from us."
          style={{ ...INPUT_STYLE, resize: "vertical" }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      {/* Honeypot — hidden from real users, off the tab order. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
        aria-hidden="true"
      />

      {error && (
        <p style={{ font: `14px/1.5 ${BODY_FONT}`, color: C.accent, margin: 0 }}>{error}</p>
      )}

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 4 }}>
        <button
          type="submit"
          disabled={status === "sending"}
          style={{
            background: C.dark,
            color: "#fff",
            border: "none",
            padding: "16px 24px",
            font: `500 14px/1 ${BODY_FONT}`,
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            cursor: status === "sending" ? "default" : "pointer",
            opacity: status === "sending" ? 0.7 : 1,
            borderRadius: 8,
          }}
        >
          {status === "sending" ? "Sending…" : "Send message"} <ArrowIcon color="#fff" />
        </button>
      </div>
    </form>
  );
}

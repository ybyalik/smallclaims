"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Clock, MessageSquare, AlertCircle } from "lucide-react";

export type ResponseState = "pending" | "responded" | "no_response" | "partial_offer";

interface Props {
  caseId: string;
  initialState: ResponseState;
  initialRecordedAt: string | null;
  letterSentAt: string | null;
}

const OPTIONS: Array<{
  value: ResponseState;
  title: string;
  blurb: string;
  icon: typeof CheckCircle2;
  tone: "good" | "warn" | "neutral";
}> = [
  {
    value: "responded",
    title: "They paid or settled",
    blurb: "Defendant agreed to pay in full or close enough to settle.",
    icon: CheckCircle2,
    tone: "good",
  },
  {
    value: "partial_offer",
    title: "They made a partial offer",
    blurb: "They want to settle for less than you asked. You can accept, counter, or move on.",
    icon: MessageSquare,
    tone: "neutral",
  },
  {
    value: "no_response",
    title: "No response (or they refused)",
    blurb: "They've ignored the letter or refused to pay. Time to file in court.",
    icon: AlertCircle,
    tone: "warn",
  },
];

export default function ResponseTracker({
  caseId,
  initialState,
  initialRecordedAt,
  letterSentAt,
}: Props) {
  const router = useRouter();
  const [state, setState] = useState<ResponseState>(initialState);
  const [recordedAt, setRecordedAt] = useState<string | null>(initialRecordedAt);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const daysSinceSent = letterSentAt
    ? Math.floor((Date.now() - new Date(letterSentAt).getTime()) / (1000 * 60 * 60 * 24))
    : null;

  async function setResponse(next: ResponseState) {
    if (saving) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/cases/${caseId}/response`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ state: next }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || `HTTP ${res.status}`);
      }
      const data = (await res.json()) as { recorded_at: string };
      setState(next);
      setRecordedAt(data.recorded_at);
      // Refresh server data so the case status reflects the new state.
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save");
    } finally {
      setSaving(false);
    }
  }

  // If the user has already recorded a response, show a confirmed card with
  // an option to change.
  if (state !== "pending") {
    const opt = OPTIONS.find((o) => o.value === state);
    if (!opt) return null;
    const Icon = opt.icon;
    return (
      <div className={`app-rt-card app-rt-${opt.tone}`}>
        <Icon size={20} strokeWidth={2} aria-hidden />
        <div style={{ flex: 1 }}>
          <strong>{opt.title}</strong>
          <p>{opt.blurb}</p>
          {recordedAt ? (
            <p className="app-rt-meta">
              Recorded {new Date(recordedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          ) : null}
        </div>
        <button
          type="button"
          className="app-link"
          onClick={() => setResponse("pending")}
          disabled={saving}
        >
          Change
        </button>
      </div>
    );
  }

  // Pending: show the prompt and the three option buttons.
  return (
    <div className="app-rt-prompt">
      <div className="app-rt-prompt-head">
        <Clock size={18} strokeWidth={2} aria-hidden />
        <strong>Heard back from them?</strong>
        {daysSinceSent !== null ? (
          <span className="app-rt-elapsed">
            {daysSinceSent === 0
              ? "Letter sent today"
              : `${daysSinceSent} ${daysSinceSent === 1 ? "day" : "days"} since the letter went out`}
          </span>
        ) : null}
      </div>
      <p className="app-rt-prompt-sub">
        Tell us where things stand. Your case file updates so we can suggest the right next step.
      </p>
      <div className="app-rt-options">
        {OPTIONS.map((o) => {
          const Icon = o.icon;
          return (
            <button
              key={o.value}
              type="button"
              className={`app-rt-option app-rt-${o.tone}`}
              onClick={() => setResponse(o.value)}
              disabled={saving}
            >
              <Icon size={16} strokeWidth={2} aria-hidden />
              <div>
                <strong>{o.title}</strong>
                <span>{o.blurb}</span>
              </div>
            </button>
          );
        })}
      </div>
      {error ? <p className="app-rt-error">{error}</p> : null}
    </div>
  );
}

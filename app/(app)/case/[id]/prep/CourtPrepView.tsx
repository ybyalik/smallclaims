"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { RefreshCw } from "lucide-react";
import type { CourtPrepPack } from "../../../../../lib/court-prep/types";

interface Props {
  caseId: string;
  initialPack: CourtPrepPack | null;
}

export default function CourtPrepView({ caseId, initialPack }: Props) {
  const [pack, setPack] = useState<CourtPrepPack | null>(initialPack);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const generationStarted = useRef(false);

  const generate = useCallback(
    async (force = false) => {
      if (loading) return;
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/cases/${caseId}/prep/generate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ force }),
        });
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.message || body.error || `HTTP ${res.status}`);
        }
        const data = (await res.json()) as { pack: CourtPrepPack };
        setPack(data.pack);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Couldn't generate prep pack");
      } finally {
        setLoading(false);
      }
    },
    [caseId, loading],
  );

  // First-paint auto-generate when paid but content not yet cached.
  useEffect(() => {
    if (pack || generationStarted.current) return;
    generationStarted.current = true;
    void generate(false);
  }, [pack, generate]);

  if (!pack) {
    if (error) {
      return (
        <div className="prep-loading">
          <p className="prep-error">{error}</p>
          <button type="button" className="btn btn-dark" onClick={() => generate(false)}>
            Try again
          </button>
        </div>
      );
    }
    return (
      <div className="prep-loading">
        <div className="prep-spinner" aria-hidden />
        <p>
          Building your prep pack… This takes about 15 seconds. We&rsquo;re drafting your opening
          statement, the questions the judge is most likely to ask, your key-facts cheat sheet,
          and the pitfalls to avoid.
        </p>
      </div>
    );
  }

  return (
    <div className="court-prep">
      <div className="court-prep-meta">
        <span>
          Generated {new Date(pack.generated_at).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
          })}
        </span>
        <button
          type="button"
          className="prep-regenerate"
          onClick={() => generate(true)}
          disabled={loading}
        >
          <RefreshCw size={13} strokeWidth={2} aria-hidden />
          {loading ? "Regenerating…" : "Regenerate"}
        </button>
      </div>

      {/* Opening statement */}
      <section className="filing-section">
        <h2>Your opening statement</h2>
        <p className="filing-meta">
          Read this aloud or memorize it. Speak slowly. The judge wants the clean story, not the
          detail dump.
        </p>
        {pack.opening_statement.split(/\n\n+/).map((para, i) => (
          <p key={i} className="prep-opening-para">
            {para.trim()}
          </p>
        ))}
      </section>

      {/* Judge questions */}
      <section className="filing-section">
        <h2>Questions the judge is likely to ask</h2>
        <ol className="prep-q-list">
          {pack.judge_questions.map((q, i) => (
            <li key={i} className="prep-question">
              <div className="prep-q-head">&ldquo;{q.question}&rdquo;</div>
              {q.why_asked ? (
                <p className="prep-q-why">
                  <strong>Why they ask:</strong> {q.why_asked}
                </p>
              ) : null}
              {q.suggested_answer_outline ? (
                <p className="prep-q-outline">
                  <strong>How to answer:</strong> {q.suggested_answer_outline}
                </p>
              ) : null}
            </li>
          ))}
        </ol>
      </section>

      {/* Key facts */}
      <section className="filing-section">
        <h2>Your key facts — know these cold</h2>
        <p className="filing-meta">
          Print this. Bring it. If the judge asks any of these, you should be able to answer
          without hesitating.
        </p>
        <ul>
          {pack.key_facts.map((k, i) => (
            <li key={i}>{k}</li>
          ))}
        </ul>
      </section>

      {/* What to bring */}
      <section className="filing-section">
        <h2>What to bring</h2>
        <ul>
          {pack.what_to_bring.map((w, i) => (
            <li key={i}>{w}</li>
          ))}
        </ul>
      </section>

      {/* Pitfalls */}
      <section className="filing-section">
        <h2>Don&rsquo;t do these</h2>
        <ul>
          {pack.things_not_to_say.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      </section>

      <p className="filing-disclaimer">
        We are not a law firm and do not provide legal advice. The prep pack is generated from
        your case facts and general guidance about small-claims hearings. You speak for yourself
        at the hearing.
      </p>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

export default function HeroRightPreview() {
  return (
    <main style={{ padding: "40px 0", background: "var(--bg)", minHeight: "100vh" }}>
      <div className="wrap">
        <header style={{ marginBottom: 32 }}>
          <span className="eyebrow" style={{ color: "var(--accent)" }}>Preview · noindex</span>
          <h1 style={{ fontFamily: "var(--font-newsreader)", fontWeight: 700, fontSize: 40, margin: "8px 0 8px" }}>
            Hero right-side options
          </h1>
          <p style={{ color: "var(--ink-2)", maxWidth: 60 + "ch" }}>
            Each panel below is sized to roughly the slot the right side of an internal hero would occupy.
            Pick one (or mix two) and tell me the number(s).
          </p>
        </header>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          <Slot n={1} title="Counter — recovery total">
            <CounterOption />
          </Slot>
          <Slot n={2} title="Case-strength meter">
            <MeterOption />
          </Slot>
          <Slot n={3} title="State caps ticker">
            <StateTickerOption />
          </Slot>
          <Slot n={4} title="Step flow with traveling dot">
            <StepFlowOption />
          </Slot>
          <Slot n={5} title="Self-typing demand letter">
            <TypingLetterOption />
          </Slot>
          <Slot n={6} title="Animated bar chart (Low / Mid / High)">
            <BarsOption />
          </Slot>
          <Slot n={7} title="Rotating case-types chip cloud">
            <ChipsOption />
          </Slot>
          <Slot n={8} title="Animated checklist">
            <ChecklistOption />
          </Slot>
          <Slot n={9} title="Floating gavel SVG">
            <GavelOption />
          </Slot>
          <Slot n={10} title="Quote rotator">
            <QuoteOption />
          </Slot>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-up { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes pulse-fade { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
        @keyframes grow-bar { from { height: 0; } to { height: var(--h); } }
        @keyframes travel { 0% { left: 0; } 100% { left: calc(100% - 14px); } }
        @keyframes typewriter { from { width: 0; } to { width: 100%; } }
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes meter-fill {
          0% { stroke-dashoffset: 251; }
          100% { stroke-dashoffset: 63; }
        }
      `}</style>
    </main>
  );
}

function Slot({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
        <span style={{ fontFamily: "var(--font-geist)", fontWeight: 700, color: "var(--accent)", fontSize: 12, letterSpacing: "0.16em" }}>
          {String(n).padStart(2, "0")}
        </span>
        <h2 style={{ fontFamily: "var(--font-newsreader)", fontWeight: 700, fontSize: 18, margin: 0 }}>{title}</h2>
      </div>
      <div
        style={{
          background: "var(--bg-2)",
          border: "1px solid var(--hairline)",
          borderRadius: 16,
          padding: 24,
          minHeight: 320,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* 01 — Counter */
function CounterOption() {
  const [v, setV] = useState(0);
  useEffect(() => {
    const target = 4287300;
    const dur = 2000;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      setV(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontFamily: "var(--font-geist)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 12 }}>
        Recovered for our users
      </div>
      <div style={{ fontFamily: "var(--font-newsreader)", fontWeight: 700, fontSize: 56, color: "var(--ink)", letterSpacing: "-0.02em", lineHeight: 1 }}>
        ${v.toLocaleString()}
      </div>
      <div style={{ marginTop: 14, color: "var(--ink-2)", fontSize: 14 }}>
        across <strong>12,847 cases</strong> in all 50 states
      </div>
    </div>
  );
}

/* 02 — Case strength meter */
function MeterOption() {
  return (
    <div style={{ textAlign: "center" }}>
      <svg viewBox="0 0 100 60" width="180" height="108" style={{ display: "block", margin: "0 auto" }}>
        <path d="M10 50 A 40 40 0 0 1 90 50" fill="none" stroke="var(--hairline)" strokeWidth="6" strokeLinecap="round" />
        <path
          d="M10 50 A 40 40 0 0 1 90 50"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="125.6"
          style={{ animation: "meter-fill 1.6s ease-out forwards" }}
        />
      </svg>
      <div style={{ fontFamily: "var(--font-newsreader)", fontWeight: 700, fontSize: 44, color: "var(--ink)", marginTop: -10 }}>78<span style={{ fontSize: 22, color: "var(--muted)" }}>/100</span></div>
      <div style={{ fontFamily: "var(--font-geist)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700, color: "var(--accent)" }}>
        Strong case
      </div>
      <div style={{ marginTop: 8, color: "var(--ink-2)", fontSize: 13 }}>
        Average score in this category
      </div>
    </div>
  );
}

/* 03 — State caps ticker */
function StateTickerOption() {
  const ENTRIES = [
    { state: "California", cap: "$12,500" },
    { state: "Texas", cap: "$20,000" },
    { state: "New York", cap: "$10,000" },
    { state: "Florida", cap: "$8,000" },
    { state: "Illinois", cap: "$10,000" },
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % ENTRIES.length), 1800);
    return () => clearInterval(id);
  }, [ENTRIES.length]);
  const cur = ENTRIES[i];
  return (
    <div style={{ textAlign: "center", width: "100%" }}>
      <div style={{ fontFamily: "var(--font-geist)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 16 }}>
        State caps · live
      </div>
      <div key={i} style={{ animation: "fade-in-up 0.4s ease-out" }}>
        <div style={{ fontFamily: "var(--font-newsreader)", fontStyle: "italic", fontSize: 22, color: "var(--ink-2)" }}>
          {cur.state}
        </div>
        <div style={{ fontFamily: "var(--font-newsreader)", fontWeight: 700, fontSize: 56, color: "var(--accent)", letterSpacing: "-0.02em", lineHeight: 1, marginTop: 4 }}>
          {cur.cap}
        </div>
      </div>
      <div style={{ marginTop: 18, color: "var(--ink-2)", fontSize: 13 }}>
        Each state caps small claims at a different amount.
      </div>
    </div>
  );
}

/* 04 — Step flow with traveler */
function StepFlowOption() {
  const STEPS = ["Demand", "File", "Hearing", "Won"];
  return (
    <div style={{ width: "100%" }}>
      <div style={{ fontFamily: "var(--font-geist)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", textAlign: "center", marginBottom: 28 }}>
        How it goes
      </div>
      <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: "50%", height: 2, background: "var(--hairline)", transform: "translateY(-50%)" }} />
        <div style={{ position: "absolute", top: "50%", marginTop: -7, width: 14, height: 14, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 0 6px rgba(217,64,46,0.18)", animation: "travel 4s ease-in-out infinite alternate", zIndex: 2 }} />
        {STEPS.map((s) => (
          <div key={s} style={{ position: "relative", zIndex: 1, background: "var(--bg-2)", padding: "0 6px" }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--ink)", margin: "0 auto" }} />
            <div style={{ marginTop: 8, fontFamily: "var(--font-geist)", fontSize: 12, fontWeight: 600, color: "var(--ink-2)" }}>{s}</div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 28, fontFamily: "var(--font-newsreader)", fontWeight: 700, fontSize: 22, color: "var(--ink)" }}>
        30–90 days <span style={{ color: "var(--muted)", fontWeight: 400 }}>typical</span>
      </div>
    </div>
  );
}

/* 05 — Self-typing letter */
function TypingLetterOption() {
  const LINES = [
    "April 21, 2026",
    "Re: Demand for Return of Security Deposit",
    "Pursuant to Cal. Civ. Code § 1950.5,",
    "you were required to return my $1,500",
    "deposit within 21 days of move-out.",
    "I demand $4,500 within fourteen (14) days.",
  ];
  return (
    <div style={{ background: "#fefcf3", border: "1px solid var(--hairline)", borderRadius: 6, padding: "22px 26px", width: "100%", boxShadow: "0 12px 28px -16px rgba(31,27,22,0.25)", transform: "rotate(-0.4deg)" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, fontFamily: "var(--font-newsreader)", fontSize: 13, lineHeight: 1.55, color: "var(--ink)" }}>
        {LINES.map((l, i) => (
          <div
            key={l}
            style={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              animation: `typewriter 0.7s steps(40, end) ${i * 0.6}s forwards`,
              width: 0,
            }}
          >
            {l}
          </div>
        ))}
        <div style={{ fontFamily: "var(--font-caveat)", fontStyle: "italic", fontSize: 22, color: "var(--accent)", marginTop: 6, opacity: 0, animation: `fade-in-up 0.6s ease-out ${LINES.length * 0.6}s forwards` }}>
          Jordan A. Tenant
        </div>
      </div>
    </div>
  );
}

/* 06 — Bar chart */
function BarsOption() {
  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <div style={{ fontFamily: "var(--font-geist)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 24 }}>
        Typical recovery
      </div>
      <div style={{ display: "flex", gap: 16, alignItems: "flex-end", justifyContent: "center", height: 160 }}>
        {[
          { label: "Low", h: 60, val: "$1,200", color: "#9ba37e" },
          { label: "Mid", h: 110, val: "$4,500", color: "var(--accent)" },
          { label: "High", h: 145, val: "$10K+", color: "var(--ink)" },
        ].map((b, i) => (
          <div key={b.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={{ fontFamily: "var(--font-newsreader)", fontWeight: 700, fontSize: 16, color: b.color }}>{b.val}</div>
            <div
              style={{
                width: 38,
                background: b.color,
                borderRadius: "8px 8px 0 0",
                animation: `grow-bar 1s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.2}s both`,
                ["--h" as string]: `${b.h}px`,
              } as React.CSSProperties}
            />
            <div style={{ fontFamily: "var(--font-geist)", fontSize: 10.5, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700, color: "var(--ink-2)" }}>{b.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 07 — Chip cloud */
function ChipsOption() {
  const ITEMS = [
    "Security deposit · $4,500",
    "Wrongful termination · $7,200",
    "Parked-car hit · $4,200",
    "Contractor deposit · $6,500",
    "Unpaid wages · $4,400",
    "Wrongful eviction · $8,100",
  ];
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", maxWidth: 360 }}>
      {ITEMS.map((t, i) => (
        <span
          key={t}
          style={{
            background: "#fff",
            border: "1px solid var(--hairline)",
            borderRadius: 999,
            padding: "10px 16px",
            fontFamily: "var(--font-geist)",
            fontWeight: 600,
            fontSize: 13.5,
            color: "var(--ink-2)",
            animation: `fade-in-up 0.5s ease-out ${i * 0.15}s both`,
            boxShadow: "0 4px 10px -8px rgba(0,0,0,0.18)",
          }}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

/* 08 — Animated checklist */
function ChecklistOption() {
  const ITEMS = [
    "Free filing under $5K",
    "No lawyer required",
    "Resolves in 30-90 days",
    "Win rate: 71% with prep",
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {ITEMS.map((t, i) => (
        <div
          key={t}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            animation: `fade-in-up 0.4s ease-out ${i * 0.4}s both`,
          }}
        >
          <span style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(217,64,46,0.14)", color: "var(--accent)", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12l5 5L20 7" />
            </svg>
          </span>
          <span style={{ fontFamily: "var(--font-geist)", fontWeight: 600, fontSize: 15, color: "var(--ink)" }}>{t}</span>
        </div>
      ))}
    </div>
  );
}

/* 09 — Floating gavel */
function GavelOption() {
  return (
    <div style={{ animation: "float-up 4s ease-in-out infinite", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <div style={{ width: 120, height: 120, borderRadius: "50%", background: "rgba(217,64,46,0.12)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 30px 50px -28px rgba(217,64,46,0.45)" }}>
        <svg viewBox="0 0 24 24" width="58" height="58" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 4l6 6" />
          <path d="M11 7l6 6" />
          <path d="M16 12l-9 9" />
          <path d="M3 21h11" />
        </svg>
      </div>
      <div style={{ fontFamily: "var(--font-geist)", fontWeight: 700, fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink-2)", animation: "pulse-fade 4s ease-in-out infinite" }}>
        Built for filers
      </div>
    </div>
  );
}

/* 10 — Quote rotator */
function QuoteOption() {
  const QUOTES = [
    { q: "Won my $4,500 deposit back in 47 days. The demand letter alone got them to settle.", who: "Maria · California" },
    { q: "Filed my claim in 20 minutes. Judge ruled from the bench. Cash hit my account in two weeks.", who: "Marcus · Texas" },
    { q: "Three contractors had ghosted me. CivilCase walked me through it. Got $6,200 back.", who: "Priya · Illinois" },
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % QUOTES.length), 4500);
    return () => clearInterval(id);
  }, [QUOTES.length]);
  const cur = QUOTES[i];
  return (
    <div key={i} style={{ animation: "fade-in-up 0.5s ease-out", textAlign: "left", maxWidth: 360 }}>
      <div style={{ fontFamily: "var(--font-newsreader)", fontStyle: "italic", fontSize: 19, lineHeight: 1.4, color: "var(--ink)" }}>
        <span style={{ color: "var(--accent)", fontSize: 28, lineHeight: 1, marginRight: 4 }}>&ldquo;</span>
        {cur.q}
      </div>
      <div style={{ marginTop: 14, fontFamily: "var(--font-geist)", fontSize: 13, color: "var(--muted)" }}>
        — {cur.who}
      </div>
    </div>
  );
}

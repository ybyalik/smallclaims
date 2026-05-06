"use client";

import { useEffect, useState } from "react";

// Sample data — matches the existing landlord/security-deposit shape
const SAMPLE = {
  amount: 4500,
  meta: "CA · Civ. Code § 1950.5",
  rows: [
    { label: "Deposit", value: "$1,500", emphasis: "default" as const },
    { label: "2x penalty", value: "+ $3,000", emphasis: "accent" as const },
    { label: "Filing fee + interest", value: "$0", emphasis: "muted" as const },
  ],
  footer: "Bad-faith withholding · 21-day deadline passed",
};

export default function IfYouWinPreview() {
  return (
    <main style={{ padding: "40px 0", background: "var(--bg)", minHeight: "100vh" }}>
      <div className="wrap">
        <header style={{ marginBottom: 32 }}>
          <span className="eyebrow" style={{ color: "var(--accent)" }}>Preview · noindex</span>
          <h1 style={{ fontFamily: "Newsreader", fontWeight: 700, fontSize: 40, margin: "8px 0 8px" }}>
            &ldquo;If you win&rdquo; right-side options
          </h1>
          <p style={{ color: "var(--ink-2)", maxWidth: "60ch" }}>
            Each panel is the size of the slot the existing dark counter card fills on the right of issue subpages
            (e.g. /small-claims/sue-landlord-security-deposit). All use the same sample data.
          </p>
        </header>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          <Slot n={0} title="Current — dark with peach numerals">
            <CurrentDark />
          </Slot>
          <Slot n={1} title="Cream receipt — court paper feel">
            <CreamReceipt />
          </Slot>
          <Slot n={2} title="Glassmorphism over warm gradient">
            <Glass />
          </Slot>
          <Slot n={3} title="Newspaper banner — editorial cream">
            <Newspaper />
          </Slot>
          <Slot n={4} title="Sage ledger — accountant green">
            <SageLedger />
          </Slot>
          <Slot n={5} title="Vibrant gradient — purple → pink">
            <PurpleGradient />
          </Slot>
          <Slot n={6} title="Editorial pullquote — red top bar">
            <EditorialQuote />
          </Slot>
          <Slot n={7} title="Certified-mail stamp card">
            <CertifiedMail />
          </Slot>
          <Slot n={8} title="Bento — split cells">
            <Bento />
          </Slot>
        </div>
      </div>

      <style jsx>{`
        @keyframes barfill { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes pulseDot { 0%,100% { box-shadow: 0 0 0 0 rgba(217,64,46,0.6); } 50% { box-shadow: 0 0 0 8px rgba(217,64,46,0); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
      `}</style>
    </main>
  );
}

function Slot({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
        <span style={{ fontFamily: "Geist", fontWeight: 700, color: "var(--accent)", fontSize: 12, letterSpacing: "0.16em" }}>
          {String(n).padStart(2, "0")}
        </span>
        <h2 style={{ fontFamily: "Newsreader", fontWeight: 700, fontSize: 18, margin: 0 }}>{title}</h2>
      </div>
      <div style={{ background: "var(--bg-2)", border: "1px solid var(--hairline)", borderRadius: 16, padding: 32, minHeight: 380, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {children}
      </div>
    </div>
  );
}

function useCountUp(target: number, duration = 1800) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setV(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return v;
}

/* 00 — Current dark (reference) */
function CurrentDark() {
  const v = useCountUp(SAMPLE.amount);
  return (
    <div style={{ background: "#0e0e0e", color: "#fef9f1", borderRadius: 18, padding: "28px 32px 26px", width: "100%", maxWidth: 420, position: "relative", overflow: "hidden", boxShadow: "0 30px 70px -28px rgba(31,27,22,0.5)" }}>
      <div style={{ position: "absolute", right: -100, top: -100, width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(245,178,159,0.22), transparent 65%)", pointerEvents: "none" }} aria-hidden />
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18, position: "relative" }}>
        <span style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, color: "rgba(254,249,241,0.6)" }}>If you win</span>
        <span style={{ fontSize: 11, color: "rgba(254,249,241,0.5)", fontFamily: "ui-monospace, monospace" }}>{SAMPLE.meta}</span>
      </div>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 4, fontFamily: "Newsreader", fontWeight: 700, lineHeight: 1, marginBottom: 22, color: "#f5b29f", position: "relative" }}>
        <span style={{ fontSize: 36, marginTop: 6 }}>$</span>
        <span style={{ fontSize: 72, letterSpacing: "-0.04em" }}>{v.toLocaleString()}</span>
      </div>
      <Rows tone="dark" />
      <Foot tone="dark" />
    </div>
  );
}

/* 01 — Cream receipt */
function CreamReceipt() {
  const v = useCountUp(SAMPLE.amount);
  return (
    <div style={{ background: "#fefcf3", border: "1px solid #e8e0c8", borderRadius: 14, padding: "26px 30px 24px", width: "100%", maxWidth: 420, position: "relative", boxShadow: "0 24px 50px -28px rgba(31,27,22,0.25)", fontFamily: "ui-monospace, monospace" }}>
      <div style={{ borderBottom: "1px dashed #d8cdb0", paddingBottom: 14, marginBottom: 18, display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontSize: 10.5, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, color: "var(--accent)" }}>If you win</span>
        <span style={{ fontSize: 10.5, color: "var(--muted)" }}>{SAMPLE.meta}</span>
      </div>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 4, fontFamily: "Newsreader", fontWeight: 700, lineHeight: 1, marginBottom: 18, color: "var(--accent)" }}>
        <span style={{ fontSize: 28, marginTop: 8 }}>$</span>
        <span style={{ fontSize: 64, letterSpacing: "-0.04em" }}>{v.toLocaleString()}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, fontFamily: "ui-monospace, monospace", fontSize: 12.5 }}>
        {SAMPLE.rows.map((r) => (
          <div key={r.label} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px dashed #ebe1c4", paddingBottom: 6 }}>
            <span style={{ color: "var(--ink-2)" }}>{r.label}</span>
            <span style={{ fontWeight: 700, color: r.emphasis === "accent" ? "var(--accent)" : r.emphasis === "muted" ? "var(--muted)" : "var(--ink)" }}>{r.value}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 18, paddingTop: 14, borderTop: "2px dashed var(--accent)", fontSize: 11, color: "var(--ink-2)", textAlign: "center", letterSpacing: "0.06em" }}>
        ✱ {SAMPLE.footer} ✱
      </div>
    </div>
  );
}

/* 02 — Glassmorphism */
function Glass() {
  const v = useCountUp(SAMPLE.amount);
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 420, padding: 16 }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 30% 20%, rgba(217,64,46,0.6), transparent 50%), radial-gradient(circle at 80% 80%, rgba(245,178,159,0.5), transparent 50%), linear-gradient(135deg, #fed8c1, #f3e8d6)", borderRadius: 22, filter: "blur(0px)" }} aria-hidden />
      <div style={{ position: "relative", background: "rgba(255,255,255,0.55)", backdropFilter: "blur(20px) saturate(140%)", WebkitBackdropFilter: "blur(20px) saturate(140%)", border: "1px solid rgba(255,255,255,0.7)", borderRadius: 18, padding: "26px 28px 22px", boxShadow: "0 18px 42px -20px rgba(31,27,22,0.25)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
          <span style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, color: "var(--accent)" }}>If you win</span>
          <span style={{ fontSize: 11, color: "var(--ink-2)", fontFamily: "ui-monospace, monospace" }}>{SAMPLE.meta}</span>
        </div>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 4, fontFamily: "Newsreader", fontWeight: 700, lineHeight: 1, marginBottom: 20, color: "var(--ink)" }}>
          <span style={{ fontSize: 32, marginTop: 6 }}>$</span>
          <span style={{ fontSize: 68, letterSpacing: "-0.04em" }}>{v.toLocaleString()}</span>
        </div>
        <Rows tone="light" />
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 16, paddingTop: 14, borderTop: "1px solid rgba(31,27,22,0.08)", fontSize: 11.5, color: "var(--ink-2)" }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)", animation: "pulseDot 1.8s ease-in-out infinite" }} />
          {SAMPLE.footer}
        </div>
      </div>
    </div>
  );
}

/* 03 — Newspaper banner */
function Newspaper() {
  const v = useCountUp(SAMPLE.amount);
  return (
    <div style={{ background: "#fbf6e8", border: "2px solid #1f1b16", borderRadius: 4, padding: "24px 28px", width: "100%", maxWidth: 420, fontFamily: "Newsreader, Georgia, serif", boxShadow: "6px 6px 0 0 #1f1b16" }}>
      <div style={{ borderBottom: "3px double #1f1b16", paddingBottom: 8, marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span style={{ fontSize: 10, letterSpacing: "0.32em", textTransform: "uppercase", fontWeight: 800, color: "#1f1b16" }}>VERDICT</span>
        <span style={{ fontSize: 10, fontFamily: "ui-monospace, monospace", color: "#5b5648" }}>{SAMPLE.meta}</span>
      </div>
      <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#5b5648", marginBottom: 6 }}>If you win</div>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 4, fontWeight: 800, lineHeight: 1, color: "#1f1b16", marginBottom: 4 }}>
        <span style={{ fontSize: 28, marginTop: 8 }}>$</span>
        <span style={{ fontSize: 72, letterSpacing: "-0.04em" }}>{v.toLocaleString()}</span>
      </div>
      <div style={{ fontStyle: "italic", color: "#5b5648", fontSize: 14, marginBottom: 18 }}>recovered, in cash</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13, color: "#1f1b16", marginBottom: 14, paddingTop: 12, borderTop: "1px solid #d8cfb6" }}>
        {SAMPLE.rows.map((r) => (
          <div key={r.label} style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: r.emphasis === "muted" ? "#9a9381" : "#5b5648" }}>{r.label}</span>
            <strong style={{ color: r.emphasis === "accent" ? "var(--accent)" : r.emphasis === "muted" ? "#9a9381" : "#1f1b16" }}>{r.value}</strong>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 11, fontStyle: "italic", color: "#5b5648", textAlign: "center", letterSpacing: "0.04em" }}>— {SAMPLE.footer} —</div>
    </div>
  );
}

/* 04 — Sage ledger */
function SageLedger() {
  const v = useCountUp(SAMPLE.amount);
  return (
    <div style={{ background: "#e9efde", border: "1px solid #b8c89c", borderRadius: 14, padding: "26px 30px 22px", width: "100%", maxWidth: 420, position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(0deg, transparent 0, transparent 27px, rgba(90,107,58,0.14) 27px, rgba(90,107,58,0.14) 28px)", borderRadius: 14, pointerEvents: "none" }} aria-hidden />
      <div style={{ position: "relative", display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <span style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, color: "#3d5d3f" }}>If you win</span>
        <span style={{ fontSize: 11, color: "#5a6b3a", fontFamily: "ui-monospace, monospace" }}>{SAMPLE.meta}</span>
      </div>
      <div style={{ position: "relative", display: "flex", alignItems: "flex-start", gap: 4, fontFamily: "Newsreader", fontWeight: 700, lineHeight: 1, marginBottom: 20, color: "#3d5d3f" }}>
        <span style={{ fontSize: 32, marginTop: 6 }}>$</span>
        <span style={{ fontSize: 68, letterSpacing: "-0.04em" }}>{v.toLocaleString()}</span>
      </div>
      <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: "#3d5d3f", borderTop: "1px solid #b8c89c", paddingTop: 12 }}>
        {SAMPLE.rows.map((r) => (
          <div key={r.label} style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#5a6b3a" }}>{r.label}</span>
            <strong style={{ color: r.emphasis === "accent" ? "var(--accent)" : "#3d5d3f", fontFamily: "Newsreader" }}>{r.value}</strong>
          </div>
        ))}
      </div>
      <div style={{ position: "relative", marginTop: 16, paddingTop: 12, borderTop: "1px solid #b8c89c", fontSize: 11, color: "#5a6b3a" }}>{SAMPLE.footer}</div>
    </div>
  );
}

/* 05 — Vibrant purple gradient */
function PurpleGradient() {
  const v = useCountUp(SAMPLE.amount);
  return (
    <div style={{ background: "linear-gradient(135deg, #6f3ee5, #d54c8d 60%, #f3a16e)", color: "#fff", borderRadius: 18, padding: "26px 30px 22px", width: "100%", maxWidth: 420, position: "relative", overflow: "hidden", boxShadow: "0 30px 60px -22px rgba(111,62,229,0.5)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
        <span style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, color: "rgba(255,255,255,0.85)" }}>If you win</span>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", fontFamily: "ui-monospace, monospace" }}>{SAMPLE.meta}</span>
      </div>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 4, fontFamily: "Newsreader", fontWeight: 700, lineHeight: 1, marginBottom: 20, color: "#fff" }}>
        <span style={{ fontSize: 32, marginTop: 6 }}>$</span>
        <span style={{ fontSize: 72, letterSpacing: "-0.04em" }}>{v.toLocaleString()}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {SAMPLE.rows.map((r, i) => (
          <div key={r.label} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 8, alignItems: "baseline", fontSize: 13.5 }}>
            <span style={{ color: "rgba(255,255,255,0.85)" }}>{r.label}</span>
            <strong style={{ fontFamily: "Newsreader", fontSize: 16, color: r.emphasis === "muted" ? "rgba(255,255,255,0.4)" : "#fff" }}>{r.value}</strong>
            <div style={{ gridColumn: "1 / -1", height: 4, background: "rgba(255,255,255,0.18)", borderRadius: 999, overflow: "hidden" }}>
              <span style={{ display: "block", height: "100%", width: r.emphasis === "muted" ? "0%" : r.emphasis === "accent" ? "100%" : "60%", background: "rgba(255,255,255,0.85)", borderRadius: 999, transformOrigin: "left", animation: `barfill 1.4s cubic-bezier(.4,0,.2,1) ${0.2 + i * 0.5}s both` }} />
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 18, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.18)", fontSize: 11.5, color: "rgba(255,255,255,0.85)" }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff", boxShadow: "0 0 12px 2px rgba(255,255,255,0.6)" }} />
        {SAMPLE.footer}
      </div>
    </div>
  );
}

/* 06 — Editorial pullquote */
function EditorialQuote() {
  const v = useCountUp(SAMPLE.amount);
  return (
    <div style={{ background: "#fff", borderRadius: 14, padding: 0, width: "100%", maxWidth: 420, overflow: "hidden", boxShadow: "0 24px 60px -28px rgba(31,27,22,0.22)", border: "1px solid var(--hairline)" }}>
      <div style={{ height: 6, background: "var(--accent)" }} aria-hidden />
      <div style={{ padding: "22px 28px 22px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
          <span style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, color: "var(--accent)" }}>If you win</span>
          <span style={{ fontSize: 11, color: "var(--muted)", fontFamily: "ui-monospace, monospace" }}>{SAMPLE.meta}</span>
        </div>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 4, fontFamily: "Newsreader", fontWeight: 700, lineHeight: 1, marginBottom: 4, color: "var(--ink)" }}>
          <span style={{ fontSize: 32, marginTop: 6 }}>$</span>
          <span style={{ fontSize: 72, letterSpacing: "-0.04em" }}>{v.toLocaleString()}</span>
        </div>
        <div style={{ fontFamily: "Newsreader", fontStyle: "italic", color: "var(--ink-2)", fontSize: 15, marginBottom: 18 }}>recovered, in cash</div>
        <Rows tone="light" />
        <Foot tone="light" />
      </div>
    </div>
  );
}

/* 07 — Certified mail card */
function CertifiedMail() {
  const v = useCountUp(SAMPLE.amount);
  return (
    <div style={{ position: "relative", background: "#fefcf3", borderRadius: 6, padding: "30px 30px 24px", width: "100%", maxWidth: 420, transform: "rotate(-0.4deg)", boxShadow: "0 24px 50px -28px rgba(31,27,22,0.32)", border: "1px solid var(--hairline)" }}>
      <div style={{ position: "absolute", top: 18, right: 22, transform: "rotate(8deg)", border: "2px solid rgba(217,64,46,0.5)", borderRadius: 4, padding: "6px 10px", background: "rgba(217,64,46,0.04)" }}>
        <div style={{ fontSize: 9, letterSpacing: "0.18em", fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", textAlign: "center" }}>Awarded</div>
        <div style={{ fontSize: 9, color: "var(--muted)", fontFamily: "ui-monospace, monospace", marginTop: 2 }}>{SAMPLE.meta.split("·")[0].trim()}</div>
      </div>
      <span style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, color: "var(--accent)" }}>If you win</span>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 4, fontFamily: "Newsreader", fontWeight: 700, lineHeight: 1, margin: "10px 0 16px", color: "var(--ink)" }}>
        <span style={{ fontSize: 32, marginTop: 6 }}>$</span>
        <span style={{ fontSize: 68, letterSpacing: "-0.04em" }}>{v.toLocaleString()}</span>
      </div>
      <Rows tone="light" />
      <div style={{ marginTop: 16, paddingTop: 12, borderTop: "1px dashed rgba(31,27,22,0.18)", fontSize: 11, color: "var(--ink-2)", fontStyle: "italic" }}>{SAMPLE.footer}</div>
    </div>
  );
}

/* 08 — Bento split */
function Bento() {
  const v = useCountUp(SAMPLE.amount);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gridTemplateRows: "auto 1fr", gap: 10, width: "100%", maxWidth: 420 }}>
      <div style={{ gridColumn: "1 / -1", background: "var(--ink)", color: "#fef9f1", borderRadius: 14, padding: "20px 22px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, color: "rgba(254,249,241,0.6)" }}>If you win</div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 4, fontFamily: "Newsreader", fontWeight: 700, lineHeight: 1, marginTop: 6, color: "#f5b29f" }}>
            <span style={{ fontSize: 24, marginTop: 6 }}>$</span>
            <span style={{ fontSize: 56, letterSpacing: "-0.04em" }}>{v.toLocaleString()}</span>
          </div>
        </div>
        <span style={{ width: 12, height: 12, borderRadius: "50%", background: "var(--accent)", animation: "pulseDot 1.8s ease-in-out infinite" }} />
      </div>
      <div style={{ background: "#fefcf3", border: "1px solid var(--hairline)", borderRadius: 14, padding: "18px 18px", display: "flex", flexDirection: "column", gap: 10 }}>
        {SAMPLE.rows.map((r) => (
          <div key={r.label} style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
            <span style={{ color: "var(--ink-2)" }}>{r.label}</span>
            <strong style={{ fontFamily: "Newsreader", color: r.emphasis === "accent" ? "var(--accent)" : "var(--ink)" }}>{r.value}</strong>
          </div>
        ))}
      </div>
      <div style={{ background: "rgba(217,64,46,0.08)", borderRadius: 14, padding: "18px 16px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 6 }}>
        <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700, color: "var(--accent)" }}>Trigger</div>
        <div style={{ fontFamily: "Newsreader", fontStyle: "italic", color: "var(--ink)", fontSize: 14, lineHeight: 1.3 }}>{SAMPLE.footer}</div>
      </div>
    </div>
  );
}

/* Shared rows + footer (for variants that need them on light bg) */
function Rows({ tone }: { tone: "light" | "dark" }) {
  const labelColor = tone === "dark" ? "rgba(254,249,241,0.7)" : "var(--ink-2)";
  const numColor = tone === "dark" ? "#fef9f1" : "var(--ink)";
  const trackColor = tone === "dark" ? "rgba(254,249,241,0.08)" : "rgba(31,27,22,0.08)";
  const fillColor = tone === "dark" ? "rgba(254,249,241,0.5)" : "var(--ink)";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {SAMPLE.rows.map((r, i) => (
        <div key={r.label} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 8, alignItems: "baseline", fontSize: 13.5 }}>
          <span style={{ color: labelColor }}>{r.label}</span>
          <strong style={{ fontFamily: "Newsreader", fontSize: 16, color: r.emphasis === "muted" ? labelColor : numColor }}>{r.value}</strong>
          <div style={{ gridColumn: "1 / -1", height: 4, background: trackColor, borderRadius: 999, overflow: "hidden" }}>
            <span style={{ display: "block", height: "100%", width: r.emphasis === "muted" ? "0%" : r.emphasis === "accent" ? "100%" : "60%", background: r.emphasis === "accent" ? "linear-gradient(90deg, var(--accent), #f5b29f)" : fillColor, borderRadius: 999, transformOrigin: "left", animation: `barfill 1.4s cubic-bezier(.4,0,.2,1) ${0.2 + i * 0.5}s both` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function Foot({ tone }: { tone: "light" | "dark" }) {
  const border = tone === "dark" ? "rgba(254,249,241,0.1)" : "rgba(31,27,22,0.08)";
  const text = tone === "dark" ? "rgba(254,249,241,0.65)" : "var(--ink-2)";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 22, paddingTop: 18, borderTop: `1px solid ${border}`, fontSize: 12, color: text }}>
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)", animation: "pulseDot 1.8s ease-in-out infinite" }} />
      {SAMPLE.footer}
    </div>
  );
}

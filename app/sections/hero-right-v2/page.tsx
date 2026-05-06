"use client";

import { useEffect, useState } from "react";

export default function HeroRightV2Preview() {
  return (
    <main style={{ padding: "40px 0", background: "var(--bg)", minHeight: "100vh" }}>
      <div className="wrap">
        <header style={{ marginBottom: 32 }}>
          <span className="eyebrow" style={{ color: "var(--accent)" }}>Preview · noindex · v2</span>
          <h1 style={{ fontFamily: "Newsreader", fontWeight: 700, fontSize: 40, margin: "8px 0 8px" }}>
            Hero right-side options &mdash; v2
          </h1>
          <p style={{ color: "var(--ink-2)", maxWidth: "60ch" }}>
            Eight fresh ideas leaning into the small-claims/legal context. Each panel is sized to the hero's right column on
            <code> /small-claims </code> and category hubs.
          </p>
        </header>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          <Slot n={1} title="Recent wins ticker">
            <RecentWins />
          </Slot>
          <Slot n={2} title="Receipt — line items add to total">
            <Receipt />
          </Slot>
          <Slot n={3} title="Air-mail demand-letter envelope">
            <AirMail />
          </Slot>
          <Slot n={4} title="Case-file folder with tab">
            <CaseFolder />
          </Slot>
          <Slot n={5} title="Verdict stamp moment">
            <VerdictStamp />
          </Slot>
          <Slot n={6} title="Vertical process timeline">
            <VerticalTimeline />
          </Slot>
          <Slot n={7} title="State recovery pins on faded map">
            <StatePins />
          </Slot>
          <Slot n={8} title="Stacked glass stats (3 floating cards)">
            <GlassStack />
          </Slot>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulseDot { 0%,100% { box-shadow: 0 0 0 0 rgba(217,64,46,0.6); } 50% { box-shadow: 0 0 0 8px rgba(217,64,46,0); } }
        @keyframes stampDrop { 0% { opacity: 0; transform: scale(2) rotate(-12deg); } 60% { opacity: 1; transform: scale(0.95) rotate(-2deg); } 100% { transform: scale(1) rotate(-4deg); opacity: 1; } }
        @keyframes growBar { from { transform: scaleY(0); } to { transform: scaleY(1); } }
        @keyframes pinDrop { 0% { opacity: 0; transform: translateY(-12px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes envelopeShake { 0%,100% { transform: rotate(-1deg); } 50% { transform: rotate(1deg); } }
        @keyframes travelDot { 0% { top: 16px; } 100% { top: calc(100% - 16px); } }
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
      <div style={{ background: "var(--bg-2)", border: "1px solid var(--hairline)", borderRadius: 16, padding: 28, minHeight: 380, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {children}
      </div>
    </div>
  );
}

/* 01 — Recent wins ticker */
function RecentWins() {
  const WINS = [
    { who: "Maria R.", state: "California", amount: "$4,500", days: 47, label: "Security deposit" },
    { who: "Marcus T.", state: "Texas", amount: "$6,200", days: 60, label: "Unpaid wages" },
    { who: "Dana W.", state: "Florida", amount: "$4,800", days: 14, label: "Contractor deposit" },
    { who: "Carlos M.", state: "Arizona", amount: "$3,500", days: 38, label: "Auto fraud" },
    { who: "Renee P.", state: "New York", amount: "$2,800", days: 52, label: "Property damage" },
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % WINS.length), 2200);
    return () => clearInterval(id);
  }, [WINS.length]);
  const cur = WINS[i];
  return (
    <div style={{ width: "100%", maxWidth: 360, background: "#fff", border: "1px solid var(--hairline)", borderRadius: 16, padding: 22, boxShadow: "0 18px 40px -22px rgba(31,27,22,0.18)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)", animation: "pulseDot 1.6s ease-in-out infinite" }} />
        <span style={{ fontFamily: "Geist", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700, color: "var(--ink-2)" }}>Recent wins</span>
      </div>
      <div key={i} style={{ animation: "fadeUp 0.4s ease-out" }}>
        <div style={{ fontFamily: "Newsreader", fontWeight: 700, fontSize: 36, color: "var(--accent)", letterSpacing: "-0.02em", lineHeight: 1 }}>
          {cur.amount}
        </div>
        <div style={{ marginTop: 8, fontFamily: "Newsreader", fontStyle: "italic", fontSize: 16, color: "var(--ink)" }}>
          &ldquo;{cur.label}&rdquo;
        </div>
        <div style={{ marginTop: 10, display: "flex", alignItems: "baseline", gap: 8, fontSize: 13, color: "var(--ink-2)" }}>
          <strong style={{ color: "var(--ink)" }}>{cur.who}</strong>
          <span>·</span>
          <span>{cur.state}</span>
          <span>·</span>
          <span>won in <strong style={{ color: "var(--ink)" }}>{cur.days} days</strong></span>
        </div>
      </div>
      <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px dashed rgba(31,27,22,0.15)", fontSize: 11.5, color: "var(--muted)" }}>
        Showing {i + 1} of {WINS.length} · case-history sample
      </div>
    </div>
  );
}

/* 02 — Receipt that adds up */
function Receipt() {
  const ROWS = [
    { label: "Deposit withheld", value: 1500 },
    { label: "2x statutory penalty", value: 3000 },
    { label: "Filing fee (recovered)", value: 50 },
    { label: "Pre-judgment interest", value: 120 },
  ];
  const [revealed, setRevealed] = useState(0);
  useEffect(() => {
    if (revealed < ROWS.length) {
      const id = setTimeout(() => setRevealed((r) => r + 1), 400);
      return () => clearTimeout(id);
    }
  }, [revealed, ROWS.length]);
  const total = ROWS.slice(0, revealed).reduce((s, r) => s + r.value, 0);
  return (
    <div style={{ width: "100%", maxWidth: 320, background: "#fefcf3", border: "1px solid var(--hairline)", borderRadius: 6, padding: "22px 24px", fontFamily: "ui-monospace, monospace", boxShadow: "0 18px 40px -22px rgba(31,27,22,0.22)" }}>
      <div style={{ textAlign: "center", marginBottom: 14, paddingBottom: 12, borderBottom: "1px dashed rgba(31,27,22,0.18)" }}>
        <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "var(--muted)" }}>SMALL-CLAIMS RECOVERY</div>
        <div style={{ fontFamily: "Newsreader", fontWeight: 700, fontSize: 14, marginTop: 4, color: "var(--ink)" }}>Itemized award</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 12 }}>
        {ROWS.map((r, idx) => (
          <div
            key={r.label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              opacity: idx < revealed ? 1 : 0,
              animation: idx < revealed ? `fadeUp 0.4s ease-out` : undefined,
              transition: "opacity 0.2s",
            }}
          >
            <span style={{ color: "var(--ink-2)" }}>{r.label}</span>
            <span style={{ color: "var(--ink)" }}>${r.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 14, paddingTop: 12, borderTop: "2px dashed var(--accent)", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span style={{ fontSize: 11, letterSpacing: "0.18em", color: "var(--accent)", fontWeight: 700 }}>TOTAL</span>
        <span style={{ fontFamily: "Newsreader", fontWeight: 700, fontSize: 28, color: "var(--accent)" }}>${total.toLocaleString()}</span>
      </div>
    </div>
  );
}

/* 03 — Air-mail demand-letter envelope */
function AirMail() {
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 340, animation: "envelopeShake 4s ease-in-out infinite" }}>
      <div style={{ position: "relative", background: "#fefcf3", border: "1px solid #d8cdb0", padding: "44px 26px 22px", boxShadow: "0 18px 40px -22px rgba(31,27,22,0.28)", backgroundImage: "repeating-linear-gradient(135deg, transparent 0 8px, rgba(217,64,46,0.55) 8px 12px, transparent 12px 16px, var(--ink) 16px 20px)", backgroundOrigin: "border-box", backgroundClip: "border-box", borderImage: "repeating-linear-gradient(45deg, #d9402e 0 8px, transparent 8px 16px, var(--ink) 16px 24px, transparent 24px 32px) 10" }}>
        <div style={{ background: "#fefcf3", padding: "18px 14px 16px", border: "1px solid var(--hairline)", borderRadius: 4 }}>
          {/* Stamp */}
          <div style={{ position: "absolute", top: 14, right: 16, width: 56, height: 64, background: "rgba(217,64,46,0.08)", border: "1.5px solid var(--accent)", borderRadius: 4, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 6, transform: "rotate(4deg)" }}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round">
              <path d="M3 7l9 6 9-6M5 7h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z" />
            </svg>
            <div style={{ fontSize: 7, letterSpacing: "0.12em", fontWeight: 700, color: "var(--accent)", marginTop: 2 }}>$1.20</div>
          </div>

          {/* Postmark */}
          <div style={{ position: "absolute", top: 28, left: 18, opacity: 0.65 }}>
            <svg viewBox="0 0 80 80" width="60" height="60" fill="none" stroke="var(--accent)" strokeWidth="1.4" strokeDasharray="2 3">
              <circle cx="40" cy="40" r="34" />
              <circle cx="40" cy="40" r="24" />
              <text x="40" y="32" fontSize="6" fill="var(--accent)" textAnchor="middle" letterSpacing="1.4" fontFamily="Geist">CERTIFIED</text>
              <text x="40" y="42" fontSize="9" fontWeight="700" fill="var(--accent)" textAnchor="middle" fontFamily="Geist">2026</text>
              <text x="40" y="52" fontSize="6" fill="var(--accent)" textAnchor="middle" letterSpacing="1.4" fontFamily="Geist">APR · 21</text>
            </svg>
          </div>

          <div style={{ marginTop: 56, fontFamily: "ui-monospace, monospace", fontSize: 11.5, color: "var(--ink-2)", lineHeight: 1.6 }}>
            <div style={{ color: "var(--muted)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, marginBottom: 4 }}>To:</div>
            <div style={{ color: "var(--ink)", fontWeight: 600 }}>Oakwood Properties LLC</div>
            <div>1247 Mission Street</div>
            <div>San Francisco, CA 94103</div>
          </div>
          <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid var(--hairline)", fontSize: 11, color: "var(--muted)", fontStyle: "italic", textAlign: "center" }}>
            Demand letter · Return Receipt Requested
          </div>
        </div>
      </div>
    </div>
  );
}

/* 04 — Case file folder with tab */
function CaseFolder() {
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 340 }}>
      {/* Tab */}
      <div style={{ position: "relative", marginLeft: 28, background: "#e8d8a8", borderRadius: "8px 8px 0 0", padding: "8px 18px 6px", display: "inline-block", border: "1px solid #c5b78a", borderBottom: "none" }}>
        <div style={{ fontFamily: "ui-monospace, monospace", fontSize: 10, letterSpacing: "0.16em", fontWeight: 700, color: "#5b5648" }}>CASE No. 26-CV-04217</div>
      </div>
      <div style={{ position: "relative", background: "#f3e6c4", border: "1px solid #c5b78a", borderRadius: "0 12px 12px 12px", padding: 26, boxShadow: "0 22px 50px -28px rgba(31,27,22,0.32)" }}>
        {/* Stack of papers peeking */}
        <div style={{ position: "absolute", top: -6, right: 24, width: 86, height: 14, background: "#fff", border: "1px solid var(--hairline)", borderRadius: "6px 6px 0 0", transform: "rotate(2deg)" }} />
        <div style={{ position: "absolute", top: -8, right: 40, width: 86, height: 14, background: "#fefcf3", border: "1px solid var(--hairline)", borderRadius: "6px 6px 0 0", transform: "rotate(-3deg)" }} />

        <div style={{ background: "#fefcf3", border: "1px solid var(--hairline)", borderRadius: 4, padding: 18, marginTop: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12, paddingBottom: 8, borderBottom: "1px solid var(--hairline)" }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700, color: "var(--muted)" }}>Plaintiff</div>
              <div style={{ fontFamily: "Newsreader", fontSize: 16, fontWeight: 700, color: "var(--ink)" }}>Tenant, J.</div>
            </div>
            <div style={{ fontFamily: "Geist", fontSize: 10, color: "var(--muted)" }}>Filed Apr 21, 2026</div>
          </div>
          <div style={{ fontFamily: "Newsreader", fontStyle: "italic", fontSize: 14, color: "var(--ink)", marginBottom: 12 }}>
            v. Oakwood Properties LLC
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12, color: "var(--ink-2)" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}><span>Cause of action</span><strong style={{ color: "var(--ink)" }}>§ 1950.5 deposit</strong></div>
            <div style={{ display: "flex", justifyContent: "space-between" }}><span>Demand</span><strong style={{ color: "var(--accent)" }}>$4,500</strong></div>
            <div style={{ display: "flex", justifyContent: "space-between" }}><span>Hearing</span><strong style={{ color: "var(--ink)" }}>May 28</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 05 — Verdict stamp moment */
function VerdictStamp() {
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 340, background: "#fefcf3", border: "1px solid var(--hairline)", padding: "32px 28px", borderRadius: 6, boxShadow: "0 22px 50px -28px rgba(31,27,22,0.3)", transform: "rotate(-0.6deg)" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 12, color: "var(--ink-2)", lineHeight: 1.55 }}>
        <div style={{ height: 6, background: "rgba(31,27,22,0.18)", borderRadius: 3, width: "65%" }} />
        <div style={{ height: 6, background: "rgba(31,27,22,0.18)", borderRadius: 3, width: "92%" }} />
        <div style={{ height: 6, background: "rgba(31,27,22,0.18)", borderRadius: 3, width: "78%" }} />
        <div style={{ height: 6, background: "rgba(31,27,22,0.18)", borderRadius: 3, width: "45%" }} />
      </div>
      <div style={{ position: "absolute", top: "50%", right: 24, transform: "translateY(-50%) rotate(-4deg)", border: "3px solid var(--accent)", borderRadius: 8, padding: "10px 18px", background: "rgba(217,64,46,0.08)", animation: "stampDrop 1.2s cubic-bezier(.5,1.6,.4,1) both" }}>
        <div style={{ fontFamily: "Geist", fontSize: 11, letterSpacing: "0.22em", fontWeight: 800, color: "var(--accent)" }}>AWARDED</div>
        <div style={{ fontFamily: "Newsreader", fontWeight: 700, fontSize: 26, color: "var(--accent)", letterSpacing: "-0.02em", marginTop: 2 }}>$4,500</div>
      </div>
      <div style={{ marginTop: 28, paddingTop: 16, borderTop: "1px dashed var(--hairline)", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <div style={{ fontFamily: "Caveat", fontStyle: "italic", fontSize: 22, color: "var(--ink)" }}>Hon. R. Mendez</div>
        <div style={{ fontFamily: "Geist", fontSize: 10, color: "var(--muted)", letterSpacing: "0.12em" }}>JUDGMENT · MAY 28</div>
      </div>
    </div>
  );
}

/* 06 — Vertical timeline */
function VerticalTimeline() {
  const STEPS = [
    { day: "Day 0", label: "Demand letter sent" },
    { day: "Day 14", label: "No response — file" },
    { day: "Day 30", label: "Service of process" },
    { day: "Day 60", label: "Hearing · Awarded" },
  ];
  return (
    <div style={{ position: "relative", paddingLeft: 28, width: "100%", maxWidth: 320 }}>
      <div style={{ position: "absolute", left: 11, top: 16, bottom: 16, width: 1, background: "rgba(31,27,22,0.15)" }} />
      <div style={{ position: "absolute", left: 5, width: 14, height: 14, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 0 6px rgba(217,64,46,0.18)", animation: "travelDot 5s ease-in-out infinite alternate" }} />
      {STEPS.map((s, i) => (
        <div key={s.day} style={{ position: "relative", paddingBottom: i === STEPS.length - 1 ? 0 : 22 }}>
          <div style={{ position: "absolute", left: -23, top: 4, width: 10, height: 10, borderRadius: "50%", background: "var(--ink)", border: "2px solid var(--bg-2)" }} />
          <div style={{ fontFamily: "Geist", fontSize: 10.5, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700, color: "var(--accent)", marginBottom: 2 }}>{s.day}</div>
          <div style={{ fontFamily: "Newsreader", fontSize: 15, color: "var(--ink)", lineHeight: 1.3 }}>{s.label}</div>
        </div>
      ))}
      <div style={{ marginTop: 18, paddingTop: 12, borderTop: "1px dashed rgba(31,27,22,0.12)", fontSize: 12, color: "var(--ink-2)" }}>
        Average path: <strong style={{ color: "var(--ink)" }}>30 to 90 days</strong> from demand to judgment.
      </div>
    </div>
  );
}

/* 07 — State pins on faded map */
function StatePins() {
  const PINS = [
    { x: 18, y: 60, label: "$4,500", state: "CA" },
    { x: 38, y: 70, label: "$6,200", state: "TX" },
    { x: 78, y: 35, label: "$3,800", state: "NY" },
    { x: 70, y: 70, label: "$2,800", state: "FL" },
    { x: 52, y: 50, label: "$5,400", state: "IL" },
  ];
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 360 }}>
      <div style={{ position: "relative", aspectRatio: "16/10", background: "rgba(31,27,22,0.04)", borderRadius: 14, padding: 16, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/map-background.png')", backgroundSize: "120% auto", backgroundPosition: "center", backgroundRepeat: "no-repeat", opacity: 0.55 }} aria-hidden />
        {PINS.map((p, i) => (
          <div
            key={p.state}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: `${p.y}%`,
              transform: "translate(-50%, -100%)",
              animation: `pinDrop 0.5s ease-out ${i * 0.3}s both`,
            }}
          >
            <div style={{ background: "var(--accent)", color: "#fff", padding: "4px 8px", borderRadius: 6, fontSize: 11, fontWeight: 700, fontFamily: "Geist", boxShadow: "0 6px 14px -4px rgba(217,64,46,0.5)", whiteSpace: "nowrap" }}>
              {p.label}
            </div>
            <div style={{ width: 0, height: 0, borderLeft: "4px solid transparent", borderRight: "4px solid transparent", borderTop: "5px solid var(--accent)", margin: "0 auto" }} />
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "baseline", fontSize: 12, color: "var(--ink-2)" }}>
        <span style={{ fontFamily: "Geist", letterSpacing: "0.16em", textTransform: "uppercase", fontSize: 10.5, fontWeight: 700, color: "var(--accent)" }}>Recovery by state</span>
        <span style={{ fontStyle: "italic" }}>illustrative · varies</span>
      </div>
    </div>
  );
}

/* 08 — Stacked glass stats */
function GlassStack() {
  const STATS = [
    { eyebrow: "Average recovery", value: "$4,287", sub: "across all categories" },
    { eyebrow: "Filing → judgment", value: "47 days", sub: "median timeline" },
    { eyebrow: "Win rate", value: "71%", sub: "with documented case" },
  ];
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 340, padding: 16 }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 30% 20%, rgba(217,64,46,0.45), transparent 50%), radial-gradient(circle at 80% 80%, rgba(245,178,159,0.4), transparent 50%), linear-gradient(135deg, #fed8c1, #f3e8d6)", borderRadius: 18 }} aria-hidden />
      <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 12 }}>
        {STATS.map((s, i) => (
          <div
            key={s.eyebrow}
            style={{
              background: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(20px) saturate(140%)",
              WebkitBackdropFilter: "blur(20px) saturate(140%)",
              border: "1px solid rgba(255,255,255,0.8)",
              borderRadius: 14,
              padding: "16px 20px",
              boxShadow: "0 12px 28px -16px rgba(31,27,22,0.18)",
              animation: `fadeUp 0.5s ease-out ${i * 0.18}s both`,
              marginLeft: i === 1 ? 24 : 0,
              marginRight: i === 2 ? 24 : 0,
            }}
          >
            <div style={{ fontFamily: "Geist", fontSize: 10.5, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700, color: "var(--accent)" }}>{s.eyebrow}</div>
            <div style={{ fontFamily: "Newsreader", fontWeight: 700, fontSize: 32, color: "var(--ink)", letterSpacing: "-0.02em", marginTop: 2 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: "var(--ink-2)", marginTop: 2 }}>{s.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

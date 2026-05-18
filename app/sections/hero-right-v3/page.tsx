"use client";

import { useEffect, useState } from "react";

export default function HeroRightV3Preview() {
  return (
    <main style={{ padding: "40px 0", background: "var(--bg)", minHeight: "100vh" }}>
      <div className="wrap">
        <header style={{ marginBottom: 32 }}>
          <span className="eyebrow" style={{ color: "var(--accent)" }}>Preview · noindex · v3</span>
          <h1 style={{ fontFamily: "var(--font-newsreader)", fontWeight: 700, fontSize: 40, margin: "8px 0 8px" }}>
            Hero right-side options &mdash; category hubs
          </h1>
          <p style={{ color: "var(--ink-2)", maxWidth: "60ch" }}>
            Six fresh, content-rich options to replace the case folder on category hub heroes.
            Each panel uses landlord-themed sample data.
          </p>
        </header>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          <Slot n={1} title="Anatomy of a winning case — checklist">
            <Anatomy />
          </Slot>
          <Slot n={2} title="Claim recovery layers — stacking tiers">
            <RecoveryLayers />
          </Slot>
          <Slot n={3} title="Stacked glass stats (3 floating cards)">
            <GlassStack />
          </Slot>
          <Slot n={4} title="Award certificate mockup">
            <Certificate />
          </Slot>
          <Slot n={5} title="Recent wins gallery — 3 stacked cards">
            <WinsGallery />
          </Slot>
          <Slot n={6} title="Photo + floating recovery card overlay">
            <PhotoOverlay />
          </Slot>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulseDot { 0%,100% { box-shadow: 0 0 0 0 rgba(217,64,46,0.6); } 50% { box-shadow: 0 0 0 8px rgba(217,64,46,0); } }
        @keyframes slideIn { from { opacity: 0; transform: translateX(12px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes growUp { from { opacity: 0; transform: scaleY(0.6); } to { opacity: 1; transform: scaleY(1); } }
        @keyframes spinSeal { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
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
      <div style={{ background: "var(--bg-2)", border: "1px solid var(--hairline)", borderRadius: 16, padding: 28, minHeight: 460, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {children}
      </div>
    </div>
  );
}

/* 01 — Anatomy of a winning case */
function Anatomy() {
  const ITEMS = [
    { label: "Signed lease + move-in walkthrough", strong: true },
    { label: "Photos of unit at move-out (timestamped)" },
    { label: "Forwarding-address letter (certified)" },
    { label: "Demand letter citing § 1950.5" },
    { label: "Itemized recovery math (deposit + 2x)" },
    { label: "21-day deadline expired without response" },
  ];
  return (
    <div style={{ width: "100%", maxWidth: 360, background: "#fff", border: "1px solid var(--hairline)", borderRadius: 18, padding: "22px 24px", boxShadow: "0 18px 40px -22px rgba(31,27,22,0.18)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, paddingBottom: 12, borderBottom: "1px solid var(--hairline)" }}>
        <div style={{ fontFamily: "var(--font-geist)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700, color: "var(--accent)" }}>Anatomy of a win</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, color: "var(--ink-2)" }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)", animation: "pulseDot 1.6s ease-in-out infinite" }} />
          6 / 6
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {ITEMS.map((item, i) => (
          <div
            key={item.label}
            style={{ display: "flex", alignItems: "flex-start", gap: 10, animation: `slideIn 0.4s ease-out ${i * 0.18}s both` }}
          >
            <span style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(217,64,46,0.14)", color: "var(--accent)", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12l5 5L20 7" />
              </svg>
            </span>
            <span style={{ fontSize: 13.5, lineHeight: 1.4, color: item.strong ? "var(--ink)" : "var(--ink-2)", fontWeight: item.strong ? 700 : 500 }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 16, paddingTop: 12, borderTop: "1px dashed var(--hairline)", display: "flex", justifyContent: "space-between", alignItems: "baseline", fontSize: 12, color: "var(--ink-2)" }}>
        <span>Avg time to judgment</span>
        <strong style={{ color: "var(--ink)", fontFamily: "var(--font-newsreader)", fontSize: 16 }}>47 days</strong>
      </div>
    </div>
  );
}

/* 02 — Claim recovery layers stacking */
function RecoveryLayers() {
  const LAYERS = [
    { label: "Direct deposit", value: "$1,500", h: 55, color: "#1f1b16" },
    { label: "2x statutory penalty", value: "$3,000", h: 95, color: "var(--accent)" },
    { label: "Fees + interest", value: "$170", h: 12, color: "#9ba37e" },
  ];
  const total = "$4,670";
  return (
    <div style={{ width: "100%", maxWidth: 340, background: "#fff", border: "1px solid var(--hairline)", borderRadius: 18, padding: "22px 24px", boxShadow: "0 18px 40px -22px rgba(31,27,22,0.18)" }}>
      <div style={{ fontFamily: "var(--font-geist)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700, color: "var(--accent)", marginBottom: 4 }}>Recovery layers</div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 14, height: 140, margin: "16px 0 18px" }}>
        {LAYERS.map((l, i) => (
          <div key={l.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flex: 1 }}>
            <div style={{ fontFamily: "var(--font-newsreader)", fontWeight: 700, fontSize: 14, color: l.color }}>{l.value}</div>
            <div style={{ width: "100%", background: l.color, height: l.h, borderRadius: "8px 8px 0 0", animation: `growUp 0.7s cubic-bezier(.34,1.56,.64,1) ${0.1 + i * 0.18}s both`, transformOrigin: "bottom" }} />
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {LAYERS.map((l) => (
          <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12.5 }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, background: l.color }} />
            <span style={{ flex: 1, color: "var(--ink-2)" }}>{l.label}</span>
            <strong style={{ color: "var(--ink)", fontFamily: "var(--font-newsreader)" }}>{l.value}</strong>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 14, paddingTop: 12, borderTop: "2px dashed rgba(217,64,46,0.4)", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, color: "var(--accent)" }}>Estimated total</span>
        <span style={{ fontFamily: "var(--font-newsreader)", fontWeight: 700, fontSize: 28, color: "var(--accent)" }}>{total}</span>
      </div>
    </div>
  );
}

/* 03 — Stacked glass stats */
function GlassStack() {
  const STATS = [
    { eyebrow: "Average recovery", value: "$4,287", sub: "across 12,847 cases" },
    { eyebrow: "Filing → judgment", value: "47 days", sub: "median timeline" },
    { eyebrow: "Win rate", value: "71%", sub: "with documented case" },
  ];
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 340, padding: 20 }}>
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
            <div style={{ fontFamily: "var(--font-geist)", fontSize: 10.5, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700, color: "var(--accent)" }}>{s.eyebrow}</div>
            <div style={{ fontFamily: "var(--font-newsreader)", fontWeight: 700, fontSize: 32, color: "var(--ink)", letterSpacing: "-0.02em", marginTop: 2 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: "var(--ink-2)", marginTop: 2 }}>{s.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 04 — Award certificate */
function Certificate() {
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 360, background: "#fefcf3", border: "8px double var(--accent)", borderRadius: 4, padding: "28px 24px", textAlign: "center", fontFamily: "Newsreader, Georgia, serif", boxShadow: "0 22px 50px -28px rgba(31,27,22,0.32)", transform: "rotate(-0.5deg)" }}>
      {/* Spinning seal */}
      <div style={{ position: "absolute", bottom: -22, right: -22, width: 84, height: 84, animation: "spinSeal 30s linear infinite" }}>
        <svg viewBox="0 0 100 100" width="84" height="84" style={{ display: "block" }}>
          <defs>
            <path id="circ" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
          </defs>
          <text fill="var(--accent)" fontSize="9" fontFamily="var(--font-geist)" letterSpacing="3" fontWeight="700">
            <textPath href="#circ">CERTIFIED · SMALL CLAIMS · CIVIL · 2026 ·</textPath>
          </text>
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", color: "var(--accent)" }}>
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M12 2l3 6 6 1-4.5 4 1 6-5.5-3-5.5 3 1-6L3 9l6-1z" />
          </svg>
        </div>
      </div>

      <div style={{ fontSize: 10, letterSpacing: "0.32em", color: "var(--accent)", fontWeight: 700, textTransform: "uppercase" }}>State of California</div>
      <div style={{ fontFamily: "var(--font-caveat)", fontStyle: "italic", fontSize: 28, color: "var(--ink)", marginTop: 6 }}>Certificate of</div>
      <div style={{ fontWeight: 800, fontSize: 36, color: "var(--ink)", letterSpacing: "-0.02em", lineHeight: 1, marginTop: 2 }}>Judgment</div>
      <div style={{ width: 80, height: 1, background: "var(--ink)", margin: "16px auto" }} />
      <div style={{ fontStyle: "italic", color: "var(--ink-2)", fontSize: 13.5 }}>Awarded in favor of</div>
      <div style={{ fontFamily: "var(--font-caveat)", fontSize: 26, color: "var(--ink)", marginTop: 4 }}>Tenant, J.</div>
      <div style={{ marginTop: 10 }}>
        <div style={{ fontSize: 10.5, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700, color: "var(--muted)" }}>Total awarded</div>
        <div style={{ fontWeight: 800, fontSize: 32, color: "var(--accent)", letterSpacing: "-0.02em", marginTop: 2 }}>$4,500</div>
      </div>
      <div style={{ marginTop: 12, fontSize: 10, color: "var(--muted)", letterSpacing: "0.16em", textTransform: "uppercase" }}>Case 26-CV-04217 · May 28, 2026</div>
    </div>
  );
}

/* 05 — Recent wins gallery */
function WinsGallery() {
  const WINS = [
    { who: "Maria · CA", label: "Security deposit + 2x", amount: "$4,500", days: "47 days", tilt: -2 },
    { who: "Marcus · TX", label: "Wrongful eviction", amount: "$8,100", days: "62 days", tilt: 1.5 },
    { who: "Renee · NY", label: "Mold habitability", amount: "$3,200", days: "38 days", tilt: -1 },
  ];
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 340, padding: "8px 4px" }}>
      <div style={{ fontFamily: "var(--font-geist)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700, color: "var(--accent)", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)", animation: "pulseDot 1.6s ease-in-out infinite" }} />
        Recent wins
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {WINS.map((w, i) => (
          <div
            key={w.who}
            style={{
              background: "#fff",
              border: "1px solid var(--hairline)",
              borderRadius: 12,
              padding: "14px 18px",
              boxShadow: "0 12px 24px -16px rgba(31,27,22,0.18)",
              transform: `rotate(${w.tilt}deg)`,
              animation: `fadeUp 0.5s ease-out ${i * 0.18}s both`,
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: 6,
              alignItems: "baseline",
            }}
          >
            <div style={{ fontFamily: "var(--font-newsreader)", fontWeight: 700, fontSize: 17, color: "var(--ink)" }}>{w.amount}</div>
            <div style={{ fontFamily: "var(--font-geist)", fontSize: 11, color: "var(--muted)", letterSpacing: "0.06em" }}>{w.days}</div>
            <div style={{ fontStyle: "italic", color: "var(--ink-2)", fontSize: 13, fontFamily: "var(--font-newsreader)" }}>&ldquo;{w.label}&rdquo;</div>
            <div style={{ fontSize: 11, color: "var(--muted)", textAlign: "right" }}>{w.who}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 06 — Photo + floating overlay card */
function PhotoOverlay() {
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 340 }}>
      <div style={{ position: "relative", borderRadius: 18, overflow: "hidden", aspectRatio: "5/6", boxShadow: "0 24px 50px -28px rgba(31,27,22,0.32)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=720&fit=crop" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.65) 100%)" }} aria-hidden />
        {/* Stamp top-left */}
        <div style={{ position: "absolute", top: 18, left: 18, padding: "4px 10px", background: "rgba(217,64,46,0.95)", color: "#fff", fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", borderRadius: 4, fontFamily: "var(--font-geist)" }}>
          Awarded
        </div>
      </div>
      {/* Floating card overlapping bottom-right */}
      <div style={{ position: "absolute", right: -8, bottom: -22, background: "#fff", borderRadius: 14, padding: "16px 20px", boxShadow: "0 22px 50px -22px rgba(31,27,22,0.4)", maxWidth: 220, animation: "fadeUp 0.6s ease-out 0.4s both" }}>
        <div style={{ fontFamily: "var(--font-geist)", fontSize: 10.5, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700, color: "var(--accent)" }}>Tenant recovery</div>
        <div style={{ fontFamily: "var(--font-newsreader)", fontWeight: 700, fontSize: 28, color: "var(--ink)", letterSpacing: "-0.02em", marginTop: 2, lineHeight: 1 }}>$4,500</div>
        <div style={{ fontSize: 11.5, color: "var(--ink-2)", marginTop: 4 }}>Won in <strong style={{ color: "var(--ink)" }}>47 days</strong> · CA</div>
      </div>
    </div>
  );
}

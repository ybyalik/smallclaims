import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Section library (private)",
  robots: { index: false, follow: false, nocache: true },
};

// Internal page. Add reusable section examples here. When we want to build a
// new page we point at this file and pick the sections to compose.

function Label({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        background: "rgba(20,20,20,0.92)",
        color: "#fef9f1",
        padding: "10px 24px",
        fontSize: 12,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        fontWeight: 600,
        backdropFilter: "blur(6px)",
      }}
    >
      <span style={{ opacity: 0.55, marginRight: 8 }}>{id}</span>
      <span>{children}</span>
    </div>
  );
}

export default function SectionsPage() {
  return (
    <main style={{ background: "#fff" }}>
      <div
        style={{
          padding: "60px 24px 28px",
          background: "linear-gradient(180deg, #faf8f4 0%, #fff 100%)",
          borderBottom: "1px solid var(--hairline)",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontFamily: "Newsreader, Georgia, serif",
            fontWeight: 700,
            fontSize: 42,
            letterSpacing: "-0.02em",
            margin: 0,
          }}
        >
          Section library
        </h1>
        <p style={{ color: "var(--muted)", fontSize: 15, margin: "10px 0 0" }}>
          Private reference. Add design examples here; we&rsquo;ll reuse them on real pages.
        </p>
      </div>

      {/* ============================================================
           1. Centered hero with single CTA
           ============================================================ */}
      <Label id="01">Centered hero — headline + lede + single CTA</Label>
      <SectionCenteredHero />

      {/* ============================================================
           2. Flowchart card — input → AI core → output options
           ============================================================ */}
      <Label id="02">Flowchart card — central node fans out to options</Label>
      <SectionFlowchart />

      {/* ============================================================
           3. Stats bar — dark band with title + 3 numbers
           ============================================================ */}
      <Label id="03">Stats bar — dark band, title block + 3 numbers</Label>
      <SectionStatsBar />

      <div style={{ padding: "60px 0", background: "var(--bg-2)", textAlign: "center" }}>
        <p style={{ color: "var(--muted)", fontSize: 13 }}>
          End of library. <Link href="/" style={{ color: "var(--ink)" }}>Back home</Link>
        </p>
      </div>
    </main>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   01. Centered hero
   ───────────────────────────────────────────────────────────────────── */
function SectionCenteredHero() {
  return (
    <section
      style={{
        background: "var(--bg-2)",
        padding: "96px 24px 88px",
      }}
    >
      <div style={{ maxWidth: 880, margin: "0 auto", textAlign: "center" }}>
        <h2
          style={{
            fontFamily: "Newsreader, Georgia, serif",
            fontWeight: 700,
            fontSize: "clamp(36px, 5vw, 64px)",
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            color: "var(--ink)",
            margin: "0 0 24px",
          }}
        >
          Helping businesses thrive with smarter <em style={{ fontStyle: "italic", color: "var(--accent)", fontWeight: 700 }}>accounting management</em>
        </h2>
        <p
          style={{
            fontSize: 17,
            lineHeight: 1.6,
            color: "var(--ink-2)",
            maxWidth: 560,
            margin: "0 auto 32px",
          }}
        >
          With a deep understanding of finance, compliance, and strategy. Helping you drive
          growth, control costs, and stay ahead of change.
        </p>
        <a
          href="#"
          className="btn"
          style={{
            background: "var(--accent)",
            color: "#fff",
            padding: "16px 28px",
            fontSize: 15,
            fontWeight: 600,
            borderRadius: 12,
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            border: 0,
          }}
        >
          More about us
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="16" height="16">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   02. Flowchart card
   ───────────────────────────────────────────────────────────────────── */
function SectionFlowchart() {
  const rightOptions = [
    { label: "Optimize tax strategy", muted: true },
    { label: "Optimize tax strategy", muted: true },
    { label: "Evaluate investment opportunities", muted: false },
    { label: "Improve financial forecasting", muted: false },
    { label: "Improve financial forecasting", muted: true },
  ];

  return (
    <section style={{ background: "var(--bg-2)", padding: "0 24px 80px" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div
          style={{
            background: "#fff",
            borderRadius: 24,
            padding: "44px 56px",
            position: "relative",
            boxShadow: "0 18px 50px -28px rgba(31,27,22,0.18)",
          }}
        >
          <div
            style={{
              fontFamily: "Newsreader, Georgia, serif",
              fontWeight: 600,
              fontSize: 17,
              color: "var(--ink)",
              marginBottom: 56,
            }}
          >
            Accounting management firm
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr auto 1fr",
              alignItems: "center",
              gap: 0,
              minHeight: 220,
              position: "relative",
            }}
          >
            {/* Left pill */}
            <div
              style={{
                background: "var(--bg-2)",
                color: "var(--ink)",
                padding: "12px 22px",
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 500,
                whiteSpace: "nowrap",
              }}
            >
              Your financial records
            </div>

            {/* Connector line 1 */}
            <div
              style={{
                height: 1,
                background:
                  "repeating-linear-gradient(to right, var(--hairline) 0 6px, transparent 6px 12px)",
                margin: "0 8px",
              }}
            />

            {/* Center AI core */}
            <div
              style={{
                width: 88,
                height: 88,
                background: "linear-gradient(135deg, #f4d35e 0%, #f5b660 100%)",
                borderRadius: 14,
                display: "grid",
                placeItems: "center",
                boxShadow:
                  "0 0 0 6px rgba(245,182,96,0.18), 0 12px 28px -10px rgba(217,64,46,0.35)",
                position: "relative",
              }}
            >
              {/* 4-point star */}
              <svg viewBox="0 0 48 48" width="46" height="46" fill="var(--accent)">
                <path d="M24 4 L26.8 21.2 L44 24 L26.8 26.8 L24 44 L21.2 26.8 L4 24 L21.2 21.2 Z" />
              </svg>
            </div>

            {/* Connector + shield */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, paddingLeft: 20 }}>
              <div
                style={{
                  flex: 1,
                  height: 1,
                  background:
                    "repeating-linear-gradient(to right, var(--hairline) 0 6px, transparent 6px 12px)",
                }}
              />
              <div
                style={{
                  width: 36,
                  height: 36,
                  border: "1px solid var(--hairline)",
                  borderRadius: 8,
                  display: "grid",
                  placeItems: "center",
                  background: "#fff",
                }}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--accent)" strokeWidth="1.8">
                  <path d="M12 2l9 4v6c0 5-4 9-9 10-5-1-9-5-9-10V6l9-4z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <div
                style={{
                  flex: 0,
                  width: 24,
                  height: 1,
                  background:
                    "repeating-linear-gradient(to right, var(--hairline) 0 6px, transparent 6px 12px)",
                }}
              />
            </div>

            {/* Right options column */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                paddingLeft: 16,
              }}
            >
              {rightOptions.map((o, i) => (
                <div
                  key={i}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: o.muted ? "rgba(245,243,238,0.5)" : "var(--bg-2)",
                    color: o.muted ? "rgba(14,14,14,0.4)" : "var(--ink)",
                    padding: "9px 18px",
                    borderRadius: 999,
                    fontSize: 13.5,
                    fontWeight: 500,
                    width: "fit-content",
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 50,
                      background: o.muted ? "rgba(245,182,96,0.4)" : "var(--accent)",
                    }}
                  />
                  {o.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   03. Stats bar
   ───────────────────────────────────────────────────────────────────── */
function SectionStatsBar() {
  return (
    <section style={{ background: "var(--bg-2)", padding: "0 24px 96px" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div
          style={{
            background: "#1a1714",
            color: "#fef9f1",
            borderRadius: 18,
            padding: "32px 40px",
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
            alignItems: "center",
            gap: 0,
          }}
        >
          {/* Title block */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, paddingRight: 24 }}>
            <div
              style={{
                width: 36,
                height: 36,
                flexShrink: 0,
                position: "relative",
              }}
            >
              {/* Pie-chart inspired icon */}
              <svg viewBox="0 0 36 36" width="36" height="36">
                <circle cx="18" cy="18" r="16" fill="#fef9f1" />
                <path d="M18 18 L18 2 A16 16 0 0 1 32 22 Z" fill="var(--accent)" />
                <path d="M18 18 L32 22 A16 16 0 0 1 22 33 Z" fill="#f5b660" />
              </svg>
            </div>
            <h3
              style={{
                fontFamily: "Newsreader, Georgia, serif",
                fontWeight: 700,
                fontSize: 22,
                lineHeight: 1.15,
                letterSpacing: "-0.015em",
                margin: 0,
                color: "#fef9f1",
              }}
            >
              Statistical proof
              <br />
              of our value
            </h3>
          </div>

          {/* Stat 1 */}
          <Stat n="150+" label="Business empowered" first />
          {/* Stat 2 */}
          <Stat n="$500M+" label="In transactions managed" />
          {/* Stat 3 */}
          <Stat n="10+" label="Years of experience" />
        </div>
      </div>
    </section>
  );
}

function Stat({ n, label, first }: { n: string; label: string; first?: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 6,
        padding: "0 24px",
        borderLeft: first ? "1px solid rgba(254,249,241,0.18)" : "1px solid rgba(254,249,241,0.18)",
      }}
    >
      <div
        style={{
          fontFamily: "Newsreader, Georgia, serif",
          fontWeight: 700,
          fontSize: 28,
          letterSpacing: "-0.02em",
          color: "#fef9f1",
        }}
      >
        {n}
      </div>
      <div
        style={{
          fontSize: 13.5,
          color: "rgba(254,249,241,0.7)",
          lineHeight: 1.4,
          maxWidth: 14,
        }}
      >
        <span style={{ display: "block", maxWidth: "20ch" }}>{label}</span>
      </div>
    </div>
  );
}

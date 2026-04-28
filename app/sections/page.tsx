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

      {/* ============================================================
           4. Feature mosaic — text left, stacked product cards right, dark bg
           ============================================================ */}
      <Label id="04">Feature mosaic — copy left, stacked product cards right (dark)</Label>
      <SectionFeatureMosaic />

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

/* ─────────────────────────────────────────────────────────────────────
   04. Feature mosaic — dark bg, copy left, stacked product cards right
   ───────────────────────────────────────────────────────────────────── */
const AVATARS = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=80&h=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
];

function AvatarStack({ count = 3 }: { count?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div style={{ display: "flex" }}>
        {AVATARS.slice(0, count).map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={src}
            alt=""
            style={{
              width: 26,
              height: 26,
              borderRadius: "50%",
              border: "2px solid #fff",
              marginLeft: i === 0 ? 0 : -8,
              objectFit: "cover",
            }}
          />
        ))}
      </div>
      <span
        style={{
          fontSize: 11,
          fontWeight: 600,
          padding: "3px 8px",
          background: "#f3eee5",
          borderRadius: 999,
          color: "#0c2a26",
        }}
      >
        +3
      </span>
    </div>
  );
}

function ProjectRow({ title, count, days, attached }: { title: string; count: string; days: string; attached: string }) {
  return (
    <div style={{ paddingTop: 12 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: "#0c2a26" }}>{title}</div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
        <div>
          <div style={{ fontSize: 10.5, color: "#7a8b87", marginBottom: 6 }}>Assign to</div>
          <AvatarStack />
        </div>
        <div style={{ display: "flex", gap: 12, fontSize: 11, color: "#7a8b87", alignItems: "center" }}>
          <Meta icon="💬" v={count} />
          <Meta icon="🕒" v={days} />
          <Meta icon="📎" v={attached} />
        </div>
      </div>
    </div>
  );
}
function Meta({ icon, v }: { icon: string; v: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, opacity: 0.85 }}>
      <span style={{ fontSize: 11 }}>{icon}</span>
      <span>{v}</span>
    </span>
  );
}

function SectionFeatureMosaic() {
  return (
    <section
      style={{
        background: "#0a2622",
        color: "#fef9f1",
        padding: "120px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle radial accent in top-right */}
      <div
        style={{
          position: "absolute",
          right: -120,
          top: -120,
          width: 520,
          height: 520,
          background: "radial-gradient(circle, rgba(217,64,46,0.08), transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 64,
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* LEFT — copy */}
        <div>
          <span
            style={{
              display: "inline-block",
              padding: "8px 16px",
              border: "1px solid rgba(254,249,241,0.15)",
              borderRadius: 999,
              fontSize: 12.5,
              fontWeight: 500,
              marginBottom: 24,
              color: "#fef9f1",
            }}
          >
            Special features
          </span>
          <h2
            style={{
              fontFamily: "Newsreader, Georgia, serif",
              fontWeight: 700,
              fontSize: "clamp(36px, 4.4vw, 56px)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              margin: "0 0 24px",
              color: "#fef9f1",
            }}
          >
            More features make your <em style={{ fontStyle: "italic", color: "#f5b29f", fontWeight: 700 }}>life easier</em>
          </h2>
          <p
            style={{
              fontSize: 15.5,
              lineHeight: 1.6,
              color: "rgba(254,249,241,0.7)",
              maxWidth: "44ch",
              margin: "0 0 36px",
            }}
          >
            These features collectively provide a comprehensive platform for project managers
            and teams to effectively plan, execute, and complete projects.
          </p>

          {/* Bullet list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 28, marginBottom: 36 }}>
            <FeatureBullet
              title="Assign projects"
              body="Facilitates collaboration by enabling team members to know who is responsible for each task, fostering communication and coordination."
            />
            <FeatureBullet
              title="Integrations"
              body="Integration tools play a crucial role in the modern software landscape by enabling disparate systems and applications to communicate, share data, and work together seamlessly."
            />
          </div>

          {/* Foot link */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "rgba(254,249,241,0.7)" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#fef9f1" }} />
            To know about our all special features please{" "}
            <a
              href="#"
              style={{
                color: "#f5b29f",
                textDecoration: "underline",
                textUnderlineOffset: 3,
                marginLeft: -4,
              }}
            >
              explore all features
            </a>
          </div>
        </div>

        {/* RIGHT — stacked product cards with hand-drawn arrow */}
        <div style={{ position: "relative", height: 540 }}>
          {/* Hand-drawn arrow pointing from upper-left toward the cards */}
          <svg
            viewBox="0 0 200 180"
            style={{ position: "absolute", left: -20, top: -40, width: 200, height: 180, pointerEvents: "none" }}
          >
            <path
              d="M 30 20 C 60 30, 100 30, 120 60 C 130 80, 100 90, 90 110 C 80 130, 110 140, 140 150"
              stroke="#e85d3e"
              strokeWidth="2.4"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 132 142 L 140 152 L 130 154"
              stroke="#e85d3e"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>

          {/* Card 1 — Integrations (back/leftmost) */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 110,
              width: 270,
              background: "#fdf9f1",
              color: "#0c2a26",
              borderRadius: 18,
              padding: "20px 22px",
              boxShadow: "0 30px 60px -30px rgba(0,0,0,0.6)",
              zIndex: 1,
            }}
          >
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 14, fontFamily: "Newsreader, Georgia, serif" }}>
              Integrations
            </div>
            <div style={{ fontSize: 11.5, color: "#7a8b87", marginBottom: 6 }}>Connected apps</div>
            <input
              placeholder="Search"
              style={{
                width: "100%",
                padding: "8px 12px",
                fontSize: 12,
                background: "#f1ece1",
                border: 0,
                borderRadius: 8,
                marginBottom: 14,
              }}
              readOnly
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <AppRow icon="▶" label="Nextpress" sub="Social Network" toggle="off" iconBg="#1e6cf7" />
              <AppRow icon="✕" label="Xetrole" sub="Social Network" toggle="off" iconBg="#0c2a26" />
              <AppRow icon="◊" label="Verox" sub="Social Network" toggle="on" iconBg="#e85d3e" />
              <AppRow icon="📍" label="Prello" sub="Social Network" toggle="off" iconBg="#e85d3e" />
            </div>
          </div>

          {/* Card 2 — My Task Today (middle, slightly right + up) */}
          <div
            style={{
              position: "absolute",
              left: 220,
              top: 0,
              width: 280,
              background: "#fdf9f1",
              color: "#0c2a26",
              borderRadius: 18,
              padding: "20px 22px",
              boxShadow: "0 30px 60px -30px rgba(0,0,0,0.6)",
              zIndex: 2,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <div style={{ fontSize: 15, fontWeight: 700, fontFamily: "Newsreader, Georgia, serif" }}>
                My Task Today
              </div>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  background: "#e8f1ec",
                  color: "#15614b",
                  padding: "4px 10px",
                  borderRadius: 999,
                }}
              >
                View all
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <TaskRow accent="#15614b" tag="UX" title="Creative Real Estate landing page UI Design" />
              <TaskRow accent="#15614b" tag="</>" title="Review Frontend Work" />
              <TaskRow accent="#e85d3e" tag="📱" title="Payment screen design" struck />
            </div>
          </div>

          {/* Card 3 — Assign Projects (front/rightmost) */}
          <div
            style={{
              position: "absolute",
              left: 130,
              top: 130,
              width: 320,
              background: "#fdf9f1",
              color: "#0c2a26",
              borderRadius: 18,
              padding: "20px 24px",
              boxShadow: "0 35px 70px -25px rgba(0,0,0,0.7)",
              zIndex: 3,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
              <div style={{ fontSize: 15, fontWeight: 700, fontFamily: "Newsreader, Georgia, serif" }}>
                Assign Projects
              </div>
              <span style={{ color: "#7a8b87" }}>⋮</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 6 }}>
              <ProjectRow title="Design projects" count="05" days="6days" attached="05" />
              <div style={{ height: 1, background: "#eee5d4" }} />
              <ProjectRow title="Marketing Projects" count="10" days="5days" attached="10" />
              <div style={{ height: 1, background: "#eee5d4" }} />
              <ProjectRow title="Front-End Projects" count="02" days="2days" attached="05" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureBullet({ title, body }: { title: string; body: string }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "32px 1fr", gap: 18, alignItems: "start" }}>
      <div
        style={{
          width: 24,
          height: 24,
          borderRadius: "50%",
          border: "1.5px solid rgba(232,93,62,0.4)",
          display: "grid",
          placeItems: "center",
          marginTop: 4,
        }}
      >
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#e85d3e" }} />
      </div>
      <div>
        <h4
          style={{
            fontFamily: "Newsreader, Georgia, serif",
            fontWeight: 700,
            fontSize: 22,
            margin: 0,
            color: "#fef9f1",
            letterSpacing: "-0.015em",
          }}
        >
          {title}
        </h4>
        <p style={{ fontSize: 14.5, lineHeight: 1.55, color: "rgba(254,249,241,0.65)", margin: "8px 0 0", maxWidth: "44ch" }}>
          {body}
        </p>
      </div>
    </div>
  );
}

function AppRow({
  icon, label, sub, toggle, iconBg,
}: { icon: string; label: string; sub: string; toggle: "on" | "off"; iconBg: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div
        style={{
          width: 30,
          height: 30,
          borderRadius: 8,
          background: iconBg,
          color: "#fff",
          display: "grid",
          placeItems: "center",
          fontSize: 14,
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12.5, fontWeight: 600 }}>{label}</div>
        <div style={{ fontSize: 10.5, color: "#7a8b87" }}>{sub}</div>
      </div>
      <div
        style={{
          width: 30,
          height: 18,
          borderRadius: 999,
          background: toggle === "on" ? "#15614b" : "#d8d0bf",
          position: "relative",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: "#fff",
            position: "absolute",
            top: 2,
            left: toggle === "on" ? 14 : 2,
            transition: "left .15s ease",
          }}
        />
      </div>
    </div>
  );
}

function TaskRow({ accent, tag, title, struck }: { accent: string; tag: string; title: string; struck?: boolean }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "32px 1fr 18px", gap: 12, alignItems: "center" }}>
      <div
        style={{
          width: 30,
          height: 30,
          borderRadius: 8,
          background: accent === "#e85d3e" ? "rgba(232,93,62,0.12)" : "rgba(21,97,75,0.12)",
          color: accent,
          display: "grid",
          placeItems: "center",
          fontSize: 11,
          fontWeight: 700,
        }}
      >
        {tag}
      </div>
      <div
        style={{
          fontSize: 12.5,
          lineHeight: 1.35,
          textDecoration: struck ? "line-through" : "none",
          color: struck ? "#9aaaa6" : "#0c2a26",
        }}
      >
        {title}
      </div>
      <div style={{ width: 16, height: 16, borderRadius: 4, border: "1.5px solid #d8d0bf" }} />
    </div>
  );
}

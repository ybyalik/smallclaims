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

      {/* ============================================================
           5. Integration orbit — centered headline, app logos on concentric arcs
           ============================================================ */}
      <Label id="05">Integration orbit — concentric arcs with floating app logos</Label>
      <SectionIntegrationOrbit />

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

/* ─────────────────────────────────────────────────────────────────────
   05. Integration orbit
   ───────────────────────────────────────────────────────────────────── */
function SectionIntegrationOrbit() {
  // Each logo positioned along one of three concentric arcs.
  // Coordinates are percentages relative to the orbit container.
  const logos = [
    // outer-most arc (furthest)
    { x: 12,  y: 70, size: 60, kind: "biz",   tilt: 6 },
    { x: 88,  y: 70, size: 60, kind: "wave",  tilt: -4 },
    { x: 22,  y: 80, size: 56, kind: "p",     tilt: -3 },
    { x: 78,  y: 78, size: 56, kind: "pin",   tilt: 4 },
    // middle arc
    { x: 28,  y: 50, size: 64, kind: "x",     tilt: 0 },
    { x: 72,  y: 52, size: 64, kind: "ps",    tilt: 0 },
    { x: 33,  y: 62, size: 50, kind: "tile",  tilt: 0 },
    { x: 67,  y: 64, size: 50, kind: "x",     tilt: 0 },
    // inner arc / closer to center
    { x: 50,  y: 28, size: 70, kind: "chev",  tilt: 0 },
    { x: 50,  y: 60, size: 44, kind: "pin",   tilt: 0 },
    { x: 41,  y: 75, size: 48, kind: "wave",  tilt: 0 },
    // bottom inner cluster
    { x: 35,  y: 90, size: 56, kind: "ps",    tilt: 0 },
  ];

  return (
    <section
      style={{
        background: "#faf6e9",
        padding: "80px 24px 60px",
        position: "relative",
        overflow: "hidden",
        backgroundImage:
          "linear-gradient(to right, rgba(60,40,30,0.04) 1px, transparent 1px)",
        backgroundSize: "calc(100%/12) 100%",
      }}
    >
      {/* decorative top-left crescent */}
      <svg style={{ position: "absolute", left: 110, top: 200, width: 56, height: 60 }} viewBox="0 0 60 60" fill="none">
        <path d="M 16 8 C 5 22, 5 38, 18 52" stroke="#143a30" strokeWidth="6" strokeLinecap="round" />
        <path d="M 22 12 C 12 24, 12 36, 22 48" stroke="#e85d3e" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
      </svg>
      {/* decorative bottom-right rings */}
      <div style={{ position: "absolute", right: 80, bottom: 90, display: "flex", gap: 8 }}>
        <div style={{ width: 32, height: 32, border: "2px solid #e85d3e", borderRadius: "50%" }} />
        <div style={{ width: 28, height: 28, border: "2px solid #143a30", borderRadius: "50%", marginLeft: -14, marginTop: 6 }} />
      </div>

      {/* HEADER */}
      <div style={{ position: "relative", textAlign: "center", maxWidth: 760, margin: "0 auto 40px" }}>
        <span
          style={{
            display: "inline-block",
            background: "#0c2a26",
            color: "#fef9f1",
            padding: "10px 22px",
            borderRadius: 999,
            fontSize: 13.5,
            fontWeight: 600,
            marginBottom: 28,
          }}
        >
          Integration
        </span>
        <h2
          style={{
            fontFamily: "Newsreader, Georgia, serif",
            fontWeight: 700,
            fontSize: "clamp(34px, 4.4vw, 56px)",
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            color: "#0c2a26",
            margin: "0 0 22px",
          }}
        >
          One-click to integration with any of your favorite <em style={{ fontStyle: "italic", color: "var(--accent)", fontWeight: 700 }}>apps and tools</em>
        </h2>
        <p
          style={{
            fontSize: 16,
            lineHeight: 1.65,
            color: "#475a55",
            maxWidth: "62ch",
            margin: "0 auto",
          }}
        >
          Achieve seamless integration with your favorite apps and tools through a single click,
          enhancing the efficiency and functionality of our SaaS-based project management solution.
        </p>
      </div>

      {/* ORBIT */}
      <div
        style={{
          position: "relative",
          maxWidth: 1100,
          margin: "0 auto",
          height: 480,
        }}
      >
        {/* arcs */}
        <svg
          viewBox="0 0 1100 480"
          preserveAspectRatio="none"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        >
          {[180, 250, 320].map((r, i) => (
            <path
              key={i}
              d={`M ${550 - r} 480 A ${r} ${r} 0 0 1 ${550 + r} 480`}
              stroke="#cbc4af"
              strokeWidth="0.8"
              strokeDasharray="2 4"
              fill="none"
              opacity={0.7}
            />
          ))}
        </svg>

        {/* logo bubbles */}
        {logos.map((l, i) => (
          <LogoBubble key={i} {...l} />
        ))}

        {/* center CTAs */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: 32,
            transform: "translateX(-50%)",
            display: "flex",
            gap: 14,
            zIndex: 5,
          }}
        >
          <a
            href="#"
            style={{
              background: "var(--accent)",
              color: "#fff",
              padding: "14px 26px",
              borderRadius: 999,
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
              border: 0,
            }}
          >
            All integrations
          </a>
          <a
            href="#"
            style={{
              background: "#fff",
              color: "#0c2a26",
              padding: "14px 26px",
              borderRadius: 999,
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
              border: "1.5px solid #0c2a26",
            }}
          >
            Start free trial
          </a>
        </div>
      </div>
    </section>
  );
}

function LogoBubble({ x, y, size, kind }: { x: number; y: number; size: number; kind: string; tilt?: number }) {
  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
        width: size,
        height: size,
        background: "#fff",
        borderRadius: "50%",
        boxShadow: "0 8px 22px -8px rgba(31,27,22,0.16), 0 2px 4px rgba(31,27,22,0.05)",
        display: "grid",
        placeItems: "center",
        zIndex: 2,
      }}
    >
      <Logo kind={kind} size={Math.round(size * 0.5)} />
    </div>
  );
}

function Logo({ kind, size }: { kind: string; size: number }) {
  switch (kind) {
    case "chev":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size}>
          <path d="M6 4 L18 4 L12 12 L18 20 L6 20 L12 12 Z" fill="#1e6cf7" />
        </svg>
      );
    case "x":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size}>
          <text x="12" y="18" textAnchor="middle" fontFamily="Newsreader, serif" fontSize="20" fontWeight="700" fill="#e85d3e">X</text>
        </svg>
      );
    case "ps":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size}>
          <text x="6" y="18" fontFamily="Newsreader, serif" fontSize="18" fontWeight="700" fill="#3a2f1f">P</text>
          <text x="14" y="18" fontFamily="Newsreader, serif" fontSize="18" fontWeight="700" fill="#b8975c" fontStyle="italic">S</text>
        </svg>
      );
    case "p":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size}>
          <text x="12" y="18" textAnchor="middle" fontFamily="Newsreader, serif" fontSize="20" fontWeight="700" fontStyle="italic" fill="#3a2f1f">p</text>
          <circle cx="17" cy="6" r="2" fill="#e85d3e" />
        </svg>
      );
    case "pin":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size}>
          <path d="M12 2 C 8 2, 5 5, 5 9 c 0 5 7 13 7 13 s 7-8 7-13 c 0-4-3-7-7-7 z" fill="#e85d3e" />
          <circle cx="12" cy="9" r="2" fill="#fff" />
        </svg>
      );
    case "tile":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size}>
          <rect x="2" y="2" width="20" height="20" rx="3" fill="none" stroke="#0c2a26" strokeWidth="1.4" />
          <circle cx="8" cy="8" r="1.5" fill="#15614b" />
          <circle cx="16" cy="8" r="1.5" fill="#e85d3e" />
          <circle cx="12" cy="12" r="1.5" fill="#f5b660" />
          <circle cx="8" cy="16" r="1.5" fill="#1e6cf7" />
          <circle cx="16" cy="16" r="1.5" fill="#0c2a26" />
        </svg>
      );
    case "wave":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size}>
          <path d="M3 14 L9 8 L11 12 L17 4 L19 8" stroke="#e85d3e" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3 20 L9 14 L11 18 L17 10 L19 14" stroke="#e85d3e" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
        </svg>
      );
    case "biz":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size}>
          <path
            d="M5 7 c 0-2 2-4 4-4 c 2 0 3 1 4 2 c 1-1 2-2 4-2 c 2 0 4 2 4 4 c 0 4-7 9-8 12 c -1-3-8-8-8-12 z"
            fill="#c0322a"
          />
        </svg>
      );
    default:
      return <span style={{ fontSize: size, fontWeight: 700 }}>?</span>;
  }
}

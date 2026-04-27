import type { Metadata } from "next";
import Link from "next/link";
import { STATES } from "../../lib/states";
import { availableStateSlugs } from "../../lib/state-data";
import Breadcrumbs from "../../components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Small Claims Guides — Every State",
  description:
    "Step-by-step small claims guides for every U.S. state. Filing limits, fees, forms, deadlines, service of process, and post-judgment collection.",
  alternates: { canonical: "/guides" },
};

export default function GuidesIndex() {
  const ready = new Set(availableStateSlugs());
  const isReady = (slug: string) => ready.has(slug);

  return (
    <main className="wrap" style={{ paddingBottom: 80 }}>
      <Breadcrumbs items={[{ label: "Guides" }]} />
      <header style={{ margin: "16px 0 36px" }}>
        <h1
          style={{
            fontFamily: '"Newsreader", Georgia, serif',
            fontWeight: 700,
            fontSize: "clamp(36px, 5vw, 56px)",
            letterSpacing: "-0.02em",
            color: "var(--ink)",
            margin: 0,
            lineHeight: 1.05,
          }}
        >
          Small claims, <em style={{ fontStyle: "italic", color: "var(--accent)" }}>by state.</em>
        </h1>
        <p style={{ marginTop: 14, maxWidth: "60ch", color: "var(--muted)" }}>
          A current, plain-English guide for every U.S. state. Filing limits, deadlines, fees, forms, service of process, and how to actually collect after you win.
        </p>
      </header>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 12,
        }}
      >
        {STATES.map((s) => {
          const ready = isReady(s.slug);
          const inner = (
            <span
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 18px",
                border: "1px solid var(--hairline)",
                borderRadius: 12,
                background: ready ? "#fff" : "var(--card)",
                opacity: ready ? 1 : 0.7,
                transition: "transform .2s ease, box-shadow .2s ease",
              }}
            >
              <span style={{ fontWeight: 600, color: "var(--ink)" }}>{s.name}</span>
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: ready ? "var(--accent)" : "var(--muted)",
                  fontWeight: 600,
                }}
              >
                {ready ? "Ready →" : s.abbr}
              </span>
            </span>
          );
          return (
            <li key={s.slug}>
              {ready ? (
                <Link href={`/guides/${s.slug}`} style={{ display: "block" }}>
                  {inner}
                </Link>
              ) : (
                inner
              )}
            </li>
          );
        })}
      </ul>

      <p style={{ marginTop: 32, color: "var(--muted)", fontSize: 13 }}>
        Guides marked <strong style={{ color: "var(--accent)" }}>Ready</strong> have published research. The rest are queued.
      </p>
    </main>
  );
}

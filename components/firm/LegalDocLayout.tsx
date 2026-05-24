import type { ReactNode } from "react";
import { C, H1, H2, eyebrow, body, PAD_X, RAD, HEAD_FONT, BODY_FONT, italicEmCSS, FirmBtn } from "./index";

// Shared layout for legal documents (disclaimer, privacy, terms).
// Renders a firm-styled hero + TOC sidebar + numbered prose cards + CTA.

export type LegalSection = { id: string; title: string; body: ReactNode };

const LEGAL_PROSE_CSS = `
.firm-legal-prose { font: 15.5px/1.65 var(--font-geist), system-ui, sans-serif; color: #5b544c; }
.firm-legal-prose p { margin: 0 0 14px 0; }
.firm-legal-prose p:last-child { margin-bottom: 0; }
.firm-legal-prose ul, .firm-legal-prose ol { margin: 12px 0 14px 22px; padding: 0; }
.firm-legal-prose li { margin: 0 0 8px 0; }
.firm-legal-prose a { color: #b8331f; text-decoration: underline; text-underline-offset: 3px; }
.firm-legal-prose strong { color: #1a1612; font-weight: 600; }
`;

export function LegalDocLayout({
  eyebrowText,
  title,
  lede,
  lastUpdated,
  badge,
  sections,
  ctaLabel = "Send a Demand Letter",
  ctaHref = "/demand-letter",
  secondaryLabel = "About CivilCase",
  secondaryHref = "/about",
  cta,
}: {
  eyebrowText: string;
  title: ReactNode;
  lede: ReactNode;
  lastUpdated?: string;
  badge?: { label: string; title: ReactNode; body: ReactNode };
  sections: LegalSection[];
  ctaLabel?: string;
  ctaHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  cta?: { title: ReactNode; body: ReactNode };
}) {
  return (
    <main style={{ background: C.bg, color: C.fg, font: `16px/1.5 ${BODY_FONT}` }}>
      <style dangerouslySetInnerHTML={{ __html: italicEmCSS + LEGAL_PROSE_CSS }} />

      {/* HERO */}
      <section style={{ padding: `80px ${PAD_X} 80px` }}>
        <div style={{ display: "grid", gridTemplateColumns: badge ? "1.3fr 1fr" : "1fr", gap: 80, alignItems: "center" }}>
          <div>
            <div style={{ ...eyebrow, color: C.accent, marginBottom: 28 }}>{eyebrowText}</div>
            <h1 className="firm-h" style={{ ...H1, fontSize: 64 }}>{title}</h1>
            <p style={{ font: `18px/1.55 ${BODY_FONT}`, color: C.muted, maxWidth: 680, marginTop: 28 }}>
              {lede}
            </p>
            {lastUpdated && (
              <div style={{ font: `13px/1 ${BODY_FONT}`, color: C.muted, marginTop: 28, letterSpacing: "0.04em" }}>
                Last updated: <span style={{ color: C.fg }}>{lastUpdated}</span>
              </div>
            )}
          </div>
          {badge && (
            <div style={{ background: C.dark, color: "#fff", padding: 40, borderRadius: RAD.panel }}>
              <div style={{ display: "inline-block", padding: "5px 12px", borderRadius: 999, border: `1px solid ${C.accentOnDark}`, color: C.accentOnDark, font: `500 10px/1 ${BODY_FONT}`, letterSpacing: "0.2em", marginBottom: 22 }}>
                {badge.label}
              </div>
              <div className="firm-h firm-h-light" style={{ font: `600 32px/1.2 ${HEAD_FONT}`, color: "#fff", letterSpacing: "-0.02em" }}>{badge.title}</div>
              <p style={{ font: `15px/1.55 ${BODY_FONT}`, color: "rgba(255,255,255,0.7)", marginTop: 18 }}>{badge.body}</p>
            </div>
          )}
        </div>
      </section>

      {/* TOC + CARDS */}
      <section style={{ padding: `40px ${PAD_X} 120px` }}>
        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 80, alignItems: "start" }}>
          <aside style={{ position: "sticky", top: 100 }}>
            <div style={{ ...eyebrow, marginBottom: 18 }}>ON THIS PAGE</div>
            <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 2 }}>
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "28px 1fr",
                      gap: 10,
                      padding: "10px 0",
                      borderBottom: i < sections.length - 1 ? `1px solid ${C.line}` : "none",
                      textDecoration: "none",
                      color: C.fg,
                      font: `500 14px/1.4 ${BODY_FONT}`,
                    }}
                  >
                    <span style={{ font: `500 12px/1.4 ${BODY_FONT}`, color: C.accent }}>{String(i + 1).padStart(2, "0")}</span>
                    <span>{s.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </aside>

          <div style={{ display: "grid", gap: 16 }}>
            {sections.map((s, i) => (
              <article
                key={s.id}
                id={s.id}
                style={{
                  background: C.paper,
                  border: `1px solid ${C.line}`,
                  borderRadius: RAD.card,
                  padding: "36px 40px",
                  display: "grid",
                  gridTemplateColumns: "60px 1fr",
                  gap: 28,
                  scrollMarginTop: 100,
                }}
              >
                <div style={{ font: `600 24px/1 ${HEAD_FONT}`, color: C.accent, letterSpacing: "-0.01em" }}>{String(i + 1).padStart(2, "0")}</div>
                <div>
                  <h3 className="firm-h" style={{ font: `600 24px/1.25 ${HEAD_FONT}`, color: C.fg, letterSpacing: "-0.01em", margin: 0 }}>
                    {s.title}
                  </h3>
                  <div className="firm-legal-prose" style={{ marginTop: 14 }}>{s.body}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: `120px ${PAD_X}` }}>
        <div style={{ background: C.cream, padding: "80px 56px", borderRadius: RAD.panel, textAlign: "center" }}>
          <div style={{ ...eyebrow, marginBottom: 22 }}>NEXT</div>
          <h2 className="firm-h" style={H2}>{cta?.title ?? <>Still want to <em>get started</em>?</>}</h2>
          <p style={{ ...body, maxWidth: 560, margin: "18px auto 0" }}>
            {cta?.body ?? "Most disputes are simple enough for a demand letter to resolve without filing anything. Try ours."}
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 32 }}>
            <a href={ctaHref} style={{ textDecoration: "none" }}><FirmBtn>{ctaLabel}</FirmBtn></a>
            <a href={secondaryHref} style={{ textDecoration: "none" }}><FirmBtn kind="ghost">{secondaryLabel}</FirmBtn></a>
          </div>
        </div>
      </section>
    </main>
  );
}

import type { ReactNode } from "react";
import { C, H2, eyebrow, body, PAD_X, HEAD_FONT, BODY_FONT } from "./index";

// Shared FAQ accordion section used across every firm page.
//
// Layout: 2-column (1fr / 1.4fr) with eyebrow + heading (+ optional subtitle
// and CTA slot) on the left, and a stack of <details> on the right. The +/−
// indicator on each row is driven by CSS [open] state via `data-firm-marker`,
// so clicking actually flips the icon.

export type Faq = { q: string; a?: string | null };

export function FaqSection({
  faqs,
  eyebrowText = "FAQ",
  title,
  subtitle,
  cta,
  background,
}: {
  faqs: Faq[];
  eyebrowText?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  cta?: ReactNode;
  background?: string;
}) {
  return (
    <section style={{ padding: `120px ${PAD_X}`, ...(background ? { background } : {}) }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80 }}>
        <div>
          <div style={{ ...eyebrow, marginBottom: 22 }}>{eyebrowText}</div>
          <h2 className="firm-h" style={H2}>{title}</h2>
          {subtitle && (
            <p style={{ ...body, marginTop: 22, maxWidth: 360 }}>{subtitle}</p>
          )}
          {cta && <div style={{ marginTop: 22 }}>{cta}</div>}
        </div>
        <div>
          {faqs.map((f, i) => (
            <details
              key={f.q}
              open={i === 0}
              style={{
                borderTop: i === 0 ? `1px solid ${C.fg}` : "none",
                borderBottom: `1px solid ${C.line}`,
                padding: "22px 0",
              }}
            >
              <summary
                style={{
                  listStyle: "none",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                  gap: 24,
                }}
              >
                <span style={{ font: `600 22px/1.4 ${HEAD_FONT}`, color: C.fg, letterSpacing: "-0.005em" }}>
                  {f.q}
                </span>
                <span data-firm-marker style={{ color: C.accent, font: `400 22px/1 ${BODY_FONT}` }} />
              </summary>
              {f.a && (
                <p style={{ ...body, marginTop: 12, fontSize: 14.5, maxWidth: 720 }}>{f.a}</p>
              )}
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

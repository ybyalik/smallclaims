import { Mail, Gauge, Scale, ArrowRight, Star } from "lucide-react";
import { C, H2, eyebrow, PAD_X, RAD, BODY_FONT, HEAD_FONT } from "./index";

// "Three ways to move forward" — V6 Color-blocked stamps layout. Each path
// gets a full-width color band on top (number + tag + icon) and a dark body
// below (title + desc + footer with price + CTA). The first path is treated
// as "popular": lifted, shadowed, with a RECOMMENDED badge under the band.

type Path = { tag: string; title: string; desc: string; price: string; href: string };

const DEFAULT_PATHS: Path[] = [
  { tag: "PATH A", title: "Send a Demand Letter", desc: "Start with formal pressure. Most cases settle here.", price: "From $29", href: "/demand-letter" },
  { tag: "PATH B", title: "Check My Case Strength", desc: "Free 90-second read with general information about your dispute. Not legal advice.", price: "Free", href: "/case-score" },
  { tag: "PATH C", title: "File Your Claim", desc: "Skip ahead. Get county-specific filing forms ready to file.", price: "From $79", href: "/filing-kit" },
];

const PATH_BAND_COLORS = [
  { band: "#f5b29f", bandFg: "#0e0e0e", popular: true },            // PATH A — peach (recommended)
  { band: "#4A6FA5", bandFg: "#fff", popular: false },              // PATH B — muted blue
  { band: "#7A8775", bandFg: "#fff", popular: false },              // PATH C — olive
];

const PATH_ICONS = [Mail, Gauge, Scale];

type Testimonial = { quote: string; name: string; meta: string };

export function ThreeWaysSection({
  lede,
  paths = DEFAULT_PATHS,
  testimonial,
}: {
  lede: string;
  paths?: Path[];
  testimonial?: Testimonial;
}) {
  const gridCols = testimonial ? "repeat(3, 1fr) 1.2fr" : "repeat(3, 1fr)";

  // Pull a "$X,XXX" win amount from testimonial quote if it's there.
  const winAmount = testimonial ? testimonial.quote.match(/\$[\d,]+/)?.[0] ?? null : null;

  const hoverCss = `
.fw-stamp {
  background: #13171F;
  border: 1px solid rgba(255,255,255,0.10);
  display: flex;
  flex-direction: column;
  position: relative;
  text-decoration: none;
  color: #fff;
  transform: translateY(0);
  box-shadow: 0 0 0 rgba(0,0,0,0);
  transition: transform 200ms ease, border-color 200ms ease, box-shadow 200ms ease;
}
.fw-stamp.fw-stamp-popular {
  transform: translateY(-12px);
  box-shadow: 0 18px 50px -18px rgba(0,0,0,0.6);
}
.fw-stamp:hover {
  border-color: var(--band-color, rgba(245,178,159,0.55));
  box-shadow: 0 22px 50px -22px rgba(0,0,0,0.7);
  transform: translateY(-6px);
}
.fw-stamp.fw-stamp-popular:hover {
  transform: translateY(-18px);
  box-shadow: 0 28px 60px -22px rgba(0,0,0,0.75);
}
.fw-stamp .fw-cta { transition: background 200ms ease, color 200ms ease, border-color 200ms ease, filter 200ms ease; }
.fw-stamp:not(.fw-stamp-popular):hover .fw-cta { background: #f5b29f; color: #0e0e0e; border-color: #f5b29f; }
.fw-stamp.fw-stamp-popular:hover .fw-cta { filter: brightness(1.08); }
`;
  return (
    <section style={{ padding: `120px ${PAD_X}` }}>
      <style dangerouslySetInnerHTML={{ __html: hoverCss }} />
      <div style={{ background: C.dark, color: "#fff", padding: "60px 56px", borderRadius: RAD.panel }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 60, alignItems: "end", marginBottom: 40 }}>
          <div>
            <div style={{ ...eyebrow, color: "rgba(255,255,255,0.55)", marginBottom: 18 }}>TAKE THE NEXT STEP</div>
            <h2 className="firm-h firm-h-light" style={{ ...H2, color: "#fff", fontSize: 40 }}>
              Three ways to <em>move forward</em>.
            </h2>
          </div>
          <p style={{ font: `15px/1.6 ${BODY_FONT}`, color: "rgba(255,255,255,0.7)" }}>{lede}</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: gridCols, gap: 16, alignItems: "stretch" }}>
          {paths.map((p, i) => {
            const theme = PATH_BAND_COLORS[i % PATH_BAND_COLORS.length];
            const Icon = PATH_ICONS[i % PATH_ICONS.length];
            const popular = theme.popular;
            return (
              <a
                key={p.title}
                href={p.href}
                className={`fw-stamp${popular ? " fw-stamp-popular" : ""}`}
                style={{ borderRadius: 0, ["--band-color" as string]: theme.band }}
              >
                {/* Color band on top */}
                <div
                  style={{
                    background: theme.band,
                    color: theme.bandFg,
                    padding: "20px 22px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    position: "relative",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ font: `300 40px/0.9 ${HEAD_FONT}`, letterSpacing: "-0.03em", color: theme.bandFg, opacity: 0.85 }}>
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div style={{ font: `500 10.5px/1 ${BODY_FONT}`, letterSpacing: "0.22em", color: theme.bandFg, opacity: 0.85 }}>
                      {p.tag}
                    </div>
                  </div>
                  <Icon size={28} strokeWidth={1.7} color={theme.bandFg} aria-hidden />

                  {popular && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: -10,
                        left: 22,
                        background: C.dark,
                        color: C.accentOnDark,
                        padding: "4px 8px",
                        font: `500 9.5px/1 ${BODY_FONT}`,
                        letterSpacing: "0.22em",
                        border: `1px solid ${C.accentOnDark}`,
                      }}
                    >
                      RECOMMENDED
                    </div>
                  )}
                </div>

                {/* Body */}
                <div style={{ padding: "30px 24px 24px", display: "flex", flexDirection: "column", flex: 1 }}>
                  <div style={{ font: `500 22px/1.2 ${HEAD_FONT}`, color: "#fff", letterSpacing: "-0.015em" }}>{p.title}</div>
                  <div style={{ font: `13.5px/1.55 ${BODY_FONT}`, color: "rgba(255,255,255,0.7)", marginTop: 12, flex: 1 }}>{p.desc}</div>

                  <div style={{ marginTop: 22, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.10)" }}>
                    <div style={{ font: `500 12.5px/1 ${BODY_FONT}`, color: "rgba(255,255,255,0.65)", marginBottom: 12 }}>{p.price}</div>
                    <span
                      className="fw-cta"
                      style={{
                        background: popular ? C.accentOnDark : "transparent",
                        color: popular ? C.dark : "#fff",
                        border: popular ? "1px solid " + C.accentOnDark : "1px solid rgba(255,255,255,0.4)",
                        padding: "10px 14px",
                        font: `500 13px/1 ${BODY_FONT}`,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      {popular ? "Start my letter" : "Continue"} <ArrowRight size={14} strokeWidth={2} />
                    </span>
                  </div>
                </div>
              </a>
            );
          })}

          {testimonial && (
            <div style={{ background: "#fff", color: C.fg, display: "flex", flexDirection: "column", borderRadius: 0 }}>
              <div style={{ background: "#F5F1E6", padding: "20px 22px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ font: `500 10.5px/1 ${BODY_FONT}`, letterSpacing: "0.22em", color: "#7a7165" }}>
                    RESULT · {testimonial.name.toUpperCase()}
                  </div>
                  {winAmount && (
                    <div style={{ font: `500 28px/1 ${HEAD_FONT}`, letterSpacing: "-0.02em", color: C.accent, marginTop: 6 }}>
                      {winAmount} won
                    </div>
                  )}
                </div>
                <div style={{ display: "flex", gap: 2, color: C.accentOnDark }}>
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} size={13} fill="currentColor" stroke="currentColor" />
                  ))}
                </div>
              </div>
              <div style={{ padding: "24px 24px 24px", display: "flex", flexDirection: "column", flex: 1 }}>
                <p style={{ font: `italic 15px/1.45 ${HEAD_FONT}`, color: C.fg, margin: 0, flex: 1 }}>
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div style={{ marginTop: 18, paddingTop: 14, borderTop: `1px solid rgba(14,18,24,0.12)`, font: `12.5px/1.4 ${BODY_FONT}`, color: C.muted }}>
                  {testimonial.meta}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

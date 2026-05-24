import type { LucideIcon } from "lucide-react";
import { C, BODY_FONT, HEAD_FONT, body } from "./index";

export interface FirmProcessStep {
  Icon: LucideIcon;
  title: string;
  desc: string;
  /** Optional bottom tag — uppercase time/duration. Omit to hide. */
  time?: string;
}

export interface FirmProcessStripProps {
  steps: readonly FirmProcessStep[];
  /** Optional override for cell padding. Defaults to "36px 28px". */
  cellPadding?: string;
}

// 4-step PROCESS strip — eyebrow ("STEP 0N") + circle icon, large serif
// step title, body description, uppercase time tag at the bottom. Used in
// the "From your facts to filed" sections on demand-letter, filing-kit,
// and collection-plan. Hover behavior + mobile single-column stack live
// in firm-responsive.css under .firm-step.
export function FirmProcessStrip({ steps, cellPadding = "36px 28px" }: FirmProcessStripProps) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .firm-step { border-top: 4px solid transparent; transition: border-top-color 0.18s ease, background 0.18s ease; }
            .firm-step:hover { border-top-color: ${C.accent}; background: ${C.cream}; }
          `,
        }}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 0,
          borderTop: `1px solid ${C.fg}`,
          borderBottom: `1px solid ${C.line}`,
        }}
      >
        {steps.map(({ Icon, title, desc, time }, i) => (
          <div
            key={title}
            className="firm-step"
            style={{
              padding: cellPadding,
              borderLeft: i ? `1px solid ${C.line}` : "none",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
              <div style={{ font: `500 13px/1 ${BODY_FONT}`, color: C.accent, letterSpacing: "0.08em" }}>
                STEP 0{i + 1}
              </div>
              <div style={{ width: 36, height: 36, borderRadius: 999, background: "rgba(184,51,31,0.10)", color: C.accent, display: "grid", placeItems: "center" }}>
                <Icon size={18} strokeWidth={1.8} aria-hidden />
              </div>
            </div>
            <div style={{ font: `600 28px/1.22 ${HEAD_FONT}`, color: C.fg, minHeight: 52, letterSpacing: "-0.01em" }}>
              {title}
            </div>
            <p style={{ ...body, marginTop: 12, fontSize: 14 }}>{desc}</p>
            {time ? (
              <div style={{ marginTop: 22, font: `11px/1 ${BODY_FONT}`, letterSpacing: "0.16em", color: C.muted, textTransform: "uppercase" }}>
                {time}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </>
  );
}

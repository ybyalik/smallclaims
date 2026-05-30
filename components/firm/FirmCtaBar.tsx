import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import Image from "next/image";
import { C, BODY_FONT, HEAD_FONT, RAD, eyebrow, FirmBtn } from "./index";

export interface FirmCtaBarProps {
  /** Optional square icon shown in the white tile on the left. */
  Icon?: LucideIcon;
  /** Optional image (e.g. /icons/letter-icon.webp) shown in the white tile.
   *  Takes precedence over Icon when set. */
  iconSrc?: string;
  /** Optional uppercase eyebrow above the headline. */
  eyebrowText?: string;
  /** Headline string or JSX (e.g. with <em> for italic emphasis). */
  headline: ReactNode;
  /** Supporting line under the headline. */
  sub?: string;
  /** Primary CTA — label + href + optional caption underneath. */
  cta: {
    label: string;
    href: string;
    caption?: string;
  };
}

// Dark CTA bar used at the bottom of each service page (demand-letter,
// filing-kit, collection-plan). White icon tile on the left, headline +
// sub stacked beside it; right side has a vertical divider, the primary
// CTA button, and an optional small caption underneath.
//
// Mobile behavior (vertical stack, centered text, divider hidden, smaller
// heading) lives in firm-responsive.css under .firm-cta-bar.
export function FirmCtaBar({ Icon, iconSrc, eyebrowText, headline, sub, cta }: FirmCtaBarProps) {
  return (
    <div
      className="firm-cta-bar"
      style={{
        background: C.dark,
        color: "#fff",
        padding: "36px 36px",
        borderRadius: RAD.panel,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 32,
        flexWrap: "wrap",
      }}
    >
      {/* Left — optional icon + eyebrow + headline + sub */}
      <div style={{ display: "flex", alignItems: "center", gap: 22, flex: "1 1 auto", minWidth: 0 }}>
        {iconSrc ? (
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "transparent", border: "1px solid rgba(255,255,255,0.18)", display: "grid", placeItems: "center", flexShrink: 0 }}>
            <Image src={iconSrc} alt="" width={42} height={17} aria-hidden />
          </div>
        ) : Icon ? (
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "transparent", border: "1px solid rgba(255,255,255,0.18)", display: "grid", placeItems: "center", flexShrink: 0 }}>
            <Icon size={26} strokeWidth={1.9} color={C.accentOnDark} aria-hidden />
          </div>
        ) : null}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          {eyebrowText ? (
            <div style={{ ...eyebrow, color: "rgba(255,255,255,0.55)", marginBottom: 12 }}>{eyebrowText}</div>
          ) : null}
          <h2 className="firm-h firm-h-light" style={{ font: `700 30px/1.15 ${HEAD_FONT}`, color: "#fff", letterSpacing: "-0.02em", margin: 0 }}>
            {headline}
          </h2>
          {sub ? (
            <p style={{ font: `14px/1.5 ${BODY_FONT}`, color: "rgba(255,255,255,0.7)", margin: "6px 0 0" }}>
              {sub}
            </p>
          ) : null}
        </div>
      </div>

      {/* Right — divider + button + caption */}
      <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
        <div aria-hidden style={{ width: 1, height: 56, background: "rgba(255,255,255,0.15)" }} />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
          <FirmBtn kind="accent" href={cta.href}>
            {cta.label}
          </FirmBtn>
          {cta.caption ? (
            <div style={{ font: `12.5px/1.4 ${BODY_FONT}`, color: "rgba(255,255,255,0.5)" }}>
              {cta.caption}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

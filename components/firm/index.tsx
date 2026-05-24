// Shared design system for the new (firm) route group pages.
// Single source of truth for tokens, typography, SVG primitives, and
// layout components (FirmBtn, FirmSubnav, LetterDoc, SiteHeader,
// SiteFooter).
//
// To use:
//   import { C, H1, H2, eyebrow, body, PAD_X, RAD,
//            HEAD_FONT, BODY_FONT, SERIF_FONT, italicEmCSS,
//            Arrow, Check, ShieldLogo,
//            FirmBtn, FirmSubnav, LetterDoc } from "../../../components/firm";
//
// One side note: the italic-emphasis classnames are now `.firm-h`
// and `.firm-h-light` (was `.h4-h` / `.h4-h-light` when this lived
// inside /home4 only).

import React from "react";

// ─── Tokens ─────────────────────────────────────────────────────────
export const C = {
  bg: "#ffffff",
  cream: "#FAFAF7",
  fg: "#0e0e0e",
  muted: "#1f1f1f",
  line: "#E2E0D8",
  paper: "#FFFFFF",
  dark: "#0e0e0e",
  darkPanel: "#161A22",
  accent: "#b8331f",
  accentOnDark: "#f5b29f",
} as const;

export const HEAD_FONT = "var(--font-newsreader), Georgia, serif";
export const BODY_FONT = "var(--font-geist), system-ui, sans-serif";
export const SERIF_FONT = "var(--font-newsreader), Georgia, serif";

// Auto-centered horizontal padding capped at 1600px.
// Horizontal page padding. Driven by --firm-pad-x so it can shrink
// at narrow viewports without rewriting every inline style. The base
// is "center a 1440-px column on huge screens, 80px gutters under
// that"; the media queries in firm-responsive.css drop it to 48 / 24.
export const PAD_X = "var(--firm-pad-x, max(80px, calc((100vw - 1440px) / 2)))";

// Corner radii. `large` is for the new accordion-style category panel.
export const RAD = { card: 12, panel: 16, large: 20 } as const;

// ─── Typography ─────────────────────────────────────────────────────
// Hero headline (clamp 44–72px, weight 600, / spec).
export const H1: React.CSSProperties = {
  fontFamily: HEAD_FONT,
  fontWeight: 600,
  fontSize: "clamp(44px, 5.5vw, 72px)",
  lineHeight: 1.04,
  letterSpacing: "-0.028em",
  color: C.fg,
  margin: 0,
};

// Section headline (clamp 38–64px, weight 600).
export const H2: React.CSSProperties = {
  fontFamily: HEAD_FONT,
  fontWeight: 600,
  fontSize: "clamp(38px, 4.5vw, 64px)",
  lineHeight: 1.05,
  letterSpacing: "-0.025em",
  color: C.fg,
  margin: 0,
};

// Eyebrow above a headline (Geist 600 12px, looser tracking, low opacity).
export const eyebrow: React.CSSProperties = {
  display: "inline-block",
  font: `600 12px/1 ${BODY_FONT}`,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: C.muted,
  opacity: 0.75,
};

// Default body copy.
export const body: React.CSSProperties = {
  font: `400 18px/1.6 ${BODY_FONT}`,
  color: C.muted,
};

// Italic emphasis applied to <em> inside headings that carry the
// `firm-h` class (brick on light bg, peach on dark bg via the
// additional `firm-h-light` class).
export const italicEmCSS = `
  .firm-h em { font-style: italic; font-weight: 500; color: ${C.accent}; }
  .firm-h.firm-h-light em,
  .firm-h-light em { font-style: italic; font-weight: 500; color: ${C.accentOnDark}; }

  /* ── FAQ details (used on every firm page) ─────────────────────── */
  /* Hide the default disclosure triangle, drive the +/− from [open] state */
  details > summary { list-style: none; }
  details > summary::-webkit-details-marker { display: none; }
  /* Find the marker span (last child of summary) and flip it via attribute */
  details[open] > summary [data-firm-marker]::before { content: "−"; }
  details:not([open]) > summary [data-firm-marker]::before { content: "+"; }

  /* ── Hover states for firm card grids ──────────────────────────── */
  /* Generic hover-link card: applies to any <a> with class="firm-card-link" */
  .firm-card-link {
    transition: background 0.15s ease, border-color 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease;
  }
  .firm-card-link:hover {
    background: ${C.cream};
    border-color: ${C.accent} !important;
  }
  /* Sub-elements inside category landing's by-dispute panel */
  .firm-cat-link { transition: background 0.15s ease; border-radius: 10px; }
  .firm-cat-link:hover { background: ${C.cream}; }

  /* Issue + state guide row links */
  .firm-row-link { transition: background 0.15s ease; }
  .firm-row-link:hover { background: ${C.cream}; }

  /* Issue subpage neighbor + related cards */
  .firm-nbr-card { transition: background 0.15s ease, border-color 0.15s ease; }
  .firm-nbr-card:hover { background: ${C.cream}; border-color: ${C.accent} !important; }

  /* Mega-menu nav row hover (header) */
  .firm-mega-link { transition: background 0.15s ease; }
  .firm-mega-link:hover { background: ${C.cream}; }

  /* TOC sidebar hover */
  .firm-sg-toc li a:hover { color: ${C.accent}; }

  /* Generic <a> hover inside firm prose */
  .firm-rich-html a:hover,
  .firm-legal-prose a:hover,
  .firm-sg-article a:hover,
  .firm-blog-body a:hover { color: #921f0f; }

  /* Photo card hover (category issue grid) */
  .firm-photo-card { transition: transform 0.2s ease, box-shadow 0.2s ease; }
  .firm-photo-card:hover { transform: translateY(-2px); box-shadow: 0 10px 30px -10px rgba(40,28,12,0.18); }

  /* Active state on header nav */
  .firm-nav-link:hover { color: ${C.accent}; }
`;

// ─── Primitives ─────────────────────────────────────────────────────
type IconProps = { size?: number; color?: string };

export function Arrow({ size = 12, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M2 6h8M7 3l3 3-3 3"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Check({ size = 14, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3.5 8.5L6.5 11.5L12.5 4.5"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ShieldLogo({ size = 22, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
      <path
        d="M16 2 L28 6 V16 C28 23 22 28.5 16 30 C10 28.5 4 23 4 16 V6 Z"
        stroke={color}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M20 13 C19 11.5 17.5 11 16 11 C13.2 11 11 13.2 11 16 C11 18.8 13.2 21 16 21 C17.5 21 19 20.5 20 19"
        stroke={color}
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Unified button. Accepts every kind any preview page might want; each
// page uses whatever subset it needs.
export type FirmBtnKind = "primary" | "ghost" | "ghostDark" | "light" | "accent";

export function FirmBtn({
  children,
  kind = "primary",
  href,
}: {
  children: React.ReactNode;
  kind?: FirmBtnKind;
  href?: string;
}) {
  const styles: Record<FirmBtnKind, React.CSSProperties> = {
    primary: { background: C.dark, color: "#fff", border: `1px solid ${C.dark}` },
    ghost: { background: "transparent", color: C.fg, border: `1px solid ${C.fg}` },
    ghostDark: { background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.5)" },
    light: { background: "#fff", color: C.fg, border: "1px solid #fff" },
    // accent button appears on dark CTA bars → peach with dark text
    accent: { background: C.accentOnDark, color: C.dark, border: `1px solid ${C.accentOnDark}` },
  };
  const s = styles[kind];
  const sharedStyle: React.CSSProperties = {
    ...s,
    padding: "14px 22px",
    font: `500 14px/1 ${BODY_FONT}`,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    borderRadius: 999,
    textDecoration: "none",
  };
  if (href) {
    return (
      <a href={href} style={sharedStyle}>
        {children} <Arrow color={s.color as string} />
      </a>
    );
  }
  return (
    <button type="button" style={sharedStyle}>
      {children} <Arrow color={s.color as string} />
    </button>
  );
}

// Service-page subnav. Sits below the global site nav. Each item links
// to its corresponding firm service page.
export const SUBNAV = [
  { id: "demand-letter", label: "Demand Letter", href: "/demand-letter" },
  { id: "case-score", label: "Case Score", href: "/case-score" },
  { id: "small-claims", label: "Small Claims Filing", href: "/small-claims" },
  { id: "collection", label: "Collection", href: "/collection-plan" },
  { id: "settlement", label: "Settlement Negotiation", href: "/contact" },
] as const;

export type FirmSubnavId = (typeof SUBNAV)[number]["id"];

export function FirmSubnav({ active }: { active: FirmSubnavId }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: `14px ${PAD_X}`,
        borderBottom: `1px solid ${C.line}`,
        background: C.bg,
        font: `13px/1 ${BODY_FONT}`,
      }}
    >
      <div style={{ display: "flex", gap: 28 }}>
        {SUBNAV.map((i) => (
          <a
            key={i.id}
            href={i.href}
            style={{
              color: active === i.id ? C.accent : C.muted,
              font: active === i.id ? `500 13px/1 ${BODY_FONT}` : `13px/1 ${BODY_FONT}`,
              paddingBottom: 2,
              borderBottom: active === i.id ? `1px solid ${C.accent}` : "1px solid transparent",
              textDecoration: "none",
            }}
          >
            {i.label}
          </a>
        ))}
      </div>
    </div>
  );
}

// Static demand-letter mockup used in /demand-letter4-wide hero +
// anatomy. Newsreader serif paper with a brick-accent signature and a
// shield seal.
export function LetterDoc({
  accent = C.accent,
  style = {},
}: {
  accent?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        background: "#fdfaf3",
        boxShadow:
          "0 1px 0 rgba(0,0,0,0.04), 0 12px 40px -12px rgba(40,28,12,0.18), 0 2px 6px rgba(0,0,0,0.04)",
        padding: "44px 48px",
        font: `12.5px/1.6 ${SERIF_FONT}`,
        color: "#1a1612",
        position: "relative",
        borderRadius: RAD.card,
        ...style,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 18 }}>
        <div style={{ font: `600 11px/1 ${BODY_FONT}`, letterSpacing: "0.22em", color: accent }}>CIVILCASE</div>
        <div style={{ font: `11px/1 ${BODY_FONT}`, color: "#7a7165" }}>May 12, 2026</div>
      </div>
      <div
        style={{
          font: `500 10px/1 ${BODY_FONT}`,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#7a7165",
          marginBottom: 16,
        }}
      >
        Demand Letter
      </div>
      <div style={{ height: 1, background: "#e7dfd0", marginBottom: 18 }} />
      <div style={{ fontSize: 12 }}>
        <div style={{ marginBottom: 10 }}>
          <strong style={{ fontWeight: 600 }}>TO:</strong>&nbsp;&nbsp;Oakwood Properties LLC
          <br />
          <span style={{ paddingLeft: 28 }}>1847 Sunset Boulevard</span>
          <br />
          <span style={{ paddingLeft: 28 }}>Los Angeles, CA 90026</span>
        </div>
        <div style={{ marginBottom: 16 }}>
          <strong style={{ fontWeight: 600 }}>RE:</strong>&nbsp;&nbsp;Demand for Return of Security Deposit
        </div>
        <p style={{ margin: "0 0 10px 0" }}>
          This letter serves as formal notice that you are required to return my $1,200 security deposit
          within 14 days of receipt. That period has elapsed.
        </p>
        <p style={{ margin: "0 0 10px 0" }}>
          I demand within <strong style={{ fontWeight: 600 }}>fourteen (14) days</strong>:
        </p>
        <ul style={{ margin: "0 0 10px 0", paddingLeft: 22 }}>
          <li>Return of the $1,200 deposit in full;</li>
          <li>Statutory damages of 2x for bad-faith retention ($2,400).</li>
        </ul>
        <p style={{ margin: "0 0 18px 0" }}>
          <strong style={{ fontWeight: 600 }}>Total demand: $4,200.00.</strong> If unresolved, I will file in
          Small Claims Court.
        </p>
        <div style={{ marginTop: 22, font: `italic 20px/1 ${SERIF_FONT}`, color: accent }}>Jordan A. Trevant</div>
        <div style={{ marginTop: 4, font: `10px/1.4 ${BODY_FONT}`, color: "#7a7165" }}>Jordan A. Trevant</div>
      </div>
      <div
        style={{
          position: "absolute",
          right: 38,
          bottom: 38,
          width: 56,
          height: 56,
          borderRadius: "50%",
          border: `1.5px solid ${accent}`,
          color: accent,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ShieldLogo size={20} color={accent} />
      </div>
    </div>
  );
}

// Re-export the header + footer so pages can do
//   import { SiteHeader, SiteFooter, C, ... } from "../../../components/firm"
// SiteHeader is a server component (it fetches the auth user). To avoid
// dragging next/headers into every client component that imports from this
// barrel file, consumers (just the layout) import it directly from
// "./SiteHeader" instead of through this index.
export { SiteFooter } from "./SiteFooter";
export { default as LetterDisplay } from "./LetterDisplay";
export { ThreeWaysSection } from "./ThreeWaysSection";
export { LegalDocLayout } from "./LegalDocLayout";
export type { LegalSection } from "./LegalDocLayout";
export { FirmCategoryTemplate } from "./FirmCategoryTemplate";
export { default as FirmStateGuidePage } from "./FirmStateGuidePage";
export { FirmHeroStats } from "./FirmHeroStats";
export type { FirmHeroStatItem, FirmHeroStatsProps } from "./FirmHeroStats";
export { FirmProcessStrip } from "./FirmProcessStrip";
export type { FirmProcessStep, FirmProcessStripProps } from "./FirmProcessStrip";
export { FirmCtaBar } from "./FirmCtaBar";
export type { FirmCtaBarProps } from "./FirmCtaBar";
export { default as FirmIssueTemplate } from "./FirmIssueTemplate";
export { StateSearchPanel } from "./StateSearchPanel";
export { FaqSection } from "./FaqSection";
export type { Faq } from "./FaqSection";
export { RatingStrip } from "./RatingStrip";

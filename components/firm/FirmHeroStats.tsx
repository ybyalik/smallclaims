import type { LucideIcon } from "lucide-react";
import { C, BODY_FONT } from "./index";

export interface FirmHeroStatItem {
  Icon: LucideIcon;
  headline: string;
  sub: string;
}

export interface FirmHeroStatsProps {
  items: readonly FirmHeroStatItem[];
}

// Hero stat strip — icon + bold headline + caption, hairline left dividers
// between items, top border above the strip. Used in the hero of each
// service page (demand-letter, filing-kit, collection-plan).
// Mobile behavior lives in firm-responsive.css under .firm-hero-stats.
export function FirmHeroStats({ items }: FirmHeroStatsProps) {
  return (
    <div
      className="firm-hero-stats"
      style={{
        display: "flex",
        flexWrap: "wrap",
        marginTop: 60,
        paddingTop: 30,
        borderTop: `1px solid ${C.line}`,
      }}
    >
      {items.map(({ Icon, headline, sub }, i, arr) => (
        <div
          key={headline}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            paddingLeft: i ? 24 : 0,
            paddingRight: i === arr.length - 1 ? 0 : 24,
            borderLeft: i ? `1px solid ${C.line}` : "none",
          }}
        >
          <Icon size={28} strokeWidth={1.7} color={C.accent} aria-hidden />
          <div>
            <div style={{ font: `700 15px/1.2 ${BODY_FONT}`, color: C.fg, marginBottom: 3 }}>
              {headline}
            </div>
            <div style={{ font: `13px/1.3 ${BODY_FONT}`, color: C.muted }}>{sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

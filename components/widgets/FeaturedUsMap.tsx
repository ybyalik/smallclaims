"use client";

import { useMemo, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { STATES, type State } from "../../lib/states";

const GEO_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

type GeographyFeature = {
  rsmKey: string;
  properties: { name: string; [key: string]: unknown };
};

interface Props {
  highlightedSlugs: string[];
  tooltips?: Record<string, { title: string; sub?: string }>;
}

export default function FeaturedUsMap({ highlightedSlugs, tooltips }: Props) {
  const featured = useMemo(() => new Set(highlightedSlugs), [highlightedSlugs]);
  const [hover, setHover] = useState<{ slug: string; x: number; y: number } | null>(null);

  const stateByName = useMemo(() => {
    const map: Record<string, State> = {};
    for (const s of STATES) map[s.name] = s;
    map["District Of Columbia"] = STATES.find((s) => s.slug === "district-of-columbia")!;
    return map;
  }, []);

  const tip = hover && tooltips?.[hover.slug];

  return (
    <div className="cv2-featured-map" style={{ position: "relative" }}>
      <ComposableMap projection="geoAlbersUsa" width={900} height={520} style={{ width: "100%", height: "auto" }}>
        <Geographies geography={GEO_URL}>
          {({ geographies }: { geographies: GeographyFeature[] }) =>
            geographies.map((geo) => {
              const name = geo.properties.name;
              const state = stateByName[name];
              if (!state) return null;
              const isFeatured = featured.has(state.slug);
              const hasTip = !!tooltips?.[state.slug];
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={(e) => {
                    if (hasTip) {
                      const rect = (e.currentTarget.ownerSVGElement as SVGSVGElement).getBoundingClientRect();
                      setHover({ slug: state.slug, x: e.clientX - rect.left, y: e.clientY - rect.top });
                    }
                  }}
                  onMouseMove={(e) => {
                    if (hasTip) {
                      const rect = (e.currentTarget.ownerSVGElement as SVGSVGElement).getBoundingClientRect();
                      setHover({ slug: state.slug, x: e.clientX - rect.left, y: e.clientY - rect.top });
                    }
                  }}
                  onMouseLeave={() => setHover(null)}
                  style={{
                    default: {
                      fill: isFeatured ? "var(--accent)" : "#ECE7DC",
                      stroke: "#FFFFFF",
                      strokeWidth: 1,
                      outline: "none",
                      transition: "fill 0.2s ease",
                      cursor: hasTip ? "pointer" : "default",
                    },
                    hover: {
                      fill: isFeatured ? "#B8331F" : "#D8CEBA",
                      stroke: "#FFFFFF",
                      strokeWidth: 1.4,
                      outline: "none",
                      cursor: hasTip ? "pointer" : "default",
                    },
                    pressed: { fill: "var(--ink)", outline: "none" },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
      {tip ? (
        <div
          className="cv2-featured-map-tooltip"
          style={{
            left: hover.x,
            top: hover.y,
          }}
          role="tooltip"
        >
          <strong>{tip.title}</strong>
          {tip.sub ? <span>{tip.sub}</span> : null}
        </div>
      ) : null}
    </div>
  );
}

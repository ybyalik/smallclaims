"use client";

import { useMemo } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { STATES, type State } from "../../lib/states";

const GEO_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

type GeographyFeature = {
  rsmKey: string;
  properties: { name: string; [key: string]: unknown };
};

export default function FeaturedUsMap({ highlightedSlugs }: { highlightedSlugs: string[] }) {
  const featured = useMemo(() => new Set(highlightedSlugs), [highlightedSlugs]);

  const stateByName = useMemo(() => {
    const map: Record<string, State> = {};
    for (const s of STATES) map[s.name] = s;
    map["District Of Columbia"] = STATES.find((s) => s.slug === "district-of-columbia")!;
    return map;
  }, []);

  return (
    <div className="cv2-featured-map">
      <ComposableMap projection="geoAlbersUsa" width={900} height={520} style={{ width: "100%", height: "auto" }}>
        <Geographies geography={GEO_URL}>
          {({ geographies }: { geographies: GeographyFeature[] }) =>
            geographies.map((geo) => {
              const name = geo.properties.name;
              const state = stateByName[name];
              if (!state) return null;
              const isFeatured = featured.has(state.slug);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: {
                      fill: isFeatured ? "var(--accent)" : "#ECE7DC",
                      stroke: "#FFFFFF",
                      strokeWidth: 1,
                      outline: "none",
                      transition: "fill 0.2s ease",
                    },
                    hover: {
                      fill: isFeatured ? "#B8331F" : "#D8CEBA",
                      stroke: "#FFFFFF",
                      strokeWidth: 1.4,
                      outline: "none",
                    },
                    pressed: { fill: "var(--ink)", outline: "none" },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
      <div className="cv2-featured-map-legend">
        <span><i style={{ background: "var(--accent)" }} aria-hidden="true" /> Featured (10 highest-volume states)</span>
        <span><i style={{ background: "#ECE7DC", border: "1px solid #d4cdb9" }} aria-hidden="true" /> Other states</span>
      </div>
    </div>
  );
}

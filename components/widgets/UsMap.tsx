"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { STATES, type State } from "../../lib/states";

// Public-domain TopoJSON of US states (Albers USA projection-friendly)
const GEO_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

type GeographyFeature = {
  rsmKey: string;
  properties: { name: string; [key: string]: unknown };
  [key: string]: unknown;
};

export default function UsMap({ readySlugs }: { readySlugs: string[] }) {
  const router = useRouter();
  const ready = useMemo(() => new Set(readySlugs), [readySlugs]);

  const stateByName = useMemo(() => {
    const map: Record<string, State> = {};
    for (const s of STATES) map[s.name] = s;
    // Topojson sometimes labels DC as "District of Columbia" already, but be safe
    map["District Of Columbia"] = STATES.find((s) => s.slug === "district-of-columbia")!;
    return map;
  }, []);

  const [hover, setHover] = useState<{ name: string; abbr: string; isReady: boolean } | null>(null);
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  return (
    <div className="usmap-shell" onMouseLeave={() => setHover(null)}>
      <ComposableMap
        projection="geoAlbersUsa"
        width={900}
        height={520}
        style={{ width: "100%", height: "auto" }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }: { geographies: GeographyFeature[] }) =>
            geographies.map((geo) => {
              const name = geo.properties.name;
              const state = stateByName[name];
              if (!state) return null;
              const isReady = ready.has(state.slug);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => router.push(`/small-claims/${state.slug}`)}
                  onMouseEnter={() => setHover({ name: state.name, abbr: state.abbr, isReady })}
                  onMouseMove={(e: React.MouseEvent) => setPos({ x: e.clientX, y: e.clientY })}
                  style={{
                    default: {
                      fill: isReady ? "var(--accent)" : "#ECE7DC",
                      stroke: "#FFFFFF",
                      strokeWidth: 1,
                      outline: "none",
                      cursor: "pointer",
                      transition: "fill 0.18s ease",
                    },
                    hover: {
                      fill: isReady ? "#B8331F" : "#D8CEBA",
                      stroke: "#FFFFFF",
                      strokeWidth: 1.4,
                      outline: "none",
                      cursor: "pointer",
                    },
                    pressed: {
                      fill: "var(--ink)",
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
      {hover && (
        <div className="usmap-tooltip" style={{ left: pos.x + 12, top: pos.y + 12 }}>
          <span className="usmap-tooltip-name">{hover.name}</span>
          <span className={`usmap-tooltip-status ${hover.isReady ? "ready" : "soon"}`}>
            {hover.isReady ? "Guide ready" : "Coming soon"}
          </span>
        </div>
      )}
      <div className="usmap-legend">
        <span>
          <i style={{ background: "var(--accent)" }} aria-hidden="true" /> Ready
        </span>
        <span>
          <i style={{ background: "#ECE7DC", border: "1px solid #d4cdb9" }} aria-hidden="true" /> Coming soon
        </span>
      </div>
    </div>
  );
}

"use client";

// Hero right-side state-recovery pins on a real SVG map of the US. The
// pins float on top via absolute positioning so we keep the existing
// drop animation; the underlying map is now drawn from real geography
// so each state has a distinct outline that reads on any background.

import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const GEO_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

type GeographyFeature = {
  rsmKey: string;
  properties: { name: string; [key: string]: unknown };
};

const PINS = [
  { x: 12, y: 56, label: "$4,500", state: "California" },
  { x: 38, y: 70, label: "$6,200", state: "Texas" },
  { x: 82, y: 32, label: "$3,800", state: "New York" },
  { x: 75, y: 70, label: "$2,800", state: "Florida" },
  { x: 56, y: 48, label: "$5,400", state: "Illinois" },
  { x: 70, y: 38, label: "$4,200", state: "Ohio" },
];

const HIGHLIGHT = new Set(PINS.map((p) => p.state));

export default function HeroStatePins() {
  return (
    <div className="hero-statepins">
      <div className="hero-statepins-mapbox">
        <div className="hero-statepins-map" aria-hidden>
          <ComposableMap
            projection="geoAlbersUsa"
            width={900}
            height={520}
            style={{ width: "100%", height: "100%" }}
          >
            <Geographies geography={GEO_URL}>
              {({ geographies }: { geographies: GeographyFeature[] }) =>
                geographies.map((geo) => {
                  const isHighlight = HIGHLIGHT.has(geo.properties.name);
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      style={{
                        default: {
                          fill: isHighlight ? "var(--accent)" : "#ECE7DC",
                          stroke: "rgba(31, 27, 22, 0.5)",
                          strokeWidth: 0.85,
                          outline: "none",
                        },
                        hover: {
                          fill: isHighlight ? "var(--accent)" : "#ECE7DC",
                          stroke: "rgba(31, 27, 22, 0.5)",
                          strokeWidth: 0.85,
                          outline: "none",
                        },
                        pressed: { outline: "none" },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        </div>
        {PINS.map((p, i) => (
          <div
            key={p.state}
            className="hero-statepins-pin"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              animationDelay: `${0.1 + i * 0.18}s`,
            }}
          >
            <div className="hero-statepins-pin-label">{p.label}</div>
            <div className="hero-statepins-pin-stem" aria-hidden />
          </div>
        ))}
      </div>
      <div className="hero-statepins-foot">
        <span className="hero-statepins-foot-eyebrow">Recovery by state</span>
        <span className="hero-statepins-foot-sub">illustrative &middot; varies by case</span>
      </div>
    </div>
  );
}

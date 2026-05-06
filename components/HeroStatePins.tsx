// Hero right-side state-recovery pins on a full faded US map.

const PINS = [
  { x: 12, y: 56, label: "$4,500", state: "CA" },
  { x: 38, y: 70, label: "$6,200", state: "TX" },
  { x: 82, y: 32, label: "$3,800", state: "NY" },
  { x: 75, y: 70, label: "$2,800", state: "FL" },
  { x: 56, y: 48, label: "$5,400", state: "IL" },
  { x: 70, y: 38, label: "$4,200", state: "OH" },
];

export default function HeroStatePins() {
  return (
    <div className="hero-statepins">
      <div className="hero-statepins-mapbox">
        <div className="hero-statepins-map" aria-hidden />
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
        <span className="hero-statepins-foot-sub">illustrative · varies by case</span>
      </div>
    </div>
  );
}

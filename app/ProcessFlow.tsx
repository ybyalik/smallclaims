"use client";

import { useEffect, useState } from "react";

type Step = {
  title: string;
  blurb: string;
  tags: string[];
  icon: React.ReactNode;
};

const STEPS: Step[] = [
  {
    title: "Describe",
    blurb: "Tell us what happened in plain language.",
    tags: ["Intake", "Plain English"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M4 6h16M4 12h10M4 18h7" />
      </svg>
    ),
  },
  {
    title: "Get a plan",
    blurb: "Case score, recommended action, projected outcome.",
    tags: ["Score", "Strategy"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="9" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Send demand",
    blurb: "Court-accurate letter. Certified mail handled.",
    tags: ["Drafting", "Certified"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
  },
  {
    title: "File claim",
    blurb: "County-specific forms, fees, instructions.",
    tags: ["Filing", "By state"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
        <path d="M14 3v6h6" />
      </svg>
    ),
  },
  {
    title: "Win & collect",
    blurb: "Garnishment, levy, or settlement — closed out.",
    tags: ["Judgment", "Collection"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
];

export default function ProcessFlow() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % STEPS.length), 2200);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="pw-grid">
      {STEPS.map((s, i) => (
        <div key={s.title} className={`pw-card${i === active ? " is-active" : ""}`}>
          <div className="pw-ico">{s.icon}</div>
          <h3>{s.title}</h3>
          <p className="sm">{s.blurb}</p>
          <div className="pw-tags">
            {s.tags.map((t) => (
              <span key={t} className="pw-tag">
                {t}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

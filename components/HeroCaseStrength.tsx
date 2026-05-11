// Home hero right-side: vintage US map + case strength dashboard.

import { Folder, Activity, Scale } from "lucide-react";

export default function HeroCaseStrength() {
  return (
    <div className="hero-strength">
      <div className="hero-strength-side">
        <div className="hero-strength-row">
          <span className="hero-strength-icon" aria-hidden>
            <Folder size={22} strokeWidth={1.7} />
          </span>
          <div className="hero-strength-row-text">
            <div className="hero-strength-label">Case</div>
            <div className="hero-strength-value accent">CC-2841</div>
          </div>
        </div>
        <div className="hero-strength-row">
          <span className="hero-strength-icon" aria-hidden>
            <Activity size={22} strokeWidth={1.7} />
          </span>
          <div className="hero-strength-row-text">
            <div className="hero-strength-label">Status</div>
            <div className="hero-strength-value">
              <span className="hero-strength-dot" aria-hidden /> LIVE
            </div>
          </div>
        </div>
        <div className="hero-strength-row">
          <span className="hero-strength-icon" aria-hidden>
            <Scale size={22} strokeWidth={1.7} />
          </span>
          <div className="hero-strength-row-text">
            <div className="hero-strength-label">Jurisdiction</div>
            <div className="hero-strength-value">Georgia</div>
          </div>
        </div>
      </div>
      <div className="hero-strength-main">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/vintage-map.webp" alt="" className="hero-strength-map" />
        <div className="hero-strength-score">
          <div className="hero-strength-score-label">Case Strength</div>
          <div className="hero-strength-score-num">
            78<span className="hero-strength-score-denom">/100</span>
          </div>
        </div>
        <div className="hero-strength-meter" aria-hidden>
          <div className="hero-strength-meter-track" />
          <div className="hero-strength-meter-dot" />
          <div className="hero-strength-meter-labels">
            <span>Weak</span>
            <span>Moderate</span>
            <span>Strong</span>
            <span>Very strong</span>
          </div>
        </div>
      </div>
    </div>
  );
}

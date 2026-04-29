"use client";

import { useState } from "react";

/* ════════════════════════════════════════════════════════════════════════════
   STEP-BY-STEP variants
   ════════════════════════════════════════════════════════════════════════════ */

const DEPOSIT_STEPS = [
  { day: "Day 0", title: "Send written demand", body: "Include forwarding address + statutory deadline. Certified mail.", cost: "$5" },
  { day: "Day 14-30", title: "Wait out the deadline", body: "Each state sets a hard return deadline. Don't file before it passes.", cost: "$0" },
  { day: "Day 31", title: "Send final demand letter", body: "Calculate full statutory penalty: deposit + 2x or 3x + attorney fees.", cost: "$39" },
  { day: "Day 35", title: "File in small claims", body: "Statement of Claim, filing fee, two copies for the clerk.", cost: "$45" },
  { day: "Day 40", title: "Serve the landlord", body: "Sheriff, certified mail, or private process server. Not yourself.", cost: "$50" },
  { day: "Day 60", title: "Show up to the hearing", body: "Bring lease, photos, receipts, demand letter. Lead with the dollar number.", cost: "$0" },
  { day: "Day 90", title: "Collect after winning", body: "30 days to pay. After that: liens, garnishment, levy.", cost: "$30" },
];

export function StepsTimelineVariant() {
  return (
    <div className="sv-stack">
      {DEPOSIT_STEPS.map((s, i) => (
        <div key={i} className="sv-tl-row">
          <div className="sv-tl-rail">
            <div className={`sv-tl-dot ${i === 2 ? "active" : ""}`} />
            {i < DEPOSIT_STEPS.length - 1 && <div className="sv-tl-line" />}
          </div>
          <div className="sv-tl-card">
            <div className="sv-tl-day">{s.day}</div>
            <div className="sv-tl-title">{s.title}</div>
            <div className="sv-tl-body">{s.body}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function StepsSubwayVariant() {
  return (
    <div className="sv-subway">
      <div className="sv-subway-rail">
        {DEPOSIT_STEPS.map((s, i) => (
          <div key={i} className="sv-subway-stop">
            <div className={`sv-subway-marker ${i >= 3 ? "filed" : ""}`} />
            <div className="sv-subway-day">{s.day}</div>
            <div className="sv-subway-title">{s.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function StepsReceiptVariant() {
  return (
    <div className="sv-receipt">
      <div className="sv-receipt-head">
        <div>CIVILCASE COURT DOCKET</div>
        <div className="sv-receipt-meta">SECURITY-DEPOSIT TIMELINE · 7 STEPS</div>
      </div>
      <div className="sv-receipt-body">
        {DEPOSIT_STEPS.map((s, i) => (
          <div key={i} className="sv-receipt-row">
            <div className="sv-receipt-check" />
            <div>
              <div className="sv-receipt-step">{s.title.toUpperCase()}</div>
              <div className="sv-receipt-sub">{s.body}</div>
            </div>
            <div className="sv-receipt-meta-cell">
              <div>{s.day}</div>
              <div className="sv-receipt-cost">{s.cost}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="sv-receipt-foot">
        <div>EST. TOTAL OUT-OF-POCKET</div>
        <div>$169</div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   HOW LONG (deadline) variants
   ════════════════════════════════════════════════════════════════════════════ */

export function HowLongHeroNumericVariant() {
  return (
    <div className="sv-stack-pair">
      <div className="sv-numeric-card">
        <div className="sv-numeric-label">Your landlord has</div>
        <div className="sv-numeric-big">21<span>days</span></div>
        <div className="sv-numeric-sub">to return your deposit (or send an itemized list of deductions)</div>
        <div className="sv-numeric-bar-wrap">
          <div className="sv-numeric-bar"><span style={{ width: "70%" }}></span></div>
          <div className="sv-numeric-marker" style={{ left: "70%" }}>You are here · day 15</div>
        </div>
      </div>
    </div>
  );
}

const STATE_COMPARE = [
  { state: "California", days: 21, penalty: "2x bad faith", statute: "Civ. Code § 1950.5" },
  { state: "New York", days: 14, penalty: "Up to 2x", statute: "Gen. Oblig. § 7-108" },
  { state: "Texas", days: 30, penalty: "$100 + 3x", statute: "Prop. Code § 92.109" },
];

export function HowLongStateCompareVariant() {
  return (
    <div className="sv-compare-grid">
      {STATE_COMPARE.map((s) => (
        <div key={s.state} className="sv-compare-card">
          <div className="sv-compare-state">{s.state}</div>
          <div className="sv-compare-days">{s.days}<span>days</span></div>
          <div className="sv-compare-row"><span>Bad-faith penalty</span><strong>{s.penalty}</strong></div>
          <div className="sv-compare-row"><span>Statute</span><code>{s.statute}</code></div>
        </div>
      ))}
    </div>
  );
}

export function HowLongCalendarVariant() {
  return (
    <div className="sv-calendar">
      <div className="sv-cal-head">
        <div>21-day deposit return window — California</div>
        <div className="sv-cal-meta">Move-out: April 1 · Deadline: April 22</div>
      </div>
      <div className="sv-cal-grid">
        {Array.from({ length: 30 }).map((_, i) => {
          const day = i + 1;
          let cls = "";
          if (day === 1) cls = "moveout";
          else if (day >= 2 && day <= 21) cls = "window";
          else if (day === 22) cls = "deadline";
          else if (day > 22) cls = "sue";
          return (
            <div key={i} className={`sv-cal-day ${cls}`}>
              <span>{day}</span>
              {day === 1 && <em>Move-out</em>}
              {day === 22 && <em>Deadline</em>}
            </div>
          );
        })}
      </div>
      <div className="sv-cal-key">
        <span><i className="moveout" />Move-out</span>
        <span><i className="window" />Landlord&rsquo;s window (21 days)</span>
        <span><i className="deadline" />Deadline</span>
        <span><i className="sue" />You can sue</span>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   WHAT YOU CAN RECOVER variants
   ════════════════════════════════════════════════════════════════════════════ */

export function RecoverReceiptVariant() {
  return (
    <div className="sv-receipt sv-receipt-narrow">
      <div className="sv-receipt-head">
        <div>SETTLEMENT BREAKDOWN</div>
        <div className="sv-receipt-meta">SAMPLE · CALIFORNIA · BAD FAITH</div>
      </div>
      <div className="sv-receipt-body">
        <div className="sv-receipt-totalline"><span>Deposit withheld</span><span>$1,500</span></div>
        <div className="sv-receipt-totalline"><span>Statutory penalty (2x)</span><span>$3,000</span></div>
        <div className="sv-receipt-totalline"><span>Attorney&rsquo;s fees</span><span>$300</span></div>
        <div className="sv-receipt-totalline"><span>Pre-judgment interest</span><span>$150</span></div>
      </div>
      <div className="sv-receipt-foot bold">
        <div>ESTIMATED RECOVERY</div>
        <div>$4,950</div>
      </div>
    </div>
  );
}

export function RecoverStackedBarVariant() {
  return (
    <div className="sv-stackedbar-card">
      <div className="sv-stackedbar-head">
        <div>
          <div className="sv-stackedbar-eyebrow">Sample recovery</div>
          <div className="sv-stackedbar-title">$4,950 estimated</div>
          <div className="sv-stackedbar-sub">3.3× the deposit, on a $1,500 bad-faith withholding</div>
        </div>
      </div>
      <div className="sv-stackedbar">
        <div className="sv-stackedbar-seg" style={{ width: "30%", background: "#0c0c0c" }}>
          <span>Deposit · $1,500</span>
        </div>
        <div className="sv-stackedbar-seg" style={{ width: "60%", background: "var(--accent)" }}>
          <span>2x penalty · $3,000</span>
        </div>
        <div className="sv-stackedbar-seg" style={{ width: "6%", background: "#f5b660" }} />
        <div className="sv-stackedbar-seg" style={{ width: "4%", background: "#3dba6a" }} />
      </div>
      <div className="sv-stackedbar-legend">
        <span><i style={{ background: "#f5b660" }} /> Attorney fees · $300</span>
        <span><i style={{ background: "#3dba6a" }} /> Interest · $150</span>
      </div>
    </div>
  );
}

export function RecoverGlobeCardVariant() {
  return (
    <div className="sv-globe-card">
      <div className="sv-globe-num">
        <em>$25K</em>
        <span>maximum statutory recovery in California</span>
      </div>
      <svg className="sv-globe-svg" viewBox="0 0 200 200">
        <defs>
          <radialGradient id="sv-gl" cx="35%" cy="35%">
            <stop offset="0" stopColor="#F4A28C" />
            <stop offset="1" stopColor="#D9402E" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="90" fill="url(#sv-gl)" />
        <ellipse cx="100" cy="100" rx="90" ry="36" stroke="#FEF9F1" strokeOpacity=".4" fill="none" />
        <ellipse cx="100" cy="100" rx="60" ry="90" stroke="#FEF9F1" strokeOpacity=".4" fill="none" />
        <text x="100" y="106" textAnchor="middle" fill="#1A1714" fontSize="34" fontFamily="Newsreader" fontWeight="700">CA</text>
      </svg>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   EVIDENCE variants
   ════════════════════════════════════════════════════════════════════════════ */

export function EvidenceCorkboardVariant() {
  const items = [
    { caption: "Lease, signed", url: "https://images.unsplash.com/photo-1554224155-1696413565d3?w=400&h=400&fit=crop", rot: -3 },
    { caption: "Move-out", url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop", rot: 2 },
    { caption: "Receipts", url: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=400&h=400&fit=crop", rot: -1 },
    { caption: "Texts", url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=400&fit=crop", rot: 4 },
    { caption: "Bank record", url: "https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=400&h=400&fit=crop", rot: -2 },
    { caption: "Witness note", url: "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=400&h=400&fit=crop", rot: 1 },
  ];
  return (
    <div className="sv-cork">
      {items.map((it, i) => (
        <div key={i} className="sv-cork-pin" style={{ transform: `rotate(${it.rot}deg)` }}>
          <div className="sv-cork-tack" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={it.url} alt="" />
          <div className="sv-cork-cap">{it.caption}</div>
        </div>
      ))}
    </div>
  );
}

export function EvidenceBentoVariant() {
  return (
    <div className="sv-bento">
      <div className="sv-bento-cell sv-bento-photos">
        <div className="sv-bento-tag">Photos</div>
        <div className="sv-bento-grid">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="sv-bento-thumb" style={{
              backgroundImage: `url(https://images.unsplash.com/photo-${["1554224155-1696413565d3", "1558618666-fcd25c85cd64", "1554224154-26032ffc0d07", "1517245386807-bb43f82c33c4"][i - 1]}?w=300&h=300&fit=crop)`
            }} />
          ))}
        </div>
      </div>
      <div className="sv-bento-cell sv-bento-texts">
        <div className="sv-bento-tag">Texts</div>
        <div className="sv-bento-bubble in">Hey, I&rsquo;m moving out April 1.</div>
        <div className="sv-bento-bubble out">OK, will send deposit.</div>
        <div className="sv-bento-bubble in">It&rsquo;s been 30 days...</div>
      </div>
      <div className="sv-bento-cell sv-bento-lease">
        <div className="sv-bento-tag">Lease</div>
        <div className="sv-bento-doc">
          <div className="sv-bento-doc-line" />
          <div className="sv-bento-doc-line short" />
          <div className="sv-bento-doc-line" />
          <div className="sv-bento-doc-line short" />
          <div className="sv-bento-doc-sig">/s/ Tenant signature</div>
        </div>
      </div>
      <div className="sv-bento-cell sv-bento-receipt">
        <div className="sv-bento-tag">Receipt</div>
        <div className="sv-bento-doc receipt">
          <div className="sv-bento-doc-line" />
          <div className="sv-bento-doc-line short" />
          <div className="sv-bento-doc-amount">$1,500</div>
        </div>
      </div>
    </div>
  );
}

export function EvidenceProgressRingVariant() {
  const items = [
    { label: "Lease, signed copy", checked: true },
    { label: "Move-in / move-out photos", checked: true },
    { label: "Bank records of every payment", checked: true },
    { label: "Texts & emails with landlord", checked: true },
    { label: "Receipts for what you spent", checked: false },
    { label: "Forwarding-address notice", checked: false },
    { label: "Witness contact info", checked: false },
  ];
  const done = items.filter((i) => i.checked).length;
  const pct = Math.round((done / items.length) * 100);
  return (
    <div className="sv-progress-card">
      <div className="sv-ring">
        <svg viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="34" stroke="#ece4d3" strokeWidth="6" fill="none" />
          <circle cx="40" cy="40" r="34" stroke="var(--accent)" strokeWidth="6" fill="none"
            strokeDasharray={`${(pct / 100) * 213.6} 213.6`} strokeLinecap="round"
            transform="rotate(-90 40 40)" />
        </svg>
        <div className="sv-ring-num">{pct}%</div>
      </div>
      <div className="sv-progress-list">
        <div className="sv-progress-head">{done} of {items.length} ready</div>
        {items.map((it) => (
          <div key={it.label} className={`sv-progress-row ${it.checked ? "done" : ""}`}>
            <div className="sv-progress-check">
              {it.checked && <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12l4 4 10-10" /></svg>}
            </div>
            <span>{it.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   ELIGIBILITY variants
   ════════════════════════════════════════════════════════════════════════════ */

export function EligibilityYesNoTreeVariant() {
  const [path, setPath] = useState<string[]>([]);
  function answer(q: string, ans: "y" | "n") {
    setPath([...path, `${q}:${ans}`]);
  }
  function reset() { setPath([]); }
  const step = path.length;
  const eligible = step === 4 && path.every((p) => p.endsWith(":y"));
  return (
    <div className="sv-tree">
      {step < 4 && (
        <div className="sv-tree-q">
          <div className="sv-tree-num">Question {step + 1} of 4</div>
          <h4>{[
            "Did you move out and give a written forwarding address?",
            "Has your state's deadline (14-30 days) passed?",
            "Did the landlord keep some or all of your deposit?",
            "Is the amount under your state's small-claims cap?",
          ][step]}</h4>
          <div className="sv-tree-actions">
            <button className="sv-tree-btn yes" onClick={() => answer(`q${step}`, "y")}>Yes</button>
            <button className="sv-tree-btn no" onClick={() => answer(`q${step}`, "n")}>No</button>
          </div>
        </div>
      )}
      {step >= 4 && (
        <div className={`sv-tree-result ${eligible ? "ok" : "no"}`}>
          <h4>{eligible ? "✓ You can file in small claims." : "Probably need more steps first."}</h4>
          <p>{eligible
            ? "Generate a demand letter; if no response, file in your state's small-claims court."
            : "Some pre-conditions aren't met. Talk to a tenant-rights attorney before filing."}</p>
          <button className="sv-tree-reset" onClick={reset}>Start over</button>
        </div>
      )}
      <div className="sv-tree-progress">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`sv-tree-pip ${i < step ? "done" : i === step ? "active" : ""}`} />
        ))}
      </div>
    </div>
  );
}

export function EligibilityTwoColPSVariant() {
  return (
    <div className="sv-pspair">
      <div className="sv-ps-light">
        <div className="sv-ps-tag">You qualify if</div>
        <ul>
          <li>You moved out and gave written forwarding address</li>
          <li>Your state&rsquo;s 14-30 day deadline has passed</li>
          <li>Landlord kept some or all of the deposit</li>
          <li>Amount is under your state&rsquo;s small-claims cap</li>
        </ul>
      </div>
      <div className="sv-ps-dark">
        <div className="sv-ps-tag">You probably don&rsquo;t qualify if</div>
        <ul>
          <li>You&rsquo;re still living in the unit</li>
          <li>You never gave a forwarding address</li>
          <li>The deadline hasn&rsquo;t hit yet</li>
          <li>The amount exceeds your state&rsquo;s cap</li>
        </ul>
      </div>
    </div>
  );
}

export function EligibilityQuizVariant() {
  const [a, setA] = useState({ q1: false, q2: false, q3: false, q4: false });
  const score = Object.values(a).filter(Boolean).length;
  const verdict = score === 4 ? "ok" : score >= 2 ? "warn" : "no";
  return (
    <div className="sv-quiz">
      <div className="sv-quiz-toggles">
        {[
          ["q1", "Moved out + sent forwarding address"],
          ["q2", "Deadline (14-30 days) has passed"],
          ["q3", "Landlord kept some or all deposit"],
          ["q4", "Amount under your state's cap"],
        ].map(([key, label]) => {
          const k = key as keyof typeof a;
          return (
            <button key={key} className={`sv-quiz-tog ${a[k] ? "on" : ""}`} onClick={() => setA({ ...a, [k]: !a[k] })}>
              <span className="sv-quiz-tog-dot" />
              {label}
            </button>
          );
        })}
      </div>
      <div className={`sv-quiz-verdict tone-${verdict}`}>
        <div className="sv-quiz-verdict-num">{score}/4</div>
        <div>
          <div className="sv-quiz-verdict-h">
            {verdict === "ok" ? "Eligible — file in small claims" : verdict === "warn" ? "Borderline — try a demand letter first" : "Likely too early to file"}
          </div>
          <div className="sv-quiz-verdict-sub">
            {verdict === "ok" ? "All four conditions hit. Strong case." : verdict === "warn" ? "Some pre-conditions still need to clear." : "Wait until conditions are met or consult an attorney."}
          </div>
        </div>
      </div>
    </div>
  );
}

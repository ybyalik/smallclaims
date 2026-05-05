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

/* ════════════════════════════════════════════════════════════════════════════
   HUB HERO variants (currently: copy + stat card + photo 3-col)
   ════════════════════════════════════════════════════════════════════════════ */

export function HubHeroMagazineVariant() {
  return (
    <div className="sv-mag">
      <div className="sv-mag-copy">
        <span className="eyebrow">Category</span>
        <h2>Landlord Disputes in <em>Small Claims Court</em></h2>
        <p>Most tenants don&rsquo;t know they&rsquo;re owed 2&ndash;3× more than the deposit. We do the math, send the demand, walk you through filing.</p>
        <div className="sv-mag-stats">
          <div><strong>$1,840</strong><span>avg recovery</span></div>
          <div><strong>21d</strong><span>median timeline</span></div>
          <div><strong>50</strong><span>states covered</span></div>
        </div>
      </div>
      <div className="sv-mag-photo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&h=1200&fit=crop" alt="" />
        <div className="sv-mag-quote">&ldquo;Got my deposit back in 11 days. The demand letter did all the work.&rdquo;<span>— Maya, Brooklyn</span></div>
      </div>
    </div>
  );
}

export function HubHeroFloatingUIVariant() {
  return (
    <div className="sv-floating">
      <div className="sv-floating-copy">
        <span className="eyebrow">Category</span>
        <h2>Sue your landlord. <em>Without the lawyer.</em></h2>
        <p>If you&rsquo;re owed money — deposit, repairs, hotel costs from a lockout — small claims is the right door. Filing fee under $100. Hearing under 15 minutes.</p>
        <div className="hero-ctas" style={{ marginTop: 18 }}>
          <a href="#" className="btn btn-dark">Check my case (free)</a>
          <a href="#" className="btn btn-cream">Send a demand letter</a>
        </div>
      </div>
      <div className="sv-floating-cards">
        <div className="sv-fc sv-fc-1">
          <div className="sv-fc-tag">CASE STRENGTH</div>
          <div className="sv-fc-num">82</div>
          <div className="sv-fc-bar"><span style={{ width: "82%" }} /></div>
        </div>
        <div className="sv-fc sv-fc-2">
          <div className="sv-fc-tag">DEPOSIT</div>
          <div className="sv-fc-row"><strong>$1,500</strong><span>+ 2× penalty</span></div>
          <div className="sv-fc-total">$4,950 estimated</div>
        </div>
        <div className="sv-fc sv-fc-3">
          <div className="sv-fc-tag">CA · DEADLINE</div>
          <div className="sv-fc-num small">21<span>days</span></div>
        </div>
      </div>
    </div>
  );
}

export function HubHeroReceiptVariant() {
  return (
    <div className="sv-hero-receipt">
      <div>
        <span className="eyebrow">Category</span>
        <h2>Landlord Disputes in <em>Small Claims Court</em></h2>
        <p>Read your state&rsquo;s rules. Send the demand. File if it&rsquo;s ignored. Most disputes end at step 2.</p>
        <div className="hero-ctas" style={{ marginTop: 18 }}>
          <a href="#" className="btn btn-dark">Check my case (free)</a>
          <a href="#" className="btn btn-cream">Send a demand letter</a>
        </div>
      </div>
      <div className="sv-receipt sv-receipt-narrow" style={{ margin: 0 }}>
        <div className="sv-receipt-head">
          <div>SAMPLE RECOVERY</div>
          <div className="sv-receipt-meta">CA · BAD-FAITH WITHHOLDING</div>
        </div>
        <div className="sv-receipt-body">
          <div className="sv-receipt-totalline"><span>Deposit withheld</span><span>$1,500</span></div>
          <div className="sv-receipt-totalline"><span>Statutory penalty (2x)</span><span>$3,000</span></div>
          <div className="sv-receipt-totalline"><span>Attorney fees + interest</span><span>$450</span></div>
        </div>
        <div className="sv-receipt-foot bold">
          <div>EST. RECOVERY</div>
          <div>$4,950</div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   ISSUE CARDS variants
   ════════════════════════════════════════════════════════════════════════════ */

const ISSUE_LIST = [
  { title: "Security deposit", avg: "$1,840", blurb: "Most common. 2x or 3x penalty in many states." },
  { title: "Illegal lockout", avg: "$3,200", blurb: "Self-help eviction triggers treble damages." },
  { title: "Mold / habitability", avg: "$2,400", blurb: "Medical costs, ruined property, rent reduction." },
  { title: "Repairs not made", avg: "$960", blurb: "Repair-and-deduct, rent escrow." },
  { title: "Pest infestation", avg: "$1,150", blurb: "Treatment costs and ruined belongings." },
  { title: "Wrongful eviction", avg: "$4,100", blurb: "Moving costs + statutory penalties." },
  { title: "Lead poisoning", avg: "$5,800", blurb: "Federal disclosure violations." },
];

export function IssuesBentoVariant() {
  return (
    <div className="sv-issues-bento">
      <div className="sv-ib sv-ib-feature">
        <div className="sv-ib-tag">MOST COMMON</div>
        <h4>Security deposit not returned</h4>
        <p>Many states stack 2x or 3x the deposit as a bad-faith penalty. Highest-volume tenant claim by far.</p>
        <div className="sv-ib-stat">$1,840 avg recovery</div>
      </div>
      <div className="sv-ib sv-ib-feature dark">
        <div className="sv-ib-tag" style={{ color: "#f5b29f" }}>HIGHEST PENALTY</div>
        <h4>Illegal lockout</h4>
        <p>Treble damages plus moving and hotel costs. Most expensive landlord mistake in the playbook.</p>
        <div className="sv-ib-stat" style={{ color: "#f5b29f" }}>$3,200 avg recovery</div>
      </div>
      {ISSUE_LIST.slice(2, 7).map((i) => (
        <div key={i.title} className="sv-ib">
          <h5>{i.title}</h5>
          <p>{i.blurb}</p>
          <div className="sv-ib-stat-sm">{i.avg}</div>
        </div>
      ))}
    </div>
  );
}

export function IssuesRowListVariant() {
  return (
    <div className="sv-issuerows">
      {ISSUE_LIST.map((i, idx) => (
        <div key={i.title} className="sv-irow">
          <div className="sv-irow-num">0{idx + 1}</div>
          <div className="sv-irow-body">
            <div className="sv-irow-title">{i.title}</div>
            <div className="sv-irow-blurb">{i.blurb}</div>
          </div>
          <div className="sv-irow-stat">
            <div className="sv-irow-amount">{i.avg}</div>
            <div className="sv-irow-amount-label">avg recovery</div>
          </div>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" className="sv-irow-arrow">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </div>
      ))}
    </div>
  );
}

export function IssuesTabSwitcherVariant() {
  const [active, setActive] = useState(0);
  const examples = [
    { case: "Maya · Brooklyn, NY", recovery: "$2,800", days: "12 days", quote: "Landlord ghosted for 6 weeks. Demand letter on his desk in 48 hours." },
    { case: "Daniel · Austin, TX", recovery: "$4,200", days: "11 days", quote: "Already paid two lawyers $1,800. Finished it for $54 and a stamp." },
    { case: "Lena · Chicago, IL", recovery: "$890", days: "6 days", quote: "It felt fair. Like the system actually heard me." },
    { case: "Marcus · Phoenix, AZ", recovery: "$6,750", days: "25 days", quote: "Ex-employer thought ignoring me would be cheaper. Wasn't." },
    { case: "Sara · Denver, CO", recovery: "$3,400", days: "18 days", quote: "Auto repair overcharge. Settled before the court date." },
    { case: "Reza · LA, CA", recovery: "$1,150", days: "9 days", quote: "Photographer no-show. Refunded in full plus filing fee." },
    { case: "Aisha · Boston, MA", recovery: "$5,800", days: "31 days", quote: "Lead-paint disclosure violation. Statute did all the work." },
  ];
  const ex = examples[active] ?? examples[0];
  return (
    <div className="sv-tabsw">
      <div className="sv-tabsw-tabs">
        {ISSUE_LIST.map((i, idx) => (
          <button key={i.title} className={`sv-tabsw-tab ${idx === active ? "active" : ""}`} onClick={() => setActive(idx)}>
            {i.title}
          </button>
        ))}
      </div>
      <div className="sv-tabsw-card">
        <div className="sv-tabsw-meta">
          <div className="sv-tabsw-amount">{ex.recovery}</div>
          <div>
            <div className="sv-tabsw-case">{ex.case}</div>
            <div className="sv-tabsw-days">recovered in {ex.days}</div>
          </div>
        </div>
        <p className="sv-tabsw-quote">&ldquo;{ex.quote}&rdquo;</p>
        <a href="#" className="btn btn-dark" style={{ alignSelf: "flex-start" }}>Read this guide →</a>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   "HOW SMALL CLAIMS HANDLES" variants
   ════════════════════════════════════════════════════════════════════════════ */

export function HandlesTableVariant() {
  return (
    <div className="sv-handles">
      <table className="sv-handles-table">
        <thead>
          <tr><th>Situation</th><th>Where it goes</th></tr>
        </thead>
        <tbody>
          <tr><td><strong>Withheld security deposit</strong></td><td className="ok">✓ Small claims</td></tr>
          <tr><td><strong>Repairs you paid for</strong></td><td className="ok">✓ Small claims</td></tr>
          <tr><td><strong>Hotel during illegal lockout</strong></td><td className="ok">✓ Small claims</td></tr>
          <tr><td><strong>Ruined personal property</strong></td><td className="ok">✓ Small claims</td></tr>
          <tr><td><strong>Lead-paint disclosure violation</strong></td><td className="ok">✓ Small claims</td></tr>
          <tr><td><strong>Getting back into your unit</strong></td><td className="no">✕ Housing court</td></tr>
          <tr><td><strong>Rent control calculation</strong></td><td className="no">✕ Administrative law</td></tr>
          <tr><td><strong>Fair-housing discrimination</strong></td><td className="no">✕ Civil rights venue</td></tr>
          <tr><td><strong>Eviction defense</strong></td><td className="no">✕ Unlawful detainer court</td></tr>
        </tbody>
      </table>
    </div>
  );
}

export function HandlesDoorsVariant() {
  return (
    <div className="sv-doors">
      <div className="sv-door sv-door-ok">
        <div className="sv-door-frame">
          <div className="sv-door-num">1</div>
          <div className="sv-door-h">Small Claims Court</div>
          <ul>
            <li>Money the landlord owes you</li>
            <li>Deposit, repairs, ruined property</li>
            <li>Hotel during a lockout</li>
            <li>Lead-paint violations</li>
          </ul>
          <div className="sv-door-tag">Most landlord money disputes go here</div>
        </div>
      </div>
      <div className="sv-door-or">or</div>
      <div className="sv-door sv-door-other">
        <div className="sv-door-frame">
          <div className="sv-door-num">2</div>
          <div className="sv-door-h">Other courts</div>
          <ul>
            <li>Housing court — getting your unit back</li>
            <li>Administrative law — rent control</li>
            <li>Civil rights — fair-housing claims</li>
            <li>Unlawful detainer — eviction defense</li>
          </ul>
          <div className="sv-door-tag">Different forms, different deadlines, often need an attorney</div>
        </div>
      </div>
    </div>
  );
}

export function HandlesMatrixVariant() {
  const items = [
    { name: "Withheld deposit", small: true },
    { name: "Repairs you paid for", small: true },
    { name: "Hotel during lockout", small: true },
    { name: "Ruined property", small: true },
    { name: "Lead disclosure", small: true },
    { name: "Reduced rent (uninhabitable)", small: "depends" },
    { name: "Get back into unit", small: false },
    { name: "Rent control", small: false },
    { name: "Discrimination", small: false },
  ];
  return (
    <div className="sv-matrix">
      {items.map((it) => (
        <div key={it.name} className={`sv-matrix-cell ${it.small === true ? "ok" : it.small === false ? "no" : "maybe"}`}>
          <div className="sv-matrix-pill">
            {it.small === true ? "Small claims" : it.small === false ? "Different court" : "Depends"}
          </div>
          <div className="sv-matrix-name">{it.name}</div>
        </div>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   STATE-SPECIFIC RULES variants
   ════════════════════════════════════════════════════════════════════════════ */

const STATES_LIST = [
  { name: "California", days: 21, penalty: "2×" },
  { name: "New York", days: 14, penalty: "2×" },
  { name: "Texas", days: 30, penalty: "$100 + 3×" },
  { name: "Florida", days: 60, penalty: "Forfeit" },
  { name: "Illinois", days: 30, penalty: "2×" },
  { name: "Pennsylvania", days: 30, penalty: "2×" },
  { name: "Massachusetts", days: 30, penalty: "3×" },
  { name: "Minnesota", days: 21, penalty: "2× + $500" },
  { name: "Washington", days: 30, penalty: "2×" },
  { name: "Colorado", days: 60, penalty: "3×" },
  { name: "Oregon", days: 31, penalty: "2×" },
  { name: "Michigan", days: 30, penalty: "2×" },
];

export function StatesUSMapVariant() {
  // Simplified visual — abstract dot map, hover to highlight
  const [hover, setHover] = useState<string | null>(null);
  const active = STATES_LIST.find((s) => s.name === hover) ?? STATES_LIST[0];
  return (
    <div className="sv-usmap">
      <div className="sv-usmap-canvas">
        <svg viewBox="0 0 640 360" width="100%" height="100%">
          {STATES_LIST.map((s, i) => {
            const cols = 6;
            const x = 80 + (i % cols) * 90;
            const y = 90 + Math.floor(i / cols) * 110;
            return (
              <g key={s.name} onMouseEnter={() => setHover(s.name)} style={{ cursor: "pointer" }}>
                <circle cx={x} cy={y} r={hover === s.name ? 28 : 22} fill={hover === s.name ? "var(--accent)" : "rgba(217,64,46,0.18)"} stroke={hover === s.name ? "var(--accent)" : "#d9402e"} strokeWidth="2" style={{ transition: "all .2s ease" }} />
                <text x={x} y={y + 5} textAnchor="middle" fontSize="13" fontWeight="700" fill={hover === s.name ? "#fff" : "#d9402e"} style={{ pointerEvents: "none" }}>{s.days}</text>
                <text x={x} y={y + 42} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--ink)" style={{ pointerEvents: "none" }}>{s.name}</text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="sv-usmap-info">
        <div className="sv-usmap-h">{active.name}</div>
        <div className="sv-usmap-row"><span>Deposit deadline</span><strong>{active.days} days</strong></div>
        <div className="sv-usmap-row"><span>Bad-faith penalty</span><strong>{active.penalty}</strong></div>
        <div className="sv-usmap-hint">Hover any dot to compare. The number is the days the landlord has.</div>
      </div>
    </div>
  );
}

export function StatesSpotlightVariant() {
  return (
    <div className="sv-spotlight">
      <div className="sv-spotlight-feature">
        <div className="sv-spotlight-tag">YOUR STATE · CALIFORNIA</div>
        <div className="sv-spotlight-h">21-day deadline. 2× penalty if bad faith.</div>
        <div className="sv-spotlight-stats">
          <div><strong>$12,500</strong><span>Small-claims cap</span></div>
          <div><strong>2×</strong><span>Bad-faith penalty</span></div>
          <div><strong>21d</strong><span>Return deadline</span></div>
        </div>
        <a href="#" className="btn btn-dark" style={{ background: "#fef9f1", color: "var(--ink)" }}>Read the California guide</a>
      </div>
      <div className="sv-spotlight-grid">
        <div className="sv-spotlight-grid-h">Other states</div>
        {STATES_LIST.slice(1, 9).map((s) => (
          <a key={s.name} href="#" className="sv-spotlight-tile">
            <span>{s.name}</span>
            <strong>{s.days}d</strong>
          </a>
        ))}
      </div>
    </div>
  );
}

export function StatesTableVariant() {
  return (
    <div className="cat-table-wrap" style={{ marginTop: 0 }}>
      <table className="cat-table">
        <thead><tr><th>State</th><th>Deadline</th><th>Penalty</th><th>Cap</th><th></th></tr></thead>
        <tbody>
          {STATES_LIST.map((s) => (
            <tr key={s.name}>
              <td><strong>{s.name}</strong></td>
              <td>{s.days} days</td>
              <td>{s.penalty}</td>
              <td>varies</td>
              <td><a href="#" className="cat-text-link">Guide →</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   CTA CARD variants
   ════════════════════════════════════════════════════════════════════════════ */

export function CTASingleBoldVariant() {
  return (
    <div className="sv-cta-bold">
      <div className="sv-cta-bold-eyebrow">Take the next step</div>
      <h3>Send a demand letter <em>today</em>.</h3>
      <p>About half of disputes settle once a real demand letter shows up. $39 to draft, professional, mailed-ready.</p>
      <div className="sv-cta-bold-stats">
        <div><strong>$1,840</strong><span>avg recovery</span></div>
        <div><strong>21d</strong><span>median timeline</span></div>
        <div><strong>50</strong><span>states</span></div>
      </div>
      <a href="#" className="btn btn-dark" style={{ background: "#fef9f1", color: "var(--ink)", padding: "16px 32px", fontSize: 16 }}>Start a demand letter — $39 →</a>
    </div>
  );
}

export function CTAPhotoSplitVariant() {
  return (
    <div className="sv-cta-photo">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=800&h=900&fit=crop" alt="" />
      <div className="sv-cta-photo-card">
        <span className="eyebrow" style={{ color: "rgba(254,249,241,0.65)" }}>Three ways to start</span>
        <h3>Pick your <em>path</em>.</h3>
        <a href="#" className="sv-cta-photo-row">
          <strong>Demand letter — $39</strong>
          <span>About half of disputes end here.</span>
        </a>
        <a href="#" className="sv-cta-photo-row">
          <strong>Free case-score quiz</strong>
          <span>Strength read in 90 seconds.</span>
        </a>
        <a href="#" className="sv-cta-photo-row">
          <strong>Read your state guide</strong>
          <span>Forms, fees, deadlines.</span>
        </a>
      </div>
    </div>
  );
}

export function CTADashboardVariant() {
  return (
    <div className="sv-cta-dash">
      <div className="sv-cta-dash-mock">
        <div className="sv-cta-dash-row"><span>CASE #CC-NEW</span><span className="pill">Action recommended</span></div>
        <div className="sv-cta-dash-score">82<sup>/100</sup></div>
        <div className="sv-cta-dash-label">Estimated case strength</div>
        <div className="sv-cta-dash-bar"></div>
        <div className="sv-cta-dash-meta">
          <div><span>Claim</span><strong>Security deposit</strong></div>
          <div><span>Amount</span><strong>$1,500</strong></div>
          <div><span>Est. recovery</span><strong>$4,950</strong></div>
        </div>
      </div>
      <div className="sv-cta-dash-copy">
        <span className="eyebrow">Your case, in 90 seconds</span>
        <h3>Get a real read on your <em>specific case</em>.</h3>
        <p>Free 7-question quiz. Returns a strength score, your state&rsquo;s SOL deadline, and a recommended next step.</p>
        <a href="#" className="btn btn-dark">Start the case-score quiz</a>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   FAQ variants
   ════════════════════════════════════════════════════════════════════════════ */

const SAMPLE_FAQ = [
  { q: "Can I sue my landlord in small claims court?", a: "Yes — small claims is the standard venue for tenant-vs-landlord money disputes under your state's cap." },
  { q: "How long do I have to sue?", a: "Most landlord-tenant claims have 2–6 years depending on state and contract type." },
  { q: "Do I need a lawyer?", a: "No. Small claims is built for self-represented litigants and in some states lawyers aren't even allowed." },
  { q: "Can I sue while still living there?", a: "Legally yes; most states have anti-retaliation laws but enforcement is messy. Many tenants wait until they move out." },
  { q: "What if my landlord ignores the demand letter?", a: "That's the cue to file in small claims. The demand letter creates the paper trail judges expect." },
];

export function FAQGridVariant() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <div className="sv-faq-grid">
      {SAMPLE_FAQ.map((f, i) => (
        <button key={i} className={`sv-faq-card ${openIdx === i ? "open" : ""}`} onClick={() => setOpenIdx(openIdx === i ? null : i)}>
          <div className="sv-faq-q">{f.q}</div>
          {openIdx === i && <div className="sv-faq-a">{f.a}</div>}
          <div className="sv-faq-toggle">{openIdx === i ? "−" : "+"}</div>
        </button>
      ))}
    </div>
  );
}

export function FAQOpenVariant() {
  return (
    <div className="sv-faq-open">
      {SAMPLE_FAQ.map((f, i) => (
        <div key={i} className="sv-faq-open-row">
          <div className="sv-faq-open-q">
            <div className="sv-faq-open-num">Q{i + 1}</div>
            <div>{f.q}</div>
          </div>
          <div className="sv-faq-open-a">{f.a}</div>
        </div>
      ))}
    </div>
  );
}

export function FAQSearchVariant() {
  const [q, setQ] = useState("");
  const filtered = q.trim() === "" ? SAMPLE_FAQ : SAMPLE_FAQ.filter((f) => (f.q + f.a).toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="sv-faq-search">
      <div className="sv-faq-search-bar">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-3.5-3.5" />
        </svg>
        <input placeholder="Search the FAQ — try 'lawyer' or 'deadline'" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <div className="sv-faq-search-results">
        {filtered.length === 0 && <p className="sv-faq-empty">No matches for &ldquo;{q}&rdquo;.</p>}
        {filtered.map((f, i) => (
          <details key={i} open>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}

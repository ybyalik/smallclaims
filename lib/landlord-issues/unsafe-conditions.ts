import type { LandlordIssue } from "./types";

export const unsafeConditions: LandlordIssue = {
  slug: "unsafe-conditions",
  ready: true,
  short: "Unsafe conditions",
  breadcrumbLabel: "Unsafe conditions",

  meta: {
    title: "How to Sue Your Landlord for Unsafe Living Conditions",
    description:
      "Unsafe conditions are habitability violations in every state. Recover medical bills, ruined property, rent abatement, and (in some cases) personal-injury damages. How to file and what to bring to the hearing.",
  },

  hero: {
    eyebrowSuffix: "Unsafe conditions",
    h1: { pre: "Can I sue my landlord for ", em: "unsafe living conditions", post: "?" },
    leadStrong: "Yes, you can sue your landlord for unsafe conditions",
    leadBody:
      ". Every state's implied warranty of habitability requires landlords to provide safe housing. Recoverable damages include medical bills from injuries, ruined personal property, rent abatement for the affected period, and (in serious cases) statutory damages or punitive damages.",
  },

  counter: {
    amount: 6300,
    meta: "Implied warranty of habitability",
    rows: [
      { label: "Medical bills + property loss", value: "$3,500" },
      { label: "Rent abatement (3 months)", value: "+ $2,400", emphasis: "accent" },
      { label: "Filing fee + interest", value: "+ $400" },
    ],
    footer: "Habitability breach · documented written notice",
  },

  whatCounts: {
    h2: { pre: "What counts as ", em: "unsafe living conditions", post: "?" },
    lede:
      "Unsafe conditions are anything that makes the unit dangerous to use as housing. Four common categories.",
    cards: [
      {
        num: "01",
        title: "Structural failures",
        body:
          "Collapsed ceiling, sagging floor, broken stairs or railings, falling windows, missing fire escape, foundation cracks. These trigger immediate habitability claims and often code-enforcement violations.",
      },
      {
        num: "02",
        title: "Electrical and gas",
        body:
          "Sparking outlets, frequently tripping breakers, exposed wiring, gas leaks, broken smoke or CO detectors. Most states require landlords to provide working smoke and CO detectors with specific battery and installation rules.",
      },
      {
        num: "03",
        title: "Lead, mold, and asbestos",
        body:
          "Pre-1978 buildings have specific federal lead-disclosure rules. Mold and asbestos exposure trigger habitability claims and (with medical evidence) personal-injury claims.",
      },
      {
        num: "04",
        title: "Heat, water, and sewage",
        body:
          "Failing heat in winter, no hot water, sewage backups, water contamination. Most states give landlords 24 to 72 hours to fix these. Beyond that, you can break the lease, repair-and-deduct, or sue for rent abatement plus damages.",
      },
    ],
    note: {
      strongIntro: "Notify the landlord in writing first.",
      rest:
        " Unsafe-condition lawsuits start with the date you reported the problem. Email or text creates the timestamp. Also call code enforcement for serious issues. Inspectors create independent records the judge will trust.",
    },
  },

  claim: {
    h2: { pre: "How much can you sue for ", em: "unsafe conditions", post: "?" },
    lede:
      "Three categories stack. Medical bills and rent abatement are the workhorses. Punitive damages can apply to extreme cases.",
    layers: [
      {
        tag: "Layer 1",
        title: "Medical and property losses",
        body:
          "Hospital visits from injuries (falls, electrical shocks, gas leaks), prescriptions, replaced furniture and clothing, food spoiled by power loss.",
        amount: "$3,500",
      },
      {
        tag: "Layer 2",
        title: "Rent abatement",
        body:
          "Rent reduction for the affected period. Courts use a percentage of rent (often 25 to 100 percent) based on how much of the unit was unusable and for how long.",
        amount: "+ $2,400",
        accent: true,
      },
      {
        tag: "Layer 3",
        title: "Filing fees and statutory damages",
        body:
          "Filing fee, attorney fees in habitability cases (recoverable in many states even pro se), and statutory damages where state law authorizes them.",
        amount: "+ $400",
      },
    ],
    total: {
      label: "Sample case",
      body:
        "Three months of unaddressed electrical issues causing a kitchen fire, replaced appliances, two ER visits, and three months partial rent abatement.",
      amount: "$6,300",
      sublabel: "illustrative · varies by injury severity and state",
    },
  },

  demand: {
    h2: { pre: "Send a ", em: "habitability demand", post: " first." },
    lede:
      "A clear demand letter triggers the landlord's duty to fix the condition immediately. If they refuse, the letter becomes the foundation of your case at the hearing.",
    checklist: [
      "Date you first reported the condition",
      "What was reported and any injuries that followed",
      "Itemized medical and property losses",
      "A 14-day deadline to remediate or pay",
      "Sent certified mail with photos",
    ],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3569",
      date: "April 21, 2026",
      recipientName: "Pacific Coast Holdings",
      recipientAddress: "1755 Stockton Street, San Francisco, CA 94133",
      reLine: "Demand for damages, unsafe conditions at Apt 7B",
      bodyParagraphs: [
        "I notified you of <strong>sparking electrical outlets and a non-working smoke detector</strong> on January 8, 2026 (email attached). On March 14, an electrical fire in the kitchen damaged appliances and required hospital treatment for smoke inhalation.",
        "Pursuant to <strong>Cal. Civ. Code § 1941</strong> (implied warranty of habitability), I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Reimbursement of $3,500 in medical bills and replaced appliances (receipts attached);",
        "Rent abatement of $2,400 for three months of unsafe conditions;",
        "$400 in filing fees and statutory damages.",
      ],
      closingLine: "Total demand: <strong>$6,300.00</strong>. If unresolved, I will file in Small Claims Court.",
      signatory: "Drew M. Tenant",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " an unsafe-conditions case." },
    lede: "Four steps. Photos, dated reports, and code-enforcement records do most of the work.",
    steps: [
      {
        title: "Document and report",
        body:
          "Photos and video of the condition. Email or text the landlord (timestamps matter). Call local code enforcement for serious issues. Their report is independent evidence.",
      },
      {
        title: "File",
        body:
          "Small claims if total damages fit your state cap. File in the county where the rental is located. Filing fees usually run $30 to $80.",
      },
      {
        title: "Serve",
        body:
          "Sheriff or process server. File proof of service before the hearing.",
      },
      {
        title: "Hearing",
        body:
          "Open with the date you reported and what happened. Walk through photos and the code-enforcement report if you have one. Itemized medical and property receipts close the case.",
      },
    ],
    aftermath: {
      tag: "After you win",
      title: "Collecting and what comes next.",
      bodyHtml:
        "30-day voluntary payment, then enforcement. Habitability judgments are powerful: code enforcement can force the landlord to fix the issue building-wide. If similar conditions affect neighbors, your judgment can support their cases too.",
    },
  },

  evidence: {
    h2: { pre: "What evidence do you need ", em: "for unsafe conditions", post: "?" },
    lede:
      "Document every condition. Take photos before any repair. Save every report. Your case hinges on the timeline.",
    photos: [
      { id: "1607435543180-0b8d4ba79192", cap: "Damaged ceiling" },
      { id: "1597595272109-7c5d97caefb1", cap: "Mold near outlet" },
      { id: "1591019479261-c10b4716a0ea", cap: "Broken stairs" },
      { id: "1554224155-1696413565d3", cap: "Code violation notice" },
    ],
    texts: [
      { dir: "in", text: "The outlet sparked again. Electrical issue." },
      { dir: "out", text: "We'll get to it." },
      { dir: "in", text: "Three weeks now. Calling the city." },
    ],
    receipt: {
      vendor: "SAN FRANCISCO GENERAL ER",
      vendorAddr: "1001 Potrero Ave · SF, CA",
      receiptNum: "Visit #ER-29481",
      date: "03/14/2026",
      lineItems: [
        { label: "ER visit, smoke inhalation", amount: "$1,850.00" },
        { label: "Chest X-ray", amount: "$420.00" },
        { label: "Albuterol inhaler", amount: "$95.00" },
      ],
      subtotal: "$2,365.00",
      total: "$2,365.00",
      footer: "Receipt for tenant claim · thank you",
    },
  },

  defenses: {
    h2: { pre: "Common landlord ", em: "defenses", post: "." },
    lede:
      "Three defenses come up. Each has a clean rebuttal if you have the records.",
    items: [
      {
        quote: "We never knew about the condition.",
        pill: "Most common",
        rebuttal:
          "<strong>Rebuttal:</strong> dated emails or texts reporting the issue, code-enforcement reports, or maintenance-log entries. Most landlords keep some maintenance log. Subpoena it if needed.",
      },
      {
        quote: "The tenant caused the damage.",
        pill: "Causation",
        rebuttal:
          "<strong>Rebuttal:</strong> photos showing pre-existing wear, the move-in walkthrough checklist, or expert evidence (a contractor who can testify about typical degradation patterns). Move-in photos are critical.",
      },
      {
        quote: "We tried to fix it.",
        pill: "Procedural",
        rebuttal:
          "<strong>Rebuttal:</strong> a single botched repair is not adequate remediation. The standard is a working fix, not effort. Bring a contractor's estimate showing what the proper repair would have cost.",
      },
    ],
  },

  outcomes: {
    h2: { pre: "How much do tenants ", em: "actually win", post: "?" },
    lede:
      "Outcomes depend on injury severity and exposure length. Cases with hospital visits and property damage pay the most.",
    bands: [
      {
        label: "Low",
        range: "$500 to $1,500",
        body:
          "<strong>Brief unsafe condition, no injury.</strong> Rent abatement for one or two months. No medical evidence.",
        tier: "low",
      },
      {
        label: "Mid",
        range: "$3,000 to $8,000",
        body:
          "<strong>Multi-month exposure with injury or damage.</strong> Hospital visit, replaced property, several months rent abatement.",
        tier: "mid",
      },
      {
        label: "High",
        range: "$10,000+",
        body:
          "<strong>Severe injury or major property loss.</strong> Hospitalization, ongoing medical treatment, total relocation. Often moves to civil court.",
        tier: "high",
      },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to suing?" },
    lede:
      "Three other paths. Code enforcement is fastest for fixes. Small claims is best for money damages.",
    cards: [
      {
        title: "Code enforcement",
        pillLabel: "Free, fast",
        pillTier: "good",
        whenItFits:
          "you are still in the unit and want the condition fixed immediately. Inspectors can order repairs and fine landlords for habitability breaches.",
        tradeoff:
          "no money damages. The inspector's report is evidence in your lawsuit later.",
      },
      {
        title: "Small claims (recommended)",
        pillLabel: "Best for damages",
        pillTier: "primary",
        whenItFits:
          "you have documented damages and the landlord ignored your written reports. Recover medical bills, property losses, and rent abatement.",
        tradeoff:
          "30 to 90 day timeline. Filing fee around $50.",
      },
      {
        title: "Personal injury attorney",
        pillLabel: "Major injury",
        pillTier: "warn",
        whenItFits:
          "you were injured and have ongoing medical care, or the landlord owns multiple buildings with the same hazards.",
        tradeoff:
          "longer timeline. Many tenant-injury attorneys work on contingency for serious cases.",
      },
    ],
  },

  cta: {
    h2: { pre: "Recover from ", em: "an unsafe home", post: "." },
    body:
      "Most habitability cases settle once the math is documented: medical bills, replaced property, and rent abatement. Generate your demand letter in under two minutes.",
    receipt: {
      label: "example · multi-month exposure",
      items: [
        { label: "Medical + property loss", amount: "$3,500" },
        { label: "Rent abatement (3 months)", amount: "+ $2,400" },
        { label: "Filing fee + interest", amount: "+ $400" },
      ],
      total: "$6,300",
      totalLabel: "Total claim",
      note: "Illustrative. Varies by severity, exposure length, and state.",
    },
  },

  faqs: [
    {
      q: "How do you sue a landlord for unsafe living conditions?",
      a: "First report the condition in writing. Wait a reasonable time (24 to 72 hours for emergencies, up to 30 days for non-emergency repairs). If the landlord does not fix it, file a small-claims complaint citing the implied warranty of habitability, your state's specific habitability statute, and your dollar damages.",
    },
    {
      q: "What counts as an unsafe condition?",
      a: "Structural failures (collapsed ceiling, broken stairs), electrical hazards (sparking outlets, exposed wiring), gas leaks, lead paint or mold exposure, missing or broken smoke or CO detectors, no heat in winter, no hot water, sewage backups, and contaminated water. Habitability is a state-by-state definition but the core is consistent.",
    },
    {
      q: "How much can I sue my landlord for unsafe conditions?",
      a: "Typical recoveries are $1,000 to $8,000 in small claims, depending on injury and exposure length. Cases with hospitalization or major property loss can exceed $10,000 and move to civil court.",
    },
    {
      q: "Can I withhold rent for unsafe conditions?",
      a: "Some states allow rent withholding (Massachusetts, Iowa, several others) when the landlord refuses to repair. Others allow repair-and-deduct (you fix it, deduct the cost from rent) up to a cap. Consult your state guide before withholding because the wrong approach can lead to eviction.",
    },
    {
      q: "Can I break my lease for unsafe conditions?",
      a: "Yes, in most states, after written notice and a reasonable repair window. Constructive eviction lets you treat the lease as terminated when the unit is uninhabitable. Document everything because the landlord may sue for unpaid rent.",
    },
    {
      q: "Should I call code enforcement before suing?",
      a: "Strongly recommended. The inspector's report is independent evidence the judge will trust. Code enforcement is also free and can force the landlord to fix the issue immediately. The report becomes a key exhibit at your hearing.",
    },
    {
      q: "Can I sue for a fall on broken stairs?",
      a: "Yes. Negligent maintenance leading to injury is a personal-injury claim plus a habitability claim. Smaller cases stay in small claims. Larger cases (significant medical bills, lost work) move to civil court where attorneys take cases on contingency.",
    },
  ],

  relatedSlugs: [
    "mold",
    "pest-infestation",
    "break-lease",
    "harassment",
    "wrongful-eviction",
    "security-deposit",
  ],
};

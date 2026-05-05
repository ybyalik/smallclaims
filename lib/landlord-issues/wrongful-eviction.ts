import type { LandlordIssue } from "./types";

export const wrongfulEviction: LandlordIssue = {
  slug: "wrongful-eviction",
  ready: true,
  short: "Wrongful eviction",
  breadcrumbLabel: "Wrongful eviction",

  meta: {
    title: "Can You Sue Your Landlord for Wrongful Eviction?",
    description:
      "Yes. Recover moving costs, hotel stays, lost wages, and statutory damages (often 2x or 3x rent in tenant-friendly states). How much you can sue for, what evidence you need, and how to file.",
  },

  hero: {
    eyebrowSuffix: "Wrongful eviction",
    h1: { pre: "Can I sue my landlord for ", em: "wrongful eviction", post: "?" },
    leadStrong: "Yes, you can sue your landlord for wrongful eviction",
    leadBody:
      " when they removed you without going through the court process, evicted in retaliation for a complaint, or violated your protected status. Damages include moving costs, hotel stays, lost wages, the difference in your new rent, and statutory damages of 2x or 3x rent in many states.",
  },

  counter: {
    amount: 9600,
    meta: "Self-help eviction · CA Civ. Code § 789.3",
    rows: [
      { label: "Moving + hotel + lost wages", value: "$2,800" },
      { label: "Statutory damages (2x rent)", value: "+ $6,400", emphasis: "accent" },
      { label: "Filing fee", value: "+ $400" },
    ],
    footer: "No court order · self-help eviction · CA penalty $100/day",
  },

  whatCounts: {
    h2: { pre: "What counts as ", em: "wrongful eviction", post: "?" },
    lede:
      "Four common patterns. Each is a separate cause of action under most state landlord-tenant codes.",
    cards: [
      {
        num: "01",
        title: "Self-help eviction",
        body:
          "The landlord changed the locks, shut off utilities, or removed your belongings without a court order. This is illegal in nearly every state and triggers statutory penalties on top of actual damages.",
      },
      {
        num: "02",
        title: "Retaliatory eviction",
        body:
          "Eviction within 6 months of you reporting habitability issues, contacting code enforcement, or joining a tenant union. Most states presume retaliation and shift the burden of proof to the landlord.",
      },
      {
        num: "03",
        title: "Discriminatory eviction",
        body:
          "Eviction based on race, religion, family status, disability, source of income (in some states), or sexual orientation (in some states). These claims also have federal HUD remedies.",
      },
      {
        num: "04",
        title: "No-notice or improper-notice eviction",
        body:
          "Eviction without the legally required notice period, or with notice that did not meet state requirements (form, service, content). Even otherwise valid evictions become wrongful when the notice fails.",
      },
    ],
    note: {
      strongIntro: "Self-help is the highest-value claim.",
      rest:
        " California adds $100 per day of unlawful exclusion plus actual damages. Texas adds one month's rent or $500, whichever is greater, plus attorney fees. Florida adds 3x rent. The penalty is what makes these cases settle fast.",
    },
  },

  claim: {
    h2: { pre: "How much can you sue a landlord for ", em: "wrongful eviction", post: "?" },
    lede:
      "Three types of damages stack: out-of-pocket costs, the difference in housing, and statutory damages. State law decides which one is biggest.",
    layers: [
      {
        tag: "Layer 1",
        title: "Direct out-of-pocket costs",
        body:
          "Moving expenses, hotel nights, replacement of damaged or seized belongings, lost wages from missed work, and storage fees if your stuff was put on the curb.",
        amount: "$2,800",
      },
      {
        tag: "Layer 2",
        title: "Statutory damages",
        body:
          "California: $100 per day plus damages. Texas: one month's rent or $500 plus fees. Florida: 3x rent. New York: 3x rent in NYC. Many states authorize punitive damages for self-help evictions.",
        amount: "+ $6,400",
        accent: true,
      },
      {
        tag: "Layer 3",
        title: "Higher rent and other ongoing harm",
        body:
          "Difference between your old rent and the new place's rent, multiplied by the months remaining on your old lease. Some courts also award emotional distress for forced displacement.",
        amount: "+ $400",
      },
    ],
    total: {
      label: "Sample lockout case in California",
      body:
        "$3,200/month rent unit, 7-day lockout, $2,800 in moving and hotel costs, plus 2x statutory penalty.",
      amount: "$9,600",
      sublabel: "illustrative · varies by state and length of exclusion",
    },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " before filing." },
    lede:
      "Wrongful-eviction cases settle quickly once the landlord sees the math. The statutory penalty plus fee-shifting makes these cases expensive to fight, even when the landlord thinks they were right.",
    checklist: [
      "Date and method of the eviction (lockout, notice, etc.)",
      "Itemized list of moving, hotel, and replacement costs",
      "The statutory section you are relying on",
      "A 14-day deadline before filing",
      "Sent certified mail with return receipt",
    ],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3563",
      date: "April 21, 2026",
      recipientName: "Sunrise Property Management LLC",
      recipientAddress: "2820 Bryant Street, Palo Alto, CA 94306",
      reLine: "Demand for damages, unlawful eviction at 1842 Mariposa Ave Apt 4",
      bodyParagraphs: [
        "On April 7, 2026, you locked me out of the above unit without a court order, in violation of <strong>Cal. Civ. Code § 789.3</strong>. I was excluded for seven (7) days before regaining access through the sheriff's office.",
        "I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Statutory damages of $100/day for seven days ($700);",
        "Actual damages of $2,800 (hotel, moving, lost wages);",
        "Two months rent abatement at $3,200/month ($6,400);",
        "Reasonable attorney's fees per § 789.3(d).",
      ],
      closingLine: "Total demand: <strong>$9,900.00</strong>. If unresolved, I will file in Small Claims Court.",
      signatory: "Riley J. Tenant",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " a wrongful-eviction case." },
    lede: "Four steps. The lockout statute is what makes most landlords settle.",
    steps: [
      {
        title: "Document the timeline",
        body:
          "Date the lockout or notice. Save photos of any changed locks, utilities shut off, or belongings removed. Get a police report if the landlord physically removed you.",
      },
      {
        title: "File",
        body:
          "Small claims if total damages fit your state cap. File in the county where the rental was located. Filing fees usually run $30 to $80.",
      },
      {
        title: "Serve",
        body:
          "Sheriff or process server is recommended for wrongful-eviction cases. Some landlords avoid certified mail. File proof of service before the hearing.",
      },
      {
        title: "Hearing",
        body:
          "Open with the date of exclusion and the statutory section. Walk through the days locked out and the per-day penalty math. Bring receipts for everything.",
      },
    ],
    aftermath: {
      tag: "After you win",
      title: "Collecting and what comes next.",
      bodyHtml:
        "30 days for voluntary payment, then judgment lien, garnishment, or bank levy. If the landlord owns multiple units, the judgment can support a class action by other tenants who were similarly evicted. Save the docket.",
    },
  },

  evidence: {
    h2: { pre: "What evidence do you need to ", em: "win", post: " a wrongful-eviction case?" },
    lede:
      "Wrongful-eviction cases turn on the timeline. Every receipt and every text matters.",
    photos: [
      { id: "1554995207-c18c203602cb", cap: "Changed locks" },
      { id: "1591486569404-c0a98c61f6ff", cap: "Hotel receipt" },
      { id: "1556909114-f6e7ad7d3136", cap: "Moving day" },
      { id: "1554224155-1696413565d3", cap: "Lease document" },
    ],
    texts: [
      { dir: "out", text: "I changed the locks. You're out." },
      { dir: "in", text: "That's illegal without a court order." },
      { dir: "out", text: "Don't care. Get out." },
    ],
    receipt: {
      vendor: "STARLIGHT INN",
      vendorAddr: "Embarcadero · SF, CA",
      receiptNum: "Folio #82741",
      date: "04/07-04/14/2026",
      lineItems: [
        { label: "7 nights @ $189", amount: "$1,323.00" },
        { label: "Taxes & fees", amount: "$211.00" },
        { label: "Parking", amount: "$140.00" },
      ],
      subtotal: "$1,674.00",
      total: "$1,674.00",
      footer: "Receipt for tenant claim · thank you",
    },
  },

  defenses: {
    h2: { pre: "Common landlord ", em: "defenses", post: "." },
    lede:
      "Three common defenses come up in wrongful-eviction cases. Two of them rarely work.",
    items: [
      {
        quote: "The tenant abandoned the unit.",
        pill: "Most common",
        rebuttal:
          "<strong>Rebuttal:</strong> proof you paid rent, kept utilities active, or were sleeping there as recently as the lockout date. Bank records and utility bills usually settle this.",
      },
      {
        quote: "We had a court order.",
        pill: "Procedural",
        rebuttal:
          "<strong>Rebuttal:</strong> ask for the writ of possession with the case number. If they cannot produce it, no court order existed. Self-help eviction without a writ is illegal in every state.",
      },
      {
        quote: "The eviction was for a legitimate reason.",
        pill: "Cause",
        rebuttal:
          "<strong>Rebuttal:</strong> even legitimate causes (nonpayment, lease breach) require court process. The reason might reduce damages but does not erase the unlawful-exclusion claim.",
      },
    ],
  },

  outcomes: {
    h2: { pre: "How much do tenants ", em: "actually win", post: " in wrongful-eviction cases?" },
    lede:
      "Outcomes depend on whether the eviction was procedural (improper notice) or self-help (lockout). Self-help cases pay the most.",
    bands: [
      {
        label: "Low",
        range: "$500 to $2,500",
        body:
          "<strong>Procedural eviction.</strong> Improper notice but no lockout, no actual displacement. Damages are limited to filing fees and minor costs.",
        tier: "low",
      },
      {
        label: "Mid",
        range: "$3,000 to $8,000",
        body:
          "<strong>Self-help with brief lockout.</strong> A few days excluded, hotel nights, moving costs, plus statutory penalty.",
        tier: "mid",
      },
      {
        label: "High",
        range: "$8,000 to $15,000+",
        body:
          "<strong>Long lockout or seized belongings.</strong> Multi-day exclusion, ruined property, lost wages, plus the maximum statutory multiplier under state law.",
        tier: "high",
      },
    ],
  },

  stateSection: {
    kind: "rows",
    h2: { pre: "Wrongful-eviction penalties, by ", em: "state", post: "." },
    lede:
      "Self-help eviction penalties vary widely. The strongest tenant-protection states authorize per-day penalties or 2x to 3x rent.",
    col2Header: "Self-help penalty",
    col3Header: "Statute",
    rows: [
      { state: "California", slug: "california", col2: "$100/day + actual damages + fees", col3: "Civ. Code § 789.3" },
      { state: "Texas", slug: "texas", col2: "1 month rent or $500 + actual + fees", col3: "Prop. Code § 92.0081" },
      { state: "Florida", slug: "florida", col2: "3x rent + actual damages", col3: "Fla. Stat. § 83.67" },
      { state: "New York", slug: "new-york", col2: "3x rent (NYC) + injunction + fees", col3: "RPL § 235-a" },
      { state: "Illinois", slug: "illinois", col2: "2x actual damages + fees", col3: "765 ILCS 705" },
      { state: "Washington", slug: "washington", col2: "Up to $100/day + actual + fees", col3: "RCW 59.18.290" },
      { state: "Massachusetts", slug: "massachusetts", col2: "3 months rent or 3x damages + fees", col3: "M.G.L. c. 186 § 14" },
      { state: "Oregon", slug: "oregon", col2: "2 months rent + actual + fees", col3: "ORS 90.375" },
      { state: "Colorado", slug: "colorado", col2: "Actual damages + injunction", col3: "C.R.S. § 38-12-510" },
      { state: "Pennsylvania", slug: "pennsylvania", col2: "Actual damages + fees + injunction", col3: "68 P.S. § 250.501" },
    ],
  },

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to suing for wrongful eviction?" },
    lede:
      "Three other paths fit different situations. Pick based on whether you want to get back into the unit or just recover damages.",
    cards: [
      {
        title: "Emergency court order",
        pillLabel: "Get back in fast",
        pillTier: "warn",
        whenItFits:
          "you were locked out within the last few days and want immediate access. File a temporary restraining order or unlawful-exclusion petition.",
        tradeoff:
          "Goes to housing court, not small claims. Faster but no money damages.",
      },
      {
        title: "Small claims (recommended)",
        pillLabel: "Best for damages",
        pillTier: "primary",
        whenItFits:
          "the lockout already happened and you have moved on. Recover hotel, moving, lost wages, and statutory damages.",
        tradeoff:
          "30 to 90 day timeline. Filing fee around $50. State statutory penalties add up fast.",
      },
      {
        title: "Tenant-rights attorney",
        pillLabel: "Major exclusion",
        pillTier: "warn",
        whenItFits:
          "long lockout, seized belongings, multi-tenant pattern, or damages exceed the small-claims cap.",
        tradeoff:
          "Many tenant attorneys take wrongful-eviction cases on contingency due to fee-shifting statutes.",
      },
    ],
  },

  cta: {
    h2: { pre: "Recover ", em: "what you lost", post: "." },
    body:
      "Wrongful-eviction cases settle fastest because the statutory penalty makes them expensive for the landlord to fight. The generator builds your demand letter in under two minutes.",
    receipt: {
      label: "example · 7-day lockout in California",
      items: [
        { label: "Hotel + moving + lost wages", amount: "$2,800" },
        { label: "Rent abatement (2 months)", amount: "+ $6,400" },
        { label: "Filing fee + interest", amount: "+ $400" },
      ],
      total: "$9,600",
      totalLabel: "Total claim",
      note: "Illustrative. Varies by state, length of exclusion, and statutory penalty.",
    },
  },

  faqs: [
    {
      q: "How much can I sue a landlord for wrongful eviction?",
      a: "Most cases recover $2,000 to $10,000 in small claims. Damages include moving costs, hotel nights, lost wages, and statutory damages (often 2x or 3x rent in tenant-friendly states). Cases over the small-claims cap go to civil court for $10,000+.",
    },
    {
      q: "Is it illegal for a landlord to lock you out without a court order?",
      a: "Yes, in every state. Self-help eviction (changing locks, removing belongings, shutting off utilities) requires a court order in all 50 states. Penalties range from $100/day in California to 3x rent in Florida and NYC. The landlord cannot bypass the eviction process even if the tenant is behind on rent.",
    },
    {
      q: "What if my landlord evicted me in retaliation for complaining?",
      a: "Most states presume retaliation if the eviction happened within 6 months of you reporting a habitability issue, contacting code enforcement, or organizing with other tenants. The burden shifts to the landlord to prove a legitimate reason. Bring the timeline and the original complaint.",
    },
    {
      q: "Do you have to be locked out to sue for wrongful eviction?",
      a: "No. You can sue for an improper-notice eviction, a retaliatory eviction, a discriminatory eviction, or any other unlawful exclusion even if you left voluntarily. The damages are usually smaller than a self-help case but the claim is still valid.",
    },
    {
      q: "What evidence do I need for a wrongful-eviction case?",
      a: "Photos of changed locks or utility shut-offs, dated texts or emails between you and the landlord, hotel and moving receipts, the original lease, and any police reports. The timeline matters most: when were you excluded, for how long, and what did you spend?",
    },
    {
      q: "Can you sue for emotional distress from wrongful eviction?",
      a: "Sometimes. A few jurisdictions add emotional-distress damages for self-help evictions, especially when belongings were seized or the tenant has dependents. Most successful claims lead with concrete damages first.",
    },
    {
      q: "How long do you have to sue for wrongful eviction?",
      a: "Usually 1 to 4 years depending on state and theory. California: 1 year for the statutory § 789.3 claim, 2 to 4 years for related contract or tort claims. File quickly. Witnesses and digital records degrade fast.",
    },
  ],

  relatedSlugs: [
    "illegal-lockout",
    "harassment",
    "after-moving-out",
    "break-lease",
    "security-deposit",
    "unsafe-conditions",
  ],
};

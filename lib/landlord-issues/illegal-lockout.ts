import type { LandlordIssue } from "./types";

export const illegalLockout: LandlordIssue = {
  slug: "illegal-lockout",
  ready: true,
  short: "Illegal lockout",
  breadcrumbLabel: "Illegal lockout",

  meta: {
    title: "What to Do If Your Landlord Changes the Locks on You",
    description:
      "Illegal lockouts trigger statutory penalties in every state. Step by step guide: what to do in the first 24 hours, how much you can sue for, and how to get back into the unit.",
  },

  hero: {
    eyebrowSuffix: "Illegal lockout",
    h1: { pre: "What to do if your landlord ", em: "changes the locks", post: " on you." },
    leadStrong: "Self-help eviction is illegal in every state",
    leadBody:
      ". If your landlord changed the locks, removed your belongings, or shut off utilities to force you out, you can recover hotel costs, moving expenses, lost wages, and statutory damages of $100 per day, 2x rent, or 3x rent depending on the state. You can also get a court order to let you back in.",
  },

  counter: {
    amount: 6800,
    meta: "Self-help eviction · CA Civ. Code § 789.3",
    rows: [
      { label: "Hotel + meals + lost wages", value: "$2,200" },
      { label: "Statutory penalty ($100 × 30 days)", value: "+ $3,000", emphasis: "accent" },
      { label: "Moving and storage", value: "+ $1,600" },
    ],
    footer: "30-day exclusion · no court order · CA § 789.3",
  },

  whatCounts: {
    h2: { pre: "What counts as an ", em: "illegal lockout", post: "?" },
    lede:
      "Self-help eviction has many forms. Each one is illegal under state law if done without a court order.",
    cards: [
      {
        num: "01",
        title: "Changing the locks",
        body:
          "The most common form. The landlord rekeys, padlocks, or removes the door without a writ of possession. Even one day of exclusion triggers daily penalties in California, Washington, and several other states.",
      },
      {
        num: "02",
        title: "Shutting off utilities",
        body:
          "Cutting power, water, gas, or heat to make the unit uninhabitable. Most states treat this as a constructive lockout. Texas, Florida, and Massachusetts assess separate penalties for each utility.",
      },
      {
        num: "03",
        title: "Removing your belongings",
        body:
          "Putting your stuff on the curb, in storage, or in the dumpster without a court order. Belongings in storage may be considered held against ransom, an additional cause of action.",
      },
      {
        num: "04",
        title: "Threats and intimidation",
        body:
          "Showing up with people to remove you, threatening violence, or repeated unauthorized entry. These add harassment and emotional-distress claims on top of the lockout claim.",
      },
    ],
    note: {
      strongIntro: "Document immediately.",
      rest:
        " Photograph the changed locks, save every text or voicemail, file a police report (the police usually will not arrest the landlord but the report creates a timestamp), and call a tenant hotline. The first 24 hours are when the evidence is freshest.",
    },
  },

  claim: {
    h2: { pre: "How much can you sue for an ", em: "illegal lockout", post: "?" },
    lede:
      "Three categories stack: out-of-pocket costs, statutory daily penalties, and (in serious cases) emotional distress.",
    layers: [
      {
        tag: "Layer 1",
        title: "Out-of-pocket costs",
        body:
          "Hotel nights, restaurant meals (no kitchen), Uber to and from work, lost wages from missed days, replacement of belongings the landlord seized or threw away.",
        amount: "$2,200",
      },
      {
        tag: "Layer 2",
        title: "Statutory daily penalty",
        body:
          "California: $100/day. Washington: up to $100/day. Massachusetts: 3 months rent. Texas: 1 month rent or $500. The longer the exclusion, the bigger the penalty.",
        amount: "+ $3,000",
        accent: true,
      },
      {
        tag: "Layer 3",
        title: "Moving costs and storage",
        body:
          "If the landlord put your stuff in storage, the recovery cost. If you had to move out permanently, moving truck and security deposit on the new unit.",
        amount: "+ $1,600",
      },
    ],
    total: {
      label: "Sample 30-day lockout in California",
      body:
        "Single tenant locked out 30 days. Hotel and meals while finding a new place, statutory $3,000 penalty, plus moving costs and storage retrieval.",
      amount: "$6,800",
      sublabel: "illustrative · varies by state and length",
    },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " or file immediately." },
    lede:
      "If you are still locked out, file an emergency court order to get back in. If you are already on the other side, send a demand letter. Self-help cases settle fast because the per-day penalty grows daily.",
    checklist: [
      "Date and time of the lockout",
      "What method (locks, utilities, removed belongings)",
      "Itemized hotel, food, transportation costs",
      "The statutory section and per-day penalty",
      "A 14-day deadline before filing",
    ],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3564",
      date: "April 21, 2026",
      recipientName: "Marina Heights Apartments",
      recipientAddress: "3300 Webster Street, Oakland, CA 94609",
      reLine: "Demand for damages, illegal lockout at Apt 12C",
      bodyParagraphs: [
        "On <strong>March 22, 2026</strong>, you changed the locks at the above unit without a court order. I was excluded for thirty (30) days before regaining access. Pursuant to <strong>Cal. Civ. Code § 789.3</strong>, you are liable for actual damages and a daily penalty of $100.",
        "I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Statutory penalty of $100 per day for 30 days ($3,000);",
        "Hotel and food costs of $2,200 (receipts attached);",
        "Moving and storage retrieval costs of $1,600;",
        "Reasonable attorney's fees per § 789.3(d).",
      ],
      closingLine: "Total demand: <strong>$6,800.00</strong>. If unresolved, I will file in Small Claims Court.",
      signatory: "Morgan T. Renter",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " an illegal lockout case." },
    lede: "Four steps. Many states have expedited lockout procedures.",
    steps: [
      {
        title: "Document fast",
        body:
          "Photo the changed locks. Get the police report. Save texts, emails, and voicemails. Keep every receipt for hotel, meals, transportation, and lost work.",
      },
      {
        title: "File",
        body:
          "If still excluded, file an emergency unlawful-exclusion petition in housing court. If already past, file in small claims for damages. Many states have lockout-specific forms.",
      },
      {
        title: "Serve",
        body:
          "Sheriff is recommended. Self-help landlords often try to dodge service. File proof of service before the hearing.",
      },
      {
        title: "Hearing",
        body:
          "Lead with the date of exclusion and the daily penalty math. Show photos of the locks, the police report, and your receipts. Hearings usually run 15 to 20 minutes.",
      },
    ],
    aftermath: {
      tag: "After you win",
      title: "Collecting on the judgment.",
      bodyHtml:
        "30-day voluntary payment window, then enforcement. Wrongful-eviction judgments are powerful in collection because they can support an injunction against future self-help. If your landlord operates other units, the judgment may be admissible in those tenants' cases too.",
    },
  },

  evidence: {
    h2: { pre: "What evidence do you need to ", em: "win a lockout case", post: "?" },
    lede:
      "Lockout cases are timeline cases. Date stamps and receipts are decisive.",
    photos: [
      { id: "1554995207-c18c203602cb", cap: "Changed locks" },
      { id: "1591486569404-c0a98c61f6ff", cap: "Hotel receipt" },
      { id: "1591019479261-c10b4716a0ea", cap: "Belongings on curb" },
      { id: "1554224155-1696413565d3", cap: "Lease document" },
    ],
    texts: [
      { dir: "out", text: "I rekeyed the place. You're done." },
      { dir: "in", text: "You can't do that. I'll call the police." },
      { dir: "out", text: "Go ahead, they can't help you." },
    ],
    receipt: {
      vendor: "STARLIGHT INN OAKLAND",
      vendorAddr: "Webster St · Oakland, CA",
      receiptNum: "Folio #92841",
      date: "03/22-04/21/2026",
      lineItems: [
        { label: "30 nights @ $145", amount: "$4,350.00" },
        { label: "Taxes & fees", amount: "$498.00" },
        { label: "Pet fee", amount: "$210.00" },
      ],
      subtotal: "$5,058.00",
      total: "$5,058.00",
      footer: "Receipt for tenant claim · thank you",
    },
  },

  defenses: {
    h2: { pre: "Common landlord ", em: "defenses", post: "." },
    lede:
      "Two of these defenses are nonstarters. The third can reduce damages but not erase the claim.",
    items: [
      {
        quote: "The tenant abandoned the unit.",
        pill: "Most common",
        rebuttal:
          "<strong>Rebuttal:</strong> bank records showing rent paid, utility bills with your name, mail addressed to you at the unit. Most states define abandonment narrowly: rent unpaid for 14+ days plus other indicators. Brief absences do not count.",
      },
      {
        quote: "We had a court order.",
        pill: "Procedural",
        rebuttal:
          "<strong>Rebuttal:</strong> ask for the writ of possession with the case number. If they cannot produce it, no court order existed. Eviction notices and court orders are different documents.",
      },
      {
        quote: "The tenant was behind on rent.",
        pill: "Cause",
        rebuttal:
          "<strong>Rebuttal:</strong> rent arrears do not authorize self-help. The landlord still has to file an unlawful-detainer action. Arrears may offset some damages but the lockout claim stands.",
      },
    ],
  },

  outcomes: {
    h2: { pre: "How much do tenants ", em: "actually win", post: " in lockout cases?" },
    lede:
      "Lockout cases are among the highest-value tenant claims because of the per-day statutory penalty.",
    bands: [
      {
        label: "Low",
        range: "$1,000 to $3,000",
        body:
          "<strong>Brief lockout, quick resolution.</strong> 1 to 3 days excluded, no major property loss, weak documentation. Statutory penalty plus modest hotel costs.",
        tier: "low",
      },
      {
        label: "Mid",
        range: "$4,000 to $10,000",
        body:
          "<strong>Multi-week exclusion with moving.</strong> Tenant relocated, hotel costs, lost wages, and statutory penalty for the full exclusion period.",
        tier: "mid",
      },
      {
        label: "High",
        range: "$10,000+",
        body:
          "<strong>Long exclusion or seized belongings.</strong> Multi-month displacement, lost or destroyed property, lost work, family disruption. Often exceeds the small-claims cap.",
        tier: "high",
      },
    ],
  },

  stateSection: {
    kind: "rows",
    h2: { pre: "Lockout penalties, by ", em: "state", post: "." },
    lede:
      "Statutory penalties for self-help eviction. The per-day or per-month structure adds up fast.",
    col2Header: "Penalty",
    col3Header: "Statute",
    rows: [
      { state: "California", slug: "california", col2: "$100/day + actual damages + fees", col3: "Civ. Code § 789.3" },
      { state: "Texas", slug: "texas", col2: "1 month rent or $500 + actual + fees", col3: "Prop. Code § 92.0081" },
      { state: "Florida", slug: "florida", col2: "3x rent + actual damages", col3: "Fla. Stat. § 83.67" },
      { state: "New York", slug: "new-york", col2: "3x rent (NYC) + injunction + fees", col3: "RPL § 235-a" },
      { state: "Massachusetts", slug: "massachusetts", col2: "3 months rent + 3x damages + fees", col3: "M.G.L. c. 186 § 14" },
      { state: "Washington", slug: "washington", col2: "Up to $100/day + actual + fees", col3: "RCW 59.18.290" },
      { state: "Oregon", slug: "oregon", col2: "2 months rent + actual + fees", col3: "ORS 90.375" },
      { state: "Illinois", slug: "illinois", col2: "2x actual damages + fees", col3: "765 ILCS 705" },
      { state: "Colorado", slug: "colorado", col2: "Actual damages + injunction", col3: "C.R.S. § 38-12-510" },
      { state: "New Jersey", slug: "new-jersey", col2: "Actual damages + criminal penalty", col3: "N.J.S.A. § 2C:33-11.1" },
    ],
  },

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to suing?" },
    lede:
      "Three other paths. The right one depends on whether you want to get back in, or just recover damages.",
    cards: [
      {
        title: "Emergency court order",
        pillLabel: "Get back in",
        pillTier: "primary",
        whenItFits:
          "you were locked out today or yesterday and want immediate access. Most states have expedited lockout petitions that can be heard within days.",
        tradeoff:
          "Goes to housing court, not small claims. Faster injunction but no money damages.",
      },
      {
        title: "Small claims (recommended)",
        pillLabel: "Best for damages",
        pillTier: "primary",
        whenItFits:
          "the lockout already happened or you have moved on. Recover hotel, food, lost wages, moving, plus the statutory daily penalty.",
        tradeoff:
          "30 to 90 day timeline. Filing fee around $50.",
      },
      {
        title: "Tenant-rights attorney",
        pillLabel: "Long lockout",
        pillTier: "warn",
        whenItFits:
          "you were excluded for weeks, your belongings were destroyed, or damages exceed the small-claims cap.",
        tradeoff:
          "Many tenant-rights attorneys take lockout cases on contingency due to fee-shifting statutes.",
      },
    ],
  },

  cta: {
    h2: { pre: "Recover ", em: "what they cost you", post: "." },
    body:
      "Lockout cases settle quickly because the per-day statutory penalty grows every day. Most landlords pay within the 14-day demand period rather than fight in court.",
    receipt: {
      label: "example · 30-day exclusion in California",
      items: [
        { label: "Hotel + meals + transport", amount: "$2,200" },
        { label: "$100/day statutory penalty", amount: "+ $3,000" },
        { label: "Moving + storage", amount: "+ $1,600" },
      ],
      total: "$6,800",
      totalLabel: "Total claim",
      note: "Illustrative. State penalties vary widely. CA assesses per-day; FL, NY assess multiples of rent.",
    },
  },

  faqs: [
    {
      q: "Is it illegal for a landlord to change the locks?",
      a: "Yes, in every state, when done without a court order. Self-help eviction is illegal under all 50 state landlord-tenant codes. Penalties range from $100/day in California to 3x rent in Florida and NYC.",
    },
    {
      q: "How much can I sue my landlord for locking me out?",
      a: "Typical recoveries are $2,000 to $10,000 in small claims, depending on length of exclusion and state penalty. Long lockouts or destroyed belongings can exceed the cap and move to civil court.",
    },
    {
      q: "What do I do if my landlord locked me out?",
      a: "Photo the changed locks, get a police report (creates a timestamp), save every text and email, find a place to stay (hotel, friend, family), keep every receipt, and either file an emergency court order to get back in or send a demand letter for damages.",
    },
    {
      q: "Can I call the police about a lockout?",
      a: "Yes. The police usually will not arrest the landlord (it is treated as a civil matter in most jurisdictions) but they create the timestamp and report you need for the lawsuit. Always file a police report.",
    },
    {
      q: "Can I break the lock to get back in?",
      a: "In most states, no. It can expose you to criminal trespass even though you have the right to be there. Use a court order or a peaceful entry through an unlocked window. If you must enter, document everything.",
    },
    {
      q: "What if my landlord shut off the utilities?",
      a: "That is constructive lockout in most states. Same penalties apply. California assesses $100/day for utility shutoffs under § 789.3. Document the shutoff date and contact the utility company directly to confirm what happened.",
    },
    {
      q: "What happens to my belongings during a lockout?",
      a: "If the landlord put your stuff in storage, you can recover the storage fees plus any damaged or destroyed items. If they put it on the curb or in the dumpster, document immediately. Several states have specific tenant-property statutes adding penalties for that.",
    },
  ],

  relatedSlugs: [
    "wrongful-eviction",
    "harassment",
    "after-moving-out",
    "security-deposit",
    "break-lease",
    "unsafe-conditions",
  ],
};

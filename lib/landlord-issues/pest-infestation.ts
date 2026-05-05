import type { LandlordIssue } from "./types";

export const pestInfestation: LandlordIssue = {
  slug: "pest-infestation",
  ready: true,
  short: "Pest infestation",
  breadcrumbLabel: "Pest Infestation",

  meta: {
    title: "Can I Sue My Landlord for a Pest Infestation?",
    description:
      "Yes. Roaches, bed bugs, mice, and rats are habitability violations in every state. Recover treatment costs, replaced belongings, rent abatement, and (in some states) statutory damages. How much you can sue for and how to file.",
  },

  hero: {
    eyebrowSuffix: "Pest infestation",
    h1: { pre: "Can I sue my landlord for a ", em: "pest infestation", post: "?" },
    leadStrong: "Yes, you can sue your landlord for a pest infestation",
    leadBody:
      " when they failed to remediate after written notice. Roaches, bed bugs, mice, and rats are habitability violations in every state. Recover extermination costs, replaced furniture and clothing, rent abatement, and medical bills if you got bitten.",
  },

  counter: {
    amount: 5400,
    meta: "Habitability breach · multi-month exposure",
    rows: [
      { label: "Replaced furniture + clothes", value: "$2,800" },
      { label: "Rent abatement (2 months)", value: "+ $2,400", emphasis: "accent" },
      { label: "Extermination + filing fee", value: "+ $200" },
    ],
    footer: "Bed bug infestation · 60-day exposure",
  },

  whatCounts: {
    h2: { pre: "When does a ", em: "pest infestation", post: " give you a lawsuit?" },
    lede:
      "Three facts have to line up. Once they do, you have a habitability claim under your state's implied warranty.",
    cards: [
      {
        num: "01",
        title: "You gave written notice",
        body:
          "Email or text counts. The landlord has to know about the pests to be liable for failing to fix the problem. Save every report you sent.",
      },
      {
        num: "02",
        title: "A reasonable time passed",
        body:
          "Most states require pest remediation in 7 to 30 days, faster for bed bugs and rodents. After that window, the landlord is in breach of the implied warranty of habitability.",
      },
      {
        num: "03",
        title: "You have damages",
        body:
          "Treatment costs, replaced belongings (mattresses, clothes, books for bed bugs), rent abatement for the affected period, and medical bills if you were bitten or developed asthma from cockroach allergens.",
      },
      {
        num: "04",
        title: "The infestation is the landlord's responsibility",
        body:
          "Pre-existing infestation, multi-unit infestation, or rodents from structural gaps. If you brought it in (single-unit bed bugs from travel), the case is harder but still possible if the landlord then refused to remediate.",
      },
    ],
    note: {
      strongIntro: "Bed bugs need fast action.",
      rest:
        " The longer they spread, the more your damages compound. Notify in writing immediately, save evidence (photos, sample), and start documenting bites. Most cases that lose at trial are cases the tenant did not document early.",
    },
  },

  claim: {
    h2: { pre: "How much can you sue for a ", em: "pest infestation", post: "?" },
    lede:
      "Three categories of damages stack. Replaced belongings can become the biggest line item with bed bugs, since infested furniture, mattresses, and clothing usually cannot be saved.",
    layers: [
      {
        tag: "Layer 1",
        title: "Replaced belongings",
        body:
          "Bed bug cases: mattress, box spring, infested clothing, books, soft furniture. Rodent cases: contaminated food, chewed clothing or bedding. Itemize everything.",
        amount: "$2,800",
      },
      {
        tag: "Layer 2",
        title: "Rent abatement",
        body:
          "Rent reduction for the affected period. Courts use a percentage of rent (10 to 50 percent) or full abatement when the unit was uninhabitable.",
        amount: "+ $2,400",
        accent: true,
      },
      {
        tag: "Layer 3",
        title: "Extermination, medical, and fees",
        body:
          "Out-of-pocket extermination, doctor visits for bites or asthma, filing fees, and (in some states) statutory damages for repeat violations.",
        amount: "+ $200",
      },
    ],
    total: {
      label: "Sample bed bug case",
      body:
        "Two-month bed bug infestation, replaced mattress and bedroom furniture, two months rent abatement on a $1,200 unit, plus filing fee.",
      amount: "$5,400",
      sublabel: "illustrative · varies by pest type and severity",
    },
  },

  demand: {
    h2: { pre: "Send a ", em: "habitability demand", post: " first." },
    lede:
      "Most pest cases settle once the landlord sees an itemized list of replaced belongings plus the rent abatement math. Move fast since damages compound the longer the infestation runs.",
    checklist: [
      "Date you first reported the pests",
      "Photos and (if possible) a captured sample",
      "Itemized replaced belongings with receipts",
      "A 14-day deadline to remediate or pay",
      "Sent certified mail with photos attached",
    ],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3565",
      date: "April 21, 2026",
      recipientName: "Parkside Apartments LLC",
      recipientAddress: "1820 Folsom Street, San Francisco, CA 94103",
      reLine: "Demand for damages, bed bug infestation in Apt 5C",
      bodyParagraphs: [
        "I notified you of <strong>bed bugs in the bedroom</strong> on February 18, 2026 (email attached). Despite multiple requests, no professional treatment was scheduled until April 12, 2026, by which time the infestation had spread.",
        "Pursuant to <strong>Cal. Civ. Code § 1941</strong> and the implied warranty of habitability, I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Replacement cost of $2,800 for mattress, box spring, and infested clothing (receipts attached);",
        "Rent abatement of $2,400 for two months of bedroom uninhabitability;",
        "$200 in self-paid extermination costs.",
      ],
      closingLine: "Total demand: <strong>$5,400.00</strong>. If unresolved, I will file in Small Claims Court.",
      signatory: "Avery K. Tenant",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " a pest infestation case." },
    lede: "Four steps. Photos and dated reports do most of the work.",
    steps: [
      {
        title: "Document",
        body:
          "Photos of the pests, photos of the damage they caused, every report you sent the landlord. Capture or bag a sample if possible. See a doctor for bites.",
      },
      {
        title: "File",
        body:
          "File in the county where the rental was located. Filing fees usually run $30 to $80. The complaint should list each pest type, the timeline, and itemized damages.",
      },
      {
        title: "Serve",
        body:
          "Sheriff or process server. File proof of service before the hearing. Most landlords settle once they see the documented timeline.",
      },
      {
        title: "Hearing",
        body:
          "Open with photos and the date you reported. Walk through the timeline of reports and the landlord's response (or lack of one). Itemized receipts close the case.",
      },
    ],
    aftermath: {
      tag: "After you win",
      title: "Collecting and what comes next.",
      bodyHtml:
        "30-day voluntary payment, then liens, garnishment, or levy. Pest cases often expose multi-unit problems. If your neighbors had the same issues, the judgment can support a class action or a code-enforcement complaint that affects the whole building.",
    },
  },

  evidence: {
    h2: { pre: "What evidence do you need to ", em: "win a pest case", post: "?" },
    lede:
      "Pest cases turn on documentation. Photos, dated reports, and (for bed bugs) physical samples are decisive.",
    cells: [
      {
        kind: "photos",
        tag: "Pest photos (dated)",
        photos: [
          { id: "1606987474440-2cdd8d144d8a", cap: "Bed bug bites" },
          { id: "1597764069442-99e4adb2bbab", cap: "Roach in kitchen" },
          { id: "1576570095594-50aaffabb6c7", cap: "Mouse droppings" },
          { id: "1612874742237-6526221588e3", cap: "Damaged mattress" },
        ],
      },
      {
        kind: "texts",
        tag: "Notice to landlord",
        texts: [
          { dir: "in", text: "Bed bugs again. Three weeks now." },
          { dir: "out", text: "We sprayed already. Nothing else we can do." },
          { dir: "in", text: "Bites are getting worse." },
        ],
      },
      {
        kind: "letter",
        tag: "Written notice (certified)",
        letterhead: "Tenant",
        date: "April 1, 2026",
        recipientName: "Landlord",
        reLine: "Bed bug infestation (Cal. Civ. Code § 1941)",
        bodyParagraphs: [
          "Bed bug activity has continued for three weeks despite one spray treatment. Bites are documented (photos attached).",
          "Please retain a licensed exterminator and conduct a full unit treatment within 7 days.",
        ],
        signatory: "Tenant",
      },
      {
        kind: "receipt",
        tag: "Mattress replacement",
        vendor: "MATTRESS WAREHOUSE",
        vendorAddr: "Geneva Ave · SF, CA",
        receiptNum: "Order #82741",
        date: "04/15/2026",
        lineItems: [
          { label: "Queen mattress", amount: "$899.00" },
          { label: "Box spring", amount: "$249.00" },
          { label: "Encasement set", amount: "$120.00" },
        ],
        subtotal: "$1,268.00",
        total: "$1,268.00",
        footer: "Receipt for tenant claim · thank you",
      },
    ],
  },

  defenses: {
    h2: { pre: "Common landlord ", em: "defenses", post: "." },
    lede:
      "Three defenses come up in most pest cases. Each has a clean rebuttal if you have the documents.",
    items: [
      {
        quote: "The tenant brought in the bed bugs.",
        pill: "Most common (bed bugs)",
        rebuttal:
          "<strong>Rebuttal:</strong> proof other units had the same issue, the building had prior reports, or the landlord cannot prove your unit was clean at move-in. Even if you brought them in, the landlord still owes a remediation duty once you reported.",
      },
      {
        quote: "We treated the unit.",
        pill: "Procedural",
        rebuttal:
          "<strong>Rebuttal:</strong> dated proof of treatment, the contractor's invoice, the chemical used, and follow-up inspections. One spray that did not work is not adequate remediation. Bed bug cases require multi-treatment protocols.",
      },
      {
        quote: "Tenant lifestyle caused the infestation.",
        pill: "Causation",
        rebuttal:
          "<strong>Rebuttal:</strong> photos showing your unit was clean, neighbor testimony about other affected units, and the building's prior pest history (often available through code enforcement records).",
      },
    ],
  },

  outcomes: {
    h2: { pre: "How much do tenants ", em: "actually win", post: " in pest cases?" },
    lede:
      "Outcomes depend on pest type and exposure length. Bed bugs and rats pay more than ants or fruit flies because the property damage is bigger.",
    bands: [
      {
        label: "Low",
        range: "$300 to $1,500",
        body:
          "<strong>Brief infestation, no replacement.</strong> Cockroaches or ants for a few weeks. Rent abatement only.",
        tier: "low",
      },
      {
        label: "Mid",
        range: "$2,000 to $6,000",
        body:
          "<strong>Multi-month infestation with replaced belongings.</strong> Bed bugs in one room, replaced bedroom furniture, multiple months rent abatement.",
        tier: "mid",
      },
      {
        label: "High",
        range: "$6,000 to $15,000+",
        body:
          "<strong>Spread to multiple rooms or medical injury.</strong> Whole-apartment bed bug spread, ruined wardrobe, asthma triggered by cockroach allergens, hospital visit.",
        tier: "high",
      },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to suing?" },
    lede:
      "Three other paths fit before, or instead of, small claims. Pick based on whether you are still in the unit and how serious the infestation is.",
    cards: [
      {
        title: "Code enforcement",
        pillLabel: "Free",
        pillTier: "good",
        whenItFits:
          "you are still in the unit and want immediate remediation. Local housing inspectors order treatment and fine landlords for habitability breaches.",
        tradeoff: "no money damages. Useful for forcing the fix or for evidence in your lawsuit.",
      },
      {
        title: "Small claims (recommended)",
        pillLabel: "Best for damages",
        pillTier: "primary",
        whenItFits:
          "you have documented damages and the landlord ignored your written reports. Recover replaced belongings, rent abatement, and self-paid extermination.",
        tradeoff:
          "30 to 90 day timeline. Filing fee around $50. Statutory damages available in some states.",
      },
      {
        title: "Tenant-rights attorney",
        pillLabel: "Building-wide problem",
        pillTier: "warn",
        whenItFits:
          "the infestation is building-wide, you have ongoing medical issues, or the landlord owns multiple buildings with similar problems (class-action territory).",
        tradeoff:
          "longer timeline. Many tenant-rights attorneys take pest cases on contingency in major-injury situations.",
      },
    ],
  },

  cta: {
    h2: { pre: "Recover ", em: "what they cost you", post: "." },
    body:
      "Most pest cases settle quickly once the landlord sees the math: replaced belongings plus rent abatement plus extermination. Generate your demand letter in under two minutes.",
    receipt: {
      label: "example · bed bug infestation",
      items: [
        { label: "Replaced belongings", amount: "$2,800" },
        { label: "Rent abatement (2 months)", amount: "+ $2,400" },
        { label: "Extermination + filing fee", amount: "+ $200" },
      ],
      total: "$5,400",
      totalLabel: "Total claim",
      note: "Illustrative. Varies by pest type, exposure length, and state.",
    },
  },

  faqs: [
    {
      q: "Can I sue my landlord for bed bugs?",
      a: "Yes. Bed bugs are a habitability violation in every state. You can recover the replacement cost of mattresses and infested furniture, the cost of treatment, and rent abatement for the affected period. Bed bug cases pay more than other pest cases because of the property damage.",
    },
    {
      q: "How much can I sue my landlord for cockroaches?",
      a: "Most cockroach cases recover $500 to $3,000 in small claims, depending on how long the infestation lasted and what it ruined. Severe cases involving asthma diagnoses or contaminated food can be higher.",
    },
    {
      q: "Is a pest infestation a habitability violation?",
      a: "Yes. Every state's implied warranty of habitability requires the landlord to keep rentals free from pest infestations. Some states (California, New York City) have specific anti-pest statutes adding statutory damages on top of actual damages.",
    },
    {
      q: "Can I break my lease for a pest infestation?",
      a: "Yes, in most states, after written notice and a reasonable time for remediation. Constructive eviction lets you treat the lease as terminated when the unit is uninhabitable. Document the timeline because the landlord may sue for rent.",
    },
    {
      q: "What if my landlord blames me for bringing in bed bugs?",
      a: "Even if you did bring them in (which is hard to prove), the landlord still owes a duty to remediate once notified. Most courts split fault: the landlord pays for treatment, you pay for some of your own replacement costs. Multi-unit buildings rarely succeed with this defense.",
    },
    {
      q: "How long does a landlord have to deal with pests?",
      a: "Most states require remediation within 7 to 30 days for general pests, faster for bed bugs and rodents. After that window, you can break the lease, withhold rent (in repair-and-deduct states), or sue for rent abatement plus damages.",
    },
    {
      q: "Can I sue for medical bills from pest bites or allergies?",
      a: "Yes, with a doctor's note linking the symptoms to the pests. Cockroach allergens and asthma have strong medical evidence. Bed bug bites are well-documented but the landlord may argue they happened before you moved in. Always see a doctor and keep records.",
    },
  ],

  relatedSlugs: [
    "mold",
    "unsafe-conditions",
    "break-lease",
    "harassment",
    "security-deposit",
    "wrongful-eviction",
  ],
};

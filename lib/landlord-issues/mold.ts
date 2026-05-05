import type { LandlordIssue } from "./types";

export const mold: LandlordIssue = {
  slug: "mold",
  ready: true,
  short: "Mold",
  breadcrumbLabel: "Mold",

  meta: {
    title: "Can I Sue My Landlord for Mold?",
    description:
      "Yes. If your landlord knew about mold and failed to fix it, you can sue for medical bills, ruined property, rent abatement, and (in some states) statutory damages. How much you can recover and how to file.",
  },

  hero: {
    eyebrowSuffix: "Mold and habitability",
    h1: { pre: "Can I sue my landlord for ", em: "mold", post: "?" },
    leadStrong: "Yes, you can sue your landlord for mold",
    leadBody:
      " when they knew about it and did not fix it, or when their negligence caused the moisture problem in the first place. Recoverable damages include medical bills, ruined personal property, rent abatement for the affected period, and (in some states) statutory damages for habitability violations.",
  },

  counter: {
    amount: 7800,
    meta: "Implied warranty of habitability",
    rows: [
      { label: "Medical bills + property loss", value: "$3,500" },
      { label: "Rent abatement (3 months)", value: "+ $4,000", emphasis: "accent" },
      { label: "Filing fee", value: "+ $300" },
    ],
    footer: "Habitability breach · landlord knew, did not fix",
  },

  whatCounts: {
    h2: { pre: "When does mold give you a ", em: "lawsuit", post: "?" },
    lede:
      "Four facts move a mold complaint from a maintenance request to a lawsuit. You usually need at least two of them.",
    cards: [
      {
        num: "01",
        title: "You gave written notice",
        body:
          "Email or text counts. The landlord has to know about the mold to be liable for failing to fix it. Verbal complaints to the property manager rarely hold up at the hearing.",
      },
      {
        num: "02",
        title: "A reasonable time passed",
        body:
          "Mold is a habitability issue, so most states require repair in 14 to 30 days. Active leaks should be fixed in 24 to 72 hours. After that, the landlord is in breach.",
      },
      {
        num: "03",
        title: "You have visible damage or symptoms",
        body:
          "Photos of growth on walls or ceilings, ruined drywall or furniture, or a doctor's note tying respiratory symptoms to mold exposure. Symptoms alone are weaker than physical damage to property.",
      },
      {
        num: "04",
        title: "The landlord caused the moisture",
        body:
          "Roof leak they failed to repair, plumbing leak in the wall, faulty bathroom ventilation, or a flood they did not properly remediate. If you caused the moisture (long showers, no AC), the case is harder.",
      },
    ],
    note: {
      strongIntro: "Send the notice in writing.",
      rest:
        " Mold cases turn on what the landlord knew and when. Email, text, or a certified letter creates the timestamp you need. Without it, the landlord can argue they would have fixed it if they had known.",
    },
  },

  claim: {
    h2: { pre: "How much can you sue your landlord for ", em: "mold", post: "?" },
    lede:
      "Mold cases stack three categories of damages. Property losses and rent abatement are easy to prove with receipts and photos. Personal injury is harder.",
    layers: [
      {
        tag: "Layer 1",
        title: "Property and medical bills",
        body:
          "Replacement cost for ruined furniture, clothing, electronics. Medical visits, prescriptions, and air purifiers. Bring itemized receipts.",
        amount: "$3,500",
      },
      {
        tag: "Layer 2",
        title: "Rent abatement",
        body:
          "Rent reduction for the months the unit was uninhabitable. Most courts use a percentage of rent (10 to 50 percent) based on how unusable the affected space was.",
        amount: "+ $4,000",
        accent: true,
      },
      {
        tag: "Layer 3",
        title: "Statutory damages and fees",
        body:
          "Some states (California, Massachusetts, New York City) authorize statutory damages on top for habitability breaches. Filing fees and pre-judgment interest also add up.",
        amount: "+ $300",
      },
    ],
    total: {
      label: "Sample mold case",
      body:
        "Three months of rent abatement on a $1,400 unit, plus replaced furniture and a doctor visit. Filed in small claims after a 30-day notice was ignored.",
      amount: "$7,800",
      sublabel: "illustrative · varies by state and severity",
    },
  },

  demand: {
    h2: { pre: "Send a ", em: "habitability demand", post: " first." },
    lede:
      "Many landlords settle a mold case once they see the math: medical bills, rent abatement, and (in some states) statutory damages. A clear demand letter triggers the duty to remediate immediately.",
    checklist: [
      "Date you first reported the mold",
      "Health symptoms or property damage you can document",
      "The amount you are claiming (rent abatement plus property losses)",
      "A 14-day deadline to remediate or pay",
      "Sent certified mail with photos attached",
    ],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3562",
      date: "April 21, 2026",
      recipientName: "Bayview Apartments LLC",
      recipientAddress: "455 Vermont Street, San Francisco, CA 94107",
      reLine: "Demand for mold remediation and damages, Apt 3B",
      bodyParagraphs: [
        "I notified you of <strong>visible black mold in the bathroom and bedroom ceiling</strong> on February 14, 2026 (email attached). As of today, more than 60 days have passed with no remediation.",
        "The condition has caused respiratory symptoms (medical records attached), ruined two pieces of furniture and a mattress, and rendered the bedroom unusable. Pursuant to <strong>Cal. Civ. Code § 1941</strong> (implied warranty of habitability), I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Professional mold remediation by a licensed contractor;",
        "Rent abatement of $1,500 for two months of bedroom uninhabitability;",
        "Reimbursement of $2,000 in property and medical costs.",
      ],
      closingLine: "Total demand: <strong>$3,500.00</strong> plus remediation. If unresolved, I will file in Small Claims Court.",
      signatory: "Casey M. Renter",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " a mold case in small claims." },
    lede: "Four steps. The hearing is where the photos do the work.",
    steps: [
      {
        title: "Document",
        body:
          "Date-stamped photos and video of mold growth. Save every email or text you sent the landlord. See a doctor if symptoms appeared.",
      },
      {
        title: "File",
        body:
          "File in the county where the rental is located. Filing fees usually run $30 to $80. The complaint should list rent abatement and property damages separately.",
      },
      {
        title: "Serve",
        body:
          "Sheriff, certified mail through the clerk, or process server. File proof of service before the hearing. Most landlords settle after this step.",
      },
      {
        title: "Hearing",
        body:
          "Open with a printed photo of the mold and your written notice. Walk the judge through the timeline: when you reported, what the landlord did, what damages followed.",
      },
    ],
    aftermath: {
      tag: "After you win",
      title: "Collecting and what comes next.",
      bodyHtml:
        "The landlord has 30 days to pay. Beyond that, you can record a <strong>judgment lien</strong>, garnish wages, or levy bank accounts. If you are still in the unit, you can also report the mold to the local housing inspector. Habitability violations on the inspector&rsquo;s record give you leverage on rent renewal.",
    },
  },

  evidence: {
    h2: { pre: "What evidence do you need to ", em: "win a mold case", post: "?" },
    lede:
      "Mold cases turn on documentation. Photos and timestamps win cases. Verbal complaints almost never do.",
    photos: [
      { id: "1597595272109-7c5d97caefb1", cap: "Bathroom mold" },
      { id: "1607435543180-0b8d4ba79192", cap: "Ceiling stain" },
      { id: "1556909038-0fa56b5b4cce", cap: "Wall growth" },
      { id: "1503602642458-232111445657", cap: "Damaged drywall" },
    ],
    texts: [
      { dir: "in", text: "Mold is back in the bathroom." },
      { dir: "out", text: "We'll send someone." },
      { dir: "in", text: "It's been 3 weeks. Nothing." },
    ],
    receipt: {
      vendor: "BAY AREA URGENT CARE",
      vendorAddr: "1500 Geary Blvd · SF, CA",
      receiptNum: "Visit #38291",
      date: "03/02/2026",
      lineItems: [
        { label: "Office visit", amount: "$185.00" },
        { label: "Inhaler prescription", amount: "$48.00" },
        { label: "Mold spore testing", amount: "$220.00" },
      ],
      subtotal: "$453.00",
      total: "$453.00",
      footer: "Thank you · receipt for tenant claim",
    },
  },

  defenses: {
    h2: { pre: "How landlords ", em: "defend", post: " a mold case." },
    lede:
      "Three defenses come up in almost every mold case. Each has a clean rebuttal if you have the documents.",
    items: [
      {
        quote: "We never knew about the mold.",
        pill: "Most common",
        rebuttal:
          "<strong>Rebuttal:</strong> dated emails, texts, or certified-mail receipts showing exactly when you reported it. If the landlord cannot produce a maintenance log either, the judge usually credits your timeline.",
      },
      {
        quote: "The mold was caused by tenant behavior.",
        pill: "Causation",
        rebuttal:
          "<strong>Rebuttal:</strong> photos of the source (a roof leak, a pipe behind drywall, missing bathroom vent fan). If the landlord skipped routine maintenance, the moisture is on them.",
      },
      {
        quote: "Health symptoms had other causes.",
        pill: "Personal injury",
        rebuttal:
          "<strong>Rebuttal:</strong> a doctor's note linking your symptoms to mold exposure (or even mold-spore air testing) is what most courts want. Without it, lead with property damages and rent abatement.",
      },
    ],
  },

  outcomes: {
    h2: { pre: "How much do tenants ", em: "actually win", post: " in mold cases?" },
    lede:
      "Outcomes vary widely. The size of your award depends on how long you reported it, how much it ruined, and whether you can document health effects.",
    bands: [
      {
        label: "Low",
        range: "$300 to $1,500",
        body:
          "<strong>Brief, well-documented exposure.</strong> One month of rent abatement plus a small property loss. No medical evidence.",
        tier: "low",
      },
      {
        label: "Mid",
        range: "$2,500 to $8,000",
        body:
          "<strong>Multi-month exposure with property damage.</strong> Several months of rent abatement, replacement of furniture and clothing, and a doctor visit.",
        tier: "mid",
      },
      {
        label: "High",
        range: "$8,000+",
        body:
          "<strong>Severe exposure or major property loss.</strong> Black mold remediation costs, total relocation, lost work, ongoing medical care. Larger claims often move to civil court.",
        tier: "high",
      },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to suing for mold?" },
    lede:
      "Three other paths fit before, or instead of, a small-claims case. Choose based on whether you want to stay in the unit and how serious the exposure is.",
    cards: [
      {
        title: "Code enforcement complaint",
        pillLabel: "Free",
        pillTier: "good",
        whenItFits:
          "you are still in the unit and want the mold remediated immediately. Local housing inspectors can order a fix and fine the landlord.",
        tradeoff: "no money damages. Useful as leverage, not as a remedy.",
      },
      {
        title: "Small claims (recommended)",
        pillLabel: "Best fit for damages",
        pillTier: "primary",
        whenItFits:
          "you have moved out or are willing to risk retaliation. Recoverable damages cover medical bills, ruined property, and rent abatement.",
        tradeoff:
          "30 to 90 day timeline. Most cases settle once the demand letter arrives.",
      },
      {
        title: "Personal injury attorney",
        pillLabel: "Major exposure",
        pillTier: "warn",
        whenItFits:
          "you have severe health damage, ongoing medical bills, or the landlord owns multiple buildings with similar issues.",
        tradeoff:
          "longer timeline. Many tenant-injury attorneys take mold cases on contingency.",
      },
    ],
  },

  cta: {
    h2: { pre: "Recover your ", em: "rent and damages", post: "." },
    body:
      "Most mold cases settle once a real demand letter shows the damages math. The generator builds yours in under two minutes.",
    receipt: {
      label: "example case",
      items: [
        { label: "Rent abatement (3 months)", amount: "$4,000" },
        { label: "Property loss + medical", amount: "+ $3,500" },
        { label: "Filing fee", amount: "+ $300" },
      ],
      total: "$7,800",
      totalLabel: "Total claim",
      note: "Illustrative. Your number depends on severity and documentation.",
    },
  },

  faqs: [
    {
      q: "Can you sue a landlord for mold making you sick?",
      a: "Yes, if you can document that the mold caused the symptoms. Bring a doctor's note tying your respiratory or skin issues to mold exposure, plus photos of the mold and dated proof you reported it. Cases without medical documentation usually settle for property damage and rent abatement, not personal injury.",
    },
    {
      q: "How much can you sue a landlord for mold?",
      a: "Typically $1,500 to $8,000 in small claims, depending on how long the mold went unaddressed, what it ruined, and whether you have medical documentation. Larger personal-injury cases involving black mold or hospitalization often move to civil court for $10,000+.",
    },
    {
      q: "How do you prove a landlord knew about the mold?",
      a: "Email or text you sent reporting the issue, the maintenance request log if the building keeps one, and the date the landlord first sent (or did not send) a contractor. Verbal complaints are weaker than written ones. Always put mold complaints in writing.",
    },
    {
      q: "Can you break your lease because of mold?",
      a: "Yes, in most states, if the landlord refused to remediate after written notice. Constructive eviction lets you treat the lease as terminated when the unit is uninhabitable. Document the timeline carefully because the landlord may sue you for the unpaid rent.",
    },
    {
      q: "Do you need an inspector before suing?",
      a: "No. An inspector report helps but is not required. Photos, dated written notices, and (for personal injury) a doctor's note are usually enough. If you can afford a $200 to $500 mold-spore air test, it adds weight to severity claims.",
    },
    {
      q: "What if my landlord retaliates after I complain?",
      a: "Most states have anti-retaliation laws that protect tenants who report habitability problems. If your landlord raises rent, refuses to renew, or starts an eviction within 6 months of your complaint, that may itself be a separate claim. Save the timeline.",
    },
    {
      q: "Can you sue for emotional distress from mold?",
      a: "Sometimes. Pure emotional-distress claims are hard to win in small claims without physical injury. If you have respiratory damage tied to the mold, courts will often add a modest emotional-distress amount on top. Most successful cases lead with property damage and rent abatement.",
    },
  ],

  relatedSlugs: [
    "unsafe-conditions",
    "pest-infestation",
    "break-lease",
    "harassment",
    "security-deposit",
    "wrongful-eviction",
  ],
};

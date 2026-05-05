import type { LandlordIssue } from "./types";

export const breakLease: LandlordIssue = {
  slug: "break-lease",
  ready: true,
  short: "Break lease",
  breadcrumbLabel: "Break lease",

  meta: {
    title: "How to Break Your Lease Without Penalty",
    description:
      "Most states recognize five legal grounds to break a lease without penalty: military deployment, domestic violence, uninhabitable conditions, harassment, and mutual agreement. How each one works and what evidence to bring.",
  },

  hero: {
    eyebrowSuffix: "Breaking your lease",
    h1: { pre: "Can I sue my landlord to ", em: "break my lease", post: " early?" },
    leadStrong: "Yes, in five legal scenarios you can break a lease",
    leadBody:
      " without owing the remaining rent, and sue your landlord if they retaliate or refuse to refund prepaid amounts. Active-duty military deployment, domestic violence, uninhabitable conditions, landlord harassment, and mutual termination. Each path has specific notice and documentation requirements. If your situation does not fit one of these grounds, the landlord can charge you for the remainder of the lease (minus their duty to mitigate by re-renting).",
  },

  counter: {
    amount: 8400,
    meta: "Constructive eviction · uninhabitable",
    rows: [
      { label: "Avoided rent (7 months)", value: "$8,400", emphasis: "accent" },
      { label: "Moving costs", value: "+ $400" },
      { label: "Filing fee + retained deposit", value: "+ $0" },
    ],
    footer: "Habitability breach · constructive eviction notice given",
  },

  whatCounts: {
    h2: { pre: "What lets you ", em: "break a lease", post: " legally?" },
    lede:
      "Five recognized grounds. Each has specific procedural requirements. Skipping the procedure means you owe the rent.",
    cards: [
      {
        num: "01",
        title: "Active-duty military (SCRA)",
        body:
          "Federal Servicemembers Civil Relief Act. Requires written notice plus a copy of orders for deployment of 90+ days or PCS. Lease ends 30 days after the next rent due date.",
      },
      {
        num: "02",
        title: "Domestic violence",
        body:
          "Most states (45+) have specific lease-termination protections for survivors. Requires a protective order, police report, or third-party verification. Notice period varies by state (14 to 30 days).",
      },
      {
        num: "03",
        title: "Uninhabitable conditions",
        body:
          "Constructive eviction. The unit must be so defective that it is unusable as housing (no heat in winter, sewage, severe mold, structural collapse). Requires written notice and a reasonable repair window before you can leave.",
      },
      {
        num: "04",
        title: "Harassment by landlord",
        body:
          "Repeated unauthorized entry, threats, retaliation, or refusal to respect your right to quiet enjoyment. The conduct must be severe and well-documented. Some states require a court order before you can leave.",
      },
      {
        num: "05",
        title: "Mutual agreement",
        body:
          "Always available. Negotiate a buyout (often 1 to 2 months rent) or a clean break with the landlord. Get the agreement in writing, signed by both parties, before you move.",
      },
    ],
  },

  claim: {
    h2: { pre: "How much can ", em: "breaking a lease", post: " save you?" },
    lede:
      "Three categories of avoided cost. The big one is the rent for the remaining lease months. Done correctly, you owe nothing.",
    layers: [
      {
        tag: "Layer 1",
        title: "Avoided remaining rent",
        body:
          "If you are 5 months into a 12-month lease at $1,200/month, you avoid $8,400 in rent obligations by terminating legally. Without legal grounds, you may owe most or all of that.",
        amount: "$8,400",
        accent: true,
      },
      {
        tag: "Layer 2",
        title: "Avoided early-termination fee",
        body:
          "Most leases contain a 2- to 3-month rent termination fee. Legal grounds usually waive it. Mutual buyouts often replace it with a smaller agreed fee.",
        amount: "$0",
      },
      {
        tag: "Layer 3",
        title: "Retained security deposit",
        body:
          "If you terminate legally and leave the unit clean, the landlord cannot keep the deposit as damages for the broken lease. Document the move-out walkthrough.",
        amount: "$0",
      },
    ],
    total: {
      label: "Sample case · constructive eviction",
      body:
        "7 months remaining on a $1,200/month lease, terminated under habitability after 30-day notice. Moving costs covered out of pocket but no rent owed.",
      amount: "$8,400 saved",
      sublabel: "illustrative · varies by lease term and rent",
    },
  },

  demand: {
    h2: { pre: "Send a ", em: "termination notice", post: " on the right grounds." },
    lede:
      "The notice itself is the legal step. Done correctly, it ends your obligations. Done incorrectly, it can be treated as abandonment and the landlord can sue you for the full remaining rent.",
    checklist: [
      "The legal ground (SCRA, DV, habitability, harassment, mutual)",
      "Supporting documentation (orders, protective order, photos, etc.)",
      "Specific termination date matching state law",
      "Forwarding address for deposit return",
      "Sent certified mail with return receipt",
    ],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3571",
      date: "April 21, 2026",
      recipientName: "Sycamore Heights LLC",
      recipientAddress: "1900 Bayshore Blvd, San Francisco, CA 94124",
      reLine: "Lease termination notice, Apt 6D",
      bodyParagraphs: [
        "I am terminating the lease at the above unit effective <strong>May 21, 2026</strong>. Termination is based on uninhabitable conditions: <strong>active mold growth, broken heating, and a sewage leak</strong> reported on January 14, 2026 (emails attached) and remaining unaddressed.",
        "Pursuant to the implied warranty of habitability under <strong>Cal. Civ. Code § 1941</strong>, this constitutes constructive eviction. I will be moving out on or before May 21. Please confirm:",
      ],
      demandList: [
        "Acknowledgment that the lease is terminated as of May 21, 2026;",
        "Return of my $1,500 security deposit by June 11 per § 1950.5;",
        "Forwarding address for deposit: 555 Oak Street, San Francisco, CA 94110.",
      ],
      closingLine: "I have provided <strong>30 days notice</strong>. If you contest the termination, I will respond in Small Claims Court.",
      signatory: "Avery J. Tenant",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "break", post: " a lease step by step." },
    lede: "Four steps. The procedure matters more than the substance.",
    steps: [
      {
        title: "Confirm the ground",
        body:
          "Match your situation to one of the five recognized grounds. Document everything: military orders, protective order, dated maintenance reports, harassment log. Without documentation, the ground is weak.",
      },
      {
        title: "Send notice",
        body:
          "Written notice with the legal ground stated, the supporting documents, and the termination date matching state law. Send certified mail with return receipt.",
      },
      {
        title: "Document the move-out",
        body:
          "Walkthrough photos of every room, signed checklist if the landlord will agree, written acknowledgment of the termination date. Clean the unit. Return all keys.",
      },
      {
        title: "Defend or sue if needed",
        body:
          "If the landlord files for unpaid rent, you defend with the legal ground. If they keep your deposit, you sue. Most cases settle once both sides see the documentation.",
      },
    ],
    aftermath: {
      tag: "After you leave",
      title: "Protecting yourself.",
      bodyHtml:
        "Save every document for at least 4 years (the contract statute of limitations in most states). Keep a copy of the termination notice with the certified-mail return receipt. If the landlord lists your debt with a credit bureau or collection agency, dispute it with proof of legal termination. Many tenants find this on a credit report years later.",
    },
  },

  evidence: {
    h2: { pre: "What evidence do you need to ", em: "break your lease", post: "?" },
    lede:
      "The right evidence depends on the ground. Habitability cases need photos. Harassment cases need a log. Military cases need orders.",
    photos: [
      { id: "1554224155-1696413565d3", cap: "Lease + termination letter" },
      { id: "1607435543180-0b8d4ba79192", cap: "Habitability photos" },
      { id: "1591019479261-c10b4716a0ea", cap: "Police report (DV)" },
      { id: "1517245386807-bb43f82c33c4", cap: "Maintenance request log" },
    ],
    texts: [
      { dir: "in", text: "Sewage leak in bathroom for 3 weeks. Need to terminate." },
      { dir: "out", text: "We're working on it." },
      { dir: "in", text: "30-day notice attached. Terminating." },
    ],
    receipt: {
      vendor: "BAYSIDE MOVING & STORAGE",
      vendorAddr: "Treasure Island · SF, CA",
      receiptNum: "Job #M-7821",
      date: "05/21/2026",
      lineItems: [
        { label: "Local move (1-bedroom)", amount: "$1,400.00" },
        { label: "Packing supplies", amount: "$120.00" },
        { label: "Storage (1 month)", amount: "$280.00" },
      ],
      subtotal: "$1,800.00",
      total: "$1,800.00",
      footer: "Receipt for tenant claim · thank you",
    },
  },

  defenses: {
    h2: { pre: "Common landlord ", em: "responses", post: "." },
    lede:
      "Three responses come up when tenants break leases. Each has a clean rebuttal if your documentation is in order.",
    items: [
      {
        quote: "The condition wasn't actually uninhabitable.",
        pill: "Most common",
        rebuttal:
          "<strong>Rebuttal:</strong> photos, code-enforcement reports, contractor estimates. Habitability is a state-by-state standard but the core is the same: would a reasonable person consider this housing safe and usable.",
      },
      {
        quote: "Tenant didn't give enough notice.",
        pill: "Procedural",
        rebuttal:
          "<strong>Rebuttal:</strong> certified-mail return receipt with the date. Most states require 30 days for habitability terminations. SCRA and DV statutes have specific shorter windows. Match the right window.",
      },
      {
        quote: "Tenant abandoned the unit.",
        pill: "Causation",
        rebuttal:
          "<strong>Rebuttal:</strong> the termination notice converts the move from abandonment to legal termination. The notice is the difference between owing rent and owing nothing.",
      },
    ],
  },

  outcomes: {
    h2: { pre: "How does ", em: "breaking the lease", post: " usually end?" },
    lede:
      "Outcomes depend on the strength of the ground. Strong grounds with proper notice end the lease cleanly. Weak grounds end with you owing rent plus fees.",
    bands: [
      {
        label: "Best case",
        range: "$0 owed",
        body:
          "<strong>Strong ground, proper notice.</strong> SCRA, DV, habitability with code-enforcement backing, or mutual agreement. Lease ends cleanly. Deposit returned.",
        tier: "low",
      },
      {
        label: "Common case",
        range: "1 to 2 months rent",
        body:
          "<strong>Negotiated mutual termination.</strong> No clear legal ground but you and the landlord agreed on a buyout. Standard for life-change moves (job, family).",
        tier: "mid",
      },
      {
        label: "Worst case",
        range: "Full remaining rent",
        body:
          "<strong>No notice, no ground, abandoned unit.</strong> Landlord sues for the full remaining lease minus mitigation duty. Credit damage and judgment lien possible.",
        tier: "high",
      },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: "?" },
    lede:
      "Three other paths if you do not have one of the five legal grounds.",
    cards: [
      {
        title: "Negotiate a buyout",
        pillLabel: "Most common",
        pillTier: "primary",
        whenItFits:
          "you do not have a legal ground but want to leave. Most landlords accept 1 to 2 months rent as a buyout. Get the agreement in writing.",
        tradeoff:
          "costs 1 to 2 months rent but ends the obligation cleanly.",
      },
      {
        title: "Subletting (if allowed)",
        pillLabel: "Cheapest",
        pillTier: "good",
        whenItFits:
          "your lease allows subletting (most do not, but some do). Find a tenant, get landlord approval, and your liability transfers.",
        tradeoff:
          "you remain on the lease, so a bad subtenant becomes your problem.",
      },
      {
        title: "Lease assignment",
        pillLabel: "Cleanest",
        pillTier: "good",
        whenItFits:
          "the landlord agrees to assign your lease to a new tenant. Common in tight rental markets.",
        tradeoff:
          "requires landlord cooperation and a willing replacement tenant.",
      },
    ],
  },

  cta: {
    h2: { pre: "Break your lease the ", em: "right way", post: "." },
    body:
      "A proper termination notice on a recognized ground ends your lease without penalty. The wrong notice (or no notice) can leave you owing the full remaining rent.",
    receipt: {
      label: "example · habitability termination",
      items: [
        { label: "Avoided rent (7 months)", amount: "$8,400" },
        { label: "Moving costs (out of pocket)", amount: "+ $400" },
        { label: "Deposit returned", amount: "$0" },
      ],
      total: "$8,400 saved",
      totalLabel: "Net savings",
      note: "Illustrative. The bigger the remaining lease, the bigger the savings from terminating correctly.",
    },
  },

  faqs: [
    {
      q: "How can I break my lease without paying a penalty?",
      a: "Five recognized grounds: active military deployment under SCRA, domestic violence (45+ states), uninhabitable conditions (constructive eviction), severe landlord harassment, or mutual agreement. Each requires specific notice and documentation. Skipping the procedure can mean you owe the full remaining rent.",
    },
    {
      q: "What is constructive eviction?",
      a: "When a unit is so uninhabitable that you have no choice but to leave, constructive eviction lets you treat the lease as terminated by the landlord's breach. Requires written notice of the conditions and a reasonable repair window. Severe mold, no heat in winter, sewage backup, or collapsed ceilings typically qualify.",
    },
    {
      q: "Can I break my lease for mold?",
      a: "Yes, in most states, after written notice and a reasonable repair window. Mold is a habitability violation, and severe mold supports constructive eviction. Document everything: photos, dated reports, and (if possible) a code-enforcement complaint.",
    },
    {
      q: "How much notice do I have to give to break a lease?",
      a: "Depends on the ground. SCRA: 30 days from next rent due date. Domestic violence: 14 to 30 days, varies by state. Habitability or harassment: usually 30 days after the landlord fails to remediate. Mutual agreement: whatever the parties agree on.",
    },
    {
      q: "What happens if I just leave without notice?",
      a: "The landlord can sue you for the rent for the remaining lease term, minus their duty to mitigate by re-renting. They can also keep your deposit as damages, send the debt to collections, and report it to credit bureaus. Always send notice.",
    },
    {
      q: "Does the landlord have to try to re-rent?",
      a: "Yes, in nearly every state. The duty to mitigate damages requires the landlord to make reasonable efforts to find a replacement tenant. If they fail to advertise or unreasonably reject applicants, your liability is reduced. Save evidence (Craigslist screenshots, applicant emails).",
    },
    {
      q: "Can I get out of a lease for harassment by the landlord?",
      a: "Yes, in most states, if the harassment is severe and well-documented. Repeated unauthorized entry, threats, intimidation, and retaliation can support constructive eviction. The bar is higher than for habitability cases. Strong documentation matters.",
    },
  ],

  relatedSlugs: [
    "wrongful-eviction",
    "harassment",
    "unsafe-conditions",
    "mold",
    "after-moving-out",
    "security-deposit",
  ],
};

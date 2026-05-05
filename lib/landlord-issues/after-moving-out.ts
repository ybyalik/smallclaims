import type { LandlordIssue } from "./types";

export const afterMovingOut: LandlordIssue = {
  slug: "after-moving-out",
  ready: true,
  short: "After moving out",
  breadcrumbLabel: "After moving out",

  meta: {
    title: "Can You Sue a Former Landlord After You've Moved Out?",
    description:
      "Yes. The most common claim against a former landlord is a withheld security deposit, but you can also sue for charges that came after move-out, retaliation, and habitability damages from your tenancy. Filing windows and how to file.",
  },

  hero: {
    eyebrowSuffix: "After moving out",
    h1: { pre: "Can you sue a former landlord ", em: "after you've moved out", post: "?" },
    leadStrong: "Yes, you can sue a former landlord",
    leadBody:
      ". The most common cases are withheld security deposits and bogus post-move-out charges, but you can also sue for harassment, wrongful eviction, and habitability damages that arose during your tenancy. State statutes of limitations give you 1 to 6 years depending on the claim.",
  },

  counter: {
    amount: 4900,
    meta: "Multi-claim against former landlord",
    rows: [
      { label: "Withheld deposit", value: "$1,500" },
      { label: "Statutory damages (2x)", value: "+ $3,000", emphasis: "accent" },
      { label: "Filing fee + interest", value: "+ $400" },
    ],
    footer: "Move-out 3 months ago · within filing window",
  },

  whatCounts: {
    h2: { pre: "What can you sue a ", em: "former landlord", post: " for?" },
    lede:
      "Four common post-move-out claims. Each has its own statute of limitations.",
    cards: [
      {
        num: "01",
        title: "Withheld security deposit",
        body:
          "Most common post-move-out claim. State statutes give 1 to 6 years to file (check your state guide). The clock usually starts on the date the deposit was due back, not the date you moved out.",
      },
      {
        num: "02",
        title: "Bogus post-move-out charges",
        body:
          "Cleaning fees, carpet replacement, repainting, repair charges that exceed actual damage. Every state limits charges to amounts above normal wear and tear. Apartment complexes are heavy offenders here.",
      },
      {
        num: "03",
        title: "Habitability damages from your tenancy",
        body:
          "Mold exposure, pest infestations, broken AC during a heat wave, ruined property. The clock typically runs from the last day of the affected condition. You can sue years after moving out in many states.",
      },
      {
        num: "04",
        title: "Wrongful eviction or harassment",
        body:
          "If the landlord forced you out (lockout, retaliation, harassment) you can still sue after moving on. Statutory penalties like California's $100/day for unlawful exclusion still apply.",
      },
    ],
    note: {
      strongIntro: "Move quickly within the filing window.",
      rest:
        " Witnesses scatter, records get lost, and landlords go out of business. Even though the statute of limitations is generous, cases filed within 6 to 12 months of move-out have much higher success rates than older cases.",
    },
  },

  claim: {
    h2: { pre: "How much can you sue a ", em: "former landlord", post: " for?" },
    lede:
      "Three categories. The math is the same as during tenancy. The hardest part is collection if the landlord changed addresses or business names.",
    layers: [
      {
        tag: "Layer 1",
        title: "Direct damages",
        body:
          "Withheld deposit, refunded fees, replaced belongings, medical bills from habitability problems, hotel costs, moving expenses from any wrongful eviction.",
        amount: "$1,500",
      },
      {
        tag: "Layer 2",
        title: "Statutory damages",
        body:
          "Same multipliers that applied during tenancy. California: 2x deposit. Texas: 3x. Massachusetts: 3x plus interest. Wrongful eviction: per-day penalties under state law.",
        amount: "+ $3,000",
        accent: true,
      },
      {
        tag: "Layer 3",
        title: "Filing fees and attorney fees",
        body:
          "Filing fee, service-of-process cost, statutory attorney fees in most landlord-tenant statutes (recoverable even pro se).",
        amount: "+ $400",
      },
    ],
    total: {
      label: "Sample case · withheld deposit",
      body:
        "$1,500 deposit withheld with no itemization, served by 2x California penalty for bad faith.",
      amount: "$4,900",
      sublabel: "illustrative · varies by claim type and state",
    },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede:
      "Even after move-out, the demand letter is the right first step. Most former landlords settle once they see the math and realize the case is still timely.",
    checklist: [
      "Move-out date and forwarding address",
      "Specific claim and dollar amount",
      "Statute of limitations (still timely)",
      "A 14-day deadline before filing",
      "Sent certified mail to last known business address",
    ],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3570",
      date: "April 21, 2026",
      recipientName: "Hilltop Properties LLC",
      recipientAddress: "5500 Wilshire Blvd, Los Angeles, CA 90036",
      reLine: "Demand for damages, former tenancy at 1822 Fairfax Ave Apt 3",
      bodyParagraphs: [
        "I vacated the above unit on January 31, 2026, and provided written notice of my forwarding address that day. The 21-day deadline under <strong>Cal. Civ. Code § 1950.5</strong> expired February 21, 2026. To date, no portion of my $1,500 deposit has been returned.",
        "I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Return of the $1,500 deposit in full;",
        "Statutory damages of 2x the wrongfully withheld amount ($3,000) for bad-faith retention;",
        "Reasonable filing and service fees.",
      ],
      closingLine: "Total demand: <strong>$4,500.00</strong>. If unresolved, I will file in Small Claims Court.",
      signatory: "Cameron J. Tenant",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " against a former landlord." },
    lede: "Four steps. Finding the landlord can be the hardest part.",
    steps: [
      {
        title: "Confirm timing",
        body:
          "Check your state's statute of limitations for the specific claim. Security deposit: usually 2 to 4 years. Habitability or contract: 2 to 6 years. Tort: 1 to 3 years. File comfortably inside the window.",
      },
      {
        title: "Locate the landlord",
        body:
          "Search the secretary of state for the LLC or corporation that owned the building. Update your defendant address. Outdated addresses lead to dismissed cases.",
      },
      {
        title: "File and serve",
        body:
          "Small claims if total fits the cap. File in the county where the rental was located, not where you live now. Sheriff service on the registered agent.",
      },
      {
        title: "Hearing",
        body:
          "Bring your move-out walkthrough photos, lease, deposit receipts, forwarding-address notice with proof of mailing, and any communications. Lead with the date and dollar amount.",
      },
    ],
    aftermath: {
      tag: "After you win",
      title: "Collecting from a former landlord.",
      bodyHtml:
        "30-day voluntary payment, then enforcement. Former landlords are sometimes harder to collect from because they may have moved or dissolved entities. Judgment liens can be recorded against any property they own. Wage garnishment works if the landlord is also an individual employee. Bank levy requires identifying the account.",
    },
  },

  evidence: {
    h2: { pre: "What evidence do you need ", em: "after moving out", post: "?" },
    lede:
      "After move-out, your evidence is whatever you took with you. Save everything before you turn in the keys.",
    photos: [
      { id: "1556909114-f6e7ad7d3136", cap: "Move-out walkthrough" },
      { id: "1505873242700-f289a29e1e0f", cap: "Lease document" },
      { id: "1564540586988-aa4e53c3d799", cap: "Mailing receipt" },
      { id: "1517245386807-bb43f82c33c4", cap: "Forwarding letter" },
    ],
    texts: [
      { dir: "in", text: "I'm out April 1. Forwarding address is 555 Oak St." },
      { dir: "out", text: "Got it." },
      { dir: "in", text: "Where's my deposit? It's been 6 weeks." },
    ],
    receipt: {
      vendor: "USPS CERTIFIED MAIL",
      vendorAddr: "Mission Branch · SF, CA",
      receiptNum: "Cert #7019 0140 0001 4827",
      date: "01/31/2026",
      lineItems: [
        { label: "Certified mail with return receipt", amount: "$8.45" },
        { label: "Forwarding-address notice", amount: "(included)" },
      ],
      subtotal: "$8.45",
      total: "$8.45",
      footer: "Return receipt received 02/03/2026",
    },
  },

  defenses: {
    h2: { pre: "Common landlord ", em: "defenses", post: "." },
    lede:
      "Three defenses come up in former-tenant cases. Two of them rarely work.",
    items: [
      {
        quote: "The tenant waited too long.",
        pill: "Most common",
        rebuttal:
          "<strong>Rebuttal:</strong> check your state's statute of limitations. Security-deposit claims usually have 2 to 4 years. Most cases filed within 18 months are well inside the window. The clock starts on the date the violation occurred, not the date you moved out.",
      },
      {
        quote: "We never got the forwarding address.",
        pill: "Procedural",
        rebuttal:
          "<strong>Rebuttal:</strong> certified-mail return receipt with the landlord's signature, or a printed email with full headers. Without proof, you may need to use the date of move-out as the start of the clock instead.",
      },
      {
        quote: "All charges were legitimate.",
        pill: "Causation",
        rebuttal:
          "<strong>Rebuttal:</strong> move-in walkthrough photos and a signed checklist. If the landlord cannot produce the move-in walkthrough or the contractor invoices for repairs, the judge usually credits the tenant.",
      },
    ],
  },

  outcomes: {
    h2: { pre: "How much do former tenants ", em: "actually win", post: "?" },
    lede:
      "Outcomes depend on the underlying claim. Deposit cases settle most predictably.",
    bands: [
      {
        label: "Low",
        range: "$300 to $1,200",
        body:
          "<strong>Partial deposit win.</strong> Some deductions allowed, no multiplier. Common when the landlord did proper itemization but charged for wear and tear.",
        tier: "low",
      },
      {
        label: "Mid",
        range: "$1,500 to $5,000",
        body:
          "<strong>Full deposit + statutory multiplier.</strong> Landlord sent no itemization or charged wear-and-tear. Most former-tenant cases land here.",
        tier: "mid",
      },
      {
        label: "High",
        range: "$5,000+",
        body:
          "<strong>Multi-claim case.</strong> Deposit plus habitability damages plus wrongful-eviction penalties from the tenancy. Often near or above the small-claims cap.",
        tier: "high",
      },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to suing?" },
    lede:
      "Two other paths. Skip-tracing or attorney help fits when the landlord disappeared.",
    cards: [
      {
        title: "Demand letter (recommended)",
        pillLabel: "Free, fast",
        pillTier: "primary",
        whenItFits:
          "you have a current address for the landlord. Most former-tenant cases settle at this stage because filing in court is more expensive for the landlord than paying.",
        tradeoff:
          "Goes to small claims if ignored. Free to send.",
      },
      {
        title: "Small claims (recommended)",
        pillLabel: "Best for damages",
        pillTier: "primary",
        whenItFits:
          "demand letter ignored. File in the county where the rental was located, not where you live now.",
        tradeoff:
          "30 to 90 day timeline. Filing fee around $50. Statutory damages and fee-shifting.",
      },
      {
        title: "Tenant-rights attorney",
        pillLabel: "Landlord disappeared",
        pillTier: "warn",
        whenItFits:
          "the landlord changed business names, moved, or dissolved entities. Skip-tracing and complex collection may need professional help.",
        tradeoff:
          "Many tenant-rights attorneys take deposit cases on contingency due to fee-shifting.",
      },
    ],
  },

  cta: {
    h2: { pre: "Even after ", em: "moving out", post: ", you can recover." },
    body:
      "Statutes of limitations are generous for tenant claims. Even one to two years after move-out, most cases are still timely. Generate your demand letter in under two minutes.",
    receipt: {
      label: "example · withheld deposit, 3 months post-move-out",
      items: [
        { label: "Withheld deposit", amount: "$1,500" },
        { label: "Statutory damages (2x)", amount: "+ $3,000" },
        { label: "Filing fee + interest", amount: "+ $400" },
      ],
      total: "$4,900",
      totalLabel: "Total claim",
      note: "Illustrative. Statutes of limitations vary 1 to 6 years by claim and state.",
    },
  },

  faqs: [
    {
      q: "Can I sue my landlord after I move out?",
      a: "Yes. The most common post-move-out claim is a withheld security deposit, but you can also sue for habitability damages from your tenancy, wrongful eviction, and harassment. State statutes of limitations give you 1 to 6 years depending on the claim.",
    },
    {
      q: "How long after moving out can I sue my landlord?",
      a: "Depends on the claim and state. Security deposit: 2 to 4 years (the contract clock). Habitability or breach of warranty: 2 to 6 years. Tort claims (negligence, intentional torts): 1 to 3 years. Always check your specific state guide.",
    },
    {
      q: "Can I sue a former landlord for not returning my deposit?",
      a: "Yes. Most state security-deposit statutes have 2 to 4 year filing windows. The clock usually starts on the date the deposit was due back (deadline plus a reasonable period), not the date you moved out. File before the window closes.",
    },
    {
      q: "How do you find a former landlord's current address?",
      a: "Search your state's secretary-of-state records for the LLC or corporation that owned the building. Most filings list a registered agent for service of process. Local property-tax records also show current ownership. Skip-tracing services can help if those fail.",
    },
    {
      q: "Where do you file if you've moved to another state?",
      a: "Where the rental was located, not where you live now. Subject-matter jurisdiction follows the property. You can usually appear by phone or video for the hearing if you have moved away. Check the local court's remote-appearance policy.",
    },
    {
      q: "Can I sue for habitability damages after I move out?",
      a: "Yes. The clock typically runs from the last day of the affected condition or the date of move-out. You can sue years later in many states. Document immediately though, because witnesses scatter and records degrade.",
    },
    {
      q: "What if the landlord went out of business?",
      a: "Find the LLC or corporation that owned the building in secretary-of-state records. If the entity dissolved, the people who got distributions may be personally liable. This is harder than a typical case and may need an attorney.",
    },
  ],

  relatedSlugs: [
    "security-deposit",
    "wrongful-eviction",
    "harassment",
    "illegal-lockout",
    "mold",
    "break-lease",
  ],
};

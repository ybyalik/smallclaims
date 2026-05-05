import type { LandlordIssue } from "./types";

export const apartmentComplex: LandlordIssue = {
  slug: "apartment-complex",
  ready: true,
  short: "Apartment complex",
  breadcrumbLabel: "Apartment Complex",

  meta: {
    title: "How to Sue Your Apartment Complex",
    description:
      "You can sue an apartment complex in small claims for the same reasons you can sue any landlord, plus a few extra: poor common-area maintenance, lease boilerplate violations, and security failures. How much, what evidence, and how to file.",
  },

  hero: {
    eyebrowSuffix: "Apartment complex",
    h1: { pre: "Can I sue my ", em: "apartment complex", post: "?" },
    leadStrong: "Yes, you can sue an apartment complex in small claims",
    leadBody:
      " for the same reasons you can sue any landlord, plus a few extra. Common-area maintenance failures, security violations, lease boilerplate that breaks state law, and unauthorized fees are all small-claims territory. The corporate structure does not protect them.",
  },

  counter: {
    amount: 4200,
    meta: "Multi-claim against corporate landlord",
    rows: [
      { label: "Withheld deposit + fees", value: "$1,800" },
      { label: "Statutory damages (2x)", value: "+ $2,000", emphasis: "accent" },
      { label: "Filing fee + interest", value: "+ $400" },
    ],
    footer: "Apartment complex · pattern across building",
  },

  whatCounts: {
    h2: { pre: "What can you sue an ", em: "apartment complex", post: " for?" },
    lede:
      "Apartment complexes have the same legal duties as any landlord, plus extra duties tied to common areas and amenities. Four common claims.",
    cards: [
      {
        num: "01",
        title: "Security deposit and unauthorized fees",
        body:
          "Unreturned deposits, hidden move-out fees, cleaning charges that violate state law, charges for normal wear and tear. Apartment complexes often automate this, which means the same violation hits many tenants and creates a pattern.",
      },
      {
        num: "02",
        title: "Common areas and amenities",
        body:
          "Broken elevators, dirty pools, unsafe gym equipment, missing security cameras advertised in the lease, parking failures. If they sold it in marketing, they have to deliver it.",
      },
      {
        num: "03",
        title: "Habitability inside your unit",
        body:
          "Mold, pests, broken AC or heat, hot water failures, leaks, electrical issues. Same rules as any landlord. Apartment complexes have larger maintenance staffs but also larger inboxes, so report timelines slip.",
      },
      {
        num: "04",
        title: "Security failures",
        body:
          "Unlocked exterior doors, broken intercoms, lighting failures in stairwells or parking lots, security guards advertised but not provided. If a security failure led to a break-in or assault, the case can be substantial.",
      },
    ],
    note: {
      strongIntro: "Apartment complexes settle quickly.",
      rest:
        " Property managers are paid to avoid lawsuits. A demand letter that names the parent company and cites the statute usually gets fast attention. Corporate landlords also fear pattern lawsuits because one judgment can be admitted in others.",
    },
  },

  claim: {
    h2: { pre: "How much can you sue an ", em: "apartment complex", post: " for?" },
    lede:
      "The math depends on which claim you bring. Multi-claim cases (deposit plus fees plus habitability) can stack quickly.",
    layers: [
      {
        tag: "Layer 1",
        title: "Direct losses",
        body:
          "Unreturned deposit, unauthorized fees, repair costs you paid, replaced belongings from a habitability failure, hotel nights from a broken-AC heatwave.",
        amount: "$1,800",
      },
      {
        tag: "Layer 2",
        title: "Statutory damages",
        body:
          "Most state landlord-tenant codes apply equally to corporate landlords. Texas adds 3x deposit. California adds 2x. New York adds punitive damages for willful violations.",
        amount: "+ $2,000",
        accent: true,
      },
      {
        tag: "Layer 3",
        title: "Filing fees and attorney fees",
        body:
          "Filing fee (around $50), service-of-process cost, statutory attorney fees in most landlord-tenant statutes (recoverable even pro se).",
        amount: "+ $400",
      },
    ],
    total: {
      label: "Sample multi-claim case",
      body:
        "Withheld $1,200 deposit plus $600 in cleaning fees, served by 2x California penalty for bad-faith withholding, plus filing fee.",
      amount: "$4,200",
      sublabel: "illustrative · varies by state and number of claims",
    },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " to corporate first." },
    lede:
      "Send the letter to the corporate office, not just the on-site manager. Cite the parent company by name. Property managers often forward the letter to corporate counsel, who settle faster than on-site staff.",
    checklist: [
      "Each claim listed separately with its amount",
      "Dates of move-in, move-out, and notices sent",
      "Statutes you are relying on (cited by section)",
      "A 14-day deadline before filing",
      "Sent certified mail to the corporate registered agent",
    ],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3568",
      date: "April 21, 2026",
      recipientName: "Greystar Real Estate Partners",
      recipientAddress: "Registered Agent, 18 South Michigan Ave, Chicago, IL 60603",
      reLine: "Demand for damages, multi-claim, Avalon Mission Bay Apt 4218",
      bodyParagraphs: [
        "On move-out March 31, 2026, you withheld $1,200 of my $1,500 security deposit and charged $600 in cleaning fees that violate <strong>Cal. Civ. Code § 1950.5</strong>.",
        "Within <strong>fourteen (14) days</strong>, I demand:",
      ],
      demandList: [
        "Refund of the $1,200 wrongfully withheld deposit;",
        "Refund of the $600 in unauthorized cleaning charges;",
        "Statutory damages of 2x the wrongfully withheld amount ($2,000) for bad-faith withholding.",
      ],
      closingLine: "Total demand: <strong>$3,800.00</strong>. If unresolved, I will file in Small Claims Court and serve all named parties.",
      signatory: "Riley S. Tenant",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " against an apartment complex." },
    lede: "Four steps. Naming the right entity matters more than in single-landlord cases.",
    steps: [
      {
        title: "Identify the right defendant",
        body:
          "The on-site building name is usually a brand, not a legal entity. Find the LLC or corporation that owns the property in state-secretary records. Name both the property entity and the management company.",
      },
      {
        title: "File",
        body:
          "Small claims if the total fits the cap. File in the county where the rental is located. Serve the registered agent of each named entity, not the on-site manager.",
      },
      {
        title: "Serve",
        body:
          "Sheriff service on the registered agent listed with the secretary of state. Corporate landlords sometimes try to dodge service through on-site managers.",
      },
      {
        title: "Hearing",
        body:
          "Corporate defendants usually send a paralegal or attorney. Keep your case tight. Lead with the dollar amount, statute, and timeline. Bring printed exhibits.",
      },
    ],
    aftermath: {
      tag: "After you win",
      title: "Collecting from a corporate landlord.",
      bodyHtml:
        "Apartment complexes pay quickly because judgments hit corporate credit. They also fear repeat lawsuits if the violation is systemic. Save the docket. Other tenants in the same building can use your judgment as evidence in their own cases.",
    },
  },

  evidence: {
    h2: { pre: "What evidence do you need ", em: "against an apartment complex", post: "?" },
    lede:
      "Apartment complexes generate documents at every step. Use that against them.",
    cells: [
      {
        kind: "handbook",
        tag: "Lease clause (illegal)",
        documentTitle: "Avalon Mission Bay · Lease Section 14.2",
        sectionTitle: "Move-Out Cleaning Fee",
        bodyParagraphs: [
          "Tenant agrees to pay a flat $400 move-out cleaning fee deducted from the security deposit, regardless of unit condition.",
        ],
        highlight:
          "Cal. Civ. Code § 1950.5 prohibits flat non-refundable cleaning fees deducted from a security deposit.",
        footer: "Lease boilerplate · enforceability disputed",
      },
      {
        kind: "texts",
        tag: "Property manager",
        texts: [
          { dir: "in", text: "I never authorized a $400 cleaning fee." },
          { dir: "out", text: "It's in your lease. Section 14.2." },
          { dir: "in", text: "California Civ. Code 1950.5 limits that." },
        ],
      },
      {
        kind: "letter",
        tag: "Complaint to corporate",
        letterhead: "Tenant",
        date: "April 18, 2026",
        recipientName: "AvalonBay Communities Inc., Legal Department",
        reLine: "Demand for refund of unauthorized fees, Apt 4218",
        bodyParagraphs: [
          "Section 14.2 of your standard lease violates Cal. Civ. Code § 1950.5. The $400 flat cleaning fee plus $800 'carpet replacement' deduction were both wrongful.",
          "Refund $1,200 within 14 days. If not, I will file in Small Claims Court and request the matter be reviewed by your full portfolio.",
        ],
        signatory: "Tenant",
      },
      {
        kind: "receipt",
        tag: "Move-out statement",
        vendor: "AVALON MISSION BAY",
        vendorAddr: "Apt 4218 Move-out · SF, CA",
        receiptNum: "Statement #M-7821",
        date: "04/15/2026",
        lineItems: [
          { label: "Deposit refund", amount: "$300.00" },
          { label: "Cleaning fee (disputed)", amount: "-$400.00" },
          { label: "Carpet replacement (disputed)", amount: "-$800.00" },
        ],
        subtotal: "$300.00",
        total: "$300.00",
        footer: "Move-out statement · payment enclosed",
      },
    ],
  },

  defenses: {
    h2: { pre: "Common ", em: "defenses", post: " from corporate landlords." },
    lede:
      "Three defenses come up in apartment-complex cases. Two are weaker than they seem.",
    items: [
      {
        quote: "It's all in the lease.",
        pill: "Most common",
        rebuttal:
          "<strong>Rebuttal:</strong> lease terms cannot waive state law. Cleaning-fee schedules, automatic deductions, and 'as-is' clauses are unenforceable when state code limits charges. Cite the statute directly.",
      },
      {
        quote: "We followed the move-out checklist.",
        pill: "Procedural",
        rebuttal:
          "<strong>Rebuttal:</strong> a checklist does not authorize charges that exceed actual damages. Bring move-in walkthrough photos and ask for the contractor invoices the landlord used to set the charges.",
      },
      {
        quote: "Tenant signed acceptance.",
        pill: "Waiver",
        rebuttal:
          "<strong>Rebuttal:</strong> deposit waivers, mandatory-arbitration clauses, and 'final acceptance' forms are unenforceable in most states. Many state statutes specifically prohibit waiver. Read the statute carefully.",
      },
    ],
  },

  outcomes: {
    h2: { pre: "How much do tenants ", em: "actually win", post: " from apartment complexes?" },
    lede:
      "Apartment-complex cases settle faster and pay slightly more than mom-and-pop landlord cases because of corporate exposure.",
    bands: [
      {
        label: "Low",
        range: "$300 to $1,500",
        body:
          "<strong>Single claim, partial win.</strong> Some deposit recovery, some fees refunded. No multiplier.",
        tier: "low",
      },
      {
        label: "Mid",
        range: "$2,000 to $6,000",
        body:
          "<strong>Multi-claim with statutory multiplier.</strong> Deposit plus fees plus habitability, served by 2x or 3x state penalty.",
        tier: "mid",
      },
      {
        label: "High",
        range: "$7,000+",
        body:
          "<strong>Pattern violations or major safety failure.</strong> Building-wide deposit fraud, security failure leading to assault. Often moves to civil court or class action.",
        tier: "high",
      },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to suing your apartment complex?" },
    lede:
      "Three other paths. Apartment complexes respond to leverage that hits their corporate brand.",
    cards: [
      {
        title: "Online review pressure",
        pillLabel: "Free leverage",
        pillTier: "good",
        whenItFits:
          "you want a quick refund and the violation is moderate. Detailed Google and Yelp reviews often prompt corporate refunds within days.",
        tradeoff:
          "no statutory damages, no fees recovered. But fast and free.",
      },
      {
        title: "Small claims (recommended)",
        pillLabel: "Best for damages",
        pillTier: "primary",
        whenItFits:
          "you have multi-claim damages or want statutory multipliers. Apartment complexes settle once they see the cost of a hearing.",
        tradeoff:
          "30 to 90 day timeline. Filing fee around $50. Statutory damages and fee-shifting often available.",
      },
      {
        title: "State AG complaint",
        pillLabel: "Pattern violation",
        pillTier: "warn",
        whenItFits:
          "the same violation happens to many tenants in the same building or chain. State attorneys general open investigations into corporate landlords.",
        tradeoff:
          "longer timeline, no individual damages, but strong systemic remedies.",
      },
    ],
  },

  cta: {
    h2: { pre: "Recover from your ", em: "apartment complex", post: "." },
    body:
      "Corporate landlords settle quickly because lawsuits hit credit and reputation. The demand letter alone often gets results within the 14-day deadline. Generate yours in under two minutes.",
    receipt: {
      label: "example · multi-claim case",
      items: [
        { label: "Withheld deposit + fees", amount: "$1,800" },
        { label: "Statutory damages (2x)", amount: "+ $2,000" },
        { label: "Filing fee + interest", amount: "+ $400" },
      ],
      total: "$4,200",
      totalLabel: "Total claim",
      note: "Illustrative. Multi-claim cases against corporate landlords often settle for the demand amount.",
    },
  },

  faqs: [
    {
      q: "Can I sue my apartment complex?",
      a: "Yes. Apartment complexes are landlords under state law. You can sue them in small claims for the same things you can sue any landlord for: unreturned deposit, habitability failures, harassment, wrongful eviction. Name the legal entity, not just the building name.",
    },
    {
      q: "Who do you sue when an apartment complex is owned by an LLC?",
      a: "Name the property-owning LLC and the management company together. Find the registered agent in state-secretary records. Serve both. Apartment complexes often have separate ownership and management entities, and naming both prevents the case from being dismissed for the wrong defendant.",
    },
    {
      q: "How much can I sue my apartment complex for?",
      a: "Most multi-claim cases recover $2,000 to $6,000 in small claims. Pattern-violation cases or security-failure cases can be much higher and often move to civil court. Apartment complexes settle faster than mom-and-pop landlords because of corporate credit exposure.",
    },
    {
      q: "Can I sue my apartment complex for unauthorized fees?",
      a: "Yes. Cleaning fees, automatic move-out charges, and pet fees that exceed state caps are recoverable. Most state statutes specifically prohibit waiver, so a lease provision authorizing the fee does not save the landlord.",
    },
    {
      q: "Can I sue my apartment complex for a break-in?",
      a: "Sometimes, if a security failure caused or contributed to it. Broken locks, missing exterior-door security, malfunctioning intercoms, or security guards advertised but not provided can all support a negligence claim. The case is harder than a deposit case but can be much larger.",
    },
    {
      q: "Can I sue my apartment complex for broken amenities?",
      a: "Yes, if the lease or marketing promised them. Pool, gym, parking, package room, and concierge are all advertised amenities. If they are unavailable for an extended period, you can recover rent abatement for the affected period.",
    },
    {
      q: "Should I send the demand letter to corporate or the on-site manager?",
      a: "Both. Address the letter to the corporate registered agent (in state-secretary records) and copy the on-site manager. Corporate counsel usually settle faster than on-site staff because they have signing authority and legal-cost awareness.",
    },
  ],

  relatedSlugs: [
    "security-deposit",
    "wrongful-eviction",
    "unsafe-conditions",
    "harassment",
    "mold",
    "after-moving-out",
  ],
};

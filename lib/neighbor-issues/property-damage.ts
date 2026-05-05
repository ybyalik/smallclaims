import type { NeighborIssue } from "./types";

export const propertyDamage: NeighborIssue = {
  slug: "property-damage",
  ready: true,
  short: "Neighbor property damage",
  breadcrumbLabel: "Property Damage",

  meta: {
    title: "Can I Sue My Neighbor for Property Damage? Small Claims Guide",
    description:
      "Plain-English guide to suing a neighbor for damage to your property. Negligence and trespass to chattels, the homeowners-insurance route, and a demand-letter template.",
  },

  hero: {
    eyebrowSuffix: "Property damage",
    h1: { pre: "Can I sue my neighbor for ", em: "property damage", post: "?" },
    leadStrong: "Yes. Their homeowners insurance is usually the primary recovery.",
    leadBody:
      " A neighbor whose actions damaged your property is liable under negligence and trespass. The fastest recovery path is their homeowners liability insurance (every standard policy has it). The state DOI complaint process and small-claims court are backups when insurance fails. Most cases settle once the carrier sees a written demand and a repair estimate.",
  },

  counter: {
    amount: 4400,
    meta: "Negligence + homeowners insurance",
    rows: [
      { label: "Repair cost", value: "$3,200" },
      { label: "Replaced belongings", value: "+ $1,000", emphasis: "accent" },
      { label: "Filing fee + interest", value: "$200", emphasis: "muted" },
    ],
    footer: "Sample · within most state small-claims caps",
  },

  whatCounts: {
    h2: { pre: "What kinds of ", em: "neighbor property damage", post: " can you sue for?" },
    lede: "Four common patterns. Each is its own claim under negligence or trespass.",
    cards: [
      {
        num: "01",
        title: "Damage from negligence",
        body: "Neighbor's BBQ caught your fence on fire. Their broken sprinkler flooded your basement. Their kid's baseball broke your window. Negligence covers any damage from failure to use reasonable care.",
      },
      {
        num: "02",
        title: "Trespass to property",
        body: "Damage from going onto your property without permission, or from physically intruding (broken-off pieces of their fence ending up on your lawn, debris from their construction landing on your patio). Trespass is its own claim.",
      },
      {
        num: "03",
        title: "Damage to belongings outdoors",
        body: "Hit your parked car in the shared driveway, broke patio furniture during a dispute, damaged a fence or shed. Items outside your house are still your property.",
      },
      {
        num: "04",
        title: "Pet-caused damage",
        body: "Their dog dug up your lawn, scratched your door, killed your plants. Most state laws make pet owners strictly liable for property damage their animals cause, regardless of fault.",
      },
    ],
    note: {
      strongIntro: "Document immediately.",
      rest: " Photos of the damage with timestamps. The neighbor's insurance certificate (most homeowners HOA has it on file). A licensed contractor's repair estimate. The homeowners-policy claim is usually faster than court; small claims is for when insurance fails.",
    },
  },

  claim: {
    h2: { pre: "How much can you ", em: "recover", post: "?" },
    lede: "Repair cost is the floor. Replaced belongings, alternative-housing costs, and consequential damages stack on top.",
    layers: [
      {
        tag: "Layer 1",
        title: "Repair cost",
        body: "Quote from a licensed contractor (electrical, plumbing, fence, structural) for the cost to fix. Two estimates strengthen the case. Hidden damage requires a second-opinion inspection.",
        amount: "$3,200",
      },
      {
        tag: "Layer 2",
        title: "Replaced belongings and consequential damages",
        body: "Furniture, electronics, plants, fixtures damaged. Hotel costs if home was uninhabitable. Lost food from power outages. Save replacement-cost receipts.",
        amount: "+ $1,000",
        accent: true,
      },
      {
        tag: "Layer 3",
        title: "Filing fees, interest, expert reports",
        body: "Filing fee, service-of-process cost, pre-judgment interest. In rare cases, expert reports (structural engineer for foundation damage).",
        amount: "+ $200",
      },
    ],
    total: {
      label: "Sample total within small-claims cap",
      body: "Repair cost for a damaged fence and patio plus replaced furniture, plus filing fee.",
      amount: "$4,400",
      sublabel: "illustrative · varies by damage type",
    },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede: "Demand letters work especially well when copied to the neighbor's homeowners insurance carrier. The carrier wants to settle to avoid coverage litigation. Most claims resolve within 30 to 60 days.",
    checklist: [
      "Date and description of the damage",
      "Photos with timestamps",
      "Repair quote from a licensed contractor",
      "Replaced-belongings list with receipts",
      "Neighbor's homeowners carrier and policy number (often on HOA forms)",
      "A 14-day deadline before you file",
      "Sent certified mail with copy to the carrier",
    ],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3600",
      date: "May 5, 2026",
      recipientName: "Pat Neighbor",
      recipientAddress: "1424 Maple Lane, San Diego, CA 92101",
      reLine: "Demand for Damages, Fence and Patio Damage on April 14, 2026",
      bodyParagraphs: [
        "On April 14, 2026, your propane BBQ caught my wood fence on fire (photos and fire-department report attached). The fire spread to my patio furniture and damaged 30 feet of fence and a teak dining set.",
        "I obtained a quote from Coastal Fence Co. (license #38291) for $3,200 to replace the fence and a quote for $1,000 to replace the dining set. I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Reimbursement of <strong>$3,200</strong> in fence repair;",
        "Reimbursement of <strong>$1,000</strong> in replaced patio furniture.",
      ],
      closingLine: "Total demand: <strong>$4,200.00</strong>. Copy of this letter has been sent to your homeowners carrier (State Farm, policy 12345). If unresolved, I will file in Small Claims Court.",
      signatory: "Riley Q. Owner",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " a property-damage case." },
    lede: "Four steps. The insurance route resolves most cases before court.",
    steps: [
      { title: "File with the neighbor's homeowners carrier", body: "Get the policy info from the HOA, your real estate records, or by asking the neighbor directly. File a third-party claim with the carrier. Most settle within 30 to 60 days." },
      { title: "Get repair estimates", body: "Two written estimates from licensed contractors. Photos before any repair starts. The contractor's estimate is your damages figure at the hearing." },
      { title: "File and serve", body: "If carrier and demand do not resolve within 60 days, file in small claims. Filing fees usually run $30 to $100. File in the county where the property is located." },
      { title: "Hearing", body: "Lead with photos, the repair estimate, and the timeline of communications with the neighbor. Hearings usually run 10 to 15 minutes." },
    ],
    aftermath: {
      tag: "After you win",
      title: "Collecting from a neighbor.",
      bodyHtml: "Most cases pay through the neighbor&rsquo;s homeowners insurance. After 30 days post-judgment, the enforcement tools are a <strong>judgment lien</strong> on real estate (their house is the easiest target), a <strong>bank levy</strong>, and a <strong>writ of execution</strong> on personal property. Judgment liens against neighbors with mortgages often lead to fast settlement.",
    },
  },

  evidence: {
    h2: { pre: "What evidence do you need to ", em: "sue your neighbor", post: "?" },
    lede: "Cases like this turn on photos and the repair estimate. The certificate of insurance is the gateway to the fastest recovery.",
    cells: [
      {
        kind: "photos",
        tag: "Damage photos (dated)",
        photos: [
          { id: "1581094271901-8022df4466f9", cap: "Burned fence" },
          { id: "1556909114-f6e7ad7d3136", cap: "Damaged patio" },
          { id: "1581092335397-9583eb92d232", cap: "BBQ source" },
          { id: "1503602642458-232111445657", cap: "Property line" },
        ],
      },
      {
        kind: "letter",
        tag: "Repair estimate",
        letterhead: "Coastal Fence Co. · License #38291",
        date: "April 22, 2026",
        recipientName: "Riley Owner",
        reLine: "Quote · Fence replacement",
        bodyParagraphs: [
          "Scope: remove damaged 30 ft of cedar fence, install replacement to match existing, post repair as needed.",
          "Total: $3,200. Estimated 4 working days. Materials and labor included.",
        ],
        signatory: "T. Romero",
        signatoryTitle: "Project Manager",
      },
      {
        kind: "texts",
        tag: "Notice to neighbor",
        texts: [
          { dir: "out", text: "Pat — your BBQ caught my fence on fire. Fire dept came. Need to talk." },
          { dir: "in", text: "Sorry, didn't realize. Insurance should cover it." },
          { dir: "out", text: "Need your carrier info. Sending photos and a quote tomorrow." },
        ],
      },
      {
        kind: "receipt",
        tag: "Replaced furniture",
        vendor: "WEST ELM",
        vendorAddr: "Replacement order",
        receiptNum: "Order #82218",
        date: "04/22/2026",
        lineItems: [
          { label: "Teak dining table", amount: "$700.00" },
          { label: "Dining chairs (4)", amount: "$300.00" },
        ],
        subtotal: "$1,000.00",
        total: "$1,000.00",
        footer: "Replacement-cost basis · originals destroyed",
      },
    ],
  },

  defenses: {
    h2: { pre: "Common neighbor ", em: "defenses", post: ", with rebuttals." },
    lede: "Three arguments cover most property-damage cases.",
    items: [
      { quote: "It was an accident. I'm not responsible.", pill: "Most common", rebuttal: "<strong>Rebuttal:</strong> negligence does not require intent. Failure to use reasonable care (placing the BBQ too close to the fence, failing to extinguish coals, leaving sprinklers running) is enough. The standard is what a reasonable neighbor would have done." },
      { quote: "The damage was preexisting.", pill: "Preexisting", rebuttal: "<strong>Rebuttal:</strong> bring date-stamped photos before the incident. Most modern phones embed timestamps automatically. Without proof of preexisting damage, the timing of the new damage is decisive." },
      { quote: "Our standard fence is partially yours, so we share the cost.", pill: "Shared property", rebuttal: "<strong>Rebuttal:</strong> shared boundary fences have specific state laws (CA Civ. Code § 841 partition fence). Routine maintenance is shared; damage from negligence is not. The neighbor pays for damage they caused." },
    ],
  },

  outcomes: {
    h2: { pre: "How much do owners ", em: "actually recover", post: "?" },
    lede: "Typical recovery ranges. The insurance route usually pays full repair plus reasonable belongings.",
    bands: [
      { label: "Low", range: "$300 to $1,500", body: "<strong>Cosmetic only.</strong> Court awards body shop estimate for surface damage.", tier: "low" },
      { label: "Mid", range: "$1,500 to $5,000", body: "<strong>Repair plus belongings.</strong> Most common when documentation is clean.", tier: "mid" },
      { label: "High", range: "$5,000 to $20,000+", body: "<strong>Major damage.</strong> Fire damage, foundation damage, or structural issues push recovery to the cap.", tier: "high" },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede: "Insurance is usually the fastest path.",
    cards: [
      { title: "Neighbor's homeowners insurance", pillLabel: "Free, fast, biggest payer", pillTier: "primary", whenItFits: "every standard homeowners policy has liability coverage for damage to other property. File a third-party claim using the policy info.", tradeoff: "small claims for when carrier denies." },
      { title: "Your homeowners insurance", pillLabel: "Quick, partial", pillTier: "good", whenItFits: "you need fast repair. Your carrier pays you and pursues subrogation against the neighbor's carrier.", tradeoff: "deductible costs you out of pocket. May affect your premium." },
      { title: "Small claims (this guide)", pillLabel: "When insurance fails", pillTier: "warn", whenItFits: "neighbor has no insurance, the carrier denied, or the resolution was inadequate.", tradeoff: "30 to 90 day timeline. Filing fee $30 to $100." },
    ],
  },

  cta: {
    h2: { pre: "Recover the ", em: "repair cost", post: "." },
    body: "Demand letters work fast when copied to the homeowners carrier. Our generator builds yours in under two minutes.",
    receipt: {
      label: "example · BBQ fire damaged fence",
      items: [
        { label: "Fence repair", amount: "$3,200" },
        { label: "Replaced furniture", amount: "+ $1,000" },
        { label: "Filing fee + interest", amount: "+ $200" },
      ],
      total: "$4,400",
      totalLabel: "Total claim",
      note: "Illustrative. Major fire or flood damage pushes higher.",
    },
  },

  faqs: [
    { q: "Does my neighbor's homeowners insurance cover damage to my property?", a: "Yes, every standard homeowners policy includes liability coverage for damage the policyholder causes to others' property. Policy limits are usually $100,000 to $500,000. File a third-party claim with the carrier using the policy info from your HOA, real-estate records, or directly from the neighbor." },
    { q: "What if my neighbor doesn't have insurance?", a: "Recovery is limited to the neighbor's personal assets. Most homeowners do have insurance because mortgages require it. If they don't, file directly in small claims and pursue judgment liens against their property." },
    { q: "How do I prove the damage was preexisting?", a: "Date-stamped photos of the area before the damage. Most modern phones embed timestamps automatically. Repair-shop reports often distinguish new damage from old. Witness statements from neighbors or contractors who saw the area before help." },
    { q: "Can I sue for the time I spent dealing with this?", a: "Generally no. Personal time is rarely compensable. But documented lost wages from missed work (e.g., to attend the hearing or supervise repairs) are sometimes recoverable." },
    { q: "How long do I have to sue?", a: "Property damage claims usually run 2 to 4 years from the date of damage. Negligence and trespass claims often have shorter windows. Move fast." },
    { q: "What if my neighbor's pet caused the damage?", a: "Most state laws make pet owners strictly liable for property damage. The owner pays regardless of fault. Document with photos and (for dog cases) a description of the breed and the owner's address." },
    { q: "Should I just talk to my neighbor first?", a: "Yes. Many cases settle informally. But document the conversation in writing afterward (text or email summarizing what was agreed). If informal resolution fails, the demand letter is the next step." },
  ],

  relatedSlugs: ["dead-tree-fell", "tree-encroachment", "noise", "harassment", "water-runoff", "construction-damage"],
};

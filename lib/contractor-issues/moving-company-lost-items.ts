import type { ContractorIssue } from "./types";

export const movingCompanyLostItems: ContractorIssue = {
  slug: "moving-company-lost-items",
  ready: true,
  short: "Moving company lost items",
  breadcrumbLabel: "Moving Company Lost Items",

  meta: {
    title: "Can I Sue a Moving Company for Lost Items? Small Claims Guide",
    description:
      "Plain-English guide to recovering when a moving company lost or stole items. Inventory list rules, valuation method math, FMCSA complaints, and a demand-letter template.",
  },

  hero: {
    eyebrowSuffix: "Moving company lost items",
    h1: { pre: "Can I sue a moving company for ", em: "lost items", post: "?" },
    leadStrong: "Yes. The inventory list is your central evidence.",
    leadBody:
      " A moving company that did not deliver items they accepted at origin is liable for loss. The recoverable amount depends on your valuation election on the bill of lading: released-value (60 cents per pound) or full-value (replacement cost). The inventory list at origin establishes what they took. Photos of high-value items, declared-value lists, and the BOL are your evidence. Federal interstate moves are governed by the Carmack Amendment.",
  },

  counter: {
    amount: 4500,
    meta: "Carmack Amendment / state moving law",
    rows: [
      { label: "Lost items (full-value)", value: "$4,000" },
      { label: "High-value declaration items", value: "+ $300", emphasis: "accent" },
      { label: "Filing fee + interest", value: "$200", emphasis: "muted" },
    ],
    footer: "Sample · within most state small-claims caps",
  },

  whatCounts: {
    h2: { pre: "What kinds of ", em: "loss claims", post: " can you bring?" },
    lede:
      "Four common patterns. Each is its own claim. The inventory list and valuation election determine the math.",
    cards: [
      {
        num: "01",
        title: "Items not delivered (full loss)",
        body:
          "Items checked off on the inventory list at origin but missing at destination. Whether stolen, lost, or misdelivered, the carrier is liable. Recovery is per your valuation election: released-value or full-value.",
      },
      {
        num: "02",
        title: "Boxes not delivered",
        body:
          "Carriers count boxes at origin and at destination. Missing boxes are recoverable based on what was inside. Inventory lists at the box level help; many carriers do not itemize box contents.",
      },
      {
        num: "03",
        title: "High-value items lost",
        body:
          "Federal regulations let carriers limit liability on items over $100 per pound (jewelry, art, electronics) unless declared in writing on a high-value inventory. If you declared, full-value applies. If you did not, the carrier is responsible only up to your overall valuation method.",
      },
      {
        num: "04",
        title: "Items damaged so badly they are unusable (constructive total loss)",
        body:
          "When repair cost exceeds replacement cost, the carrier owes replacement instead of repair. This is constructive total loss. Photos of the damage plus replacement quotes establish the basis.",
      },
    ],
    note: {
      strongIntro: "Inventory list at origin is the spine.",
      rest:
        " The driver and you both sign the inventory at pickup. It establishes what the carrier took and the condition. At delivery, check off each item against the list. Note missing or damaged items on the inventory before signing for delivery. Once you sign for delivery without exceptions, claims become harder.",
    },
  },

  claim: {
    h2: { pre: "How much can you ", em: "recover", post: "?" },
    lede:
      "Released-value vs. full-value election determines the math. Full-value protection produces near-replacement cost; released-value caps recovery at 60 cents per pound.",
    layers: [
      {
        tag: "Layer 1",
        title: "Lost items (per valuation method)",
        body:
          "Full-value: replacement cost or repair, whichever is less. Released-value: 60 cents per pound. State-law moves: state-specific rules. Bring replacement quotes from current retailers.",
        amount: "$4,000",
      },
      {
        tag: "Layer 2",
        title: "Declared high-value items",
        body:
          "Items listed on the high-value declaration are protected up to declared value. If you declared a $2,000 watch and it is missing, $2,000 is recoverable separately from the overall valuation cap.",
        amount: "+ $300",
        accent: true,
      },
      {
        tag: "Layer 3",
        title: "Filing fees, interest, alternative housing",
        body:
          "Filing fee, service-of-process cost, and pre-judgment interest at your state's legal rate. Reasonable temporary replacement costs (e.g., bedding while you wait for replacement bed).",
        amount: "+ $200",
      },
    ],
    total: {
      label: "Sample total under full-value protection",
      body:
        "Replacement cost for lost dining set, lost computer, and lost art, plus declared-value watch, plus filing fee.",
      amount: "$4,500",
      sublabel: "illustrative · varies by valuation method and contents",
    },
  },

  demand: {
    h2: { pre: "File a ", em: "claim with the carrier first", post: "." },
    lede:
      "The carrier's claim process is required by federal law for interstate moves and by state regulation for local. File there first with the inventory list, photos, and replacement quotes. If they deny or undervalue, the demand letter and small-claims complaint follow.",
    checklist: [
      "Bill of lading with valuation method",
      "Inventory list signed at origin and delivery (with exceptions noted)",
      "High-value declaration if applicable",
      "Photos of high-value items before move",
      "Replacement-cost quotes from current retailers",
      "Concealed-loss notice within 30 to 60 days for late discoveries",
      "A 30-day deadline before you file in small claims",
    ],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3590",
      date: "May 5, 2026",
      recipientName: "Apex Movers LLC",
      recipientAddress: "850 Industrial Way, Seattle, WA 98101",
      reLine: "Demand for Damages, Move Dated April 8, 2026, Order #4218",
      bodyParagraphs: [
        "On April 8, 2026, you completed our move from Seattle to Portland for $5,200. We selected full-value protection (BOL line 22, declared $8,000). At unloading, four numbered boxes were missing per the inventory list and a high-value-declared dining set was reduced to one chair (originally six).",
        "I filed claim #2026-1182 with your office on April 11. As of today (24 days later), no resolution has been offered. Replacement-cost quotes (attached): dining set $2,800, missing boxes contents $1,200, declared antique watch $300. I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Reimbursement of <strong>$4,000</strong> in cargo loss (full-value protection);",
        "Reimbursement of <strong>$300</strong> in declared high-value loss.",
      ],
      closingLine:
        "Total demand: <strong>$4,300.00</strong>. If unresolved, I will file in Small Claims Court and report your handling to the FMCSA (interstate) or Washington UTC.",
      signatory: "Sage Q. Customer",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " a moving-loss case." },
    lede:
      "Four steps. The inventory list is the centerpiece. Without it, claims are very hard to win.",
    steps: [
      {
        title: "File a written claim with the mover",
        body:
          "Federal interstate moves require carriers to acknowledge in 30 days and resolve in 120. State moves vary. File in writing with the BOL, inventory list, photos, and replacement quotes. The carrier has to respond.",
      },
      {
        title: "File regulatory complaints",
        body:
          "Interstate: FMCSA at fmcsa.dot.gov/protect-your-move. State PUC for intrastate. Better Business Bureau as added pressure. The regulator can fine the carrier and pull authority.",
      },
      {
        title: "File in small claims",
        body:
          "If carrier and regulator do not resolve within 90 days, file. Filing fees usually run $30 to $100. File in the destination county.",
      },
      {
        title: "Hearing",
        body:
          "Lead with the inventory list (signed at origin), the BOL showing valuation, photos of high-value items, and replacement quotes. Hearings usually run 10 to 15 minutes.",
      },
    ],
    aftermath: {
      tag: "After you win",
      title: "Collecting from a mover.",
      bodyHtml:
        "Movers carry liability insurance. After judgment, you can present it to the carrier. After 30 days post-judgment, the enforcement tools are a <strong>judgment lien</strong> on real estate, a <strong>bank levy</strong>, and a <strong>writ of execution</strong> on trucks or accounts receivable.",
    },
  },

  evidence: {
    h2: { pre: "What evidence do you need to ", em: "sue a mover", post: "?" },
    lede:
      "The inventory list is the spine. Without one signed at both origin and delivery, claims are very hard.",
    cells: [
      {
        kind: "letter",
        tag: "Bill of Lading",
        letterhead: "Apex Movers LLC · USDOT 2918374",
        date: "April 8, 2026",
        recipientName: "Sage Customer",
        reLine: "BOL #4218 · Seattle to Portland",
        bodyParagraphs: [
          "Total weight: 7,200 lbs. Total cost: $5,200.",
          "Valuation method (line 22): FULL-VALUE PROTECTION at $1.10 per pound declared. Total declared value: $7,920.",
        ],
        signatory: "M. Vega",
        signatoryTitle: "Driver, USDOT 2918374",
      },
      {
        kind: "handbook",
        tag: "Inventory list (signed)",
        documentTitle: "Apex Movers · Inventory List",
        sectionTitle: "Origin Signed 04/08/2026",
        bodyParagraphs: [
          "Items 1-118 listed by category and condition. All items signed off as 'good condition' by driver and customer at origin pickup.",
          "Items at delivery: 1-114 received. Items 49, 73, 88, 102 missing. Six-piece dining set: only one chair received.",
        ],
        highlight:
          "Driver signature confirms 118 items at origin. Customer documented 4 missing boxes at delivery.",
        footer: "Inventory exceptions noted before signing for delivery",
      },
      {
        kind: "photos",
        tag: "High-value items (pre-move)",
        photos: [
          { id: "1581094271901-8022df4466f9", cap: "Dining set (6 chairs)" },
          { id: "1556909114-f6e7ad7d3136", cap: "Antique watch (declared)" },
          { id: "1581092335397-9583eb92d232", cap: "Computer setup" },
          { id: "1503602642458-232111445657", cap: "Art (declared)" },
        ],
      },
      {
        kind: "receipt",
        tag: "Replacement quotes",
        vendor: "WEST ELM + PORTLAND TECH",
        vendorAddr: "Replacement quotes from current retailers",
        receiptNum: "Combined estimate",
        date: "04/22/2026",
        lineItems: [
          { label: "Dining set 6-piece replacement", amount: "$2,800.00" },
          { label: "Computer (lost in transit)", amount: "$900.00" },
          { label: "Misc. box contents (clothing, books)", amount: "$300.00" },
        ],
        subtotal: "$4,000.00",
        total: "$4,000.00",
        footer: "Replacement-cost basis · two stores quoted",
      },
    ],
  },

  defenses: {
    h2: { pre: "Common mover ", em: "defenses", post: ", with rebuttals." },
    lede:
      "Three arguments cover most loss cases. The inventory list shuts down most of them.",
    items: [
      {
        quote: "You did not declare those items.",
        pill: "Most common",
        rebuttal:
          "<strong>Rebuttal:</strong> bring the high-value declaration if applicable. Items not on the high-value list are still covered up to your overall valuation election (full-value or released-value). 'Did not declare' only applies to limiting high-value liability above $100 per pound, not to denying coverage entirely.",
      },
      {
        quote: "You signed off at delivery without exception.",
        pill: "Acceptance",
        rebuttal:
          "<strong>Rebuttal:</strong> bring your inventory list with exceptions noted. Concealed-loss claims (items in sealed boxes you cannot inspect at delivery) are allowed for 30 to 60 days after delivery in most jurisdictions. File the concealed-loss notice in writing as soon as you find missing items.",
      },
      {
        quote: "We delivered everything to the destination.",
        pill: "Delivery",
        rebuttal:
          "<strong>Rebuttal:</strong> the inventory list at delivery (with your noted exceptions) shows what was actually delivered. The driver's signature confirming items 1 to 114 received means 4 are not. The original inventory at origin establishes what they had.",
      },
    ],
  },

  outcomes: {
    h2: { pre: "How much do consumers ", em: "actually win", post: "?" },
    lede:
      "Typical recovery in moving-loss cases. Full-value protection cases recover replacement; released-value cases are usually too small for small claims.",
    bands: [
      {
        label: "Low",
        range: "$200 to $1,500",
        body:
          "<strong>Released-value or partial.</strong> 60 cents per pound caps recovery. Court awards what the BOL controls.",
        tier: "low",
      },
      {
        label: "Mid",
        range: "$1,500 to $5,000",
        body:
          "<strong>Full-value cargo plus declared-value items.</strong> Most common when full-value was elected and inventory documents the loss.",
        tier: "mid",
      },
      {
        label: "High",
        range: "$5,000 to $20,000+",
        body:
          "<strong>Major loss cases.</strong> High-value declared items missing, plus significant general loss. Cases beyond the cap need higher courts.",
        tier: "high",
      },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede:
      "Moving cases have specific regulatory paths. Use them before court.",
    cards: [
      {
        title: "FMCSA / State PUC",
        pillLabel: "Free, regulatory",
        pillTier: "primary",
        whenItFits:
          "interstate (FMCSA) or intrastate (state PUC). Federal: file at fmcsa.dot.gov/protect-your-move. Regulators investigate, fine carriers, and pull authority.",
        tradeoff:
          "regulators do not always order restitution. Threat is often more effective than outcome.",
      },
      {
        title: "Carrier's claim department",
        pillLabel: "Required first step",
        pillTier: "good",
        whenItFits:
          "always. Federal interstate: 30-day acknowledgment, 120-day resolution. State moves vary. Most carriers settle reasonable claims to avoid regulatory complaints.",
        tradeoff:
          "carriers often offer below-market settlement. Push back with replacement quotes.",
      },
      {
        title: "Small claims (this guide)",
        pillLabel: "When the carrier denies",
        pillTier: "warn",
        whenItFits:
          "the carrier did not resolve within 90 days, or offered an inadequate settlement. Damages within your state's cap.",
        tradeoff:
          "30 to 90 day timeline. Filing fee $30 to $100. Carmack preemption may apply.",
      },
    ],
  },

  cta: {
    h2: { pre: "Recover the ", em: "lost items", post: "." },
    body:
      "Loss demand letters work fast when paired with the inventory list and replacement quotes. FMCSA or state PUC complaints add pressure. Our generator builds yours in under two minutes.",
    receipt: {
      label: "example · full-value loss",
      items: [
        { label: "Cargo loss (full-value)", amount: "$4,000" },
        { label: "Declared high-value items", amount: "+ $300" },
        { label: "Filing fee + interest", amount: "+ $200" },
      ],
      total: "$4,500",
      totalLabel: "Total claim",
      note: "Illustrative. High-value declaration items push recovery above the per-pound cap.",
    },
  },

  faqs: [
    {
      q: "What is the inventory list and why is it so important?",
      a: "A list of every item the carrier accepts at origin, signed by both the driver and the customer. It establishes what the carrier took and the condition. At delivery, you check off each item; missing items are documented as exceptions. Without an inventory list signed at both origin and delivery, loss claims are very hard to win.",
    },
    {
      q: "What is a high-value declaration?",
      a: "Federal regulations let carriers limit liability on items worth more than $100 per pound (jewelry, art, electronics) unless declared in writing on a high-value inventory. If you do not declare, recovery on those items is capped at the per-pound rate. Declaration is usually free; just ask the carrier for the form before pickup.",
    },
    {
      q: "How long do I have to file a loss claim?",
      a: "Federal interstate: 9 months from delivery to file with the carrier, then 2 years from claim denial to file in court. State law varies but most states allow 1 to 4 years. File the claim with the carrier first; you usually cannot sue until they deny or fail to respond.",
    },
    {
      q: "What if items are missing from sealed boxes I packed myself?",
      a: "Concealed-loss claims (items in sealed boxes you cannot inspect at delivery) are allowed for 30 to 60 days after delivery in most jurisdictions. Notify in writing as soon as you find missing items. Photos of high-value items before packing help, even though you packed.",
    },
    {
      q: "Can the mover claim items were 'lost' but really stolen?",
      a: "Carriers are liable regardless of cause. Loss is loss whether by theft, misdelivery, or genuine misplacement. The carrier owes the value (per your valuation election) for any item they accepted but did not deliver. Theft can also trigger separate criminal investigation.",
    },
    {
      q: "What if I cannot prove what was in a missing box?",
      a: "Box-level inventory matters. If you can document what was in each box (photos, lists provided to carrier), recovery is straightforward. Without box-level documentation, courts often estimate reasonable contents based on size and weight. Reasonable estimates of clothing, books, or kitchenware are usually accepted.",
    },
    {
      q: "Can I sue if the move was a 'broker' and not a direct carrier?",
      a: "Yes, but identify the right defendant. Brokers and carriers have different liabilities. The bill of lading shows the actual carrier's USDOT number. The broker may also be liable for breach of contract, but the carrier holds the cargo liability. Sue both if the BOL identifies separate broker and carrier.",
    },
  ],

  relatedSlugs: [
    "moving-company-damage",
    "deposit-and-disappearing",
    "damaged-house",
    "poor-workmanship",
    "unfinished-work",
    "painter-damage",
  ],
};

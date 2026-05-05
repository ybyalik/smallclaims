import type { ContractorIssue } from "./types";

export const depositAndDisappearing: ContractorIssue = {
  slug: "deposit-and-disappearing",
  ready: true,
  short: "Deposit and disappeared",
  breadcrumbLabel: "Deposit and Disappeared",

  meta: {
    title: "Can I Sue a Contractor for Taking My Deposit and Disappearing?",
    description:
      "Plain-English guide to recovering a deposit when a contractor took your money and never came back. Three pressure points (bond claim, contractor board complaint, small claims) and a demand-letter template that gets a response.",
  },

  hero: {
    eyebrowSuffix: "Deposit and disappeared",
    h1: { pre: "Can I sue a contractor for ", em: "taking a deposit and disappearing", post: "?" },
    leadStrong: "Yes, and you have three ways to get your money back.",
    leadBody:
      " A contractor who took a deposit and never showed up has committed breach of contract, and in many states it can also be theft. The fastest recovery usually does not start in court. It starts with a complaint to your state's contractor licensing board, a claim against the contractor's bond, and (if those fail) a small-claims case. If the contractor was unlicensed, most states let you recover every dollar you paid, no matter the work performed.",
  },

  counter: {
    amount: 6500,
    meta: "Breach + unlicensed-contractor recovery",
    rows: [
      { label: "Deposit paid", value: "$5,000" },
      { label: "Cost to find new contractor", value: "+ $1,200", emphasis: "accent" },
      { label: "Filing fee + interest", value: "$300", emphasis: "muted" },
    ],
    footer: "Sample · within most state small-claims caps",
  },

  whatCounts: {
    h2: { pre: "When can you sue a ", em: "vanishing contractor", post: "?" },
    lede:
      "Four scenarios cover almost every deposit-and-disappear case. Each one is its own legal claim. Most cases stack two or three.",
    cards: [
      {
        num: "01",
        title: "Took the money, never started",
        body:
          "Cleanest case. You paid a deposit, the contractor agreed to start by a date, the date passed and no work began. This is straightforward breach of contract, and in many states it crosses into theft when the contractor never intended to perform.",
      },
      {
        num: "02",
        title: "Started, then walked off",
        body:
          "Some demolition or rough work was done, then the contractor stopped responding. You owe the value of any actual work completed (judges call this 'quantum meruit'). They owe back the rest of the deposit and any cost difference to finish.",
      },
      {
        num: "03",
        title: "Unlicensed contractor",
        body:
          "Most states require licenses for jobs above a dollar threshold (California: $500. Florida: many trades. Texas: some trades.) An unlicensed contractor cannot enforce the contract, cannot sue you for payment, and in some states (California Bus & Prof Code § 7031) you can recover every dollar you paid, regardless of the work performed.",
      },
      {
        num: "04",
        title: "Excessive deposit",
        body:
          "Many states cap deposits. California: 10 percent of the contract or $1,000, whichever is less, on home-improvement contracts. New York: 50 percent on small jobs. Connecticut: 33 percent. If the contractor took more than your state allows, the excess is recoverable on top of any other claim.",
      },
    ],
    note: {
      strongIntro: "Three pressure points before you file.",
      rest:
        " (1) State contractor licensing board complaint (CSLB in California, DBPR in Florida) often triggers an investigation that ends with the contractor refunding to keep their license. (2) Bond claim against the contractor's surety bond, if licensed. (3) Better Business Bureau complaint as added pressure. Then small claims if needed.",
    },
  },

  claim: {
    h2: { pre: "How much can you ", em: "recover", post: "?" },
    lede:
      "Your deposit is the floor. The cost to finish the job and any cost difference for a new contractor stack on top. Unlicensed-contractor cases are the highest-recovery cases.",
    layers: [
      {
        tag: "Layer 1",
        title: "Deposit paid",
        body:
          "The full deposit, minus the value of any work actually completed (judges call this quantum meruit). If no work was done, you get the entire deposit back.",
        amount: "$5,000",
      },
      {
        tag: "Layer 2",
        title: "Cost to finish or fix",
        body:
          "The price difference between what you paid the original contractor and what a new contractor charges to finish the job. Bring quotes from at least two replacement contractors. Judges award the average.",
        amount: "+ $1,200",
        accent: true,
      },
      {
        tag: "Layer 3",
        title: "Filing fees, statutory damages, interest",
        body:
          "Filing fee, service-of-process cost, and pre-judgment interest at your state's legal rate. If the contractor was unlicensed, many states authorize recovery of all amounts paid plus statutory penalties.",
        amount: "+ $300",
      },
    ],
    total: {
      label: "Sample total within small-claims cap",
      body:
        "Full $5,000 deposit recovered, plus $1,200 cost difference for a new contractor, plus filing fee.",
      amount: "$6,500",
      sublabel: "illustrative · varies by state and licensing status",
    },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede:
      "Demand letters work especially well in contractor cases. The contractor knows that a contractor-board complaint can pull their license, and that an unlicensed-contractor case can recover every dollar you paid. Most contractors respond within a week, even ones who have been ignoring you for months.",
    checklist: [
      "Date and amount of the deposit",
      "What the contractor was supposed to do (and by when)",
      "What actually happened (or did not happen)",
      "Their license number (or note that they are unlicensed)",
      "Statutes you are relying on (state contractor licensing law, deposit cap)",
      "A 14-day deadline before you file the complaint",
      "Sent certified mail with return receipt",
    ],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3580",
      date: "May 5, 2026",
      recipientName: "Apex Construction Services",
      recipientAddress: "4400 Industrial Way, Sacramento, CA 95824",
      reLine: "Demand for Refund, Kitchen Remodel Contract Dated February 14, 2026",
      bodyParagraphs: [
        "On February 14, 2026, you signed a contract to remodel my kitchen for $25,000. I paid a $5,000 deposit the same day. Work was to begin March 1. As of today, no work has been performed and you have not responded to ten calls and seven emails since March 4.",
        "Per <strong>California Bus & Prof Code § 7159</strong>, the deposit on a home-improvement contract may not exceed 10 percent or $1,000, whichever is less. The $5,000 deposit was already excessive by $4,000. I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Refund of the full <strong>$5,000</strong> deposit;",
        "Reimbursement of <strong>$1,200</strong> in cost-difference quotes from replacement contractors (attached).",
      ],
      closingLine:
        "Total demand: <strong>$6,200.00</strong>. If unresolved, I will file a complaint with the Contractors State License Board, claim against your surety bond, and file in Small Claims Court.",
      signatory: "Jordan A. Homeowner",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " a small-claims case against a contractor." },
    lede:
      "Four steps. Most plaintiffs do this without a lawyer. The contractor-board complaint runs in parallel and is usually the bigger hammer.",
    steps: [
      {
        title: "File a contractor-board complaint first",
        body:
          "California: Contractors State License Board (cslb.ca.gov). Florida: Department of Business and Professional Regulation. Each state has one. Online filing is free. The board can pull the license, freeze the bond, and order restitution. Many contractors settle the moment they get the board's letter.",
      },
      {
        title: "Claim against the bond",
        body:
          "Licensed contractors carry a surety bond ($25,000 in California for home improvement). File a claim with the bonding company, naming the contractor and the project. The bond pays out before the contractor's other creditors. File before the contractor goes bankrupt or the bond is exhausted by other claimants.",
      },
      {
        title: "File in small claims",
        body:
          "If the board complaint and bond claim do not produce a refund within 60 days, file. Filing fees usually run $30 to $100. File in the county where the work was to be performed, or where the contractor's main office is located.",
      },
      {
        title: "Serve and hear",
        body:
          "Sheriff, certified mail through the clerk, or a private process server. Lead the hearing with the contract, the deposit receipt, and the timeline. If the contractor was unlicensed, cite the recovery statute by section. Hearings usually run 10 to 15 minutes.",
      },
    ],
    aftermath: {
      tag: "After you win",
      title: "Collecting from a vanishing contractor.",
      bodyHtml:
        "Vanishing contractors are often hard to collect from because they may be insolvent. The bond claim is the most reliable source of payment. After judgment, the enforcement tools are a <strong>judgment lien</strong> on any real estate the contractor owns, a <strong>bank levy</strong> on a business or personal account if you can identify it, and a <strong>writ of execution</strong> on tools, vehicles, or accounts receivable. A judgment also stays on the contractor's credit report and can block license renewal in many states.",
    },
  },

  evidence: {
    h2: { pre: "What evidence do you need to ", em: "sue a contractor", post: "?" },
    lede:
      "Cases like this are won on the contract, the deposit receipt, and proof the contractor stopped responding. Replacement-contractor quotes establish your damages.",
    cells: [
      {
        kind: "letter",
        tag: "The contract",
        letterhead: "Apex Construction Services · License #1029384",
        date: "February 14, 2026",
        recipientName: "Jordan A. Homeowner",
        recipientAddress: "1422 Cherry Lane, Sacramento, CA",
        reLine: "Kitchen Remodel · Contract #4218",
        bodyParagraphs: [
          "Scope: full kitchen remodel including cabinets, countertops, electrical, plumbing rough, and tile. Total contract: $25,000. Deposit: $5,000 due at signing.",
          "Start date: March 1, 2026. Estimated completion: April 30, 2026.",
        ],
        signatory: "Marcus Vega",
        signatoryTitle: "Owner, Apex Construction Services",
      },
      {
        kind: "texts",
        tag: "Going dark",
        texts: [
          { dir: "out", text: "Hi Marcus, just confirming you start tomorrow." },
          { dir: "out", text: "Marcus? It's been 4 days. Please respond." },
          { dir: "out", text: "I've called 10 times. If I don't hear back I'm filing with the CSLB." },
        ],
      },
      {
        kind: "handbook",
        tag: "Deposit cap statute",
        documentTitle: "California Bus & Prof Code · § 7159(d)",
        sectionTitle: "Down-payment limits",
        bodyParagraphs: [
          "On a home-improvement contract, the down payment shall not exceed one thousand dollars ($1,000) or 10 percent of the contract price, whichever is less.",
        ],
        highlight:
          "$5,000 deposit on a $25,000 contract is $1,500 over the legal cap.",
        footer: "Excess is recoverable separately from breach damages",
      },
      {
        kind: "receipt",
        tag: "Deposit paid",
        vendor: "APEX CONSTRUCTION SERVICES",
        vendorAddr: "License #1029384 · Sacramento, CA",
        receiptNum: "Invoice #4218",
        date: "02/14/2026",
        lineItems: [
          { label: "Kitchen remodel deposit", amount: "$5,000.00" },
          { label: "Permit allowance (refundable)", amount: "$0.00" },
        ],
        subtotal: "$5,000.00",
        total: "$5,000.00",
        footer: "Wire transfer · receipt for homeowner records",
      },
    ],
  },

  defenses: {
    h2: { pre: "Common contractor ", em: "defenses", post: ", with rebuttals." },
    lede:
      "Three arguments cover most vanishing-contractor cases at the hearing. Each has a clean rebuttal if your paperwork is in order.",
    items: [
      {
        quote: "We did some work. The deposit covered our costs.",
        pill: "Most common",
        rebuttal:
          "<strong>Rebuttal:</strong> ask for itemized documentation of the work and costs. Demolition photos, materials receipts dated within the contract window, subcontractor invoices. If they cannot produce dated proof, the 'we did work' defense fails. Even if some work was done, you owe only its fair value (quantum meruit), not the entire deposit.",
      },
      {
        quote: "You changed the scope. We were waiting for clarification.",
        pill: "Scope creep",
        rebuttal:
          "<strong>Rebuttal:</strong> bring all written communications. If you never asked for a change, the defense fails. If you did, ask for the written change order they should have produced. Most state contractor laws require change orders in writing, signed by both parties, before any added work or delay.",
      },
      {
        quote: "We never had a written contract for that scope.",
        pill: "No contract",
        rebuttal:
          "<strong>Rebuttal:</strong> the deposit receipt, your texts about the project, and the materials list are evidence of an oral contract. Most states recognize oral contracts for home improvement up to a dollar threshold. Some states require home-improvement contracts to be in writing (California: over $500); if the contractor failed to put it in writing, that is their violation, not yours, and many states penalize the contractor for that failure.",
      },
    ],
  },

  outcomes: {
    h2: { pre: "How much do homeowners ", em: "actually win", post: "?" },
    lede:
      "Typical recovery in deposit-and-disappear small-claims cases. Strength depends on documentation and whether the contractor is licensed.",
    bands: [
      {
        label: "Low",
        range: "$500 to $2,500",
        body:
          "<strong>Partial deposit recovered.</strong> Common when some work was done and the court awards quantum meruit value to the contractor. Also when documentation is light.",
        tier: "low",
      },
      {
        label: "Mid",
        range: "$2,500 to $8,000",
        body:
          "<strong>Full deposit plus partial cost difference.</strong> Most common when no real work was done and replacement-contractor quotes are clean.",
        tier: "mid",
      },
      {
        label: "High",
        range: "$8,000 to $20,000+",
        body:
          "<strong>Cap-of-the-court awards.</strong> Unlicensed-contractor recovery cases (every dollar paid back), excessive-deposit cases with statutory penalties, and cases where the cost-to-finish difference is substantial.",
        tier: "high",
      },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede:
      "Contractor cases have unusually strong out-of-court options. Try these in order before filing.",
    cards: [
      {
        title: "State contractor licensing board",
        pillLabel: "Free, fast, biggest hammer",
        pillTier: "primary",
        whenItFits:
          "the contractor is licensed (most states require licenses for jobs above a dollar threshold). The board can pull the license, freeze the bond, order restitution, and assess fines. California's CSLB resolves many cases within 90 days at no cost.",
        tradeoff:
          "no leverage if the contractor is unlicensed. The board can only discipline its own licensees.",
      },
      {
        title: "Bond claim",
        pillLabel: "Best chance of payment",
        pillTier: "good",
        whenItFits:
          "the contractor is licensed and bonded (most states require bonds: $25,000 in California, varies elsewhere). File a claim with the surety. The bond pays out before the contractor's other creditors. Especially valuable when the contractor is insolvent.",
        tradeoff:
          "the bond may have other claimants competing for the same pool. File early.",
      },
      {
        title: "Small claims (this guide)",
        pillLabel: "When the others fail",
        pillTier: "warn",
        whenItFits:
          "the contractor-board complaint and bond claim did not produce a refund within 60 days, or the contractor is unlicensed and unbonded. Damages within your state's cap (usually $5,000 to $20,000).",
        tradeoff:
          "30 to 90 day timeline. Filing fee $30 to $100. Collection from a judgment-proof contractor can be hard.",
      },
    ],
  },

  cta: {
    h2: { pre: "Get your ", em: "deposit back", post: "." },
    body:
      "Most vanishing-contractor cases settle once the contractor sees the demand letter, the contractor-board complaint, and the bond claim coming. A real demand letter cites the statute, lays out the math, and gives a deadline. Our generator builds yours in under two minutes.",
    receipt: {
      label: "example · vanishing contractor",
      items: [
        { label: "Deposit paid", amount: "$5,000" },
        { label: "Cost-difference quotes", amount: "+ $1,200" },
        { label: "Filing fee + interest", amount: "+ $300" },
      ],
      total: "$6,500",
      totalLabel: "Total claim",
      note: "Illustrative. Unlicensed-contractor cases can recover the entire amount paid regardless of work value.",
    },
  },

  faqs: [
    {
      q: "How much can a contractor legally take as a deposit?",
      a: "It depends on the state. California caps home-improvement deposits at $1,000 or 10 percent of the contract, whichever is less. New York generally caps at 50 percent. Connecticut caps at one-third. Many states have no cap but courts treat anything above 30 to 50 percent as suspicious. Your contractor-licensing law sets the limit.",
    },
    {
      q: "What if the contractor was unlicensed?",
      a: "In most states this works in your favor. An unlicensed contractor cannot enforce the contract or sue you for the unpaid balance. In California (Bus & Prof Code § 7031) and several other states, you can recover every dollar you paid, regardless of any work performed. Even in states without that exact rule, unlicensed contractors face stiff penalties that pressure quick settlement.",
    },
    {
      q: "Should I file with the contractor licensing board or in small claims first?",
      a: "Board complaint first, almost always. It is free, the board can pull the license and freeze the bond, and many contractors settle the moment they receive the board's letter. Small claims is the backup if the board cannot produce a refund within 60 to 90 days.",
    },
    {
      q: "What is a contractor surety bond and how do I claim against it?",
      a: "A surety bond is insurance the state requires licensed contractors to carry to cover claims by customers. California requires $25,000; other states vary. To claim, contact the bonding company (named on the contractor's license), provide the contract, the deposit receipt, and proof of breach. The bond pays out before the contractor's other creditors.",
    },
    {
      q: "How do I find a contractor's license number and bond?",
      a: "Search your state's contractor licensing board website. California: cslb.ca.gov/onlineservices. Florida: myfloridalicense.com. The license record shows the bond amount, the surety company, any past complaints, and current status.",
    },
    {
      q: "Can I sue the contractor's company even if they used a different business name?",
      a: "Yes. Most contractors operate as LLCs or corporations. The license record shows the legal entity name. You can also sue the individual contractor personally if they took the deposit without authority to bind a properly-formed entity, or if they signed personally on the contract.",
    },
    {
      q: "What if the contractor declared bankruptcy?",
      a: "Bankruptcy generally stays your court case (you cannot pursue the lawsuit during the bankruptcy). But the bond claim is still available because the bond is the surety company's money, not the contractor's. File the bond claim immediately. You can also pursue the contractor licensing board complaint, since regulatory action is not stayed by bankruptcy.",
    },
    {
      q: "How long do I have to sue?",
      a: "Breach of contract claims usually run 3 to 6 years from the date of breach (when the contractor missed the start date or stopped responding). Statutory consumer-protection claims often have shorter windows (1 to 4 years). State contractor-board complaints often have their own deadlines (4 years in California). Move fast, especially for the board complaint.",
    },
  ],

  relatedSlugs: [
    "unfinished-work",
    "poor-workmanship",
    "damaged-house",
    "handyman-bad-work",
    "plumber-damage",
    "moving-company-damage",
  ],
};

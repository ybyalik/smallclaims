import type { ContractorIssue } from "./types";

export const unfinishedWork: ContractorIssue = {
  slug: "unfinished-work",
  ready: true,
  short: "Unfinished work",
  breadcrumbLabel: "Unfinished Work",

  meta: {
    title: "Can I Sue a Contractor for Unfinished Work? Small Claims Guide",
    description:
      "Plain-English guide to recovering damages when a contractor walked off mid-job. The cost-to-finish math, when to withhold final payment, mechanic's lien risk, and a demand-letter template.",
  },

  hero: {
    eyebrowSuffix: "Unfinished work",
    h1: { pre: "Can I sue a contractor for ", em: "unfinished work", post: "?" },
    leadStrong: "Yes. The damages are the cost to finish, minus what you would have paid the original.",
    leadBody:
      " A contractor who started a job and walked off owes you the difference between the contract price and what a replacement contractor charges to finish. They also owe back the unearned portion of any deposit. Before you file, file a complaint with your state's contractor licensing board (CSLB in California, DBPR in Florida) and claim against their bond. Most cases settle once both pressures are in motion.",
  },

  counter: {
    amount: 5400,
    meta: "Breach of contract · cost-to-complete",
    rows: [
      { label: "Cost to finish (replacement)", value: "$3,800" },
      { label: "Unearned deposit", value: "+ $1,400", emphasis: "accent" },
      { label: "Filing fee + interest", value: "$200", emphasis: "muted" },
    ],
    footer: "Sample · within most state small-claims caps",
  },

  whatCounts: {
    h2: { pre: "When does ", em: "unfinished work", post: " become a lawsuit?" },
    lede:
      "Four scenarios cover almost every walk-off case. Each is its own claim. Most cases stack two or three.",
    cards: [
      {
        num: "01",
        title: "Stopped responding mid-job",
        body:
          "The most common pattern. Some demolition or rough-in was done, then the contractor stopped showing up and stopped returning calls. This is breach of contract. You owe the value of work actually completed (quantum meruit). They owe back the rest, plus the cost-to-finish difference.",
      },
      {
        num: "02",
        title: "Missed deadlines without good cause",
        body:
          "Time-of-the-essence clauses make missed deadlines a material breach. Even without that clause, weeks of missed dates with no permits, materials, or workers on site lets you treat the contract as breached and bring in someone new.",
      },
      {
        num: "03",
        title: "Demanded extra money to continue",
        body:
          "If the contractor refuses to finish without a price increase the contract did not allow, that is bad faith. Document the demand in writing. You can fire them, hire a replacement, and sue for the difference.",
      },
      {
        num: "04",
        title: "Quality so bad it had to be redone",
        body:
          "Sometimes 'unfinished' overlaps with defective. If what they did has to be torn out before a replacement can finish, you also have a workmanship claim. Cost to demo plus cost to redo plus original price difference all stack.",
      },
    ],
    note: {
      strongIntro: "Document before you fire them.",
      rest:
        " Send written notice citing missed deadlines and demanding completion within 7 to 14 days. If they do not respond, fire them in writing. Without that paper trail, the contractor argues you fired them without cause, which can hurt your damages calculation.",
    },
  },

  claim: {
    h2: { pre: "How much can you ", em: "claim", post: "?" },
    lede:
      "Your damages are the cost to finish minus what you would have paid the original contractor. The math is clean once you have replacement quotes.",
    layers: [
      {
        tag: "Layer 1",
        title: "Cost-to-finish difference",
        body:
          "Take the average of two or three replacement-contractor quotes to finish the job. Subtract what was left to pay on the original contract. The difference is your direct damage.",
        amount: "$3,800",
      },
      {
        tag: "Layer 2",
        title: "Unearned portion of deposit and progress payments",
        body:
          "Money you paid that was not earned by completed work. Calculate the value of work actually done (quantum meruit) and subtract from total paid. The difference is recoverable.",
        amount: "+ $1,400",
        accent: true,
      },
      {
        tag: "Layer 3",
        title: "Filing fees, statutory penalties, interest",
        body:
          "Filing fee, service-of-process cost, and pre-judgment interest at your state's legal rate. Add unlicensed-contractor recovery if it applies (some states recover everything paid).",
        amount: "+ $200",
      },
    ],
    total: {
      label: "Sample total within small-claims cap",
      body:
        "Cost difference between original and replacement contractor, plus unearned deposit, plus filing fee.",
      amount: "$5,400",
      sublabel: "illustrative · varies by project size and licensing status",
    },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede:
      "Most walk-off cases settle once the contractor sees the cost-to-finish math and the contractor-board complaint coming. The math is not theoretical: it is what your replacement will charge.",
    checklist: [
      "The contract date, scope, and total price",
      "What was completed vs. unfinished (with photos)",
      "Two to three written quotes from replacement contractors",
      "The cost-to-finish math (replacement quote average minus contract balance)",
      "The unearned-deposit calculation",
      "A 14-day deadline before you file",
      "Sent certified mail with return receipt",
    ],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3581",
      date: "May 5, 2026",
      recipientName: "Cornerstone Builders LLC",
      recipientAddress: "8200 Industrial Lane, Phoenix, AZ 85019",
      reLine: "Demand for Refund and Cost-to-Complete, Bathroom Remodel Contract Dated February 1, 2026",
      bodyParagraphs: [
        "On February 1, 2026, you signed a contract to remodel the master bathroom for $18,000. I paid $9,000 in two progress payments. You worked seven days between February 8 and February 24, then stopped responding. Demolition was completed; tile, plumbing fixtures, vanity, and trim are unfinished.",
        "I obtained three quotes to finish the job (attached): $11,800, $12,400, and $13,000. The average ($12,400) exceeds the $9,000 remaining on our contract by $3,400. I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Refund of <strong>$1,400</strong> in unearned progress payment;",
        "Reimbursement of <strong>$3,800</strong> cost-to-finish difference (rounded average across replacement quotes).",
      ],
      closingLine:
        "Total demand: <strong>$5,200.00</strong>. If unresolved, I will file a complaint with the Arizona Registrar of Contractors and small-claims court.",
      signatory: "Riley A. Homeowner",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " an unfinished-work case." },
    lede:
      "Four steps. Replacement-contractor quotes are the heart of the case. Get three before you file.",
    steps: [
      {
        title: "Document the unfinished state",
        body:
          "Photos of every unfinished area on a single date, with timestamps. Written list of what was supposed to be done versus what was. Save your communications, including the dates the contractor stopped responding.",
      },
      {
        title: "Get replacement quotes",
        body:
          "Two to three written quotes from licensed contractors to finish the job. Tell each one this is for a court case so they include enough detail. Judges average the quotes and use that as the cost-to-finish.",
      },
      {
        title: "File contractor-board complaint and small claims",
        body:
          "Board complaint goes through your state agency (CSLB, DBPR, etc.) at no cost. Small claims goes in the county where the work was performed. Filing fees usually run $30 to $100. The two run in parallel.",
      },
      {
        title: "Hearing",
        body:
          "Lead with the contract, the timeline, and the replacement quotes. Walk through your math: replacement-quote average minus contract balance equals damages. Hearings usually run 10 to 15 minutes.",
      },
    ],
    aftermath: {
      tag: "After you win",
      title: "Collecting and bond claims.",
      bodyHtml:
        "If the contractor was licensed and bonded, file a bond claim with the surety company at the same time as the lawsuit. The bond pays out before the contractor&rsquo;s other creditors. After 30 days post-judgment, the enforcement tools are a <strong>judgment lien</strong> on real estate, a <strong>bank levy</strong>, and a <strong>writ of execution</strong> on tools or accounts receivable. A judgment also blocks license renewal in many states.",
    },
  },

  evidence: {
    h2: { pre: "What evidence do you need to ", em: "sue a contractor", post: "?" },
    lede:
      "Replacement quotes are the case. Pair with photos of the unfinished state and your written termination notice for the cleanest record.",
    cells: [
      {
        kind: "photos",
        tag: "Unfinished state (dated)",
        photos: [
          { id: "1581094271901-8022df4466f9", cap: "Demo done, tile pending" },
          { id: "1556909114-f6e7ad7d3136", cap: "No vanity installed" },
          { id: "1581092335397-9583eb92d232", cap: "Plumbing roughed only" },
          { id: "1503602642458-232111445657", cap: "Trim and paint missing" },
        ],
      },
      {
        kind: "texts",
        tag: "Stopped responding",
        texts: [
          { dir: "out", text: "Hey, are you coming today? Tile guys waiting." },
          { dir: "out", text: "It's been 4 days. Please respond." },
          { dir: "out", text: "If I don't hear by Friday I'm hiring someone to finish and filing with the ROC." },
        ],
      },
      {
        kind: "letter",
        tag: "Replacement quote",
        letterhead: "Pinnacle Construction · License #38291",
        date: "May 1, 2026",
        recipientName: "Riley Homeowner",
        reLine: "Quote · Bathroom remodel finish work",
        bodyParagraphs: [
          "Scope: complete tile, install vanity and fixtures, finish plumbing trim, paint, and final.",
          "Total to complete: $12,400. Estimated 14 working days. Materials included.",
        ],
        signatory: "K. Nazaryan",
        signatoryTitle: "Estimator",
      },
      {
        kind: "receipt",
        tag: "Progress payments paid",
        vendor: "CORNERSTONE BUILDERS LLC",
        vendorAddr: "License #ROC1029384 · Phoenix, AZ",
        receiptNum: "Invoice #2218",
        date: "02/01-02/24/2026",
        lineItems: [
          { label: "Deposit (signing)", amount: "$3,000.00" },
          { label: "Progress 1 (demo complete)", amount: "$3,000.00" },
          { label: "Progress 2 (rough plumbing)", amount: "$3,000.00" },
        ],
        subtotal: "$9,000.00",
        total: "$9,000.00",
        footer: "Bank transfer · half of $18,000 contract paid",
      },
    ],
  },

  defenses: {
    h2: { pre: "Common contractor ", em: "defenses", post: ", with rebuttals." },
    lede:
      "Three arguments cover most walk-off cases. The replacement quotes shut down most of them.",
    items: [
      {
        quote: "We were waiting on materials we already paid for.",
        pill: "Most common",
        rebuttal:
          "<strong>Rebuttal:</strong> ask for the supplier invoices and shipping confirmations. If they cannot produce dated proof of materials ordered for your job, the defense fails. If they did order materials, they need to deliver them or refund the materials portion.",
      },
      {
        quote: "You changed the scope and we were waiting for clarification.",
        pill: "Scope creep",
        rebuttal:
          "<strong>Rebuttal:</strong> bring the written scope from the contract. Most state contractor laws require change orders in writing, signed by both parties, before any added work. If they cannot show a signed change order, scope-creep is not a defense.",
      },
      {
        quote: "We were going to come back. You fired us prematurely.",
        pill: "Premature termination",
        rebuttal:
          "<strong>Rebuttal:</strong> show your written termination notice with the prior demand for completion within a reasonable window. If you sent a written notice and waited 7 to 14 days, the termination was not premature. Bring the certified-mail receipt.",
      },
    ],
  },

  outcomes: {
    h2: { pre: "How much do homeowners ", em: "actually win", post: "?" },
    lede:
      "Typical recovery in unfinished-work small-claims cases. Strength depends on documentation and replacement-quote clarity.",
    bands: [
      {
        label: "Low",
        range: "$500 to $2,500",
        body:
          "<strong>Partial cost-to-finish.</strong> Court awards quantum meruit value to the contractor and reduces the recovery. Common when the work done was substantial.",
        tier: "low",
      },
      {
        label: "Mid",
        range: "$2,500 to $8,000",
        body:
          "<strong>Cost-to-finish plus unearned deposit.</strong> Most common when replacement quotes are clean and the contractor's work was minimal.",
        tier: "mid",
      },
      {
        label: "High",
        range: "$8,000 to $20,000+",
        body:
          "<strong>Cap-of-the-court awards.</strong> Large jobs (kitchen, full bath, additions) where cost-to-finish difference plus unearned deposit pushes total to the cap. Unlicensed-contractor cases also push high.",
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
          "the contractor is licensed. The board can pull the license, freeze the bond, order restitution, and assess fines. CSLB resolves many cases within 90 days at no cost.",
        tradeoff:
          "no leverage if the contractor is unlicensed. Board can only discipline its own licensees.",
      },
      {
        title: "Bond claim",
        pillLabel: "Best chance of payment",
        pillTier: "good",
        whenItFits:
          "the contractor is licensed and bonded. File with the surety. Bond pays out before other creditors. Especially valuable when the contractor is insolvent.",
        tradeoff:
          "the bond may have other claimants competing for the same pool. File early.",
      },
      {
        title: "Small claims (this guide)",
        pillLabel: "When the others fail",
        pillTier: "warn",
        whenItFits:
          "the board complaint and bond claim did not produce a refund within 60 days, or the contractor is unlicensed and unbonded. Damages within your state's cap.",
        tradeoff:
          "30 to 90 day timeline. Filing fee $30 to $100. Collection from a judgment-proof contractor can be hard.",
      },
    ],
  },

  cta: {
    h2: { pre: "Recover the ", em: "cost to finish", post: "." },
    body:
      "Most walk-off cases settle once the demand letter, the contractor-board complaint, and the bond claim are all in motion. A real demand letter cites the math, the statute, and the deadline. Our generator builds yours in under two minutes.",
    receipt: {
      label: "example · walk-off mid-project",
      items: [
        { label: "Cost to finish (replacement)", amount: "$3,800" },
        { label: "Unearned deposit", amount: "+ $1,400" },
        { label: "Filing fee + interest", amount: "+ $200" },
      ],
      total: "$5,400",
      totalLabel: "Total claim",
      note: "Illustrative. Larger jobs and unlicensed contractors push the recovery higher.",
    },
  },

  faqs: [
    {
      q: "What if the contractor stopped working but says they are coming back?",
      a: "Send a written demand for completion within a specific window (7 to 14 days is reasonable). If they do not respond or do not show, send a written termination notice and start collecting replacement quotes. Without the written paper trail, contractors argue you fired them without cause.",
    },
    {
      q: "How do I figure out the cost-to-finish?",
      a: "Get two or three written quotes from licensed replacement contractors to finish the job. Tell them this is for a court case so they include enough detail. Judges average the quotes and use that as the cost-to-finish damage figure.",
    },
    {
      q: "Can I withhold the final payment instead of suing?",
      a: "Sometimes. If the contract has progress payments and you are still owing money when they walked off, you can hold the unpaid balance and use it against your damages. But be careful: contractors often file a mechanic's lien on your property if you withhold. Get legal advice in your state before withholding past 14 days.",
    },
    {
      q: "What is quantum meruit?",
      a: "Latin for 'as much as deserved.' It is the rule that a contractor who partially performed is entitled to the fair value of the work actually done, even if the contract was breached. Use it to subtract the value of completed work from the deposit you paid before calculating refund.",
    },
    {
      q: "What if the contractor files a mechanic's lien?",
      a: "Most states give contractors a window (usually 30 to 90 days) to file a lien claim against your property for unpaid work. The lien clouds your title. To remove it, you can post a bond, sue to discharge it, or wait for it to expire. Some states require contractors to follow strict notice procedures and an invalid lien can be removed quickly.",
    },
    {
      q: "How long do I have to sue?",
      a: "Breach of contract claims usually run 3 to 6 years from the date of breach. Statutory consumer-protection claims often have shorter windows (1 to 4 years). State contractor-board complaints often have their own deadlines (4 years in California). Move fast on the board complaint especially.",
    },
    {
      q: "Will the contractor's insurance cover this?",
      a: "Sometimes. Contractors carry general liability insurance for damage they cause, not for breach of contract. So if the work caused property damage (water, electrical, structural), file an insurance claim with the contractor's GL carrier. For unfinished-work disputes, the bond claim is the usual route.",
    },
  ],

  relatedSlugs: [
    "deposit-and-disappearing",
    "poor-workmanship",
    "damaged-house",
    "handyman-bad-work",
    "roofer-leaking-roof",
    "plumber-damage",
  ],
};

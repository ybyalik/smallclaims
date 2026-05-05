import type { EmployerIssue } from "./types";

export const stolenTips: EmployerIssue = {
  slug: "stolen-tips",
  ready: true,
  short: "Stolen tips",
  breadcrumbLabel: "Stolen tips",

  meta: {
    title: "Can I Sue My Employer for Stealing My Tips? Small Claims Guide",
    description:
      "Plain-English guide to recovering stolen tips. Federal law makes it illegal for managers and owners to keep any tips. 2x liquidated damages, demand-letter template, and how to file in small claims.",
  },

  hero: {
    eyebrowSuffix: "Stolen tips",
    h1: { pre: "Can I sue my employer for ", em: "stealing my tips", post: "?" },
    leadStrong: "Yes. Federal law makes it illegal for managers or owners to keep any portion.",
    leadBody:
      " Tips are the property of the employee who earned them. The federal Fair Labor Standards Act prohibits employers, managers, and supervisors from keeping any portion of an employee's tips, even when a valid tip pool is in place. Recovery typically includes the stolen tips plus 100 percent liquidated damages, plus attorney fees that shift to the loser. Small claims is well-suited because most disputes fit your state's cap.",
  },

  counter: {
    amount: 4400,
    meta: "FLSA · 29 U.S.C. § 203(m)(2)(B)",
    rows: [
      { label: "Tips taken (4 mos)", value: "$2,000" },
      { label: "Liquidated damages (100%)", value: "+ $2,000", emphasis: "accent" },
      { label: "Filing fee + interest", value: "$400", emphasis: "muted" },
    ],
    footer: "Sample · willful FLSA tip violation",
  },

  whatCounts: {
    h2: { pre: "What counts as ", em: "stealing tips", post: "?" },
    lede:
      "Four common patterns. Each is a federal wage violation under the FLSA, plus often a state-law violation on top.",
    cards: [
      {
        num: "01",
        title: "Manager or owner takes a cut",
        body:
          "Federal law (FLSA § 203(m)(2)(B)) prohibits employers, managers, and supervisors from keeping any portion of an employee's tips. Not even a small percentage. Not 'to cover a credit-card processing fee.' Not 'because the manager helped on the floor.' Zero.",
      },
      {
        num: "02",
        title: "Illegal tip pool",
        body:
          "Tip pools have to share among non-managerial employees who 'customarily and regularly receive tips.' Pools that include managers, owners, kitchen staff (in some setups), or back-office employees violate federal law.",
      },
      {
        num: "03",
        title: "Tip credit but no posted notice",
        body:
          "If your employer pays a tipped minimum wage (lower than regular minimum), they have to give you written notice of the tip credit and let you keep all your tips. Skipping the notice voids the tip credit and you are owed the full minimum wage difference.",
      },
      {
        num: "04",
        title: "Credit-card tip skimming",
        body:
          "Some employers deduct 'credit-card processing fees' from tips. Federal law allows them to deduct only the actual processing fee on the tip portion. Charging a flat 3 percent on the whole tip when actual processing was 1.5 percent is a violation.",
      },
    ],
    note: {
      strongIntro: "Federal law applies regardless of state.",
      rest:
        " Even in states without their own tip statutes, the FLSA covers most tipped employees. Many states (California, Massachusetts, New York) layer additional protections and bigger penalties on top.",
    },
  },

  claim: {
    h2: { pre: "How much can you ", em: "claim", post: "?" },
    lede:
      "The stolen tips are the floor. Liquidated damages and minimum-wage shortfalls stack on top.",
    layers: [
      {
        tag: "Layer 1",
        title: "Stolen tips",
        body:
          "Tips taken by the manager, owner, or invalid tip-pool members. If you can prove the amount with credit-card slips, daily logs, or coworker testimony, the math is straightforward.",
        amount: "$2,000",
      },
      {
        tag: "Layer 2",
        title: "Liquidated damages (100 percent FLSA)",
        body:
          "FLSA tip claims add 100 percent liquidated damages on top of the stolen amount when the violation was willful. Some states (Massachusetts) add 3x. New York adds 100 percent on willful violations under state law too.",
        amount: "+ $2,000",
        accent: true,
      },
      {
        tag: "Layer 3",
        title: "Minimum-wage shortfall (if tip credit voided)",
        body:
          "If you were paid the tipped minimum wage and the tip credit is voided (no notice, illegal pool, manager taking tips), you also get the difference between tipped minimum and full minimum wage for every hour worked.",
        amount: "+ varies",
      },
    ],
    total: {
      label: "Sample total under FLSA",
      body:
        "$2,000 in stolen tips with willful violation, plus 100 percent liquidated damages, plus filing fee and pre-judgment interest. Add minimum-wage difference if applicable.",
      amount: "$4,400+",
      sublabel: "illustrative · varies by state and tip-credit status",
    },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede:
      "Tip-theft demand letters get fast attention. The employer's lawyer knows the FLSA shifts attorney fees to the loser and that the violation is binary (managers cannot take tips, period).",
    checklist: [
      "The dates and amounts taken (with dollar math)",
      "Who took the tips (manager, owner, or invalid pool)",
      "The statute (FLSA § 203(m)(2)(B), and your state tip law if any)",
      "A 14-day deadline before you file",
      "Sent certified mail with return receipt",
    ],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3565",
      date: "May 5, 2026",
      recipientName: "Harborlight Restaurant Group",
      recipientAddress: "1245 Pier Street, Boston, MA 02210",
      reLine: "Demand for Stolen Tips, January through April 2026",
      bodyParagraphs: [
        "Between January 1 and April 30, 2026, the manager on duty (Casey Reid) collected approximately $500 per month from the credit-card tip pool. Federal law (29 U.S.C. § 203(m)(2)(B)) prohibits managers and supervisors from keeping any portion of employee tips. The total taken from my share is approximately $2,000.",
        "I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Payment of <strong>$2,000</strong> in stolen tips;",
        "Payment of <strong>$2,000</strong> in liquidated damages for willful violation under <strong>29 U.S.C. § 216(b)</strong>.",
      ],
      closingLine:
        "Total demand: <strong>$4,000.00</strong>. If unresolved, I will file in Small Claims Court and pursue all available statutory damages, fees, and the minimum-wage shortfall from voided tip credits.",
      signatory: "Devin Park",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " a tip-theft case." },
    lede:
      "Four steps. Tip cases are very strong when you have credit-card slips or daily tip-out records.",
    steps: [
      {
        title: "Prepare",
        body:
          "Gather paystubs, credit-card tip-out reports, your own daily tip log, the tip-pool policy (if any), and any text or schedule confirming who was on duty. Talk to coworkers about whether they kept their own tips.",
      },
      {
        title: "File",
        body:
          "File a small-claims complaint in the county where the employer's main office is located, or where you worked. Filing fees usually run $30 to $100.",
      },
      {
        title: "Serve",
        body:
          "Sheriff, certified mail through the clerk, or a private process server. Serve the registered agent. For chain restaurants, the agent is usually a corporate office, not the local store.",
      },
      {
        title: "Hearing",
        body:
          "Lead with the federal statute: managers cannot take tips. Show the credit-card reports and tip-out logs. Hearings usually run 10 to 15 minutes. The legal rule is binary, so the case turns on the math.",
      },
    ],
    aftermath: {
      tag: "After you win",
      title: "Collecting on a tip judgment.",
      bodyHtml:
        "Most restaurants settle to avoid a public judgment that draws DOL attention. Tip violations often trigger a Department of Labor audit covering the whole staff. After 30 days, the enforcement tools are a <strong>judgment lien</strong> on company real estate, a <strong>bank levy</strong> on a corporate account, and a <strong>writ of execution</strong> on business assets. Pre- and post-judgment interest runs at your state&rsquo;s legal rate.",
    },
  },

  evidence: {
    h2: { pre: "What evidence do you need to ", em: "sue your employer", post: "?" },
    lede:
      "Tip cases turn on credit-card slips, tip-out logs, and coworker testimony. The math is usually clean if records exist.",
    photos: [],
    texts: [],
    receipt: {
      vendor: "", vendorAddr: "", receiptNum: "", date: "",
      lineItems: [], subtotal: "", total: "", footer: "",
    },
    cells: [
      {
        kind: "receipt",
        tag: "Customer receipt",
        vendor: "HARBORLIGHT BISTRO",
        vendorAddr: "1245 Pier Street · Boston, MA",
        receiptNum: "Check #4827",
        date: "04/12/2026",
        lineItems: [
          { label: "Subtotal", amount: "$84.00" },
          { label: "Tax", amount: "$5.46" },
          { label: "Tip (server: Devin)", amount: "$18.00" },
        ],
        subtotal: "$89.46",
        total: "$107.46",
        footer: "Server tip: $18.00",
        stamp: "PAID",
      },
      {
        kind: "texts",
        tag: "Coworker confirmation",
        texts: [
          { dir: "in", text: "Did Casey take from your tip-out tonight?" },
          { dir: "out", text: "Yeah, $80. Said it was for 'helping on the floor.'" },
          { dir: "in", text: "Same. That's not legal. Casey's a manager." },
        ],
      },
      {
        kind: "handbook",
        tag: "Tip-pool policy",
        documentTitle: "Harborlight Bistro · Tip Policy",
        sectionTitle: "Tip Pool",
        bodyParagraphs: [
          "All credit-card tips collected during a shift are pooled and distributed at the end of the night.",
        ],
        highlight:
          "The shift manager on duty receives 8 percent of the pool for floor support and oversight.",
        footer: "Note: federal law prohibits any manager share, regardless of policy",
      },
      {
        kind: "paystub",
        tag: "Tip declaration",
        employer: "HARBORLIGHT RESTAURANT GROUP",
        employerAddr: "1245 Pier Street · Boston, MA",
        payPeriod: "Pay period 04/01 to 04/15/2026",
        payDate: "Paid 04/22/2026",
        earnings: [
          { label: "Tipped wages (60 hrs)", amount: "$405.00" },
          { label: "Tips reported (declared)", amount: "$520.00" },
          { label: "Tips actually retained", amount: "$478.40" },
        ],
        deductions: [
          { label: "Federal tax", amount: "-$76.00" },
          { label: "FICA", amount: "-$70.78" },
        ],
        gross: "$925.00",
        net: "$778.22",
        footer: "Difference of $41.60 = 8% manager share, not legal under FLSA",
      },
    ],
  },

  defenses: {
    h2: { pre: "Common employer ", em: "defenses", post: ", with rebuttals." },
    lede:
      "Three arguments cover most tip cases. Each has a clean rebuttal because federal law is binary.",
    items: [
      {
        quote: "It was a tip pool. The manager was just sharing.",
        pill: "Most common",
        rebuttal:
          "<strong>Rebuttal:</strong> federal law (29 U.S.C. § 203(m)(2)(B)) prohibits employers, managers, and supervisors from keeping any portion of employee tips. There is no exception for tip pools. The Department of Labor has been clear: manager participation in a pool voids the pool.",
      },
      {
        quote: "The 8 percent was for credit-card processing fees.",
        pill: "Processing fee",
        rebuttal:
          "<strong>Rebuttal:</strong> employers can deduct only the actual processing fee on the tip portion. If the actual fee is 1.5 percent and they deducted 3 or 8 percent, the difference is a violation. Bring the credit-card processing statement to show the real rate.",
      },
      {
        quote: "You agreed to the tip pool when you started.",
        pill: "Consent",
        rebuttal:
          "<strong>Rebuttal:</strong> agreements to a pool that violates federal law are not enforceable. The FLSA's protections cannot be waived by contract. You cannot consent to your way out of a federal wage right.",
      },
    ],
  },

  outcomes: {
    h2: { pre: "How much do workers ", em: "actually win", post: "?" },
    lede:
      "Typical recovery ranges. Tip cases with clear records push to the higher band quickly.",
    bands: [
      {
        label: "Low",
        range: "$300 to $1,500",
        body:
          "<strong>Tips back, no multiplier.</strong> The court agrees on the amount but does not find willfulness. Common when the dispute was brief or the employer corrected the policy after the complaint.",
        tier: "low",
      },
      {
        label: "Mid",
        range: "$1,500 to $5,000",
        body:
          "<strong>Tips plus 100 percent liquidated damages.</strong> The standard FLSA outcome when records show systematic skimming. Add filing fees on top.",
        tier: "mid",
      },
      {
        label: "High",
        range: "$5,000 to $20,000+",
        body:
          "<strong>Tips plus state multiplier plus voided tip credit.</strong> Massachusetts 3x, plus the minimum-wage shortfall when the tip credit is voided. Cap-of-the-court territory.",
        tier: "high",
      },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede:
      "Tip cases have multiple venues. The DOL is especially worth contacting because tip violations often affect the whole staff.",
    cards: [
      {
        title: "U.S. Department of Labor (Wage & Hour Division)",
        pillLabel: "Free, federal",
        pillTier: "good",
        whenItFits:
          "your employer is taking tips from multiple employees. DOL audits the whole operation and recovers for the entire staff. They take tip cases seriously.",
        tradeoff:
          "DOL chooses which cases to pursue. You give up control of strategy. If they decline, you can still file your own suit.",
      },
      {
        title: "State labor commissioner",
        pillLabel: "Free, state",
        pillTier: "good",
        whenItFits:
          "your state has stronger tip protections than federal law (Massachusetts, California). State agencies often have streamlined wage hearings.",
        tradeoff:
          "limited remedies. Some agencies cannot order the FLSA's 100 percent liquidated damages.",
      },
      {
        title: "Small claims (this guide)",
        pillLabel: "Best for individual cases",
        pillTier: "primary",
        whenItFits:
          "your damages including liquidated damages fit your state's cap, and you want a fast judgment with full statutory remedies.",
        tradeoff:
          "30 to 90 day timeline. Filing fee around $50 to $100. Cap usually $5,000 to $20,000.",
      },
    ],
  },

  cta: {
    h2: { pre: "Recover what's ", em: "actually owed", post: "." },
    body:
      "Tip-theft demand letters are some of the highest-conversion wage demands. Federal law is binary and fee-shifting is automatic. Our generator builds yours in under two minutes.",
    receipt: {
      label: "example · 4 months of skimming",
      items: [
        { label: "Stolen tips", amount: "$2,000" },
        { label: "Liquidated damages (100%)", amount: "+ $2,000" },
        { label: "Filing fee + interest", amount: "+ $400" },
      ],
      total: "$4,400",
      totalLabel: "Total claim",
      note: "Illustrative. Your number depends on the amount taken and willfulness finding.",
    },
  },

  faqs: [
    {
      q: "Can my manager take tips?",
      a: "No. Federal law (29 U.S.C. § 203(m)(2)(B)) prohibits employers, managers, and supervisors from keeping any portion of employee tips. Not in a tip pool, not as a 'processing fee,' not for 'helping on the floor.' Zero. State laws often add stricter rules on top.",
    },
    {
      q: "Are tip pools legal?",
      a: "Some are. Pools that share among non-managerial employees who 'customarily and regularly receive tips' (servers, bartenders, bussers) are generally legal. Pools that include managers, supervisors, owners, or back-of-house in some setups are not.",
    },
    {
      q: "Can my employer deduct credit-card processing fees from my tips?",
      a: "Only the actual fee on the tip portion. If the real processing rate is 1.5 percent and they deducted 3 percent or more, the difference is a violation. Ask for the credit-card processing statement to confirm the real rate.",
    },
    {
      q: "What is a 'tip credit' and how does it affect my claim?",
      a: "Tipped employees can be paid a tipped minimum wage (federal $2.13 per hour, higher in many states) as long as tips bring them up to full minimum wage. The employer has to give written notice and let you keep all tips. If they take your tips or skip the notice, the tip credit is voided and you are owed the full minimum-wage difference for every hour worked.",
    },
    {
      q: "How do I prove how much was taken?",
      a: "Credit-card receipts are the gold standard (they show exact tip amounts). Daily tip-out logs from the restaurant work too. Coworker testimony helps when records are sparse. Your own contemporaneous log is admissible if you kept one.",
    },
    {
      q: "How long do I have to sue?",
      a: "Federal FLSA: 2 years standard, 3 years if willful. State tip statutes often look back 3 to 4 years. Move fast: credit-card records are easier to subpoena while the employer still has them.",
    },
    {
      q: "Will I be retaliated against?",
      a: "Retaliation for filing a wage claim is itself illegal under the FLSA. If your employer fires or cuts your hours after you complain, that is a separate claim with its own damages. Some states add 2x or 3x penalties for wage retaliation.",
    },
  ],

  relatedSlugs: [
    "unpaid-wages",
    "last-paycheck",
    "retaliation",
    "wrongful-termination",
    "no-w2",
    "fired-without-warning",
  ],
};

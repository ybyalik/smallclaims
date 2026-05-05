import type { EmployerIssue } from "./types";

export const noW2: EmployerIssue = {
  slug: "no-w2",
  ready: true,
  short: "No W-2",
  breadcrumbLabel: "No W-2",

  meta: {
    title: "Can I Sue My Employer for Not Giving Me My W-2?",
    description:
      "Plain-English guide for employees whose W-2 never arrived. The IRS January 31 deadline, Form 4852 substitute, what damages you can recover in small claims, and a demand-letter template.",
  },

  hero: {
    eyebrowSuffix: "No W-2",
    h1: { pre: "Can I sue my employer for ", em: "not giving me my W-2", post: "?" },
    leadStrong: "Yes, but the IRS is usually the bigger hammer.",
    leadBody:
      " Employers must furnish W-2s by January 31. If yours did not arrive, the most useful first step is calling the IRS (1-800-829-1040) and filing Form 4852 (substitute W-2) so you can still file your taxes on time. The IRS imposes per-form penalties on the employer. You can also sue in small claims for documented out-of-pocket costs (tax-prep fees, missed-deadline penalties, accountant time) plus any unpaid wages reflected on the missing W-2.",
  },

  counter: {
    amount: 850,
    meta: "IRC § 6051 · IRS penalties + your costs",
    rows: [
      { label: "Tax prep & accountant fees", value: "$300" },
      { label: "Missed-deadline penalty (you paid)", value: "+ $400", emphasis: "accent" },
      { label: "Filing fee + interest", value: "$150", emphasis: "muted" },
    ],
    footer: "Sample · documented out-of-pocket damages",
  },

  whatCounts: {
    h2: { pre: "What counts as a ", em: "W-2 violation", post: "?" },
    lede:
      "Three common situations. Each one supports a small-claims case for documented costs.",
    cards: [
      {
        num: "01",
        title: "No W-2 by January 31",
        body:
          "IRC § 6051 requires employers to furnish W-2s by January 31 of the following year. Missing that date is a per-form IRS penalty. The IRS will pursue it; your job is to recover your own costs.",
      },
      {
        num: "02",
        title: "Wrong information on the W-2",
        body:
          "Wages reported lower than what you actually earned. Withholdings reported wrong. Wrong Social Security number. Each one creates a paperwork problem you have to fix at tax time. Costs add up fast.",
      },
      {
        num: "03",
        title: "Misclassified as a 1099 contractor",
        body:
          "If the employer issued a 1099-NEC instead of a W-2 but treated you like an employee (set hours, supervised your work, provided tools), that is misclassification. You may also be owed back wages for unpaid overtime and minimum wage. This becomes a wage case as much as a W-2 case.",
      },
      {
        num: "04",
        title: "Refused to send a duplicate or correction",
        body:
          "If the W-2 was lost in the mail or had errors, the employer is required to issue a duplicate or corrected W-2 (W-2c). Refusing to do so is a separate violation under IRS rules.",
      },
    ],
    note: {
      strongIntro: "Step one is the IRS, not the courthouse.",
      rest:
        " Call 1-800-829-1040 after February 14. Provide the employer's name, address, EIN (if you have it), and your dates of employment. The IRS will contact the employer. File Form 4852 to file your taxes on time without the W-2. Then sue for your costs.",
    },
  },

  claim: {
    h2: { pre: "What can you ", em: "claim", post: "?" },
    lede:
      "The IRS handles the per-form penalty. You sue for your own out-of-pocket costs and any unpaid wages.",
    layers: [
      {
        tag: "Layer 1",
        title: "Documented out-of-pocket costs",
        body:
          "Tax-prep fees that increased because of the missing form. Accountant time spent reconstructing your wages. Postage and certified-mail costs for chasing the W-2. IRS amendment fees. Bring receipts.",
        amount: "$300",
      },
      {
        tag: "Layer 2",
        title: "Missed-deadline penalties (your share)",
        body:
          "If you had to file late and paid IRS or state penalties because the W-2 never came and Form 4852 was complicated, the penalties are recoverable damages tied to the breach.",
        amount: "+ $400",
        accent: true,
      },
      {
        tag: "Layer 3",
        title: "Unpaid wages on the missing W-2",
        body:
          "Often the missing W-2 hides unpaid wages: tips not reported, overtime not paid, off-the-clock work. If you find shortages while reconstructing, those become a separate (and usually bigger) wage claim.",
        amount: "varies",
      },
    ],
    total: {
      label: "Sample total within small-claims cap",
      body:
        "Tax-prep and accountant costs plus the IRS late-filing penalty you paid because the W-2 never came, plus filing fees.",
      amount: "$850",
      sublabel: "illustrative · varies by costs and state",
    },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede:
      "Most missing-W-2 cases settle at the demand stage. Employers want to avoid IRS inquiries triggered by employee complaints, and your costs are usually small enough that paying is easier than fighting.",
    checklist: [
      "Your dates of employment and last known address on file",
      "Documentation that the W-2 never arrived (your records, certified-mail receipts of requests)",
      "An itemized list of your out-of-pocket costs (with receipts)",
      "The statute (IRC § 6051) and IRS Form 4852 reference",
      "A 14-day deadline before you file",
      "Sent certified mail with return receipt",
    ],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3567",
      date: "May 5, 2026",
      recipientName: "Eastside Auto Repair Inc.",
      recipientAddress: "9100 Eastside Boulevard, Cleveland, OH 44103",
      reLine: "Demand for 2025 W-2 and Reimbursement of Costs",
      bodyParagraphs: [
        "I worked for Eastside Auto Repair from March 2024 through November 2025. The W-2 for tax year 2025 was due to me by January 31, 2026 under <strong>26 U.S.C. § 6051</strong>. I have not received it. I requested a duplicate by certified mail on March 1, 2026 (receipt 7019 0140 0001 4827 3500). No response.",
        "I have already filed my 2025 return using Form 4852 (substitute W-2) and reported the missing W-2 to the IRS. I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Issuance of the 2025 W-2 with accurate wage and withholding figures;",
        "Reimbursement of <strong>$300</strong> in additional tax-prep and accountant fees and <strong>$400</strong> in IRS late-filing penalties tied to the missing form.",
      ],
      closingLine:
        "Total demand: <strong>$700.00</strong> plus issuance of the W-2. If unresolved, I will file in Small Claims Court.",
      signatory: "Jamie Lopez",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " a small-claims case for a missing W-2." },
    lede:
      "Four steps. The IRS work happens in parallel and is usually the bigger hammer.",
    steps: [
      {
        title: "Prepare",
        body:
          "Gather your last paystub of the year (year-to-date totals are your fallback W-2), your tax-prep receipts, the IRS late-filing penalty notice, certified-mail receipts of your W-2 requests, and Form 4852 (the IRS substitute).",
      },
      {
        title: "File",
        body:
          "File a small-claims complaint in the county where the employer's main office is located, or where you worked. Filing fees usually run $30 to $100. The claim is small but the principle and IRS pressure usually push settlement.",
      },
      {
        title: "Serve",
        body:
          "Sheriff, certified mail through the clerk, or a private process server. Serve the registered agent. For small businesses the agent is often the owner's home or accountant.",
      },
      {
        title: "Hearing",
        body:
          "Lead with the statute and the deadline. Show your costs with receipts. Hearings usually run 10 to 15 minutes. The case is mechanical: the deadline passed, the costs followed, here is the math.",
      },
    ],
    aftermath: {
      tag: "After you win",
      title: "Collecting on the judgment.",
      bodyHtml:
        "Most small employers pay voluntarily once a judgment is entered, especially when the case is small. After 30 days, the enforcement tools are a <strong>judgment lien</strong> on company real estate, a <strong>bank levy</strong> on a corporate account, and a <strong>writ of execution</strong> on business assets. Pre- and post-judgment interest runs at your state&rsquo;s legal rate.",
    },
  },

  evidence: {
    h2: { pre: "What evidence do you need to ", em: "sue your employer", post: "?" },
    lede:
      "W-2 cases are built on the year-end paystub, your tax-prep receipts, and proof that you asked for the W-2.",
    photos: [],
    texts: [],
    receipt: {
      vendor: "", vendorAddr: "", receiptNum: "", date: "",
      lineItems: [], subtotal: "", total: "", footer: "",
    },
    cells: [
      {
        kind: "paystub",
        tag: "Last paystub of 2025",
        employer: "EASTSIDE AUTO REPAIR INC.",
        employerAddr: "9100 Eastside Blvd · Cleveland, OH",
        payPeriod: "Pay period 11/16 to 11/30/2025",
        payDate: "Paid 12/05/2025",
        earnings: [
          { label: "Regular hours (80)", amount: "$1,800.00" },
          { label: "YTD wages", amount: "$38,400.00" },
          { label: "YTD federal withholding", amount: "$4,300.00" },
        ],
        deductions: [
          { label: "Federal tax", amount: "-$220.00" },
          { label: "FICA (period)", amount: "-$137.70" },
          { label: "State tax", amount: "-$72.00" },
        ],
        gross: "$1,800.00",
        net: "$1,370.30",
        footer: "YTD totals are your fallback W-2 numbers",
      },
      {
        kind: "letter",
        tag: "Your request for W-2",
        letterhead: "Certified Mail · Return Receipt",
        date: "March 1, 2026",
        recipientName: "Eastside Auto Repair Inc.",
        recipientAddress: "9100 Eastside Blvd, Cleveland, OH",
        reLine: "Request for 2025 W-2 (overdue)",
        bodyParagraphs: [
          "My W-2 for tax year 2025 was due by January 31, 2026. I have not received it.",
          "Please send a duplicate within 14 days. If not received, I will report the violation to the IRS and file in small claims for my costs.",
        ],
        signatory: "Jamie Lopez",
      },
      {
        kind: "document",
        tag: "Form 4852",
      },
      {
        kind: "receipt",
        tag: "Tax-prep cost",
        vendor: "MIDTOWN TAX SERVICES",
        vendorAddr: "421 W 35th St · Cleveland, OH",
        receiptNum: "Receipt #5821",
        date: "04/14/2026",
        lineItems: [
          { label: "Standard return prep", amount: "$120.00" },
          { label: "Form 4852 reconstruction", amount: "$160.00" },
          { label: "Late-filing assistance", amount: "$80.00" },
        ],
        subtotal: "$360.00",
        total: "$360.00",
        footer: "Cost of preparing tax return without W-2",
      },
    ],
  },

  defenses: {
    h2: { pre: "Common employer ", em: "defenses", post: ", with rebuttals." },
    lede:
      "Three arguments cover most missing-W-2 cases. None of them excuse the IRS deadline.",
    items: [
      {
        quote: "We mailed it. Must have been lost.",
        pill: "Most common",
        rebuttal:
          "<strong>Rebuttal:</strong> ask for the certified-mail receipt. If they used regular mail and you never received it, they are still required to issue a duplicate W-2 once you request one. Their failure to issue the duplicate is the violation, separate from the original mail dispute.",
      },
      {
        quote: "You were a 1099 contractor, not a W-2 employee.",
        pill: "Misclassification",
        rebuttal:
          "<strong>Rebuttal:</strong> apply the IRS 20-factor test or the ABC test (most states). If you had set hours, supervised work, employer-provided tools, ongoing relationship, and were paid hourly or salary, you were an employee. The misclassification is a separate (and usually bigger) wage claim. File IRS Form SS-8 to formalize the determination.",
      },
      {
        quote: "We don't have your forwarding address.",
        pill: "Address",
        rebuttal:
          "<strong>Rebuttal:</strong> the IRS requires employers to make reasonable efforts. If you provided your address in writing (forwarding-address notice, certified-mail letter), the burden was on them to use it. Bring that proof.",
      },
    ],
  },

  outcomes: {
    h2: { pre: "How much do workers ", em: "actually win", post: "?" },
    lede:
      "Typical recovery in W-2 small-claims cases. Numbers stay small unless misclassification is in play.",
    bands: [
      {
        label: "Low",
        range: "$100 to $500",
        body:
          "<strong>Documented direct costs.</strong> Tax-prep increase, postage, certified mail. The court awards what you can prove with receipts.",
        tier: "low",
      },
      {
        label: "Mid",
        range: "$500 to $2,000",
        body:
          "<strong>Costs plus IRS penalties.</strong> When the missing W-2 caused you to file late and pay penalties, the penalties join the prep costs.",
        tier: "mid",
      },
      {
        label: "High",
        range: "$2,000 to $20,000+",
        body:
          "<strong>Misclassification turns it into a wage case.</strong> If you were treated as 1099 but were really an employee, unpaid overtime, minimum wage, and FLSA liquidated damages can push the case to the cap.",
        tier: "high",
      },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede:
      "The IRS does most of the work. Small claims is for your out-of-pocket costs.",
    cards: [
      {
        title: "IRS (1-800-829-1040)",
        pillLabel: "Free, federal",
        pillTier: "primary",
        whenItFits:
          "first call to make. After February 14, the IRS contacts the employer directly and assesses per-form penalties. They also send you Form 4852 so you can file your taxes on time.",
        tradeoff:
          "the IRS does not pay you back for your prep costs. The penalty goes to the federal government, not to you.",
      },
      {
        title: "Form SS-8 (worker classification)",
        pillLabel: "Free, IRS",
        pillTier: "good",
        whenItFits:
          "you suspect you were misclassified as a 1099 contractor. Form SS-8 asks the IRS to determine whether you were really an employee. The result can unlock unpaid wages, overtime, and FLSA damages.",
        tradeoff:
          "long process. The determination can take several months. While you wait, the wage clock keeps ticking.",
      },
      {
        title: "Small claims (this guide)",
        pillLabel: "Best for documented costs",
        pillTier: "primary",
        whenItFits:
          "you have receipts for tax-prep increase, IRS penalties, or other costs caused by the missing W-2. Small claims is fast and cheap for these documented direct damages.",
        tradeoff:
          "30 to 90 day timeline. Filing fee around $50 to $100. Cap usually $5,000 to $20,000.",
      },
    ],
  },

  cta: {
    h2: { pre: "Recover your ", em: "documented costs", post: "." },
    body:
      "While the IRS handles the federal penalty, you can recover your own costs in small claims. Our generator builds a demand letter that cites IRC § 6051 in under two minutes.",
    receipt: {
      label: "example · documented W-2 costs",
      items: [
        { label: "Tax-prep & accountant fees", amount: "$300" },
        { label: "IRS late-filing penalty", amount: "+ $400" },
        { label: "Filing fee + interest", amount: "+ $150" },
      ],
      total: "$850",
      totalLabel: "Total claim",
      note: "Illustrative. Misclassification cases can run much higher if unpaid wages are uncovered.",
    },
  },

  faqs: [
    {
      q: "When is my W-2 supposed to arrive?",
      a: "Employers must furnish W-2s by January 31 of the following tax year. Most send them by mail or make them available electronically. If you have not received yours by mid-February, contact the employer first, then call the IRS at 1-800-829-1040.",
    },
    {
      q: "What do I do if my employer never sent my W-2?",
      a: "Three steps: (1) request a duplicate from the employer, ideally by certified mail; (2) if no response by February 14, call the IRS at 1-800-829-1040; (3) file Form 4852 (substitute W-2) so you can still file your taxes on time. Then sue in small claims for any out-of-pocket costs.",
    },
    {
      q: "What is Form 4852?",
      a: "Form 4852 is the IRS substitute for a missing or incorrect W-2. You fill it in using your year-to-date paystub totals (wages, federal withholding, FICA). Attach it to your tax return. The IRS uses it to process your return without the actual W-2.",
    },
    {
      q: "What is the difference between a 1099 and a W-2?",
      a: "A W-2 reports wages for an employee (the employer withholds taxes and pays half of FICA). A 1099 reports payments to an independent contractor (no withholding, contractor pays self-employment tax). Misclassifying an employee as a 1099 contractor is a serious violation and often hides unpaid wages.",
    },
    {
      q: "Can I sue if I think I should have gotten a W-2 instead of a 1099?",
      a: "Yes, and it is usually a bigger case. File IRS Form SS-8 to ask the IRS to determine your classification. If you were really an employee, you may be owed unpaid overtime, minimum-wage difference, FLSA liquidated damages, and your share of FICA the employer should have paid.",
    },
    {
      q: "How long do I have to sue?",
      a: "Standard breach-of-statutory-duty claims usually run 2 to 4 years depending on state. The IRS has its own clock (3 years for most W-2 issues). Move fast: pay records get harder to reconstruct over time.",
    },
    {
      q: "Will my employer get in trouble with the IRS?",
      a: "Yes, separate from your small-claims case. The IRS imposes per-form penalties (currently around $310 per missing W-2 in 2025, with caps based on company size). Repeated failures can trigger employment-tax audits.",
    },
  ],

  relatedSlugs: [
    "unpaid-wages",
    "last-paycheck",
    "stolen-tips",
    "wrongful-termination",
    "fired-without-warning",
    "retaliation",
  ],
};

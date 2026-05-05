import type { EmployerIssue } from "./types";

export const wrongfulTermination: EmployerIssue = {
  slug: "wrongful-termination",
  ready: true,
  short: "Wrongful termination",
  breadcrumbLabel: "Wrongful termination",

  meta: {
    title: "Can I Sue My Employer for Wrongful Termination? Small Claims Guide",
    description:
      "Plain-English guide to wrongful termination. What it actually means in your state, what you can claim, when small claims is the right court, and a demand-letter template that gets a response.",
  },

  hero: {
    eyebrowSuffix: "Wrongful termination",
    h1: { pre: "Can I sue my employer for ", em: "wrongful termination", post: "?" },
    leadStrong: "Yes, in some cases. The hard part is knowing which court.",
    leadBody:
      " Most states are at-will, which means an employer can fire you for almost any reason, as long as the reason is not illegal. Wrongful termination means you were fired for a reason the law puts off-limits: discrimination, retaliation for whistleblowing or filing a workers' comp claim, refusing to break the law, or breach of an employment contract. Small claims fits when your damages are within your state's cap (usually $5,000 to $20,000) and the dispute is mostly about owed wages, severance, or unpaid bonuses.",
  },

  counter: {
    amount: 7200,
    meta: "At-will exception · contract or public policy",
    rows: [
      { label: "Lost wages (4 wks)", value: "$4,000" },
      { label: "Severance promised", value: "+ $3,000", emphasis: "accent" },
      { label: "Filing fee + interest", value: "$200", emphasis: "muted" },
    ],
    footer: "Within most state small-claims caps",
  },

  whatCounts: {
    h2: { pre: "What counts as ", em: "wrongful termination", post: "?" },
    lede:
      "Four common categories. Each one is a real exception to at-will employment. If your firing fits any of them, you may have a case.",
    cards: [
      {
        num: "01",
        title: "Discrimination",
        body:
          "You were fired because of your race, color, religion, sex (including pregnancy), national origin, age (40 or older), disability, or genetic information. Federal law covers all of these. Most states add more, like sexual orientation, gender identity, marital status, or political belief. Discrimination claims usually need an EEOC charge first, and damages often outgrow small claims.",
      },
      {
        num: "02",
        title: "Retaliation",
        body:
          "You were fired for doing something the law protects. Reporting harassment, filing a workers' comp claim, requesting FMLA leave, joining a union, or reporting illegal company conduct (whistleblowing). The closer the firing is in time to the protected act, the stronger the case.",
      },
      {
        num: "03",
        title: "Public policy violation",
        body:
          "You were fired for serving on a jury, voting, refusing to commit a crime your boss told you to commit, or exercising a clear legal right. Almost every state recognizes this exception, and the bar for proof is lower than discrimination cases.",
      },
      {
        num: "04",
        title: "Breach of contract",
        body:
          "You had a written employment contract, a fixed term, or a clear handbook policy that the employer broke. Severance promised in writing but not paid. A multi-year contract ended early without cause. These are the cleanest small-claims cases because the math is clear.",
      },
    ],
    note: {
      strongIntro: "At-will is the default in 49 states.",
      rest:
        " Montana is the only state that requires good cause to fire after a probation period. Everywhere else, your employer can fire you for any reason or no reason. You only have a wrongful-termination claim if the reason fits one of the categories above.",
    },
  },

  claim: {
    h2: { pre: "How much can you sue your ", em: "employer", post: " for?" },
    lede:
      "The clean number is what you actually lost. Documented losses win. Speculative losses get cut. Bring math the judge can verify.",
    layers: [
      {
        tag: "Layer 1",
        title: "Lost wages",
        body:
          "From the day you were fired until you found new work, or until the day you reasonably should have. Most courts expect you to look for similar work and credit you for the search.",
        amount: "$4,000",
      },
      {
        tag: "Layer 2",
        title: "Severance and accrued pay",
        body:
          "Severance promised in writing or by past practice. Accrued vacation or PTO if your state requires payout (most do). Earned commissions and pro-rated bonuses.",
        amount: "+ $3,000",
        accent: true,
      },
      {
        tag: "Layer 3",
        title: "Filing fees and interest",
        body:
          "Small-claims filing fee, service-of-process cost, and pre-judgment interest at your state's legal rate (usually 4 to 10 percent per year).",
        amount: "+ $200",
      },
    ],
    total: {
      label: "Sample total within small-claims cap",
      body:
        "Four weeks of lost wages, severance promised but not paid, plus fees and interest.",
      amount: "$7,200",
      sublabel: "illustrative · varies by state and facts",
    },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede:
      "Many wrongful-termination disputes settle before anyone files. A real demand letter cites the legal theory by name, lays out the dollar math, and gives a deadline. HR usually loops in a lawyer fast, who often advises paying rather than fighting it out in court.",
    checklist: [
      "The reason you were fired and the legal theory (discrimination, retaliation, public policy, or breach of contract)",
      "The exact amount you are owed (lost wages, severance, accrued PTO, owed bonus)",
      "The statute or contract section you are relying on",
      "A 14-day deadline before you file",
      "Sent certified mail with return receipt to HR or the registered agent",
    ],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3561",
      date: "May 5, 2026",
      recipientName: "Apex Logistics Inc., HR Department",
      recipientAddress: "500 Industrial Way, Phoenix, AZ 85003",
      reLine: "Demand for Severance and Lost Wages, employment ended April 18, 2026",
      bodyParagraphs: [
        "I was terminated on April 18, 2026 after I reported to HR that my supervisor was instructing me to skip required safety inspections. That report is protected activity under federal whistleblower law and Arizona public policy. The termination was wrongful retaliation.",
        "I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Payment of <strong>$3,000</strong> in severance promised in my offer letter dated January 14, 2024;",
        "Payment of <strong>$4,000</strong> in lost wages from April 18 through May 16, 2026.",
      ],
      closingLine:
        "Total demand: <strong>$7,000.00</strong>. If unresolved, I will file in Small Claims Court and pursue all available statutory damages.",
      signatory: "Jordan A. Smith",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " a small-claims case against your employer." },
    lede:
      "Four steps. Most plaintiffs do this without a lawyer. The format is built for self-represented people.",
    steps: [
      {
        title: "Prepare",
        body:
          "Gather your offer letter, employment contract, employee handbook, last paystub, termination email or letter, HR communications, and any text or email proving the real reason you were fired. Calculate lost wages and severance owed.",
      },
      {
        title: "File",
        body:
          "File a small-claims complaint in the county where the employer's main office is located, or where you worked. Filing fees usually run $30 to $100. Your state's claim form has a name like SC-100 (California) or DC-CV-001 (Maryland).",
      },
      {
        title: "Serve",
        body:
          "Sheriff, certified mail through the clerk, or a private process server. You cannot serve it yourself. Serve the employer's registered agent (look it up on the secretary of state website) for the safest delivery. File proof of service before the hearing.",
      },
      {
        title: "Hearing",
        body:
          "Lead with the legal theory, the dollar math, and your paper trail. Hearings usually run 10 to 15 minutes. Most judges rule from the bench or send a written ruling within a few days.",
      },
    ],
    aftermath: {
      tag: "After you win",
      title: "Collecting from an employer.",
      bodyHtml:
        "Most employers pay voluntarily within 30 days, especially if they have business licenses or government contracts to protect. After that, you have three enforcement tools: a <strong>judgment lien</strong> recorded against the company&rsquo;s real estate, a <strong>bank levy</strong> on a corporate account if you can identify it, and a <strong>writ of execution</strong> on business assets like equipment or accounts receivable. Pre- and post-judgment interest runs at your state&rsquo;s legal rate.",
    },
  },

  evidence: {
    h2: { pre: "What evidence do you need to ", em: "sue your employer", post: "?" },
    lede:
      "Wrongful-termination cases turn on documents and timing. Bring originals plus copies for the judge and the employer.",
    // Legacy fallback (unused once cells is set, but required by the schema).
    photos: [],
    texts: [],
    receipt: {
      vendor: "",
      vendorAddr: "",
      receiptNum: "",
      date: "",
      lineItems: [],
      subtotal: "",
      total: "",
      footer: "",
    },
    cells: [
      // Slot 1 (tall left): the termination letter itself.
      {
        kind: "letter",
        tag: "Termination letter",
        letterhead: "Apex Logistics Inc. · HR",
        date: "April 18, 2026",
        recipientName: "Jordan A. Smith",
        recipientAddress: "1422 N 7th Ave, Phoenix, AZ",
        reLine: "Notice of Termination",
        bodyParagraphs: [
          "This letter confirms the termination of your employment, effective today, April 18, 2026.",
          "Final pay will be deposited per the standard schedule. Your access badges and equipment must be returned by end of day. We wish you the best.",
        ],
        signatory: "Pat Reyes",
        signatoryTitle: "Senior HR Business Partner",
      },
      // Slot 2 (mid top): HR text exchange where the timing is in the open.
      {
        kind: "texts",
        tag: "HR thread",
        texts: [
          { dir: "in", text: "Just got told I'm being let go on Friday. They said no reason." },
          { dir: "out", text: "What? You just reported the safety issue last week." },
          { dir: "in", text: "Right. They said it's unrelated. I have everything in writing." },
        ],
      },
      // Slot 3 (mid bottom): the offer letter / contract page.
      {
        kind: "document",
        tag: "Offer letter",
      },
      // Slot 4 (tall right): the final paystub showing the unpaid PTO line.
      {
        kind: "paystub",
        tag: "Final paystub",
        employer: "APEX LOGISTICS INC.",
        employerAddr: "500 Industrial Way · Phoenix, AZ",
        payPeriod: "Pay period 04/01 to 04/15/2026",
        payDate: "Paid 04/18/2026",
        earnings: [
          { label: "Regular hours (80)", amount: "$2,000.00" },
          { label: "Overtime (8)", amount: "$300.00" },
          { label: "Accrued PTO (40 hrs)", amount: "$0.00" },
        ],
        deductions: [
          { label: "Federal tax", amount: "-$280.00" },
          { label: "FICA", amount: "-$176.00" },
          { label: "State tax", amount: "-$92.00" },
        ],
        gross: "$2,300.00",
        net: "$1,752.00",
        footer: "Note: 40 hrs accrued PTO not paid out",
      },
    ],
  },

  defenses: {
    h2: { pre: "Common employer ", em: "defenses", post: ", with rebuttals." },
    lede:
      "Three arguments cover most of what employers say at the hearing. Each has a clean rebuttal if your paperwork is in order.",
    items: [
      {
        quote: "You were an at-will employee. We don't need a reason.",
        pill: "Most common",
        rebuttal:
          "<strong>Rebuttal:</strong> at-will has exceptions, and yours fits one. Name the exception (discrimination, retaliation, public policy, or contract) and tie it to specific dates and documents. The judge does not need to find malice, only that the firing fits a recognized exception.",
      },
      {
        quote: "You were fired for performance, not for the protected reason.",
        pill: "Pretext",
        rebuttal:
          "<strong>Rebuttal:</strong> bring your performance reviews. If they were positive up to the moment you reported the issue or asserted the right, the timing is your case. Add comparator employees (other workers with similar performance who were not fired) if you have them.",
      },
      {
        quote: "You signed a release when you accepted severance.",
        pill: "Release",
        rebuttal:
          "<strong>Rebuttal:</strong> read the release carefully. Federal law (the Older Workers Benefit Protection Act) requires special language for age-discrimination releases, and many releases skip it. State law often invalidates a release signed without consideration beyond what you were already owed. If the company is fighting hard about the release, that is a sign it has problems.",
      },
    ],
  },

  outcomes: {
    h2: { pre: "How much do workers ", em: "actually win", post: "?" },
    lede:
      "Typical recovery ranges in small-claims wrongful-termination cases. Bigger cases (with discrimination, six-figure damages, or punitive claims) usually need a higher court and a contingency-fee employment lawyer.",
    bands: [
      {
        label: "Low",
        range: "$500 to $2,000",
        body:
          "<strong>Partial wages or owed pay.</strong> The judge agrees you were owed something but the amount was disputed. Common when the firing was murky and your paper trail is light.",
        tier: "low",
      },
      {
        label: "Mid",
        range: "$2,000 to $8,000",
        body:
          "<strong>Wages plus severance owed.</strong> The most common small-claims outcome when the employer broke a clear contract or written promise. Filing fee on top.",
        tier: "mid",
      },
      {
        label: "High",
        range: "$8,000 to $20,000+",
        body:
          "<strong>Cap-of-the-court judgments.</strong> Strong public-policy or contract cases that hit the small-claims ceiling. If your damages exceed the cap, file in regular civil court instead.",
        tier: "high",
      },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede:
      "Small claims fits some wrongful-termination cases but not all. Three other paths cover the rest.",
    cards: [
      {
        title: "EEOC charge",
        pillLabel: "Required for federal discrimination",
        pillTier: "warn",
        whenItFits:
          "your firing was based on race, sex, age, religion, disability, or another federally protected category. You must file a charge with the EEOC (or your state's fair employment agency) before suing in court. Deadline is usually 180 days, extended to 300 in many states.",
        tradeoff:
          "long process. EEOC investigation can take a year. After they issue a 'right to sue' letter, you go to federal or state court, usually with an attorney.",
      },
      {
        title: "Small claims (this guide)",
        pillLabel: "Best for clean money disputes",
        pillTier: "primary",
        whenItFits:
          "your damages are under your state's cap, and the dispute is mostly about wages, severance, accrued PTO, or contract breach. Public-policy retaliation cases also fit when damages are bounded.",
        tradeoff:
          "30 to 90 day timeline. Filing fee around $50 to $100. Cap usually $5,000 to $20,000 depending on state.",
      },
      {
        title: "Plaintiff's employment attorney",
        pillLabel: "Damages over $20,000",
        pillTier: "good",
        whenItFits:
          "lost wages and damages exceed your small-claims cap, the firing involved discrimination or harassment, or you have evidence of company-wide patterns (class-action territory).",
        tradeoff:
          "longer timeline (often a year or more). Most employment attorneys take strong cases on contingency, taking 33 to 40 percent of the recovery. No upfront fees in those cases.",
      },
    ],
  },

  cta: {
    h2: { pre: "Recover what's ", em: "actually owed", post: "." },
    body:
      "Many wrongful-termination disputes settle once a real demand letter arrives. Real ones cite the legal theory, lay out the dollar math, and give a deadline. Our generator builds yours in under two minutes.",
    receipt: {
      label: "example · public-policy retaliation",
      items: [
        { label: "Lost wages (4 weeks)", amount: "$4,000" },
        { label: "Severance promised", amount: "+ $3,000" },
        { label: "Filing fee + interest", amount: "+ $200" },
      ],
      total: "$7,200",
      totalLabel: "Total claim",
      note:
        "Illustrative. Your number depends on state, contract terms, and how clear the firing reason was.",
    },
  },

  faqs: [
    {
      q: "What is at-will employment?",
      a: "Forty-nine states default to at-will employment, which means your employer can fire you for any reason or no reason, as long as the reason is not illegal. Illegal reasons include discrimination based on a protected category, retaliation for protected activity, refusing to violate the law, and breach of an employment contract. Montana is the only state that requires good cause to fire after a probation period.",
    },
    {
      q: "Can I sue my employer for being fired without cause?",
      a: "Usually no. In an at-will state, your employer does not need a reason to fire you. You can sue only if the firing fits a recognized exception: discrimination, retaliation, public-policy violation, or breach of contract. If your contract or handbook specifically promises termination only for cause, that may give you a contract claim.",
    },
    {
      q: "What is the difference between wrongful termination and unfair termination?",
      a: "Wrongful termination has a specific legal meaning. It means the firing broke a law or contract. Unfair termination is everyday language for a firing that feels wrong but does not fit a legal exception. The court only deals with wrongful termination.",
    },
    {
      q: "How long do I have to sue for wrongful termination?",
      a: "It depends on the legal theory. Federal discrimination claims require an EEOC charge within 180 days (300 days in most states), and after that you have 90 days from the right-to-sue letter to file in court. Public-policy claims usually run 2 to 3 years. Breach of contract is typically 3 to 6 years. Move fast either way.",
    },
    {
      q: "Do I need to file with the EEOC first?",
      a: "Only if your claim is based on federal discrimination law (Title VII, ADEA, ADA). For breach of contract, public-policy retaliation, unpaid wages, and most state-law claims, you can go straight to court. Some states have a parallel agency requirement (California's CRD, New York's DHR). Check your state.",
    },
    {
      q: "Can I sue if I signed a severance release?",
      a: "Sometimes. Releases are not always enforceable. Federal age-discrimination releases require specific language under the Older Workers Benefit Protection Act. Releases signed under duress or without 'consideration' (something extra you were not already owed) can be invalid. Have a lawyer read it before deciding to fight.",
    },
    {
      q: "What if I was fired during my probation period?",
      a: "Probation is not a special legal status in most states. The same exceptions to at-will apply: discrimination, retaliation, public policy, contract breach. Some employer handbooks promise different process for probationary employees. If yours did and the company did not follow it, that may be a contract claim.",
    },
    {
      q: "Do I need a lawyer to sue my employer?",
      a: "Not for small claims. Most plaintiffs file and represent themselves. Some states (California, for example) do not even allow lawyers at the initial small-claims hearing. For cases that exceed the small-claims cap or involve discrimination, plaintiff's employment lawyers usually take strong cases on contingency.",
    },
  ],

  relatedSlugs: [
    "retaliation",
    "unpaid-wages",
    "last-paycheck",
    "hostile-work-environment",
    "fired-without-warning",
    "emotional-distress",
  ],
};

import type { EmployerIssue } from "./types";

export const hostileWorkEnvironment: EmployerIssue = {
  slug: "hostile-work-environment",
  ready: true,
  short: "Hostile work environment",
  breadcrumbLabel: "Hostile work environment",

  meta: {
    title: "Can I Sue My Employer for a Hostile Work Environment After I Quit?",
    description:
      "Plain-English guide to constructive discharge. When the workplace was so hostile you had to quit, when it counts as wrongful termination, and what small claims can recover.",
  },

  hero: {
    eyebrowSuffix: "Hostile work environment",
    h1: { pre: "Can I sue my employer for a ", em: "hostile work environment after I quit", post: "?" },
    leadStrong: "Sometimes. The legal name is constructive discharge.",
    leadBody:
      " When workplace conditions are so hostile that any reasonable person would feel forced to quit, the law treats your resignation as a termination. The hard part: 'a bad boss' is not enough. The hostility usually has to be tied to a protected category (race, sex, religion, age, disability, pregnancy, etc.) for federal law to help. Pure interpersonal cruelty without a discrimination link is rarely actionable. Small claims fits when damages are within your state's cap.",
  },

  counter: {
    amount: 5500,
    meta: "Constructive discharge · Title VII / state FEPA",
    rows: [
      { label: "Lost wages (8 wks)", value: "$4,000" },
      { label: "Therapy & medical", value: "+ $1,000", emphasis: "accent" },
      { label: "Filing fee + interest", value: "$500", emphasis: "muted" },
    ],
    footer: "Sample · sex-based hostile environment",
  },

  whatCounts: {
    h2: { pre: "What counts as a ", em: "hostile work environment", post: "?" },
    lede:
      "Four elements have to line up. The bar is high on purpose: 'unpleasant' or 'difficult' is not enough.",
    cards: [
      {
        num: "01",
        title: "Tied to a protected category",
        body:
          "Federal law (Title VII, ADEA, ADA, PWFA) protects against hostility based on race, color, religion, sex, sexual orientation, gender identity, pregnancy, national origin, age (40+), disability, or genetic information. Most states add more categories. The hostility has to be because of one of these, not just a personality clash.",
      },
      {
        num: "02",
        title: "Severe or pervasive conduct",
        body:
          "A single severe incident (sexual assault, slur from a manager) can meet the standard. Otherwise, the conduct usually has to be repeated and pervasive. Isolated rude comments, occasional sarcasm, or a tough-but-equal-opportunity boss generally do not count.",
      },
      {
        num: "03",
        title: "A reasonable person would have quit",
        body:
          "Constructive discharge requires conditions so intolerable that a reasonable person in your position would have felt forced to resign. Many courts ask: did you give the employer a chance to fix it before you quit? Internal complaints, HR reports, and certified-mail letters help meet this requirement.",
      },
      {
        num: "04",
        title: "You quit because of the hostility",
        body:
          "Your resignation has to be linked to the hostility, not to a better job offer or unrelated life event. Document the timeline and explicitly cite the hostility in your resignation letter (this is critical for the legal theory).",
      },
    ],
    note: {
      strongIntro: "Title VII requires an EEOC charge first.",
      rest:
        " Discrimination-based hostile environment cases under federal law require a charge with the EEOC (or state fair-employment agency) before you sue. The deadline is 180 days, extended to 300 days in most states. Public-policy and state-only claims sometimes go straight to court. Check your state.",
    },
  },

  claim: {
    h2: { pre: "What can you ", em: "claim", post: "?" },
    lede:
      "Lost wages from quitting before securing new work. Therapy or medical costs tied to the hostility. Plus statutory damages where available.",
    layers: [
      {
        tag: "Layer 1",
        title: "Lost wages from constructive discharge",
        body:
          "From the day you quit until you found new work or could reasonably have found work. Mitigation matters: courts expect you to look for similar work after resigning.",
        amount: "$4,000",
      },
      {
        tag: "Layer 2",
        title: "Therapy and medical costs tied to the hostility",
        body:
          "Therapy bills, anxiety or PTSD treatment, prescriptions, and lost work tied to medical appointments. Documented bills with provider notes connecting the treatment to workplace conditions.",
        amount: "+ $1,000",
        accent: true,
      },
      {
        tag: "Layer 3",
        title: "Filing fees, attorney fees, interest",
        body:
          "Federal civil rights statutes shift attorney fees to the loser. State FEPA laws often do too. Public-policy claims vary.",
        amount: "+ $500",
      },
    ],
    total: {
      label: "Sample total within small-claims cap",
      body:
        "Eight weeks of lost wages plus documented therapy and medical costs, plus filing fees and pre-judgment interest.",
      amount: "$5,500",
      sublabel: "illustrative · varies by state and provable harm",
    },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede:
      "Constructive-discharge demand letters are most effective when they cite the EEOC charge (or state agency filing) and a clear timeline of internal complaints. Most cases settle once HR sees the documented escalation.",
    checklist: [
      "The protected category and the conduct (with dates)",
      "Internal complaints you made (HR reports, manager emails, certified-mail letters)",
      "Your resignation letter that cited the hostility",
      "EEOC charge number or state-agency case number (if filed)",
      "The dollar math: lost wages, therapy bills, related costs",
      "A 14-day deadline before you file",
      "Sent certified mail with return receipt",
    ],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3569",
      date: "May 5, 2026",
      recipientName: "Vanguard Marketing LLC",
      recipientAddress: "650 Tower Drive, Charlotte, NC 28202",
      reLine: "Demand for Lost Wages, Constructive Discharge on March 14, 2026",
      bodyParagraphs: [
        "I resigned from Vanguard Marketing on March 14, 2026 after my supervisor's repeated sex-based comments and exclusion of women from client meetings created an environment any reasonable person would find intolerable. I made three documented HR complaints (Jan 8, Jan 22, Feb 12, 2026) before resigning. EEOC charge number 480-2026-04217 has been filed.",
        "I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Payment of <strong>$4,000</strong> in lost wages from March 14 through May 9, 2026;",
        "Reimbursement of <strong>$1,000</strong> in therapy and medical costs documented in the attached records.",
      ],
      closingLine:
        "Total demand: <strong>$5,000.00</strong>. If unresolved, I will file in Small Claims Court and pursue the EEOC matter to a right-to-sue letter.",
      signatory: "Morgan Bailey",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " a constructive-discharge case." },
    lede:
      "Four steps. EEOC happens in parallel for federal claims and is usually a prerequisite.",
    steps: [
      {
        title: "File EEOC or state-agency charge first",
        body:
          "If your hostility was based on a federally protected category, file with the EEOC (or state fair-employment agency) within 180 days (300 in most states). The agency investigates and can issue a right-to-sue letter, which is required before federal court. Some state-only or public-policy claims can skip this step.",
      },
      {
        title: "Prepare for small claims",
        body:
          "Gather your HR complaints (with dates), your resignation letter (citing the hostility), paystubs showing lost wages, therapy and medical bills, and any text or email documenting the conduct.",
      },
      {
        title: "File and serve",
        body:
          "File a small-claims complaint in the county where the employer's main office is located, or where you worked. Filing fees usually run $30 to $100. Serve the registered agent.",
      },
      {
        title: "Hearing",
        body:
          "Lead with the timeline: conduct, internal complaints, no resolution, your resignation, EEOC charge. Show one or two specific incidents that establish severity. Hearings usually run 10 to 15 minutes.",
      },
    ],
    aftermath: {
      tag: "After you win",
      title: "Collecting on a constructive-discharge judgment.",
      bodyHtml:
        "Most employers pay voluntarily within 30 days, especially when EEOC has the matter open. After that, the enforcement tools are a <strong>judgment lien</strong> on company real estate, a <strong>bank levy</strong> on a corporate account, and a <strong>writ of execution</strong> on business assets. Pre- and post-judgment interest runs at your state&rsquo;s legal rate.",
    },
  },

  evidence: {
    h2: { pre: "What evidence do you need to ", em: "sue your employer", post: "?" },
    lede:
      "These cases turn on documented internal complaints and a resignation letter that cites the hostility. Without those, the constructive-discharge argument is much harder.",
    photos: [],
    texts: [],
    receipt: {
      vendor: "", vendorAddr: "", receiptNum: "", date: "",
      lineItems: [], subtotal: "", total: "", footer: "",
    },
    cells: [
      {
        kind: "letter",
        tag: "Resignation letter",
        letterhead: "Morgan Bailey",
        date: "March 14, 2026",
        recipientName: "Vanguard Marketing LLC, HR Department",
        recipientAddress: "650 Tower Drive, Charlotte, NC",
        reLine: "Resignation effective today",
        bodyParagraphs: [
          "I am resigning effective today, March 14, 2026. This resignation is forced. After three HR complaints over two months about my supervisor's sex-based comments and the exclusion of women from key client work, no corrective action was taken.",
          "The conditions any reasonable person would consider hostile have not been addressed. I cannot continue to perform under them.",
        ],
        signatory: "Morgan Bailey",
      },
      {
        kind: "texts",
        tag: "Documented incident",
        texts: [
          { dir: "out", text: "Why am I not on the Acme pitch? I led the prep." },
          { dir: "in", text: "Boss said it's a 'guy thing this round.' His words." },
          { dir: "out", text: "Sending a complaint to HR. This is the third time." },
        ],
      },
      {
        kind: "handbook",
        tag: "Anti-harassment policy",
        documentTitle: "Vanguard Marketing Employee Handbook · Section 8.1",
        sectionTitle: "Discrimination and Harassment",
        bodyParagraphs: [
          "Vanguard Marketing prohibits harassment on the basis of sex, race, religion, age, disability, or any protected category. All complaints will be investigated promptly.",
        ],
        highlight:
          "HR will respond to all formal complaints within 5 business days and complete investigations within 30 days.",
        footer: "Three complaints filed · zero responses",
      },
      {
        kind: "paystub",
        tag: "Last paystub",
        employer: "VANGUARD MARKETING LLC",
        employerAddr: "650 Tower Drive · Charlotte, NC",
        payPeriod: "Pay period 03/01 to 03/14/2026",
        payDate: "Final · paid 03/22/2026",
        earnings: [
          { label: "Salary (partial period)", amount: "$1,800.00" },
          { label: "Accrued PTO (16 hrs)", amount: "$420.00" },
        ],
        deductions: [
          { label: "Federal tax", amount: "-$280.00" },
          { label: "FICA", amount: "-$170.00" },
          { label: "State tax", amount: "-$92.00" },
        ],
        gross: "$2,220.00",
        net: "$1,678.00",
        footer: "Last paycheck before constructive discharge",
      },
    ],
  },

  defenses: {
    h2: { pre: "Common employer ", em: "defenses", post: ", with rebuttals." },
    lede:
      "Three arguments cover most constructive-discharge cases. Each has a clean rebuttal if your documented complaints are in your hand.",
    items: [
      {
        quote: "You quit voluntarily. We didn't fire you.",
        pill: "Most common",
        rebuttal:
          "<strong>Rebuttal:</strong> constructive discharge converts a quit into a termination when conditions were intolerable. Bring your three internal complaints, the lack of response, and your resignation letter that cited the conduct. Conditions plus warning equal constructive discharge.",
      },
      {
        quote: "It wasn't really that bad. You were oversensitive.",
        pill: "Severity",
        rebuttal:
          "<strong>Rebuttal:</strong> the standard is whether a reasonable person in your position would have found the conditions intolerable, not whether you personally did. Bring documented incidents (texts, witness statements, dated emails). Severity is judged by a reasonable-person standard.",
      },
      {
        quote: "You never gave us a chance to fix it.",
        pill: "Notice",
        rebuttal:
          "<strong>Rebuttal:</strong> bring your three HR complaints with dates and HR's responses (or lack of). The notice element is met when you reported and the employer did not act. If HR claimed to investigate but never reported back, that supports the case.",
      },
    ],
  },

  outcomes: {
    h2: { pre: "How much do workers ", em: "actually win", post: "?" },
    lede:
      "Typical recovery in small-claims constructive-discharge cases. Bigger discrimination cases usually need higher courts and a contingency-fee lawyer.",
    bands: [
      {
        label: "Low",
        range: "$500 to $2,500",
        body:
          "<strong>Partial wages.</strong> Court agrees on hostile environment but not constructive discharge. Recovers some lost wages tied to the hostility but reduces for resignation.",
        tier: "low",
      },
      {
        label: "Mid",
        range: "$2,500 to $8,000",
        body:
          "<strong>Lost wages plus documented harm.</strong> Most common when internal complaints, severity, and the resignation letter all line up cleanly.",
        tier: "mid",
      },
      {
        label: "High",
        range: "$8,000 to $20,000+",
        body:
          "<strong>Cap-of-the-court awards.</strong> Strong sex-based, race-based, or disability-based cases with extensive documentation. Pair with EEOC right-to-sue and state FEPA penalties.",
        tier: "high",
      },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede:
      "Constructive-discharge cases often run on multiple tracks. EEOC and state agencies handle the discrimination piece; small claims handles the dollar damages.",
    cards: [
      {
        title: "EEOC charge",
        pillLabel: "Required for federal claims",
        pillTier: "warn",
        whenItFits:
          "the hostility was tied to race, sex, age, religion, disability, or another federally protected category. EEOC charge required within 180 days (300 in most states) before federal-court suit.",
        tradeoff:
          "long process. EEOC investigation can take a year. After right-to-sue letter, you go to federal or state court, usually with an attorney.",
      },
      {
        title: "State fair-employment agency",
        pillLabel: "Often required at state level",
        pillTier: "warn",
        whenItFits:
          "your state has a fair-employment agency (California's CRD, New York's DHR, Texas's TWC). Most state discrimination claims require an agency filing first.",
        tradeoff:
          "agency timelines vary. Some states have stronger remedies than federal law (California adds emotional-distress damages and uncapped punitive damages).",
      },
      {
        title: "Small claims (this guide)",
        pillLabel: "Best for documented damages",
        pillTier: "primary",
        whenItFits:
          "your damages including therapy and lost wages fit your state's cap. Some state-only public-policy claims allow direct suit without agency exhaustion.",
        tradeoff:
          "30 to 90 day timeline. Filing fee around $50 to $100. Cap usually $5,000 to $20,000.",
      },
    ],
  },

  cta: {
    h2: { pre: "Recover what's ", em: "actually owed", post: "." },
    body:
      "Constructive-discharge demand letters work best when they cite the EEOC charge and a documented timeline of internal complaints. Our generator builds yours in under two minutes.",
    receipt: {
      label: "example · sex-based hostile environment",
      items: [
        { label: "Lost wages (8 weeks)", amount: "$4,000" },
        { label: "Therapy & medical", amount: "+ $1,000" },
        { label: "Filing fee + interest", amount: "+ $500" },
      ],
      total: "$5,500",
      totalLabel: "Total claim",
      note: "Illustrative. Your number depends on the protected category, severity, and documented internal complaints.",
    },
  },

  faqs: [
    {
      q: "What is a hostile work environment?",
      a: "A workplace where conduct (usually based on a protected category like race, sex, age, or disability) is severe or pervasive enough to alter the conditions of employment. The standard is high on purpose: an annoying boss or unpleasant coworker is not enough. The conduct has to be tied to a protected category and severe or pervasive.",
    },
    {
      q: "What is constructive discharge?",
      a: "When workplace conditions become so intolerable that any reasonable person would feel forced to quit. The law treats your resignation as a termination. To win, you usually have to show internal complaints (giving the employer a chance to fix it) and conditions that meet the reasonable-person standard.",
    },
    {
      q: "Can I sue for a hostile environment that was not based on race, sex, or another protected category?",
      a: "Usually no, under federal law. Title VII and similar statutes require the hostility to be tied to a protected category. A boss who is rude to everyone equally is generally not actionable. Some states (Montana, for example) have broader 'just cause' protections that can cover non-discriminatory hostility.",
    },
    {
      q: "Do I have to file with the EEOC first?",
      a: "If your claim is federal-discrimination based (Title VII, ADEA, ADA), yes. The EEOC charge has to be filed within 180 days (300 in most states). After their investigation, they issue a right-to-sue letter that lets you go to court. State and public-policy claims sometimes skip this step.",
    },
    {
      q: "How important is my resignation letter?",
      a: "Critical. Your resignation letter should explicitly cite the hostile conditions and reference your internal complaints. Without it, employers argue you quit for unrelated reasons. Vague 'pursuing other opportunities' language can damage your case.",
    },
    {
      q: "How long do I have to sue?",
      a: "EEOC charge: 180 days (300 in most states). After right-to-sue letter: 90 days to file in court. State agency claims: typically 1 year. Public-policy claims: 2 to 3 years. Constructive-discharge contract claims: 3 to 6 years. Move fast on EEOC especially.",
    },
    {
      q: "Will I have to face my old coworkers in court?",
      a: "In small claims, possibly the manager or HR rep representing the company. In bigger discrimination cases, depositions can include coworkers. Many cases settle before that point. Settlement agreements often include confidentiality.",
    },
  ],

  relatedSlugs: [
    "wrongful-termination",
    "retaliation",
    "emotional-distress",
    "fired-without-warning",
    "unpaid-wages",
    "unsafe-working-conditions",
  ],
};

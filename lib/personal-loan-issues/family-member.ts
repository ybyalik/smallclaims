import type { PersonalLoanIssue } from "./types";

export const familyMember: PersonalLoanIssue = {
  slug: "family-member",
  ready: true,
  short: "Family member owes money",
  breadcrumbLabel: "Family Member Owes Money",

  meta: {
    title: "Can I Sue a Family Member for Money Owed? Small Claims Guide",
    description:
      "Plain-English guide to suing a family member for an unpaid loan. The gift presumption between family, evidence requirements, and a demand-letter template.",
  },

  hero: {
    eyebrowSuffix: "Family member",
    h1: { pre: "Can I sue a family member for ", em: "money owed", post: "?" },
    leadStrong: "Yes, but most courts presume family transfers are gifts unless you prove otherwise.",
    leadBody:
      " Loans between family members face an extra hurdle: many states presume that money transferred between close family members is a gift. To overcome the presumption, you need clear evidence of loan terms (written agreement, texts about repayment, transfer notes saying 'loan'). The legal framework is the same as friend loans, but the gift presumption raises the documentation bar. Family relationships often survive better with mediation than litigation.",
  },

  counter: {
    amount: 11500,
    meta: "Oral contract + gift-presumption rebutted",
    rows: [
      { label: "Original loan", value: "$10,000" },
      { label: "Pre-judgment interest (3 years)", value: "+ $1,200", emphasis: "accent" },
      { label: "Filing fee", value: "$300", emphasis: "muted" },
    ],
    footer: "Sample · within most state small-claims caps",
  },

  whatCounts: {
    h2: { pre: "What kinds of family ", em: "loans", post: " are recoverable?" },
    lede: "Four common patterns. Each requires evidence stronger than the gift presumption.",
    cards: [
      { num: "01", title: "Written family loan agreement", body: "Strongest case. Signed promissory note or written agreement specifying terms. Many families use simple loan templates from accounting software. The written terms overcome the gift presumption immediately." },
      { num: "02", title: "Bank transfer with 'loan' designation", body: "Wire transfer or check with 'loan' in the memo line. The contemporaneous designation establishes intent. Plus follow-up texts about repayment timeline." },
      { num: "03", title: "Down-payment loans (often disputed)", body: "Common pattern: parent loans adult child money for house down payment. Often disputed later as the family relationship strains. Written agreement is essential to overcome gift presumption in these cases." },
      { num: "04", title: "Repeated cash advances with promise to repay", body: "Pattern of advances 'between paydays' with text or verbal promises. Cumulative pattern can support recovery. Each instance is its own claim." },
    ],
    note: { strongIntro: "The gift presumption is real.", rest: " Most states presume that money transferred between close family members (parent-child, spouse-spouse, sibling-sibling) is a gift unless there's clear contrary evidence. The burden is on you to prove it was a loan. Written documentation and transfer-note designations are the cleanest ways to overcome the presumption." },
  },

  claim: {
    h2: { pre: "How much can you ", em: "claim", post: "?" },
    lede: "Original principal plus pre-judgment interest plus filing fees.",
    layers: [
      { tag: "Layer 1", title: "Original loan amount", body: "Bank transfer record, check copy, Venmo/Zelle/Cash App receipt. Cash transfers are harder but recoverable with witness testimony plus follow-up texts.", amount: "$10,000" },
      { tag: "Layer 2", title: "Pre-judgment interest", body: "State legal rate (typically 7 to 10 percent per year) running from agreed repayment date. On larger family loans this adds up significantly.", amount: "+ $1,200", accent: true },
      { tag: "Layer 3", title: "Filing fees, post-judgment interest", body: "Filing fee, service-of-process cost. Small-claims fees scale with claim amount in some states.", amount: "+ $300" },
    ],
    total: { label: "Sample total within small-claims cap", body: "$10,000 family loan plus 3 years pre-judgment interest at 4 percent, plus filing fee.", amount: "$11,500", sublabel: "illustrative · varies by state and term" },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede: "Family demand letters carry extra weight because they make the relationship dynamics formal. Most family disputes settle at this stage to avoid courthouse appearances and family-wide fallout.",
    checklist: [
      "Date and amount of the loan",
      "Bank transfer record or check copy",
      "Texts confirming the loan and terms",
      "Any partial payments or written acknowledgments",
      "Pre-judgment interest calculation",
      "A 30-day deadline before you file (longer for family)",
      "Sent certified mail",
    ],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3612",
      date: "May 5, 2026",
      recipientName: "Cousin Smith",
      recipientAddress: "1424 Maple Lane, Sacramento, CA 95816",
      reLine: "Demand for Repayment of $10,000 Family Loan from January 14, 2023",
      bodyParagraphs: [
        "On January 14, 2023, I lent you $10,000 via wire transfer with the memo 'Family loan — repay 24 months'. Three years and four months have passed without any repayment. I asked verbally on multiple occasions and via text on June 14, 2024, January 22, 2025, and February 18, 2026 (screenshots attached).",
        "I demand within <strong>thirty (30) days</strong>:",
      ],
      demandList: [
        "Repayment of <strong>$10,000</strong> in original principal;",
        "Pre-judgment interest at 4 percent per year for 3 years (<strong>$1,200</strong>).",
      ],
      closingLine: "Total demand: <strong>$11,200.00</strong>. If unresolved, I will file in Small Claims Court despite our family relationship.",
      signatory: "Reese Q. Lender",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " against a family member." },
    lede: "Four steps. Documentation overcoming the gift presumption is the spine.",
    steps: [
      { title: "Gather the evidence", body: "Bank transfer record (memo line is critical), texts confirming loan terms, any written agreement. Family loans often have less documentation than friend loans; gather what you have." },
      { title: "Send certified-mail demand", body: "30-day deadline (longer than usual for family). Many family disputes resolve at the demand stage to avoid family-wide fallout." },
      { title: "File in small claims", body: "If demand fails, file. Filing fees usually run $30 to $200 depending on amount. File in the county where the family member lives." },
      { title: "Hearing", body: "Lead with the documentation overcoming the gift presumption: bank memo, written agreement, texts. Hearings usually run 10 to 15 minutes." },
    ],
    aftermath: { tag: "After you win", title: "Collecting from family.", bodyHtml: "Money judgments enforce via <strong>judgment lien</strong>, <strong>bank levy</strong>, and <strong>writ of execution</strong>. Wage garnishment is also available. Family judgments are awkward to collect on but legally identical to any other judgment. Family fallout is usually significant; budget for that emotionally." },
  },

  evidence: {
    h2: { pre: "What evidence do you need to ", em: "sue family", post: "?" },
    lede: "Documentation overcoming the gift presumption is the case.",
    cells: [
      { kind: "letter", tag: "Bank transfer record", letterhead: "Wells Fargo · Wire transfer record", date: "January 14, 2023", recipientName: "Reese Lender", reLine: "Outgoing wire $10,000", bodyParagraphs: [
        "Wire transfer to Cousin Smith, account 5678 at Bank of America.",
        "Memo: 'Family loan — repay 24 months per agreement'.",
        "Status: Confirmed. Available 01/15/2023.",
      ], signatory: "Wells Fargo platform record", signatoryTitle: "Bank-generated record" },
      { kind: "texts", tag: "Loan terms in writing", texts: [
        { dir: "in", text: "Reese — short on the down payment. Can you spot me $10k? I'll pay back over 2 years, $500/month with interest." },
        { dir: "out", text: "I'll wire you tomorrow. 24-month repayment plan. We'll figure out the schedule." },
        { dir: "in", text: "Thank you so much. This means so much. I will pay you back, promise." },
      ] },
      { kind: "handbook", tag: "Gift presumption", documentTitle: "California Family Code · § 760", sectionTitle: "Family transfer · presumption of gift", bodyParagraphs: [
        "Property acquired by either spouse during marriage and other family transfers are presumed gifts unless clear evidence shows the transferor intended a loan or sale.",
      ], highlight: "Wire memo + texts establishing 'loan' and 'pay back' rebut the presumption.", footer: "California Family Code · related principle" },
      { kind: "receipt", tag: "Demand sent", vendor: "USPS CERTIFIED MAIL", vendorAddr: "Phoenix Branch", receiptNum: "Cert #7019 0140 0001 4827 3612", date: "04/15/2026", lineItems: [
        { label: "Certified mail with return receipt", amount: "$8.45" },
        { label: "Demand for $11,200 family loan", amount: "(included)" },
      ], subtotal: "$8.45", total: "$8.45", footer: "Return receipt confirmed" },
    ],
  },

  defenses: {
    h2: { pre: "Common family ", em: "defenses", post: ", with rebuttals." },
    lede: "Three arguments cover most family loan cases.",
    items: [
      { quote: "It was a gift. Family helps family.", pill: "Most common", rebuttal: "<strong>Rebuttal:</strong> bring the bank memo, the texts establishing 'loan' and 'pay back', and any written agreement. The borrower's own words decisively rebut the gift presumption. Family transfer alone does not make it a gift." },
      { quote: "We never agreed to a specific repayment schedule.", pill: "No terms", rebuttal: "<strong>Rebuttal:</strong> if no schedule was agreed, courts use a 'reasonable time' standard. After 1 to 2 years for a family loan, demand for repayment becomes reasonable." },
      { quote: "I'm in financial hardship. I'll pay when I can.", pill: "Hardship", rebuttal: "<strong>Rebuttal:</strong> hardship is sympathetic but does not extinguish the debt. The judgment can be entered and collection deferred. Many family lenders agree to payment plans rather than aggressive collection." },
    ],
  },

  outcomes: {
    h2: { pre: "How much do lenders ", em: "actually recover", post: "?" },
    lede: "Typical recovery ranges. Family relationships affect outcomes more than friend loans.",
    bands: [
      { label: "Low", range: "$300 to $3,000", body: "<strong>Partial recovery or settled-on-relationship.</strong> Court awards partial when documentation is weak or family-court factors come into play.", tier: "low" },
      { label: "Mid", range: "$3,000 to $10,000", body: "<strong>Full principal + interest.</strong> Most common when bank memo and texts overcome the gift presumption.", tier: "mid" },
      { label: "High", range: "$10,000 to $20,000+", body: "<strong>Cap-of-court awards.</strong> Larger family loans (down payments, business loans) with full documentation push to cap.", tier: "high" },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede: "Mediation often preserves family relationships better than litigation.",
    cards: [
      { title: "Family mediation", pillLabel: "Preserve relationships", pillTier: "primary", whenItFits: "you want recovery but care about the family relationship. Most communities offer family-specific mediation services for $100 to $400.", tradeoff: "no enforcement; only effective if borrower participates." },
      { title: "Demand letter alone", pillLabel: "Free, formal pressure", pillTier: "good", whenItFits: "documented loan with platform records. Family demand letters often resolve disputes without escalating to court.", tradeoff: "no enforcement if family member ignores." },
      { title: "Small claims (this guide)", pillLabel: "When other options fail", pillTier: "warn", whenItFits: "demand letter ignored, family member denies the loan. Damages within your state's cap.", tradeoff: "family fallout is significant. Budget emotionally before filing." },
    ],
  },

  cta: {
    h2: { pre: "Recover the ", em: "family loan", post: "." },
    body: "Family demand letters carry extra weight. Most disputes settle at the demand stage to avoid courthouse appearances and family-wide fallout. Our generator builds yours in under two minutes.",
    receipt: { label: "example · family down-payment loan", items: [
      { label: "Original loan", amount: "$10,000" },
      { label: "Pre-judgment interest", amount: "+ $1,200" },
      { label: "Filing fee", amount: "+ $300" },
    ], total: "$11,500", totalLabel: "Total claim", note: "Illustrative. Larger family loans may exceed cap." },
  },

  faqs: [
    { q: "Can I sue a family member for an unpaid loan?", a: "Yes, but most states presume family transfers are gifts unless you prove otherwise. Bank memos, texts establishing 'loan' and 'pay back', or a written agreement overcome the presumption. Without documentation, family loan cases are very hard." },
    { q: "What is the 'gift presumption'?", a: "Many states presume that money transferred between close family members (parent-child, siblings, spouses) is a gift unless clear evidence shows it was a loan. The burden of proof is on the lender. Bank-memo designation, follow-up texts, or written agreements overcome the presumption." },
    { q: "Should I require a written promissory note?", a: "Yes for any family loan above a few hundred dollars. Free templates exist online. The note should specify amount, interest rate, repayment schedule, and signatures of both parties. The note overcomes the gift presumption immediately and simplifies any later dispute." },
    { q: "What if my family member is in real financial hardship?", a: "The judgment can be entered and collection deferred. Many family lenders agree to payment plans rather than aggressive collection. The judgment also accrues post-judgment interest, giving the family member incentive to pay even on a slow schedule." },
    { q: "Will this destroy our family relationship?", a: "Usually yes. Most family lawsuits create permanent rifts. Honest assessment before filing: if the relationship matters more than the money, mediation or simply walking away may be better. If the relationship is already strained or the amount is significant, the lawsuit may be necessary." },
    { q: "How long do I have to sue?", a: "Written contracts: 4 to 6 years from due date. Oral or implied contracts: 2 to 4 years. Family loans usually have longer informal repayment timeframes; the clock starts on the date you first demanded repayment, not the loan date." },
    { q: "What if multiple family members are involved (e.g., spouses)?", a: "Sue both as joint borrowers if both signed or both received the funds. State community-property rules may also apply for married borrowers. Joint-and-several liability lets you collect from either party in full." },
  ],

  relatedSlugs: ["someone-owes-me-money", "friend-not-paying-back", "ex-or-after-breakup", "iou", "verbal-agreement", "unpaid-debt-no-contract"],
};

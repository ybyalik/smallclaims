import type { PersonalLoanIssue } from "./types";

export const someoneOwesMeMoney: PersonalLoanIssue = {
  slug: "someone-owes-me-money",
  ready: true,
  short: "Someone owes me money",
  breadcrumbLabel: "Someone Owes Me Money",

  meta: {
    title: "Can I Sue Someone Who Owes Me Money? Small Claims Guide",
    description:
      "Plain-English guide to recovering money owed. Breach of contract, oral vs. written agreements, evidence requirements, and a demand-letter template.",
  },

  hero: {
    eyebrowSuffix: "Money owed",
    h1: { pre: "Can I sue someone ", em: "who owes me money", post: "?" },
    leadStrong: "Yes. Most informal loans are recoverable in small claims.",
    leadBody:
      " A loan, IOU, or money advance that was supposed to be paid back is a contract claim. Written contracts are easiest, but oral agreements and even loans without any agreement (under 'unjust enrichment' or 'promissory estoppel' theories) are also recoverable. The key evidence: proof you transferred the money, proof they agreed to repay, and proof they didn't. Small claims is built for this kind of case.",
  },

  counter: {
    amount: 5400,
    meta: "Breach of contract / unjust enrichment",
    rows: [
      { label: "Original loan", value: "$4,000" },
      { label: "Pre-judgment interest (10%)", value: "+ $1,200", emphasis: "accent" },
      { label: "Filing fee", value: "$200", emphasis: "muted" },
    ],
    footer: "Sample · within most state small-claims caps",
  },

  whatCounts: {
    h2: { pre: "What kinds of ", em: "loans", post: " can you sue to recover?" },
    lede: "Four scenarios. Each is recoverable under different legal theories.",
    cards: [
      { num: "01", title: "Written loan with signed agreement", body: "Easiest case. Signed promissory note, IOU, or written agreement specifying amount, terms, and repayment date. Statute of limitations is usually 4 to 6 years." },
      { num: "02", title: "Oral loan with proof of transfer", body: "Most informal loans. Bank transfer, Venmo/Zelle/Cash App, money order, or witness to the cash exchange. Plus texts or emails referring to the loan establish the agreement." },
      { num: "03", title: "Loan with no explicit agreement (unjust enrichment)", body: "You paid for something on the borrower's behalf, or transferred money expecting repayment. Even without explicit agreement, the law allows recovery to prevent unjust enrichment." },
      { num: "04", title: "Promised payment that never came", body: "They asked for the money, promised to pay back, and never did. The promise is the basis (promissory estoppel). Even if you cannot prove a contract, the broken promise is recoverable when you relied on it to your detriment." },
    ],
    note: { strongIntro: "Statute of limitations is critical.", rest: " Written contracts: 4 to 6 years in most states (10 years in some). Oral contracts: 2 to 4 years. The clock usually starts on the date the loan was due back. If your loan is older than the deadline, the case is barred. Move fast." },
  },

  claim: {
    h2: { pre: "How much can you ", em: "claim", post: "?" },
    lede: "The original loan amount is the floor. Pre-judgment interest, late fees (if agreed), and filing fees stack on top.",
    layers: [
      { tag: "Layer 1", title: "Original loan amount", body: "The principal — the actual money you transferred. Bank statements, cancelled checks, Venmo/Zelle/Cash App receipts, or witness testimony to cash exchange establish the amount.", amount: "$4,000" },
      { tag: "Layer 2", title: "Pre-judgment interest", body: "Most states allow pre-judgment interest at the legal rate (typically 7 to 10 percent per year). On a $4,000 loan that's been outstanding for 3 years, the interest is $840 to $1,200.", amount: "+ $1,200", accent: true },
      { tag: "Layer 3", title: "Filing fees, post-judgment interest", body: "Filing fee, service-of-process cost. Post-judgment interest accrues until paid. Some states also allow attorney fees if specified in a written contract.", amount: "+ $200" },
    ],
    total: { label: "Sample total within small-claims cap", body: "$4,000 loan plus 3 years of pre-judgment interest at 10 percent, plus filing fee.", amount: "$5,400", sublabel: "illustrative · varies by state and term" },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede: "Most informal loan disputes settle once a demand letter arrives. The letter serves three purposes: documents the loan and demand, shows you're serious about court, and tolls some statutes of limitations.",
    checklist: [
      "Date and amount of the loan",
      "How the money was transferred (bank record, Venmo, etc.)",
      "Original repayment terms (if agreed)",
      "Any prior demands or partial payments",
      "Pre-judgment interest calculation",
      "A 14-day deadline before you file",
      "Sent certified mail with return receipt",
    ],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3610",
      date: "May 5, 2026",
      recipientName: "Jordan Borrower",
      recipientAddress: "1424 Maple Lane, Phoenix, AZ 85003",
      reLine: "Demand for Repayment of $4,000 Loan from January 14, 2023",
      bodyParagraphs: [
        "On January 14, 2023, I lent you $4,000 via bank transfer (record attached). You agreed to repay within 6 months. As of today, no portion has been repaid. Three years and four months have passed since the original due date.",
        "Per the breach of our oral agreement, I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Repayment of <strong>$4,000</strong> in original principal;",
        "Pre-judgment interest at 10 percent per year for 3 years (<strong>$1,200</strong>).",
      ],
      closingLine: "Total demand: <strong>$5,200.00</strong>. If unresolved, I will file in Small Claims Court.",
      signatory: "Reese Q. Lender",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " a money-owed case." },
    lede: "Four steps. Documentation of the transfer plus the agreement is the spine.",
    steps: [
      { title: "Gather the evidence", body: "Bank records of the transfer. Texts or emails referring to the loan. Witness contact info if cash. Any partial-payment records. The transfer plus agreement is the case." },
      { title: "Send the demand letter", body: "Certified mail with return receipt. Most loan disputes settle here. The certified-mail receipt also documents the demand for the lawsuit." },
      { title: "File in small claims", body: "If demand fails, file. Filing fees usually run $30 to $100. File in the county where the borrower lives." },
      { title: "Hearing", body: "Lead with the transfer evidence and any written agreement. Hearings usually run 10 to 15 minutes." },
    ],
    aftermath: { tag: "After you win", title: "Collecting from a borrower.", bodyHtml: "Money judgments enforce via <strong>judgment lien</strong> on real estate, <strong>bank levy</strong>, and <strong>writ of execution</strong> on personal property. Wage garnishment is also available in most states. Judgments accrue post-judgment interest and stay valid for 10 to 20 years." },
  },

  evidence: {
    h2: { pre: "What evidence do you need to ", em: "sue", post: "?" },
    lede: "Proof of transfer plus proof of agreement are the case.",
    cells: [
      { kind: "letter", tag: "Bank transfer record", letterhead: "Chase Bank · Account 1234", date: "January 14, 2023", recipientName: "Reese Lender", reLine: "Wire transfer record", bodyParagraphs: [
        "Outgoing wire transfer of $4,000 to Jordan Borrower (Account 5678).",
        "Reference: 'Personal loan — repay within 6 months per agreement.'",
        "Status: Confirmed. Available 01/15/2023.",
      ], signatory: "Bank-generated record", signatoryTitle: "Chase Bank · Statement record" },
      { kind: "texts", tag: "Loan agreement texts", texts: [
        { dir: "in", text: "Hey, can you spot me $4k? Need it for the rent deposit. I'll pay back in 6 months." },
        { dir: "out", text: "Sending it now. Wire transfer. Pay back by July." },
        { dir: "in", text: "Got it. Thank you. I'll pay you back by July, promise." },
      ] },
      { kind: "handbook", tag: "Statute of limitations", documentTitle: "Arizona Revised Statutes · § 12-543", sectionTitle: "Oral contract / breach of oral agreement", bodyParagraphs: [
        "An action for relief from oral or unwritten contract shall be commenced and prosecuted within three years after the cause of action accrues.",
      ], highlight: "Loan due July 2023. 3-year statute runs July 2026. This case is filed within the deadline.", footer: "Arizona Revised Statutes · oral contract" },
      { kind: "receipt", tag: "Demand sent", vendor: "USPS CERTIFIED MAIL", vendorAddr: "USPS Phoenix · Branch 4218", receiptNum: "Cert #7019 0140 0001 4827 3610", date: "04/15/2026", lineItems: [
        { label: "Certified mail with return receipt", amount: "$8.45" },
        { label: "Demand letter for $5,200 loan plus interest", amount: "(included)" },
      ], subtotal: "$8.45", total: "$8.45", footer: "Return receipt confirmed 04/18/2026" },
    ],
  },

  defenses: {
    h2: { pre: "Common borrower ", em: "defenses", post: ", with rebuttals." },
    lede: "Three arguments cover most loan cases.",
    items: [
      { quote: "It was a gift, not a loan.", pill: "Most common", rebuttal: "<strong>Rebuttal:</strong> bring the texts, emails, or witness testimony showing repayment was discussed. The wire-transfer reference itself often documents 'loan' or 'pay back'. The borrower's own words in writing are decisive." },
      { quote: "I never agreed to repay by that date.", pill: "Term dispute", rebuttal: "<strong>Rebuttal:</strong> if there's no agreed date, courts use a 'reasonable time' standard. After 6 months to a year for an informal loan, demand for repayment becomes reasonable. The demand letter triggers the legal obligation regardless of original terms." },
      { quote: "The statute of limitations expired.", pill: "Time barred", rebuttal: "<strong>Rebuttal:</strong> calculate when the loan was due. Statute usually starts on the due date, not the loan date. Partial payments or written acknowledgments restart the clock in many states. File before deadline." },
    ],
  },

  outcomes: {
    h2: { pre: "How much do lenders ", em: "actually recover", post: "?" },
    lede: "Typical recovery in informal loan cases. Documentation strength drives the outcome.",
    bands: [
      { label: "Low", range: "$200 to $1,000", body: "<strong>Partial recovery.</strong> Court awards a portion when documentation is light or terms are disputed.", tier: "low" },
      { label: "Mid", range: "$1,000 to $5,000", body: "<strong>Full principal plus modest interest.</strong> Most common when transfer is documented and texts confirm the agreement.", tier: "mid" },
      { label: "High", range: "$5,000 to $20,000+", body: "<strong>Cap-of-court awards.</strong> Larger written-loan cases with full principal, interest, and (with attorney-fee clauses) recovery of fees.", tier: "high" },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede: "Demand letter usually works first. Small claims is the backup.",
    cards: [
      { title: "Demand letter alone", pillLabel: "Free, low-friction", pillTier: "primary", whenItFits: "informal loan with documentation. Most disputes settle within 14 days of a real demand letter.", tradeoff: "no enforcement if borrower ignores. Court is the next step." },
      { title: "Mediation", pillLabel: "Low-cost, preserve relationship", pillTier: "good", whenItFits: "you want to recover but maintain the relationship. Most communities offer mediation services for $50 to $200.", tradeoff: "no enforcement; only effective if borrower participates." },
      { title: "Small claims (this guide)", pillLabel: "Best for enforced recovery", pillTier: "warn", whenItFits: "demand letter failed. Damages within your state's cap.", tradeoff: "30 to 90 day timeline. Filing fee $30 to $100." },
    ],
  },

  cta: {
    h2: { pre: "Recover the ", em: "loan", post: "." },
    body: "Most loan disputes settle once a real demand letter arrives. Our generator builds yours in under two minutes.",
    receipt: { label: "example · informal $4k loan", items: [
      { label: "Original loan", amount: "$4,000" },
      { label: "Pre-judgment interest", amount: "+ $1,200" },
      { label: "Filing fee", amount: "+ $200" },
    ], total: "$5,400", totalLabel: "Total claim", note: "Illustrative. Larger loans push to small-claims cap; bigger ones need higher courts." },
  },

  faqs: [
    { q: "Can I sue someone for a loan if I don't have a written agreement?", a: "Yes. Oral contracts are enforceable in most states for amounts under a state-specific threshold (often $500 to $5,000 — anything above usually requires writing under the Statute of Frauds for some loan types). Even without a contract, unjust enrichment and promissory estoppel are alternative theories." },
    { q: "How do I prove I lent someone money?", a: "Bank transfer record, Venmo/Zelle/Cash App receipt, cancelled check, or money order receipt. Plus texts, emails, or social-media messages referring to the loan. The transfer plus the agreement (even informal) is the case." },
    { q: "What if I lent cash with no record?", a: "Witness testimony to the exchange, ATM withdrawal records on the same day, and any subsequent texts or emails referring to the loan are still admissible. Cash cases are harder but not impossible. The borrower's own words in writing about repayment are decisive." },
    { q: "How long do I have to sue?", a: "Written contracts: 4 to 6 years in most states (some up to 10). Oral contracts: 2 to 4 years. Promissory estoppel: usually 2 to 3 years. The clock starts on the due date or the date you first demanded repayment. Move fast." },
    { q: "Can I charge interest on the loan?", a: "Yes if agreed in advance. Without agreement, you can claim pre-judgment interest at the state legal rate (typically 7 to 10 percent per year) running from the demand date. Higher contractual interest may be limited by state usury laws." },
    { q: "What if the borrower says they'll pay but never does?", a: "Repeated promises followed by non-payment is the most common pattern. Each broken promise extends the demand period but does not defeat the claim. Document the promises in writing (texts, emails). The pattern strengthens the case." },
    { q: "What if I can't find the borrower?", a: "Search public records for current address. Service of process can be by sheriff or process server at the last known address. If service fails, some states allow service by publication after diligent search. Without service, the case cannot proceed." },
  ],

  relatedSlugs: ["friend-not-paying-back", "family-member", "ex-or-after-breakup", "iou", "verbal-agreement", "cash-loan"],
};

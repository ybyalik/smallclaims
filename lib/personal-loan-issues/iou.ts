import type { PersonalLoanIssue } from "./types";

export const iou: PersonalLoanIssue = {
  slug: "iou",
  ready: true,
  short: "IOU",
  breadcrumbLabel: "IOU",

  meta: {
    title: "Can I Sue Someone for Not Paying Back an IOU? Small Claims Guide",
    description:
      "Plain-English guide to enforcing an IOU. Why a written IOU is the strongest evidence, what to include, and a demand-letter template that triggers fast settlement.",
  },

  hero: {
    eyebrowSuffix: "IOU",
    h1: { pre: "Can I sue someone for ", em: "not paying back an IOU", post: "?" },
    leadStrong: "Yes. An IOU is one of the strongest types of loan evidence.",
    leadBody:
      " A signed IOU is a written acknowledgment of debt: amount, parties, often the date and any terms. Most state laws treat IOUs as enforceable promissory notes. The case is usually straightforward at the hearing because the borrower's own writing establishes the debt. Statute of limitations is longer for written IOUs (4 to 6 years in most states, sometimes 10).",
  },

  counter: {
    amount: 5400,
    meta: "Written promissory note (IOU)",
    rows: [
      { label: "Original IOU amount", value: "$4,000" },
      { label: "Pre-judgment interest (3 years)", value: "+ $1,200", emphasis: "accent" },
      { label: "Filing fee", value: "$200", emphasis: "muted" },
    ],
    footer: "Sample · within most state small-claims caps",
  },

  whatCounts: {
    h2: { pre: "What makes an ", em: "IOU enforceable", post: "?" },
    lede: "Four elements. Most signed IOUs include enough to enforce.",
    cards: [
      { num: "01", title: "Amount", body: "The dollar amount owed. Even handwritten IOUs are enforceable if the amount is clear. Disputes about the amount can be resolved with bank records or witness testimony." },
      { num: "02", title: "Parties (lender and borrower)", body: "Both parties named. The borrower's signature is the central evidence. Lender's name is helpful but recovery is possible without it." },
      { num: "03", title: "Repayment terms (or implied 'on demand')", body: "If the IOU specifies a date or schedule, that controls. If silent, the loan is 'on demand': payable when the lender asks. The demand letter triggers the obligation." },
      { num: "04", title: "Interest (if specified)", body: "Interest specified in the IOU is enforceable up to state usury limits. Without specified interest, you can claim the state's pre-judgment interest rate (7 to 10 percent typical)." },
    ],
    note: { strongIntro: "Witness signatures help.", rest: " A witnessed IOU is even stronger evidence than a two-party IOU. Notarization is rarely required but adds extra weight. Even a basic IOU on a napkin is enforceable if the borrower's signature is clear." },
  },

  claim: {
    h2: { pre: "How much can you ", em: "claim", post: "?" },
    lede: "IOU amount plus pre-judgment interest plus filing fees.",
    layers: [
      { tag: "Layer 1", title: "IOU principal", body: "The amount stated in the IOU. The signed document is decisive evidence at the hearing.", amount: "$4,000" },
      { tag: "Layer 2", title: "Pre-judgment interest", body: "Specified in the IOU or state legal rate (7 to 10 percent per year typical). Running from the agreed repayment date or first demand.", amount: "+ $1,200", accent: true },
      { tag: "Layer 3", title: "Filing fees, post-judgment interest", body: "Filing fee, service-of-process cost, post-judgment interest accruing until paid.", amount: "+ $200" },
    ],
    total: { label: "Sample total within small-claims cap", body: "$4,000 IOU plus 3 years of pre-judgment interest at 10 percent, plus filing fee.", amount: "$5,400", sublabel: "illustrative · varies by IOU terms" },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede: "Demand letters with the IOU attached produce settlement in most cases. The borrower knows the IOU is decisive evidence and has limited defenses.",
    checklist: [
      "Copy of the signed IOU",
      "Date of the IOU and any agreed repayment date",
      "Any prior demands or partial payments",
      "Pre-judgment interest calculation",
      "A 14-day deadline before you file",
      "Sent certified mail with copy of IOU attached",
    ],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3614",
      date: "May 5, 2026",
      recipientName: "Jordan Borrower",
      recipientAddress: "1424 Maple Lane, Phoenix, AZ 85003",
      reLine: "Demand for Payment of IOU Dated June 14, 2023",
      bodyParagraphs: [
        "On June 14, 2023, you signed an IOU for $4,000 (copy attached). The IOU specified repayment within 12 months. Three years and four months have passed without any payment. The IOU is enforceable as a written promissory note.",
        "I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Payment of <strong>$4,000</strong> in IOU principal;",
        "Pre-judgment interest at 10 percent per year for 3 years (<strong>$1,200</strong>).",
      ],
      closingLine: "Total demand: <strong>$5,200.00</strong>. If unresolved, I will file in Small Claims Court.",
      signatory: "Reese Q. Lender",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " an IOU case." },
    lede: "Four steps. The signed IOU is the case.",
    steps: [
      { title: "Locate the original IOU", body: "Original signed document is best. A clear copy works in most courts. If the original is lost, look for any photograph, scan, or secondary record (bank statement reflecting deposit of the loan)." },
      { title: "Send certified-mail demand", body: "Attach a copy of the IOU. Certified-mail receipt creates the formal record." },
      { title: "File in small claims", body: "If demand fails, file. Filing fees usually run $30 to $100. Bring the original IOU to the hearing." },
      { title: "Hearing", body: "Lead with the IOU. The borrower's signature on the document is decisive. Hearings usually run 10 to 15 minutes." },
    ],
    aftermath: { tag: "After you win", title: "Collecting on an IOU judgment.", bodyHtml: "Money judgments enforce via <strong>judgment lien</strong>, <strong>bank levy</strong>, and <strong>writ of execution</strong>. Wage garnishment is also available. Post-judgment interest accrues until paid. IOU judgments stay valid 10 to 20 years." },
  },

  evidence: {
    h2: { pre: "What evidence do you need to ", em: "sue on an IOU", post: "?" },
    lede: "The IOU itself is the case. Other evidence is supporting.",
    cells: [
      { kind: "letter", tag: "The IOU", letterhead: "I.O.U.", date: "June 14, 2023", recipientName: "Reese Lender", reLine: "Promissory note", bodyParagraphs: [
        "I, Jordan Borrower, owe Reese Lender the sum of $4,000.",
        "I promise to repay this amount in full within twelve (12) months from this date.",
        "Interest at 10% per annum if not paid by due date.",
      ], signatory: "Jordan Borrower", signatoryTitle: "Signed and dated 06/14/2023" },
      { kind: "texts", tag: "Borrower acknowledgment", texts: [
        { dir: "out", text: "Did you ever pay back the $4,000 from the IOU?" },
        { dir: "in", text: "I haven't been able to. Things have been tight." },
        { dir: "out", text: "It's been 3 years. I have to file unless we work out a payment plan." },
      ] },
      { kind: "handbook", tag: "Statute of limitations", documentTitle: "Arizona Revised Statutes · § 12-548", sectionTitle: "Written contract · 6-year statute", bodyParagraphs: [
        "An action for breach of any written contract for the payment of money shall be commenced and prosecuted within six years after the cause of action accrues.",
      ], highlight: "IOU due June 2024. 6-year statute runs June 2030. Within deadline.", footer: "Written contract = longer statute" },
      { kind: "receipt", tag: "Bank deposit (loan source)", vendor: "WELLS FARGO", vendorAddr: "Account 1234", receiptNum: "Cashier's check #4218", date: "06/14/2023", lineItems: [
        { label: "Cashier's check to Jordan Borrower", amount: "$4,000.00" },
        { label: "Memo: 'Loan per IOU dated today'", amount: "(memo line)" },
      ], subtotal: "$4,000.00", total: "$4,000.00", footer: "Loan source · same day as IOU" },
    ],
  },

  defenses: {
    h2: { pre: "Common borrower ", em: "defenses", post: ", with rebuttals." },
    lede: "Three arguments cover most IOU cases. Few succeed.",
    items: [
      { quote: "I never signed that.", pill: "Most common", rebuttal: "<strong>Rebuttal:</strong> bring the original IOU. Signature comparisons are admissible. Forgery defenses fail when other documents (bank deposit on the same day) corroborate the loan. Borrower's own subsequent texts about the loan also undercut the defense." },
      { quote: "I already paid this back.", pill: "Already paid", rebuttal: "<strong>Rebuttal:</strong> ask for the borrower's payment record (bank withdrawal, Venmo transfer, money order). The burden of proving payment is on the borrower. Without records, the defense fails." },
      { quote: "The IOU was signed under duress.", pill: "Duress", rebuttal: "<strong>Rebuttal:</strong> duress requires very specific facts (immediate threat of harm, not pressure to sign). Most IOU cases involve voluntary signing. Without specific evidence of duress at signing, the defense fails." },
    ],
  },

  outcomes: {
    h2: { pre: "How much do lenders ", em: "actually recover", post: "?" },
    lede: "IOU cases produce predictable, full recoveries with strong documentation.",
    bands: [
      { label: "Low", range: "$500 to $2,000", body: "<strong>Partial recovery.</strong> Court awards portion when IOU is unclear or partial payment is documented.", tier: "low" },
      { label: "Mid", range: "$2,000 to $7,500", body: "<strong>Full IOU + interest.</strong> Most common with clear signed IOU.", tier: "mid" },
      { label: "High", range: "$7,500 to $20,000+", body: "<strong>Cap-of-court awards.</strong> Larger IOUs with full principal, interest, and (with attorney-fee clauses) recovery of fees.", tier: "high" },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede: "IOU cases have strong demand-letter outcomes. Court is the backup.",
    cards: [
      { title: "Demand letter with IOU attached", pillLabel: "Free, very effective", pillTier: "primary", whenItFits: "any signed IOU. The borrower knows the IOU is decisive evidence. Most pay within 14 days.", tradeoff: "no enforcement if borrower ignores." },
      { title: "Mediation", pillLabel: "Preserve relationships", pillTier: "good", whenItFits: "you want to recover but maintain the relationship. Mediation can negotiate payment plans.", tradeoff: "no enforcement; only effective if borrower participates." },
      { title: "Small claims (this guide)", pillLabel: "Reliable enforced recovery", pillTier: "warn", whenItFits: "demand letter ignored. Damages within your state's cap.", tradeoff: "30 to 90 day timeline. Strong cases at the hearing." },
    ],
  },

  cta: {
    h2: { pre: "Enforce the ", em: "IOU", post: "." },
    body: "Demand letters with the IOU attached produce settlement in most cases. Our generator builds yours in under two minutes.",
    receipt: { label: "example · 3-year-old IOU", items: [
      { label: "Original IOU", amount: "$4,000" },
      { label: "Pre-judgment interest", amount: "+ $1,200" },
      { label: "Filing fee", amount: "+ $200" },
    ], total: "$5,400", totalLabel: "Total claim", note: "Illustrative. Larger IOUs push to small-claims cap." },
  },

  faqs: [
    { q: "Is a handwritten IOU enforceable?", a: "Yes. Most state laws enforce handwritten IOUs as written contracts. The signature plus the dollar amount plus the parties named are usually enough. Even an IOU on a napkin counts if the elements are present." },
    { q: "What if the IOU doesn't specify a repayment date?", a: "Without a specified date, the loan is 'on demand': payable when the lender asks. The demand letter triggers the legal obligation. Statute of limitations starts running on the demand date, not the IOU date." },
    { q: "What about an electronic IOU (text or email)?", a: "Most states recognize electronic signatures and writings as enforceable contracts. A text or email saying 'I owe you $4,000, will pay back by June' from the borrower is essentially an electronic IOU. UCC and state e-sign laws enforce these." },
    { q: "Should I include interest in the IOU?", a: "Yes, especially for loans over a year. Interest specified in the IOU is enforceable up to state usury limits. Without specified interest, you can claim the state pre-judgment rate (7 to 10 percent typical), but specifying in advance is cleaner." },
    { q: "What if the borrower disputes my signature on the IOU?", a: "The borrower's signature is what matters; yours is rarely disputed. If the borrower challenges authenticity, the court can compare to known signatures. Bank deposits and follow-up texts also corroborate." },
    { q: "How long do I have to sue on an IOU?", a: "Written contracts: 4 to 6 years in most states (some up to 10). The IOU is a written contract. Statute starts on the agreed repayment date or first demand. Move within the deadline." },
    { q: "Can I charge interest above what's in the IOU?", a: "No. The IOU controls. If the IOU is silent on interest, you can claim pre-judgment interest at the state legal rate but not contractual interest higher than what was agreed. State usury limits also cap contractual interest." },
  ],

  relatedSlugs: ["someone-owes-me-money", "verbal-agreement", "friend-not-paying-back", "family-member", "cash-loan", "unpaid-debt-no-contract"],
};

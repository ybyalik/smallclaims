import type { PersonalLoanIssue } from "./types";

export const cashLoan: PersonalLoanIssue = {
  slug: "cash-loan",
  ready: true,
  short: "Cash loan",
  breadcrumbLabel: "Cash Loan",

  meta: {
    title: "Can I Sue Someone for a Cash Loan Not Repaid? Small Claims Guide",
    description:
      "Plain-English guide to recovering a cash loan. Witness testimony, ATM records, follow-up texts, and a demand-letter template. Cash cases are harder but recoverable.",
  },

  hero: {
    eyebrowSuffix: "Cash loan",
    h1: { pre: "Can I sue someone for a ", em: "cash loan not repaid", post: "?" },
    leadStrong: "Yes, but cash loans need extra proof.",
    leadBody:
      " Cash transfers without bank records present a documentation challenge: you have to prove the transfer happened. Witness testimony, ATM withdrawal records, and the borrower's subsequent texts or emails about the loan are the standard evidence. The legal framework is identical to any other oral contract; the proof is harder. Many cash cases settle once the borrower sees the demand letter and realizes their texts about the loan are admissible.",
  },

  counter: {
    amount: 2400,
    meta: "Oral contract · cash loan",
    rows: [
      { label: "Original cash loan", value: "$2,000" },
      { label: "Pre-judgment interest", value: "+ $200", emphasis: "accent" },
      { label: "Filing fee", value: "$200", emphasis: "muted" },
    ],
    footer: "Sample · within most state small-claims caps",
  },

  whatCounts: {
    h2: { pre: "How do you prove a ", em: "cash loan", post: "?" },
    lede: "Four kinds of evidence work even without a bank record of the transfer itself.",
    cards: [
      { num: "01", title: "ATM withdrawal record", body: "Bank statement showing your ATM withdrawal on the same day as the loan. The amount matches. Court can infer the cash came from the withdrawal." },
      { num: "02", title: "Witness to the cash exchange", body: "Anyone who saw you hand over the money. Friend, spouse, family member, or business associate. Witness statements at the hearing or written declarations are admissible." },
      { num: "03", title: "Borrower's text or email acknowledging", body: "Even casual texts ('thanks for the $2k', 'will pay back next month') are decisive. The borrower's own words in writing make the cash issue almost moot." },
      { num: "04", title: "Pattern or course of dealing", body: "Repeated cash exchanges with similar terms, or partial repayments showing the borrower's understanding of the debt. Course of dealing is admissible to establish the oral contract." },
    ],
    note: { strongIntro: "Get the agreement in writing now if possible.", rest: " Even months after the cash exchange, you can ask the borrower to acknowledge the loan in a text. Many borrowers will agree (especially if you propose a payment plan). The acknowledgment converts a hard cash case into a clean text-based case." },
  },

  claim: {
    h2: { pre: "How much can you ", em: "claim", post: "?" },
    lede: "Original cash amount plus pre-judgment interest plus filing fees.",
    layers: [
      { tag: "Layer 1", title: "Original cash loan", body: "ATM record, witness testimony, or borrower's acknowledgment establishes the amount.", amount: "$2,000" },
      { tag: "Layer 2", title: "Pre-judgment interest", body: "State legal rate (7 to 10 percent per year) running from the agreed repayment date or first demand.", amount: "+ $200", accent: true },
      { tag: "Layer 3", title: "Filing fees, post-judgment interest", body: "Filing fee, service-of-process cost, post-judgment interest until paid.", amount: "+ $200" },
    ],
    total: { label: "Sample total within small-claims cap", body: "$2,000 cash loan plus pre-judgment interest, plus filing fee.", amount: "$2,400", sublabel: "illustrative · varies by amount and term" },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede: "Demand letters work especially well for cash cases because the borrower's reply often becomes additional evidence. A response acknowledging the debt is a written admission.",
    checklist: [
      "Date, amount, and circumstances of the cash exchange",
      "ATM record from the same day",
      "Witness names",
      "Any texts or emails from the borrower about the loan",
      "Pre-judgment interest calculation",
      "A 14-day deadline before you file",
      "Sent certified mail",
    ],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3616",
      date: "May 5, 2026",
      recipientName: "Jordan Borrower",
      recipientAddress: "1424 Maple Lane, Phoenix, AZ 85003",
      reLine: "Demand for Repayment of $2,000 Cash Loan from June 14, 2024",
      bodyParagraphs: [
        "On June 14, 2024, I gave you $2,000 in cash at your apartment to cover your rent. ATM record from that morning confirms my withdrawal of $2,000 (statement attached). Sam Witness was present and saw the cash exchange. We agreed verbally that you would repay within 12 months.",
        "Your text on July 22, 2024 ('thank you again for the $2k, will pay back as soon as I can') confirms the loan in writing. Twenty months have passed without any repayment. I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Repayment of <strong>$2,000</strong> in original cash loan;",
        "Pre-judgment interest at 10 percent per year (<strong>$200</strong>).",
      ],
      closingLine: "Total demand: <strong>$2,200.00</strong>. If unresolved, I will file in Small Claims Court.",
      signatory: "Reese Q. Lender",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " a cash-loan case." },
    lede: "Four steps. Stitching together the evidence is the key.",
    steps: [
      { title: "Reconstruct the evidence", body: "Find ATM records from the date of the loan. Identify witnesses. Search texts and emails for any mention of the money. The borrower's own subsequent statements are particularly powerful." },
      { title: "Send certified-mail demand", body: "The borrower's response often acknowledges the debt, providing a written admission. Many borrowers reply 'I owe you, will pay when I can'." },
      { title: "File in small claims", body: "If demand fails, file. Filing fees usually run $30 to $100. Subpoena witnesses if needed." },
      { title: "Hearing", body: "Walk through the evidence chronologically. ATM record. Witness testimony. Texts about the loan. Borrower's admissions. Hearings usually run 10 to 15 minutes." },
    ],
    aftermath: { tag: "After you win", title: "Collecting on a cash-loan judgment.", bodyHtml: "Money judgments enforce via <strong>judgment lien</strong>, <strong>bank levy</strong>, and <strong>writ of execution</strong>. Wage garnishment is also available. Cash-loan judgments enforce identically to any other judgment once entered." },
  },

  evidence: {
    h2: { pre: "What evidence do you need ", em: "for a cash loan", post: "?" },
    lede: "ATM record, witness, and borrower's texts establish the cash transfer and agreement.",
    cells: [
      { kind: "letter", tag: "ATM withdrawal record", letterhead: "Wells Fargo · ATM Statement", date: "June 14, 2024", recipientName: "Reese Lender", reLine: "ATM withdrawal record", bodyParagraphs: [
        "Date: 06/14/2024 09:47 AM",
        "ATM: 5500 Industrial Way, Phoenix",
        "Withdrawal: $2,000 (max in single transaction)",
        "Bank balance after: $14,300",
      ], signatory: "Bank-generated record", signatoryTitle: "Wells Fargo statement" },
      { kind: "texts", tag: "Borrower's admissions", texts: [
        { dir: "in", text: "Thank you again for the $2k, will pay back as soon as I can." },
        { dir: "in", text: "Hey - any way to push back the repayment? Things are tight." },
        { dir: "out", text: "It's been almost 2 years. I need to start the formal process." },
      ] },
      { kind: "handbook", tag: "Statute of limitations", documentTitle: "Arizona Revised Statutes · § 12-543", sectionTitle: "Oral contract · 3-year statute", bodyParagraphs: [
        "An action for relief from oral or unwritten contract shall be commenced and prosecuted within three years after the cause of action accrues.",
      ], highlight: "Loan due June 2025. 3-year statute runs June 2028. Within deadline.", footer: "Statute of limitations" },
      { kind: "receipt", tag: "Witness statement", vendor: "SAM WITNESS", vendorAddr: "Witnessed cash exchange", receiptNum: "Sworn declaration", date: "06/14/2024", lineItems: [
        { label: "Witnessed cash exchange", amount: "—" },
        { label: "Reese gave Jordan $2,000 cash", amount: "—" },
        { label: "Repayment within 12 months", amount: "—" },
      ], subtotal: "—", total: "—", footer: "Available to testify at hearing" },
    ],
  },

  defenses: {
    h2: { pre: "Common borrower ", em: "defenses", post: ", with rebuttals." },
    lede: "Three arguments cover most cash-loan cases.",
    items: [
      { quote: "I never received any cash from you.", pill: "Most common", rebuttal: "<strong>Rebuttal:</strong> bring the ATM record and witness testimony. Plus the borrower's own texts thanking you for the money. The combination decisively establishes the transfer." },
      { quote: "It was a gift.", pill: "Gift defense", rebuttal: "<strong>Rebuttal:</strong> bring the texts where the borrower acknowledged the loan ('thank you, will pay back', 'will repay when I can'). Borrower's own words establish loan vs. gift." },
      { quote: "Your ATM withdrawal was for something else.", pill: "Different purpose", rebuttal: "<strong>Rebuttal:</strong> the timing (same day as the alleged loan), the witness, and the borrower's subsequent texts make the inference irresistible. Court accepts circumstantial evidence." },
    ],
  },

  outcomes: {
    h2: { pre: "How much do lenders ", em: "actually recover", post: "?" },
    lede: "Cash cases are harder but very winnable with stitched-together evidence.",
    bands: [
      { label: "Low", range: "$100 to $500", body: "<strong>Partial recovery.</strong> Court awards portion when evidence is light or witness is unavailable.", tier: "low" },
      { label: "Mid", range: "$500 to $3,000", body: "<strong>Full principal + interest.</strong> Most common when ATM record, witness, and texts combine.", tier: "mid" },
      { label: "High", range: "$3,000 to $20,000+", body: "<strong>Cap-of-court awards.</strong> Larger cash loans with strong documentation push to cap. Less common because cash exchanges of $5k+ are rare without paper trail.", tier: "high" },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede: "Demand letter is the lowest-friction path.",
    cards: [
      { title: "Demand letter alone", pillLabel: "Free, evidence-generating", pillTier: "primary", whenItFits: "documented oral agreement with witness or ATM record. Many borrowers reply acknowledging the debt.", tradeoff: "no enforcement if borrower ignores." },
      { title: "Mediation", pillLabel: "Preserve relationships", pillTier: "good", whenItFits: "personal relationships you want to maintain. Community mediation centers offer services for $50 to $200.", tradeoff: "no enforcement; only effective if borrower participates." },
      { title: "Small claims (this guide)", pillLabel: "Reliable enforced recovery", pillTier: "warn", whenItFits: "demand letter failed. Damages within your state's cap.", tradeoff: "30 to 90 day timeline. Cash cases are slightly harder but very winnable with stitched evidence." },
    ],
  },

  cta: {
    h2: { pre: "Recover the ", em: "cash loan", post: "." },
    body: "Most cash cases settle once a demand letter arrives with documented evidence. Our generator builds yours in under two minutes.",
    receipt: { label: "example · cash loan with witness", items: [
      { label: "Original cash loan", amount: "$2,000" },
      { label: "Pre-judgment interest", amount: "+ $200" },
      { label: "Filing fee", amount: "+ $200" },
    ], total: "$2,400", totalLabel: "Total claim", note: "Illustrative. Larger cash loans need stronger documentation." },
  },

  faqs: [
    { q: "Can I sue for a cash loan I never documented?", a: "Yes, if you can stitch together evidence. ATM records, witnesses, and (most powerfully) the borrower's own subsequent texts about the money. Cash cases are harder but very winnable with documentation." },
    { q: "What if I lent cash with no witness?", a: "ATM records plus the borrower's texts can be enough. The borrower's own words in writing about repayment establish the agreement. If the borrower never acknowledged in writing, the case is much harder." },
    { q: "Should I write a quick IOU even now?", a: "Yes. You can ask the borrower to sign an acknowledgment now, even months or years after the cash exchange. Many borrowers will sign (especially if you offer a payment plan). The acknowledgment converts a hard cash case into a clean written-contract case." },
    { q: "What about ATM video?", a: "Most banks keep ATM video for 30 to 60 days. If you act quickly, you can request the footage showing your withdrawal. After that window, the bank usually has only the transaction record (not video). The transaction record alone establishes the withdrawal." },
    { q: "Can I record the borrower acknowledging the debt?", a: "Depends on state law. One-party-consent states allow recording with only your consent; two-party-consent states require both. Recording without consent in two-party states violates law and makes the recording inadmissible." },
    { q: "How long do I have to sue?", a: "Oral contracts: 2 to 4 years from the agreed repayment date or first demand. Cash cases follow the oral-contract rules. Move fast: witness memories fade and ATM video disappears quickly." },
    { q: "What if the cash was for a specific purpose (like rent)?", a: "Useful to specify in your evidence. The specific purpose ('to cover rent') makes the loan vs. gift question easier to resolve. Texts mentioning the specific purpose are decisive." },
  ],

  relatedSlugs: ["someone-owes-me-money", "verbal-agreement", "iou", "friend-not-paying-back", "family-member", "unpaid-debt-no-contract"],
};

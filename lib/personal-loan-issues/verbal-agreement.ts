import type { PersonalLoanIssue } from "./types";

export const verbalAgreement: PersonalLoanIssue = {
  slug: "verbal-agreement",
  ready: true,
  short: "Verbal agreement loan",
  breadcrumbLabel: "Verbal Agreement",

  meta: {
    title: "Can I Sue Someone for a Verbal Agreement / Without Proof?",
    description:
      "Plain-English guide to enforcing oral contracts. What evidence works without writing, the Statute of Frauds, and how to recover when you don't have a signed agreement.",
  },

  hero: {
    eyebrowSuffix: "Verbal agreement",
    h1: { pre: "Can I sue someone for a ", em: "verbal agreement", post: "?" },
    leadStrong: "Yes. Oral contracts are enforceable in most cases.",
    leadBody:
      " The widespread belief that 'oral contracts are not worth the paper they're written on' is wrong. Most state laws enforce oral contracts under 2-to-4-year statutes of limitations. The challenge is proof: bank transfers, follow-up texts, witnesses, and the borrower's own statements about the agreement all count. Some types of contracts (real estate, marriage, debts of others, year-plus performance) require writing under the Statute of Frauds.",
  },

  counter: {
    amount: 3400,
    meta: "Oral contract · 2-to-4-year statute",
    rows: [
      { label: "Original loan amount", value: "$3,000" },
      { label: "Pre-judgment interest", value: "+ $200", emphasis: "accent" },
      { label: "Filing fee", value: "$200", emphasis: "muted" },
    ],
    footer: "Sample · within most state small-claims caps",
  },

  whatCounts: {
    h2: { pre: "How do you ", em: "prove an oral contract", post: "?" },
    lede: "Four kinds of evidence work even without a signed document.",
    cards: [
      { num: "01", title: "Bank transfer plus follow-up text", body: "Wire transfer, Venmo, or check with a memo line referring to the loan. Any subsequent text from the borrower acknowledging the loan and promising repayment. The borrower's own words establish the contract." },
      { num: "02", title: "Witness testimony", body: "Anyone who heard the agreement: friend, spouse, family member. Witness statements at the hearing or written declarations carry weight. The witness should remember specific details (date, amount, terms)." },
      { num: "03", title: "Pattern of consistent conduct", body: "Repeated similar transactions, partial payments, or correspondence that imply a contract. Course-of-dealing evidence is admissible to establish what the parties agreed even without explicit writing." },
      { num: "04", title: "Borrower's own statements (admissions)", body: "If the borrower ever acknowledged the debt in writing or in a recorded conversation (where state law allows), that's an admission. Even casual texts ('I owe you the $3k') are decisive evidence." },
    ],
    note: { strongIntro: "Statute of Frauds limits oral contracts.", rest: " Some contracts must be in writing: real estate sales, contracts that cannot be performed within a year, marriage agreements, debts of others. Loan agreements between individuals are not in this category. Most personal loans are enforceable orally regardless of amount." },
  },

  claim: {
    h2: { pre: "How much can you ", em: "claim", post: "?" },
    lede: "Original loan amount plus pre-judgment interest.",
    layers: [
      { tag: "Layer 1", title: "Original loan", body: "Bank transfer record, Venmo/Zelle/Cash App receipt, or witness testimony for cash. The transfer plus the agreement evidence is the case.", amount: "$3,000" },
      { tag: "Layer 2", title: "Pre-judgment interest", body: "State legal rate (7 to 10 percent per year) running from the agreed repayment date or first demand. Without agreed interest, the state default rate applies.", amount: "+ $200", accent: true },
      { tag: "Layer 3", title: "Filing fees, post-judgment interest", body: "Filing fee, service-of-process cost, post-judgment interest until paid.", amount: "+ $200" },
    ],
    total: { label: "Sample total within small-claims cap", body: "$3,000 verbal-agreement loan plus modest pre-judgment interest, plus filing fee.", amount: "$3,400", sublabel: "illustrative · varies by state and term" },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede: "Demand letters work especially well for verbal agreements because the borrower's reply often becomes additional evidence. A response acknowledging the debt is a written admission you can use at the hearing.",
    checklist: [
      "Date and amount of the loan",
      "How the money was transferred",
      "Witness names if applicable",
      "Any written communications about the loan",
      "Pre-judgment interest calculation",
      "A 14-day deadline before you file",
      "Sent certified mail (preserves response as evidence)",
    ],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3615",
      date: "May 5, 2026",
      recipientName: "Jordan Borrower",
      recipientAddress: "1424 Maple Lane, Phoenix, AZ 85003",
      reLine: "Demand for Repayment of $3,000 Verbal-Agreement Loan",
      bodyParagraphs: [
        "On August 14, 2024, I lent you $3,000 via Venmo. The transaction note read 'Loan — pay back when you can'. We agreed verbally that you would repay within 12 months. Twenty months have passed without repayment.",
        "Witness to our verbal agreement: Sam Witness, who was present at the conversation. I have follow-up text messages from you on October 22, 2024 ('still working on getting that money back to you') corroborating the loan.",
        "I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Repayment of <strong>$3,000</strong> in original loan;",
        "Pre-judgment interest at 10 percent per year (<strong>$200</strong>).",
      ],
      closingLine: "Total demand: <strong>$3,200.00</strong>. If unresolved, I will file in Small Claims Court.",
      signatory: "Reese Q. Lender",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " on a verbal agreement." },
    lede: "Four steps. Stitching together the evidence is the key.",
    steps: [
      { title: "Gather every piece of evidence", body: "Bank/Venmo records, every text or email mentioning the loan, witness contact info, any partial payments, recorded conversations (where state law allows). Stitch together everything that establishes the contract." },
      { title: "Send certified-mail demand", body: "The borrower's response (or lack of) becomes evidence. Many borrowers reply acknowledging the debt, providing a written admission you can use at the hearing." },
      { title: "File in small claims", body: "If demand fails, file. Filing fees usually run $30 to $100. Subpoena witnesses if needed." },
      { title: "Hearing", body: "Walk through the evidence chronologically. Bank record. Witness testimony. Texts establishing the loan. Borrower's own statements. Hearings usually run 10 to 15 minutes." },
    ],
    aftermath: { tag: "After you win", title: "Collecting on a verbal-agreement judgment.", bodyHtml: "Money judgments enforce via <strong>judgment lien</strong>, <strong>bank levy</strong>, and <strong>writ of execution</strong>. Wage garnishment is also available. Verbal-agreement judgments enforce identically to written-contract judgments once entered." },
  },

  evidence: {
    h2: { pre: "What evidence do you need ", em: "without a writing", post: "?" },
    lede: "Bank records, texts, and witness testimony combine to establish the oral contract.",
    cells: [
      { kind: "letter", tag: "Bank/Venmo record", letterhead: "Venmo · @reeselender", date: "August 14, 2024", recipientName: "Reese Lender", reLine: "Transaction record", bodyParagraphs: [
        "Sent: $3,000 to @jordanborrower",
        "Note: 'Loan — pay back when you can'",
        "Status: Completed.",
      ], signatory: "Venmo platform record", signatoryTitle: "Transaction confirmed" },
      { kind: "texts", tag: "Borrower's admissions", texts: [
        { dir: "in", text: "Hey, thank you so much for the $3k. Will pay back as soon as I can." },
        { dir: "in", text: "Still working on getting that money back to you. Sorry for the delay." },
        { dir: "out", text: "It's been over a year. We need to set up a real repayment plan." },
      ] },
      { kind: "handbook", tag: "Statute of Frauds", documentTitle: "Arizona Revised Statutes · § 44-101", sectionTitle: "Statute of Frauds — exceptions for personal loans", bodyParagraphs: [
        "No action shall be brought to charge any person upon agreement... unless promise or agreement... is in writing.",
        "Exceptions: agreements that can be performed within one year, personal loans between individuals, and most consumer transactions.",
      ], highlight: "Personal loans between individuals are enforceable orally.", footer: "Statute of Frauds · written-contract requirement does not apply" },
      { kind: "receipt", tag: "Witness statement", vendor: "SAM WITNESS", vendorAddr: "Witness to oral agreement", receiptNum: "Sworn declaration", date: "08/14/2024", lineItems: [
        { label: "Witnessed verbal agreement", amount: "—" },
        { label: "Reese to lend $3,000 to Jordan", amount: "—" },
        { label: "Repayment within 12 months", amount: "—" },
      ], subtotal: "—", total: "—", footer: "Available to testify at hearing" },
    ],
  },

  defenses: {
    h2: { pre: "Common borrower ", em: "defenses", post: ", with rebuttals." },
    lede: "Three arguments cover most verbal-agreement cases.",
    items: [
      { quote: "It was a gift. I never agreed to repay.", pill: "Most common", rebuttal: "<strong>Rebuttal:</strong> bring the texts where the borrower acknowledged the loan ('thank you, will pay back', 'still working on it'). Borrower's own words decisively rebut the gift defense." },
      { quote: "We never had an agreement about repayment terms.", pill: "No terms", rebuttal: "<strong>Rebuttal:</strong> if no terms were agreed, courts use 'reasonable time'. After 1 to 2 years, demand for repayment becomes reasonable. The demand letter triggers the obligation." },
      { quote: "Statute of Frauds requires writing.", pill: "Writing required", rebuttal: "<strong>Rebuttal:</strong> Statute of Frauds applies to specific contract types (real estate, year-plus performance, debts of others). Personal loans between individuals are enforceable orally. Cite your state's statute." },
    ],
  },

  outcomes: {
    h2: { pre: "How much do lenders ", em: "actually recover", post: "?" },
    lede: "Verbal-agreement cases recover when documentation is strong.",
    bands: [
      { label: "Low", range: "$200 to $1,000", body: "<strong>Partial recovery.</strong> Court awards portion when documentation is light or the borrower's gift defense partially succeeds.", tier: "low" },
      { label: "Mid", range: "$1,000 to $5,000", body: "<strong>Full principal + interest.</strong> Most common when bank record, texts, and witness combine to establish the oral contract.", tier: "mid" },
      { label: "High", range: "$5,000 to $20,000+", body: "<strong>Cap-of-court awards.</strong> Larger oral-agreement loans with strong documentation push to cap.", tier: "high" },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede: "Demand letter is the highest-leverage path. Mediation works in friendly disputes.",
    cards: [
      { title: "Demand letter alone", pillLabel: "Free, evidence-generating", pillTier: "primary", whenItFits: "documented oral agreement. Many borrowers reply acknowledging the debt, providing additional written evidence.", tradeoff: "no enforcement if borrower ignores." },
      { title: "Mediation", pillLabel: "Preserve relationships", pillTier: "good", whenItFits: "personal relationships you want to maintain. Community mediation centers offer services for $50 to $200.", tradeoff: "no enforcement; only effective if borrower participates." },
      { title: "Small claims (this guide)", pillLabel: "Reliable enforced recovery", pillTier: "warn", whenItFits: "demand letter failed. Damages within your state's cap.", tradeoff: "30 to 90 day timeline. Verbal cases are slightly harder than written but very winnable with documentation." },
    ],
  },

  cta: {
    h2: { pre: "Enforce the ", em: "verbal agreement", post: "." },
    body: "Demand letters with the bank record and texts often produce settlement. Our generator builds yours in under two minutes.",
    receipt: { label: "example · oral loan with witness", items: [
      { label: "Original loan", amount: "$3,000" },
      { label: "Pre-judgment interest", amount: "+ $200" },
      { label: "Filing fee", amount: "+ $200" },
    ], total: "$3,400", totalLabel: "Total claim", note: "Illustrative. Larger oral loans push to small-claims cap." },
  },

  faqs: [
    { q: "Are oral contracts enforceable?", a: "Yes, in most cases. Most state laws enforce oral contracts under 2-to-4-year statutes of limitations. The challenge is proof: bank transfers, follow-up texts, witnesses, and the borrower's own statements all count." },
    { q: "What is the Statute of Frauds?", a: "A common-law rule (codified in most state laws) that certain contracts must be in writing to be enforceable. Real estate sales, contracts that cannot be performed within a year, marriage agreements, and debts of others must be in writing. Personal loans between individuals are not in this category." },
    { q: "How much money can I recover without a written contract?", a: "Same as written contracts in most states, subject to small-claims caps. The challenge is proof, not the recoverable amount. Strong oral-contract evidence (bank records, texts, witnesses) supports recovery up to the cap." },
    { q: "What if I have no witness?", a: "Bank records and texts can be enough. The borrower's own subsequent statements about the loan are particularly powerful. A text saying 'thank you for the $3k, will pay back' is essentially the borrower's admission." },
    { q: "Can I record a phone call to use as evidence?", a: "Depends on state law. Some states require all parties' consent (one-party-consent vs. two-party-consent states). Recording without consent can violate state law and make the recording inadmissible. Texts and emails are safer." },
    { q: "How long do I have to sue?", a: "Oral contracts: 2 to 4 years from the agreed repayment date or first demand. Some states have 'open accounts' rules that extend the clock for ongoing financial relationships. Move fast: witness memories fade." },
    { q: "What if the borrower denies we ever had an agreement?", a: "The bank transfer plus any subsequent texts about the money are decisive. The transfer itself is documented; the borrower's words about the money in any communication establish the agreement. Pure denial without alternative explanation rarely wins." },
  ],

  relatedSlugs: ["someone-owes-me-money", "iou", "friend-not-paying-back", "family-member", "cash-loan", "unpaid-debt-no-contract"],
};

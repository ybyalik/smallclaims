import type { RoommateIssue } from "./types";

export const unpaidRent: RoommateIssue = {
  slug: "unpaid-rent",
  claimType: "written_contract",
  ready: true,
  short: "Roommate unpaid rent",
  breadcrumbLabel: "Roommate Unpaid Rent",

  meta: {
    title: "Can I Sue My Roommate for Unpaid Rent? Small Claims Guide",
    description:
      "Plain-English guide to recovering unpaid rent from a roommate. Joint tenancy, lease structure, contribution lawsuits, and a demand-letter template.",
  },

  hero: {
    eyebrowSuffix: "Unpaid rent",
    h1: { pre: "Can I sue my roommate for ", em: "unpaid rent", post: "?" },
    leadStrong: "Yes. Roommate rent disputes are textbook small-claims cases.",
    leadBody:
      " When you and your roommate signed a lease together (or had a roommate agreement), each of you is legally responsible for the rent. If your roommate failed to pay their share and you covered it to keep the lease in good standing, you can sue them for their share. The bank record showing you paid full rent plus any roommate agreement, plus texts or emails about the rent split, are the case.",
  },

  counter: {
    amount: 4200,
    meta: "Their share you covered + roommate agreement breach",
    rows: [
      { label: "Roommate's share unpaid (3 months)", value: "$3,600" },
      { label: "Pre-judgment interest", value: "+ $400", emphasis: "accent" },
      { label: "Filing fee", value: "$200", emphasis: "muted" },
    ],
    footer: "Sample · within most state small-claims caps",
  },

  whatCounts: {
    h2: { pre: "When can you sue for ", em: "unpaid roommate rent", post: "?" },
    lede: "Four common patterns. Each is recoverable either as their share you covered or under the roommate agreement.",
    cards: [
      { num: "01", title: "You both signed the lease (each fully responsible)", body: "Most joint leases make each tenant fully responsible for the entire rent (the legal name is 'joint and several liability'): the landlord can collect the full rent from any tenant. If your roommate didn't pay and you paid extra to keep the lease current, you can sue them for the share you covered." },
      { num: "02", title: "You had a roommate agreement", body: "Written or oral roommate agreements spell out each person's share. Breaking the agreement (one person not paying their share) is a contract claim. Texts and Venmo records often work in place of a written agreement." },
      { num: "03", title: "You were the lead tenant (sublease arrangement)", body: "If only you signed the lease and your roommate paid you their share, you had a sublease. Their failure to pay is a breach of that sublease, plus the owed rent." },
      { num: "04", title: "Roommate left without paying their last month", body: "Common pattern. They moved out, leaving you to cover their share for the remaining lease period or until a replacement is found. Their share through the lease end (or until replaced) is recoverable." },
    ],
    note: { strongIntro: "The lease structure determines the case.", rest: " If you both signed: suit for their share you covered. If only you signed and they paid you: contract claim against them. If you all signed but the agreement split shares differently: roommate-agreement claim. The basic question is: what did each person owe under what was agreed?" },
  },

  claim: {
    h2: { pre: "How much can you ", em: "claim", post: "?" },
    lede: "Their unpaid share is the floor. Interest plus filing fees stack on top.",
    layers: [
      { tag: "Layer 1", title: "Roommate's unpaid share", body: "Bank record showing you paid full rent. Their agreed share (per lease or roommate agreement). The amount you covered for them = their share unpaid.", amount: "$3,600" },
      { tag: "Layer 2", title: "Interest before the case is decided", body: "State legal rate (7 to 10 percent per year) running from the date you paid each month's rent.", amount: "+ $400", accent: true },
      { tag: "Layer 3", title: "Filing fees, interest after judgment", body: "Filing fee, service-of-process cost, interest that keeps running until they pay.", amount: "+ $200" },
    ],
    total: { label: "Sample total within small-claims cap", body: "3 months of roommate's $1,200 share you covered, plus interest and filing fee.", amount: "$4,200", sublabel: "illustrative · varies by rent and term" },
  },
  whatToProve: {
    h2: { pre: "What you need to ", em: "prove", post: " when a roommate owes rent." },
    lede: "Roommate-rent cases work like any contract case. The hard part is showing the agreement, especially if it was verbal.",
    elements: [
      { title: "There was an agreement about rent", body: "Roommate agreement (written), Venmo/Zelle records showing prior on-time rent, or texts agreeing to specific monthly amounts." },
      { title: "What they owed", body: "Monthly rent share × the number of months unpaid. Include utilities or other regular costs if they were part of the agreement." },
      { title: "You paid their share to keep the lease in good standing", body: "Bank records showing you paid the full rent (yours plus theirs) so you weren't evicted. This is what you're trying to recover." },
      { title: "They've refused or stopped paying", body: "Texts asking for the balance, their responses (or silence), and any partial payments they did make." },
    ],
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede: "Demand letters work especially well in roommate cases because the documentation is usually clean (bank record + Venmo + texts). Most roommates pay or set up a payment plan to avoid court.",
    checklist: [
      "Copy of the lease showing both names",
      "Roommate agreement if any",
      "Bank record showing you paid full rent",
      "Venmo/Zelle/Cash App records of partial payments from roommate",
      "Texts about rent allocation",
      "A 14-day deadline before you file",
      "Sent certified mail",
    ],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3618",
      date: "May 5, 2026",
      recipientName: "Jordan Roommate",
      recipientAddress: "1424 Maple Lane, Phoenix, AZ 85003",
      reLine: "Demand for Unpaid Roommate Rent (Feb-Apr 2026)",
      bodyParagraphs: [
        "We signed a joint lease at 5500 Industrial Way starting 09/01/2024. Total monthly rent: $2,400. We agreed (text 08/22/2024 attached) you would pay 50 percent ($1,200) and I would pay 50 percent. From February 2026 through April 2026, you paid no rent. I covered the full $7,200 to keep the lease current.",
        "Your unpaid share for those 3 months is $3,600. I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Reimbursement of <strong>$3,600</strong> in your unpaid share;",
        "Interest at 10 percent per year (<strong>$400</strong>).",
      ],
      closingLine: "Total demand: <strong>$4,000.00</strong>. If unresolved, I will file in Small Claims Court.",
      signatory: "Reese Q. Tenant",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " an unpaid-rent case." },
    lede: "Four steps. Documentation of payment plus the agreement is the case.",
    steps: [
      { title: "Gather the lease and payment records", body: "Lease showing both names. Roommate agreement (text confirming the split is enough). Your bank statements showing each rent payment. Venmo/Zelle records of partial payments from the roommate." },
      { title: "Send certified-mail demand", body: "Most roommates pay or set up payment plans at this stage. The demand letter formalizes the dispute and creates a paper trail." },
      { title: "File in small claims", body: "If demand fails, file. Filing fees usually run $30 to $100. File in the county where the rental was located." },
      { title: "Hearing", body: "Lead with the lease, the texts about rent allocation, and the bank record showing you paid full rent. Hearings usually run 10 to 15 minutes." },
    ],
    aftermath: { tag: "After you win", title: "Collecting from a former roommate.", bodyHtml: "If they don't pay, you collect using a <strong>judgment lien</strong> (claim on their property), <strong>bank levy</strong> (taking money from their account), or <strong>writ of execution</strong> (court order to seize assets). Wage garnishment is also available. Roommate judgments are collected the same way as any other." },
  },

  evidence: {
    h2: { pre: "What evidence do you need to ", em: "sue your roommate", post: "?" },
    lede: "Lease + bank records + roommate agreement + texts establish the case.",
    cells: [
      { kind: "letter", tag: "Joint lease", letterhead: "Phoenix Property Management · Lease #4218", date: "September 1, 2024", recipientName: "Reese Tenant + Jordan Roommate", reLine: "Joint residential lease · 5500 Industrial Way", bodyParagraphs: [
        "Tenants: Reese Tenant and Jordan Roommate (each fully responsible for the entire rent).",
        "Total monthly rent: $2,400. Term: 12 months from 09/01/2024.",
        "Each tenant is fully responsible for the full rent.",
      ], signatory: "Both tenants signed", signatoryTitle: "Lease executed" },
      { kind: "texts", tag: "Roommate agreement (texts)", texts: [
        { dir: "out", text: "Lease is $2,400. Splitting 50/50 = $1,200 each, right?" },
        { dir: "in", text: "Yes, $1,200 each. I'll Venmo you my half on the 1st of each month." },
        { dir: "out", text: "Sounds good. Lease is signed." },
      ] },
      { kind: "handbook", tag: "Each fully responsible · share-back rights", documentTitle: "Restatement (Second) of Contracts · § 289", sectionTitle: "Co-obligors · right to recover the other's share", bodyParagraphs: [
        "When two people are both fully responsible to a creditor and one of them pays more than their share, that person can collect the share they covered from the other.",
      ], highlight: "Reese paid full $7,200 covering 3 months (Feb-Apr). Jordan's share: $3,600 unpaid.", footer: "Same rule that applies to co-signers and joint borrowers" },
      { kind: "receipt", tag: "Bank record · rent paid", vendor: "WELLS FARGO", vendorAddr: "Account 1234", receiptNum: "Statements Feb-Apr 2026", date: "Feb-Apr 2026", lineItems: [
        { label: "02/01/2026: Rent paid full", amount: "$2,400.00" },
        { label: "03/01/2026: Rent paid full", amount: "$2,400.00" },
        { label: "04/01/2026: Rent paid full", amount: "$2,400.00" },
      ], subtotal: "$7,200.00", total: "$7,200.00", footer: "All paid by Reese · Jordan's share owed" },
    ],
  },

  defenses: {
    h2: { pre: "Common roommate ", em: "defenses", post: ", with rebuttals." },
    lede: "Three arguments cover most rent cases.",
    items: [
      { quote: "I never agreed to pay 50 percent.", pill: "Most common", rebuttal: "<strong>Rebuttal:</strong> bring the text where they confirmed the 50/50 split. Their own words establish the agreement. A joint lease typically defaults to 50/50 unless you both agreed to something else." },
      { quote: "I paid you my share. You're the one who didn't pay.", pill: "Already paid", rebuttal: "<strong>Rebuttal:</strong> bring your bank statement showing rent went to the landlord plus the Venmo record showing what they actually paid you. The numbers show what they paid vs. what was owed." },
      { quote: "We had a different arrangement.", pill: "Different terms", rebuttal: "<strong>Rebuttal:</strong> bring the texts from the time. The text exchange at the lease signing controls. Later recollections of 'different arrangement' rarely succeed without documentation from when it happened." },
    ],
  },

  outcomes: {
    h2: { pre: "How much do tenants ", em: "actually recover", post: "?" },
    lede: "Typical recovery in roommate rent cases.",
    bands: [
      { label: "Low", range: "$200 to $1,500", body: "<strong>Partial recovery.</strong> Court awards portion when documentation is light or the share split is contested.", tier: "low" },
      { label: "Mid", range: "$1,500 to $5,000", body: "<strong>Full unpaid share + interest.</strong> Most common when lease, texts, and bank records combine cleanly.", tier: "mid" },
      { label: "High", range: "$5,000 to $20,000+", body: "<strong>Up to the small-claims cap.</strong> Multi-month or full-lease rent claims push toward the cap.", tier: "high" },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede: "Demand letter is the lowest-friction path.",
    cards: [
      { title: "Demand letter alone", pillLabel: "Free, often effective", pillTier: "primary", whenItFits: "documented joint lease and rent split. Most roommates pay or set up payment plans to avoid court.", tradeoff: "no way to enforce it if they ignore you." },
      { title: "Mediation", pillLabel: "Preserve relationships", pillTier: "good", whenItFits: "you might want to remain on speaking terms. Community mediation centers offer services for $50 to $200.", tradeoff: "no enforcement; only effective if roommate participates." },
      { title: "Small claims (this guide)", pillLabel: "Reliable enforced recovery", pillTier: "warn", whenItFits: "demand letter failed. Damages within your state's cap.", tradeoff: "30 to 90 day timeline. Roommate judgments enforce like any other." },
    ],
  },

  cta: {
    h2: { pre: "Recover the ", em: "unpaid share", post: "." },
    body: "Most roommate rent disputes settle once a demand letter arrives. Our generator builds yours in under two minutes.",
    receipt: { label: "example · 3 months unpaid share", items: [
      { label: "Roommate's unpaid share", amount: "$3,600" },
      { label: "Pre-judgment interest", amount: "+ $400" },
      { label: "Filing fee", amount: "+ $200" },
    ], total: "$4,200", totalLabel: "Total claim", note: "Illustrative. Multi-month or full-lease cases push higher." },
  },

  faqs: [
    { q: "Can I sue my roommate for not paying their share of rent?", a: "Yes. If you covered their share to keep the lease current, you can sue them for that share. If you both signed a joint lease, the law lets the tenant who paid extra collect from the other. If you had a roommate agreement, you also have a breach of contract claim. Bank records plus texts plus the lease are the case." },
    { q: "What if we never had a written roommate agreement?", a: "Texts confirming the split are enough. Even verbal agreements with no documentation can be enforced; when both names are on the lease, the default is a 50/50 split unless you agreed otherwise. A pattern of regular Venmo payments also shows what you agreed to." },
    { q: "What if the roommate moved out before paying?", a: "Their share through the lease end (or until you found a replacement) is recoverable. Many states require you to make a reasonable effort to find a replacement first; document your efforts. The remaining shortfall is recoverable." },
    { q: "Should I just terminate the lease?", a: "Sometimes the cleanest path. Talk to the landlord about replacing the roommate or terminating early. Most landlords prefer payment over the hassle of an eviction. The unpaid share for any covered months is still recoverable from the roommate." },
    { q: "How long do I have to sue?", a: "The deadline (the 'statute of limitations') is 4 to 6 years for written contracts (lease + roommate agreement), 2 to 4 years for oral agreements. The clock usually starts on the date each month's rent was due. Multi-month claims may have separate clocks for each month." },
    { q: "What if my roommate refused to pay because of issues with the apartment?", a: "Their disputes with the landlord are separate from their obligation to pay you their share. They can pursue the landlord for any habitability issues but can't deduct from their roommate share." },
    { q: "Will the landlord care about this case?", a: "Usually not. The landlord cares that the rent gets paid, not who pays it. Your case against the roommate is between you and them. The landlord isn't involved." },
  ],

  relatedSlugs: ["unpaid-bills", "moving-out-no-notice", "property-damage-or-theft", "security-deposit", "no-lease", "emotional-distress"],
};

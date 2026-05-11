import type { RoommateIssue } from "./types";

export const movingOutNoNotice: RoommateIssue = {
  slug: "moving-out-no-notice",
  ready: true,
  short: "Roommate moved out no notice",
  breadcrumbLabel: "Moved Out No Notice",

  meta: {
    title: "Can I Sue My Roommate for Moving Out Without Notice?",
    description: "Plain-English guide to recovering when a roommate breaks the lease early. Their share of remaining rent, breach of agreement, and a demand-letter template.",
  },

  hero: {
    eyebrowSuffix: "Moved out no notice",
    h1: { pre: "Can I sue my roommate for ", em: "moving out without notice", post: "?" },
    leadStrong: "Yes. They owe their share of rent until you find a replacement.",
    leadBody:
      " A roommate who leaves without notice (or breaks the lease early) is on the hook for their share of rent until the lease ends or you find a replacement. State law usually requires you to make a reasonable effort to find a replacement first, but anything you had to cover on your own is recoverable. The lease, the roommate agreement, and your documented efforts to replace them are the case.",
  },

  counter: {
    amount: 5400,
    meta: "Roommate broke the deal + you tried to find a replacement",
    rows: [
      { label: "Their share until replacement (4 months)", value: "$4,800" },
      { label: "Pre-judgment interest", value: "+ $400", emphasis: "accent" },
      { label: "Filing fee", value: "$200", emphasis: "muted" },
    ],
    footer: "Sample · within most state small-claims caps",
  },

  whatCounts: {
    h2: { pre: "What can you recover when a roommate ", em: "moves out early", post: "?" },
    lede: "Four common patterns.",
    cards: [
      { num: "01", title: "Their share through replacement date", body: "Most common. They left, you covered their share, you eventually found a replacement. Their share for the months you covered = recovery." },
      { num: "02", title: "Their share through lease end (no replacement)", body: "If you couldn't find a replacement and the lease ended, their share for the entire remaining period is recoverable. Document your replacement efforts." },
      { num: "03", title: "Damages from their removal of items", body: "If they took shared furniture or appliances when they left, you can recover the value (the legal name for taking your stuff is 'conversion'). Photos before and after prove the loss." },
      { num: "04", title: "Costs to clean their portion of the unit", body: "Cleaning costs, replacement of items they left damaged or filthy. Bring before-and-after photos and a cleaning receipt." },
    ],
    note: { strongIntro: "You have to make a reasonable effort to find a replacement.", rest: " Most state laws require you to try (lawyers call this the 'duty to mitigate'). Documented efforts (Craigslist post, Roomster listings, Facebook posts) protect you. If you don't try, the court can reduce your recovery for months you could have filled the room." },
  },

  claim: {
    h2: { pre: "How much can you ", em: "recover", post: "?" },
    lede: "Their share of rent until replacement plus damages plus filing fees.",
    layers: [
      { tag: "Layer 1", title: "Roommate's share until replaced", body: "Their share of rent for each month from move-out until you found a replacement (or until lease end if no replacement). Bank records showing you paid full rent.", amount: "$4,800" },
      { tag: "Layer 2", title: "Interest before the case is decided", body: "State legal rate (7 to 10 percent per year) running from the date you paid each month's rent.", amount: "+ $400", accent: true },
      { tag: "Layer 3", title: "Filing fees, interest after judgment", body: "Filing fee, service-of-process cost, interest that keeps running until they pay.", amount: "+ $200" },
    ],
    total: { label: "Sample total within small-claims cap", body: "4 months of $1,200 share you covered, plus interest and filing fee.", amount: "$5,400", sublabel: "illustrative · varies by rent and replacement timeline" },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede: "Demand letters work especially well for moved-out roommates because they often want to move on cleanly.",
    checklist: ["Lease showing both names", "Roommate's move-out date and any written notice (or lack thereof)", "Bank records showing rent paid in full", "Documentation of replacement efforts", "Replacement roommate's start date (if applicable)", "A 14-day deadline", "Sent certified mail to forwarding address"],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3620",
      date: "May 5, 2026",
      recipientName: "Jordan Roommate",
      recipientAddress: "1424 Forwarding Address, Phoenix, AZ 85003",
      reLine: "Demand for Roommate Share After Early Move-Out",
      bodyParagraphs: [
        "You moved out of our shared apartment on October 14, 2025 with no advance notice. The lease ran through April 30, 2026. I covered your $1,200 share of rent for November, December, January, and February while I searched for a replacement (Craigslist, Roomster, and Facebook posts attached). A replacement moved in March 1, 2026.",
        "I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Reimbursement of <strong>$4,800</strong> in your share of rent (4 months);",
        "Interest at 10 percent per year (<strong>$400</strong>).",
      ],
      closingLine: "Total demand: <strong>$5,200.00</strong>. If unresolved, I will file in Small Claims Court.",
      signatory: "Reese Q. Tenant",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " a moved-out case." },
    lede: "Four steps. Documenting your replacement efforts is critical.",
    steps: [
      { title: "Start looking for a replacement immediately", body: "Post on Craigslist, Roomster, Facebook, your social networks within days of the roommate leaving. Save screenshots of every post and every response. The court asks 'what did you do to find a replacement?'" },
      { title: "Track the shortfall by month", body: "Each month you covered the roommate's share, log the date and amount. The total shortfall = your claim." },
      { title: "Send certified-mail demand", body: "Use the roommate's forwarding address. If unknown, last known address. Many roommates pay at this stage to close the matter." },
      { title: "Hearing", body: "Lead with the lease, the move-out date, the replacement-search documentation, and the bank records. Hearings usually run 10 to 15 minutes." },
    ],
    aftermath: { tag: "After you win", title: "Collecting from a moved-out roommate.", bodyHtml: "If they don't pay, you collect using a <strong>judgment lien</strong> (claim on their property), <strong>bank levy</strong> (taking money from their account), or <strong>writ of execution</strong> (court order to seize assets). Wage garnishment is also available. Finding them may take some work if they didn't leave a forwarding address." },
  },

  evidence: {
    h2: { pre: "What evidence do you need ", em: "to recover", post: "?" },
    lede: "Lease + bank records + replacement-effort documentation are the case.",
    cells: [
      { kind: "letter", tag: "Joint lease", letterhead: "Phoenix Property · Lease #4218", date: "September 1, 2024", recipientName: "Reese + Jordan", reLine: "Joint lease, 12 months, $2,400/month", bodyParagraphs: [
        "Tenants: each fully responsible for the entire rent (the legal name is 'jointly and severally liable'). Term: 09/01/2024 to 04/30/2026.",
        "Both signed. Standard residential lease.",
      ], signatory: "Both tenants signed", signatoryTitle: "Lease executed" },
      { kind: "texts", tag: "Move-out (no notice)", texts: [
        { dir: "out", text: "Where are you? It's been 3 days, no answer." },
        { dir: "in", text: "I moved out. Couldn't deal anymore. You'll figure out the rent." },
        { dir: "out", text: "You're on the lease. You owe your share until I find a replacement." },
      ] },
      { kind: "handbook", tag: "Duty to try to limit the loss", documentTitle: "Restatement (Second) of Contracts · § 350", sectionTitle: "You have to try to limit your losses", bodyParagraphs: [
        "You can't recover for losses you could have avoided without unreasonable effort, risk, or hardship.",
      ], highlight: "Reese posted Craigslist, Roomster, and Facebook within 7 days of move-out. Replacement found in 4.5 months.", footer: "Standard rule in contract cases" },
      { kind: "receipt", tag: "Replacement-search records", vendor: "CRAIGSLIST + ROOMSTER + FACEBOOK", vendorAddr: "Multiple platforms", receiptNum: "Posts and responses", date: "Oct 2025 - Feb 2026", lineItems: [
        { label: "Craigslist post views and responses", amount: "47 views, 8 responses" },
        { label: "Roomster matches contacted", amount: "12" },
        { label: "Facebook neighborhood group posts", amount: "5" },
        { label: "Replacement found and signed", amount: "March 1, 2026" },
      ], subtotal: "—", total: "—", footer: "Replacement search efforts documented" },
    ],
  },

  defenses: {
    h2: { pre: "Common roommate ", em: "defenses", post: ", with rebuttals." },
    lede: "Three arguments cover most early-move-out cases.",
    items: [
      { quote: "I had to leave for personal reasons.", pill: "Most common", rebuttal: "<strong>Rebuttal:</strong> personal reasons for leaving don't get them out of the lease. The hardship is sympathetic but doesn't erase the obligation. The lease is a binding contract." },
      { quote: "You didn't try to replace me.", pill: "Didn't search", rebuttal: "<strong>Rebuttal:</strong> bring your documented search efforts (Craigslist posts, Roomster matches, Facebook posts). The law requires reasonable effort, not a perfect search. Documentation defeats this defense." },
      { quote: "I gave you 30 days notice.", pill: "Sufficient notice", rebuttal: "<strong>Rebuttal:</strong> 30 days notice doesn't release them from the lease. Notice may have helped your search but doesn't undo the contract. Their share is still owed until you find a replacement." },
    ],
  },

  outcomes: {
    h2: { pre: "How much do tenants ", em: "actually recover", post: "?" },
    lede: "Typical recovery ranges. Documenting your search efforts drives outcomes.",
    bands: [
      { label: "Low", range: "$300 to $1,500", body: "<strong>Partial recovery.</strong> Court reduces it if you didn't try hard enough to find a replacement, or if you found one quickly.", tier: "low" },
      { label: "Mid", range: "$1,500 to $7,500", body: "<strong>Full unpaid share + interest.</strong> Most common with documented search efforts.", tier: "mid" },
      { label: "High", range: "$7,500 to $20,000+", body: "<strong>Up to the small-claims cap.</strong> Long replacement gaps with strong documentation push toward the cap.", tier: "high" },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede: "Demand letter is usually the lowest-friction path.",
    cards: [
      { title: "Demand letter alone", pillLabel: "Free, often effective", pillTier: "primary", whenItFits: "documented breach + replacement search. Most former roommates pay to close the matter cleanly.", tradeoff: "no way to enforce it if they ignore you." },
      { title: "Mediation", pillLabel: "Lower-cost", pillTier: "good", whenItFits: "you're amenable to negotiation. Community mediation centers offer services for $50 to $200.", tradeoff: "no enforcement; only effective if roommate participates." },
      { title: "Small claims (this guide)", pillLabel: "Reliable recovery", pillTier: "warn", whenItFits: "demand failed. Damages within state cap.", tradeoff: "30 to 90 day timeline." },
    ],
  },

  cta: {
    h2: { pre: "Recover the ", em: "shortfall", post: "." },
    body: "Demand letters with mitigation documentation produce settlement in most cases.",
    receipt: { label: "example · 4 months of covered share", items: [
      { label: "Roommate's share until replaced", amount: "$4,800" },
      { label: "Pre-judgment interest", amount: "+ $400" },
      { label: "Filing fee", amount: "+ $200" },
    ], total: "$5,400", totalLabel: "Total claim", note: "Illustrative. Long replacement gaps push higher." },
  },

  faqs: [
    { q: "Can I sue a roommate who left early?", a: "Yes. They owe their share of rent until you find a replacement (or until the lease ends if you can't). Document your search efforts (Craigslist, Roomster posts) to show you made a reasonable effort." },
    { q: "Do I have to find a replacement?", a: "Most state laws require you to try, but reasonable efforts are enough. You don't have to settle for a bad-fit roommate or rush the decision. Document each effort: posts, responses, interviews. The court asks whether your efforts were reasonable." },
    { q: "What if the roommate gave 30 days notice?", a: "30 days notice is helpful but doesn't release them from their share until the lease ends or you find a replacement. The notice may have helped your search but doesn't undo the contract." },
    { q: "What if I had a written roommate agreement?", a: "Use the agreement's terms first. Most agreements spell out how move-out works (notice required, share owed during transition, security deposit handling). The written agreement controls instead of the default rules." },
    { q: "Can the landlord still hold the lease against me?", a: "Yes. The roommate's exit doesn't release you. The landlord's rent demand is still against you. Your case against the moved-out roommate is separate (recovering what you paid)." },
    { q: "How long do I have to sue?", a: "The deadline (the 'statute of limitations') is 4 to 6 years for written agreements, 2 to 4 for oral ones. The clock usually starts running from each unpaid month." },
    { q: "What if the roommate moved cross-country?", a: "Cross-state cases are slightly harder (jurisdiction questions) but doable. File in your local court. If service is needed at their out-of-state address, sheriff or process server in their state can serve. Default judgments are common when out-of-state defendants don't appear." },
  ],

  relatedSlugs: ["unpaid-rent", "unpaid-bills", "property-damage-or-theft", "security-deposit", "no-lease", "emotional-distress"],
};

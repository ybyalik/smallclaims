import type { NeighborIssue } from "./types";

export const harassment: NeighborIssue = {
  slug: "harassment",
  ready: true,
  short: "Neighbor harassment",
  breadcrumbLabel: "Neighbor Harassment",

  meta: {
    title: "Can I Sue My Neighbor for Harassment? Small Claims Guide",
    description:
      "Plain-English guide to suing a neighbor for harassment. Civil harassment + restraining orders, documented incidents, IIED, and a demand-letter template.",
  },

  hero: {
    eyebrowSuffix: "Harassment",
    h1: { pre: "Can I sue my neighbor for ", em: "harassment", post: "?" },
    leadStrong: "Yes. Civil harassment plus restraining orders are both available.",
    leadBody:
      " Repeated targeted conduct (threats, photographing, following, repeated trespass, intimidation) is civil harassment under most state laws. The fastest tool is a civil harassment restraining order (CHRO) from the local court — often free and granted in 7 to 21 days. Damages cases for emotional distress, therapy bills, and security costs go to small claims. Police reports plus a documented log of incidents are the spine of every harassment case.",
  },

  counter: {
    amount: 5500,
    meta: "Civil harassment + IIED",
    rows: [
      { label: "Therapy + medical (documented)", value: "$2,200" },
      { label: "Security upgrade (cameras, locks)", value: "+ $3,000", emphasis: "accent" },
      { label: "Filing fee + interest", value: "$300", emphasis: "muted" },
    ],
    footer: "Sample · within most state small-claims caps",
  },

  whatCounts: {
    h2: { pre: "What counts as ", em: "neighbor harassment", post: "?" },
    lede: "Four common patterns. Each one supports a civil harassment claim and damages.",
    cards: [
      { num: "01", title: "Threats and intimidation", body: "Verbal threats, written threats, displaying weapons, intimidating gestures, repeated unwanted confrontations. Threats of violence or property damage are also separately criminal." },
      { num: "02", title: "Stalking, following, photographing", body: "Following you on walks, photographing or videotaping you (especially at home), parking outside your house. Most states have specific stalking statutes; harassment claims add civil damages." },
      { num: "03", title: "Repeated trespass", body: "Coming onto your property repeatedly without permission, peering into windows, walking through your yard. Each instance is its own trespass claim plus harassment if part of a pattern." },
      { num: "04", title: "Targeted vandalism or pranks", body: "Damaging your property, leaving offensive items, ringing the bell at night, blasting music at your wall. Targeted conduct distinguishes harassment from ordinary nuisance." },
    ],
    note: { strongIntro: "Document every incident.", rest: " Date, time, what happened, who saw it, photo or video if possible. Most states require a 'pattern' (multiple incidents over time) for civil harassment. Single-incident threats can support criminal charges or a single restraining order but usually need the pattern for damages." },
  },

  claim: {
    h2: { pre: "How much can you ", em: "claim", post: "?" },
    lede: "Documented harm wins. Therapy bills, security costs, and (in extreme cases) emotional distress.",
    layers: [
      { tag: "Layer 1", title: "Therapy and medical bills", body: "Therapy, prescriptions, urgent-care visits tied to harassment-induced anxiety. Provider notes connecting treatment to the harassment timeline.", amount: "$2,200" },
      { tag: "Layer 2", title: "Security upgrade", body: "Cameras, motion-activated lights, replaced locks, fence reinforcement. Quote from a security company. The cost to make your home defensible against the harasser.", amount: "+ $3,000", accent: true },
      { tag: "Layer 3", title: "Filing fees, IIED in extreme cases, interest", body: "Filing fee, service-of-process cost. Intentional infliction of emotional distress damages in cases of extreme conduct. Pre-judgment interest at your state's legal rate.", amount: "+ $300" },
    ],
    total: { label: "Sample total within small-claims cap", body: "Therapy bills, security upgrade to make home defensible, plus filing fees.", amount: "$5,500", sublabel: "illustrative · varies by severity" },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede: "Demand letters work especially well when paired with a restraining order petition. Most harassers stop or settle once they see formal legal action.",
    checklist: [
      "Documented incident log with dates and times",
      "Police-call records",
      "Photos or video of incidents",
      "Witness statements (neighbors who saw)",
      "Therapy and security receipts",
      "A 14-day deadline before you file",
      "Sent certified mail",
    ],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3604",
      date: "May 5, 2026",
      recipientName: "Pat Neighbor",
      recipientAddress: "1424 Maple Lane, Phoenix, AZ 85003",
      reLine: "Demand for Damages, Pattern of Harassment Documented December 2025 to Present",
      bodyParagraphs: [
        "Since December 2025, you have engaged in a documented pattern of harassment: repeated trespass on my property (8 incidents), photographing me from your yard (12 incidents), verbal threats (3 incidents). Police calls 25-7821, 26-1182, 26-2218, 26-3217 document each. Witness statements from two neighbors are attached.",
        "I have $2,200 in documented therapy bills tied to harassment-induced anxiety and $3,000 in security upgrades to make my home defensible. I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Reimbursement of <strong>$2,200</strong> in therapy and medical bills;",
        "Reimbursement of <strong>$3,000</strong> in security upgrade costs.",
      ],
      closingLine: "Total demand: <strong>$5,200.00</strong>. If unresolved, I will file a civil harassment restraining order petition and Small Claims Court damages action.",
      signatory: "Cameron Q. Owner",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " a harassment case." },
    lede: "Four steps. Restraining order first; damages case second.",
    steps: [
      { title: "File a civil harassment restraining order", body: "Most states have a fast-track process for CHROs. File at your local courthouse using the state's specific form. Often free or low-cost. Hearing within 21 days; temporary order within days." },
      { title: "Document the pattern", body: "Incident log with dates, times, descriptions. Photos and videos. Police calls (request the call log). Witness statements from neighbors who saw incidents." },
      { title: "File in small claims for damages", body: "Separate from the restraining order. Filing fees usually run $30 to $100. Lead with the documented pattern." },
      { title: "Hearing", body: "Lead with the incident log, police records, and therapy receipts. Hearings usually run 10 to 15 minutes for damages." },
    ],
    aftermath: { tag: "After you win", title: "Restraining orders + collection.", bodyHtml: "The civil harassment restraining order continues to protect you regardless of the small-claims outcome. Money judgments enforce via <strong>judgment lien</strong>, <strong>bank levy</strong>, and <strong>writ of execution</strong>. Violations of restraining orders are separately criminal." },
  },

  evidence: {
    h2: { pre: "What evidence do you need to ", em: "sue your neighbor", post: "?" },
    lede: "Pattern documentation is the case. Each incident logged builds the harassment claim.",
    cells: [
      { kind: "letter", tag: "Incident log", letterhead: "Cameron Owner · Harassment incident log", date: "December 2025 – April 2026", recipientName: "For court records", reLine: "Documented pattern of harassment", bodyParagraphs: [
        "12/14/2025 18:30: Pat trespassed on back yard, walked along the fence. Photo attached.",
        "12/22/2025 22:15: Pat threatened verbally over fence: 'You'll regret moving here.' Witnessed by spouse.",
        "01/08/2026 14:45: Photographed me from his yard with phone. Photo of camera angle attached.",
        "01/22/2026: Police call 26-1182, repeat trespass.",
        "02/04/2026: Police call 26-2218, threatening behavior.",
        "Multiple subsequent incidents through April 2026, total 25 documented.",
      ], signatory: "Cameron Owner", signatoryTitle: "Documenting since 12/14/2025" },
      { kind: "texts", tag: "Threats in writing", texts: [
        { dir: "in", text: "Stay off my property. I'm watching." },
        { dir: "in", text: "You moved here, you can move out." },
        { dir: "out", text: "I have not been on your property. Stop the threats. Saving these messages." },
      ] },
      { kind: "handbook", tag: "Civil harassment statute", documentTitle: "Arizona Revised Statutes · § 12-1809", sectionTitle: "Civil harassment definition", bodyParagraphs: [
        "Harassment means conduct that is directed at a specific person and that would cause a reasonable person to be seriously alarmed, annoyed or harassed and the conduct in fact seriously alarms, annoys or harasses the person.",
      ], highlight: "25 documented incidents over 5 months. Pattern meets statutory definition.", footer: "Civil harassment restraining order available under § 12-1809" },
      { kind: "receipt", tag: "Therapy + security", vendor: "PHOENIX MEDICAL + SECURITY GROUP", vendorAddr: "Combined claim", receiptNum: "Statement", date: "Q1-Q2 2026", lineItems: [
        { label: "Therapy sessions (10)", amount: "$1,800.00" },
        { label: "Anxiety prescriptions", amount: "$400.00" },
        { label: "Security cameras + monitoring", amount: "$1,800.00" },
        { label: "Replaced fence + locks", amount: "$1,200.00" },
      ], subtotal: "$5,200.00", total: "$5,200.00", footer: "Documented out-of-pocket costs" },
    ],
  },

  defenses: {
    h2: { pre: "Common neighbor ", em: "defenses", post: ", with rebuttals." },
    lede: "Three arguments cover most harassment cases.",
    items: [
      { quote: "It's a misunderstanding. We just don't get along.", pill: "Most common", rebuttal: "<strong>Rebuttal:</strong> bring the documented pattern. Mutual dislike is not harassment; targeted, repeated conduct is. The pattern over weeks or months distinguishes the two." },
      { quote: "You're being oversensitive.", pill: "Sensitivity", rebuttal: "<strong>Rebuttal:</strong> the standard is the reasonable person, not your subjective sensitivity. Witness statements and police involvement establish that the conduct was objectively beyond the line." },
      { quote: "I have free speech / property rights / I was just looking out my window.", pill: "Rights", rebuttal: "<strong>Rebuttal:</strong> targeted conduct loses constitutional protection when it crosses into harassment. Photographing your neighbor through their windows is not protected expression. The pattern matters." },
    ],
  },

  outcomes: {
    h2: { pre: "How much do owners ", em: "actually recover", post: "?" },
    lede: "Typical recovery in harassment cases. Documented pattern plus medical and security costs drive results.",
    bands: [
      { label: "Low", range: "$300 to $1,500", body: "<strong>Documented direct costs.</strong> Therapy bills only. Common when pattern is short or evidence is light.", tier: "low" },
      { label: "Mid", range: "$1,500 to $5,000", body: "<strong>Therapy plus security.</strong> Most common when pattern is well-documented.", tier: "mid" },
      { label: "High", range: "$5,000 to $20,000+", body: "<strong>Major harassment plus IIED.</strong> Cap-of-court awards for severe long-term harassment with significant medical impact.", tier: "high" },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede: "Restraining orders provide ongoing protection. Police involvement establishes record. Small claims is for monetary damages.",
    cards: [
      { title: "Civil harassment restraining order", pillLabel: "Free or low-cost, fast", pillTier: "primary", whenItFits: "ongoing harassment. State courts grant temporary orders within days; full hearing within 21 days. Restraining orders are independent of damages.", tradeoff: "no money damages. Use alongside the small-claims action, not as a replacement." },
      { title: "Police and criminal complaint", pillLabel: "Free", pillTier: "good", whenItFits: "threats, vandalism, or stalking. Police investigate and prosecute. Criminal record creates strong leverage for civil settlement.", tradeoff: "criminal cases focus on punishment, not your damages. File alongside civil action." },
      { title: "Small claims (this guide)", pillLabel: "For monetary damages", pillTier: "warn", whenItFits: "documented therapy, security, or property damage costs. Damages within your state's cap.", tradeoff: "30 to 90 day timeline. Cannot order an injunction." },
    ],
  },

  cta: {
    h2: { pre: "Stop the ", em: "harassment", post: "." },
    body: "Demand letters paired with a restraining order petition usually stop harassment quickly. Our generator builds yours in under two minutes.",
    receipt: { label: "example · documented harassment pattern", items: [
      { label: "Therapy + medical", amount: "$2,200" },
      { label: "Security upgrade", amount: "+ $3,000" },
      { label: "Filing fee + interest", amount: "+ $300" },
    ], total: "$5,500", totalLabel: "Total claim", note: "Illustrative. Severe long-term cases push higher." },
  },

  faqs: [
    { q: "What is a civil harassment restraining order?", a: "A court order that prohibits a specific person from contacting you, coming near your home, or engaging in specific conduct. Most states have a fast-track process: temporary order within days, full hearing within 21 days. Often free or low-cost. Effective for 1 to 5 years; renewable." },
    { q: "Do I need to call the police?", a: "Yes, ideally for each incident. Police-call records become evidence. Even when officers do not arrest or cite, the documented call establishes the pattern. Request the call log from the police department for use at the hearing." },
    { q: "What about the criminal side?", a: "Threats, stalking, vandalism, and trespass are crimes in most states. Criminal cases focus on punishment of the offender; civil cases focus on your damages. Criminal complaints often run alongside civil actions." },
    { q: "How do I document harassment?", a: "Incident log with dates, times, descriptions, witnesses. Photos and video when possible. Police-call records. Therapy and security receipts. The pattern is the case; document each incident even if it seems minor." },
    { q: "Can I sue for emotional distress?", a: "Yes. Intentional infliction of emotional distress (IIED) requires extreme conduct, intent, and severe distress. Documented harassment usually meets the standard. Therapy bills and provider notes establish damages." },
    { q: "How long do I have to sue?", a: "Civil harassment claims usually run 1 to 3 years from the most recent incident. Continuing conduct resets the clock. Restraining orders should be filed promptly after incidents." },
    { q: "What if my neighbor's harassment is minor but constant?", a: "Constant minor harassment establishes pattern. Each individual incident might not meet the threshold, but the cumulative pattern over weeks or months does. Document everything." },
  ],

  relatedSlugs: ["noise", "smoke-and-odors", "property-damage", "fence-dispute", "blocking-driveway", "construction-damage"],
};

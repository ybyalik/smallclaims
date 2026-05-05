import type { NeighborIssue } from "./types";

export const smokeAndOdors: NeighborIssue = {
  slug: "smoke-and-odors",
  ready: true,
  short: "Smoke and odors",
  breadcrumbLabel: "Smoke and Odors",

  meta: {
    title: "Can I Sue My Neighbor for Smoke or Odors? Small Claims Guide",
    description:
      "Plain-English guide to suing a neighbor for cigar smoke, marijuana, BBQ, or other persistent odors. Private nuisance, city smoke ordinances, and a demand-letter template.",
  },

  hero: {
    eyebrowSuffix: "Smoke and odors",
    h1: { pre: "Can I sue my neighbor for ", em: "smoke or odors", post: "?" },
    leadStrong: "Yes. Persistent smoke or odors are a private nuisance.",
    leadBody:
      " Cigar smoke, marijuana, BBQ, gasoline storage, paint fumes, garbage smells. Persistent or excessive odors that interfere with your reasonable use of your property are private nuisance under state law. Several cities have specific smoke ordinances (smoke-free multiunit housing). Recovery includes the cost to mitigate (air purifiers, sealed windows), medical bills (asthma, allergies), and (in extreme cases) emotional distress.",
  },

  counter: {
    amount: 3400,
    meta: "Private nuisance + city smoke ordinances",
    rows: [
      { label: "Air purification + sealed windows", value: "$2,400" },
      { label: "Medical (asthma triggered)", value: "+ $800", emphasis: "accent" },
      { label: "Filing fee + interest", value: "$200", emphasis: "muted" },
    ],
    footer: "Sample · within most state small-claims caps",
  },

  whatCounts: {
    h2: { pre: "What kinds of ", em: "smoke or odors", post: " support a lawsuit?" },
    lede: "Four common patterns. The standard is whether a reasonable person would consider it unreasonable.",
    cards: [
      { num: "01", title: "Cigarette and cigar smoke", body: "Many states and cities prohibit smoking that affects neighbors in multiunit housing. Single-family disputes are governed by nuisance law. Documented health impacts (asthma triggers, respiratory issues) strengthen the case." },
      { num: "02", title: "Marijuana smoke", body: "Even in legal-cannabis states, marijuana smoke causing nuisance to neighbors is actionable. Medical-marijuana statutes do not protect smokers from nuisance claims by affected neighbors." },
      { num: "03", title: "BBQ, paint, chemical odors", body: "Excessive BBQ smoke (especially commercial-grade smokers running for hours), paint and solvent fumes, gasoline or chemical storage, septic odors. Persistent or extreme odors qualify." },
      { num: "04", title: "Garbage, animal, or commercial odors", body: "Improper trash storage, hoarded animals, livestock in residential areas, commercial activity (food preparation, recycling) creating odors. Many cities have specific ordinances." },
    ],
    note: { strongIntro: "Document with timestamps and witnesses.", rest: " Photos of the source if visible. Date and time of each occurrence. Witness statements from other neighbors who experience the same. Most state nuisance laws require pattern (multiple occurrences over time)." },
  },

  claim: {
    h2: { pre: "How much can you ", em: "claim", post: "?" },
    lede: "Mitigation is the floor. Medical bills and consequential damages stack on top.",
    layers: [
      { tag: "Layer 1", title: "Air purification and sealing", body: "Air purifiers (HEPA + activated carbon, $400 to $800 each), sealed windows and door gaps, ventilation upgrades. Quote from a contractor.", amount: "$2,400" },
      { tag: "Layer 2", title: "Medical and consequential damages", body: "Asthma medication, urgent-care visits for respiratory issues, allergy treatment. Provider notes connecting symptoms to the smoke or odor exposure.", amount: "+ $800", accent: true },
      { tag: "Layer 3", title: "Filing fees, lost rental income, interest", body: "Filing fee, lost rental income if you rent the property and tenants left. Pre-judgment interest at your state's legal rate.", amount: "+ $200" },
    ],
    total: { label: "Sample total within small-claims cap", body: "Air purification and sealing plus medical bills, plus filing fee.", amount: "$3,400", sublabel: "illustrative · varies by extent" },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede: "Demand letters work best when paired with HOA or police-call records. Most neighbors stop or reduce odors once formal action is in motion.",
    checklist: [
      "Documented log of incidents",
      "Photos of the source if visible",
      "Witness statements from other neighbors",
      "City ordinance citation if applicable",
      "Mitigation quote from a contractor",
      "A 14-day deadline before you file",
      "Sent certified mail",
    ],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3609",
      date: "May 5, 2026",
      recipientName: "Pat Neighbor",
      recipientAddress: "1424 Maple Lane, Portland, OR 97201",
      reLine: "Demand for Damages, Persistent Cigar Smoke",
      bodyParagraphs: [
        "Since November 2025, you have smoked cigars on your back patio for 2 to 4 hours daily, with smoke drifting directly into my home through windows and HVAC. I have documented 80+ incidents (log attached) and made 12 noise/odor complaints to the city. Two other neighbors (statements attached) confirm the same exposure.",
        "I have $2,400 in air purification and window-sealing costs and $800 in asthma-related medical bills. I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Reimbursement of <strong>$2,400</strong> in mitigation costs;",
        "Reimbursement of <strong>$800</strong> in medical bills.",
      ],
      closingLine: "Total demand: <strong>$3,200.00</strong>. If unresolved, I will file in Small Claims Court and pursue an injunction restraining smoking that affects my property.",
      signatory: "Skylar Q. Owner",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " a smoke or odor case." },
    lede: "Four steps. Pattern documentation is the spine.",
    steps: [
      { title: "Document the pattern", body: "Daily log of incidents with dates, times, descriptions. Photos when source is visible. Witness statements from other affected neighbors." },
      { title: "File HOA or city complaints", body: "If you live in an HOA or the city has a smoke ordinance, file complaints. The cumulative complaint record is decisive evidence at the hearing." },
      { title: "File in small claims", body: "If demand letter and complaints do not resolve within 60 days, file. Filing fees usually run $30 to $100." },
      { title: "Hearing", body: "Lead with the incident log, witness statements, and medical bills. Hearings usually run 10 to 15 minutes." },
    ],
    aftermath: { tag: "After you win", title: "Collecting plus injunction.", bodyHtml: "Money judgments enforce via <strong>judgment lien</strong>, <strong>bank levy</strong>, and <strong>writ of execution</strong>. For ongoing protection (the conduct is ongoing), small claims cannot order an injunction; for that, higher court is needed. The judgment itself usually pressures the neighbor to stop or relocate the activity." },
  },

  evidence: {
    h2: { pre: "What evidence do you need to ", em: "sue your neighbor", post: "?" },
    lede: "Pattern documentation, witness statements, and medical bills are the case.",
    cells: [
      { kind: "letter", tag: "Incident log", letterhead: "Skylar Owner · Smoke incident log", date: "Nov 2025 – Apr 2026", recipientName: "For court records", reLine: "Documented pattern of cigar smoke", bodyParagraphs: [
        "11/14/2025 17:00-19:30: Pat smoking cigars on back patio. Smoke entering bedroom and HVAC.",
        "11/22/2025 16:30-21:00: Same. Multiple cigars. Smoke heavy.",
        "Daily incidents continued through April 2026, 80+ documented.",
        "Avg duration: 2 to 4 hours. Avg start: 16:00 to 17:00.",
      ], signatory: "Skylar Owner", signatoryTitle: "Documenting since 11/14/2025" },
      { kind: "texts", tag: "Witness corroboration", texts: [
        { dir: "in", text: "Yeah we get the smoke too. It comes through our kitchen window every evening." },
        { dir: "in", text: "Our daughter has asthma. Three urgent care visits since fall." },
        { dir: "out", text: "I'm filing a small claims case. Would you give a written statement?" },
      ] },
      { kind: "handbook", tag: "City smoke ordinance", documentTitle: "Portland Municipal Code · § 8.65.060", sectionTitle: "Smoking creating nuisance", bodyParagraphs: [
        "It shall be unlawful for any person to smoke any tobacco product in a manner that creates a nuisance affecting another person's reasonable enjoyment of property, including drift of smoke onto adjacent properties.",
      ], highlight: "Daily 2-4 hour smoking sessions for 5+ months. Pattern meets nuisance threshold.", footer: "Portland Municipal Code · health and nuisance" },
      { kind: "receipt", tag: "Mitigation + medical", vendor: "AIR FILTRATION + URGENT CARE", vendorAddr: "Combined claim", receiptNum: "Statement", date: "Q4 2025 - Q1 2026", lineItems: [
        { label: "HEPA + carbon air purifiers (2)", amount: "$1,600.00" },
        { label: "Window sealing service", amount: "$800.00" },
        { label: "Urgent care (asthma) x3", amount: "$600.00" },
        { label: "Asthma medication", amount: "$200.00" },
      ], subtotal: "$3,200.00", total: "$3,200.00", footer: "Documented mitigation and medical" },
    ],
  },

  defenses: {
    h2: { pre: "Common neighbor ", em: "defenses", post: ", with rebuttals." },
    lede: "Three arguments cover most smoke cases.",
    items: [
      { quote: "I have the right to smoke on my own property.", pill: "Most common", rebuttal: "<strong>Rebuttal:</strong> property rights end at your property line. Smoke that drifts onto neighbor's property and affects their reasonable use is nuisance regardless of whether the smoking is on your property." },
      { quote: "Smoking is legal in this state.", pill: "Legality", rebuttal: "<strong>Rebuttal:</strong> legality of smoking does not waive nuisance claims. Marijuana is also legal in many states, but cannabis smoke causing nuisance is still actionable. Legality and nuisance are separate analyses." },
      { quote: "I'd have to stop smoking entirely. That's unreasonable.", pill: "Burden", rebuttal: "<strong>Rebuttal:</strong> the remedy can be a restriction (smoking only at certain times, in certain areas, with mitigation), not a total ban. Most courts craft narrow remedies. Total bans are reserved for extreme cases." },
    ],
  },

  outcomes: {
    h2: { pre: "How much do owners ", em: "actually recover", post: "?" },
    lede: "Typical recovery in smoke and odor cases.",
    bands: [
      { label: "Low", range: "$200 to $1,000", body: "<strong>Mitigation only.</strong> Court awards air purifier costs but not medical or emotional distress.", tier: "low" },
      { label: "Mid", range: "$1,000 to $4,000", body: "<strong>Mitigation plus medical.</strong> Most common when pattern and witness statements are documented.", tier: "mid" },
      { label: "High", range: "$4,000 to $15,000+", body: "<strong>Major nuisance + lost rental income.</strong> Cases with rental loss or sustained health impacts push higher.", tier: "high" },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede: "HOA, city code enforcement, and police calls often produce faster resolution than court.",
    cards: [
      { title: "City code enforcement", pillLabel: "Free, regulatory", pillTier: "primary", whenItFits: "the city has smoke or nuisance ordinances. Code enforcement issues citations and can require mitigation.", tradeoff: "many cities only enforce on multiunit-housing complaints, not single-family." },
      { title: "HOA action", pillLabel: "Free, often required first", pillTier: "good", whenItFits: "you live in an HOA. Most HOAs have nuisance and smoking rules. HOA citations create documented record useful for small-claims.", tradeoff: "limited to HOA members. Fines may not deter; the documented record is the value." },
      { title: "Small claims (this guide)", pillLabel: "For damages and pattern", pillTier: "warn", whenItFits: "documented pattern with quantifiable mitigation and medical costs. Damages within your state's cap.", tradeoff: "30 to 90 day timeline. Cannot order an injunction." },
    ],
  },

  cta: {
    h2: { pre: "Stop the ", em: "smoke", post: "." },
    body: "Demand letters with witness statements and medical documentation usually produce settlement. Our generator builds yours in under two minutes.",
    receipt: { label: "example · daily cigar smoke", items: [
      { label: "Air purification + sealing", amount: "$2,400" },
      { label: "Medical (asthma)", amount: "+ $800" },
      { label: "Filing fee + interest", amount: "+ $200" },
    ], total: "$3,400", totalLabel: "Total claim", note: "Illustrative. Major nuisance cases push higher." },
  },

  faqs: [
    { q: "Can I sue my neighbor for cigarette smoke?", a: "Yes, when it's persistent and unreasonable. Single instances are not actionable. Pattern of daily exposure causing documented health impacts (asthma triggers, respiratory issues) plus mitigation costs creates a winning case." },
    { q: "What about marijuana smoke in legal-cannabis states?", a: "Cannabis legality does not waive nuisance claims. Smoke that drifts onto neighbors and causes nuisance is still actionable. Most state legalization statutes specifically preserve nuisance claims by affected neighbors." },
    { q: "What about BBQ smoke and cooking odors?", a: "Occasional BBQ is normal and not actionable. Daily multi-hour BBQ, commercial-grade smokers, or aggressive odors that persist beyond reasonable cooking are nuisance. The pattern and intensity matter." },
    { q: "Do I need to prove specific health impacts?", a: "Helpful but not required. Documented mitigation costs (air purifiers, sealed windows) are recoverable as direct damages. Medical bills strengthen the case but are not essential. The reasonable-person standard for nuisance focuses on the unreasonableness of the conduct." },
    { q: "What if I live in an HOA?", a: "File HOA complaints first. Most HOAs have nuisance rules and can issue fines. The HOA citation record is decisive evidence at the hearing. Use HOA action alongside small-claims, not as a replacement." },
    { q: "How long do I have to sue?", a: "Private nuisance claims usually run 1 to 3 years from the most recent incident. Continuing-tort cases reset the clock with each new instance. Move fast on the formal complaint side." },
    { q: "Can I get an injunction stopping the smoking?", a: "Small claims cannot order injunctions. For an injunction restraining future smoke or odors, file in higher court (small claims for damages, civil court for injunction). The two cases run separately. The judgment itself usually pressures the conduct to stop." },
  ],

  relatedSlugs: ["noise", "harassment", "property-damage", "blocking-driveway", "tree-encroachment", "construction-damage"],
};

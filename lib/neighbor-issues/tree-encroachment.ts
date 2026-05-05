import type { NeighborIssue } from "./types";

export const treeEncroachment: NeighborIssue = {
  slug: "tree-encroachment",
  ready: true,
  short: "Tree encroachment",
  breadcrumbLabel: "Tree Encroachment",

  meta: {
    title: "Can I Sue My Neighbor for Tree Damage and Encroachment?",
    description:
      "Plain-English guide to recovering when a neighbor's tree branches or roots damage your property. The Massachusetts and Hawaii rules, self-help limits, and a demand-letter template.",
  },

  hero: {
    eyebrowSuffix: "Tree encroachment",
    h1: { pre: "Can I sue my neighbor for ", em: "tree damage", post: "?" },
    leadStrong: "Yes, when branches or roots actively damage your property.",
    leadBody:
      " Most states follow some version of the 'Hawaii rule' (you can sue for actual damage caused by encroaching branches or roots) or the 'Massachusetts rule' (self-help only — you trim what crosses the line). Either way, if the encroaching tree caused damage to your home, foundation, plumbing, or fence, you have a claim. Damage to a sewer line from invasive roots is the most common case. Self-help (trimming) is allowed in every state up to the property line.",
  },

  counter: {
    amount: 4800,
    meta: "Trespass + nuisance · encroaching vegetation",
    rows: [
      { label: "Plumbing repair (root invasion)", value: "$3,400" },
      { label: "Tree trimming and removal", value: "+ $1,200", emphasis: "accent" },
      { label: "Filing fee + interest", value: "$200", emphasis: "muted" },
    ],
    footer: "Sample · within most state small-claims caps",
  },

  whatCounts: {
    h2: { pre: "When can you sue for ", em: "tree encroachment", post: "?" },
    lede: "Four common patterns. Each one is recoverable under tree law in most states.",
    cards: [
      { num: "01", title: "Roots damaging foundation or plumbing", body: "The most common case. Tree roots invade sewer lines, lift foundations, crack driveways. Most states allow recovery for actual damage even under the strict Massachusetts rule." },
      { num: "02", title: "Branches that fell and caused damage", body: "Branches that broke off and caused damage to your house, fence, or vehicles. Different from a fallen-tree case (whole tree); branch-only cases follow standard negligence rules." },
      { num: "03", title: "Trespassing branches you had to trim yourself", body: "You can self-help trim branches up to the property line in every state. Recovery for the trimming cost is usually limited to extreme cases (commercial-grade trimming, repeat infestation)." },
      { num: "04", title: "Killed plants or grass from leaf or fruit drop", body: "Walnut and oak tree leaves and fruit kill grass and small plants. Many state nuisance laws allow recovery for the cost to replace killed vegetation." },
    ],
    note: { strongIntro: "Self-help has limits.", rest: " You can trim branches and roots up to the property line — but no further. Crossing onto the neighbor's property to cut, or killing the tree by aggressive root cutting, can create liability against you. Stick to the property line and the trees you cut should remain healthy." },
  },

  claim: {
    h2: { pre: "How much can you ", em: "claim", post: "?" },
    lede: "Repair cost is the floor. Trimming, replacement, and consequential damages stack on top.",
    layers: [
      { tag: "Layer 1", title: "Repair cost", body: "Plumbing repair (most common — roots invading sewer lines), foundation repair, driveway resurfacing. Quote from a licensed contractor.", amount: "$3,400" },
      { tag: "Layer 2", title: "Tree trimming and removal", body: "Cost to trim branches up to the property line, or to remove the encroaching tree if it cannot be safely trimmed. Licensed arborist's quote.", amount: "+ $1,200", accent: true },
      { tag: "Layer 3", title: "Filing fees, replacement plants, interest", body: "Filing fee, replacement of killed plants or grass, pre-judgment interest at your state's legal rate.", amount: "+ $200" },
    ],
    total: { label: "Sample total within small-claims cap", body: "Sewer-line repair from invading roots, plus trimming costs to prevent recurrence, plus filing fee.", amount: "$4,800", sublabel: "illustrative · varies by damage type" },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede: "Demand letters work especially well in tree cases because the neighbor's homeowners carrier covers exactly this. Most cases settle within 30 to 60 days.",
    checklist: [
      "Photos of the encroaching tree and the damage caused",
      "Plumbing or contractor's report linking the damage to the tree",
      "Repair quote from a licensed contractor",
      "Documentation that the tree is on the neighbor's property",
      "A 14-day deadline before you file",
      "Sent certified mail with copy to the homeowners carrier",
    ],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3602",
      date: "May 5, 2026",
      recipientName: "Pat Neighbor",
      recipientAddress: "1424 Maple Lane, Boston, MA 02101",
      reLine: "Demand for Damages, Tree Roots Invaded Sewer Line",
      bodyParagraphs: [
        "Roots from your maple tree at the property line have invaded my main sewer line and caused a backup. The plumbing report from Boston Plumbing Co. (license #38291) confirms the roots are from your tree (DNA-matched to maple, Acer rubrum).",
        "Repair quote: $3,400. Tree trimming to prevent recurrence: $1,200. I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Reimbursement of <strong>$3,400</strong> in plumbing repair;",
        "Reimbursement of <strong>$1,200</strong> in tree trimming costs.",
      ],
      closingLine: "Total demand: <strong>$4,600.00</strong>. If unresolved, I will file in Small Claims Court.",
      signatory: "Avery Q. Owner",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " a tree-encroachment case." },
    lede: "Four steps. The plumbing or contractor's report linking the damage to the specific tree is the spine.",
    steps: [
      { title: "Get a contractor's diagnostic report", body: "Plumbing report (root sample, identification), foundation engineer's report, or arborist's encroachment assessment. Cost: $200 to $500." },
      { title: "File with neighbor's homeowners carrier", body: "Most homeowners policies cover damage to others' property. File a third-party claim using policy info." },
      { title: "File in small claims", body: "If carrier and demand do not resolve within 60 days, file. Filing fees usually run $30 to $100." },
      { title: "Hearing", body: "Lead with the contractor's report linking the damage to the tree. Hearings usually run 10 to 15 minutes." },
    ],
    aftermath: { tag: "After you win", title: "Collecting from a neighbor.", bodyHtml: "Most cases pay through homeowners insurance. After 30 days post-judgment, the enforcement tools are a <strong>judgment lien</strong>, a <strong>bank levy</strong>, and a <strong>writ of execution</strong>." },
  },

  evidence: {
    h2: { pre: "What evidence do you need to ", em: "sue your neighbor", post: "?" },
    lede: "The plumbing or contractor's report is decisive. Photos of the tree on the neighbor's property establish the source.",
    cells: [
      { kind: "photos", tag: "Tree and damage", photos: [
        { id: "1581094271901-8022df4466f9", cap: "Maple at property line" },
        { id: "1556909114-f6e7ad7d3136", cap: "Roots at sewer" },
        { id: "1581092335397-9583eb92d232", cap: "Backup damage" },
        { id: "1503602642458-232111445657", cap: "Property line" },
      ] },
      { kind: "letter", tag: "Plumbing report", letterhead: "Boston Plumbing Co. · License #38291", date: "April 22, 2026", recipientName: "Avery Owner", reLine: "Sewer line root invasion · Diagnostic", bodyParagraphs: [
        "Inspected the main sewer line on April 22, 2026. Camera revealed root mass at 18-foot mark. Sample collected and identified as Acer rubrum (red maple).",
        "Source: red maple at neighboring property line. Repair: full pipe replacement, $3,400. Recommend tree trimming or removal to prevent recurrence.",
      ], signatory: "T. Romero", signatoryTitle: "Master Plumber" },
      { kind: "texts", tag: "Notice to neighbor", texts: [
        { dir: "out", text: "Pat — your maple roots are in my sewer. Plumber confirmed it." },
        { dir: "in", text: "Send me what they said." },
        { dir: "out", text: "Sent the report. Need to trim roots and pay for the repair." },
      ] },
      { kind: "receipt", tag: "Repair quote", vendor: "BOSTON PLUMBING CO.", vendorAddr: "License #38291 · Boston, MA", receiptNum: "Quote #2026-118", date: "04/22/2026", lineItems: [
        { label: "Pipe excavation and replacement (18 ft)", amount: "$2,400.00" },
        { label: "Root removal and barrier", amount: "$700.00" },
        { label: "Permit and final inspection", amount: "$300.00" },
      ], subtotal: "$3,400.00", total: "$3,400.00", footer: "Materials and labor included" },
    ],
  },

  defenses: {
    h2: { pre: "Common neighbor ", em: "defenses", post: ", with rebuttals." },
    lede: "Three arguments cover most encroachment cases.",
    items: [
      { quote: "Trim the branches yourself. That's your right.", pill: "Most common", rebuttal: "<strong>Rebuttal:</strong> self-help is your right but does not waive recovery for actual damage. The Massachusetts rule (self-help only) applies to undamaged encroachment; damage to plumbing or foundation is recoverable in every state." },
      { quote: "I didn't know the roots were a problem.", pill: "Knowledge", rebuttal: "<strong>Rebuttal:</strong> tree owners are responsible for damage their trees cause regardless of knowledge in most states. The plumbing report linking the damage to the specific tree establishes liability." },
      { quote: "The tree was here before you bought the house.", pill: "Pre-existing", rebuttal: "<strong>Rebuttal:</strong> tree-cause damage is a continuing tort. Each new instance of damage triggers a new claim. The plumbing failure happened recently regardless of when the tree was planted." },
    ],
  },

  outcomes: {
    h2: { pre: "How much do owners ", em: "actually recover", post: "?" },
    lede: "Typical recovery in encroachment cases.",
    bands: [
      { label: "Low", range: "$300 to $1,500", body: "<strong>Trimming-only awards.</strong> Court awards self-help trimming costs but rejects damage claim.", tier: "low" },
      { label: "Mid", range: "$1,500 to $5,000", body: "<strong>Repair plus trimming.</strong> Most common when contractor's report is clear.", tier: "mid" },
      { label: "High", range: "$5,000 to $20,000+", body: "<strong>Major structural damage.</strong> Foundation damage from invasive roots, full sewer line replacement, or repeated damage push to cap.", tier: "high" },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede: "Insurance is usually the fastest path. Self-help works for non-damage encroachment.",
    cards: [
      { title: "Neighbor's homeowners insurance", pillLabel: "Free, fast", pillTier: "primary", whenItFits: "tree damage to your property. File a third-party claim.", tradeoff: "carriers may dispute root-damage cases as 'gradual'." },
      { title: "Self-help trimming", pillLabel: "Free, immediate", pillTier: "good", whenItFits: "you can trim encroaching branches up to the property line. No lawsuit needed for ongoing trimming.", tradeoff: "stick to the property line. Killing the tree by aggressive cutting creates liability against you." },
      { title: "Small claims", pillLabel: "When insurance fails", pillTier: "warn", whenItFits: "carrier denied or undervalued. Damages within your state's cap.", tradeoff: "30 to 90 day timeline." },
    ],
  },

  cta: {
    h2: { pre: "Recover the ", em: "repair cost", post: "." },
    body: "Demand letters with a contractor's report linking damage to the specific tree usually produce settlement. Our generator builds yours in under two minutes.",
    receipt: { label: "example · roots in sewer line", items: [
      { label: "Plumbing repair", amount: "$3,400" },
      { label: "Tree trimming", amount: "+ $1,200" },
      { label: "Filing fee + interest", amount: "+ $200" },
    ], total: "$4,800", totalLabel: "Total claim", note: "Illustrative. Foundation damage cases push higher." },
  },

  faqs: [
    { q: "What is the Massachusetts rule for trees?", a: "A common-law rule that limits recovery for tree encroachment to self-help: you can trim branches and roots up to the property line, but you cannot sue the neighbor for the encroachment itself unless it caused actual damage. Several states follow this rule strictly; most allow recovery for damage." },
    { q: "What is the Hawaii rule?", a: "A more tenant-friendly rule that allows recovery for any actual damage caused by encroaching trees, including the cost of trimming and replacement. Hawaii, California, and several other states follow this rule. The end result is similar to most states' modern application." },
    { q: "Can I cut my neighbor's tree branches that hang over my yard?", a: "Yes, in every state, up to the property line. You cannot cross onto their property to cut. You also cannot kill the tree by aggressive root cutting. Stick to the line and your trimming should leave the tree healthy." },
    { q: "How do I prove the roots came from a specific tree?", a: "DNA matching by a plumbing or arborist's lab. Most modern plumbing companies do root identification as standard practice. Cost: usually included in the diagnostic. The report establishes the source." },
    { q: "What if my own insurance covers the damage?", a: "Use your homeowners insurance for fast repair. Your carrier will pursue the neighbor's carrier (subrogation). You eat the deductible; your carrier handles the rest. Useful when you need fast repair." },
    { q: "How long do I have to sue?", a: "Property damage claims usually run 2 to 4 years. Continuing-tort cases (ongoing root damage) reset the clock with each new instance of damage. Move fast on each new instance." },
    { q: "What if the neighbor refuses to pay?", a: "File in small claims after the demand letter. Judgment liens against the neighbor's house are very effective; most homeowners settle to clear their title. Also file with the homeowners carrier, which often resolves before court." },
  ],

  relatedSlugs: ["dead-tree-fell", "property-damage", "water-runoff", "fence-dispute", "construction-damage", "noise"],
};

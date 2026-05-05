import type { ContractorIssue } from "./types";

export const landscaperBadWork: ContractorIssue = {
  slug: "landscaper-bad-work",
  ready: true,
  short: "Landscaper bad work",
  breadcrumbLabel: "Landscaper Bad Work",

  meta: {
    title: "Can I Sue a Landscaper for Bad Work? Small Claims Guide",
    description:
      "Plain-English guide to recovering from landscapers for dead plants, killed lawns, broken irrigation, and damaged hardscape. Plant warranty, replacement-cost recovery, and a demand-letter template.",
  },

  hero: {
    eyebrowSuffix: "Landscaper bad work",
    h1: { pre: "Can I sue a landscaper for ", em: "bad work", post: "?" },
    leadStrong: "Yes. Plant warranties and workmanship standards apply.",
    leadBody:
      " A landscaper whose work resulted in dead plants, killed lawns, broken irrigation, or damaged hardscape is liable under contract and the implied warranty of workmanlike construction. Most landscapers offer plant warranties (typically 30 to 90 days). Plus contractor-licensing rules apply once jobs exceed your state's threshold. Small claims is well-suited because most landscape disputes fit the cap.",
  },

  counter: {
    amount: 4200,
    meta: "Plant warranty + workmanship",
    rows: [
      { label: "Replacement plants", value: "$2,400" },
      { label: "Repair to lawn and irrigation", value: "+ $1,600", emphasis: "accent" },
      { label: "Filing fee + interest", value: "$200", emphasis: "muted" },
    ],
    footer: "Sample · within most state small-claims caps",
  },

  whatCounts: {
    h2: { pre: "What landscaper failures ", em: "let you sue", post: "?" },
    lede:
      "Four common patterns. Each one is its own claim. Many landscape cases stack two or three.",
    cards: [
      {
        num: "01",
        title: "Dead or dying plants within warranty",
        body:
          "Most landscapers warranty plants for 30 to 90 days against death from improper installation (wrong depth, root-balls left in burlap, no drainage). Plants that die within the warranty period are replacement-eligible. Even outside warranty, plants that died from clear installation defects support a claim.",
      },
      {
        num: "02",
        title: "Killed lawn or sod",
        body:
          "New sod that died, established lawn killed by improper herbicide application, or grass killed by overcompaction during equipment use. Replacement sod and labor are recoverable.",
      },
      {
        num: "03",
        title: "Broken irrigation or hardscape",
        body:
          "Damaged irrigation lines from digging without locating, broken pavers from heavy equipment, cracked patio from improper compaction. Repair costs from a different licensed contractor establish damages.",
      },
      {
        num: "04",
        title: "Damage to neighboring property",
        body:
          "Killed neighboring plants from herbicide drift, broken neighbor's fence during work, damage to underground utilities you have to pay to repair. The landscaper's GL insurance usually covers these.",
      },
    ],
    note: {
      strongIntro: "Photos document the cause, not just the damage.",
      rest:
        " Take photos of the installation as it happens (planting depth, root condition, irrigation lines). After-the-fact photos of dead plants don't always show whether the cause was installation or other factors. The before-and-during photos make causation clear at the hearing.",
    },
  },

  claim: {
    h2: { pre: "How much can you ", em: "recover", post: "?" },
    lede:
      "Replacement plant cost is the floor. Lawn restoration, irrigation repair, and hardscape damage stack on top.",
    layers: [
      {
        tag: "Layer 1",
        title: "Replacement plants and labor",
        body:
          "Cost to replace dead plants at current nursery prices, plus the labor to install. Plant warranties typically cover this within 30 to 90 days. Outside warranty, you need to show installation was the cause.",
        amount: "$2,400",
      },
      {
        tag: "Layer 2",
        title: "Lawn restoration and irrigation repair",
        body:
          "New sod plus labor for killed lawn. Irrigation repair for broken lines. Hardscape repair for damaged pavers, patio, or steps. Quote from a different licensed landscaper.",
        amount: "+ $1,600",
        accent: true,
      },
      {
        tag: "Layer 3",
        title: "Filing fees, interest, expert reports",
        body:
          "Filing fee, paid second-opinion landscaper report ($150 to $400), pre-judgment interest at your state's legal rate.",
        amount: "+ $200",
      },
    ],
    total: {
      label: "Sample total within small-claims cap",
      body:
        "Replacement plants and labor for a failed front-yard install, plus repair to broken irrigation, plus filing fee.",
      amount: "$4,200",
      sublabel: "illustrative · varies by project size and damage type",
    },
  },

  demand: {
    h2: { pre: "Send a ", em: "demand letter", post: " first." },
    lede:
      "Landscape demand letters work because the cases are small and most landscapers' GL carriers settle quickly. Cite the plant warranty if applicable.",
    checklist: [
      "Date of installation",
      "List of dead plants with original cost and current replacement cost",
      "Photos of the installation and the death/damage",
      "Plant warranty terms if in writing",
      "Repair quote from a different licensed landscaper",
      "A 14-day deadline before you file",
      "Sent certified mail with copy to the GL carrier",
    ],
    letter: {
      certifiedNum: "7019 0140 0001 4827 3588",
      date: "May 5, 2026",
      recipientName: "Greenscape Designs LLC",
      recipientAddress: "850 Garden Lane, Austin, TX 78701",
      reLine: "Demand for Damages, Failed Plant Installation Dated March 1, 2026",
      bodyParagraphs: [
        "On March 1, 2026, you installed front-yard plants and irrigation for $4,800. Your written contract included a 60-day plant warranty. Within 6 weeks, 12 of the 18 shrubs and the new sod failed. The cause is improper planting depth (3 to 4 inches too deep, photos attached) and damaged irrigation pressure causing dry zones.",
        "I obtained a quote from Foothills Landscape (license #38291) for $2,400 in plant replacement and $1,600 in irrigation repair and sod restoration. I demand within <strong>fourteen (14) days</strong>:",
      ],
      demandList: [
        "Replacement of <strong>$2,400</strong> in dead plants per the warranty;",
        "Repair of <strong>$1,600</strong> in damaged irrigation and lawn.",
      ],
      closingLine:
        "Total demand: <strong>$4,000.00</strong>. Copy of this letter has been sent to your GL carrier (Acme Casualty, policy GL-2026-7821). If unresolved, I will file in Small Claims Court.",
      signatory: "Riley Q. Homeowner",
    },
  },

  fileSteps: {
    h2: { pre: "How to ", em: "file", post: " a landscape case." },
    lede:
      "Four steps. The plant warranty (if in writing) is the cleanest legal hook.",
    steps: [
      {
        title: "Document the failure",
        body:
          "Photos of dead plants, killed lawn, broken irrigation. Photos of the original installation showing depth and condition. A second-opinion landscaper's report identifying the cause (planting depth, irrigation pressure, etc.).",
      },
      {
        title: "File with GL carrier",
        body:
          "Most landscapers carry general liability insurance. File a third-party claim using the certificate of insurance. Damage to lawn, irrigation, and hardscape is typically covered.",
      },
      {
        title: "File contractor-board complaint (if applicable)",
        body:
          "Some states license landscape contractors (California: C-27 license type). If your state requires a license and the landscaper is licensed, file a board complaint for the workmanship issue.",
      },
      {
        title: "File in small claims",
        body:
          "If the carrier and board do not resolve within 60 days, file. Filing fees usually run $30 to $100. Lead with the photos and the second-opinion report.",
      },
    ],
    aftermath: {
      tag: "After you win",
      title: "Collecting from a landscaper.",
      bodyHtml:
        "Many landscape cases pay through the GL insurance carrier. After 30 days post-judgment, the enforcement tools are a <strong>judgment lien</strong> on real estate, a <strong>bank levy</strong>, and a <strong>writ of execution</strong> on equipment, vehicles, or accounts receivable.",
    },
  },

  evidence: {
    h2: { pre: "What evidence do you need to ", em: "sue a landscaper", post: "?" },
    lede:
      "Cases like this turn on photos plus a second-opinion landscaper's report. The plant warranty (if written) closes the case quickly.",
    cells: [
      {
        kind: "photos",
        tag: "Failed installation",
        photos: [
          { id: "1581094271901-8022df4466f9", cap: "Dead shrubs (warranty)" },
          { id: "1556909114-f6e7ad7d3136", cap: "Killed sod" },
          { id: "1581092335397-9583eb92d232", cap: "Broken irrigation" },
          { id: "1503602642458-232111445657", cap: "Plants too deep" },
        ],
      },
      {
        kind: "letter",
        tag: "Replacement quote",
        letterhead: "Foothills Landscape · License #38291",
        date: "April 22, 2026",
        recipientName: "Riley Homeowner",
        reLine: "Quote · Replacement plants and irrigation repair",
        bodyParagraphs: [
          "Inspected April 18. 12 of 18 original shrubs are dead, all from improper depth (planted 3 to 4 inches deeper than root flare). Irrigation pressure is below spec; 6 zones are dry.",
          "Replacement plants and labor: $2,400. Irrigation pressure repair and sod replacement: $1,600. Total $4,000. Estimated 5 working days.",
        ],
        signatory: "K. Petrov",
        signatoryTitle: "Master Landscaper · 22 yrs",
      },
      {
        kind: "handbook",
        tag: "Plant warranty",
        documentTitle: "Greenscape Designs · Standard Contract Section 8",
        sectionTitle: "60-Day Plant Replacement Warranty",
        bodyParagraphs: [
          "Greenscape Designs warrants all plant material against death for 60 days from installation. Warranty covers replacement plants and reinstallation labor at no cost to homeowner.",
        ],
        highlight:
          "12 of 18 shrubs died within 6 weeks. Warranty applies.",
        footer: "Customer must water per care sheet (provided)",
      },
      {
        kind: "receipt",
        tag: "Original payment",
        vendor: "GREENSCAPE DESIGNS LLC",
        vendorAddr: "License #C27-72182 · Austin, TX",
        receiptNum: "Invoice #4218",
        date: "03/01/2026",
        lineItems: [
          { label: "Front-yard plants (18)", amount: "$2,200.00" },
          { label: "Sod installation (1,200 sq ft)", amount: "$1,400.00" },
          { label: "Irrigation extension and tuning", amount: "$1,200.00" },
        ],
        subtotal: "$4,800.00",
        total: "$4,800.00",
        footer: "Paid in full · 60-day plant warranty included",
      },
    ],
  },

  defenses: {
    h2: { pre: "Common landscaper ", em: "defenses", post: ", with rebuttals." },
    lede:
      "Three arguments cover most landscape cases. Each has a clean rebuttal once causation is established.",
    items: [
      {
        quote: "You did not water enough.",
        pill: "Most common",
        rebuttal:
          "<strong>Rebuttal:</strong> bring photos of irrigation use and pressure. The second-opinion report should identify whether the issue was installation depth (the landscaper's responsibility) or watering (yours). Most plant deaths within 60 days from improper depth are not watering issues.",
      },
      {
        quote: "Plants die. It is normal.",
        pill: "Normal failure",
        rebuttal:
          "<strong>Rebuttal:</strong> normal mortality is 5 to 10 percent. Failure rates of 50 percent or more (12 of 18 in this example) are clearly attributable to installation issues. Bring photos showing planting depth and the second-opinion report.",
      },
      {
        quote: "We never gave a written warranty.",
        pill: "No warranty",
        rebuttal:
          "<strong>Rebuttal:</strong> the implied warranty of workmanlike construction applies regardless of any written warranty. Plants planted at improper depth or with damaged root balls is workmanship that fails the standard of the trade.",
      },
    ],
  },

  outcomes: {
    h2: { pre: "How much do homeowners ", em: "actually win", post: "?" },
    lede:
      "Typical recovery in landscape cases. Plant warranties produce clean settlements; complex causation cases push to court.",
    bands: [
      {
        label: "Low",
        range: "$200 to $1,500",
        body:
          "<strong>Partial replacement.</strong> Court awards a portion of replacement cost. Common when the cause is contested.",
        tier: "low",
      },
      {
        label: "Mid",
        range: "$1,500 to $5,000",
        body:
          "<strong>Full plant replacement plus repair.</strong> Most common when warranty applies and second-opinion report identifies installation issues.",
        tier: "mid",
      },
      {
        label: "High",
        range: "$5,000 to $20,000+",
        body:
          "<strong>Major project failures.</strong> Whole-yard installs that failed, plus damaged irrigation and hardscape, push to the cap. Cases beyond the cap need higher courts.",
        tier: "high",
      },
    ],
  },

  stateSection: null,

  alternatives: {
    h2: { pre: "What are the ", em: "alternatives", post: " to small claims?" },
    lede:
      "Landscape cases have moderate out-of-court options because licensing and bonding vary by state.",
    cards: [
      {
        title: "Landscaper's GL insurance",
        pillLabel: "Free, fast",
        pillTier: "primary",
        whenItFits:
          "the landscaper carries general liability insurance (most legitimate ones do). File a third-party claim using the certificate of insurance.",
        tradeoff:
          "claims for plant death (vs. damage from work) sometimes get scrutiny. The second-opinion report establishes the link.",
      },
      {
        title: "State contractor licensing board",
        pillLabel: "Where applicable",
        pillTier: "good",
        whenItFits:
          "your state licenses landscape contractors (CSLB C-27 in California, others). Boards investigate workmanship complaints and assess fines.",
        tradeoff:
          "many states do not license landscaping. Texas, Georgia, and others have no licensing requirement.",
      },
      {
        title: "Small claims (this guide)",
        pillLabel: "Best for individual recovery",
        pillTier: "warn",
        whenItFits:
          "the carrier and board did not resolve within 60 days, or no licensing exists in your state. Damages within the cap.",
        tradeoff:
          "30 to 90 day timeline. Filing fee $30 to $100.",
      },
    ],
  },

  cta: {
    h2: { pre: "Recover the ", em: "replacement cost", post: "." },
    body:
      "Landscape demand letters work fast when paired with a second-opinion report and copied to the GL carrier. Our generator builds yours in under two minutes.",
    receipt: {
      label: "example · failed plant installation",
      items: [
        { label: "Replacement plants and labor", amount: "$2,400" },
        { label: "Irrigation and lawn repair", amount: "+ $1,600" },
        { label: "Filing fee + interest", amount: "+ $200" },
      ],
      total: "$4,200",
      totalLabel: "Total claim",
      note: "Illustrative. Larger projects with hardscape damage push higher.",
    },
  },

  faqs: [
    {
      q: "What is a typical plant warranty?",
      a: "30 to 90 days against plant death from installation defects. Some landscapers offer 1-year warranties on premium installations. Read your contract for the exact terms. Even without a written warranty, the implied warranty of workmanlike construction applies and covers plants planted at improper depth or with damaged root balls.",
    },
    {
      q: "Are landscapers required to be licensed?",
      a: "It depends on the state. California licenses landscape contractors (C-27 license type). Florida, Connecticut, Maryland, and several others have specific licensing. Texas, Georgia, North Carolina, and many others do not require licensing for landscaping. Search your state contractor board.",
    },
    {
      q: "How do I prove the landscaper killed the plants?",
      a: "Photos of the installation showing planting depth, root condition, and irrigation. A second-opinion landscaper's report identifying the cause. Excessively deep planting (root flare buried 3 inches or more), damaged root balls, or planting in compacted soil are common installation failures.",
    },
    {
      q: "What if the landscaper says I did not water enough?",
      a: "Bring records of watering: irrigation timer settings, photos of plants when watered, comparison with surviving plants. The second-opinion report should distinguish between under-watering and installation defects. Most plant deaths within 60 days from improper depth are not watering issues.",
    },
    {
      q: "Can I claim against the contractor's bond?",
      a: "If your state licenses landscape contractors and the landscaper is licensed, yes. California requires a $25,000 bond for landscape contractors. File a bond claim with the surety company along with your other recovery efforts.",
    },
    {
      q: "How long do I have to sue?",
      a: "Breach of contract and warranty claims usually run 3 to 6 years. The plant warranty itself is a separate clock that starts on the installation date and ends when the warranty expires (usually 30 to 90 days). File the warranty claim quickly even if you wait on the broader case.",
    },
    {
      q: "Can I sue if the landscaper damaged a neighbor's property?",
      a: "Yes, but you may have to coordinate with the neighbor or step in as the responsible party for the work. The landscaper's GL covers damage to property, including neighboring property. If your contract caused the damage to your neighbor, your contractor's insurance and bond apply.",
    },
  ],

  relatedSlugs: [
    "damaged-house",
    "deposit-and-disappearing",
    "poor-workmanship",
    "handyman-bad-work",
    "painter-damage",
    "unfinished-work",
  ],
};

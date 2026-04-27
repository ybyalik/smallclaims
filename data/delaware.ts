import type { StateGuide } from "../lib/types/state-guide";

export const data: StateGuide = {
  state: "Delaware",
  slug: "delaware",
  abbr: "DE",
  lastUpdated: "2026-04-27",

  hero: {
    individualLimit: 25000,
    businessLimit: 25000,
    typicalTimelineDays: { min: 30, max: 90 },
    filingFeeLow: 35,
    filingFeeHigh: 45,
    tagline:
      "Delaware's Justice of the Peace Court hears civil claims up to $25,000 for individuals and businesses alike. No personal injury or defamation cases here, but most contract, debt, and property damage disputes fit.",
  },

  ataGlance: [
    { label: "Most you can sue for", value: "$25,000", detail: "Same cap for individuals and businesses (raised from $15,000 in 2020)" },
    { label: "Filing fee", value: "$35 to $45", detail: "Tiered by claim size" },
    { label: "Court", value: "Justice of the Peace (JP) Court", detail: "One civil JP court per county" },
    { label: "Lawyers at trial", value: "Allowed", detail: "Not required, but permitted on either side" },
    { label: "Answer deadline", value: "15 days", detail: "Defendants must file a written answer or face default" },
    { label: "Personal injury cases", value: "Not allowed", detail: "JP Court cannot hear personal injury or defamation claims" },
  ],

  limits: {
    individual: 25000,
    business: 25000,
    annualCap: { count: 0, threshold: 0 },
    splitClaimsAllowed: false,
    splitClaimsExplanation:
      "If your claim is more than $25,000, you have two options: sue for $25,000 and waive the rest, or file in the Court of Common Pleas (which can hear up to $75,000). You cannot split one debt into multiple smaller cases. The cap excludes statutory interest and court costs. House Bill 232 (2020) raised the cap from $15,000 to the current $25,000 and also lifted the cap entirely for rent claims tied to a commercial summary possession action.",
    statute: "10 Del. C. § 9301(1)",
  },

  whatYouCanSueFor: [
    {
      id: "contracts",
      title: "Contracts and money owed",
      blurb: "Delaware's general statute of limitations on debt and contract claims is 3 years (6 years for promissory notes and contracts under seal).",
      claims: [
        {
          id: "written-contract",
          name: "Breach of a written contract",
          example: "A contractor signed a $14,000 contract to remodel your kitchen, took the deposit, and disappeared.",
          eligible: true,
          statute: "10 Del. C. § 8106",
          notes: "3-year deadline. Bring the signed contract, payment proof, and any correspondence showing breach.",
        },
        {
          id: "oral-contract",
          name: "Breach of an oral or handshake agreement",
          example: "You agreed verbally to paint a house for $4,500. The customer paid $1,000 and refused the rest after the work was done.",
          eligible: true,
          statute: "10 Del. C. § 8106",
          notes: "3-year deadline (same as written). Texts, emails, and witnesses help prove the agreement existed.",
        },
        {
          id: "personal-loan",
          name: "Unpaid personal loan",
          example: "You loaned a friend $6,000 with a text confirming the repayment schedule. They paid $500 and stopped.",
          eligible: true,
          notes: "Bring bank transfer records, screenshots of texts, and proof of any partial payment (which can restart the 3-year clock under § 8127).",
        },
        {
          id: "promissory-note",
          name: "Unpaid promissory note",
          example: "An ex-employee signed a written promissory note for a $5,000 advance, then quit and stopped paying.",
          eligible: true,
          statute: "10 Del. C. § 8109",
          notes: "Promissory notes have a 6-year statute of limitations in Delaware (longer than the general 3-year contract rule).",
        },
        {
          id: "unpaid-invoice",
          name: "Unpaid commercial invoice",
          example: "A B2B client owes you $12,000 on five invoices that have been unpaid for 4 months.",
          eligible: true,
          notes: "JP Court hears commercial debt claims up to the $25,000 cap. Bring invoices, signed delivery confirmations, and any payment history.",
        },
        {
          id: "unpaid-rent",
          name: "Unpaid rent (money only, not eviction)",
          example: "A former residential tenant moved out owing $4,200 in back rent.",
          eligible: true,
          notes: "Eviction (recovering possession) is a separate type of JP case. Small claims handles the money owed only. For commercial rent tied to summary possession, the $25,000 cap doesn't apply.",
        },
        {
          id: "bad-check",
          name: "Bounced check (NSF)",
          example: "A customer paid you with a $900 check that bounced and ignored your follow-up.",
          eligible: true,
          statute: "6 Del. C. § 1301A",
          damageBoost: "Recover the check amount plus $50 for a first offense. Repeat offenses within a year can yield triple the check amount up to $250. Requires a 30-day written demand letter before filing.",
        },
        {
          id: "co-signer",
          name: "Co-signer or guarantor disputes",
          example: "You co-signed a friend's car loan, paid the lender $7,000 when they defaulted, and now your friend won't reimburse you.",
          eligible: true,
          notes: "You're suing on a contract right of subrogation or contribution. Standard 3-year clock from the date you paid.",
        },
      ],
    },

    {
      id: "consumer",
      title: "Consumer disputes",
      blurb: "Delaware's Consumer Fraud Act and bad-check statute give you statutory recovery options on top of actual damages.",
      claims: [
        {
          id: "defective-product",
          name: "Refund for a defective product",
          example: "You bought a $1,800 sofa online; it arrived broken and the retailer refuses to refund.",
          eligible: true,
          statute: "6 Del. C. § 2511 et seq. (Consumer Fraud Act)",
          notes: "If you can show deceptive conduct (knowing misrepresentation), the Consumer Fraud Act allows actual damages plus attorney fees in some cases.",
        },
        {
          id: "bad-service",
          name: "Refund for a service that wasn't done right",
          example: "A wedding photographer no-showed your ceremony. You paid $3,000 in advance.",
          eligible: true,
        },
        {
          id: "auto-repair",
          name: "Auto repair overcharge or shoddy work",
          example: "A shop charged you $3,800 for an engine job that failed within a month. They won't redo or refund.",
          eligible: true,
          notes: "Bring repair invoices, work orders, and an independent mechanic's evaluation showing what went wrong.",
        },
        {
          id: "contractor",
          name: "Home repair or contractor dispute",
          example: "A contractor took your $9,000 deposit, did half the bathroom job, and stopped showing up.",
          eligible: true,
          notes: "Check whether the contractor was licensed under Delaware's contractor registration rules. Unlicensed contractors can sometimes be barred from collecting on incomplete work.",
        },
        {
          id: "no-show-vendor",
          name: "Cancelled or no-show service provider",
          example: "Your caterer cancelled the morning of your event. You paid $3,500 in advance and they refuse to refund.",
          eligible: true,
        },
        {
          id: "subscription-cancellation",
          name: "Gym or subscription refund",
          example: "Your gym kept charging you for 6 months after you cancelled in writing.",
          eligible: true,
          notes: "Delaware's Consumer Fraud Act covers automatic renewals that aren't clearly disclosed. Bring the original signup terms and your written cancellation.",
        },
        {
          id: "used-car",
          name: "Used car or dealership dispute",
          example: "A dealer sold you a $9,000 car and rolled back the odometer.",
          eligible: true,
          damageBoost: "Odometer fraud is a federal violation (49 U.S.C. § 32710) with a treble-damages remedy. Delaware courts can apply that remedy in JP Court if proven.",
        },
        {
          id: "false-advertising",
          name: "False advertising or deceptive trade practice",
          example: "A company advertised a product as 'lifetime warranty,' charged a premium, then refused to honor it.",
          eligible: true,
          statute: "6 Del. C. § 2511 et seq. (Consumer Fraud Act)",
        },
      ],
    },

    {
      id: "property-damage",
      title: "Property damage",
      blurb: "Delaware has a 2-year statute of limitations on property damage claims. File quickly.",
      claims: [
        {
          id: "vehicle-collision",
          name: "Vehicle collision (under the cap)",
          example: "Someone backed into your car. Repairs cost $4,200 and the at-fault driver's insurance is denying liability.",
          eligible: true,
          statute: "10 Del. C. § 8107",
          notes: "Bring the police report, photos, two repair estimates, and the insurance denial letter. JP Court can hear property damage up to $25,000.",
        },
        {
          id: "fender-bender-uninsured",
          name: "Uninsured motorist hit your car",
          example: "An uninsured driver rear-ended you in a parking lot. Damage is $3,500 and they refuse to pay.",
          eligible: true,
          notes: "If you have your own collision coverage, file with your insurer first. JP Court is a backup if they refuse or if you don't have collision.",
        },
        {
          id: "neighbor-property",
          name: "Neighbor damaged your property",
          example: "Your neighbor's tree fell on your fence during a storm and they refuse to pay the $2,800 to repair it.",
          eligible: true,
          notes: "Liability turns on whether the tree was visibly diseased and the neighbor knew about it. Photos and any prior complaints help.",
        },
        {
          id: "damage-to-rental",
          name: "Tenant damaged your rental property beyond the deposit",
          example: "A former tenant left $5,000 in damage. The deposit covered $1,500 and they refuse to pay the rest.",
          eligible: true,
          notes: "Itemize the damage with photos and repair receipts. Send a written demand for the balance before filing.",
        },
        {
          id: "property-in-custody",
          name: "Property lost or damaged in someone else's custody",
          example: "A dry cleaner ruined a $1,500 wedding dress.",
          eligible: true,
          notes: "Posted disclaimers limiting liability per garment ($50, etc.) are sometimes upheld. The JP weighs the disclaimer against the level of fault.",
        },
      ],
    },

    {
      id: "landlord-tenant",
      title: "Landlord and tenant disputes",
      blurb: "Delaware has strong tenant protections on security deposits and habitability. The 20-day deposit return rule has serious teeth.",
      claims: [
        {
          id: "security-deposit",
          name: "Unreturned security deposit",
          example: "Your landlord kept your $1,800 deposit without sending an itemized list and refuses to respond.",
          eligible: true,
          statute: "25 Del. C. § 5514",
          damageBoost:
            "Delaware requires the landlord to return the deposit (and any itemized deduction list) within 20 days of move-out. Wrongful retention triggers double the amount wrongfully withheld. You must have given a written forwarding address and made your written claim within 1 year.",
        },
        {
          id: "deposit-not-itemized",
          name: "Landlord kept deposit without itemizing",
          example: "Your landlord sent a check for $400 of your $1,500 deposit with no list of what was deducted or why.",
          eligible: true,
          statute: "25 Del. C. § 5514",
          notes: "No itemized list within 20 days = the entire deposit must be returned, plus double damages on the withheld portion.",
        },
        {
          id: "uninhabitable-rental",
          name: "Landlord failed to repair (rent abatement or damages)",
          example: "Your apartment's heat broke for 3 weeks during winter and the landlord wouldn't fix it. You paid out of pocket and want reimbursement.",
          eligible: true,
          statute: "25 Del. C. § 5306, § 5307",
          notes: "Strict notice procedure required: written notice to landlord and a reasonable time to fix before you can deduct or sue. Repair-and-deduct cap of $400 per repair under § 5307.",
        },
        {
          id: "illegal-eviction",
          name: "Illegal lockout or self-help eviction by landlord",
          example: "Your landlord changed the locks without going through court. You couldn't get in for 5 days.",
          eligible: true,
          notes: "Self-help evictions are illegal in Delaware. You can recover actual damages (hotel costs, replacement of perishable items) plus possible additional damages depending on circumstances.",
        },
        {
          id: "unreturned-prepaid-rent",
          name: "Unreturned prepaid rent or last month's rent",
          example: "You moved out 3 months early under a clause your landlord agreed to. They kept the prepaid June rent of $1,500.",
          eligible: true,
        },
        {
          id: "late-fee-overcharge",
          name: "Excessive late fees or other charges",
          example: "Your landlord charged you $200 in late fees on a $1,000 rent payment that was 7 days late.",
          eligible: true,
          notes: "Delaware caps late fees at 5% of monthly rent, charged only after the rent is more than 5 days late.",
        },
      ],
    },

    {
      id: "employment",
      title: "Employment and wage disputes",
      blurb: "Delaware has unusually strong wage-payment protections. Unpaid wages can yield 100% liquidated damages on top of the wages owed.",
      claims: [
        {
          id: "unpaid-wages",
          name: "Unpaid wages or salary",
          example: "Your former employer owes you $3,800 in unpaid wages from your last two weeks of work and refuses to pay.",
          eligible: true,
          statute: "19 Del. C. § 1103",
          damageBoost:
            "If wages are unpaid after a written demand, you can recover liquidated damages of 10% per day, up to a 100% match of the unpaid wages (so a doubling of what you're owed). Plus attorney fees on top.",
        },
        {
          id: "unpaid-final-paycheck",
          name: "Final paycheck not paid",
          example: "You quit a job. Two months later, your final paycheck of $1,400 still hasn't arrived.",
          eligible: true,
          statute: "19 Del. C. § 1102, § 1103",
          notes: "Final wages must be paid by the next regular payday. Same 10%/day liquidated damages remedy applies.",
        },
        {
          id: "unpaid-commissions-bonus",
          name: "Unpaid commission or bonus",
          example: "You earned a $4,500 sales commission per the written plan and your employer refuses to pay it.",
          eligible: true,
          notes: "If the commission was earned per the written plan, it's 'wages' under Delaware law and triggers the same 10%/day liquidated damages remedy.",
        },
      ],
    },

    {
      id: "personal",
      title: "Personal disputes",
      blurb: "Delaware's JP Court does not hear personal injury or defamation. But many other personal-grievance claims fit.",
      claims: [
        {
          id: "loaned-property",
          name: "Loaned or borrowed property not returned",
          example: "You loaned your power tools to a friend for a weekend project and they refuse to return them. Replacement cost $1,800.",
          eligible: true,
          notes: "JP Court can order return of specific personal property in some cases, or money damages equal to its value.",
        },
        {
          id: "engagement-gifts",
          name: "Engagement ring or gift after a broken engagement",
          example: "Your ex kept the $4,000 engagement ring after the engagement was called off.",
          eligible: true,
          notes: "Delaware courts treat engagement rings as conditional gifts. If the engagement is called off, the ring usually goes back to the giver regardless of fault.",
        },
        {
          id: "wedding-deposit",
          name: "Wedding vendor deposit not refunded",
          example: "Your venue cancelled because of staffing issues. You paid a $5,000 nonrefundable deposit and they won't refund.",
          eligible: true,
          notes: "If the venue caused the cancellation, the 'nonrefundable' clause usually doesn't bind you. Bring the contract and any cancellation correspondence.",
        },
        {
          id: "dog-bite-property-damage",
          name: "Dog or animal damage to property only",
          example: "A neighbor's dog killed your chickens (replacement cost $400) and chewed up your $600 fence.",
          eligible: true,
          notes: "Property damage from animals is OK in JP Court. But if the dog injured a person, that's a personal injury claim and must go to the Court of Common Pleas or higher.",
        },
      ],
    },
  ],

  whatYouCannotSueFor: [
    {
      category: "Personal injury",
      explanation:
        "Delaware JP Court explicitly cannot hear claims for personal injuries (medical bills from an accident, slip-and-fall, dog bite injuries, etc.). This is a hard exclusion regardless of the dollar amount.",
      whereToGoInstead: "Court of Common Pleas (up to $75,000) or Superior Court (any amount)",
    },
    {
      category: "Defamation (libel and slander)",
      explanation: "JP Court has no jurisdiction over defamation claims. Cases involving false statements that harmed your reputation belong in higher courts.",
      whereToGoInstead: "Court of Common Pleas or Superior Court",
    },
    {
      category: "Mental anguish or emotional distress claims",
      explanation: "Standalone emotional distress and mental anguish claims fall outside JP Court's jurisdiction.",
      whereToGoInstead: "Superior Court",
    },
    {
      category: "Real estate title or boundary disputes",
      explanation: "Disputes over who owns land, boundary lines, easements, or quiet-title actions require courts with equitable powers.",
      whereToGoInstead: "Court of Chancery for equitable relief; Superior Court for title actions",
    },
    {
      category: "Divorce, custody, child support",
      explanation: "Family law matters belong in Family Court.",
      whereToGoInstead: "Delaware Family Court",
    },
    {
      category: "Probate and estate disputes",
      explanation: "Wills, executor disputes, and estate distribution must go to the Register of Wills or Court of Chancery.",
      whereToGoInstead: "Register of Wills / Court of Chancery",
    },
    {
      category: "Injunctions and orders to do or stop something",
      explanation:
        "JP Court can only award money or possession of leased property (in landlord-tenant cases). It cannot order someone to perform a contract, stop harassing you, or transfer property.",
      whereToGoInstead: "Court of Chancery for injunctions and equitable relief",
    },
    {
      category: "Class actions",
      explanation: "JP Court cannot certify class actions. Each plaintiff must file separately.",
      whereToGoInstead: "Superior Court or federal court",
    },
    {
      category: "Federal claims (bankruptcy, civil rights, patents)",
      explanation: "These fall under federal jurisdiction.",
      whereToGoInstead: "U.S. District Court for the District of Delaware",
    },
    {
      category: "Cases subject to mandatory arbitration",
      explanation:
        "If your contract has an enforceable arbitration clause and the defendant raises it, the JP must send the case to arbitration. Common in cell phone, banking, and credit card contracts.",
      whereToGoInstead: "Private arbitration per the contract",
    },
  ],

  damages: {
    compensatory: true,
    punitive: {
      available: false,
      explanation:
        "Delaware JP Court does not award common-law punitive damages. Statutory multipliers (bad checks, security deposits, unpaid wages) are available where the underlying statute provides them.",
    },
    statutoryMultipliers: [
      {
        claim: "Bad-faith security deposit retention",
        multiplier: "2x the wrongfully withheld amount",
        statute: "25 Del. C. § 5514(g)",
      },
      {
        claim: "Bounced check (first offense)",
        multiplier: "Check amount + $50 (after 30-day demand letter)",
        statute: "6 Del. C. § 1301A",
      },
      {
        claim: "Bounced check (second offense within 1 year)",
        multiplier: "Triple the check amount, capped at $250",
        statute: "6 Del. C. § 1301A",
      },
      {
        claim: "Unpaid wages",
        multiplier: "10% per day liquidated damages, up to 100% of wages owed",
        statute: "19 Del. C. § 1103",
      },
      {
        claim: "Repair-and-deduct (tenant)",
        multiplier: "Up to $400 per repair",
        statute: "25 Del. C. § 5307",
      },
      {
        claim: "Failure-to-repair damages (tenant)",
        multiplier: "Greater of (a) 1 month's rent + deposit, or (b) difference in rental value",
        statute: "25 Del. C. § 5306",
      },
    ],
    attorneyFees: {
      available: true,
      explanation:
        "Delaware follows the American Rule: each side pays their own attorney fees unless a contract or statute shifts them. Wage claims (19 Del. C. § 1113), some Consumer Fraud Act claims, and contracts with fee-shift clauses are the main exceptions. Bad-check claims under § 1301A also allow recovery of court costs.",
    },
    interestRate: {
      rate: 5.75,
      type: "simple",
      statute: "6 Del. C. § 2301",
      notes:
        "Delaware's legal rate is 5% over the Federal Reserve discount rate. As of 2026, with the discount rate around 0.75%, post-judgment interest runs at about 5.75% per year. Pre-judgment interest is generally available on liquidated sums.",
    },
    feesRecoverable: true,
  },

  whereToFile: {
    courtName: "Justice of the Peace Court",
    parentCourt: "Delaware Justice of the Peace Court System",
    venueRules: [
      {
        scenario: "Most cases (the default)",
        filingOptions: [
          "The county where the defendant lives or works",
          "The county where the cause of action arose (the contract was signed, the damage happened, etc.)",
        ],
      },
      {
        scenario: "Property damage or breach happened in a specific county",
        filingOptions: [
          "Where the incident occurred",
          "Where the defendant lives",
        ],
      },
      {
        scenario: "Out-of-state defendant served in Delaware",
        filingOptions: [
          "Any Delaware county where the defendant has contacts",
          "Where the cause of action arose",
        ],
      },
    ],
    consequencesOfWrongVenue:
      "Delaware's JP Court system is statewide, so filing in the wrong county usually results in a transfer rather than dismissal. The case will be routed administratively to the correct civil JP court (Court 13 in New Castle, Court 16 in Kent, Court 17 in Sussex). Wrong venue is more delay than dealbreaker, but file correctly to avoid the wait.",
    eFilingAvailable: "yes",
    eFilingNotes:
      "Delaware uses the eFlex e-filing system for JP Court. As of 2023, attorneys are required to e-file statewide. Self-represented filers can still paper file or use eFlex if they prefer. There's a $1.25 technology fee on e-filings.",
    eFilingPortal: "https://courts.delaware.gov/efiling/",
  },

  fees: {
    tiers: [
      { range: "$0 to $1,000", amount: 35 },
      { range: "$1,001 to $5,000", amount: 40 },
      { range: "$5,001 to $25,000", amount: 45 },
    ],
    frequentFiler: { threshold: 0, fee: 0 },
    serviceFees: [
      { method: "Constable", amount: "$40 to $50", notes: "Per defendant. Most reliable. The court arranges this." },
      { method: "Certified mail by the court", amount: "Included or small fee", notes: "Default first attempt. Often fails when defendants don't sign for the mail." },
      { method: "Sheriff (rarely used at JP level)", amount: "Varies", notes: "Sheriff handles writs at higher courts; constables handle JP service." },
    ],
    waiver: {
      forms: [
        { number: "Affidavit of IFP", name: "Affidavit to Proceed In Forma Pauperis (without paying fees)" },
      ],
      eligibility: [
        "You receive public assistance (SNAP, TANF, SSI, etc.)",
        "Your household income is at or below 125% of federal poverty",
        "Paying court costs would prevent you from paying for basic necessities",
      ],
      coverageNotes:
        "An IFP affidavit waives the filing fee and service fees. The judge reviews and grants or denies. If denied, you'll get a notice of how much to pay.",
    },
    otherFees: [
      { name: "Alias service (second attempt)", amount: "$20", notes: "If first service attempt fails." },
      { name: "Certified transcript of judgment", amount: "$10", notes: "Needed to docket the judgment in Superior Court for a real estate lien." },
      { name: "Motion to vacate default", amount: "$15" },
      { name: "Subpoena issuance", amount: "$10", notes: "Plus service cost." },
      { name: "Application to revive (Form 15A)", amount: "$20", notes: "Filed within 5 years to renew a judgment." },
      { name: "E-filing technology fee", amount: "$1.25", notes: "Per e-filing transaction." },
    ],
    feesRecoverableNotes:
      "If you win, the judgment will include the filing fee, service fees, and other court costs as 'costs' the loser owes you. The losing party reimburses your fees on top of the judgment.",
  },

  statuteOfLimitations: {
    entries: [
      {
        id: "written-contract",
        claim: "Written contract (not under seal)",
        years: 3,
        clockStart: "The date of breach",
        statute: "10 Del. C. § 8106",
      },
      {
        id: "oral-contract",
        claim: "Oral contract",
        years: 3,
        clockStart: "The date of breach",
        statute: "10 Del. C. § 8106",
      },
      {
        id: "promissory-note",
        claim: "Promissory note",
        years: 6,
        clockStart: "Note's due date, or date of acceleration",
        statute: "10 Del. C. § 8109",
        notes: "Promissory notes get a longer 6-year deadline than ordinary contracts.",
      },
      {
        id: "contract-under-seal",
        claim: "Contract under seal",
        years: 20,
        clockStart: "Date of breach",
        statute: "10 Del. C. § 8109",
        notes: "Rare in modern contracts but still on the books.",
      },
      {
        id: "open-account",
        claim: "Open account or credit card debt",
        years: 3,
        clockStart: "Date of last charge, payment, or charge-off",
        statute: "10 Del. C. § 8106",
        notes: "Partial payment can restart the clock under § 8127.",
      },
      {
        id: "property-damage",
        claim: "Property damage",
        years: 2,
        clockStart: "Date the damage occurred",
        statute: "10 Del. C. § 8107",
      },
      {
        id: "fraud",
        claim: "Fraud or misrepresentation",
        years: 3,
        clockStart: "When the fraud was discovered or reasonably should have been discovered",
        statute: "10 Del. C. § 8106",
        notes: "The discovery rule applies in fraud cases.",
      },
      {
        id: "bad-check",
        claim: "Bad check (NSF)",
        years: 3,
        clockStart: "Date of dishonor",
        statute: "10 Del. C. § 8106",
      },
      {
        id: "wages",
        claim: "Unpaid wages",
        years: 1,
        clockStart: "Date wages were due",
        statute: "10 Del. C. § 8111",
        notes: "Wage claims have a much shorter 1-year deadline. Don't sit on these.",
      },
      {
        id: "security-deposit",
        claim: "Security deposit return",
        years: 1,
        clockStart: "Date you moved out and gave a written forwarding address",
        statute: "25 Del. C. § 5514",
        notes: "You must make a written claim within 1 year of move-out for the double-damages remedy.",
      },
      {
        id: "judgment-enforcement",
        claim: "Enforcing an existing JP judgment",
        years: 5,
        clockStart: "Date of judgment",
        statute: "10 Del. C. § 9589",
        notes: "Renewable in 5-year increments via scire facias (Form 15A, $20).",
      },
    ],
    discoveryRuleNotes:
      "Delaware applies the discovery rule in fraud cases (built into § 8106) and in some latent defect or hidden injury cases. For ordinary contract or property damage, the clock starts when the breach or damage happened, not when you noticed.",
    tollingNotes:
      "The clock pauses if the defendant leaves Delaware (§ 8117), if the plaintiff is a minor or legally incompetent until disability is removed (§ 8116), or in cases of fraudulent concealment by the defendant. Partial payment or a written acknowledgment of the debt can restart the clock under § 8127.",
  },

  preFiling: {
    demandLetterRequired: false,
    demandLetterRecommended: true,
    demandLetterNotes:
      "Delaware doesn't require a demand letter for most claims, but several specific situations make it mandatory. Bad-check claims under 6 Del. C. § 1301A require a 30-day written demand before you can recover the $50 (or triple) statutory penalty. Wage claims for liquidated damages under 19 Del. C. § 1103 require a written demand. Even when not required, a demand letter often resolves the dispute without filing.",
    governmentClaimRequired: true,
    governmentClaimNotes:
      "Suing a Delaware state agency, county, or municipality requires written notice of claim within a short window (varies by entity, often 90 days to 1 year). Without proper notice, your case is barred under the State Tort Claims Act.",
    landlordTenantNotes:
      "For security deposit claims, you must give your landlord a written forwarding address. The 20-day refund clock starts from move-out, and you must make your written claim within 1 year. For repair-and-deduct under § 5307, you must give written notice and a reasonable time to fix before deducting (cap of $400 per repair).",
    consumerProtectionNotes:
      "The Delaware Consumer Fraud Act (6 Del. C. § 2511 et seq.) generally allows immediate filing without a pre-suit demand, but a demand letter is still strategic.",
    arbitrationClauseNotes:
      "Delaware enforces arbitration clauses in consumer contracts. If your agreement requires arbitration and the defendant raises it, JP Court must send the case to arbitration. Common in cell phone, bank, credit card, and employment contracts. Read what you signed.",
  },

  forms: [
    {
      number: "Form 1",
      name: "Civil Complaint",
      description: "The main lawsuit form. Tells the court who you're suing, how much, and why. Available from any JP Court clerk or the Delaware Courts website.",
      whoFiles: "plaintiff",
      required: true,
      group: "starting",
    },
    {
      number: "Affidavit of IFP",
      name: "Affidavit to Proceed In Forma Pauperis",
      description: "Filed in lieu of paying the filing fee if you qualify based on income or hardship.",
      whoFiles: "either",
      required: false,
      group: "fee-waiver",
    },
    {
      number: "Form 50",
      name: "Certificate of Representation",
      description: "Required for any business entity that wants to be represented by a non-lawyer officer or employee. Notarized and filed annually with a $20 fee.",
      whoFiles: "either",
      required: false,
      group: "starting",
    },
    {
      number: "Summons",
      name: "Summons / Notice to Defendant",
      description: "Court-issued notice telling the defendant they're being sued and have 15 days to answer. Generated by the clerk; you don't fill it out.",
      whoFiles: "court",
      required: true,
      group: "service",
    },
    {
      number: "Form 7",
      name: "Defendant's Answer",
      description: "The defendant's written response to the complaint. Must be filed within 15 days of being served.",
      whoFiles: "defendant",
      required: true,
      group: "starting",
    },
    {
      number: "Form 10BP",
      name: "Demand for Bill of Particulars / Bill of Particulars",
      description: "If the complaint is vague, the defendant can demand more detail. The plaintiff must respond before the answer clock starts.",
      whoFiles: "either",
      required: false,
      group: "starting",
    },
    {
      number: "Counterclaim (Form 7 attachment)",
      name: "Defendant's Counterclaim",
      description: "If you're being sued and have your own claim against the plaintiff, file this with your answer. Same $25,000 cap applies.",
      whoFiles: "defendant",
      required: false,
      group: "counterclaim",
    },
    {
      number: "Form 13",
      name: "Motion and Affidavit for Default Judgment",
      description: "Plaintiff's affidavit to obtain default after the defendant misses the 15-day answer deadline. Includes a non-military service declaration.",
      whoFiles: "plaintiff",
      required: false,
      group: "after-judgment",
    },
    {
      number: "Form 30",
      name: "Witness Subpoena",
      description: "Compels a witness to attend the hearing or produce documents. $10 issuance fee plus service cost.",
      whoFiles: "either",
      required: false,
      group: "hearing",
    },
    {
      number: "Motion to Vacate",
      name: "Motion to Vacate Default Judgment",
      description: "If you got a default judgment against you, file within 15 days to ask the court to reopen the case (30 days if the judgment was served by certified mail and you never appeared).",
      whoFiles: "defendant",
      required: false,
      group: "after-judgment",
    },
    {
      number: "Notice of Appeal",
      name: "Notice of Appeal to Court of Common Pleas",
      description: "Either party can appeal a JP judgment to CCP within 15 days. About $135 filing fee plus $10 transcript fee to JP Court.",
      whoFiles: "either",
      required: false,
      group: "appeal",
    },
    {
      number: "Form 17",
      name: "Praecipe for Writ of Attachment / Garnishment",
      description: "After judgment, file this to garnish wages, bank accounts, or other property of the loser.",
      whoFiles: "plaintiff",
      required: false,
      group: "after-judgment",
    },
    {
      number: "Form 17A",
      name: "Garnishee Answer (Wages)",
      description: "Filed by the employer (garnishee) within 20 days of being served with a wage attachment.",
      whoFiles: "either",
      required: false,
      group: "after-judgment",
    },
    {
      number: "Form 17B",
      name: "Garnishee Answer (Other than Wages)",
      description: "Filed by the bank or other third party holding the debtor's property within 20 days of garnishment.",
      whoFiles: "either",
      required: false,
      group: "after-judgment",
    },
    {
      number: "Certified Transcript of Judgment",
      name: "Certified Transcript of Judgment",
      description: "Take this from JP Court to Superior Court to dock your judgment as a lien on the loser's real property. $10 fee.",
      whoFiles: "plaintiff",
      required: false,
      group: "after-judgment",
    },
    {
      number: "Form 15A",
      name: "Application to Revive Judgment (Scire Facias)",
      description: "Renews the JP judgment for another 5 years. File within the last 90 days before the 5-year expiration. $20 fee.",
      whoFiles: "plaintiff",
      required: false,
      group: "after-judgment",
    },
    {
      number: "Satisfaction of Judgment",
      name: "Satisfaction of Judgment",
      description: "Filed by the plaintiff once the judgment is paid in full. Clears the lien and closes the case.",
      whoFiles: "plaintiff",
      required: false,
      group: "after-judgment",
    },
  ],

  service: {
    whoCanServe: [
      "JP Court constable (default; the court arranges this)",
      "Court clerk by certified mail (often tried first, but only valid if defendant signs)",
      "A Delaware sheriff (rarely used at JP level)",
      "An adult who is NOT a party (only with court permission)",
    ],
    methods: [
      {
        name: "Certified mail by the court",
        description: "The court mails the complaint and summons by certified mail, restricted delivery, return receipt requested. Counts as valid service only if the defendant personally signs.",
        pros: ["Cheapest method", "Court handles it for you"],
        cons: ["Often fails if defendants don't claim or refuse the mail"],
      },
      {
        name: "Personal service by constable",
        description: "If certified mail fails or the defendant is hard to reach, a JP Court constable hands the papers to the defendant in person. The court can arrange this for an alias service fee.",
        pros: ["Highest success rate", "Reliable proof of service"],
        cons: ["Costs $40 to $50 per defendant"],
      },
      {
        name: "Substituted service (alternative service)",
        description:
          "If standard service fails after diligent attempts, the JP can authorize leaving the papers with someone of suitable age at the defendant's home, or other alternative service. Requires a court order.",
      },
    ],
    timing: { inCountyDays: 30, outOfCountyDays: 30 },
    proofFilingDeadlineDays: 0,
    proofForm: { number: "Return of Service", name: "Constable's Return / Certified Mail Receipt" },
    businessServiceRules:
      "For a Delaware corporation or LLC, serve the registered agent listed with the Delaware Division of Corporations. If the registered agent can't be served, you can serve the Secretary of State as agent for the company under 8 Del. C. § 321 (corporations) or 6 Del. C. § 18-105 (LLCs). For partnerships, serve any general partner. Many large Delaware-incorporated companies use registered agent services like CT Corporation or CSC.",
    outOfStateNotes:
      "If your defendant is out of state but the dispute happened in Delaware or with a Delaware resident, you can usually still sue here under Delaware's long-arm statute (10 Del. C. § 3104). Service is by certified mail or by hiring a process server in their state.",
    cantFindDefendant:
      "After certified mail fails, the court typically tries constable service. If that fails, file a motion for alternate service with an affidavit of due diligence. The judge can authorize substituted service (leaving papers with someone at the home or workplace) or, in extreme cases, publication.",
    avoidingService:
      "If a defendant refuses to take the papers, the constable can leave them in the defendant's presence after identifying themselves. That counts as valid service. If certified mail comes back refused but not unclaimed, that's also typically valid.",
  },

  response: {
    defendantMustFileAnswer: true,
    responseNotes:
      "Delaware REQUIRES the defendant to file a written answer within 15 days of being served. The answer is JP Civil Form 7. A general denial is fine, but you should also raise any affirmative defenses (statute of limitations, payment, etc.) or you risk waiving them. The answer can be filed in person, by mail, or via eFlex.",
    defaultProcess:
      "If the defendant doesn't file a written answer by the 15-day deadline, the plaintiff can file Form 13 (Motion and Affidavit for Default Judgment). For sum-certain claims (like a fixed contract debt), the court can enter default administratively. For unliquidated claims (like property damage), the court will set a 'default hearing' where the plaintiff testifies to the damages. Plaintiffs must include a non-military service declaration under the Servicemembers Civil Relief Act.",
    proveUpRequired: true,
    proveUpNotes:
      "Even on a default, you'll need to prove your damages with sworn testimony or affidavit. Bring contracts, invoices, photos, and other proof. Show up empty-handed and the judge can award less than you asked or dismiss for lack of proof.",
    motionToVacateForm: { number: "Motion to Vacate", name: "Motion to Vacate Default Judgment" },
    motionToVacateDeadlineDays: 15,
    motionToVacateLackOfNoticeDays: 30,
    motionToVacateAppealDeadlineDays: 15,
    motionToVacateAppealNotes:
      "If your motion to vacate is denied (or you missed the 15-day window), you can appeal the judgment to the Court of Common Pleas within 15 days. The CCP appeal is a fresh trial de novo, which is often a better path than fighting the default in JP Court.",
  },

  counterclaim: {
    allowed: true,
    form: { number: "Counterclaim", name: "Defendant's Counterclaim (filed with Form 7 Answer)" },
    sameMonetaryLimit: true,
    serviceDeadlineSameCountyDays: 15,
    serviceDeadlineOutOfCountyDays: 15,
    transferToHigherCourt: {
      available: true,
      notes:
        "If your counterclaim exceeds the $25,000 JP Court cap, you have two options: waive the excess and counterclaim within the cap, or move to transfer the entire case to the Court of Common Pleas (which can hear up to $75,000). Plaintiffs who don't want their case removed can sometimes oppose, but courts will usually transfer if fairness requires it.",
    },
  },

  hearing: {
    attorneysAllowed: true,
    attorneysAllowedNotes:
      "Delaware JP Court allows lawyers on either side. A business can also be represented by a non-lawyer officer or employee under Supreme Court Rule 57, but only if they file a notarized Certificate of Representation (Form 50) with a $20 annual fee.",
    format:
      "Bench trial. Each case typically gets 30 minutes to 1 hour. The judge is fact-finder and decision-maker. Courts are not strictly bound by the rules of evidence when both parties are self-represented; the judge can relax rules to assure a fair hearing.",
    presider: "Justice of the Peace (may or may not be a lawyer; Delaware doesn't require JPs to have a law degree)",
    burdenOfProof:
      "Preponderance of the evidence. The judge has to believe your version is more likely than not (over 50%) more credible than the defendant's.",
    whatToBring: [
      "Your filed complaint with the court stamp",
      "Two copies of every document (one for the judge, one for the opposing party) plus original signatures",
      "Original contracts, invoices, and receipts",
      "Photos of damage or work (printed in color, multiple copies)",
      "Text messages and emails (printed and highlighted)",
      "Bank statements, cancelled checks, or payment proof",
      "Repair estimates from independent professionals",
      "A short timeline of what happened",
      "Any witness who saw the events (or a written statement if they can't attend)",
      "Demand letters and proof of any pre-suit notices required (bad-check, wage demand, etc.)",
    ],
    witnessSubpoenaForm: { number: "Form 30", name: "Witness Subpoena", feePerDay: 10 },
    interpretersFree: true,
    interpreterNotes:
      "Delaware JP Court provides free interpreters for non-English speakers and the deaf. Request one in advance through the court (call the clerk or note it on your filing). Failure to request early can delay your trial.",
    juryAllowed: false,
    decisionTiming:
      "JPs sometimes rule on the spot, but often take it under advisement and mail a written judgment within a few days to a few weeks.",
    mediationOnHearingDay: {
      offered: true,
      notes:
        "Court 13 in Wilmington has a long-running on-site mediation program for civil cases. Sussex and Kent county courts have less formal mediation but often allow hallway negotiation. Mediation is voluntary and confidential. If it fails, you still get your trial.",
    },
  },

  appeals: {
    whoCanAppeal:
      "Either party can appeal a final JP judgment. Defendants who got hit with a default judgment can either move to vacate in JP (within 15 days) OR appeal directly to CCP (within 15 days). A plaintiff who won the case generally cannot appeal just to seek a higher award.",
    deadlineDays: 15,
    fee: 135,
    type: "de novo",
    typeNotes:
      "JP Court appeals to the Court of Common Pleas are TRIAL DE NOVO. The CCP doesn't review the JP judge for errors; it holds a brand-new trial. New evidence, new witnesses, full procedure, possibility of a jury (on demand). The result can be better, worse, or the same as the JP's judgment.",
    attorneysAllowedOnAppeal: true,
    bondRequired: false,
    automaticStayOnFiling: false,
    notice: { form: "Notice of Appeal", name: "Notice of Appeal to Court of Common Pleas" },
    defaultJudgmentNotAppealable: false,
    defaultJudgmentNotes:
      "Defaulting defendants have two options: motion to vacate in JP within 15 days, or appeal to CCP within 15 days. Many CCP judges expect you to try vacating in JP first; if that fails, you can still appeal. Plaintiffs cannot appeal a judgment in their favor just because they got less than they wanted.",
  },

  collection: {
    paymentDeadline: "Immediately, but most creditors wait 30 days (the appeal window) before pursuing enforcement",
    interestRate: 5.75,
    interestRateNotes:
      "Post-judgment interest is the legal rate (5% over Federal Reserve discount), about 5.75% in 2026. Accrues from the date of judgment. 6 Del. C. § 2301.",
    methods: [
      {
        id: "voluntary-payment",
        name: "Demand letter for payment",
        blurb: "Send a polite demand. Often works.",
        description:
          "After 30 days (the appeal window), send a written demand for payment to the loser including the case number, judgment amount, accrued interest, and your preferred payment method. Many debtors pay once they see liens and garnishment on the table.",
      },
      {
        id: "wage-garnishment",
        name: "Wage garnishment (Writ of Attachment)",
        blurb: "Take 15% of every paycheck until paid.",
        description:
          "File JP Civil Form 17 listing the debtor's employer. The court issues a writ of attachment to the employer, who must answer within 20 days. Delaware exempts 85% of wages, so you can take only 15% of disposable earnings per pay period. Only ONE wage garnishment can run at a time, so if another creditor got there first you have to wait your turn.",
        forms: [
          { number: "Form 17", name: "Praecipe for Writ of Attachment" },
          { number: "Form 17A", name: "Garnishee Answer (Wages)" },
        ],
        estimatedCost: "$20 to $40 in fees plus a small service cost",
        effectivenessNotes:
          "Best method for steady-employed debtors. The 15% cap means it's slow, but reliable. If the debtor changes jobs, you have to file a new writ for the new employer.",
        exemptions: [
          "85% of wages are exempt by statute (only 15% can be taken)",
          "Social Security, SSI, VA benefits, unemployment, and workers' comp are fully exempt",
          "Active military service members are protected by the SCRA",
        ],
      },
      {
        id: "bank-garnishment",
        name: "Bank account garnishment",
        blurb: "Freeze and seize money in their bank account.",
        description:
          "File Form 17 listing the debtor's bank as the garnishee. The bank gets served, freezes the account up to the judgment amount, and answers within 20 days. Federal benefits like Social Security are automatically protected. Delaware allows the debtor to claim wage-source funds at 85% exempt even after deposit.",
        forms: [
          { number: "Form 17", name: "Praecipe for Writ of Attachment" },
          { number: "Form 17B", name: "Garnishee Answer (Other than Wages)" },
        ],
        effectivenessNotes:
          "First-come-first-served. If multiple creditors hit the same account, the one served first gets paid first. Joint accounts are presumed equally owned, but the non-debtor co-owner can object and prove the funds are theirs.",
      },
      {
        id: "real-estate-lien",
        name: "Lien on real estate (transcribe to Superior Court)",
        blurb: "Cheap, passive, very effective long-term.",
        description:
          "Get a Certified Transcript of Judgment from JP Court ($10) and dock it with the Superior Court Prothonotary in any county where the loser owns or might own real estate. Under 10 Del. C. § 4781, that creates an automatic lien on their real property in that county. When they sell or refinance, you get paid out of the proceeds. The lien lasts 5 years and is renewable up to 20 years total.",
        forms: [
          { number: "Certified Transcript of Judgment", name: "Certified Transcript of Judgment" },
        ],
        estimatedCost: "$10 JP transcript + $25 to $35 Superior Court prothonotary fee",
        effectivenessNotes:
          "Delaware has no general homestead exemption outside of bankruptcy, so a primary residence can technically be reached, but forced sale is rare for small judgments. Liens just sit and wait until the property changes hands.",
      },
      {
        id: "writ-execution",
        name: "Writ of Execution (levy on personal property)",
        blurb: "Constable seizes and auctions non-exempt property.",
        description:
          "File Form 17 for a writ of execution (Fi. Fa.). A constable will attempt to find leviable assets (vehicles, equipment, etc.) and seize them for auction. Delaware's personal property exemptions are very low ($500 for head of family), so most non-essential items above that can be reached. Best for debtors with a paid-off second car, business equipment, or other valuable items.",
        forms: [{ number: "Form 17", name: "Praecipe for Writ of Execution" }],
        estimatedCost: "Constable commission of 4% to 7% of recovered amount, plus storage and auction fees",
        effectivenessNotes:
          "Less common for small claims because cost can outweigh the benefit. Use when you know the debtor has something specific and valuable.",
      },
      {
        id: "renew-judgment",
        name: "Renew the judgment (every 5 years)",
        blurb: "Keep the judgment alive past the 5-year mark.",
        description:
          "JP judgments expire after 5 years. File Form 15A (Application to Revive) within the last 90 days before expiration with a $20 fee. The court will issue a scire facias writ; if the debtor doesn't object (and they usually don't), the judgment is revived for another 5 years. You can do this repeatedly.",
        forms: [{ number: "Form 15A", name: "Application to Revive Judgment" }],
        estimatedCost: "$20",
      },
    ],
    judgmentLifespanYears: 5,
    renewalProcess:
      "JP Court judgments are valid for 5 years and renewable indefinitely in 5-year increments. File Form 15A within the last 90 days before expiration. If the judgment lapses, you can no longer get new writs of execution from JP Court. Transcribing to Superior Court extends the enforceability up to 20 years.",
    debtorExamForm: { number: "N/A in JP Court", name: "Transfer to Superior Court for formal asset discovery" },
    exemptions: [
      "85% of wages (only 15% can be garnished)",
      "Social Security, SSI, VA benefits, unemployment, workers' comp (federally and state protected)",
      "Retirement plans, life insurance proceeds, annuities (10 Del. C. § 4915)",
      "$500 of personal property for head of family ($200 if not head of family)",
      "Tools of trade (small statutory amount)",
      "Active military service member protections under the SCRA",
    ],
    bankruptcyNotes:
      "If the loser files bankruptcy, an automatic stay halts all collection. Most small-claims judgments get discharged in Chapter 7 unless the underlying debt was for fraud, willful injury, or other carve-outs. If you suspect fraud, file a non-dischargeability complaint within 60 days of the creditors' meeting.",
    satisfactionForm: { number: "Satisfaction of Judgment", name: "Satisfaction of Judgment" },
    priorityNotes:
      "Delaware allows only ONE wage garnishment at a time, so you queue behind earlier creditors. Bank garnishments and real estate liens run on a first-served basis. If you transcribed your judgment to Superior Court, your lien priority dates from when you docketed it there.",
  },

  businesses: {
    representation:
      "Delaware lets a business be represented by a non-lawyer officer, partner, or employee in JP Court, but only if you file a notarized Certificate of Representation (Form 50). Otherwise the business needs a Delaware-licensed attorney. Form 50 must be filed in the case AND with the Chief Magistrate, with annual renewal and a $20 fee.",
    canSendEmployee: true,
    canSendAttorney: true,
    representationForm: { number: "Form 50", name: "Certificate of Representation" },
    insuranceAdjusterAllowed: false,
    fictitiousNameNotes:
      "Delaware doesn't have a general statewide DBA registry, but trade-name filings can be made with the prothonotary. When suing a DBA, name the actual legal entity behind it (the LLC, corporation, or sole proprietor by name). Failing to do so can make your judgment unenforceable.",
    soleProprietorEmployeeException:
      "A sole proprietor running a business in their own name appears personally without Form 50. If they want to send an employee, they need to file Form 50.",
    outOfStateNotes:
      "Out-of-state corporations or LLCs that 'do business' in Delaware should be registered with the Division of Corporations under 8 Del. C. § 383. An unregistered foreign business can be barred from maintaining a lawsuit until it registers. For one-off transactions, this is rarely enforced; for ongoing Delaware operations, register first.",
    licensingNotes:
      "If your trade requires a Delaware business license or contractor registration, get it before you sue. Unlicensed contractors can sometimes be barred from collecting on contracts that legally required a license.",
  },

  countyDifferences: [
    {
      county: "New Castle",
      differences: [
        { topic: "Civil JP court", detail: "Court 13 in Wilmington handles most civil cases. Court 12 in Newark covers some northern New Castle area." },
        { topic: "Mediation", detail: "Court 13 has a long-running on-site mediation program for civil cases (especially debt cases)." },
        { topic: "Backlog", detail: "Most populous county; expect 8 to 10 weeks from filing to hearing." },
        { topic: "Attorneys", detail: "More litigants are represented by counsel here, especially collection agencies and landlords." },
        { topic: "Appeals path", detail: "Appeals to Court of Common Pleas in Wilmington." },
      ],
    },
    {
      county: "Kent",
      differences: [
        { topic: "Civil JP court", detail: "Court 16 in Dover handles civil filings." },
        { topic: "Backlog", detail: "Smaller dockets, often 4 to 6 weeks from filing to hearing." },
        { topic: "Mediation", detail: "Less formal than New Castle; usually a hallway negotiation rather than scheduled mediation." },
        { topic: "Appeals path", detail: "Appeals to Court of Common Pleas in Dover." },
      ],
    },
    {
      county: "Sussex",
      differences: [
        { topic: "Civil JP court", detail: "Court 17 in Georgetown handles civil filings." },
        { topic: "Backlog", detail: "Generally faster scheduling than New Castle." },
        { topic: "Pro se litigants", detail: "Most parties appear without lawyers; judges are accustomed to guiding self-represented litigants." },
        { topic: "Language access", detail: "Sizable Spanish-speaking population; interpreters arranged regularly." },
        { topic: "Appeals path", detail: "Appeals to Court of Common Pleas in Georgetown." },
      ],
    },
  ],

  pitfalls: [
    {
      title: "Filing a personal injury claim in JP Court",
      whatHappens:
        "JP Court has no jurisdiction over personal injuries. Even if your medical bills are under $25,000, the case will be dismissed.",
      howToAvoid:
        "Personal injury, defamation, and mental anguish claims must go to the Court of Common Pleas (up to $75,000) or Superior Court. Property-damage-only claims (your car, your fence) are still fine in JP Court.",
    },
    {
      title: "Suing the wrong name",
      whatHappens:
        "You sue 'John's Plumbing' but the actual legal entity is 'John Smith d/b/a John's Plumbing' or 'JSP Services LLC.' Your judgment becomes unenforceable.",
      howToAvoid:
        "Look up the business at the Delaware Division of Corporations for LLCs and corporations. Use the exact registered name on your complaint. If unsure, name both the individual and the entity in the alternative.",
    },
    {
      title: "Missing the 15-day answer deadline (defendants)",
      whatHappens:
        "You're a defendant who got served, didn't file Form 7 within 15 days, and the plaintiff got a default judgment. Now you have only 15 days to move to vacate.",
      howToAvoid:
        "File a written answer (even a general denial) within 15 days of service. If you've already missed it, file a motion to vacate within 15 days of the judgment notice, or appeal to CCP within 15 days.",
    },
    {
      title: "Missing the statute of limitations",
      whatHappens:
        "You file a property damage case 2 years and 1 month after the incident. Defendant raises limitations. Case dismissed.",
      howToAvoid:
        "Delaware property damage claims expire in 2 years. General contract and debt claims expire in 3 years (6 for promissory notes). Wage claims have a tight 1-year deadline. File sooner rather than later.",
    },
    {
      title: "Skipping a required pre-suit demand",
      whatHappens:
        "You file a bad-check claim without sending the 30-day demand letter. The court can't award the $50 (or triple) statutory penalty. Or you file a wage claim without a written demand and lose the 100% liquidated damages.",
      howToAvoid:
        "Bad-check claims (6 Del. C. § 1301A) require a 30-day written demand. Wage claims (19 Del. C. § 1103) require a written demand for liquidated damages. Always send via certified mail and keep proof.",
    },
    {
      title: "Business showing up without Form 50",
      whatHappens:
        "Your LLC's owner shows up to represent the business but didn't file Form 50. The judge can refuse to let them advocate (it's unauthorized practice of law without the certificate).",
      howToAvoid:
        "File the notarized Form 50 with the case AND with the Chief Magistrate before any hearing. Pay the $20 annual fee. Renew every year between November 15 and January 15.",
    },
    {
      title: "Asking for the wrong remedy",
      whatHappens:
        "You ask the JP to order someone to fix something, return to work, or stop harassing you. JP Court can't grant injunctive relief.",
      howToAvoid:
        "Convert what you want into money. 'Make them finish the job' becomes '$X to hire someone else to finish.' Injunctions and specific performance go to the Court of Chancery.",
    },
    {
      title: "Winning against a judgment-proof defendant",
      whatHappens:
        "You win, but the defendant has only exempt income (Social Security, 85% of wages protected) and no real property. You collect little or nothing.",
      howToAvoid:
        "Before suing, gauge whether the defendant has reachable assets. Steady job (15% wage take), bank account with non-exempt funds, or real property are the main targets. If they have only exempt income and rent their home, collection may yield nothing.",
    },
    {
      title: "Letting the judgment lapse at 5 years",
      whatHappens:
        "You won a judgment in 2021, didn't collect, and forgot to renew. By 2026, the judgment is dormant and you can't get new writs.",
      howToAvoid:
        "File Form 15A (Application to Revive) within the last 90 days before the 5-year expiration. $20 fee. Renewable indefinitely in 5-year increments.",
    },
    {
      title: "Ignoring the arbitration clause",
      whatHappens:
        "You sue your cell carrier or bank in JP Court. The defendant moves to compel arbitration under your contract's arbitration clause. JP Court must dismiss or stay your case.",
      howToAvoid:
        "Read the contract. If there's an arbitration clause, you may need to arbitrate instead of sue. Some clauses have small-claims carve-outs; check yours.",
    },
  ],

  recentChanges: [
    {
      date: "2020-08-01",
      title: "Jurisdictional limit raised from $15,000 to $25,000",
      description:
        "House Bill 232 (2020) raised the JP Court civil jurisdictional cap from $15,000 to $25,000 and lifted the cap entirely for rent claims tied to commercial summary possession actions. The increase keeps more cases in the inexpensive JP forum.",
      bill: "HB 232 (2020)",
    },
    {
      date: "2021-11-05",
      title: "Filing fee tiers updated",
      description:
        "JP Court civil filing fees were standardized to the current tiers ($35 / $40 / $45). Other fees like alias service ($20), transcript ($10), and motion to vacate ($15) were also updated.",
    },
    {
      date: "2022-11-01",
      title: "Supreme Court Rule 57 amended (business representation)",
      description:
        "The rule governing how entities are represented in JP Court was refined to clarify the Form 50 process, require annual renewal between November 15 and January 15, and add a $20 annual registration fee starting in late 2023.",
    },
    {
      date: "2023-11-28",
      title: "Updated Civil Form 50 effective",
      description:
        "Delaware Courts released an updated Certificate of Representation (Form 50) reflecting the Rule 57 changes and the $20 annual fee.",
    },
    {
      date: "2023-01-01",
      title: "Mandatory e-filing for attorneys statewide",
      description:
        "E-filing through eFlex became mandatory for attorneys representing parties in JP Court statewide. Self-represented litigants can still paper file or use eFlex if they prefer.",
    },
  ],

  faqs: [
    {
      question: "Do I need a lawyer for small claims in Delaware?",
      answer:
        "No. Delaware lets you represent yourself in JP Court. Lawyers are allowed but not required. Businesses can be represented by a non-lawyer officer or employee, but they must file a notarized Certificate of Representation (Form 50) with a $20 annual fee.",
    },
    {
      question: "How long does small claims take in Delaware from filing to hearing?",
      answer:
        "Most cases get a hearing 30 to 90 days after the defendant's 15-day answer deadline. New Castle County (Court 13) tends to run longer due to volume; Sussex County (Court 17) can be faster. After the hearing, the judge may rule on the spot or take it under advisement and mail a judgment within a few weeks.",
    },
    {
      question: "What's the maximum I can sue for in Delaware small claims?",
      answer:
        "$25,000. The cap is the same for individuals and businesses. The limit was raised from $15,000 in 2020 by House Bill 232. Statutory interest and court costs are added on top, so the practical recovery can be slightly higher.",
    },
    {
      question: "Can I sue for personal injury or defamation in JP Court?",
      answer:
        "No. Delaware JP Court explicitly cannot hear personal injury or defamation claims, regardless of the dollar amount. Those cases must go to the Court of Common Pleas (up to $75,000) or Superior Court (any amount). Property-damage-only claims (your car, your fence) are still fine in JP Court.",
    },
    {
      question: "What happens if the defendant doesn't show up?",
      answer:
        "If the defendant doesn't file a written answer within 15 days of service, the plaintiff can file Form 13 (Motion and Affidavit for Default Judgment). For sum-certain debts, the court can enter default administratively. For unliquidated claims, you'll need to attend a default hearing and prove your damages.",
    },
    {
      question: "Can I appeal if I lose?",
      answer:
        "Yes. Either party can appeal to the Court of Common Pleas within 15 days. The appeal is a fresh trial de novo, so you get a complete second chance with new evidence and full procedure (including a possible jury). Filing fee is about $135, plus a $10 transcript fee paid to JP Court. Filing the appeal does NOT automatically stop enforcement; you'd need to post a supersedeas bond for that.",
    },
    {
      question: "Can I garnish wages in Delaware?",
      answer:
        "Yes, but Delaware exempts 85% of wages, so you can take only 15% of disposable earnings per pay period (more debtor-friendly than the federal 25%). And only ONE wage garnishment can run at a time, so if another creditor got there first, you have to wait your turn.",
    },
    {
      question: "How long is a Delaware JP judgment good for?",
      answer:
        "5 years, renewable indefinitely in 5-year increments. File Form 15A (Application to Revive) within the last 90 days before expiration with a $20 fee. Transcribing the judgment to Superior Court for a real-estate lien extends enforceability up to 20 years total.",
    },
  ],

  sources: [
    {
      label: "10 Del. C. § 9301 (JP Court civil jurisdiction)",
      url: "https://delcode.delaware.gov/title10/c093/index.html",
      citation: "10 Del. C. § 9301(1)",
    },
    {
      label: "10 Del. C. Chapter 81 (statutes of limitations)",
      url: "https://delcode.delaware.gov/title10/c081/index.html",
      citation: "10 Del. C. § 8106 et seq.",
    },
    {
      label: "10 Del. C. Chapter 49 (exemptions and execution)",
      url: "https://delcode.delaware.gov/title10/c049/sc01/index.html",
      citation: "10 Del. C. § 4913",
    },
    {
      label: "6 Del. C. § 1301A (bad-check civil remedies)",
      url: "https://delcode.delaware.gov/title6/c013a/index.html",
      citation: "6 Del. C. § 1301A",
    },
    {
      label: "25 Del. C. § 5514 (security deposit)",
      url: "https://delcode.delaware.gov/title25/c055/index.html",
      citation: "25 Del. C. § 5514",
    },
    {
      label: "25 Del. C. § 5306, § 5307 (tenant remedies for failure to repair)",
      url: "https://delcode.delaware.gov/title25/c053/index.html",
      citation: "25 Del. C. § 5306, § 5307",
    },
    {
      label: "19 Del. C. § 1103 (wage payment liquidated damages)",
      url: "https://delcode.delaware.gov/title19/c011/index.html",
      citation: "19 Del. C. § 1103",
    },
    {
      label: "6 Del. C. § 2301 (legal interest rate)",
      url: "https://delcode.delaware.gov/title6/c023/index.html",
      citation: "6 Del. C. § 2301",
    },
    {
      label: "6 Del. C. Chapter 25 (Consumer Fraud Act)",
      url: "https://delcode.delaware.gov/title6/c025/sc02/index.html",
      citation: "6 Del. C. § 2511 et seq.",
    },
    {
      label: "Delaware Justice of the Peace Court",
      url: "https://courts.delaware.gov/jpcourt/",
    },
    {
      label: "JP Court Civil Fee Schedule (Updated Nov. 5, 2021)",
      url: "https://www.courts.delaware.gov/help/fees/jpfees.aspx",
    },
    {
      label: "JP Court Help & Procedures",
      url: "https://courts.delaware.gov/help/",
    },
    {
      label: "Court of Common Pleas Civil Rule 72.3 (appeals from JP)",
      url: "https://courts.delaware.gov/help/appeals/ccpjpplaintiff.aspx",
    },
    {
      label: "JP Court Judgment Revival Information",
      url: "https://courts.delaware.gov/help/judgments/jp-revive.aspx",
    },
    {
      label: "House Bill 232 (2020): jurisdiction increase to $25,000",
      url: "https://legis.delaware.gov/BillDetail?LegislationId=47731",
      citation: "HB 232 (2020)",
    },
    {
      label: "Delaware Courts E-Filing (eFlex)",
      url: "https://www.courts.delaware.gov/efiling/",
    },
    {
      label: "Delaware Division of Corporations",
      url: "https://corp.delaware.gov/",
    },
  ],
};

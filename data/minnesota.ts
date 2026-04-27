import type { StateGuide } from "../lib/types/state-guide";

export const data: StateGuide = {
  state: "Minnesota",
  slug: "minnesota",
  abbr: "MN",
  lastUpdated: "2026-04-27",

  hero: {
    individualLimit: 20000,
    businessLimit: 20000,
    typicalTimelineDays: { min: 30, max: 75 },
    filingFeeLow: 70,
    filingFeeHigh: 80,
    tagline:
      "Minnesota's Conciliation Court raised the cap to $20,000 in August 2024. Same limit for individuals and businesses, with one big exception: businesses suing consumers on credit-transaction debts are capped at $4,000.",
  },

  ataGlance: [
    { label: "Most you can sue for", value: "$20,000", detail: "Raised from $15,000 in August 2024" },
    { label: "Consumer credit cap", value: "$4,000", detail: "Special lower cap when a business sues a consumer on a credit transaction" },
    { label: "Filing fee", value: "$70 to $80", detail: "$65 state base + small county law library fee" },
    { label: "Court", value: "Conciliation Court", detail: "Division of District Court in each county" },
    { label: "Lawyers at trial", value: "Allowed", detail: "Permitted but not required; most parties go without" },
    { label: "Appeal window", value: "20 days + 3 days mail", detail: "Trial de novo in District Court (called 'removal')" },
  ],

  limits: {
    individual: 20000,
    business: 20000,
    annualCap: { count: 0, threshold: 0 },
    splitClaimsAllowed: false,
    splitClaimsExplanation:
      "If your claim is more than $20,000, you have two options: sue for $20,000 and waive the rest, or file in the regular District Court. You CANNOT split one larger dispute into multiple smaller cases. Once you reduce your claim to fit the conciliation limit, you cannot later sue for the remainder from the same events. Special rule: if a business is suing a consumer on a 'consumer credit transaction' (a sale or loan for personal/household use where the plaintiff is the original creditor), the cap drops to $4,000.",
    statute: "Minn. Stat. § 491A.01, subd. 3a",
  },

  whatYouCanSueFor: [
    {
      id: "contracts",
      title: "Contracts and money owed",
      blurb: "Minnesota gives you a generous 6-year statute of limitations on most contract and debt claims, written or oral. Same clock for both.",
      claims: [
        {
          id: "written-contract",
          name: "Breach of a written contract",
          example: "A contractor signed a $12,000 contract to remodel your kitchen, took the deposit, and never finished.",
          eligible: true,
          statute: "Minn. Stat. § 541.05, subd. 1(1)",
          notes: "6-year deadline. Bring the signed contract, payment proof, and any correspondence showing the breach.",
        },
        {
          id: "oral-contract",
          name: "Breach of an oral or handshake agreement",
          example: "You agreed verbally to install a fence for $4,500. The customer paid the deposit and refused the rest after the work was done.",
          eligible: true,
          statute: "Minn. Stat. § 541.05, subd. 1(1)",
          notes: "Minnesota treats oral and written contracts the same: 6-year deadline. Texts, emails, and witnesses help prove the agreement.",
        },
        {
          id: "personal-loan",
          name: "Unpaid personal loan",
          example: "You loaned a friend $3,000 with a text confirming the repayment schedule. They paid $500 and stopped.",
          eligible: true,
          notes: "Bring bank transfer records, screenshots, and any partial-payment evidence (which can restart the 6-year clock).",
        },
        {
          id: "promissory-note",
          name: "Unpaid promissory note",
          example: "An ex-employee signed a $4,000 written promissory note for a salary advance, then quit and stopped paying.",
          eligible: true,
          statute: "Minn. Stat. § 541.05",
          notes: "6-year deadline from the note's due date.",
        },
        {
          id: "unpaid-invoice",
          name: "Unpaid commercial invoice",
          example: "Your B2B client owes $9,000 on three invoices that have been unpaid for months.",
          eligible: true,
          notes: "Conciliation Court is heavily used by small businesses to recover unpaid invoices. Bring invoices, delivery confirmations, and any payment history.",
        },
        {
          id: "unpaid-rent",
          name: "Unpaid rent (money only, not eviction)",
          example: "A former residential tenant moved out owing $3,200 in back rent.",
          eligible: true,
          notes: "Eviction (recovering possession) belongs in housing court. Conciliation handles the money owed only.",
        },
        {
          id: "bad-check",
          name: "Bounced check (NSF)",
          example: "A customer paid you with a $600 check that bounced. You sent the statutory notice and waited 30 days.",
          eligible: true,
          statute: "Minn. Stat. § 332.50",
          damageBoost:
            "After sending the required Notice of Dishonored Check (certified mail) and waiting 30 days, you can recover the check amount + a service charge up to $40 + a civil penalty of up to $100 OR the check amount, whichever is greater.",
        },
        {
          id: "open-account",
          name: "Open book account or running tab",
          example: "A regular customer ran up a $2,800 tab over six months and stopped paying.",
          eligible: true,
          statute: "Minn. Stat. § 541.05, subd. 1(1)",
          notes: "6-year clock can reset on each partial payment.",
        },
        {
          id: "co-signer",
          name: "Co-signer or guarantor disputes",
          example: "You co-signed a friend's car loan, paid the lender $5,000 when they defaulted, and now your friend won't reimburse you.",
          eligible: true,
          notes: "You're suing for indemnity or contribution. Standard 6-year clock from the date you paid.",
        },
      ],
    },

    {
      id: "consumer",
      title: "Consumer disputes",
      blurb: "Minnesota's Consumer Fraud Act and the private-attorney-general statute let you recover actual damages plus, sometimes, attorney fees.",
      claims: [
        {
          id: "defective-product",
          name: "Refund for a defective product",
          example: "You bought a $1,500 appliance online; it arrived broken and the retailer refuses to refund.",
          eligible: true,
          statute: "Minn. Stat. § 325F.69 (Consumer Fraud Act)",
          notes: "If you can show a deceptive practice, the Consumer Fraud Act allows recovery of actual damages and sometimes attorney fees through Minn. Stat. § 8.31, subd. 3a.",
        },
        {
          id: "bad-service",
          name: "Refund for a service that wasn't done right",
          example: "A photographer was paid $500 in advance for an event but never showed up.",
          eligible: true,
        },
        {
          id: "auto-repair",
          name: "Auto repair overcharge or shoddy work",
          example: "A shop charged you $3,200 for an engine job that failed in three weeks. They won't redo or refund.",
          eligible: true,
          statute: "Minn. Stat. § 325F.56–.66 (Motor Vehicle Repair Act)",
          notes: "Repair shops must give written estimates on request and not exceed them without consent. Violation supports your claim.",
        },
        {
          id: "contractor",
          name: "Home repair or contractor dispute",
          example: "A contractor took your $8,000 deposit, did half the bathroom job, and abandoned the project.",
          eligible: true,
          statute: "Minn. Stat. § 327A (home warranty)",
          notes: "Send the right-to-repair notice under § 327A.02 and wait 60 days. While not required for conciliation, it's often expected and strengthens your case.",
        },
        {
          id: "no-show-vendor",
          name: "Cancelled or no-show service provider",
          example: "Your caterer cancelled the morning of your event. You paid $3,500 in advance.",
          eligible: true,
        },
        {
          id: "subscription-cancellation",
          name: "Gym or subscription refund",
          example: "Your gym kept charging you for 6 months after you cancelled in writing.",
          eligible: true,
          statute: "Minn. Stat. § 325G.06–.12 (gym/spa contract cancellation rights)",
        },
        {
          id: "used-car",
          name: "Used car or dealership dispute",
          example: "A dealer sold you a $7,000 used car and rolled back the odometer.",
          eligible: true,
          statute: "Minn. Stat. § 325F.662 (used car warranty); § 325E.14 (odometer fraud)",
          notes: "Minnesota requires dealers to provide a basic warranty on used cars based on mileage. Odometer fraud is illegal and can support claims for diminished value.",
        },
        {
          id: "false-advertising",
          name: "False advertising or deceptive trade practice",
          example: "A travel agency advertised an 'all-inclusive' package, then charged $800 in mandatory extras on arrival.",
          eligible: true,
          statute: "Minn. Stat. § 325F.69 et seq.",
        },
      ],
    },

    {
      id: "property-damage",
      title: "Property damage",
      blurb: "Minnesota gives you a 6-year deadline on property damage claims, longer than most states.",
      claims: [
        {
          id: "vehicle-collision",
          name: "Vehicle collision (under the cap)",
          example: "Someone backed into your car. Repairs cost $4,500 and the at-fault driver's insurance is denying liability.",
          eligible: true,
          notes: "If the other driver is uninsured and you win, Minnesota lets you request their driver's license suspension if the judgment isn't paid within 30 days. That's powerful leverage.",
        },
        {
          id: "neighbor-property",
          name: "Neighbor damaged your property",
          example: "Your neighbor's tree limb fell and crushed your $3,500 shed.",
          eligible: true,
          notes: "Liability often turns on whether the tree was visibly hazardous and the neighbor knew about it. Photos and prior complaints help.",
        },
        {
          id: "damage-to-rental",
          name: "Tenant damaged your rental property beyond the deposit",
          example: "A former tenant left $4,500 in damage. The deposit covered $1,500 and they refuse to pay the rest.",
          eligible: true,
          notes: "Itemize the damage with photos and repair receipts. Make sure you also followed the deposit return rules (21 days, itemized list) so the tenant can't counter with deposit penalties.",
        },
        {
          id: "pet-damage",
          name: "Pet or animal damage",
          example: "A neighbor's dog destroyed $500 of landscaping or caused a $800 vet bill for your pet.",
          eligible: true,
          notes: "Minnesota has strict liability for dog bites to people. For dog-on-pet or pet-on-property, you proceed under negligence.",
        },
        {
          id: "property-in-custody",
          name: "Property lost or damaged in someone else's custody",
          example: "A dry cleaner ruined a $1,500 wedding dress.",
          eligible: true,
          notes: "Bailees have a duty of care. Posted disclaimers limiting liability per garment ($50, etc.) are sometimes upheld; the judge weighs them against the level of fault.",
        },
      ],
    },

    {
      id: "landlord-tenant",
      title: "Landlord and tenant disputes",
      blurb: "Minnesota has strong tenant protections on security deposits. Wrongful retention triggers double damages plus up to $500 in punitive for bad faith.",
      claims: [
        {
          id: "security-deposit",
          name: "Unreturned security deposit",
          example: "Your landlord kept your $1,500 deposit without sending an itemized list and refuses to respond.",
          eligible: true,
          statute: "Minn. Stat. § 504B.178",
          damageBoost:
            "Landlord must return the deposit (with interest) or send an itemized deduction list within 21 days of move-out (provided you gave a written forwarding address). Wrongful retention triggers double the wrongfully withheld amount. Bad-faith retention can add up to $500 in punitive damages.",
        },
        {
          id: "deposit-not-itemized",
          name: "Landlord kept deposit without itemizing",
          example: "Your landlord sent a $300 check from your $1,200 deposit with no list of what was deducted or why.",
          eligible: true,
          statute: "Minn. Stat. § 504B.178",
          notes: "No itemized list within 21 days = the entire deposit must be returned, plus double damages on the withheld portion.",
        },
        {
          id: "uninhabitable-rental",
          name: "Repair-and-deduct or habitability damages",
          example: "Your landlord refused to fix a broken furnace for two weeks in winter. You paid $400 for an emergency repair.",
          eligible: true,
          statute: "Minn. Stat. § 504B.385 (rent escrow); § 504B.395",
          notes: "You must give the landlord written notice and 14 days to fix before deducting. Document everything.",
        },
        {
          id: "wrongful-retention-property",
          name: "Landlord kept your personal belongings",
          example: "After you moved, your landlord kept your TV and furniture claiming you owed rent.",
          eligible: true,
          statute: "Minn. Stat. § 504B.271",
          notes: "Conciliation Court can order the return of personal property worth ≤ $20,000, not just money. The sheriff can enforce a return order.",
        },
        {
          id: "illegal-eviction",
          name: "Illegal lockout or utility cutoff by landlord",
          example: "Your landlord changed the locks or shut off your utilities without going through court.",
          eligible: true,
          statute: "Minn. Stat. § 504B.225",
          notes: "Self-help evictions are illegal in Minnesota and can yield treble damages plus actual losses.",
        },
        {
          id: "unreturned-prepaid-rent",
          name: "Unreturned prepaid (last month's) rent",
          example: "You gave first and last month's rent at move-in. You moved out on time, the landlord re-rented immediately, and they kept your last month's rent.",
          eligible: true,
        },
      ],
    },

    {
      id: "employment",
      title: "Employment and wage disputes",
      blurb: "Minnesota has unusually strong wage-protection laws. Penalty wages can add up to 15 days of pay on top of what you're already owed.",
      claims: [
        {
          id: "unpaid-wages",
          name: "Unpaid wages or salary",
          example: "Your former employer owes you $3,200 in unpaid wages from your last weeks of work and refuses to pay.",
          eligible: true,
          statute: "Minn. Stat. §§ 181.13, 181.14",
          damageBoost:
            "If you were fired, final wages are due within 24 hours of your written demand. If you quit, by the next regular payday (max 20 days). Late payment after demand triggers a penalty: an additional day's wages for each day late, up to 15 days. Plus attorney fees if you have a lawyer.",
        },
        {
          id: "final-paycheck",
          name: "Final paycheck not paid on time",
          example: "You quit a job. Two months later, your final paycheck of $1,200 still hasn't arrived.",
          eligible: true,
          statute: "Minn. Stat. § 181.14",
          notes: "Same 15-day waiting-time penalty applies if payment is late after written demand.",
        },
        {
          id: "unpaid-commissions",
          name: "Unpaid commission or bonus",
          example: "You earned a $4,000 sales commission per the written plan and your employer refuses to pay it.",
          eligible: true,
          notes: "If the commission was earned per the written plan, it counts as wages and triggers the same penalties.",
        },
        {
          id: "unpaid-overtime",
          name: "Unpaid overtime or minimum wage",
          example: "You worked 50 hours per week salaried without overtime, despite being non-exempt under the rules.",
          eligible: true,
          statute: "Minn. Stat. § 177.27",
          notes: "Willful violations can yield double damages and attorney fees. Department of Labor & Industry can also investigate.",
        },
      ],
    },

    {
      id: "personal",
      title: "Personal and minor injury claims",
      blurb: "Conciliation handles minor torts including small personal injury claims. Anything serious or involving expert testimony belongs in District Court.",
      claims: [
        {
          id: "minor-injury",
          name: "Minor personal injury (under the cap)",
          example: "A minor dog bite required a few doctor visits costing $1,500.",
          eligible: true,
          statute: "Minn. Stat. § 347.22 (dog bite strict liability)",
          notes:
            "Personal injury has a 2-year deadline (much shorter than property damage). Dog bites are strict liability. Punitive damages are not awarded. Medical malpractice is excluded entirely.",
        },
        {
          id: "loaned-property",
          name: "Loaned or borrowed property not returned",
          example: "You loaned $1,800 of power tools to a friend who refuses to return them.",
          eligible: true,
          notes: "Conciliation Court can order return of personal property worth ≤ $20,000, not just money damages.",
        },
        {
          id: "engagement-ring",
          name: "Engagement ring or gift after a broken engagement",
          example: "Your ex kept the $3,500 engagement ring after the engagement was called off.",
          eligible: true,
          notes: "Minnesota courts treat engagement rings as conditional gifts. If the engagement is called off, the ring usually goes back to the giver if the giver wasn't at fault for the breakup.",
        },
        {
          id: "joint-property-breakup",
          name: "Jointly owned personal property after a breakup",
          example: "You and your ex bought a $5,000 boat. After splitting, your ex has it and refuses to share or sell.",
          eligible: true,
          statute: "Minn. Stat. § 491A.02",
          notes: "Conciliation Court can determine ownership and order delivery of personal property worth ≤ $20,000. Real estate is excluded.",
        },
        {
          id: "civil-theft",
          name: "Civil theft",
          example: "An employee stole $200 cash from your business.",
          eligible: true,
          statute: "Minn. Stat. § 604.14",
          damageBoost: "Victims can recover the greater of $500 or 2x the value of the stolen property, plus attorney fees.",
        },
      ],
    },

    {
      id: "vehicle-forfeiture",
      title: "Vehicle forfeiture (special)",
      blurb: "Minnesota lets you challenge certain police vehicle forfeitures (DWI or drug-related) in Conciliation Court if the vehicle is worth $20,000 or less. No filing fee for these petitions.",
      claims: [
        {
          id: "dwi-forfeiture",
          name: "DWI vehicle forfeiture challenge",
          example: "Police seized your car after a DWI arrest. You're an innocent owner (or the forfeiture was improper).",
          eligible: true,
          statute: "Minn. Stat. § 169A.63",
          notes: "Strict 60-day deadline from the notice of seizure. No filing fee. Conciliation Court can order the vehicle returned.",
        },
        {
          id: "drug-forfeiture",
          name: "Drug-related vehicle forfeiture challenge",
          example: "Your vehicle was seized in a drug case but you weren't involved.",
          eligible: true,
          statute: "Minn. Stat. § 609.5314",
          notes: "Similar tight deadlines. Attach the notice of seizure to your petition.",
        },
      ],
    },
  ],

  whatYouCannotSueFor: [
    {
      category: "Title to real estate or boundary disputes",
      explanation: "Conciliation Court cannot resolve who owns land, boundary lines, easements, or quiet-title actions.",
      whereToGoInstead: "District Court",
    },
    {
      category: "Eviction (unlawful detainer)",
      explanation: "Eviction proceedings to recover possession of rental property go to housing court or District Court, not conciliation.",
      whereToGoInstead: "Housing Court (Hennepin/Ramsey) or District Court",
    },
    {
      category: "Defamation (libel and slander)",
      explanation: "Defamation claims are explicitly excluded from Conciliation Court regardless of dollar amount.",
      whereToGoInstead: "District Court (with a 2-year statute of limitations)",
    },
    {
      category: "Malpractice claims",
      explanation:
        "Medical, legal, and other professional malpractice claims are excluded. They require expert testimony and exceed conciliation's scope.",
      whereToGoInstead: "District Court with the appropriate expert affidavit",
    },
    {
      category: "Injunctions and specific performance",
      explanation:
        "Conciliation cannot order someone to do or stop doing something. The narrow exception: it CAN order return of personal property worth ≤ $20,000.",
      whereToGoInstead: "District Court for injunctions; Court of Chancery is not a Minnesota court",
    },
    {
      category: "Class actions",
      explanation: "Conciliation Court cannot certify class actions. Each plaintiff must file separately.",
      whereToGoInstead: "District Court",
    },
    {
      category: "Pre-judgment remedies (attachment, replevin)",
      explanation: "You cannot freeze a defendant's assets or seize property before the hearing through conciliation.",
      whereToGoInstead: "District Court",
    },
    {
      category: "Family law and probate",
      explanation:
        "Divorce, child support, custody, paternity, adoption, juvenile, probate, trust, and guardianship matters are all excluded under Minn. Stat. § 491A.01, subd. 4. Exception: a state or local agency CAN sue in conciliation to recover a debt arising under those chapters (like a welfare overpayment).",
      whereToGoInstead: "Family Court for divorce/support; Probate Court for estate matters",
    },
    {
      category: "Cases against the federal or state government",
      explanation:
        "Sovereign immunity blocks most suits against the U.S. or the State of Minnesota in conciliation. State agencies CAN appear as plaintiffs in conciliation.",
      whereToGoInstead: "Federal court for U.S. claims; State Claims Commission or District Court under the Minnesota Tort Claims Act",
    },
    {
      category: "Workers' compensation",
      explanation: "Workers' comp claims must go through the Workers' Compensation Court of Appeals, not conciliation.",
      whereToGoInstead: "Workers' Compensation administrative process",
    },
    {
      category: "Bankruptcy matters",
      explanation: "Bankruptcy is exclusively federal. The automatic stay also blocks new state-court suits against a debtor in bankruptcy.",
      whereToGoInstead: "U.S. Bankruptcy Court for the District of Minnesota",
    },
    {
      category: "Suing a deceased person",
      explanation: "You cannot sue someone who has died in conciliation. Claims must go through their estate via probate.",
      whereToGoInstead: "Register of Wills / Probate Court",
    },
    {
      category: "Cases subject to mandatory arbitration",
      explanation:
        "If your contract has a valid arbitration clause and the defendant raises it, the court must enforce it. Common in cell phone, banking, and employment contracts.",
      whereToGoInstead: "Private arbitration per the contract",
    },
  ],

  damages: {
    compensatory: true,
    punitive: {
      available: false,
      explanation:
        "Conciliation Court does not award common-law punitive damages. Statutory penalties (security deposit double damages, bad-check penalty, wage waiting-time penalty) are available where the underlying statute provides them.",
    },
    statutoryMultipliers: [
      {
        claim: "Bad-faith security deposit retention",
        multiplier: "2x wrongfully withheld + up to $500 punitive for bad faith",
        statute: "Minn. Stat. § 504B.178",
      },
      {
        claim: "Bounced check (after 30-day notice)",
        multiplier: "Check amount + service charge up to $40 + civil penalty up to $100 OR check amount, whichever greater",
        statute: "Minn. Stat. § 332.50",
      },
      {
        claim: "Late final wages (waiting-time penalty)",
        multiplier: "Up to 15 days of pay added to unpaid wages",
        statute: "Minn. Stat. §§ 181.13, 181.14",
      },
      {
        claim: "Civil theft",
        multiplier: "Greater of $500 or 2x the value of stolen property + attorney fees",
        statute: "Minn. Stat. § 604.14",
      },
      {
        claim: "Illegal lockout or utility cutoff (tenant)",
        multiplier: "Treble damages plus actual losses",
        statute: "Minn. Stat. § 504B.225",
      },
      {
        claim: "Willful minimum wage / overtime violations",
        multiplier: "2x unpaid wages + attorney fees",
        statute: "Minn. Stat. § 177.27",
      },
    ],
    attorneyFees: {
      available: true,
      explanation:
        "Each side generally pays their own attorney fees unless a contract or statute shifts them. Wage claims (§ 181.171), Consumer Fraud Act (§ 8.31, subd. 3a), civil theft (§ 604.14), and contracts with fee-shift clauses are the main exceptions. Pro se litigants cannot recover fees for their own time.",
    },
    interestRate: {
      rate: 5,
      type: "simple",
      statute: "Minn. Stat. § 549.09",
      notes:
        "Post-judgment interest rate is set annually by the State Court Administrator based on one-year Treasury bill yields, with a 4% floor. Rates were around 5% to 6% in 2024 to 2026 due to higher T-bill yields. Pre-judgment interest is also available on liquidated sums.",
    },
    feesRecoverable: true,
  },

  whereToFile: {
    courtName: "Conciliation Court",
    parentCourt: "Minnesota District Court (Conciliation Division)",
    venueRules: [
      {
        scenario: "Most cases (the default)",
        filingOptions: [
          "The county where the defendant lives",
          "The county where a business defendant has its primary place of business or registered agent",
        ],
      },
      {
        scenario: "Landlord-tenant money disputes",
        filingOptions: [
          "The county where the rental property is located (special statutory venue)",
          "Where the defendant lives",
        ],
      },
      {
        scenario: "Bad check cases",
        filingOptions: [
          "The county where the check was written or passed to you",
        ],
      },
      {
        scenario: "Multiple defendants",
        filingOptions: ["Any county where ONE of the defendants resides"],
      },
      {
        scenario: "Out-of-state defendant (long-arm)",
        filingOptions: [
          "Where the corporation's registered agent is located",
          "Where the cause of action arose",
          "Your county if the defendant has no Minnesota presence (foreign corp without authority)",
        ],
      },
    ],
    consequencesOfWrongVenue:
      "Filing in the wrong county can lead to dismissal (without prejudice) and you'll have to refile correctly. Conciliation courts generally cannot transfer cases between counties; they dismiss and you start over. Pay the filing fee twice if you mess up.",
    eFilingAvailable: "yes",
    eFilingNotes:
      "Minnesota uses Guide & File and the eFS system. Self-represented filers can use the online interview to fill out the Statement of Claim and submit it electronically in any county. Extra $5 e-filing convenience fee. Paper filings still accepted.",
    eFilingPortal: "https://www.mncourts.gov/GetForms.aspx?c=10&p=41",
  },

  fees: {
    tiers: [{ range: "All claims (flat base fee)", amount: 65 }],
    frequentFiler: { threshold: 0, fee: 0 },
    serviceFees: [
      { method: "Court (first-class mail) for claims ≤ $2,500", amount: "Included in filing fee", notes: "Court mails the summons automatically." },
      { method: "Sheriff personal service", amount: "$40 to $60", notes: "Required for claims over $2,500 (or when court mail fails)." },
      { method: "Certified mail (restricted delivery) by plaintiff", amount: "$10 to $15", notes: "Required for claims over $2,500. Must be signed by defendant personally." },
      { method: "Private process server", amount: "$50 to $100", notes: "Alternative to sheriff." },
    ],
    waiver: {
      forms: [
        { number: "Affidavit of IFP", name: "Affidavit for Proceeding In Forma Pauperis (IFP)" },
      ],
      eligibility: [
        "You receive need-based public assistance (MFIP, General Assistance, SNAP, SSI)",
        "Your household income is below 125% of federal poverty",
        "Special financial hardship",
      ],
      coverageNotes:
        "If granted, IFP waives the filing fee. If you win the case, the waived fee is added to the judgment against the other party.",
    },
    otherFees: [
      { name: "County law library fee", amount: "$5 to $15", notes: "Added to base fee. Brings total to about $70 to $80." },
      { name: "E-filing technology fee", amount: "$5", notes: "Charged when filing electronically." },
      { name: "Removal/appeal to District Court", amount: "$310 (or $410 with jury demand)", notes: "Plus typical $50 cost bond." },
      { name: "Subpoena issuance", amount: "$10", notes: "Plus $20 witness fee + mileage." },
      { name: "Writ of Execution (post-judgment)", amount: "About $55", notes: "Issued by court for sheriff to enforce." },
      { name: "Transcript of judgment", amount: "$10", notes: "Certified copy needed to lien property in another county." },
    ],
    feesRecoverableNotes:
      "If you win, the judgment includes the filing fee and reasonable service costs as 'costs' the loser owes you. The losing party reimburses your fees on top of the judgment.",
  },

  statuteOfLimitations: {
    entries: [
      {
        id: "written-contract",
        claim: "Written contract",
        years: 6,
        clockStart: "Date of breach",
        statute: "Minn. Stat. § 541.05, subd. 1(1)",
      },
      {
        id: "oral-contract",
        claim: "Oral contract",
        years: 6,
        clockStart: "Date of breach",
        statute: "Minn. Stat. § 541.05, subd. 1(1)",
        notes: "Same as written contracts in Minnesota. No discount for being unwritten.",
      },
      {
        id: "sale-of-goods",
        claim: "Sale of goods (UCC)",
        years: 4,
        clockStart: "Date of breach",
        statute: "Minn. Stat. § 336.2-725",
        notes: "Shorter UCC clock for sale-of-goods contracts.",
      },
      {
        id: "promissory-note",
        claim: "Promissory note",
        years: 6,
        clockStart: "Note's due date or last payment",
        statute: "Minn. Stat. § 541.05, subd. 1(1)",
      },
      {
        id: "open-account",
        claim: "Open account or credit card debt",
        years: 6,
        clockStart: "Last charge or payment",
        statute: "Minn. Stat. § 541.05, subd. 1(1)",
        notes: "Partial payment can restart the clock.",
      },
      {
        id: "personal-injury",
        claim: "Personal injury",
        years: 2,
        clockStart: "Date of injury",
        statute: "Minn. Stat. § 541.07, subd. 1",
      },
      {
        id: "property-damage",
        claim: "Property damage",
        years: 6,
        clockStart: "Date of damage",
        statute: "Minn. Stat. § 541.05",
        notes: "Longer than most states.",
      },
      {
        id: "fraud",
        claim: "Fraud or misrepresentation",
        years: 6,
        clockStart: "When the fraud was discovered or reasonably should have been",
        statute: "Minn. Stat. § 541.05, subd. 1(6)",
        notes: "Discovery rule applies.",
      },
      {
        id: "defamation",
        claim: "Defamation (libel/slander)",
        years: 2,
        clockStart: "Date of publication",
        statute: "Minn. Stat. § 541.07, subd. 1",
        notes: "Cannot be filed in conciliation regardless of amount; goes to District Court.",
      },
      {
        id: "wages",
        claim: "Unpaid wages",
        years: 2,
        clockStart: "Date wages were due (3 years if willful)",
        statute: "Minn. Stat. § 541.07, subd. 5",
      },
      {
        id: "judgment-enforcement",
        claim: "Enforcing an existing judgment",
        years: 10,
        clockStart: "Date of entry",
        statute: "Minn. Stat. § 541.04",
        notes: "Renewable for another 10 years if you act before expiration.",
      },
    ],
    discoveryRuleNotes:
      "Minnesota applies the discovery rule for fraud (built into § 541.05) and certain latent injury cases. For ordinary contract or property damage, the clock starts when the breach or damage happened.",
    tollingNotes:
      "Statute is tolled if the defendant is out of state (§ 541.13), if the plaintiff is a minor or legally incapacitated, during a defendant's bankruptcy automatic stay, or where fraud was concealed. Partial payment or written acknowledgment of a debt can restart the contract clock.",
  },

  preFiling: {
    demandLetterRequired: false,
    demandLetterRecommended: true,
    demandLetterNotes:
      "Most claims don't require a demand letter, but two situations make one mandatory for the full remedy. Bad-check claims under § 332.50 require a 30-day written Notice of Dishonored Check (certified mail) before you can recover the statutory penalty. Wage claims require a written demand to trigger the 15-day waiting-time penalty. Even when not required, a demand letter often resolves the dispute without filing.",
    governmentClaimRequired: true,
    governmentClaimNotes:
      "Tort claims against a Minnesota city, county, or state agency require a written notice of claim within 180 days of the incident (Minn. Stat. § 466.05 for municipalities; § 3.736 for the state). Without proper notice, your case is barred.",
    landlordTenantNotes:
      "Security deposit claims require a written forwarding address. The 21-day refund clock starts when you've moved AND given the address. For repair-and-deduct, you must give the landlord 14 days' written notice and a chance to fix.",
    consumerProtectionNotes:
      "Construction defect claims against home contractors require a 60-day right-to-repair notice under § 327A.02 before suit. Not a strict jurisdictional bar in conciliation, but judges expect compliance.",
    arbitrationClauseNotes:
      "Minnesota enforces valid arbitration clauses. Many cell phone, bank, and employment contracts mandate arbitration. Some clauses carve out small claims; check yours. If the defendant moves to compel arbitration, the conciliation court must enforce it.",
  },

  forms: [
    {
      number: "CCT102",
      name: "Plaintiff's Statement of Claim and Summons",
      description: "The main form to start a case. Tells the court who you're suing, how much, and why. Acts as both the complaint and the summons once filed.",
      whoFiles: "plaintiff",
      required: true,
      group: "starting",
    },
    {
      number: "Affidavit of IFP",
      name: "Affidavit for Proceeding In Forma Pauperis",
      description: "Filed in lieu of paying the filing fee if you qualify based on income or hardship.",
      whoFiles: "either",
      required: false,
      group: "fee-waiver",
    },
    {
      number: "POA for Conciliation",
      name: "Power of Attorney for Conciliation Court",
      description: "Required for any business entity to be represented by a non-lawyer officer or employee. NOT a general power of attorney; only valid for the conciliation case.",
      whoFiles: "either",
      required: false,
      group: "starting",
    },
    {
      number: "Affidavit of Service",
      name: "Affidavit of Service",
      description: "Filed by whoever served the papers (sheriff, process server, or plaintiff for certified mail). Required for claims over $2,500.",
      whoFiles: "either",
      required: false,
      group: "service",
    },
    {
      number: "CCT103",
      name: "Defendant's Statement of Counterclaim and Summons",
      description: "If you're being sued and have your own claim against the plaintiff, file this at least 7 days before the hearing. Same $20,000 cap (or $4,000 for consumer credit) applies.",
      whoFiles: "defendant",
      required: false,
      group: "counterclaim",
    },
    {
      number: "Affidavit of Removal",
      name: "Affidavit of Removal (for counterclaims over $20,000)",
      description: "Filed at least 7 days before the hearing if your counterclaim exceeds the cap and you want to remove the entire case to District Court.",
      whoFiles: "defendant",
      required: false,
      group: "counterclaim",
    },
    {
      number: "Subpoena",
      name: "Witness Subpoena",
      description: "Compels a witness to attend or produce documents. $10 issuance fee plus $20/day witness fee + mileage.",
      whoFiles: "either",
      required: false,
      group: "hearing",
    },
    {
      number: "Motion to Vacate",
      name: "Motion to Vacate Conciliation Court Judgment",
      description: "If a default judgment was entered against you, file within 20 days for an administrative reopen, or later with a formal motion showing good cause.",
      whoFiles: "defendant",
      required: false,
      group: "after-judgment",
    },
    {
      number: "Demand for Removal",
      name: "Demand for Removal / Affidavit of Good Faith",
      description: "The appeal form. File within 20 days of the judgment notice (plus 3 days for mailing) to remove the case to District Court for trial de novo. Pay $310 fee + $50 cost bond.",
      whoFiles: "either",
      required: false,
      group: "appeal",
    },
    {
      number: "Order for Disclosure",
      name: "Financial Disclosure Order",
      description: "Issued by the court at the judgment creditor's request after judgment. Forces the debtor to disclose employer, bank, and assets within 16 days.",
      whoFiles: "court",
      required: false,
      group: "after-judgment",
    },
    {
      number: "Writ of Execution",
      name: "Writ of Execution",
      description: "Authorizes the sheriff to seize and sell the loser's non-exempt assets to pay the judgment. ~$55 fee.",
      whoFiles: "plaintiff",
      required: false,
      group: "after-judgment",
    },
    {
      number: "Garnishment Summons",
      name: "Garnishment Summons (wages or bank)",
      description: "Allows you to garnish 25% of disposable wages or freeze and seize money in the loser's bank account.",
      whoFiles: "plaintiff",
      required: false,
      group: "after-judgment",
    },
    {
      number: "Transcript of Judgment",
      name: "Transcript of Judgment",
      description: "Certified copy used to dock the judgment as a lien on real estate in any Minnesota county. $10 fee.",
      whoFiles: "plaintiff",
      required: false,
      group: "after-judgment",
    },
    {
      number: "Satisfaction of Judgment",
      name: "Satisfaction of Judgment",
      description: "Filed by the plaintiff once the judgment is paid in full. Clears the public record.",
      whoFiles: "plaintiff",
      required: false,
      group: "after-judgment",
    },
  ],

  service: {
    whoCanServe: [
      "The court administrator (by first-class mail, for claims ≤ $2,500)",
      "Any sheriff in Minnesota",
      "A private process server",
      "Plaintiff (for certified mail, restricted delivery, on claims over $2,500)",
      "Any adult who is not a party to the case",
    ],
    methods: [
      {
        name: "Court mail (claims ≤ $2,500)",
        description: "The court automatically mails the summons by first-class mail to the address you provided. No proof of receipt needed unless mail comes back undeliverable.",
        pros: ["Free (included in filing fee)", "Court handles it for you"],
        cons: ["Not available for claims over $2,500", "If returned undeliverable, you have to arrange another method"],
      },
      {
        name: "Certified mail by plaintiff (claims over $2,500)",
        description: "Plaintiff sends the summons via Certified Mail with Restricted Delivery and return receipt. Only valid if the defendant personally signs.",
        pros: ["Cheap ($10 to $15)", "Plaintiff controls the timing"],
        cons: ["Often fails when defendants refuse or never claim the mail"],
      },
      {
        name: "Personal service by sheriff or process server",
        description: "Most reliable method. The sheriff or process server hands the summons to the defendant in person.",
        pros: ["Highest success rate", "Solid proof of service"],
        cons: ["Costs $40 to $100"],
      },
      {
        name: "Substituted service",
        description:
          "If personal service can't be made, the rules allow leaving the papers with someone of suitable age at the defendant's home or workplace. Usually does NOT require court permission for the same form of service the rules allow.",
      },
      {
        name: "Service by publication",
        description: "Last resort if defendant's location is truly unknown. Typically requires a court motion and is rare in conciliation due to cost.",
      },
    ],
    timing: { inCountyDays: 60, outOfCountyDays: 60 },
    proofFilingDeadlineDays: 7,
    proofForm: { number: "Affidavit of Service", name: "Affidavit of Service" },
    businessServiceRules:
      "For corporations or LLCs, serve the registered agent listed with the Minnesota Secretary of State. For partnerships, serve any general partner. The Sec State website (Business Search) lists registered agents and addresses.",
    outOfStateNotes:
      "Service outside Minnesota is allowed under the long-arm statute (Minn. Stat. § 543.19) when Minnesota has personal jurisdiction. Hire a process server in the defendant's state; certified mail is usually not sufficient out of state.",
    cantFindDefendant:
      "If you can't locate the defendant, try a skip-trace service or research online. If still no luck, you can motion the court for service by publication or alternate means, but that's rarely worth it for small claims. Often, you should pause filing until you have a current address.",
    avoidingService:
      "If a defendant refuses to take the papers, the sheriff or server can leave them in the defendant's presence after identifying themselves. That counts as valid service.",
  },

  response: {
    defendantMustFileAnswer: false,
    responseNotes:
      "Unlike most courts, Minnesota Conciliation Court does NOT require the defendant to file a written answer. The hearing date IS the deadline. The defendant simply shows up to dispute the claim. They can also file a counterclaim at least 7 days before the hearing.",
    defaultProcess:
      "If the defendant doesn't show up at the hearing, the court will likely enter default judgment for the plaintiff (assuming service was proper). The judge will usually require the plaintiff to briefly testify to the claim and amount.",
    proveUpRequired: true,
    proveUpNotes:
      "Even on a default, you should bring evidence. The judge may ask you to swear to the facts and may require proof of damages, especially for larger sums. Show up empty-handed and the judge can award less than you asked or dismiss.",
    motionToVacateForm: { number: "Motion to Vacate", name: "Motion to Vacate Conciliation Court Judgment" },
    motionToVacateDeadlineDays: 20,
    motionToVacateLackOfNoticeDays: 30,
    motionToVacateAppealDeadlineDays: 20,
    motionToVacateAppealNotes:
      "A defaulting defendant CANNOT remove (appeal) directly to District Court. Their only remedy is a motion to vacate in conciliation. Within 20 days, a simple letter or short request can reopen the case administratively. After that, a formal motion with affidavit and good cause is required.",
  },

  counterclaim: {
    allowed: true,
    form: { number: "CCT103", name: "Defendant's Statement of Counterclaim and Summons" },
    sameMonetaryLimit: true,
    serviceDeadlineSameCountyDays: 7,
    serviceDeadlineOutOfCountyDays: 7,
    transferToHigherCourt: {
      available: true,
      notes:
        "If your counterclaim exceeds the $20,000 cap, you have two options: waive the excess and stay in conciliation, OR file an Affidavit of Removal at least 7 days before the hearing to remove the entire case to District Court. The District Court fee ($310+) and possible cost bond apply. Once removed, the case starts fresh as a regular civil action and a business will need to retain a Minnesota attorney.",
    },
  },

  hearing: {
    attorneysAllowed: true,
    attorneysAllowedNotes:
      "Minnesota allows lawyers in conciliation court for both individuals and businesses. Most parties go without one. Businesses can also be represented by an officer, manager, or authorized employee with a Power of Attorney form. On appeal to District Court, however, business entities MUST hire a lawyer.",
    format:
      "Bench trial. Each case typically gets 10 to 15 minutes. The judge or referee is the fact-finder and decision-maker. No formal rules of evidence; judges have broad discretion to consider any reliable information.",
    presider: "District Court judge or appointed Conciliation Court referee",
    burdenOfProof:
      "Preponderance of the evidence. The judge has to believe your version is more likely than not (over 50%) more credible than the defendant's.",
    whatToBring: [
      "Your filed Statement of Claim with the court stamp",
      "3 copies of every document (one for the judge, one for the opponent, one for you)",
      "Original contracts, invoices, and receipts",
      "Photos of damage or work (printed in color)",
      "Text messages and emails (printed and highlighted)",
      "Bank statements, cancelled checks, or payment proof",
      "Repair estimates from independent professionals",
      "A short timeline of what happened",
      "Any witness who saw the events (or written statements if they can't attend)",
      "Demand letters and proof of statutory notices (bad-check, wage demand)",
    ],
    witnessSubpoenaForm: { number: "Subpoena", name: "Witness Subpoena", feePerDay: 20 },
    interpretersFree: true,
    interpreterNotes:
      "Minnesota courts provide free interpreters for non-English speakers and the deaf in civil cases. Request one in advance through the court (when filing or as soon as you know one is needed).",
    juryAllowed: false,
    decisionTiming:
      "Judges often take the case under advisement and mail the decision within a week or two. Statute requires the decision within 20 days of the hearing.",
    mediationOnHearingDay: {
      offered: true,
      notes:
        "Hennepin County Conciliation Court has volunteer mediators on hearing day for free mediation if both parties agree. Ramsey and other counties offer access to local Dispute Resolution Centers. Mediation is voluntary; if it fails, you still get your trial.",
    },
  },

  appeals: {
    whoCanAppeal:
      "Either party who appeared at the hearing and is dissatisfied. A defaulting defendant CANNOT directly appeal; they must first move to vacate. Cases dismissed because the plaintiff didn't appear can be reopened only via a motion to vacate.",
    deadlineDays: 23,
    fee: 310,
    type: "de novo",
    typeNotes:
      "Minnesota calls this 'removal,' but it's effectively an appeal that triggers a brand-new trial in District Court. The District Court is not bound by the conciliation judge's findings. New evidence, new witnesses, formal procedure, possible jury trial. The result can be better, worse, or the same.",
    attorneysAllowedOnAppeal: true,
    bondRequired: true,
    automaticStayOnFiling: true,
    notice: { form: "Demand for Removal", name: "Demand for Removal / Affidavit of Good Faith" },
    frivolousPenalty: {
      available: true,
      cap: 0,
      statute: "Minn. Gen. R. Prac. 521",
      notes:
        "If the appellant does worse on de novo than in conciliation, the court can award costs (including the $50 bond) to the other party. Frivolous appeals can also draw attorney fees if the judge finds bad faith.",
    },
    defaultJudgmentNotAppealable: true,
    defaultJudgmentNotes:
      "Defaulting defendants cannot remove to District Court. Their only path is a motion to vacate in conciliation. Within 20 days of judgment, the conciliation court can reopen the case administratively. After that, you need a formal motion showing good cause (excusable neglect, lack of service, etc.).",
  },

  collection: {
    paymentDeadline: "Once the 20-day appeal window passes (plus 3 mailing days), the judgment is final and enforceable",
    interestRate: 5,
    interestRateNotes:
      "Post-judgment interest under Minn. Stat. § 549.09. Tied to one-year T-bill yields with a 4% floor. Recent rates are around 5% to 6% per year. Accrues automatically from the date of judgment.",
    methods: [
      {
        id: "voluntary-payment",
        name: "Demand letter for payment",
        blurb: "Send a polite demand. Often works.",
        description:
          "Once the appeal window has passed, send the loser a written demand including the case number, judgment amount, accrued interest, and your preferred payment method. Many debtors pay once they realize garnishment and liens are next.",
      },
      {
        id: "financial-disclosure",
        name: "Financial Disclosure (find their assets)",
        blurb: "Force the loser to disclose their employer, bank, and assets.",
        description:
          "Minnesota gives judgment creditors the right to demand a Financial Disclosure under § 491A.02, subd. 9. The court issues an Order for Disclosure (often free), and the debtor must respond within 16 days listing employer, bank accounts, real and personal property. Failure to comply can lead to contempt.",
        forms: [{ number: "Order for Disclosure", name: "Order for Financial Disclosure" }],
        effectivenessNotes: "Often the FIRST step. Without knowing where the debtor works or banks, you can't garnish.",
      },
      {
        id: "wage-garnishment",
        name: "Wage garnishment (Garnishment Summons)",
        blurb: "Take 25% of every paycheck.",
        description:
          "After judgment, you can issue a Garnishment Summons to the employer (under Minn. Stat. Ch. 571) to garnish up to 25% of the debtor's disposable earnings, OR the amount by which weekly disposable earnings exceed 40 times the federal minimum wage, whichever is less. The employer withholds and remits to you.",
        forms: [{ number: "Garnishment Summons", name: "Garnishment Summons" }],
        estimatedCost: "Filing the writ ~ $55 plus minor service fees",
        effectivenessNotes:
          "Best method for steadily-employed debtors. Multiple creditors queue: only one wage garnishment runs at a time at the 25% cap.",
      },
      {
        id: "bank-garnishment",
        name: "Bank account garnishment",
        blurb: "Freeze and seize money in their bank account.",
        description:
          "Issue a Garnishment Summons to the bank. The bank must freeze funds up to the judgment amount and respond. Federal benefits like Social Security are automatically protected by federal regulation. Last 20 days of deposited wages are also exempt under Minnesota law.",
        forms: [{ number: "Garnishment Summons", name: "Garnishment Summons (other than wages)" }],
        effectivenessNotes:
          "First-come, first-served. If multiple creditors hit the same account, the one served first gets paid first.",
      },
      {
        id: "real-estate-lien",
        name: "Lien on real estate (docket the judgment)",
        blurb: "Cheap, passive, very effective long-term.",
        description:
          "Once docketed in District Court, the judgment becomes a lien on any real property the debtor owns in that county. To lien property in another county, get a certified Transcript of Judgment ($10) and dock it in that county's District Court. The lien lasts 10 years (judgment lifespan) and you'll get paid when the debtor sells or refinances.",
        forms: [{ number: "Transcript of Judgment", name: "Certified Transcript of Judgment" }],
        estimatedCost: "$10 transcript + small filing fee in each additional county",
      },
      {
        id: "writ-execution",
        name: "Writ of Execution (seize non-exempt property)",
        blurb: "Sheriff seizes and auctions non-exempt assets.",
        description:
          "File a Writ of Execution and have the sheriff levy on the loser's non-exempt personal property: vehicles beyond the $5,500 exemption, business equipment beyond $15,000, second cars, boats, jewelry. Less common for small claims because exemptions cover most property of typical debtors.",
        forms: [{ number: "Writ of Execution", name: "Writ of Execution" }],
        estimatedCost: "About $55 fee + sheriff costs",
      },
      {
        id: "license-suspension",
        name: "Driver's license suspension (motor vehicle judgments only)",
        blurb: "Powerful leverage if the debt comes from a car accident.",
        description:
          "If your judgment is for property damage from a motor vehicle accident and the debtor doesn't pay within 30 days, you can request the Minnesota Department of Driver and Vehicle Services suspend their license. Often motivates payment fast.",
        effectivenessNotes: "Only applies to motor vehicle accident judgments. Doesn't work for ordinary debts.",
      },
      {
        id: "renew-judgment",
        name: "Renew the judgment (every 10 years)",
        blurb: "Keep the judgment alive past 10 years.",
        description:
          "Minnesota judgments expire after 10 years. Before expiration, file a new action on the judgment to renew it for another 10 years.",
      },
    ],
    judgmentLifespanYears: 10,
    renewalProcess:
      "Conciliation/District Court judgments expire after 10 years under Minn. Stat. § 541.04. Before that runs out, file a new action on the judgment to renew it. Once expired without renewal, the judgment is permanently unenforceable.",
    debtorExamForm: { number: "Order for Disclosure", name: "Financial Disclosure Order" },
    exemptions: [
      "75% of disposable wages OR amount above 40x federal minimum wage, whichever leaves the debtor more (Minn. Stat. § 571.922)",
      "$5,500 motor vehicle exemption (raised in 2023; higher for disabled debtors)",
      "Tools of trade up to $15,000 (raised in 2023)",
      "Homestead up to about $450,000 in equity (high cap)",
      "Personal household goods up to $11,250",
      "Social Security, SSI, VA benefits, unemployment, workers' comp (federal and state protected)",
      "Most retirement accounts and pensions",
      "Last 20 days of deposited wages",
    ],
    bankruptcyNotes:
      "If the loser files bankruptcy, the automatic stay halts all collection. Most small-claims judgments get discharged in Chapter 7 unless the underlying debt was for fraud, willful injury, or another carve-out. If you suspect fraud, file a non-dischargeability complaint in bankruptcy court within 60 days of the creditors' meeting.",
    satisfactionForm: { number: "Satisfaction of Judgment", name: "Satisfaction of Judgment" },
    priorityNotes:
      "Real estate liens prioritize by docketing date. Wage garnishments queue: only one runs at a time at the 25% cap. Bank levies are first-served. Federal tax liens and child support trump civil judgment liens.",
  },

  businesses: {
    representation:
      "Minnesota lets a business be represented by an officer, manager, partner, or authorized employee in Conciliation Court. The business must file a 'Power of Attorney for Conciliation Court' authorizing that person. On appeal to District Court, the business MUST hire a Minnesota-licensed attorney; non-lawyers cannot continue.",
    canSendEmployee: true,
    canSendAttorney: true,
    representationForm: { number: "POA for Conciliation", name: "Power of Attorney for Conciliation Court" },
    insuranceAdjusterAllowed: false,
    fictitiousNameNotes:
      "Minnesota requires assumed-name (DBA) certificates to be filed with the Secretary of State (Minn. Stat. § 333.01). When suing a DBA, name the actual legal entity behind it (the LLC, corporation, or sole proprietor by name). 'Joe's Plumbing' alone is not a legal party; sue 'Joe Smith d/b/a Joe's Plumbing.'",
    soleProprietorEmployeeException:
      "A sole proprietor running a business in their own name appears personally without a POA. To send an employee, they need to file the Power of Attorney form.",
    outOfStateNotes:
      "Out-of-state corporations or LLCs that 'transact business' in Minnesota must obtain a Certificate of Authority from the Secretary of State before they can maintain a lawsuit (Minn. Stat. § 303.20). For one-off transactions, this is rarely enforced; for ongoing Minnesota operations, register first.",
    licensingNotes:
      "Some trades (electrician, plumber, certain contractors) require Minnesota licenses. Unlicensed contractors can sometimes be barred from collecting on contracts that legally required a license.",
  },

  countyDifferences: [
    {
      county: "Hennepin (Minneapolis)",
      differences: [
        { topic: "Location", detail: "3rd floor Courts Tower, Hennepin Government Center." },
        { topic: "Mediation", detail: "On-site volunteer mediators on hearing day for free mediation if both parties agree." },
        { topic: "Volume", detail: "Highest volume in the state. Hearings often grouped; expect waiting time." },
        { topic: "Filing fee", detail: "About $77 to $80 with the law library fee." },
        { topic: "Standing order", detail: "Filings by Power of Attorney FOR ANOTHER INDIVIDUAL are rejected. POA only works for businesses." },
      ],
    },
    {
      county: "Ramsey (Saint Paul)",
      differences: [
        { topic: "Location", detail: "Ramsey County Courthouse, downtown Saint Paul." },
        { topic: "Mediation", detail: "Access to the Dispute Resolution Center of St. Paul for some cases." },
        { topic: "Filing fee", detail: "About $73 with library fee." },
        { topic: "Schedule", detail: "Hearings typically 6 to 8 weeks out." },
      ],
    },
    {
      county: "Dakota (Apple Valley/Hastings)",
      differences: [
        { topic: "Multiple locations", detail: "Hearings may be at the Apple Valley or Hastings courthouse depending on where the dispute arose." },
        { topic: "E-filing", detail: "Permitted statewide." },
        { topic: "Schedule", detail: "Initial hearing usually within 4 to 6 weeks." },
      ],
    },
    {
      county: "Anoka",
      differences: [
        { topic: "Evening sessions", detail: "Some evening conciliation court sessions for working litigants." },
        { topic: "Mediation", detail: "Local Conflict Resolution Center mediators available." },
      ],
    },
    {
      county: "St. Louis (Duluth/Virginia)",
      differences: [
        { topic: "Multiple courthouses", detail: "Filings should match the geographic region (Duluth vs. Virginia)." },
      ],
    },
    {
      county: "Olmsted (Rochester)",
      differences: [
        { topic: "Strict no-show rule", detail: "If either party doesn't show, case is decided or dismissed immediately." },
      ],
    },
  ],

  pitfalls: [
    {
      title: "Suing the wrong defendant",
      whatHappens:
        "You sue 'Sunrise Apartments' but the actual owner is '123 Investments, LLC.' Your judgment may be unenforceable.",
      howToAvoid:
        "Look up the business at the Minnesota Secretary of State (Business Search). Use the exact registered name. If unsure, name multiple potential parties in the alternative.",
    },
    {
      title: "Filing in the wrong county",
      whatHappens:
        "You file where YOU live instead of where the defendant lives. Conciliation courts dismiss for wrong venue rather than transferring.",
      howToAvoid:
        "File where the defendant lives or has its registered agent. Special exceptions: where the rental property is (landlord-tenant), where the bad check was written, or where any one defendant lives (multiple defendants).",
    },
    {
      title: "Missing the statute of limitations",
      whatHappens:
        "You file a personal injury case 2 years and 1 month after the incident. Defendant raises limitations. Case dismissed.",
      howToAvoid:
        "Personal injury and defamation are 2 years. Most contracts are 6 years. Wage claims are 2 (3 if willful). UCC sale of goods is 4. File sooner rather than later.",
    },
    {
      title: "Bad service of process",
      whatHappens:
        "You sue for $5,000 but use regular mail or forget Restricted Delivery on certified mail. No proof of service. Case continued or dismissed.",
      howToAvoid:
        "For claims over $2,500, use sheriff/process server OR certified mail with Restricted Delivery. File the Affidavit of Service before the hearing. For claims ≤ $2,500, the court mails for you, but verify the address is correct.",
    },
    {
      title: "Skipping the bad-check or wage-demand notice",
      whatHappens:
        "You sue for a bounced check without sending the 30-day Notice of Dishonored Check. The judge can't award the statutory penalty (only the check amount).",
      howToAvoid:
        "For bad checks under § 332.50: send the certified Notice of Dishonored Check and wait 30 days. For wages: send a written demand to trigger the 15-day waiting-time penalty.",
    },
    {
      title: "Business showing up without a Power of Attorney",
      whatHappens:
        "Your LLC's owner shows up but didn't file the POA form. The judge may refuse to let them advocate.",
      howToAvoid:
        "File the Power of Attorney for Conciliation Court when filing the case (or at least before the hearing). It's a Minnesota-specific form; don't confuse it with a general POA.",
    },
    {
      title: "Asking for the wrong remedy",
      whatHappens:
        "You ask the court to make someone fix something, stop harassing you, or order specific performance. Conciliation can only award money or return of personal property.",
      howToAvoid:
        "Convert what you want into a dollar amount. 'Make them finish the job' becomes '$X to hire someone else to finish.' For injunctions, go to District Court.",
    },
    {
      title: "Defaulting in conciliation, then trying to appeal",
      whatHappens:
        "Defendant misses the hearing. Default judgment entered. They wait 30 days, then try to file a removal to District Court. The court rejects it: defaulters can't appeal, only move to vacate.",
      howToAvoid:
        "If you default, file a Motion to Vacate within 20 days for an administrative reopen. After that you need a formal motion with good cause. Don't try to remove a default.",
    },
    {
      title: "Letting the judgment expire at 10 years",
      whatHappens:
        "You won a judgment in 2016, didn't collect, didn't renew. Now it's 2027 and the judgment is permanently dead.",
      howToAvoid:
        "Before the 10-year mark, file a new action on the judgment to renew it for another 10 years.",
    },
    {
      title: "Winning against a judgment-proof defendant",
      whatHappens:
        "You win, but the defendant is on Social Security or has only exempt income. You collect nothing.",
      howToAvoid:
        "Before suing, gauge whether the defendant has reachable assets. If their only income is exempt benefits and they rent, collection may yield nothing. Demand a Financial Disclosure once you have a judgment to find out for sure.",
    },
    {
      title: "Ignoring the arbitration clause",
      whatHappens:
        "You sue your cell carrier or bank in conciliation. They move to compel arbitration. The court must enforce it.",
      howToAvoid:
        "Read the contract. If there's an arbitration clause without a small-claims carve-out, you may need to arbitrate.",
    },
  ],

  recentChanges: [
    {
      date: "2024-08-01",
      title: "Conciliation Court limit raised from $15,000 to $20,000",
      description:
        "The legislature raised the general cap to $20,000 effective August 1, 2024. The first increase since 2014. The special $4,000 cap for consumer credit transactions was NOT raised.",
      bill: "Laws 2023 c 64 art. 4 § 51",
    },
    {
      date: "2023-08-01",
      title: "Personal property exemptions increased",
      description:
        "Motor vehicle exemption raised from $5,000 to $5,500. Tools of trade exemption raised from $12,000 to $15,000. Affects post-judgment collection.",
    },
    {
      date: "2023-01-01",
      title: "Bad check service charge raised to $40",
      description:
        "The maximum service charge for a bounced check rose from $30 to $40 under § 332.50. Statutory penalty cap (greater of $100 or check amount) unchanged.",
    },
    {
      date: "2022-08-01",
      title: "Notarization requirement removed from many forms",
      description:
        "Statement of Claim and Counterclaim forms can now be signed under penalty of perjury rather than notarized. Made e-filing more practical for self-represented litigants.",
    },
    {
      date: "2022-01-01",
      title: "Judgment interest formula updated",
      description:
        "Minn. Stat. § 549.09 updated to tie judgment interest to one-year Treasury yields with a 4% minimum. Recent rates around 5% to 6%, up from a flat 4% in prior years.",
    },
    {
      date: "2021-01-01",
      title: "Eviction moratorium and rent claim conditions (COVID)",
      description:
        "Pandemic-era law required landlords to seek rental assistance before pursuing certain back-rent claims. Largely phased out by 2022 but may still appear in older claims.",
    },
  ],

  faqs: [
    {
      question: "Do I need a lawyer for small claims in Minnesota?",
      answer:
        "No. Minnesota Conciliation Court allows but doesn't require lawyers. Most parties go without one. Businesses can be represented by a non-lawyer officer or employee with a Power of Attorney form. On appeal to District Court, however, businesses MUST hire a lawyer.",
    },
    {
      question: "How long does Minnesota small claims take from filing to hearing?",
      answer:
        "Typically 30 to 75 days. Hennepin County (Minneapolis) often runs longer due to volume; smaller counties can be faster. The judge usually mails the decision within a week or two after the hearing (statute requires within 20 days).",
    },
    {
      question: "What's the maximum I can sue for in Minnesota Conciliation Court?",
      answer:
        "$20,000 for most cases (raised from $15,000 in August 2024). The cap is the same for individuals and businesses. BUT a business suing a consumer on a 'consumer credit transaction' (a sale or loan for personal/household use) is capped at $4,000.",
    },
    {
      question: "Does the defendant have to file an answer?",
      answer:
        "No. Unlike most courts, Minnesota Conciliation Court does NOT require a written answer. The defendant just shows up at the hearing. They can file a counterclaim at least 7 days before the hearing if they have one.",
    },
    {
      question: "What happens if the defendant doesn't show up?",
      answer:
        "The court will likely enter default judgment for you, assuming service was proper. The judge usually requires you to briefly testify to the claim and amount. Bring evidence even on a default.",
    },
    {
      question: "Can I appeal if I lose?",
      answer:
        "Yes, in most cases. Either party who appeared can 'remove' (appeal) to District Court within 20 days of the judgment notice (plus 3 mailing days). It's a brand-new trial de novo with formal procedure and a possible jury. Filing fee is $310 (or $410 for a jury) plus a $50 cost bond. Defaulting defendants CANNOT directly appeal; they must move to vacate first.",
    },
    {
      question: "Can I garnish wages in Minnesota?",
      answer:
        "Yes. Minnesota allows wage garnishment up to 25% of disposable earnings, OR the amount by which weekly disposable earnings exceed 40 times the federal minimum wage, whichever leaves the debtor more. Only ONE wage garnishment runs at a time. Social Security, unemployment, workers' comp, and most retirement accounts are exempt.",
    },
    {
      question: "How long is a Minnesota judgment good for?",
      answer:
        "10 years from entry. Renewable for another 10 years if you file a new action on the judgment before it expires. Lien on real estate runs the same 10 years.",
    },
  ],

  sources: [
    {
      label: "Minn. Stat. § 491A.01 (Conciliation Court jurisdiction)",
      url: "https://www.revisor.mn.gov/statutes/cite/491A.01",
      citation: "Minn. Stat. § 491A.01",
    },
    {
      label: "Minn. Stat. § 491A.02 (Conciliation Court procedure)",
      url: "https://www.revisor.mn.gov/statutes/cite/491A.02",
      citation: "Minn. Stat. § 491A.02",
    },
    {
      label: "Minn. Stat. Chapter 541 (statutes of limitations)",
      url: "https://www.revisor.mn.gov/statutes/cite/541",
      citation: "Minn. Stat. § 541.05 et seq.",
    },
    {
      label: "Minn. Stat. § 504B.178 (security deposit return)",
      url: "https://www.revisor.mn.gov/statutes/cite/504B.178",
      citation: "Minn. Stat. § 504B.178",
    },
    {
      label: "Minn. Stat. § 332.50 (bad check civil liability)",
      url: "https://www.revisor.mn.gov/statutes/cite/332.50",
      citation: "Minn. Stat. § 332.50",
    },
    {
      label: "Minn. Stat. §§ 181.13, 181.14 (final wages and waiting-time penalty)",
      url: "https://www.revisor.mn.gov/statutes/cite/181.13",
      citation: "Minn. Stat. §§ 181.13, 181.14",
    },
    {
      label: "Minn. Stat. § 325F.69 (Consumer Fraud Act)",
      url: "https://www.revisor.mn.gov/statutes/cite/325F.69",
      citation: "Minn. Stat. § 325F.69",
    },
    {
      label: "Minn. Stat. § 549.09 (judgment interest)",
      url: "https://www.revisor.mn.gov/statutes/cite/549.09",
      citation: "Minn. Stat. § 549.09",
    },
    {
      label: "Minn. Stat. § 550.37 (debtor exemptions)",
      url: "https://www.revisor.mn.gov/statutes/cite/550.37",
      citation: "Minn. Stat. § 550.37",
    },
    {
      label: "Minn. Stat. § 571.922 (wage garnishment limits)",
      url: "https://www.revisor.mn.gov/statutes/cite/571.922",
      citation: "Minn. Stat. § 571.922",
    },
    {
      label: "Minn. Stat. § 541.04 (judgment lifespan: 10 years)",
      url: "https://www.revisor.mn.gov/statutes/cite/541.04",
      citation: "Minn. Stat. § 541.04",
    },
    {
      label: "Minnesota Judicial Branch — Conciliation Court Help",
      url: "https://www.mncourts.gov/help-topics/conciliation-court.aspx",
    },
    {
      label: "Minnesota Court Forms — Conciliation Court",
      url: "https://www.mncourts.gov/GetForms.aspx?c=10&p=41",
    },
    {
      label: "Hennepin County Conciliation Court",
      url: "https://mncourts.gov/find-courts/hennepin/hennepincivilcourt/conciliation-court",
    },
    {
      label: "Minnesota District Court Fees",
      url: "https://mncourts.gov/help-topics/court-fees/district-court-fees",
    },
    {
      label: "Minnesota General Rules of Practice (Conciliation Court Rules 508–521)",
      url: "https://mncourts.gov/SupremeCourt/CourtRules.aspx",
    },
    {
      label: "Minnesota Attorney General — Conciliation Court Handbook",
      url: "https://www.ag.state.mn.us/Consumer/Handbooks/ConCourt/",
    },
  ],
};

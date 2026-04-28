import type { StateGuide } from "../lib/types/state-guide";

export const data: StateGuide = {
  state: "Wyoming",
  slug: "wyoming",
  abbr: "WY",
  lastUpdated: "2026-04-28",

  hero: {
    individualLimit: 6000,
    businessLimit: 6000,
    typicalTimelineDays: { min: 21, max: 45 },
    filingFeeLow: 10,
    filingFeeHigh: 10,
    tagline:
      "Wyoming has the lowest filing fee in the country at $10 flat. Small claims happen in Circuit Court for amounts up to $6,000, with a tight 3-to-12-day service window before the hearing.",
  },

  ataGlance: [
    { label: "Most you can sue for", value: "$6,000", detail: "Same cap for individuals and businesses" },
    { label: "Filing fee", value: "$10", detail: "Flat fee, regardless of claim size" },
    { label: "Court", value: "Circuit Court (Small Claims division)", detail: "Same court that handles civil up to $50,000 and misdemeanors" },
    { label: "Lawyers at trial", value: "Allowed", detail: "Either side can hire one; the other gets a continuance to find one" },
    { label: "Service window", value: "3 to 12 days before hearing", detail: "Tight window — too early or too late voids service" },
    { label: "Appeal type", value: "Questions of law only", detail: "NO new trial; District Court reviews for legal errors" },
  ],

  limits: {
    individual: 6000,
    business: 6000,
    annualCap: { count: 0, threshold: 0 },
    splitClaimsAllowed: false,
    splitClaimsExplanation:
      "If your claim is more than $6,000, you have two options: sue for $6,000 and waive the rest, or file as a regular civil case in Circuit Court (which can hear up to $50,000). You CANNOT split one larger dispute into multiple small claims. Court costs (filing and service fees) don't count toward the cap; if you win, those are added on top.",
    statute: "Wyo. Stat. § 1-21-201",
  },

  whatYouCanSueFor: [
    {
      id: "contracts",
      title: "Contracts and money owed",
      blurb: "Wyoming gives you 10 years on written contracts and 8 years on oral ones — among the most generous limits in the country.",
      claims: [
        {
          id: "written-contract",
          name: "Breach of a written contract",
          example: "A roofing contractor signed a $5,500 contract to replace your roof, took the deposit, and never showed up.",
          eligible: true,
          statute: "Wyo. Stat. § 1-3-105(a)(i)",
          notes: "10-year deadline. Bring the signed contract, payment proof, and any correspondence showing breach.",
        },
        {
          id: "oral-contract",
          name: "Breach of an oral or handshake agreement",
          example: "You agreed verbally to install a $3,000 fence. The customer paid the deposit, you finished, and they refused the rest.",
          eligible: true,
          statute: "Wyo. Stat. § 1-3-105(a)(ii)(A)",
          notes: "8-year deadline. Texts, emails, witnesses, and proof of payment all help establish the agreement.",
        },
        {
          id: "personal-loan",
          name: "Unpaid personal loan",
          example: "You loaned a friend $2,000 via personal check and they never paid you back.",
          eligible: true,
          notes: "Bring bank transfer records, screenshots of texts, and any partial-payment evidence (which can restart the clock).",
        },
        {
          id: "promissory-note",
          name: "Unpaid promissory note",
          example: "An ex-employee signed a written promissory note for a $5,000 salary advance, then quit and stopped paying.",
          eligible: true,
          statute: "Wyo. Stat. § 1-3-105(a)(i)",
          notes: "10-year deadline as a written instrument.",
        },
        {
          id: "unpaid-invoice",
          name: "Unpaid commercial invoice",
          example: "A B2B client owes you $4,500 on past-due invoices for delivered goods.",
          eligible: true,
          notes: "Wyoming Circuit Court is heavily used by small businesses for collections. Bring invoices, delivery confirmations, and any partial-payment history.",
        },
        {
          id: "unpaid-rent",
          name: "Unpaid rent (money only, not eviction)",
          example: "A former tenant moved out owing $2,400 in back rent.",
          eligible: true,
          notes: "Eviction (forcible entry/detainer) is a separate action in Circuit Court. Small claims handles only the money owed.",
        },
        {
          id: "bad-check",
          name: "Bounced check (NSF)",
          example: "A customer paid you with a $400 check that bounced. You sent the statutory written demand and waited 30 days.",
          eligible: true,
          statute: "Wyo. Stat. § 1-1-115",
          damageBoost:
            "After sending a 30-day written demand by certified mail to the check writer, you can recover triple the check amount (minimum $100) plus a $30 collection fee plus court costs. A $400 bad check yields a $1,200 judgment.",
        },
        {
          id: "open-account",
          name: "Open book account or running tab",
          example: "A regular customer ran up a $2,800 tab over six months and stopped paying.",
          eligible: true,
          statute: "Wyo. Stat. § 1-3-105(a)(ii)(A)",
          notes: "8-year clock if treated as implied contract; can reset with each partial payment.",
        },
        {
          id: "co-signer",
          name: "Co-signer or guarantor disputes",
          example: "You co-signed a friend's $4,000 car loan, paid the bank when they defaulted, and now your friend won't reimburse you.",
          eligible: true,
          notes: "You're suing for indemnity. Standard contract clock from the date you paid.",
        },
      ],
    },

    {
      id: "consumer",
      title: "Consumer disputes",
      blurb: "Wyoming has a Consumer Protection Act but its private remedy is limited to actual damages — no treble damages or automatic attorney fees for individual suits.",
      claims: [
        {
          id: "defective-product",
          name: "Refund for a defective product",
          example: "You paid $1,200 for a used appliance described as 'fully operational' that broke down immediately.",
          eligible: true,
          statute: "Wyo. Stat. § 34.1-2-725 (UCC); § 40-12-101 et seq. (Consumer Protection Act)",
          notes: "Sale-of-goods contracts have a 4-year UCC limit. CPA claims require giving the business a chance to cure first.",
        },
        {
          id: "bad-service",
          name: "Refund for a service that wasn't done right",
          example: "A photographer was paid $800 in advance and never showed up to your event.",
          eligible: true,
        },
        {
          id: "auto-repair",
          name: "Auto repair overcharge or shoddy work",
          example: "A shop charged $2,500 for a transmission repair that failed in three weeks. They won't redo or refund.",
          eligible: true,
          notes: "Wyoming has no specific auto repair act, but general contract and negligence law applies. Bring estimates and an independent mechanic's evaluation.",
        },
        {
          id: "contractor",
          name: "Home repair or contractor dispute",
          example: "A contractor took your $3,500 deposit, did half the work, and abandoned the job.",
          eligible: true,
          notes: "Wyoming doesn't license most contractors statewide, but document the work, photos, and any communication. Send a demand letter and chance to cure before filing.",
        },
        {
          id: "no-show-vendor",
          name: "Cancelled or no-show service provider",
          example: "Your caterer cancelled the morning of your event. You paid $2,500 in advance.",
          eligible: true,
        },
        {
          id: "subscription-cancellation",
          name: "Gym or subscription refund",
          example: "Your gym kept charging you for 5 months after you cancelled in writing.",
          eligible: true,
        },
        {
          id: "used-car",
          name: "Used car or dealership dispute",
          example: "A dealer sold you a $5,500 used car and concealed a salvage title or rolled-back odometer.",
          eligible: true,
          statute: "Wyo. Stat. § 40-12-101 et seq.",
          notes: "Wyoming's lemon law applies only to NEW vehicles. For used cars, sue under fraud or CPA. Used cars sold 'as-is' make recovery harder; you'd need to prove intentional misrepresentation.",
        },
        {
          id: "false-advertising",
          name: "False advertising or deceptive trade practice",
          example: "A retailer ran a bait-and-switch ad that cost you $800 in actual losses.",
          eligible: true,
          statute: "Wyo. Stat. § 40-12-105 (private right of action)",
          notes: "Wyoming's CPA requires you give the business a chance to cure (typically by demand letter) before suing. No treble damages for individual suits, just actual losses.",
        },
      ],
    },

    {
      id: "property-damage",
      title: "Property damage",
      blurb: "Wyoming has a 4-year deadline on most property damage and injury claims.",
      claims: [
        {
          id: "vehicle-collision",
          name: "Vehicle collision (under the cap)",
          example: "Someone hit your parked car. Repairs cost $2,800 and the at-fault driver's insurance is denying liability.",
          eligible: true,
          statute: "Wyo. Stat. § 1-3-105(a)(iv)",
          notes: "Wyoming uses comparative negligence — your award is reduced by your percentage of fault, with NO recovery if you're 50% or more at fault.",
        },
        {
          id: "neighbor-property",
          name: "Neighbor damaged your property",
          example: "Your neighbor's tree fell on your $3,500 fence and shed during a windstorm.",
          eligible: true,
          notes: "Liability often turns on whether the tree was visibly diseased or dead and the neighbor knew. Photos and prior complaints help.",
        },
        {
          id: "damage-to-rental",
          name: "Tenant damaged your rental property beyond the deposit",
          example: "A former tenant left $2,500 in damage. The deposit covered $1,000 and they refuse to pay the rest.",
          eligible: true,
          notes: "Be sure you complied with Wyoming's deposit return law (30 days, or 60 if there's damage). Failure to comply can mean you forfeit the right to deduct damages.",
        },
        {
          id: "pet-damage",
          name: "Pet or livestock damage",
          example: "A neighbor's dog destroyed $400 of patio furniture; or a stray cow trampled your $1,000 garden.",
          eligible: true,
          notes: "Wyoming is an 'open range' state — livestock owners aren't liable on open range, but if the damage was off-range or due to negligence, claims still work.",
        },
        {
          id: "property-in-custody",
          name: "Property lost or damaged in someone else's custody",
          example: "A dry cleaner ruined a $500 suit; a moving company broke your $1,200 TV.",
          eligible: true,
          notes: "Bailees have a duty of care. Posted disclaimers limiting liability are sometimes upheld but can be challenged.",
        },
      ],
    },

    {
      id: "landlord-tenant",
      title: "Landlord and tenant disputes",
      blurb: "Wyoming protects security deposits with a strict 30-day return rule, but no automatic doubling like some states.",
      claims: [
        {
          id: "security-deposit",
          name: "Unreturned security deposit",
          example: "Your landlord kept your $1,200 deposit without sending an itemized list and refuses to respond.",
          eligible: true,
          statute: "Wyo. Stat. § 1-21-1208",
          damageBoost:
            "Landlord must mail a refund or itemized deductions within 30 days of move-out (or 60 days if damage requires repair estimates). 'Unreasonable failure' to comply means you recover the full deposit plus court costs, AND the landlord forfeits the right to claim damages against you. Wyoming does NOT double the deposit like some states.",
        },
        {
          id: "deposit-not-itemized",
          name: "Landlord kept deposit without itemizing",
          example: "Your landlord sent a $300 check from your $1,500 deposit with no list of what was deducted or why.",
          eligible: true,
          statute: "Wyo. Stat. § 1-21-1208",
          notes: "No itemized list within 30 days = full deposit return + costs.",
        },
        {
          id: "uninhabitable-rental",
          name: "Repair-and-deduct or habitability damages",
          example: "Your landlord refused to fix a broken furnace for two weeks in winter. You paid $300 for an emergency heater.",
          eligible: true,
          notes: "Wyoming has implied warranty of habitability, but no broad statutory repair-and-deduct right like some states. You CAN sue for breach if you gave notice and they refused to fix.",
        },
        {
          id: "wrongful-retention-property",
          name: "Landlord kept your personal belongings",
          example: "After you moved, your landlord locked up your TV and furniture claiming you owed rent.",
          eligible: true,
          statute: "Wyo. Stat. § 1-21-1210",
          notes: "Wyoming requires landlords to follow specific abandonment procedures before disposing of left-behind property. If they didn't, you can sue for the value of your items as conversion (4-year clock).",
        },
        {
          id: "unreturned-prepaid-rent",
          name: "Unreturned prepaid (last month's) rent",
          example: "You gave first and last month's rent at move-in. You moved out, the landlord re-rented immediately, and they kept your last month's rent.",
          eligible: true,
        },
      ],
    },

    {
      id: "employment",
      title: "Employment and wage disputes",
      blurb: "Wyoming doesn't have civil waiting-time penalties for late wages like some states, but unpaid wages can still be sued for as a contract claim.",
      claims: [
        {
          id: "unpaid-wages",
          name: "Unpaid wages or final paycheck",
          example: "Your former employer owes you $1,800 in unpaid wages from your last weeks of work.",
          eligible: true,
          statute: "Wyo. Stat. § 27-4-104",
          notes: "Wyoming requires final wages by next regular payday. No civil waiting-time penalty (it's a misdemeanor for willful nonpayment, but doesn't help your civil case). Sue for the wages plus statutory interest.",
        },
        {
          id: "unpaid-commissions",
          name: "Unpaid commission or bonus",
          example: "You earned a $2,500 sales commission per the written plan and your employer refuses to pay it.",
          eligible: true,
          notes: "Treated as a contract claim. Bring the written commission plan or any documents showing you earned it.",
        },
        {
          id: "unreimbursed-expenses",
          name: "Unreimbursed business expenses",
          example: "You spent $1,200 on approved work travel and your employer never paid you back.",
          eligible: true,
        },
        {
          id: "labor-agency-alternative",
          name: "Wyoming Department of Workforce Services alternative",
          example: "You can file a wage claim with DWS Labor Standards before or instead of suing.",
          eligible: true,
          notes: "DWS is free and may resolve disputes without court. Use small claims if DWS doesn't help or you want a direct judgment to enforce.",
        },
      ],
    },

    {
      id: "personal",
      title: "Personal disputes",
      blurb: "Wyoming has very short deadlines for assault, battery, and defamation (1 year). Property and minor injury cases get the standard 4-year window.",
      claims: [
        {
          id: "minor-injury",
          name: "Minor personal injury (under the cap)",
          example: "A minor dog bite required a $1,200 doctor visit and $500 in lost wages.",
          eligible: true,
          statute: "Wyo. Stat. § 1-3-105(a)(iv)(C)",
          notes: "4-year clock for general injury. ASSAULT/BATTERY claims have a strict 1-year deadline. Medical malpractice is excluded entirely — must go to district court with a review panel.",
        },
        {
          id: "loaned-property",
          name: "Loaned or borrowed property not returned",
          example: "You loaned your $1,500 in tools to a friend who refuses to return them.",
          eligible: true,
          notes: "Small claims awards money or recovery of personal property up to $6,000.",
        },
        {
          id: "engagement-ring",
          name: "Engagement ring or gift after a broken engagement",
          example: "Your ex kept the $3,000 engagement ring after the engagement was called off.",
          eligible: true,
          notes: "Wyoming treats engagement rings as conditional gifts. If the engagement is called off, the ring usually goes back to the giver if the giver wasn't at fault.",
        },
        {
          id: "joint-property-breakup",
          name: "Jointly purchased property after a breakup",
          example: "You and your ex bought a $4,000 boat together. After splitting, your ex kept it.",
          eligible: true,
          notes: "Small claims can award money for your share. It cannot partition real estate.",
        },
        {
          id: "shared-expenses",
          name: "Shared expenses between roommates or ex-partners",
          example: "Your roommate moved out leaving $500 of unpaid utilities you had to cover.",
          eligible: true,
          notes: "Frame it as oral contract or unjust enrichment. Bring texts, payment records, and any agreement evidence.",
        },
      ],
    },

    {
      id: "vehicle",
      title: "Vehicle-specific claims",
      blurb: "Common scenarios involving cars: accidents, repair shop disputes, towing, parking lot damage.",
      claims: [
        {
          id: "uninsured-driver",
          name: "Uninsured driver hit your car",
          example: "Other driver had no insurance. Your collision coverage paid most but you're out $1,500.",
          eligible: true,
          notes: "Sue the at-fault driver directly for whatever isn't covered. Wyoming's comparative negligence rules apply.",
        },
        {
          id: "mechanic-dispute",
          name: "Mechanic or body shop dispute",
          example: "After a $2,500 transmission repair, the transmission failed again from mechanic error. You paid $3,000 to fix it elsewhere.",
          eligible: true,
          notes: "Bring repair invoices, an independent mechanic's evaluation, and any written estimate the original shop exceeded without authorization.",
        },
        {
          id: "wrongful-tow",
          name: "Wrongful towing or impound",
          example: "Your car was towed from a poorly-marked private lot, costing you $300 in tow and storage fees.",
          eligible: true,
          notes: "Wyoming's Title 31 regulates towing but doesn't add special small-claims penalties. Sue for actual losses.",
        },
        {
          id: "parking-lot-damage",
          name: "Parking lot damage by an identified driver",
          example: "Another driver scraped your parked car. They were caught on camera but refuse to pay the $750 repair.",
          eligible: true,
        },
      ],
    },
  ],

  whatYouCannotSueFor: [
    {
      category: "Eviction (forcible entry/detainer)",
      explanation: "Eviction proceedings to recover possession of rental property are a separate action in Circuit Court. Small claims handles only the money owed.",
      whereToGoInstead: "Circuit Court (forcible entry/detainer action)",
    },
    {
      category: "Defamation (libel/slander)",
      explanation: "Wyoming has only a 1-year statute of limitations on defamation, and these claims rarely fit small claims even if filed timely.",
      whereToGoInstead: "Circuit Court or District Court for civil suit",
    },
    {
      category: "Medical malpractice",
      explanation: "Medical malpractice claims must go through a Medical Review Panel before suit (Wyo. Stat. § 9-2-1518) and are not appropriate for small claims due to expert testimony requirements.",
      whereToGoInstead: "District Court after panel review",
    },
    {
      category: "Title to real estate or boundary disputes",
      explanation: "Quiet title, partition, and boundary determinations require equitable jurisdiction not available in small claims.",
      whereToGoInstead: "District Court",
    },
    {
      category: "Injunctions and specific performance",
      explanation: "Small claims can only award MONEY or recovery of personal property. It cannot order someone to do or stop doing something.",
      whereToGoInstead: "District Court for injunctive relief",
    },
    {
      category: "Wrongful death",
      explanation: "Wrongful death claims have a 2-year deadline and typically far exceed the $6,000 cap.",
      whereToGoInstead: "District Court",
    },
    {
      category: "Family law (divorce, custody, support)",
      explanation: "Family matters have their own procedure in District Court.",
      whereToGoInstead: "District Court",
    },
    {
      category: "Probate and estate claims",
      explanation: "Claims against an estate must be filed as creditor claims in probate, not small claims.",
      whereToGoInstead: "District Court probate division",
    },
    {
      category: "Workers' compensation",
      explanation: "Work-injury claims must go through Wyoming Workers' Compensation Division.",
      whereToGoInstead: "Workers' Comp Division",
    },
    {
      category: "Class actions",
      explanation: "Small claims cannot certify class actions.",
      whereToGoInstead: "District Court",
    },
    {
      category: "Tort claims against state or local government",
      explanation:
        "Wyoming Governmental Claims Act requires written notice within 2 years and limits suits typically over $7,500 to district court. Very narrow window for small claims to handle.",
      whereToGoInstead: "Follow Governmental Claims Act process; usually District Court",
    },
    {
      category: "Suing a deceased person",
      explanation: "Claims against a deceased person must go through probate, not small claims.",
      whereToGoInstead: "Probate / District Court",
    },
    {
      category: "Cases subject to mandatory arbitration",
      explanation:
        "If your contract requires arbitration and the defendant raises it, the court must enforce the clause. Common in cell phone, banking, and credit card contracts.",
      whereToGoInstead: "Private arbitration per the contract",
    },
  ],

  damages: {
    compensatory: true,
    punitive: {
      available: false,
      explanation:
        "Wyoming small claims does not award common-law punitive damages. Statutory multipliers (bad checks, deposit forfeiture) are available where the underlying statute provides them.",
    },
    statutoryMultipliers: [
      {
        claim: "Bounced check (after 30-day notice)",
        multiplier: "3x check amount, minimum $100, plus $30 collection fee plus court costs",
        statute: "Wyo. Stat. § 1-1-115",
      },
      {
        claim: "Wrongful security deposit retention",
        multiplier: "Full deposit back + costs (no doubling, but landlord forfeits all damage claims)",
        statute: "Wyo. Stat. § 1-21-1208",
      },
    ],
    attorneyFees: {
      available: false,
      explanation:
        "Wyoming follows the American Rule. Each side pays their own fees unless a contract or statute shifts them. The Consumer Protection Act allows fees only in CLASS ACTIONS, not individual suits. Small claims judgments rarely include attorney fees because most parties are pro se. If the contract has a fee-shift clause, you can ask the judge to apply it.",
    },
    interestRate: {
      rate: 10,
      type: "simple",
      statute: "Wyo. Stat. § 1-16-102",
      notes:
        "Post-judgment interest is 10% per year, simple interest, accruing automatically from the date of entry until paid. Among the highest post-judgment rates in the country.",
    },
    feesRecoverable: true,
  },

  whereToFile: {
    courtName: "Circuit Court (Small Claims division)",
    parentCourt: "Wyoming Circuit Courts",
    venueRules: [
      {
        scenario: "Most cases (since Dec 2021)",
        filingOptions: [
          "The county where the defendant lives or has a business address",
          "The county where the cause of action arose (contract was signed, accident happened, etc.)",
        ],
      },
      {
        scenario: "Multiple defendants",
        filingOptions: ["Any county where ONE of the defendants lives or where the claim arose"],
      },
      {
        scenario: "Out-of-state defendant with Wyoming nexus",
        filingOptions: [
          "Where the cause of action arose in Wyoming",
          "Where the defendant has a Wyoming office or registered agent",
        ],
      },
    ],
    consequencesOfWrongVenue:
      "Wyoming Circuit Courts have NO mechanism to transfer small claims cases between counties. If you file in the wrong county, the case will be dismissed and you'll have to refile (and pay the $10 fee again). Pick the correct venue from the start.",
    eFilingAvailable: "no",
    eFilingNotes:
      "Wyoming does NOT have statewide e-filing for small claims. File in person or by mail at the Circuit Court Clerk's office in the proper county. Some forms reference 'eFile Cover Sheets' but no production e-filing system exists for trial-court small claims as of 2026.",
  },

  fees: {
    tiers: [{ range: "All claims (flat fee)", amount: 10 }],
    frequentFiler: { threshold: 0, fee: 0 },
    serviceFees: [
      { method: "Sheriff (in-county)", amount: "$30 to $50", notes: "Most reliable. Per defendant. Includes mileage in some counties." },
      { method: "Sheriff (other Wyoming county)", amount: "$30 to $50", notes: "Coordinate through your filing court or directly." },
      { method: "Certified mail by court", amount: "$7 to $10", notes: "Only valid if defendant or their agent personally signs. Often fails when defendants refuse or don't claim mail." },
      { method: "Private process server", amount: "$50 to $75", notes: "Available in some counties. Useful if sheriff is unavailable or you need flexibility." },
    ],
    waiver: {
      forms: [
        { number: "Affidavit of Indigency", name: "Affidavit to Proceed In Forma Pauperis" },
      ],
      eligibility: [
        "Income below the federal poverty threshold",
        "Receipt of need-based public assistance",
        "Inability to pay without forgoing necessities",
      ],
      coverageNotes:
        "If granted, the filing fee and service fees can be waived. Given the $10 fee is small, IFP is uncommon but available.",
    },
    otherFees: [
      { name: "Alias summons (re-service after first attempt fails)", amount: "Service fee per attempt", notes: "Each new attempt costs another sheriff or server fee. Filing fee not re-charged." },
      { name: "Abstract of judgment", amount: "$5", notes: "Needed to dock the judgment in District Court for a real estate lien." },
      { name: "Subpoena issuance", amount: "Free or nominal", notes: "Plus $30/day witness fee + mileage at state rate." },
      { name: "Writ of execution (post-judgment)", amount: "Sheriff fee", notes: "Authorizes sheriff to seize and sell non-exempt property." },
    ],
    feesRecoverableNotes:
      "If you win, the judgment includes the filing fee and service costs. Save receipts for sheriff fees and certified mail postage.",
  },

  statuteOfLimitations: {
    entries: [
      {
        id: "written-contract",
        claim: "Written contract",
        years: 10,
        clockStart: "Date of breach",
        statute: "Wyo. Stat. § 1-3-105(a)(i)",
        notes: "Among the longest in the country.",
      },
      {
        id: "oral-contract",
        claim: "Oral contract",
        years: 8,
        clockStart: "Date of breach",
        statute: "Wyo. Stat. § 1-3-105(a)(ii)(A)",
        notes: "Far longer than most states (typically 2-4 years for oral).",
      },
      {
        id: "sale-of-goods",
        claim: "Sale of goods (UCC)",
        years: 4,
        clockStart: "Date of breach (delivery)",
        statute: "Wyo. Stat. § 34.1-2-725",
      },
      {
        id: "promissory-note",
        claim: "Promissory note",
        years: 10,
        clockStart: "Default or due date",
        statute: "Wyo. Stat. § 1-3-105(a)(i)",
      },
      {
        id: "open-account",
        claim: "Open account",
        years: 8,
        clockStart: "Date of last charge or payment",
        statute: "Wyo. Stat. § 1-3-105(a)(ii)(A)",
      },
      {
        id: "personal-injury",
        claim: "Personal injury",
        years: 4,
        clockStart: "Date of injury",
        statute: "Wyo. Stat. § 1-3-105(a)(iv)(C)",
      },
      {
        id: "property-damage",
        claim: "Property damage",
        years: 4,
        clockStart: "Date of damage",
        statute: "Wyo. Stat. § 1-3-105(a)(iv)",
      },
      {
        id: "fraud",
        claim: "Fraud or misrepresentation",
        years: 4,
        clockStart: "When the fraud was discovered or reasonably should have been",
        statute: "Wyo. Stat. § 1-3-105(a)(iv)(D)",
        notes: "Discovery rule applies.",
      },
      {
        id: "defamation",
        claim: "Defamation (libel/slander)",
        years: 1,
        clockStart: "Date of publication",
        statute: "Wyo. Stat. § 1-3-105(a)(v)(A)",
        notes: "Very short — and rarely fits small claims anyway.",
      },
      {
        id: "assault-battery",
        claim: "Assault or battery (civil)",
        years: 1,
        clockStart: "Date of the act",
        statute: "Wyo. Stat. § 1-3-105(a)(v)(B)",
        notes: "Short clock. Act fast.",
      },
      {
        id: "judgment",
        claim: "Enforcing an existing judgment",
        years: 5,
        clockStart: "Date of entry",
        statute: "Wyo. Stat. § 1-17-307",
        notes: "Becomes 'dormant' after 5 years; revivable for up to 10 years past dormancy under § 1-16-503.",
      },
    ],
    discoveryRuleNotes:
      "Wyoming applies the discovery rule for fraud (built into § 1-3-105(a)(iv)(D)) and certain hidden injury or malpractice cases. For ordinary contract or property damage, the clock starts when the breach or damage happened.",
    tollingNotes:
      "Tolled for minors until age 18 (then standard period runs from majority). Tolled for legal incapacity. Defendant absence from Wyoming may toll the clock if they cannot be reached by long-arm. Partial payment or written acknowledgment of a debt restarts the contract clock.",
  },

  preFiling: {
    demandLetterRequired: true,
    demandLetterRecommended: true,
    demandLetterNotes:
      "Wyoming's small claims statute REQUIRES that you have made a demand for payment and been refused before filing. Wyo. Stat. § 1-21-202(a) — you swear in the affidavit that 'demand has been made and payment refused.' A written demand letter is highly recommended (certified mail keeps proof). For bad checks, a 30-day written demand by certified mail is mandatory under § 1-1-115 to recover the triple-damages penalty.",
    governmentClaimRequired: true,
    governmentClaimNotes:
      "Tort claims against Wyoming state, city, or county entities require written notice under the Wyoming Governmental Claims Act within 2 years of the incident. Then if denied, you have 1 year to sue. Most government tort claims must be in District Court regardless. Without proper notice, your case is barred.",
    landlordTenantNotes:
      "Tenants suing for security deposits don't need a separate demand. The landlord's duty is automatic: 30 days to refund or itemize (60 if damage requires repairs). Document any communication about move-out and forwarding address.",
    consumerProtectionNotes:
      "Consumer Protection Act claims require giving the business a chance to cure the deceptive practice (typically by demand letter) before suing. Wyo. Stat. § 40-12-105 references 'uncured' deceptive practices.",
    arbitrationClauseNotes:
      "Wyoming enforces valid arbitration clauses. Many cell phone, bank, gym, and credit card contracts mandate arbitration. If the defendant raises it, the court must dismiss or stay the case. Read your contract.",
  },

  forms: [
    {
      number: "SC-01",
      name: "Small Claims Affidavit",
      description: "The main complaint form. Sworn statement of who you're suing, how much, why, and that you made a demand for payment. Sign before the clerk or notary.",
      whoFiles: "plaintiff",
      required: true,
      group: "starting",
    },
    {
      number: "SC-01a",
      name: "Instructions for Small Claims Affidavit",
      description: "Step-by-step instructions for filling out SC-01. Not filed.",
      whoFiles: "plaintiff",
      required: false,
      group: "starting",
    },
    {
      number: "SC-02",
      name: "Small Claims Summons",
      description: "Issued by the clerk after you file the affidavit. Tells the defendant to appear at the hearing date. The clerk fills in the date.",
      whoFiles: "court",
      required: true,
      group: "service",
    },
    {
      number: "SC-03",
      name: "Return of Service",
      description: "Filed by whoever served the papers (sheriff, process server, or other adult). Proves the defendant was served within the 3-to-12-day window.",
      whoFiles: "either",
      required: true,
      group: "service",
    },
    {
      number: "SC-04",
      name: "Affidavit of Service",
      description: "Alternative proof-of-service form for non-officer servers (any adult who is not a party can serve). Must be notarized.",
      whoFiles: "either",
      required: false,
      group: "service",
    },
    {
      number: "SC-06",
      name: "Judgment and Order",
      description: "The judgment form the judge signs after hearing or default. May be prepared by the prevailing party for the judge's signature.",
      whoFiles: "court",
      required: false,
      group: "after-judgment",
    },
    {
      number: "SC-07",
      name: "Understanding a Judgment and Order",
      description: "Information sheet given to the losing party explaining what a judgment means and how to pay or appeal.",
      whoFiles: "court",
      required: false,
      group: "after-judgment",
    },
    {
      number: "Affidavit of Indigency",
      name: "Affidavit to Proceed Without Fees (IFP)",
      description: "Filed in lieu of paying the $10 fee. Lists income, assets, and hardship.",
      whoFiles: "either",
      required: false,
      group: "fee-waiver",
    },
    {
      number: "Counterclaim Affidavit",
      name: "Defendant's Counterclaim",
      description: "If you have a claim back against the plaintiff. Use the same SC-01 affidavit form with roles reversed. Same $6,000 cap applies.",
      whoFiles: "defendant",
      required: false,
      group: "counterclaim",
    },
    {
      number: "Notice of Appeal",
      name: "Notice of Appeal to District Court",
      description: "Filed within 30 days of the judgment with the Circuit Court that issued it. Appeal is on questions of law only — NOT a new trial.",
      whoFiles: "either",
      required: false,
      group: "appeal",
    },
    {
      number: "Abstract of Judgment",
      name: "Abstract of Judgment",
      description: "Certified copy from Circuit Court ($5) used to dock the judgment with District Court and County Clerk for a real estate lien.",
      whoFiles: "plaintiff",
      required: false,
      group: "after-judgment",
    },
    {
      number: "Garnishment forms (continuing or non-continuing)",
      name: "Writ of Garnishment forms",
      description: "Eight-form packet for wage garnishment (continuing, 90-day stretches) or bank garnishment (non-continuing, one-time grab). Includes Request, Writ, Order for Service, Notice of Right to Hearing/Exemption, Garnishee Answer, Privacy notices.",
      whoFiles: "plaintiff",
      required: false,
      group: "after-judgment",
    },
    {
      number: "Writ of Execution",
      name: "Writ of Execution",
      description: "Authorizes the sheriff to seize and auction the loser's non-exempt personal or real property.",
      whoFiles: "plaintiff",
      required: false,
      group: "after-judgment",
    },
    {
      number: "Satisfaction of Judgment",
      name: "Satisfaction of Judgment",
      description: "Filed by the creditor once the judgment is paid in full. Clears the record and any liens.",
      whoFiles: "plaintiff",
      required: false,
      group: "after-judgment",
    },
  ],

  service: {
    whoCanServe: [
      "Wyoming sheriff or deputy",
      "Court clerk by certified mail (if defendant resides in Wyoming)",
      "A private process server",
      "Any adult who is NOT a party (with affidavit of service)",
    ],
    methods: [
      {
        name: "Sheriff personal service",
        description: "Most common and reliable. Sheriff hands the papers to the defendant in person.",
        pros: ["Highest success rate", "Solid proof of service"],
        cons: ["$30 to $50 per defendant"],
      },
      {
        name: "Certified mail by clerk",
        description: "If the defendant has a Wyoming address, the clerk may mail the summons by certified mail with return receipt. Counts as valid service only if defendant or agent personally signs.",
        pros: ["Cheap ($7 to $10)", "Court handles it for you"],
        cons: ["Often fails when defendants refuse or never claim", "Not available for out-of-state addresses"],
      },
      {
        name: "Private process server",
        description: "Hire a private adult server. Must complete a notarized affidavit of service.",
      },
      {
        name: "Any disinterested adult",
        description: "An adult who is not a party can serve. Must complete a notarized affidavit of service detailing time, place, and method.",
      },
    ],
    timing: { inCountyDays: 12, outOfCountyDays: 12 },
    proofFilingDeadlineDays: 3,
    proofForm: { number: "SC-03 or SC-04", name: "Return of Service / Affidavit of Service" },
    businessServiceRules:
      "For corporations or LLCs, serve the registered agent listed with the Wyoming Secretary of State. For partnerships, serve any general partner. For a business at its location, serve an officer or managing agent.",
    outOfStateNotes:
      "Wyoming long-arm jurisdiction allows out-of-state service if the dispute has Wyoming connections. You'll need a process server in the defendant's state. Certified mail to out-of-state addresses is risky — Wyoming's mail-service statute specifies in-state addresses. Coordinate with the clerk.",
    cantFindDefendant:
      "If you can't locate the defendant, options are limited. Service by publication is theoretically allowed but rarely worth it for small claims (and would likely require continuance). Consider hiring a skip-trace or holding off until you have an address.",
    avoidingService:
      "If a defendant refuses to take the papers, the sheriff can leave them in the defendant's presence after identifying themselves — that counts as valid service.",
  },

  response: {
    defendantMustFileAnswer: false,
    responseNotes:
      "Wyoming's Small Claims Rule 5 explicitly states 'No answer nor responsive pleading shall be required.' The defendant simply shows up at the hearing date on the summons. They MAY file a counterclaim or written statement, but they don't have to. The hearing IS the deadline.",
    defaultProcess:
      "If the defendant doesn't appear at the hearing and was properly served (within the 3-to-12-day window), the judge will likely enter a default judgment for the plaintiff. The judge will verify service, may ask the plaintiff to briefly state the case, and will require the plaintiff to attest the defendant is not on active military duty (under the federal Servicemembers Civil Relief Act) before signing the default.",
    proveUpRequired: true,
    proveUpNotes:
      "Even on default, bring evidence supporting the amount (especially if not a sum-certain like a written contract). The judge may ask for proof of damages. Show up empty-handed and the judge can award less or dismiss.",
    motionToVacateForm: { number: "Motion to Set Aside Default", name: "Motion to Vacate Default Judgment" },
    motionToVacateDeadlineDays: 30,
    motionToVacateLackOfNoticeDays: 60,
    motionToVacateAppealDeadlineDays: 30,
    motionToVacateAppealNotes:
      "Wyoming small claims appeals are NOT new trials — they're on questions of law only. Defaulting defendants generally cannot appeal at all (since they presented no facts). Their remedy is a Motion to Set Aside Default in Circuit Court under W.R.C.P. 55(c) and 60(b), showing excusable neglect or lack of proper service plus a meritorious defense.",
  },

  counterclaim: {
    allowed: true,
    form: { number: "SC-01 (counterclaim)", name: "Defendant's Counterclaim Affidavit" },
    sameMonetaryLimit: true,
    serviceDeadlineSameCountyDays: 0,
    serviceDeadlineOutOfCountyDays: 0,
    transferToHigherCourt: {
      available: false,
      notes:
        "Wyoming small claims doesn't have a clean transfer mechanism for over-cap counterclaims. If your counterclaim exceeds $6,000, your options are: waive the excess and stay in small claims, or file a separate action in Circuit Court (regular civil docket, up to $50,000) for the larger amount.",
    },
  },

  hearing: {
    attorneysAllowed: true,
    attorneysAllowedNotes:
      "Wyoming explicitly allows attorneys in small claims. If one side has counsel and the other doesn't, the unrepresented side is entitled to a continuance to find their own attorney. Most parties go without lawyers given the modest amounts at stake.",
    format:
      "Bench trial in Circuit Court. Each case typically gets 10 to 20 minutes. The judge is fact-finder. Strict rules of evidence do NOT apply — Rule 6 says 'Strict rules of evidence shall not apply in trials of small claims actions.'",
    presider: "Circuit Court judge or magistrate",
    burdenOfProof:
      "Preponderance of the evidence. The plaintiff has to convince the judge their version is more likely than not (over 50%) more credible than the defendant's.",
    whatToBring: [
      "Your filed Small Claims Affidavit with the court stamp",
      "2 to 3 copies of every document (judge, opposing party, you)",
      "Original contracts, invoices, receipts",
      "Photos in COLOR PRINT (not on phone — courtrooms vary on tech)",
      "Text messages and emails (printed and highlighted)",
      "Bank statements, cancelled checks, payment proof",
      "Repair estimates from independent professionals",
      "A short timeline of what happened",
      "Witnesses (or written statements if they can't attend)",
      "Demand letter and any pre-suit notices (especially bad-check certified mail receipts)",
    ],
    witnessSubpoenaForm: { number: "Subpoena", name: "Witness Subpoena", feePerDay: 30 },
    interpretersFree: true,
    interpreterNotes:
      "Wyoming courts provide free interpreters in civil cases when arranged in advance. Notify the clerk as soon as you know one is needed.",
    juryAllowed: false,
    decisionTiming:
      "Judges often rule on the spot. Sometimes they take it under advisement and mail the decision within a week or two.",
    mediationOnHearingDay: {
      offered: false,
      notes:
        "No statewide mediation requirement. Some counties have voluntary mediators; Equal Justice Wyoming has promoted mediation in some courts. The judge may suggest hallway negotiation if parties seem close to settling.",
    },
  },

  appeals: {
    whoCanAppeal:
      "Either party can appeal a small claims judgment. Defaulting defendants generally cannot appeal (they presented no facts) — they must move to set aside the default in Circuit Court first.",
    deadlineDays: 30,
    fee: 70,
    type: "on the record",
    typeNotes:
      "CRITICAL: Wyoming small claims appeals to District Court are NOT new trials. Per Small Claims Rule 7, they 'shall be processed pursuant to W.R.A.P. and only on questions of law and not for a review of the sufficiency of evidence.' District Court reviews for legal errors, doesn't re-hear the facts. No new evidence on appeal. This is unusual — most states give de novo appeals.",
    attorneysAllowedOnAppeal: true,
    bondRequired: true,
    automaticStayOnFiling: false,
    notice: { form: "Notice of Appeal", name: "Notice of Appeal" },
    defaultJudgmentNotAppealable: true,
    defaultJudgmentNotes:
      "Defaulting defendants cannot appeal because there's no factual record to review on legal grounds. Their remedy is Motion to Set Aside Default under W.R.C.P. 55(c) and 60(b), showing excusable neglect or improper service plus a meritorious defense.",
  },

  collection: {
    paymentDeadline: "30 days from judgment is typical practice, though not statutorily required",
    interestRate: 10,
    interestRateNotes:
      "Post-judgment interest at 10% per year, simple interest, accrues automatically from the date of entry. Wyo. Stat. § 1-16-102.",
    methods: [
      {
        id: "voluntary-payment",
        name: "Demand letter for payment",
        blurb: "Send a polite demand. Often works.",
        description:
          "After the 30-day appeal window passes, send the loser a written demand including the case number, judgment amount, accrued 10% interest, and your preferred payment method. Many debtors pay once they realize garnishment and liens are next.",
      },
      {
        id: "real-estate-lien",
        name: "Lien on real estate (Abstract of Judgment)",
        blurb: "Cheap, passive, very effective long-term.",
        description:
          "Get an Abstract of Judgment from Circuit Court ($5), file it with District Court in the same county, AND record it with the County Clerk. That creates a lien on any non-exempt real estate the debtor owns in that county. Repeat in any county where they own property. Lien follows the property — when sold or refinanced, you get paid.",
        forms: [{ number: "Abstract of Judgment", name: "Abstract of Judgment" }],
        estimatedCost: "$5 abstract + small recording fee per county",
        effectivenessNotes:
          "Wyoming's $100,000 homestead exemption ($200K joint) protects most primary residences from forced sale. But the lien still sits and gets paid when property changes hands.",
      },
      {
        id: "wage-garnishment",
        name: "Continuing wage garnishment",
        blurb: "Take 25% of every paycheck for 90 days at a time.",
        description:
          "File a Request for Writ of Continuing Garnishment to the debtor's employer. Wyoming follows federal limits: up to 25% of disposable earnings, or the amount above 30x federal minimum wage, whichever is less. Each writ runs for 90 days; refile to continue. Only one wage garnishment runs at a time.",
        forms: [{ number: "Garnishment Forms (Continuing) 01-08", name: "Continuing Garnishment Packet" }],
        estimatedCost: "Filing + sheriff service fee",
        effectivenessNotes:
          "Best method for steadily-employed debtors. Slow but reliable. Social Security, VA benefits, unemployment, and workers' comp are exempt.",
        exemptions: [
          "75% of disposable earnings",
          "Or earnings up to 30× federal minimum wage per week — whichever leaves the debtor more",
          "Federal benefits (Social Security, SSI, VA, unemployment, workers' comp)",
          "Most retirement accounts",
        ],
      },
      {
        id: "bank-garnishment",
        name: "Non-continuing bank garnishment",
        blurb: "One-time freeze on whatever's in the account that day.",
        description:
          "File a Request for Writ of Non-Continuing Garnishment to the debtor's bank. Bank freezes the non-exempt amount on deposit at the moment of service and answers within a set period. Federal benefits direct-deposited within 60 days are auto-protected.",
        forms: [{ number: "Garnishment Forms (Non-Continuing) 01-08", name: "Non-Continuing Garnishment Packet" }],
      },
      {
        id: "writ-execution",
        name: "Writ of Execution (seize property)",
        blurb: "Sheriff seizes and auctions non-exempt property.",
        description:
          "Apply for a Writ of Execution; sheriff levies non-exempt personal property (vehicle equity beyond $2,400 exemption, business equipment beyond $2,000, second cars, boats). Sheriff arranges public sale; proceeds go to your judgment. Less common for small claims because exemptions cover most everyday property of typical debtors.",
        forms: [{ number: "Writ of Execution", name: "Writ of Execution" }],
      },
      {
        id: "debtor-exam",
        name: "Judgment debtor examination",
        blurb: "Force the debtor to disclose their assets under oath.",
        description:
          "Apply for an Order for Examination of Judgment Debtor. Court issues an order compelling the debtor to appear and answer questions about employer, bank accounts, real and personal property under oath. Failure to appear = contempt. Useful when you don't know where to garnish.",
        effectivenessNotes:
          "Often the FIRST step if the debtor is uncooperative. Once you know employment and bank info, garnish accordingly.",
      },
      {
        id: "renew-judgment",
        name: "Revive a dormant judgment",
        blurb: "Keep the judgment alive past 5 years.",
        description:
          "Wyoming judgments become 'dormant' after 5 years if no execution. File a motion to revive within 10 years of dormancy under § 1-16-503 to extend enforceability. Each revival reopens the 5-year window.",
      },
    ],
    judgmentLifespanYears: 5,
    renewalProcess:
      "Wyoming judgments become dormant after 5 years if not actively enforced (Wyo. Stat. § 1-17-307). File a motion or new action to revive within 10 years of dormancy under § 1-16-503. Renewable indefinitely with proper procedure. After revival, lien re-attaches when re-recorded.",
    debtorExamForm: { number: "Order for Debtor Exam", name: "Order in Aid of Execution" },
    exemptions: [
      "Homestead up to $100,000 ($200,000 if jointly owned)",
      "One vehicle equity up to $2,400",
      "Tools of trade up to $2,000",
      "Necessary clothing and reasonable household furniture",
      "75% of wages or amount above 30x federal minimum wage (whichever leaves more)",
      "Federal benefits: Social Security, SSI, VA, unemployment, workers' comp",
      "Most retirement accounts",
    ],
    bankruptcyNotes:
      "If the loser files bankruptcy, an automatic stay halts all collection. Most small-claims judgments get discharged in Chapter 7 unless the debt was for fraud, willful injury, or another carve-out. If you suspect fraud, file a non-dischargeability complaint within 60 days of the creditors' meeting.",
    satisfactionForm: { number: "Satisfaction of Judgment", name: "Satisfaction of Judgment" },
    priorityNotes:
      "Real estate liens prioritize by recording date. Only one wage garnishment runs at a time at the 25% cap; others queue. Bank garnishments are first-served on the funds in the account at moment of service. Child support garnishments take priority over civil judgments. Federal tax liens can supersede.",
  },

  businesses: {
    representation:
      "Wyoming explicitly lets corporations, partnerships, LLCs, and other entities appear in small claims through an authorized officer or employee — no attorney required (Wyo. Stat. § 1-21-202(b)). On appeal to District Court, business entities typically need an attorney for the formal appellate procedure.",
    canSendEmployee: true,
    canSendAttorney: true,
    insuranceAdjusterAllowed: false,
    fictitiousNameNotes:
      "Wyoming doesn't centrally license most fictitious-name (DBA) filings, but corporations and LLCs must register with the Wyoming Secretary of State. When suing a DBA, name the actual legal entity behind it. 'Joe's Plumbing' alone is not a legal party; sue 'Joe Smith d/b/a Joe's Plumbing.'",
    soleProprietorEmployeeException:
      "A sole proprietor running a business in their own name appears personally. Their employees can also appear on behalf of the business in small claims under § 1-21-202(b).",
    outOfStateNotes:
      "Out-of-state corporations or LLCs that 'transact business' in Wyoming must register with the Secretary of State (Wyo. Stat. § 17-16-1502) before they can maintain a lawsuit. For one-off transactions, this is rarely enforced; for ongoing Wyoming operations, register first.",
    licensingNotes:
      "Wyoming doesn't license most general contractors statewide, though specific trades (electrician, plumber) are regulated. Some local jurisdictions impose licensing.",
  },

  countyDifferences: [
    {
      county: "Laramie (Cheyenne)",
      differences: [
        { topic: "Location", detail: "Circuit Court at the Laramie County Courthouse." },
        { topic: "Volume", detail: "Highest population — expect more cases per docket and longer waits than rural counties." },
      ],
    },
    {
      county: "Natrona (Casper)",
      differences: [
        { topic: "Location", detail: "Natrona County Courthouse." },
        { topic: "Volume", detail: "Second-largest population. Active small claims docket." },
      ],
    },
    {
      county: "Albany (Laramie city)",
      differences: [
        { topic: "Location", detail: "Albany County Courthouse." },
        { topic: "University town", detail: "Many tenant-landlord disputes; clerks familiar with deposit cases." },
      ],
    },
    {
      county: "Sweetwater (Rock Springs)",
      differences: [
        { topic: "Location", detail: "Sweetwater County Courthouse." },
      ],
    },
    {
      county: "Teton (Jackson)",
      differences: [
        { topic: "Location", detail: "Teton County Courthouse, Jackson." },
        { topic: "Tourist economy", detail: "Many short-term rental and lodging disputes." },
        { topic: "High costs", detail: "Service fees may run a bit higher due to area cost of living." },
      ],
    },
    {
      county: "Campbell (Gillette)",
      differences: [
        { topic: "Location", detail: "Campbell County Courthouse, Gillette." },
      ],
    },
    {
      county: "Smaller rural counties (Cook, Crook, Niobrara, Hot Springs, etc.)",
      differences: [
        { topic: "Schedule", detail: "Small claims may only be heard one or two days per month when a circuit judge is in town." },
        { topic: "Wait times", detail: "Hearing dates may be further out due to infrequent court sessions." },
      ],
    },
  ],

  pitfalls: [
    {
      title: "Missing the 3-to-12-day service window",
      whatHappens:
        "You serve the defendant 15 days before the hearing (too early) or 2 days before (too late). The hearing cannot proceed and you have to get an alias summons with a new date — and pay the service fee again.",
      howToAvoid:
        "Coordinate with the sheriff or process server so service happens 3 to 12 days before the hearing date. If using sheriff, hand them the papers with a note about the window. If using certified mail, time it carefully.",
    },
    {
      title: "Not making a pre-suit demand",
      whatHappens:
        "You file the affidavit but never demanded payment. The affidavit's sworn statement is technically false. The case may be dismissed, or worse, you've signed something inaccurate under oath.",
      howToAvoid:
        "Send a written demand letter (certified mail leaves proof) before filing. Give a reasonable deadline (10 to 30 days). Then file. For bad checks, the 30-day certified-mail demand under § 1-1-115 is mandatory for triple damages.",
    },
    {
      title: "Suing the wrong defendant",
      whatHappens:
        "You sue 'Joe's Garage' but the legal entity is 'Joe Smith d/b/a Joe's Garage' or 'JG LLC.' Your judgment may be unenforceable.",
      howToAvoid:
        "Look up the business at the Wyoming Secretary of State Business Search. Use the exact registered name. If unsure, name multiple potential parties.",
    },
    {
      title: "Filing in the wrong county",
      whatHappens:
        "Wyoming small claims courts cannot transfer cases between counties. If venue is wrong, the case is dismissed and you have to refile (and pay the $10 again).",
      howToAvoid:
        "File where the defendant lives OR where the cause of action arose. Multiple defendants? Any county where one resides works.",
    },
    {
      title: "Missing the statute of limitations",
      whatHappens:
        "You file an assault-battery claim 14 months after the incident. Wyoming has a 1-year limit. Defendant raises it. Case dismissed.",
      howToAvoid:
        "Defamation and assault/battery: 1 year. Property and injury: 4 years. Oral contracts: 8 years. Written contracts: 10 years. UCC sale of goods: 4 years. File well before any deadline.",
    },
    {
      title: "Asking for the wrong remedy",
      whatHappens:
        "You ask the court to make someone fix something or stop harassing you. Small claims can ONLY award money or recover personal property up to $6,000.",
      howToAvoid:
        "Convert what you want into a dollar amount. 'Make them finish the job' becomes '$X to hire someone else to finish.' Injunctions go to District Court.",
    },
    {
      title: "Defaulting and trying to appeal",
      whatHappens:
        "Defendant misses the hearing. Default judgment entered. They try to appeal — but Wyoming appeals are on questions of law only, with no factual record to review for a defaulter.",
      howToAvoid:
        "If you defaulted, file a Motion to Set Aside Default under W.R.C.P. 55(c) and 60(b) showing excusable neglect, lack of service, or a meritorious defense. Don't try to appeal a default.",
    },
    {
      title: "Letting the judgment go dormant",
      whatHappens:
        "You won in 2020, didn't collect, didn't revive. By 2025 the judgment is dormant. After 10 more years it's permanently dead.",
      howToAvoid:
        "Before the 5-year mark, file a motion to revive. Renewable indefinitely. Each revival re-opens the 5-year window for execution.",
    },
    {
      title: "Winning against a judgment-proof debtor",
      whatHappens:
        "You win, but the debtor's only income is Social Security or they have only exempt property. You collect nothing.",
      howToAvoid:
        "Before suing, gauge whether the debtor has reachable assets (job, bank accounts, real estate beyond homestead, vehicles beyond $2,400 exemption). Demand a debtor exam after judgment to find out.",
    },
    {
      title: "Forgetting Wyoming's bad-check certified-mail step",
      whatHappens:
        "You sue for treble damages on a bounced check without sending the 30-day certified-mail demand. Court awards only the check amount, not the triple penalty.",
      howToAvoid:
        "Wyo. Stat. § 1-1-115 requires the certified written demand 30 days before suing. Use the statutory language: $30 fee within 30 days or face triple damages. Save the certified mail receipt.",
    },
    {
      title: "Ignoring the arbitration clause",
      whatHappens:
        "You sue your cell carrier or bank in small claims. The defendant moves to compel arbitration. The court must enforce.",
      howToAvoid:
        "Read the contract. If there's an arbitration clause without a small-claims carve-out, you may need to arbitrate.",
    },
  ],

  recentChanges: [
    {
      date: "2021-12-01",
      title: "Venue rules expanded",
      description:
        "Small Claims Rule 4 amended effective December 1, 2021. Plaintiffs can now file in the county where the defendant has an address OR where the cause of action arose, not just the defendant's residence county.",
    },
    {
      date: "2023-07-01",
      title: "Witness fees increased",
      description:
        "Wyoming statute updated witness fees from the longstanding $10/day to $30/day for lay witnesses, with mileage at the state rate. Affects subpoenas in small claims and other civil cases.",
    },
    {
      date: "2024-01-01",
      title: "Federal minimum-wage garnishment formula updates",
      description:
        "Wyoming's wage garnishment exemption ties to 30 times federal minimum wage. With pending federal min-wage discussions, watch for changes that affect what the debtor keeps each week.",
    },
    {
      date: "2025-07-01",
      title: "Court self-help forms migrated to interactive form-filling",
      description:
        "Wyoming Judicial Branch rolled out a guided online interview ('Wyoming Interactive Court Forms') that walks self-represented litigants through SC-01 and SC-02. Easier than pen-and-paper for many filers.",
    },
  ],

  faqs: [
    {
      question: "Do I need a lawyer for small claims in Wyoming?",
      answer:
        "No. Wyoming explicitly allows but doesn't require lawyers in small claims. If only one side has counsel, the other side gets a continuance to find their own attorney. Most parties go without lawyers given the modest amounts at stake.",
    },
    {
      question: "How long does Wyoming small claims take from filing to hearing?",
      answer:
        "Typically 3 to 6 weeks. The clerk schedules the hearing about a month out, and service must happen 3 to 12 days before that date. Smaller rural counties may have longer waits because court is held only certain days. Judges often rule on the spot.",
    },
    {
      question: "What's the maximum I can sue for in Wyoming small claims?",
      answer:
        "$6,000 (excluding court costs). Same cap for individuals and businesses. If your claim is bigger, sue for $6,000 and waive the rest, or file as a regular civil case in Circuit Court (which can hear up to $50,000).",
    },
    {
      question: "Why is Wyoming's filing fee only $10?",
      answer:
        "Wyoming intentionally keeps the small-claims filing fee very low ($10 flat, set by court rule) to maintain access. Compare to most states' $30 to $90 fees. Service fees are separate (~$30 to $50 for sheriff per defendant).",
    },
    {
      question: "What happens if the defendant doesn't show up?",
      answer:
        "If service was proper (within the 3-to-12-day window) and the defendant doesn't appear, the judge will likely enter default judgment. The judge will also require you to attest that the defendant is not on active military duty (under the federal Servicemembers Civil Relief Act).",
    },
    {
      question: "Can I appeal if I lose?",
      answer:
        "Yes, but Wyoming appeals are NOT new trials. Either party can appeal to District Court within 30 days, but Small Claims Rule 7 limits appeals to questions of law only — NOT a review of the evidence or who was more believable. New evidence isn't allowed. This is unusual; most states give de novo appeals.",
    },
    {
      question: "Can I garnish wages in Wyoming?",
      answer:
        "Yes. Wyoming follows federal limits: up to 25% of disposable earnings, or the amount above 30x federal minimum wage, whichever leaves the debtor more. Continuing garnishments run for 90 days at a time; refile to continue. Only one wage garnishment runs at a time.",
    },
    {
      question: "How long is a Wyoming small claims judgment good for?",
      answer:
        "5 years before becoming 'dormant.' You can revive it within 10 years of dormancy by motion. Renewable indefinitely with proper revival, so judgments can effectively last 15+ years if you stay on top of renewals.",
    },
  ],

  sources: [
    {
      label: "Wyo. Stat. § 1-21-201 (Small claims jurisdiction)",
      url: "https://law.justia.com/codes/wyoming/title-1/chapter-21/article-2/section-1-21-201/",
      citation: "Wyo. Stat. § 1-21-201",
    },
    {
      label: "Wyo. Stat. § 1-21-202 (Small claims procedure / attorney rule)",
      url: "https://law.justia.com/codes/wyoming/title-1/chapter-21/article-2/section-1-21-202/",
      citation: "Wyo. Stat. § 1-21-202",
    },
    {
      label: "Wyo. Stat. § 1-21-203 (Service of process)",
      url: "https://law.justia.com/codes/wyoming/2023/title-1/chapter-21/article-2/section-1-21-203/",
      citation: "Wyo. Stat. § 1-21-203",
    },
    {
      label: "Wyo. Stat. § 1-3-105 (Statutes of limitations)",
      url: "https://law.justia.com/codes/wyoming/title-1/chapter-3/section-1-3-105/",
      citation: "Wyo. Stat. § 1-3-105",
    },
    {
      label: "Wyo. Stat. § 1-1-115 (Bad check civil remedy)",
      url: "https://law.justia.com/codes/wyoming/title-1/chapter-1/section-1-1-115/",
      citation: "Wyo. Stat. § 1-1-115",
    },
    {
      label: "Wyo. Stat. § 1-21-1208 (Security deposit return)",
      url: "https://www.wyoleg.gov/NXT/gateway.dll/Statutes/2021%20Titles/2/54/66",
      citation: "Wyo. Stat. § 1-21-1208",
    },
    {
      label: "Wyo. Stat. § 1-16-102 (Post-judgment interest)",
      url: "https://law.justia.com/codes/wyoming/title-1/chapter-16/article-1/section-1-16-102/",
      citation: "Wyo. Stat. § 1-16-102",
    },
    {
      label: "Wyo. Stat. § 1-17-307 (Judgment dormancy)",
      url: "https://law.justia.com/codes/wyoming/2022/title-1/chapter-17/article-3/section-1-17-307/",
      citation: "Wyo. Stat. § 1-17-307",
    },
    {
      label: "Wyo. Stat. § 1-20-106 (Personal property exemptions)",
      url: "https://law.justia.com/codes/wyoming/2012/title1/chapter20/section1-20-106/",
      citation: "Wyo. Stat. § 1-20-106",
    },
    {
      label: "Wyo. Stat. § 40-12-101 et seq. (Consumer Protection Act)",
      url: "https://law.justia.com/codes/wyoming/title-40/chapter-12/article-1/section-40-12-105/",
      citation: "Wyo. Stat. § 40-12-101 et seq.",
    },
    {
      label: "Wyoming Judicial Branch — Small Claims help page",
      url: "https://www.wyocourts.gov/legal-help-by-topic/small-claims/",
    },
    {
      label: "Wyoming Judicial Branch — Self-Help Forms (Small Claims SC-01 etc.)",
      url: "https://www.wyocourts.gov/self-help-forms/",
    },
    {
      label: "Wyoming Judicial Branch — Enforcing a Money Judgment",
      url: "https://www.wyocourts.gov/legal-help-by-topic/enforcing-a-money-judgment/",
    },
    {
      label: "Wyoming Rules and Forms Governing Small Claims Cases",
      url: "https://www.wyocourts.gov/CourtRules/Small-Claims/",
    },
    {
      label: "Wyoming Secretary of State Business Search",
      url: "https://wyobiz.wyo.gov/Business/FilingSearch.aspx",
    },
    {
      label: "Wyoming Department of Workforce Services — Wage claims",
      url: "https://dws.wyo.gov/dws-division/labor-standards/",
    },
  ],
};

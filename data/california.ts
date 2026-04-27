import type { StateGuide } from "../lib/types/state-guide";

export const data: StateGuide = {
  state: "California",
  slug: "california",
  abbr: "CA",
  lastUpdated: "2026-04-27",

  hero: {
    individualLimit: 12500,
    businessLimit: 6250,
    typicalTimelineDays: { min: 30, max: 75 },
    filingFeeLow: 30,
    filingFeeHigh: 75,
    tagline: "Get back what you're owed in California small claims court without hiring a lawyer.",
  },

  ataGlance: [
    { label: "Most you can sue for", value: "$12,500", detail: "$6,250 if you're a business" },
    { label: "Filing fee", value: "$30 to $75", detail: "Based on claim amount" },
    { label: "Court", value: "Superior Court (Small Claims)", detail: "One in every county" },
    { label: "Lawyers at trial", value: "Not allowed", detail: "You speak for yourself" },
    { label: "Typical timeline", value: "30 to 75 days", detail: "From filing to hearing" },
    { label: "Appeals", value: "Only the loser-defendant can appeal", detail: "Within 30 days" },
  ],

  limits: {
    individual: 12500,
    business: 6250,
    guarantorWithFee: 8125,
    guarantorWithoutFee: 3125,
    annualCap: { count: 2, threshold: 2500 },
    splitClaimsAllowed: false,
    splitClaimsExplanation:
      "You cannot break one big debt into two smaller lawsuits to fit under the cap. If someone owes you $20,000 on one contract, you have two options: sue for $12,500 and waive the rest, or file in regular civil court. California courts will dismiss split claims as an abuse of the system.",
    statute: "Cal. Code Civ. Proc. § 116.221",
  },

  whatYouCanSueFor: [
    {
      id: "contracts",
      title: "Contracts and money owed",
      blurb: "Anytime someone agreed to pay you and didn't, this is usually the right category.",
      claims: [
        {
          id: "written-contract",
          name: "Breach of a written contract",
          example: "A contractor signed a $5,000 agreement to remodel your kitchen, took the deposit, and never showed up.",
          eligible: true,
          statute: "Cal. Code Civ. Proc. § 337(1)",
          notes: "You have 4 years from the date the contract was broken.",
        },
        {
          id: "oral-contract",
          name: "Breach of an oral or handshake agreement",
          example: "Your neighbor agreed verbally to pay you $1,200 for moving help, then ghosted you.",
          eligible: true,
          statute: "Cal. Code Civ. Proc. § 339(1)",
          notes: "You only have 2 years for oral contracts. The clock starts the day they break the deal.",
        },
        {
          id: "personal-loan",
          name: "Unpaid personal loan",
          example: "You loaned a friend $3,000 with a text confirming it was a loan, and they stopped responding.",
          eligible: true,
          notes: "Texts and emails can prove the loan exists. Bring screenshots.",
        },
        {
          id: "promissory-note",
          name: "Unpaid promissory note",
          example: "You sold a used car and the buyer signed an IOU for $4,500. They paid $500 and disappeared.",
          eligible: true,
          statute: "Cal. Code Civ. Proc. § 337(1)",
        },
        {
          id: "unpaid-invoice",
          name: "Unpaid commercial invoice",
          example: "You're a freelance designer, you sent a $2,400 invoice 90 days ago, and the client keeps stalling.",
          eligible: true,
        },
        {
          id: "unpaid-rent",
          name: "Unpaid rent (money only, not eviction)",
          example: "Your former tenant moved out owing $4,000 in rent.",
          eligible: true,
          notes: "Use small claims for the money. To actually evict someone, you need a separate unlawful detainer case.",
        },
        {
          id: "bounced-check",
          name: "Bounced or dishonored check",
          example: "Someone paid you with a check that bounced, and they refuse to make it good.",
          eligible: true,
          statute: "Cal. Civ. Code § 1719",
          damageBoost:
            "California lets you add a service charge plus up to 3x damages (between $100 and $1,500) if you send the right written demand and they still don't pay.",
        },
        {
          id: "open-book-account",
          name: "Open book account",
          example: "A regular customer ran up a $1,800 tab over 6 months and stopped paying.",
          eligible: true,
          statute: "Cal. Code Civ. Proc. § 337(2)",
          notes: "The 4-year clock resets every time they make a partial payment.",
        },
        {
          id: "co-signer",
          name: "Co-signer or guarantor disputes",
          example: "You co-signed a friend's lease, the landlord came after you for $5,000 in damages, and now your friend won't pay you back.",
          eligible: true,
          notes: "Special caps apply to suing a guarantor: $8,125 if they charge a fee for guaranteeing, $3,125 if not.",
        },
      ],
    },

    {
      id: "consumer",
      title: "Consumer disputes",
      blurb: "When you paid for goods or services and got ripped off, defrauded, or stiffed.",
      claims: [
        {
          id: "defective-product",
          name: "Refund for a defective product",
          example: "You bought a $1,500 laptop, it died after a week, and the store refuses to refund or replace it.",
          eligible: true,
        },
        {
          id: "bad-service",
          name: "Refund for a service that wasn't done right",
          example: "A wedding photographer no-showed your ceremony. You paid $2,800. They refuse to refund.",
          eligible: true,
        },
        {
          id: "auto-repair",
          name: "Auto repair overcharge or shoddy work",
          example: "A mechanic charged you $3,200 to replace a transmission and 3 weeks later the same problem came back. They won't redo the work.",
          eligible: true,
          notes:
            "Keep all receipts and consider getting a second mechanic's written opinion. That's powerful evidence.",
        },
        {
          id: "contractor",
          name: "Home repair or contractor dispute",
          example: "A contractor took your $4,000 deposit, did a half-finished bathroom, and abandoned the job.",
          eligible: true,
          notes:
            "If the contractor wasn't licensed for work that legally requires a license, they cannot collect anything from you under Cal. Bus. & Prof. Code § 7031. That's a big deal.",
        },
        {
          id: "appliance-warranty",
          name: "Appliance or electronics warranty failure",
          example: "Your $900 refrigerator died inside the warranty period, and the manufacturer is dragging its feet on repair.",
          eligible: true,
        },
        {
          id: "no-show-vendor",
          name: "Cancelled or no-show service provider",
          example: "Your caterer didn't show up to your event. You paid $2,200 in advance. They refuse to refund.",
          eligible: true,
        },
        {
          id: "property-in-custody",
          name: "Property lost or damaged in someone else's custody",
          example: "A dry cleaner ruined a $1,400 wedding dress. They offered $50.",
          eligible: true,
        },
        {
          id: "subscription-cancellation",
          name: "Gym or subscription refund",
          example: "Your gym kept charging you for 8 months after you cancelled in writing.",
          eligible: true,
          notes:
            "California's automatic-renewal law (Cal. Bus. & Prof. Code § 17600) makes it illegal to keep charging after you cancel. Strong claim.",
        },
        {
          id: "used-car",
          name: "Used car or dealership dispute",
          example: "A dealer sold you a car and rolled back the odometer. You only found out after the sale.",
          eligible: true,
          damageBoost:
            "California's Consumer Legal Remedies Act and lemon law give you extra leverage. Some claims qualify for treble damages.",
        },
        {
          id: "deceptive-trade",
          name: "False advertising or deceptive trade practices",
          example: "A company advertised a product as organic, you paid a premium, and lab tests showed it wasn't.",
          eligible: true,
          statute: "Cal. Bus. & Prof. Code § 17200 (UCL); Cal. Civ. Code § 1750 (CLRA)",
          notes:
            "CLRA claims require you to send a 30-day written demand letter before suing for damages. Don't skip that.",
        },
      ],
    },

    {
      id: "property-damage",
      title: "Property damage",
      blurb: "When someone damaged your stuff, your car, or your land.",
      claims: [
        {
          id: "vehicle-collision",
          name: "Vehicle collision (under the cap)",
          example: "Someone backed into your car in a parking lot. Repairs cost $4,800. Their insurance is dragging or denying.",
          eligible: true,
          notes:
            "If your repairs and any minor injuries fit under $12,500, small claims is faster than dealing with insurance lawyers.",
        },
        {
          id: "personal-property-damage",
          name: "Damage to personal property",
          example: "A neighbor's tree fell on your fence, and they refuse to pay the $2,200 repair bill.",
          eligible: true,
          statute: "Cal. Code Civ. Proc. § 338(c)",
          notes: "3-year deadline from the date of damage.",
        },
        {
          id: "tenant-damage",
          name: "Damage caused by a tenant",
          example: "Your former tenant punched holes in 4 walls and the carpet replacement cost you $3,500 above their deposit.",
          eligible: true,
        },
        {
          id: "landlord-damage",
          name: "Damage caused by a landlord",
          example: "Your landlord's plumber flooded your apartment and ruined $2,000 of furniture. The landlord blames the plumber.",
          eligible: true,
        },
        {
          id: "boundary-dispute",
          name: "Tree, fence, or boundary damage",
          example: "Your neighbor cut down a tree that was partially on your property, killing landscaping you'd paid for.",
          eligible: true,
          notes:
            "Cal. Civ. Code § 3346 lets you recover up to triple damages for someone wrongfully cutting down trees.",
        },
        {
          id: "pet-damage",
          name: "Damage caused by a pet",
          example: "A neighbor's dog attacked yours. Vet bills came to $1,800. The owner refuses to pay.",
          eligible: true,
        },
        {
          id: "moving-damage",
          name: "Damage during a move",
          example: "Movers broke a $2,400 piece of furniture. The company offered $60.",
          eligible: true,
        },
      ],
    },

    {
      id: "landlord-tenant",
      title: "Landlord and tenant (money disputes)",
      blurb: "Most small claims cases nationally are landlord-tenant. California has strong tenant protections, especially around deposits.",
      claims: [
        {
          id: "security-deposit",
          name: "Unreturned security deposit",
          example: "Your landlord kept your $2,000 deposit and never sent an itemized statement of damages.",
          eligible: true,
          statute: "Cal. Civ. Code § 1950.5",
          damageBoost:
            "If the landlord acted in bad faith (kept it without reason or itemization), you can recover up to twice the deposit as a statutory penalty plus the original deposit. Three times in egregious cases.",
          notes:
            "California requires the landlord to return your deposit (or send an itemized statement) within 21 days of move-out. Miss that 21-day window and they generally lose the right to keep any of it.",
        },
        {
          id: "prepaid-rent",
          name: "Refund of prepaid last month's rent",
          example: "You paid first, last, and security at move-in. Your lease ended. The landlord won't return last month's rent.",
          eligible: true,
        },
        {
          id: "habitability",
          name: "Repair-and-deduct or habitability claim",
          example: "Your heater broke in December, your landlord ignored repair requests for 6 weeks, and you spent $1,400 on a contractor and electric heaters.",
          eligible: true,
          statute: "Cal. Civ. Code § 1942",
        },
        {
          id: "back-rent",
          name: "Back rent (landlord vs former tenant)",
          example: "Your former tenant left owing $3,800 in rent.",
          eligible: true,
          notes:
            "California's special small-claims jurisdiction for COVID-era rent debt above the cap expired October 1, 2025. Now back rent claims are subject to the normal $12,500 individual / $6,250 business cap.",
        },
        {
          id: "wrongful-retention",
          name: "Wrongful retention of tenant property after move-out",
          example: "Your landlord kept items from your storage area worth $1,200 and refuses to return them.",
          eligible: true,
        },
        {
          id: "lease-fees",
          name: "Disputed lease fees (cleaning, late, pet, parking)",
          example: "Your landlord charged $400 in 'cleaning fees' that aren't in the lease.",
          eligible: true,
        },
      ],
    },

    {
      id: "employment",
      title: "Employment and wages",
      blurb: "California has some of the strongest wage protections in the country, with steep penalties for late or unpaid wages.",
      claims: [
        {
          id: "unpaid-wages",
          name: "Unpaid final paycheck or earned wages",
          example: "You quit on a Friday. Your employer withheld your last paycheck for 3 weeks.",
          eligible: true,
          statute: "Cal. Lab. Code § 203",
          damageBoost:
            "California's 'waiting time penalty' adds up to 30 days of your daily wage as a penalty for late final pay. On a $200/day salary, that's $6,000 added on top of what you're owed.",
          notes:
            "For most wage cases, the California Labor Commissioner's office (DLSE) is a faster, free option. Small claims is best when the Labor Commissioner has already issued a decision the employer is ignoring.",
        },
        {
          id: "unpaid-commissions",
          name: "Unpaid commissions or bonuses",
          example: "You made $4,200 in commissions on closed deals before you quit. The company refuses to pay them.",
          eligible: true,
        },
        {
          id: "expense-reimbursement",
          name: "Unreimbursed business expenses",
          example: "You used your personal car for work, racked up $2,800 in mileage, and the company won't reimburse.",
          eligible: true,
          statute: "Cal. Lab. Code § 2802",
        },
      ],
    },

    {
      id: "professional-services",
      title: "Personal and professional services",
      blurb: "Service providers who didn't deliver what you paid for.",
      claims: [
        {
          id: "salon",
          name: "Botched salon service",
          example: "A stylist damaged your hair badly enough that you needed $800 in corrective treatment.",
          eligible: true,
        },
        {
          id: "tutoring",
          name: "Tutoring or coaching not delivered",
          example: "You prepaid $2,000 for a 12-session SAT prep course. The tutor cancelled half the sessions and refuses to refund.",
          eligible: true,
        },
        {
          id: "pet-services",
          name: "Pet boarding, grooming, or training",
          example: "A boarder neglected your dog and the resulting vet bills hit $1,500.",
          eligible: true,
        },
        {
          id: "medical-billing",
          name: "Medical billing dispute",
          example: "A clinic billed you $3,500 for a procedure your insurance was supposed to cover. They won't fix it.",
          eligible: true,
          notes:
            "Federal No Surprises Act and California's surprise-billing protections may apply. Small claims still works for the money portion if other channels don't resolve it.",
        },
        {
          id: "daycare",
          name: "Daycare or preschool refund",
          example: "You prepaid 2 months at a daycare. They closed without notice. They refuse to refund.",
          eligible: true,
        },
      ],
    },

    {
      id: "vehicle",
      title: "Vehicle disputes",
      blurb: "Anything car-related that didn't end in a courtroom-worthy injury.",
      claims: [
        {
          id: "uninsured-collision",
          name: "Accident damage when insurance won't cover",
          example: "You were rear-ended by an uninsured driver. Your repairs were $4,000.",
          eligible: true,
        },
        {
          id: "mechanic-dispute",
          name: "Mechanic or body shop dispute",
          example: "A shop charged you $2,800 for repairs that weren't done. You can prove it.",
          eligible: true,
        },
        {
          id: "dealer-dispute",
          name: "Dealership dispute",
          example: "A dealer added $1,500 in fees you weren't told about and now refuses to remove them after the sale.",
          eligible: true,
        },
        {
          id: "towing",
          name: "Wrongful tow or impound",
          example: "Your car was towed from a spot where towing wasn't authorized. You paid $400 to get it out.",
          eligible: true,
          statute: "Cal. Veh. Code § 22658",
          damageBoost:
            "If a tow company violated the strict notice and posting rules, you can recover up to 4x the towing fees as a statutory penalty.",
        },
      ],
    },

    {
      id: "personal-injury",
      title: "Minor personal injury",
      blurb: "Most personal injury cases exceed $12,500 and belong in regular civil court. But for small ones, small claims works.",
      claims: [
        {
          id: "minor-injury",
          name: "Minor injury within the cap",
          example: "A small dog bite, a slip-and-fall with $4,000 in urgent care bills, a minor sports collision.",
          eligible: true,
          notes:
            "If your injury is serious (broken bones, surgery, ongoing physical therapy), the medical bills alone almost always exceed the cap. In that case, talk to a personal injury lawyer. Most do free consults and contingency fees.",
        },
      ],
    },

    {
      id: "loans-debts",
      title: "Loans and shared debts",
      blurb: "Disputes between roommates, exes, friends, and family who agreed to split costs.",
      claims: [
        {
          id: "roommate-expenses",
          name: "Roommate or shared-expense disputes",
          example: "You and a roommate split utilities. They moved out owing you $1,400 in their share.",
          eligible: true,
        },
        {
          id: "broken-engagement",
          name: "Engagement ring after a breakup",
          example: "Your ex-fiance kept the $3,000 ring after calling off the wedding.",
          eligible: true,
          notes:
            "California law says engagement rings are conditional gifts. The breaker generally has to give it back. Whether they're 'the breaker' is sometimes contested.",
        },
        {
          id: "earnest-money",
          name: "Recovery of cash deposits or earnest money",
          example: "You paid $5,000 earnest money on a property purchase, the deal fell through through no fault of yours, and the seller won't return it.",
          eligible: true,
        },
      ],
    },

    {
      id: "statutory",
      title: "California statutory claims",
      blurb: "Specific laws that boost your damages or unlock special remedies.",
      claims: [
        {
          id: "bad-check",
          name: "Bad check (NSF) statutory damages",
          example: "Someone wrote you a bad check for $400. After a written demand and 30 days, they still haven't paid.",
          eligible: true,
          statute: "Cal. Civ. Code § 1719",
          damageBoost:
            "You can recover the check amount plus a service charge ($25 first time, $35 after) plus statutory damages between $100 and $1,500.",
        },
        {
          id: "clra",
          name: "Consumer Legal Remedies Act (CLRA) damages",
          example: "A company misrepresented a product or service in violation of California's consumer protection law.",
          eligible: true,
          statute: "Cal. Civ. Code § 1750",
          notes: "Requires a 30-day written demand letter (Civ. Code § 1782) before you can sue for damages.",
        },
        {
          id: "lemon-law",
          name: "Lemon law (Song-Beverly Act)",
          example: "You bought a new car with persistent defects the manufacturer failed to fix in a reasonable number of attempts.",
          eligible: true,
          statute: "Cal. Civ. Code § 1790",
          notes:
            "Most lemon-law cases exceed the $12,500 cap and go to regular court. But if your damages fit, small claims works and lemon-law judgments can include attorney's fees on appeal.",
        },
        {
          id: "identity-theft",
          name: "Identity theft money damages",
          example: "Someone opened a fraudulent account in your name and the resulting charges hit your accounts for $3,400.",
          eligible: true,
        },
      ],
    },

    {
      id: "other",
      title: "Other California-specific situations",
      blurb: "If you didn't see your situation above, check this list. California has dozens of niche statutory claims that can land in small claims.",
      claims: [
        {
          id: "hoa-disputes",
          name: "HOA or condo association disputes",
          example: "Your HOA fined you $2,000 for a violation that doesn't actually exist in the CC&Rs.",
          eligible: true,
          notes:
            "Cal. Civ. Code § 5235 requires HOAs to follow specific procedures. Small claims is a common venue for fee disputes within the cap.",
        },
        {
          id: "auto-renewal",
          name: "Automatic renewal cancellation refunds",
          example: "A subscription service kept charging you for 9 months after you cancelled.",
          eligible: true,
          statute: "Cal. Bus. & Prof. Code § 17600",
        },
        {
          id: "rideshare",
          name: "Rideshare or gig-economy disputes",
          example: "An Uber driver damaged your luggage and Uber refuses to compensate.",
          eligible: true,
        },
        {
          id: "airbnb-deposits",
          name: "AirBnB or short-term rental deposit disputes",
          example: "An AirBnB host kept your $800 cleaning deposit claiming damages they can't document.",
          eligible: true,
        },
        {
          id: "early-termination",
          name: "Cell phone or contract early-termination fee disputes",
          example: "A carrier hit you with a $400 early-termination fee they had previously waived in writing.",
          eligible: true,
        },
        {
          id: "fdcpa-state",
          name: "Debt collector misconduct",
          example: "A debt collector called you 30 times in a week, used profanity, and showed up at your workplace.",
          eligible: true,
          statute: "Cal. Civ. Code § 1788 (Rosenthal Fair Debt Collection Practices Act)",
          damageBoost: "Up to $1,000 in statutory damages plus actual damages.",
        },
      ],
    },
  ],

  whatYouCannotSueFor: [
    {
      category: "Eviction",
      explanation:
        "Small claims handles money. To physically remove a tenant or recover possession of property, you need an unlawful detainer case.",
      whereToGoInstead: "Unlawful detainer in regular Superior Court (limited civil)",
    },
    {
      category: "Family law",
      explanation:
        "Divorce, child support, custody, alimony, paternity, prenups. None of it goes to small claims.",
      whereToGoInstead: "Family law division of Superior Court",
    },
    {
      category: "Probate and inheritance",
      explanation: "Estate disputes, will contests, trustee removals. Wrong court.",
      whereToGoInstead: "Probate division of Superior Court",
    },
    {
      category: "Real estate title disputes",
      explanation: "Quiet title, foreclosure, ownership disputes. Small claims doesn't have authority over real property title.",
      whereToGoInstead: "Civil division of Superior Court",
    },
    {
      category: "Defamation above the cap",
      explanation:
        "You can technically sue for defamation in small claims if your damages fit, but most defamation cases involve more than $12,500 in harm and require the kind of expert testimony that's hard to present in a 15-minute hearing.",
      whereToGoInstead: "Civil division of Superior Court (with a lawyer)",
    },
    {
      category: "Medical or legal malpractice",
      explanation:
        "These almost always exceed $12,500 and require expert witnesses on standard of care. Small claims is the wrong venue.",
      whereToGoInstead: "Civil division with a malpractice lawyer (most do free consults)",
    },
    {
      category: "Federal claims",
      explanation: "Bankruptcy, federal civil rights, federal employment law (Title VII), patents, copyright, trademark. State courts can't hear these.",
      whereToGoInstead: "Federal District Court",
    },
    {
      category: "Class actions",
      explanation: "Small claims is one person, one case. You cannot represent a group.",
      whereToGoInstead: "Civil division of Superior Court",
    },
    {
      category: "Injunctions and orders to do or stop something",
      explanation:
        "Small claims awards money. It generally cannot order someone to fix a problem, stop harassing you, finish a job, or transfer property. The one exception is when a specific California statute explicitly allows it.",
      whereToGoInstead:
        "Civil harassment restraining orders and other injunctive relief belong in regular Superior Court",
    },
    {
      category: "Specific performance",
      explanation:
        "If you want a court to force someone to actually go through with a contract (e.g., complete a sale), that's specific performance and small claims can't grant it.",
      whereToGoInstead: "Civil division of Superior Court",
    },
    {
      category: "Workers' compensation",
      explanation:
        "Work injuries are handled by California's workers' comp administrative system, not by small claims.",
      whereToGoInstead: "California Workers' Compensation Appeals Board",
    },
    {
      category: "Cases against the federal government",
      explanation:
        "Federal sovereign immunity and special claim procedures apply.",
      whereToGoInstead: "Federal Court of Claims or applicable federal forum",
    },
    {
      category: "State or local government claims (without first filing a claim)",
      explanation:
        "You must first file a Government Claim (Gov. Code § 910) with the agency and have it denied. Only then can you file in court, including small claims. The deadline is usually 6 months from the incident.",
      whereToGoInstead:
        "First file a Government Claim with the agency. After denial, then small claims for amounts under the cap.",
    },
  ],

  damages: {
    compensatory: true,
    punitive: {
      available: false,
      explanation:
        "California small claims judges almost never award punitive damages, even where state law would technically allow them. Don't ask for an inflated amount: the judge will award what you can prove.",
    },
    statutoryMultipliers: [
      {
        claim: "Bad-faith security deposit retention",
        multiplier: "Up to 2x the deposit (in addition to the original)",
        statute: "Cal. Civ. Code § 1950.5(l)",
      },
      {
        claim: "Late final paycheck (waiting time penalty)",
        multiplier: "Up to 30 days of wages",
        statute: "Cal. Lab. Code § 203",
      },
      {
        claim: "Bad check (NSF) damages",
        multiplier: "$100 to $1,500 statutory damages plus the check amount",
        statute: "Cal. Civ. Code § 1719",
      },
      {
        claim: "Wrongful tree cutting",
        multiplier: "Up to 3x damages",
        statute: "Cal. Civ. Code § 3346",
      },
      {
        claim: "Wrongful tow",
        multiplier: "Up to 4x the tow charges",
        statute: "Cal. Veh. Code § 22658",
      },
      {
        claim: "Debt collector misconduct (Rosenthal Act)",
        multiplier: "Up to $1,000 statutory damages plus actual damages",
        statute: "Cal. Civ. Code § 1788.30",
      },
    ],
    attorneyFees: {
      available: false,
      explanation:
        "California small claims doesn't allow attorney's fees as a general rule (and lawyers can't represent you at the trial anyway). Two exceptions: a small claims appeal where the appeal is found frivolous can result in up to $150 in fees, and statutes that explicitly award fees may still apply if the underlying claim qualifies.",
    },
    interestRate: {
      rate: 10,
      type: "simple",
      statute: "Cal. Code Civ. Proc. § 685.010",
      notes:
        "Most judgments accrue 10% simple interest from the date of judgment. Consumer debt and medical debt judgments under $50,000 carry only 5% interest under SB 1200 (effective 2023).",
    },
    feesRecoverable: true,
  },

  whereToFile: {
    courtName: "Small Claims Division of the Superior Court",
    parentCourt: "California Superior Court",
    venueRules: [
      {
        scenario: "Most cases (the default rule)",
        filingOptions: ["The county where the defendant lives or does business"],
      },
      {
        scenario: "Property damage or personal injury",
        filingOptions: [
          "Where the defendant lives",
          "Where the injury or damage happened",
        ],
      },
      {
        scenario: "Contract disputes",
        filingOptions: [
          "Where the defendant lives",
          "Where the contract was signed",
          "Where the contract was supposed to be performed",
          "Where the contract was broken",
        ],
      },
      {
        scenario: "Sale of goods (you sold something)",
        filingOptions: [
          "Where you delivered the goods",
          "Where the buyer lives now or lived when you sold to them",
        ],
      },
      {
        scenario: "Sale of goods (you bought something)",
        filingOptions: [
          "Where the seller is located",
          "Where you live now or lived when you bought it",
        ],
      },
      {
        scenario: "Security deposit disputes",
        filingOptions: [
          "Where the rental property is located",
          "Where the landlord lives",
        ],
      },
    ],
    consequencesOfWrongVenue:
      "Filing in the wrong county usually means dismissal, not a free transfer. You'll have to refile and pay the fee again. Worse, if your statute of limitations runs out in the meantime, you lose your case entirely. Double-check the venue before filing.",
    eFilingAvailable: "varies",
    eFilingNotes:
      "California has not standardized e-filing for small claims. Orange County requires it. Sacramento started accepting it in June 2024. Los Angeles decommissioned its small-claims e-filing system and now only accepts paper, mail, or fax filings. Always check your specific county's website.",
    eFilingPortal: "https://efileus.com/eFileCA/",
  },

  fees: {
    tiers: [
      { range: "$0 to $1,500", amount: 30 },
      { range: "$1,500.01 to $5,000", amount: 50 },
      { range: "$5,000.01 to $12,500 (individuals only)", amount: 75 },
    ],
    frequentFiler: { threshold: 12, fee: 100 },
    serviceFees: [
      { method: "County sheriff", amount: "$40 to $50", notes: "Varies slightly by county. LA Sheriff is $50." },
      { method: "Private process server", amount: "$75 to $150", notes: "Faster than the sheriff in most cases. Recoverable if you win." },
      { method: "Certified mail by clerk", amount: "$15", notes: "Cheapest, but only valid if the defendant signs the green card. Many defendants don't, so this often fails." },
    ],
    waiver: {
      forms: [
        { number: "FW-001", name: "Request to Waive Court Fees" },
        { number: "FW-003", name: "Order on Court Fee Waiver" },
      ],
      eligibility: [
        "You receive Medi-Cal, CalFresh, SSI, SSP, CAPI, IHSS, CalWORKs, or General Assistance",
        "Your household income falls below the state guidelines (currently around 125% of federal poverty)",
        "Paying court fees would prevent you from paying for basic necessities",
      ],
      coverageNotes:
        "A fee waiver covers the filing fee and sheriff service fees. If you win and collect, the court may order the fees repaid out of your judgment. File the waiver at the same time as your claim, not after, because retroactive refunds are difficult.",
    },
    otherFees: [
      { name: "Postpone the hearing", amount: "$10", notes: "Form SC-150. Waived if you have a fee waiver." },
      { name: "Issue an Abstract of Judgment (for collections)", amount: "$40", notes: "Form EJ-001 from the clerk." },
      { name: "Issue a Writ of Execution (for collections)", amount: "$40", notes: "Form EJ-130 from the clerk." },
    ],
  },

  statuteOfLimitations: {
    entries: [
      {
        id: "written-contract",
        claim: "Written contract",
        years: 4,
        clockStart: "The date the contract was broken (or the date of the last partial payment)",
        statute: "Cal. Code Civ. Proc. § 337(1)",
      },
      {
        id: "oral-contract",
        claim: "Oral contract",
        years: 2,
        clockStart: "The date the contract was broken (or the date of the last partial payment)",
        statute: "Cal. Code Civ. Proc. § 339(1)",
      },
      {
        id: "property-damage",
        claim: "Property damage",
        years: 3,
        clockStart: "The date the damage happened",
        statute: "Cal. Code Civ. Proc. § 338(c)",
      },
      {
        id: "personal-injury",
        claim: "Personal injury",
        years: 2,
        clockStart: "The date you were injured (or the date you discovered the injury)",
        statute: "Cal. Code Civ. Proc. § 335.1",
      },
      {
        id: "fraud",
        claim: "Fraud or deceit",
        years: 3,
        clockStart: "The date you discovered (or reasonably should have discovered) the fraud",
        statute: "Cal. Code Civ. Proc. § 338(d)",
      },
      {
        id: "unpaid-wages",
        claim: "Unpaid wages",
        years: 3,
        clockStart: "The date the wages were due",
        statute: "Cal. Code Civ. Proc. § 338(a); Lab. Code § 1194",
        notes: "Up to 4 years if you frame it as an unfair business practice claim.",
      },
      {
        id: "implied-warranty",
        claim: "Breach of implied or written warranty",
        years: 4,
        clockStart: "The date the goods were delivered",
        statute: "Cal. Com. Code § 2725(1)",
      },
      {
        id: "open-book-account",
        claim: "Open book account (credit card, running tab)",
        years: 4,
        clockStart: "The date of the last entry, charge, or payment",
        statute: "Cal. Code Civ. Proc. § 337(2)",
      },
      {
        id: "judgment-renewal",
        claim: "Enforcing an existing judgment",
        years: 10,
        clockStart: "The date the judgment was entered",
        statute: "Cal. Code Civ. Proc. § 683.020",
        notes: "Renewable every 10 years for most judgments.",
      },
    ],
    discoveryRuleNotes:
      "If you didn't find out about the harm right away (a hidden defect, fraud you couldn't have spotted, an injury that took time to manifest), the clock can start from the date you discovered the problem. You'll need to show the judge that you couldn't reasonably have found out sooner.",
    tollingNotes:
      "The clock pauses (\"tolls\") in some situations: if you were a minor at the time of the incident, if the defendant left California for a stretch, or if the defendant is in prison. These exceptions are narrow. Don't rely on tolling unless you're sure it applies.",
  },

  preFiling: {
    demandLetterRequired: false,
    demandLetterRecommended: true,
    demandLetterNotes:
      "California doesn't require a demand letter, but always send one. Three reasons: (1) sometimes it works and you skip the lawsuit entirely, (2) judges look favorably on plaintiffs who tried to resolve it first, (3) it documents that you tried. A clear demand letter says what you're owed, why, and gives a deadline (usually 14 to 30 days).",
    governmentClaimRequired: true,
    governmentClaimNotes:
      "If you're suing a city, county, school district, or state agency, you MUST first file a Government Claim under Cal. Gov. Code § 910 within 6 months of the incident (1 year for some claims). The agency has 45 days to respond. Only after the agency denies your claim or that 45 days passes can you file in small claims. Skipping this step gets your case dismissed automatically.",
    landlordTenantNotes:
      "If you're a tenant suing for your security deposit, send a written demand to the landlord first. They had 21 days from move-out to return the deposit or send an itemized statement. If they missed that, they generally lose the right to keep any of it.",
    consumerProtectionNotes:
      "Consumer Legal Remedies Act (CLRA) claims for damages require a 30-day written demand letter under Cal. Civ. Code § 1782 before you can sue. Skip this and you can't recover damages, only an injunction (which small claims can't grant anyway).",
    arbitrationClauseNotes:
      "Don't worry about arbitration clauses in your contract. Cal. Code Civ. Proc. § 1284.3(b) bars companies from forcing consumers into arbitration when the case fits in small claims. By choosing small claims, you opt out of any arbitration agreement.",
  },

  forms: [
    {
      number: "SC-100",
      name: "Plaintiff's Claim and ORDER to Go to Small Claims Court",
      description: "Your main lawsuit form. Tells the court who you're suing, how much you want, and why.",
      whoFiles: "plaintiff",
      required: true,
      url: "https://courts.ca.gov/sites/default/files/courts/default/2024-11/sc100.pdf",
    },
    {
      number: "SC-100A",
      name: "Other Plaintiffs or Defendants",
      description: "Use this if you have more than one plaintiff or more than one defendant.",
      whoFiles: "plaintiff",
      required: false,
    },
    {
      number: "SC-103",
      name: "Fictitious Business Name (Declaration)",
      description: "Required if you're suing under a DBA (doing-business-as) name. Confirms you've registered the name.",
      whoFiles: "plaintiff",
      required: false,
    },
    {
      number: "SC-104",
      name: "Proof of Service (Small Claims)",
      description: "Documents how the defendant was served. Must be filed at least 5 days before the hearing.",
      whoFiles: "plaintiff",
      required: true,
    },
    {
      number: "SC-107",
      name: "Small Claims Subpoena",
      description: "Compel a witness to attend the hearing or produce documents. $35 per day witness fee plus mileage.",
      whoFiles: "either",
      required: false,
    },
    {
      number: "SC-109",
      name: "Authorization to Appear",
      description: "Lets a non-lawyer (employee, family member) appear on behalf of a business or unavailable individual.",
      whoFiles: "either",
      required: false,
    },
    {
      number: "SC-120",
      name: "Defendant's Claim (Counterclaim)",
      description: "If you're being sued and you have your own claim against the plaintiff, file this to counter-sue.",
      whoFiles: "defendant",
      required: false,
    },
    {
      number: "SC-130",
      name: "Notice of Entry of Judgment",
      description: "The court mails this after a decision. Triggers the 30-day appeal clock.",
      whoFiles: "court",
      required: false,
    },
    {
      number: "SC-133",
      name: "Judgment Debtor's Statement of Assets",
      description: "If you win and the loser doesn't pay in 30 days, they're supposed to fill this out and send it to you. Most don't.",
      whoFiles: "defendant",
      required: false,
    },
    {
      number: "SC-134",
      name: "Application for Judgment Debtor Examination",
      description: "Forces the loser into court to answer questions about their income and assets so you can collect.",
      whoFiles: "plaintiff",
      required: false,
    },
    {
      number: "SC-135",
      name: "Notice of Motion to Vacate Judgment",
      description: "If you missed a hearing and got a default judgment against you, file this within 30 days to ask the court to reopen the case.",
      whoFiles: "defendant",
      required: false,
    },
    {
      number: "SC-140",
      name: "Notice of Appeal",
      description: "Defendants only. Files an appeal to the regular Superior Court. 30-day deadline. $75 fee.",
      whoFiles: "defendant",
      required: false,
    },
    {
      number: "SC-150",
      name: "Request to Postpone Trial",
      description: "Reschedule the hearing. $10 fee unless you have a waiver. File at least 10 days before the hearing.",
      whoFiles: "either",
      required: false,
    },
    {
      number: "SC-220",
      name: "Request to Pay Judgment in Installments",
      description: "If you lost and can't pay in a lump sum, ask the court to approve a payment plan.",
      whoFiles: "defendant",
      required: false,
    },
    {
      number: "FW-001",
      name: "Request to Waive Court Fees",
      description: "Asks the court to waive your filing fee and other court costs based on income or hardship.",
      whoFiles: "either",
      required: false,
    },
    {
      number: "FW-003",
      name: "Order on Court Fee Waiver",
      description: "The court's response to your fee waiver request.",
      whoFiles: "court",
      required: false,
    },
    {
      number: "EJ-001",
      name: "Abstract of Judgment",
      description: "Records a lien on the loser's real estate so you eventually get paid when they sell.",
      whoFiles: "plaintiff",
      required: false,
    },
    {
      number: "EJ-100",
      name: "Satisfaction of Judgment",
      description: "Tells the court the loser paid. You're required to file this within 14 days of full payment.",
      whoFiles: "plaintiff",
      required: false,
    },
    {
      number: "EJ-130",
      name: "Writ of Execution",
      description: "Authorizes the sheriff to garnish wages, levy bank accounts, or seize property.",
      whoFiles: "plaintiff",
      required: false,
    },
    {
      number: "EJ-190",
      name: "Application for Renewal of Judgment",
      description: "Renews your judgment for another 10 years if you haven't collected by year 10.",
      whoFiles: "plaintiff",
      required: false,
    },
    {
      number: "WG-001",
      name: "Application for Earnings Withholding Order",
      description: "Starts the wage garnishment process. Sent to the sheriff who serves it on the employer.",
      whoFiles: "plaintiff",
      required: false,
    },
    {
      number: "MC-012",
      name: "Memorandum of Costs After Judgment",
      description: "Adds collection costs and accrued interest to what the loser owes you.",
      whoFiles: "plaintiff",
      required: false,
    },
  ],

  service: {
    whoCanServe: [
      "Any adult (18 or older) who is not a party to the case. A friend, relative, or coworker works.",
      "A registered process server (typically $75 to $150).",
      "The county sheriff or marshal (typically $40 to $50).",
      "The court clerk by certified mail, in counties that offer it ($15).",
    ],
    methods: [
      {
        name: "Personal service",
        description:
          "The server hands the papers directly to the defendant. Best method. Works at home, work, or anywhere in public.",
        pros: ["Most reliable", "Hardest to challenge in court"],
        cons: ["Requires finding the defendant in person"],
      },
      {
        name: "Substituted service",
        description:
          "If personal service fails after a few honest tries, the server can leave the papers with another adult at the defendant's home or workplace AND mail a copy to that same address. Service is complete 10 days after mailing.",
        pros: ["Works when the defendant is avoiding you"],
        cons: ["Must show \"reasonable diligence\" first (usually 2 to 3 attempts at personal service)"],
      },
      {
        name: "Certified mail by the court clerk",
        description:
          "The clerk sends the papers certified with return receipt. Only counts as valid service if the defendant personally signs the green card.",
        pros: ["Cheap ($15)"],
        cons: ["Low success rate. Most defendants don't sign or pick up the certified mail."],
      },
    ],
    timing: { inCountyDays: 15, outOfCountyDays: 20 },
    proofFilingDeadlineDays: 5,
    proofForm: { number: "SC-104", name: "Proof of Service" },
    businessServiceRules:
      "For a corporation or LLC, serve the registered agent (search the California Secretary of State's website for the name). Serving a receptionist counts only as substituted service and requires the follow-up mailing. For partnerships, serve any general partner. For sole proprietorships, serve the owner.",
    outOfStateNotes:
      "If your defendant is out of state, you can usually still sue here as long as the dispute happened in California. But you have to serve them out of state, which means hiring a process server in their state or sending a personal service via someone there. The court clerk can't do certified mail outside California. Account for extra time when scheduling.",
  },

  response: {
    defendantMustFileAnswer: false,
    responseNotes:
      "Unlike formal civil cases, the defendant doesn't file a written answer. They just show up at the hearing. The summons (built into your SC-100) tells them when and where.",
    defaultProcess:
      "If the defendant doesn't show up and you served them properly (with proof on file), the judge will likely award you a default judgment. You still have to briefly prove your case under oath. Bring your evidence even if the defendant skips.",
    motionToVacateForm: { number: "SC-135", name: "Notice of Motion to Vacate Judgment" },
    motionToVacateDeadlineDays: 30,
    motionToVacateLackOfNoticeDays: 180,
  },

  hearing: {
    attorneysAllowed: false,
    attorneysAllowedNotes:
      "Lawyers cannot represent parties at the small claims trial in California. You speak for yourself. Three exceptions: (1) you ARE a lawyer suing on your own claim, (2) a business sends a regular employee who happens to be in-house counsel, (3) an insurance company sends an attorney to defend an insured. On appeal, lawyers ARE allowed.",
    format:
      "Bench trial. No jury. Each case typically gets 10 to 15 minutes. The judge will hear your story, review your evidence, hear the other side, ask questions, and decide.",
    presider: "A judge, commissioner, or temporary judge (a volunteer attorney sitting pro tem)",
    burdenOfProof:
      "Preponderance of the evidence. That's a fancy way of saying \"more likely than not\" or just over 50%. The judge has to believe your version is more credible than the defendant's.",
    whatToBring: [
      "Your filed SC-100 with the court stamp",
      "Proof of service (SC-104) if you have a copy",
      "Original contracts, invoices, and receipts",
      "Photos of damage or work (printed, not just on your phone)",
      "Text messages and emails (printed and highlighted)",
      "A short written timeline of what happened",
      "Any witness who saw what happened (or a signed witness statement)",
      "Bank statements, cancelled checks, or payment proof",
      "A second mechanic's or contractor's written estimate (for repair cases)",
      "Three copies of every document: one for the judge, one for the other side, one for you",
    ],
    witnessSubpoenaForm: { number: "SC-107", name: "Small Claims Subpoena", feePerDay: 35 },
    interpretersFree: true,
    interpreterNotes:
      "California provides free interpreters for small claims. Request one in advance through the court's website or self-help center, ideally at least 5 to 10 days before your hearing.",
    juryAllowed: false,
  },

  appeals: {
    whoCanAppeal:
      "Only the defendant can appeal a small claims judgment in California. If you're the plaintiff and you lose, you have no right of appeal. (Exception: if there was a counterclaim that you lost as the counter-defendant, you can appeal that part.)",
    deadlineDays: 30,
    fee: 75,
    type: "de novo",
    typeNotes:
      "Small claims appeals get a brand-new trial in the regular Superior Court (limited civil division). The appeal isn't a review of the small claims judge's decision: it's a complete do-over. New evidence allowed. Lawyers allowed on both sides.",
    attorneysAllowedOnAppeal: true,
    bondRequired: false,
    automaticStayOnFiling: true,
    notice: { form: "SC-140", name: "Notice of Appeal" },
  },

  collection: {
    paymentDeadline: "30 days from the date the judgment notice is mailed",
    interestRate: 10,
    interestRateNotes:
      "10% simple interest per year on most judgments. Some consumer debt and medical debt judgments under $50,000 carry only 5% under SB 1200 (effective 2023).",
    methods: [
      {
        id: "voluntary-payment",
        name: "Ask for voluntary payment",
        blurb: "Send a polite demand. Surprisingly often works.",
        description:
          "Send the loser a written demand for payment after the 30-day window. Include the case number, judgment amount, accrued interest, and your preferred payment method. If they pay, great. If not, you've documented your good-faith effort.",
      },
      {
        id: "abstract-of-judgment",
        name: "Record an Abstract of Judgment (real estate lien)",
        blurb: "Cheap, passive, and powerful if they own property.",
        description:
          "Get an Abstract of Judgment from the court clerk and record it with the County Recorder in any county where the loser owns or might own real estate. The abstract becomes a lien on their property: when they sell or refinance, you get paid out of escrow. Lasts 10 years, renewable.",
        forms: [{ number: "EJ-001", name: "Abstract of Judgment" }],
        estimatedCost: "About $40 to issue plus county recording fees",
        effectivenessNotes:
          "Best long-term tactic. Even if the loser is broke today, this catches them whenever they sell or refinance.",
      },
      {
        id: "wage-garnishment",
        name: "Wage garnishment (Earnings Withholding Order)",
        blurb: "If they have a steady job, this is the most reliable method.",
        description:
          "Get a Writ of Execution (EJ-130) from the clerk, fill out an Earnings Withholding Order application (WG-001), and give it to the sheriff in the county where the loser's employer is located. The sheriff serves the employer, who then withholds a portion of every paycheck and sends it to you. Employer must comply by law.",
        forms: [
          { number: "EJ-130", name: "Writ of Execution" },
          { number: "WG-001", name: "Earnings Withholding Order Application" },
        ],
        estimatedCost: "About $40 for the writ plus the sheriff fee",
        effectivenessNotes:
          "Up to 20% of disposable earnings, or the amount above 48x the state minimum wage per week, whichever is less. Effective 9/1/2023 under SB 1477.",
      },
      {
        id: "bank-levy",
        name: "Bank levy",
        blurb: "Freeze and seize money in their bank account.",
        description:
          "With a Writ of Execution, instruct the sheriff to levy a specific bank account. The sheriff serves the bank, which freezes the funds for about 10 days, then sends the money to the sheriff and on to you. Works only if you know where they bank.",
        forms: [{ number: "EJ-130", name: "Writ of Execution" }],
        exemptions: [
          "Social Security, SSI, unemployment, disability, and most public benefits",
          "Up to $1,788 (single) or $2,378 (married) automatically exempt under Cal. Code Civ. Proc. § 704.220, but the loser has to claim it",
        ],
      },
      {
        id: "till-tap",
        name: "Till tap (cash from a cash register)",
        blurb: "Sheriff walks in and takes cash on the spot. One time only.",
        description:
          "If the loser runs a cash business (restaurant, retail, salon), the sheriff can show up unannounced, seize cash from the register up to your judgment amount, and leave. Mostly used as a wake-up call, since one till tap rarely covers the full debt.",
        estimatedCost: "$100 to $175 sheriff fee in LA County (varies by county)",
      },
      {
        id: "keeper",
        name: "Keeper",
        blurb: "A sheriff's deputy posted at their business for hours collecting all cash that comes in.",
        description:
          "More aggressive than a till tap. The sheriff installs a deputy at the loser's business for 8 hours (or longer in shifts) and collects every dollar of revenue during that period. You pay in advance.",
        estimatedCost: "$350 for an 8-hour keeper in LA County (varies)",
      },
      {
        id: "judgment-debtor-exam",
        name: "Judgment Debtor Examination",
        blurb: "Drag them into court to disclose where their money is.",
        description:
          "If you don't know where the loser works or banks, file an Application for Examination (SC-134). The court orders them to appear under oath and answer your questions about their income, bank accounts, real estate, vehicles, and any expected money. Skip the appearance and they can be arrested for contempt.",
        forms: [{ number: "SC-134", name: "Application for Examination" }],
        effectivenessNotes:
          "The threat alone often gets the loser to negotiate. Useful before you spend money on garnishments or levies that might miss.",
      },
      {
        id: "personal-property-levy",
        name: "Levy on personal property (vehicles, equipment)",
        blurb: "Seize and sell their non-exempt stuff.",
        description:
          "The sheriff can seize valuable property like a vehicle and auction it. Less common because of upfront costs (towing, storage, auction fees) and broad exemptions (basic furniture, tools of trade, up to $3,325 in vehicle equity).",
      },
      {
        id: "installment-payment",
        name: "Negotiated installment plan",
        blurb: "Sometimes a steady $200 a month is better than $0.",
        description:
          "If the loser is broke but willing, a negotiated payment plan can be your best bet. They can also formally apply with form SC-220. Set up automatic payments and re-trigger collections if they default.",
        forms: [{ number: "SC-220", name: "Request to Pay Judgment in Installments" }],
      },
    ],
    judgmentLifespanYears: 10,
    renewalProcess:
      "Before year 10 expires, file an Application for Renewal of Judgment (EJ-190) and a Notice of Renewal (EJ-195). The clerk renews for another 10 years and accrued interest gets folded into the new principal. Renewable indefinitely except for some consumer/medical debt judgments under SB 1200 (one renewal max).",
    debtorExamForm: { number: "SC-134", name: "Application and Order for Appearance and Examination" },
    exemptions: [
      "Social Security, SSI, SSP, CalWORKs, and unemployment benefits",
      "Up to $1,788 (single) or $2,378 (married) in any deposit account, automatically",
      "Up to $3,325 of equity in one vehicle",
      "Tools of the trade (varies, generally up to $9,525)",
      "Necessary clothing, household furnishings, food, and medical supplies",
      "Most retirement accounts (IRAs, 401(k)s)",
      "Workers' compensation benefits",
      "California's homestead exemption (high enough to protect most primary residences from forced sale)",
    ],
    bankruptcyNotes:
      "If the loser files bankruptcy, an automatic stay halts all your collection. Most small-claims judgments get discharged in bankruptcy unless the underlying debt was incurred through fraud (then file a non-dischargeability complaint with the bankruptcy court). Talk to a bankruptcy lawyer if this happens.",
    satisfactionForm: { number: "EJ-100", name: "Satisfaction of Judgment" },
  },

  businesses: {
    representation:
      "Businesses cannot use a hired outside lawyer in small claims. The business has to send a regular employee, officer, or director (or a partner if it's a partnership). The person must have actual knowledge of the dispute.",
    canSendEmployee: true,
    canSendAttorney: false,
    representationForm: { number: "SC-109", name: "Authorization to Appear" },
    insuranceAdjusterAllowed: true,
    fictitiousNameForm: { number: "SC-103", name: "Fictitious Business Name (Declaration)" },
    outOfStateNotes:
      "If your business is out of state and you regularly do business in California, you may need a Certificate of Qualification from the California Secretary of State before you can sue here. For one-off transactions this is rarely enforced, but for ongoing California operations you should be registered.",
    licensingNotes:
      "If your business requires a license (contractor, real estate broker, etc.) and you weren't licensed when you did the work, you can't recover anything in court under Cal. Bus. & Prof. Code § 7031. The defendant will likely raise this. Be sure your licensing is in order before suing.",
  },

  countyDifferences: [
    {
      county: "Los Angeles",
      differences: [
        { topic: "E-filing", detail: "Not available for small claims. The pilot system was decommissioned. File on paper, by mail, or by fax." },
        { topic: "Multiple districts", detail: "LA has about a dozen small claims courthouses. You must file in the correct district based on the defendant's address. Use the Filing Court Locator on lacourt.org." },
        { topic: "Sheriff service", detail: "LA Sheriff charges $50 to serve papers." },
        { topic: "Free advice", detail: "LA County has a Small Claims Advisor program through DCBA. Free phone consultations." },
        { topic: "Mediation", detail: "Strongly encouraged. Mediators are often available at the courthouse on hearing day." },
      ],
    },
    {
      county: "Orange",
      differences: [
        { topic: "E-filing", detail: "Required for small claims. File electronically through an approved provider." },
        { topic: "Hearings", detail: "Most small claims are heard at the Civil Complex Center in Santa Ana." },
        { topic: "Mediation", detail: "Free same-day mediation through Community Service Programs." },
      ],
    },
    {
      county: "San Diego",
      differences: [
        { topic: "E-filing", detail: "Not available for small claims as of 2026. Paper filing only." },
        { topic: "Multiple courthouses", detail: "Central (Downtown), North County (Vista), East County (El Cajon), South County (Chula Vista). File where the defendant lives or where the dispute happened." },
        { topic: "Forms packet", detail: "San Diego provides a small claims packet (PKT-019) with all forms and instructions." },
      ],
    },
    {
      county: "San Francisco",
      differences: [
        { topic: "E-filing", detail: "Not mandatory for small claims, paper filing accepted." },
        { topic: "Mediation", detail: "Often required to attempt mediation before the judge hears the case." },
        { topic: "Night court", detail: "SF runs evening calendars (5:30 pm) for working litigants." },
        { topic: "Free advice", detail: "Bar Association of San Francisco runs a Small Claims Advisor hotline." },
      ],
    },
    {
      county: "Sacramento",
      differences: [
        { topic: "E-filing", detail: "Permissive e-filing available since June 2024." },
      ],
    },
    {
      county: "Alameda",
      differences: [
        { topic: "E-filing", detail: "Not available for small claims." },
        { topic: "Mediation", detail: "On-site mediators provided through SEEDS Community Resolution Center." },
        { topic: "Local quirk", detail: "Alameda Local Rule 3.11 may require you to bring stamped envelopes addressed to each defendant for the court to mail the judgment." },
      ],
    },
  ],

  pitfalls: [
    {
      title: "Suing the wrong name",
      whatHappens:
        "You sue \"John's Plumbing\" but the actual legal entity is \"John Smith dba John's Plumbing\" or \"JSP Services LLC.\" Your judgment becomes unenforceable because the named party doesn't legally exist.",
      howToAvoid:
        "Look up the business at the California Secretary of State's website (BizFileOnline). For sole proprietors, sue the owner under their real name plus dba. For LLCs and corporations, use the exact registered name. Match what's on contracts, invoices, or checks.",
    },
    {
      title: "Bad service of process",
      whatHappens:
        "You serve the defendant yourself, mail it (when mail isn't allowed), or have a 16-year-old hand them the papers. Service is invalid. Case continued or dismissed.",
      howToAvoid:
        "Use a non-party adult, a registered process server, or the sheriff. Personal service is the safest. File the proof of service (SC-104) at least 5 days before the hearing. Keep a copy.",
    },
    {
      title: "Missing the statute of limitations",
      whatHappens:
        "You file 6 months too late on an oral contract. Defendant raises the deadline. Case dismissed with prejudice.",
      howToAvoid:
        "Check the statute of limitations for your specific claim type before filing. When in doubt, file sooner. The clock is unforgiving.",
    },
    {
      title: "Asking for the wrong remedy",
      whatHappens:
        "You ask the court to order someone to fix a roof, finish a job, or stop harassing you. Small claims can't do that. Case dismissed.",
      howToAvoid:
        "Convert the wrong into money. \"Finish the job\" becomes \"$X to hire someone else to finish.\" \"Stop harassing me\" goes to a different court (civil harassment restraining order). Small claims is for money only.",
    },
    {
      title: "Not enough evidence",
      whatHappens:
        "It's your word against theirs and you have nothing else. Judge can't find for you on a 50-50 he-said-she-said.",
      howToAvoid:
        "Bring everything: contracts, invoices, photos, texts, emails, receipts, witness statements. Print everything. Prepare a one-page timeline. If the case rests on damages, bring written estimates.",
    },
    {
      title: "Wrong venue",
      whatHappens:
        "You file in your county for convenience, but the defendant lives elsewhere and the dispute happened elsewhere. Case dismissed for improper venue.",
      howToAvoid:
        "File where the defendant lives, OR where the dispute happened (depending on case type). Read the venue rules carefully.",
    },
    {
      title: "Showing up late or not at all",
      whatHappens:
        "You miss your own hearing. Case dismissed. You forfeit the filing fee and have to start over (if it's not too late).",
      howToAvoid:
        "Arrive 30 minutes early. Plan for parking, security, and finding the courtroom. If a real emergency comes up, file SC-150 to postpone before the hearing date.",
    },
    {
      title: "Winning against someone who can't pay",
      whatHappens:
        "You spend hours preparing, win, and then discover the defendant has no income, no bank account, and no property. Your judgment is worth $0.",
      howToAvoid:
        "Before filing, gauge whether the defendant has anything to collect from. A judgment on a broke defendant is paper. Sometimes a partial settlement before suit is the better outcome.",
    },
  ],

  recentChanges: [
    {
      date: "2024-01-01",
      title: "Individual claim cap raised from $10,000 to $12,500",
      description:
        "Senate Bill 71 (2023) raised the individual small claims limit. Business cap also rose, from $5,000 to $6,250. First inflation adjustment in over a decade.",
      bill: "SB 71 (2023)",
    },
    {
      date: "2025-10-01",
      title: "COVID-19 rental debt jurisdiction expired",
      description:
        "During the pandemic, AB 832 let landlords use small claims for COVID rent debt regardless of amount. That carve-out ended October 1, 2025. Rent debt cases now follow normal limits ($12,500 individual, $6,250 business).",
    },
    {
      date: "2023-09-01",
      title: "Wage garnishment formula changed in favor of debtors",
      description:
        "SB 1477 (2022) limits wage garnishment to 20% of disposable earnings or the amount above 48x state minimum wage per week, whichever is less. This means lower-income debtors keep more of their paycheck. If you're collecting on a judgment, expect smaller garnishments than under the old rules.",
      bill: "SB 1477 (2022)",
    },
    {
      date: "2023-01-01",
      title: "Lower interest rate on consumer and medical debt judgments",
      description:
        "SB 1200 (2020) cut the interest rate to 5% (from the standard 10%) on judgments based on consumer debt or medical debt under $50,000. These judgments can also only be renewed once.",
      bill: "SB 1200 (2020)",
    },
    {
      date: "2024-06-17",
      title: "Sacramento County added e-filing for small claims",
      description:
        "Sacramento Superior Court began accepting permissive e-filing for small claims cases starting June 17, 2024.",
    },
  ],

  faqs: [
    {
      question: "Do I need a lawyer for small claims in California?",
      answer:
        "No, and you can't even bring one to the trial. California specifically prohibits lawyers from representing parties at the small claims hearing. The system is designed for ordinary people. You can talk to a lawyer for advice before you file or after a judgment, but at the trial itself, you speak for yourself.",
    },
    {
      question: "How long does small claims take from filing to hearing?",
      answer:
        "Most cases get a hearing date 30 to 75 days after filing. The exact timeline depends on your county's calendar. After the hearing, the judge usually mails the decision within 1 to 4 weeks. If you win and need to collect, that can take months or years depending on the defendant.",
    },
    {
      question: "What's the maximum I can sue for in California small claims?",
      answer:
        "$12,500 if you're an individual. $6,250 if you're a corporation, LLC, partnership, or other business entity. You also can't file more than two cases over $2,500 in a calendar year. If your debt exceeds the cap, you can sue for the cap and waive the rest, or file in regular civil court.",
    },
    {
      question: "What if the defendant doesn't show up?",
      answer:
        "If you served them properly and filed your proof of service, the judge will likely award you a default judgment. You'll still need to briefly prove your case under oath, so bring your evidence. The defendant has 30 days to ask the court to reopen the case (Form SC-135), but only with a good reason.",
    },
    {
      question: "Can I appeal if I lose?",
      answer:
        "If you're the plaintiff and you lose, no. California small claims doesn't allow plaintiffs to appeal their own loss. If you're the defendant and you lose, yes: file a Notice of Appeal (SC-140) within 30 days. The appeal is a brand-new trial in the regular Superior Court, with lawyers allowed on both sides.",
    },
    {
      question: "Why do I need to worry about collecting after I win?",
      answer:
        "California courts don't collect for you. Winning the judgment is just the legal right to be paid. If the defendant doesn't pay voluntarily, you have to use one of the enforcement tools: wage garnishment, bank levy, real estate lien (Abstract of Judgment), or a debtor exam. About 60 to 80 percent of small claims winners never collect in full because they skip this step.",
    },
    {
      question: "Can I sue someone in another state?",
      answer:
        "Sometimes. California courts have jurisdiction over out-of-state defendants if the dispute happened in California (a contract was performed here, an accident happened here, etc.). But you'll need to serve them out of state, which is harder and more expensive. And even if you win, collecting from someone in another state means going through their state's courts to enforce the judgment.",
    },
    {
      question: "What's the difference between small claims and limited civil?",
      answer:
        "Small claims is for $12,500 or less, no lawyers at trial, faster, simpler. Limited civil handles cases up to $35,000, allows lawyers, has formal rules of evidence, and takes much longer. Small claims is the right choice for most everyday disputes under $12,500.",
    },
  ],

  sources: [
    {
      label: "Cal. Code Civ. Proc. § 116.221 (individual jurisdictional limit)",
      url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CCP&sectionNum=116.221",
      citation: "Cal. Code Civ. Proc. § 116.221",
    },
    {
      label: "Cal. Code Civ. Proc. § 116.220 (jurisdiction and entity limits)",
      url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CCP&sectionNum=116.220",
      citation: "Cal. Code Civ. Proc. § 116.220",
    },
    {
      label: "California Courts Self-Help: Small Claims",
      url: "https://selfhelp.courts.ca.gov/small-claims",
    },
    {
      label: "California Courts Self-Help: Statute of Limitations",
      url: "https://selfhelp.courts.ca.gov/civil-lawsuit/statute-limitations",
    },
    {
      label: "Cal. Code Civ. Proc. § 116.340 (service of claim)",
      url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CCP&sectionNum=116.340",
      citation: "Cal. Code Civ. Proc. § 116.340",
    },
    {
      label: "Cal. Civ. Code § 1950.5 (security deposits)",
      url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1950.5",
      citation: "Cal. Civ. Code § 1950.5",
    },
    {
      label: "Cal. Lab. Code § 203 (waiting time penalty)",
      url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=LAB&sectionNum=203",
      citation: "Cal. Lab. Code § 203",
    },
    {
      label: "Cal. Code Civ. Proc. § 706.050 (wage garnishment, as amended 9/1/2023)",
      url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CCP&sectionNum=706.050",
      citation: "Cal. Code Civ. Proc. § 706.050",
    },
    {
      label: "California Judicial Council: Small Claims Forms",
      url: "https://courts.ca.gov/rules-forms/find-your-court-forms?selected_categories=Small+Claims",
    },
    {
      label: "Los Angeles County Small Claims Filing Information",
      url: "https://www.lacourt.org/page/SC0024",
    },
    {
      label: "Orange County Small Claims E-Filing",
      url: "https://www.occourts.org/online-services/efiling/efiling-small-claims",
    },
    {
      label: "Senate Bill 71 (2023): small claims limit increase",
      url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB71",
      citation: "SB 71 (2023)",
    },
    {
      label: "Senate Bill 1477 (2022): wage garnishment reform",
      url: "https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202120220SB1477",
      citation: "SB 1477 (2022)",
    },
  ],
};

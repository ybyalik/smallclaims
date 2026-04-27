import type { StateGuide } from "../lib/types/state-guide";

export const data: StateGuide = {
  state: "Texas",
  slug: "texas",
  abbr: "TX",
  lastUpdated: "2026-04-27",

  hero: {
    individualLimit: 20000,
    businessLimit: 20000,
    typicalTimelineDays: { min: 30, max: 90 },
    filingFeeLow: 54,
    filingFeeHigh: 54,
    tagline:
      "Texas has the highest small claims cap in the country at $20,000. Justice Courts handle these cases, and you can represent your business yourself.",
  },

  ataGlance: [
    { label: "Most you can sue for", value: "$20,000", detail: "Same cap for individuals and businesses" },
    { label: "Filing fee", value: "$54", detail: "Flat fee, regardless of claim amount" },
    { label: "Court", value: "Justice Court (Justice of the Peace)", detail: "One in every county precinct" },
    { label: "Lawyers at trial", value: "Allowed", detail: "Not required, but permitted" },
    { label: "Typical timeline", value: "30 to 90 days", detail: "From filing to hearing" },
    { label: "Wage garnishment", value: "Not allowed", detail: "Texas exempts wages from creditors" },
  ],

  limits: {
    individual: 20000,
    business: 20000,
    annualCap: { count: 0, threshold: 0 },
    splitClaimsAllowed: false,
    splitClaimsExplanation:
      "If your claim is more than $20,000, you have two options: sue for $20,000 and waive the rest, or file in county court (which can hear larger amounts). Texas courts will dismiss attempts to split one debt into multiple smaller cases. The cap excludes statutory interest and court costs but INCLUDES attorney fees if you're claiming them under a contract or statute.",
    statute: "Tex. Gov. Code § 27.031(a)",
  },

  whatYouCanSueFor: [
    {
      id: "contracts",
      title: "Contracts and money owed",
      blurb: "Texas has a generous 4-year statute of limitations on most debt and contract claims, written or oral.",
      claims: [
        {
          id: "written-contract",
          name: "Breach of a written contract",
          example: "A roofer signed a $12,000 contract to replace your roof, took the deposit, and never came back.",
          eligible: true,
          statute: "Tex. Civ. Prac. & Rem. Code § 16.004",
          notes: "4-year deadline. To recover attorney fees under § 38.001, send a written demand at least 30 days before suing.",
        },
        {
          id: "oral-contract",
          name: "Breach of an oral or handshake agreement",
          example: "You agreed verbally to install a fence for $3,500. The customer paid the deposit, you finished the work, and they refuse to pay the balance.",
          eligible: true,
          statute: "Tex. Civ. Prac. & Rem. Code § 16.004",
          notes: "Texas treats oral contracts and written contracts the same for limitations: 4 years (unlike California's 2). Bring text messages, emails, or witness testimony to prove the agreement existed.",
        },
        {
          id: "personal-loan",
          name: "Unpaid personal loan",
          example: "You loaned a friend $5,000 with a text confirming the repayment schedule. They paid $1,000 and disappeared.",
          eligible: true,
          notes: "Bring bank transfer records, screenshots of texts where they acknowledge the loan, and any partial-payment evidence (which resets the 4-year clock).",
        },
        {
          id: "promissory-note",
          name: "Unpaid promissory note",
          example: "An ex-employee signed a note to repay a $4,000 advance, then quit and stopped paying.",
          eligible: true,
          statute: "Tex. Civ. Prac. & Rem. Code § 16.004",
          notes:
            "If you attach a sworn copy of the note to your petition and the defendant doesn't answer, the JP can enter default judgment without a hearing.",
        },
        {
          id: "unpaid-invoice",
          name: "Unpaid commercial invoice",
          example: "Your B2B client owes $14,000 on six invoices that have been unpaid for 90 days.",
          eligible: true,
          notes: "Texas Rule of Civil Procedure 508 lets you file a 'sworn account' suit. Attach a sworn statement of the account and the defendant must file a sworn denial or the account is taken as true.",
        },
        {
          id: "unpaid-rent",
          name: "Unpaid rent (money only, not eviction)",
          example: "A former tenant moved out owing $4,800 in back rent.",
          eligible: true,
          notes: "Eviction (recovering possession) is a separate type of case under Rule 510. Small claims is for the money only.",
        },
        {
          id: "bounced-check",
          name: "Bounced check (NSF)",
          example: "A customer paid you with a $750 check that bounced.",
          eligible: true,
          statute: "Tex. Bus. & Com. Code § 3.506",
          damageBoost: "You can recover the check amount plus a service fee of up to $30 per check.",
        },
        {
          id: "open-book-account",
          name: "Open book account",
          example: "A regular customer ran up a $3,200 tab over six months and stopped paying.",
          eligible: true,
          statute: "Tex. Civ. Prac. & Rem. Code § 16.004",
          notes: "4-year clock resets each time the customer makes a partial payment.",
        },
        {
          id: "co-signer",
          name: "Co-signer or guarantor disputes",
          example: "You co-signed a friend's auto loan. They defaulted, you paid the bank $9,000 to settle, and now your friend won't reimburse you.",
          eligible: true,
        },
      ],
    },

    {
      id: "consumer",
      title: "Consumer disputes",
      blurb: "Texas has one of the strongest consumer protection laws in the country: the Deceptive Trade Practices Act (DTPA).",
      claims: [
        {
          id: "defective-product",
          name: "Refund for a defective product",
          example: "You bought a $2,400 mattress online; it arrived broken and the retailer refuses to refund.",
          eligible: true,
          statute: "Tex. Bus. & Com. Code § 17.50 (DTPA)",
          damageBoost:
            "If you can show the seller acted 'knowingly,' DTPA lets you recover up to 3x your economic damages. Required: send a 60-day demand letter before filing.",
        },
        {
          id: "bad-service",
          name: "Refund for a service that wasn't done right",
          example: "A wedding photographer no-showed your ceremony. You paid $3,500. They refuse to refund.",
          eligible: true,
        },
        {
          id: "auto-repair",
          name: "Auto repair overcharge or shoddy work",
          example: "A shop charged you $4,200 for an engine rebuild that failed in three weeks. They won't redo or refund.",
          eligible: true,
          statute: "Tex. Occ. Code Ch. 2305 (motor vehicle repair); Tex. Bus. & Com. Code § 17.50 (DTPA)",
          notes: "If the shop performed work without authorization, the DTPA explicitly lists that as a deceptive act. Treble damages possible if knowing.",
        },
        {
          id: "contractor",
          name: "Home repair or contractor dispute",
          example: "A contractor took your $8,000 deposit, did half the bathroom remodel, and abandoned the job.",
          eligible: true,
          notes:
            "If your contractor was unlicensed for work that legally requires a license (electrician, plumber), they may be barred from collecting anything from you. For residential construction defect claims, you must give the contractor 60 days' written notice and a chance to inspect or repair under Tex. Prop. Code Ch. 27.",
        },
        {
          id: "no-show-vendor",
          name: "Cancelled or no-show service provider",
          example: "Your caterer cancelled the day of your event. You paid $4,000 in advance. They refuse to refund.",
          eligible: true,
        },
        {
          id: "property-in-custody",
          name: "Property lost or damaged in someone else's custody",
          example: "A dry cleaner ruined a $1,800 wedding dress.",
          eligible: true,
          notes: "Posted disclaimers limiting liability per garment ($50, etc.) are sometimes upheld. The judge will weigh the disclaimer against the bailee's level of fault.",
        },
        {
          id: "subscription-cancellation",
          name: "Gym or subscription refund",
          example: "Your gym kept charging you for 9 months after you cancelled in writing.",
          eligible: true,
          statute: "Tex. Bus. & Com. Code § 605.001 (auto-renewals); Tex. Occ. Code Ch. 702 (health spa contracts)",
        },
        {
          id: "used-car",
          name: "Used car or dealership dispute",
          example: "A dealer sold you a $14,000 used truck and rolled back the odometer.",
          eligible: true,
          damageBoost: "Odometer fraud is a DTPA 'laundry list' violation. Treble damages plus attorney fees if you can prove knowing conduct.",
          notes: "New car defects must go through TxDMV's Lemon Law administrative process, not small claims.",
        },
        {
          id: "deceptive-trade",
          name: "False advertising or deceptive trade practice",
          example: "A company advertised an 'all-organic' product, charged a premium, and lab tests showed it wasn't.",
          eligible: true,
          statute: "Tex. Bus. & Com. Code § 17.41 et seq. (DTPA)",
          notes: "Send a 60-day demand letter (Tex. Bus. & Com. Code § 17.505) before filing. Failure to do so can prevent recovery of attorney fees and pause your case.",
        },
      ],
    },

    {
      id: "property-damage",
      title: "Property damage",
      blurb: "Texas has a 2-year deadline on property damage claims (shorter than California's 3 years). File quickly.",
      claims: [
        {
          id: "vehicle-collision",
          name: "Vehicle collision (under the cap)",
          example: "Someone backed into your car. Repairs cost $5,800 and the at-fault driver's insurance is denying liability.",
          eligible: true,
          statute: "Tex. Civ. Prac. & Rem. Code § 16.003",
          notes: "Sue the driver, not their insurance. Texas is a comparative fault state: if you're more than 50% at fault, you recover nothing. If 50% or less, your recovery is reduced by your percentage.",
        },
        {
          id: "personal-property-damage",
          name: "Damage to personal property",
          example: "A neighbor drove a riding mower into your fence, causing $2,800 in repairs.",
          eligible: true,
          statute: "Tex. Civ. Prac. & Rem. Code § 16.003",
        },
        {
          id: "tenant-damage",
          name: "Damage caused by a tenant",
          example: "A former tenant left $4,500 in damage. Their $1,500 deposit didn't cover it.",
          eligible: true,
          notes: "You must have provided the deposit accounting within 30 days of move-out (Tex. Prop. Code § 92.104).",
        },
        {
          id: "landlord-damage",
          name: "Damage caused by a landlord",
          example: "Your landlord's plumber flooded your apartment. $3,000 in furniture ruined.",
          eligible: true,
        },
        {
          id: "boundary-dispute",
          name: "Tree, fence, or boundary damage",
          example: "Your neighbor cut down a tree that was on your property line, killing $2,400 in landscaping.",
          eligible: true,
          notes: "Justice court can NOT decide who owns land or settle boundary title. It can only award damages for clear damage caused.",
        },
        {
          id: "pet-damage",
          name: "Damage caused by a pet",
          example: "A neighbor's dog attacked yours. Vet bills came to $1,800.",
          eligible: true,
        },
        {
          id: "moving-damage",
          name: "Damage during a move",
          example: "Movers broke a $3,200 piece of furniture. The company offered $90 (60 cents per pound).",
          eligible: true,
          notes: "Many moving contracts limit liability to 60 cents/pound or push to arbitration. Check what you signed before suing.",
        },
      ],
    },

    {
      id: "landlord-tenant",
      title: "Landlord and tenant (money only)",
      blurb: "Security deposits are the most common small claim. Texas gives tenants powerful penalty rights when landlords act in bad faith.",
      claims: [
        {
          id: "security-deposit",
          name: "Unreturned security deposit",
          example: "Your landlord kept your $2,200 deposit and never sent an itemized statement of damages.",
          eligible: true,
          statute: "Tex. Prop. Code § 92.109",
          damageBoost:
            "If the landlord acted in bad faith, you recover 3x the wrongfully withheld amount + $100 + reasonable attorney fees. Bad faith is presumed if the landlord neither refunds nor sends an itemized accounting within 30 days.",
          notes:
            "Texas requires you to give the landlord your forwarding address in writing. The 30-day clock starts when you've moved out AND given that address. A $2,200 deposit with no accounting can become a $6,800 judgment ($6,600 treble + $100).",
        },
        {
          id: "prepaid-rent",
          name: "Refund of prepaid rent or last month's rent",
          example: "You moved out early under a mutual agreement and the landfair re-rented immediately. They kept your prepaid last month.",
          eligible: true,
          statute: "Tex. Prop. Code § 91.006 (mitigation duty)",
        },
        {
          id: "back-rent",
          name: "Back rent (landlord vs former tenant)",
          example: "A former tenant left owing $5,000 in rent.",
          eligible: true,
          notes: "Eviction belongs in a separate Rule 510 case. Use small claims for the money only.",
        },
        {
          id: "wrongful-retention",
          name: "Wrongful retention of tenant property after move-out",
          example: "Your landlord boxed up and held items worth $1,400 after you moved out.",
          eligible: true,
          statute: "Tex. Prop. Code § 92.0081, § 54.042",
        },
        {
          id: "lockout",
          name: "Illegal lockout or utility cutoff",
          example: "Your landlord changed the locks without proper notice or court order.",
          eligible: true,
          statute: "Tex. Prop. Code § 92.008, § 92.009",
          damageBoost: "Recover actual damages + 1 month's rent + $1,000 statutory penalty.",
        },
        {
          id: "retaliation",
          name: "Retaliatory eviction or fee",
          example: "Your landlord raised your rent 30 days after you complained to the city about a code violation.",
          eligible: true,
          statute: "Tex. Prop. Code § 92.333",
          damageBoost: "1 month's rent + $500 + actual damages.",
        },
        {
          id: "lease-fees",
          name: "Disputed late fees or charges",
          example: "Your lease has a $100 late fee on $500 rent (20%), well above the legal cap.",
          eligible: true,
          statute: "Tex. Prop. Code § 92.019",
          notes: "Late fees are capped at 12% (small landlords) or 10% (large complexes) of monthly rent.",
        },
      ],
    },

    {
      id: "employment",
      title: "Employment and wages",
      blurb: "Texas Payday Law gives you fast options. The Texas Workforce Commission (TWC) is often the better forum for simple wage cases.",
      claims: [
        {
          id: "unpaid-wages",
          name: "Unpaid final paycheck",
          example: "Your employer fired you and never delivered your last $1,200 paycheck.",
          eligible: true,
          statute: "Tex. Lab. Code § 61 (Texas Payday Law)",
          notes: "Final pay is due within 6 days for terminated employees, or by next regular payday if you quit. The TWC's free administrative wage claim (180-day deadline) is usually faster than small claims for straightforward cases.",
        },
        {
          id: "unpaid-commissions",
          name: "Unpaid commissions or bonuses",
          example: "You closed $40,000 in sales before quitting. The company refuses to pay your $5,200 in earned commissions.",
          eligible: true,
          notes: "Texas generally enforces written commission plans. Unwritten or vague policies are read in the employee's favor.",
        },
        {
          id: "expense-reimbursement",
          name: "Unreimbursed business expenses",
          example: "You used your car for work, racked up $2,400 in unreimbursed mileage, and quit.",
          eligible: true,
          notes: "Unlike California, Texas has no broad expense-reimbursement statute. Recovery depends on your employer's written policy or agreement.",
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
          example: "A chemical hair treatment damaged your hair badly. Corrective treatment cost $600.",
          eligible: true,
        },
        {
          id: "tutoring",
          name: "Tutoring or coaching not delivered",
          example: "You prepaid $1,800 for 12 sessions. The tutor delivered 3 and disappeared.",
          eligible: true,
        },
        {
          id: "pet-services",
          name: "Pet boarding, grooming, or training",
          example: "A boarding kennel neglected your dog and vet bills hit $1,400.",
          eligible: true,
          notes: "Texas treats pets as property. Recovery is generally limited to vet bills and replacement value, not emotional distress.",
        },
        {
          id: "medical-billing",
          name: "Medical billing dispute",
          example: "A clinic advertised a $500 procedure cash price but billed you $1,800.",
          eligible: true,
          notes:
            "Texas surprise-billing claims (out-of-network ER bills) MUST go through state arbitration under SB 1264 (2020), not small claims. Quality-of-care issues are medical malpractice and require expert reports under CPRC Ch. 74; not viable in JP court.",
        },
        {
          id: "daycare",
          name: "Daycare or preschool refund",
          example: "You prepaid 2 months at a daycare. They closed without notice and won't refund.",
          eligible: true,
        },
      ],
    },

    {
      id: "vehicle",
      title: "Vehicle disputes",
      blurb: "Texas has a special expedited tow hearing process worth knowing.",
      claims: [
        {
          id: "uninsured-collision",
          name: "Accident damage when insurance won't cover",
          example: "An uninsured driver hit you. Your car needs $6,200 in repairs.",
          eligible: true,
        },
        {
          id: "mechanic-dispute",
          name: "Mechanic or body shop dispute",
          example: "A shop quoted $5,000, then billed $8,000 for unauthorized work and won't release your car until paid.",
          eligible: true,
          statute: "Tex. Occ. Code Ch. 2305; Tex. Bus. & Com. Code § 17.50 (DTPA)",
          damageBoost: "Performing unauthorized work is explicitly listed in the DTPA. Treble damages possible.",
        },
        {
          id: "dealer-fraud",
          name: "Dealer fraud or undisclosed defect",
          example: "A dealer sold you a used car and concealed prior accident damage you only discovered later.",
          eligible: true,
        },
        {
          id: "wrongful-tow",
          name: "Wrongful tow or impound",
          example: "Your car was towed from your apartment despite a valid permit. You paid $400 to get it back.",
          eligible: true,
          statute: "Tex. Occ. Code §§ 2308.452-458",
          damageBoost: "Texas has a special expedited tow hearing in justice court. File within 14 DAYS of the tow. If the tow was wrongful, you recover the tow and storage fees, up to $1,000 in statutory damages, court costs, and attorney fees.",
          notes: "Use the special tow hearing process, not a regular small claims case. The 14-day window is critical.",
        },
      ],
    },

    {
      id: "personal-injury",
      title: "Minor personal injury",
      blurb: "Most personal injury cases exceed $20,000 and belong in higher court. For minor injuries, justice court works.",
      claims: [
        {
          id: "minor-injury",
          name: "Minor injury within the cap",
          example: "Soft-tissue injury from a parking lot accident, $4,000 in chiropractor bills.",
          eligible: true,
          statute: "Tex. Civ. Prac. & Rem. Code § 16.003",
          notes:
            "2-year deadline. JP courts are not great for serious injury cases since formal evidence rules can be enforced (e.g., proving up medical bills under CPRC § 18.001). For real injuries, talk to a personal injury lawyer. Most do free consults and contingency fees.",
        },
      ],
    },

    {
      id: "loans-debts",
      title: "Loans and shared debts",
      blurb: "Disputes between roommates, exes, friends, and family.",
      claims: [
        {
          id: "roommate-expenses",
          name: "Roommate or shared-expense disputes",
          example: "A roommate moved out owing you $1,800 in their share of rent and utilities.",
          eligible: true,
        },
        {
          id: "engagement-ring",
          name: "Engagement ring after a breakup",
          example: "Your ex-fiance kept the $4,500 ring after calling off the wedding.",
          eligible: true,
          notes:
            "Texas treats engagement rings as conditional gifts. If the marriage doesn't happen and the giver wasn't the one who broke off the engagement, the ring should be returned.",
        },
        {
          id: "earnest-money",
          name: "Recovery of cash deposits or earnest money",
          example: "You put $5,000 earnest money on a property. The seller backed out and won't return it.",
          eligible: true,
        },
        {
          id: "creditor-debt",
          name: "Defending against a creditor or debt buyer",
          example: "A debt buyer is suing you for a $3,200 credit card balance from 2018.",
          eligible: true,
          statute: "Tex. Rule of Civil Procedure 508",
          notes:
            "Texas allows creditors and debt buyers in small claims. The 4-year statute of limitations starts from the last payment or last activity. If they don't have proof they own the debt or proper account documentation, they may lose.",
        },
      ],
    },

    {
      id: "statutory",
      title: "Texas statutory claims",
      blurb: "Specific Texas laws that boost your damages or unlock special remedies.",
      claims: [
        {
          id: "dtpa",
          name: "DTPA (Deceptive Trade Practices Act) claim",
          example: "A business misrepresented a product or service. You can prove they knew the statement was false.",
          eligible: true,
          statute: "Tex. Bus. & Com. Code § 17.50",
          damageBoost: "Up to 3x economic + 3x mental anguish damages for 'knowing' conduct, plus mandatory attorney fees for prevailing consumer.",
          notes: "60-day pre-suit demand letter required (§ 17.505). Skip it and you can't recover attorney fees, and the case can be paused.",
        },
        {
          id: "bad-check-statute",
          name: "Bad check service fee",
          example: "A check for $400 bounced.",
          eligible: true,
          statute: "Tex. Bus. & Com. Code § 3.506",
          damageBoost: "Recover the check amount plus a service fee of up to $30 per check.",
        },
        {
          id: "wrongful-tow-statute",
          name: "Wrongful tow penalty",
          example: "Your car was wrongfully towed.",
          eligible: true,
          statute: "Tex. Occ. Code Ch. 2308",
          damageBoost: "Up to $1,000 statutory damages plus tow fees, court costs, and attorney fees in the special 14-day tow hearing.",
        },
        {
          id: "tdca",
          name: "Texas Debt Collection Act violation",
          example: "A debt collector called you 30 times in a week, used profanity, and showed up at your workplace.",
          eligible: true,
          statute: "Tex. Fin. Code Ch. 392",
          damageBoost: "Actual damages, $100 minimum per intentional violation, plus attorney fees. Also a DTPA tie-in (treble damages possible).",
        },
        {
          id: "identity-theft",
          name: "Identity theft money damages",
          example: "Someone opened a fraudulent account in your name; you incurred $1,200 in costs sorting it out.",
          eligible: true,
          statute: "Tex. Bus. & Com. Code § 521.151",
          damageBoost: "Actual damages plus a $1,000 civil penalty against the thief.",
        },
      ],
    },

    {
      id: "other",
      title: "Other Texas-specific situations",
      blurb: "Niche claim types and additional Texas remedies.",
      claims: [
        {
          id: "hoa-disputes",
          name: "HOA fee or fine disputes",
          example: "Your HOA fined you $1,500 without following the proper notice procedure under Tex. Prop. Code Ch. 209.",
          eligible: true,
          statute: "Tex. Prop. Code Ch. 209",
        },
        {
          id: "manufactured-home",
          name: "Manufactured home community disputes",
          example: "A mobile home park improperly cut off your utilities or kept fees.",
          eligible: true,
          statute: "Tex. Prop. Code Ch. 94",
        },
        {
          id: "rideshare-gig",
          name: "Rideshare or gig-economy disputes",
          example: "A gig platform owes you a $500 referral bonus they never paid.",
          eligible: true,
          notes: "Most major platforms have arbitration clauses in their terms. Check before filing.",
        },
        {
          id: "airbnb-deposit",
          name: "AirBnB or short-term rental deposit dispute",
          example: "An AirBnB host kept your $800 cleaning deposit claiming damages they can't document.",
          eligible: true,
        },
        {
          id: "scam-fraud",
          name: "Scam or fraud under $20,000",
          example: "You wired $4,000 to someone for what turned out to be a fake online sale.",
          eligible: true,
          notes: "Winning is one thing; collecting is harder. Often these defendants are judgment-proof or out of state.",
        },
        {
          id: "livestock-damage",
          name: "Livestock or farm damage",
          example: "A neighbor's cattle got onto your land and damaged $4,000 in crops.",
          eligible: true,
        },
        {
          id: "unauthorized-charges",
          name: "Unauthorized bank fees or charges",
          example: "A bank failed to honor a stop-payment, causing $600 in cascading overdrafts they refuse to refund.",
          eligible: true,
          notes: "Most major banks have arbitration clauses. Check what you signed.",
        },
      ],
    },
  ],

  whatYouCannotSueFor: [
    {
      category: "Eviction (Forcible Entry and Detainer)",
      explanation:
        "Justice courts handle evictions, but as a SEPARATE Rule 510 case, not as a small claim. To physically remove a tenant, you need an eviction case.",
      whereToGoInstead: "Eviction case (Rule 510) in the same Justice Court precinct",
    },
    {
      category: "Defamation (libel or slander)",
      explanation:
        "Texas Government Code § 27.031 explicitly bars justice courts from hearing defamation cases REGARDLESS of amount. Even if your claim is $5,000, JP court cannot hear it.",
      whereToGoInstead: "County Court at Law or District Court",
    },
    {
      category: "Title to land",
      explanation:
        "Justice courts cannot decide who owns real property. Quiet title, foreclosure, and boundary title disputes are off-limits.",
      whereToGoInstead: "District Court",
    },
    {
      category: "Divorce, child support, custody",
      explanation: "All family law matters are excluded from justice court.",
      whereToGoInstead: "Family law division of District Court",
    },
    {
      category: "Probate and estate matters",
      explanation: "Wills, executor disputes, and estate distribution must go to probate court.",
      whereToGoInstead: "County Probate Court or District Court",
    },
    {
      category: "Medical or legal malpractice",
      explanation:
        "Medical malpractice requires an expert report within 120 days under CPRC Ch. 74. Legal malpractice typically exceeds $20,000 and requires expert testimony. Neither works in JP court.",
      whereToGoInstead: "District Court with a malpractice lawyer",
    },
    {
      category: "Federal claims",
      explanation:
        "Bankruptcy, federal civil rights, patents, and copyright are exclusively federal.",
      whereToGoInstead: "Federal District Court",
    },
    {
      category: "Class actions",
      explanation: "Justice courts cannot certify class actions. Each plaintiff must file separately.",
      whereToGoInstead: "District Court",
    },
    {
      category: "Injunctions and orders to do or stop something",
      explanation:
        "Justice courts cannot order someone to perform, stop, or transfer property. Money judgments and recovery of specific personal property only.",
      whereToGoInstead: "District Court for injunctions; Civil harassment restraining orders also handled in District Court",
    },
    {
      category: "Workers' compensation",
      explanation:
        "If your employer subscribes to workers' comp, you cannot sue them. Disputes go through the Texas Department of Insurance Division of Workers' Compensation.",
      whereToGoInstead: "Texas DWC administrative process",
    },
    {
      category: "Cases against a government with no claim filed",
      explanation:
        "Suing a city, county, or state agency in tort requires a written notice of claim within 6 months (sometimes shorter under city charters). Without notice, your case is barred.",
      whereToGoInstead: "First file a notice of claim with the agency. Then likely District Court given sovereign immunity rules.",
    },
    {
      category: "Cases subject to mandatory arbitration",
      explanation:
        "If your contract has an enforceable arbitration clause and the defendant raises it, the JP must send the case to arbitration. Common in cell phone, banking, and gig-economy contracts.",
      whereToGoInstead: "Private arbitration per the contract",
    },
  ],

  damages: {
    compensatory: true,
    punitive: {
      available: false,
      explanation:
        "Common-law punitive damages are theoretically available in justice court but rarely awarded. Most punitive-style recoveries come from specific statutes (DTPA treble damages, security deposit triple, wrongful tow penalty) which the judge will apply if you prove the conditions.",
    },
    statutoryMultipliers: [
      {
        claim: "Bad-faith security deposit retention",
        multiplier: "3x wrongfully withheld + $100 + attorney fees",
        statute: "Tex. Prop. Code § 92.109",
      },
      {
        claim: "DTPA 'knowing' deceptive conduct",
        multiplier: "Up to 3x economic + 3x mental anguish damages, plus mandatory attorney fees",
        statute: "Tex. Bus. & Com. Code § 17.50",
      },
      {
        claim: "Bad check (NSF) service fee",
        multiplier: "Up to $30 per check",
        statute: "Tex. Bus. & Com. Code § 3.506",
      },
      {
        claim: "Wrongful tow",
        multiplier: "Up to $1,000 statutory damages plus tow fees, court costs, and attorney fees",
        statute: "Tex. Occ. Code Ch. 2308",
      },
      {
        claim: "Illegal lockout or utility cutoff",
        multiplier: "Actual damages + 1 month rent + $1,000",
        statute: "Tex. Prop. Code § 92.008, § 92.009",
      },
      {
        claim: "Retaliatory action by landlord",
        multiplier: "1 month rent + $500 + actual damages",
        statute: "Tex. Prop. Code § 92.333",
      },
      {
        claim: "Texas Debt Collection Act violation",
        multiplier: "$100 minimum per intentional violation + actual damages + attorney fees + DTPA tie-in (treble)",
        statute: "Tex. Fin. Code § 392.403",
      },
      {
        claim: "Identity theft civil penalty",
        multiplier: "$1,000 plus actual damages",
        statute: "Tex. Bus. & Com. Code § 521.151",
      },
    ],
    attorneyFees: {
      available: true,
      explanation:
        "Texas allows attorney fees in many situations, even in small claims. Tex. Civ. Prac. & Rem. Code § 38.001 lets you recover fees on most contract claims (oral or written) if you sent a written demand at least 30 days before suing. The DTPA, Texas Debt Collection Act, security deposit statute, and several others have their own fee-shift provisions. Pro se litigants cannot recover fees for their own time.",
    },
    interestRate: {
      rate: 5,
      type: "simple",
      statute: "Tex. Fin. Code § 304.003",
      notes:
        "Post-judgment interest is a floating rate tied to the federal prime rate, with a floor of 5% and a ceiling of 15%. Pre-judgment interest on liquidated contract sums is typically 6% per year (Tex. Fin. Code § 302.002).",
    },
    feesRecoverable: true,
  },

  whereToFile: {
    courtName: "Justice Court",
    parentCourt: "Texas Justice of the Peace Court System",
    venueRules: [
      {
        scenario: "Most cases (the default)",
        filingOptions: [
          "The county and precinct where the defendant resides",
        ],
      },
      {
        scenario: "Property damage or personal injury",
        filingOptions: [
          "Where the defendant resides",
          "Where the incident or majority of incidents occurred",
        ],
      },
      {
        scenario: "Contract disputes",
        filingOptions: [
          "Where the defendant resides",
          "Where the contract was to be performed",
          "Where the contract was breached",
        ],
      },
      {
        scenario: "Recovery of specific personal property",
        filingOptions: [
          "Where the property is located",
          "Where the defendant resides",
        ],
      },
      {
        scenario: "Defendant is a non-resident or address unknown",
        filingOptions: ["Where the plaintiff resides"],
      },
    ],
    consequencesOfWrongVenue:
      "If you file in the wrong county or precinct, the defendant has 21 days after answering to file a motion to transfer venue. The case will typically be transferred to the correct precinct or county (you pay a transfer fee). Justice court will not dismiss for venue if a proper venue is identified. Filing in the wrong place still wastes time and money.",
    eFilingAvailable: "yes",
    eFilingNotes:
      "Texas uses the eFileTexas system statewide. Attorneys are required to e-file in most counties. Self-represented filers are encouraged but not required to e-file. The portal includes a self-help interview that generates your petition for you.",
    eFilingPortal: "https://efiletexas.gov/",
  },

  fees: {
    tiers: [{ range: "All claims (flat fee)", amount: 54 }],
    frequentFiler: { threshold: 0, fee: 0 },
    serviceFees: [
      { method: "Constable or sheriff", amount: "$75 to $100", notes: "Per defendant. Varies slightly by county. Most reliable method." },
      { method: "Certified mail by clerk", amount: "$15 to $20", notes: "Only valid if defendant personally signs the green card. Often fails." },
      { method: "Private process server", amount: "$75 to $150", notes: "Must be a Texas-certified process server." },
    ],
    waiver: {
      forms: [
        { number: "Statement of Inability to Afford Payment of Court Costs", name: "Filed in lieu of paying fees" },
      ],
      eligibility: [
        "You receive Medicaid, SNAP (food stamps), SSI, TANF, or CHIP",
        "Your household income is below 125% of federal poverty",
        "Paying court costs would prevent you from paying for basic necessities",
      ],
      coverageNotes:
        "The Statement of Inability waives the filing fee, service fees, and most other court costs. The opposing party can challenge it. If granted, you owe nothing up front.",
    },
    otherFees: [
      { name: "Jury demand", amount: "$22", notes: "Must demand a jury at least 14 days before trial." },
      { name: "Subpoena issuance", amount: "$10", notes: "Plus $10/day witness fee." },
      { name: "Writ of execution (post-judgment)", amount: "About $200", notes: "Sheriff fee to execute the writ." },
      { name: "Abstract of judgment", amount: "$5 to $8", notes: "From the JP court for filing with the County Clerk." },
    ],
    feesRecoverableNotes:
      "If you win, the judgment will include the filing fee and service fees as 'court costs' the loser owes you (Tex. R. Civ. Proc. 505.2). The losing party reimburses your fees on top of the judgment.",
  },

  statuteOfLimitations: {
    entries: [
      {
        id: "written-contract",
        claim: "Written contract",
        years: 4,
        clockStart: "The date of breach (failure to perform or pay as agreed)",
        statute: "Tex. Civ. Prac. & Rem. Code § 16.004(a)(3)",
      },
      {
        id: "oral-contract",
        claim: "Oral contract",
        years: 4,
        clockStart: "The date of breach (or when performance was due)",
        statute: "Tex. Civ. Prac. & Rem. Code § 16.004",
        notes: "Texas treats oral and written contracts the same for limitations: 4 years.",
      },
      {
        id: "open-account",
        claim: "Open account or credit card debt",
        years: 4,
        clockStart: "The date of last charge, payment, or charge-off",
        statute: "Tex. Civ. Prac. & Rem. Code § 16.004",
        notes: "Partial payment resets the clock under § 16.065.",
      },
      {
        id: "promissory-note",
        claim: "Promissory note",
        years: 4,
        clockStart: "Note's due date, or date of acceleration if accelerated",
        statute: "Tex. Civ. Prac. & Rem. Code § 16.004",
      },
      {
        id: "personal-injury",
        claim: "Personal injury",
        years: 2,
        clockStart: "Date of injury",
        statute: "Tex. Civ. Prac. & Rem. Code § 16.003(a)",
      },
      {
        id: "property-damage",
        claim: "Property damage",
        years: 2,
        clockStart: "Date the damage occurred",
        statute: "Tex. Civ. Prac. & Rem. Code § 16.003(a)",
        notes: "Shorter than California (3 years). File quickly.",
      },
      {
        id: "fraud",
        claim: "Fraud",
        years: 4,
        clockStart: "When the fraud was discovered or reasonably should have been discovered",
        statute: "Tex. Civ. Prac. & Rem. Code § 16.004(a)(4)",
        notes: "Built-in discovery rule.",
      },
      {
        id: "dtpa",
        claim: "DTPA (consumer protection) claim",
        years: 2,
        clockStart: "Date of the deceptive act, or when discovered with reasonable diligence",
        statute: "Tex. Bus. & Com. Code § 17.565",
      },
      {
        id: "judgment-enforcement",
        claim: "Enforcing an existing judgment",
        years: 10,
        clockStart: "Date the judgment was signed",
        statute: "Tex. Civ. Prac. & Rem. Code § 34.001",
        notes: "After 10 years, judgment becomes dormant. Can be revived within 2 more years.",
      },
    ],
    discoveryRuleNotes:
      "Texas applies the discovery rule in fraud cases (built into the statute) and in some latent injury cases. For ordinary contract or property damage, the clock generally starts at the breach or damage event. If you didn't know about the harm right away, document when and how you discovered it.",
    tollingNotes:
      "The clock pauses if the defendant leaves Texas (§ 16.063), if the plaintiff is a minor or legally incompetent until disability is removed (§ 16.001), or in cases of fraudulent concealment by the defendant. The Texas saving statute (§ 16.064) gives you 60 days to refile in the correct court if your case was dismissed for lack of jurisdiction or venue and limitations would otherwise have run.",
  },

  preFiling: {
    demandLetterRequired: false,
    demandLetterRecommended: true,
    demandLetterNotes:
      "Texas doesn't require a demand letter for most claims, but two specific situations make it mandatory: contract claims where you want attorney fees (Tex. Civ. Prac. & Rem. Code § 38.002 requires a 30-day demand) and DTPA consumer claims (Tex. Bus. & Com. Code § 17.505 requires a 60-day demand). Skip these and you can lose your right to attorney fees and have your case paused.",
    governmentClaimRequired: true,
    governmentClaimNotes:
      "Suing a city, county, or state agency in tort requires a written notice of claim within 6 months (sometimes 90 days under specific city charters). Without proper notice, your case is barred. Tex. Civ. Prac. & Rem. Code § 101.101.",
    landlordTenantNotes:
      "For security deposit claims, you must provide your forwarding address in writing. The 30-day refund clock starts when you've moved out AND given that address. For repair-and-deduct, you must follow the strict notice procedure in Tex. Prop. Code § 92.0561.",
    consumerProtectionNotes:
      "DTPA claims require a 60-day pre-suit demand letter (§ 17.505). The Texas Theft Liability Act requires 30-day notice. Residential construction defect claims require 60-day notice and inspection opportunity (Tex. Prop. Code § 27.004).",
    arbitrationClauseNotes:
      "Unlike California, Texas does not protect small claims plaintiffs from arbitration clauses. If your contract requires arbitration and the defendant moves to compel it, the JP must send the case to arbitration. Common in cell phone, bank, AT&T, and many gig-economy agreements. Read what you signed.",
  },

  forms: [
    {
      number: "Petition (Small Claims)",
      name: "Original Petition",
      description: "Your main lawsuit form. Tells the court who you're suing, how much, and why. Generic petition or generated through eFileTexas's self-help interview.",
      whoFiles: "plaintiff",
      required: true,
      group: "starting",
    },
    {
      number: "Civil Case Information Sheet",
      name: "Justice Court Civil Case Information Sheet",
      description: "Required cover sheet with party contact info and case type. Filed alongside the petition.",
      whoFiles: "plaintiff",
      required: true,
      group: "starting",
    },
    {
      number: "Statement of Inability",
      name: "Statement of Inability to Afford Payment of Court Costs",
      description: "Asks the court to waive filing fees and service fees based on income or hardship.",
      whoFiles: "either",
      required: false,
      group: "fee-waiver",
    },
    {
      number: "Petition (Debt Claim)",
      name: "Debt Claim Petition (Rule 508)",
      description: "Used by debt collectors and assignees suing on consumer debt. Must include account number, last payment date, and a sworn statement of the debt.",
      whoFiles: "plaintiff",
      required: false,
      group: "starting",
    },
    {
      number: "Citation",
      name: "Citation (Summons)",
      description: "Court-issued notice to the defendant. Generated by the clerk; you don't fill it out.",
      whoFiles: "court",
      required: true,
      group: "service",
    },
    {
      number: "Return of Service",
      name: "Officer's or Server's Return",
      description: "Filed by whoever served the papers (constable, private server, or clerk for certified mail). Proves service was completed.",
      whoFiles: "either",
      required: true,
      group: "service",
    },
    {
      number: "Answer",
      name: "Defendant's Answer",
      description: "The defendant's written response. Due by the end of the 14th day after service. Can be a simple general denial.",
      whoFiles: "defendant",
      required: true,
      group: "starting",
    },
    {
      number: "Counterclaim Petition",
      name: "Defendant's Counterclaim",
      description: "If you're being sued and have your own claim against the plaintiff, file this to counter-sue. Same $20,000 cap applies.",
      whoFiles: "defendant",
      required: false,
      group: "counterclaim",
    },
    {
      number: "Military Status Affidavit",
      name: "Nonmilitary Affidavit",
      description: "Required at default judgment time under the Servicemembers Civil Relief Act. Confirms the defendant is not in active military service.",
      whoFiles: "plaintiff",
      required: false,
      group: "after-judgment",
    },
    {
      number: "Subpoena",
      name: "Witness Subpoena",
      description: "Compels a witness to attend the hearing or produce documents. $10 issuance fee plus $10/day witness fee.",
      whoFiles: "either",
      required: false,
      group: "hearing",
    },
    {
      number: "Jury Demand",
      name: "Demand for Jury Trial",
      description: "Optional. Either party can demand a six-person jury at least 14 days before trial. $22 fee.",
      whoFiles: "either",
      required: false,
      group: "hearing",
    },
    {
      number: "Motion for New Trial",
      name: "Motion to Set Aside Default or for New Trial",
      description: "If you missed the trial or got a default judgment, file within 14 days to ask the court to reopen.",
      whoFiles: "defendant",
      required: false,
      group: "after-judgment",
    },
    {
      number: "Notice of Appeal",
      name: "Appeal Bond, Cash Deposit, or Statement of Inability",
      description: "Either party can appeal to county court. 21-day deadline. Bond is 2x judgment for defendant or $500 for plaintiff appellant.",
      whoFiles: "either",
      required: false,
      group: "appeal",
    },
    {
      number: "Abstract of Judgment",
      name: "Abstract of Judgment",
      description: "Recorded with the County Clerk to create a lien on the loser's non-exempt real estate.",
      whoFiles: "plaintiff",
      required: false,
      group: "after-judgment",
    },
    {
      number: "Writ of Execution",
      name: "Writ of Execution",
      description: "Authorizes the sheriff or constable to seize and sell the loser's non-exempt assets to pay the judgment.",
      whoFiles: "plaintiff",
      required: false,
      group: "after-judgment",
    },
    {
      number: "Application for Writ of Garnishment",
      name: "Garnishment of Bank Account",
      description: "Allows you to freeze and seize money in the loser's bank account. Wages CANNOT be garnished in Texas.",
      whoFiles: "plaintiff",
      required: false,
      group: "after-judgment",
    },
    {
      number: "Release of Judgment",
      name: "Release of Judgment",
      description: "Filed once the judgment is paid in full. Clears the lien and the public record.",
      whoFiles: "plaintiff",
      required: false,
      group: "after-judgment",
    },
  ],

  service: {
    whoCanServe: [
      "Any sheriff or constable in Texas",
      "A Supreme Court-certified private process server",
      "The court clerk by certified mail (with restricted delivery, return receipt)",
      "An adult who is NOT a party to the case (with court permission for a specific case)",
    ],
    methods: [
      {
        name: "Personal service by constable or sheriff",
        description: "Most common and reliable. The constable hands the citation to the defendant in person.",
        pros: ["Highest success rate", "Filed return is straightforward"],
        cons: ["Costs $75 to $100 per defendant"],
      },
      {
        name: "Certified mail by court clerk",
        description: "The clerk sends the citation by certified mail, restricted delivery, return receipt requested. Only counts as valid service if the defendant personally signs.",
        pros: ["Cheap ($15 to $20)"],
        cons: ["Often fails when defendants don't sign or claim the mail"],
      },
      {
        name: "Substituted service",
        description:
          "If standard service fails after diligent attempts, the court can authorize leaving the citation with a person 16+ at the defendant's home or work, plus mailing a copy. Requires a court order.",
      },
      {
        name: "Service by publication",
        description: "Last resort if defendant's location is truly unknown. Notice published in a newspaper. Defendant gets 42 days from publication to answer.",
      },
    ],
    timing: { inCountyDays: 14, outOfCountyDays: 14 },
    proofFilingDeadlineDays: 0,
    proofForm: { number: "Return of Service", name: "Officer's or Server's Return" },
    businessServiceRules:
      "For a corporation or LLC, serve the registered agent listed with the Texas Secretary of State. If the agent can't be served after diligent attempts, you can serve the Secretary of State as agent for the company under Tex. Civ. Prac. & Rem. Code § 17.044. For partnerships, serve any general partner.",
    outOfStateNotes:
      "If your defendant is out of state but the dispute happened in Texas, you can usually still sue here under Texas's long-arm statute. You'll need to hire a process server in their state, since the court clerk only mails certified mail within Texas.",
    cantFindDefendant:
      "After diligent attempts (multiple visits at different times to known addresses), file a motion for substituted service with the court. Include an affidavit detailing what you tried. The judge can authorize leaving the papers at the defendant's home or workplace plus mailing a copy, or in extreme cases, publication in a newspaper.",
    avoidingService:
      "If a defendant runs from the door or refuses to take the papers, the constable can leave the papers in their presence after identifying themselves. That counts as valid service. A registered process server has more flexibility in timing and database tools to find current addresses.",
  },

  response: {
    defendantMustFileAnswer: true,
    responseNotes:
      "Unlike California, Texas REQUIRES the defendant to file a written answer within 14 days of service. A simple general denial is enough. If the 14th day falls on a weekend or holiday, the deadline extends to the next business day. The answer can be filed in person, by mail, or via eFileTexas.",
    defaultProcess:
      "If the defendant doesn't file a written answer by the 14-day deadline, the plaintiff can move for default judgment. For liquidated claims (a specific sum from a written contract or sworn account), the judge can enter default without a hearing. For unliquidated claims (property damage, personal injury), the plaintiff must testify at a 'prove-up' hearing to establish damages.",
    proveUpRequired: true,
    proveUpNotes:
      "Even on a default, the judge will require you to prove your damages by sworn testimony or affidavit. Bring contracts, invoices, photos, and any other proof. Show up empty-handed and the judge can award less than you asked or dismiss for lack of proof.",
    motionToVacateForm: { number: "Motion for New Trial", name: "Motion to Set Aside Default" },
    motionToVacateDeadlineDays: 14,
    motionToVacateLackOfNoticeDays: 30,
    motionToVacateAppealDeadlineDays: 21,
    motionToVacateAppealNotes:
      "If your motion for new trial is denied, you can appeal to county court within 21 days. The appeal is a fresh trial de novo, so you get a complete second chance.",
  },

  counterclaim: {
    allowed: true,
    form: { number: "Counterclaim Petition", name: "Defendant's Counterclaim" },
    sameMonetaryLimit: true,
    serviceDeadlineSameCountyDays: 0,
    serviceDeadlineOutOfCountyDays: 0,
    transferToHigherCourt: {
      available: false,
      notes:
        "Texas justice court counterclaims must stay within the $20,000 cap. If your counterclaim is bigger, you have two options: waive the excess and counterclaim within the cap, OR file a separate suit in county court (small claims doesn't have a clean transfer mechanism for over-cap counterclaims). Most defendants just waive the excess to keep everything in one place.",
    },
  },

  hearing: {
    attorneysAllowed: true,
    attorneysAllowedNotes:
      "Texas allows lawyers in justice court for both individuals and businesses. A business can also be represented by a non-lawyer employee, owner, officer, or partner under Tex. R. Civ. Proc. 500.4(b). You can come with or without a lawyer.",
    format:
      "Bench trial by default. Either party can demand a six-person jury at least 14 days before trial with a $22 fee. Each case typically gets 15 to 30 minutes per side.",
    presider: "Justice of the Peace (elected, may or may not be a lawyer)",
    burdenOfProof:
      "Preponderance of the evidence. The judge has to believe your version is more likely than not (over 50%) more credible than the defendant's.",
    whatToBring: [
      "Your filed petition with the court stamp",
      "Original contracts, invoices, and receipts",
      "Photos of damage or work (printed, three copies)",
      "Text messages and emails (printed and highlighted)",
      "Bank statements, cancelled checks, or payment proof",
      "Repair estimates from independent professionals",
      "A short timeline of what happened",
      "Any witness who saw the events (or a notarized statement)",
      "Three copies of every document: judge, opposing party, you",
      "Demand letters and proof of any pre-suit notices required (DTPA, attorney fees, etc.)",
    ],
    witnessSubpoenaForm: { number: "Subpoena", name: "Witness Subpoena", feePerDay: 10 },
    interpretersFree: true,
    interpreterNotes:
      "Texas courts provide free interpreters for non-English speakers and the deaf. Request one in advance through the court (use the JP's interpreter request form or call the clerk).",
    juryAllowed: true,
    decisionTiming:
      "JPs sometimes announce the decision on the spot, but often take it under advisement and mail the judgment within a few days to a few weeks.",
    mediationOnHearingDay: {
      offered: true,
      notes:
        "Many Texas counties (especially Bexar, Travis, Tarrant, Harris) refer small claims to free or low-cost mediation through Dispute Resolution Centers. Mediation is voluntary unless local rules require an attempt. If you settle, the agreement can be entered as a judgment.",
    },
  },

  appeals: {
    whoCanAppeal:
      "EITHER party can appeal in Texas. Unlike California, plaintiffs have full appeal rights even if their own claim was denied.",
    deadlineDays: 21,
    fee: 0,
    type: "de novo",
    typeNotes:
      "Small claims appeals get a brand-new trial in county court (county court at law in larger counties). The county judge isn't bound by the JP's decision. New evidence, new witnesses, lawyers fully allowed. The result can be better, worse, or the same as the JP's judgment.",
    attorneysAllowedOnAppeal: true,
    bondRequired: true,
    automaticStayOnFiling: true,
    notice: { form: "Appeal Bond", name: "Appeal Bond, Cash Deposit, or Statement of Inability" },
    frivolousPenalty: { available: false, cap: 0, notes: "Texas does not have a specific frivolous-appeal penalty in justice court like California's $150 cap." },
    defaultJudgmentNotAppealable: false,
    defaultJudgmentNotes:
      "Defendants who default in JP can either file a Motion for New Trial within 14 days OR appeal to county court within 21 days. Both routes are open. The appeal is a do-over, so it's often the better choice if you have a real defense.",
  },

  collection: {
    paymentDeadline: "Immediately after the judgment becomes final (no appeal filed within 21 days)",
    interestRate: 5,
    interestRateNotes:
      "Floating rate based on federal prime rate, with a floor of 5% and ceiling of 15%. As of 2026, expect 5% to 8% on most judgments. Tex. Fin. Code § 304.003.",
    methods: [
      {
        id: "voluntary-payment",
        name: "Demand letter for payment",
        blurb: "Send a polite demand. Often works.",
        description:
          "Send the loser a written demand for payment after the judgment becomes final, including the case number, judgment amount, accrued interest, and your preferred payment method. Many debtors pay once they realize liens and asset seizure are on the table.",
      },
      {
        id: "abstract-of-judgment",
        name: "Abstract of Judgment (real estate lien)",
        blurb: "Cheap, passive, very effective long-term.",
        description:
          "Get an Abstract of Judgment from the JP clerk and record it with the County Clerk in any county where the loser owns or might own non-homestead real estate. The lien attaches automatically. When they sell or refinance, you get paid out of escrow. Lasts 10 years, renewable.",
        forms: [{ number: "Abstract of Judgment", name: "Abstract of Judgment" }],
        estimatedCost: "$5 to $8 to issue, plus county recording fee",
        effectivenessNotes:
          "The Texas homestead exemption protects the loser's primary residence from forced sale, so the lien won't reach a homestead. But if they own rental properties, vacant land, or a second home, you can collect when they sell.",
      },
      {
        id: "writ-execution",
        name: "Writ of Execution (seize non-exempt assets)",
        blurb: "Sheriff seizes and auctions non-exempt property.",
        description:
          "Get a Writ of Execution from the clerk, give it to the sheriff or constable, and they'll attempt to seize the loser's non-exempt assets. Proceeds from the auction go to your judgment. Effective against businesses (no personal exemptions apply) and individuals with specific non-exempt assets like vacant land, second cars, boats, or jewelry beyond the personal property cap.",
        forms: [{ number: "Writ of Execution", name: "Writ of Execution" }],
        estimatedCost: "About $200 sheriff fee plus storage and auction costs",
      },
      {
        id: "bank-garnishment",
        name: "Writ of Garnishment (bank accounts)",
        blurb: "Freeze and seize money in their bank account.",
        description:
          "File an application for Writ of Garnishment. The bank gets served, freezes the account, and (after notice and any exemption claims) sends the money to you. Federal benefits like Social Security, SSI, unemployment, and veterans' benefits are exempt and protected automatically.",
      },
      {
        id: "turnover-order",
        name: "Turnover Order (Tex. Civ. Prac. & Rem. Code § 31.002)",
        blurb: "Court orders the loser to hand over hard-to-reach assets.",
        description:
          "If the loser has non-exempt property that's hard to seize (artwork, accounts receivable, stock in private companies), you can ask the court to order them to turn it over. Disobedience is contempt. Justice courts may not have full turnover authority; many creditors take their JP judgment to district court for this.",
      },
      {
        id: "judgment-debtor-discovery",
        name: "Post-judgment discovery (asset questions)",
        blurb: "Force the loser to disclose where their money is.",
        description:
          "Texas Rule 621a allows post-judgment discovery: written interrogatories, depositions, requests for documents about the debtor's assets. Justice court enforcement powers are limited; for serious cases, take the judgment to district court for full discovery powers.",
      },
      {
        id: "renew-judgment",
        name: "Renew the judgment (every 10 years)",
        blurb: "Keep the judgment alive past the 10-year dormancy mark.",
        description:
          "Texas judgments become dormant after 10 years if not enforced. File for revival within 2 years after dormancy (so you have effectively 12 years). Each writ of execution issued resets the dormancy clock.",
      },
    ],
    judgmentLifespanYears: 10,
    renewalProcess:
      "Before year 10 expires, file a writ of execution or apply to revive the judgment. If the judgment becomes dormant, you have 2 years to revive it. After that, the judgment is permanently unenforceable.",
    debtorExamForm: { number: "Rule 621a Discovery", name: "Post-Judgment Discovery" },
    exemptions: [
      "Wages earned for personal services (100% exempt from creditor garnishment, except for child/spousal support and certain federal debts)",
      "Homestead (primary residence, no dollar cap on value, just acreage)",
      "One vehicle per licensed adult in the household",
      "Tools and equipment used in the debtor's profession",
      "Most personal property up to $50,000 (single) or $100,000 (family) total fair market value",
      "Qualified retirement accounts (IRAs, 401(k)s, pensions)",
      "Workers' compensation, Social Security, unemployment, veterans' benefits, and other public benefits",
    ],
    bankruptcyNotes:
      "If the loser files bankruptcy, an automatic stay halts all collection. Most small-claims judgments get discharged in bankruptcy unless the underlying debt was for fraud, willful injury, or certain other carve-outs. If you suspect fraud, file a non-dischargeability complaint in the bankruptcy court within 60 days of the creditors' meeting.",
    satisfactionForm: { number: "Release of Judgment", name: "Release of Judgment" },
    priorityNotes:
      "Texas's strong debtor exemptions mean many judgment debtors are 'judgment-proof' in practice. Wages cannot be garnished, the homestead is protected, and most personal property falls under the exemption cap. Collection works best against businesses (no personal exemptions) or individuals with specific non-exempt assets (rental properties, second vehicles, business equipment, valuable collectibles).",
  },

  businesses: {
    representation:
      "Texas justice court explicitly allows businesses to be represented by a non-lawyer owner, officer, partner, or employee under Rule 500.4(b). You don't need a lawyer at all in JP court. (On appeal to county court, business entities typically need an attorney.)",
    canSendEmployee: true,
    canSendAttorney: true,
    insuranceAdjusterAllowed: true,
    fictitiousNameNotes:
      "Texas requires assumed name (DBA) certificates to be filed with the county clerk under Tex. Bus. & Com. Code Ch. 71. When suing a DBA, name the actual legal entity behind it (the LLC, corporation, or sole proprietor by name). Failing to do so can make your judgment unenforceable.",
    soleProprietorEmployeeException:
      "A sole proprietor running a business in their own name appears personally. Their employees can also represent the business in JP court under Rule 500.4(b).",
    outOfStateNotes:
      "Out-of-state corporations or LLCs that 'transact business' in Texas generally must be registered with the Texas Secretary of State to maintain a lawsuit (Tex. Bus. Org. Code § 9.051). For one-off transactions, this is rarely enforced. For ongoing Texas operations, register first.",
    licensingNotes:
      "If your trade requires a Texas license (electrician, plumber, contractor in some categories), make sure your licensing is in order. An unlicensed contractor can sometimes be barred from collecting on contracts.",
  },

  countyDifferences: [
    {
      county: "Harris (Houston)",
      differences: [
        { topic: "Precincts", detail: "8 precincts, each with two JP courts. File in the precinct covering the defendant's address." },
        { topic: "E-filing", detail: "Mandatory for attorneys; encouraged for self-represented filers." },
        { topic: "Mediation", detail: "Volunteer mediators from the Dispute Resolution Center often available on trial day." },
        { topic: "Service fee", detail: "Constable service typically $65 to $75 per defendant." },
      ],
    },
    {
      county: "Dallas",
      differences: [
        { topic: "Precincts", detail: "5 precincts. Forms downloadable from each JP's website." },
        { topic: "E-filing", detail: "Available through eFileTexas." },
      ],
    },
    {
      county: "Travis (Austin)",
      differences: [
        { topic: "Mediation", detail: "Most precincts standing-order refer cases to mediation through the local Dispute Resolution Center." },
        { topic: "E-filing", detail: "Strongly encouraged. Many JPs have moved to nearly all-electronic dockets." },
        { topic: "Pre-trial exchange", detail: "Travis County JP Precinct 5 requires exchange of evidence 14 days before trial." },
      ],
    },
    {
      county: "Bexar (San Antonio)",
      differences: [
        { topic: "Precincts", detail: "4 precincts." },
        { topic: "Mediation", detail: "JP courts refer many small claims to the local Dispute Resolution Center for free mediation before trial." },
      ],
    },
    {
      county: "Tarrant (Fort Worth)",
      differences: [
        { topic: "Mediation", detail: "Tarrant County ADR program often required to attempt mediation before trial." },
      ],
    },
  ],

  pitfalls: [
    {
      title: "Suing the wrong name",
      whatHappens:
        "You sue \"Joe's Plumbing\" but the actual legal entity is \"Joe Smith d/b/a Joe's Plumbing\" or \"JSP Services LLC.\" Your judgment becomes unenforceable.",
      howToAvoid:
        "Look up the business at the Texas Secretary of State (BizFileOnline) for corporations and LLCs. Check the county clerk's assumed name records for sole proprietors. Use the exact registered name on your petition.",
    },
    {
      title: "Bad service of process",
      whatHappens:
        "You serve the defendant yourself (you can't), or use uncertified mail, or have someone unauthorized hand them the papers. Service is invalid and the judge can't enter judgment.",
      howToAvoid:
        "Use the constable, sheriff, a Texas-certified private process server, or the court clerk's certified mail. Never serve yourself.",
    },
    {
      title: "Missing the answer deadline (defendants)",
      whatHappens:
        "You're a defendant who got served, didn't file a written answer within 14 days, and the plaintiff got a default judgment.",
      howToAvoid:
        "File a written answer (even a one-line general denial) within 14 days of service. If you've already missed it, file a Motion for New Trial within 14 days of the judgment, OR appeal to county court within 21 days.",
    },
    {
      title: "Missing the statute of limitations",
      whatHappens:
        "You file a property damage case 2 years and 1 month after the incident. Defendant raises limitations. Case dismissed.",
      howToAvoid:
        "Texas property damage and personal injury claims expire in 2 years (shorter than California). Contract claims (oral or written) get 4 years. File sooner rather than later.",
    },
    {
      title: "Missing pre-suit notice requirements",
      whatHappens:
        "You sue under the DTPA without sending the required 60-day demand letter. Court pauses your case and you lose attorney fees.",
      howToAvoid:
        "Send DTPA demands 60 days before filing (Tex. Bus. & Com. Code § 17.505). Send contract demands 30 days before filing if you want attorney fees (Tex. Civ. Prac. & Rem. Code § 38.002). Send government claim notices within 6 months for tort claims against cities or counties.",
    },
    {
      title: "Asking for the wrong remedy",
      whatHappens:
        "You ask the JP to order someone to fix something, return to work, or stop harassing you. Justice court can't grant injunctive relief. Case dismissed.",
      howToAvoid:
        "Convert what you want into money. \"Make them finish the job\" becomes \"$X to hire someone else to finish.\" \"Stop harassing me\" goes to a different court (civil harassment in district court).",
    },
    {
      title: "Suing for defamation",
      whatHappens:
        "Your case is dismissed because Tex. Gov. Code § 27.031(b) bars JP courts from ALL defamation cases regardless of amount.",
      howToAvoid: "Defamation goes to county court at law or district court only.",
    },
    {
      title: "Winning against a judgment-proof defendant",
      whatHappens:
        "You win, but the defendant has only exempt assets (homestead, primary car, wages). Texas's strong exemptions make collection difficult.",
      howToAvoid:
        "Before suing, gauge whether the defendant has any non-exempt assets. Wages cannot be garnished in Texas. A homestead can't be forced into sale. If the defendant has a job and only one vehicle, collection may yield nothing. Consider a partial settlement before suit.",
    },
    {
      title: "Ignoring the arbitration clause",
      whatHappens:
        "You sue your cell carrier or bank in JP court. The defendant moves to compel arbitration under your contract's arbitration clause. JP court must dismiss or stay your case.",
      howToAvoid:
        "Read the contract. If there's an arbitration clause, you may need to arbitrate instead of sue. Some clauses have small-claims carve-outs; check yours.",
    },
  ],

  recentChanges: [
    {
      date: "2020-09-01",
      title: "Jurisdictional limit raised from $10,000 to $20,000",
      description:
        "Senate Bill 2342 (2019) doubled the justice court civil jurisdictional limit. This is the highest small claims cap in the country and applies equally to individuals and businesses.",
      bill: "SB 2342 (2019)",
    },
    {
      date: "2022-01-01",
      title: "Statewide standardization of filing fees",
      description:
        "House Bill 3774 (2021) standardized civil filing fees in justice courts statewide at approximately $54. Eliminated the patchwork of county-specific add-ons.",
      bill: "HB 3774 (2021)",
    },
    {
      date: "2020-07-01",
      title: "E-filing required for attorneys in Justice Courts",
      description:
        "eFileTexas e-filing became mandatory for attorneys in most Justice Courts. Self-represented litigants are still allowed to file in person or by mail.",
    },
    {
      date: "2023-09-01",
      title: "Attorney fees in consumer debt default judgments restricted",
      description:
        "House Bill 491 (2023) limits when attorney fees can be awarded on default judgments in consumer debt collection cases. Prevents debt buyers from automatically collecting high fees on default.",
      bill: "HB 491 (2023)",
    },
    {
      date: "2021-09-01",
      title: "Tex. Prop. Code § 92.109 strengthened (security deposits)",
      description:
        "House Bill 1540 (2021) clarified the bad-faith presumption when landlords don't sign the itemized deductions list, making it easier for tenants to win triple damages.",
      bill: "HB 1540 (2021)",
    },
  ],

  faqs: [
    {
      question: "Do I need a lawyer for small claims in Texas?",
      answer:
        "No. Texas allows lawyers in justice court but doesn't require them. Even a business can be represented by a non-lawyer owner, officer, or employee under Rule 500.4(b). Most small claims cases are handled without lawyers.",
    },
    {
      question: "How long does small claims take from filing to hearing?",
      answer:
        "Most cases get a hearing date 30 to 90 days after the defendant's 14-day answer deadline. Complex cases or those with multiple continuances can take longer. After the hearing, the judge usually rules within a few weeks.",
    },
    {
      question: "What's the maximum I can sue for in Texas small claims?",
      answer:
        "$20,000. Texas has the highest small claims cap in the country. Unlike many states, the cap is the same for individuals and businesses. The $20,000 excludes statutory interest and court costs but includes attorney fees if you're claiming them.",
    },
    {
      question: "What happens if the defendant doesn't show up?",
      answer:
        "If the defendant doesn't file a written answer within 14 days of service, the plaintiff can move for default judgment. The judge will check that service was proper and may either enter the judgment without a hearing (for liquidated debts) or hold a brief 'prove-up' hearing where you testify about your damages.",
    },
    {
      question: "Can I appeal if I lose?",
      answer:
        "Yes. Either party can appeal to county court within 21 days. The appeal is a fresh trial de novo, so you get a complete second chance with new evidence and full procedure. Defendants must post a bond of 2x the judgment (or cash deposit). Plaintiffs post a flat $500 bond. If you can't afford it, file a Statement of Inability.",
    },
    {
      question: "Why can't I garnish wages in Texas?",
      answer:
        "Texas's constitution exempts wages from creditor garnishment for most debts. The only exceptions are child support, spousal maintenance, and certain federal debts (taxes, student loans). For consumer or business judgments, you can never garnish wages. You CAN garnish bank accounts (after wages are deposited and become 'funds'), but Social Security, unemployment, and other federal benefits stay exempt.",
    },
    {
      question: "Can I sue someone in another state?",
      answer:
        "Sometimes. Texas has long-arm jurisdiction if the dispute happened in Texas or with a Texas resident. You'll need to serve them out of state (the court clerk doesn't mail outside Texas). And even if you win, collecting from someone in another state means going through their state's courts to enforce the judgment.",
    },
    {
      question: "What's the difference between small claims and county court?",
      answer:
        "Justice court (small claims) handles cases up to $20,000 with informal procedure, no formal discovery, and no required attorney. County court at law handles cases up to about $250,000, has formal procedure, allows discovery, and typically expects attorney representation. Small claims is faster and cheaper for cases under $20,000.",
    },
  ],

  sources: [
    {
      label: "Tex. Gov. Code § 27.031 (justice court jurisdiction)",
      url: "https://statutes.capitol.texas.gov/Docs/GV/htm/GV.27.htm",
      citation: "Tex. Gov. Code § 27.031",
    },
    {
      label: "Texas Rules of Civil Procedure, Part V (Rules 500-510)",
      url: "https://www.txcourts.gov/rules-forms/rules-standards/justice-court/",
    },
    {
      label: "Tex. Civ. Prac. & Rem. Code Ch. 16 (statutes of limitations)",
      url: "https://statutes.capitol.texas.gov/Docs/CP/htm/CP.16.htm",
      citation: "Tex. Civ. Prac. & Rem. Code Ch. 16",
    },
    {
      label: "Tex. Bus. & Com. Code Ch. 17 (DTPA)",
      url: "https://statutes.capitol.texas.gov/Docs/BC/htm/BC.17.htm",
      citation: "Tex. Bus. & Com. Code § 17.41 et seq.",
    },
    {
      label: "Tex. Prop. Code § 92.109 (security deposit penalty)",
      url: "https://statutes.capitol.texas.gov/Docs/PR/htm/PR.92.htm#92.109",
      citation: "Tex. Prop. Code § 92.109",
    },
    {
      label: "Tex. Fin. Code Ch. 392 (Texas Debt Collection Act)",
      url: "https://statutes.capitol.texas.gov/Docs/FI/htm/FI.392.htm",
      citation: "Tex. Fin. Code Ch. 392",
    },
    {
      label: "Tex. Occ. Code Ch. 2308 (vehicle towing)",
      url: "https://statutes.capitol.texas.gov/Docs/OC/htm/OC.2308.htm",
      citation: "Tex. Occ. Code Ch. 2308",
    },
    {
      label: "Tex. Civ. Prac. & Rem. Code § 38.001 (attorney fees)",
      url: "https://statutes.capitol.texas.gov/Docs/CP/htm/CP.38.htm",
      citation: "Tex. Civ. Prac. & Rem. Code § 38.001",
    },
    {
      label: "Texas State Law Library: Small Claims Self-Help",
      url: "https://guides.sll.texas.gov/small-claims",
    },
    {
      label: "eFileTexas",
      url: "https://efiletexas.gov/",
    },
    {
      label: "Texas Constitution Article XVI § 28 (wage exemption)",
      url: "https://statutes.capitol.texas.gov/?link=CN",
      citation: "Tex. Const. art. XVI, § 28",
    },
    {
      label: "SB 2342 (2019): jurisdictional limit increase to $20,000",
      url: "https://capitol.texas.gov/tlodocs/86R/billtext/html/SB02342I.htm",
      citation: "SB 2342 (2019)",
    },
  ],
};

// StateGuide schema. One file per state in /data implements this contract.
// Designed so a single page template renders any state.

export type Money = number; // dollars, no formatting

export interface StateGuide {
  state: string; // "California"
  slug: string; // "california"
  abbr: string; // "CA"
  lastUpdated: string; // ISO date

  /** 5-second hero summary. Three numbers + a short tagline. */
  hero: {
    individualLimit: Money;
    businessLimit: Money;
    typicalTimelineDays: { min: number; max: number };
    filingFeeLow: Money;
    filingFeeHigh: Money;
    tagline: string; // "Get back what you're owed without a lawyer."
  };

  /** Sticky strip of key facts. */
  ataGlance: AtAGlanceFact[];

  /** Section 1 + 13: jurisdictional and entity-type limits. */
  limits: {
    individual: Money;
    business: Money;
    guarantorWithFee?: Money;
    guarantorWithoutFee?: Money;
    annualCap: { count: number; threshold: Money }; // "2 cases per year over $2,500"
    splitClaimsAllowed: boolean;
    splitClaimsExplanation: string;
    statute: string; // e.g., "Cal. Code Civ. Proc. § 116.221"
  };

  /** Section 2: claim categories with examples. The biggest content section. */
  whatYouCanSueFor: ClaimCategory[];
  whatYouCannotSueFor: Exclusion[];

  /** Damages: what kinds of recovery are available beyond actuals. */
  damages: {
    compensatory: boolean;
    punitive: { available: boolean; explanation: string };
    statutoryMultipliers: StatutoryMultiplier[];
    attorneyFees: { available: boolean; explanation: string };
    interestRate: { rate: number; type: "simple" | "compound"; statute?: string; notes?: string };
    feesRecoverable: boolean;
  };

  /** Section 3: where to file. */
  whereToFile: {
    courtName: string;
    parentCourt: string;
    venueRules: VenueRule[];
    consequencesOfWrongVenue: string;
    eFilingAvailable: "yes" | "no" | "varies";
    eFilingNotes: string;
    eFilingPortal?: string;
  };

  /** Section 4: filing fees + waiver. */
  fees: {
    tiers: FeeTier[];
    frequentFiler: { threshold: number; fee: Money };
    serviceFees: ServiceFee[];
    waiver: {
      forms: { number: string; name: string; url?: string }[];
      eligibility: string[];
      coverageNotes: string;
    };
    otherFees: { name: string; amount: string; notes?: string }[];
    feesRecoverableNotes?: string;
  };

  /** Section 5: SOL by claim type. Drives the SOL checker widget. */
  statuteOfLimitations: {
    entries: StatuteOfLimitationsEntry[];
    discoveryRuleNotes: string;
    tollingNotes: string;
  };

  /** Section 6. */
  preFiling: {
    demandLetterRequired: boolean;
    demandLetterRecommended: boolean;
    demandLetterNotes: string;
    governmentClaimRequired: boolean;
    governmentClaimNotes?: string;
    landlordTenantNotes?: string;
    consumerProtectionNotes?: string;
    arbitrationClauseNotes: string;
  };

  /** Section 7: forms. Drives the forms hub. */
  forms: Form[];

  /** Section 8: service of process. */
  service: {
    whoCanServe: string[];
    methods: ServiceMethod[];
    timing: { inCountyDays: number; outOfCountyDays: number };
    proofFilingDeadlineDays: number;
    proofForm: { number: string; name: string };
    businessServiceRules: string;
    outOfStateNotes: string;
    cantFindDefendant: string;
    avoidingService: string;
  };

  /** Section 9: defendant response and default. */
  response: {
    defendantMustFileAnswer: boolean;
    responseNotes: string;
    defaultProcess: string;
    proveUpRequired: boolean;
    proveUpNotes: string;
    motionToVacateForm: { number: string; name: string };
    motionToVacateDeadlineDays: number;
    motionToVacateLackOfNoticeDays: number;
    motionToVacateAppealDeadlineDays: number;
    motionToVacateAppealNotes: string;
  };

  /** Counterclaim mechanics (defendant suing back). */
  counterclaim: {
    allowed: boolean;
    form: { number: string; name: string };
    sameMonetaryLimit: boolean;
    serviceDeadlineSameCountyDays: number;
    serviceDeadlineOutOfCountyDays: number;
    transferToHigherCourt: {
      available: boolean;
      statute?: string;
      notes: string;
    };
  };

  /** Section 10: hearing. */
  hearing: {
    attorneysAllowed: boolean;
    attorneysAllowedNotes: string;
    format: string; // "bench trial, 10 to 15 minutes per case"
    presider: string; // "judge or commissioner"
    burdenOfProof: string;
    whatToBring: string[];
    witnessSubpoenaForm?: { number: string; name: string; feePerDay?: Money };
    interpretersFree: boolean;
    interpreterNotes: string;
    juryAllowed: boolean;
    decisionTiming: string; // "Usually mailed within 1 to 4 weeks"
    mediationOnHearingDay: { offered: boolean; notes: string };
  };

  /** Section 11: appeals. */
  appeals: {
    whoCanAppeal: string;
    deadlineDays: number;
    fee: Money;
    type: "de novo" | "on the record" | "other";
    typeNotes: string;
    attorneysAllowedOnAppeal: boolean;
    bondRequired: boolean;
    automaticStayOnFiling: boolean;
    notice: { form: string; name: string };
    frivolousPenalty?: { available: boolean; cap: Money; statute?: string; notes: string };
    defaultJudgmentNotAppealable: boolean;
    defaultJudgmentNotes: string;
  };

  /** Section 12: post-judgment collection. The most-skipped section. */
  collection: {
    paymentDeadline: string; // "30 days" or "immediately"
    interestRate: number;
    interestRateNotes: string;
    methods: CollectionMethod[];
    judgmentLifespanYears: number;
    renewalProcess: string;
    debtorExamForm: { number: string; name: string };
    exemptions: string[];
    bankruptcyNotes: string;
    satisfactionForm: { number: string; name: string };
    priorityNotes: string;
  };

  /** Section 13: business-specific rules. */
  businesses: {
    representation: string;
    canSendEmployee: boolean;
    canSendAttorney: boolean;
    representationForm?: { number: string; name: string };
    insuranceAdjusterAllowed: boolean;
    fictitiousNameForm?: { number: string; name: string };
    fictitiousNameNotes?: string;
    soleProprietorEmployeeException?: string;
    outOfStateNotes: string;
    licensingNotes?: string;
  };

  /** Section 14: county-level differences. */
  countyDifferences: CountyDifference[];

  /** Section 15: pitfalls. */
  pitfalls: Pitfall[];

  /** Section 16: recent changes. */
  recentChanges: RecentChange[];

  /** FAQ block (5 to 8 highest-volume questions). */
  faqs: FAQ[];

  /** Sources block (collapsed by default). */
  sources: Source[];
}

// ── building blocks ────────────────────────────────────────────────

export interface AtAGlanceFact {
  label: string;
  value: string;
  detail?: string;
}

export interface ClaimCategory {
  id: string; // url-friendly slug for deep links: "contracts", "consumer", "landlord-tenant"
  title: string;
  blurb: string; // 1-2 sentence intro to the category
  claims: Claim[];
}

export interface Claim {
  id: string;
  name: string; // "Unreturned security deposit"
  example: string; // "Your landlord kept your $2,000 deposit without itemizing damage."
  eligible: boolean;
  notes?: string; // state-specific quirks
  statute?: string; // "Cal. Civ. Code § 1950.5"
  damageBoost?: string; // "Bad-faith retention can double or triple your recovery."
}

export interface Exclusion {
  category: string; // "Eviction"
  explanation: string;
  whereToGoInstead?: string;
}

export interface StatutoryMultiplier {
  claim: string; // "Bad-faith security deposit retention"
  multiplier: string; // "Up to 2x"
  statute: string;
}

export interface VenueRule {
  scenario: string; // "If your case is about a contract"
  filingOptions: string[]; // ["Where the contract was signed", "Where it was supposed to be performed", ...]
}

export interface FeeTier {
  range: string; // "$0 to $1,500"
  amount: Money;
}

export interface ServiceFee {
  method: string; // "County sheriff"
  amount: string; // "$40 to $50"
  notes?: string;
}

export interface StatuteOfLimitationsEntry {
  id: string;
  claim: string; // "Written contract"
  years: number;
  clockStart: string; // "Date the contract was broken"
  statute?: string;
  notes?: string;
}

export type FormGroup =
  | "starting"
  | "service"
  | "hearing"
  | "counterclaim"
  | "after-judgment"
  | "fee-waiver"
  | "appeal";

export interface Form {
  number: string; // "SC-100"
  name: string; // "Plaintiff's Claim and ORDER to Go to Small Claims Court"
  description: string; // plain-English: what this form does
  whoFiles: "plaintiff" | "defendant" | "either" | "court";
  required: boolean;
  group: FormGroup;
  url?: string;
}

export interface ServiceMethod {
  name: string; // "Personal service"
  description: string;
  pros?: string[];
  cons?: string[];
}

export interface CollectionMethod {
  id: string;
  name: string; // "Wage garnishment"
  blurb: string; // one-line summary
  description: string; // plain-English walkthrough
  forms?: { number: string; name: string }[];
  estimatedCost?: string;
  effectivenessNotes?: string;
  exemptions?: string[];
}

export interface CountyDifference {
  county: string; // "Los Angeles"
  differences: { topic: string; detail: string }[];
}

export interface Pitfall {
  title: string;
  whatHappens: string; // the failure mode
  howToAvoid: string;
}

export interface RecentChange {
  date: string; // "2024-01-01" ISO format
  title: string;
  description: string;
  bill?: string; // "SB 71"
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Source {
  label: string;
  url: string;
  citation?: string; // "Cal. Code Civ. Proc. § 116.221"
}

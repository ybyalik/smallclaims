import type { ProductKey } from "../../lib/stripe";

export interface CheckoutTier {
  key: ProductKey;
  name: string;
  priceCents: number;
  strikeCents?: number;
  tagline: string;
  features: string[];
  badge?: string;
}

export interface CheckoutAddon {
  key: ProductKey;
  name: string;
  priceCents: number;
  meta: string;
  bundledIn?: ProductKey;
}

// Product-specific question. Persists to case.intake_answers[key] when the
// user picks a value. Required questions block the Pay button until
// answered. Used right now for the demand-letter "do you want to threaten
// a lawsuit" consent; other products can add their own later.
export interface CheckoutQuestion {
  key: string;
  label: string;
  helpText?: string;
  required: boolean;
  options: Array<{ value: string; label: string; description?: string }>;
}

export interface CheckoutConfig {
  productKey: ProductKey;
  apiEndpoint: (caseId: string) => string;
  eyebrow: string;
  buildTitle: (recipientName: string) => string;
  lede: string;
  whatYouGet: Array<{ title: string; body: string }>;
  trustBadges: string[];
  tiers?: CheckoutTier[];
  addons?: CheckoutAddon[];
  fixedPriceCents?: number;
  fixedProductName?: string;
  questions?: CheckoutQuestion[];
  captureMethod: "manual" | "automatic";
  submitLabelBuilder: (dollars: string) => string;
  payNote: (dollars: string) => string;
  successUrlBuilder: (caseId: string) => string;
}

export const DEMAND_LETTER_CONFIG: CheckoutConfig = {
  productKey: "tier_full_pressure",
  apiEndpoint: (caseId) => `/api/demand-letters/${caseId}/payment-intent`,
  eyebrow: "Demand Letter",
  buildTitle: (n) =>
    n ? `Send a demand letter to ${n}` : "Send your demand letter",
  lede: "About 65% of disputes resolve when a professional demand letter shows up from a neutral third party. Here's what you'll get when you authorize this.",
  whatYouGet: [
    {
      title: "Professional demand letter, drafted from your facts.",
      body: "Built specifically for your dispute, not a fill-in-the-blank template. Attorney-reviewed format that holds up in small-claims court.",
    },
    {
      title: "Mailed under the CivilCase brand, not your name.",
      body: "Letters from a neutral third party get response rates several times higher than self-sent. The defendant sees this is no longer a personal disagreement.",
    },
    {
      title: "USPS Certified Mail with tracking and return receipt.",
      body: "Legal proof of delivery that small-claims courts accept as evidence of the demand.",
    },
    {
      title: "14-day response window written into the letter.",
      body: "Clear, firm deadline that creates urgency and sets up your next move if the defendant ignores it.",
    },
    {
      title: "One-tap escalation to filing if they don't pay.",
      body: "If the demand goes unanswered, you can move straight to the Filing Guide for your state without re-entering your case.",
    },
  ],
  trustBadges: [
    "Attorney-reviewed format",
    "USPS Certified Mail",
    "Sent from CivilCase, not you",
    "100% refund if we can't send it",
  ],
  tiers: [
    {
      key: "tier_send_letter",
      name: "Send the Letter",
      priceCents: 2900,
      tagline: "About 65% of cases resolve here.",
      features: [
        "AI-drafted demand letter, attorney-reviewed format",
        "We mail it from CivilCase, not from you (more leverage)",
        "Certified mail with USPS tracking",
        "14-day response deadline written into the letter",
        "You control the send date",
      ],
    },
    {
      key: "tier_full_pressure",
      name: "Full Pressure",
      priceCents: 4900,
      strikeCents: 7900,
      tagline: "Resolves 2x more cases. Built for stubborn debtors.",
      badge: "MOST POPULAR",
      features: [
        "Everything in Send the Letter, plus:",
        "Voice of Justice phone calls on days 3, 7, 11",
        "Escalating email follow-ups on days 2, 5, 8, 12",
        "Final Notice letter on day 10 with stronger language",
        "One-tap Escalate to Filing if they don't pay",
      ],
    },
  ],
  addons: [
    {
      key: "addon_expedite",
      name: "Expedite 24 hours",
      priceCents: 4995,
      meta: "Letter prepared and dispatched within 24 hours",
    },
    {
      key: "addon_overnight",
      name: "Overnight shipping",
      priceCents: 2995,
      meta: "Next-day USPS Express Mail",
    },
    {
      key: "addon_skip_trace",
      name: "Skip-Trace",
      priceCents: 8000,
      meta: "Auto-added when you don't have an address",
    },
    {
      key: "addon_voice_of_justice",
      name: "Voice of Justice",
      priceCents: 2900,
      meta: "Phone follow-ups (included in Full Pressure)",
      bundledIn: "tier_full_pressure",
    },
    {
      key: "addon_case_brief",
      name: "Case Brief (attorney memo)",
      priceCents: 9800,
      meta: "Attorney memo on the area of law, 7-10 business days",
    },
  ],
  questions: [
    {
      key: "lawsuit_threat_consent",
      label: "Should the letter say you'll file in small claims court if not paid?",
      helpText:
        "Naming small claims court as the consequence is the strongest signal. Picking 'No' keeps the letter as a firm payment demand without committing you to file. You can change your mind and file later either way.",
      required: true,
      options: [
        {
          value: "yes",
          label: "Yes, include the small claims threat",
          description:
            "The letter states that if payment isn't received by the deadline, you'll file a claim in small claims court for the amount, interest, and recoverable costs.",
        },
        {
          value: "no",
          label: "No, just demand payment",
          description:
            "The letter firmly demands payment by the deadline and closes by noting you expect the matter to be taken seriously. It does not mention court.",
        },
      ],
    },
  ],
  captureMethod: "automatic",
  submitLabelBuilder: (d) => `Pay $${d}`,
  payNote: () =>
    "Your card is charged immediately. Our paralegal team reviews and dispatches your letter within 24 to 48 hours. If we can't send it for any reason, you get a full refund.",
  successUrlBuilder: (caseId) => `/case/${caseId}/buy/demand-letter/success`,
};

export const FILING_GUIDE_CONFIG: CheckoutConfig = {
  productKey: "filing_guide",
  apiEndpoint: (caseId) => `/api/cases/${caseId}/file/payment-intent`,
  eyebrow: "Filing Guide",
  buildTitle: () => "Your specific case, your specific court",
  lede:
    "The hardest part of small-claims court isn't the fight, it's figuring out where to file, what forms to bring, how to pay, and how to serve the defendant. Get it wrong and the clerk hands your packet back. Get it right and you have a court date in 30 to 60 days.",
  whatYouGet: [
    {
      title: "Where to file in your state.",
      body: "The exact court name, parent court, venue rules, and what happens if you pick the wrong county.",
    },
    {
      title: "Filing fees and waiver eligibility.",
      body: "What you pay based on your claim amount, and whether you qualify for a fee waiver.",
    },
    {
      title: "The forms you need.",
      body: "Form numbers, names, and direct links from your state's Judicial Council.",
    },
    {
      title: "Service of process.",
      body: "Who can serve, methods allowed, timing, the proof-of-service form, and what to do if you can't find the defendant.",
    },
    {
      title: "Hearing day.",
      body: "What to bring, who can speak, format, and how the decision typically gets delivered.",
    },
    {
      title: "County-specific notes.",
      body: "Where county procedure differs from the statewide default.",
    },
  ],
  trustBadges: [
    "State- and county-specific",
    "Instant access after payment",
    "100% refund within 7 days",
    "Court venue verified",
  ],
  fixedPriceCents: 7900,
  fixedProductName: "Filing Guide",
  captureMethod: "automatic",
  submitLabelBuilder: (d) => `Pay $${d}`,
  payNote: () =>
    "Your card is charged immediately and you get instant access to the guide. If it's not useful, contact support within 7 days for a full refund.",
  successUrlBuilder: (caseId) => `/case/${caseId}/buy/filing-guide/success`,
};

export const COLLECTION_PLAN_CONFIG: CheckoutConfig = {
  productKey: "collection_plan",
  apiEndpoint: (caseId) => `/api/cases/${caseId}/collection-plan/payment-intent`,
  eyebrow: "Post-Judgment Collection Plan",
  buildTitle: () => "Won the case? Now actually collect the money.",
  lede:
    "Winning a small-claims judgment is step one. Collecting the money is step two, and most people never finish step two. Your plan is built from your state's collection toolkit, your county's specific forms and fees, and what you already know about the defendant.",
  whatYouGet: [
    {
      title: "A ranked plan tailored to your case.",
      body: "If you know where the defendant works, wage garnishment leads. If you know they own property, a lien leads. If you know neither, a debtor's exam goes first to surface assets under oath.",
    },
    {
      title: "Your county's exact forms and fees.",
      body: "Writ of execution form code, wage garnishment paperwork, bank levy filing, debtor's exam subpoena, abstract of judgment recording fee. With direct links to the actual PDFs.",
    },
    {
      title: "Sheriff and recorder contacts.",
      body: "Who serves the writ, what they charge, where to drop off the paperwork, and how long each step typically takes.",
    },
    {
      title: "What's protected from collection in your state.",
      body: "The exemption schedule (homestead, vehicle, retirement, federal benefits, wildcard) with dollar amounts and statutes, so you know which assets are reachable and which aren't.",
    },
    {
      title: "Honest cost-benefit per method.",
      body: "What each step costs upfront, how long it takes, and a realistic recovery estimate. If a method isn't worth your time at this dollar amount, we say so.",
    },
    {
      title: "How to keep your judgment alive.",
      body: "Judgment renewal deadlines, post-judgment interest rates, and what happens if the defendant files bankruptcy.",
    },
  ],
  trustBadges: [
    "Custom to your state and county",
    "Generated in about 5 minutes",
    "100% refund within 7 days",
    "Plain-English, no jargon",
  ],
  fixedPriceCents: 4900,
  fixedProductName: "Post-Judgment Collection Plan",
  captureMethod: "automatic",
  submitLabelBuilder: (d) => `Pay $${d}`,
  payNote: () =>
    "Your card is charged immediately. We start building your plan right away and email you the moment it's ready. If you don't find it useful, contact support within 7 days for a full refund.",
  successUrlBuilder: (caseId) => `/case/${caseId}/buy/collection-plan/success`,
  questions: [
    {
      key: "collection_knows_employer",
      label: "Do you know where the defendant works?",
      helpText:
        "If yes, wage garnishment becomes the most reliable collection method. You'll need their employer's name and address.",
      required: true,
      options: [
        { value: "yes", label: "Yes, I know their employer" },
        { value: "no", label: "No, or I'm not sure" },
      ],
    },
    {
      key: "collection_knows_real_property",
      label: "Do you know if the defendant owns real estate?",
      helpText:
        "If yes, we can file a lien against the property. The lien survives until they sell or refinance.",
      required: true,
      options: [
        { value: "yes", label: "Yes, they own real estate I can name" },
        { value: "no", label: "No, or I'm not sure" },
      ],
    },
    {
      key: "collection_knows_bank",
      label: "Do you know where the defendant banks?",
      helpText:
        "If you have a check they wrote you or know their bank, a one-shot levy of the account becomes an option.",
      required: true,
      options: [
        { value: "yes", label: "Yes, I have a check from them or know their bank" },
        { value: "no", label: "No" },
      ],
    },
  ],
};

export type ProductKind = "demand-letter" | "filing-guide" | "collection-plan";

export const CHECKOUT_CONFIGS: Record<ProductKind, CheckoutConfig> = {
  "demand-letter": DEMAND_LETTER_CONFIG,
  "filing-guide": FILING_GUIDE_CONFIG,
  "collection-plan": COLLECTION_PLAN_CONFIG,
};

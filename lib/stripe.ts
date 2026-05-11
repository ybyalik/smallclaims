// Server-side Stripe client.
// Used by /api/checkout/session and /api/webhooks/stripe.

import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (_stripe) return _stripe;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY not set");
  _stripe = new Stripe(key);
  return _stripe;
}

// Product catalog. Add new products here as new tiers ship.
export const PRODUCTS = {
  // Legacy (kept for the old /dashboard/cases/[id]/letter download flow)
  demand_letter_download: {
    name: "Demand Letter Download",
    description: "Formatted PDF of your CivilCase demand letter, plus plain-text copy.",
    amount_cents: 3900,
    currency: "usd",
  },
  // New tiered demand-letter products (wizard, Phase 5)
  tier_send_letter: {
    name: "Send the Letter",
    description:
      "AI-drafted demand letter sent via certified mail under the CivilCase brand. 14-day response deadline written into the letter.",
    amount_cents: 2900,
    currency: "usd",
  },
  tier_full_pressure: {
    name: "Full Pressure",
    description:
      "Everything in Send the Letter plus Voice of Justice phone calls, escalating email follow-ups, and a Final Notice letter on day 10.",
    amount_cents: 4900,
    currency: "usd",
  },
  // Add-ons
  addon_expedite: {
    name: "Expedite 24 hours",
    description: "Letter is prepared and dispatched within 24 hours.",
    amount_cents: 4995,
    currency: "usd",
  },
  addon_overnight: {
    name: "Overnight shipping",
    description: "Next-day delivery via USPS Express Mail.",
    amount_cents: 2995,
    currency: "usd",
  },
  addon_skip_trace: {
    name: "Skip-Trace",
    description:
      "Our team locates the recipient when you don't have an address. Required when 'I don't have their address' is on.",
    amount_cents: 8000,
    currency: "usd",
  },
  addon_voice_of_justice: {
    name: "Voice of Justice — phone follow-ups",
    description: "Automated phone-call sequence to the recipient on days 3, 7, and 11.",
    amount_cents: 2900,
    currency: "usd",
  },
  addon_case_brief: {
    name: "Case Brief (attorney memo)",
    description: "Independent attorney memo on the area of law and typical evidence. 7-10 business days.",
    amount_cents: 9800,
    currency: "usd",
  },
  // Phase 2: Filing service. Single tier; no automated form generation in
  // v1 — customer downloads a state- and county-specific filing guide and
  // self-files. Pricing is provisional (founder will adjust later).
  filing_guide: {
    name: "Filing Guide for Your State",
    description:
      "A complete, state- and county-specific filing guide for your case. Court venue, fee schedule, required documents, service of process, and what to bring on filing day.",
    amount_cents: 7900,
    currency: "usd",
  },
  // Phase 6: Court Prep. AI-generated hearing prep — opening statement,
  // likely judge questions, key facts to memorize, common pitfalls.
  // Pricing is provisional (founder will adjust).
  court_prep: {
    name: "Court Prep Pack",
    description:
      "Personalized hearing prep for your case: a 3-minute opening statement, the questions the judge is likely to ask, your key facts cheat sheet, and the mistakes to avoid.",
    amount_cents: 3900,
    currency: "usd",
  },
} as const;

export type ProductKey = keyof typeof PRODUCTS;

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
  demand_letter_download: {
    name: "Demand Letter Download",
    description: "Formatted PDF of your CivilCase demand letter, plus plain-text copy.",
    amount_cents: 3900,
    currency: "usd",
  },
} as const;

export type ProductKey = keyof typeof PRODUCTS;

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

// Find a reusable pending PaymentIntent for this case+user+product, or
// create a fresh one. If a pending intent already exists, its amount and
// metadata are updated in place so the same Stripe PaymentIntent serves
// the entire checkout session (instead of canceling + recreating on every
// tier/addon toggle, which leaks Canceled rows into the Stripe dashboard).
//
// If the existing PI is in a terminal state and can't be updated, the
// local row is deleted and a new PI is created.
export async function findOrCreatePaymentIntent(args: {
  caseId: string;
  userId: string;
  productKey: import("./stripe").ProductKey;
  amountCents: number;
  captureMethod: "automatic" | "manual";
  description: string;
  metadata: Record<string, string>;
  customerId: string;
  lineItems: Record<string, unknown>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  admin: any;
}): Promise<{ intent: Stripe.PaymentIntent; reused: boolean }> {
  const stripe = getStripe();

  const { data: existing } = await args.admin
    .from("payments")
    .select("id, stripe_payment_intent_id")
    .eq("case_id", args.caseId)
    .eq("user_id", args.userId)
    .eq("product_key", args.productKey)
    .eq("status", "pending")
    .is("paid_at", null)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (existing?.stripe_payment_intent_id) {
    try {
      const updated = await stripe.paymentIntents.update(
        existing.stripe_payment_intent_id,
        {
          amount: args.amountCents,
          metadata: args.metadata,
          description: args.description,
        },
      );
      await args.admin
        .from("payments")
        .update({
          amount_cents: args.amountCents,
          line_items: args.lineItems,
        })
        .eq("id", existing.id);
      return { intent: updated, reused: true };
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const code = (err as any)?.code;
      console.warn("[findOrCreatePaymentIntent] update failed", code);
      // The update can fail because the customer has ALREADY paid or
      // authorized this intent — Stripe rejects amount changes on intents in
      // succeeded / requires_capture / processing. In that case the local row
      // points at a REAL charge and must never be deleted, or the customer
      // pays and we lose all record of it. Re-check the true intent status and
      // reuse it untouched so the webhook / reconcile can stamp paid_at.
      try {
        const current = await stripe.paymentIntents.retrieve(
          existing.stripe_payment_intent_id,
        );
        if (
          current.status === "succeeded" ||
          current.status === "requires_capture" ||
          current.status === "processing"
        ) {
          return { intent: current, reused: true };
        }
      } catch (retrieveErr) {
        // Intent no longer retrievable (e.g. deleted in a test/live mode
        // switch). Fall through to create a fresh one and drop the stale row.
        console.warn(
          "[findOrCreatePaymentIntent] retrieve failed after update error",
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (retrieveErr as any)?.code,
        );
      }
      // The intent is genuinely unusable AND unpaid — safe to replace the row.
      await args.admin.from("payments").delete().eq("id", existing.id);
    }
  }

  const intent = await stripe.paymentIntents.create({
    amount: args.amountCents,
    currency: "usd",
    customer: args.customerId,
    capture_method: args.captureMethod,
    automatic_payment_methods: { enabled: true, allow_redirects: "never" },
    description: args.description,
    metadata: args.metadata,
  });

  await args.admin.from("payments").insert({
    case_id: args.caseId,
    user_id: args.userId,
    stripe_payment_intent_id: intent.id,
    stripe_customer_id: args.customerId,
    amount_cents: args.amountCents,
    currency: "USD",
    status: "pending",
    product_key: args.productKey,
    line_items: args.lineItems,
  });

  return { intent, reused: false };
}

// Resolve a usable Stripe customer ID for the given Supabase user. Handles
// the test/live mode mismatch: a `cus_...` created in one mode does not
// exist in the other, so if the stored ID can't be retrieved we create a
// fresh customer and update the profile row.
//
// Pass in the admin (service role) Supabase client and an existing profile
// snapshot so callers control transactions; this helper does not load it.
export async function resolveStripeCustomerId(args: {
  userId: string;
  userEmail: string | null | undefined;
  storedCustomerId: string | null | undefined;
  fullName: string | null | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  admin: any;
}): Promise<string> {
  const stripe = getStripe();
  let customerId: string | null = args.storedCustomerId || null;

  if (customerId) {
    try {
      const existing = await stripe.customers.retrieve(customerId);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((existing as any).deleted) customerId = null;
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const code = (err as any)?.code;
      if (code === "resource_missing") {
        customerId = null;
      } else {
        throw err;
      }
    }
  }

  if (!customerId) {
    const created = await stripe.customers.create({
      email: args.userEmail || undefined,
      name: args.fullName || undefined,
      metadata: { supabase_user_id: args.userId },
    });
    customerId = created.id;
    await args.admin
      .from("profiles")
      .update({ stripe_customer_id: customerId })
      .eq("user_id", args.userId);
  }

  return customerId;
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
  // Phase 7: Post-judgment collection plan. After the user wins (or settles)
  // in court, this guide walks them through actually collecting the money:
  // identifying the debtor's assets, filing wage garnishment or bank levy
  // paperwork, debtor exams, and renewing the judgment. Functionality not
  // built yet; the buy page is a "coming soon" stub.
  collection_plan: {
    name: "Post-Judgment Collection Plan",
    description:
      "A step-by-step guide to actually collecting on your judgment: locating the debtor's assets, wage garnishment, bank levy, debtor exams, and renewing the judgment before it expires.",
    amount_cents: 4900,
    currency: "usd",
  },
} as const;

export type ProductKey = keyof typeof PRODUCTS;

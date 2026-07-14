import { NextResponse, type NextRequest } from "next/server";

/**
 * POST /api/demand-letters/[id]/checkout — DISABLED.
 *
 * This was a legacy hosted Stripe Checkout Session in AUTHORIZATION-ONLY mode
 * (capture_method = "manual"). It is no longer used by any UI: the live demand
 * letter flow uses the inline Stripe Elements PaymentIntent route
 * (/api/demand-letters/[id]/payment-intent) with automatic capture.
 *
 * It was actively unsafe to leave enabled: the card was only authorized (never
 * captured anywhere in the codebase), yet the webhook's checkout.session.completed
 * handler marked the payment "succeeded" and emailed the customer that their
 * letter was being mailed. The 7-day authorization would then expire and the
 * business would never collect the money. Disabled to close that hole.
 */
export async function POST(_req: NextRequest, _ctx: { params: { id: string } }) {
  return NextResponse.json(
    { error: "This checkout method is no longer available." },
    { status: 410 },
  );
}

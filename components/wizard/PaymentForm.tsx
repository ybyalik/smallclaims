"use client";

import { Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import { loadStripe, type Stripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

let stripePromise: Promise<Stripe | null> | null = null;
function getClientStripe() {
  if (!stripePromise) {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (!key) {
      throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY not set");
    }
    stripePromise = loadStripe(key);
  }
  return stripePromise;
}

interface Props {
  clientSecret: string;
  onSuccess: () => void;
  onError: (msg: string) => void;
  disabled?: boolean;
  submitLabel: string;
}

export default function PaymentForm(props: Props) {
  return (
    <Elements
      stripe={getClientStripe()}
      options={{
        clientSecret: props.clientSecret,
        appearance: {
          theme: "stripe",
          variables: {
            fontFamily: "Geist, system-ui, sans-serif",
            colorPrimary: "#0e0e0e",
            colorText: "#0e0e0e",
            colorTextSecondary: "#5a574e",
            colorBackground: "#ffffff",
            borderRadius: "8px",
            spacingUnit: "4px",
          },
        },
      }}
    >
      <PaymentFormInner {...props} />
    </Elements>
  );
}

function PaymentFormInner({ clientSecret, onSuccess, onError, disabled, submitLabel }: Props) {
  const stripe = useStripe();
  const elements = useElements();

  const [cardholderName, setCardholderName] = useState("");
  const [zip, setZip] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [cardBrand, setCardBrand] = useState<string>("unknown");

  // Watch for brand changes on the CardNumberElement
  useEffect(() => {
    if (!elements) return;
    const cardNumber = elements.getElement(CardNumberElement);
    if (!cardNumber) return;
    const handler = (e: { brand?: string }) => {
      if (e.brand) setCardBrand(e.brand);
    };
    cardNumber.on("change", handler);
    return () => {
      cardNumber.off("change", handler);
    };
  }, [elements]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements || submitting || disabled) return;

    if (!cardholderName.trim()) {
      onError("Cardholder name is required.");
      return;
    }
    if (!/^\d{5}(-\d{4})?$/.test(zip.trim())) {
      onError("Valid billing ZIP is required.");
      return;
    }

    setSubmitting(true);
    const cardEl = elements.getElement(CardNumberElement);
    if (!cardEl) {
      onError("Card form not ready.");
      setSubmitting(false);
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardEl,
        billing_details: {
          name: cardholderName,
          address: { postal_code: zip },
        },
      },
    });

    if (result.error) {
      onError(result.error.message || "Payment failed.");
      setSubmitting(false);
      return;
    }

    if (
      result.paymentIntent?.status === "requires_capture" ||
      result.paymentIntent?.status === "succeeded"
    ) {
      onSuccess();
    } else {
      onError(`Unexpected payment state: ${result.paymentIntent?.status}`);
      setSubmitting(false);
    }
  }

  const stripeElementOptions = {
    style: {
      base: {
        fontSize: "15px",
        color: "#0e0e0e",
        fontFamily: "Geist, system-ui, sans-serif",
        "::placeholder": { color: "#a3a097" },
      },
      invalid: { color: "#d9402e" },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="dlw-pay-form">
      <div className="dlw-pay-field">
        <label className="dlw-pay-label">
          Cardholder Name <em className="dlw-required">*</em>
        </label>
        <input
          type="text"
          className="dlw-input"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          placeholder="John Smith"
          autoComplete="cc-name"
          required
        />
      </div>

      <div className="dlw-pay-field">
        <div className="dlw-pay-card-head">
          <label className="dlw-pay-label">
            Card Number <em className="dlw-required">*</em>
          </label>
          <div className="dlw-pay-brands">
            <BrandChip code="visa" active={cardBrand === "visa"}>VISA</BrandChip>
            <BrandChip code="mastercard" active={cardBrand === "mastercard"}>MC</BrandChip>
            <BrandChip code="amex" active={cardBrand === "amex"}>AMEX</BrandChip>
            <BrandChip code="discover" active={cardBrand === "discover"}>DISC</BrandChip>
          </div>
        </div>
        <div className="dlw-pay-stripe">
          <CardNumberElement options={{ ...stripeElementOptions, placeholder: "1234 5678 9012 3456" }} />
        </div>
      </div>

      <div className="dlw-pay-row-3">
        <div className="dlw-pay-field">
          <label className="dlw-pay-label">
            Expiry (MM/YY) <em className="dlw-required">*</em>
          </label>
          <div className="dlw-pay-stripe">
            <CardExpiryElement options={{ ...stripeElementOptions, placeholder: "MM/YY" }} />
          </div>
        </div>
        <div className="dlw-pay-field">
          <label className="dlw-pay-label">
            CVV <em className="dlw-required">*</em>
          </label>
          <div className="dlw-pay-stripe">
            <CardCvcElement options={{ ...stripeElementOptions, placeholder: "000" }} />
          </div>
        </div>
        <div className="dlw-pay-field">
          <label className="dlw-pay-label">
            Billing ZIP <em className="dlw-required">*</em>
          </label>
          <input
            type="text"
            className="dlw-input"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            placeholder="90001"
            autoComplete="postal-code"
            inputMode="numeric"
            maxLength={10}
            required
          />
        </div>
      </div>

      <div className="dlw-pay-trust">
        🔒 Your payment information is securely stored. We will only charge your card
        after our paralegal team has reviewed your case for accuracy.
      </div>

      <button
        type="submit"
        className="dlw-pay-submit"
        disabled={!stripe || submitting || disabled}
      >
        {submitting ? "Submitting…" : submitLabel} <span className="dlw-pay-check">✓</span>
      </button>
    </form>
  );
}

function BrandChip({
  code: _code,
  active,
  children,
}: {
  code: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <span className={`dlw-brand-chip${active ? " is-on" : ""}`}>{children}</span>
  );
}

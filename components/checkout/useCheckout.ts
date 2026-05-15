"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { ProductKey } from "../../lib/stripe";
import type { CheckoutConfig } from "./config";

interface Args {
  caseId: string;
  config: CheckoutConfig;
  skipTraceNeeded?: boolean;
  preselectedAddons?: string[];
  // Existing answers (from case.intake_answers) used to prefill question
  // selections when the user reloads the buy page.
  initialAnswers?: Record<string, string>;
}

export function useCheckout({
  caseId,
  config,
  skipTraceNeeded = false,
  preselectedAddons = [],
  initialAnswers = {},
}: Args) {
  const router = useRouter();

  const defaultTier = config.tiers
    ? (config.tiers[config.tiers.length - 1]?.key ?? config.tiers[0].key)
    : config.productKey;
  const [tier, setTier] = useState<ProductKey>(defaultTier);
  const [addons, setAddons] = useState<Set<ProductKey>>(() => {
    const s = new Set<ProductKey>(preselectedAddons as ProductKey[]);
    if (skipTraceNeeded && config.addons?.some((a) => a.key === "addon_skip_trace")) {
      s.add("addon_skip_trace");
    }
    return s;
  });

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [creatingIntent, setCreatingIntent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const tierObj = config.tiers?.find((t) => t.key === tier);

  const effectiveAddons = useMemo(() => {
    if (!config.addons) return [];
    return config.addons.filter(
      (a) => addons.has(a.key) && (!a.bundledIn || a.bundledIn !== tier),
    );
  }, [addons, tier, config.addons]);

  const tierCents = tierObj?.priceCents ?? config.fixedPriceCents ?? 0;
  const addonCents = effectiveAddons.reduce((s, a) => s + a.priceCents, 0);
  const totalCents = tierCents + addonCents;

  const choosableAddons = (config.addons ?? []).filter((a) => {
    const skipLocked = a.key === "addon_skip_trace" && skipTraceNeeded;
    const bundledByTier = a.bundledIn === tier;
    return !skipLocked && !bundledByTier;
  });
  const informationalAddons = (config.addons ?? []).filter((a) => {
    const skipLocked = a.key === "addon_skip_trace" && skipTraceNeeded;
    const bundledByTier = a.bundledIn === tier;
    return skipLocked || bundledByTier;
  });

  function toggleAddon(key: ProductKey) {
    if (key === "addon_skip_trace" && skipTraceNeeded) return;
    setAddons((s) => {
      const next = new Set(s);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  const addonsKey = useMemo(
    () => Array.from(addons).sort().join(","),
    [addons],
  );

  // Question answers. Persisted to case.intake_answers via PATCH whenever
  // the user changes one. Required questions gate the Pay button.
  const [answers, setAnswers] = useState<Record<string, string>>(initialAnswers);
  const [savingAnswer, setSavingAnswer] = useState(false);

  async function setAnswer(key: string, value: string) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setSavingAnswer(true);
    try {
      await fetch(`/api/demand-letters/${caseId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          intake_answers: { [key]: value },
        }),
      });
    } catch (e) {
      console.error("[useCheckout] could not save answer", e);
    } finally {
      setSavingAnswer(false);
    }
  }

  const missingRequiredAnswers = (config.questions ?? [])
    .filter((q) => q.required && !answers[q.key])
    .map((q) => q.key);
  const questionsReady = missingRequiredAnswers.length === 0;

  // Re-create the PaymentIntent on any pricing-affecting change. Debounced and
  // cancellation-guarded so rapid toggles batch into one network request.
  useEffect(() => {
    let cancelled = false;
    setClientSecret(null);
    setError(null);
    const t = setTimeout(async () => {
      setCreatingIntent(true);
      try {
        const body: Record<string, unknown> = {};
        if (config.tiers) {
          body.tier = tier;
          body.addons = addonsKey ? addonsKey.split(",") : [];
        }
        const res = await fetch(config.apiEndpoint(caseId), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const data = (await res.json()) as { clientSecret?: string; error?: string };
        if (cancelled) return;
        if (!res.ok || !data.clientSecret) {
          throw new Error(data.error || "Could not start checkout.");
        }
        setClientSecret(data.clientSecret);
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Could not start checkout.");
        }
      } finally {
        if (!cancelled) setCreatingIntent(false);
      }
    }, 350);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [caseId, tier, addonsKey, config]);

  function onPaymentSuccess() {
    router.push(config.successUrlBuilder(caseId));
  }

  const totalDollars = (totalCents / 100).toFixed(2);

  return {
    tier,
    setTier,
    addons,
    toggleAddon,
    tierObj,
    effectiveAddons,
    choosableAddons,
    informationalAddons,
    tierCents,
    addonCents,
    totalCents,
    totalDollars,
    answers,
    setAnswer,
    savingAnswer,
    missingRequiredAnswers,
    questionsReady,
    clientSecret,
    creatingIntent,
    error,
    setError,
    onPaymentSuccess,
  };
}

"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { ProductKey } from "../../../../../../lib/stripe";
import PaymentForm from "../../../../../../components/wizard/PaymentForm";

interface Props {
  caseId: string;
  isAuthenticated: boolean;
  defendantName: string;
  defendantAddressDisplay: string;
  letterBody: string;
  totalDemandCents: number;
  skipTraceNeeded: boolean;
  preselectedAddons: string[];
}

interface Tier {
  key: ProductKey;
  name: string;
  priceCents: number;
  strikeCents?: number;
  tagline: string;
  features: string[];
  badge?: string;
}

const TIERS: Tier[] = [
  {
    key: "tier_send_letter",
    name: "Send the Letter",
    priceCents: 2900,
    tagline: "About 65% of cases resolve here.",
    features: [
      "AI-drafted demand letter, optimized for compliance",
      "Letter sent from our platform, not from you (more leverage)",
      "Certified mail with USPS tracking",
      "14-day response deadline written into the letter",
      "You control the send date — letter goes out when you click Send",
    ],
  },
  {
    key: "tier_full_pressure",
    name: "Full Pressure",
    priceCents: 4900,
    strikeCents: 7900,
    tagline: "Maximum pressure. Maximum results.",
    badge: "BEST",
    features: [
      "Everything in Send the Letter",
      "Voice of Justice phone calls on days 3, 7, 11",
      "Escalating email follow-ups on days 2, 5, 8, 12",
      "Final Notice letter on day 10 with stronger language",
      "One-tap Escalate to Filing if they don't pay",
    ],
  },
];

interface Addon {
  key: ProductKey;
  name: string;
  priceCents: number;
  meta: string;
  bundledIn?: ProductKey;
}

const ADDONS: Addon[] = [
  { key: "addon_expedite", name: "⚡ Expedite 24 hours", priceCents: 4995, meta: "Letter prepared and dispatched within 24 hours" },
  { key: "addon_overnight", name: "📦 Overnight shipping", priceCents: 2995, meta: "Next-day USPS Express Mail" },
  { key: "addon_skip_trace", name: "🔍 Skip-Trace", priceCents: 8000, meta: "Auto-added when you don't have an address" },
  { key: "addon_voice_of_justice", name: "📞 Voice of Justice", priceCents: 2900, meta: "Phone follow-ups (included in Full Pressure)", bundledIn: "tier_full_pressure" },
  { key: "addon_case_brief", name: "📑 Case Brief (attorney memo)", priceCents: 9800, meta: "Attorney memo on the area of law, 7-10 business days" },
];

type SigMode = "draw" | "type";

export default function ReviewStep({
  caseId,
  isAuthenticated,
  defendantName,
  defendantAddressDisplay,
  letterBody: _letterBody,
  totalDemandCents,
  skipTraceNeeded,
  preselectedAddons,
}: Props) {
  const router = useRouter();

  const [truth, setTruth] = useState(false);

  const [sigMode, setSigMode] = useState<SigMode>("type");
  const [typedName, setTypedName] = useState("");
  const [drawnSig, setDrawnSig] = useState<string | null>(null);
  const sigRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef<boolean>(false);

  const [tier, setTier] = useState<ProductKey>("tier_full_pressure");
  const [addons, setAddons] = useState<Set<ProductKey>>(() => {
    const s = new Set<ProductKey>(preselectedAddons as ProductKey[]);
    if (skipTraceNeeded) s.add("addon_skip_trace");
    return s;
  });

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [creatingIntent, setCreatingIntent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const tierObj = TIERS.find((t) => t.key === tier)!;
  const effectiveAddons = useMemo(
    () => ADDONS.filter((a) => addons.has(a.key) && (!a.bundledIn || a.bundledIn !== tier)),
    [addons, tier]
  );
  const tierCents = tierObj.priceCents;
  const addonCents = effectiveAddons.reduce((s, a) => s + a.priceCents, 0);
  const serviceFeeCents = tierCents + addonCents;
  const totalToAuthorize = totalDemandCents + serviceFeeCents;

  function toggleAddon(key: ProductKey) {
    if (key === "addon_skip_trace" && skipTraceNeeded) return;
    setAddons((s) => {
      const next = new Set(s);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
    setClientSecret(null);
  }

  // Setup canvas for drawing
  useEffect(() => {
    if (sigMode !== "draw") return;
    const canvas = sigRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#0e0e0e";
    ctx.lineCap = "round";
  }, [sigMode]);

  function startDraw(e: React.PointerEvent) {
    drawing.current = true;
    const canvas = sigRef.current!;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d")!;
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  }
  function moveDraw(e: React.PointerEvent) {
    if (!drawing.current) return;
    const canvas = sigRef.current!;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d")!;
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  }
  function endDraw() {
    if (!drawing.current) return;
    drawing.current = false;
    const canvas = sigRef.current!;
    setDrawnSig(canvas.toDataURL("image/png"));
  }
  function clearSig() {
    const canvas = sigRef.current!;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setDrawnSig(null);
  }

  const hasSignature =
    sigMode === "draw" ? !!drawnSig : typedName.trim().length >= 2;

  function buildSignatureData(): { type: SigMode; value: string } | null {
    if (sigMode === "draw") {
      return drawnSig ? { type: "draw", value: drawnSig } : null;
    }
    return typedName.trim().length >= 2
      ? { type: "type", value: typedName.trim() }
      : null;
  }

  async function persist() {
    const sig = buildSignatureData();
    await fetch(`/api/demand-letters/${caseId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        intake_answers: {
          truth_acknowledged_at: new Date().toISOString(),
          signature_type: sig?.type ?? null,
          signature_value: sig?.value ?? null,
          selected_tier: tier,
          selected_addons: Array.from(addons),
          ready_for_checkout: true,
        },
      }),
    });
  }

  async function preparePayment() {
    if (!truth) {
      setError("Please confirm the statement of truth.");
      return;
    }
    if (!hasSignature) {
      setError("Please add a signature.");
      return;
    }
    if (!isAuthenticated) {
      await persist();
      router.push(
        `/signup?next=${encodeURIComponent(`/demand-letter/wizard/${caseId}/review?ready=1`)}`
      );
      return;
    }
    await persist();
    setCreatingIntent(true);
    setError(null);
    try {
      const res = await fetch(`/api/demand-letters/${caseId}/payment-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier, addons: Array.from(addons) }),
      });
      const data = (await res.json()) as { clientSecret?: string; error?: string };
      if (!res.ok || !data.clientSecret) {
        throw new Error(data.error || "Could not start checkout.");
      }
      setClientSecret(data.clientSecret);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not start checkout.");
    } finally {
      setCreatingIntent(false);
    }
  }

  function onPaymentSuccess() {
    router.push(`/dashboard/demand-letters/${caseId}?submitted=1`);
  }

  return (
    <div className="dlw-step">
      <div className="dlw-step-eyebrow">Phase 6 of 6</div>
      <h1>Review and submit</h1>
      <p className="dlw-sub">
        Confirm the facts, sign, pick a tier, and authorize payment. Your card is
        held but not charged until our paralegal team reviews the case for
        accuracy (typically 24-48 hours).
      </p>

      <div className="dlw-status-panel">
        <h4>Target recipient</h4>
        <div style={{ fontSize: 15 }}>
          <strong>{defendantName || "—"}</strong>
        </div>
        <div style={{ fontSize: 13, color: "#6b6b6b" }}>{defendantAddressDisplay}</div>
      </div>

      <div className="dlw-status-panel" style={{ marginTop: 14 }}>
        <h4>Your claim</h4>
        <div className="dlw-status-row">
          <span>Demanding</span>
          <span>${(totalDemandCents / 100).toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
        </div>
        <div className="dlw-status-row">
          <span>Service fee ({tierObj.name})</span>
          <span>+ ${(tierCents / 100).toFixed(2)}</span>
        </div>
        {effectiveAddons.length > 0 ? (
          <div className="dlw-status-row">
            <span>Add-ons ({effectiveAddons.length})</span>
            <span>+ ${(addonCents / 100).toFixed(2)}</span>
          </div>
        ) : null}
        <div className="dlw-status-row total">
          <span>Total to authorize today</span>
          <span>${(totalToAuthorize / 100).toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
        </div>
      </div>

      {/* TRUTH + SIGNATURE */}
      <div className="dlw-truth-card">
        <h3>Before you send</h3>
        <label style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14, lineHeight: 1.5 }}>
          <input
            type="checkbox"
            checked={truth}
            onChange={(e) => setTruth(e.target.checked)}
            style={{ marginTop: 3, accentColor: "var(--accent, #d9402e)" }}
          />
          <span>
            I confirm the facts stated in this letter are true and accurate to the best of my
            knowledge.
          </span>
        </label>

        <div style={{ marginTop: 18 }}>
          <div className="dlw-sig-tabs" role="tablist" aria-label="Signature method">
            <button
              type="button"
              role="tab"
              aria-selected={sigMode === "type"}
              className={`dlw-sig-tab${sigMode === "type" ? " is-on" : ""}`}
              onClick={() => setSigMode("type")}
            >
              Type your name
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={sigMode === "draw"}
              className={`dlw-sig-tab${sigMode === "draw" ? " is-on" : ""}`}
              onClick={() => setSigMode("draw")}
            >
              Draw signature
            </button>
          </div>

          {sigMode === "type" ? (
            <div>
              <input
                type="text"
                value={typedName}
                onChange={(e) => setTypedName(e.target.value)}
                placeholder="Type your full name"
                className="dlw-input"
                style={{ marginTop: 10, fontSize: 15 }}
                autoComplete="name"
              />
              {typedName.trim().length >= 2 ? (
                <div className="dlw-sig-typed-preview">
                  <span className="dlw-sig-typed-label">Your signature</span>
                  <span className="dlw-sig-typed-name">{typedName}</span>
                </div>
              ) : (
                <p style={{ fontSize: 12.5, color: "#8b8779", margin: "8px 0 0" }}>
                  Your name will appear in cursive as your signature on the letter.
                </p>
              )}
            </div>
          ) : (
            <div>
              <p style={{ fontSize: 13, color: "#6b6b6b", margin: "10px 0 0" }}>
                Use your mouse or finger to sign in the box.
              </p>
              <canvas
                ref={sigRef}
                className="dlw-sig-pad"
                onPointerDown={startDraw}
                onPointerMove={moveDraw}
                onPointerUp={endDraw}
                onPointerLeave={endDraw}
                style={{ width: "100%" }}
              />
              <button type="button" className="dlw-sig-clear" onClick={clearSig}>
                Clear signature
              </button>
            </div>
          )}
        </div>
      </div>

      {/* TIER PICKER */}
      <div style={{ marginTop: 32 }}>
        <h3 style={{ fontFamily: "Newsreader, Georgia, serif", fontSize: 20, margin: "0 0 6px" }}>
          Choose a tier
        </h3>
        <div className="dlw-tier-grid">
          {TIERS.map((t) => (
            <div
              key={t.key}
              className={`dlw-tier${tier === t.key ? " is-on" : ""}`}
              onClick={() => {
                setTier(t.key);
                setClientSecret(null);
              }}
            >
              {t.badge ? <span className="dlw-tier-ribbon">{t.badge}</span> : null}
              <h3>{t.name}</h3>
              <div className="dlw-tier-price">
                ${(t.priceCents / 100).toFixed(0)}
                {t.strikeCents ? (
                  <span className="dlw-tier-price-strike">${(t.strikeCents / 100).toFixed(0)}</span>
                ) : null}
              </div>
              <p className="dlw-tier-tag">{t.tagline}</p>
              <ul>
                {t.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <button
                type="button"
                className="dlw-cta"
                style={{ width: "100%" }}
                onClick={() => {
                  setTier(t.key);
                  setClientSecret(null);
                }}
              >
                {tier === t.key ? "Selected ✓" : "Select plan"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ADD-ONS */}
      <div style={{ marginTop: 24 }}>
        <h3 style={{ fontFamily: "Newsreader, Georgia, serif", fontSize: 18, margin: "0 0 6px" }}>
          Add-ons
        </h3>
        <div className="dlw-addons">
          {ADDONS.map((a) => {
            const bundled = a.bundledIn === tier;
            const forced = a.key === "addon_skip_trace" && skipTraceNeeded;
            const checked = bundled || forced || addons.has(a.key);
            return (
              <label
                key={a.key}
                className="dlw-addon"
                style={{ opacity: bundled ? 0.6 : 1, cursor: forced ? "not-allowed" : "pointer" }}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleAddon(a.key)}
                  disabled={bundled || forced}
                />
                <div>
                  <strong>{a.name}</strong>
                  <div className="dlw-addon-meta">{a.meta}</div>
                </div>
                <div className="dlw-addon-price">
                  {bundled ? "Included" : `+$${(a.priceCents / 100).toFixed(2)}`}
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* PAYMENT */}
      {!isAuthenticated ? (
        <div className="dlw-auth-banner" style={{ marginTop: 24 }}>
          <strong>Almost there</strong>
          You&rsquo;ll create a quick account on the next step so we can email you status
          updates and you can return to this case anytime. We won&rsquo;t charge your card
          until our paralegal team reviews the case.
        </div>
      ) : null}

      <div style={{ marginTop: 24 }}>
        <h3 style={{ fontFamily: "Newsreader, Georgia, serif", fontSize: 20, margin: "0 0 12px" }}>
          Payment
        </h3>
        <div className="dlw-pay-card">
          {clientSecret ? (
            <PaymentForm
              clientSecret={clientSecret}
              onSuccess={onPaymentSuccess}
              onError={(msg) => setError(msg)}
              submitLabel="Submit My Case"
            />
          ) : (
            <div className="dlw-pay-pending">
              <p style={{ margin: "0 0 14px", color: "#5a574e" }}>
                Authorize {`$${(totalToAuthorize / 100).toLocaleString("en-US", { minimumFractionDigits: 2 })}`} to submit your case.
                Your card is held but not charged until our paralegal team reviews the case
                for accuracy (typically 24-48 hours).
              </p>
              <button
                type="button"
                className="dlw-pay-submit"
                onClick={preparePayment}
                disabled={!truth || !hasSignature || creatingIntent}
              >
                {creatingIntent
                  ? "Loading…"
                  : !isAuthenticated
                    ? "Continue — create account ▶"
                    : "Continue to payment ▶"}
              </button>
            </div>
          )}
        </div>

        <div className="dlw-trust-badges">
          <span>🔒 SSL</span>
          <span>✓ Money-back guarantee</span>
          <span>📨 Free to start</span>
          <span>★ 20+ Yrs combined experience</span>
          <span>🛡️ SiteLock</span>
          <span>★★★★★ Trustpilot</span>
        </div>
      </div>

      <div className="dlw-actions">
        <Link
          href={`/demand-letter/wizard/${caseId}/evidence`}
          className="dlw-actions-back"
        >
          ← Back
        </Link>
        <span />
      </div>

      {error ? <p style={{ color: "var(--accent)", marginTop: 12 }}>{error}</p> : null}
    </div>
  );
}

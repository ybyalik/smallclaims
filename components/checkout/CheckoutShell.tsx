"use client";

import { Zap, Truck, UserSearch, PhoneCall, FileText, type LucideIcon } from "lucide-react";
import PaymentForm from "../wizard/PaymentForm";
import { useCheckout } from "./useCheckout";
import { CHECKOUT_CONFIGS, type ProductKind } from "./config";
import type { ProductKey } from "../../lib/stripe";

const ADDON_ICONS: Partial<Record<ProductKey, LucideIcon>> = {
  addon_expedite: Zap,
  addon_overnight: Truck,
  addon_skip_trace: UserSearch,
  addon_voice_of_justice: PhoneCall,
  addon_case_brief: FileText,
};

interface Props {
  caseId: string;
  productKind: ProductKind;
  recipientName?: string;
  skipTraceNeeded?: boolean;
  preselectedAddons?: string[];
  initialAnswers?: Record<string, string>;
}

export default function CheckoutShell({
  caseId,
  productKind,
  recipientName = "",
  skipTraceNeeded = false,
  preselectedAddons = [],
  initialAnswers = {},
}: Props) {
  const config = CHECKOUT_CONFIGS[productKind];
  const s = useCheckout({
    caseId,
    config,
    skipTraceNeeded,
    preselectedAddons,
    initialAnswers,
  });

  const title = config.buildTitle(recipientName);
  const hasTiers = !!config.tiers?.length;
  const hasAddons = !!s.choosableAddons.length || !!s.informationalAddons.length;
  const hasQuestions = !!config.questions?.length;
  const submitLabel = config.submitLabelBuilder(s.totalDollars);

  return (
    <div className="ck-page">
      <div className="ck-hero">
        <div className="ck-hero-left">
          <p className="ck-eyebrow">{config.eyebrow}</p>
          <h1>{title}</h1>
          <p className="ck-hero-lede">{config.lede}</p>
          <ul className="ck-hero-list">
            {config.whatYouGet.map((b) => (
              <li key={b.title}>
                <strong>{b.title}</strong>
                <span>{b.body}</span>
              </li>
            ))}
          </ul>
        </div>

        <aside className="ck-hero-right">
          <div className="ck-summary">
            <h4>Order Summary</h4>
            {recipientName ? (
              <div className="ck-summary-row">
                <span>Recipient</span>
                <span>
                  <strong>{recipientName}</strong>
                </span>
              </div>
            ) : null}
            {hasTiers && s.tierObj ? (
              <div className="ck-summary-row">
                <span>Plan ({s.tierObj.name})</span>
                <span>${(s.tierCents / 100).toFixed(2)}</span>
              </div>
            ) : (
              <div className="ck-summary-row">
                <span>{config.fixedProductName ?? config.eyebrow}</span>
                <span>${(s.tierCents / 100).toFixed(2)}</span>
              </div>
            )}
            {s.effectiveAddons.length > 0 ? (
              <div className="ck-summary-row">
                <span>Add-ons ({s.effectiveAddons.length})</span>
                <span>+${(s.addonCents / 100).toFixed(2)}</span>
              </div>
            ) : null}
            <div className="ck-summary-row ck-summary-total">
              <span>Total</span>
              <span>${s.totalDollars}</span>
            </div>
          </div>
        </aside>
      </div>

      {hasTiers ? (
        <section className="ck-section">
          <h3 className="ck-section-h">Choose Your Plan</h3>
          <div className="ck-tier-grid">
            {config.tiers!.map((t) => (
              <div
                key={t.key}
                className={`ck-tier${s.tier === t.key ? " is-on" : ""}`}
                onClick={() => s.setTier(t.key)}
              >
                {t.badge ? <span className="ck-tier-ribbon">{t.badge}</span> : null}
                <h4>{t.name}</h4>
                <div className="ck-tier-price">
                  ${(t.priceCents / 100).toFixed(0)}
                  {t.strikeCents ? (
                    <>
                      <span className="ck-tier-strike">${(t.strikeCents / 100).toFixed(0)}</span>
                      <span className="ck-tier-save">
                        Save ${((t.strikeCents - t.priceCents) / 100).toFixed(0)}
                      </span>
                    </>
                  ) : null}
                </div>
                <p className="ck-tier-tag">{t.tagline}</p>
                <ul>
                  {t.features.map((f, i) => (
                    <li
                      key={f}
                      className={
                        i === 0 && t.key === "tier_full_pressure" ? "ck-tier-prefix" : ""
                      }
                    >
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="ck-tier-pick"
                  onClick={(e) => {
                    e.stopPropagation();
                    s.setTier(t.key);
                  }}
                >
                  {s.tier === t.key ? "Selected" : `Select ${t.name}`}
                </button>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {hasAddons ? (
        <section className="ck-section ck-addons-section">
          <h3 className="ck-section-h">Optional Add-Ons</h3>
          <div className="ck-addon-grid">
            {s.choosableAddons.map((a) => {
              const checked = s.addons.has(a.key);
              const Icon = ADDON_ICONS[a.key];
              return (
                <label key={a.key} className={`ck-addon${checked ? " is-on" : ""}`}>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => s.toggleAddon(a.key)}
                    className="ck-addon-input"
                    aria-label={a.name}
                  />
                  <div className="ck-addon-head-row">
                    <span className="ck-addon-icon" aria-hidden="true">
                      {Icon ? <Icon size={18} strokeWidth={2.2} /> : null}
                    </span>
                    <span className="ck-addon-title">{a.name}</span>
                    <span className="ck-addon-price">+${(a.priceCents / 100).toFixed(0)}</span>
                  </div>
                  <p className="ck-addon-meta">{a.meta}</p>
                </label>
              );
            })}
          </div>
          {s.informationalAddons.length > 0 ? (
            <div className="ck-addon-info">
              {s.informationalAddons.map((a) => {
                const skipLocked = a.key === "addon_skip_trace" && skipTraceNeeded;
                const Icon = ADDON_ICONS[a.key];
                return (
                  <div key={a.key} className="ck-addon-info-row">
                    <span className="ck-addon-info-icon" aria-hidden="true">
                      {Icon ? <Icon size={16} strokeWidth={2.2} /> : null}
                    </span>
                    <span className="ck-addon-info-label">
                      <strong>{a.name}</strong>{" "}
                      <span className="ck-addon-info-meta">
                        {skipLocked
                          ? "auto-added (no address on file)"
                          : "included in Full Pressure"}
                      </span>
                    </span>
                    <span className="ck-addon-info-price">
                      {skipLocked ? `+$${(a.priceCents / 100).toFixed(0)}` : "Included"}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : null}
        </section>
      ) : null}

      {hasQuestions ? (
        <section className="ck-section ck-questions-section">
          {config.questions!.map((q) => {
            const selected = s.answers[q.key] ?? "";
            const missing = s.missingRequiredAnswers.includes(q.key);
            return (
              <div key={q.key} className="ck-question">
                <h3 className="ck-section-h">
                  {q.label}
                  {q.required ? <span className="ck-question-req"> *</span> : null}
                </h3>
                {q.helpText ? (
                  <p className="ck-question-help">{q.helpText}</p>
                ) : null}
                <div className="ck-question-options">
                  {q.options.map((opt) => {
                    const isOn = selected === opt.value;
                    return (
                      <label
                        key={opt.value}
                        className={`ck-question-opt${isOn ? " is-on" : ""}`}
                      >
                        <input
                          type="radio"
                          name={`q-${q.key}`}
                          value={opt.value}
                          checked={isOn}
                          onChange={() => s.setAnswer(q.key, opt.value)}
                        />
                        <div>
                          <strong>{opt.label}</strong>
                          {opt.description ? (
                            <span className="ck-question-opt-desc">
                              {opt.description}
                            </span>
                          ) : null}
                        </div>
                      </label>
                    );
                  })}
                </div>
                {missing ? (
                  <p className="ck-question-missing">Please choose one to continue.</p>
                ) : null}
              </div>
            );
          })}
          {s.answerError ? (
            <p className="ck-pay-error">{s.answerError}</p>
          ) : null}
        </section>
      ) : null}

      <section className="ck-section ck-pay-section">
        <h3 className="ck-section-h">Payment</h3>
        {s.error ? <p className="ck-pay-error">{s.error}</p> : null}
        {!s.questionsReady ? (
          <div className="ck-pay-blocked">
            Answer the question above to continue to payment.
          </div>
        ) : s.clientSecret ? (
          <PaymentForm
            key={s.clientSecret}
            clientSecret={s.clientSecret}
            onSuccess={s.onPaymentSuccess}
            onError={(m) => s.setError(m)}
            submitLabel={submitLabel}
          />
        ) : (
          <div className="ck-pay-skel" aria-busy="true">
            <div className="ck-pay-skel-row" />
            <div className="ck-pay-skel-row" />
            <div className="ck-pay-skel-row ck-pay-skel-btn" />
          </div>
        )}
      </section>

      <div className="ck-trust">
        {config.trustBadges.map((b) => (
          <div key={b} className="ck-trust-item">
            <span className="ck-trust-check">✓</span>
            <span>{b}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

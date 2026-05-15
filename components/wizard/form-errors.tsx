"use client";

import { useState } from "react";

// Shared form-validation helpers for wizard steps.
//
// Pattern:
//   const { errors, setErrors, showErrors, clear } = useFormErrors();
//   ...
//   const errs = validate();
//   if (Object.keys(errs).length) { showErrors(errs); return; }
//
// Field components read `errors[fieldName]` and apply red border + inline
// message. The <ErrorSummary> component renders the full bulleted list of
// messages near the actions row.

export function useFormErrors() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  function clear() {
    setErrors({});
  }

  function showErrors(errs: Record<string, string>) {
    setErrors(errs);
    requestAnimationFrame(() => {
      document
        .querySelector(".dlw-error-summary")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  function setSingle(field: string, message: string) {
    setErrors({ [field]: message });
  }

  return { errors, setErrors, clear, showErrors, setSingle };
}

interface ErrorSummaryProps {
  errors: Record<string, string>;
  // Optional ordered list of field keys to control the display order. Keys
  // not present in `order` are appended at the end. If omitted, errors
  // render in object-iteration order.
  order?: string[];
}

export function ErrorSummary({ errors, order }: ErrorSummaryProps) {
  const keys = order
    ? [
        ...order.filter((k) => errors[k]),
        ...Object.keys(errors).filter((k) => !order.includes(k) && errors[k]),
      ]
    : Object.keys(errors).filter((k) => errors[k]);
  if (keys.length === 0) return null;
  return (
    <div className="dlw-error-summary" role="alert" aria-live="polite">
      <p className="dlw-error-summary-h">
        Please fix the following before continuing:
      </p>
      <ul>
        {keys.map((k) => (
          <li key={k}>{errors[k]}</li>
        ))}
      </ul>
    </div>
  );
}

interface FieldProps {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}

export function Field({ label, required, hint, error, children }: FieldProps) {
  return (
    <label className={`dlw-field${error ? " is-invalid" : ""}`}>
      <span className="dlw-label">
        {label} {required ? <em className="dlw-required">*</em> : null}
      </span>
      {children}
      {error ? (
        <span className="dlw-field-error-msg">{error}</span>
      ) : hint ? (
        <span className="dlw-hint">{hint}</span>
      ) : null}
    </label>
  );
}

// Shared textarea for admin prompt editors (state research prompts and
// demand-letter prompts). The two editors have different workflows
// (Edit/Cancel/Save/Reset vs. inline Save + notes) and different APIs,
// but they share the styled monospace textarea, character counting,
// and validation feedback. Keep that bit in one place.

"use client";

import type { ReactNode } from "react";

interface Props {
  value: string;
  onChange: (next: string) => void;
  rows?: number;
  minChars?: number;
  maxChars?: number;
  // Literal substring that the prompt must contain. If set, the textarea
  // will surface a warning when missing.
  requiredPlaceholder?: string;
  spellCheck?: boolean;
  disabled?: boolean;
  // Additional inline message rendered to the right of the validation
  // feedback (e.g. "Saved" / "Saving…" / network error).
  status?: ReactNode;
}

export default function PromptTextarea({
  value,
  onChange,
  rows = 18,
  minChars,
  maxChars,
  requiredPlaceholder,
  spellCheck = false,
  disabled,
  status,
}: Props) {
  const chars = value.length;
  const words = value.split(/\s+/).filter(Boolean).length;
  const tooShort = minChars !== undefined && chars < minChars;
  const tooLong = maxChars !== undefined && chars > maxChars;
  const missingPlaceholder =
    requiredPlaceholder !== undefined && !value.includes(requiredPlaceholder);

  return (
    <div className="admin-prompt-field">
      <textarea
        className="admin-prompt-textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        spellCheck={spellCheck}
        disabled={disabled}
      />
      <div className="admin-prompt-field-meta">
        <span className="admin-prompt-field-count">
          {chars.toLocaleString()} chars · {words.toLocaleString()} words
        </span>
        {missingPlaceholder ? (
          <span className="admin-prompt-field-warn">
            Must contain {requiredPlaceholder}
          </span>
        ) : null}
        {tooShort ? (
          <span className="admin-prompt-field-warn">
            Too short (min {minChars!.toLocaleString()} chars)
          </span>
        ) : null}
        {tooLong ? (
          <span className="admin-prompt-field-warn">
            Too long (max {maxChars!.toLocaleString()} chars)
          </span>
        ) : null}
        {status ? <span className="admin-prompt-field-status">{status}</span> : null}
      </div>
    </div>
  );
}

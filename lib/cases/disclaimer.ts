// Single source of truth for the customer-facing legal disclaimer footer.
// Appended deterministically (not via LLM) at the end of any customer-facing
// generated artifact: customer research report, post-judgment collection
// plan, and future products. Keeping it here means edits flow to all
// products at once.

const DISCLAIMER_MD = `
---

*Procedural information only, not legal advice. Court rules, fees, and forms can change without notice. Verify with the clerk before filing. This report was generated for your specific case using official court sources, but it is not a substitute for consultation with a licensed attorney if your situation is complex.*
`;

const DISCLAIMER_HTML = `<hr class="customer-doc-disclaimer-rule" /><p class="customer-doc-disclaimer"><em>Procedural information only, not legal advice. Court rules, fees, and forms can change without notice. Verify with the clerk before filing. This report was generated for your specific case using official court sources, but it is not a substitute for consultation with a licensed attorney if your situation is complex.</em></p>`;

/**
 * Append the disclaimer footer to a markdown body. Idempotent on whitespace
 * but does NOT detect existing disclaimers; callers shouldn't double-append.
 */
export function appendDisclaimerMd(bodyMd: string): string {
  return `${bodyMd.trimEnd()}\n${DISCLAIMER_MD}`;
}

/**
 * Append the disclaimer footer to a pre-rendered HTML body.
 */
export function appendDisclaimerHtml(bodyHtml: string): string {
  return `${bodyHtml}${DISCLAIMER_HTML}`;
}

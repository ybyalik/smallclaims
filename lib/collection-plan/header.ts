// Server-side header builder for the Post-Judgment Collection Plan report.
//
// The header is generated deterministically from case data, not by the LLM,
// so the format is guaranteed consistent across every plan and the AI can
// focus on the body. Used in lib/collection-plan/generate.ts to prepend the
// same header to both body_md (markdown) and body_html (rendered).

interface HeaderInputs {
  plaintiff_name: string | null;
  defendant_name: string | null;
  judgment_amount_cents: number;
  claim_type_label: string;
  today_date: string; // pre-formatted, e.g. "May 15, 2026"
}

function titleCase(s: string): string {
  return s
    .split(/\s+/)
    .map((w) => (w.length ? w[0].toUpperCase() + w.slice(1).toLowerCase() : w))
    .join(" ");
}

function fmtJudgment(cents: number): string {
  return `$${(cents / 100).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}

export function buildCollectionPlanHeader(input: HeaderInputs): {
  headerMd: string;
  headerHtml: string;
} {
  const plaintiff = input.plaintiff_name?.trim() || "Plaintiff";
  const defendant = input.defendant_name?.trim() || "Defendant";
  const claimType = titleCase(input.claim_type_label.replace(/_/g, " "));
  const amount = fmtJudgment(input.judgment_amount_cents);

  // Markdown. Bold labels, values plain. The "Plaintiff vs. Defendant"
  // line is intentionally NOT included here — it's already rendered as
  // the subtitle on the PDF cover and as the page header on the web view,
  // so duplicating it inside the body would be redundant. Trailing blank
  // line so the LLM's opener paragraph follows cleanly.
  const headerMd =
    `**Judgment amount:** ${amount}\n` +
    `**Claim type:** ${claimType}\n` +
    `**Date:** ${input.today_date}\n\n`;

  // HTML. Same content, semantic structure.
  const headerHtml =
    `<div class="collection-plan-header">` +
    `<p class="collection-plan-header-meta"><strong>Judgment amount:</strong> ${escapeHtml(amount)}</p>` +
    `<p class="collection-plan-header-meta"><strong>Claim type:</strong> ${escapeHtml(claimType)}</p>` +
    `<p class="collection-plan-header-meta"><strong>Date:</strong> ${escapeHtml(input.today_date)}</p>` +
    `</div>`;
  // plaintiff and defendant are deliberately unused below to satisfy strict
  // unused-var checks; keeping them in the destructure preserves the call
  // signature so future tweaks (e.g. an opt-in mode) can re-use them.
  void plaintiff;
  void defendant;

  return { headerMd, headerHtml };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Strip em-dashes and en-dashes from generated prose. The user banned
 * these (calls them "AI slop") and the prompt forbids them, but the LLM
 * occasionally slips. This is the deterministic safety net.
 */
export function stripDashes(s: string): string {
  return s
    // " — " (em-dash with spaces) → ", "
    .replace(/\s*—\s*/g, ", ")
    // " – " (en-dash with spaces) → ", "
    .replace(/\s*–\s*/g, ", ")
    // Any remaining bare em/en dashes (no spaces) → ", "
    .replace(/[—–]/g, ", ");
}

/**
 * Strip "the X does not list / state / include / ... online" hedge phrases
 * the LLM keeps slipping in despite the prompt. We aggressively remove the
 * hedge phrase up to its nearest clause boundary, then re-capitalize the
 * next sentence-start. Result: instead of "The clerk does not list the
 * form online; call 555-1234." we get "Call 555-1234."
 *
 * Also replaces the Latin "in forma pauperis" with plain "fee waiver."
 */
export function stripMissingDataHedges(s: string): string {
  let out = s;

  // Strip the entire hedge sentence (period-terminated). Preserves the
  // sentence boundary so we don't merge the previous and next sentences.
  // Pattern: "[The|Your|Our] [up to 4 words] (do|does) not (list|state|...) [stuff] [.]"
  out = out.replace(
    /(^|[.!?\n]\s*)(?:[Tt]he|[Yy]our|[Oo]ur)\s+(?:[a-zA-Z]+\s+){0,4}?(?:do|does)\s+not\s+(?:list|state|specify|mention|provide|include|publish|post|say|note|cite|spell\s+out|describe)\b[^.;\n]*\.\s+/g,
    "$1",
  );

  // Strip hedge clauses ending in a semicolon. Pattern: "X does not Y; call Z"
  // → keep "call Z" (will be re-capitalized below).
  out = out.replace(
    /(?:[Tt]he|[Yy]our|[Oo]ur)\s+(?:[a-zA-Z]+\s+){0,4}?(?:do|does)\s+not\s+(?:list|state|specify|mention|provide|include|publish|post|say|note|cite|spell\s+out|describe)\b[^.;\n]*;\s*/g,
    "",
  );

  // Mid-sentence hedge clauses: ", the clerk does not list X online,"
  // collapse to ", "
  out = out.replace(
    /,\s*(?:the|your|our)\s+(?:[a-zA-Z]+\s+){0,4}?(?:do|does)\s+not\s+(?:list|state|specify|mention|provide|include|publish|post|say|note)\b[^.;,\n]*,\s*/gi,
    ", ",
  );

  // Replace Latin legalese with plain English.
  out = out.replace(/\bin\s+forma\s+pauperis\b/gi, "fee waiver");

  // Tidy: collapse runs of spaces (not newlines).
  out = out.replace(/[ \t]{2,}/g, " ");

  // Re-capitalize the first letter of any sentence (after `.`, `!`, `?`, or
  // at the start of a markdown line) if our strip left it lowercase.
  out = out.replace(
    /(^|[.!?]\s+|\n\s*|\n+\*\*[^*]+\*\*\s*\n+)([a-z])/g,
    (_, p, c) => `${p}${c.toUpperCase()}`,
  );

  // Drop accidental orphan connectives left at sentence starts after a strip
  // (e.g., "So do not wait." after "..., so do not wait." had its prefix removed).
  out = out.replace(/(^|[.!?]\s+|\n\s*)(?:So|And|But)\s+/g, "$1");

  // Re-capitalize again in case the connective-drop revealed a lowercase letter.
  out = out.replace(
    /(^|[.!?]\s+|\n\s*)([a-z])/g,
    (_, p, c) => `${p}${c.toUpperCase()}`,
  );

  return out;
}

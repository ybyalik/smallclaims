// Prompt template storage + substitution.
//
// Prompts for AI-generated content (demand letter, etc.) live in the
// prompt_templates DB table so admin can edit them without a code deploy.
// Hardcoded constants in the generator are used as fallback if no DB row
// exists yet (fresh install, or before the first admin save).
//
// Substitution is `{{snake_case_key}}` — values come from a flat context
// object passed at render time. Missing keys render as empty strings so a
// template error doesn't crash generation.

import { createServiceRoleClient } from "../supabase/service-role";

export type PromptKey = "demand_letter";
export type PromptRole = "system" | "user_template";

export interface PromptTemplate {
  id: string;
  key: PromptKey;
  role: PromptRole;
  body: string;
  version: number;
  is_active: boolean;
  notes: string | null;
  created_at: string;
}

interface LoadOptions {
  fallback: string;
}

export async function loadActivePrompt(
  key: PromptKey,
  role: PromptRole,
  opts: LoadOptions,
): Promise<{ body: string; source: "db" | "fallback"; version: number | null }> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const admin = createServiceRoleClient() as any;
    const { data } = await admin
      .from("prompt_templates")
      .select("body, version")
      .eq("key", key)
      .eq("role", role)
      .eq("is_active", true)
      .order("version", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (data?.body) {
      return { body: data.body, source: "db", version: data.version };
    }
  } catch (err) {
    console.error("[loadActivePrompt] DB read failed, using fallback", err);
  }
  return { body: opts.fallback, source: "fallback", version: null };
}

// Render a template with `{{var}}` placeholders. Unknown keys collapse to
// empty string so a typo'd placeholder doesn't crash generation.
export function renderTemplate(template: string, ctx: Record<string, string>): string {
  return template.replace(/\{\{\s*([a-z_][a-z0-9_]*)\s*\}\}/gi, (_match, key: string) => {
    const value = ctx[key.toLowerCase()];
    return value === undefined ? "" : value;
  });
}

// List of placeholders the demand_letter user_template supports. Surfaced
// in the admin editor so the user knows what's available.
export interface PlaceholderSpec {
  key: string;
  description: string;
  exampleValue: string;
}

export const DEMAND_LETTER_PLACEHOLDERS: PlaceholderSpec[] = [
  { key: "plaintiff_name", description: "Name of the plaintiff (the user)", exampleValue: "Yury Byalik" },
  { key: "plaintiff_email", description: "Plaintiff email address", exampleValue: "yury@example.com" },
  { key: "plaintiff_phone", description: "Plaintiff phone (may be empty)", exampleValue: "(415) 555-0123" },
  { key: "plaintiff_address", description: "Multi-line formatted plaintiff address", exampleValue: "123 Main St\nSan Francisco, CA 94110" },
  { key: "defendant_name", description: "Name of the defendant", exampleValue: "Jason Terry" },
  { key: "defendant_address", description: "Multi-line formatted defendant address", exampleValue: "456 Oak Ave\nLos Angeles, CA 90001" },
  { key: "amount", description: "Dollar amount in dispute, formatted as currency", exampleValue: "$1,500.00" },
  { key: "state_code", description: "Two-letter state abbreviation", exampleValue: "CA" },
  { key: "state_name", description: "Full state name", exampleValue: "California" },
  { key: "dispute_type_label", description: "Plain-language dispute description", exampleValue: "an unpaid personal loan" },
  { key: "facts_narrative", description: "The user's own description of what happened", exampleValue: "On March 1st, I lent the defendant $1,500..." },
  { key: "cure_period_days", description: "Number of days defendant has to respond", exampleValue: "14" },
  { key: "today_date", description: "Today's date in long format", exampleValue: "May 14, 2026" },
  { key: "state_law_context", description: "Full state-law context block. Includes (when available): statute-of-limitations matched to the user's claim type, statutory damage multipliers (e.g. 2x security deposit), prejudgment interest rate + statute, recoverable costs + attorney fees, demand-letter pre-suit requirements, government-tort notice deadline, small-claims jurisdictional cap, filing fees, post-judgment leverage, and explicit instructions for the LLM on how to use each section. Populated for every state via deep research.", exampleValue: "State-specific context for California:\n\nAPPLICABLE STATUTE OF LIMITATIONS (matched to this dispute type):\n- security_deposit: 2 years (Cal. Civ. Code § 1950.5)\n\nSTATUTORY DAMAGE MULTIPLIERS THAT MAY APPLY HERE:\n- Cal. Civ. Code § 1950.5(l): 2x — willful retention of security deposit\n\nIMPORTANT: If a multiplier above clearly applies..." },
];

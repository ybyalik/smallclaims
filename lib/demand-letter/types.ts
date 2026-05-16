// Shared types for the demand-letter intake + generation pipeline.

import type { DisputeType, PostalAddress } from "../supabase/types";

export interface DemandLetterIntake {
  // who's suing
  plaintiff_name: string;
  plaintiff_address: PostalAddress;
  plaintiff_email: string;
  plaintiff_phone?: string;
  // who's being sued
  defendant_name: string;
  defendant_address: PostalAddress;
  defendant_email?: string;
  defendant_phone?: string;
  // case details
  state: string; // 2-letter
  dispute_type: DisputeType;
  amount_cents: number;
  facts_narrative: string;
  cure_period_days: number; // default 14
  // optional, used when we have full state research
  state_specific_enhanced: boolean;
  // User's explicit consent at checkout to include the "will file in small
  // claims court" threat. "no" = letter must omit the consequence/court
  // threat and close with a seriousness note instead.
  lawsuit_threat_consent?: "yes" | "no";
  // Whether to put CivilCase's letterhead + cover letter on the package.
  // "yes" (default, recommended) = CivilCase letterhead at top, plus a
  // separate cover-page note from CivilCase. "no" = plaintiff's own name and
  // address on the letterhead, no cover letter.
  civilcase_letterhead?: "yes" | "no";
  // Free-text description when dispute_type is "other". Plugs into the
  // letter prompt so the LLM has something concrete to anchor on instead of
  // the generic "an unresolved civil dispute" fallback.
  dispute_type_other?: string;
  // Resolved canonical legal claim type(s) for the case. Set by the
  // classifier (lib/cases/classify-claim-type.ts) and read by the letter
  // prompt + the state-law context picker so SOL / interest / multiplier
  // rows match what actually happened, not just the wizard category.
  primary_claim_type?: string;
  secondary_claim_types?: string[];
}

export interface DemandLetterDraft {
  body_md: string;
  template_key: string;
  cure_period_days: number;
  generated_by: string;
}

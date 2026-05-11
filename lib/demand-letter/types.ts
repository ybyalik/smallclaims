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
}

export interface DemandLetterDraft {
  body_md: string;
  template_key: string;
  cure_period_days: number;
  generated_by: string;
}

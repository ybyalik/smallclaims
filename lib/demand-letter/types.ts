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

export interface DisputeOption {
  value: DisputeType;
  label: string;
  shortDescription: string;
  examplePrompt: string;
}

export const DISPUTE_OPTIONS: DisputeOption[] = [
  {
    value: "unpaid_debt",
    label: "Unpaid debt or loan",
    shortDescription: "Someone owes you money — personal loan, IOU, unpaid invoice.",
    examplePrompt: "Example: I loaned my friend $2,500 in March 2025 with a written promise to repay by July. They paid back $500 and stopped responding.",
  },
  {
    value: "security_deposit",
    label: "Security deposit",
    shortDescription: "Landlord won't return your deposit, or kept too much without itemizing.",
    examplePrompt: "Example: I moved out of my apartment on March 15. The landlord sent me a check for $300 of my $1,500 deposit with no itemized list of damages.",
  },
  {
    value: "property_damage",
    label: "Property damage",
    shortDescription: "Someone damaged your car, belongings, or other property.",
    examplePrompt: "Example: A neighbor's tree fell on my fence during a storm. They knew it was rotted but did nothing. Repairs cost $2,800.",
  },
  {
    value: "services_not_rendered",
    label: "Services not delivered or done poorly",
    shortDescription: "You paid for work that wasn't done, or done badly enough to need redoing.",
    examplePrompt: "Example: I paid a contractor $4,000 deposit to remodel my bathroom. They demolished it, did half the work, then disappeared.",
  },
  {
    value: "goods_not_delivered",
    label: "Product not delivered or refund refused",
    shortDescription: "You paid for something that never showed up, or arrived broken and they won't refund.",
    examplePrompt: "Example: I paid $1,200 for furniture online. It arrived damaged. The seller refuses to refund or replace.",
  },
];

export interface DemandLetterDraft {
  body_md: string;
  template_key: string;
  cure_period_days: number;
  generated_by: string;
}

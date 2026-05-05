// The 15 dispute-type categories shown on Phase 0.1 (category picker)
// and reused on Phase 3.3 (claim-type confirmation).
// Each maps to a DisputeType enum value in the database.

import type { DisputeType } from "../supabase/types";

export interface Category {
  slug: DisputeType;
  label: string;
  blurb: string;
}

export const CATEGORIES: Category[] = [
  { slug: "unpaid_debt", label: "Unpaid Debt or Loan", blurb: "Personal loan, IOU, or unpaid invoice." },
  { slug: "breach_of_contract", label: "Breach of Contract", blurb: "Written or verbal agreement broken." },
  { slug: "property_damage", label: "Property Damage", blurb: "Damage to your home, car, or belongings." },
  { slug: "defective_product_or_service", label: "Defective Product or Service", blurb: "Doesn't work as promised." },
  { slug: "unpaid_rent_or_deposit", label: "Unpaid Rent or Security Deposit", blurb: "Money not returned or paid." },
  { slug: "tenant_landlord", label: "Tenant / Landlord Dispute", blurb: "Habitability, lease, or rights issues." },
  { slug: "auto_accident_or_repair", label: "Auto Accident or Repair", blurb: "Collision, mechanic, or shop dispute." },
  { slug: "stolen_or_damaged_property", label: "Stolen or Damaged Property", blurb: "Theft, vandalism, or negligence." },
  { slug: "poor_construction", label: "Poor Construction", blurb: "Contractor work that wasn't done right." },
  { slug: "broken_verbal_promise", label: "Broken Verbal Promise", blurb: "Handshake deal not honored." },
  { slug: "personal_injury", label: "Personal Injury", blurb: "Hurt by someone else's actions." },
  { slug: "defamation", label: "Defamation", blurb: "False statements that hurt your reputation." },
  { slug: "consumer_protection", label: "Consumer Protection", blurb: "Deceptive trade practices, fraud." },
  { slug: "ip_or_copyright", label: "IP / Copyright", blurb: "Stolen images, code, brand, or content." },
  { slug: "other", label: "Other / Not Sure", blurb: "Something else. We'll figure it out." },
];

export function getCategory(slug: DisputeType): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

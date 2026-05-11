// Canonical 11 + other dispute-type categories shown in the case-builder
// category step and the case-score quiz. neighbor + roommate are not in
// this list; they stay in the DB enum but are no longer offered in the
// picker.

import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Car,
  HandCoins,
  Hammer,
  Receipt,
  ShoppingBag,
  Briefcase,
  PackageX,
  Stethoscope,
  Shield,
  PawPrint,
  HelpCircle,
} from "lucide-react";
import type { DisputeType } from "../supabase/types";

export interface Category {
  slug: DisputeType;
  label: string;
  blurb: string;
  icon: LucideIcon;
}

export const CATEGORIES: Category[] = [
  { slug: "landlord", label: "Landlord/Tenant", blurb: "Security deposit, repairs, mold, illegal lockout, eviction, last month's rent.", icon: Building2 },
  { slug: "auto", label: "Auto/Vehicle", blurb: "Accident damage, mechanic, dealership fraud, lemon, towing, valet, parked-car hit.", icon: Car },
  { slug: "personal_loan", label: "Personal Loan/Debt", blurb: "Money lent to friend, family, ex, business partner. IOU, verbal agreement.", icon: HandCoins },
  { slug: "contractor", label: "Contractor/Home Improvement", blurb: "Took deposit and bailed, unfinished work, damage during work.", icon: Hammer },
  { slug: "refund", label: "Consumer Refund", blurb: "Defective product, gym, salon, dry cleaner, services not rendered.", icon: Receipt },
  { slug: "online_seller", label: "Online Purchase", blurb: "eBay, Amazon, Etsy, Marketplace, OfferUp. Item not delivered or not as described.", icon: ShoppingBag },
  { slug: "employer", label: "Employer/Employee", blurb: "Unpaid wages, last paycheck, stolen tips, overtime, severance, missing W-2.", icon: Briefcase },
  { slug: "property_damage", label: "Property Damage", blurb: "Mover, dry cleaner, storage, kennel, hotel, airline luggage, parking lot.", icon: PackageX },
  { slug: "medical_billing", label: "Medical/Dental Billing", blurb: "Surprise bill, balance billing, double-charge, debt collector for paid bill.", icon: Stethoscope },
  { slug: "insurance", label: "Insurance Issues", blurb: "Denied or underpaid claim. Auto, renters, homeowners, warranty insurer.", icon: Shield },
  { slug: "pet_injury", label: "Pet Injuries", blurb: "Dog bite, neighbor's dog, kennel injury, dog walker, off-leash incident.", icon: PawPrint },
  { slug: "other", label: "Other", blurb: "Doesn't fit the categories above.", icon: HelpCircle },
];

export function getCategory(slug: DisputeType): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

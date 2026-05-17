// Turns the backend's snake_case claim/method codes into reader-friendly
// labels. The structured_pack stores values like "written_contract" or
// "personal_service_by_sheriff" because that's what the extractor's
// schema enforces; the page should never show those raw codes.

const OVERRIDES: Record<string, string> = {
  // Claim types
  written_contract: "Written contract",
  oral_contract: "Oral contract",
  open_account: "Unpaid invoice or open account",
  consumer_protection: "Consumer protection (unfair business practices)",
  bad_check: "Bad check / bounced check",
  wages: "Unpaid wages",
  property_damage: "Property damage",
  personal_injury: "Personal injury",
  negligence: "Negligence",
  fraud: "Fraud",
  conversion: "Someone took or kept your stuff",
  unjust_enrichment: "Unjust enrichment",
  breach_of_warranty: "Breach of warranty",
  security_deposit: "Security deposit",
  landlord_tenant: "Landlord / tenant",
  return_of_goods: "Return of goods",
  rent_overcharge: "Rent overcharge",
  goods_sold_delivered: "Goods sold and delivered",
  services_rendered: "Services not paid for",
  money_lent: "Money lent",
  // Service methods
  certified_mail_by_clerk: "Certified mail (by court clerk)",
  certified_mail: "Certified mail",
  personal_service_by_sheriff: "Personal service by sheriff",
  personal_service: "Personal service",
  process_server: "Private process server",
  substitute_service: "Substitute service",
  service_by_publication: "Service by publication",
  posting: "Posting / nail-and-mail",
};

export function humanize(value: string | undefined | null): string {
  if (!value) return "";
  const lower = value.toLowerCase().trim();
  if (OVERRIDES[lower]) return OVERRIDES[lower];
  // Generic fallback: snake_case -> Title Case
  return lower
    .split("_")
    .filter(Boolean)
    .map((w, i) => (i === 0 ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

export function humanizeList(values: (string | undefined | null)[]): string {
  return values
    .map((v) => humanize(v))
    .filter(Boolean)
    .join(", ");
}

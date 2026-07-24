// Shared helpers for postal addresses, including international plaintiffs.
//
// Background (2026-07-24): plaintiffs can live outside the US (e.g. a
// contractor in Brazil chasing a Texas invoice). The DISPUTE still lives in a
// US state — venue, state law, and the defendant's address are unchanged —
// but the plaintiff's own contact address may be foreign. The wizard stores
// that in the same PostalAddress JSON with a `country` field; a missing/US
// country means a domestic address and every legacy row behaves exactly as
// before.

const US_PATTERN = /^(us|usa|u\.s\.?a?\.?|united states( of america)?)$/i;

// True when a country value names somewhere other than the United States.
// Empty / missing / "US"-ish values are all treated as domestic.
export function isInternationalCountry(country?: string | null): boolean {
  const c = (country ?? "").trim();
  if (!c) return false;
  return !US_PATTERN.test(c);
}

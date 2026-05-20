// Geographic adjacency map for the 50 states + DC. Used to render the
// "Neighboring states" block at the bottom of each state guide so every
// state page is internally linked to nearby states (helps Googlebot /
// Screaming Frog discover the full set without listing all 50 per page).
//
// Alaska and Hawaii have no land neighbors. We fall back to a curated
// "popular states" list for those two so the block still emits useful
// internal links.

export const STATE_NEIGHBORS: Record<string, string[]> = {
  alabama: ["florida", "georgia", "tennessee", "mississippi"],
  alaska: [],
  arizona: ["california", "nevada", "utah", "colorado", "new-mexico"],
  arkansas: ["louisiana", "mississippi", "missouri", "oklahoma", "tennessee", "texas"],
  california: ["arizona", "nevada", "oregon"],
  colorado: ["arizona", "kansas", "nebraska", "new-mexico", "oklahoma", "utah", "wyoming"],
  connecticut: ["massachusetts", "new-york", "rhode-island"],
  delaware: ["maryland", "new-jersey", "pennsylvania"],
  "district-of-columbia": ["maryland", "virginia"],
  florida: ["alabama", "georgia"],
  georgia: ["alabama", "florida", "north-carolina", "south-carolina", "tennessee"],
  hawaii: [],
  idaho: ["montana", "nevada", "oregon", "utah", "washington", "wyoming"],
  illinois: ["indiana", "iowa", "kentucky", "missouri", "wisconsin"],
  indiana: ["illinois", "kentucky", "michigan", "ohio"],
  iowa: ["illinois", "minnesota", "missouri", "nebraska", "south-dakota", "wisconsin"],
  kansas: ["colorado", "missouri", "nebraska", "oklahoma"],
  kentucky: ["illinois", "indiana", "missouri", "ohio", "tennessee", "virginia", "west-virginia"],
  louisiana: ["arkansas", "mississippi", "texas"],
  maine: ["new-hampshire"],
  maryland: ["delaware", "district-of-columbia", "pennsylvania", "virginia", "west-virginia"],
  massachusetts: ["connecticut", "new-hampshire", "new-york", "rhode-island", "vermont"],
  michigan: ["indiana", "ohio", "wisconsin"],
  minnesota: ["iowa", "north-dakota", "south-dakota", "wisconsin"],
  mississippi: ["alabama", "arkansas", "louisiana", "tennessee"],
  missouri: ["arkansas", "illinois", "iowa", "kansas", "kentucky", "nebraska", "oklahoma", "tennessee"],
  montana: ["idaho", "north-dakota", "south-dakota", "wyoming"],
  nebraska: ["colorado", "iowa", "kansas", "missouri", "south-dakota", "wyoming"],
  nevada: ["arizona", "california", "idaho", "oregon", "utah"],
  "new-hampshire": ["maine", "massachusetts", "vermont"],
  "new-jersey": ["delaware", "new-york", "pennsylvania"],
  "new-mexico": ["arizona", "colorado", "oklahoma", "texas", "utah"],
  "new-york": ["connecticut", "massachusetts", "new-jersey", "pennsylvania", "vermont"],
  "north-carolina": ["georgia", "south-carolina", "tennessee", "virginia"],
  "north-dakota": ["minnesota", "montana", "south-dakota"],
  ohio: ["indiana", "kentucky", "michigan", "pennsylvania", "west-virginia"],
  oklahoma: ["arkansas", "colorado", "kansas", "missouri", "new-mexico", "texas"],
  oregon: ["california", "idaho", "nevada", "washington"],
  pennsylvania: ["delaware", "maryland", "new-jersey", "new-york", "ohio", "west-virginia"],
  "rhode-island": ["connecticut", "massachusetts"],
  "south-carolina": ["georgia", "north-carolina"],
  "south-dakota": ["iowa", "minnesota", "montana", "nebraska", "north-dakota", "wyoming"],
  tennessee: ["alabama", "arkansas", "georgia", "kentucky", "mississippi", "missouri", "north-carolina", "virginia"],
  texas: ["arkansas", "louisiana", "new-mexico", "oklahoma"],
  utah: ["arizona", "colorado", "idaho", "nevada", "new-mexico", "wyoming"],
  vermont: ["massachusetts", "new-hampshire", "new-york"],
  virginia: ["district-of-columbia", "kentucky", "maryland", "north-carolina", "tennessee", "west-virginia"],
  washington: ["idaho", "oregon"],
  "west-virginia": ["kentucky", "maryland", "ohio", "pennsylvania", "virginia"],
  wisconsin: ["illinois", "iowa", "michigan", "minnesota"],
  wyoming: ["colorado", "idaho", "montana", "nebraska", "south-dakota", "utah"],
};

// Fallback for the two non-contiguous states. Pulls from the curated
// "Most popular" list so a Hawaii or Alaska reader still has links out.
const POPULAR_FALLBACK = [
  "california",
  "texas",
  "new-york",
  "florida",
  "pennsylvania",
  "georgia",
];

export function getNeighbors(slug: string): string[] {
  const list = STATE_NEIGHBORS[slug] ?? [];
  if (list.length > 0) return list;
  return POPULAR_FALLBACK.filter((s) => s !== slug);
}

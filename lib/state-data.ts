import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import type { StateGuide } from "./types/state-guide";
import { evidenceToStateGuide } from "./evidence-to-state-guide";

// Hand-curated state guides take priority. Add to this map as new
// /data/<slug>.ts files land.
const REGISTRY: Record<string, () => Promise<{ data: StateGuide }>> = {
  delaware: () => import("../data/delaware"),
  minnesota: () => import("../data/minnesota"),
  texas: () => import("../data/texas"),
  wyoming: () => import("../data/wyoming"),
};

const REPORTS_DIR = resolve(process.cwd(), "reports");

function evidenceSlugs(): string[] {
  if (!existsSync(REPORTS_DIR)) return [];
  return readdirSync(REPORTS_DIR)
    .filter((f) => f.endsWith("-evidence.json") && !f.endsWith(".raw.json"))
    .map((f) => f.replace(/-evidence\.json$/, ""));
}

function loadEvidenceGuide(slug: string): StateGuide | null {
  const path = resolve(REPORTS_DIR, `${slug}-evidence.json`);
  if (!existsSync(path)) return null;
  try {
    const pack = JSON.parse(readFileSync(path, "utf8"));
    return evidenceToStateGuide(pack);
  } catch (e) {
    console.error(`failed to load evidence for ${slug}:`, e);
    return null;
  }
}

export async function loadStateGuide(slug: string): Promise<StateGuide | null> {
  // Hand-curated wins
  const loader = REGISTRY[slug];
  if (loader) {
    const mod = await loader();
    return mod.data;
  }
  // Fall back to evidence pack from the research pipeline
  return loadEvidenceGuide(slug);
}

export function availableStateSlugs(): string[] {
  const set = new Set<string>(Object.keys(REGISTRY));
  for (const slug of evidenceSlugs()) set.add(slug);
  return [...set];
}

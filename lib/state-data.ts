import type { StateGuide } from "./types/state-guide";

// Static registry of states with hand-crafted data files.
// Add new states here as their /data/<slug>.ts files land.
const REGISTRY: Record<string, () => Promise<{ data: StateGuide }>> = {
  delaware: () => import("../data/delaware"),
  minnesota: () => import("../data/minnesota"),
  texas: () => import("../data/texas"),
  wyoming: () => import("../data/wyoming"),
};

export async function loadStateGuide(slug: string): Promise<StateGuide | null> {
  const loader = REGISTRY[slug];
  if (!loader) return null;
  const mod = await loader();
  return mod.data;
}

export function availableStateSlugs(): string[] {
  return Object.keys(REGISTRY);
}

import type { MetadataRoute } from "next";
import { STATES } from "../lib/states";
import { availableStateSlugs } from "../lib/state-data";

const BASE = "https://smallclaims.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const ready = new Set(availableStateSlugs());
  const stateUrls: MetadataRoute.Sitemap = STATES.filter((s) => ready.has(s.slug)).map((s) => ({
    url: `${BASE}/guides/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    { url: `${BASE}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/guides`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    ...stateUrls,
  ];
}

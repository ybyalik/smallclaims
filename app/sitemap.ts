import type { MetadataRoute } from "next";
import { STATES } from "../lib/states";
import { availableReportSlugs } from "../lib/reports";

const BASE = "https://smallclaims.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const ready = new Set(availableReportSlugs());
  const stateUrls: MetadataRoute.Sitemap = STATES.filter((s) => {
    const variants = [s.slug, s.slug.replace(/-/g, "")];
    return variants.some((v) => ready.has(v));
  }).map((s) => ({
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

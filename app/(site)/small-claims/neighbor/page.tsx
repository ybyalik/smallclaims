import type { Metadata } from "next";
import CategoryTemplate from "../../../../components/categories/CategoryTemplate";
import { NEIGHBOR_HUB } from "../../../../lib/category-hubs/neighbor";

export const metadata: Metadata = {
  title: NEIGHBOR_HUB.meta.title,
  description: NEIGHBOR_HUB.meta.description,
  alternates: { canonical: `/small-claims/${NEIGHBOR_HUB.categorySlug}` },
  openGraph: {
    title: NEIGHBOR_HUB.meta.ogTitle ?? NEIGHBOR_HUB.meta.title,
    description: NEIGHBOR_HUB.meta.ogDescription ?? NEIGHBOR_HUB.meta.description,
    url: `/small-claims/${NEIGHBOR_HUB.categorySlug}`,
    type: "article",
  },
};

export default function NeighborHubPage() {
  return <CategoryTemplate data={NEIGHBOR_HUB} />;
}

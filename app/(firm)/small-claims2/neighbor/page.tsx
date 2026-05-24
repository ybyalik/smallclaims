import type { Metadata } from "next";
import { FirmCategoryTemplate } from "../../../../components/firm";
import { NEIGHBOR_HUB } from "../../../../lib/category-hubs/neighbor";

export const metadata: Metadata = {
  title: NEIGHBOR_HUB.meta.title,
  description: NEIGHBOR_HUB.meta.description,
  alternates: { canonical: `/small-claims2/${NEIGHBOR_HUB.categorySlug}` },
  robots: { index: false, follow: false },
};

export default function NeighborHub2() {
  return <FirmCategoryTemplate data={NEIGHBOR_HUB} />;
}

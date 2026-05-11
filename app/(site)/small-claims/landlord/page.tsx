import type { Metadata } from "next";
import CategoryTemplate from "../../../../components/categories/CategoryTemplate";
import { LANDLORD_HUB } from "../../../../lib/category-hubs/landlord";

export const metadata: Metadata = {
  title: LANDLORD_HUB.meta.title,
  description: LANDLORD_HUB.meta.description,
  alternates: { canonical: `/small-claims/${LANDLORD_HUB.categorySlug}` },
  openGraph: {
    title: LANDLORD_HUB.meta.ogTitle ?? LANDLORD_HUB.meta.title,
    description: LANDLORD_HUB.meta.ogDescription ?? LANDLORD_HUB.meta.description,
    url: `/small-claims/${LANDLORD_HUB.categorySlug}`,
    type: "article",
  },
};

export default function LandlordHubPage() {
  return <CategoryTemplate data={LANDLORD_HUB} />;
}

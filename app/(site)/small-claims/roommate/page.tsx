import type { Metadata } from "next";
import CategoryTemplate from "../../../../components/categories/CategoryTemplate";
import { ROOMMATE_HUB } from "../../../../lib/category-hubs/roommate";

export const metadata: Metadata = {
  title: ROOMMATE_HUB.meta.title,
  description: ROOMMATE_HUB.meta.description,
  alternates: { canonical: `/small-claims/${ROOMMATE_HUB.categorySlug}` },
  openGraph: {
    title: ROOMMATE_HUB.meta.ogTitle ?? ROOMMATE_HUB.meta.title,
    description: ROOMMATE_HUB.meta.ogDescription ?? ROOMMATE_HUB.meta.description,
    url: `/small-claims/${ROOMMATE_HUB.categorySlug}`,
    type: "article",
  },
};

export default function RoommateHubPage() {
  return <CategoryTemplate data={ROOMMATE_HUB} />;
}

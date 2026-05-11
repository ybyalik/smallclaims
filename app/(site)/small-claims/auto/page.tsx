import type { Metadata } from "next";
import CategoryTemplate from "../../../../components/categories/CategoryTemplate";
import { AUTO_HUB } from "../../../../lib/category-hubs/auto";

export const metadata: Metadata = {
  title: AUTO_HUB.meta.title,
  description: AUTO_HUB.meta.description,
  alternates: { canonical: `/small-claims/${AUTO_HUB.categorySlug}` },
  openGraph: {
    title: AUTO_HUB.meta.ogTitle ?? AUTO_HUB.meta.title,
    description: AUTO_HUB.meta.ogDescription ?? AUTO_HUB.meta.description,
    url: `/small-claims/${AUTO_HUB.categorySlug}`,
    type: "article",
  },
};

export default function AutoHubPage() {
  return <CategoryTemplate data={AUTO_HUB} />;
}

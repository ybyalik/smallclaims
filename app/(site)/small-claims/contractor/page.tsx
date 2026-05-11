import type { Metadata } from "next";
import CategoryTemplate from "../../../../components/categories/CategoryTemplate";
import { CONTRACTOR_HUB } from "../../../../lib/category-hubs/contractor";

export const metadata: Metadata = {
  title: CONTRACTOR_HUB.meta.title,
  description: CONTRACTOR_HUB.meta.description,
  alternates: { canonical: `/small-claims/${CONTRACTOR_HUB.categorySlug}` },
  openGraph: {
    title: CONTRACTOR_HUB.meta.ogTitle ?? CONTRACTOR_HUB.meta.title,
    description: CONTRACTOR_HUB.meta.ogDescription ?? CONTRACTOR_HUB.meta.description,
    url: `/small-claims/${CONTRACTOR_HUB.categorySlug}`,
    type: "article",
  },
};

export default function ContractorHubPage() {
  return <CategoryTemplate data={CONTRACTOR_HUB} />;
}

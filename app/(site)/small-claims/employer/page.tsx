import type { Metadata } from "next";
import CategoryTemplate from "../../../../components/categories/CategoryTemplate";
import { EMPLOYER_HUB } from "../../../../lib/category-hubs/employer";

export const metadata: Metadata = {
  title: EMPLOYER_HUB.meta.title,
  description: EMPLOYER_HUB.meta.description,
  alternates: { canonical: `/small-claims/${EMPLOYER_HUB.categorySlug}` },
  openGraph: {
    title: EMPLOYER_HUB.meta.ogTitle ?? EMPLOYER_HUB.meta.title,
    description: EMPLOYER_HUB.meta.ogDescription ?? EMPLOYER_HUB.meta.description,
    url: `/small-claims/${EMPLOYER_HUB.categorySlug}`,
    type: "article",
  },
};

export default function EmployerHubPage() {
  return <CategoryTemplate data={EMPLOYER_HUB} />;
}

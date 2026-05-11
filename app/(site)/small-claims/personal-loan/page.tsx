import type { Metadata } from "next";
import CategoryTemplate from "../../../../components/categories/CategoryTemplate";
import { PERSONAL_LOAN_HUB } from "../../../../lib/category-hubs/personal-loan";

export const metadata: Metadata = {
  title: PERSONAL_LOAN_HUB.meta.title,
  description: PERSONAL_LOAN_HUB.meta.description,
  alternates: { canonical: `/small-claims/${PERSONAL_LOAN_HUB.categorySlug}` },
  openGraph: {
    title: PERSONAL_LOAN_HUB.meta.ogTitle ?? PERSONAL_LOAN_HUB.meta.title,
    description: PERSONAL_LOAN_HUB.meta.ogDescription ?? PERSONAL_LOAN_HUB.meta.description,
    url: `/small-claims/${PERSONAL_LOAN_HUB.categorySlug}`,
    type: "article",
  },
};

export default function PersonalLoanHubPage() {
  return <CategoryTemplate data={PERSONAL_LOAN_HUB} />;
}

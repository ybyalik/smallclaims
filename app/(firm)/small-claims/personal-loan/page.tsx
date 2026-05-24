import type { Metadata } from "next";
import { FirmCategoryTemplate } from "../../../../components/firm";
import { PERSONAL_LOAN_HUB } from "../../../../lib/category-hubs/personal-loan";

export const metadata: Metadata = {
  title: PERSONAL_LOAN_HUB.meta.title,
  description: PERSONAL_LOAN_HUB.meta.description,
  alternates: { canonical: `/small-claims/${PERSONAL_LOAN_HUB.categorySlug}` },
};

export default function PersonalLoanHub2() {
  return <FirmCategoryTemplate data={PERSONAL_LOAN_HUB} />;
}

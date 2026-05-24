import type { Metadata } from "next";
import { FirmCategoryTemplate } from "../../../../components/firm";
import { EMPLOYER_HUB } from "../../../../lib/category-hubs/employer";

export const metadata: Metadata = {
  title: EMPLOYER_HUB.meta.title,
  description: EMPLOYER_HUB.meta.description,
  alternates: { canonical: `/small-claims/${EMPLOYER_HUB.categorySlug}` },
};

export default function EmployerHub2() {
  return <FirmCategoryTemplate data={EMPLOYER_HUB} />;
}

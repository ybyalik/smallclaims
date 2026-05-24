import type { Metadata } from "next";
import { FirmCategoryTemplate } from "../../../../components/firm";
import { EMPLOYER_HUB } from "../../../../lib/category-hubs/employer";

export const metadata: Metadata = {
  title: EMPLOYER_HUB.meta.title,
  description: EMPLOYER_HUB.meta.description,
  alternates: { canonical: `/small-claims2/${EMPLOYER_HUB.categorySlug}` },
  robots: { index: false, follow: false },
};

export default function EmployerHub2() {
  return <FirmCategoryTemplate data={EMPLOYER_HUB} />;
}

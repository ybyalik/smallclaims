import type { Metadata } from "next";
import { FirmCategoryTemplate } from "../../../../components/firm";
import { CONTRACTOR_HUB } from "../../../../lib/category-hubs/contractor";

export const metadata: Metadata = {
  title: CONTRACTOR_HUB.meta.title,
  description: CONTRACTOR_HUB.meta.description,
  alternates: { canonical: `/small-claims2/${CONTRACTOR_HUB.categorySlug}` },
  robots: { index: false, follow: false },
};

export default function ContractorHub2() {
  return <FirmCategoryTemplate data={CONTRACTOR_HUB} />;
}

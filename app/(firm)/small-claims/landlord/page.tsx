import type { Metadata } from "next";
import { FirmCategoryTemplate } from "../../../../components/firm";
import { LANDLORD_HUB } from "../../../../lib/category-hubs/landlord";

export const metadata: Metadata = {
  title: LANDLORD_HUB.meta.title,
  description: LANDLORD_HUB.meta.description,
  alternates: { canonical: `/small-claims/${LANDLORD_HUB.categorySlug}` },
};

export default function LandlordHub2() {
  return <FirmCategoryTemplate data={LANDLORD_HUB} />;
}

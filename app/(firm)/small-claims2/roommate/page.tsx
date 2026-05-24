import type { Metadata } from "next";
import { FirmCategoryTemplate } from "../../../../components/firm";
import { ROOMMATE_HUB } from "../../../../lib/category-hubs/roommate";

export const metadata: Metadata = {
  title: ROOMMATE_HUB.meta.title,
  description: ROOMMATE_HUB.meta.description,
  alternates: { canonical: `/small-claims2/${ROOMMATE_HUB.categorySlug}` },
  robots: { index: false, follow: false },
};

export default function RoommateHub2() {
  return <FirmCategoryTemplate data={ROOMMATE_HUB} />;
}

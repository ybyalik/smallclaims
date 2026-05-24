import type { Metadata } from "next";
import { FirmCategoryTemplate } from "../../../../components/firm";
import { AUTO_HUB } from "../../../../lib/category-hubs/auto";

export const metadata: Metadata = {
  title: AUTO_HUB.meta.title,
  description: AUTO_HUB.meta.description,
  alternates: { canonical: `/small-claims2/${AUTO_HUB.categorySlug}` },
  robots: { index: false, follow: false },
};

export default function AutoHub2() {
  return <FirmCategoryTemplate data={AUTO_HUB} />;
}

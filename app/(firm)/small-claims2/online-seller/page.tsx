import type { Metadata } from "next";
import { FirmCategoryTemplate } from "../../../../components/firm";
import { ONLINE_SELLER_HUB } from "../../../../lib/category-hubs/online-seller";

export const metadata: Metadata = {
  title: ONLINE_SELLER_HUB.meta.title,
  description: ONLINE_SELLER_HUB.meta.description,
  alternates: { canonical: `/small-claims2/${ONLINE_SELLER_HUB.categorySlug}` },
  robots: { index: false, follow: false },
};

export default function OnlineSellerHub2() {
  return <FirmCategoryTemplate data={ONLINE_SELLER_HUB} />;
}

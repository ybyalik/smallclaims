import type { Metadata } from "next";
import CategoryTemplate from "../../../../components/categories/CategoryTemplate";
import { ONLINE_SELLER_HUB } from "../../../../lib/category-hubs/online-seller";

export const metadata: Metadata = {
  title: ONLINE_SELLER_HUB.meta.title,
  description: ONLINE_SELLER_HUB.meta.description,
  alternates: { canonical: `/small-claims/${ONLINE_SELLER_HUB.categorySlug}` },
  openGraph: {
    title: ONLINE_SELLER_HUB.meta.ogTitle ?? ONLINE_SELLER_HUB.meta.title,
    description: ONLINE_SELLER_HUB.meta.ogDescription ?? ONLINE_SELLER_HUB.meta.description,
    url: `/small-claims/${ONLINE_SELLER_HUB.categorySlug}`,
    type: "article",
  },
};

export default function OnlineSellerHubPage() {
  return <CategoryTemplate data={ONLINE_SELLER_HUB} />;
}

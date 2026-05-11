import type { Metadata } from "next";
import CategoryTemplate from "../../../../components/categories/CategoryTemplate";
import { REFUND_HUB } from "../../../../lib/category-hubs/refund";

export const metadata: Metadata = {
  title: REFUND_HUB.meta.title,
  description: REFUND_HUB.meta.description,
  alternates: { canonical: `/small-claims/${REFUND_HUB.categorySlug}` },
  openGraph: {
    title: REFUND_HUB.meta.ogTitle ?? REFUND_HUB.meta.title,
    description: REFUND_HUB.meta.ogDescription ?? REFUND_HUB.meta.description,
    url: `/small-claims/${REFUND_HUB.categorySlug}`,
    type: "article",
  },
};

export default function RefundHubPage() {
  return <CategoryTemplate data={REFUND_HUB} />;
}

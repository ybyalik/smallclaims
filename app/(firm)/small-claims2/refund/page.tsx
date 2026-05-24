import type { Metadata } from "next";
import { FirmCategoryTemplate } from "../../../../components/firm";
import { REFUND_HUB } from "../../../../lib/category-hubs/refund";

export const metadata: Metadata = {
  title: REFUND_HUB.meta.title,
  description: REFUND_HUB.meta.description,
  alternates: { canonical: `/small-claims2/${REFUND_HUB.categorySlug}` },
  robots: { index: false, follow: false },
};

export default function RefundHub2() {
  return <FirmCategoryTemplate data={REFUND_HUB} />;
}

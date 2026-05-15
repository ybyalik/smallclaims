// The /products route was merged into the main /case/[id] page. This
// redirect keeps old bookmarks and post-checkout links working.

import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default function LegacyProductsRedirect({
  params,
}: {
  params: { id: string };
}) {
  redirect(`/case/${params.id}`);
}

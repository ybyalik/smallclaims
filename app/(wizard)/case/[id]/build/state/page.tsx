// Legacy prescreen route. State is now collected as part of Eligibility
// (Phase 1). Redirect to /build root so the user lands on the right phase.

import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default function LegacyStateStep({ params }: { params: { id: string } }) {
  redirect(`/case/${params.id}/build`);
}

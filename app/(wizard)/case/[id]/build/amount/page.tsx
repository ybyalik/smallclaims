// Legacy prescreen route. The standalone Amount step is gone — the
// principal amount is now collected in Phase 1 (Eligibility). Redirect
// to /build so the wizard router lands the user on the first unfilled
// phase.

import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default function LegacyAmountStep({ params }: { params: { id: string } }) {
  redirect(`/case/${params.id}/build`);
}

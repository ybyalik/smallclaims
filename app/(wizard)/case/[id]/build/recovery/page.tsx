// Legacy prescreen "Recovery preview" route. The take-home calculator
// was built when the demand letter was our only product and is no longer
// representative of how the platform works (three products now, customer
// picks after the case is built). Redirect to /build root so the user
// lands on the first unfilled phase.

import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default function LegacyRecoveryStep({ params }: { params: { id: string } }) {
  redirect(`/case/${params.id}/build`);
}

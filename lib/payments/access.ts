import { createServiceRoleClient } from "../supabase/service-role";
import type { ProductKey } from "../stripe";

// Returns true if the case has at least one succeeded payment for the given
// product_key. Service-role read so callers don't have to plumb auth through.

export async function hasPaidForProduct(
  caseId: string,
  productKey: ProductKey,
): Promise<boolean> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;
  const { data } = await admin
    .from("payments")
    .select("id")
    .eq("case_id", caseId)
    .eq("status", "succeeded")
    .eq("product_key", productKey)
    .limit(1);
  return Array.isArray(data) && data.length > 0;
}

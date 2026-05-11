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

/**
 * Bulk variant — one query for multiple product keys. Returns a Set of the
 * product_keys that have a succeeded payment. Use this on pages that need
 * to know about more than one product to avoid N round-trips.
 */
export async function paidProductsForCase(
  caseId: string,
  productKeys: readonly ProductKey[],
): Promise<Set<ProductKey>> {
  if (productKeys.length === 0) return new Set();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;
  const { data } = await admin
    .from("payments")
    .select("product_key")
    .eq("case_id", caseId)
    .eq("status", "succeeded")
    .in("product_key", productKeys as unknown as string[]);
  const set = new Set<ProductKey>();
  for (const row of (data ?? []) as Array<{ product_key: string }>) {
    set.add(row.product_key as ProductKey);
  }
  return set;
}

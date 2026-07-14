import { createServiceRoleClient } from "../supabase/service-role";
import type { ProductKey } from "../stripe";

// "Claimed" means the card has at least been authorized (paid_at is stamped
// on both authorization and capture). We use paid_at rather than status so
// the products page reflects the purchase the moment the card is held, not
// only after paralegal review captures the charge.
// Pending rows with no paid_at are orphans (PaymentIntent created but never
// confirmed) and correctly do not count.

export async function hasPaidForProduct(
  caseId: string,
  productKey: ProductKey,
): Promise<boolean> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;
  // Retry once on a DB error: a transient blip must NOT be silently read as
  // "unpaid", which would deny a paying customer their product and re-show the
  // buy page (inviting an accidental second purchase). We fail closed only
  // after two failed attempts, and always log loudly so it is not invisible.
  for (let attempt = 0; attempt < 2; attempt++) {
    const { data, error } = await admin
      .from("payments")
      .select("id")
      .eq("case_id", caseId)
      .eq("product_key", productKey)
      .not("paid_at", "is", null)
      .neq("status", "refunded")
      .limit(1);
    if (!error) return Array.isArray(data) && data.length > 0;
    console.error(
      `[hasPaidForProduct] payments query failed (attempt ${attempt + 1})`,
      { caseId, productKey, error: error.message ?? error },
    );
  }
  return false;
}

export async function paidProductsForCase(
  caseId: string,
  productKeys: readonly ProductKey[],
): Promise<Set<ProductKey>> {
  if (productKeys.length === 0) return new Set();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;
  const set = new Set<ProductKey>();
  for (let attempt = 0; attempt < 2; attempt++) {
    const { data, error } = await admin
      .from("payments")
      .select("product_key")
      .eq("case_id", caseId)
      .not("paid_at", "is", null)
      .neq("status", "refunded")
      .in("product_key", productKeys as unknown as string[]);
    if (!error) {
      for (const row of (data ?? []) as Array<{ product_key: string }>) {
        set.add(row.product_key as ProductKey);
      }
      return set;
    }
    console.error(
      `[paidProductsForCase] payments query failed (attempt ${attempt + 1})`,
      { caseId, error: error.message ?? error },
    );
  }
  return set;
}

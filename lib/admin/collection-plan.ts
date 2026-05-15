// Server-side loader used by the admin case page to fetch every version of
// the collection_plans row for display in CollectionPlanPanel.

import { createServiceRoleClient } from "../supabase/service-role";

export interface AdminCollectionPlan {
  id: string;
  case_id: string;
  version: number;
  status: string;
  error_message: string | null;
  intake: Record<string, unknown> | null;
  county_pack: Record<string, unknown> | null;
  sequence: Record<string, unknown> | null;
  body_md: string | null;
  body_html: string | null;
  generated_by: string | null;
  created_at: string;
  updated_at: string;
}

export async function loadCollectionPlansForAdmin(
  caseId: string,
): Promise<AdminCollectionPlan[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;
  const { data } = await admin
    .from("collection_plans")
    .select(
      "id, case_id, version, status, error_message, intake, county_pack, sequence, body_md, body_html, generated_by, created_at, updated_at",
    )
    .eq("case_id", caseId)
    .order("version", { ascending: false });
  return ((data ?? []) as AdminCollectionPlan[]) ?? [];
}

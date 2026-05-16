// Server-side loader used by the admin case page to fetch the latest
// demand_letters row for display in DemandLetterPanel.

import { createServiceRoleClient } from "../supabase/service-role";

export interface AdminDemandLetter {
  id: string;
  case_id: string;
  version: number;
  body_md: string;
  template_key: string | null;
  generated_by: string | null;
  mail_status: string | null;
  mail_vendor_letter_id: string | null;
  approval_status: "pending" | "approved" | "changes_requested" | null;
  approved_at: string | null;
  changes_requested_at: string | null;
  changes_text: string | null;
  created_at: string;
  updated_at: string | null;
}

export async function loadLatestDemandLetterForAdmin(
  caseId: string,
): Promise<AdminDemandLetter | null> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;
  const { data } = await admin
    .from("demand_letters")
    .select(
      "id, case_id, version, body_md, template_key, generated_by, mail_status, mail_vendor_letter_id, approval_status, approved_at, changes_requested_at, changes_text, created_at, updated_at",
    )
    .eq("case_id", caseId)
    .order("version", { ascending: false })
    .limit(1)
    .maybeSingle();
  return (data ?? null) as AdminDemandLetter | null;
}

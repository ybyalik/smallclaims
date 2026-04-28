// Single audit-log writer used by all server-side flows.
// Critical for UPL defense and customer disputes.

import { createServiceRoleClient } from "../supabase/service-role";
import type { AuditLogInsert } from "../supabase/types";

interface LogContext {
  case_id?: string | null;
  actor_user_id?: string | null;
  ip?: string | null;
  user_agent?: string | null;
  request_id?: string | null;
}

export async function logEvent(
  event_type: string,
  ctx: LogContext = {},
  extras: Partial<Omit<AuditLogInsert, "event_type">> = {}
): Promise<void> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabase = createServiceRoleClient() as any;
    await supabase.from("audit_log").insert({
      event_type,
      case_id: ctx.case_id ?? extras.case_id ?? null,
      actor_user_id: ctx.actor_user_id ?? extras.actor_user_id ?? null,
      ip: ctx.ip ?? extras.ip ?? null,
      user_agent: ctx.user_agent ?? extras.user_agent ?? null,
      request_id: ctx.request_id ?? extras.request_id ?? null,
      entity_type: extras.entity_type ?? null,
      entity_id: extras.entity_id ?? null,
      payload: extras.payload ?? null,
    });
  } catch (err) {
    // Audit failures must never block the user flow, but should surface in logs.
    console.error("[audit] log failed:", err, "event:", event_type);
  }
}

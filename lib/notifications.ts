// In-app notifications for the customer dashboard bell.
//
// Writes use the service-role client because they're typically triggered
// server-side from system actions (admin marks letter ready, PostGrid event
// fires, etc.) and we don't want RLS getting in the way of stamping a row
// the user shouldn't be able to write themselves.
//
// Reads / mark-read are done via the user-scoped client where RLS applies.

import { createServiceRoleClient } from "./supabase/service-role";
import type { Notification } from "./supabase/types";

export type NotificationType =
  | "letter_ready_for_review"
  | "letter_approved"
  | "letter_mailed"
  | "letter_in_transit"
  | "letter_delivered"
  | "letter_returned"
  | "changes_acknowledged";

interface CreateInput {
  userId: string;
  caseId?: string | null;
  type: NotificationType;
  title: string;
  body?: string | null;
  link?: string | null;
  // Default false. When true, the bell + per-case bell stays lit until
  // resolveActionRequired() is called (e.g., customer clicked Approve).
  actionRequired?: boolean;
}

export async function createNotification(input: CreateInput): Promise<void> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const admin = createServiceRoleClient() as any;
    const { error } = await admin.from("notifications").insert({
      user_id: input.userId,
      case_id: input.caseId ?? null,
      type: input.type,
      title: input.title,
      body: input.body ?? null,
      link: input.link ?? null,
      action_required: input.actionRequired ?? false,
    });
    if (error) {
      console.warn("[notifications] insert failed:", error.message);
    }
  } catch (err) {
    // Never let a notification failure break the business flow that triggered it.
    console.warn("[notifications] unexpected error:", err);
  }
}

export interface NotificationListResult {
  notifications: Notification[];
  unreadCount: number;
  // Subset of unreadCount: action-required notifications the user still
  // hasn't resolved. This is what the sidebar bell badge keys off — opening
  // the notifications page doesn't clear it, only taking the action does.
  actionableCount: number;
}

export async function listNotifications(
  userId: string,
  limit: number = 20,
): Promise<NotificationListResult> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;

  const [{ data: rows }, { count: unreadCount }, { count: actionableCount }] =
    await Promise.all([
      admin
        .from("notifications")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(limit),
      admin
        .from("notifications")
        .select("id", { count: "exact", head: true })
        .eq("user_id", userId)
        .is("read_at", null),
      admin
        .from("notifications")
        .select("id", { count: "exact", head: true })
        .eq("user_id", userId)
        .eq("action_required", true)
        .is("resolved_at", null),
    ]);

  return {
    notifications: (rows ?? []) as Notification[],
    unreadCount: typeof unreadCount === "number" ? unreadCount : 0,
    actionableCount: typeof actionableCount === "number" ? actionableCount : 0,
  };
}

// Return the set of case ids that have unresolved action-required
// notifications for this user. Used by /dashboard and /dashboard/cases to
// render a bell next to those case rows.
export async function listCasesWithPendingAction(
  userId: string,
): Promise<Set<string>> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;
  const { data } = await admin
    .from("notifications")
    .select("case_id")
    .eq("user_id", userId)
    .eq("action_required", true)
    .is("resolved_at", null)
    .not("case_id", "is", null);
  const set = new Set<string>();
  for (const row of (data ?? []) as Array<{ case_id: string | null }>) {
    if (row.case_id) set.add(row.case_id);
  }
  return set;
}

// Resolve all open action-required notifications for a given (user, case,
// optional type) tuple. Called by the approve / request-changes endpoints
// when the customer takes the action the notification was prompting.
export async function resolveActionRequired(
  userId: string,
  caseId: string,
  type?: NotificationType,
): Promise<number> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;
  const now = new Date().toISOString();
  let query = admin
    .from("notifications")
    .update({ resolved_at: now }, { count: "exact" })
    .eq("user_id", userId)
    .eq("case_id", caseId)
    .eq("action_required", true)
    .is("resolved_at", null);
  if (type) query = query.eq("type", type);
  const { count } = await query;
  return typeof count === "number" ? count : 0;
}

export async function markNotificationsRead(
  userId: string,
  ids: string[] | "all",
): Promise<number> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;
  const now = new Date().toISOString();

  if (ids === "all") {
    const { count } = await admin
      .from("notifications")
      .update({ read_at: now }, { count: "exact" })
      .eq("user_id", userId)
      .is("read_at", null);
    return typeof count === "number" ? count : 0;
  }

  if (ids.length === 0) return 0;
  const { count } = await admin
    .from("notifications")
    .update({ read_at: now }, { count: "exact" })
    .eq("user_id", userId)
    .in("id", ids)
    .is("read_at", null);
  return typeof count === "number" ? count : 0;
}

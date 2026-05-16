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
}

export async function listNotifications(
  userId: string,
  limit: number = 20,
): Promise<NotificationListResult> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;

  const [{ data: rows }, { count }] = await Promise.all([
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
  ]);

  return {
    notifications: (rows ?? []) as Notification[],
    unreadCount: typeof count === "number" ? count : 0,
  };
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

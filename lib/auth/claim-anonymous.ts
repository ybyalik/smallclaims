// Server-side helper: when a real (non-anonymous) user authenticates,
// move every case from any anonymous user that "belongs to them" onto
// the real account, then delete the anonymous user.
//
// "Belongs to them" is determined two ways:
//
//   1. Primary: cookie handoff. Before an OAuth / magic-link / password
//      sign-in, the client writes the anonymous user's id to a cookie
//      (cc_anon_handoff). After auth completes, this helper reads that
//      cookie and claims those cases. Works regardless of what email
//      the visitor used — as long as it's the same browser.
//
//   2. Fallback: email match. We also look up any anonymous users whose
//      user_metadata.email_pending_claim equals the now-logged-in email.
//      This is the safety net for visitors who started on one device
//      and signed up on another.
//
// Anonymous-only safety check: before transferring a case, we re-fetch
// the source user and confirm is_anonymous === true. Never moves a case
// off a real user.

import { createServiceRoleClient } from "../supabase/service-role";

export interface ClaimResult {
  moved: number;
  deletedAnonUsers: string[];
  reason: "ok" | "no-candidates" | "destination-not-real";
}

export async function claimAnonymousCases(opts: {
  destinationUserId: string;
  destinationEmail: string | null;
  candidateAnonUserId?: string | null;
}): Promise<ClaimResult> {
  const { destinationUserId, destinationEmail, candidateAnonUserId } = opts;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = createServiceRoleClient() as any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const adminAuth = (db as any).auth.admin;

  // Sanity check: destination must be a real (non-anonymous) user.
  // We re-fetch via admin to be authoritative; the session passed in
  // could be stale or spoofed.
  const { data: destWrap } = await adminAuth.getUserById(destinationUserId);
  const destUser = destWrap?.user;
  if (!destUser || destUser.is_anonymous === true) {
    return { moved: 0, deletedAnonUsers: [], reason: "destination-not-real" };
  }

  // Collect candidate source ids.
  const sourceIds = new Set<string>();
  if (candidateAnonUserId && candidateAnonUserId !== destinationUserId) {
    sourceIds.add(candidateAnonUserId);
  }

  // Email fallback: scan auth users for any anonymous accounts that
  // stashed this email in user_metadata.email_pending_claim. listUsers
  // pages 200 at a time; for a reasonable user base this stays cheap.
  if (destinationEmail) {
    let page = 1;
    for (;;) {
      const { data } = await adminAuth.listUsers({ page, perPage: 200 });
      const users = (data?.users ?? []) as Array<{
        id: string;
        is_anonymous?: boolean;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        user_metadata?: any;
      }>;
      if (users.length === 0) break;
      for (const u of users) {
        if (u.is_anonymous !== true) continue;
        const pending = u.user_metadata?.email_pending_claim;
        if (
          typeof pending === "string" &&
          pending.toLowerCase() === destinationEmail.toLowerCase() &&
          u.id !== destinationUserId
        ) {
          sourceIds.add(u.id);
        }
      }
      if (users.length < 200) break;
      page += 1;
      if (page > 25) break; // hard cap; we shouldn't ever need this many pages
    }
  }

  if (sourceIds.size === 0) {
    return { moved: 0, deletedAnonUsers: [], reason: "no-candidates" };
  }

  let moved = 0;
  const deletedAnonUsers: string[] = [];

  for (const sourceId of sourceIds) {
    // Verify the source really is anonymous before touching anything.
    const { data: srcWrap } = await adminAuth.getUserById(sourceId);
    const srcUser = srcWrap?.user;
    if (!srcUser || srcUser.is_anonymous !== true) continue;

    // Move every case (and anything else keyed by owner_user_id you want
    // to claim) onto the destination user.
    const { data: updated } = await db
      .from("cases")
      .update({ owner_user_id: destinationUserId })
      .eq("owner_user_id", sourceId)
      .select("id");
    moved += Array.isArray(updated) ? updated.length : 0;

    // Delete the empty anonymous user. We rely on FK cascade for any
    // child rows that weren't already migrated; cases were migrated
    // above so the cascade has nothing to do.
    const { error: delErr } = await adminAuth.deleteUser(sourceId);
    if (!delErr) deletedAnonUsers.push(sourceId);
  }

  return { moved, deletedAnonUsers, reason: "ok" };
}

// Access control for wizard cases. Every wizard route uses this to verify
// the requester owns the draft (either authenticated user, or anonymous
// cookie session). Returns the case row or null.

import { cookies } from "next/headers";
import { createClient } from "../supabase/server";
import { createServiceRoleClient } from "../supabase/service-role";
import type { Case } from "../supabase/types";

export const COOKIE_NAME = "cc_dl_session";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isUuid(s: string): boolean {
  return UUID_RE.test(s);
}

export type LoadCaseResult =
  | { kind: "ok"; row: Case }
  | { kind: "needs_auth" } // case exists, but requester isn't authenticated and the case has an owner
  | { kind: "not_found" }; // bad id, doesn't exist, or authenticated as a different user

/**
 * Loads a case the requester is allowed to access. Returns a discriminated
 * union so the caller can render the right UX (notFound vs. login redirect)
 * instead of treating "you logged out" the same as "doesn't exist."
 *
 * Auto-claim: if an authenticated user is accessing a case that was created
 * anonymously under their current cc_dl_session cookie, the case is claimed
 * to them (owner_user_id set, cookie_session_id cleared) before being
 * returned.
 */
export async function loadCaseForRequester(caseId: string): Promise<LoadCaseResult> {
  if (!isUuid(caseId)) return { kind: "not_found" };

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const sessionId = cookies().get(COOKIE_NAME)?.value ?? null;

  const db = createServiceRoleClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: rawRow } = await (db as any)
    .from("cases")
    .select("*")
    .eq("id", caseId)
    .maybeSingle();

  if (!rawRow) return { kind: "not_found" };

  let row = rawRow;

  // Auto-claim: anonymous case + matching cookie + authenticated requester
  if (
    user &&
    sessionId &&
    !row.owner_user_id &&
    row.cookie_session_id === sessionId
  ) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: claimed } = await (db as any)
      .from("cases")
      .update({
        owner_user_id: user.id,
        cookie_session_id: null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", caseId)
      .is("owner_user_id", null)
      .select("*")
      .maybeSingle();
    if (claimed) row = claimed;
  }

  const isOwner = user && row.owner_user_id === user.id;
  const isSessionMatch =
    !row.owner_user_id && sessionId && row.cookie_session_id === sessionId;

  if (isOwner || isSessionMatch) return { kind: "ok", row: row as Case };

  // Case exists but the current requester can't access it. Two sub-cases:
  //   1. Case has an owner (someone else's account). If the requester is
  //      logged out, they probably ARE that owner — they just signed out.
  //      Send them to login with `next` so they can resume.
  //   2. Case is anonymous but the cookie doesn't match. Treat as not_found.
  if (!user && row.owner_user_id) return { kind: "needs_auth" };

  return { kind: "not_found" };
}

/**
 * Legacy: returns Case | null. Existing callers use this.
 * Prefer loadCaseForRequester for new code so you can render
 * a login redirect instead of a flat 404.
 */
export async function loadOwnedCase(caseId: string): Promise<Case | null> {
  if (!isUuid(caseId)) return null;

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const sessionId = cookies().get(COOKIE_NAME)?.value ?? null;

  const db = createServiceRoleClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: rawRow } = await (db as any)
    .from("cases")
    .select("*")
    .eq("id", caseId)
    .maybeSingle();

  if (!rawRow) return null;

  let row = rawRow;

  // Auto-claim: anonymous case + matching cookie + authenticated requester
  if (
    user &&
    sessionId &&
    !row.owner_user_id &&
    row.cookie_session_id === sessionId
  ) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: claimed } = await (db as any)
      .from("cases")
      .update({
        owner_user_id: user.id,
        cookie_session_id: null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", caseId)
      .is("owner_user_id", null)
      .select("*")
      .maybeSingle();
    if (claimed) row = claimed;
  }

  const isOwner = user && row.owner_user_id === user.id;
  const isSessionMatch =
    !row.owner_user_id && sessionId && row.cookie_session_id === sessionId;

  if (!isOwner && !isSessionMatch) return null;
  return row as Case;
}

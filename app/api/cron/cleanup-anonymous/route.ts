// GET /api/cron/cleanup-anonymous
//
// Daily sweep that removes anonymous Supabase users (and their cases) that
// were created more than 7 days ago and never finished signup. Keeps the
// users table from filling up with orphaned drafts from visitors who
// bounced before converting.
//
// Triggered by Vercel Cron (vercel.json). Protected by CRON_SECRET — the
// cron platform passes it via the Authorization header.

import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "../../../../lib/supabase/service-role";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CUTOFF_DAYS = 7;

export async function GET(req: NextRequest) {
  // CRON_SECRET gate. Vercel Cron sends it as Authorization: Bearer <secret>.
  const authHeader = req.headers.get("authorization") || "";
  const expected = process.env.CRON_SECRET;
  if (!expected) {
    return NextResponse.json({ error: "CRON_SECRET not set" }, { status: 500 });
  }
  if (authHeader !== `Bearer ${expected}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const cutoff = new Date(Date.now() - CUTOFF_DAYS * 24 * 60 * 60 * 1000);

  const db = createServiceRoleClient();

  // Page through auth users with the admin API. listUsers returns 50 by
  // default; the perPage cap is 200. For the cleanup window we expect at
  // most a few hundred candidates per day, so a handful of pages is enough.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const adminAuth = (db as any).auth.admin;
  if (!adminAuth) {
    return NextResponse.json({ error: "service role required" }, { status: 500 });
  }

  const perPage = 200;
  const deleted: string[] = [];
  const skipped: string[] = [];
  let scanned = 0;
  let incomplete = false;

  // Phase 1: collect ALL candidate anonymous users FIRST, before deleting any.
  // Deleting rows while paging shifts the result set and makes listUsers skip
  // candidates (page 2 slides over the gap left by page-1 deletions). Reading
  // the full list up front avoids that.
  const candidates: Array<{ id: string; created_at: string }> = [];
  let page = 1;
  for (;;) {
    const { data, error } = await adminAuth.listUsers({ page, perPage });
    if (error) {
      // A listing error means we did NOT see the whole list — report the run as
      // incomplete rather than pretending success.
      console.error("[cleanup-anonymous] listUsers", error);
      incomplete = true;
      break;
    }
    const users = (data?.users ?? []) as Array<{
      id: string;
      created_at: string;
      is_anonymous?: boolean;
    }>;
    if (users.length === 0) break;
    scanned += users.length;

    for (const u of users) {
      if (u.is_anonymous !== true) continue;
      const created = new Date(u.created_at);
      if (created > cutoff) {
        skipped.push(u.id);
        continue;
      }
      candidates.push({ id: u.id, created_at: u.created_at });
    }

    if (users.length < perPage) break;
    page += 1;
    if (page > 50) {
      // Hit the page cap with more to read — don't silently claim we're done.
      incomplete = true;
      break;
    }
  }

  // Phase 2: apply the payment + activity guards, then delete.
  for (const u of candidates) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: ownedCases } = await (db as any)
      .from("cases")
      .select("id, updated_at")
      .eq("owner_user_id", u.id);
    const owned = (ownedCases ?? []) as Array<{ id: string; updated_at: string | null }>;
    const ownedIds = owned.map((c) => c.id);

    // Never delete an anonymous user who is still ACTIVELY working. Account age
    // alone is the wrong signal: a visitor who keeps coming back to their case
    // (session lasts weeks) would otherwise lose everything on day 8, right
    // before they pay. Keep anyone with a case touched within the window.
    const recentlyActive = owned.some(
      (c) => c.updated_at && new Date(c.updated_at) > cutoff,
    );
    if (recentlyActive) {
      skipped.push(u.id);
      continue;
    }

    // Never delete an anonymous user who has paid for anything — they own a
    // purchased case (letter / filing kit / collection plan). Deleting them
    // would destroy what they paid for.
    if (ownedIds.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: paidRows } = await (db as any)
        .from("payments")
        .select("id")
        .in("case_id", ownedIds)
        .not("paid_at", "is", null)
        .limit(1);
      if (paidRows && paidRows.length > 0) {
        skipped.push(u.id);
        continue;
      }
    }

    // Delete the user. We rely on FK ON DELETE CASCADE from cases ->
    // auth.users to clean up their case rows. If cascade is not set up,
    // delete cases manually first.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (db as any).from("cases").delete().eq("owner_user_id", u.id);

    const { error: delErr } = await adminAuth.deleteUser(u.id);
    if (delErr) {
      console.error(`[cleanup-anonymous] deleteUser(${u.id})`, delErr);
      skipped.push(u.id);
    } else {
      deleted.push(u.id);
    }
  }

  return NextResponse.json({
    cutoff_iso: cutoff.toISOString(),
    scanned,
    candidates: candidates.length,
    deleted_count: deleted.length,
    skipped_count: skipped.length,
    incomplete,
  });
}

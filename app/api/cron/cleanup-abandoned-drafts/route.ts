// GET /api/cron/cleanup-abandoned-drafts
//
// Daily sweep that deletes draft case rows where the visitor never
// reached the defendant step AND hasn't touched the case in the last
// 24 hours. Pairs with the dashboard filter that hides these from the
// user's case list while the row still exists.
//
// Anything past the defendant step has a non-null defendant_name and
// is left alone. Anything that's been touched recently (autosave bumps
// updated_at) is left alone too — someone might still be filling out
// step 1 or 2 right now.
//
// Triggered by Vercel Cron (vercel.json). Protected by CRON_SECRET.

import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "../../../../lib/supabase/service-role";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const STALE_HOURS = 24;

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization") || "";
  const expected = process.env.CRON_SECRET;
  if (!expected) {
    return NextResponse.json({ error: "CRON_SECRET not set" }, { status: 500 });
  }
  if (authHeader !== `Bearer ${expected}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const cutoff = new Date(Date.now() - STALE_HOURS * 60 * 60 * 1000).toISOString();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = createServiceRoleClient() as any;

  // Delete every draft with no defendant_name that hasn't been touched
  // in the last STALE_HOURS hours. status='draft' guards against ever
  // touching a paid/active case that somehow lost its defendant_name.
  const { data: deleted, error } = await db
    .from("cases")
    .delete()
    .eq("status", "draft")
    .is("defendant_name", null)
    .lt("updated_at", cutoff)
    .select("id");

  if (error) {
    console.error("[cleanup-abandoned-drafts]", error);
    return NextResponse.json({ error: "delete_failed" }, { status: 500 });
  }

  return NextResponse.json({
    cutoff,
    deleted_count: Array.isArray(deleted) ? deleted.length : 0,
  });
}

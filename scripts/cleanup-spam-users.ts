/* eslint-disable @typescript-eslint/no-explicit-any */
//
// One-off cleanup for spam / bot SIGNUPS (registered users with an email).
// The daily cron only removes ANONYMOUS users; these bot accounts have real
// email addresses, so they slip past it.
//
// SAFE BY DEFAULT: runs as a DRY RUN and only PRINTS what it would delete.
// Pass --apply to actually delete. It NEVER deletes anyone who paid, and by
// default never deletes a user who has a real (past-intake) case — those are
// treated as leads to review by hand, not spam.
//
//   npx tsx scripts/cleanup-spam-users.ts            # dry run (prints only)
//   npx tsx scripts/cleanup-spam-users.ts --apply    # actually delete
//
// Reads NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY from the env.

import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("[cleanup-spam] missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const APPLY = process.argv.includes("--apply");
const db: any = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

// A "name" that is a single long random-looking token (no spaces, mixed case,
// letters/digits only) is a bot fingerprint, e.g. "iUQlpmSsnDiwJjMONYlFON".
function isGibberishName(name?: string | null): boolean {
  if (!name) return false;
  const n = name.trim();
  if (!n || /\s/.test(n)) return false; // real names usually have a space
  if (n.length < 12) return false;
  return /[A-Z]/.test(n) && /[a-z]/.test(n) && /^[A-Za-z0-9]+$/.test(n);
}

// gmail bots generate addresses like "ri.t.use.m.e.qud.6.4@gmail.com": the
// local part is chopped up with many single-character dots. Real people almost
// never use 3+ dots. Gmail ignores dots, so this is purely a bot fingerprint.
function isDottedGmailBot(email?: string | null): boolean {
  if (!email) return false;
  const m = email.toLowerCase().match(/^([^@]+)@gmail\.com$/);
  if (!m) return false;
  return ((m[1].match(/\./g) || []).length) >= 3;
}

interface Candidate {
  id: string;
  email: string;
  name: string;
  created: string;
  confirmed: boolean;
  reason: string;
}

async function run() {
  const adminAuth = db.auth.admin;
  const perPage = 200;

  // Phase 1: read the full user list up front (deleting while paging would
  // shift the pages and skip users).
  const users: Array<any> = [];
  let page = 1;
  for (;;) {
    const { data, error } = await adminAuth.listUsers({ page, perPage });
    if (error) {
      console.error("[cleanup-spam] listUsers failed:", error.message ?? error);
      process.exit(1);
    }
    const batch = data?.users ?? [];
    users.push(...batch);
    if (batch.length < perPage) break;
    page += 1;
    if (page > 100) break;
  }

  const toDelete: Candidate[] = [];
  const toReview: Candidate[] = []; // has a real case but never paid — a lead
  let payers = 0;

  for (const u of users) {
    if (u.is_anonymous === true) continue; // the cron handles anonymous users

    const name: string = u.user_metadata?.full_name ?? "";
    const email: string = u.email ?? "";

    // Cases they own, and whether any advanced past the defendant step.
    const { data: cases } = await db
      .from("cases")
      .select("id, defendant_name")
      .eq("owner_user_id", u.id);
    const ownedIds = (cases ?? []).map((c: any) => c.id);
    const hasRealCase = (cases ?? []).some((c: any) => c.defendant_name);

    // Did they ever pay? Hard guard — a payer is NEVER a deletion candidate.
    let hasPaid = false;
    if (ownedIds.length > 0) {
      const { data: paid } = await db
        .from("payments")
        .select("id")
        .in("case_id", ownedIds)
        .not("paid_at", "is", null)
        .limit(1);
      hasPaid = !!(paid && paid.length > 0);
    }

    const row: Candidate = {
      id: u.id,
      email,
      name: name || "(no name)",
      created: (u.created_at ?? "").slice(0, 10),
      confirmed: !!u.email_confirmed_at,
      reason: "",
    };

    if (hasPaid) {
      payers += 1;
      continue;
    }
    if (hasRealCase) {
      row.reason = "has a case (no payment) — review as a lead";
      toReview.push(row);
      continue;
    }

    // No payment, no real case. Delete only if it also looks like a bot.
    const signals: string[] = [];
    if (isGibberishName(name)) signals.push("random name");
    if (isDottedGmailBot(email)) signals.push("dotted-gmail");
    if (!name && ownedIds.length === 0) signals.push("no name, no case");
    if (signals.length > 0) {
      row.reason = signals.join(" + ");
      toDelete.push(row);
    }
    // else: real-looking name, no case, no signal → left alone (possible lead).
  }

  // ---- Report -----------------------------------------------------------
  const fmt = (c: Candidate) =>
    `  ${c.created}  ${c.confirmed ? "conf " : "unconf"}  ${c.email.padEnd(34)}  ${c.name.padEnd(24)}  [${c.reason}]`;

  console.log(`\nScanned ${users.length} users. Payers (never touched): ${payers}.`);
  console.log(`\n=== WOULD DELETE (${toDelete.length}) — clear bot signups, no case, no payment ===`);
  toDelete.forEach((c) => console.log(fmt(c)));
  console.log(`\n=== REVIEW BY HAND (${toReview.length}) — started a case but never paid (kept) ===`);
  toReview.forEach((c) => console.log(fmt(c)));

  if (!APPLY) {
    console.log(`\nDRY RUN — nothing deleted. Re-run with --apply to delete the ${toDelete.length} above.`);
    return;
  }

  console.log(`\n--apply set: deleting ${toDelete.length} spam users...`);
  let done = 0;
  for (const c of toDelete) {
    await db.from("cases").delete().eq("owner_user_id", c.id);
    const { error } = await adminAuth.deleteUser(c.id);
    if (error) console.error(`  FAILED ${c.email}: ${error.message ?? error}`);
    else done += 1;
  }
  console.log(`Deleted ${done}/${toDelete.length}.`);
}

run().catch((e) => {
  console.error("[cleanup-spam] failed:", e);
  process.exit(1);
});

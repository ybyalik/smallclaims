// Winback engine. Called by the daily cron.
//
// Eligibility, per case:
//   - status draft / active / intake_complete (never closed, settled, paid tiers)
//   - plaintiff_email present (that's who we email)
//   - not a test-scenario case, not an internal/test address
//   - no successful payment on the case (payment = the sequence's goal + stop)
//   - email not on the opt-out list
//   - idle: last activity (updated_at) at least <delay_days> ago for the step
//
// Sequencing rules:
//   - steps send in order; at most ONE step per case per run (a long-idle case
//     entering the system gets step 1 today, step 2 when its delay passes, and
//     so on — never a burst of four emails at once)
//   - at most one email per ADDRESS per run (several cases, same person → one
//     email)
//   - a (case, step) pair sends at most once ever: rows in winback_sends are
//     claimed with an ON CONFLICT DO NOTHING insert before sending
//   - a step only sends if its winback_templates row exists AND enabled=true
//
// Degrades gracefully: if the winback tables don't exist yet (migration not
// applied), the run reports tables_missing and does nothing.

import { createServiceRoleClient } from "../supabase/service-role";
import { sendEmail } from "../resend";
import { STATES } from "../states";
import { renderWinback, type WinbackTemplate, type WinbackMergeData } from "./templates";
import { unsubscribeUrl } from "./unsubscribe";

const ELIGIBLE_STATUSES = ["draft", "active", "intake_complete"];

interface RunResult {
  ok: boolean;
  reason?: string;
  considered: number;
  sent: Array<{ caseId: string; step: number; email: string }>;
  skipped: number;
}

function stateName(code: string | null): string {
  if (!code) return "your state";
  const m = STATES.find((s) => s.abbr.toUpperCase() === code.toUpperCase());
  return m?.name ?? code;
}

function fmtAmount(cents: number | null): string {
  return ((cents ?? 0) / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

// Addresses we never market to: internal, obvious test data.
function isInternalOrTestEmail(email: string): boolean {
  const e = email.toLowerCase();
  return (
    e.endsWith("@civilcase.com") ||
    e.startsWith("test+") ||
    e.includes("@example.") ||
    e === "asdf@ag.com" ||
    e === "asd@ag.com"
  );
}

export async function runWinback(): Promise<RunResult> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = createServiceRoleClient() as any;
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://civilcase.com";

  // Enabled steps, ordered. Missing table → migration not applied yet.
  const { data: tplRows, error: tplErr } = await db
    .from("winback_templates")
    .select("step, delay_days, subject, body_html, enabled")
    .eq("enabled", true)
    .order("step", { ascending: true });
  if (tplErr) {
    console.warn("[winback] templates query failed (migration applied?):", tplErr.message);
    return { ok: false, reason: "tables_missing", considered: 0, sent: [], skipped: 0 };
  }
  const steps = (tplRows ?? []) as WinbackTemplate[];
  if (steps.length === 0) {
    return { ok: true, reason: "no_enabled_steps", considered: 0, sent: [], skipped: 0 };
  }

  // Candidate cases.
  const { data: caseRows, error: caseErr } = await db
    .from("cases")
    .select(
      "id, status, plaintiff_name, plaintiff_email, defendant_name, amount_cents, state, updated_at, intake_answers",
    )
    .in("status", ELIGIBLE_STATUSES)
    .not("plaintiff_email", "is", null)
    .order("updated_at", { ascending: false })
    .limit(1000);
  if (caseErr) {
    console.error("[winback] cases query failed:", caseErr.message);
    return { ok: false, reason: "cases_query_failed", considered: 0, sent: [], skipped: 0 };
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const candidates = ((caseRows ?? []) as any[]).filter((c) => {
    if (!c.plaintiff_email || isInternalOrTestEmail(c.plaintiff_email)) return false;
    if ((c.intake_answers as Record<string, unknown> | null)?._test_scenario === true) return false;
    return true;
  });
  if (candidates.length === 0) {
    return { ok: true, considered: 0, sent: [], skipped: 0 };
  }

  const caseIds = candidates.map((c) => c.id);

  // Paid cases stop the sequence permanently.
  const { data: paidRows } = await db
    .from("payments")
    .select("case_id")
    .in("case_id", caseIds)
    .not("paid_at", "is", null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const paidSet = new Set(((paidRows ?? []) as any[]).map((p) => p.case_id));

  // Prior sends per case (to find each case's next unsent step).
  const { data: sendRows } = await db
    .from("winback_sends")
    .select("case_id, step")
    .in("case_id", caseIds);
  const sentSteps = new Map<string, Set<number>>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  for (const r of (sendRows ?? []) as any[]) {
    if (!sentSteps.has(r.case_id)) sentSteps.set(r.case_id, new Set());
    sentSteps.get(r.case_id)!.add(r.step);
  }

  // Opt-outs.
  const emails = Array.from(
    new Set(candidates.map((c) => String(c.plaintiff_email).toLowerCase())),
  );
  const { data: optRows } = await db.from("email_optouts").select("email").in("email", emails);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const optedOut = new Set(((optRows ?? []) as any[]).map((o) => o.email));

  const now = Date.now();
  const sent: RunResult["sent"] = [];
  const emailedThisRun = new Set<string>();
  let skipped = 0;

  for (const c of candidates) {
    const email = String(c.plaintiff_email).toLowerCase();
    if (paidSet.has(c.id) || optedOut.has(email) || emailedThisRun.has(email)) {
      skipped++;
      continue;
    }

    const idleDays = (now - new Date(c.updated_at).getTime()) / 86_400_000;
    const done = sentSteps.get(c.id) ?? new Set<number>();
    // Earliest enabled step not yet sent whose idle-delay has passed.
    const step = steps.find((s) => !done.has(s.step) && idleDays >= s.delay_days);
    if (!step) {
      skipped++;
      continue;
    }

    // Claim the (case, step) before sending — the unique constraint makes a
    // concurrent/re-run insert a no-op, and we only send when WE claimed it.
    const { data: claim, error: claimErr } = await db
      .from("winback_sends")
      .upsert(
        { case_id: c.id, step: step.step, email },
        { onConflict: "case_id,step", ignoreDuplicates: true },
      )
      .select("id");
    if (claimErr || !claim || claim.length === 0) {
      skipped++;
      continue; // someone else claimed it, or insert failed — don't send
    }

    const merge: WinbackMergeData = {
      first_name: (c.plaintiff_name ?? "").trim().split(/\s+/)[0] || "there",
      defendant_name: c.defendant_name || "the other party",
      amount: fmtAmount(c.amount_cents),
      state_name: stateName(c.state),
      resume_url: `${base}/case/${c.id}`,
      unsubscribe_url: unsubscribeUrl(email),
    };

    const subject = renderWinback(step.subject, merge, { escape: false });
    const html = renderWinback(step.body_html, merge, { escape: true });
    const text =
      renderWinback(step.body_html, merge, { escape: false })
        .replace(/<br\s*\/?\s*>/gi, "\n")
        .replace(/<\/p>/gi, "\n\n")
        .replace(/<[^>]+>/g, "")
        .replace(/\n{3,}/g, "\n\n")
        .trim();

    const result = await sendEmail({
      to: email,
      subject,
      text,
      html,
      headers: {
        "List-Unsubscribe": `<${merge.unsubscribe_url}>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      },
    });

    if (!result.ok) {
      // Send failed → release the claim so the next run retries this step.
      await db.from("winback_sends").delete().eq("case_id", c.id).eq("step", step.step);
      console.error(`[winback] send failed case=${c.id} step=${step.step}:`, result.error);
      skipped++;
      continue;
    }

    emailedThisRun.add(email);
    sent.push({ caseId: c.id, step: step.step, email });
  }

  return { ok: true, considered: candidates.length, sent, skipped };
}

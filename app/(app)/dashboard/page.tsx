import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "../../../lib/supabase/server";
import type { Case, DemandLetter, Payment, Profile } from "../../../lib/supabase/types";
import { deriveStatusLabel } from "../../../lib/cases/derive-status-label";
import {
  disputeTypeOtherFrom,
  formatDisputeTypeShort,
} from "../../../lib/cases/dispute-type-label";
import { productBadgesForCase } from "../../../lib/cases/format-products";
import ProductChipList from "../../../components/cases/ProductChipList";
import PageHead from "../../../components/layout/PageHead";
import StatusBadge from "../../../components/ui/StatusBadge";
import StartCaseButton from "../../../components/StartCaseButton";
import EmptyState from "../../../components/ui/EmptyState";
import { listCasesWithPendingAction } from "../../../lib/notifications";
import {
  loadSolDeadlinesForCases,
  formatDeadlineDistance,
  formatExpiryDate,
} from "../../../lib/cases/sol-deadline";
import { Bell, HelpCircle } from "lucide-react";
import type { ProductKey } from "../../../lib/stripe";

export const metadata: Metadata = {
  title: "Dashboard",
};

export const dynamic = "force-dynamic";

// A case is "active" unless it's been formally closed or settled. Status no
// longer encodes the granular product/letter state — that's derived elsewhere.
const TERMINAL_STATUSES = new Set(["closed", "settled"]);

const LETTER_STATUS_LABEL: Record<string, string> = {
  draft: "Draft",
  queued: "Queued",
  in_transit: "In transit",
  delivered: "Delivered",
  returned: "Returned",
  failed: "Failed",
};

function formatDollars(cents: number): string {
  return (cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

function formatRelative(s: string): string {
  const date = new Date(s);
  const diffMs = Date.now() - date.getTime();
  const mins = Math.round(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatCreated(s: string): string {
  const d = new Date(s);
  const sameYear = d.getFullYear() === new Date().getFullYear();
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    ...(sameYear ? {} : { year: "numeric" }),
  });
}

function caseTitle(c: Case): string {
  const plaintiff = c.plaintiff_name?.trim();
  const defendant = c.defendant_name?.trim();
  if (defendant) return `${plaintiff || "You"} vs. ${defendant}`;
  return "Untitled draft";
}

export default async function DashboardHome() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createClient() as any;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const [casesRes, profileRes] = await Promise.all([
    supabase
      .from("cases")
      .select("*")
      .eq("owner_user_id", user.id)
      .order("updated_at", { ascending: false }),
    supabase
      .from("profiles")
      .select("full_name")
      .eq("user_id", user.id)
      .maybeSingle(),
  ]);

  const cases = (casesRes.data || []) as Case[];
  const profile = (profileRes.data || null) as Pick<Profile, "full_name"> | null;

  const caseIds = cases.map((c) => c.id);

  const [lettersRes, paymentsRes] = await Promise.all([
    caseIds.length
      ? supabase
          .from("demand_letters")
          .select("*")
          .in("case_id", caseIds)
          .order("updated_at", { ascending: false })
      : Promise.resolve({ data: [] }),
    caseIds.length
      ? supabase
          .from("payments")
          .select("*")
          .in("case_id", caseIds)
          .order("created_at", { ascending: false })
      : Promise.resolve({ data: [] }),
  ]);

  const letters = (lettersRes.data || []) as DemandLetter[];
  const payments = (paymentsRes.data || []) as Payment[];

  const activeCases = cases.filter((c) => !TERMINAL_STATUSES.has(c.status));

  // Build per-case lookup maps for the status-pill derivation. payments and
  // letters were already loaded above; just shape them.
  const paidByCase = new Map<string, Set<ProductKey>>();
  for (const p of payments) {
    if (p.status !== "succeeded" || !p.product_key) continue;
    let set = paidByCase.get(p.case_id);
    if (!set) {
      set = new Set();
      paidByCase.set(p.case_id, set);
    }
    set.add(p.product_key as ProductKey);
  }
  const latestLetterByCase = new Map<string, Pick<DemandLetter, "mail_status">>();
  // letters is ordered by updated_at desc above; that's close enough for
  // "latest" to drive the pill. The case detail page does its own ordered query.
  for (const l of letters) {
    if (!latestLetterByCase.has(l.case_id)) {
      latestLetterByCase.set(l.case_id, { mail_status: l.mail_status });
    }
  }
  const lettersInFlight = letters.filter((l) =>
    ["queued", "in_transit", "delivered"].includes(l.mail_status),
  );
  const totalAtStake = activeCases.reduce((sum, c) => sum + (c.amount_cents || 0), 0);
  const totalPaid = payments
    .filter((p) => p.status === "succeeded")
    .reduce((sum, p) => sum + (p.amount_cents || 0), 0);

  const firstName =
    profile?.full_name?.trim().split(/\s+/)[0] ||
    (user.email ? user.email.split("@")[0] : null);

  const recentCases = cases.slice(0, 5);
  const recentLetters = letters.slice(0, 3);
  // Cases with unresolved action-required notifications get a bell next to
  // the case name in the recent-cases list. Loaded in parallel with the
  // per-case SOL filing-deadline indicators below the case row.
  const [pendingActionCases, solDeadlines] = await Promise.all([
    listCasesWithPendingAction(user.id),
    loadSolDeadlinesForCases(recentCases),
  ]);

  if (cases.length === 0) {
    return (
      <div>
        <PageHead
          title={firstName ? `Welcome, ${firstName}` : "Welcome"}
          sub="Your case files, letters, and activity will appear here."
          actions={
            <StartCaseButton className="btn btn-dark">
              Start a New Case
            </StartCaseButton>
          }
        />

        <EmptyState
          title="No cases yet"
          body="Start a case to begin building your file. You can purchase a demand letter or other services once you've added your details."
          cta={
            <StartCaseButton className="btn btn-dark">
              Start a New Case
            </StartCaseButton>
          }
        />
      </div>
    );
  }

  return (
    <div>
      <PageHead
        title={firstName ? `Welcome back, ${firstName}` : "Welcome back"}
        sub={
          <>
            {activeCases.length === 1
              ? "1 active case"
              : `${activeCases.length} active cases`}
            {lettersInFlight.length > 0
              ? ` · ${lettersInFlight.length} ${lettersInFlight.length === 1 ? "letter" : "letters"} in flight`
              : ""}
          </>
        }
        actions={
          <StartCaseButton className="btn btn-dark">
            Start a New Case
          </StartCaseButton>
        }
      />

      <div className="app-stat-grid">
        <div className="app-stat">
          <div className="app-stat-label">Active cases</div>
          <div className="app-stat-value">{activeCases.length}</div>
          <div className="app-stat-sub">
            {cases.length - activeCases.length > 0
              ? `${cases.length - activeCases.length} closed`
              : " "}
          </div>
        </div>
        <div className="app-stat">
          <div className="app-stat-label">Total at stake</div>
          <div className="app-stat-value">{formatDollars(totalAtStake)}</div>
          <div className="app-stat-sub">across active cases</div>
        </div>
        <div className="app-stat">
          <div className="app-stat-label">Letters mailed</div>
          <div className="app-stat-value">
            {letters.filter((l) => l.mail_status !== "draft").length}
          </div>
          <div className="app-stat-sub">
            {lettersInFlight.length > 0 ? `${lettersInFlight.length} in transit` : " "}
          </div>
        </div>
        <div className="app-stat">
          <div className="app-stat-label">You&apos;ve paid</div>
          <div className="app-stat-value">{formatDollars(totalPaid)}</div>
          <div className="app-stat-sub">
            <Link href="/dashboard/billing" className="app-link">
              View billing
            </Link>
          </div>
        </div>
      </div>

      <div className="app-dash-grid">
        <section className="app-dash-section">
          <div className="app-dash-section-head">
            <h2>Recent cases</h2>
            {cases.length > 5 ? (
              <Link href="/dashboard/cases" className="app-link">
                View all
              </Link>
            ) : null}
          </div>
          <div className="app-case-list-head" aria-hidden="true">
            <span className="app-case-col-label app-case-col-label-left">Status</span>
            <span className="app-case-col-label app-case-col-label-start">Case Name</span>
            <span className="app-case-col-label app-case-col-label-start">Products</span>
            <span className="app-case-col-label">Created</span>
            <span className="app-case-col-label app-case-col-label-center">Amount</span>
            <span />
          </div>
          <ul className="app-case-list">
            {recentCases.map((c) => {
              const isV2Draft = c.status === "draft" && c.intake_version === 2;
              const href = isV2Draft ? `/case/${c.id}/build` : `/case/${c.id}`;
              const paidSet = paidByCase.get(c.id) ?? new Set<ProductKey>();
              const { label: statusLabel, tone } = deriveStatusLabel({ c });
              const badges = productBadgesForCase(paidSet);
              const needsAction = pendingActionCases.has(c.id);
              const dl = solDeadlines.get(c.id);
              return (
                <Link key={c.id} href={href} className="app-case-card">
                  <div className="app-case-status-cell">
                    <StatusBadge tone={tone}>{statusLabel}</StatusBadge>
                    {dl ? (
                      <div className={`app-case-sol app-case-sol-${dl.urgency}`}>
                        <div className="app-case-sol-label">Filing deadline</div>
                        <div className="app-case-sol-date">
                          {formatExpiryDate(dl)}
                          <span
                            className="app-case-sol-help"
                            tabIndex={0}
                            role="button"
                            aria-label="Filing deadline details"
                            aria-describedby={`sol-tip-${c.id}`}
                          >
                            <HelpCircle size={12} strokeWidth={2} aria-hidden />
                            <span
                              id={`sol-tip-${c.id}`}
                              className="app-case-sol-tip"
                              role="tooltip"
                            >
                              <strong>
                                {dl.urgency === "expired"
                                  ? "Filing deadline may have run"
                                  : `${formatDeadlineDistance(dl)} to file`}
                              </strong>
                              <br />
                              Approx. {formatExpiryDate(dl)} ·{" "}
                              {dl.solYears}-year statute of limitations
                              {dl.citation ? ` (${dl.citation})` : ""}
                              {dl.whenClockStarts
                                ? `, clock starts ${dl.whenClockStarts}`
                                : ""}
                              .
                              <br />
                              <em>
                                Approximate only. Real deadlines can shift for
                                tolling, discovery rule, or partial-payment
                                restart. Verify with the clerk.
                              </em>
                            </span>
                          </span>
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <div className="app-case-defendant">
                      {caseTitle(c)}
                      {needsAction ? (
                        <span
                          className="app-case-action-bell"
                          title="Action needed"
                          aria-label="Action needed"
                        >
                          <Bell size={14} strokeWidth={2.5} />
                        </span>
                      ) : null}
                    </div>
                    <div className="app-case-meta">
                      {formatDisputeTypeShort(
                        c.dispute_type,
                        disputeTypeOtherFrom(c.intake_answers),
                      )}{" "}
                      · {c.state} · updated {formatRelative(c.updated_at)}
                    </div>
                  </div>
                  <div className="app-case-products-cell">
                    <ProductChipList badges={badges} emptyHint="None yet" />
                  </div>
                  <div className="app-case-created">
                    <span className="app-case-created-date">{formatCreated(c.created_at)}</span>
                  </div>
                  <div className="app-case-amount">{formatDollars(c.amount_cents)}</div>
                  <span className="app-case-chevron">→</span>
                </Link>
              );
            })}
          </ul>
        </section>

        <aside className="app-dash-aside">
          <div className="app-dash-card">
            <h3>Demand letters</h3>
            {recentLetters.length === 0 ? (
              <p className="app-dash-empty">No letters yet. Generate one from a case file.</p>
            ) : (
              <ul className="app-mini-list">
                {recentLetters.map((l) => {
                  const c = cases.find((x) => x.id === l.case_id);
                  return (
                    <li key={l.id}>
                      <Link href={`/case/${l.case_id}`} className="app-mini-row">
                        <span className="app-mini-title">
                          {c ? caseTitle(c) : "Letter"}
                        </span>
                        <span className="app-mini-meta">
                          {LETTER_STATUS_LABEL[l.mail_status] || l.mail_status}
                          {" · "}
                          {formatRelative(l.updated_at)}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className="app-dash-card">
            <h3>Quick actions</h3>
            <div className="app-quick-actions">
              <StartCaseButton className="btn btn-dark btn-block">
                Start a New Case
              </StartCaseButton>
              <Link href="/dashboard/cases" className="btn btn-outline btn-block">
                View all cases
              </Link>
              <Link href="/dashboard/settings" className="btn btn-outline btn-block">
                Account settings
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

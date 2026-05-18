import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "../../../../../lib/supabase/server";
import { createServiceRoleClient } from "../../../../../lib/supabase/service-role";
import { ensureDemandLetterForCase } from "../../../../../lib/demand-letter/ensure-letter";
import { hasPaidForProduct } from "../../../../../lib/payments/access";
import { reconcileAllPendingForCase } from "../../../../../lib/payments/reconcile";
import {
  disputeTypeOtherFrom,
  formatDisputeTypeShort,
} from "../../../../../lib/cases/dispute-type-label";
import ProductDocumentView from "../../../../../components/cases/ProductDocumentView";
import PageHead from "../../../../../components/layout/PageHead";
import EmptyState from "../../../../../components/ui/EmptyState";
import LetterApprovalPanel from "./LetterApprovalPanel";

export const metadata: Metadata = {
  title: "Demand Letter",
};

export const dynamic = "force-dynamic";
// Letter generation can take up to ~10s if the row doesn't exist yet.
export const maxDuration = 60;

export default async function LetterPage({ params }: { params: { id: string } }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createClient() as any;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect(`/login?next=/case/${params.id}/letter`);
  }

  const { data: caseRow } = await supabase
    .from("cases")
    .select("*")
    .eq("id", params.id)
    .eq("owner_user_id", user.id)
    .single();
  if (!caseRow) notFound();

  // Paid users get to see the letter. Admins bypass the paywall for
  // generation-testing purposes.
  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("user_id", user.id)
    .single();
  const isAdmin = !!profile?.is_admin;

  // Reconcile any pending payments against Stripe first. Without this, a
  // user who paid but whose webhook didn't fire (e.g. preview deploys) would
  // be redirected back to /buy because paid_at is still null in the DB.
  // Batched: one DB read upfront, Stripe call only if something's actually
  // pending. Fans out with the paid-status checks below.
  const [, hasSendTier, hasFullTier, hasDownload] = await Promise.all([
    reconcileAllPendingForCase(caseRow.id),
    hasPaidForProduct(caseRow.id, "tier_send_letter"),
    hasPaidForProduct(caseRow.id, "tier_full_pressure"),
    hasPaidForProduct(caseRow.id, "demand_letter_download"),
  ]);
  const hasLetterPaid = hasSendTier || hasFullTier || hasDownload;

  if (!hasLetterPaid && !isAdmin) {
    redirect(`/case/${caseRow.id}/buy/demand-letter`);
  }

  // Lazy-generate: if no letter row exists for this case, create one now.
  // ensureDemandLetterForCase is idempotent and safe to call on every load.
  const ensureResult = await ensureDemandLetterForCase(caseRow.id);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;
  const { data: letter } = await admin
    .from("demand_letters")
    .select("*")
    .eq("case_id", params.id)
    .order("version", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!letter) {
    // Parse out which intake fields are missing and route the user to the
    // wizard step that owns the first one. Fall back to a generic message
    // if the reason doesn't match a known pattern.
    const reason = ensureResult.reason ?? "";
    const missingMatch = reason.match(/incomplete_intake: missing (.+)/);
    const missingFields = missingMatch
      ? missingMatch[1].split(",").map((s) => s.trim())
      : [];

    const FIELD_TO_STEP: Record<string, { label: string; step: string }> = {
      defendant_name: { label: "defendant name", step: "defendant" },
      defendant_address: { label: "defendant mailing address", step: "defendant" },
      plaintiff_name: { label: "your name", step: "plaintiff" },
      plaintiff_address: { label: "your mailing address", step: "plaintiff" },
      facts_narrative: { label: "the facts of what happened", step: "narrative" },
      amount_cents: { label: "the amount in dispute", step: "amount" },
    };
    const firstMissing = missingFields[0];
    const stepHint = firstMissing ? FIELD_TO_STEP[firstMissing] : null;

    return (
      <div>
        <PageHead
          back={{ href: `/case/${caseRow.id}`, label: "Case Overview" }}
          title="Demand Letter"
        />
        <EmptyState title="One last thing before we draft your letter">
          {missingFields.length > 0 ? (
            <>
              <p>
                We need a bit more information to draft an accurate letter.
                Missing:
              </p>
              <ul
                style={{
                  display: "inline-block",
                  textAlign: "left",
                  margin: "10px auto 16px",
                  paddingLeft: 22,
                }}
              >
                {missingFields.map((f) => (
                  <li key={f}>
                    {FIELD_TO_STEP[f]?.label ?? f.replace(/_/g, " ")}
                  </li>
                ))}
              </ul>
              {stepHint ? (
                <p style={{ marginBottom: 16 }}>
                  Add the {stepHint.label} and we&rsquo;ll generate your letter
                  immediately.
                </p>
              ) : null}
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                {stepHint ? (
                  <Link
                    href={`/case/${caseRow.id}/build/${stepHint.step}`}
                    className="btn btn-dark"
                  >
                    Add {stepHint.label}
                  </Link>
                ) : null}
                <Link href={`/case/${caseRow.id}/build`} className="btn btn-cream">
                  Open full case details
                </Link>
              </div>
            </>
          ) : (
            <>
              <p>
                We&rsquo;re still working on your letter. Hold tight, we&rsquo;ll have it ready shortly.
              </p>
              <p>
                If this doesn&rsquo;t resolve, email{" "}
                <a href="mailto:contact@civilcase.com">contact@civilcase.com</a>{" "}
                and we&rsquo;ll fix it for you.
              </p>
              <Link href={`/case/${caseRow.id}`} className="btn btn-dark">
                Open case
              </Link>
            </>
          )}
        </EmptyState>
      </div>
    );
  }

  return (
    <div>
      <PageHead
        back={{ href: `/case/${caseRow.id}`, label: "Case Overview" }}
        title="Demand Letter"
        sub={
          <>
            vs. {caseRow.defendant_name} ·{" "}
            {formatDisputeTypeShort(
              caseRow.dispute_type,
              disputeTypeOtherFrom(caseRow.intake_answers),
            )}
          </>
        }
      />
      <LetterApprovalPanel
        caseId={caseRow.id}
        approvalStatus={
          (letter.approval_status as
            | "pending"
            | "approved"
            | "changes_requested"
            | undefined) ?? "pending"
        }
        changesText={(letter.changes_text as string | null) ?? null}
        hasMailVendorId={!!letter.mail_vendor_letter_id}
      />
      <ProductDocumentView
        pdfUrl={`/api/demand-letter/${caseRow.id}/pdf`}
        title="Demand Letter PDF"
      />
    </div>
  );
}

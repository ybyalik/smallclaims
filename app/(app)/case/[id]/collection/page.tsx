// /case/[id]/collection
//
// View the user's Post-Judgment Collection Plan. Auto-renders the latest
// row from the collection_plans table. While the plan is still generating
// we show a status panel that polls /api/cases/[id]/collection-plan/status
// every few seconds via a client component. Once status='ready', the prose
// is rendered to HTML.

import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { createClient } from "../../../../../lib/supabase/server";
import { createServiceRoleClient } from "../../../../../lib/supabase/service-role";
import { hasPaidForProduct } from "../../../../../lib/payments/access";
import { reconcilePendingPayment } from "../../../../../lib/payments/reconcile";
import { ensureCollectionPlanForCase } from "../../../../../lib/collection-plan/generate";
import CollectionPlanStatus from "./CollectionPlanStatus";
import ProductDocumentView from "../../../../../components/cases/ProductDocumentView";
import PageHead from "../../../../../components/layout/PageHead";

export const metadata: Metadata = {
  title: "Post-Judgment Collection Plan",
};

export const dynamic = "force-dynamic";
export const maxDuration = 60;

// Same cooldown as generate.ts. Keep in sync.
const RETRY_COOLDOWN_MS = 5 * 60 * 1000;
const MAX_FAILED_VERSIONS = 3;

export default async function CollectionPlanPage({
  params,
}: {
  params: { id: string };
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createClient() as any;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect(`/login?next=/case/${params.id}/collection`);
  }

  const { data: caseRow } = await supabase
    .from("cases")
    .select("id, defendant_name, plaintiff_name, state, county")
    .eq("id", params.id)
    .eq("owner_user_id", user.id)
    .single();
  if (!caseRow) notFound();

  // Self-heal pending payments (preview deploys, dropped webhooks).
  await reconcilePendingPayment(caseRow.id, "collection_plan");

  const paid = await hasPaidForProduct(caseRow.id, "collection_plan");
  if (!paid) {
    redirect(`/case/${caseRow.id}/buy/collection-plan`);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;

  // Lazy-fire generation. The orchestrator enforces a 5-minute cooldown
  // and a 3-failures-in-24h cap so this is safe to call on every page load.
  ensureCollectionPlanForCase(caseRow.id).catch((err) => {
    console.error("[collection page] ensureCollectionPlanForCase failed", err);
  });

  const { data: plan } = await admin
    .from("collection_plans")
    .select("id, status, body_md, body_html, error_message, updated_at, version")
    .eq("case_id", caseRow.id)
    .order("version", { ascending: false })
    .limit(1)
    .maybeSingle();

  // Count failures in the last 24 hours so we can tell the customer when
  // we've stopped auto-retrying.
  const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const { count: failedCount } = await admin
    .from("collection_plans")
    .select("id", { count: "exact", head: true })
    .eq("case_id", caseRow.id)
    .eq("status", "failed")
    .gte("updated_at", dayAgo);

  const status = (plan?.status as string | undefined) ?? "pending";
  const isReady = status === "ready" && (!!plan?.body_html || !!plan?.body_md);

  const headerSub = `vs. ${caseRow.defendant_name ?? "Defendant"} · ${
    caseRow.state ?? ""
  }`;

  // Compute the view state and cooldown timing for the client component.
  const lastUpdatedMs = plan?.updated_at
    ? new Date(plan.updated_at).getTime()
    : 0;
  const failedCountSafe = typeof failedCount === "number" ? failedCount : 0;
  let viewState: "ready" | "running" | "cooldown" | "max_attempts" = "running";
  let cooldownSecondsRemaining = 0;
  if (isReady) {
    viewState = "ready";
  } else if (status === "failed") {
    if (failedCountSafe >= MAX_FAILED_VERSIONS) {
      viewState = "max_attempts";
    } else {
      const sinceFailureMs = Date.now() - lastUpdatedMs;
      if (sinceFailureMs < RETRY_COOLDOWN_MS) {
        viewState = "cooldown";
        cooldownSecondsRemaining = Math.ceil(
          (RETRY_COOLDOWN_MS - sinceFailureMs) / 1000,
        );
      }
    }
  }

  return (
    <div>
      <PageHead
        back={{ href: `/case/${caseRow.id}`, label: "Case Overview" }}
        title="Post-Judgment Collection Plan"
        sub={headerSub}
      />

      {isReady ? (
        <ProductDocumentView
          pdfUrl={`/api/cases/${caseRow.id}/collection-plan/pdf`}
          title="Post-Judgment Collection Plan PDF"
        />
      ) : (
        <CollectionPlanStatus
          caseId={caseRow.id}
          initialStatus={status}
          initialViewState={viewState}
          initialCooldownSeconds={cooldownSecondsRemaining}
        />
      )}
    </div>
  );
}

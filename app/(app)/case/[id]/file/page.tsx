import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { createClient } from "../../../../../lib/supabase/server";
import type { Case } from "../../../../../lib/supabase/types";
import { hasPaidForProduct } from "../../../../../lib/payments/access";
import { loadStateGuide } from "../../../../../lib/state-data";
import { STATES } from "../../../../../lib/states";
import FilingGuideContent from "./FilingGuideContent";
import PageHead from "../../../../../components/layout/PageHead";
import EmptyState from "../../../../../components/ui/EmptyState";

export const metadata: Metadata = {
  title: "File in court — Filing Guide",
};

export const dynamic = "force-dynamic";

export default async function FilingGuidePage({ params }: { params: { id: string } }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createClient() as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: caseRow } = await supabase
    .from("cases")
    .select("*")
    .eq("id", params.id)
    .eq("owner_user_id", user.id)
    .single();
  if (!caseRow) notFound();
  const c = caseRow as Case;

  const paid = await hasPaidForProduct(c.id, "filing_guide");
  if (!paid) {
    redirect(`/case/${c.id}/buy/filing-guide`);
  }

  const stateMeta = STATES.find((s) => s.abbr === c.state) ?? null;
  const guide = stateMeta ? await loadStateGuide(stateMeta.slug) : null;

  return (
    <div>
      <PageHead
        back={{ href: `/case/${c.id}`, label: "Back to Case" }}
        title="File in court"
        sub="Your demand letter ran its course. Time to take this to small-claims court."
      />

      {guide ? (
        <FilingGuideContent guide={guide} caseRow={c} />
      ) : (
        <FilingGuidePendingView stateName={stateMeta?.name ?? c.state} />
      )}
    </div>
  );
}

function FilingGuidePendingView({ stateName }: { stateName: string }) {
  return (
    <EmptyState
      title={`Filing Guide for ${stateName} is being prepared`}
      body={`We have your payment on file. The ${stateName} Filing Guide will appear here once it's ready, we'll email you when it's live.`}
    />
  );
}

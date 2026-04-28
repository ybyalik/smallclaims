import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "../../../../../../lib/supabase/server";
import LetterEditor from "./LetterEditor";

export const metadata: Metadata = {
  title: "Letter editor",
};

export const dynamic = "force-dynamic";

export default async function LetterPage({ params }: { params: { id: string } }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createClient() as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: caseRow } = await supabase
    .from("cases")
    .select("*")
    .eq("id", params.id)
    .single();
  if (!caseRow) notFound();

  const { data: letter } = await supabase
    .from("demand_letters")
    .select("*")
    .eq("case_id", params.id)
    .order("version", { ascending: false })
    .limit(1)
    .single();
  if (!letter) notFound();

  // Has a successful payment for this case + product been recorded?
  const { data: payments } = await supabase
    .from("payments")
    .select("id, status, product_key")
    .eq("case_id", params.id)
    .eq("status", "succeeded")
    .eq("product_key", "demand_letter_download");
  const isPaid = (payments?.length ?? 0) > 0;

  // Admin profile check (admin bypasses paywall)
  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("user_id", user.id)
    .single();
  const isAdmin = !!profile?.is_admin;

  return (
    <div>
      <div className="app-page-head">
        <div>
          <Link href={`/dashboard/cases/${caseRow.id}`} className="app-back">
            ← Case overview
          </Link>
          <h1>Demand letter</h1>
          <p className="app-page-sub">
            vs. {caseRow.defendant_name} · {caseRow.dispute_type.replace(/_/g, " ")}
          </p>
        </div>
      </div>
      <LetterEditor
        caseId={caseRow.id}
        initialBody={letter.body_md}
        isPaid={isPaid}
        isAdmin={isAdmin}
      />
    </div>
  );
}

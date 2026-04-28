import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { createClient } from "../../../../../lib/supabase/server";
import LetterEditor from "./LetterEditor";

export const metadata: Metadata = {
  title: "Review your demand letter",
  description: "Read, edit, and send your demand letter.",
};

export const dynamic = "force-dynamic";

export default async function PreviewPage({
  params,
}: {
  params: { caseId: string };
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createClient() as any;

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect("/demand-letter");
  }

  const { data: caseRow, error: caseErr } = await supabase
    .from("cases")
    .select("*")
    .eq("id", params.caseId)
    .eq("owner_user_id", user.id)
    .single();

  if (caseErr || !caseRow) {
    notFound();
  }

  const { data: letter, error: letterErr } = await supabase
    .from("demand_letters")
    .select("*")
    .eq("case_id", params.caseId)
    .order("version", { ascending: false })
    .limit(1)
    .single();

  if (letterErr || !letter) {
    notFound();
  }

  return (
    <main className="dl-page">
      <section className="dl-hero">
        <div className="wrap-narrow">
          <div className="eyebrow">Step 2 of 3 · Review &amp; edit</div>
          <h1>Your demand letter</h1>
          <p className="lede">
            Read it carefully. Edit anything that doesn&apos;t sound right. When you&apos;re happy
            with it, choose how to send.
          </p>
        </div>
      </section>

      <section className="wrap-narrow dl-form-wrap">
        <LetterEditor caseId={caseRow.id} initialBody={letter.body_md} />
      </section>
    </main>
  );
}

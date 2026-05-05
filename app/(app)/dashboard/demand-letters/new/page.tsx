import { redirect } from "next/navigation";
import { createClient } from "../../../../../lib/supabase/server";
import { createServiceRoleClient } from "../../../../../lib/supabase/service-role";

export const metadata = {
  title: "New demand letter",
};

export const dynamic = "force-dynamic";

/**
 * Authenticated entry point for the wizard.
 *
 * Creates a fresh draft case attached to the user, then redirects to
 * the wizard. This is the same UX as the public /demand-letter
 * "Start my demand letter" button — we use the same wizard for both
 * authenticated and anonymous users.
 *
 * If a ?case=<id> param is present (because StartButton already created
 * a draft), reuse that one instead of creating a second.
 */
export default async function NewDemandLetterPage({
  searchParams,
}: {
  searchParams: { case?: string };
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/dashboard/demand-letters/new");

  // Reuse the case StartButton already created, if present
  if (searchParams.case) {
    redirect(`/demand-letter/wizard/${searchParams.case}/category`);
  }

  // Otherwise create a fresh draft and route into the wizard
  const db = createServiceRoleClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (db as any)
    .from("cases")
    .insert({
      owner_user_id: user.id,
      status: "draft",
      state: "CA",
      dispute_type: "other",
      amount_cents: 0,
      intake_version: 2,
    })
    .select("id")
    .single();

  if (error || !data) {
    console.error("[new demand letter]", error);
    redirect("/dashboard/demand-letters?error=create_failed");
  }

  redirect(`/demand-letter/wizard/${data.id}/category`);
}

import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { createClient } from "../../lib/supabase/server";
import { createServiceRoleClient } from "../../lib/supabase/service-role";
import FinishSignupForm from "./FinishSignupForm";

export const metadata: Metadata = {
  title: "Finish signup",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

/**
 * Conversion step for anonymous users. After they pay (or click "save my
 * progress"), they land here to set a password on their hidden account.
 * The hidden Supabase user gets email + password stamped onto it; all
 * their case rows stay attached because the user id never changes.
 *
 * If the visitor is already a real (non-anonymous) user, we skip the
 * form entirely and redirect to wherever they were going.
 */
export default async function FinishSignupPage({
  searchParams,
}: {
  searchParams: { next?: string };
}) {
  const next = searchParams.next || "/dashboard";

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isAnon = (user as { is_anonymous?: boolean } | null)?.is_anonymous === true;

  // Not signed in at all: send them to /signup (regular path).
  if (!user) {
    redirect(`/signup?next=${encodeURIComponent(next)}`);
  }

  // Already a real account: nothing to do here.
  if (!isAnon) {
    redirect(next);
  }

  // Pull a suggested email from user_metadata.email_pending_claim (set when
  // they typed the email in the Plaintiff step). Falls back to the latest
  // case's plaintiff_email so they don't have to retype it.
  const meta = (user.user_metadata ?? {}) as { email_pending_claim?: string };
  let suggestedEmail = meta.email_pending_claim ?? "";
  if (!suggestedEmail) {
    const db = createServiceRoleClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: lastCase } = await (db as any)
      .from("cases")
      .select("plaintiff_email")
      .eq("owner_user_id", user.id)
      .not("plaintiff_email", "is", null)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (lastCase?.plaintiff_email) suggestedEmail = lastCase.plaintiff_email;
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <a href="/" className="auth-logo" aria-label="CivilCase home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/civilcase-logo.webp"
            alt="CivilCase"
            width={600}
            height={198}
          />
        </a>
        <h1>Save your account</h1>
        <p className="auth-sub">
          Set a password so you can sign back in from any device and pick up
          where you left off.
        </p>

        <Suspense fallback={null}>
          <FinishSignupForm next={next} suggestedEmail={suggestedEmail} />
        </Suspense>

        <p className="auth-foot">
          Already have an account?{" "}
          <a href={`/login?next=${encodeURIComponent(next)}`}>Sign in</a>
        </p>

        <p className="auth-tos">
          By creating an account, you agree that CivilCase is not a law firm
          and does not provide legal advice. Use of this service does not
          create an attorney-client relationship.
        </p>
      </div>
    </main>
  );
}

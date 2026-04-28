import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { createClient } from "../../lib/supabase/server";
import SignupForm from "./SignupForm";

export const metadata: Metadata = {
  title: "Create account",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: { next?: string };
}) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    redirect(searchParams.next || "/dashboard");
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <a href="/" className="auth-logo">
          CivilCase
        </a>
        <h1>Create your account</h1>
        <p className="auth-sub">Free to start. Pay only when you&apos;re ready to send your letter.</p>

        <Suspense fallback={null}>
          <SignupForm next={searchParams.next} />
        </Suspense>

        <p className="auth-foot">
          Already have an account?{" "}
          <a href={`/login${searchParams.next ? `?next=${encodeURIComponent(searchParams.next)}` : ""}`}>
            Sign in
          </a>
        </p>

        <p className="auth-tos">
          By creating an account, you agree that CivilCase is not a law firm and does not
          provide legal advice. Use of this service does not create an attorney-client
          relationship.
        </p>
      </div>
    </main>
  );
}

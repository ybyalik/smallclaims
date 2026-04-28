import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { createClient } from "../../lib/supabase/server";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { next?: string; error?: string };
}) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    redirect(searchParams.next || "/dashboard");
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
            height={204}
          />
        </a>
        <h1>Welcome back</h1>
        <p className="auth-sub">Sign in to access your cases.</p>

        <Suspense fallback={null}>
          <LoginForm next={searchParams.next} error={searchParams.error} />
        </Suspense>

        <p className="auth-foot">
          Don&apos;t have an account?{" "}
          <a href={`/signup${searchParams.next ? `?next=${encodeURIComponent(searchParams.next)}` : ""}`}>
            Create one
          </a>
        </p>
      </div>
    </main>
  );
}

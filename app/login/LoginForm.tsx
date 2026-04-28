"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client";
import { signInWithGoogle, sendMagicLink } from "../../lib/auth/oauth";

export default function LoginForm({ next, error: initialError }: { next?: string; error?: string }) {
  const router = useRouter();
  const [mode, setMode] = useState<"password" | "magic">("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(initialError ?? null);
  const [magicSent, setMagicSent] = useState(false);

  async function onPasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.replace(next || "/dashboard");
    router.refresh();
  }

  async function onMagicSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await sendMagicLink(email, next);
      setMagicSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send magic link.");
    } finally {
      setLoading(false);
    }
  }

  async function onGoogle() {
    setError(null);
    setLoading(true);
    try {
      await signInWithGoogle(next);
    } catch (err) {
      setError(
        err instanceof Error
          ? `Google sign-in failed: ${err.message}`
          : "Google sign-in failed."
      );
      setLoading(false);
    }
  }

  if (magicSent) {
    return (
      <div className="auth-success">
        <p>
          Check your inbox at <strong>{email}</strong> for a sign-in link.
        </p>
        <button type="button" className="auth-link" onClick={() => setMagicSent(false)}>
          Use a different method
        </button>
      </div>
    );
  }

  return (
    <>
      <button type="button" className="btn-google" onClick={onGoogle} disabled={loading}>
        <GoogleIcon />
        <span>Continue with Google</span>
      </button>

      <div className="auth-divider">or</div>

      {mode === "password" ? (
        <form onSubmit={onPasswordSubmit} className="auth-form">
          <label>
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              autoFocus
            />
          </label>
          <label>
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </label>
          {error && <p className="auth-error">{error}</p>}
          <button type="submit" disabled={loading} className="btn btn-dark btn-full">
            {loading ? "Signing in..." : "Sign in"}
          </button>
          <button
            type="button"
            className="auth-link auth-link-center"
            onClick={() => {
              setMode("magic");
              setError(null);
            }}
          >
            Email me a sign-in link instead
          </button>
        </form>
      ) : (
        <form onSubmit={onMagicSubmit} className="auth-form">
          <label>
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              autoFocus
            />
          </label>
          {error && <p className="auth-error">{error}</p>}
          <button type="submit" disabled={loading} className="btn btn-dark btn-full">
            {loading ? "Sending..." : "Email me a sign-in link"}
          </button>
          <button
            type="button"
            className="auth-link auth-link-center"
            onClick={() => {
              setMode("password");
              setError(null);
            }}
          >
            Use email + password instead
          </button>
        </form>
      )}
    </>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.997 8.997 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
      />
    </svg>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client";

interface Props {
  next: string;
  suggestedEmail: string;
}

export default function FinishSignupForm({ next, suggestedEmail }: Props) {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState(suggestedEmail);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [needsVerify, setNeedsVerify] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!email.trim()) {
      setError("Enter your email.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setLoading(true);

    const supabase = createClient();

    // Convert the anonymous user into a real one by stamping email +
    // password onto the existing user record. Their user id (and therefore
    // every case row they've created) stays attached.
    const { data, error: updateErr } = await supabase.auth.updateUser({
      email: email.trim(),
      password,
      data: fullName.trim() ? { full_name: fullName.trim() } : undefined,
    });

    if (updateErr) {
      setLoading(false);
      // The common case is "email already in use" — point them to login.
      const msg = updateErr.message.toLowerCase();
      if (msg.includes("already") || msg.includes("registered")) {
        setError(
          "That email is already used by another account. Sign in instead to attach this case to it."
        );
      } else {
        setError(updateErr.message);
      }
      return;
    }

    // Supabase sends a confirmation email when you stamp a new email onto a
    // user. They still have a valid session, so we can route them forward
    // and just flag that the email needs verifying at some point.
    if (data?.user) {
      setNeedsVerify(true);
      setLoading(false);
      // Move on after a short pause so they see the confirmation message.
      setTimeout(() => {
        router.replace(next);
        router.refresh();
      }, 1200);
      return;
    }

    setLoading(false);
    router.replace(next);
    router.refresh();
  }

  if (needsVerify) {
    return (
      <div className="auth-success">
        <p>
          You&rsquo;re all set. We sent a confirmation link to{" "}
          <strong>{email}</strong> so you can verify your email later.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="auth-form">
      <label>
        <span>Full name</span>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          autoComplete="name"
        />
      </label>
      <label>
        <span>Email</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
      </label>
      <label>
        <span>Password</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
          autoComplete="new-password"
        />
        <span className="auth-hint">8 characters minimum</span>
      </label>
      {error && <p className="auth-error">{error}</p>}
      <button type="submit" disabled={loading} className="btn btn-dark btn-full">
        {loading ? "Saving account..." : "Save Account"}
      </button>
      <p className="auth-skip">
        <a href={next}>Skip for now</a>
      </p>
    </form>
  );
}

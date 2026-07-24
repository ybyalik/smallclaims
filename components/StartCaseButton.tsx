"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import Turnstile, { captchaConfigured, type TurnstileHandle } from "./Turnstile";

/**
 * Drop-in replacement for `<Link href="/dashboard/cases/new">…</Link>`.
 *
 * Instead of navigating to the legacy server page (which does its own auth
 * check, insert, and redirect — two server-rendered pages back-to-back),
 * this hits /api/cases/create directly and pushes the user straight into
 * the wizard. Saves one full page transition.
 *
 * When Turnstile is configured it renders an invisible bot check that solves
 * on load; its token is sent with the create request (Supabase requires it on
 * anonymous sign-in once Captcha is enabled). When Turnstile is NOT configured
 * the widget renders nothing and this behaves exactly as before.
 *
 * Falls back to the legacy URL if the API fails for any reason, so
 * functionality stays intact even when the API path errors.
 */
export default function StartCaseButton({
  children,
  className,
  ariaLabel,
}: {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [, startTransition] = useTransition();
  const tokenRef = useRef<string | null>(null);
  const turnstileRef = useRef<TurnstileHandle>(null);

  // Wait briefly for the invisible Turnstile to produce a token (it solves
  // within ~1s of page load). Returns the token, or null if unconfigured or it
  // never arrives — the server tolerates a missing token when Captcha is off.
  async function waitForToken(maxMs = 2500): Promise<string | null> {
    if (!captchaConfigured()) return null;
    const start = Date.now();
    while (!tokenRef.current && Date.now() - start < maxMs) {
      await new Promise((r) => setTimeout(r, 100));
    }
    return tokenRef.current;
  }

  async function go() {
    if (loading) return;
    setLoading(true);
    try {
      const token = await waitForToken();
      const res = await fetch("/api/cases/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(token ? { captchaToken: token } : {}),
      });
      // The token is single-use; drop it and refresh for a possible retry.
      turnstileRef.current?.reset();
      tokenRef.current = null;
      if (res.status === 401) {
        const body = await res.json().catch(() => null);
        const url = body?.loginUrl || "/login?next=/dashboard/cases/new";
        startTransition(() => router.push(url));
        return;
      }
      if (!res.ok) {
        // API failed — fall back to the legacy page so the user still
        // gets routed somewhere reasonable.
        startTransition(() => router.push("/dashboard/cases/new"));
        return;
      }
      const body = (await res.json()) as { url: string };
      startTransition(() => router.push(body.url));
    } catch {
      startTransition(() => router.push("/dashboard/cases/new"));
    } finally {
      // We intentionally don't unset loading here — the navigation should
      // unmount this button. If somehow it doesn't, leaving loading=true
      // prevents a double-submit.
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={go}
        className={className}
        aria-label={ariaLabel}
        aria-busy={loading || undefined}
        data-loading={loading || undefined}
      >
        {children}
      </button>
      <Turnstile
        ref={turnstileRef}
        onToken={(t) => {
          tokenRef.current = t;
        }}
        onExpire={() => {
          tokenRef.current = null;
        }}
      />
    </>
  );
}

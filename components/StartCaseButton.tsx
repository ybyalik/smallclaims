"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

/**
 * Drop-in replacement for `<Link href="/dashboard/cases/new">…</Link>`.
 *
 * Instead of navigating to the legacy server page (which does its own auth
 * check, insert, and redirect — two server-rendered pages back-to-back),
 * this hits /api/cases/create directly and pushes the user straight into
 * the wizard. Saves one full page transition.
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

  async function go() {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/cases/create", { method: "POST" });
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
  );
}

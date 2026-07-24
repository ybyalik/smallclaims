"use client";

// Cloudflare Turnstile widget — the invisible bot check on our auth flows.
//
// INERT UNTIL CONFIGURED: when NEXT_PUBLIC_TURNSTILE_SITE_KEY is unset this
// component renders nothing and captchaConfigured() is false, so the app
// behaves exactly as it did before. Set the env var (and enable Captcha in the
// Supabase dashboard with the matching secret key) to turn it on.
//
// Usage:
//   const ref = useRef<TurnstileHandle>(null);
//   const [token, setToken] = useState<string | null>(null);
//   <Turnstile ref={ref} onToken={setToken} onExpire={() => setToken(null)} />
//   // pass `token` to supabase.auth.* via options.captchaToken
//   // on failure, ref.current?.reset() to get a fresh single-use token

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export function captchaConfigured(): boolean {
  return !!SITE_KEY;
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    turnstile?: any;
  }
}

// Load the Turnstile script exactly once, shared across every widget instance.
let scriptPromise: Promise<void> | null = null;
function loadScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.turnstile) return Promise.resolve();
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("turnstile-script-failed"));
    document.head.appendChild(s);
  });
  return scriptPromise;
}

export interface TurnstileHandle {
  reset: () => void;
}

interface TurnstileProps {
  onToken: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
  // "interaction-only" (default): invisible for normal visitors; only shows a
  // challenge to suspicious ones. "always": always render the widget.
  appearance?: "always" | "interaction-only";
  className?: string;
}

const Turnstile = forwardRef<TurnstileHandle, TurnstileProps>(function Turnstile(
  { onToken, onExpire, onError, appearance = "interaction-only", className },
  ref,
) {
  const holder = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  // Keep the latest callbacks without forcing the widget to re-render.
  const cbs = useRef({ onToken, onExpire, onError });
  cbs.current = { onToken, onExpire, onError };

  useImperativeHandle(
    ref,
    () => ({
      reset() {
        if (widgetId.current && window.turnstile) {
          try {
            window.turnstile.reset(widgetId.current);
          } catch {
            /* ignore */
          }
        }
      },
    }),
    [],
  );

  useEffect(() => {
    if (!SITE_KEY) return;
    let cancelled = false;
    loadScript()
      .then(() => {
        if (cancelled || !holder.current || !window.turnstile) return;
        if (widgetId.current) return; // already rendered
        widgetId.current = window.turnstile.render(holder.current, {
          sitekey: SITE_KEY,
          appearance,
          "refresh-expired": "auto",
          callback: (token: string) => cbs.current.onToken(token),
          "expired-callback": () => cbs.current.onExpire?.(),
          "error-callback": () => cbs.current.onError?.(),
        });
      })
      .catch(() => cbs.current.onError?.());
    return () => {
      cancelled = true;
      if (widgetId.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetId.current);
        } catch {
          /* ignore */
        }
        widgetId.current = null;
      }
    };
  }, [appearance]);

  if (!SITE_KEY) return null;
  return <div ref={holder} className={className} />;
});

export default Turnstile;

// Server wrapper for the site header.
//
// Renders SiteHeaderClient with no initial user data. The client
// component hydrates auth state via /api/me on mount (with optional
// instant-paint via the cc_has_session cookie for repeat visitors).
//
// We deliberately do NOT call Supabase auth here. Reading cookies in
// this server component would force every page in the (firm) route
// group into dynamic SSR (because the layout uses it), blocking
// static generation on the 131 long-tail state + issue pages. This
// thin wrapper keeps the layout statically eligible.

import { SiteHeaderClient } from "./SiteHeaderClient";

export function SiteHeader() {
  return <SiteHeaderClient />;
}

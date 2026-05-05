import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";
import type { Database } from "./types";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Required to refresh the session cookie.
  const { data: { user } } = await supabase.auth.getUser();

  const url = request.nextUrl;

  // Browsers caching the pre-Phase-1 SiteHeader still link to
  // /signup?next=/dashboard/cases/new. After the URL migration to
  // /dashboard/demand-letters/* and the wizard-first entry, those users
  // should land at the public /demand-letter entry instead of getting
  // stuck on signup. (The wizard handles both anon and authed flows.)
  if (url.pathname === "/signup" || url.pathname === "/login") {
    const next = url.searchParams.get("next") || "";
    if (
      next === "/dashboard/cases/new" ||
      next === "/dashboard/demand-letters/new"
    ) {
      const redirectUrl = url.clone();
      redirectUrl.pathname = "/demand-letter";
      redirectUrl.search = "";
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Gate /dashboard/* on authentication.
  if (url.pathname.startsWith("/dashboard") && !user) {
    const redirectUrl = url.clone();
    redirectUrl.pathname = "/login";
    redirectUrl.searchParams.set("next", url.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Gate /admin/* on authentication AND admin role.
  if (url.pathname.startsWith("/admin")) {
    if (!user) {
      const redirectUrl = url.clone();
      redirectUrl.pathname = "/login";
      redirectUrl.searchParams.set("next", url.pathname);
      return NextResponse.redirect(redirectUrl);
    }
    // Check admin role via profiles table. RLS allows the user to read their
    // own profile.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: profile } = await (supabase as any)
      .from("profiles")
      .select("is_admin")
      .eq("user_id", user.id)
      .single();
    if (!profile?.is_admin) {
      const redirectUrl = url.clone();
      redirectUrl.pathname = "/dashboard";
      redirectUrl.search = "";
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Logged-in users hitting /login or /signup go to /dashboard.
  if (user && (url.pathname === "/login" || url.pathname === "/signup")) {
    const redirectUrl = url.clone();
    redirectUrl.pathname = "/dashboard";
    redirectUrl.search = "";
    return NextResponse.redirect(redirectUrl);
  }

  // Wizard pages must always re-fetch case data on navigation. The browser
  // bfcache (back-forward cache) snapshots the JS state at navigation-away
  // time, which can show empty fields when the user clicks Back. Setting
  // Cache-Control: no-store disables bfcache for these pages so back-nav
  // forces a real server render and re-loads data from the database.
  if (url.pathname.startsWith("/demand-letter/wizard/")) {
    response.headers.set("Cache-Control", "no-store, max-age=0, must-revalidate");
  }

  return response;
}

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

  // Gate /dashboard/* on authentication.
  if (url.pathname.startsWith("/dashboard") && !user) {
    const redirectUrl = url.clone();
    redirectUrl.pathname = "/login";
    redirectUrl.searchParams.set("next", url.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Gate /admin/* on authentication. /admin/login still works as a legacy entry
  // point until Commit 6 deletes it; redirects unauthenticated requests there.
  if (url.pathname.startsWith("/admin") && url.pathname !== "/admin/login" && !user) {
    const redirectUrl = url.clone();
    redirectUrl.pathname = "/login";
    redirectUrl.searchParams.set("next", url.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // If logged in and visiting /admin/login or /login or /signup, send to dashboard.
  if (
    user &&
    (url.pathname === "/admin/login" ||
      url.pathname === "/login" ||
      url.pathname === "/signup")
  ) {
    const redirectUrl = url.clone();
    redirectUrl.pathname = "/dashboard";
    redirectUrl.search = "";
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

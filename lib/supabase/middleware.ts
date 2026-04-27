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

  // Gate /admin/* on authentication.
  const url = request.nextUrl;
  if (url.pathname.startsWith("/admin") && url.pathname !== "/admin/login" && !user) {
    const redirectUrl = url.clone();
    redirectUrl.pathname = "/admin/login";
    redirectUrl.searchParams.set("next", url.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // If logged in and visiting /admin/login, send to /admin.
  if (url.pathname === "/admin/login" && user) {
    const redirectUrl = url.clone();
    redirectUrl.pathname = "/admin";
    redirectUrl.search = "";
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

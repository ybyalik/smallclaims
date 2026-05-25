import { NextResponse } from "next/server";
import { createClient } from "../../../lib/supabase/server";

// /api/me — returns minimal auth state for the consumer site header.
//
// Replaces the previous pattern of fetching Supabase auth inside the
// (firm) layout's server component. That pattern forced every page in
// the route group into dynamic SSR (because cookies() is dynamic) and
// blocked static generation on the 131 long-tail state + issue pages.
//
// Now the layout renders a static header skeleton; SiteHeaderClient
// hits this endpoint on mount and swaps in the logged-in chrome.
// A companion non-httpOnly cookie (cc_has_session) lets the client
// render the logged-in shell synchronously on repeat visits so there's
// no flash for returning users.
//
// Response payload is deliberately minimal: only what the header needs.

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = createClient();
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    const isAnon = (authUser as { is_anonymous?: boolean } | null)?.is_anonymous === true;
    if (!authUser || isAnon) {
      return NextResponse.json({ loggedIn: false });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: profile } = await (supabase as any)
      .from("profiles")
      .select("full_name, avatar_url, is_admin")
      .eq("user_id", authUser.id)
      .single();

    return NextResponse.json({
      loggedIn: true,
      user: {
        email: authUser.email || "",
        fullName:
          profile?.full_name ||
          authUser.user_metadata?.full_name ||
          authUser.email ||
          "Account",
        avatarUrl: profile?.avatar_url || null,
        isAdmin: !!profile?.is_admin,
      },
    });
  } catch {
    return NextResponse.json({ loggedIn: false });
  }
}

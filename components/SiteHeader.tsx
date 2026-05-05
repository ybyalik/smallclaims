// Server component that fetches the current user (and optional profile)
// and hands the data to SiteHeaderInner. Two reasons for the split:
//
//   1. We want auth-aware chrome (Sign in vs. user menu) on first paint
//      with no client-side flash. Server-rendering the user state avoids
//      the "logged in user briefly sees Sign in button" flash.
//   2. The mobile burger / drawer needs client state, so the rest of the
//      header is necessarily a client component. This file is the seam.

import { createClient } from "../lib/supabase/server";
import SiteHeaderInner from "./SiteHeaderInner";

export interface SiteHeaderUser {
  email: string;
  fullName: string;
  avatarUrl: string | null;
  isAdmin: boolean;
}

export default async function SiteHeader() {
  let user: SiteHeaderUser | null = null;

  try {
    const supabase = createClient();
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    if (authUser) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: profile } = await (supabase as any)
        .from("profiles")
        .select("full_name, avatar_url, is_admin")
        .eq("user_id", authUser.id)
        .single();

      user = {
        email: authUser.email || "",
        fullName:
          profile?.full_name ||
          authUser.user_metadata?.full_name ||
          authUser.email ||
          "Account",
        avatarUrl: profile?.avatar_url || null,
        isAdmin: !!profile?.is_admin,
      };
    }
  } catch {
    // Header should never crash the page if Supabase is misconfigured;
    // fall through to the logged-out state.
    user = null;
  }

  return <SiteHeaderInner user={user} />;
}

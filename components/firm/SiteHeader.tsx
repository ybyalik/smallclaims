// Server wrapper for the site header. Fetches the current Supabase user
// (and a thin profile lookup for full name / avatar / admin flag) and
// hands the data to the client header. Anonymous Supabase users count as
// logged-out, so the chrome only switches into "user menu" mode for real
// signed-in accounts.

import { createClient } from "../../lib/supabase/server";
import { SiteHeaderClient, type SiteHeaderUser } from "./SiteHeaderClient";

export async function SiteHeader() {
  let user: SiteHeaderUser | null = null;

  try {
    const supabase = createClient();
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    const isAnon = (authUser as { is_anonymous?: boolean } | null)?.is_anonymous === true;
    if (authUser && !isAnon) {
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
    // fall through with user = null and render the logged-out chrome.
  }

  return <SiteHeaderClient user={user} />;
}

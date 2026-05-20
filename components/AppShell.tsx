// Shared app-style shell: left sidebar + main column. Used by:
//   - the authenticated dashboard (/dashboard/*)
//   - the case builder (/case/{id}/build/*) — sign-in required
//
// Sign-in required everywhere this shell is used now (case builder lost
// its anonymous path during the case-builder restructure).

import { redirect } from "next/navigation";
import { createClient } from "../lib/supabase/server";
import DashboardSidebar from "../app/(app)/DashboardSidebar";
import AppShellLayout from "./AppShellLayout";
import "../app/(app)/dashboard.css";

interface Props {
  children: React.ReactNode;
  /**
   * If true, redirect anonymous visitors to /login (gated dashboard).
   * If false (default for the wizard), allow anonymous users.
   */
  requireAuth?: boolean;
  /**
   * Where to redirect after login when requireAuth=true.
   * Defaults to /dashboard.
   */
  loginNext?: string;
}

export default async function AppShell({
  children,
  requireAuth = false,
  loginNext = "/dashboard",
}: Props) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Block fully logged-out visitors at the require-auth gate. Anonymous
  // Supabase users (those who started a case without signing up) get
  // past this so they can see /case/[id] and complete the wizard flow,
  // but the sidebar treats them as unauthed so we don't show dashboard
  // links they can't follow.
  if (requireAuth && !user) {
    redirect(`/login?next=${encodeURIComponent(loginNext)}`);
  }
  const isAnon = (user as { is_anonymous?: boolean } | null)?.is_anonymous === true;
  const isRealUser = !!user && !isAnon;

  let sidebarUser: {
    displayName: string;
    email: string;
    avatarUrl: string | null;
    isAdmin: boolean;
  } | null = null;

  if (isRealUser && user) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: profile } = await (supabase as any)
      .from("profiles")
      .select("full_name, avatar_url, is_admin")
      .eq("user_id", user.id)
      .single();

    sidebarUser = {
      displayName:
        profile?.full_name || user.user_metadata?.full_name || user.email || "Account",
      email: user.email || "",
      avatarUrl: profile?.avatar_url || null,
      isAdmin: !!profile?.is_admin,
    };
  }

  return (
    <AppShellLayout sidebar={<DashboardSidebar user={sidebarUser} />}>
      {children}
    </AppShellLayout>
  );
}

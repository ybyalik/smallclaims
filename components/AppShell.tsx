// Shared app-style shell: left sidebar + main column. Used by:
//   - the authenticated dashboard (/dashboard/*)
//   - the demand-letter wizard (/demand-letter/wizard/*) for both
//     anonymous and authenticated users
//
// Sidebar is auth-aware. When the requester is logged in we show their
// profile + admin/settings/signout. When anonymous we show "Save your
// progress" + sign-in/create-account links.

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

  if (requireAuth && !user) {
    redirect(`/login?next=${encodeURIComponent(loginNext)}`);
  }

  let sidebarUser: {
    displayName: string;
    email: string;
    avatarUrl: string | null;
    isAdmin: boolean;
  } | null = null;

  if (user) {
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

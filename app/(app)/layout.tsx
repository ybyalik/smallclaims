import "./dashboard.css";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";
import DashboardSidebar from "./DashboardSidebar";

export const metadata = {
  title: { default: "Dashboard", template: "%s · CivilCase" },
  robots: { index: false, follow: false },
};

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/dashboard");
  }

  // Fetch profile for is_admin + name
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: profile } = await (supabase as any)
    .from("profiles")
    .select("full_name, avatar_url, is_admin")
    .eq("user_id", user.id)
    .single();

  const displayName: string =
    profile?.full_name || user.user_metadata?.full_name || user.email || "Account";
  const isAdmin: boolean = !!profile?.is_admin;

  return (
    <div className="app-shell">
      <DashboardSidebar
        displayName={displayName}
        email={user.email || ""}
        avatarUrl={profile?.avatar_url || null}
        isAdmin={isAdmin}
      />
      <main className="app-main">{children}</main>
    </div>
  );
}

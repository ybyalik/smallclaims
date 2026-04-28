import type { Metadata } from "next";
import { createClient } from "../../../../lib/supabase/server";
import SettingsForm from "./SettingsForm";

export const metadata: Metadata = {
  title: "Settings",
};

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createClient() as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, avatar_url, is_admin, notification_preferences, created_at")
    .eq("user_id", user.id)
    .single();

  // Determine which auth identities the user has connected
  const identities = user.identities || [];
  const hasGoogle = identities.some((i: { provider: string }) => i.provider === "google");
  const hasEmail = identities.some((i: { provider: string }) => i.provider === "email");

  const memberSince = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div>
      <div className="app-page-head">
        <div>
          <h1>Settings</h1>
          <p className="app-page-sub">Manage your CivilCase account.</p>
        </div>
      </div>

      <div className="app-settings">
        <section className="app-settings-card">
          <h2>Profile</h2>
          <SettingsForm
            initialFullName={profile?.full_name || ""}
            email={user.email || ""}
          />
        </section>

        <section className="app-settings-card">
          <h2>Sign-in methods</h2>
          <ul className="app-settings-list">
            <li>
              <span>Email and password</span>
              <span className={hasEmail ? "app-pill-on" : "app-pill-off"}>
                {hasEmail ? "Active" : "Not set"}
              </span>
            </li>
            <li>
              <span>Google</span>
              <span className={hasGoogle ? "app-pill-on" : "app-pill-off"}>
                {hasGoogle ? "Connected" : "Not connected"}
              </span>
            </li>
          </ul>
          {!hasGoogle && (
            <p className="app-page-sub" style={{ marginTop: 12 }}>
              You can link Google by signing out and signing back in with the &ldquo;Continue
              with Google&rdquo; button on the login page, using the same email address.
            </p>
          )}
        </section>

        <section className="app-settings-card">
          <h2>Account</h2>
          <ul className="app-settings-list">
            <li>
              <span>Email</span>
              <span className="app-settings-value">{user.email}</span>
            </li>
            {memberSince && (
              <li>
                <span>Member since</span>
                <span className="app-settings-value">{memberSince}</span>
              </li>
            )}
            {profile?.is_admin && (
              <li>
                <span>Role</span>
                <span className="app-pill-on">Admin</span>
              </li>
            )}
          </ul>
          <div className="app-settings-actions">
            <a href="/auth/signout" className="btn btn-cream">
              Sign out
            </a>
          </div>
        </section>

        <section className="app-settings-card app-settings-disclaimer">
          <p>
            CivilCase is not a law firm and does not provide legal advice. Use of this
            service does not create an attorney-client relationship.
          </p>
        </section>
      </div>
    </div>
  );
}

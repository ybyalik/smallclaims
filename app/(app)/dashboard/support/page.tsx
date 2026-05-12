import type { Metadata } from "next";
import { createClient } from "../../../../lib/supabase/server";
import SupportForm from "./SupportForm";

export const metadata: Metadata = {
  title: "Support",
};

export const dynamic = "force-dynamic";

export default async function SupportPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createClient() as any;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("user_id", user.id)
    .maybeSingle();

  return (
    <div>
      <div className="app-page-head">
        <div>
          <h1>Support</h1>
          <p className="app-page-sub">
            Tell us what&rsquo;s going on. We read every message and reply by email.
          </p>
        </div>
      </div>

      <div className="app-settings">
        <section className="app-settings-card">
          <SupportForm
            email={user.email || ""}
            fullName={profile?.full_name ?? ""}
          />
        </section>
      </div>
    </div>
  );
}

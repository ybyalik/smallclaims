import type { Metadata } from "next";
import { createClient } from "../../../../lib/supabase/server";
import SupportForm from "./SupportForm";
import PageHead from "../../../../components/layout/PageHead";

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
      <PageHead
        title="Support"
        sub="Tell us what's going on. We read every message and reply by email."
      />

      <div className="app-settings">
        <section className="app-settings-card">
          <SupportForm
            email={user.email || ""}
            fullName={profile?.full_name ?? ""}
          />
        </section>
        <p className="app-support-direct">
          Prefer email? Reach us directly at{" "}
          <a href="mailto:contact@civilcase.com">contact@civilcase.com</a>.
        </p>
      </div>
    </div>
  );
}

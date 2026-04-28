"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../../../lib/supabase/client";

export default function SettingsForm({
  initialFullName,
  email,
}: {
  initialFullName: string;
  email: string;
}) {
  const router = useRouter();
  const [fullName, setFullName] = useState(initialFullName);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function save() {
    setError(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabase = createClient() as any;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setError("You're not signed in.");
      return;
    }
    const { error: dbErr } = await supabase
      .from("profiles")
      .update({ full_name: fullName.trim() || null })
      .eq("user_id", user.id);
    if (dbErr) {
      setError(dbErr.message);
      return;
    }
    // Also update auth user metadata so it shows up in the avatar fallback
    await supabase.auth.updateUser({ data: { full_name: fullName.trim() } });
    setSavedAt(new Date());
    router.refresh();
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        startTransition(save);
      }}
      className="app-settings-form"
    >
      <label>
        <span>Full name</span>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          autoComplete="name"
        />
      </label>
      <label>
        <span>Email</span>
        <input type="email" value={email} disabled aria-disabled />
        <span className="app-settings-hint">Email is set by your sign-in method and can&apos;t be changed here.</span>
      </label>
      {error && <p className="dl-error-inline">{error}</p>}
      <div className="app-settings-actions">
        <button type="submit" className="btn btn-dark" disabled={isPending}>
          {isPending ? "Saving..." : "Save changes"}
        </button>
        {savedAt && (
          <span className="dl-saved-at">Saved at {savedAt.toLocaleTimeString()}</span>
        )}
      </div>
    </form>
  );
}

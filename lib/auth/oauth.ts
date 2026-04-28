// Client-side OAuth helpers.
// Used by /login and /signup pages.

import { createClient } from "../supabase/client";

export async function signInWithGoogle(next?: string): Promise<void> {
  const supabase = createClient();
  const callback = `${window.location.origin}/auth/callback${next ? `?next=${encodeURIComponent(next)}` : ""}`;
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: callback,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });
  if (error) throw error;
}

export async function sendMagicLink(email: string, next?: string): Promise<void> {
  const supabase = createClient();
  const callback = `${window.location.origin}/auth/callback${next ? `?next=${encodeURIComponent(next)}` : ""}`;
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: callback },
  });
  if (error) throw error;
}

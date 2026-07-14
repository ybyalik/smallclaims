// Turn raw Supabase auth errors (and the error codes our own redirects use)
// into short, friendly messages. Customer-facing screens must never show the
// raw technical string, so anything unrecognized falls back to a generic line.

export function friendlyAuthError(raw: string | null | undefined): string {
  if (!raw) return "Something went wrong. Please try again.";
  const s = raw.toLowerCase();

  // Codes emitted by our own auth callback redirect.
  if (s === "signin_link_invalid") {
    return "That sign-in link didn't work. It may have expired or been opened on a different device than you requested it from. Please request a new one.";
  }
  if (s === "missing_code") {
    return "That sign-in link was incomplete. Please request a new one.";
  }

  // Common Supabase auth messages.
  if (s.includes("invalid login credentials")) {
    return "That email or password doesn't match. Please try again.";
  }
  if (s.includes("email not confirmed")) {
    return "Please confirm your email first — check your inbox for the confirmation link.";
  }
  if (s.includes("already registered") || s.includes("already been registered")) {
    return "An account with this email already exists. Try signing in instead.";
  }
  if (s.includes("password should be at least") || s.includes("password is too short")) {
    return "Please choose a longer password (at least 6 characters).";
  }
  if (s.includes("rate limit") || s.includes("too many")) {
    return "Too many attempts. Please wait a minute and try again.";
  }
  if (s.includes("network") || s.includes("failed to fetch")) {
    return "We couldn't reach the server. Check your connection and try again.";
  }

  // Never surface the raw string.
  return "Something went wrong. Please try again, or contact support if it keeps happening.";
}

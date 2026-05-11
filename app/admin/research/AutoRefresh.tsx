"use client";

// Auto-refreshes the parent server component. Used on the state research
// index + detail pages so admins see status updates without having to
// manually reload.
//
// Two behaviors:
//   1. On mount, always call router.refresh() once. This defeats the
//      Next.js Router Cache — without this, navigating to /admin/research
//      via <Link> (or the back button) shows the previously-cached snapshot
//      of the page instead of fresh DB data, because force-dynamic only
//      affects server rendering, not the client-side router cache.
//   2. While `enabled` is true, also poll on an interval. This catches
//      status changes that happen while you're sitting on the page (e.g.,
//      the cron flips a call from running → done in the DB).
//
// router.refresh() re-runs the server component (which re-reads the DB).
// It does NOT poll OpenAI directly — that stays on the cron's schedule.

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface Props {
  enabled: boolean;
  intervalMs?: number;
}

export default function AutoRefresh({ enabled, intervalMs = 5000 }: Props) {
  const router = useRouter();

  // Always refresh once on mount to bypass the router cache.
  useEffect(() => {
    router.refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Then poll on interval while there's work to track.
  useEffect(() => {
    if (!enabled) return;
    const id = setInterval(() => router.refresh(), intervalMs);
    return () => clearInterval(id);
  }, [enabled, intervalMs, router]);

  return null;
}

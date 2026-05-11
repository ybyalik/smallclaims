"use client";

// Auto-refreshes the parent server component on an interval. Used on the
// state research index + detail pages so admins see status updates without
// having to manually reload. Refreshing re-runs the server component, which
// re-reads the state_research table — it does NOT poll OpenAI (that's the
// cron's job). Net effect: status changes propagate from DB to UI within the
// chosen interval.

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface Props {
  enabled: boolean;
  intervalMs?: number;
}

export default function AutoRefresh({ enabled, intervalMs = 5000 }: Props) {
  const router = useRouter();
  useEffect(() => {
    if (!enabled) return;
    const id = setInterval(() => router.refresh(), intervalMs);
    return () => clearInterval(id);
  }, [enabled, intervalMs, router]);
  return null;
}

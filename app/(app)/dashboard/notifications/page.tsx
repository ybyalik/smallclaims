// /dashboard/notifications
//
// Shows the user's recent notifications (newest first) and marks the unread
// ones as read on first render. The sidebar bell badge clears once the user
// visits this page.

import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "../../../../lib/supabase/server";
import { listNotifications, markNotificationsRead } from "../../../../lib/notifications";
import PageHead from "../../../../components/layout/PageHead";
import EmptyState from "../../../../components/ui/EmptyState";

export const metadata: Metadata = { title: "Notifications" };
export const dynamic = "force-dynamic";

function formatWhen(s: string): string {
  return new Date(s).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default async function NotificationsPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createClient() as any;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { notifications } = await listNotifications(user.id, 100);

  // Mark everything we just showed as read. Idempotent — already-read rows
  // are skipped at the DB layer.
  if (notifications.length > 0) {
    await markNotificationsRead(
      user.id,
      notifications.filter((n) => !n.read_at).map((n) => n.id),
    );
  }

  return (
    <div>
      <PageHead title="Notifications" sub="Activity on your cases. Newest first." />
      {notifications.length === 0 ? (
        <EmptyState
          title="Nothing new"
          body="When there's an update on one of your cases — a letter ready for review, a delivery confirmation — it'll show up here."
        />
      ) : (
        <ul className="app-notif-list">
          {notifications.map((n) => {
            const Wrap = ({ children }: { children: React.ReactNode }) =>
              n.link ? (
                <Link href={n.link} className="app-notif-row">
                  {children}
                </Link>
              ) : (
                <div className="app-notif-row">{children}</div>
              );
            return (
              <li key={n.id}>
                <Wrap>
                  <div className="app-notif-body">
                    <div className="app-notif-title">{n.title}</div>
                    {n.body ? <p className="app-notif-text">{n.body}</p> : null}
                  </div>
                  <div className="app-notif-when">{formatWhen(n.created_at)}</div>
                </Wrap>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

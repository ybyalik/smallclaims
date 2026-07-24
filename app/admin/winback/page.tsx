import PageHead from "../../../components/layout/PageHead";
import { createServiceRoleClient } from "../../../lib/supabase/service-role";
import {
  DEFAULT_WINBACK_TEMPLATES,
  type WinbackTemplate,
} from "../../../lib/winback/templates";
import WinbackPanel from "./WinbackPanel";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Winback emails · Admin",
};

export interface WinbackSendRow {
  step: number;
  email: string;
  sent_at: string;
  case_id: string;
  defendant_name: string | null;
}

export default async function AdminWinbackPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;

  // Saved rows override the code defaults per step. A query error here almost
  // always means the migration hasn't been applied — surface that plainly
  // instead of rendering a silently-empty page (see the /admin/cases lesson).
  let migrationMissing = false;
  const byStep = new Map<number, WinbackTemplate>();
  const { data: rows, error } = await admin
    .from("winback_templates")
    .select("step, delay_days, subject, body_html, enabled");
  if (error) {
    migrationMissing = true;
  } else {
    for (const r of (rows ?? []) as WinbackTemplate[]) byStep.set(r.step, r);
  }

  const templates: Array<WinbackTemplate & { saved: boolean }> =
    DEFAULT_WINBACK_TEMPLATES.map((d) => {
      const saved = byStep.get(d.step);
      return saved ? { ...saved, saved: true } : { ...d, saved: false };
    });

  let sends: WinbackSendRow[] = [];
  if (!migrationMissing) {
    const { data: sendRows } = await admin
      .from("winback_sends")
      .select("step, email, sent_at, case_id, case:cases(defendant_name)")
      .order("sent_at", { ascending: false })
      .limit(50);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sends = ((sendRows ?? []) as any[]).map((r) => ({
      step: r.step,
      email: r.email,
      sent_at: r.sent_at,
      case_id: r.case_id,
      defendant_name: r.case?.defendant_name ?? null,
    }));
  }

  return (
    <div className="admin-page">
      <PageHead
        variant="admin"
        title="Winback emails"
        sub="Automatic reminders for people who started a case but never paid"
      />
      <WinbackPanel
        templates={templates}
        sends={sends}
        migrationMissing={migrationMissing}
      />
    </div>
  );
}

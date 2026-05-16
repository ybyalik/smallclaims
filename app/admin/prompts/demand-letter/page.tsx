import Link from "next/link";
import { createServiceRoleClient } from "../../../../lib/supabase/service-role";
import {
  loadActivePrompt,
  DEMAND_LETTER_PLACEHOLDERS,
  COVER_LETTER_PLACEHOLDERS,
} from "../../../../lib/prompts";
import {
  FALLBACK_SYSTEM_PROMPT,
  FALLBACK_USER_TEMPLATE,
  FALLBACK_COVER_LETTER_TEMPLATE,
} from "../../../../lib/demand-letter/generate";
import PromptEditor from "./PromptEditor";

export const metadata = { title: "Demand Letter Prompt · Admin" };
export const dynamic = "force-dynamic";

export default async function DemandLetterPromptPage() {
  // When no DB version exists yet, seed the editor with the real in-code
  // constants so the admin can edit them as a starting point. Saving will
  // create the first DB version.
  const [system, userTpl, coverLetter] = await Promise.all([
    loadActivePrompt("demand_letter", "system", {
      fallback: FALLBACK_SYSTEM_PROMPT,
    }),
    loadActivePrompt("demand_letter", "user_template", {
      fallback: FALLBACK_USER_TEMPLATE,
    }),
    loadActivePrompt("demand_letter", "cover_letter", {
      fallback: FALLBACK_COVER_LETTER_TEMPLATE,
    }),
  ]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;
  const { data: history } = await admin
    .from("prompt_templates")
    .select("id, role, version, is_active, notes, created_at")
    .eq("key", "demand_letter")
    .order("created_at", { ascending: false })
    .limit(20);

  return (
    <div>
      <p className="admin-page-eyebrow">
        <Link href="/admin/prompts">← All prompts</Link>
      </p>
      <h1>Demand Letter Prompt</h1>
      <p className="admin-page-sub">
        Edit the system prompt and the user-prompt template. Saving creates
        a new version; the new version becomes active immediately.
      </p>

      <PromptEditor
        promptKey="demand_letter"
        systemBody={system.body}
        systemSource={system.source}
        systemVersion={system.version}
        systemFallback={FALLBACK_SYSTEM_PROMPT}
        userBody={userTpl.body}
        userSource={userTpl.source}
        userVersion={userTpl.version}
        userFallback={FALLBACK_USER_TEMPLATE}
        coverBody={coverLetter.body}
        coverSource={coverLetter.source}
        coverVersion={coverLetter.version}
        coverFallback={FALLBACK_COVER_LETTER_TEMPLATE}
        placeholders={DEMAND_LETTER_PLACEHOLDERS}
        coverPlaceholders={COVER_LETTER_PLACEHOLDERS}
      />

      <section className="admin-prompt-history">
        <h2>Version History</h2>
        {history && history.length > 0 ? (
          <table className="admin-prompt-history-table">
            <thead>
              <tr>
                <th>When</th>
                <th>Role</th>
                <th>Version</th>
                <th>Active</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {(history as Array<{
                id: string;
                role: string;
                version: number;
                is_active: boolean;
                notes: string | null;
                created_at: string;
              }>).map((h) => (
                <tr key={h.id}>
                  <td>{new Date(h.created_at).toLocaleString()}</td>
                  <td>{h.role}</td>
                  <td>v{h.version}</td>
                  <td>{h.is_active ? "✓" : ""}</td>
                  <td>{h.notes || ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="admin-page-sub">
            No versions yet. The generator is using the in-code fallback. Save
            once to start tracking changes.
          </p>
        )}
      </section>
    </div>
  );
}

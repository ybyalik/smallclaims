// State-level deep research index. One row per US state with status pills for
// each of the four calls. The actual research is submitted to OpenAI in
// background mode from the detail page; this page is the dashboard.

import { STATES } from "../../../lib/states";
import { createServiceRoleClient } from "../../../lib/supabase/service-role";
import {
  getDefaultPromptTemplate,
  CALL_TITLES,
  type StateCallId,
} from "../../../lib/state-research/prompts";
import AutoRefresh from "./AutoRefresh";
import StateTable from "./StateTable";
import PromptEditor from "./PromptEditor";
import PageHead from "../../../components/layout/PageHead";

export const dynamic = "force-dynamic";

interface StateRow {
  slug: string;
  state_name: string;
  call_1_status: string | null;
  call_2_status: string | null;
  call_3_status: string | null;
  call_4_status: string | null;
  call_1_completed_at: string | null;
  call_2_completed_at: string | null;
  call_3_completed_at: string | null;
  call_4_completed_at: string | null;
  call_1_cost_cents: number | null;
  call_2_cost_cents: number | null;
  call_3_cost_cents: number | null;
  call_4_cost_cents: number | null;
  structured_pack_extracted_at: string | null;
  structured_pack_cost_cents: number | null;
  updated_at: string;
}

async function loadRows(): Promise<Map<string, StateRow>> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const admin = createServiceRoleClient() as any;
    // The state_research table now holds big JSON blobs (markdown research
    // outputs, structured packs) that can total ~21 MB across all states.
    // The index page only renders status pills + timestamps + costs, so we
    // select just those columns. This drops the response well under the
    // Next.js fetch-cache 2 MB threshold and removes the cache warning.
    const { data } = await admin
      .from("state_research")
      .select(
        "slug, state_name, call_1_status, call_2_status, call_3_status, call_4_status, call_1_completed_at, call_2_completed_at, call_3_completed_at, call_4_completed_at, call_1_cost_cents, call_2_cost_cents, call_3_cost_cents, call_4_cost_cents, structured_pack_extracted_at, structured_pack_cost_cents, updated_at",
      );
    const map = new Map<string, StateRow>();
    for (const r of (data ?? []) as StateRow[]) map.set(r.slug, r);
    return map;
  } catch {
    return new Map();
  }
}

interface PromptOverride {
  call_id: StateCallId;
  prompt_text: string;
  updated_at: string;
}

async function loadPromptOverrides(): Promise<Map<StateCallId, PromptOverride>> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const admin = createServiceRoleClient() as any;
    const { data } = await admin
      .from("state_research_prompts")
      .select("call_id, prompt_text, updated_at");
    const map = new Map<StateCallId, PromptOverride>();
    for (const r of (data ?? []) as PromptOverride[]) map.set(r.call_id, r);
    return map;
  } catch {
    return new Map();
  }
}

export default async function StateResearchIndex() {
  const rows = await loadRows();
  const promptOverrides = await loadPromptOverrides();

  let totalDone = 0;
  let totalRunning = 0;
  let totalFailed = 0;
  let totalCostCents = 0;
  let totalExtracted = 0;
  let totalExtractedCostCents = 0;
  for (const r of rows.values()) {
    if (r.structured_pack_extracted_at) {
      totalExtracted += 1;
      totalExtractedCostCents += r.structured_pack_cost_cents ?? 0;
    }
    const statuses = [r.call_1_status, r.call_2_status, r.call_3_status, r.call_4_status];
    for (const s of statuses) {
      if (s === "done") totalDone += 1;
      else if (s === "running") totalRunning += 1;
      else if (s === "failed") totalFailed += 1;
    }
    totalCostCents +=
      (r.call_1_cost_cents ?? 0) +
      (r.call_2_cost_cents ?? 0) +
      (r.call_3_cost_cents ?? 0) +
      (r.call_4_cost_cents ?? 0);
  }

  const anyRunning = Array.from(rows.values()).some(
    (r) =>
      r.call_1_status === "running" ||
      r.call_2_status === "running" ||
      r.call_3_status === "running" ||
      r.call_4_status === "running",
  );

  return (
    <div className="admin-page">
      <AutoRefresh enabled={anyRunning} />
      <PageHead
        variant="admin"
        title="State research"
        sub="Deep-research baseline for each US state. Four calls per state, each focused on a different topic cluster. Each call runs in OpenAI background mode (~10-30 min)."
        actions={
          <div style={{ fontSize: 13, color: "var(--muted)", textAlign: "right" }}>
            <div>{totalDone} calls done · {totalRunning} running · {totalFailed} failed</div>
            <div>Research spend: ${(totalCostCents / 100).toFixed(2)}</div>
            <div>
              {totalExtracted} of {STATES.length} states extracted · $
              {(totalExtractedCostCents / 100).toFixed(2)}
            </div>
          </div>
        }
      />

      <StateTable
        states={STATES.map((s) => ({ slug: s.slug, name: s.name }))}
        rows={Object.fromEntries(
          Array.from(rows.entries()).map(([slug, r]) => [
            slug,
            {
              call_1_status: r.call_1_status,
              call_2_status: r.call_2_status,
              call_3_status: r.call_3_status,
              call_4_status: r.call_4_status,
              updated_at: r.updated_at,
              structured_pack_extracted_at: r.structured_pack_extracted_at,
            },
          ]),
        )}
      />

      <section style={{ marginTop: 48 }}>
        <header style={{ marginBottom: 12 }}>
          <h2 style={{ margin: 0 }}>Prompts</h2>
          <p style={{ fontSize: 13, color: "var(--muted)", margin: "4px 0 0" }}>
            The four deep-research prompts. Click <strong>Edit</strong> on any
            call to save an override that the runner uses on the next submission.
            Use <strong>Reset to default</strong> to delete the override and fall
            back to the version in <code>lib/state-research/prompts.ts</code>.
            <code>[STATE NAME]</code> is the literal placeholder replaced with
            the state at submit time.
          </p>
        </header>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {([1, 2, 3, 4] as StateCallId[]).map((c) => {
            const defaultText = getDefaultPromptTemplate(c);
            const override = promptOverrides.get(c);
            const effective = override?.prompt_text ?? defaultText;
            return (
              <PromptEditor
                key={c}
                call={c}
                title={CALL_TITLES[c]}
                effective={effective}
                defaultText={defaultText}
                isOverride={!!override}
                overrideUpdatedAt={override?.updated_at ?? null}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}

// Customer report finalize pipeline (Inngest path).
//
// NOTE: in this project's prod env, INNGEST_EVENT_KEY is empty, so
// `inngest.send("case/research.ready")` from the deep-research completion
// handler silently no-ops. The primary trigger is now the OpenAI webhook
// route calling finalizeCustomerReport() directly via unstable_after, and
// the admin "Regenerate" route doing the same synchronously. This Inngest
// function remains as a redundant trigger if/when the keys get set.

import { createServiceRoleClient } from "../../supabase/service-role";
import { inngest } from "../client";
import { finalizeCustomerReport } from "../../case-research/finalize-customer-report";

export const customerReportFinalize = inngest.createFunction(
  {
    id: "customer-report-finalize",
    name: "Customer report finalize (merge + write)",
    retries: 3,
    concurrency: { limit: 5 },
    triggers: [{ event: "case/research.ready" }],
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async ({ event, step }: { event: any; step: any }) => {
    const { caseId, jobId } = event.data as { caseId: string; jobId: string };
    return step.run("finalize", async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const admin = createServiceRoleClient() as any;
      return finalizeCustomerReport(admin, caseId, jobId);
    });
  },
);

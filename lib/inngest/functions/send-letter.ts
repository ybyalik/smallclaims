import { inngest } from "../client";
import { mailDemandLetter } from "../../mail/send-demand-letter";

// Triggered when the case transitions to demand_paid. Renders the PDF and
// posts it to PostGrid for certified-mail dispatch. Idempotent — the
// orchestrator skips if mail_vendor_letter_id is already set.

export const sendDemandLetter = inngest.createFunction(
  {
    id: "send-demand-letter",
    name: "Mail demand letter via PostGrid",
    retries: 3,
    triggers: [{ event: "case/letter.send" }],
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async ({ event, step }: { event: any; step: any }) => {
    const { caseId } = event.data as { caseId: string };

    return step.run("mail-via-postgrid", async () => {
      const result = await mailDemandLetter(caseId);
      if (!result.ok && result.reason !== "no_postgrid_config") {
        // Reasons like no_address or letter_too_short are real errors —
        // surface them so retries don't silently mask the problem.
        throw new Error(`mailDemandLetter failed: ${result.reason ?? "unknown"}`);
      }
      return result;
    });
  },
);

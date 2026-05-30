import { inngest } from "../client";
import { mailDemandLetter } from "../../mail/send-demand-letter";
import { notifyAdminOfResearchFailure } from "../../case-research/notify-admin-failure";

// Triggered when the case transitions to demand_paid. Renders the PDF and
// posts it to PostGrid for certified-mail dispatch. Idempotent — the
// orchestrator skips if mail_vendor_letter_id is already set.

export const sendDemandLetter = inngest.createFunction(
  {
    id: "send-demand-letter",
    name: "Mail demand letter via PostGrid",
    retries: 3,
    triggers: [{ event: "case/letter.send" }],
    // Fires once after all retries are exhausted. A paid letter that never
    // mails must never fail silently — alert the team so they can fix the
    // underlying issue (bad address, PostGrid outage) and re-send.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onFailure: async ({ event, error }: { event: any; error: unknown }) => {
      const caseId = event?.data?.event?.data?.caseId as string | undefined;
      if (!caseId) return;
      await notifyAdminOfResearchFailure({
        caseId,
        stage: "mail_demand_letter",
        error,
        product: "Demand Letter mailing",
      });
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async ({ event, step }: { event: any; step: any }) => {
    const { caseId } = event.data as { caseId: string };

    return step.run("mail-via-postgrid", async () => {
      const result = await mailDemandLetter(caseId);
      if (!result.ok && result.reason === "no_postgrid_config") {
        // Certified mail isn't configured. We don't throw (retrying won't help
        // a missing config), but in production this means a paid letter is not
        // going out — alert the team so they can wire PostGrid and re-send.
        await notifyAdminOfResearchFailure({
          caseId,
          stage: "mail_demand_letter:no_postgrid_config",
          error: new Error("PostGrid is not configured; demand letter was not mailed."),
          product: "Demand Letter mailing",
        });
        return result;
      }
      if (!result.ok) {
        // Reasons like no_address or letter_too_short are real errors —
        // surface them so retries don't silently mask the problem. After
        // retries are exhausted, onFailure above alerts the team.
        throw new Error(`mailDemandLetter failed: ${result.reason ?? "unknown"}`);
      }
      return result;
    });
  },
);

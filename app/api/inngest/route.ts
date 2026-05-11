import { serve } from "inngest/next";
import { inngest } from "../../../lib/inngest/client";
import { caseResearchRun } from "../../../lib/inngest/functions/case-research";
import { sendDemandLetter } from "../../../lib/inngest/functions/send-letter";

export const runtime = "nodejs";
export const maxDuration = 300;

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [caseResearchRun, sendDemandLetter],
});

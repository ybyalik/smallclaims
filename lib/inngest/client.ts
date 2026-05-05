import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "smallclaims",
});

export interface CaseIntakePaidEvent {
  name: "case/intake.paid";
  id?: string;
  data: {
    caseId: string;
    jobId: string;
    version: number;
  };
}

export interface CaseResearchReadyEvent {
  name: "case/research.ready";
  id?: string;
  data: {
    caseId: string;
    jobId: string;
  };
}

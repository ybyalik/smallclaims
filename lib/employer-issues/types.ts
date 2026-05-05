// Employer issues share the same data shape as landlord issues. The shared
// IssueTemplate component renders either category from this same schema; the
// only thing that differs between categories is the CategoryMeta passed
// alongside the issue (labels, URL prefix, signatory, etc.).

export type { LandlordIssue as EmployerIssue } from "../landlord-issues/types";

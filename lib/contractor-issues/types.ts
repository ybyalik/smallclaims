// Contractor issues share the same data shape as landlord and employer
// issues. The shared IssueTemplate component renders any category from this
// schema; only the CategoryMeta differs.

export type { LandlordIssue as ContractorIssue } from "../landlord-issues/types";

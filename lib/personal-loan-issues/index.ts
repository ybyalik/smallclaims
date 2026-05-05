import type { PersonalLoanIssue } from "./types";
import { someoneOwesMeMoney } from "./someone-owes-me-money";
import { friendNotPayingBack } from "./friend-not-paying-back";
import { familyMember } from "./family-member";
import { exOrAfterBreakup } from "./ex-or-after-breakup";
import { iou } from "./iou";
import { verbalAgreement } from "./verbal-agreement";
import { cashLoan } from "./cash-loan";
import { unpaidDebtNoContract } from "./unpaid-debt-no-contract";

export const PERSONAL_LOAN_ISSUES: readonly PersonalLoanIssue[] = [
  someoneOwesMeMoney,
  friendNotPayingBack,
  familyMember,
  exOrAfterBreakup,
  iou,
  verbalAgreement,
  cashLoan,
  unpaidDebtNoContract,
] as const;

export const PERSONAL_LOAN_ISSUES_BY_SLUG: Record<string, PersonalLoanIssue> = Object.fromEntries(
  PERSONAL_LOAN_ISSUES.map((i) => [i.slug, i])
);

export function getPersonalLoanIssue(slug: string): PersonalLoanIssue | null {
  return PERSONAL_LOAN_ISSUES_BY_SLUG[slug] ?? null;
}

export type { PersonalLoanIssue } from "./types";

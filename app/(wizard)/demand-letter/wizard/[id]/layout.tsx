import { redirect } from "next/navigation";
import { loadOwnedCase } from "../../../../../lib/demand-letter/access";
import WizardShell from "./WizardShell";
import "./wizard.css";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Demand letter",
  robots: { index: false, follow: false },
};

interface Props {
  children: React.ReactNode;
  params: { id: string };
}

export default async function WizardLayout({ children, params }: Props) {
  const caseRow = await loadOwnedCase(params.id);
  if (!caseRow) {
    // No access — most commonly the user signed out from a tab that was
    // mid-wizard. Send them home instead of a flat 404.
    redirect("/");
  }

  return <WizardShell caseRow={caseRow}>{children}</WizardShell>;
}

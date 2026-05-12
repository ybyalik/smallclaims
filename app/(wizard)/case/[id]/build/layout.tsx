import { redirect } from "next/navigation";
import { createClient } from "../../../../../lib/supabase/server";
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
  // Auth gate: case builder is sign-in-only. Anonymous-cookie drafts are
  // no longer supported as of the case-builder restructure.
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect(`/login?next=${encodeURIComponent(`/case/${params.id}/build`)}`);
  }

  const caseRow = await loadOwnedCase(params.id);
  if (!caseRow) {
    // Case doesn't exist or belongs to a different account.
    redirect("/dashboard");
  }

  return <WizardShell caseRow={caseRow}>{children}</WizardShell>;
}

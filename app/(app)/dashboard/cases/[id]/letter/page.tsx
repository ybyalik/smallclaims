import { redirect } from "next/navigation";

// Legacy URL. Canonical letter view lives at /case/[id]/letter.
export default function LegacyLetterRedirect({
  params,
}: {
  params: { id: string };
}) {
  redirect(`/case/${params.id}/letter`);
}

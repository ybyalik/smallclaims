import AppShell from "../../components/AppShell";

// Wizard route group. Renders the dashboard-style shell (sidebar + main)
// for both anonymous and authenticated users.

export const metadata = {
  robots: { index: false, follow: false },
};

export default function WizardRouteGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell requireAuth={false}>{children}</AppShell>;
}

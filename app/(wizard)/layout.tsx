import AppShell from "../../components/AppShell";

// Wizard route group. Wrapped in AppShell so the dashboard sidebar
// (with nav back to dashboard, cases, etc.) is present on both desktop
// and mobile. WizardShell uses AppShell's mobile top bar — no separate
// wizard-only header.

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

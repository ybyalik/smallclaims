// Wizard route group. The wizard is its own focused flow — it has its
// own top bar and progress row built into WizardShell, so we don't wrap
// in AppShell (which would add a duplicate mobile header + the
// dashboard sidebar drawer the user shouldn't see during intake).

export const metadata = {
  robots: { index: false, follow: false },
};

export default function WizardRouteGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

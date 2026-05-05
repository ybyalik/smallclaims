import AppShell from "../../components/AppShell";

export const metadata = {
  title: { default: "Dashboard", template: "%s · CivilCase" },
  robots: { index: false, follow: false },
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell requireAuth loginNext="/dashboard">
      {children}
    </AppShell>
  );
}

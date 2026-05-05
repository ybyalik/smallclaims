import { redirect } from "next/navigation";

// Dashboard root has no content of its own today — every active service
// (currently just Demand letter) has its own list page. Send the user to
// the primary service for now. When we add Small Claims and others, this
// can become an overview/home dashboard with cards per service.

export const metadata = {
  title: "Dashboard",
};

export default function DashboardHome() {
  redirect("/dashboard/demand-letters");
}

import type { Metadata } from "next";
import { BriefAdminDashboard } from "@/components/brief-admin-dashboard";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Client Brief Admin",
  description: "MDemx admin dashboard for viewing, updating, and managing submitted client website briefs.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function BriefAdminPage() {
  return (
    <>
      <PageHero
        eyebrow="Admin Dashboard"
        title="Review client website briefs and prepare proposals."
        text="View submitted requirements, update status, add internal notes, delete old submissions, and generate a proposal draft from the client's answers."
      />
      <BriefAdminDashboard />
    </>
  );
}

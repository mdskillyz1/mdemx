import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { LeadPage } from "@/components/lead-page";

export const metadata: Metadata = {
  title: "Quote Request",
  description:
    "Request a website, SEO, QR ordering, dashboard, automation, or digital system quote from MDemx in London.",
  alternates: { canonical: "/quote-request" },
};

export default function QuoteRequestPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Quote Request", href: "/quote-request" }]} />
      <LeadPage
        eyebrow="Quick quote"
        title="Request a clear quote for your website or digital system."
        text="Share your business, service needed, budget, timeline, and current website. MDemx will turn that into a practical next step."
        service="Quote Request"
        points={[
          "Website design and development",
          "Restaurant QR ordering systems",
          "SEO setup and local visibility",
          "Dashboards, reporting, and admin systems",
          "Business automation and AI-ready workflows",
        ]}
      />
    </>
  );
}

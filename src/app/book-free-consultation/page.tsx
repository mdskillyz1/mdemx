import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { LeadPage } from "@/components/lead-page";

export const metadata: Metadata = {
  title: "Book a Free Consultation",
  description:
    "Book a free MDemx consultation for web design, website development, SEO, QR ordering systems, dashboards, or business automation.",
  alternates: { canonical: "/book-free-consultation" },
};

export default function BookFreeConsultationPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Book a Free Consultation", href: "/book-free-consultation" }]} />
      <LeadPage
        eyebrow="Free consultation"
        title="Book a free consultation before you build your website."
        text="Use this short form to tell MDemx what you want to achieve. The goal is to understand your business and recommend the right website or system."
        service="Book a Free Consultation"
        points={[
          "What your business needs the website to achieve",
          "Which services, pages, and features matter most",
          "Whether you need SEO, booking, ordering, or dashboards",
          "Budget and timeline expectations",
          "The simplest route to launch",
        ]}
      />
    </>
  );
}

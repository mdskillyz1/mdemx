import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { LeadPage } from "@/components/lead-page";

export const metadata: Metadata = {
  title: "Free Website Audit",
  description:
    "Request a free MDemx website audit for design, mobile usability, SEO foundations, speed, conversion routes, and lead generation opportunities.",
  alternates: { canonical: "/free-website-audit" },
};

export default function FreeWebsiteAuditPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Free Website Audit", href: "/free-website-audit" }]} />
      <LeadPage
        eyebrow="Free audit"
        title="Find out what is stopping your website from winning more enquiries."
        text="Send MDemx your website and business goals. You will get a practical review of the areas that most affect trust, SEO, mobile experience, and conversions."
        service="Free Website Audit"
        points={[
          "Homepage clarity and first impression",
          "Mobile usability and customer journey",
          "Calls, forms, WhatsApp, and quote routes",
          "SEO metadata, headings, and local keywords",
          "Opportunities for better lead generation",
        ]}
      />
    </>
  );
}

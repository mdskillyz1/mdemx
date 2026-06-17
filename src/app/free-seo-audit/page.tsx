import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { LeadPage } from "@/components/lead-page";

export const metadata: Metadata = {
  title: "Free SEO Audit",
  description:
    "Request a free MDemx SEO audit covering local SEO, metadata, schema, sitemap, headings, internal links, and search visibility.",
  alternates: { canonical: "/free-seo-audit" },
};

export default function FreeSeoAuditPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Free SEO Audit", href: "/free-seo-audit" }]} />
      <LeadPage
        eyebrow="SEO audit"
        title="Check whether your website is clear enough for Google, Bing, and AI search."
        text="MDemx reviews the technical and content foundations that help customers and search engines understand your business."
        service="Free SEO Audit"
        points={[
          "Title tags, meta descriptions, and canonical URLs",
          "Heading structure and page clarity",
          "Local SEO keywords and location signals",
          "Schema markup, sitemap, and robots.txt",
          "Internal links between services, articles, and contact pages",
        ]}
      />
    </>
  );
}

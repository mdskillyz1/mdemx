import type { Metadata } from "next";
import { ClientBriefForm } from "@/components/client-brief-form";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Start Your Website Brief",
  description:
    "Submit a detailed MDemx client brief for one or multiple websites, including pages, features, design preferences, hosting, budget, and timeline.",
  alternates: { canonical: "/client-brief" },
  openGraph: {
    title: "Start Your Website Brief | MDemx",
    description:
      "Use the MDemx website brief form to plan web design, development, SEO, QR ordering systems, dashboards, hosting, and digital setup.",
    url: "/client-brief",
  },
  twitter: {
    card: "summary_large_image",
    title: "Start Your Website Brief | MDemx",
    description: "Submit detailed requirements for one or multiple websites with MDemx.",
  },
};

export default function ClientBriefPage() {
  return (
    <>
      <PageHero
        eyebrow="Start Your Website Brief"
        title="Tell MDemx exactly what your website needs to do."
        text="Use this step-by-step client brief to submit requirements for one or multiple websites, including pages, features, design, content, domain, hosting, budget, and launch timeline."
      />
      <ClientBriefForm />
    </>
  );
}

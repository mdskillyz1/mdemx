import type { Metadata } from "next";
import { CTASection } from "@/components/cta-section";
import { FAQAccordion } from "@/components/faq-accordion";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers about MDemx website costs, timelines, hosting, domains, QR ordering systems, redesigns, maintenance, mobile design, and SEO.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "MDemx FAQ | Web Design London",
    description:
      "Common questions about affordable website design London, restaurant website design, QR ordering systems, maintenance, and SEO.",
    url: "/faq",
  },
  twitter: {
    card: "summary_large_image",
    title: "MDemx FAQ | Web Design London",
    description: "Answers for small business website, SEO, hosting, maintenance, and QR ordering projects.",
  },
};

export default function FAQPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Clear answers before you start your website project."
        text="Here are the questions small business owners usually ask before starting a web design, QR ordering, SEO, or maintenance project with MDemx."
      />
      <section className="container-shell pb-16 md:pb-24">
        <FAQAccordion />
      </section>
      <CTASection title="Still deciding what your business needs?" />
    </>
  );
}

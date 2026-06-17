import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CTASection } from "@/components/cta-section";
import { InteractiveServices } from "@/components/interactive-services";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { localServicePages } from "@/lib/seo-content";
import { processSteps } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web design, QR ordering systems, business websites, dashboards, SEO, hosting support, branding, and website maintenance from MDemx in London.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "MDemx Services | Web Design London",
    description:
      "Explore MDemx services for small business websites London, QR ordering systems, SEO setup, hosting support, and digital systems.",
    url: "/services",
  },
  twitter: {
    card: "summary_large_image",
    title: "MDemx Services | Web Design London",
    description:
      "Premium web design, QR ordering systems, SEO, hosting support, and digital setup for local businesses.",
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Choose the service your business needs, then build your ideal website journey."
        text="Explore each MDemx service, click into the details, try the quick website builder, and move straight into a quote or WhatsApp conversation."
      />
      <InteractiveServices />
      <section className="container-shell py-16 md:py-24">
        <SectionHeading
          eyebrow="Local SEO pages"
          title="Dedicated service pages for London businesses."
          text="Explore MDemx services in more detail, with clear benefits, process, FAQs, and enquiry routes for each area."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {localServicePages.map((page) => (
            <Link
              key={page.slug}
              href={`/services/${page.slug}`}
              className="group rounded-3xl border border-[var(--line)] bg-white/[0.045] p-6 transition hover:border-[var(--mint)]"
            >
              <h2 className="text-xl font-semibold text-white">{page.title}</h2>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{page.description}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--mint)]">
                View service <ArrowRight size={15} className="transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="container-shell py-16 md:py-24">
        <SectionHeading
          eyebrow="Automated journey"
          title="From first message to finished launch, the next step is always clear."
          text="Each project starts with a simple enquiry, then moves into discovery, design, build, launch, and support."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {processSteps.map((step) => {
            const Icon = step.icon;
            return (
              <article key={step.title} className="rounded-3xl border border-[var(--line)] bg-white/[0.045] p-5">
                <Icon size={24} className="text-[var(--mint)]" />
                <h2 className="mt-5 text-lg font-semibold text-white">{step.title}</h2>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{step.text}</p>
              </article>
            );
          })}
        </div>
      </section>
      <CTASection title="Need one service or a complete digital setup?" />
    </>
  );
}

import type { Metadata } from "next";
import { CTASection } from "@/components/cta-section";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about MDemx, a London-based digital studio founded by Muhammed Dem for practical websites, digital systems, and online presence.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About MDemx | London Digital Studio",
    description:
      "MDemx helps small businesses build professional websites, digital systems, and online presence that work in practice.",
    url: "/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "About MDemx | London Digital Studio",
    description: "London-based web design and digital systems for small businesses.",
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About MDemx"
        title="A London digital studio for practical websites that actually work."
        text="MDemx is a London-based digital studio founded by Muhammed Dem, helping small businesses build professional websites, digital systems, and online presence."
      />
      <section className="container-shell pb-16 md:pb-24">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="glass-panel rounded-3xl p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--mint)]">
              Founder-led
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-white">Muhammed Dem</h2>
            <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
              MDemx combines design, development, systems thinking, and local business awareness to create websites that look premium and help owners move faster.
            </p>
          </div>
          <div className="space-y-6 text-base leading-8 text-[var(--muted)]">
            <p>
              The goal is not to build a website that simply sits online. MDemx focuses on practical websites that support the business: clear service pages, trusted design, quote forms, ordering journeys, SEO foundations, and admin-friendly systems.
            </p>
            <p>
              For restaurants, trades, community organisations, and local service businesses, the website is often the first serious impression. MDemx helps turn that impression into action with thoughtful design, fast development, and simple contact routes.
            </p>
            <p>
              The studio is built for small business owners who want a professional digital setup without unnecessary complexity. You get a clear process, modern technology, and a site that is easy to keep improving.
            </p>
          </div>
        </div>
      </section>
      <section className="container-shell py-16 md:py-24">
        <SectionHeading
          eyebrow="Approach"
          title="Premium design, clean development, and useful business systems."
          text="MDemx blends brand credibility with practical tools: forms, QR ordering, dashboards, SEO, hosting guidance, and support."
        />
      </section>
      <CTASection title="Tell MDemx what your business needs online." />
    </>
  );
}

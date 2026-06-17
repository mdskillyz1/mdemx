import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import { caseStudies } from "@/lib/seo-content";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "MDemx case studies for restaurant websites, QR ordering systems, business websites, lead generation, SEO setup, and digital systems.",
  alternates: { canonical: "/case-studies" },
  openGraph: {
    title: "MDemx Case Studies",
    description: "Detailed MDemx case studies for websites, QR ordering, SEO, lead generation, and business systems.",
    url: "/case-studies",
  },
  twitter: {
    card: "summary_large_image",
    title: "MDemx Case Studies",
    description: "Detailed MDemx case studies for websites, QR ordering, SEO, lead generation, and business systems.",
  },
};

export default function CaseStudiesPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Case Studies", href: "/case-studies" }]} />
      <PageHero
        eyebrow="Case studies"
        title="Real project stories for websites, QR ordering, SEO, and lead generation."
        text="Explore how MDemx thinks through business challenges, digital solutions, and practical results for small business websites and systems."
      />
      <section className="container-shell pb-16 md:pb-24">
        <div className="grid gap-5 md:grid-cols-2">
          {caseStudies.map((study) => (
            <Link
              key={study.slug}
              href={`/case-studies/${study.slug}`}
              className="group rounded-3xl border border-[var(--line)] bg-white/[0.045] p-6 transition hover:border-[var(--mint)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--mint)]">{study.category}</p>
              <h2 className="mt-4 text-2xl font-semibold text-white">{study.client}</h2>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{study.description}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--mint)]">
                View case study <ArrowRight size={15} className="transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

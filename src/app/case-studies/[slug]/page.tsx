import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CTASection } from "@/components/cta-section";
import { RelatedServices } from "@/components/related-links";
import { canonical, caseStudies } from "@/lib/seo-content";
import { site } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);

  if (!study) {
    return {};
  }

  return {
    title: study.title,
    description: study.description,
    alternates: { canonical: `/case-studies/${study.slug}` },
    openGraph: {
      title: study.title,
      description: study.description,
      url: `/case-studies/${study.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: study.title,
      description: study.description,
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);

  if (!study) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.title,
    description: study.description,
    author: { "@type": "Person", name: "Muhammed Dem" },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    mainEntityOfPage: canonical(`/case-studies/${study.slug}`),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Breadcrumbs items={[{ label: "Case Studies", href: "/case-studies" }, { label: study.client, href: `/case-studies/${study.slug}` }]} />
      <article className="container-shell py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_0.65fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--mint)]">{study.category}</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">{study.title}</h1>
            <p className="mt-6 text-lg leading-8 text-[var(--muted)]">{study.description}</p>
          </div>
          <aside className="rounded-[2rem] border border-[var(--line)] bg-white/[0.045] p-6">
            <h2 className="text-xl font-semibold text-white">Technologies used</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {study.technologies.map((tech) => (
                <span key={tech} className="rounded-full border border-[var(--line)] px-3 py-1 text-xs text-[var(--muted)]">
                  {tech}
                </span>
              ))}
            </div>
            <Link
              href="/contact?service=Book%20a%20Free%20Consultation"
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--mint)] px-5 text-sm font-semibold text-[#07110c] transition hover:bg-white"
            >
              Build something similar <ArrowRight size={16} />
            </Link>
          </aside>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <section className="rounded-[2rem] border border-[var(--line)] bg-white/[0.045] p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-white">Challenge</h2>
            <p className="mt-4 text-base leading-8 text-[var(--muted)]">{study.challenge}</p>
          </section>
          <section className="rounded-[2rem] border border-[var(--line)] bg-white/[0.045] p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-white">Solution</h2>
            <p className="mt-4 text-base leading-8 text-[var(--muted)]">{study.solution}</p>
          </section>
        </div>
        <section className="mt-6 rounded-[2rem] border border-[var(--line)] bg-white/[0.045] p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-white">Results</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {study.results.map((result) => (
              <div key={result} className="flex gap-3 rounded-2xl border border-[var(--line)] bg-white/[0.035] p-4">
                <CheckCircle2 size={19} className="mt-0.5 shrink-0 text-[var(--mint)]" />
                <h3 className="text-sm font-semibold text-white">{result}</h3>
              </div>
            ))}
          </div>
        </section>
      </article>
      <RelatedServices slugs={study.relatedServiceSlugs} />
      <CTASection title={`Want results like ${study.client}?`} />
    </>
  );
}

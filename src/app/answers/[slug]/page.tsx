import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CTASection } from "@/components/cta-section";
import { PageHero } from "@/components/page-hero";
import { answerPages, canonical } from "@/lib/seo-content";
import { site } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return answerPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = answerPages.find((item) => item.slug === slug);

  if (!page) {
    return {};
  }

  return {
    title: page.metaTitle,
    description: page.description,
    alternates: { canonical: `/answers/${page.slug}` },
    openGraph: {
      title: page.metaTitle,
      description: page.description,
      url: `/answers/${page.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.description,
    },
  };
}

export default async function AnswerPage({ params }: Props) {
  const { slug } = await params;
  const page = answerPages.find((item) => item.slug === slug);

  if (!page) {
    notFound();
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.title,
    description: page.description,
    author: { "@type": "Person", name: "Muhammed Dem" },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    mainEntityOfPage: canonical(`/answers/${page.slug}`),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Breadcrumbs items={[{ label: "Answers", href: "/answers" }, { label: page.title, href: `/answers/${page.slug}` }]} />
      <PageHero eyebrow="AI search answer" title={page.title} text={page.description} />
      <section className="container-shell pb-16 md:pb-24">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-[var(--line)] bg-white/[0.045] p-6 md:p-10">
          <h2 className="text-2xl font-semibold text-white">Short answer</h2>
          <p className="mt-4 text-lg leading-8 text-[var(--muted)]">{page.answer}</p>
          <div className="mt-10 grid gap-6">
            {page.sections.map((section) => (
              <article key={section.heading}>
                <h2 className="text-2xl font-semibold text-white">{section.heading}</h2>
                <p className="mt-3 text-base leading-7 text-[var(--muted)]">{section.body}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact?service=Book%20a%20Free%20Consultation"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--mint)] px-5 text-sm font-semibold text-[#07110c] transition hover:bg-white"
            >
              Book a free consultation <ArrowRight size={16} />
            </Link>
            <Link
              href="/client-brief"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--line)] px-5 text-sm font-semibold text-[var(--mint)] transition hover:border-[var(--mint)] hover:text-white"
            >
              Start website brief
            </Link>
          </div>
        </div>
      </section>
      <section className="container-shell py-16 md:py-24">
        <h2 className="text-3xl font-semibold text-white">Related questions</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {page.faqs.map((faq) => (
            <article key={faq.question} className="rounded-3xl border border-[var(--line)] bg-white/[0.045] p-5">
              <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>
      <CTASection title="Want MDemx to plan your website or digital system?" />
    </>
  );
}

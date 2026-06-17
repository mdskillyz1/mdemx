import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactForm } from "@/components/contact-form";
import { CTASection } from "@/components/cta-section";
import { PageHero } from "@/components/page-hero";
import { RelatedArticles } from "@/components/related-links";
import { canonical, localServicePages } from "@/lib/seo-content";
import { site } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return localServicePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = localServicePages.find((item) => item.slug === slug);

  if (!page) {
    return {};
  }

  return {
    title: page.metaTitle,
    description: page.description,
    keywords: page.keywords,
    alternates: { canonical: `/services/${page.slug}` },
    openGraph: {
      title: page.metaTitle,
      description: page.description,
      url: `/services/${page.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.description,
    },
  };
}

export default async function LocalServicePage({ params }: Props) {
  const { slug } = await params;
  const page = localServicePages.find((item) => item.slug === slug);

  if (!page) {
    notFound();
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `MDemx ${page.title}`,
    provider: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
      email: site.email,
      telephone: site.phone,
    },
    areaServed: ["London", "United Kingdom"],
    serviceType: page.title,
    description: page.description,
    url: canonical(`/services/${page.slug}`),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Breadcrumbs items={[{ label: "Services", href: "/services" }, { label: page.title, href: `/services/${page.slug}` }]} />
      <PageHero eyebrow="Local SEO service" title={page.hero} text={page.intro} />
      <section className="container-shell pb-16 md:pb-24">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.82fr]">
          <div className="rounded-[2rem] border border-[var(--line)] bg-white/[0.045] p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-white">Benefits for your business</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {page.benefits.map((benefit) => (
                <div key={benefit} className="rounded-2xl border border-[var(--line)] bg-white/[0.035] p-4">
                  <CheckCircle2 size={19} className="text-[var(--mint)]" />
                  <h3 className="mt-3 text-base font-semibold text-white">{benefit}</h3>
                </div>
              ))}
            </div>
            <h2 className="mt-10 text-2xl font-semibold text-white">How MDemx works</h2>
            <ol className="mt-6 grid gap-3">
              {page.process.map((step, index) => (
                <li key={step} className="flex gap-4 rounded-2xl border border-[var(--line)] bg-white/[0.035] p-4">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[var(--mint)] text-sm font-bold text-[#07110c]">
                    {index + 1}
                  </span>
                  <span className="self-center text-sm font-medium text-white">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <aside className="rounded-[2rem] border border-[var(--line)] bg-[rgba(167,243,194,0.08)] p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-white">Start with a free consultation</h2>
            <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
              Tell MDemx what you need and get a clear next step for {page.title.toLowerCase()}.
            </p>
            <div className="mt-6 grid gap-3">
              <Link
                href={`/contact?service=${encodeURIComponent(page.title)}`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--mint)] px-5 text-sm font-semibold text-[#07110c] transition hover:bg-white"
              >
                Request a quote <ArrowRight size={16} />
              </Link>
              <Link
                href="/client-brief"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--line)] px-5 text-sm font-semibold text-[var(--mint)] transition hover:border-[var(--mint)] hover:text-white"
              >
                Start website brief
              </Link>
            </div>
          </aside>
        </div>
      </section>
      <section className="container-shell py-16 md:py-24">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--mint)]">FAQs</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Questions about {page.title}</h2>
          </div>
          <div className="grid gap-4">
            {page.faqs.map((faq) => (
              <article key={faq.question} className="rounded-3xl border border-[var(--line)] bg-white/[0.045] p-5">
                <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <RelatedArticles slugs={page.relatedBlogSlugs} />
      <section className="container-shell py-16 md:py-24" id="service-contact">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--mint)]">Enquiry</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Ask MDemx about {page.title}</h2>
            <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
              Use this form for a free website audit, quote request, SEO audit, or consultation booking.
            </p>
          </div>
          <ContactForm selectedService={page.title} />
        </div>
      </section>
      <CTASection title={`Ready to improve your ${page.title} strategy?`} />
    </>
  );
}

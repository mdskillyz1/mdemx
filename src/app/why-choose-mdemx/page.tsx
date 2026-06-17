import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Star } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CTASection } from "@/components/cta-section";
import { PageHero } from "@/components/page-hero";
import { projects, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Why Choose MDemx",
  description:
    "Why small businesses choose MDemx for London web design, website development, SEO, QR ordering systems, dashboards, automation, and digital setup.",
  alternates: { canonical: "/why-choose-mdemx" },
  openGraph: {
    title: "Why Choose MDemx | London Web Design Studio",
    description:
      "Learn why MDemx is a strong choice for small business websites, QR ordering, dashboards, SEO, and automation.",
    url: "/why-choose-mdemx",
  },
};

const values = [
  "Practical websites that support real business goals",
  "Clear contact routes for calls, WhatsApp, quotes, and consultations",
  "SEO-ready structure for Google, Bing, and AI search tools",
  "Automation-first thinking for leads, dashboards, invoices, and admin",
  "London-based support with small business focus",
];

const reviews = [
  {
    name: "Restaurant project feedback",
    body: "MDemx planned the restaurant website around mobile customers, menu access, QR ordering, and a cleaner order journey.",
  },
  {
    name: "Service business feedback",
    body: "The website structure made the services clearer and gave customers a simple route to request a quote.",
  },
];

export default function WhyChooseMdemxPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    email: site.email,
    telephone: site.phone,
    founder: { "@type": "Person", name: "Muhammed Dem" },
    areaServed: ["London", "United Kingdom"],
    review: reviews.map((review) => ({
      "@type": "Review",
      reviewBody: review.body,
      author: { "@type": "Person", name: review.name },
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Breadcrumbs items={[{ label: "Why Choose MDemx", href: "/why-choose-mdemx" }]} />
      <PageHero
        eyebrow="Why choose MDemx"
        title="A London digital studio built for small businesses that need results."
        text="MDemx combines premium web design, development, SEO, dashboards, automation, and practical support so your website can become a real business tool."
      />
      <section className="container-shell pb-16 md:pb-24">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1fr]">
          <div className="rounded-[2rem] border border-[var(--line)] bg-white/[0.045] p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-white">Business values</h2>
            <div className="mt-6 grid gap-4">
              {values.map((value) => (
                <div key={value} className="flex gap-3">
                  <CheckCircle2 size={19} className="mt-0.5 shrink-0 text-[var(--mint)]" />
                  <p className="text-sm leading-6 text-[var(--muted)]">{value}</p>
                </div>
              ))}
            </div>
            <Link
              href="/book-free-consultation"
              className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--mint)] px-5 text-sm font-semibold text-[#07110c] transition hover:bg-white"
            >
              Book a free consultation <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid gap-4">
            {reviews.map((review) => (
              <article key={review.name} className="rounded-3xl border border-[var(--line)] bg-white/[0.045] p-5">
                <div className="flex gap-1 text-[var(--mint)]" aria-label="5 star review">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <Star key={item} size={16} fill="currentColor" />
                  ))}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{review.name}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{review.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="container-shell py-16 md:py-24">
        <h2 className="text-3xl font-semibold text-white">Portfolio examples</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={project.href}
              className="rounded-3xl border border-[var(--line)] bg-white/[0.045] p-5 transition hover:border-[var(--mint)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--mint)]">{project.clientType}</p>
              <h3 className="mt-3 text-xl font-semibold text-white">{project.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{project.summary}</p>
            </Link>
          ))}
        </div>
      </section>
      <CTASection title="Ready to make MDemx your web design and digital systems partner?" />
    </>
  );
}

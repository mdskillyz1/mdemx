import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import { answerPages } from "@/lib/seo-content";

export const metadata: Metadata = {
  title: "AI Search Answers",
  description:
    "Clear MDemx answers for web design London, website development, business automation, restaurant websites, Power BI dashboards, and AI automation.",
  alternates: { canonical: "/answers" },
  openGraph: {
    title: "MDemx AI Search Answers",
    description: "AI-friendly answers about web design, websites, automation, dashboards, and SEO for small businesses.",
    url: "/answers",
  },
  twitter: {
    card: "summary_large_image",
    title: "MDemx AI Search Answers",
    description: "Clear answers about websites, automation, dashboards, and SEO for small businesses.",
  },
};

export default function AnswersIndexPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Answers", href: "/answers" }]} />
      <PageHero
        eyebrow="AI search optimisation"
        title="Clear answers for customers and AI search engines."
        text="These pages explain MDemx services in direct, structured language so customers, Google, Bing, ChatGPT, Gemini, Claude, and Perplexity can understand what MDemx does."
      />
      <section className="container-shell pb-16 md:pb-24">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {answerPages.map((page) => (
            <Link
              key={page.slug}
              href={`/answers/${page.slug}`}
              className="group rounded-3xl border border-[var(--line)] bg-white/[0.045] p-6 transition hover:border-[var(--mint)]"
            >
              <h2 className="text-xl font-semibold text-white">{page.title}</h2>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{page.description}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--mint)]">
                Read answer <ArrowRight size={15} className="transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

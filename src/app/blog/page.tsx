import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import { blogPosts } from "@/lib/seo-content";

export const metadata: Metadata = {
  title: "Web Design, SEO and Automation Blog",
  description:
    "MDemx blog articles covering web design London, SEO, automation, Power BI dashboards, AI, restaurant technology, and small business growth.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "MDemx Blog | Web Design, SEO and Automation",
    description: "Guides for small businesses on websites, SEO, automation, dashboards, AI, and restaurant technology.",
    url: "/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "MDemx Blog | Web Design, SEO and Automation",
    description: "Guides for small businesses on websites, SEO, automation, dashboards, AI, and restaurant technology.",
  },
};

const categories = ["Web Design", "SEO", "Automation", "Power BI", "Business Growth", "AI", "Restaurant Technology"];

export default function BlogPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }]} />
      <PageHero
        eyebrow="SEO blog"
        title="Practical website, SEO, automation, and business growth guides."
        text="Helpful MDemx articles written for London small businesses that want clearer websites, better leads, smarter systems, and stronger local visibility."
      />
      <section className="container-shell pb-16 md:pb-24">
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <span key={category} className="rounded-full border border-[var(--line)] px-3 py-1 text-xs font-medium text-[var(--muted)]">
              {category}
            </span>
          ))}
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-3xl border border-[var(--line)] bg-white/[0.045] p-6 transition hover:border-[var(--mint)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--mint)]">{post.category}</p>
              <h2 className="mt-4 text-xl font-semibold text-white">{post.title}</h2>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{post.description}</p>
              <div className="mt-5 flex items-center justify-between gap-4 text-xs text-[var(--muted)]">
                <span>{post.readTime}</span>
                <span>{new Date(post.date).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}</span>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--mint)]">
                Read guide <ArrowRight size={15} className="transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CTASection } from "@/components/cta-section";
import { RelatedServices } from "@/components/related-links";
import { blogPosts, canonical } from "@/lib/seo-content";
import { site } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: ["Muhammed Dem"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    articleSection: post.category,
    keywords: post.keywords,
    author: { "@type": "Person", name: "Muhammed Dem", jobTitle: "Founder of MDemx" },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    mainEntityOfPage: canonical(`/blog/${post.slug}`),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: post.title, href: `/blog/${post.slug}` }]} />
      <article className="container-shell py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--mint)]">{post.category}</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">{post.title}</h1>
          <p className="mt-6 text-lg leading-8 text-[var(--muted)]">{post.description}</p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-[var(--muted)]">
            <span>{post.readTime}</span>
            <span>/</span>
            <time dateTime={post.date}>{new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</time>
          </div>
          <div className="mt-10 grid gap-8 rounded-[2rem] border border-[var(--line)] bg-white/[0.045] p-6 md:p-10">
            {post.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-semibold text-white">{section.heading}</h2>
                <p className="mt-3 text-base leading-8 text-[var(--muted)]">{section.body}</p>
              </section>
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/free-website-audit"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--mint)] px-5 text-sm font-semibold text-[#07110c] transition hover:bg-white"
            >
              Request a free website audit <ArrowRight size={16} />
            </Link>
            <Link
              href="/contact?service=Book%20a%20Free%20Consultation"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--line)] px-5 text-sm font-semibold text-[var(--mint)] transition hover:border-[var(--mint)] hover:text-white"
            >
              Book a free consultation
            </Link>
          </div>
        </div>
      </article>
      <RelatedServices slugs={post.relatedServiceSlugs} />
      <CTASection title="Want MDemx to turn this into a real growth plan?" />
    </>
  );
}

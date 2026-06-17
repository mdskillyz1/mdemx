import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blogPosts, localServicePages } from "@/lib/seo-content";

export function RelatedArticles({ slugs }: { slugs: string[] }) {
  const posts = blogPosts.filter((post) => slugs.includes(post.slug));

  if (!posts.length) {
    return null;
  }

  return (
    <section className="container-shell py-16">
      <h2 className="text-2xl font-semibold text-white">Related articles</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group rounded-3xl border border-[var(--line)] bg-white/[0.045] p-5 transition hover:border-[var(--mint)]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--mint)]">{post.category}</p>
            <h3 className="mt-3 text-lg font-semibold text-white">{post.title}</h3>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{post.description}</p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--mint)]">
              Read article <ArrowRight size={15} className="transition group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function RelatedServices({ slugs }: { slugs: string[] }) {
  const pages = localServicePages.filter((page) => slugs.includes(page.slug));

  if (!pages.length) {
    return null;
  }

  return (
    <section className="container-shell py-16">
      <h2 className="text-2xl font-semibold text-white">Related services</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {pages.map((page) => (
          <Link
            key={page.slug}
            href={`/services/${page.slug}`}
            className="group rounded-3xl border border-[var(--line)] bg-white/[0.045] p-5 transition hover:border-[var(--mint)]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--mint)]">MDemx service</p>
            <h3 className="mt-3 text-lg font-semibold text-white">{page.title}</h3>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{page.description}</p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--mint)]">
              View service <ArrowRight size={15} className="transition group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { canonical } from "@/lib/seo-content";

type Crumb = {
  label: string;
  href: string;
};

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const allItems = [{ label: "Home", href: "/" }, ...items];
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: canonical(item.href === "/" ? "" : item.href),
    })),
  };

  return (
    <nav className="container-shell pt-8 text-sm" aria-label="Breadcrumb">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ol className="flex flex-wrap items-center gap-2 text-[var(--muted)]">
        {allItems.map((item, index) => (
          <li key={`${item.href}-${item.label}`} className="flex items-center gap-2">
            {index > 0 ? <ChevronRight size={14} aria-hidden="true" /> : null}
            {index === allItems.length - 1 ? (
              <span className="text-white">{item.label}</span>
            ) : (
              <Link href={item.href} className="transition hover:text-[var(--mint)]">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

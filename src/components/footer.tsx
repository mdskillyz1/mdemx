import Link from "next/link";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { Logo } from "@/components/logo";
import { seoNavLinks } from "@/lib/seo-content";
import { navLinks, services, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#060c09]">
      <div className="container-shell grid gap-10 py-14 lg:grid-cols-[1.4fr_2fr]">
        <div>
          <Link href="/" aria-label="MDemx home">
            <Logo tagline="Web design and digital systems" />
          </Link>
          <p className="mt-6 max-w-md text-sm leading-6 text-[var(--muted)]">
            London-based web design, development, SEO, QR ordering systems, hosting support,
            branding, and digital setup for small businesses.
          </p>
          <div className="mt-6 grid gap-3 text-sm text-[var(--muted)]">
            <a className="flex items-center gap-3 transition hover:text-white" href={`mailto:${site.email}`}>
              <Mail size={17} className="text-[var(--mint)]" /> {site.email}
            </a>
            <a className="flex items-center gap-3 transition hover:text-white" href={site.whatsapp}>
              <MessageCircle size={17} className="text-[var(--mint)]" /> WhatsApp MDemx
            </a>
            <span className="flex items-center gap-3">
              <MapPin size={17} className="text-[var(--mint)]" /> {site.location}
            </span>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <FooterColumn
            title="Services"
            links={services.slice(0, 6).map((service) => ({
              href: `/services#${service.slug}`,
              label: service.title,
            }))}
          />
          <FooterColumn title="Company" links={navLinks.filter((link) => link.href !== "/")} />
          <FooterColumn title="SEO Pages" links={seoNavLinks} />
          <FooterColumn
            title="Contact"
            links={[
              { href: "/free-website-audit", label: "Free Website Audit" },
              { href: "/free-seo-audit", label: "Free SEO Audit" },
              { href: "/quote-request", label: "Quote Request" },
              { href: "/client-brief", label: "Start Website Brief" },
            ]}
          />
          <FooterColumn
            title="Legal"
            links={[
              { href: "/privacy-policy", label: "Privacy Policy" },
              { href: "/cookie-policy", label: "Cookie Policy" },
              { href: "/sitemap.xml", label: "Sitemap" },
            ]}
          />
        </div>
      </div>
      <div className="border-t border-white/10 py-5">
        <div className="container-shell flex flex-col gap-2 text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright {new Date().getFullYear()} MDemx. All rights reserved.</p>
          <p>Built for small business growth in London and across the UK.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">{title}</h3>
      <ul className="mt-4 grid gap-3">
        {links.map((link) => (
          <li key={`${title}-${link.href}-${link.label}`}>
            <Link href={link.href} className="text-sm text-[var(--muted)] transition hover:text-[var(--mint)]">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

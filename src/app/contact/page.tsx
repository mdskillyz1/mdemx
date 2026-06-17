import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";
import { budgetOptions, serviceOptions, site, timelineOptions } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with MDemx for web design London, small business websites, QR ordering systems, SEO setup, hosting support, and digital tools.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact MDemx | Start a Web Design Project",
    description:
      "Contact MDemx for small business websites London, restaurant website design, QR ordering systems, SEO, and digital setup.",
    url: "/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact MDemx | Start a Web Design Project",
    description: "Start a project with MDemx, a London web design and digital systems studio.",
  },
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const params = await searchParams;

  return (
    <>
      <PageHero
        eyebrow="Start a Project"
        title="Tell MDemx what you need and get a clear next step."
        text="Use the quick quote form for web design, QR ordering systems, SEO, branding, hosting support, or a complete digital setup for your business."
      />
      <section className="container-shell grid gap-8 pb-16 md:pb-24 lg:grid-cols-[0.72fr_1.28fr]">
        <aside className="space-y-5">
          <div className="glass-panel rounded-3xl p-6">
            <h2 className="text-2xl font-semibold text-white">Contact MDemx</h2>
            <div className="mt-5 grid gap-4 text-sm text-[var(--muted)]">
              <a className="flex items-center gap-3 hover:text-white" href={`mailto:${site.email}`}>
                <Mail size={18} className="text-[var(--mint)]" /> {site.email}
              </a>
              <a className="flex items-center gap-3 hover:text-white" href={site.whatsapp}>
                <MessageCircle size={18} className="text-[var(--mint)]" /> Message on WhatsApp
              </a>
              <span className="flex items-center gap-3">
                <MapPin size={18} className="text-[var(--mint)]" /> London, UK
              </span>
            </div>
          </div>
          <div className="rounded-3xl border border-[var(--line)] bg-white/[0.045] p-6">
            <h2 className="text-lg font-semibold text-white">Quick quote options</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
              Choose a service, budget, and timeline so MDemx can understand the project quickly.
            </p>
            <div className="mt-5 grid gap-3 text-sm text-[var(--muted)]">
              <p>{serviceOptions.length} service categories</p>
              <p>{budgetOptions.length} budget ranges</p>
              <p>{timelineOptions.length} timeline options</p>
            </div>
          </div>
        </aside>
        <ContactForm selectedService={params.service ?? ""} />
      </section>
    </>
  );
}

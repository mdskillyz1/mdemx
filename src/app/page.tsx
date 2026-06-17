import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { CTASection } from "@/components/cta-section";
import { GoogleBusinessProfilePlaceholder } from "@/components/google-business-profile-placeholder";
import { Hero } from "@/components/hero";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { performancePrinciples, processSteps, projects, resultCards, services, site, stats } from "@/lib/site";

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: site.title,
    description: site.description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <GoogleBusinessProfilePlaceholder />
      <ServicesStrip />

      <section className="container-shell py-16 md:py-24">
        <SectionHeading
          eyebrow="Selected work"
          title="Digital foundations for restaurants, trades, and service businesses."
          text="Clickable screen previews that show the kind of practical, polished websites and systems MDemx builds for small businesses."
        />
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] py-10">
        <div className="container-shell grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-3xl border border-[var(--line)] bg-white/[0.045] p-6">
              <p className="text-3xl font-semibold text-white">{stat.value}</p>
              <p className="mt-2 text-sm text-[var(--muted)]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-shell py-16 md:py-24">
        <SectionHeading
          eyebrow="Services"
          title="Everything a small business needs to look credible and collect better leads."
          text="From premium web design London businesses can trust to QR ordering systems and SEO-ready pages, MDemx keeps the process clear."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {services.slice(0, 4).map((service) => (
            <ServiceCard key={service.title} service={service} compact />
          ))}
        </div>
        <a href="/services" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--mint)] hover:text-white">
          View all services <ArrowRight size={16} />
        </a>
      </section>

      <section className="container-shell py-16 md:py-24">
        <SectionHeading
          eyebrow="How it works"
          title="A clear start-to-launch process that feels simple for busy business owners."
          text="The journey is designed to remove guesswork, keep decisions focused, and turn your website into a useful business asset."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-5">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <article key={step.title} className="rounded-3xl border border-[var(--line)] bg-white/[0.045] p-5">
                <div className="flex items-center justify-between gap-4">
                  <Icon size={22} className="text-[var(--mint)]" />
                  <span className="font-mono text-sm text-[var(--muted)]">0{index + 1}</span>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{step.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="container-shell py-16 md:py-24">
        <div className="grid gap-8 rounded-[2rem] border border-[var(--line)] bg-white/[0.045] p-6 md:p-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--mint)]">Website questions</p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-white md:text-5xl">
              How do you make a website that actually brings in customers?
            </h2>
            <p className="mt-5 text-base leading-7 text-[var(--muted)]">
              A good business website is not just a nice design. It needs clear services, fast pages, local SEO,
              strong calls to action, trust signals, and simple contact routes so visitors know what to do next.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Be found", "SEO-ready pages for web design London, small business websites, and local searches."],
              ["Build trust", "Professional design, clear copy, project examples, reviews, and business details."],
              ["Get enquiries", "Quote forms, WhatsApp buttons, call buttons, and booking routes built into the site."],
              ["Keep improving", "Analytics, maintenance, updates, and support after the website is launched."],
            ].map(([title, text]) => (
              <article key={title} className="rounded-3xl border border-[var(--line)] bg-[#07110c]/65 p-5">
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell py-16 md:py-24">
        <div className="grid gap-5 md:grid-cols-3">
          {resultCards.map((card) => {
            const Icon = card.icon;
            return (
              <article key={card.title} className="glass-panel rounded-3xl p-6">
                <Icon size={24} className="text-[var(--mint)]" />
                <h3 className="mt-5 text-xl font-semibold text-white">{card.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{card.text}</p>
              </article>
            );
          })}
        </div>
        <div className="mt-6 grid gap-3 rounded-3xl border border-[var(--line)] bg-white/[0.035] p-6 sm:grid-cols-2 lg:grid-cols-4">
          {performancePrinciples.map((item) => (
            <p key={item} className="text-sm font-medium text-[var(--muted)]">
              <span className="mr-2 text-[var(--mint)]">/</span>
              {item}
            </p>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}

function ServicesStrip() {
  const items = ["Web Design", "SEO", "QR Ordering", "Business Websites", "Hosting", "Branding", "Web Apps"];
  return (
    <div className="overflow-hidden border-y border-white/10 bg-[var(--mint)] text-[#07110c]">
      <div className="animate-marquee flex w-max gap-8 py-4 text-sm font-bold uppercase tracking-[0.16em]">
        {[...items, ...items, ...items, ...items].map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center gap-8">
            {item}
            <span aria-hidden="true">&bull;</span>
          </span>
        ))}
      </div>
    </div>
  );
}

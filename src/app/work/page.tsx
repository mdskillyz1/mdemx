import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";
import { CTASection } from "@/components/cta-section";
import { PageHero } from "@/components/page-hero";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { projects } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Clickable MDemx portfolio previews including restaurant website design, QR ordering systems, service business websites, quote forms, SEO setup, and lead-generation websites.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "MDemx Work | Small Business Websites London",
    description:
      "Explore selected MDemx work examples for restaurants, electrical services, local business websites, quote forms, QR ordering systems, and SEO-ready digital systems.",
    url: "/work",
  },
  twitter: {
    card: "summary_large_image",
    title: "MDemx Work | Small Business Websites London",
    description: "Portfolio examples for web design, QR ordering systems, SEO-ready websites, quote forms, and digital tools.",
  },
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Work / Portfolio"
        title="Clickable website previews built around real small business needs."
        text="Tap a screen grab to see what was built, why it matters, and how MDemx can create a similar website, ordering system, or lead-generation flow for your business."
      />
      <section className="container-shell pb-16 md:pb-24">
        <div className="grid gap-8 lg:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </section>
      <section className="container-shell py-16 md:py-24">
        <SectionHeading
          eyebrow="Project details"
          title="Each preview explains the business value behind the website."
          text="The goal is simple: show potential clients that MDemx can build something polished, useful, and ready to bring in enquiries."
        />
        <div className="mt-10 grid gap-8">
          {projects.map((project) => (
            <article
              key={project.id}
              id={`${project.id}-details`}
              className="scroll-mt-28 overflow-hidden rounded-[2rem] border border-[var(--line)] bg-white/[0.045]"
            >
              <div className="grid gap-0 xl:grid-cols-[1.1fr_0.9fr]">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block min-h-[26rem] overflow-hidden bg-[#07110c]"
                >
                  <Image
                    src={project.image}
                    alt={`${project.title} full website preview`}
                    width={1200}
                    height={820}
                    className="h-full min-h-[26rem] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07110c]/86 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.22em] text-white/70">{project.location}</p>
                      <h2 className="mt-2 text-3xl font-semibold text-white">{project.title}</h2>
                    </div>
                    <span className="hidden rounded-full bg-[var(--mint)] px-4 py-2 text-sm font-bold text-[#07110c] sm:inline-flex">
                      {project.year}
                    </span>
                  </div>
                </a>
                <div className="p-6 md:p-8 lg:p-10">
                  <div className="flex flex-wrap gap-2">
                    {project.services.map((service) => (
                      <span key={service} className="rounded-full border border-[var(--line)] px-3 py-1 text-xs text-[var(--muted)]">
                        {service}
                      </span>
                    ))}
                  </div>
                  <h3 className="mt-7 text-2xl font-semibold text-white">What this site helps with</h3>
                  <p className="mt-3 text-base leading-7 text-[var(--muted)]">{project.challenge}</p>
                  <h3 className="mt-7 text-2xl font-semibold text-white">MDemx approach</h3>
                  <p className="mt-3 text-base leading-7 text-[var(--muted)]">{project.outcome}</p>
                  <div className="mt-7 grid gap-3 sm:grid-cols-2">
                    {project.features.map((feature) => (
                      <p key={feature} className="rounded-2xl border border-[var(--line)] bg-white/[0.035] p-4 text-sm font-medium text-white">
                        <span className="mr-2 text-[var(--mint)]">/</span>
                        {feature}
                      </p>
                    ))}
                  </div>
                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    <div>
                      <h3 className="text-lg font-semibold text-white">Technologies used</h3>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {project.technologies.map((technology) => (
                          <span key={technology} className="rounded-full border border-[var(--line)] bg-white/[0.035] px-3 py-1 text-xs text-[var(--muted)]">
                            {technology}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Client benefits</h3>
                      <div className="mt-3 grid gap-2">
                        {project.clientBenefits.slice(0, 3).map((benefit) => (
                          <p key={benefit} className="flex gap-2 text-sm text-[var(--muted)]">
                            <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[var(--mint)]" />
                            {benefit}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--mint)] px-5 text-sm font-semibold text-[#07110c] transition hover:bg-white"
                    >
                      {project.liveLabel} <ExternalLink size={16} />
                    </a>
                    <Link
                      href="/contact?service=Book%20a%20Free%20Consultation"
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--line)] px-5 text-sm font-semibold text-[var(--mint)] transition hover:border-[var(--mint)] hover:text-white"
                    >
                      Book a free consultation <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="border-t border-[var(--line)] p-6 md:p-8 lg:p-10">
                <h3 className="text-2xl font-semibold text-white">Screenshots and project views</h3>
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {project.gallery.map((item, index) => (
                    <a
                      key={`${project.id}-${item.label}`}
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group overflow-hidden rounded-3xl border border-[var(--line)] bg-[#07110c]"
                    >
                      <div className="relative aspect-[0.9] overflow-hidden">
                        <Image
                          src={item.image}
                          alt={`${project.title} ${item.label}`}
                          width={900}
                          height={900}
                          className={`h-full w-full object-cover transition duration-500 group-hover:scale-[1.04] ${
                            index === 1 ? "object-top" : index === 2 ? "object-bottom" : "object-center"
                          }`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#07110c]/88 via-transparent to-transparent" />
                        <p className="absolute bottom-4 left-4 right-4 text-sm font-semibold text-white">{item.label}</p>
                      </div>
                    </a>
                  ))}
                </div>
                <h3 className="mt-8 text-2xl font-semibold text-white">Key outcomes</h3>
                <div className="mt-5 grid gap-3 md:grid-cols-2">
                  {project.keyOutcomes.map((outcome) => (
                    <p key={outcome} className="rounded-2xl border border-[var(--line)] bg-white/[0.035] p-4 text-sm font-medium text-white">
                      <span className="mr-2 text-[var(--mint)]">/</span>
                      {outcome}
                    </p>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="container-shell py-16 md:py-24">
        <SectionHeading
          eyebrow="Case study style"
          title="Every project starts with the business problem, not just the visuals."
          text="MDemx focuses on what the website needs to do: build trust, explain services, reduce admin, collect leads, or make ordering simpler."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {["Clear positioning", "Lead capture", "Local SEO", "Future systems"].map((item) => (
            <div key={item} className="rounded-3xl border border-[var(--line)] bg-white/[0.045] p-6">
              <h2 className="text-xl font-semibold text-white">{item}</h2>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                Project planning connects design choices to business outcomes so the finished website is useful from day one.
              </p>
            </div>
          ))}
        </div>
      </section>
      <CTASection title="Want your business to be the next MDemx project?" />
    </>
  );
}

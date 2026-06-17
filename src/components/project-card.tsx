import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { projects } from "@/lib/site";

type Project = (typeof projects)[number];

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article id={project.id} className="group overflow-hidden rounded-[2rem] border border-[var(--line)] bg-white/[0.045]">
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--mint)]"
      >
        <div className="relative aspect-[0.95] overflow-hidden bg-[#07110c] sm:aspect-[1.08] lg:aspect-[1.18]">
          <Image
            src={project.image}
            alt={`${project.title} website screen preview by MDemx`}
            width={1200}
            height={820}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07110c] via-[#07110c]/28 to-transparent" />
          <div className="absolute right-5 top-5 rounded-full border border-white/20 bg-black/35 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md">
            {project.year}
          </div>
          <div className="absolute bottom-5 left-5 right-5">
            <p className="text-sm uppercase tracking-[0.22em] text-white/70">{project.location}</p>
            <h3 className="mt-2 text-3xl font-semibold text-white md:text-4xl">{project.title}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.services.slice(0, 3).map((service) => (
                <span key={service} className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  {service}
                </span>
              ))}
            </div>
          </div>
        </div>
      </a>
      <div className="p-6 md:p-8">
        <p className="text-base leading-7 text-[var(--muted)]">{project.summary}</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {project.clientBenefits.slice(0, 4).map((benefit) => (
            <p key={benefit} className="rounded-2xl border border-[var(--line)] bg-white/[0.035] p-3 text-sm font-medium text-white">
              <span className="mr-2 text-[var(--mint)]">/</span>
              {benefit}
            </p>
          ))}
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href={project.href}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[var(--line)] px-4 text-sm font-semibold text-[var(--mint)] transition hover:border-[var(--mint)] hover:text-white"
          >
            Project details <ArrowUpRight size={16} />
          </Link>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--mint)] px-4 text-sm font-semibold text-[#07110c] transition hover:bg-white"
          >
            {project.liveLabel}
          </a>
        </div>
      </div>
    </article>
  );
}

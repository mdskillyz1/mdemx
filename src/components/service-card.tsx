import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import type { services } from "@/lib/site";

type Service = (typeof services)[number];

export function ServiceCard({ service, compact = false }: { service: Service; compact?: boolean }) {
  const Icon = service.icon;

  return (
    <article
      id={service.slug}
      className="group glass-panel rounded-3xl p-6 transition duration-300 hover:-translate-y-1 hover:border-[var(--mint)] hover:bg-white/[0.085]"
    >
      <div className="grid size-12 place-items-center rounded-2xl border border-[var(--line)] bg-[rgba(167,243,194,0.12)] text-[var(--mint)]">
        <Icon size={22} />
      </div>
      <h3 className="mt-5 text-xl font-semibold text-white">{service.title}</h3>
      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{service.summary}</p>
      {!compact ? (
        <div className="mt-5">
          <p className="text-sm font-semibold text-white">What is included</p>
          <ul className="mt-3 grid gap-2">
            {service.included.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-[var(--muted)]">
                <Check size={16} className="mt-0.5 shrink-0 text-[var(--mint)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <Link
        href={`/contact?service=${encodeURIComponent(service.title)}`}
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--mint)] transition group-hover:text-white"
      >
        Enquire about this <ArrowRight size={16} />
      </Link>
    </article>
  );
}

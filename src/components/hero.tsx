import { ArrowRight, FileText, Mail, MessageCircle, Phone } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { analyticsHighlights, site } from "@/lib/site";

export function Hero() {
  return (
    <section className="container-shell grid gap-10 py-16 md:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <div className="animate-float-up">
        <p className="mb-5 inline-flex rounded-full border border-[var(--line)] bg-white/5 px-4 py-2 text-sm font-medium text-[var(--mint)]">
          London web design, website development, and small business setup
        </p>
        <h1 className="text-balance text-5xl font-semibold tracking-tight text-white md:text-7xl">
          Is your website helping your business grow?
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
          If customers search for your business today, does your website make them trust you,
          contact you, and buy from you? MDemx designs and builds modern websites, ordering
          systems, and digital tools for local businesses that want to look professional and work smarter.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/contact?service=Book%20a%20Free%20Consultation" className="gap-2">
            Book a Free Consultation <ArrowRight size={18} />
          </ButtonLink>
          <a
            href="/client-brief"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--line)] bg-white/5 px-5 text-sm font-semibold text-white transition hover:border-[var(--mint)] hover:bg-white/10"
          >
            <FileText size={18} /> Start Website Brief
          </a>
          <a
            href={site.whatsapp}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--line)] bg-white/5 px-5 text-sm font-semibold text-white transition hover:border-[var(--mint)] hover:bg-white/10"
          >
            <MessageCircle size={18} /> Message on WhatsApp
          </a>
          <a
            href={`tel:${site.phone}`}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--line)] bg-white/5 px-5 text-sm font-semibold text-white transition hover:border-[var(--mint)] hover:bg-white/10"
          >
            <Phone size={18} /> Call
          </a>
          <a
            href={`mailto:${site.email}`}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--line)] bg-white/5 px-5 text-sm font-semibold text-white transition hover:border-[var(--mint)] hover:bg-white/10"
          >
            <Mail size={18} /> Email
          </a>
        </div>
      </div>

      <div className="glass-panel mint-glow animate-float-up rounded-[2rem] p-5 [animation-delay:120ms] md:p-7">
        <div className="rounded-[1.5rem] border border-white/10 bg-[#0c1711] p-5">
          <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <p className="text-sm text-[var(--muted)]">Project journey</p>
              <p className="mt-1 text-2xl font-semibold text-white">Start to launch</p>
            </div>
            <span className="rounded-full bg-[var(--mint)] px-3 py-1 text-xs font-bold text-[#07110c]">
              Smart UI
            </span>
          </div>
          <div className="mt-5 grid gap-3">
            {["Quick quote", "Discovery call", "Design preview", "Build and launch"].map((item, index) => (
              <div key={item} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[rgba(167,243,194,0.15)] text-sm font-semibold text-[var(--mint)]">
                  {index + 1}
                </span>
                <span className="text-sm font-medium text-white">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {analyticsHighlights.map((item) => (
              <div key={item.label} className="rounded-2xl border border-[var(--line)] bg-[rgba(167,243,194,0.08)] p-4">
                <p className="text-xl font-semibold text-white">{item.value}</p>
                <p className="mt-1 text-xs leading-5 text-[var(--muted)]">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

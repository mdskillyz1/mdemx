import { ArrowRight, Mail, MessageCircle, Phone } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { site } from "@/lib/site";

type CTASectionProps = {
  title?: string;
  text?: string;
};

export function CTASection({
  title = "Ready to build your website?",
  text = "Tell MDemx what you need and get a practical route from idea to live website, ordering system, or digital setup.",
}: CTASectionProps) {
  return (
    <section className="container-shell py-16 md:py-24">
      <div className="glass-panel mint-glow overflow-hidden rounded-[2rem] p-8 md:p-12">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--mint)]">
              Start the conversation
            </p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-white md:text-5xl">
              {title}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--muted)] md:text-lg">{text}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <ButtonLink href="/contact?service=Book%20a%20Free%20Consultation" className="gap-2">
              Book a Free Consultation <ArrowRight size={18} />
            </ButtonLink>
            <a
              href={site.whatsapp}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--line)] bg-white/5 px-5 text-sm font-semibold text-white transition hover:border-[var(--mint)] hover:bg-white/10"
            >
              <MessageCircle size={18} /> Message on WhatsApp
            </a>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <a
                href={`tel:${site.phone}`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--line)] bg-white/5 px-5 text-sm font-semibold text-white transition hover:border-[var(--mint)] hover:bg-white/10"
              >
                <Phone size={18} /> Call MDemx
              </a>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--line)] bg-white/5 px-5 text-sm font-semibold text-white transition hover:border-[var(--mint)] hover:bg-white/10"
              >
                <Mail size={18} /> Email MDemx
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

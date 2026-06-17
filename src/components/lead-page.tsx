import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";

export function LeadPage({
  eyebrow,
  title,
  text,
  service,
  points,
}: {
  eyebrow: string;
  title: string;
  text: string;
  service: string;
  points: string[];
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} text={text} />
      <section className="container-shell pb-16 md:pb-24">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1fr]">
          <div className="rounded-[2rem] border border-[var(--line)] bg-white/[0.045] p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-white">What MDemx will review</h2>
            <div className="mt-6 grid gap-3">
              {points.map((point) => (
                <p key={point} className="rounded-2xl border border-[var(--line)] bg-white/[0.035] p-4 text-sm font-medium text-white">
                  <span className="mr-2 text-[var(--mint)]">/</span>
                  {point}
                </p>
              ))}
            </div>
          </div>
          <ContactForm selectedService={service} />
        </div>
      </section>
    </>
  );
}

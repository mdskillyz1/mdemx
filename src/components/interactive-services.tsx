"use client";

import { ArrowRight, Check, ChevronDown, MessageCircle, MousePointerClick, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { services, site } from "@/lib/site";

type Service = (typeof services)[number];

const businessTypes = ["Restaurant", "Trade / local service", "Community group", "Retail", "Professional service"];
const goals = ["More enquiries", "Online ordering", "Look more professional", "Rank better on Google", "Save admin time"];
const features = ["Quote form", "WhatsApp CTA", "SEO setup", "QR ordering", "Admin dashboard", "Branding"];
const timelines = ["As soon as possible", "2-4 weeks", "1-2 months", "Planning ahead"];

const serviceDetails: Record<string, { about: string; bestFor: string[]; result: string }> = {
  "web-design-development": {
    about:
      "A complete website build for businesses that need a premium online presence, clear pages, fast performance, and enquiry-focused calls to action.",
    bestFor: ["New businesses", "Website redesigns", "Service-led companies", "Lead generation"],
    result: "A polished, mobile-first website ready to turn visitors into real enquiries.",
  },
  "restaurant-qr-ordering-systems": {
    about:
      "A practical digital menu and QR table ordering journey designed around fast browsing, fewer ordering delays, and easier restaurant operations.",
    bestFor: ["Restaurants", "Cafes", "Takeaways", "Table service venues"],
    result: "A smoother customer journey from scanning a QR code to choosing food and sending an order.",
  },
  "business-websites": {
    about:
      "A clear website structure for small businesses that need to explain services, show trust, capture quotes, and look credible from the first visit.",
    bestFor: ["Electricians", "Cleaners", "Tutors", "Community organisations"],
    result: "A trustworthy business website with strong contact routes and local SEO foundations.",
  },
  "admin-dashboards": {
    about:
      "Custom internal screens for managing enquiries, content, orders, customers, and simple workflows without messy spreadsheets.",
    bestFor: ["Growing teams", "Restaurants", "Booking workflows", "Lead management"],
    result: "A cleaner way to manage day-to-day business tasks from one simple dashboard.",
  },
  "seo-setup": {
    about:
      "Technical and local SEO foundations that help search engines understand your website and help nearby customers find your services.",
    bestFor: ["Local businesses", "New websites", "Service areas", "Google visibility"],
    result: "Better structured pages, metadata, schema, sitemap, robots, and local keyword targeting.",
  },
  "hosting-domain-support": {
    about:
      "Support for the technical parts of going live: domains, DNS, SSL, redirects, email guidance, hosting, and launch checks.",
    bestFor: ["First launches", "Domain setup", "Website moves", "Ongoing reliability"],
    result: "A calmer launch with the important technical setup handled properly.",
  },
  "logo-brand-identity": {
    about:
      "A clean visual identity direction so the website, social profiles, documents, and customer touchpoints feel consistent.",
    bestFor: ["Startups", "Rebrands", "Local services", "Restaurants"],
    result: "A simple, credible brand foundation with colours, type, and logo direction.",
  },
  "website-maintenance": {
    about:
      "Ongoing support for content changes, technical checks, performance improvements, and small website updates after launch.",
    bestFor: ["Busy owners", "Active websites", "Monthly updates", "Peace of mind"],
    result: "A healthier website that keeps improving instead of being forgotten after launch.",
  },
};

export function InteractiveServices() {
  const [activeSlug, setActiveSlug] = useState(services[0].slug);
  const [businessType, setBusinessType] = useState(businessTypes[0]);
  const [goal, setGoal] = useState(goals[0]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(["Quote form", "WhatsApp CTA", "SEO setup"]);
  const [timeline, setTimeline] = useState(timelines[1]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupDismissed, setPopupDismissed] = useState(false);

  const activeService = services.find((service) => service.slug === activeSlug) ?? services[0];
  const activeDetail = serviceDetails[activeService.slug];

  const recommendedService = useMemo(() => {
    if (selectedFeatures.includes("QR ordering") || goal === "Online ordering") return "Restaurant QR Ordering Systems";
    if (selectedFeatures.includes("Admin dashboard") || goal === "Save admin time") return "Admin Dashboards";
    if (goal === "Rank better on Google") return "SEO Setup";
    if (selectedFeatures.includes("Branding")) return "Logo & Brand Identity";
    return activeService.title;
  }, [activeService.title, goal, selectedFeatures]);

  const quoteHref = `/contact?service=${encodeURIComponent(recommendedService)}`;
  const whatsappText = encodeURIComponent(
    `Hi MDemx, I want help with ${recommendedService}. Business type: ${businessType}. Goal: ${goal}. Timeline: ${timeline}.`,
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (!popupDismissed) setPopupOpen(true);
    }, 6500);

    return () => window.clearTimeout(timer);
  }, [popupDismissed]);

  function toggleFeature(feature: string) {
    setSelectedFeatures((current) =>
      current.includes(feature) ? current.filter((item) => item !== feature) : [...current, feature],
    );
  }

  function dismissPopup() {
    setPopupDismissed(true);
    setPopupOpen(false);
  }

  return (
    <>
      <section className="container-shell pb-16 md:pb-24">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-4">
            {services.map((service) => {
              const Icon = service.icon;
              const selected = activeSlug === service.slug;

              return (
                <button
                  key={service.slug}
                  id={service.slug}
                  type="button"
                  onClick={() => setActiveSlug(service.slug)}
                  className={`group rounded-3xl border p-5 text-left transition duration-300 hover:-translate-y-1 hover:border-[var(--mint)] ${
                    selected
                      ? "border-[var(--mint)] bg-[rgba(167,243,194,0.12)] shadow-[0_24px_80px_rgba(74,222,128,0.13)]"
                      : "border-[var(--line)] bg-white/[0.045]"
                  }`}
                  aria-expanded={selected}
                >
                  <span className="flex items-start gap-4">
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-[var(--line)] bg-[rgba(167,243,194,0.12)] text-[var(--mint)]">
                      <Icon size={22} />
                    </span>
                    <span className="min-w-0">
                      <span className="flex items-center justify-between gap-3">
                        <span className="text-lg font-semibold text-white">{service.title}</span>
                        <ChevronDown
                          size={18}
                          className={`shrink-0 text-[var(--mint)] transition ${selected ? "rotate-180" : ""}`}
                        />
                      </span>
                      <span className="mt-2 block text-sm leading-6 text-[var(--muted)]">{service.summary}</span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <article className="glass-panel sticky top-24 h-fit rounded-[2rem] p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-[var(--line)] bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--mint)]">
                Service detail
              </span>
              <span className="rounded-full bg-[var(--mint)] px-4 py-2 text-xs font-bold text-[#07110c]">Clickable guide</span>
            </div>
            <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white md:text-5xl">{activeService.title}</h2>
            <p className="mt-5 text-base leading-8 text-[var(--muted)]">{activeDetail.about}</p>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">What is included</h3>
                <ul className="mt-4 grid gap-3">
                  {activeService.included.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-[var(--muted)]">
                      <Check size={17} className="mt-0.5 shrink-0 text-[var(--mint)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">Best for</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {activeDetail.bestFor.map((item) => (
                    <span key={item} className="rounded-full border border-[var(--line)] bg-white/[0.045] px-3 py-2 text-xs text-[var(--muted)]">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-[var(--line)] bg-[#07110c]/70 p-5">
              <p className="text-sm font-semibold text-[var(--mint)]">What the client gets</p>
              <p className="mt-2 text-sm leading-6 text-white">{activeDetail.result}</p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/contact?service=${encodeURIComponent(activeService.title)}`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--mint)] px-5 text-sm font-semibold text-[#07110c] transition hover:bg-white"
              >
                Enquire about this <ArrowRight size={17} />
              </Link>
              <a
                href={`${site.whatsapp}?text=${encodeURIComponent(`Hi MDemx, I am interested in ${activeService.title}.`)}`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--line)] px-5 text-sm font-semibold text-[var(--mint)] transition hover:border-[var(--mint)] hover:text-white"
              >
                Ask on WhatsApp <MessageCircle size={17} />
              </a>
            </div>
          </article>
        </div>
      </section>

      <section className="container-shell py-16 md:py-24">
        <div className="glass-panel mint-glow rounded-[2rem] p-6 md:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--mint)]">Build your ideal website</p>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-white md:text-5xl">
                Try the quick website builder, then get a quote.
              </h2>
              <p className="mt-5 text-base leading-7 text-[var(--muted)]">
                Choose what your business needs and MDemx will point you to the right enquiry route. It feels simple for visitors and gives better leads.
              </p>
            </div>

            <div className="grid gap-5">
              <OptionGroup label="1. What type of business is it?" options={businessTypes} value={businessType} onChange={setBusinessType} />
              <OptionGroup label="2. What do you want most?" options={goals} value={goal} onChange={setGoal} />

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">3. Choose website features</h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {features.map((feature) => {
                    const selected = selectedFeatures.includes(feature);

                    return (
                      <button
                        key={feature}
                        type="button"
                        onClick={() => toggleFeature(feature)}
                        className={`min-h-12 rounded-2xl border px-4 text-left text-sm font-semibold transition ${
                          selected
                            ? "border-[var(--mint)] bg-[rgba(167,243,194,0.14)] text-white"
                            : "border-[var(--line)] bg-white/[0.035] text-[var(--muted)] hover:border-[var(--mint)] hover:text-white"
                        }`}
                      >
                        {selected ? <Check size={16} className="mr-2 inline text-[var(--mint)]" /> : null}
                        {feature}
                      </button>
                    );
                  })}
                </div>
              </div>

              <OptionGroup label="4. Preferred timeline" options={timelines} value={timeline} onChange={setTimeline} />

              <div className="rounded-3xl border border-[var(--line)] bg-[#07110c]/72 p-5">
                <div className="flex items-start gap-3">
                  <Sparkles size={21} className="mt-1 shrink-0 text-[var(--mint)]" />
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--mint)]">Recommended enquiry</p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">{recommendedService}</h3>
                    <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                      Based on your choices: {businessType}, {goal.toLowerCase()}, {selectedFeatures.join(", ").toLowerCase()}, {timeline.toLowerCase()}.
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={quoteHref}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--mint)] px-5 text-sm font-semibold text-[#07110c] transition hover:bg-white"
                  >
                    Get my quote <ArrowRight size={17} />
                  </Link>
                  <a
                    href={`${site.whatsapp}?text=${whatsappText}`}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--line)] px-5 text-sm font-semibold text-[var(--mint)] transition hover:border-[var(--mint)] hover:text-white"
                  >
                    Send on WhatsApp <MessageCircle size={17} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {popupOpen ? (
        <div className="fixed inset-x-4 bottom-24 z-50 mx-auto max-w-md rounded-3xl border border-[var(--line)] bg-[#08110d]/96 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:right-6 sm:left-auto sm:mx-0">
          <button
            type="button"
            onClick={dismissPopup}
            className="absolute right-4 top-4 grid size-8 place-items-center rounded-full border border-[var(--line)] text-[var(--muted)] transition hover:border-[var(--mint)] hover:text-white"
            aria-label="Close consultation message"
          >
            <X size={16} />
          </button>
          <div className="pr-10">
            <div className="grid size-11 place-items-center rounded-2xl bg-[rgba(167,243,194,0.14)] text-[var(--mint)]">
              <MousePointerClick size={20} />
            </div>
            <h2 className="mt-4 text-xl font-semibold text-white">Not sure what to choose?</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              Send MDemx a quick project request. You can explain the business in plain English and get a clear next step.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Link
                href="/contact?service=Book%20a%20Free%20Consultation"
                onClick={dismissPopup}
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--mint)] px-4 text-sm font-semibold text-[#07110c] transition hover:bg-white"
              >
                Start a project
              </Link>
              <a
                href={site.whatsapp}
                onClick={dismissPopup}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--line)] px-4 text-sm font-semibold text-[var(--mint)] transition hover:border-[var(--mint)] hover:text-white"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function OptionGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">{label}</h3>
      <div className="mt-4 flex flex-wrap gap-3">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`min-h-11 rounded-full border px-4 text-sm font-semibold transition ${
              value === option
                ? "border-[var(--mint)] bg-[var(--mint)] text-[#07110c]"
                : "border-[var(--line)] bg-white/[0.035] text-[var(--muted)] hover:border-[var(--mint)] hover:text-white"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

"use client";

import { ArrowLeft, ArrowRight, Check, FileText, Send, Upload } from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import type { ClientBriefPayload, WebsiteRequirement } from "@/lib/briefs";
import { budgetOptions, businessTypeOptions, timelineOptions } from "@/lib/site";

const steps = [
  "Client details",
  "Websites",
  "Website details",
  "Design",
  "Pages",
  "Features",
  "Content",
  "Domain",
  "Budget",
  "Submit",
];

const pageOptions = [
  "Home",
  "About",
  "Services",
  "Products",
  "Portfolio/Gallery",
  "Contact",
  "Booking",
  "FAQ",
  "Testimonials",
  "Blog/News",
  "Privacy Policy",
  "Terms and Conditions",
  "Other",
];

const featureOptions = [
  "Contact form",
  "Quote request form",
  "Booking system",
  "Online payments",
  "Customer login",
  "Admin dashboard",
  "Blog",
  "Newsletter signup",
  "Live chat",
  "AI chatbot",
  "Google Maps",
  "WhatsApp button",
  "Reviews section",
  "SEO setup",
  "Analytics tracking",
  "Other",
];

const styleOptions = ["Modern", "Luxury", "Minimal", "Corporate", "Creative", "Bold", "Simple"];
const readinessOptions = ["Ready now", "Partly ready", "Need help creating it", "Not sure"];

const emptyWebsite: WebsiteRequirement = {
  websiteName: "",
  purpose: "",
  targetAudience: "",
  mainGoal: "",
  pagesNeeded: ["Home", "About", "Services", "Contact", "Privacy Policy"],
  featuresNeeded: ["Contact form", "WhatsApp button", "SEO setup", "Analytics tracking"],
  colourScheme: "#a7f3c2",
  secondaryColour: "#101713",
  stylePreference: ["Modern", "Simple"],
  exampleWebsites: "",
  contentAvailable: "",
  notes: "",
};

const initialPayload: ClientBriefPayload = {
  client: {
    fullName: "",
    email: "",
    phone: "",
    businessName: "",
    businessType: "",
  },
  websiteCount: 1,
  websites: [{ ...emptyWebsite }],
  design: {
    primaryColour: "#a7f3c2",
    secondaryColour: "#101713",
    fontPreference: "",
    stylePreferences: ["Modern", "Simple"],
    logoFileNames: [],
    assetFileNames: [],
  },
  content: {
    copyReady: "",
    imagesReady: "",
    brandAssetsReady: "",
    contentNotes: "",
  },
  domainHosting: {
    hasDomain: "",
    domainName: "",
    needsHosting: "",
    needsBusinessEmail: "",
    notes: "",
  },
  project: {
    budget: "",
    timeline: "",
    priority: "",
    finalNotes: "",
  },
  security: {
    website: "",
    startedAt: 0,
    submittedAtClient: 0,
  },
};

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export function ClientBriefForm() {
  const [step, setStep] = useState(0);
  const [payload, setPayload] = useState<ClientBriefPayload>(initialPayload);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [error, setError] = useState("");

  const progress = Math.round(((step + 1) / steps.length) * 100);

  useEffect(() => {
    setPayload((current) => ({
      ...current,
      security: { ...current.security, startedAt: Date.now() },
    }));
  }, []);

  const summary = useMemo(() => {
    const pageCount = new Set(payload.websites.flatMap((website) => website.pagesNeeded)).size;
    const featureCount = new Set(payload.websites.flatMap((website) => website.featuresNeeded)).size;

    return [
      `${payload.websiteCount} website${payload.websiteCount === 1 ? "" : "s"}`,
      `${pageCount} page type${pageCount === 1 ? "" : "s"}`,
      `${featureCount} feature${featureCount === 1 ? "" : "s"}`,
      payload.project.timeline || "Timeline pending",
    ];
  }, [payload]);

  function updateClient(field: keyof ClientBriefPayload["client"], value: string) {
    setPayload((current) => ({ ...current, client: { ...current.client, [field]: value } }));
  }

  function updateDesign(field: keyof ClientBriefPayload["design"], value: string | string[]) {
    setPayload((current) => ({ ...current, design: { ...current.design, [field]: value } }));
  }

  function updateContent(field: keyof ClientBriefPayload["content"], value: string) {
    setPayload((current) => ({ ...current, content: { ...current.content, [field]: value } }));
  }

  function updateDomain(field: keyof ClientBriefPayload["domainHosting"], value: string) {
    setPayload((current) => ({ ...current, domainHosting: { ...current.domainHosting, [field]: value } }));
  }

  function updateProject(field: keyof ClientBriefPayload["project"], value: string) {
    setPayload((current) => ({ ...current, project: { ...current.project, [field]: value } }));
  }

  function updateWebsite(index: number, field: keyof WebsiteRequirement, value: string | string[]) {
    setPayload((current) => ({
      ...current,
      websites: current.websites.map((website, websiteIndex) =>
        websiteIndex === index ? { ...website, [field]: value } : website,
      ),
    }));
  }

  function updateWebsiteCount(value: number) {
    const count = Math.min(Math.max(value, 1), 8);
    setPayload((current) => {
      const websites = [...current.websites];
      while (websites.length < count) {
        websites.push({ ...emptyWebsite, websiteName: `Website ${websites.length + 1}` });
      }

      return {
        ...current,
        websiteCount: count,
        websites: websites.slice(0, count),
      };
    });
  }

  function toggleDesignStyle(option: string) {
    setPayload((current) => ({
      ...current,
      design: {
        ...current.design,
        stylePreferences: toggleValue(current.design.stylePreferences, option),
      },
    }));
  }

  function toggleWebsiteValue(index: number, field: "pagesNeeded" | "featuresNeeded" | "stylePreference", value: string) {
    const website = payload.websites[index];
    updateWebsite(index, field, toggleValue(website[field], value));
  }

  function setFileNames(field: "logoFileNames" | "assetFileNames", files: FileList | null) {
    updateDesign(field, Array.from(files ?? []).map((file) => file.name));
  }

  function validateCurrentStep() {
    if (step === 0 && (!payload.client.fullName || !payload.client.email || !payload.client.businessName)) {
      return "Please add your name, email, and business name.";
    }

    if (step === 2) {
      const missingIndex = payload.websites.findIndex((website) => !website.websiteName || !website.purpose || !website.mainGoal);
      if (missingIndex !== -1) return `Please complete the name, purpose, and main goal for website ${missingIndex + 1}.`;
    }

    if (step === 8 && (!payload.project.budget || !payload.project.timeline)) {
      return "Please choose a budget and timeline.";
    }

    return "";
  }

  function goNext() {
    const validationError = validateCurrentStep();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setStep((current) => Math.min(current + 1, steps.length - 1));
  }

  function goBack() {
    setError("");
    setStep((current) => Math.max(current - 1, 0));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationError = validateCurrentStep();
    if (validationError) {
      setError(validationError);
      return;
    }

    setStatus("submitting");
    setError("");

    try {
      const response = await fetch("/api/briefs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          security: { ...payload.security, submittedAtClient: Date.now() },
        }),
      });

      const result = (await response.json()) as { message?: string; error?: string };
      if (!response.ok) throw new Error(result.error || "Brief submission failed");

      setStatus("success");
    } catch (submissionError) {
      setStatus("error");
      setError(submissionError instanceof Error ? submissionError.message : "Something went wrong.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="container-shell grid gap-8 pb-16 md:pb-24 lg:grid-cols-[0.34fr_0.66fr]">
      <aside className="glass-panel sticky top-24 h-fit rounded-[2rem] p-5">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--mint)]">Brief progress</p>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-[var(--mint)] transition-all" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-3 text-sm text-[var(--muted)]">{progress}% complete</p>
        <div className="mt-6 grid gap-2">
          {steps.map((label, index) => (
            <button
              key={label}
              type="button"
              onClick={() => setStep(index)}
              className={`flex items-center gap-3 rounded-2xl border px-3 py-3 text-left text-sm transition ${
                step === index
                  ? "border-[var(--mint)] bg-[rgba(167,243,194,0.12)] text-white"
                  : "border-transparent text-[var(--muted)] hover:border-[var(--line)] hover:text-white"
              }`}
            >
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-white/10 text-xs font-semibold">
                {index + 1}
              </span>
              {label}
            </button>
          ))}
        </div>
        <div className="mt-6 rounded-3xl border border-[var(--line)] bg-[#07110c]/70 p-4">
          <p className="text-sm font-semibold text-white">Brief summary</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {summary.map((item) => (
              <span key={item} className="rounded-full border border-[var(--line)] px-3 py-1 text-xs text-[var(--muted)]">
                {item}
              </span>
            ))}
          </div>
        </div>
      </aside>

      <section className="glass-panel rounded-[2rem] p-5 md:p-8">
        {status === "success" ? (
          <div className="grid min-h-[520px] place-items-center text-center">
            <div>
              <div className="mx-auto grid size-16 place-items-center rounded-full bg-[rgba(167,243,194,0.14)] text-[var(--mint)]">
                <Check size={30} />
              </div>
              <h2 className="mt-6 text-3xl font-semibold text-white">Thank you. MDemx has received your website brief.</h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[var(--muted)]">
                Your requirements have been submitted. MDemx will review the details and contact you shortly with the next step.
              </p>
            </div>
          </div>
        ) : (
          <>
            <StepHeader step={step} />
            <div className="mt-8">
              {step === 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Full name" helper="Who should MDemx contact about this project?" required>
                    <input className="form-field" value={payload.client.fullName} onChange={(event) => updateClient("fullName", event.target.value)} required />
                  </Field>
                  <Field label="Email address" helper="Used for the proposal and project follow-up." required>
                    <input className="form-field" type="email" value={payload.client.email} onChange={(event) => updateClient("email", event.target.value)} required />
                  </Field>
                  <Field label="Phone number" helper="Optional, but useful for quick clarification.">
                    <input className="form-field" value={payload.client.phone} onChange={(event) => updateClient("phone", event.target.value)} />
                  </Field>
                  <Field label="Business name" helper="The name that should appear on the website or proposal." required>
                    <input className="form-field" value={payload.client.businessName} onChange={(event) => updateClient("businessName", event.target.value)} required />
                  </Field>
                  <Field label="Business type" helper="This helps MDemx shape the right website structure.">
                    <Select value={payload.client.businessType} options={businessTypeOptions} onChange={(value) => updateClient("businessType", value)} />
                  </Field>
                </div>
              ) : null}

              {step === 1 ? (
                <div>
                  <Field label="How many websites do you need?" helper="Choose 1 to 8. Each website will get its own requirements section." required>
                    <input
                      className="form-field"
                      type="number"
                      min={1}
                      max={8}
                      value={payload.websiteCount}
                      onChange={(event) => updateWebsiteCount(Number(event.target.value))}
                    />
                  </Field>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {payload.websites.map((website, index) => (
                      <div key={index} className="rounded-3xl border border-[var(--line)] bg-white/[0.035] p-4">
                        <p className="text-sm font-semibold text-white">Website {index + 1}</p>
                        <p className="mt-1 text-sm text-[var(--muted)]">{website.websiteName || "Details to complete"}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {step === 2 ? (
                <div className="grid gap-6">
                  {payload.websites.map((website, index) => (
                    <WebsiteDetails
                      key={index}
                      index={index}
                      website={website}
                      updateWebsite={updateWebsite}
                      toggleValue={toggleWebsiteValue}
                    />
                  ))}
                </div>
              ) : null}

              {step === 3 ? (
                <div className="grid gap-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Primary colour" helper="Pick the main colour you want the design to use.">
                      <input className="h-14 w-full rounded-2xl border border-[var(--line)] bg-white/5 p-2" type="color" value={payload.design.primaryColour} onChange={(event) => updateDesign("primaryColour", event.target.value)} />
                    </Field>
                    <Field label="Secondary colour" helper="Pick a supporting colour for accents or contrast.">
                      <input className="h-14 w-full rounded-2xl border border-[var(--line)] bg-white/5 p-2" type="color" value={payload.design.secondaryColour} onChange={(event) => updateDesign("secondaryColour", event.target.value)} />
                    </Field>
                    <Field label="Font/style preference" helper="Example: clean sans-serif, luxury serif, bold headings, simple and modern.">
                      <input className="form-field" value={payload.design.fontPreference} onChange={(event) => updateDesign("fontPreference", event.target.value)} />
                    </Field>
                  </div>
                  <Checklist title="Overall style" options={styleOptions} selected={payload.design.stylePreferences} onToggle={toggleDesignStyle} />
                  <div className="grid gap-4 md:grid-cols-2">
                    <FileField label="Upload logo" helper="Files are not uploaded yet; names are saved for database/email integration." onChange={(files) => setFileNames("logoFileNames", files)} fileNames={payload.design.logoFileNames} />
                    <FileField label="Upload brand assets/images" helper="Attach brand photos, menus, brochures, or example media later." onChange={(files) => setFileNames("assetFileNames", files)} fileNames={payload.design.assetFileNames} multiple />
                  </div>
                </div>
              ) : null}

              {step === 4 ? (
                <WebsiteChecklistSection
                  websites={payload.websites}
                  title="Pages required"
                  options={pageOptions}
                  field="pagesNeeded"
                  toggleValue={toggleWebsiteValue}
                />
              ) : null}

              {step === 5 ? (
                <WebsiteChecklistSection
                  websites={payload.websites}
                  title="Features required"
                  options={featureOptions}
                  field="featuresNeeded"
                  toggleValue={toggleWebsiteValue}
                />
              ) : null}

              {step === 6 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Website copy/text" helper="Do you already have the wording for the website?">
                    <Select value={payload.content.copyReady} options={readinessOptions} onChange={(value) => updateContent("copyReady", value)} />
                  </Field>
                  <Field label="Images/photos" helper="Do you have photos, product images, or project images ready?">
                    <Select value={payload.content.imagesReady} options={readinessOptions} onChange={(value) => updateContent("imagesReady", value)} />
                  </Field>
                  <Field label="Brand assets" helper="Logo, colours, brand guide, social images, menus, PDFs, or brochures.">
                    <Select value={payload.content.brandAssetsReady} options={readinessOptions} onChange={(value) => updateContent("brandAssetsReady", value)} />
                  </Field>
                  <Field label="Content notes" helper="Tell MDemx what content exists and what needs to be created." className="md:col-span-2">
                    <textarea className="form-field min-h-32" value={payload.content.contentNotes} onChange={(event) => updateContent("contentNotes", event.target.value)} />
                  </Field>
                </div>
              ) : null}

              {step === 7 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Do you already have a domain?" helper="Example: yourbusiness.co.uk">
                    <Select value={payload.domainHosting.hasDomain} options={["Yes", "No", "Not sure"]} onChange={(value) => updateDomain("hasDomain", value)} />
                  </Field>
                  <Field label="Domain name" helper="Add the domain if you already own one.">
                    <input className="form-field" value={payload.domainHosting.domainName} onChange={(event) => updateDomain("domainName", event.target.value)} placeholder="example.co.uk" />
                  </Field>
                  <Field label="Do you need hosting?" helper="MDemx can help with hosting, SSL, and launch setup.">
                    <Select value={payload.domainHosting.needsHosting} options={["Yes", "No", "Not sure"]} onChange={(value) => updateDomain("needsHosting", value)} />
                  </Field>
                  <Field label="Do you need business email?" helper="Example: info@yourbusiness.co.uk">
                    <Select value={payload.domainHosting.needsBusinessEmail} options={["Yes", "No", "Not sure"]} onChange={(value) => updateDomain("needsBusinessEmail", value)} />
                  </Field>
                  <Field label="Domain and hosting notes" helper="Add DNS, hosting, email, or launch details here." className="md:col-span-2">
                    <textarea className="form-field min-h-32" value={payload.domainHosting.notes} onChange={(event) => updateDomain("notes", event.target.value)} />
                  </Field>
                </div>
              ) : null}

              {step === 8 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Budget range" helper="This helps MDemx recommend the right scope." required>
                    <Select value={payload.project.budget} options={budgetOptions} onChange={(value) => updateProject("budget", value)} />
                  </Field>
                  <Field label="Timeline" helper="When would you like the website to be live?" required>
                    <Select value={payload.project.timeline} options={timelineOptions} onChange={(value) => updateProject("timeline", value)} />
                  </Field>
                  <Field label="Main priority" helper="Example: launch fast, get more enquiries, SEO, online payments, admin dashboard.">
                    <input className="form-field" value={payload.project.priority} onChange={(event) => updateProject("priority", event.target.value)} />
                  </Field>
                </div>
              ) : null}

              {step === 9 ? (
                <div className="grid gap-6">
                  <Field label="Final notes" helper="Anything else MDemx should know before preparing the proposal?">
                    <textarea className="form-field min-h-40" value={payload.project.finalNotes} onChange={(event) => updateProject("finalNotes", event.target.value)} />
                  </Field>
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={payload.security?.website ?? ""}
                    onChange={(event) => setPayload((current) => ({ ...current, security: { ...current.security, website: event.target.value } }))}
                    className="hidden"
                    aria-hidden="true"
                  />
                  <div className="rounded-3xl border border-[var(--line)] bg-[#07110c]/70 p-5">
                    <div className="flex items-start gap-3">
                      <FileText size={22} className="mt-1 shrink-0 text-[var(--mint)]" />
                      <div>
                        <h3 className="text-xl font-semibold text-white">Ready to send your brief?</h3>
                        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                          MDemx will receive your structured requirements, review the websites requested, and use it to prepare the next step.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            {error ? <p className="mt-6 rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-200">{error}</p> : null}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={goBack}
                disabled={step === 0}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--line)] px-5 text-sm font-semibold text-[var(--mint)] transition hover:border-[var(--mint)] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowLeft size={17} /> Back
              </button>
              {step < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--mint)] px-6 text-sm font-semibold text-[#07110c] transition hover:bg-white"
                >
                  Continue <ArrowRight size={17} />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--mint)] px-6 text-sm font-semibold text-[#07110c] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "submitting" ? "Submitting brief..." : "Submit Website Brief"} <Send size={17} />
                </button>
              )}
            </div>
          </>
        )}
      </section>
    </form>
  );
}

function StepHeader({ step }: { step: number }) {
  const copy = [
    ["Client details", "Start with the main contact details for the project."],
    ["Number of websites", "Tell MDemx how many websites you need so each one can be scoped properly."],
    ["Website details", "Add the purpose, audience, goals, colours, examples, and notes for each website."],
    ["Design preferences", "Choose colours, styles, fonts, and brand assets."],
    ["Pages required", "Select the page types needed for each website."],
    ["Features required", "Choose the tools, integrations, and conversion features each website needs."],
    ["Content and media", "Tell MDemx what copy, images, logos, and assets are ready."],
    ["Domain and hosting", "Share domain, hosting, email, and launch requirements."],
    ["Budget and timeline", "Help MDemx recommend the right scope and delivery plan."],
    ["Final notes and submit", "Review the brief and send it to MDemx."],
  ][step];

  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--mint)]">Step {step + 1}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-5xl">{copy[0]}</h2>
      <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--muted)]">{copy[1]}</p>
    </div>
  );
}

function WebsiteDetails({
  index,
  website,
  updateWebsite,
  toggleValue,
}: {
  index: number;
  website: WebsiteRequirement;
  updateWebsite: (index: number, field: keyof WebsiteRequirement, value: string | string[]) => void;
  toggleValue: (index: number, field: "pagesNeeded" | "featuresNeeded" | "stylePreference", value: string) => void;
}) {
  return (
    <article className="rounded-[2rem] border border-[var(--line)] bg-white/[0.035] p-5">
      <h3 className="text-xl font-semibold text-white">Website {index + 1}</h3>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <Field label="Website name" helper="Example: Saba Cafe website, Electrical services website." required>
          <input className="form-field" value={website.websiteName} onChange={(event) => updateWebsite(index, "websiteName", event.target.value)} />
        </Field>
        <Field label="Main goal" helper="Example: get enquiries, sell online, take bookings, show services." required>
          <input className="form-field" value={website.mainGoal} onChange={(event) => updateWebsite(index, "mainGoal", event.target.value)} />
        </Field>
        <Field label="Purpose of the website" helper="Explain what this website needs to do for the business." className="md:col-span-2" required>
          <textarea className="form-field min-h-28" value={website.purpose} onChange={(event) => updateWebsite(index, "purpose", event.target.value)} />
        </Field>
        <Field label="Target audience" helper="Who is the website for? Local customers, businesses, students, diners, community members, etc.">
          <textarea className="form-field min-h-28" value={website.targetAudience} onChange={(event) => updateWebsite(index, "targetAudience", event.target.value)} />
        </Field>
        <Field label="Example websites they like" helper="Add links or describe the websites/designs you like.">
          <textarea className="form-field min-h-28" value={website.exampleWebsites} onChange={(event) => updateWebsite(index, "exampleWebsites", event.target.value)} />
        </Field>
        <Field label="Preferred colour" helper="Pick the main colour for this specific website.">
          <input className="h-14 w-full rounded-2xl border border-[var(--line)] bg-white/5 p-2" type="color" value={website.colourScheme} onChange={(event) => updateWebsite(index, "colourScheme", event.target.value)} />
        </Field>
        <Field label="Secondary colour" helper="A supporting accent or contrast colour.">
          <input className="h-14 w-full rounded-2xl border border-[var(--line)] bg-white/5 p-2" type="color" value={website.secondaryColour} onChange={(event) => updateWebsite(index, "secondaryColour", event.target.value)} />
        </Field>
        <div className="md:col-span-2">
          <Checklist title="Style preference" options={styleOptions} selected={website.stylePreference} onToggle={(option) => toggleValue(index, "stylePreference", option)} />
        </div>
        <Field label="Content/images available" helper="Explain what content and media are ready for this website." className="md:col-span-2">
          <textarea className="form-field min-h-28" value={website.contentAvailable} onChange={(event) => updateWebsite(index, "contentAvailable", event.target.value)} />
        </Field>
        <Field label="Notes" helper="Anything specific for this website." className="md:col-span-2">
          <textarea className="form-field min-h-28" value={website.notes} onChange={(event) => updateWebsite(index, "notes", event.target.value)} />
        </Field>
      </div>
    </article>
  );
}

function WebsiteChecklistSection({
  websites,
  title,
  options,
  field,
  toggleValue,
}: {
  websites: WebsiteRequirement[];
  title: string;
  options: string[];
  field: "pagesNeeded" | "featuresNeeded";
  toggleValue: (index: number, field: "pagesNeeded" | "featuresNeeded" | "stylePreference", value: string) => void;
}) {
  return (
    <div className="grid gap-6">
      {websites.map((website, index) => (
        <article key={index} className="rounded-[2rem] border border-[var(--line)] bg-white/[0.035] p-5">
          <h3 className="text-xl font-semibold text-white">
            {title}: {website.websiteName || `Website ${index + 1}`}
          </h3>
          <p className="mt-2 text-sm text-[var(--muted)]">Choose every option that should be included.</p>
          <div className="mt-5">
            <Checklist options={options} selected={website[field]} onToggle={(option) => toggleValue(index, field, option)} />
          </div>
        </article>
      ))}
    </div>
  );
}

function Field({
  label,
  helper,
  children,
  required,
  className = "",
}: {
  label: string;
  helper: string;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
}) {
  return (
    <label className={`grid gap-2 text-sm font-medium text-white ${className}`}>
      <span>
        {label}
        {required ? <span className="text-[var(--mint)]"> *</span> : null}
      </span>
      <span className="text-xs font-normal leading-5 text-[var(--muted)]">{helper}</span>
      {children}
    </label>
  );
}

function Select({ value, options, onChange }: { value: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <select className="form-field" value={value} onChange={(event) => onChange(event.target.value)}>
      <option value="">Select an option</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

function Checklist({
  title,
  options,
  selected,
  onToggle,
}: {
  title?: string;
  options: string[];
  selected: string[];
  onToggle: (option: string) => void;
}) {
  return (
    <div>
      {title ? <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">{title}</h3> : null}
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {options.map((option) => {
          const active = selected.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => onToggle(option)}
              className={`min-h-12 rounded-2xl border px-4 text-left text-sm font-semibold transition ${
                active
                  ? "border-[var(--mint)] bg-[rgba(167,243,194,0.14)] text-white"
                  : "border-[var(--line)] bg-white/[0.035] text-[var(--muted)] hover:border-[var(--mint)] hover:text-white"
              }`}
            >
              {active ? <Check size={16} className="mr-2 inline text-[var(--mint)]" /> : null}
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function FileField({
  label,
  helper,
  fileNames,
  onChange,
  multiple,
}: {
  label: string;
  helper: string;
  fileNames: string[];
  onChange: (files: FileList | null) => void;
  multiple?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium text-white">
      <span>{label}</span>
      <span className="text-xs font-normal leading-5 text-[var(--muted)]">{helper}</span>
      <span className="flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-[var(--line)] bg-white/[0.035] p-5 text-center transition hover:border-[var(--mint)]">
        <Upload size={24} className="text-[var(--mint)]" />
        <span className="mt-3 text-sm text-[var(--muted)]">{fileNames.length ? fileNames.join(", ") : "Choose files"}</span>
      </span>
      <input type="file" multiple={multiple} className="hidden" onChange={(event) => onChange(event.target.files)} />
    </label>
  );
}

function toggleValue(values: string[], value: string) {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
}

"use client";

import { Send } from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  budgetOptions,
  businessTypeOptions,
  serviceOptions,
  timelineOptions,
} from "@/lib/site";

type FormStatus = "idle" | "submitting" | "success" | "error";

type LeadPayload = {
  fullName: string;
  email: string;
  phone: string;
  businessName: string;
  businessType: string;
  serviceNeeded: string;
  budget: string;
  preferredTimeline: string;
  currentWebsiteUrl: string;
  message: string;
  website: string;
  startedAt: number;
};

export function ContactForm({ selectedService = "" }: { selectedService?: string }) {
  const initialPayload = useMemo<LeadPayload>(
    () => ({
      fullName: "",
      email: "",
      phone: "",
      businessName: "",
      businessType: "",
      serviceNeeded: selectedService,
      budget: "",
      preferredTimeline: "",
      currentWebsiteUrl: "",
      message: "",
      website: "",
      startedAt: 0,
    }),
    [selectedService],
  );

  const [payload, setPayload] = useState(initialPayload);
  const [status, setStatus] = useState<FormStatus>("idle");

  useEffect(() => {
    window.requestAnimationFrame(() => {
      setPayload((current) => ({ ...current, startedAt: Date.now() }));
    });
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, submittedAtClient: Date.now() }),
      });

      if (!response.ok) {
        throw new Error("Lead submission failed");
      }

      setStatus("success");
      setPayload({ ...initialPayload, startedAt: Date.now() });
    } catch {
      setStatus("error");
    }
  }

  function updateField(field: keyof LeadPayload, value: string) {
    setPayload((current) => ({ ...current, [field]: value }));
  }

  return (
    <form onSubmit={onSubmit} className="glass-panel rounded-3xl p-5 md:p-7">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Full name" required>
          <input
            required
            minLength={2}
            maxLength={120}
            value={payload.fullName}
            onChange={(event) => updateField("fullName", event.target.value)}
            className="form-field"
            autoComplete="name"
          />
        </Field>
        <Field label="Email" required>
          <input
            required
            type="email"
            maxLength={160}
            value={payload.email}
            onChange={(event) => updateField("email", event.target.value)}
            className="form-field"
            autoComplete="email"
          />
        </Field>
        <Field label="Phone number">
          <input
            value={payload.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            className="form-field"
            autoComplete="tel"
            inputMode="tel"
            maxLength={40}
          />
        </Field>
        <Field label="Business name">
          <input
            value={payload.businessName}
            onChange={(event) => updateField("businessName", event.target.value)}
            className="form-field"
            autoComplete="organization"
            maxLength={140}
          />
        </Field>
        <Field label="Business type">
          <Select value={payload.businessType} onChange={(value) => updateField("businessType", value)} options={businessTypeOptions} />
        </Field>
        <Field label="Service needed" required>
          <Select
            required
            value={payload.serviceNeeded}
            onChange={(value) => updateField("serviceNeeded", value)}
            options={serviceOptions}
          />
        </Field>
        <Field label="Budget">
          <Select value={payload.budget} onChange={(value) => updateField("budget", value)} options={budgetOptions} />
        </Field>
        <Field label="Preferred timeline">
          <Select
            value={payload.preferredTimeline}
            onChange={(value) => updateField("preferredTimeline", value)}
            options={timelineOptions}
          />
        </Field>
        <Field label="Current website URL" className="md:col-span-2">
          <input
            type="url"
            value={payload.currentWebsiteUrl}
            onChange={(event) => updateField("currentWebsiteUrl", event.target.value)}
            className="form-field"
            placeholder="https://"
            maxLength={240}
          />
        </Field>
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={payload.website}
          onChange={(event) => updateField("website", event.target.value)}
          className="hidden"
          aria-hidden="true"
        />
        <Field label="Message" className="md:col-span-2" required>
          <textarea
            required
            minLength={10}
            maxLength={1600}
            value={payload.message}
            onChange={(event) => updateField("message", event.target.value)}
            className="form-field min-h-36 resize-y"
            placeholder="Tell MDemx what you want to build, improve, or automate."
          />
        </Field>
      </div>

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--mint)] px-6 text-sm font-semibold text-[#07110c] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "submitting" ? "Sending request..." : "Send Project Request"}
          <Send size={17} />
        </button>
        <p className="text-sm text-[var(--muted)]">Quick quote, free consultation, and project enquiry in one simple form.</p>
      </div>

      {status === "success" ? (
        <p className="mt-5 rounded-2xl border border-[var(--line)] bg-[rgba(167,243,194,0.1)] p-4 text-sm font-medium text-[var(--mint)]">
          Thank you. MDemx has received your request and will contact you shortly.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="mt-5 rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-sm font-medium text-red-200">
          Something went wrong. Please try again or message MDemx on WhatsApp.
        </p>
      ) : null}
    </form>
  );
}

function Field({
  label,
  children,
  required,
  className = "",
}: {
  label: string;
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
      {children}
    </label>
  );
}

function Select({
  value,
  onChange,
  options,
  required,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  required?: boolean;
}) {
  return (
    <select required={required} value={value} onChange={(event) => onChange(event.target.value)} className="form-field">
      <option value="">Select an option</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

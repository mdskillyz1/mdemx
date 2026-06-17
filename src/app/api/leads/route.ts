import { NextResponse } from "next/server";
import { addAnalyticsEvent } from "@/lib/analytics";
import { sendClientEmail, sendOwnerEmail } from "@/lib/email";

type LeadSubmission = {
  fullName: string;
  email: string;
  phone?: string;
  businessName?: string;
  businessType?: string;
  serviceNeeded: string;
  budget?: string;
  preferredTimeline?: string;
  currentWebsiteUrl?: string;
  message: string;
  website?: string;
  startedAt?: number;
  submittedAtClient?: number;
};

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<LeadSubmission>;
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const rateLimit = checkRateLimit(ip);
  if (!rateLimit.allowed) {
    return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  const validationError = validateLead(body);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const lead = {
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
    source: "mdemx-website",
    status: "new",
    contact: {
      fullName: body.fullName,
      email: body.email?.toLowerCase().trim(),
      phone: clean(body.phone),
    },
    business: {
      name: clean(body.businessName),
      type: clean(body.businessType),
      currentWebsiteUrl: clean(body.currentWebsiteUrl),
    },
    project: {
      serviceNeeded: clean(body.serviceNeeded),
      budget: clean(body.budget),
      preferredTimeline: clean(body.preferredTimeline),
      message: clean(body.message),
    },
    security: {
      ip,
      rateLimitWindowMs: RATE_LIMIT_WINDOW_MS,
      spamChecks: ["honeypot", "minimum-completion-time", "required-fields", "rate-limit-placeholder"],
    },
  };

  await sendOwnerEmail({
    subject: `New MDemx enquiry: ${lead.project.serviceNeeded || "Website project"}`,
    replyTo: lead.contact.email,
    text: [
      "New MDemx project enquiry",
      "",
      `Name: ${lead.contact.fullName}`,
      `Email: ${lead.contact.email}`,
      `Phone: ${lead.contact.phone || "Not provided"}`,
      `Business: ${lead.business.name || "Not provided"}`,
      `Business type: ${lead.business.type || "Not provided"}`,
      `Service: ${lead.project.serviceNeeded}`,
      `Budget: ${lead.project.budget || "Not provided"}`,
      `Timeline: ${lead.project.preferredTimeline || "Not provided"}`,
      `Current website: ${lead.business.currentWebsiteUrl || "Not provided"}`,
      "",
      "Message",
      lead.project.message,
    ].join("\n"),
  }).catch((error) => {
    console.error("Lead notification email failed", error);
  });

  await sendClientEmail({
    to: lead.contact.email,
    subject: "MDemx has received your project request",
    text: [
      `Hi ${lead.contact.fullName},`,
      "",
      "Thank you for contacting MDemx. Your project request has been received and will be reviewed shortly.",
      "",
      "Summary",
      `Service: ${lead.project.serviceNeeded}`,
      `Budget: ${lead.project.budget || "Not provided"}`,
      `Timeline: ${lead.project.preferredTimeline || "Not provided"}`,
      "",
      "MDemx will contact you with the next step.",
      "",
      "MDemx",
    ].join("\n"),
  }).catch((error) => {
    console.error("Lead client confirmation failed", error);
  });

  addAnalyticsEvent({
    type: "lead_submit",
    sessionId: request.headers.get("x-mdemx-session") || lead.id,
    visitorId: request.headers.get("x-mdemx-visitor") || lead.id,
    path: "/contact",
    label: lead.project.serviceNeeded,
    ip,
    userAgent: request.headers.get("user-agent") || "",
  });

  // TODO: Connect this clean lead object to a database or a CRM.
  // Database: Neon/Postgres, Supabase, PlanetScale, or Vercel Postgres.
  // CRM: HubSpot, Pipedrive, Notion, Airtable, or GoHighLevel.
  // Analytics: send a lead conversion event to GA4/Clarity after consent.
  console.info("New MDemx lead submission", lead);

  return NextResponse.json({
    ok: true,
    message: "Thank you. MDemx has received your request and will contact you shortly.",
    leadId: lead.id,
  });
}

function validateLead(body: Partial<LeadSubmission>) {
  if (body.website) {
    return "Spam detected";
  }

  if (body.startedAt && body.submittedAtClient && body.submittedAtClient - body.startedAt < 1200) {
    return "Submission completed too quickly";
  }

  if (!clean(body.fullName) || !clean(body.email) || !clean(body.serviceNeeded) || !clean(body.message)) {
    return "Missing required fields";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean(body.email))) {
    return "Invalid email address";
  }

  if (clean(body.fullName).length < 2) {
    return "Name is too short";
  }

  if (clean(body.message).length < 10) {
    return "Message is too short";
  }

  if (body.currentWebsiteUrl) {
    try {
      new URL(body.currentWebsiteUrl);
    } catch {
      return "Invalid website URL";
    }
  }

  return null;
}

function clean(value?: string) {
  return value?.trim().slice(0, 1600) ?? "";
}

function checkRateLimit(key: string) {
  const now = Date.now();
  const current = rateLimitStore.get(key);

  if (!current || current.resetAt < now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true };
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false };
  }

  current.count += 1;
  rateLimitStore.set(key, current);
  return { allowed: true };
}

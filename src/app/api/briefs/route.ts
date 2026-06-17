import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { addAnalyticsEvent } from "@/lib/analytics";
import { addBrief, cleanBriefPayload, listBriefs, type ClientBriefPayload } from "@/lib/briefs";
import { sendClientEmail, sendOwnerEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 4;
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

export async function GET(request: Request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  return NextResponse.json({ briefs: listBriefs() });
}

export async function POST(request: Request) {
  const body = (await request.json()) as ClientBriefPayload;
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const rateLimit = checkRateLimit(ip);
  if (!rateLimit.allowed) {
    return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  const validationError = validateBrief(body);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const brief = addBrief(cleanBriefPayload(body));

  await notifyOwner(brief).catch((error) => {
    console.error("Brief notification failed", error);
  });

  await sendClientEmail({
    to: brief.client.email,
    subject: "MDemx has received your website brief",
    text: [
      `Hi ${brief.client.fullName},`,
      "",
      "Thank you for submitting your website brief. MDemx has received your requirements and will review the details before getting back to you.",
      "",
      "Brief summary",
      `Business: ${brief.client.businessName}`,
      `Websites requested: ${brief.websiteCount}`,
      `Budget: ${brief.project.budget || "Not provided"}`,
      `Timeline: ${brief.project.timeline || "Not provided"}`,
      "",
      "MDemx will contact you shortly with the next step.",
      "",
      "MDemx",
    ].join("\n"),
  }).catch((error) => {
    console.error("Brief client confirmation failed", error);
  });

  addAnalyticsEvent({
    type: "brief_submit",
    sessionId: request.headers.get("x-mdemx-session") || brief.id,
    visitorId: request.headers.get("x-mdemx-visitor") || brief.id,
    path: "/client-brief",
    label: `${brief.websiteCount} website brief`,
    ip,
    userAgent: request.headers.get("user-agent") || "",
  });

  return NextResponse.json({
    ok: true,
    message: "Thank you. MDemx has received your website brief and will contact you shortly.",
    briefId: brief.id,
  });
}

function validateBrief(body: Partial<ClientBriefPayload>) {
  if (body.security?.website) return "Spam detected";

  if (
    body.security?.startedAt &&
    body.security?.submittedAtClient &&
    body.security.submittedAtClient - body.security.startedAt < 1800
  ) {
    return "Submission completed too quickly";
  }

  if (!body.client?.fullName?.trim() || !body.client.email?.trim() || !body.client.businessName?.trim()) {
    return "Client details are required";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.client.email.trim())) {
    return "Invalid email address";
  }

  if (!body.websiteCount || body.websiteCount < 1 || body.websiteCount > 8) {
    return "Choose between 1 and 8 websites";
  }

  if (!Array.isArray(body.websites) || body.websites.length !== body.websiteCount) {
    return "Website details are incomplete";
  }

  for (const [index, website] of body.websites.entries()) {
    if (!website.websiteName?.trim() || !website.purpose?.trim() || !website.mainGoal?.trim()) {
      return `Website ${index + 1} needs a name, purpose, and main goal`;
    }
  }

  if (!body.project?.budget?.trim() || !body.project.timeline?.trim()) {
    return "Budget and timeline are required";
  }

  return null;
}

async function notifyOwner(brief: ReturnType<typeof addBrief>) {
  const summary = [
    `New MDemx client brief: ${brief.client.businessName}`,
    `Name: ${brief.client.fullName}`,
    `Email: ${brief.client.email}`,
    `Phone: ${brief.client.phone || "Not provided"}`,
    `Websites requested: ${brief.websiteCount}`,
    `Budget: ${brief.project.budget}`,
    `Timeline: ${brief.project.timeline}`,
    "",
    ...brief.websites.map((website, index) =>
      [
        `Website ${index + 1}: ${website.websiteName}`,
        `Purpose: ${website.purpose}`,
        `Goal: ${website.mainGoal}`,
        `Pages: ${website.pagesNeeded.join(", ") || "Not selected"}`,
        `Features: ${website.featuresNeeded.join(", ") || "Not selected"}`,
        `Style: ${website.stylePreference.join(", ") || "Not selected"}`,
        `Notes: ${website.notes || "None"}`,
      ].join("\n"),
    ),
  ].join("\n\n");

  if (process.env.BRIEF_WEBHOOK_URL) {
    await fetch(process.env.BRIEF_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event: "client_brief.created", brief, summary }),
    });
  }

  await sendOwnerEmail({
    subject: `New website brief from ${brief.client.businessName}`,
    text: summary,
    replyTo: brief.client.email,
  });

  // TODO: Replace the in-memory store with a real database adapter:
  // Neon/Supabase/Postgres, Vercel Postgres, Airtable, Notion, or a CRM.
  console.info("New MDemx client brief", { brief, summary });
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

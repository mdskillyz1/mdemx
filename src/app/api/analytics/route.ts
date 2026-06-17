import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { addAnalyticsEvent, getAnalyticsSummary, type AnalyticsEventType } from "@/lib/analytics";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  return NextResponse.json(getAnalyticsSummary());
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    type?: AnalyticsEventType;
    sessionId?: string;
    visitorId?: string;
    path?: string;
    title?: string;
    label?: string;
    href?: string;
    durationMs?: number;
  };

  if (!body.type || !body.sessionId || !body.visitorId || !body.path) {
    return NextResponse.json({ error: "Missing analytics fields" }, { status: 400 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  addAnalyticsEvent({
    type: body.type,
    sessionId: clean(body.sessionId, 80),
    visitorId: clean(body.visitorId, 80),
    path: clean(body.path, 260),
    title: clean(body.title, 160),
    label: clean(body.label, 160),
    href: clean(body.href, 400),
    durationMs: typeof body.durationMs === "number" ? Math.max(0, Math.min(body.durationMs, 24 * 60 * 60 * 1000)) : undefined,
    referrer: clean(request.headers.get("referer") || "", 400),
    userAgent: clean(request.headers.get("user-agent") || "", 400),
    ip,
  });

  return NextResponse.json({ ok: true });
}

function clean(value = "", maxLength = 1600) {
  return String(value).trim().slice(0, maxLength);
}

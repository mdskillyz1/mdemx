export type AnalyticsEventType =
  | "page_view"
  | "click"
  | "heartbeat"
  | "brief_popup_view"
  | "brief_popup_click"
  | "lead_submit"
  | "brief_submit";

export type AnalyticsEvent = {
  id: string;
  type: AnalyticsEventType;
  sessionId: string;
  visitorId: string;
  path: string;
  title?: string;
  label?: string;
  href?: string;
  referrer?: string;
  userAgent?: string;
  ip?: string;
  durationMs?: number;
  createdAt: string;
};

type AnalyticsStoreState = {
  events: AnalyticsEvent[];
};

const globalForAnalytics = globalThis as typeof globalThis & {
  mdemxAnalyticsStore?: AnalyticsStoreState;
};

export const analyticsStore = globalForAnalytics.mdemxAnalyticsStore ?? { events: [] };
globalForAnalytics.mdemxAnalyticsStore = analyticsStore;

const MAX_EVENTS = 5000;

export function addAnalyticsEvent(event: Omit<AnalyticsEvent, "id" | "createdAt">) {
  const record: AnalyticsEvent = {
    ...event,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  analyticsStore.events.unshift(record);
  analyticsStore.events = analyticsStore.events.slice(0, MAX_EVENTS);

  return record;
}

export function getAnalyticsSummary() {
  const events = analyticsStore.events;
  const pageViews = events.filter((event) => event.type === "page_view");
  const clicks = events.filter((event) => event.type === "click" || event.type === "brief_popup_click");
  const sessions = new Set(events.map((event) => event.sessionId).filter(Boolean));
  const visitors = new Set(events.map((event) => event.visitorId).filter(Boolean));
  const heartbeatBySession = new Map<string, number>();

  for (const event of events) {
    if (event.type === "heartbeat" && event.durationMs) {
      heartbeatBySession.set(event.sessionId, Math.max(heartbeatBySession.get(event.sessionId) ?? 0, event.durationMs));
    }
  }

  const totalTimeMs = [...heartbeatBySession.values()].reduce((sum, value) => sum + value, 0);
  const avgTimeMs = heartbeatBySession.size ? Math.round(totalTimeMs / heartbeatBySession.size) : 0;

  return {
    totals: {
      events: events.length,
      visitors: visitors.size,
      sessions: sessions.size,
      pageViews: pageViews.length,
      clicks: clicks.length,
      leads: events.filter((event) => event.type === "lead_submit").length,
      briefs: events.filter((event) => event.type === "brief_submit").length,
      avgTimeMs,
      totalTimeMs,
    },
    topPages: topBy(pageViews.map((event) => event.path), 8),
    topClicks: topBy(clicks.map((event) => event.label || event.href || "Unknown click"), 10),
    recentEvents: events.slice(0, 80),
    hourly: buildHourly(events),
  };
}

function topBy(values: string[], limit: number) {
  const counts = new Map<string, number>();

  for (const value of values) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([label, value]) => ({ label, value }));
}

function buildHourly(events: AnalyticsEvent[]) {
  const counts = new Map<string, { pageViews: number; clicks: number; leads: number; briefs: number }>();

  for (let index = 23; index >= 0; index -= 1) {
    const date = new Date(Date.now() - index * 60 * 60 * 1000);
    const key = date.toISOString().slice(0, 13);
    counts.set(key, { pageViews: 0, clicks: 0, leads: 0, briefs: 0 });
  }

  for (const event of events) {
    const key = event.createdAt.slice(0, 13);
    const bucket = counts.get(key);
    if (!bucket) continue;
    if (event.type === "page_view") bucket.pageViews += 1;
    if (event.type === "click" || event.type === "brief_popup_click") bucket.clicks += 1;
    if (event.type === "lead_submit") bucket.leads += 1;
    if (event.type === "brief_submit") bucket.briefs += 1;
  }

  return [...counts.entries()].map(([hour, value]) => ({ hour, ...value }));
}

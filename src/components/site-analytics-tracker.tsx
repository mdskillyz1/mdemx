"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const VISITOR_KEY = "mdemx_visitor_id";
const SESSION_KEY = "mdemx_session_id";
const SESSION_STARTED_KEY = "mdemx_session_started_at";

export function SiteAnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    track("page_view", { title: document.title });

    const clickHandler = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest("a,button") : null;
      if (!target) return;

      const label = cleanLabel(target.textContent || target.getAttribute("aria-label") || target.getAttribute("title") || "Click");
      const href = target instanceof HTMLAnchorElement ? target.href : "";

      track("click", { label, href });
    };

    document.addEventListener("click", clickHandler);

    return () => document.removeEventListener("click", clickHandler);
  }, [pathname]);

  useEffect(() => {
    const startedAt = Number(window.sessionStorage.getItem(SESSION_STARTED_KEY) || Date.now());
    window.sessionStorage.setItem(SESSION_STARTED_KEY, String(startedAt));

    const sendHeartbeat = () => {
      track("heartbeat", { durationMs: Date.now() - startedAt });
    };

    const interval = window.setInterval(sendHeartbeat, 15000);
    window.addEventListener("beforeunload", sendHeartbeat);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("beforeunload", sendHeartbeat);
      sendHeartbeat();
    };
  }, []);

  return null;
}

export function track(type: string, data: Record<string, string | number | undefined> = {}) {
  if (typeof window === "undefined") return;

  const visitorId = getOrCreateId(window.localStorage, VISITOR_KEY, "visitor");
  const sessionId = getOrCreateId(window.sessionStorage, SESSION_KEY, "session");

  const payload = {
    type,
    sessionId,
    visitorId,
    path: window.location.pathname,
    title: document.title,
    ...data,
  };

  const body = JSON.stringify(payload);

  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/analytics", new Blob([body], { type: "application/json" }));
    return;
  }

  fetch("/api/analytics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {});
}

function getOrCreateId(storage: Storage, key: string, prefix: string) {
  const existing = storage.getItem(key);
  if (existing) return existing;

  const value = `${prefix}_${crypto.randomUUID()}`;
  storage.setItem(key, value);
  return value;
}

function cleanLabel(value: string) {
  return value.replace(/\s+/g, " ").trim().slice(0, 120);
}

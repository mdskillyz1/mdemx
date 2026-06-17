"use client";

import { ArrowRight, FileText, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { track } from "@/components/site-analytics-tracker";

const POPUP_KEY = "mdemx_brief_popup_dismissed";

export function ClientBriefPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem(POPUP_KEY) === "yes") return;
    if (window.location.pathname.startsWith("/admin")) return;
    if (window.location.pathname.startsWith("/client-brief")) return;

    const timer = window.setTimeout(() => {
      setVisible(true);
      track("brief_popup_view", { label: "Client brief popup shown" });
    }, 9000);

    return () => window.clearTimeout(timer);
  }, []);

  function close() {
    window.localStorage.setItem(POPUP_KEY, "yes");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <aside className="fixed bottom-24 left-4 right-4 z-50 mx-auto max-w-lg rounded-[2rem] border border-[var(--line)] bg-[#08110d]/96 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.46)] backdrop-blur-xl md:bottom-24 md:left-auto md:right-6 md:mx-0">
      <button
        type="button"
        onClick={close}
        className="absolute right-4 top-4 grid size-8 place-items-center rounded-full border border-[var(--line)] text-[var(--muted)] transition hover:border-[var(--mint)] hover:text-white"
        aria-label="Close website brief popup"
      >
        <X size={16} />
      </button>
      <div className="pr-10">
        <div className="grid size-12 place-items-center rounded-2xl bg-[rgba(167,243,194,0.14)] text-[var(--mint)]">
          <FileText size={22} />
        </div>
        <p className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--mint)]">Free website brief</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">Want an accurate quote for your website?</h2>
        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
          Answer a few structured questions and MDemx can understand your pages, features, design, budget, timeline, and whether you need one website or several.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <Link
            href="/client-brief"
            onClick={() => {
              track("brief_popup_click", { label: "Start website brief popup CTA", href: "/client-brief" });
              close();
            }}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--mint)] px-5 text-sm font-semibold text-[#07110c] transition hover:bg-white"
          >
            Start Website Brief <ArrowRight size={17} />
          </Link>
          <Link
            href="/contact?service=Book%20a%20Free%20Consultation"
            onClick={() => {
              track("brief_popup_click", { label: "Book consultation popup CTA", href: "/contact?service=Book%20a%20Free%20Consultation" });
              close();
            }}
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--line)] px-5 text-sm font-semibold text-[var(--mint)] transition hover:border-[var(--mint)] hover:text-white"
          >
            Book a Call
          </Link>
        </div>
      </div>
    </aside>
  );
}

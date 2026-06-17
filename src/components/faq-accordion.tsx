"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { faqs } from "@/lib/site";

export function FAQAccordion({ items = faqs }: { items?: typeof faqs }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="grid gap-3">
      {items.map((item, index) => {
        const open = openIndex === index;
        return (
          <div key={item.question} className="rounded-3xl border border-[var(--line)] bg-white/[0.045]">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left text-base font-semibold text-white md:px-6"
              onClick={() => setOpenIndex(open ? -1 : index)}
              aria-expanded={open}
            >
              <span>{item.question}</span>
              <ChevronDown
                size={20}
                className={`shrink-0 text-[var(--mint)] transition ${open ? "rotate-180" : ""}`}
              />
            </button>
            {open ? <p className="px-5 pb-5 text-sm leading-6 text-[var(--muted)] md:px-6">{item.answer}</p> : null}
          </div>
        );
      })}
    </div>
  );
}

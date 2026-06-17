"use client";

import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import { ButtonLink } from "@/components/button-link";
import { Logo } from "@/components/logo";
import { navLinks, site } from "@/lib/site";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  function handleMobileLinkClick(event: MouseEvent<HTMLAnchorElement>, href: string) {
    closeMobileMenu();

    if (!href.includes("#")) {
      return;
    }

    const [targetPath, hash] = href.split("#");
    const samePage = !targetPath || targetPath === pathname;

    if (!samePage || !hash) {
      return;
    }

    event.preventDefault();
    window.requestAnimationFrame(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", `#${hash}`);
    });
  }

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#08110d]/86 backdrop-blur-xl">
      <nav className="container-shell flex h-20 items-center justify-between gap-5">
        <Link href="/" aria-label="MDemx home">
          <Logo size="sm" />
        </Link>

        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-[var(--muted)] transition hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${site.phone}`}
            aria-label="Call MDemx"
            className="grid size-11 place-items-center rounded-full border border-[var(--line)] bg-white/5 text-[var(--mint)] transition hover:border-[var(--mint)] hover:text-white"
          >
            <Phone size={17} />
          </a>
          <a
            href={`mailto:${site.email}`}
            aria-label="Email MDemx"
            className="grid size-11 place-items-center rounded-full border border-[var(--line)] bg-white/5 text-[var(--mint)] transition hover:border-[var(--mint)] hover:text-white"
          >
            <Mail size={17} />
          </a>
          <a
            href={site.whatsapp}
            className="text-sm font-semibold text-[var(--mint)] transition hover:text-white"
          >
            WhatsApp
          </a>
          <ButtonLink href="/contact?service=Book%20a%20Free%20Consultation">Book a Free Consultation</ButtonLink>
        </div>

        <div className="lg:hidden">
          <button
            type="button"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
            className="grid size-11 place-items-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-[var(--mint)]"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="grid gap-1.5">
              <span className={`h-0.5 w-5 bg-current transition ${mobileMenuOpen ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`h-0.5 w-5 bg-current transition ${mobileMenuOpen ? "opacity-0" : ""}`} />
              <span className={`h-0.5 w-5 bg-current transition ${mobileMenuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
            </span>
          </button>
          <div
            id="mobile-navigation"
            className={`fixed left-0 right-0 top-20 overflow-hidden border-t border-white/10 bg-[#08110d] shadow-[0_30px_80px_rgba(0,0,0,0.35)] transition-all duration-300 ease-out ${
              mobileMenuOpen ? "max-h-[calc(100vh-5rem)] opacity-100" : "max-h-0 opacity-0"
            }`}
            aria-hidden={!mobileMenuOpen}
          >
            <div className="container-shell grid gap-2 py-5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(event) => handleMobileLinkClick(event, link.href)}
                  tabIndex={mobileMenuOpen ? 0 : -1}
                  className="rounded-2xl px-4 py-3 text-base font-medium text-white hover:bg-white/5"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 grid gap-3 sm:grid-cols-2">
                <ButtonLink
                  href="/contact?service=Book%20a%20Free%20Consultation"
                  onClick={(event) => handleMobileLinkClick(event, "/contact?service=Book%20a%20Free%20Consultation")}
                  tabIndex={mobileMenuOpen ? 0 : -1}
                >
                  Book a Free Consultation
                </ButtonLink>
                <a
                  href={`tel:${site.phone}`}
                  onClick={closeMobileMenu}
                  tabIndex={mobileMenuOpen ? 0 : -1}
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--line)] px-5 text-sm font-semibold text-[var(--mint)]"
                >
                  Call MDemx
                </a>
                <a
                  href={`mailto:${site.email}`}
                  onClick={closeMobileMenu}
                  tabIndex={mobileMenuOpen ? 0 : -1}
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--line)] px-5 text-sm font-semibold text-[var(--mint)]"
                >
                  Email MDemx
                </a>
                <a
                  href={site.whatsapp}
                  onClick={closeMobileMenu}
                  tabIndex={mobileMenuOpen ? 0 : -1}
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--line)] px-5 text-sm font-semibold text-[var(--mint)]"
                >
                  Message on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

import { Calculator, Mail, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import { site } from "@/lib/site";

export function FloatingContactDock() {
  const actions = [
    {
      href: site.whatsapp,
      label: "WhatsApp",
      icon: MessageCircle,
      external: true,
    },
    {
      href: `tel:${site.phone}`,
      label: "Call",
      icon: Phone,
      external: true,
    },
    {
      href: `mailto:${site.email}`,
      label: "Email",
      icon: Mail,
      external: true,
    },
    {
      href: "/contact?service=Book%20a%20Free%20Consultation",
      label: "Quote",
      icon: Calculator,
      external: false,
    },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-1.5rem)] max-w-md -translate-x-1/2 rounded-full border border-[var(--line)] bg-[#07110c]/92 p-2 shadow-[0_18px_60px_rgba(0,0,0,0.38)] backdrop-blur-xl md:bottom-5 md:left-auto md:right-5 md:w-auto md:max-w-none md:translate-x-0">
      <div className="grid grid-cols-4 gap-2">
        {actions.map((action) => {
          const Icon = action.icon;
          const className =
            "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-3 text-xs font-semibold text-white transition hover:bg-[var(--mint)] hover:text-[#07110c] md:px-4";

          if (action.external) {
            return (
              <a key={action.label} href={action.href} aria-label={`${action.label} MDemx`} className={className}>
                <Icon size={18} />
                <span className="hidden sm:inline">{action.label}</span>
              </a>
            );
          }

          return (
            <Link key={action.label} href={action.href} aria-label="Open MDemx quick quote form" className={className}>
              <Icon size={18} />
              <span className="hidden sm:inline">{action.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

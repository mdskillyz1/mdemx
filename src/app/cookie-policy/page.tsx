import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "MDemx cookie policy placeholder covering essential cookies, analytics, preferences, and future tracking tools.",
  alternates: { canonical: "/cookie-policy" },
  openGraph: {
    title: "MDemx Cookie Policy",
    description: "Cookie policy placeholder for MDemx website visitors.",
    url: "/cookie-policy",
  },
  twitter: {
    card: "summary_large_image",
    title: "MDemx Cookie Policy",
    description: "Cookie policy placeholder for MDemx website visitors.",
  },
};

export default function CookiePolicyPage() {
  const items: [string, string][] = [
    ["What cookies are", "Cookies are small files stored by your browser to help websites work, remember preferences, measure performance, or support marketing tools."],
    ["Essential cookies", "MDemx may use essential cookies or similar storage where needed for website security, form handling, and basic functionality."],
    ["Analytics cookies", "If analytics are added later, they may help MDemx understand page visits, popular content, and website performance."],
    ["Managing cookies", "You can control or delete cookies through your browser settings. Blocking some cookies may affect how parts of the website work."],
    ["Future updates", "This placeholder should be updated if MDemx adds analytics, advertising pixels, embedded content, CRM tools, or consent management."],
    ["Contact", "For cookie questions, email info@mdemx.co.uk."],
  ];

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Cookie Policy"
        text="This placeholder cookie policy explains how MDemx may use cookies and similar technologies. Replace it with reviewed legal wording before launch."
      />
      <section className="container-shell pb-16 md:pb-24">
        <div className="glass-panel rounded-3xl p-6 md:p-8">
          <div className="grid gap-8">
            {items.map(([title, text]) => (
              <div key={title}>
                <h2 className="text-xl font-semibold text-white">{title}</h2>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

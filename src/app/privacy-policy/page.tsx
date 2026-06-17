import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "MDemx privacy policy placeholder covering contact form enquiries, project communications, analytics, and website use.",
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    title: "MDemx Privacy Policy",
    description: "Privacy policy placeholder for MDemx website visitors and enquiries.",
    url: "/privacy-policy",
  },
  twitter: {
    card: "summary_large_image",
    title: "MDemx Privacy Policy",
    description: "Privacy policy placeholder for MDemx website visitors and enquiries.",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        text="This placeholder policy explains how MDemx may handle enquiry information. Replace this text with reviewed legal wording before launch."
      />
      <PolicyContent
        items={[
          ["Information collected", "MDemx may collect your name, email, phone number, business details, website URL, budget, timeline, and project message when you submit an enquiry."],
          ["How information is used", "Your information is used to respond to enquiries, prepare project quotes, communicate about services, and improve the website experience."],
          ["Sharing information", "MDemx does not sell personal information. Information may be shared with trusted service providers only where needed to deliver website, hosting, email, analytics, or business support."],
          ["Data retention", "Enquiry details may be kept for as long as needed to manage communications, quotes, project records, and legal or accounting requirements."],
          ["Your rights", "You can contact MDemx to request access, correction, or deletion of your personal information where applicable under UK data protection law."],
          ["Contact", "For privacy questions, email Info.mdemx@gmail.com."],
        ]}
      />
    </>
  );
}

function PolicyContent({ items }: { items: [string, string][] }) {
  return (
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
  );
}

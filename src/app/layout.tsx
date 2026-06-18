import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { AnalyticsScripts } from "@/components/analytics-scripts";
import { CookieConsent } from "@/components/cookie-consent";
import { ClientBriefPopup } from "@/components/client-brief-popup";
import { FloatingContactDock } from "@/components/floating-whatsapp";
import { Navbar } from "@/components/navbar";
import { SiteAnalyticsTracker } from "@/components/site-analytics-tracker";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: "%s | MDemx",
  },
  description: site.description,
  keywords: site.keywords,
  authors: [{ name: "Muhammed Dem" }],
  creator: "MDemx",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
  },
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: "MDemx",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  alternates: {
    canonical: site.url,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "google-site-verification-placeholder",
    other: {
      "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || "bing-site-verification-placeholder",
    },
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  name: "MDemx",
  founder: "Muhammed Dem",
  url: site.url,
  email: site.email,
  telephone: site.phone,
  areaServed: ["London", "United Kingdom"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "London",
    addressCountry: "GB",
  },
  description: site.description,
  priceRange: "$$",
  sameAs: [site.whatsapp],
  makesOffer: site.services.map((service) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: service,
      areaServed: "London",
    },
  })),
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MDemx",
  url: site.url,
  logo: `${site.url}/mdemx-logo-preview.jpg`,
  email: site.email,
  telephone: site.phone,
  founder: {
    "@type": "Person",
    name: "Muhammed Dem",
    jobTitle: "Founder and web developer",
    worksFor: {
      "@type": "Organization",
      name: "MDemx",
    },
  },
  areaServed: ["London", "United Kingdom"],
  sameAs: [site.whatsapp],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "MDemx",
  url: site.url,
  description: site.description,
  inLanguage: "en-GB",
  potentialAction: {
    "@type": "SearchAction",
    target: `${site.url}/blog?search={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <AnalyticsScripts />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CookieConsent />
        <SiteAnalyticsTracker />
        <ClientBriefPopup />
        <FloatingContactDock />
      </body>
    </html>
  );
}

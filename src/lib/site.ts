import {
  BarChart3,
  Brush,
  Building2,
  Gauge,
  Globe2,
  LayoutDashboard,
  MonitorSmartphone,
  QrCode,
  Search,
  ServerCog,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";

export const site = {
  name: "MDemx",
  title: "MDemx | Web Design & Digital Systems in London",
  description:
    "MDemx builds modern websites, SEO-ready business websites, QR ordering systems, and digital tools for small businesses in London that want more enquiries.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://mdemx.co.uk",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@mdemx.co.uk",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "+447703890837",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_URL || "https://wa.me/447703890837",
  googleReviewUrl:
    process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL || "https://g.page/r/CRDwdpuWd8L8ECE/review",
  googlePlaceId:
    process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID || "ChIJiTLeMbriHmcREPB2m5Z3wvw",
  location: "London, UK",
  keywords: [
    "web design London",
    "small business websites London",
    "restaurant website design",
    "QR ordering system",
    "business website developer UK",
    "affordable website design London",
    "MDemx web design",
    "making a website for a business",
    "how to make a website for my business",
    "website developer London",
    "website designer for small business",
    "website development London",
    "dashboard development London",
    "Power BI consultant London",
    "business automation London",
    "SEO services London",
    "AI automation for businesses",
  ],
  services: [
    "Web Design",
    "Website Development",
    "SEO",
    "QR Ordering",
    "Business Websites",
    "Business Automation",
    "Dashboard Development",
    "Power BI Dashboards",
    "AI Solutions",
    "Custom Business Systems",
    "Hosting",
    "Branding",
    "Web Apps",
  ],
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/blog", label: "Blog" },
  { href: "/client-brief", label: "Brief" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export const services = [
  {
    title: "Web Design & Development",
    slug: "web-design-development",
    icon: MonitorSmartphone,
    summary:
      "Modern, responsive websites built to look sharp, load quickly, and convert visitors into enquiries.",
    included: ["Custom page design", "Next.js development", "Mobile-first layouts", "Conversion-focused CTAs"],
  },
  {
    title: "Restaurant QR Ordering Systems",
    slug: "restaurant-qr-ordering-systems",
    icon: QrCode,
    summary:
      "Digital menu and table ordering flows that help restaurants reduce friction and serve customers faster.",
    included: ["QR menu journey", "Table ordering flow", "Admin-ready structure", "Payment-ready planning"],
  },
  {
    title: "Business Websites",
    slug: "business-websites",
    icon: Building2,
    summary:
      "Clear, professional websites for trades, local services, community groups, and growing small businesses.",
    included: ["Service pages", "Quote forms", "Local SEO structure", "Trust-building content"],
  },
  {
    title: "Admin Dashboards",
    slug: "admin-dashboards",
    icon: LayoutDashboard,
    summary:
      "Simple internal tools and dashboards that make managing enquiries, orders, and content easier.",
    included: ["Dashboard UI", "Role-ready foundations", "Data structure planning", "Workflow automation"],
  },
  {
    title: "SEO Setup",
    slug: "seo-setup",
    icon: Search,
    summary:
      "Technical and local SEO foundations so your website can be discovered by customers searching nearby.",
    included: ["Metadata", "Schema markup", "Sitemap and robots", "Local keyword structure"],
  },
  {
    title: "Hosting & Domain Support",
    slug: "hosting-domain-support",
    icon: ServerCog,
    summary:
      "Practical support for domains, hosting, SSL, email setup, launches, redirects, and ongoing reliability.",
    included: ["Domain guidance", "Hosting setup", "SSL configuration", "Launch support"],
  },
  {
    title: "Logo & Brand Identity",
    slug: "logo-brand-identity",
    icon: Brush,
    summary:
      "Clean brand foundations for small businesses that need to look credible online and offline.",
    included: ["Logo direction", "Colour palette", "Typography guidance", "Social-ready assets"],
  },
  {
    title: "Website Maintenance",
    slug: "website-maintenance",
    icon: Wrench,
    summary:
      "Ongoing improvements, content updates, support, and checks to keep your website healthy after launch.",
    included: ["Content updates", "Performance checks", "Security basics", "Monthly support"],
  },
];

export const projects = [
  {
    title: "Saba Cafe",
    id: "saba-cafe",
    year: "2026",
    location: "Restaurant, London",
    clientType: "Restaurant and cafe",
    services: ["Restaurant website", "QR table ordering", "Admin dashboard"],
    summary:
      "A polished restaurant website and ordering journey planned around mobile browsing, fast menu access, table ordering, and admin-ready operations.",
    challenge:
      "Saba Cafe needed a digital experience that helps customers understand the venue quickly, browse menus on mobile, and move into QR table ordering without staff having to explain the flow every time.",
    outcome:
      "MDemx created a premium mobile-first restaurant structure with strong menu discovery, clear table-ordering pathways, local restaurant SEO foundations, and admin-dashboard planning for future operations.",
    features: ["Mobile menu journey", "QR table ordering", "Admin dashboard plan", "Local restaurant SEO"],
    keyOutcomes: [
      "Clearer customer path from website visit to menu browsing",
      "QR ordering structure ready for table-based service",
      "Mobile-first restaurant content that supports local discovery",
      "Admin dashboard planning for future order and menu management",
    ],
    technologies: ["Next.js", "Responsive UI", "QR journey planning", "Admin dashboard architecture", "Local SEO"],
    clientBenefits: [
      "Reduced ordering friction",
      "More professional restaurant presence",
      "Easier menu discovery on phones",
      "Future-ready operational structure",
    ],
    gallery: [
      { label: "Homepage preview", image: "/work/saba-cafe.svg" },
      { label: "Mobile menu journey", image: "/work/saba-cafe.svg" },
      { label: "QR ordering concept", image: "/work/saba-cafe.svg" },
    ],
    href: "/work#saba-cafe-details",
    liveUrl: "https://www.sabacafe.co.uk/",
    liveLabel: "Visit live website",
    image: "/work/saba-cafe.svg",
    gradient: "from-emerald-300/35 via-lime-200/12 to-white/5",
  },
  {
    title: "Nour Electricals",
    id: "nour-electricals",
    year: "2026",
    location: "Electrical services, UK",
    clientType: "Electrical services",
    services: ["Business website", "Quote form", "SEO setup"],
    summary:
      "A service-led website built to earn trust quickly, explain electrical work clearly, guide visitors into quote requests, and support local search visibility.",
    challenge:
      "Nour Electricals needed a professional online presence that could make the business feel credible immediately and convert visitors into quote requests, calls, and service enquiries.",
    outcome:
      "MDemx shaped a clean business website structure with strong service positioning, quote capture, mobile call routes, trust-building sections, and SEO-ready content for electrical service searches.",
    features: ["Quote form", "Click-to-call CTAs", "Service-area SEO", "Review and trust sections"],
    keyOutcomes: [
      "Clear service pages for customer decision-making",
      "Quote enquiry route placed close to high-intent content",
      "Mobile call and contact routes for urgent enquiries",
      "SEO-ready structure for local electrical service keywords",
    ],
    technologies: ["Next.js", "Lead capture forms", "Local SEO", "Responsive design", "Analytics planning"],
    clientBenefits: [
      "More trustworthy first impression",
      "Faster customer enquiries",
      "Clearer explanation of services",
      "Better foundation for future SEO growth",
    ],
    gallery: [
      { label: "Service homepage", image: "/work/nour-electricals.svg" },
      { label: "Quote journey", image: "/work/nour-electricals.svg" },
      { label: "Trust sections", image: "/work/nour-electricals.svg" },
    ],
    href: "/work#nour-electricals-details",
    liveUrl: "https://nourelectrical.com/",
    liveLabel: "Visit live website",
    image: "/work/nour-electricals.svg",
    gradient: "from-green-200/30 via-cyan-100/10 to-white/5",
  },
];

export const processSteps = [
  { title: "Discovery", text: "We clarify goals, audience, services, competitors, and what the site needs to achieve.", icon: Sparkles },
  { title: "Design", text: "MDemx shapes a premium, practical interface that matches the business and builds trust.", icon: Brush },
  { title: "Build", text: "The site is developed responsively with clean code, fast loading, SEO structure, and lead capture.", icon: Gauge },
  { title: "Launch", text: "Domains, hosting, analytics, forms, and final checks are handled before the site goes live.", icon: Globe2 },
  { title: "Support", text: "You get practical help after launch for updates, improvements, and future digital systems.", icon: ShieldCheck },
];

export const faqs = [
  {
    question: "How much does a website cost?",
    answer:
      "It depends on the number of pages, design depth, features, and whether you need systems like booking, ordering, dashboards, or SEO. MDemx can scope a clear quote after a short discovery call.",
  },
  {
    question: "How long does a website take?",
    answer:
      "A focused small business website can often be planned, designed, and launched in a few weeks. Larger builds with ordering systems, dashboards, or complex content can take longer.",
  },
  {
    question: "Do you help with domain and hosting?",
    answer:
      "Yes. MDemx can help with domains, hosting, SSL, DNS, email setup guidance, launch checks, and technical handover.",
  },
  {
    question: "Can you build restaurant ordering systems?",
    answer:
      "Yes. MDemx can design QR menu and ordering flows for restaurants, cafes, and takeaways, with foundations ready for admin tools and payment integrations.",
  },
  {
    question: "Can you redesign an existing website?",
    answer:
      "Yes. Existing websites can be reviewed, redesigned, rebuilt, and improved for mobile usability, speed, SEO, and lead generation.",
  },
  {
    question: "Do you offer maintenance?",
    answer:
      "Yes. Maintenance can cover content updates, small improvements, technical checks, backups guidance, and ongoing website support.",
  },
  {
    question: "Will the website work on mobile?",
    answer:
      "Yes. Every MDemx website is designed mobile-first and tested across responsive breakpoints for phones, tablets, and desktop screens.",
  },
  {
    question: "Do you help with SEO?",
    answer:
      "Yes. MDemx sets up metadata, headings, internal links, local keywords, schema markup, sitemap, robots.txt, and performance-minded foundations.",
  },
];

export const stats = [
  { value: "2", label: "Featured Builds" },
  { value: "London", label: "Based" },
  { value: "Fast", label: "Turnaround" },
  { value: "Small", label: "Business Focused" },
];

export const serviceOptions = [
  "Book a Free Consultation",
  "Web Design & Development",
  "Restaurant QR Ordering Systems",
  "Business Websites",
  "Admin Dashboards",
  "SEO Setup",
  "Free Website Audit",
  "Free SEO Audit",
  "Quote Request",
  "Business Automation",
  "Power BI Dashboard",
  "AI Automation",
  "Hosting & Domain Support",
  "Logo & Brand Identity",
  "Website Maintenance",
];

export const budgetOptions = [
  "Under GBP 1,000",
  "GBP 1,000 - GBP 2,500",
  "GBP 2,500 - GBP 5,000",
  "GBP 5,000+",
  "Not sure yet",
];

export const timelineOptions = [
  "ASAP",
  "2-4 weeks",
  "1-2 months",
  "Flexible",
  "Just exploring",
];

export const businessTypeOptions = [
  "Restaurant / Cafe",
  "Trade / Local Service",
  "Community Organisation",
  "Retail / Ecommerce",
  "Professional Services",
  "Startup",
  "Other",
];

export const analyticsHighlights = [
  { label: "SEO-ready pages", value: "8" },
  { label: "Lead paths", value: "5" },
  { label: "Mobile-first", value: "100%" },
];

export const performancePrinciples = [
  "Fast loading Next.js pages",
  "Clean semantic headings",
  "Internal links across key pages",
  "Accessible forms and buttons",
];

export const resultCards = [
  {
    title: "Look professional",
    text: "A sharp first impression for customers comparing your business online.",
    icon: Sparkles,
  },
  {
    title: "Collect better leads",
    text: "Forms, WhatsApp routes, quote journeys, and CTAs built into the experience.",
    icon: BarChart3,
  },
  {
    title: "Work smarter",
    text: "Digital systems that reduce admin and make common business tasks easier.",
    icon: LayoutDashboard,
  },
];

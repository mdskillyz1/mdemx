import { projects, site } from "@/lib/site";

export type FaqItem = {
  question: string;
  answer: string;
};

export type LocalServicePage = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  keywords: string[];
  hero: string;
  intro: string;
  benefits: string[];
  process: string[];
  faqs: FaqItem[];
  relatedBlogSlugs: string[];
};

export type AnswerPage = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  answer: string;
  sections: { heading: string; body: string }[];
  faqs: FaqItem[];
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  readTime: string;
  keywords: string[];
  sections: { heading: string; body: string }[];
  relatedServiceSlugs: string[];
};

export type CaseStudy = {
  slug: string;
  title: string;
  description: string;
  client: string;
  category: string;
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  relatedServiceSlugs: string[];
};

const serviceFaqs: FaqItem[] = [
  {
    question: "Can MDemx help with content, hosting, and launch?",
    answer:
      "Yes. MDemx can help plan the structure, improve page copy, set up domain and hosting foundations, connect forms, and run launch checks.",
  },
  {
    question: "Will the website be mobile friendly?",
    answer:
      "Yes. MDemx designs mobile-first so customers can browse, enquire, book, or order easily from phones, tablets, and desktop screens.",
  },
  {
    question: "Can this be expanded later?",
    answer:
      "Yes. The site can be built with future additions in mind, including more service pages, booking flows, dashboards, analytics, and client portals.",
  },
];

export const localServicePages: LocalServicePage[] = [
  {
    slug: "web-design-london",
    title: "Web Design London",
    metaTitle: "Web Design London | Small Business Website Designer",
    description:
      "MDemx provides modern web design in London for small businesses that need professional websites, stronger trust, and more customer enquiries.",
    keywords: ["web design London", "affordable website design London", "MDemx web design"],
    hero: "London web design for businesses that need enquiries, trust, and a sharper online presence.",
    intro:
      "MDemx designs clean, fast, SEO-ready websites for London small businesses. The goal is not only a good-looking website, but a practical sales asset with clear messaging, calls to action, and easy contact routes.",
    benefits: [
      "Professional first impression for local customers",
      "Mobile-first pages built for quick decisions",
      "Clear calls to action for calls, WhatsApp, forms, and quotes",
      "SEO structure for location and service keywords",
    ],
    process: ["Discovery and goals", "Page structure and copy", "Premium visual design", "Responsive development", "Launch and support"],
    faqs: serviceFaqs,
    relatedBlogSlugs: ["how-much-does-a-website-cost-in-london", "top-10-features-every-business-website-should-have"],
  },
  {
    slug: "website-development-london",
    title: "Website Development London",
    metaTitle: "Website Development London | Business Website Developer UK",
    description:
      "Next.js website development in London for fast, secure, mobile-friendly business websites and digital systems.",
    keywords: ["website development London", "business website developer UK", "website developer London"],
    hero: "Fast, reliable website development for London businesses that need a site built properly.",
    intro:
      "MDemx develops business websites with clean code, strong page structure, reliable forms, analytics foundations, and room to expand into dashboards or automation later.",
    benefits: [
      "Performance-minded Next.js development",
      "Secure lead capture and validation",
      "Reusable components for easy updates",
      "Foundations for CRM, email, analytics, and dashboard integrations",
    ],
    process: ["Technical scope", "Component build", "CMS or data planning", "Testing across devices", "Deployment to Vercel"],
    faqs: serviceFaqs,
    relatedBlogSlugs: ["why-every-small-business-needs-a-website", "website-seo-checklist-for-small-businesses"],
  },
  {
    slug: "dashboard-development-london",
    title: "Dashboard Development London",
    metaTitle: "Dashboard Development London | Power BI and Admin Dashboards",
    description:
      "MDemx builds admin dashboards and Power BI-style reporting foundations for businesses that need clearer operational data.",
    keywords: ["dashboard development London", "Power BI consultant London", "admin dashboard development"],
    hero: "Dashboards that turn enquiries, invoices, clicks, and customer activity into usable business insight.",
    intro:
      "MDemx helps businesses move from scattered spreadsheets and messages into clearer dashboards for leads, invoices, website performance, and day-to-day workflows.",
    benefits: [
      "Lead and enquiry tracking",
      "Revenue and invoice visibility",
      "Operational status views",
      "Power BI-ready data thinking",
    ],
    process: ["Data discovery", "Metric planning", "Dashboard UI", "Automation logic", "Reporting handover"],
    faqs: serviceFaqs,
    relatedBlogSlugs: ["what-is-power-bi-and-why-does-it-matter", "how-ai-can-help-small-businesses-grow"],
  },
  {
    slug: "restaurant-websites-london",
    title: "Restaurant Websites London",
    metaTitle: "Restaurant Website Design London | QR Ordering Systems",
    description:
      "Restaurant website design in London with QR menus, table ordering journeys, mobile menus, booking routes, and local SEO.",
    keywords: ["restaurant website design London", "QR ordering system", "restaurant websites London"],
    hero: "Restaurant websites and QR ordering systems that make menus, bookings, and orders easier.",
    intro:
      "MDemx builds restaurant and cafe websites that help customers find menus quickly, understand the venue, book a table, order from QR codes, and contact the business with less friction.",
    benefits: [
      "Mobile menu and QR ordering journeys",
      "Booking, call, and WhatsApp routes",
      "Local SEO for restaurant discovery",
      "Admin-ready structure for menus and orders",
    ],
    process: ["Menu and venue review", "Customer journey design", "QR flow planning", "Website build", "Launch support"],
    faqs: serviceFaqs,
    relatedBlogSlugs: ["how-restaurant-qr-ordering-systems-work", "how-to-generate-more-leads-from-your-website"],
  },
  {
    slug: "small-business-websites-london",
    title: "Small Business Websites London",
    metaTitle: "Small Business Websites London | Affordable Website Design",
    description:
      "Affordable small business websites in London for trades, local services, community groups, restaurants, and professional services.",
    keywords: ["small business websites London", "affordable website design London", "business websites UK"],
    hero: "Small business websites that explain what you do and make it easy for customers to enquire.",
    intro:
      "MDemx creates clear, practical websites for small businesses that need credibility, service pages, quote forms, mobile performance, and local SEO without unnecessary complexity.",
    benefits: [
      "Service pages that answer customer questions",
      "Trust-building sections for reviews and examples",
      "Simple quote forms and contact routes",
      "Local keywords and structured data foundations",
    ],
    process: ["Business positioning", "Content plan", "Design", "Build", "SEO and launch"],
    faqs: serviceFaqs,
    relatedBlogSlugs: ["why-every-small-business-needs-a-website", "website-seo-checklist-for-small-businesses"],
  },
  {
    slug: "business-automation-london",
    title: "Business Automation London",
    metaTitle: "Business Automation London | AI and Process Automation",
    description:
      "Business automation in London for small businesses that want smoother enquiries, admin workflows, reporting, and AI-assisted operations.",
    keywords: ["business automation London", "process automation", "AI automation for businesses"],
    hero: "Automation that helps small businesses save time, track work, and respond faster.",
    intro:
      "MDemx can help turn repeated manual tasks into cleaner digital workflows, including enquiry routing, invoice tracking, admin dashboards, notifications, and AI-assisted proposal drafting.",
    benefits: [
      "Less repeated admin",
      "Faster enquiry follow-up",
      "Cleaner status tracking",
      "AI-ready prompts and proposal workflows",
    ],
    process: ["Workflow mapping", "Priority scoring", "Automation design", "Integration planning", "Testing and improvement"],
    faqs: serviceFaqs,
    relatedBlogSlugs: ["how-ai-can-help-small-businesses-grow", "how-to-generate-more-leads-from-your-website"],
  },
  {
    slug: "seo-services-london",
    title: "SEO Services London",
    metaTitle: "SEO Services London | Local SEO for Small Business Websites",
    description:
      "SEO setup in London covering metadata, headings, schema, sitemap, robots.txt, local keywords, and website content structure.",
    keywords: ["SEO services London", "local SEO London", "website SEO checklist"],
    hero: "SEO foundations that help customers and AI search engines understand your business clearly.",
    intro:
      "MDemx sets up the technical and content foundations small businesses need before ongoing SEO: clean headings, metadata, internal links, schema markup, local keywords, sitemap, and search-friendly pages.",
    benefits: [
      "Better page titles and descriptions",
      "Local keyword targeting",
      "Schema markup for services and FAQs",
      "Internal links that help users and crawlers",
    ],
    process: ["SEO audit", "Keyword mapping", "Metadata and headings", "Schema and sitemap", "Content improvement plan"],
    faqs: serviceFaqs,
    relatedBlogSlugs: ["website-seo-checklist-for-small-businesses", "how-to-generate-more-leads-from-your-website"],
  },
];

export const answerPages: AnswerPage[] = [
  {
    slug: "best-web-designer-in-london",
    title: "Best Web Designer in London",
    metaTitle: "Best Web Designer in London | What to Look For",
    description:
      "A practical guide to choosing the best web designer in London, including what small businesses should ask before starting a website.",
    answer:
      "The best web designer in London for a small business is one who can combine strong design, mobile performance, SEO structure, clear calls to action, and practical support after launch. MDemx focuses on websites that help businesses win enquiries, not just look polished.",
    sections: [
      {
        heading: "What makes a good London web designer?",
        body: "A good web designer should understand local customers, explain services clearly, design for mobile first, and build trust quickly through layout, speed, reviews, contact routes, and SEO-friendly structure.",
      },
      {
        heading: "Why MDemx is built for small businesses",
        body: "MDemx is London-based and focuses on practical websites for restaurants, trades, community organisations, and local services. The site is planned around enquiries, quote requests, WhatsApp contact, and future digital systems.",
      },
    ],
    faqs: serviceFaqs,
  },
  {
    slug: "best-website-developer-in-london",
    title: "Best Website Developer in London",
    metaTitle: "Best Website Developer in London | Next.js Business Websites",
    description:
      "Learn what to check when hiring a website developer in London for a fast, secure, conversion-focused business website.",
    answer:
      "The best website developer in London should build fast, secure, mobile-friendly websites with clean code, strong SEO foundations, reliable forms, analytics, and room to expand into dashboards or automation.",
    sections: [
      {
        heading: "Development matters after the design",
        body: "A professional website needs reliable form handling, clear page structure, fast loading, accessible components, and deployment checks. These details affect trust, rankings, and conversion.",
      },
      {
        heading: "MDemx development approach",
        body: "MDemx uses a modern Next.js structure, reusable components, technical SEO, schema, lead forms, and analytics-ready foundations so the website can grow with the business.",
      },
    ],
    faqs: serviceFaqs,
  },
  {
    slug: "how-much-does-a-business-website-cost",
    title: "How Much Does a Business Website Cost?",
    metaTitle: "How Much Does a Business Website Cost in the UK?",
    description:
      "A clear explanation of business website pricing factors including pages, design, content, SEO, forms, dashboards, and automation.",
    answer:
      "A business website cost depends on page count, design detail, content, SEO requirements, forms, booking, payments, dashboards, and ongoing support. Small sites are usually simpler, while automation and custom systems need deeper planning.",
    sections: [
      {
        heading: "Main pricing factors",
        body: "The biggest cost drivers are the number of pages, whether copywriting is needed, custom design depth, integrations, booking or payment flows, dashboard features, and how much SEO content is required.",
      },
      {
        heading: "How MDemx quotes projects",
        body: "MDemx starts with a short brief to understand the goal, timeline, budget, and features. That makes the quote clearer and avoids selling unnecessary extras.",
      },
    ],
    faqs: serviceFaqs,
  },
  {
    slug: "website-design-for-small-businesses",
    title: "Website Design for Small Businesses",
    metaTitle: "Website Design for Small Businesses | MDemx London",
    description:
      "Small business website design guidance for local companies that need trust, enquiries, mobile performance, and SEO-ready pages.",
    answer:
      "Small business website design should make the business easy to understand, easy to trust, and easy to contact. The best small business websites include clear services, proof, contact routes, mobile layouts, and local SEO structure.",
    sections: [
      {
        heading: "What every small business website needs",
        body: "A small business website should explain who you help, what you offer, where you work, why customers should trust you, and how to enquire quickly.",
      },
      {
        heading: "How MDemx designs for conversions",
        body: "MDemx adds service sections, quote forms, WhatsApp buttons, calls, FAQs, case studies, and internal links so visitors always have a next step.",
      },
    ],
    faqs: serviceFaqs,
  },
  {
    slug: "restaurant-website-development",
    title: "Restaurant Website Development",
    metaTitle: "Restaurant Website Development | QR Ordering and Mobile Menus",
    description:
      "Restaurant website development for cafes, takeaways, and venues that need menus, QR ordering, booking routes, and local SEO.",
    answer:
      "Restaurant website development should focus on mobile menus, opening information, bookings, calls, directions, QR ordering, and local search visibility. Customers should find what they need in seconds.",
    sections: [
      {
        heading: "QR ordering and menus",
        body: "QR ordering reduces friction by sending customers directly to a digital menu or order journey. It can be planned around tables, menu categories, upsells, and admin workflows.",
      },
      {
        heading: "Restaurant SEO",
        body: "Restaurant websites should include location, cuisine, opening hours, menus, reviews, photos, and structured data to help customers and search engines understand the venue.",
      },
    ],
    faqs: serviceFaqs,
  },
  {
    slug: "power-bi-dashboard-development",
    title: "Power BI Dashboard Development",
    metaTitle: "Power BI Dashboard Development | Business Reporting Dashboards",
    description:
      "Power BI dashboard development guidance for businesses that need clearer reporting, KPI tracking, and operational visibility.",
    answer:
      "Power BI dashboard development helps businesses turn data into clear views of revenue, leads, workload, customer activity, and performance. Good dashboards focus on decisions, not just charts.",
    sections: [
      {
        heading: "What a useful dashboard tracks",
        body: "Useful dashboards track the metrics that change business decisions: enquiries, conversion rate, invoice status, revenue, traffic sources, popular services, and follow-up workload.",
      },
      {
        heading: "MDemx dashboard thinking",
        body: "MDemx can design web dashboards and data structures that are Power BI-ready, helping small businesses understand performance without wrestling with disconnected tools.",
      },
    ],
    faqs: serviceFaqs,
  },
  {
    slug: "business-process-automation",
    title: "Business Process Automation",
    metaTitle: "Business Process Automation | Save Time With Digital Systems",
    description:
      "Business process automation ideas for small businesses including lead routing, invoice tracking, reminders, dashboards, and AI-assisted workflows.",
    answer:
      "Business process automation means turning repeated manual tasks into reliable digital workflows. For small businesses, this can include lead capture, quote follow-up, invoice tracking, customer emails, reminders, and dashboards.",
    sections: [
      {
        heading: "Where automation helps first",
        body: "The best first automations usually sit around enquiries, quotes, invoices, bookings, and notifications because those tasks directly affect response time and revenue.",
      },
      {
        heading: "How MDemx plans automation",
        body: "MDemx maps the current workflow, identifies repeated steps, and builds practical systems that are easy to use rather than over-complicated.",
      },
    ],
    faqs: serviceFaqs,
  },
  {
    slug: "ai-automation-for-businesses",
    title: "AI Automation for Businesses",
    metaTitle: "AI Automation for Businesses | MDemx Digital Systems",
    description:
      "AI automation ideas for small businesses, including proposal drafts, customer responses, admin workflows, and smarter dashboards.",
    answer:
      "AI automation for businesses is most useful when it supports a clear workflow: summarising client briefs, drafting proposals, preparing email replies, organising leads, and helping teams make decisions faster.",
    sections: [
      {
        heading: "AI should support the business process",
        body: "AI works best when connected to structured forms, clear prompts, and human review. It should reduce admin, not create confusing outputs.",
      },
      {
        heading: "MDemx AI-ready systems",
        body: "MDemx can create forms, dashboards, and proposal workflows that make AI outputs easier to review, refine, and send to clients.",
      },
    ],
    faqs: serviceFaqs,
  },
  {
    slug: "website-design-services-uk",
    title: "Website Design Services UK",
    metaTitle: "Website Design Services UK | Small Business Websites",
    description:
      "Website design services in the UK for small businesses that need modern design, SEO setup, lead capture, and digital systems.",
    answer:
      "Website design services in the UK should cover strategy, design, responsive development, SEO setup, analytics, lead forms, launch support, and practical aftercare.",
    sections: [
      {
        heading: "What UK businesses should expect",
        body: "A proper website service should include planning, mobile design, performance, metadata, forms, sitemap, security basics, and a handover that makes the site easy to maintain.",
      },
      {
        heading: "MDemx UK coverage",
        body: "MDemx is based in London and works with small businesses across the UK, especially those that need websites, dashboards, QR ordering, and automation.",
      },
    ],
    faqs: serviceFaqs,
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "how-much-does-a-website-cost-in-london",
    title: "How Much Does a Website Cost in London?",
    description:
      "A practical guide to London website pricing for small businesses, including design, development, SEO, content, hosting, and digital systems.",
    category: "Web Design",
    date: "2026-06-17",
    readTime: "6 min read",
    keywords: ["website cost London", "web design London", "affordable website design London"],
    sections: [
      {
        heading: "The short answer",
        body: "Website cost in London depends on scope. A simple brochure site costs less than a custom lead-generation website, restaurant ordering system, booking flow, or dashboard-connected business system.",
      },
      {
        heading: "What affects the price",
        body: "Page count, bespoke design, copywriting, SEO content, photography, booking, payments, dashboards, CRM, email automation, and launch support all affect the final quote.",
      },
      {
        heading: "How to get a clear quote",
        body: "Prepare your business goals, example websites, required pages, must-have features, timeline, and budget range. MDemx uses this information to produce a practical scope.",
      },
    ],
    relatedServiceSlugs: ["web-design-london", "small-business-websites-london"],
  },
  {
    slug: "why-every-small-business-needs-a-website",
    title: "Why Every Small Business Needs a Website",
    description:
      "Why small businesses still need a professional website for trust, enquiries, SEO, local discovery, and customer confidence.",
    category: "Business Growth",
    date: "2026-06-17",
    readTime: "5 min read",
    keywords: ["small business websites London", "business website", "website design for small businesses"],
    sections: [
      {
        heading: "A website is your proof point",
        body: "Customers often check your website before calling, visiting, or requesting a quote. A clean website gives them confidence that the business is real, active, and professional.",
      },
      {
        heading: "Social media is not enough",
        body: "Social profiles are useful, but they do not replace clear service pages, search visibility, quote forms, structured content, and owned digital presence.",
      },
      {
        heading: "Websites turn attention into action",
        body: "Good websites include calls, WhatsApp buttons, forms, FAQs, reviews, examples, and location signals so visitors can take the next step immediately.",
      },
    ],
    relatedServiceSlugs: ["small-business-websites-london", "seo-services-london"],
  },
  {
    slug: "top-10-features-every-business-website-should-have",
    title: "Top 10 Features Every Business Website Should Have",
    description:
      "The essential features every business website should include to build trust, rank better, and generate more leads.",
    category: "Web Design",
    date: "2026-06-17",
    readTime: "7 min read",
    keywords: ["business website features", "lead generation website", "small business websites London"],
    sections: [
      {
        heading: "The essential features",
        body: "A business website should include a clear homepage, service pages, contact form, click-to-call buttons, WhatsApp, testimonials, FAQs, case studies, location signals, and SEO metadata.",
      },
      {
        heading: "The features that improve conversion",
        body: "Quick quote forms, consultation buttons, pricing guidance, strong calls to action, and related case studies help visitors decide faster.",
      },
      {
        heading: "The features that help long-term growth",
        body: "Analytics, sitemap, schema, blog content, internal links, and maintainable components make it easier to improve the website over time.",
      },
    ],
    relatedServiceSlugs: ["web-design-london", "website-development-london"],
  },
  {
    slug: "how-ai-can-help-small-businesses-grow",
    title: "How AI Can Help Small Businesses Grow",
    description:
      "Practical AI ideas for small businesses, including proposal drafting, customer follow-up, analytics summaries, admin workflows, and automation.",
    category: "AI",
    date: "2026-06-17",
    readTime: "6 min read",
    keywords: ["AI automation for businesses", "small business automation", "business automation London"],
    sections: [
      {
        heading: "AI is best when tied to a workflow",
        body: "AI becomes valuable when it helps with repeated business tasks such as summarising briefs, drafting proposals, writing customer replies, categorising leads, and preparing reports.",
      },
      {
        heading: "Good inputs create better outputs",
        body: "Structured website forms, clear questions, and clean data make AI-generated content more useful and easier to review.",
      },
      {
        heading: "Human review still matters",
        body: "AI should support decision-making, not replace business judgement. The strongest setup keeps people in control while reducing admin time.",
      },
    ],
    relatedServiceSlugs: ["business-automation-london", "dashboard-development-london"],
  },
  {
    slug: "what-is-power-bi-and-why-does-it-matter",
    title: "What Is Power BI and Why Does It Matter?",
    description:
      "A simple guide to Power BI, dashboards, KPIs, and why better reporting helps businesses make smarter decisions.",
    category: "Power BI",
    date: "2026-06-17",
    readTime: "5 min read",
    keywords: ["Power BI consultant London", "dashboard development London", "business reporting"],
    sections: [
      {
        heading: "Power BI in simple terms",
        body: "Power BI is a reporting tool that helps businesses turn data into dashboards. It can show sales, leads, invoices, workload, customer trends, and performance at a glance.",
      },
      {
        heading: "Why dashboards matter",
        body: "Dashboards help businesses stop guessing. They make it easier to see what is working, where leads come from, what needs follow-up, and which services generate revenue.",
      },
      {
        heading: "Start with the right metrics",
        body: "Before building dashboards, define the decisions you want to make. A dashboard should make action easier, not just display numbers.",
      },
    ],
    relatedServiceSlugs: ["dashboard-development-london", "business-automation-london"],
  },
  {
    slug: "how-restaurant-qr-ordering-systems-work",
    title: "How Restaurant QR Ordering Systems Work",
    description:
      "How QR ordering systems work for restaurants, cafes, and takeaways, including menus, table ordering, admin tools, and customer experience.",
    category: "Restaurant Technology",
    date: "2026-06-17",
    readTime: "6 min read",
    keywords: ["QR ordering system", "restaurant website design", "restaurant websites London"],
    sections: [
      {
        heading: "The basic flow",
        body: "Customers scan a QR code, open a mobile menu, choose items, submit an order, and the restaurant receives the order in a planned workflow.",
      },
      {
        heading: "What makes the system work well",
        body: "A good QR ordering setup needs fast mobile pages, clear categories, table identification, allergen or item notes, admin controls, and a simple customer journey.",
      },
      {
        heading: "Why restaurants use QR ordering",
        body: "QR ordering can reduce friction, speed up service, make menus easier to update, and create a more organised ordering experience.",
      },
    ],
    relatedServiceSlugs: ["restaurant-websites-london", "website-development-london"],
  },
  {
    slug: "website-seo-checklist-for-small-businesses",
    title: "Website SEO Checklist for Small Businesses",
    description:
      "A clear SEO checklist for small business websites covering titles, headings, schema, local keywords, sitemap, speed, and internal links.",
    category: "SEO",
    date: "2026-06-17",
    readTime: "7 min read",
    keywords: ["SEO services London", "website SEO checklist", "local SEO London"],
    sections: [
      {
        heading: "Technical basics",
        body: "Set clear title tags, meta descriptions, canonical URLs, sitemap.xml, robots.txt, image alt text, clean headings, and structured data.",
      },
      {
        heading: "Local SEO basics",
        body: "Mention your service area naturally, create service-specific pages, add contact details, use local business schema, and link to relevant case studies and FAQs.",
      },
      {
        heading: "Content basics",
        body: "Answer real customer questions, explain services clearly, publish useful guides, and keep internal links between services, articles, case studies, and contact pages.",
      },
    ],
    relatedServiceSlugs: ["seo-services-london", "web-design-london"],
  },
  {
    slug: "how-to-generate-more-leads-from-your-website",
    title: "How to Generate More Leads From Your Website",
    description:
      "Ways to generate more leads from a website using stronger CTAs, forms, trust signals, case studies, FAQs, WhatsApp, and analytics.",
    category: "Business Growth",
    date: "2026-06-17",
    readTime: "6 min read",
    keywords: ["lead generation website", "business website developer UK", "small business websites London"],
    sections: [
      {
        heading: "Make the next step obvious",
        body: "Visitors should always know whether to call, message on WhatsApp, request a quote, book a consultation, or start a brief.",
      },
      {
        heading: "Build trust before asking for contact",
        body: "Use case studies, service details, reviews, FAQs, process sections, and examples to show that you understand the customer problem.",
      },
      {
        heading: "Track what happens",
        body: "Analytics helps you see which pages get attention, which buttons are clicked, and where visitors need a stronger route to enquiry.",
      },
    ],
    relatedServiceSlugs: ["small-business-websites-london", "business-automation-london"],
  },
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "saba-cafe",
    title: "Saba Cafe Website and QR Ordering Case Study",
    description:
      "How MDemx planned a restaurant website, QR ordering journey, mobile menu experience, and admin dashboard foundation for Saba Cafe.",
    client: "Saba Cafe",
    category: "Restaurant website and QR ordering system",
    challenge:
      "Saba Cafe needed a polished restaurant website concept that could support mobile browsing, QR table ordering, menu discovery, and future admin tools.",
    solution:
      "MDemx planned a mobile-first restaurant experience with clear menu access, QR ordering flow, local SEO structure, and an admin-ready system foundation.",
    results: [
      "Clearer mobile customer journey",
      "QR ordering path planned for table service",
      "Restaurant SEO content structure",
      "Admin dashboard foundations for future management",
    ],
    technologies: ["Next.js", "Responsive UI", "QR ordering planning", "Structured content", "Local SEO"],
    relatedServiceSlugs: ["restaurant-websites-london", "website-development-london"],
  },
  {
    slug: "nour-electrical",
    title: "Nour Electrical Business Website Case Study",
    description:
      "How MDemx planned a service business website for Nour Electrical with lead generation, quote forms, SEO setup, and mobile-friendly design.",
    client: "Nour Electrical",
    category: "Business website and lead generation",
    challenge:
      "Nour Electrical needed a service-led website concept that could build trust quickly and convert visitors into quote requests or calls.",
    solution:
      "MDemx structured the website around service clarity, quote forms, mobile CTAs, trust sections, and local SEO foundations.",
    results: [
      "Clear service positioning",
      "Quote request route planned",
      "Mobile-friendly call and enquiry journey",
      "SEO-ready service page structure",
    ],
    technologies: ["Next.js", "Lead forms", "Local SEO", "Responsive design", "Analytics planning"],
    relatedServiceSlugs: ["small-business-websites-london", "seo-services-london"],
  },
];

export const seoNavLinks = [
  { href: "/services/web-design-london", label: "Web Design London" },
  { href: "/services/restaurant-websites-london", label: "Restaurant Websites" },
  { href: "/services/dashboard-development-london", label: "Dashboards" },
  { href: "/blog", label: "Blog" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/why-choose-mdemx", label: "Why MDemx" },
];

export function canonical(path = "") {
  return `${site.url}${path}`;
}

export function getProjectImage(slug: string) {
  const project = projects.find((item) => item.id === slug || item.id === `${slug}s`);
  return project?.image || "/mdemx-logo-preview.jpg";
}

import type { MetadataRoute } from "next";
import { answerPages, blogPosts, caseStudies, localServicePages } from "@/lib/seo-content";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/services",
    "/work",
    "/client-brief",
    "/about",
    "/faq",
    "/contact",
    "/answers",
    "/blog",
    "/case-studies",
    "/why-choose-mdemx",
    "/free-website-audit",
    "/free-seo-audit",
    "/quote-request",
    "/book-free-consultation",
    "/privacy-policy",
    "/cookie-policy",
  ];

  const dynamicRoutes = [
    ...localServicePages.map((page) => `/services/${page.slug}`),
    ...answerPages.map((page) => `/answers/${page.slug}`),
    ...blogPosts.map((post) => `/blog/${post.slug}`),
    ...caseStudies.map((study) => `/case-studies/${study.slug}`),
  ];

  return [...routes, ...dynamicRoutes].map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/blog" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/contact" || route.includes("audit") || route.includes("quote") ? 0.9 : 0.75,
  }));
}

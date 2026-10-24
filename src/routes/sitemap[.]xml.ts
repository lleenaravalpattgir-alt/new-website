import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { services } from "@/data/services";
import { blogPosts } from "@/data/blog";
import { caseStudies } from "@/data/caseStudies";
import { caseStudiesData } from "@/data/caseStudiesData";
import { topics } from "@/data/blogTopics";
import { solutionsData } from "@/data/solutionsData";
import { industriesData } from "@/data/industriesData";
import { fractionalLeadersData } from "@/data/fractionalLeadersData";
import { getAllPublishedArticles } from "@/data/insightsArticles";

const BASE_URL = "https://ryzeadvisory.co";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const today = new Date().toISOString().slice(0, 10);
        const insightsArticles = getAllPublishedArticles();

        const entries: { path: string; priority: string; changefreq: string; lastmod: string }[] = [
          { path: "/", priority: "1.0", changefreq: "weekly", lastmod: today },
          { path: "/services", priority: "0.9", changefreq: "weekly", lastmod: today },
          { path: "/blog", priority: "0.9", changefreq: "weekly", lastmod: today },
          { path: "/insights", priority: "0.9", changefreq: "weekly", lastmod: today },
          { path: "/case-studies", priority: "0.8", changefreq: "monthly", lastmod: today },
          { path: "/solutions", priority: "0.8", changefreq: "weekly", lastmod: today },
          { path: "/industries", priority: "0.8", changefreq: "weekly", lastmod: today },
          { path: "/fractional-leaders", priority: "0.8", changefreq: "weekly", lastmod: today },
          { path: "/about", priority: "0.7", changefreq: "monthly", lastmod: today },
          { path: "/about/author", priority: "0.6", changefreq: "monthly", lastmod: today },
          { path: "/contact", priority: "0.8", changefreq: "monthly", lastmod: today },
          { path: "/business-funding", priority: "0.9", changefreq: "weekly", lastmod: today },
          { path: "/prompts", priority: "0.6", changefreq: "monthly", lastmod: today },
          { path: "/offers", priority: "0.8", changefreq: "monthly", lastmod: today },
          { path: "/how-it-works", priority: "0.7", changefreq: "monthly", lastmod: today },
          { path: "/faqs", priority: "0.6", changefreq: "monthly", lastmod: today },
          { path: "/experts", priority: "0.7", changefreq: "monthly", lastmod: today },
          { path: "/partner-standards", priority: "0.5", changefreq: "monthly", lastmod: today },
          { path: "/book-diagnostic", priority: "0.8", changefreq: "monthly", lastmod: today },
          { path: "/resources", priority: "0.7", changefreq: "monthly", lastmod: today },
          { path: "/resources/templates", priority: "0.6", changefreq: "monthly", lastmod: today },
          { path: "/resources/ai-readiness-scorecard", priority: "0.7", changefreq: "monthly", lastmod: today },
          { path: "/resources/capital-readiness-checklist", priority: "0.7", changefreq: "monthly", lastmod: today },
          { path: "/resources/cost-calculator", priority: "0.7", changefreq: "monthly", lastmod: today },
          { path: "/resources/founder-dependency-diagnostic", priority: "0.7", changefreq: "monthly", lastmod: today },
          { path: "/resources/fractional-cxo-assessment", priority: "0.7", changefreq: "monthly", lastmod: today },
          { path: "/resources/growth-constraint-map", priority: "0.7", changefreq: "monthly", lastmod: today },
          { path: "/privacy-policy", priority: "0.3", changefreq: "yearly", lastmod: today },
          { path: "/terms-and-conditions", priority: "0.3", changefreq: "yearly", lastmod: today },
          { path: "/disclaimer", priority: "0.3", changefreq: "yearly", lastmod: today },
          ...services.map((s) => ({
            path: `/services/${s.slug}`,
            priority: "0.8",
            changefreq: "monthly" as const,
            lastmod: today,
          })),
          ...blogPosts.map((p) => ({
            path: `/blog/${p.slug}`,
            priority: "0.6",
            changefreq: "monthly" as const,
            lastmod: today,
          })),
          ...insightsArticles.map((a) => ({
            path: `/insights/${a.slug}`,
            priority: "0.7",
            changefreq: "monthly" as const,
            lastmod: a.updatedDate || a.publishedDate || today,
          })),
          ...caseStudiesData.map((c) => ({
            path: `/case-studies/${c.slug}`,
            priority: "0.7",
            changefreq: "monthly" as const,
            lastmod: today,
          })),
          ...caseStudies
            .filter((c) => !caseStudiesData.some((cs) => cs.slug === c.slug))
            .map((c) => ({
              path: `/case-studies/${c.slug}`,
              priority: "0.7",
              changefreq: "monthly" as const,
              lastmod: today,
            })),
          ...solutionsData.map((s) => ({
            path: `/solutions/${s.slug}`,
            priority: "0.7",
            changefreq: "monthly" as const,
            lastmod: today,
          })),
          ...industriesData.map((i) => ({
            path: `/industries/${i.slug}`,
            priority: "0.7",
            changefreq: "monthly" as const,
            lastmod: today,
          })),
          ...fractionalLeadersData.map((l) => ({
            path: `/fractional-leaders/${l.slug}`,
            priority: "0.7",
            changefreq: "monthly" as const,
            lastmod: today,
          })),
          ...topics.map((t) => ({
            path: `/blog/topic/${t.slug}`,
            priority: "0.7",
            changefreq: "weekly" as const,
            lastmod: today,
          })),
          ...topics.map((t) => ({
            path: `/services/category/${t.slug}`,
            priority: "0.7",
            changefreq: "weekly" as const,
            lastmod: today,
          })),
        ];

        // Deduplicate entries by path and strip any template URLs ($slug)
        const seen = new Set<string>();
        const safeEntries = entries.filter((e) => {
          if (!e.path || /\/\$/.test(e.path) || e.path.includes("$")) return false;
          if (seen.has(e.path)) return false;
          seen.add(e.path);
          return true;
        });

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...safeEntries.map(
            (e) =>
              `  <url><loc>${BASE_URL}${e.path}</loc><lastmod>${e.lastmod}</lastmod><changefreq>${e.changefreq}</changefreq><priority>${e.priority}</priority></url>`,
          ),
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});

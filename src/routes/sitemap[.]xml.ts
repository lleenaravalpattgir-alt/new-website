import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { services } from "@/data/services";
import { blogPosts } from "@/data/blog";
import { caseStudies } from "@/data/caseStudies";
import { topics } from "@/data/blogTopics";

const BASE_URL = "https://ryzeadvisory.co";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const today = new Date().toISOString().slice(0, 10);
        const entries: { path: string; priority: string; changefreq: string; lastmod: string }[] = [
          { path: "/", priority: "1.0", changefreq: "weekly", lastmod: today },
          { path: "/services", priority: "0.9", changefreq: "weekly", lastmod: today },
          { path: "/blog", priority: "0.9", changefreq: "weekly", lastmod: today },
          { path: "/about", priority: "0.7", changefreq: "monthly", lastmod: today },
          { path: "/about/author", priority: "0.5", changefreq: "monthly", lastmod: today },
          { path: "/contact", priority: "0.8", changefreq: "monthly", lastmod: today },
          { path: "/business-funding", priority: "0.9", changefreq: "weekly", lastmod: today },
          { path: "/prompts", priority: "0.6", changefreq: "monthly", lastmod: today },
          { path: "/unsubscribe", priority: "0.2", changefreq: "yearly", lastmod: today },
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
          { path: "/case-studies", priority: "0.8", changefreq: "monthly", lastmod: today },
          ...caseStudies.map((c) => ({
            path: `/case-studies/${c.slug}`,
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

        // Defensive: strip any entry whose path contains a literal $ template segment
        // (e.g. `/blog/$slug`) so template URLs can never reach Google's index.
        const safeEntries = entries.filter((e) => !/\/\$/.test(e.path) && !e.path.includes("$"));

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

import type { BlogPost } from "@/data/blog";
import { blogPosts } from "@/data/blog";
import { services, type Service } from "@/data/services";

export type TopicSlug =
  | "ai-automation"
  | "ai-agents"
  | "llm-visibility"
  | "brand-advisory"
  | "hr-consultancy"
  | "talent-acquisition";

export interface Topic {
  slug: TopicSlug;
  label: string;
  pillar: BlogPost["pillar"];
  blurb: string;
  /** Service categories that align with this topic, used for the matching service hub. */
  serviceCategories: string[];
}

export const topics: Topic[] = [
  {
    slug: "ai-automation",
    label: "AI & Automation",
    pillar: "Automation",
    blurb: "n8n, Make, Zapier, outbound engines, follow-up loops, CRM hygiene — the operational AI layer.",
    serviceCategories: ["AI Automation", "Content Automation"],
  },
  {
    slug: "ai-agents",
    label: "AI Agents",
    pillar: "Agents",
    blurb: "Multi-agent systems, voice setters, lead qualifiers, and custom LLM tools shipping in production.",
    serviceCategories: ["Agentic Workflows", "Operational AI Agents", "Client-Facing AI", "Research & Intelligence"],
  },
  {
    slug: "llm-visibility",
    label: "LLM Brand Perception & Visibility",
    pillar: "GEO",
    blurb: "Prompt monitoring, ChatGPT/Gemini/Perplexity visibility, AI search & answer-engine optimization.",
    serviceCategories: ["GEO & AI SEO"],
  },
  {
    slug: "brand-advisory",
    label: "Brand Advisory",
    pillar: "Brand",
    blurb: "Identity systems, GTM positioning, brand audits, and digital experience playbooks.",
    serviceCategories: ["Brand Advisory"],
  },
  {
    slug: "hr-consultancy",
    label: "HR Consultancy",
    pillar: "HR",
    blurb: "Performance management, org design, compliance, and retention strategies that actually stick.",
    serviceCategories: ["HR Consultancy"],
  },
  {
    slug: "talent-acquisition",
    label: "Talent Acquisition",
    pillar: "Talent",
    blurb: "Executive search, technical assembly, volume hiring systems, and employer brand strategy.",
    serviceCategories: ["Talent Acquisition"],
  },
];

export const topicBySlug = (slug: string): Topic | undefined => topics.find((t) => t.slug === slug);
export const topicByServiceCategorySlug = (slug: string): Topic | undefined =>
  topics.find((t) => t.slug === slug);
export const postsForTopic = (slug: TopicSlug): BlogPost[] => {
  const t = topicBySlug(slug);
  if (!t) return [];
  return blogPosts.filter((p) => p.pillar === t.pillar);
};
export const servicesForTopic = (slug: TopicSlug): Service[] => {
  const t = topicBySlug(slug);
  if (!t) return [];
  return services.filter((s) => t.serviceCategories.includes(s.category));
};

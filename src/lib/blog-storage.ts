import {
  insightsArticles as defaultArticles,
  INSIGHTS_CATEGORIES,
  type InsightsArticle,
  type ContentBlock,
} from "@/data/insightsArticles";
import { supabase } from "@/integrations/supabase/client";

const STORAGE_KEY = "ryze_advisory_insights_articles_v2";

/**
 * In-memory cache for fast, synchronized access across components.
 */
let memoryCache: InsightsArticle[] | null = null;

/**
 * Load articles from localStorage if available, falling back to default seed articles.
 */
export function getStoredArticles(): InsightsArticle[] {
  if (typeof window === "undefined") {
    return defaultArticles;
  }

  if (memoryCache) {
    return memoryCache;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed: InsightsArticle[] = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        memoryCache = parsed;
        return parsed;
      }
    }
  } catch (err) {
    console.warn("[blog-storage] Error reading localStorage, falling back to defaults", err);
  }

  // Initialize storage with default articles
  memoryCache = [...defaultArticles];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultArticles));
  } catch {
    // Ignore storage quota errors
  }
  return memoryCache;
}

/**
 * Returns ONLY published articles for public view on /insights.
 * Drafts and scheduled articles are strictly excluded.
 */
export function getStoredPublishedArticles(): InsightsArticle[] {
  const all = getStoredArticles();
  return all.filter((a) => a.status === "published");
}

/**
 * Returns a single article by slug.
 * If includeDrafts is false, returns undefined for draft articles.
 */
export function getStoredArticleBySlug(
  slug: string,
  includeDrafts = false,
): InsightsArticle | undefined {
  const all = getStoredArticles();
  const article = all.find((a) => a.slug === slug);
  if (!article) return undefined;
  if (!includeDrafts && article.status !== "published") {
    return undefined;
  }
  return article;
}

/**
 * Saves a new or updated article.
 * Updates local cache and localStorage, dispatches update event,
 * and asynchronously syncs to Supabase if connected.
 */
export async function saveArticle(
  article: Partial<InsightsArticle> & { title: string; slug: string },
): Promise<InsightsArticle> {
  const all = [...getStoredArticles()];
  const existingIndex = all.findIndex((a) => a.slug === article.slug);

  const now = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const formattedDate = `${monthNames[now.getMonth()]} ${now.getFullYear()}`;

  const categoryName = article.category || "Business Strategy";
  const categorySlug =
    article.categorySlug ||
    categoryName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const fullArticle: InsightsArticle = {
    slug: article.slug,
    title: article.title,
    seoTitle: article.seoTitle || article.title,
    metaDescription: article.metaDescription || article.excerpt || article.title,
    excerpt: article.excerpt || "",
    category: categoryName,
    categorySlug: categorySlug,
    author: article.author || "Leena Raval",
    authorRole: article.authorRole || "Founder & Strategic Growth Advisor, Rise Advisory",
    publishedDate: article.publishedDate || formattedDate,
    updatedDate: formattedDate,
    readTime: article.readTime || "6 min read",
    status: (article.status as "published" | "draft" | "scheduled") || "draft",
    featured: Boolean(article.featured),
    primaryKeyword: article.primaryKeyword || article.title,
    secondaryKeywords: article.secondaryKeywords || [],
    imageUrl: article.imageUrl || "/logo.png",
    imageAlt: article.imageAlt || article.title,
    content: article.content || [],
    faqs: article.faqs || [],
    toc: article.toc || [],
    disclaimer:
      article.disclaimer ||
      "This article is for general educational purposes. Fees, responsibilities, and service availability vary. Financial decisions should be based on your circumstances and professional advice where appropriate.",
    relatedService: article.relatedService,
    relatedSlugs: article.relatedSlugs,
  };

  if (existingIndex >= 0) {
    all[existingIndex] = { ...all[existingIndex], ...fullArticle };
  } else {
    all.unshift(fullArticle);
  }

  memoryCache = all;
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
      window.dispatchEvent(
        new CustomEvent("ryze-articles-updated", { detail: { slug: fullArticle.slug } }),
      );
    } catch (e) {
      console.error("[blog-storage] Failed to save to localStorage", e);
    }
  }

  // Attempt Supabase sync in background (non-blocking)
  try {
    const supabasePayload = {
      slug: fullArticle.slug,
      title: fullArticle.title,
      seo_title: fullArticle.seoTitle,
      meta_description: fullArticle.metaDescription,
      excerpt: fullArticle.excerpt,
      category: fullArticle.category,
      category_slug: fullArticle.categorySlug,
      author: fullArticle.author,
      author_role: fullArticle.authorRole,
      status: fullArticle.status,
      published_date: fullArticle.publishedDate,
      updated_date: fullArticle.updatedDate,
      read_time: fullArticle.readTime,
      featured: fullArticle.featured,
      primary_keyword: fullArticle.primaryKeyword,
      secondary_keywords: fullArticle.secondaryKeywords,
      image_url: fullArticle.imageUrl,
      image_alt: fullArticle.imageAlt,
      content: fullArticle.content as any,
      faqs: fullArticle.faqs as any,
      toc: fullArticle.toc as any,
      disclaimer: fullArticle.disclaimer,
    };
    await supabase.from("blog_posts" as any).upsert(supabasePayload as any, { onConflict: "slug" });
  } catch {
    // Supabase table might not exist yet; gracefully ignore
  }

  // Notify IndexNow if article is published
  if (fullArticle.status === "published" && typeof window !== "undefined") {
    try {
      fetch("/api/public/indexnow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: `https://ryzeadvisory.co/insights/${fullArticle.slug}` }),
      }).catch(() => undefined);
    } catch {
      // Best-effort notification
    }
  }

  return fullArticle;
}

/**
 * Deletes an article by slug.
 */
export async function deleteArticle(slug: string): Promise<boolean> {
  const all = getStoredArticles().filter((a) => a.slug !== slug);
  memoryCache = all;

  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
      window.dispatchEvent(
        new CustomEvent("ryze-articles-updated", { detail: { slug, deleted: true } }),
      );
      // Notify IndexNow that URL was removed
      fetch("/api/public/indexnow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: `https://ryzeadvisory.co/insights/${slug}` }),
      }).catch(() => undefined);
    } catch (e) {
      console.error("[blog-storage] Failed to save deletion", e);
    }
  }

  // Attempt Supabase deletion in background
  try {
    await supabase
      .from("blog_posts" as any)
      .delete()
      .eq("slug", slug);
  } catch {
    // Gracefully ignore if table not present
  }

  return true;
}

/**
 * Toggles an article's status between 'published' and 'draft'.
 */
export async function toggleArticleStatus(slug: string): Promise<InsightsArticle | null> {
  const all = [...getStoredArticles()];
  const article = all.find((a) => a.slug === slug);
  if (!article) return null;

  const nextStatus: "published" | "draft" = article.status === "published" ? "draft" : "published";
  return saveArticle({ ...article, status: nextStatus });
}

/**
 * Returns categories enriched with real-time article counts.
 */
export function getStoredCategories() {
  const articles = getStoredArticles();
  return INSIGHTS_CATEGORIES.map((cat) => {
    const totalCount = articles.filter((a) => a.categorySlug === cat.slug).length;
    const publishedCount = articles.filter(
      (a) => a.categorySlug === cat.slug && a.status === "published",
    ).length;
    return {
      ...cat,
      totalCount,
      publishedCount,
    };
  });
}

/**
 * Resets storage back to default seed articles.
 */
export function resetArticlesToDefaults(): InsightsArticle[] {
  memoryCache = [...defaultArticles];
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultArticles));
      window.dispatchEvent(new CustomEvent("ryze-articles-updated"));
    } catch {
      // ignore
    }
  }
  return memoryCache;
}

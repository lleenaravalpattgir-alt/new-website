/**
 * IndexNow Protocol Implementation for Ryze Advisory (ryzeadvisory.co)
 * Official Specification: https://www.indexnow.org/documentation
 *
 * IndexNow enables instant notification to participating search engines (Microsoft Bing,
 * Yandex, Naver, Seznam, etc.) whenever content on ryzeadvisory.co is added, updated, or deleted.
 */

import { services } from "@/data/services";
import { blogPosts } from "@/data/blog";
import { caseStudies } from "@/data/caseStudies";
import { topics } from "@/data/blogTopics";

export const INDEXNOW_HOST = "ryzeadvisory.co";
export const INDEXNOW_BASE_URL = `https://${INDEXNOW_HOST}`;
export const DEFAULT_INDEXNOW_KEY = "6c5e23d5a4d98e2abf777b00b5660ac9";
export const INDEXNOW_API_ENDPOINT = "https://api.indexnow.org/indexnow";

// Secondary engine endpoints for redundancy if needed
export const INDEXNOW_FALLBACK_ENDPOINTS = [
  "https://www.bing.com/indexnow",
  "https://yandex.com/indexnow",
];

export interface IndexNowPayload {
  host: string;
  key: string;
  keyLocation?: string;
  urlList: string[];
}

export interface IndexNowResponse {
  success: boolean;
  statusCode: number;
  message: string;
  submittedCount: number;
  urls: string[];
  endpoint: string;
  timestamp: string;
}

/**
 * Returns the currently active IndexNow API key.
 * Prioritizes runtime environment variable INDEXNOW_API_KEY, falling back to default key.
 */
export function getIndexNowKey(): string {
  const envKey =
    typeof process !== "undefined" && process.env ? process.env.INDEXNOW_API_KEY : undefined;
  const key = envKey?.trim() || DEFAULT_INDEXNOW_KEY;

  // Validate format: 8 to 128 alphanumeric/hex characters
  if (!/^[a-zA-Z0-9-]{8,128}$/.test(key)) {
    console.warn(`[IndexNow] Provided key "${key}" does not match standard format. Falling back to default.`);
    return DEFAULT_INDEXNOW_KEY;
  }
  return key;
}

/**
 * Returns the public key verification URL on ryzeadvisory.co.
 */
export function getIndexNowKeyLocation(key?: string): string {
  const activeKey = key || getIndexNowKey();
  return `${INDEXNOW_BASE_URL}/${activeKey}.txt`;
}

/**
 * Validates, normalizes, and filters URLs to ensure they strictly belong to ryzeadvisory.co.
 * - Rejects any external / third-party domains (prevents SSRF and unauthorized submissions).
 * - Strips literal template expressions like "/$slug".
 * - Excludes private administrative, transactional, and API routes (/admin, /api, /email, /unsubscribe).
 * - Deduplicates URLs.
 * - Automatically expands root-relative paths ("/blog/post" -> "https://ryzeadvisory.co/blog/post").
 */
export function validateAndFilterUrls(rawUrls: string[]): {
  validUrls: string[];
  rejected: { url: string; reason: string }[];
} {
  const validSet = new Set<string>();
  const rejected: { url: string; reason: string }[] = [];

  for (const raw of rawUrls) {
    if (!raw || typeof raw !== "string") {
      rejected.push({ url: String(raw), reason: "Empty or invalid string" });
      continue;
    }

    const trimmed = raw.trim();

    // Reject literal parameter tokens from routes
    if (trimmed.includes("$")) {
      rejected.push({ url: trimmed, reason: "Contains unexpanded parameter template ($)" });
      continue;
    }

    let urlObj: URL;
    try {
      if (trimmed.startsWith("/")) {
        urlObj = new URL(trimmed, INDEXNOW_BASE_URL);
      } else {
        urlObj = new URL(trimmed);
      }
    } catch {
      rejected.push({ url: trimmed, reason: "Invalid URL format" });
      continue;
    }

    // Enforce domain ownership: must strictly be ryzeadvisory.co
    const hostname = urlObj.hostname.toLowerCase();
    if (hostname !== INDEXNOW_HOST && hostname !== `www.${INDEXNOW_HOST}`) {
      rejected.push({
        url: trimmed,
        reason: `Disallowed host "${hostname}". Must match "${INDEXNOW_HOST}".`,
      });
      continue;
    }

    // Force HTTPS
    urlObj.protocol = "https:";
    // Remove port if any
    urlObj.port = "";
    // Normalize hostname
    urlObj.hostname = INDEXNOW_HOST;

    const pathname = urlObj.pathname;

    // Filter out private / administrative / API endpoints
    if (
      pathname.startsWith("/admin") ||
      pathname.startsWith("/api") ||
      pathname.startsWith("/email") ||
      pathname === "/unsubscribe"
    ) {
      rejected.push({
        url: trimmed,
        reason: "Administrative, transactional, or API path excluded from search engine indexing.",
      });
      continue;
    }

    // Normalize path: clean up trailing slash except root
    if (pathname.length > 1 && pathname.endsWith("/")) {
      urlObj.pathname = pathname.slice(0, -1);
    }

    validSet.add(urlObj.toString());
  }

  // Max 10,000 URLs per IndexNow submission batch
  const validUrls = Array.from(validSet).slice(0, 10000);

  return { validUrls, rejected };
}

/**
 * Submits an array of verified ryzeadvisory.co URLs to IndexNow.
 */
export async function submitToIndexNow(
  urls: string[],
  options?: {
    key?: string;
    keyLocation?: string;
    endpoint?: string;
  },
): Promise<IndexNowResponse> {
  const key = options?.key || getIndexNowKey();
  const keyLocation = options?.keyLocation || getIndexNowKeyLocation(key);
  const endpoint = options?.endpoint || INDEXNOW_API_ENDPOINT;

  const { validUrls, rejected } = validateAndFilterUrls(urls);

  if (validUrls.length === 0) {
    return {
      success: false,
      statusCode: 400,
      message: `No valid URLs to submit. ${rejected.length} rejected.`,
      submittedCount: 0,
      urls: [],
      endpoint,
      timestamp: new Date().toISOString(),
    };
  }

  const payload: IndexNowPayload = {
    host: INDEXNOW_HOST,
    key,
    keyLocation,
    urlList: validUrls,
  };

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "User-Agent": "RyzeAdvisory-IndexNow-Client/1.0 (+https://ryzeadvisory.co)",
      },
      body: JSON.stringify(payload),
    });

    const statusCode = res.status;
    let message = "";

    switch (statusCode) {
      case 200:
        message = "OK: URLs submitted and processed successfully.";
        break;
      case 202:
        message = "Accepted: URLs received by IndexNow. Key validation in progress.";
        break;
      case 400:
        message = "Bad Request: Invalid format or schema.";
        break;
      case 403:
        message = `Forbidden: In key validation (ensure ${keyLocation} is accessible and returns the key).`;
        break;
      case 422:
        message = "Unprocessable Entity: URLs do not belong to the host or key doesn't match.";
        break;
      case 429:
        message = "Too Many Requests: Rate limited by IndexNow API.";
        break;
      default:
        message = `HTTP ${statusCode}: ${res.statusText || "Unexpected response"}`;
        break;
    }

    const success = statusCode === 200 || statusCode === 202;

    return {
      success,
      statusCode,
      message,
      submittedCount: validUrls.length,
      urls: validUrls,
      endpoint,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    return {
      success: false,
      statusCode: 500,
      message: `Network error submitting to IndexNow: ${errMsg}`,
      submittedCount: 0,
      urls: validUrls,
      endpoint,
      timestamp: new Date().toISOString(),
    };
  }
}

/**
 * Returns the complete list of all canonical public website URLs eligible for indexing.
 * Gathers all static pages, services, blog articles, case studies, and topics.
 */
export function getAllSiteCanonicalUrls(): string[] {
  const staticPaths = [
    "/",
    "/services",
    "/blog",
    "/about",
    "/about/author",
    "/contact",
    "/business-funding",
    "/prompts",
    "/case-studies",
    "/founder",
    "/how-it-works",
    "/faqs",
    "/experts",
    "/partner-standards",
    "/offers",
    "/pricing",
    "/privacy-policy",
    "/terms-and-conditions",
    "/disclaimer",
    "/book-diagnostic",
  ];

  const servicePaths = services.map((s) => `/services/${s.slug}`);
  const blogPaths = blogPosts.map((p) => `/blog/${p.slug}`);
  const caseStudyPaths = caseStudies.map((c) => `/case-studies/${c.slug}`);
  const topicBlogPaths = topics.map((t) => `/blog/topic/${t.slug}`);
  const topicServicePaths = topics.map((t) => `/services/category/${t.slug}`);

  const allPaths = [
    ...staticPaths,
    ...servicePaths,
    ...blogPaths,
    ...caseStudyPaths,
    ...topicBlogPaths,
    ...topicServicePaths,
  ];

  const { validUrls } = validateAndFilterUrls(allPaths);
  return validUrls;
}

/**
 * Convenience helper to submit the entire website sitemap to IndexNow.
 */
export async function submitAllPagesToIndexNow(): Promise<IndexNowResponse> {
  const urls = getAllSiteCanonicalUrls();
  return submitToIndexNow(urls);
}

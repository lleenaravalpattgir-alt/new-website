import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!body.includes('"unhandled":true') || !body.includes('"message":"HTTPError"')) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

// ─── Edge Caching for Public Static-Data Pages ──────────────────────────────
// All blog, service, insights, and content pages are backed entirely by static
// TypeScript data files — there are zero database or API calls during SSR.
// Setting s-maxage instructs Cloudflare to cache the SSR HTML at the edge PoP
// and serve subsequent requests without invoking the Worker at all.
//
// In addition, we integrate with Cloudflare Workers Cache API (caches.default)
// directly inside the Worker entry to ensure cached responses are returned
// at edge PoP speed (<100ms TTFB) even when Cloudflare Edge HTML caching rules
// require Origin Cache API interaction.
//
// Strategy:
//   s-maxage=86400               → Cloudflare CDN caches for 24 hours
//   stale-while-revalidate=604800→ Serve stale while revalidating for 7 days
//   max-age=0                    → Browsers re-validate with edge cache
//   Cloudflare-CDN-Cache-Control → Cloudflare-specific edge override
//   CDN-Cache-Control            → Downstream CDN override
//   Vary: Accept-Encoding        → Ensure Cloudflare stores correct compression variant
//   caches.default               → Native Cloudflare Worker Cache API for instant edge HIT
//
// Pages explicitly excluded (no CDN cache):
//   /admin/*     — authenticated admin routes
//   /api/*       — server functions / webhooks
//   /email/*     — transactional email routes
//   /unsubscribe — personalized user action
//
// Responses with Set-Cookie are also excluded to avoid caching personalised state.
// ────────────────────────────────────────────────────────────────────────────

const PUBLIC_CACHE_PREFIXES = [
  "/blog",
  "/insights",
  "/services",
  "/case-studies",
  "/solutions",
  "/resources",
  "/industries",
  "/about",
  "/fractional-leaders",
  "/how-it-works",
  "/faqs",
  "/experts",
  "/partner-standards",
  "/offers",
  "/pricing",
  "/privacy-policy",
  "/terms",
  "/terms-and-conditions",
  "/terms-of-use",
  "/disclaimer",
  "/business-funding",
  "/founder",
  "/book-diagnostic",
  "/contact",
  "/prompts",
  "/sitemap.xml",
];

/** Returns true for routes whose data is 100% static and safe to edge-cache. */
function isPublicCacheable(pathname: string, method?: string): boolean {
  if (method && method !== "GET" && method !== "HEAD") {
    return false;
  }
  // Never cache admin, API, or private routes
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/email") ||
    pathname === "/unsubscribe"
  ) {
    return false;
  }
  // Normalize path without trailing slash (except root)
  const normalized = pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  if (normalized === "/" || normalized === "") return true;
  return PUBLIC_CACHE_PREFIXES.some((prefix) => normalized.startsWith(prefix));
}

/** Construct a normalized cache key URL that strips tracking/marketing query params. */
function getNormalizedCacheKey(request: Request): Request {
  try {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const trackingParams = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
      "gclid",
      "fbclid",
      "msclkid",
      "ref",
    ];
    let modified = false;
    for (const param of trackingParams) {
      if (searchParams.has(param)) {
        searchParams.delete(param);
        modified = true;
      }
    }
    if (modified) {
      url.search = searchParams.toString();
    }
    return new Request(url.toString(), {
      method: "GET",
      headers: request.headers,
    });
  } catch {
    return request;
  }
}

/** Inject Cloudflare-aware Cache-Control headers into a successful SSR response. */
function withEdgeCache(response: Response, pathname: string, method?: string): Response {
  // Only cache 2xx HTML responses for public pages
  if (response.status < 200 || response.status >= 300) return response;
  const ct = response.headers.get("content-type") ?? "";
  if (!ct.includes("text/html")) return response;
  if (!isPublicCacheable(pathname, method)) return response;

  // Don't cache if the response sets a personalised cookie (e.g. auth callbacks)
  if (response.headers.has("set-cookie")) return response;

  const headers = new Headers(response.headers);
  // Cloudflare-CDN-Cache-Control takes highest precedence on Cloudflare Edge PoPs
  headers.set(
    "Cloudflare-CDN-Cache-Control",
    "max-age=86400, stale-while-revalidate=604800",
  );
  // CDN-Cache-Control is respected by downstream CDNs (Fastly, CloudFront, etc.)
  headers.set(
    "CDN-Cache-Control",
    "max-age=86400, stale-while-revalidate=604800",
  );
  // s-maxage=86400 instructs shared caches to cache for 24h; max-age=0 ensures browser always revalidates
  headers.set(
    "Cache-Control",
    "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
  );
  // Vary on Accept-Encoding so Cloudflare stores the correct gzip/br compression variant
  if (!headers.has("Vary")) {
    headers.set("Vary", "Accept-Encoding");
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

type CloudflareCache = {
  match: (request: Request | string) => Promise<Response | undefined>;
  put: (request: Request | string, response: Response) => Promise<void>;
};

function getCloudflareCache(): CloudflareCache | undefined {
  const g = globalThis as unknown as { caches?: { default?: CloudflareCache } };
  return g.caches?.default;
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    const { pathname } = new URL(request.url);
    const method = request.method;
    const cacheable = isPublicCacheable(pathname, method);
    const cfCache = cacheable ? getCloudflareCache() : undefined;
    const cacheKey = cfCache ? getNormalizedCacheKey(request) : undefined;

    // 1. Check Cloudflare Worker Edge Cache (caches.default) for instant sub-100ms response
    if (cfCache && cacheKey) {
      try {
        const cached = await cfCache.match(cacheKey);
        if (cached) {
          const res = new Response(cached.body, cached);
          res.headers.set("X-Edge-Cache", "HIT");
          return res;
        }
      } catch (cacheErr) {
        console.warn("[edge-cache] Lookup error:", cacheErr);
      }
    }

    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      const normalized = await normalizeCatastrophicSsrResponse(response);
      const edgeResponse = withEdgeCache(normalized, pathname, method);

      // 2. If response is cacheable 200 OK, asynchronously store in Cloudflare Worker Edge Cache
      if (cfCache && cacheKey && edgeResponse.status === 200 && !edgeResponse.headers.has("set-cookie")) {
        edgeResponse.headers.set("X-Edge-Cache", "MISS");
        try {
          const waitCtx = ctx as { waitUntil?: (p: Promise<unknown>) => void } | undefined;
          const putPromise = cfCache.put(cacheKey, edgeResponse.clone());
          if (waitCtx && typeof waitCtx.waitUntil === "function") {
            waitCtx.waitUntil(putPromise);
          } else {
            putPromise.catch((e) => console.warn("[edge-cache] Put failed:", e));
          }
        } catch (putErr) {
          console.warn("[edge-cache] Put error:", putErr);
        }
      }

      return edgeResponse;
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};

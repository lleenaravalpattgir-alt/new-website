#!/usr/bin/env node
/**
 * Extended Playwright checks:
 *   1. Every literal /$template URL returns 301 to the correct hub.
 *   2. Each hub target renders canonical + og:url matching the hub.
 *   3. Truly invalid URLs (e.g. /blog/definitely-not-a-real-slug-xyz)
 *      still return 404 — they must NOT be redirected.
 *
 *   BASE_URL=http://localhost:8080 node scripts/e2e-template-redirects.mjs
 *   BASE_URL=https://ryzeadvisory.co node scripts/e2e-template-redirects.mjs
 */
import { chromium } from "playwright";

const BASE = (process.env.BASE_URL || "http://localhost:8080").replace(/\/$/, "");

const REDIRECT_CASES = [
  { from: "/blog/$slug",                  to: "/blog" },
  { from: "/services/$slug",              to: "/services" },
  { from: "/blog/topic/$topic",           to: "/blog" },
  { from: "/services/category/$category", to: "/services" },
  { from: "/case-studies/$slug",          to: "/case-studies" },
];

const NOT_FOUND_CASES = [
  "/blog/definitely-not-a-real-slug-xyz-999",
  "/services/definitely-not-a-real-service-xyz-999",
  "/blog/topic/nope-not-a-real-topic-xyz",
  "/services/category/nope-not-a-real-category-xyz",
  "/case-studies/nope-not-a-real-case-xyz",
  "/totally-made-up-page-xyz-999",
];

let failed = 0;
const browser = await chromium.launch();
const ctx = await browser.newContext();

console.log("\n— Template URL 301 redirects —");
for (const c of REDIRECT_CASES) {
  const resp = await ctx.request.get(BASE + c.from, { maxRedirects: 0 });
  const status = resp.status();
  const location = resp.headers()["location"] || "";
  const ok = status === 301 && (location.endsWith(c.to) || location === c.to);
  console.log(`${ok ? "✅" : "❌"} ${c.from}  →  ${status} ${location}  (expected 301 → ${c.to})`);
  if (!ok) failed++;
}

console.log("\n— Canonical + og:url on redirect targets —");
const uniqueTargets = [...new Set(REDIRECT_CASES.map((c) => c.to))];
for (const target of uniqueTargets) {
  const page = await ctx.newPage();
  try {
    await page.goto(BASE + target, { waitUntil: "domcontentloaded" });
    const canonical = await page.locator('link[rel="canonical"]').first().getAttribute("href").catch(() => null);
    const ogUrl = await page.locator('meta[property="og:url"]').first().getAttribute("content").catch(() => null);
    const okCanon = !!canonical && canonical.endsWith(target);
    const okOg = !!ogUrl && ogUrl.endsWith(target);
    const ok = okCanon && okOg;
    console.log(`${ok ? "✅" : "⚠️ "} ${target}  canonical=${canonical || "(none)"}  og:url=${ogUrl || "(none)"}`);
    if (!ok) failed++;
  } finally {
    await page.close();
  }
}

console.log("\n— Truly invalid URLs must 404, not 301 —");
for (const path of NOT_FOUND_CASES) {
  const resp = await ctx.request.get(BASE + path, { maxRedirects: 0 });
  const status = resp.status();
  const isRedirect = [301, 302, 307, 308].includes(status);
  // Accept 404 (SSR not-found) or 200 with client-rendered NotFoundComponent — but never a redirect.
  let is404 = status === 404;
  if (status === 200) {
    const body = await resp.text();
    is404 = /404/.test(body) && /Page not found/i.test(body);
  }
  const ok = !isRedirect && is404;
  console.log(`${ok ? "✅" : "❌"} ${path}  →  status=${status}${isRedirect ? " (unexpected redirect!)" : ""}`);
  if (!ok) failed++;
}

await browser.close();
if (failed) {
  console.error(`\n${failed} check(s) failed.`);
  process.exit(1);
}
console.log("\nAll redirect + canonical + 404 checks passed.");

#!/usr/bin/env node
/**
 * CI-safe check: fetches /sitemap.xml from BASE_URL and fails the build if any
 * <loc> contains a literal `$` template segment (e.g. /blog/$slug).
 *
 *   BASE_URL=http://localhost:8080 node scripts/ci-check-sitemap.mjs
 *   BASE_URL=https://ryzeadvisory.co node scripts/ci-check-sitemap.mjs
 *
 * Exit codes:
 *   0 — clean sitemap
 *   1 — one or more template paths found (or fetch failed)
 */
const BASE = process.env.BASE_URL || "http://localhost:8080";
const url = `${BASE.replace(/\/$/, "")}/sitemap.xml`;

let xml;
try {
  const res = await fetch(url, { headers: { accept: "application/xml" } });
  if (!res.ok) {
    console.error(`✗ sitemap fetch failed: ${res.status} ${res.statusText} for ${url}`);
    process.exit(1);
  }
  xml = await res.text();
} catch (err) {
  console.error(`✗ sitemap fetch error: ${(err && err.message) || err}`);
  process.exit(1);
}

const locs = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g)).map((m) => m[1]);
if (locs.length === 0) {
  console.error(`✗ sitemap contains no <loc> entries at ${url}`);
  process.exit(1);
}

const offenders = locs.filter((loc) => loc.includes("$"));
if (offenders.length) {
  console.error(`✗ sitemap contains ${offenders.length} template URL(s):`);
  for (const o of offenders) console.error(`   • ${o}`);
  process.exit(1);
}

console.log(`✓ sitemap OK — ${locs.length} entries, no $ template paths.`);

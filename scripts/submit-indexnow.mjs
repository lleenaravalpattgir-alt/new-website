#!/usr/bin/env node
/**
 * CLI Tool for IndexNow Submissions — Ryze Advisory
 *
 * Usage:
 *   node scripts/submit-indexnow.mjs --check-key
 *   node scripts/submit-indexnow.mjs --url /blog/the-llm-brand-sentiment-index-we-use-for-quarterly-reviews
 *   node scripts/submit-indexnow.mjs --sitemap
 *   node scripts/submit-indexnow.mjs --custom "https://ryzeadvisory.co/services/outbound-lead-gen-engines,https://ryzeadvisory.co/blog"
 */

import fs from "node:fs";
import path from "node:path";

const HOST = "ryzeadvisory.co";
const BASE_URL = `https://${HOST}`;
const DEFAULT_KEY = "6c5e23d5a4d98e2abf777b00b5660ac9";
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

const key = process.env.INDEXNOW_API_KEY || DEFAULT_KEY;
const keyLocation = `${BASE_URL}/${key}.txt`;

console.log("=========================================================");
console.log("           RYZE ADVISORY — INDEXNOW CLIENT               ");
console.log("=========================================================");
console.log(`Host:         ${HOST}`);
console.log(`API Key:      ${key}`);
console.log(`Key Location: ${keyLocation}`);
console.log("---------------------------------------------------------");

// Verify local key file exists
const localKeyPath = path.resolve(process.cwd(), "public", `${key}.txt`);
if (fs.existsSync(localKeyPath)) {
  const content = fs.readFileSync(localKeyPath, "utf8").trim();
  if (content === key) {
    console.log(`✓ Local verification file exists: public/${key}.txt (matches key)`);
  } else {
    console.warn(`⚠ Local verification file content does not match key: "${content}" vs "${key}"`);
  }
} else {
  console.warn(`⚠ Local verification file NOT found at: public/${key}.txt`);
}

// Parse args
const args = process.argv.slice(2);
let mode = "url";
let targetUrl = "https://ryzeadvisory.co/blog/the-llm-brand-sentiment-index-we-use-for-quarterly-reviews";
let urlList = [targetUrl];

for (let i = 0; i < args.length; i++) {
  if (args[i] === "--check-key") {
    mode = "check-key";
  } else if (args[i] === "--sitemap") {
    mode = "sitemap";
  } else if (args[i] === "--url" && args[i + 1]) {
    targetUrl = args[i + 1];
    urlList = [targetUrl];
    i++;
  } else if (args[i] === "--custom" && args[i + 1]) {
    urlList = args[i + 1].split(",").map((u) => u.trim());
    i++;
  }
}

// Check live key file if requested
if (mode === "check-key") {
  console.log(`Testing remote key availability at: ${keyLocation}...`);
  try {
    const res = await fetch(keyLocation);
    console.log(`HTTP Status: ${res.status} ${res.statusText}`);
    const text = (await res.text()).trim();
    if (res.ok && text.includes(key)) {
      console.log(`✓ Remote key file verified successfully on live server!`);
    } else {
      console.log(`ℹ Remote key response: ${text.slice(0, 100)} (Deploy changes to make live)`);
    }
  } catch (err) {
    console.error(`✗ Connection check failed: ${err.message}`);
  }
  process.exit(0);
}

// If sitemap mode, fetch live sitemap
if (mode === "sitemap") {
  console.log("Fetching live sitemap entries from https://ryzeadvisory.co/sitemap.xml...");
  try {
    const res = await fetch("https://ryzeadvisory.co/sitemap.xml");
    if (!res.ok) throw new Error(`HTTP ${res.status} fetching sitemap`);
    const xml = await res.text();
    const matches = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g)).map((m) => m[1]);
    urlList = matches.filter((u) => !u.includes("$"));
    console.log(`Found ${urlList.length} clean URLs in sitemap.`);
  } catch (err) {
    console.error(`Failed to fetch sitemap: ${err.message}. Using default URL.`);
    urlList = [targetUrl];
  }
}

// Normalize and validate URLs
const cleanUrls = [];
for (const u of urlList) {
  let normalized = u.trim();
  if (normalized.startsWith("/")) {
    normalized = `${BASE_URL}${normalized}`;
  }
  try {
    const parsed = new URL(normalized);
    if (parsed.hostname === HOST || parsed.hostname === `www.${HOST}`) {
      parsed.hostname = HOST;
      parsed.protocol = "https:";
      cleanUrls.push(parsed.toString());
    } else {
      console.warn(`[Skip] Disallowed host: ${u}`);
    }
  } catch {
    console.warn(`[Skip] Invalid URL: ${u}`);
  }
}

const uniqueUrls = Array.from(new Set(cleanUrls)).slice(0, 10000);
console.log(`Submitting ${uniqueUrls.length} verified URL(s) to IndexNow API...`);
if (uniqueUrls.length <= 5) {
  uniqueUrls.forEach((u) => console.log(`  • ${u}`));
} else {
  uniqueUrls.slice(0, 3).forEach((u) => console.log(`  • ${u}`));
  console.log(`  ... and ${uniqueUrls.length - 3} more URLs.`);
}

const payload = {
  host: HOST,
  key,
  keyLocation,
  urlList: uniqueUrls,
};

try {
  const startTime = Date.now();
  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "User-Agent": "RyzeAdvisory-IndexNow-Client/1.0 (+https://ryzeadvisory.co)",
    },
    body: JSON.stringify(payload),
  });

  const duration = Date.now() - startTime;
  console.log("---------------------------------------------------------");
  console.log(`Response Status: HTTP ${response.status} ${response.statusText} (${duration}ms)`);

  let responseBody = "";
  try {
    responseBody = await response.text();
  } catch {}

  if (responseBody) {
    console.log(`Response Body:   ${responseBody}`);
  }

  if (response.status === 200) {
    console.log("✓ SUCCESS: URLs submitted and processed by IndexNow.");
  } else if (response.status === 202) {
    console.log("✓ ACCEPTED (HTTP 202): URLs received by IndexNow.");
    console.log("  Note: Search engines will validate the key at keyLocation before indexing.");
    console.log("  Ensure public/" + key + ".txt is deployed to production.");
  } else if (response.status === 400) {
    console.error("✗ ERROR (HTTP 400): Invalid request format.");
  } else if (response.status === 403) {
    console.error("✗ ERROR (HTTP 403): Forbidden. Key verification failed or key not found.");
  } else if (response.status === 422) {
    console.error("✗ ERROR (HTTP 422): Unprocessable Entity. URLs do not match host.");
  } else {
    console.log(`Status ${response.status}: ${response.statusText}`);
  }
  console.log("---------------------------------------------------------");
} catch (error) {
  console.error("✗ Submission Failed with exception:", error.message);
}

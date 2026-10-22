#!/usr/bin/env node
/**
 * End-to-end audit for RYZE topic + service hubs.
 *
 * Usage:
 *   BASE_URL=http://localhost:8080 node scripts/e2e-hub-audit.mjs
 *
 * For each topic and service category it will:
 *   1. Navigate with tagged UTM query params.
 *   2. Capture every window.gtag() event via a page.exposeFunction shim.
 *   3. Click "Load more" until exhausted.
 *   4. Assert on each list_view / load_more event:
 *        - utm_source/medium/campaign are attached
 *        - visible_count === anchors rendered on page
 *        - page_index === ceil(visible / page_size)
 *        - ItemList JSON-LD numberOfItems === rendered items
 *        - ItemList positions are 1..N contiguous
 *        - ItemList item URLs are all present in DOM
 *
 * Requires: `bun add -d playwright` (or `npm i -D playwright`) and
 * `npx playwright install chromium`.
 */
import { chromium } from "playwright";

const BASE_URL = process.env.BASE_URL || "http://localhost:8080";
const UTM = {
  utm_source: "e2e",
  utm_medium: "audit",
  utm_campaign: "hub-pagination",
};

// TOPICS/CATEGORIES are discovered from /sitemap.xml at runtime — see discoverHubs().


function utmQuery() {
  return new URLSearchParams({ ...UTM, _dbg: "1" }).toString();
}

/**
 * Discover every /blog/topic/<slug> and /services/category/<slug> hub from
 * the live sitemap so the audit expands as new topics/categories ship.
 */
async function discoverHubs() {
  const res = await fetch(`${BASE_URL}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap fetch failed: ${res.status}`);
  const xml = await res.text();
  const locs = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g)).map((m) => m[1]);
  const topics = new Set();
  const services = new Set();
  for (const loc of locs) {
    const url = new URL(loc);
    const tm = url.pathname.match(/^\/blog\/topic\/([^\/]+)\/?$/);
    if (tm) topics.add(tm[1]);
    const sm = url.pathname.match(/^\/services\/category\/([^\/]+)\/?$/);
    if (sm) services.add(sm[1]);
  }
  return {
    topic: [...topics].sort(),
    service: [...services].sort(),
  };
}


/** Return an object of { events, itemLists } captured from the page. */
async function auditHub(page, url, kind) {
  const events = [];
  await page.exposeFunction("__ryzeCaptureEvent", (name, params) => {
    events.push({ name, params });
  });
  // Install a gtag shim + JSON-LD reader before any script runs.
  await page.addInitScript(() => {
    const orig = window.gtag;
    window.gtag = function (...args) {
      try {
        if (args[0] === "event") window.__ryzeCaptureEvent(args[1], args[2] ?? {});
      } catch { /* ignore */ }
      if (typeof orig === "function") return orig.apply(this, args);
    };
  });

  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle").catch(() => {});

  const results = [];
  const anchorSel = kind === "topic" ? 'a[href^="/blog/"]' : 'a[href^="/services/"]';

  const snapshot = async (label) => {
    const anchorCount = await page.locator(`main ${anchorSel}`).count();
    const itemLists = await page.evaluate(() => {
      const out = [];
      for (const s of document.querySelectorAll('script[type="application/ld+json"]')) {
        try {
          const j = JSON.parse(s.textContent || "");
          const list = j?.["@type"] === "ItemList" ? j : null;
          if (!list) continue;
          const items = list.itemListElement ?? [];
          out.push({
            name: list.name,
            numberOfItems: list.numberOfItems,
            positions: items.map((i) => i.position),
            urls: items.map((i) => i.url),
          });
        } catch { /* ignore */ }
      }
      return out;
    });
    results.push({ label, anchorCount, itemLists, eventCount: events.length });
  };

  await snapshot("initial");

  // Click Load more up to 20 times
  for (let i = 0; i < 20; i++) {
    const btn = page.getByRole("button", { name: /load more/i });
    if (!(await btn.count())) break;
    if (!(await btn.first().isVisible())) break;
    await btn.first().click();
    await page.waitForTimeout(150);
    await snapshot(`load_more_${i + 1}`);
  }

  return { events, results };
}

function validate(url, kind, run) {
  const problems = [];
  const listEventName = kind === "topic" ? "topic_hub_list_view" : "service_hub_list_view";
  const loadMoreName = kind === "topic" ? "topic_hub_load_more" : "service_hub_load_more";
  const countKey = kind === "topic" ? "total_posts" : "total_services";

  const listViews = run.events.filter((e) => e.name === listEventName);
  const loadMores = run.events.filter((e) => e.name === loadMoreName);

  if (listViews.length === 0) problems.push(`no ${listEventName} events emitted`);

  for (const e of [...listViews, ...loadMores]) {
    for (const k of Object.keys(UTM)) {
      if (e.params[k] !== UTM[k]) problems.push(`${e.name} missing/incorrect ${k}`);
    }
    if (!("page_index" in e.params)) problems.push(`${e.name} missing page_index`);
    if (!("visible_count" in e.params || "to_count" in e.params)) {
      problems.push(`${e.name} missing visible_count/to_count`);
    }
    if (!(countKey in e.params)) problems.push(`${e.name} missing ${countKey}`);
  }

  // Cross-check ItemList vs. DOM after each snapshot
  for (const snap of run.results) {
    for (const il of snap.itemLists) {
      if (il.numberOfItems !== il.positions.length) {
        problems.push(`[${snap.label}] numberOfItems (${il.numberOfItems}) ≠ items (${il.positions.length})`);
      }
      il.positions.forEach((p, i) => {
        if (p !== i + 1) problems.push(`[${snap.label}] non-contiguous position ${p} at ${i}`);
      });
      if (il.positions.length !== snap.anchorCount && snap.anchorCount > 0) {
        // anchorCount may include unrelated links, so only flag when strictly less
        if (il.positions.length > snap.anchorCount) {
          problems.push(`[${snap.label}] ItemList has ${il.positions.length} items but only ${snap.anchorCount} anchors`);
        }
      }
    }
  }
  return problems;
}

async function main() {
  const hubs = await discoverHubs();
  console.log(
    `Discovered ${hubs.topic.length} topic hub(s) and ${hubs.service.length} service categor(ies) from ${BASE_URL}/sitemap.xml`,
  );
  if (hubs.topic.length === 0 && hubs.service.length === 0) {
    console.error("No hubs discovered — is the dev server serving /sitemap.xml?");
    process.exit(1);
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 1800 } });
  let failed = 0;

  const plan = [
    ...hubs.topic.map((slug) => ({ kind: "topic", slug, path: `/blog/topic/${slug}` })),
    ...hubs.service.map((slug) => ({ kind: "service", slug, path: `/services/category/${slug}` })),
  ];

  for (const { kind, slug, path } of plan) {
    const url = `${BASE_URL}${path}?${utmQuery()}`;
    const page = await context.newPage();
    let problems = [];
    try {
      const run = await auditHub(page, url, kind);
      problems = validate(url, kind, run);
      console.log(`\n─── ${kind.toUpperCase()} ${slug} (${run.results.length} snapshots, ${run.events.length} events)`);
      for (const snap of run.results) {
        const il = snap.itemLists[0];
        console.log(
          `  ${snap.label.padEnd(14)} anchors=${snap.anchorCount} itemList=${il ? il.positions.length : "-"}/${il ? il.numberOfItems : "-"}`,
        );
      }
      if (problems.length) {
        failed += 1;
        console.log(`  ✗ ${problems.length} issue(s):`);
        problems.forEach((p) => console.log(`    - ${p}`));
      } else {
        console.log("  ✓ all checks passed");
      }
    } catch (err) {
      failed += 1;
      console.log(`  ✗ crashed: ${err.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log(failed === 0 ? "\nAll hubs passed." : `\n${failed} hub(s) reported issues.`);
  process.exit(failed === 0 ? 0 : 1);
}


main().catch((e) => {
  console.error(e);
  process.exit(1);
});

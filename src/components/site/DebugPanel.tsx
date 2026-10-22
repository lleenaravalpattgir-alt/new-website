import { useEffect, useState } from "react";
import { getUtms, isDebugEnabled, type TrackedEvent } from "@/lib/track";

type ItemListReport = {
  ok: boolean;
  name?: string;
  numberOfItems?: number;
  positions: number[];
  urls: string[];
  domCount: number;
  issues: string[];
};

function readItemLists(): ItemListReport[] {
  if (typeof document === "undefined") return [];
  const nodes = Array.from(document.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]'));
  const reports: ItemListReport[] = [];
  for (const node of nodes) {
    try {
      const json = JSON.parse(node.textContent ?? "");
      const list = Array.isArray(json) ? json.find((x) => x?.["@type"] === "ItemList") : json?.["@type"] === "ItemList" ? json : null;
      if (!list) continue;
      const items: Array<{ position?: number; url?: string; name?: string }> = list.itemListElement ?? [];
      const positions = items.map((i) => Number(i.position));
      const urls = items.map((i) => String(i.url ?? ""));
      const issues: string[] = [];
      positions.forEach((p, i) => {
        if (p !== i + 1) issues.push(`position mismatch at index ${i}: got ${p}, expected ${i + 1}`);
      });
      if (typeof list.numberOfItems === "number" && list.numberOfItems !== items.length) {
        issues.push(`numberOfItems (${list.numberOfItems}) ≠ items rendered (${items.length})`);
      }
      // DOM cross-check: count anchors that link to the ItemList URLs (path suffix match)
      const anchors = Array.from(document.querySelectorAll<HTMLAnchorElement>("main a[href]"));
      const domHrefs = new Set(anchors.map((a) => new URL(a.href, window.location.origin).pathname));
      let matched = 0;
      for (const u of urls) {
        try {
          const p = new URL(u).pathname;
          if (domHrefs.has(p)) matched += 1;
        } catch { /* ignore */ }
      }
      if (matched !== items.length) {
        issues.push(`only ${matched}/${items.length} ItemList URLs found in rendered DOM`);
      }
      reports.push({
        ok: issues.length === 0,
        name: list.name,
        numberOfItems: list.numberOfItems,
        positions,
        urls,
        domCount: matched,
        issues,
      });
    } catch {
      // skip malformed json-ld
    }
  }
  return reports;
}

export function DebugPanel() {
  const [enabled, setEnabled] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [events, setEvents] = useState<TrackedEvent[]>([]);
  const [reports, setReports] = useState<ItemListReport[]>([]);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setEnabled(isDebugEnabled());
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const refresh = () => {
      setEvents([...(window.__ryzeEvents ?? [])]);
      setReports(readItemLists());
    };
    refresh();
    window.__ryzeOnEvent = () => refresh();
    // Re-scan JSON-LD after DOM mutations (Load more re-renders)
    const mo = new MutationObserver(() => setTick((t) => t + 1));
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      mo.disconnect();
      window.__ryzeOnEvent = undefined;
    };
  }, [enabled]);

  useEffect(() => {
    if (enabled) setReports(readItemLists());
  }, [tick, enabled]);

  if (!enabled) return null;

  const utms = getUtms();
  const hubEvents = events.filter((e) =>
    /^(topic_hub_|service_hub_|breadcrumb_click)/.test(e.name),
  );
  const last = hubEvents.slice(-8).reverse();

  return (
    <div
      style={{
        position: "fixed",
        right: 12,
        bottom: 96,
        width: 380,
        maxHeight: "70vh",
        overflow: "auto",
        zIndex: 9999,
        background: "rgba(15,15,20,0.95)",
        color: "#e6e6e6",
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        fontSize: 11,
        lineHeight: 1.35,
        border: "1px solid #333",
        borderRadius: 8,
        boxShadow: "0 8px 24px rgba(0,0,0,0.45)",
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 10px", borderBottom: "1px solid #2a2a2a", background: "#1a1a1f", cursor: "pointer" }}
        onClick={() => setCollapsed((c) => !c)}
      >
        <strong style={{ color: "#7dd3fc" }}>RYZE GA4 Debug</strong>
        <span style={{ opacity: 0.7 }}>{collapsed ? "▲ show" : "▼ hide"} · ?_dbg=0 to close</span>
      </div>
      {!collapsed && (
        <div style={{ padding: 10 }}>
          <div style={{ marginBottom: 8 }}>
            <div style={{ color: "#a3e635" }}>UTMs (sessionStorage)</div>
            {Object.keys(utms).length ? (
              <pre style={{ margin: "4px 0 0", whiteSpace: "pre-wrap" }}>{JSON.stringify(utms, null, 2)}</pre>
            ) : (
              <div style={{ opacity: 0.6 }}>none captured — append ?utm_source=debug&utm_medium=test&utm_campaign=hubs</div>
            )}
          </div>

          <div style={{ marginBottom: 8 }}>
            <div style={{ color: "#fbbf24" }}>ItemList JSON-LD ({reports.length} on page)</div>
            {reports.length === 0 && <div style={{ opacity: 0.6 }}>no ItemList on this route</div>}
            {reports.map((r, i) => (
              <div key={i} style={{ marginTop: 4, padding: 6, border: `1px solid ${r.ok ? "#166534" : "#7f1d1d"}`, borderRadius: 4 }}>
                <div style={{ color: r.ok ? "#4ade80" : "#f87171" }}>
                  {r.ok ? "✓ valid" : "✗ issues"} · {r.name ?? "ItemList"}
                </div>
                <div>numberOfItems: {String(r.numberOfItems)} · rendered: {r.positions.length} · in DOM: {r.domCount}</div>
                <div>positions: [{r.positions.join(", ")}]</div>
                {r.issues.map((iss, j) => (
                  <div key={j} style={{ color: "#f87171" }}>• {iss}</div>
                ))}
              </div>
            ))}
          </div>

          <div>
            <div style={{ color: "#c4b5fd" }}>Recent hub/breadcrumb events ({hubEvents.length} total)</div>
            {last.length === 0 && <div style={{ opacity: 0.6 }}>none yet — interact with hubs / breadcrumbs</div>}
            {last.map((e, i) => {
              const p = e.params as Record<string, unknown>;
              const hasUtm = Object.keys(p).some((k) => k.startsWith("utm_"));
              const hasPageIndex = "page_index" in p;
              const hasVisible = "visible_count" in p || "to_count" in p;
              const isHub = e.name.startsWith("topic_hub_") || e.name.startsWith("service_hub_");
              return (
                <div key={i} style={{ marginTop: 6, padding: 6, background: "#111", border: "1px solid #262626", borderRadius: 4 }}>
                  <div style={{ color: "#7dd3fc" }}>{e.name}</div>
                  <div style={{ fontSize: 10, opacity: 0.7 }}>{new Date(e.ts).toLocaleTimeString()}</div>
                  <div style={{ fontSize: 10 }}>
                    <span style={{ color: hasUtm ? "#4ade80" : "#f87171" }}>utm {hasUtm ? "✓" : "✗"}</span>
                    {isHub && (
                      <>
                        {" · "}
                        <span style={{ color: hasPageIndex ? "#4ade80" : "#f87171" }}>page_index {hasPageIndex ? "✓" : "✗"}</span>
                        {" · "}
                        <span style={{ color: hasVisible ? "#4ade80" : "#f87171" }}>visible {hasVisible ? "✓" : "✗"}</span>
                      </>
                    )}
                  </div>
                  <pre style={{ margin: "4px 0 0", whiteSpace: "pre-wrap" }}>{JSON.stringify(p, null, 2)}</pre>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    __ryzeEvents?: TrackedEvent[];
    __ryzeDebug?: boolean;
    __ryzeOnEvent?: (e: TrackedEvent) => void;
  }
}

export interface TrackedEvent {
  ts: number;
  name: string;
  params: Record<string, unknown>;
}

const RING_MAX = 50;
const DEBUG_KEY = "ryze:debug:v1";

export function isDebugEnabled(): boolean {
  if (typeof window === "undefined") return false;
  if (window.__ryzeDebug) return true;
  try {
    const sp = new URLSearchParams(window.location.search);
    if (sp.get("_dbg") === "1") {
      window.sessionStorage.setItem(DEBUG_KEY, "1");
      window.__ryzeDebug = true;
      return true;
    }
    if (sp.get("_dbg") === "0") {
      window.sessionStorage.removeItem(DEBUG_KEY);
      window.__ryzeDebug = false;
      return false;
    }
    if (window.sessionStorage.getItem(DEBUG_KEY) === "1") {
      window.__ryzeDebug = true;
      return true;
    }
  } catch {
    // ignore
  }
  return false;
}


const UTM_KEY = "ryze:utm:v1";
const UTM_FIELDS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

export type UtmParams = Partial<Record<(typeof UTM_FIELDS)[number], string>>;

/** Capture UTM params from URL into sessionStorage (first-touch wins per session). */
export function captureUtms(): UtmParams {
  if (typeof window === "undefined") return {};
  try {
    const existing = window.sessionStorage.getItem(UTM_KEY);
    const sp = new URLSearchParams(window.location.search);
    const fresh: UtmParams = {};
    for (const k of UTM_FIELDS) {
      const v = sp.get(k);
      if (v) fresh[k] = v;
    }
    if (Object.keys(fresh).length) {
      window.sessionStorage.setItem(UTM_KEY, JSON.stringify(fresh));
      return fresh;
    }
    if (existing) return JSON.parse(existing) as UtmParams;
  } catch {
    // ignore
  }
  return {};
}

export function getUtms(): UtmParams {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.sessionStorage.getItem(UTM_KEY);
    return raw ? (JSON.parse(raw) as UtmParams) : {};
  } catch {
    return {};
  }
}

export function track(name: string, params: Record<string, unknown> = {}) {
  const utms = getUtms();
  const merged = { ...utms, ...params };
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", name, merged);
  }
  if (typeof window !== "undefined") {
    const evt: TrackedEvent = { ts: Date.now(), name, params: merged };
    if (!window.__ryzeEvents) window.__ryzeEvents = [];
    window.__ryzeEvents.push(evt);
    if (window.__ryzeEvents.length > RING_MAX) window.__ryzeEvents.shift();
    if (isDebugEnabled()) {
      // eslint-disable-next-line no-console
      console.info(`[ga4] ${name}`, merged);
      try { window.__ryzeOnEvent?.(evt); } catch { /* ignore */ }
    }
  }
}


/** Manually emit a GA4 page_view with standardized fields for SPA route changes. */
export function trackPageView(pagePath: string, extra: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  const utms = getUtms();
  window.gtag("event", "page_view", {
    page_path: pagePath,
    page_location: window.location.href,
    page_title: document.title,
    ...utms,
    ...extra,
  });
}

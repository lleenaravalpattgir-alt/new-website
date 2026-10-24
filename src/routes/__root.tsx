import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const path = window.location.pathname + window.location.search;
    const isTemplate = /\/\$[a-zA-Z_]/.test(window.location.pathname);
    const referrer = document.referrer || "(direct)";
    // Fire GA4 event so 404s (especially literal $template URLs) surface in DebugView.
    import("@/lib/track").then(({ track }) => {
      track(isTemplate ? "template_url_404" : "not_found_404", {
        path,
        referrer,
        is_template_url: isTemplate,
      });
    });
    if (isTemplate) {
      // Loud console alert so it shows up in Lovable error logs / Sentry-style capture.
      console.error("[404-monitor] Literal template URL requested:", path);
      // Best-effort webhook so we get an email alert immediately.
      try {
        fetch("/api/public/alerts/template-404", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ path, referrer }),
          keepalive: true,
        }).catch(() => undefined);
      } catch {
        // ignore
      }
    }
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-extrabold text-primary">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center rounded-md bg-[#0B1F3B] px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[#D4A238] hover:text-[#0F1E2F]">
            Back to Rise Advisory
          </Link>
        </div>
      </div>
    </div>
  );
}


function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Something went wrong. Try again or head home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-accent hover:text-accent-foreground"
          >
            Try again
          </button>
          <a href="/" className="rounded-md border border-input bg-background px-4 py-2 text-sm font-semibold text-foreground hover:bg-accent hover:text-accent-foreground">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Rise Advisory — Fractional Leadership & Business Growth Advisory" },
      { name: "description", content: "Rise Advisory connects growing businesses with fractional CXOs across Growth, Finance, Tech, and Operations for measurable 90-day execution sprints." },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
      { property: "og:site_name", content: "Rise Advisory" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_US" },
      { property: "og:url", content: "https://ryzeadvisory.co/" },
      { property: "og:title", content: "Rise Advisory — Fractional Leadership & Business Growth Advisory" },
      { property: "og:description", content: "Build your next stage without hiring an entire C-suite. Fractional CXOs and measurable 90-day execution sprints." },
      { property: "og:image", content: "https://ryzeadvisory.co/logo.png" },
      { property: "og:image:secure_url", content: "https://ryzeadvisory.co/logo.png" },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Rise Advisory — Fractional Leadership & Business Growth Advisory" },
      { name: "twitter:description", content: "Build your next stage without hiring an entire C-suite. Fractional CXOs and measurable 90-day execution sprints." },
      { name: "twitter:image", content: "https://ryzeadvisory.co/logo.png" },
      { name: "theme-color", content: "#0B1F3B" },
    ],
    links: [
      { rel: "icon", type: "image/png", href: "/logo.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" },
      { rel: "stylesheet", href: appCss },
    ],
    scripts: [
      { src: "https://www.googletagmanager.com/gtag/js?id=G-6LQRJ00KCJ", async: true },
      {
        children:
          "window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-6LQRJ00KCJ');",
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Rise Advisory",
          url: "https://ryzeadvisory.co",
          logo: "https://ryzeadvisory.co/logo.png",
          telephone: "+919313967971",
          email: "hello@riseadvisory.co",
          address: {
            "@type": "PostalAddress",
            streetAddress: "E 1119 Ganesh Glory 11, Jagatpur, Gota",
            addressLocality: "Ahmedabad",
            addressRegion: "Gujarat",
            postalCode: "382470",
            addressCountry: "IN",
          },
          sameAs: [
            "https://www.linkedin.com/company/ryzeadvisoryofficial/",
            "https://x.com/RyzeAdvisoryHQ",
            "https://www.instagram.com/ryzeadvisory",
            "https://in.pinterest.com/lleenaravalpattgir2/",
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><HeadContent /></head>
      <body suppressHydrationWarning>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();
  useEffect(() => {
    // First-touch UTM capture and initial page_view (gtag config already fires
    // an initial page_view, but we re-fire to attach UTMs as consistent params).
    import("@/lib/track").then(({ captureUtms, trackPageView }) => {
      captureUtms();
      trackPageView(window.location.pathname + window.location.search);
    });
    const unsub = router.subscribe("onResolved", () => {
      import("@/lib/track").then(({ trackPageView }) => {
        trackPageView(window.location.pathname + window.location.search);
      });
    });
    return unsub;
  }, [router]);
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toaster position="top-right" richColors />
    </QueryClientProvider>
  );
}

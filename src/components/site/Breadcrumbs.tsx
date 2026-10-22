import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { track } from "@/lib/track";

export interface Crumb {
  label: string;
  /** Absolute path. Omit on the last (current) crumb. */
  href?: string;
}

interface Props {
  items: Crumb[];
  /** Stable id used in GA4 events (e.g. "blog_post", "service_detail"). */
  context: string;
  /** "dark" = on hero gradient; "light" = on neutral background. */
  tone?: "dark" | "light";
  /** Extra GA4 fields merged into every breadcrumb_click on this instance. */
  eventContext?: Record<string, string | number | undefined>;
}

const ORIGIN = "https://ryzeadvisory.co";

export function Breadcrumbs({ items, context, tone = "light", eventContext = {} }: Props) {
  if (items.length === 0) return null;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${ORIGIN}${c.href}` } : {}),
    })),
  };

  const currentClass = tone === "dark" ? "text-primary-foreground/70" : "text-muted-foreground";
  const separatorClass = tone === "dark" ? "text-primary-foreground/50" : "text-muted-foreground/60";

  return (
    <nav aria-label="Breadcrumb" className="text-xs">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((c, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${c.label}-${i}`} className="inline-flex items-center gap-1.5">
              {c.href && !isLast ? (
                <Link
                  to={c.href}
                  onClick={() =>
                    track("breadcrumb_click", {
                      breadcrumb_context: context,
                      breadcrumb_position: i + 1,
                      position: i + 1,
                      breadcrumb_label: c.label,
                      label: c.label,
                      breadcrumb_destination: c.href,
                      destination: c.href,
                      destination_path: c.href,
                      breadcrumb_depth: items.length,
                      ...eventContext,
                    })
                  }
                  className="font-semibold uppercase tracking-widest text-accent hover:underline"
                >
                  {c.label}
                </Link>
              ) : (
                <span aria-current="page" className={`font-semibold uppercase tracking-widest ${currentClass}`}>
                  {c.label}
                </span>
              )}
              {!isLast && <ChevronRight className={`h-3 w-3 ${separatorClass}`} aria-hidden />}
            </li>
          );
        })}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </nav>
  );
}

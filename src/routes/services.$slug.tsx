import { createFileRoute, notFound, redirect, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Hero } from "@/components/site/Hero";
import { StickyCTA } from "@/components/site/StickyCTA";
import { CTAButton } from "@/components/site/CTAButton";
import { LeadForm } from "@/components/site/LeadForm";
import { AgencyValue } from "@/components/site/AgencyValue";
import { EcosystemGrid } from "@/components/site/EcosystemGrid";
import { getService, services, type Service } from "@/data/services";
import { blogPosts } from "@/data/blog";
import { CheckCircle2, ArrowUpRight, AlertTriangle, BookOpen } from "lucide-react";
import { buildTitle, buildDescription, buildCanonical, ORG_NAME, ORG_LOGO, toAbsoluteUrl } from "@/lib/seo";
import ogDefault from "@/assets/og-default.jpg";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";

type CategoryCopy = {
  heroTagline: string;
  metaBlurb: string;
  solutionEyebrow: string;
  ctaLabel: string;
};

const DEFAULT_COPY: CategoryCopy = {
  heroTagline: "Build systems that move the P&L.",
  metaBlurb: "Senior consultants who design, build, and ship the system — not just the slide.",
  solutionEyebrow: "Our Solution",
  ctaLabel: "ship this",
};

const CATEGORY_COPY: Record<string, CategoryCopy> = {
  "Brand Advisory": {
    heroTagline: "Brand systems engineered for premium perception.",
    metaBlurb: "Positioning, identity, and digital experience built to compound brand equity into revenue.",
    solutionEyebrow: "Our Brand Approach",
    ctaLabel: "build this brand system",
  },
  "HR Consultancy": {
    heroTagline: "People systems built for scale.",
    metaBlurb: "Modern HR architecture — performance, org design, compliance, retention — engineered around how your business actually grows.",
    solutionEyebrow: "Our HR Approach",
    ctaLabel: "deploy this HR system",
  },
  "Talent Acquisition": {
    heroTagline: "Hire the people who change the trajectory.",
    metaBlurb: "Executive search, technical recruiting, and volume hiring run with the rigor of an in-house team.",
    solutionEyebrow: "Our Search Approach",
    ctaLabel: "open this search",
  },
};

const AI_CATEGORIES = [
  "AI Automation",
  "Agentic Workflows",
  "Operational AI Agents",
  "Client-Facing AI",
  "Research & Intelligence",
  "GEO & AI SEO",
  "Content Automation",
];

const AI_COPY: CategoryCopy = {
  heroTagline: "Ship AI that moves the P&L.",
  metaBlurb: "AI Automation & AI Strategy built for operational efficiency — shipped as production-grade systems, not slideware.",
  solutionEyebrow: "Our AI Solution",
  ctaLabel: "ship this AI system",
};

function getCategoryCopy(category: string): CategoryCopy {
  if (CATEGORY_COPY[category]) return CATEGORY_COPY[category];
  if (AI_CATEGORIES.includes(category)) return AI_COPY;
  return DEFAULT_COPY;
}




// 301 redirect map: legacy / misspelled slugs → correct canonical slugs
const SLUG_REDIRECTS: Record<string, string> = {
  "corporate-identity-overhauls": "corporate-identity-systems",
  "performance-management-systems": "performance-management",
};

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    if (!params.slug || params.slug.startsWith("$")) {
      throw redirect({ to: "/services", statusCode: 301 });
    }
    // Permanent redirect for legacy / alias slugs
    if (SLUG_REDIRECTS[params.slug]) {
      throw redirect({
        to: "/services/$slug",
        params: { slug: SLUG_REDIRECTS[params.slug] },
        statusCode: 301,
      });
    }
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  headers: () => ({
    "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
    "CDN-Cache-Control": "max-age=86400, stale-while-revalidate=604800",
    "Cloudflare-CDN-Cache-Control": "max-age=86400, stale-while-revalidate=604800",
  }),
  head: ({ loaderData }) => {
    const s = loaderData?.service;
    if (!s) {
      return {
        meta: [
          { title: buildTitle("Service") },
          { name: "description", content: buildDescription("AI consulting and AI automation services for agencies. Book a free AI strategy call with RYZE Advisory.") },
        ],
      };
    }
    const title = buildTitle(s.title);
    const copy = getCategoryCopy(s.category);
    const description = buildDescription(
      `${s.tagline}. ${copy.metaBlurb} Book a free strategy call.`,
    );
    const canonicalUrl = buildCanonical(`/services/${s.slug}`);

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: canonicalUrl },
        { property: "og:image", content: toAbsoluteUrl(ogDefault) },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: toAbsoluteUrl(ogDefault) },
      ],
      links: [{ rel: "canonical", href: canonicalUrl }],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: s.title,
          serviceType: s.category,
          description,
          url: canonicalUrl,
          provider: {
            "@type": "Organization",
            name: ORG_NAME,
            logo: ORG_LOGO,
          },
          areaServed: "Worldwide",
          audience: { "@type": "BusinessAudience", audienceType: "Marketing & Digital Agencies" },
          offers: {
            "@type": "Offer",
            name: "Free AI Strategy Call",
            url: "/contact",
            price: "0",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            category: "Consultation",
          },
        }),
      }],
    };
  },
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="text-4xl font-extrabold text-primary">Service not found</h1>
        <p className="mt-3 text-muted-foreground">Browse all 30 services.</p>
        <div className="mt-8"><CTAButton label="View Services" to="/services" /></div>
      </div>
    </SiteLayout>
  ),
  errorComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="text-4xl font-extrabold text-primary">Something went wrong</h1>
      </div>
    </SiteLayout>
  ),
  component: ServicePage,
});

function ServicePage() {
  const { service } = Route.useLoaderData();
  const copy = getCategoryCopy(service.category);
  const sameCategory = services.filter((s) => s.slug !== service.slug && s.category === service.category);
  const others = services.filter((s) => s.slug !== service.slug && s.category !== service.category);
  const related = [...sameCategory, ...others].slice(0, 3);

  // Contextual internal links: blog posts mapped to this service first, then same-pillar fillers
  const directPosts = blogPosts.filter((p) => p.relatedService === service.slug);
  const fillerPosts = blogPosts.filter(
    (p) => p.relatedService !== service.slug && sameCategory.some((s) => s.slug === p.relatedService),
  );
  const relatedPosts = [...directPosts, ...fillerPosts].slice(0, 4);

  return (
    <SiteLayout>
      <div className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <Breadcrumbs
            tone="light"
            context="service_detail"
            eventContext={{
              service_slug: service.slug,
              service_category: service.category,
            }}
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: service.category },
              { label: service.title },
            ]}
          />
        </div>
      </div>
      <Hero
        eyebrow={service.category}
        title={`${service.title}. ${copy.heroTagline}`}
        subtitle={`${service.tagline}. ${copy.metaBlurb}`}
      />

      {/* Problem */}
      <section className="bg-background py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
              <AlertTriangle className="h-3.5 w-3.5" /> The Problem
            </div>
            <h2 className="mt-3 text-4xl font-extrabold text-primary">What it costs to wait.</h2>
            <p className="mt-4 text-muted-foreground">{service.problem}</p>
          </div>
          <ul className="space-y-4">
            {(service.problemPoints as string[]).map((p: string) => (
              <li key={p} className="flex gap-3 rounded-lg border-l-4 border-destructive/60 bg-card p-5 shadow-sm">
                <span className="text-destructive">×</span>
                <span className="text-sm font-medium text-foreground">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Solution */}
      <section className="bg-secondary/40 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-widest text-accent">{copy.solutionEyebrow}</div>

            <h2 className="mt-3 text-4xl font-extrabold text-primary">{service.solution}</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {service.solutionSteps.map((step: Service["solutionSteps"][number], i: number) => (
              <div key={step.title} className="relative rounded-xl border border-border bg-card p-7 shadow-sm">
                <div className="font-display text-5xl font-extrabold text-accent/30">0{i + 1}</div>
                <h3 className="mt-3 text-lg font-bold text-primary">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-background py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-widest text-accent">Core Benefits</div>
            <h2 className="mt-3 text-4xl font-extrabold text-primary">Metric-driven outcomes.</h2>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
            {service.benefits.map((b: Service["benefits"][number]) => (
              <div key={b.label} className="bg-card p-8">
                <div className="font-display text-5xl font-extrabold text-accent">{b.metric}</div>
                <div className="mt-3 text-sm font-semibold uppercase tracking-wide text-primary">{b.label}</div>
                <p className="mt-2 text-sm text-muted-foreground">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EcosystemGrid />

      <AgencyValue />

      {/* Contextual insights — internal links with optimized anchor text */}
      {relatedPosts.length > 0 && (
        <section className="bg-background py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
              <BookOpen className="h-3.5 w-3.5" /> Insights for {service.title.toLowerCase()}
            </div>
            <h2 className="mt-3 text-3xl font-extrabold text-primary">
              How we think about {service.title.toLowerCase()}.
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {relatedPosts.map((p) => (
                <Link
                  key={p.slug}
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  title={`Read: ${p.title}`}
                  className="group flex items-start justify-between gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-accent hover:shadow-elegant"
                >
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-widest text-accent">
                      {p.pillar} · {p.readingTime}
                    </div>
                    <div className="mt-1.5 text-base font-bold leading-snug text-primary group-hover:text-accent">
                      {p.title}
                    </div>
                  </div>
                  <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </Link>
              ))}
            </div>
            <div className="mt-6">
              <Link to="/blog" className="text-sm font-semibold text-primary underline-offset-4 hover:text-accent hover:underline">
                Browse all RYZE insights →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Related services */}
      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl font-extrabold text-primary">Related services</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {related.map((s: typeof services[number]) => (
              <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="group rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent hover:shadow-elegant">
                <div className="text-xs font-semibold uppercase tracking-widest text-accent">{s.category}</div>
                <h3 className="mt-2 text-lg font-bold text-primary group-hover:text-accent">{s.title}</h3>
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:text-accent">
                  Explore <ArrowUpRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1fr_440px]">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-accent">Talk to us</div>
            <h2 className="mt-3 text-balance text-4xl font-extrabold text-primary md:text-5xl">
              Scope <span className="text-accent">{service.title}</span> in 30 minutes.
            </h2>
            <p className="mt-5 max-w-xl text-muted-foreground">
              Bring your context. We'll bring frameworks, references, and a direct answer on whether this is the right next move.
            </p>
          </div>
          <LeadForm />
        </div>
      </section>

      <StickyCTA title={`Ready to ${copy.ctaLabel}?`} />
    </SiteLayout>
  );
}

// suppress unused
void CheckCircle2;

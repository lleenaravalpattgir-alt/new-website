import { useEffect, useState } from "react";
import { createFileRoute, notFound, redirect, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { LeadForm } from "@/components/site/LeadForm";
import { CTAButton } from "@/components/site/CTAButton";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { buildTitle, buildDescription, buildCanonical, ORG_NAME, ORG_LOGO, ABSOLUTE_ORG_LOGO } from "@/lib/seo";
import { ArrowUpRight } from "lucide-react";
import { track } from "@/lib/track";
import { topicBySlug, servicesForTopic, postsForTopic, topics } from "@/data/blogTopics";
import type { Service } from "@/data/services";
import type { BlogPost } from "@/data/blog";

const ORIGIN = "https://ryzeadvisory.co";

export const Route = createFileRoute("/services/category/$category")({
  loader: ({ params }) => {
    if (!params.category || params.category.startsWith("$")) {
      throw redirect({ to: "/services", statusCode: 301 });
    }
    const topic = topicBySlug(params.category);
    if (!topic) throw notFound();
    return {
      topic,
      svcs: servicesForTopic(topic.slug),
      posts: postsForTopic(topic.slug).slice(0, 10),
    };
  },
  head: ({ loaderData }) => {
    const t = loaderData?.topic;
    if (!t) return { meta: [{ title: buildTitle("Service Category") }] };
    const title = buildTitle(`${t.label} Services & Insights`);
    const description = buildDescription(
      `${t.blurb} RYZE Advisory ${t.label} services with the top 10 insights from our team.`,
    );
    const canonicalUrl = buildCanonical(`/services/category/${t.slug}`);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: canonicalUrl },
        { property: "og:type", content: "website" },
        { property: "og:image", content: "https://ryzeadvisory.co/logo.png" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: "https://ryzeadvisory.co/logo.png" },
      ],
      links: [{ rel: "canonical", href: canonicalUrl }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: `${t.label} — RYZE Advisory Services & Insights`,
            description,
            url: canonicalUrl,
            publisher: { "@type": "Organization", name: ORG_NAME, logo: { "@type": "ImageObject", url: ABSOLUTE_ORG_LOGO } },
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="text-4xl font-extrabold text-primary">Category not found</h1>
        <div className="mt-8"><CTAButton label="All services" to="/services" /></div>
      </div>
    </SiteLayout>
  ),
  component: CategoryPage,
});

const SERVICE_PAGE_SIZE = 6;

function CategoryPage() {
  const { topic, svcs, posts } = Route.useLoaderData();
  const [visible, setVisible] = useState(SERVICE_PAGE_SIZE);

  useEffect(() => {
    setVisible(SERVICE_PAGE_SIZE);
    track("service_hub_view", {
      topic_slug: topic.slug,
      topic_label: topic.label,
      total_services: svcs.length,
      page_size: SERVICE_PAGE_SIZE,
    });
    track("service_hub_list_view", {
      topic_slug: topic.slug,
      topic_label: topic.label,
      visible_count: Math.min(SERVICE_PAGE_SIZE, svcs.length),
      total_services: svcs.length,
      page_index: 1,
    });
  }, [topic.slug, topic.label, svcs.length]);

  const shownSvcs = svcs.slice(0, visible);
  const hasMore = visible < svcs.length;

  const loadMore = () => {
    const next = Math.min(visible + SERVICE_PAGE_SIZE, svcs.length);
    const pageIndex = Math.ceil(next / SERVICE_PAGE_SIZE);
    setVisible(next);
    track("service_hub_load_more", {
      topic_slug: topic.slug,
      topic_label: topic.label,
      from_count: visible,
      to_count: next,
      total_services: svcs.length,
      page_index: pageIndex,
    });
    track("service_hub_list_view", {
      topic_slug: topic.slug,
      topic_label: topic.label,
      visible_count: next,
      total_services: svcs.length,
      page_index: pageIndex,
    });
  };

  const servicesItemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${topic.label} Services (showing ${shownSvcs.length} of ${svcs.length})`,
    numberOfItems: shownSvcs.length,
    itemListElement: shownSvcs.map((s: Service, i: number) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${ORIGIN}/services/${s.slug}`,
      name: s.title,
    })),
  };

  return (
    <SiteLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesItemListLd) }} />
      <section className="bg-gradient-to-b from-[#F8FBFF] via-[#EEF4FA] to-[#FFFFFF] py-20 md:py-24 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-7xl px-6">
          <Breadcrumbs
            tone="light"
            context="service_hub"
            eventContext={{ topic_slug: topic.slug, topic_label: topic.label }}
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: topic.label },
            ]}
          />
          <div className="mt-4 text-xs font-semibold uppercase tracking-widest text-[#B8860B]">Service Hub</div>
          <h1 className="mt-2 max-w-3xl text-balance text-5xl font-extrabold md:text-6xl text-[#0F1E2F]">{topic.label}</h1>
          <p className="mt-5 max-w-2xl text-[#53637C]">{topic.blurb}</p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-[#53637C]">
            <span>{svcs.length} services</span>
            <span aria-hidden>·</span>
            <span>{posts.length} latest insights</span>
            <span aria-hidden>·</span>
            <Link
              to="/blog/topic/$topic"
              params={{ topic: topic.slug }}
              onClick={() => track("service_hub_to_topic_hub", { topic_slug: topic.slug, topic_label: topic.label })}
              className="font-semibold text-[#B8860B] hover:underline"
            >
              Browse the {topic.label} insight hub →
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-extrabold text-primary">{topic.label} services</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">Senior-built engagements that move the metric, not just the slide.</p>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {shownSvcs.map((s: Service, i: number) => (
              <Link
                key={s.slug}
                to="/services/$slug"
                params={{ slug: s.slug }}
                onClick={() =>
                  track("service_hub_service_click", {
                    topic_slug: topic.slug,
                    topic_label: topic.label,
                    service_slug: s.slug,
                    position: i + 1,
                    destination: `/services/${s.slug}`,
                    destination_path: `/services/${s.slug}`,
                    visible_count: visible,
                    total_services: svcs.length,
                  })
                }
                className="group flex flex-col rounded-xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-accent hover:shadow-elegant"
              >
                <div className="text-xs font-semibold uppercase tracking-widest text-accent">{s.category}</div>
                <h3 className="mt-3 text-xl font-bold text-primary group-hover:text-accent">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.tagline}</p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:text-accent">
                  Explore <ArrowUpRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>

          {hasMore && (
            <div className="mt-12 flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={loadMore}
                className="inline-flex items-center justify-center rounded-md border-2 border-accent bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-accent-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                Load more services
              </button>
              <div className="text-xs text-muted-foreground">
                Showing {visible} of {svcs.length}
              </div>
            </div>
          )}
          {!hasMore && svcs.length > SERVICE_PAGE_SIZE && (
            <div className="mt-12 text-center text-xs text-muted-foreground">
              All {svcs.length} {topic.label} services loaded.
            </div>
          )}
        </div>
      </section>

      {/* Top 10 posts for this topic */}
      <section className="border-t border-border bg-secondary/30 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-accent">Insights</div>
              <h2 className="mt-2 text-3xl font-extrabold text-primary">Top {posts.length} {topic.label} reads</h2>
            </div>
            <Link
              to="/blog/topic/$topic"
              params={{ topic: topic.slug }}
              onClick={() => track("service_hub_topic_all_click", { topic_slug: topic.slug })}
              className="hidden text-sm font-semibold uppercase tracking-wide text-primary hover:text-accent md:inline-flex"
            >
              All {topic.label} insights →
            </Link>
          </div>
          <ol className="mt-10 grid gap-4 md:grid-cols-2">
            {posts.map((p: BlogPost, i: number) => (
              <li key={p.slug}>
                <Link
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  onClick={() =>
                    track("service_hub_post_click", {
                      topic_slug: topic.slug,
                      topic_label: topic.label,
                      post_slug: p.slug,
                      position: i + 1,
                      destination: `/blog/${p.slug}`,
                      destination_path: `/blog/${p.slug}`,
                      total_posts: posts.length,
                    })
                  }
                  className="group flex items-start justify-between gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-accent hover:shadow-elegant"
                >
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-widest text-accent">
                      #{i + 1} · {p.category} · {p.readingTime}
                    </div>
                    <div className="mt-1.5 text-base font-bold leading-snug text-primary group-hover:text-accent">{p.title}</div>
                  </div>
                  <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Cross-hub nav */}
      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl font-extrabold text-primary">Other service hubs</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {topics.filter((t) => t.slug !== topic.slug).map((t) => (
              <Link
                key={t.slug}
                to="/services/category/$category"
                params={{ category: t.slug }}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold hover:border-accent hover:text-accent"
              >
                {t.label} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary/30 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1fr_440px]">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-accent">Talk to us</div>
            <h2 className="mt-3 text-balance text-4xl font-extrabold text-primary md:text-5xl">
              Scope a <span className="text-accent">{topic.label}</span> engagement.
            </h2>
            <p className="mt-5 max-w-xl text-muted-foreground">Book a 30-minute working session with a senior RYZE consultant.</p>
          </div>
          <LeadForm />
        </div>
      </section>
    </SiteLayout>
  );
}

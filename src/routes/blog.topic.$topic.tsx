import { useEffect, useState } from "react";
import { createFileRoute, notFound, redirect, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { LeadForm } from "@/components/site/LeadForm";
import { CTAButton } from "@/components/site/CTAButton";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { topicBySlug, postsForTopic, topics } from "@/data/blogTopics";
import type { BlogPost } from "@/data/blog";
import { BookOpen } from "lucide-react";
import { buildTitle, buildDescription, buildCanonical, ORG_NAME, ORG_LOGO, ABSOLUTE_ORG_LOGO } from "@/lib/seo";
import { track } from "@/lib/track";

const PAGE_SIZE = 9;
const ORIGIN = "https://ryzeadvisory.co";

export const Route = createFileRoute("/blog/topic/$topic")({
  loader: ({ params }) => {
    if (!params.topic || params.topic.startsWith("$")) {
      throw redirect({ to: "/blog", statusCode: 301 });
    }
    const topic = topicBySlug(params.topic);
    if (!topic) throw notFound();
    const posts = postsForTopic(topic.slug);
    return { topic, posts };
  },
  head: ({ loaderData }) => {
    const t = loaderData?.topic;
    if (!t) return { meta: [{ title: buildTitle("Insights Topic") }] };
    const title = buildTitle(`${t.label} — Insights`);
    const description = buildDescription(`${t.blurb} Curated insights from RYZE Advisory.`);
    const canonicalUrl = buildCanonical(`/blog/topic/${t.slug}`);
    const collection = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `${t.label} — RYZE Advisory Insights`,
      description,
      url: canonicalUrl,
      publisher: { "@type": "Organization", name: ORG_NAME, logo: { "@type": "ImageObject", url: ABSOLUTE_ORG_LOGO } },
    };
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
        { type: "application/ld+json", children: JSON.stringify(collection) },
      ],
    };
  },
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="text-4xl font-extrabold text-primary">Topic not found</h1>
        <div className="mt-8"><CTAButton label="All insights" to="/blog" /></div>
      </div>
    </SiteLayout>
  ),
  component: TopicPage,
});

function TopicPage() {
  const { topic, posts } = Route.useLoaderData();
  const [visible, setVisible] = useState(PAGE_SIZE);

  // Reset when topic changes
  useEffect(() => {
    setVisible(PAGE_SIZE);
    track("topic_hub_view", {
      topic_slug: topic.slug,
      topic_label: topic.label,
      total_posts: posts.length,
      page_size: PAGE_SIZE,
    });
    track("topic_hub_list_view", {
      topic_slug: topic.slug,
      topic_label: topic.label,
      visible_count: Math.min(PAGE_SIZE, posts.length),
      total_posts: posts.length,
      page_index: 1,
      page_size: PAGE_SIZE,
    });
  }, [topic.slug, topic.label, posts.length]);

  const shown = posts.slice(0, visible);
  const hasMore = visible < posts.length;

  const loadMore = () => {
    const next = Math.min(visible + PAGE_SIZE, posts.length);
    const pageIndex = Math.ceil(next / PAGE_SIZE);
    setVisible(next);
    track("topic_hub_load_more", {
      topic_slug: topic.slug,
      topic_label: topic.label,
      from_count: visible,
      to_count: next,
      total_posts: posts.length,
      page_index: pageIndex,
      page_size: PAGE_SIZE,
    });
    track("topic_hub_list_view", {
      topic_slug: topic.slug,
      topic_label: topic.label,
      visible_count: next,
      total_posts: posts.length,
      page_index: pageIndex,
      page_size: PAGE_SIZE,
    });
  };

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${topic.label} — Insights (showing ${shown.length} of ${posts.length})`,
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    numberOfItems: shown.length,
    itemListElement: shown.map((p: BlogPost, i: number) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${ORIGIN}/blog/${p.slug}`,
      name: p.title,
    })),
  };

  return (
    <SiteLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
      <section className="bg-gradient-to-b from-[#F8FBFF] via-[#EEF4FA] to-[#FFFFFF] py-20 md:py-24 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-7xl px-6">
          <Breadcrumbs
            tone="light"
            context="blog_topic"
            eventContext={{ topic_slug: topic.slug, topic_label: topic.label }}
            items={[
              { label: "Home", href: "/" },
              { label: "Insights", href: "/blog" },
              { label: topic.label },
            ]}
          />
          <div className="mt-4 text-xs font-semibold uppercase tracking-widest text-[#B8860B]">Topic hub</div>
          <h1 className="mt-2 max-w-3xl text-balance text-5xl font-extrabold md:text-6xl text-[#0F1E2F]">{topic.label}</h1>
          <p className="mt-5 max-w-2xl text-[#53637C]">{topic.blurb}</p>
          <div className="mt-6 text-sm text-[#53637C]">{posts.length} insights in this topic</div>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {shown.map((p: BlogPost, i: number) => (
              <Link
                key={p.slug}
                to="/blog/$slug"
                params={{ slug: p.slug }}
                onClick={() =>
                  track("topic_hub_post_click", {
                    topic_slug: topic.slug,
                    topic_label: topic.label,
                    post_slug: p.slug,
                    position: i + 1,
                    destination: `/blog/${p.slug}`,
                    destination_path: `/blog/${p.slug}`,
                    visible_count: visible,
                    total_posts: posts.length,
                  })
                }
                className="group flex flex-col rounded-xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-accent hover:shadow-elegant"
              >
                <div className="text-xs font-semibold uppercase tracking-widest text-accent">{p.category} · {p.readingTime}</div>
                <h2 className="mt-3 text-xl font-bold leading-tight text-primary group-hover:text-accent">{p.title}</h2>
                <p className="mt-3 text-sm text-muted-foreground line-clamp-3">{p.excerpt}</p>
                <div className="mt-6 text-xs uppercase tracking-wider text-muted-foreground">{p.author} · {p.date}</div>
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
                Load more insights
              </button>
              <div className="text-xs text-muted-foreground">
                Showing {visible} of {posts.length}
              </div>
            </div>
          )}
          {!hasMore && posts.length > PAGE_SIZE && (
            <div className="mt-12 text-center text-xs text-muted-foreground">
              All {posts.length} {topic.label} insights loaded.
            </div>
          )}
        </div>
      </section>

      {/* Complete Topic Practice Library - Direct dofollow links to all articles in topic */}
      <section className="border-t border-[#E2E8F0] bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B8860B]">
            <BookOpen className="h-4 w-4" /> Practice Library
          </div>
          <h2 className="mt-2 font-display text-2xl font-extrabold text-[#0F1E2F]">
            All {topic.label} Operational Frameworks ({posts.length} Guides)
          </h2>
          <p className="mt-2 text-sm text-[#53637C] max-w-2xl">
            Complete indexed reference directory of all published {topic.label.toLowerCase()} architecture playbooks and operational field notes.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, idx) => (
              <Link
                key={p.slug}
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="group flex items-start gap-3 rounded-lg border border-[#E2E8F0] bg-[#F8FBFF] p-4 transition-all hover:border-[#D4A238] hover:shadow-xs hover:bg-white"
              >
                <span className="text-xs font-mono font-bold text-[#B8860B]/70 shrink-0 mt-0.5">
                  #{String(idx + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className="text-xs font-bold text-[#0F1E2F] group-hover:text-[#B8860B] transition-colors line-clamp-2 leading-snug">
                    {p.title}
                  </div>
                  <div className="mt-1 text-[11px] text-[#53637C] flex items-center gap-2">
                    <span>{p.category}</span>
                    <span>·</span>
                    <span>{p.readingTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-secondary/30 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl font-extrabold text-primary">Explore other topics</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {topics.filter((t) => t.slug !== topic.slug).map((t) => (
              <Link key={t.slug} to="/blog/topic/$topic" params={{ topic: t.slug }} className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold hover:border-accent hover:text-accent">
                {t.label} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1fr_440px]">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-accent">From insight to action</div>
            <h2 className="mt-3 text-balance text-4xl font-extrabold text-primary md:text-5xl">
              Get a roadmap for <span className="text-accent">{topic.label}</span>
            </h2>
            <p className="mt-5 max-w-xl text-muted-foreground">Book a 30-minute working session with a senior RYZE consultant.</p>
          </div>
          <LeadForm />
        </div>
      </section>
    </SiteLayout>
  );
}

import { createFileRoute, notFound, redirect, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { LeadForm } from "@/components/site/LeadForm";
import { CTAButton } from "@/components/site/CTAButton";
import { getPost, blogPosts, type BlogPost } from "@/data/blog";
import { getArticleBySlug } from "@/data/insightsArticles";
import { services } from "@/data/services";
import { ArrowUpRight, ArrowRight, Calendar, Clock, User, Sparkles, HelpCircle } from "lucide-react";
import { buildTitle, buildDescription, ORG_NAME, ORG_LOGO } from "@/lib/seo";
import ogDefault from "@/assets/og-default.jpg";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { track } from "@/lib/track";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    // Guard against crawlers hitting the literal route pattern (e.g. "/blog/$slug")
    if (!params.slug || params.slug.startsWith("$")) {
      throw redirect({ to: "/blog", statusCode: 301 });
    }
    // Check if this article exists in the new insights system
    const insightArticle = getArticleBySlug(params.slug);
    if (insightArticle) {
      throw redirect({
        to: "/insights/$slug",
        params: { slug: params.slug },
        statusCode: 301,
      });
    }
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.post;
    if (!p) {
      return {
        meta: [
          { title: buildTitle("Insights") },
          { name: "description", content: buildDescription("Tactical AI Automation, AI Agents, and GEO insights for agencies from RYZE Advisory.") },
        ],
      };
    }
    const title = buildTitle(p.title);
    const description = buildDescription(
      `${p.excerpt} Tactical AI Strategy and Agency Efficiency insights from RYZE Advisory.`,
    );
    const url = `/blog/${p.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: ogDefault },
        { property: "article:published_time", content: p.date },
        { property: "article:section", content: p.category },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: ogDefault },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: p.title,
            description,
            datePublished: p.date,
            dateModified: p.date,
            articleSection: p.category,
            keywords: [p.pillar, p.category, "AI Automation", "AI Strategy", "Agency Efficiency"].join(", "),
            image: ogDefault,
            mainEntityOfPage: url,
            author: { "@type": "Person", name: p.author, url: "/about/author" },
            publisher: {
              "@type": "Organization",
              name: ORG_NAME,
              logo: { "@type": "ImageObject", url: ORG_LOGO },
            },
          }),
        },
        ...(p.faqs && p.faqs.length > 0
          ? [{
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: p.faqs.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              }),
            }]
          : []),
      ],
    };
  },
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="text-4xl font-extrabold text-primary">Article not found</h1>
        <div className="mt-8"><CTAButton label="Read insights" to="/blog" /></div>
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
  component: PostPage,
});

function PostPage() {
  const { post } = Route.useLoaderData();
  const related = blogPosts.filter((p) => p.slug !== post.slug && p.pillar === post.pillar).slice(0, 3);
  const featuredService = services.find((s) => s.slug === post.relatedService) ?? services[0];
  // Contextual sibling services: pull from blog posts in the same pillar → unique services
  const siblingServiceSlugs = Array.from(
    new Set(
      blogPosts
        .filter((p) => p.pillar === post.pillar && p.relatedService !== featuredService.slug)
        .map((p) => p.relatedService),
    ),
  );
  const siblingServices = siblingServiceSlugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is typeof services[number] => Boolean(s))
    .slice(0, 3);
  const blocks = post.content;
  const injectAfter = Math.min(4, Math.max(2, Math.floor(blocks.length / 2)));

  const renderBlock = (b: BlogPost["content"][number], i: number) => {
    if (b.type === "h2")
      return (
        <h2 key={i} className="mt-14 mb-5 pt-6 border-t border-[#E2E8F0] font-display text-2xl md:text-3xl font-extrabold text-[#0F1E2F] tracking-tight">
          {b.text}
        </h2>
      );
    if (b.type === "h3")
      return (
        <h3 key={i} className="mt-10 mb-4 font-display text-xl md:text-2xl font-bold text-[#0F1E2F]">
          {b.text}
        </h3>
      );
    if (b.type === "quote")
      return (
        <blockquote key={i} className="my-8 rounded-xl border-l-4 border-[#D4A238] bg-[#F8FBFF] p-6 md:p-8 text-lg font-medium italic text-[#0F1E2F] shadow-xs">
          "{b.text}"
        </blockquote>
      );
    if (b.type === "list")
      return (
        <ul key={i} className="my-6 space-y-3.5 pl-2">
          {(b.items ?? []).map((it: string) => (
            <li key={it} className="flex gap-3 text-base sm:text-lg leading-relaxed text-[#2C3E55]">
              <span className="mt-2.5 inline-block h-2 w-2 shrink-0 rounded-full bg-[#D4A238]" />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      );
    return <p key={i} className="text-base sm:text-lg leading-[1.85] text-[#2C3E55] mb-6">{b.text}</p>;
  };

  return (
    <SiteLayout>
      <article className="bg-white">
        <header className="border-b border-[#E2E8F0] bg-[#EEF4FA]/60 py-16 md:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <Breadcrumbs
              tone="light"
              context="blog_post"
              eventContext={{
                post_slug: post.slug,
                post_category: post.category,
                post_pillar: post.pillar,
              }}
              items={[
                { label: "Home", href: "/" },
                { label: "Insights", href: "/blog" },
                { label: post.title },
              ]}
            />
            <div className="mt-5 text-xs font-bold uppercase tracking-wider text-[#B8860B]">{post.category} · {post.pillar}</div>
            <h1 className="mt-4 font-display text-balance text-3xl font-extrabold leading-[1.18] text-[#0F1E2F] sm:text-4xl md:text-5xl">{post.title}</h1>
            <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-[#53637C]">
              <Link to="/about/author" rel="author" className="inline-flex items-center gap-2 hover:text-[#B8860B] hover:underline">
                <User className="h-4 w-4 text-[#B8860B]" />
                <span itemProp="author" className="font-semibold text-[#0F1E2F]">{post.author}</span>
              </Link>
              <span className="inline-flex items-center gap-2"><Calendar className="h-4 w-4 text-[#B8860B]" /> {post.date}</span>
              <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4 text-[#B8860B]" /> {post.readingTime} read</span>
            </div>
          </div>
        </header>

        <div className="mx-auto grid max-w-7xl gap-12 lg:gap-16 px-4 sm:px-6 py-16 md:py-24 lg:grid-cols-[1fr_360px]">
          <div className="prose-content space-y-8">
            {blocks.slice(0, injectAfter).map(renderBlock)}

            {/* Inline related-service CTA */}
            <Link
              to="/services/$slug"
              params={{ slug: featuredService.slug }}
              className="group not-prose my-8 block rounded-xl border-2 border-[#D4A238]/40 bg-[#F8FBFF] p-7 transition-all hover:border-[#D4A238] hover:shadow-elegant"
            >
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B8860B]">
                <Sparkles className="h-4 w-4" /> Related service
              </div>
              <div className="mt-2 text-xl font-bold text-[#0F1E2F] group-hover:text-[#B8860B]">{featuredService.title}</div>
              <p className="mt-1 text-sm text-[#53637C]">{featuredService.tagline}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-[#B8860B] group-hover:text-[#0B1F3B]">
                See how we build it <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>

            {blocks.slice(injectAfter).map((b: BlogPost["content"][number], i: number) => renderBlock(b, i + injectAfter))}

            {/* Contextual internal links — sibling services in this pillar */}
            {siblingServices.length > 0 && (
              <div className="not-prose mt-12 rounded-xl border border-[#E2E8F0] bg-[#F8FBFF] p-7 shadow-xs">
                <div className="text-xs font-bold uppercase tracking-wider text-[#B8860B]">
                  Keep exploring {post.pillar.toLowerCase()}
                </div>
                <ul className="mt-4 space-y-3 text-sm">
                  {siblingServices.map((s) => (
                    <li key={s.slug} className="flex items-start gap-2.5">
                      <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-[#B8860B]" />
                      <Link
                        to="/services/$slug"
                        params={{ slug: s.slug }}
                        title={`${s.title} — ${s.tagline}`}
                        className="font-bold text-[#0F1E2F] underline-offset-4 hover:text-[#B8860B] hover:underline"
                      >
                        {s.title}
                      </Link>
                      <span className="text-[#53637C]">— {s.tagline}.</span>
                    </li>
                  ))}
                </ul>
                <Link to="/services" className="mt-5 inline-block text-xs font-bold uppercase tracking-wider text-[#B8860B] hover:text-[#0B1F3B]">
                  See the full Rise Advisory service architecture →
                </Link>
              </div>
            )}

            {/* FAQ section — emits FAQPage JSON-LD in head */}
            {post.faqs && post.faqs.length > 0 && (
              <section className="not-prose mt-16 rounded-xl border border-[#E2E8F0] bg-white p-7 md:p-9 shadow-xs" aria-labelledby="post-faq-heading">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B8860B]">
                  <HelpCircle className="h-4 w-4" /> Frequently asked
                </div>
                <h2 id="post-faq-heading" className="mt-2 font-display text-2xl font-extrabold text-[#0F1E2F]">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="mt-6 w-full">
                  {post.faqs.map((f: { q: string; a: string }, i: number) => (
                    <AccordionItem key={i} value={`faq-${i}`}>
                      <AccordionTrigger
                        onClick={() => track("blog_faq_toggle", { post_slug: post.slug, faq_question_id: `${post.slug}-faq-${i}`, faq_position: i + 1 })}
                        className="text-left text-base font-bold text-[#0F1E2F] hover:text-[#B8860B]"
                      >
                        {f.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-base leading-relaxed text-[#53637C] pt-2 pb-4">{f.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            )}

            {/* Author profile — schema.org Person microdata for E-E-A-T */}
            <div className="not-prose mt-16 rounded-xl border border-[#E2E8F0] bg-[#F8FBFF] p-7 md:p-9 shadow-xs" itemScope itemType="https://schema.org/Person">
              <div className="flex items-start gap-6">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-2 border-[#D4A238] bg-[#0B1F3B] text-2xl font-extrabold text-[#D4A238]" itemProp="image">
                  LR
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#B8860B]">Founder · Author</div>
                  <Link to="/about/author" rel="author" className="mt-1 inline-block font-display text-2xl font-extrabold text-[#0F1E2F] hover:text-[#B8860B] hover:underline" itemProp="name">
                    Leena Raval
                  </Link>
                  <p className="mt-3 text-sm leading-relaxed text-[#53637C]" itemProp="description">
                    With a passion for data-driven creativity and a deep understanding of emerging business technologies, Leena is the driving force behind Rise Advisory. A visionary leader, she guides companies by integrating senior leadership, automated workflows, and high-impact growth frameworks.
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[#53637C]">
                    Her expertise in strategy, fractional executive placement, and corporate execution has helped countless founders achieve measurable scale.
                  </p>
                  <link itemProp="url" href="/about/author" />
                </div>
              </div>
            </div>
          </div>

          <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
            {/* Persistent high-contrast sticky CTA card — brand navy + gold accents */}
            <div className="rounded-xl border border-[#D4A238]/40 bg-[#0B1F3B] p-7 text-white shadow-xl">
              <div className="text-xs font-bold uppercase tracking-wider text-[#D4A238]">Scale With Clarity</div>
              <h3 className="mt-2 font-display text-xl font-extrabold leading-snug text-white">
                Need Senior Leadership Without Full-Time Payroll?
              </h3>
              <p className="mt-3 text-sm text-[#D1D7DF] leading-relaxed">
                Book a 90-minute Growth Diagnostic with a senior fractional CXO to audit your primary bottlenecks.
              </p>
              <Link
                to="/book-diagnostic"
                className="btn-gold mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg py-3 text-xs uppercase tracking-wider font-bold shadow-gold"
              >
                <span>Book a Diagnostic</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
            <LeadForm compact />
          </aside>
        </div>
      </article>

      <section className="border-t border-[#E2E8F0] bg-[#F8FBFF] py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#B8860B]">Related Intelligence</span>
              <h2 className="mt-1 font-display text-2xl sm:text-3xl font-extrabold text-[#0F1E2F]">More Operational Field Notes</h2>
            </div>
            <Link to="/blog" className="text-xs font-bold text-[#B8860B] hover:text-[#0B1F3B] flex items-center gap-1 group">
              <span>View All Insights</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {related.map((p: typeof blogPosts[number]) => (
              <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group rounded-xl border border-[#E2E8F0] bg-white p-7 transition-all hover:-translate-y-1 hover:border-[#D4A238] hover:shadow-card flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#B8860B] mb-2">{p.category}</div>
                  <h3 className="font-display text-lg font-bold text-[#0F1E2F] group-hover:text-[#B8860B] transition-colors leading-snug">{p.title}</h3>
                  <p className="mt-3 text-xs leading-relaxed text-[#53637C] line-clamp-3">{p.excerpt}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#E2E8F0] text-xs font-bold text-[#B8860B] flex items-center gap-1">
                  <span>Read Field Note</span>
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

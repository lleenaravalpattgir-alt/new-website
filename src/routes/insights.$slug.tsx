import { createFileRoute, notFound, redirect, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import {
  getRelatedArticles,
  type InsightsArticle,
  type ContentBlock,
} from "@/data/insightsArticles";
import { getStoredArticleBySlug, getStoredPublishedArticles } from "@/lib/blog-storage";
import { getPost, type BlogPost } from "@/data/blog";
import {
  Calendar,
  Clock,
  User,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Share2,
  Check,
  CheckCircle2,
  HelpCircle,
  BookOpen,
  Building2,
  ShieldAlert,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buildTitle, buildDescription, ORG_NAME, ORG_LOGO } from "@/lib/seo";

export const Route = createFileRoute("/insights/$slug")({
  loader: ({ params }) => {
    if (!params.slug || params.slug.startsWith("$")) {
      throw redirect({ to: "/insights", statusCode: 301 });
    }

    // Try finding in persistent storage first (allows admin preview)
    let article = getStoredArticleBySlug(params.slug, true);

    // If not found, adapt from legacy blogPosts if present
    if (!article) {
      const legacy = getPost(params.slug);
      if (legacy) {
        article = {
          slug: legacy.slug,
          title: legacy.title,
          seoTitle: legacy.title,
          metaDescription: legacy.excerpt,
          excerpt: legacy.excerpt,
          category: legacy.category,
          categorySlug: legacy.category.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          author: legacy.author,
          authorRole: "Executive Practice Lead, Rise Advisory",
          publishedDate: legacy.date,
          readTime: legacy.readingTime || legacy.readTime || "5 min",
          status: "published",
          primaryKeyword: legacy.category,
          secondaryKeywords: [legacy.pillar],
          imageUrl: "/logo.png",
          imageAlt: legacy.title,
          content: legacy.content.map((b) => ({
            type:
              b.type === "h2"
                ? "h2"
                : b.type === "h3"
                  ? "h3"
                  : b.type === "quote"
                    ? "quote"
                    : b.type === "list"
                      ? "list"
                      : "p",
            text: b.text,
            items: b.items,
          })),
          faqs: legacy.faqs,
          disclaimer:
            "This article is for general educational purposes. Business decisions should be based on your company's operational context.",
        };
      }
    }

    if (!article) {
      throw notFound();
    }

    const related = getRelatedArticles(article.slug, article.category, 3);
    return { article, related };
  },
  head: ({ loaderData }) => {
    const a = loaderData?.article;
    if (!a) {
      return {
        meta: [
          { title: buildTitle("Insights & Resources") },
          {
            name: "description",
            content: buildDescription("Educational business advice from Ryze Advisory."),
          },
        ],
      };
    }

    const pageTitle = buildTitle(a.seoTitle || a.title);
    const description = buildDescription(a.metaDescription || a.excerpt);
    const canonicalUrl = `https://riseadvisory.co/insights/${a.slug}`;

    return {
      meta: [
        { title: pageTitle },
        { name: "description", content: description },
        { property: "og:title", content: pageTitle },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: canonicalUrl },
        { property: "og:image", content: a.imageUrl || "/logo.png" },
        { property: "article:published_time", content: a.publishedDate },
        { property: "article:section", content: a.category },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: pageTitle },
        { name: "twitter:description", content: description },
        { name: "keywords", content: [a.primaryKeyword, ...a.secondaryKeywords].join(", ") },
      ],
      links: [{ rel: "canonical", href: canonicalUrl }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: a.title,
            description: a.metaDescription,
            datePublished: a.publishedDate,
            dateModified: a.updatedDate || a.publishedDate,
            articleSection: a.category,
            keywords: [a.primaryKeyword, ...a.secondaryKeywords].join(", "),
            image: "https://riseadvisory.co/logo.png",
            mainEntityOfPage: canonicalUrl,
            author: {
              "@type": "Person",
              name: a.author,
              jobTitle: a.authorRole,
              url: "https://riseadvisory.co/about/author",
            },
            publisher: {
              "@type": "Organization",
              name: ORG_NAME,
              logo: { "@type": "ImageObject", url: ORG_LOGO },
            },
          }),
        },
        ...(a.faqs && a.faqs.length > 0
          ? [
              {
                type: "application/ld+json",
                children: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: a.faqs.map((f) => ({
                    "@type": "Question",
                    name: f.q,
                    acceptedAnswer: { "@type": "Answer", text: f.a },
                  })),
                }),
              },
            ]
          : []),
      ],
    };
  },
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="text-3xl font-extrabold text-[#0F1E2F]">Article Not Found</h1>
        <p className="mt-4 text-sm text-[#53637C]">
          The article you are looking for may have moved or is currently in draft.
        </p>
        <div className="mt-8">
          <Link
            to="/insights"
            className="btn-gold px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2"
          >
            <span>Back to All Insights</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </SiteLayout>
  ),
  component: ArticleDetailPage,
});

function ArticleDetailPage() {
  const { article, related } = Route.useLoaderData();
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const renderBlock = (block: ContentBlock, idx: number) => {
    switch (block.type) {
      case "h2": {
        // Create an id for table of contents jump links
        const id =
          block.text
            ?.toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "") || `section-${idx}`;
        return (
          <h2
            key={idx}
            id={id}
            className="scroll-mt-24 mt-12 mb-4 pt-6 border-t border-[#E2E8F0] font-display text-2xl md:text-3xl font-extrabold text-[#0F1E2F] tracking-tight"
          >
            {block.text}
          </h2>
        );
      }
      case "h3":
        return (
          <h3
            key={idx}
            className="mt-8 mb-3 font-display text-xl md:text-2xl font-bold text-[#0F1E2F]"
          >
            {block.text}
          </h3>
        );
      case "quote":
        return (
          <blockquote
            key={idx}
            className="my-8 rounded-xl border-l-4 border-[#D4A238] bg-[#F8FBFF] p-6 text-base md:text-lg font-medium italic text-[#0F1E2F] shadow-xs"
          >
            "{block.text}"
          </blockquote>
        );
      case "list":
        return (
          <ul key={idx} className="my-5 space-y-2.5 pl-2">
            {(block.items ?? []).map((item, itemIdx) => (
              <li
                key={itemIdx}
                className="flex items-start gap-3 text-base text-[#2C3E55] leading-relaxed"
              >
                <span className="mt-2.5 inline-block h-2 w-2 shrink-0 rounded-full bg-[#D4A238]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        );
      case "checklist":
        return (
          <div
            key={idx}
            className="my-6 rounded-xl border border-[#E2E8F0] bg-[#F8FBFF] p-6 shadow-xs"
          >
            {block.calloutTitle && (
              <div className="text-sm font-bold text-[#0F1E2F] uppercase tracking-wider mb-4 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#B8860B]" />
                {block.calloutTitle}
              </div>
            )}
            <ul className="space-y-3">
              {(block.items ?? []).map((item, itemIdx) => (
                <li
                  key={itemIdx}
                  className="flex items-start gap-3 text-sm sm:text-base text-[#2C3E55]"
                >
                  <Check className="mt-1 h-4 w-4 shrink-0 text-[#25D366] font-bold" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      case "callout":
        return (
          <div
            key={idx}
            className="my-8 rounded-xl border-l-4 border-[#0B1F3B] bg-[#EEF4FA] p-6 text-[#0F1E2F] shadow-xs"
          >
            {block.calloutTitle && (
              <div className="font-bold text-sm sm:text-base mb-1.5 text-[#0B1F3B] flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#D4A238]" />
                {block.calloutTitle}
              </div>
            )}
            <p className="text-sm sm:text-base text-[#2C3E55] leading-relaxed">{block.text}</p>
          </div>
        );
      case "table":
        return (
          <div
            key={idx}
            className="my-8 overflow-hidden rounded-xl border border-[#E2E8F0] shadow-sm"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#0B1F3B] text-white">
                  <tr>
                    {(block.headers ?? []).map((header, hIdx) => (
                      <th
                        key={hIdx}
                        className="py-3.5 px-4 sm:px-6 font-bold tracking-wider text-xs uppercase text-[#F3E5AB]"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0] bg-white text-[#2C3E55]">
                  {(block.rows ?? []).map((row, rIdx) => (
                    <tr
                      key={rIdx}
                      className={
                        rIdx % 2 === 0
                          ? "bg-white hover:bg-[#F8FBFF]"
                          : "bg-[#F8FBFF]/60 hover:bg-[#F8FBFF]"
                      }
                    >
                      {row.map((cell, cIdx) => (
                        <td
                          key={cIdx}
                          className={`py-3.5 px-4 sm:px-6 leading-relaxed ${
                            cIdx === 0 ? "font-bold text-[#0F1E2F]" : ""
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-[#EEF4FA] px-4 py-2 text-[11px] text-[#53637C] italic border-t border-[#E2E8F0]">
              * Actual responsibilities and costs depend on the business and the engagement.
            </div>
          </div>
        );
      default:
        return (
          <p key={idx} className="text-base sm:text-lg leading-[1.85] text-[#2C3E55] mb-5">
            {block.text}
          </p>
        );
    }
  };

  return (
    <SiteLayout>
      <article className="bg-white">
        {/* Header with Breadcrumbs, H1, Meta */}
        <header className="border-b border-[#E2E8F0] bg-[#EEF4FA]/70 py-12 md:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <Breadcrumbs
              tone="light"
              context="blog_post"
              eventContext={{
                post_slug: article.slug,
                post_category: article.category,
              }}
              items={[
                { label: "Home", href: "/" },
                { label: "Insights", href: "/insights" },
                { label: article.category, href: "/insights" },
                { label: article.title },
              ]}
            />

            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#0B1F3B] px-3.5 py-1 text-xs font-semibold text-[#D4A238]">
              <span>{article.category}</span>
            </div>

            <h1 className="mt-4 font-display text-balance text-3xl font-extrabold leading-[1.2] text-[#0F1E2F] sm:text-4xl md:text-5xl">
              {article.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-y-3 gap-x-6 text-xs sm:text-sm text-[#53637C]">
              <Link
                to="/about/author"
                rel="author"
                className="inline-flex items-center gap-2 hover:text-[#B8860B] font-semibold text-[#0F1E2F]"
              >
                <User className="h-4 w-4 text-[#B8860B]" />
                <span>{article.author}</span>
              </Link>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-[#B8860B]" />
                <span>{article.publishedDate}</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-[#B8860B]" />
                <span>{article.readTime}</span>
              </span>

              {/* Share / Copy Link Button */}
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 rounded-md border border-[#CBD5E1] bg-white px-2.5 py-1 text-xs font-medium text-[#0F1E2F] hover:bg-[#EEF4FA] transition cursor-pointer ml-auto"
                aria-label="Copy article link"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[#25D366]" />
                    <span className="text-[#25D366] font-bold">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="h-3.5 w-3.5 text-[#53637C]" />
                    <span>Share</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area + Sticky Sidebar Layout */}
        <div className="mx-auto grid max-w-7xl gap-12 lg:gap-16 px-4 sm:px-6 py-12 md:py-20 lg:grid-cols-[1fr_360px]">
          {/* Main Article Body */}
          <div className="prose-content min-w-0">
            {/* Table of Contents (for mobile/tablet) */}
            {article.toc && article.toc.length > 0 && (
              <div className="lg:hidden mb-10 rounded-xl border border-[#E2E8F0] bg-[#F8FBFF] p-6 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B8860B] mb-3">
                  <BookOpen className="h-4 w-4" /> Table of Contents
                </div>
                <nav className="space-y-1.5 text-sm">
                  {article.toc.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block text-[#0F1E2F] hover:text-[#B8860B] hover:underline py-0.5"
                    >
                      • {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            )}

            {/* Article Blocks */}
            <div className="space-y-6">{article.content.map((b, idx) => renderBlock(b, idx))}</div>

            {/* Inline Service Recommendation (Internal Linking) */}
            {article.relatedService && (
              <div className="my-10 rounded-2xl border-2 border-[#D4A238]/40 bg-[#F8FBFF] p-7 md:p-8 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B8860B]">
                  <Sparkles className="h-4 w-4" /> Recommended Advisory Service
                </div>
                <h3 className="mt-2 text-xl font-bold text-[#0F1E2F]">
                  {article.relatedService.title}
                </h3>
                <p className="mt-2 text-sm text-[#53637C] leading-relaxed">
                  {article.relatedService.description}
                </p>
                <div className="mt-5">
                  <Link
                    to={article.relatedService.url as any}
                    className="btn-gold inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider font-bold shadow-gold"
                  >
                    <span>Explore CFO Services</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            )}

            {/* FAQs Section */}
            {article.faqs && article.faqs.length > 0 && (
              <section
                id="faqs"
                className="mt-14 scroll-mt-24 rounded-2xl border border-[#E2E8F0] bg-white p-6 sm:p-8 shadow-xs"
              >
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B8860B]">
                  <HelpCircle className="h-4 w-4" /> Frequently Asked Questions
                </div>
                <h2 className="mt-2 text-2xl font-extrabold text-[#0F1E2F]">
                  Got Questions? Here Are Clear Answers
                </h2>
                <Accordion type="single" collapsible className="mt-6 w-full">
                  {article.faqs.map((faq, i) => (
                    <AccordionItem key={i} value={`faq-${i}`}>
                      <AccordionTrigger className="text-left text-base font-bold text-[#0F1E2F] hover:text-[#B8860B]">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm sm:text-base leading-relaxed text-[#53637C] pt-2 pb-4">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            )}

            {/* Author Profile (E-E-A-T) */}
            <div
              className="mt-14 rounded-2xl border border-[#E2E8F0] bg-[#F8FBFF] p-7 md:p-8 shadow-xs"
              itemScope
              itemType="https://schema.org/Person"
            >
              <div className="flex flex-col sm:flex-row items-start gap-5">
                <div
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-[#D4A238] bg-[#0B1F3B] text-xl font-extrabold text-[#D4A238]"
                  itemProp="image"
                >
                  LR
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#B8860B]">
                    Author &bull; Strategic Growth Leader
                  </div>
                  <Link
                    to="/about/author"
                    rel="author"
                    className="mt-1 font-display text-xl sm:text-2xl font-extrabold text-[#0F1E2F] hover:text-[#B8860B] hover:underline"
                    itemProp="name"
                  >
                    {article.author}
                  </Link>
                  <p
                    className="mt-2 text-xs sm:text-sm text-[#53637C] leading-relaxed"
                    itemProp="description"
                  >
                    Founder and Strategic Growth Advisor at Rise Advisory. Leena works closely with
                    startup founders, SME promoters, and family business leadership across Ahmedabad
                    and Gujarat to implement reliable financial planning, governance, and fractional
                    executive models.
                  </p>
                  <div className="mt-3">
                    <Link
                      to="/about"
                      className="text-xs font-bold text-[#B8860B] hover:text-[#0B1F3B] inline-flex items-center gap-1"
                    >
                      <span>About Ryze Advisory Bench</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Final CTA requested in Section 5 */}
            <div className="mt-14 rounded-2xl bg-gradient-to-br from-[#0B1F3B] via-[#0E2A4D] to-[#163866] p-8 md:p-10 text-white shadow-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D4A238]">
                Professional Support
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">
                Need Financial Guidance for Your Business?
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#EEF4FA]/85 leading-relaxed">
                Explore financial planning, cash flow forecasting, and fractional CFO support
                options tailored for your company.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  to="/fractional-leaders/$slug"
                  params={{ slug: "cfo" }}
                  className="btn-gold px-5 py-3 rounded-lg text-xs uppercase tracking-wider font-bold shadow-gold inline-flex items-center gap-2"
                >
                  <span>Explore CFO Services</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  to="/contact"
                  className="rounded-lg border border-white/30 bg-white/10 px-5 py-3 text-xs uppercase tracking-wider font-bold text-white hover:bg-white hover:text-[#0B1F3B] transition"
                >
                  <span>Contact Our Team</span>
                </Link>
              </div>
            </div>

            {/* Educational Disclaimer */}
            <div className="mt-10 rounded-xl border border-[#E2E8F0] bg-[#F8FBFF] p-5 text-xs text-[#53637C] leading-relaxed flex items-start gap-3">
              <ShieldAlert className="h-4 w-4 text-[#B8860B] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#0F1E2F]">Educational Disclaimer: </span>
                {article.disclaimer ||
                  "This article is for general educational purposes. Fees, responsibilities, and service availability vary. Financial decisions should be based on your circumstances and professional advice where appropriate."}
              </div>
            </div>
          </div>

          {/* Desktop Sticky Sidebar */}
          <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
            {/* Table of Contents for Desktop */}
            {article.toc && article.toc.length > 0 && (
              <div className="hidden lg:block rounded-xl border border-[#E2E8F0] bg-[#F8FBFF] p-6 shadow-xs">
                <div className="text-xs font-bold uppercase tracking-wider text-[#B8860B] mb-3 flex items-center gap-2">
                  <BookOpen className="h-3.5 w-3.5" />
                  Table of Contents
                </div>
                <nav className="space-y-2 text-xs">
                  {article.toc.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block text-[#53637C] hover:text-[#B8860B] hover:font-semibold transition-colors py-0.5"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            )}

            {/* Sticky Action Card */}
            <div className="rounded-xl border border-[#D4A238]/40 bg-[#0B1F3B] p-6 text-white shadow-xl">
              <div className="text-xs font-bold uppercase tracking-wider text-[#D4A238]">
                Executive Advisory
              </div>
              <h3 className="mt-2 font-display text-lg font-bold text-white leading-snug">
                Need Senior Leadership Without Full-Time Payroll?
              </h3>
              <p className="mt-2 text-xs text-[#D1D7DF] leading-relaxed">
                Engage an experienced fractional CFO, CMO, or CTO to structure your next growth
                milestones.
              </p>
              <div className="mt-5 space-y-2.5">
                <Link
                  to="/fractional-leaders"
                  className="btn-gold inline-flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-xs uppercase tracking-wider font-bold shadow-gold"
                >
                  <span>Browse Executive Bench</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  to="/book-diagnostic"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 py-2.5 text-xs uppercase tracking-wider font-bold text-white hover:bg-white hover:text-[#0B1F3B] transition"
                >
                  <span>Book Diagnostic</span>
                </Link>
              </div>
            </div>

            {/* Quick Link Card for Business Funding */}
            <div className="rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B8860B] mb-2">
                <Building2 className="h-3.5 w-3.5" /> Gujarat Business Hub
              </div>
              <div className="text-sm font-bold text-[#0F1E2F]">
                Exploring MSME Loans &amp; Subsidies?
              </div>
              <p className="mt-1 text-xs text-[#53637C] leading-relaxed">
                Check bank loan readiness, interest subsidies, and collateral-free CGTMSE options in
                Gujarat.
              </p>
              <Link
                to="/business-funding"
                className="mt-4 text-xs font-bold text-[#B8860B] hover:text-[#0B1F3B] inline-flex items-center gap-1"
              >
                <span>Visit Funding Portal</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </aside>
        </div>
      </article>

      {/* Related Articles Section */}
      {related.length > 0 && (
        <section className="border-t border-[#E2E8F0] bg-[#F8FBFF] py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#B8860B]">
                  Keep Reading
                </span>
                <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#0F1E2F]">
                  Related Articles
                </h2>
              </div>
              <Link
                to="/insights"
                className="text-xs font-bold text-[#B8860B] hover:text-[#0B1F3B] inline-flex items-center gap-1 group"
              >
                <span>Browse All Articles</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {related.map((post) => (
                <article
                  key={post.slug}
                  className="group flex flex-col justify-between rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-[#D4A238] hover:shadow-lg"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-3">
                      <span className="rounded-md bg-[#EEF4FA] px-2 py-0.5 text-[10px] font-bold text-[#B8860B]">
                        {post.category}
                      </span>
                      <span className="text-[11px] text-[#53637C]">{post.readTime}</span>
                    </div>

                    <h3 className="font-display text-base sm:text-lg font-bold text-[#0F1E2F] group-hover:text-[#B8860B] transition-colors leading-snug mb-2">
                      <Link to="/insights/$slug" params={{ slug: post.slug }}>
                        {post.title}
                      </Link>
                    </h3>

                    <p className="text-xs text-[#53637C] leading-relaxed line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs font-bold text-[#B8860B]">
                    <span>Read Article</span>
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </SiteLayout>
  );
}

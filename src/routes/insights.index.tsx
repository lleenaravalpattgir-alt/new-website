import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { INSIGHTS_CATEGORIES, type InsightsArticle } from "@/data/insightsArticles";
import { getStoredPublishedArticles } from "@/lib/blog-storage";
import {
  Search,
  X,
  ArrowRight,
  Clock,
  Calendar,
  Sparkles,
  FileText,
  Calculator,
  Cpu,
  TrendingUp,
  ShieldCheck,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import { buildTitle, buildDescription } from "@/lib/seo";

export const Route = createFileRoute("/insights/")({
  head: () => ({
    meta: [
      {
        title: buildTitle("Insights & Resources | Practical Business & Finance Advice"),
      },
      {
        name: "description",
        content: buildDescription(
          "Practical advice for business owners, startup founders, and growing companies in Ahmedabad, Gujarat, and India. Simple, useful guidance on finance, leadership, marketing, AI, operations, and business growth.",
        ),
      },
      { property: "og:title", content: "Insights & Resources | Rise Advisory" },
      {
        property: "og:description",
        content:
          "Practical guidance on fractional leadership, CFO services, AI adoption, MSME business loans, and sustainable growth for Indian enterprises.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://riseadvisory.co/insights" }],
  }),
  component: InsightsIndexPage,
});

const ARTICLES_PER_PAGE = 6;

export function InsightsIndexPage() {
  const [publishedArticles, setPublishedArticles] = useState<InsightsArticle[]>(() =>
    getStoredPublishedArticles(),
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [page, setPage] = useState(1);

  // Sync with storage updates
  useEffect(() => {
    const handleSync = () => {
      setPublishedArticles(getStoredPublishedArticles());
    };
    window.addEventListener("ryze-articles-updated", handleSync);
    return () => window.removeEventListener("ryze-articles-updated", handleSync);
  }, []);

  // Filtered published articles
  const filteredArticles = useMemo(() => {
    const cleanQ = searchQuery.trim().toLowerCase();
    return publishedArticles.filter((a) => {
      const categoryMatch =
        selectedCategory === "all" ||
        a.categorySlug === selectedCategory ||
        a.category.toLowerCase().replace(/[^a-z0-9]+/g, "-") === selectedCategory;

      if (!categoryMatch) return false;
      if (!cleanQ) return true;

      return (
        a.title.toLowerCase().includes(cleanQ) ||
        a.category.toLowerCase().includes(cleanQ) ||
        a.excerpt.toLowerCase().includes(cleanQ) ||
        a.primaryKeyword.toLowerCase().includes(cleanQ) ||
        a.secondaryKeywords?.some((k) => k.toLowerCase().includes(cleanQ))
      );
    });
  }, [publishedArticles, searchQuery, selectedCategory]);

  // Featured articles (top 3)
  const featuredArticles = useMemo(() => {
    const featured = publishedArticles.filter((a) => a.featured);
    return featured.length > 0 ? featured.slice(0, 3) : publishedArticles.slice(0, 3);
  }, [publishedArticles]);

  // Reset pagination when search or category changes
  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug);
    setPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  const displayedArticles = filteredArticles.slice(0, page * ARTICLES_PER_PAGE);
  const hasMore = displayedArticles.length < filteredArticles.length;

  return (
    <SiteLayout>
      {/* SECTION A: Hero */}
      <section className="relative overflow-hidden bg-[#0B1F3B] py-16 md:py-24 border-b border-[#E2E8F0]/10">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(circle at 80% 20%, #D4A238 0%, transparent 40%), linear-gradient(135deg, #0B1F3B 0%, #11294D 60%, #1A3E70 100%)",
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A238]/40 bg-[#0E2A4D]/80 px-4 py-1.5 text-xs font-semibold text-[#D4A238] mb-5">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Ryze Advisory Knowledge Base</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Insights &amp; Resources
            </h1>

            <p className="mt-5 text-base sm:text-lg md:text-xl text-[#EEF4FA]/90 leading-relaxed font-normal">
              Practical advice for business owners, startup founders, and growing companies. Explore
              simple, useful guidance on finance, leadership, marketing, AI, operations, and
              business growth.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-[#D4A238]/90 font-medium">
              <span>Focus areas:</span>
              <span className="bg-[#0E2A4D] px-2.5 py-1 rounded-md border border-[#D4A238]/30">
                Ahmedabad
              </span>
              <span className="bg-[#0E2A4D] px-2.5 py-1 rounded-md border border-[#D4A238]/30">
                Gujarat
              </span>
              <span className="bg-[#0E2A4D] px-2.5 py-1 rounded-md border border-[#D4A238]/30">
                India
              </span>
            </div>

            {/* Instant Search Bar */}
            <div className="mt-8 relative max-w-xl">
              <div className="relative flex items-center">
                <Search className="pointer-events-none absolute left-4 h-5 w-5 text-[#53637C]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Search articles by title, category, or keyword (e.g. fractional CFO, loans, AI)..."
                  className="w-full rounded-xl border-2 border-white/20 bg-white/95 py-3.5 pl-12 pr-12 text-sm text-[#0F1E2F] placeholder:text-[#53637C] shadow-lg focus:border-[#D4A238] focus:bg-white focus:outline-hidden transition-all"
                  aria-label="Search articles"
                />
                {searchQuery && (
                  <button
                    onClick={() => handleSearchChange("")}
                    className="absolute right-4 text-[#53637C] hover:text-[#0F1E2F] p-1"
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              {searchQuery && (
                <div className="mt-2 text-xs text-[#EEF4FA]/80">
                  Showing results for{" "}
                  <span className="font-semibold text-[#D4A238]">"{searchQuery}"</span> (
                  {filteredArticles.length} found)
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION B: Featured Articles (Show top 3 published articles) */}
      {!searchQuery && selectedCategory === "all" && featuredArticles.length > 0 && (
        <section className="bg-white py-14 md:py-20 border-b border-[#E2E8F0]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#B8860B]">
                  Curated Reads
                </span>
                <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#0F1E2F]">
                  Featured Articles
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#53637C] max-w-md">
                Hand-picked executive guides authored by senior practitioners for leadership and
                growth.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {featuredArticles.map((article, index) => (
                <article
                  key={article.slug}
                  className="group flex flex-col justify-between rounded-2xl border border-[#E2E8F0] bg-white p-6 md:p-7 transition-all duration-200 hover:-translate-y-1 hover:border-[#D4A238] hover:shadow-xl"
                >
                  <div>
                    {/* Header bar / visual badge */}
                    <div className="flex items-center justify-between text-xs mb-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EEF4FA] px-3 py-1 font-semibold text-[#0B1F3B] border border-[#E2E8F0]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#D4A238]" />
                        {article.category}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-[#53637C]">
                        <Clock className="h-3 w-3 text-[#B8860B]" />
                        {article.readTime}
                      </span>
                    </div>

                    {/* Visual Card Header */}
                    <div className="mb-5 rounded-xl bg-gradient-to-br from-[#0B1F3B] to-[#163866] p-5 text-white shadow-inner flex flex-col justify-between min-h-[140px]">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#D4A238]">
                        Featured Guide #{index + 1}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold leading-snug line-clamp-2 text-white group-hover:text-[#F3E5AB] transition-colors">
                        <Link to="/insights/$slug" params={{ slug: article.slug }}>
                          {article.title}
                        </Link>
                      </h3>
                      <div className="text-[11px] text-[#EEF4FA]/70">{article.primaryKeyword}</div>
                    </div>

                    {/* Excerpt */}
                    <p className="text-xs sm:text-sm text-[#53637C] leading-relaxed line-clamp-3 mb-6">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs">
                    <span className="text-[#53637C] flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-[#B8860B]" />
                      {article.publishedDate}
                    </span>
                    <Link
                      to="/insights/$slug"
                      params={{ slug: article.slug }}
                      className="font-bold text-[#B8860B] group-hover:text-[#0B1F3B] inline-flex items-center gap-1 transition-colors"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION C: Browse by Category */}
      <section className="sticky top-16 z-30 border-b border-[#E2E8F0] bg-white/95 backdrop-blur-md shadow-xs py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center justify-between gap-4 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#53637C]">
              Browse by Category
            </span>
            <span className="text-xs text-[#53637C]">
              {filteredArticles.length} {filteredArticles.length === 1 ? "article" : "articles"}{" "}
              available
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => handleCategoryChange("all")}
              className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition cursor-pointer ${
                selectedCategory === "all"
                  ? "bg-[#0B1F3B] text-white shadow-sm"
                  : "bg-[#EEF4FA] text-[#53637C] hover:text-[#0F1E2F] hover:bg-[#E2E8F0]"
              }`}
            >
              All Articles
            </button>

            {INSIGHTS_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.slug;
              return (
                <button
                  key={cat.slug}
                  onClick={() => handleCategoryChange(cat.slug)}
                  className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-[#D4A238] text-[#0F1E2F] font-bold shadow-gold"
                      : "bg-[#EEF4FA] text-[#53637C] hover:text-[#0F1E2F] hover:bg-[#E2E8F0]"
                  }`}
                >
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION D: Latest Articles Grid */}
      <section className="bg-[#F8FBFF] py-16 md:py-20 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F1E2F]">
              {selectedCategory === "all"
                ? searchQuery
                  ? "Search Results"
                  : "All Published Articles"
                : INSIGHTS_CATEGORIES.find((c) => c.slug === selectedCategory)?.name ||
                  "Category Articles"}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#53637C]">
              Clear, practical explanations designed for founders, owners, and leadership teams.
            </p>
          </div>

          {displayedArticles.length === 0 ? (
            /* Empty State */
            <div className="rounded-2xl border-2 border-dashed border-[#CBD5E1] bg-white p-12 text-center max-w-xl mx-auto my-8">
              <BookOpen className="mx-auto h-12 w-12 text-[#94A3B8] mb-4" />
              <h3 className="text-lg font-bold text-[#0F1E2F]">No articles match your criteria</h3>
              <p className="mt-2 text-xs sm:text-sm text-[#53637C] leading-relaxed">
                We are actively writing new educational articles for this topic. Try selecting "All
                Articles", or search for another keyword like "fractional", "loans", or "AI".
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSearchQuery("");
                  }}
                  className="rounded-lg bg-[#0B1F3B] px-4 py-2 text-xs font-bold text-white hover:bg-[#132F55] transition"
                >
                  View All Articles
                </button>
                <Link
                  to="/fractional-leaders/$slug"
                  params={{ slug: "cfo" }}
                  className="rounded-lg border border-[#E2E8F0] bg-[#EEF4FA] px-4 py-2 text-xs font-bold text-[#0B1F3B] hover:bg-[#E2E8F0] transition"
                >
                  Explore CFO Guide
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {displayedArticles.map((article) => (
                <article
                  key={article.slug}
                  className="group flex flex-col justify-between rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-[#D4A238] hover:shadow-lg"
                >
                  <div>
                    {/* Category & Time */}
                    <div className="flex items-center justify-between text-xs mb-3">
                      <span className="rounded-md bg-[#EEF4FA] px-2.5 py-1 text-[11px] font-bold text-[#B8860B]">
                        {article.category}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-[#53637C]">
                        <Clock className="h-3 w-3" />
                        {article.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-[#0F1E2F] group-hover:text-[#B8860B] transition-colors leading-snug mb-3">
                      <Link to="/insights/$slug" params={{ slug: article.slug }}>
                        {article.title}
                      </Link>
                    </h3>

                    {/* Excerpt */}
                    <p className="text-xs sm:text-sm text-[#53637C] leading-relaxed line-clamp-3 mb-6">
                      {article.excerpt}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs">
                    <span className="text-[#53637C] flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-[#B8860B]" />
                      {article.publishedDate}
                    </span>
                    <Link
                      to="/insights/$slug"
                      params={{ slug: article.slug }}
                      className="font-bold text-[#B8860B] group-hover:text-[#0B1F3B] inline-flex items-center gap-1 transition-colors"
                    >
                      <span>Read More</span>
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {hasMore && (
            <div className="mt-12 text-center">
              <button
                onClick={() => setPage((p) => p + 1)}
                className="btn-gold inline-flex items-center gap-2 rounded-lg px-6 py-3 text-xs uppercase tracking-wider font-bold shadow-gold cursor-pointer"
              >
                <span>Load More Articles</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* SECTION E: Popular Resources */}
      <section className="bg-white py-16 md:py-24 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#B8860B]">
              Practical Growth Tools
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F1E2F]">
              Popular Resources &amp; Checklists
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#53637C] leading-relaxed">
              Self-serve frameworks, diagnostics, and eligibility screeners built for Indian
              business owners and startup founders.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* 1. Business Loan Readiness Checklist */}
            <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FBFF] p-6 flex flex-col justify-between hover:border-[#D4A238] hover:shadow-md transition">
              <div>
                <div className="p-2.5 rounded-lg bg-[#EEF4FA] text-[#0B1F3B] w-fit mb-4">
                  <FileText className="h-5 w-5 text-[#B8860B]" />
                </div>
                <h3 className="text-base font-bold text-[#0F1E2F]">
                  Business Loan Readiness Checklist
                </h3>
                <p className="mt-2 text-xs text-[#53637C] leading-relaxed">
                  Review the essential documents, CIBIL benchmark scores, and CMA projections
                  required before approaching banks in Ahmedabad &amp; Gujarat.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#E2E8F0]">
                <Link
                  to="/resources/capital-readiness-checklist"
                  className="text-xs font-bold text-[#B8860B] hover:text-[#0B1F3B] inline-flex items-center gap-1"
                >
                  <span>Open Loan Checklist</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* 2. Startup Funding Guide */}
            <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FBFF] p-6 flex flex-col justify-between hover:border-[#D4A238] hover:shadow-md transition">
              <div>
                <div className="p-2.5 rounded-lg bg-[#EEF4FA] text-[#0B1F3B] w-fit mb-4">
                  <TrendingUp className="h-5 w-5 text-[#B8860B]" />
                </div>
                <h3 className="text-base font-bold text-[#0F1E2F]">Startup Funding Guide</h3>
                <p className="mt-2 text-xs text-[#53637C] leading-relaxed">
                  Understand seed grants, angel investment, venture debt, and government schemes
                  like Startup India Seed Fund.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#E2E8F0]">
                <Link
                  to="/business-funding"
                  className="text-xs font-bold text-[#B8860B] hover:text-[#0B1F3B] inline-flex items-center gap-1"
                >
                  <span>Explore Funding Hub</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* 3. Fractional CFO Guide */}
            <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FBFF] p-6 flex flex-col justify-between hover:border-[#D4A238] hover:shadow-md transition">
              <div>
                <div className="p-2.5 rounded-lg bg-[#EEF4FA] text-[#0B1F3B] w-fit mb-4">
                  <Calculator className="h-5 w-5 text-[#B8860B]" />
                </div>
                <h3 className="text-base font-bold text-[#0F1E2F]">Fractional CFO Guide</h3>
                <p className="mt-2 text-xs text-[#53637C] leading-relaxed">
                  Learn how a part-time finance leader structures MIS reporting, cash-flow runway
                  models, and investor discussions.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#E2E8F0]">
                <Link
                  to="/fractional-leaders/$slug"
                  params={{ slug: "cfo" }}
                  className="text-xs font-bold text-[#B8860B] hover:text-[#0B1F3B] inline-flex items-center gap-1"
                >
                  <span>View Fractional CFO Scope</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* 4. AI Readiness Assessment for SMEs */}
            <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FBFF] p-6 flex flex-col justify-between hover:border-[#D4A238] hover:shadow-md transition">
              <div>
                <div className="p-2.5 rounded-lg bg-[#EEF4FA] text-[#0B1F3B] w-fit mb-4">
                  <Cpu className="h-5 w-5 text-[#B8860B]" />
                </div>
                <h3 className="text-base font-bold text-[#0F1E2F]">
                  AI Readiness Assessment for SMEs
                </h3>
                <p className="mt-2 text-xs text-[#53637C] leading-relaxed">
                  Evaluate whether your business data, software systems, and teams are ready for
                  practical AI automation tools.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#E2E8F0]">
                <Link
                  to="/resources/ai-readiness-scorecard"
                  className="text-xs font-bold text-[#B8860B] hover:text-[#0B1F3B] inline-flex items-center gap-1"
                >
                  <span>Take AI Assessment</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* 5. Business Process Improvement Checklist */}
            <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FBFF] p-6 flex flex-col justify-between hover:border-[#D4A238] hover:shadow-md transition md:col-span-2 lg:col-span-1">
              <div>
                <div className="p-2.5 rounded-lg bg-[#EEF4FA] text-[#0B1F3B] w-fit mb-4">
                  <ShieldCheck className="h-5 w-5 text-[#B8860B]" />
                </div>
                <h3 className="text-base font-bold text-[#0F1E2F]">
                  Business Process Improvement Checklist
                </h3>
                <p className="mt-2 text-xs text-[#53637C] leading-relaxed">
                  Pinpoint founder bottlenecks, map key departmental handoffs, and create repeatable
                  SOPs that scale cleanly.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#E2E8F0]">
                <Link
                  to="/resources/growth-constraint-map"
                  className="text-xs font-bold text-[#B8860B] hover:text-[#0B1F3B] inline-flex items-center gap-1"
                >
                  <span>Open Constraint Map</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION F: Business Enquiry CTA */}
      <section className="bg-gradient-to-br from-[#0B1F3B] via-[#0E2A4D] to-[#163866] py-16 md:py-24 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <span className="inline-block rounded-full bg-[#D4A238]/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#D4A238] mb-4">
            Partner With Ryze Advisory
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Need Support Growing Your Business?
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#EEF4FA]/85 max-w-2xl mx-auto leading-relaxed">
            Explore practical guidance and professional support for finance, leadership, technology,
            operations, and business growth.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/solutions"
              className="btn-gold px-6 py-3.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-gold inline-flex items-center gap-2"
            >
              <span>Explore Our Services</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              to="/contact"
              className="rounded-lg border-2 border-white/30 bg-white/10 px-6 py-3.5 text-xs uppercase tracking-wider font-bold text-white hover:bg-white hover:text-[#0B1F3B] transition duration-200 inline-flex items-center gap-2"
            >
              <span>Contact Our Team</span>
            </Link>
          </div>

          <p className="mt-8 text-xs text-[#EEF4FA]/60 max-w-lg mx-auto">
            Serving growing businesses, MSMEs, and startups in Ahmedabad, Gujarat, and across India.
            Advisory services are tailored to your company's operational context.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}

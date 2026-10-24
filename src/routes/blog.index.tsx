import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { StickyCTA } from "@/components/site/StickyCTA";
import { LeadForm } from "@/components/site/LeadForm";
import { blogPosts } from "@/data/blog";
import { topics } from "@/data/blogTopics";
import { Search, X, Sparkles, ArrowRight, Calendar, Clock, User } from "lucide-react";
import { track } from "@/lib/track";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Insights & Strategic Intelligence | Rise Advisory" },
      {
        name: "description",
        content:
          "Field notes and operational frameworks from Rise Advisory fractional CXOs across Growth, Finance, Technology, Operations, and Leadership.",
      },
      {
        property: "og:title",
        content: "Rise Advisory Insights — Growth, Finance, Tech & Operations",
      },
      {
        property: "og:description",
        content: "Sharp takes on strategy and execution across five core business scale pillars.",
      },
      { property: "og:url", content: "https://ryzeadvisory.co/blog" },
    ],
    links: [{ rel: "canonical", href: "https://ryzeadvisory.co/blog" }],
  }),
  component: BlogIndex,
});

export function BlogIndex() {
  const [q, setQ] = useState("");
  const [topic, setTopic] = useState<string>("all");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return blogPosts.filter((p) => {
      const topicMatch =
        topic === "all" || topics.find((t) => t.slug === topic)?.pillar === p.pillar;
      if (!topicMatch) return false;
      if (!needle) return true;
      return (
        p.title.toLowerCase().includes(needle) ||
        p.category.toLowerCase().includes(needle) ||
        p.excerpt.toLowerCase().includes(needle)
      );
    });
  }, [q, topic]);

  const [hero, ...rest] = filtered.length ? filtered : blogPosts;

  return (
    <SiteLayout>
      {/* Premium Navy Hero with White Accent Gradient */}
      <section className="relative overflow-hidden bg-[#0B1F3B] py-20 md:py-28 navy-diagonal-texture border-b border-[#E2E8F0]/10">
        <div
          className="pointer-events-none absolute inset-0 opacity-15"
          style={{ background: "linear-gradient(115deg, #0B1F3B 0%, #132F55 48%, #FFFFFF 100%)" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A238]/40 bg-[#0E2A4D]/80 px-3.5 py-1 text-xs font-semibold text-[#D4A238] mb-4">
              <Sparkles className="h-3 w-3" />
              <span>Strategic Intelligence &amp; Field Notes</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight">
              Actionable Frameworks for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A238] via-[#F3E5AB] to-[#D4A238]">
                Modern Business Growth.
              </span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#EEF4FA]/80 leading-relaxed">
              Field notes, operational blueprints, and governance principles authored by our senior
              fractional CXOs and practice leads. No vanity theories—only frameworks you can deploy
              Monday morning.
            </p>
          </div>
        </div>
      </section>

      {/* Search + Topic filter */}
      <section className="sticky top-16 z-30 border-b border-[#E2E8F0] bg-white/95 backdrop-blur shadow-xs">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 sm:px-6 py-4">
          {/* Topic Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setTopic("all")}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer ${
                topic === "all"
                  ? "bg-[#D4A238] text-[#0F1E2F] shadow-gold"
                  : "bg-[#EEF4FA] text-[#53637C] hover:text-[#0F1E2F] hover:bg-[#E2E8F0]"
              }`}
            >
              All Articles
            </button>
            {topics.slice(0, 5).map((t) => (
              <button
                key={t.slug}
                onClick={() => setTopic(t.slug)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer ${
                  topic === t.slug
                    ? "bg-[#D4A238] text-[#0F1E2F] shadow-gold"
                    : "bg-[#EEF4FA] text-[#53637C] hover:text-[#0F1E2F] hover:bg-[#E2E8F0]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#53637C]" />
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search frameworks..."
              className="w-full rounded-full border border-[#E2E8F0] bg-[#F8FBFF] py-1.5 pl-9 pr-8 text-xs text-[#0F1E2F] placeholder:text-[#53637C] focus:border-[#D4A238] focus:bg-white focus:outline-hidden"
            />
            {q && (
              <button
                onClick={() => setQ("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#53637C] hover:text-[#0F1E2F]"
                aria-label="Clear search"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {hero && (
        <section className="bg-white py-16 border-b border-[#E2E8F0]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="service-card p-8 md:p-12">
              <div className="grid gap-8 md:grid-cols-2 md:items-center">
                <div>
                  <span className="badge-gold mb-3">{hero.category}</span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F1E2F] leading-tight">
                    <Link
                      to="/blog/$slug"
                      params={{ slug: hero.slug }}
                      className="hover:text-[#B8860B] transition-colors"
                    >
                      {hero.title}
                    </Link>
                  </h2>
                  <p className="mt-4 text-xs sm:text-sm text-[#53637C] leading-relaxed line-clamp-3">
                    {hero.excerpt}
                  </p>
                  <div className="mt-6 flex items-center gap-4 text-xs text-[#53637C]">
                    <span className="flex items-center gap-1 font-semibold text-[#0F1E2F]">
                      <User className="h-3.5 w-3.5 text-[#D4A238]" />
                      {hero.author}
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-[#53637C]" />
                      {hero.readingTime}
                    </span>
                  </div>
                  <div className="mt-6">
                    <Link
                      to="/blog/$slug"
                      params={{ slug: hero.slug }}
                      className="btn-gold text-xs uppercase tracking-wider py-2.5 px-4 rounded-lg font-bold inline-flex items-center gap-1.5"
                    >
                      <span>Read Full Framework</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>

                <div className="bg-[#EEF4FA] rounded-xl p-8 border border-[#E2E8F0] flex flex-col justify-center min-h-[240px] text-center">
                  <span className="text-[10px] font-mono font-bold text-[#B8860B] uppercase tracking-wider">
                    Executive Intelligence Brief
                  </span>
                  <div className="text-lg font-extrabold text-[#0F1E2F] mt-2 max-w-md mx-auto">
                    {hero.title}
                  </div>
                  <p className="text-xs text-[#53637C] mt-2">
                    Published under the Rise Delivery Method
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Remaining Articles Grid */}
      <section className="bg-[#F8FBFF] py-20 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <div key={post.slug} className="service-card p-7 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="badge-gold text-[10px]">{post.category}</span>
                    <span className="text-[#53637C] text-[11px]">{post.readingTime}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[#0F1E2F] group-hover:text-[#B8860B] transition-colors leading-snug mb-2">
                    <Link to="/blog/$slug" params={{ slug: post.slug }}>
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-xs text-[#53637C] leading-relaxed line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs">
                  <span className="text-[#53637C] font-medium">{post.author}</span>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    className="text-[#B8860B] font-bold hover:underline flex items-center gap-1"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / Diagnostic Section */}
      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1fr_440px] items-center">
          <div>
            <span className="badge-gold mb-3">Executive Advisory</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F1E2F]">
              Have a Strategic Bottleneck in Your Business?
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#53637C] leading-relaxed">
              Schedule a confidential 90-minute Growth Diagnostic. We evaluate your revenue
              channels, financial runway, and operational dependencies to produce your 90-day action
              note.
            </p>
            <div className="mt-8">
              <Link to="/book-diagnostic" className="btn-gold inline-flex items-center gap-2">
                <span>Book Growth Diagnostic</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <LeadForm defaultService="Growth & Leadership Diagnostic (90 Min)" />
        </div>
      </section>

      <StickyCTA title="Unlock Fractional CXO Leadership" />
    </SiteLayout>
  );
}

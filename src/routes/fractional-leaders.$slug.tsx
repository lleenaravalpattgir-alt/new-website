import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { fractionalLeadersData } from "@/data/fractionalLeadersData";
import {
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  HelpCircle,
  Calendar,
  Clock,
  Sparkles,
  ChevronRight,
  UserCheck,
  TrendingUp,
  Target,
  Landmark,
  Coins,
} from "lucide-react";
import { getWhatsAppUrl } from "@/components/site/WhatsAppFab";

export const Route = createFileRoute("/fractional-leaders/$slug")({
  head: ({ params }) => {
    const rawSlug = params.slug;
    const cleanSlug = rawSlug.replace(/^fractional-/, "");
    const leader = fractionalLeadersData.find(
      (l) => l.slug === cleanSlug || l.slug === rawSlug || l.id === cleanSlug,
    );
    if (!leader) return { meta: [{ title: "Leader Role Not Found | Rise Advisory" }] };
    return {
      meta: [
        { title: `${leader.title} | Rise Advisory` },
        { name: "description", content: leader.tagline },
        { property: "og:title", content: `${leader.title} | Rise Advisory` },
        { property: "og:description", content: leader.description },
      ],
    };
  },
  component: FractionalLeaderDetailPage,
});

function FractionalLeaderDetailPage() {
  const { slug } = Route.useParams();
  const cleanSlug = slug.replace(/^fractional-/, "");
  const leader = fractionalLeadersData.find(
    (l) => l.slug === cleanSlug || l.slug === slug || l.id === cleanSlug,
  );

  if (!leader) {
    throw notFound();
  }

  const waUrl = getWhatsAppUrl(
    `Hello Rise Advisory, I would like to inquire about hiring a ${leader.shortTitle}.`,
  );

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
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="space-y-4">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-xs">
                <Link
                  to="/fractional-leaders"
                  className="text-[#D4A238] hover:underline font-semibold"
                >
                  Fractional Leaders
                </Link>
                <ChevronRight className="h-3 w-3 text-white/40" />
                <span className="text-white/70 font-medium">{leader.shortTitle}</span>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A238]/40 bg-[#0E2A4D]/80 px-3.5 py-1 text-xs font-semibold text-[#D4A238]">
                <span className="font-mono font-bold">{leader.code}</span>
                <span className="text-white/30">|</span>
                <span>Executive Leadership Practice</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
                {leader.title}
              </h1>

              <p className="text-base sm:text-lg font-semibold text-[#D4A238]">{leader.tagline}</p>

              <p className="text-sm sm:text-base text-[#EEF4FA]/80 leading-relaxed pt-1">
                {leader.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link to="/book-diagnostic" className="btn-gold flex items-center gap-2">
                  <span>Engage a {leader.shortTitle}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-navy-outline text-white border-white/20 hover:border-[#D4A238]"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Hero Visual Card: Executive Cadence Overview */}
            <div className="rounded-2xl border border-[#D4A238]/30 bg-[#0E2A4D]/90 p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-[#132F55] border border-[#D4A238]/40 flex items-center justify-center font-mono font-bold text-[#D4A238]">
                    {leader.code}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{leader.shortTitle} Pod</div>
                    <div className="text-xs text-[#EEF4FA]/60">1–3 Days / Week Fractional</div>
                  </div>
                </div>
                <span className="badge-gold text-[10px]">Active Bench</span>
              </div>

              <div className="space-y-3 text-xs text-[#EEF4FA]/80">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#D4A238] shrink-0 mt-0.5" />
                  <span>15+ Years tier-1 operating experience minimum</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#D4A238] shrink-0 mt-0.5" />
                  <span>Single accountable Rise engagement lead oversight</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#D4A238] shrink-0 mt-0.5" />
                  <span>30 / 60 / 90-day milestone governance &amp; weekly notes</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#D4A238] shrink-0 mt-0.5" />
                  <span>Contractually backed Rise Execution Guarantee</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-[#EEF4FA]/60">Primary Offer Format:</span>
                <span className="font-bold text-[#D4A238]">90-Day Sprint or Retainer</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* When to Hire & Challenges */}
      <section className="bg-white py-20 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* When to Hire */}
            <div className="service-card p-8">
              <span className="badge-gold text-[10px] mb-3">Diagnostic Indicators</span>
              <h2 className="text-2xl font-bold text-[#0F1E2F] mb-4">
                When to Bring in a {leader.shortTitle}
              </h2>
              <ul className="space-y-3.5 text-xs sm:text-sm text-[#53637C] leading-relaxed">
                {leader.typicalChallenges.map((challenge, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <AlertTriangle className="h-4 w-4 text-[#B8860B] shrink-0 mt-0.5" />
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Responsibilities */}
            <div className="service-card p-8">
              <span className="badge-gold text-[10px] mb-3">Executive Ownership</span>
              <h2 className="text-2xl font-bold text-[#0F1E2F] mb-4">
                Key Responsibilities &amp; Governance
              </h2>
              <ul className="space-y-3.5 text-xs sm:text-sm text-[#53637C] leading-relaxed">
                {leader.keyResponsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-[#10B981] shrink-0 mt-0.5" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 30 / 60 / 90 Day Milestones */}
      <section className="bg-[#F8FBFF] py-20 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
            <span className="badge-gold mb-2">Structured Delivery</span>
            <h2 className="text-3xl font-extrabold text-[#0F1E2F]">30 / 60 / 90-Day Milestones</h2>
            <p className="text-xs sm:text-sm text-[#53637C] mt-2">
              Every fractional engagement begins with clear deliverables, measurable baselines, and
              a weekly execution rhythm.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* 30 Days */}
            <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] border-t-4 border-t-[#0B1F3B] shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-[#0B1F3B] bg-[#EEF4FA] px-2.5 py-1 rounded border border-[#E2E8F0]">
                    DAYS 1–30
                  </span>
                  <span className="text-[10px] text-[#6B7A99] font-medium">Stage 1: Diagnose</span>
                </div>
                <h3 className="text-base font-bold text-[#0F1E2F] mb-3">
                  Diagnostic &amp; Baseline
                </h3>
                <ul className="space-y-2.5 text-xs text-[#53637C]">
                  {leader.milestones.day30.map((m, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#B8860B] shrink-0 mt-0.5" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 60 Days */}
            <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] border-t-4 border-t-[#D4A238] shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-[#B8860B] bg-[#EEF4FA] px-2.5 py-1 rounded border border-[#E2E8F0]">
                    DAYS 31–60
                  </span>
                  <span className="text-[10px] text-[#B8860B] font-bold">Stage 2: Deploy</span>
                </div>
                <h3 className="text-base font-bold text-[#0F1E2F] mb-3">
                  Implementation &amp; Cadence
                </h3>
                <ul className="space-y-2.5 text-xs text-[#53637C]">
                  {leader.milestones.day60.map((m, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981] shrink-0 mt-0.5" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 90 Days */}
            <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] border-t-4 border-t-[#10B981] shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-[#10B981] bg-[#EEF4FA] px-2.5 py-1 rounded border border-[#E2E8F0]">
                    DAYS 61–90
                  </span>
                  <span className="text-[10px] text-[#6B7A99] font-medium">Stage 3: Handover</span>
                </div>
                <h3 className="text-base font-bold text-[#0F1E2F] mb-3">
                  Outcomes &amp; Optimization
                </h3>
                <ul className="space-y-2.5 text-xs text-[#53637C]">
                  {leader.milestones.day90.map((m, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981] shrink-0 mt-0.5" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deliverables & Engagement Models */}
      <section className="bg-white py-20 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Concrete Deliverables */}
            <div className="service-card p-8">
              <span className="badge-gold text-[10px] mb-3">Tangible Assets</span>
              <h2 className="text-xl font-bold text-[#0F1E2F] mb-4">Example SOW Deliverables</h2>
              <div className="space-y-2.5">
                {leader.deliverables.map((del, idx) => (
                  <div
                    key={idx}
                    className="bg-[#F8FBFF] p-3 rounded-lg border border-[#E2E8F0] text-xs font-medium text-[#0F1E2F] flex items-center gap-2.5"
                  >
                    <CheckCircle2 className="h-4 w-4 text-[#B8860B] shrink-0" />
                    <span>{del}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Engagement Models */}
            <div className="service-card p-8">
              <span className="badge-gold text-[10px] mb-3">Commercial Formats</span>
              <h2 className="text-xl font-bold text-[#0F1E2F] mb-4">How You Can Engage</h2>
              <div className="space-y-3">
                {leader.engagementModels.map((mod, idx) => (
                  <div key={idx} className="bg-[#F8FBFF] p-4 rounded-lg border border-[#E2E8F0]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-[#0F1E2F]">{mod.name}</span>
                      <span className="text-[10px] text-[#B8860B] font-mono bg-white px-2 py-0.5 rounded border border-[#E2E8F0]">
                        {mod.commitment}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#53637C]">{mod.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vetting Standards & FAQs */}
      <section className="bg-[#F8FBFF] py-20 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 space-y-12">
          {/* Vetting Standards */}
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E2E8F0] border-l-4 border-l-[#D4A238] shadow-xs">
            <div className="flex items-center gap-2 text-sm font-bold text-[#0F1E2F] mb-3">
              <ShieldCheck className="h-5 w-5 text-[#B8860B]" />
              <span>Rise Executive Bench Standards for {leader.shortTitle}s</span>
            </div>
            <ul className="space-y-2.5 text-xs text-[#53637C]">
              {leader.standards.map((std, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981] shrink-0 mt-0.5" />
                  <span>{std}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* FAQs */}
          <div>
            <div className="text-center mb-8">
              <span className="badge-gold mb-2">Frequently Asked Questions</span>
              <h2 className="text-2xl font-bold text-[#0F1E2F]">
                Common Questions About Hiring a {leader.shortTitle}
              </h2>
            </div>
            <div className="space-y-4">
              {leader.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-xs"
                >
                  <h3 className="text-sm font-bold text-[#0F1E2F] flex items-center gap-2 mb-2">
                    <HelpCircle className="h-4 w-4 text-[#B8860B] shrink-0" />
                    <span>{faq.question}</span>
                  </h3>
                  <p className="text-xs text-[#53637C] leading-relaxed pl-6">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Attached Section: Business Funding & Capital Advisory */}
      <section className="bg-gradient-to-b from-[#F8FBFF] to-white py-16 sm:py-20 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="rounded-2xl border border-[#D4A238]/30 bg-[#0B1F3B] text-white p-8 sm:p-12 relative overflow-hidden shadow-xl">
            <div
              className="pointer-events-none absolute inset-0 opacity-15"
              style={{
                background: "linear-gradient(115deg, #0B1F3B 0%, #132F55 50%, #D4A238 100%)",
              }}
              aria-hidden="true"
            />
            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A238]/40 bg-[#0E2A4D]/80 px-3.5 py-1 text-xs font-semibold text-[#D4A238] mb-4">
                <Landmark className="h-3.5 w-3.5" />
                <span>Integrated Capital &amp; Advisory Practice</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
                Pair Senior Leadership with <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A238] via-[#F3E5AB] to-[#D4A238]">
                  Business Loans &amp; Startup Funding
                </span>
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                Strategic leadership demands non-dilutive and growth capital. Our fractional
                executives work directly with our Ahmedabad financial consultancy desk to structure
                collateral-free debt, state grants, and venture equity.
              </p>
            </div>

            <div className="relative z-10 mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-[#0E2A4D]/80 p-4">
                <div className="text-xs font-bold text-[#D4A238] uppercase tracking-wider mb-1">
                  Collateral-Free Debt
                </div>
                <div className="text-sm font-bold text-white mb-1">CGTMSE Up to ₹5 Crore</div>
                <p className="text-[11px] text-slate-300">
                  Bank financing for MSMEs &amp; asset-light companies without mortgaging property.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#0E2A4D]/80 p-4">
                <div className="text-xs font-bold text-[#D4A238] uppercase tracking-wider mb-1">
                  Government Grants
                </div>
                <div className="text-sm font-bold text-white mb-1">Startup Gujarat &amp; SISFS</div>
                <p className="text-[11px] text-slate-300">
                  Up to ₹30 Lakh non-dilutive seed capital, prototype assistance &amp; sustenance
                  funds.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#0E2A4D]/80 p-4">
                <div className="text-xs font-bold text-[#D4A238] uppercase tracking-wider mb-1">
                  Venture Capital
                </div>
                <div className="text-sm font-bold text-white mb-1">
                  Angel &amp; Equity Syndication
                </div>
                <p className="text-[11px] text-slate-300">
                  Pitch decks, dynamic financial models &amp; access to Ahmedabad/Gujarat investor
                  syndicates.
                </p>
              </div>
            </div>

            <div className="relative z-10 mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-slate-300">
                Operating across Ahmedabad, Gandhinagar, Surat, Vadodara, Rajkot, and all Gujarat
                industrial estates.
              </div>
              <Link
                to="/business-funding"
                className="inline-flex items-center gap-2 rounded-md bg-[#D4A238] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0B1F3B] hover:bg-[#E5B54E] transition-colors shadow-md"
              >
                <span>Explore Business Funding Portal</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-white py-20 text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 space-y-4">
          <span className="badge-gold">Get Started</span>
          <h2 className="text-3xl font-extrabold text-[#0F1E2F]">
            Ready to Bring In a {leader.shortTitle}?
          </h2>
          <p className="text-xs sm:text-sm text-[#53637C] max-w-xl mx-auto leading-relaxed">
            Start with a Growth &amp; Leadership Diagnostic to verify role alignment, define your
            90-day deliverables, and meet matched candidates from our bench.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link to="/book-diagnostic" className="btn-gold flex items-center gap-2">
              <span>Book Growth Diagnostic (90 Min)</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/fractional-leaders" className="btn-outline">
              View Other CXO Roles
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { BusinessFundingLoanSection } from "@/components/site/BusinessFundingLoanCard";
import { solutionsData } from "@/data/solutionsData";
import { buildCanonical } from "@/lib/seo";
import { caseStudiesData } from "@/data/caseStudiesData";
import {
  TrendingUp,
  DollarSign,
  Cpu,
  Users,
  HeartHandshake,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  HelpCircle,
  Sparkles,
  ChevronRight
} from "lucide-react";
import { getWhatsAppUrl } from "@/components/site/WhatsAppFab";

function findPillar(slug: string) {
  return solutionsData.find(s => 
    s.slug === slug ||
    (slug === "finance-capital" && s.slug === "finance-capital-readiness") ||
    (slug === "finance-capital-readiness" && s.slug === "finance-capital-readiness") ||
    (slug === "technology-ai" && s.slug === "technology-product-ai") ||
    (slug === "technology-product-ai" && s.slug === "technology-product-ai") ||
    (slug === "founder-performance" && s.slug === "founder-team-performance") ||
    (slug === "founder-team-performance" && s.slug === "founder-team-performance") ||
    s.id === slug
  );
}

export const Route = createFileRoute("/solutions/$slug")({
  head: ({ params }) => {
    const pillar = findPillar(params.slug);
    if (!pillar) return { meta: [{ title: "Solution Not Found | Rise Advisory" }] };
    const canonicalUrl = buildCanonical(`/solutions/${pillar.slug}`);
    return {
      meta: [
        { title: `${pillar.title} — Strategic Pillar | Rise Advisory` },
        { name: "description", content: pillar.headline },
        { property: "og:title", content: `${pillar.title} | Rise Advisory` },
        { property: "og:description", content: pillar.summary },
        { property: "og:url", content: canonicalUrl },
      ],
      links: [{ rel: "canonical", href: canonicalUrl }],
    };
  },
  component: SolutionDetailPage,
});

function SolutionDetailPage() {
  const { slug } = Route.useParams();
  const pillar = findPillar(slug);

  if (!pillar) {
    throw notFound();
  }

  const IconComp = pillar.icon === "TrendingUp" ? TrendingUp :
    pillar.icon === "DollarSign" ? DollarSign :
    pillar.icon === "Cpu" ? Cpu :
    pillar.icon === "Users" ? Users : HeartHandshake;

  const relevantCaseStudies = caseStudiesData.slice(0, 2);
  const waUrl = getWhatsAppUrl(`Hello Rise Advisory, I would like to discuss your ${pillar.title} pillar and fractional support.`);

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
              <div className="flex items-center gap-2 text-xs">
                <Link to="/solutions" className="text-[#D4A238] hover:underline font-semibold">
                  Solutions Hub
                </Link>
                <ChevronRight className="h-3 w-3 text-white/40" />
                <span className="text-white/70 font-medium">{pillar.title}</span>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A238]/40 bg-[#0E2A4D]/80 px-3.5 py-1 text-xs font-semibold text-[#D4A238]">
                <IconComp className="h-4 w-4" />
                <span>Strategic Practice Pillar</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
                {pillar.headline}
              </h1>

              <p className="text-base sm:text-lg text-[#EEF4FA]/80 leading-relaxed pt-2">
                {pillar.summary}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  to="/book-diagnostic"
                  className="btn-gold flex items-center gap-2"
                >
                  <span>Book Pillar Diagnostic</span>
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

            {/* Hero Visual Card: Practice Overview */}
            <div className="rounded-2xl border border-[#D4A238]/30 bg-[#0E2A4D]/90 p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-[#132F55] border border-[#D4A238]/40 flex items-center justify-center text-[#D4A238]">
                    <IconComp className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{pillar.title} Pod</div>
                    <div className="text-xs text-[#EEF4FA]/60">Supervised Executive Delivery</div>
                  </div>
                </div>
                <span className="badge-gold text-[10px]">90-Day Sprint</span>
              </div>

              <div className="space-y-3 text-xs text-[#EEF4FA]/80">
                <div className="font-semibold text-[#D4A238] uppercase tracking-wider text-[11px]">Key Roles In This Pillar:</div>
                <div className="flex flex-wrap gap-2">
                  {pillar.roles.map((r, i) => (
                    <span key={i} className="bg-[#132F55] text-white px-2.5 py-1 rounded border border-white/10 text-[11px]">
                      {r}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-2 text-xs text-[#EEF4FA]/70">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#D4A238]" />
                  <span>15+ Years senior functional leadership</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#D4A238]" />
                  <span>Weekly status notes &amp; executive dashboard</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience & Problems Addressed */}
      <section className="bg-white py-20 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Target Audience */}
            <div className="service-card p-8">
              <span className="badge-gold text-[10px] mb-3">Who This Is Designed For</span>
              <h2 className="text-2xl font-bold text-[#0F1E2F] mb-4">Target Audience &amp; Growth Triggers</h2>
              <ul className="space-y-3.5 text-xs sm:text-sm text-[#53637C] leading-relaxed">
                {pillar.audience.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-[#B8860B] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Problems Addressed */}
            <div className="service-card p-8 border-[#EF4444]/30">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#EF4444] bg-[#EF4444]/10 border border-[#EF4444]/30 px-3 py-1 rounded-full mb-3">
                <AlertTriangle className="h-3.5 w-3.5" />
                <span>Critical Bottlenecks Eliminated</span>
              </span>
              <h2 className="text-2xl font-bold text-[#0F1E2F] mb-4">Business Problems We Solve</h2>
              <ul className="space-y-3.5 text-xs sm:text-sm text-[#53637C] leading-relaxed">
                {pillar.problemsAddressed.map((prob, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-[#EF4444] font-bold text-base leading-none">&times;</span>
                    <span>{prob}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services & Concrete Deliverables */}
      <section className="bg-[#F8FBFF] py-20 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
            <span className="badge-gold mb-2">Scope of Execution</span>
            <h2 className="text-3xl font-extrabold text-[#0F1E2F]">Core Services &amp; Concrete Deliverables</h2>
            <p className="text-xs sm:text-sm text-[#53637C] mt-2">
              We do not deliver theoretical slide decks. Our fractional leads build, test, and ship documented business assets.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {pillar.deliverables.map((del, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-[#E2E8F0] border-l-4 border-l-[#D4A238] shadow-sm">
                <h3 className="text-base sm:text-lg font-bold text-[#0F1E2F] mb-2">{del.title}</h3>
                <p className="text-xs sm:text-sm text-[#53637C] leading-relaxed">{del.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement Process */}
      <section className="bg-white py-20 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
            <span className="badge-gold mb-2">How We Deliver</span>
            <h2 className="text-3xl font-extrabold text-[#0F1E2F]">Four-Stage Engagement Process</h2>
            <p className="text-xs sm:text-sm text-[#53637C] mt-2">
              From initial constraint diagnosis to weekly execution rhythm and milestone reviews.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillar.engagementProcess.map((proc) => (
              <div key={proc.step} className="process-card p-6 relative">
                <span className="text-2xl font-black text-[#B8860B]/40 font-mono mb-2 block">{proc.step}</span>
                <h3 className="text-base font-bold text-[#0F1E2F] mb-2">{proc.title}</h3>
                <p className="text-xs text-[#53637C] leading-relaxed">{proc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Embedded Roles & KPIs */}
      <section className="bg-[#F8FBFF] py-20 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Roles */}
            <div className="service-card p-8">
              <span className="badge-gold text-[10px] mb-3">Talent Architecture</span>
              <h2 className="text-xl font-bold text-[#0F1E2F] mb-3">Fractional Roles Embedded in This Pillar</h2>
              <p className="text-xs text-[#53637C] mb-5">
                Senior executives deployed either as standalone fractional leaders or as part of a managed Rise Growth Pod.
              </p>
              <div className="space-y-3">
                {pillar.roles.map((role, idx) => (
                  <div key={idx} className="bg-[#F8FBFF] p-3 rounded-lg border border-[#E2E8F0] flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0F1E2F]">{role}</span>
                    <Link to="/fractional-leaders" className="text-[11px] text-[#B8860B] hover:underline font-semibold">
                      View Profile →
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* KPIs */}
            <div className="service-card p-8">
              <span className="badge-gold text-[10px] mb-3">Measurement Framework</span>
              <h2 className="text-xl font-bold text-[#0F1E2F] mb-3">KPIs &amp; Accountability Metrics</h2>
              <p className="text-xs text-[#53637C] mb-5">
                We track objective indicators to ensure measurable return on advisory investment.
              </p>
              <ul className="space-y-3 text-xs sm:text-sm text-[#53637C]">
                {pillar.kpis.map((kpi, idx) => (
                  <li key={idx} className="bg-[#F8FBFF] p-3 rounded-lg border border-[#E2E8F0] flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-[#10B981] shrink-0" />
                    <span className="font-medium text-[#0F1E2F]">{kpi}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Evidence */}
      <section className="bg-white py-20 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
            <span className="badge-gold mb-2">Demonstrated Results</span>
            <h2 className="text-3xl font-extrabold text-[#0F1E2F]">Verified Case Evidence</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {relevantCaseStudies.map((cs) => (
              <div key={cs.id} className="service-card p-7 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold text-[#B8860B]">{cs.clientIndustry}</span>
                  <h3 className="text-lg font-bold text-[#0F1E2F] mt-1 mb-3">{cs.title}</h3>
                  <p className="text-xs text-[#53637C] mb-4 line-clamp-3">{cs.intervention}</p>

                  <div className="grid grid-cols-2 gap-2 my-3">
                    {cs.verifiedOutcome.slice(0, 2).map((vo, i) => (
                      <div key={i} className="bg-[#F8FBFF] p-2.5 rounded border border-[#E2E8F0] text-center">
                        <div className="text-sm font-bold text-[#10B981]">{vo.value}</div>
                        <div className="text-[10px] text-[#53637C]">{vo.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E2E8F0] flex justify-between items-center text-xs">
                  <span className="text-[#6B7A99] font-mono text-[11px]">{cs.deliveryTimeline.split('(')[0]}</span>
                  <Link to="/case-studies/$slug" params={{ slug: cs.slug }} className="text-[#B8860B] font-bold hover:underline">
                    View Case Study →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-[#F8FBFF] py-20 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="badge-gold mb-2">Common Inquiries</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F1E2F]">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {pillar.faqs.map((faq, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-xs">
                <h3 className="text-sm font-bold text-[#0F1E2F] flex items-center gap-2 mb-2">
                  <HelpCircle className="h-4 w-4 text-[#B8860B] shrink-0" />
                  <span>{faq.question}</span>
                </h3>
                <p className="text-xs text-[#53637C] leading-relaxed pl-6">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrated Capital Advisory & Business Loans Section */}
      <BusinessFundingLoanSection
        title={`Fueling ${pillar.title} With Strategic Capital & Loans`}
        subtitle="Executing major growth, financial, or tech transformations requires proper liquidity. Access collateral-free MSME credit, DIC subsidies, or equity funding tailored for Gujarat businesses."
      />

      {/* Bottom Conversion CTA */}
      <section className="bg-white py-20 text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 space-y-4">
          <span className="badge-gold">Get Started</span>
          <h2 className="text-3xl font-extrabold text-[#0F1E2F]">
            Ready to Accelerate Your {pillar.title}?
          </h2>
          <p className="text-xs sm:text-sm text-[#53637C] max-w-xl mx-auto leading-relaxed">
            Begin with a 90-minute Growth Diagnostic to assess your bottleneck and agree on 90-day execution milestones.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link to="/book-diagnostic" className="btn-gold flex items-center gap-2">
              <span>Book Growth Diagnostic (90 Min)</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/solutions" className="btn-outline">
              Explore Other Pillars
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

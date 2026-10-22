import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { BusinessFundingLoanSection } from "@/components/site/BusinessFundingLoanCard";
import { caseStudiesData } from "@/data/caseStudiesData";
import { ArrowRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/case-studies/")({
  head: () => ({
    meta: [
      { title: "Results & Structured Case Studies | Rise Advisory" },
      { name: "description", content: "Documented business turnarounds, working capital optimization, CAC reduction, and enterprise scaling milestones from Rise Advisory." },
      { property: "og:title", content: "Results & Case Studies | Rise Advisory" },
    ],
  }),
  component: CaseStudiesIndexPage,
});

function CaseStudiesIndexPage() {
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
              <span>Documented Proof &amp; Verified Impact</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight">
              Real Client Outcomes. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A238] via-[#F3E5AB] to-[#D4A238]">
                Verifiable Business Impact.
              </span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#EEF4FA]/80 leading-relaxed">
              We publish structured case studies detailing the starting point, initial baseline metrics, exact advisory interventions, and verified business outcomes.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#F8FBFF] py-20 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-10">
          <div className="grid gap-8 lg:grid-cols-3">
            {caseStudiesData.map((cs) => (
              <div key={cs.id} className="service-card p-8 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="badge-gold text-[10px]">{cs.clientIndustry}</span>
                    {cs.isDevelopmentSample && (
                      <span className="text-[10px] text-[#53637C] bg-[#EEF4FA] px-2 py-0.5 rounded border border-[#E2E8F0]">
                        Verified SOW
                      </span>
                    )}
                  </div>

                  <h2 className="text-xl font-bold text-[#0F1E2F] group-hover:text-[#B8860B] transition-colors leading-snug mb-2">
                    {cs.title}
                  </h2>
                  <p className="text-xs text-[#B8860B] font-medium mb-3">{cs.companyStage}</p>

                  <div className="bg-[#F8FBFF] p-3.5 rounded-xl border border-[#E2E8F0] mb-4 text-xs">
                    <div className="font-bold text-[#EF4444] uppercase text-[10px] tracking-wider mb-1">Challenge:</div>
                    <p className="text-[#53637C] line-clamp-2 leading-relaxed">{cs.initialProblem}</p>
                  </div>

                  {/* Verified outcome pills */}
                  <div className="grid grid-cols-2 gap-2 my-4">
                    {cs.verifiedOutcome.slice(0, 2).map((vo, i) => (
                      <div key={i} className="bg-[#F8FBFF] p-2.5 rounded-xl border border-[#E2E8F0] text-center">
                        <div className="text-sm font-extrabold text-[#10B981]">{vo.value}</div>
                        <div className="text-[10px] text-[#53637C]">{vo.label}</div>
                      </div>
                    ))}
                  </div>

                  {cs.testimonial && (
                    <blockquote className="border-l-2 border-[#D4A238] pl-3 italic text-xs text-[#53637C] my-3">
                      "{cs.testimonial.quote}"
                    </blockquote>
                  )}
                </div>

                <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs">
                  <span className="text-[#53637C] font-mono text-[11px]">{cs.deliveryTimeline.split('(')[0]}</span>
                  <Link
                    to="/case-studies/$slug"
                    params={{ slug: cs.slug }}
                    className="btn-gold text-xs uppercase tracking-wider py-2 px-3.5 rounded-lg font-bold flex items-center gap-1.5"
                  >
                    <span>Full Case Study</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrated Capital Advisory & Business Loans Section */}
      <BusinessFundingLoanSection
        title="Institutional Capital Backed by Documented Financial Milestones"
        subtitle="Our client results demonstrate how clean 13-week cash forecasting, debt structuring under CGTMSE, and subsidy realization unlock enterprise value."
      />
    </SiteLayout>
  );
}

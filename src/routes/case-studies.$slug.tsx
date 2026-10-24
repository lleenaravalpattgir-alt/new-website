import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { caseStudiesData, type CaseStudy } from "@/data/caseStudiesData";
import { caseStudies } from "@/data/caseStudies";
import { buildCanonical } from "@/lib/seo";
import { ArrowRight, CheckCircle2, AlertTriangle, ShieldCheck, Calendar, Clock, Sparkles, ChevronRight } from "lucide-react";

function findCaseStudy(slug: string): CaseStudy | undefined {
  const primary = caseStudiesData.find((c) => c.slug === slug || c.id === slug);
  if (primary) return primary;
  const legacy = caseStudies.find((c) => c.slug === slug);
  if (legacy) {
    return {
      id: legacy.slug,
      slug: legacy.slug,
      title: legacy.title,
      clientIndustry: legacy.industry,
      companyStage: legacy.client,
      initialProblem: legacy.challenge,
      baseline: [
        { label: "Challenge Baseline", value: "Prior Workflow" },
        { label: "Manual Effort", value: "High Overhead" },
      ],
      intervention: `${legacy.body} ${legacy.approach.join(". ")}`,
      deliveryTimeline: legacy.duration,
      agreedMilestones: legacy.approach,
      verifiedOutcome: legacy.outcomes.map((o) => ({ label: o.label, value: o.metric })),
      testimonial: {
        quote: legacy.quote.text,
        author: legacy.quote.name,
        designation: legacy.quote.role,
      },
      fractionalRoles: [legacy.pillar],
      isDevelopmentSample: false,
    };
  }
  return undefined;
}

export const Route = createFileRoute("/case-studies/$slug")({
  headers: () => ({
    "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
    "CDN-Cache-Control": "max-age=86400, stale-while-revalidate=604800",
    "Cloudflare-CDN-Cache-Control": "max-age=86400, stale-while-revalidate=604800",
  }),
  head: ({ params }) => {
    const cs = findCaseStudy(params.slug);
    if (!cs) return { meta: [{ title: "Case Study Not Found | Rise Advisory" }] };
    const canonicalUrl = buildCanonical(`/case-studies/${cs.slug}`);
    return {
      meta: [
        { title: `${cs.title} | Case Study | Rise Advisory` },
        { name: "description", content: cs.initialProblem },
        { property: "og:title", content: `${cs.title} | Rise Advisory` },
        { property: "og:url", content: canonicalUrl },
      ],
      links: [{ rel: "canonical", href: canonicalUrl }],
    };
  },
  component: CaseStudyDetailPage,
});

function CaseStudyDetailPage() {
  const { slug } = Route.useParams();
  const cs = findCaseStudy(slug);

  if (!cs) {
    throw notFound();
  }

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
          <div className="max-w-4xl space-y-4">
            <div className="flex items-center gap-2 text-xs">
              <Link to="/case-studies" className="text-[#D4A238] hover:underline font-semibold">
                Case Studies
              </Link>
              <ChevronRight className="h-3 w-3 text-white/40" />
              <span className="text-white/70 font-medium">{cs.clientIndustry}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="badge-gold text-[10px]">{cs.clientIndustry}</span>
              {cs.isDevelopmentSample && (
                <span className="text-[10px] text-white/80 bg-white/10 px-2.5 py-1 rounded border border-white/20">
                  Verified SOW Deliverable
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              {cs.title}
            </h1>

            <p className="text-base sm:text-lg font-semibold text-[#D4A238]">
              {cs.companyStage}
            </p>

            <div className="pt-2 flex flex-wrap gap-2">
              {cs.fractionalRoles.map((r, i) => (
                <span key={i} className="text-xs font-semibold bg-[#132F55] text-white px-3 py-1 rounded border border-white/15">
                  Deployed: {r}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-[#F8FBFF] py-20 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 space-y-10">
          {/* Section 1: Initial Problem */}
          <div className="service-card p-8 border-[#EF4444]/30 space-y-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#EF4444]">
              <AlertTriangle className="h-4 w-4" />
              Initial Business Problem
            </span>
            <p className="text-sm sm:text-base text-[#53637C] leading-relaxed">
              {cs.initialProblem}
            </p>
          </div>

          {/* Section 2: Baseline Metrics */}
          <div className="service-card p-8 space-y-4">
            <span className="badge-gold text-[10px]">Starting Point</span>
            <h2 className="text-xl font-bold text-[#0F1E2F]">Baseline Metrics Prior to Intervention</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              {cs.baseline.map((b, idx) => (
                <div key={idx} className="bg-[#F8FBFF] p-4 rounded-xl border border-[#E2E8F0] text-center">
                  <div className="text-lg font-bold text-[#EF4444] font-mono">{b.value}</div>
                  <div className="text-[11px] text-[#53637C] mt-1">{b.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: The Advisory Intervention */}
          <div className="service-card p-8 space-y-4">
            <span className="badge-gold text-[10px]">The Strategy</span>
            <h2 className="text-xl font-bold text-[#0F1E2F]">The Rise Advisory Intervention</h2>
            <p className="text-sm sm:text-base text-[#53637C] leading-relaxed">
              {cs.intervention}
            </p>
            <div className="pt-2 text-xs text-[#B8860B] font-semibold flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Engagement Timeline: {cs.deliveryTimeline}</span>
            </div>
          </div>

          {/* Section 4: Agreed Milestones */}
          <div className="service-card p-8 space-y-4">
            <span className="badge-gold text-[10px]">Execution SOW</span>
            <h2 className="text-xl font-bold text-[#0F1E2F]">Agreed Sprint Milestones</h2>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#53637C]">
              {cs.agreedMilestones.map((m, idx) => (
                <li key={idx} className="bg-[#F8FBFF] p-3 rounded-xl border border-[#E2E8F0] flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-[#B8860B] shrink-0" />
                  <span className="font-medium text-[#0F1E2F]">{m}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 5: Verified Outcomes */}
          <div className="service-card p-8 border-2 border-[#10B981]/40 space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#10B981]">
              <CheckCircle2 className="h-4 w-4" />
              Verified Outcomes Achieved
            </span>
            <h2 className="text-2xl font-bold text-[#0F1E2F]">Measurable Business Impact</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              {cs.verifiedOutcome.map((vo, idx) => (
                <div key={idx} className="bg-[#F8FBFF] p-4 rounded-xl border border-[#E2E8F0] text-center">
                  <div className="text-xl font-extrabold text-[#10B981] font-mono">{vo.value}</div>
                  <div className="text-[11px] text-[#53637C] mt-1">{vo.label}</div>
                </div>
              ))}
            </div>

            {cs.testimonial && (
              <div className="pt-6 mt-4 border-t border-[#E2E8F0]">
                <blockquote className="border-l-2 border-[#D4A238] pl-4 italic text-xs text-[#53637C] leading-relaxed">
                  "{cs.testimonial.quote}"
                  <footer className="text-xs text-[#B8860B] not-italic font-bold mt-2">
                    — {cs.testimonial.author}, {cs.testimonial.designation}
                  </footer>
                </blockquote>
              </div>
            )}
          </div>

          {/* Bottom Action */}
          <div className="text-center pt-6 space-y-4">
            <h3 className="text-xl font-bold text-[#0F1E2F]">Experience Similar Operational Breakthroughs</h3>
            <p className="text-sm text-[#53637C] max-w-md mx-auto">
              Schedule your 90-minute Growth &amp; Leadership Diagnostic to map your constraints and deploy the right leadership pod.
            </p>
            <div className="pt-2">
              <Link to="/book-diagnostic" className="btn-gold inline-flex items-center gap-2">
                <span>Book a Growth Diagnostic</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

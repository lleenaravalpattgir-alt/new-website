import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { industriesData } from "@/data/industriesData";
import {
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  HelpCircle,
  Sparkles,
  ChevronRight,
  Layers,
  Building2
} from "lucide-react";
import { getWhatsAppUrl } from "@/components/site/WhatsAppFab";

function findIndustry(slug: string) {
  return industriesData.find(i => 
    i.slug === slug ||
    (slug === "smes-family-business" && i.slug === "smes-family-businesses") ||
    (slug === "smes-family-businesses" && i.slug === "smes-family-businesses") ||
    (slug === "saas-tech" && i.slug === "saas-technology") ||
    (slug === "saas-technology" && i.slug === "saas-technology") ||
    i.id === slug
  );
}

export const Route = createFileRoute("/industries/$slug")({
  head: ({ params }) => {
    const ind = findIndustry(params.slug);
    if (!ind) return { meta: [{ title: "Industry Solution Not Found | Rise Advisory" }] };
    return {
      meta: [
        { title: `${ind.title} Advisory Solutions | Rise Advisory` },
        { name: "description", content: ind.headline },
        { property: "og:title", content: `${ind.title} | Rise Advisory` },
        { property: "og:description", content: ind.summary },
      ],
    };
  },
  component: IndustryDetailPage,
});

function IndustryDetailPage() {
  const { slug } = Route.useParams();
  const industry = findIndustry(slug);

  if (!industry) {
    throw notFound();
  }

  const waUrl = getWhatsAppUrl(`Hello Rise Advisory, I would like to discuss fractional leadership for our ${industry.shortTitle} company.`);

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
                <Link to="/industries" className="text-[#D4A238] hover:underline font-semibold">
                  Industries Hub
                </Link>
                <ChevronRight className="h-3 w-3 text-white/40" />
                <span className="text-white/70 font-medium">{industry.shortTitle}</span>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A238]/40 bg-[#0E2A4D]/80 px-3.5 py-1 text-xs font-semibold text-[#D4A238]">
                <Building2 className="h-3.5 w-3.5" />
                <span>Sector-Specific Pod Architecture</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
                {industry.headline}
              </h1>

              <p className="text-base sm:text-lg font-semibold text-[#D4A238]">
                {industry.tagline}
              </p>

              <p className="text-sm sm:text-base text-[#EEF4FA]/80 leading-relaxed pt-1">
                {industry.summary}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  to="/book-diagnostic"
                  className="btn-gold flex items-center gap-2"
                >
                  <span>Book Sector Diagnostic</span>
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

            {/* Hero Visual Card: Sector Pod Architecture */}
            <div className="rounded-2xl border border-[#D4A238]/30 bg-[#0E2A4D]/90 p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#D4A238] font-bold">Recommended Sector Pod</div>
                  <div className="text-lg font-bold text-white mt-0.5">{industry.recommendedPod.leadRole}</div>
                </div>
                <span className="badge-gold text-[10px]">Managed Pod</span>
              </div>

              <div className="space-y-3 text-xs text-[#EEF4FA]/80">
                <div className="text-white/60">Supporting Specialist Bench:</div>
                <div className="flex flex-wrap gap-1.5">
                  {industry.recommendedPod.supportingRoles.map((s, idx) => (
                    <span key={idx} className="bg-[#132F55] text-white border border-white/15 px-2.5 py-1 rounded text-[11px]">
                      {s}
                    </span>
                  ))}
                </div>
                <p className="text-[11px] text-[#EEF4FA]/70 italic pt-1">
                  {industry.recommendedPod.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-[#EEF4FA]/60">Delivery Model:</span>
                <span className="font-bold text-[#D4A238]">90-Day Sprint or Retainer</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Triggers & Constraints */}
      <section className="bg-white py-20 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Common Triggers */}
            <div className="service-card p-8">
              <span className="badge-gold text-[10px] mb-3">When to Intervene</span>
              <h2 className="text-2xl font-bold text-[#0F1E2F] mb-4">Common Growth Triggers</h2>
              <ul className="space-y-3.5 text-xs sm:text-sm text-[#53637C] leading-relaxed">
                {industry.triggers.map((trig, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-[#B8860B] shrink-0 mt-0.5" />
                    <span>{trig}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sector Constraints */}
            <div className="service-card p-8 border-[#EF4444]/30">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#EF4444] bg-[#EF4444]/10 border border-[#EF4444]/30 px-3 py-1 rounded-full mb-3">
                <AlertTriangle className="h-3.5 w-3.5" />
                <span>Sector Friction</span>
              </span>
              <h2 className="text-2xl font-bold text-[#0F1E2F] mb-4">Inherent Sector Constraints</h2>
              <ul className="space-y-3.5 text-xs sm:text-sm text-[#53637C] leading-relaxed">
                {industry.sectorConstraints.map((con, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-[#EF4444] font-bold text-base leading-none">&times;</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Pod & Deliverables */}
      <section className="bg-[#F8FBFF] py-20 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Recommended Pod Detail */}
            <div className="service-card p-8 border-2 border-[#D4A238]/40">
              <span className="badge-gold text-[10px] mb-3">Tailored Pod Architecture</span>
              <h2 className="text-xl font-bold text-[#0F1E2F] mb-2">Recommended Sector Pod</h2>
              <p className="text-xs sm:text-sm text-[#53637C] mb-5">{industry.recommendedPod.description}</p>

              <div className="space-y-3">
                <div className="bg-[#F8FBFF] p-4 rounded-xl border border-[#E2E8F0]">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#B8860B]">Lead Fractional Executive:</div>
                  <div className="text-sm font-bold text-[#0F1E2F] mt-1">{industry.recommendedPod.leadRole}</div>
                </div>

                <div className="bg-[#F8FBFF] p-4 rounded-xl border border-[#E2E8F0]">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#B8860B]">Supporting Specialists:</div>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {industry.recommendedPod.supportingRoles.map((s, idx) => (
                      <span key={idx} className="text-xs font-medium bg-[#EEF4FA] text-[#0F1E2F] border border-[#E2E8F0] px-2.5 py-1 rounded">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Key Deliverables */}
            <div className="service-card p-8">
              <span className="badge-gold text-[10px] mb-3">Concrete Outcomes</span>
              <h2 className="text-xl font-bold text-[#0F1E2F] mb-4">Core Sector Deliverables</h2>
              <div className="space-y-2.5">
                {industry.keyDeliverables.map((del, idx) => (
                  <div key={idx} className="bg-[#F8FBFF] p-3 rounded-xl border border-[#E2E8F0] text-xs font-medium text-[#0F1E2F] flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-[#10B981] shrink-0" />
                    <span>{del}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Highlight */}
      <section className="bg-white py-20 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl mb-8">
            <span className="badge-gold mb-2">Verified Case Study</span>
            <h2 className="text-3xl font-extrabold text-[#0F1E2F]">Demonstrated Sector Turnaround</h2>
          </div>

          <div className="bg-[#F8FBFF] rounded-2xl p-8 border border-[#E2E8F0] border-l-4 border-l-[#D4A238] shadow-sm">
            <div className="text-xs font-bold text-[#B8860B] uppercase tracking-wider mb-2">
              {industry.caseStudyHighlight.clientType}
            </div>

            <div className="grid gap-6 md:grid-cols-3 text-xs sm:text-sm text-[#53637C] mt-4">
              <div className="bg-white p-4 rounded-xl border border-[#E2E8F0]">
                <div className="font-bold text-[#EF4444] uppercase text-[10px] mb-1">Challenge:</div>
                <p className="leading-relaxed">{industry.caseStudyHighlight.challenge}</p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-[#E2E8F0]">
                <div className="font-bold text-[#B8860B] uppercase text-[10px] mb-1">Intervention:</div>
                <p className="leading-relaxed">{industry.caseStudyHighlight.intervention}</p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-[#E2E8F0]">
                <div className="font-bold text-[#10B981] uppercase text-[10px] mb-1">Verified Outcome:</div>
                <p className="leading-relaxed font-semibold text-[#0F1E2F]">{industry.caseStudyHighlight.outcome}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sector FAQs */}
      <section className="bg-[#F8FBFF] py-20 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 space-y-6">
          <div className="text-center mb-8">
            <span className="badge-gold mb-2">Sector FAQs</span>
            <h2 className="text-2xl font-bold text-[#0F1E2F]">Sector Inquiries &amp; Guidance</h2>
          </div>
          {industry.faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm">
              <h3 className="text-sm font-bold text-[#0F1E2F] flex items-center gap-2 mb-2">
                <HelpCircle className="h-4 w-4 text-[#B8860B] shrink-0" />
                <span>{faq.question}</span>
              </h3>
              <p className="text-xs text-[#53637C] leading-relaxed pl-6">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-white py-20 text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 space-y-4">
          <span className="badge-gold">Consult Our Bench</span>
          <h2 className="text-3xl font-extrabold text-[#0F1E2F]">
            Transform Your {industry.shortTitle} Operations
          </h2>
          <p className="text-xs sm:text-sm text-[#53637C] max-w-xl mx-auto leading-relaxed">
            Book a Growth Diagnostic to audit your sector constraints, define your first 90-day plan, and deploy the right leadership pod.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link to="/book-diagnostic" className="btn-gold flex items-center gap-2">
              <span>Book a Sector Diagnostic</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/industries" className="btn-outline">
              View Other Sectors
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

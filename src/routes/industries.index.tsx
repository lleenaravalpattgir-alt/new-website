import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { BusinessFundingLoanSection } from "@/components/site/BusinessFundingLoanCard";
import { industriesData } from "@/data/industriesData";
import { ArrowRight, CheckCircle2, Building2, Sparkles } from "lucide-react";

export const Route = createFileRoute("/industries/")({
  head: () => ({
    meta: [
      { title: "Industry Solutions & Sector Pods | Rise Advisory" },
      { name: "description", content: "Specialized fractional executive pods for Startups, SMEs & Family Businesses, FMCG/D2C, SaaS & Tech, Professional Services, and Manufacturing." },
    ],
  }),
  component: IndustriesHubPage,
});

function IndustriesHubPage() {
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
              <Building2 className="h-3.5 w-3.5" />
              <span>Tailored Industry Architecture</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight">
              Tailored Sector Pods for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A238] via-[#F3E5AB] to-[#D4A238]">
                Specific Growth Constraints.
              </span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#EEF4FA]/80 leading-relaxed">
              We do not believe in generic one-size-fits-all consulting. A manufacturing plant managing raw material working capital requires completely different governance than a funded SaaS platform scaling enterprise sales. Explore our dedicated sector solutions below.
            </p>
          </div>
        </div>
      </section>

      {/* 6 Industries Grid */}
      <section className="bg-[#F8FBFF] py-20 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {industriesData.map((ind) => (
              <div key={ind.id} className="service-card p-7 flex flex-col justify-between group">
                <div>
                  <span className="badge-gold text-[10px] mb-3">Industry Practice</span>
                  <h2 className="text-xl font-bold text-[#0F1E2F] group-hover:text-[#B8860B] transition-colors">
                    {ind.title}
                  </h2>
                  <p className="text-xs font-semibold text-[#B8860B] mt-1.5">{ind.tagline}</p>
                  <p className="text-xs text-[#53637C] leading-relaxed mt-3 line-clamp-3">
                    {ind.summary}
                  </p>

                  <div className="mt-5 pt-4 border-t border-[#E2E8F0] space-y-2">
                    <div className="text-[10px] font-bold text-[#0F1E2F] uppercase tracking-wider">Recommended Pod:</div>
                    <div className="bg-[#F8FBFF] p-2.5 rounded-xl border border-[#E2E8F0] text-xs">
                      <div className="font-semibold text-[#0F1E2F]">{ind.recommendedPod.leadRole}</div>
                      <div className="text-[11px] text-[#B8860B] font-medium mt-0.5">{ind.recommendedPod.supportingRoles.join(" + ")}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E2E8F0]">
                  <Link
                    to="/industries/$slug"
                    params={{ slug: ind.slug }}
                    className="btn-gold w-full text-center text-xs uppercase tracking-wider py-2.5 rounded-lg font-bold block"
                  >
                    View Sector Practice →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrated Capital Advisory & Business Loans Section */}
      <BusinessFundingLoanSection
        title="Industry-Specific Debt, Grants & Capital Subsidies"
        subtitle="Every sector requires tailored financing: Manufacturing units in Sanand/Naroda leverage DIC subsidies and CGTMSE loans, while SaaS and D2C startups tap seed grants and angel syndicates."
      />
    </SiteLayout>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { BusinessFundingLoanSection } from "@/components/site/BusinessFundingLoanCard";
import { solutionsData } from "@/data/solutionsData";
import { TrendingUp, DollarSign, Cpu, Users, HeartHandshake, ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

export const Route = createFileRoute("/solutions/")({
  head: () => ({
    meta: [
      { title: "Solutions & Strategic Pillars | Rise Advisory" },
      { name: "description", content: "Explore the 5 strategic pillars of Rise Advisory: Growth & Revenue, Finance & Capital, Technology & AI, People & Operations, and Founder Performance." },
      { property: "og:title", content: "Solutions & Strategic Pillars | Rise Advisory" },
      { property: "og:description", content: "Explore the 5 strategic pillars of Rise Advisory: Growth & Revenue, Finance & Capital, Technology & AI, People & Operations, and Founder Performance." },
      { property: "og:url", content: "https://ryzeadvisory.co/solutions" },
      { property: "og:image", content: "https://ryzeadvisory.co/logo.png" },
    ],
    links: [{ rel: "canonical", href: "https://ryzeadvisory.co/solutions" }],
  }),
  component: SolutionsHubPage,
});

function SolutionsHubPage() {
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
              <span>Core Business Services</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight">
              5 Ways We Help <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A238] via-[#F3E5AB] to-[#D4A238]">
                Your Business Grow.
              </span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#EEF4FA]/80 leading-relaxed">
              We provide experienced leaders and hands-on support across every key part of your company. Choose an area below to see how we help you increase sales, fix cash flow, and manage your team.
            </p>
          </div>
        </div>
      </section>

      {/* Pillars Grid */}
      <section className="bg-[#F8FBFF] py-20 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-12">
          {solutionsData.map((pillar, idx) => {
            const IconComp = pillar.icon === "TrendingUp" ? TrendingUp :
              pillar.icon === "DollarSign" ? DollarSign :
              pillar.icon === "Cpu" ? Cpu :
              pillar.icon === "Users" ? Users : HeartHandshake;

            return (
              <div key={pillar.id} className="service-card p-8 lg:p-10">
                <div className="grid gap-8 lg:grid-cols-12 items-start">
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="icon-container-navy">
                        <IconComp className="h-6 w-6 text-[#D4A238]" />
                      </div>
                      <div>
                        <span className="text-xs font-mono font-bold text-[#B8860B]">PILLAR 0{idx + 1}</span>
                        <h2 className="text-2xl font-bold text-[#0F1E2F]">{pillar.title}</h2>
                      </div>
                    </div>

                    <p className="text-sm font-semibold text-[#B8860B]">{pillar.tagline}</p>
                    <p className="text-xs sm:text-sm text-[#53637C] leading-relaxed">{pillar.summary}</p>

                    <div className="pt-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-[#0F1E2F] mb-2">Key Deliverables:</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {pillar.deliverables.map((del, dIdx) => (
                          <div key={dIdx} className="bg-[#F8FBFF] p-2.5 rounded border border-[#E2E8F0] text-xs text-[#53637C] flex items-center gap-2">
                            <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981] shrink-0" />
                            <span className="font-medium text-[#0F1E2F]">{del.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 bg-[#F8FBFF] p-6 rounded-xl border border-[#E2E8F0] space-y-4">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-[#B8860B] mb-2">Who It's For:</div>
                      <ul className="space-y-1.5 text-xs text-[#53637C]">
                        {pillar.audience.slice(0, 3).map((aud, aIdx) => (
                          <li key={aIdx} className="flex items-start gap-1.5">
                            <span className="text-[#B8860B] font-bold">&bull;</span>
                            <span>{aud}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-3 border-t border-[#E2E8F0]">
                      <div className="text-xs font-bold uppercase tracking-wider text-[#B8860B] mb-2">Embedded Roles:</div>
                      <div className="flex flex-wrap gap-1.5">
                        {pillar.roles.map((role, rIdx) => (
                          <span key={rIdx} className="text-[11px] bg-white text-[#0F1E2F] px-2.5 py-1 rounded border border-[#E2E8F0] font-medium shadow-xs">
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
                      <Link
                        to="/solutions/$slug"
                        params={{ slug: pillar.slug }}
                        className="btn-gold text-xs uppercase tracking-wider py-2.5 px-4 rounded-lg font-bold flex items-center gap-1.5"
                      >
                        <span>Pillar Blueprint</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>

                      <Link
                        to="/book-diagnostic"
                        className="text-xs font-semibold text-[#53637C] hover:text-[#B8860B] transition-colors"
                      >
                        Book Diagnostic →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Integrated Capital Advisory & Business Loans Section */}
      <BusinessFundingLoanSection
        title="Pair Strategic Solutions With Working Capital & Debt"
        subtitle="Operational excellence requires fuel. Whether deploying marketing budgets, hiring engineering talent, or expanding plant machinery, structure your capital without pledging personal property."
      />

      {/* Bottom CTA */}
      <section className="bg-white py-20 text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 space-y-4">
          <span className="badge-gold">Diagnostic Assessment</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F1E2F]">Uncertain Which Pillar to Begin With?</h2>
          <p className="text-xs sm:text-sm text-[#53637C] max-w-xl mx-auto">
            Our 90-minute Growth &amp; Leadership Diagnostic audits your financial, marketing, operational, and technical bottlenecks to identify your primary constraint.
          </p>
          <div className="pt-4 flex justify-center gap-4">
            <Link to="/book-diagnostic" className="btn-gold flex items-center gap-2">
              <span>Schedule Diagnostic Call</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

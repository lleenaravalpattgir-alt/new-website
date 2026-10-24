import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { BusinessFundingLoanSection } from "@/components/site/BusinessFundingLoanCard";
import { deliveryStages, commercialOffers } from "@/data/roadmapData";
import { ArrowRight, CheckCircle2, ShieldCheck, Compass, Rocket, Target, BarChart3, Search, Sparkles } from "lucide-react";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works — The Six-Stage Rise Delivery Method | Rise Advisory" },
      { name: "description", content: "Learn how Rise Advisory translates business strategy into measurable 90-day execution sprints through our six-stage delivery method." },
      { property: "og:title", content: "How It Works — The Six-Stage Rise Delivery Method | Rise Advisory" },
      { property: "og:url", content: "https://ryzeadvisory.co/how-it-works" },
    ],
    links: [{ rel: "canonical", href: "https://ryzeadvisory.co/how-it-works" }],
  }),
  component: HowItWorksPage,
});

function HowItWorksPage() {
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
              <span>How We Work With You</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight">
              From Practical Advice <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A238] via-[#F3E5AB] to-[#D4A238]">
                To Real Results.
              </span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#EEF4FA]/80 leading-relaxed">
              Most business consultants just give you advice and leave you to do all the hard work. We do things differently: Our experienced leaders work directly with your team every week, solve real bottlenecks, and help you achieve your goals.
            </p>
          </div>
        </div>
      </section>

      {/* Six Stages Timeline */}
      <section className="bg-[#F8FBFF] py-24 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl mb-16">
            <span className="badge-gold mb-2">Step-by-Step Cadence</span>
            <h2 className="text-3xl font-extrabold text-[#0F1E2F]">The Six-Stage Rise Delivery Method</h2>
            <p className="text-sm text-[#53637C] mt-2">
              Every client journey follows a disciplined, predictable operational rhythm.
            </p>
          </div>

          <div className="space-y-8">
            {deliveryStages.map((stage) => {
              return (
                <div key={stage.step} className="service-card p-8">
                  <div className="grid gap-6 md:grid-cols-12 items-start">
                    <div className="md:col-span-3">
                      <div className="flex items-center gap-3">
                        <span className="text-4xl font-extrabold font-mono text-[#B8860B]">{stage.step}</span>
                        <div>
                          <span className="text-[10px] font-semibold text-[#0F1E2F] uppercase tracking-wider bg-[#EEF4FA] px-2.5 py-1 rounded border border-[#E2E8F0]">
                            {stage.duration}
                          </span>
                          <h3 className="text-2xl font-bold text-[#0F1E2F] mt-1">{stage.name}</h3>
                        </div>
                      </div>
                      <div className="text-xs font-semibold text-[#B8860B] mt-2">{stage.subtitle}</div>
                    </div>

                    <div className="md:col-span-5 text-xs sm:text-sm text-[#53637C] leading-relaxed border-t md:border-t-0 md:border-l border-[#E2E8F0] pt-4 md:pt-0 md:pl-6">
                      <div className="font-bold text-[#0F1E2F] uppercase text-[11px] mb-1">What Happens:</div>
                      {stage.clientExperience}
                    </div>

                    <div className="md:col-span-4 bg-[#F8FBFF] p-4 rounded-xl border border-[#E2E8F0] text-xs">
                      <div className="font-bold text-[#B8860B] uppercase text-[10px] mb-1">Agreed Deliverable:</div>
                      <div className="font-medium text-[#0F1E2F]">{stage.output}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Guarantee Box */}
          <div className="mt-16 service-card p-8 border-2 border-[#D4A238]/60 bg-white">
            <div className="flex items-start gap-4">
              <ShieldCheck className="h-8 w-8 text-[#B8860B] shrink-0 mt-1" />
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-[#0F1E2F]">The Rise Execution Guarantee</h3>
                <p className="text-xs sm:text-sm text-[#53637C] leading-relaxed">
                  If Rise Advisory misses an agreed deliverable or governance milestone for reasons within its control, it will complete that item without additional professional fees or extend the delivery period, subject to client dependencies defined in the Statement of Work.
                </p>
                <p className="text-[11px] text-[#53637C]/80 italic pt-1">
                  We never guarantee speculative revenue, funding, loans, IPO approval, or search engine rankings. We guarantee our process, our operational ownership, and our agreed deliverables.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commercial Offers & Indicative Pricing */}
      <section className="bg-white py-24 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl mb-16">
            <span className="badge-gold mb-2">Productized Offers</span>
            <h2 className="text-3xl font-extrabold text-[#0F1E2F]">Commercial Engagement Formats</h2>
            <p className="text-sm text-[#53637C] mt-2">
              Transparent, milestone-based pricing structures based on the Rise Advisory Growth Roadmap.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {commercialOffers.map((offer) => (
              <div key={offer.id} className="service-card p-7 flex flex-col justify-between">
                <div>
                  <span className="badge-gold text-[10px] mb-3">{offer.badge}</span>
                  <h3 className="text-xl font-bold text-[#0F1E2F] mb-1">{offer.title}</h3>
                  <div className="text-sm font-extrabold text-[#B8860B] my-2">{offer.indicativePricing}</div>
                  <p className="text-xs text-[#53637C] leading-relaxed mb-4">{offer.scope}</p>

                  <div className="pt-3 border-t border-[#E2E8F0] space-y-2">
                    <div className="text-[10px] font-bold text-[#0F1E2F] uppercase tracking-wider">Features:</div>
                    <ul className="space-y-1.5 text-xs text-[#53637C]">
                      {offer.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#E2E8F0]">
                  <Link
                    to="/book-diagnostic"
                    className="btn-gold w-full text-center text-xs uppercase tracking-wider py-3 rounded-lg font-bold block"
                  >
                    {offer.ctaLabel}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrated Capital Advisory & Business Loans Section */}
      <BusinessFundingLoanSection
        title="Execution Milestones Meet Institutional Financing"
        subtitle="Growth sprints require timely capital. As our fractional leaders optimize cash flow and financial models, we structure your eligibility for collateral-free bank loans, grants, and subsidies."
      />
    </SiteLayout>
  );
}

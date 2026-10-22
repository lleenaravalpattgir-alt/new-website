import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { commercialOffers } from "@/data/roadmapData";
import { CheckCircle2, ShieldCheck, ArrowRight, HelpCircle, AlertCircle, Clock, Calendar, DollarSign } from "lucide-react";
import { track } from "@/lib/track";

export const Route = createFileRoute("/offers")({
  head: () => ({
    meta: [
      { title: "Productised Offers & Pricing | Rise Advisory" },
      {
        name: "description",
        content:
          "Explore Rise Advisory's six transparent productised offers: Expert Power Sessions, Growth Diagnostics, 90-Day Rise Execution Sprints, Fractional CXO Retainers, Growth Pods, and Executive Workshops.",
      },
    ],
    links: [{ rel: "canonical", href: "https://riseadvisory.co/offers" }],
  }),
  component: OffersPage,
});

const commercialRules = [
  "Three-month minimum for most retainers; one-month pilot only for tightly defined outcomes.",
  "Collect setup and diagnostic fees upfront; monthly retainers are payable in advance.",
  "Third-party spend, ad budgets, SaaS tools, statutory fees, and travel are billed separately at cost.",
  "Change requests are required for any work expanding outside the agreed Statement of Work and capacity.",
  "All engagements are backed by the process-and-deliverables Rise Execution Guarantee.",
];

function OffersPage() {
  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0B1F3B] pt-16 pb-24 md:pt-24 md:pb-28 border-b border-[#132F55] text-white">
        <div className="absolute inset-0 navy-diagonal-texture pointer-events-none" aria-hidden />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl space-y-4">
            <span className="badge-navy">Productised Engagement Models</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
              Productised Offers &amp; <br />
              <span className="text-[#D4A238]">Indicative Commercials.</span>
            </h1>
            <p className="text-base text-[#D1D7DF] leading-relaxed">
              No bloated consulting retainers or opaque hourly billing. We package senior executive leadership into defined scopes, weekly execution rhythms, and measurable 90-day deliverables.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Notice Callout */}
      <section className="bg-[#EEF4FA] border-b border-[#E2E8F0] py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex items-center gap-3 text-xs text-[#53637C]">
          <AlertCircle className="h-4 w-4 text-[#B8860B] shrink-0" />
          <span>
            <strong>Indicative Pricing Notice:</strong> All figures shown are illustrative launch ranges for planning purposes. Final fees reflect expert seniority, time commitment (days/week), sector complexity, and contractual terms.
          </span>
        </div>
      </section>

      {/* Offers Grid */}
      <section className="bg-[#F8FBFF] py-20 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <span className="badge-gold">Choose Your Format</span>
            <h2 className="text-3xl font-extrabold text-[#0F1E2F] mt-2 sm:text-4xl">
              Six Structured Ways to Engage
            </h2>
            <p className="mt-2 text-sm text-[#53637C]">
              From a single 90-minute strategic deep-dive to multi-disciplinary CXO growth pods.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {commercialOffers.map((offer) => {
              const isPrimary = offer.id === "growth-diagnostic";
              const isFlagship = offer.id === "90-day-sprint";

              return (
                <div
                  key={offer.id}
                  className={`bg-white rounded-2xl p-8 flex flex-col justify-between border shadow-sm transition-all ${
                    isPrimary
                      ? "border-2 border-[#D4A238] shadow-md ring-4 ring-[#D4A238]/10"
                      : isFlagship
                      ? "border-t-4 border-t-[#0B1F3B] border-[#E2E8F0]"
                      : "border-[#E2E8F0] hover:border-[#D4A238]/40"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="badge-gold text-[10px]">{offer.badge}</span>
                      {isPrimary && (
                        <span className="text-[10px] font-bold text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded">
                          Recommended Entry
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-[#0F1E2F] mb-1">{offer.title}</h3>
                    <div className="text-2xl font-extrabold text-[#B8860B] my-3">{offer.indicativePricing}</div>

                    <p className="text-xs text-[#53637C] leading-relaxed mb-4">{offer.scope}</p>

                    <div className="bg-[#F8FBFF] p-3.5 rounded-xl border border-[#E2E8F0] mb-5">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#0F1E2F] mb-1">
                        Best Suited For:
                      </div>
                      <p className="text-xs text-[#53637C]">{offer.bestFor}</p>
                    </div>

                    <div className="space-y-2 mb-6">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#6B7A99]">Included Features:</div>
                      <ul className="space-y-1.5 text-xs text-[#53637C]">
                        {offer.features.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981] shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E2E8F0]">
                    <Link
                      to={isPrimary ? "/book-diagnostic" : "/contact"}
                      onClick={() => track("offer_select", { offer_id: offer.id, title: offer.title })}
                      className={`w-full text-center text-xs uppercase tracking-wider py-3 rounded-lg font-bold block transition-all ${
                        isPrimary
                          ? "btn-gold shadow-gold"
                          : "btn-secondary"
                      }`}
                    >
                      {offer.ctaLabel}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Commercial Rules & Engagement Standards */}
      <section className="bg-white py-20 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FBFF] p-8 md:p-10 shadow-xs">
            <span className="badge-gold mb-3">Operating Governance</span>
            <h2 className="text-2xl font-bold text-[#0F1E2F]">Commercial Rules &amp; Engagement Principles</h2>
            <p className="text-xs text-[#53637C] mt-2 mb-6 leading-relaxed">
              To protect both client outcomes and executive delivery capacity, all Rise Advisory engagements operate under strict commercial rules:
            </p>

            <ul className="space-y-3 text-xs text-[#0F1E2F]">
              {commercialRules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#0B1F3B] text-[#D4A238] font-mono text-[10px] font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="bg-[#EEF4FA] py-20 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center space-y-4">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B1F3B] text-[#D4A238] border border-[#D4A238]/30 mx-auto">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F1E2F]">
            The Rise Execution Guarantee
          </h2>
          <p className="text-sm text-[#53637C] max-w-2xl mx-auto leading-relaxed">
            If Rise Advisory misses an agreed deliverable or governance milestone for reasons within its control, it will complete that item without an additional professional fee or extend the relevant delivery period, subject to client dependencies defined in the Statement of Work.
          </p>
          <div className="pt-2">
            <Link to="/book-diagnostic" className="btn-gold text-xs uppercase tracking-wider py-3.5 px-6 rounded-lg font-bold inline-flex items-center gap-2">
              <span>Start with a Growth Diagnostic</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

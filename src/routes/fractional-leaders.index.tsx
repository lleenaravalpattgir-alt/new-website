import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { fractionalLeadersData } from "@/data/fractionalLeadersData";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  Landmark,
} from "lucide-react";

export const Route = createFileRoute("/fractional-leaders/")({
  head: () => ({
    meta: [
      { title: "Fractional Leaders Catalogue | Rise Advisory" },
      {
        name: "description",
        content:
          "Access vetted fractional executives across CFO, CMO, CTO, COO, CHRO, CRO, CAIO, and CPO disciplines. Senior leadership without full-time C-suite overhead.",
      },
    ],
  }),
  component: FractionalLeadersHubPage,
});

function FractionalLeadersHubPage() {
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
              <span>Experienced Business Leaders</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight">
              Senior Business Leaders. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A238] via-[#F3E5AB] to-[#D4A238]">
                Part-Time Cost. Real Results.
              </span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#EEF4FA]/80 leading-relaxed">
              Why pay expensive full-time executive salaries before your business is ready? Work with seasoned leaders 1 to 2 days a week to solve problems, guide your staff, and achieve clear goals.
            </p>
          </div>
        </div>
      </section>

      {/* 8 Roles Grid */}
      <section className="bg-[#F8FBFF] py-20 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {fractionalLeadersData.map((role) => (
              <div key={role.id} className="service-card p-6 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center justify-center h-10 w-14 text-sm font-extrabold rounded-lg bg-[#EEF4FA] text-[#0B1F3B] border border-[#E2E8F0] group-hover:bg-[#D4A238] group-hover:text-[#0B1F3B] transition-colors">
                      {role.code}
                    </span>
                    <span className="text-[10px] text-[#10B981] font-semibold bg-[#10B981]/10 px-2 py-0.5 rounded border border-[#10B981]/20">
                      Vetted Bench
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-[#0F1E2F] group-hover:text-[#B8860B] transition-colors leading-snug">
                    {role.shortTitle}
                  </h2>
                  <p className="text-[11px] font-medium text-[#B8860B] mt-1 line-clamp-1">
                    {role.tagline}
                  </p>
                  <p className="text-xs text-[#53637C] leading-relaxed mt-3 line-clamp-3">
                    {role.description}
                  </p>

                  <div className="mt-4 pt-4 border-t border-[#E2E8F0] space-y-1.5">
                    <div className="text-[10px] font-bold text-[#0F1E2F] uppercase tracking-wider">
                      Solves:
                    </div>
                    <p className="text-[11px] text-[#53637C] line-clamp-2">
                      {role.typicalChallenges[0]}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E2E8F0]">
                  <Link
                    to="/fractional-leaders/$slug"
                    params={{ slug: role.slug }}
                    className="btn-gold w-full text-center text-xs uppercase tracking-wider py-2.5 rounded-lg font-bold block"
                  >
                    View Role Specs →
                  </Link>
                </div>
              </div>
            ))}
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
                Execution requires capital. Our fractional leaders work hand-in-hand with our
                Ahmedabad financial advisory practice to structure non-collateral debt, state
                subsidies, and equity syndication.
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

      {/* Governance & Standards */}
      <section className="bg-white py-20 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="service-card p-6 text-center">
              <ShieldCheck className="h-8 w-8 text-[#B8860B] mx-auto mb-3" />
              <h3 className="font-bold text-[#0F1E2F] text-base">Vetted Operator Standards</h3>
              <p className="text-xs text-[#53637C] mt-2 leading-relaxed">
                Every leader has 15–20+ years of senior executive experience. We perform rigorous
                reference, conflict, and track record verification.
              </p>
            </div>
            <div className="service-card p-6 text-center">
              <CheckCircle2 className="h-8 w-8 text-[#B8860B] mx-auto mb-3" />
              <h3 className="font-bold text-[#0F1E2F] text-base">One Accountable Relationship</h3>
              <p className="text-xs text-[#53637C] mt-2 leading-relaxed">
                A named Rise Engagement Lead oversees quality assurance, weekly notes, client
                pulses, and cross-functional coordination.
              </p>
            </div>
            <div className="service-card p-6 text-center">
              <ShieldCheck className="h-8 w-8 text-[#B8860B] mx-auto mb-3" />
              <h3 className="font-bold text-[#0F1E2F] text-base">The Rise Execution Guarantee</h3>
              <p className="text-xs text-[#53637C] mt-2 leading-relaxed">
                We contractually commit to agreed governance milestones and deliverables. If we miss
                an item under our control, we complete it at no extra fee.
              </p>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

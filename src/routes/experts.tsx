import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { expertsData } from "@/data/expertsData";
import { ArrowRight, CheckCircle2, ShieldCheck, Award, Briefcase, Calendar, Sparkles } from "lucide-react";

export const Route = createFileRoute("/experts")({
  head: () => ({
    meta: [
      { title: "Vetted Expert Bench & Advisors | Rise Advisory" },
      { name: "description", content: "Meet the senior practice leads and fractional executives at Rise Advisory. 15+ years average leadership experience across finance, growth, tech, and operations." },
      { property: "og:title", content: "Vetted Expert Bench & Advisors | Rise Advisory" },
      { property: "og:url", content: "https://ryzeadvisory.co/experts" },
    ],
    links: [{ rel: "canonical", href: "https://ryzeadvisory.co/experts" }],
  }),
  component: ExpertsPage,
});

function ExpertsPage() {
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
              <span>Vetted Leadership Bench</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight">
              Senior Operators. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A238] via-[#F3E5AB] to-[#D4A238]">
                Proven Execution Discipline.
              </span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#EEF4FA]/80 leading-relaxed">
              We do not deploy junior analysts to practice on your account. Every fractional CXO and practice lead at Rise Advisory brings 15+ years of operational leadership from high-growth companies, listed enterprises, and scaling ventures.
            </p>
          </div>
        </div>
      </section>

      {/* Experts Grid */}
      <section className="bg-[#F8FBFF] py-20 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {expertsData.map((expert) => (
              <div key={expert.id} className="service-card p-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="badge-gold text-[10px]">{expert.practiceArea}</span>
                    {expert.isVerified && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-[#10B981] font-bold bg-[#10B981]/10 px-2 py-0.5 rounded border border-[#10B981]/20">
                        <ShieldCheck className="h-3 w-3" />
                        Verified Lead
                      </span>
                    )}
                  </div>

                  <h2 className="text-xl font-bold text-[#0F1E2F] mb-1">{expert.name}</h2>
                  <div className="text-xs font-semibold text-[#B8860B] mb-3">{expert.title}</div>
                  <p className="text-xs sm:text-sm text-[#53637C] leading-relaxed mb-4">{expert.bio}</p>

                  <div className="pt-3 border-t border-[#E2E8F0] space-y-2 text-xs">
                    <div>
                      <span className="font-bold text-[#0F1E2F] text-[11px]">Credentials:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {expert.credentials.map((c, i) => (
                          <span key={i} className="text-[10px] bg-[#EEF4FA] text-[#0F1E2F] px-2 py-0.5 rounded border border-[#E2E8F0]">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-1">
                      <span className="font-bold text-[#0F1E2F] text-[11px]">Sectors:</span>
                      <div className="text-[11px] text-[#53637C] mt-0.5">{expert.industries.join(", ")}</div>
                    </div>
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-[#E2E8F0] flex items-center justify-between text-xs">
                  <span className="text-[11px] text-[#B8860B] font-semibold">{expert.availability}</span>
                  <Link to="/book-diagnostic" className="btn-gold text-[11px] uppercase tracking-wider py-2 px-3 rounded font-bold">
                    Inquire
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vetting Criteria */}
      <section className="bg-white py-20 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="badge-gold mb-2">Partner Standards</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F1E2F]">How We Vet Our Bench</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 text-xs sm:text-sm text-[#53637C]">
            <div className="service-card p-6">
              <div className="font-bold text-[#0F1E2F] text-sm mb-1.5 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#B8860B]" />
                <span>15+ Years Track Record</span>
              </div>
              <p className="text-[#53637C] text-xs">Demonstrated senior leadership as former CXOs, VP leaders, or practice heads in scaling or enterprise businesses.</p>
            </div>

            <div className="service-card p-6">
              <div className="font-bold text-[#0F1E2F] text-sm mb-1.5 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#B8860B]" />
                <span>Rigorous Background &amp; Conflict Checks</span>
              </div>
              <p className="text-[#53637C] text-xs">Thorough verification of identity, credentials, reference checks, and non-disclosure standards.</p>
            </div>

            <div className="service-card p-6">
              <div className="font-bold text-[#0F1E2F] text-sm mb-1.5 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#B8860B]" />
                <span>Execution-Oriented Mindset</span>
              </div>
              <p className="text-[#53637C] text-xs">Advisors must be willing to roll up their sleeves, work directly inside your tools, and mentor internal team members.</p>
            </div>

            <div className="service-card p-6">
              <div className="font-bold text-[#0F1E2F] text-sm mb-1.5 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#B8860B]" />
                <span>Single Accountable Lead</span>
              </div>
              <p className="text-[#53637C] text-xs">Every expert engagement is supervised by a dedicated Rise engagement lead to guarantee quality and timeliness.</p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link to="/partner-standards" className="btn-secondary inline-flex items-center gap-2">
              <span>Read Full Partner Standards &amp; QA Process</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

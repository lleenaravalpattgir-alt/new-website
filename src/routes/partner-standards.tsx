import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ShieldCheck, CheckCircle2, UserCheck, FileText, Scale, Eye, Award, Sparkles, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/partner-standards")({
  head: () => ({
    meta: [
      { title: "Partner & Expert Standards | Rise Advisory" },
      { name: "description", content: "The vetting standards, operating model, code of conduct, and quality assurance framework for the Rise Advisory expert network." },
      { property: "og:title", content: "Partner & Expert Standards | Rise Advisory" },
      { property: "og:url", content: "https://ryzeadvisory.co/partner-standards" },
    ],
    links: [{ rel: "canonical", href: "https://ryzeadvisory.co/partner-standards" }],
  }),
  component: PartnerStandardsPage,
});

const steps = [
  { step: "01", name: "Sourcing", desc: "Referral-led invitations and targeted search for proven senior operators by functional role and industry sector." },
  { step: "02", name: "Vetting", desc: "Rigorous verification of corporate identity, CV history, client references, executive track record, and potential conflicts of interest." },
  { step: "03", name: "Assessment", desc: "Structured case interviews assessing communication clarity, founder empathy, and hands-on execution discipline." },
  { step: "04", name: "Contracting", desc: "Enforceable non-disclosure agreements (NDA), comprehensive IP assignment, non-solicitation clauses, and transparent compensation terms." },
  { step: "05", name: "Matching", desc: "Algorithmic and human matching based on exact constraint fit, sector familiarity, working style compatibility, and time commitment." },
  { step: "06", name: "Active Management", desc: "Supervised by a named Rise Engagement Lead with weekly deliverable audits, status notes, and client pulse checks." },
  { step: "07", name: "Quarterly Review", desc: "Systematic scoring based on milestone completion timeliness, client NPS, and demonstrable outcome quality." },
];

function PartnerStandardsPage() {
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
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Governance &amp; Trust</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight">
              Rise Partner &amp; <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A238] via-[#F3E5AB] to-[#D4A238]">
                Expert Quality Standards.
              </span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#EEF4FA]/80 leading-relaxed">
              We operate as a managed executive advisory platform—not an open marketplace or informal directory. Every advisor who wears the Rise badge adheres to strict vetting, confidentiality, and execution standards.
            </p>
          </div>
        </div>
      </section>

      {/* 7-Step Operating Model */}
      <section className="bg-[#F8FBFF] py-20 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl mb-14">
            <span className="badge-gold mb-2">Operating Framework</span>
            <h2 className="text-3xl font-extrabold text-[#0F1E2F]">The 7-Step Expert Network Model</h2>
            <p className="text-xs sm:text-sm text-[#53637C] mt-2">
              From initial sourcing to continuous engagement quality assurance.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((s) => (
              <div key={s.step} className="service-card p-6 flex flex-col justify-between">
                <div>
                  <span className="text-3xl font-extrabold font-mono text-[#B8860B]/40 mb-2 block">{s.step}</span>
                  <h3 className="text-base font-bold text-[#0F1E2F] mb-2">{s.name}</h3>
                  <p className="text-xs text-[#53637C] leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code of Conduct */}
      <section className="bg-white py-20 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 space-y-8">
          <div className="text-center mb-10">
            <span className="badge-gold mb-2">Ethics &amp; Standards</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F1E2F]">Advisor Code of Conduct</h2>
            <p className="text-xs sm:text-sm text-[#53637C] mt-1">Guiding principles for all client engagements</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 text-xs sm:text-sm text-[#53637C]">
            <div className="service-card p-6">
              <div className="font-bold text-[#0F1E2F] text-sm mb-1.5 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#B8860B]" />
                <span>Zero Conflict of Interest</span>
              </div>
              <p className="text-[#53637C] text-xs">Advisors must disclose and recuse themselves from any engagement involving active direct competitors.</p>
            </div>

            <div className="service-card p-6">
              <div className="font-bold text-[#0F1E2F] text-sm mb-1.5 flex items-center gap-2">
                <FileText className="h-4 w-4 text-[#B8860B]" />
                <span>100% Client IP Ownership</span>
              </div>
              <p className="text-[#53637C] text-xs">All deliverables, models, workflows, and code generated during the engagement belong exclusively to the client.</p>
            </div>

            <div className="service-card p-6">
              <div className="font-bold text-[#0F1E2F] text-sm mb-1.5 flex items-center gap-2">
                <Scale className="h-4 w-4 text-[#B8860B]" />
                <span>Truthful &amp; Ethical Counsel</span>
              </div>
              <p className="text-[#53637C] text-xs">Advisors provide candid, objective assessments. We never sugarcoat operational deficiencies or overpromise commercial outcomes.</p>
            </div>

            <div className="service-card p-6">
              <div className="font-bold text-[#0F1E2F] text-sm mb-1.5 flex items-center gap-2">
                <Eye className="h-4 w-4 text-[#B8860B]" />
                <span>Strict Confidentiality</span>
              </div>
              <p className="text-[#53637C] text-xs">Comprehensive NDA protections ensure all company records, financial data, and strategies remain strictly confidential.</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link to="/book-diagnostic" className="btn-gold inline-flex items-center gap-2">
              <span>Book a Diagnostic Consultation</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

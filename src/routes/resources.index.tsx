import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import {
  FileText,
  Download,
  CheckCircle2,
  ArrowRight,
  Calculator,
  CheckSquare,
  Brain,
  Compass,
  Sparkles,
  Layers,
  ShieldCheck,
  TrendingUp,
  UserCheck
} from "lucide-react";

export const Route = createFileRoute("/resources/")({
  head: () => ({
    meta: [
      { title: "Resources & Executive Toolkits | Rise Advisory" },
      { name: "description", content: "Interactive business calculators, diagnostics, capital-readiness checklists, and downloadable toolkits developed by Rise Advisory." },
      { property: "og:title", content: "Resources & Executive Toolkits | Rise Advisory" },
      { property: "og:url", content: "https://ryzeadvisory.co/resources" },
    ],
    links: [{ rel: "canonical", href: "https://ryzeadvisory.co/resources" }],
  }),
  component: ResourcesHubPage,
});

const interactiveTools = [
  {
    title: "Fractional vs Full-Time Cost Calculator",
    category: "Financial Governance",
    badge: "Interactive Financial Model",
    desc: "Calculate the true all-in cost (salary, bonuses, recruiter fees, healthcare, and equity dilution) of full-time C-suite executives versus engaging fractional CXOs.",
    icon: Calculator,
    link: "/resources/cost-calculator",
    cta: "Launch Cost Calculator",
    highlights: ["Custom salary benchmarks", "Recruiter fee calculations", "Equity dilution savings"]
  },
  {
    title: "Fractional CXO Self-Assessment",
    category: "Executive Strategy",
    badge: "Interactive Diagnostic (3 Min)",
    desc: "Answer 5 focused diagnostic questions to identify your primary operational bottleneck and determine whether your business needs a fractional CFO, CMO, CTO, or COO.",
    icon: UserCheck,
    link: "/resources/fractional-cxo-assessment",
    cta: "Take Self-Assessment",
    highlights: ["Instant bottleneck identification", "Recommended CXO role", "Custom 90-day sprint preview"]
  },
  {
    title: "90-Day Growth Constraint Map",
    category: "Strategic Planning",
    badge: "Interactive Audit & Worksheet",
    desc: "Audit the four critical dimensions of business growth (Revenue Engine, Operational Cadence, Financial Visibility, and Leadership Focus) to locate your primary ceiling.",
    icon: Compass,
    link: "/resources/growth-constraint-map",
    cta: "Build Constraint Map",
    highlights: ["4-dimension friction score", "Prioritized bottleneck ranking", "Custom action plan export"]
  },
  {
    title: "Capital-Readiness & Data Room Checklist",
    category: "Capital Readiness",
    badge: "Interactive Diligence Audit",
    desc: "Evaluate your company's readiness for bank debt syndication, private equity, or venture funding across 18 diligence items with live percentage scoring.",
    icon: CheckSquare,
    link: "/resources/capital-readiness-checklist",
    cta: "Audit Capital Readiness",
    highlights: ["13-week cash flow check", "Cap table & corporate hygiene", "Statutory tax & audit compliance"]
  },
  {
    title: "AI Readiness & Automation Scorecard",
    category: "Technology & AI",
    badge: "Interactive Tech Rubric",
    desc: "Pragmatic, zero-hype evaluation of your data hygiene, security policies, and workflow volume to identify top ROI automation candidates.",
    icon: Brain,
    link: "/resources/ai-readiness-scorecard",
    cta: "Score AI Readiness",
    highlights: ["Zero-retention security check", "Workflow candidate identification", "Cloud architecture audit"]
  },
  {
    title: "Founder Dependency Diagnostic",
    category: "Operations & Org Design",
    badge: "Interactive Leadership Tool",
    desc: "Diagnose how much of your business depends solely on the founder. Calculate your company's Delegation Index and uncover operational vulnerabilities.",
    icon: Layers,
    link: "/resources/founder-dependency-diagnostic",
    cta: "Calculate Delegation Index",
    highlights: ["Weekly firefighting hours audit", "Single-point-of-failure alerts", "Systematization roadmap"]
  }
];

function ResourcesHubPage() {
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
              <span>Interactive Strategic Intelligence</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight">
              Actionable Business Tools &amp; <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A238] via-[#F3E5AB] to-[#D4A238]">
                Interactive Diagnostics.
              </span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#EEF4FA]/80 leading-relaxed">
              Explore our suite of executive decision frameworks, cost models, and readiness scorecards designed to help founders identify operational bottlenecks and scale with discipline.
            </p>
          </div>
        </div>
      </section>

      {/* Six Interactive Tools Grid */}
      <section className="bg-[#F8FBFF] py-20 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="badge-gold mb-2">Conversion &amp; Diagnostic Tools</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F1E2F]">
                Six Interactive Executive Utilities
              </h2>
            </div>
            <p className="mt-2 md:mt-0 text-xs sm:text-sm text-[#53637C] max-w-md">
              Free to use, instant calculation, and grounded in the authentic 90-Day Rise Delivery Method.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {interactiveTools.map((tool, idx) => (
              <div key={idx} className="service-card p-7 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="icon-container-navy">
                      <tool.icon className="h-5 w-5 text-[#D4A238]" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-[#EEF4FA] text-[#0B1F3B] px-2.5 py-1 rounded-md border border-[#E2E8F0]">
                      {tool.badge}
                    </span>
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#B8860B] block mb-1">
                    {tool.category}
                  </span>
                  <h3 className="text-lg font-bold text-[#0F1E2F] mb-2 leading-snug group-hover:text-[#B8860B] transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-[#53637C] leading-relaxed mb-4">
                    {tool.desc}
                  </p>

                  <div className="space-y-1.5 pt-3 border-t border-[#E2E8F0] mb-6">
                    {tool.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] text-[#53637C]">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981] shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Link
                    to={tool.link}
                    className="btn-gold w-full text-center text-xs uppercase tracking-wider py-2.5 rounded-lg font-bold flex items-center justify-center gap-2"
                  >
                    <span>{tool.cta}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Downloadable Templates Section */}
      <section className="bg-white py-20 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="rounded-2xl border border-[#D4A238]/30 bg-[#F8FBFF] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="badge-gold mb-2">Offline Frameworks</span>
              <h3 className="text-2xl font-extrabold text-[#0F1E2F]">
                Downloadable Worksheets &amp; PDF Toolkits
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#53637C] leading-relaxed">
                Prefer to review offline with your executive team? Access downloadable PDF summaries, Excel financial modeling templates, and print-ready constraint worksheets.
              </p>
            </div>
            <div className="shrink-0">
              <Link to="/resources/templates" className="btn-secondary flex items-center gap-2">
                <Download className="h-4 w-4" />
                <span>View Template Downloads</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Diagnostic CTA */}
      <section className="bg-[#F8FBFF] py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <span className="badge-gold mb-3">Custom Analysis</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F1E2F]">
            Want a Bespoke Audit by a Senior Practice Lead?
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#53637C] max-w-2xl mx-auto">
            Book our structured 90-minute Growth &amp; Leadership Diagnostic. We audit your revenue engine, working capital visibility, and operational dependencies to produce your 90-day execution roadmap.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link to="/book-diagnostic" className="btn-gold flex items-center gap-2">
              <span>Book Growth Diagnostic (90 Min)</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

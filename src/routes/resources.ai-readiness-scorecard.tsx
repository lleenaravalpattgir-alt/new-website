import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Brain, CheckCircle2, ArrowRight, ShieldCheck, Cpu, Zap, AlertCircle } from "lucide-react";
import { useState } from "react";
import { track } from "@/lib/track";

export const Route = createFileRoute("/resources/ai-readiness-scorecard")({
  head: () => ({
    meta: [
      { title: "AI Readiness Scorecard for SMEs & Startups | Rise Advisory" },
      {
        name: "description",
        content:
          "Audit internal data security, software API readiness, and evaluate high-ROI workflow automation candidates with the Rise Advisory AI Readiness Scorecard.",
      },
      { property: "og:url", content: "https://ryzeadvisory.co/resources/ai-readiness-scorecard" },
    ],
    links: [{ rel: "canonical", href: "https://ryzeadvisory.co/resources/ai-readiness-scorecard" }],
  }),
  component: AIReadinessScorecardPage,
});

const PILLARS = [
  {
    id: "data",
    title: "1. Data Architecture & Structure",
    desc: "Is company knowledge organized in clean databases or trapped in chaotic PDFs and spreadsheets?",
    levels: [
      { score: 10, label: "Chaotic", detail: "Scattered in personal folders, unorganized emails & paper." },
      { score: 20, label: "Partially Structured", detail: "Google Drive, basic ERP/CRM, inconsistent naming." },
      { score: 30, label: "Production Grade", detail: "Centralized relational databases, clean APIs & data hygiene." },
    ],
  },
  {
    id: "security",
    title: "2. AI Security & Data Privacy Governance",
    desc: "Do you have policies preventing staff from leaking confidential client data to public consumer LLMs?",
    levels: [
      { score: 5, label: "Zero Policy", detail: "Staff paste confidential data into public ChatGPT freely." },
      { score: 15, label: "Informal Awareness", detail: "Team knows to be careful, but no zero-retention API contracts exist." },
      { score: 25, label: "Enterprise Secure", detail: "Formal acceptable-use policy, private zero-data-retention APIs." },
    ],
  },
  {
    id: "workflows",
    title: "3. Repetitive Workflow Volume",
    desc: "How many hours per week do teams spend on manual document extraction, lead research, and reporting?",
    levels: [
      { score: 10, label: "Low (< 10 hrs)", detail: "Small team with limited operational repetition." },
      { score: 20, label: "Moderate (20–40 hrs)", detail: "Noticeable time lost to routine copy-pasting and data entry." },
      { score: 25, label: "High Drag (50+ hrs)", detail: "Massive repetitive manual workload across sales/ops/fulfillment." },
    ],
  },
  {
    id: "systems",
    title: "4. API Integrability & SaaS Architecture",
    desc: "Are your core software tools modern cloud systems with webhooks and REST APIs?",
    levels: [
      { score: 5, label: "Legacy Desktop", detail: "Standalone on-premise software without API connectivity." },
      { score: 15, label: "Hybrid Cloud", detail: "Some SaaS tools (Slack, Google Workspace) mixed with legacy apps." },
      { score: 20, label: "Modern Cloud-Native", detail: "Modern SaaS stack (HubSpot, PostgreSQL, REST APIs, Zapier/n8n ready)." },
    ],
  },
];

function AIReadinessScorecardPage() {
  const [scores, setScores] = useState<Record<string, number>>({
    data: 20,
    security: 15,
    workflows: 20,
    systems: 15,
  });

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);

  const getReadinessTier = (score: number) => {
    if (score >= 80) return { label: "Production Ready", color: "text-[#10B981]", desc: "Ideal candidate for custom RAG pipelines and autonomous agentic workflows." };
    if (score >= 55) return { label: "High Automation Potential", color: "text-[#D4A238]", desc: "Ready for pragmatic workflow automation (document parsing, CRM enrichment, customer support FAQ bots)." };
    return { label: "Foundational Setup Required", color: "text-[#EF4444]", desc: "Focus first on data security policies and cleaning manual data architecture before deploying AI models." };
  };

  const tier = getReadinessTier(totalScore);

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0B1F3B] pt-16 pb-20 border-b border-[#132F55] text-white">
        <div className="absolute inset-0 navy-diagonal-texture pointer-events-none" aria-hidden />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs">
              <Link to="/resources" className="text-[#D4A238] hover:underline">
                Resources
              </Link>
              <span className="text-[#6B7A99]">&gt;</span>
              <span className="text-[#D1D7DF]">Technology &amp; AI</span>
            </div>

            <span className="badge-navy">Pragmatic AI Adoption</span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              SME &amp; Startup <br />
              <span className="text-[#D4A238]">AI Readiness Scorecard.</span>
            </h1>
            <p className="text-base text-[#D1D7DF] leading-relaxed">
              Cut through superficial AI hype. Evaluate your internal data security, software API readiness, and pinpoint high-ROI workflow automation opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Main Scorecard */}
      <section className="bg-[#F8FBFF] py-20 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-12 items-start">
            {/* Pillars */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm space-y-6">
                <div className="border-b border-[#E2E8F0] pb-4">
                  <h2 className="text-lg font-bold text-[#0F1E2F]">Audit Core Technology Pillars</h2>
                  <p className="text-xs text-[#53637C] mt-1">
                    Select the option that best reflects your current internal technology landscape:
                  </p>
                </div>

                <div className="space-y-6">
                  {PILLARS.map((p) => (
                    <div key={p.id} className="p-4 rounded-xl border border-[#E2E8F0] bg-[#F8FBFF] space-y-2.5">
                      <h3 className="text-sm font-bold text-[#0F1E2F]">{p.title}</h3>
                      <p className="text-xs text-[#53637C]">{p.desc}</p>

                      <div className="grid grid-cols-3 gap-2 pt-2">
                        {p.levels.map((lvl) => {
                          const isSelected = scores[p.id] === lvl.score;
                          return (
                            <button
                              key={lvl.score}
                              onClick={() => {
                                setScores((prev) => ({ ...prev, [p.id]: lvl.score }));
                                track("ai_score_update", { pillar: p.id, score: lvl.score });
                              }}
                              className={`p-2.5 rounded-lg text-center border text-xs font-bold transition-all cursor-pointer ${
                                isSelected
                                  ? "bg-[#0B1F3B] text-[#D4A238] border-[#D4A238] shadow-xs"
                                  : "bg-white text-[#53637C] border-[#E2E8F0] hover:bg-[#EEF4FA]"
                              }`}
                            >
                              <div>{lvl.label}</div>
                              <div className="text-[9px] font-normal text-[#6B7A99] line-clamp-2 mt-0.5">{lvl.detail}</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Score Display Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="card-executive p-6 sm:p-8 bg-white border border-[#E2E8F0] shadow-xl rounded-2xl space-y-5 text-center">
                <span className="badge-gold text-[10px]">AI Readiness Index</span>

                <div className="p-6 rounded-xl bg-[#0B1F3B] text-white">
                  <div className="text-5xl font-extrabold text-[#D4A238]">{totalScore} / 100</div>
                  <div className="text-sm font-bold text-white mt-2">{tier.label}</div>
                  <div className="text-xs text-[#D1D7DF]/85 mt-2 leading-relaxed">{tier.desc}</div>
                </div>

                {/* High-ROI Automation Opportunities */}
                <div className="text-xs text-left text-[#53637C] space-y-2.5 pt-2">
                  <div className="font-bold text-[#0F1E2F] uppercase tracking-wider text-[11px]">
                    Top 3 Pragmatic AI Use Cases for Your Score:
                  </div>
                  <div className="bg-[#F8FBFF] p-3 rounded-lg border border-[#E2E8F0] flex items-start gap-2">
                    <Zap className="h-4 w-4 text-[#D4A238] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#0F1E2F]">Document &amp; Invoice Data Extraction:</strong>
                      <span className="text-[#53637C] block mt-0.5">Automate PO and vendor bill entries into your accounting system with 98%+ precision.</span>
                    </div>
                  </div>
                  <div className="bg-[#F8FBFF] p-3 rounded-lg border border-[#E2E8F0] flex items-start gap-2">
                    <Zap className="h-4 w-4 text-[#D4A238] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#0F1E2F]">Inbound Sales Lead Enrichment:</strong>
                      <span className="text-[#53637C] block mt-0.5">Enrich incoming lead domains with financial size and technology stack before rep routing.</span>
                    </div>
                  </div>
                  <div className="bg-[#F8FBFF] p-3 rounded-lg border border-[#E2E8F0] flex items-start gap-2">
                    <Zap className="h-4 w-4 text-[#D4A238] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#0F1E2F]">Internal Knowledge Retrieval (RAG):</strong>
                      <span className="text-[#53637C] block mt-0.5">Provide employees with an instant search bot over company SOPs, contracts, and HR policies.</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E2E8F0]">
                  <Link
                    to="/book-diagnostic"
                    className="btn-gold w-full text-center text-xs uppercase tracking-wider py-3.5 rounded-lg font-bold block shadow-gold"
                  >
                    Engage Fractional CAIO &amp; CTO
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

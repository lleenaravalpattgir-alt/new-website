import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Brain, CheckCircle2, ArrowRight, ShieldCheck, HelpCircle, AlertCircle, RefreshCw } from "lucide-react";
import { useState } from "react";
import { track } from "@/lib/track";

export const Route = createFileRoute("/resources/fractional-cxo-assessment")({
  head: () => ({
    meta: [
      { title: "Fractional CXO Self-Assessment | Rise Advisory" },
      {
        name: "description",
        content:
          "Take the Rise Advisory Fractional CXO Self-Assessment to diagnose your primary company bottleneck and discover which executive role your stage requires.",
      },
    ],
    links: [{ rel: "canonical", href: "https://riseadvisory.co/resources/fractional-cxo-assessment" }],
  }),
  component: AssessmentPage,
});

const QUESTIONS = [
  {
    id: "q1",
    question: "Where is the primary growth bottleneck in your business today?",
    options: [
      { text: "Cash flow unpredictability, unit economics drag, or preparing for funding", role: "CFO", pillar: "Finance & Capital Readiness" },
      { text: "Rising CAC, ineffective marketing agencies, or lack of repeatable GTM pipeline", role: "CMO", pillar: "Growth & Revenue" },
      { text: "Dev agency delays, buggy tech stack, or lack of AI automation", role: "CTO", pillar: "Technology, Product & AI" },
      { text: "Founder is the operational bottleneck for every single delivery decision", role: "COO", pillar: "People & Operations" },
    ],
  },
  {
    id: "q2",
    question: "How fast and accurate is your monthly financial & management reporting (MIS)?",
    options: [
      { text: "Arrives after 25+ days or is purely tax-oriented without forward forecasting", role: "CFO", pillar: "Finance & Capital Readiness" },
      { text: "Basic P&L exists, but unit economics by channel/product are unclear", role: "CMO", pillar: "Growth & Revenue" },
      { text: "Cloud bills and software infrastructure costs are untracked and ballooning", role: "CTO", pillar: "Technology, Product & AI" },
      { text: "Finance is fine, but fulfillment costs and operational scrap eat our margins", role: "COO", pillar: "People & Operations" },
    ],
  },
  {
    id: "q3",
    question: "How much of your weekly schedule as a founder is spent firefighting routine operations?",
    options: [
      { text: "Over 25 hours/week—nothing ships or gets approved without my manual sign-off", role: "COO", pillar: "People & Operations" },
      { text: "15–25 hours/week handling client pitches and reviewing agency ad copies", role: "CMO", pillar: "Growth & Revenue" },
      { text: "10–20 hours/week managing developers or testing software bug reports", role: "CTO", pillar: "Technology, Product & AI" },
      { text: "10–15 hours/week following up on delayed customer payments and vendor checks", role: "CFO", pillar: "Finance & Capital Readiness" },
    ],
  },
  {
    id: "q4",
    question: "What is your biggest technology or systems challenge right now?",
    options: [
      { text: "Software engineering sprints miss deadlines; non-technical founder can't verify code quality", role: "CTO", pillar: "Technology, Product & AI" },
      { text: "Confusion on how to pragmatically deploy generative AI and automate repetitive workflows", role: "CAIO", pillar: "Technology, Product & AI" },
      { text: "Lack of documented SOPs across our operational tools and customer fulfillment", role: "COO", pillar: "People & Operations" },
      { text: "Attribution between marketing spend, CRM pipeline, and actual closed revenue is broken", role: "CRO", pillar: "Growth & Revenue" },
    ],
  },
  {
    id: "q5",
    question: "What is your primary strategic priority over the next 90 days?",
    options: [
      { text: "Locking rolling cash flow models, shortening DSO, and building an investor data room", role: "CFO", pillar: "Finance & Capital Readiness" },
      { text: "Repositioning our brand narrative and scaling predictable outbound/inbound sales pipelines", role: "CMO", pillar: "Growth & Revenue" },
      { text: "Systematizing operational workflows, authoring SOPs, and delegating founder authority", role: "COO", pillar: "People & Operations" },
      { text: "Refactoring system architecture, cutting cloud spend, and improving sprint velocity", role: "CTO", pillar: "Technology, Product & AI" },
    ],
  },
];

function AssessmentPage() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (qId: string, optIdx: number) => {
    setAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const isComplete = Object.keys(answers).length === QUESTIONS.length;

  const calculateResult = () => {
    const scores: Record<string, number> = { CFO: 0, CMO: 0, CTO: 0, COO: 0, CAIO: 0, CRO: 0 };
    Object.entries(answers).forEach(([qId, optIdx]) => {
      const q = QUESTIONS.find((item) => item.id === qId);
      if (q) {
        const role = q.options[optIdx].role;
        scores[role] = (scores[role] || 0) + 1;
      }
    });

    const sortedRoles = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const topRole = sortedRoles[0][0];

    const roleMap: Record<string, { title: string; pillar: string; desc: string; slug: string }> = {
      CFO: {
        title: "Fractional Chief Financial Officer (CFO)",
        pillar: "Finance & Capital Readiness",
        desc: "Your business requires forward-looking cash flow modeling, institutional MIS reporting, credit discipline, and capital readiness governance.",
        slug: "cfo",
      },
      CMO: {
        title: "Fractional Chief Marketing Officer (CMO)",
        pillar: "Growth & Revenue",
        desc: "Your company needs go-to-market architecture, CAC discipline, agency accountability, and repeatable customer acquisition loops.",
        slug: "cmo",
      },
      CTO: {
        title: "Fractional Chief Technology Officer (CTO)",
        pillar: "Technology, Product & AI",
        desc: "You need architectural review, software sprint hygiene, developer governance, cloud cost optimization, and secure systems scaling.",
        slug: "cto",
      },
      COO: {
        title: "Fractional Chief Operating Officer (COO)",
        pillar: "People & Operations",
        desc: "Your core priority must be eliminating founder bottlenecks, documenting delivery SOPs, installing a RACI delegation matrix, and instituting an executive operating cadence.",
        slug: "coo",
      },
      CAIO: {
        title: "Fractional Chief AI Officer (CAIO)",
        pillar: "Technology, Product & AI",
        desc: "Your priority is evaluating internal workflows for pragmatic AI automation, deploying custom agents, and securing enterprise data privacy.",
        slug: "caio",
      },
      CRO: {
        title: "Fractional Chief Revenue Officer (CRO)",
        pillar: "Growth & Revenue",
        desc: "Your business needs sales playbook discipline, deal qualification rubrics, pipeline velocity acceleration, and customer retention expansion.",
        slug: "cro",
      },
    };

    return roleMap[topRole] || roleMap.COO;
  };

  const result = submitted ? calculateResult() : null;

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
              <span className="text-[#D1D7DF]">Self-Assessment</span>
            </div>

            <span className="badge-navy">Executive Needs Diagnostic</span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              Fractional CXO <br />
              <span className="text-[#D4A238]">Self-Assessment.</span>
            </h1>
            <p className="text-base text-[#D1D7DF] leading-relaxed">
              Answer 5 operational questions to pinpoint your company's primary growth constraint and determine which fractional C-suite role your stage immediately requires.
            </p>
          </div>
        </div>
      </section>

      {/* Assessment Body */}
      <section className="bg-[#F8FBFF] py-20 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          {!submitted ? (
            <div className="space-y-8">
              {QUESTIONS.map((q, idx) => (
                <div key={q.id} className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E2E8F0] shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#B8860B] mb-2 uppercase tracking-wider">
                    <span>Question {idx + 1} of {QUESTIONS.length}</span>
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-[#0F1E2F] mb-4">{q.question}</h2>

                  <div className="space-y-2.5">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = answers[q.id] === optIdx;
                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelect(q.id, optIdx)}
                          className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs flex items-start gap-3 cursor-pointer ${
                            isSelected
                              ? "bg-[#D4A238]/10 border-[#D4A238] font-bold text-[#0F1E2F] shadow-xs"
                              : "bg-[#F8FBFF] border-[#E2E8F0] text-[#53637C] hover:border-[#D4A238]/40 hover:text-[#0F1E2F]"
                          }`}
                        >
                          <span
                            className={`h-4 w-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                              isSelected ? "border-[#D4A238] bg-[#D4A238] text-white" : "border-[#E2E8F0]"
                            }`}
                          >
                            {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                          </span>
                          <span className="leading-relaxed">{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className="pt-4 text-center">
                <button
                  disabled={!isComplete}
                  onClick={() => {
                    setSubmitted(true);
                    track("assessment_completed", { answers });
                  }}
                  className={`btn-gold text-xs uppercase tracking-wider py-4 px-8 rounded-lg font-bold shadow-gold ${
                    !isComplete ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                  }`}
                >
                  Generate My Fractional Leadership Diagnostic
                </button>
                {!isComplete && (
                  <p className="text-[11px] text-[#6B7A99] mt-2">
                    Please answer all {QUESTIONS.length} questions to view your diagnostic recommendation.
                  </p>
                )}
              </div>
            </div>
          ) : (
            /* Results View */
            <div className="card-executive p-8 bg-white border-2 border-[#D4A238]/50 shadow-xl rounded-2xl space-y-6 text-center">
              <span className="badge-gold">Diagnostic Recommendation</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F1E2F]">
                Your Primary Need: <br />
                <span className="text-[#B8860B]">{result?.title}</span>
              </h2>

              <div className="bg-[#F8FBFF] p-4 rounded-xl border border-[#E2E8F0] text-xs text-[#53637C] max-w-xl mx-auto leading-relaxed">
                {result?.desc}
              </div>

              <div className="p-4 rounded-xl bg-[#0B1F3B] text-white text-xs max-w-xl mx-auto text-left space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#D4A238]">Recommended Next Step:</div>
                <p className="text-[#D1D7DF] leading-relaxed">
                  Book a 90-minute Growth &amp; Leadership Diagnostic with our practice lead to baseline current operations, map your constraint, and structure a custom 90-day Statement of Work.
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/book-diagnostic"
                  className="btn-gold text-xs uppercase tracking-wider py-3.5 px-6 rounded-lg font-bold flex items-center gap-2"
                >
                  <span>Book Diagnostic Session</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <button
                  onClick={() => {
                    setAnswers({});
                    setSubmitted(false);
                  }}
                  className="btn-navy-outline text-xs uppercase tracking-wider py-3.5 px-6 rounded-lg font-semibold flex items-center gap-2"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>Retake Assessment</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}

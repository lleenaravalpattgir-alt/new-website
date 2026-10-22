import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Users, CheckCircle2, ArrowRight, ShieldCheck, Clock, AlertTriangle, RefreshCw } from "lucide-react";
import { useState } from "react";
import { track } from "@/lib/track";

export const Route = createFileRoute("/resources/founder-dependency-diagnostic")({
  head: () => ({
    meta: [
      { title: "Founder Dependency Diagnostic | Rise Advisory" },
      {
        name: "description",
        content:
          "Calculate your operational Delegation Index across key business decisions and discover how to de-bottleneck the founder with Rise Advisory.",
      },
    ],
    links: [{ rel: "canonical", href: "https://riseadvisory.co/resources/founder-dependency-diagnostic" }],
  }),
  component: FounderDependencyPage,
});

const DECISIONS = [
  {
    id: "d1",
    title: "1. Customer Pricing & Discount Approvals",
    desc: "Can sales reps close deals with standard discount parameters without your personal sign-off?",
    options: [
      { text: "No—I personally review and approve every single discount or proposal.", score: 3 },
      { text: "Partially—clear rate card exists, but non-standard requests come to me.", score: 2 },
      { text: "Yes—sales team operates autonomously within a codified approval matrix.", score: 1 },
    ],
  },
  {
    id: "d2",
    title: "2. Financial Authorization & Vendor Payments",
    desc: "Who signs off on operational expenses and routine vendor invoices?",
    options: [
      { text: "I approve every invoice, check, and bank transfer personally.", score: 3 },
      { text: "Managers approve up to ₹25,000; I sign off on larger expenses.", score: 2 },
      { text: "Department heads hold annual budgets and authorized payment thresholds.", score: 1 },
    ],
  },
  {
    id: "d3",
    title: "3. Client Escalations & Quality Issues",
    desc: "What happens when an important client is unhappy with delivery or fulfillment?",
    options: [
      { text: "The client immediately calls my personal mobile number.", score: 3 },
      { text: "Account manager handles first, but I step in on 50%+ of complaints.", score: 2 },
      { text: "Documented escalation SOP with dedicated client success manager.", score: 1 },
    ],
  },
  {
    id: "d4",
    title: "4. Recruitment & Final Hiring Sign-Off",
    desc: "How involved are you in hiring non-executive staff?",
    options: [
      { text: "I conduct the final interview and salary negotiation for every single hire.", score: 3 },
      { text: "I interview mid-level managers, while leads hire junior staff.", score: 2 },
      { text: "Structured hiring rubrics allow team leads to hire autonomously.", score: 1 },
    ],
  },
  {
    id: "d5",
    title: "5. Operational Standard Operating Procedures (SOPs)",
    desc: "If you took a 3-week vacation with zero internet access, what would happen?",
    options: [
      { text: "Operations would grind to a halt within 48 to 72 hours.", score: 3 },
      { text: "Basic tasks would continue, but key decisions and growth would freeze.", score: 2 },
      { text: "The business would run smoothly; documented SOPs guide daily execution.", score: 1 },
    ],
  },
];

function FounderDependencyPage() {
  const [selections, setSelections] = useState<Record<string, number>>({
    d1: 3,
    d2: 3,
    d3: 2,
    d4: 2,
    d5: 3,
  });

  const totalPoints = Object.values(selections).reduce((a, b) => a + b, 0);
  const maxPoints = DECISIONS.length * 3; // 15
  const minPoints = DECISIONS.length * 1; // 5

  // Delegation Index: 100% is perfectly delegated, 0% is completely founder bottlenecked
  const delegationIndex = Math.round(((maxPoints - totalPoints) / (maxPoints - minPoints)) * 100);

  const getDependencyDiagnosis = (index: number) => {
    if (index >= 75) {
      return {
        level: "Autonomous Scale",
        color: "text-[#10B981]",
        hoursTrapped: "5–10 hrs/week",
        desc: "Your organization has mature delegation and operational systems. Focus on senior leadership development and quarterly governance.",
      };
    }
    if (index >= 40) {
      return {
        level: "Moderate Founder Drag",
        color: "text-[#D4A238]",
        hoursTrapped: "15–25 hrs/week",
        desc: "Growth is slowing because strategic decisions require founder validation. Immediate priority is codifying SOPs and establishing approval thresholds.",
      };
    }
    return {
      level: "Severe Founder Bottleneck",
      color: "text-[#EF4444]",
      hoursTrapped: "30+ hrs/week",
      desc: "You are the single point of failure in daily operations. Company valuation and scale are capped because you are firefighting routine tasks instead of steering strategy.",
    };
  };

  const diagnosis = getDependencyDiagnosis(delegationIndex);

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
              <span className="text-[#D1D7DF]">Operations &amp; Org Design</span>
            </div>

            <span className="badge-navy">Founder Freedom &amp; Scale</span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              Founder Dependency <br />
              <span className="text-[#D4A238]">Diagnostic.</span>
            </h1>
            <p className="text-base text-[#D1D7DF] leading-relaxed">
              Calculate your company's Delegation Index. Discover how many weekly hours of founder firefighting can be reclaimed through documented SOPs and a Fractional COO.
            </p>
          </div>
        </div>
      </section>

      {/* Main Diagnostic Area */}
      <section className="bg-[#F8FBFF] py-20 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-12 items-start">
            {/* Decision Questions */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm space-y-6">
                <div className="border-b border-[#E2E8F0] pb-4">
                  <h2 className="text-lg font-bold text-[#0F1E2F]">Audit Recurring Operational Decisions</h2>
                  <p className="text-xs text-[#53637C] mt-1">
                    Select the option that matches your current day-to-day involvement:
                  </p>
                </div>

                <div className="space-y-6">
                  {DECISIONS.map((dec) => (
                    <div key={dec.id} className="p-4 rounded-xl border border-[#E2E8F0] bg-[#F8FBFF] space-y-2.5">
                      <h3 className="text-sm font-bold text-[#0F1E2F]">{dec.title}</h3>
                      <p className="text-xs text-[#53637C]">{dec.desc}</p>

                      <div className="space-y-2 pt-2">
                        {dec.options.map((opt, optIdx) => {
                          const isSelected = selections[dec.id] === opt.score;
                          return (
                            <button
                              key={optIdx}
                              onClick={() => {
                                setSelections((prev) => ({ ...prev, [dec.id]: opt.score }));
                                track("founder_diagnostic_update", { decision: dec.id, score: opt.score });
                              }}
                              className={`w-full text-left p-3 rounded-lg border text-xs transition-all cursor-pointer flex items-start gap-2.5 ${
                                isSelected
                                  ? "bg-[#0B1F3B] text-[#D4A238] border-[#D4A238] font-bold shadow-xs"
                                  : "bg-white text-[#53637C] border-[#E2E8F0] hover:bg-[#EEF4FA] hover:text-[#0F1E2F]"
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
                </div>
              </div>
            </div>

            {/* Scorecard Output Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="card-executive p-6 sm:p-8 bg-white border border-[#E2E8F0] shadow-xl rounded-2xl space-y-5 text-center">
                <span className="badge-gold text-[10px]">Delegation Scorecard</span>

                <div className="p-6 rounded-xl bg-[#0B1F3B] text-white">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#D4A238]">
                    Your Delegation Index
                  </div>
                  <div className="text-5xl font-extrabold text-[#D4A238] my-2">{delegationIndex}%</div>
                  <div className={`text-sm font-bold ${diagnosis.color}`}>{diagnosis.level}</div>
                  <div className="text-xs text-[#D1D7DF]/85 mt-2 leading-relaxed">{diagnosis.desc}</div>
                </div>

                <div className="text-xs text-left text-[#53637C] space-y-3 pt-2">
                  <div className="flex justify-between py-2 border-b border-[#E2E8F0]">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-[#B8860B]" />
                      <span>Estimated Firefighting:</span>
                    </span>
                    <strong className="text-[#0F1E2F]">{diagnosis.hoursTrapped}</strong>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#E2E8F0]">
                    <span>Recommended Lead:</span>
                    <strong className="text-[#B8860B]">Fractional COO &amp; SOP Architect</strong>
                  </div>
                </div>

                <div className="bg-[#F8FBFF] p-4 rounded-xl border border-[#E2E8F0] text-left text-xs space-y-2">
                  <div className="font-bold text-[#0F1E2F] text-[11px] uppercase tracking-wider">
                    First 90-Day De-bottlenecking Plan:
                  </div>
                  <ul className="space-y-1.5 text-[#53637C]">
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981] shrink-0 mt-0.5" />
                      <span>Codify pricing matrix &amp; transfer discount rights to sales lead</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981] shrink-0 mt-0.5" />
                      <span>Institute manager expense thresholds up to ₹50,000</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981] shrink-0 mt-0.5" />
                      <span>Document core fulfillment SOPs to remove client escalation calls</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#E2E8F0]">
                  <Link
                    to="/book-diagnostic"
                    className="btn-gold w-full text-center text-xs uppercase tracking-wider py-3.5 rounded-lg font-bold block shadow-gold"
                  >
                    Engage Fractional COO
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

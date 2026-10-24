import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Compass, CheckCircle2, ArrowRight, ShieldCheck, Download, AlertTriangle, Layers } from "lucide-react";
import { useState } from "react";
import { track } from "@/lib/track";

export const Route = createFileRoute("/resources/growth-constraint-map")({
  head: () => ({
    meta: [
      { title: "90-Day Growth Constraint Map | Rise Advisory" },
      {
        name: "description",
        content:
          "Audit operational bottlenecks, evaluate constraint severity across Sales, Finance, Tech, and Operations, and generate a customized 90-day execution sprint roadmap.",
      },
      { property: "og:url", content: "https://ryzeadvisory.co/resources/growth-constraint-map" },
    ],
    links: [{ rel: "canonical", href: "https://ryzeadvisory.co/resources/growth-constraint-map" }],
  }),
  component: ConstraintMapPage,
});

const DIMENSIONS = [
  {
    id: "revenue",
    name: "Revenue & GTM Pipeline",
    symptoms: "Stalled organic growth, high CAC, vanity agency metrics, lack of outbound qualification.",
    role: "Fractional CMO / CRO",
  },
  {
    id: "finance",
    name: "Cash Flow & Capital Readiness",
    symptoms: "Unpredictable cash flow, late MIS reports, trapped working capital, lack of investor data room.",
    role: "Fractional CFO",
  },
  {
    id: "tech",
    name: "Technology Architecture & AI",
    symptoms: "Dev agency delays, buggy software releases, mounting tech debt, unautomated manual workflows.",
    role: "Fractional CTO / CAIO",
  },
  {
    id: "people",
    name: "Operations, SOPs & Delegation",
    symptoms: "Founder trapped in daily firefighting, lack of documented SOPs, handoff chaos between teams.",
    role: "Fractional COO / CHRO",
  },
];

const SEVERITIES = [
  { value: 1, label: "Low", color: "text-[#10B981]", desc: "Functioning smoothly" },
  { value: 2, label: "Moderate", color: "text-[#D4A238]", desc: "Noticeable drag on growth" },
  { value: 3, label: "Critical", color: "text-[#EF4444]", desc: "Severe bottleneck stopping next stage" },
];

function ConstraintMapPage() {
  const [severities, setSeverities] = useState<Record<string, number>>({
    revenue: 2,
    finance: 2,
    tech: 1,
    people: 3,
  });

  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleSeverityChange = (id: string, val: number) => {
    setSeverities((prev) => ({ ...prev, [id]: val }));
  };

  const criticalConstraints = DIMENSIONS.filter((d) => severities[d.id] === 3);

  const handleDownloadFramework = () => {
    const summary = `RISE ADVISORY — 90-DAY GROWTH CONSTRAINT MAP\n==============================================\nDate: ${new Date().toLocaleDateString()}\nFramework: Rise Delivery Method (Diagnose Stage)\n\nAudit Results:\n` +
      DIMENSIONS.map(
        (d) =>
          `- ${d.name}: Level ${severities[d.id]}/3 (${severities[d.id] === 3 ? "CRITICAL BOTTLENECK" : severities[d.id] === 2 ? "Moderate Drag" : "Low Impact"})\n  Recommended Lead: ${d.role}\n`
      ).join("\n") +
      `\nNext Step: Schedule a 90-Minute Growth & Leadership Diagnostic at https://riseadvisory.co/book-diagnostic\n\n© ${new Date().getFullYear()} Rise Advisory. All rights reserved.\n`;

    const blob = new Blob([summary], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Rise_Advisory_90_Day_Constraint_Map.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
    track("constraint_map_downloaded", { severities });
  };

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
              <span className="text-[#D1D7DF]">Strategic Framework</span>
            </div>

            <span className="badge-navy">Stage 1: Diagnose</span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              90-Day Growth <br />
              <span className="text-[#D4A238]">Constraint Map.</span>
            </h1>
            <p className="text-base text-[#D1D7DF] leading-relaxed">
              Identify where revenue leaks, cash drag, tech debt, or founder bottlenecks are throttling your next stage. Set severity scores to map your 90-day sprint priorities.
            </p>
          </div>
        </div>
      </section>

      {/* Main Mapping Engine */}
      <section className="bg-[#F8FBFF] py-20 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-12 items-start">
            {/* Severity Controls */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm space-y-6">
                <div className="border-b border-[#E2E8F0] pb-4">
                  <h2 className="text-lg font-bold text-[#0F1E2F]">Audit Core Growth Dimensions</h2>
                  <p className="text-xs text-[#53637C] mt-1">
                    Rate the current operational friction in your company across each critical dimension:
                  </p>
                </div>

                <div className="space-y-6">
                  {DIMENSIONS.map((dim) => {
                    const currentVal = severities[dim.id] || 1;
                    return (
                      <div key={dim.id} className="p-4 rounded-xl border border-[#E2E8F0] bg-[#F8FBFF] space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-bold text-[#0F1E2F]">{dim.name}</h3>
                          <span className="text-[11px] font-semibold text-[#B8860B]">{dim.role}</span>
                        </div>
                        <p className="text-xs text-[#53637C]">{dim.symptoms}</p>

                        <div className="grid grid-cols-3 gap-2 pt-2">
                          {SEVERITIES.map((sev) => {
                            const isSelected = currentVal === sev.value;
                            return (
                              <button
                                key={sev.value}
                                onClick={() => handleSeverityChange(dim.id, sev.value)}
                                className={`p-2 rounded-lg text-center border text-xs font-bold transition-all cursor-pointer ${
                                  isSelected
                                    ? "bg-[#0B1F3B] text-[#D4A238] border-[#D4A238] shadow-xs"
                                    : "bg-white text-[#53637C] border-[#E2E8F0] hover:bg-[#EEF4FA]"
                                }`}
                              >
                                <div>{sev.label}</div>
                                <div className="text-[9px] font-normal text-[#6B7A99] truncate">{sev.desc}</div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Generated 90-Day Output Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="card-executive p-6 sm:p-8 bg-white border border-[#E2E8F0] shadow-xl rounded-2xl space-y-5">
                <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
                  <span className="badge-gold text-[10px]">90-Day Sprint Priority Map</span>
                  <span className="text-xs font-mono text-[#6B7A99]">Active Baseline</span>
                </div>

                {criticalConstraints.length > 0 ? (
                  <div className="bg-[#EF4444]/10 border border-[#EF4444]/20 rounded-xl p-4 text-xs text-[#0F1E2F]">
                    <div className="flex items-center gap-2 font-bold text-[#EF4444] mb-1">
                      <AlertTriangle className="h-4 w-4" />
                      <span>{criticalConstraints.length} Critical Bottlenecks Identified</span>
                    </div>
                    <p className="text-xs text-[#53637C]">
                      Your first 90-day sprint must prioritize solving these primary friction points before expanding headcount:
                    </p>
                    <ul className="mt-2 space-y-1 text-[#0F1E2F] font-semibold">
                      {criticalConstraints.map((c) => (
                        <li key={c.id}>&bull; {c.name} ({c.role})</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="bg-[#10B981]/10 border border-[#10B981]/20 rounded-xl p-4 text-xs text-[#10B981]">
                    <div className="flex items-center gap-2 font-bold">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Operations Balanced</span>
                    </div>
                    <p className="mt-1 text-xs text-[#53637C]">
                      No critical red flags. Focus on incremental optimization and selective strategic advisory.
                    </p>
                  </div>
                )}

                <div className="space-y-3 pt-2 text-xs">
                  <div className="font-bold text-[#0F1E2F] uppercase tracking-wider text-[11px]">
                    Recommended Engagement Sequence:
                  </div>
                  <div className="space-y-2">
                    <div className="bg-[#F8FBFF] p-3 rounded-lg border border-[#E2E8F0]">
                      <div className="font-bold text-[#0F1E2F]">Week 1–2: Diagnose &amp; Baseline</div>
                      <div className="text-[#53637C] text-[11px] mt-0.5">Validate audit metrics with the founder and draft SOW.</div>
                    </div>
                    <div className="bg-[#F8FBFF] p-3 rounded-lg border border-[#E2E8F0]">
                      <div className="font-bold text-[#0F1E2F]">Week 3–8: Sprint Implementation</div>
                      <div className="text-[#53637C] text-[11px] mt-0.5">Embed fractional CXO lead to remove core bottlenecks.</div>
                    </div>
                    <div className="bg-[#F8FBFF] p-3 rounded-lg border border-[#E2E8F0]">
                      <div className="font-bold text-[#0F1E2F]">Week 9–12: Scorecard Review &amp; Handover</div>
                      <div className="text-[#53637C] text-[11px] mt-0.5">Hand over documented playbooks to your internal team.</div>
                    </div>
                  </div>
                </div>

                {downloadSuccess && (
                  <div className="p-2.5 rounded-lg bg-[#10B981]/15 text-[#10B981] text-xs font-bold text-center">
                    &check; Constraint Map downloaded successfully!
                  </div>
                )}

                <div className="pt-4 border-t border-[#E2E8F0] space-y-3">
                  <button
                    onClick={handleDownloadFramework}
                    className="btn-gold w-full text-center text-xs uppercase tracking-wider py-3.5 rounded-lg font-bold flex items-center justify-center gap-2 cursor-pointer shadow-gold"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download Constraint Map Report</span>
                  </button>

                  <Link
                    to="/book-diagnostic"
                    className="btn-navy-outline w-full text-center text-xs uppercase tracking-wider py-3 rounded-lg font-semibold block"
                  >
                    Schedule Diagnostic Review
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

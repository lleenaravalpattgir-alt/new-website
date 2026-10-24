import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { FileText, Download, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/resources/templates")({
  head: () => ({
    meta: [
      { title: "Downloadable Business Templates | Rise Advisory" },
      { name: "description", content: "Download practical business planning templates, 90-day constraint maps, and capital readiness checklists from Rise Advisory." },
      { property: "og:title", content: "Downloadable Business Templates | Rise Advisory" },
      { property: "og:url", content: "https://ryzeadvisory.co/resources/templates" },
    ],
    links: [{ rel: "canonical", href: "https://ryzeadvisory.co/resources/templates" }],
  }),
  component: TemplatesPage,
});

const templates = [
  {
    id: "constraint-map",
    title: "90-Day Growth Constraint Map Template",
    category: "Strategic Planning",
    format: "PDF & Editable Framework (.xlsx)",
    desc: "A proven template to audit current operational bottlenecks, evaluate constraint severity across Sales, Finance, Tech, and People, and lock 3 core sprint milestones.",
    keyFields: ["Constraint Category", "Root Cause Analysis", "Current Revenue Drag", "90-Day SOW Owner", "Weekly Verification Checkpoint"],
    downloadName: "Rise_Advisory_90_Day_Constraint_Map.pdf"
  },
  {
    id: "data-room-checklist",
    title: "Investor Data Room & Capital Readiness Checklist",
    category: "Finance & Capital",
    format: "Due Diligence Checklist (.xlsx)",
    desc: "42-point structured audit checklist required by institutional VCs, private equity, and commercial banks prior to debt syndication or funding.",
    keyFields: ["Historical Audited P&L", "Cap Table & ESOP Pool", "Customer Concentration Matrix", "Unit Economics & CAC Attribution", "Statutory Compliance Disclosures"],
    downloadName: "Rise_Advisory_Capital_Readiness_Checklist.xlsx"
  },
  {
    id: "founder-dependency-audit",
    title: "Founder Dependency & Delegation Scorecard",
    category: "Operations & Org Design",
    format: "Self-Assessment (.pdf)",
    desc: "Calculate your operational Delegation Index across 20 key business decisions. Identify which responsibilities to immediately transfer to fractional or middle managers.",
    keyFields: ["Daily Decision Log", "Financial Authorization Thresholds", "Client Escalation Matrix", "SOP Coverage Percentage", "Target Delegation Milestone"],
    downloadName: "Rise_Advisory_Founder_Dependency_Scorecard.pdf"
  },
  {
    id: "ai-readiness-rubric",
    title: "SME & Startup AI Automation Readiness Rubric",
    category: "Technology & AI",
    format: "Evaluation Scorecard (.pdf)",
    desc: "Audit your internal data security, software API readiness, and score top operational workflows for pragmatic, low-hallucination AI deployment.",
    keyFields: ["Data Privacy Policy Check", "Manual Repetitive Hour Audit", "API Integrability", "Expected ROI & Time-Savings", "Model Selection Rubric"],
    downloadName: "Rise_Advisory_AI_Readiness_Scorecard.pdf"
  }
];

function TemplatesPage() {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleDownload = (templateTitle: string, filename: string) => {
    const content = `RISE ADVISORY — EXECUTIVE TEMPLATE\n=================================\n\nAsset: ${templateTitle}\nIssued by: Rise Advisory (Ahmedabad, India)\nFounder: Leena Raval\nPortal: Rise Advisory Fractional Leadership\n\nThis executive business template is provided under the Rise Delivery Method framework.\nTo schedule a 90-Minute Growth & Leadership Diagnostic, please visit:\nhttps://riseadvisory.co/book-diagnostic\n\n© ${new Date().getFullYear()} Rise Advisory. All rights reserved.\n`;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadSuccess(templateTitle);
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

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
              <span>Downloadable Offline Assets</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight">
              Executive Business Templates <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A238] via-[#F3E5AB] to-[#D4A238]">
                &amp; Operational Scorecards.
              </span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#EEF4FA]/80 leading-relaxed">
              Equip your leadership team with the exact frameworks used by Rise Fractional CXOs to diagnose constraints, structure data rooms, and eliminate founder bottlenecks.
            </p>
          </div>
        </div>
      </section>

      {downloadSuccess && (
        <div className="bg-[#10B981]/15 border-b border-[#10B981]/30 py-3 text-center text-xs text-[#10B981] font-bold">
          &check; Download initiated for: {downloadSuccess}
        </div>
      )}

      <section className="bg-[#F8FBFF] py-20 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-8">
          <div className="grid gap-8 md:grid-cols-2">
            {templates.map((tpl) => (
              <div key={tpl.id} className="service-card p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="badge-gold text-[10px]">{tpl.category}</span>
                    <span className="text-[#53637C] font-mono text-[11px]">{tpl.format}</span>
                  </div>

                  <h2 className="text-xl font-bold text-[#0F1E2F] mb-2">{tpl.title}</h2>
                  <p className="text-xs sm:text-sm text-[#53637C] leading-relaxed mb-4">{tpl.desc}</p>

                  <div className="bg-[#F8FBFF] p-4 rounded-xl border border-[#E2E8F0] text-xs space-y-1.5 my-4">
                    <div className="font-bold text-[#B8860B] uppercase text-[10px] tracking-wider">Key Framework Components:</div>
                    <ul className="space-y-1 text-[#53637C] text-[11px]">
                      {tpl.keyFields.map((field, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-1.5">
                          <CheckCircle2 className="h-3 w-3 text-[#10B981] shrink-0" />
                          <span>{field}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
                  <button
                    onClick={() => handleDownload(tpl.title, tpl.downloadName)}
                    className="btn-gold text-xs uppercase tracking-wider py-3 px-5 rounded-lg font-bold flex items-center gap-2 cursor-pointer"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download Template</span>
                  </button>

                  <Link to="/book-diagnostic" className="text-xs text-[#53637C] hover:text-[#B8860B] font-semibold">
                    Request Review →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

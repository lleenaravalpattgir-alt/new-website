import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { BusinessFundingLoanSection } from "@/components/site/BusinessFundingLoanCard";
import { CheckSquare, CheckCircle2, ArrowRight, ShieldCheck, Download, Filter, FileText } from "lucide-react";
import { useState } from "react";
import { track } from "@/lib/track";

export const Route = createFileRoute("/resources/capital-readiness-checklist")({
  head: () => ({
    meta: [
      { title: "Capital-Readiness Checklist | Rise Advisory" },
      {
        name: "description",
        content:
          "Audit your company's investor diligence readiness across accounting MIS, cap table, statutory compliance, and commercial contracts.",
      },
      { property: "og:url", content: "https://ryzeadvisory.co/resources/capital-readiness-checklist" },
    ],
    links: [{ rel: "canonical", href: "https://ryzeadvisory.co/resources/capital-readiness-checklist" }],
  }),
  component: CapitalReadinessPage,
});

interface ChecklistItem {
  id: string;
  category: string;
  title: string;
  importance: "Mandatory" | "Highly Recommended" | "Standard";
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  // Financial & MIS
  { id: "c1", category: "Financial & MIS", title: "Last 3 years audited financial statements with unqualified notes", importance: "Mandatory" },
  { id: "c2", category: "Financial & MIS", title: "Monthly Management Information System (MIS) reports for past 12 months", importance: "Mandatory" },
  { id: "c3", category: "Financial & MIS", title: "Rolling 13-week cash flow model and working capital forecast", importance: "Mandatory" },
  { id: "c4", category: "Financial & MIS", title: "SKU-level and customer-level contribution margin breakdown", importance: "Highly Recommended" },
  { id: "c5", category: "Financial & MIS", title: "Documented 3-year integrated financial model (P&L, Balance Sheet, Cash Flow)", importance: "Highly Recommended" },
  { id: "c6", category: "Financial & MIS", title: "Aged debtor schedule (DSO analysis) and creditor aging report", importance: "Standard" },

  // Corporate & Cap Table
  { id: "c7", category: "Corporate & Cap Table", title: "Updated capitalization table with fully diluted shareholding & ESOP pool", importance: "Mandatory" },
  { id: "c8", category: "Corporate & Cap Table", title: "Certificate of Incorporation, MOA, and AOA as amended to date", importance: "Mandatory" },
  { id: "c9", category: "Corporate & Cap Table", title: "All previous shareholder agreements (SHA) and investor rights agreements", importance: "Mandatory" },
  { id: "c10", category: "Corporate & Cap Table", title: "Board and shareholder resolutions approving borrowing limits and equity creation", importance: "Standard" },

  // Statutory & Compliance
  { id: "c11", category: "Statutory & Legal", title: "GST, TDS, and Advance Tax statutory filing challans & returns for 24 months", importance: "Mandatory" },
  { id: "c12", category: "Statutory & Legal", title: "PF, ESI, Professional Tax, and labor law compliance certificates", importance: "Mandatory" },
  { id: "c13", category: "Statutory & Legal", title: "POSH committee constitution and annual filing records", importance: "Mandatory" },
  { id: "c14", category: "Statutory & Legal", title: "Clean certificate of no pending litigation, arbitration, or tax notices", importance: "Highly Recommended" },

  // Commercial & IP
  { id: "c15", category: "Commercial & IP", title: "Top 10 customer contracts and Master Services Agreements (MSAs)", importance: "Mandatory" },
  { id: "c16", category: "Commercial & IP", title: "Customer concentration matrix (revealing revenue % from top 5 accounts)", importance: "Highly Recommended" },
  { id: "c17", category: "Commercial & IP", title: "Trademark, copyright, and patent registration certificates", importance: "Mandatory" },
  { id: "c18", category: "Commercial & IP", title: "Employee and contractor IP assignment & confidentiality agreements", importance: "Mandatory" },
];

function CapitalReadinessPage() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    c1: true,
    c2: true,
    c7: true,
    c8: true,
    c11: true,
  });

  const [activeCategory, setActiveCategory] = useState("All");

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const categories = ["All", ...Array.from(new Set(CHECKLIST_ITEMS.map((item) => item.category)))];

  const filteredItems = activeCategory === "All"
    ? CHECKLIST_ITEMS
    : CHECKLIST_ITEMS.filter((item) => item.category === activeCategory);

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const scorePct = Math.round((completedCount / CHECKLIST_ITEMS.length) * 100);

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
              <span className="text-[#D1D7DF]">Due Diligence Toolkit</span>
            </div>

            <span className="badge-navy">Finance &amp; Capital Readiness</span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              Investor Data Room &amp; <br />
              <span className="text-[#D4A238]">Capital-Readiness Checklist.</span>
            </h1>
            <p className="text-base text-[#D1D7DF] leading-relaxed">
              Before presenting to VCs, private equity investors, or commercial banks for debt syndication, audit your company's data room across financial, corporate, statutory, and commercial records.
            </p>
          </div>
        </div>
      </section>

      {/* Checklist Interactive Area */}
      <section className="bg-[#F8FBFF] py-20 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-12 items-start">
            {/* Checklist List */}
            <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm space-y-6">
              {/* Filter Tabs */}
              <div className="flex flex-wrap items-center gap-2 border-b border-[#E2E8F0] pb-4">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeCategory === cat
                        ? "bg-[#0B1F3B] text-[#D4A238]"
                        : "bg-[#F8FBFF] text-[#53637C] hover:bg-[#EEF4FA] border border-[#E2E8F0]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Items */}
              <div className="space-y-3">
                {filteredItems.map((item) => {
                  const isChecked = !!checkedItems[item.id];
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleCheck(item.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                        isChecked
                          ? "bg-[#10B981]/5 border-[#10B981]/30"
                          : "bg-white border-[#E2E8F0] hover:border-[#D4A238]/40"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="h-4 w-4 rounded accent-[#D4A238] mt-0.5 cursor-pointer"
                      />
                      <div className="flex-1 text-xs">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                              item.importance === "Mandatory"
                                ? "bg-[#EF4444]/10 text-[#EF4444]"
                                : item.importance === "Highly Recommended"
                                ? "bg-[#D4A238]/15 text-[#B8860B]"
                                : "bg-[#EEF4FA] text-[#53637C]"
                            }`}
                          >
                            {item.importance}
                          </span>
                          <span className="text-[10px] text-[#6B7A99] font-medium">{item.category}</span>
                        </div>
                        <div className={`font-semibold ${isChecked ? "text-[#0F1E2F]" : "text-[#53637C]"}`}>
                          {item.title}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Scorecard Summary Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="card-executive p-6 bg-white border border-[#E2E8F0] shadow-xl rounded-2xl space-y-5 text-center">
                <span className="badge-gold text-[10px]">Audit Scorecard</span>

                <div className="p-5 rounded-xl bg-[#0B1F3B] text-white">
                  <div className="text-4xl font-extrabold text-[#D4A238]">{scorePct}%</div>
                  <div className="text-xs font-semibold text-[#D1D7DF] mt-1">Data Room Readiness Score</div>
                  <div className="text-[11px] text-[#A7B3CB] mt-1">
                    {completedCount} of {CHECKLIST_ITEMS.length} verified items ready
                  </div>
                </div>

                <div className="text-xs text-left text-[#53637C] space-y-2">
                  <div className="flex justify-between py-1 border-b border-[#E2E8F0]">
                    <span>Mandatory Items:</span>
                    <span className="font-bold text-[#0F1E2F]">
                      {CHECKLIST_ITEMS.filter((i) => i.importance === "Mandatory" && checkedItems[i.id]).length} /{" "}
                      {CHECKLIST_ITEMS.filter((i) => i.importance === "Mandatory").length}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#E2E8F0]">
                    <span>Status:</span>
                    <span className={`font-bold ${scorePct >= 75 ? "text-[#10B981]" : "text-[#D4A238]"}`}>
                      {scorePct >= 80 ? "Diligence Ready" : scorePct >= 50 ? "Work-in-Progress" : "Critical Gaps"}
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    to="/book-diagnostic"
                    className="btn-gold w-full text-center text-xs uppercase tracking-wider py-3 rounded-lg font-bold block shadow-gold"
                  >
                    Request CFO Data Room Audit
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integrated Capital Advisory & Business Loans Section */}
      <BusinessFundingLoanSection
        title="Ready to Apply for Debt, Subsidies or Equity Capital?"
        subtitle="Once your data room and financials are in order, explore our direct loan consultation for CGTMSE up to ₹5 Cr, Gujarat Industrial Policy subsidies, or seed grants."
      />
    </SiteLayout>
  );
}

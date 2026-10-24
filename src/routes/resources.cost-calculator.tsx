import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Calculator, CheckCircle2, ArrowRight, ShieldCheck, DollarSign, TrendingDown, Info } from "lucide-react";
import { useState } from "react";
import { track } from "@/lib/track";

export const Route = createFileRoute("/resources/cost-calculator")({
  head: () => ({
    meta: [
      { title: "Fractional vs Full-Time Cost Calculator | Rise Advisory" },
      {
        name: "description",
        content:
          "Calculate and compare the all-in cost of hiring full-time C-suite executives versus engaging fractional CXOs with Rise Advisory.",
      },
      { property: "og:url", content: "https://ryzeadvisory.co/resources/cost-calculator" },
    ],
    links: [{ rel: "canonical", href: "https://ryzeadvisory.co/resources/cost-calculator" }],
  }),
  component: CostCalculatorPage,
});

const ROLES = [
  { code: "CFO", title: "Chief Financial Officer", avgSalaryLakhs: 55, defaultRetainerLakhs: 1.5 },
  { code: "CMO", title: "Chief Marketing Officer", avgSalaryLakhs: 50, defaultRetainerLakhs: 1.4 },
  { code: "CTO", title: "Chief Technology Officer", avgSalaryLakhs: 60, defaultRetainerLakhs: 1.6 },
  { code: "COO", title: "Chief Operating Officer", avgSalaryLakhs: 48, defaultRetainerLakhs: 1.35 },
  { code: "CRO", title: "Chief Revenue Officer", avgSalaryLakhs: 55, defaultRetainerLakhs: 1.5 },
  { code: "CHRO", title: "Chief Human Resources Officer", avgSalaryLakhs: 42, defaultRetainerLakhs: 1.2 },
];

function CostCalculatorPage() {
  const [selectedRoleCode, setSelectedRoleCode] = useState("CFO");
  const [customFullTimeSalary, setCustomFullTimeSalary] = useState(55); // in Lakhs/year
  const [recruiterFeePct, setRecruiterFeePct] = useState(20); // 20%
  const [benefitsBonusPct, setBenefitsBonusPct] = useState(25); // 25%
  const [equityGrantLakhs, setEquityGrantLakhs] = useState(15); // in Lakhs value
  const [fractionalMonths, setFractionalMonths] = useState(12);
  const [monthlyRetainerLakhs, setMonthlyRetainerLakhs] = useState(1.5);

  const selectedRole = ROLES.find((r) => r.code === selectedRoleCode) || ROLES[0];

  const handleRoleChange = (code: string) => {
    const role = ROLES.find((r) => r.code === code);
    if (role) {
      setSelectedRoleCode(code);
      setCustomFullTimeSalary(role.avgSalaryLakhs);
      setMonthlyRetainerLakhs(role.defaultRetainerLakhs);
    }
  };

  // Calculations
  const recruiterCost = (customFullTimeSalary * recruiterFeePct) / 100;
  const benefitsCost = (customFullTimeSalary * benefitsBonusPct) / 100;
  const totalFullTimeFirstYear = customFullTimeSalary + recruiterCost + benefitsCost + equityGrantLakhs;

  const totalFractionalFirstYear = monthlyRetainerLakhs * fractionalMonths;
  const estimatedSavingsLakhs = Math.max(0, totalFullTimeFirstYear - totalFractionalFirstYear);
  const savingsPercentage = Math.round((estimatedSavingsLakhs / totalFullTimeFirstYear) * 100);

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
              <span className="text-[#D1D7DF]">Interactive Calculator</span>
            </div>

            <span className="badge-navy">Executive Financial Modeling</span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              Fractional vs Full-Time <br />
              <span className="text-[#D4A238]">Executive Cost Calculator.</span>
            </h1>
            <p className="text-base text-[#D1D7DF] leading-relaxed">
              Compare the total cost of ownership (TCO) between full-time executive compensation and fractional CXO retainers. Transparent modeling based on Indian executive compensation benchmarks.
            </p>
          </div>
        </div>
      </section>

      {/* Main Calculator */}
      <section className="bg-[#F8FBFF] py-20 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            {/* Input Controls Column */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
                <h2 className="text-lg font-bold text-[#0F1E2F]">1. Select Leadership Role</h2>
                <span className="text-xs text-[#B8860B] font-semibold">Indian Market Averages</span>
              </div>

              {/* Role Selector Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {ROLES.map((r) => (
                  <button
                    key={r.code}
                    onClick={() => handleRoleChange(r.code)}
                    className={`p-2.5 rounded-xl text-center border transition-all cursor-pointer ${
                      selectedRoleCode === r.code
                        ? "bg-[#0B1F3B] text-[#D4A238] border-[#D4A238] font-bold shadow-xs"
                        : "bg-[#F8FBFF] text-[#0F1E2F] border-[#E2E8F0] hover:border-[#D4A238]/40"
                    }`}
                  >
                    <div className="text-sm font-bold">{r.code}</div>
                    <div className="text-[10px] text-[#6B7A99] truncate">{r.title.split(" ")[1]}</div>
                  </button>
                ))}
              </div>

              {/* Full-Time Cost Inputs */}
              <div className="pt-4 space-y-5">
                <h3 className="text-sm font-bold text-[#0F1E2F] uppercase tracking-wider text-[#B8860B]">
                  Full-Time Executive Assumptions
                </h3>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-[#0F1E2F] mb-1.5">
                    <span>Annual Base Salary:</span>
                    <span className="text-[#B8860B] font-bold font-mono">₹{customFullTimeSalary} Lakhs/year</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="120"
                    step="5"
                    value={customFullTimeSalary}
                    onChange={(e) => setCustomFullTimeSalary(Number(e.target.value))}
                    className="w-full accent-[#D4A238] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#6B7A99]">
                    <span>₹30L (Mid-level)</span>
                    <span>₹60L (Market avg)</span>
                    <span>₹120L+ (Tier-1)</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#0F1E2F] block mb-1">
                      Recruiter Search Fee (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="33"
                      value={recruiterFeePct}
                      onChange={(e) => setRecruiterFeePct(Number(e.target.value))}
                      className="w-full p-2.5 rounded-lg border border-[#E2E8F0] text-sm text-[#0F1E2F] bg-[#F8FBFF]"
                    />
                    <span className="text-[10px] text-[#6B7A99]">Typically 20% to 25%</span>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#0F1E2F] block mb-1">
                      Bonuses &amp; Benefits (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="50"
                      value={benefitsBonusPct}
                      onChange={(e) => setBenefitsBonusPct(Number(e.target.value))}
                      className="w-full p-2.5 rounded-lg border border-[#E2E8F0] text-sm text-[#0F1E2F] bg-[#F8FBFF]"
                    />
                    <span className="text-[10px] text-[#6B7A99]">Healthcare, perks, annual bonus</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-[#0F1E2F] mb-1.5">
                    <span>First-Year Equity Grant (ESOP Value):</span>
                    <span className="text-[#B8860B] font-bold font-mono">₹{equityGrantLakhs} Lakhs</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="40"
                    step="2"
                    value={equityGrantLakhs}
                    onChange={(e) => setEquityGrantLakhs(Number(e.target.value))}
                    className="w-full accent-[#D4A238] cursor-pointer"
                  />
                  <span className="text-[10px] text-[#6B7A99]">Equity dilution value retained by founders</span>
                </div>
              </div>

              {/* Fractional Inputs */}
              <div className="pt-4 border-t border-[#E2E8F0] space-y-4">
                <h3 className="text-sm font-bold text-[#0F1E2F] uppercase tracking-wider text-[#B8860B]">
                  Rise Fractional CXO Model
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#0F1E2F] block mb-1">
                      Monthly Retainer (₹ Lakhs)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0.75"
                      max="4.0"
                      value={monthlyRetainerLakhs}
                      onChange={(e) => setMonthlyRetainerLakhs(Number(e.target.value))}
                      className="w-full p-2.5 rounded-lg border border-[#E2E8F0] text-sm text-[#0F1E2F] bg-[#F8FBFF]"
                    />
                    <span className="text-[10px] text-[#6B7A99]">₹75,000 to ₹3.0L / month</span>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#0F1E2F] block mb-1">
                      Planned Engagement Duration
                    </label>
                    <select
                      value={fractionalMonths}
                      onChange={(e) => setFractionalMonths(Number(e.target.value))}
                      className="w-full p-2.5 rounded-lg border border-[#E2E8F0] text-sm text-[#0F1E2F] bg-[#F8FBFF]"
                    >
                      <option value={3}>3 Months (Sprint)</option>
                      <option value={6}>6 Months (Transformation)</option>
                      <option value={12}>12 Months (Full Year)</option>
                    </select>
                    <span className="text-[10px] text-[#6B7A99]">Flexible quarterly renewals</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Comparison Results Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="card-executive p-6 sm:p-8 bg-white border border-[#E2E8F0] shadow-xl rounded-2xl relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4 mb-5">
                  <span className="badge-gold text-[10px]">Comparative Analysis</span>
                  <span className="text-xs font-mono text-[#6B7A99]">{selectedRole.title}</span>
                </div>

                {/* Savings Callout */}
                <div className="bg-[#132F55] rounded-xl p-5 text-white mb-6 text-center relative overflow-hidden">
                  <div className="absolute inset-0 navy-diagonal-texture pointer-events-none" aria-hidden />
                  <div className="relative">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#D4A238]">
                      Estimated Annual Cost Savings
                    </span>
                    <div className="text-3xl sm:text-4xl font-extrabold text-[#D4A238] mt-1">
                      ₹{estimatedSavingsLakhs.toFixed(2)} Lakhs
                    </div>
                    <div className="text-xs text-[#D1D7DF] mt-1">
                      Approximately <strong className="text-white">{savingsPercentage}%</strong> lower cash outlay
                    </div>
                  </div>
                </div>

                {/* Breakdown Comparison Table */}
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-[#E2E8F0]">
                    <span className="text-[#53637C]">Full-Time Base Salary:</span>
                    <span className="font-semibold text-[#0F1E2F]">₹{customFullTimeSalary.toFixed(2)} L</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#E2E8F0]">
                    <span className="text-[#53637C]">Recruiter Headhunter Fee ({recruiterFeePct}%):</span>
                    <span className="font-semibold text-[#0F1E2F]">₹{recruiterCost.toFixed(2)} L</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#E2E8F0]">
                    <span className="text-[#53637C]">Benefits, Insurance &amp; Bonus:</span>
                    <span className="font-semibold text-[#0F1E2F]">₹{benefitsCost.toFixed(2)} L</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#E2E8F0]">
                    <span className="text-[#53637C]">First-Year Equity Dilution:</span>
                    <span className="font-semibold text-[#0F1E2F]">₹{equityGrantLakhs.toFixed(2)} L</span>
                  </div>
                  <div className="flex justify-between py-2 text-sm font-bold bg-[#F8FBFF] px-2 rounded">
                    <span className="text-[#0F1E2F]">Total Full-Time Year 1 Cost:</span>
                    <span className="text-[#EF4444]">₹{totalFullTimeFirstYear.toFixed(2)} L</span>
                  </div>

                  <div className="pt-2">
                    <div className="flex justify-between py-2 text-sm font-bold bg-[#D4A238]/10 px-2 rounded border border-[#D4A238]/30">
                      <span className="text-[#0F1E2F]">Rise Fractional Retainer ({fractionalMonths} mo):</span>
                      <span className="text-[#10B981]">₹{totalFractionalFirstYear.toFixed(2)} L</span>
                    </div>
                  </div>
                </div>

                {/* Model Disclaimer */}
                <div className="mt-6 pt-4 border-t border-[#E2E8F0] text-[11px] text-[#6B7A99] leading-relaxed flex items-start gap-2">
                  <Info className="h-4 w-4 text-[#B8860B] shrink-0 mt-0.5" />
                  <span>
                    Model assumptions: figures reflect standard Indian metro executive packages. Calculations do not guarantee exact commercial terms or specific transformation outcomes.
                  </span>
                </div>

                <div className="mt-6">
                  <Link
                    to="/book-diagnostic"
                    onClick={() => track("calculator_cta", { role: selectedRoleCode, savings: estimatedSavingsLakhs })}
                    className="btn-gold w-full text-center text-xs uppercase tracking-wider py-3.5 rounded-lg font-bold flex items-center justify-center gap-2"
                  >
                    <span>Book Diagnostic to Model Your C-Suite</span>
                    <ArrowRight className="h-4 w-4" />
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

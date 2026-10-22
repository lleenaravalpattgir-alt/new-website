import { useState } from "react";
import { Calculator, TrendingUp, Clock, DollarSign, ArrowUpRight, Zap, CheckCircle2 } from "lucide-react";
import { CTAButton } from "./CTAButton";

export function RoiCalculator() {
  const [teamSize, setTeamSize] = useState<number>(30);
  const [manualHours, setManualHours] = useState<number>(10);
  const [hourlyRate, setHourlyRate] = useState<number>(65);

  // Conservative 60% automation & error-reduction rate achieved by RYZE systems
  const automationFactor = 0.6;
  const annualHoursSaved = Math.round(teamSize * manualHours * 50 * automationFactor);
  const annualCostRecaptured = Math.round(annualHoursSaved * hourlyRate);
  const paybackDays = Math.max(21, Math.min(60, Math.round(45 * (20 / Math.max(teamSize, 10)))));

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary/30 via-background to-secondary/20 py-24" aria-labelledby="roi-calculator-heading">
      <div className="absolute inset-0 arrow-bg opacity-20 pointer-events-none" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            <Calculator className="h-3.5 w-3.5" />
            Interactive ROI Model
          </div>
          <h2 id="roi-calculator-heading" className="mt-4 text-balance text-4xl font-extrabold text-primary md:text-5xl">
            Calculate your <span className="text-accent">automation payback.</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Estimate how much payroll hours, operational drag, and lost pipeline your company recaptures by deploying RYZE autonomous systems and unified growth infrastructure.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-12 items-stretch">
          {/* Controls column */}
          <div className="rounded-2xl border border-border bg-card p-8 md:p-10 shadow-elegant lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-border pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Your Team &amp; Workflow Parameters</span>
                <span className="text-xs font-semibold text-accent">Live recalculation</span>
              </div>

              {/* Slider 1: Team Size */}
              <div className="mt-8">
                <div className="flex justify-between items-center">
                  <label htmlFor="team-size" className="text-sm font-bold text-primary">
                    Core Team Size (GTM, Ops, HR, Delivery)
                  </label>
                  <span className="font-display text-lg font-extrabold text-accent bg-accent/10 px-3 py-1 rounded-md">
                    {teamSize} people
                  </span>
                </div>
                <input
                  id="team-size"
                  type="range"
                  min="5"
                  max="150"
                  step="5"
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  className="mt-3 w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-[#C59E3F]"
                />
                <div className="mt-1 flex justify-between text-[11px] text-muted-foreground font-medium">
                  <span>5 members</span>
                  <span>75 members</span>
                  <span>150+ members</span>
                </div>
              </div>

              {/* Slider 2: Weekly Manual Hours */}
              <div className="mt-8">
                <div className="flex justify-between items-center">
                  <label htmlFor="manual-hours" className="text-sm font-bold text-primary">
                    Hours spent weekly on repetitive tasks / person
                  </label>
                  <span className="font-display text-lg font-extrabold text-accent bg-accent/10 px-3 py-1 rounded-md">
                    {manualHours} hrs/wk
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Prospecting, manual list-building, reporting, review cycles, candidate screening.
                </p>
                <input
                  id="manual-hours"
                  type="range"
                  min="4"
                  max="25"
                  step="1"
                  value={manualHours}
                  onChange={(e) => setManualHours(Number(e.target.value))}
                  className="mt-3 w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-[#C59E3F]"
                />
                <div className="mt-1 flex justify-between text-[11px] text-muted-foreground font-medium">
                  <span>4 hrs (Light)</span>
                  <span>12 hrs (Average B2B)</span>
                  <span>25 hrs (Heavy drag)</span>
                </div>
              </div>

              {/* Slider 3: Loaded Hourly Rate */}
              <div className="mt-8">
                <div className="flex justify-between items-center">
                  <label htmlFor="hourly-rate" className="text-sm font-bold text-primary">
                    Blended Hourly Rate (Fully Loaded)
                  </label>
                  <span className="font-display text-lg font-extrabold text-accent bg-accent/10 px-3 py-1 rounded-md">
                    ${hourlyRate}/hr
                  </span>
                </div>
                <input
                  id="hourly-rate"
                  type="range"
                  min="30"
                  max="150"
                  step="5"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="mt-3 w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-[#C59E3F]"
                />
                <div className="mt-1 flex justify-between text-[11px] text-muted-foreground font-medium">
                  <span>$30/hr</span>
                  <span>$75/hr</span>
                  <span>$150/hr</span>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-lg bg-secondary/50 p-4 border border-border">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Grounded in actual performance data across 120+ client sprints in AI Automation, Clay/n8n outbound engines, and HR operations.
                </p>
              </div>
            </div>
          </div>

          {/* Results column */}
          <div className="rounded-2xl border-2 border-[#D4A238]/40 bg-gradient-to-b from-[#F8FBFF] via-[#EEF4FA] to-[#FFFFFF] text-[#0F1E2F] p-8 md:p-10 shadow-sm lg:col-span-6 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#D4A238]/10 blur-3xl" aria-hidden />

            <div className="relative">
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#B8860B] flex items-center gap-1.5">
                  <Zap className="h-4 w-4" /> Projected Annual Impact
                </span>
                <span className="text-xs text-[#53637C]">Verified Sprint Model</span>
              </div>

              {/* Big metric: Dollars Saved */}
              <div className="mt-8">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#53637C]">
                  Annual Recaptured Value (Payroll + Efficiency)
                </div>
                <div className="mt-2 font-display text-5xl md:text-6xl font-black text-[#B8860B] tracking-tight">
                  ${annualCostRecaptured.toLocaleString()}
                  <span className="text-xl md:text-2xl font-bold text-[#53637C] ml-2">/year</span>
                </div>
              </div>

              {/* Sub metrics grid */}
              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-[#E2E8F0] pt-6">
                <div className="rounded-xl bg-white border border-[#E2E8F0] p-4 shadow-xs">
                  <div className="flex items-center gap-1.5 text-xs text-[#53637C] font-medium">
                    <Clock className="h-4 w-4 text-[#B8860B]" /> Hours Returned
                  </div>
                  <div className="mt-2 font-display text-2xl font-extrabold text-[#0F1E2F]">
                    {annualHoursSaved.toLocaleString()} <span className="text-xs font-normal text-[#53637C]">hrs/yr</span>
                  </div>
                  <div className="mt-1 text-[11px] text-[#B8860B] font-semibold">
                    = {Math.round(annualHoursSaved / 2000 * 10) / 10} full-time roles focused on growth
                  </div>
                </div>

                <div className="rounded-xl bg-white border border-[#E2E8F0] p-4 shadow-xs">
                  <div className="flex items-center gap-1.5 text-xs text-[#53637C] font-medium">
                    <TrendingUp className="h-4 w-4 text-[#B8860B]" /> Estimated Payback
                  </div>
                  <div className="mt-2 font-display text-2xl font-extrabold text-[#B8860B]">
                    {paybackDays} Days
                  </div>
                  <div className="mt-1 text-[11px] text-[#53637C]">
                    Fast break-even on 6-week sprint
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-xl bg-[#EEF4FA] border border-[#D4A238]/30 p-4">
                <div className="text-xs font-bold uppercase tracking-wider text-[#B8860B]">Strategic Advantage</div>
                <p className="mt-1 text-xs text-[#53637C] leading-relaxed">
                  Instead of paying 4 separate agency retainers ($20k+/mo total), RYZE installs self-healing automated workflows that you own outright.
                </p>
              </div>
            </div>

            <div className="mt-8 relative pt-4 border-t border-[#E2E8F0]">
              <CTAButton
                variant="gold"
                label="Unlock These Savings — Book Strategy Call"
                to="/contact"
                className="w-full justify-center text-sm py-4 shadow-gold"
                trackEvent="roi_calculator_cta_click"
                trackParams={{ teamSize, manualHours, hourlyRate, annualCostRecaptured }}
              />
              <p className="mt-2 text-center text-[11px] text-[#53637C]">
                30-min working session with a Senior Consultant · Confidential &amp; Zero Commitment
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

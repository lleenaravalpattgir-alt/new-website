import { useState } from "react";
import { Check } from "lucide-react";
import { CTAButton } from "./CTAButton";
import { track } from "@/lib/track";

type Billing = "project" | "monthly";

type Plan = {
  id: string;
  name: string;
  priceByBilling: Record<Billing, string>;
  cadenceByBilling: Record<Billing, string>;
  summary: string;
  features: string[];
  cta: string;
  variant: "ghost" | "gold" | "primary";
  featured: boolean;
  servicesParam?: string;
};

const plans: Plan[] = [
  {
    id: "strategy_call",
    name: "Strategy Call",
    priceByBilling: { project: "Complimentary", monthly: "Complimentary" },
    cadenceByBilling: {
      project: "30-minute working session",
      monthly: "30-minute working session",
    },
    summary: "Diagnose the #1 bottleneck and leave with a prioritized 30/60/90.",
    features: [
      "Senior consultant, no SDRs",
      "Live audit of one growth or ops surface",
      "Written roadmap recap within 1 business day",
      "Zero pressure to engage further",
    ],
    cta: "Book the call",
    variant: "ghost",
    featured: false,
  },
  {
    id: "implementation_sprint",
    name: "Implementation Sprint",
    priceByBilling: { project: "From $12k", monthly: "From $4k / mo" },
    cadenceByBilling: { project: "4–6 week fixed scope", monthly: "Billed across 3 months" },
    summary: "Ship one revenue-grade system end-to-end — not a deck, not a pilot.",
    features: [
      "Discovery → build → launch in one engagement",
      "AI workflow, brand system, or hiring funnel",
      "Embedded with your team in Slack",
      "Handover docs + 30-day post-launch support",
    ],
    cta: "Scope a sprint",
    variant: "gold",
    featured: true,
    servicesParam: "AI & Automation",
  },
  {
    id: "retainer",
    name: "Retainer",
    priceByBilling: { project: "From $18k / quarter", monthly: "From $6k / mo" },
    cadenceByBilling: { project: "Quarterly commitment", monthly: "Month-to-month after Q1" },
    summary: "Fractional senior operator across AI, Brand, HR, or Talent.",
    features: [
      "Dedicated lead consultant",
      "Monthly priorities + weekly cadence",
      "Cross-pillar pull-through as needed",
      "Pause or cancel between quarters",
    ],
    cta: "Talk retainer",
    variant: "primary",
    featured: false,
  },
];

export function EngagementPlans() {
  const [billing, setBilling] = useState<Billing>("project");

  const setMode = (next: Billing) => {
    if (next === billing) return;
    setBilling(next);
    track("pricing_billing_toggle", { billing: next });
  };

  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Engagement</div>
          <h2 className="mt-4 text-balance text-4xl font-extrabold text-primary md:text-5xl">
            Three ways to work with RYZE.
          </h2>
          <p className="mt-5 text-muted-foreground">
            Start with a conversation. Scale into a sprint or retainer only when the case is obvious.
          </p>

          {/* Billing toggle */}
          <div
            role="tablist"
            aria-label="Billing cadence"
            className="mt-8 inline-flex items-center gap-1 rounded-full border border-border bg-card p-1"
          >
            {(["project", "monthly"] as const).map((b) => {
              const active = billing === b;
              return (
                <button
                  key={b}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setMode(b)}
                  className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest transition-colors ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {b === "project" ? "Project-based" : "Monthly"}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.id}
              className={
                "relative flex flex-col rounded-xl border bg-card p-8 transition-all " +
                (p.featured
                  ? "border-accent shadow-elegant lg:-translate-y-3"
                  : "border-border hover:border-accent/60")
              }
            >
              {p.featured && (
                <div className="absolute -top-3 left-8 rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-accent-foreground">
                  Most chosen
                </div>
              )}
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">{p.name}</div>
              <div className="mt-5 text-4xl font-extrabold text-primary">{p.priceByBilling[billing]}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                {p.cadenceByBilling[billing]}
              </div>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{p.summary}</p>

              <ul className="mt-6 space-y-3 border-t border-border pt-6 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <CTAButton
                  label={p.cta}
                  variant={p.variant}
                  className="w-full justify-center"
                  search={{
                    plan: p.id,
                    billing,
                    ...(p.servicesParam ? { services: p.servicesParam } : {}),
                  }}
                  trackEvent="pricing_plan_cta_click"
                  trackParams={{ plan: p.id, billing }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

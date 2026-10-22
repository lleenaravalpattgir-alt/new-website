import { Quote, BadgeCheck } from "lucide-react";
import { CTAButton } from "./CTAButton";
import { track } from "@/lib/track";

const testimonials = [
  {
    id: "northwind-saas",
    quote:
      "RYZE rebuilt our outbound engine in six weeks. We replaced two SDRs with one automated workflow and tripled qualified meetings booked.",
    name: "Arjun Mehta",
    role: "VP Growth",
    company: "Northwind SaaS",
    outcome: "3.1× qualified meetings · 47-day payback",
    pillar: "AI Automation",
  },
  {
    id: "lumen-therapeutics",
    quote:
      "The brand work was surgical. Positioning, narrative, identity — all shipped in a single sprint. Inbound lifted 41% the quarter after launch.",
    name: "Priya Shah",
    role: "CMO",
    company: "Lumen Therapeutics",
    outcome: "+41% inbound demos · −18% sales cycle",
    pillar: "Brand Advisory",
  },
  {
    id: "caldera-logistics",
    quote:
      "Our HR ops were held together with spreadsheets. RYZE engineered a performance system the leadership team actually trusts.",
    name: "Daniel Okafor",
    role: "Chief People Officer",
    company: "Caldera Logistics",
    outcome: "92% review-cycle completion",
    pillar: "HR Consultancy",
  },
  {
    id: "helix-robotics",
    quote:
      "Two executive hires placed in 38 days. Both still on the leadership team two years later. That's the ROI you don't get from a recruiter.",
    name: "Sara Lindqvist",
    role: "CEO",
    company: "Helix Robotics",
    outcome: "2 / 2 C-suite hires retained at 24 months",
    pillar: "Talent",
  },
  {
    id: "atlas-fintech",
    quote:
      "We finally have a story sales can repeat in their sleep. The clarity alone was worth the engagement.",
    name: "Marcus Vega",
    role: "Head of Sales",
    company: "Atlas Fintech",
    outcome: "+27% close rate on enterprise deals",
    pillar: "Brand Advisory",
  },
];

// Staggered layout — alternate column spans
const colSpan = (i: number) => (i % 3 === 0 ? "md:col-span-2" : "md:col-span-1");

export function Testimonials() {
  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Proof</div>
            <h2 className="mt-4 text-balance text-4xl font-extrabold text-primary md:text-5xl">
              Operators who scaled with <span className="text-accent">RYZE.</span>
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            Senior consultants. Shipped systems. Verified outcomes — not slide decks.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <figure
              key={t.id}
              onMouseEnter={() => track("testimonial_view", { testimonial_id: t.id, pillar: t.pillar })}
              className={`group relative flex flex-col rounded-xl border border-border bg-card p-8 transition-all hover:-translate-y-1 hover:border-accent hover:shadow-elegant ${colSpan(i)}`}
            >
              <div className="flex items-start justify-between gap-4">
                <Quote className="h-8 w-8 text-accent" aria-hidden />
                <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
                  <BadgeCheck className="h-3 w-3 text-accent" aria-hidden /> Verified client
                </span>
              </div>
              <blockquote className="mt-5 text-lg leading-relaxed text-primary">"{t.quote}"</blockquote>
              <div className="mt-5 rounded-md border border-accent/30 bg-accent/5 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-accent">
                Outcome · {t.outcome}
              </div>
              <figcaption className="mt-5 flex items-center justify-between border-t border-border pt-5">
                <div>
                  <div className="text-sm font-bold text-primary">{t.name}</div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    {t.role} · {t.company}
                  </div>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-accent">{t.pillar}</div>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <CTAButton
            label="Get results like these"
            variant="gold"
            trackEvent="testimonials_cta_click"
            trackParams={{ location: "testimonials_section" }}
          />
        </div>
      </div>
    </section>
  );
}

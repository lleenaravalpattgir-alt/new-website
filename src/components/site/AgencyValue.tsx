import { Layers, Rocket, Repeat } from "lucide-react";

const values = [
  {
    icon: Layers,
    title: "Unified Strategy",
    body: "Stop managing four different agencies. We align your tech, talent, and market presence under one roof.",
  },
  {
    icon: Rocket,
    title: "Execution-Obsessed",
    body: "From deploying n8n workflows to securing executive hires, we focus on shipped work and P&L impact.",
  },
  {
    icon: Repeat,
    title: "Scalable Partnerships",
    body: "Month-to-month agreements. No long-term lock-in. Scale up, scale down, or pivot focus as your business evolves.",
  },
];

export function AgencyValue() {
  return (
    <section className="border-y border-border bg-primary py-28 text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Why RYZE</div>
            <h2 className="mt-4 text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
              Built for outcomes, <span className="text-accent">not just advice.</span>
            </h2>
          </div>
          <p className="max-w-md text-primary-foreground/70">
            We don't just hand you a slide deck and walk away. We are your senior bench.
          </p>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-xl bg-primary-foreground/10 md:grid-cols-3">
          {values.map((v) => (
            <div
              key={v.title}
              className="group relative bg-primary p-10 transition-colors hover:bg-primary-foreground/[0.04]"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-md border border-accent/30 bg-accent/10 text-accent transition-all group-hover:scale-110 group-hover:border-accent">
                <v.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-8 text-xl font-bold leading-snug">{v.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-primary-foreground/70">{v.body}</p>
              <div className="absolute inset-x-0 bottom-0 h-px scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

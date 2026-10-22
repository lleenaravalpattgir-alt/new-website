import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/data/caseStudies";
import { track } from "@/lib/track";

export function CaseStudies() {
  return (
    <section className="bg-secondary/40 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Results</div>
            <h2 className="mt-4 text-balance text-4xl font-extrabold text-primary md:text-5xl">
              Outcomes you can measure on Monday.
            </h2>
          </div>
          <Link
            to="/services"
            className="text-sm font-semibold uppercase tracking-wide text-primary hover:text-accent"
            onClick={() => track("case_studies_all_services_click", {})}
          >
            All services →
          </Link>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {caseStudies.map((c) => (
            <Link
              key={c.slug}
              to="/case-studies/$slug"
              params={{ slug: c.slug }}
              onClick={() =>
                track("case_study_card_click", {
                  case_study_slug: c.slug,
                  pillar: c.pillar,
                  client: c.client,
                })
              }
              className="group flex flex-col rounded-xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-accent hover:shadow-elegant"
            >
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">{c.pillar}</div>
              <div className="mt-6 text-5xl font-extrabold text-primary">{c.metric}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{c.label}</div>
              <h3 className="mt-6 text-base font-bold leading-snug text-primary group-hover:text-accent">
                {c.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
              <div className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:text-accent">
                Read case study <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

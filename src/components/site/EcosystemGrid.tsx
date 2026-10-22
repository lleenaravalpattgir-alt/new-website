import {
  Sparkles,
  Code2,
  Bot,
  Plug,
  BarChart3,
  Workflow,
  Users,
  ShoppingBag,
} from "lucide-react";

interface Group {
  icon: typeof Sparkles;
  title: string;
  tools: string[];
}

const groups: Group[] = [
  {
    icon: Sparkles,
    title: "AI Models & Engines",
    tools: ["OpenAI", "Claude", "Gemini", "Meta", "Mistral AI"],
  },
  {
    icon: Code2,
    title: "Vibe Coding / AI Development",
    tools: ["Cursor", "Replit", "Google Antigravity", "Lovable", "Windsurf", "Claude Code", "v0"],
  },
  {
    icon: Bot,
    title: "Autonomous AI Agents",
    tools: ["OpenClaw"],
  },
  {
    icon: Plug,
    title: "Developer & Custom API",
    tools: ["GraphQL Foundation", "LangChain", "LlamaIndex", "Webhooks"],
  },
  {
    icon: BarChart3,
    title: "Analytics & Intelligence",
    tools: ["Google Analytics (GA4)", "Looker", "Power BI", "Custom AI Dashboards"],
  },
  {
    icon: Workflow,
    title: "Automation & Workflow",
    tools: ["n8n", "Zapier", "Make", "Langflow"],
  },
  {
    icon: Users,
    title: "CRM, Sales & Marketing",
    tools: ["HubSpot", "HighLevel", "Salesforce", "Zoho CRM"],
  },
  {
    icon: ShoppingBag,
    title: "Web & eCommerce",
    tools: ["WordPress", "Shopify", "WooCommerce", "Webflow"],
  },
];

export function EcosystemGrid() {
  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-widest text-accent">Ecosystem</div>
            <h2 className="mt-3 text-balance text-4xl font-extrabold text-primary md:text-5xl">
              We don't replace your stack. <span className="text-accent">We supercharge it.</span>
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            Every engagement plugs into the tools your team already runs — no rip-and-replace, no learning curve.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
          {groups.map((g) => (
            <div key={g.title} className="group flex flex-col bg-card p-7 transition-colors hover:bg-secondary/60">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary text-accent transition-colors group-hover:bg-accent group-hover:text-primary">
                  <g.icon className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-primary">{g.title}</h3>
              </div>
              <ul className="mt-5 flex flex-wrap gap-2">
                {g.tools.map((t) => (
                  <li
                    key={t}
                    className="rounded-md border border-border bg-background px-3 py-1.5 text-xs font-semibold text-primary transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent hover:shadow-sm"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs uppercase tracking-widest text-muted-foreground">
          + custom integrations on request — if it has an API, we can wire it.
        </p>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { CTAButton } from "@/components/site/CTAButton";
import { LeadForm } from "@/components/site/LeadForm";
import { BusinessFundingLoanSection } from "@/components/site/BusinessFundingLoanCard";
import { services } from "@/data/services";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services & Solutions Architecture | Rise Advisory" },
      { name: "description", content: "Explore the Rise Advisory service architecture: targeted solutions across AI automation, brand systems, executive search, and modern HR architecture." },
      { property: "og:title", content: "Services & Solutions Architecture | Rise Advisory" },
      { property: "og:description", content: "Explore the Rise Advisory service architecture: targeted solutions across AI automation, brand systems, executive search, and modern HR architecture." },
      { property: "og:url", content: "https://ryzeadvisory.co/services" },
      { property: "og:image", content: "https://ryzeadvisory.co/logo.png" },
    ],
    links: [{ rel: "canonical", href: "https://ryzeadvisory.co/services" }],
  }),
  component: ServicesIndex,
});

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const trackEvent = (name: string, params: Record<string, unknown>) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }
};

const AI_CATEGORIES = [
  "AI Automation",
  "Agentic Workflows",
  "Operational AI Agents",
  "Client-Facing AI",
  "Research & Intelligence",
  "GEO & AI SEO",
  "Content Automation",
] as const;

type TabKey = "ai" | "brand" | "hr" | "talent";

const TABS: { key: TabKey; label: string; heading: string; categories: readonly string[] }[] = [
  { key: "ai", label: "AI & Automation", heading: "AI & Automation", categories: AI_CATEGORIES },
  { key: "brand", label: "Brand Advisory", heading: "Brand Advisory", categories: ["Brand Advisory"] },
  { key: "hr", label: "HR Consultancy", heading: "HR Consultancy", categories: ["HR Consultancy"] },
  { key: "talent", label: "Talent Acquisition", heading: "Talent Acquisition", categories: ["Talent Acquisition"] },
];

function ServicesIndex() {
  const [active, setActive] = useState<TabKey>("ai");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const lastTracked = useRef<TabKey | null>(null);

  useEffect(() => {
    const handler = () => {
      const probe = 180;
      let current: TabKey = TABS[0].key;
      for (const t of TABS) {
        const el = sectionRefs.current[t.key];
        if (!el) continue;
        if (el.getBoundingClientRect().top <= probe) current = t.key;
      }
      setActive((prev) => {
        if (prev === current) return prev;
        if (lastTracked.current !== current) {
          lastTracked.current = current;
          trackEvent("services_section_view", { section: current });
        }
        return current;
      });
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, []);

  const scrollTo = (key: TabKey) => {
    trackEvent("services_tab_click", { tab: key });
    const el = sectionRefs.current[key];
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 140;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const setRef = (key: TabKey) => (el: HTMLElement | null) => {
    sectionRefs.current[key] = el;
  };

  return (
    <SiteLayout>
      <section className="bg-gradient-to-b from-[#F8FBFF] via-[#EEF4FA] to-[#FFFFFF] py-24 md:py-32 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#B8860B]">What We Do</div>
          <h1 className="mt-3 max-w-4xl text-balance text-5xl font-extrabold md:text-6xl text-[#0F1E2F]">
            Our Services &amp; <span className="text-[#B8860B]">Solutions.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-[#53637C]">
            Explore our practical business services across AI, Automation, Branding, HR, and Talent Acquisition.
          </p>
        </div>
      </section>

      <div className="sticky top-0 z-30 border-b border-[#E2E8F0] bg-white/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex gap-2 overflow-x-auto py-4">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => scrollTo(t.key)}
                aria-current={active === t.key ? "true" : undefined}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-all duration-300",
                  active === t.key
                    ? "border-[#D4A238] bg-[#D4A238] text-[#0F1E2F] font-bold shadow-gold"
                    : "border-[#E2E8F0] bg-white text-[#0F1E2F] hover:border-[#D4A238] hover:text-[#B8860B]",
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {TABS.map((tab, idx) => {
        const items = services.filter((s) => tab.categories.includes(s.category));
        return (
          <section
            key={tab.key}
            ref={setRef(tab.key)}
            className={cn("scroll-mt-32 py-20 border-b border-[#E2E8F0]", idx % 2 === 0 ? "bg-white" : "bg-[#F8FBFF]")}
          >
            <div className="mx-auto max-w-7xl px-6">
              <div className="pb-10">
                <div className="text-xs font-semibold uppercase tracking-widest text-[#B8860B]">{tab.heading}</div>
                <h2 className="mt-2 text-3xl font-bold text-[#0F1E2F] md:text-4xl">{tab.heading} services</h2>
              </div>
              {tab.key === "ai" && (
                <div className="flex flex-wrap gap-2 pb-10">
                  {Array.from(new Set(items.map((s) => s.category))).map((c) => (
                    <span key={c} className="rounded-full border border-[#E2E8F0] bg-[#EEF4FA] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#0F1E2F]">
                      {c}
                    </span>
                  ))}
                </div>
              )}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {items.map((s) => (
                  <Link
                    key={s.slug}
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    onClick={() => trackEvent("services_card_click", { tab: tab.key, slug: s.slug })}
                    className="group relative flex flex-col rounded-2xl border border-[#E2E8F0] bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-[#D4A238]/50 hover:shadow-md"
                  >
                    <div className="text-xs font-semibold uppercase tracking-widest text-[#B8860B]">{s.category}</div>
                    <h3 className="mt-3 text-xl font-bold text-[#0F1E2F]">{s.title}</h3>
                    <p className="mt-2 text-sm text-[#53637C]">{s.tagline}</p>
                    <div className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[#0F1E2F] group-hover:text-[#B8860B]">
                      Learn more <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section className="bg-[#EEF4FA] py-24 border-b border-[#E2E8F0]">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1fr_440px]">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-[#B8860B]">Get started</div>
            <h2 className="mt-3 text-balance text-4xl font-extrabold text-[#0F1E2F] md:text-5xl">
              Not sure which pillar fits? <span className="text-[#B8860B]">Start with a call.</span>
            </h2>
            <p className="mt-5 max-w-xl text-[#53637C]">
              30 minutes with a senior consultant. We'll triage across AI, Brand, HR, and Talent — and tell you what to do first.
            </p>
          </div>
          <LeadForm />
        </div>
      </section>

      {/* Integrated Capital Advisory & Business Loans Section */}
      <BusinessFundingLoanSection
        title="Fund Your Service Implementations With Low-Cost Debt & Grants"
        subtitle="Transforming operations, branding, and AI infrastructure is faster with institutional capital. Access Gujarat Industrial Policy incentives and CGTMSE loans."
      />

      <section className="relative overflow-hidden bg-gradient-to-b from-[#F8FBFF] via-[#EEF4FA] to-[#FFFFFF] text-[#0F1E2F] py-20">
        <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-8 px-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-widest text-[#B8860B]">Ready when you are</div>
            <h2 className="mt-3 text-balance text-4xl font-extrabold md:text-5xl text-[#0F1E2F]">
              Stop watching competitors outpace you.
            </h2>
            <p className="mt-4 text-[#53637C]">
              30 minutes with a senior consultant. You'll leave with a sharper roadmap across your tech, talent, or brand — guaranteed.
            </p>
          </div>
          <CTAButton variant="gold" label="Book Your Strategy Call" />
        </div>
      </section>
    </SiteLayout>
  );
}

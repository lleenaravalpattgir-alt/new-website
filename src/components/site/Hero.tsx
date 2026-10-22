import { CTAButton } from "./CTAButton";
import { TrendingUp } from "lucide-react";

interface Props {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}

export function Hero({
  eyebrow = "AI · Branding · HR · Talent",
  title = "Scale Your Brand. Empower Your People. Automate Your Future.",
  subtitle = "RYZE Advisory is the modern consultancy for ambitious companies. We deliver high-impact strategies across AI, Branding, Human Resources, and Talent Acquisition to build businesses that dominate.",
}: Props) {
  const [firstSentence, ...rest] = title.split(".");
  const remainder = rest.join(".").trim();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F8FBFF] via-[#EEF4FA] to-[#FFFFFF] text-[#0F1E2F] border-b border-[#E2E8F0]">
      <div className="absolute inset-0 arrow-bg opacity-20" aria-hidden />
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#D4A238]/10 blur-3xl" aria-hidden />
      <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-[#D4A238]/5 blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-36">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A238]/40 bg-[#EEF4FA] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#B8860B]">
            <TrendingUp className="h-3.5 w-3.5" />
            {eyebrow}
          </div>
          <h1 className="mt-8 text-balance text-5xl font-extrabold leading-[1.04] tracking-tight md:text-7xl text-[#0F1E2F]">
            {firstSentence}.
            <span className="block text-[#B8860B]">{remainder}</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-[#53637C] md:text-xl">
            {subtitle}
          </p>
          <div className="mt-12 flex flex-wrap gap-4">
            <CTAButton variant="gold" label="Explore Our Expertise" to="/services" />
            <CTAButton variant="ghost" label="Book a Strategy Call" to="/contact" className="border-[#E2E8F0] bg-white text-[#0F1E2F] hover:border-[#D4A238] hover:text-[#B8860B]" />
          </div>
          <div className="mt-16 grid max-w-2xl grid-cols-3 gap-8 border-t border-[#E2E8F0] pt-10">
            {[
              ["120+", "Transformations Shipped"],
              ["40%", "Avg. Operational Cost Reduction"],
              ["10x", "Faster Hiring & Onboarding"],
            ].map(([m, l]) => (
              <div key={l}>
                <div className="font-display text-3xl font-extrabold text-[#B8860B]">{m}</div>
                <div className="mt-2 text-xs uppercase tracking-[0.18em] text-[#53637C]">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

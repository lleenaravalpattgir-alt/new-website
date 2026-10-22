import { CTAButton } from "./CTAButton";

export function StickyCTA({ title }: { title?: string }) {
  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      <div className="absolute inset-0 arrow-bg opacity-30" aria-hidden />
      <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-accent/10 to-transparent" aria-hidden />
      <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-8 px-6 py-20 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#D4A238]">Get Started Today</div>
          <h2 className="mt-3 text-balance text-4xl font-extrabold md:text-5xl">
            {title ?? "Ready to grow your business with experienced leaders?"}
          </h2>
          <p className="mt-4 text-primary-foreground/80">
            Schedule a 90-minute business review with a senior advisor. You'll get a clear, practical 90-day plan to move your business forward.
          </p>
        </div>
        <CTAButton variant="gold" />
      </div>
    </section>
  );
}

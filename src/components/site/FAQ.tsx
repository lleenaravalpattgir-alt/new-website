import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CTAButton } from "./CTAButton";
import { track } from "@/lib/track";

const faqs = [
  {
    q: "Is the strategy call actually free — or is it a sales pitch?",
    a: "Free, and not a pitch. A senior consultant spends 30 minutes diagnosing your biggest bottleneck and sends a written 30/60/90 recap within one business day. If we're not the right fit, we'll say so on the call.",
  },
  {
    q: "We're not ready to commit to a retainer. Can you still help?",
    a: "Yes. Most engagements start as a fixed-scope Implementation Sprint (4–6 weeks). You get one shipped system — an outbound engine, a brand rebuild, a hiring funnel — with no ongoing commitment. Retainers are opt-in afterward.",
  },
  {
    q: "How is RYZE different from an agency or a Big-4 consultancy?",
    a: "Agencies hand you assets. Big-4 hands you slides. RYZE ships working systems your team operates on Monday — across AI, brand, HR, and talent — staffed only with senior operators who've built and run these systems before.",
  },
  {
    q: "Do you work with early-stage startups or only established companies?",
    a: "Both, with a bias toward founder-led companies between $1M–$50M ARR. The Strategy Call is the fastest way to find out if your stage and budget match how we engage.",
  },
  {
    q: "What does a typical engagement cost?",
    a: "Implementation Sprints start at $12k for a single fixed-scope build. Retainers start at $6k/month. The Strategy Call is complimentary — you'll get a clear scope and price before any commitment.",
  },
  {
    q: "How fast can you start?",
    a: "Strategy Calls are usually booked within the same week. Sprints kick off within 7–14 days of signed scope. Retainers begin on the first of the following month.",
  },
];

export function FAQ() {
  const onValueChange = (value: string) => {
    if (!value) return;
    const idx = Number(value.replace("item-", ""));
    const f = faqs[idx];
    if (f) track("faq_open", { faq_question_id: `faq_${idx}`, faq_question: f.q });
  };

  return (
    <section className="bg-secondary/40 py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1fr_2fr]">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">FAQ</div>
          <h2 className="mt-4 text-balance text-4xl font-extrabold text-primary md:text-5xl">
            Questions worth answering before the call.
          </h2>
          <p className="mt-5 text-muted-foreground">
            Still on the fence? Book 30 minutes. We'll either point you to a free resource or scope a sprint — never both.
          </p>
          <div className="mt-8">
            <CTAButton
              label="Book your strategy call"
              variant="gold"
              trackEvent="faq_cta_click"
              trackParams={{ location: "faq_section" }}
            />
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-2 md:p-4">
          <Accordion type="single" collapsible className="w-full" onValueChange={onValueChange}>
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`} className="px-4">
                <AccordionTrigger className="text-left text-base font-semibold text-primary hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </section>
  );
}

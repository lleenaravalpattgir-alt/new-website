import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { HelpCircle, ArrowRight, ShieldCheck, Sparkles, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: [
      { title: "Frequently Asked Questions | Rise Advisory" },
      { name: "description", content: "Common questions about fractional leadership, engagement models, delivery cadence, and pricing at Rise Advisory." },
      { property: "og:title", content: "Frequently Asked Questions | Rise Advisory" },
      { property: "og:url", content: "https://ryzeadvisory.co/faqs" },
    ],
    links: [{ rel: "canonical", href: "https://ryzeadvisory.co/faqs" }],
  }),
  component: FAQsPage,
});

const faqList = [
  {
    category: "Fractional Leadership & Model",
    questions: [
      {
        q: "What exactly is a Fractional CXO?",
        a: "A Fractional CXO is a senior executive (ex-CFO, CMO, CTO, COO, etc.) who works with your company part-time (typically 1 to 2 days per week or on a 90-day sprint) to provide high-level strategic direction, mentor internal managers, remove operational bottlenecks, and take direct ownership of functional outcomes—without the cost of a full-time C-suite executive."
      },
      {
        q: "How is Rise Advisory different from a freelance marketplace or consultancy?",
        a: "We are a managed platform with one accountable relationship. Unlike marketplaces where you must screen, manage, and coordinate disconnected freelancers, Rise provides a single accountable engagement lead, structured 90-day SOWs, weekly operating rhythms, and our contractually defined Execution Guarantee."
      },
      {
        q: "When should our company consider fractional leadership?",
        a: "When you have proven product traction (typically ₹5 Cr to ₹100 Cr revenue or post-seed funding) and find that the founder is the bottleneck, operations are chaotic, or key functional areas lack experienced strategic leadership."
      }
    ]
  },
  {
    category: "Engagements & Delivery",
    questions: [
      {
        q: "How does the 90-minute Growth & Leadership Diagnostic work?",
        a: "We conduct in-depth discovery with the founder and key leaders, review high-level financial and operational data, map your primary constraint, and deliver a written 90-day priority action note outlining the exact leadership resources needed."
      },
      {
        q: "What is the Rise Execution Guarantee?",
        a: "If Rise Advisory misses an agreed governance milestone or deliverable for reasons within our control, we complete that item without additional professional fees or extend the delivery timeline. We commit to process rigor, operational transparency, and agreed outputs."
      },
      {
        q: "How long does a typical engagement last?",
        a: "Most companies start with a 90-minute Diagnostic, progress into a 90-Day Execution Sprint to eliminate a primary bottleneck, and then transition into a 1–2 days/week ongoing Fractional CXO retainer or Growth Pod as they continue scaling."
      }
    ]
  },
  {
    category: "Pricing & Commercials",
    questions: [
      {
        q: "What are your commercial ranges?",
        a: "Our public indicative packages include Expert Power Sessions (₹7,500–₹25,000), Growth Diagnostics (₹25,000–₹75,000), 90-Day Execution Sprints (₹1.5L–₹6L per project), and ongoing Fractional CXO Retainers (₹75,000–₹3L/month per role). Final pricing is customized based on role seniority, time commitment, and scope."
      },
      {
        q: "Do you take equity in lieu of fees?",
        a: "Our standard engagements are cash-based monthly retainers, allowing founders to preserve their valuable equity. Hybrid structures may be evaluated for select high-growth funded ventures upon request."
      }
    ]
  }
];

function FAQsPage() {
  return (
    <SiteLayout>
      {/* Premium Navy Hero with White Accent Gradient */}
      <section className="relative overflow-hidden bg-[#0B1F3B] py-20 md:py-28 navy-diagonal-texture border-b border-[#E2E8F0]/10">
        <div 
          className="pointer-events-none absolute inset-0 opacity-15"
          style={{ background: "linear-gradient(115deg, #0B1F3B 0%, #132F55 48%, #FFFFFF 100%)" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A238]/40 bg-[#0E2A4D]/80 px-3.5 py-1 text-xs font-semibold text-[#D4A238] mb-4">
              <Sparkles className="h-3 w-3" />
              <span>Knowledge Base &amp; Answers</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight">
              Frequently Asked <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A238] via-[#F3E5AB] to-[#D4A238]">
                Questions.
              </span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#EEF4FA]/80 leading-relaxed">
              Everything you need to know about fractional C-suite leadership, the Rise Delivery Method, engagement models, and commercial terms.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#F8FBFF] py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 space-y-12">
          {faqList.map((cat, cIdx) => (
            <div key={cIdx} className="space-y-4">
              <h2 className="text-xl font-bold border-b border-[#E2E8F0] pb-3 text-[#B8860B]">
                {cat.category}
              </h2>
              <div className="space-y-4 pt-2">
                {cat.questions.map((q, qIdx) => (
                  <div key={qIdx} className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm">
                    <h3 className="text-sm font-bold text-[#0F1E2F] flex items-start gap-2.5 mb-2">
                      <HelpCircle className="h-4 w-4 text-[#B8860B] shrink-0 mt-0.5" />
                      <span>{q.q}</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-[#53637C] leading-relaxed pl-6.5">{q.a}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Still Have Questions CTA */}
          <div className="service-card p-8 text-center space-y-4 border-2 border-[#D4A238]/40 mt-12">
            <h3 className="text-xl font-bold text-[#0F1E2F]">Have a Specific Question About Your Company?</h3>
            <p className="text-sm text-[#53637C] max-w-md mx-auto">
              Our founder desk in Ahmedabad is available to discuss your current stage and leadership requirements.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <Link to="/book-diagnostic" className="btn-gold flex items-center gap-2">
                <span>Book a Diagnostic Call</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="https://wa.me/919313967971"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline flex items-center gap-2"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

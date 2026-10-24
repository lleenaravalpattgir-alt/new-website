import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { LeadForm } from "@/components/site/LeadForm";
import { BusinessFundingLoanSection } from "@/components/site/BusinessFundingLoanCard";
import { ShieldCheck, CheckCircle2, Clock, Calendar, ArrowRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/book-diagnostic")({
  head: () => ({
    meta: [
      { title: "Book a 90-Minute Business Review | Rise Advisory" },
      { name: "description", content: "A 90-minute meeting to understand your business challenges, find where your team needs support, and get a simple, practical 90-day action plan." },
      { property: "og:title", content: "Book a 90-Minute Business Review | Rise Advisory" },
      { property: "og:url", content: "https://ryzeadvisory.co/book-diagnostic" },
    ],
    links: [{ rel: "canonical", href: "https://ryzeadvisory.co/book-diagnostic" }],
  }),
  component: BookDiagnosticPage,
});

function BookDiagnosticPage() {
  return (
    <SiteLayout>
      {/* Hero Section */}
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
              <span>Easy Starting Point</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight">
              Book a 90-Minute <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A238] via-[#F3E5AB] to-[#D4A238]">
                Business Review.
              </span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#EEF4FA]/80 leading-relaxed">
              Before committing to ongoing monthly retainers, start with a 90-minute business review. We look at your sales, cash flow, and daily operations to create a clear, actionable 90-day plan for your company.
            </p>
          </div>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="bg-[#F8FBFF] py-20 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="mb-10 grid gap-4 sm:grid-cols-3 text-center text-xs">
            <div className="service-card p-5">
              <Clock className="h-6 w-6 text-[#D4A238] mx-auto mb-2" />
              <div className="font-bold text-[#0F1E2F] text-sm">90 Minutes</div>
              <div className="text-[#53637C] mt-0.5">Private Review Meeting</div>
            </div>
            <div className="service-card p-5">
              <Calendar className="h-6 w-6 text-[#D4A238] mx-auto mb-2" />
              <div className="font-bold text-[#0F1E2F] text-sm">Written Action Plan</div>
              <div className="text-[#53637C] mt-0.5">Delivered in 48 Hours</div>
            </div>
            <div className="service-card p-5">
              <ShieldCheck className="h-6 w-6 text-[#D4A238] mx-auto mb-2" />
              <div className="font-bold text-[#0F1E2F] text-sm">100% Confidential</div>
              <div className="text-[#53637C] mt-0.5">Strict NDA Protection</div>
            </div>
          </div>

          <LeadForm defaultService="Growth & Leadership Diagnostic (90 Min)" />
        </div>
      </section>

      {/* Integrated Capital Advisory & Business Loans Section */}
      <BusinessFundingLoanSection
        title="Need Business Loans or Government Grants as Well?"
        subtitle="Tell us about your funding or loan needs during our call. We check your eligibility for collateral-free bank loans up to ₹5 Cr, Gujarat state subsidies, and investor funding."
      />
    </SiteLayout>
  );
}

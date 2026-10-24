import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ShieldCheck, FileText, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/terms-and-conditions")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions | Rise Advisory" },
      { name: "description", content: "Terms and conditions governing website use and advisory engagements with Rise Advisory." },
      { property: "og:title", content: "Terms & Conditions | Rise Advisory" },
      { property: "og:url", content: "https://ryzeadvisory.co/terms-and-conditions" },
    ],
    links: [{ rel: "canonical", href: "https://ryzeadvisory.co/terms-and-conditions" }],
  }),
  component: TermsAndConditionsPage,
});

export function TermsAndConditionsPage() {
  return (
    <SiteLayout>
      {/* Premium Navy Hero with White Accent Gradient */}
      <section className="relative overflow-hidden bg-[#0B1F3B] py-16 md:py-20 navy-diagonal-texture border-b border-[#E2E8F0]/10">
        <div 
          className="pointer-events-none absolute inset-0 opacity-15"
          style={{ background: "linear-gradient(115deg, #0B1F3B 0%, #132F55 48%, #FFFFFF 100%)" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
          <span className="badge-gold mb-2">Legal Governance</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white">Terms &amp; Conditions</h1>
          <p className="mt-2 text-xs text-[#EEF4FA]/70">Effective Date: October 2026 | Rise Advisory (Ahmedabad, India)</p>
        </div>
      </section>

      <section className="bg-[#F8FBFF] py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 space-y-8 text-xs sm:text-sm text-[#53637C] leading-relaxed">
          <div className="service-card p-8 space-y-3">
            <h2 className="text-lg font-bold text-[#0F1E2F]">1. Scope of Engagement</h2>
            <p>
              These Terms &amp; Conditions govern the use of the Rise Advisory website and outline the principles governing professional advisory relationships. Formal consulting engagements are governed by a mutually executed Master Services Agreement (MSA) and project-specific Statements of Work (SOW).
            </p>
          </div>

          <div className="service-card p-8 space-y-3">
            <h2 className="text-lg font-bold text-[#0F1E2F]">2. Nature of Advisory Services</h2>
            <p>
              Rise Advisory provides strategic business consulting, executive mentoring, fractional leadership management, and operational process design. Rise Advisory is not an investment bank, statutory auditing firm, or legal counsel. Services requiring statutory registration (such as audits, tax opinions, and legal filings) are coordinated through appropriately licensed external professional partners.
            </p>
          </div>

          <div className="service-card p-8 space-y-3">
            <h2 className="text-lg font-bold text-[#0F1E2F]">3. Commercial Terms &amp; Retainers</h2>
            <p>
              Diagnostic fees are payable upon booking confirmation. Retainers and 90-day sprints are invoiced in advance according to the payment schedule defined in the applicable Statement of Work. Third-party software subscriptions, media ad spend, and statutory filing fees are the sole responsibility of the client.
            </p>
          </div>

          <div className="service-card p-8 space-y-3">
            <h2 className="text-lg font-bold text-[#0F1E2F]">4. The Rise Execution Guarantee</h2>
            <p>
              Where contractually specified, Rise Advisory guarantees completion of agreed governance deliverables and milestone reviews. If an agreed milestone within our operational control is missed, Rise Advisory will complete that item without additional professional fees or extend the delivery timeline, subject to client dependencies defined in the SOW. No guarantees of revenue, valuation, funding, or profitability are made.
            </p>
          </div>

          <div className="service-card p-8 space-y-3">
            <h2 className="text-lg font-bold text-[#0F1E2F]">5. Intellectual Property &amp; Confidentiality</h2>
            <p>
              All client data, trade secrets, and bespoke workflows developed during an engagement remain the exclusive intellectual property of the client upon full payment of agreed professional fees. Both parties operate under mutual non-disclosure obligations.
            </p>
          </div>

          <div className="pt-4 text-center">
            <Link to="/contact" className="btn-gold inline-flex items-center gap-2">
              <span>Have Questions About Our Terms? Contact Us</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

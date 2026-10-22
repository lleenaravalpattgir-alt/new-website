import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { AlertTriangle, ShieldCheck, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: "Regulatory & Service Disclaimer | Rise Advisory" },
      { name: "description", content: "Important regulatory disclosures, professional scope, and performance disclaimers for Rise Advisory." },
    ],
  }),
  component: DisclaimerPage,
});

export function DisclaimerPage() {
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
          <span className="badge-gold mb-2">Regulatory Disclosures</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white">Advisory &amp; Regulatory Disclaimer</h1>
          <p className="mt-2 text-xs text-[#EEF4FA]/70">Important disclosures regarding professional licensing and forward-looking claims.</p>
        </div>
      </section>

      <section className="bg-[#F8FBFF] py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 space-y-8 text-xs sm:text-sm text-[#53637C] leading-relaxed">
          <div className="service-card p-8 border-[#EF4444]/30 space-y-3">
            <div className="flex items-center gap-2 text-[#EF4444] font-bold text-sm">
              <AlertTriangle className="h-5 w-5 shrink-0" />
              <span>Regulated Professional Services Disclosure</span>
            </div>
            <p>
              Rise Advisory is an executive management consultancy and fractional leadership advisory. Rise Advisory is <strong>not</strong> a SEBI-registered investment advisor, merchant banker, chartered accountancy audit firm, law firm, insurance broker, or licensed financial institution.
            </p>
            <p>
              Any services relating to statutory financial auditing, formal legal opinions, court representation, tax filing certifications, debt underwriting, or public issue (IPO) merchant banking are conducted exclusively by or in direct partnership with independent, appropriately qualified, and statutorily licensed professional entities.
            </p>
          </div>

          <div className="service-card p-8 space-y-3">
            <h2 className="text-lg font-bold text-[#0F1E2F]">No Guarantee of Commercial Outcomes</h2>
            <p>
              While Rise Advisory applies proven operational frameworks and experienced fractional executives, business growth and profitability depend on numerous internal and external variables—including market conditions, client product quality, competitor behavior, and client team execution.
            </p>
            <p className="font-semibold text-[#0F1E2F]">
              Rise Advisory never promises or guarantees specific revenue totals, profit figures, bank loan sanctions, investor funding closures, business valuations, or Google search engine rankings.
            </p>
          </div>

          <div className="service-card p-8 space-y-3">
            <h2 className="text-lg font-bold text-[#0F1E2F]">Educational &amp; Strategic Nature of Content</h2>
            <p>
              The articles, templates, calculators, and resources published on this website are provided solely for general informational and educational purposes. They do not constitute formal financial, tax, or legal advice. Visitors should seek independent professional counsel before making high-stakes commercial or legal decisions.
            </p>
          </div>

          <div className="service-card p-8 space-y-3">
            <h2 className="text-lg font-bold text-[#0F1E2F]">Governance &amp; Corporate Standards</h2>
            <p>
              Rise Advisory is headquartered in Ahmedabad, Gujarat, India, under the leadership of founder Leena Raval. All client engagements are governed by formal Master Services Agreements (MSA) and project-specific Statements of Work (SOW).
            </p>
          </div>

          <div className="pt-4 text-center">
            <Link to="/contact" className="btn-gold inline-flex items-center gap-2">
              <span>Contact Rise Advisory</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

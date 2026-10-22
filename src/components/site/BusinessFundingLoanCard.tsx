import { Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  Award,
  Building2,
  TrendingUp,
  ArrowRight,
  Phone,
  Landmark,
  CheckCircle2,
  Calculator,
  FileText,
} from "lucide-react";
import { getWhatsAppUrl } from "@/components/site/WhatsAppFab";

interface BusinessFundingLoanSectionProps {
  variant?: "full" | "compact" | "card";
  title?: string;
  subtitle?: string;
}

export function BusinessFundingLoanSection({
  variant = "full",
  title = "Business Loans & Government Grants in Gujarat",
  subtitle = "Get the right funding to grow your business. We help you secure collateral-free bank loans up to ₹5 Cr, government grants up to ₹30 Lakh, and Gujarat state subsidies — with no upfront broker fees.",
}: BusinessFundingLoanSectionProps) {
  const waUrl = getWhatsAppUrl(
    "Hello Rise Advisory, I would like to check Business Loans and Government Grant options for my business."
  );

  if (variant === "compact" || variant === "card") {
    return (
      <div className="rounded-2xl border border-[#D4A238]/30 bg-gradient-to-br from-[#0B1F3B] via-[#0E2A4D] to-[#0B1F3B] p-6 text-white shadow-xl relative overflow-hidden">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#D4A238]/10 blur-2xl"
          aria-hidden="true"
        />
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#D4A238]/40 bg-[#D4A238]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#D4A238]">
            <Landmark className="h-3.5 w-3.5" />
            <span>Business Loans &amp; Grants</span>
          </div>

          <h3 className="text-xl font-extrabold text-white leading-snug">
            Need Money to Grow Your Business?
          </h3>

          <p className="text-xs text-slate-300 leading-relaxed">
            We help you get collateral-free bank loans (CGTMSE up to ₹5 Cr), Gujarat factory subsidies, and free government startup grants up to ₹30 Lakh.
          </p>

          <div className="grid grid-cols-2 gap-2 text-xs pt-1">
            <div className="flex items-center gap-1.5 text-slate-200">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981] shrink-0" />
              <span>Loans up to ₹5 Cr</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-200">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981] shrink-0" />
              <span>Grants up to ₹30L</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-200">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981] shrink-0" />
              <span>10%–25% Subsidies</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-200">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981] shrink-0" />
              <span>Zero Property Needed</span>
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-2">
            <Link
              to="/business-funding"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#D4A238] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#0B1F3B] hover:bg-[#E5B54E] transition-colors"
            >
              <span>Explore Funding</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-xs font-semibold text-white hover:bg-white/10 transition-colors"
            >
              <Phone className="h-3.5 w-3.5 text-[#D4A238]" />
              <span>Talk on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-gradient-to-b from-[#F8FBFF] via-white to-[#F8FBFF] py-20 border-y border-[#E2E8F0]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A238]/40 bg-[#D4A238]/10 px-3.5 py-1 text-xs font-semibold text-[#B8860B] mb-3">
              <Landmark className="h-3.5 w-3.5" />
              <span>Gujarat Business Funding • Ahmedabad, Sanand &amp; GIDC Areas</span>
            </div>
            <h2 className="text-3xl font-extrabold text-[#0F1E2F] sm:text-4xl tracking-tight">
              {title}
            </h2>
            <p className="mt-3 text-sm text-[#53637C] leading-relaxed">
              {subtitle}
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-3">
            <Link
              to="/business-funding"
              className="btn-gold text-xs uppercase tracking-wider py-3 px-5 rounded-lg font-bold shadow-gold flex items-center gap-2 group"
            >
              <span>Explore All Funding Schemes</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* 4 Loan & Funding Pillars Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Pillar 1: CGTMSE Collateral-Free Business Loans */}
          <div className="service-card p-6 flex flex-col justify-between group hover:border-[#D4A238] transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#0B1F3B] text-[#D4A238]">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-bold text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded border border-[#10B981]/20">
                  No Property Needed
                </span>
              </div>
              <h3 className="text-base font-bold text-[#0F1E2F] group-hover:text-[#B8860B] transition-colors">
                Collateral-Free Bank Loans (CGTMSE)
              </h3>
              <div className="text-xs font-semibold text-[#B8860B] mt-1">Up to ₹5 Crore Bank Loan</div>
              <p className="text-xs text-[#53637C] mt-2.5 leading-relaxed">
                Get working capital, CC limit, and machinery loans from top banks without mortgaging your house, shop, or family land. The government guarantees your loan to the bank.
              </p>
              <ul className="mt-3 pt-3 border-t border-[#E2E8F0] space-y-1.5 text-[11px] text-[#53637C]">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-[#10B981] shrink-0" />
                  <span>75% to 85% government guarantee for banks</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-[#10B981] shrink-0" />
                  <span>For manufacturing, trade &amp; service businesses</span>
                </li>
              </ul>
            </div>
            <div className="mt-5 pt-3 border-t border-[#E2E8F0]">
              <Link
                to="/business-funding"
                search={{ tab: "calculator" }}
                className="text-xs font-bold text-[#0B1F3B] group-hover:text-[#B8860B] flex items-center gap-1 transition-colors"
              >
                <span>Check Loan Eligibility</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* Pillar 2: Startup Grants & SISFS */}
          <div className="service-card p-6 flex flex-col justify-between group hover:border-[#D4A238] transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#0B1F3B] text-[#D4A238]">
                  <Award className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-bold text-[#D4A238] bg-[#D4A238]/10 px-2 py-0.5 rounded border border-[#D4A238]/30">
                  100% Free Grant
                </span>
              </div>
              <h3 className="text-base font-bold text-[#0F1E2F] group-hover:text-[#B8860B] transition-colors">
                Government Startup Grants
              </h3>
              <div className="text-xs font-semibold text-[#B8860B] mt-1">Up to ₹30 Lakh Free Support</div>
              <p className="text-xs text-[#53637C] mt-2.5 leading-relaxed">
                Get free grant money under Startup Gujarat and Startup India schemes through approved incubators. You keep 100% ownership of your company and never repay this money.
              </p>
              <ul className="mt-3 pt-3 border-t border-[#E2E8F0] space-y-1.5 text-[11px] text-[#53637C]">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-[#10B981] shrink-0" />
                  <span>₹20,000–₹25,000 monthly living support for founders</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-[#10B981] shrink-0" />
                  <span>Up to ₹10 Lakh to build your product prototype</span>
                </li>
              </ul>
            </div>
            <div className="mt-5 pt-3 border-t border-[#E2E8F0]">
              <Link
                to="/business-funding"
                search={{ tab: "services" }}
                className="text-xs font-bold text-[#0B1F3B] group-hover:text-[#B8860B] flex items-center gap-1 transition-colors"
              >
                <span>Explore Startup Grants</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* Pillar 3: Gujarat Industrial Policy Subsidies */}
          <div className="service-card p-6 flex flex-col justify-between group hover:border-[#D4A238] transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#0B1F3B] text-[#D4A238]">
                  <Building2 className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  Gujarat Govt Subsidy
                </span>
              </div>
              <h3 className="text-base font-bold text-[#0F1E2F] group-hover:text-[#B8860B] transition-colors">
                Factory &amp; Machinery Subsidies
              </h3>
              <div className="text-xs font-semibold text-[#B8860B] mt-1">10%–25% Subsidy + Cheaper Interest</div>
              <p className="text-xs text-[#53637C] mt-2.5 leading-relaxed">
                Get direct government subsidies on new factory machines and up to 7% annual discount on your loan interest through District Industries Centres (DIC) in Gujarat.
              </p>
              <ul className="mt-3 pt-3 border-t border-[#E2E8F0] space-y-1.5 text-[11px] text-[#53637C]">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-[#10B981] shrink-0" />
                  <span>Sanand, Naroda, Changodar &amp; GIDC factories</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-[#10B981] shrink-0" />
                  <span>Discounts on electricity bills and stamp duty</span>
                </li>
              </ul>
            </div>
            <div className="mt-5 pt-3 border-t border-[#E2E8F0]">
              <Link
                to="/business-funding"
                search={{ tab: "locations" }}
                className="text-xs font-bold text-[#0B1F3B] group-hover:text-[#B8860B] flex items-center gap-1 transition-colors"
              >
                <span>View Gujarat Subsidies</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* Pillar 4: Venture Capital & Angel Syndication */}
          <div className="service-card p-6 flex flex-col justify-between group hover:border-[#D4A238] transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#0B1F3B] text-[#D4A238]">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                  Investor Funding
                </span>
              </div>
              <h3 className="text-base font-bold text-[#0F1E2F] group-hover:text-[#B8860B] transition-colors">
                Investor Funding (Angel &amp; VC)
              </h3>
              <div className="text-xs font-semibold text-[#B8860B] mt-1">Seed to Series A Investment</div>
              <p className="text-xs text-[#53637C] mt-2.5 leading-relaxed">
                Get your business numbers, presentation deck, and company valuation ready to raise money from angel investors and venture funds in Ahmedabad and across India.
              </p>
              <ul className="mt-3 pt-3 border-t border-[#E2E8F0] space-y-1.5 text-[11px] text-[#53637C]">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-[#10B981] shrink-0" />
                  <span>Professional investor presentation &amp; valuation</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-[#10B981] shrink-0" />
                  <span>Clean digital records for investor review</span>
                </li>
              </ul>
            </div>
            <div className="mt-5 pt-3 border-t border-[#E2E8F0]">
              <Link
                to="/business-funding"
                search={{ tab: "blogs" }}
                className="text-xs font-bold text-[#0B1F3B] group-hover:text-[#B8860B] flex items-center gap-1 transition-colors"
              >
                <span>Learn About Investor Funding</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* 30-Second Screener Bar */}
        <div className="mt-10 rounded-2xl border border-[#D4A238]/30 bg-[#0B1F3B] p-6 sm:p-8 text-white relative overflow-hidden shadow-lg">
          <div
            className="pointer-events-none absolute inset-0 opacity-15"
            style={{
              background: "linear-gradient(115deg, #0B1F3B 0%, #132F55 50%, #D4A238 100%)",
            }}
            aria-hidden="true"
          />
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D4A238] uppercase tracking-wider mb-2">
                <Calculator className="h-4 w-4" />
                <span>30-Second Free Online Check</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Not Sure Which Loan or Grant Scheme Fits Your Business?
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-300">
                Answer 4 simple questions about your company to see which bank loan, government grant, or Gujarat subsidy you qualify for in just 30 seconds.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                to="/business-funding"
                search={{ tab: "calculator" }}
                className="btn-gold text-xs uppercase tracking-wider py-3 px-5 rounded-lg font-bold shadow-gold flex items-center gap-2"
              >
                <span>Check My Eligibility in 30 Seconds</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost-dark border border-white/25 text-xs uppercase tracking-wider py-3 px-4 rounded-lg font-semibold flex items-center gap-2 hover:bg-white/10"
              >
                <Phone className="h-3.5 w-3.5 text-[#D4A238]" />
                <span>Ask on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

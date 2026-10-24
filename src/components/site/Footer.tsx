import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { Mail, MapPin, Phone, ShieldCheck, ArrowRight, MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "./WhatsAppFab";
import { SocialLinks } from "./SocialLinks";

const solutionLinks = [
  { to: "/solutions/growth-revenue", label: "Growth & Revenue" },
  { to: "/solutions/finance-capital-readiness", label: "Finance & Capital Readiness" },
  { to: "/solutions/technology-product-ai", label: "Technology, Product & AI" },
  { to: "/solutions/people-operations", label: "People & Operations" },
  { to: "/solutions/founder-team-performance", label: "Founder & Team Performance" },
];

const leaderLinks = [
  { to: "/fractional-leaders/cfo", label: "Fractional CFO" },
  { to: "/fractional-leaders/cmo", label: "Fractional CMO" },
  { to: "/fractional-leaders/cto", label: "Fractional CTO" },
  { to: "/fractional-leaders/coo", label: "Fractional COO" },
  { to: "/fractional-leaders/chro", label: "Fractional CHRO" },
  { to: "/fractional-leaders/cro", label: "Fractional CRO" },
  { to: "/fractional-leaders/caio", label: "Fractional CAIO" },
  { to: "/fractional-leaders/cpo", label: "Fractional CPO" },
];

const industryLinks = [
  { to: "/industries/startups", label: "Startups" },
  { to: "/industries/smes-family-businesses", label: "SMEs & Family Businesses" },
  { to: "/industries/fmcg-d2c", label: "FMCG & D2C" },
  { to: "/industries/saas-technology", label: "SaaS & Technology" },
  { to: "/industries/professional-services", label: "Professional Services" },
  { to: "/industries/manufacturing", label: "Manufacturing" },
];

const resourceLinks = [
  { to: "/offers", label: "Productised Offers" },
  { to: "/how-it-works", label: "Rise Delivery Method" },
  { to: "/case-studies", label: "Results & Case Studies" },
  { to: "/experts", label: "Vetted Expert Bench" },
  { to: "/resources", label: "Resource Library & Tools" },
  { to: "/resources/cost-calculator", label: "Fractional Cost Calculator" },
  { to: "/resources/templates", label: "Executive Templates" },
  { to: "/prompts", label: "Tactical AI Prompts Library" },
  { to: "/business-funding", label: "Business Loans & Startup Funding (Gujarat)" },
  { to: "/faqs", label: "Frequently Asked Questions" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const waUrl = getWhatsAppUrl(
    "Hello Rise Advisory, I would like to learn more about your fractional leadership services.",
  );

  return (
    <footer
      className="border-t border-[#132F55] bg-[#0B1F3B] text-[#D1D7DF] relative overflow-hidden"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Rise Advisory site footer
      </h2>
      <div className="absolute inset-0 navy-diagonal-texture pointer-events-none" aria-hidden />

      {/* Top Value Banner */}
      <div className="relative border-b border-[#132F55] bg-[#0E2A4D]">
        <div className="mx-auto max-w-7xl px-6 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="badge-navy mb-2">Outcome-Driven Executive Advisory</span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
              Build Your Next Stage{" "}
              <span className="text-[#D4A238]">Without Hiring an Entire C-Suite.</span>
            </h3>
            <p className="mt-2 text-sm text-[#D1D7DF]/85 leading-relaxed">
              Rise Advisory connects growing businesses with fractional CXOs and vetted specialists
              across growth, finance, technology, people, and operations—combining senior
              leadership, hands-on execution, and measurable milestones.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/book-diagnostic"
              className="btn-gold text-xs uppercase tracking-wider py-3 px-5 rounded-lg font-bold shadow-gold flex items-center gap-2"
            >
              <span>Book a Diagnostic</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="tel:+919313967971"
              className="btn-ghost-dark border border-white/20 text-xs uppercase tracking-wider py-3 px-4 rounded-lg font-semibold flex items-center gap-2"
            >
              <Phone className="h-4 w-4 text-[#D4A238]" />
              <span>+91 93139 67971</span>
            </a>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-4 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-[#1ebe5d] transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp Message</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Links Grid */}
      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand Column (spans 2 on large screens) */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="footer" />
            <p className="text-xs text-[#D1D7DF]/85 leading-relaxed max-w-sm">
              Outcome-led Fractional C-Suite and Business Growth Advisory for founders, startups,
              SMEs, and growth-stage companies across India and emerging markets.
            </p>

            {/* Social Media Channels */}
            <div className="pt-1">
              <div className="text-[11px] font-bold text-[#D4A238] uppercase tracking-wider mb-2.5">
                Official Channels
              </div>
              <SocialLinks variant="footer-icons" />
            </div>

            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 text-[11px] text-[#D4A238] font-medium bg-[#132F55] px-3 py-1.5 rounded-lg border border-[#D4A238]/30 shadow-xs">
                <ShieldCheck className="h-3.5 w-3.5 text-[#D4A238]" />
                <span>The Rise Execution Guarantee</span>
              </span>
            </div>
          </div>

          {/* Solutions Column */}
          <div className="lg:col-span-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Five Solution Pillars
            </h4>
            <ul className="space-y-2.5 text-xs">
              {solutionLinks.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-[#D1D7DF]/80 hover:text-[#D4A238] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  to="/solutions"
                  className="text-[#D4A238] hover:underline font-semibold flex items-center gap-1"
                >
                  All Solutions Hub <ArrowRight className="h-3 w-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Fractional Leaders Column */}
          <div className="lg:col-span-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Fractional Leaders
            </h4>
            <ul className="space-y-2 text-xs">
              {leaderLinks.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-[#D1D7DF]/80 hover:text-[#D4A238] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  to="/fractional-leaders"
                  className="text-[#D4A238] hover:underline font-semibold flex items-center gap-1"
                >
                  Full Role Catalogue <ArrowRight className="h-3 w-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Industries Column */}
          <div className="lg:col-span-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Industry Solutions
            </h4>
            <ul className="space-y-2.5 text-xs">
              {industryLinks.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-[#D1D7DF]/80 hover:text-[#D4A238] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  to="/industries"
                  className="text-[#D4A238] hover:underline font-semibold flex items-center gap-1"
                >
                  Industry Overview <ArrowRight className="h-3 w-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Resources Column */}
          <div className="lg:col-span-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Company &amp; Resources
            </h4>
            <ul className="space-y-2 text-xs">
              {resourceLinks.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-[#D1D7DF]/80 hover:text-[#D4A238] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/about"
                  className="text-[#D1D7DF]/80 hover:text-[#D4A238] transition-colors"
                >
                  About Rise Advisory
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-[#A7B3CB] hover:text-[#D4A238] transition-colors">
                  Executive Admin Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Executive Headquarters & Direct Contact Strip */}
        <div className="mt-12 rounded-xl border border-[#132F55] bg-[#0E2A4D]/80 p-5 shadow-sm">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-xs">
            {/* Office Address */}
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#132F55] text-[#D4A238]">
                <MapPin className="h-4 w-4" />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#D4A238]">
                  Corporate Headquarters
                </div>
                <p className="mt-0.5 text-white/90 leading-snug">
                  E 1119 Ganesh Glory 11, Jagatpur, Gota, Ahmedabad, Gujarat 382470
                </p>
              </div>
            </div>

            {/* Direct Phone */}
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#132F55] text-[#D4A238]">
                <Phone className="h-4 w-4" />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#D4A238]">
                  Direct Phone Line
                </div>
                <a
                  href="tel:+919313967971"
                  className="mt-0.5 block text-white/90 hover:text-[#D4A238] transition-colors font-semibold"
                >
                  +91 93139 67971
                </a>
                <span className="text-[10px] text-[#A7B3CB]">Mon–Sat &bull; 9 AM – 7 PM IST</span>
              </div>
            </div>

            {/* Direct WhatsApp */}
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#132F55] text-[#25D366]">
                <MessageCircle className="h-4 w-4" />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#25D366]">
                  Instant WhatsApp
                </div>
                <a
                  href="https://wa.me/919313967971?text=Hello%20Rise%20Advisory"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-0.5 block text-white/90 hover:text-[#25D366] transition-colors font-semibold"
                >
                  +91 93139 67971
                </a>
                <span className="text-[10px] text-[#A7B3CB]">Confidential advisory queries</span>
              </div>
            </div>

            {/* Executive Email */}
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#132F55] text-[#D4A238]">
                <Mail className="h-4 w-4" />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#D4A238]">
                  Official Email
                </div>
                <a
                  href="mailto:hello@riseadvisory.co"
                  className="mt-0.5 block text-white/90 hover:text-[#D4A238] transition-colors font-semibold"
                >
                  hello@riseadvisory.co
                </a>
                <span className="text-[10px] text-[#A7B3CB]">Partnerships &amp; Engagements</span>
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory Disclaimer Notice */}
        <div className="mt-6 rounded-lg border border-[#132F55] bg-[#0E2A4D]/50 p-4 text-[11px] text-[#D1D7DF]/75 leading-relaxed shadow-xs">
          <strong className="text-white/90 font-semibold">
            Regulatory Scope &amp; Advisory Notice:
          </strong>{" "}
          Rise Advisory provides management consulting, fractional executive leadership, and
          business growth advisory. Rise Advisory is not a licensed banking institution, investment
          advisor, chartered accountancy audit firm, or law firm. All regulated finance, tax audit,
          legal opinion, loan syndication, and IPO-filing services are coordinated with or delivered
          exclusively by licensed and registered partner professionals. No communication from Rise
          Advisory constitutes a guarantee of investment, funding, loan sanction, or specific market
          returns.
        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="mt-8 pt-8 border-t border-[#132F55] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#A7B3CB]">
          <div>
            &copy; {currentYear} Rise Advisory. All rights reserved. E 1119 Ganesh Glory 11,
            Jagatpur, Gota, Ahmedabad, Gujarat 382470.
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-[#D4A238] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className="hover:text-[#D4A238] transition-colors">
              Terms of Use
            </Link>
            <Link to="/disclaimer" className="hover:text-[#D4A238] transition-colors">
              Disclaimer
            </Link>
            <Link to="/partner-standards" className="hover:text-[#D4A238] transition-colors">
              Partner Standards
            </Link>
            <Link to="/admin/login" className="hover:text-[#D4A238] transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

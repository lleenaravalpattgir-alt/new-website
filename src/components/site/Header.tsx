import { Link } from "@tanstack/react-router";
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Cpu,
  Users,
  HeartHandshake,
  Phone,
  MessageCircle,
  Layers,
  MapPin,
  BookOpen,
  Calculator,
  FileText,
  HelpCircle,
  Landmark,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Logo } from "./Logo";

const solutionLinks = [
  {
    to: "/solutions/growth-revenue",
    label: "Growth & Revenue",
    desc: "Fractional CMO, CRO, GTM, pipeline & CAC discipline",
    icon: TrendingUp,
  },
  {
    to: "/solutions/finance-capital-readiness",
    label: "Finance & Capital Readiness",
    desc: "Fractional CFO, 13-week cash flow, MIS & data rooms",
    icon: DollarSign,
  },
  {
    to: "/solutions/technology-product-ai",
    label: "Technology, Product & AI",
    desc: "Fractional CTO, CAIO, automation & cloud architecture",
    icon: Cpu,
  },
  {
    to: "/solutions/people-operations",
    label: "People & Operations",
    desc: "Fractional COO, CHRO, SOPs & performance management",
    icon: Users,
  },
  {
    to: "/solutions/founder-team-performance",
    label: "Founder & Team Performance",
    desc: "Executive coaching, board alignment & workplace wellbeing",
    icon: HeartHandshake,
  },
];

const leaderLinks = [
  {
    to: "/fractional-leaders/cfo",
    code: "CFO",
    label: "Fractional CFO",
    desc: "Cash-flow modeling, MIS & capital readiness",
  },
  {
    to: "/fractional-leaders/cmo",
    code: "CMO",
    label: "Fractional CMO",
    desc: "Positioning, customer acquisition & brand",
  },
  {
    to: "/fractional-leaders/cto",
    code: "CTO",
    label: "Fractional CTO",
    desc: "Architecture, tech stack & dev team leadership",
  },
  {
    to: "/fractional-leaders/coo",
    code: "COO",
    label: "Fractional COO",
    desc: "SOPs, operational cadence & founder delegation",
  },
  {
    to: "/fractional-leaders/chro",
    code: "CHRO",
    label: "Fractional CHRO",
    desc: "Culture, performance management & hiring",
  },
  {
    to: "/fractional-leaders/cro",
    code: "CRO",
    label: "Fractional CRO",
    desc: "Sales playbook, pipeline velocity & deal closing",
  },
  {
    to: "/fractional-leaders/caio",
    code: "CAIO",
    label: "Fractional CAIO",
    desc: "Enterprise AI adoption & workflow automation",
  },
  {
    to: "/fractional-leaders/cpo",
    code: "CPO",
    label: "Fractional CPO",
    desc: "Product-market fit, onboarding & user retention",
  },
];

const industryLinks = [
  { to: "/industries/startups", label: "Startups", desc: "Funded & Seed-to-Series-B ventures" },
  {
    to: "/industries/smes-family-businesses",
    label: "SMEs & Family Businesses",
    desc: "Professionalizing governance & scaling",
  },
  {
    to: "/industries/fmcg-d2c",
    label: "FMCG & D2C",
    desc: "Omnichannel distribution & unit margins",
  },
  {
    to: "/industries/saas-technology",
    label: "SaaS & Technology",
    desc: "Enterprise sales & cloud architecture",
  },
  {
    to: "/industries/professional-services",
    label: "Professional Services",
    desc: "Productizing services & utilization",
  },
  {
    to: "/industries/manufacturing",
    label: "Manufacturing",
    desc: "Working capital & shop-floor efficiency",
  },
];

const fundingLinks = [
  {
    to: "/business-funding",
    search: { tab: "services" },
    label: "Core Portfolios",
    badge: "7",
    badgeColor: "bg-[#D4A238]/15 text-[#B8860B]",
    desc: "Bank loans up to ₹5 Cr, startup grants & working capital",
    icon: Layers,
  },
  {
    to: "/business-funding",
    search: { tab: "locations" },
    label: "Gujarat & Ahmedabad Hub",
    badge: "Local",
    badgeColor: "bg-emerald-50 text-emerald-700 border border-emerald-200/60",
    desc: "Subsidies for factories in Sanand, Naroda & GIDC areas",
    icon: MapPin,
  },
  {
    to: "/business-funding",
    search: { tab: "blogs" },
    label: "Funding Guides",
    badge: "6",
    badgeColor: "bg-slate-100 text-slate-700 border border-slate-200",
    desc: "Simple guides on bank loans, seed grants & investor funds",
    icon: BookOpen,
  },
  {
    to: "/business-funding",
    search: { tab: "calculator" },
    label: "Eligibility Screener",
    badge: "30s Tool",
    badgeColor: "bg-blue-50 text-blue-700 border border-blue-200/60",
    desc: "Check which loan or grant you qualify for in 30 seconds",
    icon: Calculator,
  },
  {
    to: "/business-funding",
    search: { tab: "checklist" },
    label: "Document Checklists",
    badge: "Checklist",
    badgeColor: "bg-amber-50 text-amber-800 border border-amber-200/60",
    desc: "Simple list of documents needed for bank loans & grants",
    icon: FileText,
  },
  {
    to: "/business-funding",
    search: { tab: "faqs" },
    label: "Regulatory FAQs",
    badge: "RBI & DIC",
    badgeColor: "bg-slate-100 text-slate-700 border border-slate-200",
    desc: "Common questions on CIBIL scores, banks & government rules",
    icon: HelpCircle,
  },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [leadersOpen, setLeadersOpen] = useState(false);
  const [fundingOpen, setFundingOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);

  const [mobileSolutions, setMobileSolutions] = useState(false);
  const [mobileLeaders, setMobileLeaders] = useState(false);
  const [mobileFunding, setMobileFunding] = useState(false);
  const [mobileIndustries, setMobileIndustries] = useState(false);

  const solutionsRef = useRef<HTMLDivElement>(null);
  const leadersRef = useRef<HTMLDivElement>(null);
  const fundingRef = useRef<HTMLDivElement>(null);
  const industriesRef = useRef<HTMLDivElement>(null);

  const closeAllDropdowns = () => {
    setSolutionsOpen(false);
    setLeadersOpen(false);
    setFundingOpen(false);
    setIndustriesOpen(false);
  };

  const openDropdown = (type: "solutions" | "leaders" | "funding" | "industries") => {
    setSolutionsOpen(type === "solutions");
    setLeadersOpen(type === "leaders");
    setFundingOpen(type === "funding");
    setIndustriesOpen(type === "industries");
  };

  // Close desktop dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (solutionsRef.current && !solutionsRef.current.contains(event.target as Node)) {
        setSolutionsOpen(false);
      }
      if (leadersRef.current && !leadersRef.current.contains(event.target as Node)) {
        setLeadersOpen(false);
      }
      if (fundingRef.current && !fundingRef.current.contains(event.target as Node)) {
        setFundingOpen(false);
      }
      if (industriesRef.current && !industriesRef.current.contains(event.target as Node)) {
        setIndustriesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-[#E2E8F0] bg-white/95 backdrop-blur-md transition-all shadow-xs">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 xl:gap-8 px-4 sm:px-6 xl:px-8 py-2.5 sm:py-3">
        {/* Brand Logo — Perfectly Aligned with Generous Breathing Space */}
        <Logo className="shrink-0 inline-flex items-center -translate-y-0.5 mr-2 xl:mr-4" imgClassName="h-9 sm:h-10 xl:h-[42px] object-contain" />

        {/* Desktop Navigation — Refined Typography, Word Spacing & Unified Baseline */}
        <nav className="hidden items-center gap-1 xl:gap-1.5 2xl:gap-2.5 lg:flex text-[13.5px] xl:text-[14px] font-semibold tracking-normal [word-spacing:0.04em] text-[#0F1E2F]">
          {/* Solutions Dropdown */}
          <div className="relative" ref={solutionsRef}>
            <button
              onClick={() => {
                const next = !solutionsOpen;
                closeAllDropdowns();
                setSolutionsOpen(next);
              }}
              onMouseEnter={() => openDropdown("solutions")}
              className={`whitespace-nowrap h-9 inline-flex items-center justify-center gap-1.5 px-2.5 xl:px-3 rounded-lg leading-none transition-colors ${
                solutionsOpen
                  ? "text-[#B8860B] bg-[#EEF4FA]"
                  : "hover:text-[#B8860B] hover:bg-[#EEF4FA]/80"
              }`}
            >
              <span>Solutions</span>
              <ChevronDown
                className={`h-3.5 w-3.5 shrink-0 transition-transform duration-200 ${solutionsOpen ? "rotate-180 text-[#B8860B]" : "text-[#53637C]"}`}
              />
            </button>

            {solutionsOpen && (
              <div
                onMouseLeave={() => setSolutionsOpen(false)}
                className="absolute left-0 mt-1 w-96 rounded-xl border border-[#E2E8F0] bg-white p-3 shadow-2xl backdrop-blur-lg animate-in fade-in slide-in-from-top-2 duration-150 z-50"
              >
                <div className="px-3 py-2 border-b border-[#E2E8F0] mb-2 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#B8860B]">
                    Five Core Pillars
                  </span>
                  <Link
                    to="/solutions"
                    onClick={() => setSolutionsOpen(false)}
                    className="text-xs text-[#53637C] hover:text-[#B8860B] flex items-center gap-1"
                  >
                    All Solutions <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
                <div className="space-y-1">
                  {solutionLinks.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setSolutionsOpen(false)}
                      className="group flex items-start gap-3 rounded-lg p-2.5 transition-colors hover:bg-[#F8FBFF]"
                    >
                      <div className="p-2 rounded-md bg-[#EEF4FA] text-[#B8860B] group-hover:bg-[#D4A238] group-hover:text-[#0B1F38] transition-colors mt-0.5">
                        <item.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-[#0F1E2F] group-hover:text-[#B8860B] transition-colors">
                          {item.label}
                        </div>
                        <div className="text-xs text-[#53637C] line-clamp-1 mt-0.5">
                          {item.desc}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Fractional Leaders Dropdown */}
          <div className="relative" ref={leadersRef}>
            <button
              onClick={() => {
                const next = !leadersOpen;
                closeAllDropdowns();
                setLeadersOpen(next);
              }}
              onMouseEnter={() => openDropdown("leaders")}
              className={`whitespace-nowrap h-9 inline-flex items-center justify-center gap-1.5 px-2.5 xl:px-3 rounded-lg leading-none transition-colors ${
                leadersOpen
                  ? "text-[#B8860B] bg-[#EEF4FA]"
                  : "hover:text-[#B8860B] hover:bg-[#EEF4FA]/80"
              }`}
            >
              <span>Fractional Leaders</span>
              <ChevronDown
                className={`h-3.5 w-3.5 shrink-0 transition-transform duration-200 ${leadersOpen ? "rotate-180 text-[#B8860B]" : "text-[#53637C]"}`}
              />
            </button>

            {leadersOpen && (
              <div
                onMouseLeave={closeAllDropdowns}
                className="absolute -left-12 mt-1 w-[480px] rounded-xl border border-[#E2E8F0] bg-white p-3 shadow-2xl backdrop-blur-lg animate-in fade-in slide-in-from-top-2 duration-150 z-50"
              >
                <div className="px-3 py-2 border-b border-[#E2E8F0] mb-2 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#B8860B]">
                    Vetted Executive Bench
                  </span>
                  <Link
                    to="/fractional-leaders"
                    onClick={closeAllDropdowns}
                    className="text-xs text-[#53637C] hover:text-[#B8860B] flex items-center gap-1"
                  >
                    Role Catalogue <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {leaderLinks.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={closeAllDropdowns}
                      className="group flex items-start gap-2.5 rounded-lg p-2.5 transition-colors hover:bg-[#F8FBFF]"
                    >
                      <span className="inline-flex items-center justify-center h-7 w-10 text-xs font-bold rounded bg-[#EEF4FA] text-[#0B1F38] border border-[#E2E8F0] group-hover:bg-[#D4A238] group-hover:text-[#0B1F38] transition-colors shrink-0">
                        {item.code}
                      </span>
                      <div className="overflow-hidden">
                        <div className="text-xs font-semibold text-[#0F1E2F] group-hover:text-[#B8860B] transition-colors truncate">
                          {item.label}
                        </div>
                        <div className="text-[11px] text-[#53637C] truncate mt-0.5">
                          {item.desc}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Attached Section: Business Funding & Startup Capital */}
                <div className="mt-2.5 pt-2.5 border-t border-[#E2E8F0] px-3 py-2 bg-[#F8FBFF] rounded-lg flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-[#0F1E2F]">Need Capital for Growth?</div>
                    <div className="text-[11px] text-[#53637C]">
                      MSME Loans, CGTMSE up to ₹5 Cr &amp; Startup Grants
                    </div>
                  </div>
                  <Link
                    to="/business-funding"
                    onClick={closeAllDropdowns}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#B8860B] hover:text-[#0B1F3B] bg-white px-2.5 py-1 rounded border border-[#D4A238]/30 shadow-2xs shrink-0"
                  >
                    Funding Portal <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* How It Works */}
          <Link
            to="/how-it-works"
            onMouseEnter={closeAllDropdowns}
            className="whitespace-nowrap h-9 inline-flex items-center justify-center px-2.5 xl:px-3 rounded-lg leading-none transition-colors hover:text-[#B8860B] hover:bg-[#EEF4FA]/80"
            activeProps={{ className: "text-[#B8860B] font-bold bg-[#D4A238]/10" }}
          >
            <span>How It Works</span>
          </Link>

          {/* Business Funding Dropdown (Mega Menu matching Vetted Executive Bench) */}
          <div className="relative" ref={fundingRef}>
            <button
              onClick={() => {
                const next = !fundingOpen;
                closeAllDropdowns();
                setFundingOpen(next);
              }}
              onMouseEnter={() => openDropdown("funding")}
              className={`whitespace-nowrap h-9 inline-flex items-center justify-center gap-1.5 px-3 rounded-lg leading-none transition-all font-semibold ${
                fundingOpen
                  ? "bg-[#D4A238] text-[#0B1F3B] shadow-xs font-bold border border-[#D4A238]"
                  : "text-[#B8860B] bg-[#D4A238]/12 hover:bg-[#D4A238]/20 border border-[#D4A238]/40"
              }`}
            >
              <span>Business Funding</span>
              <ChevronDown
                className={`h-3.5 w-3.5 shrink-0 transition-transform duration-200 ${fundingOpen ? "rotate-180 text-[#0B1F3B]" : "text-[#B8860B]"}`}
              />
            </button>

            {fundingOpen && (
              <div
                onMouseLeave={closeAllDropdowns}
                className="absolute -left-24 mt-1 w-[530px] rounded-xl border border-[#E2E8F0] bg-white p-3 shadow-2xl backdrop-blur-lg animate-in fade-in slide-in-from-top-2 duration-150 z-50"
              >
                {/* Header title bar matching Vetted Executive Bench */}
                <div className="px-3 py-2 border-b border-[#E2E8F0] mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#B8860B]">
                      Business Funding
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Gujarat &amp; National Hub
                    </span>
                  </div>
                  <Link
                    to="/business-funding"
                    onClick={closeAllDropdowns}
                    className="text-xs text-[#53637C] hover:text-[#B8860B] flex items-center gap-1 font-semibold"
                  >
                    Funding Portal <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>

                {/* 2-Column Grid of 6 items */}
                <div className="grid grid-cols-2 gap-1.5">
                  {fundingLinks.map((item) => (
                    <Link
                      key={item.label}
                      to={item.to}
                      search={item.search}
                      onClick={closeAllDropdowns}
                      className="group flex items-start gap-2.5 rounded-lg p-2.5 transition-colors hover:bg-[#F8FBFF]"
                    >
                      <div className="p-2 rounded-md bg-[#EEF4FA] text-[#0B1F38] group-hover:bg-[#D4A238] group-hover:text-[#0B1F38] transition-colors shrink-0 mt-0.5">
                        <item.icon className="h-4 w-4" />
                      </div>
                      <div className="overflow-hidden">
                        <div className="flex items-center gap-1.5">
                          <div className="text-xs font-semibold text-[#0F1E2F] group-hover:text-[#B8860B] transition-colors truncate">
                            {item.label}
                          </div>
                          {item.badge && (
                            <span
                              className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full shrink-0 ${
                                item.badgeColor || "bg-[#D4A238]/15 text-[#B8860B]"
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-[#53637C] line-clamp-1 mt-0.5">
                          {item.desc}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Attached Bottom Card matching other mega menus */}
                <div className="mt-2.5 pt-2.5 border-t border-[#E2E8F0] px-3 py-2 bg-[#F8FBFF] rounded-lg flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-[#0F1E2F]">
                      Collateral-Free Loans &amp; Government Grants
                    </div>
                    <div className="text-[11px] text-[#53637C]">
                      Bank loans up to ₹5 Cr &bull; Free grants up to ₹30L &bull; Gujarat subsidies
                    </div>
                  </div>
                  <Link
                    to="/business-funding"
                    onClick={closeAllDropdowns}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#B8860B] hover:text-[#0B1F3B] bg-white px-2.5 py-1 rounded border border-[#D4A238]/30 shadow-2xs shrink-0"
                  >
                    View Portal <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Industries Dropdown */}
          <div className="relative" ref={industriesRef}>
            <button
              onClick={() => {
                const next = !industriesOpen;
                closeAllDropdowns();
                setIndustriesOpen(next);
              }}
              onMouseEnter={() => openDropdown("industries")}
              className={`whitespace-nowrap h-9 inline-flex items-center justify-center gap-1.5 px-2.5 xl:px-3 rounded-lg leading-none transition-colors ${
                industriesOpen
                  ? "text-[#B8860B] bg-[#EEF4FA]"
                  : "hover:text-[#B8860B] hover:bg-[#EEF4FA]/80"
              }`}
            >
              <span>Industries</span>
              <ChevronDown
                className={`h-3.5 w-3.5 shrink-0 transition-transform duration-200 ${industriesOpen ? "rotate-180 text-[#B8860B]" : "text-[#53637C]"}`}
              />
            </button>

            {industriesOpen && (
              <div
                onMouseLeave={closeAllDropdowns}
                className="absolute left-0 mt-1 w-80 rounded-xl border border-[#E2E8F0] bg-white p-3 shadow-2xl backdrop-blur-lg animate-in fade-in slide-in-from-top-2 duration-150 z-50"
              >
                <div className="px-3 py-2 border-b border-[#E2E8F0] mb-2 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#B8860B]">
                    Tailored Sector Pods
                  </span>
                  <Link
                    to="/industries"
                    onClick={closeAllDropdowns}
                    className="text-xs text-[#53637C] hover:text-[#B8860B] flex items-center gap-1"
                  >
                    All Sectors <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
                <div className="space-y-1">
                  {industryLinks.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={closeAllDropdowns}
                      className="group flex flex-col rounded-lg p-2.5 transition-colors hover:bg-[#F8FBFF]"
                    >
                      <div className="text-xs font-semibold text-[#0F1E2F] group-hover:text-[#B8860B] transition-colors">
                        {item.label}
                      </div>
                      <div className="text-[11px] text-[#53637C]">{item.desc}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Results */}
          <Link
            to="/case-studies"
            onMouseEnter={closeAllDropdowns}
            className="whitespace-nowrap h-9 inline-flex items-center justify-center px-2.5 xl:px-3 rounded-lg leading-none transition-colors hover:text-[#B8860B] hover:bg-[#EEF4FA]/80"
            activeProps={{ className: "text-[#B8860B] font-bold bg-[#D4A238]/10" }}
          >
            <span>Results</span>
          </Link>

          {/* Insights */}
          <Link
            to="/insights"
            onMouseEnter={closeAllDropdowns}
            className="whitespace-nowrap h-9 inline-flex items-center justify-center px-2.5 xl:px-3 rounded-lg leading-none transition-colors hover:text-[#B8860B] hover:bg-[#EEF4FA]/80"
            activeProps={{ className: "text-[#B8860B] font-bold bg-[#D4A238]/10" }}
          >
            <span>Insights</span>
          </Link>

          {/* About */}
          <Link
            to="/about"
            onMouseEnter={closeAllDropdowns}
            className="whitespace-nowrap h-9 inline-flex items-center justify-center px-2.5 xl:px-3 rounded-lg leading-none transition-colors hover:text-[#B8860B] hover:bg-[#EEF4FA]/80"
            activeProps={{ className: "text-[#B8860B] font-bold bg-[#D4A238]/10" }}
          >
            <span>About</span>
          </Link>

          {/* Contact */}
          <Link
            to="/contact"
            onMouseEnter={closeAllDropdowns}
            className="whitespace-nowrap h-9 inline-flex items-center justify-center px-2.5 xl:px-3 rounded-lg leading-none transition-colors hover:text-[#B8860B] hover:bg-[#EEF4FA]/80"
            activeProps={{ className: "text-[#B8860B] font-bold bg-[#D4A238]/10" }}
          >
            <span>Contact</span>
          </Link>
        </nav>

        {/* Right CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/book-diagnostic"
            className="btn-gold h-9 inline-flex items-center justify-center text-xs xl:text-[13px] tracking-wide px-4 rounded-lg font-bold shadow-gold gap-2 group shrink-0 leading-none"
          >
            <span>Book a Diagnostic</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 shrink-0" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          aria-label="Toggle navigation menu"
          className="lg:hidden rounded-lg border border-[#E2E8F0] p-2 text-[#0F1E2F] hover:bg-[#F1F5F9]"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="border-t border-[#E2E8F0] bg-white px-6 py-5 lg:hidden max-h-[85vh] overflow-y-auto shadow-xl">
          <div className="flex flex-col space-y-3 text-base font-medium text-[#0F1E2F]">
            {/* Mobile Solutions Accordion */}
            <div>
              <button
                onClick={() => setMobileSolutions(!mobileSolutions)}
                className="flex items-center justify-between w-full py-2 hover:text-[#B8860B]"
              >
                <span>Solutions</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${mobileSolutions ? "rotate-180 text-[#B8860B]" : ""}`}
                />
              </button>
              {mobileSolutions && (
                <div className="pl-4 space-y-2 mt-1 border-l-2 border-[#D4A238]/40 py-2">
                  <Link
                    to="/solutions"
                    onClick={() => setMobileOpen(false)}
                    className="block text-xs font-bold text-[#B8860B] uppercase py-1"
                  >
                    All Solutions Overview →
                  </Link>
                  {solutionLinks.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setMobileOpen(false)}
                      className="block text-sm py-1 text-[#53637C] hover:text-[#B8860B]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Fractional Leaders Accordion */}
            <div>
              <button
                onClick={() => setMobileLeaders(!mobileLeaders)}
                className="flex items-center justify-between w-full py-2 hover:text-[#B8860B]"
              >
                <span>Fractional Leaders</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${mobileLeaders ? "rotate-180 text-[#B8860B]" : ""}`}
                />
              </button>
              {mobileLeaders && (
                <div className="pl-4 space-y-2 mt-1 border-l-2 border-[#D4A238]/40 py-2">
                  <Link
                    to="/fractional-leaders"
                    onClick={() => setMobileOpen(false)}
                    className="block text-xs font-bold text-[#B8860B] uppercase py-1"
                  >
                    All Fractional CXOs →
                  </Link>
                  {leaderLinks.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setMobileOpen(false)}
                      className="block text-sm py-1 text-[#53637C] hover:text-[#B8860B]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/how-it-works"
              onClick={() => setMobileOpen(false)}
              className="py-2 hover:text-[#B8860B]"
            >
              How It Works
            </Link>

            {/* Mobile Business Funding Accordion */}
            <div>
              <button
                onClick={() => setMobileFunding(!mobileFunding)}
                className="flex items-center justify-between w-full py-2 hover:text-[#B8860B]"
              >
                <span className="font-semibold text-[#B8860B]">Business Funding</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${mobileFunding ? "rotate-180 text-[#B8860B]" : ""}`}
                />
              </button>
              {mobileFunding && (
                <div className="pl-4 space-y-2 mt-1 border-l-2 border-[#D4A238]/40 py-2">
                  <Link
                    to="/business-funding"
                    onClick={() => setMobileOpen(false)}
                    className="block text-xs font-bold text-[#B8860B] uppercase py-1"
                  >
                    Main Funding Portal Overview →
                  </Link>
                  {fundingLinks.map((item) => (
                    <Link
                      key={item.label}
                      to={item.to}
                      search={item.search}
                      onClick={() => setMobileOpen(false)}
                      className="block text-sm py-1 text-[#53637C] hover:text-[#B8860B]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Industries Accordion */}
            <div>
              <button
                onClick={() => setMobileIndustries(!mobileIndustries)}
                className="flex items-center justify-between w-full py-2 hover:text-[#B8860B]"
              >
                <span>Industries</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${mobileIndustries ? "rotate-180 text-[#B8860B]" : ""}`}
                />
              </button>
              {mobileIndustries && (
                <div className="pl-4 space-y-2 mt-1 border-l-2 border-[#D4A238]/40 py-2">
                  <Link
                    to="/industries"
                    onClick={() => setMobileOpen(false)}
                    className="block text-xs font-bold text-[#B8860B] uppercase py-1"
                  >
                    All Industry Hubs →
                  </Link>
                  {industryLinks.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setMobileOpen(false)}
                      className="block text-sm py-1 text-[#53637C] hover:text-[#B8860B]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/case-studies"
              onClick={() => setMobileOpen(false)}
              className="py-2 hover:text-[#B8860B]"
            >
              Results
            </Link>

            <Link
              to="/insights"
              onClick={() => setMobileOpen(false)}
              className="py-2 hover:text-[#B8860B]"
            >
              Insights
            </Link>

            <Link
              to="/about"
              onClick={() => setMobileOpen(false)}
              className="py-2 hover:text-[#B8860B]"
            >
              About
            </Link>

            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="py-2 hover:text-[#B8860B]"
            >
              Contact
            </Link>

            {/* Mobile Contact & Social Actions */}
            <div className="pt-4 mt-2 border-t border-[#E2E8F0] space-y-2.5">
              <a
                href="tel:+919313967971"
                className="flex items-center gap-2.5 text-sm font-semibold text-[#0F1E2F] hover:text-[#B8860B] transition-colors py-1.5"
              >
                <Phone className="h-4 w-4 text-[#B8860B]" />
                <span>Call +91 93139 67971</span>
              </a>

              <a
                href="https://wa.me/919313967971?text=Hello%20Rise%20Advisory,%20I%20would%20like%20to%20discuss%20fractional%20leadership."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm font-semibold text-[#25D366] hover:text-[#1ebe5d] transition-colors py-1.5"
              >
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp (+91 93139 67971)</span>
              </a>
            </div>

            <div className="pt-3">
              <Link
                to="/book-diagnostic"
                onClick={() => setMobileOpen(false)}
                className="btn-gold w-full text-center text-sm uppercase tracking-wider py-3 rounded-lg font-bold shadow-gold block"
              >
                Book a Growth Diagnostic
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

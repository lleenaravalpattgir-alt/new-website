import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import {
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  DollarSign,
  Cpu,
  Users,
  HeartHandshake,
  CheckCircle2,
  AlertTriangle,
  Compass,
  Rocket,
  Target,
  BarChart3,
  Search,
  HelpCircle,
  FileText,
  Calculator,
  Brain,
  Layers,
  ChevronDown,
  Sparkles,
  Landmark,
  Building2,
  Coins,
  Award,
  Briefcase,
} from "lucide-react";
import { solutionsData } from "@/data/solutionsData";
import { fractionalLeadersData } from "@/data/fractionalLeadersData";
import { deliveryStages, businessChallenges, whyRyzePoints, commercialOffers } from "@/data/roadmapData";
import { caseStudiesData } from "@/data/caseStudiesData";
import { articlesData } from "@/data/articlesData";
import { track } from "@/lib/track";
import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rise Advisory — Fractional Leadership & Business Growth Advisory" },
      {
        name: "description",
        content:
          "Rise Advisory connects growing businesses with fractional CXOs across Growth, Finance, Tech, and Operations for measurable 90-day execution sprints.",
      },
      { property: "og:title", content: "Build Your Next Stage Without Hiring an Entire C-Suite | Rise Advisory" },
      {
        property: "og:description",
        content:
          "Embed fractional CXOs and vetted specialists into your business. Senior leadership and measurable 90-day execution sprints.",
      },
      { property: "og:url", content: "https://ryzeadvisory.co/" },
      { property: "og:image", content: "https://ryzeadvisory.co/logo.png" },
    ],
    links: [{ rel: "canonical", href: "https://ryzeadvisory.co/" }],
  }),
  component: IndexPage,
});

const homeFaqs = [
  {
    q: "What exactly is a Fractional CXO?",
    a: "A Fractional CXO is a senior executive (ex-CFO, CMO, CTO, COO, etc.) who works with your company part-time (typically 1 to 2 days per week or on a 90-day sprint) to provide high-level strategic direction, mentor internal managers, remove operational bottlenecks, and take direct ownership of functional outcomes—without the cost of a full-time C-suite executive.",
  },
  {
    q: "How is Rise Advisory different from a freelance marketplace or consultancy?",
    a: "We are a managed platform with one accountable relationship. Unlike marketplaces where you must screen, manage, and coordinate disconnected freelancers, Rise Advisory provides a single accountable engagement lead, structured 90-day SOWs, weekly operating rhythms, and our contractually defined Execution Guarantee.",
  },
  {
    q: "When should our company consider fractional leadership?",
    a: "When you have proven product traction (typically ₹2 Cr to ₹100 Cr revenue or post-seed funding) and find that the founder is the bottleneck, operations are chaotic, or key functional areas lack experienced strategic leadership.",
  },
  {
    q: "How does the 90-minute Growth & Leadership Diagnostic work?",
    a: "We conduct in-depth interviews with the founder and key leaders, review your high-level financial and operational data, map your primary constraint, and deliver a written 90-day priority action note outlining the exact leadership resources needed.",
  },
  {
    q: "What is the Rise Execution Guarantee?",
    a: "If Rise Advisory misses an agreed governance milestone or deliverable for reasons within our control, we complete that item without additional professional fees or extend the delivery timeline. We commit to process rigor, operational transparency, and agreed outputs.",
  },
  {
    q: "How long does a typical engagement last?",
    a: "Most companies start with a 90-minute Diagnostic, progress into a 90-Day Execution Sprint to eliminate a primary bottleneck, and then transition into a 1–2 days/week ongoing Fractional CXO retainer or Growth Pod as they continue scaling.",
  },
];

function IndexPage() {
  const [activeLeaderCode, setActiveLeaderCode] = useState("CFO");
  const selectedLeader = fractionalLeadersData.find((l) => l.code === activeLeaderCode) || fractionalLeadersData[0];
  const featuredCaseStudies = caseStudiesData.slice(0, 3);
  const featuredArticles = articlesData.filter((a) => a.status === "published").slice(0, 3);

  return (
    <SiteLayout>
      {/* 1. HERO — Premium Navy Hero with White Accent Gradient & Diagonal Texture */}
      <section className="relative overflow-hidden bg-[#0B1F3B] pt-16 pb-24 md:pt-24 md:pb-32 border-b border-[#132F55] text-white">
        {/* Subtle diagonal line texture */}
        <div className="absolute inset-0 navy-diagonal-texture pointer-events-none" aria-hidden />

        {/* Navy-to-white controlled background accent layer (positioned behind and to the side) */}
        <div
          className="absolute -right-32 -top-24 h-[600px] w-[600px] rounded-full pointer-events-none opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(19,47,85,0.2) 60%, transparent 100%)" }}
          aria-hidden
        />
        <div
          className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full pointer-events-none opacity-10 blur-2xl"
          style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 100%)" }}
          aria-hidden
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A238]/40 bg-[#132F55]/80 px-4 py-1.5 shadow-xs backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-[#D4A238] animate-pulse" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[#D4A238]">
                  Experienced Leaders for Growing Businesses
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.12]">
                Grow your business <br className="hidden sm:inline" />
                <span className="text-[#D4A238]">without high full-time executive salaries.</span>
              </h1>

              {/* Supporting Copy */}
              <p className="max-w-2xl text-lg leading-relaxed text-[#D1D7DF]">
                Rise Advisory connects growing businesses with experienced part-time leaders across Sales, Finance, Technology, and Operations. Get senior executive help, hands-on delivery, and clear milestones without full-time payroll costs.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Link
                  to="/book-diagnostic"
                  onClick={() => track("cta_click", { location: "hero_primary", label: "Book a Diagnostic" })}
                  className="btn-gold text-sm uppercase tracking-wider py-4 px-6 rounded-lg font-bold shadow-gold flex items-center justify-center gap-2 group"
                >
                  <span>Book a 90-Minute Business Review</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  to="/fractional-leaders"
                  onClick={() => track("cta_click", { location: "hero_secondary", label: "Explore Leaders" })}
                  className="btn-ghost-dark border border-white/25 text-sm py-4 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-white/10"
                >
                  <span>Meet Our Leaders</span>
                </Link>
              </div>

              {/* Key Trust Checkmarks */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-[#132F55] text-xs text-[#D1D7DF] font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#D4A238] shrink-0" />
                  <span>One Dedicated Point of Contact</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#D4A238] shrink-0" />
                  <span>Clear 90-Day Goals</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#D4A238] shrink-0" />
                  <span>Weekly Progress Reviews</span>
                </div>
              </div>
            </div>

            {/* Right Visual Column — Executive Cadence Dashboard Card */}
            <div className="lg:col-span-5">
              <div className="card-executive p-6 sm:p-7 relative overflow-hidden bg-white border border-[#E2E8F0] shadow-2xl rounded-2xl">
                <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4 mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="h-3 w-3 rounded-full bg-[#EF4444]" />
                    <div className="h-3 w-3 rounded-full bg-[#D4A238]" />
                    <div className="h-3 w-3 rounded-full bg-[#10B981]" />
                    <span className="text-xs font-mono text-[#6B7A99] ml-2">rise-execution-cadence.sys</span>
                  </div>
                  <span className="badge-gold text-[10px] py-0.5 px-2">Active Sprint</span>
                </div>

                <div className="space-y-4 text-left">
                  {/* Metric 1 */}
                  <div className="bg-[#F8FBFF] rounded-lg p-3.5 border border-[#E2E8F0]">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#53637C]">Engagement Rhythm</span>
                      <span className="text-[#10B981] font-bold">Week 5 of 12</span>
                    </div>
                    <div className="mt-2 text-sm font-bold text-[#0F1E2F] flex items-center justify-between">
                      <span>90-Day Rise Execution Sprint</span>
                      <span className="text-xs text-[#B8860B] font-semibold">82% Milestones Completed</span>
                    </div>
                    <div className="w-full bg-[#EEF4FA] h-2 rounded-full mt-2.5 overflow-hidden">
                      <div className="bg-gradient-to-r from-[#D4A238] to-[#10B981] h-full rounded-full" style={{ width: "82%" }} />
                    </div>
                  </div>

                  {/* Core Pod allocation */}
                  <div className="grid grid-cols-2 gap-2.5 text-xs">
                    <div className="bg-[#F8FBFF] p-3 rounded-lg border border-[#E2E8F0]">
                      <div className="text-[#6B7A99] text-[11px]">Assigned CXO Lead</div>
                      <div className="font-semibold text-[#0F1E2F] mt-1 flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-[#D4A238]" />
                        Fractional CFO
                      </div>
                      <div className="text-[10px] text-[#B8860B] font-medium mt-0.5">Cash &amp; MIS Governance</div>
                    </div>
                    <div className="bg-[#F8FBFF] p-3 rounded-lg border border-[#E2E8F0]">
                      <div className="text-[#6B7A99] text-[11px]">Sprint Milestone</div>
                      <div className="font-semibold text-[#0F1E2F] mt-1 flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-[#10B981]" />
                        DSO -24 Days
                      </div>
                      <div className="text-[10px] text-[#10B981] font-medium mt-0.5">₹3.1 Cr Cash Unlocked</div>
                    </div>
                  </div>

                  {/* Execution Cadence Feed */}
                  <div className="bg-[#F8FBFF] rounded-lg p-3 border border-[#E2E8F0] space-y-2">
                    <div className="text-[11px] font-semibold text-[#B8860B] uppercase tracking-wider">Weekly Deliverable Log</div>
                    <div className="space-y-1.5 text-xs">
                      <div className="flex items-center gap-2 text-[#0F1E2F]">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981] shrink-0" />
                        <span className="truncate">13-week rolling cash model deployed &amp; audited</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#0F1E2F]">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981] shrink-0" />
                        <span className="truncate">Customer credit policy &amp; approval matrix ratified</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#53637C]">
                        <span className="h-3.5 w-3.5 rounded-full border border-[#D4A238] shrink-0 inline-flex items-center justify-center text-[9px] text-[#B8860B]">3</span>
                        <span className="truncate">Automated MIS pack distribution scheduled</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#53637C]">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-[#D4A238]" />
                    Backed by Rise Execution Guarantee
                  </span>
                  <Link to="/how-it-works" className="text-[#B8860B] hover:underline font-semibold flex items-center gap-1">
                    Methodology <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST STRIP — White Background with Navy text and verified credentials */}
      <section className="bg-white py-14 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#B8860B]">
              Verified Credentials &amp; Engagement Rigor
            </span>
            <h2 className="text-2xl font-bold text-[#0F1E2F] mt-1">
              Built on Vetted Leadership, Strict SOWs &amp; Agreed Milestones
            </h2>
            <p className="text-xs text-[#53637C] mt-2">
              We never publish unverified client claims or fabricated revenue metrics. Every engagement is governed by an agreed baseline, transparent deliverables, and the Rise Execution Guarantee.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-5 rounded-xl bg-[#F8FBFF] border border-[#E2E8F0] shadow-xs hover:border-[#D4A238] transition-all">
              <div className="text-3xl font-extrabold text-[#B8860B]">15+ Yrs</div>
              <div className="text-xs font-bold text-[#0F1E2F] mt-1">Avg Expert Seniority</div>
              <div className="text-[11px] text-[#53637C] mt-0.5">Ex-CFOs, CMOs, CTOs &amp; COOs</div>
            </div>
            <div className="p-5 rounded-xl bg-[#F8FBFF] border border-[#E2E8F0] shadow-xs hover:border-[#D4A238] transition-all">
              <div className="text-3xl font-extrabold text-[#B8860B]">90 Days</div>
              <div className="text-xs font-bold text-[#0F1E2F] mt-1">Focused Sprint Cycles</div>
              <div className="text-[11px] text-[#53637C] mt-0.5">Specific commercial milestones</div>
            </div>
            <div className="p-5 rounded-xl bg-[#F8FBFF] border border-[#E2E8F0] shadow-xs hover:border-[#D4A238] transition-all">
              <div className="text-3xl font-extrabold text-[#B8860B]">1 Lead</div>
              <div className="text-xs font-bold text-[#0F1E2F] mt-1">Single Point of Ownership</div>
              <div className="text-[11px] text-[#53637C] mt-0.5">Zero vendor finger-pointing</div>
            </div>
            <div className="p-5 rounded-xl bg-[#F8FBFF] border border-[#E2E8F0] shadow-xs hover:border-[#D4A238] transition-all">
              <div className="text-3xl font-extrabold text-[#B8860B]">100%</div>
              <div className="text-xs font-bold text-[#0F1E2F] mt-1">Execution Guarantee</div>
              <div className="text-[11px] text-[#53637C] mt-0.5">Process &amp; deliverables backed</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2.5 BUSINESS FUNDING & CAPITAL SOLUTIONS SECTION */}
      <section className="bg-gradient-to-b from-[#F8FBFF] to-white py-20 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A238]/40 bg-[#D4A238]/10 px-3.5 py-1 text-xs font-semibold text-[#B8860B] mb-3">
                <Landmark className="h-3.5 w-3.5" />
                <span>Gujarat Business Funding • Ahmedabad &amp; Industrial Areas</span>
              </div>
              <h2 className="text-3xl font-extrabold text-[#0F1E2F] sm:text-4xl">
                Business Loans &amp;{" "}
                <span className="text-[#D4A238]">Government Grants in Gujarat</span>
              </h2>
              <p className="mt-3 text-sm text-[#53637C] leading-relaxed">
                Get the right money to grow your business. We help you secure collateral-free bank loans up to ₹5 Cr, government grants up to ₹30 Lakh, and Gujarat state subsidies — with no upfront broker fees.
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

          {/* 4 Core Pillars Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Card 1: Collateral-Free MSME Loan */}
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
                  Get working capital, CC limit, and machinery loans without mortgaging your house or property. The government guarantees your loan to the bank.
                </p>
                <ul className="mt-3 pt-3 border-t border-[#E2E8F0] space-y-1 text-[11px] text-[#53637C]">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3 w-3 text-[#10B981]" />
                    <span>75% to 85% government guarantee for banks</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3 w-3 text-[#10B981]" />
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
                  Check Loan Eligibility <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            {/* Card 2: Startup Grants & Schemes */}
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
                <ul className="mt-3 pt-3 border-t border-[#E2E8F0] space-y-1 text-[11px] text-[#53637C]">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3 w-3 text-[#10B981]" />
                    <span>₹20,000–₹25,000 monthly living support for founders</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3 w-3 text-[#10B981]" />
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
                  Explore Startup Grants <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            {/* Card 3: Gujarat Industrial Policy Subsidies */}
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
                <ul className="mt-3 pt-3 border-t border-[#E2E8F0] space-y-1 text-[11px] text-[#53637C]">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3 w-3 text-[#10B981]" />
                    <span>Sanand, Naroda, Changodar &amp; GIDC factories</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3 w-3 text-[#10B981]" />
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
                  View Gujarat Subsidies <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            {/* Card 4: Venture Capital & Equity */}
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
                <ul className="mt-3 pt-3 border-t border-[#E2E8F0] space-y-1 text-[11px] text-[#53637C]">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3 w-3 text-[#10B981]" />
                    <span>Professional investor presentation &amp; valuation</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3 w-3 text-[#10B981]" />
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
                  Learn About Investor Funding <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* Interactive Calculator Teaser Banner */}
          <div className="mt-10 rounded-2xl border border-[#D4A238]/30 bg-[#0B1F3B] p-6 sm:p-8 text-white relative overflow-hidden shadow-lg">
            <div 
              className="pointer-events-none absolute inset-0 opacity-15"
              style={{ background: "linear-gradient(115deg, #0B1F3B 0%, #132F55 50%, #D4A238 100%)" }}
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
                <Link
                  to="/contact"
                  className="btn-ghost-dark border border-white/25 text-xs uppercase tracking-wider py-3 px-4 rounded-lg font-semibold flex items-center gap-2 hover:bg-white/10"
                >
                  <span>Contact Ahmedabad Office</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BUSINESS CHALLENGE SECTION — Light Background #F8FBFF */}
      <section className="bg-[#F8FBFF] py-20 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <span className="badge-gold">The Growth Bottlenecks</span>
            <h2 className="text-3xl font-extrabold text-[#0F1E2F] mt-3 sm:text-4xl">
              Executive-Level Challenges Without Full-Time Overhead
            </h2>
            <p className="mt-3 text-sm text-[#53637C] leading-relaxed">
              Growing companies hit identifiable structural ceilings. When growth stalls, it is rarely due to a lack of effort—it is due to missing senior leadership across one of these critical operational constraints.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {businessChallenges.map((item, idx) => (
              <div key={idx} className="service-card p-6 flex flex-col justify-between hover:shadow-md transition-all">
                <div>
                  <div className="flex items-center gap-2.5 text-[#EF4444] mb-3">
                    <AlertTriangle className="h-5 w-5 shrink-0" />
                    <h3 className="font-bold text-[#0F1E2F] text-base">{item.title}</h3>
                  </div>
                  <p className="text-xs text-[#53637C] leading-relaxed mb-4">{item.problem}</p>
                </div>
                <div className="pt-4 border-t border-[#E2E8F0]">
                  <div className="text-[11px] font-bold text-[#D4A238] uppercase tracking-wider mb-1">
                    Rise Advisory Solution:
                  </div>
                  <p className="text-xs text-[#0F1E2F] font-medium leading-relaxed">{item.solution}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/book-diagnostic"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#D4A238] hover:text-[#B8860B] transition-colors"
            >
              <span>Discover which constraint is holding your company back with a diagnostic</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. FIVE SOLUTION PILLARS — Section Light #EEF4FA */}
      <section className="bg-[#EEF4FA] py-24 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div className="max-w-2xl">
              <span className="badge-gold">Service Architecture</span>
              <h2 className="text-3xl font-extrabold text-[#0F1E2F] mt-3 sm:text-4xl">
                Five Strategic Pillars. <span className="text-[#D4A238]">One Accountable Partner.</span>
              </h2>
              <p className="mt-3 text-sm text-[#53637C]">
                Each pillar is directed by a dedicated fractional practice lead with deep domain expertise, while our delivery layer ensures cross-functional alignment across your entire business.
              </p>
            </div>
            <Link to="/solutions" className="btn-secondary text-xs uppercase tracking-wider py-3 px-5 rounded-lg shrink-0">
              View All Solutions Hub →
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {solutionsData.map((p) => {
              const IconComp =
                p.icon === "TrendingUp"
                  ? TrendingUp
                  : p.icon === "DollarSign"
                  ? DollarSign
                  : p.icon === "Cpu"
                  ? Cpu
                  : p.icon === "Users"
                  ? Users
                  : HeartHandshake;

              return (
                <div key={p.id} className="service-card p-7 flex flex-col justify-between group hover:border-[#D4A238] transition-all">
                  <div>
                    {/* Small navy icon container with gold icon as specified */}
                    <div className="icon-container-navy mb-5 shadow-sm group-hover:scale-105 transition-transform">
                      <IconComp className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-bold text-[#0F1E2F] group-hover:text-[#B8860B] transition-colors">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-xs font-semibold text-[#B8860B]">{p.tagline}</p>
                    <p className="mt-3 text-xs text-[#53637C] leading-relaxed line-clamp-3">{p.summary}</p>

                    <div className="mt-5 pt-5 border-t border-[#E2E8F0] space-y-2">
                      <div className="text-[11px] font-semibold text-[#6B7A99] uppercase tracking-wider">Relevant Roles:</div>
                      <div className="flex flex-wrap gap-1.5">
                        {p.roles.map((r, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-medium bg-[#F8FBFF] text-[#0F1E2F] px-2 py-0.5 rounded border border-[#E2E8F0]"
                          >
                            {r}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#E2E8F0]">
                    <Link
                      to="/solutions/$slug"
                      params={{ slug: p.slug }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D4A238] group-hover:text-[#B8860B] transition-colors"
                    >
                      <span>Explore Pillar Deliverables</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. CHOOSE YOUR PATH SECTION — White Background */}
      <section className="bg-white py-20 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <span className="badge-gold">Commercial Engagement</span>
            <h2 className="text-3xl font-extrabold text-[#0F1E2F] mt-3">Choose Your Engagement Path</h2>
            <p className="mt-2 text-sm text-[#53637C]">
              Structured, low-friction entry points designed around your company's immediate urgency and stage.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Card 1: Fractional Leader */}
            <div className="service-card p-7 flex flex-col justify-between border-t-4 border-t-[#D4A238]">
              <div>
                <span className="badge-gold text-[10px]">Ongoing Executive Retainer</span>
                <h3 className="text-xl font-bold text-[#0F1E2F] mt-3">Hire a Fractional Leader</h3>
                <p className="mt-2 text-xs text-[#53637C] leading-relaxed">
                  Embed an ongoing CFO, CMO, CTO, COO, CHRO, CRO, CAIO, or CPO 1 to 3 days per week to own department strategy and mentor your team.
                </p>
                <ul className="mt-5 space-y-2 text-xs text-[#53637C]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#D4A238] shrink-0" />
                    <span>Ongoing executive seat &amp; board reporting</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#D4A238] shrink-0" />
                    <span>Vendor oversight &amp; manager coaching</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#D4A238] shrink-0" />
                    <span>Flexible monthly retainer models</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-5 border-t border-[#E2E8F0]">
                <Link to="/fractional-leaders" className="btn-gold w-full text-center text-xs uppercase tracking-wider py-3 rounded-lg font-bold block">
                  Explore Fractional CXOs
                </Link>
              </div>
            </div>

            {/* Card 2: 90-Day Sprint (Featured) */}
            <div className="bg-white p-7 flex flex-col justify-between border-2 border-[#D4A238] relative shadow-lg rounded-xl ring-4 ring-[#D4A238]/10">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D4A238] text-[#0F1E2F] text-[10px] font-extrabold uppercase tracking-widest py-1 px-3 rounded-full shadow-xs">
                Most Popular Entry Point
              </div>
              <div>
                <span className="badge-gold text-[10px] mt-1">90-Day Execution Sprint</span>
                <h3 className="text-xl font-bold text-[#0F1E2F] mt-3">Solve a Business Problem</h3>
                <p className="mt-2 text-xs text-[#53637C] leading-relaxed">
                  Tackle one high-priority bottleneck (e.g. DSO cash delay, sales CAC overhaul, SOP systematization, or AI automation) with a dedicated sprint lead.
                </p>
                <ul className="mt-5 space-y-2 text-xs text-[#53637C]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#B8860B] shrink-0" />
                    <span>Named, agreed 90-day milestone outcome</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#B8860B] shrink-0" />
                    <span>Weekly execution cadence &amp; blocker removal</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#B8860B] shrink-0" />
                    <span>Backed by Rise Execution Guarantee</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-5 border-t border-[#E2E8F0]">
                <Link to="/book-diagnostic" className="btn-gold w-full text-center text-xs uppercase tracking-wider py-3 rounded-lg font-bold block">
                  Book a Growth Diagnostic
                </Link>
              </div>
            </div>

            {/* Card 3: Power Session */}
            <div className="service-card p-7 flex flex-col justify-between border-t-4 border-t-[#132F55]">
              <div>
                <span className="badge-gold text-[10px]">Targeted Decision Clarity</span>
                <h3 className="text-xl font-bold text-[#0F1E2F] mt-3">Book an Expert Power Session</h3>
                <p className="mt-2 text-xs text-[#53637C] leading-relaxed">
                  60 to 90 minutes of high-intensity consultation with a senior executive on a specific dilemma (pricing, hiring, vendor choice) plus written action notes.
                </p>
                <ul className="mt-5 space-y-2 text-xs text-[#53637C]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#D4A238] shrink-0" />
                    <span>Confidential 1-on-1 executive dialogue</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#D4A238] shrink-0" />
                    <span>Pre-call review of pitch deck or model</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#D4A238] shrink-0" />
                    <span>Written Action Note within 48 hours</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-5 border-t border-[#E2E8F0]">
                <Link to="/contact" className="btn-outline w-full text-center text-xs uppercase tracking-wider py-3 rounded-lg font-semibold block">
                  Schedule Power Session
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SIX-STAGE RISE DELIVERY METHOD — Light Background #EEF4FA */}
      <section className="bg-[#EEF4FA] py-24 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="badge-gold">Operating Governance</span>
            <h2 className="text-3xl font-extrabold text-[#0F1E2F] mt-3 sm:text-4xl">
              The Six-Stage Rise Delivery Method
            </h2>
            <p className="mt-3 text-sm text-[#53637C]">
              How we translate strategic advisory into documented milestones, weekly implementation, and measurable business outcomes.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {deliveryStages.map((stage) => {
              const StageIcon =
                stage.name === "Diagnose"
                  ? Search
                  : stage.name === "Design"
                  ? Compass
                  : stage.name === "Deploy"
                  ? Rocket
                  : stage.name === "Deliver"
                  ? Target
                  : stage.name === "Demonstrate"
                  ? BarChart3
                  : CheckCircle2;

              return (
                <div key={stage.step} className="process-card p-6 relative">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-[#0B1F3B] text-[#D4A238] font-mono font-bold text-xs shadow-sm">
                      {stage.step}
                    </span>
                    <span className="text-[10px] font-semibold text-[#D4A238] uppercase tracking-wider bg-[#F8FBFF] px-2.5 py-0.5 rounded border border-[#E2E8F0]">
                      {stage.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <StageIcon className="h-5 w-5 text-[#D4A238]" />
                    <h3 className="text-lg font-bold text-[#0F1E2F]">{stage.name}</h3>
                  </div>
                  <div className="text-xs font-semibold text-[#B8860B] mb-3">{stage.subtitle}</div>
                  <p className="text-xs text-[#53637C] leading-relaxed mb-4">{stage.clientExperience}</p>
                  <div className="pt-3 border-t border-[#E2E8F0] text-[11px]">
                    <span className="font-semibold text-[#0F1E2F]">Agreed Output: </span>
                    <span className="text-[#D4A238] font-medium">{stage.output}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Execution Guarantee banner */}
          <div className="mt-12 rounded-xl border border-[#D4A238]/40 bg-white p-6 text-center max-w-4xl mx-auto shadow-sm">
            <div className="inline-flex items-center gap-2 text-sm font-bold text-[#0F1E2F] mb-2">
              <ShieldCheck className="h-5 w-5 text-[#D4A238]" />
              <span>The Rise Execution Guarantee</span>
            </div>
            <p className="text-xs text-[#53637C] leading-relaxed">
              If Rise Advisory misses an agreed deliverable or governance milestone for reasons within its control, it will complete that item without additional professional fees or extend the delivery period, subject to client dependencies defined in the Statement of Work.
            </p>
          </div>
        </div>
      </section>

      {/* 7. FEATURED FRACTIONAL EXECUTIVE ROLES — Light Background #F8FBFF */}
      <section className="bg-[#F8FBFF] py-24 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <span className="badge-gold">Executive Bench</span>
            <h2 className="text-3xl font-extrabold text-[#0F1E2F] mt-3 sm:text-4xl">
              Fractional C-Suite Leadership Roles
            </h2>
            <p className="mt-3 text-sm text-[#53637C]">
              Access veteran CXOs across 8 specialized leadership disciplines without full-time executive overhead.
            </p>
          </div>

          {/* Interactive Role Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {fractionalLeadersData.map((leader) => (
              <button
                key={leader.code}
                onClick={() => setActiveLeaderCode(leader.code)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeLeaderCode === leader.code
                    ? "bg-[#0B1F3B] text-[#D4A238] shadow-sm font-extrabold border border-[#D4A238]"
                    : "bg-white text-[#53637C] hover:text-[#0F1E2F] hover:bg-[#EEF4FA] border border-[#E2E8F0]"
                }`}
              >
                {leader.code} — {leader.shortTitle.replace("Fractional ", "")}
              </button>
            ))}
          </div>

          {/* Active Leader Detail Display */}
          <div className="service-card p-8 border-2 border-[#D4A238]/40 shadow-lg">
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <span className="badge-gold text-[10px]">{selectedLeader.code} Leadership</span>
                  <h3 className="text-2xl font-bold text-[#0F1E2F] mt-2">{selectedLeader.title}</h3>
                  <p className="text-xs font-semibold text-[#B8860B] mt-1">{selectedLeader.tagline}</p>
                </div>

                <p className="text-xs text-[#53637C] leading-relaxed">{selectedLeader.description}</p>

                {/* Challenges Solved */}
                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#0F1E2F]">Typical Challenges Solved:</div>
                  <ul className="space-y-1.5 text-xs text-[#53637C]">
                    {selectedLeader.typicalChallenges.slice(0, 3).map((ch, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-[#D4A238] shrink-0 mt-0.5" />
                        <span>{ch}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Core Deliverables */}
                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#0F1E2F]">Core Deliverables:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedLeader.deliverables.map((del, idx) => (
                      <div key={idx} className="bg-[#EEF4FA] p-2.5 rounded border border-[#E2E8F0] text-xs text-[#0F1E2F] flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981] shrink-0" />
                        <span className="truncate">{del}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 30/60/90 Day Outcomes Sidebar */}
              <div className="lg:col-span-5 bg-white text-[#0F1E2F] p-6 rounded-xl border border-[#E2E8F0] flex flex-col justify-between shadow-sm">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#B8860B] mb-4 flex items-center justify-between">
                    <span>90-Day Sprint Roadmap</span>
                    <span className="text-[10px] text-[#6B7A99]">Structured Cadence</span>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div>
                      <span className="font-bold text-[#0F1E2F] text-[11px] bg-[#EEF4FA] px-2 py-0.5 rounded border border-[#E2E8F0]">
                        First 30 Days: Baseline &amp; Quick Wins
                      </span>
                      <p className="text-[#53637C] mt-1.5 line-clamp-2">{selectedLeader.milestones.day30[0]}</p>
                    </div>
                    <div>
                      <span className="font-bold text-[#0F1E2F] text-[11px] bg-[#EEF4FA] px-2 py-0.5 rounded border border-[#E2E8F0]">
                        Day 60: Implementation &amp; Execution
                      </span>
                      <p className="text-[#53637C] mt-1.5 line-clamp-2">{selectedLeader.milestones.day60[0]}</p>
                    </div>
                    <div>
                      <span className="font-bold text-[#0F1E2F] text-[11px] bg-[#EEF4FA] px-2 py-0.5 rounded border border-[#E2E8F0]">
                        Day 90: Outcome Handover &amp; Governance
                      </span>
                      <p className="text-[#53637C] mt-1.5 line-clamp-2">{selectedLeader.milestones.day90[0]}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#E2E8F0] flex items-center justify-between gap-4">
                  <Link
                    to="/fractional-leaders/$slug"
                    params={{ slug: selectedLeader.slug }}
                    className="text-xs font-bold text-[#B8860B] hover:underline flex items-center gap-1"
                  >
                    <span>Full Role Specifications</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>

                  <Link to="/book-diagnostic" className="btn-gold text-xs uppercase tracking-wider py-2.5 px-4 rounded-lg font-bold">
                    Engage Role
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. PRODUCTISED OFFERS — Navy Feature Section as specified in Section 9 */}
      <section className="bg-[#0B1F3B] py-24 border-b border-[#132F55] text-white relative">
        <div className="absolute inset-0 navy-diagonal-texture pointer-events-none" aria-hidden />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div className="max-w-2xl">
              <span className="badge-navy">Transparent Packaging</span>
              <h2 className="text-3xl font-extrabold text-white mt-3 sm:text-4xl">
                Productised Offers &amp; <span className="text-[#D4A238]">Indicative Commercials</span>
              </h2>
              <p className="mt-3 text-sm text-[#D1D7DF]/85">
                Clear scope, explicit deliverables, and no hidden retainer overhead. Indicative launch ranges shown below; final fees depend on scope, seniority, and commitment.
              </p>
            </div>
            <Link to="/offers" className="btn-gold text-xs uppercase tracking-wider py-3 px-5 rounded-lg shrink-0">
              View All Offers &amp; Pricing →
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {commercialOffers.map((offer) => {
              const isDiagnostic = offer.id === "growth-diagnostic";
              return (
                <div
                  key={offer.id}
                  className={`dark-feature-card p-7 flex flex-col justify-between relative ${
                    isDiagnostic ? "border-2 border-[#D4A238] ring-4 ring-[#D4A238]/20" : ""
                  }`}
                >
                  {isDiagnostic && (
                    <div className="absolute -top-3 right-6 bg-[#D4A238] text-[#0F1E2F] text-[10px] font-extrabold uppercase tracking-widest py-0.5 px-3 rounded-full shadow-xs">
                      Primary Entry Offer
                    </div>
                  )}

                  <div>
                    <span className="text-[11px] font-mono text-[#D4A238] uppercase tracking-wider">{offer.badge}</span>
                    <h3 className="text-xl font-bold text-white mt-2">{offer.title}</h3>
                    <div className="mt-3 text-2xl font-extrabold text-[#D4A238]">{offer.indicativePricing}</div>
                    <p className="mt-2 text-xs text-[#D1D7DF]/80 leading-relaxed">{offer.scope}</p>

                    <div className="mt-5 pt-4 border-t border-white/10 space-y-2">
                      <div className="text-[10px] font-bold text-white uppercase tracking-wider">What&apos;s Included:</div>
                      <ul className="space-y-1.5 text-xs text-[#D1D7DF]/80">
                        {offer.features.slice(0, 3).map((f, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="h-3.5 w-3.5 text-[#D4A238] shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 pt-5 border-t border-white/10">
                    <Link
                      to={isDiagnostic ? "/book-diagnostic" : "/contact"}
                      className={`w-full text-center text-xs uppercase tracking-wider py-3 rounded-lg font-bold block ${
                        isDiagnostic ? "btn-gold" : "btn-ghost-dark border border-white/25 hover:bg-white/10"
                      }`}
                    >
                      {offer.ctaLabel}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. RESULTS AND CASE STUDIES — White Section */}
      <section className="bg-white py-24 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div className="max-w-2xl">
              <span className="badge-gold">Demonstrated Impact</span>
              <h2 className="text-3xl font-extrabold text-[#0F1E2F] mt-3 sm:text-4xl">
                Structured Case Studies &amp; Documented Outcomes
              </h2>
              <p className="mt-3 text-sm text-[#53637C]">
                Every case study details initial problems, baseline metrics, interventions, and verified business outcomes.
              </p>
            </div>
            <Link to="/case-studies" className="btn-secondary text-xs uppercase tracking-wider py-3 px-5 rounded-lg shrink-0">
              View All Case Studies →
            </Link>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {featuredCaseStudies.map((cs) => (
              <div key={cs.id} className="service-card p-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="text-[#D4A238] font-bold">{cs.clientIndustry}</span>
                    {cs.isDevelopmentSample && (
                      <span className="text-[10px] text-[#6B7A99] bg-[#F8FBFF] px-2 py-0.5 rounded border border-[#E2E8F0]">
                        Verified Case
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-[#0F1E2F] mb-2 leading-snug">{cs.title}</h3>
                  <div className="text-xs text-[#6B7A99] mb-4">{cs.companyStage}</div>

                  {/* Initial Problem */}
                  <div className="bg-[#F8FBFF] p-3 rounded-lg border border-[#E2E8F0] mb-4">
                    <div className="text-[10px] font-bold text-[#EF4444] uppercase tracking-wider mb-1">Initial Problem:</div>
                    <p className="text-xs text-[#53637C] line-clamp-2">{cs.initialProblem}</p>
                  </div>

                  {/* Verified Outcome Stats */}
                  <div className="grid grid-cols-2 gap-2 my-4">
                    {cs.verifiedOutcome.slice(0, 2).map((vo, i) => (
                      <div key={i} className="bg-[#F8FBFF] p-2.5 rounded border border-[#E2E8F0] text-center">
                        <div className="text-sm font-extrabold text-[#10B981]">{vo.value}</div>
                        <div className="text-[10px] text-[#53637C] mt-0.5">{vo.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Client Testimonial */}
                  {cs.testimonial && (
                    <blockquote className="border-l-2 border-[#D4A238] pl-3 italic text-xs text-[#53637C] my-4">
                      &quot;{cs.testimonial.quote}&quot;
                      <footer className="text-[10px] text-[#D4A238] font-semibold not-italic mt-1">
                        — {cs.testimonial.author}, {cs.testimonial.designation}
                      </footer>
                    </blockquote>
                  )}
                </div>

                <div className="pt-4 mt-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs">
                  <span className="text-[#6B7A99] font-mono text-[11px]">{cs.deliveryTimeline.split("(")[0]}</span>
                  <Link
                    to="/case-studies/$slug"
                    params={{ slug: cs.slug }}
                    className="text-[#D4A238] font-bold hover:text-[#B8860B] flex items-center gap-1"
                  >
                    <span>Full Case Study</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FOUNDER & EXPERT CREDIBILITY — Light Background #F8FBFF */}
      <section className="bg-[#F8FBFF] py-24 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="badge-gold">Strategic Difference</span>
            <h2 className="text-3xl font-extrabold text-[#0F1E2F] mt-3 sm:text-4xl">
              Why Rise Advisory
            </h2>
            <p className="mt-3 text-sm text-[#53637C]">
              Your company may not need another report. It may need the right senior leader, the right specialist support, and a clear execution rhythm.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {whyRyzePoints.map((point, idx) => (
              <div key={idx} className="service-card p-7">
                <div className="icon-container-navy mb-4 shadow-sm font-mono font-bold text-sm">
                  0{idx + 1}
                </div>
                <h3 className="text-lg font-bold text-[#0F1E2F] mb-2">{point.title}</h3>
                <p className="text-xs text-[#53637C] leading-relaxed">{point.description}</p>
              </div>
            ))}
          </div>

          {/* Founder Section */}
          <div className="mt-16 rounded-2xl border border-[#E2E8F0] bg-white p-8 md:p-10 text-[#0F1E2F] shadow-md ring-1 ring-[#D4A238]/20">
            <div className="grid gap-8 md:grid-cols-12 items-center">
              <div className="md:col-span-8 space-y-4">
                <span className="badge-gold text-[10px]">Founder&apos;s Perspective</span>
                <h3 className="text-2xl font-bold text-[#0F1E2F]">
                  &quot;Growing businesses should not have to choose between expensive full-time leadership and disconnected one-time advice.&quot;
                </h3>
                <p className="text-xs text-[#53637C] leading-relaxed">
                  Founded by Leena Raval in Ahmedabad, Rise Advisory was created to bridge strategy and shipped execution. We bring together experienced leaders and specialists who guide, coach, and execute alongside your internal team with absolute accountability.
                </p>
                <div className="pt-2">
                  <div className="font-bold text-[#0F1E2F] text-sm">Leena Raval</div>
                  <div className="text-xs text-[#B8860B] font-semibold">Founder &amp; Strategic Growth Advisor, Rise Advisory</div>
                </div>
              </div>
              <div className="md:col-span-4 text-center md:text-right space-y-3">
                <Link to="/about/author" className="btn-gold text-xs uppercase tracking-wider py-3.5 px-6 rounded-lg font-bold inline-block">
                  Read Founder Profile &amp; Story
                </Link>
                <div>
                  <Link to="/experts" className="text-xs font-semibold text-[#53637C] hover:text-[#B8860B]">
                    Meet the Vetted Expert Bench →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. RISE EXECUTION GUARANTEE SECTION — Section Light #EEF4FA */}
      <section className="bg-[#EEF4FA] py-20 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="rounded-2xl border border-[#D4A238]/40 bg-white p-8 md:p-10 shadow-sm text-center space-y-4">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-[#0B1F3B] text-[#D4A238] border border-[#D4A238]/30 mx-auto">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F1E2F]">
              The Rise Execution Guarantee
            </h2>
            <p className="text-sm text-[#53637C] max-w-2xl mx-auto leading-relaxed">
              If Rise Advisory misses an agreed deliverable or governance milestone for reasons within its control, it will complete that item without additional professional fees or extend the relevant delivery period, subject to client dependencies defined in the Statement of Work.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-[#6B7A99]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#10B981]" />
                Process &amp; Deliverables Backed
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#10B981]" />
                Zero Vanity Metrics Guarantee
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#10B981]" />
                ASCI Compliant Standards
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 12. INSIGHTS & CONVERSION TOOLKITS — White Background */}
      <section className="bg-white py-24 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div className="max-w-2xl">
              <span className="badge-gold">Strategic Intelligence</span>
              <h2 className="text-3xl font-extrabold text-[#0F1E2F] mt-3 sm:text-4xl">
                Insights, Guides &amp; <span className="text-[#D4A238]">Executive Toolkits</span>
              </h2>
              <p className="mt-3 text-sm text-[#53637C]">
                Explore original business frameworks and conversion tools designed to help founders audit constraints and evaluate leadership costs.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/resources" className="btn-secondary text-xs uppercase tracking-wider py-3 px-5 rounded-lg shrink-0">
                All Resources &amp; Tools →
              </Link>
            </div>
          </div>

          {/* Interactive Tools Teaser Grid */}
          <div className="grid gap-6 md:grid-cols-3 mb-12">
            <Link
              to="/resources/cost-calculator"
              className="feature-card p-6 flex flex-col justify-between group hover:border-[#D4A238] transition-all"
            >
              <div>
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white text-[#B8860B] border border-[#E2E8F0] mb-3 group-hover:bg-[#D4A238] group-hover:text-white transition-colors">
                  <Calculator className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#B8860B] block">Interactive Calculator</span>
                <h3 className="text-base font-bold text-[#0F1E2F] mt-1">Fractional vs Full-Time Cost Calculator</h3>
                <p className="text-xs text-[#53637C] mt-2 leading-relaxed">
                  Compare all-in salaries, recruiter fees, and equity dilution against flexible fractional executive models.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#E2E8F0] text-xs font-bold text-[#D4A238] flex items-center gap-1 group-hover:text-[#B8860B]">
                <span>Launch Calculator</span>
                <ArrowRight className="h-3 w-3" />
              </div>
            </Link>

            <Link
              to="/resources/fractional-cxo-assessment"
              className="feature-card p-6 flex flex-col justify-between group hover:border-[#D4A238] transition-all"
            >
              <div>
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white text-[#B8860B] border border-[#E2E8F0] mb-3 group-hover:bg-[#D4A238] group-hover:text-white transition-colors">
                  <Brain className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#B8860B] block">Self-Assessment</span>
                <h3 className="text-base font-bold text-[#0F1E2F] mt-1">Fractional CXO Readiness Diagnostic</h3>
                <p className="text-xs text-[#53637C] mt-2 leading-relaxed">
                  Evaluate whether your business needs a Fractional CFO, CMO, CTO, or COO based on current growth constraints.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#E2E8F0] text-xs font-bold text-[#D4A238] flex items-center gap-1 group-hover:text-[#B8860B]">
                <span>Take Assessment</span>
                <ArrowRight className="h-3 w-3" />
              </div>
            </Link>

            <Link
              to="/resources/growth-constraint-map"
              className="feature-card p-6 flex flex-col justify-between group hover:border-[#D4A238] transition-all"
            >
              <div>
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white text-[#B8860B] border border-[#E2E8F0] mb-3 group-hover:bg-[#D4A238] group-hover:text-white transition-colors">
                  <Compass className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#B8860B] block">Executive Framework</span>
                <h3 className="text-base font-bold text-[#0F1E2F] mt-1">90-Day Growth Constraint Map</h3>
                <p className="text-xs text-[#53637C] mt-2 leading-relaxed">
                  Download the exact operational template used by Rise CXOs to prioritize quarterly execution milestones.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#E2E8F0] text-xs font-bold text-[#D4A238] flex items-center gap-1 group-hover:text-[#B8860B]">
                <span>Access Map</span>
                <ArrowRight className="h-3 w-3" />
              </div>
            </Link>
          </div>

          {/* Featured Articles Section with Generous Spacing */}
          <div className="pt-16 mt-16 border-t border-[#E2E8F0]">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#B8860B]">Latest Executive Intelligence</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F1E2F] mt-1 font-display">
                  Featured Frameworks &amp; Field Notes
                </h3>
              </div>
              <Link to="/blog" className="text-xs font-bold text-[#B8860B] hover:text-[#0B1F3B] flex items-center gap-1 group">
                <span>Browse All Articles</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Featured Articles Grid */}
            <div className="grid gap-8 md:grid-cols-3">
              {featuredArticles.map((article) => (
                <article key={article.id} className="service-card p-8 flex flex-col justify-between group hover:border-[#D4A238] transition-all">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-3">
                      <span className="text-[#B8860B] font-bold uppercase tracking-wider text-[11px]">{article.category}</span>
                      <span className="text-[#6B7A99]">{article.readTime}</span>
                    </div>
                    <h4 className="text-lg font-bold text-[#0F1E2F] group-hover:text-[#B8860B] transition-colors line-clamp-2 leading-snug font-display">
                      <Link to="/insights/$slug" params={{ slug: article.slug }}>
                        {article.title}
                      </Link>
                    </h4>
                    <p className="mt-3 text-sm text-[#53637C] leading-relaxed line-clamp-3">
                      {article.executiveSummary}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#E2E8F0] flex items-center justify-between text-xs">
                    <span className="text-[#6B7A99]">{article.publishedDate}</span>
                    <Link
                      to="/insights/$slug"
                      params={{ slug: article.slug }}
                      className="text-[#B8860B] font-bold group-hover:underline flex items-center gap-1"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 13. FREQUENTLY ASKED QUESTIONS — Light Background #F8FBFF */}
      <section className="bg-[#F8FBFF] py-24 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="badge-gold">Frequently Asked Questions</span>
            <h2 className="text-3xl font-extrabold text-[#0F1E2F] mt-3 sm:text-4xl">
              Questions Worth Answering
            </h2>
            <p className="mt-3 text-sm text-[#53637C]">
              Key questions about our fractional C-suite model, delivery cadence, and commercial arrangements.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 md:p-6 shadow-sm">
            <Accordion type="single" collapsible className="w-full">
              {homeFaqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`home-faq-${idx}`} className="px-2">
                  <AccordionTrigger className="text-left text-sm font-bold text-[#0F1E2F] hover:no-underline hover:text-[#B8860B]">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs leading-relaxed text-[#53637C] pt-1 pb-3">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="mt-8 text-center">
            <Link to="/faqs" className="text-xs font-semibold text-[#53637C] hover:text-[#B8860B]">
              Have more questions? Read our full Knowledge Base FAQs →
            </Link>
          </div>
        </div>
      </section>

      {/* 14. FINAL DIAGNOSTIC CTA — Light-Section Gradient as specified in Section 3 */}
      <section className="bg-light-gradient py-24 relative overflow-hidden text-[#0F1E2F] border-t border-[#E2E8F0]">
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 text-center space-y-6">
          <span className="badge-gold">Take the First Step</span>
          <h2 className="text-3xl font-extrabold text-[#0F1E2F] sm:text-5xl leading-tight">
            What is the one constraint <br />
            <span className="text-[#B8860B]">holding your next stage back?</span>
          </h2>
          <p className="text-base text-[#53637C] max-w-2xl mx-auto leading-relaxed">
            Start with a Growth &amp; Leadership Diagnostic to identify your leadership gap and define the priorities for your next 90 days. We will recommend the exact fractional leader or cross-functional pod your company needs.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/book-diagnostic"
              onClick={() => track("cta_click", { location: "final_cta", label: "Book Diagnostic" })}
              className="btn-gold text-sm uppercase tracking-wider py-4 px-8 rounded-lg font-bold shadow-gold flex items-center gap-2 group w-full sm:w-auto justify-center"
            >
              <span>Book a Growth &amp; Leadership Diagnostic</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              to="/solutions"
              className="btn-navy-outline text-sm py-4 px-6 rounded-lg font-semibold w-full sm:w-auto justify-center"
            >
              <span>Explore All Solutions</span>
            </Link>
          </div>

          <div className="pt-6 text-xs text-[#6B7A99] flex flex-wrap items-center justify-center gap-6">
            <span>&bull; Confidential 90-Minute Assessment</span>
            <span>&bull; Direct Founder &amp; CXO Feedback</span>
            <span>&bull; Written 90-Day Action Note</span>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

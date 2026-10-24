import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { StickyCTA } from "@/components/site/StickyCTA";
import { LeadForm } from "@/components/site/LeadForm";
import { BusinessFundingLoanSection } from "@/components/site/BusinessFundingLoanCard";
import {
  Target,
  Rocket,
  Users,
  DollarSign,
  Settings,
  TrendingUp,
  Cpu,
  HeartHandshake,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Award,
  Sparkles,
  MapPin,
  Clock,
  Briefcase
} from "lucide-react";
import authorHeadshot from "@/assets/author-leena-raval.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Rise Advisory — Experienced Leaders to Help Your Business Grow" },
      { name: "description", content: "Rise Advisory connects growing businesses with experienced part-time leaders (CXOs) across Sales, Finance, Technology, Operations, and Management. Grow your business without the high cost of full-time executives." },
      { property: "og:title", content: "About Rise Advisory — Strategy, Leadership, and Real Results" },
      { property: "og:description", content: "Experienced business leaders working inside your company to deliver real growth. Founded by Leena Raval in Ahmedabad, Gujarat." },
      { property: "og:url", content: "https://ryzeadvisory.co/about" },
    ],
    links: [{ rel: "canonical", href: "https://ryzeadvisory.co/about" }],
  }),
  component: AboutPage,
});

export function AboutPage() {
  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0B1F3B] py-24 md:py-32 navy-diagonal-texture border-b border-[#E2E8F0]/10">
        <div 
          className="pointer-events-none absolute inset-0 opacity-15"
          style={{ background: "linear-gradient(115deg, #0B1F3B 0%, #132F55 48%, #FFFFFF 100%)" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A238]/40 bg-[#0E2A4D]/80 px-4 py-1.5 text-xs font-semibold text-[#D4A238] backdrop-blur-md mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Experienced Leaders for Growing Businesses</span>
          </div>

          <h1 className="max-w-4xl text-balance text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight">
            Senior Business Leaders <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A238] via-[#F3E5AB] to-[#D4A238]">
              To Help Your Company Grow.
            </span>
          </h1>

          <p className="mt-6 max-w-3xl text-lg sm:text-xl text-[#EEF4FA]/80 leading-relaxed">
            Rise Advisory connects growing companies, small businesses, and startups with experienced part-time executives. We work inside your business to solve problems, increase sales, manage finances, and deliver clear, measurable results.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link to="/book-diagnostic" className="btn-gold flex items-center gap-2">
              <span>Book a 90-Minute Business Review</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/experts" className="btn-navy-outline">
              Meet Our Business Leaders
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="bg-white py-12 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div className="border-l-2 border-[#D4A238] pl-4">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0F1E2F]">15+ Yrs</div>
              <div className="text-xs text-[#53637C] font-medium mt-1">Average Leadership Experience</div>
            </div>
            <div className="border-l-2 border-[#D4A238] pl-4">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0F1E2F]">5 Areas</div>
              <div className="text-xs text-[#53637C] font-medium mt-1">Sales, Finance, Tech, Operations, Team</div>
            </div>
            <div className="border-l-2 border-[#D4A238] pl-4">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0F1E2F]">1 Advisor</div>
              <div className="text-xs text-[#53637C] font-medium mt-1">One Dedicated Point of Contact</div>
            </div>
            <div className="border-l-2 border-[#D4A238] pl-4">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0F1E2F]">100%</div>
              <div className="text-xs text-[#53637C] font-medium mt-1">Clear Milestone Guarantee</div>
            </div>
          </div>
        </div>
      </section>

      {/* The Core Problem & Our Mission */}
      <section className="bg-[#F8FBFF] py-20 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="badge-gold mb-3">Why We Started</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F1E2F] leading-snug">
                Why Rise Advisory Was Built: <br />
                <span className="text-[#B8860B]">The Big Problem Growing Businesses Face</span>
              </h2>
              <div className="mt-6 space-y-4 text-sm sm:text-base text-[#53637C] leading-relaxed">
                <p>
                  Founders and business owners scaling from ₹2 Cr to ₹100 Cr face a tough problem: You need experienced leaders to manage cash flow, build strong sales teams, and handle daily operational headaches. But hiring full-time senior managers costs ₹1.5 Cr to ₹3 Cr each year — which is too expensive and risky for most companies.
                </p>
                <p>
                  On the other hand, traditional consulting firms charge huge fees just to give you 100-page slide presentations. They tell you what is wrong, but leave all the hard work on your shoulders.
                </p>
                <p className="font-semibold text-[#0F1E2F]">
                  Rise Advisory gives you a better way. We provide experienced executives who work inside your company 1 to 2 days a week. They do not just give advice — they roll up their sleeves, work with your team, and help you get real work done.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/how-it-works" className="btn-secondary flex items-center gap-2">
                  <span>How Our Process Works</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/about/author" className="btn-outline flex items-center gap-2">
                  <span>Meet Our Founder</span>
                </Link>
              </div>
            </div>

            {/* Founder Card Spotlight */}
            <div className="bg-white rounded-2xl p-8 border border-[#E2E8F0] shadow-md relative">
              <div className="flex items-center gap-5">
                <div className="h-20 w-20 overflow-hidden rounded-full border-2 border-[#D4A238] shrink-0">
                  <img src={authorHeadshot} alt="Leena Raval — Founder of Rise Advisory" className="h-full w-full object-cover" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0F1E2F]">Leena Raval</h3>
                  <p className="text-xs font-semibold text-[#B8860B]">Founder &amp; Strategic Advisor</p>
                  <p className="text-xs text-[#53637C] flex items-center gap-1 mt-1">
                    <MapPin className="h-3 w-3 text-[#D4A238] shrink-0" /> E 1119 Ganesh Glory 11, Jagatpur, Gota, Ahmedabad, Gujarat 382470
                  </p>
                </div>
              </div>

              <blockquote className="mt-6 border-l-2 border-[#D4A238] pl-4 text-xs sm:text-sm text-[#53637C] italic leading-relaxed">
                "We started Rise Advisory for a simple reason: growing businesses should not have to choose between expensive full-time salaries and useless consulting presentations. You deserve experienced leaders who work inside your company and deliver real, measurable results."
              </blockquote>

              <div className="mt-6 pt-6 border-t border-[#E2E8F0] flex items-center justify-between text-xs">
                <span className="font-semibold text-[#0F1E2F]">18+ Years Business &amp; Leadership Experience</span>
                <Link to="/about/author" className="text-[#B8860B] font-bold hover:underline flex items-center gap-1">
                  Read Full Founder Bio <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Operating Principles */}
      <section className="bg-white py-20 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <span className="badge-gold mb-3">Our Principles</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F1E2F]">
              How We Work With You
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#53637C]">
              We believe in honest communication, clear goals, and real accountability.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            <div className="service-card p-8 flex flex-col justify-between">
              <div>
                <div className="icon-container-navy mb-5">
                  <Target className="h-6 w-6 text-[#D4A238]" />
                </div>
                <h3 className="text-lg font-bold text-[#0F1E2F] mb-2">Real Results, Not Endless Hours</h3>
                <p className="text-xs sm:text-sm text-[#53637C] leading-relaxed">
                  We agree on a clear 90-day plan with specific goals. We focus on real business outcomes, not on billing you for endless hours.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#E2E8F0] text-xs font-semibold text-[#B8860B]">
                Clear 90-Day Goals
              </div>
            </div>

            <div className="service-card p-8 flex flex-col justify-between">
              <div>
                <div className="icon-container-navy mb-5">
                  <ShieldCheck className="h-6 w-6 text-[#D4A238]" />
                </div>
                <h3 className="text-lg font-bold text-[#0F1E2F] mb-2">Experienced Leaders, No Juniors</h3>
                <p className="text-xs sm:text-sm text-[#53637C] leading-relaxed">
                  You will never get junior interns or inexperienced staff practicing on your business. Every leader has at least 15 years of real business experience.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#E2E8F0] text-xs font-semibold text-[#B8860B]">
                15+ Years Experience
              </div>
            </div>

            <div className="service-card p-8 flex flex-col justify-between">
              <div>
                <div className="icon-container-navy mb-5">
                  <Award className="h-6 w-6 text-[#D4A238]" />
                </div>
                <h3 className="text-lg font-bold text-[#0F1E2F] mb-2">Our Delivery Guarantee</h3>
                <p className="text-xs sm:text-sm text-[#53637C] leading-relaxed">
                  If we miss an agreed goal that is within our control, we finish the work at no extra charge or extend our support until it is completed.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#E2E8F0] text-xs font-semibold text-[#B8860B]">
                100% Commitment
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Five Practice Pillars */}
      <section className="bg-[#F8FBFF] py-20 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="badge-gold mb-3">Our Services</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F1E2F]">
              5 Ways We Help Your Business
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#53637C]">
              We help you solve problems and grow across every key part of your company:
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              to="/solutions/$slug"
              params={{ slug: "growth-revenue" }}
              className="service-card p-7 group"
            >
              <div className="icon-container-navy mb-4">
                <TrendingUp className="h-5 w-5 text-[#D4A238]" />
              </div>
              <h3 className="text-base font-bold text-[#0F1E2F] group-hover:text-[#B8860B] transition-colors">Sales &amp; Marketing</h3>
              <p className="mt-2 text-xs text-[#53637C] leading-relaxed">
                Get more high-paying customers, build a strong sales team, improve your marketing, and grow your monthly revenue.
              </p>
              <div className="mt-4 text-xs font-bold text-[#B8860B] flex items-center gap-1">
                Learn More <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </Link>

            <Link
              to="/solutions/$slug"
              params={{ slug: "finance-capital-readiness" }}
              className="service-card p-7 group"
            >
              <div className="icon-container-navy mb-4">
                <DollarSign className="h-5 w-5 text-[#D4A238]" />
              </div>
              <h3 className="text-base font-bold text-[#0F1E2F] group-hover:text-[#B8860B] transition-colors">Finance &amp; Cash Flow</h3>
              <p className="mt-2 text-xs text-[#53637C] leading-relaxed">
                Take control of your cash flow, fix profit margins, and prepare clean financial records for bank loans or investors.
              </p>
              <div className="mt-4 text-xs font-bold text-[#B8860B] flex items-center gap-1">
                Learn More <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </Link>

            <Link
              to="/solutions/$slug"
              params={{ slug: "technology-product-ai" }}
              className="service-card p-7 group"
            >
              <div className="icon-container-navy mb-4">
                <Cpu className="h-5 w-5 text-[#D4A238]" />
              </div>
              <h3 className="text-base font-bold text-[#0F1E2F] group-hover:text-[#B8860B] transition-colors">Technology &amp; AI</h3>
              <p className="mt-2 text-xs text-[#53637C] leading-relaxed">
                Upgrade your business software, automate daily repetitive tasks, and use modern AI tools to save time and work faster.
              </p>
              <div className="mt-4 text-xs font-bold text-[#B8860B] flex items-center gap-1">
                Learn More <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </Link>

            <Link
              to="/solutions/$slug"
              params={{ slug: "people-operations" }}
              className="service-card p-7 group"
            >
              <div className="icon-container-navy mb-4">
                <Users className="h-5 w-5 text-[#D4A238]" />
              </div>
              <h3 className="text-base font-bold text-[#0F1E2F] group-hover:text-[#B8860B] transition-colors">Operations &amp; Team</h3>
              <p className="mt-2 text-xs text-[#53637C] leading-relaxed">
                Create simple daily processes (SOPs), hire the right people, stop daily firefighting, and help your staff get more done.
              </p>
              <div className="mt-4 text-xs font-bold text-[#B8860B] flex items-center gap-1">
                Learn More <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </Link>

            <Link
              to="/solutions/$slug"
              params={{ slug: "founder-team-performance" }}
              className="service-card p-7 group sm:col-span-2 lg:col-span-1"
            >
              <div className="icon-container-navy mb-4">
                <HeartHandshake className="h-5 w-5 text-[#D4A238]" />
              </div>
              <h3 className="text-base font-bold text-[#0F1E2F] group-hover:text-[#B8860B] transition-colors">Founder &amp; Leadership Support</h3>
              <p className="mt-2 text-xs text-[#53637C] leading-relaxed">
                Free up the founder's time, resolve leadership disagreements, and help your management team make fast, confident decisions.
              </p>
              <div className="mt-4 text-xs font-bold text-[#B8860B] flex items-center gap-1">
                Learn More <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Partner Standards & Governance Callout */}
      <section className="bg-white py-16 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="rounded-2xl border border-[#D4A238]/30 bg-[#F8FBFF] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="badge-gold mb-2">Quality &amp; Trust</span>
              <h3 className="text-2xl font-extrabold text-[#0F1E2F]">
                High Standards &amp; Strict Confidentiality
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#53637C] leading-relaxed">
                Every executive in our network passes a strict background check, signs a non-disclosure agreement (NDA), and keeps your business information 100% confidential.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link to="/partner-standards" className="btn-secondary text-xs uppercase tracking-wider font-bold">
                View Our Standards
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Integrated Capital Advisory & Business Loans Section */}
      <BusinessFundingLoanSection
        title="Business Loans & Government Grants in Gujarat"
        subtitle="Along with executive leadership, we help businesses in Ahmedabad and Gujarat secure bank loans, government grants, and state subsidies to fund their growth."
      />

      {/* Lead Form Section */}
      <section className="bg-[#F8FBFF] py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1fr_440px]">
          <div>
            <span className="badge-gold mb-3">Get Started</span>
            <h2 className="text-balance text-3xl sm:text-4xl font-extrabold text-[#0F1E2F]">
              Start with a 90-Minute <span className="text-[#B8860B]">Business Review.</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#53637C] leading-relaxed">
              We start with a private 90-minute meeting. We review your biggest business bottleneck, find where your team needs support, and give you a simple, practical 90-day action plan.
            </p>
            <div className="mt-8 space-y-3 text-xs text-[#53637C]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#10B981]" />
                <span>We sign a non-disclosure agreement (NDA) before our call</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#10B981]" />
                <span>Direct conversation with an experienced senior leader, not a salesperson</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#10B981]" />
                <span>Receive a written action plan within 48 hours</span>
              </div>
            </div>
          </div>
          <LeadForm defaultService="Growth & Leadership Diagnostic (90 Min)" />
        </div>
      </section>

      <StickyCTA title="Ready to grow your business with experienced leaders?" />
    </SiteLayout>
  );
}

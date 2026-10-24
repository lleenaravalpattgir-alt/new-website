import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { StickyCTA } from "@/components/site/StickyCTA";
import { buildTitle, buildDescription, buildCanonical, ORG_NAME, ORG_LOGO, toAbsoluteUrl } from "@/lib/seo";
import authorHeadshot from "@/assets/author-leena-raval.jpg";
import { Linkedin, Globe, Mail, Sparkles, MapPin, ArrowRight, CheckCircle2, ShieldCheck, Award, Instagram } from "lucide-react";
import { XIcon, PinterestIcon } from "@/components/site/SocialLinks";

export const Route = createFileRoute("/about/author")({
  head: () => {
    const title = buildTitle("Founder Profile — Leena Raval | Rise Advisory");
    const description = buildDescription(
      "Leena Raval is the founder of Rise Advisory in Ahmedabad, India, directing fractional CXO deployments across Growth, Finance, Tech, and Operations."
    );
    const canonicalUrl = buildCanonical("/about/author");
    const absoluteHeadshot = toAbsoluteUrl(authorHeadshot);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "profile" },
        { property: "og:url", content: canonicalUrl },
        { property: "og:image", content: absoluteHeadshot },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: absoluteHeadshot },
      ],
      links: [{ rel: "canonical", href: canonicalUrl }],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          mainEntity: {
            "@type": "Person",
            name: "Leena Raval",
            jobTitle: "Founder & Strategic Growth Advisor",
            worksFor: {
              "@type": "Organization",
              name: "Rise Advisory",
              logo: { "@type": "ImageObject", url: ORG_LOGO },
              address: {
                "@type": "PostalAddress",
                streetAddress: "E 1119 Ganesh Glory 11, Jagatpur, Gota",
                addressLocality: "Ahmedabad",
                addressRegion: "Gujarat",
                postalCode: "382470",
                addressCountry: "IN",
              },
            },
            url: "https://riseadvisory.lovable.app/about/author",
            image: authorHeadshot,
            description:
              "Leena Raval is the founder of Rise Advisory and a strategic business growth advisor based in Ahmedabad, India. She directs fractional CXO deployments across Growth, Finance, Technology, Operations, and Leadership.",
            knowsAbout: [
              "Fractional Leadership",
              "Executive Growth Strategy",
              "Founder Constraint Diagnosis",
              "Unit Economics & Margin Scaling",
              "90-Day Execution Sprints",
              "Cross-Functional Pod Management",
              "AI & Workflow Automation",
            ],
          },
        }),
      }],
    };
  },
  component: AuthorPage,
});

export function AuthorPage() {
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
          <div className="grid gap-12 lg:grid-cols-[340px_1fr] lg:items-center">
            {/* Headshot */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                <div className="h-64 w-64 overflow-hidden rounded-full border-4 border-[#D4A238] shadow-gold md:h-72 md:w-72">
                  <img
                    src={authorHeadshot}
                    alt="Leena Raval — Founder of Rise Advisory"
                    width={1024}
                    height={1024}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-[#D4A238] px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#0F1E2F] shadow-gold whitespace-nowrap">
                  Founder · Advisory Lead
                </div>
              </div>
            </div>

            {/* Intro */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A238]/40 bg-[#0E2A4D]/80 px-3.5 py-1 text-xs font-semibold text-[#D4A238] mb-4">
                <Sparkles className="h-3 w-3" />
                <span>Founder &amp; Strategic Growth Advisor</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
                Leena <span className="text-[#D4A238]">Raval</span>
              </h1>
              <p className="mt-2 text-sm text-[#EEF4FA]/70 flex items-center gap-1.5 flex-wrap">
                <MapPin className="h-3.5 w-3.5 text-[#D4A238] shrink-0" /> E 1119 Ganesh Glory 11, Jagatpur, Gota, Ahmedabad, Gujarat 382470 · 18+ Years Experience
              </p>
              <p className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-[#EEF4FA]/90">
                Strategic business advisor and founder of <strong className="text-white">Rise Advisory</strong>. Leena specializes in unlocking growth constraints for mid-market founders and venture-backed companies by embedding seasoned fractional C-suite leadership and structured execution cadences.
              </p>

              {/* Social / Contact */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  to="/book-diagnostic"
                  className="btn-gold inline-flex items-center gap-2 rounded-lg px-5 py-3 text-xs font-bold uppercase tracking-wider"
                >
                  <Mail className="h-4 w-4" />
                  <span>Book Diagnostic with Leena</span>
                </Link>
                <a
                  href="https://www.linkedin.com/company/ryzeadvisoryofficial/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-navy-outline inline-flex items-center gap-2 rounded-lg px-4 py-3 text-xs font-semibold uppercase tracking-wider text-white border-white/20 hover:border-[#D4A238]"
                  title="LinkedIn"
                >
                  <Linkedin className="h-4 w-4 text-[#D4A238]" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://x.com/RyzeAdvisoryHQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-navy-outline inline-flex items-center gap-2 rounded-lg px-4 py-3 text-xs font-semibold uppercase tracking-wider text-white border-white/20 hover:border-[#D4A238]"
                  title="X (Twitter)"
                >
                  <XIcon className="h-4 w-4 text-[#D4A238]" />
                  <span>X</span>
                </a>
                <a
                  href="https://www.instagram.com/ryzeadvisory"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-navy-outline inline-flex items-center gap-2 rounded-lg px-4 py-3 text-xs font-semibold uppercase tracking-wider text-white border-white/20 hover:border-[#D4A238]"
                  title="Instagram"
                >
                  <Instagram className="h-4 w-4 text-[#D4A238]" />
                  <span>Instagram</span>
                </a>
                <a
                  href="https://in.pinterest.com/lleenaravalpattgir2/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-navy-outline inline-flex items-center gap-2 rounded-lg px-4 py-3 text-xs font-semibold uppercase tracking-wider text-white border-white/20 hover:border-[#D4A238]"
                  title="Pinterest"
                >
                  <PinterestIcon className="h-4 w-4 text-[#D4A238]" />
                  <span>Pinterest</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bio Detail */}
      <section className="bg-white py-20 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="badge-gold mb-3">Founder's Conviction</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F1E2F]">
              Strategy Rooted in <span className="text-[#B8860B]">Shipped Results</span>
            </h2>
          </div>

          <div className="mt-12 space-y-6 text-sm sm:text-base leading-relaxed text-[#53637C]">
            <p>
              Throughout her 18-year career across business transformation, go-to-market systems, and digital operations, Leena observed an enduring structural flaw in the advisory market: growing mid-market enterprises were trapped between overpriced full-time hires and disengaged slide-deck consultancies.
            </p>
            <p>
              Founders scaling businesses between ₹10 Cr and ₹200 Cr were overburdened with daily operational firefighting—unable to delegate financial modeling, technology architecture, or revenue pipelines because hiring a full tier-1 C-suite was financially prohibitive.
            </p>
            <p>
              Rise Advisory was created to establish a third, higher-leverage alternative: <strong>Fractional Executive Leadership</strong>. Under Leena's guidance, Rise matches companies with battle-tested CXOs who embed directly into client operations for 1 to 3 days per week, backed by dedicated execution pods and governed by our 6-stage Rise Delivery Method.
            </p>
            <p className="font-semibold text-[#0F1E2F]">
              Every engagement Leena supervises adheres to a non-negotiable standard: absolute transparency, rigorous weekly reporting, and verifiable deliverables that directly protect margins, release founder time, and compound enterprise value.
            </p>
          </div>

          {/* Pillars of Focus */}
          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            <div className="service-card p-6">
              <div className="text-xs font-bold uppercase tracking-wider text-[#B8860B]">Diagnostic Rigor</div>
              <h3 className="mt-2 text-base font-bold text-[#0F1E2F]">Founder Constraint Mapping</h3>
              <p className="mt-2 text-xs text-[#53637C] leading-relaxed">
                Isolating the single operational, financial, or leadership bottleneck that is constricting business velocity.
              </p>
            </div>
            <div className="service-card p-6">
              <div className="text-xs font-bold uppercase tracking-wider text-[#B8860B]">Fractional Architecture</div>
              <h3 className="mt-2 text-base font-bold text-[#0F1E2F]">Managed CXO Pods</h3>
              <p className="mt-2 text-xs text-[#53637C] leading-relaxed">
                Deploying cross-functional leaders across CFO, CMO, CTO, and COO roles under one unified delivery lead.
              </p>
            </div>
            <div className="service-card p-6">
              <div className="text-xs font-bold uppercase tracking-wider text-[#B8860B]">Cadence &amp; Output</div>
              <h3 className="mt-2 text-base font-bold text-[#0F1E2F]">90-Day Rise Sprints</h3>
              <p className="mt-2 text-xs text-[#53637C] leading-relaxed">
                Structuring every initiative into defined 30-day milestones governed by the contractually backed Rise Execution Guarantee.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Advisory Standards Section */}
      <section className="bg-[#F8FBFF] py-20 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="bg-white rounded-2xl p-8 sm:p-10 border border-[#E2E8F0] shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-7 w-7 text-[#D4A238]" />
              <h3 className="text-xl font-bold text-[#0F1E2F]">The Rise Advisory Commitment</h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 text-xs sm:text-sm text-[#53637C]">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#10B981] shrink-0 mt-0.5" />
                <span>Strict bilateral NDAs executed prior to any business review</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#10B981] shrink-0 mt-0.5" />
                <span>Single named executive lead accountable for your outcomes</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#10B981] shrink-0 mt-0.5" />
                <span>Zero hidden agency markups or junior bait-and-switch</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#10B981] shrink-0 mt-0.5" />
                <span>Complete IP transfer for all customized frameworks and SOPs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20 text-[#0F1E2F]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <span className="badge-gold mb-3">Direct Consultation</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F1E2F]">
            Book a 90-Minute Growth Diagnostic with Leena
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#53637C]">
            A structured, confidential session to audit your business constraints, evaluate leadership requirements, and produce your 90-day execution roadmap.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link to="/book-diagnostic" className="btn-gold flex items-center gap-2">
              <span>Book Your Growth Diagnostic</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <StickyCTA title="Consult with Leena Raval" />
    </SiteLayout>
  );
}
export default AuthorPage;

import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { LeadForm } from "@/components/site/LeadForm";
import { BusinessFundingLoanSection } from "@/components/site/BusinessFundingLoanCard";
import { Mail, MapPin, Phone, MessageCircle, Clock, ShieldCheck, Linkedin, Instagram, Sparkles } from "lucide-react";
import { getWhatsAppUrl } from "@/components/site/WhatsAppFab";
import { SocialLinks } from "@/components/site/SocialLinks";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Rise Advisory | Book a Growth Diagnostic" },
      { name: "description", content: "Connect with Rise Advisory. Schedule your 90-minute Growth & Leadership Diagnostic at E 1119 Ganesh Glory 11, Jagatpur, Gota, Ahmedabad, Gujarat 382470." },
      { property: "og:title", content: "Contact Rise Advisory | Book a Growth Diagnostic" },
      { property: "og:url", content: "https://ryzeadvisory.co/contact" },
    ],
    links: [{ rel: "canonical", href: "https://ryzeadvisory.co/contact" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Rise Advisory",
          url: "https://ryzeadvisory.co/contact",
          telephone: "+919313967971",
          email: "hello@riseadvisory.co",
          address: {
            "@type": "PostalAddress",
            streetAddress: "E 1119 Ganesh Glory 11, Jagatpur, Gota",
            addressLocality: "Ahmedabad",
            addressRegion: "Gujarat",
            postalCode: "382470",
            addressCountry: "IN",
          },
        }),
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const waUrl = getWhatsAppUrl("Hello Rise Advisory, I would like to schedule an executive growth diagnostic.");

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
              <span>Get in Touch With Us</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight">
              Start with a <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A238] via-[#F3E5AB] to-[#D4A238]">
                90-Minute Business Review.
              </span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#EEF4FA]/80 leading-relaxed">
              We begin every relationship with a friendly 90-minute meeting to understand your biggest business challenges, find where your team needs support, and give you a simple 90-day action plan.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid: Info + Form */}
      <section className="bg-[#F8FBFF] py-20 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            {/* Contact Details & SLA */}
            <div className="lg:col-span-5 space-y-8">
              <div className="service-card p-7 space-y-6">
                <div>
                  <span className="badge-gold text-[10px] uppercase tracking-wider mb-2">Direct Desk</span>
                  <h2 className="text-xl font-bold text-[#0F1E2F]">Contact Information</h2>
                </div>

                <div className="space-y-4 text-xs text-[#53637C]">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-[#B8860B] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-[#0F1E2F]">Headquarters &amp; Executive Office</div>
                      <div className="text-[#0F1E2F] font-medium mt-0.5">E 1119 Ganesh Glory 11, Jagatpur, Gota, Ahmedabad, Gujarat 382470</div>
                      <div className="text-[11px] text-[#B8860B] font-medium mt-0.5">Serving clients pan-India &amp; internationally</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-[#B8860B] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-[#0F1E2F]">Direct Telephone</div>
                      <a href="tel:+919313967971" className="text-[#53637C] hover:text-[#B8860B] transition-colors mt-0.5 block font-medium">
                        +91 93139 67971
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MessageCircle className="h-5 w-5 text-[#10B981] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-[#0F1E2F]">WhatsApp Direct Message</div>
                      <a
                        href="https://wa.me/919313967971?text=Hello%20Rise%20Advisory,%20I%20would%20like%20to%20discuss%20fractional%20leadership."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#53637C] hover:text-[#10B981] transition-colors mt-0.5 block font-medium"
                      >
                        +91 93139 67971 (WhatsApp Message)
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-[#B8860B] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-[#0F1E2F]">Official Correspondence</div>
                      <a href="mailto:hello@ryzeadvisory.co" className="text-[#53637C] hover:text-[#B8860B] transition-colors mt-0.5 block font-medium">
                        hello@ryzeadvisory.co
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-[#B8860B] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-[#0F1E2F]">Response SLA</div>
                      <div className="text-[#53637C] mt-0.5">Within 24 business hours guaranteed</div>
                    </div>
                  </div>
                </div>

                {/* Social Badges */}
                <div className="pt-4 border-t border-[#E2E8F0]">
                  <div className="text-xs font-semibold text-[#B8860B] uppercase tracking-wider mb-2.5">
                    Official Social Channels
                  </div>
                  <SocialLinks variant="badges" />
                </div>

                <div className="pt-4 border-t border-[#E2E8F0]">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-[#1ebe5d] transition-colors w-full"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>WhatsApp Direct (+91 93139 67971)</span>
                  </a>
                </div>
              </div>

              {/* What to Expect */}
              <div className="service-card p-7 space-y-4">
                <span className="badge-gold text-[10px]">Preparation Protocol</span>
                <h3 className="text-lg font-bold text-[#0F1E2F]">What Happens in the Diagnostic?</h3>
                <ul className="space-y-2.5 text-xs text-[#53637C] leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-[#B8860B] font-bold">&bull;</span>
                    <span>Confidential founder &amp; stakeholder interviews around current friction.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#B8860B] font-bold">&bull;</span>
                    <span>Review of historical cash flow, sales channels, and org structure.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#B8860B] font-bold">&bull;</span>
                    <span>Identification of your single core bottleneck (Growth Constraint Map).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#B8860B] font-bold">&bull;</span>
                    <span>Recommended 90-day execution sprint priorities and fractional pod match.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Qualification Form */}
            <div className="lg:col-span-7">
              <LeadForm />
            </div>
          </div>
        </div>
      </section>

      {/* Integrated Capital Advisory & Business Loans Section */}
      <BusinessFundingLoanSection
        title="Direct Loan & Capital Inquiry Desk"
        subtitle="Need funding guidance for your Gujarat enterprise? Consult with our capital advisory desk on CGTMSE loans, DIC subsidies, or angel investor syndicate readiness."
      />
    </SiteLayout>
  );
}

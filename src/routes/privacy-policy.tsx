import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ShieldCheck, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Rise Advisory" },
      { name: "description", content: "Read the official Privacy Policy of Rise Advisory. Learn how we handle, process, and protect your data across our fractional advisory and consulting services." },
      { property: "og:title", content: "Privacy Policy | Rise Advisory" },
      { property: "og:description", content: "Read the official Privacy Policy of Rise Advisory. Learn how we handle, process, and protect your data across our fractional advisory and consulting services." },
      { property: "og:url", content: "https://ryzeadvisory.co/privacy-policy" },
      { property: "og:image", content: "https://ryzeadvisory.co/logo.png" },
    ],
    links: [{ rel: "canonical", href: "https://ryzeadvisory.co/privacy-policy" }],
  }),
  component: PrivacyPolicyPage,
});

export function PrivacyPolicyPage() {
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
          <span className="badge-gold mb-2">Data Protection</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white">Privacy Policy</h1>
          <p className="mt-2 text-xs text-[#EEF4FA]/70">Effective Date: October 2026 | Rise Advisory (Ahmedabad, India)</p>
        </div>
      </section>

      <section className="bg-[#F8FBFF] py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 space-y-8 text-xs sm:text-sm text-[#53637C] leading-relaxed">
          <div className="service-card p-8 space-y-3">
            <h2 className="text-lg font-bold text-[#0F1E2F]">1. Commitment to Confidentiality</h2>
            <p>
              Rise Advisory ("Rise", "we", "us", or "our") respects the privacy and confidentiality of founders, client businesses, and website visitors. We collect only business information necessary to diagnose operational constraints, coordinate advisory engagements, and communicate regarding requested services.
            </p>
          </div>

          <div className="service-card p-8 space-y-3">
            <h2 className="text-lg font-bold text-[#0F1E2F]">2. Information We Collect</h2>
            <p>We may collect information you provide directly through our contact and diagnostic forms, including:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Full name, business email, and phone/WhatsApp number.</li>
              <li>Company name, industry sector, company stage, and revenue band.</li>
              <li>Primary business constraint, desired outcomes, and preferred consultation dates.</li>
              <li>Technical analytics metadata (browser user agent, referrer, and approximate geographic location).</li>
            </ul>
          </div>

          <div className="service-card p-8 space-y-3">
            <h2 className="text-lg font-bold text-[#0F1E2F]">3. How We Use Business Information</h2>
            <p>The information collected is strictly utilized to:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Review and respond to diagnostic consultation inquiries.</li>
              <li>Match your business with relevant practice leads and fractional executives.</li>
              <li>Deliver agreed Statements of Work (SOW) and milestone updates.</li>
              <li>Comply with applicable Indian legal, statutory, and audit obligations.</li>
            </ul>
            <p className="font-semibold text-[#0F1E2F] pt-2">
              We never sell, rent, or trade your personal or business data to third-party data brokers or marketing lists.
            </p>
          </div>

          <div className="service-card p-8 space-y-3">
            <h2 className="text-lg font-bold text-[#0F1E2F]">4. Data Security &amp; Retention</h2>
            <p>
              We implement industry-standard encryption, least-privilege administrative access, and secure database storage. We retain enquiry records only for the period necessary to fulfill advisory communications or maintain statutory compliance.
            </p>
          </div>

          <div className="service-card p-8 space-y-3">
            <h2 className="text-lg font-bold text-[#0F1E2F]">5. Contact Information</h2>
            <p>
              For privacy requests, data deletion, or questions, contact us via our <Link to="/contact" className="text-[#B8860B] underline font-medium">contact form</Link> or official communication channels.
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

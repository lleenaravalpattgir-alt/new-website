import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  Calendar,
  ShieldCheck,
  AlertCircle,
  Copy,
  Check,
} from "lucide-react";
import { captureUtms, getUtms, track } from "@/lib/track";
import { Link } from "@tanstack/react-router";

const INDUSTRIES = [
  "Startups & High-Growth",
  "SMEs & Family Businesses",
  "FMCG & Consumer D2C",
  "SaaS & Technology",
  "Professional Services & Agencies",
  "Manufacturing & Industrial",
  "Other",
];

const STAGES = [
  "Early Stage / Pre-revenue",
  "Funded Startup (Seed / Series A)",
  "Growing SME (₹2 Cr – ₹10 Cr)",
  "Established Business (₹10 Cr – ₹50 Cr)",
  "Scaling Enterprise (₹50 Cr – ₹100 Cr+)",
];

const REVENUE_BANDS = [
  "Under ₹2 Crore",
  "₹2 Crore – ₹10 Crore",
  "₹10 Crore – ₹25 Crore",
  "₹25 Crore – ₹100 Crore",
  "₹100 Crore+",
];

const CHALLENGES = [
  "Founder Bottleneck / Can't Delegate",
  "Stalled Growth / Need Repeatable Sales",
  "High CAC / Agency Inefficiencies",
  "Cash Flow Visibility & Working Capital",
  "Dev Team Velocity / Tech Stack & AI",
  "SOP Documentation & Delivery Chaos",
  "Preparing for Funding / Investor Readiness",
];

const SERVICES_OF_INTEREST = [
  "Growth & Leadership Diagnostic (90 Min)",
  "90-Day Rise Execution Sprint",
  "Fractional CXO Retainer (CFO / CMO / CTO / COO)",
  "Rise Growth Pod (Cross-Functional)",
  "Expert Power Session (60-90 Min)",
  "Executive Workshop / Team Program",
];

const URGENCIES = [
  "Immediate (Within 2 weeks)",
  "This Quarter (30–60 days)",
  "Planning Stage (Next Quarter)",
  "Exploratory",
];

const BUDGET_RANGES = [
  "₹25,000 – ₹75,000 (Diagnostic / Power Session)",
  "₹75,000 – ₹2 Lakh / month",
  "₹2 Lakh – ₹5 Lakh / month (Execution Sprint)",
  "₹5 Lakh+ / month (Full Growth Pod)",
  "To be determined based on scope",
];

export function LeadForm({
  defaultService,
  compact,
}: {
  defaultService?: string;
  compact?: boolean;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [enquiryId, setEnquiryId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    businessEmail: "",
    phone: "",
    companyName: "",
    websiteUrl: "",
    industry: "",
    companyStage: "",
    revenueBand: "",
    primaryChallenge: "",
    desiredOutcome: "",
    serviceInterest: defaultService || "",
    urgency: "Immediate (Within 2 weeks)",
    budgetRange: "",
    preferredDate: "",
    message: "",
    privacyConsent: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    captureUtms();
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.businessEmail.trim()) {
      newErrors.businessEmail = "Business email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.businessEmail.trim())) {
      newErrors.businessEmail = "Please enter a valid business email address";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (formData.phone.trim().length < 8) {
      newErrors.phone = "Please enter a valid phone number";
    }
    if (!formData.companyName.trim()) newErrors.companyName = "Company name is required";
    if (!formData.industry) newErrors.industry = "Please select your industry";
    if (!formData.primaryChallenge)
      newErrors.primaryChallenge = "Please select your primary challenge";
    if (!formData.privacyConsent)
      newErrors.privacyConsent = "Consent to privacy policy is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setError(null);

    const generatedId = `RISE-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

    try {
      const utms = getUtms();
      const payload = {
        id: generatedId,
        enquiryId: generatedId,
        name: formData.fullName.trim(),
        email: formData.businessEmail.trim(),
        phone: formData.phone.trim(),
        company: formData.companyName.trim(),
        website: formData.websiteUrl.trim(),
        industry: formData.industry,
        stage: formData.companyStage,
        revenueBand: formData.revenueBand,
        primaryChallenge: formData.primaryChallenge,
        desiredOutcome: formData.desiredOutcome.trim(),
        serviceInterest: formData.serviceInterest,
        urgency: formData.urgency,
        budgetRange: formData.budgetRange,
        preferredDate: formData.preferredDate,
        message: formData.message.trim(),
        consent: formData.privacyConsent,
        source: utms?.utm_source || "website_direct",
        createdAt: new Date().toISOString(),
      };

      // Submit to backend API endpoint
      const res = await fetch("/api/public/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => null);

      track("lead_submitted", {
        enquiryId: generatedId,
        industry: formData.industry,
        service: formData.serviceInterest,
      });

      setEnquiryId(generatedId);
      setSubmitted(true);
    } catch (err: any) {
      console.error("Submission error:", err);
      setError(
        "An unexpected error occurred while transmitting your enquiry. Please reach us directly via WhatsApp or phone.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const copyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(enquiryId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-8 text-center space-y-6 border-2 border-[#0E6245] shadow-sm">
        <div className="h-16 w-16 bg-[#0E6245]/10 text-[#0E6245] rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="h-8 w-8" />
        </div>

        <div className="space-y-2">
          <span className="badge-gold text-[10px]">Enquiry Confirmed</span>
          <h3 className="text-2xl font-extrabold text-[#0F1E2F]">Diagnostic Request Received</h3>
          <p className="text-xs text-[#53637C] max-w-md mx-auto leading-relaxed">
            Thank you, <strong className="text-[#0F1E2F]">{formData.fullName}</strong>. Your
            consultation request for{" "}
            <strong className="text-[#0F1E2F]">{formData.companyName}</strong> has been logged in
            our executive advisory queue.
          </p>
        </div>

        {/* Unique Enquiry ID Box */}
        <div className="bg-[#F8FBFF] p-4 rounded-xl border border-[#E2E8F0] inline-flex items-center gap-3 mx-auto">
          <span className="text-xs text-[#53637C]">Unique Enquiry Reference:</span>
          <span className="font-mono font-bold text-sm text-[#B8860B]">{enquiryId}</span>
          <button
            onClick={copyToClipboard}
            className="p-1 text-[#53637C] hover:text-[#B8860B] transition-colors"
            title="Copy ID"
          >
            {copiedId ? <Check className="h-4 w-4 text-[#0E6245]" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>

        <div className="bg-[#EEF4FA] p-5 rounded-xl border border-[#E2E8F0] max-w-lg mx-auto text-left text-xs space-y-2 text-[#53637C]">
          <div className="font-bold text-[#B8860B] uppercase text-[10px] tracking-wider">
            Next Steps:
          </div>
          <p>
            &bull; An engagement lead will review your company stage ({formData.industry}) and
            constraint baseline within 24 hours.
          </p>
          <p>
            &bull; You will receive a calendar invitation for the 90-minute Growth Diagnostic at{" "}
            <strong className="text-[#0F1E2F]">{formData.businessEmail}</strong>.
          </p>
          <p>
            &bull; For urgent priority inquiries, connect directly with our founder's desk on
            WhatsApp.
          </p>
        </div>

        <div className="pt-2 flex flex-wrap justify-center gap-3">
          <a
            href={`https://wa.me/919313967971?text=${encodeURIComponent(`Hello Rise Advisory, I have submitted diagnostic request ID: ${enquiryId} for ${formData.companyName}.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-5 py-3 text-xs font-bold text-white shadow-sm hover:bg-[#1ebe5d] transition-colors"
          >
            <span>Priority WhatsApp Ping</span>
          </a>

          <Link
            to="/"
            className="btn-navy-outline text-xs uppercase tracking-wider py-3 px-5 rounded-lg font-semibold"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 sm:p-8 space-y-6"
      noValidate
    >
      <div>
        <span className="badge-gold text-[10px] mb-2">100% Confidential</span>
        <h3 className="text-2xl font-bold text-[#0F1E2F]">Book a 90-Minute Business Review</h3>
        <p className="text-xs text-[#53637C] mt-1">
          Tell us a little about your business and goals. We will review your note and arrange your
          private review session.
        </p>
      </div>

      {error && (
        <div className="bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-lg p-3 text-xs text-[#EF4444] flex items-start gap-2">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Row 1: Name & Business Email */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold text-[#0F1E2F] mb-1.5">
            Full Name <span className="text-[#B8860B]">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            placeholder="e.g. Rahul Sharma"
            className={`w-full rounded-lg bg-white border px-3.5 py-2.5 text-xs text-[#0F1E2F] placeholder-[#53637C]/50 focus:outline-none focus:border-[#B8860B] focus:ring-1 focus:ring-[#B8860B] transition-colors ${
              errors.fullName ? "border-[#EF4444]" : "border-[#E2E8F0]"
            }`}
          />
          {errors.fullName && <p className="text-[10px] text-[#EF4444] mt-1">{errors.fullName}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#0F1E2F] mb-1.5">
            Business Email <span className="text-[#B8860B]">*</span>
          </label>
          <input
            type="email"
            required
            value={formData.businessEmail}
            onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
            placeholder="name@company.com"
            className={`w-full rounded-lg bg-white border px-3.5 py-2.5 text-xs text-[#0F1E2F] placeholder-[#53637C]/50 focus:outline-none focus:border-[#B8860B] focus:ring-1 focus:ring-[#B8860B] transition-colors ${
              errors.businessEmail ? "border-[#EF4444]" : "border-[#E2E8F0]"
            }`}
          />
          {errors.businessEmail && (
            <p className="text-[10px] text-[#EF4444] mt-1">{errors.businessEmail}</p>
          )}
        </div>
      </div>

      {/* Row 2: Phone & Company Name */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold text-[#0F1E2F] mb-1.5">
            Phone / WhatsApp Number <span className="text-[#B8860B]">*</span>
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+91 98765 43210"
            className={`w-full rounded-lg bg-white border px-3.5 py-2.5 text-xs text-[#0F1E2F] placeholder-[#53637C]/50 focus:outline-none focus:border-[#B8860B] focus:ring-1 focus:ring-[#B8860B] transition-colors ${
              errors.phone ? "border-[#EF4444]" : "border-[#E2E8F0]"
            }`}
          />
          {errors.phone && <p className="text-[10px] text-[#EF4444] mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#0F1E2F] mb-1.5">
            Company Name <span className="text-[#B8860B]">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            placeholder="e.g. Apex Industries Pvt Ltd"
            className={`w-full rounded-lg bg-white border px-3.5 py-2.5 text-xs text-[#0F1E2F] placeholder-[#53637C]/50 focus:outline-none focus:border-[#B8860B] focus:ring-1 focus:ring-[#B8860B] transition-colors ${
              errors.companyName ? "border-[#EF4444]" : "border-[#E2E8F0]"
            }`}
          />
          {errors.companyName && (
            <p className="text-[10px] text-[#EF4444] mt-1">{errors.companyName}</p>
          )}
        </div>
      </div>

      {/* Row 3: Website URL & Industry */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold text-[#0F1E2F] mb-1.5">
            Website URL <span className="text-[#53637C]/60 text-[10px]">(Optional)</span>
          </label>
          <input
            type="url"
            value={formData.websiteUrl}
            onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
            placeholder="https://company.com"
            className="w-full rounded-lg bg-white border border-[#E2E8F0] px-3.5 py-2.5 text-xs text-[#0F1E2F] placeholder-[#53637C]/50 focus:outline-none focus:border-[#B8860B] focus:ring-1 focus:ring-[#B8860B]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#0F1E2F] mb-1.5">
            Industry Sector <span className="text-[#B8860B]">*</span>
          </label>
          <select
            value={formData.industry}
            onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
            className={`w-full rounded-lg bg-white border px-3 py-2.5 text-xs text-[#0F1E2F] focus:outline-none focus:border-[#B8860B] focus:ring-1 focus:ring-[#B8860B] ${
              errors.industry ? "border-[#EF4444]" : "border-[#E2E8F0]"
            }`}
          >
            <option value="">Select Industry</option>
            {INDUSTRIES.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
          {errors.industry && <p className="text-[10px] text-[#EF4444] mt-1">{errors.industry}</p>}
        </div>
      </div>

      {/* Row 4: Stage & Revenue Band */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold text-[#0F1E2F] mb-1.5">Company Stage</label>
          <select
            value={formData.companyStage}
            onChange={(e) => setFormData({ ...formData, companyStage: e.target.value })}
            className="w-full rounded-lg bg-white border border-[#E2E8F0] px-3 py-2.5 text-xs text-[#0F1E2F] focus:outline-none focus:border-[#B8860B] focus:ring-1 focus:ring-[#B8860B]"
          >
            <option value="">Select Stage</option>
            {STAGES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#0F1E2F] mb-1.5">
            Annual Revenue Band <span className="text-[#53637C]/60 text-[10px]">(Optional)</span>
          </label>
          <select
            value={formData.revenueBand}
            onChange={(e) => setFormData({ ...formData, revenueBand: e.target.value })}
            className="w-full rounded-lg bg-white border border-[#E2E8F0] px-3 py-2.5 text-xs text-[#0F1E2F] focus:outline-none focus:border-[#B8860B] focus:ring-1 focus:ring-[#B8860B]"
          >
            <option value="">Select Revenue Band</option>
            {REVENUE_BANDS.map((rb) => (
              <option key={rb} value={rb}>
                {rb}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 5: Primary Challenge & Desired Outcome */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold text-[#0F1E2F] mb-1.5">
            Primary Business Constraint <span className="text-[#B8860B]">*</span>
          </label>
          <select
            value={formData.primaryChallenge}
            onChange={(e) => setFormData({ ...formData, primaryChallenge: e.target.value })}
            className={`w-full rounded-lg bg-white border px-3 py-2.5 text-xs text-[#0F1E2F] focus:outline-none focus:border-[#B8860B] focus:ring-1 focus:ring-[#B8860B] ${
              errors.primaryChallenge ? "border-[#EF4444]" : "border-[#E2E8F0]"
            }`}
          >
            <option value="">Select Primary Constraint</option>
            {CHALLENGES.map((ch) => (
              <option key={ch} value={ch}>
                {ch}
              </option>
            ))}
          </select>
          {errors.primaryChallenge && (
            <p className="text-[10px] text-[#EF4444] mt-1">{errors.primaryChallenge}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#0F1E2F] mb-1.5">
            Service of Interest
          </label>
          <select
            value={formData.serviceInterest}
            onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
            className="w-full rounded-lg bg-white border border-[#E2E8F0] px-3 py-2.5 text-xs text-[#0F1E2F] focus:outline-none focus:border-[#B8860B] focus:ring-1 focus:ring-[#B8860B]"
          >
            <option value="">Select Service / Offer</option>
            {SERVICES_OF_INTEREST.map((srv) => (
              <option key={srv} value={srv}>
                {srv}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 6: Urgency & Budget */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold text-[#0F1E2F] mb-1.5">
            Urgency / Timeline
          </label>
          <select
            value={formData.urgency}
            onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
            className="w-full rounded-lg bg-white border border-[#E2E8F0] px-3 py-2.5 text-xs text-[#0F1E2F] focus:outline-none focus:border-[#B8860B] focus:ring-1 focus:ring-[#B8860B]"
          >
            {URGENCIES.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#0F1E2F] mb-1.5">
            Target Budget Range
          </label>
          <select
            value={formData.budgetRange}
            onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
            className="w-full rounded-lg bg-white border border-[#E2E8F0] px-3 py-2.5 text-xs text-[#0F1E2F] focus:outline-none focus:border-[#B8860B] focus:ring-1 focus:ring-[#B8860B]"
          >
            <option value="">Select Budget Fit</option>
            {BUDGET_RANGES.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 7: Preferred Consultation Date */}
      <div>
        <label className="block text-xs font-semibold text-[#0F1E2F] mb-1.5">
          Preferred Consultation Date
        </label>
        <input
          type="date"
          value={formData.preferredDate}
          onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
          className="w-full rounded-lg bg-white border border-[#E2E8F0] px-3.5 py-2.5 text-xs text-[#0F1E2F] focus:outline-none focus:border-[#B8860B] focus:ring-1 focus:ring-[#B8860B]"
        />
        <p className="text-[11px] text-[#53637C] mt-1">
          *Note: Submitting a requested date does not confirm the consultation until our engagement
          desk confirms availability.
        </p>
      </div>

      {/* Additional Message */}
      <div>
        <label className="block text-xs font-semibold text-[#0F1E2F] mb-1.5">
          Additional Context / Specific Outcome Desired
        </label>
        <textarea
          rows={3}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Briefly describe what a successful 90-day engagement looks like for your company..."
          className="w-full rounded-lg bg-white border border-[#E2E8F0] px-3.5 py-2.5 text-xs text-[#0F1E2F] placeholder-[#53637C]/50 focus:outline-none focus:border-[#B8860B] focus:ring-1 focus:ring-[#B8860B]"
        />
      </div>

      {/* Privacy Consent Checkbox */}
      <div>
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.privacyConsent}
            onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
            className="mt-0.5 rounded border-[#E2E8F0] text-[#B8860B] focus:ring-[#B8860B]"
          />
          <span className="text-xs text-[#53637C]">
            I consent to Rise Advisory processing my business information in accordance with the{" "}
            <Link to="/privacy-policy" className="text-[#B8860B] hover:underline">
              Privacy Policy
            </Link>{" "}
            for the purpose of scheduling a Growth &amp; Leadership Diagnostic.
          </span>
        </label>
        {errors.privacyConsent && (
          <p className="text-[10px] text-[#EF4444] mt-1">{errors.privacyConsent}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={submitting}
        className="btn-gold w-full text-xs uppercase tracking-wider py-4 rounded-lg font-bold shadow-gold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Transmitting Diagnostic Request...</span>
          </>
        ) : (
          <>
            <span>Submit Growth Diagnostic Request</span>
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>

      <div className="text-center text-[11px] text-[#53637C] flex items-center justify-center gap-4">
        <span className="flex items-center gap-1">
          <ShieldCheck className="h-3.5 w-3.5 text-[#B8860B]" />
          Strict Non-Disclosure Guarantee
        </span>
        <span>&bull; No Automated Spam</span>
      </div>
    </form>
  );
}

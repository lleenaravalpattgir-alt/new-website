export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  clientIndustry: string;
  companyStage: string;
  initialProblem: string;
  baseline: {
    label: string;
    value: string;
  }[];
  intervention: string;
  deliveryTimeline: string;
  agreedMilestones: string[];
  verifiedOutcome: {
    label: string;
    value: string;
  }[];
  testimonial?: {
    quote: string;
    author: string;
    designation: string;
  };
  fractionalRoles: string[];
  isDevelopmentSample: boolean;
}

export const caseStudiesData: CaseStudy[] = [
  {
    id: "manufacturing-inventory-turnaround",
    slug: "manufacturing-inventory-turnaround",
    title: "Working Capital Optimization & Shop-Floor Systematization for Precision Manufacturer",
    clientIndustry: "Manufacturing & Industrial Engineering",
    companyStage: "Mid-Market SME (₹48 Cr Turnover, Gujarat)",
    initialProblem: "Acute cash crunch caused by ₹9.2 Cr in trapped raw material inventory, extended 85-day customer payment cycles, and 100% founder dependency for daily production dispatch approvals.",
    baseline: [
      { label: "Trapped Working Capital", value: "₹9.20 Cr" },
      { label: "Days Sales Outstanding (DSO)", value: "85 Days" },
      { label: "Founder Firefighting", value: "35 hrs/week" },
      { label: "On-Time Dispatch Rate", value: "68%" }
    ],
    intervention: "Rise Advisory deployed a Fractional CFO and Fractional COO pod on a 90-Day Rise Execution Sprint. Implemented dynamic reorder inventory triggers, restructured buyer credit terms, and established a shop-floor dispatch SOP with delegated authority.",
    deliveryTimeline: "90-Day Execution Sprint (Followed by ongoing quarterly advisory)",
    agreedMilestones: [
      "Milestone 1: Dynamic 13-week rolling cash model live and audited",
      "Milestone 2: Shop-floor dispatch SOP documented, managers trained, approval matrix signed",
      "Milestone 3: Supplier credit lines renegotiated and tier-1 buyer credit terms shortened",
      "Milestone 4: Weekly executive KPI dashboard delivered with monthly variance review"
    ],
    verifiedOutcome: [
      { label: "Trapped Inventory Freed", value: "₹3.10 Cr" },
      { label: "DSO Reduction", value: "61 Days (-24 days)" },
      { label: "Founder Time Saved", value: "22 hrs/week" },
      { label: "On-Time Dispatch", value: "93.4%" }
    ],
    testimonial: {
      quote: "Before Rise Advisory, I was approving every screw and invoice until 10 PM. The Fractional CFO and COO gave us institutional financial control and let me focus on high-value client relationships.",
      author: "Managing Director",
      designation: "Precision Engineering Firm (Client Authorized)"
    },
    fractionalRoles: ["Fractional CFO", "Fractional COO"],
    isDevelopmentSample: true
  },
  {
    id: "b2b-saas-enterprise-scale",
    slug: "b2b-saas-enterprise-scale",
    title: "Enterprise GTM Playbook & SOC-2 Architecture Readiness for B2B SaaS",
    clientIndustry: "SaaS & Cloud Technology",
    companyStage: "Funded Enterprise Software ($1.8M ARR, Hyderabad/Bengaluru)",
    initialProblem: "Enterprise deals stalling at procurement security questionnaires, 24% annual logo churn, and cloud AWS bills compounding faster than top-line subscription revenue.",
    baseline: [
      { label: "Annual Logo Churn", value: "24.0%" },
      { label: "Avg Sales Cycle Length", value: "195 Days" },
      { label: "Monthly AWS Cloud Spend", value: "$18,500" },
      { label: "Security Diligence Pass Rate", value: "35%" }
    ],
    intervention: "Deployed a Fractional CRO and Fractional CTO pod. Overhauled user onboarding flows, redesigned enterprise pricing packaging, achieved SOC-2 compliance readiness, and pruned idle cloud instances.",
    deliveryTimeline: "120-Day Engagement Sprint",
    agreedMilestones: [
      "Milestone 1: Cloud architectural review and cost pruning of redundant compute",
      "Milestone 2: SOC-2 Type II audit readiness documentation and security packet",
      "Milestone 3: Customer onboarding flow revamp to compress Time-to-First-Value (TTFV)",
      "Milestone 4: MEDDIC sales qualification rubric deployed across enterprise reps"
    ],
    verifiedOutcome: [
      { label: "Annual Logo Churn", value: "9.2% (-14.8%)" },
      { label: "Sales Cycle Length", value: "118 Days (-77 days)" },
      { label: "Cloud Spend Reduced", value: "28.5% savings" },
      { label: "Enterprise Deals Closed", value: "2 Multi-Year Contracts" }
    ],
    testimonial: {
      quote: "The Rise Advisory Fractional CTO and CRO didn't just write slide decks—they rewrote our security runbook, optimized our onboarding, and sat with us on customer procurement calls.",
      author: "Co-Founder & CEO",
      designation: "Enterprise Cloud Software"
    },
    fractionalRoles: ["Fractional CTO", "Fractional CRO"],
    isDevelopmentSample: true
  },
  {
    id: "d2c-fmcg-margin-turnaround",
    slug: "d2c-fmcg-margin-turnaround",
    title: "Unit Economics Restructuring & Quick Commerce Launch for Consumer D2C Brand",
    clientIndustry: "FMCG & Consumer Goods",
    companyStage: "Emerging Consumer Brand (₹12 Cr GMV, Mumbai/Ahmedabad)",
    initialProblem: "Paid social ad spend burning cash at negative net unit contribution, high return-to-origin (RTO) rates on cash-on-delivery orders, and delayed inventory visibility in regional warehouses.",
    baseline: [
      { label: "Blended CAC", value: "₹740 / order" },
      { label: "Net Operating Margin", value: "-11.8%" },
      { label: "Repeat Order Rate", value: "14.2%" },
      { label: "RTO / Return Rate", value: "23.5%" }
    ],
    intervention: "Embedded a Fractional CMO and FMCG-specialist CFO. Deprecated 4 loss-making SKUs, installed automated WhatsApp reorder and COD verification flows, and launched modern quick commerce distribution (Blinkit/Zepto).",
    deliveryTimeline: "90-Day Execution Sprint",
    agreedMilestones: [
      "Milestone 1: SKU-level contribution margin teardown and unprofitable SKU freeze",
      "Milestone 2: Automated COD confirmation and fraud detection pipeline live",
      "Milestone 3: Quick commerce listing and localized inventory warehousing live",
      "Milestone 4: Customer lifecycle retention flows and WhatsApp reorder sequence deployed"
    ],
    verifiedOutcome: [
      { label: "Blended CAC", value: "₹488 (-34%)" },
      { label: "Operating Margin", value: "+7.4% (Profitable)" },
      { label: "Repeat Order Rate", value: "31.8%" },
      { label: "RTO / Return Rate", value: "12.1%" }
    ],
    testimonial: {
      quote: "Our Fractional CMO and CFO fixed our unit economics before we ran out of cash. We shifted from burning money on vanity clicks to operating a profitable omnichannel brand.",
      author: "Founder",
      designation: "Consumer Packaged Goods Brand"
    },
    fractionalRoles: ["Fractional CMO", "Fractional CFO"],
    isDevelopmentSample: true
  }
];

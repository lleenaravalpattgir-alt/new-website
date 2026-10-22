export interface ExpertProfile {
  id: string;
  name: string;
  title: string;
  practiceArea: string;
  experienceYears: number;
  industries: string[];
  credentials: string[];
  bio: string;
  availability: string;
  isFellow: boolean;
  isVerified: boolean;
}

export const expertsData: ExpertProfile[] = [
  {
    id: "leena-raval",
    name: "Leena Raval",
    title: "Founder & Strategic Growth Advisor",
    practiceArea: "Strategic Leadership & Business Advisory",
    experienceYears: 18,
    industries: ["SMEs & Family Businesses", "High-Growth Startups", "Professional Services"],
    credentials: ["Senior Executive Advisor", "Ahmedabad Business Leader", "Strategic Transformation Specialist"],
    bio: "Founded Rise Advisory with the conviction that growing companies should not have to choose between exorbitant full-time executive payroll and detached, non-accountable consulting reports. Specializes in founder constraint diagnosis, executive alignment, and managed cross-functional pod delivery.",
    availability: "Selective Advisory & Diagnostic Lead",
    isFellow: true,
    isVerified: true
  },
  {
    id: "expert-cfo-1",
    name: "Senior Financial Practice Lead",
    title: "Fractional CFO & Capital Readiness Advisor",
    practiceArea: "Finance & Capital Readiness",
    experienceYears: 20,
    industries: ["Manufacturing", "Funded Startups", "SMEs"],
    credentials: ["Ex-CFO Listed Enterprise", "Fellow Chartered Accountant (FCA)", "Debt Syndication & MIS Architect"],
    bio: "Over two decades directing financial planning, 13-week liquidity forecasting, unit economics restructuring, and bank syndication for companies scaling from ₹15 Cr to ₹250 Cr.",
    availability: "Available for 90-Day Sprints (1–2 days/week)",
    isFellow: false,
    isVerified: true
  },
  {
    id: "expert-cmo-1",
    name: "Senior Growth Practice Lead",
    title: "Fractional CMO & GTM Strategist",
    practiceArea: "Growth & Revenue",
    experienceYears: 16,
    industries: ["FMCG & D2C", "B2B SaaS", "Consumer Tech"],
    credentials: ["Ex-Head of Marketing Tier-1 Brand", "IIM Alumnus", "Performance Attribution & Brand Positioning"],
    bio: "Proven growth leader who has scaled both consumer D2C brands and enterprise software pipelines through disciplined CAC control, brand narrative overhauls, and agency accountability.",
    availability: "Available for Retainers & Diagnostics",
    isFellow: false,
    isVerified: true
  },
  {
    id: "expert-cto-1",
    name: "Enterprise Technology Practice Lead",
    title: "Fractional CTO & AI Architect",
    practiceArea: "Technology, Product & AI",
    experienceYears: 19,
    industries: ["SaaS & Technology", "FinTech", "Industrial Automation"],
    credentials: ["Former VP Engineering", "Cloud Architecture Specialist", "Enterprise Security & AI Deployment"],
    bio: "Specializes in eliminating costly dev agency dependencies, pruning cloud infrastructure spend, optimizing dev sprint velocity, and safely deploying high-ROI agentic workflows.",
    availability: "Available for 90-Day Tech Overhauls",
    isFellow: false,
    isVerified: true
  },
  {
    id: "expert-coo-1",
    name: "Operations & Systems Practice Lead",
    title: "Fractional COO & Operational Architect",
    practiceArea: "People & Operations",
    experienceYears: 18,
    industries: ["Manufacturing", "Multi-Unit Retail", "Professional Services"],
    credentials: ["Certified Lean Six Sigma Black Belt", "Ex-COO Scale-up", "SOP & Delegation Specialist"],
    bio: "Master of operational systematization. Helps founders transition out of daily operational firefighting through documented SOPs, RACI matrices, and automated executive dashboards.",
    availability: "Available for Transformation Retainers",
    isFellow: false,
    isVerified: true
  },
  {
    id: "expert-chro-1",
    name: "People & Culture Practice Lead",
    title: "Fractional CHRO & Org Design Advisor",
    practiceArea: "People & Operations",
    experienceYears: 17,
    industries: ["Technology", "Healthcare", "Family Conglomerates"],
    credentials: ["XLRI Alumnus", "POSH & Indian Labor Compliance Specialist", "Executive Coach"],
    bio: "Focuses on institutionalizing objective performance management, transparent compensation bands, high-retention onboarding, and co-founder alignment charters.",
    availability: "Available for HR Sprints & Retainers",
    isFellow: false,
    isVerified: true
  }
];

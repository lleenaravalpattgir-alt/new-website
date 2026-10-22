export interface DeliveryStage {
  step: string;
  name: string;
  subtitle: string;
  clientExperience: string;
  output: string;
  duration: string;
  icon: string;
}

export const deliveryStages: DeliveryStage[] = [
  {
    step: "01",
    name: "Diagnose",
    subtitle: "Identify the Constraint & Baseline",
    clientExperience: "Founder interview, financial & operational data request, leadership-gap assessment, and bottleneck analysis.",
    output: "Constraint Map, Leadership Gap Audit & 90-Day Baseline Scorecard.",
    duration: "Days 1–10",
    icon: "Search"
  },
  {
    step: "02",
    name: "Design",
    subtitle: "Select the Role, Pod & 90-Day Plan",
    clientExperience: "Match exact expert or cross-functional pod, agree on measurable milestones, assign RACI responsibilities, and set governance.",
    output: "Statement of Work (SOW), 90-Day Execution Sprint Plan & RACI Matrix.",
    duration: "Days 10–14",
    icon: "Compass"
  },
  {
    step: "03",
    name: "Deploy",
    subtitle: "Onboard Experts & Establish Cadence",
    clientExperience: "Seamless onboarding of fractional CXO(s) into your team, system access setup, tool integration, and kickoff alignment.",
    output: "Team Kickoff Charter, Shared Dashboard & Weekly Meeting Rhythm.",
    duration: "Days 15–20",
    icon: "Rocket"
  },
  {
    step: "04",
    name: "Deliver",
    subtitle: "Execute Sprints & Remove Blockers",
    clientExperience: "Weekly execution rhythm, decision-making support, coaching internal managers, removing operational bottlenecks, and shipping deliverables.",
    output: "Weekly Milestone Logs, Operational SOPs & Sprint Reviews.",
    duration: "Weeks 4–11",
    icon: "Target"
  },
  {
    step: "05",
    name: "Demonstrate",
    subtitle: "Review Evidence & Scorecards",
    clientExperience: "Monthly executive business review comparing baseline metrics against actual completed milestones and business indicators.",
    output: "Executive Monthly Review Pack, Before/After Evidence & Scorecard.",
    duration: "Monthly / Day 90",
    icon: "BarChart3"
  },
  {
    step: "06",
    name: "Decide",
    subtitle: "Renew, Adjust, Hand Over or Conclude",
    clientExperience: "Objective strategic assessment: extend retainer, adjust expert intensity, hand over playbooks to full-time hires, or conclude successfully.",
    output: "Next-Quarter Roadmap, Handover Documentation or Renewal SOW.",
    duration: "Quarterly Review",
    icon: "CheckCircle2"
  }
];

export interface CommercialOffer {
  id: string;
  title: string;
  badge: string;
  scope: string;
  indicativePricing: string;
  bestFor: string;
  features: string[];
  ctaLabel: string;
}

export const commercialOffers: CommercialOffer[] = [
  {
    id: "power-session",
    title: "Expert Power Session",
    badge: "Quick Strategic Clarity",
    scope: "60–90 minutes high-intensity strategy session + written action note with concrete next steps.",
    indicativePricing: "₹7,500 – ₹25,000",
    bestFor: "Founders needing fast, expert second opinion on a high-stakes decision, pricing dilemma, or hire.",
    features: [
      "Confidential 60–90 min session with veteran fractional leader",
      "Pre-call review of pitch deck, financial model, or problem brief",
      "Written Action Note delivered within 48 hours",
      "Direct recommendations on vendor, pricing, or tech choice"
    ],
    ctaLabel: "Book a Power Session"
  },
  {
    id: "growth-diagnostic",
    title: "Growth & Leadership Diagnostic",
    badge: "Core Entry Offer",
    scope: "Comprehensive 2-week diagnostic: founder interviews, data review, constraint mapping, and 90-day priorities.",
    indicativePricing: "₹25,000 – ₹75,000",
    bestFor: "Companies experiencing stalled growth, founder bottlenecks, or preparing for rapid expansion.",
    features: [
      "Multi-stakeholder executive and founder interviews",
      "Deep-dive audit of cash flow, sales funnel, tech stack & org chart",
      "Visual 90-Day Growth Constraint Map",
      "Specific roadmap of required fractional leadership and pods"
    ],
    ctaLabel: "Book Diagnostic"
  },
  {
    id: "90-day-sprint",
    title: "90-Day Rise Execution Sprint",
    badge: "Flagship Offer",
    scope: "One named strategic outcome, weekly implementation cadence, shared dashboard, and dedicated expert lead.",
    indicativePricing: "₹1.5 Lakh – ₹6 Lakh / sprint",
    bestFor: "Funded startups and SMEs needing to solve one urgent bottleneck (e.g. DSO reduction, GTM launch, SOP overhaul).",
    features: [
      "Dedicated Fractional CXO acting as accountable Engagement Lead",
      "Weekly execution sprints and blocker removal",
      "Bi-weekly executive steering review",
      "Backed by the Rise Execution Guarantee"
    ],
    ctaLabel: "Start a 90-Day Sprint"
  },
  {
    id: "cxo-retainer",
    title: "Fractional CXO Retainer",
    badge: "Ongoing Executive Leadership",
    scope: "1 to 3 days per week ongoing executive ownership, team mentorship, board reporting, and monthly scorecards.",
    indicativePricing: "₹75,000 – ₹3 Lakh / month / role",
    bestFor: "Growing businesses needing seasoned C-suite leadership without full-time hiring cost or equity dilution.",
    features: [
      "Ongoing C-suite member (CFO, CMO, CTO, COO, CHRO, CRO, CAIO, CPO)",
      "Participates in executive meetings and board sessions",
      "Mentors internal managers and holds external agencies accountable",
      "Flexible quarterly renewal commitments"
    ],
    ctaLabel: "Hire a Fractional CXO"
  },
  {
    id: "growth-pod",
    title: "Rise Growth Pod",
    badge: "Cross-Functional Powerhouse",
    scope: "One accountable Lead CXO + 2 to 4 vetted specialists + PMO delivery management layer.",
    indicativePricing: "₹2.5 Lakh – ₹8 Lakh / month",
    bestFor: "Companies tackling multi-disciplinary growth (e.g. brand + sales + finance + automation).",
    features: [
      "Single accountable Rise Engagement Lead managing the entire pod",
      "Vetted specialists across growth, finance, tech, and operations",
      "Zero coordination friction—one invoice, one contract, one cadence",
      "Includes project management and quality assurance layer"
    ],
    ctaLabel: "Deploy a Growth Pod"
  },
  {
    id: "workshop-program",
    title: "Executive Workshops & Team Programs",
    badge: "Intensive Team Capability",
    scope: "Half-day or full-day structured workshops on AI adoption, sales playbooks, financial literacy, or leadership offsites.",
    indicativePricing: "₹35,000 – ₹2 Lakh / session",
    bestFor: "Leadership teams, promoter families, or departmental managers needing aligned capability breakthroughs.",
    features: [
      "Customized workbook and real company case study exercises",
      "Facilitated by veteran corporate trainers and fractional leaders",
      "Action commitments and post-workshop 30-day accountability check",
      "Available on-site across India or hybrid virtual"
    ],
    ctaLabel: "Inquire About Workshops"
  }
];

export const businessChallenges = [
  {
    title: "Founder Dependency",
    problem: "Every single operational, pricing, and hiring decision routes through the founder, creating an exhausting bottleneck that limits company growth.",
    solution: "A Fractional COO implements documented SOPs, delegation frameworks, and RACI matrices that allow the business to run smoothly without the founder's daily intervention."
  },
  {
    title: "Lack of Senior Leadership",
    problem: "Middle managers are overwhelmed, and the business cannot justify spending ₹60L+ annually plus equity on multiple full-time C-suite executives.",
    solution: "Fractional CXOs give you Tier-1 executive leadership 1 to 2 days per week at 25-30% of the cost, bringing decades of proven battle-tested playbooks."
  },
  {
    title: "Unclear Growth Strategy & High CAC",
    problem: "Ad agencies burn cash on vanity metrics and superficial clicks without generating predictable sales pipeline or positive contribution margins.",
    solution: "A Fractional CMO/CRO audits unit economics, aligns customer acquisition with sales qualification, and holds marketing channels strictly accountable to revenue."
  },
  {
    title: "Weak Financial Visibility & Cash Flow",
    problem: "Financial reports arrive weeks late, cash flow crunches happen unexpectedly, and lack of institutional data rooms stalls investor and bank conversations.",
    solution: "A Fractional CFO installs a 13-week rolling cash-flow forecast, board-level monthly MIS, and capital-readiness data rooms."
  },
  {
    title: "Inefficient Operations & Siloed Teams",
    problem: "Sales, delivery, and customer service operate in disconnected silos with repeated handoff errors, delayed client shipments, and scope creep.",
    solution: "A cross-functional Rise Growth Pod bridges silos with unified sprint governance, clear handoff protocols, and transparent scorecards."
  },
  {
    title: "Fragmented Tech Systems & AI Hype",
    problem: "Disjointed software tools, expensive dev agencies delivering buggy code, and confusion on how to safely deploy AI without data leakage.",
    solution: "A Fractional CTO/CAIO audits codebases, optimizes cloud spending, and deploys high-ROI automated workflows that save hundreds of operational hours."
  }
];

export const whyRyzePoints = [
  {
    title: "Vetted Specialist Expertise",
    description: "Every advisor on our bench has 12–20+ years of operational leadership experience. No junior consultants practicing on your account."
  },
  {
    title: "One Accountable Engagement Lead",
    description: "You deal with a single senior executive who takes ownership of the entire relationship, deliverables, and team orchestration."
  },
  {
    title: "Clear Milestones & SOW Ownership",
    description: "Every engagement is governed by transparent 30/60/90-day deliverables and clear criteria for completion. No vague hourly billing."
  },
  {
    title: "Weekly Execution Cadence",
    description: "Advice is paired directly with hands-on weekly execution sprints, blocker removal, and direct manager coaching."
  },
  {
    title: "Flexible Access to Senior Leadership",
    description: "Scale executive intensity up or down as your growth stage evolves, without long-term severance liabilities or equity dilution."
  },
  {
    title: "Documented Scorecards & Guarantee",
    description: "Transparent before/after evidence backed by the contractually defined Rise Execution Guarantee."
  }
];

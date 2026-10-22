export interface SolutionPillar {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  headline: string;
  tagline: string;
  summary: string;
  roles: string[];
  audience: string[];
  problemsAddressed: string[];
  deliverables: {
    title: string;
    description: string;
  }[];
  engagementProcess: {
    step: string;
    title: string;
    desc: string;
  }[];
  kpis: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
  icon: string;
}

export const solutionsData: SolutionPillar[] = [
  {
    id: "growth-revenue",
    slug: "growth-revenue",
    title: "Growth & Revenue",
    shortTitle: "Growth",
    headline: "Transform Fragmented Sales & Marketing into a High-Conversion Revenue Engine",
    tagline: "Fractional CMO, CRO, CSO, brand, sales, performance marketing, and distribution expertise.",
    summary: "Stop burning cash on disconnected ad campaigns or vanity metrics. Rise Advisory Growth & Revenue leaders diagnose customer acquisition bottlenecks, realign your value proposition, build disciplined go-to-market pipelines, and optimize unit economics.",
    roles: ["Fractional CMO", "Fractional CRO", "Fractional CSO", "Distribution & Growth Leads"],
    audience: [
      "Startups needing product-market fit validation and repeatable GTM",
      "Founder-led SMEs with stalled organic sales or reliance on founder relationships",
      "D2C brands struggling with rising CAC and channel margin compression",
      "B2B service firms seeking predictable outbound and inbound pipeline systems"
    ],
    problemsAddressed: [
      "High customer acquisition cost (CAC) eroding gross margins",
      "Founder acting as sole chief salesperson with no scalable pipeline",
      "Marketing agency delivering vanity impressions without revenue attribution",
      "Unclear market positioning against lower-priced or entrenched competitors",
      "Fragmented sales collateral, lack of disciplined follow-up, and low deal conversion"
    ],
    deliverables: [
      {
        title: "Go-to-Market & Channel Architecture",
        description: "Comprehensive ICP definition, channel testing framework, pricing and packaging structure, and CAC target modeling."
      },
      {
        title: "Sales Pipeline & CRM Rhythm",
        description: "Full funnel setup, deal qualification criteria, weekly pipeline review cadence, and outbound prospecting playbooks."
      },
      {
        title: "Brand Narrative & Conversion Assets",
        description: "Executive messaging matrix, pitch decks, case study collateral, and conversion-optimized web copy."
      },
      {
        title: "Weekly Revenue Execution Cadence",
        description: "Sprint-based execution with dedicated fractional growth lead driving daily blockers and weekly revenue metrics."
      }
    ],
    engagementProcess: [
      { step: "01", title: "Diagnostic", desc: "Audit current acquisition channels, funnel drop-offs, CAC-to-LTV ratios, and sales cycle duration." },
      { step: "02", title: "90-Day Sprint Plan", desc: "Define 3 core commercial milestones, allocate fractional lead, and lock weekly operating targets." },
      { step: "03", title: "Execution & Optimization", desc: "Ship validated campaigns, train sales team, refine messaging, and instrument attribution." },
      { step: "04", title: "Review & Scaling", desc: "Monthly executive review of pipeline growth, conversion rates, and revenue impact." }
    ],
    kpis: [
      "Customer Acquisition Cost (CAC) reduction",
      "Sales Qualified Leads (SQL) velocity",
      "Deal close rate and sales cycle reduction",
      "Pipeline-to-quota coverage ratio"
    ],
    faqs: [
      {
        question: "How does a Fractional CMO differ from an advertising agency?",
        answer: "An agency typically executes tasks (such as running ad spend or posting social graphics) without owning business revenue or overall P&L accountability. A Rise Advisory Fractional CMO acts as your executive marketing leader: they set strategy, select and hold vendors accountable, optimize unit economics, and align marketing with sales and product."
      },
      {
        question: "How quickly can we see measurable progress?",
        answer: "The diagnostic baseline and first 90-day sprint priorities are locked within the first 10 business days. Early funnel optimizations and messaging adjustments usually launch within the first 30 days."
      }
    ],
    icon: "TrendingUp"
  },
  {
    id: "finance-capital-readiness",
    slug: "finance-capital-readiness",
    title: "Finance & Capital Readiness",
    shortTitle: "Finance",
    headline: "Institutional-Grade Financial Governance, Cash Visibility & Investor Readiness",
    tagline: "Fractional CFO, FP&A, management information systems, cash-flow visibility, unit economics, and capital-readiness coordination.",
    summary: "Move beyond standard backward-looking tax compliance into forward-looking strategic financial leadership. Rise Advisory Fractional CFOs establish rolling cash-flow forecasts, robust MIS dashboards, margin protection, and clean data rooms for debt or equity rounds.",
    roles: ["Fractional CFO", "Strategic FP&A Lead", "Capital Readiness Advisor"],
    audience: [
      "Funded startups preparing for Series A/B diligence and institutional data rooms",
      "Growing SMEs (₹5 Cr–₹100 Cr) experiencing rapid revenue growth with delayed collections and cash crunches",
      "Family businesses transitioning from traditional accounting to modern corporate governance",
      "Companies preparing for strategic debt syndication, private equity, or SME IPO roadmap"
    ],
    problemsAddressed: [
      "Founder flying blind with no real-time cash flow runway or rolling 13-week forecast",
      "Delayed or inaccurate monthly MIS reports arriving 30+ days after month-end",
      "Erosion of gross margins due to poor unit economic controls and unmeasured discounts",
      "Unprepared financial records and messy cap tables stalling investor conversations",
      "Over-reliance on external chartered accountants who only file statutory returns without strategic advisory"
    ],
    deliverables: [
      {
        title: "13-Week Rolling Cash-Flow Engine",
        description: "Dynamic cash modeling tool tracking working capital, collections, vendor commitments, and minimum liquidity buffers."
      },
      {
        title: "Executive MIS & Unit Economics Dashboard",
        description: "Monthly board-level management pack covering gross contribution margins, departmental burn, and variance analysis."
      },
      {
        title: "Capital Readiness & Investor Data Room",
        description: "Preparation of audited financial models, cap table cleanup, investor FAQ prep, and coordination with legal/audit partners."
      },
      {
        title: "Internal Financial Controls & Working Capital SOW",
        description: "Credit policies, invoicing cadence, approval hierarchies, and DSO (Days Sales Outstanding) reduction playbooks."
      }
    ],
    engagementProcess: [
      { step: "01", title: "Diagnostic", desc: "Review historical accounting, balance sheet health, unit economics, and MIS reporting cycles." },
      { step: "02", title: "Control Setup", desc: "Implement rolling cash forecast, align chart of accounts, and define approval workflows." },
      { step: "03", title: "Strategic Cadence", desc: "Fractional CFO leads weekly cash reviews, vendor terms negotiations, and monthly board MIS." },
      { step: "04", title: "Readiness Review", desc: "Review capital requirements, bank syndication readiness, and quarterly audit posture." }
    ],
    kpis: [
      "Days Sales Outstanding (DSO) reduction",
      "Working capital buffer and cash runway predictability",
      "Gross and EBITDA margin variance accuracy",
      "MIS delivery timeliness (within 7 business days of month close)"
    ],
    faqs: [
      {
        question: "Does Rise Advisory provide statutory auditing or tax filing?",
        answer: "Rise Advisory provides executive financial advisory and strategic CFO leadership. For statutory audits, legal opinions, and tax filings, we coordinate directly with your registered CA/legal firms or introduce vetted licensed partners, ensuring strict regulatory compliance."
      },
      {
        question: "Can a Fractional CFO help us raise capital?",
        answer: "Yes, our Fractional CFOs prepare financial models, audit your unit economics, build institutional data rooms, and sit alongside founders during investor Q&A. However, we never guarantee funding approval or valuation figures, focusing on true investor-grade preparation."
      }
    ],
    icon: "DollarSign"
  },
  {
    id: "technology-product-ai",
    slug: "technology-product-ai",
    title: "Technology, Product & AI",
    shortTitle: "Tech & AI",
    headline: "Pragmatic Technology Roadmaps, AI Automation & Scalable Architecture",
    tagline: "Fractional CTO, CIO, CPO, CAIO, technology strategy, product leadership, automation, and AI adoption.",
    summary: "Bridge the gap between ambitious business vision and reliable digital execution. Rise Advisory Fractional CTOs, CPOs, and AI Officers manage tech stacks, eliminate technical debt, vet engineering vendors, and deploy pragmatic AI automation that delivers tangible ROI.",
    roles: ["Fractional CTO", "Fractional CAIO", "Fractional CPO", "AI & Automation Leads"],
    audience: [
      "Non-technical founders struggling to manage external software agencies or dev teams",
      "SMEs seeking to automate manual operational workflows using practical AI tools",
      "Tech startups experiencing scaling bottlenecks, downtime, or security concerns",
      "Companies wanting to build proprietary AI-driven customer experiences or internal agentic tooling"
    ],
    problemsAddressed: [
      "Costly dev agencies building convoluted code without business alignment",
      "Founder spending hours copying data between spreadsheets and disconnected software",
      "Lack of architectural clarity leading to frequent outages or tech debt",
      "Hype-driven confusion regarding how to safely implement AI and LLMs in business operations",
      "Absence of product roadmap discipline and continuous feature bloat without customer validation"
    ],
    deliverables: [
      {
        title: "Enterprise Architecture & Tech Stack Audit",
        description: "Evaluation of codebase health, cloud infrastructure costs, security posture, and vendor service level agreements."
      },
      {
        title: "AI & Workflow Automation Blueprint",
        description: "Identification of top 3 high-impact manual bottlenecks and deployment of production-grade automated workflows."
      },
      {
        title: "Product Roadmap & Sprint Governance",
        description: "Clear customer-centric prioritization, user story specifications, acceptance criteria, and dev velocity tracking."
      },
      {
        title: "Vendor Vetting & Dev Team Leadership",
        description: "Technical interviewing, code review governance, and objective oversight of dev agencies or in-house engineers."
      }
    ],
    engagementProcess: [
      { step: "01", title: "Diagnostic", desc: "Audit architecture, infrastructure spend, security vulnerabilities, and dev team velocity." },
      { step: "02", title: "Roadmap Alignment", desc: "Create 90-day technical sprint roadmap, prioritizing stability, ROI-driven automation, and core features." },
      { step: "03", title: "Sprint Execution", desc: "Fractional CTO runs sprint reviews, enforces code standards, and directs automation deployments." },
      { step: "04", title: "Continuous Evolution", desc: "Monthly architecture reviews, cloud cost optimizations, and AI integration expansions." }
    ],
    kpis: [
      "System uptime and incident resolution time",
      "Dev team velocity and release cycle predictability",
      "Cloud and vendor spend reduction",
      "Operational hours saved through workflow automation"
    ],
    faqs: [
      {
        question: "Do we need a full-time CTO or a Fractional CTO?",
        answer: "If your company is between seed stage and ₹50 Cr revenue, a full-time executive CTO often costs ₹40L–₹80L+ annually and may be under-utilized on strategic tasks. A Fractional CTO provides the senior strategic architecture, vendor governance, and high-stakes decisions at 20-30% of the cost."
      },
      {
        question: "How do you evaluate AI feasibility for our operations?",
        answer: "We focus strictly on high-impact, low-hallucination automation (document extraction, automated customer support triage, sales research enrichment, and data reconciliation) rather than speculative experiments."
      }
    ],
    icon: "Cpu"
  },
  {
    id: "people-operations",
    slug: "people-operations",
    title: "People & Operations",
    shortTitle: "Operations",
    headline: "Systematize Execution, Org Design & High-Performance Operating Cadence",
    tagline: "Fractional COO, CHRO, HR systems, organizational design, SOPs, compliance coordination, and productivity improvement.",
    summary: "Free the founder from day-to-day firefighting. Rise Advisory Fractional COOs and CHROs build documented Standard Operating Procedures (SOPs), establish accountability frameworks (OKRs/KPIs), design scalable organizational structures, and streamline cross-departmental delivery.",
    roles: ["Fractional COO", "Fractional CHRO", "Operations Architecture Leads"],
    audience: [
      "Rapidly scaling companies where every operational decision still lands on the CEO's desk",
      "Family businesses experiencing friction between legacy practices and new professional hires",
      "Multi-location or service businesses suffering from inconsistent service quality and delivery delays",
      "Founders experiencing high employee turnover or lack of performance accountability"
    ],
    problemsAddressed: [
      "Severe founder dependency: operations stall whenever the founder takes a leave",
      "Lack of documented Standard Operating Procedures (SOPs), causing repeated errors",
      "Fuzzy job descriptions and lack of objective performance appraisal metrics",
      "Departments operating in silos with poor handoffs between sales, ops, and fulfillment",
      "Inefficient hiring processes leading to bad cultural fit and protracted recruitment cycles"
    ],
    deliverables: [
      {
        title: "Standard Operating Procedures (SOP) Playbook",
        description: "End-to-end documentation of core operational workflows, quality checklists, and escalation matrix."
      },
      {
        title: "Organizational Design & RACI Matrix",
        description: "Clear organizational hierarchy, delegation boundaries, functional scorecards, and reporting lines."
      },
      {
        title: "Performance Management & KPI System",
        description: "Quarterly OKR framework, automated appraisal forms, and monthly 1-on-1 performance review templates."
      },
      {
        title: "Weekly Operating Rhythm & Dashboard",
        description: "Monday alignment meetings, Friday milestone check-ins, and shared executive dashboard."
      }
    ],
    engagementProcess: [
      { step: "01", title: "Diagnostic", desc: "Map current operational bottlenecks, time audit of leadership, and organizational structure gaps." },
      { step: "02", title: "Process Redesign", desc: "Streamline workflows, write essential SOPs, and define role-by-role accountability scorecards." },
      { step: "03", title: "Cadence Rollout", desc: "Train team leads, establish weekly operating rhythm, and transition routine decisions to managers." },
      { step: "04", title: "Optimization", desc: "Refine metrics, evaluate departmental capacity, and track founder delegation index." }
    ],
    kpis: [
      "Founder time freed from daily firefighting (hours/week)",
      "SOP compliance and process error rate reduction",
      "On-time delivery and SLA adherence percentage",
      "Employee retention and milestone completion rate"
    ],
    faqs: [
      {
        question: "When does an SME need a Fractional COO?",
        answer: "When revenue is growing but operational chaos is increasing, delivery dates are slipping, customer complaints are rising, and the founder spends all day answering questions instead of focusing on strategy and growth."
      },
      {
        question: "Will our existing team resist an external fractional leader?",
        answer: "Our fractional leaders are seasoned operators who partner with your team rather than acting like detached critics. They mentor your managers, eliminate friction, and build systems that make daily work less stressful."
      }
    ],
    icon: "Users"
  },
  {
    id: "founder-team-performance",
    slug: "founder-team-performance",
    title: "Founder & Team Performance",
    shortTitle: "Founder & Team",
    headline: "Executive Decision-Making, Leadership Alignment & Team Effectiveness",
    tagline: "Executive coaching, leadership alignment, facilitation, team effectiveness, and workplace wellbeing.",
    summary: "A company's ceiling is determined by its leadership capacity. Rise Advisory provides grounded executive coaching, conflict mediation for co-founders and family boards, structured offsites, and evidence-oriented workplace wellbeing that drives clarity, focus, and sustained execution.",
    roles: ["Executive Coach", "Leadership Alignment Facilitator", "Team Effectiveness Lead"],
    audience: [
      "Co-founders experiencing strategic disagreement or equity/role friction",
      "Family business principals managing generational transition and succession planning",
      "First-time founders transitioning into managing senior executives and managers",
      "Executive teams experiencing burnout, high stress, or fragmented communication"
    ],
    problemsAddressed: [
      "Co-founder misalignments paralyzing strategic business decisions",
      "Founder burnout, decision fatigue, and chronic reactive mode",
      "Difficulty delegating authority and trusting newly appointed senior leaders",
      "Intergenerational friction between senior promoters and next-generation leadership in family businesses",
      "Lack of psychological safety and candid feedback among executive team members"
    ],
    deliverables: [
      {
        title: "Co-Founder & Leadership Alignment Charter",
        description: "Documented decision boundaries, dispute-resolution protocols, and shared 3-year vision statement."
      },
      {
        title: "Executive 1-on-1 Coaching Cadence",
        description: "Bi-weekly structured sessions focused on delegation, strategic prioritization, and emotional resilience."
      },
      {
        title: "Executive Strategic Offsite Facilitation",
        description: "Structured quarterly leadership sessions addressing elephant-in-the-room issues and locking annual OKRs."
      },
      {
        title: "Workplace Wellbeing & Focus Framework",
        description: "Evidence-based stress management, meeting hygiene protocols, and cognitive performance practices."
      }
    ],
    engagementProcess: [
      { step: "01", title: "Diagnostic", desc: "Confidential interviews with founders, key stakeholders, and leadership team assessment." },
      { step: "02", title: "Alignment Session", desc: "Facilitated alignment workshop to address tensions, clarify vision, and set mutual expectations." },
      { step: "03", title: "Coaching Cadence", desc: "Scheduled 1-on-1 executive coaching sprints and quarterly check-ins on leadership goals." },
      { step: "04", title: "Evaluation", desc: "Review decision quality, co-founder trust index, and leadership team cohesion." }
    ],
    kpis: [
      "Leadership team alignment and alignment score",
      "Speed of strategic decision-making and blocker resolution",
      "Founder mental bandwidth and delegation score",
      "Executive retention and team engagement metrics"
    ],
    faqs: [
      {
        question: "How does executive coaching work with operational delivery?",
        answer: "At Rise Advisory, coaching is never theoretical or isolated. It is paired directly with operational execution: coaches work alongside fractional CXOs so that personal leadership growth directly translates into business milestones."
      },
      {
        question: "Is this approach appropriate for traditional family businesses in India?",
        answer: "Yes, our advisors possess deep cultural fluency and experience handling the delicate balance of family dynamics, multi-generational governance, and modern professional standards."
      }
    ],
    icon: "ShieldAlert"
  }
];

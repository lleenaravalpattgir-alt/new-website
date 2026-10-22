export interface IndustrySolution {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  headline: string;
  tagline: string;
  summary: string;
  triggers: string[];
  sectorConstraints: string[];
  recommendedPod: {
    leadRole: string;
    supportingRoles: string[];
    description: string;
  };
  keyDeliverables: string[];
  caseStudyHighlight: {
    clientType: string;
    challenge: string;
    intervention: string;
    outcome: string;
  };
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const industriesData: IndustrySolution[] = [
  {
    id: "startups",
    slug: "startups",
    title: "Startups & High-Growth Ventures",
    shortTitle: "Startups",
    headline: "Senior Executive Firepower to Accelerate Traction, GTM & Capital Readiness",
    tagline: "Seed to Series B startups needing CXO leadership without diluting equity or burning runway on full-time executive salaries.",
    summary: "Early-stage and funded startups must move fast while making zero catastrophic leadership mistakes. Rise Advisory embeds veteran fractional executives into your company to validate product-market fit, optimize unit economics, build investor data rooms, and structure scalable engineering sprints.",
    triggers: [
      "Secured seed or pre-Series A funding and need senior leadership before full-time hiring",
      "Struggling to translate technical innovation into repeatable B2B sales pipelines",
      "High burn rate requiring tight cash runway management and unit economics discipline",
      "Preparing for Series A due diligence and institutional investor data rooms"
    ],
    sectorConstraints: [
      "Limited cash runway preventing ₹50L+ full-time executive compensation",
      "First-time founders lacking experience managing senior functional leads",
      "Rapidly changing product priorities risking architectural tech debt",
      "Need for institutional governance before institutional investors write checks"
    ],
    recommendedPod: {
      leadRole: "Fractional CFO or Fractional CMO",
      supportingRoles: ["Fractional CTO", "Growth & Outbound Specialist", "Financial Modeling Analyst"],
      description: "A focused growth or finance pod ensuring unit economics hold while pipeline velocity accelerates."
    },
    keyDeliverables: [
      "13-Week Cash Flow Engine & Runway Extension Blueprint",
      "Repeatable Go-to-Market (GTM) Architecture & Inbound Engine",
      "Investor Diligence Data Room & Audited Cap Table Model",
      "Modular Engineering Sprint & CI/CD Governance"
    ],
    caseStudyHighlight: {
      clientType: "Funded Logistics SaaS Platform (Seed Stage, Bengaluru/Ahmedabad)",
      challenge: "Founder spending 60% of time handling manual sales pitches and chaotic dev sprints with only 4 months of runway visible.",
      intervention: "Deployed a 90-Day Sprint with a Fractional CRO and Fractional CFO to restructure enterprise pricing and clean unit economics.",
      outcome: "Expanded cash runway by 3.5 months through working capital discipline and closed 3 enterprise contracts totaling ₹42L ARR."
    },
    faqs: [
      {
        question: "When is the right time for a startup to hire a Fractional CXO?",
        answer: "As soon as you have initial traction and need senior guidance to scale without burning 20-30% of your round on recruiter fees and full-time executive salaries."
      },
      {
        question: "Do fractional leaders take startup equity?",
        answer: "Our standard engagements are cash-based monthly retainers, preserving your valuable equity for your founding team and institutional investors. Hybrid structures can be evaluated upon request."
      }
    ]
  },
  {
    id: "smes-family-businesses",
    slug: "smes-family-businesses",
    title: "SMEs & Family Businesses",
    shortTitle: "SMEs & Family Businesses",
    headline: "Professionalize Governance, De-bottleneck the Founder & Build Legacy Value",
    tagline: "Bridging the gap between entrepreneurial founder grit and modern institutional corporate governance.",
    summary: "Generational and founder-led businesses in India often hit an operational ceiling when revenue reaches ₹10 Cr to ₹100 Cr. Rise Advisory helps family businesses transition from informal management into professionalized operating systems, transparent MIS reporting, and robust succession frameworks.",
    triggers: [
      "Company growth has stalled because every minor decision requires promoter sign-off",
      "Next-generation family members stepping into leadership needing structured mentorship",
      "Disjointed reporting between accounting tally and actual factory or sales performance",
      "Ambition to raise growth equity, bank debt syndication, or prepare for an SME IPO"
    ],
    sectorConstraints: [
      "Promoter fear of losing control or exposing proprietary business practices",
      "Informal oral communication replacing documented Standard Operating Procedures",
      "Difficulty attracting and retaining high-caliber corporate managers in tier-2/tier-3 hubs",
      "Generational friction regarding digital modernization and modern marketing strategies"
    ],
    recommendedPod: {
      leadRole: "Fractional COO / Transformation Lead",
      supportingRoles: ["Fractional CFO", "HR Governance Lead", "Family Board Facilitator"],
      description: "A seasoned transformation team that respects traditional business strengths while systematizing operations."
    },
    keyDeliverables: [
      "Company-Wide Delegation Framework & Promoters Decision Charter",
      "Modernized Executive MIS & Real-Time Cash Flow Dashboard",
      "Documented Standard Operating Procedures (SOPs) for Core Operations",
      "Next-Gen Leadership Mentorship & Executive Alignment Roadmap"
    ],
    caseStudyHighlight: {
      clientType: "30-Year-Old Industrial Equipment Manufacturer (₹35 Cr Revenue, Gujarat)",
      challenge: "All purchase orders, vendor checks, and client negotiations routed exclusively through the founder, causing 3-week shipment delays.",
      intervention: "Embedded a Fractional COO and CFO to document manufacturing SOPs, establish approval hierarchies, and institute weekly MIS.",
      outcome: "Promoter firefighting reduced by 65%; on-time order fulfillment increased from 71% to 94% within 120 days."
    },
    faqs: [
      {
        question: "How do your advisors handle delicate family dynamics?",
        answer: "Our advisors bring decades of experience with Indian business promoters. We act as empathetic, objective third-party facilitators who honor the family's legacy while establishing clear operational boundaries."
      },
      {
        question: "Can you help our SME prepare for an SME IPO (NSE Emerge / BSE SME)?",
        answer: "Yes, our Fractional CFOs establish institutional governance, audit-ready MIS, internal financial controls, and coordinate with merchant bankers and legal counsel to prepare companies for capital readiness."
      }
    ]
  },
  {
    id: "fmcg-d2c",
    slug: "fmcg-d2c",
    title: "FMCG & Consumer Direct-to-Consumer (D2C)",
    shortTitle: "FMCG & D2C",
    headline: "Master Unit Economics, Omnichannel Distribution & Sustainable CAC",
    tagline: "Proven executive leadership across retail distribution, digital performance, margin protection, and supply chain.",
    summary: "The consumer goods landscape in India is fiercely competitive. High customer acquisition costs, distributor credit cycles, and inventory working capital can destroy cash flow. Rise Advisory Fractional CMOs and CFOs build profitable retail and digital growth engines with strict gross contribution discipline.",
    triggers: [
      "Online ad spend generating sales at negative net contribution margins after returns and discounts",
      "Expansion from pure online D2C into general trade, modern trade, or quick commerce (Blinkit, Zepto)",
      "Inventory stockouts occurring simultaneously with dead stock in regional warehouses",
      "Distributor receivables stretching past 60 days, suffocating working capital"
    ],
    sectorConstraints: [
      "Tight gross margins vulnerable to logistics fees, marketplace commissions, and returns",
      "Complex omnichannel supply chain requirements across warehousing and store shelves",
      "High dependency on continuous performance ad spend without customer retention",
      "Difficulty managing distributor credit terms and regional trade promotions"
    ],
    recommendedPod: {
      leadRole: "Fractional CMO & Brand Strategist",
      supportingRoles: ["Fractional CFO (FMCG Margin Specialist)", "Retail Distribution Advisor", "Supply Chain Lead"],
      description: "An integrated commercial pod synchronizing brand demand with inventory capital and distribution margin targets."
    },
    keyDeliverables: [
      "SKU-Level Contribution Margin Analysis & Pricing Model",
      "Omnichannel Distribution Playbook (Modern Trade, Quick Commerce & D2C)",
      "Performance Ad Spend Attribution & Retention Lifecycle Workflows",
      "Working Capital & Inventory Turnover Optimization System"
    ],
    caseStudyHighlight: {
      clientType: "Premium Packaged Foods Brand (₹12 Cr ARR, Mumbai/Ahmedabad)",
      challenge: "High ad spend on Meta/Google yielded top-line GMV but generated a net monthly operating loss of ₹14L.",
      intervention: "Embedded a Fractional CMO and CFO pod. Pruned 4 non-profitable SKUs, launched quick-commerce channels, and instituted repeat-order SMS/WhatsApp flows.",
      outcome: "Blended CAC dropped by 34%, repeat customer rate rose from 14% to 32%, and company reached operating cash break-even in 90 days."
    },
    faqs: [
      {
        question: "How do you balance digital performance with retail offline expansion?",
        answer: "We ensure digital marketing builds local brand awareness in specific pin codes where your retail distribution is active, creating pull that accelerates distributor sales velocity."
      },
      {
        question: "Can your Fractional CFO help negotiate distributor margins?",
        answer: "Yes, our advisors establish standardized trade credit agreements, tiered volume rebate structures, and strict DSO thresholds."
      }
    ]
  },
  {
    id: "saas-technology",
    slug: "saas-technology",
    title: "SaaS & Technology Enterprises",
    shortTitle: "SaaS & Tech",
    headline: "Scale Product-Market Fit, Enterprise Sales Velocity & Cloud Architecture",
    tagline: "Strategic CPO, CTO, and CRO leadership to eliminate churn, increase Net Revenue Retention, and optimize infrastructure spend.",
    summary: "SaaS businesses require tight alignment between product roadmaps, cloud architecture, and enterprise sales execution. Rise Advisory Fractional Leaders help software ventures transition from founder-led selling into predictable enterprise pipeline engines while curbing cloud infrastructure spend.",
    triggers: [
      "Product churn remains high despite continuous engineering feature releases",
      "Enterprise sales cycles exceed 6 months with high proposal drop-off rates",
      "AWS/GCP cloud hosting and third-party API bills growing faster than revenue",
      "Need to adopt AI and LLMs inside the core platform without risking system stability"
    ],
    sectorConstraints: [
      "High CAC for enterprise B2B software requiring sophisticated MEDDIC qualification",
      "Complex multi-tenant architecture challenges during enterprise security reviews",
      "Engineering bottlenecks delaying critical roadmap commitments to key customers",
      "Disconnection between product usage analytics and customer success interventions"
    ],
    recommendedPod: {
      leadRole: "Fractional CRO / GTM Lead",
      supportingRoles: ["Fractional CTO (Cloud & AI)", "Fractional CPO (Product Analytics)", "Enterprise Sales Coach"],
      description: "A specialized tech leadership pod linking product telemetry directly to customer retention and sales closing."
    },
    keyDeliverables: [
      "Enterprise Deal Qualification & MEDDIC Sales Playbook",
      "Product Activation Telemetry & Churn Early-Warning Dashboard",
      "Cloud Infrastructure Audit & 25%+ Hosting Cost Reduction Plan",
      "Pragmatic AI Feature Integration & Security Architecture Blueprint"
    ],
    caseStudyHighlight: {
      clientType: "B2B HRTech SaaS Company ($1.8M ARR, Pune/Hyderabad)",
      challenge: "Annual customer churn was 24%, and enterprise deals were stalling at security compliance review stage.",
      intervention: "Deployed Fractional CPO and CTO. Redesigned customer onboarding flow and achieved SOC-2 Type II readiness compliance.",
      outcome: "Compressed time-to-first-value by 40%, reduced annual churn to 9.2%, and closed 2 multi-year enterprise contracts."
    },
    faqs: [
      {
        question: "How do you help improve our Net Revenue Retention (NRR)?",
        answer: "By analyzing product usage telemetry to identify power users, codifying customer health scores, and structuring automated expansion playbooks for upsells and add-ons."
      },
      {
        question: "Can you help our tech stack pass enterprise procurement audits?",
        answer: "Yes, our Fractional CTOs lead security compliance reviews, data privacy architecture, penetration test remediation, and vendor questionnaires."
      }
    ]
  },
  {
    id: "professional-services",
    slug: "professional-services",
    title: "Professional Services & Agency Growth",
    shortTitle: "Professional Services",
    headline: "Systematize Billable Utilization, Productize Services & Scale Margins",
    tagline: "Consultancies, marketing agencies, software development firms, and corporate service providers.",
    summary: "Professional service firms frequently suffer from the 'feast-and-famine' cycle, founder dependency for client pitches, and scope creep that destroys project gross margins. Rise Advisory helps agencies productize services, institute billable utilization tracking, and build predictable outbound business development.",
    triggers: [
      "Promoter is trapped pitching and delivering every single major client project",
      "Projects continuously suffer from scope creep without additional billing",
      "Lack of predictable monthly recurring revenue (MRR) creating cash flow anxiety",
      "High employee turnover due to delivery burnout and disorganized project schedules"
    ],
    sectorConstraints: [
      "Direct correlation between revenue growth and headcount, limiting scalability",
      "Subjective pricing based on gut feeling rather than cost-plus-capacity modeling",
      "Lack of documented delivery frameworks leading to inconsistent client satisfaction",
      "Difficulty turning customized bespoke work into standardized, productized packages"
    ],
    recommendedPod: {
      leadRole: "Fractional COO / Agency Scale Lead",
      supportingRoles: ["Fractional CFO", "Business Development Strategist", "Service Productization Coach"],
      description: "A practice-scaling pod focused on converting bespoke labor into standardized high-margin service retainers."
    },
    keyDeliverables: [
      "Productized Service Packaging & Value-Based Pricing Architecture",
      "Scope Creep Defense Framework & Master Services Agreement (MSA) Updates",
      "Resource Capacity Planning & Billable Utilization Tracker",
      "Outbound Pipeline System Targeting High-Value Enterprise Accounts"
    ],
    caseStudyHighlight: {
      clientType: "Digital Creative & Dev Agency (45 Team Members, Ahmedabad/NCR)",
      challenge: "Gross margins dropped below 18% due to unbilled revisions and delays in client milestone approvals.",
      intervention: "Embedded Fractional COO and CFO. Productized core service offerings, enforced strict SOW change orders, and instituted utilization metrics.",
      outcome: "Gross margin rebounded to 38%; secured 4 high-ticket retainer contracts totaling ₹65L in recurring annual revenue."
    },
    faqs: [
      {
        question: "How do we stop client scope creep without damaging relationships?",
        answer: "We introduce a transparent Change Request Protocol during contract kickoff that clearly articulates project boundaries, so clients appreciate that additional work has a defined timeline and investment."
      },
      {
        question: "Can you help us productize our customized services?",
        answer: "Yes, our advisors identify your firm's repeatable high-value outcomes and package them into structured 30/60/90-day sprints with fixed deliverables."
      }
    ]
  },
  {
    id: "manufacturing",
    slug: "manufacturing",
    title: "Manufacturing & Industrial Enterprises",
    shortTitle: "Manufacturing",
    headline: "Working Capital Optimization, Operational Discipline & Plant Productivity",
    tagline: "Auto components, precision engineering, chemicals, textiles, and capital goods manufacturers.",
    summary: "Manufacturing operations face intense raw material volatility, extended credit cycles from large OEM buyers, and shop-floor efficiency challenges. Rise Advisory Fractional COOs and CFOs establish lean production governance, working capital discipline, inventory turnover controls, and digital factory visibility.",
    triggers: [
      "Working capital tied up in slow-moving raw materials and finished goods inventory",
      "Plant capacity utilization running below 65% due to machine downtime and scheduling gaps",
      "OEM customer quality rejections causing costly scrap and penalty deductions",
      "Inability to pass raw material price surges onto end-customer contracts"
    ],
    sectorConstraints: [
      "Long order-to-cash cycles with OEM payment terms stretching 90+ days",
      "Capital-intensive machinery requiring disciplined ROI and capex payback analysis",
      "Informal production planning causing plant overtime and delivery bottlenecks",
      "Need for statutory environmental, labor, and safety compliance rigor"
    ],
    recommendedPod: {
      leadRole: "Fractional COO (Industrial Operations)",
      supportingRoles: ["Fractional CFO (Working Capital & Costing)", "Lean Manufacturing Specialist", "Supply Chain Lead"],
      description: "A plant-floor and commercial leadership pod tightening margins, inventory turns, and shop-floor throughput."
    },
    keyDeliverables: [
      "13-Week Cash Flow & Working Capital Cushion Blueprint",
      "Plant OEE (Overall Equipment Effectiveness) & Scrap Reduction Playbook",
      "Standardized Costing Sheets & Raw Material Price Escalation Clauses",
      "Inventory Turnover & Dynamic Reorder Point Management System"
    ],
    caseStudyHighlight: {
      clientType: "Precision Auto-Components Supplier (₹48 Cr Turnover, Rajkot/Sanand)",
      challenge: "Cash flow was chronically strained due to ₹9 Cr in trapped raw material inventory and 85-day DSO from key clients.",
      intervention: "Fractional CFO and COO restructured purchase cycles, instituted daily inventory reorder triggers, and negotiated supplier credit lines.",
      outcome: "Trapped inventory reduced by ₹3.1 Cr; DSO improved from 85 to 61 days, freeing ₹2.4 Cr in liquid cash within 90 days."
    },
    faqs: [
      {
        question: "Do your advisors visit our manufacturing plant?",
        answer: "Yes, for manufacturing engagements our Fractional COOs and Operations Leads conduct on-site plant diagnostics and physical shop-floor assessments before establishing remote and hybrid governance."
      },
      {
        question: "How do you help us negotiate with dominant OEM clients?",
        answer: "We build objective, transparent product-costing models that substantiate necessary price indexation tied to public raw material benchmarks."
      }
    ]
  }
];

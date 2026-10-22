export interface FractionalLeaderRole {
  id: string;
  slug: string;
  code: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  typicalChallenges: string[];
  keyResponsibilities: string[];
  milestones: {
    day30: string[];
    day60: string[];
    day90: string[];
  };
  deliverables: string[];
  engagementModels: {
    name: string;
    description: string;
    commitment: string;
  }[];
  standards: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const fractionalLeadersData: FractionalLeaderRole[] = [
  {
    id: "cfo",
    slug: "cfo",
    code: "CFO",
    title: "Fractional Chief Financial Officer (CFO)",
    shortTitle: "Fractional CFO",
    tagline: "Strategic Financial Leadership, Cash-Flow Visibility & Capital Readiness",
    description: "A seasoned finance executive who embeds into your business 1 to 3 days per week to transform historical accounting into forward-looking strategic financial governance, cash flow mastery, and investor readiness.",
    typicalChallenges: [
      "No visibility into rolling 13-week cash flow and working capital cushions",
      "Monthly MIS arrives 25+ days late and offers no actionable strategic insights",
      "Unit economics and gross margins eroding without clear accountability",
      "Preparing for debt syndication, private equity, or Series A/B funding without institutional data rooms",
      "Over-reliance on statutory CAs who file taxes but do not provide commercial strategy"
    ],
    keyResponsibilities: [
      "Architect and maintain rolling 13-week cash flow and working capital forecast models",
      "Deliver executive monthly MIS dashboard with variance analysis by day 7 of each month",
      "Tighten credit policies and vendor payment cycles to compress Days Sales Outstanding (DSO)",
      "Build institutional financial models, cap table governance, and investor data rooms",
      "Lead banking relationships, debt syndication discussions, and board financial reviews"
    ],
    milestones: {
      day30: [
        "Audit existing accounting system, chart of accounts, and historical unit economics",
        "Implement first version of rolling 13-week cash flow engine",
        "Establish immediate working capital and expense control authorizations"
      ],
      day60: [
        "Deliver standardized, automated executive MIS reporting cycle",
        "Renegotiate critical vendor payment terms and overhaul receivables collection cadence",
        "Clean up historical cap tables, balance sheet classifications, and financial models"
      ],
      day90: [
        "Full investor/bank data room ready for capital readiness or audit preparation",
        "Documented financial SOPs and KPI scorecards handed to internal finance manager",
        "Presentation of comprehensive 3-year strategic budget and margin expansion plan"
      ]
    },
    deliverables: [
      "Dynamic 13-Week Cash Flow Forecasting Model",
      "Monthly Board-Grade MIS & Unit Economics Dashboard",
      "Capital Readiness & Due Diligence Data Room",
      "Working Capital & Credit Terms Policy Document"
    ],
    engagementModels: [
      { name: "Growth Diagnostic", description: "Comprehensive 2-week audit of cash flow, unit economics, and MIS reporting.", commitment: "Fixed 2-week project" },
      { name: "90-Day Execution Sprint", description: "Focused on solving a specific constraint (e.g. DSO reduction or funding readiness).", commitment: "2 days / week" },
      { name: "Ongoing Executive Retainer", description: "Continuous strategic leadership, board presentations, and team oversight.", commitment: "1–3 days / week" }
    ],
    standards: [
      "15+ years of senior financial leadership experience (ex-CFO or VP Finance)",
      "Proven track record across fundraising, debt syndication, or SME scaling",
      "Absolute confidentiality and non-disclosure standards"
    ],
    faqs: [
      {
        question: "How does a Fractional CFO work with our existing accountant?",
        answer: "Your in-house or external accountant continues bookkeeping, invoicing, and tax filings. The Fractional CFO sits above them to review figures, provide forward-looking strategic analysis, manage cash flow, and guide high-stakes financial decisions."
      },
      {
        question: "What is the typical cost compared to a full-time CFO?",
        answer: "A full-time Tier-1 CFO in India commands ₹40L to ₹80L+ per year plus equity and bonuses. A Rise Advisory Fractional CFO typically costs ₹75,000 to ₹2.5 lakh per month, saving up to 70% while delivering executive firepower."
      }
    ]
  },
  {
    id: "cmo",
    slug: "cmo",
    code: "CMO",
    title: "Fractional Chief Marketing Officer (CMO)",
    shortTitle: "Fractional CMO",
    tagline: "Go-to-Market Architecture, High-Conversion Demand Gen & Unit Economics",
    description: "An experienced marketing leader who steps in to build your marketing strategy, manage creative and performance agencies, optimize customer acquisition costs, and turn marketing into a predictable revenue driver.",
    typicalChallenges: [
      "Marketing agency delivering clicks and impressions without measurable qualified leads",
      "Customer Acquisition Cost (CAC) rising while customer lifetime value (LTV) stagnates",
      "Unclear brand positioning that sounds indistinguishable from competitors",
      "Founder running all marketing initiatives with no documented playbook or attribution",
      "Inconsistent marketing rhythm across paid search, social, content, and outbound"
    ],
    keyResponsibilities: [
      "Define ideal customer profile (ICP), value propositions, and positioning frameworks",
      "Audit and optimize performance marketing spend, attribution, and channel conversion",
      "Select, manage, and hold external creative/ad agencies strictly accountable to CAC and pipeline targets",
      "Establish full-funnel content, inbound lead generation, and lifecycle retention loops",
      "Partner with sales leadership to accelerate pipeline velocity and deal conversion"
    ],
    milestones: {
      day30: [
        "Audit existing marketing channels, ad spend efficiency, CAC, and conversion bottlenecks",
        "Refine ICP messaging matrix and update website core conversion assets",
        "Establish agency SLA agreements and weekly performance tracking dashboards"
      ],
      day60: [
        "Launch validated high-intent acquisition campaigns across chosen core channels",
        "Implement automated lead qualification and lead nurture workflows",
        "Cut non-performing ad spend and reallocate budget into high-converting channels"
      ],
      day90: [
        "Scalable, documented GTM playbook handed over to marketing team",
        "Demonstrated improvement in qualified lead velocity and CAC reduction",
        "Quarterly marketing roadmap and content calendar locked for the next 2 quarters"
      ]
    },
    deliverables: [
      "Go-to-Market (GTM) Strategy & Messaging Playbook",
      "Channel Attribution & CAC-to-LTV Tracking Dashboard",
      "Agency SLA & Performance Governance Framework",
      "High-Converting Sales Collateral & Website Copy Overhaul"
    ],
    engagementModels: [
      { name: "Growth Diagnostic", description: "Full audit of marketing spend, funnel drop-offs, and agency performance.", commitment: "Fixed 2-week project" },
      { name: "90-Day Execution Sprint", description: "Focused on repositioning, launching new channels, or cutting CAC.", commitment: "2 days / week" },
      { name: "Ongoing Executive Retainer", description: "Continuous CMO leadership, agency oversight, and pipeline acceleration.", commitment: "1–3 days / week" }
    ],
    standards: [
      "12+ years of senior growth and brand leadership experience",
      "Demonstrated success scaling multi-crore B2B or consumer brands",
      "Deep expertise across paid, organic, product-led, and outbound channels"
    ],
    faqs: [
      {
        question: "Should we hire an agency or a Fractional CMO?",
        answer: "Agencies excel at executing tactical work, but they rarely challenge your core business model, fix unit economics, or align sales with marketing. A Fractional CMO acts as your company's executive marketing leader who directs the agency and holds them accountable."
      },
      {
        question: "Can a Fractional CMO manage our existing in-house team?",
        answer: "Yes, our Fractional CMOs mentor junior marketers, set performance KPIs, structure weekly sprint reviews, and upskill internal teams."
      }
    ]
  },
  {
    id: "cto",
    slug: "cto",
    code: "CTO",
    title: "Fractional Chief Technology Officer (CTO)",
    shortTitle: "Fractional CTO",
    tagline: "Scalable Architecture, Vendor Governance & Pragmatic Tech Roadmaps",
    description: "A battle-tested technical executive who aligns technology with business outcomes, audits legacy systems, oversees engineering teams and agencies, and ensures enterprise stability, security, and velocity.",
    typicalChallenges: [
      "Founder is non-technical and cannot verify if dev agencies are billing honestly or building clean code",
      "System experiencing frequent downtime, technical debt, or scaling limitations",
      "Cloud infrastructure costs ballooning without clear performance gains",
      "Engineering sprints chronically missing deadlines and slipping delivery milestones",
      "Lack of cybersecurity safeguards, data protection standards, and disaster recovery plans"
    ],
    keyResponsibilities: [
      "Design scalable, modern system architecture and select cost-efficient cloud stacks",
      "Audit external software vendors, agency contracts, and internal code quality",
      "Implement engineering sprint hygiene, CI/CD pipelines, and automated test protocols",
      "Manage cloud hosting budgets (AWS, GCP, Azure) and eliminate redundant software spend",
      "Ensure enterprise security compliance, data backup integrity, and technical documentation"
    ],
    milestones: {
      day30: [
        "Complete deep-dive architecture, codebase, security, and infrastructure cost audit",
        "Identify and patch top security vulnerabilities and single points of system failure",
        "Establish sprint velocity baseline and code review standards"
      ],
      day60: [
        "Optimize cloud infrastructure, reducing monthly hosting and API bills by 15-30%",
        "Implement automated CI/CD deployment pipelines and testing benchmarks",
        "Streamline technical roadmap and freeze low-impact feature development"
      ],
      day90: [
        "Documented system architecture and disaster recovery runbooks completed",
        "Engineering delivery velocity increased with predictable two-week sprint cycles",
        "Technical hiring rubric and long-term technology roadmap finalized"
      ]
    },
    deliverables: [
      "Technical Architecture & Security Audit Report",
      "Cloud Cost Optimization & Infrastructure SOW",
      "Engineering Sprint Governance & CI/CD Standards",
      "Disaster Recovery & Data Protection Runbook"
    ],
    engagementModels: [
      { name: "Technical Diagnostic", description: "Comprehensive 2-week code, architecture, and security assessment.", commitment: "Fixed 2-week project" },
      { name: "90-Day Tech Sprint", description: "Architectural overhaul, tech debt cleanup, or agency transition.", commitment: "2 days / week" },
      { name: "Ongoing Executive Retainer", description: "Continuous engineering leadership, hiring, and board reporting.", commitment: "1–2 days / week" }
    ],
    standards: [
      "15+ years of software engineering and systems architecture experience",
      "Track record as former CTO, VP Engineering, or Principal Architect",
      "Proven ability to translate technical complexities into clear founder-level decisions"
    ],
    faqs: [
      {
        question: "Can a Fractional CTO write code for us?",
        answer: "A Fractional CTO focuses on high-leverage strategic priorities: architecture, code reviews, technical leadership, vendor management, and dev velocity. When hands-on coding is needed, we pair the CTO with specialists from our bench or direct your existing developers."
      },
      {
        question: "How do you protect our intellectual property?",
        answer: "All engagements include strict NDAs and comprehensive IP assignment clauses ensuring 100% of code, architecture, and documentation belongs exclusively to your company."
      }
    ]
  },
  {
    id: "coo",
    slug: "coo",
    code: "COO",
    title: "Fractional Chief Operating Officer (COO)",
    shortTitle: "Fractional COO",
    tagline: "Operational Systematization, SOP Architecture & High-Performance Cadence",
    description: "An operational leader who steps inside your company to eliminate founder bottlenecks, document end-to-end Standard Operating Procedures (SOPs), establish accountability frameworks, and align cross-departmental delivery.",
    typicalChallenges: [
      "Founder is the operational bottleneck for every single client escalation and sign-off",
      "Departments operating in silos with dropped balls between sales, operations, and fulfillment",
      "Lack of documented SOPs causing recurring errors, client complaints, and inconsistent delivery",
      "Rapid employee growth without clear organizational structures or delegation boundaries",
      "Inefficient meeting structures where hours are lost without documented action items"
    ],
    keyResponsibilities: [
      "Map, simplify, and document end-to-end core business workflows and quality SOPs",
      "Establish executive operating cadence (weekly metric reviews, monthly business reviews)",
      "Design organizational charts, role descriptions, and RACI accountability frameworks",
      "Identify operational bottlenecks, supply chain friction, and fulfillment delays",
      "Build executive dashboards to monitor real-time company-wide milestone completion"
    ],
    milestones: {
      day30: [
        "Time and bottleneck audit of founder and key department heads",
        "Map core delivery workflows and identify top 5 operational leaks",
        "Institute weekly executive execution meeting cadence with action logs"
      ],
      day60: [
        "Publish core Standard Operating Procedures (SOPs) for delivery and fulfillment",
        "Implement clear RACI matrix and delegate 40%+ of routine founder decisions to leads",
        "Standardize customer onboarding and escalation resolution pathways"
      ],
      day90: [
        "Operational dashboard live with real-time SLA and milestone tracking",
        "Founder daily firefighting hours reduced significantly",
        "Quarterly operational review completed with scalable cross-functional playbooks"
      ]
    },
    deliverables: [
      "Standard Operating Procedures (SOP) Master Library",
      "Company-Wide RACI Matrix & Delegation Framework",
      "Weekly Executive Operating Dashboard & Cadence",
      "Client Fulfillment & Quality Assurance Playbook"
    ],
    engagementModels: [
      { name: "Operational Diagnostic", description: "Audit of operational bottlenecks, capacity, and founder dependency.", commitment: "Fixed 2-week project" },
      { name: "90-Day Execution Sprint", description: "Systematize delivery, author SOPs, and institute executive rhythm.", commitment: "2 days / week" },
      { name: "Ongoing Executive Retainer", description: "Continuous COO leadership, operational governance, and scaling.", commitment: "1–3 days / week" }
    ],
    standards: [
      "15+ years of operational leadership experience across scale-ups or enterprise",
      "Proven mastery of process design, supply chain, and cross-functional execution",
      "Exceptional communication and founder-empathy skills"
    ],
    faqs: [
      {
        question: "How does a Fractional COO reduce founder dependency?",
        answer: "By identifying every recurring decision the founder currently makes, codifying the decision criteria into documented SOPs, training middle managers to own those decisions, and setting up an executive dashboard so the founder can inspect outcomes without micromanaging."
      },
      {
        question: "How long does a Fractional COO engagement typically last?",
        answer: "Most companies engage a Fractional COO for 6 to 12 months to build the operational infrastructure and mentor an internal Operations Manager before transitioning to a lighter advisory model."
      }
    ]
  },
  {
    id: "chro",
    slug: "chro",
    code: "CHRO",
    title: "Fractional Chief Human Resources Officer (CHRO)",
    shortTitle: "Fractional CHRO",
    tagline: "High-Performance Culture, Talent Architecture & Performance Management",
    description: "A people and culture executive who establishes institutional HR frameworks, transparent performance review systems, structured compensation plans, and strategic talent acquisition strategies.",
    typicalChallenges: [
      "Subjective performance reviews leading to employee dissatisfaction and turnover",
      "Disorganized recruitment processes resulting in bad cultural hires and prolonged vacancies",
      "Lack of clear career progression ladders, causing top talent to leave",
      "Inconsistent employee policies, lack of POSH compliance, and legal exposure",
      "Co-founder or leadership misalignment regarding compensation and equity structures"
    ],
    keyResponsibilities: [
      "Implement objective performance management systems (OKRs/KPIs) and review cycles",
      "Standardize recruitment rubrics, structured interviewing, and employer branding",
      "Establish salary bands, ESOP incentive frameworks, and retention structures",
      "Ensure statutory labor compliance, POSH guidelines, and employee handbook policies",
      "Lead leadership development, manager coaching, and high-performance culture initiatives"
    ],
    milestones: {
      day30: [
        "Audit existing HR policies, employee contracts, and compliance standing",
        "Conduct confidential leadership and team sentiment interviews",
        "Define standardized recruitment scorecard for immediate open positions"
      ],
      day60: [
        "Roll out transparent quarterly performance management and appraisal system",
        "Finalize employee handbook, POSH framework, and compliance documentation",
        "Establish formal salary benchmarking bands and promotion criteria"
      ],
      day90: [
        "Complete first structured performance review cycle across all departments",
        "Manager training on conducting effective 1-on-1s and feedback delivery completed",
        "Long-term talent strategy and succession planning framework finalized"
      ]
    },
    deliverables: [
      "Performance Management (OKR/KPI) & Appraisal Toolkit",
      "Employee Handbook & Statutory Compliance Framework",
      "Structured Hiring & Interviewing Rubric",
      "Compensation Bands & ESOP Advisory Blueprint"
    ],
    engagementModels: [
      { name: "People Diagnostic", description: "Audit of HR compliance, retention risks, and team sentiment.", commitment: "Fixed 2-week project" },
      { name: "90-Day HR Sprint", description: "Build performance appraisal systems, policies, and hiring frameworks.", commitment: "1–2 days / week" },
      { name: "Ongoing Executive Retainer", description: "Continuous people leadership, leadership coaching, and HR oversight.", commitment: "1–2 days / week" }
    ],
    standards: [
      "15+ years leading HR and people operations in high-growth companies",
      "Expert knowledge of Indian labor compliance, POSH, and modern talent systems",
      "Empathetic, structured, and legally rigorous approach"
    ],
    faqs: [
      {
        question: "When should a growing business hire a Fractional CHRO?",
        answer: "Typically when reaching 20 to 150 employees, where basic payroll is running fine, but issues around culture, performance reviews, salary parity, manager quality, and retention become critical risks."
      },
      {
        question: "Does the Fractional CHRO handle daily HR admin?",
        answer: "The Fractional CHRO focuses on strategy, performance systems, leadership coaching, and compliance, while directing your junior HR executive or HR coordinator for day-to-day administrative tasks."
      }
    ]
  },
  {
    id: "cro",
    slug: "cro",
    code: "CRO",
    title: "Fractional Chief Revenue Officer (CRO)",
    shortTitle: "Fractional CRO",
    tagline: "End-to-End Revenue Alignment, Sales Velocity & Pipeline Architecture",
    description: "A top-tier sales and revenue executive who aligns marketing, sales, and customer success into a unified revenue engine, builds enterprise sales playbooks, and establishes high-converting sales pipelines.",
    typicalChallenges: [
      "Siloed sales and marketing teams blaming each other for missed revenue targets",
      "Sales deals dragging on for months without structured closing milestones",
      "Reliance on low-margin discounting to win competitive deals",
      "Sales reps failing to hit quota due to lack of defined objection handling playbooks",
      "Low customer retention and expansion revenue from existing accounts"
    ],
    keyResponsibilities: [
      "Unify sales, marketing, and customer success into a single revenue architecture",
      "Build enterprise sales stages, deal qualification rubrics (MEDDIC/BANT), and playbooks",
      "Institute weekly sales pipeline inspection and deal coaching cadences",
      "Design aggressive, fair sales commission plans that align rep behavior with profit",
      "Identify upsell, cross-sell, and retention strategies to boost Net Revenue Retention (NRR)"
    ],
    milestones: {
      day30: [
        "Audit current sales cycle duration, win/loss ratios, and pipeline leakage",
        "Standardize CRM deal stages and mandatory qualification criteria",
        "Implement weekly deal review rhythm and sales coaching framework"
      ],
      day60: [
        "Deploy updated sales scripts, pitch decks, and objection handling playbooks",
        "Restructure sales incentive compensation to drive profitable deal closing",
        "Launch outbound account-based sales campaigns targeting tier-1 prospects"
      ],
      day90: [
        "Demonstrated improvement in sales velocity and average deal size",
        "Customer success handoff process codified to drive renewals and referrals",
        "Revenue forecasting model with high statistical predictability established"
      ]
    },
    deliverables: [
      "Enterprise Sales Playbook & Objection Handling Guide",
      "CRM Pipeline Stages & Deal Qualification Matrix",
      "Sales Incentive & Commission Plan Architecture",
      "Customer Retention & Net Revenue Expansion Roadmap"
    ],
    engagementModels: [
      { name: "Revenue Diagnostic", description: "Audit of sales funnel drop-offs, rep productivity, and pricing models.", commitment: "Fixed 2-week project" },
      { name: "90-Day Revenue Sprint", description: "Overhaul sales playbook, train reps, and install pipeline discipline.", commitment: "2 days / week" },
      { name: "Ongoing Executive Retainer", description: "Continuous CRO leadership, deal reviews, and revenue scaling.", commitment: "1–3 days / week" }
    ],
    standards: [
      "15+ years of B2B sales leadership with documented multi-crore revenue achievement",
      "Deep experience leading high-velocity enterprise sales and outbound teams",
      "Relentless focus on unit economics and customer lifetime value"
    ],
    faqs: [
      {
        question: "What is the difference between a Fractional CMO and a Fractional CRO?",
        answer: "A Fractional CMO primarily drives positioning, market awareness, and lead generation. A Fractional CRO oversees the entire revenue lifecycle—ensuring marketing leads are qualified, closed by sales, and retained/expanded by customer success."
      },
      {
        question: "Can a Fractional CRO join high-stakes client pitches?",
        answer: "Yes, our Fractional CROs regularly participate in strategic enterprise pitch meetings, helping founders structure and close high-ticket contracts."
      }
    ]
  },
  {
    id: "caio",
    slug: "caio",
    code: "CAIO",
    title: "Fractional Chief AI Officer (CAIO)",
    shortTitle: "Fractional CAIO",
    tagline: "Enterprise AI Strategy, Workflow Automation & Agentic Deployment",
    description: "An AI strategist and practitioner who cuts through the hype to deploy pragmatic, high-ROI AI automation, agentic workflows, and proprietary intelligence models securely inside your business operations.",
    typicalChallenges: [
      "Confusion around which AI tools actually deliver commercial value versus superficial hype",
      "Employees using consumer AI tools unsafely, exposing confidential business data",
      "Competitors adopting AI automation to deliver faster services at lower operational costs",
      "Knowledge trapped in unstructured emails, PDFs, and spreadsheets with no instant retrieval",
      "Dev teams attempting to build custom LLM solutions from scratch with massive failure risk"
    ],
    keyResponsibilities: [
      "Conduct comprehensive enterprise AI readiness audit and prioritize highest-ROI use cases",
      "Establish enterprise AI data security policies, confidentiality safeguards, and access controls",
      "Deploy custom AI agents for document processing, customer support, and sales research",
      "Integrate pragmatic AI APIs (OpenAI, Anthropic, Gemini, local models) with internal ERP/CRM",
      "Upskill internal leadership and team members to become 3x more productive with AI tooling"
    ],
    milestones: {
      day30: [
        "Company-wide AI opportunity and data readiness assessment completed",
        "Implement enterprise data privacy and acceptable use guidelines for AI",
        "Select and scope top 2 high-impact automated workflows"
      ],
      day60: [
        "Deploy first production-grade automated workflow (e.g. document extraction or sales enrichment)",
        "Conduct hands-on team masterclasses on prompt engineering and workflow tools",
        "Evaluate proprietary data assets for specialized RAG (Retrieval-Augmented Generation)"
      ],
      day90: [
        "Measure and document operational hours saved through deployed AI systems",
        "Integrate second automated system with internal business dashboards",
        "Deliver 12-month proprietary AI roadmap for competitive differentiation"
      ]
    },
    deliverables: [
      "Enterprise AI Readiness & Opportunity Matrix",
      "Production-Grade Workflow Automation Blueprints",
      "Corporate AI Security & Data Governance Policy",
      "12-Month Scalable AI Roadmap & Tooling Architecture"
    ],
    engagementModels: [
      { name: "AI Readiness Diagnostic", description: "2-week audit of company workflows, data readiness, and automation ROI.", commitment: "Fixed 2-week project" },
      { name: "90-Day AI Sprint", description: "Build and deploy 2 production-grade AI automated systems.", commitment: "1–2 days / week" },
      { name: "Ongoing Executive Retainer", description: "Continuous AI governance, model evaluation, and team upskilling.", commitment: "1–2 days / week" }
    ],
    standards: [
      "10+ years in technology with specialized production AI/ML deployment experience",
      "Deep knowledge of modern LLM architectures, RAG systems, and agentic workflows",
      "Strict commitment to data privacy, ethical AI, and tangible business ROI"
    ],
    faqs: [
      {
        question: "Is our business data safe when using AI models?",
        answer: "Yes. Our Fractional CAIO establishes enterprise zero-data-retention agreements, private API environments, and role-based access controls to guarantee that your company data is never used to train public models."
      },
      {
        question: "How is a CAIO different from a software developer?",
        answer: "A software developer builds specific code scripts. A Fractional CAIO evaluates the entire business strategy, selects the most commercially impactful use cases, safeguards legal and security compliance, and integrates AI across multiple business units."
      }
    ]
  },
  {
    id: "cpo",
    slug: "cpo",
    code: "CPO",
    title: "Fractional Chief Product Officer (CPO)",
    shortTitle: "Fractional CPO",
    tagline: "Product-Market Fit, Feature Prioritization & Customer Retention Systems",
    description: "A customer-obsessed product executive who aligns user needs with business profitability, eliminates feature waste, guides user experience (UX) strategy, and drives measurable product engagement.",
    typicalChallenges: [
      "Engineering team continuously shipping features that customers don't actually use or pay for",
      "Unclear product vision and roadmap driven purely by reactive customer complaints",
      "Low product activation rates and high churn during early user onboarding",
      "Lack of product analytics instrumentation to understand actual user behaviors",
      "Disconnection between product pricing tiers and perceived customer value"
    ],
    keyResponsibilities: [
      "Conduct customer discovery interviews to identify core value drivers and pain points",
      "Build disciplined product roadmaps with clear prioritization criteria (RICE framework)",
      "Instrument product analytics (Mixpanel, PostHog, Amplitude) to track user journeys",
      "Optimize customer onboarding flows to compress Time-to-First-Value (TTFV)",
      "Align product tiers, paywalls, and packaging to maximize expansion revenue"
    ],
    milestones: {
      day30: [
        "Customer interview synthesis and usability drop-off analysis completed",
        "Audit existing product roadmap and deprioritize low-ROI backlog items",
        "Set up core product telemetry and conversion funnel tracking"
      ],
      day60: [
        "Redesign user onboarding flow to reduce drop-offs and improve time-to-value",
        "Institute weekly product-engineering sprint reviews and acceptance criteria",
        "Roll out updated pricing and feature packaging experiment"
      ],
      day90: [
        "Demonstrated improvement in user retention and core workflow completion",
        "Documented product discovery and delivery playbook handed to product team",
        "Rolling 6-month product vision and strategic feature roadmap finalized"
      ]
    },
    deliverables: [
      "Customer Discovery & Usability Audit Report",
      "Product Roadmap & Prioritization Scorecard (RICE)",
      "User Onboarding & Activation Optimization Blueprint",
      "Product Analytics Instrumentation & KPI Dashboard"
    ],
    engagementModels: [
      { name: "Product Diagnostic", description: "2-week audit of user activation, churn patterns, and feature utilization.", commitment: "Fixed 2-week project" },
      { name: "90-Day Product Sprint", description: "Revamp onboarding, eliminate churn leaks, and install sprint discipline.", commitment: "2 days / week" },
      { name: "Ongoing Executive Retainer", description: "Continuous CPO leadership, roadmap management, and team coaching.", commitment: "1–2 days / week" }
    ],
    standards: [
      "12+ years of senior product management leadership experience",
      "Proven track record scaling B2B SaaS or consumer tech products to high retention",
      "Exceptional analytical, user research, and cross-functional leadership skills"
    ],
    faqs: [
      {
        question: "When should we bring in a Fractional CPO instead of a Product Manager?",
        answer: "A Product Manager manages execution details like user stories and bug tickets. A Fractional CPO sets the overarching product vision, validates product-market fit, aligns pricing with business strategy, and mentors your product managers."
      },
      {
        question: "Can a Fractional CPO help with our pricing strategy?",
        answer: "Yes, our Fractional CPOs conduct value-metric analysis and user willingness-to-pay research to align your packaging and pricing tiers with customer value."
      }
    ]
  }
];

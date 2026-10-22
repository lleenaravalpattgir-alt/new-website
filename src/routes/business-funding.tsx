import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { useState, useEffect } from "react";
import {
  Building2,
  Rocket,
  ShieldCheck,
  TrendingUp,
  Landmark,
  Award,
  Coins,
  MapPin,
  CheckCircle2,
  FileText,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Phone,
  Mail,
  ChevronRight,
  Calculator,
  Search,
  ExternalLink,
  BookOpen,
  Scale,
  Clock,
  Briefcase,
  Layers,
} from "lucide-react";
import { getWhatsAppUrl } from "@/components/site/WhatsAppFab";

export const Route = createFileRoute("/business-funding")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      tab: typeof search.tab === "string" ? search.tab : undefined,
    };
  },
  head: () => ({
    meta: [
      {
        title: "Business Loan & Startup Funding Consultant Ahmedabad Gujarat | Rise Advisory",
      },
      {
        name: "description",
        content:
          "Independent business loan consultant in Ahmedabad & Gujarat. Guidance for MSME loans, CGTMSE collateral-free funding up to ₹5 Cr, Startup India Seed Fund, and venture capital syndication.",
      },
      {
        name: "keywords",
        content:
          "business loan Ahmedabad, business loan Gujarat, startup loan support Ahmedabad, collateral free business loan Gujarat, CGTMSE loan Ahmedabad, venture capital Gujarat, startup grant Ahmedabad, startup funding consultant",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FinancialService",
          name: "Rise Advisory - Business Finance & Startup Funding Advisory",
          url: "https://ryzeadvisory.co/business-funding",
          description:
            "Strategic business loan, MSME financing, startup grant, and venture capital advisory in Ahmedabad and Gujarat, India.",
          address: {
            "@type": "PostalAddress",
            streetAddress: "E 1119 Ganesh Glory 11, Jagatpur, Gota",
            addressLocality: "Ahmedabad",
            addressRegion: "Gujarat",
            postalCode: "382470",
            addressCountry: "IN",
          },
          areaServed: ["Ahmedabad", "Gujarat", "India"],
          priceRange: "₹₹",
        }),
      },
    ],
  }),
  component: BusinessFundingPortalPage,
});

// Services Data Structure
const servicesData = [
  {
    id: "business-loan-consultancy",
    title: "Business Loan Consultancy",
    slug: "business-loan-consultant",
    tagline: "Structured Debt & Working Capital Advisory for Established MSMEs & Enterprises",
    primaryKeyword: "business loan consultant Ahmedabad",
    secondaryKeywords: [
      "business loan Gujarat",
      "business loan for new business Ahmedabad",
      "MSME business loan Gujarat",
      "working capital loan Ahmedabad",
    ],
    summary:
      "Strategic advisory helping businesses secure term loans, machinery financing, Cash Credit (CC), and Overdraft (OD) limits through public sector banks, private banks, and NBFCs.",
    eligibility: [
      "Minimum 2–3 years of active business operations (exceptions for greenfield projects with promoter background)",
      "Audited financial statements with profitable or positive EBITDA track record",
      "Minimum annual turnover typically above ₹25 Lakh to ₹1 Crore depending on lender ticket size",
      "Clean CIBIL / CMR score: 700+ for promoters and entity",
    ],
    limitations:
      "Loan approvals are strictly subject to lender credit risk policies, DSCR assessment (minimum 1.25x), and primary/collateral security valuation.",
    documents: [
      "Last 3 years audited balance sheets, P&L accounts, and tax audit reports with schedules",
      "Last 12 months comprehensive bank account statements (all operative accounts)",
      "GST returns (GSTR-3B and GSTR-1) for past 12 months with reconciliation",
      "KYC documents of promoters/directors (PAN, Aadhaar, DIN, MOA/AOA or Partnership Deed)",
      "Project report with 5-year CMA data (Credit Monitoring Arrangement) projections",
    ],
    process: [
      "Step 1: Balance Sheet Diagnostic & Debt Capacity Evaluation",
      "Step 2: CMA Data Preparation & Financial Ratio Benchmarking",
      "Step 3: Lender Matching (PSU Bank, Private Bank, or NBFC according to profile)",
      "Step 4: Formal Application Submission & Credit Committee Defense",
      "Step 5: Sanction Letter Review, Documentation, and Timely Disbursement",
    ],
    benefits:
      "Competitive interest rates (repo-linked for MSME), non-dilutive expansion capital, and structured repayment tenures up to 84 months.",
    risks:
      "Default impacts promoter credit scores and triggers SARFAESI recovery proceedings on mortgaged assets.",
  },
  {
    id: "startup-loan-support",
    title: "New Startup Loan Support",
    slug: "startup-loan-support",
    tagline: "Early-Stage Debt Structuring, MUDRA, PMEGP & Credit Guarantee Schemes",
    primaryKeyword: "new startup loan Ahmedabad",
    secondaryKeywords: [
      "loan for new startup Gujarat",
      "startup loan assistance Ahmedabad",
      "startup loan support Gujarat",
      "PMEGP loan Ahmedabad",
    ],
    summary:
      "Navigating early-stage debt options for new ventures, including MUDRA loans (up to ₹10 Lakh), PMEGP manufacturing/service loans (up to ₹50 Lakh with 15–35% capital subsidy), and Stand-Up India.",
    eligibility: [
      "New venture incorporated as Private Limited, LLP, Partnership, or Proprietorship",
      "Promoters with relevant technical qualifications or industry domain expertise",
      "DPIIT recognition (for Startup India benefits)",
      "Viable Detailed Project Report (DPR) showing clear path to revenue and debt servicing",
    ],
    limitations:
      "Banks do not finance pure ideas without skin-in-the-game. Promoters must contribute 10% to 25% margin money.",
    documents: [
      "Detailed Project Report (DPR) covering market research, technical feasibility, and cash flows",
      "Promoter KYC, educational qualifications, and net-worth statement",
      "Entity incorporation documents (Certificate of Incorporation, Udyam Registration)",
      "Rent agreement or lease deed for commercial/industrial operating premises",
      "Quotation of machinery/equipment to be purchased from authorized vendors",
    ],
    process: [
      "Step 1: Scheme Suitability Assessment (MUDRA vs. PMEGP vs. Stand-Up India)",
      "Step 2: DPR & Projected Financials Modeling with break-even analysis",
      "Step 3: Online Portal Filing (Udyami Mitra / PMEGP e-Portal) & Lead Bank Allocation",
      "Step 4: Branch Manager Discussion & Field Verification Facilitation",
      "Step 5: Subsidy Claim Processing & Loan Account Sanction",
    ],
    benefits:
      "Subsidized margin requirements, government interest subventions where applicable, and zero equity dilution.",
    risks:
      "Fixed monthly EMI obligations start even if customer adoption or revenue lags initial projections.",
  },
  {
    id: "collateral-free-business-loan",
    title: "Collateral-Free Business Loan (CGTMSE)",
    slug: "collateral-free-business-loan",
    tagline: "Credit Guarantee Fund Trust for Micro and Small Enterprises up to ₹5 Crore",
    primaryKeyword: "non collateral business loan Ahmedabad",
    secondaryKeywords: [
      "collateral free business loan Gujarat",
      "business loan without security Ahmedabad",
      "CGTMSE loan Gujarat",
      "CGTMSE scheme Ahmedabad",
    ],
    summary:
      "Enabling micro and small enterprises to access bank credit without third-party guarantee or immovable property collateral under the Ministry of MSME's CGTMSE scheme.",
    eligibility: [
      "Eligible Micro and Small Enterprises (Manufacturing and Services sectors)",
      "Valid Udyam Registration Certificate",
      "Both new and existing units with viable business models and satisfactory track record",
      "Borrower must not be a willful defaulter or listed on RBI's Caution List",
    ],
    limitations:
      "CGTMSE is NOT a direct cash grant; it is an institutional credit guarantee provided to the lender. The borrower remains 100% legally liable to repay the entire debt. An annual guarantee fee (0.37% to 1.35%) applies.",
    documents: [
      "Udyam Registration Certificate (Micro or Small category)",
      "Promoter KYC, PAN, CIBIL report, and residential proof",
      "Past 2–3 years audited financials (for existing businesses) or DPR (for new units)",
      "Last 12 months GST returns and bank statements",
      "Primary security hypothecation documents (stock, debtors, machinery to be acquired)",
    ],
    process: [
      "Step 1: MSME Classification & CGTMSE Eligibility Audit",
      "Step 2: Project Viability & Debt Service Coverage Ratio (DSCR) Structuring",
      "Step 3: Application to CGTMSE Member Lending Institutions (MLIs - Banks/NBFCs)",
      "Step 4: Bank Credit Appraisal & Approval under CGTMSE Cover",
      "Step 5: Guarantee Fee Payment to CGTMSE Trust & Sanction Letter Release",
    ],
    benefits:
      "Allows young, asset-light enterprises to raise up to ₹5 Crore without mortgaging ancestral homes or commercial land.",
    risks:
      "Higher guarantee fees, stringent banker scrutiny on business cash flows, and immediate legal recovery upon default.",
  },
  {
    id: "venture-capital-and-fundraising",
    title: "Venture Capital & Angel Fundraising",
    slug: "venture-capital-and-fundraising",
    tagline: "Equity Capital Syndication for Scalable Tech, D2C & High-Growth Startups",
    primaryKeyword: "venture capital Ahmedabad",
    secondaryKeywords: [
      "venture capital firms in Gujarat",
      "startup investors Ahmedabad",
      "angel investors Gujarat",
      "fundraising consultant Ahmedabad",
    ],
    summary:
      "Comprehensive advisory for seed, pre-Series A, and Series A equity rounds—from financial modeling and valuation to pitch deck narrative and investor syndicate roadshows.",
    eligibility: [
      "Early-stage to growth-stage startups with large Addressable Market (TAM > $1B preferred)",
      "Demonstrated Product-Market Fit (PMF) with month-on-month revenue or user growth (15%+ MoM)",
      "Defensible competitive moat (proprietary IP, proprietary distribution, network effects)",
      "Dedicated full-time founding team with clear domain capability",
    ],
    limitations:
      "Venture capital involves dilution of company ownership (typically 15%–25% per round) and extensive board governance.",
    documents: [
      "Investment Pitch Deck (12–15 slides covering Problem, Solution, Traction, Market, Team, Ask)",
      "3-to-5-Year Dynamic Financial Model with Unit Economics (CAC, LTV, Gross Margins, Cohorts)",
      "Virtual Data Room (Cap table, Incorporation, IP assignments, Customer contracts)",
      "Historical MIS, audited financials, and valuation certificate by Registered Valuer",
    ],
    process: [
      "Step 1: Equity Readiness Assessment, Cap Table Clean-Up & Valuation Modeling",
      "Step 2: Pitch Deck & Investment Teaser Perfection",
      "Step 3: Targeted Outreach to Angel Networks (Ahmedabad Angels, GUSEC, TiE) & VC Funds",
      "Step 4: Term Sheet Negotiation (Liquidation preference, anti-dilution, board rights)",
      "Step 5: Financial & Legal Due Diligence, Definitive Agreements (SHA/SSA), and Escrow Closing",
    ],
    benefits:
      "No mandatory monthly repayment burden, strategic mentorship, and credibility to attract enterprise clients.",
    risks:
      "Equity dilution, loss of unilateral founder control, aggressive growth pressure, and potential down-rounds.",
  },
  {
    id: "business-financial-support",
    title: "Business Financial Support & Subsidies",
    slug: "business-financial-support",
    tagline: "Capital Subsidies, Interest Subventions & State Industrial Policy Incentives",
    primaryKeyword: "financial support for business Ahmedabad",
    secondaryKeywords: [
      "financial support for MSME Gujarat",
      "business funding support Ahmedabad",
      "government financial assistance for business Gujarat",
    ],
    summary:
      "Assisting manufacturing and service enterprises in claiming statutory fiscal incentives under the Gujarat Industrial Policy 2020/2025, Central Capital Investment Subsidies, and MSME interest relief.",
    eligibility: [
      "Manufacturing MSMEs or designated service sectors setting up or expanding in Gujarat",
      "Investment in plant, machinery, or clean technology within industrial notified areas or GIDCs",
      "Statutory compliance with pollution control (GPCB), factory licensing, and GST filings",
      "Timely filing within the prescribed window from the Date of Commercial Production (DOCP)",
    ],
    limitations:
      "Government incentives are disbursement-based reimbursements, not instant pre-investment cash grants. Project expenditure must be certified by Chartered Accountants.",
    documents: [
      "Detailed Project Report with Chartered Accountant's Investment Certification",
      "Invoices, bank payment proofs, and commercial production commencement proof",
      "GPCB consent to establish & operate, electricity connection agreement",
      "Udyam Registration Certificate & GIDC allotment order / Land NA deed",
      "Bank sanction letter and term loan account statements showing interest paid",
    ],
    process: [
      "Step 1: Industrial Policy Scheme Mapping & Incentive Eligibility Audit",
      "Step 2: Application for Scheme In-Principle Approval prior to equipment commissioning",
      "Step 3: Commercial Production Documentation & CA Expenditure Verification",
      "Step 4: DIC (District Industries Centre) Inspection & State Committee Sanction",
      "Step 5: Treasury Release & Subvention Credit into Bank Account",
    ],
    benefits:
      "Reduces effective borrowing costs by 5%–7% p.a., reimburses capital expenditure up to 25%, and enhances net cash margins.",
    risks: "Delayed government release cycles require adequate interim working capital planning.",
  },
  {
    id: "startup-grants-and-government-schemes",
    title: "Startup Grants & Government Schemes",
    slug: "startup-grants-and-schemes",
    tagline: "Non-Dilutive Seed Grants, Sustenance Allowance & Product Development Funds",
    primaryKeyword: "startup grant Gujarat",
    secondaryKeywords: [
      "government grant for startups Ahmedabad",
      "seed funding for startups Gujarat",
      "Gujarat startup scheme",
      "Startup India Seed Fund Ahmedabad",
    ],
    summary:
      "Advisory for obtaining government non-repayable grants, including the Startup Gujarat Scheme (up to ₹30 Lakh sustenance & prototype grant), Startup India Seed Fund Scheme (SISFS up to ₹50 Lakh via incubators), and BIRAC/NIDHI programs.",
    eligibility: [
      "DPIIT-recognized entity incorporated within the past 10 years (past 2 years for SISFS)",
      "Working on innovation, development, or improvement of products, processes, or services",
      "Must not have received more than ₹10 Lakh of monetary support under other central/state schemes (SISFS requirement)",
      "Incubation affiliation with recognized institutions (e.g., iCreate, GUSEC, CIIE.CO, PDPU IIC)",
    ],
    limitations:
      "Grants are disbursed in milestone-based tranches. Misappropriation or failure to submit Utilization Certificates (UC) leads to recovery notices.",
    documents: [
      "DPIIT Recognition Certificate and Startup Profile on Startup India Portal",
      "Pitch deck detailing technological innovation, patentability/IP, and milestone roadmap",
      "Proof of Concept (PoC) validation, lab testing reports, or prototype demo video",
      "Incubator recommendation letter and selection committee presentation",
      "Itemized budget breakdown certified by a practicing Chartered Accountant",
    ],
    process: [
      "Step 1: DPIIT Recognition & Incubator Matching (iCreate, GUSEC, IIM Ahmedabad CIIE)",
      "Step 2: Formal Grant Application via Startup Gujarat / SISFS Incubator Portal",
      "Step 3: Screening & Evaluation Committee Pitch Presentation",
      "Step 4: Milestone Agreement Signing & Tranche-1 Grant Release",
      "Step 5: Milestone Proof & Utilization Certificate (UC) Filing for Subsequent Tranches",
    ],
    benefits:
      "100% non-dilutive capital (zero equity given up), zero debt liability, and stamp of credibility from the Government of Gujarat / DPIIT.",
    risks:
      "Rigorous selection ratio (typically under 10% of applicants qualify) and strict audit documentation requirements.",
  },
  {
    id: "startup-funding-consultancy",
    title: "Startup Funding Consultancy",
    slug: "startup-funding-consultancy",
    tagline: "End-to-End Capital Advisory: Hybrid Debt, Grants & Equity Structuring",
    primaryKeyword: "startup funding consultant Ahmedabad",
    secondaryKeywords: [
      "startup funding Gujarat",
      "startup financial support Ahmedabad",
      "financial help for new startups Gujarat",
    ],
    summary:
      "Holistic capital structuring advisory guiding founders through the optimal sequence of non-dilutive grants, credit guarantees, revenue-based financing, and institutional equity to minimize founder dilution.",
    eligibility: [
      "Founders seeking ₹25 Lakh to ₹20 Crore in growth or seed capital",
      "Clear business plan with documented unit economics and market validation",
      "Willingness to establish professional corporate governance and transparent reporting",
    ],
    limitations:
      "Consultancy facilitates preparation, institutional matching, and negotiation; final funding decisions rest solely with lenders and investment committees.",
    documents: [
      "Executive Summary & Investor Teaser",
      "Comprehensive Business Model Canvas & Operational Plan",
      "3-Year Projected Financials with Sensitivity Analysis",
      "Entity Formation Documents & Shareholding Pattern",
    ],
    process: [
      "Step 1: Capital Need Diagnostic & Capital Table Simulation",
      "Step 2: Collateral & Grant Optimization Strategy",
      "Step 3: Financial Deck, CMA & Governance Preparation",
      "Step 4: Syndicate Introductions & Term Sheet Negotiations",
      "Step 5: Post-Sanction Compliance & Governance Monitoring",
    ],
    benefits:
      "Avoid premature equity dilution, maximize non-dilutive government schemes, and prevent costly financing structure mistakes.",
    risks: "Founders must dedicate senior time to due diligence preparation and financial hygiene.",
  },
];

// Blog Posts Data Structure
const blogPostsData = [
  {
    slug: "how-to-get-startup-funding-in-ahmedabad",
    title: "How to Get Startup Funding in Ahmedabad: The Founder's Practical Blueprint",
    primaryKeyword: "how to get startup funding in Ahmedabad",
    readingTime: "11 min read",
    summary:
      "A comprehensive walkthrough of the Ahmedabad capital ecosystem—from angel syndicates and GUSEC incubators to debt schemes and venture capital roadshows.",
    sections: [
      {
        h2: "The Ahmedabad Startup Ecosystem: Capital Landscape",
        content:
          "Ahmedabad has transitioned from a traditional textile and manufacturing trading center to one of western India's most vibrant entrepreneurial hubs. With institutions like IIM Ahmedabad (CIIE.CO), Gujarat University Startup and Entrepreneurship Council (GUSEC), and iCreate (International Centre for Entrepreneurship and Technology), early-stage founders in Gota, Prahlad Nagar, Sindhu Bhavan Road, and Changodar have direct access to institutional funding corridors.",
      },
      {
        h2: "Four Distinct Funding Corridors in Ahmedabad",
        content:
          "1. Non-Dilutive Government Grants: Schemes managed through nodal institutions like Startup Gujarat and the Startup India Seed Fund Scheme.\n2. Local Angel Networks: Ahmedabad Angel Network, TiE Ahmedabad, and high-net-worth industrial family offices seeking tech and manufacturing bets.\n3. Collateral-Free Bank Credit: CGTMSE loans disbursed through specialized MSME branches in Ashram Road, CG Road, and SG Highway.\n4. Institutional Venture Capital: Funds focused on B2B SaaS, CleanTech, Logistics, and D2C brands emerging from Gujarat.",
      },
      {
        h2: "Step-by-Step Action Plan for Ahmedabad Founders",
        content:
          "Step 1: Register on the DPIIT Startup India portal and procure your Udyam Certificate.\nStep 2: Align with an Ahmedabad-recognized incubator (e.g., GUSEC or iCreate) to unlock local government seed grants.\nStep 3: Build a defensible financial model showing a minimum 18-month runway.\nStep 4: Network within local chapters of TiE Ahmedabad and Gujarat Chamber of Commerce and Industry (GCCI).",
      },
    ],
    faqs: [
      {
        q: "What is the typical angel check size in Ahmedabad?",
        a: "Angel investments in Ahmedabad typically range from ₹15 Lakh to ₹50 Lakh per angel, with syndicates pulling together seed rounds between ₹75 Lakh and ₹2.5 Crore.",
      },
      {
        q: "Do I need physical office premises in Ahmedabad to qualify for local schemes?",
        a: "Yes, for Gujarat State Startup Schemes, your registered office or designated operational facility must be located within the State of Gujarat.",
      },
    ],
  },
  {
    slug: "how-to-apply-for-a-startup-grant-in-gujarat",
    title: "How to Apply for a Startup Grant in Gujarat: Step-by-Step Official Process",
    primaryKeyword: "how to apply for a startup grant in Gujarat",
    readingTime: "10 min read",
    summary:
      "Step-by-step application walkthrough for the Gujarat Industrial Policy Startup Scheme, covering sustenance allowances, prototype assistance, and incubator approvals.",
    sections: [
      {
        h2: "Understanding the Gujarat Industrial Policy Startup Framework",
        content:
          "The Government of Gujarat provides one of the country's most proactive startup policies. Managed through the Industries Commissionerate, eligible startups can secure: (a) Seed/Sustenance allowance of up to ₹20,000–₹25,000 per month for one year, (b) Prototype assistance up to ₹10 Lakh, and (c) Marketing and exhibition support up to ₹10 Lakh.",
      },
      {
        h2: "Eligibility Criteria for Gujarat Startup Grants",
        content:
          "• The applicant venture must be registered in Gujarat as a Pvt Ltd, LLP, or Partnership.\n• The company must not be older than 10 years.\n• The product must feature proprietary technological innovation or solving critical industrial/social challenges.\n• Must be endorsed by an approved Nodal Institute (NI) such as GTU Innovation Council, PDEU, or GUSEC.",
      },
      {
        h2: "The 5-Stage Grant Application Process",
        content:
          "Stage 1: Submit initial proposal on the Startup Gujarat online portal (startup.gujarat.gov.in).\nStage 2: Select an empanelled Nodal Institute for mentor evaluation and screening.\nStage 3: Present your pitch deck before the institutional screening committee.\nStage 4: Approval by the State Level Implementation Committee (SLIC).\nStage 5: Signing of grant agreement and phased disbursement into escrow/project bank account.",
      },
    ],
    faqs: [
      {
        q: "Is the Gujarat startup grant repayable?",
        a: "No. The sustenance allowance and prototype grants under the Gujarat Startup Scheme are non-repayable grants, provided milestone utilization certificates (UC) are submitted.",
      },
      {
        q: "Can a student founder apply?",
        a: "Yes. Gujarat specifically encourages student innovators through the Student Startup and Innovation Policy (SSIP) across state universities.",
      },
    ],
  },
  {
    slug: "government-schemes-for-startups-in-gujarat",
    title: "Top Government Schemes for Startups in Gujarat: The Complete 2025–2026 Guide",
    primaryKeyword: "government schemes for startups in Gujarat",
    readingTime: "12 min read",
    summary:
      "A detailed comparative analysis of Startup Gujarat, SISFS, PMEGP, MUDRA, and Gujarat Industrial Policy capital subsidies.",
    sections: [
      {
        h2: "The Comprehensive Gujarat Startup Schemes Matrix",
        content:
          "Gujarat offers a multi-layered support infrastructure catering to different stages of business maturity. Below are the key government-sponsored programs available to entrepreneurs in the state.",
      },
      {
        h2: "1. Gujarat Industrial Policy - Startup & Innovation Scheme",
        content:
          "Provides up to ₹30 Lakh in cumulative assistance, including prototype support, mentor allowances, intellectual property filing reimbursements (up to 75% of patent costs), and exhibition subsidies.",
      },
      {
        h2: "2. Startup India Seed Fund Scheme (SISFS)",
        content:
          "Operated via DPIIT through recognized incubators. Offers up to ₹20 Lakh in grants for Proof of Concept (PoC) and prototype testing, and up to ₹50 Lakh via convertible debentures or debt-linked instruments for commercialization.",
      },
      {
        h2: "3. Credit Guarantee Scheme for Startups (CGSS)",
        content:
          "Enables collateral-free loans up to ₹10 Crore for DPIIT-recognized startups through scheduled commercial banks and financial institutions, backed by the National Credit Guarantee Trustee Company (NCGTC).",
      },
    ],
    faqs: [
      {
        q: "Can I apply for both SISFS and Gujarat state grants?",
        a: "Yes, provided the funds are designated for distinct project milestones or non-overlapping expenditures as confirmed by your incubator.",
      },
      {
        q: "What is the official portal for Gujarat startup schemes?",
        a: "Applications must be initiated via the official portal at startup.gujarat.gov.in.",
      },
    ],
  },
  {
    slug: "collateral-free-loan-schemes-for-msme-in-gujarat",
    title: "Collateral-Free Loan Schemes for MSME in Gujarat: CGTMSE & Bank Guide",
    primaryKeyword: "collateral free loan schemes for MSME in Gujarat",
    readingTime: "10 min read",
    summary:
      "How Gujarat manufacturing and service enterprises can secure up to ₹5 Crore bank finance under CGTMSE without mortgaging real estate.",
    sections: [
      {
        h2: "What is CGTMSE and How Does It Work in Gujarat?",
        content:
          "The Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE) was jointly set up by the Ministry of MSME and SIDBI. Instead of asking the business owner for commercial property or residential plots as collateral, the bank obtains a guarantee cover from CGTMSE (up to 85% for micro-enterprises and women/SC-ST entrepreneurs, and 75% for others up to ₹5 Crore).",
      },
      {
        h2: "Understanding the Limitations and Misconceptions",
        content:
          "A common myth among Ahmedabad business owners is that CGTMSE is an unconditional government grant. It is not. If your company defaults, the bank will proceed with recovery actions, attach business assets, and your CIBIL profile will be permanently compromised. Furthermore, banks charge an annual guarantee fee ranging between 0.37% and 1.35% on the sanctioned limit.",
      },
      {
        h2: "Documenting Your Application for Bank Sanction",
        content:
          "Gujarat banks evaluate CGTMSE proposals primarily on cash flow predictability rather than asset backing. Key documentation includes:\n1. 5-year CMA projections showing a healthy Debt Service Coverage Ratio (>1.3x)\n2. Past 12 months GST returns matching bank statements\n3. Proof of firm orders or customer contracts to validate revenue visibility\n4. Valid Udyam Registration Certificate.",
      },
    ],
    faqs: [
      {
        q: "Can new businesses in Gujarat get CGTMSE loans?",
        a: "Yes, both greenfield (new) and brownfield (existing) micro and small units are eligible under the CGTMSE guidelines.",
      },
      {
        q: "What is the maximum limit under CGTMSE?",
        a: "The guarantee ceiling has been enhanced to ₹5 Crore per eligible borrower.",
      },
    ],
  },
  {
    slug: "business-loan-vs-venture-capital-which-is-right-for-your-startup",
    title: "Business Loan vs. Venture Capital: Which is Right for Your Startup?",
    primaryKeyword: "business loan vs venture capital",
    readingTime: "9 min read",
    summary:
      "An objective financial comparison between debt financing and equity dilution, helping Gujarat founders choose the optimal capital structure.",
    sections: [
      {
        h2: "The Core Strategic Difference: Dilution vs. Cash Flow Drain",
        content:
          "The choice between a business loan and venture capital is fundamentally a trade-off between equity ownership and cash flow liquidity. A bank loan allows you to retain 100% ownership of your cap table, but demands rigid monthly EMI payments regardless of your revenue. Venture capital injects cash without repayment pressure, but requires surrendering 15%–25% ownership, board oversight, and mandatory exit expectations.",
      },
      {
        h2: "Comparison Framework: Debt vs. Equity",
        content:
          "• Repayment Requirement: Loan requires fixed monthly principal + interest. VC requires zero monthly repayments.\n• Ownership & Control: Loan preserves 100% equity. VC dilutes founders and introduces board voting rights.\n• Eligibility Criteria: Loan requires cash flows, profit visibility, or collateral. VC requires massive market size (TAM) and high scalability.\n• Failure Consequence: Loan default triggers legal recovery and asset attachment. VC failure results in equity write-off without personal liability.",
      },
      {
        h2: "When to Choose Which in Gujarat?",
        content:
          "Choose Debt if: You run a cash-positive business, manufacturing unit, trading enterprise, or predictable agency where ROI on capital exceeds bank interest rates (9%–14%).\nChoose Venture Capital if: You are developing high-risk proprietary technology, digital platforms, or rapid market-capture models where profitability is 2–4 years away.",
      },
    ],
    faqs: [
      {
        q: "Can a startup use both loans and venture capital?",
        a: "Yes. Many mature startups raise equity to build technology and working capital debt/venture debt to finance inventory or receivable cycles.",
      },
      {
        q: "Does taking a business loan dilute my shareholding?",
        a: "No. Pure commercial loans do not take equity warrants unless structured as hybrid venture debt.",
      },
    ],
  },
  {
    slug: "documents-required-for-a-startup-loan-in-india",
    title: "Documents Required for a Startup Loan in India: The Complete Banker's Checklist",
    primaryKeyword: "documents required for a startup loan in India",
    readingTime: "8 min read",
    summary:
      "A comprehensive, banker-verified checklist of KYC, financial, statutory, and operational documents needed to secure startup and business financing in India.",
    sections: [
      {
        h2: "Why Documentation Quality Dictates Loan Approval",
        content:
          "Over 65% of startup and MSME loan rejections in India are caused by documentation inconsistencies, tax reconciliation mismatches, or inadequate CMA data. Preparing a comprehensive, reconciled credit file speeds up bank sanction from months to 2–3 weeks.",
      },
      {
        h2: "1. Entity & Promoter KYC Documentation",
        content:
          "• Certificate of Incorporation / Partnership Deed / Udyam Certificate\n• PAN card of the entity and all directors/partners\n• Aadhaar cards, passport-size photographs, and residential utility bills\n• Memorandum & Articles of Association (MOA/AOA) with updated shareholding pattern.",
      },
      {
        h2: "2. Financial & Statutory Records",
        content:
          "• Last 3 years audited financials (P&L, Balance Sheet, Schedules, Audit Reports)\n• Last 12 months comprehensive bank statements for all operative accounts\n• Last 12 months GST returns (GSTR-3B and GSTR-1) with 2A/2B reconciliations\n• Income Tax Returns (ITR) of the enterprise and personal ITRs of promoters.",
      },
      {
        h2: "3. Project & Credit Appraisal Files",
        content:
          "• Comprehensive Detailed Project Report (DPR) or business plan\n• 5-Year CMA (Credit Monitoring Arrangement) projection sheet prepared by a CA\n• Quotations for machinery, plant, or capital equipment from approved suppliers\n• Lease deed or industrial ownership title for operating premises.",
      },
    ],
    faqs: [
      {
        q: "What if my startup has no past financial history?",
        a: "For new startups, banks rely on promoter professional credentials, net-worth certificates, Detailed Project Reports (DPR), and government guarantee schemes like CGTMSE or MUDRA.",
      },
      {
        q: "What is CMA data in Indian banking?",
        a: "CMA (Credit Monitoring Arrangement) is a standard financial format showing past 2 years performance and 3–5 years projections used by credit officers to assess working capital limits and debt capacity.",
      },
    ],
  },
];

export function BusinessFundingPortalPage() {
  const search = Route.useSearch();
  const [activeTab, setActiveTab] = useState<
    "services" | "locations" | "blogs" | "calculator" | "checklist" | "faqs"
  >(() => {
    if (
      search.tab &&
      ["services", "locations", "blogs", "calculator", "checklist", "faqs"].includes(search.tab)
    ) {
      return search.tab as any;
    }
    return "services";
  });

  useEffect(() => {
    if (
      search.tab &&
      ["services", "locations", "blogs", "calculator", "checklist", "faqs"].includes(search.tab)
    ) {
      setActiveTab(search.tab as any);
    }
  }, [search.tab]);

  const [selectedService, setSelectedService] = useState(servicesData[0].id);

  // Screener state
  const [calcBusinessAge, setCalcBusinessAge] = useState<string>("early");
  const [calcTurnover, setCalcTurnover] = useState<string>("under25l");
  const [calcCollateral, setCalcCollateral] = useState<string>("no");
  const [calcDpiit, setCalcDpiit] = useState<string>("yes");

  const currentService = servicesData.find((s) => s.id === selectedService) || servicesData[0];

  const waUrl = getWhatsAppUrl(
    "Hello Rise Advisory, I would like to consult your business loan and startup funding team in Ahmedabad regarding my company's funding requirements.",
  );

  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0B1F3B] py-20 md:py-28 text-white border-b border-[#E2E8F0]/10">
        <div
          className="pointer-events-none absolute inset-0 opacity-15"
          style={{
            background: "linear-gradient(115deg, #0B1F3B 0%, #132F55 50%, #D4A238 100%)",
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A238]/40 bg-[#0E2A4D]/80 px-3.5 py-1 text-xs font-semibold text-[#D4A238] mb-4">
              <Landmark className="h-3.5 w-3.5" />
              <span>Ahmedabad &amp; Gujarat Financial Consultancy</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Business Loans, MSME Financing &amp;{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A238] via-[#F3E5AB] to-[#D4A238]">
                Startup Funding in Ahmedabad &amp; Gujarat
              </span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed">
              Transparent, institutional debt and equity advisory for founders, MSMEs, and growing
              enterprises. Structure collateral-free loans under CGTMSE up to ₹5 Crore, access
              Startup Gujarat grants, and navigate angel syndicates without false promises or hidden
              fees.
            </p>

            {/* Quick Action Badges */}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#lead-form"
                className="inline-flex items-center gap-2 rounded-md bg-[#D4A238] px-5 py-3 text-sm font-bold uppercase tracking-wider text-[#0B1F3B] shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-[#E5B54E]"
              >
                <span>Discuss Your Funding Needs</span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-[#D4A238]/40 bg-[#0E2A4D] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#133763]"
              >
                <Phone className="h-4 w-4 text-[#D4A238]" />
                <span>WhatsApp Advisory Desk</span>
              </a>
            </div>

            {/* Trust Highlights */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/10 pt-6 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#D4A238] shrink-0" />
                <span>CGTMSE Up to ₹5 Cr</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#D4A238] shrink-0" />
                <span>Startup Gujarat Schemes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#D4A238] shrink-0" />
                <span>DPIIT &amp; SISFS Guidance</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#D4A238] shrink-0" />
                <span>Zero Advance Promises</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs Bar — Sticky Segmented Control with Zero Scrollbars */}
      <section className="sticky top-16 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="py-2.5">
            <div
              className="no-scrollbar flex items-center gap-1.5 overflow-x-auto p-1 rounded-xl bg-slate-100/90 border border-slate-200/80 text-xs sm:text-sm font-semibold"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <button
                onClick={() => setActiveTab("services")}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all whitespace-nowrap shrink-0 ${activeTab === "services"
                    ? "bg-[#0B1F3B] text-white shadow-sm font-bold"
                    : "text-slate-600 hover:bg-white hover:text-slate-900"
                  }`}
              >
                <Layers className="h-4 w-4 text-[#D4A238]" />
                <span>Core Portfolios</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${activeTab === "services"
                      ? "bg-[#D4A238] text-[#0B1F3B]"
                      : "bg-slate-200 text-slate-700"
                    }`}
                >
                  7
                </span>
              </button>

              <button
                onClick={() => setActiveTab("locations")}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all whitespace-nowrap shrink-0 ${activeTab === "locations"
                    ? "bg-[#0B1F3B] text-white shadow-sm font-bold"
                    : "text-slate-600 hover:bg-white hover:text-slate-900"
                  }`}
              >
                <MapPin className="h-4 w-4 text-[#D4A238]" />
                <span>Gujarat &amp; Ahmedabad Hub</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${activeTab === "locations"
                      ? "bg-[#D4A238] text-[#0B1F3B]"
                      : "bg-emerald-100 text-emerald-800"
                    }`}
                >
                  Local
                </span>
              </button>

              <button
                onClick={() => setActiveTab("blogs")}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all whitespace-nowrap shrink-0 ${activeTab === "blogs"
                    ? "bg-[#0B1F3B] text-white shadow-sm font-bold"
                    : "text-slate-600 hover:bg-white hover:text-slate-900"
                  }`}
              >
                <BookOpen className="h-4 w-4 text-[#D4A238]" />
                <span>Funding Guides</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${activeTab === "blogs"
                      ? "bg-[#D4A238] text-[#0B1F3B]"
                      : "bg-slate-200 text-slate-700"
                    }`}
                >
                  6
                </span>
              </button>

              <button
                onClick={() => setActiveTab("calculator")}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all whitespace-nowrap shrink-0 ${activeTab === "calculator"
                    ? "bg-[#0B1F3B] text-white shadow-sm font-bold"
                    : "text-slate-600 hover:bg-white hover:text-slate-900"
                  }`}
              >
                <Calculator className="h-4 w-4 text-[#D4A238]" />
                <span>Eligibility Screener</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${activeTab === "calculator"
                      ? "bg-[#D4A238] text-[#0B1F3B]"
                      : "bg-blue-100 text-blue-800"
                    }`}
                >
                  30s Tool
                </span>
              </button>

              <button
                onClick={() => setActiveTab("checklist")}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all whitespace-nowrap shrink-0 ${activeTab === "checklist"
                    ? "bg-[#0B1F3B] text-white shadow-sm font-bold"
                    : "text-slate-600 hover:bg-white hover:text-slate-900"
                  }`}
              >
                <FileText className="h-4 w-4 text-[#D4A238]" />
                <span>Document Checklists</span>
              </button>

              <button
                onClick={() => setActiveTab("faqs")}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all whitespace-nowrap shrink-0 ${activeTab === "faqs"
                    ? "bg-[#0B1F3B] text-white shadow-sm font-bold"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
              >
                <HelpCircle className="h-4 w-4 text-[#D4A238]" />
                <span>Regulatory FAQs</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Tab Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        {/* TAB 1: SERVICES PORTFOLIOS */}
        {activeTab === "services" && (
          <div>
            <div className="mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-[#B8860B]">
                Institutional Funding Architecture
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                Explore Our Core Financing &amp; Funding Services
              </h2>
              <p className="text-sm text-slate-600 mt-1.5 max-w-3xl leading-relaxed">
                Every business stage demands a different capital structure. Below are the 4 primary
                institutional capital pathways for Gujarat enterprises, followed by our full 7-service
                portfolio deep dives.
              </p>

              {/* 4 Pillar Quick-Switch Highlights */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedService("collateral-free-business-loan")}
                  className={`p-4 rounded-xl border text-left transition-all ${selectedService === "collateral-free-business-loan"
                      ? "border-[#D4A238] bg-[#0B1F3B] text-white shadow-md ring-2 ring-[#D4A238]/30"
                      : "border-slate-200 bg-white hover:border-[#D4A238]/50 hover:bg-slate-50 text-slate-900"
                    }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="h-8 w-8 rounded-lg bg-[#D4A238]/20 text-[#B8860B] flex items-center justify-center font-bold">
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Up to ₹5 Cr
                    </span>
                  </div>
                  <div className="font-bold text-sm">CGTMSE MSME Loans</div>
                  <div className="text-[11px] opacity-80 mt-1">
                    100% collateral-free bank debt for working capital &amp; plant machinery.
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedService("startup-funding-and-grants")}
                  className={`p-4 rounded-xl border text-left transition-all ${selectedService === "startup-funding-and-grants"
                      ? "border-[#D4A238] bg-[#0B1F3B] text-white shadow-md ring-2 ring-[#D4A238]/30"
                      : "border-slate-200 bg-white hover:border-[#D4A238]/50 hover:bg-slate-50 text-slate-900"
                    }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="h-8 w-8 rounded-lg bg-[#D4A238]/20 text-[#B8860B] flex items-center justify-center font-bold">
                      <Award className="h-4 w-4" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                      Up to ₹30 Lakh
                    </span>
                  </div>
                  <div className="font-bold text-sm">Startup Gujarat Grants</div>
                  <div className="text-[11px] opacity-80 mt-1">
                    Non-dilutive seed assistance &amp; founder sustenance under SISFS.
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedService("business-financial-support")}
                  className={`p-4 rounded-xl border text-left transition-all ${selectedService === "business-financial-support"
                      ? "border-[#D4A238] bg-[#0B1F3B] text-white shadow-md ring-2 ring-[#D4A238]/30"
                      : "border-slate-200 bg-white hover:border-[#D4A238]/50 hover:bg-slate-50 text-slate-900"
                    }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="h-8 w-8 rounded-lg bg-[#D4A238]/20 text-[#B8860B] flex items-center justify-center font-bold">
                      <Building2 className="h-4 w-4" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                      10%–25% Subsidy
                    </span>
                  </div>
                  <div className="font-bold text-sm">State Fiscal Subsidies</div>
                  <div className="text-[11px] opacity-80 mt-1">
                    Capital and interest relief through District Industries Centres (DIC).
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedService("venture-capital-and-fundraising")}
                  className={`p-4 rounded-xl border text-left transition-all ${selectedService === "venture-capital-and-fundraising"
                      ? "border-[#D4A238] bg-[#0B1F3B] text-white shadow-md ring-2 ring-[#D4A238]/30"
                      : "border-slate-200 bg-white hover:border-[#D4A238]/50 hover:bg-slate-50 text-slate-900"
                    }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="h-8 w-8 rounded-lg bg-[#D4A238]/20 text-[#B8860B] flex items-center justify-center font-bold">
                      <TrendingUp className="h-4 w-4" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                      Seed to Series A
                    </span>
                  </div>
                  <div className="font-bold text-sm">Venture Capital &amp; Angels</div>
                  <div className="text-[11px] opacity-80 mt-1">
                    Cap table modeling, valuation reports, and investor syndication.
                  </div>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Sidebar Selector */}
              <div className="lg:col-span-4 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1 mb-2">
                  All 7 Specialized Portfolios
                </div>
                {servicesData.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all ${selectedService === service.id
                        ? "border-[#D4A238] bg-[#0B1F3B] text-white shadow-md"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-800"
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm">{service.title}</span>
                      <ChevronRight
                        className={`h-4 w-4 ${selectedService === service.id ? "text-[#D4A238]" : "text-slate-400"
                          }`}
                      />
                    </div>
                    <p
                      className={`text-xs mt-1 line-clamp-1 ${selectedService === service.id ? "text-slate-300" : "text-slate-500"
                        }`}
                    >
                      {service.tagline}
                    </p>
                  </button>
                ))}
              </div>

              {/* Service Deep Dive Card */}
              <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-6">
                  <div>
                    <span className="inline-block rounded bg-[#D4A238]/10 px-2.5 py-0.5 text-xs font-semibold text-[#B8860B]">
                      Primary Keyword: {currentService.primaryKeyword}
                    </span>
                    <h3 className="text-2xl font-bold text-slate-900 mt-2">
                      {currentService.title}
                    </h3>
                    <p className="text-sm text-slate-600 mt-1">{currentService.tagline}</p>
                  </div>
                  <a
                    href="#lead-form"
                    className="inline-flex items-center gap-1.5 rounded-md bg-[#0B1F3B] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#132F55]"
                  >
                    <span>Request Evaluation</span>
                    <ArrowRight className="h-3.5 w-3.5 text-[#D4A238]" />
                  </a>
                </div>

                {/* Explanation */}
                <div className="prose prose-slate max-w-none text-sm text-slate-700 leading-relaxed mb-6">
                  <p>{currentService.summary}</p>
                </div>

                {/* Grid for Eligibility & Limitations */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5 mb-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      Eligibility Requirements
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {currentService.eligibility.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-emerald-500 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl border border-amber-100 bg-amber-50/50 p-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5 mb-2">
                      <AlertCircle className="h-4 w-4 text-amber-600" />
                      Important Limitations &amp; Disclaimers
                    </h4>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {currentService.limitations}
                    </p>
                  </div>
                </div>

                {/* Required Documents */}
                <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 mb-3">
                    <FileText className="h-4 w-4 text-[#B8860B]" />
                    Documents Commonly Required
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                    {currentService.documents.map((doc, idx) => (
                      <div key={idx} className="flex items-start gap-1.5">
                        <span className="text-[#D4A238] font-bold">✓</span>
                        <span>{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step-by-Step Process */}
                <div className="mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                    Step-by-Step Application Roadmap
                  </h4>
                  <div className="space-y-2">
                    {currentService.process.map((step, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 rounded-lg border border-slate-100 bg-white p-2.5 text-xs text-slate-700"
                      >
                        <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0B1F3B] text-[10px] font-bold text-white">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits & Potential Risks */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-100 pt-4 text-xs">
                  <div>
                    <span className="font-semibold text-slate-900">Key Benefits:</span>
                    <p className="text-slate-600 mt-0.5">{currentService.benefits}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900">Risks &amp; Obligations:</span>
                    <p className="text-slate-600 mt-0.5">{currentService.risks}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: AHMEDABAD & GUJARAT HUB */}
        {activeTab === "locations" && (
          <div className="space-y-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#B8860B]">
                Genuinely Localized Financial Advisory
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                Ahmedabad &amp; Gujarat Business Financing Hub
              </h2>
              <p className="text-sm text-slate-600 mt-1 max-w-3xl">
                Unlike generic national platforms, our advisory is grounded in Gujarat's specific
                industrial clusters, GIDC estates, state nodal incubators, and Ahmedabad banking
                syndicates.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Location Card: Ahmedabad */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-800 mb-3">
                  <MapPin className="h-3.5 w-3.5 text-blue-600" />
                  <span>Ahmedabad Municipal &amp; Industrial Belt</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Business Loans &amp; Startup Capital in Ahmedabad
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Serving micro-enterprises, MSME manufacturers, and tech founders across:
                </p>
                <div className="my-4 flex flex-wrap gap-1.5">
                  {[
                    "Sanand Auto Belt",
                    "Changodar Industrial Estate",
                    "Naroda & Kathwada GIDC",
                    "Vatva Chemical Cluster",
                    "Prahlad Nagar & SG Highway Tech",
                    "Gota & Science City Corridors",
                  ].map((cluster, i) => (
                    <span
                      key={i}
                      className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-700"
                    >
                      {cluster}
                    </span>
                  ))}
                </div>

                <div className="space-y-3 text-xs text-slate-700">
                  <div className="border-l-2 border-[#D4A238] pl-3">
                    <span className="font-semibold text-slate-900">MSME Working Capital:</span>
                    <p className="text-slate-600">
                      Direct liaison with regional MSME credit desks (SBI, PNB, Bank of Baroda,
                      HDFC) located in Ashram Road, Ellisbridge, and SG Highway for fast-track Cash
                      Credit and Letter of Credit renewals.
                    </p>
                  </div>
                  <div className="border-l-2 border-[#D4A238] pl-3">
                    <span className="font-semibold text-slate-900">
                      Angel &amp; Seed Corridors:
                    </span>
                    <p className="text-slate-600">
                      Access to Ahmedabad Angel Network, TiE Ahmedabad chapters, and incubation
                      desks at GUSEC (Gujarat University) and CIIE.CO (IIM Ahmedabad).
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">Local Office: Gota, Ahmedabad</span>
                  <a
                    href="#lead-form"
                    className="text-xs font-bold text-[#B8860B] hover:text-[#0B1F3B] flex items-center gap-1"
                  >
                    Book Ahmedabad Meeting <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
              </div>

              {/* Location Card: Gujarat State */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 mb-3">
                  <Landmark className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Statewide Gujarat Financing</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Gujarat Industrial Policy &amp; MSME Subsidies
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Strategic support for manufacturing plants and greenfield initiatives across:
                </p>
                <div className="my-4 flex flex-wrap gap-1.5">
                  {[
                    "Surat Diamond & Textile Hub",
                    "Vadodara Engineering Clusters",
                    "Rajkot Foundry & Machine Tools",
                    "Morbi Ceramic Zone",
                    "Ankleshwar & Dahej PCPIR",
                    "GIFT City Gandhinagar FinTech",
                  ].map((cluster, i) => (
                    <span
                      key={i}
                      className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-700"
                    >
                      {cluster}
                    </span>
                  ))}
                </div>

                <div className="space-y-3 text-xs text-slate-700">
                  <div className="border-l-2 border-emerald-600 pl-3">
                    <span className="font-semibold text-slate-900">
                      Gujarat Industrial Policy Incentives:
                    </span>
                    <p className="text-slate-600">
                      Filing and tracking of Capital Investment Subsidies (up to 25%), Interest
                      Subventions (5%–7% p.a.), and Electricity Duty exemptions through District
                      Industries Centres (DICs).
                    </p>
                  </div>
                  <div className="border-l-2 border-emerald-600 pl-3">
                    <span className="font-semibold text-slate-900">State Startup Policy:</span>
                    <p className="text-slate-600">
                      Guiding young innovators to apply for up to ₹30 Lakh non-repayable sustenance
                      and prototype grants through the Industries Commissionerate.
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">Coverage: All 33 Gujarat Districts</span>
                  <a
                    href="#lead-form"
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
                  >
                    Enquire Gujarat Subsidies <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: 6 DETAILED BLOG GUIDES */}
        {activeTab === "blogs" && (
          <div className="space-y-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#B8860B]">
                In-Depth Educational Resources
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                6 Definitive Guides on Startup &amp; MSME Funding
              </h2>
              <p className="text-sm text-slate-600 mt-1 max-w-2xl">
                Written in clear, banker-verified language without jargon or false hype. Bookmark
                and review the exact processes before approaching financial institutions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPostsData.map((blog, idx) => (
                <div
                  key={blog.slug}
                  className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-xs transition-hover hover:border-[#D4A238] hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2">
                      <span className="font-semibold text-[#B8860B]">Guide #{idx + 1}</span>
                      <span>{blog.readingTime}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                      {blog.summary}
                    </p>

                    <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                      {blog.sections.map((sec, sIdx) => (
                        <div key={sIdx} className="text-[11px] text-slate-700">
                          <span className="font-semibold text-slate-800">• {sec.h2}:</span>{" "}
                          <span className="text-slate-500 line-clamp-1">{sec.content}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 truncate max-w-[150px]">
                      {blog.primaryKeyword}
                    </span>
                    <a
                      href="#lead-form"
                      className="text-xs font-bold text-[#0B1F3B] hover:text-[#D4A238] flex items-center gap-1"
                    >
                      Read &amp; Consult <ArrowRight className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CALCULATOR & SCREENER */}
        {activeTab === "calculator" && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-[#B8860B]">
                Interactive Decision Tool
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                Loan &amp; Funding Route Screener
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Answer four quick questions about your business to discover your most viable
                financing options in Gujarat.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Question 1 */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    1. Business Vintage (Operating Age)
                  </label>
                  <select
                    value={calcBusinessAge}
                    onChange={(e) => setCalcBusinessAge(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-800 focus:border-[#0B1F3B] focus:outline-hidden"
                  >
                    <option value="early">Under 1 Year (Early Startup / Greenfield)</option>
                    <option value="1to3">1 to 3 Years (Growing Unit)</option>
                    <option value="over3">Over 3 Years (Established Enterprise)</option>
                  </select>
                </div>

                {/* Question 2 */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    2. Annual Turnover / Revenue
                  </label>
                  <select
                    value={calcTurnover}
                    onChange={(e) => setCalcTurnover(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-800 focus:border-[#0B1F3B] focus:outline-hidden"
                  >
                    <option value="under25l">Pre-revenue to Under ₹25 Lakh</option>
                    <option value="25to1cr">₹25 Lakh to ₹1 Crore</option>
                    <option value="over1cr">Over ₹1 Crore (Audited)</option>
                  </select>
                </div>

                {/* Question 3 */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    3. Immovable Collateral Available?
                  </label>
                  <select
                    value={calcCollateral}
                    onChange={(e) => setCalcCollateral(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-800 focus:border-[#0B1F3B] focus:outline-hidden"
                  >
                    <option value="no">No Collateral (Need Non-Collateral Financing)</option>
                    <option value="partial">Partial Collateral (20%–50% of loan size)</option>
                    <option value="yes">
                      Full Collateral (Clear residential/commercial title)
                    </option>
                  </select>
                </div>

                {/* Question 4 */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    4. DPIIT Startup Recognition?
                  </label>
                  <select
                    value={calcDpiit}
                    onChange={(e) => setCalcDpiit(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-800 focus:border-[#0B1F3B] focus:outline-hidden"
                  >
                    <option value="yes">Yes (Registered on Startup India portal)</option>
                    <option value="no">No / Not Yet Applied</option>
                    <option value="nottech">
                      Traditional MSME / Manufacturing (Not tech startup)
                    </option>
                  </select>
                </div>
              </div>

              {/* Dynamic Assessment Output */}
              <div className="mt-8 rounded-xl border border-slate-200 bg-[#0B1F3B] p-6 text-white">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4A238] mb-2">
                  <Calculator className="h-4 w-4" />
                  <span>Recommended Capital Strategy</span>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {calcBusinessAge === "early" && calcCollateral === "no" && (
                    <p>
                      <strong>Primary Path:</strong> Apply for the{" "}
                      <span className="text-[#D4A238]">Startup Gujarat Seed Scheme</span> and{" "}
                      <span className="text-[#D4A238]">Startup India Seed Fund Scheme (SISFS)</span>{" "}
                      via recognized incubators (GUSEC, iCreate). For debt, evaluate PMEGP with
                      15%–35% capital subsidy or MUDRA Kishore up to ₹5 Lakh.
                    </p>
                  )}
                  {calcBusinessAge !== "early" && calcCollateral === "no" && (
                    <p>
                      <strong>Primary Path:</strong> Target a{" "}
                      <span className="text-[#D4A238]">
                        CGTMSE Collateral-Free MSME Loan up to ₹5 Crore
                      </span>
                      . Prepare 5-year CMA data emphasizing healthy DSCR (minimum 1.25x) and
                      12-month GST reconciliation.
                    </p>
                  )}
                  {calcCollateral === "yes" && (
                    <p>
                      <strong>Primary Path:</strong> Direct access to{" "}
                      <span className="text-[#D4A238]">
                        Low-Cost Bank Term Loans &amp; Cash Credit (CC)
                      </span>{" "}
                      at competitive repo-linked rates (8.5%–10.5%). Leverage Gujarat Industrial
                      Policy interest subventions (up to 7% p.a.) to further reduce borrowing costs.
                    </p>
                  )}
                  {calcDpiit === "yes" && (
                    <p>
                      <strong>Angel &amp; VC Eligibility:</strong> Eligible to pitch to Ahmedabad
                      Angel networks and state venture funds. Ensure your Cap Table and IP
                      assignment agreements are in order.
                    </p>
                  )}
                </div>

                <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs text-slate-400">
                    *Assessment is indicative. Final sanction is subject to lender credit appraisal.
                  </span>
                  <a
                    href="#lead-form"
                    className="inline-flex items-center gap-1.5 rounded-md bg-[#D4A238] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#0B1F3B] hover:bg-[#E5B54E]"
                  >
                    Get Detailed Evaluation <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: DOCUMENT CHECKLIST & PROCESS */}
        {activeTab === "checklist" && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#B8860B]">
                Banker &amp; Scheme Readiness
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                Complete Business Loan &amp; Funding Checklist
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Ensure every document is cross-reconciled before initiating bank or scheme
                submissions to prevent processing delays or rejection.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Checklist 1 */}
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3">
                  <Briefcase className="h-4 w-4 text-[#B8860B]" />
                  1. Statutory &amp; Entity Documents
                </h3>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Certificate of Incorporation / Partnership Deed / LLP Agreement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Memorandum &amp; Articles of Association (MOA/AOA)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Udyam Registration Certificate (with accurate NIC codes)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>GST Registration Certificate &amp; Factory License (if applicable)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>DPIIT Startup Recognition Certificate (for startups)</span>
                  </li>
                </ul>
              </div>

              {/* Checklist 2 */}
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3">
                  <Coins className="h-4 w-4 text-[#B8860B]" />
                  2. Financial Statements &amp; Tax Filings
                </h3>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Last 3 years audited balance sheets with CA notes and audit report</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Last 3 years Income Tax Returns (ITR-V) with computation sheets</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Last 12 months GST returns (GSTR-3B and GSTR-1)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Last 12 months comprehensive bank statements (all accounts)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      Sanction letters of all existing loans/facilities with repayment track
                    </span>
                  </li>
                </ul>
              </div>

              {/* Checklist 3 */}
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3">
                  <TrendingUp className="h-4 w-4 text-[#B8860B]" />
                  3. Project &amp; Credit Modeling Files
                </h3>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Comprehensive Detailed Project Report (DPR) with market analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>5-Year CMA (Credit Monitoring Arrangement) projection model</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Machinery/equipment proforma invoices from verified vendors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Customer orders, letters of intent (LOI), or master agreements</span>
                  </li>
                </ul>
              </div>

              {/* Checklist 4 */}
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3">
                  <ShieldCheck className="h-4 w-4 text-[#B8860B]" />
                  4. Promoter Identity &amp; Net Worth
                </h3>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Promoter PAN, Aadhaar, and recent passport-size photographs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Personal ITR of directors/partners for past 3 years</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>CA-certified Net Worth Statement of all promoters</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Commercial premises rent agreement or property ownership documents</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: FAQS & STATUTORY DISCLAIMERS */}
        {activeTab === "faqs" && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#B8860B]">
                Financial Accuracy &amp; Transparency
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                Frequently Asked Questions
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Objective answers to common questions about loans, grants, equity, and government
                schemes in Gujarat.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: "Can any consultancy guarantee a business loan or government grant?",
                  a: "No. Any consultant claiming 100% guaranteed loan sanction or government grant approval is violating financial ethics. Loan approval is the exclusive prerogative of the lending institution's credit committee based on risk criteria, cash flow viability, and CIBIL scores. Government grants are decided by institutional evaluation committees.",
                },
                {
                  q: "What is the difference between a loan, grant, and credit guarantee?",
                  a: "A loan is debt that must be repaid with interest over an agreed schedule. A grant is non-repayable capital provided for specific R&D or pilot milestones without debt or equity surrender. A credit guarantee (such as CGTMSE) is neither cash nor a grant—it is an insurance mechanism provided to the bank so that they can lend without physical collateral.",
                },
                {
                  q: "How does CGTMSE work for an Ahmedabad MSME?",
                  a: "If an MSME lacks immovable collateral, the bank evaluates the proposal and registers the loan under CGTMSE. The trust covers up to 75% to 85% of default risk for loans up to ₹5 Crore. The borrower pays an annual guarantee fee (0.37%–1.35%) and remains fully liable to repay the entire borrowed sum.",
                },
                {
                  q: "Is the Startup India Seed Fund Scheme (SISFS) open to every startup?",
                  a: "No. Startups must be DPIIT-recognized, incorporated within the past 2 years, have a viable prototype/business model, and must apply through approved incubators. It is not disbursed as cash directly by the central government without incubator screening.",
                },
                {
                  q: "What interest rate should I expect for an MSME business loan in Gujarat?",
                  a: "Public and private scheduled commercial banks typically offer repo-linked lending rates (RLLR) ranging from 8.75% to 11.5% for secured MSME debt. NBFCs and unsecured business loans range from 14% to 22% depending on turnover and credit rating.",
                },
                {
                  q: "What are the common reasons for MSME loan rejection?",
                  a: "Key rejection causes include: (1) Poor CIBIL score (below 680), (2) Inward cheque bounces or overdraft over-utilization, (3) Mismatch between turnover reported in GST returns vs. audited P&L, (4) Inadequate debt service coverage ratio (DSCR < 1.2), and (5) Inconsistent CMA projections.",
                },
              ].map((faq, i) => (
                <div key={i} className="rounded-xl border border-slate-200 bg-white p-5">
                  <h3 className="text-sm font-bold text-slate-900 flex items-start gap-2">
                    <HelpCircle className="h-4 w-4 text-[#B8860B] shrink-0 mt-0.5" />
                    <span>{faq.q}</span>
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed pl-6">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>

            {/* Regulatory Disclaimer Box */}
            <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-5 text-xs text-amber-900">
              <div className="flex items-center gap-2 font-bold mb-1.5">
                <AlertCircle className="h-4 w-4 text-amber-700" />
                <span>Statutory Financial Disclaimer</span>
              </div>
              <p className="leading-relaxed">
                Rise Advisory is an independent management and financial consultancy firm. We are
                not a bank, Non-Banking Financial Company (NBFC), or government agency. We do not
                accept deposits or directly lend money. All loan sanctions, grant approvals, and
                equity investments are strictly at the sole discretion of respective lending
                institutions, government departments, or investment committees. Past success metrics
                or indicative interest rates do not constitute a binding offer.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Conversion Section / Lead Form */}
      <section id="lead-form" className="border-t border-slate-200 bg-slate-50 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-lg">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-[#B8860B]">
                Confidential Consultation
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                Discuss Your Business Funding Needs
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2">
                Connect with our Ahmedabad financial advisory team. Receive an objective assessment
                of your debt capacity, eligible government subsidies, or equity readiness.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert(
                  "Thank you for your enquiry. Our senior financial advisory team in Ahmedabad will contact you within 24 business hours to evaluate your funding requirements.",
                );
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajesh Patel"
                    className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-800 focus:border-[#0B1F3B] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Entity / Business Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Precision Pvt Ltd"
                    className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-800 focus:border-[#0B1F3B] focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-800 focus:border-[#0B1F3B] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Official Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="rajesh@apexprecision.com"
                    className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-800 focus:border-[#0B1F3B] focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Primary Location *
                  </label>
                  <select className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-800 focus:border-[#0B1F3B] focus:outline-hidden">
                    <option>Ahmedabad, Gujarat</option>
                    <option>Surat, Gujarat</option>
                    <option>Vadodara, Gujarat</option>
                    <option>Rajkot, Gujarat</option>
                    <option>Other Gujarat City</option>
                    <option>Outside Gujarat (India)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Funding Category Required *
                  </label>
                  <select className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-800 focus:border-[#0B1F3B] focus:outline-hidden">
                    <option>Business Loan / Working Capital (Bank CC/OD)</option>
                    <option>Collateral-Free Loan (CGTMSE)</option>
                    <option>New Startup Loan (MUDRA / PMEGP)</option>
                    <option>Startup Grants (Gujarat Scheme / SISFS)</option>
                    <option>Venture Capital / Angel Equity</option>
                    <option>Gujarat Industrial Policy Subsidies</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Estimated Ticket Size
                  </label>
                  <select className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-800 focus:border-[#0B1F3B] focus:outline-hidden">
                    <option>₹10 Lakh to ₹50 Lakh</option>
                    <option>₹50 Lakh to ₹2 Crore</option>
                    <option>₹2 Crore to ₹5 Crore</option>
                    <option>₹5 Crore to ₹15 Crore</option>
                    <option>Over ₹15 Crore</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Current Annual Turnover
                  </label>
                  <select className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-800 focus:border-[#0B1F3B] focus:outline-hidden">
                    <option>Pre-revenue / Under ₹25 Lakh</option>
                    <option>₹25 Lakh to ₹1 Crore</option>
                    <option>₹1 Crore to ₹5 Crore</option>
                    <option>₹5 Crore to ₹25 Crore</option>
                    <option>Over ₹25 Crore</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Brief Funding Purpose &amp; Company Overview
                </label>
                <textarea
                  rows={3}
                  placeholder="Outline your machinery expansion, working capital cycle, or startup traction..."
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-800 focus:border-[#0B1F3B] focus:outline-hidden"
                />
              </div>

              <div className="text-[11px] text-slate-500">
                Your data is held strictly confidential under non-disclosure standards. We do not
                share financial records with third-party telemarketers.
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-[#0B1F3B] py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-colors hover:bg-[#132F55]"
              >
                Submit Funding Evaluation Request
              </button>
            </form>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

export type CaseStudy = {
  slug: string;
  pillar: "AI Automation" | "Brand Advisory" | "HR Consultancy" | "Talent";
  metric: string;
  label: string;
  title: string;
  client: string;
  industry: string;
  duration: string;
  body: string;
  serviceHref: string;
  serviceLabel: string;
  challenge: string;
  approach: string[];
  outcomes: { metric: string; label: string }[];
  quote: { text: string; name: string; role: string };
  servicesParam: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "northwind-outbound-engine",
    pillar: "AI Automation",
    metric: "3.1×",
    label: "qualified meetings booked",
    title: "Outbound engine rebuilt on n8n + Clay",
    client: "Northwind SaaS",
    industry: "B2B SaaS · Series B",
    duration: "6-week sprint",
    body: "Replaced a 2-person SDR team with an autonomous prospecting workflow. Payback in 47 days.",
    serviceHref: "/services/outbound-lead-gen-engines",
    serviceLabel: "Outbound Lead Gen Engines",
    challenge:
      "Two SDRs were drowning in list-building and personalization. Reply rates were below 1.2% and the pipeline was missing forecast for two quarters in a row.",
    approach: [
      "Mapped ICP signals across Clay, Apollo, and LinkedIn enrichment",
      "Built an n8n workflow for daily account discovery, scoring, and routing",
      "Wired AI-personalized first lines into a sequencer with reply detection",
      "Stood up a reply-routing inbox triaged into the AE calendar",
    ],
    outcomes: [
      { metric: "3.1×", label: "qualified meetings / mo" },
      { metric: "47 days", label: "to ROI payback" },
      { metric: "−68%", label: "manual SDR hours" },
    ],
    quote: {
      text:
        "RYZE rebuilt our outbound engine in six weeks. We replaced two SDRs with one automated workflow and tripled qualified meetings booked.",
      name: "Arjun Mehta",
      role: "VP Growth, Northwind SaaS",
    },
    servicesParam: "AI & Automation",
  },
  {
    slug: "lumen-rebrand-sprint",
    pillar: "Brand Advisory",
    metric: "+41%",
    label: "inbound demos / quarter",
    title: "Repositioning + identity overhaul",
    client: "Lumen Therapeutics",
    industry: "Healthtech · Growth-stage",
    duration: "8-week sprint",
    body: "New narrative, visual system, and site shipped in a single sprint. Sales cycle shortened by 18%.",
    serviceHref: "/services/corporate-identity-systems",
    serviceLabel: "Corporate Identity Systems",
    challenge:
      "A category shift left the existing brand misaligned with the new ICP. Sales decks, site, and identity were all pulling in different directions.",
    approach: [
      "Reframed positioning against three target segments with messaging matrix",
      "Rebuilt visual identity, type system, and brand guidelines",
      "Shipped a new marketing site and refreshed sales narrative deck",
      "Trained the GTM team on the new story and objection handling",
    ],
    outcomes: [
      { metric: "+41%", label: "inbound demos / quarter" },
      { metric: "−18%", label: "sales cycle length" },
      { metric: "8 weeks", label: "concept → launch" },
    ],
    quote: {
      text:
        "The brand work was surgical. Positioning, narrative, identity — all shipped in a single sprint. Inbound lifted 41% the quarter after launch.",
      name: "Priya Shah",
      role: "CMO, Lumen Therapeutics",
    },
    servicesParam: "Brand Advisory",
  },
  {
    slug: "caldera-performance-system",
    pillar: "HR Consultancy",
    metric: "92%",
    label: "review-cycle completion",
    title: "Performance system, end-to-end",
    client: "Caldera Logistics",
    industry: "Logistics · 240 employees",
    duration: "10-week engagement",
    body: "Goals, reviews, and comp bands wired into one operating cadence the leadership team actually runs.",
    serviceHref: "/services/performance-management",
    serviceLabel: "Performance Management",
    challenge:
      "HR ran on spreadsheets. Review cycles slipped quarter after quarter and managers had no shared language for performance or compensation.",
    approach: [
      "Designed competency model and leveling guide across functions",
      "Implemented quarterly goal + review cadence with manager training",
      "Built compensation bands and promotion criteria",
      "Migrated tracking into a single source of truth with automated reminders",
    ],
    outcomes: [
      { metric: "92%", label: "review-cycle completion" },
      { metric: "100%", label: "managers calibration-trained" },
      { metric: "−54%", label: "comp escalations to CEO" },
    ],
    quote: {
      text:
        "Our HR ops were held together with spreadsheets. RYZE engineered a performance system the leadership team actually trusts.",
      name: "Daniel Okafor",
      role: "Chief People Officer, Caldera Logistics",
    },
    servicesParam: "HR Consultancy",
  },
  {
    slug: "helix-executive-search",
    pillar: "Talent",
    metric: "38 days",
    label: "to executive offer accepted",
    title: "Two C-suite placements, retained",
    client: "Helix Robotics",
    industry: "Robotics · Series C",
    duration: "Two parallel searches",
    body: "Targeted search with structured scorecards. Both leaders still in seat 24 months later.",
    serviceHref: "/services/executive-search",
    serviceLabel: "Executive Search",
    challenge:
      "Two critical C-suite seats had been open for 5+ months. Prior recruiters delivered volume without fit, and offers kept falling through at the final stage.",
    approach: [
      "Built role scorecards aligned to 12-month outcomes, not job descriptions",
      "Ran targeted outreach across a curated 180-person target list",
      "Structured interview loops with calibrated rubrics",
      "Closed both candidates with custom comp + onboarding plans",
    ],
    outcomes: [
      { metric: "38 days", label: "to first offer accepted" },
      { metric: "2 / 2", label: "still in seat at 24 months" },
      { metric: "100%", label: "interview-loop calibration" },
    ],
    quote: {
      text:
        "Two executive hires placed in 38 days. Both still on the leadership team two years later. That's the ROI you don't get from a recruiter.",
      name: "Sara Lindqvist",
      role: "CEO, Helix Robotics",
    },
    servicesParam: "Talent Acquisition",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

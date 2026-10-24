import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { StickyCTA } from "@/components/site/StickyCTA";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Copy, Check } from "lucide-react";
import { buildTitle, buildDescription, buildCanonical } from "@/lib/seo";
import { LIBRARY_PROMPTS } from "@/data/promptLibrary";

export const Route = createFileRoute("/prompts")({
  head: () => {
    const title = buildTitle("Prompt Library — Tactical AI Prompts");
    const description = buildDescription(
      "A directory of production-grade system prompts for n8n architects, performance marketers, agency owners, and automation engineers."
    );
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: buildCanonical("/prompts") },
      ],
      links: [{ rel: "canonical", href: buildCanonical("/prompts") }],
    };
  },
  component: PromptsPage,
});

const SERVICES = [
  "Outbound Lead Gen",
  "CRM Hygiene",
  "Multi-Channel Follow-up",
  "Webhook Parsing",
  "Error Handling",
  "RAG Pipelines",
] as const;

const PERSONAS = [
  "n8n Architect",
  "Solutions Engineer",
  "Performance Marketer",
  "Agency Owner",
  "Technical Product Manager",
] as const;

type Service = (typeof SERVICES)[number];
type Persona = (typeof PERSONAS)[number];

interface Prompt {
  id: string;
  title: string;
  services: Service[];
  personas: Persona[];
  prompt: string;
}

const PROMPTS: Prompt[] = [
  {
    id: "p1",
    title: "Meta Lead Junk Filter & Intent Scorer",
    services: ["Outbound Lead Gen", "Webhook Parsing"],
    personas: ["Performance Marketer", "n8n Architect"],
    prompt: `You are an enterprise-grade Meta Lead Ads triage engine. Input: raw lead JSON from a Meta webhook.
Tasks:
1. Normalize phone (+E.164), email (lowercase, RFC-valid), and full_name (Title Case).
2. Score intent 0-100 using: form completion time, answer length variance, disposable-email detection, and free-email vs business-domain heuristic.
3. Classify as: HOT (>=75), WARM (40-74), JUNK (<40, missing fields, or test data).
4. Output strict JSON: {lead_id, normalized, score, classification, reasons[]}.
No prose. No markdown. Reject anything that does not match the schema.`,
  },
  {
    id: "p2",
    title: "n8n Webhook Idempotency Guard",
    services: ["Webhook Parsing", "Error Handling"],
    personas: ["n8n Architect", "Solutions Engineer"],
    prompt: `Act as a senior n8n architect. Given an incoming webhook payload, generate a deterministic idempotency_key from {source, event_type, external_id, occurred_at}.
Return JSON: {idempotency_key, hash_algo: "sha256", retry_safe: true|false, reason}.
If external_id is missing, fall back to sha256 of the canonicalized payload minus volatile fields (timestamps, request_id).
Reject duplicates older than 24h by setting retry_safe=false.`,
  },
  {
    id: "p3",
    title: "Instant Speed-to-Lead SMS Composer",
    services: ["Multi-Channel Follow-up", "Outbound Lead Gen"],
    personas: ["Performance Marketer", "Agency Owner"],
    prompt: `You write the first SMS sent within 60 seconds of a lead submitting a Meta form.
Constraints: max 320 chars, single message, no emojis, no links unless requested, addresses lead by first name, references the exact offer they opted into, ends with a one-tap question (yes/no or pick-a-time).
Tone: confident, human, zero corporate filler.
Output JSON: {sms_body, char_count, cta_type: "yes_no"|"time_pick"}.`,
  },
  {
    id: "p4",
    title: "CRM Deduplication Resolver",
    services: ["CRM Hygiene"],
    personas: ["Solutions Engineer", "Technical Product Manager"],
    prompt: `You are a CRM deduplication engine for HubSpot/Salesforce. Given two contact records, decide MERGE, KEEP_BOTH, or FLAG_FOR_REVIEW.
Match weights: email (40), phone E.164 (30), full_name + company (20), domain (10). Threshold MERGE >=70.
Output: {decision, score, winning_record_id, field_resolutions: {field: chosen_value}}.
Prefer the record with: more recent last_activity, more filled fields, non-disposable email. Never delete; always mark loser as "merged_into".`,
  },
  {
    id: "p5",
    title: "RAG Retrieval Reranker",
    services: ["RAG Pipelines"],
    personas: ["n8n Architect", "Solutions Engineer"],
    prompt: `You are a reranker for a RAG pipeline. Input: user_query + top_k chunks with vector scores.
Re-score each chunk 0-1 on: semantic precision, recency, source authority (docs > blog > forum), and answer-completeness for the query.
Return JSON array sorted desc: [{chunk_id, final_score, vector_score, rerank_score, citation_required: bool}].
Drop chunks below 0.35. Never hallucinate chunk_ids that were not in the input.`,
  },
  {
    id: "p6",
    title: "Multi-Channel Cadence Orchestrator",
    services: ["Multi-Channel Follow-up"],
    personas: ["Performance Marketer", "Agency Owner"],
    prompt: `Design a 7-day follow-up cadence across SMS, WhatsApp, Email, and Voicemail Drop for a {industry} lead with intent_score={score}.
Output JSON: {cadence: [{day, hour_local, channel, message_type, body, exit_condition}]}.
Rules: never two messages in the same channel within 24h, escalate to call on day 3 if no reply, stop on reply or booked-meeting webhook. Localize send-time to lead timezone.`,
  },
  {
    id: "p7",
    title: "Workflow Error Triage Bot",
    services: ["Error Handling"],
    personas: ["n8n Architect", "Solutions Engineer"],
    prompt: `You are an on-call SRE for an n8n / Make.com / Zapier estate. Given an error payload {workflow_id, node, error_message, stack, last_input}, classify:
- root_cause: "schema_drift" | "auth_expired" | "rate_limit" | "downstream_500" | "logic_bug"
- severity: P1|P2|P3
- auto_retry: bool with backoff_seconds
- runbook_steps: ordered array of 3-6 concrete actions a junior engineer can execute.
Output strict JSON. No speculation; if uncertain, set root_cause="unknown" and require human review.`,
  },
  {
    id: "p8",
    title: "Agency Discovery Call Brief Generator",
    services: ["Outbound Lead Gen"],
    personas: ["Agency Owner", "Performance Marketer"],
    prompt: `You prep a 1-page discovery call brief from a prospect's website + LinkedIn.
Sections: Company Snapshot, Likely Pain (3 bullets tied to their stack), Conversation Hooks (2 questions that prove research), Recommended Service Wedge, Pricing Anchor.
Tone: peer-to-peer, no flattery, no generic stats. Max 220 words. Output Markdown with H2 headings.`,
  },
  {
    id: "p9",
    title: "Schema-Drift Validator for Webhooks",
    services: ["Webhook Parsing", "Error Handling"],
    personas: ["Technical Product Manager", "n8n Architect"],
    prompt: `Given a JSON Schema (baseline) and an incoming payload, detect drift.
Output: {is_valid, breaking_changes: [{path, expected, actual, severity}], additive_changes: [...], recommendation: "block"|"log_and_pass"|"auto_adapt"}.
Treat missing required fields as breaking. Treat new optional fields as additive. Never auto_adapt for type changes.`,
  },
  {
    id: "p10",
    title: "RAG Answer Citation Enforcer",
    services: ["RAG Pipelines"],
    personas: ["Solutions Engineer", "Technical Product Manager"],
    prompt: `You answer user questions using ONLY the provided context chunks. Every factual sentence must end with [chunk_id]. If the answer is not in context, respond exactly: "I don't have that in my sources."
Forbidden: outside knowledge, paraphrased speculation, summarizing the question back.
Output: {answer_markdown, citations_used: string[], coverage: 0-1}.`,
  },
  {
    id: "p11",
    title: "CRM Stale Deal Recovery Sweeper",
    services: ["CRM Hygiene", "Multi-Channel Follow-up"],
    personas: ["Agency Owner", "Performance Marketer"],
    prompt: `Scan deals with last_activity > 21 days. For each, generate: {deal_id, recovery_email_subject, recovery_email_body (<=120 words), suggested_next_step: "call"|"close_lost"|"nurture", confidence_0_1}.
Email must reference the original pain, propose a specific next action, and include a calendar link placeholder {{cal_link}}. Never sound like a "just checking in" email.`,
  },
  {
    id: "p12",
    title: "Outbound Personalization Snippet Writer",
    services: ["Outbound Lead Gen"],
    personas: ["Performance Marketer", "Agency Owner"],
    prompt: `Write a 1-sentence personalization opener (max 25 words) for a cold email, given {prospect_linkedin_summary, prospect_company_news}.
Rules: cite a specific detail, no "I noticed", no "I came across", no compliments. End the sentence in a way that flows into a value pitch on the next line. Output JSON: {opener, evidence_snippet}.`,
  },
];

const LIBRARY_SOURCES = Array.from(new Set(LIBRARY_PROMPTS.map((p) => p.source)));

interface UnifiedPrompt {
  id: string;
  title: string;
  prompt: string;
  services: string[];
  personas: string[];
  source?: string;
  category?: string;
}

const ALL_PROMPTS: UnifiedPrompt[] = [
  ...PROMPTS.map((p) => ({ ...p, services: [...p.services], personas: [...p.personas] })),
  ...LIBRARY_PROMPTS.map((p, i) => ({
    id: `lib-${i}`,
    title: p.category ? `${p.category} Prompt #${i + 1}` : `Prompt #${i + 1}`,
    prompt: p.prompt,
    services: [] as string[],
    personas: [] as string[],
    source: p.source,
    category: p.category,
  })),
];

function PromptsPage() {
  const [query, setQuery] = useState("");
  const [activeService, setActiveService] = useState<Service | null>(null);
  const [activePersona, setActivePersona] = useState<Persona | null>(null);
  const [activeSource, setActiveSource] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ALL_PROMPTS.filter((p) => {
      if (activeService && !p.services.includes(activeService)) return false;
      if (activePersona && !p.personas.includes(activePersona)) return false;
      if (activeSource && p.source !== activeSource) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.prompt.toLowerCase().includes(q) ||
        (p.category ?? "").toLowerCase().includes(q) ||
        (p.source ?? "").toLowerCase().includes(q) ||
        p.services.some((s) => s.toLowerCase().includes(q)) ||
        p.personas.some((s) => s.toLowerCase().includes(q))
      );
    });
  }, [query, activeService, activePersona, activeSource]);

  const [limit, setLimit] = useState(40);
  const visible = filtered.slice(0, limit);

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1800);
    } catch {
      /* noop */
    }
  };

  return (
    <SiteLayout>
      <div className="min-h-screen bg-[oklch(0.18_0.04_265)] text-slate-100">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <header className="mb-10 max-w-3xl">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-300/80">Prompt Library</p>
            <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">
              Tactical Prompts for Operators
            </h1>
            <p className="mt-4 text-slate-300/90 text-lg">
              {ALL_PROMPTS.length}+ production-grade prompts: curated automation playbooks plus
              imported libraries for marketing, business, content, careers, and more.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
            <aside className="lg:sticky lg:top-24 self-start">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur max-h-[80vh] overflow-y-auto">
                <FilterSection
                  label="IT Services"
                  items={SERVICES as readonly string[]}
                  active={activeService}
                  onSelect={(v) => setActiveService(v as Service | null)}
                />
                <div className="my-5 border-t border-white/10" />
                <FilterSection
                  label="IT Personas"
                  items={PERSONAS as readonly string[]}
                  active={activePersona}
                  onSelect={(v) => setActivePersona(v as Persona | null)}
                />
                <div className="my-5 border-t border-white/10" />
                <FilterSection
                  label="Source Library"
                  items={LIBRARY_SOURCES}
                  active={activeSource}
                  onSelect={(v) => setActiveSource(v)}
                />
                {(activeService || activePersona || activeSource || query) && (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveService(null);
                      setActivePersona(null);
                      setActiveSource(null);
                      setQuery("");
                    }}
                    className="mt-5 w-full text-xs uppercase tracking-wider text-amber-300 hover:text-amber-200"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            </aside>

            <section>
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setLimit(40);
                  }}
                  placeholder="Search prompts by keyword, category, service, or source…"
                  className="pl-10 h-12 bg-white/5 border-white/10 text-slate-100 placeholder:text-slate-400 focus-visible:ring-amber-400/40"
                  aria-label="Search prompts"
                />
              </div>

              <p className="mb-4 text-sm text-slate-400">
                Showing {visible.length} of {filtered.length} prompt{filtered.length === 1 ? "" : "s"}
              </p>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                {visible.map((p) => (
                  <article
                    key={p.id}
                    className="flex flex-col rounded-xl border border-white/10 bg-white/[0.04] p-5 hover:border-amber-300/30 transition-colors"
                  >
                    <h2 className="text-base font-semibold tracking-tight text-white">{p.title}</h2>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {p.services.map((s) => (
                        <Badge key={s} variant="outline" className="border-amber-300/30 text-amber-200 bg-amber-300/5">{s}</Badge>
                      ))}
                      {p.personas.map((s) => (
                        <Badge key={s} variant="outline" className="border-sky-300/30 text-sky-200 bg-sky-300/5">{s}</Badge>
                      ))}
                      {p.category && (
                        <Badge variant="outline" className="border-emerald-300/30 text-emerald-200 bg-emerald-300/5">{p.category}</Badge>
                      )}
                      {p.source && (
                        <Badge variant="outline" className="border-white/20 text-slate-300 bg-white/5">{p.source}</Badge>
                      )}
                    </div>
                    <pre className="mt-4 max-h-64 overflow-auto rounded-lg bg-black/40 border border-white/5 p-4 text-xs leading-relaxed text-slate-200 whitespace-pre-wrap font-mono">
                      {p.prompt}
                    </pre>
                    <div className="mt-4 flex justify-end">
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => handleCopy(p.id, p.prompt)}
                        className="bg-amber-400 text-slate-900 hover:bg-amber-300"
                      >
                        {copiedId === p.id ? (<><Check className="h-4 w-4" /> Copied</>) : (<><Copy className="h-4 w-4" /> Copy Prompt</>)}
                      </Button>
                    </div>
                  </article>
                ))}
                {filtered.length === 0 && (
                  <div className="col-span-full rounded-xl border border-dashed border-white/10 p-10 text-center text-slate-400">
                    No prompts match your filters yet.
                  </div>
                )}
              </div>

              {visible.length < filtered.length && (
                <div className="mt-8 flex justify-center">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setLimit((n) => n + 40)}
                    className="border-white/20 text-slate-200 hover:bg-white/10"
                  >
                    Load more ({filtered.length - visible.length} remaining)
                  </Button>
                </div>
              )}
            </section>
          </div>
        </div>
        <StickyCTA />
      </div>
    </SiteLayout>
  );
}

function FilterSection({
  label,
  items,
  active,
  onSelect,
}: {
  label: string;
  items: readonly string[];
  active: string | null;
  onSelect: (v: string | null) => void;
}) {
  return (
    <div>
      <h3 className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-3">{label}</h3>
      <ul className="space-y-1">
        {items.map((item) => {
          const isActive = active === item;
          return (
            <li key={item}>
              <button
                type="button"
                onClick={() => onSelect(isActive ? null : item)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  isActive
                    ? "bg-amber-400/15 text-amber-200 border border-amber-300/30"
                    : "text-slate-300 hover:bg-white/5 border border-transparent"
                }`}
              >
                {item}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

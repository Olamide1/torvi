export type PSEOPageType =
  | "template_page"
  | "starter_pack"
  | "role_page"
  | "guide_page"
  | "resource_page"
  | "solution_page"
  | "comparison_page";

export type PSEOCluster =
  | "prompt_templates"
  | "meetings_and_action_items"
  | "prd_and_requirements"
  | "reporting_automation"
  | "intake_and_routing"
  | "vibe_coding_training"
  | "pm_ai_tools"
  | "ops_ai_tools"
  | "consult_ai_tools"
  | "internal_tools";

export interface PSEOPage {
  slug: string;
  title: string;
  h1: string;
  metaDescription: string;
  keyword: string;
  cluster: PSEOCluster;
  pageType: PSEOPageType;
  priorityScore: number;
  /** What the template/guide/resource covers — 2-4 short paragraphs */
  body: {
    intro: string;
    whatYouGet: string[];
    whoItsFor: string;
    ctaNote: string;
  };
}

// ─── Template pages ──────────────────────────────────────────────────────────

export const templatePages: PSEOPage[] = [
  {
    slug: "prompt-template-for-meeting-notes",
    title: "Prompt Template for Meeting Notes — Free Download | Torvi",
    h1: "Prompt template for meeting notes",
    metaDescription:
      "Copy-paste prompt templates that turn raw meeting transcripts into structured notes, action items, and decisions. Free download.",
    keyword: "prompt template for meeting notes",
    cluster: "meetings_and_action_items",
    pageType: "template_page",
    priorityScore: 72.4,
    body: {
      intro:
        "Stop rewriting the same meeting summary prompt from scratch. This template pack gives you five battle-tested prompts that extract the signal from any meeting recording or transcript — decisions made, blockers raised, owners assigned, and next steps due.",
      whatYouGet: [
        "5 prompt variants for different meeting types: 1:1s, standups, project reviews, stakeholder updates, retrospectives",
        "Structured output schema (JSON + plain-text versions) so notes drop directly into Notion, Linear, or email",
        "Tone controls: executive summary vs. detail-heavy vs. action-only",
        "Worked examples with before/after transcripts",
      ],
      whoItsFor:
        "Operations managers, project leads, and PMs who run more than three recurring meetings a week and are tired of spending 30 minutes writing notes that nobody reads.",
      ctaNote:
        "The prompts are free. If you want to build your own meeting-notes tool — one that captures, summarises, and routes action items automatically — the Torvi Ops track walks you through it in four weeks.",
    },
  },
  {
    slug: "prompt-templates-for-consultants",
    title: "Prompt Templates for Consultants — Free Pack | Torvi",
    h1: "Prompt templates for consultants",
    metaDescription:
      "Free prompt templates for client deliverables: status reports, intake briefs, proposal outlines, and exec summaries. Built for independent consultants.",
    keyword: "prompt templates for consultants",
    cluster: "consult_ai_tools",
    pageType: "template_page",
    priorityScore: 69.8,
    body: {
      intro:
        "Consulting deliverables follow patterns. So do good prompts. This pack covers the eight formats you produce most often — from project kickoff briefs to final exec summaries — with prompts tuned for professional tone, client-facing clarity, and fast iteration.",
      whatYouGet: [
        "8 prompt templates: project status update, intake brief, findings summary, recommendation deck outline, exec summary, risk log, scope creep escalation, retro report",
        "Instruction layers for adapting tone to different client types (C-suite, ops team, technical SME)",
        "Worked examples with sample outputs you can copy and adapt",
        "A short guide on chaining prompts for longer deliverables",
      ],
      whoItsFor:
        "Independent consultants and fractional executives who want to spend less time formatting and more time thinking. Also useful for in-house strategy and transformation teams.",
      ctaNote:
        "Download the pack free. If you want to go further — building a client-facing reporting tool or intake workflow your clients can use directly — that is the Torvi Consultant track.",
    },
  },
  {
    slug: "ai-prompt-templates",
    title: "AI Prompt Templates for Work — Free Library | Torvi",
    h1: "AI prompt templates",
    metaDescription:
      "A curated library of AI prompt templates for real work tasks: reports, planning, analysis, comms, and more. Copy, paste, adapt.",
    keyword: "ai prompt templates",
    cluster: "prompt_templates",
    pageType: "template_page",
    priorityScore: 63.3,
    body: {
      intro:
        "Most prompt libraries are either too basic (\"write me a summary\") or too elaborate to use in practice. This library takes the middle path: prompts that are specific enough to produce useful output, and flexible enough to adapt to your actual work.",
      whatYouGet: [
        "40+ prompts organised by work category: planning, reporting, analysis, communications, documentation",
        "Each prompt includes: the template, the intended output format, and one worked example",
        "Role-specific sections for PMs, ops leads, and consultants",
        "A short guide on how to modify prompts for your context without breaking them",
      ],
      whoItsFor:
        "Senior professionals who use AI tools daily but want to move beyond improvised prompts to consistent, repeatable outputs.",
      ctaNote:
        "Take the free library. If you want to embed these prompts into a tool your team actually uses — not just a personal workflow — the Torvi run helps you build and ship that in four weeks.",
    },
  },
  {
    slug: "chatgpt-prompt-templates",
    title: "ChatGPT Prompt Templates for Work — Free Pack | Torvi",
    h1: "ChatGPT prompt templates",
    metaDescription:
      "Ready-to-use ChatGPT prompt templates for planning, reporting, writing, and analysis. Free download, no sign-up.",
    keyword: "chatgpt prompt templates",
    cluster: "prompt_templates",
    pageType: "template_page",
    priorityScore: 61.3,
    body: {
      intro:
        "ChatGPT is powerful, but most people use it like a search engine — one-shot questions, inconsistent results. Prompt templates change that. They give you a repeatable starting point that produces consistent, usable output every time.",
      whatYouGet: [
        "30 ChatGPT prompt templates for work: meeting notes, project updates, analysis frameworks, email drafts, decision summaries",
        "System prompt setup guide for persistent context across sessions",
        "Prompt chaining guide for multi-step tasks like report generation",
        "Before/after examples showing the difference between an improvised and a structured prompt",
      ],
      whoItsFor:
        "Professionals who already use ChatGPT but want better, more consistent results without spending time prompt-engineering from scratch.",
      ctaNote:
        "The templates are free. If you want to build something your team uses — a tool that automates the workflow behind these prompts — the Torvi run is the structured way to do it.",
    },
  },
  {
    slug: "mvp-template",
    title: "MVP Template for Work Tools — Free | Torvi",
    h1: "MVP template",
    metaDescription:
      "A lean MVP template for internal work tools. Define scope, pick your stack, and ship in weeks not months. Free one-page format.",
    keyword: "mvp template",
    cluster: "internal_tools",
    pageType: "template_page",
    priorityScore: 61.4,
    body: {
      intro:
        "Most internal tools fail because they try to do too much before they ship. This MVP template forces the right constraints: one problem, one user type, one workflow, one deliverable. It is what we use at Torvi to help professionals scope and ship a real tool in four weeks.",
      whatYouGet: [
        "One-page MVP definition canvas: problem, user, workflow, success metric, out-of-scope list",
        "Stack decision guide for internal tools (no-code vs. low-code vs. AI-native)",
        "Week-by-week build schedule template from brief to shipped",
        "Worked example: ops manager builds an intake routing tool",
      ],
      whoItsFor:
        "PMs, ops leads, and consultants who have a tool idea but keep deferring it because it feels too big. This template makes the scope small enough to actually start.",
      ctaNote:
        "Use the template free. If you want a guided process — office hours, peer feedback, and a structured path from brief to shipped — that is Torvi.",
    },
  },
  {
    slug: "release-notes-template-for-product-managers",
    title: "Release Notes Template for Product Managers — Free | Torvi",
    h1: "Release notes template for product managers",
    metaDescription:
      "A structured release notes template for PMs. Covers internal and external audiences, with AI prompt to generate first drafts fast.",
    keyword: "release notes template for product managers",
    cluster: "prd_and_requirements",
    pageType: "template_page",
    priorityScore: 64.9,
    body: {
      intro:
        "Release notes are the one document every PM writes but nobody teaches. Done well, they keep stakeholders aligned, surface the right context, and build trust with users. This template gives you a format that works for both internal engineering updates and external customer-facing comms.",
      whatYouGet: [
        "Two-format template: internal (what changed, why, known issues, rollout plan) and external (what's new, how to use it, what's fixed)",
        "AI prompt to generate a first draft from your PR list or Jira changelog",
        "Tone guide for different audiences: engineering, sales, end users, exec team",
        "Worked example for a typical SaaS product release",
      ],
      whoItsFor:
        "Product managers at startups and scale-ups who ship frequently and want a consistent, low-effort format for communicating changes without writing from scratch each time.",
      ctaNote:
        "The template is free. If you want to build a tool that auto-generates release notes from your changelog or ticketing system, the Torvi PM track covers it in Week 2.",
    },
  },
  {
    slug: "consultant-project-status-report-template",
    title: "Consultant Project Status Report Template — Free | Torvi",
    h1: "Consultant project status report template",
    metaDescription:
      "A professional project status report template for consultants. RAG status, milestones, risks, decisions. Free download with AI prompt.",
    keyword: "consultant project status report template",
    cluster: "reporting_automation",
    pageType: "template_page",
    priorityScore: 55.9,
    body: {
      intro:
        "Status reports are the connective tissue of consulting engagements. Clients who feel informed stay calm. This template gives you a clean, professional format that covers the essentials without turning into a 10-page document nobody reads.",
      whatYouGet: [
        "One-page status report template: overall RAG, milestone table, decisions required, risks, next steps",
        "AI prompt to populate the template from your notes or meeting transcript",
        "Variants for weekly check-in, monthly steering committee, and end-of-phase summary",
        "Worked example from a process transformation engagement",
      ],
      whoItsFor:
        "Independent consultants and small consulting teams who want to send professional, consistent status reports without spending two hours writing them.",
      ctaNote:
        "Download the template free. If you want to build a client reporting tool — something your clients log into directly to see project status — the Torvi Consultant track is how you do it.",
    },
  },
  {
    slug: "insight-report-template",
    title: "Insight Report Template — Free Download | Torvi",
    h1: "Insight report template",
    metaDescription:
      "A structured insight report template for analysts and consultants. Covers findings, evidence, so-what, and recommendation. Free download.",
    keyword: "insight report template",
    cluster: "reporting_automation",
    pageType: "template_page",
    priorityScore: 55.3,
    body: {
      intro:
        "An insight is not a data point. It is a finding with a so-what attached. This template forces that discipline: for every insight you report, you document the evidence, the implication, and the recommended action. It is the structure that separates a good analyst from a data dumper.",
      whatYouGet: [
        "Insight report structure: executive summary, key findings (insight + evidence + implication), recommendations, appendix",
        "AI prompt to extract insights from raw data, survey results, or interview notes",
        "Worked example: customer research findings presented to a product team",
        "Slide outline version for presentations",
      ],
      whoItsFor:
        "Analysts, consultants, and PMs who need to present findings to senior stakeholders and want a format that communicates clearly without burying the lead.",
      ctaNote:
        "Free download. If you want to automate insight generation — building a tool that takes data inputs and surfaces findings automatically — the Torvi run gives you a four-week path to ship it.",
    },
  },
  {
    slug: "chatgpt-prompts-for-action-items",
    title: "ChatGPT Prompts for Action Items — Free Templates | Torvi",
    h1: "ChatGPT prompts for action items",
    metaDescription:
      "Copy-paste ChatGPT prompts for extracting, formatting, and routing action items from meetings, emails, and project notes.",
    keyword: "chatgpt prompts for action items",
    cluster: "meetings_and_action_items",
    pageType: "template_page",
    priorityScore: 52.8,
    body: {
      intro:
        "Action items are where meetings go to die. Someone says \"I will look into that\" and nothing happens. These prompts extract explicit owners, verbs, and due dates from any meeting transcript or email thread — so the follow-through actually happens.",
      whatYouGet: [
        "5 ChatGPT prompts: extract action items from transcript, assign owners from context, format for Notion/Asana/Linear, generate follow-up email, summarise outstanding items across multiple meetings",
        "Prompt variants for different transcript quality levels (clean recording vs. rough notes)",
        "Output schemas for structured and plain-text formats",
        "A guide on building a recurring meeting review workflow with these prompts",
      ],
      whoItsFor:
        "Team leads, ops managers, and PMs who run recurring meetings and want to eliminate the \"did we agree on that?\" problem without manually tracking every discussion.",
      ctaNote:
        "Free prompts. If you want to build an action item tracking tool that pulls from your meetings automatically, the Torvi Ops track covers that in Weeks 1–2.",
    },
  },
];

// ─── Role pages ───────────────────────────────────────────────────────────────

export const rolePages: PSEOPage[] = [
  {
    slug: "operations-manager",
    title: "Vibe Coding for Operations Managers — Torvi",
    h1: "Build your first AI tool as an operations manager",
    metaDescription:
      "A 4-week guided build for ops managers who want to ship one AI-powered internal tool — without a dev team. Open enrolment, start immediately.",
    keyword: "vibe coding bootcamp for operations manager",
    cluster: "vibe_coding_training",
    pageType: "role_page",
    priorityScore: 51.7,
    body: {
      intro:
        "Operations managers sit on the most automatable work in any company: intake, routing, reporting, handoffs, status updates. You know exactly what is broken. You just do not have the engineering capacity to fix it. Torvi is the structured path to building that fix yourself — in four weeks.",
      whatYouGet: [
        "Week 0: Define your problem and write a one-page tool brief",
        "Weeks 1–4: Guided build path specific to the ops archetype — intake tools, routing logic, reporting dashboards, workflow automation",
        "Weekly office hours to unblock you when you get stuck",
        "A shipped, working tool at the end — not a prototype, not a spec doc",
      ],
      whoItsFor:
        "Operations managers, Chiefs of Staff, and BizOps leads who are comfortable with process thinking, want to learn AI-native tooling, and are willing to put in 3–5 focused hours a week for four weeks.",
      ctaNote:
        "Open enrolment — start when you are ready. Founding rate is €200.",
    },
  },
  {
    slug: "product-manager",
    title: "Build AI Tools as a Product Manager — Torvi",
    h1: "Build your first AI tool as a product manager",
    metaDescription:
      "A 4-week guided build for PMs who want to ship an AI-powered work tool — prompt packs, PRD automation, changelog tools. Start immediately.",
    keyword: "vibe coding for product managers",
    cluster: "pm_ai_tools",
    pageType: "role_page",
    priorityScore: 48.2,
    body: {
      intro:
        "PMs write the specs. They rarely build the tools. Torvi changes that: four weeks, one AI-powered tool, built and shipped by you. Most PM track participants build tools around their daily workflow — PRD generation, release notes, stakeholder updates, or changelog automation.",
      whatYouGet: [
        "Week 0: Tool brief scoped to your PM workflow",
        "Weeks 1–4: PM-specific build path covering prompt engineering, lightweight UI, and integration with your existing stack",
        "Weekly office hours with practitioners who have shipped PM tooling",
        "A working tool — not a side project that sits in a folder",
      ],
      whoItsFor:
        "Product managers who are close to AI tools (use them daily) but want to go one level deeper — building something that saves their team real time, not just their own.",
      ctaNote:
        "Open enrolment. Founding rate €200. Buy now, start immediately.",
    },
  },
  {
    slug: "consultant",
    title: "Build AI Tools as a Consultant — Torvi",
    h1: "Build your first AI tool as a consultant",
    metaDescription:
      "A 4-week guided build for consultants and fractional executives. Ship a client-facing or internal AI tool. Start immediately.",
    keyword: "ai tools for consultants",
    cluster: "consult_ai_tools",
    pageType: "role_page",
    priorityScore: 46.1,
    body: {
      intro:
        "Consultants who ship tools retain clients longer and command higher day rates. Torvi is the structured path to building your first client-facing or internal tool — from intake brief to deployed product — in four weeks.",
      whatYouGet: [
        "Week 0: Define which client problem your tool solves and write the brief",
        "Weeks 1–4: Consultant-specific build path — client reporting, intake automation, scoping tools, or deliverable generators",
        "Weekly office hours to review your build and get unblocked",
        "A tool you can demo to clients or deploy in your practice",
      ],
      whoItsFor:
        "Independent consultants, fractional executives, and small consulting teams who want to differentiate by building proprietary tools — not just delivering analysis.",
      ctaNote:
        "Open enrolment. Founding rate €200. Your tool is the deliverable.",
    },
  },
];

// ─── Resource / guide pages ───────────────────────────────────────────────────

export const resourcePages: PSEOPage[] = [
  {
    slug: "how-to-automate-meeting-notes-with-ai",
    title: "How to Automate Meeting Notes with AI | Torvi",
    h1: "How to automate meeting notes with AI",
    metaDescription:
      "A practical guide to automating meeting notes using AI tools: transcription, prompt templates, and routing to your PM or ops stack.",
    keyword: "ai meeting notes",
    cluster: "meetings_and_action_items",
    pageType: "guide_page",
    priorityScore: 44.0,
    body: {
      intro:
        "Automating meeting notes has three steps: capture, structure, route. Most people only think about the first one. This guide covers the full chain — from choosing a transcription tool to getting structured notes into the right place without manual effort.",
      whatYouGet: [
        "Transcription tool comparison: Otter, Fireflies, Notion AI, and direct ChatGPT upload",
        "The two-stage prompt approach: first pass for extraction, second pass for formatting",
        "Routing logic: how to get action items into Linear, Asana, or a Notion database automatically",
        "A worked end-to-end example with a 45-minute project meeting",
      ],
      whoItsFor:
        "Team leads and ops managers who spend 30+ minutes after every meeting writing notes that could be automated.",
      ctaNote:
        "This guide is free. If you want to build a custom meeting notes tool — one tailored to your team's workflow and integrated with your stack — the Torvi Ops track is how.",
    },
  },
  {
    slug: "ai-tools-for-operations-managers",
    title: "AI Tools for Operations Managers — A Practical Guide | Torvi",
    h1: "AI tools for operations managers",
    metaDescription:
      "The practical ops manager's guide to AI tools: what to use, what to build, and how to decide between them.",
    keyword: "ai tools for operations managers",
    cluster: "ops_ai_tools",
    pageType: "resource_page",
    priorityScore: 42.5,
    body: {
      intro:
        "Operations teams have more to gain from AI than almost any function — and more noise to cut through. This guide covers the tools actually worth using, the use cases where AI reliably saves time, and the decision framework for when to configure an off-the-shelf tool vs. build something custom.",
      whatYouGet: [
        "Use case map: intake, routing, reporting, handoffs, status updates — AI tool options for each",
        "Buy vs. build decision guide for ops tooling",
        "The five ops workflows most improved by AI in 2024–2025",
        "A short list of tools worth evaluating: n8n, Make, Notion AI, ChatGPT, Claude, and lightweight app builders",
      ],
      whoItsFor:
        "Operations managers and Chiefs of Staff who want a clear view of the AI tools landscape for their function, without vendor noise.",
      ctaNote:
        "Free guide. If you want to go from reading about tools to shipping one, the Torvi Ops track is the structured path.",
    },
  },
  {
    slug: "how-to-write-a-prd-with-ai",
    title: "How to Write a PRD with AI — Guide and Prompt Templates | Torvi",
    h1: "How to write a PRD with AI",
    metaDescription:
      "A practical guide to writing product requirements documents with AI assistance. Includes prompt templates and worked examples.",
    keyword: "ai prd template",
    cluster: "prd_and_requirements",
    pageType: "guide_page",
    priorityScore: 41.8,
    body: {
      intro:
        "AI is useful for PRDs in a specific way: it is good at structure, consistent formatting, and surfacing missing sections. It is not good at product judgment. This guide shows you how to use AI to handle the scaffolding so you can focus on the hard parts.",
      whatYouGet: [
        "A PRD structure that works with AI generation: context block, problem statement, requirements, non-requirements, open questions",
        "Three prompt templates: first draft from discovery notes, gap analysis of an existing PRD, stakeholder-ready summary",
        "A guide on feeding context to the AI effectively (personas, constraints, metrics)",
        "Worked example: PRD for an internal intake tool generated from interview notes",
      ],
      whoItsFor:
        "Product managers and senior ICs who write PRDs regularly and want a faster, more consistent process without sacrificing quality.",
      ctaNote:
        "Free guide and templates. If you want to build a PRD generation tool for your team — one that pulls from your research system automatically — the Torvi PM track covers it.",
    },
  },
];

// ─── All pages combined ───────────────────────────────────────────────────────

// Cluster imports — each file adds pages for one keyword cluster
export { promptTemplatePages } from "./clusters/prompt-templates";
export { prdRequirementsPages } from "./clusters/prd-requirements";
export { meetingsActionItemsPages } from "./clusters/meetings-action-items";
export { consultantToolPages } from "./clusters/consultant-tools";
export { vibeCodingPages } from "./clusters/vibe-coding";
export { opsToolPages, pmToolPages } from "./clusters/ops-pm-tools";
export { reportingPages, intakeRoutingPages } from "./clusters/reporting-intake";
export { extendedOpsPages } from "./clusters/extended-ops";
export { extendedPmPages } from "./clusters/extended-pm";
export { extendedMeetingsPages } from "./clusters/extended-meetings";
export { extendedConsultPages } from "./clusters/extended-consult";
export { internalToolsPages } from "./clusters/internal-tools";
export { extendedReportingPages } from "./clusters/extended-reporting";
export { extendedIntakePages } from "./clusters/extended-intake";
export { extendedVibeCodingPages } from "./clusters/extended-vibe-coding";
export { combinationPages } from "./generators/combinations";

import { promptTemplatePages } from "./clusters/prompt-templates";
import { prdRequirementsPages } from "./clusters/prd-requirements";
import { meetingsActionItemsPages } from "./clusters/meetings-action-items";
import { consultantToolPages } from "./clusters/consultant-tools";
import { vibeCodingPages } from "./clusters/vibe-coding";
import { opsToolPages, pmToolPages } from "./clusters/ops-pm-tools";
import { reportingPages, intakeRoutingPages } from "./clusters/reporting-intake";
import { extendedOpsPages } from "./clusters/extended-ops";
import { extendedPmPages } from "./clusters/extended-pm";
import { extendedMeetingsPages } from "./clusters/extended-meetings";
import { extendedConsultPages } from "./clusters/extended-consult";
import { internalToolsPages } from "./clusters/internal-tools";
import { extendedReportingPages } from "./clusters/extended-reporting";
import { extendedIntakePages } from "./clusters/extended-intake";
import { extendedVibeCodingPages } from "./clusters/extended-vibe-coding";
import { combinationPages } from "./generators/combinations";

export const allPSEOPages: PSEOPage[] = [
  ...templatePages,
  ...rolePages,
  ...resourcePages,
  ...promptTemplatePages,
  ...prdRequirementsPages,
  ...meetingsActionItemsPages,
  ...consultantToolPages,
  ...vibeCodingPages,
  ...opsToolPages,
  ...pmToolPages,
  ...reportingPages,
  ...intakeRoutingPages,
  ...extendedOpsPages,
  ...extendedPmPages,
  ...extendedMeetingsPages,
  ...extendedConsultPages,
  ...internalToolsPages,
  ...extendedReportingPages,
  ...extendedIntakePages,
  ...extendedVibeCodingPages,
  ...combinationPages,
];

export function getPageBySlug(slug: string, pageType?: PSEOPage["pageType"]): PSEOPage | undefined {
  return allPSEOPages.find(
    (p) => p.slug === slug && (pageType ? p.pageType === pageType : true)
  );
}


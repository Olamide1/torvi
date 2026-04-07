export interface RoleLandingPage {
  slug: string;
  roleLabel: string;
  quizRole: string;
  kitSlug: string;
  meta: {
    title: string;
    description: string;
  };
  headline: string;
  subheadline: string;
  painPoints: string[];
  toolExamples: { title: string; desc: string }[];
  outcome: string;
  ctaNote: string;
}

export const ROLE_LANDING_PAGES: RoleLandingPage[] = [
  {
    slug: "product-manager",
    roleLabel: "Product Manager",
    quizRole: "product_manager",
    kitSlug: "prompt-pack-product-manager",
    meta: {
      title: "Torvi for Product Managers — Ship Internal Tools Without Engineering",
      description:
        "A four-week guided build program for PMs who are tired of waiting on engineering. Build one internal tool. Ship it. Start immediately.",
    },
    headline: "Ship internal tools without waiting on engineering.",
    subheadline:
      "A four-week guided build program for PMs who have the ideas but not the dev resources.",
    painPoints: [
      "Your internal tool ideas have been in the backlog for quarters.",
      "You write the spec. Engineering builds something different. You start over.",
      "Your team is running ops on spreadsheets because the real tool never got prioritised.",
    ],
    toolExamples: [
      {
        title: "Project intake tool",
        desc: "Routes requests to the right owner automatically. No more intake meetings.",
      },
      {
        title: "Spec review dashboard",
        desc: "Tracks PRD status across the roadmap without chasing updates in Slack.",
      },
      {
        title: "Stakeholder portal",
        desc: "One place for status updates. No recurring update meeting required.",
      },
    ],
    outcome: "A working internal tool built by you. No engineering dependency.",
    ctaNote:
      "Four weeks. One tool. Office hours every week to unblock you.",
  },
  {
    slug: "ops-leader",
    roleLabel: "Ops Leader",
    quizRole: "ops_leader",
    kitSlug: "prompt-pack-ops-leader",
    meta: {
      title: "Torvi for Ops Leaders — Automate the Work Your Team Does Manually",
      description:
        "A four-week build program for ops leaders with a backlog of automation ideas and no dev resources. One shipped tool. Start immediately.",
    },
    headline: "Automate the ops work your team does manually every week.",
    subheadline:
      "A four-week build program for ops leaders who know exactly what needs to be built — and can't get anyone to build it.",
    painPoints: [
      "The same report gets rebuilt manually every Monday. Has been for two years.",
      "You have the data. Getting it into a useful format takes two hours every time.",
      "You've been meaning to automate the intake process since last quarter.",
    ],
    toolExamples: [
      {
        title: "Weekly ops report",
        desc: "Pulls from your sources and formats itself. No manual assembly.",
      },
      {
        title: "SLA monitor",
        desc: "Flags breaches before they become escalations. Runs without you.",
      },
      {
        title: "Intake workflow",
        desc: "Routes requests to the right place without the back-and-forth.",
      },
    ],
    outcome: "One automated tool that saves your team 3+ hours a week.",
    ctaNote:
      "Four weeks. One automation shipped. Office hours to unblock anything.",
  },
  {
    slug: "consultant",
    roleLabel: "Consultant",
    quizRole: "consultant",
    kitSlug: "prompt-pack-consultant",
    meta: {
      title: "Torvi for Consultants — Build Client Tools Faster Than Expected",
      description:
        "A four-week program for consultants who want to ship working tools, not slide decks. One reusable tool. Start immediately.",
    },
    headline: "Build the tools your clients actually want. Faster than expected.",
    subheadline:
      "A four-week build program for consultants who need to ship working tools — not more deliverables.",
    painPoints: [
      "Clients are asking for tools and dashboards, not PowerPoints.",
      "You rebuild the same deliverable framework from scratch every engagement.",
      "You can't justify the cost of a developer for every client tool you need.",
    ],
    toolExamples: [
      {
        title: "Client diagnostic tool",
        desc: "Surfaces findings from intake data automatically. Structures the output.",
      },
      {
        title: "Delivery tracker",
        desc: "Client-facing progress view without the weekly status email chain.",
      },
      {
        title: "Recommendation generator",
        desc: "Turns your structured inputs into a repeatable deliverable format.",
      },
    ],
    outcome: "A reusable tool you can white-label and deploy across engagements.",
    ctaNote:
      "Four weeks. One tool. Office hours to unblock you when you get stuck.",
  },
  {
    slug: "founder",
    roleLabel: "Founder",
    quizRole: "founder",
    kitSlug: "prompt-pack-founder",
    meta: {
      title: "Torvi for Founders — Build Internal Tools Without Your Engineering Team",
      description:
        "A four-week program for founders with internal tool problems they can't justify putting on the product roadmap. One shipped tool. Start immediately.",
    },
    headline: "Build internal tools yourself. Without touching your engineering team.",
    subheadline:
      "A four-week build program for founders who have internal problems that need tools, not tickets.",
    painPoints: [
      "Your engineers are heads-down on the product. The internal tools backlog keeps growing.",
      "You've been quoted €10k to build something that should take a few weeks.",
      "You're manually doing things that should have been automated months ago.",
    ],
    toolExamples: [
      {
        title: "Lead intake tool",
        desc: "Qualifies and routes inbound without manual triage. Runs every day.",
      },
      {
        title: "Ops dashboard",
        desc: "Real-time view of the metrics that matter. No engineer required.",
      },
      {
        title: "Internal workflow tool",
        desc: "Automates the repetitive process your team runs manually each week.",
      },
    ],
    outcome: "A working internal tool you built yourself. No sprint, no ticket, no dependency.",
    ctaNote:
      "Four weeks. One shipped tool. You own it and can modify it.",
  },
  {
    slug: "team-lead",
    roleLabel: "Team Lead",
    quizRole: "team_lead",
    kitSlug: "prompt-pack-team-lead",
    meta: {
      title: "Torvi for Team Leads — Build the Tool Your Team Needs",
      description:
        "A four-week program for team leads running operations on spreadsheets and workarounds. One shipped tool. Start immediately.",
    },
    headline: "Give your team the tool they need. Without adding it to the backlog.",
    subheadline:
      "A four-week build program for team leads running ops on spreadsheets that were never meant to scale.",
    painPoints: [
      "The tool your team needs isn't in the backlog. It won't be prioritised.",
      "You're the bottleneck — they come to you because the system doesn't exist.",
      "You're managing capacity in a spreadsheet that someone has to update manually every week.",
    ],
    toolExamples: [
      {
        title: "Capacity planner",
        desc: "Shows team load without the weekly check-in meeting.",
      },
      {
        title: "Handoff tool",
        desc: "Structured transitions that don't require a 30-minute walkthrough.",
      },
      {
        title: "Status dashboard",
        desc: "Current state of every active workstream at a glance.",
      },
    ],
    outcome: "A tool your team uses every day instead of pinging you.",
    ctaNote:
      "Four weeks. One tool. Office hours to unblock anything in the build.",
  },
];

export function getRolePage(slug: string): RoleLandingPage | undefined {
  return ROLE_LANDING_PAGES.find((r) => r.slug === slug);
}

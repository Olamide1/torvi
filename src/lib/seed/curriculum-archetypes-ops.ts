/**
 * Archetype-level curriculum — Ops / Workflow track.
 * Intake workflow · Reporting helper · Task routing tool
 */

import type { ArchetypeGuideData } from "./curriculum-archetypes-pm";

const INTAKE_WORKFLOW: ArchetypeGuideData[] = [
  {
    title: "Define your intake workflow",
    slug: "ops-intake-week-0-define",
    weekId: 0,
    trackSlug: "ops-workflow",
    archetypeSlug: "intake-workflow",
    purpose: "Scope exactly which requests you're triaging and what a categorised, prioritised output looks like.",
    estimatedTimeMinutes: 60,
    expectedOutput: "A brief scoped to one intake source (email, form, or ticket system) and one set of categories/priority levels.",
    guideType: "setup",
    difficulty: "beginner",
    isRequired: true,
    retrievalTags: ["intake-workflow", "week-0", "ops", "define"],
    commonMistakes: [
      "Scoping 'all requests' instead of one intake source — email, a form, or a ticket queue.",
      "Not writing down your actual categories — the tool can't apply categories that only exist in your head.",
      "Trying to fully automate routing decisions before you've validated the categories are even right.",
    ],
    doneChecklist: [
      "One intake source is named (email, form, or ticket system)",
      "Your categories are written down as a specific, finite list (not 'etc.')",
      "Priority levels are defined with a rule, not a feeling — e.g. 'urgent = client-facing + no response in 24h'",
      "Done criteria is measurable — e.g. 'cuts daily triage from 90 to 20 minutes'",
    ],
    contentBody: `## Pick your intake source and categories

Name the one source — a shared inbox, a form, or a ticket queue. Then write your actual category list: the 4–6 buckets requests really fall into. If you can't name them without thinking hard, sit with your last week of real requests and write down what categories they'd need.

## Define priority with a rule

"Urgent" needs a checkable definition: client-facing and no response in 24 hours, or blocking another team, or from a named VIP list. Write the actual rule.

## Your brief, specific to this archetype

Problem: "Triaging [email/form/ticket] requests takes me [X minutes] every [day/week]."
Input: raw requests from [your source], typically [N] per day.
Output: each request categorised, prioritised, and routed with a stated reason.
Done criteria: cuts triage time by half and colleagues trust the categorisation without double-checking.`,
    steps: [
      {
        order: 1,
        instruction: "Name your intake source and write your actual category list — 4–6 specific buckets, based on your last week of real requests.",
        expectedAction: "Identify the source and write real categories",
        expectedResult: "A finite, specific category list grounded in real recent requests.",
        commonErrorNote: "If your list ends in 'etc.', it's not specific enough yet.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction: "Write your priority rule in checkable terms — what specifically makes something urgent vs. normal vs. low.",
        expectedAction: "Define priority rules precisely",
        expectedResult: "A written rule someone else could apply and get the same answer.",
        commonErrorNote: "",
        aiHintRef: "Ask Claude: 'Is this priority rule specific enough for a tool to apply consistently?'",
        completionRule: "manual",
      },
      {
        order: 3,
        instruction: "Gather 10–15 real requests from the last week as your test set for week 1.",
        expectedAction: "Collect real recent requests",
        expectedResult: "A real, representative batch to test against.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 4,
        instruction: "Finalise your brief and post it in the cohort Slack.",
        expectedAction: "Finalise and share the brief",
        expectedResult: "Brief posted, visible to the cohort.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
    ],
  },
  {
    title: "Build your intake workflow",
    slug: "ops-intake-week-1-build",
    weekId: 1,
    trackSlug: "ops-workflow",
    archetypeSlug: "intake-workflow",
    purpose: "Get a working triage tool running on your real batch of requests.",
    estimatedTimeMinutes: 180,
    expectedOutput: "A tool that categorises and prioritises real requests according to your written rules.",
    guideType: "build",
    difficulty: "intermediate",
    isRequired: true,
    retrievalTags: ["intake-workflow", "week-1", "ops", "build"],
    commonMistakes: [
      "Letting the tool invent a category for ambiguous requests instead of flagging them for a human.",
      "Only testing with well-formed requests when your real intake includes vague, half-written ones.",
      "Hard-coding routing to specific people's names instead of roles, which breaks the moment someone changes teams.",
    ],
    doneChecklist: [
      "The tool categorises and prioritises real requests according to your written rules",
      "Ambiguous requests are flagged for human review, not guessed",
      "You've tested on your messiest real requests — vague, incomplete, off-topic",
      "You know the top 2 things it still gets wrong",
    ],
    contentBody: `## The system prompt

> You are an intake triage assistant. You receive raw [email/form/ticket] requests and assign each one a category from this exact list: [your categories], and a priority using this exact rule: [your priority rule].
>
> If a request doesn't clearly fit a category or the priority rule is ambiguous, flag it as "needs human review" with the reason — do not guess.
>
> Format: request summary, category, priority, one-line reason.

## Building it

In Cursor: "Build a script that takes a batch of raw requests, applies this triage prompt via Claude API, and prints a categorised, prioritised list." Test on your real batch.

## Test the vague case

Real intake includes half-written requests, ones missing key context, or ones that are genuinely ambiguous. Test on these specifically — a tool that confidently mis-categorises a vague request is worse than one that flags it for review.`,
    steps: [
      {
        order: 1,
        instruction: "Write and test your triage prompt in Claude chat against 5–10 real requests, checking it applies your categories and priority rule correctly.",
        expectedAction: "Write and test the triage prompt",
        expectedResult: "Correct categorisation and priority on at least 8 of 10 real requests.",
        commonErrorNote: "If it's inconsistent, your category definitions may still be too loose — tighten them.",
        aiHintRef: "Ask Claude: 'Which of these categorisations look wrong or inconsistent with my rules?'",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction: "Ask Cursor to build a script that runs the prompt against a batch file and prints the triaged list.",
        expectedAction: "Build the script",
        expectedResult: "A runnable script producing a triaged list from real requests.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 3,
        instruction: "Test on your vaguest, most ambiguous real requests specifically. Confirm they get flagged for review, not guessed.",
        expectedAction: "Test on ambiguous real requests",
        expectedResult: "Ambiguous requests are flagged, not confidently mis-triaged.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 4,
        instruction: "Fix the top problem, then record a 2-minute demo and post it to the cohort Slack.",
        expectedAction: "Fix the top issue and share a demo",
        expectedResult: "The cohort has seen it working on real requests.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
    ],
  },
  {
    title: "Make your intake workflow usable",
    slug: "ops-intake-week-2-usable",
    weekId: 2,
    trackSlug: "ops-workflow",
    archetypeSlug: "intake-workflow",
    purpose: "Get a colleague triaging their own inbox or queue with this tool, without your help.",
    estimatedTimeMinutes: 150,
    expectedOutput: "A colleague ran it on their own real intake and trusted the output enough to act on it.",
    guideType: "build",
    difficulty: "intermediate",
    isRequired: true,
    retrievalTags: ["intake-workflow", "week-2", "ops", "usable"],
    commonMistakes: [
      "Not documenting exactly how to export or paste in requests from your specific system.",
      "Only testing with a light day's volume — a heavy day is where triage tools actually earn their keep.",
    ],
    doneChecklist: [
      "A colleague ran it on their own real intake with no help",
      "Instructions specify exactly how to get requests into the tool",
      "It's been tested on both a light day and a heavy day of volume",
      "The colleague acted on the output rather than re-triaging manually",
    ],
    contentBody: `## Test on a heavy day

A light day's volume rarely reveals real problems. Run it against your busiest recent day — that's when a triage tool either earns trust or loses it.

## Document the exact export step

Whether requests come from an inbox, a form export, or a ticket queue, document the exact copy/export step. This is usually the actual friction point, not the triage logic itself.

## What "usable" means here

The colleague acts directly on the tool's categorisation and priority — they don't quietly re-triage everything themselves afterward.`,
    steps: [
      {
        order: 1,
        instruction: "Document the exact steps to get requests into your tool from your intake source.",
        expectedAction: "Write intake/export instructions",
        expectedResult: "Clear, specific steps someone unfamiliar with the source could follow.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction: "Have a colleague run the tool on their own real intake, ideally on a heavy-volume day, with no help.",
        expectedAction: "Run an unassisted usability test on real volume",
        expectedResult: "At least one concrete friction point or trust issue identified.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 3,
        instruction: "Confirm whether they acted directly on the output or re-checked everything manually. If the latter, find out why.",
        expectedAction: "Check whether the output was trusted enough to act on",
        expectedResult: "A clear answer on trust, with the specific reason if it fell short.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 4,
        instruction: "Fix the top issue, record a Loom, and post it in the cohort Slack.",
        expectedAction: "Fix the issue and share a demo",
        expectedResult: "Cohort can access and understand the tool from the post.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
    ],
  },
  {
    title: "Get feedback on your intake workflow",
    slug: "ops-intake-week-3-review",
    weekId: 3,
    trackSlug: "ops-workflow",
    archetypeSlug: "intake-workflow",
    purpose: "Validate the categorisation and priority calls with the people who'll actually act on them.",
    estimatedTimeMinutes: 90,
    expectedOutput: "Two ops colleagues reviewed real triage output and you've fixed the top disagreement.",
    guideType: "review",
    difficulty: "intermediate",
    isRequired: true,
    retrievalTags: ["intake-workflow", "week-3", "ops", "feedback"],
    commonMistakes: [
      "Only reviewing categorisation, not priority — a right category with the wrong priority is still a real failure.",
      "Not asking about missed urgent items — a false negative on urgency is the costliest failure mode.",
    ],
    doneChecklist: [
      "Two ops colleagues reviewed real triage output against real requests",
      "You specifically checked for missed urgent items, not just miscategorisation",
      "You fixed the top disagreement found",
    ],
    contentBody: `## Check for missed urgency specifically

The costliest failure for an intake tool isn't a wrong category — it's an urgent request quietly marked normal. Ask reviewers directly: "Did anything here get under-prioritised that should have been urgent?"

## What to fix

Prioritise fixing missed-urgency cases over category refinements — that's the failure mode with the highest real cost.`,
    steps: [
      {
        order: 1,
        instruction: "Show two ops colleagues the triage output against the original requests. Ask specifically about missed urgency.",
        expectedAction: "Run two reviews focused on missed urgency",
        expectedResult: "Documented feedback on category and priority accuracy, especially missed urgent items.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction: "Fix the top disagreement, prioritising any missed-urgency case over a category-naming issue.",
        expectedAction: "Fix the top issue",
        expectedResult: "The issue is resolved and rechecked.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 3,
        instruction: "Attend or watch the peer review workshop and review two other cohort members' tools.",
        expectedAction: "Participate in peer review",
        expectedResult: "You've reviewed two other tools.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
    ],
  },
  {
    title: "Ship your intake workflow",
    slug: "ops-intake-week-4-ship",
    weekId: 4,
    trackSlug: "ops-workflow",
    archetypeSlug: "intake-workflow",
    purpose: "Put your intake tool where it runs as part of your team's actual daily rhythm.",
    estimatedTimeMinutes: 90,
    expectedOutput: "Shipped tool + handoff doc with a real batch example + Loom demo.",
    guideType: "submit",
    difficulty: "intermediate",
    isRequired: true,
    retrievalTags: ["intake-workflow", "week-4", "ops", "ship"],
    commonMistakes: [
      "Not documenting the exact source and export steps in the handoff doc.",
      "Not stating what the tool does with ambiguous requests — the next user needs to know it flags rather than guesses.",
    ],
    doneChecklist: [
      "Tool runs as part of your team's actual daily or morning triage rhythm",
      "Handoff doc includes a real batch example, the categories, and priority rule",
      "The doc states clearly that ambiguous requests are flagged, not guessed",
      "Loom demo recorded and posted in #ships; certification submitted",
    ],
    contentBody: `## Where this lives

Ideally this runs at the start of your actual daily or morning triage routine — a script you run first thing, or a Notion page you paste into before opening the queue.

## The handoff doc

State the exact intake source, your category list, your priority rule, and confirm ambiguous requests get flagged rather than guessed.

Submit for certification once the demo and handoff doc are ready.`,
    steps: [
      {
        order: 1,
        instruction: "Set the tool up as part of your actual daily triage routine — first thing you run before touching the queue.",
        expectedAction: "Integrate the tool into your daily rhythm",
        expectedResult: "It's part of how triage actually starts each day.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction: "Write the handoff doc with the intake source, categories, priority rule, and a real before/after example.",
        expectedAction: "Write the handoff doc",
        expectedResult: "A one-page doc a new team member could follow.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 3,
        instruction: "Record a 5-minute Loom, post in #ships, and submit for certification in the hub.",
        expectedAction: "Record demo, ship, and submit",
        expectedResult: "Tool shipped and certification submitted.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
    ],
  },
];

const REPORTING_HELPER: ArchetypeGuideData[] = [
  {
    title: "Define your reporting helper",
    slug: "ops-reporting-week-0-define",
    weekId: 0,
    trackSlug: "ops-workflow",
    archetypeSlug: "reporting-helper",
    purpose: "Scope exactly which report you're automating and from which data sources.",
    estimatedTimeMinutes: 60,
    expectedOutput: "A brief scoped to one recurring report, naming its data sources and required sections.",
    guideType: "setup",
    difficulty: "beginner",
    isRequired: true,
    retrievalTags: ["reporting-helper", "week-0", "ops", "define"],
    commonMistakes: [
      "Scoping 'all reporting' instead of one recurring report you actually produce weekly.",
      "Not naming the specific data sources — 'various systems' isn't buildable.",
      "Trying to automate the analysis and the writing in week 1 — start with formatting known data correctly.",
    ],
    doneChecklist: [
      "One recurring report is named, with its actual frequency (weekly, daily, etc.)",
      "Data sources are named specifically (which spreadsheet, which system, how many)",
      "Required sections of the report are listed in order",
      "Done criteria is measurable — e.g. 'cuts report time from 90 to 20 minutes'",
    ],
    contentBody: `## Pick your report and sources

Name the one report — the Friday ops update, the weekly status email, whatever you actually produce on a schedule. List every data source it pulls from and roughly how much manual reformatting each one needs.

## List the required sections in order

Write the actual structure: summary line, metrics table, blockers, next week's focus — whatever your report actually contains, in the order it appears.

## Your brief, specific to this archetype

Problem: "Producing the [report name] takes me [X minutes/hours] every [frequency], pulling from [N sources]."
Input: exports/data from [named sources].
Output: the formatted report, ready to send, in [N] sections.
Done criteria: cuts prep time by at least half with no loss of accuracy.`,
    steps: [
      {
        order: 1,
        instruction: "Name your recurring report, its frequency, and every data source it pulls from.",
        expectedAction: "Identify the report and its data sources",
        expectedResult: "A specific report name with a full list of real sources.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction: "Write out the report's required sections in the exact order they currently appear.",
        expectedAction: "List the report structure",
        expectedResult: "An ordered list of sections matching your real report.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 3,
        instruction: "Gather last week's raw data from each source as your test set.",
        expectedAction: "Collect real raw data",
        expectedResult: "Real exports/data ready for week 1 testing.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 4,
        instruction: "Finalise your brief and post it in the cohort Slack.",
        expectedAction: "Finalise and share the brief",
        expectedResult: "Brief posted, visible to the cohort.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
    ],
  },
  {
    title: "Build your reporting helper",
    slug: "ops-reporting-week-1-build",
    weekId: 1,
    trackSlug: "ops-workflow",
    archetypeSlug: "reporting-helper",
    purpose: "Get a working tool that turns raw source data into your formatted report.",
    estimatedTimeMinutes: 180,
    expectedOutput: "A tool that produces your report structure from real data, with known accuracy gaps.",
    guideType: "build",
    difficulty: "intermediate",
    isRequired: true,
    retrievalTags: ["reporting-helper", "week-1", "ops", "build"],
    commonMistakes: [
      "Letting the tool round or estimate numbers instead of using exact source figures.",
      "Not handling a source that's missing data for the week — a common real case.",
      "Writing a prompt for one data format when your sources actually vary week to week.",
    ],
    doneChecklist: [
      "The tool produces your report structure from real source data",
      "All numbers in the output match the source exactly — no rounding or invention",
      "You've tested it on a week where one source had missing or incomplete data",
      "You know the top 2 things it still gets wrong",
    ],
    contentBody: `## The system prompt

> You are a reporting assistant for Ops. You receive raw data from [named sources] and produce a report with these sections, in order: [your sections].
>
> Use exact figures from the source — never round, estimate, or invent a number. If a source is missing data for this period, state "data unavailable" in that section rather than guessing.
>
> Tone: direct, factual, no filler language.

## Building it

In Cursor: "Build a script that takes these data exports, applies this reporting prompt via Claude API, and prints the formatted report." Test on last week's real data.

## Test the incomplete-data case

Real reporting weeks sometimes have a missing source or partial data. Test that specific case — the tool should say so clearly, not silently omit a section or invent a placeholder number.`,
    steps: [
      {
        order: 1,
        instruction: "Write and test your reporting prompt in Claude chat against last week's real data, checking every number matches the source exactly.",
        expectedAction: "Write and test the reporting prompt",
        expectedResult: "A report where every figure is verified accurate against the source.",
        commonErrorNote: "If any number is rounded or slightly off, add 'use exact source figures, never round' explicitly to the prompt.",
        aiHintRef: "Ask Claude: 'Check every number in this report against the raw data — are any rounded, estimated, or wrong?'",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction: "Ask Cursor to build a script that runs the prompt against your data exports and prints the formatted report.",
        expectedAction: "Build the script",
        expectedResult: "A runnable script producing the report from real data.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 3,
        instruction: "Test with one source's data deliberately removed or incomplete. Confirm it flags the gap rather than guessing.",
        expectedAction: "Test the incomplete-data case",
        expectedResult: "Missing data is flagged clearly, not silently filled in.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 4,
        instruction: "Fix the top problem, then record a 2-minute demo and post it to the cohort Slack.",
        expectedAction: "Fix the top issue and share a demo",
        expectedResult: "The cohort has seen it working on real data.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
    ],
  },
  {
    title: "Make your reporting helper usable",
    slug: "ops-reporting-week-2-usable",
    weekId: 2,
    trackSlug: "ops-workflow",
    archetypeSlug: "reporting-helper",
    purpose: "Get a colleague producing this report themselves without your help.",
    estimatedTimeMinutes: 150,
    expectedOutput: "A colleague ran it independently and produced a report ready to send.",
    guideType: "build",
    difficulty: "intermediate",
    isRequired: true,
    retrievalTags: ["reporting-helper", "week-2", "ops", "usable"],
    commonMistakes: [
      "Not documenting exactly which files to pull from which sources, in what format.",
      "Not testing whether the colleague would send the output as-is, or feels the need to rewrite it.",
    ],
    doneChecklist: [
      "A colleague ran it on real current data with no help",
      "Instructions specify exactly which files/exports to gather and from where",
      "It handles this week's real data, not just last week's test set",
      "The colleague would send the output with little to no editing",
    ],
    contentBody: `## Document the exact gathering steps

For a reporting tool, the real friction is usually gathering the right files from the right places, not running the tool. Write exact steps: which system, which export button, what file format.

## Test with this week's live data

Last week's test set proved the concept. This week's live data proves it actually works going forward — sources drift, formats change slightly, numbers are different.

## What "usable" means here

The colleague would send the generated report with little to no rewriting — not use it as a rough draft they still have to significantly edit.`,
    steps: [
      {
        order: 1,
        instruction: "Document the exact steps to gather this week's data from each source.",
        expectedAction: "Write data-gathering instructions",
        expectedResult: "Clear, specific steps for pulling current data.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction: "Have a colleague run the tool on this week's real, live data with no help.",
        expectedAction: "Run an unassisted usability test with live data",
        expectedResult: "A real report produced from current data.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 3,
        instruction: "Ask if they'd send this report as-is, or what they'd need to edit first.",
        expectedAction: "Check readiness to send",
        expectedResult: "A clear picture of how close the output is to send-ready.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 4,
        instruction: "Fix the top issue, record a Loom, and post it in the cohort Slack.",
        expectedAction: "Fix the issue and share a demo",
        expectedResult: "Cohort can access and understand the tool from the post.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
    ],
  },
  {
    title: "Get feedback on your reporting helper",
    slug: "ops-reporting-week-3-review",
    weekId: 3,
    trackSlug: "ops-workflow",
    archetypeSlug: "reporting-helper",
    purpose: "Validate the report with the people who actually read it before you rely on it.",
    estimatedTimeMinutes: 90,
    expectedOutput: "Two people who receive this report reviewed real output and you've fixed the top issue.",
    guideType: "review",
    difficulty: "intermediate",
    isRequired: true,
    retrievalTags: ["reporting-helper", "week-3", "ops", "feedback"],
    commonMistakes: [
      "Only asking whether it 'looks right' instead of checking every number against source data.",
      "Not asking the actual report recipients, only your own team.",
    ],
    doneChecklist: [
      "Two people who actually read this report reviewed real output",
      "Every number was checked against the source data during review",
      "You fixed the top accuracy or formatting issue found",
    ],
    contentBody: `## Ask the actual recipients

The people who read this report weekly — a manager, a stakeholder — are the real test of whether it's ready. Ask: "Is this the report you'd expect to receive? Is anything wrong or missing?"

## Number-check every figure

Have at least one reviewer cross-check every number against the source. Reporting tools fail silently on accuracy far more often than on formatting.`,
    steps: [
      {
        order: 1,
        instruction: "Show two actual recipients of this report a real generated version. Have them cross-check every number against the source.",
        expectedAction: "Run two reviews with real recipients, checking every number",
        expectedResult: "Documented accuracy check and formatting feedback.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction: "Fix the top accuracy or formatting issue raised.",
        expectedAction: "Fix the top issue",
        expectedResult: "The issue is resolved and rechecked.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 3,
        instruction: "Attend or watch the peer review workshop and review two other cohort members' tools.",
        expectedAction: "Participate in peer review",
        expectedResult: "You've reviewed two other tools.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
    ],
  },
  {
    title: "Ship your reporting helper",
    slug: "ops-reporting-week-4-ship",
    weekId: 4,
    trackSlug: "ops-workflow",
    archetypeSlug: "reporting-helper",
    purpose: "Put your reporting tool where it runs as part of your actual weekly reporting rhythm.",
    estimatedTimeMinutes: 90,
    expectedOutput: "Shipped tool + handoff doc with a real data example + Loom demo.",
    guideType: "submit",
    difficulty: "intermediate",
    isRequired: true,
    retrievalTags: ["reporting-helper", "week-4", "ops", "ship"],
    commonMistakes: [
      "Not documenting the exact sources and export steps in the handoff doc.",
      "Not stating what happens when a source is missing data for that period.",
    ],
    doneChecklist: [
      "Tool runs as part of your actual weekly (or recurring) reporting rhythm",
      "Handoff doc includes a real data example, the sources, and the output produced",
      "The doc states what happens when a source is missing data",
      "Loom demo recorded and posted in #ships; certification submitted",
    ],
    contentBody: `## Where this lives

Link it from wherever the report actually gets sent from — a shared drive, a recurring calendar reminder, a Notion page you open every reporting day.

## The handoff doc

State every data source, the export steps, and what happens when one is missing data. Include a real before/after example.

Submit for certification once the demo and handoff doc are ready.`,
    steps: [
      {
        order: 1,
        instruction: "Set the tool up as part of your actual reporting day rhythm — linked from wherever the report gets sent.",
        expectedAction: "Integrate the tool into your reporting rhythm",
        expectedResult: "It's part of how the report actually gets produced each cycle.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction: "Write the handoff doc with data sources, export steps, missing-data behaviour, and a real before/after example.",
        expectedAction: "Write the handoff doc",
        expectedResult: "A one-page doc a new team member could follow.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 3,
        instruction: "Record a 5-minute Loom, post in #ships, and submit for certification in the hub.",
        expectedAction: "Record demo, ship, and submit",
        expectedResult: "Tool shipped and certification submitted.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
    ],
  },
];

const TASK_ROUTING_TOOL: ArchetypeGuideData[] = [
  {
    title: "Define your task routing tool",
    slug: "ops-routing-week-0-define",
    weekId: 0,
    trackSlug: "ops-workflow",
    archetypeSlug: "task-routing-tool",
    purpose: "Write down your actual routing rules before building anything — the tool can only apply what you've made explicit.",
    estimatedTimeMinutes: 60,
    expectedOutput: "A brief with your explicit routing rules and the roles/people they route to.",
    guideType: "setup",
    difficulty: "beginner",
    isRequired: true,
    retrievalTags: ["task-routing-tool", "week-0", "ops", "define"],
    commonMistakes: [
      "Assuming your routing logic is obvious — write it down explicitly, including the exceptions you handle by instinct.",
      "Routing to named individuals instead of roles, which breaks the first time someone's out or changes teams.",
      "Not deciding what happens when a task doesn't clearly match any rule.",
    ],
    doneChecklist: [
      "Your routing rules are written down explicitly, including common exceptions",
      "Routing targets are roles or teams, not named individuals",
      "You've defined what happens when nothing matches — flag for manual routing, don't guess",
      "Done criteria is measurable — e.g. 'cuts routing decisions from 5 minutes to instant for 80% of tasks'",
    ],
    contentBody: `## Write down your actual rules

You route tasks by instinct today. Write the instinct down: "Anything mentioning [X] goes to [role]. Anything over [Y] priority escalates to [role]. Anything from [source] always goes to [role]." Include the exceptions — the cases where you deviate from the obvious rule and why.

## Route to roles, not people

"Sarah" leaves the team eventually. "On-call ops lead" doesn't. Define your routing targets as roles from the start.

## Your brief, specific to this archetype

Problem: "Deciding who a task goes to takes me [X minutes] and depends on rules only I know."
Input: a task/ticket description.
Output: a routing decision (role/team) with a one-line reason, or a flag for manual routing if nothing matches.
Done criteria: correctly routes at least 80% of tasks without human intervention.`,
    steps: [
      {
        order: 1,
        instruction: "Write your actual routing rules as if explaining them to a new hire — include the exceptions you apply without thinking.",
        expectedAction: "Document your real routing logic explicitly",
        expectedResult: "A written rule set covering your common cases and known exceptions.",
        commonErrorNote: "If you can't articulate why you routed something a certain way last week, go find that example and work out the rule.",
        aiHintRef: "Ask Claude: 'Here are my routing rules — what cases do they not cover?'",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction: "Convert any person-based routing targets into role-based ones.",
        expectedAction: "Rewrite routing targets as roles",
        expectedResult: "All routing targets are roles or teams, not individual names.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 3,
        instruction: "Gather 10–15 real recent tasks/tickets, including a few that don't cleanly fit your rules, as your week 1 test set.",
        expectedAction: "Collect real tasks including edge cases",
        expectedResult: "A representative batch including ambiguous cases.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 4,
        instruction: "Finalise your brief and post it in the cohort Slack.",
        expectedAction: "Finalise and share the brief",
        expectedResult: "Brief posted, visible to the cohort.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
    ],
  },
  {
    title: "Build your task routing tool",
    slug: "ops-routing-week-1-build",
    weekId: 1,
    trackSlug: "ops-workflow",
    archetypeSlug: "task-routing-tool",
    purpose: "Get a working tool that applies your written routing rules to real tasks.",
    estimatedTimeMinutes: 180,
    expectedOutput: "A tool that routes real tasks according to your rules and flags what doesn't fit.",
    guideType: "build",
    difficulty: "intermediate",
    isRequired: true,
    retrievalTags: ["task-routing-tool", "week-1", "ops", "build"],
    commonMistakes: [
      "Letting the tool guess a routing decision when nothing matches, instead of flagging for manual routing.",
      "Not testing tasks that fit multiple rules at once — a real and common case.",
      "Hard-coding role names in a way that's painful to update later.",
    ],
    doneChecklist: [
      "The tool routes real tasks correctly according to your written rules",
      "Tasks that don't clearly fit are flagged for manual routing, not guessed",
      "You've tested tasks that could plausibly match more than one rule",
      "You know the top 2 things it still gets wrong",
    ],
    contentBody: `## The system prompt

> You are a task routing assistant. You receive a task/ticket description and apply these routing rules exactly: [your rules]. Route to: [your roles/teams].
>
> If a task matches more than one rule, apply [your tiebreak logic — e.g. the more specific rule wins]. If nothing matches clearly, respond "needs manual routing" with the reason — never guess.
>
> Format: task summary, routed-to role, one-line reason, or manual-routing flag.

## Building it

In Cursor: "Build a script that takes a task description, applies this routing prompt via Claude API, and prints the routing decision." Test on your real batch.

## Test the multi-match case

A task that could plausibly go to two different roles is a real, common case — not an edge case. Make sure your tiebreak logic is actually applied, not randomly resolved.`,
    steps: [
      {
        order: 1,
        instruction: "Write and test your routing prompt in Claude chat against your real batch, including tasks that could match multiple rules.",
        expectedAction: "Write and test the routing prompt",
        expectedResult: "Correct routing on at least 8 of 10 real tasks, with multi-match cases handled by your tiebreak rule.",
        commonErrorNote: "If multi-match cases resolve inconsistently, your tiebreak logic needs to be explicit in the prompt.",
        aiHintRef: "Ask Claude: 'Which of these routing decisions look wrong given my rules?'",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction: "Ask Cursor to build a script that runs the prompt against a task file and prints the routing decision.",
        expectedAction: "Build the script",
        expectedResult: "A runnable script producing routing decisions from real tasks.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 3,
        instruction: "Test with a task that doesn't fit any rule cleanly. Confirm it flags for manual routing rather than guessing.",
        expectedAction: "Test the no-match case",
        expectedResult: "Non-matching tasks are flagged, not silently mis-routed.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 4,
        instruction: "Fix the top problem, then record a 2-minute demo and post it to the cohort Slack.",
        expectedAction: "Fix the top issue and share a demo",
        expectedResult: "The cohort has seen it working on real tasks.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
    ],
  },
  {
    title: "Make your task routing tool usable",
    slug: "ops-routing-week-2-usable",
    weekId: 2,
    trackSlug: "ops-workflow",
    archetypeSlug: "task-routing-tool",
    purpose: "Get a colleague routing their own tasks with this tool, without your help.",
    estimatedTimeMinutes: 150,
    expectedOutput: "A colleague ran it on their own real tasks and trusted the routing decisions.",
    guideType: "build",
    difficulty: "intermediate",
    isRequired: true,
    retrievalTags: ["task-routing-tool", "week-2", "ops", "usable"],
    commonMistakes: [
      "Not explaining the routing rules to the tester upfront — they can't judge correctness without knowing the logic.",
      "Only testing typical tasks, not the volume of manual-routing flags it produces.",
    ],
    doneChecklist: [
      "A colleague ran it on their own real tasks with no help",
      "They understood and agreed with the routing rules before testing",
      "The rate of 'needs manual routing' flags is reasonable, not so high it defeats the purpose",
      "The colleague acted on the routing decision rather than double-checking it",
    ],
    contentBody: `## Show them the rules first

A tester can't judge whether a routing decision is correct without knowing the rules you built it on. Walk them through the rules before they test, then let them run it independently.

## Watch the manual-routing flag rate

If more than a fifth of tasks get flagged for manual routing, your rules may be too narrow — that defeats the point of automating this. Note the rate and revisit gaps in the rules if it's high.

## What "usable" means here

The colleague acts on the routing decision directly — they don't quietly second-guess and re-route everything themselves.`,
    steps: [
      {
        order: 1,
        instruction: "Walk a colleague through your routing rules, then have them run the tool on their own real tasks with no further help.",
        expectedAction: "Run an unassisted usability test after explaining the rules",
        expectedResult: "Real routing decisions on their own tasks, with feedback on trust and accuracy.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction: "Check the rate of tasks flagged for manual routing. If it's high, identify which rule gaps are causing it.",
        expectedAction: "Measure and diagnose the manual-routing flag rate",
        expectedResult: "A known flag rate and, if high, the specific rule gap causing it.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 3,
        instruction: "Fix the top issue, record a Loom, and post it in the cohort Slack.",
        expectedAction: "Fix the issue and share a demo",
        expectedResult: "Cohort can access and understand the tool from the post.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
    ],
  },
  {
    title: "Get feedback on your task routing tool",
    slug: "ops-routing-week-3-review",
    weekId: 3,
    trackSlug: "ops-workflow",
    archetypeSlug: "task-routing-tool",
    purpose: "Validate routing accuracy with the people who receive routed tasks, not just the person routing them.",
    estimatedTimeMinutes: 90,
    expectedOutput: "Two people — a router and a receiver — reviewed real routing decisions and you've fixed the top issue.",
    guideType: "review",
    difficulty: "intermediate",
    isRequired: true,
    retrievalTags: ["task-routing-tool", "week-3", "ops", "feedback"],
    commonMistakes: [
      "Only asking the person routing, not the person receiving — a receiver knows if tasks land on the wrong desk.",
      "Not tracking how often the manual-routing flag fires, which is itself a feedback signal.",
    ],
    doneChecklist: [
      "A router and a receiver of routed tasks both reviewed real output",
      "You checked whether tasks landed on the right desk from the receiver's perspective",
      "You fixed the top routing issue found",
    ],
    contentBody: `## Ask the receiver, not just the router

The person routing tasks may not notice a subtly wrong routing decision — the receiver will, because it's now sitting in the wrong queue. Get feedback from both sides.

## Treat the manual-routing rate as a signal

If reviewers say the flag rate feels high, that's real feedback on rule coverage, not a bug — go back and add the missing rule.`,
    steps: [
      {
        order: 1,
        instruction: "Show a router and a receiver of routed tasks the real routing output. Ask both whether tasks landed correctly.",
        expectedAction: "Run reviews with both a router and a receiver",
        expectedResult: "Documented feedback from both perspectives.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction: "Fix the top routing issue raised, or add a missing rule if the manual-routing rate was flagged as too high.",
        expectedAction: "Fix the top issue",
        expectedResult: "The issue is resolved and rechecked.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 3,
        instruction: "Attend or watch the peer review workshop and review two other cohort members' tools.",
        expectedAction: "Participate in peer review",
        expectedResult: "You've reviewed two other tools.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
    ],
  },
  {
    title: "Ship your task routing tool",
    slug: "ops-routing-week-4-ship",
    weekId: 4,
    trackSlug: "ops-workflow",
    archetypeSlug: "task-routing-tool",
    purpose: "Put your routing tool where tasks actually flow through your team's system.",
    estimatedTimeMinutes: 90,
    expectedOutput: "Shipped tool + handoff doc with a real task example + Loom demo.",
    guideType: "submit",
    difficulty: "intermediate",
    isRequired: true,
    retrievalTags: ["task-routing-tool", "week-4", "ops", "ship"],
    commonMistakes: [
      "Not writing the routing rules into the handoff doc — the next person needs to be able to update them.",
      "Not stating the manual-routing flag rate so the next owner knows what's normal.",
    ],
    doneChecklist: [
      "Tool is wired into where tasks actually enter your team's workflow",
      "Handoff doc includes the routing rules, a real example, and the expected manual-routing flag rate",
      "Loom demo recorded and posted in #ships; certification submitted",
    ],
    contentBody: `## Where this lives

Ideally this runs at the point tasks first enter your system — linked from your ticket queue or intake doc, not a separate step people forget to use.

## The handoff doc

Write out the full routing rules (so the next owner can update them), a real before/after example, and the expected manual-routing flag rate.

Submit for certification once the demo and handoff doc are ready.`,
    steps: [
      {
        order: 1,
        instruction: "Wire the tool into the point where tasks actually enter your workflow.",
        expectedAction: "Integrate the tool at the point of task entry",
        expectedResult: "Tasks get routed as part of how they normally flow in.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction: "Write the handoff doc with full routing rules, a real example, and the expected manual-routing rate.",
        expectedAction: "Write the handoff doc",
        expectedResult: "A one-page doc a new team member could follow and update.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 3,
        instruction: "Record a 5-minute Loom, post in #ships, and submit for certification in the hub.",
        expectedAction: "Record demo, ship, and submit",
        expectedResult: "Tool shipped and certification submitted.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
    ],
  },
];

export const OPS_ARCHETYPE_CURRICULUM = [
  ...INTAKE_WORKFLOW,
  ...REPORTING_HELPER,
  ...TASK_ROUTING_TOOL,
];

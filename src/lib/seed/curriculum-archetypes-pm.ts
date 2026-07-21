/**
 * Archetype-level curriculum — Product / PM track.
 * Research helper · Roadmap / Review tool · Meeting / Planning tool
 *
 * These sit one level below the track guides (src/lib/seed/curriculum.ts):
 * the track guide teaches the process and why it matters, these guides give
 * concrete specifics for exactly this tool shape. Shown once a learner picks
 * their archetype; the track-level guide remains the fallback until they do.
 */

import type { GuideData } from "./curriculum";

export interface ArchetypeGuideData extends GuideData {
  archetypeSlug: string;
}

const RESEARCH_HELPER: ArchetypeGuideData[] = [
  {
    title: "Define your research helper",
    slug: "pm-research-helper-week-0-define",
    weekId: 0,
    trackSlug: "product-pm",
    archetypeSlug: "research-helper",
    purpose: "Scope exactly what your research synthesis tool will take in and produce.",
    estimatedTimeMinutes: 60,
    expectedOutput: "A brief scoped to one input type (transcripts, tickets, or survey responses) and one output shape (a themed doc with quotes).",
    guideType: "setup",
    difficulty: "beginner",
    isRequired: true,
    retrievalTags: ["research-helper", "week-0", "pm", "define"],
    commonMistakes: [
      "Trying to handle transcripts, surveys, and support tickets all at once — pick one input type for the four weeks.",
      "Scoping for 'insights' in general instead of the specific themes your team actually acts on.",
      "Not deciding upfront how many source documents a typical run will include — 3 transcripts is a different tool than 30.",
    ],
    doneChecklist: [
      "You've named the one input type (transcripts, surveys, or tickets) this tool handles",
      "You've named the typical batch size (e.g. 8–12 interviews per synthesis)",
      "The output shape is defined: themes, each with supporting quotes and a one-line implication",
      "Done criteria is measurable — e.g. 'cuts synthesis from 4 hours to 45 minutes'",
    ],
    contentBody: `## Pick your input type

A research helper works best scoped to one input type. Pick the one you actually have on hand this week:
- **Interview transcripts** — from user interviews, customer calls, or internal stakeholder interviews
- **Survey responses** — open-text answers from a structured survey
- **Support tickets** — recurring complaints or requests that reveal patterns

## Define the output shape

The output that actually gets used is: 4–6 themes, each with 2–3 supporting quotes pulled verbatim from the source, and one line on what it means for the roadmap. Not a wall of bullet points — a document someone can read in three minutes and walk away knowing what to do.

## Your brief, specific to this archetype

Problem: "Synthesising [8–12] [interview transcripts] into themes takes me [X hours] every [sprint/quarter]."
Input: [your chosen input type], typically [N] documents per run.
Output: A themed synthesis doc — 4–6 themes, quotes, one-line implications.
Done criteria: cuts your synthesis time by at least half, and a PM peer trusts the themes without re-reading the raw transcripts.`,
    steps: [
      {
        order: 1,
        instruction: "Pick your input type (transcripts, surveys, or tickets) and your typical batch size. Write your problem statement with real numbers.",
        expectedAction: "Choose one input type and write a specific problem statement",
        expectedResult: "A sentence naming the input type, batch size, and current time cost.",
        commonErrorNote: "If you're tempted to handle all three input types, pick the one you have the most real examples of right now.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction: "Gather 3–5 real examples of your chosen input type from an actual project. These are your test set for week 1.",
        expectedAction: "Collect real transcripts, surveys, or tickets",
        expectedResult: "A folder of real, usable source material — not invented examples.",
        commonErrorNote: "If your real examples are sensitive, plan how you'll anonymise them before pasting into Claude.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 3,
        instruction: "Write your done criteria and output shape (themes + quotes + implication) into your brief.",
        expectedAction: "Finalise the brief with output shape and done criteria",
        expectedResult: "A complete one-page brief specific to a research helper.",
        commonErrorNote: "",
        aiHintRef: "Ask Claude: 'Here's my research helper brief — is the output shape specific enough to build against?'",
        completionRule: "manual",
      },
      {
        order: 4,
        instruction: "Post your brief in the cohort Slack.",
        expectedAction: "Share your brief with the cohort",
        expectedResult: "Your brief is visible to the cohort.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
    ],
  },
  {
    title: "Build your research helper",
    slug: "pm-research-helper-week-1-build",
    weekId: 1,
    trackSlug: "product-pm",
    archetypeSlug: "research-helper",
    purpose: "Get a working synthesis tool running on your real transcripts, surveys, or tickets.",
    estimatedTimeMinutes: 180,
    expectedOutput: "A tool that turns your chosen input type into a themed doc with quotes, tested on real source material.",
    guideType: "build",
    difficulty: "intermediate",
    isRequired: true,
    retrievalTags: ["research-helper", "week-1", "pm", "build"],
    commonMistakes: [
      "Asking for too many themes — 8+ themes isn't synthesis, it's a re-listing of everything said.",
      "Letting the tool paraphrase instead of quoting — paraphrased 'evidence' isn't verifiable and won't be trusted.",
      "Not testing on your messiest transcript — the one with a bad recording or an off-topic tangent.",
    ],
    doneChecklist: [
      "The tool produces 4–6 themes with verbatim quotes from at least one real input batch",
      "You've tested it on your best AND your messiest real source document",
      "Every theme has at least one direct quote as evidence",
      "You know the top 2 things it still gets wrong",
    ],
    contentBody: `## The system prompt

> You are a research synthesis assistant for a Product Manager. You receive [transcripts / survey responses / tickets] and produce 4–6 themes.
>
> For each theme: a short name, 2–3 supporting quotes copied verbatim from the source (never paraphrased), and one sentence on what it implies for the roadmap.
>
> Group by theme, not by source document. If a theme only appears once, note it as a minor signal rather than a main theme. If the input doesn't support 4 solid themes, return fewer — don't pad.

Test this in Claude chat on your 3–5 real examples first. Check every quote is actually verbatim — this is the most common failure and the one that destroys trust fastest.

## Building it

In Cursor: "Build a script that takes [my input type] as a text file, sends it to Claude API with this system prompt, and prints the themed output." Run it on your real batch.

## Test the edge case

Run it on your worst transcript — background noise transcribed as garbage, a tangent, an incomplete recording. A synthesis tool that only works on clean input isn't done yet.`,
    steps: [
      {
        order: 1,
        instruction: "Write and test your system prompt in Claude chat against your 3–5 real source documents. Check every quote is verbatim, not paraphrased.",
        expectedAction: "Write and validate the system prompt",
        expectedResult: "4–6 themes with verifiable, verbatim quotes from at least 3 test runs.",
        commonErrorNote: "If quotes are paraphrased, add 'copy quotes verbatim, do not paraphrase' explicitly to the prompt — this is the single most common failure.",
        aiHintRef: "Ask Claude: 'Check this output — are all quotes verbatim from the source, or has anything been paraphrased?'",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction: "Ask Cursor to build a script that runs your prompt against a text file input and prints the themed output.",
        expectedAction: "Build the script in Cursor",
        expectedResult: "A runnable script producing themed output from a real input file.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 3,
        instruction: "Run it on your messiest real source — an incomplete transcript, an off-topic tangent, a badly formatted ticket export.",
        expectedAction: "Test on the worst-case real input",
        expectedResult: "You know whether the tool degrades gracefully or breaks on messy input.",
        commonErrorNote: "If it invents a theme not actually supported by the messy input, tighten the prompt to require evidence.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 4,
        instruction: "Fix the single most important problem you found, then record a 2-minute demo and post it to the cohort Slack.",
        expectedAction: "Fix the top issue and share a demo",
        expectedResult: "The cohort has seen your research helper working on a real batch.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
    ],
  },
  {
    title: "Make your research helper usable",
    slug: "pm-research-helper-week-2-usable",
    weekId: 2,
    trackSlug: "product-pm",
    archetypeSlug: "research-helper",
    purpose: "Get another PM or researcher running this on their own transcripts without you in the room.",
    estimatedTimeMinutes: 150,
    expectedOutput: "A colleague ran it independently on their own source material and trusted the themes.",
    guideType: "build",
    difficulty: "intermediate",
    isRequired: true,
    retrievalTags: ["research-helper", "week-2", "pm", "usable"],
    commonMistakes: [
      "Not telling the tester how many source documents to include — batch size affects quality a lot.",
      "Skipping trust-testing — a synthesis tool is useless if the reader doesn't believe the quotes are real.",
      "Formatting the output for you, not for whoever reads the final synthesis doc.",
    ],
    doneChecklist: [
      "A colleague ran it on their own transcripts/surveys/tickets with no help from you",
      "They said they'd trust the output enough to skip re-reading the raw source",
      "Instructions specify batch size and input format clearly",
      "It handles a 3-document batch and a 15-document batch without breaking",
    ],
    contentBody: `## The trust test

The real usability bar for a research helper isn't "does it run" — it's "does the reader trust the quotes enough to skip re-reading the source." Ask your tester directly: "Would you cite this in a roadmap doc without double-checking the source?" If no, find out why — usually it's a quote that felt off or a theme that felt thin.

## Batch size matters

Test with a small batch (3 documents) and a larger one (15). A prompt tuned on 5 transcripts can produce thin, over-confident themes on 3, or a bloated theme list on 15. Add a note in your prompt: "If fewer than 3 sources are provided, note the low sample size and stay conservative in claims."

## Instructions

One page: what input format to use, roughly how many documents to include, where to paste it, and where the output appears. Include an anonymisation reminder if the source material is ever sensitive.`,
    steps: [
      {
        order: 1,
        instruction: "Have a PM or researcher colleague run your tool on their own real transcripts or survey data, with no help from you.",
        expectedAction: "Run an unassisted usability test",
        expectedResult: "You know whether they got a themed doc they'd trust without re-reading the source.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction: "Ask directly: would they cite a quote from this output without checking the source first? Note exactly why or why not.",
        expectedAction: "Run the trust test",
        expectedResult: "A clear yes/no with the specific reason.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 3,
        instruction: "Test with a small batch (3 documents) and a large one (15). Fix whichever one breaks or produces weak output.",
        expectedAction: "Test batch-size extremes and fix the weaker case",
        expectedResult: "The tool handles both a small and large batch reasonably.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 4,
        instruction: "Write one-page usage instructions covering input format, batch size, and anonymisation if relevant. Record a short Loom and post it in the cohort Slack.",
        expectedAction: "Write instructions and share a demo",
        expectedResult: "A colleague could self-serve from the Slack post alone.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
    ],
  },
  {
    title: "Get feedback on your research helper",
    slug: "pm-research-helper-week-3-review",
    weekId: 3,
    trackSlug: "product-pm",
    archetypeSlug: "research-helper",
    purpose: "Validate the themes and quotes with people who'd actually cite this output in a real decision.",
    estimatedTimeMinutes: 90,
    expectedOutput: "Two PMs or researchers have reviewed real output and you've fixed the top trust or accuracy issue.",
    guideType: "review",
    difficulty: "intermediate",
    isRequired: true,
    retrievalTags: ["research-helper", "week-3", "pm", "feedback"],
    commonMistakes: [
      "Asking 'does this look good' instead of 'would you act on this without re-checking the source'.",
      "Not showing the reviewer the raw source alongside the synthesis — they can't judge accuracy without it.",
    ],
    doneChecklist: [
      "Two PMs/researchers reviewed real synthesis output against the raw source",
      "You know whether any theme felt overstated or any quote felt off",
      "You fixed the one issue most likely to break trust in the output",
    ],
    contentBody: `## Show the source alongside the synthesis

For a research helper, feedback only works if the reviewer can check the synthesis against the raw source. Give them both. Ask: "Does every theme here hold up against what's actually in the transcripts? Is anything overstated?"

## What to fix

The highest-value fix is almost always accuracy, not formatting — a theme that overreaches from thin evidence, or a quote that's slightly misquoted. Fix that before anything cosmetic.`,
    steps: [
      {
        order: 1,
        instruction: "Give two PM/researcher reviewers both the raw source and your tool's synthesis output. Ask if every theme holds up.",
        expectedAction: "Run two accuracy-focused reviews",
        expectedResult: "Documented notes on whether themes and quotes held up against the source.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction: "Fix the most significant accuracy or trust issue raised. Retest against the source.",
        expectedAction: "Fix the top accuracy issue",
        expectedResult: "The flagged theme or quote is now accurate.",
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
    title: "Ship your research helper",
    slug: "pm-research-helper-week-4-ship",
    weekId: 4,
    trackSlug: "product-pm",
    archetypeSlug: "research-helper",
    purpose: "Put your research helper somewhere your team will actually reach for it before the next round of interviews.",
    estimatedTimeMinutes: 90,
    expectedOutput: "Shipped research helper + handoff doc with a real transcript example + Loom demo.",
    guideType: "submit",
    difficulty: "intermediate",
    isRequired: true,
    retrievalTags: ["research-helper", "week-4", "pm", "ship"],
    commonMistakes: [
      "Shipping without a note on the anonymisation step, if your team handles sensitive interviews.",
      "Not stating the batch size range the tool is validated for.",
    ],
    doneChecklist: [
      "Tool lives somewhere your team will actually open it before the next research round",
      "Handoff doc includes a real transcript example and its themed output",
      "The doc states the validated batch size range and any anonymisation step",
      "Loom demo recorded and posted in #ships; certification submitted",
    ],
    contentBody: `## Where this actually lives

A Notion page with the prompt and a link to run it, next to wherever your team already stores interview notes, beats a standalone tool nobody remembers exists.

## The handoff doc

Include: the validated batch size range, the anonymisation step if relevant, and a real before/after example — raw transcripts on one side, themed output on the other.

Submit for certification once the demo and handoff doc are ready.`,
    steps: [
      {
        order: 1,
        instruction: "Put the tool where your team already keeps research notes — linked from that space, not standalone.",
        expectedAction: "Give the tool a discoverable home",
        expectedResult: "A colleague finds it without being told where to look.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction: "Write the handoff doc with a real before/after example and the validated batch size range.",
        expectedAction: "Write the handoff doc",
        expectedResult: "A one-page doc a new PM could follow.",
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

const ROADMAP_REVIEW_TOOL: ArchetypeGuideData[] = [
  {
    title: "Define your roadmap review tool",
    slug: "pm-roadmap-review-week-0-define",
    weekId: 0,
    trackSlug: "product-pm",
    archetypeSlug: "roadmap-review-tool",
    purpose: "Scope exactly which review-prep task you're automating, and from which data source.",
    estimatedTimeMinutes: 60,
    expectedOutput: "A brief scoped to one data source (Linear/Jira export, spreadsheet, or planning doc) and one review-ready output.",
    guideType: "setup",
    difficulty: "beginner",
    isRequired: true,
    retrievalTags: ["roadmap-review-tool", "week-0", "pm", "define"],
    commonMistakes: [
      "Scoping 'a roadmap tool' instead of one specific review artifact — a status scorecard, not a planning platform.",
      "Not naming which system your data actually lives in (Linear, Jira, a spreadsheet) — the input format matters.",
      "Trying to automate prioritisation decisions instead of just the prep and formatting work.",
    ],
    doneChecklist: [
      "One data source is named (e.g. Linear export, spreadsheet)",
      "The output is one artifact — a status scorecard, an off-track flag list, or a review summary — not a dashboard",
      "You've decided what 'off-track' or 'at risk' means in a way the tool can check against",
      "Done criteria is measurable — e.g. 'cuts review prep from 90 to 20 minutes'",
    ],
    contentBody: `## Pick your data source and output

Name the one system your roadmap data lives in — Linear, Jira, Asana, or a spreadsheet export. Then pick one output: a status scorecard by initiative, a flagged list of what's off-track, or a plain-English review summary a stakeholder could read cold.

## Define "off-track"

If your tool is going to flag risk, define the rule now: no update in 2 weeks, past the target date, or blocked with no owner assigned. Write the actual rule — "flag anything with no status change in 10 days" is buildable, "flag anything that seems stuck" is not.

## Your brief, specific to this archetype

Problem: "Prepping the roadmap review from [Linear/spreadsheet] takes me [X hours] every [cycle]."
Input: an export from [your system], typically covering [N] initiatives.
Output: a review-ready [scorecard / flagged list / summary].
Done criteria: cuts prep time in half and a stakeholder can act on it without asking clarifying questions.`,
    steps: [
      {
        order: 1,
        instruction: "Name your data source (Linear, Jira, spreadsheet) and pull one real export as a test file.",
        expectedAction: "Identify the data source and get a real export",
        expectedResult: "A real export file with actual initiative/ticket data.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction: "Write your rule for what counts as 'off-track' or 'at risk' in specific, checkable terms.",
        expectedAction: "Define the risk rule concretely",
        expectedResult: "A written rule you could hand to someone else and get the same flags.",
        commonErrorNote: "If your rule uses words like 'seems' or 'feels', make it a checkable fact instead.",
        aiHintRef: "Ask Claude: 'Is this risk rule specific enough for a tool to apply consistently?'",
        completionRule: "manual",
      },
      {
        order: 3,
        instruction: "Write your done criteria and post the brief in the cohort Slack.",
        expectedAction: "Finalise and share the brief",
        expectedResult: "Brief posted, visible to the cohort.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
    ],
  },
  {
    title: "Build your roadmap review tool",
    slug: "pm-roadmap-review-week-1-build",
    weekId: 1,
    trackSlug: "product-pm",
    archetypeSlug: "roadmap-review-tool",
    purpose: "Get a working tool that turns a real export into a review-ready artifact.",
    estimatedTimeMinutes: 180,
    expectedOutput: "A tool that produces your scorecard/flagged list/summary from a real export, with known failure modes.",
    guideType: "build",
    difficulty: "intermediate",
    isRequired: true,
    retrievalTags: ["roadmap-review-tool", "week-1", "pm", "build"],
    commonMistakes: [
      "Building for a perfectly tagged Linear board when your real one has inconsistent statuses and missing owners.",
      "Letting the tool make subjective prioritisation calls instead of applying your explicit risk rule.",
      "Not handling initiatives with no update at all — a common real case, not an edge case.",
    ],
    doneChecklist: [
      "The tool runs on a real export and applies your risk rule consistently",
      "You've tested it against your messiest real data — missing fields, inconsistent statuses",
      "You know the top 2 things it still gets wrong",
      "Output is something you'd actually bring to a review meeting",
    ],
    contentBody: `## The system prompt

> You are a roadmap review assistant for a Product Manager. You receive a [Linear/Jira/spreadsheet] export of initiatives and produce a [scorecard / flagged list / summary].
>
> Apply this risk rule exactly: [your rule from week 0]. Do not use judgement beyond this rule — flag only what the rule flags.
>
> Format: group by initiative, show status, owner, and risk flag with the specific reason (e.g. "no update in 14 days").
>
> If an initiative is missing key fields (owner, status, date), flag it as "data incomplete" rather than guessing.

## Building it

In Cursor: "Build a script that takes this export format, applies this risk rule via Claude API, and prints a review-ready summary." Run it on your real export.

## Test the messy case

Real boards have initiatives with no owner, inconsistent status names, or stale timestamps. Test on your export as-is — don't clean it up first. That's the real test.`,
    steps: [
      {
        order: 1,
        instruction: "Write and test your system prompt in Claude chat against your real export, applying your exact risk rule.",
        expectedAction: "Write and test the system prompt",
        expectedResult: "A scorecard or flagged list that correctly applies your risk rule to real data.",
        commonErrorNote: "If flags feel inconsistent, your rule may still be too subjective — tighten it to a specific, checkable condition.",
        aiHintRef: "Ask Claude: 'Does this output apply my risk rule consistently, or is it making subjective calls?'",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction: "Ask Cursor to build a script that runs your prompt against the export file and prints the output.",
        expectedAction: "Build the script",
        expectedResult: "A runnable script producing your scorecard from a real export.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 3,
        instruction: "Run it on your export as-is, without cleaning it up — missing owners, inconsistent statuses included.",
        expectedAction: "Test on unmodified real data",
        expectedResult: "You know how the tool handles incomplete or messy fields.",
        commonErrorNote: "If it guesses at a missing owner instead of flagging incomplete data, fix the prompt.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 4,
        instruction: "Fix the top problem, then record a 2-minute demo and post it to the cohort Slack.",
        expectedAction: "Fix the top issue and share a demo",
        expectedResult: "The cohort has seen it working on a real export.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
    ],
  },
  {
    title: "Make your roadmap review tool usable",
    slug: "pm-roadmap-review-week-2-usable",
    weekId: 2,
    trackSlug: "product-pm",
    archetypeSlug: "roadmap-review-tool",
    purpose: "Get another PM running this on their own export ahead of their own review.",
    estimatedTimeMinutes: 150,
    expectedOutput: "A colleague ran it independently on their own roadmap data and used the output in a real review.",
    guideType: "build",
    difficulty: "intermediate",
    isRequired: true,
    retrievalTags: ["roadmap-review-tool", "week-2", "pm", "usable"],
    commonMistakes: [
      "Not documenting the exact export steps from Linear/Jira — that's the step most likely to trip someone up.",
      "Only testing on one team's data structure — another team's fields may be named differently.",
    ],
    doneChecklist: [
      "A PM colleague ran it on their own export without your help",
      "Export instructions are documented step by step",
      "It handles a differently-structured export (different field names) without breaking silently",
      "The colleague would bring the output to an actual review",
    ],
    contentBody: `## The real friction: getting the export right

For a roadmap tool, the hardest step for a new user is usually exporting the data correctly, not running the tool. Document the exact export steps from your system with a screenshot if possible.

## Test with someone else's data structure

Another team's board may use different status names or field structures. Test with a colleague's real export — if it breaks silently instead of flagging unrecognised fields, fix that before shipping.

## What "usable" means here

Usable means the colleague would actually bring the output into their next review meeting, not just that the script ran without errors.`,
    steps: [
      {
        order: 1,
        instruction: "Document the exact steps to export data from your system, with a screenshot if useful.",
        expectedAction: "Write export instructions",
        expectedResult: "Clear steps someone unfamiliar with your export process could follow.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction: "Have a PM colleague run the tool on their own real export with no help. Watch and note where they get stuck.",
        expectedAction: "Run an unassisted usability test",
        expectedResult: "At least one concrete friction point identified.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 3,
        instruction: "If their data structure differs from yours, confirm the tool flags unrecognised fields rather than silently misreading them.",
        expectedAction: "Test against a different data structure",
        expectedResult: "The tool fails clearly or adapts, rather than producing silently wrong output.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 4,
        instruction: "Fix the top friction point, record a Loom, and post it in the cohort Slack.",
        expectedAction: "Fix the issue and share a demo",
        expectedResult: "Cohort can access and understand the tool from the post.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
    ],
  },
  {
    title: "Get feedback on your roadmap review tool",
    slug: "pm-roadmap-review-week-3-review",
    weekId: 3,
    trackSlug: "product-pm",
    archetypeSlug: "roadmap-review-tool",
    purpose: "Validate the tool's flags and summary with a real review audience before you rely on it.",
    estimatedTimeMinutes: 90,
    expectedOutput: "Two PMs or stakeholders reviewed real output against a real board and you've fixed the top disagreement.",
    guideType: "review",
    difficulty: "intermediate",
    isRequired: true,
    retrievalTags: ["roadmap-review-tool", "week-3", "pm", "feedback"],
    commonMistakes: [
      "Only testing with your own team's board, not someone who'd sit in the actual review meeting.",
      "Not asking whether any flag felt wrong — false flags erode trust faster than missed ones.",
    ],
    doneChecklist: [
      "Two people who'd attend or run the actual review checked the output against the live board",
      "You know if any flag felt wrong or any status felt outdated",
      "You fixed the top disagreement between the tool's output and the reviewer's judgement",
    ],
    contentBody: `## Test against the live board

Show your output next to the actual current board, not a snapshot from last week. Ask: "Does anything here look wrong compared to what you know right now?"

## False flags erode trust fastest

A tool that occasionally misses a risk is annoying. A tool that flags things as at-risk when they're actually fine gets ignored within two uses. If a reviewer disagrees with a flag, dig into why before dismissing it as a one-off.`,
    steps: [
      {
        order: 1,
        instruction: "Show two reviewers (people who'd attend the real review) your output next to the live current board.",
        expectedAction: "Run two comparison reviews against the live board",
        expectedResult: "Documented agreement or disagreement on each flag.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction: "Fix the top disagreement — usually a false flag or a stale status read.",
        expectedAction: "Fix the top disagreement",
        expectedResult: "The flagged issue is resolved and rechecked.",
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
    title: "Ship your roadmap review tool",
    slug: "pm-roadmap-review-week-4-ship",
    weekId: 4,
    trackSlug: "product-pm",
    archetypeSlug: "roadmap-review-tool",
    purpose: "Put your roadmap review tool where you'll actually reach for it before your next review cycle.",
    estimatedTimeMinutes: 90,
    expectedOutput: "Shipped tool + handoff doc with a real export example + Loom demo.",
    guideType: "submit",
    difficulty: "intermediate",
    isRequired: true,
    retrievalTags: ["roadmap-review-tool", "week-4", "pm", "ship"],
    commonMistakes: [
      "Not documenting which system(s) and export formats it's validated against.",
      "Shipping without your risk rule written down anywhere — the next user needs to know what 'at risk' means.",
    ],
    doneChecklist: [
      "Tool lives somewhere you'll open before your next review, not buried in a folder",
      "Handoff doc includes a real export example, the risk rule, and the output it produced",
      "Loom demo recorded and posted in #ships; certification submitted",
    ],
    contentBody: `## Where this lives

Link it from wherever you already prep for reviews — a recurring doc, a review-prep checklist — not a standalone unrelated tool.

## The handoff doc

State the exact system and export format it's built for, your risk rule in plain language, and one real before/after example.

Submit for certification once the demo and handoff doc are ready.`,
    steps: [
      {
        order: 1,
        instruction: "Put the tool where you'll actually open it before your next review — linked from your prep checklist or doc.",
        expectedAction: "Give the tool a discoverable home",
        expectedResult: "It's linked from wherever you already prep reviews.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction: "Write the handoff doc with the export format, your risk rule, and a real before/after example.",
        expectedAction: "Write the handoff doc",
        expectedResult: "A one-page doc a new PM could follow to run their own review prep.",
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

const MEETING_PLANNING_TOOL: ArchetypeGuideData[] = [
  {
    title: "Define your meeting/planning tool",
    slug: "pm-meeting-planning-week-0-define",
    weekId: 0,
    trackSlug: "product-pm",
    archetypeSlug: "meeting-planning-tool",
    purpose: "Scope whether you're building a pre-meeting prep tool or a post-meeting write-up tool.",
    estimatedTimeMinutes: 60,
    expectedOutput: "A brief scoped to one meeting type and one direction (prep before, or write-up after).",
    guideType: "setup",
    difficulty: "beginner",
    isRequired: true,
    retrievalTags: ["meeting-planning-tool", "week-0", "pm", "define"],
    commonMistakes: [
      "Trying to build both prep and write-up in four weeks — pick one direction.",
      "Scoping for 'all meetings' instead of one recurring meeting type (planning, 1:1s, stakeholder syncs).",
      "Not deciding what counts as a 'decision' vs. a 'discussion point' in your output format.",
    ],
    doneChecklist: [
      "You've picked one direction: pre-meeting prep, or post-meeting write-up",
      "You've named one recurring meeting type this applies to",
      "You've defined what counts as a decision vs. an open question in the output",
      "Done criteria is measurable — e.g. 'saves 20 minutes of write-up time per meeting'",
    ],
    contentBody: `## Pick a direction

**Pre-meeting prep** — input is context (past notes, a doc, an agenda) and output is a one-page brief so attendees walk in aligned.
**Post-meeting write-up** — input is a transcript or raw notes and output is a decisions-and-action-items brief.

Pick one for these four weeks. Both are valuable; only one fits in a scoped build.

## Define your output categories

Decide now what counts as a "decision" (something the group committed to) versus an "open question" (still unresolved) versus a "discussion point" (talked about, no conclusion). Loose categorisation here means the output will be unreliable later.

## Your brief, specific to this archetype

Problem: "Writing up [meeting type] takes me [X minutes] every [week/meeting] / Attendees show up unaligned to [meeting type] because prep takes too long."
Input: [transcript / notes / prep docs].
Output: a one-page brief with decisions, owners, and open questions.
Done criteria: saves measurable time and attendees/readers trust it without cross-checking.`,
    steps: [
      {
        order: 1,
        instruction: "Pick pre-meeting prep or post-meeting write-up, and name the one recurring meeting type you're targeting.",
        expectedAction: "Choose a direction and meeting type",
        expectedResult: "A clear, single-direction problem statement.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction: "Write your definitions for 'decision', 'action item', and 'open question' as they'll appear in the output.",
        expectedAction: "Define output categories precisely",
        expectedResult: "Three clear category definitions.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 3,
        instruction: "Finalise your brief with done criteria and post it in the cohort Slack.",
        expectedAction: "Finalise and share the brief",
        expectedResult: "Brief posted, visible to the cohort.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
    ],
  },
  {
    title: "Build your meeting/planning tool",
    slug: "pm-meeting-planning-week-1-build",
    weekId: 1,
    trackSlug: "product-pm",
    archetypeSlug: "meeting-planning-tool",
    purpose: "Get a working tool that produces a decisions-and-actions brief (or a prep brief) from real meeting material.",
    estimatedTimeMinutes: 180,
    expectedOutput: "A tool that produces your brief from a real transcript or context doc, with known failure modes.",
    guideType: "build",
    difficulty: "intermediate",
    isRequired: true,
    retrievalTags: ["meeting-planning-tool", "week-1", "pm", "build"],
    commonMistakes: [
      "Letting the tool invent an owner for an action item when none was stated — leave it blank and flag it instead.",
      "Not handling multi-speaker transcripts where names aren't labelled.",
      "Building for a perfectly transcribed meeting when real recordings cut out or overlap.",
    ],
    doneChecklist: [
      "The tool correctly separates decisions from open questions on a real transcript or doc",
      "It doesn't invent owners or outcomes that weren't actually stated",
      "You've tested it on your messiest real transcript",
      "You know the top 2 things it still gets wrong",
    ],
    contentBody: `## The system prompt

> You are a meeting assistant for a Product Manager. You receive a [meeting transcript / prep context doc] and produce a one-page brief.
>
> Categories: **Decisions** — things the group explicitly committed to. **Action items** — with an owner, only if one was stated (otherwise mark "unassigned"). **Open questions** — raised but not resolved.
>
> Never invent an owner, decision, or outcome that wasn't stated. If the transcript is ambiguous about whether something was decided or just discussed, put it under open questions.

## Building it

In Cursor: "Build a script that takes a transcript or doc as input, sends it to Claude API with this prompt, and prints the brief." Test on a real meeting.

## Test the real case

Multi-speaker transcripts with unlabelled speakers, overlapping talk, or a recording that cuts out mid-sentence — these are normal, not edge cases. Test on one.`,
    steps: [
      {
        order: 1,
        instruction: "Write and test your system prompt in Claude chat against a real transcript or context doc, checking it doesn't invent decisions or owners.",
        expectedAction: "Write and test the system prompt",
        expectedResult: "A brief that correctly separates decisions, actions, and open questions without inventing anything.",
        commonErrorNote: "If it assigns an owner that wasn't stated, add 'never invent an owner' explicitly to the prompt.",
        aiHintRef: "Ask Claude: 'Check this brief against the transcript — did anything get invented that wasn't actually said?'",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction: "Ask Cursor to build a script that runs your prompt against a transcript/doc file and prints the brief.",
        expectedAction: "Build the script",
        expectedResult: "A runnable script producing the brief from a real file.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 3,
        instruction: "Test on your messiest real transcript — unlabelled speakers, a gap, overlapping talk.",
        expectedAction: "Test on a messy real transcript",
        expectedResult: "You know whether the tool degrades gracefully.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 4,
        instruction: "Fix the top problem, then record a 2-minute demo and post it to the cohort Slack.",
        expectedAction: "Fix the top issue and share a demo",
        expectedResult: "The cohort has seen the tool working on a real transcript.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
    ],
  },
  {
    title: "Make your meeting/planning tool usable",
    slug: "pm-meeting-planning-week-2-usable",
    weekId: 2,
    trackSlug: "product-pm",
    archetypeSlug: "meeting-planning-tool",
    purpose: "Get a colleague running this on their own meeting without you present.",
    estimatedTimeMinutes: 150,
    expectedOutput: "A colleague ran it independently after their own meeting and used the brief directly.",
    guideType: "build",
    difficulty: "intermediate",
    isRequired: true,
    retrievalTags: ["meeting-planning-tool", "week-2", "pm", "usable"],
    commonMistakes: [
      "Not specifying where the transcript or notes actually come from (Zoom, Gong, manual notes) — the source affects format.",
      "Skipping the accuracy check — a wrong action item is worse than a missing one.",
    ],
    doneChecklist: [
      "A colleague ran it after their own meeting with no help",
      "Instructions specify the exact transcript/notes source and format expected",
      "They confirmed the decisions and action items matched what actually happened",
      "The brief is something they'd send to attendees, not just keep for themselves",
    ],
    contentBody: `## Accuracy over completeness

A meeting brief with one wrong action item is more damaging than one with a missing item — someone gets blamed for something they didn't agree to, or a real decision gets lost. Test specifically for false positives, not just coverage.

## Where the transcript comes from matters

Zoom auto-transcripts, Gong recordings, and manual notes all have different formats and quirks. Document exactly which source your tool is built for, and test with a real export from that source.

## What "usable" means here

The colleague would actually send this brief to meeting attendees, not just glance at it and rewrite it themselves.`,
    steps: [
      {
        order: 1,
        instruction: "Have a colleague run the tool right after their own real meeting, with no help from you.",
        expectedAction: "Run an unassisted usability test after a real meeting",
        expectedResult: "A real brief generated from a real meeting they just had.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction: "Have them confirm every decision and action item in the brief actually matches what happened.",
        expectedAction: "Verify accuracy against their own memory of the meeting",
        expectedResult: "Confirmed accuracy, or a list of specific inaccuracies.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 3,
        instruction: "Fix any inaccuracy found, document the exact transcript source and format the tool expects, and record a Loom.",
        expectedAction: "Fix issues, document the source format, and share a demo",
        expectedResult: "Cohort can access and understand the tool from the Slack post.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
    ],
  },
  {
    title: "Get feedback on your meeting/planning tool",
    slug: "pm-meeting-planning-week-3-review",
    weekId: 3,
    trackSlug: "product-pm",
    archetypeSlug: "meeting-planning-tool",
    purpose: "Validate the brief with real meeting attendees before you rely on it going forward.",
    estimatedTimeMinutes: 90,
    expectedOutput: "Two colleagues who'd receive this brief reviewed real output, and you've fixed the top accuracy issue.",
    guideType: "review",
    difficulty: "intermediate",
    isRequired: true,
    retrievalTags: ["meeting-planning-tool", "week-3", "pm", "feedback"],
    commonMistakes: [
      "Only asking the meeting organiser instead of an actual attendee who'd receive the brief.",
      "Not asking specifically whether anything was misattributed or invented.",
    ],
    doneChecklist: [
      "Two people who'd receive this brief in a real meeting reviewed real output",
      "You asked specifically whether any decision or owner was wrong",
      "You fixed the top accuracy issue found",
    ],
    contentBody: `## Ask the attendee, not just the organiser

The person who'd actually receive this brief — not just whoever ran the meeting — is the real test of whether it's trustworthy. Ask: "Is anything here wrong or missing compared to what you remember from the meeting?"

## Accuracy first, formatting second

Fix any misattributed decision or invented action item before touching formatting or layout.`,
    steps: [
      {
        order: 1,
        instruction: "Show two real meeting attendees the brief from a meeting they were in. Ask if anything is wrong or missing.",
        expectedAction: "Run two accuracy-focused reviews with real attendees",
        expectedResult: "Documented feedback on accuracy specifically.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction: "Fix the top accuracy issue raised.",
        expectedAction: "Fix the top accuracy issue",
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
    title: "Ship your meeting/planning tool",
    slug: "pm-meeting-planning-week-4-ship",
    weekId: 4,
    trackSlug: "product-pm",
    archetypeSlug: "meeting-planning-tool",
    purpose: "Put your meeting tool where you'll reach for it right after (or before) your next recurring meeting.",
    estimatedTimeMinutes: 90,
    expectedOutput: "Shipped tool + handoff doc with a real transcript example + Loom demo.",
    guideType: "submit",
    difficulty: "intermediate",
    isRequired: true,
    retrievalTags: ["meeting-planning-tool", "week-4", "pm", "ship"],
    commonMistakes: [
      "Not documenting the exact transcript source it's built for.",
      "Shipping without stating that owners/decisions are never invented — the next user should know this guarantee.",
    ],
    doneChecklist: [
      "Tool lives somewhere you'll reach for it right after your next recurring meeting",
      "Handoff doc includes a real transcript example, the source format, and the output produced",
      "Loom demo recorded and posted in #ships; certification submitted",
    ],
    contentBody: `## Where this lives

Link it from your calendar invite template or meeting notes doc for that recurring meeting — somewhere it surfaces automatically, not somewhere you have to remember.

## The handoff doc

State the exact transcript/notes source it's built for, the guarantee that it never invents owners or decisions, and one real before/after example.

Submit for certification once the demo and handoff doc are ready.`,
    steps: [
      {
        order: 1,
        instruction: "Put the tool where it surfaces automatically for your recurring meeting — a calendar template or shared notes doc.",
        expectedAction: "Give the tool a discoverable home",
        expectedResult: "It's linked from where the meeting itself happens.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction: "Write the handoff doc with the source format, the no-invention guarantee, and a real before/after example.",
        expectedAction: "Write the handoff doc",
        expectedResult: "A one-page doc a new PM could follow.",
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

export const PM_ARCHETYPE_CURRICULUM: ArchetypeGuideData[] = [
  ...RESEARCH_HELPER,
  ...ROADMAP_REVIEW_TOOL,
  ...MEETING_PLANNING_TOOL,
];

/**
 * Torvi curriculum seed data — weeks 0–4, per track.
 * Each track (Product/PM, Ops/Workflow, Consultant/Client) has its own
 * full 5-week path — same process backbone, different concrete work,
 * examples, and prompts so the "role-based path" is real, not cosmetic.
 */

export type TrackSlug = "product-pm" | "ops-workflow" | "consultant-client";

export interface GuideData {
  title: string;
  slug: string;
  weekId: number;
  trackSlug: TrackSlug;
  purpose: string;
  estimatedTimeMinutes: number;
  expectedOutput: string;
  guideType: "concept" | "setup" | "build" | "review" | "troubleshoot" | "submit";
  contentBody: string;
  commonMistakes: string[];
  doneChecklist: string[];
  retrievalTags: string[];
  isRequired: boolean;
  difficulty: "beginner" | "intermediate" | "advanced";
  steps: StepData[];
}

export interface StepData {
  order: number;
  instruction: string;
  expectedAction: string;
  expectedResult: string;
  commonErrorNote: string;
  aiHintRef: string;
  completionRule: string;
}

// ════════════════════════════════════════════════════════════════════════
// PRODUCT / PM TRACK
// Archetypes: Research helper · Roadmap / Review tool · Meeting / Planning tool
// ════════════════════════════════════════════════════════════════════════

const PM_CURRICULUM: GuideData[] = [
  {
    title: "Define your tool",
    slug: "pm-week-0-define",
    weekId: 0,
    trackSlug: "product-pm",
    purpose:
      "Lock down exactly what PM work you're going to automate before touching any tools. The brief is your north star for the next four weeks.",
    estimatedTimeMinutes: 90,
    expectedOutput:
      "One-page tool brief: problem statement, intended user, inputs, outputs, and done criteria — scoped to one repeating PM task.",
    guideType: "setup",
    difficulty: "beginner",
    isRequired: true,
    retrievalTags: ["brief", "define", "week-0", "pm", "product", "scope"],
    commonMistakes: [
      "Picking 'build a roadmap tool' instead of one narrow, repeating task — a research synthesiser, not a planning platform.",
      "Writing a vague problem statement like 'discovery is disorganised' instead of a specific one with a number in it.",
      "Building for 'the team' instead of naming yourself or one named PM peer as the user.",
      "Choosing a problem you only have secondhand — pick something you personally do most weeks.",
    ],
    doneChecklist: [
      "Problem statement is one specific sentence describing the current painful reality, with a number in it",
      "Intended user is named — you, or one specific PM/EM/designer by name",
      "Inputs are listed as concrete items (interview transcripts, a PRD doc, a Linear export, a Slack thread)",
      "Output is one specific deliverable — a synthesis doc, a formatted spec section, a meeting brief — not a dashboard",
      "Done criteria is measurable — you will know in week 4 whether this worked",
    ],
    contentBody: `## Why this matters

Most cohort members who don't finish fail here — not in week 4. PMs especially tend to pick something too broad ("a roadmap tool") because their job is broad. This week's only job is to find the one recurring task under that broad job title that eats real hours, and scope a tool to just that.

## Where PM tools usually live

Your archetype is one of three shapes. Pick the one closest to your actual weekly pain:

**Research helper** — you sit on a pile of interview transcripts, survey responses, or support tickets and need to turn them into themes, quotes, and a synthesis doc. The manual version of this is re-reading everything and copy-pasting good quotes into a Notion page for two hours.

**Roadmap / Review tool** — you pull data from three or four places (Linear, a spreadsheet, last quarter's doc) to prep a roadmap review or prioritisation session. The manual version is a Friday afternoon spent reformatting the same information into slightly different views for different audiences.

**Meeting / Planning tool** — you prep for or document planning meetings: pulling context before a meeting, or turning a messy transcript into decisions and action items after one. The manual version is the 20 minutes after every meeting spent writing up notes nobody reads.

## The tool brief format

Your brief has five parts. Do not skip any.

**1. The problem in one sentence.** "Synthesising 15 user interviews into a themes doc takes me half a day and I do it every sprint" is a good problem statement. "Research is disorganised" is not.

**2. Who uses it.** Your own name, or one named PM, EM, or designer. Not "the product team."

**3. What goes in.** Interview transcripts, a Linear/Jira export, a PRD draft, meeting notes — name the actual file type or format.

**4. What comes out.** One specific artifact: a synthesis doc with themes and quotes, a formatted review deck section, a meeting brief with decisions and owners. Not "a dashboard."

**5. Done criteria.** "I use it before every roadmap review and it cuts my prep time from 90 to 20 minutes" is measurable. "It's more organised" is not.

## How to use Claude to write your brief

Open Claude and paste this, filling in your details:

> I'm a Product Manager. Every [sprint / week / review cycle], I have to [describe the research/roadmap/meeting task]. It takes about [time]. The hardest part is [the bottleneck]. I want to build an AI tool that handles this. Help me write a one-page tool brief with: problem statement, intended user, inputs, outputs, and done criteria. Be specific and push back if anything is too vague or too broad.

Review the output. Edit every sentence until it's accurate and specific enough that a colleague could read it and know exactly what you're building.`,
    steps: [
      {
        order: 1,
        instruction:
          "Pick your archetype: Research helper, Roadmap/Review tool, or Meeting/Planning tool. Write your problem statement in one sentence with a real number in it. Time-box this to 10 minutes.",
        expectedAction: "Choose an archetype and write one specific, falsifiable problem statement",
        expectedResult: "A sentence describing what you do manually today and how long it takes.",
        commonErrorNote:
          "If your sentence contains 'better', 'improve', or 'more organised', rewrite it to describe the current painful reality instead.",
        aiHintRef: "Paste your problem statement into Claude and ask: 'Is this specific enough to build a tool for a PM? What's missing?'",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction: "Name the intended user — your own name, or one specific PM, EM, or designer you'd build this for.",
        expectedAction: "Write down who will use this tool",
        expectedResult: "One named person, not 'the product team' or 'stakeholders'.",
        commonErrorNote: "If you wrote a role instead of a name, pick the one person you'd actually hand this to first.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 3,
        instruction:
          "List the inputs your tool needs — interview transcripts, a Linear export, a PRD, meeting notes. Be concrete about the format.",
        expectedAction: "List every input the tool will require",
        expectedResult: "A short list of concrete inputs, each one something you could paste or attach directly.",
        commonErrorNote: "If an input is 'all the context about the project', break it into the specific documents that context actually lives in.",
        aiHintRef: "Ask Claude: 'Given this PM problem, what are the minimum inputs a tool would need to produce a useful synthesis or brief?'",
        completionRule: "manual",
      },
      {
        order: 4,
        instruction: "Define the output format and your done criteria — how you'll know in week 4 this actually saved you time.",
        expectedAction: "Write the specific output format and a measurable done criterion",
        expectedResult: "One output description and one done criterion with a number or observable behaviour in it.",
        commonErrorNote: "'Saves 45 minutes per review cycle' is measurable. 'Makes prep easier' is not.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 5,
        instruction: "Post your brief in the cohort Slack. Read two other briefs — PM or otherwise — and leave one piece of feedback on each.",
        expectedAction: "Post the completed brief and give feedback on two others",
        expectedResult: "Your brief is visible to the cohort and you've responded to two others.",
        commonErrorNote: "If your brief isn't perfect, post a draft anyway — feedback on a rough draft beats a week of solo editing.",
        aiHintRef: "",
        completionRule: "manual",
      },
    ],
  },
  {
    title: "Build the first version",
    slug: "pm-week-1-build-first",
    weekId: 1,
    trackSlug: "product-pm",
    purpose: "Get a rough version running on real research, roadmap, or meeting inputs from your actual job. Not polished — working.",
    estimatedTimeMinutes: 180,
    expectedOutput:
      "A working prototype that turns real transcripts, exports, or notes into your target output. You know the top 3 things wrong with it.",
    guideType: "build",
    difficulty: "intermediate",
    isRequired: true,
    retrievalTags: ["build", "prototype", "week-1", "pm", "cursor", "claude", "synthesis"],
    commonMistakes: [
      "Spending days on environment setup before running a single test on real transcripts.",
      "Building for a hypothetical 'perfect' interview when your real ones are messy, partial, and inconsistently formatted.",
      "Trying to synthesise every theme instead of the 3–5 that actually drive a decision.",
      "Testing with one clean example instead of the range of inputs you actually get.",
    ],
    doneChecklist: [
      "Your tool runs on at least one real transcript, export, or meeting note from your actual job",
      "You have tested it on 10 real inputs of varying quality",
      "You can name the top 3 things wrong with the output",
      "You have fixed the single most important problem",
      "You can show a PM peer the output in 2 minutes and they understand it immediately",
    ],
    contentBody: `## What "working" means this week

Working means: you feed it a real interview transcript, Linear export, or meeting recording, and it produces a synthesis, brief, or summary you'd actually send to a peer. Not perfect — useful enough that you look at it and think "this is the right structure" or "this is wrong, and I know exactly why."

## Start with the prompt, not the code

Before opening Cursor, write your system prompt in Claude chat. For a research helper or meeting tool, the prompt is doing most of the work — the code just automates feeding it in and formatting what comes out.

> You are a Product Manager's research/meeting assistant. You receive [raw transcripts / meeting notes / a Linear export] and produce [a themes doc with quotes / a decision-and-action-items brief / a formatted review summary].
>
> Format: [describe the exact output structure — headers, bullet themes, quote blocks, a decisions table]
>
> Rules:
> - Group by theme, not by speaker
> - Every theme needs at least one direct quote as evidence
> - Flag anything ambiguous instead of guessing
>
> If the input is incomplete or a transcript is cut off: say so explicitly rather than inventing content.

Test this prompt with 5 real inputs in Claude chat first. Refine until the structure is right, then take it to Cursor.

## Getting started in Cursor

> I'm building a tool for PM research/meeting synthesis. The input is [transcripts / meeting notes / a spreadsheet export]. The output should be [describe format]. Here is my system prompt: [paste it]. Build a simple script that takes the input, sends it to Claude API with this prompt, and prints the output. No UI yet.

Let it write the code, run it, and don't edit yet.

## The 10-input test

Run it on 10 real inputs — a mix of your cleanest transcript and your messiest one. Real PM inputs are often partial (a transcript cut off mid-sentence, notes with half the attendees unnamed). That's exactly what you need to test against.

After 10 runs you'll know what the prompt handles well, what it consistently misses, and where the output format breaks on messy input. Fix the single most important problem, then test 10 more times.

## When the code doesn't run

Paste the full error into Cursor: "This error appeared when I ran the code. What's wrong and how do I fix it?" Most first-run errors are dependency or path issues, not logic problems — Cursor fixes these in one or two messages.

## What not to do this week

Don't spend time on: a polished UI, handling every possible transcript format, or synthesising more themes than actually matter. Spend time on: getting the synthesis structure right on your messiest real input.`,
    steps: [
      {
        order: 1,
        instruction: "Set up your environment: install Cursor, get a Claude API key from console.anthropic.com, and create a project folder with a .env file.",
        expectedAction: "Cursor installed, API key in .env, project folder ready",
        expectedResult: "You can open Cursor and start a conversation with the agent.",
        commonErrorNote: "If you're stuck on setup for more than 30 minutes, post in the cohort Slack with a screenshot. Don't lose a day to environment problems.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction: "Write your system prompt in Claude chat using your brief. Test it on 5 real transcripts, exports, or meeting notes and refine until the structure is right.",
        expectedAction: "Write and test a system prompt against 5 real inputs",
        expectedResult: "A system prompt producing a useful synthesis or brief for at least 3 of 5 inputs.",
        commonErrorNote: "If none of the 5 are useful, your inputs may be too varied or your problem still too broad — narrow it.",
        aiHintRef: "Ask Claude to critique your prompt: 'What's ambiguous here that could cause inconsistent theming or missed decisions?'",
        completionRule: "manual",
      },
      {
        order: 3,
        instruction: "Ask Cursor to build a script that takes your input, calls Claude API with your prompt, and prints the output.",
        expectedAction: "Ask Cursor to implement the tool",
        expectedResult: "A runnable script calling Claude API with your system prompt.",
        commonErrorNote: "If it doesn't run, paste the error back into Cursor — this normally takes one or two rounds.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 4,
        instruction: "Test on 10 real inputs — mix your cleanest and messiest transcripts or notes. Document what works and what doesn't per run before fixing anything.",
        expectedAction: "Run 10 tests with real inputs and document results",
        expectedResult: "A list of what the tool synthesises well and what it consistently gets wrong.",
        commonErrorNote: "A partial, messy transcript is a better test than a clean one — that's what you'll actually feed it.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 5,
        instruction: "Fix the single most important problem from your 10 tests. Retest.",
        expectedAction: "Fix the top problem and retest",
        expectedResult: "The main failure mode is reduced or eliminated; new ones are noted for week 2.",
        commonErrorNote: "Change one thing at a time — otherwise you won't know what fixed it.",
        aiHintRef: "Ask Claude: 'Here's my prompt and an output that missed a key theme. What part of the prompt caused this?'",
        completionRule: "manual",
      },
      {
        order: 6,
        instruction: "Record a 2-minute screen recording of the tool running on a real transcript or export. Post it in the cohort Slack.",
        expectedAction: "Record and share a 2-minute demo",
        expectedResult: "The cohort can see your tool working on a real PM input.",
        commonErrorNote: "Rough is fine — post it anyway.",
        aiHintRef: "",
        completionRule: "manual",
      },
    ],
  },
  {
    title: "Make it usable",
    slug: "pm-week-2-usable",
    weekId: 2,
    trackSlug: "product-pm",
    purpose: "Turn your prototype into something a fellow PM, EM, or designer can run without your help.",
    estimatedTimeMinutes: 180,
    expectedOutput: "Tool that runs reliably on realistic research or meeting inputs, with instructions a colleague can follow independently.",
    guideType: "build",
    difficulty: "intermediate",
    isRequired: true,
    retrievalTags: ["usability", "week-2", "pm", "friction", "testing", "handoff"],
    commonMistakes: [
      "Adding more synthesis features instead of removing friction in how inputs get in.",
      "Only testing with your own transcripts — you already know the shape of your data.",
      "Writing instructions that assume the reader knows your interview or meeting format.",
      "Polishing output formatting before fixing where the tool breaks on a real transcript.",
    ],
    doneChecklist: [
      "A PM/EM/designer colleague ran the tool without your help and got a useful output",
      "Every input step is documented in one sentence",
      "You watched someone use it and wrote down where they got stuck",
      "You fixed the one friction point most likely to stop regular use",
      "The tool works on a short transcript, a long one, and one with a messy or unusual format",
    ],
    contentBody: `## The usability test — do this first

Ask a PM peer, EM, or designer to run your tool on their own transcript, export, or meeting notes. Give them no instructions. Watch what happens — where do they get stuck, what do they expect that doesn't happen, what's the first question they ask? Don't answer — write it down. That list is your week 2 work.

## The friction audit

Write down every step between "I have a transcript" and "I have a synthesis doc." Include the boring ones: "export from Grain," "paste into the input file," "run the script." For each, ask: can this be removed or automated?

## Writing instructions that work

For each step you can't remove, one sentence, written for someone who's never seen the tool. Use this shape:
1. [What to do] — [why, if not obvious]
2. Paste your [transcript / export / notes] here: [show a correctly formatted example]
3. The output appears in [location]. Copy it into [where you'd actually use it — a Notion doc, a Slack message, a review deck].

## The one-change rule

Fix only the one problem most likely to stop someone using this weekly. Then test again. Don't add features to compensate for friction — remove the friction.

## Testing with real research/meeting data

Test on four cases: your most typical transcript, your shortest one, your longest (a 90-minute session), and one with a format quirk — multiple speakers unlabelled, a recording that cuts out, notes with half the fields missing. If it breaks on any, fix before week 3.

## Handling failure gracefully

What happens on an incomplete transcript, or when Claude misses a theme? Your tool should fail clearly: tell the user what went wrong, not produce a confident-looking but empty synthesis. Ask Cursor: "Add a clear message when the input is too short or missing key sections to synthesise properly."`,
    steps: [
      {
        order: 1,
        instruction: "Find one PM, EM, or designer colleague with a real transcript or meeting note. Have them run your tool with no help. Watch and take notes.",
        expectedAction: "Run an unassisted usability test with a real person",
        expectedResult: "At least 3 places where they got stuck or asked a question.",
        commonErrorNote: "If no colleague is available, come back after two days away and follow only your own written instructions.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction: "List every step from raw transcript to finished synthesis. Write each as a sentence and count them.",
        expectedAction: "Write out every user step end-to-end",
        expectedResult: "A numbered list of every action required.",
        commonErrorNote: "More than 8 steps usually means some can be automated — start there.",
        aiHintRef: "Ask Claude: 'Given this list of steps, which could be automated in a tool built with Cursor?'",
        completionRule: "manual",
      },
      {
        order: 3,
        instruction: "Fix the single highest-friction step — remove it, automate it, or write a clearer instruction.",
        expectedAction: "Remove or fix the highest-friction step",
        expectedResult: "The step that caused the most confusion is gone or clearer.",
        commonErrorNote: "Try removing the step before adding a feature to work around it.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 4,
        instruction: "Write usage instructions, one sentence per step, with a correctly formatted example input.",
        expectedAction: "Write and position usage instructions",
        expectedResult: "A new user can get a result on their first try.",
        commonErrorNote: "Delete 'simply' and 'just' — if it were simple you wouldn't need to explain it.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 5,
        instruction: "Test on a typical transcript, a short one, a long one, and one with a format quirk. Document what happens in each.",
        expectedAction: "Run four structured tests and document results",
        expectedResult: "You know exactly where the tool holds up and where it breaks, with clear errors instead of silent bad output.",
        commonErrorNote: "A confident wrong synthesis is worse than an error message — add a validation step if needed.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 6,
        instruction: "Record a 3–5 minute Loom walking through the tool with your instructions. Post it in the cohort Slack alongside the tool link.",
        expectedAction: "Record a Loom and share it",
        expectedResult: "Cohort members can understand and access your tool from the Slack post alone.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
    ],
  },
  {
    title: "Get feedback and improve",
    slug: "pm-week-3-review",
    weekId: 3,
    trackSlug: "product-pm",
    purpose: "Get real feedback from PMs, EMs, or designers who'd actually use this. Fix the real problems, not the imagined ones.",
    estimatedTimeMinutes: 120,
    expectedOutput: "Tool reviewed by at least two people who'd genuinely use it, with documented feedback and one substantive improvement.",
    guideType: "review",
    difficulty: "intermediate",
    isRequired: true,
    retrievalTags: ["review", "feedback", "week-3", "pm", "peer-review", "validation"],
    commonMistakes: [
      "Only showing it to your manager if your manager isn't the actual user of this workflow.",
      "Defending the tool during feedback instead of listening.",
      "Acting on every note instead of finding the one that most affects real use.",
      "Polishing the doc formatting when the real problem is that a theme got missed.",
    ],
    doneChecklist: [
      "Two PMs, EMs, or designers who'd actually use this gave you structured feedback",
      "You documented everything you heard, including what you disagree with",
      "You made one change directly based on the feedback",
      "You can explain what the tool does in three sentences to a non-PM",
      "You attended or watched the peer review workshop",
    ],
    contentBody: `## Why feedback scares most people

Show this to people who'd actually use it in their own planning or research work — not your most supportive colleague. Someone who'd judge it on whether it saves them real prep time.

## The feedback session format

20 minutes:

**Context (5 min):** Describe the problem in one paragraph. "Every sprint I spend half a day synthesising interviews. I built something that does the first pass in ten minutes."

**Observation (10 min):** They run it on their own transcript or export. You don't help. You take notes.

**Questions (5 min):**
1. What would stop you from using this before your next review or planning session?
2. What would you change first?
3. Did it miss anything you expected it to catch?

Don't defend the tool. Write everything down.

## What to do with feedback

Sort into: real blockers (would stop regular use), nice-to-haves, and misunderstandings (better instructions would fix them). Fix one real blocker. Rewrite one instruction that caused confusion. Ignore nice-to-haves until after you ship.

## Office hours this week

Bring your feedback list with a specific question: "I got this note about missed themes on long transcripts — fix the prompt or add a length check?"

## The peer review workshop

Review two other cohort members' tools; two review yours. Prepare: make sure your tool runs on an input you didn't write, write a one-paragraph plain description, and have a real input ready.

## The confidence test

By end of week you should be able to say: "This tool synthesises interview transcripts into themed docs. It works reliably on 90-minute sessions. Two PMs have used it and both got something they could act on." If you can say that, you're ready for week 4.`,
    steps: [
      {
        order: 1,
        instruction: "Identify two PMs, EMs, or designers who'd actually use this. They don't need to be in the cohort. Book 20 minutes each.",
        expectedAction: "Book two 20-minute feedback sessions",
        expectedResult: "Two sessions scheduled with people who have this problem.",
        commonErrorNote: "If you can't find two outside the cohort, use two cohort members — but they must run it on their own input, not yours.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction: "Run both sessions using the format above. Take verbatim notes.",
        expectedAction: "Run two structured feedback sessions and document results",
        expectedResult: "Raw notes with everything they said, including disagreements.",
        commonErrorNote: "If you caught yourself explaining or defending, write down what you felt the need to defend — that's a signal.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 3,
        instruction: "Sort feedback into blockers, nice-to-haves, misunderstandings. Pick the one blocker most likely to prevent regular use.",
        expectedAction: "Categorise feedback and identify the top blocker",
        expectedResult: "A clear decision on what you're fixing this week.",
        commonErrorNote: "All-positive feedback usually means you asked the wrong people or they were being polite — ask directly what would stop them using it.",
        aiHintRef: "Ask Claude: 'Here's my feedback. Help me sort real blockers from nice-to-haves for a PM tool.'",
        completionRule: "manual",
      },
      {
        order: 4,
        instruction: "Fix the top blocker. Retest with one of your original reviewers.",
        expectedAction: "Implement one change and verify it with a reviewer",
        expectedResult: "The blocker is resolved and the reviewer confirms it.",
        commonErrorNote: "If the fix introduces a new problem, note it for the handoff doc rather than chasing it into week 4.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 5,
        instruction: "Attend or watch the peer review workshop replay. Review two other cohort members' tools.",
        expectedAction: "Participate in peer review",
        expectedResult: "You've reviewed two tools and posted notes in the Slack thread.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
    ],
  },
  {
    title: "Ship it",
    slug: "pm-week-4-ship",
    weekId: 4,
    trackSlug: "product-pm",
    purpose: "Officially ship. Put the tool where your team actually works, document it, and record the demo.",
    estimatedTimeMinutes: 120,
    expectedOutput: "Shipped tool at a permanent location + handoff doc + 5-minute Loom demo.",
    guideType: "submit",
    difficulty: "intermediate",
    isRequired: true,
    retrievalTags: ["ship", "week-4", "pm", "demo", "loom", "handoff", "certification"],
    commonMistakes: [
      "Polishing instead of shipping — done beats perfect.",
      "Skipping the handoff doc, so the tool dies the first week you're busy.",
      "Over-preparing the Loom — one take is fine.",
      "Submitting without a real transcript example in the handoff doc.",
    ],
    doneChecklist: [
      "The tool lives somewhere permanent, not your local machine",
      "A PM colleague can find and run it without your help",
      "The handoff doc includes a real transcript/export example and its output",
      "The Loom demo is recorded and shared in #ships",
      "Certification submitted via the hub",
    ],
    contentBody: `## What shipping actually means

Three things: it lives somewhere permanent, someone else can use it without you, and you have a demo that shows it working.

## Step 1 — Give it a home

- **Notion page**, embedded or linked, with instructions — right for a prompt-driven synthesis tool your team pastes into
- **Shared Google Doc/Sheet** — right if the output feeds directly into a doc-based workflow like a roadmap review
- **Deployed URL** — right only if colleagues need to run it themselves without you or a script

Don't deploy a web app if a Notion page with a documented prompt does the same job.

## Step 2 — Write the handoff doc

One page, three sections. **What it does:** one paragraph — what research/meeting problem it solves, for whom. **How to use it:** numbered steps with a real transcript/export example and the output it produced. **What it doesn't do:** the input formats it breaks on, what still needs human review before you send a synthesis to stakeholders.

## Step 3 — Record the demo

5-minute Loom, no script needed: (30s) the problem and who it's for, (2 min) live demo on a real transcript, (1 min) what you'd build next, (1 min) what surprised you. One take, maybe two.

## Step 4 — Share in Slack

Post in #ships: tool name, one sentence on what it does, the link, the Loom.

## Step 5 — Submit for certification

Use the submit button in your hub. Reviewed within 48 hours against: runs on real inputs, at least one other person has used it, a Loom showing it working end-to-end, a handoff doc someone else can follow.

## What comes next

You now know how to scope a research or planning problem, prompt Claude for synthesis work, build it, and get it in front of real users — a repeatable skill for every future PM tool. Torvi membership covers what's next: peer reviews, templates for your next build, future cohort workshops.`,
    steps: [
      {
        order: 1,
        instruction: "Choose where your tool lives permanently based on how your team actually works — Notion, shared doc, or deployed URL. Set it up so a colleague can access it right now.",
        expectedAction: "Create a permanent home for your tool",
        expectedResult: "Your tool is accessible via a link with no explanation needed.",
        commonErrorNote: "More than an hour on deployment means you picked too complex a home — go simpler.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction: "Write the handoff doc: what it does, how to use it (with a real transcript example), what it doesn't do. One page.",
        expectedAction: "Write and publish the handoff doc",
        expectedResult: "A one-page doc that lets a new PM understand and use the tool without you.",
        commonErrorNote: "No real example means the doc is theory, not instructions.",
        aiHintRef: "Ask Claude: 'Here's my handoff doc — what's missing for a PM seeing this for the first time?'",
        completionRule: "manual",
      },
      {
        order: 3,
        instruction: "Record your 5-minute Loom demo on a real transcript. One or two takes.",
        expectedAction: "Record and upload a Loom demo",
        expectedResult: "A Loom showing the tool working end-to-end on real data.",
        commonErrorNote: "Publish the rough one rather than re-recording a fourth time.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 4,
        instruction: "Post in #ships: tool name, one-sentence description, tool link, Loom link.",
        expectedAction: "Post your ship announcement",
        expectedResult: "Your tool is visible to the full cohort.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 5,
        instruction: "Submit for certification in the hub with your tool link, handoff doc, and Loom.",
        expectedAction: "Submit certification via the hub",
        expectedResult: "Submission received; certificate within 48 hours.",
        commonErrorNote: "Submit even if you're unsure it fully qualifies — the review team will tell you what's missing.",
        aiHintRef: "",
        completionRule: "manual",
      },
    ],
  },
];

// ════════════════════════════════════════════════════════════════════════
// OPS / WORKFLOW TRACK
// Archetypes: Intake workflow · Reporting helper · Task routing tool
// ════════════════════════════════════════════════════════════════════════

const OPS_CURRICULUM: GuideData[] = [
  {
    title: "Define your tool",
    slug: "ops-week-0-define",
    weekId: 0,
    trackSlug: "ops-workflow",
    purpose: "Lock down exactly which ops task you're automating before touching any tools. The brief is your north star for the next four weeks.",
    estimatedTimeMinutes: 90,
    expectedOutput: "One-page tool brief: problem statement, intended user, inputs, outputs, and done criteria — scoped to one repeating ops task.",
    guideType: "setup",
    difficulty: "beginner",
    isRequired: true,
    retrievalTags: ["brief", "define", "week-0", "ops", "workflow", "scope"],
    commonMistakes: [
      "Picking 'automate all of ops' instead of one repeating task — a report generator, not an operations platform.",
      "Writing a vague problem statement like 'intake is messy' instead of a specific one with a number in it.",
      "Building for a team instead of naming yourself or one specific colleague as the user.",
      "Choosing a task you handle rarely instead of the Friday-afternoon job that eats time every single week.",
    ],
    doneChecklist: [
      "Problem statement is one specific sentence describing the current painful reality, with a number in it",
      "Intended user is named — you, or one specific ops teammate by name",
      "Inputs are listed as concrete items (an email inbox, a ticket export, a spreadsheet)",
      "Output is one specific deliverable — a triaged list, a formatted report, a routing decision — not a dashboard",
      "Done criteria is measurable — you will know in week 4 whether this worked",
    ],
    contentBody: `## Why this matters

Most cohort members who don't finish fail here — not in week 4. Ops work touches everything, so it's tempting to scope "fix our whole intake process." This week's only job is to find the one recurring task that eats real hours and scope a tool to just that.

## Where ops tools usually live

Your archetype is one of three shapes:

**Intake workflow** — requests come in through email, a form, or Slack, and you triage, categorise, and route them. The manual version is reading each one, deciding what it is, and forwarding it to the right person.

**Reporting helper** — you pull data from a few sources every week and turn it into a status report or update. The manual version is a recurring block of time — often Friday afternoon — spent reformatting the same information.

**Task routing tool** — you decide who a task or ticket should go to based on rules that live in your head. The manual version is you personally being the router, every time, for every ticket.

## The tool brief format

Your brief has five parts. Do not skip any.

**1. The problem in one sentence.** "Triaging the support inbox takes me 90 minutes every morning and duplicate tickets slip through weekly" is a good problem statement. "Intake is inefficient" is not.

**2. Who uses it.** Your own name, or one named colleague on the ops team. Not "the team."

**3. What goes in.** An email export, a ticket system export, a spreadsheet of requests — name the actual source and format.

**4. What comes out.** One specific output: a triaged and categorised list, a formatted weekly report, a routing recommendation. Not "a dashboard."

**5. Done criteria.** "I run this every Monday and it cuts triage from 90 to 20 minutes" is measurable. "It's more efficient" is not.

## How to use Claude to write your brief

Open Claude and paste this, filling in your details:

> I work in Ops. Every [day / week], I have to [describe the intake/reporting/routing task]. It takes about [time]. The hardest part is [the bottleneck]. I want to build an AI tool that handles this. Help me write a one-page tool brief with: problem statement, intended user, inputs, outputs, and done criteria. Be specific and push back if anything is too vague or too broad.

Edit every sentence until it's accurate and specific enough that a colleague could read it and know exactly what you're building.`,
    steps: [
      {
        order: 1,
        instruction: "Pick your archetype: Intake workflow, Reporting helper, or Task routing tool. Write your problem statement in one sentence with a real number in it. Time-box to 10 minutes.",
        expectedAction: "Choose an archetype and write one specific, falsifiable problem statement",
        expectedResult: "A sentence describing what you do manually today and how long it takes.",
        commonErrorNote: "If your sentence contains 'better' or 'more efficient', rewrite it to describe the current reality instead.",
        aiHintRef: "Paste your problem statement into Claude and ask: 'Is this specific enough to build an ops tool for? What's missing?'",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction: "Name the intended user — your own name, or one specific ops teammate.",
        expectedAction: "Write down who will use this tool",
        expectedResult: "One named person, not 'the ops team'.",
        commonErrorNote: "If you wrote a team, pick the one person who'd run this first.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 3,
        instruction: "List the inputs — an inbox export, a ticket system export, a spreadsheet. Be concrete about the format.",
        expectedAction: "List every input the tool will require",
        expectedResult: "A short list of concrete inputs, each one something you could export or paste directly.",
        commonErrorNote: "If an input is 'everything in the system', break it into the specific fields or exports you actually need.",
        aiHintRef: "Ask Claude: 'Given this ops problem, what are the minimum inputs a tool would need to triage or report accurately?'",
        completionRule: "manual",
      },
      {
        order: 4,
        instruction: "Define the output format and your done criteria — how you'll know in week 4 this actually saved you time.",
        expectedAction: "Write the specific output format and a measurable done criterion",
        expectedResult: "One output description and one done criterion with a number in it.",
        commonErrorNote: "'Cuts triage time by an hour a day' is measurable. 'Makes intake smoother' is not.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 5,
        instruction: "Post your brief in the cohort Slack. Read two other briefs and leave one piece of feedback on each.",
        expectedAction: "Post the completed brief and give feedback on two others",
        expectedResult: "Your brief is visible to the cohort and you've responded to two others.",
        commonErrorNote: "Post a draft if it's not ready — feedback on a rough draft beats a week of solo editing.",
        aiHintRef: "",
        completionRule: "manual",
      },
    ],
  },
  {
    title: "Build the first version",
    slug: "ops-week-1-build-first",
    weekId: 1,
    trackSlug: "ops-workflow",
    purpose: "Get a rough version running on real tickets, emails, or reports from your actual job. Not polished — working.",
    estimatedTimeMinutes: 180,
    expectedOutput: "A working prototype that triages, reports, or routes real inputs. You know the top 3 things wrong with it.",
    guideType: "build",
    difficulty: "intermediate",
    isRequired: true,
    retrievalTags: ["build", "prototype", "week-1", "ops", "cursor", "claude", "automation"],
    commonMistakes: [
      "Spending days on environment setup before running a single test on real tickets.",
      "Building rules for clean, well-formed requests when your real inbox is full of vague or incomplete ones.",
      "Trying to handle every category on day one instead of the 3–4 that make up most of your volume.",
      "Testing with invented examples instead of last week's actual tickets or emails.",
    ],
    doneChecklist: [
      "Your tool runs on at least one real ticket, email batch, or report input from your actual job",
      "You have tested it on 10 real inputs of varying quality",
      "You can name the top 3 things wrong with the output",
      "You have fixed the single most important problem",
      "You can show an ops colleague the output in 2 minutes and they trust it",
    ],
    contentBody: `## What "working" means this week

Working means: you feed it a real batch of tickets, emails, or source data, and it produces a triaged list, report, or routing decision you'd actually act on. Not perfect — useful enough that you can look at it and say "this is right" or "this is wrong, and I know why."

## Start with the prompt, not the code

Before opening Cursor, write your system prompt in Claude chat.

> You are an Ops triage/reporting/routing assistant. You receive [raw tickets / an email batch / a data export] and produce [a categorised and prioritised list / a formatted status report / a routing recommendation with reasoning].
>
> Format: [describe the exact output structure — category, priority, owner, one-line reason]
>
> Rules:
> - [your actual triage/routing rules, as specific as you can make them]
> - Flag anything ambiguous instead of guessing a category
>
> If the input is incomplete or unclear: flag it for human review rather than forcing a decision.

Test with 5 real tickets or reports in Claude chat first. Refine until it's directionally right, then take it to Cursor.

## Getting started in Cursor

> I'm building an ops tool for triage/reporting/routing. The input is [tickets / emails / a spreadsheet]. The output should be [describe format]. Here is my system prompt: [paste it]. Build a simple script that takes the input, sends it to Claude API with this prompt, and prints the output. No UI yet.

Let it write the code, run it, don't edit yet.

## The 10-input test

Run it on 10 real tickets or a real week of data — including the ambiguous, half-complete ones that are actually hard to triage. That's the real test. After 10 runs you'll know what it categorises correctly, what it consistently misroutes, and where the format breaks. Fix the single most important problem, then test 10 more.

## When the code doesn't run

Paste the full error into Cursor: "This error appeared when I ran the code. What's wrong and how do I fix it?" Most first-run errors are dependency or path issues, fixed in one or two messages.

## What not to do this week

Don't spend time on: handling every possible category, a polished dashboard, or configuration options nobody asked for. Spend time on: getting triage/routing right on your messiest real tickets.`,
    steps: [
      {
        order: 1,
        instruction: "Set up your environment: install Cursor, get a Claude API key from console.anthropic.com, and create a project folder with a .env file.",
        expectedAction: "Cursor installed, API key in .env, project folder ready",
        expectedResult: "You can open Cursor and start a conversation with the agent.",
        commonErrorNote: "If you're stuck more than 30 minutes, post in the cohort Slack with a screenshot. Don't lose a day to setup.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction: "Write your system prompt in Claude chat using your brief and real triage/routing rules. Test on 5 real tickets or reports.",
        expectedAction: "Write and test a system prompt against 5 real inputs",
        expectedResult: "A system prompt producing a correct triage or report for at least 3 of 5 inputs.",
        commonErrorNote: "If none are useful, your rules may be too implicit — write down the actual decision logic you use.",
        aiHintRef: "Ask Claude to critique your prompt: 'What's ambiguous here that could cause inconsistent triage or routing?'",
        completionRule: "manual",
      },
      {
        order: 3,
        instruction: "Ask Cursor to build a script that takes your input, calls Claude API with your prompt, and prints the output.",
        expectedAction: "Ask Cursor to implement the tool",
        expectedResult: "A runnable script calling Claude API with your system prompt.",
        commonErrorNote: "If it doesn't run, paste the error back into Cursor — normally one or two rounds.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 4,
        instruction: "Test on 10 real tickets or a real week of report data. Document what works and what doesn't before fixing anything.",
        expectedAction: "Run 10 tests with real inputs and document results",
        expectedResult: "A list of what the tool triages/reports well and what it consistently gets wrong.",
        commonErrorNote: "Ambiguous, half-complete tickets are the real test — don't skip them for cleaner examples.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 5,
        instruction: "Fix the single most important problem from your 10 tests. Retest.",
        expectedAction: "Fix the top problem and retest",
        expectedResult: "The main failure mode is reduced or eliminated; new ones noted for week 2.",
        commonErrorNote: "Change one thing at a time so you know what actually fixed it.",
        aiHintRef: "Ask Claude: 'Here's my prompt and a ticket it misrouted. What part of the rules caused this?'",
        completionRule: "manual",
      },
      {
        order: 6,
        instruction: "Record a 2-minute screen recording of the tool running on real tickets or data. Post it in the cohort Slack.",
        expectedAction: "Record and share a 2-minute demo",
        expectedResult: "The cohort can see your tool working on real ops input.",
        commonErrorNote: "Rough is fine — post it anyway.",
        aiHintRef: "",
        completionRule: "manual",
      },
    ],
  },
  {
    title: "Make it usable",
    slug: "ops-week-2-usable",
    weekId: 2,
    trackSlug: "ops-workflow",
    purpose: "Turn your prototype into something a colleague can run without your help.",
    estimatedTimeMinutes: 180,
    expectedOutput: "Tool that runs reliably on realistic ops inputs, with instructions a colleague can follow independently.",
    guideType: "build",
    difficulty: "intermediate",
    isRequired: true,
    retrievalTags: ["usability", "week-2", "ops", "friction", "testing", "handoff"],
    commonMistakes: [
      "Adding more categories or rules instead of removing friction in how tickets get in.",
      "Only testing with your own inbox — you already know its quirks.",
      "Writing instructions that assume the reader knows your team's triage conventions.",
      "Polishing report formatting before fixing where the tool breaks on a real ticket batch.",
    ],
    doneChecklist: [
      "An ops colleague ran the tool without your help and got a useful, trustworthy output",
      "Every input step is documented in one sentence",
      "You watched someone use it and wrote down where they got stuck",
      "You fixed the one friction point most likely to stop daily/weekly use",
      "The tool works on a small batch, a large batch, and one with a format quirk",
    ],
    contentBody: `## The usability test — do this first

Ask an ops colleague to run your tool on their own tickets or report data. Give no instructions. Watch where they get stuck, what they expect that doesn't happen, and their first question. Don't answer — write it down. That's your week 2 work.

## The friction audit

Write down every step from "tickets exist" to "triaged list in hand." Include the boring ones: "export from Zendesk," "paste into input file," "run the script." For each, ask: can this be removed or automated?

## Writing instructions that work

For each step you can't remove, one sentence, written for someone who's never seen the tool:
1. [What to do] — [why, if not obvious]
2. Paste your [ticket export / email batch] here: [show a correctly formatted example]
3. The output appears in [location]. Use it to [action — assign owners, send the report].

## The one-change rule

Fix only the one problem most likely to stop daily or weekly use. Then retest. Don't add rules to compensate for friction — remove the friction.

## Testing with real ops data

Test on: a typical day's ticket volume, a light day, a heavy day, and a batch with a format quirk (a ticket with no category field, an email forwarded three times). If it breaks on any, fix before week 3.

## Handling failure gracefully

What happens on a ticket that doesn't fit any category, or a report source that's missing data? Your tool should flag it clearly for human review rather than guessing silently. Ask Cursor: "Add a clear flag when a ticket can't be confidently categorised, instead of forcing a guess."`,
    steps: [
      {
        order: 1,
        instruction: "Find one ops colleague with real tickets or report data. Have them run your tool with no help. Watch and take notes.",
        expectedAction: "Run an unassisted usability test with a real person",
        expectedResult: "At least 3 places where they got stuck or asked a question.",
        commonErrorNote: "If no colleague is available, come back after two days and follow only your own written instructions.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction: "List every step from raw tickets to finished triage/report. Write each as a sentence and count them.",
        expectedAction: "Write out every user step end-to-end",
        expectedResult: "A numbered list of every action required.",
        commonErrorNote: "More than 8 steps usually means some can be automated — start there.",
        aiHintRef: "Ask Claude: 'Given this list of steps, which could be automated in a tool built with Cursor?'",
        completionRule: "manual",
      },
      {
        order: 3,
        instruction: "Fix the single highest-friction step — remove it, automate it, or write a clearer instruction.",
        expectedAction: "Remove or fix the highest-friction step",
        expectedResult: "The step that caused the most confusion is gone or clearer.",
        commonErrorNote: "Try removing the step before adding a rule to work around it.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 4,
        instruction: "Write usage instructions, one sentence per step, with a correctly formatted example input.",
        expectedAction: "Write and position usage instructions",
        expectedResult: "A new user can get a result on their first try.",
        commonErrorNote: "Delete 'simply' and 'just' — if it were simple you wouldn't need to explain it.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 5,
        instruction: "Test on a typical volume, a light day, a heavy day, and a batch with a format quirk. Document what happens in each.",
        expectedAction: "Run four structured tests and document results",
        expectedResult: "You know exactly where the tool holds up and where it breaks, with clear flags instead of silent bad output.",
        commonErrorNote: "A confidently wrong triage is worse than a flagged ticket — add a validation step if needed.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 6,
        instruction: "Record a 3–5 minute Loom walking through the tool with your instructions. Post it in the cohort Slack alongside the tool link.",
        expectedAction: "Record a Loom and share it",
        expectedResult: "Cohort members can understand and access your tool from the Slack post alone.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
    ],
  },
  {
    title: "Get feedback and improve",
    slug: "ops-week-3-review",
    weekId: 3,
    trackSlug: "ops-workflow",
    purpose: "Get real feedback from ops colleagues who'd actually use this. Fix the real problems, not the imagined ones.",
    estimatedTimeMinutes: 120,
    expectedOutput: "Tool reviewed by at least two people who'd genuinely use it, with documented feedback and one substantive improvement.",
    guideType: "review",
    difficulty: "intermediate",
    isRequired: true,
    retrievalTags: ["review", "feedback", "week-3", "ops", "peer-review", "validation"],
    commonMistakes: [
      "Only showing it to your manager if they don't personally do this task.",
      "Defending the tool during feedback instead of listening.",
      "Acting on every note instead of finding the one that most affects daily use.",
      "Polishing report formatting when the real problem is a miscategorised ticket.",
    ],
    doneChecklist: [
      "Two ops colleagues who'd actually use this gave you structured feedback",
      "You documented everything you heard, including what you disagree with",
      "You made one change directly based on the feedback",
      "You can explain what the tool does in three sentences to someone outside ops",
      "You attended or watched the peer review workshop",
    ],
    contentBody: `## Why feedback scares most people

Show this to colleagues who'd actually run it on their own tickets or reports — not your most supportive teammate. Someone who'd judge it on whether it holds up under real daily volume.

## The feedback session format

20 minutes:

**Context (5 min):** Describe the problem in one paragraph. "Triage eats 90 minutes every morning. I built something that gets through the first pass in 15."

**Observation (10 min):** They run it on their own tickets or data. You don't help. You take notes.

**Questions (5 min):**
1. What would stop you from using this daily?
2. What would you change first?
3. Did it miscategorise or misroute anything you noticed?

Don't defend the tool. Write everything down.

## What to do with feedback

Sort into: real blockers (would stop daily use), nice-to-haves, and misunderstandings (better instructions would fix them). Fix one real blocker. Rewrite one instruction that caused confusion. Ignore nice-to-haves until after you ship.

## Office hours this week

Bring your feedback list with a specific question: "I got this note about a category it keeps missing — fix the prompt rules or flag it for review instead?"

## The peer review workshop

Review two other cohort members' tools; two review yours. Prepare: make sure your tool runs on tickets you didn't write, write a one-paragraph plain description, have a real batch ready.

## The confidence test

By end of week: "This tool triages support tickets into 4 categories with routing suggestions. It works reliably on a normal day's volume. Two colleagues have used it and both trusted the output." If you can say that, you're ready for week 4.`,
    steps: [
      {
        order: 1,
        instruction: "Identify two ops colleagues who'd actually use this. They don't need to be in the cohort. Book 20 minutes each.",
        expectedAction: "Book two 20-minute feedback sessions",
        expectedResult: "Two sessions scheduled with people who have this problem.",
        commonErrorNote: "If you can't find two outside the cohort, use two cohort members — but they must run it on their own data, not yours.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction: "Run both sessions using the format above. Take verbatim notes.",
        expectedAction: "Run two structured feedback sessions and document results",
        expectedResult: "Raw notes with everything they said, including disagreements.",
        commonErrorNote: "If you caught yourself explaining or defending, write down what you felt the need to defend — that's a signal.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 3,
        instruction: "Sort feedback into blockers, nice-to-haves, misunderstandings. Pick the one blocker most likely to prevent daily use.",
        expectedAction: "Categorise feedback and identify the top blocker",
        expectedResult: "A clear decision on what you're fixing this week.",
        commonErrorNote: "All-positive feedback usually means the wrong people or politeness — ask directly what would stop them.",
        aiHintRef: "Ask Claude: 'Here's my feedback. Help me sort real blockers from nice-to-haves for an ops triage tool.'",
        completionRule: "manual",
      },
      {
        order: 4,
        instruction: "Fix the top blocker. Retest with one of your original reviewers.",
        expectedAction: "Implement one change and verify it with a reviewer",
        expectedResult: "The blocker is resolved and the reviewer confirms it.",
        commonErrorNote: "If the fix introduces a new problem, note it for the handoff doc rather than chasing it into week 4.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 5,
        instruction: "Attend or watch the peer review workshop replay. Review two other cohort members' tools.",
        expectedAction: "Participate in peer review",
        expectedResult: "You've reviewed two tools and posted notes in the Slack thread.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
    ],
  },
  {
    title: "Ship it",
    slug: "ops-week-4-ship",
    weekId: 4,
    trackSlug: "ops-workflow",
    purpose: "Officially ship. Put the tool where your team's workflow actually runs, document it, and record the demo.",
    estimatedTimeMinutes: 120,
    expectedOutput: "Shipped tool at a permanent location + handoff doc + 5-minute Loom demo.",
    guideType: "submit",
    difficulty: "intermediate",
    isRequired: true,
    retrievalTags: ["ship", "week-4", "ops", "demo", "loom", "handoff", "certification"],
    commonMistakes: [
      "Polishing instead of shipping — done beats perfect.",
      "Skipping the handoff doc, so the tool dies the first week you're on leave.",
      "Over-preparing the Loom — one take is fine.",
      "Submitting without a real ticket example in the handoff doc.",
    ],
    doneChecklist: [
      "The tool lives somewhere permanent, not your local machine",
      "An ops colleague can find and run it without your help",
      "The handoff doc includes a real ticket/report example and its output",
      "The Loom demo is recorded and shared in #ships",
      "Certification submitted via the hub",
    ],
    contentBody: `## What shipping actually means

Three things: it lives somewhere permanent, someone else can use it without you, and you have a demo that shows it working.

## Step 1 — Give it a home

- **Notion page**, embedded or linked, with instructions — right for a triage or reporting tool your team runs manually via a prompt
- **Shared Google Sheet** — right if the output feeds a routing log or weekly report doc
- **Deployed URL or scheduled script** — right only if the tool needs to run automatically or without you present

Don't deploy a full app if a documented prompt and script does the same job.

## Step 2 — Write the handoff doc

One page, three sections. **What it does:** one paragraph — what ops problem it solves, for whom. **How to use it:** numbered steps with a real ticket/report example and the output it produced. **What it doesn't do:** which categories or edge cases still need human review before acting.

## Step 3 — Record the demo

5-minute Loom: (30s) the problem and who it's for, (2 min) live demo on real tickets or data, (1 min) what you'd build next, (1 min) what surprised you. One take, maybe two.

## Step 4 — Share in Slack

Post in #ships: tool name, one sentence on what it does, the link, the Loom.

## Step 5 — Submit for certification

Use the submit button in your hub. Reviewed within 48 hours against: runs on real inputs, at least one other person has used it, a Loom showing it end-to-end, a handoff doc someone else can follow.

## What comes next

You now know how to scope a repeatable ops task, encode your triage/routing logic into a prompt, build it, and get it into daily use — a repeatable skill for your next automation. Torvi membership covers what's next: peer reviews, templates for your next build, future cohort workshops.`,
    steps: [
      {
        order: 1,
        instruction: "Choose where your tool lives permanently based on how your team's workflow actually runs — Notion, shared sheet, or deployed script. Set it up so a colleague can access it right now.",
        expectedAction: "Create a permanent home for your tool",
        expectedResult: "Your tool is accessible via a link with no explanation needed.",
        commonErrorNote: "More than an hour on deployment means you picked too complex a home — go simpler.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction: "Write the handoff doc: what it does, how to use it (with a real ticket/report example), what it doesn't do. One page.",
        expectedAction: "Write and publish the handoff doc",
        expectedResult: "A one-page doc that lets a new colleague understand and use the tool without you.",
        commonErrorNote: "No real example means the doc is theory, not instructions.",
        aiHintRef: "Ask Claude: 'Here's my handoff doc — what's missing for an ops teammate seeing this for the first time?'",
        completionRule: "manual",
      },
      {
        order: 3,
        instruction: "Record your 5-minute Loom demo on real tickets or data. One or two takes.",
        expectedAction: "Record and upload a Loom demo",
        expectedResult: "A Loom showing the tool working end-to-end on real data.",
        commonErrorNote: "Publish the rough one rather than re-recording a fourth time.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 4,
        instruction: "Post in #ships: tool name, one-sentence description, tool link, Loom link.",
        expectedAction: "Post your ship announcement",
        expectedResult: "Your tool is visible to the full cohort.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 5,
        instruction: "Submit for certification in the hub with your tool link, handoff doc, and Loom.",
        expectedAction: "Submit certification via the hub",
        expectedResult: "Submission received; certificate within 48 hours.",
        commonErrorNote: "Submit even if you're unsure it fully qualifies — the review team will tell you what's missing.",
        aiHintRef: "",
        completionRule: "manual",
      },
    ],
  },
];

// ════════════════════════════════════════════════════════════════════════
// CONSULTANT / CLIENT TOOLING TRACK
// Archetypes: Client diagnostic tool · Delivery tracker · Insight / Recommendation generator
// ════════════════════════════════════════════════════════════════════════

const CONSULTANT_CURRICULUM: GuideData[] = [
  {
    title: "Define your tool",
    slug: "consultant-week-0-define",
    weekId: 0,
    trackSlug: "consultant-client",
    purpose: "Lock down exactly which piece of client work you're going to systematise before touching any tools. The brief is your north star for the next four weeks.",
    estimatedTimeMinutes: 90,
    expectedOutput: "One-page tool brief: problem statement, intended user, inputs, outputs, and done criteria — scoped to one repeating engagement task.",
    guideType: "setup",
    difficulty: "beginner",
    isRequired: true,
    retrievalTags: ["brief", "define", "week-0", "consultant", "client", "scope"],
    commonMistakes: [
      "Picking 'a full engagement platform' instead of one narrow, repeating task — a diagnostic questionnaire synthesiser, not a delivery suite.",
      "Writing a vague problem statement like 'client reporting is inconsistent' instead of a specific one with a number in it.",
      "Building for 'clients' generically instead of naming yourself or one specific engagement type as the user.",
      "Choosing something you only do once per client instead of the task you rebuild from scratch on every engagement.",
    ],
    doneChecklist: [
      "Problem statement is one specific sentence describing the current painful reality, with a number in it",
      "Intended user is named — you, or one specific colleague who runs similar engagements",
      "Inputs are listed as concrete items (discovery notes, a questionnaire's raw responses, a status log)",
      "Output is one specific deliverable — a diagnostic summary, a status update, a recommendation doc — not a platform",
      "Done criteria is measurable — you will know in week 4 whether this worked",
    ],
    contentBody: `## Why this matters

Most cohort members who don't finish fail here — not in week 4. Consultants especially tend to scope "a full client delivery system" because every engagement feels custom. This week's only job is to find the one task you rebuild from scratch on every engagement, and scope a tool to just that.

## Where consultant tools usually live

Your archetype is one of three shapes:

**Client diagnostic tool** — you run a discovery process and need to turn raw notes or questionnaire answers into an assessment of where the client stands. The manual version is re-reading discovery notes and manually scoring or summarising against your framework.

**Delivery tracker** — you track deliverables, milestones, and status across one or more engagements and need to produce a client-facing update. The manual version is a recurring block of time reformatting the same status information for a client email or deck.

**Insight / Recommendation generator** — you take raw inputs (interviews, data, discovery notes) and produce a structured set of findings or recommendations. The manual version is synthesising from scratch every time, often under deadline pressure.

## The tool brief format

Your brief has five parts. Do not skip any.

**1. The problem in one sentence.** "Turning discovery call notes into a client-ready diagnostic summary takes me half a day per engagement" is a good problem statement. "Client reporting is inconsistent" is not.

**2. Who uses it.** Your own name, or one named colleague who runs similar engagements. Not "the consulting team."

**3. What goes in.** Discovery notes, questionnaire responses, a status log, interview transcripts — name the actual format.

**4. What comes out.** One specific output: a diagnostic summary with scores and findings, a formatted client status update, a recommendations doc. Not "a platform."

**5. Done criteria.** "I use this on every new engagement and it cuts diagnostic write-up from 4 hours to 45 minutes" is measurable. "It's more consistent" is not.

## Confidentiality note

If your real inputs contain client-identifying information, plan to anonymise or use a sanitised/composite example for anything you post in Slack or show to peers this cohort. Never paste real client data into a tool or prompt you haven't cleared to use it with.

## How to use Claude to write your brief

Open Claude and paste this, filling in your details:

> I'm a consultant. On every engagement, I have to [describe the diagnostic/tracking/synthesis task]. It takes about [time]. The hardest part is [the bottleneck]. I want to build an AI tool that handles this. Help me write a one-page tool brief with: problem statement, intended user, inputs, outputs, and done criteria. Be specific and push back if anything is too vague or too broad.

Edit every sentence until it's accurate and specific enough that a colleague could read it and know exactly what you're building.`,
    steps: [
      {
        order: 1,
        instruction: "Pick your archetype: Client diagnostic tool, Delivery tracker, or Insight/Recommendation generator. Write your problem statement in one sentence with a real number in it. Time-box to 10 minutes.",
        expectedAction: "Choose an archetype and write one specific, falsifiable problem statement",
        expectedResult: "A sentence describing what you rebuild manually on every engagement and how long it takes.",
        commonErrorNote: "If your sentence contains 'better' or 'more consistent', rewrite it to describe the current reality instead.",
        aiHintRef: "Paste your problem statement into Claude and ask: 'Is this specific enough to build a consulting tool for? What's missing?'",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction: "Name the intended user — your own name, or one specific colleague who runs similar engagements.",
        expectedAction: "Write down who will use this tool",
        expectedResult: "One named person, not 'the consulting team'.",
        commonErrorNote: "If you wrote a team, pick the one person who'd use this on their next engagement.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 3,
        instruction: "List the inputs — discovery notes, questionnaire responses, a status log, interview transcripts. Be concrete about the format, and note if any input is client-sensitive.",
        expectedAction: "List every input the tool will require",
        expectedResult: "A short list of concrete inputs, each one something you could paste or attach — flagged if sensitive.",
        commonErrorNote: "If an input is 'everything I know about the client', break it into the specific documents that knowledge actually lives in.",
        aiHintRef: "Ask Claude: 'Given this consulting problem, what are the minimum inputs a tool would need to produce a reliable diagnostic or recommendation?'",
        completionRule: "manual",
      },
      {
        order: 4,
        instruction: "Define the output format and your done criteria — how you'll know in week 4 this actually saved you time on a real engagement.",
        expectedAction: "Write the specific output format and a measurable done criterion",
        expectedResult: "One output description and one done criterion with a number or observable behaviour in it.",
        commonErrorNote: "'Cuts write-up time from 4 hours to 45 minutes' is measurable. 'Makes reporting easier' is not.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 5,
        instruction: "Post your brief (with any client details anonymised) in the cohort Slack. Read two other briefs and leave one piece of feedback on each.",
        expectedAction: "Post the completed brief and give feedback on two others",
        expectedResult: "Your brief is visible to the cohort and you've responded to two others.",
        commonErrorNote: "Post a draft if it's not perfect — feedback on a rough draft beats a week of solo editing.",
        aiHintRef: "",
        completionRule: "manual",
      },
    ],
  },
  {
    title: "Build the first version",
    slug: "consultant-week-1-build-first",
    weekId: 1,
    trackSlug: "consultant-client",
    purpose: "Get a rough version running on real (or realistically composite) engagement inputs. Not polished — working.",
    estimatedTimeMinutes: 180,
    expectedOutput: "A working prototype that turns discovery notes, status data, or interviews into your target output. You know the top 3 things wrong with it.",
    guideType: "build",
    difficulty: "intermediate",
    isRequired: true,
    retrievalTags: ["build", "prototype", "week-1", "consultant", "cursor", "claude", "diagnostic"],
    commonMistakes: [
      "Spending days on environment setup before running a single test on real engagement data.",
      "Designing for a perfectly structured discovery call when real ones are tangential and inconsistent.",
      "Trying to cover every framework dimension instead of the 3–5 that actually drive your recommendation.",
      "Testing with one tidy example instead of the range of engagement quality you actually get.",
    ],
    doneChecklist: [
      "Your tool runs on at least one real or realistic composite input from an actual engagement",
      "You have tested it on 10 real or realistic inputs of varying quality",
      "You can name the top 3 things wrong with the output",
      "You have fixed the single most important problem",
      "You can show a colleague the output in 2 minutes and they'd trust it in front of a client",
    ],
    contentBody: `## What "working" means this week

Working means: you feed it real (or realistically composite, if confidentiality requires) discovery notes, status data, or interviews, and it produces a diagnostic, status update, or recommendation set you'd actually put in front of a client after review. Not perfect — useful enough that you can say "this is the right structure" or "this is wrong, and I know why."

## Start with the prompt, not the code

Before opening Cursor, write your system prompt in Claude chat.

> You are a consulting assistant producing [a client diagnostic / a status update / a recommendations doc]. You receive [discovery notes / status data / interview transcripts] and produce [describe the exact deliverable].
>
> Format: [describe the structure — findings by dimension, a status table, a ranked recommendations list]
>
> Rules:
> - Ground every finding or recommendation in specific evidence from the input, not general best practice
> - Flag anything the input doesn't give enough evidence to conclude on
> - Use a direct, client-appropriate tone — no filler, no hedging language
>
> If the input is incomplete: say so explicitly rather than filling gaps with generic consulting language.

Test with 5 real or composite inputs in Claude chat first. Refine until the structure is right, then take it to Cursor.

## Getting started in Cursor

> I'm building a consulting tool for diagnostics/tracking/recommendations. The input is [discovery notes / status data / transcripts]. The output should be [describe format]. Here is my system prompt: [paste it]. Build a simple script that takes the input, sends it to Claude API with this prompt, and prints the output. No UI yet.

Let it write the code, run it, don't edit yet.

## The 10-input test

Run it on 10 real or realistic inputs — including a messy discovery call transcript and an incomplete status log, not just your cleanest example. After 10 runs you'll know what it handles well, what it consistently gets wrong or overstates, and where the format breaks. Fix the single most important problem, then test 10 more.

## Working with sensitive client data

If you're using real client material, anonymise names, company identifiers, and figures before it goes anywhere outside your own environment — including into Claude if your engagement terms don't permit it. Ask Cursor: "Add a simple find-and-replace anonymisation step before this data is sent anywhere."

## When the code doesn't run

Paste the full error into Cursor: "This error appeared when I ran the code. What's wrong and how do I fix it?" Most first-run errors are dependency or path issues, fixed in one or two messages.

## What not to do this week

Don't spend time on: a polished client-facing UI, covering every dimension of your framework, or handling engagement types you don't actually run. Spend time on: getting the core diagnostic or synthesis right on your messiest real input.`,
    steps: [
      {
        order: 1,
        instruction: "Set up your environment: install Cursor, get a Claude API key from console.anthropic.com, and create a project folder with a .env file.",
        expectedAction: "Cursor installed, API key in .env, project folder ready",
        expectedResult: "You can open Cursor and start a conversation with the agent.",
        commonErrorNote: "If you're stuck more than 30 minutes, post in the cohort Slack with a screenshot. Don't lose a day to setup.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction: "Write your system prompt in Claude chat using your brief and your actual diagnostic/reporting framework. Test on 5 real or composite inputs.",
        expectedAction: "Write and test a system prompt against 5 real or composite inputs",
        expectedResult: "A system prompt producing a client-appropriate output for at least 3 of 5 inputs.",
        commonErrorNote: "If outputs read as generic consulting filler rather than evidence-grounded, tighten the prompt to require citing the input.",
        aiHintRef: "Ask Claude to critique your prompt: 'What's ambiguous here that could cause vague or ungrounded findings?'",
        completionRule: "manual",
      },
      {
        order: 3,
        instruction: "Ask Cursor to build a script that takes your input, calls Claude API with your prompt, and prints the output.",
        expectedAction: "Ask Cursor to implement the tool",
        expectedResult: "A runnable script calling Claude API with your system prompt.",
        commonErrorNote: "If it doesn't run, paste the error back into Cursor — normally one or two rounds.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 4,
        instruction: "Test on 10 real or realistic composite inputs — mix a clean example with a messy or incomplete one. Document what works and what doesn't before fixing anything.",
        expectedAction: "Run 10 tests with real or composite inputs and document results",
        expectedResult: "A list of what the tool diagnoses or synthesises well and what it consistently gets wrong.",
        commonErrorNote: "A vague, evidence-free finding is a worse failure mode than a missed one — check for it explicitly.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 5,
        instruction: "Fix the single most important problem from your 10 tests. Retest.",
        expectedAction: "Fix the top problem and retest",
        expectedResult: "The main failure mode is reduced or eliminated; new ones noted for week 2.",
        commonErrorNote: "Change one thing at a time so you know what actually fixed it.",
        aiHintRef: "Ask Claude: 'Here's my prompt and a finding that wasn't grounded in the input. What part of the prompt caused this?'",
        completionRule: "manual",
      },
      {
        order: 6,
        instruction: "Record a 2-minute screen recording of the tool running on a real or composite input. Post it in the cohort Slack.",
        expectedAction: "Record and share a 2-minute demo",
        expectedResult: "The cohort can see your tool working on a realistic engagement input.",
        commonErrorNote: "Rough is fine — post it anyway, anonymised if needed.",
        aiHintRef: "",
        completionRule: "manual",
      },
    ],
  },
  {
    title: "Make it usable",
    slug: "consultant-week-2-usable",
    weekId: 2,
    trackSlug: "consultant-client",
    purpose: "Turn your prototype into something a fellow consultant can run without your help.",
    estimatedTimeMinutes: 180,
    expectedOutput: "Tool that runs reliably on realistic engagement inputs, with instructions a colleague can follow independently.",
    guideType: "build",
    difficulty: "intermediate",
    isRequired: true,
    retrievalTags: ["usability", "week-2", "consultant", "friction", "testing", "handoff"],
    commonMistakes: [
      "Adding more framework dimensions instead of removing friction in how discovery notes get in.",
      "Only testing with your own engagement's notes — you already know their shape.",
      "Writing instructions that assume the reader knows your diagnostic framework.",
      "Polishing output formatting before fixing where the tool breaks on a real, messy input.",
    ],
    doneChecklist: [
      "A fellow consultant ran the tool without your help and got an output they'd trust in front of a client",
      "Every input step is documented in one sentence",
      "You watched someone use it and wrote down where they got stuck",
      "You fixed the one friction point most likely to stop use on the next engagement",
      "The tool works on a short discovery input, a long one, and one with a format quirk",
    ],
    contentBody: `## The usability test — do this first

Ask a fellow consultant to run your tool on their own (anonymised, if needed) discovery notes or status data. Give no instructions. Watch where they get stuck, what they expect that doesn't happen, and their first question. Don't answer — write it down. That's your week 2 work.

## The friction audit

Write down every step from "I have discovery notes" to "I have a diagnostic or status doc." Include the boring ones: "export the transcript," "paste into input file," "run the script." For each, ask: can this be removed or automated?

## Writing instructions that work

For each step you can't remove, one sentence, written for someone who's never seen the tool:
1. [What to do] — [why, if not obvious]
2. Paste your [discovery notes / status data / transcript] here: [show a correctly formatted example]
3. The output appears in [location]. Review it before sending it to [where it actually goes — a client email, a deck, a status doc].

## The one-change rule

Fix only the one problem most likely to stop use on the next engagement. Then retest. Don't add framework dimensions to compensate for friction — remove the friction.

## Testing with real engagement data

Test on: a typical discovery call's worth of notes, a short one, a long multi-session one, and an input with a quirk — an interview that went off-topic, a status log with gaps. If it breaks on any, fix before week 3.

## Handling failure gracefully

What happens when the input doesn't give enough evidence for a finding, or a status field is missing? Your tool should flag it clearly for human review rather than filling the gap with generic language a client would spot. Ask Cursor: "Add a clear flag when the input lacks enough evidence to support a finding, instead of generating a generic one."`,
    steps: [
      {
        order: 1,
        instruction: "Find one fellow consultant with real (or realistic composite) discovery notes or status data. Have them run your tool with no help. Watch and take notes.",
        expectedAction: "Run an unassisted usability test with a real person",
        expectedResult: "At least 3 places where they got stuck or asked a question.",
        commonErrorNote: "If no colleague is available, come back after two days and follow only your own written instructions.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction: "List every step from raw discovery notes to finished diagnostic or update. Write each as a sentence and count them.",
        expectedAction: "Write out every user step end-to-end",
        expectedResult: "A numbered list of every action required.",
        commonErrorNote: "More than 8 steps usually means some can be automated — start there.",
        aiHintRef: "Ask Claude: 'Given this list of steps, which could be automated in a tool built with Cursor?'",
        completionRule: "manual",
      },
      {
        order: 3,
        instruction: "Fix the single highest-friction step — remove it, automate it, or write a clearer instruction.",
        expectedAction: "Remove or fix the highest-friction step",
        expectedResult: "The step that caused the most confusion is gone or clearer.",
        commonErrorNote: "Try removing the step before adding a feature to work around it.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 4,
        instruction: "Write usage instructions, one sentence per step, with a correctly formatted (anonymised if needed) example input.",
        expectedAction: "Write and position usage instructions",
        expectedResult: "A new user can get a result on their first try.",
        commonErrorNote: "Delete 'simply' and 'just' — if it were simple you wouldn't need to explain it.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 5,
        instruction: "Test on a typical discovery input, a short one, a long one, and one with a format quirk. Document what happens in each.",
        expectedAction: "Run four structured tests and document results",
        expectedResult: "You know exactly where the tool holds up and where it breaks, with clear flags instead of unsupported claims.",
        commonErrorNote: "A confident but ungrounded finding is worse than a flagged gap — add a validation step if needed.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 6,
        instruction: "Record a 3–5 minute Loom walking through the tool with your instructions. Post it in the cohort Slack alongside the tool link.",
        expectedAction: "Record a Loom and share it",
        expectedResult: "Cohort members can understand and access your tool from the Slack post alone.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
    ],
  },
  {
    title: "Get feedback and improve",
    slug: "consultant-week-3-review",
    weekId: 3,
    trackSlug: "consultant-client",
    purpose: "Get real feedback from consultants who'd actually use this. Fix the real problems, not the imagined ones.",
    estimatedTimeMinutes: 120,
    expectedOutput: "Tool reviewed by at least two people who'd genuinely use it, with documented feedback and one substantive improvement.",
    guideType: "review",
    difficulty: "intermediate",
    isRequired: true,
    retrievalTags: ["review", "feedback", "week-3", "consultant", "peer-review", "validation"],
    commonMistakes: [
      "Only showing it to a partner or manager who doesn't personally run engagements like this.",
      "Defending the tool during feedback instead of listening.",
      "Acting on every note instead of finding the one that most affects client-readiness.",
      "Polishing formatting when the real problem is an ungrounded finding.",
    ],
    doneChecklist: [
      "Two consultants who'd actually use this gave you structured feedback",
      "You documented everything you heard, including what you disagree with",
      "You made one change directly based on the feedback",
      "You can explain what the tool does in three sentences to someone outside consulting",
      "You attended or watched the peer review workshop",
    ],
    contentBody: `## Why feedback scares most people

Show this to colleagues who'd actually use it on a real engagement — not your most supportive teammate. Someone who'd judge it on whether they'd trust the output in front of a client.

## The feedback session format

20 minutes:

**Context (5 min):** Describe the problem in one paragraph. "Diagnostic write-up takes half a day per engagement. I built something that gets a client-ready first draft in 45 minutes."

**Observation (10 min):** They run it on their own (or a composite) discovery input. You don't help. You take notes.

**Questions (5 min):**
1. What would stop you from using this on your next engagement?
2. What would you change first?
3. Did anything read as generic or ungrounded rather than specific to the input?

Don't defend the tool. Write everything down.

## What to do with feedback

Sort into: real blockers (would stop use on a real engagement), nice-to-haves, and misunderstandings (better instructions would fix them). Fix one real blocker. Rewrite one instruction that caused confusion. Ignore nice-to-haves until after you ship.

## Office hours this week

Bring your feedback list with a specific question: "I got this note about generic-sounding recommendations — tighten the prompt or add a citation requirement?"

## The peer review workshop

Review two other cohort members' tools; two review yours. Prepare: make sure your tool runs on an input you didn't write, write a one-paragraph plain description, have a real (anonymised if needed) input ready.

## The confidence test

By end of week: "This tool turns discovery notes into a diagnostic summary with scored findings. It works reliably on a typical discovery call. Two consultants have used it and both would send the output to a client after light review." If you can say that, you're ready for week 4.`,
    steps: [
      {
        order: 1,
        instruction: "Identify two consultants who'd actually use this. They don't need to be in the cohort. Book 20 minutes each.",
        expectedAction: "Book two 20-minute feedback sessions",
        expectedResult: "Two sessions scheduled with people who have this problem.",
        commonErrorNote: "If you can't find two outside the cohort, use two cohort members — but they must run it on their own or composite input, not yours.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction: "Run both sessions using the format above. Take verbatim notes.",
        expectedAction: "Run two structured feedback sessions and document results",
        expectedResult: "Raw notes with everything they said, including disagreements.",
        commonErrorNote: "If you caught yourself explaining or defending, write down what you felt the need to defend — that's a signal.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 3,
        instruction: "Sort feedback into blockers, nice-to-haves, misunderstandings. Pick the one blocker most likely to prevent real engagement use.",
        expectedAction: "Categorise feedback and identify the top blocker",
        expectedResult: "A clear decision on what you're fixing this week.",
        commonErrorNote: "All-positive feedback usually means the wrong people or politeness — ask directly what would stop them.",
        aiHintRef: "Ask Claude: 'Here's my feedback. Help me sort real blockers from nice-to-haves for a client-facing consulting tool.'",
        completionRule: "manual",
      },
      {
        order: 4,
        instruction: "Fix the top blocker. Retest with one of your original reviewers.",
        expectedAction: "Implement one change and verify it with a reviewer",
        expectedResult: "The blocker is resolved and the reviewer confirms it.",
        commonErrorNote: "If the fix introduces a new problem, note it for the handoff doc rather than chasing it into week 4.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 5,
        instruction: "Attend or watch the peer review workshop replay. Review two other cohort members' tools.",
        expectedAction: "Participate in peer review",
        expectedResult: "You've reviewed two tools and posted notes in the Slack thread.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
    ],
  },
  {
    title: "Ship it",
    slug: "consultant-week-4-ship",
    weekId: 4,
    trackSlug: "consultant-client",
    purpose: "Officially ship. Put the tool where you'll actually reach for it on your next engagement, document it, and record the demo.",
    estimatedTimeMinutes: 120,
    expectedOutput: "Shipped tool at a permanent location + handoff doc + 5-minute Loom demo.",
    guideType: "submit",
    difficulty: "intermediate",
    isRequired: true,
    retrievalTags: ["ship", "week-4", "consultant", "demo", "loom", "handoff", "certification"],
    commonMistakes: [
      "Polishing instead of shipping — done beats perfect.",
      "Skipping the handoff doc, so the tool doesn't survive past this engagement.",
      "Over-preparing the Loom — one take is fine.",
      "Submitting without a real (or composite) example in the handoff doc.",
    ],
    doneChecklist: [
      "The tool lives somewhere permanent, not your local machine",
      "A fellow consultant can find and run it without your help",
      "The handoff doc includes a real or composite example and its output",
      "The Loom demo is recorded and shared in #ships",
      "Certification submitted via the hub",
    ],
    contentBody: `## What shipping actually means

Three things: it lives somewhere permanent, someone else can use it without you, and you have a demo that shows it working.

## Step 1 — Give it a home

- **Notion or firm wiki page**, with instructions — right for a diagnostic or synthesis tool used via a documented prompt
- **Shared Google Doc/Sheet** — right if the output feeds directly into a status doc or tracker
- **Deployed URL** — right only if colleagues need to run it themselves without you or a script, across multiple engagements

Don't deploy a full app if a documented prompt and a Notion page does the same job.

## Step 2 — Write the handoff doc

One page, three sections. **What it does:** one paragraph — what engagement problem it solves, for whom. **How to use it:** numbered steps with a real or composite example and the output it produced. **What it doesn't do:** what still needs human review before it goes in front of a client, and what input quality it needs to work reliably.

## Step 3 — Record the demo

5-minute Loom: (30s) the problem and who it's for, (2 min) live demo on a real or composite input, (1 min) what you'd build next, (1 min) what surprised you. One take, maybe two. Anonymise anything client-identifying.

## Step 4 — Share in Slack

Post in #ships: tool name, one sentence on what it does, the link, the Loom.

## Step 5 — Submit for certification

Use the submit button in your hub. Reviewed within 48 hours against: runs on real inputs, at least one other person has used it, a Loom showing it end-to-end, a handoff doc someone else can follow.

## What comes next

You now know how to scope a repeatable piece of engagement work, encode your diagnostic or synthesis approach into a prompt, build it, and get it into use on real client work — a repeatable skill for your next engagement. Torvi membership covers what's next: peer reviews, templates for your next build, future cohort workshops.`,
    steps: [
      {
        order: 1,
        instruction: "Choose where your tool lives permanently based on where you'll actually reach for it on your next engagement — Notion, shared doc, or deployed URL. Set it up so a colleague can access it right now.",
        expectedAction: "Create a permanent home for your tool",
        expectedResult: "Your tool is accessible via a link with no explanation needed.",
        commonErrorNote: "More than an hour on deployment means you picked too complex a home — go simpler.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction: "Write the handoff doc: what it does, how to use it (with a real or composite example), what it doesn't do. One page.",
        expectedAction: "Write and publish the handoff doc",
        expectedResult: "A one-page doc that lets a new colleague understand and use the tool without you.",
        commonErrorNote: "No real example means the doc is theory, not instructions.",
        aiHintRef: "Ask Claude: 'Here's my handoff doc — what's missing for a colleague seeing this for the first time?'",
        completionRule: "manual",
      },
      {
        order: 3,
        instruction: "Record your 5-minute Loom demo on a real or composite input. One or two takes.",
        expectedAction: "Record and upload a Loom demo",
        expectedResult: "A Loom showing the tool working end-to-end.",
        commonErrorNote: "Publish the rough one rather than re-recording a fourth time.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 4,
        instruction: "Post in #ships: tool name, one-sentence description, tool link, Loom link.",
        expectedAction: "Post your ship announcement",
        expectedResult: "Your tool is visible to the full cohort.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 5,
        instruction: "Submit for certification in the hub with your tool link, handoff doc, and Loom.",
        expectedAction: "Submit certification via the hub",
        expectedResult: "Submission received; certificate within 48 hours.",
        commonErrorNote: "Submit even if you're unsure it fully qualifies — the review team will tell you what's missing.",
        aiHintRef: "",
        completionRule: "manual",
      },
    ],
  },
];

export const CURRICULUM: GuideData[] = [
  ...PM_CURRICULUM,
  ...OPS_CURRICULUM,
  ...CONSULTANT_CURRICULUM,
];

// Slugs from the old generic (trackId: null) curriculum — removed by the seed
// script now that every week has a track-specific replacement.
export const RETIRED_GENERIC_SLUGS = [
  "week-0-define",
  "week-1-build-first",
  "week-2-usable",
  "week-3-review",
  "week-4-ship",
];

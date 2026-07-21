/**
 * Archetype-level curriculum — Consultant / Client Tooling track.
 * Client diagnostic tool · Delivery tracker · Insight / Recommendation generator
 */

import type { ArchetypeGuideData } from "./curriculum-archetypes-pm";

const CLIENT_DIAGNOSTIC_TOOL: ArchetypeGuideData[] = [
  {
    title: "Define your client diagnostic tool",
    slug: "consultant-diagnostic-week-0-define",
    weekId: 0,
    trackSlug: "consultant-client",
    archetypeSlug: "client-diagnostic-tool",
    purpose: "Scope your diagnostic framework and exactly what discovery input it scores.",
    estimatedTimeMinutes: 60,
    expectedOutput: "A brief scoped to one diagnostic framework (with named dimensions) and one input type.",
    guideType: "setup",
    difficulty: "beginner",
    isRequired: true,
    retrievalTags: ["client-diagnostic-tool", "week-0", "consultant", "define"],
    commonMistakes: [
      "Trying to encode your entire methodology instead of the 3–5 dimensions that actually drive the diagnosis.",
      "Not deciding what counts as evidence for each dimension — vague scoring won't hold up with a client.",
      "Scoping for perfect discovery calls when real ones are often partial or off-script.",
    ],
    doneChecklist: [
      "Your framework's 3–5 scoring dimensions are named explicitly",
      "You've defined what counts as evidence for each dimension",
      "One input type is named — discovery notes, questionnaire, or transcript",
      "Done criteria is measurable — e.g. 'cuts diagnostic write-up from 4 hours to 45 minutes'",
    ],
    contentBody: `## Name your dimensions

Every diagnostic framework has 3–5 real dimensions it scores against — maturity, readiness, risk areas, whatever yours actually assesses. Write them down explicitly, not as a vague methodology reference.

## Define evidence, not vibes

For each dimension, define what in the discovery input counts as evidence for a high or low score. "The client seems disorganised" isn't scorable. "No documented process mentioned for X" is.

## Confidentiality note

If your test inputs include real client details, plan your anonymisation approach now — for anything you'll post in Slack or show cohort peers.

## Your brief, specific to this archetype

Problem: "Scoring a client against [framework] from discovery notes takes me [X hours] per engagement."
Input: [discovery notes / questionnaire responses], typically from a [N]-minute discovery call.
Output: a scored assessment across [your dimensions], with evidence cited for each score.
Done criteria: cuts write-up time by at least half, and a colleague trusts the scores without re-reading your notes.`,
    steps: [
      {
        order: 1,
        instruction: "Write your framework's 3–5 scoring dimensions and, for each, what counts as evidence in discovery input.",
        expectedAction: "Define dimensions and their evidence criteria",
        expectedResult: "A written framework a colleague could apply consistently.",
        commonErrorNote: "If a dimension's evidence criteria uses words like 'seems' or 'feels', make it specific and checkable.",
        aiHintRef: "Ask Claude: 'Are these scoring dimensions and evidence criteria specific enough for a tool to apply consistently?'",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction: "Name your input type (discovery notes, questionnaire, transcript) and gather 2–3 real (or composite, anonymised) examples.",
        expectedAction: "Identify input type and gather real examples",
        expectedResult: "Real or realistic composite discovery input ready for week 1.",
        commonErrorNote: "If using real client data, confirm your anonymisation approach before sharing anything outside your own environment.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 3,
        instruction: "Finalise your brief with done criteria and post it (anonymised if needed) in the cohort Slack.",
        expectedAction: "Finalise and share the brief",
        expectedResult: "Brief posted, visible to the cohort.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
    ],
  },
  {
    title: "Build your client diagnostic tool",
    slug: "consultant-diagnostic-week-1-build",
    weekId: 1,
    trackSlug: "consultant-client",
    archetypeSlug: "client-diagnostic-tool",
    purpose: "Get a working tool that scores real discovery input against your framework.",
    estimatedTimeMinutes: 180,
    expectedOutput: "A tool producing a scored assessment with cited evidence from real or composite discovery input.",
    guideType: "build",
    difficulty: "intermediate",
    isRequired: true,
    retrievalTags: ["client-diagnostic-tool", "week-1", "consultant", "build"],
    commonMistakes: [
      "Letting the tool score confidently on a dimension with no supporting evidence in the input.",
      "Using generic consulting language in scores instead of grounding each one in the specific input.",
      "Not testing on a partial or off-script discovery call, which is common in real engagements.",
    ],
    doneChecklist: [
      "The tool scores real input against your dimensions with cited evidence for each score",
      "It flags dimensions where the input doesn't provide enough evidence, rather than guessing",
      "You've tested it on a partial or off-topic discovery input",
      "You know the top 2 things it still gets wrong",
    ],
    contentBody: `## The system prompt

> You are a diagnostic assistant for a consultant. You receive [discovery notes / questionnaire responses] and score the client against these dimensions: [your dimensions], using this evidence criteria: [your criteria].
>
> For each dimension, cite the specific input that supports the score. If the input doesn't provide enough evidence for a dimension, mark it "insufficient evidence" rather than guessing a score.
>
> Tone: direct and specific — no generic consulting language ("leverage synergies", "best-in-class"). Ground every claim in the actual input.

## Building it

In Cursor: "Build a script that takes discovery notes, scores them against this framework via Claude API, and prints the assessment with cited evidence." Test on real or composite input.

## Test the partial case

A discovery call that went off-script or ran short is common, not rare. Test it — the tool should flag low-evidence dimensions clearly rather than scoring confidently on thin ground.`,
    steps: [
      {
        order: 1,
        instruction: "Write and test your diagnostic prompt in Claude chat against real or composite discovery input, checking every score cites real evidence.",
        expectedAction: "Write and test the diagnostic prompt",
        expectedResult: "Scores that are grounded in cited evidence, not generic claims.",
        commonErrorNote: "If a score reads as generic rather than evidence-specific, tighten the prompt to require a direct citation for every score.",
        aiHintRef: "Ask Claude: 'Check this assessment against the input — is every score actually supported by specific evidence?'",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction: "Ask Cursor to build a script that runs the prompt against a discovery input file and prints the scored assessment.",
        expectedAction: "Build the script",
        expectedResult: "A runnable script producing the assessment from real input.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 3,
        instruction: "Test on a partial or off-script discovery input. Confirm low-evidence dimensions are flagged, not confidently scored.",
        expectedAction: "Test the partial-evidence case",
        expectedResult: "Low-evidence dimensions are clearly flagged as such.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 4,
        instruction: "Fix the top problem, then record a 2-minute demo (anonymised if needed) and post it to the cohort Slack.",
        expectedAction: "Fix the top issue and share a demo",
        expectedResult: "The cohort has seen it working on real or composite input.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
    ],
  },
  {
    title: "Make your client diagnostic tool usable",
    slug: "consultant-diagnostic-week-2-usable",
    weekId: 2,
    trackSlug: "consultant-client",
    archetypeSlug: "client-diagnostic-tool",
    purpose: "Get a fellow consultant running this on their own discovery input without your help.",
    estimatedTimeMinutes: 150,
    expectedOutput: "A colleague ran it independently and trusted the scored output enough to use it as a starting point.",
    guideType: "build",
    difficulty: "intermediate",
    isRequired: true,
    retrievalTags: ["client-diagnostic-tool", "week-2", "consultant", "usable"],
    commonMistakes: [
      "Not explaining the framework to the tester before they judge the output's accuracy.",
      "Only testing with a thorough discovery call — test with a shorter, thinner one too.",
    ],
    doneChecklist: [
      "A colleague ran it on their own (or composite) discovery input with no help",
      "They understood the framework well enough to judge whether scores were reasonable",
      "It's been tested on both a thorough and a thin discovery input",
      "They'd use the scored output as a real starting point, not a rough guess",
    ],
    contentBody: `## Explain the framework first

A tester can't judge score quality without understanding what the dimensions mean. Brief them on the framework, then let them run the tool independently.

## Test with a thin discovery call

Not every discovery call runs the full length or covers every topic. Test with a shorter, thinner input — the tool's honesty about insufficient evidence matters most here.

## What "usable" means here

The colleague would use the scored assessment as a real starting point for their write-up, not discard it and start from scratch.`,
    steps: [
      {
        order: 1,
        instruction: "Brief a fellow consultant on your framework, then have them run the tool on their own (or composite) discovery input with no further help.",
        expectedAction: "Run an unassisted usability test after framework briefing",
        expectedResult: "A real scored assessment and feedback on whether it felt usable.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction: "Test with a shorter or thinner discovery input specifically. Confirm insufficient-evidence flags work as expected.",
        expectedAction: "Test with thin discovery input",
        expectedResult: "The tool is honest about low-evidence dimensions rather than overconfident.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 3,
        instruction: "Fix the top issue, record a Loom (anonymised if needed), and post it in the cohort Slack.",
        expectedAction: "Fix the issue and share a demo",
        expectedResult: "Cohort can access and understand the tool from the post.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
    ],
  },
  {
    title: "Get feedback on your client diagnostic tool",
    slug: "consultant-diagnostic-week-3-review",
    weekId: 3,
    trackSlug: "consultant-client",
    archetypeSlug: "client-diagnostic-tool",
    purpose: "Validate the scoring with consultants who'd actually put this in front of a client.",
    estimatedTimeMinutes: 90,
    expectedOutput: "Two consultants reviewed real scored output and you've fixed the top accuracy issue.",
    guideType: "review",
    difficulty: "intermediate",
    isRequired: true,
    retrievalTags: ["client-diagnostic-tool", "week-3", "consultant", "feedback"],
    commonMistakes: [
      "Not asking whether any score felt like it overreached the actual evidence.",
      "Skipping the client-readiness question — would they send this, or only use it internally?",
    ],
    doneChecklist: [
      "Two consultants reviewed real scored output against the source discovery input",
      "You asked whether any score overreached the evidence",
      "You asked whether they'd send the output to a client, even after light editing",
      "You fixed the top issue found",
    ],
    contentBody: `## Ask about overreach specifically

The most common failure in a diagnostic tool is a confident score built on thin evidence. Ask reviewers directly: "Does any score here go further than what's actually in the notes?"

## The client-readiness bar

Ask: would you send this to a client after light editing, or does it need a full rewrite? A full-rewrite answer means the core scoring or tone still needs work, not just polish.`,
    steps: [
      {
        order: 1,
        instruction: "Show two consultants a real scored assessment alongside the source discovery input. Ask specifically about evidence overreach.",
        expectedAction: "Run two evidence-focused reviews",
        expectedResult: "Documented feedback on scoring accuracy and evidence grounding.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction: "Ask whether they'd send the output to a client after light editing. Fix the top issue raised.",
        expectedAction: "Assess client-readiness and fix the top issue",
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
    title: "Ship your client diagnostic tool",
    slug: "consultant-diagnostic-week-4-ship",
    weekId: 4,
    trackSlug: "consultant-client",
    archetypeSlug: "client-diagnostic-tool",
    purpose: "Put your diagnostic tool where you'll reach for it on your next new engagement.",
    estimatedTimeMinutes: 90,
    expectedOutput: "Shipped tool + handoff doc with a real or composite example + Loom demo.",
    guideType: "submit",
    difficulty: "intermediate",
    isRequired: true,
    retrievalTags: ["client-diagnostic-tool", "week-4", "consultant", "ship"],
    commonMistakes: [
      "Not documenting the framework and evidence criteria — the next user needs to know how scores are derived.",
      "Shipping without noting what still needs human review before it reaches a client.",
    ],
    doneChecklist: [
      "Tool lives somewhere you'll reach for it at the start of your next engagement",
      "Handoff doc includes the framework, evidence criteria, and a real/composite example",
      "The doc states what still needs human review before client delivery",
      "Loom demo recorded and posted in #ships; certification submitted",
    ],
    contentBody: `## Where this lives

Link it from your engagement kickoff checklist or discovery template — somewhere you'll naturally reach for it at the start of a new engagement.

## The handoff doc

Include the full framework and evidence criteria, a real or composite before/after example, and what still needs human review before anything reaches a client.

Submit for certification once the demo and handoff doc are ready.`,
    steps: [
      {
        order: 1,
        instruction: "Put the tool where you'll reach for it at the start of your next engagement — linked from your kickoff checklist or discovery template.",
        expectedAction: "Give the tool a discoverable home",
        expectedResult: "It's linked from where new engagements actually start.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction: "Write the handoff doc with the framework, evidence criteria, a real/composite example, and required human review steps.",
        expectedAction: "Write the handoff doc",
        expectedResult: "A one-page doc a colleague could follow.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 3,
        instruction: "Record a 5-minute Loom (anonymised if needed), post in #ships, and submit for certification in the hub.",
        expectedAction: "Record demo, ship, and submit",
        expectedResult: "Tool shipped and certification submitted.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
    ],
  },
];

const DELIVERY_TRACKER: ArchetypeGuideData[] = [
  {
    title: "Define your delivery tracker",
    slug: "consultant-delivery-week-0-define",
    weekId: 0,
    trackSlug: "consultant-client",
    archetypeSlug: "delivery-tracker",
    purpose: "Scope exactly which status data you're tracking and what a client-ready update looks like.",
    estimatedTimeMinutes: 60,
    expectedOutput: "A brief scoped to one status data source and one client-facing update format.",
    guideType: "setup",
    difficulty: "beginner",
    isRequired: true,
    retrievalTags: ["delivery-tracker", "week-0", "consultant", "define"],
    commonMistakes: [
      "Scoping 'a delivery platform' instead of one recurring status update artifact.",
      "Not defining what counts as 'at risk' in checkable terms — it needs a specific rule.",
      "Not deciding which engagement(s) this applies to — one, or a template for any.",
    ],
    doneChecklist: [
      "One status data source is named (a tracker, a spreadsheet, notes)",
      "The output format is one specific artifact — a client status email or update doc",
      "'At risk' is defined with a checkable rule",
      "Done criteria is measurable — e.g. 'cuts status update prep from 2 hours to 30 minutes'",
    ],
    contentBody: `## Pick your data source and output

Name where deliverable/milestone status actually lives for you — a project tracker, a spreadsheet, or your own working notes. Then pick the output: a client status email, a formatted update doc, or both from the same source.

## Define "at risk"

Write the rule: past the target date, no update in N days, or blocked with no resolution path. Specific and checkable, not a feeling.

## Confidentiality note

If status data references real client details, plan your anonymisation approach for anything shared with cohort peers.

## Your brief, specific to this archetype

Problem: "Producing the client status update from [source] takes me [X hours] every [frequency]."
Input: status data from [your source].
Output: a client-ready update — what's done, what's at risk, what's next.
Done criteria: cuts prep time by at least half with no loss of accuracy.`,
    steps: [
      {
        order: 1,
        instruction: "Name your status data source and gather a real (or composite) snapshot as your test set.",
        expectedAction: "Identify the source and gather real status data",
        expectedResult: "Real or realistic status data ready for week 1.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction: "Write your 'at risk' rule in specific, checkable terms.",
        expectedAction: "Define the at-risk rule precisely",
        expectedResult: "A written rule someone else could apply consistently.",
        commonErrorNote: "",
        aiHintRef: "Ask Claude: 'Is this at-risk rule specific enough to apply consistently?'",
        completionRule: "manual",
      },
      {
        order: 3,
        instruction: "Finalise your brief with the output format and done criteria. Post it (anonymised if needed) in the cohort Slack.",
        expectedAction: "Finalise and share the brief",
        expectedResult: "Brief posted, visible to the cohort.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
    ],
  },
  {
    title: "Build your delivery tracker",
    slug: "consultant-delivery-week-1-build",
    weekId: 1,
    trackSlug: "consultant-client",
    archetypeSlug: "delivery-tracker",
    purpose: "Get a working tool that turns real status data into a client-ready update.",
    estimatedTimeMinutes: 180,
    expectedOutput: "A tool producing a client-ready status update from real status data, with known gaps.",
    guideType: "build",
    difficulty: "intermediate",
    isRequired: true,
    retrievalTags: ["delivery-tracker", "week-1", "consultant", "build"],
    commonMistakes: [
      "Letting the tool soften or hide risk flags to sound more positive — clients need the honest read.",
      "Not handling a milestone with genuinely no update — a common real state, not a bug.",
      "Using internal jargon in client-facing output.",
    ],
    doneChecklist: [
      "The tool produces a client-ready update from real status data, applying your at-risk rule honestly",
      "It correctly handles a milestone with no recent update",
      "You've tested it on your messiest real status data",
      "You know the top 2 things it still gets wrong",
    ],
    contentBody: `## The system prompt

> You are a delivery tracking assistant for a consultant. You receive raw status data and produce a client-ready update: what's done, what's at risk (using this rule: [your rule]), and what's next.
>
> Do not soften or omit an at-risk flag to sound more positive — apply the rule honestly. Use client-appropriate language, not internal jargon or shorthand.
>
> If a milestone has no recent update, say so explicitly rather than omitting it.

## Building it

In Cursor: "Build a script that takes this status data format, produces a client update via Claude API using this prompt, and prints it." Test on real or composite data.

## Test the honesty case

Deliberately include a milestone that should be flagged at-risk under your rule. Confirm the tool flags it — a tool that quietly softens bad news is worse than useless for a client update.`,
    steps: [
      {
        order: 1,
        instruction: "Write and test your update prompt in Claude chat against real status data, checking it honestly applies your at-risk rule.",
        expectedAction: "Write and test the update prompt",
        expectedResult: "A client-ready update that correctly and honestly flags at-risk items.",
        commonErrorNote: "If the tool softens a flag that should apply, add 'apply the rule exactly, do not soften for tone' to the prompt.",
        aiHintRef: "Ask Claude: 'Does this update honestly reflect the at-risk status per my rule, or has anything been softened?'",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction: "Ask Cursor to build a script that runs the prompt against a status data file and prints the client update.",
        expectedAction: "Build the script",
        expectedResult: "A runnable script producing a client update from real status data.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 3,
        instruction: "Test with a milestone that has no recent update. Confirm it's stated explicitly, not omitted.",
        expectedAction: "Test the no-update case",
        expectedResult: "Stale milestones are clearly flagged, not silently dropped.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 4,
        instruction: "Fix the top problem, then record a 2-minute demo (anonymised if needed) and post it to the cohort Slack.",
        expectedAction: "Fix the top issue and share a demo",
        expectedResult: "The cohort has seen it working on real status data.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
    ],
  },
  {
    title: "Make your delivery tracker usable",
    slug: "consultant-delivery-week-2-usable",
    weekId: 2,
    trackSlug: "consultant-client",
    archetypeSlug: "delivery-tracker",
    purpose: "Get a fellow consultant producing an update from their own engagement's status data.",
    estimatedTimeMinutes: 150,
    expectedOutput: "A colleague ran it independently and produced an update they'd send with minor edits.",
    guideType: "build",
    difficulty: "intermediate",
    isRequired: true,
    retrievalTags: ["delivery-tracker", "week-2", "consultant", "usable"],
    commonMistakes: [
      "Not documenting the exact status data format the tool expects.",
      "Not checking whether the tone reads as appropriately client-facing to someone outside your own engagement.",
    ],
    doneChecklist: [
      "A colleague ran it on their own engagement's status data with no help",
      "Instructions specify the exact data format expected",
      "The tone read as client-appropriate to them, not internal or jargon-heavy",
      "They'd send the output with minor edits, not a full rewrite",
    ],
    contentBody: `## Document the exact input format

Whatever your tracker, spreadsheet, or notes format is, document it precisely — this is the step most likely to trip up a colleague running it for the first time on a different engagement.

## Check the tone from outside your engagement

Someone from a different engagement will notice jargon or internal shorthand you've stopped seeing. Ask specifically: does this read as something you'd send to a client?

## What "usable" means here

The colleague would send the output with only minor edits — not treat it as a rough draft needing a full rewrite.`,
    steps: [
      {
        order: 1,
        instruction: "Document the exact status data format the tool expects.",
        expectedAction: "Write input format instructions",
        expectedResult: "Clear, specific format documentation.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction: "Have a fellow consultant run the tool on their own engagement's status data, with no help.",
        expectedAction: "Run an unassisted usability test on a different engagement",
        expectedResult: "A real update produced from a different real engagement.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 3,
        instruction: "Ask whether the tone read as client-appropriate and whether they'd send it with only minor edits.",
        expectedAction: "Check tone and send-readiness",
        expectedResult: "A clear answer, with specifics if edits were needed.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 4,
        instruction: "Fix the top issue, record a Loom (anonymised if needed), and post it in the cohort Slack.",
        expectedAction: "Fix the issue and share a demo",
        expectedResult: "Cohort can access and understand the tool from the post.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
    ],
  },
  {
    title: "Get feedback on your delivery tracker",
    slug: "consultant-delivery-week-3-review",
    weekId: 3,
    trackSlug: "consultant-client",
    archetypeSlug: "delivery-tracker",
    purpose: "Validate the update's honesty and tone with consultants who'd actually send it.",
    estimatedTimeMinutes: 90,
    expectedOutput: "Two consultants reviewed real output and you've fixed the top honesty or tone issue.",
    guideType: "review",
    difficulty: "intermediate",
    isRequired: true,
    retrievalTags: ["delivery-tracker", "week-3", "consultant", "feedback"],
    commonMistakes: [
      "Not specifically checking whether any at-risk item got softened or omitted.",
      "Only checking tone, not checking that every status claim is actually accurate.",
    ],
    doneChecklist: [
      "Two consultants reviewed real output against the real status data",
      "You checked specifically for softened or omitted at-risk flags",
      "You fixed the top issue found",
    ],
    contentBody: `## Check for softened bad news specifically

The costliest failure for a delivery tracker is a risk that got smoothed over in client-facing language. Ask reviewers directly: "Does this update honestly reflect what's actually at risk?"

## What to fix

Fix any honesty gap before touching tone or formatting — an update that reads well but hides a real risk is worse than one that's blunt but accurate.`,
    steps: [
      {
        order: 1,
        instruction: "Show two consultants a real update alongside the real status data. Ask specifically whether any risk was softened or omitted.",
        expectedAction: "Run two honesty-focused reviews",
        expectedResult: "Documented feedback on accuracy and honesty of risk flags.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction: "Fix the top honesty or tone issue raised.",
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
    title: "Ship your delivery tracker",
    slug: "consultant-delivery-week-4-ship",
    weekId: 4,
    trackSlug: "consultant-client",
    archetypeSlug: "delivery-tracker",
    purpose: "Put your delivery tracker where it runs as part of your actual client update rhythm.",
    estimatedTimeMinutes: 90,
    expectedOutput: "Shipped tool + handoff doc with a real/composite example + Loom demo.",
    guideType: "submit",
    difficulty: "intermediate",
    isRequired: true,
    retrievalTags: ["delivery-tracker", "week-4", "consultant", "ship"],
    commonMistakes: [
      "Not documenting the at-risk rule so the next user applies it consistently.",
      "Not noting what still needs human review before it goes to a client.",
    ],
    doneChecklist: [
      "Tool runs as part of your actual client status update rhythm",
      "Handoff doc includes the at-risk rule, a real/composite example, and review steps before client delivery",
      "Loom demo recorded and posted in #ships; certification submitted",
    ],
    contentBody: `## Where this lives

Link it from your engagement's status tracker or wherever you already log delivery progress, so producing the update is a natural next step, not a separate task.

## The handoff doc

Include the at-risk rule, a real or composite before/after example, and what still needs human review before anything goes to a client.

Submit for certification once the demo and handoff doc are ready.`,
    steps: [
      {
        order: 1,
        instruction: "Wire the tool into your actual status update rhythm — linked from your delivery tracker or engagement doc.",
        expectedAction: "Integrate the tool into your update rhythm",
        expectedResult: "Producing the update is a natural next step, not a separate forgotten task.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction: "Write the handoff doc with the at-risk rule, a real/composite example, and required review steps.",
        expectedAction: "Write the handoff doc",
        expectedResult: "A one-page doc a colleague could follow.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 3,
        instruction: "Record a 5-minute Loom (anonymised if needed), post in #ships, and submit for certification in the hub.",
        expectedAction: "Record demo, ship, and submit",
        expectedResult: "Tool shipped and certification submitted.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
    ],
  },
];

const INSIGHT_RECOMMENDATION_GENERATOR: ArchetypeGuideData[] = [
  {
    title: "Define your insight/recommendation generator",
    slug: "consultant-insight-week-0-define",
    weekId: 0,
    trackSlug: "consultant-client",
    archetypeSlug: "insight-recommendation-generator",
    purpose: "Scope your input type and exactly how recommendations get ranked.",
    estimatedTimeMinutes: 60,
    expectedOutput: "A brief scoped to one input type and a defined ranking logic for recommendations.",
    guideType: "setup",
    difficulty: "beginner",
    isRequired: true,
    retrievalTags: ["insight-recommendation-generator", "week-0", "consultant", "define"],
    commonMistakes: [
      "Scoping for every kind of input (interviews, data, docs) at once instead of one primary type.",
      "Not defining how recommendations get ranked — impact, effort, or urgency needs an explicit rule.",
      "Producing recommendations without requiring them to cite the evidence behind them.",
    ],
    doneChecklist: [
      "One input type is named — interviews, raw data, or discovery notes",
      "Your ranking logic for recommendations is written down explicitly",
      "You've decided every recommendation must cite its supporting evidence",
      "Done criteria is measurable — e.g. 'cuts recommendation drafting from a day to two hours'",
    ],
    contentBody: `## Pick your input and ranking logic

Name the one input type — interview transcripts, raw data exports, or discovery notes. Then define how recommendations get ranked: by impact, by effort to implement, by urgency, or a combination — write the actual logic.

## Require evidence citation

Every recommendation should trace back to something specific in the input. "Consider improving onboarding" isn't a recommendation from your tool — it's a guess. "37% of interviewees cited unclear first-week expectations" backing a specific recommendation is.

## Your brief, specific to this archetype

Problem: "Turning [input type] into ranked recommendations takes me [X hours] per engagement."
Input: [interviews / data / discovery notes], typically [N] sources.
Output: ranked recommendations, each with cited supporting evidence.
Done criteria: cuts drafting time by at least half and a colleague trusts the ranking.`,
    steps: [
      {
        order: 1,
        instruction: "Name your input type and write your ranking logic for recommendations (impact, effort, urgency, or combination) explicitly.",
        expectedAction: "Define input type and ranking logic",
        expectedResult: "A written ranking rule a colleague could apply consistently.",
        commonErrorNote: "",
        aiHintRef: "Ask Claude: 'Is this ranking logic specific enough for a tool to apply consistently?'",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction: "Gather 3–5 real (or composite, anonymised) source documents as your test set.",
        expectedAction: "Collect real or composite source material",
        expectedResult: "Real or realistic input ready for week 1.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 3,
        instruction: "Finalise your brief with the evidence-citation requirement and done criteria. Post it (anonymised if needed) in the cohort Slack.",
        expectedAction: "Finalise and share the brief",
        expectedResult: "Brief posted, visible to the cohort.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
    ],
  },
  {
    title: "Build your insight/recommendation generator",
    slug: "consultant-insight-week-1-build",
    weekId: 1,
    trackSlug: "consultant-client",
    archetypeSlug: "insight-recommendation-generator",
    purpose: "Get a working tool that produces ranked, evidence-cited recommendations from real input.",
    estimatedTimeMinutes: 180,
    expectedOutput: "A tool producing ranked recommendations with cited evidence from real or composite input.",
    guideType: "build",
    difficulty: "intermediate",
    isRequired: true,
    retrievalTags: ["insight-recommendation-generator", "week-1", "consultant", "build"],
    commonMistakes: [
      "Letting the tool produce generic best-practice recommendations not actually grounded in the input.",
      "Not applying the ranking logic consistently — recommendations should be genuinely ordered, not just listed.",
      "Testing only on rich, detailed input instead of a thinner, less conclusive one.",
    ],
    doneChecklist: [
      "The tool produces ranked recommendations, each with cited evidence from the real input",
      "The ranking logic is applied consistently, not just presented as an unordered list",
      "You've tested it on thinner, less conclusive input",
      "You know the top 2 things it still gets wrong",
    ],
    contentBody: `## The system prompt

> You are a recommendation assistant for a consultant. You receive [interviews / data / discovery notes] and produce ranked recommendations using this logic: [your ranking rule].
>
> Every recommendation must cite the specific evidence in the input that supports it. If the input doesn't clearly support a strong recommendation, say so rather than manufacturing one.
>
> Do not use generic consulting language — ground every recommendation in what the input actually shows.

## Building it

In Cursor: "Build a script that takes this input, produces ranked, evidence-cited recommendations via Claude API, and prints them." Test on real or composite input.

## Test the thin case

Test on a thinner, less conclusive input set. A good tool says "the evidence here supports fewer strong recommendations than usual" rather than manufacturing confident ones to fill a quota.`,
    steps: [
      {
        order: 1,
        instruction: "Write and test your recommendation prompt in Claude chat against real or composite input, checking every recommendation cites real evidence.",
        expectedAction: "Write and test the recommendation prompt",
        expectedResult: "Ranked recommendations that are genuinely evidence-grounded, not generic.",
        commonErrorNote: "If a recommendation reads as generic best-practice advice, tighten the prompt to require a direct citation.",
        aiHintRef: "Ask Claude: 'Check this output — is every recommendation actually grounded in the input, or does anything read as generic?'",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction: "Ask Cursor to build a script that runs the prompt against an input file and prints the ranked recommendations.",
        expectedAction: "Build the script",
        expectedResult: "A runnable script producing ranked recommendations from real input.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 3,
        instruction: "Test on a thinner, less conclusive input set. Confirm the tool doesn't manufacture confident recommendations to fill a quota.",
        expectedAction: "Test the thin-evidence case",
        expectedResult: "The tool is honest about weaker evidence rather than overreaching.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 4,
        instruction: "Fix the top problem, then record a 2-minute demo (anonymised if needed) and post it to the cohort Slack.",
        expectedAction: "Fix the top issue and share a demo",
        expectedResult: "The cohort has seen it working on real or composite input.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
    ],
  },
  {
    title: "Make your insight/recommendation generator usable",
    slug: "consultant-insight-week-2-usable",
    weekId: 2,
    trackSlug: "consultant-client",
    archetypeSlug: "insight-recommendation-generator",
    purpose: "Get a fellow consultant running this on their own engagement's input without your help.",
    estimatedTimeMinutes: 150,
    expectedOutput: "A colleague ran it independently and trusted the ranked recommendations as a real starting point.",
    guideType: "build",
    difficulty: "intermediate",
    isRequired: true,
    retrievalTags: ["insight-recommendation-generator", "week-2", "consultant", "usable"],
    commonMistakes: [
      "Not explaining the ranking logic before the tester judges whether the order makes sense.",
      "Not testing with an engagement type different from your own — the tool should generalise, not be over-fit to your one case.",
    ],
    doneChecklist: [
      "A colleague ran it on their own (or composite) engagement input with no help",
      "They understood the ranking logic well enough to judge if the order made sense",
      "It's been tested on an engagement type different from your own",
      "They'd use the output as a real drafting starting point",
    ],
    contentBody: `## Explain the ranking logic first

A tester can't judge whether the recommendation order makes sense without knowing your ranking rule. Brief them, then let them run it independently.

## Test across engagement types

If you only test on your own engagement type, the tool may be quietly over-fit to it. Have a colleague test with a different kind of engagement's input to check it generalises.

## What "usable" means here

The colleague would use the ranked, evidence-cited output as a genuine starting draft — not discard it and start their own synthesis from scratch.`,
    steps: [
      {
        order: 1,
        instruction: "Brief a fellow consultant on your ranking logic, then have them run the tool on their own (or composite) engagement input with no further help.",
        expectedAction: "Run an unassisted usability test after briefing",
        expectedResult: "Real ranked recommendations and feedback on usability.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction: "Test with input from a different engagement type than your own. Confirm the tool still produces sensible, grounded recommendations.",
        expectedAction: "Test across a different engagement type",
        expectedResult: "The tool generalises reasonably, not just to your specific case.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 3,
        instruction: "Fix the top issue, record a Loom (anonymised if needed), and post it in the cohort Slack.",
        expectedAction: "Fix the issue and share a demo",
        expectedResult: "Cohort can access and understand the tool from the post.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
    ],
  },
  {
    title: "Get feedback on your insight/recommendation generator",
    slug: "consultant-insight-week-3-review",
    weekId: 3,
    trackSlug: "consultant-client",
    archetypeSlug: "insight-recommendation-generator",
    purpose: "Validate the ranking and evidence with consultants who'd actually present these recommendations.",
    estimatedTimeMinutes: 90,
    expectedOutput: "Two consultants reviewed real ranked output and you've fixed the top issue.",
    guideType: "review",
    difficulty: "intermediate",
    isRequired: true,
    retrievalTags: ["insight-recommendation-generator", "week-3", "consultant", "feedback"],
    commonMistakes: [
      "Not asking whether the ranking order itself made sense, only whether individual recommendations were reasonable.",
      "Not checking whether any recommendation read as generic rather than input-specific.",
    ],
    doneChecklist: [
      "Two consultants reviewed real ranked output against the source input",
      "You asked specifically whether the ranking order made sense",
      "You checked for any recommendation that read as generic rather than evidence-specific",
      "You fixed the top issue found",
    ],
    contentBody: `## Check the ranking, not just the recommendations

A reviewer might agree with every individual recommendation but disagree with the order. Ask specifically: "Does this ranking match what you'd prioritise, and if not, why?"

## Watch for generic drift

Ask if any recommendation could have been written without reading the input at all — that's the sign it's drifted into generic consulting language rather than staying evidence-grounded.`,
    steps: [
      {
        order: 1,
        instruction: "Show two consultants the ranked recommendations alongside the source input. Ask specifically about the ranking order and any generic-sounding items.",
        expectedAction: "Run two reviews focused on ranking and evidence grounding",
        expectedResult: "Documented feedback on both the order and the grounding of recommendations.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction: "Fix the top issue raised — whether it's a ranking problem or a generic-sounding recommendation.",
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
    title: "Ship your insight/recommendation generator",
    slug: "consultant-insight-week-4-ship",
    weekId: 4,
    trackSlug: "consultant-client",
    archetypeSlug: "insight-recommendation-generator",
    purpose: "Put your recommendation generator where you'll reach for it on your next synthesis deadline.",
    estimatedTimeMinutes: 90,
    expectedOutput: "Shipped tool + handoff doc with a real/composite example + Loom demo.",
    guideType: "submit",
    difficulty: "intermediate",
    isRequired: true,
    retrievalTags: ["insight-recommendation-generator", "week-4", "consultant", "ship"],
    commonMistakes: [
      "Not documenting the ranking logic so the next user applies it consistently.",
      "Not stating what still needs human review before recommendations reach a client deck.",
    ],
    doneChecklist: [
      "Tool lives somewhere you'll reach for it under your next synthesis deadline",
      "Handoff doc includes the ranking logic, a real/composite example, and required human review steps",
      "Loom demo recorded and posted in #ships; certification submitted",
    ],
    contentBody: `## Where this lives

Link it from your synthesis or reporting template, so it's the natural first step when you sit down to draft recommendations, not a separate tool you have to remember exists.

## The handoff doc

Include the ranking logic, a real or composite before/after example, and what still needs human review before recommendations go into a client deck.

Submit for certification once the demo and handoff doc are ready.`,
    steps: [
      {
        order: 1,
        instruction: "Put the tool where it's the natural first step when drafting recommendations — linked from your synthesis template.",
        expectedAction: "Give the tool a discoverable home",
        expectedResult: "It's linked from where synthesis work actually starts.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction: "Write the handoff doc with the ranking logic, a real/composite example, and required review steps.",
        expectedAction: "Write the handoff doc",
        expectedResult: "A one-page doc a colleague could follow.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 3,
        instruction: "Record a 5-minute Loom (anonymised if needed), post in #ships, and submit for certification in the hub.",
        expectedAction: "Record demo, ship, and submit",
        expectedResult: "Tool shipped and certification submitted.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
    ],
  },
];

export const CONSULTANT_ARCHETYPE_CURRICULUM = [
  ...CLIENT_DIAGNOSTIC_TOOL,
  ...DELIVERY_TRACKER,
  ...INSIGHT_RECOMMENDATION_GENERATOR,
];

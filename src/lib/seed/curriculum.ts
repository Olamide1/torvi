/**
 * Torvi curriculum seed data — weeks 0–4.
 * Universal guides (no trackId/archetypeId). Track-specific guidance lives
 * inside contentBody under a "Role path notes" section.
 */

export interface GuideData {
  title: string;
  slug: string;
  weekId: number;
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

export const CURRICULUM: GuideData[] = [
  // ─── WEEK 0 ────────────────────────────────────────────────────────────────
  {
    title: "Define your tool",
    slug: "week-0-define",
    weekId: 0,
    purpose:
      "Lock down exactly what you are building before touching any tools. The brief is your north star for the next four weeks.",
    estimatedTimeMinutes: 90,
    expectedOutput:
      "One-page tool brief: problem statement, intended user, inputs, outputs, and done criteria.",
    guideType: "setup",
    difficulty: "beginner",
    isRequired: true,
    retrievalTags: ["brief", "define", "week-0", "problem-statement", "scope"],
    commonMistakes: [
      "Picking a problem that would take a team six months to build properly — one screen, one prompt, one output.",
      "Writing a vague problem statement like 'reporting is inefficient' instead of a specific one.",
      "Building for a theoretical user instead of naming a real person or role.",
      "Waiting for the perfect problem — you will refine this in week 1.",
    ],
    doneChecklist: [
      "Problem statement is one specific sentence describing the current painful reality",
      "Intended user is named (a real person or an exact role title, not 'stakeholders')",
      "Inputs are listed as concrete items (a spreadsheet export, an email thread, a Slack message)",
      "Output is one specific deliverable, not a dashboard or a platform",
      "Done criteria is measurable — you will know in week 4 whether this worked",
    ],
    contentBody: `## Why this matters

Most cohort members who don't finish fail here — not in week 4. They pick a problem that's too big, too vague, or one they don't actually own. This week's only job is to define a problem small enough to ship in four weeks and specific enough that you'll know when you're done.

## The tool brief format

Your brief has five parts. Do not skip any.

**1. The problem in one sentence**
Write what happens right now without your tool. Be specific. "Preparing the weekly ops report takes me 90 minutes every Friday and still misses three data sources" is a good problem statement. "Reporting is inefficient" is not.

**2. Who uses it**
Name a real person or an exact role title. Not "my stakeholders" — your actual name or a specific person's title.

**3. What goes in**
List the exact inputs your tool will need. A copy-paste from an email, a spreadsheet export, a Slack thread. If you don't know what the inputs are, your problem is still too vague.

**4. What comes out**
One specific output: a formatted report, a prioritised list, a one-page summary. One output. Not "a dashboard" — that's a product, not a tool.

**5. Done criteria**
How will you know at the end of week 4 that this worked? "I use it at least twice a week and it saves me 45 minutes each time" is a done criterion. "It looks good" is not.

## Role path notes

**PM / Product track:** Your tool is most likely in discovery, prioritisation, or planning. Good examples: a research synthesis tool, a spec reviewer, a meeting prep tool that pulls context from Notion. Avoid building a full roadmap tool — narrow to one repeating task you do today.

**Ops / Workflow track:** Your tool likely touches intake, reporting, or routing. Good examples: an email triage assistant, a weekly report generator, a task assignment router. Think about the Friday-afternoon job that always takes too long.

**Consultant / Client track:** Your tool is probably diagnostic or packaging-focused. Good examples: a discovery questionnaire synthesiser, a recommendations formatter, a status update generator. Think about what you rebuild from scratch on every engagement.

## How to use Claude to write your brief

Open Claude and paste this prompt, filling in your details:

> I'm a [your role] at [company type]. Every [frequency], I have to [describe the task]. It takes about [time]. The hardest part is [the bottleneck]. I want to build an AI tool that handles this. Help me write a one-page tool brief with: problem statement, intended user, inputs, outputs, and done criteria. Be specific and push back if anything is too vague.

Review the output. Edit every sentence until it is accurate and specific. The brief should fit on one page.

## What "one page" actually means

Your brief is done when you can read it aloud in under two minutes and every sentence is something you could verify as true or false. If a sentence is aspirational rather than descriptive, cut it or make it specific.`,
    steps: [
      {
        order: 1,
        instruction:
          "Open a blank doc and write your problem statement in one sentence. Describe what happens right now, without your tool, using specific numbers or time when you can. Time-box this to 10 minutes.",
        expectedAction: "Write one sentence describing the painful current reality",
        expectedResult:
          "A specific, falsifiable problem statement — not a feeling, not a goal, a description of what happens now.",
        commonErrorNote:
          "If your sentence contains words like 'better', 'improve', or 'more efficient', rewrite it to describe the current state instead.",
        aiHintRef:
          "Paste your problem statement into Claude and ask: 'Is this specific enough to build a tool for? What information is missing?'",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction:
          "Name the intended user. Write a real person's name or their exact role title. If the tool is for you, write your own name.",
        expectedAction: "Write down who will use this tool",
        expectedResult:
          "One named person or one specific role title — not a category or a team.",
        commonErrorNote:
          "If you wrote a plural ('my team', 'stakeholders'), name the primary user. There can only be one primary user for a four-week build.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 3,
        instruction:
          "List the inputs. What does a user need to give the tool for it to run? List each input as a concrete item — a file type, a copy-paste block, a URL.",
        expectedAction: "List every input the tool will require",
        expectedResult:
          "A short list of concrete inputs. Each one should be something you could attach to an email or paste into a text box.",
        commonErrorNote:
          "If any input is 'all the context about the project', that's too vague. Break it into specific pieces of information.",
        aiHintRef:
          "Ask Claude: 'Given this problem and this user, what are the minimum inputs a tool would need to produce a useful output?'",
        completionRule: "manual",
      },
      {
        order: 4,
        instruction:
          "Define the output. What does the tool produce? Write it as a specific document, list, or formatted block. Then write your done criteria — how will you know in week 4 this worked?",
        expectedAction:
          "Write the specific output format and a measurable done criterion",
        expectedResult:
          "One output description and one done criterion with a number or observable behaviour in it.",
        commonErrorNote:
          "If your done criteria includes the word 'good' or 'better', make it measurable. 'Saves me 30 minutes per week' is measurable. 'Works well' is not.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 5,
        instruction:
          "Post your brief in #week-0-briefs on Slack. Use the brief template pinned in that channel. Read two other briefs and leave one piece of feedback on each.",
        expectedAction:
          "Post the completed brief in Slack and give feedback on two others",
        expectedResult:
          "Your brief is visible to the cohort. You have read and responded to two others.",
        commonErrorNote:
          "If your brief isn't ready, post a draft anyway. Feedback on a rough draft is more useful than a week of solo editing.",
        aiHintRef: "",
        completionRule: "manual",
      },
    ],
  },

  // ─── WEEK 1 ────────────────────────────────────────────────────────────────
  {
    title: "Build the first version",
    slug: "week-1-build-first",
    weekId: 1,
    purpose:
      "Get a rough working version running on real inputs from your actual job. Not polished — working.",
    estimatedTimeMinutes: 180,
    expectedOutput:
      "A working prototype you can demo to yourself using real inputs. You know the top 3 things wrong with it.",
    guideType: "build",
    difficulty: "intermediate",
    isRequired: true,
    retrievalTags: [
      "build",
      "prototype",
      "week-1",
      "cursor",
      "claude",
      "first-version",
      "prompt",
    ],
    commonMistakes: [
      "Spending days on environment setup before running a single test.",
      "Building a UI before the core logic works.",
      "Testing with synthetic or ideal inputs — test with the messy real data from your job.",
      "Trying to fix everything after the first run instead of identifying the single most important problem.",
    ],
    doneChecklist: [
      "Your tool runs on at least one real input from your actual job",
      "You have tested it 10 times with different inputs",
      "You can identify the top 3 things wrong with the output",
      "You have fixed the single most important problem",
      "You can show someone the output in 2 minutes",
    ],
    contentBody: `## What "working" means this week

Working means: you give it a real input from your actual job, it produces something useful. Not perfect. Not beautiful. Useful enough that you can look at it and say "this is on the right track" or "this is completely wrong — and I know why."

You are not building a product. You are building a first draft that teaches you what the real problems are.

## Start with the prompt, not the code

Before opening Cursor, open Claude and write your system prompt. A system prompt tells Claude what role it's playing and how it should handle inputs.

Start with this structure:

> You are a [describe the role]. You receive [input type] and produce [output type].
>
> Format: [describe the format of the output precisely]
>
> Rules:
> - [rule 1]
> - [rule 2]
>
> If the input is unclear or incomplete: [what should happen]

Test this prompt in the Claude chat interface with 5 real inputs. Refine it until the output is directionally right — not perfect, directionally right. Then take it to Cursor.

## Getting started in Cursor

Open Cursor. Start a new file or project. Your first message:

> I'm building [describe your tool from the brief]. The input is [describe input]. The output should be [describe output format]. Here is my system prompt: [paste your prompt]. Build a simple script that takes the input, sends it to Claude API with this system prompt, and prints the output. No UI yet. I'll test it manually first.

Let it write the code. Run it. Do not edit it yet.

## The 10-input test

Test your tool with 10 different real inputs from your job. Use real data — not clean, synthetic examples. Real inputs are messy, inconsistent, and incomplete. That's the point.

After 10 runs, you will know:
- What the prompt handles well
- What it consistently gets wrong
- Where the output format breaks

Fix only the most important problem. Then test 10 more times.

## When the code doesn't run

This will happen. Paste the full error message into Cursor and write:

> This error appeared when I ran the code. What's wrong and how do I fix it?

90% of first-run errors are dependency issues, missing configuration, or path problems — not logical problems with your tool. Cursor will fix these in one or two messages.

## Setting up API access

If your tool calls Claude directly via code, you need an API key from console.anthropic.com. Add it to a \`.env\` file:

\`\`\`
ANTHROPIC_API_KEY=sk-ant-...
\`\`\`

Tell Cursor: "Add .env to .gitignore if it isn't already." Never commit this file.

## Tool selection guide

- **Claude (chat interface):** For writing and iterating on your system prompt before putting it in code.
- **Cursor:** For writing the code that calls Claude, handles inputs, and formats outputs.
- **Claude API:** When your tool needs to call Claude programmatically — not just from the chat UI.
- **v0 (vercel.com/v0):** If you want to quickly generate a simple web UI after the core logic works.

## What not to do this week

Do not spend time on: the name of the tool, making the output look beautiful, adding settings or configuration, error handling for unlikely edge cases, or building a UI before the logic works.

Spend time on: getting the core logic right on realistic inputs, testing with real messy data from your job.`,
    steps: [
      {
        order: 1,
        instruction:
          "Set up your environment: install Cursor (cursor.com), get a Claude API key from console.anthropic.com, and create a new project folder with a .env file containing your API key.",
        expectedAction: "Cursor installed, API key in .env file, project folder ready",
        expectedResult:
          "You can open Cursor and start a conversation with the agent.",
        commonErrorNote:
          "If you're blocked on setup for more than 30 minutes, post in #week-1-build on Slack with a screenshot of the error. Don't lose a day to an environment problem.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction:
          "Open Claude chat and write your system prompt using your tool brief. Test it with 5 real inputs and refine it until the output is directionally correct.",
        expectedAction:
          "Write system prompt in Claude chat and test with 5 real inputs",
        expectedResult:
          "A system prompt that produces output you recognise as useful for at least 3 out of 5 inputs.",
        commonErrorNote:
          "If none of the 5 outputs are useful, your problem statement may be too vague or your inputs may be too varied. Narrow the scope.",
        aiHintRef:
          "Ask Claude to critique your system prompt: 'What is ambiguous in this prompt that could cause inconsistent output?'",
        completionRule: "manual",
      },
      {
        order: 3,
        instruction:
          "Open Cursor and ask it to build a script that takes your input, calls Claude API with your system prompt, and prints the output. Give it your system prompt from step 2.",
        expectedAction: "Ask Cursor to implement the tool",
        expectedResult: "A runnable script that calls Claude API with your prompt.",
        commonErrorNote:
          "If Cursor writes code that doesn't run, paste the full error back into Cursor and ask it to fix it. This is normal and takes one or two rounds.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 4,
        instruction:
          "Test your tool with 10 different real inputs from your job. Write down what works and what doesn't after each run. Do not fix anything yet — observe first.",
        expectedAction: "Run 10 tests with real inputs and document results",
        expectedResult:
          "A list of what the tool does well and what it consistently gets wrong.",
        commonErrorNote:
          "If you're using clean, synthetic inputs because real ones are sensitive, anonymise them. Fake inputs teach you nothing.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 5,
        instruction:
          "Identify the single most important problem from your 10 tests. Fix only that problem — either by rewriting part of the system prompt or asking Cursor to change the code. Test again.",
        expectedAction: "Fix the top problem and retest",
        expectedResult:
          "The main failure mode from step 4 is reduced or eliminated. New failure modes are documented for week 2.",
        commonErrorNote:
          "If you're tempted to fix more than one thing at a time, don't. Changing multiple things at once makes it impossible to know what worked.",
        aiHintRef:
          "Ask Claude: 'Here is my system prompt and here is an output that went wrong. What specific part of the prompt caused this and how should I rewrite it?'",
        completionRule: "manual",
      },
      {
        order: 6,
        instruction:
          "Record a 2-minute screen recording of your tool running on a real input. Post it in #week-1-build on Slack. It does not need to be polished.",
        expectedAction: "Record and share a 2-minute demo in Slack",
        expectedResult:
          "The cohort can see your tool working on a real input. You have received at least one piece of feedback.",
        commonErrorNote:
          "If you're embarrassed by how rough it is, good — that means you shipped something real. Post it anyway.",
        aiHintRef: "",
        completionRule: "manual",
      },
    ],
  },

  // ─── WEEK 2 ────────────────────────────────────────────────────────────────
  {
    title: "Make it usable",
    slug: "week-2-usable",
    weekId: 2,
    purpose:
      "Turn your prototype into something another person can run without your help.",
    estimatedTimeMinutes: 180,
    expectedOutput:
      "Tool that runs reliably on realistic inputs, with instructions a colleague can follow independently.",
    guideType: "build",
    difficulty: "intermediate",
    isRequired: true,
    retrievalTags: [
      "usability",
      "week-2",
      "friction",
      "testing",
      "instructions",
      "handoff",
    ],
    commonMistakes: [
      "Adding features instead of removing friction — more functionality will not make your tool easier to use.",
      "Only testing with yourself — you already know how the tool works, which makes you the worst tester.",
      "Writing instructions that assume knowledge the user doesn't have.",
      "Polishing the output aesthetics before fixing the friction in the input step.",
    ],
    doneChecklist: [
      "A colleague ran the tool without your help and produced a useful output",
      "Every input step is documented in one sentence",
      "You have watched someone use it and written down where they got stuck",
      "You have fixed the one friction point that most affects whether the tool gets used",
      "The tool works on the most common case, a short input, and a long input",
    ],
    contentBody: `## The usability test — do this first

Before doing anything else this week, run this test: ask a colleague to use your tool. Give them no instructions. Watch what happens.

You are looking for:
- Where they get stuck
- What they expect to happen that doesn't
- What the first question they ask is

Do not answer their questions. Write them down instead.

What you just found is your week 2 work list.

## The friction audit

After the test, write down every step a new user needs to take to get a result. Every step. Including: "download Python", "paste into cell B3", "remember the format must be comma-separated".

For each step, ask: can this be removed, or made automatic?

The goal is not to make it beautiful. The goal is to make it work without you in the room.

## Writing instructions that work

If a step can't be removed, document it. One sentence per step. Write it for someone who has never seen your tool before and has five minutes to figure it out.

Use this format:
1. [What to do] — [why it matters, if it's not obvious]
2. Paste your [input type] here: [show an example of the correct format]
3. The output will appear in [location]. Copy it to [where they use it].

Test your instructions by giving them to someone who hasn't seen your tool. If they get stuck, the instructions are unclear — not the person.

## The one-change rule

After your usability test, you will have a list of problems. Fix only the one that would most affect whether the tool gets used regularly. Then test again.

This is not a shortcut. Adding features will make things worse. One change, one test — repeat until the tool works without you.

## Testing with real data

This week, test your tool on four cases:
- The most common input (what happens 80% of the time)
- The shortest valid input
- The longest realistic input
- Something slightly wrong format (a common user mistake)

If the tool breaks on any of these, fix it before week 3.

If your data is sensitive, ask Cursor to write a simple anonymisation step that runs before the tool processes the input.

## Handling failure gracefully

What happens when the input is incomplete? When Claude returns something unexpected? When the user pastes the wrong thing?

Your tool does not need to handle every edge case. It needs to fail clearly — meaning: when something goes wrong, the user knows what went wrong and what to do about it.

Ask Cursor: "Add a clear error message when [the most common failure mode you found in testing]. The message should tell the user exactly what went wrong."`,
    steps: [
      {
        order: 1,
        instruction:
          "Find one colleague who has the problem your tool solves. Ask them to run your tool on a real task of theirs. Give them no help. Watch and take notes.",
        expectedAction: "Run an unassisted usability test with a real person",
        expectedResult:
          "A list of at least 3 places where the person got stuck or had a question.",
        commonErrorNote:
          "If no one has the same problem as you, use your own second walkthrough — come back to your tool after two days away and follow only the instructions.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction:
          "List every step a new user needs to take to get a result from your tool. Write each step as a sentence. Count them.",
        expectedAction: "Write out every user step end-to-end",
        expectedResult:
          "A numbered list of every action required — from opening the tool to using the output.",
        commonErrorNote:
          "If your list has more than 8 steps, some of them can probably be removed or automated. Start there.",
        aiHintRef:
          "Ask Claude: 'Given this list of user steps, which ones could be automated or eliminated in a tool built with Cursor?'",
        completionRule: "manual",
      },
      {
        order: 3,
        instruction:
          "Identify the single friction point most likely to stop someone from using this tool again. Fix it — either by removing the step, automating it, or writing a clearer instruction.",
        expectedAction: "Remove or fix the highest-friction step",
        expectedResult:
          "The step that caused the most confusion in testing is either gone or significantly clearer.",
        commonErrorNote:
          "If you're tempted to add a feature to fix the friction, try removing the step first. Addition is rarely the right answer at this stage.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 4,
        instruction:
          "Write usage instructions. One sentence per step. Include an example of a correctly formatted input. Put these instructions where a user would see them before running the tool.",
        expectedAction: "Write and position usage instructions",
        expectedResult:
          "A short instruction set that a new user can follow to get a result on their first try.",
        commonErrorNote:
          "If your instructions contain words like 'simply' or 'just', delete them and rewrite. If it were simple, you wouldn't need to write it.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 5,
        instruction:
          "Test your tool on four inputs: the most common case, the shortest valid input, the longest realistic input, and something with a slightly wrong format. Document what happens in each case.",
        expectedAction: "Run four structured tests and document results",
        expectedResult:
          "You know exactly what your tool handles well and where it breaks. Edge case failures produce a clear error message rather than a confusing output.",
        commonErrorNote:
          "If the tool produces a confident-looking but wrong output on a bad input, that is worse than an error message. Ask Cursor to add a validation step.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 6,
        instruction:
          "Record a short Loom (3–5 minutes) walking through the tool with the instructions. Post it in #week-2-usable on Slack alongside the link to your tool.",
        expectedAction: "Record a Loom and share in Slack",
        expectedResult:
          "Cohort members can access and understand your tool from the Slack post alone.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
    ],
  },

  // ─── WEEK 3 ────────────────────────────────────────────────────────────────
  {
    title: "Get feedback and improve",
    slug: "week-3-review",
    weekId: 3,
    purpose:
      "Get real feedback from people who would actually use this tool. Fix the real problems, not the imagined ones.",
    estimatedTimeMinutes: 120,
    expectedOutput:
      "Tool reviewed by at least two people with documented feedback and one substantive improvement based on it.",
    guideType: "review",
    difficulty: "intermediate",
    isRequired: true,
    retrievalTags: [
      "review",
      "feedback",
      "week-3",
      "peer-review",
      "polish",
      "validation",
    ],
    commonMistakes: [
      "Only showing the tool to people who will say nice things — you need honest users, not supportive colleagues.",
      "Defending the tool during feedback instead of listening.",
      "Acting on every piece of feedback instead of identifying the highest-impact change.",
      "Improving aesthetics when the real blockers are UX or reliability.",
    ],
    doneChecklist: [
      "Two people who would actually use this tool have given you structured feedback",
      "You have documented what you heard — including things you disagree with",
      "You have made one change directly based on the feedback",
      "You can explain what the tool does in three sentences to someone who doesn't know your job",
      "You have attended or watched the peer review workshop",
    ],
    contentBody: `## Why feedback scares most people

Most cohort members show their tool to people who will say nice things. That feels good and teaches you nothing.

This week, show your tool to people who would actually use it in their job — not your manager unless your manager is a real user, not your most supportive colleague. Someone who has the problem your tool solves and would judge it on whether it saves them time.

## The feedback session format

A useful feedback session takes 20 minutes. Here is the structure:

**Part 1 — context (5 min):** You describe the problem your tool solves. One paragraph. Not a pitch — a description. "Every Monday I spent an hour on X. I built something that does Y and takes Z minutes instead."

**Part 2 — observation (10 min):** The other person uses your tool on their own real input. You do not help. You take notes.

**Part 3 — questions (5 min):** You ask:
1. What would stop you from using this in your actual work?
2. What would you change first?
3. Is there anything you expected it to do that it didn't?

Do not defend the tool. Do not explain why things work the way they do. Listen and write everything down.

## What to do with feedback

After two sessions, you will have a list of issues. Sort them:

- **Real blockers:** things that would stop someone from using the tool regularly
- **Nice to haves:** things that would make it better but aren't blockers
- **Misunderstandings:** things the person got wrong that better instructions could fix

Fix one real blocker. Rewrite one instruction that caused confusion. Ignore the nice-to-haves until after you ship.

## Office hours this week

Bring your feedback list to office hours. Come with a specific question: "I got this feedback on X. I'm not sure if I should fix Y or Z — what would you do?"

Vague questions get vague answers. The more specific your question, the more useful the session.

## The peer review workshop

This week's workshop is a structured peer review. You will review two other tools, and two cohort members will review yours.

To prepare:
- Make sure your tool runs on an input you didn't write yourself
- Write a one-paragraph description a non-expert can understand
- Have a real input ready for the reviewer to use

Reviewers are instructed to be honest. The most useful feedback is: "I couldn't figure out how to X" or "this broke when I tried Y."

## The confidence test

By the end of this week, you should be able to say: "This tool does X. It works reliably on Y. Two people have used it and both got useful output." If you can say that, you're ready for week 4.`,
    steps: [
      {
        order: 1,
        instruction:
          "Identify two people who would actually use your tool in their job. They do not need to be in the cohort. Contact them and book 20 minutes each.",
        expectedAction: "Book two 20-minute feedback sessions",
        expectedResult:
          "Two sessions scheduled with people who have the problem your tool solves.",
        commonErrorNote:
          "If you can't find two people outside your immediate team, use two cohort members — but make sure they run the tool on their own input, not yours.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction:
          "Run both feedback sessions using the format in this guide. Take verbatim notes — write what they say, not your interpretation of it.",
        expectedAction: "Run two structured feedback sessions and document the results",
        expectedResult:
          "A raw notes document with everything the reviewers said, including things you disagree with.",
        commonErrorNote:
          "If you caught yourself explaining or defending the tool during the session, that's information — write down what you felt the need to defend.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 3,
        instruction:
          "Sort your feedback into blockers, nice-to-haves, and misunderstandings. Identify the one blocker that would most prevent regular use.",
        expectedAction: "Categorise feedback and identify the top blocker",
        expectedResult:
          "A clear decision: here is the one thing I'm fixing this week.",
        commonErrorNote:
          "If all your feedback was positive and you have no blockers, either you showed the tool to the wrong people or they were being polite. Go back and ask directly: 'What would stop you from using this next week?'",
        aiHintRef:
          "Ask Claude: 'Here is my feedback. Help me identify which items are real blockers versus nice-to-haves for a tool used in a professional context.'",
        completionRule: "manual",
      },
      {
        order: 4,
        instruction: "Fix the top blocker. Then retest with one of your original reviewers.",
        expectedAction: "Implement one change and verify it with a reviewer",
        expectedResult:
          "The blocker that came up in feedback is resolved. The reviewer confirms it.",
        commonErrorNote:
          "If the fix introduces a new problem, document it — don't chase it into week 4. Ship what you have and note it in your handoff doc.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 5,
        instruction:
          "Attend or watch the replay of the peer review workshop. Review two other cohort members' tools using the structured feedback format.",
        expectedAction: "Participate in peer review and give structured feedback to two cohort members",
        expectedResult:
          "You have reviewed two tools and posted your notes in the Slack thread.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
    ],
  },

  // ─── WEEK 4 ────────────────────────────────────────────────────────────────
  {
    title: "Ship it",
    slug: "week-4-ship",
    weekId: 4,
    purpose:
      "Officially ship. Put the tool somewhere permanent, document it for whoever uses it next, and record the demo.",
    estimatedTimeMinutes: 120,
    expectedOutput:
      "Shipped tool at a permanent location + handoff doc + 5-minute Loom demo recording.",
    guideType: "submit",
    difficulty: "intermediate",
    isRequired: true,
    retrievalTags: [
      "ship",
      "week-4",
      "demo",
      "loom",
      "handoff",
      "certification",
      "submit",
    ],
    commonMistakes: [
      "Spending week 4 polishing instead of shipping — done is better than perfect.",
      "Not writing the handoff doc, which means the tool dies when you're busy.",
      "Over-preparing the demo recording — one take is fine.",
      "Submitting without a real example in the handoff doc.",
    ],
    doneChecklist: [
      "The tool exists somewhere permanent that is not your local machine",
      "A colleague can find and run it without your help",
      "The handoff doc includes a real example input and output",
      "The Loom demo is recorded and shared in #ships",
      "Certification submitted via the hub",
    ],
    contentBody: `## What shipping actually means

Shipped means three things:
1. The tool exists somewhere permanent that isn't your local machine
2. Someone else could find it and use it without your help
3. You have a demo that shows what it does

This week is not about making it perfect. It is about making it real.

## Step 1 — Give it a home

Your tool needs to live somewhere. Pick the simplest home that fits how your tool actually gets used:

- **Notion page** with the tool embedded or linked, plus usage instructions — right for anything that runs via prompt, spreadsheet, or simple script
- **Shared Google Doc or Sheet** — right for tools that live inside a document workflow
- **Deployed URL** (Vercel, Render, or similar) — right for tools with a web UI that others need to access directly

Do not deploy a web app if a Notion page with a prompt does the same job.

## Step 2 — Write the handoff doc

One page. Three sections.

**What it does:** One paragraph. What problem it solves, who it's for, what you give it, and what it gives back.

**How to use it:** Numbered steps. Every input explained. Every output format described. Include a working example — paste a real input and the output it produced.

**What it doesn't do:** Two or three limitations. This is the most important section for anyone who inherits this. What inputs break it? What outputs need human review before use?

## Step 3 — Record the demo

Open Loom. Record 5 minutes. You do not need a script.

Structure:
1. **(30 seconds)** The problem this solves and who it's for
2. **(2 minutes)** Live demo with a real input — show the output, narrate what happened
3. **(1 minute)** What you would build next if you kept going
4. **(1 minute)** What you learned — what was harder than expected, what surprised you

Record it once. A rough demo from a real practitioner is more useful than a polished marketing video. Do not re-record more than twice.

## Step 4 — Share in Slack

Post in #ships with:
- The name of your tool
- One sentence: what it does and who it's for
- The link to the tool or handoff doc
- The Loom link

## Step 5 — Submit for certification

Use the submit button in your hub. Your submission is reviewed by the Torvi team and you receive certification within 48 hours if your tool meets the completion criteria.

**Completion criteria:**
- A tool that runs on real inputs, not synthetic examples
- At least one person other than you has used it
- A Loom showing it working end-to-end
- A handoff doc someone else can follow

## What comes next

Most certified learners find that shipping the first tool makes the second one significantly easier. You now know how to scope a problem, prompt an AI, build a working tool, and get it in front of real users. That is a repeatable process.

The Torvi membership covers everything after this: peer reviews, advanced tracks, templates for your next build, and access to every future cohort's workshops. Details in your hub.`,
    steps: [
      {
        order: 1,
        instruction:
          "Choose where your tool will live permanently. Decide based on how it gets used — Notion page, shared doc, or deployed URL. Set it up so a colleague can access it right now.",
        expectedAction: "Create a permanent home for your tool",
        expectedResult:
          "Your tool is accessible via a link you can share without any explanation.",
        commonErrorNote:
          "If you're spending more than an hour on deployment, you've chosen too complex a home. Move down to the simpler option.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 2,
        instruction:
          "Write the handoff doc. Three sections: what it does, how to use it (with a real example), and what it doesn't do. Keep it to one page.",
        expectedAction: "Write and publish the handoff doc at the tool's permanent location",
        expectedResult:
          "A one-page doc that lets a new user understand, access, and use the tool without your involvement.",
        commonErrorNote:
          "If your 'how to use it' section has no example with a real input and output, add one. Without it, the doc is theory — not instructions.",
        aiHintRef:
          "Ask Claude: 'Here is my handoff doc draft. What is missing or unclear for someone seeing this tool for the first time?'",
        completionRule: "manual",
      },
      {
        order: 3,
        instruction:
          "Record your Loom demo. 5 minutes. Show the tool running on a real input, explain what you'd build next, and say what surprised you. One take, maybe two.",
        expectedAction: "Record and upload a 5-minute Loom demo",
        expectedResult:
          "A Loom link that shows your tool working end-to-end with real data.",
        commonErrorNote:
          "If you are on your third or fourth take because it doesn't sound polished enough, stop and publish the current one. The content matters more than the delivery.",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 4,
        instruction:
          "Post in #ships on Slack: tool name, one-sentence description, tool link, and Loom link.",
        expectedAction: "Post your ship announcement in #ships",
        expectedResult:
          "Your tool is visible to the full cohort. You have shipped.",
        commonErrorNote: "",
        aiHintRef: "",
        completionRule: "manual",
      },
      {
        order: 5,
        instruction:
          "Submit for certification in the hub. Include the link to your tool, your handoff doc, and your Loom.",
        expectedAction: "Submit certification via the hub",
        expectedResult:
          "Submission received. You will receive your certificate within 48 hours.",
        commonErrorNote:
          "If you're not sure whether your tool meets the criteria, submit anyway. The review team will tell you what's missing.",
        aiHintRef: "",
        completionRule: "manual",
      },
    ],
  },
];

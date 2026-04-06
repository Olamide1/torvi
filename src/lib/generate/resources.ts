/**
 * Prompts used to generate the three kit resources via OpenAI.
 * Called once from /api/admin/generate-resources.
 */

export const ROLES = [
  { id: "product_manager", label: "Product Manager", slug: "product-manager", work: "roadmap reviews, user research synthesis, spec writing, planning meetings, and stakeholder updates" },
  { id: "ops_leader",      label: "Ops Leader",      slug: "ops-leader",      work: "intake triage, weekly reporting, SOP writing, task routing, and operational status updates" },
  { id: "consultant",      label: "Consultant",       slug: "consultant",      work: "discovery synthesis, recommendation formatting, client status updates, diagnostic reviews, and delivery tracking" },
  { id: "founder",         label: "Founder",          slug: "founder",         work: "quick decisions, team briefs, investor updates, hiring criteria, and internal process documentation" },
  { id: "team_lead",       label: "Team Lead",        slug: "team-lead",       work: "team briefs, sprint reviews, feedback documentation, escalation decisions, and workload triage" },
];

export function promptPackPrompt(role: typeof ROLES[number]): string {
  return `You are writing a prompt pack for Torvi, a 4-week cohort where senior professionals ship an internal AI tool using Claude and Cursor.

This prompt pack is for a ${role.label}. Their day-to-day work includes: ${role.work}.

Write 5 Claude prompts they can use immediately in their actual job. These will be in a reference document they bookmark and return to.

Rules for every prompt:
- Start with a system instruction that tells Claude exactly what role to play and what it is producing
- Use [BRACKETS] for the parts the user fills in with their specific input
- Specify the exact output format (numbered list, table, bullet summary, etc.)
- Be written for someone pasting into Claude chat — not the API, not code
- Solve one specific repeating job, not a vague category
- End with a single line: "Input: [paste your content here]"

Rules for the pack as a whole:
- Cover 5 different jobs — no two prompts for the same type of task
- Tone is direct and professional — no filler, no "certainly!", no motivational language
- Each prompt should feel like something a sharp operator actually saved and uses weekly
- Do not include prompts for generic tasks like "write my emails" or "summarise this article"

Format each prompt as:

## [Short name for the job — 3–5 words]
[The full prompt, ready to copy-paste into Claude]

---

Do not add introductions, summaries, or commentary between prompts. Just the 5 prompts.`;
}

export const toolBriefPrompt = `You are writing a tool brief template for Torvi, a 4-week cohort where senior professionals ship an internal AI tool.

Before participants start building, they fill out a one-page tool brief that scopes their project. This template will be a Google Doc or Notion page they fill in directly.

Write the template with these 5 sections:

1. Problem statement — what happens right now without the tool (one sentence, specific)
2. Intended user — one name or one role title
3. Inputs — the concrete items the tool needs to run
4. Output — one specific thing the tool produces
5. Done criteria — how they'll know it worked at the end of week 4

For each section include:
- A one-line instruction telling them what to write
- One example of a weak answer (labelled "Too vague:")
- One example of a strong answer (labelled "Strong:")
- A blank fill-in line

End with a scope check: 4 yes/no questions that catch over-scoping.

Rules:
- Tone is direct and professional — think internal consulting document, not a school worksheet
- Every instruction must be one sentence
- Weak/strong examples must be realistic — not obviously bad/good, but the kind of mistake real smart people make
- The whole document should fit on one page when printed

Format as clean markdown. Use ## for section headers. Do not add any preamble or closing commentary.`;

export const weekOneWorksheetPrompt = `You are writing a Week 1 worksheet for Torvi, a 4-week cohort where senior professionals ship an internal AI tool using Claude and Cursor.

Week 1 is about getting from a written tool brief to a working first prototype. This worksheet is completed before the participant opens Cursor. It is a reference document they fill in and return to during the week.

Write the worksheet with 3 sections:

Section 1 — System prompt design
Questions that help them write their first Claude system prompt before they start building. Cover: what role Claude should play, what the input looks like in practice, what the output format is exactly, and what should happen when inputs are messy or incomplete.
End this section with a fill-in template they complete: a 5-line system prompt structure with [BRACKETS].

Section 2 — Real test inputs
A short prompt that forces them to name 5 real inputs from their actual job before building anything. Include a one-paragraph note on why clean or invented test data is a trap — specific, not generic.

Section 3 — Failure prediction
3 questions asking them to predict how their tool will fail before they run a single test. Purpose: build the habit of thinking about edge cases early. Questions should be specific — not "what could go wrong" but targeted at the three most common failure modes in week 1 builds.

End with a 4-item done checklist for the end of week 1.

Rules:
- Tone is direct — this is a working document, not a course handout
- No motivational language ("You've got this!", "Great work!")
- Every question should require a specific answer, not a yes/no
- The fill-in system prompt template in section 1 is the centrepiece — make it useful

Format as clean markdown. Use ## for section headers. Do not add any preamble or closing commentary.`;

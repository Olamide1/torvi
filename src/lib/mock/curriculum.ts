import type { WeekOutput, Resource, LiveSession } from "../types/curriculum";

export const mockCurriculum: WeekOutput[] = [
  {
    week: 0,
    theme: "Setup & Define",
    outcome: "One-page tool brief",
    tools: ["Notion", "Claude", "Figma"],
    lessons: [
      { id: "w0-l1", title: "Welcome and orientation", duration: "12 min", type: "video" },
      { id: "w0-l2", title: "Defining your work problem", duration: "20 min", type: "reading" },
      { id: "w0-l3", title: "Role path overview", duration: "15 min", type: "video" },
    ],
    assignment: {
      id: "w0-a1",
      title: "Tool Brief",
      description: "Define the one work problem you are solving in this cohort.",
      deliverable: "Completed one-page brief using the provided template",
    },
  },
  {
    week: 1,
    theme: "Build the First Version",
    outcome: "Working prototype draft",
    tools: ["Claude", "v0", "Cursor"],
    lessons: [
      { id: "w1-l1", title: "Vibe coding fundamentals", duration: "25 min", type: "video" },
      { id: "w1-l2", title: "Prompt structure that works", duration: "18 min", type: "video" },
      { id: "w1-l3", title: "Working with templates", duration: "20 min", type: "template" },
      { id: "w1-l4", title: "Tool selection guide", duration: "15 min", type: "reading" },
    ],
    assignment: {
      id: "w1-a1",
      title: "Prototype Draft",
      description: "Build a working first version of your tool using the prompts and templates from this week.",
      deliverable: "Live link or screen recording of your prototype",
    },
  },
  {
    week: 2,
    theme: "Make It Usable",
    outcome: "Usable internal tool",
    tools: ["Claude", "Cursor", "Supabase"],
    lessons: [
      { id: "w2-l1", title: "Fixing logic and edge cases", duration: "22 min", type: "video" },
      { id: "w2-l2", title: "Improving the UX", duration: "20 min", type: "video" },
      { id: "w2-l3", title: "Working with real data", duration: "25 min", type: "workshop" },
      { id: "w2-l4", title: "Testing with examples", duration: "15 min", type: "reading" },
    ],
    assignment: {
      id: "w2-a1",
      title: "Usable Tool",
      description: "Improve your prototype so a colleague could use it without your help.",
      deliverable: "Updated live link with a short Loom walkthrough",
    },
  },
  {
    week: 3,
    theme: "Polish & Review",
    outcome: "Reviewed and improved version",
    tools: ["Claude", "Loom", "Notion"],
    lessons: [
      { id: "w3-l1", title: "Polish and edge case handling", duration: "20 min", type: "video" },
      { id: "w3-l2", title: "Getting stakeholder feedback", duration: "18 min", type: "reading" },
      { id: "w3-l3", title: "Demo prep and storytelling", duration: "22 min", type: "video" },
      { id: "w3-l4", title: "Peer review session", duration: "60 min", type: "workshop" },
    ],
    assignment: {
      id: "w3-a1",
      title: "Reviewed Version",
      description: "Run your tool through a structured review and document what you improved.",
      deliverable: "Review notes and updated live link",
    },
  },
  {
    week: 4,
    theme: "Ship It",
    outcome: "Shipped tool and recorded demo",
    tools: ["Claude", "Loom", "Notion"],
    lessons: [
      { id: "w4-l1", title: "Final build review checklist", duration: "15 min", type: "reading" },
      { id: "w4-l2", title: "Rollout and team handoff", duration: "20 min", type: "video" },
      { id: "w4-l3", title: "Recording your demo", duration: "12 min", type: "video" },
      { id: "w4-l4", title: "What to build next", duration: "18 min", type: "reading" },
    ],
    assignment: {
      id: "w4-a1",
      title: "Shipped Tool + Demo",
      description: "Ship your tool to at least one real user and record your demo.",
      deliverable: "Public or shared link + Loom demo recording",
    },
  },
];

export const mockResources: Resource[] = [
  { id: "r1", title: "Tool Brief Template", type: "template", tags: ["brief", "planning"], url: "#" },
  { id: "r2", title: "Prompt Starter Kit", type: "template", tags: ["prompts", "claude"], url: "#" },
  { id: "r3", title: "Week 1 Workshop Replay", type: "recording", tags: ["week-1", "replay"], url: "#" },
  { id: "r4", title: "PM Track Examples", type: "example", roleTrack: "product_manager", tags: ["pm", "examples"], url: "#" },
  { id: "r5", title: "Data Handling Worksheet", type: "worksheet", tags: ["data", "week-2"], url: "#" },
  { id: "r6", title: "UX Checklist", type: "worksheet", tags: ["ux", "polish"], url: "#" },
  { id: "r7", title: "Common Errors FAQ", type: "faq", tags: ["debug", "help"], url: "#" },
  { id: "r8", title: "Ops Automation Examples", type: "example", roleTrack: "ops_leader", tags: ["ops", "automation"], url: "#" },
  { id: "r9", title: "Stakeholder Demo Template", type: "template", tags: ["demo", "week-3"], url: "#" },
  { id: "r10", title: "Rollout Checklist", type: "template", tags: ["week-4", "ship"], url: "#" },
];

export const mockSessions: LiveSession[] = [
  {
    id: "s1",
    title: "Week 2 Workshop: Making It Usable",
    type: "workshop",
    date: "2026-04-17T16:00:00Z",
    duration: "90 min",
    joinUrl: "#",
  },
  {
    id: "s2",
    title: "Office Hours",
    type: "office_hours",
    date: "2026-04-19T10:00:00Z",
    duration: "60 min",
    joinUrl: "#",
  },
  {
    id: "s3",
    title: "Week 3 Workshop: Peer Review",
    type: "workshop",
    date: "2026-04-24T16:00:00Z",
    duration: "90 min",
    joinUrl: "#",
  },
];

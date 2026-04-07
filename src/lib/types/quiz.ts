export type QuizStep = "role" | "email_capture" | "goal" | "time" | "format" | "result";

export interface QuizOption {
  id: string;
  label: string;
  description: string;
  icon?: string;
}

export interface QuizState {
  currentStep: QuizStep;
  role: string | null;
  goal: string | null;
  timeCommitment: string | null;
  format: string | null;
}

export const ROLE_OPTIONS: QuizOption[] = [
  { id: "product_manager", label: "Product Manager", description: "Building internal tools, dashboards, and prototypes" },
  { id: "ops_leader", label: "Ops Leader", description: "Automating repeat admin and operational work" },
  { id: "consultant", label: "Consultant", description: "Shipping client-facing prototypes and tools" },
  { id: "founder", label: "Founder", description: "Moving faster without waiting on engineering" },
  { id: "team_lead", label: "Team Lead", description: "Building tools without waiting on the backlog" },
];

export const GOAL_OPTIONS: QuizOption[] = [
  { id: "internal_tool", label: "Internal workflow tool", description: "Automate a process your team does manually" },
  { id: "data_dashboard", label: "Data dashboard", description: "Visualise metrics without an analyst" },
  { id: "client_portal", label: "Client-facing portal", description: "Ship something your clients can use" },
  { id: "automation", label: "Admin automation", description: "Remove repeat tasks from your week" },
  { id: "prototype", label: "Prototype for review", description: "Get something in front of stakeholders fast" },
];

export const TIME_OPTIONS: QuizOption[] = [
  { id: "light", label: "2–3 hours/week", description: "Focused and efficient. Works if you protect the time." },
  { id: "standard", label: "4–6 hours/week", description: "The recommended pace. Ship something solid in 4 weeks." },
  { id: "intensive", label: "7–10 hours/week", description: "You want to go deep. Great for high-stakes builds." },
];

export const FORMAT_OPTIONS: QuizOption[] = [
  { id: "cohort", label: "Run only", description: "€200 founding rate. Start immediately. Weekly guided run, office hours, certificate on completion." },
  { id: "membership", label: "Run + Membership", description: "€200 run now, then €39–79/month after. Ongoing access, future runs, member office hours." },
];

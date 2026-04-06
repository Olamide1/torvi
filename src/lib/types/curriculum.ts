export interface WeekOutput {
  week: number;
  theme: string;
  outcome: string;
  tools: string[];
  lessons: Lesson[];
  assignment: Assignment;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: "video" | "reading" | "template" | "workshop";
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  deliverable: string;
}

export interface Resource {
  id: string;
  title: string;
  type: "template" | "worksheet" | "recording" | "faq" | "example";
  roleTrack?: string;
  tags: string[];
  url: string;
}

export interface LiveSession {
  id: string;
  title: string;
  type: "workshop" | "office_hours" | "q_and_a";
  date: string;
  duration: string;
  joinUrl: string;
  replayUrl?: string;
}

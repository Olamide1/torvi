export type UserStatus =
  | "lead"
  | "checkout_started"
  | "paid"
  | "enrolled"
  | "onboarding_started"
  | "onboarding_completed"
  | "active_week_1"
  | "active_week_2"
  | "active_week_3"
  | "active_week_4"
  | "stalled"
  | "assessment_submitted"
  | "passed"
  | "certified"
  | "upsell_eligible"
  | "member_active"
  | "payment_issue"
  | "churned";

export type RoleTrack =
  | "product_manager"
  | "ops_leader"
  | "consultant"
  | "founder"
  | "team_lead"
  | "exec";

export interface Cohort {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  maxSeats: number;
  seatsUsed: number;
  status: "upcoming" | "active" | "completed";
}

export interface Learner {
  id: string;
  email: string;
  fullName: string;
  timezone: string;
  roleTrack: RoleTrack;
  outcomeTrack: string;
  cohortId: string;
  billingStatus: "active" | "grace" | "failed" | "cancelled";
  learningStatus: UserStatus;
  slackStatus: "invited" | "joined" | "not_invited";
  certificateStatus: "not_started" | "eligible" | "issued";
  upsellStatus: "not_eligible" | "eligible" | "converted";
  lastActiveAt: string;
  onboardingCompletedAt?: string;
  weekProgress: {
    week: number;
    lessonsCompleted: number;
    totalLessons: number;
    assignmentSubmitted: boolean;
    quizPassed: boolean;
  }[];
}

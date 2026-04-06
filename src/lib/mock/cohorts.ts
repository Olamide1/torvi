import type { Cohort } from "../types/cohort";

export const mockCohorts: Cohort[] = [
  {
    id: "cohort-march-2026",
    name: "March 2026 Cohort",
    startDate: "2026-04-07",
    endDate: "2026-05-02",
    maxSeats: 30,
    seatsUsed: 24,
    status: "upcoming",
  },
  {
    id: "cohort-jan-2026",
    name: "January 2026 Cohort",
    startDate: "2026-01-13",
    endDate: "2026-02-07",
    maxSeats: 30,
    seatsUsed: 28,
    status: "completed",
  },
];

export const activeCohort = mockCohorts[0];

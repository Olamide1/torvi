export interface Certificate {
  id: string;
  learnerId: string;
  learnerName: string;
  cohortName: string;
  completionDate: string;
  roleTrack: string;
  outcomes: string[];
  registryId: string;
}

export const mockCertificates: Certificate[] = [
  {
    id: "cert-001",
    learnerId: "learner-prev-001",
    learnerName: "Elena Marchetti",
    cohortName: "January 2026 Cohort",
    completionDate: "2026-02-07",
    roleTrack: "Product Manager",
    outcomes: [
      "Built a project intake tool replacing a 47-field spreadsheet",
      "Reduced weekly admin time by ~3 hours",
      "Shipped to 12 team members in week 4",
      "Recorded and shared a demo with the wider org",
    ],
    registryId: "TORVI-2026-0042",
  },
];
